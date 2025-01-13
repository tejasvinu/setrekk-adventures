import { Suspense } from "react";
import TripContent from "./TripContent";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function TripDetail({ params }: PageProps) {
  const resolvedParams = await params;
  
  return (
    <Suspense fallback={<div className="text-center p-8">Loading...</div>}>
      <TripContent id={resolvedParams.id} />
    </Suspense>
  );
}