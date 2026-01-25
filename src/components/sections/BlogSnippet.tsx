import BlogSnippetClient from './BlogSnippetClient';
import { getAllBlogPosts } from '@/utils/blogUtils';

export default async function BlogSnippet() {
  // Fetch blog posts on the server
  const blogPosts = await getAllBlogPosts();
  
  // Get the latest 4 posts
  const latestPosts = blogPosts.slice(0, 4);

  return <BlogSnippetClient blogPosts={latestPosts} />;
}