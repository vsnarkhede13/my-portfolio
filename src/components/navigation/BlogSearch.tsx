"use client";

import { useState } from 'react';
import Link from 'next/link';
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

// Sample blog data for searching - later you can move this to a central data file
const allPosts = [
  { title: "Building my 2026 Portfolio", path: "/blog/2026/january/week-1", tags: ["nextjs", "tech"] },
  { title: "The Art of Failure", path: "/blog/2025/december/week-4", tags: ["life", "warikoo"] },
  { title: "Why I love Tailwind CSS", path: "/blog/2026/february/week-1", tags: ["design"] },
];

export default function BlogSearch() {
  const [query, setQuery] = useState("");
  
  const filteredPosts = allPosts.filter((post) =>
    post.title.toLowerCase().includes(query.toLowerCase()) ||
    post.tags.some(tag => tag.includes(query.toLowerCase()))
  );

  return (
    <div className="relative w-full max-w-md">
      <div className="relative">
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search blogs or topics..."
          className="w-full pl-10 pr-4 py-2 bg-gray-100 border-none rounded-full text-sm focus:ring-2 focus:ring-blue-500 transition-all outline-none"
          onChange={(e) => setQuery(e.target.value)}
          value={query}
        />
      </div>

      {/* Results Dropdown */}
      {query.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border rounded-2xl shadow-2xl z-[60] max-h-60 overflow-y-auto p-2">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <Link 
                key={post.path} 
                href={post.path}
                onClick={() => setQuery("")}
                className="block p-3 hover:bg-gray-50 rounded-xl transition"
              >
                <p className="text-sm font-semibold text-gray-900">{post.title}</p>
                <div className="flex gap-2 mt-1">
                  {post.tags.map(tag => (
                    <span key={tag} className="text-[10px] text-blue-600 font-mono">#{tag}</span>
                  ))}
                </div>
              </Link>
            ))
          ) : (
            <p className="p-4 text-sm text-gray-500 text-center">No matches found.</p>
          )}
        </div>
      )}
    </div>
  );
}