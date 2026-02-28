/**
 * Maps each of the 43 nahw topics to relevant tool IDs.
 * Ordered by relevance: practice tools first, then reference.
 * Detail panel shows max 4 per topic.
 */
export const TOPIC_TOOLS: Record<string, string[]> = {
  // ── Unit 1: Words ──
  'word-types': ['fstu-exercises', 'tarkeeb', 'nahw-navigator', 'nahw-atlas'],
  'definite-indefinite': ['fstu-exercises', 'tarkeeb', 'nahw-navigator', 'nahw-atlas'],
  'gender': ['fstu-exercises', 'tarkeeb', 'nahw-navigator', 'nahw-atlas'],
  'number': ['fstu-exercises', 'tarkeeb', 'nahw-navigator', 'nahw-atlas'],
  'noun-irab': ['fstu-exercises', 'tarkeeb', 'nahw-navigator', 'nahw-atlas'],
  'diptotes': ['fstu-exercises', 'tarkeeb', 'nahw-navigator', 'nahw-atlas'],
  'verb-tense': ['conjugation', 'sarf-exercises', 'fstu-exercises', 'sarf-charts'],
  'verb-irab': ['conjugation', 'sarf-exercises', 'fstu-exercises', 'tarkeeb'],
  'verb-negation': ['fstu-exercises', 'tarkeeb', 'bina', 'nahw-navigator'],
  'verb-gender-voice': ['conjugation', 'sarf-exercises', 'fstu-exercises', 'tarkeeb'],
  'particles': ['fstu-exercises', 'tarkeeb', 'nahw-navigator', 'nahw-atlas'],
  'masdar-derived': ['masdar-trainer', 'sarf-exercises', 'sarf-charts', 'sarf-tool'],

  // ── Unit 2: Sentences ──
  'nominal-sentence': ['fstu-exercises', 'tarkeeb', 'nahw-navigator', 'nahw-atlas'],
  'kana-and-sisters': ['fstu-exercises', 'tarkeeb', 'nahw-navigator', 'nahw-atlas'],
  'inna-and-sisters': ['fstu-exercises', 'tarkeeb', 'nahw-navigator', 'nahw-atlas'],
  'verbal-sentence': ['fstu-exercises', 'tarkeeb', 'nahw-navigator', 'nahw-atlas'],
  'maf-ul-bih': ['fstu-exercises', 'tarkeeb', 'nahw-navigator', 'nahw-atlas'],
  'naib-al-fail': ['fstu-exercises', 'tarkeeb', 'nahw-navigator', 'nahw-atlas'],
  'maf-ul-fihi': ['fstu-exercises', 'tarkeeb', 'nahw-navigator', 'nahw-atlas'],
  'maf-ul-mutlaq': ['fstu-exercises', 'tarkeeb', 'nahw-navigator', 'nahw-atlas'],
  'maf-ul-lahu': ['fstu-exercises', 'tarkeeb', 'nahw-navigator', 'nahw-atlas'],
  'hal': ['fstu-exercises', 'tarkeeb', 'nahw-navigator', 'nahw-atlas'],
  'tamyiz': ['fstu-exercises', 'tarkeeb', 'nahw-navigator', 'nahw-atlas'],
  'mustathna': ['fstu-exercises', 'tarkeeb', 'nahw-navigator', 'nahw-atlas'],
  'maf-ul-ma-ahu': ['fstu-exercises', 'tarkeeb', 'nahw-navigator', 'nahw-atlas'],

  // ── Unit 3: Phrases ──
  'na-t': ['tarkib-builder', 'fstu-exercises', 'tarkib-guide', 'tarkeeb'],
  'demonstrative-phrases': ['tarkib-builder', 'fstu-exercises', 'tarkib-guide', 'tarkeeb'],
  'atf': ['tarkib-builder', 'fstu-exercises', 'tarkib-guide', 'tarkeeb'],
  'badal': ['tarkib-builder', 'fstu-exercises', 'tarkib-guide', 'tarkeeb'],
  'mudaf-ilayhi': ['tarkib-builder', 'fstu-exercises', 'tarkib-guide', 'tarkeeb'],
  'prepositions': ['tarkib-builder', 'fstu-exercises', 'tarkib-guide', 'tarkeeb'],
  'shibh-al-jumla': ['tarkib-builder', 'fstu-exercises', 'tarkib-guide', 'tarkeeb'],
  'number-phrases': ['tarkib-builder', 'fstu-exercises', 'tarkib-guide', 'tarkeeb'],

  // ── Unit 4: Pronouns ──
  'damir-marfu': ['fstu-exercises', 'tarkeeb', 'nahw-navigator', 'nahw-atlas'],
  'damir-mansub': ['fstu-exercises', 'tarkeeb', 'nahw-navigator', 'nahw-atlas'],
  'damir-majrur': ['fstu-exercises', 'tarkeeb', 'nahw-navigator', 'nahw-atlas'],
  'harf-istifham': ['fstu-exercises', 'tarkeeb', 'nahw-navigator', 'nahw-atlas'],
  'ism-istifham': ['fstu-exercises', 'tarkeeb', 'nahw-navigator', 'nahw-atlas'],
  'tawkid': ['fstu-exercises', 'tarkeeb', 'nahw-navigator', 'nahw-atlas'],

  // ── Unit 5: Nested Sentences ──
  'jumla-sughra': ['fstu-exercises', 'bina', 'tarkeeb'],
  'ism-mawsul': ['fstu-exercises', 'bina', 'tarkeeb'],
  'harf-mawsul': ['fstu-exercises', 'bina', 'tarkeeb'],
  'verbal-phrases': ['fstu-exercises', 'bina', 'tarkeeb'],

  // ── Unit 6: Joining Sentences ──
  'nida': ['fstu-exercises', 'bina', 'tarkeeb'],
  'qasam': ['fstu-exercises', 'bina', 'tarkeeb'],
  'shart': ['fstu-exercises', 'bina', 'tarkeeb'],
  'amr-nahy': ['conjugation', 'sarf-exercises', 'fstu-exercises', 'tarkeeb'],
  'jumla-ta-liliyya': ['fstu-exercises', 'bina', 'tarkeeb'],
  'jumla-istidrakiyya': ['fstu-exercises', 'bina', 'tarkeeb'],
};

/** Max tools shown in the topic detail panel */
export const MAX_TOOLS_PER_TOPIC = 4;
