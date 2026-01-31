// File path: src/app/api/search/route.ts

import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

interface SearchResult {
  id: string;
  title: string;
  type: 'blog' | 'photo' | 'project';
  category: string;
  description?: string;
  url: string;
  date?: string;
  score: number;
}

// Helper function to calculate relevance score
function calculateScore(item: any, query: string): number {
  const lowerQuery = query.toLowerCase();
  let score = 0;

  // Title match (highest priority)
  if (item.title?.toLowerCase().includes(lowerQuery)) {
    score += 10;
    // Exact match bonus
    if (item.title?.toLowerCase() === lowerQuery) {
      score += 20;
    }
  }

  // Category match
  if (item.category?.toLowerCase().includes(lowerQuery)) {
    score += 5;
  }

  // Description/content match
  if (item.description?.toLowerCase().includes(lowerQuery)) {
    score += 3;
  }

  // Content match (for blogs)
  if (item.content?.toLowerCase().includes(lowerQuery)) {
    score += 2;
  }

  return score;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || '';

    if (!query.trim()) {
      return NextResponse.json({ results: [] });
    }

    const results: SearchResult[] = [];

    // Search in blogs
    try {
      const blogsIndexPath = path.join(process.cwd(), 'content', 'blogs', 'index.json');
      const blogsContent = await fs.readFile(blogsIndexPath, 'utf-8');
      const blogs = JSON.parse(blogsContent);

      blogs.forEach((blog: any) => {
        const score = calculateScore(blog, query);
        if (score > 0) {
          results.push({
            id: blog.id,
            title: blog.title,
            type: 'blog',
            category: blog.category,
            description: blog.content?.substring(0, 150) + '...',
            url: `/blog/${blog.id}`,
            date: blog.date,
            score
          });
        }
      });
    } catch (error) {
      // Blogs might not exist yet
    }

    // Search in photos
    try {
      const photosIndexPath = path.join(process.cwd(), 'content', 'gallery', 'index.json');
      const photosContent = await fs.readFile(photosIndexPath, 'utf-8');
      const photos = JSON.parse(photosContent);

      photos.forEach((photo: any) => {
        const score = calculateScore(photo, query);
        if (score > 0) {
          results.push({
            id: photo.id,
            title: photo.title,
            type: 'photo',
            category: photo.category,
            description: photo.description,
            url: `/gallery#${photo.id}`,
            date: photo.uploadDate,
            score
          });
        }
      });
    } catch (error) {
      // Photos might not exist yet
    }

    // Search in projects (if you have a projects file)
    try {
      const projectsIndexPath = path.join(process.cwd(), 'content', 'projects', 'index.json');
      const projectsContent = await fs.readFile(projectsIndexPath, 'utf-8');
      const projects = JSON.parse(projectsContent);

      projects.forEach((project: any) => {
        const score = calculateScore(project, query);
        if (score > 0) {
          results.push({
            id: project.id,
            title: project.title,
            type: 'project',
            category: project.category,
            description: project.description,
            url: `/projects/${project.id}`,
            date: project.date,
            score
          });
        }
      });
    } catch (error) {
      // Projects might not exist
    }

    // Sort by score (highest first) and limit results
    const sortedResults = results
      .sort((a, b) => b.score - a.score)
      .slice(0, 20)
      .map(({ score, ...result }) => result); // Remove score from final results

    return NextResponse.json({ 
      results: sortedResults,
      query,
      count: sortedResults.length
    });
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json(
      { error: 'Search failed', results: [] },
      { status: 500 }
    );
  }
}
