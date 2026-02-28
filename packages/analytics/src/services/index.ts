export {
  recordError,
  getWordErrors,
  getErrorsInRange,
  getErrorsByCategory,
} from './error-recorder';

export {
  analyzeMistakes,
} from './mistake-analyzer';
export type { MistakePattern } from './mistake-analyzer';

export {
  analyzeBlindSpots,
} from './blind-spot';

export {
  getWeeklySnapshot,
  getWeeklyComparison,
  recordDailyActivity,
} from './weekly-report';

export {
  computeRetentionBuckets,
  getForgettingSoon,
  computeReviewForecast,
  computeDecayCurve,
  computeSrsInsights,
} from './srs-insights';
