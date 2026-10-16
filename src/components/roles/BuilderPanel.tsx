'use client';

import React, { useState } from 'react';
import { 
  Building2, 
  Calculator, 
  TrendingUp, 
  FileText, 
  MapPin, 
  Layers, 
  CheckCircle2, 
  AlertTriangle,
  Download,
  DollarSign,
  PieChart as PieIcon,
  ShieldCheck,
  Compass,
  ArrowUpRight
} from 'lucide-react';
import { ReadyReckonerRecord } from '@/types';
import { INITIAL_READY_RECKONER_RECORDS } from '@/data/readyReckonerData';

export default function BuilderPanel() {
  // Configurable Feasibility Inputs
  const [selectedLocality, setSelectedLocality] = useState('Hinjewadi Phase 3');
  const [plotAreaAcres, setPlotAreaAcres] = useState(3.5);
  const [landCostPerAcreCr, setLandCostPerAcreCr] = useState(6.5);
  const [fsiPermissible, setFsiPermissible] = useState(2.2);
  const [constructionCostPerSqFt, setConstructionCostPerSqFt] = useState(3200);
  const [baseSellingPricePerSqFt, setBaseSellingPricePerSqFt] = useState(7400);
  const [approvalCostLakh, setApprovalCostLakh] = useState(180);
  const [infraCostLakh, setInfraCostLakh] = useState(120);
  const [financeRatePercent, setFinanceRatePercent] = useState(9.5);
  const [projectDurationMonths, setProjectDurationMonths] = useState(36);
  const [contingencyPercent, setContingencyPercent] = useState(5.0);
  const [showPrintModal, setShowPrintModal] = useState(false);

  // Derived Calculations
  const plotAreaSqFt = Math.round(plotAreaAcres * 43560);
  const totalLandCost = plotAreaAcres * landCostPerAcreCr * 10000000;
  // Permissible built-up area
  const grossBuiltAreaSqFt = Math.round(plotAreaSqFt * fsiPermissible);
  // Saleable area with 25% loading/super built-up
  const saleableAreaSqFt = Math.round(grossBuiltAreaSqFt * 1.25);

  // Hard Construction Cost
  const totalConstructionCost = grossBuiltAreaSqFt * constructionCostPerSqFt;
  // Approval & Infrastructure
  const totalApprovalCost = approvalCostLakh * 100000;
  const totalInfraCost = infraCostLakh * 100000;
  // Statutory Land Stamp duty (6% in Maharashtra)
  const landStampDuty = totalLandCost * 0.06;

  // Subtotal Direct Cost
  const directDevelopmentCost = totalLandCost + landStampDuty + totalConstructionCost + totalApprovalCost + totalInfraCost;
  // Contingency
  const contingencyCost = directDevelopmentCost * (contingencyPercent / 100);
  // Financing Cost (Average debt drawn over project duration)
  const averageDebtDrawn = (directDevelopmentCost + contingencyCost) * 0.55;
  const totalFinanceCost = averageDebtDrawn * (financeRatePercent / 100) * (projectDurationMonths / 12);

  // Total Project Cost
  const totalProjectCost = directDevelopmentCost + contingencyCost + totalFinanceCost;

  // Scenarios
  const scenarios = [
    {
      name: 'Conservative (Low Demand)',
      sellingPricePerSqFt: baseSellingPricePerSqFt * 0.9, // 10% lower
      badge: 'Stress Test',
      color: 'text-amber-700 bg-amber-50 border-amber-200'
    },
    {
      name: 'Base Case (Current Market)',
      sellingPricePerSqFt: baseSellingPricePerSqFt,
      badge: 'Target Feasibility',
      color: 'text-blue-700 bg-blue-50 border-blue-200'
    },
    {
      name: 'Optimistic (High Absorption)',
      sellingPricePerSqFt: baseSellingPricePerSqFt * 1.15, // 15% higher
      badge: 'Bull Scenario',
      color: 'text-emerald-700 bg-emerald-50 border-emerald-200'
    }
  ].map(sc => {
    const revenue = saleableAreaSqFt * sc.sellingPricePerSqFt;
    const profit = revenue - totalProjectCost;
    const margin = revenue > 0 ? (profit / revenue) * 100 : 0;
    const roi = totalProjectCost > 0 ? (profit / totalProjectCost) * 100 : 0;
    return {
      ...sc,
      revenue,
      profit,
      margin: Math.round(margin * 10) / 10,
      roi: Math.round(roi * 10) / 10,
    };
  });

  const breakEvenSellingRate = saleableAreaSqFt > 0 ? Math.round(totalProjectCost / saleableAreaSqFt) : 0;

  // Ready Reckoner Comparison for the Locality
  const matchedAsr = INITIAL_READY_RECKONER_RECORDS.find(r => r.locality.toLowerCase().includes(selectedLocality.toLowerCase())) || INITIAL_READY_RECKONER_RECORDS[0];
  const asrBenchmarkValue = Math.round(plotAreaSqFt * matchedAsr.ratePerSqFt);

  const formatCr = (num: number) => `₹${(num / 10000000).toFixed(2)} Cr`;
  const formatLakh = (num: number) => `₹${(num / 100000).toFixed(2)} L`;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200 uppercase tracking-wide">
              Segment A
            </span>
            <h1 className="text-xl font-bold text-slate-900">Builder & Developer Feasibility Hub</h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Evaluate plot acquisitions, simulate FSI construction economics, compare absorption scenarios, and generate audit-ready feasibility reports.
          </p>
        </div>

        <button
          onClick={() => window.print()}
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow-xs transition cursor-pointer self-start sm:self-auto"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export Feasibility PDF</span>
        </button>
      </div>

      {/* KPI Overview Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Saleable Area</span>
          <p className="text-xl font-bold text-slate-900 mt-1">{saleableAreaSqFt.toLocaleString('en-IN')} <span className="text-xs font-normal text-slate-500">sq.ft</span></p>
          <span className="text-[11px] text-blue-600 font-medium">FSI {fsiPermissible} × 1.25 Loading</span>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Total Project Cost</span>
          <p className="text-xl font-bold text-slate-900 mt-1">{formatCr(totalProjectCost)}</p>
          <span className="text-[11px] text-slate-500">Land + Constr + Finance</span>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Base Net Revenue</span>
          <p className="text-xl font-bold text-emerald-600 mt-1">{formatCr(scenarios[1].revenue)}</p>
          <span className="text-[11px] text-emerald-700 font-medium">@{baseSellingPricePerSqFt.toLocaleString('en-IN')}/sq.ft</span>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Break-Even Selling Rate</span>
          <p className="text-xl font-bold text-indigo-700 mt-1">₹{breakEvenSellingRate.toLocaleString('en-IN')}</p>
          <span className="text-[11px] text-indigo-600 font-medium">per saleable sq.ft</span>
        </div>
      </div>

      {/* Main Grid: Parameters on Left, Output & Scenarios on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Input Parameters (5 Cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <Calculator className="w-4 h-4 text-indigo-600" />
              <span>Project Parameters & Cost Assumptions</span>
            </h3>
            <span className="text-[10px] text-slate-400">Configurable</span>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Target Locality (Pune Metro)</label>
              <select
                value={selectedLocality}
                onChange={(e) => setSelectedLocality(e.target.value)}
                className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs focus:ring-1 focus:ring-indigo-500"
              >
                <option value="Hinjewadi Phase 3">Hinjewadi Phase 3 (Tech Corridor)</option>
                <option value="Baner">Baner (High Density Residential)</option>
                <option value="Wakad">Wakad (Transit Hub)</option>
                <option value="Kharadi">Kharadi (East IT Belt)</option>
                <option value="Kalyani Nagar">Kalyani Nagar (Ultra Luxury)</option>
                <option value="Hadapsar">Hadapsar / Magarpatta</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Plot Area (Acres)</label>
                <input
                  type="number"
                  step="0.1"
                  min="0.5"
                  value={plotAreaAcres}
                  onChange={(e) => setPlotAreaAcres(parseFloat(e.target.value) || 1)}
                  className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Land Cost (₹ Cr / Acre)</label>
                <input
                  type="number"
                  step="0.5"
                  min="1"
                  value={landCostPerAcreCr}
                  onChange={(e) => setLandCostPerAcreCr(parseFloat(e.target.value) || 1)}
                  className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Permissible FSI / FAR</label>
                <input
                  type="number"
                  step="0.1"
                  min="1"
                  max="4"
                  value={fsiPermissible}
                  onChange={(e) => setFsiPermissible(parseFloat(e.target.value) || 1)}
                  className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Civil Constr (₹/sq.ft)</label>
                <input
                  type="number"
                  step="100"
                  value={constructionCostPerSqFt}
                  onChange={(e) => setConstructionCostPerSqFt(parseFloat(e.target.value) || 1000)}
                  className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">Base Target Sale Price (₹/saleable sq.ft)</label>
              <input
                type="number"
                step="200"
                value={baseSellingPricePerSqFt}
                onChange={(e) => setBaseSellingPricePerSqFt(parseFloat(e.target.value) || 3000)}
                className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs font-semibold text-blue-700"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Approvals (₹ Lakh)</label>
                <input
                  type="number"
                  value={approvalCostLakh}
                  onChange={(e) => setApprovalCostLakh(parseFloat(e.target.value) || 0)}
                  className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Infra / Roads (₹ Lakh)</label>
                <input
                  type="number"
                  value={infraCostLakh}
                  onChange={(e) => setInfraCostLakh(parseFloat(e.target.value) || 0)}
                  className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Finance Interest (%)</label>
                <input
                  type="number"
                  step="0.5"
                  value={financeRatePercent}
                  onChange={(e) => setFinanceRatePercent(parseFloat(e.target.value) || 0)}
                  className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Duration (Months)</label>
                <input
                  type="number"
                  value={projectDurationMonths}
                  onChange={(e) => setProjectDurationMonths(parseInt(e.target.value) || 12)}
                  className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs"
                />
              </div>
            </div>
          </div>

          {/* Statutory Benchmark Context */}
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1.5">
            <div className="flex items-center justify-between font-semibold text-slate-800">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                <span>Maharashtra ASR Benchmark:</span>
              </span>
              <span className="text-blue-700">₹{matchedAsr.ratePerSqFt.toLocaleString('en-IN')}/sq.ft</span>
            </div>
            <p className="text-[11px] text-slate-500">
              Official Ready Reckoner indicative land benchmark for {selectedLocality} is {formatCr(asrBenchmarkValue)}. Asking land price is {formatCr(totalLandCost)}.
            </p>
          </div>
        </div>

        {/* Right: Scenario Comparison & Cost Breakdown (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Scenario Comparison Cards */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center justify-between">
              <span>Feasibility Scenario Matrix (Low, Base & High)</span>
              <span className="text-[10px] text-slate-400 font-normal">Sensitivity Analysis</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {scenarios.map((sc, i) => (
                <div key={i} className={`p-4 rounded-xl border flex flex-col justify-between ${sc.color}`}>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider opacity-80">{sc.badge}</span>
                    <h4 className="text-xs font-bold mt-0.5">{sc.name}</h4>
                    <p className="text-sm font-extrabold mt-2">
                      ₹{Math.round(sc.sellingPricePerSqFt).toLocaleString('en-IN')}/sq.ft
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-current/20 space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span className="opacity-80">Gross Revenue:</span>
                      <span className="font-bold">{formatCr(sc.revenue)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="opacity-80">Net Profit:</span>
                      <span className={`font-bold ${sc.profit >= 0 ? '' : 'text-red-600'}`}>{formatCr(sc.profit)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="opacity-80">Project ROI:</span>
                      <span className="font-extrabold">{sc.roi}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cost Component Breakdown Table */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
              Itemized Capital Expenditure (CapEx) & Finance Structure
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400 font-semibold uppercase text-[10px]">
                    <th className="py-2">Cost Element</th>
                    <th className="py-2 text-right">Estimated Amount</th>
                    <th className="py-2 text-right">% of Total</th>
                    <th className="py-2 text-right">Rate / Unit</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  <tr>
                    <td className="py-2 font-medium">Land Acquisition</td>
                    <td className="py-2 text-right font-semibold">{formatCr(totalLandCost)}</td>
                    <td className="py-2 text-right">{Math.round((totalLandCost / totalProjectCost) * 100)}%</td>
                    <td className="py-2 text-right text-slate-500">₹{landCostPerAcreCr} Cr/acre</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-medium">Statutory Stamp Duty & Registration (6%)</td>
                    <td className="py-2 text-right font-semibold">{formatLakh(landStampDuty)}</td>
                    <td className="py-2 text-right">{Math.round((landStampDuty / totalProjectCost) * 100)}%</td>
                    <td className="py-2 text-right text-slate-500">6% on Land</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-medium">Civil Construction & MEP Works</td>
                    <td className="py-2 text-right font-semibold">{formatCr(totalConstructionCost)}</td>
                    <td className="py-2 text-right">{Math.round((totalConstructionCost / totalProjectCost) * 100)}%</td>
                    <td className="py-2 text-right text-slate-500">₹{constructionCostPerSqFt}/built sq.ft</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-medium">Town Planning Sanctions & Liasoning</td>
                    <td className="py-2 text-right font-semibold">{formatLakh(totalApprovalCost)}</td>
                    <td className="py-2 text-right">{Math.round((totalApprovalCost / totalProjectCost) * 100)}%</td>
                    <td className="py-2 text-right text-slate-500">Lump Sum</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-medium">Site Infrastructure & Amenities</td>
                    <td className="py-2 text-right font-semibold">{formatLakh(totalInfraCost)}</td>
                    <td className="py-2 text-right">{Math.round((totalInfraCost / totalProjectCost) * 100)}%</td>
                    <td className="py-2 text-right text-slate-500">Roads/Drainage</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-medium">Contingency Buffer ({contingencyPercent}%)</td>
                    <td className="py-2 text-right font-semibold">{formatLakh(contingencyCost)}</td>
                    <td className="py-2 text-right">{Math.round((contingencyCost / totalProjectCost) * 100)}%</td>
                    <td className="py-2 text-right text-slate-500">Risk cushion</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-medium">Construction Financing & Interest Cost</td>
                    <td className="py-2 text-right font-semibold">{formatCr(totalFinanceCost)}</td>
                    <td className="py-2 text-right">{Math.round((totalFinanceCost / totalProjectCost) * 100)}%</td>
                    <td className="py-2 text-right text-slate-500">{financeRatePercent}% p.a.</td>
                  </tr>
                  <tr className="border-t-2 border-slate-300 font-bold text-slate-900 bg-slate-50/50">
                    <td className="py-2.5">Total Outlay (CapEx)</td>
                    <td className="py-2.5 text-right text-indigo-700">{formatCr(totalProjectCost)}</td>
                    <td className="py-2.5 text-right">100%</td>
                    <td className="py-2.5 text-right">₹{breakEvenSellingRate}/saleable sq.ft</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
