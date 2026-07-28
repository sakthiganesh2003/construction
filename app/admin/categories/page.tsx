'use client';

import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, X, Check } from 'lucide-react';

type Category = { id: string; name: string; type: string; description: string; icon: string; };

const SEED: Category[] = [
  { id: '1', name: 'Weighbridge Systems', type: 'Products', description: 'Heavy-duty steel, concrete, tuff track, flexi, weigh pads, and weigh-in-motion systems', icon: '🚛' },
  { id: '2', name: 'Industrial Solutions', type: 'Solutions', description: 'Automated weighing, crusher management, intelligent terminals, silo & wheel loader solutions', icon: '⚙️' },
];

const EMPTY: Category = { id: '', name: '', type: 'Products', description: '', icon: '📦' };

export default function CategoriesAdminPage() {
  const [items, setItems] = useState<Category[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [form, setForm] = useState<Category>(EMPTY);
  const [editId, setEditId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('vbm_categories');
    setItems(stored ? JSON.parse(stored) : SEED);
    if (!stored) localStorage.setItem('vbm_categories', JSON.stringify(SEED));
  }, []);

  const save = (list: Category[]) => {
    setItems(list);
    localStorage.setItem('vbm_categories', JSON.stringify(list));
  };

  const openAdd = () => { setForm({ ...EMPTY, id: Date.now().toString() }); setEditId(null); setDrawerOpen(true); };
  const openEdit = (c: Category) => { setForm({ ...c }); setEditId(c.id); setDrawerOpen(true); };
  const closeDrawer = () => { setDrawerOpen(false); setForm(EMPTY); setEditId(null); };

  const handleSubmit = () => {
    if (!form.name.trim()) return;
    let list: Category[];
    if (editId) { list = items.map(c => c.id === editId ? form : c); }
    else { list = [...items, form]; }
    save(list);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
    closeDrawer();
  };

  const handleDelete = () => {
    if (!deleteId) return;
    save(items.filter(c => c.id !== deleteId));
    setDeleteId(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <p className="text-slate-400 text-sm">Manage product and solution categories.</p>
        <button onClick={openAdd} className="flex items-center justify-center gap-2 px-4 py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold rounded-xl transition-all hover:shadow-lg hover:shadow-orange-500/25 shrink-0">
          <Plus size={16} /> Add Category
        </button>
      </div>

      {saved && (
        <div className="flex items-center gap-2 px-4 py-3 bg-green-500/15 border border-green-500/25 rounded-xl text-green-400 text-sm">
          <Check size={16} /> Category saved!
        </div>
      )}

      <div className="grid sm:grid-cols-2 gap-4">
        {items.map(cat => (
          <div key={cat.id} className="bg-white/3 border border-white/8 rounded-2xl p-5 group hover:border-white/15 transition-all">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{cat.icon}</span>
                <div>
                  <h3 className="text-white font-bold text-base">{cat.name}</h3>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${cat.type === 'Products' ? 'bg-blue-500/15 text-blue-400' : 'bg-orange-500/15 text-orange-400'}`}>
                    {cat.type}
                  </span>
                </div>
              </div>
              <div className="flex gap-2 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity">
                <button onClick={() => openEdit(cat)} className="p-1.5 rounded-lg bg-blue-500/15 text-blue-400 hover:bg-blue-500/25 transition-all cursor-pointer"><Pencil size={14} /></button>
                <button onClick={() => setDeleteId(cat.id)} className="p-1.5 rounded-lg bg-red-500/15 text-red-400 hover:bg-red-500/25 transition-all cursor-pointer"><Trash2 size={14} /></button>
              </div>
            </div>
            <p className="text-slate-400 text-sm">{cat.description}</p>
          </div>
        ))}
      </div>

      {drawerOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="flex-1 bg-black/50 backdrop-blur-sm" onClick={closeDrawer} />
          <div className="w-full max-w-md bg-[#0c1a2e] border-l border-white/10 h-full overflow-y-auto flex flex-col">
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
              <h2 className="text-white font-bold text-base">{editId ? 'Edit Category' : 'Add Category'}</h2>
              <button onClick={closeDrawer} className="text-slate-400 hover:text-white"><X size={20} /></button>
            </div>
            <div className="flex-1 px-6 py-5 space-y-4">
              <div>
                <label className="text-slate-400 text-xs font-medium block mb-1.5">Category Name *</label>
                <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  className="w-full bg-white/5 border border-white/10 text-white text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:border-orange-500/50 transition-all" />
              </div>
              <div>
                <label className="text-slate-400 text-xs font-medium block mb-1.5">Type</label>
                <select value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))}
                  className="w-full bg-white/5 border border-white/10 text-white text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:border-orange-500/50 transition-all">
                  <option value="Products" className="bg-[#0c1a2e]">Products</option>
                  <option value="Solutions" className="bg-[#0c1a2e]">Solutions</option>
                </select>
              </div>
              <div>
                <label className="text-slate-400 text-xs font-medium block mb-1.5">Description</label>
                <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} rows={3}
                  className="w-full bg-white/5 border border-white/10 text-white text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:border-orange-500/50 transition-all resize-none" />
              </div>
              <div>
                <label className="text-slate-400 text-xs font-medium block mb-1.5">Icon (Emoji)</label>
                <input value={form.icon} onChange={e => setForm(f => ({ ...f, icon: e.target.value }))}
                  className="w-24 bg-white/5 border border-white/10 text-white text-xl text-center rounded-xl px-4 py-2.5 focus:outline-none focus:border-orange-500/50" />
              </div>
            </div>
            <div className="px-6 py-4 border-t border-white/10 flex gap-3">
              <button onClick={handleSubmit} className="flex-1 py-3 bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold rounded-xl transition-all">
                {editId ? 'Save Changes' : 'Add Category'}
              </button>
              <button onClick={closeDrawer} className="px-5 py-3 bg-white/5 border border-white/10 text-slate-300 text-sm font-semibold rounded-xl transition-all">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setDeleteId(null)} />
          <div className="relative bg-[#0c1a2e] border border-white/10 rounded-2xl p-6 w-full max-w-sm text-center">
            <Trash2 size={28} className="text-red-400 mx-auto mb-3" />
            <h3 className="text-white font-bold mb-2">Delete Category?</h3>
            <p className="text-slate-400 text-sm mb-6">This cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={handleDelete} className="flex-1 py-2.5 bg-red-500 text-white font-semibold rounded-xl text-sm">Delete</button>
              <button onClick={() => setDeleteId(null)} className="flex-1 py-2.5 bg-white/5 border border-white/10 text-slate-300 font-semibold rounded-xl text-sm">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
