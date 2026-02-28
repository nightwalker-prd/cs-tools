import { describe, it, expect } from 'vitest';
import { checkAchievements } from '../engine/achievement-engine';
import { ACHIEVEMENT_DEFS } from '../data/achievements';
import type { UserStats } from '../types/achievements';

function makeStats(overrides: Partial<UserStats> = {}): UserStats {
  return {
    totalXp: 0,
    currentStreak: 0,
    longestStreak: 0,
    totalExercisesCompleted: 0,
    totalExercisesCorrect: 0,
    totalPerfectSessions: 0,
    totalDaysActive: 0,
    appsUsed: [],
    totalAchievements: 0,
    ...overrides,
  };
}

describe('checkAchievements', () => {
  it('returns empty array for fresh stats', () => {
    const stats = makeStats();
    const result = checkAchievements(stats, new Set(), ACHIEVEMENT_DEFS, '2026-01-15');
    expect(result).toEqual([]);
  });

  it('unlocks streak-1 when currentStreak >= 1', () => {
    const stats = makeStats({ currentStreak: 1 });
    const result = checkAchievements(stats, new Set(), ACHIEVEMENT_DEFS, '2026-01-15');
    const ids = result.map((a) => a.id);
    expect(ids).toContain('streak-1');
  });

  it('unlocks multiple achievements at once', () => {
    const stats = makeStats({
      currentStreak: 7,
      longestStreak: 7,
      totalExercisesCompleted: 10,
      totalExercisesCorrect: 10,
      totalPerfectSessions: 1,
      totalDaysActive: 7,
      appsUsed: ['app1'],
    });
    const result = checkAchievements(stats, new Set(), ACHIEVEMENT_DEFS, '2026-01-15');
    const ids = result.map((a) => a.id);
    expect(ids).toContain('streak-1');
    expect(ids).toContain('streak-3');
    expect(ids).toContain('streak-7');
    expect(ids).toContain('mastery-first-correct');
    expect(ids).toContain('mastery-10-correct');
    expect(ids).toContain('mastery-perfect-1');
    expect(ids).toContain('practice-first');
    expect(ids).toContain('practice-10');
    expect(ids).toContain('practice-days-7');
    expect(ids).toContain('milestone-first-app');
  });

  it('does not return already unlocked achievements', () => {
    const stats = makeStats({ currentStreak: 1 });
    const alreadyUnlocked = new Set(['streak-1']);
    const result = checkAchievements(stats, alreadyUnlocked, ACHIEVEMENT_DEFS, '2026-01-15');
    const ids = result.map((a) => a.id);
    expect(ids).not.toContain('streak-1');
  });

  it('sets unlockedAt to the provided date', () => {
    const stats = makeStats({ currentStreak: 1 });
    const result = checkAchievements(stats, new Set(), ACHIEVEMENT_DEFS, '2026-02-20');
    expect(result[0].unlockedAt).toBe('2026-02-20');
  });

  it('unlocks multi-app milestone', () => {
    const stats = makeStats({ appsUsed: ['app1', 'app2', 'app3'] });
    const result = checkAchievements(stats, new Set(), ACHIEVEMENT_DEFS, '2026-01-15');
    const ids = result.map((a) => a.id);
    expect(ids).toContain('milestone-3-apps');
    expect(ids).not.toContain('milestone-5-apps');
  });

  it('unlocks level milestones based on XP', () => {
    const stats = makeStats({ totalXp: 10000 });
    const result = checkAchievements(stats, new Set(), ACHIEVEMENT_DEFS, '2026-01-15');
    const ids = result.map((a) => a.id);
    expect(ids).toContain('milestone-level-5');
    expect(ids).toContain('milestone-level-10');
    expect(ids).not.toContain('milestone-level-15');
  });

  it('unlocks accuracy achievement', () => {
    const stats = makeStats({
      totalExercisesCompleted: 100,
      totalExercisesCorrect: 95,
    });
    const result = checkAchievements(stats, new Set(), ACHIEVEMENT_DEFS, '2026-01-15');
    const ids = result.map((a) => a.id);
    expect(ids).toContain('mastery-accuracy-90');
  });

  it('does not unlock accuracy achievement if too few exercises', () => {
    const stats = makeStats({
      totalExercisesCompleted: 50,
      totalExercisesCorrect: 48,
    });
    const result = checkAchievements(stats, new Set(), ACHIEVEMENT_DEFS, '2026-01-15');
    const ids = result.map((a) => a.id);
    expect(ids).not.toContain('mastery-accuracy-90');
  });
});
