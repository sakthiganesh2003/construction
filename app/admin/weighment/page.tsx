'use client';

import { useEffect, useState } from 'react';
import { LayoutGrid, Table, Search, Printer, Trash2, Eye, X, RefreshCw, Plus } from 'lucide-react';
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
  const [viewMode, setViewMode] = useState<'auto' | 'card' | 'table'>('auto');
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
    <div className="space-y-3.5 sm:space-y-5 relative">
      {/* ── Sticky Toolbar & Search ── */}
      <div className="sticky top-[56px] sm:top-[64px] z-20 bg-[#f8fafc]/95 backdrop-blur-md pt-0.5 pb-2 -mt-1 space-y-2">
        {/* Search bar + New Entry button */}
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search vehicle, party, slip..."
              className="w-full bg-white border border-slate-200 text-slate-900 text-xs sm:text-sm rounded-xl pl-9 pr-3.5 py-2 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 shadow-xs transition-all" />
          </div>
          <Link href="/admin/weighment/new"
            className="flex items-center gap-1.5 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-xs sm:text-sm font-semibold rounded-xl transition-all shadow-md shadow-orange-500/20 whitespace-nowrap shrink-0">
            <Plus size={15} /> New Entry
          </Link>
        </div>

        {/* Filters */}
        <div className="flex gap-2 items-center">
          <input type="date" value={date} onChange={e => setDate(e.target.value)}
            className="bg-white border border-slate-200 text-slate-800 text-xs rounded-xl px-3 py-1.5 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 shadow-xs transition-all flex-1 min-w-[120px]" />
          <select value={mat} onChange={e => setMat(e.target.value)}
            className="bg-white border border-slate-200 text-slate-800 text-xs rounded-xl px-3 py-1.5 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 shadow-xs transition-all flex-1 min-w-[110px] cursor-pointer">
            <option value="">All Materials</option>
            {mats.map(m => <option key={m} value={m}>{m}</option>)}
          </select>
          <button onClick={fetchData}
            className="p-1.5 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-all cursor-pointer shrink-0 shadow-xs"
            title="Refresh">
            <RefreshCw size={14} />
          </button>
        </div>
      </div>

      {/* ── Summary stats ── */}
      <div className="grid grid-cols-3 gap-2 sm:gap-3">
        {[
          { label: 'Records', value: String(items.length), sub: 'total entries' },
          { label: 'Tonnage', value: totalTon.toFixed(2),  sub: 'metric tons' },
          { label: 'Revenue', value: `₹${fmt(totalAmt)}`,  sub: 'total INR' },
        ].map(({ label, value, sub }) => (
          <div key={label} className="bg-white border border-slate-200 rounded-2xl p-2.5 sm:p-4 text-center shadow-xs">
            <p className="text-slate-900 font-black text-base sm:text-xl leading-tight">{value}</p>
            <p className="text-slate-400 text-[9px] sm:text-xs mt-0.5">{sub}</p>
            <p className="text-orange-600 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      {/* ── Data Table ── */}
      {loading ? (
        <div className="text-center text-slate-500 py-12 text-sm bg-white rounded-2xl border border-slate-200">Loading records...</div>
      ) : items.length === 0 ? (
        <div className="text-center text-slate-500 py-12 text-sm bg-white rounded-2xl border border-slate-200">No weighment records found.</div>
      ) : (
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
          <div className="px-4 py-3.5 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-slate-900 font-bold text-sm">Weighment Records ({items.length})</h2>
            <span className="text-slate-400 text-xs font-semibold sm:hidden">← Swipe horizontally →</span>
          </div>
          <div className="overflow-x-auto w-full">
            <table className="w-full text-left min-w-[760px]">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/80 text-slate-500 text-xs font-semibold">
                  <th className="px-5 py-3.5">Slip / Vehicle</th>
                  <th className="px-5 py-3.5">Party</th>
                  <th className="px-5 py-3.5">Material</th>
                  <th className="px-5 py-3.5">Net Weight</th>
                  <th className="px-5 py-3.5">Amount</th>
                  <th className="px-5 py-3.5">Date</th>
                  <th className="px-5 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {items.map(w => (
                  <tr key={w.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="px-5 py-4">
                      <p className="text-orange-600 font-mono text-xs font-bold">{w.slipNumber}</p>
                      <p className="text-slate-900 font-mono font-black">{w.vehicleNumber}</p>
                    </td>
                    <td className="px-5 py-4 text-slate-800 text-sm font-semibold">{w.partyName}</td>
                    <td className="px-5 py-4 text-slate-600 text-xs font-medium">{w.materialName}</td>
                    <td className="px-5 py-4">
                      <span className="text-slate-900 font-bold">{(w.netWeight / 1000).toFixed(3)}</span>
                      <span className="text-slate-400 text-xs ml-1 font-normal">T</span>
                    </td>
                    <td className="px-5 py-4 text-emerald-600 font-bold">₹{fmt(w.amount)}</td>
                    <td className="px-5 py-4 text-slate-400 text-xs whitespace-nowrap">{new Date(w.createdAt).toLocaleDateString('en-IN')}</td>
                    <td className="px-5 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => setViewItem(w)} className="p-1.5 rounded-lg bg-sky-50 text-sky-600 border border-sky-100 hover:bg-sky-100 cursor-pointer" title="View Slip"><Eye size={14} /></button>
                        <button onClick={() => setDeleteId(w.id)} className="p-1.5 rounded-lg bg-red-50 text-red-600 border border-red-100 hover:bg-red-100 cursor-pointer" title="Delete"><Trash2 size={14} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── View Slip Modal ── */}
      {viewItem && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="bg-white text-slate-900 w-full sm:max-w-sm sm:rounded-2xl rounded-t-2xl shadow-2xl max-h-[90vh] flex flex-col">
            <div className="bg-[#1F2937] text-white rounded-t-2xl px-5 py-4 text-center">
              <p className="text-orange-400 text-[10px] font-bold uppercase tracking-widest mb-1">Weighment Slip</p>
              <h2 className="font-black text-lg">VEERA BLUE METALS</h2>
              <p className="text-slate-300 text-xs">Industrial Weighbridge Services</p>
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
                <div key={k} className="flex justify-between border-b border-slate-100 pb-1.5 last:border-0">
                  <span className="text-slate-500 text-xs font-medium">{k}</span>
                  <span className="font-bold text-xs text-right max-w-[55%] text-slate-800">{v}</span>
                </div>
              ))}
              <div className="bg-orange-50 border border-orange-200 rounded-xl p-3 flex justify-between items-center mt-1">
                <span className="text-orange-700 text-xs font-bold">Total Amount</span>
                <span className="text-orange-600 font-black text-lg">₹{fmt(viewItem.amount)}</span>
              </div>
              {viewItem.remarks && <p className="text-slate-500 text-xs italic">Note: {viewItem.remarks}</p>}
            </div>
            <div className="px-5 pb-5 pt-3 flex gap-2 border-t border-slate-100">
              <button onClick={() => window.print()}
                className="flex-1 py-2.5 bg-[#1F2937] text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-xs">
                <Printer size={14} /> Print
              </button>
              <button onClick={() => setViewItem(null)}
                className="flex-1 py-2.5 bg-slate-100 text-slate-700 font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 cursor-pointer hover:bg-slate-200">
                <X size={14} /> Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Delete confirm ── */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs" onClick={() => setDeleteId(null)} />
          <div className="relative bg-white border border-slate-200 rounded-2xl p-6 w-full max-w-sm text-center shadow-2xl">
            <Trash2 size={28} className="text-red-500 mx-auto mb-3" />
            <h3 className="text-slate-900 font-bold text-base mb-1">Delete Record?</h3>
            <p className="text-slate-500 text-sm mb-5">This weighment will be permanently deleted.</p>
            <div className="flex gap-3">
              <button onClick={handleDelete} className="flex-1 py-2.5 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl text-sm cursor-pointer">Delete</button>
              <button onClick={() => setDeleteId(null)} className="flex-1 py-2.5 bg-slate-100 border border-slate-200 text-slate-700 font-semibold rounded-xl text-sm cursor-pointer hover:bg-slate-200">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
