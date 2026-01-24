"use client";

import Image from "next/image";

// Sample Data - Replace 'url' with your actual image paths in /public
const photos = [
  { id: 1, url: "/photo1.jpg", title: "Mountain Peak", category: "Nature", size: "tall" },
  { id: 2, url: "/photo2.jpg", title: "Street Life", category: "Urban", size: "wide" },
  { id: 3, url: "/photo3.jpg", title: "Workspace", category: "Interior", size: "standard" },
  { id: 4, url: "/photo4.jpg", title: "Architecture", category: "Design", size: "standard" },
];

export default function GalleryGrid() {
  return (
    <section className="py-12">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Recent Captures</h2>
          <p className="text-gray-500 mt-2">Visual stories from my lens.</p>
        </div>
        <button className="text-sm font-semibold text-blue-600 hover:underline">
          View All Photos →
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[200px]">
        {photos.map((photo) => (
          <div
            key={photo.id}
            className={`relative group overflow-hidden rounded-2xl bg-gray-100 ${
              photo.size === "tall" ? "md:row-span-2" : ""
            } ${photo.size === "wide" ? "md:col-span-2" : ""}`}
          >
            {/* Image Component */}
            <div className="relative w-full h-full transition-transform duration-500 ease-in-out group-hover:scale-110">
              {/* Note: Ensure photos exist in /public or use placeholder URLs */}
              <div className="absolute inset-0 bg-slate-200 animate-pulse" /> {/* Placeholder loader */}
              <Image
                src={photo.url}
                alt={photo.title}
                fill
                className="object-cover"
              />
            </div>

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
              <span className="text-xs font-medium text-white/70 uppercase tracking-widest mb-1">
                {photo.category}
              </span>
              <h3 className="text-white font-bold text-lg leading-tight">
                {photo.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}