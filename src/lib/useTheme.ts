'use client';

import { useEffect, useState } from 'react';

export type Theme = 'dark' | 'light';
const STORAGE_KEY = 'pd-theme';

export function useTheme() {
  const [theme, setTheme] = useState<Theme>('dark');

  useEffect(() => {
    // One-time sync from localStorage on mount (the blocking inline script in
    // layout.tsx already applied the correct data-theme attribute before paint,
    // so there's no visual flash — this just syncs React state to match).
    const stored = window.localStorage.getItem(STORAGE_KEY);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (stored === 'light' || stored === 'dark') setTheme(stored);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    window.localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'));

  return { theme, toggleTheme };
}
