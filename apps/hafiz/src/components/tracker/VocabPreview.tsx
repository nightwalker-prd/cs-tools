import { useState, useEffect, useMemo } from 'react';
import { BookOpen, ChevronDown, ChevronUp, Loader2 } from 'lucide-react';
import { expandRubToAyahs } from '@arabtools/data';
import { useWordData } from '../../hooks/useWordData';
import type { QuranWord, Lemma } from '../../types';

interface VocabPreviewProps {
  rubId: number;
}

// Module-level cache for lemma data
let lemmaCache: Map<number, Lemma> | null = null;
let lemmaLoadPending: Promise<Map<number, Lemma>> | null = null;

function loadLemmas(): Promise<Map<number, Lemma>> {
  if (lemmaCache) return Promise.resolve(lemmaCache);
  if (lemmaLoadPending) return lemmaLoadPending;

  lemmaLoadPending = fetch(`./data/lemmas.json`)
    .then((res) => res.json() as Promise<Lemma[]>)
    .then((data) => {
      const map = new Map<number, Lemma>();
      for (const l of data) {
        map.set(l.lemmaId, l);
      }
      lemmaCache = map;
      lemmaLoadPending = null;
      return map;
    })
    .catch((err) => {
      lemmaLoadPending = null;
      throw err;
    });

  return lemmaLoadPending;
}

export function VocabPreview({ rubId }: VocabPreviewProps) {
  const ayahRefs = useMemo(() => expandRubToAyahs(rubId), [rubId]);
  const surahNums = useMemo(
    () => [...new Set(ayahRefs.map((a) => a.surah))],
    [ayahRefs],
  );

  const { loaded: wordsLoaded, getSurahWords } = useWordData(surahNums);
  const [lemmas, setLemmas] = useState<Map<number, Lemma> | null>(lemmaCache);
  const [collapsed, setCollapsed] = useState(true);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (lemmaCache) {
      setLemmas(lemmaCache);
      return;
    }
    loadLemmas()
      .then(setLemmas)
      .catch(() => {});
  }, []);

  // Collect unique lemmas from words in this rub
  const vocabItems = useMemo(() => {
    if (!wordsLoaded || !lemmas) return [];

    const rubKeys = new Set(ayahRefs.map((a) => `${a.surah}:${a.ayah}`));
    const seenLemmas = new Set<number>();
    const items: Array<{ word: QuranWord; lemma: Lemma }> = [];

    for (const num of surahNums) {
      const words = getSurahWords(num);
      for (const w of words) {
        if (!rubKeys.has(`${num}:${w.ayahNum}`)) continue;
        if (w.lemmaId === null) continue;
        if (seenLemmas.has(w.lemmaId)) continue;
        seenLemmas.add(w.lemmaId);

        const lemma = lemmas.get(w.lemmaId);
        if (lemma) {
          items.push({ word: w, lemma });
        }
      }
    }

    return items;
  }, [wordsLoaded, lemmas, ayahRefs, surahNums, getSurahWords]);

  const displayItems = expanded ? vocabItems : vocabItems.slice(0, 10);

  return (
    <div className={collapsed ? 'vocab-preview collapsed' : 'vocab-preview'}>
      <button
        className="vocab-preview-header"
        onClick={() => {
          setCollapsed(!collapsed);
          if (!collapsed) setExpanded(false);
        }}
      >
        <BookOpen size={18} />
        <h4>Key Vocabulary{vocabItems.length > 0 ? ` (${vocabItems.length} words)` : ''}</h4>
        {collapsed ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
      </button>
      {!collapsed && (
        <>
          {(!wordsLoaded || !lemmas) ? (
            <div className="vocab-preview-loading">
              <Loader2 size={18} className="spin" />
              <span>Loading vocabulary...</span>
            </div>
          ) : vocabItems.length === 0 ? (
            <p className="vocab-preview-empty">No vocabulary data</p>
          ) : (
            <>
              <div className="vocab-preview-list">
                {displayItems.map(({ word, lemma }) => (
                  <div key={lemma.lemmaId} className="vocab-item">
                    <span className="vocab-item-arabic">{lemma.lemma}</span>
                    <span className="vocab-item-translit">{lemma.transliteration}</span>
                    <span className="vocab-item-meaning">{lemma.meaning}</span>
                    {word.root && (
                      <span className="vocab-item-root">{word.root}</span>
                    )}
                  </div>
                ))}
              </div>
              {vocabItems.length > 10 && (
                <button
                  className="btn btn-ghost btn-sm"
                  onClick={() => setExpanded(!expanded)}
                >
                  {expanded ? 'Show less' : `Show all ${vocabItems.length} words`}
                </button>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}
