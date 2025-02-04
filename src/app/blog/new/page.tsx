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
    image: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

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
      <div className="max-w-[90%] xl:max-w-8xl mx-auto px-4 pt-16">
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({...formData, title: e.target.value})}
          className="w-full text-4xl font-bold border-none outline-none mb-8 placeholder-slate-600 bg-transparent text-slate-200"
          placeholder="Enter your story title..."
        />
        <input
          type="url"
          value={formData.image}
          onChange={(e) => setFormData({...formData, image: e.target.value})}
          className="w-full px-4 py-2 border border-slate-700 rounded-lg mb-8 bg-slate-800/50 text-slate-300 placeholder-slate-500"
          placeholder="Add a cover image URL (optional)"
        />
        <RichTextEditor
          value={formData.content}
          onChange={(content) => setFormData(prev => ({ ...prev, content }))}
          placeholder="Tell your story..."
        />
      </div>
      <div className="fixed bottom-0 left-0 right-0 bg-slate-900/80 backdrop-blur-sm border-t border-slate-800 py-4">
        <div className="max-w-[90%] xl:max-w-8xl mx-auto px-4 flex justify-end gap-4">
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
