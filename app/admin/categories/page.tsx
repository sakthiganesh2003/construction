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
        <p className="text-slate-500 text-sm">Manage product and solution categories.</p>
        <button onClick={openAdd} className="flex items-center justify-center gap-2 px-4 py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold rounded-xl transition-all shadow-md shadow-orange-500/20 shrink-0 cursor-pointer">
          <Plus size={16} /> Add Category
        </button>
      </div>

      {saved && (
        <div className="flex items-center gap-2 px-4 py-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-sm font-semibold">
          <Check size={16} /> Category saved!
        </div>
      )}

      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-slate-900 font-bold text-sm">Categories ({items.length})</h2>
          <span className="text-slate-400 text-xs font-semibold sm:hidden">← Swipe horizontally →</span>
        </div>
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left min-w-[640px]">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/80 text-slate-500 text-xs font-semibold">
                <th className="px-5 py-3.5">Icon & Name</th>
                <th className="px-5 py-3.5">Type</th>
                <th className="px-5 py-3.5">Description</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {items.map(cat => (
                <tr key={cat.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{cat.icon}</span>
                      <span className="text-slate-900 font-bold text-sm">{cat.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full inline-block ${cat.type === 'Products' ? 'bg-sky-50 text-sky-700 border border-sky-200/80' : 'bg-orange-50 text-orange-700 border border-orange-200/80'}`}>
                      {cat.type}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-slate-600 text-xs font-medium max-w-xs truncate">{cat.description}</td>
                  <td className="px-5 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => openEdit(cat)} className="p-1.5 rounded-lg bg-sky-50 text-sky-600 border border-sky-100 hover:bg-sky-100 transition-all cursor-pointer" title="Edit"><Pencil size={14} /></button>
                      <button onClick={() => setDeleteId(cat.id)} className="p-1.5 rounded-lg bg-red-50 text-red-600 border border-red-100 hover:bg-red-100 transition-all cursor-pointer" title="Delete"><Trash2 size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {drawerOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="flex-1 bg-slate-900/40 backdrop-blur-xs" onClick={closeDrawer} />
          <div className="w-full max-w-md bg-white border-l border-slate-200 h-full overflow-y-auto flex flex-col shadow-2xl">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <h2 className="text-slate-900 font-bold text-base">{editId ? 'Edit Category' : 'Add Category'}</h2>
              <button onClick={closeDrawer} className="text-slate-400 hover:text-slate-700 cursor-pointer"><X size={20} /></button>
            </div>
            <div className="flex-1 px-6 py-5 space-y-4">
              <div>
                <label className="text-slate-700 text-xs font-semibold block mb-1.5">Category Name *</label>
                <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all" />
              </div>
              <div>
                <label className="text-slate-700 text-xs font-semibold block mb-1.5">Type</label>
                <select value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all cursor-pointer">
                  <option value="Products">Products</option>
                  <option value="Solutions">Solutions</option>
                </select>
              </div>
              <div>
                <label className="text-slate-700 text-xs font-semibold block mb-1.5">Description</label>
                <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} rows={3}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all resize-none" />
              </div>
              <div>
                <label className="text-slate-700 text-xs font-semibold block mb-1.5">Icon (Emoji)</label>
                <input value={form.icon} onChange={e => setForm(f => ({ ...f, icon: e.target.value }))}
                  className="w-24 bg-slate-50 border border-slate-200 text-slate-900 text-xl text-center rounded-xl px-4 py-2.5 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20" />
              </div>
            </div>
            <div className="px-6 py-4 border-t border-slate-100 flex gap-3">
              <button onClick={handleSubmit} className="flex-1 py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold rounded-xl transition-all shadow-xs cursor-pointer">
                {editId ? 'Save Changes' : 'Add Category'}
              </button>
              <button onClick={closeDrawer} className="px-5 py-2.5 bg-slate-100 border border-slate-200 text-slate-700 text-sm font-semibold rounded-xl transition-all hover:bg-slate-200 cursor-pointer">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs" onClick={() => setDeleteId(null)} />
          <div className="relative bg-white border border-slate-200 rounded-2xl p-6 w-full max-w-sm text-center shadow-2xl">
            <Trash2 size={28} className="text-red-500 mx-auto mb-3" />
            <h3 className="text-slate-900 font-bold text-base mb-2">Delete Category?</h3>
            <p className="text-slate-500 text-sm mb-6">This cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={handleDelete} className="flex-1 py-2.5 bg-red-600 text-white font-semibold rounded-xl text-sm hover:bg-red-700 cursor-pointer">Delete</button>
              <button onClick={() => setDeleteId(null)} className="flex-1 py-2.5 bg-slate-100 border border-slate-200 text-slate-700 font-semibold rounded-xl text-sm hover:bg-slate-200 cursor-pointer">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
