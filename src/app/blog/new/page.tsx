"use client"
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import dynamic from 'next/dynamic'

const RichTextEditor = dynamic(
  () => import('@/components/RichTextEditor'),
  { 
    ssr: false,
    loading: () => (
      <div className="w-full bg-slate-900 min-h-[500px] animate-pulse">
        <div className="h-12 bg-slate-800/50 mb-4" />
        <div className="h-96 bg-slate-800/30" />
      </div>
    )
  }
);

export default function NewBlogPost() {
  const router = useRouter();
  const { session } = useAuth();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    image: '',
    location: {
      name: '',
      country: '',
      elevation: 0
    },
    trekDetails: {
      difficulty: 'Moderate' as const,
      duration: 1,
      bestSeasons: ['Spring']
    }
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const difficultyLevels = ['Easy', 'Moderate', 'Difficult', 'Expert'] as const;
  const seasons = ['Spring', 'Summer', 'Autumn', 'Winter'];

  useEffect(() => {
    if (!session) {
      router.push('/login');
    } else {
      setIsLoading(false);
    }
  }, [session, router]);

  if (!session || isLoading) {
    return <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500" />
    </div>;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const res = await fetch('/api/blog', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Important for auth
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to create post');
      }

      router.push('/blog');
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'Failed to create post. Please try again.');
      if (err.message.includes('Unauthorized')) {
        router.push('/login');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="min-h-screen bg-slate-900">
      <div className="max-w-[95%] sm:max-w-[90%] xl:max-w-8xl mx-auto px-2 sm:px-4 pt-8 sm:pt-16">
        <div className="mb-8">
          <label htmlFor="title" className="block text-sm font-medium text-slate-400 mb-2">
            Title
          </label>
          <input
            id="title"
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            className="w-full text-4xl font-bold border-none outline-none placeholder-slate-600 bg-transparent text-slate-200"
            placeholder="Enter your story title..."
            required
          />
        </div>

        <div className="mb-8">
          <label htmlFor="image" className="block text-sm font-medium text-slate-400 mb-2">
            Cover Image URL
          </label>
          <input
            id="image"
            type="url"
            value={formData.image}
            onChange={(e) => setFormData({...formData, image: e.target.value})}
            className="w-full px-4 py-2 border border-slate-700 rounded-lg bg-slate-800/50 text-slate-300 placeholder-slate-500"
            placeholder="Add a cover image URL (optional)"
          />
        </div>

        {/* Location Details */}
        <div className="mb-6 md:mb-8">
          <h2 className="text-base md:text-lg font-semibold text-slate-300 mb-4">Location Details</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label htmlFor="location-name" className="block text-sm font-medium text-slate-400 mb-2">
                Location Name
              </label>
              <input
                id="location-name"
                type="text"
                value={formData.location.name}
                onChange={(e) => setFormData({
                  ...formData,
                  location: { ...formData.location, name: e.target.value }
                })}
                className="w-full px-4 py-2 border border-slate-700 rounded-lg bg-slate-800/50 text-slate-300 placeholder-slate-500"
                placeholder="e.g., Mount Everest"
                required
              />
            </div>
            <div>
              <label htmlFor="country" className="block text-sm font-medium text-slate-400 mb-2">
                Country
              </label>
              <input
                id="country"
                type="text"
                value={formData.location.country}
                onChange={(e) => setFormData({
                  ...formData,
                  location: { ...formData.location, country: e.target.value }
                })}
                className="w-full px-4 py-2 border border-slate-700 rounded-lg bg-slate-800/50 text-slate-300 placeholder-slate-500"
                placeholder="e.g., Nepal"
                required
              />
            </div>
            <div>
              <label htmlFor="elevation" className="block text-sm font-medium text-slate-400 mb-2">
                Elevation (meters)
              </label>
              <input
                id="elevation"
                type="number"
                value={formData.location.elevation}
                onChange={(e) => setFormData({
                  ...formData,
                  location: { ...formData.location, elevation: parseInt(e.target.value) || 0 }
                })}
                className="w-full px-4 py-2 border border-slate-700 rounded-lg bg-slate-800/50 text-slate-300 placeholder-slate-500"
                placeholder="e.g., 5364"
                required
                min="0"
              />
            </div>
          </div>
        </div>

        {/* Trek Details */}
        <div className="mb-6 md:mb-8">
          <h2 className="text-base md:text-lg font-semibold text-slate-300 mb-4">Trek Details</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label htmlFor="difficulty" className="block text-sm font-medium text-slate-400 mb-2">
                Difficulty Level
              </label>
              <select
                id="difficulty"
                value={formData.trekDetails.difficulty}
                onChange={(e) => setFormData({
                  ...formData,
                  trekDetails: { ...formData.trekDetails, difficulty: e.target.value as any }
                })}
                className="w-full px-4 py-2 border border-slate-700 rounded-lg bg-slate-800/50 text-slate-300"
                required
              >
                {difficultyLevels.map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label htmlFor="duration" className="block text-sm font-medium text-slate-400 mb-2">
                Duration (days)
              </label>
              <input
                id="duration"
                type="number"
                value={formData.trekDetails.duration}
                onChange={(e) => setFormData({
                  ...formData,
                  trekDetails: { ...formData.trekDetails, duration: parseInt(e.target.value) || 1 }
                })}
                className="w-full px-4 py-2 border border-slate-700 rounded-lg bg-slate-800/50 text-slate-300 placeholder-slate-500"
                placeholder="e.g., 14"
                required
                min="1"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">
                Best Seasons
              </label>
              <div className="flex flex-wrap gap-2 p-2 border border-slate-700 rounded-lg bg-slate-800/50">
                {seasons.map(season => (
                  <label key={season} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={formData.trekDetails.bestSeasons.includes(season)}
                      onChange={(e) => {
                        const updatedSeasons = e.target.checked
                          ? [...formData.trekDetails.bestSeasons, season]
                          : formData.trekDetails.bestSeasons.filter(s => s !== season);
                        setFormData({
                          ...formData,
                          trekDetails: { ...formData.trekDetails, bestSeasons: updatedSeasons }
                        });
                      }}
                      className="form-checkbox text-emerald-500"
                    />
                    <span className="text-slate-300">{season}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-lg font-semibold text-slate-300 mb-4">
            Story Content
          </label>
          <RichTextEditor
            value={formData.content}
            onChange={(content) => setFormData(prev => ({ ...prev, content }))}
            placeholder="Tell your story..."
          />
        </div>
      </div>
      <div className="fixed bottom-0 left-0 right-0 bg-slate-900/80 backdrop-blur-sm border-t border-slate-800 py-3 md:py-4">
        <div className="max-w-[95%] sm:max-w-[90%] xl:max-w-8xl mx-auto px-2 sm:px-4 flex justify-end gap-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-2 text-slate-400 hover:text-slate-200"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="px-6 py-2 bg-emerald-600 text-white rounded-full hover:bg-emerald-700 disabled:opacity-50"
          >
            {isSubmitting ? 'Publishing...' : 'Publish'}
          </button>
        </div>
      </div>
    </form>
  );
}
