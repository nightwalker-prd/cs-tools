import { useState, useMemo, useCallback } from 'react';
import { removeDiacritics } from '@arabtools/core';
import { lemmas } from '@/data/lemmas';
import { rootFrequencyMap } from '@/data/root-frequency';
import { rootToLemma } from '@/data/root-to-lemma';

export interface SearchResult {
  lemmaId: number;
  lemma: string;
  meaning: string;
  transliteration: string;
  score: number;
}

export function useSearch() {
  const [query, setQuery] = useState('');

  // Build a lemmaId → frequency map for sorting
  const lemmaFreqMap = useMemo(() => {
    const map: Record<number, number> = {};
    for (const [root, ids] of Object.entries(rootToLemma)) {
      const freq = rootFrequencyMap[root]?.count ?? 0;
      for (const id of ids) {
        map[id] = Math.max(map[id] ?? 0, freq);
      }
    }
    return map;
  }, []);

  const results = useMemo((): SearchResult[] => {
    const q = query.trim();
    if (q.length < 2) return [];

    const qLower = q.toLowerCase();
    const qNoD = removeDiacritics(q);

    const matches: SearchResult[] = [];

    for (const l of lemmas) {
      let score = 0;

      // Arabic match (with diacritics removed)
      const lemmaNoD = removeDiacritics(l.lemma);
      if (lemmaNoD === qNoD) {
        score = 100;
      } else if (lemmaNoD.includes(qNoD)) {
        score = 60;
      }

      // English meaning match
      const meaningLower = l.meaning.toLowerCase();
      if (score === 0) {
        if (meaningLower === qLower) {
          score = 90;
        } else if (meaningLower.startsWith(qLower)) {
          score = 70;
        } else if (meaningLower.includes(qLower)) {
          score = 50;
        }
      }

      // Transliteration match
      if (score === 0) {
        const translitLower = l.transliteration.toLowerCase();
        if (translitLower.startsWith(qLower)) {
          score = 65;
        } else if (translitLower.includes(qLower)) {
          score = 40;
        }
      }

      if (score > 0) {
        // Boost by frequency
        const freqBoost = Math.min((lemmaFreqMap[l.id] ?? 0) / 100, 10);
        matches.push({
          lemmaId: l.id,
          lemma: l.lemma,
          meaning: l.meaning,
          transliteration: l.transliteration,
          score: score + freqBoost,
        });
      }
    }

    matches.sort((a, b) => b.score - a.score);
    return matches.slice(0, 20);
  }, [query, lemmaFreqMap]);

  const search = useCallback((q: string) => setQuery(q), []);

  return { query, search, results };
}
