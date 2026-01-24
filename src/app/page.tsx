import BlogSnippet from '@/components/sections/BlogSnippet';
import GalleryGrid from '@/components/sections/GalleryGrid';

export default function Home() {
  return (
    <main className="max-w-6xl mx-auto px-6">
      <BlogSnippet />
      <GalleryGrid />
      {/* Footer code here */}
    </main>
  );
}