import { useState, useEffect, useCallback } from 'react';
import { Loader2, Eye } from 'lucide-react';
import { pickRandom } from '@arabtools/core';
import { expandRubToAyahs } from '@arabtools/data';
import type { HafizRub, SurahData } from '../../types';
import { useGameEngine } from '../../hooks/useGameEngine';
import { useQuranText } from '../../hooks/useQuranText';
import { useAyahMastery } from '../../hooks/useAyahMastery';
import { GameShell } from './GameShell';

interface FirstLettersProps {
  rubs: HafizRub[];
  onBack: () => void;
}

interface Question {
  surah: number;
  ayah: number;
  fullText: string;
  words: string[];
  firstLetters: string[];
}

const TOTAL_QUESTIONS = 10;

function getFirstLetter(word: string): string {
  // Return first character of the Arabic word
  return word.charAt(0);
}

export function FirstLetters({ rubs, onBack }: FirstLettersProps) {
  const engine = useGameEngine();
  const { loadSurah, loading: textLoading } = useQuranText();
  const mastery = useAyahMastery();

  const [question, setQuestion] = useState<Question | null>(null);
  const [userInput, setUserInput] = useState('');
  const [revealed, setRevealed] = useState(false);
  const [surahCache, setSurahCache] = useState<Map<number, SurahData>>(new Map());
  const [dataReady, setDataReady] = useState(false);
  const [noData, setNoData] = useState(false);

  // Load surah data
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
            availableAyahs.push({ ...a, text: ayahData.text });
          }
        }
      }
    }

    if (availableAyahs.length === 0) return null;

    const picked = pickRandom(availableAyahs);
    if (!picked) return null;

    const words = picked.text.split(/\s+/).filter(Boolean);
    const firstLetters = words.map(getFirstLetter);

    return {
      surah: picked.surah,
      ayah: picked.ayah,
      fullText: picked.text,
      words,
      firstLetters,
    };
  }, [rubs, surahCache]);

  // Start game when data is ready
  useEffect(() => {
    if (dataReady && engine.gameState === 'idle') {
      const q = generateQuestion();
      if (q) {
        setQuestion(q);
        setUserInput('');
        setRevealed(false);
        engine.startGame(TOTAL_QUESTIONS);
      } else {
        setNoData(true);
      }
    }
  }, [dataReady, engine.gameState, generateQuestion, engine]);

  const handleReveal = () => {
    setRevealed(true);
  };

  const handleSubmit = (selfAssessCorrect: boolean) => {
    if (!question) return;
    mastery.recordAttempt(question.surah, question.ayah, selfAssessCorrect);
    engine.submitAnswer(selfAssessCorrect);
  };

  const handleNext = () => {
    const q = generateQuestion();
    setQuestion(q);
    setUserInput('');
    setRevealed(false);
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
      title="First Letters"
      score={engine.score}
      total={engine.totalQuestions}
      timeElapsed={engine.timeElapsed}
      gameState={engine.gameState}
      onBack={onBack}
    >
      {question && engine.gameState !== 'complete' && (
        <div className="first-letters-game">
          <p className="game-ayah-ref">
            Surah {question.surah}, Ayah {question.ayah}
          </p>

          {/* Show first letters */}
          <div className="first-letters-hint" dir="rtl">
            {question.firstLetters.map((letter, i) => (
              <span key={i} className="first-letter-chip">
                {letter}
              </span>
            ))}
          </div>

          {engine.gameState === 'playing' && (
            <>
              <p className="game-instruction">
                Recall the full ayah from these first letters.
              </p>

              {/* User can type their attempt */}
              <textarea
                className="first-letters-input"
                dir="rtl"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Type the full ayah here..."
                rows={3}
              />

              <div className="game-actions">
                {!revealed && (
                  <button className="btn btn-ghost" onClick={handleReveal}>
                    <Eye size={16} />
                    Reveal
                  </button>
                )}
              </div>

              {revealed && (
                <div className="first-letters-revealed" dir="rtl">
                  <p className="game-feedback-label">Full ayah:</p>
                  <p className="game-feedback-text">{question.fullText}</p>
                </div>
              )}

              {/* Self-assessment */}
              <div className="game-self-assess">
                <p>How did you do?</p>
                <div className="game-self-assess-buttons">
                  <button
                    className="btn btn-success"
                    onClick={() => handleSubmit(true)}
                  >
                    I got it right
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleSubmit(false)}
                  >
                    I made mistakes
                  </button>
                </div>
              </div>
            </>
          )}

          {engine.gameState === 'feedback' && (
            <div className="game-feedback">
              <p className="game-feedback-label">Full ayah:</p>
              <p className="game-feedback-text" dir="rtl">
                {question.fullText}
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
