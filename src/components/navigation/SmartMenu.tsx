"use client";

import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import Link from "next/link";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import BlogSearch from './BlogSearch';

// 1. Your Data Structure - Update this as you write more
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
  return (
    <nav className="flex items-center gap-8 py-4 border-b px-6 bg-white sticky top-0 z-50">
      <Link href="/" className="font-bold text-xl tracking-tighter">VISHAL</Link>

      <div className="flex gap-6 items-center">
        <Link href="/" className="text-sm font-medium hover:text-blue-600 transition">Home</Link>

        {/* --- SMART BLOG DROPDOWN --- */}
        <Menu as="div" className="relative inline-block text-left">
          <Menu.Button className="inline-flex items-center gap-1 text-sm font-medium hover:text-blue-600 transition">
            Blogs
            <ChevronDownIcon className="h-4 w-4" aria-hidden="true" />
          </Menu.Button>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute left-0 mt-2 w-56 origin-top-left divide-y divide-gray-100 rounded-xl bg-white shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="px-1 py-1">
                {blogArchive.map((yearObj) => (
                  <div key={yearObj.year} className="px-3 py-2">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{yearObj.year}</span>

                    {yearObj.months.map((month) => (
                      <div key={month.name} className="mt-2 ml-2">
                        <Link
                          href={`/blog/${yearObj.year}/${month.name.toLowerCase()}`}
                          className="text-sm font-semibold text-gray-700 hover:text-blue-600 block"
                        >
                          {month.name}
                        </Link>

                        <div className="flex flex-wrap gap-2 mt-1 ml-2">
                          {month.weeks.map((week) => (
                            <Link
                              key={week}
                              href={`/blog/${yearObj.year}/${month.name.toLowerCase()}/${week.toLowerCase().replace(" ", "-")}`}
                              className="text-[10px] bg-gray-100 px-2 py-0.5 rounded-full hover:bg-blue-50 hover:text-blue-700 transition"
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

        <Link href="/gallery" className="text-sm font-medium hover:text-blue-600 transition">Gallery</Link>
      </div>
      <div className="hidden lg:block flex-1 max-w-sm mx-8">
        <BlogSearch />
      </div>
      <div className="ml-auto">
        <Link href="/meet">
          <button className="bg-black text-white text-xs font-bold px-4 py-2 rounded-full hover:bg-gray-800 transition">
            Book a Meeting
          </button>
        </Link>
      </div>
    </nav>
  );
}