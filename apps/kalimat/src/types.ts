export interface QuranWord {
  id: string;
  ayahNum: number;
  wordNum: number;
  word: string;
  meaning: string;
  transliteration: string;
  root: string;
  lemmaId: number | null;
}

export interface LemmaProgress {
  phase: 'new' | 'learning' | 'review' | 'mastered';
  correctStreak: number;
  totalReviews: number;
  lastReviewed: number;
}

export interface SessionConfig {
  source: 'surah' | 'tier' | 'due';
  surahNum?: number;
  tier?: 1 | 2 | 3 | 4;
  size: 10 | 20 | 30;
  quizTypes: ('flashcard' | 'multiple-choice' | 'context')[];
}

export interface SessionStats {
  totalReviewed: number;
  totalCorrect: number;
  totalMastered: number;
  lastSessionDate: number;
  currentStreak: number;
  bestStreak: number;
  streakLastDate: string;
}

export type Route =
  | { page: 'home' }
  | { page: 'explore' }
  | { page: 'surah-list' }
  | { page: 'surah'; num: number }
  | { page: 'root-browser' }
  | { page: 'root'; root: string }
  | { page: 'frequency'; tier: number }
  | { page: 'lemma'; id: number }
  | { page: 'ayah'; surah: number; ayah: number }
  | { page: 'learn' }
  | { page: 'session' }
  | { page: 'results' }
  | { page: 'word-anatomy'; surah: number; ayah: number; word: number }
  | { page: 'patterns' }
  | { page: 'pattern'; id: number }
  | { page: 'assessment' }
  | { page: 'progress' }
  | { page: 'read'; surahNum: number }
  | { page: 'weak-verbs' }
  | { page: 'similar-words' }
  | { page: 'family-hub' }
  | { page: 'family-tree'; root: string }
  | { page: 'cluster-browser' }
  | { page: 'cluster-detail'; id: string };

// ─── Feature A: Word Anatomy (Transformations) ────────────────────────────
export interface TransformationStep {
  s: number;
  a: string;
  m: string;
  c?: string;
  x?: Record<string, unknown>;
  f?: string;
  wk?: boolean;
  sc?: boolean;
  n?: string;
}

export interface WordTransformations {
  r: string;
  steps: TransformationStep[];
}

export type SurahTransformations = Record<string, WordTransformations>;

// ─── Feature B: Grammar Patterns ──────────────────────────────────────────
export type PatternCategory = 'verb' | 'noun' | 'prefix' | 'suffix' | 'pronoun' | 'plural' | 'other';

export interface GrammarPattern {
  id: number;
  form: string;
  formD: string;
  changeId: string;
  friendlyName: string;
  count: number;
  formDesc: string;
  explanation: string;
  affixes: Record<string, unknown> | null;
  example: { before_word: string; before_meaning: string; after_word: string; after_meaning: string } | null;
  similar: { reason?: string; similarPatternIds?: number[] } | null;
  category: PatternCategory;
}

// ─── Feature C: Root Family Tree ──────────────────────────────────────────
export interface RootBaseForm {
  w: string;
  m: string;
  p?: string;
  pn?: string;
  c: number;
}

export interface RootDerivedForm {
  w: string;
  m: string;
  p?: string;
  s: number;
  c: number;
  ref?: string;
}

export interface RootFamilyData {
  baseForms: RootBaseForm[];
  derivedForms: RootDerivedForm[];
}

// ─── Assessment Result ───────────────────────────────────────────────────
export interface AssessmentResult {
  comprehension: number;
  tierScores: { tier: number; correct: number; total: number }[];
  knownLemmaIds: number[];
}

// ─── Morpheme Data ──────────────────────────────────────────────────────
export interface MorphemeData {
  w: string;
  m: string;
  p: Record<string, string[]>;
}

// ─── Corpus Morphology (from Kalaam DB) ──────────────────────────────────────
export interface CorpusMorpheme {
  loc: string;    // e.g. "1:2:1:1"
  ar: string;     // Arabic piece, e.g. "ٱلْ"
  pos: string;    // Part of speech, e.g. "P" or "N"
  vf: string;     // Verb form, e.g. "VF:4" or ""
  gr: string;     // Grammar tags, e.g. "ROOT:حمد|LEM:حَمْد|M|NOM"
  root: string;   // Root, e.g. "حمد"
  lemma: string;  // Lemma, e.g. "حَمْد"
}

export type WordCorpus = CorpusMorpheme[];
export type SurahCorpus = Record<string, WordCorpus>;

// ─── Weak Verb Trainer ───────────────────────────────────────────────────
export type WeakVerbType = 'hollow' | 'defective' | 'assimilated' | 'doubly-weak';

export interface WeakVerbEntry {
  root: string;
  form: string;
  changeId: string;
  type: WeakVerbType;
  weakPos: number[];
  before: string;
  after: string;
  meaning: string;
  note: string;
  ref: string;
  count: number;
}

// ─── Feature D: Phrase-Level Reading ──────────────────────────────────────
export interface PhraseGroup {
  wordIndices: number[];
  label?: string;
}

export interface AyahPhraseMapping {
  ayahNum: number;
  phrases: PhraseGroup[];
}
