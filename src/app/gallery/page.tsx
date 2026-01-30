"use client";

import { useState, useEffect } from 'react';
import Image from "next/image";
import { XMarkIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

interface Photo {
  id: number;
  url: string;
  title: string;
  category: string;
  size: string;
  description: string;
  date: string;
}

const gradientMap: { [key: string]: string } = {
  'Nature': 'from-blue-500/20 to-cyan-500/20',
  'Urban': 'from-purple-500/20 to-pink-500/20',
  'Interior': 'from-orange-500/20 to-red-500/20',
  'Design': 'from-green-500/20 to-emerald-500/20',
  'Travel': 'from-amber-500/20 to-orange-500/20',
  'Portrait': 'from-indigo-500/20 to-blue-500/20',
};

export default function GalleryPage() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [filter, setFilter] = useState<string>("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPhotos();
  }, []);

  const loadPhotos = async () => {
    try {
      const response = await fetch('/api/gallery');
      const data = await response.json();
      setPhotos(data.photos || []);
    } catch (error) {
      console.error('Error loading photos:', error);
    } finally {
      setLoading(false);
    }
  };

  const categories = ["All", ...Array.from(new Set(photos.map(p => p.category)))];
  const filteredPhotos = filter === "All" 
    ? photos 
    : photos.filter(p => p.category === filter);

  const openLightbox = (photo: Photo) => {
    setSelectedPhoto(photo);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setSelectedPhoto(null);
    document.body.style.overflow = 'unset';
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 pt-24 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-slate-600">Loading gallery...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 pt-24">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-12">
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-slate-600 hover:text-blue-600 transition-colors mb-6 group"
          >
            <ArrowLeftIcon className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to home</span>
          </Link>

          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent">
            Gallery
          </h1>
          <p className="text-slate-600 text-lg mb-8">
            A collection of {photos.length} moments captured through my lens.
          </p>

          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2 rounded-full font-semibold text-sm transition-all ${
                  filter === cat
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                    : 'bg-white text-slate-600 border border-slate-200 hover:border-blue-400 hover:text-blue-600'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Empty State */}
        {filteredPhotos.length === 0 && (
          <div className="text-center py-20">
            <p className="text-slate-500 text-lg mb-4">No photos in this category yet.</p>
            <Link 
              href="/admin/gallery"
              className="text-blue-600 hover:text-purple-600 font-semibold"
            >
              Add photos →
            </Link>
          </div>
        )}

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[280px]">
          {filteredPhotos.map((photo, index) => (
            <div
              key={photo.id}
              onClick={() => openLightbox(photo)}
              className={`relative group overflow-hidden rounded-3xl bg-slate-100 cursor-pointer ${
                photo.size === "tall" ? "md:row-span-2" : ""
              } ${photo.size === "wide" ? "md:col-span-2" : ""}`}
              style={{ 
                animation: `fadeInUp 0.6s ease-out ${index * 0.1}s forwards`,
                opacity: 0 
              }}
            >
              {/* Gradient Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${gradientMap[photo.category] || gradientMap['Nature']} animate-pulse`} />
              
              {/* Image */}
              <div className="relative w-full h-full">
                <Image
                  src={photo.url}
                  alt={photo.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-8">
                <span className="inline-block w-fit text-xs font-bold text-white/90 uppercase tracking-widest mb-3 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm">
                  {photo.category}
                </span>
                
                <h3 className="text-white font-bold text-3xl leading-tight transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  {photo.title}
                </h3>

                {photo.description && (
                  <p className="text-white/80 text-sm mt-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    {photo.description}
                  </p>
                )}

                <button className="mt-4 w-fit px-6 py-3 bg-white/20 backdrop-blur-sm text-white text-sm font-semibold rounded-full border border-white/30 hover:bg-white/30 transition-all transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100">
                  View Full Size
                </button>
              </div>

              {/* Decorative corner */}
              <div className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-br ${gradientMap[photo.category] || gradientMap['Nature']} opacity-0 group-hover:opacity-60 blur-3xl transition-opacity duration-500 pointer-events-none`} />
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && selectedPhoto && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full text-white transition-all z-10"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>

          <div 
            className="relative max-w-6xl max-h-[90vh] w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={selectedPhoto.url}
                alt={selectedPhoto.title}
                fill
                className="object-contain"
              />
            </div>

            <div className="mt-8 text-center">
              <span className="inline-block text-xs font-bold text-white/60 uppercase tracking-widest mb-3">
                {selectedPhoto.category}
              </span>
              <h3 className="text-white font-bold text-4xl mb-2">
                {selectedPhoto.title}
              </h3>
              {selectedPhoto.description && (
                <p className="text-white/80 text-lg">
                  {selectedPhoto.description}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}