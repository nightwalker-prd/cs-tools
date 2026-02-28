export type ErrorCategory =
  | 'off-by-one'
  | 'wrong-complexity'
  | 'incorrect-base-case'
  | 'missing-edge-case'
  | 'wrong-data-structure'
  | 'logic-error'
  | 'syntax-error'
  | 'wrong-algorithm';

export interface ErrorEntry {
  id: string;
  wordId: string;
  category: ErrorCategory;
  expected: string;
  actual: string;
  sourceApp: string;
  timestamp: number;
}

export interface WordErrorRecord {
  wordId: string;
  totalErrors: number;
  categories: Partial<Record<ErrorCategory, number>>;
  lastErrorAt: number;
  firstErrorAt: number;
}

export interface ErrorStore {
  entries: ErrorEntry[]; // max 2000
  wordAggregates: Record<string, WordErrorRecord>;
}
