'use client'
import { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import type { BlogPost } from '@/models/Blog';

// Create a separate component for the content
const BlogContent = ({ post, onDelete }: { post: BlogPost; onDelete: () => void }) => {
  const { session } = useAuth();
  const router = useRouter();

  return (
    <div className="prose prose-lg prose-invert max-w-none">
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
      {session?.user?.email === post.author && (
        <div className="mt-8 pt-8 border-t border-slate-700 flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => router.push(`/blog/edit/${post._id}`)}
            className="px-6 py-2 text-emerald-400 hover:text-emerald-300 flex items-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Edit
          </button>
          <button
            type="button"
            onClick={onDelete}
            className="px-6 py-2 text-red-400 hover:text-red-300 flex items-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default function BlogPost({ params: paramsPromise }: { params: Promise<{ id: string }> }) {
  const params = use(paramsPromise);
  const router = useRouter();
  const { session } = useAuth();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!params.id) return;
    
    fetch(`/api/blog/${params.id}`)
      .then(res => res.json())
      .then(data => {
        if (data.error) throw new Error(data.error);
        setPost(data);
      })
      .catch(err => setError(err.message))
      .finally(() => setIsLoading(false));
  }, [params.id]);

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this post?')) return;

    try {
      const res = await fetch(`/api/blog/${params.id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete post');
      router.push('/blog');
      router.refresh();
    } catch (err) {
      setError('Failed to delete post');
    }
  };

  if (isLoading) return (
    <div className="min-h-screen pt-24 flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
    </div>
  );
  
  if (error) return (
    <div className="min-h-screen pt-24 flex items-center justify-center text-red-600">
      <p>Error: {error}</p>
    </div>
  );

  if (!post) return (
    <div className="min-h-screen pt-24 flex items-center justify-center text-slate-600">
      <p>Post not found</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Hero Section with Cover Image */}
      <section className="relative min-h-[40vh] md:min-h-[60vh] flex items-end bg-slate-900">
        {post.image && (
          <>
            <div className="absolute inset-0">
              <img 
                src={post.image} 
                alt={post.title} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />
          </>
        )}
        <div className="relative container mx-auto px-4 z-10 pb-8 md:pb-16 pt-24 md:pt-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-[95%] md:max-w-[90%] xl:max-w-8xl mx-auto"
          >
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-4 md:mb-6 text-shadow-lg">
              {post.title}
            </h1>
            <div className="flex flex-col sm:flex-row items-start sm:items-center text-gray-100 space-y-2 sm:space-y-0 sm:space-x-4">
              <span className="flex items-center backdrop-blur-sm bg-slate-900/30 px-4 py-2 rounded-full">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                {post.author}
              </span>
              <span className="backdrop-blur-sm bg-slate-900/30 px-4 py-2 rounded-full flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {new Date(post.createdAt).toLocaleDateString()}
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-8 md:py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-[95%] md:max-w-[90%] xl:max-w-8xl mx-auto"
          >
            <div className="bg-slate-800 rounded-xl shadow-lg p-4 md:p-8">
              {post && <BlogContent post={post} onDelete={handleDelete} />}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
