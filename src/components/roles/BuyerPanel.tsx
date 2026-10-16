'use client';

import React, { useState } from 'react';
import { 
  Home, 
  Search, 
  Calculator, 
  Compass, 
  Layers, 
  MapPin, 
  CheckCircle2, 
  TrendingUp, 
  ShieldCheck, 
  ArrowRight,
  Info
} from 'lucide-react';
import { INITIAL_PROPERTIES } from '@/data/propertiesData';
import { PropertyListing } from '@/types';

export default function BuyerPanel() {
  const [activeTab, setActiveTab] = useState<'discovery' | 'affordability' | 'compare'>('discovery');
  const [properties] = useState<PropertyListing[]>(INITIAL_PROPERTIES);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBhk, setSelectedBhk] = useState('all');

  // Affordability Calculator State
  const [purchasePriceInr, setPurchasePriceInr] = useState(12800000); // 1.28 Cr
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [loanTenureYears, setLoanTenureYears] = useState(20);
  const [interestRatePercent, setInterestRatePercent] = useState(8.5);
  const [interiorBudgetLakh, setInteriorBudgetLakh] = useState(12);

  // Property Comparison Selected IDs
  const [selectedPropIds, setSelectedPropIds] = useState<string[]>(['PROP-PUN-01', 'PROP-PUN-02']);

  // Derived Affordability Math
  const downPaymentAmount = Math.round(purchasePriceInr * (downPaymentPercent / 100));
  const loanPrincipal = purchasePriceInr - downPaymentAmount;

  // Monthly EMI Calculation: [P x R x (1+R)^N]/[(1+R)^N-1]
  const monthlyRate = interestRatePercent / 12 / 100;
  const totalMonths = loanTenureYears * 12;
  const emiFactor = Math.pow(1 + monthlyRate, totalMonths);
  const monthlyEmi = Math.round((loanPrincipal * monthlyRate * emiFactor) / (emiFactor - 1));
  const totalInterestPaid = Math.round(monthlyEmi * totalMonths - loanPrincipal);

  // Statutory & Additional Acquisition Costs in Maharashtra
  const stampDuty = Math.round(purchasePriceInr * 0.05); // 5%
  const metroCess = Math.round(purchasePriceInr * 0.01); // 1%
  const registrationFee = Math.min(Math.round(purchasePriceInr * 0.01), 30000); // capped at ₹30,000
  const brokerage = Math.round(purchasePriceInr * 0.01); // 1%
  const interiorFurnishing = interiorBudgetLakh * 100000;
  const societyMaintenance = 120000; // 1-year advance maintenance buffer
  const totalInitialCashRequired = downPaymentAmount + stampDuty + metroCess + registrationFee + brokerage + interiorFurnishing + societyMaintenance;

  const formatPrice = (price: number) => {
    if (price >= 10000000) return `₹${(price / 10000000).toFixed(2)} Cr`;
    return `₹${(price / 100000).toFixed(2)} Lakh`;
  };

  const filteredProps = properties.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.locality.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesBhk = selectedBhk === 'all' || (p.bedrooms && String(p.bedrooms) === selectedBhk);
    return matchesSearch && matchesBhk;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200 uppercase tracking-wide">
              Segment D
            </span>
            <h1 className="text-xl font-bold text-slate-900">Customer & Property Buyer Workspace</h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Discover verified Pune homes, analyze true acquisition cash requirements and loan EMIs, review nearby transit and schools, and inspect Vastu compliance.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {(['discovery', 'affordability', 'compare'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition cursor-pointer ${
                activeTab === tab
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              {tab === 'discovery' ? 'Property Search' : tab === 'affordability' ? 'Total Cost & EMI' : 'Side-by-Side Compare'}
            </button>
          ))}
        </div>
      </div>

      {/* Tab 1: Discovery */}
      {activeTab === 'discovery' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3 rounded-xl border border-slate-200">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search by area, locality (e.g. Kharadi, Baner, Wakad)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center gap-2">
              <select
                value={selectedBhk}
                onChange={(e) => setSelectedBhk(e.target.value)}
                className="px-3 py-1.5 rounded-lg border border-slate-300 text-xs bg-white"
              >
                <option value="all">All BHK Layouts</option>
                <option value="2">2 BHK Units</option>
                <option value="3">3 BHK Units</option>
                <option value="4">4 BHK Penthouses</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProps.map((prop) => (
              <div key={prop.id} className="rounded-xl border border-slate-200 bg-white shadow-xs overflow-hidden flex flex-col justify-between hover:shadow-md transition">
                <div className="p-4 space-y-3">
                  <div className="flex items-start justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                      {prop.subType}
                    </span>
                    <span className="text-sm font-extrabold text-slate-900">
                      {formatPrice(prop.askingPrice)}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xs font-bold text-slate-900 leading-snug">{prop.title}</h3>
                    <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      <span>{prop.locality}, {prop.city}</span>
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[11px] py-2 border-y border-slate-100 text-slate-600">
                    <div>Carpet: <strong>{prop.carpetAreaSqFt || prop.areaSqFt} sq.ft</strong></div>
                    <div>Floor: <strong>{prop.floor || 'G'} of {prop.totalFloors || 'Plotted'}</strong></div>
                    <div className="flex items-center gap-1 text-emerald-700 font-semibold">
                      <Compass className="w-3 h-3" />
                      <span>Vastu: {prop.vastuScore}/100</span>
                    </div>
                    <div className="text-slate-500 truncate">{prop.possessionStatus}</div>
                  </div>

                  {/* Nearby Facilities Snapshot */}
                  <div className="text-[11px] text-slate-600 bg-slate-50 p-2.5 rounded-lg space-y-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Key Infrastructure:</span>
                    {prop.nearbyFacilities.metroStation && (
                      <p className="truncate">🚇 {prop.nearbyFacilities.metroStation}</p>
                    )}
                    {prop.nearbyFacilities.schoolNearby && (
                      <p className="truncate">🏫 {prop.nearbyFacilities.schoolNearby}</p>
                    )}
                  </div>
                </div>

                <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs">
                  <button
                    onClick={() => {
                      setPurchasePriceInr(prop.askingPrice);
                      setActiveTab('affordability');
                    }}
                    className="text-blue-600 font-semibold hover:underline cursor-pointer"
                  >
                    Calculate EMI & Costs
                  </button>
                  <span className="text-slate-400 text-[10px]">{prop.reraId || 'Verified Title'}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Comprehensive Affordability Calculator */}
      {activeTab === 'affordability' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Inputs (5 Cols) */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <Calculator className="w-4 h-4 text-blue-600" />
              <span>Mortgage & Acquisition Budget Inputs</span>
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">
                  Agreement / Purchase Price: {formatPrice(purchasePriceInr)}
                </label>
                <input
                  type="range"
                  min="4000000"
                  max="40000000"
                  step="500000"
                  value={purchasePriceInr}
                  onChange={(e) => setPurchasePriceInr(parseInt(e.target.value))}
                  className="w-full accent-blue-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Down Payment ({downPaymentPercent}%)</label>
                  <input
                    type="number"
                    min="10"
                    max="50"
                    value={downPaymentPercent}
                    onChange={(e) => setDownPaymentPercent(parseInt(e.target.value) || 20)}
                    className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs"
                  />
                  <span className="text-[10px] text-slate-400">{formatPrice(downPaymentAmount)}</span>
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Loan Tenure (Years)</label>
                  <input
                    type="number"
                    min="5"
                    max="30"
                    value={loanTenureYears}
                    onChange={(e) => setLoanTenureYears(parseInt(e.target.value) || 20)}
                    className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Interest Rate (%)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={interestRatePercent}
                    onChange={(e) => setInterestRatePercent(parseFloat(e.target.value) || 8.5)}
                    className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Interiors Budget (₹ L)</label>
                  <input
                    type="number"
                    value={interiorBudgetLakh}
                    onChange={(e) => setInteriorBudgetLakh(parseInt(e.target.value) || 0)}
                    className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs"
                  />
                </div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-900 space-y-1">
              <span className="font-bold">Transparent Formula Used:</span>
              <p className="text-[11px] leading-relaxed">
                Monthly EMI is computed using standard reducing balance: EMI = [P × r × (1+r)ⁿ] / [(1+r)ⁿ - 1].
                Statutory charges reflect Maharashtra Government rules (5% Stamp Duty + 1% Metro Cess + ₹30,000 capped registration fee).
              </p>
            </div>
          </div>

          {/* Results (7 Cols) */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-5">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              True Acquisition Cost Breakdown (Beyond Advertised Price)
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-blue-50 border border-blue-200">
                <span className="text-[11px] font-semibold text-blue-700 uppercase">Estimated Monthly EMI</span>
                <p className="text-2xl font-bold text-blue-950 mt-1">₹{monthlyEmi.toLocaleString('en-IN')}</p>
                <span className="text-[11px] text-blue-600 font-medium">Principal: {formatPrice(loanPrincipal)}</span>
              </div>

              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200">
                <span className="text-[11px] font-semibold text-amber-700 uppercase">Total Initial Cash Needed</span>
                <p className="text-2xl font-bold text-amber-950 mt-1">{formatPrice(totalInitialCashRequired)}</p>
                <span className="text-[11px] text-amber-600 font-medium">Down payment + Taxes + Setup</span>
              </div>
            </div>

            {/* Itemized Table */}
            <div className="overflow-x-auto text-xs">
              <table className="w-full text-left">
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  <tr>
                    <td className="py-2 text-slate-500">Property Agreement Value:</td>
                    <td className="py-2 text-right font-semibold">{formatPrice(purchasePriceInr)}</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-slate-500">Bank Home Loan (Principal):</td>
                    <td className="py-2 text-right font-semibold text-blue-700">{formatPrice(loanPrincipal)}</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-slate-500">Down Payment Outflow ({downPaymentPercent}%):</td>
                    <td className="py-2 text-right font-semibold">{formatPrice(downPaymentAmount)}</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-slate-500">Maharashtra Stamp Duty (5%):</td>
                    <td className="py-2 text-right font-semibold">₹{stampDuty.toLocaleString('en-IN')}</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-slate-500">Pune Metro & Transport Cess (1%):</td>
                    <td className="py-2 text-right font-semibold">₹{metroCess.toLocaleString('en-IN')}</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-slate-500">Sub-Registrar Registration Fee (Capped):</td>
                    <td className="py-2 text-right font-semibold">₹{registrationFee.toLocaleString('en-IN')}</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-slate-500">Interior Fit-Out & Furnishing Budget:</td>
                    <td className="py-2 text-right font-semibold">₹{interiorFurnishing.toLocaleString('en-IN')}</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-slate-500">Advance 1-Year Society Maintenance Deposit:</td>
                    <td className="py-2 text-right font-semibold">₹{societyMaintenance.toLocaleString('en-IN')}</td>
                  </tr>
                  <tr className="border-t-2 border-slate-300 font-bold text-slate-900 bg-slate-50">
                    <td className="py-2.5">Total Out-of-Pocket Cash at Possession:</td>
                    <td className="py-2.5 text-right text-emerald-700">{formatPrice(totalInitialCashRequired)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Side-by-Side Comparison */}
      {activeTab === 'compare' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            Property Side-by-Side Comparison Matrix
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {selectedPropIds.map((pId) => {
              const prop = properties.find(p => p.id === pId) || properties[0];
              return (
                <div key={prop.id} className="p-4 rounded-xl border border-slate-200 space-y-3 bg-slate-50/50">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-bold text-sm text-slate-900">{prop.title}</h4>
                      <p className="text-xs text-slate-500">{prop.locality}, {prop.city}</p>
                    </div>
                    <span className="text-sm font-extrabold text-blue-700">{formatPrice(prop.askingPrice)}</span>
                  </div>

                  <div className="space-y-2 text-xs divide-y divide-slate-200">
                    <div className="pt-2 flex justify-between">
                      <span className="text-slate-500">Govt Ready Reckoner:</span>
                      <span className="font-semibold">{formatPrice(prop.readyReckonerBenchmark)}</span>
                    </div>
                    <div className="pt-2 flex justify-between">
                      <span className="text-slate-500">Carpet Area:</span>
                      <span className="font-semibold">{prop.carpetAreaSqFt || prop.areaSqFt} sq.ft</span>
                    </div>
                    <div className="pt-2 flex justify-between">
                      <span className="text-slate-500">Price / sq.ft:</span>
                      <span className="font-semibold">₹{Math.round(prop.askingPrice / prop.areaSqFt)}/sq.ft</span>
                    </div>
                    <div className="pt-2 flex justify-between">
                      <span className="text-slate-500">Vastu Score:</span>
                      <span className="font-bold text-emerald-700">{prop.vastuScore} / 100</span>
                    </div>
                    <div className="pt-2 flex justify-between">
                      <span className="text-slate-500">MahaRERA Registration:</span>
                      <span className="font-mono text-slate-700">{prop.reraId || 'Approved'}</span>
                    </div>
                    <div className="pt-2 flex justify-between">
                      <span className="text-slate-500">Nearest Metro:</span>
                      <span className="text-slate-700 truncate max-w-[200px]">{prop.nearbyFacilities.metroStation || 'Within 2 km'}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
