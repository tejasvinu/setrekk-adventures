import dynamic from 'next/dynamic';

const NavBar = dynamic(() => import('./NavBar'), {
  ssr: true,
  loading: () => (
    <div className="h-16 bg-slate-900 animate-pulse">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="w-32 h-8 bg-slate-800 rounded" />
          <div className="hidden sm:flex space-x-4">
            <div className="w-20 h-8 bg-slate-800 rounded" />
            <div className="w-20 h-8 bg-slate-800 rounded" />
          </div>
        </div>
      </div>
    </div>
  )
});

export default NavBar;
