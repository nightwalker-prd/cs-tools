/**
 * Ayah Context Cloze Data Loader
 *
 * Loads pre-generated JSON data for the Ayah Context Cloze test.
 * Data is chunked by surah and fetched on demand.
 */

import type { QuranicFrequencyTier } from '../types';

export interface AyahContextItem {
  id: string;
  surahNum: number;
  ayahNum: number;
  wordNum: number;
  arabic: string;
  targetTranslation: string;
  ayahArabic: string;
  ayahEnglish: string;
  blankPosition: number;
  distractors: string[];
  pos: 'N' | 'V';
  lemma: string;
  tier: QuranicFrequencyTier;
  transliteration: string;
}

const surahCache = new Map<number, AyahContextItem[]>();

export async function loadAyahContextBySurah(surahNum: number): Promise<AyahContextItem[]> {
  if (surahCache.has(surahNum)) return surahCache.get(surahNum)!;
  try {
    const resp = await fetch(import.meta.env.BASE_URL + `data/ayah-context/surah-${surahNum}.json`);
    if (!resp.ok) return [];
    const data: AyahContextItem[] = await resp.json();
    surahCache.set(surahNum, data);
    return data;
  } catch {
    return [];
  }
}

export async function loadAyahContextData(tiers?: QuranicFrequencyTier[]): Promise<AyahContextItem[]> {
  const all: AyahContextItem[] = [];
  // Load all 114 surahs in parallel batches
  const batchSize = 20;
  for (let start = 1; start <= 114; start += batchSize) {
    const end = Math.min(start + batchSize, 115);
    const promises = [];
    for (let s = start; s < end; s++) {
      promises.push(loadAyahContextBySurah(s));
    }
    const results = await Promise.all(promises);
    for (const items of results) {
      all.push(...items);
    }
  }
  if (tiers && tiers.length > 0) {
    return all.filter(item => tiers.includes(item.tier));
  }
  return all;
}
