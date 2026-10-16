'use client';

import React, { useState } from 'react';
import { 
  FileCheck2, 
  ShieldCheck, 
  Search, 
  ExternalLink, 
  AlertCircle, 
  CheckCircle2, 
  FileText,
  Clock,
  Sparkles,
  Download,
  Building
} from 'lucide-react';
import { INITIAL_DUE_DILIGENCE_CHECKLIST } from '@/data/legalDueDiligenceData';
import { DueDiligenceItem } from '@/types';

export default function LegalDueDiligenceModule() {
  const [checklist, setChecklist] = useState<DueDiligenceItem[]>(INITIAL_DUE_DILIGENCE_CHECKLIST);
  const [searchFilter, setSearchFilter] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  // Registration Bill 2025 Status
  const [activeTab, setActiveTab] = useState<'checklist' | 'bill2025' | 'ecourts'>('checklist');

  const filteredItems = checklist.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchFilter.toLowerCase()) || 
                          item.notes.toLowerCase().includes(searchFilter.toLowerCase());
    const matchesCat = activeCategory === 'All' || item.category === activeCategory;
    return matchesSearch && matchesCat;
  });

  const verifiedCount = checklist.filter(i => i.status === 'Verified').length;
  const progressPercent = Math.round((verifiedCount / checklist.length) * 100);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 rounded-2xl p-6 text-white shadow-md border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 text-[11px] font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Digital India Land Records & Legal Title Scrutiny</span>
          </div>
          <h1 className="text-xl font-bold font-serif text-white">
            Title Verification & Due Diligence Workspace
          </h1>
          <p className="text-xs text-slate-300 leading-relaxed">
            Reconcile fragmented historical land records, inspect 30-year chain of title, cross-reference e-Courts litigation registries, and track draft Registration Bill 2025 paperless reforms.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => alert('Generating formal Legal Due Diligence Certificate PDF...')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Title Audit</span>
          </button>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
        <button
          onClick={() => setActiveTab('checklist')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
            activeTab === 'checklist'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          Due Diligence Checklist (10 Items)
        </button>
        <button
          onClick={() => setActiveTab('bill2025')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
            activeTab === 'bill2025'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          Registration Bill 2025 & ULPIN
        </button>
        <button
          onClick={() => setActiveTab('ecourts')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
            activeTab === 'ecourts'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          e-Courts Litigation Cross-Check
        </button>
      </div>

      {/* Tab 1: Checklist */}
      {activeTab === 'checklist' && (
        <div className="space-y-4">
          {/* Progress Header */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400">Title Readiness Status</span>
              <h3 className="text-base font-bold text-slate-900 mt-0.5">
                {verifiedCount} of {checklist.length} Mandatory Checks Satisfied ({progressPercent}%)
              </h3>
            </div>

            <div className="w-full sm:w-48 bg-slate-100 rounded-full h-2.5 overflow-hidden border border-slate-200">
              <div 
                className="bg-emerald-600 h-2.5 rounded-full transition-all duration-500" 
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Checklist Items */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs divide-y divide-slate-100 overflow-hidden">
            {filteredItems.map((item) => (
              <div key={item.id} className="p-4 hover:bg-slate-50/60 transition space-y-2 text-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className={`w-4 h-4 flex-shrink-0 ${
                      item.status === 'Verified' ? 'text-emerald-500' : 'text-amber-500'
                    }`} />
                    <span className="font-bold text-slate-900">{item.title}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-medium">
                      {item.category}
                    </span>
                    <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                      item.status === 'Verified' 
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                        : 'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}>
                      {item.status}
                    </span>
                  </div>
                </div>

                <p className="text-slate-600 text-[11px] leading-relaxed pl-6.5">
                  {item.notes}
                </p>

                <div className="pl-6.5 pt-1 text-[10px] text-slate-400 flex items-center justify-between">
                  <span>Source: {item.officialSource}</span>
                  <span className="text-blue-600 font-medium cursor-pointer hover:underline">View Verification Certificate</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Registration Bill 2025 Reforms */}
      {activeTab === 'bill2025' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-5">
          <div>
            <span className="text-[10px] font-bold text-blue-600 uppercase">Ministry of Law & Justice Reform</span>
            <h3 className="text-base font-bold text-slate-900 mt-0.5">
              Draft Registration Bill 2025 & ULPIN (Bhu-Aadhaar) Integration
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Replacing the colonial-era Registration Act of 1908 with paperless, biometric e-authentication and automated mutation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
              <span className="font-bold text-slate-900">Aadhaar & Biometric Verification</span>
              <p className="text-slate-600 text-[11px] leading-relaxed">
                Parties execute sale deeds, power of attorney, and mortgages digitally with facial biometric verification, eliminating physical Sub-Registrar visits.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
              <span className="font-bold text-slate-900">ULPIN (Bhu-Aadhaar) 14-Digit Standard</span>
              <p className="text-slate-600 text-[11px] leading-relaxed">
                37+ crore land parcels assigned a unique geo-referenced alphanumeric ID based on longitude and latitude coordinates of cadastral survey polygons.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
              <span className="font-bold text-slate-900">Automatic Revenue Mutation</span>
              <p className="text-slate-600 text-[11px] leading-relaxed">
                17 states including Maharashtra link Sub-Registrar conveyances directly to village revenue records (7/12 Satbara) to instantly trigger mutation entries.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
              <span className="font-bold text-slate-900">AI Fraud & Anomaly Detection</span>
              <p className="text-slate-600 text-[11px] leading-relaxed">
                Computer vision & NLP models flag duplicate parcel registrations, signature variations, and conflicting owner claims before registration completes.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: e-Courts Cross-Check */}
      {activeTab === 'ecourts' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                e-Courts National Judicial Data Grid (NJDG) Cross-Check
              </h3>
              <p className="text-xs text-slate-500">
                Automated query cross-referencing Pune District Court, Civil Courts, and High Court of Bombay records.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 space-y-2">
            <div className="flex items-center gap-2 font-bold">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Litigation Search Result: No Lis Pendens or Restraining Orders Found</span>
            </div>
            <p className="text-[11px] text-emerald-800 leading-relaxed">
              Query completed across Pune District Court Civil Division (Special Civil Suits & Execution Petitions) for Survey No. 101, 102, 145, 180 and 301. Zero active injunctions or partition suits recorded against the current developers or original agricultural tenure holders.
            </p>
            <span className="text-[10px] text-emerald-600 font-mono">Query Timestamp: 2026-04-16T11:40:00Z</span>
          </div>
        </div>
      )}
    </div>
  );
}
