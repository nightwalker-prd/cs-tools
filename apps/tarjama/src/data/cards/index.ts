import type { TranslationCard } from '../types';
import { FSTU_CARDS } from './fstu-cards';
import { QURAN_CARDS } from './quran-cards';
import { HADITH_CARDS } from './hadith-cards';

/** All translation cards across all sources */
export const ALL_CARDS: TranslationCard[] = [
  ...FSTU_CARDS,
  ...QURAN_CARDS,
  ...HADITH_CARDS,
];

/** Get cards filtered by criteria */
export function getFilteredCards(filters: {
  difficulty?: 'all' | 'beginner' | 'intermediate' | 'advanced';
  source?: 'all' | 'fstu' | 'quran' | 'hadith' | 'custom';
  nahwTopic?: string | 'all';
}): TranslationCard[] {
  let cards = ALL_CARDS;

  if (filters.difficulty && filters.difficulty !== 'all') {
    cards = cards.filter(c => c.difficulty === filters.difficulty);
  }
  if (filters.source && filters.source !== 'all') {
    cards = cards.filter(c => c.source === filters.source);
  }
  if (filters.nahwTopic && filters.nahwTopic !== 'all') {
    cards = cards.filter(c => c.nahwTopics.includes(filters.nahwTopic!));
  }

  return cards;
}

/** Get a card by ID */
export function getCardById(id: string): TranslationCard | undefined {
  return ALL_CARDS.find(c => c.id === id);
}

export { FSTU_CARDS, QURAN_CARDS, HADITH_CARDS };
