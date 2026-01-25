"use client";

import Link from 'next/link';
import { CalendarIcon, ClockIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import { blogPosts } from '@/data/blogData';

export default function BlogSnippet() {
  return (
    <section id="blog" className="py-20">
      <div className="mb-12 fade-in-up">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
          <span className="bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent">
            Latest Writing
          </span>
        </h2>
        <p className="text-slate-600 text-lg">
          Thoughts on technology, design, and building products.
        </p>
      </div>

      {/* Horizontal Scroll Container */}
      <div className="relative">
        {/* Gradient overlays for scroll indication */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent pointer-events-none z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent pointer-events-none z-10" />
        
        <div className="flex overflow-x-auto gap-6 pb-6 snap-x snap-mandatory scrollbar-hide px-1">
          {blogPosts.map((post, index) => (
            <Link 
              key={post.id} 
              href={`/blog/${post.id}`}
              className="group"
            >
              <article 
                className="min-w-[340px] md:min-w-[380px] snap-center"
                style={{ 
                  animation: `fadeInUp 0.6s ease-out ${index * 0.1}s forwards`,
                  opacity: 0 
                }}
              >
                <div className="relative h-full bg-white rounded-2xl border border-slate-200 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 hover:border-transparent">
                  {/* Gradient Header */}
                  <div className={`h-2 bg-gradient-to-r ${post.gradient}`} />
                  
                  {/* Content */}
                  <div className="p-6">
                    {/* Category Badge */}
                    <div className="inline-block mb-4">
                      <span className={`text-xs font-bold px-3 py-1 rounded-full bg-gradient-to-r ${post.gradient} text-white`}>
                        {post.category}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-slate-900 mb-3 line-clamp-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300">
                      {post.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>

                    {/* Meta Information */}
                    <div className="flex items-center gap-4 text-xs text-slate-500 mb-4">
                      <div className="flex items-center gap-1">
                        <CalendarIcon className="h-4 w-4" />
                        <span>{post.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <ClockIcon className="h-4 w-4" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>

                    {/* Read More Link */}
                    <div className="flex items-center gap-2 text-sm font-semibold text-blue-600 group-hover:gap-4 transition-all duration-300">
                      <span>Read article</span>
                      <ArrowRightIcon className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>

                  {/* Hover Gradient Border Effect */}
                  <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl bg-gradient-to-r ${post.gradient} p-[2px]`}>
                    <div className="h-full w-full bg-white rounded-2xl" />
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>

      {/* View All Link */}
      <div className="mt-8 text-center fade-in-up">
        <Link 
          href="/blog"
          className="inline-flex items-center gap-2 text-slate-600 font-semibold hover:text-blue-600 transition-colors group"
        >
          <span>View all articles</span>
          <ArrowRightIcon className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </section>
  );
}