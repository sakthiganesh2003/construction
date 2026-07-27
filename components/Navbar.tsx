'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Phone, ArrowUpRight } from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/#products' },
  { label: 'Categories', href: '/#categories' },
  { label: 'Solutions', href: '/#solutions' },
  { label: 'About', href: '/#about' },
  { label: 'Contact', href: '/#contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 pt-4 pb-2 transition-all duration-500 pointer-events-none">
      <nav
        id="navbar"
        className={`pointer-events-auto max-w-6xl mx-auto rounded-2xl transition-all duration-500 ${
          isScrolled
            ? 'bg-navy-950/80 backdrop-blur-xl border border-white/15 shadow-2xl shadow-navy-950/50 py-2.5 px-5'
            : 'bg-white/5 backdrop-blur-md border border-white/10 py-3 px-6'
        }`}
      >
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group" id="navbar-logo">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center shadow-lg shadow-orange-500/25 group-hover:scale-105 transition-transform duration-300">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="2" y="12" width="4" height="10" rx="1" fill="white"/>
                <rect x="8" y="8" width="4" height="14" rx="1" fill="white" opacity="0.85"/>
                <rect x="14" y="4" width="4" height="18" rx="1" fill="white" opacity="0.7"/>
                <rect x="20" y="1" width="2" height="21" rx="1" fill="white" opacity="0.5"/>
                <line x1="2" y1="22" x2="22" y2="22" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
            <div>
              <span className="text-white font-display font-bold text-base leading-none block group-hover:text-orange-400 transition-colors duration-200">
                Veera 
              </span>
              <span className="text-orange-400 text-[10px] font-semibold tracking-widest uppercase block -mt-0.5">
                Blue Metals
              </span>
            </div>
          </Link>

          {/* Floating Pill Nav Links (Desktop) */}
          <ul className="hidden md:flex items-center gap-1 bg-white/5 p-1 rounded-full border border-white/10 backdrop-blur-sm" role="navigation" aria-label="Main navigation">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  id={`nav-${link.label.toLowerCase()}`}
                  className="px-4 py-1.5 rounded-full text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/10 transition-all duration-300 block"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right Action */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="tel:+918026543210"
              className="flex items-center gap-2 text-slate-300 hover:text-orange-400 text-xs font-medium transition-colors duration-200"
            >
              <Phone size={13} className="text-orange-400" />
              <span>+91 80 2654 3210</span>
            </a>
            <a
              href="/#contact"
              id="navbar-cta"
              className="group inline-flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white text-xs font-bold rounded-xl transition-all duration-300 shadow-md shadow-orange-500/20 hover:shadow-lg hover:shadow-orange-500/35 hover:-translate-y-0.5"
            >
              <span>Get Quote</span>
              <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            id="navbar-mobile-toggle"
            aria-label="Toggle menu"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="md:hidden text-white p-2 rounded-xl hover:bg-white/10 transition-colors duration-200"
          >
            {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {isMobileOpen && (
          <div className="md:hidden mt-3 pt-3 border-t border-white/10 animate-fade-in">
            <ul className="space-y-1">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileOpen(false)}
                    className="block px-4 py-2.5 text-slate-200 hover:text-white hover:bg-white/10 rounded-xl text-sm font-medium transition-all duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <a
                  href="/#contact"
                  onClick={() => setIsMobileOpen(false)}
                  className="flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-sm font-bold rounded-xl text-center shadow-md shadow-orange-500/25"
                >
                  <span>Get a Quote</span>
                  <ArrowUpRight size={16} />
                </a>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}
