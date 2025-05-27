'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

export interface ImageItem {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

interface ImageGalleryProps {
  images: ImageItem[];
  className?: string;
}

export default function ImageGallery({ images, className = '' }: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showLightbox, setShowLightbox] = useState(false);
  const galleryRef = useRef<HTMLDivElement>(null);

  const handleNext = () => {
    setSelectedIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setSelectedIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // Function to handle keyboard navigation in lightbox mode
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!showLightbox) return;
      
      if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'Escape') {
        setShowLightbox(false);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [showLightbox, images.length]);

  // Disable body scroll when lightbox is open
  useEffect(() => {
    if (showLightbox) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [showLightbox]);

  if (!images || images.length === 0) {
    return null;
  }
  
  return (
    <>
      <div 
        ref={galleryRef} 
        className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 ${className}`}
      >
        {images.map((image, index) => (
          <motion.div
            key={`${image.src}-${index}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
            className="relative aspect-[4/3] overflow-hidden rounded-lg shadow-md cursor-pointer group"
            onClick={() => {
              setSelectedIndex(index);
              setShowLightbox(true);
            }}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
              priority={index < 6} // Prioritize loading the first 6 images
            />
            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
          </motion.div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {showLightbox && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.2 } }}
            exit={{ opacity: 0, transition: { duration: 0.2, delay: 0.25 } }} // Delay exit of backdrop slightly
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
            onClick={() => setShowLightbox(false)} // Click on backdrop closes lightbox
          >
            {/* Main content area for image and caption - This will have its own pop animation */}
            <motion.div
              className="relative w-full max-w-5xl max-h-[90vh] flex flex-col items-center justify-center px-4 sm:px-10" // Added flex-col for caption layout
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1, transition: { duration: 0.3, ease: "easeOut" } }}
              exit={{ opacity: 0, scale: 0.92, transition: { duration: 0.2, ease: "easeIn" } }}
              onClick={(e) => e.stopPropagation()} // Prevent click inside from closing
            >
             {/* Close Button (Top Right) - Moved inside the content motion.div to animate with it */}
              <motion.button
                onClick={(e) => { e.stopPropagation(); setShowLightbox(false); }}
                className="absolute top-0 right-0 sm:-top-2 sm:-right-2 text-white/70 rounded-full p-2 transition-colors duration-200 ease-out z-[60]"
                whileHover={{ scale: 1.1, backgroundColor: "rgba(45, 55, 72, 0.5)", color: "rgb(52, 211, 153)"}} // slate-700/50, emerald-400
                whileTap={{ scale: 0.95 }}
                aria-label="Close lightbox"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-7 sm:w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.button>

              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedIndex}
                  initial={{ opacity: 0, x: 30 }} 
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }} 
                  transition={{ type: "spring", stiffness: 250, damping: 30 }}
                  className="relative w-full aspect-[4/3] max-h-[calc(90vh-120px)]" 
                >
                  <div className="relative w-full h-full"> 
                    <Image
                      src={images[selectedIndex].src}
                      alt={images[selectedIndex].alt}
                      fill
                      sizes="(max-width: 1280px) 100vw, 1024px"
                      className="object-contain"
                      priority
                    />
                  </div>
                  <p className="absolute -bottom-8 left-0 right-0 text-center text-white text-sm bg-black/30 py-1 px-2 rounded-b-md"> {/* Adjusted position & style */}
                    {images[selectedIndex].alt} ({selectedIndex + 1}/{images.length})
                  </p>
                </motion.div>
              </AnimatePresence>
            </motion.div>

            {/* Previous Button (Left) */}
            <motion.button
              onClick={(e) => { e.stopPropagation(); handlePrev(); }}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 text-white/70 rounded-full p-2 transition-colors duration-200 ease-out z-[60]"
              whileHover={{ scale: 1.1, backgroundColor: "rgba(45, 55, 72, 0.5)", color: "rgb(52, 211, 153)"}}
              whileTap={{ scale: 0.95 }}
              aria-label="Previous image"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 sm:h-10 sm:w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </motion.button>

            {/* Next Button (Right) */}
            <motion.button
              onClick={(e) => { e.stopPropagation(); handleNext(); }}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 text-white/70 rounded-full p-2 transition-colors duration-200 ease-out z-[60]"
              whileHover={{ scale: 1.1, backgroundColor: "rgba(45, 55, 72, 0.5)", color: "rgb(52, 211, 153)"}}
              whileTap={{ scale: 0.95 }}
              aria-label="Next image"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 sm:h-10 sm:w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>

            {/* Thumbnails */}
            <div className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 overflow-x-auto max-w-[90%] py-2 px-2 sm:px-4 bg-black/60 backdrop-blur-sm rounded-full z-[60]">
              {images.map((_, index) => (
                <motion.button
                  key={`thumb-${index}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedIndex(index);
                  }}
                  className={`h-2 w-2 rounded-full transition-all duration-200 ease-out
                    ${ index === selectedIndex 
                      ? 'bg-emerald-400 w-5 sm:w-6' // Active state slightly wider
                      : 'bg-white/50'
                    }`
                  }
                  whileHover={ index === selectedIndex ? {} : { scale: 1.4, backgroundColor: "rgba(255, 255, 255, 0.8)" }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={`View image ${index + 1}`}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}