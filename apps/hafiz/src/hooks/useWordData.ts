import { useState, useEffect, useCallback } from 'react';
import type { QuranWord } from '../types';

// Module-level cache: surahNum → words array
const surahWordCache = new Map<number, QuranWord[]>();
// Pending fetches to avoid duplicate requests
const pendingFetches = new Map<number, Promise<QuranWord[]>>();

function fetchSurahWords(surahNum: number): Promise<QuranWord[]> {
  const existing = pendingFetches.get(surahNum);
  if (existing) return existing;

  const promise = fetch(`./data/quran-words/surah-${surahNum}.json`)
    .then((res) => {
      if (!res.ok) throw new Error(`Failed to load surah ${surahNum} words`);
      return res.json() as Promise<QuranWord[]>;
    })
    .then((words) => {
      surahWordCache.set(surahNum, words);
      pendingFetches.delete(surahNum);
      return words;
    })
    .catch((err) => {
      pendingFetches.delete(surahNum);
      throw err;
    });

  pendingFetches.set(surahNum, promise);
  return promise;
}

export function useWordData(surahNums: number[]) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const toLoad = surahNums.filter((n) => !surahWordCache.has(n));
    if (toLoad.length === 0) {
      setLoaded(true);
      return;
    }

    setLoaded(false);
    Promise.all(toLoad.map(fetchSurahWords))
      .then(() => {
        if (!cancelled) setLoaded(true);
      })
      .catch(() => {
        // Still mark as loaded so UI doesn't hang
        if (!cancelled) setLoaded(true);
      });

    return () => {
      cancelled = true;
    };
  }, [surahNums.join(',')]); // eslint-disable-line react-hooks/exhaustive-deps

  const getWord = useCallback(
    (surah: number, ayah: number, wordNum: number): QuranWord | null => {
      const words = surahWordCache.get(surah);
      if (!words) return null;
      return (
        words.find((w) => w.ayahNum === ayah && w.wordNum === wordNum) ?? null
      );
    },
    [],
  );

  const getAyahWords = useCallback(
    (surah: number, ayah: number): QuranWord[] => {
      const words = surahWordCache.get(surah);
      if (!words) return [];
      return words.filter((w) => w.ayahNum === ayah);
    },
    [],
  );

  const getSurahWords = useCallback(
    (surah: number): QuranWord[] => {
      return surahWordCache.get(surah) ?? [];
    },
    [],
  );

  return { loaded, getWord, getAyahWords, getSurahWords };
}

/** Preload word data for given surah numbers (fire-and-forget) */
export function preloadWordData(surahNums: number[]): void {
  for (const num of surahNums) {
    if (!surahWordCache.has(num) && !pendingFetches.has(num)) {
      fetchSurahWords(num).catch(() => {});
    }
  }
}
