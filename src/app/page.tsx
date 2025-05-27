"use client"
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { UnifiedTrip } from "@/types/trip";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Home() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const distantMountainY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const mainMountainsY = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const foregroundPatternY = useTransform(scrollYProgress, [0, 1], [0, -250]);
  // Optional: A slight movement for overlays if needed, or keep them static
  const overlayY = useTransform(scrollYProgress, [0, 1], [0, 20]);


  const [latestTrips, setLatestTrips] = useState<UnifiedTrip[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const res = await fetch("/api/trips");
        const data = await res.json();
        const sorted = data
          .sort((a: UnifiedTrip, b: UnifiedTrip) => 
            new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime()
          )
          .slice(0, 3);
        setLatestTrips(sorted);
      } catch (error) {
        console.error("Error fetching trips:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTrips();
  }, []);

  return (
    <div className="w-full overflow-hidden bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section with Parallax */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center bg-slate-900 overflow-hidden">
        {/* Parallax Layers */}
        <motion.div
          className="absolute inset-0 z-0" // Sky or furthest back (can be a CSS gradient in bg-slate-900 or specific color)
        >
          {/* Optional: Could add animated stars here if desired */}
        </motion.div>

        <motion.div
          className="absolute inset-0 z-[1]"
          style={{ y: distantMountainY, opacity: 0.6 }} // Distant mountains, move slowly
        >
          <Image
            src="/mountain.svg"
            alt="Distant Mountain"
            layout="fill"
            objectFit="cover"
            quality={70}
            className="opacity-50" // Further reduce intrinsic opacity if needed
          />
        </motion.div>

        <motion.div
          className="absolute inset-0 z-[2]"
          style={{ y: mainMountainsY }} // Main mountains, move a bit faster than sky
        >
          <Image
            src="/mountains.svg" // This is the one that had bg-mountains class before
            alt="Main Mountains"
            layout="fill"
            objectFit="cover" 
            quality={85}
            className="transform scale-110 origin-bottom" // Match previous scale
          />
        </motion.div>
        
        <motion.div
          className="absolute inset-x-0 bottom-0 h-1/3 z-[3] text-slate-700" // Foreground pattern layer
          style={{
            y: foregroundPatternY,
            backgroundImage: 'url(/mountain-pattern.svg)',
            backgroundRepeat: 'repeat-x',
            backgroundSize: 'contain', // Or 'auto 100%' to scale height
            backgroundPosition: 'bottom center',
            opacity: 0.2, // Make it subtle
          }}
        />

        {/* Gradient Overlays - On top of images but below text */}
        <motion.div 
          className="absolute inset-0 z-[4]"
          style={{ y: overlayY }} // Optional slight movement for overlays
        >
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/80 to-slate-900/60" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(15,23,42,0.8)_100%)]" />
        </motion.div>

        {/* Content Layer */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="container mx-auto px-4 md:px-6 z-10 text-white relative" // z-10 to be above image layers and overlays
        >
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <h1 className="font-display text-5xl sm:text-6xl md:text-7xl xl:text-8xl font-bold mb-6 leading-tight tracking-tight">
                Trek the <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-500">Untamed</span>
              </h1>
              <p className="text-xl sm:text-2xl md:text-3xl mb-8 text-gray-300 font-light">
                Professional guides. Authentic experiences.
                <span className="block mt-2">Unforgettable journeys.</span>
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            >
              <motion.custom
                as={Link}
                href="/trips"
                className="group relative inline-flex items-center justify-center px-8 py-4 overflow-hidden font-bold rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg"
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.2, ease: "easeOut" },
                }}
                whileTap={{ scale: 0.98 }}
                style={{ backgroundSize: "200% 200%" }}
                animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                transition={{ // This transition is for the continuous animation of backgroundPosition
                  duration: 5,
                  ease: "linear",
                  repeat: Infinity,
                }}
              >
                {/* This span is for the hover gradient effect */}
                <motion.span 
                  className="absolute inset-0 w-full h-full bg-gradient-to-r from-purple-600 via-pink-500 to-red-500"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1, transition: { duration: 0.3 } }}
                />
                {/* Shine effect span */}
                <motion.span
                  className="absolute inset-0 w-full h-full block"
                  style={{
                    backgroundImage: "linear-gradient(120deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)",
                    backgroundSize: "200% 100%",
                    backgroundPosition: "-200% 0",
                  }}
                  whileHover={{ 
                    backgroundPosition: ["-200% 0", "200% 0"],
                    transition: { duration: 0.7, ease: "easeInOut" }
                  }}
                />
                <span className="relative flex items-center gap-2">
                  Explore Treks
                  <motion.svg 
                    className="w-5 h-5" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    initial={{ x: 0 }}
                    whileHover={{ x: 5, transition: { type: "spring", stiffness: 300 } }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </motion.svg>
                </span>
              </motion.custom>

              <motion.custom
                as={Link}
                href="/about"
                className="relative inline-flex items-center justify-center px-8 py-4 font-bold text-slate-300 rounded-lg border-2 border-slate-500 transition-colors duration-300 ease-out"
                whileHover={{
                  scale: 1.03,
                  color: "#ffffff",
                  borderColor: "#cbd5e1", // slate-300 for a brighter border
                  backgroundColor: "rgba(203, 213, 225, 0.05)", // very subtle slate-300 with alpha
                  transition: { duration: 0.2, ease: "easeOut" },
                }}
                whileTap={{ 
                  scale: 0.98,
                  backgroundColor: "rgba(203, 213, 225, 0.1)", // slightly more opaque
                }}
              >
                <span className="relative">Our Story</span>
                {/* The previous hover span for bg is removed, handled by Framer Motion now */}
              </motion.custom>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2"
          >
            <motion.div className="w-1.5 h-1.5 rounded-full bg-white" />
          </motion.div>
        </motion.div>
      </section>

      {/* Featured Expeditions */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-100/50 to-white/50" />
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6 text-slate-900">
              Featured <span className="text-emerald-600">Expeditions</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 mx-auto rounded-full" />
          </motion.div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-slate-200 h-[250px] rounded-xl mb-4" />
                  <div className="h-4 bg-slate-200 rounded w-3/4 mb-2" />
                  <div className="h-4 bg-slate-200 rounded w-1/2" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {latestTrips.map((trip, index) => (
                <Link href={`/trips/${trip._id}`} key={trip._id?.toString()}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 }}
                    whileHover={{ y: -8 }}
                    className="group relative bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
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
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-slate-900 text-white relative">
        <div className="container mx-auto px-6">
          <h2 className="font-display text-4xl font-bold mb-16 text-center">Why Trek with Us</h2>
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
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 text-slate-800">
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
          <h2 className="font-display text-5xl md:text-6xl font-bold mb-8">
            Your Next Adventure Awaits
          </h2>
          <p className="text-xl mb-12 text-gray-300 max-w-2xl mx-auto">
            Join our community of adventurers and discover the magic of the mountains. Book your trek today and create memories that last a lifetime.
          </p>
          <motion.div
            // whileHover={{ scale: 1.05 }} // This will be handled by the motion.custom Link
            className="inline-block" // Keep for layout if necessary
          >
            <motion.custom
              as={Link}
              href="/trips"
              className="group relative inline-flex items-center justify-center px-8 py-4 overflow-hidden font-bold rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg text-lg" // Changed text color, adjusted font-weight
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.2, ease: "easeOut" },
              }}
              whileTap={{ scale: 0.98 }}
              style={{ backgroundSize: "200% 200%" }}
              animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
              transition={{
                duration: 5,
                ease: "linear",
                repeat: Infinity,
              }}
            >
              <motion.span 
                className="absolute inset-0 w-full h-full bg-gradient-to-r from-purple-600 via-pink-500 to-red-500"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1, transition: { duration: 0.3 } }}
              />
              <motion.span
                className="absolute inset-0 w-full h-full block"
                style={{
                  backgroundImage: "linear-gradient(120deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)",
                  backgroundSize: "200% 100%",
                  backgroundPosition: "-200% 0",
                }}
                whileHover={{ 
                  backgroundPosition: ["-200% 0", "200% 0"],
                  transition: { duration: 0.7, ease: "easeInOut" }
                }}
              />
              <span className="relative flex items-center gap-2">
                Find Your Trek
                <motion.svg 
                  className="w-5 h-5" // Kept size
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  initial={{ x: 0 }}
                  whileHover={{ x: 5, transition: { type: "spring", stiffness: 300 } }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </motion.svg>
              </span>
            </motion.custom>
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
