// src/data/reading/index.ts

export * from './types';
export * from './conceptRegistry';
export { beginnerTexts } from './beginner';
export { intermediateTexts } from './intermediate';
export { advancedTexts } from './advanced';
export { essayTexts } from './essays';
export { scienceTexts } from './science';
export { societyTexts } from './society';
export { travelTexts } from './travel';
export { historyTexts } from './history';
export { poetryLitTexts } from './poetry-lit';
export { ghazalTexts } from './ghazal';
export { biographicalTexts } from './biographical';
export { fableTexts } from './fables';
export { wisdomTexts } from './wisdom';
export { spiritualityTexts } from './spirituality';
export { vividScenesTexts } from './vivid-scenes';
export { humorSatireTexts } from './humor-satire';
export { satireTalesTexts } from './satire-tales';
export { dialoguesTexts } from './dialogues';
export { foodHospitalityTexts } from './food-hospitality';
export { courageBraveryTexts } from './courage-bravery';
export { lettersCorrespondenceTexts } from './letters-correspondence';
export { natureDescriptionsTexts } from './nature-descriptions';
export { dreamsVisionsTexts } from './dreams-visions';
export { medicineHealingTexts } from './medicine-healing';
export { foreignPolicyTexts } from './foreign-policy';
export { securityIntelligenceTexts } from './security-intelligence';
export { geopoliticalEssaysTexts } from './geopolitical-essays';
export { madarijTexts } from './madarij';
export { CATEGORIES } from './categories';

// NOTE: wordByWord is NOT re-exported here — it is lazy-loaded via dynamic import()
// in the ReadingTool component to keep the initial bundle small (~921K savings).

import { ReadingText, ReadingLevel } from './types';
import { beginnerTexts } from './beginner';
import { intermediateTexts } from './intermediate';
import { advancedTexts } from './advanced';
import { essayTexts } from './essays';
import { scienceTexts } from './science';
import { societyTexts } from './society';
import { travelTexts } from './travel';
import { historyTexts } from './history';
import { poetryLitTexts } from './poetry-lit';
import { ghazalTexts } from './ghazal';
import { biographicalTexts } from './biographical';
import { fableTexts } from './fables';
import { wisdomTexts } from './wisdom';
import { spiritualityTexts } from './spirituality';
import { vividScenesTexts } from './vivid-scenes';
import { humorSatireTexts } from './humor-satire';
import { satireTalesTexts } from './satire-tales';
import { dialoguesTexts } from './dialogues';
import { foodHospitalityTexts } from './food-hospitality';
import { courageBraveryTexts } from './courage-bravery';
import { lettersCorrespondenceTexts } from './letters-correspondence';
import { natureDescriptionsTexts } from './nature-descriptions';
import { dreamsVisionsTexts } from './dreams-visions';
import { medicineHealingTexts } from './medicine-healing';
import { foreignPolicyTexts } from './foreign-policy';
import { securityIntelligenceTexts } from './security-intelligence';
import { geopoliticalEssaysTexts } from './geopolitical-essays';
import { madarijTexts } from './madarij';

/**
 * All reading texts combined
 */
export const allReadingTexts: ReadingText[] = [
  ...beginnerTexts,
  ...intermediateTexts,
  ...advancedTexts,
  ...essayTexts,
  ...scienceTexts,
  ...societyTexts,
  ...travelTexts,
  ...historyTexts,
  ...poetryLitTexts,
  ...ghazalTexts,
  ...biographicalTexts,
  ...fableTexts,
  ...wisdomTexts,
  ...spiritualityTexts,
  ...vividScenesTexts,
  ...humorSatireTexts,
  ...satireTalesTexts,
  ...dialoguesTexts,
  ...foodHospitalityTexts,
  ...courageBraveryTexts,
  ...lettersCorrespondenceTexts,
  ...natureDescriptionsTexts,
  ...dreamsVisionsTexts,
  ...medicineHealingTexts,
  ...foreignPolicyTexts,
  ...securityIntelligenceTexts,
  ...geopoliticalEssaysTexts,
  ...madarijTexts,
];

/**
 * Get texts filtered by level
 */
export function getTextsByLevel(level: ReadingLevel): ReadingText[] {
  switch (level) {
    case 'beginner': return beginnerTexts;
    case 'intermediate': return intermediateTexts;
    case 'advanced': return advancedTexts;
  }
}

/**
 * Get texts filtered by category
 */
export function getTextsByCategory(category: string): ReadingText[] {
  return allReadingTexts.filter(t => t.category === category);
}

/**
 * Get single text by ID
 */
export function getTextById(id: string): ReadingText | undefined {
  return allReadingTexts.find(t => t.id === id);
}
