'use client';

import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, Search, X, Check } from 'lucide-react';
import { products as seedProducts } from '@/data/products';

type Product = {
  id: string; name: string; model: string; categoryId: string;
  shortDescription: string; fullDescription: string;
  specs: string[]; isNew?: boolean; isBestseller?: boolean;
  imageIcon: string; imageGradient: string; imageSrc: string;
};

const EMPTY: Product = {
  id: '', name: '', model: '', categoryId: 'weighbridges',
  shortDescription: '', fullDescription: '', specs: [''],
  isNew: false, isBestseller: false,
  imageIcon: '🚛', imageGradient: 'from-navy-900 to-navy-700', imageSrc: '/weighbridge.png',
};

export default function ProductsAdminPage() {
  const [items,    setItems]    = useState<Product[]>([]);
  const [search,   setSearch]   = useState('');
  const [drawer,   setDrawer]   = useState(false);
  const [form,     setForm]     = useState<Product>(EMPTY);
  const [editId,   setEditId]   = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [saved,    setSaved]    = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('vbm_products');
    if (stored) { setItems(JSON.parse(stored)); }
    else { const s = seedProducts.filter(p => p.categoryId === 'weighbridges') as Product[]; setItems(s); localStorage.setItem('vbm_products', JSON.stringify(s)); }
  }, []);

  const save = (list: Product[]) => { setItems(list); localStorage.setItem('vbm_products', JSON.stringify(list)); };
  const openAdd  = () => { setForm({ ...EMPTY, id: Date.now().toString() }); setEditId(null); setDrawer(true); };
  const openEdit = (p: Product) => { setForm({ ...p }); setEditId(p.id); setDrawer(true); };
  const close    = () => { setDrawer(false); setEditId(null); };

  const handleSubmit = () => {
    if (!form.name.trim() || !form.model.trim()) return;
    save(editId ? items.map(p => p.id === editId ? form : p) : [...items, form]);
    setSaved(true); setTimeout(() => setSaved(false), 2000); close();
  };
  const handleDelete = () => { if (!deleteId) return; save(items.filter(p => p.id !== deleteId)); setDeleteId(null); };

  const addSpec    = () => setForm(f => ({ ...f, specs: [...f.specs, ''] }));
  const updateSpec = (i: number, v: string) => setForm(f => { const s = [...f.specs]; s[i] = v; return { ...f, specs: s }; });
  const removeSpec = (i: number) => setForm(f => ({ ...f, specs: f.specs.filter((_, idx) => idx !== i) }));

  const filtered = items.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.model.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search products..."
            className="w-full bg-white border border-slate-200 text-slate-900 text-sm rounded-xl pl-10 pr-4 py-2.5 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 shadow-xs transition-all" />
        </div>
        <button onClick={openAdd} className="flex items-center justify-center gap-2 px-4 py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold rounded-xl transition-all shadow-md shadow-orange-500/20 whitespace-nowrap cursor-pointer w-full sm:w-auto">
          <Plus size={16} /> Add Product
        </button>
      </div>

      {saved && <div className="flex items-center gap-2 px-4 py-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-sm font-semibold"><Check size={16} /> Product saved!</div>}

      {/* Data Table */}
      {filtered.length === 0 ? (
        <div className="text-center text-slate-500 py-12 text-sm bg-white rounded-2xl border border-slate-200">No products found.</div>
      ) : (
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
          <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-slate-900 font-bold text-sm">Products ({filtered.length})</h2>
            <span className="text-slate-400 text-xs font-semibold sm:hidden">← Swipe horizontally →</span>
          </div>
          <div className="overflow-x-auto w-full">
            <table className="w-full text-left min-w-[760px]">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/80 text-slate-500 text-xs font-semibold">
                  <th className="px-5 py-3.5">Product & Model</th>
                  <th className="px-5 py-3.5">Description</th>
                  <th className="px-5 py-3.5">Status Badges</th>
                  <th className="px-5 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((p, i) => (
                  <tr key={p.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{p.imageIcon}</span>
                        <div>
                          <p className="text-slate-900 font-bold text-sm leading-tight">{p.name}</p>
                          <p className="text-orange-600 font-mono text-xs font-semibold mt-0.5">{p.model}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-slate-600 text-xs font-medium max-w-xs truncate">{p.shortDescription || '—'}</td>
                    <td className="px-5 py-4">
                      <div className="flex gap-1.5 flex-wrap">
                        {p.isBestseller && <span className="px-2.5 py-0.5 bg-amber-100 border border-amber-200 text-amber-800 text-[10px] font-bold rounded-full">Bestseller</span>}
                        {p.isNew && <span className="px-2.5 py-0.5 bg-emerald-100 border border-emerald-200 text-emerald-800 text-[10px] font-bold rounded-full">New</span>}
                        {!p.isBestseller && !p.isNew && <span className="px-2.5 py-0.5 bg-slate-100 border border-slate-200 text-slate-500 text-[10px] font-semibold rounded-full">Standard</span>}
                      </div>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => openEdit(p)} className="p-1.5 rounded-lg bg-sky-50 text-sky-600 border border-sky-100 hover:bg-sky-100 cursor-pointer" title="Edit"><Pencil size={14}/></button>
                        <button onClick={() => setDeleteId(p.id)} className="p-1.5 rounded-lg bg-red-50 text-red-600 border border-red-100 hover:bg-red-100 cursor-pointer" title="Delete"><Trash2 size={14}/></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Drawer */}
      {drawer && (
        <div className="fixed inset-0 z-50 flex">
          <div className="flex-1 bg-slate-900/40 backdrop-blur-xs" onClick={close} />
          <div className="w-full max-w-sm bg-white border-l border-slate-200 h-full flex flex-col shadow-2xl">
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
              <h2 className="text-slate-900 font-bold text-base">{editId ? 'Edit Product' : 'Add Product'}</h2>
              <button onClick={close} className="text-slate-400 hover:text-slate-700 cursor-pointer"><X size={20}/></button>
            </div>
            <div className="flex-1 px-5 py-5 space-y-4 overflow-y-auto">
              {[
                { label: 'Product Name *',   field: 'name',             ph: 'e.g. Steel Weighbridge',  ta: false },
                { label: 'Model Number *',   field: 'model',            ph: 'e.g. SWB-120T',           ta: false },
                { label: 'Short Description',field: 'shortDescription', ph: 'One-line summary',         ta: true  },
                { label: 'Full Description', field: 'fullDescription',  ph: 'Detailed description',     ta: true  },
              ].map(({ label, field, ph, ta }) => (
                <div key={field}>
                  <label className="text-slate-700 text-xs font-semibold block mb-1.5">{label}</label>
                  {ta
                    ? <textarea value={(form as any)[field]} onChange={e => setForm(f => ({ ...f, [field]: e.target.value }))} rows={3} placeholder={ph}
                        className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all resize-none" />
                    : <input value={(form as any)[field]} onChange={e => setForm(f => ({ ...f, [field]: e.target.value }))} placeholder={ph}
                        className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all" />
                  }
                </div>
              ))}
              <div>
                <label className="text-slate-700 text-xs font-semibold block mb-2">Specifications</label>
                <div className="space-y-2">
                  {form.specs.map((s, i) => (
                    <div key={i} className="flex gap-2">
                      <input value={s} onChange={e => updateSpec(i, e.target.value)}
                        className="flex-1 bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-xl px-3.5 py-2 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all" placeholder={`Spec ${i + 1}`} />
                      <button onClick={() => removeSpec(i)} className="text-red-500 p-2 cursor-pointer hover:bg-red-50 rounded-lg"><X size={15}/></button>
                    </div>
                  ))}
                  <button onClick={addSpec} className="flex items-center gap-1.5 text-orange-600 text-xs font-semibold cursor-pointer"><Plus size={14}/> Add Spec</button>
                </div>
              </div>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={!!form.isNew} onChange={e => setForm(f => ({ ...f, isNew: e.target.checked }))} className="w-4 h-4 accent-orange-500" />
                  <span className="text-slate-700 text-sm font-medium">New Arrival</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={!!form.isBestseller} onChange={e => setForm(f => ({ ...f, isBestseller: e.target.checked }))} className="w-4 h-4 accent-orange-500" />
                  <span className="text-slate-700 text-sm font-medium">Bestseller</span>
                </label>
              </div>
              <div>
                <label className="text-slate-700 text-xs font-semibold block mb-1.5">Icon (Emoji)</label>
                <input value={form.imageIcon} onChange={e => setForm(f => ({ ...f, imageIcon: e.target.value }))}
                  className="w-20 bg-slate-50 border border-slate-200 text-slate-900 text-xl text-center rounded-xl px-3 py-2.5 focus:outline-none focus:border-orange-500" placeholder="🚛" />
              </div>
            </div>
            <div className="px-5 py-4 border-t border-slate-100 flex gap-3">
              <button onClick={handleSubmit} className="flex-1 py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold rounded-xl cursor-pointer transition-all shadow-xs">
                {editId ? 'Save Changes' : 'Add Product'}
              </button>
              <button onClick={close} className="px-4 py-2.5 bg-slate-100 border border-slate-200 text-slate-700 text-sm font-semibold rounded-xl cursor-pointer hover:bg-slate-200">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs" onClick={() => setDeleteId(null)} />
          <div className="relative bg-white border border-slate-200 rounded-2xl p-6 w-full max-w-sm text-center shadow-2xl">
            <Trash2 size={28} className="text-red-500 mx-auto mb-3" />
            <h3 className="text-slate-900 font-bold text-base mb-1">Delete Product?</h3>
            <p className="text-slate-500 text-sm mb-5">This cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={handleDelete} className="flex-1 py-2.5 bg-red-600 text-white font-semibold rounded-xl text-sm cursor-pointer hover:bg-red-700">Delete</button>
              <button onClick={() => setDeleteId(null)} className="flex-1 py-2.5 bg-slate-100 border border-slate-200 text-slate-700 font-semibold rounded-xl text-sm cursor-pointer hover:bg-slate-200">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
