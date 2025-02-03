import { Metadata, Viewport } from 'next';
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

type Props = {
  params: Promise<{ id: string }>;
};

export const viewport: Viewport = {
  viewportFit: 'cover',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  
  if (!ObjectId.isValid(resolvedParams.id)) {
    return {
      title: 'Invalid Trip ID | Setrekk',
      description: 'The requested trip ID is invalid.'
    };
  }

  try {
    const client = await clientPromise;
    const db = client.db("setrekk");
    const trip = await db.collection("trip").findOne({
      _id: new ObjectId(resolvedParams.id)
    });

    if (!trip) {
      return {
        title: 'Trip Not Found | Setrekk',
        description: 'The requested trip could not be found.'
      };
    }

    return {
      title: `${trip.destination} | Setrekk`,
      description: `Explore our amazing trip to ${trip.destination}. Book now from ₹${trip.price}!`,
      openGraph: {
        images: [{ url: trip.tripImage }],
      },
    };
  } catch (error) {
    return {
      title: 'Error | Setrekk',
      description: 'Something went wrong while loading the trip details.'
    };
  }
}

export default function TripLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
