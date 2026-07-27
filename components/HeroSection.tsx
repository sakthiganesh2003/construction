'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowRight, PlayCircle, Award, Globe, Users, Factory } from 'lucide-react';

const stats = [
  { icon: Award, value: '40+', label: 'Years of Excellence' },
  { icon: Factory, value: '500K+', label: 'Units Deployed' },
  { icon: Users, value: '50K+', label: 'Satisfied Clients' },
  { icon: Globe, value: '30+', label: 'Countries Served' },
];

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col overflow-hidden bg-navy-900"
      aria-label="Hero section"
    >
      {/* Animated grid background */}
      <div className="absolute inset-0 hero-grid opacity-60" />

      {/* Radial glow overlay */}
      <div className="absolute inset-0 bg-radial-[ellipse_at_top_left] from-navy-700/40 via-transparent to-transparent pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-[600px] h-[600px] rounded-full bg-orange-500/8 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full bg-navy-700/50 blur-3xl pointer-events-none" />

      {/* Floating accent dots */}
      <div className="absolute top-32 right-1/4 w-2 h-2 bg-orange-500 rounded-full animate-float opacity-80" />
      <div className="absolute top-48 right-1/3 w-1 h-1 bg-orange-400 rounded-full animate-float delay-300 opacity-60" />
      <div className="absolute top-64 left-1/5 w-3 h-3 bg-orange-500/40 rounded-full animate-float delay-500" />

      {/* Main Content */}
      <div className="relative z-10 flex-1 flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Column – Text */}
            <div className={`space-y-8 ${mounted ? 'animate-fade-in-up' : 'opacity-0'}`}>
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-orange-500/30 text-orange-400 text-sm font-medium">
                <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
                ISO 9001:2015 Certified Manufacturer
              </div>

              {/* Headline */}
              <div className="space-y-3">
                <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight text-white">
                  Precision
                  <br />
                  <span className="gradient-text-orange">Engineering</span>
                  <br />
                  <span className="text-slate-200">for Every</span>
                  <br />
                  <span className="text-white">Industry</span>
                </h1>
              </div>

              {/* Sub-text */}
              <p className="text-slate-400 text-lg sm:text-xl leading-relaxed max-w-lg">
                From precision bench scales to 150-tonne weighbridges — Essae Digitronics delivers
                measurement solutions trusted by 50,000+ clients across manufacturing, logistics, retail,
                dairy, and infrastructure sectors.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4">
                <a
                  href="#products"
                  id="hero-explore-cta"
                  className="inline-flex items-center gap-3 px-7 py-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-2xl transition-all duration-300 hover:shadow-xl hover:shadow-orange-500/40 hover:-translate-y-1 group"
                >
                  Explore Products
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-200" />
                </a>
                <a
                  href="#contact"
                  id="hero-demo-cta"
                  className="inline-flex items-center gap-3 px-7 py-4 border border-white/20 hover:border-orange-400/50 text-white hover:text-orange-400 font-semibold rounded-2xl glass transition-all duration-300 hover:-translate-y-1 group"
                >
                  <PlayCircle size={18} className="group-hover:scale-110 transition-transform duration-200" />
                  Request Demo
                </a>
              </div>

              {/* Trust indicators */}
              <div className="flex flex-wrap items-center gap-6 pt-2">
                {['ISO Certified', 'NABL Approved', 'OIML Compliant', 'BIS Certified'].map((tag) => (
                  <div key={tag} className="flex items-center gap-2 text-slate-400 text-sm">
                    <span className="w-1.5 h-1.5 bg-orange-500 rounded-full" />
                    {tag}
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column – Visual */}
            <div className={`hidden lg:flex justify-center ${mounted ? 'animate-fade-in delay-300' : 'opacity-0'}`}>
              <div className="relative w-full max-w-md">
                {/* Main card */}
                <div className="glass rounded-3xl p-8 border border-white/10 animate-float">
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { icon: '⚖️', label: 'Industrial Scales', count: '4 Products' },
                      { icon: '🚛', label: 'Weighbridges', count: '3 Products' },
                      { icon: '🏪', label: 'Retail POS', count: '2 Products' },
                      { icon: '🥛', label: 'Milk Analysers', count: '2 Products' },
                      { icon: '🛰️', label: 'GPS Clocks', count: '2 Products' },
                      { icon: '🏗️', label: 'Crane Systems', count: '2 Products' },
                    ].map((item, i) => (
                      <div
                        key={item.label}
                        className="bg-white/5 hover:bg-orange-500/10 border border-white/8 hover:border-orange-500/30 rounded-2xl p-4 transition-all duration-300 cursor-default group"
                      >
                        <div className="text-3xl mb-2">{item.icon}</div>
                        <div className="text-white text-xs font-semibold leading-tight">{item.label}</div>
                        <div className="text-orange-400 text-xs mt-1">{item.count}</div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 pt-6 border-t border-white/10">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400 text-sm">Total Products</span>
                      <span className="text-white font-bold text-2xl">14+</span>
                    </div>
                    <div className="mt-3 h-2 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full w-4/5 bg-gradient-to-r from-orange-500 to-orange-400 rounded-full animate-pulse-glow" />
                    </div>
                  </div>
                </div>

                {/* Floating badge */}
                <div className="absolute -top-4 -right-4 glass-dark rounded-2xl px-4 py-3 border border-orange-500/30">
                  <div className="text-orange-400 text-xs font-bold uppercase tracking-wider">Since 1984</div>
                  <div className="text-white font-display font-bold text-lg">40 Years</div>
                </div>

                {/* Floating metric */}
                <div className="absolute -bottom-4 -left-4 glass-dark rounded-2xl px-4 py-3 border border-white/10">
                  <div className="text-slate-400 text-xs">Customer Satisfaction</div>
                  <div className="text-white font-bold text-lg">98.6% <span className="text-green-400 text-sm">↑</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Strip */}
      <div className="relative z-10 border-t border-white/10 bg-white/3 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map(({ icon: Icon, value, label }, i) => (
              <div
                key={label}
                className="flex items-center gap-4 group"
              >
                <div className="w-10 h-10 rounded-xl bg-orange-500/15 border border-orange-500/25 flex items-center justify-center shrink-0 group-hover:bg-orange-500/25 transition-colors duration-200">
                  <Icon size={18} className="text-orange-400" />
                </div>
                <div>
                  <div className="text-white font-display font-bold text-xl leading-none">{value}</div>
                  <div className="text-slate-400 text-xs mt-1">{label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
