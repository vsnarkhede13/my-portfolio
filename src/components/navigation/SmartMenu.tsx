import SmartMenuClient from './SmartMenuClient';
import { getBlogArchiveStructure } from '@/utils/blogArchiveUtils';

export default async function SmartMenu() {
  // Fetch blog archive structure on the server
  const blogArchive = await getBlogArchiveStructure();

  return <SmartMenuClient blogArchive={blogArchive} />;
}