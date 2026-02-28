import { useState, useEffect, useCallback } from 'react';
import { Loader2, RotateCcw } from 'lucide-react';
import { shuffle, pickRandom } from '@arabtools/core';
import { expandRubToAyahs } from '@arabtools/data';
import type { HafizRub, SurahData } from '../../types';
import { useGameEngine } from '../../hooks/useGameEngine';
import { useQuranText } from '../../hooks/useQuranText';
import { useAyahMastery } from '../../hooks/useAyahMastery';
import { GameShell } from './GameShell';

interface WordOrderProps {
  rubs: HafizRub[];
  onBack: () => void;
}

interface Question {
  surah: number;
  ayah: number;
  originalWords: string[];
  shuffledWords: string[];
}

const TOTAL_QUESTIONS = 10;

export function WordOrder({ rubs, onBack }: WordOrderProps) {
  const engine = useGameEngine();
  const { loadSurah, loading: textLoading } = useQuranText();
  const mastery = useAyahMastery();

  const [question, setQuestion] = useState<Question | null>(null);
  const [selected, setSelected] = useState<number[]>([]);
  const [surahCache, setSurahCache] = useState<Map<number, SurahData>>(new Map());
  const [dataReady, setDataReady] = useState(false);
  const [noData, setNoData] = useState(false);

  // Load surah data on mount
  useEffect(() => {
    let cancelled = false;

    async function loadData() {
      const surahNums = new Set<number>();
      for (const rub of rubs) {
        const ayahs = expandRubToAyahs(rub.id);
        for (const a of ayahs) surahNums.add(a.surah);
      }

      const cache = new Map<number, SurahData>();
      for (const num of surahNums) {
        const data = await loadSurah(num);
        if (cancelled) return;
        if (data) cache.set(num, data);
      }

      if (cancelled) return;
      if (cache.size === 0) { setNoData(true); return; }
      setSurahCache(cache);
      setDataReady(true);
    }

    loadData();
    return () => { cancelled = true; };
  }, [rubs, loadSurah]);

  const generateQuestion = useCallback((): Question | null => {
    const availableAyahs: Array<{ surah: number; ayah: number; text: string }> = [];
    for (const rub of rubs) {
      const ayahs = expandRubToAyahs(rub.id);
      for (const a of ayahs) {
        const surahData = surahCache.get(a.surah);
        if (surahData) {
          const ayahData = surahData.ayahs.find((x) => x.num === a.ayah);
          if (ayahData && ayahData.text.trim()) {
            const words = ayahData.text.split(/\s+/).filter(Boolean);
            // Only use ayahs with 3+ words for meaningful shuffling
            if (words.length >= 3) {
              availableAyahs.push({ ...a, text: ayahData.text });
            }
          }
        }
      }
    }

    if (availableAyahs.length === 0) return null;

    const picked = pickRandom(availableAyahs);
    if (!picked) return null;

    const originalWords = picked.text.split(/\s+/).filter(Boolean);
    const shuffledWords = shuffle(originalWords);

    return {
      surah: picked.surah,
      ayah: picked.ayah,
      originalWords,
      shuffledWords,
    };
  }, [rubs, surahCache]);

  // Start game when data is ready
  useEffect(() => {
    if (dataReady && engine.gameState === 'idle') {
      const q = generateQuestion();
      if (q) {
        setQuestion(q);
        setSelected([]);
        engine.startGame(TOTAL_QUESTIONS);
      } else {
        setNoData(true);
      }
    }
  }, [dataReady, engine.gameState, generateQuestion, engine]);

  const handleWordTap = (shuffledIndex: number) => {
    if (engine.gameState !== 'playing') return;
    if (selected.includes(shuffledIndex)) return;

    const newSelected = [...selected, shuffledIndex];
    setSelected(newSelected);

    // Auto-submit when all words are placed
    if (question && newSelected.length === question.shuffledWords.length) {
      const reconstructed = newSelected.map((i) => question.shuffledWords[i]);
      const correct = reconstructed.every((w, idx) => w === question.originalWords[idx]);
      mastery.recordAttempt(question.surah, question.ayah, correct);
      engine.submitAnswer(correct);
    }
  };

  const handleReset = () => {
    setSelected([]);
  };

  const handleRemoveLast = () => {
    setSelected((prev) => prev.slice(0, -1));
  };

  const handleNext = () => {
    const q = generateQuestion();
    setQuestion(q);
    setSelected([]);
    engine.nextQuestion();
  };

  if (noData) {
    return (
      <div className="game-empty fade-in-up">
        <div className="game-empty-content">
          <h3>Quran text not available</h3>
          <p>Quran text data not yet loaded. Play audio games or load text first.</p>
          <button className="btn btn-primary" onClick={onBack}>Back to Games</button>
        </div>
      </div>
    );
  }

  if (textLoading || !dataReady) {
    return (
      <div className="game-loading fade-in-up">
        <Loader2 size={32} className="spin" />
        <p>Loading ayah text...</p>
      </div>
    );
  }

  return (
    <GameShell
      title="Word Order"
      score={engine.score}
      total={engine.totalQuestions}
      timeElapsed={engine.timeElapsed}
      gameState={engine.gameState}
      onBack={onBack}
    >
      {question && engine.gameState !== 'complete' && (
        <div className="word-order-game">
          <p className="game-ayah-ref">
            Surah {question.surah}, Ayah {question.ayah}
          </p>

          {/* Reconstruction zone */}
          <div className="word-order-built" dir="rtl">
            {selected.length === 0 ? (
              <span className="word-order-placeholder">Tap words in correct order</span>
            ) : (
              selected.map((sIdx, pos) => {
                const word = question.shuffledWords[sIdx];
                const isCorrect =
                  engine.gameState === 'feedback'
                    ? word === question.originalWords[pos]
                    : undefined;
                return (
                  <span
                    key={`${sIdx}-${pos}`}
                    className={`word-order-placed ${
                      isCorrect === true ? 'correct' : isCorrect === false ? 'incorrect' : ''
                    }`}
                  >
                    {word}
                  </span>
                );
              })
            )}
          </div>

          {/* Word bank */}
          {engine.gameState === 'playing' && (
            <>
              <div className="word-order-bank" dir="rtl">
                {question.shuffledWords.map((word, i) => (
                  <button
                    key={i}
                    className={`word-order-chip ${selected.includes(i) ? 'used' : ''}`}
                    disabled={selected.includes(i)}
                    onClick={() => handleWordTap(i)}
                  >
                    {word}
                  </button>
                ))}
              </div>

              <div className="game-actions">
                {selected.length > 0 && (
                  <button className="btn btn-ghost" onClick={handleRemoveLast}>
                    Undo
                  </button>
                )}
                {selected.length > 0 && (
                  <button className="btn btn-ghost" onClick={handleReset}>
                    <RotateCcw size={16} />
                    Reset
                  </button>
                )}
              </div>
            </>
          )}

          {/* Feedback: show correct order */}
          {engine.gameState === 'feedback' && (
            <div className="game-feedback">
              <p className="game-feedback-label">Correct order:</p>
              <p className="game-feedback-text" dir="rtl">
                {question.originalWords.join(' ')}
              </p>
              <button className="btn btn-primary" onClick={handleNext}>
                Next Question
              </button>
            </div>
          )}
        </div>
      )}
    </GameShell>
  );
}
