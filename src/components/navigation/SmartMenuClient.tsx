"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ChevronDownIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import BlogSearch from './BlogSearch';

interface WeekPost {
  week: string;
  slug: string;
  title: string;
}

interface MonthArchive {
  name: string;
  slug: string;
  weeks: WeekPost[];
}

interface YearArchive {
  year: string;
  months: MonthArchive[];
}

interface SmartMenuClientProps {
  blogArchive: YearArchive[];
}

export default function SmartMenuClient({ blogArchive }: SmartMenuClientProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout>(undefined);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setDropdownOpen(false);
    }, 150);
  };

  const hasBlogPosts = blogArchive && blogArchive.length > 0;

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled 
            ? 'bg-white/80 backdrop-blur-xl border-b border-slate-200 shadow-lg' 
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link 
              href="/" 
              className="relative group"
            >
              <span className="font-bold text-xl tracking-tighter bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent">
                VISHAL
              </span>
              <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300" />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <Link 
                href="/" 
                className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors relative group"
              >
                Home
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300" />
              </Link>

              {/* Blog Dropdown */}
              {hasBlogPosts ? (
                <div 
                  ref={dropdownRef}
                  className="relative"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <button 
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="inline-flex items-center gap-1 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors group"
                  >
                    Blogs
                    <ChevronDownIcon className={`h-4 w-4 transition-transform duration-300 ${dropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Dropdown Menu - Added slight bg-slate-50 for contrast */}
                  <div 
                    className={`absolute left-0 mt-3 w-80 origin-top-left bg-slate-50 backdrop-blur-2xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden max-h-[80vh] overflow-y-auto transition-all duration-300 ease-out ${
                      dropdownOpen 
                        ? 'opacity-100 scale-100 visible' 
                        : 'opacity-0 scale-95 invisible'
                    }`}
                  >
                    <div className="p-3 space-y-4">
                      {blogArchive.map((yearObj) => (
                        <div key={yearObj.year} className="space-y-2">
                          <div className="flex items-center justify-between px-2">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                              {yearObj.year}
                            </span>
                            <div className="h-px flex-1 bg-slate-200 mx-3" />
                          </div>

                          {yearObj.months.map((month) => (
                            <div key={month.name} className="space-y-1">
                              <h4 className="px-2 text-xs font-bold text-slate-700">{month.name}</h4>
                              
                              <div className="grid gap-1">
                                {month.weeks.map((post, idx) => (
                                  <Link
                                    key={`${post.slug}-${idx}`}
                                    href={`/blog/${post.slug}`}
                                    // Focus here: Zoom, Shadow, and White BG on hover
                                    className="group/item flex items-start gap-3 p-2.5 rounded-xl transition-all duration-200 hover:bg-white hover:scale-[1.03] hover:shadow-md border border-transparent hover:border-slate-100 active:scale-95"
                                    onClick={() => setDropdownOpen(false)}
                                  >
                                    <div className="bg-blue-50 text-blue-600 font-mono text-[10px] px-1.5 py-0.5 rounded group-hover/item:bg-blue-600 group-hover/item:text-white transition-colors">
                                      {post.week}
                                    </div>
                                    <span className="text-xs text-slate-600 group-hover/item:text-slate-900 line-clamp-2 leading-snug font-medium">
                                      {post.title}
                                    </span>
                                  </Link>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                    
                    {/* View All Link */}
                    <div className="sticky bottom-0 p-3 bg-white border-t border-slate-100">
                      <Link 
                        href="/blog"
                        className="flex items-center justify-center gap-2 py-2 text-sm font-bold text-blue-600 hover:text-purple-600 transition-colors"
                        onClick={() => setDropdownOpen(false)}
                      >
                        Explore All Posts
                        <span className="text-lg">→</span>
                      </Link>
                    </div>
                  </div>
                </div>
              ) : (
                <Link 
                  href="/blog" 
                  className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors relative group"
                >
                  Blogs
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300" />
                </Link>
              )}

              <Link 
                href="/gallery" 
                className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors relative group"
              >
                Gallery
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300" />
              </Link>
            </div>

            {/* Search Bar - Desktop */}
            <div className="hidden lg:block flex-1 max-w-md mx-8">
              <BlogSearch />
            </div>

            {/* CTA Button - Desktop */}
            <div className="hidden md:block">
              <Link href="/meet">
                <button className="relative group px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-bold rounded-full overflow-hidden transition-all hover:shadow-xl hover:scale-105">
                  <span className="relative z-10">Book a Meeting</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-600 hover:text-slate-900 transition-colors"
            >
              {mobileMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden bg-white pt-20 overflow-y-auto animate-fade-in">
          <div className="px-6 py-8 space-y-6">
            <Link 
              href="/" 
              onClick={() => setMobileMenuOpen(false)}
              className="block text-lg font-semibold text-slate-900 hover:text-blue-600 transition-colors"
            >
              Home
            </Link>
            
            {hasBlogPosts && (
              <div className="border-t pt-4">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Blog Archive</p>
                {blogArchive.map((yearObj) => (
                  <div key={yearObj.year} className="mb-6">
                    <p className="text-sm font-bold text-slate-600 mb-3">{yearObj.year}</p>
                    {yearObj.months.map((month) => (
                      <div key={month.name} className="mb-4 ml-4">
                        <p className="text-base font-semibold text-slate-700 mb-2">{month.name}</p>
                        <div className="space-y-2 ml-4">
                          {month.weeks.map((post, idx) => (
                            <Link
                              key={`${post.slug}-${idx}`}
                              href={`/blog/${post.slug}`}
                              onClick={() => setMobileMenuOpen(false)}
                              className="block text-sm text-slate-600 hover:text-blue-600 transition-colors"
                            >
                              <span className="font-mono text-xs text-blue-600">{post.week}</span>
                              {' · '}
                              <span>{post.title}</span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            )}

            <Link 
              href="/gallery" 
              onClick={() => setMobileMenuOpen(false)}
              className="block text-lg font-semibold text-slate-900 hover:text-blue-600 transition-colors"
            >
              Gallery
            </Link>

            <div className="pt-4">
              <BlogSearch />
            </div>

            <Link href="/meet" onClick={() => setMobileMenuOpen(false)}>
              <button className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-full hover:shadow-xl transition-all">
                Book a Meeting
              </button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}