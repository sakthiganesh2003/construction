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
  New:     'bg-emerald-100 text-emerald-800 border border-emerald-200/80',
  Replied: 'bg-sky-100 text-sky-800 border border-sky-200/80',
  Closed:  'bg-slate-100 text-slate-700 border border-slate-200',
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
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${filter === s ? 'bg-orange-500 text-white shadow-xs' : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50'}`}>
              {s}{s !== 'All' && <span className="ml-1 opacity-70">({items.filter(i => i.status === s).length})</span>}
            </button>
          ))}
        </div>
        <button onClick={() => { setForm(EMPTY); setAddOpen(true); }}
          className="flex items-center justify-center gap-2 px-4 py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold rounded-xl transition-all shadow-md shadow-orange-500/20 cursor-pointer w-full sm:w-auto">
          <Plus size={16} /> Add Inquiry
        </button>
      </div>

      {saved && <div className="flex items-center gap-2 px-4 py-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-sm font-semibold"><Check size={16} /> Inquiry added!</div>}

      {/* Data Table */}
      {filtered.length === 0 ? (
        <div className="text-center text-slate-500 py-12 text-sm bg-white rounded-2xl border border-slate-200">No inquiries found.</div>
      ) : (
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
          <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-slate-900 font-bold text-sm">Customer Inquiries ({filtered.length})</h2>
            <span className="text-slate-400 text-xs font-semibold sm:hidden">← Swipe horizontally →</span>
          </div>
          <div className="overflow-x-auto w-full">
            <table className="w-full text-left min-w-[760px]">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/80 text-slate-500 text-xs font-semibold">
                  <th className="px-5 py-3.5">Customer</th>
                  <th className="px-5 py-3.5">Contact</th>
                  <th className="px-5 py-3.5">Product</th>
                  <th className="px-5 py-3.5">Status</th>
                  <th className="px-5 py-3.5">Date</th>
                  <th className="px-5 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map(inq => (
                  <tr key={inq.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-orange-100 border border-orange-200 flex items-center justify-center shrink-0">
                          <span className="text-orange-700 font-bold text-xs">{inq.customer[0]}</span>
                        </div>
                        <span className="text-slate-900 font-bold text-sm">{inq.customer}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-slate-600 text-xs font-medium">
                      <p>{inq.email}</p>
                      <p className="text-slate-400 text-[11px] mt-0.5">{inq.phone}</p>
                    </td>
                    <td className="px-5 py-4 text-orange-600 text-xs font-bold">{inq.product}</td>
                    <td className="px-5 py-4">
                      <select value={inq.status} onChange={e => changeStatus(inq.id, e.target.value)}
                        className={`text-xs font-bold px-2.5 py-1 rounded-full border bg-white focus:outline-none cursor-pointer ${statusColors[inq.status]}`}>
                        <option value="New" className="bg-white text-slate-900">New</option>
                        <option value="Replied" className="bg-white text-slate-900">Replied</option>
                        <option value="Closed" className="bg-white text-slate-900">Closed</option>
                      </select>
                    </td>
                    <td className="px-5 py-4 text-slate-400 text-xs whitespace-nowrap">{inq.date}</td>
                    <td className="px-5 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => setViewItem(inq)} className="p-1.5 rounded-lg bg-sky-50 text-sky-600 hover:bg-sky-100 border border-sky-100 cursor-pointer" title="View"><Eye size={14}/></button>
                        <a href={`mailto:${inq.email}?subject=Re: ${inq.product} Inquiry`} className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100 border border-emerald-100" title="Email"><Mail size={14}/></a>
                        <button onClick={() => setDeleteId(inq.id)} className="p-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 border border-red-100 cursor-pointer" title="Delete"><Trash2 size={14}/></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* View Detail Modal */}
      {viewItem && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs" onClick={() => setViewItem(null)} />
          <div className="relative bg-white border border-slate-200 rounded-t-2xl sm:rounded-2xl w-full sm:max-w-lg p-6 max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
              <h3 className="text-slate-900 font-bold text-base">Inquiry Details</h3>
              <button onClick={() => setViewItem(null)} className="text-slate-400 hover:text-slate-700 cursor-pointer"><X size={18}/></button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div><p className="text-slate-500 text-xs mb-1">Customer</p><p className="text-slate-900 font-semibold text-sm">{viewItem.customer}</p></div>
                <div><p className="text-slate-500 text-xs mb-1">Status</p><span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${statusColors[viewItem.status]}`}>{viewItem.status}</span></div>
                <div><p className="text-slate-500 text-xs mb-1 flex items-center gap-1"><Mail size={12}/> Email</p><p className="text-slate-700 text-sm break-all font-medium">{viewItem.email}</p></div>
                <div><p className="text-slate-500 text-xs mb-1 flex items-center gap-1"><Phone size={12}/> Phone</p><p className="text-slate-700 text-sm font-medium">{viewItem.phone}</p></div>
              </div>
              <div><p className="text-slate-500 text-xs mb-1">Product</p><p className="text-orange-600 font-semibold text-sm">{viewItem.product}</p></div>
              <div><p className="text-slate-500 text-xs mb-1">Message</p><p className="text-slate-700 text-sm bg-slate-50 border border-slate-200 rounded-xl p-3.5 leading-relaxed">{viewItem.message}</p></div>
              <div className="flex gap-3 pt-3 border-t border-slate-100">
                <a href={`mailto:${viewItem.email}?subject=Re: ${viewItem.product} Inquiry`}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold rounded-xl transition-all cursor-pointer shadow-xs">
                  <Mail size={15}/> Reply
                </a>
                <button onClick={() => { setDeleteId(viewItem.id); setViewItem(null); }}
                  className="px-4 py-2.5 bg-red-50 border border-red-200 text-red-600 rounded-xl hover:bg-red-100 font-semibold text-sm cursor-pointer">
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
          <div className="flex-1 bg-slate-900/40 backdrop-blur-xs" onClick={() => setAddOpen(false)} />
          <div className="w-full max-w-sm bg-white border-l border-slate-200 h-full flex flex-col shadow-2xl">
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
              <h2 className="text-slate-900 font-bold text-base">Add Inquiry</h2>
              <button onClick={() => setAddOpen(false)} className="text-slate-400 hover:text-slate-700 cursor-pointer"><X size={20}/></button>
            </div>
            <div className="flex-1 px-5 py-5 space-y-4 overflow-y-auto">
              {[
                { label: 'Customer Name *', field: 'customer', ph: 'e.g. Ramesh Kumar' },
                { label: 'Email',           field: 'email',    ph: 'e.g. ramesh@example.com' },
                { label: 'Phone',           field: 'phone',    ph: 'e.g. 9876543210' },
                { label: 'Product',         field: 'product',  ph: 'e.g. Steel Weighbridge' },
              ].map(({ label, field, ph }) => (
                <div key={field}>
                  <label className="text-slate-700 text-xs font-semibold block mb-1.5">{label}</label>
                  <input value={(form as any)[field]} onChange={e => setForm(f => ({ ...f, [field]: e.target.value }))}
                    className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all" placeholder={ph} />
                </div>
              ))}
              <div>
                <label className="text-slate-700 text-xs font-semibold block mb-1.5">Message</label>
                <textarea value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} rows={4}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all resize-none" />
              </div>
              <div>
                <label className="text-slate-700 text-xs font-semibold block mb-1.5">Status</label>
                <select value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all cursor-pointer">
                  <option value="New">New</option>
                  <option value="Replied">Replied</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>
            </div>
            <div className="px-5 py-4 border-t border-slate-100 flex gap-3">
              <button onClick={handleAdd} className="flex-1 py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold rounded-xl cursor-pointer transition-all shadow-xs">Add Inquiry</button>
              <button onClick={() => setAddOpen(false)} className="px-4 py-2.5 bg-slate-100 border border-slate-200 text-slate-700 text-sm font-semibold rounded-xl cursor-pointer hover:bg-slate-200">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs" onClick={() => setDeleteId(null)} />
          <div className="relative bg-white border border-slate-200 rounded-2xl p-6 w-full max-w-sm text-center shadow-2xl">
            <Trash2 size={28} className="text-red-500 mx-auto mb-3" />
            <h3 className="text-slate-900 font-bold text-base mb-1">Delete Inquiry?</h3>
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
