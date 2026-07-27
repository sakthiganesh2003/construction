'use client';

import { useEffect, useState } from 'react';

export default function PageLoader() {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Quick 400ms fade out
    const fadeTimer = setTimeout(() => setFadeOut(true), 300);
    const hideTimer = setTimeout(() => setVisible(false), 500);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      aria-label="Loading Veera Blue Metals"
      role="status"
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-navy-950 transition-opacity duration-300 ${
        fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="flex items-center gap-3">
        {/* Simple spinner */}
        <div className="w-6 h-6 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
        <span className="text-white font-display font-semibold text-sm tracking-wide">
          Veera Blue Metals
        </span>
      </div>
    </div>
  );
}
