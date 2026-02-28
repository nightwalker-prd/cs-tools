/**
 * Shared types for the @arabtools/data package.
 * These are canonical types used across grammar, vocabulary, and reading data.
 */

// ── Common ──────────────────────────────────────────────────────────

export type Pillar = 'grammar' | 'vocabulary' | 'reading';
export type Difficulty = 'beginner' | 'intermediate' | 'advanced';

// ── Grammar Types (from nahw-navigator) ─────────────────────────────

export interface NahwExample {
  arabic: string;
  translation: string;
  source?: string;
  irab?: string;
}

export interface NahwRule {
  arabic?: string;
  english: string;
  examples?: NahwExample[];
}

export interface NahwTable {
  title: string;
  titleAr?: string;
  headers: string[];
  rows: string[][];
}

export interface LevelContent {
  difficulty: Difficulty;
  summary: string;
  body: string;
  rules?: NahwRule[];
  examples?: NahwExample[];
  tables?: NahwTable[];
  sourceRef?: string;
}

export interface NahwTopic {
  id: string;
  titleAr: string;
  titleEn: string;
  transliteration: string;
  categoryId: string;
  subcategoryId?: string;
  levels: LevelContent[];
  relatedTopicIds: string[];
  tags: string[];
}

export interface NahwSubcategory {
  id: string;
  titleAr: string;
  titleEn: string;
  topicIds: string[];
}

export interface NahwCategory {
  id: string;
  titleAr: string;
  titleEn: string;
  icon: string;
  description: string;
  subcategories: NahwSubcategory[];
}

// ── Grammatical Labels (from tarkeeb) ───────────────────────────────

export interface GrammaticalLabel {
  id: string;
  ar: string;
  en: string;
}

export interface GrammaticalLabels {
  partsOfSpeech: GrammaticalLabel[];
  sentenceTypes: GrammaticalLabel[];
  cases: GrammaticalLabel[];
  roles: GrammaticalLabel[];
  verbs: GrammaticalLabel[];
  pronouns: GrammaticalLabel[];
  kanaAndSisters: GrammaticalLabel[];
  innaAndSisters: GrammaticalLabel[];
  prepositions: GrammaticalLabel[];
  demonstratives: GrammaticalLabel[];
  relatives: GrammaticalLabel[];
  derivedNouns: GrammaticalLabel[];
  nounTypes: GrammaticalLabel[];
  phrasalConstructs: GrammaticalLabel[];
  numbers: GrammaticalLabel[];
  exceptionConstructs: GrammaticalLabel[];
  conditionalParticles: GrammaticalLabel[];
  syntax: GrammaticalLabel[];
  verbForms: GrammaticalLabel[];
  verbTypes: GrammaticalLabel[];
  pluralTypes: GrammaticalLabel[];
  nasbParticles: GrammaticalLabel[];
  jazmParticles: GrammaticalLabel[];
  conjunctions: GrammaticalLabel[];
  negation: GrammaticalLabel[];
  interrogatives: GrammaticalLabel[];
  vocative: GrammaticalLabel[];
  emphasis: GrammaticalLabel[];
  morphologyTerms: GrammaticalLabel[];
  rhetoric: GrammaticalLabel[];
}

// ── Vocabulary Types (from nation-test) ─────────────────────────────

export type FrequencyLevel = '1k' | '2k' | '3k' | '5k' | '10k';

export interface WordExample {
  arabic: string;
  translation: string;
}

export interface WordFamily {
  id: string;
  root: string;
  headword: string;
  headwordVocalized: string;
  meanings: string[];
  partOfSpeech: 'verb' | 'noun' | 'adjective' | 'adverb' | 'particle' | 'preposition';
  level: FrequencyLevel;
  example?: WordExample;
  familyMembers?: string[];
}

// ── Reading Types (from reading app) ────────────────────────────────

export type ReadingLevel = 'beginner' | 'intermediate' | 'advanced';

export interface VocabularyHighlight {
  word: string;
  meaning: string;
}

export interface WordTranslation {
  arabic: string;
  translation: string;
  grammaticalInfo?: string;
}

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

export type ReadingTextSummary = Omit<ReadingText, 'wordByWordTranslation' | 'text' | 'translation'>;
