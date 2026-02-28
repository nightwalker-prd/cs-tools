/**
 * Tarjama — Translation Drill Engine types.
 *
 * Each card presents an English sentence and expects the student to
 * produce the Arabic translation from memory. Self-rated with FSRS.
 */

export interface TranslationCard {
  /** Unique card identifier */
  id: string;
  /** English prompt shown to the student */
  english: string;
  /** Model Arabic answer with full diacritics */
  modelArabic: string;
  /** Model Arabic answer without diacritics (for display comparison) */
  modelArabicClean: string;
  /** Acceptable alternate translations */
  alternates?: string[];
  /** Nahw topic IDs from the 43-topic prerequisite graph */
  nahwTopics: string[];
  /** Difficulty tier */
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  /** Content source */
  source: 'fstu' | 'quran' | 'hadith' | 'custom';
  /** Optional hint shown before revealing answer */
  hint?: string;
}

/** Filters for browsing the card deck */
export interface DeckFilters {
  difficulty: 'all' | 'beginner' | 'intermediate' | 'advanced';
  source: 'all' | 'fstu' | 'quran' | 'hadith' | 'custom';
  nahwTopic: string | 'all';
}

/** App-level view state */
export type AppView = 'dashboard' | 'drill' | 'browse' | 'backTranslation' | 'btExercise';

/** Back-translation passage for Arabic→English→Arabic reconstruction */
export interface BackTranslationPassage {
  id: string;
  title: string;
  titleArabic: string;
  arabic: string;
  arabicClean: string;
  source: 'quran' | 'hadith' | 'prose' | 'grammar';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  wordCount: number;
  referenceTranslation?: string;
  notes?: string;
}

export type SelfRating = 'perfect' | 'close' | 'partial' | 'needs-work';

export interface BackTranslationAttempt {
  passageId: string;
  date: string;
  rating: SelfRating;
  englishTranslation: string;
  arabicReconstruction: string;
}

/** Per-card progress tracked locally */
export interface CardProgress {
  cardId: string;
  lastAttempt: string;
  timesReviewed: number;
  lastRating: 0 | 1 | 2 | 3;
}

/** Persisted app settings */
export interface TarjamaSettings {
  showHints: boolean;
  autoPlayTts: boolean;
  deckFilters: DeckFilters;
}

export const DEFAULT_SETTINGS: TarjamaSettings = {
  showHints: false,
  autoPlayTts: false,
  deckFilters: {
    difficulty: 'all',
    source: 'all',
    nahwTopic: 'all',
  },
};
