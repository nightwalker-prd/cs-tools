/**
 * Morphological Chain Data Loader
 *
 * Loads pre-generated JSON data for the Morphological Chain test.
 * Data is fetched at runtime (not bundled) to keep chunk sizes small.
 */

import type { QuranicFrequencyTier } from '../types';

export interface MorphChainStep {
  arabic: string;
  meaning: string;
  changeDesc: string;
  form: string;
  affixes: string;
}

export interface MorphChainItem {
  id: string;
  root: string;
  rootMeaning: string;
  tier: QuranicFrequencyTier;
  steps: MorphChainStep[];
  blankStep: number;
  distractors: string[];
}

let cachedData: MorphChainItem[] | null = null;

export async function loadMorphChainData(): Promise<MorphChainItem[]> {
  if (cachedData) return cachedData;
  try {
    const resp = await fetch(import.meta.env.BASE_URL + 'data/morph-chains.json');
    if (!resp.ok) {
      console.warn('[nation-test] Failed to load morph-chains.json:', resp.status);
      return [];
    }
    cachedData = await resp.json();
    return cachedData!;
  } catch (err) {
    console.warn('[nation-test] Error loading morph-chains.json:', err);
    return [];
  }
}
