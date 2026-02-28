/**
 * Arabic Verb Conjugation Type Definitions
 * Core types and structured data for the validation system
 */

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

/**
 * Validation result level
 * - success: Valid combination
 * - warning: Rare but valid (informational)
 * - error: Invalid/impossible combination
 */
export type ValidationLevel = 'success' | 'warning' | 'error';

/**
 * Form-verb type compatibility level
 * - full: Commonly used, fully compatible
 * - rare: Grammatically valid but rarely used
 * - blocked: Morphologically impossible or semantically incompatible
 */
export type CompatibilityLevel = 'full' | 'rare' | 'blocked';

/**
 * Passive voice availability level
 * - full: Full passive voice available
 * - disputed: Debated by grammarians
 * - none: No passive voice (inherently passive or intransitive)
 */
export type PassiveLevel = 'full' | 'disputed' | 'none';

/**
 * Validation result interface
 */
export interface ValidationResult {
  valid: boolean;
  level: ValidationLevel;
  message?: string;      // English explanation
  messageAr?: string;    // Arabic explanation
}

/**
 * Compatibility rule for form-verb type matrix
 */
export interface CompatibilityRule {
  level: CompatibilityLevel;
  note?: string;        // Arabic grammatical explanation
  noteEn?: string;      // English grammatical explanation
}

/**
 * Pronoun information with grammatical metadata
 */
export interface PronounInfo {
  key: string;          // Arabic pronoun category (e.g., 'الغائب المفرد المذكر')
  label: string;        // Display text (same as key for now)
  person: '3rd' | '2nd' | '1st';
  number: 'singular' | 'dual' | 'plural';
  gender?: 'masculine' | 'feminine';
}

/**
 * Conjugation type information with metadata
 */
export interface ConjugationTypeInfo {
  key: string;          // Full Arabic key (e.g., 'الماضي المبني للمعلوم')
  label: string;        // Short display label (e.g., 'ماضي معلوم')
  labelEn: string;      // English label
  voice?: 'active' | 'passive';
  category: 'verb' | 'participle';
}

// ============================================================================
// PRONOUNS DATA
// ============================================================================

/**
 * Arabic grammatical pronouns (الضمائر)
 * 12 pronouns covering all persons, numbers, and genders
 * Note: Participles are NOT included here (handled separately)
 */
export const PRONOUNS: PronounInfo[] = [
  // Third person (الغائب)
  {
    key: 'الغائب المفرد المذكر',
    label: 'الغائب المفرد المذكر',
    person: '3rd',
    number: 'singular',
    gender: 'masculine'
  },
  {
    key: 'الغائب المفرد المؤنث',
    label: 'الغائب المفرد المؤنث',
    person: '3rd',
    number: 'singular',
    gender: 'feminine'
  },
  {
    key: 'الغائب المثنى',
    label: 'الغائب المثنى',
    person: '3rd',
    number: 'dual'
  },
  {
    key: 'الغائب الجمع المذكر',
    label: 'الغائب الجمع المذكر',
    person: '3rd',
    number: 'plural',
    gender: 'masculine'
  },
  {
    key: 'الغائب الجمع المؤنث',
    label: 'الغائب الجمع المؤنث',
    person: '3rd',
    number: 'plural',
    gender: 'feminine'
  },

  // Second person (المخاطب)
  {
    key: 'المخاطب المفرد المذكر',
    label: 'المخاطب المفرد المذكر',
    person: '2nd',
    number: 'singular',
    gender: 'masculine'
  },
  {
    key: 'المخاطب المفرد المؤنث',
    label: 'المخاطب المفرد المؤنث',
    person: '2nd',
    number: 'singular',
    gender: 'feminine'
  },
  {
    key: 'المخاطب المثنى',
    label: 'المخاطب المثنى',
    person: '2nd',
    number: 'dual'
  },
  {
    key: 'المخاطب الجمع المذكر',
    label: 'المخاطب الجمع المذكر',
    person: '2nd',
    number: 'plural',
    gender: 'masculine'
  },
  {
    key: 'المخاطب الجمع المؤنث',
    label: 'المخاطب الجمع المؤنث',
    person: '2nd',
    number: 'plural',
    gender: 'feminine'
  },

  // First person (المتكلم)
  {
    key: 'المتكلم المفرد',
    label: 'المتكلم المفرد',
    person: '1st',
    number: 'singular'
  },
  {
    key: 'المتكلم الجمع',
    label: 'المتكلم الجمع',
    person: '1st',
    number: 'plural'
  },
];

// ============================================================================
// CONJUGATION TYPES DATA
// ============================================================================

/**
 * Verb conjugation types (أنواع التصريف)
 * 6 main conjugation types for verbs (participles handled separately)
 */
export const CONJUGATION_TYPES: ConjugationTypeInfo[] = [
  {
    key: 'الماضي المبني للمعلوم',
    label: 'ماضي معلوم',
    labelEn: 'Past Active',
    voice: 'active',
    category: 'verb'
  },
  {
    key: 'الماضي المبني للمجهول',
    label: 'ماضي مجهول',
    labelEn: 'Past Passive',
    voice: 'passive',
    category: 'verb'
  },
  {
    key: 'المضارع المبني للمعلوم',
    label: 'مضارع معلوم',
    labelEn: 'Present Active',
    voice: 'active',
    category: 'verb'
  },
  {
    key: 'المضارع المبني للمجهول',
    label: 'مضارع مجهول',
    labelEn: 'Present Passive',
    voice: 'passive',
    category: 'verb'
  },
  {
    key: 'الأمر',
    label: 'أمر',
    labelEn: 'Imperative',
    category: 'verb'
  },
  {
    key: 'النهي',
    label: 'نهي',
    labelEn: 'Prohibition',
    category: 'verb'
  },
];

/**
 * Participle types (الأسماء المشتقة)
 * Participles are NOT conjugated by pronoun, so they're separate
 */
export const PARTICIPLE_TYPES: ConjugationTypeInfo[] = [
  {
    key: 'اسم الفاعل',
    label: 'اسم فاعل',
    labelEn: 'Active Participle',
    category: 'participle'
  },
  {
    key: 'اسم المفعول',
    label: 'اسم مفعول',
    labelEn: 'Passive Participle',
    category: 'participle'
  },
];

/**
 * All conjugation types combined (for backward compatibility)
 */
export const ALL_CONJUGATION_TYPES: ConjugationTypeInfo[] = [
  ...CONJUGATION_TYPES,
  ...PARTICIPLE_TYPES
];

// ============================================================================
// GERUND PRACTICE MODE TYPES
// ============================================================================

/**
 * Conjugation types for Gerund Practice mode
 * User sees masdar (gerund) and must produce the requested form
 */
export const GERUND_PRACTICE_TYPES = [
  { key: 'الْمَاضِي الْمَعْلُوْمُ', label: 'Past Active', labelAr: 'الْمَاضِي الْمَعْلُوْمُ' },
  { key: 'الْمَاضِي الْمَجْهُوْلُ', label: 'Past Passive', labelAr: 'الْمَاضِي الْمَجْهُوْلُ' },
  { key: 'الْمُضَارِعُ الْمَعْلُوْمُ', label: 'Present Active', labelAr: 'الْمُضَارِعُ الْمَعْلُوْمُ' },
  { key: 'الْمُضَارِعُ الْمَجْهُوْلُ', label: 'Present Passive', labelAr: 'الْمُضَارِعُ الْمَجْهُوْلُ' },
  { key: 'اَلْأَمْرُ', label: 'Imperative', labelAr: 'اَلْأَمْرُ' },
  { key: 'النَّهْيُ', label: 'Prohibition', labelAr: 'النَّهْيُ' },
  { key: 'اسْمُ الْفَاعِلِ', label: 'Active Participle', labelAr: 'اسْمُ الْفَاعِلِ' },
  { key: 'اسْمُ الْمَفْعُوْلِ', label: 'Passive Participle', labelAr: 'اسْمُ الْمَفْعُوْلِ' },
  { key: 'تَصْرِيْفٌ صَغِيْرٌ', label: 'Minor Conjugation (3 forms)', labelAr: 'تَصْرِيْفٌ صَغِيْرٌ' },
] as const;

export type GerundPracticeType = typeof GERUND_PRACTICE_TYPES[number]['key'];
