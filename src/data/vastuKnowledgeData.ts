// src/data/vastuKnowledgeData.ts
import { VastuRule, VastuZone, VastuFinding, VastuAssessmentResult } from '@/types';

export const VASTU_DISCLAIMER_TEXT = 
  "Important Note: Vastu Shastra, astrology, and numerology are traditional Indian cultural frameworks for spatial harmony and personal consideration. They are not scientifically proven methods for predicting property or life outcomes. A traditional 'dosh' does not guarantee failure, financial loss, or misfortune. These observations are provided for cultural and architectural harmony and should never replace legal title verification, structural safety inspection, or financial affordability analysis.";

export const DIRECTION_ATTRIBUTES: Record<VastuZone, {
  name: string;
  deity: string;
  element: string;
  nature: string;
  traditionalRole: string;
  colorTone: string;
}> = {
  NE: {
    name: 'North-East (Ishanya)',
    deity: 'Lord Shiva / Jupiter',
    element: 'Water (Jala)',
    nature: 'Openness, purity, spiritual clarity',
    traditionalRole: 'Puja room, light structures, underground water sump, large open windows',
    colorTone: 'Light Blue, Off-White, Pale Yellow'
  },
  E: {
    name: 'East (Purva)',
    deity: 'Indra / Sun',
    element: 'Solar Energy',
    nature: 'Vitality, health, illumination',
    traditionalRole: 'Main entrance, study room, balcony, morning sunlight reception',
    colorTone: 'Light Green, White, Cream'
  },
  SE: {
    name: 'South-East (Agneya)',
    deity: 'Agni (Fire) / Venus',
    element: 'Fire (Agni)',
    nature: 'Transformation, thermal energy, passion',
    traditionalRole: 'Kitchen, gas stove, electrical meters, transformers, heating equipment',
    colorTone: 'Pastel Peach, Rose, Warm Coral'
  },
  S: {
    name: 'South (Dakshin)',
    deity: 'Yama / Mars',
    element: 'Fire & Earth',
    nature: 'Discipline, rest, density',
    traditionalRole: 'Bedrooms, overhead storage, solid walls without excessive openings',
    colorTone: 'Terracotta, Earthy Brown, Almond'
  },
  SW: {
    name: 'South-West (Nairutya)',
    deity: 'Nirriti / Rahu',
    element: 'Earth (Prithvi)',
    nature: 'Stability, leadership, grounding strength',
    traditionalRole: 'Master bedroom, family head room, heaviest furniture, lockers, high structures',
    colorTone: 'Ochre, Earth Tan, Warm Gold'
  },
  W: {
    name: 'West (Paschim)',
    deity: 'Varuna / Saturn',
    element: 'Water & Air',
    nature: 'Evening calm, reflection, discipline',
    traditionalRole: 'Children’s study/bedroom, dining space, overhead water tank',
    colorTone: 'White, Grey, Soft Blue'
  },
  NW: {
    name: 'North-West (Vayavya)',
    deity: 'Vayu (Wind) / Moon',
    element: 'Air (Vayu)',
    nature: 'Mobility, circulation, connectivity',
    traditionalRole: 'Guest bedroom, unmarried daughters’ room, garage, pantry, finished goods',
    colorTone: 'White, Pearl Grey, Light Cream'
  },
  N: {
    name: 'North (Uttar)',
    deity: 'Kubera (Wealth) / Mercury',
    element: 'Magnetic / Water',
    nature: 'Prosperity, career growth, financial inflows',
    traditionalRole: 'Living room, financial documents, cash safe, main entrance',
    colorTone: 'Light Green, Pale Blue, Mint'
  },
  CENTER: {
    name: 'Center (Brahmasthan)',
    deity: 'Lord Brahma',
    element: 'Ether / Space (Akasha)',
    nature: 'Spiritual equilibrium, heart of the premises',
    traditionalRole: 'Open courtyard, central passage, kept uncluttered with zero heavy loads',
    colorTone: 'Crystal Clear, Pure White, Luminous Off-White'
  }
};

export const VASTU_RULES_DATABASE: VastuRule[] = [
  {
    id: 'VR-ENTRANCE',
    roomType: 'Main Entrance',
    idealZones: ['N', 'NE', 'E'],
    secondaryZones: ['NW', 'W'],
    unfavorableZones: ['SW', 'S'],
    ruleName: 'Main Door Orientation',
    element: 'General',
    traditionalRationale: 'The main entrance regulates cosmic and pranic energy influx. North and East welcome solar and magnetic energy, fostering prosperity and clarity.',
    practicalAdjustment: 'Install bright illumination at the entrance, maintain a clean threshold, and add brass auspicious symbols or a threshold bar.',
    traditionalRemedy: 'Affix a Swastik, Om, or Trishul emblem in brass or copper; place a consecrated copper spiral or Vastu pyramid strips along the door frame.'
  },
  {
    id: 'VR-KITCHEN',
    roomType: 'Kitchen (Cooking Platform)',
    idealZones: ['SE'],
    secondaryZones: ['NW'],
    unfavorableZones: ['NE', 'SW', 'CENTER'],
    ruleName: 'Agneya Fire-Zone Alignment',
    element: 'Fire',
    traditionalRationale: 'Cooking involves Agni (fire). Placing fire in the South-East maintains elemental harmony. Kitchen in the North-East causes Water-Fire conflict.',
    practicalAdjustment: 'If kitchen is in North-East, place green/natural stone slab under gas hob, avoid red accents, and isolate water sink at least 3 feet from stove.',
    traditionalRemedy: 'Install a zinc or copper elemental crystal plate and keep a brass bowl with sea salt to absorb conflicting vibrations.'
  },
  {
    id: 'VR-MASTER-BEDROOM',
    roomType: 'Master Bedroom',
    idealZones: ['SW'],
    secondaryZones: ['S', 'W'],
    unfavorableZones: ['NE', 'SE', 'CENTER'],
    ruleName: 'Nairutya Stability and Grounding',
    element: 'Earth',
    traditionalRationale: 'The master of the household requires stability and grounded decisions, symbolized by the heavy Earth element in the South-West.',
    practicalAdjustment: 'Ensure bed headboard faces South or East. Use sturdy wooden bed frames without under-bed clutter or mirrors reflecting the sleeping posture.',
    traditionalRemedy: 'Place heavy earth elements (brass statue, natural clay pottery, or lead pyramid blocks) in the SW corner.'
  },
  {
    id: 'VR-PUJA-ROOM',
    roomType: 'Puja Room / Mandir',
    idealZones: ['NE'],
    secondaryZones: ['E', 'N'],
    unfavorableZones: ['S', 'SW', 'SE'],
    ruleName: 'Ishanya Spiritual Sanctum',
    element: 'Water',
    traditionalRationale: 'North-East represents the gateway of spiritual energy and higher consciousness, ideal for meditation and prayer.',
    practicalAdjustment: 'Keep mandir elevated, face East or North while praying, ensure excellent natural morning light, and never place temple under staircases or adjoining toilets.',
    traditionalRemedy: 'Keep a clean water Kalash with fresh water changed daily and a small brass bell in the mandir.'
  },
  {
    id: 'VR-TOILET-BATH',
    roomType: 'Bathroom / Toilet',
    idealZones: ['NW', 'W'],
    secondaryZones: ['S'],
    unfavorableZones: ['NE', 'SW', 'CENTER'],
    ruleName: 'Waste Elimination and Air Circulation',
    element: 'Air',
    traditionalRationale: 'Toilets represent negative bio-waste and downward energy. Placing them in North-East or Brahmasthan compromises overall space harmony.',
    practicalAdjustment: 'Keep commode lid closed, ensure active exhaust ventilation, use soft earth-tone tiles, and keep a bowl of rock salt in the toilet.',
    traditionalRemedy: 'Place lead/brass wire perimeter around the toilet floor boundary to restrict negative energetic diffusion.'
  },
  {
    id: 'VR-STAIRCASING',
    roomType: 'Staircase',
    idealZones: ['S', 'SW', 'W'],
    secondaryZones: ['NW'],
    unfavorableZones: ['NE', 'CENTER', 'E'],
    ruleName: 'Heavy Structural Loading',
    element: 'Earth',
    traditionalRationale: 'Stairs constitute heavy permanent masonry. Heavy structures in the South and West create favorable protective barriers against harsh afternoon heat.',
    practicalAdjustment: 'Stairs should ascend in a clockwise direction. Never locate prayer rooms or toilets under active staircases.',
    traditionalRemedy: 'Install warm, grounded lighting along steps; if in North-East, hang a light faceted crystal ball to disperse heavy energy.'
  },
  {
    id: 'VR-BRAHMASTHAN',
    roomType: 'Center (Brahmasthan)',
    idealZones: ['CENTER'],
    secondaryZones: [],
    unfavorableZones: ['NE', 'SW', 'SE'],
    ruleName: 'Central Spatial Void',
    element: 'Ether',
    traditionalRationale: 'The Brahmasthan is the vital energetic hub of any plot or flat. It must remain open, uncluttered, and unburdened by heavy pillars or septic tanks.',
    practicalAdjustment: 'Keep the central hall or foyer free of heavy furniture, partitions, or sunken pits. Ensure adequate ambient light.',
    traditionalRemedy: 'Place a brass bowl filled with fresh water and floating flower petals or a soft crystal prism.'
  },
  {
    id: 'VR-COMMERCIAL-CASHIER',
    roomType: 'Commercial Cash Counter / Accounts',
    idealZones: ['N'],
    secondaryZones: ['E'],
    unfavorableZones: ['S', 'SW'],
    ruleName: 'Kubera Prosperity Node',
    element: 'Water',
    traditionalRationale: 'North is governed by Lord Kubera, the treasurer of wealth. Financial registers and lockers opening towards the North encourage steady cash flow.',
    practicalAdjustment: 'Cashier should sit facing North or East. Safe door should open towards the North.',
    traditionalRemedy: 'Keep a silver coin or Kuber Yantra inside the cash drawer with sandalwood essence.'
  }
];

export function evaluateVastuLayout(
  propertyTitle: string,
  propertyType: string,
  entrance: VastuZone,
  rooms: Record<string, VastuZone>
): VastuAssessmentResult {
  const findings: VastuFinding[] = [];
  let scoreSum = 0;
  let maxPossibleScore = 0;

  // 1. Entrance Check
  const entranceRule = VASTU_RULES_DATABASE.find(r => r.roomType === 'Main Entrance');
  if (entranceRule) {
    maxPossibleScore += 25;
    if (entranceRule.idealZones.includes(entrance)) {
      scoreSum += 25;
      findings.push({
        id: 'VF-ENTRANCE-01',
        roomType: 'Main Entrance',
        assignedZone: entrance,
        severity: 'favorable',
        ruleApplied: entranceRule.ruleName,
        explanation: `Excellent alignment: Entrance faces ${DIRECTION_ATTRIBUTES[entrance].name}, facilitating positive pranic and solar energy influx.`,
        practicalSuggestion: entranceRule.practicalAdjustment,
        traditionalRemedy: 'Maintain clean, well-lit threshold with natural plant or auspicious brass symbols.'
      });
    } else if (entranceRule.secondaryZones.includes(entrance)) {
      scoreSum += 18;
      findings.push({
        id: 'VF-ENTRANCE-02',
        roomType: 'Main Entrance',
        assignedZone: entrance,
        severity: 'neutral',
        ruleApplied: entranceRule.ruleName,
        explanation: `Acceptable secondary placement: Entrance in ${DIRECTION_ATTRIBUTES[entrance].name}. Practical lighting and entryway organization are recommended.`,
        practicalSuggestion: entranceRule.practicalAdjustment,
        traditionalRemedy: entranceRule.traditionalRemedy
      });
    } else {
      scoreSum += 8;
      findings.push({
        id: 'VF-ENTRANCE-03',
        roomType: 'Main Entrance',
        assignedZone: entrance,
        severity: 'caution',
        ruleApplied: entranceRule.ruleName,
        explanation: `Traditional Vastu review recommended: Entrance faces ${DIRECTION_ATTRIBUTES[entrance].name}, which is traditionally reserved for heavy or grounding zones.`,
        practicalSuggestion: 'Ensure strong LED lighting, avoid dark color schemes at main door, and keep the foyer clutter-free.',
        traditionalRemedy: entranceRule.traditionalRemedy
      });
    }
  }

  // 2. Room Checks
  Object.entries(rooms).forEach(([roomName, zone], idx) => {
    const matchedRule = VASTU_RULES_DATABASE.find(r => r.roomType.toLowerCase().includes(roomName.toLowerCase()) || roomName.toLowerCase().includes(r.roomType.toLowerCase()));
    if (matchedRule) {
      maxPossibleScore += 20;
      if (matchedRule.idealZones.includes(zone)) {
        scoreSum += 20;
        findings.push({
          id: `VF-${idx}-${roomName}`,
          roomType: matchedRule.roomType,
          assignedZone: zone,
          severity: 'favorable',
          ruleApplied: matchedRule.ruleName,
          explanation: `Ideal placement: ${matchedRule.roomType} positioned in ${DIRECTION_ATTRIBUTES[zone].name}, aligning with the ${matchedRule.element} element.`,
          practicalSuggestion: matchedRule.practicalAdjustment,
          traditionalRemedy: 'Standard maintenance and clean ventilation recommended.'
        });
      } else if (matchedRule.secondaryZones.includes(zone)) {
        scoreSum += 14;
        findings.push({
          id: `VF-${idx}-${roomName}`,
          roomType: matchedRule.roomType,
          assignedZone: zone,
          severity: 'neutral',
          ruleApplied: matchedRule.ruleName,
          explanation: `Moderate placement: ${matchedRule.roomType} in ${DIRECTION_ATTRIBUTES[zone].name}. Acceptable with standard spatial adjustments.`,
          practicalSuggestion: matchedRule.practicalAdjustment,
          traditionalRemedy: matchedRule.traditionalRemedy
        });
      } else if (matchedRule.unfavorableZones.includes(zone)) {
        scoreSum += 5;
        findings.push({
          id: `VF-${idx}-${roomName}`,
          roomType: matchedRule.roomType,
          assignedZone: zone,
          severity: 'critical',
          ruleApplied: matchedRule.ruleName,
          explanation: `Traditional conflict identified: ${matchedRule.roomType} placed in ${DIRECTION_ATTRIBUTES[zone].name}. Contradicts traditional ${matchedRule.element} balance.`,
          practicalSuggestion: matchedRule.practicalAdjustment,
          traditionalRemedy: matchedRule.traditionalRemedy
        });
      } else {
        scoreSum += 10;
        findings.push({
          id: `VF-${idx}-${roomName}`,
          roomType: matchedRule.roomType,
          assignedZone: zone,
          severity: 'caution',
          ruleApplied: matchedRule.ruleName,
          explanation: `Neutral zone position: ${matchedRule.roomType} in ${DIRECTION_ATTRIBUTES[zone].name}. Review lighting and ventilation.`,
          practicalSuggestion: matchedRule.practicalAdjustment,
          traditionalRemedy: matchedRule.traditionalRemedy
        });
      }
    }
  });

  const finalScore = maxPossibleScore > 0 ? Math.round((scoreSum / maxPossibleScore) * 100) : 75;

  return {
    id: `VA-${Date.now().toString().slice(-6)}`,
    propertyTitle,
    propertyType,
    entranceDirection: entrance,
    roomPlacements: rooms,
    findings,
    score: finalScore,
    createdAt: new Date().toISOString(),
    disclaimer: VASTU_DISCLAIMER_TEXT
  };
}
