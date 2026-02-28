import type { Achievement, AchievementDef, UserStats } from '../types/achievements';

/**
 * Check all achievement definitions against current stats.
 * Returns an array of newly unlocked achievements (not previously unlocked).
 * Pure function — pass already-unlocked IDs and the current date.
 */
export function checkAchievements(
  stats: UserStats,
  unlockedIds: Set<string>,
  defs: AchievementDef[],
  today: string,
): Achievement[] {
  const newlyUnlocked: Achievement[] = [];

  for (const def of defs) {
    if (unlockedIds.has(def.id)) continue;

    if (def.condition(stats)) {
      newlyUnlocked.push({
        id: def.id,
        unlockedAt: today,
      });
    }
  }

  return newlyUnlocked;
}
