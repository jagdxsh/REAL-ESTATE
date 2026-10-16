'use client';

import React, { useState } from 'react';
import { 
  Database, 
  UploadCloud, 
  FileSpreadsheet, 
  CheckCircle2, 
  AlertTriangle, 
  Layers, 
  RefreshCw, 
  Download,
  ArrowRight,
  Filter,
  Check,
  X
} from 'lucide-react';
import { IngestionJob } from '@/types';

const INITIAL_INGESTION_JOBS: IngestionJob[] = [
  {
    id: 'JOB-2026-081',
    fileName: 'Pune_ASR_Rates_FY2025_26.csv',
    sourceType: 'Ready Reckoner ASR',
    totalRows: 1250,
    validRows: 1238,
    invalidRows: 8,
    duplicateRows: 4,
    uploadedAt: '2026-04-12T09:30:00Z',
    status: 'Completed',
    errors: [
      { row: 142, column: 'ratePerSqMeter', message: 'Non-numeric string character in rate value' },
      { row: 308, column: 'zoneCode', message: 'Zone code pattern mismatch for Haveli taluka' }
    ]
  },
  {
    id: 'JOB-2026-082',
    fileName: 'Kharadi_Balewadi_Listings_Feed.xlsx',
    sourceType: 'Property Listings',
    totalRows: 340,
    validRows: 332,
    invalidRows: 5,
    duplicateRows: 3,
    uploadedAt: '2026-04-14T15:20:00Z',
    status: 'Completed',
    errors: [
      { row: 45, column: 'askingPrice', message: 'Outlier price detected (> 10x median locality rate)' }
    ]
  }
];

export default function DataIngestionModule() {
  const [jobs, setJobs] = useState<IngestionJob[]>(INITIAL_INGESTION_JOBS);
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedDatasetType, setSelectedDatasetType] = useState('Ready Reckoner ASR');
  const [uploadedFileName, setUploadedFileName] = useState('Sample_Pune_Properties_Import.csv');
  const [isProcessing, setIsProcessing] = useState(false);

  // Column Mapping Preview State
  const [columnMappings, setColumnMappings] = useState({
    locality: 'Locality_Name',
    areaSqFt: 'Super_Built_Area_SqFt',
    askingPrice: 'Quoted_Price_INR',
    propertyType: 'Asset_Class',
    reraId: 'MahaRERA_Reg_No'
  });

  const handleSimulateUpload = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setCurrentStep(2); // Move to Column Mapping
    }, 800);
  };

  const handleConfirmMapping = () => {
    setCurrentStep(3); // Move to Validation Preview
  };

  const handleExecuteImport = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const newJob: IngestionJob = {
        id: `JOB-2026-${Date.now().toString().slice(-3)}`,
        fileName: uploadedFileName,
        sourceType: selectedDatasetType as any,
        totalRows: 180,
        validRows: 176,
        invalidRows: 3,
        duplicateRows: 1,
        uploadedAt: new Date().toISOString(),
        status: 'Completed',
        errors: [
          { row: 14, column: 'askingPrice', message: 'Missing price value replaced with median ASR benchmark' }
        ]
      };
      setJobs([newJob, ...jobs]);
      setIsProcessing(false);
      setCurrentStep(4); // Summary
    }, 1000);
  };

  const totalProcessed = jobs.reduce((acc, j) => acc + j.totalRows, 0);
  const totalValid = jobs.reduce((acc, j) => acc + j.validRows, 0);
  const totalDuplicates = jobs.reduce((acc, j) => acc + j.duplicateRows, 0);
  const qualityScore = totalProcessed > 0 ? Math.round((totalValid / totalProcessed) * 100) : 100;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 rounded-2xl p-6 text-white shadow-md border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 text-[11px] font-semibold">
            <Database className="w-3.5 h-3.5 text-amber-300" />
            <span>Enterprise Data Ingestion & Hygiene Pipeline</span>
          </div>
          <h1 className="text-xl font-bold font-serif text-white">
            Data Collection, Cleaning & Quality Dashboard
          </h1>
          <p className="text-xs text-slate-300 leading-relaxed">
            Multi-stage ETL pipeline for external real-estate datasets. Features automated column mapping, anomaly detection, price outlier filtering, and deduplication prior to database ingestion.
          </p>
        </div>
      </div>

      {/* KPI Quality Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
          <span className="text-[11px] font-semibold text-slate-400 uppercase">Records Ingested</span>
          <p className="text-xl font-bold text-slate-900 mt-1">{totalProcessed.toLocaleString('en-IN')}</p>
          <span className="text-[11px] text-blue-600 font-medium">Across {jobs.length} Batch Runs</span>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
          <span className="text-[11px] font-semibold text-slate-400 uppercase">Data Hygiene Index</span>
          <p className="text-xl font-bold text-emerald-600 mt-1">{qualityScore}% Valid</p>
          <span className="text-[11px] text-emerald-600 font-medium">Schema Conformance</span>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
          <span className="text-[11px] font-semibold text-slate-400 uppercase">Duplicates Intercepted</span>
          <p className="text-xl font-bold text-amber-600 mt-1">{totalDuplicates} Records</p>
          <span className="text-[11px] text-amber-700 font-medium">Fuzzy Match Deduplication</span>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
          <span className="text-[11px] font-semibold text-slate-400 uppercase">AI-Readiness State</span>
          <p className="text-xl font-bold text-indigo-700 mt-1">Normalized</p>
          <span className="text-[11px] text-slate-500">Separated Provenance</span>
        </div>
      </div>

      {/* Ingestion Wizard Steps */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Step {currentStep} of 4: {
                currentStep === 1 ? 'Select Dataset & Upload' :
                currentStep === 2 ? 'Column Mapping & Schema Alignment' :
                currentStep === 3 ? 'Validation, Outlier & Duplicate Scan' :
                'Import Execution Summary'
              }
            </h3>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <span className={currentStep >= 1 ? 'font-bold text-blue-600' : ''}>Upload</span> →
            <span className={currentStep >= 2 ? 'font-bold text-blue-600' : ''}>Map</span> →
            <span className={currentStep >= 3 ? 'font-bold text-blue-600' : ''}>Validate</span> →
            <span className={currentStep >= 4 ? 'font-bold text-blue-600' : ''}>Done</span>
          </div>
        </div>

        {/* Step 1: Upload */}
        {currentStep === 1 && (
          <div className="space-y-4 max-w-xl mx-auto py-4 text-xs">
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Target Schema</label>
              <select
                value={selectedDatasetType}
                onChange={(e) => setSelectedDatasetType(e.target.value)}
                className="w-full px-2.5 py-2 rounded-lg border border-slate-300 text-xs font-semibold"
              >
                <option value="Ready Reckoner ASR">Maharashtra Ready Reckoner / ASR Schedule</option>
                <option value="Property Listings">Property Listings (Residential & Commercial)</option>
                <option value="Market Comparables">Historical Transaction Comparables</option>
              </select>
            </div>

            <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center bg-slate-50 hover:bg-slate-100/60 transition cursor-pointer">
              <UploadCloud className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <p className="font-bold text-slate-800 text-sm">Drag & drop CSV or Excel spreadsheet</p>
              <p className="text-slate-400 text-[11px] mt-1">Supports .csv, .xlsx up to 50MB with UTF-8 encoding</p>

              <button
                type="button"
                onClick={handleSimulateUpload}
                disabled={isProcessing}
                className="mt-4 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-xs transition cursor-pointer"
              >
                {isProcessing ? 'Parsing File Structure...' : 'Load Sample Pune Dataset'}
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Mapping */}
        {currentStep === 2 && (
          <div className="space-y-4 text-xs">
            <p className="text-slate-600">
              Verify incoming spreadsheet headers mapped to EstateIQ AI database schema for <strong>{uploadedFileName}</strong>:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl">
              {Object.entries(columnMappings).map(([targetCol, sourceHeader]) => (
                <div key={targetCol} className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <div>
                    <span className="font-mono text-slate-900 font-bold">{targetCol}</span>
                    <span className="text-[10px] text-slate-400 block">EstateIQ Database Field</span>
                  </div>
                  <span className="px-2 py-1 rounded bg-white border border-slate-300 font-mono text-[11px] text-blue-700 font-semibold">
                    ← {sourceHeader}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-4 flex justify-between">
              <button
                onClick={() => setCurrentStep(1)}
                className="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-700 cursor-pointer"
              >
                Back
              </button>
              <button
                onClick={handleConfirmMapping}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold cursor-pointer shadow-xs"
              >
                Proceed to Data Validation Scan
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Validation */}
        {currentStep === 3 && (
          <div className="space-y-4 text-xs">
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 space-y-1">
              <div className="flex items-center gap-2 font-bold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Pre-Ingestion Validation Scan Passed (176 / 180 Rows Clean)</span>
              </div>
              <p className="text-[11px] text-emerald-800">
                Found 3 rows with minor formatting anomalies and 1 duplicate listing record. Auto-reconciliation strategy applied.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-[11px]">
              <span className="font-bold text-slate-800">Anomaly Log:</span>
              <ul className="space-y-1 text-slate-600">
                <li className="flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                  <span>Row #14: Asking price missing. Imputed with median locality Ready Reckoner rate.</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                  <span>Row #89: Duplicate entry detected for Gat No. 102 (Baner). Merged with existing record.</span>
                </li>
              </ul>
            </div>

            <div className="pt-4 flex justify-between">
              <button
                onClick={() => setCurrentStep(2)}
                className="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-700 cursor-pointer"
              >
                Back
              </button>
              <button
                onClick={handleExecuteImport}
                disabled={isProcessing}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold cursor-pointer shadow-xs"
              >
                {isProcessing ? 'Writing to PostgreSQL Database...' : 'Commit Clean Records to Database'}
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Summary */}
        {currentStep === 4 && (
          <div className="space-y-4 text-xs text-center py-6 max-w-md mx-auto">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <Check className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-slate-900">Ingestion Batch Committed Successfully</h4>
            <p className="text-slate-500 text-[11px]">
              176 valid records integrated into the shared property database. AI prediction engines and search indexes updated.
            </p>

            <button
              onClick={() => setCurrentStep(1)}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold cursor-pointer shadow-xs inline-block"
            >
              Upload Another File
            </button>
          </div>
        )}
      </div>

      {/* Historical Batch Ledger */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
        <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
          Ingestion Jobs Audit Trail ({jobs.length} Batches)
        </h3>

        <div className="overflow-x-auto text-xs">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 font-semibold uppercase text-[10px]">
                <th className="py-2.5">Job ID</th>
                <th className="py-2.5">File Name</th>
                <th className="py-2.5">Type</th>
                <th className="py-2.5 text-right">Rows</th>
                <th className="py-2.5 text-right">Valid</th>
                <th className="py-2.5 text-right">Duplicates</th>
                <th className="py-2.5 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {jobs.map((job) => (
                <tr key={job.id}>
                  <td className="py-2.5 font-mono text-slate-500">{job.id}</td>
                  <td className="py-2.5 font-medium text-slate-900">{job.fileName}</td>
                  <td className="py-2.5">{job.sourceType}</td>
                  <td className="py-2.5 text-right font-semibold">{job.totalRows}</td>
                  <td className="py-2.5 text-right text-emerald-600 font-semibold">{job.validRows}</td>
                  <td className="py-2.5 text-right text-amber-600">{job.duplicateRows}</td>
                  <td className="py-2.5 text-right">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {job.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
