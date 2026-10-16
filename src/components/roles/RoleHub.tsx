'use client';

import React from 'react';
import { UserRole } from '@/types';
import { 
  Building2, 
  Trees, 
  Briefcase, 
  Home, 
  ArrowRight, 
  Calculator, 
  ShieldCheck, 
  Compass, 
  TrendingUp, 
  Layers, 
  Sparkles,
  CheckCircle2,
  FileText
} from 'lucide-react';
import { NavigationTab } from '../layout/Sidebar';

interface RoleHubProps {
  currentRole: UserRole;
  onSelectRole: (role: UserRole) => void;
  onNavigateTab: (tab: NavigationTab) => void;
  userName: string;
}

export default function RoleHub({
  currentRole,
  onSelectRole,
  onNavigateTab,
  userName,
}: RoleHubProps) {

  const rolesConfig = [
    {
      id: 'builder' as UserRole,
      title: 'Builder / Developer Panel',
      badge: 'Acquisition & Economics',
      icon: Building2,
      color: 'from-blue-600 to-indigo-700',
      textColor: 'text-indigo-600',
      bgColor: 'bg-indigo-50/60 border-indigo-200',
      desc: 'Evaluate plots, assess development feasibility, study market demand, analyse construction economics, and compare development scenarios.',
      keyWorkflows: [
        'Configurable Feasibility Engine (Low/Base/High)',
        'FSI / FAR & Construction Cost Sensitivities',
        'Ready Reckoner Land Benchmark vs Asking',
        'Downloadable Project Feasibility PDF Report'
      ],
      actionLabel: 'Enter Builder Workspace',
      targetTab: 'builder' as NavigationTab
    },
    {
      id: 'landowner' as UserRole,
      title: 'Land Owner Panel',
      badge: 'Valuation & Options',
      icon: Trees,
      color: 'from-emerald-600 to-teal-700',
      textColor: 'text-emerald-600',
      bgColor: 'bg-emerald-50/60 border-emerald-200',
      desc: 'Understand land value, explore development possibilities, compare market prices with official benchmark rates, and prepare property information.',
      keyWorkflows: [
        'Opportunity Matrix: Sell vs Lease vs JDA vs Self-Develop',
        'Maharashtra ASR Benchmark & Safe Harbor Analysis',
        '7/12 Satbara Extract & Mutation Due Diligence',
        'Property Data Completeness & Vastu Readiness'
      ],
      actionLabel: 'Enter Land Owner Workspace',
      targetTab: 'landowner' as NavigationTab
    },
    {
      id: 'realtor' as UserRole,
      title: 'Realtor / Real Estate Agent Panel',
      badge: 'Listings & Smart Matching',
      icon: Briefcase,
      color: 'from-amber-600 to-orange-700',
      textColor: 'text-amber-600',
      bgColor: 'bg-amber-50/60 border-amber-200',
      desc: 'Manage property listings, analyse price benchmarks, match properties with client requirements, and organise leads.',
      keyWorkflows: [
        'Listing Management with Duplicate Detection Alert',
        'Smart Multi-Parameter Client Matching Engine',
        'Market Pricing Distribution & Benchmark Deviation',
        'Privacy-Preserving CRM Leads Management'
      ],
      actionLabel: 'Enter Realtor Workspace',
      targetTab: 'realtor' as NavigationTab
    },
    {
      id: 'buyer' as UserRole,
      title: 'Customer / Property Buyer Panel',
      badge: 'Discovery & Affordability',
      icon: Home,
      color: 'from-cyan-600 to-blue-700',
      textColor: 'text-blue-600',
      bgColor: 'bg-blue-50/60 border-blue-200',
      desc: 'Discover properties, estimate affordability, compare options, review surrounding facilities, and examine property layouts through the Vastu module.',
      keyWorkflows: [
        'Multi-Property Side-by-Side Comparison Matrix',
        'Complete Acquisition Cost & EMI Calculator',
        'Vastu Dosh Floor Plan Review Integration',
        'Nearby Infrastructure & Transit Scoring'
      ],
      actionLabel: 'Enter Buyer Workspace',
      targetTab: 'buyer' as NavigationTab
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Top Welcome Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 p-6 sm:p-8 text-white shadow-lg border border-slate-800 relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-radial from-blue-500/10 to-transparent pointer-events-none" />
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-amber-300 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>VM Intellect Real Estate Intelligence Platform</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-serif tracking-tight text-white">
            Welcome, {userName}
          </h1>
          <p className="mt-2 text-sm text-slate-300 leading-relaxed">
            Select an operational persona below to access specialized decision tools, economic models, and statutory workflows tailored to your real estate requirements.
          </p>

          <div className="mt-6 flex flex-wrap gap-4 text-xs text-slate-300">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Maharashtra ASR FY 2025-26</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>DPDP Act 2023 Rules 2025</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>18-Category Vastu Dosh Engine</span>
            </div>
          </div>
        </div>
      </div>

      {/* The 4 Core Persona Segments */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Primary Persona Dashboards</h2>
            <p className="text-xs text-slate-500">Each segment provides dedicated tools, verified calculations, and exportable reports.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {rolesConfig.map((role) => {
            const Icon = role.icon;
            const isCurrent = currentRole === role.id;

            return (
              <div
                key={role.id}
                className={`rounded-2xl border transition-all duration-300 p-6 flex flex-col justify-between hover:shadow-xl bg-white relative overflow-hidden ${
                  isCurrent ? 'ring-2 ring-blue-600 border-blue-300 shadow-md' : 'border-slate-200'
                }`}
              >
                {/* Active Indicator Pin */}
                {isCurrent && (
                  <div className="absolute top-0 right-0 bg-blue-600 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-bl-xl shadow-xs">
                    Current Persona
                  </div>
                )}

                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${role.color} text-white shadow-md`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <span className={`text-[11px] font-bold uppercase tracking-wider ${role.textColor}`}>
                        {role.badge}
                      </span>
                      <h3 className="text-lg font-bold text-slate-900">{role.title}</h3>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {role.desc}
                  </p>

                  <div className="space-y-2 mb-6">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      Core Workflows:
                    </span>
                    <ul className="space-y-1.5">
                      {role.keyWorkflows.map((wf, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-xs text-slate-700">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                          <span>{wf}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <button
                    onClick={() => {
                      onSelectRole(role.id);
                      onNavigateTab(role.targetTab);
                    }}
                    className={`w-full py-2.5 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition cursor-pointer ${
                      isCurrent
                        ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-md'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                    }`}
                  >
                    <span>{role.actionLabel}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Direct Pillars Quick Access Bar */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
        <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
          <Layers className="w-4 h-4 text-blue-600" />
          <span>Cross-Platform Statutory & Intelligence Pillars</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <button
            onClick={() => onNavigateTab('ready_reckoner')}
            className="p-4 rounded-xl border border-slate-200 hover:border-blue-400 hover:shadow-md transition text-left cursor-pointer group bg-slate-50/50"
          >
            <div className="flex items-center gap-2 text-blue-600 mb-1.5">
              <Calculator className="w-4 h-4" />
              <span className="text-xs font-bold text-slate-900 group-hover:text-blue-600">
                Ready Reckoner (ASR)
              </span>
            </div>
            <p className="text-[11px] text-slate-500">
              Department of Registration & Stamps Maharashtra official rates and safe harbor calculators.
            </p>
          </button>

          <button
            onClick={() => onNavigateTab('dpdp')}
            className="p-4 rounded-xl border border-slate-200 hover:border-emerald-400 hover:shadow-md transition text-left cursor-pointer group bg-slate-50/50"
          >
            <div className="flex items-center gap-2 text-emerald-600 mb-1.5">
              <ShieldCheck className="w-4 h-4" />
              <span className="text-xs font-bold text-slate-900 group-hover:text-emerald-600">
                DPDP Act & Privacy
              </span>
            </div>
            <p className="text-[11px] text-slate-500">
              Personal data inventory, RoPA records, consent logs, and data principal right execution.
            </p>
          </button>

          <button
            onClick={() => onNavigateTab('vastu')}
            className="p-4 rounded-xl border border-slate-200 hover:border-amber-400 hover:shadow-md transition text-left cursor-pointer group bg-slate-50/50"
          >
            <div className="flex items-center gap-2 text-amber-600 mb-1.5">
              <Compass className="w-4 h-4" />
              <span className="text-xs font-bold text-slate-900 group-hover:text-amber-600">
                Vastu Dosh Intelligence
              </span>
            </div>
            <p className="text-[11px] text-slate-500">
              Interactive 3x3 layout analyzer, 18-category assessment, and non-destructive traditional remedies.
            </p>
          </button>
        </div>
      </div>
    </div>
  );
}
