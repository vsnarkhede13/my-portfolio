// File path: src/app/admin/dashboard/page.tsx

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  FileText, 
  Image, 
  Calendar, 
  Save, 
  Upload, 
  GitBranch,
  LogOut,
  Plus,
  Trash2,
  Eye,
  Clock
} from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  category: string;
  date: string;
  status: 'draft' | 'published' | 'scheduled';
  scheduledDate?: string;
  readTime: string;
}

interface Photo {
  id: string;
  title: string;
  category: string;
  file: File | null;
  url?: string;
  description: string;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<'blog' | 'photo'>('blog');
  const [loading, setLoading] = useState(false);
  
  // Blog state
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [currentBlog, setCurrentBlog] = useState<BlogPost>({
    id: '',
    title: '',
    content: '',
    category: 'Technology',
    date: new Date().toISOString().split('T')[0],
    status: 'draft',
    readTime: '5 min read'
  });

  // Photo state
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [currentPhoto, setCurrentPhoto] = useState<Photo>({
    id: '',
    title: '',
    category: 'Nature',
    file: null,
    description: ''
  });

  useEffect(() => {
    const token = sessionStorage.getItem('adminAuth');
    if (!token) {
      router.push('/admin/login');
      return;
    }
    
    // Verify token
    fetch('/api/admin/auth', {
      headers: { 'Authorization': `Bearer ${token}` }
    }).then(res => {
      if (res.ok) {
        setAuthenticated(true);
        loadContent();
      } else {
        router.push('/admin/login');
      }
    });
  }, [router]);

  const loadContent = async () => {
    try {
      const [blogsRes, photosRes] = await Promise.all([
        fetch('/api/admin/blogs'),
        fetch('/api/admin/photos')
      ]);
      
      if (blogsRes.ok) {
        const blogs = await blogsRes.json();
        setBlogPosts(blogs);
      }
      
      if (photosRes.ok) {
        const photos = await photosRes.json();
        setPhotos(photos);
      }
    } catch (error) {
      console.error('Failed to load content:', error);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('adminAuth');
    router.push('/admin/login');
  };

  const saveBlog = async (status: 'draft' | 'published' | 'scheduled') => {
    setLoading(true);
    try {
      const blogData = {
        ...currentBlog,
        id: currentBlog.id || Date.now().toString(),
        status,
        date: status === 'published' ? new Date().toISOString().split('T')[0] : currentBlog.date
      };

      const response = await fetch('/api/admin/blogs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(blogData)
      });

      if (response.ok) {
        alert(`Blog ${status} successfully!`);
        loadContent();
        setCurrentBlog({
          id: '',
          title: '',
          content: '',
          category: 'Technology',
          date: new Date().toISOString().split('T')[0],
          status: 'draft',
          readTime: '5 min read'
        });
      }
    } catch (error) {
      alert('Failed to save blog');
    } finally {
      setLoading(false);
    }
  };

  const uploadPhoto = async () => {
    if (!currentPhoto.file) {
      alert('Please select a photo');
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('file', currentPhoto.file);
      formData.append('title', currentPhoto.title);
      formData.append('category', currentPhoto.category);
      formData.append('description', currentPhoto.description);

      const response = await fetch('/api/admin/photos', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        alert('Photo uploaded successfully!');
        loadContent();
        setCurrentPhoto({
          id: '',
          title: '',
          category: 'Nature',
          file: null,
          description: ''
        });
      }
    } catch (error) {
      alert('Failed to upload photo');
    } finally {
      setLoading(false);
    }
  };

  const commitToGit = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/admin/git-commit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: `Update content - ${new Date().toLocaleString()}`
        })
      });

      const data = await response.json();
      if (response.ok) {
        alert('Changes committed and pushed to Git successfully!');
      } else {
        alert(data.message || 'Git commit failed');
      }
    } catch (error) {
      alert('Failed to commit to Git');
    } finally {
      setLoading(false);
    }
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Admin Dashboard
            </h1>
            <div className="flex items-center space-x-4">
              <button
                onClick={commitToGit}
                disabled={loading}
                className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors disabled:opacity-50"
              >
                <GitBranch className="w-4 h-4" />
                <span>Commit to Git</span>
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setActiveTab('blog')}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-colors ${
              activeTab === 'blog'
                ? 'bg-blue-600 text-white'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            <FileText className="w-5 h-5" />
            <span>Blog Posts</span>
          </button>
          <button
            onClick={() => setActiveTab('photo')}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-colors ${
              activeTab === 'photo'
                ? 'bg-blue-600 text-white'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            <Image className="w-5 h-5" />
            <span>Gallery Photos</span>
          </button>
        </div>

        {/* Blog Tab */}
        {activeTab === 'blog' && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              Create/Edit Blog Post
            </h2>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    value={currentBlog.title}
                    onChange={(e) => setCurrentBlog({ ...currentBlog, title: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="Enter blog title"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Category
                  </label>
                  <select
                    value={currentBlog.category}
                    onChange={(e) => setCurrentBlog({ ...currentBlog, category: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="Technology">Technology</option>
                    <option value="Development">Development</option>
                    <option value="Design">Design</option>
                    <option value="Tutorial">Tutorial</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Read Time
                  </label>
                  <input
                    type="text"
                    value={currentBlog.readTime}
                    onChange={(e) => setCurrentBlog({ ...currentBlog, readTime: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="e.g., 5 min read"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Schedule Date (for scheduled posts)
                  </label>
                  <input
                    type="date"
                    value={currentBlog.scheduledDate || ''}
                    onChange={(e) => setCurrentBlog({ ...currentBlog, scheduledDate: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Content (Markdown supported)
                </label>
                <textarea
                  value={currentBlog.content}
                  onChange={(e) => setCurrentBlog({ ...currentBlog, content: e.target.value })}
                  rows={12}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white font-mono"
                  placeholder="Write your blog content here..."
                />
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => saveBlog('draft')}
                  disabled={loading}
                  className="flex items-center space-x-2 px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors disabled:opacity-50"
                >
                  <Save className="w-4 h-4" />
                  <span>Save as Draft</span>
                </button>
                
                <button
                  onClick={() => saveBlog('published')}
                  disabled={loading}
                  className="flex items-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50"
                >
                  <Eye className="w-4 h-4" />
                  <span>Publish Now</span>
                </button>
                
                <button
                  onClick={() => saveBlog('scheduled')}
                  disabled={loading}
                  className="flex items-center space-x-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors disabled:opacity-50"
                >
                  <Clock className="w-4 h-4" />
                  <span>Schedule Post</span>
                </button>
              </div>
            </div>

            {/* Existing Posts */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Existing Posts
              </h3>
              <div className="space-y-3">
                {blogPosts.map((post) => (
                  <div
                    key={post.id}
                    className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                  >
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">{post.title}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {post.category} • {post.status} • {post.date}
                      </p>
                    </div>
                    <button
                      onClick={() => setCurrentBlog(post)}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm"
                    >
                      Edit
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Photo Tab */}
        {activeTab === 'photo' && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              Upload Photo to Gallery
            </h2>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    value={currentPhoto.title}
                    onChange={(e) => setCurrentPhoto({ ...currentPhoto, title: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="Enter photo title"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Category
                  </label>
                  <select
                    value={currentPhoto.category}
                    onChange={(e) => setCurrentPhoto({ ...currentPhoto, category: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="Nature">Nature</option>
                    <option value="Architecture">Architecture</option>
                    <option value="Portrait">Portrait</option>
                    <option value="Street">Street</option>
                    <option value="Food">Food</option>
                    <option value="Travel">Travel</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  value={currentPhoto.description}
                  onChange={(e) => setCurrentPhoto({ ...currentPhoto, description: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Photo description"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Photo File
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setCurrentPhoto({ 
                    ...currentPhoto, 
                    file: e.target.files?.[0] || null 
                  })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>

              <button
                onClick={uploadPhoto}
                disabled={loading}
                className="flex items-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50"
              >
                <Upload className="w-4 h-4" />
                <span>Upload Photo</span>
              </button>
            </div>

            {/* Existing Photos */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Gallery Photos
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {photos.map((photo) => (
                  <div key={photo.id} className="relative group">
                    <img
                      src={photo.url}
                      alt={photo.title}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                      <p className="text-white text-sm font-medium">{photo.title}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
