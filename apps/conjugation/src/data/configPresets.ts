/**
 * Configuration Presets for Conjugation Practice
 *
 * Mirrors the preset library word lists — each preset
 * auto-configures forms, verb types, conjugation types,
 * and selects the matching word list.
 */

export interface ConfigPreset {
  id: string;
  name: string;
  nameAr: string;
  description: string;
  forms: number[];
  verbTypes: string[];
  conjugationTypes: string[];
  /** Name of the matching preset word list (used to set active list) */
  presetListName: string;
  /** Optional cell count override */
  cellCount?: number;
  /** If true, disable Forms I-X progression for this preset */
  disableFormsProgression?: boolean;
  /** Fixed baab patterns for Form I — each entry is [pastVowel, presentVowel] on the عين */
  fixedBaabs?: [string, string][];
}

const ALL_CONJUGATION_TYPES = [
  'تصريف صغير',
  'الماضي المبني للمعلوم',
  'الماضي المبني للمجهول',
  'المضارع المبني للمعلوم',
  'المضارع المبني للمجهول',
  'الأمر',
  'النهي',
  'اسم الفاعل',
  'اسم المفعول',
];

const ALL_VERB_TYPES = [
  'Regular', 'Mithal', 'Ajwaf', 'Naqis', "Mudaa'af",
  "Mahmooz al-Fa'", "Mahmooz al-'Ayn", 'Mahmooz al-Lam',
  'Lafif Maqroon', 'Lafif Mafrooq',
];

export const CONFIG_PRESETS: ConfigPreset[] = [
  {
    id: 'sarf-unit-1',
    name: 'Unit 1',
    nameAr: 'الوحدة ١ - صحيح',
    description: 'Form I regular verbs — foundational vocabulary',
    forms: [1],
    verbTypes: ['Regular'],
    conjugationTypes: ALL_CONJUGATION_TYPES,
    presetListName: 'Sarf Unit 1',
    cellCount: 6,
    disableFormsProgression: true,
    fixedBaabs: [
      ['\u064E', '\u064E'], // فَتَحَ يَفْتَحُ (fatha/fatha)
      ['\u0650', '\u064E'], // سَمِعَ يَسْمَعُ (kasra/fatha)
      ['\u064E', '\u0650'], // ضَرَبَ يَضْرِبُ (fatha/kasra)
      ['\u064E', '\u064F'], // نَصَرَ يَنْصُرُ (fatha/damma)
      ['\u064F', '\u064F'], // كَرُمَ يَكْرُمُ (damma/damma)
      ['\u0650', '\u0650'], // حَسِبَ يَحْسِبُ (kasra/kasra)
    ],
  },
  {
    id: 'sarf-unit-2',
    name: 'Unit 2',
    nameAr: 'الوحدة ٢ - المزيد',
    description: 'Derived forms II–X with regular roots',
    forms: [2, 3, 4, 5, 6, 7, 8, 10],
    verbTypes: ['Regular'],
    conjugationTypes: ALL_CONJUGATION_TYPES,
    presetListName: 'Sarf Unit 2',
  },
  {
    id: 'sarf-unit-3',
    name: 'Unit 3',
    nameAr: 'الوحدة ٣ - مهموز',
    description: 'Hamzated verbs — verbs with hamza',
    forms: [1, 2, 3, 4, 5, 6, 7, 8, 10],
    verbTypes: ["Mahmooz al-Fa'", "Mahmooz al-'Ayn", 'Mahmooz al-Lam'],
    conjugationTypes: ALL_CONJUGATION_TYPES,
    presetListName: 'Sarf Unit 3',
  },
  {
    id: 'sarf-unit-4-section-1',
    name: 'Unit 4.1',
    nameAr: 'الوحدة ٤ - مثال واوي',
    description: 'Waw-initial assimilated verbs (Mithal)',
    forms: [1, 2, 3, 4, 5, 6, 7, 8, 10],
    verbTypes: ['Mithal'],
    conjugationTypes: ALL_CONJUGATION_TYPES,
    presetListName: 'Sarf Unit 4 Section 1',
  },
  {
    id: 'sarf-unit-4-section-2',
    name: 'Unit 4.2',
    nameAr: 'الوحدة ٤ - مثال يائي',
    description: 'Ya-initial assimilated verbs (Mithal)',
    forms: [1, 2, 3, 4, 5, 6, 7, 8, 10],
    verbTypes: ['Mithal'],
    conjugationTypes: ALL_CONJUGATION_TYPES,
    presetListName: 'Sarf Unit 4 Section 2',
  },
  {
    id: 'sarf-unit-5',
    name: 'Unit 5',
    nameAr: 'الوحدة ٥ - أجوف',
    description: 'Hollow verbs — weak middle letter',
    forms: [1, 2, 3, 4, 5, 6, 7, 8, 10],
    verbTypes: ['Ajwaf'],
    conjugationTypes: ALL_CONJUGATION_TYPES,
    presetListName: 'Sarf Unit 5',
  },
  {
    id: 'sarf-unit-6',
    name: 'Unit 6',
    nameAr: 'الوحدة ٦ - ناقص',
    description: 'Defective verbs — weak final letter',
    forms: [1, 2, 3, 4, 5, 6, 7, 8, 10],
    verbTypes: ['Naqis'],
    conjugationTypes: ALL_CONJUGATION_TYPES,
    presetListName: 'Sarf Unit 6',
  },
  {
    id: 'sarf-unit-7',
    name: 'Unit 7',
    nameAr: 'الوحدة ٧ - ناقص',
    description: 'Defective verbs continued — more Naqis patterns',
    forms: [1, 2, 3, 4, 5, 6, 7, 8, 10],
    verbTypes: ['Naqis'],
    conjugationTypes: ALL_CONJUGATION_TYPES,
    presetListName: 'Sarf Unit 7',
  },
  {
    id: 'sarf-unit-8',
    name: 'Unit 8',
    nameAr: 'الوحدة ٨ - مضاعف ولفيف',
    description: 'Doubled verbs and Lafif patterns',
    forms: [1, 2, 3, 4, 5, 6, 7, 8, 10],
    verbTypes: ["Mudaa'af", 'Lafif Maqroon', 'Lafif Mafrooq'],
    conjugationTypes: ALL_CONJUGATION_TYPES,
    presetListName: 'Sarf Unit 8',
  },
  {
    id: 'sarf-unit-9',
    name: 'Unit 9',
    nameAr: 'الوحدة ٩ - مراجعة',
    description: 'Comprehensive review — all verb types and forms',
    forms: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    verbTypes: ALL_VERB_TYPES,
    conjugationTypes: ALL_CONJUGATION_TYPES,
    presetListName: 'Sarf Unit 9',
  },
];

/**
 * Get a preset by ID
 */
export function getPresetById(id: string): ConfigPreset | undefined {
  return CONFIG_PRESETS.find(preset => preset.id === id);
}
