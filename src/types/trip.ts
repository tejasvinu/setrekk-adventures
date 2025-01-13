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
  _id: string;
  destination: string;
  startDate: string;
  endDate: string;
  price: number;
  fullPrice: number;
  capacity: number;
  tripImage: string;
  weekNumber: number;
  hotels?: {
    name: string;
    location: string;
    description: string;
    photo: string;
    amenities?: string[];
  }[];
  itinerary?: {
    _id: string;
    paragraphs: string[];
  }[];
  images?: {
    _id: string;
    imageUrl: string;
    title: string;
    description: string;
    day: number;
  }[];
  bookings?: any[];
  createdAt?: string;
  updatedAt?: string;
}
