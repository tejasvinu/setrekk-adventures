"use client"
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
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
  bookings?: { userId: string }[];
}

const TripCard = ({ trip }: { trip: UnifiedTrip }) => (
  <motion.article
    whileHover={{ y: -10 }}
    className="group bg-white rounded-xl overflow-hidden shadow-lg relative"
  >
    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-emerald-600 transform scale-[1.02] blur-lg opacity-20 transition-opacity group-hover:opacity-30" />
    <div className="relative">
      <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md text-white px-3 py-1 rounded-full text-sm border border-white/20">
        {"Moderate"}
      </div>
      <div className="relative h-64 overflow-hidden">
        <Image
          src={trip.tripImage}
          alt={trip.destination}
          fill
          className="object-cover transform transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-900/70" />
        <div className="absolute bottom-4 left-4 right-4">
          <h2 className="text-2xl font-bold text-white mb-2">{trip.destination}</h2>
          <div className="flex justify-between items-center">
            <p className="text-2xl font-bold text-emerald-400">
              ₹{trip.price}
              {trip.fullPrice > trip.price && (
                <span className="text-sm text-gray-300 ml-2">
                  <del>₹{trip.fullPrice}</del>
                </span>
              )}
            </p>
            <span className="text-white/90 text-sm">
              {Math.ceil((new Date(trip.endDate).getTime() - new Date(trip.startDate).getTime()) / (1000 * 3600 * 24))} days
            </span>
          </div>
        </div>
      </div>
    </div>
  </motion.article>
);

export default function Trips() {
  const [trips, setTrips] = useState<UnifiedTrip[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [weekNumber, setWeekNumber] = useState(1);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
  const [showAllTrips, setShowAllTrips] = useState(true);
  const [selectedDifficulty, setSelectedDifficulty] = useState("");

  useEffect(() => {
    fetch("/api/trips")
      .then((res) => res.json())
      .then((data) => setTrips(data));
  }, []);

  const getMonthName = (monthNumber: number) => {
    const monthNames = ["January", "February", "March", "April", "May", "June", 
                       "July", "August", "September", "October", "November", "December"];
    return monthNames[monthNumber - 1];
  };

  const filteredTrips = trips.filter(trip => {
    const tripDate = new Date(trip.startDate);
    const matchesSearch = trip.destination.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesMonth = tripDate.getMonth() + 1 === currentMonth;
    const matchesWeek = trip.weekNumber === weekNumber;
    const matchesDifficulty = true; // removed difficulty filtering as property doesn't exist
    return matchesSearch && matchesMonth && matchesWeek && matchesDifficulty;
  });

  const displayedTrips = showAllTrips ? trips : filteredTrips;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      {/* Hero Section */}
      <section className="relative min-h-[40vh] flex items-center justify-center">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-mountains bg-cover bg-center opacity-20" />
          <div className="mountain-gradient opacity-40" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="container mx-auto px-4 md:px-6 text-center"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">
            Find Your Perfect Trek
          </h1>
          <p className="text-emerald-300 text-xl max-w-2xl mx-auto">
            Choose from our carefully curated selection of adventures
          </p>
        </motion.div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-slate-900 to-transparent" />
      </section>

      <div className="container mx-auto px-4 md:px-6 py-8 md:py-12">
        {/* Enhanced Filter Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 bg-slate-800/50 backdrop-blur-xl rounded-2xl p-4 md:p-8 border border-slate-700"
        >
          <div className="flex flex-col space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="w-full sm:w-auto">
                <input
                  type="text"
                  placeholder="Search destinations..."
                  className="w-full sm:w-64 bg-slate-700/50 text-white placeholder:text-slate-400 rounded-lg px-4 py-2"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <svg className="absolute right-3 top-2.5 w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <div className="flex items-center gap-4">
                {/* ...existing filter controls with updated styling... */}
              </div>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 md:gap-4">
              {['Easy', 'Moderate', 'Difficult', 'Extreme'].map((difficulty) => (
                <button
                  key={difficulty}
                  className={`px-4 py-2 rounded-lg transition-all ${
                    selectedDifficulty === difficulty
                      ? 'bg-emerald-500 text-white'
                      : 'bg-slate-700/50 text-slate-300 hover:bg-slate-600/50'
                  }`}
                  onClick={() => setSelectedDifficulty(difficulty)}
                >
                  {difficulty}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Enhanced Trip Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {displayedTrips.length > 0 ? (
            displayedTrips.map((trip) => (
              <Link href={`/trips/${trip._id}`} key={trip._id}>
                <motion.div
                  whileHover={{ y: -10 }}
                  className="group relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity" />
                  <div className="relative bg-slate-800 rounded-xl overflow-hidden">
                    <div className="relative h-64">
                      <Image
                        src={trip.tripImage}
                        alt={trip.destination}
                        fill
                        className="object-cover brightness-90 group-hover:brightness-100 transition-all"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />
                    </div>
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <h2 className="text-2xl font-bold text-white">{trip.destination}</h2>
                        <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-sm">
                          {Math.ceil((new Date(trip.endDate).getTime() - new Date(trip.startDate).getTime()) / (1000 * 3600 * 24))} days
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-emerald-400 text-2xl font-bold">₹{trip.price}</p>
                          {trip.fullPrice > trip.price && (
                            <del className="text-slate-500 text-sm">₹{trip.fullPrice}</del>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-slate-300">
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full flex flex-col items-center justify-center py-16"
            >
              <MountainLoader />
              <p className="text-xl text-slate-400 mt-4">No adventures match your criteria</p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}