// src/types/index.ts

export type UserRole = 'builder' | 'landowner' | 'realtor' | 'buyer' | 'admin';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  organization?: string;
  phone?: string;
  isVerified: boolean;
  consentGiven: boolean;
  consentTimestamp: string;
}

export type PropertyCategory = 'residential' | 'commercial' | 'industrial' | 'land';
export type PropertySubType = 'apartment' | 'villa' | 'penthouse' | 'plot' | 'office' | 'warehouse' | 'retail';

export interface ReadyReckonerRecord {
  id: string;
  state: string;
  district: string;
  taluka: string;
  locality: string;
  zoneCode: string;
  propertyType: 'residential' | 'commercial_office' | 'commercial_shop' | 'industrial' | 'open_land';
  ratePerSqMeter: number;
  ratePerSqFt: number;
  financialYear: string;
  effectiveDate: string;
  officialSourceUrl: string;
  sourceDocument: string;
  verifiedDate: string;
  historicalRates?: {
    year: string;
    ratePerSqFt: number;
    percentChange: number;
  }[];
}

export interface PropertyListing {
  id: string;
  title: string;
  category: PropertyCategory;
  subType: PropertySubType;
  city: string;
  locality: string;
  state: string;
  askingPrice: number; // in INR
  readyReckonerBenchmark: number; // in INR
  areaSqFt: number;
  carpetAreaSqFt?: number;
  bedrooms?: number;
  bathrooms?: number;
  floor?: number;
  totalFloors?: number;
  amenities: string[];
  possessionStatus: 'Ready to Move' | 'Under Construction' | 'Immediate' | 'New Launch';
  propertyAgeYears?: number;
  reraId?: string;
  ulpinId?: string; // Bhu-Aadhaar 14-digit ID
  titleStatus: 'Clear Marketable Title' | 'Under Verification' | 'Pending Mortgage Clearance';
  vastuOrientation: string;
  vastuScore: number; // 0-100 traditional compliance score
  images: string[];
  description: string;
  verifiedDate: string;
  featured?: boolean;
  contactPerson: string;
  contactRole: string;
  nearbyFacilities: {
    metroStation?: string;
    highwayDistanceKm?: number;
    schoolNearby?: string;
    hospitalNearby?: string;
    itParkNearby?: string;
  };
}

export type VastuZone = 'N' | 'NE' | 'E' | 'SE' | 'S' | 'SW' | 'W' | 'NW' | 'CENTER';

export type VastuSeverity = 'favorable' | 'caution' | 'critical' | 'neutral';

export interface VastuRule {
  id: string;
  roomType: string;
  idealZones: VastuZone[];
  secondaryZones: VastuZone[];
  unfavorableZones: VastuZone[];
  ruleName: string;
  element: 'Water' | 'Fire' | 'Earth' | 'Air' | 'Ether' | 'General';
  traditionalRationale: string;
  practicalAdjustment: string;
  traditionalRemedy: string;
}

export interface VastuFinding {
  id: string;
  roomType: string;
  assignedZone: VastuZone;
  severity: VastuSeverity;
  ruleApplied: string;
  explanation: string;
  practicalSuggestion: string;
  traditionalRemedy: string;
}

export interface VastuAssessmentResult {
  id: string;
  propertyTitle: string;
  propertyType: string;
  entranceDirection: VastuZone;
  roomPlacements: Record<string, VastuZone>;
  findings: VastuFinding[];
  score: number; // 0-100
  createdAt: string;
  disclaimer: string;
}

// DPDP Act 2023 & Rules 2025
export interface DPDPNotice {
  version: string;
  title: string;
  purposes: {
    id: string;
    purpose: string;
    description: string;
    isMandatory: boolean;
    lawfulBasis: 'Explicit Consent' | 'Legitimate Use' | 'Legal Obligation (RERA/Registration Act)';
  }[];
  dataProtectionOfficer: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
}

export interface DataPrincipalRequest {
  id: string;
  userId: string;
  userName: string;
  requestType: 'Access' | 'Correction' | 'Erasure' | 'Grievance';
  details: string;
  status: 'Received' | 'In Review' | 'Processed' | 'Action Taken';
  submittedAt: string;
  tatDays: number;
}

export interface RoPAEntry {
  category: string;
  collectedItems: string[];
  purpose: string;
  lawfulBasis: string;
  retentionPeriod: string;
  securityMeasure: string;
  storageLocation: string;
}

// Feasibility for Developer
export interface FeasibilityScenario {
  id: string;
  projectName: string;
  location: string;
  plotAreaSqFt: number;
  landAcquisitionCost: number;
  fsiAllowed: number;
  grossBuiltAreaSqFt: number;
  saleableAreaSqFt: number;
  constructionCostPerSqFt: number;
  approvalAndLiaisonCost: number;
  infrastructureCost: number;
  financeInterestRate: number; // %
  projectDurationMonths: number;
  contingencyPercent: number;
  scenarios: {
    type: 'conservative' | 'base' | 'optimistic';
    sellingRatePerSqFt: number;
    totalRevenue: number;
    totalCost: number;
    grossProfit: number;
    profitMarginPercent: number;
    projectRoiPercent: number;
    breakEvenRatePerSqFt: number;
  }[];
}

// Land Owner Opportunity
export interface LandDevelopmentOption {
  optionKey: 'outright_sale' | 'joint_development' | 'ground_lease' | 'self_develop' | 'land_bank';
  title: string;
  estimatedReturn: string;
  timeframe: string;
  riskLevel: 'Low' | 'Medium' | 'High';
  capitalRequired: string;
  taxImplication: string;
  pros: string[];
  cons: string[];
}

// Legal Due Diligence Document
export interface DueDiligenceItem {
  id: string;
  title: string;
  category: 'Ownership' | 'Encumbrance' | 'Approvals' | 'Litigation' | 'Tax & Municipal';
  importance: 'Mandatory' | 'High' | 'Recommended';
  status: 'Verified' | 'Pending Review' | 'Flagged Discrepancy' | 'Not Applicable';
  officialSource: string;
  verificationMethod: string;
  notes: string;
}

// Data Ingestion Job
export interface IngestionJob {
  id: string;
  fileName: string;
  sourceType: 'Ready Reckoner ASR' | 'Property Listings' | 'Market Comparables' | 'Cadastral Land Records';
  totalRows: number;
  validRows: number;
  invalidRows: number;
  duplicateRows: number;
  uploadedAt: string;
  status: 'Completed' | 'Validating' | 'Failed' | 'Draft Preview';
  errors: { row: number; column: string; message: string }[];
}
