'use client';

import { useEffect, useState } from 'react';

export default function PageLoader() {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Skip on revisit (sessionStorage)
    if (sessionStorage.getItem('essae-loaded')) {
      setVisible(false);
      return;
    }

    // Animate progress bar
    const steps = [20, 45, 70, 90, 100];
    const delays = [100, 250, 450, 700, 1000];
    steps.forEach((step, i) => {
      setTimeout(() => setProgress(step), delays[i]);
    });

    // Start fade out after progress hits 100
    const fadeTimer = setTimeout(() => setFadeOut(true), 1350);
    // Remove from DOM after fade
    const hideTimer = setTimeout(() => {
      setVisible(false);
      sessionStorage.setItem('essae-loaded', '1');
    }, 1900);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      aria-label="Loading Essae Digitronics"
      role="status"
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-navy-950 transition-all duration-500 ${
        fadeOut ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* Animated background grid */}
      <div className="absolute inset-0 hero-grid opacity-40" />

      {/* Radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-orange-500/8 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-navy-700/60 blur-2xl pointer-events-none" />

      {/* Floating particles */}
      {[
        { top: '20%', left: '15%', size: 3, delay: '0s' },
        { top: '30%', right: '20%', size: 2, delay: '0.3s' },
        { top: '70%', left: '25%', size: 2, delay: '0.6s' },
        { top: '60%', right: '15%', size: 3, delay: '0.2s' },
        { top: '45%', left: '8%',  size: 1, delay: '0.8s' },
        { top: '35%', right: '8%', size: 1, delay: '0.5s' },
      ].map((p, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-orange-500/60 animate-float"
          style={{
            top: p.top,
            left: (p as any).left,
            right: (p as any).right,
            width: p.size * 4,
            height: p.size * 4,
            animationDelay: p.delay,
          }}
        />
      ))}

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center gap-10 px-8">
        {/* Logo + Brand */}
        <div className="flex flex-col items-center gap-5 animate-fade-in-up">
          {/* Animated icon */}
          <div className="relative">
            <div className="w-24 h-24 rounded-3xl bg-orange-500 flex items-center justify-center shadow-2xl shadow-orange-500/50 animate-pulse-glow">
              <svg width="52" height="52" viewBox="0 0 24 24" fill="none">
                <rect x="2" y="12" width="4" height="10" rx="1" fill="white" />
                <rect x="8" y="8" width="4" height="14" rx="1" fill="white" opacity="0.85" />
                <rect x="14" y="4" width="4" height="18" rx="1" fill="white" opacity="0.7" />
                <rect x="20" y="1" width="2" height="21" rx="1" fill="white" opacity="0.5" />
                <line x1="2" y1="22" x2="22" y2="22" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
            {/* Orbit ring */}
            <div className="absolute -inset-3 rounded-full border-2 border-orange-500/25 animate-spin" style={{ animationDuration: '3s' }} />
            <div className="absolute -inset-6 rounded-full border border-orange-500/10 animate-spin" style={{ animationDuration: '5s', animationDirection: 'reverse' }} />
          </div>

          {/* Brand name */}
          <div className="text-center">
            <h1 className="font-display font-bold text-5xl text-white leading-none tracking-tight">
              Essae
            </h1>
            <p className="text-orange-400 text-sm font-semibold tracking-[0.3em] uppercase mt-1">
              Digitronics
            </p>
          </div>

          {/* Tagline */}
          <p className="text-slate-400 text-base text-center max-w-xs leading-relaxed animate-fade-in delay-200">
            Precision Engineering for Every Industry
          </p>
        </div>

        {/* Progress bar */}
        <div className="w-72 space-y-3 animate-fade-in delay-100">
          <div className="h-1 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-orange-500 to-orange-400 rounded-full transition-all duration-500 ease-out shadow-sm shadow-orange-500/50"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-500 text-xs font-medium">Initializing...</span>
            <span className="text-orange-400 text-xs font-mono font-bold tabular-nums">{progress}%</span>
          </div>
        </div>

        {/* Certification badges */}
        <div className="flex flex-wrap justify-center gap-3 animate-fade-in delay-300">
          {['ISO 9001', 'NABL', 'OIML', 'BIS'].map((cert) => (
            <span
              key={cert}
              className="px-3 py-1 rounded-full border border-white/10 text-slate-500 text-xs font-medium"
            >
              {cert}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
