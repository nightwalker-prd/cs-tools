import type { BackTranslationPassage } from '../types';
import { QURAN_PASSAGES } from './quran-passages';
import { HADITH_PASSAGES } from './hadith-passages';
import { PROSE_PASSAGES } from './prose-passages';
import { GRAMMAR_PASSAGES } from './grammar-passages';

export const ALL_PASSAGES: BackTranslationPassage[] = [
  ...QURAN_PASSAGES,
  ...HADITH_PASSAGES,
  ...PROSE_PASSAGES,
  ...GRAMMAR_PASSAGES,
];

export function getFilteredPassages(filters: {
  difficulty?: 'all' | 'beginner' | 'intermediate' | 'advanced';
  source?: 'all' | 'quran' | 'hadith' | 'prose' | 'grammar';
}): BackTranslationPassage[] {
  let passages = ALL_PASSAGES;

  if (filters.difficulty && filters.difficulty !== 'all') {
    passages = passages.filter(p => p.difficulty === filters.difficulty);
  }
  if (filters.source && filters.source !== 'all') {
    passages = passages.filter(p => p.source === filters.source);
  }

  return passages;
}

export function getPassageById(id: string): BackTranslationPassage | undefined {
  return ALL_PASSAGES.find(p => p.id === id);
}

export { QURAN_PASSAGES, HADITH_PASSAGES, PROSE_PASSAGES, GRAMMAR_PASSAGES };
