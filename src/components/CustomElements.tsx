import { motion } from "framer-motion";

export const MountainLoader = () => (
    <div className="flex items-center justify-center min-h-[200px]">
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

export default MountainLoader;
