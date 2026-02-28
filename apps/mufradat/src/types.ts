import type { FrequencyLevel } from '@arabtools/data';

// ─── Navigator types ───

export type ViewMode = 'browse' | 'study';

export interface VocabPosGroup {
  id: string;           // e.g. "1k-noun"
  pos: string;          // e.g. "noun"
  posAr: string;        // e.g. "اسم"
  bandId: string;       // e.g. "1k"
  wordIds: string[];    // word IDs in this group
}

export interface VocabBand {
  id: string;           // "1k"
  titleEn: string;      // "Top 1,000"
  titleAr: string;      // "الألف الأولى"
  description: string;  // "Most frequent words..."
  color: string;        // CSS color for the band
  posGroups: VocabPosGroup[];
}

// ─── Session types (kept from original) ───

export type Screen = 'dashboard' | 'config' | 'session' | 'results';

export interface MufradatSessionConfig {
  levels: FrequencyLevel[];
  sessionSize: number;
  newWordsPerSession: number;
}

export interface BandStats {
  total: number;
  newCount: number;
  learning: number;
  review: number;
  mastered: number;
}

export type BandStatsMap = Record<FrequencyLevel, BandStats>;

export interface SessionResultData {
  totalReviewed: number;
  correct: number;
  accuracy: number;
  newLearned: number;
  againCount: number;
  hardCount: number;
  goodCount: number;
  easyCount: number;
}

/** Question type escalation based on reps */
export type VocabQuestionType = 'flashcard' | 'multiple-choice' | 'type-answer';
