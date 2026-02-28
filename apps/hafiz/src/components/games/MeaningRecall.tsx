import { useState, useEffect, useCallback, useMemo } from 'react';
import { Loader2 } from 'lucide-react';
import { shuffle } from '@arabtools/core';
import { expandRubToAyahs } from '@arabtools/data';
import type { HafizRub, AyahTranslation } from '../../types';
import { useQuranText } from '../../hooks/useQuranText';
import { useGameEngine } from '../../hooks/useGameEngine';
import { GameShell } from './GameShell';

interface MeaningRecallProps {
  rubs: HafizRub[];
  onBack: () => void;
}

interface Question {
  translation: string;
  correctAyah: { surah: number; ayah: number; text: string };
  choices: Array<{ surah: number; ayah: number; text: string }>;
}

const TOTAL_QUESTIONS = 10;

// Module-level cache for translations
let translationCache: AyahTranslation[] | null = null;
let translationPending: Promise<AyahTranslation[]> | null = null;

function loadTranslationData(): Promise<AyahTranslation[]> {
  if (translationCache) return Promise.resolve(translationCache);
  if (translationPending) return translationPending;

  translationPending = fetch(`./data/ayah-translations.json`)
    .then((res) => res.json() as Promise<AyahTranslation[]>)
    .then((data) => {
      translationCache = data;
      translationPending = null;
      return data;
    })
    .catch((err) => {
      translationPending = null;
      throw err;
    });

  return translationPending;
}

export function MeaningRecall({ rubs, onBack }: MeaningRecallProps) {
  const engine = useGameEngine();
  const { loadSurah, loading: textLoading } = useQuranText();

  const [translations, setTranslations] = useState<AyahTranslation[] | null>(translationCache);
  const [question, setQuestion] = useState<Question | null>(null);
  const [selected, setSelected] = useState<number | null>(null);
  const [dataReady, setDataReady] = useState(false);
  const [noData, setNoData] = useState(false);
  const [ayahTexts, setAyahTexts] = useState<Map<string, string>>(new Map());

  // Collect all memorized ayah refs
  const allAyahRefs = useMemo(() => {
    const refs: Array<{ surah: number; ayah: number }> = [];
    for (const rub of rubs) {
      refs.push(...expandRubToAyahs(rub.id));
    }
    return refs;
  }, [rubs]);

  // Load translation data + ayah texts
  useEffect(() => {
    let cancelled = false;

    async function load() {
      const [transData] = await Promise.all([
        loadTranslationData(),
      ]);

      if (cancelled) return;
      setTranslations(transData);

      // Load surah texts
      const surahNums = [...new Set(allAyahRefs.map((a) => a.surah))];
      const textMap = new Map<string, string>();

      for (const num of surahNums) {
        const data = await loadSurah(num);
        if (cancelled) return;
        if (data) {
          for (const a of data.ayahs) {
            textMap.set(`${num}:${a.num}`, a.text);
          }
        }
      }

      if (cancelled) return;

      if (textMap.size === 0) {
        setNoData(true);
        return;
      }

      setAyahTexts(textMap);
      setDataReady(true);
    }

    load().catch(() => {
      if (!cancelled) setNoData(true);
    });

    return () => { cancelled = true; };
  }, [allAyahRefs, loadSurah]);

  // Generate a question
  const generateQuestion = useCallback((): Question | null => {
    if (!translations || ayahTexts.size === 0) return null;

    // Filter to ayahs that have both translation and text
    const validAyahs = allAyahRefs.filter((a) => {
      const key = `${a.surah}:${a.ayah}`;
      const hasText = ayahTexts.has(key);
      const hasTrans = translations.some(
        (t) => t.surahNum === a.surah && t.ayahNum === a.ayah,
      );
      return hasText && hasTrans;
    });

    if (validAyahs.length < 4) return null;

    // Pick a random correct ayah
    const correctIdx = Math.floor(Math.random() * validAyahs.length);
    const correct = validAyahs[correctIdx];
    const correctKey = `${correct.surah}:${correct.ayah}`;
    const correctText = ayahTexts.get(correctKey) || '';
    const translation = translations.find(
      (t) => t.surahNum === correct.surah && t.ayahNum === correct.ayah,
    );

    if (!translation) return null;

    // Pick 3 distractors
    const distractors: Array<{ surah: number; ayah: number; text: string }> = [];
    const used = new Set([correctKey]);

    const shuffled = shuffle([...validAyahs]);
    for (const a of shuffled) {
      const key = `${a.surah}:${a.ayah}`;
      if (used.has(key)) continue;
      const text = ayahTexts.get(key);
      if (text) {
        distractors.push({ surah: a.surah, ayah: a.ayah, text });
        used.add(key);
      }
      if (distractors.length >= 3) break;
    }

    if (distractors.length < 3) return null;

    const choices = shuffle([
      { surah: correct.surah, ayah: correct.ayah, text: correctText },
      ...distractors,
    ]);

    return {
      translation: translation.text,
      correctAyah: { surah: correct.surah, ayah: correct.ayah, text: correctText },
      choices,
    };
  }, [translations, ayahTexts, allAyahRefs]);

  // Start game when data is ready
  useEffect(() => {
    if (dataReady && engine.gameState === 'idle') {
      const q = generateQuestion();
      if (q) {
        setQuestion(q);
        setSelected(null);
        engine.startGame(TOTAL_QUESTIONS);
      } else {
        setNoData(true);
      }
    }
  }, [dataReady, engine.gameState, generateQuestion, engine]);

  const handleChoice = (idx: number) => {
    if (engine.gameState !== 'playing' || !question) return;
    setSelected(idx);
    const choice = question.choices[idx];
    const isCorrect =
      choice.surah === question.correctAyah.surah &&
      choice.ayah === question.correctAyah.ayah;
    engine.submitAnswer(isCorrect);
  };

  const handleNext = () => {
    const q = generateQuestion();
    setQuestion(q);
    setSelected(null);
    engine.nextQuestion();
  };

  if (noData) {
    return (
      <div className="game-empty fade-in-up">
        <div className="game-empty-content">
          <h3>Not enough data</h3>
          <p>Need at least 4 memorized ayahs with translations to play.</p>
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
        <p>Loading translations...</p>
      </div>
    );
  }

  return (
    <GameShell
      title="Meaning Recall"
      score={engine.score}
      total={engine.totalQuestions}
      timeElapsed={engine.timeElapsed}
      gameState={engine.gameState}
      onBack={onBack}
    >
      {question && engine.gameState !== 'complete' && (
        <div className="meaning-recall-game">
          <div className="meaning-recall-prompt">
            <p className="meaning-recall-label">Which ayah matches this translation?</p>
            <blockquote className="meaning-recall-translation">
              {question.translation}
            </blockquote>
          </div>

          <div className="game-choices">
            {question.choices.map((choice, i) => {
              let className = 'game-choice';
              if (engine.gameState === 'feedback' && selected !== null) {
                const isCorrect =
                  choice.surah === question.correctAyah.surah &&
                  choice.ayah === question.correctAyah.ayah;
                if (isCorrect) className += ' correct';
                else if (i === selected) className += ' incorrect';
              }

              return (
                <button
                  key={i}
                  className={className}
                  onClick={() => handleChoice(i)}
                  disabled={engine.gameState === 'feedback'}
                >
                  {choice.text}
                </button>
              );
            })}
          </div>

          <div className="game-actions">
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
