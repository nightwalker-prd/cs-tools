import { sarf, sarfHelpers } from '@arabiyya/sarf';
import type { ForgeRoot, ForgePattern, ForgeResult } from '../types';
import { VERB_TYPE_MAP, FORM_ONE_BABS } from './verb-type-map';

/**
 * Forge a word by combining a root with a pattern.
 * Uses @arabiyya/sarf to generate real Arabic words.
 */
export function forgeWord(root: ForgeRoot, pattern: ForgePattern): ForgeResult {
  const baseResult = {
    rootId: root.id,
    patternId: pattern.id,
  };

  try {
    if (pattern.derivativeType === 'formVerb') {
      return forgeFormVerb(root, pattern);
    }

    return forgeDerivative(root, pattern);
  } catch (e) {
    return {
      ...baseResult,
      word: '',
      meaning: '',
      success: false,
      note: getFailureNote(root, pattern, e instanceof Error ? e.message : 'Unknown error'),
    };
  }
}

/** Forge a derivative (participle, masdar, etc.) from the root's own form */
function forgeDerivative(root: ForgeRoot, pattern: ForgePattern): ForgeResult {
  const baseResult = { rootId: root.id, patternId: pattern.id };
  const sarfVerbType = VERB_TYPE_MAP[root.type] || 'sahih';
  const verbTypeData = (sarf as Map<string, unknown>).get(sarfVerbType);

  if (!verbTypeData) {
    return { ...baseResult, word: '', meaning: '', success: false, note: `Verb type "${root.type}" not found in morphological database.` };
  }

  // Get the correct form chapter
  const formNumber = romanToNumber(root.verbForm);
  const chapterKey = formNumber === '1'
    ? detectFormOneBab(root, verbTypeData)
    : formNumber;

  const chapter = (verbTypeData as Map<string, { exists?: boolean }>).get(chapterKey);
  if (!chapter || !chapter.exists) {
    return { ...baseResult, word: '', meaning: '', success: false, note: `Form ${root.verbForm} is not available for ${root.type} verbs.` };
  }

  // Replace root letters
  const rootLetters = root.root.split(' ');
  const [fa, ain, lam] = rootLetters;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const conjugated = sarfHelpers.replaceRoots(chapter as any, { ف: fa, ع: ain, ل: lam });

  const sarfKabeer = (conjugated as Record<string, unknown>)['صرف كبير'] as Record<string, unknown>;
  const sarfSagheer = (conjugated as Record<string, unknown>)['صرف صغير'] as Record<string, unknown>;
  const maaroof = sarfKabeer?.معروف as Record<string, unknown> | undefined;
  const hasMajhool = sarfKabeer?.مجهول !== null && sarfKabeer?.مجهول !== undefined;

  let word = '';

  switch (pattern.derivativeType) {
    case 'activeParticiple': {
      word = ((sarfSagheer?.معروف as Record<string, string>)?.فاعل) || '';
      break;
    }
    case 'passiveParticiple': {
      if (!hasMajhool) {
        return { ...baseResult, word: '', meaning: '', success: false, note: `This verb (${root.letters}) doesn't have a passive voice, so no passive participle exists. Some verbs are inherently intransitive.` };
      }
      word = ((sarfSagheer?.مجهول as Record<string, string>)?.مفعول) || '';
      break;
    }
    case 'masdar': {
      const masdarValue = sarfSagheer?.مصدر;
      if (typeof masdarValue === 'string') {
        word = masdarValue;
      } else if (Array.isArray(masdarValue)) {
        word = masdarValue[0] || '';
      }
      break;
    }
    case 'pastVerb': {
      const pastForms = maaroof?.ماضي as Record<string, string> | undefined;
      word = pastForms?.['هُوَ'] || pastForms?.['هو'] || '';
      break;
    }
    case 'presentVerb': {
      const presentMarfoo = (maaroof?.مضارع as Record<string, unknown>)?.مرفوع as Record<string, string> | undefined;
      word = presentMarfoo?.['هُوَ'] || presentMarfoo?.['هو'] || '';
      break;
    }
    case 'placeNoun': {
      const placeNoun = generatePlaceNoun(rootLetters);
      if (placeNoun) {
        word = placeNoun;
      } else {
        return { ...baseResult, word: '', meaning: '', success: false, note: `Place noun (مَفْعَل) pattern not productive for this root. Arabic chose a different word for "the place of ${root.meaning}."` };
      }
      break;
    }
    case 'instrumentNoun': {
      const instrumentNoun = generateInstrumentNoun(rootLetters);
      if (instrumentNoun) {
        word = instrumentNoun;
      } else {
        return { ...baseResult, word: '', meaning: '', success: false, note: `Instrument noun (مِفْعَال) pattern not productive for this root.` };
      }
      break;
    }
    case 'intensive': {
      const intensive = generateIntensive(rootLetters);
      if (intensive) {
        word = intensive;
      } else {
        return { ...baseResult, word: '', meaning: '', success: false, note: `Intensive (فَعَّال) pattern not commonly attested for this root.` };
      }
      break;
    }
    default: {
      return { ...baseResult, word: '', meaning: '', success: false, note: getFailureNote(root, pattern, 'unsupported derivative type') };
    }
  }

  if (!word) {
    return { ...baseResult, word: '', meaning: '', success: false, note: getFailureNote(root, pattern, 'not found') };
  }

  const meaning = buildMeaning(root, pattern);

  return {
    ...baseResult,
    word,
    meaning,
    success: true,
    note: buildSuccessNote(root, pattern),
  };
}

/** Forge a verb in a different form (II-X) */
function forgeFormVerb(root: ForgeRoot, pattern: ForgePattern): ForgeResult {
  const baseResult = { rootId: root.id, patternId: pattern.id };
  const sarfVerbType = VERB_TYPE_MAP[root.type] || 'sahih';
  const verbTypeData = (sarf as Map<string, unknown>).get(sarfVerbType);

  if (!verbTypeData) {
    return { ...baseResult, word: '', meaning: '', success: false, note: `Verb type "${root.type}" not found.` };
  }

  const formNumber = pattern.sarfKey || '2';
  const chapter = (verbTypeData as Map<string, { exists?: boolean }>).get(formNumber);

  if (!chapter || !chapter.exists) {
    return {
      ...baseResult,
      word: '', meaning: '', success: false,
      note: `Form ${pattern.name} doesn't exist for ${root.type} (${root.letters}) verbs. Not every root works in every form — this is one of the key constraints of Arabic morphology.`,
    };
  }

  const rootLetters = root.root.split(' ');
  const [fa, ain, lam] = rootLetters;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const conjugated = sarfHelpers.replaceRoots(chapter as any, { ف: fa, ع: ain, ل: lam });

  const sarfKabeer = (conjugated as Record<string, unknown>)['صرف كبير'] as Record<string, unknown>;
  const maaroof = sarfKabeer?.معروف as Record<string, unknown> | undefined;
  const pastForms = maaroof?.ماضي as Record<string, string> | undefined;
  const word = pastForms?.['هُوَ'] || pastForms?.['هو'] || '';

  if (!word) {
    return { ...baseResult, word: '', meaning: '', success: false, note: `Could not generate Form ${pattern.name} for ${root.letters}.` };
  }

  return {
    ...baseResult,
    word,
    meaning: `Form ${pattern.name.replace('Form ', '')} of "${root.meaning}"`,
    success: true,
    note: `${pattern.desc}. The root ${root.letters} in ${pattern.name} (${pattern.nameAr}).`,
  };
}

/** Detect the correct Form I bab by matching past/present tense */
function detectFormOneBab(root: ForgeRoot, verbTypeData: unknown): string {
  const rootLetters = root.root.split(' ');
  if (rootLetters.length < 3) return 'nasara';
  const [fa, ain, lam] = rootLetters;

  for (const bab of FORM_ONE_BABS) {
    try {
      const chapter = (verbTypeData as Map<string, { exists?: boolean }>).get(bab);
      if (!chapter || !chapter.exists) continue;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const conjugated = sarfHelpers.replaceRoots(chapter as any, { ف: fa, ع: ain, ل: lam });
      const sarfKabeer = (conjugated as Record<string, unknown>)['صرف كبير'] as Record<string, unknown>;
      const maaroof = sarfKabeer?.معروف as Record<string, unknown> | undefined;
      const pastForms = maaroof?.ماضي as Record<string, string> | undefined;
      if (!pastForms) continue;

      const presentMarfoo = (maaroof?.مضارع as Record<string, unknown>)?.مرفوع as Record<string, string> | undefined;
      if (!presentMarfoo) continue;

      const huwa = pastForms['هُوَ'] || pastForms['هو'];
      const huwaPresent = presentMarfoo['هُوَ'] || presentMarfoo['هو'];

      if (huwa === root.pastTense && huwaPresent === root.presentTense) return bab;
    } catch {
      continue;
    }
  }

  return 'nasara';
}

/** Convert Roman numeral form to sarf number key */
function romanToNumber(form: string): string {
  const map: Record<string, string> = {
    'I': '1', 'II': '2', 'III': '3', 'IV': '4', 'V': '5',
    'VI': '6', 'VII': '7', 'VIII': '8', 'IX': '9', 'X': '10',
  };
  return map[form] || '1';
}

/** Generate a place noun (مَفْعَل) from root letters */
function generatePlaceNoun(rootLetters: string[]): string | null {
  if (rootLetters.length < 3) return null;
  // مَفْعَل pattern: م + فَ + عْ + لَ
  return `مَ${rootLetters[0]}ْ${rootLetters[1]}َ${rootLetters[2]}`;
}

/** Generate an instrument noun (مِفْعَال) from root letters */
function generateInstrumentNoun(rootLetters: string[]): string | null {
  if (rootLetters.length < 3) return null;
  // مِفْعَال pattern: مِ + فْ + عَ + ال
  return `مِ${rootLetters[0]}ْ${rootLetters[1]}َا${rootLetters[2]}`;
}

/** Generate an intensive form (فَعَّال) from root letters */
function generateIntensive(rootLetters: string[]): string | null {
  if (rootLetters.length < 3) return null;
  // فَعَّال pattern: فَ + عَّ + ال
  return `${rootLetters[0]}َ${rootLetters[1]}َّا${rootLetters[2]}`;
}

/** Build a meaning string for successful forges */
function buildMeaning(root: ForgeRoot, pattern: ForgePattern): string {
  const base = root.meaning?.replace(/^to /, '') || '';
  switch (pattern.derivativeType) {
    case 'activeParticiple':
      return `One who ${base}s`;
    case 'passiveParticiple':
      return `That which is ${getPassiveParticiple(base)}`;
    case 'masdar':
      return `The act of ${base}ing`;
    case 'pastVerb':
      return `He ${base}${base.endsWith('e') ? 'd' : 'ed'}`;
    case 'presentVerb':
      return `He ${base}s`;
    case 'placeNoun':
      return `Place of ${base}ing`;
    case 'instrumentNoun':
      return `Tool/instrument for ${base}ing`;
    case 'intensive':
      return `One who ${base}s intensely/professionally`;
    default:
      return root.meaning || '';
  }
}

function getPassiveParticiple(base: string): string {
  if (base.endsWith('e')) return base + 'd';
  return base + 'ed';
}

/** Build an educational note for successful forges */
function buildSuccessNote(root: ForgeRoot, pattern: ForgePattern): string {
  const typeNote = root.type !== 'Regular'
    ? ` Note: ${root.letters} is a ${root.type.toLowerCase()} root, so morphological transformations may apply.`
    : '';

  return `${pattern.name} (${pattern.nameAr}) derived from the root ${root.letters} (${root.meaning}).${typeNote}`;
}

/** Build an educational note for failed forges */
function getFailureNote(root: ForgeRoot, pattern: ForgePattern, reason: string): string {
  if (reason.includes('not available')) {
    return `${pattern.name} (${pattern.nameAr}) is not attested for ${root.type} roots like ${root.letters}. Arabic morphology constrains which patterns work with which root types.`;
  }

  if (reason.includes('passive')) {
    return `The root ${root.letters} (${root.meaning}) is intransitive — it doesn't take a direct object, so no passive participle exists.`;
  }

  return `The combination of ${root.letters} + ${pattern.display} doesn't produce a standard word in Arabic. ${pattern.desc} isn't productive for this root — the language chose different patterns to express this concept.`;
}
