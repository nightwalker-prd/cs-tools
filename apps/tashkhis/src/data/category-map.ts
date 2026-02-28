import type { CategoryDefinition } from '../types';

/**
 * 45 categories: 43 nahw topic IDs + sarf + vocabulary.
 * Organized by FSTU curriculum units.
 */
export const CATEGORIES: CategoryDefinition[] = [
  // ── Unit 1: Words (12 topics) ──
  { id: 'word-types', type: 'nahw', unit: 1, label: 'Word Types', labelAr: 'أقسام الكلمة' },
  { id: 'definite-indefinite', type: 'nahw', unit: 1, label: 'Definite & Indefinite', labelAr: 'المعرفة والنكرة' },
  { id: 'gender', type: 'nahw', unit: 1, label: 'Gender', labelAr: 'المذكر والمؤنث' },
  { id: 'number', type: 'nahw', unit: 1, label: 'Number', labelAr: 'المفرد والمثنى والجمع' },
  { id: 'noun-irab', type: 'nahw', unit: 1, label: "Noun I'rab", labelAr: 'إعراب الاسم' },
  { id: 'diptotes', type: 'nahw', unit: 1, label: 'Diptotes', labelAr: 'الممنوع من الصرف' },
  { id: 'verb-tense', type: 'nahw', unit: 1, label: 'Verb Tense', labelAr: 'أزمنة الفعل' },
  { id: 'verb-irab', type: 'nahw', unit: 1, label: "Verb I'rab", labelAr: 'إعراب الفعل' },
  { id: 'verb-negation', type: 'nahw', unit: 1, label: 'Verb Negation', labelAr: 'نفي الفعل' },
  { id: 'verb-gender-voice', type: 'nahw', unit: 1, label: 'Voice & Gender', labelAr: 'المبني للمعلوم والمجهول' },
  { id: 'particles', type: 'nahw', unit: 1, label: 'Particles', labelAr: 'الحروف' },
  { id: 'masdar-derived', type: 'nahw', unit: 1, label: 'Masdar & Derived', labelAr: 'المصدر والمشتقات' },

  // ── Unit 2: Sentences (13 topics) ──
  { id: 'nominal-sentence', type: 'nahw', unit: 2, label: 'Nominal Sentence', labelAr: 'الجملة الاسمية' },
  { id: 'kana-and-sisters', type: 'nahw', unit: 2, label: 'Kana & Sisters', labelAr: 'كان وأخواتها' },
  { id: 'inna-and-sisters', type: 'nahw', unit: 2, label: 'Inna & Sisters', labelAr: 'إنّ وأخواتها' },
  { id: 'verbal-sentence', type: 'nahw', unit: 2, label: 'Verbal Sentence', labelAr: 'الجملة الفعلية' },
  { id: 'maf-ul-bih', type: 'nahw', unit: 2, label: "Maf'ul Bih", labelAr: 'المفعول به' },
  { id: 'naib-al-fail', type: 'nahw', unit: 2, label: "Na'ib al-Fa'il", labelAr: 'نائب الفاعل' },
  { id: 'maf-ul-fihi', type: 'nahw', unit: 2, label: "Maf'ul Fihi", labelAr: 'المفعول فيه' },
  { id: 'maf-ul-mutlaq', type: 'nahw', unit: 2, label: "Maf'ul Mutlaq", labelAr: 'المفعول المطلق' },
  { id: 'maf-ul-lahu', type: 'nahw', unit: 2, label: "Maf'ul Lahu", labelAr: 'المفعول لأجله' },
  { id: 'hal', type: 'nahw', unit: 2, label: 'Hal', labelAr: 'الحال' },
  { id: 'tamyiz', type: 'nahw', unit: 2, label: 'Tamyiz', labelAr: 'التمييز' },
  { id: 'mustathna', type: 'nahw', unit: 2, label: 'Mustathna', labelAr: 'المستثنى' },
  { id: 'maf-ul-ma-ahu', type: 'nahw', unit: 2, label: "Maf'ul Ma'ahu", labelAr: 'المفعول معه' },

  // ── Unit 3: Phrases (8 topics) ──
  { id: 'na-t', type: 'nahw', unit: 3, label: "Na't (Adjective)", labelAr: 'النعت' },
  { id: 'demonstrative-phrases', type: 'nahw', unit: 3, label: 'Demonstrative Phrases', labelAr: 'أسماء الإشارة' },
  { id: 'atf', type: 'nahw', unit: 3, label: "Atf (Conjunction)", labelAr: 'العطف' },
  { id: 'badal', type: 'nahw', unit: 3, label: 'Badal (Apposition)', labelAr: 'البدل' },
  { id: 'mudaf-ilayhi', type: 'nahw', unit: 3, label: 'Mudaf Ilayhi', labelAr: 'المضاف إليه' },
  { id: 'prepositions', type: 'nahw', unit: 3, label: 'Prepositions', labelAr: 'حروف الجر' },
  { id: 'shibh-al-jumla', type: 'nahw', unit: 3, label: 'Shibh al-Jumla', labelAr: 'شبه الجملة' },
  { id: 'number-phrases', type: 'nahw', unit: 3, label: 'Number Phrases', labelAr: 'العدد والمعدود' },

  // ── Unit 4: Pronouns (6 topics) ──
  { id: 'damir-marfu', type: 'nahw', unit: 4, label: 'Nominative Pronouns', labelAr: 'الضمير المرفوع' },
  { id: 'damir-mansub', type: 'nahw', unit: 4, label: 'Accusative Pronouns', labelAr: 'الضمير المنصوب' },
  { id: 'damir-majrur', type: 'nahw', unit: 4, label: 'Genitive Pronouns', labelAr: 'الضمير المجرور' },
  { id: 'harf-istifham', type: 'nahw', unit: 4, label: 'Question Particles', labelAr: 'حرف الاستفهام' },
  { id: 'ism-istifham', type: 'nahw', unit: 4, label: 'Question Nouns', labelAr: 'اسم الاستفهام' },
  { id: 'tawkid', type: 'nahw', unit: 4, label: 'Emphasis', labelAr: 'التوكيد' },

  // ── Unit 5: Nested Sentences (4 topics) ──
  { id: 'jumla-sughra', type: 'nahw', unit: 5, label: 'Small Sentence', labelAr: 'الجملة الصغرى' },
  { id: 'ism-mawsul', type: 'nahw', unit: 5, label: 'Relative Pronoun', labelAr: 'الاسم الموصول' },
  { id: 'harf-mawsul', type: 'nahw', unit: 5, label: 'Connecting Particle', labelAr: 'الحرف الموصول' },
  { id: 'verbal-phrases', type: 'nahw', unit: 5, label: 'Verbal Phrases', labelAr: 'التراكيب الفعلية' },

  // ── Unit 6: Joining Sentences (6 topics) ──
  { id: 'nida', type: 'nahw', unit: 6, label: 'Vocative', labelAr: 'النداء' },
  { id: 'qasam', type: 'nahw', unit: 6, label: 'Oath', labelAr: 'القسم' },
  { id: 'shart', type: 'nahw', unit: 6, label: 'Conditional', labelAr: 'الشرط' },
  { id: 'amr-nahy', type: 'nahw', unit: 6, label: 'Command & Prohibition', labelAr: 'الأمر والنهي' },
  { id: 'jumla-ta-liliyya', type: 'nahw', unit: 6, label: 'Reason Clause', labelAr: 'الجملة التعليلية' },
  { id: 'jumla-istidrakiyya', type: 'nahw', unit: 6, label: 'Adversative Clause', labelAr: 'الجملة الاستدراكية' },

  // ── Non-unit categories ──
  { id: 'sarf', type: 'sarf', unit: 7, label: 'Sarf (Morphology)', labelAr: 'الصرف' },
  { id: 'vocabulary', type: 'vocabulary', unit: 8, label: 'Vocabulary', labelAr: 'المفردات' },
];

export const CATEGORY_MAP = new Map(CATEGORIES.map(c => [c.id, c]));

export const UNIT_TITLES: Record<number, { en: string; ar: string }> = {
  1: { en: 'Unit 1: Words', ar: 'الوحدة ١: الكلمات' },
  2: { en: 'Unit 2: Sentences', ar: 'الوحدة ٢: الجمل' },
  3: { en: 'Unit 3: Phrases', ar: 'الوحدة ٣: التراكيب' },
  4: { en: 'Unit 4: Pronouns', ar: 'الوحدة ٤: الضمائر' },
  5: { en: 'Unit 5: Nested Sentences', ar: 'الوحدة ٥: الجمل المركبة' },
  6: { en: 'Unit 6: Joining Sentences', ar: 'الوحدة ٦: ربط الجمل' },
  7: { en: 'Sarf (Morphology)', ar: 'الصرف' },
  8: { en: 'Vocabulary', ar: 'المفردات' },
};
