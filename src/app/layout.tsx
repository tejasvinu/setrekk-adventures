import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react"
import { Suspense } from 'react';
import { Montserrat } from 'next/font/google';
import Providers from '@/components/Providers';

// Direct imports
import NavBar from '@/components/NavBar/NavBar';
import Footer from '@/components/Footer/Footer';

const montserrat = Montserrat({ 
  subsets: ['latin'],
  display: 'swap',
});

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://setrekk.com'),
  title: 'Setrekk Adventures',
  description: 'Your gateway to amazing trekking adventures',
  keywords: ['Setrekk', 'travel', 'adventure', 'trekking', 'Bengaluru', 'local', 'outdoor', 'experiences', 'tours', 'hiking'],
  openGraph: {
    title: 'Setrekk - Experience Unforgettable Adventures in Bengaluru',
    description: 'Discover unique trekking experiences and explore the hidden gems of Bengaluru with Setrekk.',
    url: 'https://setrekk.com',
    siteName: 'Setrekk',
    images: [
      {
        url: 'https://setrekk.com/setrekk-v3-transformed.png',
        width: 1200,
        height: 630,
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Setrekk - Experience Unforgettable Adventures in Bengaluru',
    description: 'Discover unique trekking experiences and explore the hidden gems of Bengaluru with Setrekk.',
    images: ['https://setrekk.com/setrekk-v3-transformed.png'],
  },
  icons: {
    icon: [
      { url: '/setrekk-v3-transformed.png' }
    ],
    apple: [
      { url: '/setrekk-v3-transformed.png' }
    ]
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${montserrat.className} scroll-smooth`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'TravelAgency',
              name: 'Setrekk',
              description: 'Adventure travel and trekking experiences in Bengaluru',
              url: 'https://setrekk.com',
              areaServed: 'Bengaluru',
              priceRange: '$$'
            })
          }}
        />
        <link rel="icon" href="/setrekk-v3-transformed.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/setrekk-v3-transformed.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#0f172a" media="(prefers-color-scheme: dark)" />
      </head>
      <body className="min-h-screen flex flex-col bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="fixed inset-0 bg-gradient-to-b from-slate-900 to-transparent opacity-50 pointer-events-none" />
        <Providers>
          <Suspense fallback={
            <div className="h-16 bg-slate-900 animate-pulse" />
          }>
            <NavBar />
          </Suspense>
          <main className="flex-grow relative z-10">{children}</main>
          <Suspense fallback={
            <div className="h-64 bg-slate-900 animate-pulse" />
          }>
            <Footer />
          </Suspense>
          <Analytics />
        </Providers>
      </body>
    </html>
  );
}