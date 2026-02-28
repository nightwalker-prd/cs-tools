import { useState, useEffect, useMemo } from 'react';
import { surahNames } from '@/data/surah-names';
import { ayahTranslations } from '@/data/ayah-translations';
import { rootFrequencyMap } from '@/data/root-frequency';
import { phraseLabels } from '@/data/phrase-labels';
import { useSurahLoader } from '@/hooks/useSurahLoader';
import { usePhraseLoader } from '@/hooks/usePhraseLoader';
import { useMorphemeLoader } from '@/hooks/useMorphemeLoader';
import { useCorpusLoader } from '@/hooks/useCorpusLoader';
import { useLearningEngine } from '@/hooks/useLearningEngine';
import { FrequencyBadge } from '@/components/shared/FrequencyBadge';
import { MorphemeBar } from '@/components/shared/MorphemeBar';
import { GrammarBadges } from '@/components/shared/GrammarBadges';
import type { QuranWord, PhraseGroup, MorphemeData, SurahCorpus } from '@/types';

interface AyahViewProps {
  surahNum: number;
  ayahNum: number;
  navigate: (path: string) => void;
}

const PHRASE_COLORS = [
  'rgba(197, 162, 83, 0.15)',
  'rgba(26, 49, 80, 0.08)',
];

export function AyahView({ surahNum, ayahNum, navigate }: AyahViewProps) {
  const { loadSurah, loading } = useSurahLoader();
  const { getAyahPhrases } = usePhraseLoader();
  const { loadMorphemes } = useMorphemeLoader();
  const { loadCorpus } = useCorpusLoader();
  const { recordReview, setSessionConfig } = useLearningEngine();
  const [allWords, setAllWords] = useState<QuranWord[]>([]);
  const [morphemes, setMorphemes] = useState<Record<string, MorphemeData>>({});
  const [corpus, setCorpus] = useState<SurahCorpus>({});
  const [selectedWordIdx, setSelectedWordIdx] = useState<number | null>(null);
  const [phrases, setPhrases] = useState<PhraseGroup[]>([]);
  const [phraseMode, setPhraseMode] = useState(() => {
    try { return localStorage.getItem('alqalam-phrase-mode') === 'true'; } catch { return false; }
  });
  const [selectedPhraseIdx, setSelectedPhraseIdx] = useState<number | null>(null);

  const surah = surahNames.find(s => s.num === surahNum);
  const translation = ayahTranslations.find(a => a.surahNum === surahNum && a.ayahNum === ayahNum);

  useEffect(() => {
    loadSurah(surahNum).then(setAllWords);
    loadMorphemes(surahNum).then(setMorphemes);
    loadCorpus(surahNum).then(setCorpus);
  }, [surahNum, loadSurah, loadMorphemes, loadCorpus]);

  useEffect(() => {
    getAyahPhrases(surahNum, ayahNum).then(setPhrases);
  }, [surahNum, ayahNum, getAyahPhrases]);

  useEffect(() => {
    setSelectedWordIdx(null);
    setSelectedPhraseIdx(null);
  }, [ayahNum]);

  const ayahWords = useMemo(() => {
    return allWords.filter(w => w.ayahNum === ayahNum).sort((a, b) => a.wordNum - b.wordNum);
  }, [allWords, ayahNum]);

  // Build a lookup: wordNum → { phraseIndex, colorIndex }
  const wordPhraseMap = useMemo(() => {
    const map = new Map<number, { phraseIdx: number; colorIdx: number }>();
    phrases.forEach((p, pi) => {
      const colorIdx = pi % PHRASE_COLORS.length;
      for (const wn of p.wordIndices) {
        map.set(wn, { phraseIdx: pi, colorIdx });
      }
    });
    return map;
  }, [phrases]);

  const togglePhraseMode = () => {
    const next = !phraseMode;
    setPhraseMode(next);
    try { localStorage.setItem('alqalam-phrase-mode', String(next)); } catch { /* noop */ }
    setSelectedPhraseIdx(null);
  };

  const hasPhrases = phrases.length > 0;

  const handleAddToReviewQueue = (lemmaId: number | null) => {
    if (lemmaId) {
      recordReview(lemmaId, 'hard');
    }
  };

  const startAyahStudy = () => {
    setSessionConfig({
      source: 'surah',
      surahNum,
      size: 10,
      quizTypes: ['flashcard', 'multiple-choice', 'context'],
    });
    navigate('#/session');
  };

  return (
    <div className="animate-fade-in page-max-800">
      <div className="topic-header">
        <div className="breadcrumb">
          <button className="breadcrumb-link" onClick={() => navigate('#/')}>Home</button>
          <span className="breadcrumb-sep">/</span>
          <button className="breadcrumb-link" onClick={() => navigate('#/surahs')}>Surahs</button>
          <span className="breadcrumb-sep">/</span>
          <button className="breadcrumb-link" onClick={() => navigate(`#/surah/${surahNum}`)}>
            {surah?.english}
          </button>
          <span className="breadcrumb-sep">/</span>
          <span className="breadcrumb-current">Ayah {ayahNum}</span>
        </div>
      </div>

      {loading ? (
        <p className="muted-text">Loading...</p>
      ) : (
        <>
          {/* Ayah Card */}
          <div className="ayah-card ayah-card-spaced">
            <div className="ayah-arabic-text" dir="rtl">
              {ayahWords.map((w, i) => {
                const phraseInfo = phraseMode ? wordPhraseMap.get(w.wordNum) : undefined;
                const bg = phraseInfo ? PHRASE_COLORS[phraseInfo.colorIdx] : undefined;
                return (
                  <span key={w.id}>
                    <span
                      className={`ayah-word ${selectedWordIdx === i ? 'highlighted' : ''} ${phraseInfo ? 'phrase-grouped' : ''}`}
                      style={bg ? { background: bg } : undefined}
                      onClick={() => {
                        if (phraseMode && phraseInfo) {
                          setSelectedPhraseIdx(
                            selectedPhraseIdx === phraseInfo.phraseIdx ? null : phraseInfo.phraseIdx
                          );
                          setSelectedWordIdx(null);
                        } else {
                          setSelectedWordIdx(selectedWordIdx === i ? null : i);
                          setSelectedPhraseIdx(null);
                        }
                      }}
                    >
                      {w.word}
                    </span>
                    {i < ayahWords.length - 1 && ' '}
                  </span>
                );
              })}
            </div>
            <div className="ayah-reference">
              {surah?.transliteration} {surahNum}:{ayahNum}
            </div>
            {translation && (
              <div className="ayah-translation">{translation.text}</div>
            )}
          </div>

          {/* Selected word popover info */}
          {selectedWordIdx != null && ayahWords[selectedWordIdx] && (
            <div className="etymology-box animate-fade-in-up ayah-selected-box">
              <div className="ayah-selected-header">
                <div>
                  <div className="font-arabic ayah-selected-word" dir="rtl">
                    {ayahWords[selectedWordIdx].word}
                  </div>
                  <div className="ayah-selected-meaning">
                    {ayahWords[selectedWordIdx].meaning}
                  </div>
                  <div className="ayah-selected-translit">
                    {ayahWords[selectedWordIdx].transliteration}
                  </div>
                </div>
                <div className="ayah-selected-meta">
                  {ayahWords[selectedWordIdx].root && (
                    <button
                      className="btn ayah-mini-btn"
                      onClick={() => navigate(`#/root/${encodeURIComponent(ayahWords[selectedWordIdx].root)}`)}
                    >
                      Root: <span className="font-arabic">{ayahWords[selectedWordIdx].root}</span>
                    </button>
                  )}
                  {rootFrequencyMap[ayahWords[selectedWordIdx].root] && (
                    <FrequencyBadge tier={rootFrequencyMap[ayahWords[selectedWordIdx].root].tier} />
                  )}
                </div>
              </div>
              {corpus[ayahWords[selectedWordIdx].id] && (
                <div style={{ marginTop: '0.5rem' }}>
                  <GrammarBadges morphemes={corpus[ayahWords[selectedWordIdx].id]} />
                </div>
              )}
              <div className="ayah-selected-actions">
                {ayahWords[selectedWordIdx].lemmaId && (
                  <button
                    className="btn ayah-action-btn"
                    onClick={() => navigate(`#/lemma/${ayahWords[selectedWordIdx].lemmaId}`)}
                  >
                    View Full Entry
                  </button>
                )}
                <button
                  className="btn ayah-action-btn"
                  onClick={() => navigate(`#/word/${surahNum}/${ayahNum}/${ayahWords[selectedWordIdx].wordNum}`)}
                >
                  Word Anatomy
                </button>
                <button
                  className="btn ayah-action-btn"
                  onClick={() => handleAddToReviewQueue(ayahWords[selectedWordIdx].lemmaId)}
                >
                  Add to Review Queue
                </button>
              </div>
            </div>
          )}

          {/* Selected phrase popover */}
          {selectedPhraseIdx != null && phrases[selectedPhraseIdx] && (
            <div className="phrase-popover animate-fade-in-up phrase-popover-spaced">
              {phrases[selectedPhraseIdx].label && phraseLabels[phrases[selectedPhraseIdx].label!] && (
                <div className="phrase-label">
                  <span className="phrase-label-en">
                    {phraseLabels[phrases[selectedPhraseIdx].label!].en}
                  </span>
                  <span className="phrase-label-ar font-arabic" dir="rtl">
                    {phraseLabels[phrases[selectedPhraseIdx].label!].ar}
                  </span>
                </div>
              )}
              <div className="phrase-popover-words font-arabic" dir="rtl">
                {phrases[selectedPhraseIdx].wordIndices
                  .map(wn => ayahWords.find(w => w.wordNum === wn))
                  .filter(Boolean)
                  .map(w => w!.word)
                  .join(' ')}
              </div>
              <div className="phrase-popover-meaning">
                {phrases[selectedPhraseIdx].wordIndices
                  .map(wn => ayahWords.find(w => w.wordNum === wn))
                  .filter(Boolean)
                  .map(w => w!.meaning)
                  .join(' ')}
              </div>
              {phrases[selectedPhraseIdx].label && phraseLabels[phrases[selectedPhraseIdx].label!] && (
                <div className="phrase-description">
                  {phraseLabels[phrases[selectedPhraseIdx].label!].description}
                </div>
              )}
            </div>
          )}

          {/* Gold separator */}
          <div className="gold-separator">
            <div className="gold-separator-diamond" />
          </div>

          {/* Phrase mode toggle + breakdown header */}
          <div className="ayah-breakdown-header">
            <h2 className="ayah-breakdown-title">
              {phraseMode ? 'Phrase-by-Phrase' : 'Word-by-Word'} Breakdown
            </h2>
            <button
              className="btn ayah-study-btn"
              onClick={startAyahStudy}
            >
              Study This Ayah
            </button>
            {hasPhrases && (
              <div className="phrase-toggle">
                <button
                  className={`phrase-toggle-btn ${!phraseMode ? 'active' : ''}`}
                  onClick={() => { if (phraseMode) togglePhraseMode(); }}
                >
                  Word
                </button>
                <button
                  className={`phrase-toggle-btn ${phraseMode ? 'active' : ''}`}
                  onClick={() => { if (!phraseMode) togglePhraseMode(); }}
                >
                  Phrase
                </button>
              </div>
            )}
          </div>

          {/* Word-by-word mode */}
          {!phraseMode && (
            <div className="word-breakdown">
              {ayahWords.map(w => {
                const morph = morphemes[w.id];
                return (
                  <div
                    key={w.id}
                    className="word-breakdown-item"
                    onClick={() => {
                      if (w.lemmaId) navigate(`#/lemma/${w.lemmaId}`);
                    }}
                    data-clickable={w.lemmaId ? 'true' : 'false'}
                  >
                    <span className="word-breakdown-arabic">{w.word}</span>
                    {morph && <MorphemeBar pieces={morph.p} />}
                    {corpus[w.id] && (
                      <div style={{ marginTop: '0.15rem' }}>
                        <GrammarBadges morphemes={corpus[w.id]} compact />
                      </div>
                    )}
                    <span className="word-breakdown-english">{w.meaning}</span>
                    {w.transliteration && (
                      <span className="word-breakdown-translit">{w.transliteration}</span>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Phrase-by-phrase mode */}
          {phraseMode && (
            <div className="phrase-breakdown">
              {phrases.map((phrase, pi) => {
                const words = phrase.wordIndices
                  .map(wn => ayahWords.find(w => w.wordNum === wn))
                  .filter(Boolean) as QuranWord[];
                const labelInfo = phrase.label ? phraseLabels[phrase.label] : null;

                return (
                  <div key={pi} className="phrase-breakdown-card">
                    {labelInfo && (
                      <div className="phrase-breakdown-label">
                        {labelInfo.en}
                        <span className="font-arabic phrase-breakdown-label-ar" dir="rtl">
                          {labelInfo.ar}
                        </span>
                      </div>
                    )}
                    <div className="phrase-breakdown-arabic font-arabic" dir="rtl">
                      {words.map(w => w.word).join(' ')}
                    </div>
                    <div className="phrase-breakdown-meaning">
                      {words.map(w => w.meaning).join(' ')}
                    </div>
                  </div>
                );
              })}
              {/* Words not in any phrase */}
              {ayahWords
                .filter(w => !wordPhraseMap.has(w.wordNum))
                .map(w => (
                  <div key={w.id} className="phrase-breakdown-card single">
                    <div className="phrase-breakdown-arabic font-arabic" dir="rtl">
                      {w.word}
                    </div>
                    <div className="phrase-breakdown-meaning">{w.meaning}</div>
                  </div>
                ))}
            </div>
          )}

          {/* Navigation to prev/next ayah */}
          <div className="ayah-nav-row">
            {ayahNum > 1 && (
              <button
                className="btn"
                onClick={() => navigate(`#/ayah/${surahNum}/${ayahNum - 1}`)}
              >
                Previous Ayah
              </button>
            )}
            <div className="ayah-nav-spacer" />
            <button
              className="btn"
              onClick={() => navigate(`#/ayah/${surahNum}/${ayahNum + 1}`)}
            >
              Next Ayah
            </button>
          </div>
        </>
      )}
    </div>
  );
}
