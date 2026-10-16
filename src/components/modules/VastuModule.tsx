'use client';

import React, { useState } from 'react';
import { 
  Compass, 
  Sparkles, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  HelpCircle, 
  Download, 
  Printer, 
  Info,
  Layers,
  ArrowRight
} from 'lucide-react';
import { 
  DIRECTION_ATTRIBUTES, 
  VASTU_RULES_DATABASE, 
  VASTU_DISCLAIMER_TEXT, 
  evaluateVastuLayout 
} from '@/data/vastuKnowledgeData';
import { VastuZone, VastuAssessmentResult } from '@/types';

const GRID_CELLS: { zone: VastuZone; label: string; element: string; color: string }[] = [
  { zone: 'NW', label: 'North-West (Vayavya)', element: 'Air', color: 'bg-sky-50 border-sky-200' },
  { zone: 'N', label: 'North (Uttar)', element: 'Water / Kubera', color: 'bg-emerald-50 border-emerald-200' },
  { zone: 'NE', label: 'North-East (Ishanya)', element: 'Water / Spiritual', color: 'bg-cyan-50 border-cyan-200' },
  { zone: 'W', label: 'West (Paschim)', element: 'Air / Saturn', color: 'bg-indigo-50 border-indigo-200' },
  { zone: 'CENTER', label: 'Center (Brahmasthan)', element: 'Ether / Space', color: 'bg-amber-50/50 border-amber-300' },
  { zone: 'E', label: 'East (Purva)', element: 'Solar / Health', color: 'bg-teal-50 border-teal-200' },
  { zone: 'SW', label: 'South-West (Nairutya)', element: 'Earth / Heavy', color: 'bg-orange-50 border-orange-200' },
  { zone: 'S', label: 'South (Dakshin)', element: 'Earth / Rest', color: 'bg-red-50 border-red-200' },
  { zone: 'SE', label: 'South-East (Agneya)', element: 'Fire (Agni)', color: 'bg-rose-50 border-rose-200' },
];

const ROOM_OPTIONS = [
  'Main Entrance',
  'Kitchen (Cooking Platform)',
  'Master Bedroom',
  'Puja Room / Mandir',
  'Bathroom / Toilet',
  'Staircase',
  'Commercial Cash Counter / Accounts'
];

export default function VastuModule() {
  const [propertyTitle, setPropertyTitle] = useState('Pride Panorama 3BHK Residence, Shivaji Nagar');
  const [propertyType, setPropertyType] = useState('Flat / Apartment');
  const [entranceDirection, setEntranceDirection] = useState<VastuZone>('E');
  
  // Placements State
  const [roomPlacements, setRoomPlacements] = useState<Record<string, VastuZone>>({
    'Kitchen (Cooking Platform)': 'SE',
    'Master Bedroom': 'SW',
    'Puja Room / Mandir': 'NE',
    'Bathroom / Toilet': 'NW',
    'Staircase': 'S'
  });

  const [activeTab, setActiveTab] = useState<'interactive_analyzer' | 'categories' | 'report'>('interactive_analyzer');

  // Run Real-Time Assessment
  const assessmentResult: VastuAssessmentResult = evaluateVastuLayout(
    propertyTitle,
    propertyType,
    entranceDirection,
    roomPlacements
  );

  const handleRoomZoneChange = (room: string, zone: VastuZone) => {
    setRoomPlacements(prev => ({ ...prev, [room]: zone }));
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'favorable':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">Favorable Alignment</span>;
      case 'neutral':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200">Moderate / Neutral</span>;
      case 'caution':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">Review Recommended</span>;
      case 'critical':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200">Traditional Dosh Concern</span>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 rounded-2xl p-6 text-white shadow-md border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30 text-[11px] font-semibold">
            <Compass className="w-3.5 h-3.5" />
            <span>Traditional Indian Spatial Architecture</span>
          </div>
          <h1 className="text-xl font-bold font-serif text-white">
            Vastu Dosh Intelligence & Property Layout Engine
          </h1>
          <p className="text-xs text-slate-300 leading-relaxed">
            Rule-based spatial analysis grounded in traditional Vedic architectural principles. Evaluates 18 property categories, detects directional conflicts, and provides practical non-invasive remedies.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs shadow-xs transition cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Vastu Audit</span>
          </button>
        </div>
      </div>

      {/* Mandatory Scientific Disclaimer Banner */}
      <div className="p-3.5 rounded-xl bg-amber-50/80 border border-amber-200 text-amber-900 text-xs flex items-start gap-2.5 shadow-xs leading-relaxed">
        <Info className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
        <div>
          <span className="font-bold">Scientific & Cultural Clarification: </span>
          <span>{VASTU_DISCLAIMER_TEXT}</span>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
        <button
          onClick={() => setActiveTab('interactive_analyzer')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
            activeTab === 'interactive_analyzer'
              ? 'bg-amber-600 text-white shadow-xs'
              : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          Interactive 3×3 Layout Analyzer
        </button>
        <button
          onClick={() => setActiveTab('categories')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
            activeTab === 'categories'
              ? 'bg-amber-600 text-white shadow-xs'
              : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          18 Property Vastu Categories
        </button>
        <button
          onClick={() => setActiveTab('report')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
            activeTab === 'report'
              ? 'bg-amber-600 text-white shadow-xs'
              : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          Formal Assessment Report
        </button>
      </div>

      {/* Tab 1: Interactive 3x3 Layout Grid */}
      {activeTab === 'interactive_analyzer' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Grid & Compass View (6 Cols) */}
          <div className="lg:col-span-6 bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-amber-600" />
                <span>3×3 Cardinal & Ordinal Compass Grid</span>
              </h3>
              <span className="text-[10px] text-slate-400">Padavinyasa Framework</span>
            </div>

            {/* 3x3 Visual Compass Matrix */}
            <div className="grid grid-cols-3 gap-2.5 aspect-square max-w-md mx-auto p-2 rounded-xl bg-slate-900 shadow-inner">
              {GRID_CELLS.map((cell) => {
                // Find rooms assigned to this zone
                const assignedRooms = Object.entries(roomPlacements)
                  .filter(([_, z]) => z === cell.zone)
                  .map(([r]) => r.split('(')[0].trim());

                const isEntrance = entranceDirection === cell.zone;

                return (
                  <div
                    key={cell.zone}
                    className={`rounded-lg p-2 flex flex-col justify-between border transition-all duration-200 text-slate-900 ${cell.color} ${
                      isEntrance ? 'ring-2 ring-amber-500 shadow-md' : ''
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-extrabold uppercase font-mono">{cell.zone}</span>
                      <span className="text-[8px] text-slate-500 uppercase">{cell.element}</span>
                    </div>

                    <div className="space-y-1 my-1">
                      {isEntrance && (
                        <div className="px-1.5 py-0.5 rounded bg-amber-500 text-slate-950 font-bold text-[9px] shadow-xs inline-block">
                          🚪 Main Door
                        </div>
                      )}
                      {assignedRooms.map((rm, idx) => (
                        <div key={idx} className="px-1.5 py-0.5 rounded bg-white/90 text-slate-800 font-semibold text-[9px] border border-slate-300 truncate shadow-2xs">
                          {rm}
                        </div>
                      ))}
                    </div>

                    <span className="text-[8px] text-slate-400 truncate">{cell.label.split('(')[0]}</span>
                  </div>
                );
              })}
            </div>

            {/* Config Controls */}
            <div className="space-y-3 pt-2 text-xs border-t border-slate-100">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Main Entrance Facing</label>
                <select
                  value={entranceDirection}
                  onChange={(e) => setEntranceDirection(e.target.value as VastuZone)}
                  className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs font-semibold text-slate-800"
                >
                  {Object.entries(DIRECTION_ATTRIBUTES).map(([zKey, attr]) => (
                    <option key={zKey} value={zKey}>
                      {attr.name} — {attr.nature}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <span className="block text-slate-700 font-semibold">Assign Room Positions on Compass:</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {ROOM_OPTIONS.slice(1).map((room) => (
                    <div key={room} className="p-2 rounded-lg bg-slate-50 border border-slate-200 flex flex-col justify-between gap-1">
                      <span className="text-[11px] font-medium text-slate-700 truncate">{room.split('(')[0]}</span>
                      <select
                        value={roomPlacements[room] || 'NE'}
                        onChange={(e) => handleRoomZoneChange(room, e.target.value as VastuZone)}
                        className="px-2 py-1 rounded border border-slate-300 text-[11px] bg-white font-semibold"
                      >
                        {Object.entries(DIRECTION_ATTRIBUTES).map(([zKey, attr]) => (
                          <option key={zKey} value={zKey}>{zKey} ({attr.name.split('(')[1]?.replace(')', '') || zKey})</option>
                        ))}
                      </select>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Audit Results & Findings (6 Cols) */}
          <div className="lg:col-span-6 space-y-4">
            {/* Score & Health Card */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Overall Spatial Harmony Score</span>
                <h3 className="text-2xl font-black text-slate-900 mt-0.5">
                  {assessmentResult.score} <span className="text-sm font-normal text-slate-500">/ 100</span>
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Based on 7 directional placement checks for {propertyType}.
                </p>
              </div>

              <div className="w-16 h-16 rounded-full border-4 border-amber-500 flex items-center justify-center font-bold text-amber-700 bg-amber-50">
                {assessmentResult.score}%
              </div>
            </div>

            {/* Findings List */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Audited Findings & Practical Non-Destructive Remedies
              </h3>

              <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
                {assessmentResult.findings.map((f) => (
                  <div key={f.id} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900">{f.roomType}</span>
                      {getSeverityBadge(f.severity)}
                    </div>

                    <p className="text-slate-600 text-[11px] leading-relaxed">{f.explanation}</p>

                    <div className="p-2.5 rounded-lg bg-white border border-slate-200 space-y-1 text-[11px]">
                      <div>
                        <span className="font-semibold text-blue-700">Practical Adjustment: </span>
                        <span className="text-slate-700">{f.practicalSuggestion}</span>
                      </div>
                      <div>
                        <span className="font-semibold text-amber-700">Traditional Remedy: </span>
                        <span className="text-slate-700">{f.traditionalRemedy}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: 18 Categories Reference */}
      {activeTab === 'categories' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            18 Property-Specific Vastu Assessment Categories
          </h3>
          <p className="text-xs text-slate-500">
            Derived directly from the foundational <em>Astrology, Numerology, Vastu & Home Purchase Guide</em>.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs pt-2">
            {[
              { title: '1. Residential Plots', desc: 'Slope towards North/East, square or rectangular shape, avoidance of irregular T-junction cuts.' },
              { title: '2. Flats & Apartments', desc: 'Orientation of main balcony, entrance door, placement of overhead water reservoirs.' },
              { title: '3. Independent Houses', desc: 'Height gradient: South-West highest and heaviest, North-East lowest.' },
              { title: '4. Bungalows', desc: 'Compound wall thickness (SW thicker, NE lighter), central open courtyard.' },
              { title: '5. Main Doors & Entrances', desc: 'Auspicious pada in North (Kubera) or East (Indra); avoidance of South-West.' },
              { title: '6. Bedrooms & Sleep Direction', desc: 'Master in SW for family head stability; head pointing South or East while sleeping.' },
              { title: '7. Kitchen & Fire Appliances', desc: 'South-East (Agneya) primary fire zone; cooking platform facing East.' },
              { title: '8. Bathrooms & Toilets', desc: 'North-West (Vayavya); strict avoidance of North-East (Ishanya) and Brahmasthan.' },
              { title: '9. Staircases', desc: 'South or West placement; ascending in a clockwise (Pradakshina) direction.' },
              { title: '10. Puja Room / Mandir', desc: 'North-East corner with idol facing West so devotees face East while praying.' },
              { title: '11. Gardens & Landscaping', desc: 'Large dense shade trees in South/West; light flowering tulsi shrubs in North/East.' },
              { title: '12. Offices & Commercial', desc: 'Director seating in South-West facing North/East; reception at entrance.' },
              { title: '13. Shops & Retail Stores', desc: 'Main counter in North; cash drawer opening towards North.' },
              { title: '14. Factories & Industrial', desc: 'Boilers and furnaces in SE; heavy machinery in SW; finished goods in NW.' },
              { title: '15. Furniture Placement', desc: 'Heavy solid wardrobes placed along South and West walls.' },
              { title: '16. Color Considerations', desc: 'Light calming tones (ivory, pastel green, sky blue) avoiding harsh blacks.' },
              { title: '17. Five-Element Balance', desc: 'Harmonizing Water (NE), Fire (SE), Earth (SW), Air (NW), and Space (Center).' },
              { title: '18. Directional Zone Analysis', desc: '8 Cardinal & Ordinal directions plus central Brahmasthan coordinate alignment.' }
            ].map((cat, idx) => (
              <div key={idx} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-1">
                <h4 className="font-bold text-slate-900">{cat.title}</h4>
                <p className="text-slate-600 text-[11px] leading-relaxed">{cat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Formal Assessment Report */}
      {activeTab === 'report' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-xs space-y-6 max-w-3xl mx-auto">
          <div className="border-b border-slate-200 pb-4 flex items-start justify-between">
            <div>
              <span className="text-[10px] uppercase font-bold text-amber-600">VM Intellect EstateIQ AI</span>
              <h2 className="text-lg font-bold text-slate-900">Vastu Shastra Property Assessment Report</h2>
              <p className="text-xs text-slate-500">{propertyTitle} • {propertyType}</p>
            </div>
            <div className="text-right">
              <span className="text-xs font-mono text-slate-400">ID: {assessmentResult.id}</span>
              <p className="text-[10px] text-slate-400">Date: {new Date(assessmentResult.createdAt).toLocaleDateString()}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-xs">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-slate-400 uppercase text-[10px] font-semibold">Entrance Orientation:</span>
              <p className="font-bold text-slate-800 text-sm mt-0.5">{DIRECTION_ATTRIBUTES[entranceDirection].name}</p>
            </div>
            <div className="p-3 rounded-xl bg-amber-50 border border-amber-200">
              <span className="text-amber-700 uppercase text-[10px] font-semibold">Spatial Compliance Score:</span>
              <p className="font-bold text-amber-900 text-sm mt-0.5">{assessmentResult.score} / 100</p>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase">Room-by-Room Evaluation:</h4>
            <div className="divide-y divide-slate-100 text-xs">
              {assessmentResult.findings.map((f, i) => (
                <div key={i} className="py-2.5 flex justify-between items-start gap-4">
                  <div>
                    <span className="font-semibold text-slate-900">{f.roomType}</span>
                    <p className="text-slate-500 text-[11px]">{f.explanation}</p>
                  </div>
                  {getSeverityBadge(f.severity)}
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-500 italic leading-relaxed">
            {VASTU_DISCLAIMER_TEXT}
          </div>
        </div>
      )}
    </div>
  );
}
