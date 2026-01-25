// src/utils/blogUtils.ts
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  gradient: string;
  slug: string;
  author?: string;
}

export interface BlogPostContent {
  frontmatter: {
    title: string;
    date: string;
    excerpt?: string;
    category?: string;
    gradient?: string;
    author?: string;
    readTime?: string;
  };
  content: string;
  slug: string;
}

// Get all blog posts from MDX files
export async function getAllBlogPosts(): Promise<BlogPost[]> {
  // This is a server-side only function
  if (typeof window !== 'undefined') {
    return [];
  }

  const blogPosts: BlogPost[] = [];
  
  try {
    const contentDir = path.join(process.cwd(), 'src', 'content', 'blogs');
    
    // Check if directory exists
    if (!fs.existsSync(contentDir)) {
      console.warn('Blog directory not found:', contentDir);
      return [];
    }

    const files = fs.readdirSync(contentDir);
    const mdxFiles = files.filter(file => file.endsWith('.mdx') || file.endsWith('.md'));
    
    mdxFiles.forEach((file, index) => {
      const filePath = path.join(contentDir, file);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      
      // Parse frontmatter
      const { data } = matter(fileContent);
      
      // Extract slug from filename (remove date and extension)
      const slug = file
        .replace(/^\d{4}-\d{2}-week\d+-/, '') // Remove date prefix like 2026-01-week1-
        .replace(/\.mdx?$/, ''); // Remove extension
      
      blogPosts.push({
        id: index + 1,
        title: data.title || file.replace(/\.mdx?$/, '').replace(/-/g, ' '),
        excerpt: data.excerpt || '',
        date: data.date ? new Date(data.date).toLocaleDateString('en-US', { 
          month: 'short', 
          day: 'numeric', 
          year: 'numeric' 
        }) : 'No date',
        readTime: data.readTime || '5 min read',
        category: data.category || 'General',
        gradient: data.gradient || 'from-blue-500 to-cyan-500',
        slug: slug,
        author: data.author,
      });
    });

    // Sort by date (newest first)
    blogPosts.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB.getTime() - dateA.getTime();
    });
    
  } catch (error) {
    console.error('Error reading blog posts:', error);
  }

  return blogPosts;
}

// Get total blog count
export async function getTotalBlogCount(): Promise<number> {
  const posts = await getAllBlogPosts();
  return posts.length;
}

// Get single blog post by slug
export async function getBlogPostBySlug(slug: string): Promise<BlogPostContent | null> {
  if (typeof window !== 'undefined') {
    return null;
  }

  try {
    const contentDir = path.join(process.cwd(), 'src', 'content', 'blogs');
    
    // Check if directory exists
    if (!fs.existsSync(contentDir)) {
      console.warn('Blog directory not found:', contentDir);
      return null;
    }

    const files = fs.readdirSync(contentDir);
    
    // Find file that matches the slug
    const file = files.find(f => {
      const fileSlug = f
        .replace(/^\d{4}-\d{2}-week\d+-/, '')
        .replace(/\.mdx?$/, '');
      return fileSlug === slug && (f.endsWith('.mdx') || f.endsWith('.md'));
    });
    
    if (!file) {
      console.warn('Blog post not found for slug:', slug);
      return null;
    }

    const filePath = path.join(contentDir, file);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    
    const { data, content } = matter(fileContent);
    
    return {
      frontmatter: {
        title: data.title || 'Untitled',
        date: data.date ? new Date(data.date).toLocaleDateString('en-US', { 
          month: 'short', 
          day: 'numeric', 
          year: 'numeric' 
        }) : 'No date',
        excerpt: data.excerpt,
        category: data.category,
        gradient: data.gradient,
        author: data.author,
        readTime: data.readTime,
      },
      content,
      slug,
    };
  } catch (error) {
    console.error('Error reading blog post:', error);
    return null;
  }
}

// Get all blog slugs for static generation
export async function getAllBlogSlugs(): Promise<string[]> {
  const posts = await getAllBlogPosts();
  return posts.map(post => post.slug);
}