import type { DomainDiagram } from './types';
import { classDefs } from './mermaid-theme';

export const joiningDiagram: DomainDiagram = {
  id: 'joining-sentences',
  titleEn: 'Joining Sentences',
  titleAr: 'ربط الجمل',
  icon: 'GitMerge',
  description: 'Vocative, oath, conditional, and command constructions.',
  topicCount: 6,
  ruleCount: 10,
  miniMermaid: `graph TD
    JN["<b>Joining Sentences</b><br/><small>ربط الجمل</small>"]:::category
    VO["<b>Vocative & Oath</b><br/><small>النداء والقسم</small>"]:::subtopic
    CD["<b>Conditional</b><br/><small>الشرط</small>"]:::subtopic
    CR["<b>Command & Reason</b><br/><small>الأمر والتعليل</small>"]:::subtopic
    JN --> VO
    JN --> CD
    JN --> CR
    ${classDefs}`,
  fullMermaid: `graph TD
    JN["<b>Joining Sentences</b><br/><small>ربط الجمل</small>"]:::category

    VO["<b>Vocative & Oath</b><br/><small>النداء والقسم</small>"]:::subtopic
    JN --> VO
    NID["Nidaa' (Vocative)<br/><small>النداء</small>"]:::topic
    QAS["Qasam (Oath)<br/><small>القسم</small>"]:::topic
    VO --> NID
    VO --> QAS

    CD["<b>Conditional</b><br/><small>الشرط</small>"]:::subtopic
    JN --> CD
    SHR["Shart<br/><small>الشرط</small>"]:::topic
    CD --> SHR

    CR["<b>Command & Clarification</b><br/><small>الأمر والتعليل</small>"]:::subtopic
    JN --> CR
    AN["Amr & Nahy<br/><small>الأمر والنهي</small>"]:::topic
    JT["Jumla Ta'liliyya<br/><small>الجملة التعليلية</small>"]:::topic
    JI["Jumla Istidraakiyya<br/><small>الجملة الاستدراكية</small>"]:::topic
    CR --> AN
    CR --> JT
    CR --> JI

    R1["Munada mansub unless single definite<br/><small>المنادى منصوب إلا المفرد المعرفة</small>"]:::rule
    R2["Yaa is the most common particle<br/><small>يا أشهر حروف النداء</small>"]:::rule
    NID -.- R1
    NID -.- R2
    R3["Oath: particle + sworn-by + response<br/><small>القسم: حرف + مقسم به + جواب</small>"]:::rule
    QAS -.- R3
    R4["Inn causes jazm in both clauses<br/><small>إنْ تجزم فعل الشرط والجواب</small>"]:::rule
    R5["Fa' rabita links non-verbal jawab<br/><small>فاء الربط تربط الجواب غير الفعلي</small>"]:::rule
    R6["Jawab can precede the shart<br/><small>قد يتقدم الجواب على الشرط</small>"]:::rule
    SHR -.- R4
    SHR -.- R5
    SHR -.- R6
    R7["Amr with lam; nahy with laa + jazm<br/><small>الأمر بلام الأمر والنهي بلا الناهية</small>"]:::rule
    AN -.- R7
    R8["Explanatory clause gives reason<br/><small>الجملة التعليلية تبين السبب</small>"]:::rule
    JT -.- R8
    R9["Laakinna corrects prior statement<br/><small>لكنّ للاستدراك والتصحيح</small>"]:::rule
    R10["Bal retracts and replaces<br/><small>بل للإضراب والرجوع</small>"]:::rule
    JI -.- R9
    JI -.- R10

    ${classDefs}`,
  nodes: [
    { id: 'joining', labelEn: 'Joining Sentences', labelAr: 'ربط الجمل', tooltip: 'Constructions that connect independent sentences: vocative, oath, conditional, command.', type: 'category' },
    { id: 'vocative-oath', labelEn: 'Vocative & Oath', labelAr: 'النداء والقسم', tooltip: 'Calling someone (yaa + munaada) and swearing an oath (wallaahi).', type: 'subtopic' },
    { id: 'nida', labelEn: 'Nidaa\' (Vocative)', labelAr: 'النداء', tooltip: 'Calling/addressing with yaa — munaada case depends on whether it\'s a single definite word.', type: 'topic' },
    { id: 'qasam', labelEn: 'Qasam (Oath)', labelAr: 'القسم', tooltip: 'Oath with wallaahi/tallaahi/billaahi — answer often starts with la- or inna.', type: 'topic' },
    { id: 'conditional-sub', labelEn: 'Conditional', labelAr: 'الشرط', tooltip: 'If-then constructions with jazm or non-jazm conditional particles.', type: 'subtopic' },
    { id: 'shart', labelEn: 'Shart', labelAr: 'الشرط', tooltip: 'Three parts: conditional tool (in/idhaa), condition (shart), answer (jawaab).', type: 'topic' },
    { id: 'command-sub', labelEn: 'Command & Clarification', labelAr: 'الأمر والتعليل', tooltip: 'Commands, prohibitions, explanatory, and corrective sentence types.', type: 'subtopic' },
    { id: 'amr-nahy', labelEn: 'Amr & Nahy', labelAr: 'الأمر والنهي', tooltip: 'Imperative commands (if\'al) and prohibitions (laa taf\'al).', type: 'topic' },
    { id: 'jumla-taliliyya', labelEn: 'Jumla Ta\'liliyya', labelAr: 'الجملة التعليلية', tooltip: 'Explanatory sentences that give the reason for the preceding statement.', type: 'topic' },
    { id: 'jumla-istidrakiyya', labelEn: 'Jumla Istidraakiyya', labelAr: 'الجملة الاستدراكية', tooltip: 'Corrective sentences with laakinna/bal that amend a previous statement.', type: 'topic' },
  ],
};
