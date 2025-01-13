"use client"
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { UnifiedTrip } from "@/types/trip";

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
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-mountains bg-cover bg-center">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <div className="container mx-auto px-6 z-20 text-white text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Discover Your Next Adventure
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
            Explore breathtaking destinations and create unforgettable memories
          </p>
          <Link
            href="/trips"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-colors"
          >
            Explore Trips
          </Link>
        </div>
      </section>

      {/* Featured Destinations - Now Latest Trips */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">
            Latest Adventures
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {latestTrips.map((trip) => (
              <div
                key={trip._id}
                className="group relative h-[400px] overflow-hidden rounded-lg"
              >
                <Image
                  src={trip.tripImage}
                  alt={trip.destination}
                  fill
                  className="object-cover transition-transform group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">{trip.destination}</h3>
                  <p className="text-sm mb-2">
                    {new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}
                  </p>
                  <p className="text-lg font-bold">
                    ${trip.price}{' '}
                    {trip.fullPrice > trip.price && (
                      <del className="text-sm text-gray-300">${trip.fullPrice}</del>
                    )}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              href="/trips"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              View All Trips
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">
            Why Travel With Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="text-center p-6 rounded-lg bg-white shadow-sm"
              >
                <div className="w-16 h-16 mx-auto mb-4 text-blue-600">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of travelers who choose us for their adventures
          </p>
          <Link
            href="/trips"
            className="bg-white text-blue-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            View All Trips
          </Link>
        </div>
      </section>
    </div>
  );
}

// Keep the features array and icon components
const features = [
  {
    title: "Expert Guides",
    description: "Professional local guides with deep knowledge",
    icon: <CompassIcon />,
  },
  {
    title: "Best Value",
    description: "Competitive prices and exclusive deals",
    icon: <StarIcon />,
  },
  {
    title: "24/7 Support",
    description: "Always here to help you",
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
