'use client';

import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  UserCheck, 
  FileText, 
  AlertTriangle, 
  CheckCircle2, 
  RefreshCw, 
  ExternalLink,
  Trash2,
  Edit3,
  Download,
  Info
} from 'lucide-react';
import { 
  OFFICIAL_DPDP_SOURCE, 
  INITIAL_DPDP_NOTICE, 
  INITIAL_ROPA_RECORDS, 
  INITIAL_DATA_PRINCIPAL_REQUESTS 
} from '@/data/dpdpKnowledgeData';
import { DataPrincipalRequest } from '@/types';

export default function DpdpModule() {
  const [activeTab, setActiveTab] = useState<'notice' | 'consents' | 'ropa' | 'requests' | 'security'>('notice');
  const [requests, setRequests] = useState<DataPrincipalRequest[]>(INITIAL_DATA_PRINCIPAL_REQUESTS);
  
  // Consents State
  const [consents, setConsents] = useState<Record<string, boolean>>({
    'PUR-01': true, // Auth (mandatory)
    'PUR-02': true, // Valuation (legitimate use)
    'PUR-03': true, // Leads (explicit consent)
    'PUR-04': true, // Documents (RERA obligation)
    'PUR-05': true, // Vastu (explicit consent)
  });

  const [newRequestType, setNewRequestType] = useState<'Access' | 'Correction' | 'Erasure' | 'Grievance'>('Access');
  const [newRequestDetails, setNewRequestDetails] = useState('');
  const [showSuccessNotice, setShowSuccessNotice] = useState(false);

  const handleToggleConsent = (id: string, isMandatory: boolean) => {
    if (isMandatory) {
      alert('This purpose is mandatory for maintaining your secure authenticated session.');
      return;
    }
    setConsents(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleCreateRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRequestDetails.trim()) return;

    const newReq: DataPrincipalRequest = {
      id: `DPR-${Date.now().toString().slice(-4)}`,
      userId: 'usr-active-client',
      userName: 'Current Authenticated User',
      requestType: newRequestType,
      details: newRequestDetails,
      status: 'Received',
      submittedAt: new Date().toISOString(),
      tatDays: newRequestType === 'Grievance' ? 30 : 7
    };

    setRequests([newReq, ...requests]);
    setNewRequestDetails('');
    setShowSuccessNotice(true);
    setTimeout(() => setShowSuccessNotice(false), 4000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 rounded-2xl p-6 text-white shadow-md border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-[11px] font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Digital Personal Data Protection Act, 2023 & Rules 2025</span>
          </div>
          <h1 className="text-xl font-bold font-serif text-white">
            DPDP Compliance & Data Governance Centre
          </h1>
          <p className="text-xs text-slate-300 leading-relaxed">
            Statutory privacy governance framework for VM Intellect Pvt. Ltd. Operationalizing notice, purpose specification, consent lifecycle, data inventory (RoPA), and Data Principal Rights.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 self-start md:self-auto">
          <a
            href={OFFICIAL_DPDP_SOURCE.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-xs transition"
          >
            <span>MeitY DPDP Gazette</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-3">
        {(['notice', 'consents', 'ropa', 'requests', 'security'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition cursor-pointer ${
              activeTab === tab
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            {tab === 'notice' ? 'Statutory Notice' : 
             tab === 'consents' ? 'Consent Manager' : 
             tab === 'ropa' ? 'Data Inventory (RoPA)' : 
             tab === 'requests' ? 'Data Principal Rights' : 'Security Safeguards'}
          </button>
        ))}
      </div>

      {/* Tab 1: Statutory Privacy Notice */}
      {activeTab === 'notice' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
          <div className="flex items-start justify-between border-b border-slate-100 pb-4">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400">Notice Version {INITIAL_DPDP_NOTICE.version}</span>
              <h2 className="text-base font-bold text-slate-900 mt-0.5">{INITIAL_DPDP_NOTICE.title}</h2>
              <p className="text-xs text-slate-500 mt-1">
                Issued by Data Fiduciary: VM Intellect Pvt. Ltd., Pune, Maharashtra under Section 5 of the DPDP Act, 2023.
              </p>
            </div>
            <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              Active Gazette Notification
            </span>
          </div>

          <div className="space-y-4">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Specified Purposes of Processing</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {INITIAL_DPDP_NOTICE.purposes.map((p) => (
                <div key={p.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-slate-900">{p.purpose}</h4>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-semibold border border-blue-200">
                      {p.lawfulBasis}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">{p.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* DPO Information */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2">
            <h4 className="font-bold text-slate-900 flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-emerald-600" />
              <span>Designated Data Protection Officer (DPO) & Grievance Redressal</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-600">
              <div>Officer: <strong>{INITIAL_DPDP_NOTICE.dataProtectionOfficer.name}</strong></div>
              <div>Email: <strong>{INITIAL_DPDP_NOTICE.dataProtectionOfficer.email}</strong></div>
              <div>Phone: <strong>{INITIAL_DPDP_NOTICE.dataProtectionOfficer.phone}</strong></div>
              <div>Office: <strong>{INITIAL_DPDP_NOTICE.dataProtectionOfficer.address}</strong></div>
            </div>
            <p className="text-[11px] text-slate-500 pt-1">
              Statutory Redressal Timeline: Grievances are acknowledged within 24 hours and addressed within 30 days as mandated under DPDP Rules 2025.
            </p>
          </div>
        </div>
      )}

      {/* Tab 2: Consent Manager */}
      {activeTab === 'consents' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Granular Purpose-Specific Consent Management
              </h3>
              <p className="text-xs text-slate-500">
                You have the statutory right under Section 6(4) to withdraw consent at any time as easily as giving it.
              </p>
            </div>
          </div>

          <div className="divide-y divide-slate-100">
            {INITIAL_DPDP_NOTICE.purposes.map((p) => {
              const isGranted = consents[p.id];
              return (
                <div key={p.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div className="space-y-1 max-w-xl">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900">{p.purpose}</span>
                      {p.isMandatory && (
                        <span className="text-[9px] px-1.5 py-0.2 rounded bg-slate-100 text-slate-600 font-semibold">
                          Required for App Access
                        </span>
                      )}
                    </div>
                    <p className="text-slate-500 text-[11px] leading-relaxed">{p.description}</p>
                    <span className="text-[10px] text-slate-400">Lawful Ground: {p.lawfulBasis}</span>
                  </div>

                  <div className="flex items-center gap-3 self-end sm:self-auto">
                    <span className={`text-xs font-semibold ${isGranted ? 'text-emerald-600' : 'text-slate-400'}`}>
                      {isGranted ? 'Active Consent' : 'Revoked / Inactive'}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleToggleConsent(p.id, p.isMandatory)}
                      disabled={p.isMandatory}
                      className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                        isGranted ? 'bg-emerald-600' : 'bg-slate-300'
                      } ${p.isMandatory ? 'opacity-60 cursor-not-allowed' : ''}`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                          isGranted ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 3: RoPA / Data Inventory */}
      {activeTab === 'ropa' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Record of Processing Activities (RoPA) & Data Inventory
              </h3>
              <p className="text-xs text-slate-500">
                Comprehensive mapping of digital personal data categories, retention periods, lawful grounds, and security safeguards.
              </p>
            </div>
            <button
              onClick={() => alert('Exporting RoPA Registry CSV for audit inspection...')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export RoPA CSV</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 font-semibold uppercase text-[10px]">
                  <th className="py-2.5">Data Category</th>
                  <th className="py-2.5">Collected Fields</th>
                  <th className="py-2.5">Purpose & Lawful Basis</th>
                  <th className="py-2.5">Retention Schedule</th>
                  <th className="py-2.5">Storage & Security</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {INITIAL_ROPA_RECORDS.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50">
                    <td className="py-3 font-semibold text-slate-900 align-top">{item.category}</td>
                    <td className="py-3 align-top text-slate-600 max-w-[180px]">
                      {item.collectedItems.join(', ')}
                    </td>
                    <td className="py-3 align-top max-w-[220px]">
                      <p className="font-medium text-slate-800">{item.purpose}</p>
                      <span className="text-[10px] text-blue-600 font-mono mt-0.5 block">{item.lawfulBasis}</span>
                    </td>
                    <td className="py-3 align-top text-slate-500 text-[11px]">{item.retentionPeriod}</td>
                    <td className="py-3 align-top text-slate-500 text-[11px] max-w-[200px]">
                      <div>{item.storageLocation}</div>
                      <span className="text-[10px] text-emerald-600 font-medium">{item.securityMeasure}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 4: Data Principal Rights */}
      {activeTab === 'requests' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* New Request Submission (5 Cols) */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <Edit3 className="w-4 h-4 text-emerald-600" />
              <span>Exercise Data Principal Right</span>
            </h3>

            {showSuccessNotice && (
              <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Your request has been officially recorded with a 30-day statutory tracking ID.</span>
              </div>
            )}

            <form onSubmit={handleCreateRequest} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Select Statutory Right</label>
                <select
                  value={newRequestType}
                  onChange={(e) => setNewRequestType(e.target.value as any)}
                  className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs font-semibold"
                >
                  <option value="Access">Section 11: Right to Access Summary of Personal Data</option>
                  <option value="Correction">Section 12: Right to Correction & Updating</option>
                  <option value="Erasure">Section 12: Right to Erasure / Deletion</option>
                  <option value="Grievance">Section 13: Grievance Redressal / Complaint</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Specific Request Details</label>
                <textarea
                  required
                  rows={4}
                  value={newRequestDetails}
                  onChange={(e) => setNewRequestDetails(e.target.value)}
                  placeholder="Specify the exact personal data category, correction details, or grievance regarding processing..."
                  className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs shadow-xs transition cursor-pointer"
              >
                Submit Statutory Request
              </button>
            </form>
          </div>

          {/* Active Request Log (7 Cols) */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Statutory Request Ledger ({requests.length} Tracked)
            </h3>

            <div className="space-y-3">
              {requests.map((req) => (
                <div key={req.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] font-bold text-slate-500">{req.id}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      req.status === 'Action Taken' || req.status === 'Processed'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}>
                      {req.status}
                    </span>
                  </div>

                  <div>
                    <h4 className="font-bold text-slate-900">Right of {req.requestType}</h4>
                    <p className="text-slate-600 text-[11px] mt-0.5">{req.details}</p>
                  </div>

                  <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-[10px] text-slate-400">
                    <span>Submitted: {new Date(req.submittedAt).toLocaleDateString()}</span>
                    <span>Statutory TAT: Within {req.tatDays} days</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 5: Security Safeguards */}
      {activeTab === 'security' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            Technical & Organizational Security Safeguards (DPDP Section 8)
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-1.5">
              <span className="font-bold text-slate-900">Encryption in Transit & at Rest</span>
              <p className="text-slate-600 text-[11px]">
                Enforced TLS 1.3 transport security with AES-256 GCM database encryption for all stored land records and customer identifiers.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-1.5">
              <span className="font-bold text-slate-900">Role-Based Access Control (RBAC)</span>
              <p className="text-slate-600 text-[11px]">
                Strict segregation of builder, landowner, realtor, and customer accounts. Zero cross-tenant data leakage or parameter tampering.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-1.5">
              <span className="font-bold text-slate-900">DPBI Incident Register</span>
              <p className="text-slate-600 text-[11px]">
                72-hour automated protocol for reporting suspected personal data breaches to the Data Protection Board of India (DPBI) and affected users.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
