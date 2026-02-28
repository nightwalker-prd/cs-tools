export type Severity = 'mild' | 'moderate' | 'severe';
export type TrendDirection = 'improving' | 'stable' | 'worsening';

export interface BlindSpot {
  category: string;
  wordId: string;
  frequency: number;
  severity: Severity;
  trend: TrendDirection;
  score: number;
  advice: string;
  recentExamples: { expected: string; actual: string; timestamp: number }[];
}

export interface BlindSpotAnalysis {
  spots: BlindSpot[];
  analyzedAt: number;
  totalErrorsAnalyzed: number;
}
