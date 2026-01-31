// File path: src/app/api/admin/blogs/route.ts

import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const BLOGS_DIR = path.join(process.cwd(), 'content', 'blogs');
const BLOGS_INDEX_FILE = path.join(BLOGS_DIR, 'index.json');

// Ensure directory exists
async function ensureDir() {
  try {
    await fs.mkdir(BLOGS_DIR, { recursive: true });
  } catch (error) {
    // Directory might already exist
  }
}

// Get all blogs
export async function GET() {
  try {
    await ensureDir();
    
    try {
      const indexContent = await fs.readFile(BLOGS_INDEX_FILE, 'utf-8');
      const blogs = JSON.parse(indexContent);
      return NextResponse.json(blogs);
    } catch (error) {
      // If file doesn't exist, return empty array
      return NextResponse.json([]);
    }
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to load blogs' },
      { status: 500 }
    );
  }
}

// Save/Update blog
export async function POST(request: NextRequest) {
  try {
    await ensureDir();
    const blogData = await request.json();

    // Read existing blogs
    let blogs = [];
    try {
      const indexContent = await fs.readFile(BLOGS_INDEX_FILE, 'utf-8');
      blogs = JSON.parse(indexContent);
    } catch (error) {
      // File doesn't exist, start with empty array
    }

    // Update or add blog
    const existingIndex = blogs.findIndex((b: any) => b.id === blogData.id);
    if (existingIndex >= 0) {
      blogs[existingIndex] = blogData;
    } else {
      blogs.push(blogData);
    }

    // Save updated index
    await fs.writeFile(BLOGS_INDEX_FILE, JSON.stringify(blogs, null, 2));

    // Save individual blog content file
    const blogFileName = `${blogData.id}.mdx`;
    const blogFilePath = path.join(BLOGS_DIR, blogFileName);
    const blogContent = `---
title: "${blogData.title}"
date: "${blogData.date}"
category: "${blogData.category}"
status: "${blogData.status}"
readTime: "${blogData.readTime}"
${blogData.scheduledDate ? `scheduledDate: "${blogData.scheduledDate}"` : ''}
---

${blogData.content}
`;
    
    await fs.writeFile(blogFilePath, blogContent);

    return NextResponse.json({ 
      success: true, 
      message: 'Blog saved successfully',
      blog: blogData 
    });
  } catch (error) {
    console.error('Blog save error:', error);
    return NextResponse.json(
      { error: 'Failed to save blog' },
      { status: 500 }
    );
  }
}

// Delete blog
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Blog ID required' },
        { status: 400 }
      );
    }

    // Read existing blogs
    const indexContent = await fs.readFile(BLOGS_INDEX_FILE, 'utf-8');
    let blogs = JSON.parse(indexContent);

    // Remove blog from index
    blogs = blogs.filter((b: any) => b.id !== id);
    await fs.writeFile(BLOGS_INDEX_FILE, JSON.stringify(blogs, null, 2));

    // Delete blog file
    const blogFilePath = path.join(BLOGS_DIR, `${id}.mdx`);
    try {
      await fs.unlink(blogFilePath);
    } catch (error) {
      // File might not exist
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Blog deleted successfully' 
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete blog' },
      { status: 500 }
    );
  }
}
