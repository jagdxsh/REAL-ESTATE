'use client';

import React from 'react';
import { 
  LayoutDashboard,
  Building2, 
  Trees, 
  Briefcase, 
  Home, 
  Calculator, 
  ShieldCheck, 
  Compass, 
  Sparkles, 
  FileCheck2, 
  Database, 
  SlidersHorizontal,
  Bot,
  Layers,
  CalendarDays
} from 'lucide-react';
import { UserRole } from '@/types';

export type NavigationTab = 
  | 'hub' 
  | 'builder' 
  | 'landowner' 
  | 'realtor' 
  | 'buyer' 
  | 'ready_reckoner' 
  | 'dpdp' 
  | 'vastu' 
  | 'numerology' 
  | 'due_diligence' 
  | 'properties' 
  | 'ingestion' 
  | 'ai_assistant' 
  | 'admin';

interface NavItem {
  id: NavigationTab;
  label: string;
  icon: any;
  badge?: string;
  roleMatch?: UserRole | string;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

interface SidebarProps {
  activeTab: NavigationTab;
  onSelectTab: (tab: NavigationTab) => void;
  currentRole: UserRole;
  collapsed: boolean;
  onToggleCollapse: () => void;
}

export default function Sidebar({
  activeTab,
  onSelectTab,
  currentRole,
  collapsed,
  onToggleCollapse,
}: SidebarProps) {

  const navSections: NavSection[] = [
    {
      title: 'Role Dashboards',
      items: [
        { id: 'hub', label: 'Persona Hub', icon: LayoutDashboard, badge: 'Main' },
        { id: 'builder', label: 'Builder / Developer', icon: Building2, roleMatch: 'builder' },
        { id: 'landowner', label: 'Land Owner', icon: Trees, roleMatch: 'landowner' },
        { id: 'realtor', label: 'Realtor / Agent', icon: Briefcase, roleMatch: 'realtor' },
        { id: 'buyer', label: 'Customer / Buyer', icon: Home, roleMatch: 'buyer' },
      ]
    },
    {
      title: 'Core Intelligence Modules',
      items: [
        { id: 'ready_reckoner', label: 'Ready Reckoner (ASR)', icon: Calculator, badge: 'Govt IGR' },
        { id: 'dpdp', label: 'DPDP Act & Privacy', icon: ShieldCheck, badge: 'Govt 2025' },
        { id: 'vastu', label: 'Vastu Dosh Intelligence', icon: Compass, badge: 'Core' },
        { id: 'numerology', label: 'Numerology & Muhurta', icon: CalendarDays },
        { id: 'due_diligence', label: 'Title & Due Diligence', icon: FileCheck2 },
        { id: 'properties', label: 'Property Discovery', icon: Layers },
        { id: 'ingestion', label: 'Data Ingestion & Quality', icon: Database, badge: 'ETL' },
        { id: 'ai_assistant', label: 'EstateIQ AI Copilot', icon: Bot, badge: 'AI' },
      ]
    },
    {
      title: 'Administration',
      items: [
        { id: 'admin', label: 'Admin & System Health', icon: SlidersHorizontal, roleMatch: 'admin' },
      ]
    }
  ];

  return (
    <aside 
      className={`bg-slate-900 text-slate-300 flex flex-col border-r border-slate-800 transition-all duration-300 z-30 select-none ${
        collapsed ? 'w-16' : 'w-64'
      }`}
    >
      {/* Sidebar Header / Project Identifier */}
      <div className="p-4 border-b border-slate-800 flex items-center justify-between">
        {!collapsed && (
          <div className="flex flex-col">
            <span className="text-xs uppercase font-bold tracking-wider text-amber-400">
              EstateIQ AI
            </span>
            <span className="text-[10px] text-slate-400">
              Enterprise Suite v2.4
            </span>
          </div>
        )}
        <button
          onClick={onToggleCollapse}
          className="p-1.5 rounded-md hover:bg-slate-800 text-slate-400 hover:text-white transition cursor-pointer mx-auto"
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <Layers className="w-4 h-4" />
        </button>
      </div>

      {/* Nav List */}
      <div className="flex-1 overflow-y-auto py-3 px-2 space-y-6">
        {navSections.map((section, sIdx) => (
          <div key={sIdx}>
            {!collapsed && (
              <h3 className="px-3 text-[10px] uppercase font-bold tracking-wider text-slate-400 mb-1.5">
                {section.title}
              </h3>
            )}
            <div className="space-y-0.5">
              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                const isRoleRecommended = item.roleMatch === currentRole;

                return (
                  <button
                    key={item.id}
                    onClick={() => onSelectTab(item.id as NavigationTab)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition cursor-pointer group ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-xs font-semibold'
                        : isRoleRecommended
                        ? 'text-slate-100 hover:bg-slate-800/80 bg-slate-800/40'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                    }`}
                    title={collapsed ? item.label : undefined}
                  >
                    <Icon className={`w-4 h-4 flex-shrink-0 ${
                      isActive ? 'text-white' : isRoleRecommended ? 'text-amber-400' : 'text-slate-400 group-hover:text-slate-200'
                    }`} />

                    {!collapsed && (
                      <div className="flex-1 flex items-center justify-between text-left truncate">
                        <span className="truncate">{item.label}</span>
                        {item.badge && (
                          <span className={`text-[9px] px-1.5 py-0.2 rounded font-semibold tracking-wide ${
                            isActive 
                              ? 'bg-blue-700 text-blue-100' 
                              : item.badge === 'Govt IGR' || item.badge === 'Govt 2025'
                              ? 'bg-amber-400/20 text-amber-300 border border-amber-400/30'
                              : 'bg-slate-800 text-slate-300'
                          }`}>
                            {item.badge}
                          </span>
                        )}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Footer Info */}
      {!collapsed && (
        <div className="p-3 border-t border-slate-800 text-[10px] text-slate-400 bg-slate-950/40">
          <p className="font-semibold text-slate-400">VM Intellect Pvt. Ltd.</p>
          <p>Pune, Maharashtra, India</p>
        </div>
      )}
    </aside>
  );
}
