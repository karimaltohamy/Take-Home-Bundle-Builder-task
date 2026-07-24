import React, { useEffect } from 'react';
import { useBundleStore } from '../store/useBundleStore';
import { Accordion } from '../components/accordion/Accordion';
import { ReviewPanel } from '../components/review/ReviewPanel';
import { Typography } from '../components/ui/Typography';
import { Shield, Sparkles } from 'lucide-react';

export const App: React.FC = () => {
  const loadBundle = useBundleStore((state) => state.loadBundle);

  // Restore the user bundle on initial mount
  useEffect(() => {
    loadBundle();
  }, [loadBundle]);

  return (
    <div className="min-h-screen bg-slate-50/50 flex flex-col font-sans">
      {/* Sticky Premium Navbar */}
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 py-3.5 px-6 sticky top-0 z-50 shadow-sm transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white shadow-md shadow-primary/20">
              <Shield size={18} className="fill-white/10 stroke-[2.5]" />
            </div>
            <span className="font-black text-lg text-slate-800 tracking-tight uppercase">
              Wyze <span className="text-primary">System Builder</span>
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-2.5 bg-slate-100/80 px-3 py-1.5 rounded-full border border-slate-200/50">
            <Sparkles size={13} className="text-primary animate-pulse" />
            <span className="text-[11px] font-bold text-slate-600 tracking-wide uppercase">
              Premium Bundle Creator
            </span>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-grow">
        {/* Welcome Section */}
        <div className="mb-8 text-left border-l-4 border-primary pl-4 md:pl-5">
          <Typography variant="h1" className="font-black tracking-tight mb-2 text-slate-900 leading-tight">
            Let's get started!
          </Typography>
          <Typography variant="body" className="text-slate-400 font-medium max-w-3xl leading-relaxed">
            Customize your home defense in four easy steps. Build a system with premium cameras, cloud monitoring, intelligent sensors, and custom accessories.
          </Typography>
        </div>

        {/* Responsive Content Grid */}
        {/* xl:grid-cols-3 handles two columns on desktop, single columns on tablet and mobile */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 items-start">
          {/* Left Side: Steps Accordion Builder (Spans 2 columns on wide screens) */}
          <div className="xl:col-span-2 flex flex-col gap-6">
            <Accordion />
          </div>

          {/* Right Side: Live Review Panel Sidebar (Spans 1 column, sticky on wide screens) */}
          <div className="xl:col-span-1 xl:sticky xl:top-20 z-10 transition-all duration-300">
            <ReviewPanel />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 px-6 mt-16">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-2 text-slate-400">
            <Shield size={14} className="stroke-[2.5]" />
            <span className="text-xs font-semibold uppercase tracking-wider">
              Wyze Labs Bundle Configurator
            </span>
          </div>
          <p className="text-xs text-slate-400 font-medium">
            &copy; {new Date().getFullYear()} Wyze Systems. Built for demonstration and production deployment.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
