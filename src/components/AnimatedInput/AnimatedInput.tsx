"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AnimatedInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string | null; // For future error state handling
}

const AnimatedInput: React.FC<AnimatedInputProps> = ({ label, id, error, ...props }) => {
  const [isFocused, setIsFocused] = useState(false);

  // Animation for the focus ring
  const ringVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1, transition: { duration: 0.2, ease: 'easeOut' } },
    exit: { scale: 0.8, opacity: 0, transition: { duration: 0.15, ease: 'easeIn' } },
  };

  // Optional: Animation for the input field itself on focus
  const inputVariants = {
    rest: { scale: 1 },
    focused: { scale: 1.01, transition: { duration: 0.2 } },
  };
  
  // Conceptual: Shake animation for error
  // const shakeVariants = {
  //   shake: { 
  //     x: [0, -8, 8, -4, 4, 0], 
  //     transition: { duration: 0.4, ease: "easeInOut" } 
  //   }
  // };

  return (
    <div className="relative">
      <label htmlFor={id} className="block text-sm font-medium text-slate-300 mb-2">
        {label}
      </label>
      <motion.input
        id={id}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        variants={inputVariants}
        animate={isFocused ? "focused" : "rest"}
        // Conceptual error animation:
        // animate={error ? "shake" : (isFocused ? "focused" : "rest")}
        // variants={{ ...inputVariants, ...shakeVariants }}
        {...props}
        className={`w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder:text-slate-400 focus:outline-none transition-colors duration-200 ease-out ${props.className} ${error ? 'border-red-500' : isFocused ? 'border-emerald-500' : 'border-slate-600'}`}
      />
      <AnimatePresence>
        {isFocused && !error && ( // Show ring only on focus and no error
          <motion.div
            variants={ringVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="absolute inset-0 rounded-lg border-2 border-emerald-500 pointer-events-none"
            style={{ boxShadow: "0 0 0 2px rgba(16, 185, 129, 0.3)" }} // Softer bloom
          />
        )}
      </AnimatePresence>
      {/* Conceptual: Error message display
      {error && <p className="text-xs text-red-400 mt-1">{error}</p>}
      */}
    </div>
  );
};

export default AnimatedInput;
