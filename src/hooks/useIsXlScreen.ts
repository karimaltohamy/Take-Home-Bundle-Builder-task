import { useEffect, useState } from 'react';

export const useIsXlScreen = () => {
  const [isXl, setIsXl] = useState(() => window.matchMedia('(min-width: 1280px)').matches);

  useEffect(() => {
    const mql = window.matchMedia('(min-width: 1280px)');
    const handler = (e: MediaQueryListEvent) => setIsXl(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  return isXl;
};
