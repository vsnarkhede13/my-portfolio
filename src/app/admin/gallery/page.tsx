"use client";

import { useState, useEffect } from 'react';
import { PlusIcon, TrashIcon, ArrowLeftIcon, PhotoIcon } from '@heroicons/react/24/outline';
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

export default function GalleryAdmin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [editingPhoto, setEditingPhoto] = useState<Photo | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  // Simple password protection (change this!)
  const ADMIN_PASSWORD = 'Mrunal@2898'; // TODO: Change this to your secure password

  useEffect(() => {
    if (isAuthenticated) {
      loadPhotos();
    }
  }, [isAuthenticated]);

  const loadPhotos = async () => {
    try {
      const response = await fetch('/api/gallery');
      const data = await response.json();
      setPhotos(data.photos);
    } catch (error) {
      console.error('Error loading photos:', error);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      // Store in sessionStorage for this session only
      sessionStorage.setItem('admin_auth', 'true');
    } else {
      alert('Incorrect password!');
    }
  };

  const handleAddPhoto = async (newPhoto: Omit<Photo, 'id'>) => {
    const photo: Photo = {
      ...newPhoto,
      id: Math.max(...photos.map(p => p.id), 0) + 1,
    };

    const updatedPhotos = [...photos, photo];
    
    try {
      const response = await fetch('/api/gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ photos: updatedPhotos }),
      });

      if (response.ok) {
        setPhotos(updatedPhotos);
        setShowAddForm(false);
        alert('Photo added successfully!');
      }
    } catch (error) {
      console.error('Error adding photo:', error);
      alert('Failed to add photo');
    }
  };

  const handleDeletePhoto = async (id: number) => {
    if (!confirm('Are you sure you want to delete this photo?')) return;

    const updatedPhotos = photos.filter(p => p.id !== id);
    
    try {
      const response = await fetch('/api/gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ photos: updatedPhotos }),
      });

      if (response.ok) {
        setPhotos(updatedPhotos);
        alert('Photo deleted successfully!');
      }
    } catch (error) {
      console.error('Error deleting photo:', error);
      alert('Failed to delete photo');
    }
  };

  const handleUpdatePhoto = async (updatedPhoto: Photo) => {
    const updatedPhotos = photos.map(p => p.id === updatedPhoto.id ? updatedPhoto : p);
    
    try {
      const response = await fetch('/api/gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ photos: updatedPhotos }),
      });

      if (response.ok) {
        setPhotos(updatedPhotos);
        setEditingPhoto(null);
        alert('Photo updated successfully!');
      }
    } catch (error) {
      console.error('Error updating photo:', error);
      alert('Failed to update photo');
    }
  };

  // Login Screen
  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 shadow-2xl border border-slate-200">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl mb-4">
              <PhotoIcon className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Gallery Admin</h1>
            <p className="text-slate-600">Enter password to continue</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Admin password"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-none transition-all"
                autoFocus
              />
            </div>
            <button
              type="submit"
              className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl hover:shadow-xl transition-all"
            >
              Login
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link href="/" className="text-sm text-slate-600 hover:text-blue-600 transition-colors">
              ← Back to home
            </Link>
          </div>
        </div>
      </main>
    );
  }

  // Admin Dashboard
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <Link 
              href="/"
              className="inline-flex items-center gap-2 text-slate-600 hover:text-blue-600 transition-colors mb-4 group"
            >
              <ArrowLeftIcon className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              <span>Back to home</span>
            </Link>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent">
              Gallery Manager
            </h1>
            <p className="text-slate-600 mt-2">{photos.length} photos in gallery</p>
          </div>

          <button
            onClick={() => setShowAddForm(true)}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl hover:shadow-xl transition-all flex items-center gap-2"
          >
            <PlusIcon className="h-5 w-5" />
            Add Photo
          </button>
        </div>

        {/* Instructions */}
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-8">
          <h3 className="font-bold text-blue-900 mb-2">📝 How to add photos:</h3>
          <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
            <li>Upload your image to <code className="bg-blue-100 px-2 py-0.5 rounded">/public/gallery/</code> folder</li>
            <li>Click "Add Photo" and enter the filename (e.g., <code className="bg-blue-100 px-2 py-0.5 rounded">photo5.jpg</code>)</li>
            <li>Fill in the details and save</li>
            <li>Changes are saved automatically!</li>
          </ol>
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {photos.map((photo) => (
            <div key={photo.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="aspect-video bg-slate-100 relative">
                <img 
                  src={photo.url} 
                  alt={photo.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300"><rect fill="%23f1f5f9" width="400" height="300"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%2394a3b8" font-family="sans-serif">Image not found</text></svg>';
                  }}
                />
              </div>
              
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-bold text-slate-900">{photo.title}</h3>
                    <p className="text-xs text-slate-500">{photo.category}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    photo.size === 'tall' ? 'bg-blue-100 text-blue-700' :
                    photo.size === 'wide' ? 'bg-purple-100 text-purple-700' :
                    'bg-slate-100 text-slate-700'
                  }`}>
                    {photo.size}
                  </span>
                </div>

                <p className="text-sm text-slate-600 mb-3 line-clamp-2">{photo.description}</p>
                
                <div className="flex gap-2">
                  <button
                    onClick={() => setEditingPhoto(photo)}
                    className="flex-1 px-3 py-2 bg-slate-100 text-slate-700 text-sm font-semibold rounded-lg hover:bg-slate-200 transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeletePhoto(photo.id)}
                    className="px-3 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                  >
                    <TrashIcon className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add/Edit Form Modal */}
        {(showAddForm || editingPhoto) && (
          <PhotoFormModal
            photo={editingPhoto}
            onSave={(photo) => {
              if (editingPhoto) {
                handleUpdatePhoto(photo as Photo);
              } else {
                handleAddPhoto(photo);
              }
            }}
            onCancel={() => {
              setShowAddForm(false);
              setEditingPhoto(null);
            }}
          />
        )}
      </div>
    </main>
  );
}

// Photo Form Modal Component
function PhotoFormModal({ 
  photo, 
  onSave, 
  onCancel 
}: { 
  photo: Photo | null; 
  onSave: (photo: Omit<Photo, 'id'> | Photo) => void; 
  onCancel: () => void;
}) {
  const [formData, setFormData] = useState({
    url: photo?.url || '/gallery/',
    title: photo?.title || '',
    category: photo?.category || 'Nature',
    size: photo?.size || 'standard',
    description: photo?.description || '',
    date: photo?.date || new Date().toISOString().split('T')[0],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (photo) {
      onSave({ ...formData, id: photo.id });
    } else {
      onSave(formData);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-6 z-50">
      <div className="bg-white rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">
          {photo ? 'Edit Photo' : 'Add New Photo'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Image Path *
            </label>
            <input
              type="text"
              required
              value={formData.url}
              onChange={(e) => setFormData({ ...formData, url: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-none transition-all"
              placeholder="/gallery/photo5.jpg"
            />
            <p className="text-xs text-slate-500 mt-1">Upload image to public/gallery/ first</p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Title *
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-none transition-all"
              placeholder="Mountain Peak"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Category *
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-none transition-all"
              >
                <option value="Nature">Nature</option>
                <option value="Urban">Urban</option>
                <option value="Interior">Interior</option>
                <option value="Design">Design</option>
                <option value="Travel">Travel</option>
                <option value="Portrait">Portrait</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Size *
              </label>
              <select
                value={formData.size}
                onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-none transition-all"
              >
                <option value="standard">Standard</option>
                <option value="tall">Tall (2x height)</option>
                <option value="wide">Wide (2x width)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Description
            </label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-none transition-all resize-none"
              placeholder="A brief description of the photo"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 px-6 py-3 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl hover:shadow-xl transition-all"
            >
              {photo ? 'Update' : 'Add'} Photo
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}