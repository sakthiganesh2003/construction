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
        <p className="text-slate-400 text-sm">Manage materials and their rates per ton for weighment calculations.</p>
        <button onClick={openAdd} className="flex items-center justify-center gap-2 px-4 py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold rounded-xl transition-all hover:shadow-lg hover:shadow-orange-500/25 shrink-0 cursor-pointer">
          <Plus size={16} /> Add Material
        </button>
      </div>

      {saved && <div className="flex items-center gap-2 px-4 py-3 bg-green-500/15 border border-green-500/25 rounded-xl text-green-400 text-sm"><Check size={16}/> Material saved!</div>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? (
          <p className="text-slate-500 text-sm col-span-full py-8 text-center">Loading materials...</p>
        ) : items.map(m => (
          <div key={m.id} className={`bg-white/3 border rounded-2xl p-5 group hover:border-white/15 transition-all ${m.isActive ? 'border-white/8' : 'border-white/4 opacity-50'}`}>
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="text-white font-bold">{m.name}</h3>
                <p className="text-slate-500 text-xs">Per {m.unit}</p>
              </div>
              <div className="flex gap-1.5 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity">
                <button onClick={() => openEdit(m)} className="p-2 rounded-lg bg-blue-500/15 text-blue-400 hover:bg-blue-500/25 cursor-pointer" title="Edit"><Pencil size={14}/></button>
                <button onClick={() => setDeleteId(m.id)} className="p-2 rounded-lg bg-red-500/15 text-red-400 hover:bg-red-500/25 cursor-pointer" title="Delete"><Trash2 size={14}/></button>
              </div>
            </div>
            <p className="text-orange-400 font-black text-2xl">₹{m.ratePerTon.toLocaleString()}</p>
            <p className="text-slate-600 text-xs mt-0.5">per ton</p>
            {!m.isActive && <span className="mt-2 inline-block text-xs px-2 py-0.5 bg-red-500/10 border border-red-500/20 text-red-400 rounded-full">Inactive</span>}
          </div>
        ))}
      </div>

      {/* Drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="flex-1 bg-black/50 backdrop-blur-sm" onClick={close} />
          <div className="w-full max-w-md bg-[#0c1a2e] border-l border-white/10 h-full overflow-y-auto flex flex-col">
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
              <h2 className="text-white font-bold">{editId ? 'Edit Material' : 'Add Material'}</h2>
              <button onClick={close} className="text-slate-400 hover:text-white cursor-pointer"><X size={20}/></button>
            </div>
            <div className="flex-1 px-6 py-5 space-y-4">
              <div>
                <label className="text-slate-400 text-xs font-medium block mb-1.5">Material Name *</label>
                <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  placeholder="e.g. River Sand"
                  className="w-full bg-white/5 border border-white/10 text-white text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:border-orange-500/50 transition-all" />
              </div>
              <div>
                <label className="text-slate-400 text-xs font-medium block mb-1.5">Unit</label>
                <select value={form.unit} onChange={e => setForm(f => ({ ...f, unit: e.target.value }))}
                  className="w-full bg-white/5 border border-white/10 text-white text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:border-orange-500/50 transition-all cursor-pointer">
                  <option value="Ton" className="bg-[#0c1a2e]">Ton</option>
                  <option value="KG"  className="bg-[#0c1a2e]">KG</option>
                </select>
              </div>
              <div>
                <label className="text-slate-400 text-xs font-medium block mb-1.5">Rate per Ton (₹) *</label>
                <input type="number" value={form.ratePerTon || ''} onChange={e => setForm(f => ({ ...f, ratePerTon: parseFloat(e.target.value) || 0 }))}
                  placeholder="e.g. 1500"
                  className="w-full bg-white/5 border border-white/10 text-white text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:border-orange-500/50 transition-all" />
              </div>
            </div>
            <div className="px-6 py-4 border-t border-white/10 flex gap-3">
              <button onClick={handleSubmit} className="flex-1 py-3 bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold rounded-xl transition-all cursor-pointer">
                {editId ? 'Save Changes' : 'Add Material'}
              </button>
              <button onClick={close} className="px-5 py-3 bg-white/5 border border-white/10 text-slate-300 text-sm font-semibold rounded-xl cursor-pointer">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setDeleteId(null)} />
          <div className="relative bg-[#0c1a2e] border border-white/10 rounded-2xl p-6 w-full max-w-sm text-center">
            <Trash2 size={28} className="text-red-400 mx-auto mb-3" />
            <h3 className="text-white font-bold mb-2">Remove Material?</h3>
            <p className="text-slate-400 text-sm mb-6">It will be marked inactive.</p>
            <div className="flex gap-3">
              <button onClick={handleDelete} className="flex-1 py-2.5 bg-red-500 text-white font-semibold rounded-xl text-sm cursor-pointer">Remove</button>
              <button onClick={() => setDeleteId(null)} className="flex-1 py-2.5 bg-white/5 border border-white/10 text-slate-300 font-semibold rounded-xl text-sm cursor-pointer">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
