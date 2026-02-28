import type { DomainDiagram } from './types';
import { classDefs } from './mermaid-theme';

export const pronounsDiagram: DomainDiagram = {
  id: 'pronouns',
  titleEn: 'Pronouns',
  titleAr: 'الضمائر',
  icon: 'User',
  description: 'Personal pronouns, interrogative pronouns, and emphasis.',
  topicCount: 6,
  ruleCount: 8,
  miniMermaid: `graph TD
    PR["<b>Pronouns</b><br/><small>الضمائر</small>"]:::category
    PP["<b>Personal</b><br/><small>الضمائر الشخصية</small>"]:::subtopic
    IP["<b>Interrogative</b><br/><small>الاستفهام</small>"]:::subtopic
    EM["<b>Emphasis</b><br/><small>التوكيد</small>"]:::subtopic
    PR --> PP
    PR --> IP
    PR --> EM
    ${classDefs}`,
  fullMermaid: `graph TD
    PR["<b>Pronouns</b><br/><small>الضمائر</small>"]:::category

    PP["<b>Personal Pronouns</b><br/><small>الضمائر الشخصية</small>"]:::subtopic
    PR --> PP
    DM["Raf' Pronouns<br/><small>ضمائر الرفع</small>"]:::topic
    DN["Nasb Pronouns<br/><small>ضمائر النصب</small>"]:::topic
    DJ["Jarr Pronouns<br/><small>ضمائر الجر</small>"]:::topic
    PP --> DM
    PP --> DN
    PP --> DJ

    IP["<b>Interrogative Pronouns</b><br/><small>أسماء الاستفهام</small>"]:::subtopic
    PR --> IP
    HI["Interrogative Particles<br/><small>حروف الاستفهام</small>"]:::topic
    II["Interrogative Nouns<br/><small>أسماء الاستفهام</small>"]:::topic
    IP --> HI
    IP --> II

    EM["<b>Emphasis</b><br/><small>التوكيد</small>"]:::subtopic
    PR --> EM
    TW["Tawkid<br/><small>التوكيد اللفظي والمعنوي</small>"]:::topic
    EM --> TW

    R1["Pronouns are mabni (indeclinable)<br/><small>الضمائر مبنية لا تتغير</small>"]:::rule
    R2["Subject pronoun: hidden or visible<br/><small>ضمير الرفع: مستتر أو بارز</small>"]:::rule
    DM -.- R1
    DM -.- R2
    R3["Object pronoun attaches to verb<br/><small>ضمير النصب يتصل بالفعل</small>"]:::rule
    DN -.- R3
    R4["Genitive pronoun on noun/prep.<br/><small>ضمير الجر يتصل بالاسم أو الحرف</small>"]:::rule
    DJ -.- R4
    R5["Particles have no i'rab position<br/><small>الحروف لا محل لها من الإعراب</small>"]:::rule
    HI -.- R5
    R6["Interrogative nouns fill a slot<br/><small>أسماء الاستفهام تشغل موقعاً إعرابياً</small>"]:::rule
    R7["Man/ma as mubtada' or khabar<br/><small>مَن وما مبتدأ أو خبر مقدم</small>"]:::rule
    II -.- R6
    II -.- R7
    R8["Tawkid follows in i'rab + pronoun<br/><small>التوكيد يتبع ويحتاج ضميراً</small>"]:::rule
    TW -.- R8

    ${classDefs}`,
  nodes: [
    { id: 'pronouns', labelEn: 'Pronouns', labelAr: 'الضمائر', tooltip: 'Personal, interrogative, and emphatic pronouns in Arabic grammar.', type: 'category' },
    { id: 'personal', labelEn: 'Personal Pronouns', labelAr: 'الضمائر الشخصية', tooltip: 'Separate and attached pronouns in three grammatical states.', type: 'subtopic' },
    { id: 'damir-marfu', labelEn: 'Raf\' Pronouns', labelAr: 'ضمائر الرفع', tooltip: 'Subject pronouns — separate (ana, anta) and attached (verb suffixes).', type: 'topic' },
    { id: 'damir-mansub', labelEn: 'Nasb Pronouns', labelAr: 'ضمائر النصب', tooltip: 'Object pronouns — attached to verbs (e.g. -hu, -ha, -hum).', type: 'topic' },
    { id: 'damir-majrur', labelEn: 'Jarr Pronouns', labelAr: 'ضمائر الجر', tooltip: 'Possessive/prepositional pronouns — attached to nouns or prepositions.', type: 'topic' },
    { id: 'interrogative', labelEn: 'Interrogative Pronouns', labelAr: 'أسماء الاستفهام', tooltip: 'Question words: particles (hal, a-) and nouns (man, maa, kayfa).', type: 'subtopic' },
    { id: 'harf-istifham', labelEn: 'Interrogative Particles', labelAr: 'حروف الاستفهام', tooltip: 'Hal and hamza — yes/no question particles with no grammatical effect.', type: 'topic' },
    { id: 'ism-istifham', labelEn: 'Interrogative Nouns', labelAr: 'أسماء الاستفهام', tooltip: 'Man (who), maa (what), kayfa (how), ayna (where), mataa (when).', type: 'topic' },
    { id: 'emphasis-sub', labelEn: 'Emphasis', labelAr: 'التوكيد', tooltip: 'Verbal emphasis (repeating) and semantic emphasis (nafs, \'ayn, kull, jamii\').', type: 'subtopic' },
    { id: 'tawkid', labelEn: 'Tawkid', labelAr: 'التوكيد اللفظي والمعنوي', tooltip: 'Two types: lafzi (word repetition) and ma\'nawi (using nafs/\'ayn/kull/jamii\').', type: 'topic' },
  ],
};
