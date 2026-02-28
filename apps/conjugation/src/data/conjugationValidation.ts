/**
 * Arabic Verb Conjugation Validation System
 * Comprehensive three-layer validation based on Arabic morphology rules
 */

import type {
  ValidationResult,
  CompatibilityRule,
  PassiveLevel
} from './conjugationTypes';

// ============================================================================
// FORM-VERB TYPE COMPATIBILITY MATRIX
// ============================================================================

/**
 * Complete compatibility matrix for all 10 verb forms × 10 verb types
 * Based on classical Arabic morphology rules
 *
 * Verb Types:
 * - Regular (صحيح): No weak radicals
 * - Mithal (مثال): Weak first radical (و or ي)
 * - Ajwaf (أجوف): Weak middle radical (و or ي)
 * - Naqis (ناقص): Weak final radical (و or ي)
 * - Mudaa'af (مضاعف): Doubled consonant
 * - Mahmooz al-Fa' (مهموز الفاء): Hamza as first radical
 * - Mahmooz al-'Ayn (مهموز العين): Hamza as middle radical
 * - Mahmooz al-Lam (مهموز اللام): Hamza as final radical
 * - Lafif Maqroon (لفيف مقرون): Two adjacent weak radicals
 * - Lafif Mafrooq (لفيف مفروق): Two separate weak radicals
 */
export const FORM_VERB_TYPE_MATRIX: Record<number, Record<string, CompatibilityRule>> = {
  // ==========================================================================
  // FORM I (فَعَلَ) - BASE FORM
  // ==========================================================================
  1: {
    'Regular': {
      level: 'full',
      noteEn: 'Base form - all types allowed'
    },
    'Mithal': {
      level: 'full',
      note: 'تسقط الواو في المضارع',
      noteEn: 'Waw drops in present tense'
    },
    'Ajwaf': {
      level: 'full',
      note: 'حذف حرف العلة الأوسط',
      noteEn: 'Middle weak radical elides'
    },
    'Naqis': {
      level: 'full',
      note: 'تغيير الحرف الأخير',
      noteEn: 'Final weak radical changes'
    },
    "Mudaa'af": {
      level: 'full',
      note: 'إدغام الحرفين المتماثلين',
      noteEn: 'Doubled consonants merge'
    },
    "Mahmooz al-Fa'": {
      level: 'full',
      noteEn: 'Hamza as first radical'
    },
    "Mahmooz al-'Ayn": {
      level: 'full',
      noteEn: 'Hamza as middle radical'
    },
    'Mahmooz al-Lam': {
      level: 'full',
      noteEn: 'Hamza as final radical'
    },
    'Lafif Maqroon': {
      level: 'full',
      note: 'لفيف مقرون - حرفا علة متجاوران',
      noteEn: 'Adjacent weak radicals'
    },
    'Lafif Mafrooq': {
      level: 'full',
      note: 'لفيف مفروق - حرفا علة منفصلان',
      noteEn: 'Separated weak radicals'
    },
  },

  // ==========================================================================
  // FORM II (فَعَّلَ) - INTENSIVE/CAUSATIVE
  // ==========================================================================
  2: {
    'Regular': { level: 'full' },
    'Mithal': {
      level: 'full',
      note: 'مثل: وَصَّلَ',
      noteEn: 'Example: وَصَّلَ (to connect)'
    },
    'Ajwaf': {
      level: 'full',
      note: 'مثل: قَوَّمَ',
      noteEn: 'Example: قَوَّمَ (to straighten)'
    },
    'Naqis': {
      level: 'full',
      note: 'مثل: زَكَّى',
      noteEn: 'Example: زَكَّى (to purify)'
    },
    "Mudaa'af": {
      level: 'full',
      note: 'مثل: مَدَّدَ',
      noteEn: 'Example: مَدَّدَ (to extend)'
    },
    "Mahmooz al-Fa'": { level: 'full' },
    "Mahmooz al-'Ayn": { level: 'full' },
    'Mahmooz al-Lam': { level: 'full' },
    'Lafif Maqroon': { level: 'full' },
    'Lafif Mafrooq': { level: 'full' },
  },

  // ==========================================================================
  // FORM III (فَاعَلَ) - RECIPROCAL/PARTICIPATIVE
  // ==========================================================================
  3: {
    'Regular': { level: 'full' },
    'Mithal': {
      level: 'full',
      note: 'مثل: وَاصَلَ',
      noteEn: 'Example: وَاصَلَ (to continue)'
    },
    'Ajwaf': {
      level: 'full',
      note: 'مثل: قَاوَمَ',
      noteEn: 'Example: قَاوَمَ (to resist)'
    },
    'Naqis': {
      level: 'full',
      note: 'مثل: نَادَى',
      noteEn: 'Example: نَادَى (to call)'
    },
    "Mudaa'af": { level: 'full' },
    "Mahmooz al-Fa'": { level: 'full' },
    "Mahmooz al-'Ayn": { level: 'full' },
    'Mahmooz al-Lam': { level: 'full' },
    'Lafif Maqroon': { level: 'full' },
    'Lafif Mafrooq': { level: 'full' },
  },

  // ==========================================================================
  // FORM IV (أَفْعَلَ) - CAUSATIVE
  // ==========================================================================
  4: {
    'Regular': { level: 'full' },
    'Mithal': {
      level: 'full',
      note: 'مثل: أَوْصَلَ',
      noteEn: 'Example: أَوْصَلَ (to deliver)'
    },
    'Ajwaf': {
      level: 'full',
      note: 'مثل: أَقَامَ',
      noteEn: 'Example: أَقَامَ (to establish)'
    },
    'Naqis': {
      level: 'full',
      note: 'مثل: أَعْطَى',
      noteEn: 'Example: أَعْطَى (to give)'
    },
    "Mudaa'af": { level: 'full' },
    "Mahmooz al-Fa'": { level: 'full' },
    "Mahmooz al-'Ayn": { level: 'full' },
    'Mahmooz al-Lam': { level: 'full' },
    'Lafif Maqroon': { level: 'full' },
    'Lafif Mafrooq': { level: 'full' },
  },

  // ==========================================================================
  // FORM V (تَفَعَّلَ) - REFLEXIVE OF FORM II
  // ==========================================================================
  5: {
    'Regular': { level: 'full' },
    'Mithal': {
      level: 'full',
      note: 'مثل: تَوَصَّلَ',
      noteEn: 'Example: تَوَصَّلَ (to reach)'
    },
    'Ajwaf': {
      level: 'full',
      note: 'مثل: تَقَوَّمَ',
      noteEn: 'Example: تَقَوَّمَ (to be straightened)'
    },
    'Naqis': {
      level: 'full',
      note: 'مثل: تَزَكَّى',
      noteEn: 'Example: تَزَكَّى (to be purified)'
    },
    "Mudaa'af": { level: 'full' },
    "Mahmooz al-Fa'": { level: 'full' },
    "Mahmooz al-'Ayn": { level: 'full' },
    'Mahmooz al-Lam': { level: 'full' },
    'Lafif Maqroon': { level: 'full' },
    'Lafif Mafrooq': { level: 'full' },
  },

  // ==========================================================================
  // FORM VI (تَفَاعَلَ) - RECIPROCAL OF FORM III
  // ==========================================================================
  6: {
    'Regular': { level: 'full' },
    'Mithal': { level: 'full' },
    'Ajwaf': { level: 'full' },
    'Naqis': { level: 'full' },
    "Mudaa'af": {
      level: 'rare',
      note: 'نادر جداً',
      noteEn: 'Extremely rare - few attested examples'
    },
    "Mahmooz al-Fa'": { level: 'full' },
    "Mahmooz al-'Ayn": { level: 'full' },
    'Mahmooz al-Lam': { level: 'full' },
    'Lafif Maqroon': {
      level: 'rare',
      note: 'نادر',
      noteEn: 'Rare - few attested examples'
    },
    'Lafif Mafrooq': {
      level: 'rare',
      note: 'نادر',
      noteEn: 'Rare - few attested examples'
    },
  },

  // ==========================================================================
  // FORM VII (اِنْفَعَلَ) - PASSIVE/REFLEXIVE
  // ==========================================================================
  7: {
    'Regular': {
      level: 'full',
      note: 'مثل: اِنْكَسَرَ',
      noteEn: 'Example: اِنْكَسَرَ (to be broken)'
    },
    'Mithal': {
      level: 'rare',
      note: 'نادر جداً - قليل الاستعمال',
      noteEn: 'Very rare - few attested examples in classical texts'
    },
    'Ajwaf': {
      level: 'rare',
      note: 'نادر جداً - قليل الاستعمال',
      noteEn: 'Very rare - few attested examples'
    },
    'Naqis': {
      level: 'rare',
      note: 'نادر جداً - قليل الاستعمال',
      noteEn: 'Very rare - few attested examples'
    },
    "Mudaa'af": {
      level: 'blocked',
      note: 'ممنوع - لا يمكن إدخال النون قبل الحرفين المتماثلين',
      noteEn: 'Morphologically impossible - cannot insert ن before doubled root'
    },
    "Mahmooz al-Fa'": {
      level: 'full',
      note: 'مثل: اِنْأَصَلَ',
      noteEn: 'Works with hamza as first radical'
    },
    "Mahmooz al-'Ayn": {
      level: 'full',
      noteEn: 'Works with hamza as middle radical'
    },
    'Mahmooz al-Lam': {
      level: 'full',
      noteEn: 'Works with hamza as final radical'
    },
    'Lafif Maqroon': {
      level: 'blocked',
      note: 'ممنوع - حرفا علة كثيرة',
      noteEn: 'Blocked - too many weak radicals create impossible pattern'
    },
    'Lafif Mafrooq': {
      level: 'blocked',
      note: 'ممنوع - حرفا علة كثيرة',
      noteEn: 'Blocked - too many weak radicals create impossible pattern'
    },
  },

  // ==========================================================================
  // FORM VIII (اِفْتَعَلَ) - REFLEXIVE/MIDDLE
  // ==========================================================================
  8: {
    'Regular': {
      level: 'full',
      note: 'مثل: اِجْتَمَعَ',
      noteEn: 'Example: اِجْتَمَعَ (to gather)'
    },
    'Mithal': {
      level: 'full',
      note: 'مثل: اِتَّصَلَ (إدغام التاء في الواو)',
      noteEn: 'Example: اِتَّصَلَ (tā merges with wāw)'
    },
    'Ajwaf': {
      level: 'full',
      note: 'مثل: اِخْتَارَ',
      noteEn: 'Example: اِخْتَارَ (to choose)'
    },
    'Naqis': {
      level: 'full',
      note: 'مثل: اِبْتَغَى',
      noteEn: 'Example: اِبْتَغَى (to seek)'
    },
    "Mudaa'af": {
      level: 'full',
      note: 'مثل: اِمْتَدَّ',
      noteEn: 'Example: اِمْتَدَّ (to extend)'
    },
    "Mahmooz al-Fa'": {
      level: 'full',
      note: 'مثل: اِئْتَمَرَ',
      noteEn: 'Hamza handling requires special rules'
    },
    "Mahmooz al-'Ayn": { level: 'full' },
    'Mahmooz al-Lam': { level: 'full' },
    'Lafif Maqroon': { level: 'full' },
    'Lafif Mafrooq': { level: 'full' },
  },

  // ==========================================================================
  // FORM IX (اِفْعَلَّ) - COLORS AND PHYSICAL DEFECTS
  // ==========================================================================
  9: {
    'Regular': {
      level: 'full',
      note: 'للألوان والعيوب فقط - مثل: اِحْمَرَّ (أحمر)، اِعْوَجَّ (أعوج)',
      noteEn: 'Only for colors and physical defects - Example: اِحْمَرَّ (to become red)'
    },
    'Mithal': {
      level: 'blocked',
      note: 'ممنوع - لا يتوافق مع وزن اِفْعَلَّ',
      noteEn: 'Blocked - incompatible with gemination pattern اِفْعَلَّ'
    },
    'Ajwaf': {
      level: 'blocked',
      note: 'ممنوع - لا يمكن التضعيف مع حرف العلة في الوسط',
      noteEn: 'Blocked - cannot geminate with weak middle radical'
    },
    'Naqis': {
      level: 'blocked',
      note: 'ممنوع - لا يتوافق مع الوزن',
      noteEn: 'Blocked - incompatible with form pattern'
    },
    "Mudaa'af": {
      level: 'blocked',
      note: 'ممنوع - تكرار ثلاثي غير ممكن',
      noteEn: 'Blocked - triple consonant cluster morphologically impossible'
    },
    "Mahmooz al-Fa'": {
      level: 'rare',
      note: 'نادر - موجود في بعض الأفعال',
      noteEn: 'Rare but exists in some verbs'
    },
    "Mahmooz al-'Ayn": {
      level: 'rare',
      note: 'نادر',
      noteEn: 'Rare - few attested examples'
    },
    'Mahmooz al-Lam': {
      level: 'blocked',
      note: 'ممنوع',
      noteEn: 'Blocked - hamza as final radical incompatible'
    },
    'Lafif Maqroon': {
      level: 'blocked',
      note: 'ممنوع',
      noteEn: 'Blocked - doubly weak verbs cannot form IX'
    },
    'Lafif Mafrooq': {
      level: 'blocked',
      note: 'ممنوع',
      noteEn: 'Blocked - doubly weak verbs cannot form IX'
    },
  },

  // ==========================================================================
  // FORM X (اِسْتَفْعَلَ) - SEEKING/CONSIDERING
  // ==========================================================================
  10: {
    'Regular': {
      level: 'full',
      note: 'مثل: اِسْتَخْرَجَ',
      noteEn: 'Example: اِسْتَخْرَجَ (to extract)'
    },
    'Mithal': {
      level: 'full',
      note: 'مثل: اِسْتَوْصَلَ',
      noteEn: 'Example: اِسْتَوْصَلَ (to seek connection)'
    },
    'Ajwaf': {
      level: 'full',
      note: 'مثل: اِسْتَقَامَ',
      noteEn: 'Example: اِسْتَقَامَ (to be upright)'
    },
    'Naqis': {
      level: 'full',
      note: 'مثل: اِسْتَدْعَى',
      noteEn: 'Example: اِسْتَدْعَى (to summon)'
    },
    "Mudaa'af": {
      level: 'full',
      note: 'مثل: اِسْتَمَدَّ',
      noteEn: 'Example: اِسْتَمَدَّ (to seek extension)'
    },
    "Mahmooz al-Fa'": { level: 'full' },
    "Mahmooz al-'Ayn": { level: 'full' },
    'Mahmooz al-Lam': { level: 'full' },
    'Lafif Maqroon': { level: 'full' },
    'Lafif Mafrooq': { level: 'full' },
  },
};

// ============================================================================
// PASSIVE VOICE RULES BY FORM
// ============================================================================

/**
 * Passive voice availability for each of the 10 forms
 * Based on transitivity and inherent voice characteristics
 */
export const PASSIVE_VOICE_RULES: Record<number, { level: PassiveLevel; note?: string; noteEn?: string }> = {
  1: {
    level: 'full',
    noteEn: 'Full passive voice available'
  },
  2: {
    level: 'full',
    noteEn: 'Full passive voice available'
  },
  3: {
    level: 'full',
    noteEn: 'Full passive voice available'
  },
  4: {
    level: 'full',
    noteEn: 'Full passive voice available'
  },
  5: {
    level: 'disputed',
    note: 'مختلف فيه عند النحاة - غالباً متعدي',
    noteEn: 'Disputed by grammarians - typically transitive but debated'
  },
  6: {
    level: 'disputed',
    note: 'مختلف فيه - معنى المشاركة والتبادل',
    noteEn: 'Disputed - reciprocal/participative meaning makes passive rare'
  },
  7: {
    level: 'none',
    note: 'مبني للمجهول بمعناه - لا يُبنى للمجهول',
    noteEn: 'Inherently passive/reflexive - no separate passive form'
  },
  8: {
    level: 'full',
    noteEn: 'Full passive voice available'
  },
  9: {
    level: 'none',
    note: 'لازم - لا يُبنى للمجهول',
    noteEn: 'Intransitive state change - no passive voice'
  },
  10: {
    level: 'full',
    noteEn: 'Full passive voice available'
  },
};

// ============================================================================
// VALIDATION FUNCTIONS
// ============================================================================

/**
 * Layer 1: Validates if a verb type can exist in a particular form
 *
 * Arabic Grammar Rules:
 * - Form I: All types allowed (base form)
 * - Form VII: Mudaa'af blocked (cannot insert ن before doubled root)
 * - Form IX: Weak verbs blocked (incompatible with gemination pattern افعلّ)
 * - Forms 7-10: Lafif types blocked or rare (too many weak radicals)
 *
 * @param formNumber - Verb form number (1-10)
 * @param verbType - Verb weakness type (Regular, Mithal, Ajwaf, etc.)
 * @param strictMode - If true, also blocks rare but valid combinations
 * @returns ValidationResult with valid status, level, and messages
 *
 * @example
 * // Valid combination
 * validateFormForVerbType(1, 'Regular', false)
 * // => { valid: true, level: 'success' }
 *
 * @example
 * // Blocked combination
 * validateFormForVerbType(7, "Mudaa'af", false)
 * // => { valid: false, level: 'error', messageAr: 'ممنوع - لا يمكن إدخال النون قبل المضعف' }
 *
 * @example
 * // Rare combination (allowed in permissive mode, blocked in strict mode)
 * validateFormForVerbType(7, 'Mithal', false)
 * // => { valid: true, level: 'warning', messageAr: 'نادر جداً' }
 * validateFormForVerbType(7, 'Mithal', true)
 * // => { valid: false, level: 'warning', messageAr: 'نادر جداً' }
 */
export function validateFormForVerbType(
  formNumber: number,
  verbType: string,
  strictMode: boolean = false
): ValidationResult {
  const rule = FORM_VERB_TYPE_MATRIX[formNumber]?.[verbType];

  if (!rule) {
    return {
      valid: false,
      level: 'error',
      message: 'Unknown verb type or form number',
      messageAr: 'نوع الفعل أو الوزن غير معروف'
    };
  }

  if (rule.level === 'blocked') {
    return {
      valid: false,
      level: 'error',
      message: rule.noteEn,
      messageAr: rule.note
    };
  }

  if (rule.level === 'rare' && strictMode) {
    return {
      valid: false,
      level: 'warning',
      message: rule.noteEn,
      messageAr: rule.note
    };
  }

  return {
    valid: true,
    level: rule.level === 'rare' ? 'warning' : 'success',
    message: rule.noteEn,
    messageAr: rule.note
  };
}

/**
 * Layer 2: Validates if a conjugation type is compatible with a form
 * Primarily checks passive voice availability
 *
 * @param formNumber - Verb form number (1-10)
 * @param conjugationType - Type of conjugation (الماضي المبني للمعلوم, etc.)
 * @param allowDisputed - If false, disputed passives (Forms V, VI) are blocked
 * @returns ValidationResult with valid status and messages
 *
 * @example
 * // Valid passive
 * validateConjugationForForm(1, 'الماضي المبني للمجهول', true)
 * // => { valid: true, level: 'success' }
 *
 * @example
 * // Blocked passive (Form VII inherently passive)
 * validateConjugationForForm(7, 'الماضي المبني للمجهول', true)
 * // => { valid: false, level: 'error', messageAr: 'مبني للمجهول بمعناه - لا يُبنى للمجهول' }
 */
export function validateConjugationForForm(
  formNumber: number,
  conjugationType: string,
  allowDisputed: boolean = true
): ValidationResult {
  // Check if passive conjugation or passive participle
  const isPassiveVerb = conjugationType.includes('مجهول') || conjugationType.includes('Passive');
  const isPassiveParticiple = conjugationType.includes('اسم المفعول');

  if (isPassiveVerb || isPassiveParticiple) {
    const passiveRule = PASSIVE_VOICE_RULES[formNumber];

    if (!passiveRule) {
      return {
        valid: false,
        level: 'error',
        message: 'Unknown form number',
        messageAr: 'رقم الوزن غير معروف'
      };
    }

    if (passiveRule.level === 'none') {
      return {
        valid: false,
        level: 'error',
        message: isPassiveParticiple
          ? 'No passive participle (form has no passive)'
          : passiveRule.noteEn,
        messageAr: isPassiveParticiple
          ? 'لا يوجد اسم مفعول - الوزن لا يُبنى للمجهول'
          : passiveRule.note
      };
    }

    if (passiveRule.level === 'disputed' && !allowDisputed) {
      return {
        valid: false,
        level: 'warning',
        message: passiveRule.noteEn,
        messageAr: passiveRule.note
      };
    }
  }

  return { valid: true, level: 'success' };
}

/**
 * Layer 3: Validates if a pronoun is compatible with a conjugation type
 *
 * Rules:
 * - Imperatives (أمر) and Prohibitions (نهي): Only 2nd person (المخاطب)
 * - Participles should not be conjugated by pronoun (handled separately in UI)
 *
 * @param pronoun - Arabic pronoun category
 * @param conjugationType - Type of conjugation
 * @returns ValidationResult with valid status and messages
 *
 * @example
 * // Valid imperative (2nd person)
 * validatePronounForConjugation('المخاطب المفرد المذكر', 'الأمر')
 * // => { valid: true, level: 'success' }
 *
 * @example
 * // Invalid imperative (3rd person)
 * validatePronounForConjugation('الغائب المفرد المذكر', 'الأمر')
 * // => { valid: false, level: 'error', messageAr: 'الأمر والنهي للمخاطب فقط' }
 */
export function validatePronounForConjugation(
  pronoun: string,
  conjugationType: string
): ValidationResult {
  const is2ndPerson = pronoun.includes('المخاطب');

  // Imperative/prohibition only 2nd person
  if (conjugationType.includes('أمر') || conjugationType.includes('نهي')) {
    if (!is2ndPerson) {
      return {
        valid: false,
        level: 'error',
        message: 'Imperative and prohibition only for 2nd person',
        messageAr: 'الأمر والنهي للمخاطب فقط'
      };
    }
  }

  // Participles shouldn't be validated with pronouns (handled separately)
  if (conjugationType.includes('اسم الفاعل') || conjugationType.includes('اسم المفعول')) {
    return {
      valid: false,
      level: 'error',
      message: 'Participles are not conjugated by pronoun',
      messageAr: 'الأسماء المشتقة لا تُصرَّف بالضمائر'
    };
  }

  return { valid: true, level: 'success' };
}

/**
 * Complete three-layer validation for a full morphological combination
 *
 * Combines all three validation layers:
 * 1. Form-verb type compatibility
 * 2. Form-conjugation type compatibility (passive rules)
 * 3. Pronoun-conjugation type compatibility
 *
 * @param formNumber - Verb form number (1-10)
 * @param verbType - Verb weakness type
 * @param conjugationType - Type of conjugation
 * @param pronoun - Optional pronoun (not needed for participles)
 * @param options - Validation options (strictMode, allowDisputed)
 * @returns ValidationResult - First failure stops validation, returns that result
 *
 * @example
 * // Valid combination
 * validateFullCombination(1, 'Regular', 'الماضي المبني للمعلوم', 'الغائب المفرد المذكر')
 * // => { valid: true, level: 'success' }
 *
 * @example
 * // Invalid combination (Form VII + Mudaa'af)
 * validateFullCombination(7, "Mudaa'af", 'الماضي المبني للمعلوم', 'الغائب المفرد المذكر')
 * // => { valid: false, level: 'error', message: 'Morphologically impossible...' }
 */
export function validateFullCombination(
  formNumber: number,
  verbType: string,
  conjugationType: string,
  pronoun?: string,
  options = { strictMode: false, allowDisputed: true }
): ValidationResult {
  // Layer 1: Form-Verb Type
  const formVerbResult = validateFormForVerbType(formNumber, verbType, options.strictMode);
  if (!formVerbResult.valid) return formVerbResult;

  // Layer 2: Form-Conjugation Type (Passive)
  const conjugationResult = validateConjugationForForm(formNumber, conjugationType, options.allowDisputed);
  if (!conjugationResult.valid) return conjugationResult;

  // Layer 3: Pronoun-Conjugation Type (if pronoun provided)
  if (pronoun) {
    const pronounResult = validatePronounForConjugation(pronoun, conjugationType);
    if (!pronounResult.valid) return pronounResult;
  }

  return { valid: true, level: 'success' };
}

/**
 * Helper function: Get valid verb types for selected forms
 * Filters verb types to only those compatible with at least one selected form
 *
 * @param forms - Array of selected form numbers
 * @param allVerbTypes - Array of all verb type keys
 * @param strictMode - If true, excludes rare combinations
 * @returns Array of valid verb type keys
 *
 * @example
 * getValidVerbTypesForForms([1, 2, 3], ['Regular', 'Mithal', 'Mudaa\'af'], false)
 * // => ['Regular', 'Mithal', 'Mudaa\'af'] (all valid)
 *
 * @example
 * getValidVerbTypesForForms([7, 9], ['Regular', 'Mithal', 'Mudaa\'af'], false)
 * // => ['Regular', 'Mithal'] (Mudaa'af blocked in Form VII)
 */
export function getValidVerbTypesForForms(
  forms: number[],
  allVerbTypes: string[],
  strictMode: boolean = false
): string[] {
  return allVerbTypes.filter(verbType =>
    forms.some(formNumber => {
      const result = validateFormForVerbType(formNumber, verbType, strictMode);
      return result.valid;
    })
  );
}

/**
 * Helper function: Get valid conjugation types for selected forms
 * Filters conjugation types to only those compatible with at least one selected form
 *
 * @param forms - Array of selected form numbers
 * @param allConjugationTypes - Array of all conjugation type keys
 * @param allowDisputed - If false, excludes disputed passives (Forms V, VI)
 * @returns Array of valid conjugation type keys
 *
 * @example
 * getValidConjugationTypesForForms([1, 2, 3], ['الماضي المبني للمجهول'], true)
 * // => ['الماضي المبني للمجهول'] (all forms have passive)
 *
 * @example
 * getValidConjugationTypesForForms([7, 9], ['الماضي المبني للمجهول'], true)
 * // => [] (Forms VII and IX have no passive)
 */
export function getValidConjugationTypesForForms(
  forms: number[],
  allConjugationTypes: string[],
  allowDisputed: boolean = true
): string[] {
  return allConjugationTypes.filter(conjugationType =>
    forms.some(formNumber => {
      const result = validateConjugationForForm(formNumber, conjugationType, allowDisputed);
      return result.valid;
    })
  );
}
