/**
 * Types for the I'laal (morphophonemic changes) system
 */

/** The types of i'laal transformations */
export type IlaalRuleType =
  | 'qalb'      // Flipping (e.g., waaw/yaa' → alif)
  | 'naql'      // Transfer (vowel moves from one letter to another)
  | 'hadhf'     // Deletion (letter removed)
  | 'taskeen'   // Quiescence (vowel removed, letter made sakin)
  | 'idghaam'   // Assimilation (two letters merge)
  | 'takhfeef'  // Lightening (hamza eased)
  | 'ibdaal'    // Substitution (letter replaced by another)
  | "ta'weed";  // Compensation (deleted letter compensated)

/** A single step in the i'laal transformation process */
export interface IlaalStep {
  before: string;
  after: string;
  ruleType: IlaalRuleType;
  ruleNameAr: string;
  explanation: string;
  affectedPosition: 'faa' | 'ayn' | 'lam' | 'prefix' | 'suffix' | 'general';
}

/**
 * Extended verb type with 13 subtypes for precise classification.
 * Maps the 5 sarf types to more specific categories including
 * waawi/yaai distinctions, hamzated positions, and lafif types.
 */
export type ExtendedVerbType =
  | 'sahih'
  | "mudaa'af"
  | 'mithaal-waawi'
  | 'mithaal-yaai'
  | 'ajwaf-waawi'
  | 'ajwaf-yaai'
  | 'naaqis-waawi'
  | 'naaqis-yaai'
  | 'mahmooz-faa'
  | 'mahmooz-ayn'
  | 'mahmooz-lam'
  | 'lafif-maqroon'
  | 'lafif-mafrooq';

/** Sarf library's 5 verb type keys */
export type SarfVerbType = 'sahih' | 'ajwaf' | 'naaqis' | 'mithaal' | "mudaa'af";

/** Labels for extended verb types */
export interface ExtendedVerbTypeLabel {
  ar: string;
  en: string;
  shortAr: string;
}

export const extendedVerbTypeLabels: Record<ExtendedVerbType, ExtendedVerbTypeLabel> = {
  sahih: { ar: 'صحيح سالم', en: 'Sound', shortAr: 'صحيح' },
  "mudaa'af": { ar: 'مضاعف', en: 'Doubled', shortAr: 'مضاعف' },
  'mithaal-waawi': { ar: 'مثال واوي', en: 'Assimilated (waawi)', shortAr: 'مثال و' },
  'mithaal-yaai': { ar: 'مثال يائي', en: 'Assimilated (yaa\'i)', shortAr: 'مثال ي' },
  'ajwaf-waawi': { ar: 'أجوف واوي', en: 'Hollow (waawi)', shortAr: 'أجوف و' },
  'ajwaf-yaai': { ar: 'أجوف يائي', en: 'Hollow (yaa\'i)', shortAr: 'أجوف ي' },
  'naaqis-waawi': { ar: 'ناقص واوي', en: 'Defective (waawi)', shortAr: 'ناقص و' },
  'naaqis-yaai': { ar: 'ناقص يائي', en: 'Defective (yaa\'i)', shortAr: 'ناقص ي' },
  'mahmooz-faa': { ar: 'مهموز الفاء', en: 'Hamzated (faa\')', shortAr: 'مهموز ف' },
  'mahmooz-ayn': { ar: 'مهموز العين', en: 'Hamzated (\'ayn)', shortAr: 'مهموز ع' },
  'mahmooz-lam': { ar: 'مهموز اللام', en: 'Hamzated (laam)', shortAr: 'مهموز ل' },
  'lafif-maqroon': { ar: 'لفيف مقرون', en: 'Doubly-weak (joined)', shortAr: 'لفيف مق' },
  'lafif-mafrooq': { ar: 'لفيف مفروق', en: 'Doubly-weak (separated)', shortAr: 'لفيف مف' },
};

/** Result of comparing a sound form with the actual (i'laal-applied) form */
export interface ComparisonSlot {
  pronoun: string;
  soundForm: string;
  actualForm: string;
  isDifferent: boolean;
}

/** A section of the comparison (e.g., past active, present active, etc.) */
export interface ComparisonSection {
  id: string;
  titleAr: string;
  titleEn: string;
  slots: ComparisonSlot[];
}

/** Full comparison result for a verb root and form */
export interface ComparisonResult {
  root: string;
  extendedType: ExtendedVerbType;
  formNumber: string;
  sections: ComparisonSection[];
  totalSlots: number;
  slotsWithIlaal: number;
}

/** Preset root for quick exploration */
export interface PresetRoot {
  root: string;
  meaning: string;
  type: ExtendedVerbType;
}

export const presetRoots: PresetRoot[] = [
  { root: 'نصر', meaning: 'to help', type: 'sahih' },
  { root: 'ردد', meaning: 'to return', type: "mudaa'af" },
  { root: 'وعد', meaning: 'to promise', type: 'mithaal-waawi' },
  { root: 'يسر', meaning: 'to be easy', type: 'mithaal-yaai' },
  { root: 'قول', meaning: 'to say', type: 'ajwaf-waawi' },
  { root: 'بيع', meaning: 'to sell', type: 'ajwaf-yaai' },
  { root: 'دعو', meaning: 'to call', type: 'naaqis-waawi' },
  { root: 'رمي', meaning: 'to throw', type: 'naaqis-yaai' },
  { root: 'أخذ', meaning: 'to take', type: 'mahmooz-faa' },
  { root: 'سأل', meaning: 'to ask', type: 'mahmooz-ayn' },
  { root: 'قرأ', meaning: 'to read', type: 'mahmooz-lam' },
  { root: 'طوي', meaning: 'to fold', type: 'lafif-maqroon' },
  { root: 'وقي', meaning: 'to protect', type: 'lafif-mafrooq' },
];
