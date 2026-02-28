/**
 * Grammatical Labels - Comprehensive Arabic Grammar Terminology
 *
 * Extracted from TarkeebTool.tsx for reusability across components.
 * Contains 150+ Arabic grammar terms organized by category.
 */

export interface GrammaticalLabel {
  id: string;
  ar: string;
  en: string;
}

export interface GrammaticalLabels {
  partsOfSpeech: GrammaticalLabel[];
  sentenceTypes: GrammaticalLabel[];
  cases: GrammaticalLabel[];
  roles: GrammaticalLabel[];
  verbs: GrammaticalLabel[];
  pronouns: GrammaticalLabel[];
  kanaAndSisters: GrammaticalLabel[];
  innaAndSisters: GrammaticalLabel[];
  prepositions: GrammaticalLabel[];
  demonstratives: GrammaticalLabel[];
  relatives: GrammaticalLabel[];
  derivedNouns: GrammaticalLabel[];
  nounTypes: GrammaticalLabel[];
  phrasalConstructs: GrammaticalLabel[];
  numbers: GrammaticalLabel[];
  exceptionConstructs: GrammaticalLabel[];
  conditionalParticles: GrammaticalLabel[];
  syntax: GrammaticalLabel[];
  verbForms: GrammaticalLabel[];
  verbTypes: GrammaticalLabel[];
  pluralTypes: GrammaticalLabel[];
  nasbParticles: GrammaticalLabel[];
  jazmParticles: GrammaticalLabel[];
  conjunctions: GrammaticalLabel[];
  negation: GrammaticalLabel[];
  interrogatives: GrammaticalLabel[];
  vocative: GrammaticalLabel[];
  emphasis: GrammaticalLabel[];
  morphologyTerms: GrammaticalLabel[];
  rhetoric: GrammaticalLabel[];
}

export const grammaticalLabels: GrammaticalLabels = {
  partsOfSpeech: [
    { id: 'ism', ar: 'اسم', en: 'Noun' },
    { id: 'fil', ar: 'فعل', en: 'Verb' },
    { id: 'harf', ar: 'حرف', en: 'Particle' }
  ],
  sentenceTypes: [
    { id: 'jumlah-ismiyyah', ar: 'جملة اسمية', en: 'Nominal Sentence' },
    { id: 'jumlah-filiyyah', ar: 'جملة فعلية', en: 'Verbal Sentence' },
    { id: 'jumlah-khabariyyah', ar: 'جملة خبرية', en: 'Declarative Sentence' },
    { id: 'jumlah-inshaaiyyah', ar: 'جملة إنشائية', en: 'Constructive Sentence' }
  ],
  cases: [
    { id: 'rafa', ar: 'رفع', en: 'Nominative' },
    { id: 'nasb', ar: 'نصب', en: 'Accusative' },
    { id: 'jarr', ar: 'جر', en: 'Genitive' },
    { id: 'jazm', ar: 'جزم', en: 'Jussive' },
    { id: 'majrur', ar: 'مجرور', en: 'Genitive (after preposition)' }
  ],
  roles: [
    { id: 'mubtada', ar: 'مبتدأ', en: 'Subject (Nominal)' },
    { id: 'khabar', ar: 'خبر', en: 'Predicate (Nominal)' },
    { id: 'fail', ar: 'فاعل', en: 'Subject (Verbal)' },
    { id: 'mafool-bih', ar: 'مفعول به', en: 'Direct Object' },
    { id: 'mafool-mutlaq', ar: 'مفعول مطلق', en: 'Absolute Object' },
    { id: 'mafool-fih', ar: 'مفعول فيه', en: 'Adverbial (Time/Place)' },
    { id: 'mafool-lahu', ar: 'مفعول له', en: 'Object of Reason' },
    { id: 'mafool-maah', ar: 'مفعول معه', en: 'Accompaniment Object' },
    { id: 'hal', ar: 'حال', en: 'Circumstantial' },
    { id: 'tamyiz', ar: 'تمييز', en: 'Specifier' },
    { id: 'badal', ar: 'بدل', en: 'Apposition' },
    { id: 'tawkid', ar: 'تأكيد', en: 'Emphasis' },
    { id: 'atf', ar: 'عطف', en: 'Conjunction' },
    { id: 'naib-fail', ar: 'نائب الفاعل', en: 'Agent Substitute (Passive)' },
    { id: 'mustathna', ar: 'مستثنى', en: 'Exception' },
    { id: 'munada', ar: 'منادى', en: 'Vocative' }
  ],
  verbs: [
    { id: 'fil-madhi', ar: 'فعل ماضي', en: 'Past Tense' },
    { id: 'fil-mudari', ar: 'فعل مضارع', en: 'Present Tense' },
    { id: 'fil-amr', ar: 'فعل أمر', en: 'Command' },
    { id: 'fil-nahy', ar: 'فعل نهي', en: 'Prohibition' },
    { id: 'fil-lazim', ar: 'فعل لازم', en: 'Intransitive Verb' },
    { id: 'fil-mutaaddi', ar: 'فعل متعدي', en: 'Transitive Verb' },
    { id: 'fil-majhul', ar: 'فعل مجهول', en: 'Passive Verb' },
    { id: 'fil-malum', ar: 'فعل معلوم', en: 'Active Verb' }
  ],
  pronouns: [
    { id: 'dhameer', ar: 'ضمير', en: 'Pronoun' },
    { id: 'dhameer-muttasil', ar: 'ضمير متصل', en: 'Attached Pronoun' },
    { id: 'dhameer-munfasil', ar: 'ضمير منفصل', en: 'Detached Pronoun' },
    { id: 'dhameer-ittisal', ar: 'ضمير الاتصال', en: 'Connecting Pronoun (Idafa)' },
    { id: 'dhameer-rafa', ar: 'ضمير رفع', en: 'Nominative Pronoun' },
    { id: 'dhameer-nasb', ar: 'ضمير نصب', en: 'Accusative Pronoun' },
    { id: 'dhameer-jarr', ar: 'ضمير جر', en: 'Genitive Pronoun' }
  ],
  kanaAndSisters: [
    { id: 'kana', ar: 'كان', en: 'Kana (was)' },
    { id: 'asbaha', ar: 'أصبح', en: 'Asbaha (became - morning)' },
    { id: 'amsa', ar: 'أمسى', en: 'Amsa (became - evening)' },
    { id: 'dhalla', ar: 'ظل', en: 'Dhalla (remained)' },
    { id: 'bata', ar: 'بات', en: 'Bata (spent the night)' },
    { id: 'sara', ar: 'صار', en: 'Sara (became)' },
    { id: 'laysa', ar: 'ليس', en: 'Laysa (is not)' },
    { id: 'ma-zala', ar: 'ما زال', en: 'Ma Zala (still is)' },
    { id: 'ism-kana', ar: 'اسم كان', en: 'Ism of Kana' },
    { id: 'khabar-kana', ar: 'خبر كان', en: 'Khabar of Kana' }
  ],
  innaAndSisters: [
    { id: 'inna', ar: 'إن', en: 'Inna (indeed)' },
    { id: 'anna', ar: 'أن', en: 'Anna (that)' },
    { id: 'kanna', ar: 'كأن', en: 'Kaanna (as if)' },
    { id: 'lakinna', ar: 'لكن', en: 'Lakinna (but)' },
    { id: 'laalla', ar: 'لعل', en: 'Laalla (perhaps)' },
    { id: 'layta', ar: 'ليت', en: 'Layta (I wish)' },
    { id: 'ism-inna', ar: 'اسم إن', en: 'Ism of Inna' },
    { id: 'khabar-inna', ar: 'خبر إن', en: 'Khabar of Inna' }
  ],
  prepositions: [
    { id: 'harf-jarr', ar: 'حرف الجر', en: 'Preposition (general)' },
    { id: 'min', ar: 'من', en: 'Min (from)' },
    { id: 'ila', ar: 'إلى', en: 'Ila (to)' },
    { id: 'an', ar: 'عن', en: 'An (about/from)' },
    { id: 'ala', ar: 'على', en: 'Ala (on/upon)' },
    { id: 'fi', ar: 'في', en: 'Fi (in)' },
    { id: 'bi', ar: 'ب', en: 'Bi (by/with)' },
    { id: 'li', ar: 'ل', en: 'Li (for/to)' },
    { id: 'ka', ar: 'ك', en: 'Ka (like)' },
    { id: 'majrur', ar: 'مجرور', en: 'Object of Preposition' }
  ],
  demonstratives: [
    { id: 'ism-ishara', ar: 'اسم إشارة', en: 'Demonstrative (general)' },
    { id: 'hadha', ar: 'هذا', en: 'Hadha (this - masc)' },
    { id: 'hadhihi', ar: 'هذه', en: 'Hadhihi (this - fem)' },
    { id: 'dhalika', ar: 'ذلك', en: 'Dhalika (that - masc)' },
    { id: 'tilka', ar: 'تلك', en: 'Tilka (that - fem)' },
    { id: 'hadhani', ar: 'هذان', en: 'Hadhani (these two - masc)' },
    { id: 'hatani', ar: 'هاتان', en: 'Hatani (these two - fem)' },
    { id: 'haulaa', ar: 'هؤلاء', en: 'Haulaa (these - plural)' },
    { id: 'ulaaika', ar: 'أولئك', en: 'Ulaaika (those - plural)' }
  ],
  relatives: [
    { id: 'ism-mawsul', ar: 'اسم موصول', en: 'Relative Pronoun (general)' },
    { id: 'alladhi', ar: 'الذي', en: 'Alladhi (who/which - masc)' },
    { id: 'allati', ar: 'التي', en: 'Allati (who/which - fem)' },
    { id: 'alladhani', ar: 'اللذان', en: 'Alladhani (who/which - dual masc)' },
    { id: 'allatani', ar: 'اللتان', en: 'Allatani (who/which - dual fem)' },
    { id: 'alladhina', ar: 'الذين', en: 'Alladhina (who/which - plural masc)' },
    { id: 'allati-plural', ar: 'اللاتي', en: 'Allati (who/which - plural fem)' },
    { id: 'man', ar: 'من', en: 'Man (who)' },
    { id: 'ma', ar: 'ما', en: 'Ma (what)' }
  ],
  derivedNouns: [
    { id: 'ism-fail', ar: 'اسم الفاعل', en: 'Active Participle' },
    { id: 'ism-mafool', ar: 'اسم المفعول', en: 'Passive Participle' },
    { id: 'sighat-mubalagha', ar: 'صيغة المبالغة', en: 'Intensive Form' },
    { id: 'sifah-mushabbaha', ar: 'الصفة المشبهة', en: 'Resembling Adjective' },
    { id: 'ism-tafdil', ar: 'اسم التفضيل', en: 'Comparative/Superlative' },
    { id: 'masdar', ar: 'المصدر', en: 'Verbal Noun (Masdar)' },
    { id: 'ism-masdar', ar: 'اسم المصدر', en: 'Noun of Source' },
    { id: 'ism-zaman', ar: 'اسم الزمان', en: 'Noun of Time' },
    { id: 'ism-makan', ar: 'اسم المكان', en: 'Noun of Place' },
    { id: 'ism-alah', ar: 'اسم الآلة', en: 'Noun of Instrument' }
  ],
  nounTypes: [
    { id: 'naat', ar: 'نعت', en: 'Adjective' },
    { id: 'mawsoof', ar: 'موصوف', en: 'Described Noun' },
    { id: 'marifah', ar: 'معرفة', en: 'Definite' },
    { id: 'nakirah', ar: 'نكرة', en: 'Indefinite' },
    { id: 'mabni', ar: 'مبني', en: 'Indeclinable' },
    { id: 'murab', ar: 'معرب', en: 'Declinable' },
    { id: 'mudhaf', ar: 'مضاف', en: 'First Term of Idafa' },
    { id: 'mudhaf-ilayh', ar: 'مضاف إليه', en: 'Second Term of Idafa' }
  ],
  phrasalConstructs: [
    { id: 'idafa', ar: 'إضافة', en: 'Possessive Construction' },
    { id: 'shibh-jumlah', ar: 'شبه الجملة', en: 'Quasi-sentence' },
    { id: 'jumlah-silah', ar: 'جملة الصلة', en: 'Relative Clause' },
    { id: 'jumlah-shart', ar: 'جملة الشرط', en: 'Conditional Sentence' },
    { id: 'jumlah-jawab', ar: 'جملة الجواب', en: 'Answer/Result Clause' },
    { id: 'jumlah-fi-mahall-rafa', ar: 'جملة في محل رفع', en: 'Sentence in Nominative Position' },
    { id: 'jumlah-fi-mahall-nasb', ar: 'جملة في محل نصب', en: 'Sentence in Accusative Position' },
    { id: 'jumlah-fi-mahall-jarr', ar: 'جملة في محل جر', en: 'Sentence in Genitive Position' },
    { id: 'jumlah-la-mahall', ar: 'جملة لا محل لها', en: 'Sentence with No Grammatical Position' }
  ],
  numbers: [
    { id: 'adad', ar: 'عدد', en: 'Number' },
    { id: 'madud', ar: 'معدود', en: 'Counted Noun' },
    { id: 'adad-madud', ar: 'عدد ومعدود', en: 'Number & Counted' }
  ],
  exceptionConstructs: [
    { id: 'illa', ar: 'إلا', en: 'Illa (except)' },
    { id: 'ghayr', ar: 'غير', en: 'Ghayr (other than)' },
    { id: 'siwa', ar: 'سوى', en: 'Siwa (other than)' },
    { id: 'mustathna', ar: 'مستثنى', en: 'Exception' },
    { id: 'mustathna-minhu', ar: 'مستثنى منه', en: 'Excepted From' }
  ],
  conditionalParticles: [
    { id: 'in', ar: 'إن', en: 'In (if)' },
    { id: 'idha', ar: 'إذا', en: 'Idha (when/if)' },
    { id: 'law', ar: 'لو', en: 'Law (if - contrary to fact)' },
    { id: 'lau-la', ar: 'لولا', en: 'Lau La (if not for)' },
    { id: 'fil-shart', ar: 'فعل الشرط', en: 'Conditional Verb' },
    { id: 'jawab-shart', ar: 'جواب الشرط', en: 'Result of Condition' }
  ],
  syntax: [
    { id: 'tarkib', ar: 'تركيب', en: 'Syntax/Phrase Structure' }
  ],
  verbForms: [
    { id: 'form-1', ar: 'الفعل الثلاثي المجرد', en: 'Form I (فَعَلَ)' },
    { id: 'form-2', ar: 'فَعَّلَ', en: 'Form II (Intensive/Causative)' },
    { id: 'form-3', ar: 'فَاعَلَ', en: 'Form III (Reciprocal)' },
    { id: 'form-4', ar: 'أَفْعَلَ', en: 'Form IV (Causative)' },
    { id: 'form-5', ar: 'تَفَعَّلَ', en: 'Form V (Reflexive of II)' },
    { id: 'form-6', ar: 'تَفَاعَلَ', en: 'Form VI (Reciprocal Reflexive)' },
    { id: 'form-7', ar: 'انْفَعَلَ', en: 'Form VII (Passive/Reflexive)' },
    { id: 'form-8', ar: 'افْتَعَلَ', en: 'Form VIII (Reflexive)' },
    { id: 'form-9', ar: 'افْعَلَّ', en: 'Form IX (Colors/Defects)' },
    { id: 'form-10', ar: 'اسْتَفْعَلَ', en: 'Form X (Seeking/Deeming)' }
  ],
  verbTypes: [
    { id: 'sahih', ar: 'صحيح', en: 'Sound Verb' },
    { id: 'mutal', ar: 'معتل', en: 'Weak Verb' },
    { id: 'mithal', ar: 'مثال', en: 'Assimilated (First Weak)' },
    { id: 'ajwaf', ar: 'أجوف', en: 'Hollow (Middle Weak)' },
    { id: 'naqis', ar: 'ناقص', en: 'Defective (Final Weak)' },
    { id: 'lafif', ar: 'لفيف', en: 'Doubly Weak' },
    { id: 'mudaaf', ar: 'مضاعف', en: 'Doubled Verb' },
    { id: 'mahmuz', ar: 'مهموز', en: 'Hamzated Verb' }
  ],
  pluralTypes: [
    { id: 'jama-salim-mudhakkar', ar: 'جمع مذكر سالم', en: 'Sound Masculine Plural' },
    { id: 'jama-salim-muannath', ar: 'جمع مؤنث سالم', en: 'Sound Feminine Plural' },
    { id: 'jama-taksir', ar: 'جمع تكسير', en: 'Broken Plural' },
    { id: 'mufrad', ar: 'مفرد', en: 'Singular' },
    { id: 'muthanna', ar: 'مثنى', en: 'Dual' },
    { id: 'jama', ar: 'جمع', en: 'Plural' },
    { id: 'ism-jama', ar: 'اسم جمع', en: 'Collective Noun' },
    { id: 'ism-jins', ar: 'اسم جنس', en: 'Generic Noun' }
  ],
  nasbParticles: [
    { id: 'an-nasibah', ar: 'أن الناصبة', en: 'An (that - subjunctive)' },
    { id: 'lan', ar: 'لن', en: 'Lan (will not)' },
    { id: 'kay', ar: 'كي', en: 'Kay (in order to)' },
    { id: 'li-kay', ar: 'لكي', en: 'Li-Kay (so that)' },
    { id: 'hatta', ar: 'حتى', en: 'Hatta (until/so that)' },
    { id: 'li-nasibah', ar: 'لام التعليل', en: 'Lam of Purpose' },
    { id: 'fa-sababiyyah', ar: 'فاء السببية', en: 'Fa of Result' },
    { id: 'waw-maiyyah', ar: 'واو المعية', en: 'Waw of Accompaniment' }
  ],
  jazmParticles: [
    { id: 'lam-jazimah', ar: 'لم', en: 'Lam (did not - past negation)' },
    { id: 'lamma', ar: 'لما', en: 'Lamma (has not yet)' },
    { id: 'lam-amr', ar: 'لام الأمر', en: 'Lam of Command' },
    { id: 'la-nahiyah', ar: 'لا الناهية', en: 'La of Prohibition' },
    { id: 'man-shartiyyah', ar: 'من الشرطية', en: 'Man (whoever - conditional)' },
    { id: 'ma-shartiyyah', ar: 'ما الشرطية', en: 'Ma (whatever - conditional)' },
    { id: 'mahma', ar: 'مهما', en: 'Mahma (whatever)' },
    { id: 'ayna', ar: 'أين', en: 'Ayna (wherever)' },
    { id: 'mata', ar: 'متى', en: 'Mata (whenever)' }
  ],
  conjunctions: [
    { id: 'waw-atf', ar: 'واو العطف', en: 'Waw of Conjunction' },
    { id: 'fa-atf', ar: 'فاء العطف', en: 'Fa of Sequence' },
    { id: 'thumma', ar: 'ثم', en: 'Thumma (then)' },
    { id: 'aw', ar: 'أو', en: 'Aw (or)' },
    { id: 'am', ar: 'أم', en: 'Am (or - in questions)' },
    { id: 'bal', ar: 'بل', en: 'Bal (rather/but)' },
    { id: 'la-atifah', ar: 'لا العاطفة', en: 'La (not - in conjunction)' },
    { id: 'lakin', ar: 'لكن', en: 'Lakin (but)' },
    { id: 'hatta-atf', ar: 'حتى العاطفة', en: 'Hatta (even/until)' }
  ],
  negation: [
    { id: 'la-nafiyah', ar: 'لا النافية', en: 'La of Negation' },
    { id: 'la-nafiyah-lil-jins', ar: 'لا النافية للجنس', en: 'La of Absolute Negation' },
    { id: 'ma-nafiyah', ar: 'ما النافية', en: 'Ma of Negation' },
    { id: 'ma-hijaziyyah', ar: 'ما الحجازية', en: 'Ma Hijaziyyah (like Laysa)' },
    { id: 'lam', ar: 'لم', en: 'Lam (did not)' },
    { id: 'lan', ar: 'لن', en: 'Lan (will not)' },
    { id: 'laysa', ar: 'ليس', en: 'Laysa (is not)' },
    { id: 'in-nafiyah', ar: 'إن النافية', en: 'In of Negation' }
  ],
  interrogatives: [
    { id: 'hamzat-istifham', ar: 'همزة الاستفهام', en: 'Hamzat al-Istifham (?)' },
    { id: 'hal', ar: 'هل', en: 'Hal (is/does?)' },
    { id: 'man-istifham', ar: 'من الاستفهامية', en: 'Man (who?)' },
    { id: 'ma-istifham', ar: 'ما الاستفهامية', en: 'Ma (what?)' },
    { id: 'madha', ar: 'ماذا', en: 'Madha (what?)' },
    { id: 'ayna-istifham', ar: 'أين', en: 'Ayna (where?)' },
    { id: 'mata-istifham', ar: 'متى', en: 'Mata (when?)' },
    { id: 'kayfa', ar: 'كيف', en: 'Kayfa (how?)' },
    { id: 'kam', ar: 'كم', en: 'Kam (how many?)' },
    { id: 'limadha', ar: 'لماذا', en: 'Limadha (why?)' },
    { id: 'ayyu', ar: 'أي', en: 'Ayyu (which?)' }
  ],
  vocative: [
    { id: 'ya-nida', ar: 'يا', en: 'Ya (O - vocative)' },
    { id: 'ayyuha', ar: 'أيها', en: 'Ayyuha (O - for definite)' },
    { id: 'ayyatuha', ar: 'أيتها', en: 'Ayyatuha (O - feminine)' },
    { id: 'munada-mabni', ar: 'منادى مبني', en: 'Indeclinable Vocative' },
    { id: 'munada-mansub', ar: 'منادى منصوب', en: 'Accusative Vocative' },
    { id: 'munada-mudaf', ar: 'منادى مضاف', en: 'Annexed Vocative' }
  ],
  emphasis: [
    { id: 'qad-tahdid', ar: 'قد التحقيقية', en: 'Qad (certainly - past)' },
    { id: 'qad-taqrib', ar: 'قد التقريبية', en: 'Qad (possibly - present)' },
    { id: 'la-tawkid', ar: 'لام التوكيد', en: 'Lam of Emphasis' },
    { id: 'nun-tawkid-thaqilah', ar: 'نون التوكيد الثقيلة', en: 'Heavy Nun of Emphasis' },
    { id: 'nun-tawkid-khafifah', ar: 'نون التوكيد الخفيفة', en: 'Light Nun of Emphasis' },
    { id: 'inna-tawkid', ar: 'إن المؤكدة', en: 'Inna (indeed - emphasis)' },
    { id: 'la-qasam', ar: 'لام القسم', en: 'Lam of Oath' }
  ],
  morphologyTerms: [
    { id: 'jidhr', ar: 'جذر', en: 'Root' },
    { id: 'wazn', ar: 'وزن', en: 'Pattern/Scale' },
    { id: 'mizan-sarfi', ar: 'الميزان الصرفي', en: 'Morphological Scale' },
    { id: 'zaidah', ar: 'زيادة', en: 'Addition' },
    { id: 'hadhf', ar: 'حذف', en: 'Elision' },
    { id: 'ibdal', ar: 'إبدال', en: 'Substitution' },
    { id: 'ilal', ar: 'إعلال', en: 'Vowel Change' },
    { id: 'idgham', ar: 'إدغام', en: 'Assimilation' },
    { id: 'ishtiqaq', ar: 'اشتقاق', en: 'Derivation' },
    { id: 'tasrif', ar: 'تصريف', en: 'Conjugation' }
  ],
  rhetoric: [
    { id: 'tashbih', ar: 'تشبيه', en: 'Simile' },
    { id: 'istiara', ar: 'استعارة', en: 'Metaphor' },
    { id: 'kinayah', ar: 'كناية', en: 'Metonymy' },
    { id: 'majaz', ar: 'مجاز', en: 'Figurative Language' },
    { id: 'jinas', ar: 'جناس', en: 'Paronomasia' },
    { id: 'tibaq', ar: 'طباق', en: 'Antithesis' },
    { id: 'muqabalah', ar: 'مقابلة', en: 'Parallelism' },
    { id: 'saja', ar: 'سجع', en: 'Rhymed Prose' }
  ]
};

/**
 * Get all labels as a flat array for searching/filtering
 */
export function getAllLabels(): GrammaticalLabel[] {
  return Object.values(grammaticalLabels).flat();
}

/**
 * Find a label by ID across all categories
 */
export function findLabelById(id: string): GrammaticalLabel | undefined {
  return getAllLabels().find(label => label.id === id);
}

/**
 * Get labels for a specific category
 */
export function getLabelsByCategory(category: keyof GrammaticalLabels): GrammaticalLabel[] {
  return grammaticalLabels[category] || [];
}
