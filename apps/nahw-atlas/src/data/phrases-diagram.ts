import type { DomainDiagram } from './types';
import { classDefs } from './mermaid-theme';

export const phrasesDiagram: DomainDiagram = {
  id: 'phrases',
  titleEn: 'Phrases',
  titleAr: 'التراكيب',
  icon: 'Link',
  description: 'Descriptive, possessive, conjunctive phrases, and number constructions.',
  topicCount: 8,
  ruleCount: 14,
  miniMermaid: `graph TD
    PH["<b>Phrases</b><br/><small>التراكيب</small>"]:::category
    DD["<b>Descriptive</b><br/><small>النعت والإشارة</small>"]:::subtopic
    CA["<b>Conjunctive</b><br/><small>العطف والبدل</small>"]:::subtopic
    PP["<b>Possessive</b><br/><small>الإضافة والجر</small>"]:::subtopic
    PH --> DD
    PH --> CA
    PH --> PP
    ${classDefs}`,
  fullMermaid: `graph TD
    PH["<b>Phrases</b><br/><small>التراكيب</small>"]:::category

    DD["<b>Descriptive & Demonstrative</b><br/><small>النعت والإشارة</small>"]:::subtopic
    PH --> DD
    NAT["Na't (Adjective)<br/><small>النعت</small>"]:::topic
    DEM["Demonstrative Phrases<br/><small>أسماء الإشارة</small>"]:::topic
    DD --> NAT
    DD --> DEM

    CA["<b>Conjunctive & Appositive</b><br/><small>العطف والبدل</small>"]:::subtopic
    PH --> CA
    ATF["'Atf (Conjunction)<br/><small>العطف</small>"]:::topic
    BAD["Badal (Appositive)<br/><small>البدل</small>"]:::topic
    CA --> ATF
    CA --> BAD

    PP["<b>Possessive & Prepositional</b><br/><small>الإضافة والجر</small>"]:::subtopic
    PH --> PP
    MUD["Mudaf-Ilayhi<br/><small>المضاف إليه</small>"]:::topic
    PRE["Prepositions<br/><small>حروف الجر</small>"]:::topic
    SHJ["Shibh al-Jumla<br/><small>شبه الجملة</small>"]:::topic
    PP --> MUD
    PP --> PRE
    PP --> SHJ

    NP["<b>Number Phrases</b><br/><small>تراكيب العدد</small>"]:::subtopic
    PH --> NP
    NUM["Number Constructions<br/><small>العدد والمعدود</small>"]:::topic
    NP --> NUM

    R1["Na't follows in 4 properties (DING)<br/><small>النعت يتبع في أربع خصائص</small>"]:::rule
    R2["Na't can be a sentence for indefinite<br/><small>النعت الجملي للنكرة</small>"]:::rule
    NAT -.- R1
    NAT -.- R2
    R3["Demonstrative precedes the noun<br/><small>اسم الإشارة يسبق المشار إليه</small>"]:::rule
    R4["Ism ishara follows in i'rab<br/><small>المشار إليه يتبع في الإعراب</small>"]:::rule
    DEM -.- R3
    DEM -.- R4
    R5["Conjoined follows in i'rab<br/><small>المعطوف يتبع المعطوف عليه</small>"]:::rule
    R6["Waw joins, fa sequences, thumma delays<br/><small>الواو للجمع والفاء للترتيب وثم للتراخي</small>"]:::rule
    R7["Aw for choice or doubt<br/><small>أو للتخيير أو الشك</small>"]:::rule
    ATF -.- R5
    ATF -.- R6
    ATF -.- R7
    R8["Badal follows in i'rab<br/><small>البدل يتبع المبدل منه</small>"]:::rule
    R9["Part/inclusion badal needs pronoun<br/><small>بدل البعض يحتاج ضميراً</small>"]:::rule
    BAD -.- R8
    BAD -.- R9
    R10["Mudaf drops tanween and nun<br/><small>المضاف يحذف تنوينه ونونه</small>"]:::rule
    R11["Mudaf ilayhi always in jarr<br/><small>المضاف إليه مجرور دائماً</small>"]:::rule
    MUD -.- R10
    MUD -.- R11
    R12["Object of preposition in jarr<br/><small>الاسم المجرور بحرف الجر</small>"]:::rule
    PRE -.- R12
    R13["Prep. phrase as khabar/sifa/haal<br/><small>شبه الجملة خبر أو صفة أو حال</small>"]:::rule
    SHJ -.- R13
    R14["Counted noun varies by range<br/><small>المعدود يختلف حسب العدد</small>"]:::rule
    NUM -.- R14

    ${classDefs}`,
  nodes: [
    { id: 'phrases', labelEn: 'Phrases', labelAr: 'التراكيب', tooltip: 'Multi-word constructions below the sentence level: descriptive, possessive, conjunctive, number.', type: 'category' },
    { id: 'desc-demo', labelEn: 'Descriptive & Demonstrative', labelAr: 'النعت والإشارة', tooltip: 'Adjective phrases (na\'t follows in 4 properties) and demonstrative phrases.', type: 'subtopic' },
    { id: 'na-t', labelEn: 'Na\'t (Adjective)', labelAr: 'النعت', tooltip: 'Adjective must match the described noun in 4 properties: definiteness, gender, number, case.', type: 'topic' },
    { id: 'demonstrative', labelEn: 'Demonstrative Phrases', labelAr: 'أسماء الإشارة', tooltip: 'Phrases with haadha/haadhihi — demonstrative follows the noun pattern.', type: 'topic' },
    { id: 'conj-appos', labelEn: 'Conjunctive & Appositive', labelAr: 'العطف والبدل', tooltip: 'Joining words (\'atf with wa/fa/thumma) and appositives (badal replaces first noun).', type: 'subtopic' },
    { id: 'atf', labelEn: '\'Atf (Conjunction)', labelAr: 'العطف', tooltip: 'Second noun follows first in case via conjunction particle (wa, fa, thumma, aw).', type: 'topic' },
    { id: 'badal', labelEn: 'Badal (Appositive)', labelAr: 'البدل', tooltip: 'A noun that replaces or clarifies the preceding noun, matching its case.', type: 'topic' },
    { id: 'poss-prep', labelEn: 'Possessive & Prepositional', labelAr: 'الإضافة والجر', tooltip: 'Idaafa (possessive), prepositions (huruf al-jarr), and semi-sentences.', type: 'subtopic' },
    { id: 'mudaf', labelEn: 'Mudaf-Ilayhi', labelAr: 'المضاف إليه', tooltip: 'Possessive construction: 1st noun loses tanween, 2nd goes to jarr.', type: 'topic' },
    { id: 'prepositions', labelEn: 'Prepositions', labelAr: 'حروف الجر', tooltip: 'Particles that put the following noun into jarr case.', type: 'topic' },
    { id: 'shibh-jumla', labelEn: 'Shibh al-Jumla', labelAr: 'شبه الجملة', tooltip: 'Prepositional phrases and adverbial phrases that act as predicates.', type: 'topic' },
    { id: 'number-ph', labelEn: 'Number Phrases', labelAr: 'تراكيب العدد', tooltip: 'Number-noun constructions with complex gender and case agreement rules.', type: 'subtopic' },
    { id: 'number-constructions', labelEn: 'Number Constructions', labelAr: 'العدد والمعدود', tooltip: 'Numbers 1-10, 11-19, 20-99, 100+ each have different agreement patterns.', type: 'topic' },
  ],
};
