// Types
export type {
  ErrorCategory,
  ErrorEntry,
  WordErrorRecord,
  ErrorStore,
  Severity,
  TrendDirection,
  BlindSpot,
  BlindSpotAnalysis,
  DailyStats,
  WeeklySnapshot,
  WeeklyComparison,
  WeeklyStats,
  RetentionBucket,
  ForgettingWord,
  ReviewForecast,
  DecayCurve,
  SrsInsightsData,
} from './types';

// Services
export {
  recordError,
  getWordErrors,
  getErrorsInRange,
  getErrorsByCategory,
  analyzeMistakes,
  analyzeBlindSpots,
  getWeeklySnapshot,
  getWeeklyComparison,
  recordDailyActivity,
  computeRetentionBuckets,
  getForgettingSoon,
  computeReviewForecast,
  computeDecayCurve,
  computeSrsInsights,
} from './services';
export type { MistakePattern } from './services';

// Storage
export {
  loadErrorStore,
  saveErrorStore,
  loadWeeklyStats,
  saveWeeklyStats,
  clearAllAnalyticsData,
} from './storage';

// Hooks
export {
  useMistakePatterns,
  useBlindSpots,
  useWeeklyReport,
  useSrsInsights,
  useStreakCalendar,
} from './hooks';
