"use client"
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { UnifiedTrip } from "@/types/trip";
import { motion } from "framer-motion";

export default function Home() {
  const [latestTrips, setLatestTrips] = useState<UnifiedTrip[]>([]);

  useEffect(() => {
    fetch("/api/trips")
      .then((res) => res.json())
      .then((data) => {
        // Sort by creation date and take latest 3
        const sorted = data.sort((a: UnifiedTrip, b: UnifiedTrip) => 
          new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime()
        ).slice(0, 3);
        setLatestTrips(sorted);
      });
  }, []);

  return (
    <div className="w-full overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] md:h-[90vh] flex items-center justify-center bg-slate-900">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-mountains bg-cover bg-center transform scale-110 origin-center parallax-bg" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 to-slate-900/30" />
        </div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="container mx-auto px-4 md:px-6 z-20 text-white"
        >
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold mb-4 md:mb-6 leading-tight">
              Trek the <span className="text-emerald-400">Untamed</span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl mb-6 md:mb-8 text-gray-300">
              Professional guides. Authentic experiences. Unforgettable journeys.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/trips"
                className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all transform hover:scale-105 shadow-lg"
              >
                Explore Treks
              </Link>
              <Link
                href="/about"
                className="border-2 border-white/30 hover:border-white text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all"
              >
                Our Story
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Featured Expeditions */}
      <section className="py-12 md:py-20 bg-slate-50 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-100 to-slate-50 transform -skew-y-6" />
        <div className="container mx-auto px-4 md:px-6 relative">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 md:mb-12 text-slate-800 text-center">
            Featured <span className="text-emerald-600">Expeditions</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {latestTrips.map((trip) => (
              <Link href={`/trips/${trip._id}`} key={trip._id?.toString()}>
                <motion.div
                  whileHover={{ y: -10 }}
                  className="bg-white rounded-xl overflow-hidden shadow-lg"
                >
                  <div className="relative h-[250px]">
                    <Image
                      src={trip.tripImage}
                      alt={trip.destination}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-4 right-4 bg-emerald-500 text-white px-3 py-1 rounded-full text-sm">
                      {trip.difficulty || 'Moderate'}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 text-slate-800">{trip.destination}</h3>
                    <div className="flex justify-between items-center">
                      <p className="text-lg font-bold text-emerald-600">
                        ₹{trip.price}
                      </p>
                      <span className="text-slate-600 text-sm">{trip.duration} days</span>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-slate-900 text-white relative">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold mb-16 text-center">Why Trek with Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {features.map((feature) => (
              <motion.div
                key={feature.title}
                whileHover={{ scale: 1.05 }}
                className="relative"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-600 to-emerald-400 rounded-lg blur opacity-30" />
                <div className="relative bg-slate-800 p-8 rounded-lg">
                  <div className="w-12 h-12 text-emerald-400 mb-6">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                  <p className="text-slate-400">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/cta-bg.jpg')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/90 to-slate-900/90" />
        <div className="container mx-auto px-6 relative z-10 text-center text-white">
          <h2 className="text-5xl font-bold mb-8">
            Ready to Begin Your Adventure?
          </h2>
          <p className="text-xl mb-12 text-gray-300 max-w-2xl mx-auto">
            Join our community of adventurers and discover the magic of the mountains
          </p>
          <Link
            href="/trips"
            className="bg-white text-emerald-800 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-emerald-50 transition-colors inline-flex items-center gap-2"
          >
            Find Your Trek
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}

// Keep the features array and icon components
const features = [
  {
    title: "Local Trek Experts",
    description: "Certified guides with deep knowledge of Himalayan trails and safety protocols",
    icon: <CompassIcon />,
  },
  {
    title: "Curated Experiences",
    description: "Handpicked routes featuring the best of Indian mountains and culture",
    icon: <StarIcon />,
  },
  {
    title: "Safe Adventures",
    description: "24/7 ground support and emergency assistance throughout your journey",
    icon: <PhoneIcon />,
  },
];

function CompassIcon() {
  return (
    <svg
      className="w-full h-full"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
      />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg
      className="w-full h-full"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
      />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg
      className="w-full h-full"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
      />
    </svg>
  );
}
