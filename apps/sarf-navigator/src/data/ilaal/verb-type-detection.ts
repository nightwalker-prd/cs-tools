import type { ExtendedVerbType, SarfVerbType } from './types';

const WEAK_LETTERS = ['و', 'ي'];
const HAMZA = 'ء';

/**
 * Detects the extended verb type (13 subtypes) from a 3-letter Arabic root.
 * Handles hamzated, lafif, and waawi/yaai distinctions.
 */
export function detectExtendedVerbType(root: string): ExtendedVerbType {
  const letters = root.split('').filter(c => c.trim().length > 0);

  if (letters.length < 3) {
    return 'sahih';
  }

  const [fa, ain, lam] = letters;

  // Check for hamzated first (hamza in any position)
  const faIsHamza = fa === HAMZA || fa === 'أ' || fa === 'إ' || fa === 'آ';
  const ainIsHamza = ain === HAMZA;
  const lamIsHamza = lam === HAMZA;

  // Check for weak letters
  const faIsWeak = WEAK_LETTERS.includes(fa);
  const ainIsWeak = WEAK_LETTERS.includes(ain);
  const lamIsWeak = WEAK_LETTERS.includes(lam);

  // Lafif: two weak letters in the root
  if (faIsWeak && lamIsWeak) {
    return 'lafif-mafrooq'; // separated: faa' and laam are weak
  }
  if (ainIsWeak && lamIsWeak) {
    return 'lafif-maqroon'; // joined: 'ayn and laam are weak
  }

  // Mudaa'af: 2nd and 3rd radicals identical
  if (ain === lam) {
    return "mudaa'af";
  }

  // Hamzated (after lafif/mudaa'af checks)
  if (faIsHamza) return 'mahmooz-faa';
  if (ainIsHamza) return 'mahmooz-ayn';
  if (lamIsHamza) return 'mahmooz-lam';

  // Mithaal: 1st radical is weak
  if (faIsWeak) {
    return fa === 'و' ? 'mithaal-waawi' : 'mithaal-yaai';
  }

  // Ajwaf: 2nd radical is weak
  if (ainIsWeak) {
    return ain === 'و' ? 'ajwaf-waawi' : 'ajwaf-yaai';
  }

  // Naaqis: 3rd radical is weak
  if (lamIsWeak) {
    return lam === 'و' ? 'naaqis-waawi' : 'naaqis-yaai';
  }

  return 'sahih';
}

/**
 * Maps an extended verb type to @arabiyya/sarf's 5 verb type keys.
 *
 * Hamzated verbs → 'sahih' (sarf treats them as sound)
 * Lafif maqroon → 'naaqis' (laam is the primary weak letter)
 * Lafif mafrooq → 'mithaal' (faa' is the primary weak letter)
 */
export function extendedToSarfType(ext: ExtendedVerbType): SarfVerbType {
  switch (ext) {
    case 'sahih':
    case 'mahmooz-faa':
    case 'mahmooz-ayn':
    case 'mahmooz-lam':
      return 'sahih';
    case "mudaa'af":
      return "mudaa'af";
    case 'mithaal-waawi':
    case 'mithaal-yaai':
    case 'lafif-mafrooq':
      return 'mithaal';
    case 'ajwaf-waawi':
    case 'ajwaf-yaai':
      return 'ajwaf';
    case 'naaqis-waawi':
    case 'naaqis-yaai':
    case 'lafif-maqroon':
      return 'naaqis';
  }
}

/** Get a human-readable category name for the extended type */
export function getExtendedCategory(ext: ExtendedVerbType): 'sound' | 'doubled' | 'weak' | 'hamzated' | 'lafif' {
  if (ext === 'sahih') return 'sound';
  if (ext === "mudaa'af") return 'doubled';
  if (ext.startsWith('mahmooz')) return 'hamzated';
  if (ext.startsWith('lafif')) return 'lafif';
  return 'weak';
}
