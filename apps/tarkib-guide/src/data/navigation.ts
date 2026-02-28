export interface NavPage {
  slug: string;
  title: string;
  titleAr?: string;
  file: string;
}

export interface NavSection {
  id: string;
  title: string;
  titleAr?: string;
  pages: NavPage[];
}

export const sections: NavSection[] = [
  {
    id: 'phrases',
    title: 'Phrases',
    titleAr: 'العبارات',
    pages: [
      { slug: 'phrases-overview', title: 'Phrase Types Overview', titleAr: 'أنواع العبارات', file: 'phrases-index' },
      { slug: 'descriptive-phrases', title: 'Descriptive Phrases', titleAr: 'التركيب الوصفي', file: 'descriptive-phrases' },
      { slug: 'demonstrative-phrases', title: 'Demonstrative Phrases', titleAr: 'التركيب الإشاري', file: 'demonstrative-phrases' },
      { slug: 'conjunctive-phrases', title: 'Conjunctive Phrases', titleAr: 'التركيب العطفي', file: 'conjunctive-phrases' },
      { slug: 'appositive-phrases', title: 'Supplementary Topics', titleAr: 'موضوعات تكميلية', file: 'appositive-phrases' },
      { slug: 'possessive-phrases', title: 'Possessive Phrases', titleAr: 'الإضافة', file: 'possessive-phrases' },
      { slug: 'number-phrases', title: 'Number Phrases', titleAr: 'العدد والمعدود', file: 'number-phrases' },
      { slug: 'prepositional-phrases', title: 'Prepositional Phrases', titleAr: 'شبه الجملة', file: 'prepositional-phrases' },
    ],
  },
  {
    id: 'sentences',
    title: 'Sentences',
    titleAr: 'الجمل',
    pages: [
      { slug: 'sentences-overview', title: 'Sentence Types Overview', titleAr: 'أنواع الجمل', file: 'sentences-index' },
      { slug: 'nominal-sentence', title: 'Nominal Sentence', titleAr: 'الجملة الاسمية', file: 'nominal-sentence' },
      { slug: 'verbal-sentence', title: 'Verbal Sentence', titleAr: 'الجملة الفعلية', file: 'verbal-sentence' },
      { slug: 'nested-sentences', title: 'Subordinate Sentences', titleAr: 'جملة صغرى', file: 'nested-sentences' },
    ],
  },
  {
    id: 'pronouns',
    title: 'Pronouns',
    titleAr: 'الضمائر',
    pages: [
      { slug: 'pronouns-overview', title: 'Pronouns Overview', titleAr: 'نظرة عامة على الضمائر', file: 'pronouns-overview' },
    ],
  },
  {
    id: 'advanced',
    title: 'Advanced',
    titleAr: 'متقدم',
    pages: [
      { slug: 'advanced-rules', title: 'Advanced Rules', titleAr: 'قواعد متقدمة', file: 'advanced-rules' },
      { slug: 'emphasis-guide', title: 'Emphasis', titleAr: 'التأكيد', file: 'emphasis-guide' },
      { slug: 'interrogatives', title: 'Interrogatives', titleAr: 'الاستفهام', file: 'interrogatives' },
      { slug: 'conditional-sentences', title: 'Conditional Sentences', titleAr: 'الشرط', file: 'conditional-sentences' },
      { slug: 'joining-sentences', title: 'Joining Sentences', titleAr: 'التركيب الجملي', file: 'joining-sentences' },
    ],
  },
  {
    id: 'reference',
    title: 'Reference',
    titleAr: 'مراجع',
    pages: [
      { slug: 'vocabulary-supplement', title: 'Vocabulary Supplement', titleAr: 'مفردات', file: 'vocabulary-supplement' },
      { slug: 'key-terms', title: 'Key Terms', titleAr: 'المصطلحات', file: 'key-terms' },
      { slug: 'glossary', title: 'Introduction & Glossary', titleAr: 'مقدمة', file: 'glossary' },
    ],
  },
  {
    id: 'workbooks',
    title: 'Workbook Answers',
    titleAr: 'إجابات',
    pages: [
      { slug: 'wb1-unit1', title: 'WB1: Unit 1 Grammar', file: 'wb1-unit1' },
      { slug: 'wb1-unit2-1', title: 'WB1: Unit 2 Section 1', file: 'wb1-unit2-1' },
      { slug: 'wb1-unit2-2', title: 'WB1: Unit 2 Section 2', file: 'wb1-unit2-2' },
      { slug: 'wb1-pronouns', title: 'WB1: Unit 2 Pronouns', file: 'wb1-pronouns' },
      { slug: 'wb1-unit3', title: 'WB1: Unit 3', file: 'wb1-unit3' },
      { slug: 'wb1-unit4', title: 'WB1: Unit 4', file: 'wb1-unit4' },
      { slug: 'wb1-unit5', title: 'WB1: Unit 5', file: 'wb1-unit5' },
      { slug: 'wb1-practice', title: 'WB1: Practice Questions', file: 'wb1-practice' },
      { slug: 'wb2-answers', title: 'WB2: Answers', file: 'wb2-answers' },
      { slug: 'wb3-answers', title: 'WB3: Answers', file: 'wb3-answers' },
      { slug: 'wb4-answers', title: 'WB4: Answers', file: 'wb4-answers' },
      { slug: 'wb5-answers', title: 'WB5: Answers', file: 'wb5-answers' },
    ],
  },
];

// Flat lookup: slug → file key
export const slugToFile: Record<string, string> = {};
for (const section of sections) {
  for (const page of section.pages) {
    slugToFile[page.slug] = page.file;
  }
}

// Find section containing a slug
export function findSection(slug: string): NavSection | undefined {
  return sections.find(s => s.pages.some(p => p.slug === slug));
}
