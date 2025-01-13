import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // Disables ESLint during builds
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'live-liamtra-blog.s3.ap-south-1.amazonaws.com',
        port: '',
        pathname: '/**',
      },
      // Add any other domains you need to support
    ],
  },
};

export default nextConfig;
