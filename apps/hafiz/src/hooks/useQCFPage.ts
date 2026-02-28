import { useState, useEffect, useMemo } from 'react';
import { loadQCFFont, getQCFFontFamily } from '../services/qcfFontLoader';

export interface QCFWord {
  id: number;
  position: number;
  line_number: number;
  code_v1: string;
  verse_key: string;
  char_type_name: string;
  pageIndex: number;
}

export interface MushafLine {
  lineNumber: number;
  words: QCFWord[];
  lineGlyphs: string;
}

const LINES_PER_PAGE = 15;

// Module-level cache for QCF word data
const qcfPageCache = new Map<number, QCFWord[]>();

export function useQCFPage(pageNumber: number) {
  const [fontLoaded, setFontLoaded] = useState(false);
  const [fontError, setFontError] = useState<string | null>(null);
  const [qcfWords, setQcfWords] = useState<QCFWord[]>([]);
  const [wordsLoading, setWordsLoading] = useState(true);

  // Load QCF font
  useEffect(() => {
    let mounted = true;
    setFontLoaded(false);
    setFontError(null);

    loadQCFFont(pageNumber)
      .then(() => {
        if (mounted) setFontLoaded(true);
      })
      .catch(() => {
        if (mounted) {
          setFontError('Font load failed');
          setFontLoaded(true); // fall back gracefully
        }
      });

    return () => {
      mounted = false;
    };
  }, [pageNumber]);

  // Fetch word-level glyph data from Quran.com API
  useEffect(() => {
    let mounted = true;

    const cached = qcfPageCache.get(pageNumber);
    if (cached) {
      setQcfWords(cached);
      setWordsLoading(false);
      return;
    }

    setWordsLoading(true);

    fetch(
      `https://api.quran.com/api/v4/verses/by_page/${pageNumber}?words=true&word_fields=code_v1,line_number&per_page=286`,
    )
      .then((res) => {
        if (!res.ok) throw new Error(`API ${res.status}`);
        return res.json();
      })
      .then((data) => {
        const words: QCFWord[] = [];
        let pageIndex = 0;
        for (const verse of data.verses || []) {
          for (const word of verse.words || []) {
            words.push({
              id: word.id,
              position: word.position,
              line_number: word.line_number,
              code_v1: word.code_v1,
              verse_key: verse.verse_key,
              char_type_name: word.char_type_name,
              pageIndex: pageIndex++,
            });
          }
        }
        if (mounted) {
          qcfPageCache.set(pageNumber, words);
          setQcfWords(words);
        }
      })
      .catch((err) => {
        console.error('Failed to load QCF word data:', err);
      })
      .finally(() => {
        if (mounted) setWordsLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, [pageNumber]);

  // Group words into 15 lines
  const lines = useMemo((): MushafLine[] => {
    if (qcfWords.length === 0) return [];

    const lineMap = new Map<number, QCFWord[]>();
    for (const word of qcfWords) {
      const lineWords = lineMap.get(word.line_number) || [];
      lineWords.push(word);
      lineMap.set(word.line_number, lineWords);
    }

    const sorted: MushafLine[] = [];
    for (let n = 1; n <= LINES_PER_PAGE; n++) {
      const words = lineMap.get(n) || [];
      words.sort((a, b) => a.pageIndex - b.pageIndex);
      sorted.push({
        lineNumber: n,
        words,
        lineGlyphs: words.map((w) => w.code_v1).join(''),
      });
    }
    return sorted;
  }, [qcfWords]);

  const fontFamily = getQCFFontFamily(pageNumber);
  const loading = !fontLoaded || wordsLoading;

  return { lines, loading, error: fontError, fontFamily };
}
