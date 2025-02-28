'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface ProgressBarProps {
  progress: number; // 0 to 100
  height?: number;
  color?: string;
  backgroundColor?: string;
  animate?: boolean;
  label?: string;
  showPercentage?: boolean;
  className?: string;
}

export default function ProgressBar({
  progress,
  height = 8,
  color = '#10B981',
  backgroundColor = 'rgba(15, 23, 42, 0.2)',
  animate = true,
  label,
  showPercentage = false,
  className = ''
}: ProgressBarProps) {
  const [currentProgress, setCurrentProgress] = useState(0);

  // Animate progress value
  useEffect(() => {
    if (animate) {
      // Start from 0 and animate to the target progress
      setCurrentProgress(0);
      const timer = setTimeout(() => {
        setCurrentProgress(progress);
      }, 100);
      return () => clearTimeout(timer);
    } else {
      setCurrentProgress(progress);
    }
  }, [progress, animate]);

  // Ensure progress is within bounds
  const validProgress = Math.min(Math.max(currentProgress, 0), 100);

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs font-medium text-slate-300">{label}</span>
          {showPercentage && (
            <span className="text-xs font-medium text-slate-400">{validProgress.toFixed(0)}%</span>
          )}
        </div>
      )}
      <div 
        className="w-full rounded-full" 
        style={{ 
          height: `${height}px`, 
          backgroundColor
        }}
      >
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
          initial={{ width: '0%' }}
          animate={{ width: `${validProgress}%` }}
          transition={{ duration: animate ? 1 : 0, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}