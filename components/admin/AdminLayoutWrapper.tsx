'use client';

import { useState } from 'react';
import AdminSidebar from './Sidebar';
import TopHeader from './TopHeader';

export default function AdminLayoutWrapper({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0a1628] text-white flex">
      {/* Sidebar */}
      <AdminSidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

      {/* Mobile backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Main content — offset only on lg+ (sidebar is 240px = w-60) */}
      <div className="flex-1 flex flex-col min-h-screen lg:pl-60 w-full overflow-x-hidden">
        <TopHeader onMenuClick={() => setMobileOpen(true)} />
        <main className="flex-1 p-4 sm:p-5 md:p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
