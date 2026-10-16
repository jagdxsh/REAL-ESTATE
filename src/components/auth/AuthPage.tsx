'use client';

import React, { useState } from 'react';
import BrandLogo from '../brand/BrandLogo';
import { UserRole, UserProfile } from '@/types';
import { 
  Lock, 
  Mail, 
  Eye, 
  EyeOff, 
  Building2, 
  Trees, 
  Briefcase, 
  Home, 
  ShieldCheck, 
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  Sparkles,
  ShieldAlert
} from 'lucide-react';

interface AuthPageProps {
  onLoginSuccess: (user: UserProfile) => void;
}

const DEMO_ACCOUNTS: { role: UserRole; name: string; email: string; label: string; icon: any; desc: string }[] = [
  {
    role: 'builder',
    name: 'Rajesh Singhania',
    email: 'builder@vmintellect.com',
    label: 'Builder / Developer',
    icon: Building2,
    desc: 'Plot feasibility, FSI, construction economics & scenarios'
  },
  {
    role: 'landowner',
    name: 'Dilip Rao Bhosale',
    email: 'landowner@vmintellect.com',
    label: 'Land Owner',
    icon: Trees,
    desc: 'Land valuation, ASR rates, JDA vs outright sale'
  },
  {
    role: 'realtor',
    name: 'Meera Deshpande',
    email: 'realtor@vmintellect.com',
    label: 'Realtor / Agent',
    icon: Briefcase,
    desc: 'Listing management, smart matching, CRM inquiries'
  },
  {
    role: 'buyer',
    name: 'Vikramaditya Deshmukh',
    email: 'buyer@vmintellect.com',
    label: 'Customer / Buyer',
    icon: Home,
    desc: 'Property discovery, affordability, Vastu analysis'
  },
  {
    role: 'admin',
    name: 'Dr. Vivek Mane (CTO)',
    email: 'admin@vmintellect.com',
    label: 'System Admin',
    icon: ShieldAlert,
    desc: 'DPDP compliance, ASR datasets, audit logs & system health'
  }
];

export default function AuthPage({ onLoginSuccess }: AuthPageProps) {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('builder@vmintellect.com');
  const [password, setPassword] = useState('EstateIQ@2026');
  const [fullName, setFullName] = useState('Rajesh Singhania');
  const [selectedRole, setSelectedRole] = useState<UserRole>('builder');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [dpdpConsent, setDpdpConsent] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleDemoSelect = (acc: typeof DEMO_ACCOUNTS[0]) => {
    setEmail(acc.email);
    setPassword('EstateIQ@2026');
    setFullName(acc.name);
    setSelectedRole(acc.role);
    setErrorMessage('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email || !email.includes('@')) {
      setErrorMessage('Please provide a valid business or personal email address.');
      return;
    }

    if (!password || password.length < 6) {
      setErrorMessage('Password must contain at least 6 characters.');
      return;
    }

    if (isRegister && !dpdpConsent) {
      setErrorMessage('You must acknowledge the DPDP Act 2023 Digital Personal Data Notice to register.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      onLoginSuccess({
        id: `USR-${Date.now().toString().slice(-4)}`,
        name: isRegister ? fullName : (DEMO_ACCOUNTS.find(a => a.email === email)?.name || fullName || 'Enterprise User'),
        email,
        role: selectedRole,
        organization: 'VM Intellect Real Estate Advisory',
        isVerified: true,
        consentGiven: dpdpConsent,
        consentTimestamp: new Date().toISOString()
      });
    }, 600);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 flex items-center justify-center p-4 sm:p-6 lg:p-8 relative overflow-hidden">
      {/* Decorative Glows */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200/80 grid grid-cols-1 lg:grid-cols-12 relative z-10">
        {/* Left Branding & Highlights Panel */}
        <div className="lg:col-span-5 bg-gradient-to-b from-slate-950 to-blue-950 text-white p-6 sm:p-8 flex flex-col justify-between border-r border-slate-800">
          <div>
            <div className="mb-6">
              <BrandLogo size="lg" allowToggle={true} />
            </div>

            <h1 className="text-xl sm:text-2xl font-bold font-serif text-amber-300 tracking-tight leading-snug">
              EstateIQ AI Platform
            </h1>
            <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
              Enterprise property intelligence combining Maharashtra Ready Reckoner rates, DPDP Act 2023 governance, and Vastu Shastra space analytics.
            </p>

            <div className="mt-8 space-y-3.5">
              <div className="flex items-start gap-2.5">
                <div className="p-1 rounded bg-blue-500/20 text-blue-400 mt-0.5">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-slate-100">IGR Maharashtra ASR Benchmark</h4>
                  <p className="text-[11px] text-slate-400">Verified official rates, stamp duty calculations & tax safe harbor checks.</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="p-1 rounded bg-amber-500/20 text-amber-400 mt-0.5">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-slate-100">Vastu Dosh & Layout Intelligence</h4>
                  <p className="text-[11px] text-slate-400">18-category directional checks with practical non-invasive remedies.</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="p-1 rounded bg-emerald-500/20 text-emerald-400 mt-0.5">
                  <Lock className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-slate-100">DPDP Act 2023 & Rules 2025</h4>
                  <p className="text-[11px] text-slate-400">Data principal consent lifecycle, RoPA audit logs & privacy governance.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-slate-800/80 text-[11px] text-slate-400 flex items-center justify-between">
            <span>VM Intellect Pvt. Ltd., Pune</span>
            <span className="text-amber-400 font-medium">Internship Suite</span>
          </div>
        </div>

        {/* Right Authentication Form Panel */}
        <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-center bg-white">
          <div className="max-w-md mx-auto w-full">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-slate-900">
                {isRegister ? 'Create Professional Account' : 'Enterprise Sign In'}
              </h2>
              <button
                type="button"
                onClick={() => {
                  setIsRegister(!isRegister);
                  setErrorMessage('');
                }}
                className="text-xs font-semibold text-blue-600 hover:text-blue-800 cursor-pointer"
              >
                {isRegister ? 'Already registered? Sign In' : 'New user? Register'}
              </button>
            </div>

            {/* Quick Demo Role Fillers */}
            {!isRegister && (
              <div className="mb-5 p-3 rounded-xl bg-slate-50 border border-slate-200">
                <p className="text-[11px] font-semibold text-slate-600 mb-2 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>1-Click Persona Demo Sign In:</span>
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                  {DEMO_ACCOUNTS.map((acc) => {
                    const isCurrent = email === acc.email;
                    const Icon = acc.icon;
                    return (
                      <button
                        key={acc.role}
                        type="button"
                        onClick={() => handleDemoSelect(acc)}
                        className={`px-2 py-1.5 rounded-lg border text-left text-[11px] transition flex items-center gap-1.5 cursor-pointer ${
                          isCurrent 
                            ? 'bg-blue-600 text-white border-blue-600 font-semibold shadow-xs' 
                            : 'bg-white border-slate-200 text-slate-700 hover:border-blue-300'
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5 flex-shrink-0" />
                        <span className="truncate">{acc.label.split('/')[0]}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {errorMessage && (
              <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-500" />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {isRegister && (
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Full Legal Name</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    placeholder="Enter full name"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Corporate or Personal Email</label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    placeholder="name@vmintellect.com"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-semibold text-slate-700">Password</label>
                  {!isRegister && (
                    <button
                      type="button"
                      onClick={() => alert('For security during this demonstration, please use standard password: EstateIQ@2026 or click any Demo account above.')}
                      className="text-[11px] text-blue-600 hover:underline cursor-pointer"
                    >
                      Forgot password?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-9 pr-9 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {isRegister && (
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Primary Real Estate Persona</label>
                  <select
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value as UserRole)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  >
                    <option value="builder">Builder / Developer</option>
                    <option value="landowner">Land Owner</option>
                    <option value="realtor">Realtor / Real Estate Agent</option>
                    <option value="buyer">Customer / Property Buyer</option>
                  </select>
                </div>
              )}

              {/* DPDP Consent Acknowledgment */}
              <div className="pt-1">
                <label className="flex items-start gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={dpdpConsent}
                    onChange={(e) => setDpdpConsent(e.target.checked)}
                    className="mt-0.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-[11px] text-slate-600 leading-snug">
                    I acknowledge that personal data is processed in accordance with the <strong>Digital Personal Data Protection (DPDP) Act, 2023</strong> and VM Intellect Privacy Policy.
                  </span>
                </label>
              </div>

              {!isRegister && (
                <div className="flex items-center justify-between pt-1">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-xs text-slate-600">Remember session</span>
                  </label>
                  <span className="text-[10px] text-slate-400">256-bit TLS Encrypted</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-2 py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-md hover:shadow-lg transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
              >
                {isSubmitting ? (
                  <span>Authenticating secure session...</span>
                ) : (
                  <>
                    <span>{isRegister ? 'Register & Enter Platform' : 'Sign In to Workspace'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
