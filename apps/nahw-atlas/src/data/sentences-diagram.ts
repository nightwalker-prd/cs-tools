import type { DomainDiagram } from './types';
import { classDefs } from './mermaid-theme';

export const sentencesDiagram: DomainDiagram = {
  id: 'sentences',
  titleEn: 'Sentences',
  titleAr: 'الجمل',
  icon: 'AlignLeft',
  description: 'Nominal and verbal sentences, objects, adverbs, and state.',
  topicCount: 13,
  ruleCount: 20,
  miniMermaid: `graph TD
    S["<b>Sentences</b><br/><small>الجمل</small>"]:::category
    NS["<b>Nominal</b><br/><small>الجملة الاسمية</small>"]:::subtopic
    VS["<b>Verbal</b><br/><small>الجملة الفعلية</small>"]:::subtopic
    AS["<b>Adverbs & State</b><br/><small>الظروف والحال</small>"]:::subtopic
    S --> NS
    S --> VS
    S --> AS
    ${classDefs}`,
  fullMermaid: `graph TD
    S["<b>Sentences</b><br/><small>الجمل</small>"]:::category

    NS["<b>Nominal Sentence</b><br/><small>الجملة الاسمية</small>"]:::subtopic
    S --> NS
    NOM["Nominal Sentence<br/><small>المبتدأ والخبر</small>"]:::topic
    KAN["Kaana & Sisters<br/><small>كان وأخواتها</small>"]:::topic
    INN["Inna & Sisters<br/><small>إن وأخواتها</small>"]:::topic
    NS --> NOM
    NS --> KAN
    NS --> INN

    VS["<b>Verbal Sentence</b><br/><small>الجملة الفعلية</small>"]:::subtopic
    S --> VS
    VRB["Verbal Sentence<br/><small>الفعل والفاعل</small>"]:::topic
    MFB["Maf'ul Bih<br/><small>المفعول به</small>"]:::topic
    NAF["Naa'ib al-Faa'il<br/><small>نائب الفاعل</small>"]:::topic
    VS --> VRB
    VS --> MFB
    VS --> NAF

    AS["<b>Adverbs & State</b><br/><small>الظروف والحال</small>"]:::subtopic
    S --> AS
    MFF["Maf'ul Fihi<br/><small>المفعول فيه</small>"]:::topic
    MFM["Maf'ul Mutlaq<br/><small>المفعول المطلق</small>"]:::topic
    MFL["Maf'ul Lahu<br/><small>المفعول لأجله</small>"]:::topic
    HAL["Haal<br/><small>الحال</small>"]:::topic
    TAM["Tamyiz<br/><small>التمييز</small>"]:::topic
    MUS["Mustathna<br/><small>المستثنى</small>"]:::topic
    MFA["Maf'ul Ma'ahu<br/><small>المفعول معه</small>"]:::topic
    AS --> MFF
    AS --> MFM
    AS --> MFL
    AS --> HAL
    AS --> TAM
    AS --> MUS
    AS --> MFA

    R1["Mubtada' is definite and marfu'<br/><small>المبتدأ معرفة مرفوع</small>"]:::rule
    R2["Khabar is indefinite and marfu'<br/><small>الخبر نكرة مرفوع</small>"]:::rule
    R3["Mubtada' and khabar agree<br/><small>المبتدأ والخبر يتطابقان</small>"]:::rule
    NOM -.- R1
    NOM -.- R2
    NOM -.- R3
    R4["Kaana: ism marfu', khabar mansub<br/><small>كان: الاسم مرفوع والخبر منصوب</small>"]:::rule
    R5["Feminine verb for feminine ism<br/><small>يؤنث الفعل لاسم مؤنث</small>"]:::rule
    KAN -.- R4
    KAN -.- R5
    R6["Inna: ism mansub, khabar marfu'<br/><small>إنّ: الاسم منصوب والخبر مرفوع</small>"]:::rule
    R7["Laam muzahlaqah on khabar<br/><small>اللام المزحلقة في خبر إنّ</small>"]:::rule
    INN -.- R6
    INN -.- R7
    R8["Verb stays singular before subject<br/><small>الفعل يبقى مفرداً قبل الفاعل</small>"]:::rule
    R9["Fa'il is always marfu'<br/><small>الفاعل مرفوع دائماً</small>"]:::rule
    VRB -.- R8
    VRB -.- R9
    R10["Direct object is mansub<br/><small>المفعول به منصوب</small>"]:::rule
    MFB -.- R10
    R11["Replaces fa'il in passive, takes raf'<br/><small>نائب الفاعل مرفوع</small>"]:::rule
    NAF -.- R11
    R12["Adverb of time/place is mansub<br/><small>ظرف الزمان والمكان منصوب</small>"]:::rule
    MFF -.- R12
    R13["Verbal noun for emphasis, mansub<br/><small>المصدر للتوكيد منصوب</small>"]:::rule
    MFM -.- R13
    R14["Adverb of reason is mansub<br/><small>المفعول لأجله منصوب</small>"]:::rule
    MFL -.- R14
    R15["State is indefinite and mansub<br/><small>الحال نكرة منصوب</small>"]:::rule
    R16["Haal can be a full sentence<br/><small>الحال قد تأتي جملة</small>"]:::rule
    HAL -.- R15
    HAL -.- R16
    R17["Clarifying noun, singular mansub<br/><small>التمييز مفرد منصوب</small>"]:::rule
    TAM -.- R17
    R18["Exception with illa: mansub<br/><small>المستثنى بإلا منصوب في التام الموجب</small>"]:::rule
    R19["Incomplete exception follows position<br/><small>الاستثناء الناقص حسب موقعه</small>"]:::rule
    MUS -.- R18
    MUS -.- R19
    R20["Accompaniment with waw: mansub<br/><small>المفعول معه منصوب بعد الواو</small>"]:::rule
    MFA -.- R20

    ${classDefs}`,
  nodes: [
    { id: 'sentences', labelEn: 'Sentences', labelAr: 'الجمل', tooltip: 'Arabic sentences are either nominal (starting with noun) or verbal (starting with verb).', type: 'category' },
    { id: 'nominal-sub', labelEn: 'Nominal Sentence', labelAr: 'الجملة الاسمية', tooltip: 'Sentences beginning with a noun: mubtada (subject) + khabar (predicate).', type: 'subtopic' },
    { id: 'nominal-sentence', labelEn: 'Nominal Sentence', labelAr: 'المبتدأ والخبر', tooltip: 'Basic subject-predicate structure: mubtada + khabar.', type: 'topic' },
    { id: 'kana-sisters', labelEn: 'Kaana & Sisters', labelAr: 'كان وأخواتها', tooltip: 'Verbs that enter nominal sentences, raising the khabar to nasb.', type: 'topic' },
    { id: 'inna-sisters', labelEn: 'Inna & Sisters', labelAr: 'إن وأخواتها', tooltip: 'Particles that enter nominal sentences, putting mubtada in nasb.', type: 'topic' },
    { id: 'verbal-sub', labelEn: 'Verbal Sentence', labelAr: 'الجملة الفعلية', tooltip: 'Sentences beginning with a verb: fi\'l + faa\'il + maf\'ul.', type: 'subtopic' },
    { id: 'verbal-sentence', labelEn: 'Verbal Sentence', labelAr: 'الفعل والفاعل', tooltip: 'Verb + doer (faa\'il), with the verb always singular regardless of faa\'il.', type: 'topic' },
    { id: 'maf-ul-bih', labelEn: 'Maf\'ul Bih', labelAr: 'المفعول به', tooltip: 'Direct object — the entity the action falls upon, in nasb.', type: 'topic' },
    { id: 'naib-al-fail', labelEn: 'Naa\'ib al-Faa\'il', labelAr: 'نائب الفاعل', tooltip: 'Deputy subject in passive voice — takes raf\' like the original faa\'il.', type: 'topic' },
    { id: 'adverbs-state', labelEn: 'Adverbs & State', labelAr: 'الظروف والحال', tooltip: 'Additional sentence elements: time/place adverbs, absolute object, haal, tamyiz.', type: 'subtopic' },
    { id: 'maf-ul-fihi', labelEn: 'Maf\'ul Fihi', labelAr: 'المفعول فيه', tooltip: 'Adverb of time or place — always in nasb.', type: 'topic' },
    { id: 'maf-ul-mutlaq', labelEn: 'Maf\'ul Mutlaq', labelAr: 'المفعول المطلق', tooltip: 'Absolute/cognate object — masdar from same root as verb for emphasis.', type: 'topic' },
    { id: 'maf-ul-lahu', labelEn: 'Maf\'ul Lahu', labelAr: 'المفعول لأجله', tooltip: 'Object of reason — explains why the action happened, in nasb.', type: 'topic' },
    { id: 'hal', labelEn: 'Haal', labelAr: 'الحال', tooltip: 'State/condition of the doer or object at the time of the action.', type: 'topic' },
    { id: 'tamyiz', labelEn: 'Tamyiz', labelAr: 'التمييز', tooltip: 'Specification — clarifies a vague noun or verb, in nasb.', type: 'topic' },
    { id: 'mustathna', labelEn: 'Mustathna', labelAr: 'المستثنى', tooltip: 'Exception — what is excluded from a general statement.', type: 'topic' },
    { id: 'maf-ul-ma-ahu', labelEn: 'Maf\'ul Ma\'ahu', labelAr: 'المفعول معه', tooltip: 'Object of accompaniment — what accompanies the action, in nasb after waw.', type: 'topic' },
  ],
};
