"use client";

import Link from 'next/link';
import { CalendarIcon, ClockIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  gradient: string;
  slug?: string;
}

interface BlogSnippetClientProps {
  blogPosts: BlogPost[];
}

export default function BlogSnippetClient({ blogPosts }: BlogSnippetClientProps) {
  const defaultPosts: BlogPost[] = [
    {
      id: 1,
      title: "Getting Started with Next.js",
      excerpt: "Learn the basics of Next.js and start building modern web applications.",
      date: "Jan 24, 2026",
      readTime: "5 min read",
      category: "Technology",
      gradient: "from-blue-500 to-cyan-500",
    },
  ];

  const postsToShow = blogPosts.length > 0 ? blogPosts : defaultPosts;

  return (
    <section id="blog" className="py-20 overflow-hidden">
      <div className="mb-12 px-1">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
          <span className="bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent">
            Latest Writing
          </span>
        </h2>
        <p className="text-slate-600 text-lg">
          Thoughts on technology, design, and building products.
        </p>
      </div>

      <div className="relative">
        {/* Decorative background glow for the scroll area */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-blue-50/50 rounded-full blur-3xl -z-10" />
        
        <div className="flex overflow-x-auto gap-8 pb-12 pt-4 snap-x snap-mandatory scrollbar-hide px-1">
          {postsToShow.map((post, index) => (
            <Link 
              key={post.id} 
              href={`/blog/${post.slug || post.id}`}
              className="group perspective-1000"
            >
              <article 
                className="min-w-[320px] md:min-w-[400px] snap-center"
                style={{ 
                  animation: `fadeInUp 0.6s ease-out ${index * 0.1}s forwards`,
                  opacity: 0 
                }}
              >
                {/* Main Card Container */}
                <div className="relative h-full bg-white rounded-3xl border border-slate-100 transition-all duration-500 
                  hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] 
                  hover:-translate-y-4 
                  group-hover:border-transparent">
                  
                  {/* The Animated Gradient Border (Bottom Layer) */}
                  <div className={`absolute -inset-[1px] rounded-3xl bg-gradient-to-br ${post.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10`} />

                  {/* Top Color Bar */}
                  <div className={`h-2 w-full bg-gradient-to-r ${post.gradient} rounded-t-3xl`} />
                  
                  <div className="p-8 bg-white rounded-b-3xl h-full">
                    {/* Category */}
                    <div className="flex justify-between items-start mb-6">
                      <span className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-lg bg-slate-50 text-slate-500 group-hover:bg-gradient-to-r group-hover:${post.gradient} group-hover:text-white transition-all duration-300`}>
                        {post.category}
                      </span>
                      <div className="h-8 w-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:rotate-45 transition-transform duration-500">
                        <ArrowRightIcon className="h-4 w-4 text-slate-400 group-hover:text-blue-600" />
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-bold text-slate-900 mb-4 line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors duration-300">
                      {post.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-slate-500 text-sm leading-relaxed mb-8 line-clamp-3">
                      {post.excerpt}
                    </p>

                    {/* Footer / Meta */}
                    <div className="pt-6 border-t border-slate-50 flex items-center justify-between">
                      <div className="flex items-center gap-4 text-[11px] font-medium text-slate-400">
                        <span className="flex items-center gap-1.5">
                          <CalendarIcon className="h-3.5 w-3.5" />
                          {post.date}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <ClockIcon className="h-3.5 w-3.5" />
                          {post.readTime}
                        </span>
                      </div>
                      
                      <span className="text-xs font-bold text-blue-600 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                        Read More
                      </span>
                    </div>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>

      {/* View All */}
      <div className="mt-4 flex justify-center">
        <Link 
          href="/blog"
          className="group flex items-center gap-3 px-8 py-4 bg-slate-900 text-white rounded-full hover:bg-blue-600 transition-all duration-300 shadow-lg hover:shadow-blue-200"
        >
          <span className="font-bold text-sm">View All Articles</span>
          <ArrowRightIcon className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </section>
  );
}