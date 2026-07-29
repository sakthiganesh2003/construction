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
        <p className="text-slate-500 text-sm">Register vehicles with tare weights for auto-fill during weighment.</p>
        <button onClick={openAdd}
          className="flex items-center justify-center gap-2 px-4 py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold rounded-xl transition-all shadow-md shadow-orange-500/20 shrink-0 cursor-pointer w-full sm:w-auto">
          <Plus size={16} /> Add Vehicle
        </button>
      </div>

      {saved && (
        <div className="flex items-center gap-2 px-4 py-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-sm font-semibold">
          <Check size={16} /> Vehicle saved!
        </div>
      )}

      {/* Data Table */}
      {loading ? (
        <div className="text-center text-slate-500 py-12 text-sm bg-white rounded-2xl border border-slate-200">Loading vehicles...</div>
      ) : items.length === 0 ? (
        <div className="text-center text-slate-500 py-12 text-sm bg-white rounded-2xl border border-slate-200">No vehicles registered yet. Add your first vehicle.</div>
      ) : (
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
          <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-slate-900 font-bold text-sm">Vehicle Register ({items.length})</h2>
            <span className="text-slate-400 text-xs font-semibold sm:hidden">← Swipe horizontally →</span>
          </div>
          <div className="overflow-x-auto w-full">
            <table className="w-full text-left min-w-[640px]">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/80 text-slate-500 text-xs font-semibold">
                  <th className="px-5 py-3.5">#</th>
                  <th className="px-5 py-3.5">Vehicle No</th>
                  <th className="px-5 py-3.5">Driver</th>
                  <th className="px-5 py-3.5">Owner</th>
                  <th className="px-5 py-3.5">Tare Weight</th>
                  <th className="px-5 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {items.map((v, i) => (
                  <tr key={v.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="px-5 py-4 text-slate-400 text-xs font-medium">{i + 1}</td>
                    <td className="px-5 py-4 font-mono font-bold text-orange-600">{v.vehicleNumber}</td>
                    <td className="px-5 py-4 text-slate-900 text-sm font-semibold">{v.driverName || '—'}</td>
                    <td className="px-5 py-4 text-slate-600 text-xs font-medium">{v.ownerName || '—'}</td>
                    <td className="px-5 py-4">
                      <span className="text-slate-900 font-bold">{v.tareWeight.toLocaleString()}</span>
                      <span className="text-slate-400 text-xs ml-1 font-normal">kg</span>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => openEdit(v)} className="p-1.5 rounded-lg bg-sky-50 text-sky-600 border border-sky-100 hover:bg-sky-100 cursor-pointer" title="Edit"><Pencil size={14}/></button>
                        <button onClick={() => setDeleteId(v.id)} className="p-1.5 rounded-lg bg-red-50 text-red-600 border border-red-100 hover:bg-red-100 cursor-pointer" title="Delete"><Trash2 size={14}/></button>
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
              <h2 className="text-slate-900 font-bold text-base">{editId ? 'Edit Vehicle' : 'Add Vehicle'}</h2>
              <button onClick={close} className="text-slate-400 hover:text-slate-700 cursor-pointer"><X size={20}/></button>
            </div>
            <div className="flex-1 px-5 py-5 space-y-4 overflow-y-auto">
              {[
                { label: 'Vehicle Number *', field: 'vehicleNumber', placeholder: 'e.g. TN39AB1234', upper: true },
                { label: 'Driver Name',      field: 'driverName',    placeholder: 'e.g. Rajan M' },
                { label: 'Owner Name',       field: 'ownerName',     placeholder: 'e.g. Murugan Transports' },
              ].map(({ label, field, placeholder, upper }) => (
                <div key={field}>
                  <label className="text-slate-700 text-xs font-semibold block mb-1.5">{label}</label>
                  <input value={(form as any)[field]}
                    onChange={e => setForm(f => ({ ...f, [field]: upper ? e.target.value.toUpperCase() : e.target.value }))}
                    placeholder={placeholder}
                    className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all" />
                </div>
              ))}
              <div>
                <label className="text-slate-700 text-xs font-semibold block mb-1.5">Tare Weight (kg) *</label>
                <input type="number" value={form.tareWeight || ''}
                  onChange={e => setForm(f => ({ ...f, tareWeight: parseFloat(e.target.value) || 0 }))}
                  placeholder="e.g. 8200"
                  className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all" />
              </div>
            </div>
            <div className="px-5 py-4 border-t border-slate-100 flex gap-3">
              <button onClick={handleSubmit} className="flex-1 py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold rounded-xl cursor-pointer transition-all shadow-xs">
                {editId ? 'Save Changes' : 'Add Vehicle'}
              </button>
              <button onClick={close} className="px-4 py-2.5 bg-slate-100 border border-slate-200 text-slate-700 text-sm font-semibold rounded-xl cursor-pointer hover:bg-slate-200">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete confirm */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs" onClick={() => setDeleteId(null)} />
          <div className="relative bg-white border border-slate-200 rounded-2xl p-6 w-full max-w-sm text-center shadow-2xl">
            <Trash2 size={28} className="text-red-500 mx-auto mb-3" />
            <h3 className="text-slate-900 font-bold text-base mb-1">Remove Vehicle?</h3>
            <p className="text-slate-500 text-sm mb-5">This vehicle will be removed from the register.</p>
            <div className="flex gap-3">
              <button onClick={handleDelete} className="flex-1 py-2.5 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl text-sm cursor-pointer">Remove</button>
              <button onClick={() => setDeleteId(null)} className="flex-1 py-2.5 bg-slate-100 border border-slate-200 text-slate-700 font-semibold rounded-xl text-sm cursor-pointer hover:bg-slate-200">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
