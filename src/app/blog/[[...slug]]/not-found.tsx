import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 pt-24 flex items-center justify-center">
      <div className="max-w-2xl mx-auto px-6 text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            404
          </h1>
        </div>
        
        <h2 className="text-3xl font-bold text-slate-900 mb-4">
          Blog Post Not Found
        </h2>
        
        <p className="text-lg text-slate-600 mb-8">
          Sorry, we couldn't find the blog post you're looking for. 
          It may have been moved or deleted.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/blog"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-full hover:shadow-xl hover:scale-105 transition-all"
          >
            <ArrowLeftIcon className="h-5 w-5" />
            <span>View All Posts</span>
          </Link>

          <Link 
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white border-2 border-slate-200 text-slate-900 font-bold rounded-full hover:border-blue-400 hover:shadow-xl hover:scale-105 transition-all"
          >
            <span>Back to Home</span>
          </Link>
        </div>
      </div>
    </main>
  );
}