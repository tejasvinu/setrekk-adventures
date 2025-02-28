import { motion } from "framer-motion";

export const DiagonalShape = () => (
  <div className="absolute left-0 right-0 h-16 -bottom-16 transform -skew-y-3 bg-inherit z-10" />
);

export const CircleDecoration = () => (
  <div className="absolute -right-8 -top-8 w-32 h-32 bg-emerald-500/10 rounded-full blur-xl" />
);

export const MountainCutout = () => (
  <div className="absolute bottom-0 left-0 right-0 h-16 overflow-hidden">
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-full w-full">
      <path
        d="M0,0 L50,100 L100,0 Z"
        fill="currentColor"
      />
    </svg>
  </div>
);

export function SkeletonLoader({ className = "" }: { className?: string }) {
  return (
    <div className={`animate-pulse ${className}`}>
      <div className="h-8 bg-slate-700/50 rounded-lg w-3/4 mb-4"></div>
      <div className="h-4 bg-slate-700/30 rounded w-full mb-3"></div>
      <div className="h-4 bg-slate-700/30 rounded w-5/6 mb-3"></div>
      <div className="h-4 bg-slate-700/30 rounded w-4/6 mb-6"></div>
      <div className="h-64 bg-slate-700/20 rounded-lg w-full mb-4"></div>
      <div className="h-4 bg-slate-700/30 rounded w-full mb-3"></div>
      <div className="h-4 bg-slate-700/30 rounded w-5/6"></div>
    </div>
  );
}

export function CardSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className="animate-pulse rounded-xl overflow-hidden border border-slate-700/50">
          <div className="h-48 bg-slate-700/30"></div>
          <div className="p-4">
            <div className="h-6 bg-slate-700/40 rounded w-3/4 mb-3"></div>
            <div className="h-4 bg-slate-700/30 rounded w-full mb-2"></div>
            <div className="h-4 bg-slate-700/30 rounded w-5/6"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function MountainLoader({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center min-h-[200px] ${className}`}>
      <motion.div
        className="relative w-24 h-24 flex items-center justify-center"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 360, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <motion.div
          className="absolute inset-0 bg-emerald-500/20 rounded-full blur-xl"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 0.2, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <svg viewBox="0 0 24 24" className="w-16 h-16 fill-emerald-500">
          <path d="M22 17L12 7l-10 10h20z" />
        </svg>
      </motion.div>
    </div>
  );
}
