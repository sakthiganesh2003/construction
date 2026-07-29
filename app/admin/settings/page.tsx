'use client';

import { useState, useEffect } from 'react';
import { Save, Check } from 'lucide-react';

type Settings = {
  companyName: string; tagline: string; phone: string; email: string; address: string;
  linkedin: string; youtube: string; twitter: string;
  siteTitle: string; metaDescription: string;
};

const DEFAULT: Settings = {
  companyName: 'Veera Blue Metals',
  tagline: 'Heavy Weighbridges & Industrial Quarry Weighing Solutions',
  phone: '+91 80 2654 3210',
  email: 'info@veerabluemetals.com',
  address: 'Veera Blue Metals, Industrial Area, Tamil Nadu, India',
  linkedin: 'https://linkedin.com', youtube: 'https://youtube.com', twitter: 'https://twitter.com',
  siteTitle: 'Veera Blue Metals – Heavy Weighbridges & Quarry Weighing Solutions',
  metaDescription: 'Leading provider of heavy weighbridges, quarry weighing solutions, and industrial measurement instruments.',
};

export default function SettingsAdminPage() {
  const [settings, setSettings] = useState<Settings>(DEFAULT);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('vbm_settings');
    if (stored) setSettings(JSON.parse(stored));
  }, []);

  const handleSave = () => {
    localStorage.setItem('vbm_settings', JSON.stringify(settings));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const Field = ({ label, field, type = 'text', placeholder = '' }: { label: string; field: keyof Settings; type?: string; placeholder?: string }) => (
    <div>
      <label className="text-slate-700 text-xs font-semibold block mb-1.5">{label}</label>
      <input
        type={type}
        value={settings[field]}
        onChange={e => setSettings(s => ({ ...s, [field]: e.target.value }))}
        placeholder={placeholder}
        className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all"
      />
    </div>
  );

  const TextArea = ({ label, field, placeholder = '' }: { label: string; field: keyof Settings; placeholder?: string }) => (
    <div>
      <label className="text-slate-700 text-xs font-semibold block mb-1.5">{label}</label>
      <textarea
        value={settings[field]}
        onChange={e => setSettings(s => ({ ...s, [field]: e.target.value }))}
        placeholder={placeholder}
        rows={3}
        className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all resize-none"
      />
    </div>
  );

  return (
    <div className="max-w-2xl space-y-6">
      {saved && (
        <div className="flex items-center gap-2 px-4 py-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-sm font-semibold">
          <Check size={16} /> Settings saved successfully!
        </div>
      )}

      {/* Brand Info */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-xs">
        <h2 className="text-slate-900 font-bold text-sm border-b border-slate-100 pb-3">Brand Information</h2>
        <Field label="Company Name" field="companyName" />
        <Field label="Tagline" field="tagline" />
      </div>

      {/* Contact Info */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-xs">
        <h2 className="text-slate-900 font-bold text-sm border-b border-slate-100 pb-3">Contact Information</h2>
        <Field label="Phone Number" field="phone" />
        <Field label="Email Address" field="email" type="email" />
        <TextArea label="Address" field="address" />
      </div>

      {/* Social Media */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-xs">
        <h2 className="text-slate-900 font-bold text-sm border-b border-slate-100 pb-3">Social Media Links</h2>
        <Field label="LinkedIn URL" field="linkedin" type="url" placeholder="https://linkedin.com/in/..." />
        <Field label="YouTube URL" field="youtube" type="url" placeholder="https://youtube.com/@..." />
        <Field label="Twitter / X URL" field="twitter" type="url" placeholder="https://twitter.com/..." />
      </div>

      {/* SEO */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-xs">
        <h2 className="text-slate-900 font-bold text-sm border-b border-slate-100 pb-3">SEO Settings</h2>
        <Field label="Site Title" field="siteTitle" />
        <TextArea label="Meta Description" field="metaDescription" />
      </div>

      {/* Save Button */}
      <button onClick={handleSave}
        className="flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl transition-all shadow-md shadow-orange-500/20 cursor-pointer">
        <Save size={16} /> Save Settings
      </button>
    </div>
  );
}
