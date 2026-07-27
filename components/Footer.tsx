import Link from 'next/link';
import { Mail, Phone, MapPin, ExternalLink, Share2, PlayCircle } from 'lucide-react';

const footerLinks = [
  {
    title: 'Products',
    links: [
      { label: 'Steel Weighbridge', href: '/products/steel-weighbridge' },
      { label: 'Concrete Weighbridge', href: '/products/concrete-weighbridge' },
      { label: 'Tuff Track Weighbridge', href: '/products/tuff-track-weighbridge' },
      { label: 'Weigh Pads', href: '/products/weigh-pads' },
      { label: 'Flexi Weighbridge', href: '/products/flexi-weighbridge' },
      { label: 'Rail Weigh in Motion', href: '/products/rail-weigh-in-motion' },
      { label: 'Truck Weigh In Motion', href: '/products/truck-weigh-in-motion' },
      { label: 'Digital Weighbridge', href: '/products/digital-weighbridge' },
    ],
  },
  {
    title: 'Solutions',
    links: [
      { label: 'Automatic Weighing Solution', href: '/products/automatic-weighing-solution' },
      { label: 'Crusher Production Management', href: '/products/crusher-production-management' },
      { label: 'Intelligent Weighing Terminal', href: '/products/intelligent-weighing-terminal' },
      { label: 'Silo Weighing Solutions', href: '/products/silo-weighing-solutions' },
      { label: 'Granite Weighing Solutions', href: '/products/granite-weighing-solutions' },
      { label: 'Wheel Loader Weighing', href: '/products/wheel-loader-weighing-solutions' },
      { label: 'AccuTrol', href: '/products/accutrol' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Essae', href: '/#about' },
      { label: 'Certifications', href: '#' },
      { label: 'Dealer Network', href: '#' },
      { label: 'News & Updates', href: '#' },
      { label: 'Contact Us', href: '/#contact' },
    ],
  },
];

const socials = [
  { icon: ExternalLink, label: 'LinkedIn', href: '#' },
  { icon: Share2, label: 'Twitter / X', href: '#' },
  { icon: PlayCircle, label: 'YouTube', href: '#' },
];

export default function Footer() {
  return (
    <footer id="footer" className="bg-navy-950 border-t border-white/8" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer content */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Logo */}
            <Link href="/" className="inline-flex items-center gap-3" id="footer-logo">
              <div className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <rect x="2" y="12" width="4" height="10" rx="1" fill="white"/>
                  <rect x="8" y="8" width="4" height="14" rx="1" fill="white" opacity="0.85"/>
                  <rect x="14" y="4" width="4" height="18" rx="1" fill="white" opacity="0.7"/>
                  <rect x="20" y="1" width="2" height="21" rx="1" fill="white" opacity="0.5"/>
                  <line x1="2" y1="22" x2="22" y2="22" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
              <div>
                <span className="text-white font-display font-bold text-xl leading-none block">Veera</span>
                <span className="text-orange-400 text-xs tracking-widest uppercase font-medium">Blue Metals</span>
              </div>
            </Link>

            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              Leading provider of heavy weighbridges, quarry weighing solutions, and industrial measurement instruments.
            </p>

            {/* Contact info */}
            <div className="space-y-3">
              <a href="tel:+918026543210" className="flex items-center gap-3 text-slate-400 hover:text-orange-400 text-sm transition-colors duration-200 group">
                <Phone size={15} className="text-orange-500 shrink-0" />
                +91 80 2654 3210
              </a>
              <a href="mailto:info@essae.com" className="flex items-center gap-3 text-slate-400 hover:text-orange-400 text-sm transition-colors duration-200">
                <Mail size={15} className="text-orange-500 shrink-0" />
                info@essae.com
              </a>
              <div className="flex items-start gap-3 text-slate-400 text-sm">
                <MapPin size={15} className="text-orange-500 shrink-0 mt-0.5" />
                <span>Essae House, Lalbagh Road, Bengaluru – 560 027, Karnataka, India</span>
              </div>
            </div>

            {/* Social links */}
            <div className="flex items-center gap-3">
              {socials.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-white/6 hover:bg-orange-500/20 border border-white/8 hover:border-orange-500/30 flex items-center justify-center text-slate-400 hover:text-orange-400 transition-all duration-200"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {footerLinks.map((col) => (
            <div key={col.title}>
              <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">
                {col.title}
              </h3>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-slate-400 hover:text-orange-400 text-xs sm:text-sm transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/8 py-6 flex flex-wrap items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} Veera Blue Metals. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="#" className="text-slate-500 hover:text-slate-300 text-xs transition-colors duration-200">
              Privacy Policy
            </Link>
            <Link href="#" className="text-slate-500 hover:text-slate-300 text-xs transition-colors duration-200">
              Terms of Use
            </Link>
            <Link href="#" className="text-slate-500 hover:text-slate-300 text-xs transition-colors duration-200">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
