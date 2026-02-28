import { NAHW_TOPIC_IDS, NAHW_PREREQUISITE_EDGES } from '@arabtools/srs';
import type { TopicDefinition } from '@/types/roadmap';

/** Unit metadata */
export const UNIT_TITLES: Record<number, { en: string; ar: string }> = {
  1: { en: 'Unit 1: Words', ar: 'الوحدة ١: الكلمات' },
  2: { en: 'Unit 2: Sentences', ar: 'الوحدة ٢: الجمل' },
  3: { en: 'Unit 3: Phrases', ar: 'الوحدة ٣: التراكيب' },
  4: { en: 'Unit 4: Pronouns', ar: 'الوحدة ٤: الضمائر' },
  5: { en: 'Unit 5: Nested Sentences', ar: 'الوحدة ٥: الجمل المركبة' },
  6: { en: 'Unit 6: Joining Sentences', ar: 'الوحدة ٦: ربط الجمل' },
};

/** English + Arabic labels for each topic. Matches tashkhis category-map.ts. */
const TOPIC_LABELS: Record<string, { label: string; labelAr: string }> = {
  'word-types': { label: 'Word Types', labelAr: 'أقسام الكلمة' },
  'definite-indefinite': { label: 'Definite & Indefinite', labelAr: 'المعرفة والنكرة' },
  'gender': { label: 'Gender', labelAr: 'المذكر والمؤنث' },
  'number': { label: 'Number', labelAr: 'المفرد والمثنى والجمع' },
  'noun-irab': { label: "Noun I'rab", labelAr: 'إعراب الاسم' },
  'diptotes': { label: 'Diptotes', labelAr: 'الممنوع من الصرف' },
  'verb-tense': { label: 'Verb Tense', labelAr: 'أزمنة الفعل' },
  'verb-irab': { label: "Verb I'rab", labelAr: 'إعراب الفعل' },
  'verb-negation': { label: 'Verb Negation', labelAr: 'نفي الفعل' },
  'verb-gender-voice': { label: 'Voice & Gender', labelAr: 'المبني للمعلوم والمجهول' },
  'particles': { label: 'Particles', labelAr: 'الحروف' },
  'masdar-derived': { label: 'Masdar & Derived', labelAr: 'المصدر والمشتقات' },
  'nominal-sentence': { label: 'Nominal Sentence', labelAr: 'الجملة الاسمية' },
  'kana-and-sisters': { label: 'Kana & Sisters', labelAr: 'كان وأخواتها' },
  'inna-and-sisters': { label: 'Inna & Sisters', labelAr: 'إنّ وأخواتها' },
  'verbal-sentence': { label: 'Verbal Sentence', labelAr: 'الجملة الفعلية' },
  'maf-ul-bih': { label: "Maf'ul Bih", labelAr: 'المفعول به' },
  'naib-al-fail': { label: "Na'ib al-Fa'il", labelAr: 'نائب الفاعل' },
  'maf-ul-fihi': { label: "Maf'ul Fihi", labelAr: 'المفعول فيه' },
  'maf-ul-mutlaq': { label: "Maf'ul Mutlaq", labelAr: 'المفعول المطلق' },
  'maf-ul-lahu': { label: "Maf'ul Lahu", labelAr: 'المفعول لأجله' },
  'hal': { label: 'Hal', labelAr: 'الحال' },
  'tamyiz': { label: 'Tamyiz', labelAr: 'التمييز' },
  'mustathna': { label: 'Mustathna', labelAr: 'المستثنى' },
  'maf-ul-ma-ahu': { label: "Maf'ul Ma'ahu", labelAr: 'المفعول معه' },
  'na-t': { label: "Na't (Adjective)", labelAr: 'النعت' },
  'demonstrative-phrases': { label: 'Demonstrative Phrases', labelAr: 'أسماء الإشارة' },
  'atf': { label: 'Atf (Conjunction)', labelAr: 'العطف' },
  'badal': { label: 'Badal (Apposition)', labelAr: 'البدل' },
  'mudaf-ilayhi': { label: 'Mudaf Ilayhi', labelAr: 'المضاف إليه' },
  'prepositions': { label: 'Prepositions', labelAr: 'حروف الجر' },
  'shibh-al-jumla': { label: 'Shibh al-Jumla', labelAr: 'شبه الجملة' },
  'number-phrases': { label: 'Number Phrases', labelAr: 'العدد والمعدود' },
  'damir-marfu': { label: 'Nominative Pronouns', labelAr: 'الضمير المرفوع' },
  'damir-mansub': { label: 'Accusative Pronouns', labelAr: 'الضمير المنصوب' },
  'damir-majrur': { label: 'Genitive Pronouns', labelAr: 'الضمير المجرور' },
  'harf-istifham': { label: 'Question Particles', labelAr: 'حرف الاستفهام' },
  'ism-istifham': { label: 'Question Nouns', labelAr: 'اسم الاستفهام' },
  'tawkid': { label: 'Emphasis', labelAr: 'التوكيد' },
  'jumla-sughra': { label: 'Small Sentence', labelAr: 'الجملة الصغرى' },
  'ism-mawsul': { label: 'Relative Pronoun', labelAr: 'الاسم الموصول' },
  'harf-mawsul': { label: 'Connecting Particle', labelAr: 'الحرف الموصول' },
  'verbal-phrases': { label: 'Verbal Phrases', labelAr: 'التراكيب الفعلية' },
  'nida': { label: 'Vocative', labelAr: 'النداء' },
  'qasam': { label: 'Oath', labelAr: 'القسم' },
  'shart': { label: 'Conditional', labelAr: 'الشرط' },
  'amr-nahy': { label: 'Command & Prohibition', labelAr: 'الأمر والنهي' },
  'jumla-ta-liliyya': { label: 'Reason Clause', labelAr: 'الجملة التعليلية' },
  'jumla-istidrakiyya': { label: 'Adversative Clause', labelAr: 'الجملة الاستدراكية' },
};

/** All topics organized by unit, with labels. */
export function getTopicsByUnit(): Map<number, TopicDefinition[]> {
  const units = new Map<number, TopicDefinition[]>();
  const entries = Object.entries(NAHW_TOPIC_IDS) as [string, readonly string[]][];

  for (const [key, topicIds] of entries) {
    const unitNum = parseInt(key.replace('unit', ''), 10);
    const topics: TopicDefinition[] = topicIds.map((id) => ({
      id,
      label: TOPIC_LABELS[id]?.label ?? id,
      labelAr: TOPIC_LABELS[id]?.labelAr ?? '',
      unit: unitNum,
    }));
    units.set(unitNum, topics);
  }

  return units;
}

/** Direct prerequisites for a topic (not transitive). */
export function getDirectPrerequisites(topicId: string): string[] {
  return NAHW_PREREQUISITE_EDGES
    .filter((e) => e.to === topicId)
    .map((e) => e.from);
}

/** Direct dependents for a topic (not transitive). */
export function getDirectDependents(topicId: string): string[] {
  return NAHW_PREREQUISITE_EDGES
    .filter((e) => e.from === topicId)
    .map((e) => e.to);
}
