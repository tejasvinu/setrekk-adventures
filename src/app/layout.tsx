import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react"
import { Suspense } from 'react';
import { Montserrat } from 'next/font/google';
import Providers from '@/components/Providers';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { MountainLoader, ScrollToTop } from '@/components/CustomElements';

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
  title: {
    default: 'Setrekk - Modern Hiking Experience',
    template: '%s | Setrekk'
  },
  description: 'Plan your next adventure with Setrekk - your comprehensive hiking companion.',
  keywords: ['hiking', 'trails', 'outdoors', 'adventure', 'tourism', 'nature'],
  authors: [{ name: 'Setrekk Team' }],
  creator: 'Setrekk',
  openGraph: {
    title: 'Setrekk - Modern Hiking Experience',
    description: 'Plan your next adventure with Setrekk - your comprehensive hiking companion.',
    url: 'https://setrekk.com',
    siteName: 'Setrekk',
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  manifest: '/site.webmanifest',
  twitter: {
    card: 'summary_large_image',
    title: 'Setrekk - Modern Hiking Experience',
    description: 'Plan your next adventure with Setrekk - your comprehensive hiking companion.',
  },
  icons: {
    icon: '/mountains.svg',
    shortcut: '/mountains.svg',
    apple: '/mountains.svg',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
  },
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' }
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${montserrat.className} scroll-smooth`}>
      <head>
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#0f172a" media="(prefers-color-scheme: dark)" />
        
        {/* Script to avoid flashing the wrong theme */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const storedTheme = localStorage.getItem('theme');
                  if (storedTheme === 'light') {
                    document.documentElement.classList.remove('dark');
                    document.documentElement.style.colorScheme = 'light';
                  } else if (storedTheme === 'dark') {
                    document.documentElement.classList.add('dark');
                    document.documentElement.style.colorScheme = 'dark';
                  } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                    document.documentElement.classList.add('dark');
                    document.documentElement.style.colorScheme = 'dark';
                  } else {
                    document.documentElement.classList.remove('dark');
                    document.documentElement.style.colorScheme = 'light';
                  }
                } catch (e) {
                  console.error(e);
                }
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-gradient-to-b from-slate-900 to-slate-800 dark:from-slate-950 dark:to-slate-900">
        <div className="fixed inset-0 bg-gradient-to-b from-slate-900 to-transparent dark:from-slate-950 opacity-50 pointer-events-none" />
        <Providers>
          <Suspense fallback={
            <div className="h-16 bg-slate-900/90 backdrop-blur-sm animate-pulse flex items-center justify-center">
              <div className="w-40 h-6 bg-slate-800 rounded animate-pulse"></div>
            </div>
          }>
            <NavBar />
          </Suspense>
          <main className="flex-grow relative z-10 fade-up">
            <Suspense fallback={<MountainLoader />}>
              {children}
            </Suspense>
          </main>
          <Suspense fallback={
            <div className="h-64 bg-slate-900/80 backdrop-blur-sm animate-pulse" />
          }>
            <Footer />
          </Suspense>
          <ScrollToTop />
          <Analytics />
          <SpeedInsights />
        </Providers>
      </body>
    </html>
  );
}