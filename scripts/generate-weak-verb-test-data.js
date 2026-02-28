/**
 * Generate Weak Verb Test Data
 *
 * Uses @arabiyya/sarf to generate conjugation-based test items
 * for weak (non-regular) verbs. Appends items to the 3 verb test
 * data files in nation-test.
 *
 * Run: node scripts/generate-weak-verb-test-data.js
 */

const { sarf, sarfHelpers } = require('@arabiyya/sarf');
const fs = require('fs');
const path = require('path');

// ============================================================
// Verb Type Mapping (from conjugation app)
// ============================================================

const VERB_TYPE_MAP = {
  Regular: 'sahih',
  Mithal: 'mithaal',
  Ajwaf: 'ajwaf',
  Naqis: 'naaqis',
  "Mudaa'af": "mudaa'af",
  "Mahmooz al-Fa'": 'sahih',
  "Mahmooz al-'Ayn": 'sahih',
  'Mahmooz al-Lam': 'sahih',
  'Lafif Maqroon': 'naaqis',
  'Lafif Mafrooq': 'mithaal',
};

const TYPE_TO_VERB_TYPE = {
  Regular: 'sound',
  Mithal: 'assimilated',
  Ajwaf: 'hollow',
  Naqis: 'defective',
  "Mudaa'af": 'doubled',
  "Mahmooz al-Fa'": 'hamzated',
  "Mahmooz al-'Ayn": 'hamzated',
  'Mahmooz al-Lam': 'hamzated',
  'Lafif Maqroon': 'doubly_weak',
  'Lafif Mafrooq': 'doubly_weak',
};

// Grammar notes for each verb type
const GRAMMAR_NOTES = {
  assimilated: 'Assimilated verb (مثال): the initial و drops in the present tense',
  hollow: 'Hollow verb (أجوف): the middle weak letter changes between tenses',
  defective: 'Defective verb (ناقص): the final weak letter changes with conjugation',
  doubled: 'Doubled verb (مضاعف): the 2nd and 3rd radicals merge with shaddah',
  hamzated: 'Hamzated verb (مهموز): the hamza undergoes spelling changes',
  doubly_weak: 'Doubly weak verb (لفيف): two weak radicals cause compound changes',
};

// ============================================================
// Weak Verb Data (from arabicRoots.ts)
// ============================================================

const weakVerbs = [
  // Mithal (assimilated) - 8 verbs
  { root: 'و ص ل', pastTense: 'وَصَلَ', presentTense: 'يَصِلُ', gerund: 'وُصُول', type: 'Mithal', form: 'I', meaning: 'to arrive, reach' },
  { root: 'و ج د', pastTense: 'وَجَدَ', presentTense: 'يَجِدُ', gerund: 'وُجُود', type: 'Mithal', form: 'I', meaning: 'to find' },
  { root: 'و ق ف', pastTense: 'وَقَفَ', presentTense: 'يَقِفُ', gerund: 'وُقُوف', type: 'Mithal', form: 'I', meaning: 'to stop, stand' },
  { root: 'و ض ع', pastTense: 'وَضَعَ', presentTense: 'يَضَعُ', gerund: 'وَضْع', type: 'Mithal', form: 'I', meaning: 'to put, place' },
  { root: 'و ع د', pastTense: 'وَعَدَ', presentTense: 'يَعِدُ', gerund: 'وَعْد', type: 'Mithal', form: 'I', meaning: 'to promise' },
  { root: 'و ل د', pastTense: 'وَلَدَ', presentTense: 'يَلِدُ', gerund: 'وِلَادَة', type: 'Mithal', form: 'I', meaning: 'to give birth' },
  { root: 'و ز ن', pastTense: 'وَزَنَ', presentTense: 'يَزِنُ', gerund: 'وَزْن', type: 'Mithal', form: 'I', meaning: 'to weigh' },
  { root: 'و ر ث', pastTense: 'وَرِثَ', presentTense: 'يَرِثُ', gerund: 'وِرَاثَة', type: 'Mithal', form: 'I', meaning: 'to inherit' },

  // Ajwaf (hollow) - 8 verbs
  { root: 'ق و ل', pastTense: 'قَالَ', presentTense: 'يَقُولُ', gerund: 'قَوْل', type: 'Ajwaf', form: 'I', meaning: 'to say, speak' },
  { root: 'ب ي ع', pastTense: 'بَاعَ', presentTense: 'يَبِيعُ', gerund: 'بَيْع', type: 'Ajwaf', form: 'I', meaning: 'to sell' },
  { root: 'ن و م', pastTense: 'نَامَ', presentTense: 'يَنَامُ', gerund: 'نَوْم', type: 'Ajwaf', form: 'I', meaning: 'to sleep' },
  { root: 'ص و م', pastTense: 'صَامَ', presentTense: 'يَصُومُ', gerund: 'صَوْم', type: 'Ajwaf', form: 'I', meaning: 'to fast' },
  { root: 'ز و ر', pastTense: 'زَارَ', presentTense: 'يَزُورُ', gerund: 'زِيَارَة', type: 'Ajwaf', form: 'I', meaning: 'to visit' },
  { root: 'ع و د', pastTense: 'عَادَ', presentTense: 'يَعُودُ', gerund: 'عَوْدَة', type: 'Ajwaf', form: 'I', meaning: 'to return' },
  { root: 'ق و م', pastTense: 'قَامَ', presentTense: 'يَقُومُ', gerund: 'قِيَام', type: 'Ajwaf', form: 'I', meaning: 'to stand, rise' },
  { root: 'خ و ف', pastTense: 'خَافَ', presentTense: 'يَخَافُ', gerund: 'خَوْف', type: 'Ajwaf', form: 'I', meaning: 'to fear' },

  // Naqis (defective) - 8 verbs
  { root: 'م ش ي', pastTense: 'مَشَى', presentTense: 'يَمْشِي', gerund: 'مَشْي', type: 'Naqis', form: 'I', meaning: 'to walk' },
  { root: 'ب ك ي', pastTense: 'بَكَى', presentTense: 'يَبْكِي', gerund: 'بُكَاء', type: 'Naqis', form: 'I', meaning: 'to weep, cry' },
  { root: 'ر م ي', pastTense: 'رَمَى', presentTense: 'يَرْمِي', gerund: 'رَمْي', type: 'Naqis', form: 'I', meaning: 'to throw' },
  { root: 'ق ض ي', pastTense: 'قَضَى', presentTense: 'يَقْضِي', gerund: 'قَضَاء', type: 'Naqis', form: 'I', meaning: 'to decree, judge' },
  { root: 'د ع و', pastTense: 'دَعَا', presentTense: 'يَدْعُو', gerund: 'دَعْوَة', type: 'Naqis', form: 'I', meaning: 'to call, invoke' },
  { root: 'ر ج و', pastTense: 'رَجَا', presentTense: 'يَرْجُو', gerund: 'رَجَاء', type: 'Naqis', form: 'I', meaning: 'to hope' },
  { root: 'ن س ي', pastTense: 'نَسِيَ', presentTense: 'يَنْسَى', gerund: 'نِسْيَان', type: 'Naqis', form: 'I', meaning: 'to forget' },
  { root: 'ب ق ي', pastTense: 'بَقِيَ', presentTense: 'يَبْقَى', gerund: 'بَقَاء', type: 'Naqis', form: 'I', meaning: 'to remain' },

  // Mudaa'af (doubled) - 10 verbs
  { root: 'ر د د', pastTense: 'رَدَّ', presentTense: 'يَرُدُّ', gerund: 'رَدّ', type: "Mudaa'af", form: 'I', meaning: 'to return, reply' },
  { root: 'م د د', pastTense: 'مَدَّ', presentTense: 'يَمُدُّ', gerund: 'مَدّ', type: "Mudaa'af", form: 'I', meaning: 'to extend, stretch' },
  { root: 'ع د د', pastTense: 'عَدَّ', presentTense: 'يَعُدُّ', gerund: 'عَدّ', type: "Mudaa'af", form: 'I', meaning: 'to count' },
  { root: 'ح ل ل', pastTense: 'حَلَّ', presentTense: 'يَحُلُّ', gerund: 'حَلّ', type: "Mudaa'af", form: 'I', meaning: 'to untie, solve' },
  { root: 'ت م م', pastTense: 'تَمَّ', presentTense: 'يَتِمُّ', gerund: 'تَمَام', type: "Mudaa'af", form: 'I', meaning: 'to be complete' },
  { root: 'ض ل ل', pastTense: 'ضَلَّ', presentTense: 'يَضِلُّ', gerund: 'ضَلَال', type: "Mudaa'af", form: 'I', meaning: 'to go astray' },
  { root: 'م ر ر', pastTense: 'مَرَّ', presentTense: 'يَمُرُّ', gerund: 'مُرُور', type: "Mudaa'af", form: 'I', meaning: 'to pass by' },
  { root: 'ف ر ر', pastTense: 'فَرَّ', presentTense: 'يَفِرُّ', gerund: 'فِرَار', type: "Mudaa'af", form: 'I', meaning: 'to flee' },
  { root: 'ش د د', pastTense: 'شَدَّ', presentTense: 'يَشُدُّ', gerund: 'شَدّ', type: "Mudaa'af", form: 'I', meaning: 'to tighten, pull' },
  { root: 'س د د', pastTense: 'سَدَّ', presentTense: 'يَسُدُّ', gerund: 'سَدّ', type: "Mudaa'af", form: 'I', meaning: 'to block, close' },

  // Mahmooz al-Fa' (hamzated) - 5 verbs
  { root: 'أ خ ذ', pastTense: 'أَخَذَ', presentTense: 'يَأْخُذُ', gerund: 'أَخْذ', type: "Mahmooz al-Fa'", form: 'I', meaning: 'to take' },
  { root: 'أ ك ل', pastTense: 'أَكَلَ', presentTense: 'يَأْكُلُ', gerund: 'أَكْل', type: "Mahmooz al-Fa'", form: 'I', meaning: 'to eat' },
  { root: 'أ م ر', pastTense: 'أَمَرَ', presentTense: 'يَأْمُرُ', gerund: 'أَمْر', type: "Mahmooz al-Fa'", form: 'I', meaning: 'to command' },
  { root: 'أ م ن', pastTense: 'أَمِنَ', presentTense: 'يَأْمَنُ', gerund: 'أَمَان', type: "Mahmooz al-Fa'", form: 'I', meaning: 'to be safe' },
  { root: 'أ ذ ن', pastTense: 'أَذِنَ', presentTense: 'يَأْذَنُ', gerund: 'إِذْن', type: "Mahmooz al-Fa'", form: 'I', meaning: 'to permit' },

  // Mahmooz al-'Ayn - 3 verbs
  { root: 'س أ ل', pastTense: 'سَأَلَ', presentTense: 'يَسْأَلُ', gerund: 'سُؤَال', type: "Mahmooz al-'Ayn", form: 'I', meaning: 'to ask' },
  { root: 'ر أ ي', pastTense: 'رَأَى', presentTense: 'يَرَى', gerund: 'رَأْي', type: "Mahmooz al-'Ayn", form: 'I', meaning: 'to see' },

  // Mahmooz al-Lam - 5 verbs
  { root: 'ق ر أ', pastTense: 'قَرَأَ', presentTense: 'يَقْرَأُ', gerund: 'قِرَاءَة', type: 'Mahmooz al-Lam', form: 'I', meaning: 'to read' },
  { root: 'ب د أ', pastTense: 'بَدَأَ', presentTense: 'يَبْدَأُ', gerund: 'بَدْء', type: 'Mahmooz al-Lam', form: 'I', meaning: 'to begin' },
  { root: 'ن ش أ', pastTense: 'نَشَأَ', presentTense: 'يَنْشَأُ', gerund: 'نَشْأَة', type: 'Mahmooz al-Lam', form: 'I', meaning: 'to grow up' },
  { root: 'م ل أ', pastTense: 'مَلَأَ', presentTense: 'يَمْلَأُ', gerund: 'مَلْء', type: 'Mahmooz al-Lam', form: 'I', meaning: 'to fill' },

  // Lafif Maqroon (doubly weak) - 5 verbs
  { root: 'ط و ي', pastTense: 'طَوَى', presentTense: 'يَطْوِي', gerund: 'طَيّ', type: 'Lafif Maqroon', form: 'I', meaning: 'to fold, roll up' },
  { root: 'ر و ي', pastTense: 'رَوَى', presentTense: 'يَرْوِي', gerund: 'رِوَايَة', type: 'Lafif Maqroon', form: 'I', meaning: 'to narrate' },
  { root: 'ن و ي', pastTense: 'نَوَى', presentTense: 'يَنْوِي', gerund: 'نِيَّة', type: 'Lafif Maqroon', form: 'I', meaning: 'to intend' },
  { root: 'ه و ي', pastTense: 'هَوَى', presentTense: 'يَهْوِي', gerund: 'هَوَاء', type: 'Lafif Maqroon', form: 'I', meaning: 'to fall, plunge' },

  // Lafif Mafrooq (doubly weak) - 4 verbs
  { root: 'و ق ي', pastTense: 'وَقَى', presentTense: 'يَقِي', gerund: 'وِقَايَة', type: 'Lafif Mafrooq', form: 'I', meaning: 'to protect' },
  { root: 'و ف ي', pastTense: 'وَفَى', presentTense: 'يَفِي', gerund: 'وَفَاء', type: 'Lafif Mafrooq', form: 'I', meaning: 'to fulfill' },
  { root: 'و ل ي', pastTense: 'وَلِيَ', presentTense: 'يَلِي', gerund: 'وِلَايَة', type: 'Lafif Mafrooq', form: 'I', meaning: 'to be in charge' },

  // Derived form weak verbs
  { root: 'ق و م', pastTense: 'أَقَامَ', presentTense: 'يُقِيمُ', gerund: 'إِقَامَة', type: 'Ajwaf', form: 'IV', meaning: 'to establish' },
  { root: 'ع ط ي', pastTense: 'أَعْطَى', presentTense: 'يُعْطِي', gerund: 'إِعْطَاء', type: 'Naqis', form: 'IV', meaning: 'to give' },
  { root: 'أ م ن', pastTense: 'آمَنَ', presentTense: 'يُؤْمِنُ', gerund: 'إِيمَان', type: "Mahmooz al-Fa'", form: 'IV', meaning: 'to believe' },
  { root: 'ح و ج', pastTense: 'اِحْتَاجَ', presentTense: 'يَحْتَاجُ', gerund: 'اِحْتِيَاج', type: 'Ajwaf', form: 'VIII', meaning: 'to need' },
  { root: 'ص ل ي', pastTense: 'صَلَّى', presentTense: 'يُصَلِّي', gerund: 'تَصْلِيَة', type: 'Naqis', form: 'II', meaning: 'to pray' },
  { root: 'ز ك ي', pastTense: 'زَكَّى', presentTense: 'يُزَكِّي', gerund: 'تَزْكِيَة', type: 'Naqis', form: 'II', meaning: 'to purify' },
  { root: 'م ن ي', pastTense: 'تَمَنَّى', presentTense: 'يَتَمَنَّى', gerund: 'تَمَنِّي', type: 'Naqis', form: 'V', meaning: 'to wish' },
  { root: 'ح ق ق', pastTense: 'حَقَّقَ', presentTense: 'يُحَقِّقُ', gerund: 'تَحْقِيق', type: "Mudaa'af", form: 'II', meaning: 'to achieve' },
];

// ============================================================
// Sarf Helpers
// ============================================================

const FORM_ONE_BABS = ['nasara', 'daraba', 'fataha', "sami'a", 'hasiba', 'karuma'];

const PERSON_MAP = {
  'هُوَ': '3sm',
  'هِيَ': '3sf',
  'أَنْتَ': '2sm',
  'أَنْتِ': '2sf',
  'أَنَا': '1s',
  'نَحْنُ': '1p',
  'أَنْتُمْ': '2pm',
  'هُمْ': '3pm',
};

const PERSON_LABELS = {
  '3sm': 'he (هو)',
  '3sf': 'she (هي)',
  '2sm': 'you m.s. (أنتَ)',
  '2sf': 'you f.s. (أنتِ)',
  '1s': 'I (أنا)',
  '1p': 'we (نحن)',
  '2pm': 'you m.p. (أنتم)',
  '3pm': 'they m. (هم)',
};

const TENSE_LABELS = {
  past: 'Past (الماضي)',
  present: 'Present (المضارع)',
  imperative: 'Imperative (الأمر)',
};

function getFormChapterKey(form) {
  if (form === 'I') return null; // Will use bab detection
  const map = { II: '2', III: '3', IV: '4', V: '5', VI: '6', VII: '7', VIII: '8', IX: '9', X: '10' };
  return map[form];
}

function removeDiacritics(str) {
  return str.replace(/[\u064B-\u065F\u0670]/g, '');
}

function getRootDashed(root) {
  return root.split(' ').join('-');
}

/**
 * Detect the correct Form I bab by matching stored past+present tense
 */
function detectBab(sarfVerbType, rootLetters, pastTense, presentTense) {
  const verbTypeData = sarf.get(sarfVerbType);
  if (!verbTypeData) return 'nasara';

  const [fa, ain, lam] = rootLetters;

  for (const bab of FORM_ONE_BABS) {
    try {
      const chapter = verbTypeData.get(bab);
      if (!chapter || !chapter.exists) continue;

      const conjugated = sarfHelpers.replaceRoots(chapter, { ف: fa, ع: ain, ل: lam });
      const maaroof = conjugated['صرف كبير'].معروف;
      const huwa = maaroof.ماضي?.['هُوَ'];
      const huwaPresent = maaroof.مضارع?.مرفوع?.['هُوَ'];

      if (huwa === pastTense && huwaPresent === presentTense) return bab;
    } catch {
      continue;
    }
  }

  return 'nasara';
}

/**
 * Get full conjugation data for a verb
 */
function getConjugation(verb) {
  const sarfVerbType = VERB_TYPE_MAP[verb.type];
  if (!sarfVerbType) return null;

  const verbTypeData = sarf.get(sarfVerbType);
  if (!verbTypeData) return null;

  const rootLetters = verb.root.split(' ').filter(c => c.length > 0);
  if (rootLetters.length < 3) return null;

  const [fa, ain, lam] = rootLetters;

  let chapterKey;
  if (verb.form === 'I') {
    chapterKey = detectBab(sarfVerbType, rootLetters, verb.pastTense, verb.presentTense);
  } else {
    chapterKey = getFormChapterKey(verb.form);
  }

  try {
    const chapter = verbTypeData.get(chapterKey);
    if (!chapter || !chapter.exists) return null;

    const conjugated = sarfHelpers.replaceRoots(chapter, { ف: fa, ع: ain, ل: lam });
    const kabeer = conjugated['صرف كبير'];
    const sagheer = conjugated['صرف صغير'];
    const maaroof = kabeer.معروف;
    const majhool = kabeer.مجهول;

    return {
      activePast: maaroof?.ماضي || {},
      activePresent: maaroof?.مضارع?.مرفوع || {},
      imperative: maaroof?.أمر || {},
      passivePast: majhool?.ماضي || {},
      activeParticiple: sagheer?.معروف?.فاعل || '',
      passiveParticiple: sagheer?.مجهول?.مفعول || '',
      masdar: sagheer?.مصدر || '',
    };
  } catch (e) {
    console.error(`Failed to conjugate ${verb.root} (${verb.type} Form ${verb.form}):`, e.message);
    return null;
  }
}

// ============================================================
// Generate Verb Conjugation Items
// ============================================================

function generateConjugationItems() {
  const items = [];
  let counter = 1;

  // Select person/tense combos per verb type
  const COMBOS = [
    { person: 'هُوَ', personCode: '3sm', tense: 'past', key: 'activePast' },
    { person: 'هُوَ', personCode: '3sm', tense: 'present', key: 'activePresent' },
    { person: 'أَنَا', personCode: '1s', tense: 'past', key: 'activePast' },
    { person: 'أَنْتَ', personCode: '2sm', tense: 'imperative', key: 'imperative' },
  ];

  for (const verb of weakVerbs) {
    if (verb.form !== 'I') continue; // Conjugation items for Form I only

    const conj = getConjugation(verb);
    if (!conj) continue;

    const verbType = TYPE_TO_VERB_TYPE[verb.type];
    const rootDashed = getRootDashed(verb.root);
    const level = counter <= 20 ? '1k' : counter <= 40 ? '2k' : counter <= 60 ? '3k' : '5k';

    for (const combo of COMBOS) {
      const answer = conj[combo.key]?.[combo.person];
      if (!answer) continue;

      // Build distractors from other forms of same verb
      const distractors = [];
      const usedAnswers = new Set([answer]);

      // Add forms from other tenses/persons as distractors
      const distractorSources = [
        conj.activePast?.['هُوَ'],
        conj.activePresent?.['هُوَ'],
        conj.activePast?.['أَنَا'],
        conj.activePresent?.['أَنَا'],
        conj.imperative?.['أَنْتَ'],
        conj.activePast?.['هِيَ'],
        conj.activePresent?.['هِيَ'],
        conj.activePast?.['هُمْ'],
        conj.activePresent?.['هُمْ'],
      ];

      for (const d of distractorSources) {
        if (d && !usedAnswers.has(d) && distractors.length < 3) {
          distractors.push(d);
          usedAnswers.add(d);
        }
      }

      // Skip if we don't have enough distractors
      if (distractors.length < 3) continue;

      const id = `vc-weak-${String(counter).padStart(3, '0')}`;
      counter++;

      items.push({
        id,
        level,
        root: rootDashed,
        baseVerb: removeDiacritics(verb.pastTense),
        baseVerbVocalized: verb.pastTense,
        meaning: verb.meaning,
        form: verb.form,
        tense: combo.tense,
        person: combo.personCode,
        promptText: `Conjugate for: ${PERSON_LABELS[combo.personCode]} (${TENSE_LABELS[combo.tense]})`,
        correctAnswer: answer,
        distractors,
        verbType,
        grammarNote: GRAMMAR_NOTES[verbType],
      });
    }
  }

  return items;
}

// ============================================================
// Generate Verb Form ID Items
// ============================================================

function generateFormIdItems() {
  const items = [];
  let counter = 1;

  // Use derived form weak verbs
  const derivedFormVerbs = weakVerbs.filter(v => v.form !== 'I');

  for (const verb of derivedFormVerbs) {
    const verbType = TYPE_TO_VERB_TYPE[verb.type];
    const rootDashed = getRootDashed(verb.root);
    const level = counter <= 10 ? '1k' : counter <= 20 ? '2k' : '3k';
    const formNumber = { I: 1, II: 2, III: 3, IV: 4, V: 5, VI: 6, VII: 7, VIII: 8, IX: 9, X: 10 }[verb.form];

    // Generate distractor forms
    const allForms = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];
    const distractors = allForms
      .filter(f => f !== verb.form)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);

    const formMeanings = {
      II: 'Intensive/Causative', III: 'Reciprocal', IV: 'Causative',
      V: 'Reflexive of II', VI: 'Reciprocal/Pretend', VII: 'Passive/Reflexive',
      VIII: 'Reflexive/Middle', IX: 'Colors/Defects', X: 'Seeking/Consider'
    };

    const formPatterns = {
      II: 'Doubled middle radical (shaddah)',
      IV: 'Prefix أ in past, ي prefix + sukun in present',
      V: 'Prefix تَ + doubled middle radical',
      VIII: 'Infix ت after first radical',
    };

    // Past tense item
    items.push({
      id: `vfid-weak-${String(counter).padStart(3, '0')}`,
      level,
      verb: removeDiacritics(verb.pastTense),
      verbVocalized: verb.pastTense,
      root: rootDashed,
      meaning: verb.meaning,
      correctForm: verb.form,
      distractors,
      tense: 'past',
      formCharacteristics: formPatterns[verb.form] || `Form ${verb.form} pattern`,
      formMeaning: formMeanings[verb.form] || '',
      verbType,
    });
    counter++;

    // Present tense item
    const presDistr = allForms
      .filter(f => f !== verb.form)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);

    items.push({
      id: `vfid-weak-${String(counter).padStart(3, '0')}`,
      level,
      verb: removeDiacritics(verb.presentTense),
      verbVocalized: verb.presentTense,
      root: rootDashed,
      meaning: verb.meaning,
      correctForm: verb.form,
      distractors: presDistr,
      tense: 'present',
      formCharacteristics: formPatterns[verb.form] || `Form ${verb.form} pattern`,
      formMeaning: formMeanings[verb.form] || '',
      verbType,
    });
    counter++;
  }

  // Also generate for Form I weak verbs (focus on recognizing Form I pattern with weak letters)
  for (const verb of weakVerbs.filter(v => v.form === 'I').slice(0, 20)) {
    const verbType = TYPE_TO_VERB_TYPE[verb.type];
    const rootDashed = getRootDashed(verb.root);
    const level = counter <= 30 ? '1k' : counter <= 50 ? '2k' : '3k';
    const allForms = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];
    const distractors = allForms
      .filter(f => f !== 'I')
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);

    items.push({
      id: `vfid-weak-${String(counter).padStart(3, '0')}`,
      level,
      verb: removeDiacritics(verb.pastTense),
      verbVocalized: verb.pastTense,
      root: rootDashed,
      meaning: verb.meaning,
      correctForm: 'I',
      distractors,
      tense: 'past',
      formCharacteristics: 'Three root letters with no additions',
      formMeaning: 'Basic meaning',
      verbType,
    });
    counter++;

    items.push({
      id: `vfid-weak-${String(counter).padStart(3, '0')}`,
      level,
      verb: removeDiacritics(verb.presentTense),
      verbVocalized: verb.presentTense,
      root: rootDashed,
      meaning: verb.meaning,
      correctForm: 'I',
      distractors: allForms.filter(f => f !== 'I').sort(() => Math.random() - 0.5).slice(0, 3),
      tense: 'present',
      formCharacteristics: 'Three root letters with no additions',
      formMeaning: 'Basic meaning',
      verbType,
    });
    counter++;
  }

  return items;
}

// ============================================================
// Generate Word Derivation Items
// ============================================================

function generateDerivationItems() {
  const items = [];
  let counter = 1;

  for (const verb of weakVerbs) {
    if (verb.form !== 'I') continue;

    const conj = getConjugation(verb);
    if (!conj) continue;

    const verbType = TYPE_TO_VERB_TYPE[verb.type];
    const rootDashed = getRootDashed(verb.root);
    const level = counter <= 20 ? '1k' : counter <= 40 ? '2k' : counter <= 60 ? '3k' : '5k';

    // Active participle
    if (conj.activeParticiple) {
      const distractors = [
        conj.passiveParticiple,
        conj.masdar,
        verb.pastTense,
      ].filter(Boolean).filter(d => d !== conj.activeParticiple);

      if (distractors.length >= 2) {
        // Pad to 3 if needed
        while (distractors.length < 3) {
          distractors.push(conj.activePast?.['هِيَ'] || verb.gerund);
        }

        items.push({
          id: `deriv-weak-${String(counter).padStart(3, '0')}`,
          level,
          root: rootDashed,
          sourceWord: removeDiacritics(verb.pastTense),
          sourceWordVocalized: verb.pastTense,
          sourceWordMeaning: verb.meaning,
          sourceType: `Form ${verb.form} verb`,
          derivationType: 'active_participle',
          prompt: 'Form the active participle (اسم الفاعل)',
          correctAnswer: removeDiacritics(conj.activeParticiple),
          correctAnswerVocalized: conj.activeParticiple,
          correctAnswerMeaning: `one who ${verb.meaning.replace(/^to /, '')}s`,
          distractors: distractors.slice(0, 3),
          pattern: 'فَاعِل',
          patternArabic: 'فاعل',
          explanation: `Active participle of a ${verbType} verb: may show changes due to weak radical`,
          verbType,
        });
        counter++;
      }
    }

    // Passive participle
    if (conj.passiveParticiple) {
      const distractors = [
        conj.activeParticiple,
        conj.masdar,
        verb.pastTense,
      ].filter(Boolean).filter(d => d !== conj.passiveParticiple);

      if (distractors.length >= 2) {
        while (distractors.length < 3) {
          distractors.push(conj.activePast?.['هِيَ'] || verb.gerund);
        }

        items.push({
          id: `deriv-weak-${String(counter).padStart(3, '0')}`,
          level,
          root: rootDashed,
          sourceWord: removeDiacritics(verb.pastTense),
          sourceWordVocalized: verb.pastTense,
          sourceWordMeaning: verb.meaning,
          sourceType: `Form ${verb.form} verb`,
          derivationType: 'passive_participle',
          prompt: 'Form the passive participle (اسم المفعول)',
          correctAnswer: removeDiacritics(conj.passiveParticiple),
          correctAnswerVocalized: conj.passiveParticiple,
          correctAnswerMeaning: `that which is ${verb.meaning.replace(/^to /, '')}ed`,
          distractors: distractors.slice(0, 3),
          pattern: 'مَفْعُول',
          patternArabic: 'مفعول',
          explanation: `Passive participle of a ${verbType} verb: may show changes due to weak radical`,
          verbType,
        });
        counter++;
      }
    }

    // Verbal noun (masdar)
    if (conj.masdar && conj.masdar !== verb.gerund) {
      // Use the sarf-generated masdar
    }
    // Always use the stored gerund as the verbal noun
    if (verb.gerund) {
      const distractors = [
        conj.activeParticiple,
        conj.passiveParticiple,
        verb.pastTense,
      ].filter(Boolean).filter(d => d !== verb.gerund);

      if (distractors.length >= 2) {
        while (distractors.length < 3) {
          distractors.push(conj.activePresent?.['هُوَ'] || verb.presentTense);
        }

        items.push({
          id: `deriv-weak-${String(counter).padStart(3, '0')}`,
          level,
          root: rootDashed,
          sourceWord: removeDiacritics(verb.pastTense),
          sourceWordVocalized: verb.pastTense,
          sourceWordMeaning: verb.meaning,
          sourceType: `Form ${verb.form} verb`,
          derivationType: 'verbal_noun',
          prompt: 'Form the verbal noun (المصدر)',
          correctAnswer: removeDiacritics(verb.gerund),
          correctAnswerVocalized: verb.gerund,
          correctAnswerMeaning: `the act of ${verb.meaning.replace(/^to /, '')}ing`,
          distractors: distractors.slice(0, 3),
          pattern: 'فَعْل/فُعُول/فِعَال',
          patternArabic: 'فعل/فعول/فعال',
          explanation: `Verbal noun (masdar) of a ${verbType} verb: pattern varies by verb type`,
          verbType,
        });
        counter++;
      }
    }
  }

  return items;
}

// ============================================================
// Format and Write Output
// ============================================================

function formatItem(item, indent = '  ') {
  const lines = [indent + '{'];
  for (const [key, val] of Object.entries(item)) {
    if (Array.isArray(val)) {
      lines.push(`${indent}  ${key}: [${val.map(v => `'${v}'`).join(', ')}],`);
    } else if (typeof val === 'string') {
      // Escape single quotes in strings
      const escaped = val.replace(/'/g, "\\'");
      lines.push(`${indent}  ${key}: '${escaped}',`);
    } else {
      lines.push(`${indent}  ${key}: ${val},`);
    }
  }
  lines.push(indent + '},');
  return lines.join('\n');
}

function writeOutput() {
  console.log('Generating weak verb test data...\n');

  const conjItems = generateConjugationItems();
  console.log(`Generated ${conjItems.length} verb conjugation items`);

  const formIdItems = generateFormIdItems();
  console.log(`Generated ${formIdItems.length} verb form ID items`);

  const derivItems = generateDerivationItems();
  console.log(`Generated ${derivItems.length} word derivation items`);

  // Write to output files
  const outDir = path.join(__dirname, '..', 'apps', 'nation-test', 'src', 'data');

  // Verb Conjugation
  const conjCode = `\n// ============================================================\n// Weak Verb Items (auto-generated by scripts/generate-weak-verb-test-data.js)\n// ============================================================\n\n` +
    conjItems.map(item => formatItem(item)).join('\n');
  fs.writeFileSync(path.join(outDir, '_generated-weak-conjugation.ts'),
    `// Auto-generated by scripts/generate-weak-verb-test-data.js\n// Do not edit directly.\n\nimport type { VerbConjugationItem } from './verbConjugation';\n\nexport const weakVerbConjugationItems: VerbConjugationItem[] = [\n${conjCode}\n];\n`);

  // Verb Form ID
  const formIdCode = formIdItems.map(item => formatItem(item)).join('\n');
  fs.writeFileSync(path.join(outDir, '_generated-weak-form-id.ts'),
    `// Auto-generated by scripts/generate-weak-verb-test-data.js\n// Do not edit directly.\n\nimport type { VerbFormIdItem } from './verbFormId';\n\nexport const weakVerbFormIdItems: VerbFormIdItem[] = [\n${formIdCode}\n];\n`);

  // Word Derivation
  const derivCode = derivItems.map(item => formatItem(item)).join('\n');
  fs.writeFileSync(path.join(outDir, '_generated-weak-derivation.ts'),
    `// Auto-generated by scripts/generate-weak-verb-test-data.js\n// Do not edit directly.\n\nimport type { WordDerivationItem } from './wordDerivation';\n\nexport const weakWordDerivationItems: WordDerivationItem[] = [\n${derivCode}\n];\n`);

  console.log('\nOutput written to:');
  console.log(`  ${path.join(outDir, '_generated-weak-conjugation.ts')}`);
  console.log(`  ${path.join(outDir, '_generated-weak-form-id.ts')}`);
  console.log(`  ${path.join(outDir, '_generated-weak-derivation.ts')}`);
  console.log('\nDone! Now import and spread these into the existing arrays.');
}

writeOutput();
