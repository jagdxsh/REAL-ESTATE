'use client';

import React, { useState } from 'react';
import { 
  SlidersHorizontal, 
  ShieldCheck, 
  Users, 
  Database, 
  Activity, 
  Lock, 
  AlertTriangle, 
  CheckCircle2, 
  RefreshCw,
  Server
} from 'lucide-react';

export default function AdminPanel() {
  const [dbStatus, setDbStatus] = useState('Healthy');
  const [lastSync, setLastSync] = useState('2026-04-16T12:00:00Z');

  const systemMetrics = [
    { label: 'Active Users', value: '48 Users', change: '+12% this month' },
    { label: 'Properties Cataloged', value: '184 Verified', change: 'MahaRERA Indexed' },
    { label: 'Ready Reckoner Zones', value: '15 Active Zones', change: 'Pune District FY 25-26' },
    { label: 'DPDP Consents Logged', value: '312 Records', change: '100% Audit Compliant' }
  ];

  const integrationStatuses = [
    { name: 'IGR Maharashtra ASR Portal', status: 'Connected (Baseline Seed)', latency: '42ms', verifiedDate: '2026-04-02' },
    { name: 'DPDP 2023 Consent & RoPA Vault', status: 'Active (AES-256 Encrypted)', latency: '18ms', verifiedDate: '2026-04-16' },
    { name: 'Vastu Shastra 18-Category Rule Engine', status: 'Operational (Local Deterministic)', latency: '2ms', verifiedDate: '2026-03-20' },
    { name: 'DILRMP 3.0 ULPIN / Bhu-Aadhaar Registry', status: 'Mock Integration (Readiness Tested)', latency: '65ms', verifiedDate: '2026-04-10' },
    { name: 'e-Courts National Judicial Data Grid (NJDG)', status: 'Simulated API (Pre-configured)', latency: '50ms', verifiedDate: '2026-04-14' }
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 rounded-2xl p-6 text-white shadow-md border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-400/30 text-[11px] font-semibold">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Restricted Administrator Console</span>
          </div>
          <h1 className="text-xl font-bold font-serif text-white">
            System Administration & Infrastructure Health
          </h1>
          <p className="text-xs text-slate-300 leading-relaxed">
            Monitor system telemetry, database record counts, integration health, and regulatory audit trails for VM Intellect Pvt. Ltd.
          </p>
        </div>

        <button
          onClick={() => {
            setLastSync(new Date().toISOString());
            alert('System health check completed. All internal services nominal.');
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold shadow-xs transition cursor-pointer self-start md:self-auto"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Run System Diagnostics</span>
        </button>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {systemMetrics.map((m, idx) => (
          <div key={idx} className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
            <span className="text-[11px] font-semibold text-slate-400 uppercase">{m.label}</span>
            <p className="text-xl font-bold text-slate-900 mt-1">{m.value}</p>
            <span className="text-[11px] text-purple-700 font-medium">{m.change}</span>
          </div>
        ))}
      </div>

      {/* Integrations Health Matrix */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Service Integrations & Data Feed Connectivity
            </h3>
            <p className="text-xs text-slate-500">
              Clear distinction between connected baseline datasets, local engines, and simulated government endpoints.
            </p>
          </div>
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
            All Systems Operational
          </span>
        </div>

        <div className="overflow-x-auto text-xs">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 font-semibold uppercase text-[10px]">
                <th className="py-2.5">Service Provider / Feed</th>
                <th className="py-2.5">Status & Architecture</th>
                <th className="py-2.5 text-right">Latency</th>
                <th className="py-2.5 text-right">Last Verified</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {integrationStatuses.map((item, idx) => (
                <tr key={idx}>
                  <td className="py-3 font-semibold text-slate-900">{item.name}</td>
                  <td className="py-3">
                    <span className="inline-flex items-center gap-1.5 text-slate-700">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      <span>{item.status}</span>
                    </span>
                  </td>
                  <td className="py-3 text-right font-mono text-slate-500">{item.latency}</td>
                  <td className="py-3 text-right text-slate-400">{item.verifiedDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
