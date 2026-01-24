import Hero from '@/components/sections/Hero';
import BlogSnippet from '@/components/sections/BlogSnippet';
import GalleryGrid from '@/components/sections/GalleryGrid';

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <Hero />
      
      {/* Main Content Container */}
      <div className="max-w-6xl mx-auto px-6">
        <BlogSnippet />
        <GalleryGrid />
      </div>
    </main>
  );
}