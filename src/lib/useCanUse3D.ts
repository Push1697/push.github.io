'use client';

import { useEffect, useState } from 'react';

export function useCanUse3D() {
  const [canUse3D, setCanUse3D] = useState(false);

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const widthQuery = window.matchMedia('(min-width: 1024px)');
    const evaluate = () => setCanUse3D(!motionQuery.matches && widthQuery.matches);
    evaluate();
    motionQuery.addEventListener('change', evaluate);
    widthQuery.addEventListener('change', evaluate);
    return () => {
      motionQuery.removeEventListener('change', evaluate);
      widthQuery.removeEventListener('change', evaluate);
    };
  }, []);

  return canUse3D;
}
