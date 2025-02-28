import { Metadata, Viewport } from 'next';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#0f172a'
};

export const metadata: Metadata = {
  title: 'Explore Adventure Treks | Setrekk',
  description: 'Discover our handpicked collection of trekking adventures across breathtaking locations. Find your perfect mountain escape today.',
  openGraph: {
    title: 'Discover Mountain Adventures | Setrekk',
    description: 'Explore breathtaking landscapes and unforgettable trekking experiences with our curated collection of adventures.',
    images: ['/images/og-trips.jpg']
  }
};

export default function TripsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="trip-layout relative min-h-screen">
      {/* Decorative background elements */}
      <div className="fixed inset-0 bg-compass-pattern bg-repeat opacity-[0.02] pointer-events-none" />
      {children}
    </div>
  );
}
