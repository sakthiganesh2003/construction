'use client';

import { usePathname } from 'next/navigation';
import { Bell, User, Menu, Scale } from 'lucide-react';
import Link from 'next/link';

const pageTitles: Record<string, { title: string; subtitle: string }> = {
  '/admin':               { title: 'Dashboard',         subtitle: 'Veera Blue Metals Admin' },
  '/admin/products':      { title: 'Products',          subtitle: 'Manage weighbridge products' },
  '/admin/solutions':     { title: 'Solutions',         subtitle: 'Manage industrial solutions' },
  '/admin/categories':    { title: 'Categories',        subtitle: 'Product & solution categories' },
  '/admin/inquiries':     { title: 'Inquiries',         subtitle: 'Customer quote requests' },
  '/admin/settings':      { title: 'Settings',          subtitle: 'Brand, contact & SEO' },
  '/admin/weighment/new': { title: 'New Weighment',     subtitle: 'Enter gross & tare weight' },
  '/admin/weighment':     { title: 'Weighment Records', subtitle: 'All weighment history' },
  '/admin/vehicles':      { title: 'Vehicle Register',  subtitle: 'Truck tare weight register' },
  '/admin/materials':     { title: 'Materials & Rates', subtitle: 'Material rates per ton' },
};

export default function TopHeader({ onMenuClick }: { onMenuClick?: () => void }) {
  const pathname = usePathname();
  const info = pageTitles[pathname] ?? { title: 'Admin', subtitle: '' };

  return (
    <header className="h-14 sm:h-16 flex items-center justify-between px-4 sm:px-6 border-b border-white/8 bg-[#0a1628]/95 backdrop-blur-md sticky top-0 z-30 shrink-0">
      {/* Left — hamburger + page title */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-xl bg-white/5 border border-white/8 text-slate-400 hover:text-white hover:bg-white/10 transition-all shrink-0 cursor-pointer"
          aria-label="Open menu"
        >
          <Menu size={17} />
        </button>
        <div className="min-w-0">
          <h1 className="text-white font-bold text-sm sm:text-base leading-tight truncate">{info.title}</h1>
          <p className="text-slate-500 text-[11px] hidden sm:block truncate">{info.subtitle}</p>
        </div>
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        {/* Quick action — new weighment */}
        <Link
          href="/admin/weighment/new"
          className="hidden md:flex items-center gap-1.5 px-3 py-1.5 bg-orange-500/15 border border-orange-500/25 text-orange-400 text-xs font-semibold rounded-xl hover:bg-orange-500/25 transition-all"
        >
          <Scale size={13} />
          New Weighment
        </Link>

        {/* Notification bell */}
        <button className="relative w-9 h-9 rounded-xl bg-white/5 border border-white/8 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all">
          <Bell size={16} />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-orange-500" />
        </button>

        {/* Admin avatar */}
        <div className="flex items-center gap-2 pl-2 border-l border-white/8">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center shrink-0">
            <User size={14} className="text-white" />
          </div>
          <div className="hidden sm:block text-left">
            <p className="text-white text-xs font-semibold leading-tight">Admin</p>
            <p className="text-slate-500 text-[10px]">Veera Blue Metals</p>
          </div>
        </div>
      </div>
    </header>
  );
}
