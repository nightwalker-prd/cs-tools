// src/data/reading/conceptRegistry.ts

/**
 * Grammar concept definition
 */
export interface GrammarConcept {
  id: string;
  en: string;
  ar: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'all';
  category: 'syntax' | 'morphology' | 'rhetoric';
  aliases: string[];
}

/**
 * Canonical grammar concepts registry
 * All reading texts should use concept IDs from this registry
 */
export const GRAMMAR_CONCEPTS: Record<string, GrammarConcept> = {
  // === SYNTAX (النحو) ===
  'nominal-sentence': {
    id: 'nominal-sentence',
    en: 'Nominal Sentence',
    ar: 'الجملة الاسمية',
    level: 'beginner',
    category: 'syntax',
    aliases: ['Nominal sentences', 'Nominal sentences (الجملة الاسمية)'],
  },
  'verbal-sentence': {
    id: 'verbal-sentence',
    en: 'Verbal Sentence',
    ar: 'الجملة الفعلية',
    level: 'beginner',
    category: 'syntax',
    aliases: ['Verbal sentences', 'Verbal sentences (الجملة الفعلية)'],
  },
  'idafa': {
    id: 'idafa',
    en: 'Annexation (Idafa)',
    ar: 'الإضافة',
    level: 'all',
    category: 'syntax',
    aliases: ['Idafa construction', 'Idafa constructions', 'idafa (annexation)', 'Idafa'],
  },
  'kana-sisters': {
    id: 'kana-sisters',
    en: 'Kana and Sisters',
    ar: 'كان وأخواتها',
    level: 'beginner',
    category: 'syntax',
    aliases: ['Kana and sisters', 'كان وأخواتها', 'Kana construction'],
  },
  'inna-sisters': {
    id: 'inna-sisters',
    en: 'Inna and Sisters',
    ar: 'إن وأخواتها',
    level: 'intermediate',
    category: 'syntax',
    aliases: ['Inna and sisters', 'inna', 'Inna construction', 'إن وأخواتها'],
  },
  'laysa': {
    id: 'laysa',
    en: 'Laysa (Negation)',
    ar: 'ليس',
    level: 'beginner',
    category: 'syntax',
    aliases: ['laysa', 'Laysa negation'],
  },
  'prepositions': {
    id: 'prepositions',
    en: 'Prepositions',
    ar: 'حروف الجر',
    level: 'beginner',
    category: 'syntax',
    aliases: [
      'Basic prepositions (إلى، في)',
      'Prepositions (عند، إلى، في)',
      'Prepositions (لـ، من، في)',
      'Prepositional phrases',
    ],
  },
  'relative-clause': {
    id: 'relative-clause',
    en: 'Relative Clause',
    ar: 'الجملة الموصولة',
    level: 'intermediate',
    category: 'syntax',
    aliases: ['Relative clauses', 'Relative pronouns'],
  },
  'conditional': {
    id: 'conditional',
    en: 'Conditional Sentence',
    ar: 'جملة الشرط',
    level: 'intermediate',
    category: 'syntax',
    aliases: ['Conditional sentences (من...فقد)', 'Conditional sentences', 'إذا الشرطية'],
  },
  'maf3ul-bihi': {
    id: 'maf3ul-bihi',
    en: 'Direct Object',
    ar: 'المفعول به',
    level: 'beginner',
    category: 'syntax',
    aliases: ['Direct object (مفعول به)', 'Direct object', 'مفعول به'],
  },
  'hal': {
    id: 'hal',
    en: 'Circumstantial Clause',
    ar: 'الحال',
    level: 'intermediate',
    category: 'syntax',
    aliases: ['Hal clause', 'الحال', 'Circumstantial hal'],
  },
  'tamyiz': {
    id: 'tamyiz',
    en: 'Specification',
    ar: 'التمييز',
    level: 'advanced',
    category: 'syntax',
    aliases: ['Tamyiz', 'التمييز'],
  },
  'negation': {
    id: 'negation',
    en: 'Negation',
    ar: 'النفي',
    level: 'beginner',
    category: 'syntax',
    aliases: ['Negation (لا)', 'Negation particles', 'لا النافية'],
  },

  // === MORPHOLOGY (الصرف) ===
  'ism-fail': {
    id: 'ism-fail',
    en: 'Active Participle',
    ar: 'اسم الفاعل',
    level: 'beginner',
    category: 'morphology',
    aliases: ['ism-fail', 'Active participle', 'اسم الفاعل'],
  },
  'ism-mafool': {
    id: 'ism-mafool',
    en: 'Passive Participle',
    ar: 'اسم المفعول',
    level: 'beginner',
    category: 'morphology',
    aliases: ['ism-mafool', 'Passive participle', 'اسم المفعول'],
  },
  'masdar': {
    id: 'masdar',
    en: 'Verbal Noun',
    ar: 'المصدر',
    level: 'intermediate',
    category: 'morphology',
    aliases: ['Masdar', 'Verbal noun', 'المصدر'],
  },
  'past-tense': {
    id: 'past-tense',
    en: 'Past Tense',
    ar: 'الفعل الماضي',
    level: 'beginner',
    category: 'morphology',
    aliases: ['Past tense narrative', 'Past tense', 'الفعل الماضي', 'Past tense verbs'],
  },
  'present-tense': {
    id: 'present-tense',
    en: 'Present Tense',
    ar: 'الفعل المضارع',
    level: 'beginner',
    category: 'morphology',
    aliases: ['Present tense verbs', 'Present tense verbs (المضارع)', 'الفعل المضارع'],
  },
  'command': {
    id: 'command',
    en: 'Command Form',
    ar: 'فعل الأمر',
    level: 'beginner',
    category: 'morphology',
    aliases: ['Command form (كن)', 'Command form', 'فعل الأمر', 'Command form (اغتنم)'],
  },
  'passive-voice': {
    id: 'passive-voice',
    en: 'Passive Voice',
    ar: 'المبني للمجهول',
    level: 'intermediate',
    category: 'morphology',
    aliases: ['fil-majhul', 'Passive voice', 'المبني للمجهول'],
  },
  'comparative': {
    id: 'comparative',
    en: 'Comparative Form',
    ar: 'اسم التفضيل',
    level: 'intermediate',
    category: 'morphology',
    aliases: ['Comparative form (أفعل - أنفعهم)', 'Comparative forms (أثمن، أفعل)', 'اسم التفضيل'],
  },
  'definiteness': {
    id: 'definiteness',
    en: 'Definite and Indefinite',
    ar: 'المعرفة والنكرة',
    level: 'beginner',
    category: 'morphology',
    aliases: ['Definite and indefinite nouns', 'Definiteness', 'المعرفة والنكرة'],
  },

  // === RHETORIC (البلاغة) ===
  'tashbih': {
    id: 'tashbih',
    en: 'Simile',
    ar: 'التشبيه',
    level: 'advanced',
    category: 'rhetoric',
    aliases: ['Simile', 'التشبيه', 'Metaphorical language'],
  },
  'kinaya': {
    id: 'kinaya',
    en: 'Metonymy',
    ar: 'الكناية',
    level: 'advanced',
    category: 'rhetoric',
    aliases: ['Metonymy', 'الكناية'],
  },
};

/**
 * Get concept by ID
 */
export function getConceptById(id: string): GrammarConcept | undefined {
  return GRAMMAR_CONCEPTS[id];
}

/**
 * Normalize a concept label to its canonical ID
 * Returns the label as-is if no match found
 */
export function normalizeConceptLabel(label: string): string {
  // Direct match
  if (GRAMMAR_CONCEPTS[label]) {
    return label;
  }

  // Check aliases
  for (const [id, concept] of Object.entries(GRAMMAR_CONCEPTS)) {
    if (concept.aliases.includes(label) || concept.en === label || concept.ar === label) {
      return id;
    }
  }

  // No match found, return original
  return label;
}

/**
 * Get all concepts for a level
 */
export function getConceptsByLevel(level: 'beginner' | 'intermediate' | 'advanced'): GrammarConcept[] {
  return Object.values(GRAMMAR_CONCEPTS).filter(
    c => c.level === level || c.level === 'all'
  );
}

/**
 * Get all concepts for a category
 */
export function getConceptsByCategory(category: 'syntax' | 'morphology' | 'rhetoric'): GrammarConcept[] {
  return Object.values(GRAMMAR_CONCEPTS).filter(c => c.category === category);
}
