/**
 * Hans Wehr Dictionary Data Loader
 *
 * Lazy loads letter-specific JSON files from public/data/hans-wehr/
 */

import type { HansWehrEntry, HansWehrLetterData } from './types';

const DATA_BASE_URL = '/data/hans-wehr';

/**
 * Load Hans Wehr entries for a specific Arabic letter
 */
export async function loadHansWehrLetter(letter: string): Promise<HansWehrEntry[]> {
  try {
    const response = await fetch(`${DATA_BASE_URL}/${encodeURIComponent(letter)}.json`);

    if (!response.ok) {
      throw new Error(`Failed to load data for letter: ${letter}`);
    }

    const data: HansWehrLetterData = await response.json();
    return data.data || [];
  } catch (error) {
    console.error(`Error loading Hans Wehr letter ${letter}:`, error);
    throw error;
  }
}
