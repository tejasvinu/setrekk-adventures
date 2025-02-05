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

function getReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const wordCount = stripHtml(content).trim().split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
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
      <section className="relative py-10 md:py-20 bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-gradient-to-b from-slate-900 to-slate-800">
          <Image 
            src="/mountain.svg" 
            alt="Hero Background" 
            fill
            className="object-cover mix-blend-overlay" 
          />
        </div>

        <div className="relative container mx-auto px-4 z-10">
          <div className="max-w-7xl mx-auto text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-4 md:mb-6 tracking-tight"
            >
              Trek Stories & Adventures
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg md:text-xl text-gray-300 mb-8 md:mb-12 max-w-3xl mx-auto px-4"
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

      {/* Blog Posts Section */}
      <section className="py-6 md:py-16 relative">
        <div className="relative px-4 md:px-6">
          <div className="max-w-[1920px] mx-auto relative">
            {/* Trail Path - Desktop */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-emerald-200 transform -translate-x-1/2" />
            
            {/* Trail Path - Mobile */}
            <div className="md:hidden absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-emerald-200/0 via-emerald-200 to-emerald-200/0" />

            {posts.map((post, index) => (
              <motion.div
                key={post._id?.toString()}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative z-10"
              >
                {/* Mobile Layout */}
                <div className="block md:hidden">
                  <div className="relative pl-10 mb-8">
                    {/* Trail Marker - Mobile */}
                    <div className="absolute left-[22px] top-4 w-3 h-3 bg-emerald-600 rounded-full ring-[3px] ring-white shadow-sm z-10" />
                    
                    <Link href={`/blog/${post._id}`} className="block focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 rounded-xl">
                      <motion.div 
                        whileHover={{ y: -4 }}
                        transition={{ duration: 0.2 }}
                        className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden relative border border-slate-100/50"
                      >
                        {post.image && (
                          <div className="relative h-[240px] overflow-hidden">
                            <Image 
                              src={post.image} 
                              alt={post.title}
                              fill
                              className="object-cover transition-transform duration-500 hover:scale-105"
                            />
                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                            
                            {/* Location Badge */}
                            <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm">
                              <div className="flex items-center gap-1.5 text-xs font-medium text-slate-700">
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                </svg>
                                {post.location.name}
                              </div>
                            </div>

                            {/* Title on Image */}
                            <h2 className="absolute bottom-3 left-4 right-4 text-xl font-bold text-white leading-tight">
                              {post.title}
                            </h2>
                          </div>
                        )}
                        
                        <div className="p-4">
                          {/* Stats Row */}
                          <div className="flex items-center justify-between mb-4 text-xs">
                            <div className="flex items-center gap-2">
                              <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-full font-medium border border-emerald-100/50">
                                {post.trekDetails.difficulty}
                              </span>
                              <span className="px-2.5 py-1 bg-slate-50 text-slate-600 rounded-full border border-slate-100/50">
                                {post.trekDetails.duration}d
                              </span>
                            </div>
                            <div className="flex items-center gap-1.5 text-slate-500 bg-slate-50 px-2.5 py-1 rounded-full border border-slate-100/50">
                              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                              </svg>
                              {post.location.elevation}m
                            </div>
                          </div>

                          {/* Author Row */}
                          <div className="flex items-center justify-between pt-1">
                            <div className="flex items-center gap-2.5">
                              <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center ring-2 ring-emerald-50">
                                <span className="text-sm font-bold text-emerald-600">
                                  {post.author.split('@')[0][0].toUpperCase()}
                                </span>
                              </div>
                              <div className="text-sm">
                                <p className="font-medium text-slate-700 leading-tight">{post.author.split('@')[0]}</p>
                                <p className="text-emerald-600 text-xs font-medium">{getReadingTime(post.content)} min read</p>
                              </div>
                            </div>
                            <div className="flex items-center text-emerald-600 group">
                              <span className="text-sm font-medium mr-1.5 group-hover:mr-2 transition-all">Read</span>
                              <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </Link>
                  </div>
                </div>

                {/* Desktop Layout */}
                <div className="hidden md:flex items-center gap-12 mb-20">
                  {/* Metadata Column */}
                  <div className={`w-[calc(50%-1rem)] flex ${index % 2 === 0 ? 'order-1 justify-end' : 'order-3 justify-start'}`}>
                    <div className={`flex flex-col gap-8 py-6 ${index % 2 === 0 ? 'items-end text-right' : 'items-start'}`}>
                      {/* Author Info */}
                      <div className={`flex items-center gap-4 ${index % 2 === 0 ? 'flex-row-reverse' : 'flex-row'}`}>
                        <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center">
                          <span className="text-xl font-bold text-emerald-600">
                            {post.author.split('@')[0][0].toUpperCase()}
                          </span>
                        </div>
                        <div className={`flex flex-col ${index % 2 === 0 ? 'items-end' : 'items-start'}`}>
                          <span className="text-lg font-semibold text-slate-700">
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

                      {/* Location & Stats */}
                      <div className={`flex flex-col gap-3 ${index % 2 === 0 ? 'items-end' : 'items-start'}`}>
                        <div className="flex items-center gap-2 text-slate-600">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span className="font-medium">{post.location.name}, {post.location.country}</span>
                        </div>
                      </div>

                      {/* Trek Details */}
                      <div className={`flex flex-col gap-3 ${index % 2 === 0 ? 'items-end' : 'items-start'}`}>
                        <div className="px-4 py-1.5 bg-emerald-50 text-emerald-700 rounded-full text-sm font-medium">
                          {post.trekDetails.difficulty} Trail
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-slate-600">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>{getReadingTime(post.content)} min read • {post.trekDetails.duration} days trek</span>
                          </div>
                          <div className="flex items-center gap-2 text-slate-600">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                            </svg>
                            <span>Elevation: {post.location.elevation.toLocaleString()}m</span>
                          </div>
                        </div>
                      </div>

                      {/* Season & Weather */}
                      <div className={`flex items-center gap-3 text-slate-600 ${index % 2 === 0 ? 'flex-row-reverse' : 'flex-row'}`}>
                        <svg className="w-8 h-8 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                        </svg>
                        <span>Best Seasons: {post.trekDetails.bestSeasons.join(', ')}</span>
                      </div>

                      {/* Decorative Elements */}
                      <div className={`flex flex-col gap-1 ${index % 2 === 0 ? 'items-end' : 'items-start'}`}>
                        <div className="w-32 h-0.5 bg-emerald-200" />
                        <div className="w-24 h-0.5 bg-emerald-200 opacity-60" />
                        <div className="w-16 h-0.5 bg-emerald-200 opacity-30" />
                      </div>
                    </div>
                  </div>

                  {/* Trail Marker Point - With white background */}
                  <div className="order-2 flex-shrink-0 w-0.5 flex items-center justify-center bg-white z-20">
                    <div className="w-4 h-4 bg-emerald-600 rounded-full ring-4 ring-white" />
                  </div>

                  {/* Card Column - With white background */}
                  <Link 
                    href={`/blog/${post._id}`} 
                    className={`w-[calc(50%-1rem)] relative z-10 ${index % 2 === 0 ? 'order-3' : 'order-1'}`}
                  >
                    <div className="bg-white rounded-xl border border-slate-100 overflow-hidden hover:border-emerald-200 transition-all duration-300 transform hover:-translate-y-1">
                      {post.image && (
                        <div className="relative h-[400px] overflow-hidden">
                          <Image 
                            src={post.image} 
                            alt={post.title}
                            fill
                            className="object-cover transition-transform duration-300 hover:scale-105"
                          />
                        </div>
                      )}
                      <div className="p-8">
                        <h2 className="text-3xl font-bold text-slate-800 mb-4 line-clamp-2 leading-tight">
                          {post.title}
                        </h2>
                        <p className="text-slate-600 line-clamp-3 text-base mb-4 leading-relaxed">
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
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
