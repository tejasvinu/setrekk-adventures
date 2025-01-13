import mongoose, { Schema, model, Model } from 'mongoose';
import { UnifiedTrip } from '@/types/trip';

const UnifiedTripSchema = new Schema({
  destination: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  price: { type: Number, required: true },
  fullPrice: { type: Number, required: true },
  capacity: { type: Number, required: true },
  tripImage: { type: String, required: true },
  weekNumber: { type: Number, required: true, default: 0 },
  hotels: [{
    name: { type: String, required: true },
    location: { type: String, required: true },
    photo: { type: String, required: true },
    gmapsLocation: { type: String, required: true },
    description: { type: String, required: true },
    amenities: [String],
  }],
  itinerary: [{
    paragraphs: [String]
  }],
  images: [{
    imageUrl: { type: String, required: true },
    title: String,
    description: String,
    day: Number
  }],
  bookings: [{
    numberOfSeats: { type: Number, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User' }
  }]
}, {
  collection: 'trip',
  timestamps: true
});

// Prevent multiple model compilation
const Trip = (mongoose.models.UnifiedTrip || model('UnifiedTrip', UnifiedTripSchema)) as Model<UnifiedTrip>;

export default Trip;
