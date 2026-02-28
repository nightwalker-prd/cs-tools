import type { DomainDiagram } from './types';
import { classDefs } from './mermaid-theme';

export const wordsDiagram: DomainDiagram = {
  id: 'words',
  titleEn: 'Words',
  titleAr: 'الكلمات',
  icon: 'BookOpen',
  description: 'Word types, noun characteristics, verb properties, and particles.',
  topicCount: 12,
  ruleCount: 18,
  miniMermaid: `graph TD
    W["<b>Words</b><br/><small>الكلمات</small>"]:::category
    N["<b>Nouns</b><br/><small>الأسماء</small>"]:::subtopic
    V["<b>Verbs</b><br/><small>الأفعال</small>"]:::subtopic
    P["<b>Particles</b><br/><small>الحروف</small>"]:::subtopic
    W --> N
    W --> V
    W --> P
    ${classDefs}`,
  fullMermaid: `graph TD
    W["<b>Words</b><br/><small>الكلمات</small>"]:::category

    WT["<b>Word Types</b><br/><small>أقسام الكلمة</small>"]:::subtopic
    W --> WT

    NC["<b>Noun Characteristics</b><br/><small>خصائص الاسم</small>"]:::subtopic
    W --> NC
    DI["Definite & Indefinite<br/><small>المعرفة والنكرة</small>"]:::topic
    GN["Gender<br/><small>المذكر والمؤنث</small>"]:::topic
    NU["Number<br/><small>المفرد والمثنى والجمع</small>"]:::topic
    NI["Noun I'rab<br/><small>إعراب الأسماء</small>"]:::topic
    DP["Diptotes<br/><small>غير المنصرف</small>"]:::topic
    NC --> DI
    NC --> GN
    NC --> NU
    NC --> NI
    NC --> DP

    VC["<b>Verb Characteristics</b><br/><small>خصائص الفعل</small>"]:::subtopic
    W --> VC
    VT["Verb Tense<br/><small>أزمنة الفعل</small>"]:::topic
    VI["Verb I'rab<br/><small>إعراب الأفعال</small>"]:::topic
    VN["Verb Negation<br/><small>نفي الفعل</small>"]:::topic
    VG["Gender & Voice<br/><small>الجنس والبناء</small>"]:::topic
    VC --> VT
    VC --> VI
    VC --> VN
    VC --> VG

    PD["<b>Particles & Derived</b><br/><small>الحروف والمشتقات</small>"]:::subtopic
    W --> PD
    PA["Particles<br/><small>الحروف</small>"]:::topic
    MD["Masdar & Derived<br/><small>المصدر والمشتقات</small>"]:::topic
    PD --> PA
    PD --> MD

    R1["Every word is ism, fi'l, or harf<br/><small>كل كلمة: اسم أو فعل أو حرف</small>"]:::rule
    R2["Noun known by al- or tanween<br/><small>الاسم يقبل أل والتنوين</small>"]:::rule
    R3["Verb known by tense patterns<br/><small>الفعل يُعرف بالزمن</small>"]:::rule
    WT -.- R1
    WT -.- R2
    WT -.- R3
    R4["Ma'rifa has al- or proper name<br/><small>المعرفة بأل أو العلم</small>"]:::rule
    R5["Sun letters assimilate the lam<br/><small>الحروف الشمسية تدغم اللام</small>"]:::rule
    DI -.- R4
    DI -.- R5
    R6["Every noun is masculine or feminine<br/><small>كل اسم مذكر أو مؤنث</small>"]:::rule
    R7["Feminine has 3 markers: ة / ى / اء<br/><small>علامات التأنيث الثلاث</small>"]:::rule
    GN -.- R6
    GN -.- R7
    R8["Dual adds -aani in raf'<br/><small>المثنى يُرفع بالألف</small>"]:::rule
    R9["Sound masc. plural adds -uuna<br/><small>جمع المذكر يُرفع بالواو</small>"]:::rule
    NU -.- R8
    NU -.- R9
    R10["Dual: raf' alif, nasb/jarr yaa<br/><small>المثنى: الألف رفعاً والياء نصباً وجراً</small>"]:::rule
    R11["Jam' mudhakkar: raf' with waw<br/><small>جمع المذكر السالم: الواو رفعاً</small>"]:::rule
    R12["Jam' mu'annath: nasb with kasra<br/><small>جمع المؤنث السالم: الكسرة نصباً</small>"]:::rule
    NI -.- R10
    NI -.- R11
    NI -.- R12
    R13["Sa-/sawfa specify future tense<br/><small>سوف والسين للمستقبل</small>"]:::rule
    R14["Past tense verb is mabni<br/><small>الماضي مبني على الفتح</small>"]:::rule
    VT -.- R13
    VT -.- R14
    R15["Mudaari': damma / fatha / sukun<br/><small>المضارع: ضمة رفعاً وفتحة نصباً وسكون جزماً</small>"]:::rule
    R16["Amr is always majzum<br/><small>الأمر مبني على السكون</small>"]:::rule
    VI -.- R15
    VI -.- R16
    R17["Lam negates past and causes jazm<br/><small>لَمْ: نفي وجزم المضارع</small>"]:::rule
    R18["Lan negates future and causes nasb<br/><small>لَنْ: نفي ونصب المستقبل</small>"]:::rule
    VN -.- R17
    VN -.- R18

    ${classDefs}`,
  nodes: [
    { id: 'words', labelEn: 'Words', labelAr: 'الكلمات', tooltip: 'The three fundamental word types in Arabic: nouns, verbs, and particles.', type: 'category' },
    { id: 'word-types', labelEn: 'Word Types', labelAr: 'أقسام الكلمة', tooltip: 'Every Arabic word is a noun (ism), verb (fi\'l), or particle (harf).', type: 'subtopic' },
    { id: 'noun-chars', labelEn: 'Noun Characteristics', labelAr: 'خصائص الاسم', tooltip: 'Properties unique to nouns: definiteness, gender, number, case endings, and diptotes.', type: 'subtopic' },
    { id: 'definite-indefinite', labelEn: 'Definite & Indefinite', labelAr: 'المعرفة والنكرة', tooltip: 'Nouns are definite (with al- or proper name) or indefinite (with tanween).', type: 'topic' },
    { id: 'gender', labelEn: 'Gender', labelAr: 'المذكر والمؤنث', tooltip: 'All Arabic nouns are masculine or feminine — three types of feminine.', type: 'topic' },
    { id: 'number', labelEn: 'Number', labelAr: 'المفرد والمثنى والجمع', tooltip: 'Singular, dual (-aani), and plural (sound or broken).', type: 'topic' },
    { id: 'noun-irab', labelEn: 'Noun I\'rab', labelAr: 'إعراب الأسماء', tooltip: 'Case endings: raf\' (nominative), nasb (accusative), jarr (genitive) across 6 noun types.', type: 'topic' },
    { id: 'diptotes', labelEn: 'Diptotes', labelAr: 'غير المنصرف', tooltip: 'Special nouns that reject kasra and tanween — names, plurals, adjectives.', type: 'topic' },
    { id: 'verb-chars', labelEn: 'Verb Characteristics', labelAr: 'خصائص الفعل', tooltip: 'Properties unique to verbs: tense, i\'rab, negation, gender, and voice.', type: 'subtopic' },
    { id: 'verb-tense', labelEn: 'Verb Tense', labelAr: 'أزمنة الفعل', tooltip: 'Past (maadi), present (mudaari\'), and imperative (amr).', type: 'topic' },
    { id: 'verb-irab', labelEn: 'Verb I\'rab', labelAr: 'إعراب الأفعال', tooltip: 'Present tense verbs are declinable: raf\', nasb (with particles), jazm (with particles).', type: 'topic' },
    { id: 'verb-negation', labelEn: 'Verb Negation', labelAr: 'نفي الفعل', tooltip: 'Negating verbs with lam, laa, maa, lan, and other particles.', type: 'topic' },
    { id: 'verb-gender-voice', labelEn: 'Gender & Voice', labelAr: 'الجنس والبناء', tooltip: 'Active/passive voice and masculine/feminine verb conjugation.', type: 'topic' },
    { id: 'particles-derived', labelEn: 'Particles & Derived', labelAr: 'الحروف والمشتقات', tooltip: 'Particles (harf) and derived noun forms (masdar, ism faa\'il, etc.).', type: 'subtopic' },
    { id: 'particles', labelEn: 'Particles', labelAr: 'الحروف', tooltip: 'Words with no meaning alone — prepositions, conjunctions, interrogatives.', type: 'topic' },
    { id: 'masdar-derived', labelEn: 'Masdar & Derived', labelAr: 'المصدر والمشتقات', tooltip: 'Verbal nouns (masdar) and derived forms like active/passive participle.', type: 'topic' },
  ],
};
