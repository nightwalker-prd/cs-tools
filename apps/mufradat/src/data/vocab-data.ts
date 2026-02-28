import {
  level1k,
  level2k,
  level3k,
  level5k,
  level10k,
} from '@arabtools/data';
import type { WordFamily } from '@arabtools/data';
import type { VocabBand, VocabPosGroup } from '../types';

// ─── POS labels ───

const POS_LABELS: Record<string, string> = {
  noun: 'اسم',
  verb: 'فعل',
  adjective: 'صفة',
  particle: 'حرف',
  adverb: 'ظرف',
  preposition: 'حرف جر',
  other: 'أخرى',
};

// ─── Flat data ───

export const allWords: WordFamily[] = [
  ...level1k,
  ...level2k,
  ...level3k,
  ...level5k,
  ...level10k,
];

export const wordById = new Map<string, WordFamily>();
for (const word of allWords) {
  wordById.set(word.id, word);
}

// ─── Band definitions ───

const BAND_DEFS: { id: string; titleEn: string; titleAr: string; description: string; color: string; words: WordFamily[] }[] = [
  { id: '1k', titleEn: 'Top 1,000', titleAr: 'الألف الأولى', description: 'Most frequent Arabic words — essential for basic reading', color: '#22c55e', words: level1k },
  { id: '2k', titleEn: 'Top 2,000', titleAr: 'الألف الثانية', description: 'High frequency words for intermediate reading', color: '#3b82f6', words: level2k },
  { id: '3k', titleEn: 'Top 3,000', titleAr: 'الألف الثالثة', description: 'Medium frequency words for fluent reading', color: '#a855f7', words: level3k },
  { id: '5k', titleEn: 'Top 5,000', titleAr: 'حتى الخمسة آلاف', description: 'Lower frequency words for advanced texts', color: '#f59e0b', words: level5k },
  { id: '10k', titleEn: 'Top 10,000', titleAr: 'حتى العشرة آلاف', description: 'Specialized vocabulary for mastery', color: '#ef4444', words: level10k },
];

function buildPosGroups(bandId: string, words: WordFamily[]): VocabPosGroup[] {
  const groups = new Map<string, string[]>();

  for (const word of words) {
    const pos = word.partOfSpeech || 'other';
    const normalized = ['noun', 'verb', 'adjective', 'particle', 'adverb', 'preposition'].includes(pos) ? pos : 'other';
    if (!groups.has(normalized)) {
      groups.set(normalized, []);
    }
    groups.get(normalized)!.push(word.id);
  }

  // Sort groups by size descending
  const sorted = [...groups.entries()].sort((a, b) => b[1].length - a[1].length);

  return sorted.map(([pos, wordIds]) => ({
    id: `${bandId}-${pos}`,
    pos,
    posAr: POS_LABELS[pos] || 'أخرى',
    bandId,
    wordIds,
  }));
}

export const vocabBands: VocabBand[] = BAND_DEFS.map(def => ({
  id: def.id,
  titleEn: def.titleEn,
  titleAr: def.titleAr,
  description: def.description,
  color: def.color,
  posGroups: buildPosGroups(def.id, def.words),
}));

export const bandById = new Map<string, VocabBand>();
for (const band of vocabBands) {
  bandById.set(band.id, band);
}

export function getWordsForBand(bandId: string): WordFamily[] {
  const band = bandById.get(bandId);
  if (!band) return [];
  return band.posGroups.flatMap(g => g.wordIds.map(id => wordById.get(id)!).filter(Boolean));
}

export function getWordsForPosGroup(groupId: string): WordFamily[] {
  for (const band of vocabBands) {
    const group = band.posGroups.find(g => g.id === groupId);
    if (group) {
      return group.wordIds.map(id => wordById.get(id)!).filter(Boolean);
    }
  }
  return [];
}

export function getBandForWord(wordId: string): VocabBand | undefined {
  const word = wordById.get(wordId);
  if (!word) return undefined;
  return bandById.get(word.level);
}
