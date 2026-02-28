// Re-export shared exercise types from the exercises package
export type {
  ExerciseQuestion,
  Exercise,
  ExerciseTag,
  ExerciseSection,
  ExerciseUnit,
  UnitMeta,
} from '@arabtools/exercises';

export { TAG_LABELS } from '@arabtools/exercises';

// App-specific types (UI concerns, not shared)

export type ExerciseMode = 'practice' | 'quiz' | 'flashcard';

export type SearchMode = 'title' | 'content';

export interface ProgressData {
  exercisesCompleted: Record<string, { completedAt: number; score: number; bestScore: number }>;
  questionsMastered: Record<string, boolean>;
  lastViewed: { exerciseId: string; timestamp: number } | null;
  streak: { count: number; lastDate: string | null };
}

export interface AudioSettings {
  enabled: boolean;
  autoPlay: boolean;
  rate: number;
}
