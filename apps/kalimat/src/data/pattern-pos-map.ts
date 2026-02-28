export type PosCategory = 'verb' | 'noun' | 'active-participle' | 'passive-participle' | 'masdar' | 'other';

export const posLabels: Record<PosCategory, string> = {
  'verb': 'Verbs',
  'noun': 'Nouns',
  'active-participle': 'Active Participles',
  'passive-participle': 'Passive Participles',
  'masdar': 'Verbal Nouns (Masdar)',
  'other': 'Other',
};

export const posOrder: PosCategory[] = [
  'verb',
  'masdar',
  'active-participle',
  'passive-participle',
  'noun',
  'other',
];

/**
 * Maps Arabic verb/noun patterns (wazn) to part-of-speech categories.
 * Patterns come from the `p` field in root family JSON data.
 */
export const patternPosMap: Record<string, PosCategory> = {
  // ── Verb patterns (Form I) ──
  'فَعَلَ': 'verb',
  'فَعِلَ': 'verb',
  'فَعُلَ': 'verb',
  // Form I passive
  'فُعِلَ': 'verb',
  // Form II
  'فَعَّلَ': 'verb',
  'فُعِّلَ': 'verb',
  // Form III
  'فَاعَلَ': 'verb',
  'فُوعِلَ': 'verb',
  // Form IV
  'أَفْعَلَ': 'verb',
  'أُفْعِلَ': 'verb',
  // Form V
  'تَفَعَّلَ': 'verb',
  'تُفُعِّلَ': 'verb',
  // Form VI
  'تَفَاعَلَ': 'verb',
  'تُفُوعِلَ': 'verb',
  // Form VII
  'اِنْفَعَلَ': 'verb',
  'اُنْفُعِلَ': 'verb',
  // Form VIII
  'اِفْتَعَلَ': 'verb',
  'اُفْتُعِلَ': 'verb',
  // Form IX
  'اِفْعَلَّ': 'verb',
  // Form X
  'اِسْتَفْعَلَ': 'verb',
  'اُسْتُفْعِلَ': 'verb',

  // ── Active participles ──
  'فَاعِل': 'active-participle',
  'فاعِل': 'active-participle',
  'مُفَعِّل': 'active-participle',
  'مُفَاعِل': 'active-participle',
  'مُفْعِل': 'active-participle',
  'مُتَفَعِّل': 'active-participle',
  'مُتَفَاعِل': 'active-participle',
  'مُنْفَعِل': 'active-participle',
  'مُفْتَعِل': 'active-participle',
  'مُسْتَفْعِل': 'active-participle',
  'فَعِيل': 'active-participle',
  'فَعُول': 'active-participle',

  // ── Passive participles ──
  'مَفْعُول': 'passive-participle',
  'مفعول': 'passive-participle',
  'مُفَعَّل': 'passive-participle',
  'مُفَاعَل': 'passive-participle',
  'مُفْعَل': 'passive-participle',
  'مُتَفَعَّل': 'passive-participle',
  'مُتَفَاعَل': 'passive-participle',
  'مُنْفَعَل': 'passive-participle',
  'مُفْتَعَل': 'passive-participle',
  'مُسْتَفْعَل': 'passive-participle',

  // ── Masdar (verbal noun) patterns ──
  'فَعْل': 'masdar',
  'فِعْل': 'masdar',
  'فُعْل': 'masdar',
  'فَعَل': 'masdar',
  'فِعَل': 'masdar',
  'فَعِل': 'masdar',
  'فُعَل': 'masdar',
  'فُعُل': 'masdar',
  'فَعَال': 'masdar',
  'فِعَال': 'masdar',
  'فُعَال': 'masdar',
  'فِعَالَة': 'masdar',
  'فُعُولَة': 'masdar',
  'فَعَالَة': 'masdar',
  'فَعْلَة': 'masdar',
  'فِعْلَة': 'masdar',
  'فُعْلَة': 'masdar',
  'تَفْعِيل': 'masdar',
  'مُفَاعَلَة': 'masdar',
  'إِفْعَال': 'masdar',
  'تَفَعُّل': 'masdar',
  'تَفَاعُل': 'masdar',
  'اِنْفِعَال': 'masdar',
  'اِفْتِعَال': 'masdar',
  'اِسْتِفْعَال': 'masdar',
  'فُعُول': 'masdar',
  'فَعِيلَة': 'masdar',
  'مَفْعَل': 'masdar',
  'مَفْعِل': 'masdar',
  'مَفْعَلَة': 'masdar',

  // ── Noun patterns ──
  'فُعْلَى': 'noun',
  'فُعَلَاء': 'noun',
  'فِعْلَان': 'noun',
  'فَعْلَان': 'noun',
  'فُعْلَان': 'noun',
  'أَفْعَال': 'noun',
  'أَفْعِلَة': 'noun',
  'فَعَائِل': 'noun',
  'مَفَاعِل': 'noun',
  'مَفَاعِيل': 'noun',
  'فَوَاعِل': 'noun',
  'أَفَاعِيل': 'noun',
  'فَعَالِيل': 'noun',
};

/**
 * Get the POS category for a given Arabic pattern.
 * Falls back to 'other' if the pattern is unknown.
 */
export function getPosCategory(pattern: string | undefined): PosCategory {
  if (!pattern) return 'other';
  // Try exact match first
  if (patternPosMap[pattern]) return patternPosMap[pattern];
  // Try without diacritics — some data may have stripped diacritics
  const stripped = pattern.replace(/[\u064B-\u0652\u0670]/g, '');
  if (patternPosMap[stripped]) return patternPosMap[stripped];
  // Check for common prefixes that indicate participles
  if (stripped.startsWith('م') && stripped.length >= 4) {
    // Heuristic: مُ prefix words are often participles
    return 'other';
  }
  return 'other';
}
