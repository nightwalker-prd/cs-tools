/**
 * Nahw (Arabic Grammar) prerequisite graph.
 *
 * Defines the dependency relationships between 43 nahw topics
 * arranged in 6 units from the FSTU curriculum.
 *
 * The graph encodes which topics must be understood before others.
 * For example, you must understand word-types before studying
 * nominal sentences, and noun-irab before understanding kana-and-sisters.
 */

import type { PrerequisiteEdge } from '../types/graph';
import { buildGraph } from './prerequisite-graph';

/**
 * All 43 nahw topic IDs organized by unit.
 */
export const NAHW_TOPIC_IDS = {
  // Unit 1: Words
  unit1: [
    'word-types',
    'definite-indefinite',
    'gender',
    'number',
    'noun-irab',
    'diptotes',
    'verb-tense',
    'verb-irab',
    'verb-negation',
    'verb-gender-voice',
    'particles',
    'masdar-derived',
  ],
  // Unit 2: Sentences
  unit2: [
    'nominal-sentence',
    'kana-and-sisters',
    'inna-and-sisters',
    'verbal-sentence',
    'maf-ul-bih',
    'naib-al-fail',
    'maf-ul-fihi',
    'maf-ul-mutlaq',
    'maf-ul-lahu',
    'hal',
    'tamyiz',
    'mustathna',
    'maf-ul-ma-ahu',
  ],
  // Unit 3: Phrases
  unit3: [
    'na-t',
    'demonstrative-phrases',
    'atf',
    'badal',
    'mudaf-ilayhi',
    'prepositions',
    'shibh-al-jumla',
    'number-phrases',
  ],
  // Unit 4: Pronouns
  unit4: [
    'damir-marfu',
    'damir-mansub',
    'damir-majrur',
    'harf-istifham',
    'ism-istifham',
    'tawkid',
  ],
  // Unit 5: Nested Sentences
  unit5: [
    'jumla-sughra',
    'ism-mawsul',
    'harf-mawsul',
    'verbal-phrases',
  ],
  // Unit 6: Joining Sentences
  unit6: [
    'nida',
    'qasam',
    'shart',
    'amr-nahy',
    'jumla-ta-liliyya',
    'jumla-istidrakiyya',
  ],
} as const;

/**
 * Prerequisite edges for the nahw curriculum.
 *
 * Each edge { from, to } means `from` must be learned before `to`.
 */
export const NAHW_PREREQUISITE_EDGES: PrerequisiteEdge[] = [
  // ─── Unit 1: Words (Foundation) ────────────────────────────
  // word-types is the foundation for all noun/verb/particle topics
  { from: 'word-types', to: 'definite-indefinite' },
  { from: 'word-types', to: 'gender' },
  { from: 'word-types', to: 'number' },
  { from: 'word-types', to: 'noun-irab' },
  { from: 'word-types', to: 'verb-tense' },
  { from: 'word-types', to: 'particles' },

  // Noun characteristics build on each other
  { from: 'noun-irab', to: 'diptotes' },

  // Verb characteristics chain
  { from: 'verb-tense', to: 'verb-irab' },
  { from: 'verb-tense', to: 'verb-negation' },
  { from: 'verb-tense', to: 'verb-gender-voice' },

  // Masdar requires verb and noun knowledge
  { from: 'verb-tense', to: 'masdar-derived' },
  { from: 'noun-irab', to: 'masdar-derived' },

  // ─── Unit 2: Sentences ─────────────────────────────────────
  // Nominal sentence requires noun-irab (case endings on mubtada/khabar)
  { from: 'noun-irab', to: 'nominal-sentence' },
  { from: 'definite-indefinite', to: 'nominal-sentence' },

  // Kana/Inna modify nominal sentences
  { from: 'nominal-sentence', to: 'kana-and-sisters' },
  { from: 'nominal-sentence', to: 'inna-and-sisters' },

  // Verbal sentence requires verb knowledge + noun-irab for fail/maf'ul
  { from: 'verb-tense', to: 'verbal-sentence' },
  { from: 'verb-irab', to: 'verbal-sentence' },
  { from: 'noun-irab', to: 'verbal-sentence' },

  // Objects and complements build on verbal sentence
  { from: 'verbal-sentence', to: 'maf-ul-bih' },
  { from: 'verbal-sentence', to: 'naib-al-fail' },
  { from: 'verb-gender-voice', to: 'naib-al-fail' }, // passive voice required

  // Adverbial complements build on verbal sentence
  { from: 'verbal-sentence', to: 'maf-ul-fihi' },
  { from: 'verbal-sentence', to: 'maf-ul-mutlaq' },
  { from: 'verbal-sentence', to: 'maf-ul-lahu' },
  { from: 'verbal-sentence', to: 'maf-ul-ma-ahu' },

  // Hal requires both sentence types
  { from: 'nominal-sentence', to: 'hal' },
  { from: 'verbal-sentence', to: 'hal' },

  // Tamyiz requires understanding of noun-irab and verbal
  { from: 'noun-irab', to: 'tamyiz' },
  { from: 'verbal-sentence', to: 'tamyiz' },

  // Mustathna (exception) requires understanding sentences
  { from: 'verbal-sentence', to: 'mustathna' },
  { from: 'particles', to: 'mustathna' },

  // ─── Unit 3: Phrases ───────────────────────────────────────
  // Na't (adjective) requires gender, number, def/indef agreement
  { from: 'gender', to: 'na-t' },
  { from: 'number', to: 'na-t' },
  { from: 'definite-indefinite', to: 'na-t' },
  { from: 'noun-irab', to: 'na-t' },

  // Demonstrative phrases
  { from: 'definite-indefinite', to: 'demonstrative-phrases' },
  { from: 'gender', to: 'demonstrative-phrases' },
  { from: 'number', to: 'demonstrative-phrases' },

  // Atf (conjunction) and badal (apposition)
  { from: 'noun-irab', to: 'atf' },
  { from: 'particles', to: 'atf' },
  { from: 'noun-irab', to: 'badal' },
  { from: 'na-t', to: 'badal' },

  // Idafa (possessive) and prepositions
  { from: 'noun-irab', to: 'mudaf-ilayhi' },
  { from: 'definite-indefinite', to: 'mudaf-ilayhi' },
  { from: 'noun-irab', to: 'prepositions' },
  { from: 'particles', to: 'prepositions' },

  // Shibh al-jumla (semi-sentence = prepositional/adverbial phrase)
  { from: 'prepositions', to: 'shibh-al-jumla' },
  { from: 'mudaf-ilayhi', to: 'shibh-al-jumla' },

  // Number phrases require number and idafa
  { from: 'number', to: 'number-phrases' },
  { from: 'mudaf-ilayhi', to: 'number-phrases' },
  { from: 'tamyiz', to: 'number-phrases' },

  // ─── Unit 4: Pronouns ──────────────────────────────────────
  // Personal pronouns (nominative, accusative, genitive)
  { from: 'noun-irab', to: 'damir-marfu' },
  { from: 'nominal-sentence', to: 'damir-marfu' },
  { from: 'verbal-sentence', to: 'damir-marfu' },

  { from: 'damir-marfu', to: 'damir-mansub' },
  { from: 'maf-ul-bih', to: 'damir-mansub' },

  { from: 'damir-marfu', to: 'damir-majrur' },
  { from: 'prepositions', to: 'damir-majrur' },

  // Interrogative particles and nouns
  { from: 'particles', to: 'harf-istifham' },
  { from: 'harf-istifham', to: 'ism-istifham' },
  { from: 'noun-irab', to: 'ism-istifham' },

  // Tawkid (emphasis) requires understanding of pronouns and nouns
  { from: 'damir-marfu', to: 'tawkid' },
  { from: 'na-t', to: 'tawkid' },

  // ─── Unit 5: Nested Sentences ──────────────────────────────
  // Jumla sughra (small sentence) = sentence within sentence
  { from: 'nominal-sentence', to: 'jumla-sughra' },
  { from: 'verbal-sentence', to: 'jumla-sughra' },
  { from: 'hal', to: 'jumla-sughra' },

  // Ism mawsul (relative pronoun) creates nested sentences
  { from: 'jumla-sughra', to: 'ism-mawsul' },
  { from: 'damir-marfu', to: 'ism-mawsul' },

  // Harf mawsul (conjunction particles)
  { from: 'particles', to: 'harf-mawsul' },
  { from: 'verb-irab', to: 'harf-mawsul' },

  // Verbal phrases (verbal noun phrases)
  { from: 'masdar-derived', to: 'verbal-phrases' },
  { from: 'maf-ul-bih', to: 'verbal-phrases' },

  // ─── Unit 6: Joining Sentences ─────────────────────────────
  // Nida (vocative)
  { from: 'noun-irab', to: 'nida' },
  { from: 'mudaf-ilayhi', to: 'nida' },

  // Qasam (oath)
  { from: 'particles', to: 'qasam' },
  { from: 'prepositions', to: 'qasam' },
  { from: 'verbal-sentence', to: 'qasam' },

  // Shart (conditional)
  { from: 'verbal-sentence', to: 'shart' },
  { from: 'verb-irab', to: 'shart' },
  { from: 'particles', to: 'shart' },

  // Amr/Nahy (command/prohibition)
  { from: 'verb-irab', to: 'amr-nahy' },
  { from: 'verb-negation', to: 'amr-nahy' },

  // Jumla ta'liliyya (reason clause)
  { from: 'jumla-sughra', to: 'jumla-ta-liliyya' },
  { from: 'particles', to: 'jumla-ta-liliyya' },

  // Jumla istidrakiyya (adversative clause)
  { from: 'jumla-sughra', to: 'jumla-istidrakiyya' },
  { from: 'inna-and-sisters', to: 'jumla-istidrakiyya' },
];

/**
 * Build the complete nahw prerequisite graph.
 *
 * This is a lazy singleton — built once and cached.
 */
let _cachedGraph: ReturnType<typeof buildGraph> | null = null;

export function getNahwPrerequisiteGraph(): ReturnType<typeof buildGraph> {
  if (!_cachedGraph) {
    _cachedGraph = buildGraph(NAHW_PREREQUISITE_EDGES);
  }
  return _cachedGraph;
}

/**
 * Get all topic IDs as a flat array.
 */
export function getAllNahwTopicIds(): string[] {
  return [
    ...NAHW_TOPIC_IDS.unit1,
    ...NAHW_TOPIC_IDS.unit2,
    ...NAHW_TOPIC_IDS.unit3,
    ...NAHW_TOPIC_IDS.unit4,
    ...NAHW_TOPIC_IDS.unit5,
    ...NAHW_TOPIC_IDS.unit6,
  ];
}
