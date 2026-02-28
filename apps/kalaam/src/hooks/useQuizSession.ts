import { useState, useCallback, useEffect, useMemo, useRef } from 'react';
import type { ResponseQuality } from '@arabtools/srs';
import { useSettings } from './useSettings';
import { useKalaamSrs } from './useKalaamSrs';
import type { WordBatchItem } from '@/types';

const BATCH_COUNT = 10;
const STREAK_KEY = 'kalaam-streak';
const POINTS_CORRECT = 10;
const POINTS_WRONG = 0;

interface StreakData {
  current: number;
  lastDate: string; // YYYY-MM-DD
}

function getTodayStr(): string {
  return new Date().toISOString().slice(0, 10);
}

function loadStreak(): StreakData {
  try {
    const raw = localStorage.getItem(STREAK_KEY);
    if (raw) return JSON.parse(raw) as StreakData;
  } catch { /* ignore */ }
  return { current: 0, lastDate: '' };
}

function updateStreak(): void {
  const streak = loadStreak();
  const today = getTodayStr();

  if (streak.lastDate === today) return;

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().slice(0, 10);

  const newStreak: StreakData = {
    current: streak.lastDate === yesterdayStr ? streak.current + 1 : 1,
    lastDate: today,
  };
  localStorage.setItem(STREAK_KEY, JSON.stringify(newStreak));
}

export interface QuizSessionReturn {
  currentWord: WordBatchItem | null;
  progress: { current: number; total: number };
  score: { correct: number; total: number };
  points: number;
  isComplete: boolean;
  loadError: string | null;
  results: { reviewed: number; correct: number; accuracy: number; points: number };
  answer: (correct: boolean) => void;
  startSession: () => void;
}

/**
 * Hook that wraps the SRS engine session for quiz mode.
 * Similar to useLessonSession but grades based on correct/wrong answer
 * instead of manual grade selection.
 */
export function useQuizSession(): QuizSessionReturn {
  const { settings } = useSettings();
  const srs = useKalaamSrs(settings);
  const { engine } = srs;

  // Word lookup map: lemmaId -> WordBatchItem
  const [wordMap, setWordMap] = useState<Map<number, WordBatchItem>>(new Map());
  const [wordMapLoaded, setWordMapLoaded] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  // Quiz state
  const [points, setPoints] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [answeredCount, setAnsweredCount] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const sessionStartedRef = useRef(false);

  // Load all word batches into a lookup map
  useEffect(() => {
    if (wordMapLoaded) return;

    const loadAllBatches = async () => {
      const map = new Map<number, WordBatchItem>();
      let failedCount = 0;
      const fetches = Array.from({ length: BATCH_COUNT }, (_, i) =>
        fetch(`/data/words/batch-${i}.json`)
          .then((r) => {
            if (!r.ok) throw new Error(`HTTP ${r.status}`);
            return r.json() as Promise<WordBatchItem[]>;
          })
          .then((items) => {
            for (const item of items) {
              map.set(item.lemmaId, item);
            }
          })
          .catch(() => {
            failedCount++;
          }),
      );

      await Promise.all(fetches);

      if (failedCount === BATCH_COUNT) {
        setLoadError('Failed to load word data. Please check your connection.');
      }

      setWordMap(map);
      setWordMapLoaded(true);
    };

    loadAllBatches();
  }, [wordMapLoaded]);

  // Auto-start session once engine items are loaded and word data is ready.
  // This avoids the race condition where startSession fires before
  // useSrsEngine has loaded items from localStorage.
  useEffect(() => {
    if (sessionStartedRef.current) return;
    if (!engine.isLoaded || engine.items.length === 0 || !wordMapLoaded) return;

    sessionStartedRef.current = true;
    setPoints(0);
    setCorrectCount(0);
    setAnsweredCount(0);
    setIsComplete(false);

    if (engine.session.state.phase === 'idle') {
      srs.startLesson('quiz');
    }
  }, [engine.isLoaded, engine.items.length, wordMapLoaded, engine.session.state.phase, srs]);

  // Session state from engine
  const sessionState = engine.session.state;
  const currentSessionItem = engine.session.currentItem;

  // Resolve current word from the contentId
  const currentWord = useMemo(() => {
    if (!currentSessionItem) return null;
    const contentId = currentSessionItem.srsItem.contentId;
    // contentId format: "lemma-123"
    const match = contentId.match(/^lemma-(\d+)$/);
    if (!match) return null;
    const lemmaId = parseInt(match[1], 10);
    return wordMap.get(lemmaId) ?? null;
  }, [currentSessionItem, wordMap]);

  // Detect session completion
  useEffect(() => {
    if (sessionState.phase === 'complete' && sessionStartedRef.current && !isComplete) {
      setIsComplete(true);
      updateStreak();
    }
  }, [sessionState.phase, isComplete]);

  // startSession is now handled automatically by the effect above.
  const startSession = useCallback(() => {
    // Auto-start effect handles session initialization
  }, []);

  const answer = useCallback(
    (correct: boolean) => {
      // Grade: correct → 2 (Good), wrong → 0 (Again)
      const quality: ResponseQuality = correct ? 2 : 0;

      // Grade the card in the SRS engine
      engine.gradeCard(quality);

      // Track stats
      const earned = correct ? POINTS_CORRECT : POINTS_WRONG;
      setPoints((prev) => prev + earned);
      setAnsweredCount((prev) => prev + 1);
      if (correct) {
        setCorrectCount((prev) => prev + 1);
      }

      // Advance to next card
      engine.nextCard();
    },
    [engine],
  );

  const progress = useMemo(() => {
    const total = sessionState.queue.length;
    const current = sessionState.currentIndex + (isComplete ? 1 : 0);
    return { current: Math.min(current, total), total };
  }, [sessionState.queue.length, sessionState.currentIndex, isComplete]);

  const score = useMemo(
    () => ({
      correct: correctCount,
      total: answeredCount,
    }),
    [correctCount, answeredCount],
  );

  const results = useMemo(
    () => ({
      reviewed: answeredCount,
      correct: correctCount,
      accuracy: answeredCount > 0 ? Math.round((correctCount / answeredCount) * 100) : 0,
      points,
    }),
    [answeredCount, correctCount, points],
  );

  return {
    currentWord,
    progress,
    score,
    points,
    isComplete,
    loadError,
    results,
    answer,
    startSession,
  };
}
