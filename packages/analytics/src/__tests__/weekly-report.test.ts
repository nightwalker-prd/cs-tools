import { describe, it, expect } from 'vitest';
import { getWeeklySnapshot, getWeeklyComparison, recordDailyActivity } from '../services/weekly-report';
import type { WeeklyStats } from '../types/weekly';

function emptyStats(): WeeklyStats {
  return { dailyEntries: [] };
}

describe('getWeeklySnapshot', () => {
  it('returns 7 days for any given week', () => {
    const stats = emptyStats();
    // 2026-02-23 is a Monday
    const result = getWeeklySnapshot(stats, '2026-02-23');
    expect(result.days).toHaveLength(7);
    expect(result.weekStart).toBe('2026-02-23');
    expect(result.weekEnd).toBe('2026-03-01');
  });

  it('computes totals from daily entries', () => {
    const stats: WeeklyStats = {
      dailyEntries: [
        { date: '2026-02-23', exercisesCompleted: 10, exercisesCorrect: 8, errorsRecorded: 2, timeSpentMinutes: 30 },
        { date: '2026-02-24', exercisesCompleted: 5, exercisesCorrect: 4, errorsRecorded: 1, timeSpentMinutes: 15 },
      ],
    };

    const result = getWeeklySnapshot(stats, '2026-02-23');
    expect(result.totalExercises).toBe(15);
    expect(result.totalCorrect).toBe(12);
    expect(result.totalErrors).toBe(3);
    expect(result.accuracy).toBeCloseTo(0.8);
  });

  it('finds the most active day', () => {
    const stats: WeeklyStats = {
      dailyEntries: [
        { date: '2026-02-23', exercisesCompleted: 5, exercisesCorrect: 4, errorsRecorded: 1, timeSpentMinutes: 15 },
        { date: '2026-02-25', exercisesCompleted: 20, exercisesCorrect: 18, errorsRecorded: 2, timeSpentMinutes: 60 },
      ],
    };

    const result = getWeeklySnapshot(stats, '2026-02-23');
    expect(result.mostActiveDay).toBe('2026-02-25');
  });

  it('handles week with no data', () => {
    const stats = emptyStats();
    const result = getWeeklySnapshot(stats, '2026-02-23');
    expect(result.totalExercises).toBe(0);
    expect(result.accuracy).toBe(0);
  });

  it('normalizes to Monday when given a mid-week date', () => {
    const stats = emptyStats();
    // 2026-02-25 is a Wednesday
    const result = getWeeklySnapshot(stats, '2026-02-25');
    expect(result.weekStart).toBe('2026-02-23');
  });
});

describe('getWeeklyComparison', () => {
  it('returns null for lastWeek when no prior data exists', () => {
    const stats = emptyStats();
    const result = getWeeklyComparison(stats, '2026-02-25');
    expect(result.lastWeek).toBeNull();
  });

  it('compares this week vs last week', () => {
    const stats: WeeklyStats = {
      dailyEntries: [
        // Last week (Mon 2026-02-16)
        { date: '2026-02-16', exercisesCompleted: 5, exercisesCorrect: 3, errorsRecorded: 2, timeSpentMinutes: 15 },
        // This week (Mon 2026-02-23)
        { date: '2026-02-23', exercisesCompleted: 10, exercisesCorrect: 8, errorsRecorded: 1, timeSpentMinutes: 30 },
      ],
    };

    const result = getWeeklyComparison(stats, '2026-02-25');
    expect(result.thisWeek.totalExercises).toBe(10);
    expect(result.lastWeek).not.toBeNull();
    expect(result.lastWeek!.totalExercises).toBe(5);
    expect(result.exercisesTrend).toBe('improving');
    expect(result.errorsTrend).toBe('improving'); // fewer errors
  });

  it('detects worsening accuracy', () => {
    const stats: WeeklyStats = {
      dailyEntries: [
        // Last week: 90% accuracy
        { date: '2026-02-16', exercisesCompleted: 10, exercisesCorrect: 9, errorsRecorded: 1, timeSpentMinutes: 30 },
        // This week: 50% accuracy
        { date: '2026-02-23', exercisesCompleted: 10, exercisesCorrect: 5, errorsRecorded: 5, timeSpentMinutes: 30 },
      ],
    };

    const result = getWeeklyComparison(stats, '2026-02-25');
    expect(result.accuracyTrend).toBe('worsening');
  });
});

describe('recordDailyActivity', () => {
  it('adds a new entry', () => {
    const stats = emptyStats();
    const result = recordDailyActivity(stats, '2026-02-25', {
      exercisesCompleted: 10,
      exercisesCorrect: 8,
    });

    expect(result.dailyEntries).toHaveLength(1);
    expect(result.dailyEntries[0].date).toBe('2026-02-25');
    expect(result.dailyEntries[0].exercisesCompleted).toBe(10);
  });

  it('accumulates values for existing date', () => {
    let stats: WeeklyStats = {
      dailyEntries: [
        { date: '2026-02-25', exercisesCompleted: 5, exercisesCorrect: 4, errorsRecorded: 1, timeSpentMinutes: 15 },
      ],
    };

    stats = recordDailyActivity(stats, '2026-02-25', {
      exercisesCompleted: 3,
      exercisesCorrect: 2,
    });

    expect(stats.dailyEntries).toHaveLength(1);
    expect(stats.dailyEntries[0].exercisesCompleted).toBe(8);
    expect(stats.dailyEntries[0].exercisesCorrect).toBe(6);
  });

  it('sorts entries by date', () => {
    let stats = emptyStats();
    stats = recordDailyActivity(stats, '2026-02-25', { exercisesCompleted: 5 });
    stats = recordDailyActivity(stats, '2026-02-20', { exercisesCompleted: 3 });
    stats = recordDailyActivity(stats, '2026-02-22', { exercisesCompleted: 7 });

    expect(stats.dailyEntries[0].date).toBe('2026-02-20');
    expect(stats.dailyEntries[1].date).toBe('2026-02-22');
    expect(stats.dailyEntries[2].date).toBe('2026-02-25');
  });

  it('trims to 365 entries max', () => {
    const entries = [];
    for (let i = 0; i < 366; i++) {
      const d = new Date('2025-01-01');
      d.setDate(d.getDate() + i);
      entries.push({
        date: d.toISOString().slice(0, 10),
        exercisesCompleted: 1,
        exercisesCorrect: 1,
        errorsRecorded: 0,
        timeSpentMinutes: 5,
      });
    }
    const stats: WeeklyStats = { dailyEntries: entries };

    const result = recordDailyActivity(stats, '2026-02-01', { exercisesCompleted: 1 });
    expect(result.dailyEntries.length).toBeLessThanOrEqual(365);
  });
});
