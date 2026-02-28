import { useCallback } from 'react';
import { usePersistedState } from '@arabtools/core';
import type { GameType, GameStats, AllGameStats, GameAttempt } from '../types';

const defaultGameStats: GameStats = {
  highScore: 0,
  attempts: [],
  currentStreak: 0,
  lastPlayedDate: null,
};

const defaultAllStats: AllGameStats = {
  'sequence-memory': { ...defaultGameStats },
  'number-memory': { ...defaultGameStats },
  'chimp-memory': { ...defaultGameStats },
  'working-memory': { ...defaultGameStats },
  'operation-span': { ...defaultGameStats },
  'corsi-block-tapping': { ...defaultGameStats },
  'digit-span-forward': { ...defaultGameStats },
  'digit-span-backward': { ...defaultGameStats },
  'dual-n-back': { ...defaultGameStats },
  // Quran games
  'first-word': { ...defaultGameStats },
  'complete-ayah': { ...defaultGameStats },
  'word-order': { ...defaultGameStats },
  'chain-reaction': { ...defaultGameStats },
  'similar-ayah': { ...defaultGameStats },
  'audio-recall': { ...defaultGameStats },
  'blind-listen': { ...defaultGameStats },
  'reverse-lookup': { ...defaultGameStats },
  'last-words': { ...defaultGameStats },
  'speed-round': { ...defaultGameStats },
  'ayah-sprint': { ...defaultGameStats },
  'mistake-marathon': { ...defaultGameStats },
  'quran-wordle': { ...defaultGameStats },
  'quran-word-search': { ...defaultGameStats },
  'first-letters': { ...defaultGameStats },
  'surah-sleuth': { ...defaultGameStats },
  'before-after': { ...defaultGameStats },
  'progressive-blanking': { ...defaultGameStats },
  'meaning-links': { ...defaultGameStats },
  'phrase-chunks': { ...defaultGameStats },
  'memory-palace': { ...defaultGameStats },
  'story-chain': { ...defaultGameStats },
  'ayah-pegs': { ...defaultGameStats },
  'elaborative-recall': { ...defaultGameStats },
};

function isSameDay(date1: string, date2: string): boolean {
  return date1.slice(0, 10) === date2.slice(0, 10);
}

function isConsecutiveDay(prev: string, current: string): boolean {
  const prevDate = new Date(prev.slice(0, 10));
  const currentDate = new Date(current.slice(0, 10));
  const diffTime = currentDate.getTime() - prevDate.getTime();
  const diffDays = diffTime / (1000 * 60 * 60 * 24);
  return diffDays === 1;
}

export function useGameStats(gameType: GameType) {
  const [allStats, setAllStats] = usePersistedState<AllGameStats>('dhakira-stats', defaultAllStats);

  const stats: GameStats = allStats[gameType] || defaultGameStats;

  const recordAttempt = useCallback(
    (score: number, duration: number) => {
      const currentDate = new Date().toISOString();
      const attempt: GameAttempt = { date: currentDate, score, duration };

      setAllStats((prev) => {
        const prevStats = prev[gameType] || defaultGameStats;
        const lastPlayedDate = prevStats.lastPlayedDate;

        let newStreak: number;
        if (lastPlayedDate === null) {
          newStreak = 1;
        } else if (isSameDay(lastPlayedDate, currentDate)) {
          newStreak = prevStats.currentStreak;
        } else if (isConsecutiveDay(lastPlayedDate, currentDate)) {
          newStreak = prevStats.currentStreak + 1;
        } else {
          newStreak = 1;
        }

        return {
          ...prev,
          [gameType]: {
            highScore: Math.max(score, prevStats.highScore),
            attempts: [...prevStats.attempts, attempt],
            currentStreak: newStreak,
            lastPlayedDate: currentDate,
          },
        };
      });
    },
    [gameType, setAllStats]
  );

  const getAverageScore = useCallback(() => {
    const attempts = stats.attempts;
    if (attempts.length === 0) return 0;
    const recentAttempts = attempts.slice(-10);
    const sum = recentAttempts.reduce((acc, a) => acc + a.score, 0);
    return Math.round((sum / recentAttempts.length) * 10) / 10;
  }, [stats.attempts]);

  return { stats, recordAttempt, getAverageScore, totalGames: stats.attempts.length };
}

export function useAllGameStats(): AllGameStats {
  const [allStats] = usePersistedState<AllGameStats>('dhakira-stats', defaultAllStats);
  return allStats;
}
