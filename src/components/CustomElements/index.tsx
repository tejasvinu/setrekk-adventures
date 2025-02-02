"use client"
import dynamic from 'next/dynamic';

export const MountainLoader = dynamic(() => import('./MountainLoader').then(mod => mod.MountainLoader), {
  ssr: false
});

export const DiagonalShape = dynamic(() => import('./Shapes').then(mod => mod.DiagonalShape), {
  ssr: true
});

export const CircleDecoration = dynamic(() => import('./Shapes').then(mod => mod.CircleDecoration), {
  ssr: true
});

export const MountainCutout = dynamic(() => import('./Shapes').then(mod => mod.MountainCutout), {
  ssr: true
});
