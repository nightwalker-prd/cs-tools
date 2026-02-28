import { useState, useEffect, useMemo } from 'react';
import { surahNames } from '@/data/surah-names';
import { ayahTranslations } from '@/data/ayah-translations';
import { useSurahLoader } from '@/hooks/useSurahLoader';
import { useMorphemeLoader } from '@/hooks/useMorphemeLoader';
import { useLearningEngine } from '@/hooks/useLearningEngine';
import { useWordMastery } from '@/hooks/useWordMastery';
import { useComprehension } from '@/hooks/useComprehension';
import { MorphemeBar } from '@/components/shared/MorphemeBar';
import { GrammarBadges } from '@/components/shared/GrammarBadges';
import { useCorpusLoader } from '@/hooks/useCorpusLoader';
import type { QuranWord, MorphemeData, SurahCorpus } from '@/types';
import type { MasteryLevel } from '@/hooks/useWordMastery';

interface QuranReaderProps {
  surahNum: number;
  navigate: (path: string) => void;
}

const MASTERY_COLORS: Record<MasteryLevel, string> = {
  unknown: 'var(--color-mastery-unknown)',
  learning: 'var(--color-mastery-learning)',
  review: 'var(--color-mastery-review)',
  mastered: 'var(--color-mastery-mastered)',
};

export function QuranReader({ surahNum, navigate }: QuranReaderProps) {
  const { loadSurah, loading } = useSurahLoader();
  const { loadMorphemes } = useMorphemeLoader();
  const { loadCorpus } = useCorpusLoader();
  const { progress, recordReview } = useLearningEngine();
  const { getWordMastery } = useWordMastery(progress);
  const { surahComprehension } = useComprehension(progress);

  const [words, setWords] = useState<QuranWord[]>([]);
  const [morphemes, setMorphemes] = useState<Record<string, MorphemeData>>({});
  const [corpus, setCorpus] = useState<SurahCorpus>({});
  const [selectedWord, setSelectedWord] = useState<QuranWord | null>(null);

  const surah = surahNames.find(s => s.num === surahNum);
  const surahComp = surahComprehension.find(s => s.surahNum === surahNum);

  useEffect(() => {
    setSelectedWord(null);
    loadSurah(surahNum).then(setWords);
    loadMorphemes(surahNum).then(setMorphemes);
    loadCorpus(surahNum).then(setCorpus);
  }, [surahNum, loadSurah, loadMorphemes, loadCorpus]);

  // Group words by ayah
  const ayahs = useMemo(() => {
    const map = new Map<number, QuranWord[]>();
    for (const w of words) {
      if (!map.has(w.ayahNum)) map.set(w.ayahNum, []);
      map.get(w.ayahNum)!.push(w);
    }
    return [...map.entries()].sort(([a], [b]) => a - b);
  }, [words]);

  // Compute per-ayah comprehension for translation opacity
  const ayahComprehension = useMemo(() => {
    const map = new Map<number, number>();
    for (const [ayahNum, ayahWords] of ayahs) {
      const total = ayahWords.length;
      const known = ayahWords.filter(w => {
        const level = getWordMastery(w);
        return level !== 'unknown';
      }).length;
      map.set(ayahNum, total > 0 ? known / total : 0);
    }
    return map;
  }, [ayahs, getWordMastery]);

  const handleMarkKnown = (word: QuranWord) => {
    if (word.lemmaId) {
      recordReview(word.lemmaId, 'good');
    }
  };

  return (
    <div className="animate-fade-in" style={{ maxWidth: 800 }}>
      {/* Header */}
      <div className="reader-header">
        <div className="reader-surah-selector">
          <select
            value={surahNum}
            onChange={(e) => navigate(`#/read/${e.target.value}`)}
            className="reader-select"
          >
            {surahNames.map(s => (
              <option key={s.num} value={s.num}>
                {s.num}. {s.english} ({s.transliteration})
              </option>
            ))}
          </select>
        </div>

        {surah && (
          <div className="reader-surah-header">
            <div className="reader-surah-name font-arabic" dir="rtl">{surah.arabic}</div>
            <div className="reader-surah-english">{surah.english}</div>
            {surahComp && (
              <div className="reader-surah-comp" style={{ color: 'var(--color-accent)' }}>
                {surahComp.pct}% comprehension
              </div>
            )}
          </div>
        )}
      </div>

      {loading ? (
        <p style={{ color: 'var(--color-muted-foreground)', textAlign: 'center', padding: '3rem' }}>Loading...</p>
      ) : (
        <>
          {/* Ayah blocks */}
          {ayahs.map(([ayahNum, ayahWords]) => {
            const translation = ayahTranslations.find(t => t.surahNum === surahNum && t.ayahNum === ayahNum);
            const comp = ayahComprehension.get(ayahNum) || 0;
            const translationOpacity = Math.max(0.15, 1 - comp);

            return (
              <div key={ayahNum} className="reader-ayah">
                <div className="reader-ayah-text font-arabic" dir="rtl">
                  {ayahWords.map((w, i) => {
                    const level = getWordMastery(w);
                    const isSelected = selectedWord?.id === w.id;
                    return (
                      <span key={w.id}>
                        <span
                          className={`reader-word reader-word-${level} ${isSelected ? 'selected' : ''}`}
                          onClick={() => setSelectedWord(isSelected ? null : w)}
                        >
                          {w.word}
                        </span>
                        {i < ayahWords.length - 1 && ' '}
                      </span>
                    );
                  })}
                  <span className="reader-ayah-num">{ayahNum}</span>
                </div>
                {translation && (
                  <div
                    className="reader-translation"
                    style={{ opacity: translationOpacity }}
                  >
                    {translation.text}
                  </div>
                )}

                {/* Selected word popover */}
                {selectedWord && ayahWords.some(w => w.id === selectedWord.id) && (
                  <div className="reader-word-popover animate-fade-in-up">
                    <div className="reader-popover-header">
                      <span className="font-arabic" dir="rtl" style={{ fontSize: '1.5rem', color: MASTERY_COLORS[getWordMastery(selectedWord)] }}>
                        {selectedWord.word}
                      </span>
                      <span className={`reader-mastery-badge reader-word-${getWordMastery(selectedWord)}`}>
                        {getWordMastery(selectedWord)}
                      </span>
                    </div>
                    <div className="reader-popover-meaning">{selectedWord.meaning}</div>
                    {selectedWord.transliteration && (
                      <div style={{ fontSize: '0.82rem', color: 'var(--color-accent)', fontStyle: 'italic' }}>
                        {selectedWord.transliteration}
                      </div>
                    )}
                    {morphemes[selectedWord.id] && (
                      <div style={{ marginTop: '0.5rem' }}>
                        <MorphemeBar pieces={morphemes[selectedWord.id].p} compact />
                      </div>
                    )}
                    {corpus[selectedWord.id] && (
                      <div style={{ marginTop: '0.5rem' }}>
                        <GrammarBadges morphemes={corpus[selectedWord.id]} />
                      </div>
                    )}
                    <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.75rem', flexWrap: 'wrap' }}>
                      {selectedWord.lemmaId && getWordMastery(selectedWord) === 'unknown' && (
                        <button
                          className="btn"
                          style={{ fontSize: '0.78rem', padding: '0.3rem 0.75rem' }}
                          onClick={() => handleMarkKnown(selectedWord)}
                        >
                          Mark as Known
                        </button>
                      )}
                      {selectedWord.lemmaId && (
                        <button
                          className="btn"
                          style={{ fontSize: '0.78rem', padding: '0.3rem 0.75rem' }}
                          onClick={() => navigate(`#/lemma/${selectedWord.lemmaId}`)}
                        >
                          View Entry
                        </button>
                      )}
                      <button
                        className="btn"
                        style={{ fontSize: '0.78rem', padding: '0.3rem 0.75rem' }}
                        onClick={() => navigate(`#/ayah/${surahNum}/${ayahWords[0].ayahNum}`)}
                      >
                        Ayah View
                      </button>
                      <button
                        className="btn"
                        style={{ fontSize: '0.78rem', padding: '0.3rem 0.75rem' }}
                        onClick={() => navigate(`#/word/${surahNum}/${ayahWords[0].ayahNum}/${selectedWord.wordNum}`)}
                      >
                        Word Anatomy
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {/* Navigation */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem', paddingBottom: '2rem' }}>
            {surahNum > 1 && (
              <button className="btn" onClick={() => navigate(`#/read/${surahNum - 1}`)}>
                Previous Surah
              </button>
            )}
            <div style={{ flex: 1 }} />
            {surahNum < 114 && (
              <button className="btn" onClick={() => navigate(`#/read/${surahNum + 1}`)}>
                Next Surah
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}
