import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { UnifiedTrip } from "@/types/trip";

export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  if (!ObjectId.isValid(id)) {
    return NextResponse.json({ error: "Invalid trip ID" }, { status: 400 });
  }

  try {
    const client = await clientPromise;
    const db = client.db("setrekk");
    const trip = await db.collection("trip").findOne({
      _id: new ObjectId(id)
    });

    if (!trip) {
      return NextResponse.json({ error: "Trip not found" }, { status: 404 });
    }

    // Ensure consistent data structure
    const formattedTrip = {
      ...trip,
      hotels: trip.hotels || [],
      itinerary: trip.itinerary || [],
      images: trip.images || [],
      bookings: trip.bookings || [],
      weekNumber: trip.weekNumber || 0
    };

    return NextResponse.json(formattedTrip);
  } catch (error: any) {
    return NextResponse.json({ error: `Failed to fetch trip: ${error.message}` }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  try {
    const client = await clientPromise;
    const db = client.db("setrekk");
    const updates: Partial<UnifiedTrip> = await request.json();

    if (updates.startDate) updates.startDate = new Date(updates.startDate).toISOString();
    if (updates.endDate) updates.endDate = new Date(updates.endDate).toISOString();

    const result = await db.collection("trip").updateOne(
      { _id: new ObjectId(id) },
      { $set: updates }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Trip not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, modifiedCount: result.modifiedCount });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update trip" }, { status: 500 });
  }
}