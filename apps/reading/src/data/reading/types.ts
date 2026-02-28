// src/data/reading/types.ts

/**
 * Word-by-word translation entry
 */
export interface WordTranslation {
  arabic: string;
  translation: string;
  grammaticalInfo?: string;
}

/**
 * Vocabulary highlight entry
 */
export interface VocabularyHighlight {
  word: string;
  meaning: string;
}

/**
 * Reading text difficulty level
 */
export type ReadingLevel = 'beginner' | 'intermediate' | 'advanced';

/**
 * Complete reading text with all fields
 */
export interface ReadingText {
  id: string;
  title: string;
  titleAr: string;
  level: ReadingLevel;
  category: string;
  categoryAr: string;
  text: string;
  translation: string;
  grammaticalConcepts: string[];
  vocabularyHighlights: VocabularyHighlight[];
  moralLesson: string;
  moralLessonAr: string;
  wordCount: number;
  wordByWordTranslation?: WordTranslation[];
}

/**
 * Reading text without word-by-word (for list views)
 */
export type ReadingTextSummary = Omit<ReadingText, 'wordByWordTranslation' | 'text' | 'translation'>;
