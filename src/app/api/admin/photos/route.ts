// File path: src/app/api/admin/photos/route.ts

import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { writeFile } from 'fs/promises';

const PHOTOS_DIR = path.join(process.cwd(), 'public', 'gallery');
const PHOTOS_INDEX_FILE = path.join(process.cwd(), 'content', 'gallery', 'index.json');

// Ensure directories exist
async function ensureDirs() {
  try {
    await fs.mkdir(PHOTOS_DIR, { recursive: true });
    await fs.mkdir(path.join(process.cwd(), 'content', 'gallery'), { recursive: true });
  } catch (error) {
    // Directories might already exist
  }
}

// Get all photos
export async function GET() {
  try {
    await ensureDirs();
    
    try {
      const indexContent = await fs.readFile(PHOTOS_INDEX_FILE, 'utf-8');
      const photos = JSON.parse(indexContent);
      return NextResponse.json(photos);
    } catch (error) {
      // If file doesn't exist, return empty array
      return NextResponse.json([]);
    }
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to load photos' },
      { status: 500 }
    );
  }
}

// Upload photo
export async function POST(request: NextRequest) {
  try {
    await ensureDirs();
    const formData = await request.formData();
    
    const file = formData.get('file') as File;
    const title = formData.get('title') as string;
    const category = formData.get('category') as string;
    const description = formData.get('description') as string;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Generate unique filename
    const timestamp = Date.now();
    const extension = file.name.split('.').pop();
    const fileName = `photo-${timestamp}.${extension}`;
    const filePath = path.join(PHOTOS_DIR, fileName);

    // Save file
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await writeFile(filePath, buffer);

    // Read existing photos index
    let photos = [];
    try {
      const indexContent = await fs.readFile(PHOTOS_INDEX_FILE, 'utf-8');
      photos = JSON.parse(indexContent);
    } catch (error) {
      // File doesn't exist, start with empty array
    }

    // Add new photo to index
    const photoData = {
      id: timestamp.toString(),
      title,
      category,
      description,
      url: `/gallery/${fileName}`,
      uploadDate: new Date().toISOString()
    };

    photos.push(photoData);

    // Save updated index
    await fs.writeFile(PHOTOS_INDEX_FILE, JSON.stringify(photos, null, 2));

    return NextResponse.json({ 
      success: true, 
      message: 'Photo uploaded successfully',
      photo: photoData 
    });
  } catch (error) {
    console.error('Photo upload error:', error);
    return NextResponse.json(
      { error: 'Failed to upload photo' },
      { status: 500 }
    );
  }
}

// Delete photo
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Photo ID required' },
        { status: 400 }
      );
    }

    // Read existing photos
    const indexContent = await fs.readFile(PHOTOS_INDEX_FILE, 'utf-8');
    let photos = JSON.parse(indexContent);

    // Find photo to delete
    const photo = photos.find((p: any) => p.id === id);
    if (photo) {
      // Delete file
      const filePath = path.join(process.cwd(), 'public', photo.url);
      try {
        await fs.unlink(filePath);
      } catch (error) {
        // File might not exist
      }
    }

    // Remove photo from index
    photos = photos.filter((p: any) => p.id !== id);
    await fs.writeFile(PHOTOS_INDEX_FILE, JSON.stringify(photos, null, 2));

    return NextResponse.json({ 
      success: true, 
      message: 'Photo deleted successfully' 
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete photo' },
      { status: 500 }
    );
  }
}
