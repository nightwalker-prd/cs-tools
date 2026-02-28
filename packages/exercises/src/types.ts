export type ExerciseType = 'multiple-choice' | 'fill-blank' | 'trace-output' | 'complexity-match' | 'order-steps' | 'code-fix' | 'diagram-label';

export type ExerciseTag = 'sorting' | 'trees' | 'graphs' | 'dynamic-programming' | 'complexity' | 'recursion' | 'system-design' | 'data-structures' | 'searching' | 'strings' | 'hash-tables' | 'arrays' | 'linked-lists' | 'stacks' | 'queues' | 'heaps' | 'backtracking';

export type Difficulty = 'easy' | 'medium' | 'hard';

export interface ExerciseQuestion {
  id: string;
  type: ExerciseType;
  question: string;
  codeSnippet?: string;
  language?: string;
  options?: string[];
  answer: string | string[];
  explanation: string;
  hints?: string[];
  difficulty: Difficulty;
  tags: ExerciseTag[];
}

export interface ExerciseSet {
  id: string;
  title: string;
  description: string;
  questions: ExerciseQuestion[];
}
