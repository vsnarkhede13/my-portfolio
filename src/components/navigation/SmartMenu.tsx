"use client";

import { Menu, Transition } from "@headlessui/react";
import { Fragment, useState, useEffect } from "react";
import Link from "next/link";
import { ChevronDownIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import BlogSearch from './BlogSearch';

const blogArchive = [
  {
    year: "2026",
    months: [
      { name: "January", weeks: ["Week 1", "Week 2"] },
      { name: "February", weeks: ["Week 1"] },
    ],
  },
  {
    year: "2025",
    months: [
      { name: "December", weeks: ["Week 4"] },
    ],
  },
];

export default function SmartMenu() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
              <Menu as="div" className="relative">
                <Menu.Button className="inline-flex items-center gap-1 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors group">
                  Blogs
                  <ChevronDownIcon className="h-4 w-4 group-hover:rotate-180 transition-transform duration-300" />
                </Menu.Button>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-200"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-150"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute left-0 mt-3 w-64 origin-top-left bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl ring-1 ring-black/5 focus:outline-none overflow-hidden">
                    <div className="p-2">
                      {blogArchive.map((yearObj) => (
                        <div key={yearObj.year} className="px-3 py-2">
                          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                            {yearObj.year}
                          </span>

                          {yearObj.months.map((month) => (
                            <div key={month.name} className="mt-3 ml-2">
                              <Link
                                href={`/blog/${yearObj.year}/${month.name.toLowerCase()}`}
                                className="text-sm font-semibold text-slate-700 hover:text-blue-600 block transition-colors"
                              >
                                {month.name}
                              </Link>

                              <div className="flex flex-wrap gap-2 mt-2 ml-2">
                                {month.weeks.map((week) => (
                                  <Link
                                    key={week}
                                    href={`/blog/${yearObj.year}/${month.name.toLowerCase()}/${week.toLowerCase().replace(" ", "-")}`}
                                    className="text-xs bg-slate-100 hover:bg-blue-100 hover:text-blue-700 px-2 py-1 rounded-lg transition-all"
                                  >
                                    {week}
                                  </Link>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>

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
      <Transition
        show={mobileMenuOpen}
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <div className="fixed inset-0 z-40 md:hidden bg-white pt-20">
          <div className="px-6 py-8 space-y-6">
            <Link 
              href="/" 
              onClick={() => setMobileMenuOpen(false)}
              className="block text-lg font-semibold text-slate-900 hover:text-blue-600 transition-colors"
            >
              Home
            </Link>
            
            <div className="border-t pt-4">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Blog Archive</p>
              {blogArchive.map((yearObj) => (
                <div key={yearObj.year} className="mb-4">
                  <p className="text-sm font-bold text-slate-600 mb-2">{yearObj.year}</p>
                  {yearObj.months.map((month) => (
                    <Link
                      key={month.name}
                      href={`/blog/${yearObj.year}/${month.name.toLowerCase()}`}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block text-base text-slate-700 hover:text-blue-600 mb-2 ml-4 transition-colors"
                    >
                      {month.name}
                    </Link>
                  ))}
                </div>
              ))}
            </div>

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
      </Transition>
    </>
  );
}