'use client';

import React, { useState } from 'react';
import { 
  Trees, 
  Calculator, 
  FileCheck2, 
  TrendingUp, 
  Layers, 
  ShieldCheck, 
  ArrowRight, 
  AlertCircle,
  Compass,
  CheckCircle2,
  DollarSign,
  HelpCircle
} from 'lucide-react';
import { INITIAL_READY_RECKONER_RECORDS, compareAskingPriceVsBenchmark } from '@/data/readyReckonerData';

export default function LandOwnerPanel() {
  const [plotAreaSqFt, setPlotAreaSqFt] = useState(43560); // 1 Acre default
  const [selectedLocality, setSelectedLocality] = useState('Baner');
  const [surveyNumber, setSurveyNumber] = useState('Gat No. 142/2A');
  const [askingPriceCr, setAskingPriceCr] = useState(12.5);
  const [activeTab, setActiveTab] = useState<'valuation' | 'opportunities' | 'documents'>('valuation');

  const matchedAsr = INITIAL_READY_RECKONER_RECORDS.find(r => r.locality.toLowerCase().includes(selectedLocality.toLowerCase())) || INITIAL_READY_RECKONER_RECORDS[0];
  const askingPriceInr = askingPriceCr * 10000000;
  const benchmarkValueInr = Math.round(plotAreaSqFt * matchedAsr.ratePerSqFt);
  const comparison = compareAskingPriceVsBenchmark(askingPriceInr, benchmarkValueInr);

  const formatCr = (num: number) => `₹${(num / 10000000).toFixed(2)} Cr`;
  const formatLakh = (num: number) => `₹${(num / 100000).toFixed(2)} L`;

  const developmentOptions = [
    {
      key: 'outright_sale',
      title: '1. Outright Land Sale',
      badge: 'Immediate Liquidity',
      color: 'border-blue-200 bg-blue-50/50',
      estReturn: formatCr(askingPriceInr),
      timeframe: '2 - 4 Months',
      risk: 'Low (Once registered & paid)',
      capitalNeeded: 'Nil (Seller pays Capital Gains Tax)',
      description: 'Transfer full legal title to a buyer or developer via a registered conveyance deed.',
      pros: ['Immediate cash realization', 'Zero construction or approval risk', 'Complete liability transfer'],
      cons: ['Long-term capital gains tax (LTCG) payable', 'Foregoes future development appreciation upside']
    },
    {
      key: 'joint_development',
      title: '2. Joint Development Agreement (JDA)',
      badge: 'Balanced Partnership',
      color: 'border-emerald-200 bg-emerald-50/50',
      estReturn: `${formatCr(askingPriceInr * 1.45)} (Estimated Realization)`,
      timeframe: '36 - 48 Months',
      risk: 'Medium (Developer execution risk)',
      capitalNeeded: 'Nil (Landowner provides land; developer finances construction)',
      description: 'Enter into a registered development agreement with an established builder on a 60:40 or 65:35 revenue or area-sharing basis.',
      pros: ['40% to 50% higher financial realization than raw land sale', 'Developer handles RERA, approvals & construction', 'Tax deferred under Sec 45(5A) of IT Act until Completion Certificate'],
      cons: ['Dependent on builder solvency and project completion timeline', 'Subject to real estate market absorption cycle']
    },
    {
      key: 'ground_lease',
      title: '3. Long-Term Commercial Ground Lease',
      badge: 'Recurring Rental Yield',
      color: 'border-amber-200 bg-amber-50/50',
      estReturn: `₹${((askingPriceInr * 0.07) / 12 / 100000).toFixed(2)} Lakh / month + 15% escalation every 3 yrs`,
      timeframe: '9 to 29 Years Lease',
      risk: 'Low to Medium',
      capitalNeeded: 'Zero',
      description: 'Lease raw land to institutional users (EV charging hubs, commercial retail outlets, sports arenas, drive-through food courts, or warehousing).',
      pros: ['Retain ancestral family ownership indefinitely', 'Steady inflation-indexed rental income', 'Zero construction capital requirements'],
      cons: ['Long lock-in period', 'Commercial tenant eviction laws require specialized lease drafting']
    },
    {
      key: 'self_develop',
      title: '4. Self-Development (Plotted / Villa Layout)',
      badge: 'Maximum Value Capture',
      color: 'border-indigo-200 bg-indigo-50/50',
      estReturn: `${formatCr(askingPriceInr * 1.85)} (Gross Plotted Sales)`,
      timeframe: '18 - 24 Months',
      risk: 'High (Self-managed project)',
      capitalNeeded: '₹1.5 - 2.5 Cr for PMRDA approvals, roads, drainage, boundary fencing',
      description: 'Convert agricultural land to NA (Non-Agricultural) plotted layout, secure PMRDA / RERA sanction, and sell individual villa plots.',
      pros: ['Retain 100% of development profit margin', 'Fast phased sales of individual plots', 'No high-rise RCC structural risk'],
      cons: ['Requires upfront working capital and liaisoning with revenue & town planning authorities']
    }
  ];

  const landownerDocChecklist = [
    { title: '7/12 Satbara Extract & Mutation (Ferfar)', status: 'Verified', source: 'Mahabhulekh Portal', mandatory: true },
    { title: '30-Year Search Report & Title Deed', status: 'Verified', source: 'Sub-Registrar Pune', mandatory: true },
    { title: 'Land Measurement & Boundary Demarcation Map', status: 'Pending', source: 'Taluka Inspector of Land Records (TILR)', mandatory: true },
    { title: 'Non-Agricultural (NA) Order / PMRDA Sanction', status: 'Verified', source: 'Collectorate / Revenue Dept', mandatory: true },
    { title: 'ULPIN (Bhu-Aadhaar) 14-Digit ID', status: 'Verified', source: 'DILRMP Central Registry', mandatory: false },
    { title: 'Property Tax & Gram Panchayat No-Dues', status: 'Verified', source: 'Local Revenue / Municipal Office', mandatory: true }
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 uppercase tracking-wide">
              Segment B
            </span>
            <h1 className="text-xl font-bold text-slate-900">Land Owner Advisory & Valuation Panel</h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Determine true land value, benchmark against Maharashtra Ready Reckoner rates, explore JDA vs outright sale options, and prepare legal documentation.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {(['valuation', 'opportunities', 'documents'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition cursor-pointer ${
                activeTab === tab
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              {tab === 'valuation' ? 'Valuation & ASR' : tab === 'opportunities' ? 'Development Matrix' : 'Title Checklist'}
            </button>
          ))}
        </div>
      </div>

      {/* Tab 1: Valuation & Government Benchmark */}
      {activeTab === 'valuation' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Plot Details Form (5 Cols) */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <Trees className="w-4 h-4 text-emerald-600" />
                <span>Parcel Identification & Asking Price</span>
              </h3>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Locality (Pune)</label>
                <select
                  value={selectedLocality}
                  onChange={(e) => setSelectedLocality(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs"
                >
                  {INITIAL_READY_RECKONER_RECORDS.map(r => (
                    <option key={r.id} value={r.locality}>{r.locality} ({r.zoneCode})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Survey / Gat Identifier</label>
                <input
                  type="text"
                  value={surveyNumber}
                  onChange={(e) => setSurveyNumber(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs"
                  placeholder="Gat No. / Survey No."
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Plot Area (sq.ft)</label>
                  <input
                    type="number"
                    value={plotAreaSqFt}
                    onChange={(e) => setPlotAreaSqFt(parseInt(e.target.value) || 1000)}
                    className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs"
                  />
                  <span className="text-[10px] text-slate-400">{(plotAreaSqFt / 43560).toFixed(2)} Acres</span>
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Owner Asking Price (₹ Cr)</label>
                  <input
                    type="number"
                    step="0.25"
                    value={askingPriceCr}
                    onChange={(e) => setAskingPriceCr(parseFloat(e.target.value) || 1)}
                    className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs font-semibold text-emerald-700"
                  />
                  <span className="text-[10px] text-slate-400">Total transaction target</span>
                </div>
              </div>
            </div>

            {/* Ready Reckoner Citation */}
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
              <span className="font-semibold text-slate-800">Department of Registration Source:</span>
              <p className="text-[11px] text-slate-600">
                ASR FY 2025-26 applicable rate: <strong>₹{matchedAsr.ratePerSqFt.toLocaleString('en-IN')}/sq.ft</strong> (₹{matchedAsr.ratePerSqMeter.toLocaleString('en-IN')}/sq.m).
              </p>
              <p className="text-[10px] text-slate-400">Verified via igrmaharashtra.gov.in on {matchedAsr.verifiedDate}</p>
            </div>
          </div>

          {/* Benchmark vs Asking Price Comparison (7 Cols) */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-5">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Land Valuation & Income Tax Safe Harbor Evaluation
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[11px] font-semibold text-slate-400 uppercase">Govt ASR Indicative Value</span>
                <p className="text-xl font-bold text-slate-900 mt-1">{formatCr(benchmarkValueInr)}</p>
                <span className="text-[11px] text-slate-500">₹{matchedAsr.ratePerSqFt}/sq.ft benchmark</span>
              </div>

              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200">
                <span className="text-[11px] font-semibold text-emerald-700 uppercase">Owner Asking Valuation</span>
                <p className="text-xl font-bold text-emerald-800 mt-1">{formatCr(askingPriceInr)}</p>
                <span className="text-[11px] text-emerald-600">₹{Math.round(askingPriceInr / plotAreaSqFt)}/sq.ft asking</span>
              </div>
            </div>

            {/* Differential Alert Card */}
            <div className={`p-4 rounded-xl border text-xs leading-relaxed space-y-1.5 ${
              comparison.isBelowSafeHarbor 
                ? 'bg-red-50 border-red-200 text-red-800' 
                : 'bg-blue-50 border-blue-200 text-blue-900'
            }`}>
              <div className="flex items-center gap-1.5 font-bold">
                <ShieldCheck className="w-4 h-4" />
                <span>
                  {comparison.isBelowSafeHarbor 
                    ? 'Income Tax Section 56(2)(x) Warning' 
                    : 'Statutory Stamp Duty & Taxation Baseline'}
                </span>
              </div>
              <p>{comparison.explanation}</p>
            </div>

            {/* Estimated Statutory Transfer Charges */}
            <div className="pt-3 border-t border-slate-100 text-xs">
              <h4 className="font-bold text-slate-800 mb-2">Indicative Statutory Charges upon Conveyance:</h4>
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">Stamp Duty (5%)</span>
                  <p className="font-bold text-slate-800 mt-0.5">{formatLakh(comparison.higherTaxableValue * 0.05)}</p>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">Metro Cess (1%)</span>
                  <p className="font-bold text-slate-800 mt-0.5">{formatLakh(comparison.higherTaxableValue * 0.01)}</p>
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

      {/* Tab 2: Development Opportunities Comparison */}
      {activeTab === 'opportunities' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {developmentOptions.map((opt) => (
              <div key={opt.key} className={`rounded-xl border p-5 bg-white shadow-xs space-y-3 ${opt.color}`}>
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">{opt.badge}</span>
                    <h3 className="text-sm font-bold text-slate-900">{opt.title}</h3>
                  </div>
                  <span className="text-xs font-extrabold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-md">
                    {opt.estReturn}
                  </span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {opt.description}
                </p>

                <div className="grid grid-cols-2 gap-2 text-[11px] pt-2 border-t border-slate-200/60">
                  <div>
                    <span className="text-slate-400">Timeline:</span>
                    <p className="font-semibold text-slate-800">{opt.timeframe}</p>
                  </div>
                  <div>
                    <span className="text-slate-400">Execution Risk:</span>
                    <p className="font-semibold text-slate-800">{opt.risk}</p>
                  </div>
                </div>

                <div className="space-y-1 pt-2 border-t border-slate-200/60 text-[11px]">
                  <span className="font-bold text-emerald-800">Advantages:</span>
                  <ul className="list-disc list-inside text-slate-600 space-y-0.5">
                    {opt.pros.map((p, i) => <li key={i}>{p}</li>)}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Legal Document Due Diligence */}
      {activeTab === 'documents' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div>
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Land Parcel Due Diligence Readiness
              </h3>
              <p className="text-[11px] text-slate-500">Ensure all ownership records are clean before entering into an agreement with buyers or builders.</p>
            </div>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
              83% Ready
            </span>
          </div>

          <div className="divide-y divide-slate-100">
            {landownerDocChecklist.map((item, idx) => (
              <div key={idx} className="py-3 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className={`w-4 h-4 ${item.status === 'Verified' ? 'text-emerald-500' : 'text-amber-500'}`} />
                  <div>
                    <p className="font-semibold text-slate-800">{item.title}</p>
                    <span className="text-[10px] text-slate-400">Source: {item.source}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                    item.status === 'Verified' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                  }`}>
                    {item.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
