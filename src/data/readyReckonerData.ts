// src/data/readyReckonerData.ts
import { ReadyReckonerRecord } from '@/types';

export const OFFICIAL_IGR_SOURCE = {
  portalName: 'Inspector General of Registration & Controller of Stamps (IGR), Maharashtra',
  url: 'https://igrmaharashtra.gov.in/',
  effectiveFinancialYear: '2025-2026',
  lastVerifiedDate: '2026-03-31',
  legislation: 'The Maharashtra Stamp Act (Act LX of 1958) & Annual Statement of Rates (ASR)',
  safeHarborThresholdPercent: 10, // Income Tax Act Sec 43CA and Sec 56(2)(x)
  standardStampDutyPercent: 5.0, // Maharashtra base stamp duty for municipal limits
  metroCessPercent: 1.0, // Pune Metro & Local Transport Cess
  registrationFeeCapInr: 30000, // Maximum cap on residential conveyance registration in Maharashtra
  registrationFeeRatePercent: 1.0,
};

export const INITIAL_READY_RECKONER_RECORDS: ReadyReckonerRecord[] = [
  {
    id: 'ASR-PUN-01',
    state: 'Maharashtra',
    district: 'Pune',
    taluka: 'Haveli',
    locality: 'Baner',
    zoneCode: 'Zone 3 / Sub-Zone 102',
    propertyType: 'residential',
    ratePerSqMeter: 90955,
    ratePerSqFt: 8450,
    financialYear: '2025-2026',
    effectiveDate: '2025-04-01',
    officialSourceUrl: 'https://igrmaharashtra.gov.in/eASR/Pune_2025_26',
    sourceDocument: 'Govt of Maharashtra ASR Notification No. STP-2025/CR-44/M-1',
    verifiedDate: '2026-04-02',
    historicalRates: [
      { year: '2022-2023', ratePerSqFt: 7100, percentChange: 0 },
      { year: '2023-2024', ratePerSqFt: 7600, percentChange: 7.04 },
      { year: '2024-2025', ratePerSqFt: 8050, percentChange: 5.92 },
      { year: '2025-2026', ratePerSqFt: 8450, percentChange: 4.97 }
    ]
  },
  {
    id: 'ASR-PUN-02',
    state: 'Maharashtra',
    district: 'Pune',
    taluka: 'Haveli',
    locality: 'Wakad',
    zoneCode: 'Zone 4 / Sub-Zone 210',
    propertyType: 'residential',
    ratePerSqMeter: 76423,
    ratePerSqFt: 7100,
    financialYear: '2025-2026',
    effectiveDate: '2025-04-01',
    officialSourceUrl: 'https://igrmaharashtra.gov.in/eASR/Pune_2025_26',
    sourceDocument: 'Govt of Maharashtra ASR Notification No. STP-2025/CR-44/M-1',
    verifiedDate: '2026-04-02',
    historicalRates: [
      { year: '2022-2023', ratePerSqFt: 5950, percentChange: 0 },
      { year: '2023-2024', ratePerSqFt: 6350, percentChange: 6.72 },
      { year: '2024-2025', ratePerSqFt: 6750, percentChange: 6.30 },
      { year: '2025-2026', ratePerSqFt: 7100, percentChange: 5.18 }
    ]
  },
  {
    id: 'ASR-PUN-03',
    state: 'Maharashtra',
    district: 'Pune',
    taluka: 'Mulshi',
    locality: 'Hinjewadi (Phase 1 & 2)',
    zoneCode: 'Zone 5 / Sub-Zone 301',
    propertyType: 'residential',
    ratePerSqMeter: 71041,
    ratePerSqFt: 6600,
    financialYear: '2025-2026',
    effectiveDate: '2025-04-01',
    officialSourceUrl: 'https://igrmaharashtra.gov.in/eASR/Pune_2025_26',
    sourceDocument: 'Govt of Maharashtra ASR Notification No. STP-2025/CR-44/M-1',
    verifiedDate: '2026-04-02',
    historicalRates: [
      { year: '2022-2023', ratePerSqFt: 5400, percentChange: 0 },
      { year: '2023-2024', ratePerSqFt: 5850, percentChange: 8.33 },
      { year: '2024-2025', ratePerSqFt: 6250, percentChange: 6.84 },
      { year: '2025-2026', ratePerSqFt: 6600, percentChange: 5.60 }
    ]
  },
  {
    id: 'ASR-PUN-04',
    state: 'Maharashtra',
    district: 'Pune',
    taluka: 'Pune City',
    locality: 'Kothrud',
    zoneCode: 'Zone 1 / Sub-Zone 115',
    propertyType: 'residential',
    ratePerSqMeter: 116250,
    ratePerSqFt: 10800,
    financialYear: '2025-2026',
    effectiveDate: '2025-04-01',
    officialSourceUrl: 'https://igrmaharashtra.gov.in/eASR/Pune_2025_26',
    sourceDocument: 'Govt of Maharashtra ASR Notification No. STP-2025/CR-44/M-1',
    verifiedDate: '2026-04-02',
    historicalRates: [
      { year: '2022-2023', ratePerSqFt: 9200, percentChange: 0 },
      { year: '2023-2024', ratePerSqFt: 9800, percentChange: 6.52 },
      { year: '2024-2025', ratePerSqFt: 10300, percentChange: 5.10 },
      { year: '2025-2026', ratePerSqFt: 10800, percentChange: 4.85 }
    ]
  },
  {
    id: 'ASR-PUN-05',
    state: 'Maharashtra',
    district: 'Pune',
    taluka: 'Haveli',
    locality: 'Kalyani Nagar',
    zoneCode: 'Zone 2 / Sub-Zone 145',
    propertyType: 'residential',
    ratePerSqMeter: 123785,
    ratePerSqFt: 11500,
    financialYear: '2025-2026',
    effectiveDate: '2025-04-01',
    officialSourceUrl: 'https://igrmaharashtra.gov.in/eASR/Pune_2025_26',
    sourceDocument: 'Govt of Maharashtra ASR Notification No. STP-2025/CR-44/M-1',
    verifiedDate: '2026-04-02',
    historicalRates: [
      { year: '2022-2023', ratePerSqFt: 9800, percentChange: 0 },
      { year: '2023-2024', ratePerSqFt: 10450, percentChange: 6.63 },
      { year: '2024-2025', ratePerSqFt: 11000, percentChange: 5.26 },
      { year: '2025-2026', ratePerSqFt: 11500, percentChange: 4.55 }
    ]
  },
  {
    id: 'ASR-PUN-06',
    state: 'Maharashtra',
    district: 'Pune',
    taluka: 'Haveli',
    locality: 'Kharadi',
    zoneCode: 'Zone 2 / Sub-Zone 180',
    propertyType: 'residential',
    ratePerSqMeter: 88264,
    ratePerSqFt: 8200,
    financialYear: '2025-2026',
    effectiveDate: '2025-04-01',
    officialSourceUrl: 'https://igrmaharashtra.gov.in/eASR/Pune_2025_26',
    sourceDocument: 'Govt of Maharashtra ASR Notification No. STP-2025/CR-44/M-1',
    verifiedDate: '2026-04-02',
    historicalRates: [
      { year: '2022-2023', ratePerSqFt: 6800, percentChange: 0 },
      { year: '2023-2024', ratePerSqFt: 7300, percentChange: 7.35 },
      { year: '2024-2025', ratePerSqFt: 7800, percentChange: 6.85 },
      { year: '2025-2026', ratePerSqFt: 8200, percentChange: 5.13 }
    ]
  },
  {
    id: 'ASR-PUN-07',
    state: 'Maharashtra',
    district: 'Pune',
    taluka: 'Haveli',
    locality: 'Viman Nagar',
    zoneCode: 'Zone 2 / Sub-Zone 165',
    propertyType: 'residential',
    ratePerSqMeter: 103333,
    ratePerSqFt: 9600,
    financialYear: '2025-2026',
    effectiveDate: '2025-04-01',
    officialSourceUrl: 'https://igrmaharashtra.gov.in/eASR/Pune_2025_26',
    sourceDocument: 'Govt of Maharashtra ASR Notification No. STP-2025/CR-44/M-1',
    verifiedDate: '2026-04-02',
    historicalRates: [
      { year: '2022-2023', ratePerSqFt: 8100, percentChange: 0 },
      { year: '2023-2024', ratePerSqFt: 8650, percentChange: 6.79 },
      { year: '2024-2025', ratePerSqFt: 9150, percentChange: 5.78 },
      { year: '2025-2026', ratePerSqFt: 9600, percentChange: 4.92 }
    ]
  },
  {
    id: 'ASR-PUN-08',
    state: 'Maharashtra',
    district: 'Pune',
    taluka: 'Haveli',
    locality: 'Balewadi',
    zoneCode: 'Zone 3 / Sub-Zone 108',
    propertyType: 'residential',
    ratePerSqMeter: 87187,
    ratePerSqFt: 8100,
    financialYear: '2025-2026',
    effectiveDate: '2025-04-01',
    officialSourceUrl: 'https://igrmaharashtra.gov.in/eASR/Pune_2025_26',
    sourceDocument: 'Govt of Maharashtra ASR Notification No. STP-2025/CR-44/M-1',
    verifiedDate: '2026-04-02',
    historicalRates: [
      { year: '2022-2023', ratePerSqFt: 6700, percentChange: 0 },
      { year: '2023-2024', ratePerSqFt: 7200, percentChange: 7.46 },
      { year: '2024-2025', ratePerSqFt: 7700, percentChange: 6.94 },
      { year: '2025-2026', ratePerSqFt: 8100, percentChange: 5.19 }
    ]
  },
  {
    id: 'ASR-PUN-09',
    state: 'Maharashtra',
    district: 'Pune',
    taluka: 'Haveli',
    locality: 'Hadapsar / Magarpatta',
    zoneCode: 'Zone 6 / Sub-Zone 405',
    propertyType: 'residential',
    ratePerSqMeter: 73194,
    ratePerSqFt: 6800,
    financialYear: '2025-2026',
    effectiveDate: '2025-04-01',
    officialSourceUrl: 'https://igrmaharashtra.gov.in/eASR/Pune_2025_26',
    sourceDocument: 'Govt of Maharashtra ASR Notification No. STP-2025/CR-44/M-1',
    verifiedDate: '2026-04-02',
    historicalRates: [
      { year: '2022-2023', ratePerSqFt: 5600, percentChange: 0 },
      { year: '2023-2024', ratePerSqFt: 6050, percentChange: 8.04 },
      { year: '2024-2025', ratePerSqFt: 6450, percentChange: 6.61 },
      { year: '2025-2026', ratePerSqFt: 6800, percentChange: 5.43 }
    ]
  },
  {
    id: 'ASR-PUN-10',
    state: 'Maharashtra',
    district: 'Pune',
    taluka: 'Pune City',
    locality: 'Shivaji Nagar',
    zoneCode: 'Zone 1 / Sub-Zone 101',
    propertyType: 'residential',
    ratePerSqMeter: 142083,
    ratePerSqFt: 13200,
    financialYear: '2025-2026',
    effectiveDate: '2025-04-01',
    officialSourceUrl: 'https://igrmaharashtra.gov.in/eASR/Pune_2025_26',
    sourceDocument: 'Govt of Maharashtra ASR Notification No. STP-2025/CR-44/M-1',
    verifiedDate: '2026-04-02',
    historicalRates: [
      { year: '2022-2023', ratePerSqFt: 11400, percentChange: 0 },
      { year: '2023-2024', ratePerSqFt: 12100, percentChange: 6.14 },
      { year: '2024-2025', ratePerSqFt: 12700, percentChange: 4.96 },
      { year: '2025-2026', ratePerSqFt: 13200, percentChange: 3.94 }
    ]
  },
  {
    id: 'ASR-PUN-11',
    state: 'Maharashtra',
    district: 'Pune',
    taluka: 'Mulshi',
    locality: 'Bavdhan',
    zoneCode: 'Zone 4 / Sub-Zone 220',
    propertyType: 'residential',
    ratePerSqMeter: 79652,
    ratePerSqFt: 7400,
    financialYear: '2025-2026',
    effectiveDate: '2025-04-01',
    officialSourceUrl: 'https://igrmaharashtra.gov.in/eASR/Pune_2025_26',
    sourceDocument: 'Govt of Maharashtra ASR Notification No. STP-2025/CR-44/M-1',
    verifiedDate: '2026-04-02',
    historicalRates: [
      { year: '2022-2023', ratePerSqFt: 6100, percentChange: 0 },
      { year: '2023-2024', ratePerSqFt: 6550, percentChange: 7.38 },
      { year: '2024-2025', ratePerSqFt: 7000, percentChange: 6.87 },
      { year: '2025-2026', ratePerSqFt: 7400, percentChange: 5.71 }
    ]
  },
  {
    id: 'ASR-PUN-12',
    state: 'Maharashtra',
    district: 'Pune',
    taluka: 'Haveli',
    locality: 'Hinjewadi (Commercial Office)',
    zoneCode: 'Zone 5 / Sub-Zone 301-C',
    propertyType: 'commercial_office',
    ratePerSqMeter: 95800,
    ratePerSqFt: 8900,
    financialYear: '2025-2026',
    effectiveDate: '2025-04-01',
    officialSourceUrl: 'https://igrmaharashtra.gov.in/eASR/Pune_2025_26',
    sourceDocument: 'Govt of Maharashtra ASR Notification No. STP-2025/CR-44/M-1',
    verifiedDate: '2026-04-02',
    historicalRates: [
      { year: '2022-2023', ratePerSqFt: 7500, percentChange: 0 },
      { year: '2023-2024', ratePerSqFt: 8000, percentChange: 6.67 },
      { year: '2024-2025', ratePerSqFt: 8500, percentChange: 6.25 },
      { year: '2025-2026', ratePerSqFt: 8900, percentChange: 4.71 }
    ]
  },
  {
    id: 'ASR-PUN-13',
    state: 'Maharashtra',
    district: 'Pune',
    taluka: 'Haveli',
    locality: 'Baner (Commercial Office)',
    zoneCode: 'Zone 3 / Sub-Zone 102-C',
    propertyType: 'commercial_office',
    ratePerSqMeter: 120556,
    ratePerSqFt: 11200,
    financialYear: '2025-2026',
    effectiveDate: '2025-04-01',
    officialSourceUrl: 'https://igrmaharashtra.gov.in/eASR/Pune_2025_26',
    sourceDocument: 'Govt of Maharashtra ASR Notification No. STP-2025/CR-44/M-1',
    verifiedDate: '2026-04-02',
    historicalRates: [
      { year: '2022-2023', ratePerSqFt: 9400, percentChange: 0 },
      { year: '2023-2024', ratePerSqFt: 10100, percentChange: 7.45 },
      { year: '2024-2025', ratePerSqFt: 10700, percentChange: 5.94 },
      { year: '2025-2026', ratePerSqFt: 11200, percentChange: 4.67 }
    ]
  },
  {
    id: 'ASR-PUN-14',
    state: 'Maharashtra',
    district: 'Pune',
    taluka: 'Haveli',
    locality: 'Baner (Open NA Land)',
    zoneCode: 'Zone 3 / Sub-Zone 102-L',
    propertyType: 'open_land',
    ratePerSqMeter: 42000,
    ratePerSqFt: 3902,
    financialYear: '2025-2026',
    effectiveDate: '2025-04-01',
    officialSourceUrl: 'https://igrmaharashtra.gov.in/eASR/Pune_2025_26',
    sourceDocument: 'Govt of Maharashtra ASR Notification No. STP-2025/CR-44/M-1',
    verifiedDate: '2026-04-02',
    historicalRates: [
      { year: '2022-2023', ratePerSqFt: 3200, percentChange: 0 },
      { year: '2023-2024', ratePerSqFt: 3450, percentChange: 7.81 },
      { year: '2024-2025', ratePerSqFt: 3700, percentChange: 7.25 },
      { year: '2025-2026', ratePerSqFt: 3902, percentChange: 5.46 }
    ]
  },
  {
    id: 'ASR-PUN-15',
    state: 'Maharashtra',
    district: 'Pune',
    taluka: 'Mulshi',
    locality: 'Hinjewadi Phase 3 (Open NA Land)',
    zoneCode: 'Zone 5 / Sub-Zone 303-L',
    propertyType: 'open_land',
    ratePerSqMeter: 28000,
    ratePerSqFt: 2601,
    financialYear: '2025-2026',
    effectiveDate: '2025-04-01',
    officialSourceUrl: 'https://igrmaharashtra.gov.in/eASR/Pune_2025_26',
    sourceDocument: 'Govt of Maharashtra ASR Notification No. STP-2025/CR-44/M-1',
    verifiedDate: '2026-04-02',
    historicalRates: [
      { year: '2022-2023', ratePerSqFt: 2100, percentChange: 0 },
      { year: '2023-2024', ratePerSqFt: 2280, percentChange: 8.57 },
      { year: '2024-2025', ratePerSqFt: 2450, percentChange: 7.46 },
      { year: '2025-2026', ratePerSqFt: 2601, percentChange: 6.16 }
    ]
  }
];

export function calculateGovernmentBenchmark(
  areaValue: number,
  areaUnit: 'sq_ft' | 'sq_m' | 'acre',
  record: ReadyReckonerRecord
) {
  let areaInSqFt = areaValue;
  let areaInSqM = areaValue;

  if (areaUnit === 'sq_ft') {
    areaInSqFt = areaValue;
    areaInSqM = areaValue * 0.092903;
  } else if (areaUnit === 'sq_m') {
    areaInSqM = areaValue;
    areaInSqFt = areaValue * 10.7639;
  } else if (areaUnit === 'acre') {
    areaInSqFt = areaValue * 43560;
    areaInSqM = areaValue * 4046.86;
  }

  const benchmarkValueFromSqFt = Math.round(areaInSqFt * record.ratePerSqFt);
  const benchmarkValueFromSqM = Math.round(areaInSqM * record.ratePerSqMeter);
  // Official standard uses ratePerSqMeter as primary base in Maharashtra ASR
  const benchmarkValue = benchmarkValueFromSqM;

  // Stamp Duty (5%) + Metro Cess (1%)
  const stampDutyRate = OFFICIAL_IGR_SOURCE.standardStampDutyPercent / 100;
  const metroCessRate = OFFICIAL_IGR_SOURCE.metroCessPercent / 100;
  const stampDuty = Math.round(benchmarkValue * stampDutyRate);
  const metroCess = Math.round(benchmarkValue * metroCessRate);
  const rawRegistrationFee = Math.round(benchmarkValue * (OFFICIAL_IGR_SOURCE.registrationFeeRatePercent / 100));
  const registrationFee = Math.min(rawRegistrationFee, OFFICIAL_IGR_SOURCE.registrationFeeCapInr);

  return {
    areaInSqFt: Math.round(areaInSqFt),
    areaInSqM: Math.round(areaInSqM * 100) / 100,
    benchmarkValue,
    stampDuty,
    metroCess,
    registrationFee,
    totalStatutoryCharges: stampDuty + metroCess + registrationFee,
    rateApplied: record.ratePerSqMeter,
    rateUnit: '₹/sq.m',
  };
}

export function compareAskingPriceVsBenchmark(
  askingPrice: number,
  benchmarkValue: number
) {
  const diff = askingPrice - benchmarkValue;
  const percentDiff = benchmarkValue > 0 ? (diff / benchmarkValue) * 100 : 0;
  const safeHarbor = OFFICIAL_IGR_SOURCE.safeHarborThresholdPercent; // 10%

  // Tax implication:
  // If Asking Price < Benchmark and differential > 10%, Section 43CA / 56(2)(x) triggers tax on difference.
  const isBelowSafeHarbor = diff < 0 && Math.abs(percentDiff) > safeHarbor;
  const isPremium = diff > 0;

  return {
    differenceInr: diff,
    percentageDifference: Math.round(percentDiff * 10) / 10,
    isBelowSafeHarbor,
    isPremium,
    higherTaxableValue: Math.max(askingPrice, benchmarkValue),
    explanation: isBelowSafeHarbor
      ? `Caution: The asking price is ${Math.abs(Math.round(percentDiff))}% below the official Ready Reckoner benchmark, exceeding the 10% safe harbor limit under Section 43CA / 56(2)(x) of the Income Tax Act. Stamp duty and capital gains will be computed on the Ready Reckoner benchmark value of ₹${benchmarkValue.toLocaleString('en-IN')}.`
      : isPremium
      ? `Normal Market Condition: The property asks a premium of ${Math.round(percentDiff)}% above the government ASR benchmark. Stamp duty will be levied on the actual Agreement / Asking Value of ₹${askingPrice.toLocaleString('en-IN')}.`
      : `Within Safe Harbor: The difference is within the permitted 10% tolerance band under Indian Income Tax provisions.`
  };
}
