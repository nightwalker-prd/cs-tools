import type { DomainDiagram } from './types';
import { classDefs } from './mermaid-theme';

export const irabDiagram: DomainDiagram = {
  id: 'irab',
  titleEn: "I'rab",
  titleAr: 'الإعراب',
  icon: 'Sigma',
  description: 'Case ending system across nouns and verbs — raf\', nasb, jarr, jazm.',
  topicCount: 6,
  ruleCount: 12,
  miniMermaid: `graph TD
    IR["<b>I'rab</b><br/><small>الإعراب</small>"]:::category
    NI["<b>Noun I'rab</b><br/><small>إعراب الأسماء</small>"]:::subtopic
    VI["<b>Verb I'rab</b><br/><small>إعراب الأفعال</small>"]:::subtopic
    SP["<b>Special Cases</b><br/><small>حالات خاصة</small>"]:::subtopic
    IR --> NI
    IR --> VI
    IR --> SP
    ${classDefs}`,
  fullMermaid: `graph TD
    IR["<b>I'rab</b><br/><small>الإعراب</small>"]:::category

    NI["<b>Noun I'rab</b><br/><small>إعراب الأسماء</small>"]:::subtopic
    IR --> NI
    SNG["Singular & Broken Plural<br/><small>المفرد وجمع التكسير</small>"]:::topic
    DUL["Dual<br/><small>المثنى</small>"]:::topic
    SMP["Sound Masc. Plural<br/><small>جمع المذكر السالم</small>"]:::topic
    SFP["Sound Fem. Plural<br/><small>جمع المؤنث السالم</small>"]:::topic
    NI --> SNG
    NI --> DUL
    NI --> SMP
    NI --> SFP

    VI["<b>Verb I'rab</b><br/><small>إعراب الأفعال</small>"]:::subtopic
    IR --> VI
    MUD["Mudaari' States<br/><small>أحوال المضارع</small>"]:::topic
    JZM["Jazm Particles<br/><small>أدوات الجزم</small>"]:::topic
    VI --> MUD
    VI --> JZM

    SP["<b>Special Cases</b><br/><small>حالات خاصة</small>"]:::subtopic
    IR --> SP
    DIP["Diptotes<br/><small>غير المنصرف</small>"]:::topic
    MBN["Non-Declinable<br/><small>المبني</small>"]:::topic
    SP --> DIP
    SP --> MBN

    R1["Raf' with damma<br/><small>الرفع بالضمة</small>"]:::rule
    R2["Nasb with fatha<br/><small>النصب بالفتحة</small>"]:::rule
    R3["Jarr with kasra<br/><small>الجر بالكسرة</small>"]:::rule
    SNG -.- R1
    SNG -.- R2
    SNG -.- R3
    R4["Raf' with alif (-aani)<br/><small>الرفع بالألف</small>"]:::rule
    R5["Nasb/jarr with yaa (-ayni)<br/><small>النصب والجر بالياء</small>"]:::rule
    DUL -.- R4
    DUL -.- R5
    R6["Raf' with waw (-uuna)<br/><small>الرفع بالواو</small>"]:::rule
    R7["Nasb/jarr with yaa (-iina)<br/><small>النصب والجر بالياء</small>"]:::rule
    SMP -.- R6
    SMP -.- R7
    R8["Nasb with kasra (not fatha)<br/><small>النصب بالكسرة نيابة عن الفتحة</small>"]:::rule
    SFP -.- R8
    R9["Default raf' with damma<br/><small>المضارع مرفوع بالضمة</small>"]:::rule
    R10["Nawasib → fatha; jawazim → sukun<br/><small>النواصب: فتحة والجوازم: سكون</small>"]:::rule
    MUD -.- R9
    MUD -.- R10
    R11["Lam/lamma/laa nahi cause jazm<br/><small>لم ولمّا ولا الناهية تجزم</small>"]:::rule
    JZM -.- R11
    R12["No tanween; fatha replaces kasra<br/><small>لا تنوين والفتحة بدل الكسرة</small>"]:::rule
    DIP -.- R12

    ${classDefs}`,
  nodes: [
    { id: 'irab', labelEn: "I'rab", labelAr: 'الإعراب', tooltip: 'The system of case endings that show a word\'s grammatical role in a sentence.', type: 'category' },
    { id: 'noun-irab-cat', labelEn: 'Noun I\'rab', labelAr: 'إعراب الأسماء', tooltip: 'Six types of noun declension with different signs for raf\', nasb, and jarr.', type: 'subtopic' },
    { id: 'singular-bp', labelEn: 'Singular & Broken Plural', labelAr: 'المفرد وجمع التكسير', tooltip: 'Standard vowel markers: damma (raf\'), fatha (nasb), kasra (jarr).', type: 'topic' },
    { id: 'dual-irab', labelEn: 'Dual', labelAr: 'المثنى', tooltip: 'Alif (-aani) for raf\', yaa (-ayni) for nasb and jarr.', type: 'topic' },
    { id: 'smp-irab', labelEn: 'Sound Masc. Plural', labelAr: 'جمع المذكر السالم', tooltip: 'Waw (-uuna) for raf\', yaa (-iina) for nasb and jarr.', type: 'topic' },
    { id: 'sfp-irab', labelEn: 'Sound Fem. Plural', labelAr: 'جمع المؤنث السالم', tooltip: 'Damma for raf\', kasra for both nasb and jarr (kasra replaces fatha).', type: 'topic' },
    { id: 'verb-irab-cat', labelEn: 'Verb I\'rab', labelAr: 'إعراب الأفعال', tooltip: 'Present tense verbs are declinable: raf\', nasb, and jazm.', type: 'subtopic' },
    { id: 'mudaari-states', labelEn: 'Mudaari\' States', labelAr: 'أحوال المضارع', tooltip: 'Default raf\' with damma, nasb with fatha after particles, jazm with sukuun.', type: 'topic' },
    { id: 'jazm-particles', labelEn: 'Jazm Particles', labelAr: 'أدوات الجزم', tooltip: 'Lam, laa (prohibitive), lamma — put present tense in jazm state.', type: 'topic' },
    { id: 'special-cases', labelEn: 'Special Cases', labelAr: 'حالات خاصة', tooltip: 'Diptotes and non-declinable words follow different i\'rab rules.', type: 'subtopic' },
    { id: 'diptotes-irab', labelEn: 'Diptotes', labelAr: 'غير المنصرف', tooltip: 'No tanween, no kasra — fatha replaces kasra in jarr.', type: 'topic' },
    { id: 'non-declinable', labelEn: 'Non-Declinable', labelAr: 'المبني', tooltip: 'Words whose endings never change regardless of position (demonstratives, past tense verbs).', type: 'topic' },
  ],
};
