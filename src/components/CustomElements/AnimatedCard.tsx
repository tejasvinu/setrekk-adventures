'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  onClick?: () => void;
  whileHover?: 'lift' | 'scale' | 'glow' | 'none';
}

export default function AnimatedCard({
  children,
  className = '',
  delay = 0,
  onClick,
  whileHover = 'lift'
}: AnimatedCardProps) {
  // Define hover animations
  const hoverEffects = {
    lift: {
      y: -8,
      boxShadow: "0 20px 25px -5px rgba(16, 185, 129, 0.1), 0 10px 10px -5px rgba(16, 185, 129, 0.04)"
    },
    scale: {
      scale: 1.03
    },
    glow: {
      boxShadow: "0 0 15px 5px rgba(16, 185, 129, 0.2)"
    },
    none: {}
  };

  return (
    <motion.div
      className={`rounded-xl overflow-hidden ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: "spring",
        stiffness: 50,
        damping: 20,
        delay: delay * 0.1
      }}
      whileHover={hoverEffects[whileHover]}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
}