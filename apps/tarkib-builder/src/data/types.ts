/** A single word component available in the word bank */
export interface WordComponent {
  id: string;
  word: string;
  wordClean: string;
  translation: string;
  wordType: 'noun' | 'verb' | 'particle' | 'adjective' | 'pronoun' | 'demonstrative' | 'number';
  gender?: 'masculine' | 'feminine';
  number?: 'singular' | 'dual' | 'plural';
  definiteness?: 'definite' | 'indefinite';
  case?: 'marfu' | 'mansub' | 'majrur' | 'mabni';
  isDistractor?: boolean;
}

/** A slot in the construction workspace */
export interface ConstructionSlot {
  id: string;
  label: string;
  labelEn: string;
  expectedWordId: string;
  color: string;
}

/** Structural validation rule */
export interface ValidationRule {
  id: string;
  description: string;
  descriptionAr: string;
  check: 'correct-word' | 'agreement-ding' | 'agreement-irab' | 'case-majrur' | 'no-al-tanwin' | 'order';
  slots: string[];
  errorMessage: string;
  errorMessageAr: string;
}

export type PhraseType =
  | 'possessive'
  | 'descriptive'
  | 'prepositional'
  | 'demonstrative'
  | 'conjunctive'
  | 'appositive'
  | 'number'
  | 'nominal-sentence'
  | 'verbal-sentence'
  | 'kana-sentence'
  | 'inna-sentence'
  | 'nested'
  | 'hal'
  | 'tamyiz'
  | 'maful-bihi'
  | 'naib-fail'
  | 'maful-mutlaq'
  | 'maful-li-ajlihi'
  | 'zarf'
  | 'istithna'
  | 'nida'
  | 'shart'
  | 'mawsul';

export const PHRASE_TYPE_LABELS: Record<PhraseType, { ar: string; en: string }> = {
  possessive: { ar: 'التركيب الإضافي', en: 'Possessive (Idafa)' },
  descriptive: { ar: 'التركيب الوصفي', en: 'Descriptive (Na\'t)' },
  prepositional: { ar: 'شبه الجملة', en: 'Prepositional' },
  demonstrative: { ar: 'التركيب الإشاري', en: 'Demonstrative' },
  conjunctive: { ar: 'التركيب العطفي', en: 'Conjunctive' },
  appositive: { ar: 'التركيب البدلي', en: 'Appositive' },
  number: { ar: 'التركيب العددي', en: 'Number' },
  'nominal-sentence': { ar: 'الجملة الاسمية', en: 'Nominal Sentence' },
  'verbal-sentence': { ar: 'الجملة الفعلية', en: 'Verbal Sentence' },
  'kana-sentence': { ar: 'كان وأخواتها', en: 'Kana & Sisters' },
  'inna-sentence': { ar: 'إنّ وأخواتها', en: 'Inna & Sisters' },
  nested: { ar: 'تراكيب مركّبة', en: 'Nested Phrases' },
  hal: { ar: 'الحال', en: 'Hal (Adverbial State)' },
  tamyiz: { ar: 'التمييز', en: 'Tamyiz (Specification)' },
  'maful-bihi': { ar: 'المفعول به', en: "Maf'ul bihi (Direct Object)" },
  'naib-fail': { ar: 'نائب الفاعل', en: "Na'ib al-Fa'il (Passive Subject)" },
  'maful-mutlaq': { ar: 'المفعول المطلق', en: "Maf'ul Mutlaq (Absolute Object)" },
  'maful-li-ajlihi': { ar: 'المفعول لأجله', en: "Maf'ul li-Ajlihi (Object of Purpose)" },
  zarf: { ar: 'الظرف', en: 'Zarf (Adverb of Time/Place)' },
  istithna: { ar: 'الاستثناء', en: 'Istithna (Exception)' },
  nida: { ar: 'النداء', en: 'Nida (Vocative)' },
  shart: { ar: 'الشرط', en: 'Shart (Conditional)' },
  mawsul: { ar: 'الموصول', en: 'Mawsul (Relative Clause)' },
};

/** A single construction exercise */
export interface TarkibExercise {
  id: string;
  phraseType: PhraseType;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  targetPhrase: string;
  targetTranslation: string;
  wordBank: WordComponent[];
  slots: ConstructionSlot[];
  validationRules: ValidationRule[];
  hint?: string;
  hintAr?: string;
  explanation: string;
  explanationAr: string;
  agreementType: 'ding' | 'irab-only' | 'none' | 'varies';
}

/** Result of checking one slot */
export interface SlotResult {
  slotId: string;
  isCorrect: boolean;
  errorMessage?: string;
  errorMessageAr?: string;
}

/** Overall exercise result */
export interface ExerciseResult {
  exerciseId: string;
  slotResults: SlotResult[];
  allCorrect: boolean;
  score: number;
  attempts: number;
  timeSpent: number;
  hintsUsed: boolean;
}

/** Progress tracking */
export interface TarkibProgress {
  completed: Record<string, { score: number; attempts: number; bestTime?: number }>;
  totalScore: number;
  lastPracticed: string;
}

/** Settings for the tarkib builder */
export interface TarkibSettings {
  showDiacritics: boolean;
  difficulty: 'all' | 'beginner' | 'intermediate' | 'advanced';
}

/** App phase */
export type AppPhase = 'browse' | 'exercise' | 'results';
