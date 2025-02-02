"use client"
import { lazy, Suspense } from 'react';
import { MountainLoader } from "@/components/CustomElements";

const TripContent = lazy(() => import('./TripContent'));

export default function ClientWrapper({ id }: { id: string }) {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <MountainLoader />
          <p className="text-emerald-500 mt-4">Loading trip details...</p>
        </div>
      </div>
    }>
      <TripContent id={id} />
    </Suspense>
  );
}
