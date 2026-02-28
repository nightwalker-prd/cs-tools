import { useState, useEffect, useCallback } from 'react';
import { Loader2 } from 'lucide-react';
import { pickRandom } from '@arabtools/core';
import { expandRubToAyahs } from '@arabtools/data';
import type { HafizRub, SurahData } from '../../types';
import { useGameEngine } from '../../hooks/useGameEngine';
import { useQuranText } from '../../hooks/useQuranText';
import { useAyahMastery } from '../../hooks/useAyahMastery';
import { GameShell } from './GameShell';

interface CompleteAyahProps {
  rubs: HafizRub[];
  onBack: () => void;
}

interface Question {
  surah: number;
  ayah: number;
  fullText: string;
  words: string[];
  blankedIndices: number[];
}

const TOTAL_QUESTIONS = 10;

function createBlanks(words: string[]): number[] {
  if (words.length <= 2) return [0];
  // Blank out ~30% of words, minimum 1
  const count = Math.max(1, Math.floor(words.length * 0.3));
  const indices: number[] = [];
  const available = words.map((_, i) => i);

  for (let i = 0; i < count && available.length > 0; i++) {
    const pick = Math.floor(Math.random() * available.length);
    indices.push(available[pick]);
    available.splice(pick, 1);
  }

  return indices.sort((a, b) => a - b);
}

export function CompleteAyah({ rubs, onBack }: CompleteAyahProps) {
  const engine = useGameEngine();
  const { loadSurah, loading: textLoading } = useQuranText();
  const mastery = useAyahMastery();

  const [question, setQuestion] = useState<Question | null>(null);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [surahCache, setSurahCache] = useState<Map<number, SurahData>>(new Map());
  const [dataReady, setDataReady] = useState(false);
  const [noData, setNoData] = useState(false);

  // Load surah data on mount
  useEffect(() => {
    let cancelled = false;

    async function loadData() {
      // Get unique surah numbers from all memorized rubs
      const surahNums = new Set<number>();
      for (const rub of rubs) {
        const ayahs = expandRubToAyahs(rub.id);
        for (const a of ayahs) {
          surahNums.add(a.surah);
        }
      }

      const cache = new Map<number, SurahData>();
      for (const num of surahNums) {
        const data = await loadSurah(num);
        if (cancelled) return;
        if (data) cache.set(num, data);
      }

      if (cancelled) return;

      if (cache.size === 0) {
        setNoData(true);
        return;
      }

      setSurahCache(cache);
      setDataReady(true);
    }

    loadData();
    return () => { cancelled = true; };
  }, [rubs, loadSurah]);

  // Generate a question from cached data
  const generateQuestion = useCallback((): Question | null => {
    const availableAyahs: Array<{ surah: number; ayah: number }> = [];
    for (const rub of rubs) {
      const ayahs = expandRubToAyahs(rub.id);
      for (const a of ayahs) {
        const surahData = surahCache.get(a.surah);
        if (surahData) {
          const ayahData = surahData.ayahs.find((x) => x.num === a.ayah);
          if (ayahData && ayahData.text.trim()) {
            availableAyahs.push(a);
          }
        }
      }
    }

    if (availableAyahs.length === 0) return null;

    const picked = pickRandom(availableAyahs);
    if (!picked) return null;

    const surahData = surahCache.get(picked.surah);
    const ayahData = surahData?.ayahs.find((x) => x.num === picked.ayah);
    if (!ayahData) return null;

    const words = ayahData.text.split(/\s+/).filter(Boolean);
    if (words.length === 0) return null;

    const blankedIndices = createBlanks(words);

    return {
      surah: picked.surah,
      ayah: picked.ayah,
      fullText: ayahData.text,
      words,
      blankedIndices,
    };
  }, [rubs, surahCache]);

  // Start game when data is ready
  useEffect(() => {
    if (dataReady && engine.gameState === 'idle') {
      const q = generateQuestion();
      if (q) {
        setQuestion(q);
        setAnswers({});
        engine.startGame(TOTAL_QUESTIONS);
      } else {
        setNoData(true);
      }
    }
  }, [dataReady, engine.gameState, generateQuestion, engine]);

  const handleInputChange = (index: number, value: string) => {
    setAnswers((prev) => ({ ...prev, [index]: value }));
  };

  const handleSubmit = () => {
    if (!question) return;

    let allCorrect = true;
    for (const idx of question.blankedIndices) {
      const answer = (answers[idx] ?? '').trim();
      if (answer !== question.words[idx]) {
        allCorrect = false;
      }
    }

    mastery.recordAttempt(question.surah, question.ayah, allCorrect);
    engine.submitAnswer(allCorrect);
  };

  const handleNext = () => {
    const q = generateQuestion();
    setQuestion(q);
    setAnswers({});
    engine.nextQuestion();
  };

  if (noData) {
    return (
      <div className="game-empty fade-in-up">
        <div className="game-empty-content">
          <h3>Quran text not available</h3>
          <p>Quran text data not yet loaded. Play audio games or load text first.</p>
          <button className="btn btn-primary" onClick={onBack}>
            Back to Games
          </button>
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
      title="Complete the Ayah"
      score={engine.score}
      total={engine.totalQuestions}
      timeElapsed={engine.timeElapsed}
      gameState={engine.gameState}
      onBack={onBack}
    >
      {question && engine.gameState !== 'complete' && (
        <div className="complete-ayah-game">
          <p className="game-ayah-ref">
            Surah {question.surah}, Ayah {question.ayah}
          </p>

          <div className="complete-ayah-text" dir="rtl">
            {question.words.map((word, i) => {
              if (question.blankedIndices.includes(i)) {
                if (engine.gameState === 'feedback') {
                  const userAnswer = (answers[i] ?? '').trim();
                  const isCorrect = userAnswer === word;
                  return (
                    <span
                      key={i}
                      className={`complete-ayah-blank-result ${isCorrect ? 'correct' : 'incorrect'}`}
                    >
                      {isCorrect ? word : `${userAnswer || '___'} (${word})`}
                    </span>
                  );
                }
                return (
                  <input
                    key={i}
                    type="text"
                    className="complete-ayah-input"
                    dir="rtl"
                    value={answers[i] ?? ''}
                    onChange={(e) => handleInputChange(i, e.target.value)}
                    placeholder="___"
                    autoComplete="off"
                  />
                );
              }
              return (
                <span key={i} className="complete-ayah-word">
                  {word}
                </span>
              );
            })}
          </div>

          <div className="game-actions">
            {engine.gameState === 'playing' && (
              <button className="btn btn-primary" onClick={handleSubmit}>
                Check Answer
              </button>
            )}
            {engine.gameState === 'feedback' && (
              <button className="btn btn-primary" onClick={handleNext}>
                Next Question
              </button>
            )}
          </div>
        </div>
      )}
    </GameShell>
  );
}
