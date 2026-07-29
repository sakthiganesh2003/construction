'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Scale, Search, Car, ChevronDown, Printer, X, Check, AlertCircle } from 'lucide-react';

type Vehicle  = { id: string; vehicleNumber: string; driverName: string; ownerName: string; tareWeight: number; };
type Material = { id: string; name: string; ratePerTon: number; unit: string; };

export default function NewWeighmentPage() {
  const router = useRouter();
  const [vehicles,  setVehicles]  = useState<Vehicle[]>([]);
  const [materials, setMaterials] = useState<Material[]>([]);
  const [form, setForm] = useState({
    vehicleNumber: '', driverName: '', partyName: '',
    materialId: '', grossWeight: '', tareWeight: '', remarks: '',
    vehicleId: '',
  });
  const [vehicleSuggestions, setVehicleSuggestions] = useState<Vehicle[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [slip, setSlip] = useState<any>(null);
  const [error, setError] = useState('');
  const printRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch('/api/vehicles').then(r => r.json()).then(setVehicles);
    fetch('/api/materials').then(r => r.json()).then(setMaterials);
  }, []);

  // Live calculation
  const gross    = parseFloat(form.grossWeight) || 0;
  const tare     = parseFloat(form.tareWeight)  || 0;
  const net      = gross > tare ? gross - tare  : 0;
  const material = materials.find(m => m.id === form.materialId);
  const amount   = material ? (net / 1000) * material.ratePerTon : 0;

  const handleVehicleInput = (val: string) => {
    setForm(f => ({ ...f, vehicleNumber: val.toUpperCase(), vehicleId: '', driverName: f.vehicleId ? '' : f.driverName, tareWeight: f.vehicleId ? '' : f.tareWeight }));
    const matches = vehicles.filter(v => v.vehicleNumber.includes(val.toUpperCase()));
    setVehicleSuggestions(matches.slice(0, 5));
    setShowSuggestions(val.length > 0 && matches.length > 0);
  };

  const selectVehicle = (v: Vehicle) => {
    setForm(f => ({
      ...f,
      vehicleNumber: v.vehicleNumber,
      driverName:    v.driverName,
      tareWeight:    String(v.tareWeight),
      vehicleId:     v.id,
    }));
    setShowSuggestions(false);
  };

  const handleSubmit = async () => {
    if (!form.vehicleNumber || !form.partyName || !form.materialId || !form.grossWeight || !form.tareWeight) {
      setError('Please fill all required fields.');
      return;
    }
    if (gross <= tare) { setError('Gross weight must be greater than tare weight.'); return; }
    setError('');
    setSubmitting(true);
    try {
      const res = await fetch('/api/weighments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          vehicleNumber: form.vehicleNumber,
          driverName:    form.driverName,
          partyName:     form.partyName,
          materialId:    form.materialId,
          grossWeight:   gross,
          tareWeight:    tare,
          vehicleId:     form.vehicleId || null,
          remarks:       form.remarks,
        }),
      });
      const data = await res.json();
      setSlip({ ...data, materialName: material?.name, ratePerTon: material?.ratePerTon });
    } catch (e) {
      setError('Failed to save. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handlePrint = () => window.print();
  const handleNew   = () => {
    setSlip(null);
    setForm({ vehicleNumber: '', driverName: '', partyName: '', materialId: '', grossWeight: '', tareWeight: '', remarks: '', vehicleId: '' });
  };

  return (
    <div className="max-w-3xl space-y-6">
      {error && (
        <div className="flex items-center gap-2 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm font-semibold">
          <AlertCircle size={16} /> {error}
        </div>
      )}

      {/* Form Card */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-orange-100 border border-orange-200 flex items-center justify-center">
            <Scale size={18} className="text-orange-600" />
          </div>
          <h2 className="text-slate-900 font-bold text-base">New Weighment Entry</h2>
        </div>

        <div className="p-6 space-y-5">
          {/* Row 1 — Vehicle + Driver */}
          <div className="grid sm:grid-cols-2 gap-4">
            {/* Vehicle Number with autocomplete */}
            <div className="relative">
              <label className="text-slate-700 text-xs font-semibold block mb-1.5">Vehicle Number *</label>
              <div className="relative">
                <Car size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  value={form.vehicleNumber}
                  onChange={e => handleVehicleInput(e.target.value)}
                  onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
                  placeholder="e.g. TN39AB1234"
                  className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm font-semibold rounded-xl pl-10 pr-4 py-2.5 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all uppercase"
                />
              </div>
              {showSuggestions && (
                <div className="absolute z-20 top-full mt-1 w-full bg-white border border-slate-200 rounded-xl overflow-hidden shadow-2xl">
                  {vehicleSuggestions.map(v => (
                    <button key={v.id} onMouseDown={() => selectVehicle(v)}
                      className="w-full text-left px-4 py-2.5 hover:bg-slate-50 transition-colors">
                      <p className="text-slate-900 text-sm font-mono font-bold">{v.vehicleNumber}</p>
                      <p className="text-slate-500 text-xs">{v.driverName} · Tare: {v.tareWeight.toLocaleString()} kg</p>
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div>
              <label className="text-slate-700 text-xs font-semibold block mb-1.5">Driver Name</label>
              <input value={form.driverName} onChange={e => setForm(f => ({ ...f, driverName: e.target.value }))}
                placeholder="Auto-filled from register"
                className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all" />
            </div>
          </div>

          {/* Row 2 — Party + Material */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-slate-700 text-xs font-semibold block mb-1.5">Party / Customer Name *</label>
              <input value={form.partyName} onChange={e => setForm(f => ({ ...f, partyName: e.target.value }))}
                placeholder="e.g. Ramesh Constructions"
                className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all" />
            </div>
            <div>
              <label className="text-slate-700 text-xs font-semibold block mb-1.5">Material *</label>
              <div className="relative">
                <select value={form.materialId} onChange={e => setForm(f => ({ ...f, materialId: e.target.value }))}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-xl px-4 py-2.5 pr-8 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all appearance-none cursor-pointer">
                  <option value="">Select material...</option>
                  {materials.map(m => (
                    <option key={m.id} value={m.id}>
                      {m.name} — ₹{m.ratePerTon.toLocaleString()}/ton
                    </option>
                  ))}
                </select>
                <ChevronDown size={15} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Row 3 — Gross + Tare */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-slate-700 text-xs font-semibold block mb-1.5">Gross Weight (kg) *</label>
              <input type="number" value={form.grossWeight} onChange={e => setForm(f => ({ ...f, grossWeight: e.target.value }))}
                placeholder="e.g. 26400"
                className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all" />
            </div>
            <div>
              <label className="text-slate-700 text-xs font-semibold block mb-1.5">Tare Weight (kg) *</label>
              <input type="number" value={form.tareWeight} onChange={e => setForm(f => ({ ...f, tareWeight: e.target.value }))}
                placeholder="Auto-filled or enter manually"
                className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all" />
            </div>
          </div>

          {/* Remarks */}
          <div>
            <label className="text-slate-700 text-xs font-semibold block mb-1.5">Remarks (optional)</label>
            <input value={form.remarks} onChange={e => setForm(f => ({ ...f, remarks: e.target.value }))}
              placeholder="e.g. Bridge work, urgent delivery..."
              className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all" />
          </div>

          {/* Live Calculation Preview */}
          <div className="bg-orange-50/70 border border-orange-200/80 rounded-xl p-4">
            <p className="text-orange-700 text-xs font-bold uppercase tracking-wider mb-3">Live Calculation</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
              <div className="text-center">
                <p className="text-slate-500 text-xs mb-1 font-medium">Net Weight</p>
                <p className="text-slate-900 font-black text-xl">{net > 0 ? (net / 1000).toFixed(3) : '—'}</p>
                <p className="text-slate-400 text-xs">Tons</p>
              </div>
              <div className="text-center sm:border-x border-y sm:border-y-0 border-orange-200/60 py-2 sm:py-0">
                <p className="text-slate-500 text-xs mb-1 font-medium">Rate / Ton</p>
                <p className="text-slate-900 font-black text-xl">{material ? `₹${material.ratePerTon.toLocaleString()}` : '—'}</p>
                <p className="text-slate-400 text-xs">INR</p>
              </div>
              <div className="text-center">
                <p className="text-slate-500 text-xs mb-1 font-medium">Total Amount</p>
                <p className="text-orange-600 font-black text-xl">{amount > 0 ? `₹${amount.toLocaleString('en-IN', { maximumFractionDigits: 0 })}` : '—'}</p>
                <p className="text-slate-400 text-xs">INR</p>
              </div>
            </div>
          </div>

          {/* Submit */}
          <button onClick={handleSubmit} disabled={submitting}
            className="w-full py-3.5 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white font-bold rounded-xl transition-all shadow-md shadow-orange-500/20 cursor-pointer flex items-center justify-center gap-2">
            <Scale size={18} />
            {submitting ? 'Saving...' : 'Save Weighment & Generate Slip'}
          </button>
        </div>
      </div>

      {/* Slip Modal */}
      {slip && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="bg-white text-slate-900 rounded-2xl w-full max-w-md shadow-2xl" ref={printRef}>
            {/* Slip Header */}
            <div className="bg-[#1F2937] text-white rounded-t-2xl px-6 py-4 text-center">
              <p className="text-orange-400 text-xs font-bold uppercase tracking-widest mb-1">Weighment Slip</p>
              <h2 className="font-black text-xl">VEERA BLUE METALS</h2>
              <p className="text-slate-300 text-xs">Industrial Weighbridge Services</p>
            </div>
            <div className="px-6 py-4 space-y-3">
              <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                <span className="text-slate-500 text-xs font-medium">Slip Number</span>
                <span className="font-black text-orange-600 text-sm">{slip.slipNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 text-xs">Date & Time</span>
                <span className="text-xs font-semibold text-slate-800">{new Date(slip.createdAt).toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 text-xs">Vehicle No</span>
                <span className="text-xs font-bold font-mono text-slate-900">{slip.vehicleNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 text-xs">Driver</span>
                <span className="text-xs font-semibold text-slate-800">{slip.driverName || '—'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 text-xs">Party Name</span>
                <span className="text-xs font-semibold text-slate-800">{slip.partyName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 text-xs">Material</span>
                <span className="text-xs font-semibold text-slate-800">{slip.materialName}</span>
              </div>
              <div className="bg-slate-50 rounded-xl p-3 space-y-2 mt-2 border border-slate-100">
                <div className="flex justify-between">
                  <span className="text-slate-600 text-xs">Gross Weight</span>
                  <span className="text-xs font-bold text-slate-900">{slip.grossWeight.toLocaleString()} kg</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600 text-xs">Tare Weight</span>
                  <span className="text-xs font-bold text-slate-900">{slip.tareWeight.toLocaleString()} kg</span>
                </div>
                <div className="flex justify-between border-t border-slate-200 pt-2">
                  <span className="text-slate-800 text-xs font-bold">Net Weight</span>
                  <span className="text-xs font-black text-slate-900">{slip.netWeight.toLocaleString()} kg ({(slip.netWeight/1000).toFixed(3)} T)</span>
                </div>
              </div>
              <div className="bg-orange-50 border border-orange-200 rounded-xl p-3 flex justify-between items-center">
                <span className="text-orange-700 text-xs font-bold">Total Amount</span>
                <span className="text-orange-600 font-black text-lg">₹{slip.amount.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
              </div>
              {slip.remarks && <p className="text-slate-500 text-xs italic">Note: {slip.remarks}</p>}
            </div>
            {/* Footer buttons */}
            <div className="px-6 pb-5 flex gap-3">
              <button onClick={handlePrint}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-[#1F2937] text-white font-bold rounded-xl text-sm hover:bg-[#374151] transition-all cursor-pointer shadow-xs">
                <Printer size={15} /> Print Slip
              </button>
              <button onClick={handleNew}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-orange-500 text-white font-bold rounded-xl text-sm hover:bg-orange-600 transition-all cursor-pointer shadow-xs">
                <Check size={15} /> New Entry
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
