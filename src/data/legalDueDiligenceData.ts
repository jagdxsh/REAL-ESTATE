// src/data/legalDueDiligenceData.ts
import { DueDiligenceItem } from '@/types';

export const INITIAL_DUE_DILIGENCE_CHECKLIST: DueDiligenceItem[] = [
  {
    id: 'DD-01',
    title: '30-Year Search Report & Historical Chain of Title',
    category: 'Ownership',
    importance: 'Mandatory',
    status: 'Verified',
    officialSource: 'Sub-Registrar Office (Book 1 index entries, Dept of Registration & Stamps)',
    verificationMethod: 'Independent Title Advocate Search across 30 years of registered index II volumes.',
    notes: 'Confirms continuous uninterrupted devolution of title from original agricultural holder to current developer without break in chain.'
  },
  {
    id: 'DD-02',
    title: '7/12 Extract (Satbara Utara) & Mutation Register (Ferfar)',
    category: 'Ownership',
    importance: 'Mandatory',
    status: 'Verified',
    officialSource: 'Mahabhulekh (Maharashtra Revenue & Land Records Portal)',
    verificationMethod: 'Direct download with digital signature from Bhumi Abhilekh portal.',
    notes: 'Khasra/Gat number verified. Confirms no "Kool" (tenant farmer) rights, government hypothecation, or pending forest act restrictions.'
  },
  {
    id: 'DD-03',
    title: 'Encumbrance Certificate (EC - Form 15 & Form 16 Nil)',
    category: 'Encumbrance',
    importance: 'Mandatory',
    status: 'Verified',
    officialSource: 'e-Step-in Registration Portal, Govt of Maharashtra',
    verificationMethod: 'Certified Search across 13-30 years reflecting registered mortgages, court attachments, or bank liens.',
    notes: 'Form 16 "Nil Encumbrance" obtained up to March 2026. Zero active bank charge registered.'
  },
  {
    id: 'DD-04',
    title: 'MahaRERA Project Registration & Escrow Compliance',
    category: 'Approvals',
    importance: 'Mandatory',
    status: 'Verified',
    officialSource: 'Maharashtra Real Estate Regulatory Authority (maharera.mahaonline.gov.in)',
    verificationMethod: 'MahaRERA registration certificate lookup; Form 1, Form 2, Form 3 quarterly filings.',
    notes: 'Valid registration number, 70% escrow account maintained with scheduled bank, possession date committed under RERA.'
  },
  {
    id: 'DD-05',
    title: 'Sanctioned Building Layout & Commencement Certificate (CC)',
    category: 'Approvals',
    importance: 'Mandatory',
    status: 'Verified',
    officialSource: 'Pune Municipal Corporation (PMC) / PCMC Town Planning Department',
    verificationMethod: 'Scrutiny of architectural sanction plan, fire NOC, and plinth/full commencement certificate.',
    notes: 'Full CC granted for all residential towers. Sanctioned floor plans match advertised marketing brochure layouts.'
  },
  {
    id: 'DD-06',
    title: 'Occupancy Certificate (OC) / Completion Certificate',
    category: 'Approvals',
    importance: 'Mandatory',
    status: 'Pending Review',
    officialSource: 'Municipal Corporation Building Permission Dept',
    verificationMethod: 'Final joint inspection certificate certifying building is habitable and compliant with fire safety codes.',
    notes: 'Required for ready-to-move purchase. In under-construction projects, verified scheduled inspection timeline.'
  },
  {
    id: 'DD-07',
    title: 'e-Courts Litigation Cross-Check (NJDG & Bombay High Court)',
    category: 'Litigation',
    importance: 'High',
    status: 'Verified',
    officialSource: 'National Judicial Data Grid (e-Courts) & Pune District Court',
    verificationMethod: 'Automated case status search by survey number, developer entity name, and original land owners.',
    notes: 'No pending title suits, partition suits, or injunction orders active in civil courts against the property parcel.'
  },
  {
    id: 'DD-08',
    title: 'ULPIN (Bhu-Aadhaar) 14-Digit Geo-Referenced ID',
    category: 'Ownership',
    importance: 'High',
    status: 'Verified',
    officialSource: 'Digital India Land Records Modernization Programme (DILRMP 3.0)',
    verificationMethod: 'Cadastral polygon coordinates cross-referenced against Revenue Bhu-Naksha map.',
    notes: '14-digit alphanumeric code assigned. Boundary demarcated via DGPS electronic total station survey.'
  },
  {
    id: 'DD-09',
    title: 'Property Tax Payment Receipts & Municipal No-Dues',
    category: 'Tax & Municipal',
    importance: 'High',
    status: 'Verified',
    officialSource: 'PMC / PCMC Property Tax Department',
    verificationMethod: 'Up-to-date tax receipts and assessment book entry showing zero arrears.',
    notes: 'Property tax cleared up to FY 2025-26. No pending water or sewerage assessment levies.'
  },
  {
    id: 'DD-10',
    title: 'Environmental & River Flood Line Clearance',
    category: 'Tax & Municipal',
    importance: 'High',
    status: 'Verified',
    officialSource: 'Maharashtra Irrigation Department (Water Resources) & SEIAA',
    verificationMethod: 'Blue line and Red flood line demarcation map from Irrigation Division, Pune.',
    notes: 'Plot boundary sits well outside the 100-year Red Flood Line of Mula-Mutha river basin.'
  }
];
