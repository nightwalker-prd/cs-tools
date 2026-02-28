/** Pronoun-keyed conjugation forms (e.g., { "هُوَ": "كَتَبَ", "هِيَ": "كَتَبَتْ" }) */
export type PronounForms = Record<string, string>;

/** Participle inflection forms by gender/number */
export interface ParticipleInflections {
  ms?: string; // masculine singular
  md?: string; // masculine dual
  mp?: string; // masculine plural
  fs?: string; // feminine singular
  fd?: string; // feminine dual
  fp?: string; // feminine plural
}

/** Present tense with three moods */
export interface PresentConjugation {
  indicative: PronounForms;
  subjunctive: PronounForms;
  jussive: PronounForms;
}

/** Full conjugation data for a single verb */
export interface VerbConjugation {
  past_active: PronounForms;
  past_passive: PronounForms;
  present_active: PresentConjugation;
  present_passive: PresentConjugation;
  imperative: PronounForms;
  prohibition: PronounForms;
  active_participle: ParticipleInflections;
  passive_participle: ParticipleInflections;
}

/** Validation stats from cross-validation */
export interface ValidationStats {
  exact_match: number;
  diacritics_differ: number;
  disagree: number;
  camelmorph_only: number;
  qutrub_only: number;
  disagreement_count: number;
}

/** A single verb entry in conjugations.json */
export interface VerbEntry {
  id: string;
  lemma: string;
  root: string;
  verb_type: string;
  verb_form: string;
  meaning: string;
  masdar: string;
  conjugation: VerbConjugation;
  validation: ValidationStats;
}

/** Root structure of conjugations.json */
export interface ConjugationsData {
  version: string;
  generated_at: string;
  verb_count: number;
  verbs: VerbEntry[];
}

/** Compat format matching existing ConjugationData interface */
export interface ConjugationDataCompat {
  activePast: PronounForms;
  activePresent: {
    marfoo: PronounForms;
    mansoob: PronounForms;
    majzoom: PronounForms;
  };
  passivePast: PronounForms;
  passivePresent: {
    marfoo: PronounForms;
    mansoob: PronounForms;
    majzoom: PronounForms;
  };
  imperative: PronounForms;
  prohibition: string;
  activeParticiple: string;
  passiveParticiple: string;
}

/** Pronoun info for display */
export interface PronounInfo {
  id: string;
  arabic: string;
  english: string;
}

/** All 15 grammatical persons */
export const PRONOUNS: PronounInfo[] = [
  { id: 'هُوَ', arabic: 'هُوَ', english: 'He (3ms)' },
  { id: 'هِيَ', arabic: 'هِيَ', english: 'She (3fs)' },
  { id: 'هُمَا_مُذَكَّر', arabic: 'هُمَا (مُذَكَّر)', english: 'They two (3md)' },
  { id: 'هُمَا_مُؤَنَّث', arabic: 'هُمَا (مُؤَنَّث)', english: 'They two (3fd)' },
  { id: 'هُمْ', arabic: 'هُمْ', english: 'They (3mp)' },
  { id: 'هُنَّ', arabic: 'هُنَّ', english: 'They (3fp)' },
  { id: 'أَنْتَ', arabic: 'أَنْتَ', english: 'You (2ms)' },
  { id: 'أَنْتِ', arabic: 'أَنْتِ', english: 'You (2fs)' },
  { id: 'أَنْتُمَا_مُذَكَّر', arabic: 'أَنْتُمَا (مُذَكَّر)', english: 'You two (2md)' },
  { id: 'أَنْتُمَا_مُؤَنَّث', arabic: 'أَنْتُمَا (مُؤَنَّث)', english: 'You two (2fd)' },
  { id: 'أَنْتُمْ', arabic: 'أَنْتُمْ', english: 'You (2mp)' },
  { id: 'أَنْتُنَّ', arabic: 'أَنْتُنَّ', english: 'You (2fp)' },
  { id: 'أَنَا', arabic: 'أَنَا', english: 'I (1s)' },
  { id: 'نَحْنُ_dual', arabic: 'نَحْنُ (مُثَنَّى)', english: 'We two (1d)' },
  { id: 'نَحْنُ', arabic: 'نَحْنُ', english: 'We (1p)' },
];

/** Conjugation table categories for display */
export const TENSE_CATEGORIES = [
  { key: 'past_active', label: 'الماضي المعلوم', labelEn: 'Past Active' },
  { key: 'past_passive', label: 'الماضي المجهول', labelEn: 'Past Passive' },
  { key: 'present_active', label: 'المضارع المعلوم', labelEn: 'Present Active' },
  { key: 'present_passive', label: 'المضارع المجهول', labelEn: 'Present Passive' },
  { key: 'imperative', label: 'الأمر', labelEn: 'Imperative' },
  { key: 'prohibition', label: 'النهي', labelEn: 'Prohibition' },
  { key: 'active_participle', label: 'اسم الفاعل', labelEn: 'Active Participle' },
  { key: 'passive_participle', label: 'اسم المفعول', labelEn: 'Passive Participle' },
] as const;
