'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Package, Zap, FolderOpen, MessageSquare, TrendingUp, Eye, Scale, Car, Layers, ArrowRight } from 'lucide-react';
import { products } from '@/data/products';

const DEMO_INQUIRIES = [
  { id: 1, customer: 'Ramesh Kumar',  email: 'ramesh@gmail.com',     product: 'Steel Weighbridge',        date: '2026-07-25', status: 'New' },
  { id: 2, customer: 'Suresh Patel',  email: 'suresh@company.com',   product: 'Digital Weighbridge',      date: '2026-07-24', status: 'Replied' },
  { id: 3, customer: 'Kavitha Devi',  email: 'kavitha@corp.in',      product: 'Auto Weighing Solution',   date: '2026-07-23', status: 'Closed' },
  { id: 4, customer: 'Manoj Singh',   email: 'manoj@firm.com',       product: 'AccuTrol',                 date: '2026-07-22', status: 'New' },
  { id: 5, customer: 'Priya Anand',   email: 'priya@works.in',       product: 'Concrete Weighbridge',     date: '2026-07-21', status: 'Replied' },
];

const statusColors: Record<string, string> = {
  New:     'bg-emerald-100 text-emerald-800 border border-emerald-200/80',
  Replied: 'bg-sky-100 text-sky-800 border border-sky-200/80',
  Closed:  'bg-slate-100 text-slate-700 border border-slate-200',
};

export default function AdminDashboard() {
  const [inquiries,     setInquiries]     = useState(DEMO_INQUIRIES);
  const [productCount,  setProductCount]  = useState(0);
  const [solutionCount, setSolutionCount] = useState(0);

  useEffect(() => {
    const p   = JSON.parse(localStorage.getItem('vbm_products')  || 'null') ?? products.filter(p => p.categoryId === 'weighbridges');
    const s   = JSON.parse(localStorage.getItem('vbm_solutions') || 'null') ?? products.filter(p => p.categoryId === 'solutions');
    const inq = JSON.parse(localStorage.getItem('vbm_inquiries') || 'null') ?? DEMO_INQUIRIES;
    if (!localStorage.getItem('vbm_products'))  localStorage.setItem('vbm_products',  JSON.stringify(p));
    if (!localStorage.getItem('vbm_solutions')) localStorage.setItem('vbm_solutions', JSON.stringify(s));
    if (!localStorage.getItem('vbm_inquiries')) localStorage.setItem('vbm_inquiries', JSON.stringify(inq));
    setProductCount(p.length);
    setSolutionCount(s.length);
    setInquiries(inq);
  }, []);

  const newInquiries = inquiries.filter(i => i.status === 'New').length;

  const stats = [
    { label: 'Products',     value: productCount,  icon: Package,      color: 'text-blue-600',   bg: 'bg-white border-slate-200 shadow-sm hover:border-blue-300',   accentBg: 'bg-blue-50 text-blue-600',   href: '/admin/products' },
    { label: 'Solutions',    value: solutionCount, icon: Zap,          color: 'text-amber-600',  bg: 'bg-white border-slate-200 shadow-sm hover:border-amber-300',  accentBg: 'bg-amber-50 text-amber-600', href: '/admin/solutions' },
    { label: 'New Inquiries',value: newInquiries,  icon: MessageSquare,color: 'text-emerald-600',bg: 'bg-white border-slate-200 shadow-sm hover:border-emerald-300',accentBg: 'bg-emerald-50 text-emerald-600',href: '/admin/inquiries' },
    { label: 'Categories',   value: 2,             icon: FolderOpen,   color: 'text-purple-600', bg: 'bg-white border-slate-200 shadow-sm hover:border-purple-300', accentBg: 'bg-purple-50 text-purple-600', href: '/admin/categories' },
  ];

  const quickActions = [
    { label: 'New Weighment',    href: '/admin/weighment/new', icon: Scale,   accent: true },
    { label: 'Register Vehicle', href: '/admin/vehicles',      icon: Car,     accent: false },
    { label: 'Material Rates',   href: '/admin/materials',     icon: Layers,  accent: false },
    { label: 'View Inquiries',   href: '/admin/inquiries',     icon: Eye,     accent: false },
  ];

  return (
    <div className="space-y-5 sm:space-y-6">
      {/* ── Stats ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(({ label, value, icon: Icon, color, bg, accentBg, href }) => (
          <Link key={label} href={href}
            className={`group flex flex-col justify-between gap-3 p-5 rounded-2xl border ${bg} transition-all duration-200 hover:-translate-y-0.5`}
          >
            <div className="flex items-center justify-between">
              <div className={`p-2.5 rounded-xl ${accentBg}`}>
                <Icon size={20} className={color} />
              </div>
              <TrendingUp size={15} className="text-slate-400 group-hover:text-slate-600 transition-colors" />
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-black text-slate-900">{value}</p>
              <p className="text-slate-500 text-xs font-medium mt-0.5">{label}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* ── Quick Actions ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {quickActions.map(({ label, href, icon: Icon, accent }) => (
          <Link key={label} href={href}
            className={`flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 shadow-xs
              ${accent
                ? 'bg-orange-500 hover:bg-orange-600 text-white shadow-md shadow-orange-500/20'
                : 'bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 hover:text-slate-900'
              }`}
          >
            <Icon size={16} className="shrink-0" />
            <span className="truncate">{label}</span>
          </Link>
        ))}
      </div>

      {/* ── Recent Inquiries ── */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <h2 className="text-slate-900 font-bold text-sm">Recent Inquiries</h2>
          <Link href="/admin/inquiries" className="flex items-center gap-1 text-orange-600 hover:text-orange-700 text-xs font-semibold transition-colors">
            View all <ArrowRight size={12} />
          </Link>
        </div>
        <div className="divide-y divide-slate-100">
          {inquiries.slice(0, 5).map((inq) => (
            <div key={inq.id} className="flex items-center gap-3 px-5 py-3.5 hover:bg-slate-50/70 transition-colors">
              {/* Avatar */}
              <div className="w-8 h-8 rounded-full bg-orange-100 border border-orange-200 flex items-center justify-center shrink-0">
                <span className="text-orange-700 text-xs font-bold">{inq.customer[0]}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-slate-900 text-sm font-semibold truncate">{inq.customer}</p>
                <p className="text-slate-500 text-xs truncate">{inq.product}</p>
              </div>
              <div className="flex flex-col items-end gap-1 shrink-0">
                <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${statusColors[inq.status]}`}>
                  {inq.status}
                </span>
                <span className="text-slate-400 text-[11px]">{inq.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Products & Solutions Overview ── */}
      <div className="grid sm:grid-cols-2 gap-4">
        {[
          { title: 'Products', icon: Package, link: '/admin/products',
            items: ['Steel Weighbridge','Concrete Weighbridge','Tuff Track Weighbridge','Digital Weighbridge','Flexi Weighbridge'] },
          { title: 'Solutions', icon: Zap, link: '/admin/solutions',
            items: ['Auto Weighing Solution','Crusher Management','Intelligent Terminal','Silo Weighing','AccuTrol'] },
        ].map(({ title, icon: Icon, link, items }) => (
          <div key={title} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
              <h2 className="text-slate-900 font-bold text-sm flex items-center gap-2">
                <Icon size={16} className="text-orange-500" /> {title}
              </h2>
              <Link href={link} className="text-orange-600 hover:text-orange-700 text-xs font-semibold">Manage →</Link>
            </div>
            <div className="space-y-2">
              {items.map((name, i) => (
                <div key={name} className="flex items-center justify-between py-1.5 border-b border-slate-100 last:border-0">
                  <span className="text-slate-700 font-medium text-sm truncate pr-2">{name}</span>
                  <span className="text-slate-400 text-xs font-medium shrink-0">#{i + 1}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
