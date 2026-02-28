import type { DomainDiagram } from './types';
import { classDefs } from './mermaid-theme';

export const advancedDiagram: DomainDiagram = {
  id: 'advanced',
  titleEn: 'Advanced',
  titleAr: 'متقدم',
  icon: 'GraduationCap',
  description: 'Advanced rules, emphasis, interrogatives, conditionals, and sentence joining.',
  topicCount: 5,
  ruleCount: 8,
  miniMermaid: `graph TD
    AD["<b>Advanced</b><br/><small>متقدم</small>"]:::category
    AR["<b>Advanced Rules</b><br/><small>قواعد متقدمة</small>"]:::subtopic
    SJ["<b>Complex Sentences</b><br/><small>جمل مركبة</small>"]:::subtopic
    AD --> AR
    AD --> SJ
    ${classDefs}`,
  fullMermaid: `graph TD
    AD["<b>Advanced</b><br/><small>متقدم</small>"]:::category

    AR["<b>Advanced Rules</b><br/><small>قواعد متقدمة</small>"]:::subtopic
    AD --> AR
    ADR["Advanced Grammar Rules<br/><small>قواعد نحوية متقدمة</small>"]:::topic
    EMG["Emphasis Guide<br/><small>التأكيد</small>"]:::topic
    INT["Interrogatives<br/><small>الاستفهام</small>"]:::topic
    AR --> ADR
    AR --> EMG
    AR --> INT

    SJ["<b>Complex Sentences</b><br/><small>جمل مركبة</small>"]:::subtopic
    AD --> SJ
    CDS["Conditional Sentences<br/><small>الشرط المتقدم</small>"]:::topic
    JSN["Joining Sentences<br/><small>التركيب الجملي</small>"]:::topic
    SJ --> CDS
    SJ --> JSN

    R1["Tanazu': shared operators compete<br/><small>التنازع: تعلق عاملين بمعمول</small>"]:::rule
    R2["Ishtighal: pre-posed object absorbed<br/><small>الاشتغال: تقدم المفعول على عامله</small>"]:::rule
    ADR -.- R1
    ADR -.- R2
    R3["Verbal tawkid: repeat the word<br/><small>التوكيد اللفظي: تكرار الكلمة</small>"]:::rule
    R4["Semantic tawkid: nafs/ayn + pronoun<br/><small>التوكيد المعنوي: نفس وعين مع ضمير</small>"]:::rule
    EMG -.- R3
    EMG -.- R4
    R5["Hamza + am = choice; hal = yes/no<br/><small>الهمزة وأم للتعيين وهل للتصديق</small>"]:::rule
    INT -.- R5
    R6["Law/lawla are non-governing<br/><small>لو ولولا غير جازمتين</small>"]:::rule
    R7["Waw + law = concessive 'even though'<br/><small>واو + لو = وصلية بمعنى حتى لو</small>"]:::rule
    CDS -.- R6
    CDS -.- R7
    R8["Sentences combine via atf/shart/sabab<br/><small>الجمل تترابط بالعطف والشرط والسبب</small>"]:::rule
    JSN -.- R8

    ${classDefs}`,
  nodes: [
    { id: 'advanced', labelEn: 'Advanced', labelAr: 'متقدم', tooltip: 'Advanced grammar topics from the tarkib-guide curriculum.', type: 'category' },
    { id: 'advanced-rules-sub', labelEn: 'Advanced Rules', labelAr: 'قواعد متقدمة', tooltip: 'Complex rules, emphasis, and interrogative constructions.', type: 'subtopic' },
    { id: 'advanced-rules', labelEn: 'Advanced Grammar Rules', labelAr: 'قواعد نحوية متقدمة', tooltip: 'Higher-level rules covering exceptions and edge cases in Arabic grammar.', type: 'topic' },
    { id: 'emphasis-guide', labelEn: 'Emphasis Guide', labelAr: 'التأكيد', tooltip: 'Advanced emphasis techniques: verbal, semantic, and oath-based emphasis.', type: 'topic' },
    { id: 'interrogatives', labelEn: 'Interrogatives', labelAr: 'الاستفهام', tooltip: 'Advanced interrogative constructions and rhetorical questions.', type: 'topic' },
    { id: 'complex-sub', labelEn: 'Complex Sentences', labelAr: 'جمل مركبة', tooltip: 'Multi-clause sentence structures and advanced joining patterns.', type: 'subtopic' },
    { id: 'conditional-adv', labelEn: 'Conditional Sentences', labelAr: 'الشرط المتقدم', tooltip: 'Advanced conditional: law, lawlaa, and multi-clause conditions.', type: 'topic' },
    { id: 'joining-adv', labelEn: 'Joining Sentences', labelAr: 'التركيب الجملي', tooltip: 'Advanced methods of combining independent clauses into complex sentences.', type: 'topic' },
  ],
};
