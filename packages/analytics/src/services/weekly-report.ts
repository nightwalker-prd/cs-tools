import type { TrendDirection } from '../types/blind-spots';
import type { DailyStats, WeeklyComparison, WeeklySnapshot, WeeklyStats } from '../types/weekly';

const MAX_DAILY_ENTRIES = 365;

function emptyDailyStats(date: string): DailyStats {
  return {
    date,
    exercisesCompleted: 0,
    exercisesCorrect: 0,
    errorsRecorded: 0,
    timeSpentMinutes: 0,
  };
}

/**
 * Get the Monday of the week containing the given ISO date string.
 */
function getMonday(dateStr: string): string {
  const d = new Date(dateStr + 'T00:00:00Z');
  const day = d.getUTCDay();
  // Sunday = 0, Monday = 1, etc.
  const diff = day === 0 ? 6 : day - 1;
  d.setUTCDate(d.getUTCDate() - diff);
  return d.toISOString().slice(0, 10);
}

/**
 * Get the Sunday of the week starting on the given Monday.
 */
function getSunday(mondayStr: string): string {
  const d = new Date(mondayStr + 'T00:00:00Z');
  d.setUTCDate(d.getUTCDate() + 6);
  return d.toISOString().slice(0, 10);
}

/**
 * Compute a weekly snapshot for a given week start date.
 */
export function getWeeklySnapshot(stats: WeeklyStats, weekStartDate: string): WeeklySnapshot {
  const monday = getMonday(weekStartDate);
  const sunday = getSunday(monday);

  // Generate all 7 days of the week
  const days: DailyStats[] = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(monday + 'T00:00:00Z');
    d.setUTCDate(d.getUTCDate() + i);
    const dateStr = d.toISOString().slice(0, 10);

    const existing = stats.dailyEntries.find(e => e.date === dateStr);
    days.push(existing ?? emptyDailyStats(dateStr));
  }

  const totalExercises = days.reduce((sum, d) => sum + d.exercisesCompleted, 0);
  const totalCorrect = days.reduce((sum, d) => sum + d.exercisesCorrect, 0);
  const totalErrors = days.reduce((sum, d) => sum + d.errorsRecorded, 0);
  const accuracy = totalExercises > 0 ? totalCorrect / totalExercises : 0;

  // Find most active day
  let mostActiveDay = days[0].date;
  let maxExercises = days[0].exercisesCompleted;
  for (const day of days) {
    if (day.exercisesCompleted > maxExercises) {
      maxExercises = day.exercisesCompleted;
      mostActiveDay = day.date;
    }
  }

  // Find top error category from the week's entries
  // We don't have category-level data in DailyStats, so return null
  const topErrorCategory: string | null = null;

  return {
    weekStart: monday,
    weekEnd: sunday,
    days,
    totalExercises,
    totalCorrect,
    totalErrors,
    accuracy,
    mostActiveDay,
    topErrorCategory,
  };
}

function computeTrend(thisValue: number, lastValue: number | null): TrendDirection {
  if (lastValue === null) return 'stable';
  if (thisValue > lastValue * 1.1) return 'improving';
  if (thisValue < lastValue * 0.9) return 'worsening';
  return 'stable';
}

function computeErrorTrend(thisErrors: number, lastErrors: number | null): TrendDirection {
  if (lastErrors === null) return 'stable';
  // For errors, fewer is better (inverted)
  if (thisErrors < lastErrors * 0.9) return 'improving';
  if (thisErrors > lastErrors * 1.1) return 'worsening';
  return 'stable';
}

/**
 * Compare this week vs last week with trend computation.
 */
export function getWeeklyComparison(stats: WeeklyStats, today: string): WeeklyComparison {
  const thisMonday = getMonday(today);
  const lastMondayDate = new Date(thisMonday + 'T00:00:00Z');
  lastMondayDate.setUTCDate(lastMondayDate.getUTCDate() - 7);
  const lastMonday = lastMondayDate.toISOString().slice(0, 10);

  const thisWeek = getWeeklySnapshot(stats, thisMonday);

  // Check if we have any data for last week
  const lastSunday = getSunday(lastMonday);
  const hasLastWeekData = stats.dailyEntries.some(e => e.date >= lastMonday && e.date <= lastSunday);
  const lastWeek = hasLastWeekData ? getWeeklySnapshot(stats, lastMonday) : null;

  return {
    thisWeek,
    lastWeek,
    exercisesTrend: computeTrend(thisWeek.totalExercises, lastWeek?.totalExercises ?? null),
    accuracyTrend: computeTrend(thisWeek.accuracy, lastWeek?.accuracy ?? null),
    errorsTrend: computeErrorTrend(thisWeek.totalErrors, lastWeek?.totalErrors ?? null),
  };
}

/**
 * Record or update a daily activity entry. Trims to 365 days max.
 */
export function recordDailyActivity(
  stats: WeeklyStats,
  date: string,
  activity: Partial<DailyStats>,
): WeeklyStats {
  const existingIndex = stats.dailyEntries.findIndex(e => e.date === date);

  let updatedEntries: DailyStats[];

  if (existingIndex >= 0) {
    // Update existing entry by adding to current values
    const existing = stats.dailyEntries[existingIndex];
    const updated: DailyStats = {
      date,
      exercisesCompleted: existing.exercisesCompleted + (activity.exercisesCompleted ?? 0),
      exercisesCorrect: existing.exercisesCorrect + (activity.exercisesCorrect ?? 0),
      errorsRecorded: existing.errorsRecorded + (activity.errorsRecorded ?? 0),
      timeSpentMinutes: existing.timeSpentMinutes + (activity.timeSpentMinutes ?? 0),
    };
    updatedEntries = [...stats.dailyEntries];
    updatedEntries[existingIndex] = updated;
  } else {
    // Create new entry
    updatedEntries = [
      ...stats.dailyEntries,
      {
        ...emptyDailyStats(date),
        ...activity,
      },
    ];
  }

  // Sort by date and trim to max
  updatedEntries.sort((a, b) => a.date.localeCompare(b.date));
  if (updatedEntries.length > MAX_DAILY_ENTRIES) {
    updatedEntries = updatedEntries.slice(-MAX_DAILY_ENTRIES);
  }

  return { dailyEntries: updatedEntries };
}
