'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface MotionLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary' | 'ghost' | 'text';
  size?: 'sm' | 'md' | 'lg';
  external?: boolean;
}

export default function MotionLink({
  href,
  children,
  className = '',
  variant = 'primary',
  size = 'md',
  external = false
}: MotionLinkProps) {
  // Base styles for all variants
  const baseStyles = 'inline-flex items-center justify-center rounded-md font-medium transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2';
  
  // Variant-specific styles
  const variantStyles = {
    primary: 'bg-emerald-600 text-white hover:bg-emerald-500 shadow-sm hover:shadow-emerald-500/20',
    secondary: 'bg-slate-800 text-white hover:bg-slate-700 border border-slate-700',
    ghost: 'bg-transparent hover:bg-slate-800/50 text-slate-200 hover:text-white border border-slate-700/50 hover:border-slate-600',
    text: 'bg-transparent text-slate-200 hover:text-emerald-400 hover:bg-transparent p-0',
  };
  
  // Size styles
  const sizeStyles = {
    sm: 'text-xs px-2.5 py-1.5',
    md: 'text-sm px-4 py-2',
    lg: 'text-base px-5 py-2.5',
  };
  
  // Combine styles based on props
  const combinedStyles = `${baseStyles} ${variantStyles[variant]} ${variant !== 'text' ? sizeStyles[size] : ''} ${className}`;

  return external ? (
    <motion.a 
      href={href}
      className={combinedStyles}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      {children}
      {/* External link icon for external links */}
      <svg className="ml-1.5 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
      </svg>
    </motion.a>
  ) : (
    <Link href={href} passHref legacyBehavior>
      <motion.a
        className={combinedStyles}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        {children}
      </motion.a>
    </Link>
  );
}