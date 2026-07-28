'use client';

import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, X, Check } from 'lucide-react';

type Vehicle = { id: string; vehicleNumber: string; driverName: string; ownerName: string; tareWeight: number; };
const EMPTY: Omit<Vehicle, 'id'> = { vehicleNumber: '', driverName: '', ownerName: '', tareWeight: 0 };

export default function VehiclesAdminPage() {
  const [items,     setItems]    = useState<Vehicle[]>([]);
  const [drawer,    setDrawer]   = useState(false);
  const [form,      setForm]     = useState<Omit<Vehicle,'id'>>(EMPTY);
  const [editId,    setEditId]   = useState<string | null>(null);
  const [deleteId,  setDeleteId] = useState<string | null>(null);
  const [saved,     setSaved]    = useState(false);
  const [loading,   setLoading]  = useState(true);

  const refetch = () => fetch('/api/vehicles').then(r => r.json()).then(d => { setItems(d); setLoading(false); });
  useEffect(() => { refetch(); }, []);

  const openAdd  = () => { setForm(EMPTY); setEditId(null); setDrawer(true); };
  const openEdit = (v: Vehicle) => { setForm({ vehicleNumber: v.vehicleNumber, driverName: v.driverName, ownerName: v.ownerName, tareWeight: v.tareWeight }); setEditId(v.id); setDrawer(true); };
  const close    = () => { setDrawer(false); setEditId(null); };

  const handleSubmit = async () => {
    if (!form.vehicleNumber.trim()) return;
    const url    = editId ? `/api/vehicles/${editId}` : '/api/vehicles';
    const method = editId ? 'PUT' : 'POST';
    await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
    setSaved(true); setTimeout(() => setSaved(false), 2000);
    close(); refetch();
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    await fetch(`/api/vehicles/${deleteId}`, { method: 'DELETE' });
    setDeleteId(null); refetch();
  };

  return (
    <div className="space-y-5">
      {/* Header row */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <p className="text-slate-400 text-sm">Register vehicles with tare weights for auto-fill during weighment.</p>
        <button onClick={openAdd}
          className="flex items-center justify-center gap-2 px-4 py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold rounded-xl transition-all hover:shadow-lg hover:shadow-orange-500/25 shrink-0 cursor-pointer w-full sm:w-auto">
          <Plus size={16} /> Add Vehicle
        </button>
      </div>

      {saved && (
        <div className="flex items-center gap-2 px-4 py-3 bg-green-500/15 border border-green-500/25 rounded-xl text-green-400 text-sm">
          <Check size={16} /> Vehicle saved!
        </div>
      )}

      {/* Card list on mobile, table on md+ */}
      {loading ? (
        <div className="text-center text-slate-500 py-12 text-sm">Loading vehicles...</div>
      ) : items.length === 0 ? (
        <div className="text-center text-slate-500 py-12 text-sm">No vehicles registered yet. Add your first vehicle.</div>
      ) : (
        <>
          {/* Mobile card list (hidden on md+) */}
          <div className="md:hidden space-y-3">
            {items.map((v, i) => (
              <div key={v.id} className="bg-white/3 border border-white/8 rounded-2xl p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="text-orange-400 font-mono font-bold text-lg tracking-wider">{v.vehicleNumber}</p>
                    <p className="text-slate-500 text-xs mt-0.5">Vehicle #{i + 1}</p>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => openEdit(v)} className="p-2 rounded-lg bg-blue-500/15 text-blue-400 hover:bg-blue-500/25 cursor-pointer"><Pencil size={14}/></button>
                    <button onClick={() => setDeleteId(v.id)} className="p-2 rounded-lg bg-red-500/15 text-red-400 hover:bg-red-500/25 cursor-pointer"><Trash2 size={14}/></button>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm mt-3 border-t border-white/8 pt-3">
                  <div>
                    <p className="text-slate-500 text-[10px] uppercase tracking-wider mb-0.5">Driver</p>
                    <p className="text-white font-medium">{v.driverName || '—'}</p>
                  </div>
                  <div>
                    <p className="text-slate-500 text-[10px] uppercase tracking-wider mb-0.5">Owner</p>
                    <p className="text-slate-300">{v.ownerName || '—'}</p>
                  </div>
                  <div>
                    <p className="text-slate-500 text-[10px] uppercase tracking-wider mb-0.5">Tare Weight</p>
                    <p className="text-white font-bold">{v.tareWeight.toLocaleString()} <span className="text-slate-500 text-xs font-normal">kg</span></p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop table (hidden on mobile) */}
          <div className="hidden md:block bg-white/3 border border-white/8 rounded-2xl overflow-hidden">
            <div className="px-5 py-3.5 border-b border-white/8">
              <h2 className="text-white font-semibold text-sm">Vehicle Register ({items.length})</h2>
            </div>
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/5 text-slate-500 text-xs font-medium">
                  <th className="px-5 py-3">#</th>
                  <th className="px-5 py-3">Vehicle No</th>
                  <th className="px-5 py-3">Driver</th>
                  <th className="px-5 py-3 hidden lg:table-cell">Owner</th>
                  <th className="px-5 py-3">Tare Weight</th>
                  <th className="px-5 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map((v, i) => (
                  <tr key={v.id} className="border-b border-white/5 hover:bg-white/3 transition-colors">
                    <td className="px-5 py-4 text-slate-600 text-xs">{i + 1}</td>
                    <td className="px-5 py-4 font-mono font-bold text-orange-400">{v.vehicleNumber}</td>
                    <td className="px-5 py-4 text-white text-sm">{v.driverName || '—'}</td>
                    <td className="px-5 py-4 text-slate-400 text-sm hidden lg:table-cell">{v.ownerName || '—'}</td>
                    <td className="px-5 py-4">
                      <span className="text-white font-semibold">{v.tareWeight.toLocaleString()}</span>
                      <span className="text-slate-500 text-xs ml-1">kg</span>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => openEdit(v)} className="p-2 rounded-lg bg-blue-500/15 text-blue-400 hover:bg-blue-500/25 cursor-pointer"><Pencil size={14}/></button>
                        <button onClick={() => setDeleteId(v.id)} className="p-2 rounded-lg bg-red-500/15 text-red-400 hover:bg-red-500/25 cursor-pointer"><Trash2 size={14}/></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* Drawer */}
      {drawer && (
        <div className="fixed inset-0 z-50 flex">
          <div className="flex-1 bg-black/60 backdrop-blur-sm" onClick={close} />
          <div className="w-full max-w-sm bg-[#0c1a2e] border-l border-white/10 h-full flex flex-col">
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
              <h2 className="text-white font-bold">{editId ? 'Edit Vehicle' : 'Add Vehicle'}</h2>
              <button onClick={close} className="text-slate-400 hover:text-white cursor-pointer"><X size={20}/></button>
            </div>
            <div className="flex-1 px-5 py-5 space-y-4 overflow-y-auto">
              {[
                { label: 'Vehicle Number *', field: 'vehicleNumber', placeholder: 'e.g. TN39AB1234', upper: true },
                { label: 'Driver Name',      field: 'driverName',    placeholder: 'e.g. Rajan M' },
                { label: 'Owner Name',       field: 'ownerName',     placeholder: 'e.g. Murugan Transports' },
              ].map(({ label, field, placeholder, upper }) => (
                <div key={field}>
                  <label className="text-slate-400 text-xs font-medium block mb-1.5">{label}</label>
                  <input value={(form as any)[field]}
                    onChange={e => setForm(f => ({ ...f, [field]: upper ? e.target.value.toUpperCase() : e.target.value }))}
                    placeholder={placeholder}
                    className="w-full bg-white/5 border border-white/10 text-white text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-orange-500/50 transition-all" />
                </div>
              ))}
              <div>
                <label className="text-slate-400 text-xs font-medium block mb-1.5">Tare Weight (kg) *</label>
                <input type="number" value={form.tareWeight || ''}
                  onChange={e => setForm(f => ({ ...f, tareWeight: parseFloat(e.target.value) || 0 }))}
                  placeholder="e.g. 8200"
                  className="w-full bg-white/5 border border-white/10 text-white text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-orange-500/50 transition-all" />
              </div>
            </div>
            <div className="px-5 py-4 border-t border-white/10 flex gap-3">
              <button onClick={handleSubmit} className="flex-1 py-3 bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold rounded-xl cursor-pointer transition-all">
                {editId ? 'Save Changes' : 'Add Vehicle'}
              </button>
              <button onClick={close} className="px-4 py-3 bg-white/5 border border-white/10 text-slate-300 text-sm font-semibold rounded-xl cursor-pointer">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete confirm */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setDeleteId(null)} />
          <div className="relative bg-[#0c1a2e] border border-white/10 rounded-2xl p-6 w-full max-w-sm text-center">
            <Trash2 size={28} className="text-red-400 mx-auto mb-3" />
            <h3 className="text-white font-bold mb-1">Remove Vehicle?</h3>
            <p className="text-slate-400 text-sm mb-5">This vehicle will be removed from the register.</p>
            <div className="flex gap-3">
              <button onClick={handleDelete} className="flex-1 py-2.5 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-xl text-sm cursor-pointer">Remove</button>
              <button onClick={() => setDeleteId(null)} className="flex-1 py-2.5 bg-white/5 border border-white/10 text-slate-300 font-semibold rounded-xl text-sm cursor-pointer">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
