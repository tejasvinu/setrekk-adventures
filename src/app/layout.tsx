import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react"
import { Suspense } from 'react';
import { Montserrat } from 'next/font/google';

// Direct imports instead of using the index
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const montserrat = Montserrat({ 
  subsets: ['latin'],
  display: 'swap',
});

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
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
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
        <link rel="apple-touch-icon" href="/setrekk-v3-transformed.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body className="min-h-screen flex flex-col bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="fixed inset-0 bg-gradient-to-b from-slate-900 to-transparent opacity-50 pointer-events-none" />
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
      </body>
    </html>
  );
}