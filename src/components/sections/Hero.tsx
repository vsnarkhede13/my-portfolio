import HeroClient from './HeroClient';
import { getTotalBlogCount } from '@/utils/blogUtils';

export default async function Hero() {
  // Fetch blog count on the server
  const blogCount = await getTotalBlogCount();

  return <HeroClient blogCount={blogCount} />;
}