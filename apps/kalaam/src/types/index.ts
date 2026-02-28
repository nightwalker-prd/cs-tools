// Surah index (meta/surah-index.json)
export interface SurahIndex {
  surahNum: number;
  arabic: string;
  english: string;
  transliteration: string;
  ayahCount: number;
}

// Lemma index (meta/lemma-index.json)
export interface LemmaIndexEntry {
  id: number;
  lemma: string;
  count: number;
  isParticle: boolean;
  meaning: string;
  transliteration: string;
}

// Surah data (quran/{surahNum}.json)
export interface SurahData {
  surahNum: number;
  name: { arabic: string; english: string; transliteration: string };
  ayahs: AyahData[];
}

export interface AyahData {
  ayahNum: number;
  arabic: string;
  translation: string;
  words: WordData[];
}

export interface WordData {
  wordLoc: string;
  arabic: string;
  parts: WordPart[];
  translation: string;
  transliteration: string;
}

export interface WordPart {
  arabic: string;
  partOfSpeech: string;
  grammar: string;
  grammarColor: string;
  grammarDesc: string;
  root: string;
  lemma: string;
  lemmaId: number;
}

// Word batch (words/batch-{n}.json)
export interface WordBatchItem {
  lemmaId: number;
  lemma: string;
  meaning: string;
  transliteration: string;
  info: string;
  count: number;
  root: string;
  partOfSpeech: string;
  isParticle: boolean;
  bestExample: { wordLoc: string; arabic: string; surahNum: number; ayahNum: number };
  contextTranslation: { textBefore: string; match: string; textAfter: string };
  quiz: { correctAnswer: string; wrongChoices: string[] };
}

// Grammar data (grammar/{lemmaId}.json)
export interface GrammarData {
  lemmaId: number;
  lemma: string;
  root: string;
  partOfSpeech: string;
  verbForm: string;
  transformations: Transformation[];
  derivedForms: DerivedForm[];
}

export interface Transformation {
  step: number;
  arabic: string;
  meaning: string;
  notes: string;
  colorCoding: Record<string, string> | null;
  form: string;
  formD: string;
  changeIdentifier: string;
  parentFormId: number;
}

export interface DerivedForm {
  arabic: string;
  meaning: string;
  grammarTag: string;
  grammarDesc: string;
  grammarColor: string;
  count: number;
  examples: DerivedFormExample[];
}

export interface DerivedFormExample {
  surahNum: number;
  ayahNum: number;
  wordLoc: string;
  ayahArabic: string;
  ayahTranslation: string;
}

// Meta types
export interface ParentForm {
  id: number;
  form: string;
  formD: string;
  meaningChange: string;
  friendlyName: string;
  explanation: string;
  example: string;
}

export interface GrammarTag {
  tag: string;
  color: string;
  description: string;
  friendlyDesc: string;
}

export interface GrammarTranslation {
  tag: string;
  translation: string;
}

export interface Particle {
  lemma: string;
  translation: string;
}
