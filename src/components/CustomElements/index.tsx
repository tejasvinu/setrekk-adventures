'use client'

import ScrollToTop from './ScrollToTop';
import AnimatedCard from './AnimatedCard';
import PageTransition from './PageTransition';
import { 
  MountainLoader as MountainLoaderComponent, 
  DiagonalShape as DiagonalShapeComponent,
  CircleDecoration as CircleDecorationComponent,
  MountainCutout as MountainCutoutComponent,
  SkeletonLoader,
  CardSkeleton
} from './CustomElements';

// Using dynamic imports for components that need it
import dynamic from 'next/dynamic';

export const MountainLoader = dynamic(
  () => import('./CustomElements').then(mod => mod.MountainLoader),
  { ssr: false }
);

export const DiagonalShape = dynamic(
  () => import('./CustomElements').then(mod => mod.DiagonalShape),
  { ssr: true }
);

export const CircleDecoration = dynamic(
  () => import('./CustomElements').then(mod => mod.CircleDecoration),
  { ssr: true }
);

export const MountainCutout = dynamic(
  () => import('./CustomElements').then(mod => mod.MountainCutout),
  { ssr: true }
);

// Export non-dynamically loaded components
export { 
  ScrollToTop,
  SkeletonLoader,
  CardSkeleton,
  AnimatedCard,
  PageTransition
};
