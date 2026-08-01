'use client';

import { useEffect } from 'react';

export function useRevealOnScroll() {
  useEffect(() => {
    const reveal = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('is-visible')),
      { threshold: .12 },
    );
    document.querySelectorAll('.reveal-on-scroll').forEach((el) => reveal.observe(el));
    return () => reveal.disconnect();
  }, []);
}
