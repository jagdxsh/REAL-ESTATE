'use client';

import React, { useState } from 'react';
import { 
  Briefcase, 
  Search, 
  Filter, 
  Plus, 
  Sparkles, 
  UserCheck, 
  CheckCircle2, 
  AlertCircle, 
  TrendingUp, 
  Eye, 
  PhoneCall, 
  Compass, 
  MapPin, 
  SlidersHorizontal 
} from 'lucide-react';
import { INITIAL_PROPERTIES } from '@/data/propertiesData';
import { PropertyListing } from '@/types';

export default function RealtorPanel() {
  const [activeTab, setActiveTab] = useState<'listings' | 'smart_matching' | 'crm'>('listings');
  const [properties, setProperties] = useState<PropertyListing[]>(INITIAL_PROPERTIES);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');

  // Smart Matching State
  const [clientBudgetCr, setClientBudgetCr] = useState(1.5);
  const [clientLocality, setClientLocality] = useState('All Localities');
  const [clientBhk, setClientBhk] = useState('2');
  const [vastuPreference, setVastuPreference] = useState(true);

  // Sample Realtor Leads
  const [leads, setLeads] = useState([
    {
      id: 'LEAD-01',
      name: 'Aditya Deshmukh',
      phone: '+91 98230 •••••',
      budget: '₹1.20 - 1.50 Cr',
      bhk: '2 & 3 BHK',
      location: 'Kharadi / Viman Nagar',
      stage: 'Site Visit Scheduled',
      dpdpConsent: true,
      lastContacted: '2026-04-12'
    },
    {
      id: 'LEAD-02',
      name: 'Neha Singhal',
      phone: '+91 98900 •••••',
      budget: '₹80 - 90 Lakh',
      bhk: '2 BHK',
      location: 'Wakad / Baner',
      stage: 'New Inquiry',
      dpdpConsent: true,
      lastContacted: '2026-04-14'
    },
    {
      id: 'LEAD-03',
      name: 'Prakash Rao (Land Investor)',
      phone: '+91 97654 •••••',
      budget: '₹25 - 35 Cr',
      bhk: 'Commercial Plot',
      location: 'Hinjewadi Phase 3',
      stage: 'Under Negotiation',
      dpdpConsent: true,
      lastContacted: '2026-04-10'
    }
  ]);

  const filteredListings = properties.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.locality.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === 'all' || p.category === filterType;
    return matchesSearch && matchesType;
  });

  // Calculate Smart Matches
  const matchedListings = properties.map(p => {
    let score = 50;
    const reasons: string[] = [];

    // Budget match
    const askingCr = p.askingPrice / 10000000;
    if (Math.abs(askingCr - clientBudgetCr) <= 0.3) {
      score += 25;
      reasons.push(`Budget match: ${askingCr.toFixed(2)} Cr aligns closely with client's target.`);
    } else if (askingCr < clientBudgetCr) {
      score += 20;
      reasons.push(`Affordable fit: Below client's maximum ceiling.`);
    }

    // Locality match
    if (clientLocality === 'All Localities' || p.locality.toLowerCase().includes(clientLocality.toLowerCase())) {
      score += 15;
      reasons.push(`Location preference matched for ${p.locality}.`);
    }

    // Bedroom match
    if (p.bedrooms && String(p.bedrooms) === clientBhk) {
      score += 15;
      reasons.push(`${clientBhk} BHK unit specification satisfied.`);
    }

    // Vastu preference
    if (vastuPreference && p.vastuScore >= 85) {
      score += 15;
      reasons.push(`High Vastu compliance score of ${p.vastuScore}/100.`);
    }

    return {
      property: p,
      score: Math.min(score, 98),
      reasons
    };
  }).sort((a, b) => b.score - a.score);

  const formatPrice = (price: number) => {
    if (price >= 10000000) return `₹${(price / 10000000).toFixed(2)} Cr`;
    return `₹${(price / 100000).toFixed(2)} Lakh`;
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-amber-50 text-amber-700 border border-amber-200 uppercase tracking-wide">
              Segment C
            </span>
            <h1 className="text-xl font-bold text-slate-900">Realtor & Real Estate Brokerage Suite</h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Manage inventory listings, run weighted multi-parameter client matching, analyze Ready Reckoner benchmark margins, and track client inquiries.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {(['listings', 'smart_matching', 'crm'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition cursor-pointer ${
                activeTab === tab
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              {tab === 'listings' ? 'Active Listings' : tab === 'smart_matching' ? 'Smart Match Engine' : 'Leads & CRM'}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
          <span className="text-[11px] font-semibold text-slate-400 uppercase">Active Inventory</span>
          <p className="text-xl font-bold text-slate-900 mt-1">{properties.length} Properties</p>
          <span className="text-[11px] text-emerald-600 font-medium">All MahaRERA Verified</span>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
          <span className="text-[11px] font-semibold text-slate-400 uppercase">Client Enquiries</span>
          <p className="text-xl font-bold text-slate-900 mt-1">{leads.length} Active Leads</p>
          <span className="text-[11px] text-blue-600 font-medium">DPDP Consent Tracked</span>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
          <span className="text-[11px] font-semibold text-slate-400 uppercase">Average Inventory Rate</span>
          <p className="text-xl font-bold text-slate-900 mt-1">₹8,650 / sq.ft</p>
          <span className="text-[11px] text-slate-500">Pune Prime Cluster</span>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
          <span className="text-[11px] font-semibold text-slate-400 uppercase">Duplicate Alert</span>
          <p className="text-xl font-bold text-emerald-600 mt-1">0 Flagged</p>
          <span className="text-[11px] text-emerald-600 font-medium">Clean Inventory Index</span>
        </div>
      </div>

      {/* Tab 1: Listings Management */}
      {activeTab === 'listings' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3 rounded-xl border border-slate-200">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search listings by title, locality, or landmark..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
            </div>

            <div className="flex items-center gap-2">
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-3 py-1.5 rounded-lg border border-slate-300 text-xs bg-white"
              >
                <option value="all">All Categories</option>
                <option value="residential">Residential</option>
                <option value="commercial">Commercial</option>
                <option value="land">Development Land</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredListings.map((prop) => (
              <div key={prop.id} className="rounded-xl border border-slate-200 bg-white shadow-xs overflow-hidden flex flex-col justify-between hover:shadow-md transition">
                <div className="p-4 space-y-3">
                  <div className="flex items-start justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200">
                      {prop.category}
                    </span>
                    <span className="text-xs font-extrabold text-slate-900">
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
                    <div>Area: <strong>{prop.areaSqFt.toLocaleString('en-IN')} sq.ft</strong></div>
                    <div>Rate: <strong>₹{Math.round(prop.askingPrice / prop.areaSqFt).toLocaleString('en-IN')}/sq.ft</strong></div>
                    <div>Possession: <strong>{prop.possessionStatus}</strong></div>
                    <div className="flex items-center gap-1 text-emerald-700 font-semibold">
                      <Compass className="w-3 h-3" />
                      <span>Vastu: {prop.vastuScore}/100</span>
                    </div>
                  </div>

                  <div className="text-[10px] text-slate-400 space-y-0.5">
                    {prop.reraId && <div>MahaRERA: <span className="font-mono text-slate-600">{prop.reraId}</span></div>}
                    {prop.ulpinId && <div>ULPIN: <span className="font-mono text-slate-600">{prop.ulpinId}</span></div>}
                  </div>
                </div>

                <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-[10px] text-slate-500">Contact: {prop.contactPerson}</span>
                  <span className="text-blue-600 font-semibold hover:underline cursor-pointer">View Details</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Smart Client Matching Engine */}
      {activeTab === 'smart_matching' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Client Preference Inputs (4 Cols) */}
          <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
            <div className="pb-2 border-b border-slate-100 flex items-center gap-2 text-xs font-bold text-slate-900 uppercase">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Client Profile & Matching Filters</span>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Target Budget: ₹{clientBudgetCr.toFixed(2)} Cr</label>
                <input
                  type="range"
                  min="0.5"
                  max="10"
                  step="0.1"
                  value={clientBudgetCr}
                  onChange={(e) => setClientBudgetCr(parseFloat(e.target.value))}
                  className="w-full accent-amber-600"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Preferred Locality</label>
                <select
                  value={clientLocality}
                  onChange={(e) => setClientLocality(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs"
                >
                  <option value="All Localities">All Pune Localities</option>
                  <option value="Kharadi">Kharadi / East Belt</option>
                  <option value="Baner">Baner / Balewadi</option>
                  <option value="Wakad">Wakad / PCMC</option>
                  <option value="Shivaji Nagar">Shivaji Nagar / Central</option>
                  <option value="Hinjewadi">Hinjewadi IT Zone</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Bedroom Configuration</label>
                <div className="flex gap-2">
                  {['2', '3', '4'].map((bhk) => (
                    <button
                      key={bhk}
                      type="button"
                      onClick={() => setClientBhk(bhk)}
                      className={`flex-1 py-1.5 rounded-lg border text-xs font-semibold cursor-pointer ${
                        clientBhk === bhk
                          ? 'bg-amber-600 text-white border-amber-600'
                          : 'bg-white border-slate-200 text-slate-700'
                      }`}
                    >
                      {bhk} BHK
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={vastuPreference}
                    onChange={(e) => setVastuPreference(e.target.checked)}
                    className="rounded border-slate-300 text-amber-600 focus:ring-amber-500"
                  />
                  <span className="text-xs text-slate-700 font-medium">Prioritize High Vastu Score (&gt; 85%)</span>
                </label>
              </div>
            </div>
          </div>

          {/* Matched Recommendations (8 Cols) */}
          <div className="lg:col-span-8 space-y-4">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Algorithm Recommendations ({matchedListings.length} Matches Ranked)
            </h3>

            <div className="space-y-3">
              {matchedListings.slice(0, 3).map(({ property, score, reasons }) => (
                <div key={property.id} className="p-4 rounded-xl border border-slate-200 bg-white shadow-xs space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-900">{property.title}</span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                          {score}% Match
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">{property.locality} • {formatPrice(property.askingPrice)}</p>
                    </div>

                    <button
                      onClick={() => alert(`Connecting with listing broker for: ${property.title}`)}
                      className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold cursor-pointer shadow-xs"
                    >
                      Share with Client
                    </button>
                  </div>

                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 text-[11px] text-slate-600 space-y-1">
                    <span className="font-semibold text-slate-800">Why this property matches:</span>
                    <ul className="list-disc list-inside space-y-0.5">
                      {reasons.map((r, idx) => <li key={idx}>{r}</li>)}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: CRM & Client Leads */}
      {activeTab === 'crm' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div>
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Client Pipeline & DPDP Privacy Records
              </h3>
              <p className="text-[11px] text-slate-500">Contact information is strictly governed and masked according to DPDP Act 2023 consent records.</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 font-semibold uppercase text-[10px]">
                  <th className="py-2">Client Name</th>
                  <th className="py-2">Requirement</th>
                  <th className="py-2">Budget Target</th>
                  <th className="py-2">Pipeline Stage</th>
                  <th className="py-2">DPDP Consent</th>
                  <th className="py-2 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {leads.map((ld) => (
                  <tr key={ld.id}>
                    <td className="py-3 font-semibold text-slate-900">{ld.name}</td>
                    <td className="py-3">{ld.bhk} in {ld.location}</td>
                    <td className="py-3 font-medium text-emerald-700">{ld.budget}</td>
                    <td className="py-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                        {ld.stage}
                      </span>
                    </td>
                    <td className="py-3">
                      <span className="inline-flex items-center gap-1 text-[11px] text-emerald-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                        <span>Granted</span>
                      </span>
                    </td>
                    <td className="py-3 text-right">
                      <button 
                        onClick={() => alert(`Dispatching site visit invitation to ${ld.name}`)}
                        className="text-blue-600 hover:text-blue-800 font-semibold cursor-pointer"
                      >
                        Initiate Site Visit
                      </button>
                    </td>
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
