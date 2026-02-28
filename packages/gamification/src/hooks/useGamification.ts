import { useCallback, useEffect, useState } from 'react';

import type { XpState, LevelInfo } from '../types/xp';
import type { StreakData, StreakMultiplierInfo } from '../types/streak';
import type { AchievementDef } from '../types/achievements';
import { LEVELS } from '../data/levels';
import { ACHIEVEMENT_DEFS } from '../data/achievements';
import { XP_REWARDS } from '../data/xp-rewards';
import { addXpEntry, getLevelInfo } from '../engine/xp-engine';
import { recordPracticeDay, getStreakMultiplier, checkStreakBreak, refillFreezeTokens, earnShieldToken } from '../engine/streak-engine';
import { checkAchievements } from '../engine/achievement-engine';
import {
  loadXpState,
  saveXpState,
  loadStreakData,
  saveStreakData,
  loadStreakFreezeData,
  saveStreakFreezeData,
  loadAchievements,
  saveAchievements,
  collectUserStats,
} from '../storage/gamification-storage';

interface RecordPracticeOpts {
  exercisesCompleted: number;
  exercisesCorrect: number;
  isPerfectSession: boolean;
  sourceApp: string;
}

interface RecordPracticeResult {
  xpGained: number;
  newAchievements: AchievementDef[];
  leveledUp: boolean;
}

export interface UseGamificationReturn {
  xpState: XpState;
  levelInfo: LevelInfo;
  streakData: StreakData;
  streakMultiplier: StreakMultiplierInfo;
  achievements: Record<string, string>;
  recordPractice: (opts: RecordPracticeOpts) => RecordPracticeResult;
}

export function useGamification(): UseGamificationReturn {
  const [xpState, setXpState] = useState<XpState>(() => loadXpState());
  const [streakData, setStreakData] = useState<StreakData>(() => loadStreakData());
  const [achievements, setAchievements] = useState<Record<string, string>>(() => loadAchievements());

  // On mount, check/fix streak break and refill freeze tokens
  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10);
    let freeze = loadStreakFreezeData();
    let streak = streakData;

    // Refill freeze tokens if new month
    freeze = refillFreezeTokens(freeze, today);

    // Check for streak break
    const breakResult = checkStreakBreak(streak, freeze, today);
    streak = breakResult.streak;
    freeze = breakResult.freeze;

    setStreakData(streak);
    saveStreakData(streak);
    saveStreakFreezeData(freeze);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const levelInfo = getLevelInfo(xpState.totalXp, LEVELS);
  const streakMultiplier = getStreakMultiplier(streakData.currentStreak);

  const recordPractice = useCallback(
    (opts: RecordPracticeOpts): RecordPracticeResult => {
      const now = Date.now();
      const today = new Date().toISOString().slice(0, 10);
      const previousLevel = xpState.level;
      let currentXpState = xpState;
      let totalXpGained = 0;
      const multiplier = getStreakMultiplier(streakData.currentStreak).multiplier;

      // Award XP for correct answers
      for (let i = 0; i < opts.exercisesCorrect; i++) {
        const amount = Math.round(XP_REWARDS.exerciseCorrect * multiplier);
        currentXpState = addXpEntry(
          currentXpState,
          { amount, source: 'exerciseCorrect', sourceApp: opts.sourceApp },
          LEVELS,
          now,
        );
        totalXpGained += amount;
      }

      // Award XP for attempts (wrong answers)
      const wrongAnswers = opts.exercisesCompleted - opts.exercisesCorrect;
      for (let i = 0; i < wrongAnswers; i++) {
        const amount = XP_REWARDS.exerciseAttempt;
        currentXpState = addXpEntry(
          currentXpState,
          { amount, source: 'exerciseAttempt', sourceApp: opts.sourceApp },
          LEVELS,
          now,
        );
        totalXpGained += amount;
      }

      // Perfect session bonus
      if (opts.isPerfectSession) {
        const amount = Math.round(XP_REWARDS.perfectSession * multiplier);
        currentXpState = addXpEntry(
          currentXpState,
          { amount, source: 'perfectSession', sourceApp: opts.sourceApp },
          LEVELS,
          now,
        );
        totalXpGained += amount;
      }

      // Update streak
      const newStreakData = recordPracticeDay(streakData, today);

      // Award shield token for perfect session
      let freeze = loadStreakFreezeData();
      if (opts.isPerfectSession) {
        freeze = earnShieldToken(freeze);
        saveStreakFreezeData(freeze);
      }

      // Check achievements
      const stats = collectUserStats();
      // Override with fresh data we just computed
      stats.totalXp = currentXpState.totalXp;
      stats.currentStreak = newStreakData.currentStreak;
      stats.longestStreak = newStreakData.longestStreak;
      stats.totalDaysActive = newStreakData.practiceDates.length;

      const unlockedIds = new Set(Object.keys(achievements));
      const newlyUnlocked = checkAchievements(stats, unlockedIds, ACHIEVEMENT_DEFS, today);

      // Award XP for new achievements
      for (const _unlocked of newlyUnlocked) {
        currentXpState = addXpEntry(
          currentXpState,
          { amount: XP_REWARDS.achievementUnlock, source: 'achievementUnlock', sourceApp: 'gamification' },
          LEVELS,
          now,
        );
        totalXpGained += XP_REWARDS.achievementUnlock;
      }

      // Update achievements record
      const newAchievements = { ...achievements };
      for (const a of newlyUnlocked) {
        newAchievements[a.id] = a.unlockedAt;
      }

      // Save everything
      setXpState(currentXpState);
      saveXpState(currentXpState);
      setStreakData(newStreakData);
      saveStreakData(newStreakData);
      setAchievements(newAchievements);
      saveAchievements(newAchievements);

      const leveledUp = currentXpState.level > previousLevel;

      // Map newly unlocked IDs to their full definitions
      const unlockedDefs = newlyUnlocked
        .map((a) => ACHIEVEMENT_DEFS.find((d) => d.id === a.id))
        .filter((d): d is AchievementDef => d !== undefined);

      return {
        xpGained: totalXpGained,
        newAchievements: unlockedDefs,
        leveledUp,
      };
    },
    [xpState, streakData, achievements],
  );

  return {
    xpState,
    levelInfo,
    streakData,
    streakMultiplier,
    achievements,
    recordPractice,
  };
}
