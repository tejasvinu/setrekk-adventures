import dynamic from 'next/dynamic';

const Footer = dynamic(() => import('./Footer'), {
  ssr: true,
  loading: () => (
    <footer className="bg-slate-900 animate-pulse">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="space-y-4">
              <div className="h-4 bg-slate-800 rounded w-24" />
              <div className="space-y-2">
                <div className="h-3 bg-slate-800 rounded w-20" />
                <div className="h-3 bg-slate-800 rounded w-24" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </footer>
  )
});

export default Footer;
