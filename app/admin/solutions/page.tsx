'use client';

import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, Search, X, Check } from 'lucide-react';
import { products as seedProducts } from '@/data/products';

type Solution = {
  id: string; name: string; model: string; categoryId: string;
  shortDescription: string; fullDescription: string;
  specs: string[]; isNew?: boolean; isBestseller?: boolean;
  imageIcon: string; imageGradient: string; imageSrc: string;
};

const EMPTY: Solution = {
  id: '', name: '', model: '', categoryId: 'solutions',
  shortDescription: '', fullDescription: '', specs: [''],
  isNew: false, isBestseller: false,
  imageIcon: '⚙️', imageGradient: 'from-navy-900 to-navy-700', imageSrc: '/crane-scale.png',
};

export default function SolutionsAdminPage() {
  const [items,    setItems]    = useState<Solution[]>([]);
  const [search,   setSearch]   = useState('');
  const [drawer,   setDrawer]   = useState(false);
  const [form,     setForm]     = useState<Solution>(EMPTY);
  const [editId,   setEditId]   = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [saved,    setSaved]    = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('vbm_solutions');
    if (stored) { setItems(JSON.parse(stored)); }
    else { const s = seedProducts.filter(p => p.categoryId === 'solutions') as Solution[]; setItems(s); localStorage.setItem('vbm_solutions', JSON.stringify(s)); }
  }, []);

  const save = (list: Solution[]) => { setItems(list); localStorage.setItem('vbm_solutions', JSON.stringify(list)); };
  const openAdd  = () => { setForm({ ...EMPTY, id: Date.now().toString() }); setEditId(null); setDrawer(true); };
  const openEdit = (s: Solution) => { setForm({ ...s }); setEditId(s.id); setDrawer(true); };
  const close    = () => { setDrawer(false); setEditId(null); };

  const handleSubmit = () => {
    if (!form.name.trim() || !form.model.trim()) return;
    save(editId ? items.map(s => s.id === editId ? form : s) : [...items, form]);
    setSaved(true); setTimeout(() => setSaved(false), 2000); close();
  };
  const handleDelete = () => { if (!deleteId) return; save(items.filter(s => s.id !== deleteId)); setDeleteId(null); };

  const addSpec    = () => setForm(f => ({ ...f, specs: [...f.specs, ''] }));
  const updateSpec = (i: number, v: string) => setForm(f => { const s = [...f.specs]; s[i] = v; return { ...f, specs: s }; });
  const removeSpec = (i: number) => setForm(f => ({ ...f, specs: f.specs.filter((_, idx) => idx !== i) }));

  const filtered = items.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.model.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <div className="relative flex-1">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search solutions..."
            className="w-full bg-white/5 border border-white/10 text-slate-300 text-sm rounded-xl pl-9 pr-4 py-2.5 focus:outline-none focus:border-orange-500/50 transition-all" />
        </div>
        <button onClick={openAdd} className="flex items-center justify-center gap-2 px-4 py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold rounded-xl transition-all hover:shadow-lg hover:shadow-orange-500/25 whitespace-nowrap cursor-pointer w-full sm:w-auto">
          <Plus size={16} /> Add Solution
        </button>
      </div>

      {saved && <div className="flex items-center gap-2 px-4 py-3 bg-green-500/15 border border-green-500/25 rounded-xl text-green-400 text-sm"><Check size={16} /> Solution saved!</div>}

      {filtered.length === 0 ? (
        <div className="text-center text-slate-500 py-12 text-sm">No solutions found.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((s, i) => (
            <div key={s.id} className="bg-white/3 border border-white/8 rounded-2xl p-4 hover:border-white/15 transition-all">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{s.imageIcon}</span>
                  <div className="min-w-0">
                    <p className="text-white font-bold text-sm leading-tight truncate">{s.name}</p>
                    <p className="text-orange-400 font-mono text-xs mt-0.5">{s.model}</p>
                  </div>
                </div>
                <div className="flex gap-1.5 shrink-0 ml-2">
                  <button onClick={() => openEdit(s)} className="p-2 rounded-lg bg-blue-500/15 text-blue-400 hover:bg-blue-500/25 cursor-pointer"><Pencil size={13}/></button>
                  <button onClick={() => setDeleteId(s.id)} className="p-2 rounded-lg bg-red-500/15 text-red-400 hover:bg-red-500/25 cursor-pointer"><Trash2 size={13}/></button>
                </div>
              </div>
              <p className="text-slate-400 text-xs leading-relaxed line-clamp-2 mb-3">{s.shortDescription || 'No description.'}</p>
              <div className="flex gap-1.5 flex-wrap">
                {s.isBestseller && <span className="px-2 py-0.5 bg-amber-500/15 border border-amber-500/25 text-amber-400 text-[10px] font-bold rounded-full">Bestseller</span>}
                {s.isNew && <span className="px-2 py-0.5 bg-green-500/15 border border-green-500/25 text-green-400 text-[10px] font-bold rounded-full">New</span>}
                <span className="px-2 py-0.5 bg-white/5 border border-white/8 text-slate-500 text-[10px] rounded-full">#{i + 1}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {drawer && (
        <div className="fixed inset-0 z-50 flex">
          <div className="flex-1 bg-black/60 backdrop-blur-sm" onClick={close} />
          <div className="w-full max-w-sm bg-[#0c1a2e] border-l border-white/10 h-full flex flex-col">
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
              <h2 className="text-white font-bold">{editId ? 'Edit Solution' : 'Add Solution'}</h2>
              <button onClick={close} className="text-slate-400 hover:text-white cursor-pointer"><X size={20}/></button>
            </div>
            <div className="flex-1 px-5 py-5 space-y-4 overflow-y-auto">
              {[
                { label: 'Solution Name *',  field: 'name',             ph: 'e.g. Auto Weighing Solution', ta: false },
                { label: 'Model / Code *',   field: 'model',            ph: 'e.g. AWS-Smart',              ta: false },
                { label: 'Short Description',field: 'shortDescription', ph: 'One-line summary',             ta: true  },
                { label: 'Full Description', field: 'fullDescription',  ph: 'Detailed description',         ta: true  },
              ].map(({ label, field, ph, ta }) => (
                <div key={field}>
                  <label className="text-slate-400 text-xs font-medium block mb-1.5">{label}</label>
                  {ta
                    ? <textarea value={(form as any)[field]} onChange={e => setForm(f => ({ ...f, [field]: e.target.value }))} rows={3} placeholder={ph}
                        className="w-full bg-white/5 border border-white/10 text-white text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-orange-500/50 transition-all resize-none" />
                    : <input value={(form as any)[field]} onChange={e => setForm(f => ({ ...f, [field]: e.target.value }))} placeholder={ph}
                        className="w-full bg-white/5 border border-white/10 text-white text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-orange-500/50 transition-all" />
                  }
                </div>
              ))}
              <div>
                <label className="text-slate-400 text-xs font-medium block mb-2">Specifications</label>
                <div className="space-y-2">
                  {form.specs.map((spec, i) => (
                    <div key={i} className="flex gap-2">
                      <input value={spec} onChange={e => updateSpec(i, e.target.value)}
                        className="flex-1 bg-white/5 border border-white/10 text-white text-sm rounded-xl px-3 py-2 focus:outline-none focus:border-orange-500/50 transition-all" placeholder={`Spec ${i + 1}`} />
                      <button onClick={() => removeSpec(i)} className="text-red-400 p-2 cursor-pointer"><X size={14}/></button>
                    </div>
                  ))}
                  <button onClick={addSpec} className="flex items-center gap-1.5 text-orange-400 text-xs font-medium cursor-pointer"><Plus size={13}/> Add Spec</button>
                </div>
              </div>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={!!form.isNew} onChange={e => setForm(f => ({ ...f, isNew: e.target.checked }))} className="w-4 h-4 accent-orange-500" />
                  <span className="text-slate-300 text-sm">New</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={!!form.isBestseller} onChange={e => setForm(f => ({ ...f, isBestseller: e.target.checked }))} className="w-4 h-4 accent-orange-500" />
                  <span className="text-slate-300 text-sm">Bestseller</span>
                </label>
              </div>
              <div>
                <label className="text-slate-400 text-xs font-medium block mb-1.5">Icon (Emoji)</label>
                <input value={form.imageIcon} onChange={e => setForm(f => ({ ...f, imageIcon: e.target.value }))}
                  className="w-20 bg-white/5 border border-white/10 text-white text-xl text-center rounded-xl px-3 py-2.5 focus:outline-none" />
              </div>
            </div>
            <div className="px-5 py-4 border-t border-white/10 flex gap-3">
              <button onClick={handleSubmit} className="flex-1 py-3 bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold rounded-xl cursor-pointer transition-all">
                {editId ? 'Save Changes' : 'Add Solution'}
              </button>
              <button onClick={close} className="px-4 py-3 bg-white/5 border border-white/10 text-slate-300 text-sm font-semibold rounded-xl cursor-pointer">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setDeleteId(null)} />
          <div className="relative bg-[#0c1a2e] border border-white/10 rounded-2xl p-6 w-full max-w-sm text-center">
            <Trash2 size={28} className="text-red-400 mx-auto mb-3" />
            <h3 className="text-white font-bold mb-1">Delete Solution?</h3>
            <p className="text-slate-400 text-sm mb-5">This cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={handleDelete} className="flex-1 py-2.5 bg-red-500 text-white font-semibold rounded-xl text-sm cursor-pointer">Delete</button>
              <button onClick={() => setDeleteId(null)} className="flex-1 py-2.5 bg-white/5 border border-white/10 text-slate-300 font-semibold rounded-xl text-sm cursor-pointer">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
