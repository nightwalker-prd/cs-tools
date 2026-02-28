export interface RetentionBucket {
  label: string;
  range: [number, number]; // e.g. [0, 0.2]
  count: number;
  color: string;
}

export interface ForgettingWord {
  itemId: string;
  word: string;
  retrievability: number;
  daysSinceReview: number;
  nextReviewDate: string;
}

export interface ReviewForecast {
  date: string;
  reviewCount: number;
}

export interface DecayCurve {
  dayOffset: number; // 0 = today
  averageRetention: number;
}

export interface SrsInsightsData {
  retentionBuckets: RetentionBucket[];
  forgettingSoon: ForgettingWord[]; // top 10 lowest retrievability
  forecast: ReviewForecast[]; // next 14 days
  decayCurve: DecayCurve[]; // 30 data points
  totalItems: number;
  averageRetention: number;
}
