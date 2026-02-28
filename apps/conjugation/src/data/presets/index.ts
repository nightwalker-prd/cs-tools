/**
 * Sarf Vocabulary Unit Presets
 *
 * Pre-built word lists extracted from the 10 Sarf vocabulary PDFs.
 * Each unit focuses on different verb forms and types.
 */

import type { ArabicWord } from '../arabicRoots';

/**
 * Preset word list metadata
 */
export interface PresetWordList {
  id: string;
  name: string;
  nameAr: string;
  description: string;
  verbCount: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  focusAreas: string[];
  words: ArabicWord[];
}

// Import all unit data
import { sarfUnit1Words } from './sarfUnit1';
import { sarfUnit2Words } from './sarfUnit2';
import { sarfUnit3Words } from './sarfUnit3';
import { sarfUnit4Section1Words } from './sarfUnit4Section1';
import { sarfUnit4Section2Words } from './sarfUnit4Section2';
import { sarfUnit5Words } from './sarfUnit5';
import { sarfUnit6Words } from './sarfUnit6';
import { sarfUnit7Words } from './sarfUnit7';
import { sarfUnit8Words } from './sarfUnit8';
import { sarfUnit9Words } from './sarfUnit9';

/**
 * All available preset word lists
 */
export const presetWordLists: PresetWordList[] = [
  {
    id: 'sarf-unit-1',
    name: 'Sarf Unit 1',
    nameAr: 'الوحدة الأولى',
    description: 'Form I regular verbs - foundational vocabulary',
    verbCount: sarfUnit1Words.length,
    difficulty: 'beginner',
    focusAreas: ['Form I', 'Regular verbs'],
    words: sarfUnit1Words,
  },
  {
    id: 'sarf-unit-2',
    name: 'Sarf Unit 2',
    nameAr: 'الوحدة الثانية',
    description: 'Derived forms - Forms II through X patterns',
    verbCount: sarfUnit2Words.length,
    difficulty: 'intermediate',
    focusAreas: ['Derived forms', 'Forms II-X'],
    words: sarfUnit2Words,
  },
  {
    id: 'sarf-unit-3',
    name: 'Sarf Unit 3',
    nameAr: 'الوحدة الثالثة',
    description: 'Hamzated verbs (verbs with hamza)',
    verbCount: sarfUnit3Words.length,
    difficulty: 'intermediate',
    focusAreas: ['Hamzated verbs', "Mahmooz al-Fa'", "Mahmooz al-'Ayn", 'Mahmooz al-Lam'],
    words: sarfUnit3Words,
  },
  {
    id: 'sarf-unit-4-section-1',
    name: 'Sarf Unit 4 Section 1',
    nameAr: 'الوحدة الرابعة - القسم الأول',
    description: 'Waw-initial verbs (Mithal)',
    verbCount: sarfUnit4Section1Words.length,
    difficulty: 'intermediate',
    focusAreas: ['Mithal verbs', 'Waw-initial'],
    words: sarfUnit4Section1Words,
  },
  {
    id: 'sarf-unit-4-section-2',
    name: 'Sarf Unit 4 Section 2',
    nameAr: 'الوحدة الرابعة - القسم الثاني',
    description: 'Ya-initial verbs (Mithal)',
    verbCount: sarfUnit4Section2Words.length,
    difficulty: 'intermediate',
    focusAreas: ['Mithal verbs', 'Ya-initial'],
    words: sarfUnit4Section2Words,
  },
  {
    id: 'sarf-unit-5',
    name: 'Sarf Unit 5',
    nameAr: 'الوحدة الخامسة',
    description: 'Hollow verbs (Ajwaf) - weak middle letter',
    verbCount: sarfUnit5Words.length,
    difficulty: 'intermediate',
    focusAreas: ['Ajwaf verbs', 'Hollow verbs'],
    words: sarfUnit5Words,
  },
  {
    id: 'sarf-unit-6',
    name: 'Sarf Unit 6',
    nameAr: 'الوحدة السادسة',
    description: 'Defective verbs (Naqis) - weak final letter',
    verbCount: sarfUnit6Words.length,
    difficulty: 'advanced',
    focusAreas: ['Naqis verbs', 'Defective verbs'],
    words: sarfUnit6Words,
  },
  {
    id: 'sarf-unit-7',
    name: 'Sarf Unit 7',
    nameAr: 'الوحدة السابعة',
    description: 'Defective verbs continued - more Naqis patterns',
    verbCount: sarfUnit7Words.length,
    difficulty: 'advanced',
    focusAreas: ['Naqis verbs', 'Defective verbs'],
    words: sarfUnit7Words,
  },
  {
    id: 'sarf-unit-8',
    name: 'Sarf Unit 8',
    nameAr: 'الوحدة الثامنة',
    description: 'Doubled verbs and Lafif patterns',
    verbCount: sarfUnit8Words.length,
    difficulty: 'advanced',
    focusAreas: ["Mudaa'af", 'Lafif Maqroon', 'Lafif Mafrooq'],
    words: sarfUnit8Words,
  },
  {
    id: 'sarf-unit-9',
    name: 'Sarf Unit 9',
    nameAr: 'الوحدة التاسعة',
    description: 'Mixed weak-letter verbs - comprehensive review',
    verbCount: sarfUnit9Words.length,
    difficulty: 'advanced',
    focusAreas: ['Mixed patterns', 'Comprehensive'],
    words: sarfUnit9Words,
  },
];

/**
 * Get a preset by ID
 */
export function getPresetById(id: string): PresetWordList | undefined {
  return presetWordLists.find(preset => preset.id === id);
}

/**
 * Get all presets for a specific difficulty level
 */
export function getPresetsByDifficulty(difficulty: 'beginner' | 'intermediate' | 'advanced'): PresetWordList[] {
  return presetWordLists.filter(preset => preset.difficulty === difficulty);
}
