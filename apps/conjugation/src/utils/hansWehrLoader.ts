/**
 * Hans Wehr Dictionary Data Loader for Conjugation Tool
 *
 * Lazy loads letter-specific JSON files from public/data/hans-wehr/
 */

export interface HansWehrWord {
  id: string;
  text: string;
  form: string;
  transliteration: string;
  plural?: {
    text: string;
    transliteration: string;
  };
  root: {
    id: string;
    text: string;
    word_count: number;
    form_count: number;
  };
  translation: {
    id: string;
    text: string;
    short: string;
    google: string;
    amazon: string;
  };
  has_word_match: boolean;
}

export interface HansWehrEntry {
  _id: { $oid: string };
  root: string;
  word_ID: string;
  response: {
    words: HansWehrWord[];
  };
  forms: HansWehrWord[];
  nouns?: HansWehrWord[];
}

interface HansWehrLetterData {
  version: string;
  generatedAt: string;
  letter: string;
  data: HansWehrEntry[];
}

export interface HansWehrTableRow {
  arabic: string;
  transliteration: string;
  form: string;
  root: string;
  translation: string;
}

const DATA_BASE_URL = '/data/hans-wehr';
const letterCache = new Map<string, HansWehrEntry[]>();

export async function loadHansWehrLetter(letter: string): Promise<HansWehrEntry[]> {
  const cached = letterCache.get(letter);
  if (cached) return cached;

  const response = await fetch(`${DATA_BASE_URL}/${encodeURIComponent(letter)}.json`);
  if (!response.ok) {
    throw new Error(`Failed to load data for letter: ${letter}`);
  }

  const data: HansWehrLetterData = await response.json();
  const entries = data.data || [];
  letterCache.set(letter, entries);
  return entries;
}

/**
 * Look up a root in the Hans Wehr dictionary.
 * ArabicWord roots use spaced format ("ك ت ب"), Hans Wehr uses compact ("كتب").
 */
export async function lookupRoot(root: string): Promise<HansWehrEntry[]> {
  const compactRoot = root.replace(/\s/g, '');
  if (!compactRoot) return [];

  const firstLetter = compactRoot[0];
  const entries = await loadHansWehrLetter(firstLetter);
  return entries.filter(entry => entry.root === compactRoot);
}

export function getTableRows(entries: HansWehrEntry[]): HansWehrTableRow[] {
  return entries.flatMap(entry => {
    const allWords = [...entry.forms, ...(entry.nouns || [])];
    return allWords.map(word => ({
      arabic: word.text,
      transliteration: word.transliteration,
      form: word.form || '-',
      root: word.root.text,
      translation: word.translation.short || word.translation.text,
    }));
  });
}
