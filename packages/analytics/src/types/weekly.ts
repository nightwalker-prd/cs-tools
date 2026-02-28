import type { TrendDirection } from './blind-spots';

export interface DailyStats {
  date: string; // ISO date
  exercisesCompleted: number;
  exercisesCorrect: number;
  errorsRecorded: number;
  timeSpentMinutes: number;
}

export interface WeeklySnapshot {
  weekStart: string; // ISO date (Monday)
  weekEnd: string;
  days: DailyStats[];
  totalExercises: number;
  totalCorrect: number;
  totalErrors: number;
  accuracy: number;
  mostActiveDay: string;
  topErrorCategory: string | null;
}

export interface WeeklyComparison {
  thisWeek: WeeklySnapshot;
  lastWeek: WeeklySnapshot | null;
  exercisesTrend: TrendDirection;
  accuracyTrend: TrendDirection;
  errorsTrend: TrendDirection;
}

export interface WeeklyStats {
  dailyEntries: DailyStats[]; // max 365 days
}
