import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const GALLERY_FILE = path.join(process.cwd(), 'src/data/galleryData.json');

// GET - Read gallery data
export async function GET() {
  try {
    const fileContents = fs.readFileSync(GALLERY_FILE, 'utf8');
    const data = JSON.parse(fileContents);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error reading gallery data:', error);
    return NextResponse.json({ photos: [] }, { status: 500 });
  }
}

// POST - Update gallery data
export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Write to file
    fs.writeFileSync(GALLERY_FILE, JSON.stringify(body, null, 2), 'utf8');
    
    return NextResponse.json({ success: true, message: 'Gallery updated successfully' });
  } catch (error) {
    console.error('Error updating gallery:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update gallery' },
      { status: 500 }
    );
  }
}