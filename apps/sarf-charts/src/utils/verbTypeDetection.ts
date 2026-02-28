export type VerbType = 'sahih' | 'ajwaf' | 'naaqis' | 'mithaal' | "mudaa'af";

export interface VerbTypeLabel {
  ar: string;
  en: string;
}

export const verbTypeLabels: Record<VerbType, VerbTypeLabel> = {
  sahih: { ar: 'صحيح', en: 'Sahih' },
  ajwaf: { ar: 'أجوف', en: 'Ajwaf' },
  naaqis: { ar: 'ناقص', en: 'Naaqis' },
  mithaal: { ar: 'مثال', en: 'Mithaal' },
  "mudaa'af": { ar: 'مضاعف', en: "Mudaa'af" },
};

/**
 * Detects the verb type based on root letter patterns
 */
export function detectVerbType(root: string): VerbType {
  if (!root || typeof root !== 'string') {
    throw new Error('Invalid input: root must be a non-empty string');
  }

  const letters = root.split('').filter(c => c.trim().length > 0);

  if (letters.length < 3) {
    throw new Error(`Invalid root: ${root} (must have at least 3 letters)`);
  }

  if (letters.length > 3) {
    console.warn(`4-letter root detected: ${root}, defaulting to sahih`);
    return 'sahih';
  }

  const [fa, ain, lam] = letters;

  if (!fa || !ain || !lam) {
    throw new Error(`Invalid root: ${root} (must have exactly 3 letters)`);
  }

  // Mudaa'af (doubled): 2nd and 3rd radicals same
  if (ain === lam) {
    return "mudaa'af";
  }

  // Mithaal: 1st radical is و or ي
  if (fa === 'و' || fa === 'ي') {
    return 'mithaal';
  }

  // Ajwaf: 2nd radical is و or ي
  if (ain === 'و' || ain === 'ي') {
    return 'ajwaf';
  }

  // Naaqis: 3rd radical is و or ي
  if (lam === 'و' || lam === 'ي') {
    return 'naaqis';
  }

  // Default: Sahih (sound verb)
  return 'sahih';
}
