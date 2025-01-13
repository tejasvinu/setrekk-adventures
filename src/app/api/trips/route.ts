import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { UnifiedTrip } from "@/types/trip";
import { ObjectId } from "mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("setrekk");
    const trips = await db.collection<UnifiedTrip>("trip").find({}).toArray();
    return NextResponse.json(trips);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch trips" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db("setrekk");
    const tripData: UnifiedTrip = await request.json();
    
    // Convert date strings to Date objects
    tripData.startDate = new Date(tripData.startDate);
    tripData.endDate = new Date(tripData.endDate);
    
    // Set default weekNumber if not provided
    if (!tripData.weekNumber) tripData.weekNumber = 0;
    
    const result = await db.collection("trip").insertOne({
      ...tripData,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    return NextResponse.json({ 
      _id: result.insertedId,
      ...tripData 
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create trip" }, { status: 500 });
  }
}