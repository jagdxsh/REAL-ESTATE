'use client';

import React, { useState } from 'react';
import { 
  Calculator, 
  Search, 
  ExternalLink, 
  ShieldCheck, 
  TrendingUp, 
  FileSpreadsheet, 
  Download,
  AlertCircle,
  HelpCircle,
  Layers,
  ArrowRight
} from 'lucide-react';
import { 
  INITIAL_READY_RECKONER_RECORDS, 
  OFFICIAL_IGR_SOURCE, 
  calculateGovernmentBenchmark, 
  compareAskingPriceVsBenchmark 
} from '@/data/readyReckonerData';
import { ReadyReckonerRecord } from '@/types';

export default function ReadyReckonerModule() {
  const [records] = useState<ReadyReckonerRecord[]>(INITIAL_READY_RECKONER_RECORDS);
  const [selectedRecordId, setSelectedRecordId] = useState<string>(records[0].id);
  const [areaInput, setAreaInput] = useState<number>(1200);
  const [areaUnit, setAreaUnit] = useState<'sq_ft' | 'sq_m' | 'acre'>('sq_ft');
  const [askingPriceInput, setAskingPriceInput] = useState<number>(11500000); // 1.15 Cr
  const [activeTab, setActiveTab] = useState<'calculator' | 'historical' | 'explorer'>('calculator');

  const selectedRecord = records.find(r => r.id === selectedRecordId) || records[0];
  const benchmarkResult = calculateGovernmentBenchmark(areaInput, areaUnit, selectedRecord);
  const comparison = compareAskingPriceVsBenchmark(askingPriceInput, benchmarkResult.benchmarkValue);

  const formatCr = (num: number) => `₹${(num / 10000000).toFixed(2)} Cr`;
  const formatLakh = (num: number) => `₹${(num / 100000).toFixed(2)} L`;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Module Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 rounded-2xl p-6 text-white shadow-md border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-500/20 text-amber-300 border border-blue-400/30 text-[11px] font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Official Government Benchmark Repository</span>
          </div>
          <h1 className="text-xl font-bold font-serif text-white">
            Maharashtra Ready Reckoner / Annual Statement of Rates (ASR)
          </h1>
          <p className="text-xs text-slate-300 leading-relaxed">
            Verified rate schedules published by the Inspector General of Registration & Controller of Stamps (IGR), Maharashtra. Used for statutory stamp duty calculation, registration fees, and capital gains valuation.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 self-start md:self-auto">
          <a
            href={OFFICIAL_IGR_SOURCE.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition"
          >
            <span>IGR Maharashtra Portal</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
        <button
          onClick={() => setActiveTab('calculator')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
            activeTab === 'calculator'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          Rate Calculator & Tax Safe Harbor
        </button>
        <button
          onClick={() => setActiveTab('historical')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
            activeTab === 'historical'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          Historical Price Trends (2022-2026)
        </button>
        <button
          onClick={() => setActiveTab('explorer')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
            activeTab === 'explorer'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          Locality Directory ({records.length} Zones)
        </button>
      </div>

      {/* Tab 1: Calculator */}
      {activeTab === 'calculator' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Inputs (5 Cols) */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <Calculator className="w-4 h-4 text-blue-600" />
              <span>Location & Property Parameters</span>
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">State & District</label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    disabled
                    value="Maharashtra"
                    className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-500 font-medium"
                  />
                  <input
                    type="text"
                    disabled
                    value="Pune"
                    className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-500 font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Select Registration Locality / Sub-Zone</label>
                <select
                  value={selectedRecordId}
                  onChange={(e) => setSelectedRecordId(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs font-semibold text-slate-800"
                >
                  {records.map(r => (
                    <option key={r.id} value={r.id}>
                      {r.locality} — {r.zoneCode} ({r.propertyType})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Property Area</label>
                  <input
                    type="number"
                    min="1"
                    value={areaInput}
                    onChange={(e) => setAreaInput(parseFloat(e.target.value) || 0)}
                    className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Measurement Unit</label>
                  <select
                    value={areaUnit}
                    onChange={(e) => setAreaUnit(e.target.value as any)}
                    className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs"
                  >
                    <option value="sq_ft">Square Feet (sq.ft)</option>
                    <option value="sq_m">Square Meters (sq.m)</option>
                    <option value="acre">Acres</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Actual Transaction / Asking Price (₹)</label>
                <input
                  type="number"
                  step="50000"
                  value={askingPriceInput}
                  onChange={(e) => setAskingPriceInput(parseFloat(e.target.value) || 0)}
                  className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs font-bold text-blue-700"
                />
                <span className="text-[10px] text-slate-400">Target deal or advertised price</span>
              </div>
            </div>

            {/* Official Source Reference Card */}
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
              <span className="font-semibold text-slate-800">Verified ASR Schedule:</span>
              <p className="text-[11px] text-slate-600">
                Official Rate: <strong>₹{selectedRecord.ratePerSqFt.toLocaleString('en-IN')}/sq.ft</strong> (₹{selectedRecord.ratePerSqMeter.toLocaleString('en-IN')}/sq.m)
              </p>
              <p className="text-[10px] text-slate-400">
                Gazette: {selectedRecord.sourceDocument} (FY {selectedRecord.financialYear})
              </p>
            </div>
          </div>

          {/* Right Calculations & Comparative Breakdown (7 Cols) */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-5">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Statutory Benchmark Valuation & Tax Differential
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[11px] font-semibold text-slate-400 uppercase">Govt ASR Benchmark</span>
                <p className="text-2xl font-bold text-slate-900 mt-1">₹{benchmarkResult.benchmarkValue.toLocaleString('en-IN')}</p>
                <span className="text-[11px] text-slate-500">Based on {benchmarkResult.areaInSqM} sq.m standard</span>
              </div>

              <div className="p-4 rounded-xl bg-blue-50 border border-blue-200">
                <span className="text-[11px] font-semibold text-blue-700 uppercase">Actual Asking Price</span>
                <p className="text-2xl font-bold text-blue-900 mt-1">₹{askingPriceInput.toLocaleString('en-IN')}</p>
                <span className="text-[11px] text-blue-600">
                  {comparison.percentageDifference >= 0 ? `+${comparison.percentageDifference}% Premium` : `${comparison.percentageDifference}% Discount`}
                </span>
              </div>
            </div>

            {/* Safe Harbor Alert */}
            <div className={`p-4 rounded-xl border text-xs leading-relaxed space-y-1.5 ${
              comparison.isBelowSafeHarbor 
                ? 'bg-red-50 border-red-200 text-red-800' 
                : 'bg-emerald-50 border-emerald-200 text-emerald-900'
            }`}>
              <div className="flex items-center gap-1.5 font-bold">
                <ShieldCheck className="w-4 h-4" />
                <span>Income Tax Act Sec 43CA / 56(2)(x) Evaluation:</span>
              </div>
              <p>{comparison.explanation}</p>
            </div>

            {/* Statutory Stamp Duty & Registration Charges Breakdown */}
            <div className="pt-2 border-t border-slate-100 text-xs">
              <h4 className="font-bold text-slate-800 mb-2">Maharashtra Statutory Levies (PMC/PCMC Zone):</h4>
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">Stamp Duty (5%)</span>
                  <p className="font-bold text-slate-800 mt-0.5">₹{Math.round(comparison.higherTaxableValue * 0.05).toLocaleString('en-IN')}</p>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">Metro Cess (1%)</span>
                  <p className="font-bold text-slate-800 mt-0.5">₹{Math.round(comparison.higherTaxableValue * 0.01).toLocaleString('en-IN')}</p>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">Registration Fee</span>
                  <p className="font-bold text-slate-800 mt-0.5">₹30,000 (Capped)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Historical Rates */}
      {activeTab === 'historical' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div>
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Historical Ready Reckoner Appreciation for {selectedRecord.locality}
              </h3>
              <p className="text-[11px] text-slate-500">Official compound annual revision trends from FY 2022-23 to FY 2025-26.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            {selectedRecord.historicalRates?.map((hr, idx) => (
              <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
                <span className="text-[11px] font-semibold text-slate-400 uppercase">{hr.year}</span>
                <p className="text-xl font-bold text-slate-900">₹{hr.ratePerSqFt.toLocaleString('en-IN')}<span className="text-xs font-normal text-slate-500">/sq.ft</span></p>
                <div className="text-[11px] font-semibold text-emerald-600 flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>{hr.percentChange > 0 ? `+${hr.percentChange}% YoY` : 'Base Year'}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Locality Directory */}
      {activeTab === 'explorer' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            Verified Ready Reckoner Database (Pune District - FY 2025-26)
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 font-semibold uppercase text-[10px]">
                  <th className="py-2">Locality</th>
                  <th className="py-2">Zone Code</th>
                  <th className="py-2">Category</th>
                  <th className="py-2 text-right">Rate (₹/sq.ft)</th>
                  <th className="py-2 text-right">Rate (₹/sq.m)</th>
                  <th className="py-2 text-right">Last Verified</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {records.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-50">
                    <td className="py-2.5 font-semibold text-slate-900">{r.locality}</td>
                    <td className="py-2.5 font-mono text-[11px] text-slate-500">{r.zoneCode}</td>
                    <td className="py-2.5 capitalize">{r.propertyType.replace('_', ' ')}</td>
                    <td className="py-2.5 text-right font-bold text-slate-900">₹{r.ratePerSqFt.toLocaleString('en-IN')}</td>
                    <td className="py-2.5 text-right font-medium text-slate-600">₹{r.ratePerSqMeter.toLocaleString('en-IN')}</td>
                    <td className="py-2.5 text-right text-slate-400">{r.verifiedDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
