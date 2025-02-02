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
      <section className="relative min-h-[90vh] flex items-center justify-center bg-slate-900">
        <motion.div 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 overflow-hidden"
        >
          <div className="absolute inset-0 bg-mountains bg-cover bg-center transform scale-110 origin-center will-change-transform" 
               style={{ backgroundAttachment: 'fixed' }} />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/80 to-slate-900/60" />
        </motion.div>
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

      {/* Featured Expeditions with enhanced hover effects */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-slate-50 to-white relative">
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

      {/* Enhanced Testimonials Section */}
      <section className="py-20 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,transparent,black)] opacity-25"></div>
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-800">
                What Our <span className="text-emerald-600">Trekkers Say</span>
              </h2>
              <p className="text-slate-600 text-lg mb-6">Real experiences from real adventurers</p>
              <div className="h-1 w-24 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full mx-auto"></div>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg relative group hover:shadow-xl transition-all duration-300"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl blur opacity-0 group-hover:opacity-30 transition duration-300"></div>
                <div className="relative p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-xl overflow-hidden bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center text-white font-bold text-xl shadow-lg">
                      {testimonial.name.split(' ')[0][0]}
                      {testimonial.name.split(' ')[1]?.[0]}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-slate-800">{testimonial.name}</h4>
                        {testimonial.verified && (
                          <svg className="w-4 h-4 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/>
                          </svg>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-500">
                        <span>{testimonial.reviewCount} {testimonial.reviewCount === 1 ? 'review' : 'reviews'}</span>
                        •
                        <span>{testimonial.photoCount} {testimonial.photoCount === 1 ? 'photo' : 'photos'}</span>
                        •
                        <span>{testimonial.timeAgo}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <svg 
                        key={i} 
                        className={`w-5 h-5 ${i < testimonial.rating ? 'text-yellow-400' : 'text-slate-200'}`}
                        fill="currentColor" 
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                      </svg>
                    ))}
                  </div>
                  <p className="text-slate-600 relative z-10 mb-4">{testimonial.text}</p>
                  {testimonial.trip && (
                    <div className="mt-4 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-emerald-50 text-emerald-700">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                      </svg>
                      {testimonial.trip}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/cta-bg.jpg')] bg-cover bg-center bg-fixed" />
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/95 to-slate-900/95" />
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="container mx-auto px-6 relative z-10 text-center text-white"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-8">
            Your Next Adventure Awaits
          </h2>
          <p className="text-xl mb-12 text-gray-300 max-w-2xl mx-auto">
            Join our community of adventurers and discover the magic of the mountains. Book your trek today and create memories that last a lifetime.
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="inline-block"
          >
            <Link
              href="/trips"
              className="bg-white text-emerald-800 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-emerald-50 transition-colors inline-flex items-center gap-2 shadow-lg"
            >
              Find Your Trek
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </motion.div>
        </motion.div>
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

const testimonials = [
  {
    text: "From blackmailing Akash to come as a guide and witnessing a beautiful sunrise on time was pure bliss! 🔥👏💟 Team Set Trek helped me and my friends create beautiful memories. Thank you Akash & Tejas for a memorable journey and destination! Use Set Trek as your choice 🥳💛",
    name: "Meghana B C",
    rating: 5,
    reviewCount: 1,
    photoCount: 9,
    timeAgo: "2 months ago",
    verified: true
  },
  {
    text: "Had a great experience and enjoyed a lot. The stay was very unique, and I enjoyed the quality of the food arrangements made during the trip. Covered the places as mentioned in the itinerary on time and explored well.",
    name: "Vikashini Vijayakumar",
    rating: 4,
    reviewCount: 1,
    photoCount: 3,
    timeAgo: "7 months ago",
    verified: true
  },
  {
    text: "The trip was filled with fun, laughter, and memories. Most friendliest Trek guide you would ever meet. The facilities were met as per requirement on time. Would definitely recommend to go for a trip with them and experience all the above!!",
    name: "Aish Ash",
    rating: 5,
    reviewCount: 2,
    photoCount: 1,
    timeAgo: "7 months ago",
    verified: true
  },
  {
    text: "Thanks for the discount, my experience was not only enjoyable but also budget-friendly. I would recommend traveling with Akash (Setrekk Adventures founder).",
    name: "A_agalya P",
    rating: 5,
    reviewCount: 5,
    photoCount: 15,
    timeAgo: "8 months ago",
    verified: true
  },
  {
    text: "I recently booked a trip with Settrek to Wayanad and I couldn't be more satisfied with the experience. From start to finish, the entire process was seamless and stress-free. The team understands what it means to provide budget-friendly travel without compromising on quality.",
    name: "Rohith Ravindran",
    rating: 5,
    reviewCount: 9,
    photoCount: 2,
    timeAgo: "7 months ago",
    trip: "Wayanad Trek",
    verified: true
  },
  {
    text: "Great experience. Good guidance and care throughout the journey.",
    name: "Rashmika S",
    rating: 5,
    reviewCount: 3,
    photoCount: 0,
    timeAgo: "2 months ago",
    verified: true
  }
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
