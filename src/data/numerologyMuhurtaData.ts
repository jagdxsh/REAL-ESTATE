// src/data/numerologyMuhurtaData.ts

export interface NumerologyMeaning {
  number: number;
  planet: string;
  symbolism: string;
  traditionalAssociation: string;
  favorableFor: string;
  colorHarmony: string;
}

export const NUMEROLOGY_MAP: Record<number, NumerologyMeaning> = {
  1: {
    number: 1,
    planet: 'Sun (Surya)',
    symbolism: 'Leadership, Independence, Originality',
    traditionalAssociation: 'Associated with executive authority, ambition, and dynamic beginnings.',
    favorableFor: 'Entrepreneurs, corporate executives, politicians, single owners.',
    colorHarmony: 'Golden Yellow, Orange, Radiant Amber'
  },
  2: {
    number: 2,
    planet: 'Moon (Chandra)',
    symbolism: 'Harmony, Cooperation, Emotional Serenity',
    traditionalAssociation: 'Associated with peace, intuitive relationships, empathy, and diplomatic balance.',
    favorableFor: 'Couples, counselors, artists, young families.',
    colorHarmony: 'Pure White, Silver, Seafoam Green'
  },
  3: {
    number: 3,
    planet: 'Jupiter (Guru)',
    symbolism: 'Wisdom, Expansion, Creativity, Joy',
    traditionalAssociation: 'Associated with spiritual growth, higher learning, generosity, and family warmth.',
    favorableFor: 'Professors, writers, spiritual seekers, joint families.',
    colorHarmony: 'Bright Yellow, Saffron, Honey Gold'
  },
  4: {
    number: 4,
    planet: 'Rahu (North Node)',
    symbolism: 'Structure, Discipline, Hard Work, Foundation',
    traditionalAssociation: 'Associated with grounded practicality, engineering, and meticulous organization.',
    favorableFor: 'Engineers, builders, chartered accountants, architects.',
    colorHarmony: 'Electric Blue, Slate Grey, Khaki'
  },
  5: {
    number: 5,
    planet: 'Mercury (Budha)',
    symbolism: 'Movement, Communication, Versatility, Commerce',
    traditionalAssociation: 'Associated with trade, fast changes, intellectual vitality, and social activity.',
    favorableFor: 'Brokers, traders, tech professionals, digital creators.',
    colorHarmony: 'Emerald Green, Mint, Light Turquoise'
  },
  6: {
    number: 6,
    planet: 'Venus (Shukra)',
    symbolism: 'Family, Luxury, Comfort, Domestic Harmony',
    traditionalAssociation: 'Associated with elegance, aesthetic luxury, hospitality, and domestic bliss.',
    favorableFor: 'Homeowners prioritizing luxury interiors, chefs, fashion designers, multi-generational families.',
    colorHarmony: 'Rose Pink, Pastel Blue, Pearl Cream'
  },
  7: {
    number: 7,
    planet: 'Ketu (South Node)',
    symbolism: 'Spirituality, Introspection, Research, Solitude',
    traditionalAssociation: 'Associated with contemplation, quiet concentration, and detachment from chaos.',
    favorableFor: 'Researchers, analysts, philosophers, meditative retreats.',
    colorHarmony: 'Smoky Grey, Pale Violet, Off-White'
  },
  8: {
    number: 8,
    planet: 'Saturn (Shani)',
    symbolism: 'Material Mastery, Long-Term Wealth, Endurance',
    traditionalAssociation: 'Associated with sustained perseverance, institutional authority, and karmic results.',
    favorableFor: 'Industrialists, real estate moguls, legal professionals, investment bankers.',
    colorHarmony: 'Deep Navy Blue, Charcoal, Rich Plum'
  },
  9: {
    number: 9,
    planet: 'Mars (Mangal)',
    symbolism: 'Energy, Humanitarianism, Completion, Courage',
    traditionalAssociation: 'Associated with universal compassion, dynamism, courage, and conclusive triumphs.',
    favorableFor: 'Doctors, armed forces veterans, community leaders, philanthropists.',
    colorHarmony: 'Crimson Red, Coral, Warm Terracotta'
  }
};

export function reduceToSingleDigit(input: string | number): number {
  const digitsOnly = String(input).replace(/\D/g, '');
  if (!digitsOnly) return 1;
  let sum = digitsOnly.split('').reduce((acc, digit) => acc + parseInt(digit, 10), 0);
  while (sum > 9) {
    sum = String(sum).split('').reduce((acc, digit) => acc + parseInt(digit, 10), 0);
  }
  return sum;
}

export interface MuhurtaEvent {
  id: string;
  category: 'Registration & Signing' | 'Bhoomi Pujan' | 'Griha Pravesh' | 'Token / Booking';
  dateStr: string;
  auspiciousTithi: string;
  nakshatra: string;
  idealTimeSlot: string;
  significance: string;
}

export const UPCOMING_MUHURTAS: MuhurtaEvent[] = [
  {
    id: 'MUH-01',
    category: 'Griha Pravesh',
    dateStr: '2026-11-08 (Kartik Shukla Pratipada)',
    auspiciousTithi: 'Shukla Paksha Pratipada',
    nakshatra: 'Rohini Nakshatra',
    idealTimeSlot: '06:45 AM - 09:20 AM',
    significance: 'Post-Diwali auspicious day for moving into a newly constructed or renovated home.'
  },
  {
    id: 'MUH-02',
    category: 'Registration & Signing',
    dateStr: '2026-11-15 (Kartik Shukla Saptami)',
    auspiciousTithi: 'Shukla Paksha Saptami',
    nakshatra: 'Uttara Phalguni',
    idealTimeSlot: '10:15 AM - 01:00 PM',
    significance: 'Optimal planetary transit for signing binding conveyances, sale deeds, and mortgage loans.'
  },
  {
    id: 'MUH-03',
    category: 'Bhoomi Pujan',
    dateStr: '2026-11-23 (Kartik Purnima)',
    auspiciousTithi: 'Purnima Tithi',
    nakshatra: 'Krittika',
    idealTimeSlot: '07:30 AM - 10:45 AM',
    significance: 'Traditional foundation stone laying ceremony (Shilanyas) for new plots and building structures.'
  },
  {
    id: 'MUH-04',
    category: 'Token / Booking',
    dateStr: '2026-12-02 (Margashirsha Shukla Ashtami)',
    auspiciousTithi: 'Shukla Paksha Ashtami',
    nakshatra: 'Hasta Nakshatra',
    idealTimeSlot: '11:00 AM - 02:30 PM',
    significance: 'Favorable for giving initial earnest money deposit (token) and signing booking application.'
  }
];
