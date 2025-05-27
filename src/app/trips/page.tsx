"use client"
import { useEffect, useState, useMemo, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { MountainLoader } from "@/components/CustomElements";

interface UnifiedTrip {
  _id: string;
  destination: string;
  startDate: string;
  endDate: string;
  price: number;
  fullPrice: number;
  weekNumber: number;
  tripImage: string;
  capacity: number;
  location: string;
  difficulty?: string;
  bookings?: { userId: string }[];
}

// Trip difficulty badge component with appropriate colors
const DifficultyBadge = ({ level }: { level?: string }) => {
  const difficultyConfig = {
    Easy: "bg-green-500/20 text-green-400 border-green-500/30",
    Moderate: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    Difficult: "bg-orange-500/20 text-orange-400 border-orange-500/30",
    Extreme: "bg-red-500/20 text-red-400 border-red-500/30",
  };

  const difficulty = level || "Moderate";
  const colorClass = difficultyConfig[difficulty as keyof typeof difficultyConfig];

  return (
    <span className={`px-3 py-1 rounded-full text-sm border backdrop-blur-md ${colorClass}`}>
      {difficulty}
    </span>
  );
};

const TripCard = ({ trip, index }: { trip: UnifiedTrip; index: number }) => {
  const tripDuration = Math.ceil(
    (new Date(trip.endDate).getTime() - new Date(trip.startDate).getTime()) / (1000 * 3600 * 24)
  );
  
  const formattedDate = new Date(trip.startDate).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric'
  });

  const cardVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5, delay: index * 0.1 } },
  };

  const imageContainerVariants = {
    initial: { scale: 1.15, clipPath: "inset(0% 20% 0% 20%)" }, // Zoomed in and slightly cropped
    animate: { 
      scale: 1, 
      clipPath: "inset(0% 0% 0% 0%)",
      transition: { delay: (index * 0.1) + 0.2, duration: 0.6, ease: "circOut" } 
    },
  };
  
  const contentContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: (index * 0.1) + 0.4 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' }}
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="initial"
      animate="animate"
      whileHover={{ 
        y: -10, 
        boxShadow: "0px 20px 30px -10px rgba(5, 150, 105, 0.25), 0px 8px 15px -8px rgba(5, 150, 105, 0.15)"
      }}
      className="group" // Added group here for the shine effect to target
    >
      <Link href={`/trips/${trip._id}`}>
        <article className="relative bg-slate-800/80 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg border border-slate-700 transition-shadow duration-300"> {/* Removed hover:shadow-emerald-500/10, Framer motion handles hover shadow */}
          <motion.div // Shine Effect Div
            className="absolute inset-0 z-[1]"
            style={{
              backgroundImage: "linear-gradient(110deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)",
              backgroundSize: "200% 100%",
            }}
            initial={{ backgroundPosition: "200% 0" }}
            whileHover={{ 
              backgroundPosition: ["-200% 0", "200% 0"], // This will only work if this div itself is hovered or parent `group` hover is handled by variants
              transition: { duration: 1, ease: "linear", repeat: Infinity } // Looping shine on hover
            }}
          />
          {/* Card highlight glow effect - can be kept or removed if shine is enough */}
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl blur-lg opacity-0 group-hover:opacity-10 transition-opacity duration-300 z-0"/>
          
          <motion.div 
            className="relative h-56 overflow-hidden"
            variants={imageContainerVariants} // Apply image animation variants
          >
            <Image
              src={trip.tripImage}
              alt={trip.destination}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={index < 6}
              className="object-cover brightness-90 group-hover:brightness-100 transition-all duration-500" // Removed group-hover:scale-105, handled by imageContainerVariants
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/40 to-transparent z-[2]" /> {/* Ensure overlay is above image */}
            
            {/* Top badges - need z-index to be above image and its overlay */}
            <div className="absolute top-3 right-3 flex gap-2 z-[3]">
              <DifficultyBadge level={trip.difficulty} />
            </div>
            
            {/* Date badge - need z-index */}
            <div className="absolute top-3 left-3 bg-slate-800/80 backdrop-blur-sm text-white px-3 py-1 rounded-lg border border-slate-700 text-sm z-[3]">
              <div className="flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {formattedDate}
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="p-5 relative z-[2]" // Ensure content is above shine and glow effects
            variants={contentContainerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants} className="flex justify-between items-start mb-3">
              <h2 className="font-display text-2xl font-bold text-white group-hover:text-emerald-400 transition-colors">
                {trip.destination}
              </h2>
              <motion.span variants={itemVariants} className="flex items-center gap-1 bg-slate-700/50 text-emerald-400 px-2 py-1 rounded-md text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {tripDuration} days
              </motion.span>
            </motion.div>
            
            {trip.location && (
              <motion.div variants={itemVariants} className="flex items-center gap-1 text-slate-400 mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {trip.location}
              </motion.div>
            )}
            
            <motion.div variants={itemVariants} className="flex justify-between items-end mt-4">
              <motion.div variants={itemVariants}>
                <p className="text-emerald-400 text-2xl font-bold">₹{trip.price}</p>
                {trip.fullPrice > trip.price && (
                  <del className="text-slate-500 text-sm">₹{trip.fullPrice}</del>
                )}
              </motion.div>
              
              <motion.div variants={itemVariants} className="bg-emerald-600/20 text-emerald-500 px-2 py-1 rounded-md text-sm font-medium flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {trip.capacity} seats
              </div>
            </div>
          </div>
        </article>
      </Link>
    </motion.div>
  );
};

export default function Trips() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  // Adjusted transform values for a potentially shorter hero section (50vh vs screen height)
  const distantMountainY = useTransform(scrollYProgress, [0, 1], [0, 100]); 
  const mainMountainsY = useTransform(scrollYProgress, [0, 1], [0, 30]);
  const foregroundPatternY = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const overlayY = useTransform(scrollYProgress, [0, 1], [0, 10]);

  const [trips, setTrips] = useState<UnifiedTrip[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  // Changed default to 0 (all months) instead of current month
  const [selectedMonth, setSelectedMonth] = useState(0);
  const [selectedWeek, setSelectedWeek] = useState(0);
  const [selectedDifficulty, setSelectedDifficulty] = useState("");
  // Changed default to true to show filters by default
  const [showFilters, setShowFilters] = useState(true);
  const [isSticky, setIsSticky] = useState(false);

  // Fetch trips data
  useEffect(() => {
    setLoading(true);
    fetch("/api/trips")
      .then((res) => res.json())
      .then((data) => {
        setTrips(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching trips:", err);
        setLoading(false);
      });
  }, []);

  // Handle scroll for sticky filter bar
  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Process trips data
  const { months, weeks, difficulties, filteredTrips } = useMemo(() => {
    // Extract unique months from trips
    const monthSet = new Set<number>();
    const weekSet = new Set<number>();
    const difficultySet = new Set<string>();
    
    trips.forEach(trip => {
      const date = new Date(trip.startDate);
      monthSet.add(date.getMonth() + 1);
      weekSet.add(trip.weekNumber);
      if (trip.difficulty) difficultySet.add(trip.difficulty);
    });
    
    const months = Array.from(monthSet).sort((a, b) => a - b);
    const weeks = Array.from(weekSet).sort((a, b) => a - b);
    const difficulties = Array.from(difficultySet);
    
    // Apply filters
    const filtered = trips.filter(trip => {
      const tripDate = new Date(trip.startDate);
      const tripMonth = tripDate.getMonth() + 1;
      const matchesSearch = trip.destination.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           (trip.location && trip.location.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesMonth = selectedMonth === 0 || tripMonth === selectedMonth;
      const matchesWeek = selectedWeek === 0 || trip.weekNumber === selectedWeek;
      const matchesDifficulty = !selectedDifficulty || trip.difficulty === selectedDifficulty;
      
      return matchesSearch && matchesMonth && matchesWeek && matchesDifficulty;
    });
    
    return { months, weeks, difficulties, filteredTrips: filtered };
  }, [trips, searchTerm, selectedMonth, selectedWeek, selectedDifficulty]);

  // Helper function for month names
  const getMonthName = (monthNumber: number) => {
    const monthNames = ["January", "February", "March", "April", "May", "June", 
                       "July", "August", "September", "October", "November", "December"];
    return monthNames[monthNumber - 1];
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      {/* Decorative mountain silhouettes */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-mountains-silhouette bg-repeat-x bg-bottom opacity-5 pointer-events-none" />
      
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-[50vh] flex items-center justify-center overflow-hidden bg-slate-900">
        {/* Parallax Layers */}
        <motion.div
          className="absolute inset-0 z-[1]"
          style={{ y: distantMountainY, opacity: 0.5 }} 
        >
          <Image
            src="/mountain.svg"
            alt="Distant Mountain Silhouette"
            layout="fill"
            objectFit="cover"
            quality={70}
            className="opacity-40" 
          />
        </motion.div>

        <motion.div
          className="absolute inset-0 z-[2]"
          style={{ y: mainMountainsY }} 
        >
          <Image
            src="/mountains.svg" 
            alt="Main Mountains Backdrop"
            layout="fill"
            objectFit="cover" 
            quality={80}
            className="opacity-30 scale-105 origin-bottom" // Maintain some opacity from original, adjust scale/origin as needed
          />
        </motion.div>
        
        <motion.div
          className="absolute inset-x-0 bottom-0 h-1/4 z-[3] text-slate-800" 
          style={{
            y: foregroundPatternY,
            backgroundImage: 'url(/mountain-pattern.svg)',
            backgroundRepeat: 'repeat-x',
            backgroundSize: 'contain',
            backgroundPosition: 'bottom center',
            opacity: 0.15, 
          }}
        />

        {/* Gradient Overlays */}
        <motion.div 
          className="absolute inset-0 z-[4]"
          style={{ y: overlayY }}
        >
          {/* This replaces the original opacity-20 bg-mountains and the gradient-to-b overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/60 to-slate-900/90" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(15,23,42,0.1)_0%,rgba(15,23,42,0.7)_70%)]" />
        </motion.div>
        
        {/* Content Layer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="container mx-auto px-4 md:px-6 text-center relative z-10" // Ensure content is above parallax layers
        >
           <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">
            Discover Your Next Adventure
          </h1>
          <p className="text-emerald-300 text-xl max-w-2xl mx-auto mb-8">
            Explore breathtaking landscapes and unforgettable experiences with our curated treks
          </p>
          
          {/* Search input */}
          <div className="relative max-w-md mx-auto">
            <input
              type="text"
              placeholder="Search destinations or locations..."
              className="w-full bg-slate-800/50 border border-slate-700 text-white rounded-full px-6 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 backdrop-blur-sm placeholder:text-slate-400"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="absolute right-3 top-3 text-slate-400 hover:text-emerald-400">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </motion.div>

        {/* Animated arrow down indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10" // Ensure scroll indicator is above parallax layers
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <svg className="w-8 h-8 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </section>

      {/* Sticky Filter Bar */}
      <div className={`${isSticky ? 'sticky top-0 z-30 py-3 shadow-lg' : 'py-6'} bg-slate-900/80 backdrop-blur-md transition-all duration-300 z-20`}> 
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-white">
              {filteredTrips.length} {filteredTrips.length === 1 ? 'Adventure' : 'Adventures'} Available
            </h2>
            <motion.button 
              onClick={() => setShowFilters(!showFilters)} 
              className="relative inline-flex items-center justify-center gap-2 px-4 py-2 font-medium text-slate-300 rounded-lg border border-slate-600 transition-colors duration-300 ease-out"
              whileHover={{
                scale: 1.03,
                color: "#10b981", // emerald-500
                borderColor: "#10b981", // emerald-500
                backgroundColor: "rgba(16, 185, 129, 0.1)", 
                transition: { duration: 0.2, ease: "easeOut" },
              }}
              whileTap={{ 
                scale: 0.98,
                backgroundColor: "rgba(16, 185, 129, 0.2)",
              }}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              Filters {showFilters ? '(Hide)' : '(Show)'}
            </button>
          </div>
        </div>
      </div>

      {/* Enhanced Filter Controls */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="container mx-auto px-4 md:px-6 overflow-hidden"
          >
            <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-6 md:p-8 border border-slate-700 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Month filter */}
                <div>
                  <h3 className="text-white font-medium mb-3 flex items-center gap-2">
                    <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Month
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    <motion.button
                      className={`relative inline-flex items-center justify-center px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-300 ease-out ${
                        selectedMonth === 0
                          ? 'bg-emerald-500 text-white border border-emerald-500'
                          : 'border border-slate-700 text-slate-300 bg-transparent'
                      }`}
                      onClick={() => setSelectedMonth(0)}
                      whileHover={selectedMonth === 0 ? { scale: 1.02, filter: "brightness(1.1)" } : { scale: 1.03, color: "#10b981", borderColor: "#10b981", backgroundColor: "rgba(16, 185, 129, 0.1)" }}
                      whileTap={{ scale: 0.98, backgroundColor: selectedMonth === 0 ? "rgba(5, 150, 105, 0.9)" : "rgba(16, 185, 129, 0.2)"}}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                    >
                      All Months
                    </motion.button>
                    {months.map((month) => (
                      <motion.button
                        key={month}
                        className={`relative inline-flex items-center justify-center px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-300 ease-out ${
                          selectedMonth === month
                            ? 'bg-emerald-500 text-white border border-emerald-500'
                            : 'border border-slate-700 text-slate-300 bg-transparent'
                        }`}
                        onClick={() => setSelectedMonth(month)}
                        whileHover={selectedMonth === month ? { scale: 1.02, filter: "brightness(1.1)" } : { scale: 1.03, color: "#10b981", borderColor: "#10b981", backgroundColor: "rgba(16, 185, 129, 0.1)" }}
                        whileTap={{ scale: 0.98, backgroundColor: selectedMonth === month ? "rgba(5, 150, 105, 0.9)" : "rgba(16, 185, 129, 0.2)"}}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                      >
                        {getMonthName(month)}
                      </motion.button>
                    ))}
                  </div>
                </div>
                
                {/* Week filter */}
                <div>
                  <h3 className="text-white font-medium mb-3 flex items-center gap-2">
                    <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Week
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    <motion.button
                      className={`relative inline-flex items-center justify-center px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-300 ease-out ${
                        selectedWeek === 0
                          ? 'bg-emerald-500 text-white border border-emerald-500'
                          : 'border border-slate-700 text-slate-300 bg-transparent'
                      }`}
                      onClick={() => setSelectedWeek(0)}
                      whileHover={selectedWeek === 0 ? { scale: 1.02, filter: "brightness(1.1)" } : { scale: 1.03, color: "#10b981", borderColor: "#10b981", backgroundColor: "rgba(16, 185, 129, 0.1)" }}
                      whileTap={{ scale: 0.98, backgroundColor: selectedWeek === 0 ? "rgba(5, 150, 105, 0.9)" : "rgba(16, 185, 129, 0.2)"}}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                    >
                      All Weeks
                    </motion.button>
                    {weeks.map((week) => (
                      <motion.button
                        key={week}
                        className={`relative inline-flex items-center justify-center px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-300 ease-out ${
                          selectedWeek === week
                            ? 'bg-emerald-500 text-white border border-emerald-500'
                            : 'border border-slate-700 text-slate-300 bg-transparent'
                        }`}
                        onClick={() => setSelectedWeek(week)}
                        whileHover={selectedWeek === week ? { scale: 1.02, filter: "brightness(1.1)" } : { scale: 1.03, color: "#10b981", borderColor: "#10b981", backgroundColor: "rgba(16, 185, 129, 0.1)" }}
                        whileTap={{ scale: 0.98, backgroundColor: selectedWeek === week ? "rgba(5, 150, 105, 0.9)" : "rgba(16, 185, 129, 0.2)"}}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                      >
                        Week {week}
                      </motion.button>
                    ))}
                  </div>
                </div>
                
                {/* Difficulty filter */}
                <div>
                  <h3 className="text-white font-medium mb-3 flex items-center gap-2">
                    <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Difficulty
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    <motion.button
                      className={`relative inline-flex items-center justify-center px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-300 ease-out ${
                        selectedDifficulty === ''
                          ? 'bg-emerald-500 text-white border border-emerald-500'
                          : 'border border-slate-700 text-slate-300 bg-transparent'
                      }`}
                      onClick={() => setSelectedDifficulty('')}
                      whileHover={selectedDifficulty === '' ? { scale: 1.02, filter: "brightness(1.1)" } : { scale: 1.03, color: "#10b981", borderColor: "#10b981", backgroundColor: "rgba(16, 185, 129, 0.1)" }}
                      whileTap={{ scale: 0.98, backgroundColor: selectedDifficulty === '' ? "rgba(5, 150, 105, 0.9)" : "rgba(16, 185, 129, 0.2)"}}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                    >
                      All Levels
                    </motion.button>
                    {['Easy', 'Moderate', 'Difficult', 'Extreme'].map((difficulty) => (
                      <motion.button
                        key={difficulty}
                        className={`relative inline-flex items-center justify-center px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-300 ease-out ${
                          selectedDifficulty === difficulty
                            ? 'bg-emerald-500 text-white border border-emerald-500'
                            : 'border border-slate-700 text-slate-300 bg-transparent'
                        }`}
                        onClick={() => setSelectedDifficulty(difficulty)}
                        whileHover={selectedDifficulty === difficulty ? { scale: 1.02, filter: "brightness(1.1)" } : { scale: 1.03, color: "#10b981", borderColor: "#10b981", backgroundColor: "rgba(16, 185, 129, 0.1)" }}
                        whileTap={{ scale: 0.98, backgroundColor: selectedDifficulty === difficulty ? "rgba(5, 150, 105, 0.9)" : "rgba(16, 185, 129, 0.2)"}}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                      >
                        {difficulty}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Clear filters button */}
              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedMonth(0);
                    setSelectedWeek(0);
                    setSelectedDifficulty('');
                  }}
                  className="flex items-center gap-2 text-slate-300 hover:text-white px-4 py-2 rounded-lg bg-slate-700/50 hover:bg-slate-600/50 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Clear All Filters
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Trip Grid */}
      <div className="container mx-auto px-4 md:px-6 pb-16">
        {loading ? (
          <div className="min-h-[50vh] flex items-center justify-center">
            <div className="text-center">
              <MountainLoader />
              <p className="text-emerald-400 mt-4 text-lg">
                Discovering adventures...
              </p>
            </div>
          </div>
        ) : (
          <>
            <AnimatePresence mode="wait">
              {filteredTrips.length > 0 ? (
                <motion.div 
                  key="results"
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  exit={{ opacity: 0 }}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
                >
                  {filteredTrips.map((trip, index) => (
                    <TripCard key={trip._id} trip={trip} index={index} />
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key="no-results"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="py-16 flex flex-col items-center justify-center text-center"
                >
                  <div className="w-32 h-32 mb-6">
                    <Image 
                      src="/images/empty-mountains.svg" 
                      alt="No trips found" 
                      width={128} 
                      height={128}
                      className="opacity-60"
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">No adventures found</h3>
                  <p className="text-slate-400 max-w-md mb-6">
                    We couldn't find any trips matching your criteria. Try adjusting your filters or check back later for new adventures.
                  </p>
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedMonth(0);
                      setSelectedWeek(0);
                      setSelectedDifficulty('');
                    }}
                    className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors"
                  >
                    Reset Filters
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
      </div>

      {/* Decorative mountain divider */}
      <div className="w-full h-16 bg-mountain-divider bg-repeat-x bg-bottom opacity-10 pointer-events-none mt-8" />
    </div>
  );
}