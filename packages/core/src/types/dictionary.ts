/**
 * Hans Wehr Dictionary Type Definitions
 */

/**
 * Verb form entry (I-X)
 */
export interface HansWehrVerbForm {
  form: string;
  arabic: string;
  transliteration: string;
  meaning: string;
}

/**
 * Noun or derived form entry
 */
export interface HansWehrNoun {
  arabic: string;
  transliteration: string;
  plural?: string;
  meaning: string;
  gender?: 'masculine' | 'feminine';
}

/**
 * Complete dictionary entry for a root
 */
export interface HansWehrEntry {
  root: string;
  rootArabic: string;
  forms: HansWehrVerbForm[];
  nouns: HansWehrNoun[];
  translations: string[];
  transliterations: string[];
}

/**
 * Index of all roots organized by first letter
 */
export interface HansWehrIndex {
  [letter: string]: string[];
}
