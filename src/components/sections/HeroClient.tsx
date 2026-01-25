"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface HeroClientProps {
  blogCount: number;
}

export default function HeroClient({ blogCount }: HeroClientProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="relative py-32 overflow-hidden">
      {/* Animated Background Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute top-1/4 -left-1/4 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl blob"
          style={{
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`
          }}
        />
        <div 
          className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-gradient-to-br from-pink-400/20 to-orange-400/20 rounded-full blur-3xl blob"
          style={{
            transform: `translate(${-mousePosition.x * 0.02}px, ${-mousePosition.y * 0.02}px)`,
            animationDelay: '2s'
          }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-blue-300/10 to-purple-300/10 rounded-full blur-3xl blob" />
      </div>

      {/* Content */}
      <div className="relative max-w-5xl mx-auto px-6 flex flex-col items-center text-center stagger-children">
        {/* Status Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 text-sm font-semibold bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-200/50 rounded-full backdrop-blur-sm shine">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Available for new projects
          </span>
        </div>

        {/* Main Heading */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter mb-6 leading-tight">
          <span className="inline-block bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 bg-clip-text text-transparent animate-gradient">
            Building digital products
          </span>
          <br />
          <span className="inline-block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient">
            with purpose and code.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl text-lg md:text-xl text-slate-600 mb-12 leading-relaxed">
          I'm <span className="font-semibold text-slate-900">Vishal</span>—a developer focused on clean interfaces and scalable systems. 
          I write about my journey and share what I learn along the way.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="#gallery">
            <button className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-full overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-105">
              <span className="relative z-10">View My Work</span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          </Link>
          
          <Link href="#blog">
            <button className="group relative px-8 py-4 bg-white/80 backdrop-blur-sm border-2 border-slate-200 text-slate-900 font-bold rounded-full overflow-hidden transition-all duration-300 hover:border-blue-400 hover:shadow-xl hover:scale-105">
              <span className="relative z-10 group-hover:text-blue-600 transition-colors">Read the Blog</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          </Link>
        </div>

        {/* Floating Social Proof / Stats */}
        <div className="flex flex-wrap gap-8 mt-16 text-center">
          <div className="fade-in-up">
            <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">50+</div>
            <div className="text-sm text-slate-500 mt-1">Projects Completed</div>
          </div>
          <div className="fade-in-up" style={{ animationDelay: '0.1s' }}>
            <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              {blogCount}
            </div>
            <div className="text-sm text-slate-500 mt-1">Blog Articles</div>
          </div>
          <div className="fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-orange-600 bg-clip-text text-transparent">5+</div>
            <div className="text-sm text-slate-500 mt-1">Years Experience</div>
          </div>
        </div>
      </div>

      {/* Bottom fade effect */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent pointer-events-none" />
    </section>
  );
}