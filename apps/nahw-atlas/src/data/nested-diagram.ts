import type { DomainDiagram } from './types';
import { classDefs } from './mermaid-theme';

export const nestedDiagram: DomainDiagram = {
  id: 'nested-sentences',
  titleEn: 'Nested Sentences',
  titleAr: 'الجمل المتداخلة',
  icon: 'Layers',
  description: 'Small sentences, relative pronouns, and conjunction particles.',
  topicCount: 4,
  ruleCount: 6,
  miniMermaid: `graph TD
    NE["<b>Nested Sentences</b><br/><small>الجمل المتداخلة</small>"]:::category
    DN["<b>Direct Nesting</b><br/><small>الجملة الصغرى</small>"]:::subtopic
    RP["<b>Relative</b><br/><small>الموصول</small>"]:::subtopic
    CP["<b>Conjunction</b><br/><small>الحروف الموصولة</small>"]:::subtopic
    NE --> DN
    NE --> RP
    NE --> CP
    ${classDefs}`,
  fullMermaid: `graph TD
    NE["<b>Nested Sentences</b><br/><small>الجمل المتداخلة</small>"]:::category

    DN["<b>Direct Nesting</b><br/><small>الجملة الصغرى</small>"]:::subtopic
    NE --> DN
    JS["Jumla Sughra<br/><small>الجملة الصغرى</small>"]:::topic
    DN --> JS

    RP["<b>Relative Pronouns</b><br/><small>الأسماء الموصولة</small>"]:::subtopic
    NE --> RP
    IM["Ism Mawsul<br/><small>الاسم الموصول</small>"]:::topic
    RP --> IM

    CP["<b>Conjunction Particles</b><br/><small>الحروف الموصولة</small>"]:::subtopic
    NE --> CP
    HM["Harf Mawsul<br/><small>الحرف الموصول</small>"]:::topic
    VP["Verbal Phrases<br/><small>التراكيب الفعلية</small>"]:::topic
    CP --> HM
    CP --> VP

    R1["Inner sentence as khabar/sifa/haal<br/><small>الجملة الصغرى خبر أو صفة أو حال</small>"]:::rule
    R2["Must relate back to outer sentence<br/><small>لا بد من رابط بالجملة الكبرى</small>"]:::rule
    JS -.- R1
    JS -.- R2
    R3["Sila must have return pronoun<br/><small>صلة الموصول تحتاج عائداً</small>"]:::rule
    R4["Definite uses mawsul; indefinite direct<br/><small>المعرفة بالموصول والنكرة مباشرة</small>"]:::rule
    IM -.- R3
    IM -.- R4
    R5["Conjunction particle + verb = masdar<br/><small>الحرف المصدري + فعل = مصدر مؤول</small>"]:::rule
    HM -.- R5
    R6["An/ma/anna create noun-like phrases<br/><small>أن وما وأنّ تصنع مصدراً مؤولاً</small>"]:::rule
    VP -.- R6

    ${classDefs}`,
  nodes: [
    { id: 'nested', labelEn: 'Nested Sentences', labelAr: 'الجمل المتداخلة', tooltip: 'Sentences embedded within other sentences as khabar, sifa, haal, or sila.', type: 'category' },
    { id: 'direct-nesting', labelEn: 'Direct Nesting', labelAr: 'الجملة الصغرى', tooltip: 'A small sentence acting as predicate or description within a larger sentence.', type: 'subtopic' },
    { id: 'jumla-sughra', labelEn: 'Jumla Sughra', labelAr: 'الجملة الصغرى', tooltip: 'A sentence within a sentence — can serve as khabar, sifa, or haal.', type: 'topic' },
    { id: 'relative-sub', labelEn: 'Relative Pronouns', labelAr: 'الأسماء الموصولة', tooltip: 'Alladhi/allati connect a descriptive clause (sila) to a noun.', type: 'subtopic' },
    { id: 'ism-mawsul', labelEn: 'Ism Mawsul', labelAr: 'الاسم الموصول', tooltip: 'Relative pronouns (alladhi, allati, alladhiina) — sila clause must have return pronoun.', type: 'topic' },
    { id: 'conjunction-sub', labelEn: 'Conjunction Particles', labelAr: 'الحروف الموصولة', tooltip: 'Particles that embed clauses: an, anna, maa masdariyya.', type: 'subtopic' },
    { id: 'harf-mawsul', labelEn: 'Harf Mawsul', labelAr: 'الحرف الموصول', tooltip: 'Masdariyya particles (an, anna, maa) that convert clauses into nouns.', type: 'topic' },
    { id: 'verbal-phrases', labelEn: 'Verbal Phrases', labelAr: 'التراكيب الفعلية', tooltip: 'Nasb/jazm particles creating subordinate verbal constructions.', type: 'topic' },
  ],
};
