'use client';

import React, { useState } from 'react';
import { 
  CalendarDays, 
  Sparkles, 
  Hash, 
  HelpCircle, 
  CheckCircle2, 
  Info,
  Calendar,
  Flame
} from 'lucide-react';
import { 
  NUMEROLOGY_MAP, 
  reduceToSingleDigit, 
  UPCOMING_MUHURTAS, 
  MuhurtaEvent 
} from '@/data/numerologyMuhurtaData';

export default function NumerologyMuhurtaModule() {
  const [flatNumberInput, setFlatNumberInput] = useState('245');
  const [birthDateInput, setBirthDateInput] = useState('1992-06-24');
  const [activeTab, setActiveTab] = useState<'numerology' | 'muhurta' | 'rituals'>('numerology');

  // Numerology Reduction
  const reducedPropertyNumber = reduceToSingleDigit(flatNumberInput);
  const propertyMeaning = NUMEROLOGY_MAP[reducedPropertyNumber] || NUMEROLOGY_MAP[1];

  // Birth Number Reduction (Day of Month)
  const dayOfMonth = birthDateInput ? parseInt(birthDateInput.split('-')[2] || '1', 10) : 1;
  const reducedBirthNumber = reduceToSingleDigit(dayOfMonth);
  const birthMeaning = NUMEROLOGY_MAP[reducedBirthNumber] || NUMEROLOGY_MAP[1];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 rounded-2xl p-6 text-white shadow-md border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 text-[11px] font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Traditional Purchase Timing & Numerology Guide</span>
          </div>
          <h1 className="text-xl font-bold font-serif text-white">
            Numerology Calculator & Muhurta Shastra Guide
          </h1>
          <p className="text-xs text-slate-300 leading-relaxed">
            Derived from the foundational <em>Astrology, Numerology, Vastu & Home Purchase Guide</em>. Explore house number reduction, personal birth number harmony, and auspicious timings for agreement signing and Griha Pravesh.
          </p>
        </div>
      </div>

      {/* Cultural Disclaimer */}
      <div className="p-3.5 rounded-xl bg-slate-100 border border-slate-300 text-slate-700 text-xs flex items-start gap-2.5 shadow-xs leading-relaxed">
        <Info className="w-4 h-4 text-slate-500 flex-shrink-0 mt-0.5" />
        <div>
          <span className="font-bold">Educational Clarification: </span>
          <span>Numerology and Muhurta are traditional symbolic belief systems. They provide cultural enrichment and should not replace financial affordability calculations, title deed scrutiny, or engineering inspections.</span>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
        <button
          onClick={() => setActiveTab('numerology')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
            activeTab === 'numerology'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          House & Personal Number Reduction
        </button>
        <button
          onClick={() => setActiveTab('muhurta')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
            activeTab === 'muhurta'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          Auspicious Muhurta Calendar
        </button>
        <button
          onClick={() => setActiveTab('rituals')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
            activeTab === 'rituals'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          Griha Pravesh Ritual Protocol
        </button>
      </div>

      {/* Tab 1: Numerology */}
      {activeTab === 'numerology' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Inputs (5 Cols) */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <Hash className="w-4 h-4 text-indigo-600" />
              <span>Enter Property & Personal Details</span>
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">
                  Flat / House / Plot Number
                </label>
                <input
                  type="text"
                  value={flatNumberInput}
                  onChange={(e) => setFlatNumberInput(e.target.value)}
                  placeholder="e.g. 245 or B-402"
                  className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs font-mono font-bold text-slate-800"
                />
                <span className="text-[10px] text-slate-400">
                  Example from guide: Flat 245 → 2 + 4 + 5 = 11 → 1 + 1 = 2
                </span>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">
                  Primary Buyer's Date of Birth
                </label>
                <input
                  type="date"
                  value={birthDateInput}
                  onChange={(e) => setBirthDateInput(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs font-semibold"
                />
                <span className="text-[10px] text-slate-400">
                  Birth Day {dayOfMonth} reduces to Birth Number {reducedBirthNumber}
                </span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
              <span className="font-semibold text-slate-800">Reduction Calculation:</span>
              <p className="text-[11px] text-slate-600">
                Property digits reduce to <strong>Single Digit {reducedPropertyNumber}</strong> ({propertyMeaning.planet}).
              </p>
              <p className="text-[11px] text-slate-600">
                Buyer birth day reduces to <strong>Birth Number {reducedBirthNumber}</strong> ({birthMeaning.planet}).
              </p>
            </div>
          </div>

          {/* Results & Meanings (7 Cols) */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-5">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Traditional Vibrational Attributes
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-indigo-50 border border-indigo-200">
                <span className="text-[10px] font-bold text-indigo-700 uppercase">Property Number</span>
                <p className="text-3xl font-black text-indigo-950 mt-1">{reducedPropertyNumber}</p>
                <span className="text-xs font-semibold text-indigo-700">{propertyMeaning.symbolism}</span>
                <p className="text-[11px] text-slate-600 mt-2">{propertyMeaning.traditionalAssociation}</p>
              </div>

              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200">
                <span className="text-[10px] font-bold text-amber-700 uppercase">Buyer Birth Number</span>
                <p className="text-3xl font-black text-amber-950 mt-1">{reducedBirthNumber}</p>
                <span className="text-xs font-semibold text-amber-700">{birthMeaning.symbolism}</span>
                <p className="text-[11px] text-slate-600 mt-2">{birthMeaning.favorableFor}</p>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2 text-xs">
              <h4 className="font-bold text-slate-800">Interior Color & Harmony Palette:</h4>
              <p className="text-slate-600">
                Harmonizing colors for property vibration {reducedPropertyNumber}: <strong>{propertyMeaning.colorHarmony}</strong>.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Muhurta Calendar */}
      {activeTab === 'muhurta' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Auspicious Muhurta Windows (Q4 2026)
              </h3>
              <p className="text-xs text-slate-500">
                Consulted for booking agreements, sale deed execution at Sub-Registrar Office, and Bhoomi Pujan rituals.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {UPCOMING_MUHURTAS.map((muh) => (
              <div key={muh.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
                    {muh.category}
                  </span>
                  <span className="font-semibold text-slate-800">{muh.idealTimeSlot}</span>
                </div>

                <h4 className="font-bold text-slate-900 text-sm mt-1">{muh.dateStr}</h4>
                <p className="text-slate-600 text-[11px]">{muh.significance}</p>

                <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between text-[10px] text-slate-500">
                  <span>Tithi: {muh.auspiciousTithi}</span>
                  <span>Nakshatra: {muh.nakshatra}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Griha Pravesh Rituals */}
      {activeTab === 'rituals' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4 max-w-3xl">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
            <Flame className="w-4 h-4 text-amber-500" />
            <span>Traditional Griha Pravesh Ceremonial Sequence</span>
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Griha Pravesh is the traditional house-entry ceremony performed when moving into a newly purchased home to inaugurate peace, blessings, and prosperity.
          </p>

          <div className="space-y-3 pt-2">
            {[
              { step: '1. Toran & Main Threshold Bandhan', desc: 'Decorate main entrance door with fresh mango leaves and marigold garland to invite positive prana.' },
              { step: '2. Kalash Sthapana & First Step', desc: 'Family head enters holding a copper Kalash filled with sacred water and coconut, taking right foot first.' },
              { step: '3. Ganesh Puja & Navagraha Shanti', desc: 'Invocations to Lord Ganesha for obstacle removal and planetary equilibrium.' },
              { step: '4. Vastu Purusha & Agni Havan', desc: 'Consecration of the central Brahmasthan and purification of spatial ether.' },
              { step: '5. Boiling Milk Ceremony', desc: 'Milk is boiled in an open vessel in the kitchen until it gently overflows, symbolizing abundance and prosperity.' },
              { step: '6. Charity & Annadanam', desc: 'Sharing a meal and providing service or dakshina to workers and elders.' }
            ].map((r, i) => (
              <div key={i} className="p-3 rounded-xl border border-slate-200 bg-slate-50/50 flex items-start gap-3 text-xs">
                <span className="w-5 h-5 rounded-full bg-amber-500 text-slate-950 font-bold flex items-center justify-center flex-shrink-0 text-[10px] mt-0.5">
                  {i + 1}
                </span>
                <div>
                  <h4 className="font-bold text-slate-900">{r.step}</h4>
                  <p className="text-slate-600 text-[11px] mt-0.5">{r.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
