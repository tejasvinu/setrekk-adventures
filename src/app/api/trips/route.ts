import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { UnifiedTrip } from "@/types/trip";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("setrekk");
    const trips = await db.collection<UnifiedTrip>("trip").find({}).toArray();
    return NextResponse.json(trips);
  } catch (e) {
    return NextResponse.json({ error: "Failed to fetch trips" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db("setrekk");
    const tripData = await request.json();
    
    const newTrip = {
      ...tripData,
      startDate: new Date(tripData.startDate),
      endDate: new Date(tripData.endDate),
      weekNumber: tripData.weekNumber || 0,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    const result = await db.collection<UnifiedTrip>("trip").insertOne(newTrip);
    
    return NextResponse.json({ 
      ...newTrip,
      _id: result.insertedId.toString()
    });
  } catch (e) {
    return NextResponse.json({ error: "Failed to create trip" }, { status: 500 });
  }
}