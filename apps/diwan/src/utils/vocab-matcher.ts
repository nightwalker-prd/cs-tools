import { normalizeArabic, removeDiacritics, splitArabicWords } from '@arabtools/core';
import type { VocabItem } from '../types';

export interface VocabMatch {
  word: string;
  meaning: string;
  /** Number of consecutive words this match spans (1 for single-word) */
  span: number;
  /** Whether this match came from curated vocab or dictionary fallback */
  tier: 'curated' | 'dictionary';
}

export interface VocabLookup {
  match: (verseWord: string) => VocabMatch | null;
  /** Check if a sequence of words starting at index matches a multi-word vocab item */
  matchPhrase: (words: string[], startIndex: number) => VocabMatch | null;
  /** Maximum word count among multi-word vocab items (0 if none) */
  maxPhraseLength: number;
}

const PREFIXES = ['وال', 'فال', 'بال', 'لال', 'كال', 'ال', 'و', 'ف', 'ب', 'ل', 'ك'];
// Pronoun suffixes + poetic alef extensions (كا = ك + ا for rhyme)
const SUFFIXES = ['هما', 'كما', 'هم', 'هن', 'كم', 'نا', 'ها', 'كا', 'ه', 'ك', 'ي', 'كن'];
// Poetic trailing alef added for meter/rhyme (e.g. سواكا، ذاكا)
const POETIC_ALEF_REGEX = /ا$/;

function generateVariants(word: string): string[] {
  const stripped = removeDiacritics(word);
  const normalized = normalizeArabic(word);
  const variants = [stripped, normalized];

  // Also try stripping trailing poetic alef
  if (POETIC_ALEF_REGEX.test(stripped) && stripped.length >= 4) {
    variants.push(stripped.slice(0, -1));
  }
  if (POETIC_ALEF_REGEX.test(normalized) && normalized.length >= 4) {
    variants.push(normalized.slice(0, -1));
  }

  for (const prefix of PREFIXES) {
    if (stripped.startsWith(prefix) && stripped.length - prefix.length >= 3) {
      variants.push(stripped.slice(prefix.length));
      variants.push(normalizeArabic(stripped.slice(prefix.length)));
    }
    if (normalized.startsWith(prefix) && normalized.length - prefix.length >= 3) {
      variants.push(normalized.slice(prefix.length));
    }
  }

  for (const suffix of SUFFIXES) {
    if (stripped.endsWith(suffix) && stripped.length - suffix.length >= 3) {
      variants.push(stripped.slice(0, -suffix.length));
    }
    if (normalized.endsWith(suffix) && normalized.length - suffix.length >= 3) {
      variants.push(normalized.slice(0, -suffix.length));
    }
  }

  // Combined: strip prefix then suffix
  for (const prefix of PREFIXES) {
    if (!stripped.startsWith(prefix)) continue;
    const afterPrefix = stripped.slice(prefix.length);
    if (afterPrefix.length < 3) continue;
    for (const suffix of SUFFIXES) {
      if (afterPrefix.endsWith(suffix) && afterPrefix.length - suffix.length >= 3) {
        variants.push(afterPrefix.slice(0, -suffix.length));
      }
    }
    // Also try poetic alef after prefix stripping
    if (POETIC_ALEF_REGEX.test(afterPrefix) && afterPrefix.length >= 4) {
      variants.push(afterPrefix.slice(0, -1));
    }
    const afterPrefixNorm = normalizeArabic(afterPrefix);
    for (const suffix of SUFFIXES) {
      if (afterPrefixNorm.endsWith(suffix) && afterPrefixNorm.length - suffix.length >= 3) {
        variants.push(afterPrefixNorm.slice(0, -suffix.length));
      }
    }
  }

  return variants;
}

export function buildVocabLookup(vocabItems: VocabItem[], dictionary?: Record<string, string>): VocabLookup {
  const singleWordMap = new Map<string, VocabMatch>();
  const phraseMap = new Map<string, VocabMatch>();
  let maxPhraseLength = 0;

  for (const item of vocabItems) {
    const vocabWords = splitArabicWords(item.word);
    const isPhrase = vocabWords.length > 1;

    if (isPhrase) {
      // Multi-word: index the normalized phrase
      const match: VocabMatch = { word: item.word, meaning: item.meaning, span: vocabWords.length, tier: 'curated' };
      const phraseKey = vocabWords.map(w => normalizeArabic(w)).join(' ');
      phraseMap.set(phraseKey, match);
      const phraseKeyStripped = vocabWords.map(w => removeDiacritics(w)).join(' ');
      phraseMap.set(phraseKeyStripped, match);
      maxPhraseLength = Math.max(maxPhraseLength, vocabWords.length);
    } else {
      // Single word
      const match: VocabMatch = { word: item.word, meaning: item.meaning, span: 1, tier: 'curated' };
      const stripped = removeDiacritics(item.word);
      const normalized = normalizeArabic(item.word);
      singleWordMap.set(stripped, match);
      singleWordMap.set(normalized, match);

      // Also strip prefixes from the vocab word for matching
      for (const prefix of PREFIXES) {
        if (stripped.startsWith(prefix) && stripped.length - prefix.length >= 3) {
          singleWordMap.set(stripped.slice(prefix.length), match);
        }
        if (normalized.startsWith(prefix) && normalized.length - prefix.length >= 3) {
          singleWordMap.set(normalized.slice(prefix.length), match);
        }
      }
    }
  }

  return {
    maxPhraseLength,

    match(verseWord: string): VocabMatch | null {
      const variants = generateVariants(verseWord);
      // Try curated vocab first
      for (const v of variants) {
        const found = singleWordMap.get(v);
        if (found) return found;
      }
      // Fall back to dictionary
      if (dictionary) {
        for (const v of variants) {
          const meaning = dictionary[v];
          if (meaning) {
            return { word: verseWord, meaning, span: 1, tier: 'dictionary' };
          }
        }
      }
      return null;
    },

    matchPhrase(words: string[], startIndex: number): VocabMatch | null {
      // Try longest phrases first
      for (let len = Math.min(maxPhraseLength, words.length - startIndex); len >= 2; len--) {
        const slice = words.slice(startIndex, startIndex + len);
        const keyNorm = slice.map(w => normalizeArabic(w)).join(' ');
        const found = phraseMap.get(keyNorm);
        if (found) return found;
        const keyStripped = slice.map(w => removeDiacritics(w)).join(' ');
        const found2 = phraseMap.get(keyStripped);
        if (found2) return found2;
      }
      return null;
    },
  };
}
