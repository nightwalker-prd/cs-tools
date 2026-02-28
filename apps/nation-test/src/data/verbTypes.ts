/**
 * Verb Type Definitions for Weak Verb Coverage
 *
 * 7 verb type categories mapped from the conjugation app's
 * fine-grained type classification in arabicRoots.ts.
 */

export type VerbType =
  | 'sound'        // صحيح - Regular
  | 'hollow'       // أجوف - Weak middle radical (و/ي)
  | 'defective'    // ناقص - Weak final radical (و/ي)
  | 'assimilated'  // مثال - Weak first radical (و/ي)
  | 'doubled'      // مضاعف - Doubled 2nd & 3rd radicals
  | 'hamzated'     // مهموز - Hamza as a radical
  | 'doubly_weak'; // لفيف - Two weak radicals

export const verbTypeLabels: Record<VerbType, { english: string; arabic: string }> = {
  sound:       { english: 'Sound',       arabic: 'صحيح' },
  hollow:      { english: 'Hollow',      arabic: 'أجوف' },
  defective:   { english: 'Defective',   arabic: 'ناقص' },
  assimilated: { english: 'Assimilated', arabic: 'مثال' },
  doubled:     { english: 'Doubled',     arabic: 'مضاعف' },
  hamzated:    { english: 'Hamzated',    arabic: 'مهموز' },
  doubly_weak: { english: 'Doubly Weak', arabic: 'لفيف' },
};

/**
 * Maps arabicRoots.ts type strings → VerbType
 */
export const VERB_TYPE_FROM_ARABIC_ROOTS: Record<string, VerbType> = {
  'Regular': 'sound',
  'Ajwaf': 'hollow',
  'Naqis': 'defective',
  'Mithal': 'assimilated',
  "Mudaa'af": 'doubled',
  "Mahmooz al-Fa'": 'hamzated',
  "Mahmooz al-'Ayn": 'hamzated',
  'Mahmooz al-Lam': 'hamzated',
  'Lafif Maqroon': 'doubly_weak',
  'Lafif Mafrooq': 'doubly_weak',
};

/**
 * Detect verb type from a root string (e.g., "ك-ت-ب").
 * Uses positional analysis of root letters.
 */
export function detectVerbTypeFromRoot(root: string): VerbType {
  // Normalize: handle both "ك-ت-ب" and "ك ت ب" formats
  const letters = root.replace(/[-\s]/g, '').split('').filter(ch =>
    /[\u0621-\u064A]/.test(ch)
  );

  if (letters.length < 3) return 'sound';

  const weakLetters = ['و', 'ي'];
  const hamza = 'ء';
  // Also check for alif variants that indicate hamza
  const hamzaVariants = ['أ', 'إ', 'ؤ', 'ئ', 'ء'];

  const first = letters[0];
  const second = letters[1];
  const third = letters[2];

  const firstIsWeak = weakLetters.includes(first);
  const secondIsWeak = weakLetters.includes(second);
  const thirdIsWeak = weakLetters.includes(third);
  const firstIsHamza = hamzaVariants.includes(first) || first === hamza;
  const secondIsHamza = hamzaVariants.includes(second) || second === hamza;
  const thirdIsHamza = hamzaVariants.includes(third) || third === hamza;

  // Doubly weak (two weak radicals)
  const weakCount = [firstIsWeak, secondIsWeak, thirdIsWeak].filter(Boolean).length;
  if (weakCount >= 2) return 'doubly_weak';

  // Doubled (2nd and 3rd radicals are identical)
  if (second === third) return 'doubled';

  // Hamzated (any radical is hamza)
  if (firstIsHamza || secondIsHamza || thirdIsHamza) return 'hamzated';

  // Hollow (weak middle radical)
  if (secondIsWeak) return 'hollow';

  // Defective (weak final radical)
  if (thirdIsWeak) return 'defective';

  // Assimilated (weak first radical)
  if (firstIsWeak) return 'assimilated';

  return 'sound';
}
