import React, { useEffect } from 'react';
import { useBundleStore } from '../store/useBundleStore';
import { Accordion } from '../components/accordion/Accordion';
import { ReviewPanel } from '../components/review/ReviewPanel';

export const App: React.FC = () => {
  const loadBundle = useBundleStore((state) => state.loadBundle);

  // Restore the user bundle on initial mount
  useEffect(() => {
    loadBundle();
  }, [loadBundle]);

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">

      {/* Main Container */}
      <main className="max-w-[1350px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-grow">

        {/* Responsive Content */}
        <div className="flex gap-6 xl:gap-8 items-start flex-col xl:flex-row">
          {/* Left Side: Steps Accordion Builder */}
          <div className="w-full xl:w-[70%] flex flex-col gap-6">
            <Accordion />
          </div>

          {/* Right Side: Live Review Panel Sidebar */}
          <div className="w-full xl:w-[30%] z-10 transition-all duration-300 sticky top-2">
            <ReviewPanel />
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
