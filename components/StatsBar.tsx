'use client';

import { useEffect, useRef, useState } from 'react';
import { Award, Globe, Users, Factory } from 'lucide-react';

const stats = [
  {
    icon: Award,
    value: 40,
    suffix: '+',
    label: 'Years of Excellence',
    description: 'Pioneering precision measurement since 1984',
  },
  {
    icon: Factory,
    value: 500,
    suffix: 'K+',
    label: 'Units Deployed',
    description: 'Instruments operating worldwide',
  },
  {
    icon: Users,
    value: 50,
    suffix: 'K+',
    label: 'Satisfied Clients',
    description: 'From SMEs to Fortune 500 companies',
  },
  {
    icon: Globe,
    value: 30,
    suffix: '+',
    label: 'Countries Served',
    description: 'Global presence, local expertise',
  },
];

function useCountUp(target: number, duration: number = 2000, active: boolean = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration, active]);

  return count;
}

function StatItem({ stat, active }: { stat: (typeof stats)[0]; active: boolean }) {
  const count = useCountUp(stat.value, 2000, active);
  const Icon = stat.icon;

  return (
    <div className="relative flex flex-col items-center text-center group">
      {/* Icon */}
      <div className="w-16 h-16 rounded-2xl bg-orange-500/15 border border-orange-500/30 flex items-center justify-center mb-5 group-hover:bg-orange-500/25 group-hover:scale-110 transition-all duration-300">
        <Icon size={28} className="text-orange-400" />
      </div>

      {/* Number */}
      <div className="font-display font-bold text-5xl sm:text-6xl text-white mb-2 leading-none tabular-nums">
        {count}
        <span className="text-orange-400">{stat.suffix}</span>
      </div>

      {/* Label */}
      <div className="text-slate-200 font-semibold text-lg mb-1">{stat.label}</div>
      <div className="text-slate-500 text-sm max-w-[180px] leading-relaxed">{stat.description}</div>

      {/* Divider (not last) */}
    </div>
  );
}

export default function StatsBar() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="stats" className="py-24 bg-navy-900 relative overflow-hidden" ref={ref}>
      {/* Background effects */}
      <div className="absolute inset-0 hero-grid opacity-30 pointer-events-none" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-navy-700/50 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-orange-500/15 text-orange-400 text-sm font-semibold rounded-full uppercase tracking-wider mb-4 border border-orange-500/20">
            Trusted Worldwide
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">
            Numbers That Speak
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Four decades of innovation, quality, and customer trust — reflected in our growth.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
          {stats.map((stat, index) => (
            <div key={stat.label} className="relative">
              {index < stats.length - 1 && (
                <div className="hidden lg:block absolute top-8 -right-px h-32 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent" />
              )}
              <StatItem stat={stat} active={active} />
            </div>
          ))}
        </div>

        {/* Bottom Trust Badges */}
        <div className="mt-16 pt-12 border-t border-white/10">
          <p className="text-center text-slate-500 text-sm mb-6 uppercase tracking-wider font-medium">
            Certifications & Approvals
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {['ISO 9001:2015', 'NABL Accredited', 'BIS Certified', 'OIML Compliant', 'AGMARK Approved', 'IP-68 Rated'].map(
              (cert) => (
                <div
                  key={cert}
                  className="px-5 py-2.5 rounded-xl border border-white/10 text-slate-300 text-sm font-medium glass hover:border-orange-500/30 hover:text-orange-400 transition-all duration-200 cursor-default"
                >
                  {cert}
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
