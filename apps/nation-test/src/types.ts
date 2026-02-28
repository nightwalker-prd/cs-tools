/**
 * Types for Paul Nation's Vocabulary Testing Methodology
 *
 * Based on Nation's research on vocabulary size testing, including:
 * - Vocabulary Size Test (VST): Estimates total vocabulary knowledge
 * - Vocabulary Levels Test (VLT): Tests specific frequency bands
 * - Yes/No Test: Quick assessment with pseudowords
 * - Productive Vocabulary Levels Test: Tests recall ability
 *
 * References:
 * - Nation, I.S.P. (2001). Learning Vocabulary in Another Language
 * - Nation, I.S.P. & Beglar, D. (2007). A vocabulary size test
 */

/** Frequency level bands (word families per 1000) */
export type FrequencyLevel = '1k' | '2k' | '3k' | '5k' | '10k';

/** Quranic frequency tiers based on lemma rank */
export type QuranicFrequencyTier = 'q100' | 'q300' | 'q600' | 'q1000' | 'q_all';

/** Test type based on Nation's methodologies */
export type TestType =
  | 'vst' // Vocabulary Size Test
  | 'vlt' // Vocabulary Levels Test
  | 'yesno' // Yes/No Test with pseudowords
  | 'productive' // Productive Vocabulary Test
  | 'sentence' // Sentence Comprehension Test
  | 'sentence_production' // Sentence Production Test
  | 'collocation' // Word Collocation Test
  | 'root_pattern' // Root-Pattern Recognition Test
  | 'translation' // Translation Test
  | 'reading_comprehension' // Reading Comprehension Test
  | 'verb_conjugation' // Verb Conjugation Test
  | 'cloze' // Cloze (Fill-in-the-blank) Test
  | 'diacritics' // Diacritics (Tashkeel) Test
  | 'irab' // I'rab (Case Endings) Test
  | 'word_derivation' // Word Derivation Test
  | 'morphological_analysis' // Morphological Analysis Test
  | 'verb_form_id' // Verb Form Identification Test
  | 'idiomatic' // Idiomatic Expressions Test
  | 'word_family' // Word Family Test
  | 'quranic' // Quranic/Classical Vocabulary Test
  | 'synonyms_antonyms' // Synonyms and Antonyms Test
  | 'negation' // Negation Patterns Test
  | 'preposition' // Preposition Usage Test
  | 'question_words' // Question Words Test
  | 'relative_clause' // Relative Clauses Test
  | 'spelling' // Spelling/Orthography Test
  | 'demonstrative' // Demonstratives Test
  | 'possessive' // Possessive Pronouns Test
  | 'quranic_vst' // Quranic Frequency VST
  | 'ayah_context' // Ayah Context Cloze
  | 'morph_chain' // Morphological Chain
  | 'grammar_tag'; // Grammar Tag Identification

/** Knowledge type being tested */
export type KnowledgeType = 'receptive' | 'productive';

/** Word family entry for Arabic vocabulary */
export interface WordFamily {
  id: string;
  /** Arabic root (3 or 4 letters) */
  root: string;
  /** Headword (most common form) */
  headword: string;
  /** Headword with diacritics */
  headwordVocalized: string;
  /** English meaning(s) */
  meanings: string[];
  /** Part of speech */
  partOfSpeech: 'verb' | 'noun' | 'adjective' | 'adverb' | 'particle' | 'preposition';
  /** Frequency level */
  level: FrequencyLevel;
  /** Example sentence */
  example?: {
    arabic: string;
    translation: string;
  };
  /** Related words in the same family */
  familyMembers?: string[];
}

/** A single test item for VST/VLT format */
export interface MultipleChoiceItem {
  id: string;
  /** The word being tested */
  targetWord: string;
  /** Target word with diacritics */
  targetWordVocalized: string;
  /** Correct meaning */
  correctMeaning: string;
  /** Distractor options (incorrect meanings) */
  distractors: string[];
  /** Frequency level of the word */
  level: FrequencyLevel;
  /** Optional context sentence */
  context?: string;
}

/** A single test item for Yes/No format */
export interface YesNoItem {
  id: string;
  /** The word to judge */
  word: string;
  /** Whether this is a real word or pseudoword */
  isReal: boolean;
  /** If real, the meaning */
  meaning?: string;
  /** Frequency level (only for real words) */
  level?: FrequencyLevel;
}

/** A single test item for Productive format */
export interface ProductiveItem {
  id: string;
  /** The definition/prompt */
  definition: string;
  /** First letter(s) as hint */
  hint: string;
  /** The correct answer */
  correctAnswer: string;
  /** Alternative acceptable answers */
  alternatives?: string[];
  /** Frequency level */
  level: FrequencyLevel;
  /** Context sentence with blank */
  contextSentence?: string;
}

/** Test configuration */
export interface TestConfig {
  /** Type of test */
  type: TestType;
  /** Which frequency levels to include */
  levels: FrequencyLevel[];
  /** Number of items per level */
  itemsPerLevel: number;
  /** Whether to shuffle items */
  shuffle: boolean;
  /** Time limit in seconds (0 = no limit) */
  timeLimit: number;
  /** Whether to show feedback after each item */
  showImmediateFeedback: boolean;
}

/** User's response to a test item */
export interface TestResponse {
  itemId: string;
  /** User's answer */
  answer: string | boolean;
  /** Whether the answer was correct */
  isCorrect: boolean;
  /** Time taken in milliseconds */
  responseTime: number;
}

/** Base interface for all test items */
export interface BaseTestItem {
  id: string;
  level?: FrequencyLevel;
}

/** Test session state */
export interface TestSession {
  id: string;
  config: TestConfig;
  startTime: number;
  endTime?: number;
  currentItemIndex: number;
  responses: TestResponse[];
  /** Current test items (could be any type) */
  items: BaseTestItem[];
}

/** Test results with Nation's scoring methodology */
export interface TestResults {
  sessionId: string;
  testType: TestType;
  /** Raw score (correct / total) */
  rawScore: {
    correct: number;
    total: number;
    percentage: number;
  };
  /** Score breakdown by level */
  levelScores: Record<
    FrequencyLevel,
    {
      correct: number;
      total: number;
      percentage: number;
    }
  >;
  /**
   * Estimated vocabulary size (for VST)
   * Based on Nation's formula: score × multiplier per level
   */
  estimatedVocabularySize?: number;
  /** Corrected score for Yes/No tests (accounts for false alarms on pseudowords) */
  correctedScore?: {
    rawPercentage: number;
    correctedPercentage: number;
  };
  /** Average response time */
  averageResponseTime: number;
  /** Test duration in seconds */
  duration: number;
  /** Items that were answered incorrectly */
  incorrectItems: string[];
  /** Timestamp */
  completedAt: number;
}

/** Historical results for tracking progress */
export interface TestHistory {
  results: TestResults[];
}

/**
 * Nation's Vocabulary Size Estimation
 *
 * For a well-designed VST with items sampled from different
 * frequency levels, the estimated vocabulary size is calculated as:
 *
 * Each correct item at level X represents knowledge of
 * (1000 / items_per_level) word families at that level.
 *
 * Total = Σ (correct_at_level × multiplier_per_level)
 */
export function calculateVocabularySize(
  levelScores: Record<FrequencyLevel, { correct: number; total: number }>,
  itemsPerLevel: number
): number {
  const levelMultipliers: Record<FrequencyLevel, number> = {
    '1k': 1000,
    '2k': 1000,
    '3k': 1000,
    '5k': 2000,
    '10k': 5000,
  };

  // Guard against division by zero
  if (itemsPerLevel <= 0) {
    return 0;
  }

  let total = 0;
  for (const [level, score] of Object.entries(levelScores)) {
    const multiplier = levelMultipliers[level as FrequencyLevel];
    // Each correct item represents (multiplier / itemsPerLevel) word families
    total += (score.correct / itemsPerLevel) * multiplier;
  }

  return Math.round(total);
}

/**
 * Yes/No Test Scoring with Pseudoword Correction
 *
 * Nation recommends correcting for guessing in Yes/No tests:
 * Corrected Score = (Hits - False Alarms) / (1 - False Alarm Rate)
 *
 * Where:
 * - Hits = correct "yes" responses to real words
 * - False Alarms = incorrect "yes" responses to pseudowords
 */
export function calculateYesNoScore(
  realWordHits: number,
  realWordTotal: number,
  pseudowordFalseAlarms: number,
  pseudowordTotal: number
): { rawPercentage: number; correctedPercentage: number } {
  // Guard against division by zero
  if (realWordTotal <= 0 || pseudowordTotal <= 0) {
    return { rawPercentage: 0, correctedPercentage: 0 };
  }

  const hitRate = realWordHits / realWordTotal;
  const falseAlarmRate = pseudowordFalseAlarms / pseudowordTotal;

  // Raw percentage (hits only)
  const rawPercentage = hitRate * 100;

  // Corrected percentage using Nation's formula
  // Handles edge case where false alarm rate = 1
  const correctedPercentage =
    falseAlarmRate >= 1
      ? 0
      : ((hitRate - falseAlarmRate) / (1 - falseAlarmRate)) * 100;

  return {
    rawPercentage: Math.round(rawPercentage * 10) / 10,
    correctedPercentage: Math.max(0, Math.round(correctedPercentage * 10) / 10),
  };
}
