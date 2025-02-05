"use client"
import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import type { BlogPost } from '@/models/Blog';

function stripHtml(html: string) {
  const tmp = document.createElement('div');
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || '';
}

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const { session } = useAuth();

  useEffect(() => {
    fetch('/api/blog')
      .then(res => res.json())
      .then(setPosts);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="relative py-32 bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-gradient-to-b from-slate-900 to-slate-800">
          <Image 
            src="/mountain.svg" 
            alt="Hero Background" 
            fill
            className="object-cover mix-blend-overlay" 
          />
        </div>

        <div className="relative container mx-auto px-4 z-10">
          <div className="max-w-6xl mx-auto text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight"
            >
              Trek Stories & Adventures
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto"
            >
              Discover stories from the trails, expert tips, and mountain adventures from fellow trekkers around the world
            </motion.p>
            {session && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Link 
                  href="/blog/new" 
                  className="inline-flex items-center px-8 py-4 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors text-lg font-semibold"
                >
                  <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Share Your Story
                </Link>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Trail-style Blog Posts */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto relative">
            {/* Trail Path */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-emerald-200 transform -translate-x-1/2 z-0" />
            
            {posts.map((post, index) => (
              <motion.div
                key={post._id?.toString()}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative z-10 flex mb-32 items-center gap-8"
              >
                {/* Metadata Column */}
                <div 
                  className={`w-[calc(50%-0.125rem)] flex ${
                    index % 2 === 0 ? 'order-1 justify-end' : 'order-3 justify-start'
                  }`}
                >
                  <div className={`flex flex-col ${index % 2 === 0 ? 'items-end text-right' : 'items-start'}`}>
                    <span className="text-lg font-semibold text-slate-700 mb-1">
                      {post.author.split('@')[0]}
                    </span>
                    <time className="text-emerald-600 text-sm">
                      {new Date(post.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </time>
                  </div>
                </div>

                {/* Trail Marker Point */}
                <div className="order-2 flex-shrink-0 w-0.5 flex items-center justify-center">
                  <div className="w-4 h-4 bg-emerald-600 rounded-full ring-4 ring-white" />
                </div>

                {/* Card Column */}
                <Link 
                  href={`/blog/${post._id}`} 
                  className={`w-[calc(50%-0.125rem)] ${index % 2 === 0 ? 'order-3' : 'order-1'}`}
                >
                  <div className="bg-white rounded-xl border border-slate-100 overflow-hidden hover:border-emerald-200 transition-all duration-300 transform hover:-translate-y-1">
                    {post.image && (
                      <div className="relative h-52 overflow-hidden">
                        <Image 
                          src={post.image} 
                          alt={post.title}
                          fill
                          className="object-cover transition-transform duration-300 hover:scale-105"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <h2 className="text-xl font-bold text-slate-800 mb-3 line-clamp-2 leading-tight">
                        {post.title}
                      </h2>
                      <p className="text-slate-600 line-clamp-2 text-sm mb-4 leading-relaxed">
                        {stripHtml(post.content)}
                      </p>
                      <div className="inline-flex items-center text-emerald-600 font-medium text-sm group">
                        Read Story
                        <svg className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
