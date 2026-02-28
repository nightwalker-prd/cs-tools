import { useState, useEffect, useCallback } from 'react';
import { Loader2 } from 'lucide-react';
import { shuffle, pickRandom } from '@arabtools/core';
import { expandRubToAyahs } from '@arabtools/data';
import type { HafizRub, SurahData } from '../../types';
import { useGameEngine } from '../../hooks/useGameEngine';
import { useQuranText } from '../../hooks/useQuranText';
import { useAyahMastery } from '../../hooks/useAyahMastery';
import { GameShell } from './GameShell';

interface BeforeAfterProps {
  rubs: HafizRub[];
  onBack: () => void;
}

interface Question {
  surah: number;
  ayah: number;
  promptText: string;
  direction: 'before' | 'after';
  correctText: string;
  correctRef: { surah: number; ayah: number };
  choices: string[];
  correctIndex: number;
}

const TOTAL_QUESTIONS = 10;

export function BeforeAfter({ rubs, onBack }: BeforeAfterProps) {
  const engine = useGameEngine();
  const { loadSurah, loading: textLoading } = useQuranText();
  const mastery = useAyahMastery();

  const [question, setQuestion] = useState<Question | null>(null);
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);
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
    // Build a list of ayahs that have both a before and after neighbor
    const ayahsWithText: Array<{ surah: number; ayah: number; text: string }> = [];
    for (const rub of rubs) {
      const rubAyahs = expandRubToAyahs(rub.id);
      for (const a of rubAyahs) {
        const surahData = surahCache.get(a.surah);
        if (surahData) {
          const ayahData = surahData.ayahs.find((x) => x.num === a.ayah);
          if (ayahData && ayahData.text.trim()) {
            ayahsWithText.push({ ...a, text: ayahData.text });
          }
        }
      }
    }

    if (ayahsWithText.length < 5) return null;

    // Find a pair where the adjacent ayah also exists
    for (let attempt = 0; attempt < 20; attempt++) {
      const direction = Math.random() > 0.5 ? 'after' : 'before';
      const picked = pickRandom(ayahsWithText);
      if (!picked) continue;

      const surahData = surahCache.get(picked.surah);
      if (!surahData) continue;

      const adjacentNum = direction === 'after' ? picked.ayah + 1 : picked.ayah - 1;
      const adjacentAyah = surahData.ayahs.find((x) => x.num === adjacentNum);
      if (!adjacentAyah || !adjacentAyah.text.trim()) continue;

      // Get distractor texts from other ayahs
      const distractors: string[] = [];
      const used = new Set([picked.text, adjacentAyah.text]);

      for (const a of ayahsWithText) {
        if (!used.has(a.text) && distractors.length < 3) {
          distractors.push(a.text);
          used.add(a.text);
        }
      }

      if (distractors.length < 3) continue;

      // Build choices with correct answer included
      const allChoices = [adjacentAyah.text, ...distractors];
      const shuffled = shuffle(allChoices);
      const correctIndex = shuffled.indexOf(adjacentAyah.text);

      return {
        surah: picked.surah,
        ayah: picked.ayah,
        promptText: picked.text,
        direction,
        correctText: adjacentAyah.text,
        correctRef: { surah: picked.surah, ayah: adjacentNum },
        choices: shuffled,
        correctIndex,
      };
    }

    return null;
  }, [rubs, surahCache]);

  // Start game when data is ready
  useEffect(() => {
    if (dataReady && engine.gameState === 'idle') {
      const q = generateQuestion();
      if (q) {
        setQuestion(q);
        setSelectedChoice(null);
        engine.startGame(TOTAL_QUESTIONS);
      } else {
        setNoData(true);
      }
    }
  }, [dataReady, engine.gameState, generateQuestion, engine]);

  const handleChoiceSelect = (index: number) => {
    if (engine.gameState !== 'playing' || !question) return;

    setSelectedChoice(index);
    const correct = index === question.correctIndex;
    mastery.recordAttempt(question.correctRef.surah, question.correctRef.ayah, correct);
    engine.submitAnswer(correct);
  };

  const handleNext = () => {
    const q = generateQuestion();
    setQuestion(q);
    setSelectedChoice(null);
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
      title="Before & After"
      score={engine.score}
      total={engine.totalQuestions}
      timeElapsed={engine.timeElapsed}
      gameState={engine.gameState}
      onBack={onBack}
    >
      {question && engine.gameState !== 'complete' && (
        <div className="before-after-game">
          <p className="game-ayah-ref">
            Surah {question.surah}, Ayah {question.ayah}
          </p>

          <div className="before-after-prompt" dir="rtl">
            <p className="before-after-text">{question.promptText}</p>
          </div>

          <p className="game-instruction">
            What comes <strong>{question.direction === 'after' ? 'next' : 'before'}</strong>?
          </p>

          <div className="before-after-choices">
            {question.choices.map((choice, i) => {
              let choiceClass = 'before-after-choice';
              if (engine.gameState === 'feedback') {
                if (i === question.correctIndex) {
                  choiceClass += ' correct';
                } else if (i === selectedChoice && i !== question.correctIndex) {
                  choiceClass += ' incorrect';
                }
              } else if (i === selectedChoice) {
                choiceClass += ' selected';
              }

              return (
                <button
                  key={i}
                  className={choiceClass}
                  dir="rtl"
                  onClick={() => handleChoiceSelect(i)}
                  disabled={engine.gameState !== 'playing'}
                >
                  {choice}
                </button>
              );
            })}
          </div>

          {engine.gameState === 'feedback' && (
            <div className="game-actions">
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
