import { useEffect, useState } from 'react';

export default function useDarkMode() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.toggle('dark', isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    setIsDark(saved === 'dark');
  }, []);

  return {
    isDark,
    toggleDark: () => setIsDark((prev) => !prev),
  };
}
