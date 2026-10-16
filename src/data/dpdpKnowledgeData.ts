// src/data/dpdpKnowledgeData.ts
import { DPDPNotice, DataPrincipalRequest, RoPAEntry } from '@/types';

export const OFFICIAL_DPDP_SOURCE = {
  authority: 'Ministry of Electronics and Information Technology (MeitY), Government of India',
  actTitle: 'The Digital Personal Data Protection Act, 2023 (Act No. 22 of 2023)',
  rulesTitle: 'The Digital Personal Data Protection Rules, 2025',
  sourceUrl: 'https://www.meity.gov.in/content/digital-personal-data-protection-act-2023',
  dataProtectionBoardIndia: 'Data Protection Board of India (DPBI)',
  enactmentDate: '2023-08-11',
  notifiedDate: '2025-01-15',
  statutoryGrievanceTatDays: 30,
};

export const INITIAL_DPDP_NOTICE: DPDPNotice = {
  version: 'v2.1-2026',
  title: 'Notice for Processing of Digital Personal Data under DPDP Act 2023',
  purposes: [
    {
      id: 'PUR-01',
      purpose: 'User Authentication & Role Management',
      description: 'Used to maintain your secure authenticated session, manage permissions across Builder, Land Owner, Realtor, and Buyer modules, and prevent unauthorized access.',
      isMandatory: true,
      lawfulBasis: 'Explicit Consent'
    },
    {
      id: 'PUR-02',
      purpose: 'Valuation & Ready Reckoner Calculation',
      description: 'Processing property locality, area measurements, and transaction values to compute indicative government ASR benchmarks and tax implications.',
      isMandatory: true,
      lawfulBasis: 'Legitimate Use'
    },
    {
      id: 'PUR-03',
      purpose: 'Property Leads & Realtor Communication',
      description: 'Connecting buyers with verified property listings and realtors. Never shared with unverified third-party telemarketers.',
      isMandatory: false,
      lawfulBasis: 'Explicit Consent'
    },
    {
      id: 'PUR-04',
      purpose: 'Due Diligence & Title Record Storage',
      description: 'Storage of uploaded 7/12 extracts, sale deeds, and RERA verification records strictly for your self-managed due diligence checklist.',
      isMandatory: false,
      lawfulBasis: 'Legal Obligation (RERA/Registration Act)'
    },
    {
      id: 'PUR-05',
      purpose: 'Vastu & Floor Plan Layout Processing',
      description: 'Evaluating spatial coordinates, entrance orientation, and room placements against traditional architectural guidelines.',
      isMandatory: false,
      lawfulBasis: 'Explicit Consent'
    }
  ],
  dataProtectionOfficer: {
    name: 'Adv. Radhika S. Kulkarni',
    email: 'dpo@vmintellect.com',
    phone: '+91 (020) 6790-8800',
    address: 'VM Intellect Pvt. Ltd., Level 4, Tech Park One, Baner Road, Pune, Maharashtra 411045'
  }
};

export const INITIAL_ROPA_RECORDS: RoPAEntry[] = [
  {
    category: 'User Identity & Auth Data',
    collectedItems: ['Full Name', 'Work Email', 'Phone Number', 'Assigned Persona Role'],
    purpose: 'Account maintenance, multi-factor session validation, and role-based access control.',
    lawfulBasis: 'DPDP Section 6 (Consent) & Section 4 (Contractual Necessity)',
    retentionPeriod: 'Duration of active user account + 180 days post-deactivation',
    securityMeasure: 'PBKDF2 password hashing, HTTPS TLS 1.3 encryption, AES-256 session tokens',
    storageLocation: 'Secure Cloud Database (Region: Mumbai, India - AWS ap-south-1)'
  },
  {
    category: 'Financial Affordability & Calculation Inputs',
    collectedItems: ['Estimated Purchase Budget', 'Down Payment Amount', 'Loan Tenure', 'Desired Locality'],
    purpose: 'Generating EMI schedules, calculating Maharashtra stamp duty, and computing loan-to-value affordability.',
    lawfulBasis: 'DPDP Section 6 (Specific Purpose Consent)',
    retentionPeriod: 'Transient local storage or retained until user deletes comparison query',
    securityMeasure: 'Zero server-side persistence of credit scores or bank credentials; transient client memory',
    storageLocation: 'Encrypted Browser Local Storage & Secure Session Store'
  },
  {
    category: 'Land & Property Ownership Records',
    collectedItems: ['Survey / Gat Number', 'ULPIN (Bhu-Aadhaar)', '7/12 Satbara Extract', 'MahaRERA Registration Number'],
    purpose: 'Conducting title sanity checks, verifying zone classifications, and organizing due diligence documents.',
    lawfulBasis: 'DPDP Section 7 (Legitimate Uses) & Real Estate (Regulation and Development) Act, 2016',
    retentionPeriod: 'Retained as per user portfolio preferences or deleted upon erasure request',
    securityMeasure: 'Restricted access control, watermarking, virus scanning on upload, immutable audit logs',
    storageLocation: 'Encrypted S3 Private Bucket with Time-Limited Signed URLs (Mumbai, India)'
  },
  {
    category: 'Realtor Client Inquiries & Leads',
    collectedItems: ['Inquirer Name', 'Contact Number', 'Preferred BHK / Area', 'Budget Range'],
    purpose: 'Facilitating property inspection visits and matching client requirements with active property listings.',
    lawfulBasis: 'DPDP Section 6 (Explicit, Non-Transferable Consent)',
    retentionPeriod: '90 days from inquiry or until client revokes communication consent',
    securityMeasure: 'Masked contact phone numbers, strict agent role authorization, access audit log',
    storageLocation: 'CRM Database Partition with Field-Level Encryption'
  }
];

export const INITIAL_DATA_PRINCIPAL_REQUESTS: DataPrincipalRequest[] = [
  {
    id: 'DPR-2026-001',
    userId: 'usr-buyer-891',
    userName: 'Vikramaditya Deshmukh',
    requestType: 'Access',
    details: 'Requesting complete export of property search history, saved affordability scenarios, and recorded consents.',
    status: 'Processed',
    submittedAt: '2026-03-28T10:15:00Z',
    tatDays: 3
  },
  {
    id: 'DPR-2026-002',
    userId: 'usr-owner-412',
    userName: 'Sunita Patil',
    requestType: 'Correction',
    details: 'Update registered phone number and correct spelling of Survey Number on saved Baner plot listing.',
    status: 'Action Taken',
    submittedAt: '2026-04-01T14:30:00Z',
    tatDays: 2
  },
  {
    id: 'DPR-2026-003',
    userId: 'usr-buyer-109',
    userName: 'Amit Sharma',
    requestType: 'Erasure',
    details: 'Request to delete home loan eligibility draft and clear cached lead inquiries sent to Wakad projects.',
    status: 'In Review',
    submittedAt: '2026-04-10T09:00:00Z',
    tatDays: 5
  },
  {
    id: 'DPR-2026-004',
    userId: 'usr-realtor-554',
    userName: 'Karan Mehra',
    requestType: 'Grievance',
    details: 'Inquiry regarding third-party contact masking policy on shared commercial office listings.',
    status: 'Received',
    submittedAt: '2026-04-14T16:45:00Z',
    tatDays: 1
  }
];
