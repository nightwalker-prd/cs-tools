/**
 * Grammar Tag Identification Data Loader
 *
 * Loads pre-generated JSON data for the Grammar Tag Identification test.
 * Data is fetched at runtime (not bundled) to keep chunk sizes small.
 */

import type { QuranicFrequencyTier } from '../types';

export interface GrammarTagDistractor {
  tag: string;
  desc: string;
  color: string;
}

export interface GrammarTagItem {
  id: string;
  surahNum: number;
  ayahNum: number;
  wordNum: number;
  arabic: string;
  meaning: string;
  ayahArabic: string;
  ayahEnglish: string;
  correctTag: string;
  correctTagDesc: string;
  correctTagColor: string;
  distractors: GrammarTagDistractor[];
  root: string;
  lemma: string;
  pos: string;
  verbForm: string;
  tier: QuranicFrequencyTier;
}

let cachedData: GrammarTagItem[] | null = null;

export async function loadGrammarTagData(): Promise<GrammarTagItem[]> {
  if (cachedData) return cachedData;
  try {
    const resp = await fetch(import.meta.env.BASE_URL + 'data/grammar-tags.json');
    if (!resp.ok) {
      console.warn('[nation-test] Failed to load grammar-tags.json:', resp.status);
      return [];
    }
    cachedData = await resp.json();
    return cachedData!;
  } catch (err) {
    console.warn('[nation-test] Error loading grammar-tags.json:', err);
    return [];
  }
}
