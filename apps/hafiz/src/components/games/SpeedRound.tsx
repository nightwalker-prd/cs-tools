import { useState, useEffect, useCallback, useRef } from 'react';
import { Loader2, Zap } from 'lucide-react';
import { shuffle, pickRandom } from '@arabtools/core';
import { expandRubToAyahs } from '@arabtools/data';
import type { HafizRub, SurahData, GameState } from '../../types';
import { useQuranText } from '../../hooks/useQuranText';
import { useAyahMastery } from '../../hooks/useAyahMastery';
import { GameShell } from './GameShell';

interface SpeedRoundProps {
  rubs: HafizRub[];
  onBack: () => void;
}

type MiniGameType = 'complete' | 'before-after' | 'first-letter';

interface SpeedQuestion {
  type: MiniGameType;
  surah: number;
  ayah: number;
  prompt: string;
  choices: string[];
  correctIndex: number;
}

const ROUND_DURATION = 60; // seconds

export function SpeedRound({ rubs, onBack }: SpeedRoundProps) {
  const { loadSurah, loading: textLoading } = useQuranText();
  const mastery = useAyahMastery();

  const [gameState, setGameState] = useState<GameState>('idle');
  const [score, setScore] = useState(0);
  const [totalAnswered, setTotalAnswered] = useState(0);
  const [timeLeft, setTimeLeft] = useState(ROUND_DURATION);
  const [question, setQuestion] = useState<SpeedQuestion | null>(null);
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [surahCache, setSurahCache] = useState<Map<number, SurahData>>(new Map());
  const [dataReady, setDataReady] = useState(false);
  const [noData, setNoData] = useState(false);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const ayahsRef = useRef<Array<{ surah: number; ayah: number; text: string }>>([]);

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

      // Pre-build ayah list
      const allAyahs: Array<{ surah: number; ayah: number; text: string }> = [];
      for (const rub of rubs) {
        const rubAyahs = expandRubToAyahs(rub.id);
        for (const a of rubAyahs) {
          const surahData = cache.get(a.surah);
          if (surahData) {
            const ayahData = surahData.ayahs.find((x) => x.num === a.ayah);
            if (ayahData && ayahData.text.trim()) {
              allAyahs.push({ ...a, text: ayahData.text });
            }
          }
        }
      }
      ayahsRef.current = allAyahs;
      setDataReady(true);
    }

    loadData();
    return () => { cancelled = true; };
  }, [rubs, loadSurah]);

  const generateSpeedQuestion = useCallback((): SpeedQuestion | null => {
    const allAyahs = ayahsRef.current;
    if (allAyahs.length < 4) return null;

    const types: MiniGameType[] = ['complete', 'before-after', 'first-letter'];

    // Retry loop to avoid recursion and potential stack overflow
    for (let attempt = 0; attempt < 15; attempt++) {
      const type = pickRandom(types) ?? 'complete';
      const picked = pickRandom(allAyahs);
      if (!picked) continue;

      const words = picked.text.split(/\s+/).filter(Boolean);

      // Get 3 distractors
      const distractorAyahs = shuffle(allAyahs.filter((a) => a.text !== picked.text)).slice(0, 3);
      if (distractorAyahs.length < 3) continue;

      if (type === 'complete') {
        if (words.length < 2) continue;
        const blankIdx = Math.floor(Math.random() * words.length);
        const blankedWord = words[blankIdx];
        const promptWords = words.map((w, i) => (i === blankIdx ? '___' : w));
        const prompt = promptWords.join(' ');

        const distractorWords = distractorAyahs.map((a) => {
          const w = a.text.split(/\s+/).filter(Boolean);
          return pickRandom(w) ?? w[0];
        });

        const allChoices = [blankedWord, ...distractorWords];
        const shuffled = shuffle(allChoices);

        return {
          type: 'complete',
          surah: picked.surah,
          ayah: picked.ayah,
          prompt,
          choices: shuffled,
          correctIndex: shuffled.indexOf(blankedWord),
        };
      }

      if (type === 'before-after') {
        const surahData = surahCache.get(picked.surah);
        if (!surahData) continue;

        const nextAyah = surahData.ayahs.find((x) => x.num === picked.ayah + 1);
        if (!nextAyah || !nextAyah.text.trim()) continue;

        const distractorTexts = distractorAyahs.map((a) => a.text);
        const allChoices = [nextAyah.text, ...distractorTexts];
        const shuffled = shuffle(allChoices);

        return {
          type: 'before-after',
          surah: picked.surah,
          ayah: picked.ayah,
          prompt: picked.text,
          choices: shuffled,
          correctIndex: shuffled.indexOf(nextAyah.text),
        };
      }

      if (type === 'first-letter') {
        const firstLetters = words.map((w) => w.charAt(0)).join(' ');

        const distractorTexts = distractorAyahs.map((a) => a.text);
        const allChoices = [picked.text, ...distractorTexts];
        const shuffled = shuffle(allChoices);

        return {
          type: 'first-letter',
          surah: picked.surah,
          ayah: picked.ayah,
          prompt: firstLetters,
          choices: shuffled,
          correctIndex: shuffled.indexOf(picked.text),
        };
      }
    }

    return null;
  }, [surahCache]);

  // Start the game
  const startGame = useCallback(() => {
    setScore(0);
    setTotalAnswered(0);
    setTimeLeft(ROUND_DURATION);
    setGameState('playing');
    setSelectedChoice(null);
    setShowFeedback(false);

    const q = generateSpeedQuestion();
    setQuestion(q);
  }, [generateSpeedQuestion]);

  // Timer countdown
  useEffect(() => {
    if (gameState === 'playing') {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setGameState('complete');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [gameState]);

  // Auto-start when data ready
  useEffect(() => {
    if (dataReady && gameState === 'idle') {
      if (ayahsRef.current.length < 4) {
        setNoData(true);
        return;
      }
      startGame();
    }
  }, [dataReady, gameState, startGame]);

  const handleChoiceSelect = (index: number) => {
    if (gameState !== 'playing' || !question || showFeedback) return;

    setSelectedChoice(index);
    const correct = index === question.correctIndex;

    if (correct) setScore((prev) => prev + 1);
    setTotalAnswered((prev) => prev + 1);
    mastery.recordAttempt(question.surah, question.ayah, correct);

    setShowFeedback(true);

    // Move to next question after brief feedback
    setTimeout(() => {
      setShowFeedback(false);
      setSelectedChoice(null);
      const q = generateSpeedQuestion();
      setQuestion(q);
    }, 600);
  };

  const getTypeLabel = (type: MiniGameType): string => {
    switch (type) {
      case 'complete': return 'Fill the blank';
      case 'before-after': return 'What comes next?';
      case 'first-letter': return 'Identify the ayah';
    }
  };

  const timeElapsedForShell = ROUND_DURATION - timeLeft;

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
      title="Speed Round"
      score={score}
      total={totalAnswered}
      timeElapsed={timeElapsedForShell}
      gameState={gameState}
      onBack={onBack}
    >
      {gameState === 'playing' && question && (
        <div className="speed-round-game">
          <div className="speed-round-timer-bar">
            <div
              className="speed-round-timer-fill"
              style={{ width: `${(timeLeft / ROUND_DURATION) * 100}%` }}
            />
          </div>

          <div className="speed-round-countdown">
            <Zap size={16} />
            <span>{timeLeft}s</span>
          </div>

          <p className="speed-round-type-label">{getTypeLabel(question.type)}</p>

          <div className="speed-round-prompt" dir="rtl">
            {question.prompt}
          </div>

          <div className="speed-round-choices">
            {question.choices.map((choice, i) => {
              let choiceClass = 'speed-round-choice';
              if (showFeedback) {
                if (i === question.correctIndex) {
                  choiceClass += ' correct';
                } else if (i === selectedChoice && i !== question.correctIndex) {
                  choiceClass += ' incorrect';
                }
              }

              return (
                <button
                  key={i}
                  className={choiceClass}
                  dir="rtl"
                  onClick={() => handleChoiceSelect(i)}
                  disabled={showFeedback}
                >
                  {choice}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {gameState === 'complete' && (
        <div className="speed-round-results">
          <p className="speed-round-summary">
            You answered <strong>{totalAnswered}</strong> questions
            in {ROUND_DURATION} seconds
          </p>
        </div>
      )}
    </GameShell>
  );
}
