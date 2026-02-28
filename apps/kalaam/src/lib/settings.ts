/**
 * Kalaam app settings types and defaults.
 *
 * Settings are persisted in localStorage under the `kalaam-settings` key.
 */

export interface KalaamSettings {
  /** Number of new cards to introduce per day */
  newPerDay: number;
  /** Maximum number of review cards per session */
  maxReviews: number;
  /** Whether to delay grammar breakdowns until word is learned */
  delayGrammar: boolean;
  /** Whether to show transliteration alongside Arabic text */
  showTransliteration: boolean;
  /** Font size multiplier for Arabic text */
  fontSize: number;
  /** Surah numbers to prioritize in learning order */
  prioritizedSurahs: number[];
}

export const DEFAULT_SETTINGS: KalaamSettings = {
  newPerDay: 5,
  maxReviews: 20,
  delayGrammar: false,
  showTransliteration: true,
  fontSize: 1,
  prioritizedSurahs: [1, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114],
};

export const STORAGE_KEY = 'kalaam-settings';
