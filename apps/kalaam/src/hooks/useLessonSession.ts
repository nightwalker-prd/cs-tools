import { useState, useCallback, useEffect, useMemo, useRef } from 'react';
import type { ResponseQuality, SessionItem } from '@arabtools/srs';
import { useSettings } from './useSettings';
import { useKalaamSrs } from './useKalaamSrs';
import type { WordBatchItem } from '@/types';

const BATCH_COUNT = 10;
const STREAK_KEY = 'kalaam-streak';
const POINTS_PER_GRADE: Record<number, number> = {
  0: 0,   // Again — no points
  1: 5,   // Hard
  2: 10,  // Good
  3: 15,  // Easy
};

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

  if (streak.lastDate === today) return; // Already updated today

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().slice(0, 10);

  const newStreak: StreakData = {
    current: streak.lastDate === yesterdayStr ? streak.current + 1 : 1,
    lastDate: today,
  };
  localStorage.setItem(STREAK_KEY, JSON.stringify(newStreak));
}

export interface LessonSessionReturn {
  currentItem: SessionItem | null;
  currentWord: WordBatchItem | null;
  isFlipped: boolean;
  progress: { current: number; total: number };
  points: number;
  isComplete: boolean;
  loadError: string | null;
  results: { reviewed: number; correct: number; accuracy: number; points: number };
  startSession: () => void;
  flip: () => void;
  grade: (quality: number) => void;
}

/**
 * Hook that wraps the SRS engine session with word data resolution
 * and flashcard-specific state (flip, points, completion).
 */
export function useLessonSession(): LessonSessionReturn {
  const { settings } = useSettings();
  const srs = useKalaamSrs(settings);
  const { engine } = srs;

  // Word lookup map: lemmaId -> WordBatchItem
  const [wordMap, setWordMap] = useState<Map<number, WordBatchItem>>(new Map());
  const [wordMapLoaded, setWordMapLoaded] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  // Flashcard state
  const [isFlipped, setIsFlipped] = useState(false);
  const [points, setPoints] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [reviewedCount, setReviewedCount] = useState(0);
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
    setIsFlipped(false);
    setPoints(0);
    setCorrectCount(0);
    setReviewedCount(0);
    setIsComplete(false);

    if (engine.session.state.phase === 'idle') {
      srs.startLesson();
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
  // This is kept as a no-op for API compatibility.
  const startSession = useCallback(() => {
    // Auto-start effect handles session initialization
  }, []);

  const flip = useCallback(() => {
    setIsFlipped((prev) => !prev);
  }, []);

  const grade = useCallback(
    (quality: number) => {
      let q = Math.max(0, Math.min(3, quality)) as ResponseQuality;

      // For new cards, "Know" (2) should skip learning and go directly to review.
      // Map quality 2 → 3 (Easy) so the card graduates immediately instead of
      // entering learning phase with a 1-minute due time.
      if (q === 2 && currentSessionItem?.srsItem.phase === 'new') {
        q = 3 as ResponseQuality;
      }

      // Grade the card in the SRS engine
      engine.gradeCard(q);

      // Track stats
      const earned = POINTS_PER_GRADE[q] ?? 0;
      setPoints((prev) => prev + earned);
      setReviewedCount((prev) => prev + 1);
      if (q >= 2) {
        setCorrectCount((prev) => prev + 1);
      }

      // Advance to next card
      engine.nextCard();

      // Reset flip state for next card
      setIsFlipped(false);
    },
    [engine, currentSessionItem],
  );

  const progress = useMemo(() => {
    const total = sessionState.queue.length;
    const current = sessionState.currentIndex + (isComplete ? 1 : 0);
    return { current: Math.min(current, total), total };
  }, [sessionState.queue.length, sessionState.currentIndex, isComplete]);

  const results = useMemo(
    () => ({
      reviewed: reviewedCount,
      correct: correctCount,
      accuracy: reviewedCount > 0 ? Math.round((correctCount / reviewedCount) * 100) : 0,
      points,
    }),
    [reviewedCount, correctCount, points],
  );

  return {
    currentItem: currentSessionItem,
    currentWord,
    isFlipped,
    progress,
    points,
    isComplete,
    loadError,
    results,
    startSession,
    flip,
    grade,
  };
}
