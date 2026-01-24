"use client";

import { useState } from 'react';
import Image from "next/image";
import { XMarkIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

const photos = [
  { id: 1, url: "/photo1.jpg", title: "Mountain Peak", category: "Nature", size: "tall", color: "from-blue-500/20 to-cyan-500/20" },
  { id: 2, url: "/photo2.jpg", title: "Street Life", category: "Urban", size: "wide", color: "from-purple-500/20 to-pink-500/20" },
  { id: 3, url: "/photo3.jpg", title: "Workspace", category: "Interior", size: "standard", color: "from-orange-500/20 to-red-500/20" },
  { id: 4, url: "/photo4.jpg", title: "Architecture", category: "Design", size: "standard", color: "from-green-500/20 to-emerald-500/20" },
];

export default function GalleryGrid() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<typeof photos[0] | null>(null);

  const openLightbox = (photo: typeof photos[0]) => {
    setSelectedPhoto(photo);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setSelectedPhoto(null);
    document.body.style.overflow = 'unset';
  };

  return (
    <>
      <section id="gallery" className="py-20">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4 fade-in-up">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-3">
              <span className="bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent">
                Recent Captures
              </span>
            </h2>
            <p className="text-slate-600 text-lg">Visual stories from my lens.</p>
          </div>
          <Link 
            href="/gallery"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-purple-600 transition-colors"
          >
            <span>View All Photos</span>
            <ArrowRightIcon className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[240px]">
          {photos.map((photo, index) => (
            <div
              key={photo.id}
              onClick={() => openLightbox(photo)}
              className={`relative group overflow-hidden rounded-2xl bg-slate-100 cursor-pointer ${
                photo.size === "tall" ? "md:row-span-2" : ""
              } ${photo.size === "wide" ? "md:col-span-2" : ""}`}
              style={{ 
                animation: `fadeInUp 0.6s ease-out ${index * 0.1}s forwards`,
                opacity: 0 
              }}
            >
              {/* Gradient Background Placeholder */}
              <div className={`absolute inset-0 bg-gradient-to-br ${photo.color} animate-pulse`} />
              
              {/* Image */}
              <div className="relative w-full h-full">
                <Image
                  src={photo.url}
                  alt={photo.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-6">
                {/* Category Badge */}
                <span className="inline-block w-fit text-xs font-bold text-white/90 uppercase tracking-widest mb-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm">
                  {photo.category}
                </span>
                
                {/* Title */}
                <h3 className="text-white font-bold text-2xl leading-tight transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  {photo.title}
                </h3>

                {/* View Button */}
                <button className="mt-4 w-fit px-4 py-2 bg-white/20 backdrop-blur-sm text-white text-sm font-semibold rounded-full border border-white/30 hover:bg-white/30 transition-all transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100">
                  View Full Size
                </button>
              </div>

              {/* Decorative corner gradient */}
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${photo.color} opacity-0 group-hover:opacity-60 blur-2xl transition-opacity duration-500 pointer-events-none`} />
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox Modal */}
      {lightboxOpen && selectedPhoto && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4 animate-fadeIn"
          onClick={closeLightbox}
        >
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full text-white transition-all z-10"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>

          {/* Image Container */}
          <div 
            className="relative max-w-6xl max-h-[90vh] w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-video rounded-xl overflow-hidden">
              <Image
                src={selectedPhoto.url}
                alt={selectedPhoto.title}
                fill
                className="object-contain"
              />
            </div>

            {/* Image Info */}
            <div className="mt-6 text-center">
              <span className="inline-block text-xs font-bold text-white/60 uppercase tracking-widest mb-2">
                {selectedPhoto.category}
              </span>
              <h3 className="text-white font-bold text-3xl">
                {selectedPhoto.title}
              </h3>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </>
  );
}