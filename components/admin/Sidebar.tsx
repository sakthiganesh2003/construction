'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard, Package, Settings, MessageSquare,
  FolderOpen, ChevronRight, Zap, X, Scale, Car, Layers
} from 'lucide-react';

const navGroups = [
  {
    label: 'Weighbridge',
    items: [
      { label: 'Dashboard',    href: '/admin',            icon: LayoutDashboard },
      { label: 'Records',       href: '/admin/weighment',     icon: Layers },
      { label: 'Vehicles',      href: '/admin/vehicles',      icon: Car },
      { label: 'Materials',     href: '/admin/materials',     icon: Package },
      { label: 'New Weighment', href: '/admin/weighment/new', icon: Scale },
    ],
  },
  {
    label: 'General',
    items: [
      { label: 'Products',     href: '/admin/products',   icon: Package },
      { label: 'Solutions',    href: '/admin/solutions',  icon: Zap },
      { label: 'Categories',   href: '/admin/categories', icon: FolderOpen },
      { label: 'Inquiries',    href: '/admin/inquiries',  icon: MessageSquare },

    ],
  },
  {
    label: 'System',
    items: [
      { label: 'Settings', href: '/admin/settings', icon: Settings },
    ],
  },
];

export default function AdminSidebar({
  mobileOpen,
  setMobileOpen,
}: {
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}) {
  const pathname = usePathname();

  return (
    <aside
      className={`fixed top-0 left-0 h-screen z-40 flex flex-col w-60 bg-[#060e1c] border-r border-white/8 transition-transform duration-300 ease-in-out
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
    >
      {/* Brand Header */}
      <div className="flex items-center gap-3 px-4 py-4 border-b border-white/8 shrink-0">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center shrink-0 shadow-lg shadow-orange-500/20">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <rect x="2" y="12" width="4" height="10" rx="1" fill="white"/>
            <rect x="8" y="8" width="4" height="14" rx="1" fill="white" opacity="0.85"/>
            <rect x="14" y="4" width="4" height="18" rx="1" fill="white" opacity="0.7"/>
            <line x1="2" y1="22" x2="22" y2="22" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </div>
        <div className="flex-1 overflow-hidden">
          <p className="text-white font-bold text-sm leading-tight truncate">Veera Blue Metals</p>
          <p className="text-orange-400 text-[10px] uppercase tracking-widest">Admin Panel</p>
        </div>
        {/* Close button (mobile only) */}
        <button
          onClick={() => setMobileOpen(false)}
          className="lg:hidden p-1.5 rounded-lg text-slate-500 hover:text-white hover:bg-white/5 transition-colors"
          aria-label="Close sidebar"
        >
          <X size={16} />
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-3 scrollbar-thin">
        {navGroups.map(group => (
          <div key={group.label} className="mb-2">
            <p className="text-slate-600 text-[10px] font-bold uppercase tracking-widest px-5 py-2">{group.label}</p>
            <ul className="space-y-0.5 px-2">
              {group.items.map(({ label, href, icon: Icon }) => {
                const isActive = pathname === href || (href !== '/admin' && pathname.startsWith(href));
                return (
                  <li key={href}>
                    <Link
                      href={href}
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 relative group
                        ${isActive
                          ? 'bg-orange-500/15 text-orange-400 border border-orange-500/20'
                          : 'text-slate-400 hover:text-white hover:bg-white/5'
                        }`}
                    >
                      {isActive && (
                        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-orange-500 rounded-r-full" />
                      )}
                      <Icon size={16} className="shrink-0" />
                      <span className="truncate">{label}</span>
                      {isActive && (
                        <ChevronRight size={13} className="ml-auto text-orange-500 shrink-0" />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-white/8 shrink-0">
        <p className="text-slate-700 text-[10px]">Veera Blue Metals v1.0 © 2026</p>
      </div>
    </aside>
  );
}
