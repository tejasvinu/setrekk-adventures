"use client"
import { useEffect, useState } from "react";
import Image from "next/image";
import Head from 'next/head';
import { UnifiedTrip } from "@/types/trip";
import ClipboardJS from 'clipboard';
import AccordionComponent from "@/components/Accordion";
import { motion } from "framer-motion";
import { MountainLoader } from "@/components/CustomElements";

interface TripContentProps {
  id: string;
}

export default function TripContent({ id }: TripContentProps) {
  const [trip, setTrip] = useState<UnifiedTrip | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState<number | null>(null);

  // Add clipboard initialization with target support
  useEffect(() => {
    const clipboard = new ClipboardJS('.js-clipboard', {
      target: function (trigger) {
        return document.querySelector(trigger.getAttribute('data-clipboard-target')!)!;
      }
    });
    
    clipboard.on('success', function (e) {
      const successText = e.trigger.getAttribute('data-clipboard-success-text');
      const successElement = e.trigger.querySelector('.js-clipboard-success-text') as HTMLElement;
      if (successElement) {
        successElement.innerText = successText || 'Copied!';
      }
      showTooltip(e.trigger);
      e.clearSelection();
    });

    clipboard.on('error', function (e) {
      console.error('Action:', e.action);
      console.error('Trigger:', e.trigger);
    });

    return () => clipboard.destroy();
  }, []);

  const showTooltip = (trigger: Element) => {
    const tooltip = trigger.querySelector('.hs-tooltip-content');
    if (tooltip) {
      tooltip.classList.remove('hidden');
      setTimeout(() => tooltip.classList.add('hidden'), 2000);
    }
  };

  // Fetch trip data
  useEffect(() => {
    fetch(`/api/trips/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch trip');
        return res.json();
      })
      .then((data) => {
        setTrip(data);
        console.log('Raw Trip Data:', data);
      })
      .catch((err) => {
        console.error('Error fetching trip:', err);
        setError(err.message);
      })
      .finally(() => setIsLoading(false));
  }, [id]);

  const toggleAccordion = (index: number) => {
    console.log('Toggling accordion:', index);
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  // Loading and error states remain the same
  if (isLoading) return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center">
      <div className="text-center">
        <MountainLoader />
        <p className="text-emerald-500 mt-4 text-lg font-medium">
          Preparing your adventure...
        </p>
      </div>
    </div>
  );
  if (error) return <div className="text-center p-8 text-red-500">{error}</div>;
  if (!trip) return <div className="text-center p-8">Trip not found</div>;

  // Check if trip is available
  const startDate = new Date(trip.startDate);
  const isDisabled = startDate > new Date() || trip.capacity === 0;

  return (
    <div className="min-h-screen bg-slate-900">
      {trip && (
        <>
          <section className="relative min-h-[60vh] md:h-[80vh]">
            <motion.div
              initial={{ scale: 1.1, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.5 }}
              className="absolute inset-0"
            >
              <Image
                src={trip.tripImage}
                alt={trip.destination}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />
            </motion.div>
            <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8">
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="container mx-auto"
              >
                <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-4">
                  {trip.destination}
                </h1>
                <div className="flex items-center gap-6">
                  <div className="flex items-end gap-2">
                    <span className="text-4xl font-bold text-emerald-400">₹{trip.price}</span>
                    {trip.fullPrice > trip.price && (
                      <del className="text-slate-400">₹{trip.fullPrice}</del>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          <div className="container mx-auto px-4 md:px-6 py-8 md:py-12">
            {/* Quick Info Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12">
              {[
                { icon: "🏔️", label: "Difficulty", value: trip.difficulty || "Moderate" },
                { icon: "👥", label: "Group Size", value: `${trip.capacity} people` },
              ].map((info, i) => (
                <motion.div
                  key={info.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-2xl">{info.icon}</span>
                    <div>
                      <p className="text-slate-400">{info.label}</p>
                      <p className="text-white font-semibold">{info.value}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Trip Details */}
            <div className="space-y-4">
              <p className="text-slate-300">Available Seats: {trip.capacity}</p>
              <button
                onClick={() => setShowPopup(true)}
                disabled={trip.capacity === 0}
                className={`w-full px-6 py-3 rounded-lg transition-colors ${
                  trip.capacity === 0 
                  ? 'bg-slate-700 cursor-not-allowed' 
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                }`}
              >
                {trip.capacity === 0 ? 'Fully Booked' : 'Contact to Book'}
              </button>
            </div>

            {/* Disabled Trip Notice */}
            {isDisabled && (
              <div className="bg-red-900/50 text-red-300 p-4 rounded-lg my-8 border border-red-800">
                <p className="text-center">Trip is not available</p>
              </div>
            )}

            {/* Hotels Section */}
            {trip?.hotels?.length > 0 && (
              <>
                <div className="mt-12 mb-6">
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                    Accommodations
                  </h2>
                  <div className="h-1 w-24 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full"></div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {trip.hotels?.map((hotel, index) => (
                    <div key={index} className="hotel-card rounded-xl overflow-hidden border border-slate-700">
                      <Image
                        src={hotel.photo}
                        alt={hotel.name}
                        width={400}
                        height={300}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-4">
                        <h2 className="text-xl font-bold mb-2 text-white">{hotel.name}</h2>
                        <p className="text-slate-300 text-sm mb-2">
                          <i className="fas fa-map-marker-alt mr-2 text-emerald-400"></i> {hotel.location}
                        </p>
                        <p className="text-slate-300 mb-4">{hotel.description}</p>
                        {hotel.amenities && (
                          <div className="mt-4">
                            <h3 className="text-lg font-semibold text-white mb-2">Amenities:</h3>
                            <div className="flex flex-wrap gap-2">
                              {hotel.amenities.map((amenity, i) => (
                                <span key={i} className="inline-block bg-slate-700 text-slate-200 rounded-full px-3 py-1 text-sm">
                                  {amenity}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* Itinerary Section */}
            {trip?.itinerary?.length > 0 && (
              <>
                <div className="mt-12 mb-6">
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                    Trip Details
                  </h2>
                  <div className="h-1 w-24 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full"></div>
                </div>
                <div className="space-y-4">
                  {trip.itinerary[0].paragraphs.map((paragraph, index) => (
                    <div key={index} className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 text-slate-300">
                      {paragraph}
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* Updated Photo Gallery Section */}
            {trip?.images?.length > 0 && (
              <>
                <div className="mt-12 mb-6">
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                    Journey Captures
                  </h2>
                  <div className="h-1 w-24 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full"></div>
                </div>
                
                {[...new Set(trip.images.map(img => img.day).filter(day => day !== undefined))]
                  .sort((a, b) => a - b)
                  .map(day => (
                    <div key={day} className="mb-8 md:mb-16">
                      <div className="flex items-center gap-4 mb-4 md:mb-8">
                        <div className="flex items-center gap-2">
                          <span className="text-xl font-bold text-emerald-400">Day {day}</span>
                          <div className="h-px w-12 bg-emerald-500/50"></div>
                        </div>
                        <div className="h-px flex-1 bg-slate-700/50"></div>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                        {trip.images
                          .filter(img => img.day === day)
                          .map((image) => (
                            <motion.div
                              key={image._id}
                              whileHover={{ y: -5 }}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="group relative bg-slate-800 rounded-xl overflow-hidden shadow-lg border border-slate-700"
                            >
                              <div className="aspect-square relative">
                                <Image
                                  src={image.imageUrl}
                                  alt={image.description || ''}
                                  fill
                                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                
                                <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                  <div className="bg-slate-900/90 backdrop-blur-sm rounded-lg p-3">
                                    {image.title && (
                                      <h3 className="text-lg font-bold text-white mb-2">
                                        {image.title}
                                      </h3>
                                    )}
                                    {image.description && (
                                      <p className="text-slate-300 text-sm">
                                        {image.description}
                                      </p>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                        ))}
                      </div>
                    </div>
                ))}
              </>
            )}

            <div className="mt-12">
              <AccordionComponent />
            </div>

            {/* Contact Popup */}
            {showPopup && (
              <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
                <div className="bg-slate-800 rounded-lg p-4 md:p-6 w-full max-w-md mx-auto">
                  {/* ...existing popup content... */}
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
