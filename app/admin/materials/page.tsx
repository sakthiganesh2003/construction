'use client';

import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, X, Check } from 'lucide-react';

type Material = { id: string; name: string; unit: string; ratePerTon: number; isActive: boolean; };
const EMPTY: Omit<Material, 'id' | 'isActive'> = { name: '', unit: 'Ton', ratePerTon: 0 };

export default function MaterialsAdminPage() {
  const [items,    setItems]    = useState<Material[]>([]);
  const [drawerOpen, setDrawer] = useState(false);
  const [form,     setForm]     = useState<Omit<Material,'id'|'isActive'>>(EMPTY);
  const [editId,   setEditId]   = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [saved,    setSaved]    = useState(false);
  const [loading,  setLoading]  = useState(true);

  const fetch_ = () => fetch('/api/materials').then(r => r.json()).then(d => { setItems(d); setLoading(false); });
  useEffect(() => { fetch_(); }, []);

  const openAdd  = () => { setForm(EMPTY); setEditId(null); setDrawer(true); };
  const openEdit = (m: Material) => { setForm({ name: m.name, unit: m.unit, ratePerTon: m.ratePerTon }); setEditId(m.id); setDrawer(true); };
  const close    = () => { setDrawer(false); setEditId(null); };

  const handleSubmit = async () => {
    if (!form.name.trim() || !form.ratePerTon) return;
    if (editId) {
      await fetch(`/api/materials/${editId}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
    } else {
      await fetch('/api/materials', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...form, isActive: true }) });
    }
    setSaved(true); setTimeout(() => setSaved(false), 2000);
    close(); fetch_();
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    await fetch(`/api/materials/${deleteId}`, { method: 'DELETE' });
    setDeleteId(null); fetch_();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <p className="text-slate-500 text-sm">Manage materials and their rates per ton for weighment calculations.</p>
        <button onClick={openAdd} className="flex items-center justify-center gap-2 px-4 py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold rounded-xl transition-all shadow-md shadow-orange-500/20 shrink-0 cursor-pointer">
          <Plus size={16} /> Add Material
        </button>
      </div>

      {saved && <div className="flex items-center gap-2 px-4 py-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-sm font-semibold"><Check size={16}/> Material saved!</div>}

      {/* Data Table */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-slate-900 font-bold text-sm">Materials List ({items.length})</h2>
          <span className="text-slate-400 text-xs font-semibold sm:hidden">← Swipe horizontally →</span>
        </div>
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left min-w-[640px]">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/80 text-slate-500 text-xs font-semibold">
                <th className="px-5 py-3.5">Material Name</th>
                <th className="px-5 py-3.5">Unit</th>
                <th className="px-5 py-3.5">Rate / Ton</th>
                <th className="px-5 py-3.5">Status</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-5 py-8 text-center text-slate-500 text-sm">Loading materials...</td>
                </tr>
              ) : items.map(m => (
                <tr key={m.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="px-5 py-4 text-slate-900 font-bold text-sm">{m.name}</td>
                  <td className="px-5 py-4 text-slate-600 text-xs font-medium">{m.unit}</td>
                  <td className="px-5 py-4 text-orange-600 font-black text-base">₹{m.ratePerTon.toLocaleString()}</td>
                  <td className="px-5 py-4">
                    {m.isActive ? (
                      <span className="text-xs font-semibold px-2.5 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200/80 rounded-full">Active</span>
                    ) : (
                      <span className="text-xs font-semibold px-2.5 py-0.5 bg-red-50 text-red-700 border border-red-200/80 rounded-full">Inactive</span>
                    )}
                  </td>
                  <td className="px-5 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => openEdit(m)} className="p-1.5 rounded-lg bg-sky-50 text-sky-600 border border-sky-100 hover:bg-sky-100 cursor-pointer" title="Edit"><Pencil size={14}/></button>
                      <button onClick={() => setDeleteId(m.id)} className="p-1.5 rounded-lg bg-red-50 text-red-600 border border-red-100 hover:bg-red-100 cursor-pointer" title="Delete"><Trash2 size={14}/></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="flex-1 bg-slate-900/40 backdrop-blur-xs" onClick={close} />
          <div className="w-full max-w-md bg-white border-l border-slate-200 h-full overflow-y-auto flex flex-col shadow-2xl">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <h2 className="text-slate-900 font-bold text-base">{editId ? 'Edit Material' : 'Add Material'}</h2>
              <button onClick={close} className="text-slate-400 hover:text-slate-700 cursor-pointer"><X size={20}/></button>
            </div>
            <div className="flex-1 px-6 py-5 space-y-4">
              <div>
                <label className="text-slate-700 text-xs font-semibold block mb-1.5">Material Name *</label>
                <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  placeholder="e.g. River Sand"
                  className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all" />
              </div>
              <div>
                <label className="text-slate-700 text-xs font-semibold block mb-1.5">Unit</label>
                <select value={form.unit} onChange={e => setForm(f => ({ ...f, unit: e.target.value }))}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all cursor-pointer">
                  <option value="Ton">Ton</option>
                  <option value="KG">KG</option>
                </select>
              </div>
              <div>
                <label className="text-slate-700 text-xs font-semibold block mb-1.5">Rate per Ton (₹) *</label>
                <input type="number" value={form.ratePerTon || ''} onChange={e => setForm(f => ({ ...f, ratePerTon: parseFloat(e.target.value) || 0 }))}
                  placeholder="e.g. 1500"
                  className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all" />
              </div>
            </div>
            <div className="px-6 py-4 border-t border-slate-100 flex gap-3">
              <button onClick={handleSubmit} className="flex-1 py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold rounded-xl cursor-pointer transition-all shadow-xs">
                {editId ? 'Save Changes' : 'Add Material'}
              </button>
              <button onClick={close} className="px-5 py-2.5 bg-slate-100 border border-slate-200 text-slate-700 text-sm font-semibold rounded-xl cursor-pointer hover:bg-slate-200">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs" onClick={() => setDeleteId(null)} />
          <div className="relative bg-white border border-slate-200 rounded-2xl p-6 w-full max-w-sm text-center shadow-2xl">
            <Trash2 size={28} className="text-red-500 mx-auto mb-3" />
            <h3 className="text-slate-900 font-bold text-base mb-2">Remove Material?</h3>
            <p className="text-slate-500 text-sm mb-6">It will be marked inactive.</p>
            <div className="flex gap-3">
              <button onClick={handleDelete} className="flex-1 py-2.5 bg-red-600 text-white font-semibold rounded-xl text-sm cursor-pointer hover:bg-red-700">Remove</button>
              <button onClick={() => setDeleteId(null)} className="flex-1 py-2.5 bg-slate-100 border border-slate-200 text-slate-700 font-semibold rounded-xl text-sm cursor-pointer hover:bg-slate-200">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
