"use client"
import { useEffect, useState } from "react";
import Image from "next/image";
import Head from 'next/head';
import { UnifiedTrip } from "@/types/trip";
import ClipboardJS from 'clipboard';
import AccordionComponent from "@/components/Accordion";

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
      const successElement = e.trigger.querySelector('.js-clipboard-success-text');
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
  if (isLoading) return <div className="text-center p-8">Loading...</div>;
  if (error) return <div className="text-center p-8 text-red-500">{error}</div>;
  if (!trip) return <div className="text-center p-8">Trip not found</div>;

  // Check if trip is available
  const startDate = new Date(trip.startDate);
  const isDisabled = startDate > new Date() || trip.capacity === 0;

  return (
    <>
      <Head>
        <title>{trip?.destination ? `${trip.destination} - Trip Itinerary - Setrekk Adventures` : 'Loading...'}</title>
        <meta 
          name="description" 
          content={`Explore the detailed itinerary for our ${trip?.destination} trip. Discover exciting activities, day-by-day plans, and essential information. Book your adventure today!`}
        />
        {trip?.tripImage && (
          <meta property="og:image" content={trip.tripImage} />
        )}
      </Head>

      <div className="container mx-auto p-6">
        {/* Hero Section */}
        {trip && (
          <div className="md:flex md:items-center gap-8 mb-12">
            <div className="w-full md:w-1/2">
              <div className="relative h-96 rounded-xl overflow-hidden">
                <Image
                  src={trip.tripImage}
                  alt={trip.destination}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
            
            <div className="w-full md:w-1/2 mt-6 md:mt-0">
              <h1 className="text-3xl font-bold mb-4">{trip.destination}</h1>
              <div className="flex items-end gap-2 mb-4">
                <span className="text-3xl font-bold">₹{trip.price}</span>
                {trip.fullPrice > trip.price && (
                  <del className="text-gray-500">₹{trip.fullPrice}</del>
                )}
              </div>

              {/* Additional trip details */}
              <div className="space-y-4">
                <p className="text-gray-600">
                  {new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}
                </p>
                <p className="text-gray-600">Week Number: {trip.weekNumber}</p>
                <p className="text-gray-600">Available Seats: {trip.capacity}</p>
                <button
                  onClick={() => setShowPopup(true)}
                  disabled={trip.capacity === 0}
                  className={`w-full px-6 py-3 rounded-lg transition-colors ${
                    trip.capacity === 0 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-blue-500 hover:bg-blue-600 text-white'
                  }`}
                >
                  {trip.capacity === 0 ? 'Fully Booked' : 'Contact to Book'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Disabled Trip Notice */}
        {isDisabled && (
          <div className="bg-red-100 text-blue-800 p-4 rounded-lg mb-8">
            <p className="text-center">Trip is not available</p>
          </div>
        )}

        {/* Hotels Section */}
        {trip?.hotels?.length > 0 && (
          console.log('Rendering hotels:', trip.hotels.map(h => ({ name: h.name, location: h.location }))),
          <div className="mt-5 mb-5 ml-5 relative inline-block">
            <span className="text-2xl md:text-3xl font-bold">Hotels</span>
            <span className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-red-500 via-orange-400 to-yellow-600 rounded-full"></span>
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
          {trip.hotels?.map((hotel, index) => (
            <div key={index} className="bg-white rounded-lg overflow-hidden shadow-lg transform transition duration-500 hover:scale-105">
              <img src={hotel.photo} alt={hotel.name} className="w-full h-48 object-cover"/>
              <div className="p-4">
                <h2 className="text-xl font-bold mb-2 text-gray-800">{hotel.name}</h2>
                <p className="text-gray-600 text-sm mb-2">
                  <i className="fas fa-map-marker-alt mr-2 text-red-500"></i> {hotel.location}
                </p>
                <p className="text-gray-700 mb-4">{hotel.description}</p>
                {hotel.amenities && (
                  <div className="mt-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Amenities:</h3>
                    <div className="flex flex-wrap gap-2">
                      {hotel.amenities.map((amenity, i) => (
                        <span key={i} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
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

        {/* Itinerary Section */}
        {trip?.itinerary?.length > 0 && (
          <>
            <div className="mt-5 mb-5 ml-5 relative inline-block">
              <span className="text-2xl md:text-3xl font-bold">Itinerary</span>
              <span className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-red-500 via-orange-400 to-yellow-600 rounded-full"></span>
            </div>
            {trip.itinerary[0].paragraphs.map((paragraph, index) => (
              <div key={index} className="border border-gray-300 rounded-lg mb-4">
                <button
                  className="w-full flex justify-between items-center px-6 py-4 bg-gray-100 hover:bg-gray-200"
                  onClick={() => toggleAccordion(index)}
                >
                  <span className="text-gray-700 font-semibold">
                    {index < 2 ? `Day ${index + 1}` : 'Additional Information'}
                  </span>
                  <svg
                    className={`w-5 h-5 transition-transform ${
                      activeAccordion === index ? "rotate-180" : ""
                    }`}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                <div className={`px-6 py-4 ${activeAccordion === index ? "block" : "hidden"}`}>
                  <p className="mb-4 whitespace-pre-line">{paragraph}</p>
                </div>
              </div>
            ))}
          </>
        )}

        {/* Photo Gallery - Day-wise with sliding effect */}
        {trip?.images?.length > 0 && (
          <>
            <div className="mt-5 mb-5 ml-5 relative inline-block">
              <span className="text-2xl md:text-3xl font-bold">Photo Gallery</span>
              <span className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-red-500 via-orange-400 to-yellow-600 rounded-full"></span>
            </div>
            {[...new Set(trip.images.map(img => img.day))].sort().map(day => (
              <div key={day} className="mb-8">
                <h3 className="text-xl font-bold mb-4">Day {day}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {trip.images
                    .filter(img => img.day === day)
                    .map((image) => (
                      <div key={image._id} className="group relative h-96 w-full overflow-hidden rounded-lg shadow-md">
                        <div className="absolute left-0 top-0 h-full w-full transition-all duration-300 ease-in-out group-hover:-top-96">
                          <img 
                            className="h-4/6 w-full object-cover" 
                            src={image.imageUrl} 
                            alt={image.description || ''}
                          />
                          <div className="mt-5 px-4 text-center">
                            <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-600 via-slate-400 to-stone-500">
                              {image.title}
                            </h2>
                          </div>
                        </div>
                        <div className="absolute left-0 -bottom-96 flex h-full w-full flex-col justify-center transition-all duration-300 ease-in-out group-hover:bottom-0">
                          <p className="px-8 text-center">{image.description}</p>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </>
        )}

        {/* Contact Popup with Clipboard functionality */}
        {showPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
              <h2 className="text-2xl font-bold mb-6">Contact us on WhatsApp</h2>
              
              {/* Contact Numbers with Copy */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-800">Contact Tejas:</h3>
                  <button
                    type="button"
                    className="js-clipboard hs-tooltip w-full py-3 px-4 inline-flex justify-between items-center gap-2 text-sm font-mono rounded-lg border border-gray-200 bg-white text-gray-800 hover:bg-gray-50"
                    data-clipboard-target="#contact-tejas"
                    data-clipboard-success-text="Copied!"
                  >
                    <span id="contact-tejas">9606293853</span>
                    <span className="flex items-center gap-2">
                      <svg className="js-clipboard-default w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                      </svg>
                      <span className="js-clipboard-success-text hidden">Copied!</span>
                    </span>
                  </button>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-800">Contact Akash:</h3>
                  <button
                    type="button"
                    className="js-clipboard hs-tooltip w-full py-3 px-4 inline-flex justify-between items-center gap-2 text-sm font-mono rounded-lg border border-gray-200 bg-white text-gray-800 hover:bg-gray-50"
                    data-clipboard-target="#contact-akash"
                    data-clipboard-success-text="Copied!"
                  >
                    <span id="contact-akash">9480663613</span>
                    <span className="flex items-center gap-2">
                      <svg className="js-clipboard-default w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                      </svg>
                      <span className="js-clipboard-success-text hidden">Copied!</span>
                    </span>
                  </button>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-800">Email:</h3>
                  <button
                    type="button"
                    className="js-clipboard hs-tooltip w-full py-3 px-4 inline-flex justify-between items-center gap-2 text-sm font-mono rounded-lg border border-gray-200 bg-white text-gray-800 hover:bg-gray-50"
                    data-clipboard-target="#contact-email"
                    data-clipboard-success-text="Copied!"
                  >
                    <span id="contact-email">setrekkadvenures@gmail.com</span>
                    <span className="flex items-center gap-2">
                      <svg className="js-clipboard-default w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                      </svg>
                      <span className="js-clipboard-success-text hidden">Copied!</span>
                    </span>
                  </button>
                </div>
              </div>

              <button
                onClick={() => setShowPopup(false)}
                className="mt-6 w-full bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300"
              >
                Close
              </button>
            </div>
          </div>
        )}

        <AccordionComponent />
      </div>
    </>
  );
}
