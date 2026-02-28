/** Derivative type being tested */
export type DerivativeType = 'masdar' | 'ism-fail' | 'ism-maful';

/** Verb form (Roman numeral I-X) */
export type VerbForm = 'I' | 'II' | 'III' | 'IV' | 'V' | 'VI' | 'VII' | 'VIII' | 'IX' | 'X';

/** Root type classification */
export type RootType =
  | 'Regular'
  | 'Mithal'
  | 'Ajwaf'
  | 'Naqis'
  | "Mudaa'af"
  | 'Mahmooz'
  | 'Lafif';

/** A single verb entry with all three derivatives */
export interface VerbDerivativeEntry {
  id: string;
  root: string;
  rootLetters: string;
  verbForm: VerbForm;
  rootType: RootType;
  pastTense: string;
  presentTense: string;
  masdar: string;
  masdarPattern: string;
  ismFail: string;
  ismFailPattern: string;
  ismMaful: string;
  ismMafulPattern: string;
  meaning: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  notes?: string;
  hasPassive: boolean;
}

/** Exercise mode */
export type ExerciseMode = 'produce';

/** A single drill question */
export interface DrillQuestion {
  verb: VerbDerivativeEntry;
  questionType: DerivativeType;
}

/** User's answer for validation */
export interface DrillAnswer {
  questionId: string;
  userInput: string;
  isCorrect: boolean;
  correctAnswer: string;
  timeSpent: number;
}

/** Drill configuration */
export interface DrillConfig {
  derivativeTypes: DerivativeType[];
  exerciseMode: ExerciseMode;
  selectedForms: VerbForm[];
  selectedRootTypes: RootType[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  drillSize: number;
  showDiacritics: boolean;
}

/** Drill session state */
export type DrillPhase = 'config' | 'drilling' | 'results';
