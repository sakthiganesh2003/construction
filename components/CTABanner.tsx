'use client';

import { ArrowRight, MessageCircle, BookOpen } from 'lucide-react';

export default function CTABanner() {
  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-navy-950">
      {/* Orange gradient backdrop */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-600/20 via-transparent to-navy-800/50 pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/40 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/15 border border-orange-500/25 text-orange-400 text-sm font-medium mb-8">
          <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
          Ready to Transform Your Operations?
        </div>

        {/* Headline */}
        <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
          Ready to Upgrade Your{' '}
          <span className="gradient-text-orange">Weighing Systems?</span>
        </h2>

        {/* Sub-text */}
        <p className="text-slate-400 text-lg sm:text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
          Our team of engineers will help you find the perfect measurement solution for your specific
          industry needs. Get expert advice, custom quotes, and on-site demos.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap justify-center gap-5 mb-16">
          <a
            href="mailto:sales@essae.com"
            id="cta-catalogue"
            className="inline-flex items-center gap-3 px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-bold text-lg rounded-2xl transition-all duration-300 hover:shadow-2xl hover:shadow-orange-500/40 hover:-translate-y-1 group"
          >
            <BookOpen size={20} />
            Browse Full Catalogue
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-200" />
          </a>
          <a
            href="tel:+918026543210"
            id="cta-expert"
            className="inline-flex items-center gap-3 px-8 py-4 border-2 border-white/20 hover:border-orange-400/60 text-white hover:text-orange-400 font-bold text-lg rounded-2xl glass transition-all duration-300 hover:-translate-y-1 group"
          >
            <MessageCircle size={20} />
            Talk to an Expert
          </a>
        </div>

        {/* Feature chips */}
        <div className="flex flex-wrap justify-center gap-6">
          {[
            { emoji: '🚚', text: 'Free On-site Demo' },
            { emoji: '🔧', text: 'AMC Support' },
            { emoji: '📞', text: '24/7 Helpline' },
            { emoji: '📋', text: 'Custom Quotes' },
            { emoji: '🏆', text: 'ISO Certified' },
          ].map((item) => (
            <div key={item.text} className="flex items-center gap-2 text-slate-400 text-sm">
              <span>{item.emoji}</span>
              <span>{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
