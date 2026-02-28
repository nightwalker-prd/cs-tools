/**
 * Quranic Frequency VST Data Loader
 *
 * Loads pre-generated JSON data for the Quranic Frequency VST test.
 * Data is fetched at runtime (not bundled) to keep chunk sizes small.
 */

import type { QuranicFrequencyTier } from '../types';

export interface QuranicVstItem {
  id: string;
  lemma: string;
  meaning: string;
  transliteration: string;
  root: string;
  pos: 'N' | 'V' | 'P';
  count: number;
  tier: QuranicFrequencyTier;
  rank: number;
  surahNum: number;
  ayahNum: number;
  distractors: string[];
  contextBefore: string;
  contextMatch: string;
  contextAfter: string;
  ayahArabic: string;
  ayahEnglish: string;
  etymology: string;
}

let cachedData: QuranicVstItem[] | null = null;

export async function loadQuranicVstData(): Promise<QuranicVstItem[]> {
  if (cachedData) return cachedData;
  try {
    const resp = await fetch(import.meta.env.BASE_URL + 'data/quranic-vst.json');
    if (!resp.ok) {
      console.warn('[nation-test] Failed to load quranic-vst.json:', resp.status);
      return [];
    }
    cachedData = await resp.json();
    return cachedData!;
  } catch (err) {
    console.warn('[nation-test] Error loading quranic-vst.json:', err);
    return [];
  }
}
