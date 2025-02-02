import { Suspense } from "react";
import ClientWrapper from './ClientWrapper';

interface Props {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>; // updated type
}

export default async function TripDetail({ params }: Props) {
  const resolvedParams = await params;
  
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-emerald-500 mt-4">Loading...</p>
        </div>
      </div>
    }>
      <ClientWrapper id={resolvedParams.id} />
    </Suspense>
  );
}