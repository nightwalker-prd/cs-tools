import type { LevelDef, LevelInfo, XpEntry, XpState } from '../types/xp';

const MAX_HISTORY_SIZE = 100;

/**
 * Binary search the levels array to find the current level for a given XP total.
 */
export function calculateLevel(totalXp: number, levels: LevelDef[]): number {
  let lo = 0;
  let hi = levels.length - 1;

  while (lo <= hi) {
    const mid = (lo + hi) >>> 1;
    if (levels[mid].minXp <= totalXp) {
      lo = mid + 1;
    } else {
      hi = mid - 1;
    }
  }

  return levels[hi >= 0 ? hi : 0].level;
}

/**
 * Get full level info including progress toward the next level.
 */
export function getLevelInfo(totalXp: number, levels: LevelDef[]): LevelInfo {
  const level = calculateLevel(totalXp, levels);
  const currentDef = levels.find((l) => l.level === level)!;
  const nextDef = levels.find((l) => l.level === level + 1);

  const xpForNext = nextDef ? nextDef.minXp : currentDef.minXp;
  const xpIntoLevel = totalXp - currentDef.minXp;
  const xpNeeded = xpForNext - currentDef.minXp;
  const progress = xpNeeded > 0 ? Math.min(xpIntoLevel / xpNeeded, 1) : 1;

  return {
    level,
    title: currentDef.title,
    xpRequired: currentDef.minXp,
    xpForNext,
    progress,
  };
}

/**
 * Add an XP entry to the state, updating totals and trimming history.
 * Returns a new state object (immutable).
 */
export function addXpEntry(
  state: XpState,
  entry: Omit<XpEntry, 'timestamp'>,
  levels: LevelDef[],
  timestamp: number,
): XpState {
  const fullEntry: XpEntry = { ...entry, timestamp };
  const newTotalXp = state.totalXp + entry.amount;
  const newLevel = calculateLevel(newTotalXp, levels);

  const history = [...state.history, fullEntry];
  const trimmedHistory =
    history.length > MAX_HISTORY_SIZE
      ? history.slice(-MAX_HISTORY_SIZE)
      : history;

  return {
    totalXp: newTotalXp,
    level: newLevel,
    history: trimmedHistory,
  };
}
