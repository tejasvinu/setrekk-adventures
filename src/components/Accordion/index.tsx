"use client"
import dynamic from 'next/dynamic';

const Accordion = dynamic(() => import('./Accordion'), {
  ssr: false,
  loading: () => (
    <div className="w-full max-w-4xl mx-auto px-4 space-y-4">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="animate-pulse">
          <div className="h-14 bg-slate-800/50 rounded-xl mb-2" />
          {i === 0 && <div className="h-48 bg-slate-800/30 rounded-xl" />}
        </div>
      ))}
    </div>
  )
});

export default Accordion;
