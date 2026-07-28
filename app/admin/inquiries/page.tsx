'use client';

import { useState, useEffect } from 'react';
import { Plus, Eye, Trash2, X, Check, Mail, Phone } from 'lucide-react';

type Inquiry = {
  id: number; customer: string; email: string; phone: string;
  product: string; message: string; date: string; status: string;
};

const SEED: Inquiry[] = [
  { id: 1, customer: 'Ramesh Kumar',  email: 'ramesh@gmail.com',    phone: '9876543210', product: 'Steel Weighbridge',       message: 'I need a 60T steel weighbridge for my quarry. Please send a quote.', date: '2026-07-25', status: 'New' },
  { id: 2, customer: 'Suresh Patel',  email: 'suresh@company.com',  phone: '9845123456', product: 'Digital Weighbridge',     message: 'Need an IoT-enabled weighbridge with cloud dashboard for logistics park.', date: '2026-07-24', status: 'Replied' },
  { id: 3, customer: 'Kavitha Devi',  email: 'kavitha@corp.in',     phone: '9001234567', product: 'Auto Weighing Solution',  message: 'Looking for unmanned weighbridge for a busy highway truck terminal.', date: '2026-07-23', status: 'Closed' },
  { id: 4, customer: 'Manoj Singh',   email: 'manoj@firm.com',      phone: '9988776655', product: 'AccuTrol',                message: 'Need a batching controller for our concrete plant. Capacity 200T/hr.', date: '2026-07-22', status: 'New' },
  { id: 5, customer: 'Priya Anand',   email: 'priya@works.in',      phone: '9123456780', product: 'Concrete Weighbridge',    message: 'Request pricing for 80T concrete weighbridge with software.', date: '2026-07-21', status: 'Replied' },
];

const statusColors: Record<string, string> = {
  New:     'bg-green-500/15 text-green-400 border border-green-500/25',
  Replied: 'bg-blue-500/15 text-blue-400 border border-blue-500/25',
  Closed:  'bg-slate-500/15 text-slate-400 border border-slate-500/25',
};

const EMPTY: Inquiry = { id: 0, customer: '', email: '', phone: '', product: '', message: '', date: new Date().toISOString().split('T')[0], status: 'New' };

export default function InquiriesAdminPage() {
  const [items,    setItems]    = useState<Inquiry[]>([]);
  const [filter,   setFilter]   = useState('All');
  const [viewItem, setViewItem] = useState<Inquiry | null>(null);
  const [addOpen,  setAddOpen]  = useState(false);
  const [form,     setForm]     = useState<Inquiry>(EMPTY);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [saved,    setSaved]    = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('vbm_inquiries');
    setItems(stored ? JSON.parse(stored) : SEED);
    if (!stored) localStorage.setItem('vbm_inquiries', JSON.stringify(SEED));
  }, []);

  const save = (list: Inquiry[]) => { setItems(list); localStorage.setItem('vbm_inquiries', JSON.stringify(list)); };

  const changeStatus = (id: number, status: string) => {
    save(items.map(i => i.id === id ? { ...i, status } : i));
    if (viewItem?.id === id) setViewItem(p => p ? { ...p, status } : p);
  };

  const handleAdd = () => {
    if (!form.customer.trim() || !form.product.trim()) return;
    save([{ ...form, id: Date.now() }, ...items]);
    setSaved(true); setTimeout(() => setSaved(false), 2000);
    setAddOpen(false); setForm(EMPTY);
  };

  const handleDelete = () => {
    if (!deleteId) return;
    save(items.filter(i => i.id !== deleteId));
    setDeleteId(null); setViewItem(null);
  };

  const filtered = items.filter(i => filter === 'All' || i.status === filter);

  return (
    <div className="space-y-5">
      {/* Filter tabs + Add button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex gap-2 flex-wrap">
          {['All', 'New', 'Replied', 'Closed'].map(s => (
            <button key={s} onClick={() => setFilter(s)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${filter === s ? 'bg-orange-500 text-white' : 'bg-white/5 border border-white/10 text-slate-400 hover:text-white'}`}>
              {s}{s !== 'All' && <span className="ml-1 opacity-60">({items.filter(i => i.status === s).length})</span>}
            </button>
          ))}
        </div>
        <button onClick={() => { setForm(EMPTY); setAddOpen(true); }}
          className="flex items-center justify-center gap-2 px-4 py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold rounded-xl transition-all hover:shadow-lg hover:shadow-orange-500/25 whitespace-nowrap cursor-pointer w-full sm:w-auto">
          <Plus size={16} /> Add Inquiry
        </button>
      </div>

      {saved && <div className="flex items-center gap-2 px-4 py-3 bg-green-500/15 border border-green-500/25 rounded-xl text-green-400 text-sm"><Check size={16} /> Inquiry added!</div>}

      {/* Card list — works on all screen sizes */}
      {filtered.length === 0 ? (
        <div className="text-center text-slate-500 py-12 text-sm">No inquiries found.</div>
      ) : (
        <div className="space-y-3">
          {filtered.map(inq => (
            <div key={inq.id} className="bg-white/3 border border-white/8 rounded-2xl p-4 hover:border-white/15 transition-all">
              <div className="flex items-start gap-3">
                {/* Avatar */}
                <div className="w-10 h-10 rounded-full bg-orange-500/15 border border-orange-500/20 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-orange-400 font-bold text-sm">{inq.customer[0]}</span>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 flex-wrap">
                    <div className="min-w-0">
                      <p className="text-white font-bold text-sm truncate">{inq.customer}</p>
                      <p className="text-slate-500 text-xs truncate">{inq.email} · {inq.phone}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <select value={inq.status} onChange={e => changeStatus(inq.id, e.target.value)}
                        className={`text-[10px] font-bold px-2 py-1 rounded-full border bg-transparent focus:outline-none cursor-pointer ${statusColors[inq.status]}`}>
                        <option value="New" className="bg-[#0c1a2e]">New</option>
                        <option value="Replied" className="bg-[#0c1a2e]">Replied</option>
                        <option value="Closed" className="bg-[#0c1a2e]">Closed</option>
                      </select>
                    </div>
                  </div>

                  <div className="mt-2">
                    <span className="text-orange-400 text-xs font-medium">{inq.product}</span>
                    <p className="text-slate-400 text-xs mt-0.5 line-clamp-1">{inq.message}</p>
                  </div>

                  <div className="flex items-center justify-between mt-3 pt-2 border-t border-white/8">
                    <span className="text-slate-600 text-xs">{inq.date}</span>
                    <div className="flex gap-1.5">
                      <button onClick={() => setViewItem(inq)} className="p-1.5 rounded-lg bg-blue-500/15 text-blue-400 hover:bg-blue-500/25 cursor-pointer" title="View"><Eye size={13}/></button>
                      <a href={`mailto:${inq.email}?subject=Re: ${inq.product} Inquiry`} className="p-1.5 rounded-lg bg-green-500/15 text-green-400 hover:bg-green-500/25" title="Email"><Mail size={13}/></a>
                      <button onClick={() => setDeleteId(inq.id)} className="p-1.5 rounded-lg bg-red-500/15 text-red-400 hover:bg-red-500/25 cursor-pointer" title="Delete"><Trash2 size={13}/></button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* View Detail */}
      {viewItem && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setViewItem(null)} />
          <div className="relative bg-[#0c1a2e] border border-white/10 rounded-t-2xl sm:rounded-2xl w-full sm:max-w-lg p-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-bold text-base">Inquiry Details</h3>
              <button onClick={() => setViewItem(null)} className="text-slate-400 hover:text-white cursor-pointer"><X size={18}/></button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div><p className="text-slate-500 text-xs mb-1">Customer</p><p className="text-white font-semibold text-sm">{viewItem.customer}</p></div>
                <div><p className="text-slate-500 text-xs mb-1">Status</p><span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${statusColors[viewItem.status]}`}>{viewItem.status}</span></div>
                <div><p className="text-slate-500 text-xs mb-1 flex items-center gap-1"><Mail size={10}/> Email</p><p className="text-slate-300 text-sm break-all">{viewItem.email}</p></div>
                <div><p className="text-slate-500 text-xs mb-1 flex items-center gap-1"><Phone size={10}/> Phone</p><p className="text-slate-300 text-sm">{viewItem.phone}</p></div>
              </div>
              <div><p className="text-slate-500 text-xs mb-1">Product</p><p className="text-orange-400 font-semibold">{viewItem.product}</p></div>
              <div><p className="text-slate-500 text-xs mb-1">Message</p><p className="text-slate-300 text-sm bg-white/5 rounded-xl p-3 leading-relaxed">{viewItem.message}</p></div>
              <div className="flex gap-2 pt-2 border-t border-white/8">
                <a href={`mailto:${viewItem.email}?subject=Re: ${viewItem.product} Inquiry`}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold rounded-xl transition-all cursor-pointer">
                  <Mail size={15}/> Reply
                </a>
                <button onClick={() => { setDeleteId(viewItem.id); setViewItem(null); }}
                  className="p-2.5 bg-red-500/15 border border-red-500/25 text-red-400 rounded-xl hover:bg-red-500/25 cursor-pointer">
                  <Trash2 size={15}/>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Inquiry Drawer */}
      {addOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="flex-1 bg-black/60 backdrop-blur-sm" onClick={() => setAddOpen(false)} />
          <div className="w-full max-w-sm bg-[#0c1a2e] border-l border-white/10 h-full flex flex-col">
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
              <h2 className="text-white font-bold">Add Inquiry</h2>
              <button onClick={() => setAddOpen(false)} className="text-slate-400 hover:text-white cursor-pointer"><X size={20}/></button>
            </div>
            <div className="flex-1 px-5 py-5 space-y-4 overflow-y-auto">
              {[
                { label: 'Customer Name *', field: 'customer', ph: 'e.g. Ramesh Kumar' },
                { label: 'Email',           field: 'email',    ph: 'e.g. ramesh@example.com' },
                { label: 'Phone',           field: 'phone',    ph: 'e.g. 9876543210' },
                { label: 'Product',         field: 'product',  ph: 'e.g. Steel Weighbridge' },
              ].map(({ label, field, ph }) => (
                <div key={field}>
                  <label className="text-slate-400 text-xs font-medium block mb-1.5">{label}</label>
                  <input value={(form as any)[field]} onChange={e => setForm(f => ({ ...f, [field]: e.target.value }))}
                    className="w-full bg-white/5 border border-white/10 text-white text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-orange-500/50 transition-all" placeholder={ph} />
                </div>
              ))}
              <div>
                <label className="text-slate-400 text-xs font-medium block mb-1.5">Message</label>
                <textarea value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} rows={4}
                  className="w-full bg-white/5 border border-white/10 text-white text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-orange-500/50 transition-all resize-none" />
              </div>
              <div>
                <label className="text-slate-400 text-xs font-medium block mb-1.5">Status</label>
                <select value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))}
                  className="w-full bg-white/5 border border-white/10 text-white text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-orange-500/50 transition-all cursor-pointer">
                  <option value="New" className="bg-[#0c1a2e]">New</option>
                  <option value="Replied" className="bg-[#0c1a2e]">Replied</option>
                  <option value="Closed" className="bg-[#0c1a2e]">Closed</option>
                </select>
              </div>
            </div>
            <div className="px-5 py-4 border-t border-white/10 flex gap-3">
              <button onClick={handleAdd} className="flex-1 py-3 bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold rounded-xl cursor-pointer transition-all">Add Inquiry</button>
              <button onClick={() => setAddOpen(false)} className="px-4 py-3 bg-white/5 border border-white/10 text-slate-300 text-sm font-semibold rounded-xl cursor-pointer">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setDeleteId(null)} />
          <div className="relative bg-[#0c1a2e] border border-white/10 rounded-2xl p-6 w-full max-w-sm text-center">
            <Trash2 size={28} className="text-red-400 mx-auto mb-3" />
            <h3 className="text-white font-bold mb-1">Delete Inquiry?</h3>
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
