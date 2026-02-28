import type { ReadingText } from './reading';
import { beginnerTexts } from './reading/beginner';
import { intermediateTexts } from './reading/intermediate';
import { advancedTexts } from './reading/advanced';
import { essayTexts } from './reading/essays';
import { scienceTexts } from './reading/science';
import { societyTexts } from './reading/society';
import { travelTexts } from './reading/travel';
import { historyTexts } from './reading/history';
import { poetryLitTexts } from './reading/poetry-lit';
import { ghazalTexts } from './reading/ghazal';
import { biographicalTexts } from './reading/biographical';
import { fableTexts } from './reading/fables';
import { wisdomTexts } from './reading/wisdom';
import { spiritualityTexts } from './reading/spirituality';
import { vividScenesTexts } from './reading/vivid-scenes';
import { humorSatireTexts } from './reading/humor-satire';
import { satireTalesTexts } from './reading/satire-tales';
import { dialoguesTexts } from './reading/dialogues';
import { foodHospitalityTexts } from './reading/food-hospitality';
import { courageBraveryTexts } from './reading/courage-bravery';
import { lettersCorrespondenceTexts } from './reading/letters-correspondence';
import { natureDescriptionsTexts } from './reading/nature-descriptions';
import { dreamsVisionsTexts } from './reading/dreams-visions';
import { medicineHealingTexts } from './reading/medicine-healing';
import { foreignPolicyTexts } from './reading/foreign-policy';
import { securityIntelligenceTexts } from './reading/security-intelligence';
import { geopoliticalEssaysTexts } from './reading/geopolitical-essays';
import { madarijTexts } from './reading/madarij';

export interface Collection {
  id: string;
  titleEn: string;
  titleAr: string;
  description: string;
  icon: string;
  texts: ReadingText[];
  /** If true, texts use the `category` field as subcategories in the sidebar */
  hasSubcategories?: boolean;
}

export const collections: Collection[] = [
  {
    id: 'beginner',
    titleEn: 'Beginner Texts',
    titleAr: 'نصوص للمبتدئين',
    description: 'Simple texts for new Arabic learners',
    icon: '🌱',
    texts: beginnerTexts,
    hasSubcategories: true,
  },
  {
    id: 'intermediate',
    titleEn: 'Intermediate Texts',
    titleAr: 'نصوص متوسطة',
    description: 'Texts for developing Arabic readers',
    icon: '📖',
    texts: intermediateTexts,
    hasSubcategories: true,
  },
  {
    id: 'advanced',
    titleEn: 'Advanced Texts',
    titleAr: 'نصوص متقدمة',
    description: 'Challenging texts for proficient readers',
    icon: '🎓',
    texts: advancedTexts,
    hasSubcategories: true,
  },
  {
    id: 'essays',
    titleEn: 'Essays & Reflections',
    titleAr: 'مقالات وتأملات',
    description: 'Thought-provoking essays and reflections',
    icon: '✍️',
    texts: essayTexts,
  },
  {
    id: 'science',
    titleEn: 'Science & Nature',
    titleAr: 'العلوم والطبيعة',
    description: 'Explore the natural world in Arabic',
    icon: '🔬',
    texts: scienceTexts,
  },
  {
    id: 'society',
    titleEn: 'Society & Culture',
    titleAr: 'المجتمع والثقافة',
    description: 'Social and cultural topics',
    icon: '🏛️',
    texts: societyTexts,
  },
  {
    id: 'travel',
    titleEn: 'Travel & Geography',
    titleAr: 'السفر والجغرافيا',
    description: 'Journey through lands and places',
    icon: '🌍',
    texts: travelTexts,
  },
  {
    id: 'history',
    titleEn: 'History & Events',
    titleAr: 'التاريخ والأحداث',
    description: 'Historical narratives and events',
    icon: '📜',
    texts: historyTexts,
  },
  {
    id: 'poetry',
    titleEn: 'Poetry & Literature',
    titleAr: 'الشعر والأدب',
    description: 'Classical and modern Arabic poetry',
    icon: '🪶',
    texts: [...poetryLitTexts, ...ghazalTexts],
  },
  {
    id: 'stories',
    titleEn: 'Stories & Fables',
    titleAr: 'القصص والحكايات',
    description: 'Fables, biographies, and satirical tales',
    icon: '📚',
    texts: [...fableTexts, ...biographicalTexts, ...satireTalesTexts],
  },
  {
    id: 'wisdom',
    titleEn: 'Wisdom & Spirituality',
    titleAr: 'الحكمة والروحانية',
    description: 'Wisdom, proverbs, and spiritual reflections',
    icon: '🕌',
    texts: [...wisdomTexts, ...spiritualityTexts, ...dreamsVisionsTexts],
  },
  {
    id: 'daily-life',
    titleEn: 'Daily Life',
    titleAr: 'الحياة اليومية',
    description: 'Humor, dialogues, food, and vivid scenes',
    icon: '☕',
    texts: [...humorSatireTexts, ...dialoguesTexts, ...foodHospitalityTexts, ...vividScenesTexts],
  },
  {
    id: 'values',
    titleEn: 'Values & Character',
    titleAr: 'القيم والشخصية',
    description: 'Courage, correspondence, nature, and medicine',
    icon: '⚔️',
    texts: [...courageBraveryTexts, ...lettersCorrespondenceTexts, ...natureDescriptionsTexts, ...medicineHealingTexts],
  },
  {
    id: 'geopolitics',
    titleEn: 'Geopolitics',
    titleAr: 'الجيوسياسة',
    description: 'Foreign policy, security, and geopolitical essays',
    icon: '🌐',
    texts: [...foreignPolicyTexts, ...securityIntelligenceTexts, ...geopoliticalEssaysTexts],
  },
  {
    id: 'madarij',
    titleEn: "Madarij al-Qira'a",
    titleAr: 'مَدَارِجُ القِرَاءَة',
    description: 'Beginner Arabic stories from the Madarij al-Qira\'a textbook',
    icon: '📖',
    texts: madarijTexts,
  },
];

/** Map from text ID to ReadingText for quick lookup */
export const textMap: Record<string, ReadingText> = {};
for (const col of collections) {
  for (const t of col.texts) {
    textMap[t.id] = t;
  }
}

/** Map from text ID to its parent Collection */
export const collectionForText: Record<string, Collection> = {};
for (const col of collections) {
  for (const t of col.texts) {
    collectionForText[t.id] = col;
  }
}

/** Get all texts across all collections */
export function getAllTexts(): ReadingText[] {
  return collections.flatMap(c => c.texts);
}

/** Total text count */
export const totalTextCount = collections.reduce((sum, c) => sum + c.texts.length, 0);
