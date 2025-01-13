"use client"
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

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

export default function Trips() {
  const [trips, setTrips] = useState<UnifiedTrip[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [weekNumber, setWeekNumber] = useState(1);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
  const [showAllTrips, setShowAllTrips] = useState(true);

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
    return matchesSearch && matchesMonth && matchesWeek;
  });

  const displayedTrips = showAllTrips ? trips : filteredTrips;

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Available Trips</h1>
        <Link 
          href="/trips/new"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add New Trip
        </Link>
      </div>

      {/* Toggle and Filter Controls */}
      <div className="mb-6 space-y-4">
        <div className="flex justify-center items-center">
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={showAllTrips}
              onChange={() => setShowAllTrips(!showAllTrips)}
            />
            <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all">
            </div>
            <span className="ml-3 text-sm font-medium">
              {showAllTrips ? "All Trips" : "Filtered Trips"}
            </span>
          </label>
        </div>

        {!showAllTrips && (
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
            <div className="flex gap-4 items-center">
              <button
                className="bg-yellow-100 font-bold text-center text-md border-2 border-black rounded-md shadow-yellow py-2 px-4 hover:bg-yellow-300 focus:outline-none"
                onClick={() => setCurrentMonth(currentMonth > 1 ? currentMonth - 1 : 12)}
              >
                {getMonthName(currentMonth > 1 ? currentMonth - 1 : 12)}
              </button>
              <span className="bg-yellow-200 font-bold text-center text-md border-2 border-black rounded-md shadow-purple-400 py-2 px-4">
                {getMonthName(currentMonth)}
              </span>
              <button
                className="bg-yellow-100 font-bold text-center text-md border-2 border-black rounded-md shadow-yellow py-2 px-4 hover:bg-yellow-300 focus:outline-none"
                onClick={() => setCurrentMonth(currentMonth < 12 ? currentMonth + 1 : 1)}
              >
                {getMonthName(currentMonth < 12 ? currentMonth + 1 : 1)}
              </button>
            </div>
            <div className="flex gap-2">
              {[1, 2, 3, 4].map((week) => (
                <button
                  key={week}
                  onClick={() => setWeekNumber(week)}
                  className={`
                    font-bold text-center text-md border-2 border-black rounded-md py-2 px-4
                    ${weekNumber === week 
                      ? 'bg-blue-300 shadow-blue-300' 
                      : 'bg-gray-100 hover:bg-gray-200 shadow-gray-300'}
                    focus:outline-none transition-colors
                  `}
                >
                  Week {week}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Trip Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedTrips.length > 0 ? (
          displayedTrips.map((trip) => (
            <Link href={`/trips/${trip._id}`} key={trip._id}>
              <article className="rounded-lg bg-white p-2 shadow-lg hover:shadow-xl transition-shadow">
                <div className="relative h-48 rounded-xl overflow-hidden">
                  <Image
                    src={trip.tripImage}
                    alt={trip.destination}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h2 className="text-xl font-semibold">{trip.destination}</h2>
                  <p className="text-gray-500 text-sm">{trip.location}</p>
                  <div className="mt-4">
                    <div className="flex items-end">
                      <p className="text-3xl font-bold">${trip.price}</p>
                      {trip.fullPrice > trip.price && (
                        <del className="ml-2 text-gray-500">${trip.fullPrice}</del>
                      )}
                    </div>
                    <div className="mt-2 text-sm text-gray-600">
                      {trip.capacity - (trip.bookings?.length || 0)} seats left
                    </div>
                  </div>
                </div>
              </article>
            </Link>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-xl text-gray-500">No trips available for the selected criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}