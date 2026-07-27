'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronDown, Phone } from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '#' },
  { label: 'Products', href: '#products' },
  { label: 'Solutions', href: '#solutions' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      id="navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'glass-dark shadow-lg py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group" id="navbar-logo">
            <div className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-200">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="2" y="12" width="4" height="10" rx="1" fill="white"/>
                <rect x="8" y="8" width="4" height="14" rx="1" fill="white" opacity="0.85"/>
                <rect x="14" y="4" width="4" height="18" rx="1" fill="white" opacity="0.7"/>
                <rect x="20" y="1" width="2" height="21" rx="1" fill="white" opacity="0.5"/>
                <line x1="2" y1="22" x2="22" y2="22" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
            <div>
              <span className="text-white font-display font-bold text-lg leading-none block">
                Essae
              </span>
              <span className="text-orange-400 text-xs font-medium tracking-widest uppercase">
                Digitronics
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center gap-1" role="navigation" aria-label="Main navigation">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  id={`nav-${link.label.toLowerCase()}`}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    link.label === 'Products'
                      ? 'text-orange-400 bg-orange-500/10'
                      : 'text-slate-200 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right Side */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="tel:+918026543210"
              className="flex items-center gap-2 text-slate-300 hover:text-white text-sm transition-colors duration-200"
            >
              <Phone size={14} />
              <span>+91 80 2654 3210</span>
            </a>
            <a
              href="#contact"
              id="navbar-cta"
              className="px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-orange-500/30 hover:-translate-y-0.5"
            >
              Get a Quote
            </a>
          </div>

          {/* Mobile Toggle */}
          <button
            id="navbar-mobile-toggle"
            aria-label="Toggle menu"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="md:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors duration-200"
          >
            {isMobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-white/10 animate-fade-in">
            <ul className="pt-4 space-y-1">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileOpen(false)}
                    className="block px-4 py-3 text-slate-200 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <a
                  href="#contact"
                  className="block px-4 py-3 bg-orange-500 text-white text-center font-semibold rounded-xl"
                >
                  Get a Quote
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}
