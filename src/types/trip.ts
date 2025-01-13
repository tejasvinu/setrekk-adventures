import { ObjectId } from "mongodb";

export interface Hotel {
  name: string;
  location: string;
  photo: string;
  gmapsLocation: string;
  description: string;
  amenities?: string[];
}

export interface ItineraryDay {
  paragraphs: string[];
}

export interface TripImage {
  _id?: string;
  imageUrl: string;
  title?: string;
  description?: string;
  day?: number;
}

export interface Booking {
  numberOfSeats: number;
  user: string; // ObjectId as string
}

export interface UnifiedTrip {
  _id?: string | ObjectId;
  destination: string;
  startDate: string | Date;
  endDate: string | Date;
  price: number;
  fullPrice: number;
  capacity: number;
  tripImage: string;
  weekNumber: number;
  hotels: Hotel[];
  itinerary: ItineraryDay[];
  images: TripImage[];
  bookings?: Booking[];
  createdAt?: string | Date;
  updatedAt?: string | Date;
}
