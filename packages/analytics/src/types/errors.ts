export type ErrorCategory =
  | 'vocabulary-confusion'
  | 'grammar-error'
  | 'case-ending'
  | 'gender-agreement'
  | 'verb-conjugation'
  | 'word-order';

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
