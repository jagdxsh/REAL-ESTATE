'use client';

import React from 'react';
import BrandLogo from '../brand/BrandLogo';
import { UserRole } from '@/types';
import { 
  ShieldCheck, 
  Sparkles, 
  UserCheck, 
  LogOut, 
  ChevronDown,
  Building2,
  Trees,
  Briefcase,
  Home,
  ShieldAlert,
  Bell
} from 'lucide-react';

interface HeaderProps {
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  userName: string;
  onLogout: () => void;
  onOpenAiAssistant: () => void;
  activeTab: string;
}

const ROLE_INFO: Record<UserRole, { label: string; icon: any; color: string; bg: string }> = {
  builder: {
    label: 'Builder / Developer',
    icon: Building2,
    color: 'text-indigo-700',
    bg: 'bg-indigo-50 border-indigo-200'
  },
  landowner: {
    label: 'Land Owner',
    icon: Trees,
    color: 'text-emerald-700',
    bg: 'bg-emerald-50 border-emerald-200'
  },
  realtor: {
    label: 'Realtor / Agent',
    icon: Briefcase,
    color: 'text-amber-700',
    bg: 'bg-amber-50 border-amber-200'
  },
  buyer: {
    label: 'Customer / Buyer',
    icon: Home,
    color: 'text-blue-700',
    bg: 'bg-blue-50 border-blue-200'
  },
  admin: {
    label: 'Administrator',
    icon: ShieldAlert,
    color: 'text-purple-700',
    bg: 'bg-purple-50 border-purple-200'
  }
};

export default function Header({
  currentRole,
  onRoleChange,
  userName,
  onLogout,
  onOpenAiAssistant,
}: HeaderProps) {
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const currentRoleConfig = ROLE_INFO[currentRole];
  const CurrentIcon = currentRoleConfig.icon;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs px-4 sm:px-6 py-2.5 flex items-center justify-between">
      {/* Brand & Project Identity */}
      <div className="flex items-center gap-4">
        <BrandLogo size="md" allowToggle={true} />
      </div>

      {/* Role Switcher, DPDP Status & Actions */}
      <div className="flex items-center gap-3">
        {/* DPDP Compliance Shield Badge */}
        <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>DPDP 2023 Compliant</span>
        </div>

        {/* AI Assistant Quick Trigger */}
        <button
          onClick={onOpenAiAssistant}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-medium shadow-xs hover:from-blue-700 hover:to-indigo-700 transition cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span className="hidden sm:inline">EstateIQ AI Query</span>
          <span className="sm:hidden">AI</span>
        </button>

        {/* Role Switcher Dropdown */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-semibold cursor-pointer transition ${currentRoleConfig.bg} ${currentRoleConfig.color}`}
          >
            <CurrentIcon className="w-3.5 h-3.5" />
            <span className="hidden md:inline">{currentRoleConfig.label}</span>
            <ChevronDown className="w-3 h-3 opacity-70" />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 rounded-xl bg-white border border-slate-200 shadow-xl py-1.5 z-50 animate-in fade-in zoom-in-95">
              <div className="px-3 py-1.5 border-b border-slate-100 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                Switch Active Persona
              </div>
              {(Object.keys(ROLE_INFO) as UserRole[]).map((rKey) => {
                const conf = ROLE_INFO[rKey];
                const Icon = conf.icon;
                const isSelected = rKey === currentRole;
                return (
                  <button
                    key={rKey}
                    onClick={() => {
                      onRoleChange(rKey);
                      setDropdownOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 text-xs text-left hover:bg-slate-50 transition ${
                      isSelected ? 'font-bold bg-blue-50/70 text-blue-700' : 'text-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Icon className={`w-3.5 h-3.5 ${conf.color}`} />
                      <span>{conf.label}</span>
                    </div>
                    {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* User Profile & Logout */}
        <div className="flex items-center gap-2 border-l border-slate-200 pl-3">
          <div className="hidden sm:flex flex-col text-right">
            <span className="text-xs font-semibold text-slate-800 leading-tight">{userName}</span>
            <span className="text-[10px] text-slate-400">VM Intellect, Pune</span>
          </div>

          <button
            onClick={onLogout}
            title="Sign Out of Session"
            className="p-1.5 rounded-lg text-slate-500 hover:text-red-600 hover:bg-red-50 transition cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
