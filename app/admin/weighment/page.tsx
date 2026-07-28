'use client';

import { useEffect, useState } from 'react';
import { Search, Printer, Trash2, Eye, X, RefreshCw, Plus } from 'lucide-react';
import Link from 'next/link';

type Weighment = {
  id: string; slipNumber: string; vehicleNumber: string; driverName: string;
  partyName: string; materialName: string; grossWeight: number; tareWeight: number;
  netWeight: number; ratePerTon: number; amount: number; remarks?: string; createdAt: string;
};

export default function WeighmentRecordsPage() {
  const [items,    setItems]    = useState<Weighment[]>([]);
  const [loading,  setLoading]  = useState(true);
  const [search,   setSearch]   = useState('');
  const [date,     setDate]     = useState('');
  const [mat,      setMat]      = useState('');
  const [viewItem, setViewItem] = useState<Weighment | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    const p = new URLSearchParams();
    if (search) p.set('q', search);
    if (date)   p.set('date', date);
    if (mat)    p.set('material', mat);
    const res = await fetch(`/api/weighments?${p}`);
    setItems(await res.json());
    setLoading(false);
  };
  useEffect(() => { fetchData(); }, [search, date, mat]);

  const handleDelete = async () => {
    if (!deleteId) return;
    await fetch(`/api/weighments/${deleteId}`, { method: 'DELETE' });
    setDeleteId(null); setViewItem(null); fetchData();
  };

  const totalTon = items.reduce((s, i) => s + i.netWeight, 0) / 1000;
  const totalAmt = items.reduce((s, i) => s + i.amount,    0);
  const mats     = [...new Set(items.map(i => i.materialName))];

  const fmt = (n: number) => n.toLocaleString('en-IN', { maximumFractionDigits: 0 });

  return (
    <div className="space-y-5">
      {/* ── Toolbar ── */}
      <div className="flex flex-col gap-3">
        {/* Search bar */}
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search vehicle number, party name, slip..."
            className="w-full bg-white/5 border border-white/10 text-slate-300 text-sm rounded-xl pl-9 pr-4 py-2.5 focus:outline-none focus:border-orange-500/50 transition-all" />
        </div>
        {/* Filters + actions */}
        <div className="flex gap-2 flex-wrap">
          <input type="date" value={date} onChange={e => setDate(e.target.value)}
            className="bg-white/5 border border-white/10 text-slate-300 text-xs sm:text-sm rounded-xl px-3 py-2.5 focus:outline-none focus:border-orange-500/50 transition-all flex-1 min-w-[130px]" />
          <select value={mat} onChange={e => setMat(e.target.value)}
            className="bg-white/5 border border-white/10 text-slate-300 text-xs sm:text-sm rounded-xl px-3 py-2.5 focus:outline-none focus:border-orange-500/50 transition-all flex-1 min-w-[120px] cursor-pointer">
            <option value="">All Materials</option>
            {mats.map(m => <option key={m} value={m} className="bg-[#0c1a2e]">{m}</option>)}
          </select>
          <button onClick={fetchData}
            className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-white transition-all cursor-pointer shrink-0">
            <RefreshCw size={15} />
          </button>
          <Link href="/admin/weighment/new"
            className="flex items-center gap-1.5 px-4 py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold rounded-xl transition-all hover:shadow-lg hover:shadow-orange-500/25 whitespace-nowrap shrink-0">
            <Plus size={15} /> New Entry
          </Link>
        </div>
      </div>

      {/* ── Summary stats ── */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'Records', value: String(items.length), sub: 'total entries' },
          { label: 'Tonnage', value: totalTon.toFixed(2),  sub: 'metric tons' },
          { label: 'Revenue', value: `₹${fmt(totalAmt)}`,  sub: 'total INR' },
        ].map(({ label, value, sub }) => (
          <div key={label} className="bg-white/3 border border-white/8 rounded-xl p-3 sm:p-4 text-center">
            <p className="text-white font-black text-lg sm:text-xl leading-tight">{value}</p>
            <p className="text-slate-500 text-[10px] sm:text-xs mt-0.5">{sub}</p>
            <p className="text-orange-400 text-[10px] font-semibold uppercase tracking-wider">{label}</p>
          </div>
        ))}
      </div>

      {/* ── Records ── */}
      {loading ? (
        <div className="text-center text-slate-500 py-12 text-sm">Loading records...</div>
      ) : items.length === 0 ? (
        <div className="text-center text-slate-500 py-12 text-sm">No weighment records found.</div>
      ) : (
        <>
          {/* Mobile cards (hidden on lg+) */}
          <div className="lg:hidden space-y-3">
            {items.map(w => (
              <div key={w.id} className="bg-white/3 border border-white/8 rounded-2xl p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="text-orange-400 font-mono text-xs font-bold">{w.slipNumber}</p>
                    <p className="text-white font-mono font-black text-lg leading-tight">{w.vehicleNumber}</p>
                    <p className="text-slate-500 text-xs mt-0.5">{new Date(w.createdAt).toLocaleDateString('en-IN')}</p>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => setViewItem(w)} className="p-2 rounded-lg bg-blue-500/15 text-blue-400 cursor-pointer"><Eye size={14} /></button>
                    <button onClick={() => setDeleteId(w.id)} className="p-2 rounded-lg bg-red-500/15 text-red-400 cursor-pointer"><Trash2 size={14} /></button>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm border-t border-white/8 pt-3">
                  <div>
                    <p className="text-slate-500 text-[10px] uppercase tracking-wider mb-0.5">Party</p>
                    <p className="text-white text-sm font-medium truncate">{w.partyName}</p>
                  </div>
                  <div>
                    <p className="text-slate-500 text-[10px] uppercase tracking-wider mb-0.5">Material</p>
                    <p className="text-slate-300 text-sm">{w.materialName}</p>
                  </div>
                  <div>
                    <p className="text-slate-500 text-[10px] uppercase tracking-wider mb-0.5">Net Weight</p>
                    <p className="text-white font-bold">{(w.netWeight / 1000).toFixed(3)} <span className="text-slate-500 font-normal text-xs">T</span></p>
                  </div>
                  <div>
                    <p className="text-slate-500 text-[10px] uppercase tracking-wider mb-0.5">Amount</p>
                    <p className="text-green-400 font-black text-base">₹{fmt(w.amount)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop table (hidden on mobile) */}
          <div className="hidden lg:block bg-white/3 border border-white/8 rounded-2xl overflow-hidden">
            <div className="px-5 py-3.5 border-b border-white/8">
              <h2 className="text-white font-semibold text-sm">Weighment Records ({items.length})</h2>
            </div>
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/5 text-slate-500 text-xs font-medium">
                  <th className="px-5 py-3">Slip / Vehicle</th>
                  <th className="px-5 py-3">Party</th>
                  <th className="px-5 py-3">Material</th>
                  <th className="px-5 py-3">Net Weight</th>
                  <th className="px-5 py-3">Amount</th>
                  <th className="px-5 py-3">Date</th>
                  <th className="px-5 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map(w => (
                  <tr key={w.id} className="border-b border-white/5 hover:bg-white/3 transition-colors">
                    <td className="px-5 py-4">
                      <p className="text-orange-400 font-mono text-xs">{w.slipNumber}</p>
                      <p className="text-white font-mono font-bold">{w.vehicleNumber}</p>
                    </td>
                    <td className="px-5 py-4 text-slate-300 text-sm">{w.partyName}</td>
                    <td className="px-5 py-4 text-slate-400 text-xs">{w.materialName}</td>
                    <td className="px-5 py-4">
                      <span className="text-white font-semibold">{(w.netWeight / 1000).toFixed(3)}</span>
                      <span className="text-slate-500 text-xs ml-1">T</span>
                    </td>
                    <td className="px-5 py-4 text-green-400 font-bold">₹{fmt(w.amount)}</td>
                    <td className="px-5 py-4 text-slate-500 text-xs whitespace-nowrap">{new Date(w.createdAt).toLocaleDateString('en-IN')}</td>
                    <td className="px-5 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => setViewItem(w)} className="p-2 rounded-lg bg-blue-500/15 text-blue-400 hover:bg-blue-500/25 cursor-pointer"><Eye size={14} /></button>
                        <button onClick={() => setDeleteId(w.id)} className="p-2 rounded-lg bg-red-500/15 text-red-400 hover:bg-red-500/25 cursor-pointer"><Trash2 size={14} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* ── View Slip Modal ── */}
      {viewItem && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-white text-gray-900 w-full sm:max-w-sm sm:rounded-2xl rounded-t-2xl shadow-2xl max-h-[90vh] flex flex-col">
            <div className="bg-[#0a1628] text-white rounded-t-2xl px-5 py-4 text-center">
              <p className="text-orange-400 text-[10px] font-bold uppercase tracking-widest mb-1">Weighment Slip</p>
              <h2 className="font-black text-lg">VEERA BLUE METALS</h2>
              <p className="text-slate-400 text-xs">Industrial Weighbridge Services</p>
            </div>
            <div className="px-5 py-4 space-y-2 overflow-y-auto flex-1">
              {[
                ['Slip No',   viewItem.slipNumber],
                ['Date',      new Date(viewItem.createdAt).toLocaleString('en-IN')],
                ['Vehicle',   viewItem.vehicleNumber],
                ['Driver',    viewItem.driverName || '—'],
                ['Party',     viewItem.partyName],
                ['Material',  viewItem.materialName],
                ['Gross Wt',  `${viewItem.grossWeight.toLocaleString()} kg`],
                ['Tare Wt',   `${viewItem.tareWeight.toLocaleString()} kg`],
                ['Net Wt',    `${viewItem.netWeight.toLocaleString()} kg (${(viewItem.netWeight/1000).toFixed(3)} T)`],
                ['Rate/Ton',  `₹${viewItem.ratePerTon.toLocaleString()}`],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between border-b border-gray-100 pb-1.5 last:border-0">
                  <span className="text-gray-500 text-xs">{k}</span>
                  <span className="font-semibold text-xs text-right max-w-[55%]">{v}</span>
                </div>
              ))}
              <div className="bg-orange-50 border border-orange-200 rounded-xl p-3 flex justify-between items-center mt-1">
                <span className="text-orange-700 text-xs font-bold">Total Amount</span>
                <span className="text-orange-600 font-black text-lg">₹{fmt(viewItem.amount)}</span>
              </div>
              {viewItem.remarks && <p className="text-gray-500 text-xs italic">Note: {viewItem.remarks}</p>}
            </div>
            <div className="px-5 pb-5 pt-3 flex gap-2 border-t border-gray-100">
              <button onClick={() => window.print()}
                className="flex-1 py-2.5 bg-[#0a1628] text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 cursor-pointer">
                <Printer size={13} /> Print
              </button>
              <button onClick={() => setViewItem(null)}
                className="flex-1 py-2.5 bg-slate-100 text-gray-700 font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 cursor-pointer">
                <X size={13} /> Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Delete confirm ── */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setDeleteId(null)} />
          <div className="relative bg-[#0c1a2e] border border-white/10 rounded-2xl p-6 w-full max-w-sm text-center">
            <Trash2 size={28} className="text-red-400 mx-auto mb-3" />
            <h3 className="text-white font-bold mb-1">Delete Record?</h3>
            <p className="text-slate-400 text-sm mb-5">This weighment will be permanently deleted.</p>
            <div className="flex gap-3">
              <button onClick={handleDelete} className="flex-1 py-2.5 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-xl text-sm cursor-pointer">Delete</button>
              <button onClick={() => setDeleteId(null)} className="flex-1 py-2.5 bg-white/5 border border-white/10 text-slate-300 font-semibold rounded-xl text-sm cursor-pointer">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
