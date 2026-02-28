/**
 * Detailed Grammatical Analysis for Complex Tarkeeb Exercises
 * Multi-level breakdown showing word analysis, phrase analysis, and sentence structure
 */

export interface WordAnalysis {
  word: string;
  transliteration: string;
  grammaticalRole: string;
  grammaticalRoleAr: string;
  caseMarking: string;
  caseMarkingAr: string;
  wordType: string;
  wordTypeAr: string;
  notes?: string;
  notesAr?: string;
}

export interface PhraseAnalysis {
  phrase: string;
  phraseType: string;
  phraseTypeAr: string;
  function: string;
  functionAr: string;
  notes?: string;
  notesAr?: string;
}

export interface SentenceAnalysis {
  sentenceType: string;
  sentenceTypeAr: string;
  mainComponents: {
    subject?: string;
    subjectAr?: string;
    predicate?: string;
    predicateAr?: string;
    object?: string;
    objectAr?: string;
  };
  structure: string;
  structureAr: string;
}

export interface TarkeebAnalysisExample {
  exerciseId: number;
  arabic: string;
  translation: string;
  
  // Level 1: Word-by-word analysis
  wordAnalysis: WordAnalysis[];
  
  // Level 2: Phrase analysis
  phraseAnalysis: PhraseAnalysis[];
  
  // Level 3: Sentence structure
  sentenceAnalysis: SentenceAnalysis;
  
  // Level 4: Key concepts
  keyGrammaticalConcepts: {
    concept: string;
    conceptAr: string;
    explanation: string;
    explanationAr: string;
  }[];
  
  // Additional notes
  teachingNotes?: string;
  teachingNotesAr?: string;
}

export const tarkeebAnalysisExamples: TarkeebAnalysisExample[] = [
  // Example 1: Exercise 156 - Parents and children reading Quran
  {
    exerciseId: 156,
    arabic: 'يَسُرُّ الْوَالِدَيْنِ كِلَيْهِمَا قِرَاءَةُ أَوْلَادِهِمْ كُلِّهِمُ الْقُرْآنَ صَبَاحًا بِحُبٍّ لِلْقُرْآنِ وَرَغْبَةٍ فِي أَجْرِ تِلَاوَتِهِ',
    translation: 'It pleases both parents that all their children read the Quran in the morning with love for the Quran and desire for the reward of its recitation',
    
    wordAnalysis: [
      {
        word: 'يَسُرُّ',
        transliteration: 'yasurru',
        grammaticalRole: 'Verb (predicate)',
        grammaticalRoleAr: 'فعل مضارع',
        caseMarking: 'No case marking (verbs are not declined)',
        caseMarkingAr: 'لا محل له من الإعراب',
        wordType: 'Present tense verb, Form I',
        wordTypeAr: 'فعل مضارع من الباب الأول',
        notes: 'Root: س-ر-ر (to please, gladden)',
        notesAr: 'الجذر: س-ر-ر (سَرَّ يَسُرُّ سُرُورًا)'
      },
      {
        word: 'الْوَالِدَيْنِ',
        transliteration: 'al-walidayn',
        grammaticalRole: 'Object of the verb (مفعول به)',
        grammaticalRoleAr: 'مفعول به',
        caseMarking: 'Accusative (نصب) - marked with ي because it is dual',
        caseMarkingAr: 'منصوب وعلامة نصبه الياء لأنه مثنى',
        wordType: 'Dual noun',
        wordTypeAr: 'اسم مثنى',
        notes: 'The parents (father and mother)',
        notesAr: 'الأب والأم'
      },
      {
        word: 'كِلَيْهِمَا',
        transliteration: 'kilayhuma',
        grammaticalRole: 'Emphasis (توكيد معنوي)',
        grammaticalRoleAr: 'توكيد معنوي',
        caseMarking: 'Follows the word it emphasizes (accusative)',
        caseMarkingAr: 'تابع منصوب بالياء لأنه مثنى',
        wordType: 'Dual emphasizing particle + dual pronoun suffix',
        wordTypeAr: 'لفظ توكيد مثنى + ضمير متصل',
        notes: 'Emphasizes both of them - masculine dual',
        notesAr: 'يؤكد الاثنين - مثنى مذكر'
      },
      {
        word: 'قِرَاءَةُ',
        transliteration: 'qiraatu',
        grammaticalRole: 'Subject (فاعل)',
        grammaticalRoleAr: 'فاعل',
        caseMarking: 'Nominative (رفع) - marked with ضمة',
        caseMarkingAr: 'مرفوع وعلامة رفعه الضمة الظاهرة',
        wordType: 'Verbal noun (مصدر) - first term of إضافة',
        wordTypeAr: 'مصدر مضاف',
        notes: 'Reading/recitation - the thing that pleases',
        notesAr: 'القراءة - هي التي تسر الوالدين'
      },
      {
        word: 'أَوْلَادِهِمْ',
        transliteration: 'awladihim',
        grammaticalRole: 'Second term of إضافة (مضاف إليه)',
        grammaticalRoleAr: 'مضاف إليه',
        caseMarking: 'Genitive (جر) - marked with كسرة',
        caseMarkingAr: 'مجرور وعلامة جره الكسرة',
        wordType: 'Plural noun + attached pronoun',
        wordTypeAr: 'اسم جمع + ضمير متصل',
        notes: 'Their children - shows who is reading',
        notesAr: 'أولاد الوالدين'
      },
      {
        word: 'كُلِّهِمُ',
        transliteration: 'kullihim',
        grammaticalRole: 'Emphasis (توكيد معنوي)',
        grammaticalRoleAr: 'توكيد معنوي',
        caseMarking: 'Follows its emphasized word (genitive)',
        caseMarkingAr: 'تابع مجرور وعلامة جره الكسرة',
        wordType: 'Emphasizing particle + plural pronoun',
        wordTypeAr: 'لفظ توكيد + ضمير جمع',
        notes: 'All of them - emphasizes all children',
        notesAr: 'جميع الأولاد'
      },
      {
        word: 'الْقُرْآنَ',
        transliteration: 'al-quran',
        grammaticalRole: 'Second object (مفعول به ثانٍ)',
        grammaticalRoleAr: 'مفعول به ثانٍ للمصدر',
        caseMarking: 'Accusative (نصب) - marked with فتحة',
        caseMarkingAr: 'منصوب وعلامة نصبه الفتحة الظاهرة',
        wordType: 'Definite noun',
        wordTypeAr: 'اسم معرّف',
        notes: 'The Quran - what is being read',
        notesAr: 'المقروء'
      },
      {
        word: 'صَبَاحًا',
        transliteration: 'sabahan',
        grammaticalRole: 'Adverb of time (ظرف زمان)',
        grammaticalRoleAr: 'ظرف زمان',
        caseMarking: 'Accusative (نصب) - marked with تنوين فتح',
        caseMarkingAr: 'منصوب وعلامة نصبه تنوين الفتح',
        wordType: 'Indefinite noun used as adverb',
        wordTypeAr: 'اسم نكرة منصوب على الظرفية',
        notes: 'In the morning - when the reading happens',
        notesAr: 'وقت القراءة'
      }
    ],
    
    phraseAnalysis: [
      {
        phrase: 'يَسُرُّ الْوَالِدَيْنِ كِلَيْهِمَا',
        phraseType: 'Verb phrase',
        phraseTypeAr: 'جملة فعلية',
        function: 'Main predicate of the sentence',
        functionAr: 'الجملة الرئيسية',
        notes: 'The verb comes first, creating a verb-subject-object order',
        notesAr: 'الفعل مقدم على الفاعل'
      },
      {
        phrase: 'قِرَاءَةُ أَوْلَادِهِمْ كُلِّهِمُ الْقُرْآنَ',
        phraseType: 'Noun phrase (إضافة complex)',
        phraseTypeAr: 'مركب إضافي مع مفعول',
        function: 'Subject (فاعل) of the verb يسر',
        functionAr: 'فاعل الفعل يسر',
        notes: 'The verbal noun قراءة takes its own object القرآن',
        notesAr: 'المصدر يعمل عمل فعله فله فاعل ومفعول به'
      }
    ],
    
    sentenceAnalysis: {
      sentenceType: 'Verbal sentence (جملة فعلية)',
      sentenceTypeAr: 'جملة فعلية',
      mainComponents: {
        predicate: 'يَسُرُّ (it pleases)',
        predicateAr: 'يَسُرُّ (الفعل)',
        object: 'الْوَالِدَيْنِ كِلَيْهِمَا (both parents)',
        objectAr: 'الْوَالِدَيْنِ كِلَيْهِمَا (المفعول به)',
        subject: 'قِرَاءَةُ أَوْلَادِهِمْ كُلِّهِمُ الْقُرْآنَ (children reading)',
        subjectAr: 'قِرَاءَةُ أَوْلَادِهِمْ كُلِّهِمُ الْقُرْآنَ (الفاعل)'
      },
      structure: 'Verb + Object + Subject + Adverb + Circumstantial phrases',
      structureAr: 'فعل + مفعول به + فاعل (مصدر عامل) + ظرف + أحوال'
    },
    
    keyGrammaticalConcepts: [
      {
        concept: 'Working Verbal Noun (المصدر العامل)',
        conceptAr: 'المصدر العامل',
        explanation: 'The verbal noun قراءة acts like its verb, taking both a subject (أولادهم) and an object (القرآن)',
        explanationAr: 'المصدر (قراءة) يعمل عمل فعله (قرأ)، فله فاعل (أولادهم) ومفعول به (القرآن)'
      },
      {
        concept: 'Moral Emphasis (التوكيد المعنوي)',
        conceptAr: 'التوكيد المعنوي',
        explanation: 'كلا/كلتا for dual and كل for plural are used to emphasize both and all',
        explanationAr: 'استخدام ألفاظ التوكيد (كليهما، كلهم) لتأكيد الشمول'
      },
      {
        concept: 'Genitive Construction (الإضافة)',
        conceptAr: 'الإضافة',
        explanation: 'Multiple إضافة chains: قراءة أولادهم، أجر تلاوته',
        explanationAr: 'تراكيب إضافية متعددة في الجملة الواحدة'
      }
    ],
    
    teachingNotes: 'This sentence demonstrates advanced Arabic syntax where a verbal noun (مصدر) functions as a verb, taking its own subject and object.',
    teachingNotesAr: 'هذه الجملة تُظهر تركيبًا نحويًا متقدمًا حيث يعمل المصدر عمل الفعل.'
  },

  // Example 2: Exercise 158 - Scholars attaining high ranks
  {
    exerciseId: 158,
    arabic: 'نَالَ الْعُلَمَاءُ الْكِرَامُ وَالْأَئِمَّةُ الْعِظَامُ وَالْمُحَدِّثُونَ وَالْفُقَهَاءُ مَنَازِلَ رَفِيعَةً فِي الدُّنْيَا وَالْآخِرَةِ لِصَبْرِهِمْ فِي طَلَبِ الْعِلْمِ فِي الشِّدَّةِ وَالرَّخَاءِ بِأَدَبٍ جَمٍّ وَتَعْظِيمِهِمُ الْأَسَاتِذَةَ وَآلَاتِ الْعِلْمِ وَتَضْحِيَةِ كُلِّ نَفِيسٍ فِي سَبِيلِهِ الْمَالَ وَالْوَقْتَ وَالنَّفْسَ وَتَوَاضُعِهِمْ وَانْكِسَارِهِمْ',
    translation: 'The noble scholars, great imams, hadith scholars, and jurists attained lofty ranks in this world and the Hereafter due to their patience in seeking knowledge in hardship and ease with great manners, and their veneration of teachers and tools of knowledge, and their sacrifice of everything precious in its path - wealth, time, and self - and their humility and brokenness',
    
    wordAnalysis: [
      {
        word: 'نَالَ',
        transliteration: 'nāla',
        grammaticalRole: 'Verb (predicate)',
        grammaticalRoleAr: 'فعل ماضٍ',
        caseMarking: 'No case marking (verbs are not declined)',
        caseMarkingAr: 'لا محل له من الإعراب',
        wordType: 'Past tense verb, Form I, intransitive verb that became transitive',
        wordTypeAr: 'فعل ماضٍ من الباب الأول، فعل لازم استُعمل متعديًا',
        notes: 'Root: ن-و-ل / ن-ي-ل (to attain, reach, obtain). Originally intransitive but used transitively here.',
        notesAr: 'الجذر: ن-و-ل / ن-ي-ل. فعل لازم في الأصل لكنه تعدى بنفسه هنا بمعنى أصاب ووصل إلى'
      },
      {
        word: 'الْعُلَمَاءُ',
        transliteration: 'al-ʿulamāʾu',
        grammaticalRole: 'Subject (فاعل)',
        grammaticalRoleAr: 'فاعل',
        caseMarking: 'Nominative (رفع) - marked with ضمة',
        caseMarkingAr: 'مرفوع وعلامة رفعه الضمة الظاهرة على آخره',
        wordType: 'Plural of عالِم (broken plural), definite with ال',
        wordTypeAr: 'جمع تكسير من عالِم، معرّف بأل',
        notes: 'Scholars - those with deep knowledge. First in a series of coordinated subjects.',
        notesAr: 'العلماء - أصحاب العلم العميق. أول معطوف عليه في سلسلة من الفاعلين'
      },
      {
        word: 'الْكِرَامُ',
        transliteration: 'al-kirāmu',
        grammaticalRole: 'Adjective (نعت / صفة)',
        grammaticalRoleAr: 'نعت',
        caseMarking: 'Nominative (رفع) - marked with ضمة, follows العلماء',
        caseMarkingAr: 'مرفوع وعلامة رفعه الضمة، تابع للمنعوت',
        wordType: 'Plural adjective (صيغة منتهى الجموع), definite',
        wordTypeAr: 'صفة على وزن فِعال جمع، معرّفة بأل',
        notes: 'Noble, generous - describes the character of the scholars',
        notesAr: 'الكرام - يصف أخلاق العلماء النبيلة'
      },
      {
        word: 'وَالْأَئِمَّةُ',
        transliteration: 'wal-aʾimmatu',
        grammaticalRole: 'Coordinated subject (معطوف)',
        grammaticalRoleAr: 'معطوف على الفاعل',
        caseMarking: 'Nominative (رفع) - marked with ضمة',
        caseMarkingAr: 'معطوف مرفوع وعلامة رفعه الضمة',
        wordType: 'Plural of إمام (broken plural), definite',
        wordTypeAr: 'جمع تكسير من إمام، معرّف بأل',
        notes: 'Imams - religious leaders and exemplars. Second coordinated subject.',
        notesAr: 'الأئمة - القادة الدينيون والقدوات. معطوف ثانٍ'
      },
      {
        word: 'الْعِظَامُ',
        transliteration: 'al-ʿiẓāmu',
        grammaticalRole: 'Adjective (نعت)',
        grammaticalRoleAr: 'نعت',
        caseMarking: 'Nominative (رفع) - marked with ضمة',
        caseMarkingAr: 'مرفوع وعلامة رفعه الضمة',
        wordType: 'Plural adjective (صيغة منتهى الجموع)',
        wordTypeAr: 'صفة جمع على وزن فِعال',
        notes: 'Great, magnificent - describes the status of the imams',
        notesAr: 'العظام - يصف مكانة الأئمة الرفيعة'
      },
      {
        word: 'وَالْمُحَدِّثُونَ',
        transliteration: 'wal-muḥaddithūna',
        grammaticalRole: 'Coordinated subject (معطوف)',
        grammaticalRoleAr: 'معطوف على الفاعل',
        caseMarking: 'Nominative (رفع) - marked with و because it is sound masculine plural',
        caseMarkingAr: 'معطوف مرفوع وعلامة رفعه الواو لأنه جمع مذكر سالم',
        wordType: 'Active participle, Form II, sound masculine plural',
        wordTypeAr: 'اسم فاعل من الباب الثاني، جمع مذكر سالم',
        notes: 'Hadith scholars - those who narrate and study prophetic traditions. Third coordinated subject.',
        notesAr: 'المحدثون - رواة الحديث ودارسوه. معطوف ثالث'
      },
      {
        word: 'وَالْفُقَهَاءُ',
        transliteration: 'wal-fuqahāʾu',
        grammaticalRole: 'Coordinated subject (معطوف)',
        grammaticalRoleAr: 'معطوف على الفاعل',
        caseMarking: 'Nominative (رفع) - marked with ضمة',
        caseMarkingAr: 'معطوف مرفوع وعلامة رفعه الضمة',
        wordType: 'Plural of فقيه (broken plural)',
        wordTypeAr: 'جمع تكسير من فقيه',
        notes: 'Jurists - experts in Islamic jurisprudence. Fourth and final coordinated subject.',
        notesAr: 'الفقهاء - علماء الفقه والأحكام الشرعية. معطوف رابع وأخير'
      },
      {
        word: 'مَنَازِلَ',
        transliteration: 'manāzila',
        grammaticalRole: 'Object of the verb (مفعول به)',
        grammaticalRoleAr: 'مفعول به',
        caseMarking: 'Accusative (نصب) - marked with فتحة',
        caseMarkingAr: 'منصوب وعلامة نصبه الفتحة الظاهرة',
        wordType: 'Plural of منزلة/منزل (broken plural)',
        wordTypeAr: 'جمع تكسير من منزلة/منزل',
        notes: 'Ranks, stations, positions - what the scholars attained',
        notesAr: 'المنازل - الدرجات والمراتب التي حصلوا عليها'
      },
      {
        word: 'رَفِيعَةً',
        transliteration: 'rafīʿatan',
        grammaticalRole: 'Adjective (نعت)',
        grammaticalRoleAr: 'نعت',
        caseMarking: 'Accusative (نصب) - marked with فتحة with tanween',
        caseMarkingAr: 'منصوب وعلامة نصبه الفتحة مع التنوين',
        wordType: 'Feminine singular adjective',
        wordTypeAr: 'صفة مفردة مؤنثة',
        notes: 'Lofty, elevated - describes the ranks as high and honored',
        notesAr: 'رفيعة - تصف المنازل بأنها عالية ومرموقة'
      },
      {
        word: 'فِي الدُّنْيَا',
        transliteration: 'fī al-dunyā',
        grammaticalRole: 'Prepositional phrase (جار ومجرور)',
        grammaticalRoleAr: 'جار ومجرور متعلق بمنازل',
        caseMarking: 'الدنيا is in genitive (مجرور) - marked with كسرة مقدرة',
        caseMarkingAr: 'الدنيا: اسم مجرور وعلامة جره الكسرة المقدرة على الألف',
        wordType: 'في (preposition) + الدنيا (definite noun)',
        wordTypeAr: 'حرف جر + اسم معرّف',
        notes: 'In this world - specifies where the ranks are attained (first location)',
        notesAr: 'في الدنيا - تحديد مكان المنازل الأول (الحياة الدنيا)'
      },
      {
        word: 'وَالْآخِرَةِ',
        transliteration: 'wal-ākhirati',
        grammaticalRole: 'Coordinated noun (معطوف)',
        grammaticalRoleAr: 'معطوف على الدنيا',
        caseMarking: 'Genitive (مجرور) - marked with كسرة',
        caseMarkingAr: 'معطوف مجرور وعلامة جره الكسرة الظاهرة',
        wordType: 'Definite noun, feminine',
        wordTypeAr: 'اسم معرّف مؤنث',
        notes: 'The Hereafter - second location of the ranks, coordinated with الدنيا',
        notesAr: 'الآخرة - المكان الثاني للمنازل، معطوف على الدنيا'
      },
      {
        word: 'لِصَبْرِهِمْ',
        transliteration: 'li-ṣabrihim',
        grammaticalRole: 'Prepositional phrase indicating reason (جار ومجرور للتعليل)',
        grammaticalRoleAr: 'جار ومجرور متعلق بـ"نال" للتعليل',
        caseMarking: 'صبر is in genitive - marked with كسرة',
        caseMarkingAr: 'صبر: اسم مجرور وعلامة جره الكسرة',
        wordType: 'لـ (causal preposition) + مصدر (verbal noun) + attached pronoun',
        wordTypeAr: 'لام التعليل + مصدر + ضمير متصل',
        notes: 'Due to their patience - first reason for attaining ranks. لـ here indicates cause.',
        notesAr: 'لصبرهم - السبب الأول لنيل المنازل. اللام هنا للتعليل'
      },
      {
        word: 'فِي طَلَبِ',
        transliteration: 'fī ṭalabi',
        grammaticalRole: 'Prepositional phrase (جار ومجرور)',
        grammaticalRoleAr: 'جار ومجرور متعلق بصبرهم',
        caseMarking: 'طلب is in genitive - marked with كسرة',
        caseMarkingAr: 'طلب: اسم مجرور وعلامة جره الكسرة، وهو مضاف',
        wordType: 'في (preposition) + مصدر (first term of إضافة)',
        wordTypeAr: 'حرف جر + مصدر مضاف',
        notes: 'In seeking - specifies the domain of their patience',
        notesAr: 'في طلب - تحديد مجال الصبر'
      },
      {
        word: 'الْعِلْمِ',
        transliteration: 'al-ʿilmi',
        grammaticalRole: 'Second term of إضافة (مضاف إليه)',
        grammaticalRoleAr: 'مضاف إليه',
        caseMarking: 'Genitive (مجرور) - marked with كسرة',
        caseMarkingAr: 'مجرور وعلامة جره الكسرة الظاهرة',
        wordType: 'Definite noun',
        wordTypeAr: 'اسم معرّف بأل',
        notes: 'Knowledge - the object of seeking, completes the إضافة construction',
        notesAr: 'العلم - المضاف إليه الذي يكمل التركيب الإضافي'
      },
      {
        word: 'فِي الشِّدَّةِ',
        transliteration: 'fī al-shiddati',
        grammaticalRole: 'Prepositional phrase indicating circumstance (حال)',
        grammaticalRoleAr: 'جار ومجرور في محل نصب حال',
        caseMarking: 'الشدة is in genitive - marked with كسرة',
        caseMarkingAr: 'الشدة: اسم مجرور وعلامة جره الكسرة',
        wordType: 'في (preposition) + definite noun',
        wordTypeAr: 'حرف جر + اسم معرّف',
        notes: 'In hardship - describes the circumstances during which they sought knowledge',
        notesAr: 'في الشدة - وصف الظروف الصعبة لطلب العلم'
      },
      {
        word: 'وَالرَّخَاءِ',
        transliteration: 'wal-rakhāʾi',
        grammaticalRole: 'Coordinated noun (معطوف)',
        grammaticalRoleAr: 'معطوف على الشدة',
        caseMarking: 'Genitive (مجرور) - marked with كسرة',
        caseMarkingAr: 'معطوف مجرور وعلامة جره الكسرة',
        wordType: 'Definite noun',
        wordTypeAr: 'اسم معرّف',
        notes: 'And ease - contrasted with hardship, showing their consistency in all circumstances',
        notesAr: 'والرخاء - مقابل للشدة، يدل على الاستمرارية في كل الأحوال'
      },
      {
        word: 'بِأَدَبٍ',
        transliteration: 'bi-adabin',
        grammaticalRole: 'Prepositional phrase indicating manner (حال)',
        grammaticalRoleAr: 'جار ومجرور في محل نصب حال',
        caseMarking: 'أدب is in genitive - marked with كسرة with tanween',
        caseMarkingAr: 'أدب: اسم مجرور وعلامة جره الكسرة مع التنوين',
        wordType: 'بـ (preposition) + indefinite مصدر',
        wordTypeAr: 'حرف جر + مصدر نكرة',
        notes: 'With manners - describes how they sought knowledge (with proper etiquette)',
        notesAr: 'بأدب - طريقة طلبهم للعلم (بالآداب الحسنة)'
      },
      {
        word: 'جَمٍّ',
        transliteration: 'jammin',
        grammaticalRole: 'Adjective (نعت)',
        grammaticalRoleAr: 'نعت',
        caseMarking: 'Genitive (مجرور) - marked with كسرة with tanween',
        caseMarkingAr: 'مجرور وعلامة جره الكسرة مع التنوين',
        wordType: 'Indefinite adjective',
        wordTypeAr: 'صفة نكرة',
        notes: 'Great, abundant - intensifies "manners" to mean "great/abundant manners"',
        notesAr: 'جم - صفة تفيد الكثرة والوفرة، أي أدب كثير وعظيم'
      },
      {
        word: 'وَتَعْظِيمِهِمُ',
        transliteration: 'wa-taʿẓīmihim',
        grammaticalRole: 'Coordinated noun (معطوف على صبرهم)',
        grammaticalRoleAr: 'معطوف على صبرهم المجرور باللام',
        caseMarking: 'Genitive (مجرور) - marked with كسرة',
        caseMarkingAr: 'معطوف مجرور وعلامة جره الكسرة، وهو مضاف',
        wordType: 'مصدر (Form II verbal noun) + attached pronoun, first term of إضافة',
        wordTypeAr: 'مصدر من الباب الثاني + ضمير متصل، مضاف',
        notes: 'And their veneration - second reason coordinated with صبرهم for attaining ranks',
        notesAr: 'وتعظيمهم - السبب الثاني معطوف على صبرهم'
      },
      {
        word: 'الْأَسَاتِذَةَ',
        transliteration: 'al-asātidha',
        grammaticalRole: 'First object of the مصدر (مفعول به للمصدر)',
        grammaticalRoleAr: 'مفعول به للمصدر تعظيم',
        caseMarking: 'Accusative (نصب) - marked with فتحة',
        caseMarkingAr: 'منصوب وعلامة نصبه الفتحة الظاهرة',
        wordType: 'Plural of أستاذ (broken plural), definite',
        wordTypeAr: 'جمع تكسير من أستاذ، معرّف بأل',
        notes: 'Teachers - first object of veneration. The مصدر تعظيم takes an object.',
        notesAr: 'الأساتذة - أول مفعول للمصدر. المصدر يعمل عمل فعله'
      },
      {
        word: 'وَآلَاتِ',
        transliteration: 'wa-ālāti',
        grammaticalRole: 'Coordinated object (معطوف)',
        grammaticalRoleAr: 'معطوف على الأساتذة',
        caseMarking: 'Accusative (نصب) - marked with كسرة (صيغة منتهى الجموع)',
        caseMarkingAr: 'معطوف منصوب وعلامة نصبه الكسرة لأنه ممنوع من الصرف',
        wordType: 'Plural of آلة (broken plural), first term of إضافة',
        wordTypeAr: 'جمع تكسير من آلة، مضاف',
        notes: 'Tools/instruments - second object coordinated with الأساتذة',
        notesAr: 'آلات - معطوف ثانٍ على الأساتذة، وهو مضاف'
      },
      {
        word: 'الْعِلْمِ',
        transliteration: 'al-ʿilmi',
        grammaticalRole: 'Second term of إضافة (مضاف إليه)',
        grammaticalRoleAr: 'مضاف إليه',
        caseMarking: 'Genitive (مجرور) - marked with كسرة',
        caseMarkingAr: 'مجرور وعلامة جره الكسرة',
        wordType: 'Definite noun',
        wordTypeAr: 'اسم معرّف',
        notes: 'Of knowledge - specifies what kind of tools (books, writing instruments, etc.)',
        notesAr: 'العلم - يحدد نوع الآلات (الكتب وأدوات الكتابة إلخ)'
      },
      {
        word: 'وَتَضْحِيَةِ',
        transliteration: 'wa-taḍḥiyati',
        grammaticalRole: 'Coordinated noun (معطوف)',
        grammaticalRoleAr: 'معطوف على صبرهم وتعظيمهم',
        caseMarking: 'Genitive (مجرور) - marked with كسرة',
        caseMarkingAr: 'معطوف مجرور وعلامة جره الكسرة، وهو مضاف',
        wordType: 'مصدر (Form II verbal noun), first term of إضافة',
        wordTypeAr: 'مصدر من الباب الثاني، مضاف',
        notes: 'And sacrifice - third reason coordinated with previous reasons',
        notesAr: 'وتضحية - السبب الثالث معطوف على الأسباب السابقة'
      },
      {
        word: 'كُلِّ',
        transliteration: 'kulli',
        grammaticalRole: 'Second term of إضافة (مضاف إليه)',
        grammaticalRoleAr: 'مضاف إليه',
        caseMarking: 'Genitive (مجرور) - marked with كسرة',
        caseMarkingAr: 'مجرور وعلامة جره الكسرة، وهو مضاف',
        wordType: 'Universal quantifier, first term of nested إضافة',
        wordTypeAr: 'لفظ عموم، مضاف في تركيب إضافي متداخل',
        notes: 'Every/all - emphasizes that they sacrificed everything precious',
        notesAr: 'كل - يفيد الشمول والعموم في التضحية'
      },
      {
        word: 'نَفِيسٍ',
        transliteration: 'nafīsin',
        grammaticalRole: 'Second term of إضافة (مضاف إليه)',
        grammaticalRoleAr: 'مضاف إليه',
        caseMarking: 'Genitive (مجرور) - marked with كسرة with tanween',
        caseMarkingAr: 'مجرور وعلامة جره الكسرة مع التنوين',
        wordType: 'Indefinite adjective used as noun',
        wordTypeAr: 'صفة مستعملة كاسم',
        notes: 'Precious thing - general category that is then specified with examples',
        notesAr: 'نفيس - شيء ثمين، يُفصّل بعده بالأمثلة'
      },
      {
        word: 'فِي سَبِيلِهِ',
        transliteration: 'fī sabīlihi',
        grammaticalRole: 'Prepositional phrase (جار ومجرور)',
        grammaticalRoleAr: 'جار ومجرور متعلق بتضحية',
        caseMarking: 'سبيل is in genitive - marked with كسرة',
        caseMarkingAr: 'سبيل: اسم مجرور وعلامة جره الكسرة، وهو مضاف',
        wordType: 'في (preposition) + مضاف + attached pronoun',
        wordTypeAr: 'حرف جر + مضاف + ضمير متصل',
        notes: 'In its path - the pronoun refers to knowledge (العلم), meaning for the sake of knowledge',
        notesAr: 'في سبيله - الضمير يعود على العلم، أي في سبيل العلم'
      },
      {
        word: 'الْمَالَ',
        transliteration: 'al-māla',
        grammaticalRole: 'Specification/Explanation (بدل مفصّل)',
        grammaticalRoleAr: 'بدل مفصّل من "كل نفيس"',
        caseMarking: 'Accusative (نصب) - marked with فتحة',
        caseMarkingAr: 'منصوب وعلامة نصبه الفتحة على أنه بدل',
        wordType: 'Definite noun',
        wordTypeAr: 'اسم معرّف',
        notes: 'Wealth - first specific example of precious things sacrificed',
        notesAr: 'المال - أول مثال محدد للأشياء النفيسة المضحّى بها'
      },
      {
        word: 'وَالْوَقْتَ',
        transliteration: 'wal-waqta',
        grammaticalRole: 'Coordinated specification (معطوف على المال)',
        grammaticalRoleAr: 'معطوف على المال',
        caseMarking: 'Accusative (نصب) - marked with فتحة',
        caseMarkingAr: 'معطوف منصوب وعلامة نصبه الفتحة',
        wordType: 'Definite noun',
        wordTypeAr: 'اسم معرّف',
        notes: 'Time - second specific example, coordinated with wealth',
        notesAr: 'الوقت - مثال ثانٍ معطوف على المال'
      },
      {
        word: 'وَالنَّفْسَ',
        transliteration: 'wal-nafsa',
        grammaticalRole: 'Coordinated specification (معطوف)',
        grammaticalRoleAr: 'معطوف على المال والوقت',
        caseMarking: 'Accusative (نصب) - marked with فتحة',
        caseMarkingAr: 'معطوف منصوب وعلامة نصبه الفتحة',
        wordType: 'Definite noun',
        wordTypeAr: 'اسم معرّف',
        notes: 'The self/soul - third and ultimate example, showing they gave everything including themselves',
        notesAr: 'النفس - مثال ثالث وأخير، يدل على أنهم ضحوا بكل شيء حتى أنفسهم'
      },
      {
        word: 'وَتَوَاضُعِهِمْ',
        transliteration: 'wa-tawāḍuʿihim',
        grammaticalRole: 'Coordinated noun (معطوف)',
        grammaticalRoleAr: 'معطوف على الأسباب السابقة',
        caseMarking: 'Genitive (مجرور) - marked with كسرة',
        caseMarkingAr: 'معطوف مجرور وعلامة جره الكسرة',
        wordType: 'مصدر (Form VI verbal noun) + attached pronoun',
        wordTypeAr: 'مصدر من الباب السادس + ضمير متصل',
        notes: 'And their humility - fourth reason coordinated with previous reasons',
        notesAr: 'وتواضعهم - السبب الرابع معطوف على الأسباب السابقة'
      },
      {
        word: 'وَانْكِسَارِهِمْ',
        transliteration: 'wan-kisārihim',
        grammaticalRole: 'Coordinated noun (معطوف)',
        grammaticalRoleAr: 'معطوف على تواضعهم',
        caseMarking: 'Genitive (مجرور) - marked with كسرة',
        caseMarkingAr: 'معطوف مجرور وعلامة جره الكسرة',
        wordType: 'مصدر (Form VII verbal noun) + attached pronoun',
        wordTypeAr: 'مصدر من الباب السابع + ضمير متصل',
        notes: 'And their brokenness - fifth and final reason, refers to spiritual humility and broken-heartedness before Allah',
        notesAr: 'وانكسارهم - السبب الخامس والأخير، يشير إلى التذلل والخضوع القلبي أمام الله'
      }
    ],
    
    phraseAnalysis: [
      {
        phrase: 'نَالَ الْعُلَمَاءُ الْكِرَامُ وَالْأَئِمَّةُ الْعِظَامُ وَالْمُحَدِّثُونَ وَالْفُقَهَاءُ',
        phraseType: 'Verb + Subject with multiple coordinated elements',
        phraseTypeAr: 'فعل + فاعل مع عطف متعدد',
        function: 'Main predicate and subject complex',
        functionAr: 'الجملة الأساسية: الفعل والفاعل',
        notes: 'Four categories of religious scholars are coordinated as the compound subject. The first two have adjectives, creating a rhythmic pattern.',
        notesAr: 'أربعة أصناف من العلماء معطوفة كفاعل مركب. الأولان لهما صفات مما يخلق إيقاعًا بلاغيًا'
      },
      {
        phrase: 'مَنَازِلَ رَفِيعَةً فِي الدُّنْيَا وَالْآخِرَةِ',
        phraseType: 'Object phrase with adjective and locational specification',
        phraseTypeAr: 'مفعول به مع صفة وتحديد مكاني',
        function: 'Complete object complex showing what was attained and where',
        functionAr: 'المفعول به الكامل يبين ما تم نيله وأين',
        notes: 'The object is described (lofty) and located in two realms (this world and the Hereafter)',
        notesAr: 'المفعول موصوف (رفيعة) ومحدد بمكانين (الدنيا والآخرة)'
      },
      {
        phrase: 'لِصَبْرِهِمْ فِي طَلَبِ الْعِلْمِ فِي الشِّدَّةِ وَالرَّخَاءِ بِأَدَبٍ جَمٍّ',
        phraseType: 'Causal prepositional phrase with nested modifiers',
        phraseTypeAr: 'جار ومجرور للتعليل مع قيود متداخلة',
        function: 'First reason explaining why ranks were attained',
        functionAr: 'السبب الأول لنيل المنازل',
        notes: 'Complex phrase showing: (1) their patience, (2) in what domain (seeking knowledge), (3) under what conditions (hardship and ease), (4) in what manner (with great manners)',
        notesAr: 'عبارة معقدة تبين: (١) صبرهم، (٢) في أي مجال (طلب العلم)، (٣) في أي ظروف (الشدة والرخاء)، (٤) بأي طريقة (بأدب جم)'
      },
      {
        phrase: 'وَتَعْظِيمِهِمُ الْأَسَاتِذَةَ وَآلَاتِ الْعِلْمِ',
        phraseType: 'Coordinated مصدر phrase working as verb with objects',
        phraseTypeAr: 'مصدر عامل معطوف مع مفعولين',
        function: 'Second reason - their veneration of teachers and tools',
        functionAr: 'السبب الثاني - تعظيمهم للأساتذة والآلات',
        notes: 'The مصدر (تعظيم) takes two objects: teachers and tools of knowledge',
        notesAr: 'المصدر (تعظيم) له مفعولان: الأساتذة وآلات العلم'
      },
      {
        phrase: 'وَتَضْحِيَةِ كُلِّ نَفِيسٍ فِي سَبِيلِهِ الْمَالَ وَالْوَقْتَ وَالنَّفْسَ',
        phraseType: 'مصدر phrase with specification structure (بدل مفصّل)',
        phraseTypeAr: 'مصدر مع بدل مفصّل',
        function: 'Third reason with general statement then specific examples',
        functionAr: 'السبب الثالث مع إجمال ثم تفصيل',
        notes: 'General statement "every precious thing" is then detailed with three specific examples: wealth, time, and self',
        notesAr: 'البيان العام "كل نفيس" يُفصّل بثلاثة أمثلة: المال والوقت والنفس'
      },
      {
        phrase: 'وَتَوَاضُعِهِمْ وَانْكِسَارِهِمْ',
        phraseType: 'Paired مصدر phrases',
        phraseTypeAr: 'مصدران متلازمان',
        function: 'Fourth and fifth reasons - complementary spiritual qualities',
        functionAr: 'السببان الرابع والخامس - صفتان روحيتان متكاملتان',
        notes: 'Two related concepts of spiritual humility paired together as the final reasons',
        notesAr: 'مفهومان مترابطان للتواضع الروحي مقترنان معًا كأسباب نهائية'
      }
    ],
    
    sentenceAnalysis: {
      sentenceType: 'Verbal sentence with extended causal structure (جملة فعلية مع تعليل موسّع)',
      sentenceTypeAr: 'جملة فعلية مع تركيب تعليلي مفصّل',
      mainComponents: {
        predicate: 'نَالَ (attained)',
        predicateAr: 'نَالَ (الفعل)',
        subject: 'الْعُلَمَاءُ الْكِرَامُ وَالْأَئِمَّةُ الْعِظَامُ وَالْمُحَدِّثُونَ وَالْفُقَهَاءُ (the noble scholars, great imams, hadith scholars, and jurists)',
        subjectAr: 'الْعُلَمَاءُ الْكِرَامُ وَالْأَئِمَّةُ الْعِظَامُ وَالْمُحَدِّثُونَ وَالْفُقَهَاءُ (الفاعل المركب)',
        object: 'مَنَازِلَ رَفِيعَةً (lofty ranks)',
        objectAr: 'مَنَازِلَ رَفِيعَةً (المفعول به)'
      },
      structure: 'Past verb + Compound subject (4 coordinated nouns with 2 adjectives) + Object with adjective and location + Extended causal structure (5 coordinated reasons with various modifiers)',
      structureAr: 'فعل ماضٍ + فاعل مركب (٤ أسماء معطوفة مع صفتين) + مفعول به مع صفة ومكان + تركيب تعليلي موسّع (٥ أسباب معطوفة مع قيود متنوعة)'
    },
    
    keyGrammaticalConcepts: [
      {
        concept: 'Multiple Coordination with Symmetry (العطف المتعدد المتوازن)',
        conceptAr: 'العطف المتعدد المتوازن',
        explanation: 'The sentence features sophisticated coordination at multiple levels: (1) Four types of scholars as subjects, (2) Two locations (this world and Hereafter), (3) Two circumstances (hardship and ease), (4) Two objects of veneration (teachers and tools), (5) Three examples of sacrifice (wealth, time, self), (6) Five reasons overall. This creates a rich, layered structure.',
        explanationAr: 'تتميز الجملة بعطف متقن على مستويات متعددة: (١) أربعة أنواع من العلماء كفاعل، (٢) مكانان (الدنيا والآخرة)، (٣) ظرفان (الشدة والرخاء)، (٤) مفعولان للتعظيم (الأساتذة والآلات)، (٥) ثلاثة أمثلة للتضحية (المال والوقت والنفس)، (٦) خمسة أسباب إجمالاً. هذا يخلق بنية غنية ومتعددة الطبقات'
      },
      {
        concept: 'Working Verbal Nouns (المصادر العاملة)',
        conceptAr: 'المصادر العاملة',
        explanation: 'Multiple مصادر function as verbs: صبرهم (their patience), تعظيمهم (their veneration - taking objects الأساتذة وآلات), تضحية (sacrifice), تواضعهم (their humility), انكسارهم (their brokenness). Each مصدر carries the force of its verb and some take their own objects.',
        explanationAr: 'عدة مصادر تعمل عمل أفعالها: صبرهم، تعظيمهم (يأخذ مفعولين: الأساتذة وآلات العلم)، تضحية، تواضعهم، انكسارهم. كل مصدر له قوة فعله وبعضها يأخذ مفعولاً به'
      },
      {
        concept: 'Nested Genitive Constructions (الإضافات المتداخلة)',
        conceptAr: 'الإضافات المتداخلة',
        explanation: 'Multiple levels of إضافة: (1) طلب العلم (seeking knowledge), (2) آلات العلم (tools of knowledge), (3) أجر تلاوته (reward of its recitation - though not in this sentence, similar pattern), (4) تضحية كل نفيس (sacrifice of every precious thing). Some are nested within prepositional phrases.',
        explanationAr: 'مستويات متعددة من الإضافة: (١) طلب العلم، (٢) آلات العلم، (٣) تضحية كل نفيس. بعضها متداخل ضمن الجار والمجرور'
      },
      {
        concept: 'Detailed Specification (البدل المفصّل)',
        conceptAr: 'البدل المفصّل',
        explanation: 'The general statement "كل نفيس" (everything precious) is specified and detailed with three concrete examples: المال (wealth), الوقت (time), النفس (self). This rhetorical device moves from general to specific, making the abstract concrete.',
        explanationAr: 'البيان العام "كل نفيس" يُفصّل بثلاثة أمثلة ملموسة: المال، الوقت، النفس. هذا الأسلوب البلاغي ينتقل من العام إلى الخاص، مما يجعل المجرد محسوسًا'
      },
      {
        concept: 'Causal Preposition لام (لام التعليل)',
        conceptAr: 'لام التعليل',
        explanation: 'The لـ in لصبرهم is causal (لام التعليل), meaning "due to" or "because of". It introduces the reasons why the scholars attained high ranks. All subsequent coordinated مصادر (تعظيمهم، تضحية، تواضعهم، انكسارهم) are also governed by this causal لام.',
        explanationAr: 'اللام في "لصبرهم" للتعليل، بمعنى "بسبب" أو "من أجل". تُدخل الأسباب التي أدت لنيل العلماء المنازل الرفيعة. كل المصادر المعطوفة (تعظيمهم، تضحية، تواضعهم، انكسارهم) تحت تأثير هذه اللام'
      },
      {
        concept: 'Circumstantial Phrases (الأحوال)',
        conceptAr: 'الأحوال',
        explanation: 'Multiple حال phrases describe the manner and circumstances: (1) في الشدة والرخاء (in hardship and ease) - describes the circumstances during seeking knowledge, (2) بأدب جم (with great manners) - describes the manner of their seeking. These add descriptive depth.',
        explanationAr: 'عبارات حالية متعددة تصف الطريقة والظروف: (١) في الشدة والرخاء - تصف ظروف طلب العلم، (٢) بأدب جم - تصف طريقة طلبهم. هذه تضيف عمقًا وصفيًا'
      },
      {
        concept: 'Symmetrical Pairs (الثنائيات المتوازنة)',
        conceptAr: 'الثنائيات المتوازنة',
        explanation: 'The sentence uses several balanced pairs for rhetorical effect: (1) الدنيا والآخرة (world and Hereafter), (2) الشدة والرخاء (hardship and ease), (3) الأساتذة وآلات العلم (teachers and tools), (4) تواضعهم وانكسارهم (humility and brokenness). This creates rhythm and completeness.',
        explanationAr: 'الجملة تستخدم عدة أزواج متوازنة للتأثير البلاغي: (١) الدنيا والآخرة، (٢) الشدة والرخاء، (٣) الأساتذة وآلات العلم، (٤) تواضعهم وانكسارهم. هذا يخلق إيقاعًا وشمولاً'
      },
      {
        concept: 'Adjectival Description Patterns (أنماط الوصف)',
        conceptAr: 'أنماط الوصف',
        explanation: 'Adjectives are strategically placed: الكرام and العظام modify the first two subjects, creating emphasis. رفيعة modifies منازل. جم modifies أدب. This selective modification focuses attention on key elements while maintaining sentence flow.',
        explanationAr: 'الصفات موضوعة استراتيجيًا: الكرام والعظام تصف أول فاعلين مما يخلق تأكيدًا. رفيعة تصف منازل. جم تصف أدب. هذا الوصف الانتقائي يركز الانتباه على عناصر رئيسية مع الحفاظ على انسياب الجملة'
      },
      {
        concept: 'Pronoun Reference Chain (سلسلة الضمائر)',
        conceptAr: 'سلسلة الضمائر',
        explanation: 'Multiple pronouns refer back to the compound subject (the scholars): (1) ـهم in صبرهم, تعظيمهم, تواضعهم, انكسارهم all refer to the scholars, (2) ـه in سبيله refers to العلم (knowledge). Tracking these references requires careful attention to antecedents.',
        explanationAr: 'ضمائر متعددة تعود على الفاعل المركب (العلماء): (١) هم في صبرهم، تعظيمهم، تواضعهم، انكسارهم كلها تعود على العلماء، (٢) ه في سبيله تعود على العلم. تتبع هذه المراجع يتطلب انتباهًا دقيقًا للمرجعيات'
      },
      {
        concept: 'Rhetorical Amplification (التفصيل البلاغي)',
        conceptAr: 'التفصيل البلاغي',
        explanation: 'The sentence employs amplification by: (1) listing multiple categories of scholars, (2) explaining multiple reasons for their success, (3) detailing specific examples within general statements (كل نفيس → المال والوقت والنفس). This creates a comprehensive, thorough picture.',
        explanationAr: 'الجملة تستخدم التفصيل البلاغي من خلال: (١) سرد أصناف متعددة من العلماء، (٢) شرح أسباب متعددة لنجاحهم، (٣) تفصيل أمثلة محددة ضمن بيانات عامة (كل نفيس ← المال والوقت والنفس). هذا يخلق صورة شاملة ومفصلة'
      }
    ],
    
    teachingNotes: 'This sentence represents the pinnacle of advanced Arabic syntax, combining multiple complex grammatical structures in a single, coherent statement. It demonstrates: (1) Sophisticated coordination at multiple levels creating a layered structure, (2) Working مصادر that function as verbs with their own objects, (3) Nested إضافة constructions, (4) Detailed specification (بدل مفصل) moving from abstract to concrete, (5) Causal structure with لام التعليل governing multiple coordinated reasons, (6) Circumstantial phrases (أحوال) adding descriptive depth, (7) Strategic use of adjectives for emphasis, (8) Complex pronoun reference chains requiring careful tracking. The sentence is also rhetorically rich, employing symmetrical pairs, amplification, and moving from general to specific. It exemplifies how classical Arabic can pack tremendous semantic content into elaborate yet precisely structured sentences. Students should analyze this sentence in stages: first identifying the core (verb-subject-object), then mapping out the coordinate structures, then examining the causal chain, and finally appreciating the rhetorical devices. This sentence could easily be broken into several simpler sentences in English, but Arabic\'s grammatical system allows for this level of integration while maintaining clarity.',
    teachingNotesAr: 'هذه الجملة تمثل قمة التركيب النحوي المتقدم في العربية، حيث تجمع عدة تراكيب نحوية معقدة في جملة واحدة متماسكة. تُظهر: (١) عطفًا متقنًا على مستويات متعددة يخلق بنية متعددة الطبقات، (٢) مصادر عاملة تعمل عمل الأفعال مع مفعولاتها، (٣) تراكيب إضافية متداخلة، (٤) بدل مفصل ينتقل من المجرد إلى المحسوس، (٥) تركيب تعليلي بلام التعليل تحكم أسبابًا متعددة معطوفة، (٦) أحوال تضيف عمقًا وصفيًا، (٧) استخدام استراتيجي للصفات للتأكيد، (٨) سلاسل ضمائر معقدة تتطلب تتبعًا دقيقًا. الجملة أيضًا غنية بلاغيًا، تستخدم أزواجًا متوازنة وتفصيلاً وانتقالاً من العام إلى الخاص. تجسد كيف يمكن للعربية الفصحى أن تحمل محتوى دلاليًا هائلاً في جمل مفصلة لكنها منظمة بدقة. يجب على الطلاب تحليل هذه الجملة على مراحل: أولاً تحديد الجوهر (فعل-فاعل-مفعول)، ثم رسم التراكيب المعطوفة، ثم فحص السلسلة التعليلية، وأخيرًا تقدير الأساليب البلاغية. هذه الجملة يمكن تقسيمها بسهولة إلى عدة جمل أبسط بالإنجليزية، لكن النظام النحوي العربي يسمح بهذا المستوى من التكامل مع الحفاظ على الوضوح.'
  },

  // ========================================
  // Unit 8: Number Phrases (العدد والمعدود)
  // ========================================

  // Example 3: Exercise 176 - Numbers 1-10 with complex sentence
  {
    exerciseId: 176,
    arabic: 'عَلَّمَ الشَّيْخُ تِسْعَةَ طُلَّابٍ الْقُرْآنَ فِي سِتِّ سَنَوَاتٍ بِصَبْرٍ وَإِتْقَانٍ',
    translation: 'The sheikh taught nine students the Quran in six years with patience and mastery',

    wordAnalysis: [
      {
        word: 'عَلَّمَ',
        transliteration: 'ʿallama',
        grammaticalRole: 'Verb (predicate)',
        grammaticalRoleAr: 'فعل ماضٍ',
        caseMarking: 'No case marking (verbs are not declined)',
        caseMarkingAr: 'لا محل له من الإعراب',
        wordType: 'Past tense verb, Form II (doubly transitive)',
        wordTypeAr: 'فعل ماضٍ من الباب الثاني، متعدٍّ لمفعولين',
        notes: 'Root: ع-ل-م. Form II adds causative meaning: to cause someone to know = to teach',
        notesAr: 'الجذر: ع-ل-م. الباب الثاني يضيف معنى التعدية: جعل شخصًا يعلم = علّمه'
      },
      {
        word: 'الشَّيْخُ',
        transliteration: 'al-shaykhu',
        grammaticalRole: 'Subject (فاعل)',
        grammaticalRoleAr: 'فاعل',
        caseMarking: 'Nominative (رفع) - marked with ضمة',
        caseMarkingAr: 'مرفوع وعلامة رفعه الضمة الظاهرة',
        wordType: 'Definite singular noun',
        wordTypeAr: 'اسم مفرد معرّف بأل',
        notes: 'The elder/teacher - the one performing the action of teaching',
        notesAr: 'الشيخ - الذي يقوم بفعل التعليم'
      },
      {
        word: 'تِسْعَةَ',
        transliteration: 'tisʿata',
        grammaticalRole: 'Number (عدد) - first object',
        grammaticalRoleAr: 'عدد - مفعول به أول',
        caseMarking: 'Accusative (نصب) - marked with فتحة',
        caseMarkingAr: 'منصوب وعلامة نصبه الفتحة الظاهرة',
        wordType: 'Cardinal number (3-10 range)',
        wordTypeAr: 'عدد أصلي من ٣-١٠',
        notes: 'Nine - feminine form (تاء مربوطة) because the counted noun (طلاب) is masculine. This is the GENDER REVERSAL rule for numbers 3-10.',
        notesAr: 'تسعة - بالتاء المربوطة لأن المعدود (طلاب) مذكر. هذه قاعدة مخالفة العدد للمعدود في الأعداد ٣-١٠'
      },
      {
        word: 'طُلَّابٍ',
        transliteration: 'ṭullābin',
        grammaticalRole: 'Counted noun (معدود) - مضاف إليه',
        grammaticalRoleAr: 'معدود - مضاف إليه',
        caseMarking: 'Genitive plural (جر) - marked with كسرة with tanween',
        caseMarkingAr: 'مجرور وعلامة جره الكسرة مع التنوين',
        wordType: 'Indefinite broken plural',
        wordTypeAr: 'جمع تكسير نكرة',
        notes: 'Students - as معدود for numbers 3-10, it comes as genitive plural (مضاف إليه مجرور جمع)',
        notesAr: 'طلاب - المعدود للأعداد ٣-١٠ يأتي مجرورًا جمعًا'
      },
      {
        word: 'الْقُرْآنَ',
        transliteration: 'al-qurʾāna',
        grammaticalRole: 'Second object (مفعول به ثانٍ)',
        grammaticalRoleAr: 'مفعول به ثانٍ',
        caseMarking: 'Accusative (نصب) - marked with فتحة',
        caseMarkingAr: 'منصوب وعلامة نصبه الفتحة الظاهرة',
        wordType: 'Definite proper noun',
        wordTypeAr: 'اسم علم معرّف',
        notes: 'The Quran - what was taught (the content of teaching)',
        notesAr: 'القرآن - المادة التي عُلِّمت'
      },
      {
        word: 'فِي',
        transliteration: 'fī',
        grammaticalRole: 'Preposition (حرف جر)',
        grammaticalRoleAr: 'حرف جر',
        caseMarking: 'Prepositions do not take case endings',
        caseMarkingAr: 'لا محل له من الإعراب',
        wordType: 'Preposition indicating time/duration',
        wordTypeAr: 'حرف جر للظرفية الزمانية',
        notes: 'In/during - indicates the time span over which teaching occurred',
        notesAr: 'في - تدل على المدة الزمنية للتعليم'
      },
      {
        word: 'سِتِّ',
        transliteration: 'sitti',
        grammaticalRole: 'Number (عدد)',
        grammaticalRoleAr: 'عدد مجرور بحرف الجر',
        caseMarking: 'Genitive (جر) - base form (أصله ستة)',
        caseMarkingAr: 'مجرور وعلامة جره الكسرة المقدرة',
        wordType: 'Cardinal number (3-10 range), مضاف',
        wordTypeAr: 'عدد أصلي من ٣-١٠، مضاف',
        notes: 'Six - masculine form (no تاء) because the counted noun (سنوات) is feminine. Note: ستة loses the تاء when in إضافة with a feminine counted noun.',
        notesAr: 'ست - بدون تاء لأن المعدود (سنوات) مؤنث. ملاحظة: ستة تفقد التاء عند الإضافة لمعدود مؤنث'
      },
      {
        word: 'سَنَوَاتٍ',
        transliteration: 'sanawātin',
        grammaticalRole: 'Counted noun (معدود) - مضاف إليه',
        grammaticalRoleAr: 'معدود - مضاف إليه',
        caseMarking: 'Genitive plural (جر) - marked with كسرة with tanween',
        caseMarkingAr: 'مجرور وعلامة جره الكسرة مع التنوين',
        wordType: 'Sound feminine plural',
        wordTypeAr: 'جمع مؤنث سالم',
        notes: 'Years - feminine counted noun in genitive plural as required for numbers 3-10',
        notesAr: 'سنوات - معدود مؤنث مجرور جمعًا كما يتطلبه العدد من ٣-١٠'
      },
      {
        word: 'بِصَبْرٍ',
        transliteration: 'bi-ṣabrin',
        grammaticalRole: 'Prepositional phrase (حال)',
        grammaticalRoleAr: 'جار ومجرور في محل نصب حال',
        caseMarking: 'صبر is genitive - marked with كسرة with tanween',
        caseMarkingAr: 'صبر: مجرور وعلامة جره الكسرة مع التنوين',
        wordType: 'Preposition + indefinite مصدر',
        wordTypeAr: 'حرف جر + مصدر نكرة',
        notes: 'With patience - describes the manner of teaching',
        notesAr: 'بصبر - تصف طريقة التعليم'
      },
      {
        word: 'وَإِتْقَانٍ',
        transliteration: 'wa-itqānin',
        grammaticalRole: 'Coordinated prepositional phrase',
        grammaticalRoleAr: 'معطوف على صبر',
        caseMarking: 'Genitive (جر) - marked with كسرة with tanween',
        caseMarkingAr: 'معطوف مجرور وعلامة جره الكسرة مع التنوين',
        wordType: 'Form IV مصدر',
        wordTypeAr: 'مصدر من الباب الرابع',
        notes: 'And mastery/perfection - paired with patience as teaching qualities',
        notesAr: 'وإتقان - مقترن بالصبر كصفات للتعليم'
      }
    ],

    phraseAnalysis: [
      {
        phrase: 'عَلَّمَ الشَّيْخُ',
        phraseType: 'Verb + Subject',
        phraseTypeAr: 'فعل + فاعل',
        function: 'Core predicate and agent',
        functionAr: 'الفعل والفاعل الأساسي',
        notes: 'The sheikh is the teacher performing the action',
        notesAr: 'الشيخ هو المعلم الذي يقوم بالفعل'
      },
      {
        phrase: 'تِسْعَةَ طُلَّابٍ',
        phraseType: 'Number phrase (العدد والمعدود)',
        phraseTypeAr: 'العدد والمعدود',
        function: 'First object (who was taught)',
        functionAr: 'المفعول به الأول (من عُلِّم)',
        notes: 'Demonstrates 3-10 number rules: gender reversal (تسعة with masc. طلاب) and genitive plural counted noun',
        notesAr: 'يوضح قواعد الأعداد ٣-١٠: مخالفة الجنس (تسعة مع طلاب المذكر) والمعدود جمع مجرور'
      },
      {
        phrase: 'سِتِّ سَنَوَاتٍ',
        phraseType: 'Number phrase (العدد والمعدود)',
        phraseTypeAr: 'العدد والمعدود',
        function: 'Duration (how long)',
        functionAr: 'ظرف المدة (كم من الوقت)',
        notes: 'Gender reversal: ست (no تاء) with feminine سنوات. When ستة is مضاف, the تاء drops for feminine counted nouns.',
        notesAr: 'مخالفة الجنس: ست (بدون تاء) مع سنوات المؤنث. ستة تفقد التاء عند الإضافة لمعدود مؤنث'
      },
      {
        phrase: 'بِصَبْرٍ وَإِتْقَانٍ',
        phraseType: 'Paired prepositional phrases (حال)',
        phraseTypeAr: 'جار ومجرور مقترن',
        function: 'Manner of teaching',
        functionAr: 'كيفية التعليم',
        notes: 'Two virtues paired: patience (emotional quality) and mastery (skill quality)',
        notesAr: 'فضيلتان مقترنتان: الصبر (صفة نفسية) والإتقان (صفة مهارية)'
      }
    ],

    sentenceAnalysis: {
      sentenceType: 'Verbal sentence with two number phrases (جملة فعلية مع عددين ومعدودين)',
      sentenceTypeAr: 'جملة فعلية تتضمن تركيبين عدديين',
      mainComponents: {
        predicate: 'عَلَّمَ (taught)',
        predicateAr: 'عَلَّمَ (الفعل)',
        subject: 'الشَّيْخُ (the sheikh)',
        subjectAr: 'الشَّيْخُ (الفاعل)',
        object: 'تِسْعَةَ طُلَّابٍ (nine students) + الْقُرْآنَ (the Quran)',
        objectAr: 'تِسْعَةَ طُلَّابٍ (مفعول به أول) + الْقُرْآنَ (مفعول به ثانٍ)'
      },
      structure: 'Verb + Subject + First Object (number phrase) + Second Object + Time phrase (number phrase) + Manner phrase',
      structureAr: 'فعل + فاعل + مفعول به أول (عدد ومعدود) + مفعول به ثانٍ + ظرف زمان (عدد ومعدود) + حال'
    },

    keyGrammaticalConcepts: [
      {
        concept: 'Gender Reversal Rule (مخالفة العدد للمعدود)',
        conceptAr: 'مخالفة العدد للمعدود',
        explanation: 'For numbers 3-10, the number takes the OPPOSITE gender of the counted noun. تسعة (with تاء = feminine form) is used with طلاب (masculine). سِتّ (without تاء = masculine form) is used with سنوات (feminine).',
        explanationAr: 'للأعداد ٣-١٠، العدد يأخذ عكس جنس المعدود. تسعة (بالتاء = مؤنث) مع طلاب (مذكر). ست (بدون تاء = مذكر) مع سنوات (مؤنث)'
      },
      {
        concept: 'Counted Noun Case for 3-10 (إعراب المعدود للأعداد ٣-١٠)',
        conceptAr: 'إعراب المعدود للأعداد ٣-١٠',
        explanation: 'For numbers 3-10, the counted noun (معدود) is genitive plural (مضاف إليه مجرور جمع). Both طلابٍ and سنواتٍ are مجرور جمع.',
        explanationAr: 'للأعداد ٣-١٠، المعدود يكون مضافًا إليه مجرورًا جمعًا. طلابٍ وسنواتٍ كلاهما مجرور جمع'
      },
      {
        concept: 'Doubly Transitive Verb (الفعل المتعدي لمفعولين)',
        conceptAr: 'الفعل المتعدي لمفعولين',
        explanation: 'عَلَّم takes two objects: the person taught (تسعة طلاب) and what is taught (القرآن). This is called "doubly transitive" or متعدٍّ لمفعولين.',
        explanationAr: 'عَلَّم يتعدى لمفعولين: المُعَلَّم (تسعة طلاب) والمادة المُعَلَّمة (القرآن). يسمى متعديًا لمفعولين'
      },
      {
        concept: 'Circumstantial Phrase (الحال)',
        conceptAr: 'الحال',
        explanation: 'بصبر وإتقان describes HOW the teaching was done - the manner or circumstance of the action.',
        explanationAr: 'بصبر وإتقان تصف كيفية التعليم - الحال أو الظرف الذي وقع فيه الفعل'
      }
    ],

    teachingNotes: 'This sentence is excellent for teaching the 3-10 number rules because it contains TWO number phrases with different genders, allowing direct comparison of the gender reversal rule.',
    teachingNotesAr: 'هذه الجملة ممتازة لتدريس قواعد الأعداد ٣-١٠ لأنها تحتوي على تركيبين عدديين بجنسين مختلفين، مما يسمح بمقارنة مباشرة لقاعدة المخالفة.'
  },

  // Example 4: Exercise 181 - Compound numbers 21-99
  {
    exerciseId: 181,
    arabic: 'اشْتَرَكَ فِي الْمُسَابَقَةِ اثْنَانِ وَثَلَاثُونَ طَالِبًا وَإِحْدَى وَأَرْبَعُونَ طَالِبَةً',
    translation: 'Thirty-two male students and forty-one female students participated in the competition',

    wordAnalysis: [
      {
        word: 'اشْتَرَكَ',
        transliteration: 'ishtaraka',
        grammaticalRole: 'Verb (predicate)',
        grammaticalRoleAr: 'فعل ماضٍ',
        caseMarking: 'No case marking',
        caseMarkingAr: 'لا محل له من الإعراب',
        wordType: 'Past tense verb, Form VIII',
        wordTypeAr: 'فعل ماضٍ من الباب الثامن',
        notes: 'Root: ش-ر-ك. Form VIII meaning "to participate together"',
        notesAr: 'الجذر: ش-ر-ك. الباب الثامن بمعنى المشاركة'
      },
      {
        word: 'فِي الْمُسَابَقَةِ',
        transliteration: 'fī al-musābaqati',
        grammaticalRole: 'Prepositional phrase',
        grammaticalRoleAr: 'جار ومجرور متعلق بالفعل',
        caseMarking: 'المسابقة is genitive - marked with كسرة',
        caseMarkingAr: 'المسابقة: مجرور وعلامة جره الكسرة',
        wordType: 'Preposition + Form III مصدر',
        wordTypeAr: 'حرف جر + مصدر من الباب الثالث',
        notes: 'In the competition - where the participation occurred',
        notesAr: 'في المسابقة - مكان المشاركة'
      },
      {
        word: 'اثْنَانِ',
        transliteration: 'ithnāni',
        grammaticalRole: 'Subject (فاعل) - units digit of compound number',
        grammaticalRoleAr: 'فاعل - آحاد العدد المركب',
        caseMarking: 'Nominative (رفع) - marked with ألف (dual marker)',
        caseMarkingAr: 'مرفوع وعلامة رفعه الألف لأنه ملحق بالمثنى',
        wordType: 'Cardinal number (2) - dual form',
        wordTypeAr: 'عدد أصلي (٢) - صيغة المثنى',
        notes: 'Two - agrees with masculine طالب (اثنان for masc, اثنتان for fem)',
        notesAr: 'اثنان - يوافق المذكر (اثنان للمذكر، اثنتان للمؤنث)'
      },
      {
        word: 'وَثَلَاثُونَ',
        transliteration: 'wa-thalāthūna',
        grammaticalRole: 'Coordinated number (tens digit)',
        grammaticalRoleAr: 'معطوف - عشرات العدد',
        caseMarking: 'Nominative (رفع) - marked with و (sound masc. plural marker)',
        caseMarkingAr: 'مرفوع وعلامة رفعه الواو لأنه ملحق بجمع المذكر السالم',
        wordType: 'Cardinal number (30) - ملحق بجمع المذكر السالم',
        wordTypeAr: 'عدد أصلي (٣٠)',
        notes: 'Thirty - tens (20-90) have ONE form for both genders',
        notesAr: 'ثلاثون - ألفاظ العقود (٢٠-٩٠) لها صيغة واحدة للجنسين'
      },
      {
        word: 'طَالِبًا',
        transliteration: 'ṭāliban',
        grammaticalRole: 'Counted noun (تمييز العدد)',
        grammaticalRoleAr: 'تمييز العدد',
        caseMarking: 'Accusative singular (نصب) - marked with فتحة with tanween',
        caseMarkingAr: 'منصوب مفردًا وعلامة نصبه الفتحة مع التنوين',
        wordType: 'Active participle used as noun, singular',
        wordTypeAr: 'اسم فاعل مفرد',
        notes: 'Student (masc.) - counted noun for 11-99 is accusative SINGULAR (تمييز منصوب مفرد)',
        notesAr: 'طالب - تمييز الأعداد ١١-٩٩ منصوب مفرد'
      },
      {
        word: 'وَإِحْدَى',
        transliteration: 'wa-iḥdā',
        grammaticalRole: 'Coordinated subject - units digit',
        grammaticalRoleAr: 'معطوف على الفاعل - آحاد العدد',
        caseMarking: 'Nominative (رفع) - indeclinable',
        caseMarkingAr: 'في محل رفع',
        wordType: 'Cardinal number (1) - feminine form',
        wordTypeAr: 'عدد أصلي (١) - صيغة المؤنث',
        notes: 'One (fem.) - إحدى for feminine, أحد for masculine. Agrees with طالبة.',
        notesAr: 'إحدى للمؤنث، أحد للمذكر. يوافق طالبة'
      },
      {
        word: 'وَأَرْبَعُونَ',
        transliteration: 'wa-arbaʿūna',
        grammaticalRole: 'Coordinated number (tens digit)',
        grammaticalRoleAr: 'معطوف - عشرات العدد',
        caseMarking: 'Nominative (رفع) - marked with و',
        caseMarkingAr: 'مرفوع وعلامة رفعه الواو',
        wordType: 'Cardinal number (40)',
        wordTypeAr: 'عدد أصلي (٤٠)',
        notes: 'Forty - same form for both genders',
        notesAr: 'أربعون - صيغة واحدة للجنسين'
      },
      {
        word: 'طَالِبَةً',
        transliteration: 'ṭālibatan',
        grammaticalRole: 'Counted noun (تمييز العدد)',
        grammaticalRoleAr: 'تمييز العدد',
        caseMarking: 'Accusative singular (نصب) - marked with فتحة with tanween',
        caseMarkingAr: 'منصوب مفردًا وعلامة نصبه الفتحة مع التنوين',
        wordType: 'Active participle (feminine), singular',
        wordTypeAr: 'اسم فاعل مؤنث مفرد',
        notes: 'Female student - accusative singular as تمييز for compound numbers',
        notesAr: 'طالبة - تمييز منصوب مفرد للأعداد المركبة'
      }
    ],

    phraseAnalysis: [
      {
        phrase: 'اثْنَانِ وَثَلَاثُونَ طَالِبًا',
        phraseType: 'Compound number phrase (٢١-٩٩)',
        phraseTypeAr: 'عدد مركب من ٢١-٩٩',
        function: 'First subject phrase',
        functionAr: 'الفاعل الأول',
        notes: 'Structure: units + و + tens + تمييز. The units (اثنان) agrees with the counted noun gender. Tens (ثلاثون) have one form. تمييز is accusative singular.',
        notesAr: 'البنية: آحاد + و + عشرات + تمييز. الآحاد (اثنان) توافق جنس المعدود. العشرات (ثلاثون) لها صيغة واحدة. التمييز منصوب مفرد'
      },
      {
        phrase: 'إِحْدَى وَأَرْبَعُونَ طَالِبَةً',
        phraseType: 'Compound number phrase (٢١-٩٩)',
        phraseTypeAr: 'عدد مركب من ٢١-٩٩',
        function: 'Second coordinated subject phrase',
        functionAr: 'الفاعل الثاني المعطوف',
        notes: 'Same structure but with feminine: إحدى (fem. of أحد) because طالبة is feminine. Note the contrast with اثنان in the first phrase.',
        notesAr: 'نفس البنية لكن بالمؤنث: إحدى (مؤنث أحد) لأن طالبة مؤنث. لاحظ التباين مع اثنان في الجملة الأولى'
      }
    ],

    sentenceAnalysis: {
      sentenceType: 'Verbal sentence with compound coordinated subjects',
      sentenceTypeAr: 'جملة فعلية بفاعلين مركبين معطوفين',
      mainComponents: {
        predicate: 'اشْتَرَكَ (participated)',
        predicateAr: 'اشْتَرَكَ (الفعل)',
        subject: 'اثْنَانِ وَثَلَاثُونَ طَالِبًا وَإِحْدَى وَأَرْبَعُونَ طَالِبَةً (32 male + 41 female students)',
        subjectAr: 'اثْنَانِ وَثَلَاثُونَ طَالِبًا وَإِحْدَى وَأَرْبَعُونَ طَالِبَةً (الفاعل المركب)'
      },
      structure: 'Verb + Prepositional phrase + First compound number subject + Coordinated second compound number subject',
      structureAr: 'فعل + جار ومجرور + فاعل عدد مركب أول + فاعل عدد مركب ثانٍ معطوف'
    },

    keyGrammaticalConcepts: [
      {
        concept: 'Compound Numbers 21-99 (الأعداد المركبة ٢١-٩٩)',
        conceptAr: 'الأعداد المركبة ٢١-٩٩',
        explanation: 'Compound numbers use: units + و + tens. The units (1-9) follow their own gender rules, while tens (20-90) have one form for both genders.',
        explanationAr: 'الأعداد المركبة: آحاد + و + عشرات. الآحاد (١-٩) تتبع قواعد الجنس الخاصة بها، بينما العشرات (٢٠-٩٠) لها صيغة واحدة للجنسين'
      },
      {
        concept: 'Units Agreement in Compound Numbers',
        conceptAr: 'موافقة الآحاد في الأعداد المركبة',
        explanation: 'In compound numbers, 1-2 AGREE with the counted noun (اثنان/اثنتان, أحد/إحدى), while 3-9 use the gender reversal rule.',
        explanationAr: 'في الأعداد المركبة، ١-٢ يوافقان المعدود (اثنان/اثنتان، أحد/إحدى)، بينما ٣-٩ تستخدم قاعدة المخالفة'
      },
      {
        concept: 'تمييز العدد for 11-99 (Accusative Singular)',
        conceptAr: 'تمييز العدد للأعداد ١١-٩٩',
        explanation: 'For numbers 11-99, the counted noun (تمييز) is ACCUSATIVE SINGULAR (منصوب مفرد), not genitive plural like 3-10.',
        explanationAr: 'للأعداد ١١-٩٩، التمييز منصوب مفرد، وليس مجرور جمع كالأعداد ٣-١٠'
      },
      {
        concept: 'Tens (ألفاظ العقود) 20-90',
        conceptAr: 'ألفاظ العقود ٢٠-٩٠',
        explanation: 'Tens (20, 30, 40, etc.) have ONE form for both masculine and feminine counted nouns. They are ملحق بجمع المذكر السالم.',
        explanationAr: 'ألفاظ العقود (٢٠، ٣٠، ٤٠، إلخ) لها صيغة واحدة للمذكر والمؤنث. وهي ملحقة بجمع المذكر السالم'
      }
    ],

    teachingNotes: 'This sentence contrasts masculine and feminine compound numbers (32 male vs 41 female students), demonstrating how only the units digit changes for gender while tens remain constant. Perfect for practicing compound number formation.',
    teachingNotesAr: 'هذه الجملة تقارن بين الأعداد المركبة المذكرة والمؤنثة (٣٢ طالبًا مقابل ٤١ طالبة)، مما يوضح كيف تتغير الآحاد فقط حسب الجنس بينما تبقى العشرات ثابتة. ممتازة لتدريب تكوين الأعداد المركبة.'
  },

  // Example 5: Exercise 186 - Large compound numbers 1000+
  {
    exerciseId: 186,
    arabic: 'حَضَرَ صَلَاةَ الْجُمُعَةِ أَلْفٌ وَمِائَتَانِ وَخَمْسَةٌ وَثَلَاثُونَ مُصَلِّيًا',
    translation: 'One thousand two hundred and thirty-five worshippers attended the Friday prayer',

    wordAnalysis: [
      {
        word: 'حَضَرَ',
        transliteration: 'ḥaḍara',
        grammaticalRole: 'Verb (predicate)',
        grammaticalRoleAr: 'فعل ماضٍ',
        caseMarking: 'No case marking',
        caseMarkingAr: 'لا محل له من الإعراب',
        wordType: 'Past tense verb, Form I',
        wordTypeAr: 'فعل ماضٍ من الباب الأول',
        notes: 'Root: ح-ض-ر. Meaning: to attend, be present',
        notesAr: 'الجذر: ح-ض-ر. بمعنى الحضور'
      },
      {
        word: 'صَلَاةَ',
        transliteration: 'ṣalāta',
        grammaticalRole: 'Object (مفعول به)',
        grammaticalRoleAr: 'مفعول به',
        caseMarking: 'Accusative (نصب) - marked with فتحة',
        caseMarkingAr: 'منصوب وعلامة نصبه الفتحة',
        wordType: 'Definite noun (first term of إضافة)',
        wordTypeAr: 'اسم مضاف',
        notes: 'Prayer - what was attended',
        notesAr: 'الصلاة - ما تم حضوره'
      },
      {
        word: 'الْجُمُعَةِ',
        transliteration: 'al-jumuʿati',
        grammaticalRole: 'مضاف إليه',
        grammaticalRoleAr: 'مضاف إليه',
        caseMarking: 'Genitive (جر) - marked with كسرة',
        caseMarkingAr: 'مجرور وعلامة جره الكسرة',
        wordType: 'Definite proper noun (day name)',
        wordTypeAr: 'اسم علم معرّف',
        notes: 'Friday - specifies which prayer',
        notesAr: 'الجمعة - تحدد أي صلاة'
      },
      {
        word: 'أَلْفٌ',
        transliteration: 'alfun',
        grammaticalRole: 'Subject (فاعل) - thousands',
        grammaticalRoleAr: 'فاعل - الآلاف',
        caseMarking: 'Nominative (رفع) - marked with ضمة with tanween',
        caseMarkingAr: 'مرفوع وعلامة رفعه الضمة مع التنوين',
        wordType: 'Cardinal number (1000)',
        wordTypeAr: 'عدد أصلي (١٠٠٠)',
        notes: 'One thousand - has ONE form for both genders. When alone (not in إضافة), it takes tanween.',
        notesAr: 'ألف - له صيغة واحدة للجنسين. عندما يكون مفردًا (ليس مضافًا) يأخذ التنوين'
      },
      {
        word: 'وَمِائَتَانِ',
        transliteration: 'wa-miʾatāni',
        grammaticalRole: 'Coordinated number - hundreds',
        grammaticalRoleAr: 'معطوف - المئات',
        caseMarking: 'Nominative (رفع) - marked with ألف (dual marker)',
        caseMarkingAr: 'مرفوع وعلامة رفعه الألف لأنه مثنى',
        wordType: 'Cardinal number (200) - dual form',
        wordTypeAr: 'عدد أصلي (٢٠٠) - مثنى',
        notes: 'Two hundred - dual of مائة. One form for both genders.',
        notesAr: 'مائتان - مثنى مائة. صيغة واحدة للجنسين'
      },
      {
        word: 'وَخَمْسَةٌ',
        transliteration: 'wa-khamsatun',
        grammaticalRole: 'Coordinated number - units',
        grammaticalRoleAr: 'معطوف - الآحاد',
        caseMarking: 'Nominative (رفع) - marked with ضمة with tanween',
        caseMarkingAr: 'مرفوع وعلامة رفعه الضمة مع التنوين',
        wordType: 'Cardinal number (5)',
        wordTypeAr: 'عدد أصلي (٥)',
        notes: 'Five - with تاء (feminine form) because مصلّي is masculine. Gender reversal rule for 3-10.',
        notesAr: 'خمسة - بالتاء (صيغة مؤنثة) لأن مصلّي مذكر. قاعدة المخالفة للأعداد ٣-١٠'
      },
      {
        word: 'وَثَلَاثُونَ',
        transliteration: 'wa-thalāthūna',
        grammaticalRole: 'Coordinated number - tens',
        grammaticalRoleAr: 'معطوف - العشرات',
        caseMarking: 'Nominative (رفع) - marked with و',
        caseMarkingAr: 'مرفوع وعلامة رفعه الواو',
        wordType: 'Cardinal number (30)',
        wordTypeAr: 'عدد أصلي (٣٠)',
        notes: 'Thirty - one form for both genders',
        notesAr: 'ثلاثون - صيغة واحدة للجنسين'
      },
      {
        word: 'مُصَلِّيًا',
        transliteration: 'muṣalliyan',
        grammaticalRole: 'Counted noun (تمييز)',
        grammaticalRoleAr: 'تمييز العدد',
        caseMarking: 'Accusative singular (نصب) - marked with فتحة with tanween',
        caseMarkingAr: 'منصوب مفردًا وعلامة نصبه الفتحة مع التنوين',
        wordType: 'Active participle Form II, singular',
        wordTypeAr: 'اسم فاعل من الباب الثاني مفرد',
        notes: 'Worshipper/one who prays - accusative singular as تمييز. The تمييز follows the LAST number component (here 35, which uses 11-99 rule).',
        notesAr: 'مصلٍّ - منصوب مفرد كتمييز. التمييز يتبع آخر مكون عددي (هنا ٣٥، الذي يستخدم قاعدة ١١-٩٩)'
      }
    ],

    phraseAnalysis: [
      {
        phrase: 'صَلَاةَ الْجُمُعَةِ',
        phraseType: 'Genitive construction (إضافة)',
        phraseTypeAr: 'مركب إضافي',
        function: 'Object of the verb',
        functionAr: 'مفعول به',
        notes: 'Friday prayer - a fixed إضافة construction',
        notesAr: 'صلاة الجمعة - تركيب إضافي ثابت'
      },
      {
        phrase: 'أَلْفٌ وَمِائَتَانِ وَخَمْسَةٌ وَثَلَاثُونَ مُصَلِّيًا',
        phraseType: 'Complex number phrase (1000+)',
        phraseTypeAr: 'عدد مركب كبير (أكثر من ١٠٠٠)',
        function: 'Subject of the verb',
        functionAr: 'فاعل الفعل',
        notes: 'Structure: thousands + hundreds + units + tens + تمييز. Reading order in Arabic: 1000 + 200 + 5 + 30 = 1235',
        notesAr: 'البنية: آلاف + مئات + آحاد + عشرات + تمييز. ترتيب القراءة: ١٠٠٠ + ٢٠٠ + ٥ + ٣٠ = ١٢٣٥'
      }
    ],

    sentenceAnalysis: {
      sentenceType: 'Verbal sentence with large compound number as subject',
      sentenceTypeAr: 'جملة فعلية بعدد مركب كبير كفاعل',
      mainComponents: {
        predicate: 'حَضَرَ (attended)',
        predicateAr: 'حَضَرَ (الفعل)',
        object: 'صَلَاةَ الْجُمُعَةِ (Friday prayer)',
        objectAr: 'صَلَاةَ الْجُمُعَةِ (المفعول به)',
        subject: 'أَلْفٌ وَمِائَتَانِ وَخَمْسَةٌ وَثَلَاثُونَ مُصَلِّيًا (1235 worshippers)',
        subjectAr: 'أَلْفٌ وَمِائَتَانِ وَخَمْسَةٌ وَثَلَاثُونَ مُصَلِّيًا (الفاعل)'
      },
      structure: 'Verb + Object (إضافة) + Complex number subject (1000 + 200 + 5 + 30 + تمييز)',
      structureAr: 'فعل + مفعول به (إضافة) + فاعل عدد مركب كبير'
    },

    keyGrammaticalConcepts: [
      {
        concept: 'Large Number Construction (الأعداد الكبيرة)',
        conceptAr: 'تركيب الأعداد الكبيرة',
        explanation: 'Large numbers are built by coordinating: thousands + hundreds + units/tens. Each component is connected with و.',
        explanationAr: 'الأعداد الكبيرة تُبنى بالعطف: آلاف + مئات + آحاد/عشرات. كل مكون متصل بـ"و"'
      },
      {
        concept: 'Hundreds Rule (قاعدة المئات)',
        conceptAr: 'قاعدة المئات',
        explanation: 'مائة (100) and its derivatives (مائتان، ثلاثمائة، إلخ) have ONE form for both genders. The counted noun is genitive singular.',
        explanationAr: 'مائة ومشتقاتها (مائتان، ثلاثمائة، إلخ) لها صيغة واحدة للجنسين. المعدود مجرور مفرد'
      },
      {
        concept: 'Thousands Rule (قاعدة الآلاف)',
        conceptAr: 'قاعدة الآلاف',
        explanation: 'ألف (1000) has ONE form for both genders. When alone, it takes tanween. Its counted noun is genitive singular.',
        explanationAr: 'ألف له صيغة واحدة للجنسين. عندما يكون مفردًا يأخذ التنوين. معدوده مجرور مفرد'
      },
      {
        concept: 'تمييز Position (موضع التمييز)',
        conceptAr: 'موضع التمييز في الأعداد الكبيرة',
        explanation: 'In complex numbers, the تمييز comes at the END, after all number components. It follows the rule of the LAST component (here 35 → accusative singular).',
        explanationAr: 'في الأعداد المركبة، التمييز يأتي في النهاية بعد كل مكونات العدد. يتبع قاعدة آخر مكون (هنا ٣٥ ← منصوب مفرد)'
      },
      {
        concept: 'Mixed Gender Rules in Complex Numbers',
        conceptAr: 'قواعد الجنس المختلطة في الأعداد المركبة',
        explanation: 'Within one number: خمسة uses gender reversal (3-10 rule, fem. form with masc. معدود), while ألف, مائتان, and ثلاثون have one form regardless of gender.',
        explanationAr: 'ضمن عدد واحد: خمسة تستخدم المخالفة (قاعدة ٣-١٠، صيغة مؤنثة مع معدود مذكر)، بينما ألف ومائتان وثلاثون لها صيغة واحدة بغض النظر عن الجنس'
      }
    ],

    teachingNotes: 'This sentence demonstrates the full complexity of Arabic number phrases with a four-component number (1000 + 200 + 35). Students should note: (1) ألف and مئات have one form, (2) الآحاد in 35 uses gender reversal, (3) العشرات have one form, (4) التمييز is accusative singular after the complete number.',
    teachingNotesAr: 'هذه الجملة توضح التعقيد الكامل لتراكيب الأعداد العربية بعدد من أربعة مكونات (١٠٠٠ + ٢٠٠ + ٣٥). يجب على الطلاب ملاحظة: (١) ألف والمئات لها صيغة واحدة، (٢) الآحاد في ٣٥ تستخدم المخالفة، (٣) العشرات لها صيغة واحدة، (٤) التمييز منصوب مفرد بعد العدد الكامل.'
  },

  // ============================================
  // Unit 9: Prepositional Phrases (الجار والمجرور)
  // ============================================

  // Example: Exercise 195 - Multiple prepositional phrases with movement verbs
  {
    exerciseId: 195,
    arabic: 'انْتَقَلَ الْعَالِمُ مِنْ بَغْدَادَ إِلَى دِمَشْقَ ثُمَّ إِلَى الْقَاهِرَةِ طَلَبًا لِلْعِلْمِ',
    translation: 'The scholar traveled from Baghdad to Damascus then to Cairo seeking knowledge',

    wordAnalysis: [
      {
        word: 'انْتَقَلَ',
        transliteration: 'intaqala',
        grammaticalRole: 'Verb (فعل)',
        grammaticalRoleAr: 'فعل ماضٍ',
        caseMarking: 'Built on فتحة (past tense)',
        caseMarkingAr: 'مبني على الفتح',
        wordType: 'Past tense verb, Form VIII',
        wordTypeAr: 'فعل ماضٍ من الباب الثامن (افتعل)',
        notes: 'Root: ن-ق-ل (to move/transfer). Form VIII adds reflexive meaning.',
        notesAr: 'الجذر: ن-ق-ل. الباب الثامن يضيف معنى المطاوعة'
      },
      {
        word: 'الْعَالِمُ',
        transliteration: 'al-ʿālimu',
        grammaticalRole: 'Subject (فاعل)',
        grammaticalRoleAr: 'فاعل',
        caseMarking: 'Nominative (رفع) - marked with ضمة',
        caseMarkingAr: 'مرفوع وعلامة رفعه الضمة الظاهرة',
        wordType: 'Active participle (اسم فاعل)',
        wordTypeAr: 'اسم فاعل من عَلِمَ',
        notes: 'The scholar - one who has knowledge',
        notesAr: 'العالم - من له علم'
      },
      {
        word: 'مِنْ',
        transliteration: 'min',
        grammaticalRole: 'Preposition (حرف جر)',
        grammaticalRoleAr: 'حرف جر',
        caseMarking: 'No case (حروف مبنية)',
        caseMarkingAr: 'مبني على السكون',
        wordType: 'Preposition for starting point',
        wordTypeAr: 'حرف جر لابتداء الغاية المكانية',
        notes: 'From - indicates starting point of movement',
        notesAr: 'من - تدل على بداية الحركة'
      },
      {
        word: 'بَغْدَادَ',
        transliteration: 'Baghdāda',
        grammaticalRole: 'Object of preposition (مجرور)',
        grammaticalRoleAr: 'اسم مجرور',
        caseMarking: 'Genitive (جر) - marked with فتحة (diptote)',
        caseMarkingAr: 'مجرور وعلامة جره الفتحة لأنه ممنوع من الصرف',
        wordType: 'Proper noun - diptote (ممنوع من الصرف)',
        wordTypeAr: 'اسم علم أعجمي ممنوع من الصرف',
        notes: 'Baghdad - diptote (foreign proper noun)',
        notesAr: 'بغداد - ممنوع من الصرف للعلمية والعجمة'
      },
      {
        word: 'إِلَى',
        transliteration: 'ilā',
        grammaticalRole: 'Preposition (حرف جر)',
        grammaticalRoleAr: 'حرف جر',
        caseMarking: 'No case (حروف مبنية)',
        caseMarkingAr: 'مبني على السكون',
        wordType: 'Preposition for endpoint',
        wordTypeAr: 'حرف جر لانتهاء الغاية المكانية',
        notes: 'To - indicates destination/endpoint',
        notesAr: 'إلى - تدل على نهاية الحركة'
      },
      {
        word: 'دِمَشْقَ',
        transliteration: 'Dimashqa',
        grammaticalRole: 'Object of preposition (مجرور)',
        grammaticalRoleAr: 'اسم مجرور',
        caseMarking: 'Genitive (جر) - marked with فتحة (diptote)',
        caseMarkingAr: 'مجرور وعلامة جره الفتحة لأنه ممنوع من الصرف',
        wordType: 'Proper noun - diptote',
        wordTypeAr: 'اسم علم أعجمي ممنوع من الصرف',
        notes: 'Damascus - diptote',
        notesAr: 'دمشق - ممنوع من الصرف للعلمية والعجمة'
      },
      {
        word: 'ثُمَّ',
        transliteration: 'thumma',
        grammaticalRole: 'Conjunction (حرف عطف)',
        grammaticalRoleAr: 'حرف عطف',
        caseMarking: 'No case (حروف مبنية)',
        caseMarkingAr: 'مبني على الفتح',
        wordType: 'Conjunction indicating sequence with delay',
        wordTypeAr: 'حرف عطف للترتيب والتراخي',
        notes: 'Then - indicates sequence with time gap',
        notesAr: 'ثم - للترتيب مع التراخي في الزمن'
      },
      {
        word: 'إِلَى الْقَاهِرَةِ',
        transliteration: 'ilā al-Qāhirati',
        grammaticalRole: 'Second prepositional phrase',
        grammaticalRoleAr: 'جار ومجرور معطوف',
        caseMarking: 'Genitive - marked with كسرة',
        caseMarkingAr: 'مجرور وعلامة جره الكسرة',
        wordType: 'Preposition + definite proper noun',
        wordTypeAr: 'حرف جر + علم معرف بأل',
        notes: 'To Cairo - القاهرة takes كسرة because it has أل',
        notesAr: 'القاهرة تُجر بالكسرة لأنها معرفة بأل'
      },
      {
        word: 'طَلَبًا',
        transliteration: 'ṭalaban',
        grammaticalRole: 'Adverbial accusative (مفعول لأجله)',
        grammaticalRoleAr: 'مفعول لأجله',
        caseMarking: 'Accusative (نصب) - marked with فتحة with tanween',
        caseMarkingAr: 'منصوب وعلامة نصبه الفتحة مع التنوين',
        wordType: 'Masdar (مصدر) from طَلَبَ',
        wordTypeAr: 'مصدر من الفعل طَلَبَ',
        notes: 'Seeking - explains the purpose/reason',
        notesAr: 'طلبًا - يبين سبب الفعل وغايته'
      },
      {
        word: 'لِلْعِلْمِ',
        transliteration: 'lil-ʿilmi',
        grammaticalRole: 'Prepositional phrase (جار ومجرور)',
        grammaticalRoleAr: 'جار ومجرور متعلق بـ"طلبًا"',
        caseMarking: 'Genitive - marked with كسرة',
        caseMarkingAr: 'مجرور وعلامة جره الكسرة',
        wordType: 'Preposition لِـ + definite noun',
        wordTypeAr: 'اللام + اسم معرف بأل',
        notes: 'For knowledge - اللام here indicates purpose',
        notesAr: 'اللام هنا للتعليل والغاية'
      }
    ],

    phraseAnalysis: [
      {
        phrase: 'مِنْ بَغْدَادَ',
        phraseType: 'Prepositional phrase (جار ومجرور)',
        phraseTypeAr: 'شبه جملة - جار ومجرور',
        function: 'Attached to the verb انتقل - starting point',
        functionAr: 'متعلق بالفعل "انتقل" - بيان نقطة البداية',
        notes: 'من for ابتداء الغاية (starting point)',
        notesAr: 'من لابتداء الغاية المكانية'
      },
      {
        phrase: 'إِلَى دِمَشْقَ',
        phraseType: 'Prepositional phrase (جار ومجرور)',
        phraseTypeAr: 'شبه جملة - جار ومجرور',
        function: 'Attached to the verb انتقل - first destination',
        functionAr: 'متعلق بالفعل "انتقل" - بيان الوجهة الأولى',
        notes: 'إلى for انتهاء الغاية (endpoint)',
        notesAr: 'إلى لانتهاء الغاية المكانية'
      },
      {
        phrase: 'إِلَى الْقَاهِرَةِ',
        phraseType: 'Coordinated prepositional phrase',
        phraseTypeAr: 'جار ومجرور معطوف',
        function: 'Attached to the verb - second destination',
        functionAr: 'متعلق بالفعل - بيان الوجهة الثانية',
        notes: 'Coordinated with ثم indicating sequence',
        notesAr: 'معطوف بـ"ثم" للدلالة على الترتيب'
      },
      {
        phrase: 'طَلَبًا لِلْعِلْمِ',
        phraseType: 'Purpose construction (مفعول لأجله)',
        phraseTypeAr: 'مفعول لأجله مع متعلقه',
        function: 'Explains the purpose of traveling',
        functionAr: 'بيان سبب السفر وغايته',
        notes: 'Classic idiomatic expression for seeking knowledge',
        notesAr: 'تعبير كلاسيكي عن طلب العلم'
      }
    ],

    sentenceAnalysis: {
      sentenceType: 'Verbal sentence with multiple prepositional phrases',
      sentenceTypeAr: 'جملة فعلية بجار ومجرور متعدد',
      mainComponents: {
        predicate: 'انْتَقَلَ (traveled/moved)',
        predicateAr: 'انْتَقَلَ (الفعل)',
        subject: 'الْعَالِمُ (the scholar)',
        subjectAr: 'الْعَالِمُ (الفاعل)'
      },
      structure: 'Verb + Subject + من (origin) + إلى (destination 1) + ثم + إلى (destination 2) + مفعول لأجله',
      structureAr: 'فعل + فاعل + من (الأصل) + إلى (الوجهة ١) + ثم + إلى (الوجهة ٢) + مفعول لأجله'
    },

    keyGrammaticalConcepts: [
      {
        concept: 'من and إلى Pairing (الجمع بين من وإلى)',
        conceptAr: 'الجمع بين من وإلى',
        explanation: 'من indicates the starting point (ابتداء الغاية) while إلى indicates the endpoint (انتهاء الغاية). They often pair together with movement verbs.',
        explanationAr: 'من تدل على ابتداء الغاية، وإلى تدل على انتهاء الغاية. كثيرًا ما يُجمع بينهما مع أفعال الحركة'
      },
      {
        concept: 'Diptotes as Objects of Prepositions',
        conceptAr: 'الممنوع من الصرف مجرورًا',
        explanation: 'Diptote nouns (ممنوع من الصرف) like بغداد and دمشق take فتحة instead of كسرة when genitive, UNLESS they have أل (like القاهرة).',
        explanationAr: 'الممنوع من الصرف مثل بغداد ودمشق يُجر بالفتحة بدل الكسرة، إلا إذا كان معرفًا بأل مثل القاهرة'
      },
      {
        concept: 'Multiple Prepositional Phrase Attachment (تعلق الجار والمجرور)',
        conceptAr: 'تعدد الجار والمجرور المتعلق بفعل واحد',
        explanation: 'Multiple prepositional phrases can attach to a single verb, each providing different information (origin, destination, purpose).',
        explanationAr: 'يمكن تعلق عدة جار ومجرور بفعل واحد، كل منها يقدم معلومة مختلفة (الأصل، الوجهة، الغاية)'
      },
      {
        concept: 'المفعول لأجله (Adverbial of Purpose)',
        conceptAr: 'المفعول لأجله',
        explanation: 'طلبًا is a مصدر in the accusative case explaining WHY the action was done. It answers "لماذا؟" (why?).',
        explanationAr: 'طلبًا مصدر منصوب يبين سبب الفعل وغايته. يجيب عن سؤال "لماذا؟"'
      }
    ],

    teachingNotes: 'This sentence is excellent for teaching the من-إلى pairing in spatial contexts. Note how ثم creates a sequence of destinations. The مفعول لأجله (طلبًا للعلم) is a classic Islamic scholarly expression. Compare diptote marking: بغداد/دمشق (فتحة) vs القاهرة (كسرة because of أل).',
    teachingNotesAr: 'هذه الجملة ممتازة لتعليم الجمع بين من وإلى في السياق المكاني. لاحظ كيف تُنشئ "ثم" تسلسلًا في الوجهات. المفعول لأجله (طلبًا للعلم) تعبير كلاسيكي في التراث الإسلامي. قارن علامة الجر: بغداد/دمشق (الفتحة) مقابل القاهرة (الكسرة لوجود أل).'
  },

  // Example: Exercise 207 - الباء الزائدة with كفى
  {
    exerciseId: 207,
    arabic: 'كَفَى بِاللَّهِ شَهِيدًا عَلَى مَا أَقُولُ',
    translation: 'Allah is sufficient as a witness to what I say',

    wordAnalysis: [
      {
        word: 'كَفَى',
        transliteration: 'kafā',
        grammaticalRole: 'Verb (فعل)',
        grammaticalRoleAr: 'فعل ماضٍ',
        caseMarking: 'Built on فتحة مقدرة (past tense)',
        caseMarkingAr: 'مبني على الفتح المقدر على الألف',
        wordType: 'Past tense verb, defective (ناقص)',
        wordTypeAr: 'فعل ماضٍ ناقص (معتل الآخر)',
        notes: 'Root: ك-ف-ي. Means "to suffice, be enough".',
        notesAr: 'الجذر: ك-ف-ي. بمعنى: اكتفى، يكفي'
      },
      {
        word: 'بِاللَّهِ',
        transliteration: 'bi-llāhi',
        grammaticalRole: 'Subject with extra ب (فاعل مجرور لفظًا)',
        grammaticalRoleAr: 'فاعل مجرور لفظًا مرفوع محلًا',
        caseMarking: 'Genitive in form (لفظًا), Nominative in meaning (محلًا)',
        caseMarkingAr: 'مجرور لفظًا بالباء الزائدة، مرفوع محلًا لأنه فاعل',
        wordType: 'Proper noun (لفظ الجلالة) with extra باء',
        wordTypeAr: 'لفظ الجلالة مع الباء الزائدة',
        notes: 'The ب is EXTRA (زائدة) - added for emphasis. Allah is actually the SUBJECT grammatically.',
        notesAr: 'الباء زائدة للتوكيد. "الله" هو الفاعل في المعنى والإعراب'
      },
      {
        word: 'شَهِيدًا',
        transliteration: 'shahīdan',
        grammaticalRole: 'Adverbial accusative (تمييز أو حال)',
        grammaticalRoleAr: 'تمييز (أو حال)',
        caseMarking: 'Accusative (نصب) - marked with فتحة with tanween',
        caseMarkingAr: 'منصوب وعلامة نصبه الفتحة مع التنوين',
        wordType: 'Intensive adjective form (فعيل)',
        wordTypeAr: 'صيغة مبالغة على وزن فَعِيل',
        notes: 'As a witness - clarifies in what capacity Allah suffices',
        notesAr: 'شهيدًا - يبين صفة الكفاية'
      },
      {
        word: 'عَلَى',
        transliteration: 'ʿalā',
        grammaticalRole: 'Preposition (حرف جر)',
        grammaticalRoleAr: 'حرف جر',
        caseMarking: 'No case (حروف مبنية)',
        caseMarkingAr: 'مبني على السكون',
        wordType: 'Preposition for "regarding/about"',
        wordTypeAr: 'حرف جر بمعنى "فيما يخص"',
        notes: 'على here means "concerning/regarding"',
        notesAr: 'على هنا بمعنى "فيما يخص" أو "بشأن"'
      },
      {
        word: 'مَا',
        transliteration: 'mā',
        grammaticalRole: 'Relative pronoun (اسم موصول)',
        grammaticalRoleAr: 'اسم موصول',
        caseMarking: 'Genitive (جر) - in the position of مجرور',
        caseMarkingAr: 'في محل جر بحرف الجر',
        wordType: 'Relative pronoun for non-rational/things',
        wordTypeAr: 'اسم موصول لغير العاقل',
        notes: 'What - introduces the relative clause',
        notesAr: 'ما - تدخل على الجمل الفعلية'
      },
      {
        word: 'أَقُولُ',
        transliteration: 'aqūlu',
        grammaticalRole: 'Verb in relative clause (صلة الموصول)',
        grammaticalRoleAr: 'فعل مضارع - صلة الموصول',
        caseMarking: 'Indicative (رفع) - marked with ضمة',
        caseMarkingAr: 'مرفوع وعلامة رفعه الضمة',
        wordType: 'Present tense verb, Form I',
        wordTypeAr: 'فعل مضارع من الباب الأول',
        notes: 'I say - the relative clause has no separate return pronoun (العائد محذوف)',
        notesAr: 'أقول - العائد إلى الموصول محذوف تقديره "أقوله"'
      }
    ],

    phraseAnalysis: [
      {
        phrase: 'بِاللَّهِ',
        phraseType: 'Subject with extra preposition',
        phraseTypeAr: 'فاعل مجرور بحرف جر زائد',
        function: 'Subject of كفى (grammatically genitive, functionally nominative)',
        functionAr: 'فاعل كفى - مجرور لفظًا مرفوع محلًا',
        notes: 'The باء is grammatically "extra" (زائدة) - it doesn\'t change the meaning but adds emphasis',
        notesAr: 'الباء زائدة - لا تغير المعنى لكنها تضيف توكيدًا'
      },
      {
        phrase: 'عَلَى مَا أَقُولُ',
        phraseType: 'Prepositional phrase with relative clause',
        phraseTypeAr: 'جار ومجرور مع جملة صلة',
        function: 'Specifies what the witnessing is about',
        functionAr: 'تحديد موضوع الشهادة',
        notes: 'ما أقول is a relative clause functioning as object of على',
        notesAr: '"ما أقول" جملة صلة الموصول في محل جر'
      },
      {
        phrase: 'مَا أَقُولُ',
        phraseType: 'Relative clause (صلة الموصول)',
        phraseTypeAr: 'صلة الموصول',
        function: 'Defines what "ما" refers to',
        functionAr: 'تعريف مرجع الموصول',
        notes: 'The return pronoun (العائد) is deleted: أقول[ه]',
        notesAr: 'العائد محذوف والتقدير: أقوله'
      }
    ],

    sentenceAnalysis: {
      sentenceType: 'Verbal sentence with extra preposition (الباء الزائدة)',
      sentenceTypeAr: 'جملة فعلية بحرف جر زائد',
      mainComponents: {
        predicate: 'كَفَى (suffices)',
        predicateAr: 'كَفَى (الفعل)',
        subject: 'بِاللَّهِ (Allah - with extra ب)',
        subjectAr: 'اللهِ (الفاعل مجرور لفظًا)'
      },
      structure: 'Verb + Subject (with زائدة ب) + تمييز + Prepositional phrase with relative clause',
      structureAr: 'فعل + فاعل (مع الباء الزائدة) + تمييز + جار ومجرور مع صلة موصول'
    },

    keyGrammaticalConcepts: [
      {
        concept: 'Extra Preposition (حرف الجر الزائد)',
        conceptAr: 'حرف الجر الزائد',
        explanation: 'A "زائد" preposition doesn\'t add meaning but adds emphasis. The noun after it is genitive in FORM but retains its original grammatical FUNCTION (here: subject).',
        explanationAr: 'حرف الجر الزائد لا يضيف معنى جديدًا لكنه يضيف توكيدًا. الاسم بعده مجرور لفظًا لكنه يحتفظ بوظيفته النحوية الأصلية (هنا: فاعل)'
      },
      {
        concept: 'الباء الزائدة مع كفى',
        conceptAr: 'الباء الزائدة مع كفى',
        explanation: 'كفى commonly takes the extra باء on its subject. This is a well-known grammatical pattern in Arabic. كفى بالله = الله كافٍ.',
        explanationAr: 'كفى كثيرًا ما تأخذ الباء الزائدة على فاعلها. هذا نمط نحوي معروف. كفى بالله = الله كافٍ'
      },
      {
        concept: 'لفظًا vs. محلًا (Form vs. Function)',
        conceptAr: 'التفريق بين اللفظ والمحل',
        explanation: 'In Arabic grammar, a word can be one case in FORM (لفظًا) but function as another case in MEANING (محلًا). Here: genitive in form, nominative in function.',
        explanationAr: 'في النحو العربي، قد تكون الكلمة في حالة إعرابية لفظًا وفي حالة أخرى محلًا. هنا: مجرور لفظًا، مرفوع محلًا'
      },
      {
        concept: 'Deleted Return Pronoun (حذف العائد)',
        conceptAr: 'حذف العائد في صلة الموصول',
        explanation: 'In "ما أقول", the pronoun referring back to ما is deleted. Full form would be "ما أقوله" (what I say [it]).',
        explanationAr: 'في "ما أقول"، الضمير الراجع إلى "ما" محذوف. الصيغة الكاملة: "ما أقوله"'
      }
    ],

    teachingNotes: 'This is a Quranic-style expression (similar to كفى بالله وكيلًا). The key concept is the extra باء - students must understand that الله is the actual subject despite being in the genitive case. Compare: كفى الله شهيدًا (without باء) has the same meaning but less emphasis.',
    teachingNotesAr: 'هذا تعبير قرآني (مشابه لـ"كفى بالله وكيلًا"). المفهوم الأساسي هو الباء الزائدة - يجب أن يفهم الطلاب أن "الله" هو الفاعل الحقيقي رغم كونه مجرورًا. قارن: "كفى اللهُ شهيدًا" (بدون الباء) له نفس المعنى لكن بتوكيد أقل.'
  },

  // Example: Exercise 210 - Quranic prepositional phrase as advanced predicate
  {
    exerciseId: 210,
    arabic: 'إِنَّ فِي خَلْقِ السَّمَاوَاتِ وَالْأَرْضِ وَاخْتِلَافِ اللَّيْلِ وَالنَّهَارِ لَآيَاتٍ لِأُولِي الْأَلْبَابِ',
    translation: 'Indeed, in the creation of the heavens and earth and the alternation of night and day are signs for those of understanding',

    wordAnalysis: [
      {
        word: 'إِنَّ',
        transliteration: 'inna',
        grammaticalRole: 'Emphatic particle (حرف توكيد ونصب)',
        grammaticalRoleAr: 'حرف توكيد ونصب',
        caseMarking: 'No case (حروف مبنية)',
        caseMarkingAr: 'مبني على الفتح',
        wordType: 'One of إن وأخواتها',
        wordTypeAr: 'من إن وأخواتها',
        notes: 'Indeed/Verily - emphasizes and puts its noun in accusative',
        notesAr: 'للتوكيد - تنصب الاسم وترفع الخبر'
      },
      {
        word: 'فِي',
        transliteration: 'fī',
        grammaticalRole: 'Preposition (حرف جر)',
        grammaticalRoleAr: 'حرف جر',
        caseMarking: 'No case (حروف مبنية)',
        caseMarkingAr: 'مبني على السكون',
        wordType: 'Preposition for containment/location',
        wordTypeAr: 'حرف جر للظرفية',
        notes: 'In - the entire prepositional phrase is the FRONTED predicate of إن',
        notesAr: 'في - الجار والمجرور في محل رفع خبر إن مقدم'
      },
      {
        word: 'خَلْقِ',
        transliteration: 'khalqi',
        grammaticalRole: 'Object of preposition (مجرور)',
        grammaticalRoleAr: 'مجرور بحرف الجر',
        caseMarking: 'Genitive (جر) - marked with كسرة',
        caseMarkingAr: 'مجرور وعلامة جره الكسرة',
        wordType: 'Masdar (مصدر) - first part of إضافة',
        wordTypeAr: 'مصدر مضاف',
        notes: 'Creation - مضاف to السماوات',
        notesAr: 'خلق - مضاف والسماوات مضاف إليه'
      },
      {
        word: 'السَّمَاوَاتِ',
        transliteration: 'as-samāwāti',
        grammaticalRole: 'Possessor in إضافة (مضاف إليه)',
        grammaticalRoleAr: 'مضاف إليه',
        caseMarking: 'Genitive (جر) - marked with كسرة',
        caseMarkingAr: 'مجرور وعلامة جره الكسرة',
        wordType: 'Sound feminine plural',
        wordTypeAr: 'جمع مؤنث سالم',
        notes: 'The heavens - plural of سماء',
        notesAr: 'السماوات - جمع سماء'
      },
      {
        word: 'وَالْأَرْضِ',
        transliteration: 'wa-l-arḍi',
        grammaticalRole: 'Coordinated to السماوات',
        grammaticalRoleAr: 'معطوف على السماوات',
        caseMarking: 'Genitive (جر) - marked with كسرة',
        caseMarkingAr: 'مجرور وعلامة جره الكسرة',
        wordType: 'Definite noun',
        wordTypeAr: 'اسم معرفة',
        notes: 'And the earth - paired with heavens',
        notesAr: 'والأرض - مقترنة بالسماوات'
      },
      {
        word: 'وَاخْتِلَافِ',
        transliteration: 'wa-khtilāfi',
        grammaticalRole: 'Coordinated to خلق',
        grammaticalRoleAr: 'معطوف على "خلق"',
        caseMarking: 'Genitive (جر) - marked with كسرة',
        caseMarkingAr: 'مجرور وعلامة جره الكسرة',
        wordType: 'Masdar Form VIII - مضاف',
        wordTypeAr: 'مصدر الباب الثامن - مضاف',
        notes: 'And the alternation - coordinated second مصدر',
        notesAr: 'واختلاف - مصدر ثانٍ معطوف'
      },
      {
        word: 'اللَّيْلِ وَالنَّهَارِ',
        transliteration: 'al-layli wa-n-nahāri',
        grammaticalRole: 'Possessor in إضافة (مضاف إليه)',
        grammaticalRoleAr: 'مضاف إليه',
        caseMarking: 'Genitive (جر) - marked with كسرة',
        caseMarkingAr: 'مجرور وعلامة جره الكسرة',
        wordType: 'Two coordinated definite nouns',
        wordTypeAr: 'اسمان معرفتان معطوفان',
        notes: 'Night and day - natural pair in Arabic',
        notesAr: 'الليل والنهار - زوج طبيعي في العربية'
      },
      {
        word: 'لَآيَاتٍ',
        transliteration: 'la-āyātin',
        grammaticalRole: 'Subject of إن (اسم إن مؤخر)',
        grammaticalRoleAr: 'اسم إن مؤخر',
        caseMarking: 'Accusative (نصب) - marked with كسرة (sound fem. plural)',
        caseMarkingAr: 'منصوب وعلامة نصبه الكسرة لأنه جمع مؤنث سالم',
        wordType: 'Sound feminine plural with لام التوكيد',
        wordTypeAr: 'جمع مؤنث سالم مع اللام المزحلقة',
        notes: 'Surely signs - اللام is لام التوكيد المزحلقة (moved from إن)',
        notesAr: 'لآيات - اللام هي لام التوكيد المزحلقة من إن إلى اسمها'
      },
      {
        word: 'لِأُولِي',
        transliteration: 'li-ulī',
        grammaticalRole: 'Preposition + noun (جار ومجرور)',
        grammaticalRoleAr: 'جار ومجرور',
        caseMarking: 'Genitive - marked with ي (ملحق بجمع المذكر السالم)',
        caseMarkingAr: 'مجرور وعلامة جره الياء',
        wordType: 'Defective noun (من الأسماء الخمسة)',
        wordTypeAr: 'من ملحقات جمع المذكر السالم',
        notes: 'For those possessing - أولو/أولي means "those who have"',
        notesAr: 'لأولي - أولو بمعنى أصحاب أو ذوو'
      },
      {
        word: 'الْأَلْبَابِ',
        transliteration: 'al-albābi',
        grammaticalRole: 'Possessor in إضافة',
        grammaticalRoleAr: 'مضاف إليه',
        caseMarking: 'Genitive (جر) - marked with كسرة',
        caseMarkingAr: 'مجرور وعلامة جره الكسرة',
        wordType: 'Broken plural of لُبّ',
        wordTypeAr: 'جمع تكسير للُبّ',
        notes: 'Understanding/intellects - plural of لُبّ (core, essence, intellect)',
        notesAr: 'الألباب - جمع لُبّ بمعنى العقل الخالص'
      }
    ],

    phraseAnalysis: [
      {
        phrase: 'فِي خَلْقِ السَّمَاوَاتِ وَالْأَرْضِ وَاخْتِلَافِ اللَّيْلِ وَالنَّهَارِ',
        phraseType: 'Prepositional phrase as fronted predicate',
        phraseTypeAr: 'جار ومجرور في محل رفع خبر مقدم',
        function: 'Predicate of إن (fronted)',
        functionAr: 'خبر إن المقدم',
        notes: 'The entire prepositional phrase serves as the predicate, fronted for emphasis',
        notesAr: 'الجار والمجرور بأكمله خبر إن، مُقدَّم للتوكيد'
      },
      {
        phrase: 'خَلْقِ السَّمَاوَاتِ وَالْأَرْضِ',
        phraseType: 'Genitive construction (إضافة)',
        phraseTypeAr: 'مركب إضافي',
        function: 'Object of في',
        functionAr: 'مجرور بـ"في"',
        notes: 'First cosmic phenomenon - creation',
        notesAr: 'الظاهرة الكونية الأولى - الخلق'
      },
      {
        phrase: 'اخْتِلَافِ اللَّيْلِ وَالنَّهَارِ',
        phraseType: 'Coordinated إضافة',
        phraseTypeAr: 'مركب إضافي معطوف',
        function: 'Coordinated to the first إضافة',
        functionAr: 'معطوف على المركب الإضافي الأول',
        notes: 'Second cosmic phenomenon - alternation',
        notesAr: 'الظاهرة الكونية الثانية - الاختلاف'
      },
      {
        phrase: 'لِأُولِي الْأَلْبَابِ',
        phraseType: 'Prepositional phrase describing آيات',
        phraseTypeAr: 'جار ومجرور متعلق بـ"آيات" أو صفة لها',
        function: 'Specifies for whom the signs are meaningful',
        functionAr: 'تحديد من تنفعه الآيات',
        notes: 'For the people of understanding - those who reflect',
        notesAr: 'لأصحاب العقول - الذين يتفكرون'
      }
    ],

    sentenceAnalysis: {
      sentenceType: 'Nominal sentence with إن - inverted word order',
      sentenceTypeAr: 'جملة اسمية منسوخة بإن - مع تقديم الخبر',
      mainComponents: {
        subject: 'لَآيَاتٍ (signs - delayed اسم إن)',
        subjectAr: 'آيات (اسم إن مؤخر)',
        predicate: 'فِي خَلْقِ السَّمَاوَاتِ... (in the creation... - fronted خبر إن)',
        predicateAr: 'في خلق السماوات... (خبر إن مقدم)'
      },
      structure: 'إنَّ + Fronted predicate (جار ومجرور) + Delayed subject (اسم إن مع لام التوكيد) + Descriptive phrase',
      structureAr: 'إنَّ + خبر مقدم (جار ومجرور) + اسم مؤخر (مع اللام المزحلقة) + وصف'
    },

    keyGrammaticalConcepts: [
      {
        concept: 'Fronted Predicate with إن (تقديم خبر إن)',
        conceptAr: 'تقديم خبر إن على اسمها',
        explanation: 'The predicate of إن can be fronted before its subject for emphasis or rhetorical effect. Here the prepositional phrase (في خلق...) comes before the subject (آيات).',
        explanationAr: 'يجوز تقديم خبر إن على اسمها للتوكيد أو لغرض بلاغي. هنا الجار والمجرور (في خلق...) جاء قبل الاسم (آيات)'
      },
      {
        concept: 'لام التوكيد المزحلقة',
        conceptAr: 'اللام المزحلقة',
        explanation: 'When إن is followed by a fronted predicate, the emphatic لام that normally attaches to إن "slides" (تزحلق) to the delayed subject. Hence لَآيات not إنَّ لَفي.',
        explanationAr: 'عندما يتقدم خبر إن على اسمها، تنتقل لام التوكيد من إن إلى الاسم المؤخر. لذلك نقول "لآيات" وليس "إن لفي"'
      },
      {
        concept: 'Prepositional Phrase as Predicate (الجار والمجرور خبرًا)',
        conceptAr: 'الجار والمجرور في محل رفع خبر',
        explanation: 'A prepositional phrase can function as the predicate in Arabic. It is considered to be "in the position of" nominative (في محل رفع).',
        explanationAr: 'يمكن للجار والمجرور أن يكون خبرًا. يُعرب "في محل رفع"'
      },
      {
        concept: 'Sound Feminine Plural Accusative with كسرة',
        conceptAr: 'نصب جمع المؤنث السالم بالكسرة',
        explanation: 'Sound feminine plurals (like آيات) take كسرة as their accusative marker, not فتحة. This is a unique feature of this plural type.',
        explanationAr: 'جمع المؤنث السالم (مثل آيات) يُنصب بالكسرة لا بالفتحة. هذه خاصية فريدة لهذا النوع من الجموع'
      },
      {
        concept: 'أولو/أولي as Defective Noun',
        conceptAr: 'أولو من ملحقات جمع المذكر السالم',
        explanation: 'أولو (nominative) / أولي (genitive/accusative) means "those who possess." It follows the sound masculine plural pattern but has no singular form.',
        explanationAr: 'أولو (رفع) / أولي (نصب وجر) بمعنى "أصحاب" أو "ذوو". يُعرب إعراب جمع المذكر السالم لكن لا مفرد له'
      }
    ],

    teachingNotes: 'This is Quran 3:190 (Aal-Imran). The fronted predicate structure emphasizes WHERE the signs are found. Note the two parallel إضافة structures (خلق + اختلاف), each with paired objects (سماوات/أرض and ليل/نهار). The اللام المزحلقة is a key advanced grammar concept. أولي الألباب is a Quranic idiom for "people of intellect."',
    teachingNotesAr: 'هذه الآية من سورة آل عمران (١٩٠). تقديم الخبر يؤكد أين توجد الآيات. لاحظ التوازي بين التركيبين الإضافيين (خلق + اختلاف)، كل منهما مع زوج (سماوات/أرض وليل/نهار). اللام المزحلقة مفهوم نحوي متقدم. "أولي الألباب" تعبير قرآني عن أصحاب العقول.'
  },

  // ============================================
  // Unit 10: Possessive Phrases with Pronouns (الإضافة مع الضمائر)
  // ============================================

  // Example: Exercise 219 - Dual pronouns with dual nouns
  {
    exerciseId: 219,
    arabic: 'الطَّالِبَانِ أَنْهَيَا وَاجِبَهُمَا قَبْلَ مَوْعِدِهِ',
    translation: 'The two students finished their assignment before its deadline',

    wordAnalysis: [
      {
        word: 'الطَّالِبَانِ',
        transliteration: 'aṭ-ṭālibāni',
        grammaticalRole: 'Subject (مبتدأ)',
        grammaticalRoleAr: 'مبتدأ مرفوع',
        caseMarking: 'Nominative (رفع) - marked with ألف (dual marker)',
        caseMarkingAr: 'مرفوع وعلامة رفعه الألف لأنه مثنى',
        wordType: 'Dual noun with أل',
        wordTypeAr: 'مثنى معرف بأل',
        notes: 'The two students - dual form of طالب',
        notesAr: 'الطالبان - مثنى طالب'
      },
      {
        word: 'أَنْهَيَا',
        transliteration: 'anhayā',
        grammaticalRole: 'Verb (فعل) - predicate',
        grammaticalRoleAr: 'فعل ماضٍ والجملة خبر',
        caseMarking: 'Built on فتحة, dual marker ا',
        caseMarkingAr: 'مبني على الفتح، والألف ضمير المثنى',
        wordType: 'Past tense verb Form IV + dual pronoun',
        wordTypeAr: 'فعل ماضٍ من الباب الرابع + ألف الاثنين',
        notes: 'They (two) finished - ألف الاثنين is the subject pronoun',
        notesAr: 'أنهيا - الألف ضمير متصل في محل رفع فاعل'
      },
      {
        word: 'وَاجِبَهُمَا',
        transliteration: 'wājibhumā',
        grammaticalRole: 'Object (مفعول به) + possessive pronoun',
        grammaticalRoleAr: 'مفعول به مضاف + ضمير مضاف إليه',
        caseMarking: 'Accusative - marked with فتحة',
        caseMarkingAr: 'منصوب وعلامة نصبه الفتحة',
        wordType: 'Noun + dual attached pronoun (هُمَا)',
        wordTypeAr: 'اسم مضاف + ضمير المثنى الغائب',
        notes: 'Their (dual) assignment - هُمَا refers back to الطالبان',
        notesAr: 'واجبهما - الضمير يعود على الطالبين'
      },
      {
        word: 'قَبْلَ',
        transliteration: 'qabla',
        grammaticalRole: 'Adverb of time (ظرف زمان)',
        grammaticalRoleAr: 'ظرف زمان منصوب',
        caseMarking: 'Accusative (نصب) - indeclinable adverb',
        caseMarkingAr: 'منصوب على الظرفية',
        wordType: 'Time adverb (ظرف زمان)',
        wordTypeAr: 'ظرف زمان',
        notes: 'Before - takes مضاف إليه',
        notesAr: 'قبل - يضاف إلى ما بعده'
      },
      {
        word: 'مَوْعِدِهِ',
        transliteration: 'mawʿidihi',
        grammaticalRole: 'Possessor (مضاف إليه) + pronoun',
        grammaticalRoleAr: 'مضاف إليه + ضمير مضاف إليه ثانٍ',
        caseMarking: 'Genitive (جر) - marked with كسرة',
        caseMarkingAr: 'مجرور وعلامة جره الكسرة',
        wordType: 'Noun + 3rd person singular pronoun',
        wordTypeAr: 'اسم مضاف + ضمير الغائب المفرد',
        notes: 'Its deadline - ه refers to الواجب',
        notesAr: 'موعده - الهاء تعود على الواجب'
      }
    ],

    phraseAnalysis: [
      {
        phrase: 'الطَّالِبَانِ أَنْهَيَا',
        phraseType: 'Subject + Verb agreement (dual)',
        phraseTypeAr: 'مبتدأ + فعل (تطابق المثنى)',
        function: 'Shows dual subject-verb agreement',
        functionAr: 'يوضح التطابق بين المبتدأ المثنى والفعل',
        notes: 'Dual noun requires dual verb ending (ـا)',
        notesAr: 'المثنى يتطلب ألف الاثنين في الفعل'
      },
      {
        phrase: 'وَاجِبَهُمَا',
        phraseType: 'Possessed noun with dual pronoun',
        phraseTypeAr: 'مضاف مع ضمير المثنى',
        function: 'Shows possession by two people',
        functionAr: 'يدل على ملكية الاثنين',
        notes: 'هُمَا is the dual possessive pronoun for 3rd person',
        notesAr: 'هُمَا ضمير المثنى الغائب للملكية'
      },
      {
        phrase: 'قَبْلَ مَوْعِدِهِ',
        phraseType: 'Time adverb with إضافة',
        phraseTypeAr: 'ظرف زمان مضاف',
        function: 'Indicates temporal relationship',
        functionAr: 'يدل على العلاقة الزمانية',
        notes: 'قبل is always مضاف',
        notesAr: 'قبل دائمًا مضاف إلى ما بعده'
      }
    ],

    sentenceAnalysis: {
      sentenceType: 'Nominal sentence with verbal predicate',
      sentenceTypeAr: 'جملة اسمية خبرها جملة فعلية',
      mainComponents: {
        subject: 'الطَّالِبَانِ (the two students)',
        subjectAr: 'الطَّالِبَانِ (المبتدأ)',
        predicate: 'أَنْهَيَا وَاجِبَهُمَا... (finished their assignment...)',
        predicateAr: 'الجملة الفعلية "أنهيا واجبهما..." (الخبر)'
      },
      structure: 'Dual subject + Dual verb + Object with dual pronoun + Time phrase',
      structureAr: 'مبتدأ مثنى + فعل مثنى + مفعول به مع ضمير مثنى + ظرف زمان'
    },

    keyGrammaticalConcepts: [
      {
        concept: 'Dual Pronoun هُمَا',
        conceptAr: 'ضمير المثنى الغائب',
        explanation: 'هُمَا is used for "their" when referring to exactly two people or things. It is the same for masculine and feminine in the 3rd person dual.',
        explanationAr: 'هُمَا يستخدم للدلالة على ملكية الاثنين. وهو مشترك بين المذكر والمؤنث في الغائب المثنى'
      },
      {
        concept: 'Pronoun Reference Tracking',
        conceptAr: 'تتبع مرجع الضمير',
        explanation: 'Different pronouns in the same sentence can refer to different nouns: هُمَا → الطالبان, هِ → الواجب. Context determines reference.',
        explanationAr: 'الضمائر المختلفة في نفس الجملة قد تعود على أسماء مختلفة: هُمَا ← الطالبان، ه ← الواجب. السياق يحدد المرجع'
      },
      {
        concept: 'Dual Verb Agreement',
        conceptAr: 'تطابق الفعل مع المثنى',
        explanation: 'When the subject is dual, the verb takes ألف الاثنين (ـا) as its ending: أنهيَا (they two finished).',
        explanationAr: 'عندما يكون الفاعل مثنى، يأخذ الفعل ألف الاثنين في آخره: أنهيَا'
      }
    ],

    teachingNotes: 'This sentence demonstrates the full dual agreement system: dual noun (الطالبان), dual verb (أنهيا), and dual possessive pronoun (هُمَا). Note how the singular هِ in موعده refers to الواجب, not الطالبان - teaching students to track pronoun references is essential.',
    teachingNotesAr: 'هذه الجملة توضح نظام التطابق الكامل للمثنى: اسم مثنى (الطالبان)، فعل مثنى (أنهيا)، وضمير ملكية مثنى (هُمَا). لاحظ أن الهاء المفردة في "موعده" تعود على الواجب لا على الطالبين - تعليم الطلاب تتبع مراجع الضمائر أساسي.'
  },

  // Example: Exercise 227 - ياء المتكلم with منقوص noun
  {
    exerciseId: 227,
    arabic: 'قَاضِيَّ الْعَدْلِ حَكَمَ فِي قَضِيَّتِي بِالْإِنْصَافِ',
    translation: 'My just judge ruled in my case with fairness',

    wordAnalysis: [
      {
        word: 'قَاضِيَّ',
        transliteration: 'qāḍiyya',
        grammaticalRole: 'Subject (مبتدأ)',
        grammaticalRoleAr: 'مبتدأ مرفوع',
        caseMarking: 'Nominative (رفع) - apparent on ياء المتكلم',
        caseMarkingAr: 'مرفوع وعلامة رفعه ضمة مقدرة على ما قبل ياء المتكلم',
        wordType: 'Defective noun (منقوص) + ياء المتكلم',
        wordTypeAr: 'اسم منقوص مضاف + ياء المتكلم',
        notes: 'My judge - قاضٍ becomes قاضِيَّ (double ي) with ياء المتكلم',
        notesAr: 'قاضيَّ - الاسم المنقوص "قاضٍ" مع ياء المتكلم تصير ياؤه مشددة'
      },
      {
        word: 'الْعَدْلِ',
        transliteration: 'al-ʿadli',
        grammaticalRole: 'Adjective of قاضي (صفة) in إضافة',
        grammaticalRoleAr: 'مضاف إليه (صفة مشبهة)',
        caseMarking: 'Genitive (جر) - marked with كسرة',
        caseMarkingAr: 'مجرور وعلامة جره الكسرة',
        wordType: 'Definite noun as second term of إضافة',
        wordTypeAr: 'اسم معرفة مضاف إليه',
        notes: 'The just/of justice - describes the judge',
        notesAr: 'العدل - صفة للقاضي بالإضافة'
      },
      {
        word: 'حَكَمَ',
        transliteration: 'ḥakama',
        grammaticalRole: 'Verb (فعل) - predicate',
        grammaticalRoleAr: 'فعل ماضٍ والجملة خبر',
        caseMarking: 'Built on فتحة',
        caseMarkingAr: 'مبني على الفتح',
        wordType: 'Past tense verb Form I',
        wordTypeAr: 'فعل ماضٍ من الباب الأول',
        notes: 'He ruled/judged - the implied subject refers back to قاضي',
        notesAr: 'حكم - الفاعل ضمير مستتر يعود على القاضي'
      },
      {
        word: 'فِي',
        transliteration: 'fī',
        grammaticalRole: 'Preposition (حرف جر)',
        grammaticalRoleAr: 'حرف جر',
        caseMarking: 'No case (حروف مبنية)',
        caseMarkingAr: 'مبني على السكون',
        wordType: 'Preposition for "in/regarding"',
        wordTypeAr: 'حرف جر للظرفية',
        notes: 'In/regarding - introduces the case',
        notesAr: 'في - تدخل على الموضوع'
      },
      {
        word: 'قَضِيَّتِي',
        transliteration: 'qaḍiyyatī',
        grammaticalRole: 'Object of preposition + possessive',
        grammaticalRoleAr: 'مجرور بحرف الجر + ياء المتكلم',
        caseMarking: 'Genitive (جر) - marked with كسرة',
        caseMarkingAr: 'مجرور وعلامة جره الكسرة المقدرة قبل ياء المتكلم',
        wordType: 'Regular noun + ياء المتكلم',
        wordTypeAr: 'اسم صحيح مضاف + ياء المتكلم',
        notes: 'My case - regular noun (not منقوص) so ياء is single',
        notesAr: 'قضيتي - اسم صحيح فياء المتكلم مفردة'
      },
      {
        word: 'بِالْإِنْصَافِ',
        transliteration: 'bil-inṣāfi',
        grammaticalRole: 'Prepositional phrase (جار ومجرور)',
        grammaticalRoleAr: 'جار ومجرور متعلق بـ"حكم"',
        caseMarking: 'Genitive - marked with كسرة',
        caseMarkingAr: 'مجرور وعلامة جره الكسرة',
        wordType: 'Preposition + definite مصدر',
        wordTypeAr: 'الباء + مصدر معرف',
        notes: 'With fairness - الباء here indicates manner',
        notesAr: 'بالإنصاف - الباء للمصاحبة أو الوسيلة'
      }
    ],

    phraseAnalysis: [
      {
        phrase: 'قَاضِيَّ الْعَدْلِ',
        phraseType: 'Possessed noun with إضافة for description',
        phraseTypeAr: 'مضاف + مضاف إليه للوصف',
        function: 'Subject phrase with descriptive إضافة',
        functionAr: 'مبتدأ مركب من إضافة وصفية',
        notes: 'قاضي العدل = القاضي العادل (attributive إضافة)',
        notesAr: 'قاضي العدل = القاضي العادل (إضافة وصفية)'
      },
      {
        phrase: 'فِي قَضِيَّتِي',
        phraseType: 'Prepositional phrase with possessed noun',
        phraseTypeAr: 'جار ومجرور مع مضاف',
        function: 'Specifies what the ruling was about',
        functionAr: 'يحدد موضوع الحكم',
        notes: 'Compare قضيتي (regular + ي) vs قاضيَّ (منقوص + ي)',
        notesAr: 'قارن: قضيتي (صحيح + ي) مقابل قاضيَّ (منقوص + ي)'
      }
    ],

    sentenceAnalysis: {
      sentenceType: 'Nominal sentence with verbal predicate',
      sentenceTypeAr: 'جملة اسمية خبرها جملة فعلية',
      mainComponents: {
        subject: 'قَاضِيَّ الْعَدْلِ (my just judge)',
        subjectAr: 'قَاضِيَّ الْعَدْلِ (المبتدأ)',
        predicate: 'حَكَمَ فِي قَضِيَّتِي بِالْإِنْصَافِ (ruled in my case with fairness)',
        predicateAr: 'حَكَمَ... (الخبر - جملة فعلية)'
      },
      structure: 'Subject (منقوص + ياء + إضافة) + Verb + Prepositional phrase + Prepositional phrase',
      structureAr: 'مبتدأ (منقوص مضاف مع ياء المتكلم + مضاف إليه) + فعل + جار ومجرور + جار ومجرور'
    },

    keyGrammaticalConcepts: [
      {
        concept: 'ياء المتكلم with منقوص Nouns',
        conceptAr: 'ياء المتكلم مع الاسم المنقوص',
        explanation: 'When ياء المتكلم attaches to a منقوص (noun ending in ي like قاضٍ), the two ي letters merge into يَّ (shadda): قاضٍ + ي = قاضِيَّ.',
        explanationAr: 'عند اتصال ياء المتكلم بالاسم المنقوص (المنتهي بياء مثل قاضٍ)، تدغم الياءان في ياء مشددة: قاضٍ + ي = قاضِيَّ'
      },
      {
        concept: 'Regular Noun vs منقوص with ياء المتكلم',
        conceptAr: 'الفرق بين الصحيح والمنقوص مع ياء المتكلم',
        explanation: 'Regular nouns keep single ي (قضيتي), but منقوص nouns get يَّ (قاضيَّ). This is because منقوص already ends in ي.',
        explanationAr: 'الأسماء الصحيحة تبقى الياء مفردة (قضيتي)، أما المنقوص فتصير مشددة (قاضيَّ). السبب أن المنقوص ينتهي أصلًا بياء'
      },
      {
        concept: 'إضافة for Description',
        conceptAr: 'الإضافة للوصف',
        explanation: 'قاضي العدل is an إضافة where the second term describes the first: "judge of justice" = "just judge." This is called إضافة وصفية.',
        explanationAr: 'قاضي العدل إضافة يصف فيها المضاف إليه المضاف: "قاضي العدل" = "القاضي العادل". تسمى إضافة وصفية'
      }
    ],

    teachingNotes: 'This sentence contrasts two ياء المتكلم patterns: قاضِيَّ (منقوص, double ي) vs قضيتي (regular, single ي). The منقوص pattern is advanced - students should memorize that any noun ending in ي before ياء المتكلم results in يَّ. Also note the descriptive إضافة (قاضي العدل = القاضي العادل).',
    teachingNotesAr: 'هذه الجملة تقارن نمطين لياء المتكلم: قاضِيَّ (منقوص، ياء مشددة) مقابل قضيتي (صحيح، ياء مفردة). نمط المنقوص متقدم - يجب أن يحفظ الطلاب أن أي اسم ينتهي بياء قبل ياء المتكلم ينتج ياء مشددة. لاحظ أيضًا الإضافة الوصفية (قاضي العدل = القاضي العادل).'
  },

  // Example: Exercise 231 - Quranic with dual + ياء المتكلم
  {
    exerciseId: 231,
    arabic: 'رَبِّ اغْفِرْ لِي وَلِوَالِدَيَّ وَلِمَنْ دَخَلَ بَيْتِيَ مُؤْمِنًا',
    translation: 'My Lord, forgive me and my parents and whoever enters my house as a believer',

    wordAnalysis: [
      {
        word: 'رَبِّ',
        transliteration: 'rabbi',
        grammaticalRole: 'Vocative (منادى مضاف)',
        grammaticalRoleAr: 'منادى مضاف منصوب',
        caseMarking: 'Accusative (نصب) - حذفت ياء المتكلم للتخفيف',
        caseMarkingAr: 'منصوب وعلامة نصبه فتحة مقدرة، حذفت ياء المتكلم',
        wordType: 'Vocative with deleted ياء المتكلم',
        wordTypeAr: 'منادى مع حذف ياء المتكلم للتخفيف',
        notes: 'My Lord - ياء المتكلم deleted in vocative (common in Quran)',
        notesAr: 'رَبِّ - حذفت ياء المتكلم من "ربي" للتخفيف في النداء'
      },
      {
        word: 'اغْفِرْ',
        transliteration: 'ighfir',
        grammaticalRole: 'Imperative verb (فعل أمر)',
        grammaticalRoleAr: 'فعل أمر مبني على السكون',
        caseMarking: 'Jussive form (built on sukun)',
        caseMarkingAr: 'مبني على السكون',
        wordType: 'Imperative Form I',
        wordTypeAr: 'فعل أمر من الباب الأول',
        notes: 'Forgive! - command form of غَفَرَ',
        notesAr: 'اغفر - أمر من غَفَرَ يَغْفِرُ'
      },
      {
        word: 'لِي',
        transliteration: 'lī',
        grammaticalRole: 'Preposition + pronoun',
        grammaticalRoleAr: 'جار ومجرور',
        caseMarking: 'Genitive (جر) - pronoun in place of مجرور',
        caseMarkingAr: 'في محل جر بحرف الجر',
        wordType: 'Preposition لِ + 1st person pronoun',
        wordTypeAr: 'اللام + ياء المتكلم',
        notes: 'For me - لِ + ي = لِي',
        notesAr: 'لي - اللام مع ياء المتكلم'
      },
      {
        word: 'وَلِوَالِدَيَّ',
        transliteration: 'wa-li-wālidayya',
        grammaticalRole: 'Coordinated prepositional phrase',
        grammaticalRoleAr: 'معطوف - جار ومجرور مع مضاف',
        caseMarking: 'Genitive - dual with ياء المتكلم',
        caseMarkingAr: 'مجرور وعلامة جره الياء لأنه مثنى، والياء الثانية ياء المتكلم',
        wordType: 'Preposition + dual noun + ياء المتكلم',
        wordTypeAr: 'لام الجر + مثنى + ياء المتكلم',
        notes: 'And for my parents - والِدَين + ي = والِدَيَّ (dual ي + ياء المتكلم)',
        notesAr: 'ولوالديَّ - المثنى "والدَيْن" مع ياء المتكلم تصير "والدَيَّ"'
      },
      {
        word: 'وَلِمَنْ',
        transliteration: 'wa-li-man',
        grammaticalRole: 'Coordinated preposition + relative pronoun',
        grammaticalRoleAr: 'معطوف - جار + اسم موصول',
        caseMarking: 'مَن in place of مجرور',
        caseMarkingAr: 'في محل جر باللام',
        wordType: 'Preposition + relative pronoun',
        wordTypeAr: 'لام الجر + اسم موصول',
        notes: 'And for whoever - مَن is relative here',
        notesAr: 'ولمن - مَن موصولة بمعنى "الذي"'
      },
      {
        word: 'دَخَلَ',
        transliteration: 'dakhala',
        grammaticalRole: 'Verb in relative clause (صلة الموصول)',
        grammaticalRoleAr: 'فعل ماضٍ - صلة الموصول',
        caseMarking: 'Built on فتحة',
        caseMarkingAr: 'مبني على الفتح',
        wordType: 'Past tense verb Form I',
        wordTypeAr: 'فعل ماضٍ من الباب الأول',
        notes: 'Entered - defines who مَن refers to',
        notesAr: 'دخل - صلة الموصول'
      },
      {
        word: 'بَيْتِيَ',
        transliteration: 'baytiya',
        grammaticalRole: 'Object + possessive (مفعول به)',
        grammaticalRoleAr: 'مفعول به مضاف + ياء المتكلم',
        caseMarking: 'Accusative - فتحة before ياء',
        caseMarkingAr: 'منصوب وعلامة نصبه الفتحة على ما قبل الياء',
        wordType: 'Regular noun + ياء المتكلم',
        wordTypeAr: 'اسم صحيح + ياء المتكلم',
        notes: 'My house - regular pattern بيت + ي',
        notesAr: 'بيتي - نمط عادي للمضاف'
      },
      {
        word: 'مُؤْمِنًا',
        transliteration: 'mu\'minan',
        grammaticalRole: 'Adverbial accusative (حال)',
        grammaticalRoleAr: 'حال منصوب',
        caseMarking: 'Accusative (نصب) - marked with فتحة + tanween',
        caseMarkingAr: 'منصوب وعلامة نصبه الفتحة مع التنوين',
        wordType: 'Active participle Form IV as حال',
        wordTypeAr: 'اسم فاعل من الباب الرابع حال',
        notes: 'As a believer - describes the state of the one entering',
        notesAr: 'مؤمنًا - حال من فاعل "دخل"'
      }
    ],

    phraseAnalysis: [
      {
        phrase: 'رَبِّ اغْفِرْ',
        phraseType: 'Vocative + Imperative',
        phraseTypeAr: 'نداء + أمر',
        function: 'Supplication structure',
        functionAr: 'أسلوب دعاء',
        notes: 'Deleted ياء المتكلم is common in Quranic vocatives',
        notesAr: 'حذف ياء المتكلم شائع في النداء القرآني'
      },
      {
        phrase: 'لِي وَلِوَالِدَيَّ وَلِمَنْ دَخَلَ بَيْتِيَ',
        phraseType: 'Triple coordinated prepositional phrases',
        phraseTypeAr: 'ثلاثة جار ومجرور معطوفة',
        function: 'Lists the beneficiaries of the supplication',
        functionAr: 'يعدد المستفيدين من الدعاء',
        notes: 'Three levels: self, parents, believers',
        notesAr: 'ثلاثة مستويات: النفس، الوالدين، المؤمنين'
      },
      {
        phrase: 'وَالِدَيَّ',
        phraseType: 'Dual noun with ياء المتكلم',
        phraseTypeAr: 'مثنى مع ياء المتكلم',
        function: 'Possessive dual - "my two parents"',
        functionAr: 'ملكية المثنى - "والدَيَّ"',
        notes: 'والِدَيْن (dual genitive) + ي = والِدَيَّ (ن drops, ي doubles)',
        notesAr: 'والدَيْن (مثنى مجرور) + ي = والدَيَّ (تحذف النون وتشدد الياء)'
      }
    ],

    sentenceAnalysis: {
      sentenceType: 'Vocative sentence with imperative and coordinated objects',
      sentenceTypeAr: 'جملة ندائية مع فعل أمر ومعطوفات',
      mainComponents: {
        subject: 'رَبِّ (My Lord - vocative)',
        subjectAr: 'رَبِّ (منادى)',
        predicate: 'اغْفِرْ (forgive - imperative)',
        predicateAr: 'اغْفِرْ (فعل الأمر)',
        object: 'لِي وَلِوَالِدَيَّ وَلِمَنْ دَخَلَ بَيْتِيَ (me, my parents, believers)',
        objectAr: 'لي ولوالديَّ ولمن دخل بيتي (المفعول لأجله / متعلق الفعل)'
      },
      structure: 'Vocative + Imperative + Coordinated prepositional phrases (with relative clause) + حال',
      structureAr: 'نداء + أمر + جار ومجرور متعدد (مع صلة موصول) + حال'
    },

    keyGrammaticalConcepts: [
      {
        concept: 'Dual Noun + ياء المتكلم',
        conceptAr: 'المثنى مع ياء المتكلم',
        explanation: 'When ياء المتكلم attaches to a dual noun, the dual ن drops and the ي merges: والدَيْنِ + ي → والدَيَّ. The resulting يَّ has شدة.',
        explanationAr: 'عند اتصال ياء المتكلم بالمثنى، تحذف نون المثنى وتدغم الياءان: والدَيْنِ + ي ← والدَيَّ. الياء الناتجة مشددة'
      },
      {
        concept: 'Deleted ياء in Vocative',
        conceptAr: 'حذف ياء المتكلم في النداء',
        explanation: 'In Arabic, especially Quranic Arabic, ياء المتكلم is often deleted in vocative for lightness: يا رَبِّي → يا رَبِّ or just رَبِّ.',
        explanationAr: 'في العربية، خاصة القرآنية، كثيرًا ما تحذف ياء المتكلم في النداء للتخفيف: يا ربِّي ← يا ربِّ أو ربِّ فقط'
      },
      {
        concept: 'ن Deletion Rule with Possessive',
        conceptAr: 'حذف النون عند الإضافة',
        explanation: 'The dual ن (نون المثنى) and sound masculine plural ن (نون الجمع) drop when the noun becomes مضاف: مسلمون → مسلمو + ي → مسلميَّ.',
        explanationAr: 'نون المثنى ونون جمع المذكر السالم تحذف عند الإضافة: مسلمون ← مسلمو + ي ← مسلميَّ'
      },
      {
        concept: 'حال with Relative Clause',
        conceptAr: 'الحال مع جملة الصلة',
        explanation: 'مُؤْمِنًا is حال describing the state of the one who enters (فاعل دخل). It answers: "In what state does he enter?"',
        explanationAr: 'مُؤْمِنًا حال يصف حالة الداخل (فاعل دخل). يجيب: "في أي حالة يدخل؟"'
      }
    ],

    teachingNotes: 'This is Quran 71:28 (Surah Nuh). Key teaching points: (1) رَبِّ shows deleted ياء in vocative, (2) والدَيَّ demonstrates dual + ياء المتكلم pattern (ن drops, ي merges), (3) بيتي shows regular pattern for comparison. The three-level structure (self → parents → believers) is beautiful supplication rhetoric.',
    teachingNotesAr: 'هذه الآية من سورة نوح (٢٨). نقاط التعليم الرئيسية: (١) رَبِّ تظهر حذف الياء في النداء، (٢) والدَيَّ توضح نمط المثنى مع ياء المتكلم (تحذف النون وتدغم الياء)، (٣) بيتي تظهر النمط العادي للمقارنة. البنية الثلاثية (النفس ← الوالدين ← المؤمنين) من بلاغة الدعاء الجميلة.'
  },

  // Unit 11: Emphatic Phrases - Exercise 239 (Triple emphasis with oath)
  {
    exerciseId: 239,
    arabic: 'وَاللَّهِ لَيَنْصُرَنَّ اللَّهُ مَنْ يَنْصُرُهُ',
    translation: 'By Allah, Allah will surely help whoever helps Him',

    wordAnalysis: [
      {
        word: 'وَاللَّهِ',
        transliteration: 'wa-llāhi',
        grammaticalRole: 'Oath phrase (قَسَم)',
        grammaticalRoleAr: 'قَسَم - مُقسَم به مجرور',
        caseMarking: 'Genitive (جر) by واو القسم',
        caseMarkingAr: 'مجرور بواو القسم وعلامة جره الكسرة',
        wordType: 'واو القسم + لفظ الجلالة',
        wordTypeAr: 'حرف جر للقسم + اسم الله',
        notes: 'واو القسم is one of three oath particles (و، ب، ت)',
        notesAr: 'واو القسم من أحرف القسم الثلاثة (الواو، الباء، التاء)'
      },
      {
        word: 'لَيَنْصُرَنَّ',
        transliteration: 'la-yanṣuranna',
        grammaticalRole: 'Emphasized verb (جواب القسم)',
        grammaticalRoleAr: 'فعل مضارع مؤكد - جواب القسم',
        caseMarking: 'Built on فتح because of نون التوكيد الثقيلة',
        caseMarkingAr: 'مبني على الفتح لاتصاله بنون التوكيد الثقيلة',
        wordType: 'لام القسم + فعل مضارع + نون التوكيد',
        wordTypeAr: 'لام القسم + مضارع + نون التوكيد الثقيلة',
        notes: 'Triple emphasis: oath + لام + نون التوكيد',
        notesAr: 'توكيد ثلاثي: القسم + اللام + نون التوكيد'
      },
      {
        word: 'اللَّهُ',
        transliteration: 'Allāhu',
        grammaticalRole: 'Subject (فاعل)',
        grammaticalRoleAr: 'فاعل مرفوع',
        caseMarking: 'Nominative (رفع) - marked with ضمة',
        caseMarkingAr: 'مرفوع وعلامة رفعه الضمة الظاهرة',
        wordType: 'Proper noun (لفظ الجلالة)',
        wordTypeAr: 'اسم علم - لفظ الجلالة',
        notes: 'Subject of the verb يَنْصُرُ',
        notesAr: 'فاعل الفعل ينصر'
      },
      {
        word: 'مَنْ',
        transliteration: 'man',
        grammaticalRole: 'Object (مفعول به) - relative pronoun',
        grammaticalRoleAr: 'مفعول به - اسم موصول',
        caseMarking: 'In place of accusative',
        caseMarkingAr: 'في محل نصب مفعول به',
        wordType: 'Relative pronoun',
        wordTypeAr: 'اسم موصول',
        notes: 'مَن refers to "whoever" - relative usage',
        notesAr: 'مَن بمعنى "الذي" - استعمال موصولي'
      },
      {
        word: 'يَنْصُرُهُ',
        transliteration: 'yanṣuruhu',
        grammaticalRole: 'Verb in relative clause (صلة الموصول)',
        grammaticalRoleAr: 'فعل مضارع - صلة الموصول',
        caseMarking: 'Nominative (رفع) - marked with ضمة',
        caseMarkingAr: 'مرفوع وعلامة رفعه الضمة الظاهرة',
        wordType: 'Present tense verb + object pronoun',
        wordTypeAr: 'فعل مضارع + ضمير متصل مفعول به',
        notes: 'الهاء refers back to Allah',
        notesAr: 'الهاء ضمير يعود على لفظ الجلالة'
      }
    ],

    phraseAnalysis: [
      {
        phrase: 'وَاللَّهِ',
        phraseType: 'Oath phrase (جملة القسم)',
        phraseTypeAr: 'جملة قسم',
        function: 'Introduces emphatic oath',
        functionAr: 'يقدم القسم للتوكيد',
        notes: 'واو القسم makes what follows emphatic',
        notesAr: 'واو القسم تجعل ما بعدها مؤكدًا'
      },
      {
        phrase: 'لَيَنْصُرَنَّ',
        phraseType: 'Doubly emphasized verb',
        phraseTypeAr: 'فعل مؤكد مرتين',
        function: 'لام القسم + نون التوكيد both emphasize the verb',
        functionAr: 'لام القسم ونون التوكيد كلاهما يؤكدان الفعل',
        notes: 'This is maximum verbal emphasis in Arabic',
        notesAr: 'هذا أقصى توكيد للفعل في العربية'
      },
      {
        phrase: 'مَنْ يَنْصُرُهُ',
        phraseType: 'Relative clause (صلة الموصول)',
        phraseTypeAr: 'صلة الموصول',
        function: 'Defines who will be helped',
        functionAr: 'يحدد من سيُنصر',
        notes: 'Conditional meaning: whoever helps Allah',
        notesAr: 'معنى شرطي: من ينصر الله'
      }
    ],

    sentenceAnalysis: {
      sentenceType: 'Oath sentence with emphasized response (جملة قسمية مؤكدة)',
      sentenceTypeAr: 'جملة قسمية مع جواب مؤكد',
      mainComponents: {
        subject: 'اللَّهُ (Allah - subject of helping)',
        subjectAr: 'اللَّهُ (فاعل الفعل ينصر)',
        predicate: 'لَيَنْصُرَنَّ (will surely help)',
        predicateAr: 'لَيَنْصُرَنَّ (الفعل المؤكد)',
        object: 'مَنْ يَنْصُرُهُ (whoever helps Him)',
        objectAr: 'مَنْ يَنْصُرُهُ (المفعول به)'
      },
      structure: 'Oath (واو + مقسم به) + Emphasized verb (لام + فعل + نون) + Subject + Object clause',
      structureAr: 'قسم (واو + مقسم به) + فعل مؤكد (لام + فعل + نون) + فاعل + مفعول به (جملة موصولة)'
    },

    keyGrammaticalConcepts: [
      {
        concept: 'Triple Emphasis Structure',
        conceptAr: 'بنية التوكيد الثلاثي',
        explanation: 'This sentence has three layers of emphasis: (1) واو القسم introducing an oath, (2) لام القسم before the verb, (3) نون التوكيد الثقيلة attached to the verb. This is maximum emphasis in Arabic.',
        explanationAr: 'هذه الجملة فيها ثلاث طبقات من التوكيد: (١) واو القسم التي تقدم القسم، (٢) لام القسم قبل الفعل، (٣) نون التوكيد الثقيلة المتصلة بالفعل. هذا أقصى توكيد في العربية'
      },
      {
        concept: 'نون التوكيد الثقيلة',
        conceptAr: 'نون التوكيد الثقيلة',
        explanation: 'The heavy نون (ـنَّ) attaches to present tense verbs after لام القسم. The verb becomes مبني على الفتح (built on fat-ha) instead of معرب.',
        explanationAr: 'نون التوكيد الثقيلة (ـنَّ) تتصل بالفعل المضارع بعد لام القسم. يصبح الفعل مبنيًا على الفتح بدلًا من معربًا'
      },
      {
        concept: 'لام القسم vs لام الابتداء',
        conceptAr: 'لام القسم ولام الابتداء',
        explanation: 'لام القسم comes in the answer to an oath and is followed by emphasized verb. لام الابتداء comes with إنَّ and emphasizes nouns.',
        explanationAr: 'لام القسم تأتي في جواب القسم ويليها فعل مؤكد. لام الابتداء تأتي مع إنَّ وتؤكد الأسماء'
      }
    ],

    teachingNotes: 'This sentence demonstrates the maximum level of verbal emphasis in Arabic. The واو القسم initiates an oath, followed by لام القسم and نون التوكيد الثقيلة. Note how the verb يَنْصُرُ becomes لَيَنْصُرَنَّ when fully emphasized.',
    teachingNotesAr: 'هذه الجملة توضح أقصى مستوى من توكيد الفعل في العربية. واو القسم تبدأ القسم، تليها لام القسم ونون التوكيد الثقيلة. لاحظ كيف يصبح الفعل يَنْصُرُ ← لَيَنْصُرَنَّ عند التوكيد الكامل'
  },

  // Unit 11: Emphatic Phrases - Exercise 245 (عَيْن emphatic)
  {
    exerciseId: 245,
    arabic: 'جَاءَنِي الْخَبَرُ عَيْنُهُ مِنْ مَصْدَرٍ مَوْثُوقٍ',
    translation: 'The very same news came to me from a reliable source',

    wordAnalysis: [
      {
        word: 'جَاءَنِي',
        transliteration: 'jā\'anī',
        grammaticalRole: 'Verb + indirect object pronoun',
        grammaticalRoleAr: 'فعل ماضٍ + ضمير مفعول به',
        caseMarking: 'Built on فتحة (past tense)',
        caseMarkingAr: 'مبني على الفتح، والنون للوقاية، والياء ضمير مفعول به',
        wordType: 'Past tense verb Form I + نون الوقاية + ياء المتكلم',
        wordTypeAr: 'فعل ماضٍ من الباب الأول + نون الوقاية + ياء المتكلم',
        notes: 'جَاءَ + نِي = جَاءَنِي (نون الوقاية protects the verb)',
        notesAr: 'جاء + ني = جاءني (نون الوقاية تحمي الفعل من الكسر)'
      },
      {
        word: 'الْخَبَرُ',
        transliteration: 'al-khabaru',
        grammaticalRole: 'Subject (فاعل)',
        grammaticalRoleAr: 'فاعل مرفوع',
        caseMarking: 'Nominative (رفع) - marked with ضمة',
        caseMarkingAr: 'مرفوع وعلامة رفعه الضمة الظاهرة',
        wordType: 'Definite noun',
        wordTypeAr: 'اسم معرف بأل',
        notes: 'The news - subject of the verb جَاءَ',
        notesAr: 'الخبر - فاعل الفعل جاء'
      },
      {
        word: 'عَيْنُهُ',
        transliteration: '\'aynuhu',
        grammaticalRole: 'Emphatic apposition (توكيد معنوي)',
        grammaticalRoleAr: 'توكيد معنوي مرفوع',
        caseMarking: 'Nominative (رفع) - follows الْخَبَرُ in case',
        caseMarkingAr: 'مرفوع وعلامة رفعه الضمة تبعًا للمؤكَّد',
        wordType: 'Emphatic noun + possessive pronoun',
        wordTypeAr: 'اسم توكيد معنوي + ضمير متصل',
        notes: 'عَيْن = "the very same/itself" - must have matching pronoun',
        notesAr: 'عين = "بعينه/نفسه" - يجب أن يتصل بضمير يعود على المؤكَّد'
      },
      {
        word: 'مِنْ',
        transliteration: 'min',
        grammaticalRole: 'Preposition (حرف جر)',
        grammaticalRoleAr: 'حرف جر',
        caseMarking: 'No case marking (particles)',
        caseMarkingAr: 'لا محل له من الإعراب',
        wordType: 'Preposition of source',
        wordTypeAr: 'حرف جر للابتداء/المصدر',
        notes: 'من here indicates source/origin',
        notesAr: 'من هنا تفيد الابتداء/المصدر'
      },
      {
        word: 'مَصْدَرٍ',
        transliteration: 'maṣdarin',
        grammaticalRole: 'Object of preposition (مجرور)',
        grammaticalRoleAr: 'اسم مجرور بـ من',
        caseMarking: 'Genitive (جر) - marked with كسرة + تنوين',
        caseMarkingAr: 'مجرور وعلامة جره الكسرة مع التنوين',
        wordType: 'Indefinite noun (place noun)',
        wordTypeAr: 'اسم نكرة - اسم مكان',
        notes: 'Source - from the pattern مَفْعَل',
        notesAr: 'مصدر - على وزن مَفْعَل'
      },
      {
        word: 'مَوْثُوقٍ',
        transliteration: 'mawthūqin',
        grammaticalRole: 'Adjective (نعت/صفة)',
        grammaticalRoleAr: 'نعت مجرور',
        caseMarking: 'Genitive (جر) - follows مَصْدَرٍ',
        caseMarkingAr: 'مجرور وعلامة جره الكسرة تبعًا للمنعوت',
        wordType: 'Passive participle from Form II',
        wordTypeAr: 'اسم مفعول من الباب الثاني (وَثَّقَ)',
        notes: 'Reliable/trusted - pattern مَفْعُول',
        notesAr: 'موثوق - من وَثَّقَ يُوَثِّقُ'
      }
    ],

    phraseAnalysis: [
      {
        phrase: 'الْخَبَرُ عَيْنُهُ',
        phraseType: 'Noun + emphatic apposition (مؤكَّد + توكيد)',
        phraseTypeAr: 'مؤكَّد وتوكيد معنوي',
        function: 'Emphasizes that it is specifically this news, no other',
        functionAr: 'يؤكد أنه هذا الخبر بعينه، لا غيره',
        notes: 'عَيْن is one of the emphatic nouns (ألفاظ التوكيد المعنوي)',
        notesAr: 'عَيْن من ألفاظ التوكيد المعنوي (نفس، عين، كلا، كلتا، كل، جميع)'
      },
      {
        phrase: 'مِنْ مَصْدَرٍ مَوْثُوقٍ',
        phraseType: 'Prepositional phrase (جار ومجرور)',
        phraseTypeAr: 'جار ومجرور + نعت',
        function: 'Adverbial - describes the source of the news',
        functionAr: 'متعلق بالفعل - يصف مصدر الخبر',
        notes: 'مَوْثُوق is an adjective describing مَصْدَر',
        notesAr: 'موثوق صفة لمصدر'
      }
    ],

    sentenceAnalysis: {
      sentenceType: 'Verbal sentence with emphatic apposition (جملة فعلية مع توكيد)',
      sentenceTypeAr: 'جملة فعلية مع توكيد معنوي',
      mainComponents: {
        subject: 'الْخَبَرُ عَيْنُهُ (the very same news)',
        subjectAr: 'الْخَبَرُ عَيْنُهُ (الفاعل مع توكيده)',
        predicate: 'جَاءَنِي (came to me)',
        predicateAr: 'جَاءَنِي (الفعل مع مفعوله)',
        object: 'ي in جَاءَنِي (me - indirect object)',
        objectAr: 'الياء في جَاءَنِي (ضمير المفعول به)'
      },
      structure: 'Verb + Object pronoun + Subject + Emphatic apposition + Adverbial phrase',
      structureAr: 'فعل + ضمير مفعول + فاعل + توكيد معنوي + جار ومجرور'
    },

    keyGrammaticalConcepts: [
      {
        concept: 'التوكيد المعنوي (Semantic Emphasis)',
        conceptAr: 'التوكيد المعنوي',
        explanation: 'عَيْن and نَفْس are emphatic nouns that mean "the very same" or "itself". They must be followed by a pronoun that refers back to the emphasized noun and matches it in number and gender.',
        explanationAr: 'عَيْن ونَفْس من ألفاظ التوكيد المعنوي بمعنى "بعينه/نفسه". يجب أن يتصل بها ضمير يعود على المؤكَّد ويطابقه في العدد والجنس'
      },
      {
        concept: 'Case Agreement in Emphasis',
        conceptAr: 'مطابقة التوكيد للمؤكَّد',
        explanation: 'The emphatic noun (عَيْن، نَفْس) must match the emphasized noun in case: الخبرُ عينُه (nominative), الخبرَ عينَه (accusative), الخبرِ عينِه (genitive).',
        explanationAr: 'يجب أن يطابق التوكيد المؤكَّد في الإعراب: الخبرُ عينُه (رفع)، الخبرَ عينَه (نصب)، الخبرِ عينِه (جر)'
      },
      {
        concept: 'نون الوقاية',
        conceptAr: 'نون الوقاية',
        explanation: 'نون الوقاية is inserted between a verb and ياء المتكلم to protect the verb from taking كسرة: جَاءَ + ي → جَاءَنِي (not جَاءِي).',
        explanationAr: 'نون الوقاية تُدخل بين الفعل وياء المتكلم لحماية الفعل من الكسر: جَاءَ + ي ← جَاءَنِي (لا جَاءِي)'
      }
    ],

    teachingNotes: 'This example shows التوكيد المعنوي using عَيْن. Note that عَيْنُهُ follows الْخَبَرُ in case (both nominative). The emphatic pronoun هُ refers back to الخبر. Compare with نَفْسُهُ which has the same function.',
    teachingNotesAr: 'هذا المثال يوضح التوكيد المعنوي باستخدام عَيْن. لاحظ أن عَيْنُهُ يتبع الْخَبَرُ في الإعراب (كلاهما مرفوع). الضمير هُ يعود على الخبر. قارن مع نَفْسُهُ التي لها نفس الوظيفة'
  },

  // Unit 11: Emphatic Phrases - Exercise 254 (Triple Quranic emphasis)
  {
    exerciseId: 254,
    arabic: 'إِنَّ هَذَا لَهُوَ الْقَصَصُ الْحَقُّ',
    translation: 'Indeed, this is the true narrative',

    wordAnalysis: [
      {
        word: 'إِنَّ',
        transliteration: 'inna',
        grammaticalRole: 'Emphatic particle (ناسخ)',
        grammaticalRoleAr: 'حرف توكيد ونصب',
        caseMarking: 'No case marking (particle)',
        caseMarkingAr: 'لا محل له من الإعراب',
        wordType: 'Emphatic particle from إنَّ وأخواتها',
        wordTypeAr: 'حرف مشبه بالفعل من إنَّ وأخواتها',
        notes: 'First layer of emphasis',
        notesAr: 'الطبقة الأولى من التوكيد'
      },
      {
        word: 'هَذَا',
        transliteration: 'hādhā',
        grammaticalRole: 'Subject of إنَّ (اسم إنَّ)',
        grammaticalRoleAr: 'اسم إنَّ منصوب',
        caseMarking: 'Accusative - in place of نصب (مبني)',
        caseMarkingAr: 'في محل نصب اسم إنَّ (مبني على السكون)',
        wordType: 'Demonstrative pronoun',
        wordTypeAr: 'اسم إشارة للقريب',
        notes: 'This - demonstrative for near objects',
        notesAr: 'هذا - اسم إشارة للمفرد المذكر القريب'
      },
      {
        word: 'لَهُوَ',
        transliteration: 'la-huwa',
        grammaticalRole: 'لام التوكيد + ضمير الفصل',
        grammaticalRoleAr: 'اللام المزحلقة + ضمير فصل',
        caseMarking: 'No case marking (particles/pronouns of separation)',
        caseMarkingAr: 'اللام لا محل لها، وهُوَ ضمير فصل لا محل له',
        wordType: 'Emphatic لام + separating pronoun',
        wordTypeAr: 'لام مزحلقة + ضمير فصل',
        notes: 'Second + third layers of emphasis',
        notesAr: 'الطبقة الثانية والثالثة من التوكيد'
      },
      {
        word: 'الْقَصَصُ',
        transliteration: 'al-qaṣaṣu',
        grammaticalRole: 'Predicate of إنَّ (خبر إنَّ)',
        grammaticalRoleAr: 'خبر إنَّ مرفوع',
        caseMarking: 'Nominative (رفع) - marked with ضمة',
        caseMarkingAr: 'مرفوع وعلامة رفعه الضمة الظاهرة',
        wordType: 'Definite noun (masdar from قَصَّ)',
        wordTypeAr: 'اسم معرف بأل - مصدر من قَصَّ',
        notes: 'The narrative/story - verbal noun',
        notesAr: 'القصص - مصدر بمعنى الحكاية'
      },
      {
        word: 'الْحَقُّ',
        transliteration: 'al-ḥaqqu',
        grammaticalRole: 'Adjective (صفة/نعت)',
        grammaticalRoleAr: 'نعت مرفوع',
        caseMarking: 'Nominative (رفع) - follows الْقَصَصُ',
        caseMarkingAr: 'مرفوع وعلامة رفعه الضمة تبعًا للمنعوت',
        wordType: 'Definite adjective',
        wordTypeAr: 'صفة معرفة بأل',
        notes: 'The true - describes القصص',
        notesAr: 'الحق - صفة للقصص'
      }
    ],

    phraseAnalysis: [
      {
        phrase: 'إِنَّ هَذَا',
        phraseType: 'إنَّ + Subject (اسم إنَّ)',
        phraseTypeAr: 'إنَّ واسمها',
        function: 'First emphatic construction',
        functionAr: 'البناء التوكيدي الأول',
        notes: 'إنَّ emphasizes the entire sentence',
        notesAr: 'إنَّ تؤكد الجملة كلها'
      },
      {
        phrase: 'لَهُوَ',
        phraseType: 'Double emphatic particle',
        phraseTypeAr: 'توكيد مزدوج',
        function: 'اللام المزحلقة emphasizes predicate, هُوَ separates and emphasizes',
        functionAr: 'اللام المزحلقة تؤكد الخبر، وهُوَ ضمير فصل يفصل ويؤكد',
        notes: 'This combination is characteristic of Quranic Arabic',
        notesAr: 'هذا التركيب من خصائص العربية القرآنية'
      },
      {
        phrase: 'الْقَصَصُ الْحَقُّ',
        phraseType: 'Noun + Adjective (موصوف + صفة)',
        phraseTypeAr: 'موصوف وصفة',
        function: 'Predicate with emphasis',
        functionAr: 'الخبر مع صفته',
        notes: 'Both are definite and nominative',
        notesAr: 'كلاهما معرف ومرفوع'
      }
    ],

    sentenceAnalysis: {
      sentenceType: 'Nominal sentence with triple emphasis (جملة اسمية مؤكدة ثلاثيًا)',
      sentenceTypeAr: 'جملة اسمية منسوخة بـ إنَّ مع توكيد ثلاثي',
      mainComponents: {
        subject: 'هَذَا (this)',
        subjectAr: 'هَذَا (اسم إنَّ)',
        predicate: 'الْقَصَصُ الْحَقُّ (the true narrative)',
        predicateAr: 'الْقَصَصُ الْحَقُّ (خبر إنَّ مع صفته)'
      },
      structure: 'إنَّ + Subject + لام المزحلقة + ضمير الفصل + Predicate + Adjective',
      structureAr: 'إنَّ + اسمها + لام مزحلقة + ضمير فصل + خبرها + صفة'
    },

    keyGrammaticalConcepts: [
      {
        concept: 'Triple Nominal Emphasis',
        conceptAr: 'التوكيد الاسمي الثلاثي',
        explanation: 'This verse has three emphatic elements: (1) إنَّ emphasizing the sentence, (2) اللام المزحلقة emphasizing the predicate, (3) ضمير الفصل (هُوَ) separating subject and predicate for clarity and emphasis.',
        explanationAr: 'هذه الآية فيها ثلاثة عناصر توكيدية: (١) إنَّ تؤكد الجملة، (٢) اللام المزحلقة تؤكد الخبر، (٣) ضمير الفصل (هُوَ) يفصل بين المبتدأ والخبر للوضوح والتوكيد'
      },
      {
        concept: 'اللام المزحلقة',
        conceptAr: 'اللام المزحلقة',
        explanation: 'When لام التوكيد would come on اسم إنَّ, it "slides" (تَزْحَلَق) to the predicate instead. So we say إنَّ زيدًا لَقائمٌ not إنَّ لَزيدًا قائمٌ.',
        explanationAr: 'عندما تأتي لام التوكيد على اسم إنَّ، "تزحلق" إلى الخبر بدلًا منه. فنقول: إنَّ زيدًا لَقائمٌ، لا: إنَّ لَزيدًا قائمٌ'
      },
      {
        concept: 'ضمير الفصل',
        conceptAr: 'ضمير الفصل',
        explanation: 'ضمير الفصل (هُوَ، هِيَ، هُم، etc.) separates subject from predicate, preventing the predicate from being read as an adjective. It also adds emphasis. Here لَهُوَ = اللام + هُوَ.',
        explanationAr: 'ضمير الفصل (هُوَ، هِيَ، هُم، إلخ) يفصل بين المبتدأ والخبر، يمنع قراءة الخبر كصفة. ويضيف التوكيد أيضًا. هنا لَهُوَ = اللام + هُوَ'
      },
      {
        concept: 'Quranic Emphasis Style',
        conceptAr: 'أسلوب التوكيد القرآني',
        explanation: 'The Quran frequently uses multiple layers of emphasis together. This verse (3:62) uses all three nominal emphatic devices to stress the truth of the narrative about Jesus.',
        explanationAr: 'القرآن يستخدم طبقات متعددة من التوكيد معًا كثيرًا. هذه الآية (آل عمران ٦٢) تستخدم كل أدوات التوكيد الاسمي الثلاث لتأكيد صدق القصة عن عيسى'
      }
    ],

    teachingNotes: 'This is Quran 3:62 (Surah Al-Imran). It demonstrates maximum nominal emphasis in Arabic with three layers: إنَّ + اللام المزحلقة + ضمير الفصل. Compare with the verbal emphasis (oath + لام + نون) in exercise 239 to show students both emphatic systems.',
    teachingNotesAr: 'هذه الآية من سورة آل عمران (٦٢). توضح أقصى توكيد اسمي في العربية بثلاث طبقات: إنَّ + اللام المزحلقة + ضمير الفصل. قارن مع التوكيد الفعلي (قسم + لام + نون) في التمرين ٢٣٩ لتوضيح كلا نظامي التوكيد للطلاب'
  },

  // Unit 11: أسلوب القصر - Exercise 257 (لا إله إلا الله)
  {
    exerciseId: 257,
    arabic: 'لَا إِلَهَ إِلَّا اللَّهُ',
    translation: 'There is no god but Allah',

    wordAnalysis: [
      {
        word: 'لَا',
        transliteration: 'lā',
        grammaticalRole: 'لا النافية للجنس',
        grammaticalRoleAr: 'لا النافية للجنس (تعمل عمل إنَّ)',
        caseMarking: 'No case marking (particle)',
        caseMarkingAr: 'لا محل لها من الإعراب',
        wordType: 'Particle that negates an entire genus',
        wordTypeAr: 'حرف لنفي الجنس',
        notes: 'Negates all members of a category absolutely',
        notesAr: 'تنفي جميع أفراد الجنس نفيًا قاطعًا'
      },
      {
        word: 'إِلَهَ',
        transliteration: 'ilāha',
        grammaticalRole: 'اسم لا النافية للجنس',
        grammaticalRoleAr: 'اسم لا مبني على الفتح في محل نصب',
        caseMarking: 'Built on fat-ha (in place of accusative)',
        caseMarkingAr: 'مبني على الفتح لأنه مفرد نكرة',
        wordType: 'Indefinite singular noun',
        wordTypeAr: 'اسم نكرة مفرد',
        notes: 'The genus being negated - all gods',
        notesAr: 'الجنس المنفي - جميع الآلهة'
      },
      {
        word: 'إِلَّا',
        transliteration: 'illā',
        grammaticalRole: 'أداة استثناء',
        grammaticalRoleAr: 'أداة حصر واستثناء',
        caseMarking: 'No case marking (particle)',
        caseMarkingAr: 'لا محل لها من الإعراب',
        wordType: 'Exception particle',
        wordTypeAr: 'أداة استثناء',
        notes: 'Creates restriction (قصر) - only Allah is excepted',
        notesAr: 'تُحدث القصر - الله وحده مستثنى'
      },
      {
        word: 'اللَّهُ',
        transliteration: 'Allāhu',
        grammaticalRole: 'بدل من اسم لا (أو مستثنى مرفوع)',
        grammaticalRoleAr: 'بدل مرفوع من محل اسم لا، أو مستثنى في استثناء مفرغ',
        caseMarking: 'Nominative (رفع) - marked with ضمة',
        caseMarkingAr: 'مرفوع وعلامة رفعه الضمة الظاهرة',
        wordType: 'Proper noun (لفظ الجلالة)',
        wordTypeAr: 'اسم علم - لفظ الجلالة',
        notes: 'The only true deity - affirmed after negation',
        notesAr: 'المعبود الحق الوحيد - مثبت بعد النفي'
      }
    ],

    phraseAnalysis: [
      {
        phrase: 'لَا إِلَهَ',
        phraseType: 'لا النافية للجنس + اسمها',
        phraseTypeAr: 'جملة لا النافية للجنس',
        function: 'Negates all deities absolutely',
        functionAr: 'تنفي جميع الآلهة نفيًا مطلقًا',
        notes: 'خبر لا محذوف تقديره: موجود أو معبود بحق',
        notesAr: 'الخبر محذوف تقديره: موجود أو حق أو معبود بحق'
      },
      {
        phrase: 'إِلَّا اللَّهُ',
        phraseType: 'استثناء مفرغ',
        phraseTypeAr: 'استثناء مفرغ (الكلام غير تام منفي)',
        function: 'Restricts divinity to Allah alone',
        functionAr: 'يقصر الألوهية على الله وحده',
        notes: 'This is the strongest form of قصر in Arabic',
        notesAr: 'هذا أقوى أنواع القصر في العربية'
      }
    ],

    sentenceAnalysis: {
      sentenceType: 'Nominal sentence with لا النافية للجنس + exception',
      sentenceTypeAr: 'جملة اسمية منفية بلا النافية للجنس مع استثناء مفرغ',
      mainComponents: {
        subject: 'إِلَهَ (god - negated genus)',
        subjectAr: 'إِلَهَ (الجنس المنفي - اسم لا)',
        predicate: '(محذوف: موجود/حق)',
        predicateAr: 'خبر لا محذوف تقديره: موجود أو حق',
        object: 'اللَّهُ (the excepted - affirmed)',
        objectAr: 'اللَّهُ (المستثنى المرفوع - المثبت)'
      },
      structure: 'لا النافية للجنس + اسمها (مبني) + خبر محذوف + إلا + مستثنى مرفوع',
      structureAr: 'لا + اسم لا + (خبر محذوف) + إلا + بدل/مستثنى'
    },

    keyGrammaticalConcepts: [
      {
        concept: 'لا النافية للجنس',
        conceptAr: 'لا النافية للجنس',
        explanation: 'This لا negates the entire genus absolutely. It works like إنَّ (puts its subject in accusative). When the noun is singular indefinite, it is مبني على الفتح.',
        explanationAr: 'هذه لا تنفي الجنس كله نفيًا قاطعًا. تعمل عمل إنَّ (تنصب اسمها). إذا كان اسمها مفردًا نكرة يُبنى على الفتح'
      },
      {
        concept: 'أسلوب القصر بـ لا...إلا',
        conceptAr: 'أسلوب القصر بالنفي والاستثناء',
        explanation: 'This is the strongest restriction style. It first negates all, then excepts one. لا إله إلا الله = divinity is restricted to Allah alone (نفي + إثبات).',
        explanationAr: 'هذا أقوى أسلوب قصر. ينفي أولًا الجميع، ثم يستثني واحدًا. لا إله إلا الله = الألوهية مقصورة على الله وحده (نفي ثم إثبات)'
      },
      {
        concept: 'الاستثناء المفرغ',
        conceptAr: 'الاستثناء المفرغ',
        explanation: 'When the clause before إلا is incomplete/negative, the word after إلا takes the case required by its grammatical role (here: subject → nominative). This is called استثناء مفرغ.',
        explanationAr: 'إذا كان الكلام قبل إلا ناقصًا منفيًا، يأخذ ما بعد إلا الإعراب المناسب لموقعه (هنا: بدل من محل اسم لا → مرفوع). يسمى استثناء مفرغًا'
      }
    ],

    teachingNotes: 'This is the Islamic testimony of faith (الشهادة). Grammatically, it demonstrates the strongest form of قصر using لا النافية للجنس + إلا. The structure: total negation (لا إله) + exception (إلا الله) = affirmation of one. خبر لا is implied (موجود/حق).',
    teachingNotesAr: 'هذه كلمة التوحيد (الشهادة). نحويًا توضح أقوى أشكال القصر باستخدام لا النافية للجنس + إلا. البنية: نفي كلي (لا إله) + استثناء (إلا الله) = إثبات لواحد. خبر لا محذوف تقديره موجود أو حق'
  },

  // Unit 11: تأكيد النفي - Exercise 282 (Triple negation in Hajj)
  {
    exerciseId: 282,
    arabic: 'فَلَا رَفَثَ وَلَا فُسُوقَ وَلَا جِدَالَ فِي الْحَجِّ',
    translation: 'No sexual relations, no disobedience, no disputing during Hajj',

    wordAnalysis: [
      {
        word: 'فَلَا',
        transliteration: 'fa-lā',
        grammaticalRole: 'فاء الفصيحة + لا النافية للجنس',
        grammaticalRoleAr: 'الفاء فصيحة + لا النافية للجنس',
        caseMarking: 'No case marking (particles)',
        caseMarkingAr: 'لا محل لهما من الإعراب',
        wordType: 'Explanatory فاء + genus-negating لا',
        wordTypeAr: 'فاء فصيحة + لا نافية للجنس',
        notes: 'فاء introduces the consequence of undertaking Hajj',
        notesAr: 'الفاء تدخل على نتيجة الإحرام بالحج'
      },
      {
        word: 'رَفَثَ',
        transliteration: 'rafatha',
        grammaticalRole: 'اسم لا النافية للجنس',
        grammaticalRoleAr: 'اسم لا مبني على الفتح في محل نصب',
        caseMarking: 'Built on fat-ha (singular indefinite)',
        caseMarkingAr: 'مبني على الفتح لأنه مفرد نكرة',
        wordType: 'Masdar - sexual talk/relations',
        wordTypeAr: 'مصدر بمعنى الجماع أو الكلام الفاحش',
        notes: 'First prohibited act - sexual relations',
        notesAr: 'الفعل المحرم الأول - الجماع'
      },
      {
        word: 'وَلَا',
        transliteration: 'wa-lā',
        grammaticalRole: 'واو العطف + لا النافية للجنس (مكررة)',
        grammaticalRoleAr: 'واو العطف + لا مكررة للتوكيد',
        caseMarking: 'No case marking (particles)',
        caseMarkingAr: 'لا محل لهما من الإعراب',
        wordType: 'Conjunction + repeated negation',
        wordTypeAr: 'عطف + تكرار لا للتوكيد',
        notes: 'لا repeated for emphasis on each prohibition',
        notesAr: 'تكرار لا يؤكد كل تحريم على حدة'
      },
      {
        word: 'فُسُوقَ',
        transliteration: 'fusūqa',
        grammaticalRole: 'اسم لا النافية للجنس (معطوف)',
        grammaticalRoleAr: 'اسم لا مبني على الفتح معطوف',
        caseMarking: 'Built on fat-ha',
        caseMarkingAr: 'مبني على الفتح',
        wordType: 'Masdar - disobedience/sin',
        wordTypeAr: 'مصدر بمعنى المعصية والخروج عن الطاعة',
        notes: 'Second prohibited act - sins',
        notesAr: 'الفعل المحرم الثاني - المعاصي'
      },
      {
        word: 'وَلَا',
        transliteration: 'wa-lā',
        grammaticalRole: 'واو العطف + لا النافية للجنس (مكررة)',
        grammaticalRoleAr: 'واو العطف + لا مكررة للتوكيد',
        caseMarking: 'No case marking',
        caseMarkingAr: 'لا محل لهما من الإعراب',
        wordType: 'Third repetition of negation',
        wordTypeAr: 'التكرار الثالث للا',
        notes: 'Triple negation = emphatic prohibition',
        notesAr: 'النفي الثلاثي = تحريم مؤكد'
      },
      {
        word: 'جِدَالَ',
        transliteration: 'jidāla',
        grammaticalRole: 'اسم لا النافية للجنس (معطوف)',
        grammaticalRoleAr: 'اسم لا مبني على الفتح معطوف',
        caseMarking: 'Built on fat-ha',
        caseMarkingAr: 'مبني على الفتح',
        wordType: 'Masdar - argumentation/disputing',
        wordTypeAr: 'مصدر بمعنى المخاصمة والمماراة',
        notes: 'Third prohibited act - arguing',
        notesAr: 'الفعل المحرم الثالث - الجدال'
      },
      {
        word: 'فِي الْحَجِّ',
        transliteration: 'fī al-ḥajji',
        grammaticalRole: 'جار ومجرور (متعلق بمحذوف خبر لا)',
        grammaticalRoleAr: 'جار ومجرور متعلق بخبر لا المحذوف',
        caseMarking: 'Genitive (جر) by في',
        caseMarkingAr: 'مجرور بفي وعلامة جره الكسرة',
        wordType: 'Prepositional phrase (circumstance)',
        wordTypeAr: 'شبه جملة تحدد زمان/ظرف التحريم',
        notes: 'Specifies when these prohibitions apply',
        notesAr: 'يحدد وقت سريان التحريم - في الحج'
      }
    ],

    phraseAnalysis: [
      {
        phrase: 'فَلَا رَفَثَ',
        phraseType: 'لا النافية للجنس + اسمها',
        phraseTypeAr: 'جملة لا النافية للجنس الأولى',
        function: 'Absolutely prohibits sexual relations',
        functionAr: 'تنفي الرفث نفيًا قاطعًا (= تحريم مطلق)',
        notes: 'First of three parallel prohibitions',
        notesAr: 'أول ثلاثة تحريمات متوازية'
      },
      {
        phrase: 'وَلَا فُسُوقَ وَلَا جِدَالَ',
        phraseType: 'عطف مع تكرار لا',
        phraseTypeAr: 'معطوفان مع تكرار لا للتوكيد',
        function: 'Each prohibition emphasized separately',
        functionAr: 'كل تحريم مؤكد على حدة بتكرار لا',
        notes: 'Repetition of لا emphasizes each prohibition',
        notesAr: 'تكرار لا يؤكد كل تحريم منفردًا'
      },
      {
        phrase: 'فِي الْحَجِّ',
        phraseType: 'جار ومجرور (ظرفي)',
        phraseTypeAr: 'شبه جملة متعلق بالخبر المحذوف',
        function: 'Limits prohibitions to Hajj period',
        functionAr: 'يحدد وقت التحريم بفترة الحج',
        notes: 'The implied خبر is: كائن أو مقبول',
        notesAr: 'الخبر المحذوف تقديره: كائن أو موجود أو مقبول'
      }
    ],

    sentenceAnalysis: {
      sentenceType: 'Triple لا النافية للجنس construction',
      sentenceTypeAr: 'ثلاث جمل لا النافية للجنس معطوفة',
      mainComponents: {
        subject: 'رَفَثَ، فُسُوقَ، جِدَالَ (three prohibited acts)',
        subjectAr: 'رفث، فسوق، جدال (ثلاثة أفعال محرمة)',
        predicate: '(محذوف: كائن/موجود) فِي الْحَجِّ',
        predicateAr: 'خبر لا محذوف تقديره كائن أو موجود، في الحج متعلق به'
      },
      structure: 'فاء فصيحة + [لا + اسم + خبر محذوف] × 3 معطوفة + ظرف',
      structureAr: 'ف + لا رفثَ (كائن) + ولا فسوقَ (كائن) + ولا جدالَ (كائن) + في الحج'
    },

    keyGrammaticalConcepts: [
      {
        concept: 'تكرار لا للتوكيد',
        conceptAr: 'تكرار لا النافية للجنس للتوكيد',
        explanation: 'When لا النافية للجنس is repeated before each coordinated noun, it emphasizes that each prohibition is absolute and independent. This is stronger than saying فلا رفثَ وفسوقَ وجدالَ.',
        explanationAr: 'عند تكرار لا قبل كل اسم معطوف، يؤكد أن كل تحريم مطلق ومستقل. هذا أقوى من قول: فلا رفثَ وفسوقَ وجدالَ (بدون تكرار لا)'
      },
      {
        concept: 'حذف خبر لا النافية للجنس',
        conceptAr: 'حذف خبر لا النافية للجنس',
        explanation: 'The predicate of لا is commonly omitted when understood. Here, كائن/موجود/مقبول is implied: "there is no rafath (existing/acceptable) in Hajj."',
        explanationAr: 'خبر لا يُحذف كثيرًا إذا كان مفهومًا. هنا يُقدر: كائن أو موجود أو مقبول: "لا رفثَ (كائنٌ/مقبولٌ) في الحج"'
      },
      {
        concept: 'النفي كأسلوب تحريم',
        conceptAr: 'النفي للتحريم (نفي بمعنى النهي)',
        explanation: 'The negation here is not informative but legislative (إنشائي). "There is no rafath" means "rafath is prohibited" (لا رفث = لا ترفثوا). This is common in Quranic legislation.',
        explanationAr: 'النفي هنا ليس إخباريًا بل إنشائيًا تشريعيًا. "لا رفث" تعني "الرفث محرم" (لا رفث = لا ترفثوا). هذا شائع في التشريع القرآني'
      }
    ],

    teachingNotes: 'This is Quran 2:197. It demonstrates triple emphasis through repetition of لا النافية للجنس. Key points: (1) لا is repeated before each noun for maximum emphasis, (2) all three nouns are مبني على الفتح as singular indefinites, (3) the predicate is implied, (4) negation here means prohibition (إنشائي).',
    teachingNotesAr: 'هذه الآية من سورة البقرة (١٩٧). توضح التوكيد الثلاثي بتكرار لا النافية للجنس. النقاط الرئيسية: (١) لا مكررة قبل كل اسم لأقصى توكيد، (٢) الأسماء الثلاثة مبنية على الفتح لأنها مفردة نكرة، (٣) الخبر محذوف، (٤) النفي هنا بمعنى التحريم (إنشائي لا خبري)'
  },

  // Unit 11: التراكيب المركبة - Exercise 289 (Quadruple emphasis)
  {
    exerciseId: 289,
    arabic: 'إِنَّمَا الْمُنْتَصِرُ حَقًّا هُوَ نَفْسُهُ مَنْ يَغْلِبُ هَوَاهُ',
    translation: 'The true victor is only he himself who conquers his desires',

    wordAnalysis: [
      {
        word: 'إِنَّمَا',
        transliteration: 'innamā',
        grammaticalRole: 'أداة حصر وقصر',
        grammaticalRoleAr: 'كافة ومكفوفة للحصر (إنَّ + ما الكافة)',
        caseMarking: 'No case marking (particle)',
        caseMarkingAr: 'لا محل لها من الإعراب',
        wordType: 'Restriction particle (إنَّ + ما الكافة)',
        wordTypeAr: 'أداة حصر وتوكيد',
        notes: 'First emphatic element - restricts victory definition',
        notesAr: 'العنصر التوكيدي الأول - يقصر معنى الانتصار'
      },
      {
        word: 'الْمُنْتَصِرُ',
        transliteration: 'al-muntaṣiru',
        grammaticalRole: 'مبتدأ مرفوع',
        grammaticalRoleAr: 'مبتدأ مرفوع وعلامة رفعه الضمة',
        caseMarking: 'Nominative (رفع) - marked with ضمة',
        caseMarkingAr: 'مرفوع وعلامة رفعه الضمة الظاهرة',
        wordType: 'Active participle Form VIII (from نصر)',
        wordTypeAr: 'اسم فاعل من الباب الثامن - انتصر',
        notes: 'Subject - the one being defined as true victor',
        notesAr: 'المبتدأ - المُعرَّف بأنه المنتصر الحقيقي'
      },
      {
        word: 'حَقًّا',
        transliteration: 'ḥaqqan',
        grammaticalRole: 'مفعول مطلق مؤكد للمعنى',
        grammaticalRoleAr: 'مفعول مطلق لفعل محذوف، أو حال مؤكدة',
        caseMarking: 'Accusative (نصب) - marked with فتحة + tanween',
        caseMarkingAr: 'منصوب وعلامة نصبه الفتحة مع التنوين',
        wordType: 'Masdar used as مفعول مطلق',
        wordTypeAr: 'مصدر استُخدم للتوكيد',
        notes: 'Second emphatic element - intensifies the statement',
        notesAr: 'العنصر التوكيدي الثاني - يقوي الكلام'
      },
      {
        word: 'هُوَ',
        transliteration: 'huwa',
        grammaticalRole: 'ضمير فصل',
        grammaticalRoleAr: 'ضمير فصل لا محل له من الإعراب',
        caseMarking: 'No case marking (separation pronoun)',
        caseMarkingAr: 'لا محل له من الإعراب',
        wordType: 'Separation pronoun for emphasis',
        wordTypeAr: 'ضمير فصل للتوكيد والفصل',
        notes: 'Third emphatic element - separates and emphasizes',
        notesAr: 'العنصر التوكيدي الثالث - يفصل ويؤكد'
      },
      {
        word: 'نَفْسُهُ',
        transliteration: 'nafsuhu',
        grammaticalRole: 'توكيد معنوي للمبتدأ',
        grammaticalRoleAr: 'توكيد معنوي مرفوع تبعًا للمبتدأ',
        caseMarking: 'Nominative (رفع) - follows المنتصر',
        caseMarkingAr: 'مرفوع وعلامة رفعه الضمة',
        wordType: 'Emphatic noun (نفس) + pronoun',
        wordTypeAr: 'لفظ توكيد معنوي + ضمير متصل',
        notes: 'Fourth emphatic element - "himself"',
        notesAr: 'العنصر التوكيدي الرابع - "هو بذاته"'
      },
      {
        word: 'مَنْ',
        transliteration: 'man',
        grammaticalRole: 'خبر المبتدأ (اسم موصول)',
        grammaticalRoleAr: 'خبر المبتدأ - اسم موصول في محل رفع',
        caseMarking: 'In place of nominative (as خبر)',
        caseMarkingAr: 'في محل رفع خبر المبتدأ',
        wordType: 'Relative pronoun',
        wordTypeAr: 'اسم موصول بمعنى "الذي"',
        notes: 'Introduces the defining characteristic',
        notesAr: 'يقدم الصفة المُعرِّفة للمنتصر'
      },
      {
        word: 'يَغْلِبُ',
        transliteration: 'yaghlibu',
        grammaticalRole: 'فعل صلة الموصول',
        grammaticalRoleAr: 'فعل مضارع - صلة الموصول',
        caseMarking: 'Nominative (رفع) - marked with ضمة',
        caseMarkingAr: 'مرفوع وعلامة رفعه الضمة الظاهرة',
        wordType: 'Present tense verb Form I',
        wordTypeAr: 'فعل مضارع من الباب الأول',
        notes: 'Action that defines the true victor',
        notesAr: 'الفعل الذي يُعرِّف المنتصر الحقيقي'
      },
      {
        word: 'هَوَاهُ',
        transliteration: 'hawāhu',
        grammaticalRole: 'مفعول به + ضمير',
        grammaticalRoleAr: 'مفعول به منصوب + ضمير متصل',
        caseMarking: 'Accusative - فتحة مقدرة على الألف',
        caseMarkingAr: 'منصوب وعلامة نصبه فتحة مقدرة على الألف للتعذر',
        wordType: 'Defective noun (اسم مقصور) + pronoun',
        wordTypeAr: 'اسم مقصور + ضمير متصل في محل جر',
        notes: 'Object - desires/passions',
        notesAr: 'المفعول به - الهوى/الشهوات'
      }
    ],

    phraseAnalysis: [
      {
        phrase: 'إِنَّمَا الْمُنْتَصِرُ حَقًّا',
        phraseType: 'إنما + مبتدأ + مفعول مطلق',
        phraseTypeAr: 'أداة حصر + مبتدأ + توكيد بالمفعول المطلق',
        function: 'Restricts and emphasizes the subject',
        functionAr: 'يقصر ويؤكد المبتدأ',
        notes: 'Two emphatic devices combined',
        notesAr: 'أداتا توكيد مجتمعتان'
      },
      {
        phrase: 'هُوَ نَفْسُهُ',
        phraseType: 'ضمير فصل + توكيد معنوي',
        phraseTypeAr: 'ضمير فصل + توكيد معنوي',
        function: 'Double emphasis on the subject',
        functionAr: 'توكيد مزدوج للمبتدأ',
        notes: 'Two more emphatic devices stacked',
        notesAr: 'أداتا توكيد إضافيتان مكدستان'
      },
      {
        phrase: 'مَنْ يَغْلِبُ هَوَاهُ',
        phraseType: 'جملة الموصول (الخبر)',
        phraseTypeAr: 'اسم موصول وصلته = خبر المبتدأ',
        function: 'Defines what true victory means',
        functionAr: 'يُعرِّف معنى الانتصار الحقيقي',
        notes: 'Prophetic wisdom - conquering self',
        notesAr: 'حكمة نبوية - غلبة النفس'
      }
    ],

    sentenceAnalysis: {
      sentenceType: 'Nominal sentence with quadruple emphasis',
      sentenceTypeAr: 'جملة اسمية بأربعة أنواع من التوكيد',
      mainComponents: {
        subject: 'الْمُنْتَصِرُ نَفْسُهُ (the victor himself)',
        subjectAr: 'المنتصر نفسه (المبتدأ مع توكيده)',
        predicate: 'مَنْ يَغْلِبُ هَوَاهُ (who conquers his desires)',
        predicateAr: 'من يغلب هواه (الخبر - جملة موصولة)'
      },
      structure: 'إنما (قصر) + مبتدأ + حقًا (مفعول مطلق) + هو (فصل) + نفسه (توكيد) + خبر موصول',
      structureAr: 'إنما + المنتصرُ + حقًا + هو + نفسُه + من يغلب هواه'
    },

    keyGrammaticalConcepts: [
      {
        concept: 'التوكيد المتعدد',
        conceptAr: 'جمع أدوات التوكيد',
        explanation: 'This sentence demonstrates four emphatic devices: (1) إنما للقصر, (2) حقًا للتوكيد, (3) هو ضمير الفصل, (4) نفسه التوكيد المعنوي. This is the peak of Arabic emphatic style.',
        explanationAr: 'هذه الجملة توضح أربع أدوات توكيد: (١) إنما للقصر، (٢) حقًا للتوكيد، (٣) هو ضمير الفصل، (٤) نفسه التوكيد المعنوي. هذه ذروة أسلوب التوكيد العربي'
      },
      {
        concept: 'المفعول المطلق للتوكيد',
        conceptAr: 'المفعول المطلق المؤكد',
        explanation: 'حقًا here is مفعول مطلق for an implied verb (حَقَّ حقًّا or انتصر حقًّا). It intensifies the statement - "truly/really the victor."',
        explanationAr: 'حقًا هنا مفعول مطلق لفعل محذوف (حَقَّ حقًّا أو انتصر حقًّا). يقوي الكلام - "حقيقةً المنتصر"'
      },
      {
        concept: 'اجتماع ضمير الفصل والتوكيد المعنوي',
        conceptAr: 'الجمع بين ضمير الفصل ونفسه',
        explanation: 'Using both هو (separation pronoun) and نفسه (emphatic noun) together is maximum nominal emphasis. هو separates subject from predicate; نفسه emphasizes "himself, no other."',
        explanationAr: 'استخدام هو (ضمير الفصل) ونفسه (توكيد معنوي) معًا هو أقصى توكيد اسمي. هو يفصل المبتدأ عن الخبر؛ نفسه تؤكد "هو بذاته لا غيره"'
      }
    ],

    teachingNotes: 'This sentence (based on a prophetic saying) demonstrates maximum Arabic emphasis with four devices combined. Teaching sequence: (1) إنما restricts the definition, (2) حقًا adds intensity, (3) هو separates and emphasizes, (4) نفسه adds "himself." The message: true victory is self-mastery, not defeating others.',
    teachingNotesAr: 'هذه الجملة (مبنية على حديث نبوي) توضح أقصى توكيد عربي بأربع أدوات مجتمعة. تسلسل التعليم: (١) إنما تقصر التعريف، (٢) حقًا تضيف التأكيد، (٣) هو يفصل ويؤكد، (٤) نفسه تضيف "بذاته". الرسالة: الانتصار الحقيقي هو غلبة النفس، لا هزيمة الآخرين'
  },

  // =====================================================
  // Unit 8 Expert Analyses - Numbers (العدد والمعدود)
  // =====================================================

  // Example: Exercise 300 - Compound Ordinal Number (العدد الترتيبي المركب)
  {
    exerciseId: 300,
    arabic: 'هَذِهِ الْمُسَابَقَةُ الثَّانِيَةُ وَالْعِشْرُونَ فِي تَارِيخِ الْمَدْرَسَةِ',
    translation: 'This is the twenty-second competition in the school\'s history',

    wordAnalysis: [
      {
        word: 'هَذِهِ',
        transliteration: 'hādhihi',
        grammaticalRole: 'Subject (مبتدأ)',
        grammaticalRoleAr: 'مبتدأ',
        caseMarking: 'Nominative - مبني على الكسر',
        caseMarkingAr: 'في محل رفع مبتدأ',
        wordType: 'Demonstrative pronoun (feminine)',
        wordTypeAr: 'اسم إشارة للمؤنث',
        notes: 'Points to المسابقة (feminine)',
        notesAr: 'يشير إلى المسابقة (مؤنث)'
      },
      {
        word: 'الْمُسَابَقَةُ',
        transliteration: 'al-musābaqatu',
        grammaticalRole: 'Apposition (بدل)',
        grammaticalRoleAr: 'بدل من اسم الإشارة',
        caseMarking: 'Nominative (رفع) - marked with ضمة',
        caseMarkingAr: 'مرفوع وعلامة رفعه الضمة الظاهرة',
        wordType: 'Definite noun (مصدر ميمي)',
        wordTypeAr: 'اسم معرف بأل',
        notes: 'Competition - from سابق',
        notesAr: 'المسابقة - من سابَقَ يسابِق'
      },
      {
        word: 'الثَّانِيَةُ',
        transliteration: 'ath-thāniyatu',
        grammaticalRole: 'First part of compound ordinal (صفة)',
        grammaticalRoleAr: 'الجزء الأول من العدد الترتيبي المركب - صفة',
        caseMarking: 'Nominative (رفع) - follows الموصوف',
        caseMarkingAr: 'مرفوع وعلامة رفعه الضمة (تابع للموصوف)',
        wordType: 'Ordinal number (feminine)',
        wordTypeAr: 'عدد ترتيبي مؤنث',
        notes: 'Second - on وزن فاعلة',
        notesAr: 'الثانية - على وزن فاعِلة (ترتيبي من اثنان)'
      },
      {
        word: 'وَالْعِشْرُونَ',
        transliteration: 'wal-ʿishrūna',
        grammaticalRole: 'Coordinated ordinal part (معطوف)',
        grammaticalRoleAr: 'معطوف على الثانية',
        caseMarking: 'Nominative (رفع) - marked with و (جمع مذكر سالم)',
        caseMarkingAr: 'مرفوع وعلامة رفعه الواو لأنه ملحق بجمع المذكر السالم',
        wordType: 'Ordinal number (tens - invariable gender)',
        wordTypeAr: 'عدد ترتيبي للعشرات - لا يتغير بالتذكير والتأنيث',
        notes: 'Twentieth - العشرون ordinal same form as cardinal',
        notesAr: 'العشرون - الترتيبي من العقود بنفس صيغة العدد الأصلي'
      },
      {
        word: 'فِي',
        transliteration: 'fī',
        grammaticalRole: 'Preposition',
        grammaticalRoleAr: 'حرف جر',
        caseMarking: 'No case marking (particle)',
        caseMarkingAr: 'مبني لا محل له من الإعراب',
        wordType: 'Preposition indicating containment',
        wordTypeAr: 'حرف جر يفيد الظرفية',
        notes: 'In/within - temporal usage',
        notesAr: 'في - للظرفية الزمانية هنا'
      },
      {
        word: 'تَارِيخِ',
        transliteration: 'tārīkhi',
        grammaticalRole: 'Object of preposition (مضاف)',
        grammaticalRoleAr: 'اسم مجرور ومضاف',
        caseMarking: 'Genitive (جر) - marked with كسرة',
        caseMarkingAr: 'مجرور وعلامة جره الكسرة',
        wordType: 'Noun - first term of إضافة',
        wordTypeAr: 'اسم مضاف',
        notes: 'History/chronicle',
        notesAr: 'التاريخ - السجل الزمني'
      },
      {
        word: 'الْمَدْرَسَةِ',
        transliteration: 'al-madrasati',
        grammaticalRole: 'Second term of إضافة (مضاف إليه)',
        grammaticalRoleAr: 'مضاف إليه',
        caseMarking: 'Genitive (جر) - marked with كسرة',
        caseMarkingAr: 'مجرور وعلامة جره الكسرة',
        wordType: 'Definite noun - اسم مكان',
        wordTypeAr: 'اسم مكان معرف بأل',
        notes: 'School - from درس',
        notesAr: 'المدرسة - اسم مكان من دَرَسَ'
      }
    ],

    phraseAnalysis: [
      {
        phrase: 'هَذِهِ الْمُسَابَقَةُ',
        phraseType: 'Demonstrative + noun',
        phraseTypeAr: 'اسم إشارة + بدل',
        function: 'Subject of nominal sentence',
        functionAr: 'المبتدأ مع بدله',
        notes: 'هذه points to a specific competition',
        notesAr: 'هذه تشير إلى مسابقة محددة'
      },
      {
        phrase: 'الثَّانِيَةُ وَالْعِشْرُونَ',
        phraseType: 'Compound ordinal number',
        phraseTypeAr: 'عدد ترتيبي مركب',
        function: 'Adjective describing المسابقة',
        functionAr: 'صفة للمسابقة',
        notes: 'Units (الثانية) + tens (العشرون) - 22nd',
        notesAr: 'الآحاد (الثانية) + العشرات (العشرون) = الثانية والعشرون'
      },
      {
        phrase: 'فِي تَارِيخِ الْمَدْرَسَةِ',
        phraseType: 'Prepositional phrase (الجار والمجرور)',
        phraseTypeAr: 'جار ومجرور متعلق بالخبر المحذوف',
        function: 'Related to deleted predicate (كائنة)',
        functionAr: 'متعلق بخبر محذوف تقديره "كائنة"',
        notes: 'Indicates temporal/contextual scope',
        notesAr: 'يحدد السياق الزمني والمكاني'
      }
    ],

    sentenceAnalysis: {
      sentenceType: 'Nominal sentence (جملة اسمية)',
      sentenceTypeAr: 'جملة اسمية',
      mainComponents: {
        subject: 'هَذِهِ الْمُسَابَقَةُ الثَّانِيَةُ وَالْعِشْرُونَ',
        subjectAr: 'المبتدأ مع صفته المركبة',
        predicate: 'كائنة (محذوف) في تاريخ المدرسة',
        predicateAr: 'الخبر محذوف والجار والمجرور متعلق به'
      },
      structure: 'Demonstrative + noun + compound ordinal + prepositional phrase',
      structureAr: 'اسم إشارة + بدل + عدد ترتيبي مركب + جار ومجرور'
    },

    keyGrammaticalConcepts: [
      {
        concept: 'Compound Ordinal Numbers (الأعداد الترتيبية المركبة)',
        conceptAr: 'الأعداد الترتيبية المركبة',
        explanation: 'For numbers 21-99, ordinals are formed by coordinating the unit ordinal (الثانية) with the tens ordinal (العشرون) using و. The unit part agrees in gender with the noun; tens (20-90) are invariable.',
        explanationAr: 'للأعداد ٢١-٩٩، تتكون الترتيبيات بالعطف بين ترتيبي الآحاد (الثانية) وترتيبي العشرات (العشرون) بالواو. الآحاد تطابق الموصوف تذكيرًا وتأنيثًا؛ العشرات لا تتغير'
      },
      {
        concept: 'Ordinal Gender Agreement',
        conceptAr: 'مطابقة الترتيبي للموصوف',
        explanation: 'Unlike cardinal numbers 3-10 where gender is reversed, ordinal numbers AGREE with their nouns: المسابقة الثانية (both feminine), الدرس الثاني (both masculine).',
        explanationAr: 'على عكس الأعداد الأصلية ٣-١٠ حيث الجنس معكوس، الترتيبيات تُطابق موصوفها: المسابقة الثانية (كلاهما مؤنث)، الدرس الثاني (كلاهما مذكر)'
      },
      {
        concept: 'Tens Ordinals (ترتيبي العقود)',
        conceptAr: 'العشرون، الثلاثون... كترتيبيات',
        explanation: 'For multiples of ten (20, 30, 40...), the ordinal has the same form as the cardinal: العشرون serves as both "twenty" and "twentieth." They decline as masculine sound plurals (الواو/الياء).',
        explanationAr: 'للعقود (٢٠، ٣٠، ٤٠...)، الترتيبي بنفس صيغة الأصلي: العشرون تصلح لـ"عشرين" و"العشرين (الترتيبي)". تُعرب إعراب جمع المذكر السالم'
      }
    ],

    teachingNotes: 'This exercise teaches compound ordinals (21st-99th). Key pattern: Unit ordinal agrees in gender (الثانية with المسابقة), tens ordinal is invariable (العشرون same for both genders). Compare: الطالب الثاني والعشرون vs الطالبة الثانية والعشرون.',
    teachingNotesAr: 'هذا التمرين يعلم الترتيبيات المركبة (٢١-٩٩). النمط الأساسي: ترتيبي الآحاد يطابق الجنس (الثانية مع المسابقة)، ترتيبي العشرات ثابت (العشرون لكلا الجنسين). قارن: الطالب الثاني والعشرون vs الطالبة الثانية والعشرون'
  },

  // Example: Exercise 310 - Complex Number Specifiers (تمييز العدد المعقد)
  {
    exerciseId: 310,
    arabic: 'كَتَبَ الشَّاعِرُ مِائَتَيْ قَصِيدَةٍ وَثَلَاثَةَ آلَافِ بَيْتٍ',
    translation: 'The poet wrote two hundred poems and three thousand verses',

    wordAnalysis: [
      {
        word: 'كَتَبَ',
        transliteration: 'kataba',
        grammaticalRole: 'Verb (فعل)',
        grammaticalRoleAr: 'فعل ماضٍ',
        caseMarking: 'No case marking (verbs not declined)',
        caseMarkingAr: 'مبني على الفتح',
        wordType: 'Past tense verb, Form I',
        wordTypeAr: 'فعل ماضٍ من الباب الأول',
        notes: 'Root: ك-ت-ب (to write)',
        notesAr: 'الجذر: ك-ت-ب'
      },
      {
        word: 'الشَّاعِرُ',
        transliteration: 'ash-shāʿiru',
        grammaticalRole: 'Subject (فاعل)',
        grammaticalRoleAr: 'فاعل',
        caseMarking: 'Nominative (رفع) - marked with ضمة',
        caseMarkingAr: 'مرفوع وعلامة رفعه الضمة',
        wordType: 'Active participle (اسم فاعل)',
        wordTypeAr: 'اسم فاعل من شَعَرَ',
        notes: 'The poet - one who perceives/composes poetry',
        notesAr: 'الشاعر - من يقول الشعر'
      },
      {
        word: 'مِائَتَيْ',
        transliteration: 'miʾatay',
        grammaticalRole: 'Object (مفعول به)',
        grammaticalRoleAr: 'مفعول به ومضاف',
        caseMarking: 'Accusative (نصب) - marked with ي (dual)',
        caseMarkingAr: 'منصوب وعلامة نصبه الياء لأنه مثنى',
        wordType: 'Dual of مائة (hundred)',
        wordTypeAr: 'مثنى مائة',
        notes: 'Two hundred - dual form loses final ن in إضافة',
        notesAr: 'مائتان → مائتَيْ (حذفت النون للإضافة)'
      },
      {
        word: 'قَصِيدَةٍ',
        transliteration: 'qaṣīdatin',
        grammaticalRole: 'Specifier of number (تمييز)',
        grammaticalRoleAr: 'تمييز / مضاف إليه',
        caseMarking: 'Genitive (جر) singular - marked with كسرة',
        caseMarkingAr: 'مجرور وعلامة جره الكسرة (مفرد مجرور)',
        wordType: 'Noun - specifier for 100s',
        wordTypeAr: 'اسم مفرد تمييز للمائة',
        notes: 'Poem - SINGULAR genitive after hundreds',
        notesAr: 'قصيدة - مفرد مجرور بعد المائة (لا جمع!)'
      },
      {
        word: 'وَثَلَاثَةَ',
        transliteration: 'wa-thalāthata',
        grammaticalRole: 'Coordinated number (معطوف)',
        grammaticalRoleAr: 'معطوف على مائتي - مفعول به ثانٍ',
        caseMarking: 'Accusative (نصب) - marked with فتحة',
        caseMarkingAr: 'منصوب وعلامة نصبه الفتحة',
        wordType: 'Cardinal number 3 (feminine form)',
        wordTypeAr: 'عدد أصلي مؤنث (لأن المعدود مذكر)',
        notes: 'Three - feminine form with masculine معدود (آلاف)',
        notesAr: 'ثلاثة مؤنث لأن ألف/آلاف مذكر (قاعدة ٣-١٠)'
      },
      {
        word: 'آلَافِ',
        transliteration: 'ālāfi',
        grammaticalRole: 'Second term of إضافة (مضاف إليه)',
        grammaticalRoleAr: 'مضاف إليه',
        caseMarking: 'Genitive (جر) - marked with كسرة',
        caseMarkingAr: 'مجرور وعلامة جره الكسرة',
        wordType: 'Plural of ألف (thousand)',
        wordTypeAr: 'جمع تكسير من ألف',
        notes: 'Thousands - PLURAL genitive after 3-10',
        notesAr: 'آلاف - جمع مجرور (تمييز ٣-١٠ جمع مجرور)'
      },
      {
        word: 'بَيْتٍ',
        transliteration: 'baytin',
        grammaticalRole: 'Specifier of ألف (تمييز)',
        grammaticalRoleAr: 'تمييز / مضاف إليه لآلاف',
        caseMarking: 'Genitive (جر) singular - marked with كسرة',
        caseMarkingAr: 'مجرور وعلامة جره الكسرة (مفرد)',
        wordType: 'Noun - specifier for thousands',
        wordTypeAr: 'اسم مفرد تمييز للألف',
        notes: 'Verse (of poetry) - singular after ألف',
        notesAr: 'بيت الشعر - مفرد مجرور بعد الألف'
      }
    ],

    phraseAnalysis: [
      {
        phrase: 'مِائَتَيْ قَصِيدَةٍ',
        phraseType: 'Number + specifier (hundreds)',
        phraseTypeAr: 'عدد مائة + تمييز',
        function: 'First object of كتب',
        functionAr: 'المفعول به الأول',
        notes: 'Hundreds take SINGULAR genitive specifier',
        notesAr: 'المائة تمييزها مفرد مجرور'
      },
      {
        phrase: 'ثَلَاثَةَ آلَافِ بَيْتٍ',
        phraseType: 'Number + number + specifier',
        phraseTypeAr: 'عدد + عدد + تمييز',
        function: 'Second coordinated object',
        functionAr: 'المفعول به الثاني (معطوف)',
        notes: '3-10 rule applies to آلاف; ألف takes singular genitive specifier',
        notesAr: 'قاعدة ٣-١٠ تنطبق على آلاف؛ الألف تمييزها مفرد مجرور'
      }
    ],

    sentenceAnalysis: {
      sentenceType: 'Verbal sentence (جملة فعلية)',
      sentenceTypeAr: 'جملة فعلية',
      mainComponents: {
        predicate: 'كَتَبَ (wrote)',
        predicateAr: 'كتب (الفعل)',
        subject: 'الشَّاعِرُ (the poet)',
        subjectAr: 'الشاعر (الفاعل)',
        object: 'مِائَتَيْ قَصِيدَةٍ وَثَلَاثَةَ آلَافِ بَيْتٍ',
        objectAr: 'المفعول به المركب'
      },
      structure: 'Verb + subject + compound numerical object with coordination',
      structureAr: 'فعل + فاعل + مفعول به مركب بالعطف'
    },

    keyGrammaticalConcepts: [
      {
        concept: 'تمييز المائة والألف (Specifier for 100/1000)',
        conceptAr: 'تمييز المائة والألف',
        explanation: 'After مائة and ألف, the specifier (تمييز) is SINGULAR and GENITIVE (مفرد مجرور): مائة قصيدةٍ, ألف بيتٍ. This differs from 11-99 which take accusative singular.',
        explanationAr: 'بعد مائة وألف، التمييز مفرد مجرور: مائة قصيدةٍ، ألف بيتٍ. هذا يختلف عن ١١-٩٩ التي تمييزها مفرد منصوب'
      },
      {
        concept: 'قاعدة العدد ٣-١٠ مع آلاف',
        conceptAr: 'تطبيق قاعدة ٣-١٠ على جمع ألف',
        explanation: 'When counting آلاف (thousands), the 3-10 rule applies: gender reversal. Since ألف is masculine, use feminine form: ثلاثةُ آلافٍ (not ثلاث). The آلاف itself is genitive plural.',
        explanationAr: 'عند عد الآلاف، تنطبق قاعدة ٣-١٠: عكس الجنس. بما أن ألف مذكر، نستخدم المؤنث: ثلاثةُ آلافٍ (لا ثلاث). الآلاف نفسها جمع مجرور'
      },
      {
        concept: 'حذف نون المثنى للإضافة',
        conceptAr: 'مائتان → مائتَيْ',
        explanation: 'When مائتان/مائتين enters إضافة, the final ن is dropped: مائتا رجلٍ (nom) / مائتَيْ رجلٍ (acc/gen). The ي/ا indicate the case while the ن deletion signals إضافة.',
        explanationAr: 'عند دخول مائتان/مائتين في الإضافة، تُحذف النون: مائتا رجلٍ (رفع) / مائتَيْ رجلٍ (نصب/جر). الألف/الياء تدل على الإعراب وحذف النون يدل على الإضافة'
      }
    ],

    teachingNotes: 'This exercise demonstrates multiple number-specifier rules in one sentence: (1) مائتَيْ with singular genitive (قصيدةٍ), (2) ثلاثة with plural genitive (آلافِ) using reversed gender, (3) ألف with singular genitive (بيتٍ). Students should note the chain: three thousand verses = ثلاثة + آلاف + بيت.',
    teachingNotesAr: 'هذا التمرين يوضح قواعد تمييز العدد المتعددة في جملة واحدة: (١) مائتَيْ مع مفرد مجرور (قصيدةٍ)، (٢) ثلاثة مع جمع مجرور (آلافِ) بعكس الجنس، (٣) ألف مع مفرد مجرور (بيتٍ). لاحظ السلسلة: ثلاثة آلاف بيت'
  },

  // =====================================================
  // Unit 9 Expert Analyses - Prepositions (الجار والمجرور)
  // =====================================================

  // Example: Exercise 320 - Multiple Meanings of على
  {
    exerciseId: 320,
    arabic: 'جَلَسَ عَلَى الْكُرْسِيِّ وَصَلَّى عَلَى النَّبِيِّ',
    translation: 'He sat on the chair and sent blessings upon the Prophet',

    wordAnalysis: [
      {
        word: 'جَلَسَ',
        transliteration: 'jalasa',
        grammaticalRole: 'Verb (فعل)',
        grammaticalRoleAr: 'فعل ماضٍ',
        caseMarking: 'Built on فتحة',
        caseMarkingAr: 'مبني على الفتح',
        wordType: 'Past tense verb, Form I',
        wordTypeAr: 'فعل ماضٍ من الباب الأول',
        notes: 'Root: ج-ل-س (to sit)',
        notesAr: 'الجذر: ج-ل-س (الجلوس)'
      },
      {
        word: 'عَلَى',
        transliteration: 'ʿalā (1)',
        grammaticalRole: 'Preposition (حرف جر)',
        grammaticalRoleAr: 'حرف جر',
        caseMarking: 'No case marking (particle)',
        caseMarkingAr: 'مبني لا محل له من الإعراب',
        wordType: 'Preposition - physical elevation meaning',
        wordTypeAr: 'حرف جر - للاستعلاء الحقيقي',
        notes: 'على here = physical "on top of"',
        notesAr: 'على هنا = الاستعلاء الحسي (فوق)'
      },
      {
        word: 'الْكُرْسِيِّ',
        transliteration: 'al-kursiyyi',
        grammaticalRole: 'Object of preposition (مجرور)',
        grammaticalRoleAr: 'اسم مجرور',
        caseMarking: 'Genitive (جر) - marked with كسرة',
        caseMarkingAr: 'مجرور وعلامة جره الكسرة',
        wordType: 'Noun with ي ending (نسبة)',
        wordTypeAr: 'اسم منسوب',
        notes: 'Chair - from كُرس',
        notesAr: 'الكرسي - مقعد للجلوس'
      },
      {
        word: 'وَصَلَّى',
        transliteration: 'wa-ṣallā',
        grammaticalRole: 'Coordinated verb (معطوف)',
        grammaticalRoleAr: 'فعل ماضٍ معطوف',
        caseMarking: 'Built on فتحة مقدرة',
        caseMarkingAr: 'مبني على فتحة مقدرة على الألف',
        wordType: 'Past tense verb, Form II (defective)',
        wordTypeAr: 'فعل ماضٍ من الباب الثاني - ناقص',
        notes: 'Root: ص-ل-و (to pray/bless)',
        notesAr: 'الجذر: ص-ل-و (الصلاة/الدعاء)'
      },
      {
        word: 'عَلَى',
        transliteration: 'ʿalā (2)',
        grammaticalRole: 'Preposition (حرف جر)',
        grammaticalRoleAr: 'حرف جر',
        caseMarking: 'No case marking (particle)',
        caseMarkingAr: 'مبني لا محل له من الإعراب',
        wordType: 'Preposition - metaphorical/benefactive meaning',
        wordTypeAr: 'حرف جر - للاستعلاء المجازي',
        notes: 'على here = "upon" (sending blessings toward)',
        notesAr: 'على هنا = الاستعلاء المعنوي (توجيه الدعاء)'
      },
      {
        word: 'النَّبِيِّ',
        transliteration: 'an-nabiyyi',
        grammaticalRole: 'Object of preposition (مجرور)',
        grammaticalRoleAr: 'اسم مجرور',
        caseMarking: 'Genitive (جر) - marked with كسرة',
        caseMarkingAr: 'مجرور وعلامة جره الكسرة',
        wordType: 'Noun - ي ending (originally ء)',
        wordTypeAr: 'اسم أصله الهمزة (نَبِيء)',
        notes: 'The Prophet ﷺ',
        notesAr: 'النبي صلى الله عليه وسلم'
      }
    ],

    phraseAnalysis: [
      {
        phrase: 'جَلَسَ عَلَى الْكُرْسِيِّ',
        phraseType: 'Verb + prepositional phrase',
        phraseTypeAr: 'فعل + جار ومجرور متعلق بالفعل',
        function: 'First complete clause',
        functionAr: 'الجملة الأولى',
        notes: 'على للاستعلاء الحسي = physical location',
        notesAr: 'على للاستعلاء الحقيقي - المكان الحسي'
      },
      {
        phrase: 'صَلَّى عَلَى النَّبِيِّ',
        phraseType: 'Verb + prepositional phrase',
        phraseTypeAr: 'فعل + جار ومجرور متعلق بالفعل',
        function: 'Second coordinated clause',
        functionAr: 'الجملة الثانية المعطوفة',
        notes: 'على للاستعلاء المجازي = directing blessing toward',
        notesAr: 'على للاستعلاء المعنوي - توجيه الدعاء نحو'
      }
    ],

    sentenceAnalysis: {
      sentenceType: 'Compound verbal sentence (جملتان فعليتان معطوفتان)',
      sentenceTypeAr: 'جملتان فعليتان معطوفتان بالواو',
      mainComponents: {
        subject: 'هو (مستتر) - hidden pronoun',
        subjectAr: 'ضمير مستتر تقديره هو',
        predicate: 'جلس... وصلى (two coordinated verbs)',
        predicateAr: 'جلس (الفعل الأول) + صلى (المعطوف)'
      },
      structure: 'V1 + على (physical) + O1 + و + V2 + على (metaphorical) + O2',
      structureAr: 'فعل + على (حسي) + مجرور + و + فعل + على (معنوي) + مجرور'
    },

    keyGrammaticalConcepts: [
      {
        concept: 'تعدد معاني حرف الجر',
        conceptAr: 'معاني على المتعددة',
        explanation: 'Arabic prepositions have multiple meanings depending on context. على can mean: (1) physical "on" (الاستعلاء الحسي), (2) metaphorical "upon/toward" (الاستعلاء المعنوي), (3) "against" (العداء), (4) "despite" (المصاحبة), and more.',
        explanationAr: 'لحروف الجر العربية معانٍ متعددة حسب السياق. على تعني: (١) فوق (الاستعلاء الحسي)، (٢) نحو/إلى (الاستعلاء المعنوي)، (٣) ضد (العداء)، (٤) مع/رغم (المصاحبة)، وغيرها'
      },
      {
        concept: 'الاستعلاء الحسي vs المعنوي',
        conceptAr: 'الفرق بين الاستعلاء الحسي والمعنوي',
        explanation: 'Physical استعلاء: one thing literally above another (جلس على الكرسي). Metaphorical استعلاء: abstract direction or targeting (صلى على النبي, عطف عليه). The grammatical structure is identical, but meaning differs.',
        explanationAr: 'الاستعلاء الحسي: شيء فوق آخر حقيقة (جلس على الكرسي). الاستعلاء المعنوي: توجيه مجرد (صلى على النبي، عطف عليه). التركيب النحوي متطابق، لكن المعنى مختلف'
      },
      {
        concept: 'صلى على as fixed expression',
        conceptAr: 'صلى على كتعبير ثابت',
        explanation: 'صلى على النبي is a set phrase meaning "to send blessings upon the Prophet." The صلاة here is دعاء (supplication) not the ritual prayer. This على cannot be replaced with another preposition.',
        explanationAr: 'صلى على النبي تعبير ثابت بمعنى "الدعاء للنبي بالصلاة". الصلاة هنا دعاء لا الصلاة الشرعية. هذه على لا يمكن استبدالها بحرف جر آخر'
      }
    ],

    teachingNotes: 'This exercise contrasts two uses of على in one sentence. Students learn that the same preposition can have very different meanings. على الكرسي = physical location; على النبي = abstract direction of blessing. This is fundamental to Arabic comprehension - context determines preposition meaning.',
    teachingNotesAr: 'هذا التمرين يقارن استخدامين لـ"على" في جملة واحدة. يتعلم الطلاب أن نفس حرف الجر قد يحمل معانٍ مختلفة جدًا. على الكرسي = موقع حسي؛ على النبي = توجيه مجرد للدعاء. هذا أساسي لفهم العربية - السياق يحدد معنى حرف الجر'
  },

  // Example: Exercise 325 - Prepositional Attachment (تعلق الجار والمجرور)
  {
    exerciseId: 325,
    arabic: 'إِنَّ فِي ذَلِكَ لَعِبْرَةً لِأُولِي الْأَبْصَارِ',
    translation: 'Indeed, in that is a lesson for those of vision',

    wordAnalysis: [
      {
        word: 'إِنَّ',
        transliteration: 'inna',
        grammaticalRole: 'Emphasis particle (حرف توكيد)',
        grammaticalRoleAr: 'حرف توكيد ونصب',
        caseMarking: 'No case marking (particle)',
        caseMarkingAr: 'مبني لا محل له من الإعراب',
        wordType: 'One of إن وأخواتها',
        wordTypeAr: 'من الحروف الناسخة',
        notes: 'Emphasizes the statement; its اسم is delayed',
        notesAr: 'للتوكيد؛ اسمها مؤخر (عبرة)'
      },
      {
        word: 'فِي',
        transliteration: 'fī',
        grammaticalRole: 'Preposition (حرف جر)',
        grammaticalRoleAr: 'حرف جر',
        caseMarking: 'No case marking (particle)',
        caseMarkingAr: 'مبني لا محل له من الإعراب',
        wordType: 'Preposition of containment',
        wordTypeAr: 'حرف جر للظرفية',
        notes: 'في ذلك = "in that" - the container of the lesson',
        notesAr: 'في ذلك = الوعاء الذي فيه العبرة'
      },
      {
        word: 'ذَلِكَ',
        transliteration: 'dhālika',
        grammaticalRole: 'Object of في (مجرور)',
        grammaticalRoleAr: 'اسم إشارة في محل جر',
        caseMarking: 'Built; في محل جر',
        caseMarkingAr: 'مبني في محل جر',
        wordType: 'Demonstrative pronoun (distant)',
        wordTypeAr: 'اسم إشارة للبعيد',
        notes: 'Refers to what was mentioned before',
        notesAr: 'يشير إلى ما سبق ذكره'
      },
      {
        word: 'لَعِبْرَةً',
        transliteration: 'la-ʿibratan',
        grammaticalRole: 'اسم إن مؤخر',
        grammaticalRoleAr: 'اسم إن مؤخر + لام التوكيد',
        caseMarking: 'Accusative (نصب) - marked with فتحة',
        caseMarkingAr: 'منصوب وعلامة نصبه الفتحة الظاهرة',
        wordType: 'Noun with emphatic لام',
        wordTypeAr: 'اسم منصوب + لام مزحلقة',
        notes: 'A lesson - اسم إن delayed after خبرها',
        notesAr: 'عِبرة - اسم إن جاء بعد خبرها (في ذلك)'
      },
      {
        word: 'لِأُولِي',
        transliteration: 'li-ulī',
        grammaticalRole: 'Preposition + مضاف',
        grammaticalRoleAr: 'جار ومجرور ومضاف',
        caseMarking: 'Genitive - marked with ي',
        caseMarkingAr: 'مجرور وعلامة جره الياء (من الأسماء الستة)',
        wordType: 'From الأسماء الستة',
        wordTypeAr: 'من الأسماء الستة - جمع "ذو"',
        notes: 'لأولي = for those who possess',
        notesAr: 'أولو/أولي = أصحاب، ذوو'
      },
      {
        word: 'الْأَبْصَارِ',
        transliteration: 'al-abṣāri',
        grammaticalRole: 'مضاف إليه',
        grammaticalRoleAr: 'مضاف إليه',
        caseMarking: 'Genitive (جر) - marked with كسرة',
        caseMarkingAr: 'مجرور وعلامة جره الكسرة',
        wordType: 'Plural of بَصَر (جمع تكسير)',
        wordTypeAr: 'جمع تكسير من بَصَر',
        notes: 'Vision/insight - both physical and spiritual',
        notesAr: 'البصر - الرؤية الحسية والبصيرة'
      }
    ],

    phraseAnalysis: [
      {
        phrase: 'فِي ذَلِكَ',
        phraseType: 'Prepositional phrase (خبر إن مقدم)',
        phraseTypeAr: 'جار ومجرور - خبر إن مقدم',
        function: 'Advanced predicate of إن',
        functionAr: 'خبر إن مقدم في محل رفع',
        notes: 'Attached to (متعلق بـ) the implied كائن/موجود',
        notesAr: 'متعلق بخبر إن المحذوف (كائنة/موجودة)'
      },
      {
        phrase: 'لَعِبْرَةً',
        phraseType: 'Emphatic ل + اسم إن',
        phraseTypeAr: 'لام مزحلقة + اسم إن',
        function: 'Delayed subject of إن with emphasis',
        functionAr: 'اسم إن مؤخر مع لام التوكيد',
        notes: 'The لام (لام المزحلقة) adds emphasis',
        notesAr: 'اللام المزحلقة للتوكيد - انتقلت من إن إلى اسمها'
      },
      {
        phrase: 'لِأُولِي الْأَبْصَارِ',
        phraseType: 'Prepositional phrase + إضافة',
        phraseTypeAr: 'جار ومجرور مع إضافة - صفة',
        function: 'Describes who benefits from the lesson',
        functionAr: 'صفة لـ"عبرة" أو متعلق بها',
        notes: 'For people of vision/insight',
        notesAr: 'لأصحاب البصر والبصيرة'
      }
    ],

    sentenceAnalysis: {
      sentenceType: 'Nominal sentence with إن (تقديم الخبر)',
      sentenceTypeAr: 'جملة اسمية منسوخة بإن مع تقديم الخبر',
      mainComponents: {
        subject: 'لَعِبْرَةً (اسم إن مؤخر)',
        subjectAr: 'عبرة - اسم إن مؤخر منصوب',
        predicate: 'فِي ذَلِكَ (خبر إن مقدم)',
        predicateAr: 'في ذلك - خبر إن مقدم (شبه جملة)'
      },
      structure: 'إنّ + خبر مقدم (في ذلك) + لام التوكيد + اسم مؤخر (عبرة) + صفة (لأولي الأبصار)',
      structureAr: 'إن + في ذلك (خبر مقدم) + لـ (مزحلقة) + عبرةً (اسم مؤخر) + لأولي الأبصار (صفة/متعلق)'
    },

    keyGrammaticalConcepts: [
      {
        concept: 'تقديم خبر إن على اسمها',
        conceptAr: 'تقديم الخبر شبه الجملة على الاسم',
        explanation: 'When إن\'s predicate is a prepositional phrase (في ذلك) and its subject is indefinite (عبرة), the predicate MUST come first. Normal order إنّ عبرةً في ذلك would be ungrammatical because indefinite اسم إن cannot precede خبر شبه جملة.',
        explanationAr: 'إذا كان خبر إن شبه جملة (في ذلك) واسمها نكرة (عبرة)، يجب تقديم الخبر. الترتيب العادي "إنّ عبرةً في ذلك" غير صحيح لأن اسم إن النكرة لا يتقدم على خبر شبه الجملة'
      },
      {
        concept: 'لام المزحلقة',
        conceptAr: 'اللام المزحلقة (لام التوكيد المنقولة)',
        explanation: 'When إنّ is used, its emphatic لام cannot stay attached (إنّ لَعبرةً is wrong). The لام "slides" to the delayed element: إنّ في ذلك لَعبرةً. This is called لام مزحلقة (sliding لام).',
        explanationAr: 'عند استخدام إنّ، لا يمكن للام التوكيد أن تبقى ملاصقة (إنّ لَعبرةً خطأ). اللام "تنزحلق" إلى العنصر المؤخر: إنّ في ذلك لَعبرةً. تسمى اللام المزحلقة'
      },
      {
        concept: 'تعلق الجار والمجرور',
        conceptAr: 'ما يتعلق به الجار والمجرور',
        explanation: 'Every prepositional phrase must attach (يتعلق) to something - usually a verb or its substitute. في ذلك attaches to an implied كائنة (existing). لأولي الأبصار attaches to عبرة as a descriptive phrase.',
        explanationAr: 'كل جار ومجرور يجب أن يتعلق بشيء - عادةً فعل أو ما يقوم مقامه. "في ذلك" متعلق بـ"كائنة" المحذوفة. "لأولي الأبصار" متعلق بـ"عبرة" كصفة'
      }
    ],

    teachingNotes: 'This Quranic verse (3:13, 24:44) demonstrates advanced word order. Key teaching points: (1) Why is في ذلك first? Because اسم إن is indefinite. (2) Why لعبرة not لإن عبرة? The لام slides. (3) What does في ذلك attach to? An implied "existing." This is one of the most important patterns in Quranic Arabic.',
    teachingNotesAr: 'هذه الآية القرآنية (آل عمران:١٣، النور:٤٤) توضح ترتيب الكلمات المتقدم. نقاط التعليم: (١) لماذا "في ذلك" أولاً؟ لأن اسم إن نكرة. (٢) لماذا "لعبرةً" لا "إن لعبرةً"؟ اللام تزحلقت. (٣) بماذا يتعلق "في ذلك"؟ بمحذوف تقديره "كائنة". هذا من أهم الأنماط في لغة القرآن'
  },

  // =====================================================
  // Unit 10 Expert Analyses - Pronouns (الضمائر)
  // =====================================================

  // Example: Exercise 345 - Resumptive Pronoun (الضمير العائد)
  {
    exerciseId: 345,
    arabic: 'الْكِتَابُ الَّذِي اشْتَرَيْتُهُ مُفِيدٌ',
    translation: 'The book which I bought is useful',

    wordAnalysis: [
      {
        word: 'الْكِتَابُ',
        transliteration: 'al-kitābu',
        grammaticalRole: 'Subject (مبتدأ)',
        grammaticalRoleAr: 'مبتدأ',
        caseMarking: 'Nominative (رفع) - marked with ضمة',
        caseMarkingAr: 'مرفوع وعلامة رفعه الضمة',
        wordType: 'Definite noun',
        wordTypeAr: 'اسم معرف بأل',
        notes: 'The antecedent (مرجع) for الذي',
        notesAr: 'المرجع/الموصوف للاسم الموصول "الذي"'
      },
      {
        word: 'الَّذِي',
        transliteration: 'alladhī',
        grammaticalRole: 'Relative pronoun (اسم موصول)',
        grammaticalRoleAr: 'اسم موصول صفة',
        caseMarking: 'Built; في محل رفع صفة',
        caseMarkingAr: 'مبني في محل رفع صفة لـ"الكتاب"',
        wordType: 'Relative pronoun (masculine singular)',
        wordTypeAr: 'اسم موصول للمفرد المذكر',
        notes: 'Connects الكتاب to its defining clause',
        notesAr: 'يربط الكتاب بالجملة التي تصفه'
      },
      {
        word: 'اشْتَرَيْتُ',
        transliteration: 'ishtaraytu',
        grammaticalRole: 'Verb of صلة الموصول',
        grammaticalRoleAr: 'فعل ماضٍ - صلة الموصول',
        caseMarking: 'Built on سكون with pronoun',
        caseMarkingAr: 'مبني على السكون لاتصاله بتاء الفاعل',
        wordType: 'Past tense verb, Form VIII',
        wordTypeAr: 'فعل ماضٍ من الباب الثامن (افتعل)',
        notes: 'Root: ش-ر-ي; ت is the subject pronoun "I"',
        notesAr: 'الجذر: ش-ر-ي؛ التاء ضمير الفاعل (أنا)'
      },
      {
        word: 'ـهُ',
        transliteration: '-hu',
        grammaticalRole: 'Resumptive pronoun (الضمير العائد)',
        grammaticalRoleAr: 'ضمير متصل - الضمير العائد',
        caseMarking: 'Built; في محل نصب مفعول به',
        caseMarkingAr: 'في محل نصب مفعول به',
        wordType: 'Attached pronoun (3rd person masculine)',
        wordTypeAr: 'ضمير متصل للغائب المفرد المذكر',
        notes: 'MUST refer back to الكتاب - required in صلة',
        notesAr: 'يعود على الكتاب - ضروري في صلة الموصول'
      },
      {
        word: 'مُفِيدٌ',
        transliteration: 'mufīdun',
        grammaticalRole: 'Predicate (خبر)',
        grammaticalRoleAr: 'خبر المبتدأ',
        caseMarking: 'Nominative (رفع) - marked with ضمة',
        caseMarkingAr: 'مرفوع وعلامة رفعه الضمة',
        wordType: 'Active participle (اسم فاعل)',
        wordTypeAr: 'اسم فاعل من أفاد (الباب الرابع)',
        notes: 'Useful - describes الكتاب',
        notesAr: 'مفيد - يصف الكتاب'
      }
    ],

    phraseAnalysis: [
      {
        phrase: 'الْكِتَابُ الَّذِي اشْتَرَيْتُهُ',
        phraseType: 'Noun + relative clause',
        phraseTypeAr: 'موصوف + صفة (جملة الموصول)',
        function: 'Complete subject phrase',
        functionAr: 'المبتدأ مع صفته',
        notes: 'الذي + صلته = صفة للكتاب',
        notesAr: 'الاسم الموصول وصلته في محل رفع صفة'
      },
      {
        phrase: 'اشْتَرَيْتُهُ',
        phraseType: 'صلة الموصول',
        phraseTypeAr: 'جملة صلة الموصول',
        function: 'Defines/specifies which book',
        functionAr: 'تحدد أي كتاب - لا محل لها من الإعراب',
        notes: 'Contains العائد (هُ) referring back to الكتاب',
        notesAr: 'تحتوي على الضمير العائد (هُ) الذي يعود على الكتاب'
      }
    ],

    sentenceAnalysis: {
      sentenceType: 'Nominal sentence with relative clause',
      sentenceTypeAr: 'جملة اسمية مع جملة صلة الموصول',
      mainComponents: {
        subject: 'الْكِتَابُ الَّذِي اشْتَرَيْتُهُ (المبتدأ مع صفته)',
        subjectAr: 'الكتاب الذي اشتريتُهُ = المبتدأ وصفته',
        predicate: 'مُفِيدٌ (الخبر)',
        predicateAr: 'مفيد = الخبر'
      },
      structure: 'Subject (noun + relative clause) + predicate',
      structureAr: 'مبتدأ (اسم + جملة موصول) + خبر'
    },

    keyGrammaticalConcepts: [
      {
        concept: 'الضمير العائد (Resumptive Pronoun)',
        conceptAr: 'الضمير العائد في صلة الموصول',
        explanation: 'In Arabic relative clauses, a pronoun MUST appear in the صلة referring back to the موصول. In English "the book which I bought" the object is implicit, but Arabic requires اشتريتُهُ - the هُ is mandatory.',
        explanationAr: 'في جمل الصلة العربية، يجب أن يظهر ضمير في الصلة يعود على الموصول. في الإنجليزية المفعول ضمني، لكن العربية تتطلب "اشتريتُهُ" - الهاء إلزامية'
      },
      {
        concept: 'صلة الموصول لا محل لها من الإعراب',
        conceptAr: 'جملة الصلة لا محل لها',
        explanation: 'The صلة clause (اشتريته) has no إعراب position of its own. Only the whole unit الذي + صلته has a position (here: صفة). Individual words in صلة are parsed normally but the clause itself is "لا محل لها."',
        explanationAr: 'جملة الصلة (اشتريته) ليس لها محل من الإعراب بذاتها. فقط الوحدة الكاملة "الذي + صلته" لها محل (هنا: صفة). كلمات الصلة تُعرب عاديًا لكن الجملة نفسها "لا محل لها"'
      },
      {
        concept: 'مطابقة الموصول للمرجع',
        conceptAr: 'مطابقة اسم الموصول',
        explanation: 'The relative pronoun must match its antecedent in gender and number: الكتاب (masc. sing.) → الذي. Compare: الكتب التي, المرأة التي, الرجال الذين. The عائد must also match.',
        explanationAr: 'يجب أن يطابق الموصول مرجعه في الجنس والعدد: الكتاب (مذكر مفرد) ← الذي. قارن: الكتب التي، المرأة التي، الرجال الذين. الضمير العائد يطابق أيضًا'
      }
    ],

    teachingNotes: 'This exercise teaches the essential العائد concept. Common student error: omitting the هُ (saying اشتريتُ instead of اشتريتُهُ). Emphasize that Arabic relative clauses are "complete sentences" that need their object. The العائد links the clause back to the noun being described.',
    teachingNotesAr: 'هذا التمرين يعلم مفهوم العائد الأساسي. خطأ الطلاب الشائع: حذف الهاء (قول "اشتريتُ" بدل "اشتريتُهُ"). أكد أن جمل الصلة العربية "جمل كاملة" تحتاج مفعولها. العائد يربط الجملة بالاسم الموصوف'
  },

  // Example: Exercise 350 - Protective Nun (نون الوقاية)
  {
    exerciseId: 350,
    arabic: 'أَكْرِمْنِي كَمَا أَكْرَمْتُكَ',
    translation: 'Honor me as I honored you',

    wordAnalysis: [
      {
        word: 'أَكْرِمْ',
        transliteration: 'akrim',
        grammaticalRole: 'Verb (فعل أمر)',
        grammaticalRoleAr: 'فعل أمر',
        caseMarking: 'Built on سكون',
        caseMarkingAr: 'مبني على السكون',
        wordType: 'Imperative verb, Form IV',
        wordTypeAr: 'فعل أمر من الباب الرابع (أفعل)',
        notes: 'Root: ك-ر-م; command form',
        notesAr: 'الجذر: ك-ر-م؛ صيغة الأمر'
      },
      {
        word: 'ـنِي',
        transliteration: '-nī',
        grammaticalRole: 'Protective nun + pronoun',
        grammaticalRoleAr: 'نون الوقاية + ياء المتكلم',
        caseMarking: 'ي in place of نصب (مفعول به)',
        caseMarkingAr: 'الياء في محل نصب مفعول به',
        wordType: 'نون الوقاية + attached pronoun',
        wordTypeAr: 'نون الوقاية + ضمير متصل',
        notes: 'The ن protects the verb from كسرة',
        notesAr: 'النون تحمي الفعل من الكسرة'
      },
      {
        word: 'كَمَا',
        transliteration: 'kamā',
        grammaticalRole: 'Comparative particle',
        grammaticalRoleAr: 'الكاف حرف جر + ما المصدرية',
        caseMarking: 'No case marking (particle)',
        caseMarkingAr: 'مبني لا محل له',
        wordType: 'Particle of comparison',
        wordTypeAr: 'أداة تشبيه (كاف + ما)',
        notes: 'كَ = like + ما = what/that which',
        notesAr: 'كما = مثلما، على نحو ما'
      },
      {
        word: 'أَكْرَمْتُ',
        transliteration: 'akramtu',
        grammaticalRole: 'Verb (فعل ماضٍ)',
        grammaticalRoleAr: 'فعل ماضٍ',
        caseMarking: 'Built on سكون for ت connection',
        caseMarkingAr: 'مبني على السكون لاتصاله بتاء الفاعل',
        wordType: 'Past tense verb, Form IV',
        wordTypeAr: 'فعل ماضٍ من الباب الرابع',
        notes: 'ت = "I" (فاعل)',
        notesAr: 'التاء ضمير متصل في محل رفع فاعل'
      },
      {
        word: 'ـكَ',
        transliteration: '-ka',
        grammaticalRole: 'Object pronoun',
        grammaticalRoleAr: 'ضمير متصل مفعول به',
        caseMarking: 'In place of نصب (مفعول به)',
        caseMarkingAr: 'في محل نصب مفعول به',
        wordType: 'Attached pronoun (2nd person masc.)',
        wordTypeAr: 'ضمير متصل للمخاطب المذكر',
        notes: 'You (masculine) - object of أكرمت',
        notesAr: 'أنت - مفعول به لـ"أكرمتُ"'
      }
    ],

    phraseAnalysis: [
      {
        phrase: 'أَكْرِمْنِي',
        phraseType: 'Imperative + object with نون الوقاية',
        phraseTypeAr: 'فعل أمر + نون الوقاية + ياء المتكلم',
        function: 'Main command',
        functionAr: 'الأمر الرئيسي',
        notes: 'Without نون: *أكرمِي (looks like feminine command!)',
        notesAr: 'بدون النون: *أكرمِي (تبدو كأمر للمؤنث!)'
      },
      {
        phrase: 'كَمَا أَكْرَمْتُكَ',
        phraseType: 'Comparative clause',
        phraseTypeAr: 'جملة المقارنة',
        function: 'Establishes the standard of comparison',
        functionAr: 'تحدد معيار المقارنة',
        notes: 'As I honored you - measure of expected honoring',
        notesAr: 'كما أكرمتك - مقياس الإكرام المطلوب'
      }
    ],

    sentenceAnalysis: {
      sentenceType: 'Imperative sentence with comparison',
      sentenceTypeAr: 'جملة أمرية مع جملة المقارنة',
      mainComponents: {
        predicate: 'أَكْرِمْنِي (فعل الأمر مع مفعوله)',
        predicateAr: 'أكرمني = الفعل مع مفعوله',
        subject: 'أنت (ضمير مستتر - المخاطب)',
        subjectAr: 'الفاعل ضمير مستتر تقديره أنت'
      },
      structure: 'Command + object (with نون الوقاية) + comparative clause',
      structureAr: 'فعل أمر + مفعول به (مع نون الوقاية) + جملة مقارنة'
    },

    keyGrammaticalConcepts: [
      {
        concept: 'نون الوقاية (Protective Nun)',
        conceptAr: 'نون الوقاية - سبب التسمية',
        explanation: 'When ياء المتكلم attaches to a verb, نون الوقاية is inserted to "protect" the verb from the كسرة that ي requires. Without it: *أكرمِي could be confused with feminine imperative أكرمِي (you-fem, honor!).',
        explanationAr: 'عند اتصال ياء المتكلم بالفعل، تُدخل نون الوقاية لـ"حماية" الفعل من الكسرة التي تتطلبها الياء. بدونها: *أكرمِي تختلط بأمر المؤنث أكرمِي (أنتِ أكرمي!)'
      },
      {
        concept: 'مواضع نون الوقاية',
        conceptAr: 'أين تدخل نون الوقاية',
        explanation: 'نون الوقاية enters before ياء المتكلم with: (1) All verbs: أكرمني, يكرمُني, أكرِمني, (2) إنّ and sisters: إنّني, لكنّني, (3) Some particles: منّي, عنّي. NOT with nouns: كتابي (not *كتابني).',
        explanationAr: 'تدخل نون الوقاية قبل ياء المتكلم مع: (١) جميع الأفعال: أكرمني، يكرمني، أكرِمني، (٢) إن وأخواتها: إنني، لكنني، (٣) بعض الحروف: مني، عني. لا تدخل مع الأسماء: كتابي (لا *كتابني)'
      },
      {
        concept: 'التمييز بين أمر المذكر والمؤنث',
        conceptAr: 'أكرِمني vs أكرِمي',
        explanation: 'أكرِمْني = command to male with ني (نون الوقاية + ياء المتكلم = honor ME). أكرِمِي = command to female (no object = honor!). The نون prevents this ambiguity. Compare also: اسمَعْني (hear me) vs اسمَعِي (you-fem, hear!).',
        explanationAr: 'أكرِمْني = أمر للذكر مع ني (نون الوقاية + ياء المتكلم = أكرِمني). أكرِمِي = أمر للأنثى (بلا مفعول = أكرِمي!). النون تمنع هذا الالتباس. قارن أيضًا: اسمَعْني (اسمع لي) vs اسمَعِي (أنتِ اسمعي!)'
      }
    ],

    teachingNotes: 'This exercise teaches نون الوقاية through contrast. Write أكرمني and أكرمي side by side. Ask: what\'s the difference? One is "honor me" (to male), one is "honor!" (to female). The ن prevents confusion. Also show: إنّني (indeed I) vs إنّي (same, but ن optional with إن).',
    teachingNotesAr: 'هذا التمرين يعلم نون الوقاية بالمقارنة. اكتب أكرمني وأكرمي جنبًا إلى جنب. اسأل: ما الفرق؟ واحدة "أكرِمني" (للمذكر)، والأخرى "أكرِمي!" (للمؤنث). النون تمنع الخلط. أظهر أيضًا: إنّني (حقًا أنا) vs إنّي (نفسها، لكن النون اختيارية مع إن)'
  },

  // ========== UNIT 12: VERBAL PHRASES ==========

  // Expert Analysis: Exercise 368 - المفعول المطلق المضاف للنوع
  {
    exerciseId: 368,
    arabic: 'سَارَ الْمُسَافِرُ سَيْرَ الْجِمَالِ فِي الصَّحْرَاءِ',
    translation: 'The traveler walked like the camels walk in the desert',

    wordAnalysis: [
      {
        word: 'سَارَ',
        transliteration: 'saara',
        grammaticalRole: 'Verb (فعل)',
        grammaticalRoleAr: 'فعل ماضٍ',
        caseMarking: 'No case (verbs are not declined)',
        caseMarkingAr: 'مبني على الفتح',
        wordType: 'Past tense verb, Form I',
        wordTypeAr: 'فعل ماضٍ ثلاثي مجرد',
        notes: 'Root: س-ي-ر (to walk, travel)',
        notesAr: 'الجذر: س-ي-ر (سَارَ يَسِيرُ سَيْرًا)'
      },
      {
        word: 'الْمُسَافِرُ',
        transliteration: 'al-musaafiru',
        grammaticalRole: 'Subject (فاعل)',
        grammaticalRoleAr: 'فاعل',
        caseMarking: 'Nominative (مرفوع) with damma',
        caseMarkingAr: 'مرفوع وعلامة رفعه الضمة الظاهرة',
        wordType: 'Active participle (اسم فاعل)',
        wordTypeAr: 'اسم فاعل من سافَرَ',
        notes: 'Form III active participle',
        notesAr: 'اسم فاعل من الثلاثي المزيد (فاعَلَ)'
      },
      {
        word: 'سَيْرَ',
        transliteration: 'sayra',
        grammaticalRole: 'Absolute object (مفعول مطلق)',
        grammaticalRoleAr: 'مفعول مطلق مبيّن للنوع',
        caseMarking: 'Accusative (منصوب) with fatha',
        caseMarkingAr: 'منصوب وعلامة نصبه الفتحة الظاهرة',
        wordType: 'Masdar (verbal noun)',
        wordTypeAr: 'مصدر سَارَ يَسِيرُ',
        notes: 'Added to الجمال to specify the manner/type of walking',
        notesAr: 'مضاف إلى الجمال لبيان نوع السير'
      },
      {
        word: 'الْجِمَالِ',
        transliteration: 'al-jimaali',
        grammaticalRole: 'Possessor in idafa (مضاف إليه)',
        grammaticalRoleAr: 'مضاف إليه',
        caseMarking: 'Genitive (مجرور) with kasra',
        caseMarkingAr: 'مجرور وعلامة جره الكسرة الظاهرة',
        wordType: 'Broken plural noun',
        wordTypeAr: 'جمع تكسير (جَمَل → جِمال)',
        notes: 'Plural of جَمَل (camel)',
        notesAr: 'جمع جَمَل على وزن فِعال'
      },
      {
        word: 'فِي',
        transliteration: 'fee',
        grammaticalRole: 'Preposition (حرف جر)',
        grammaticalRoleAr: 'حرف جر',
        caseMarking: 'No case (particles are not declined)',
        caseMarkingAr: 'مبني على السكون',
        wordType: 'Particle',
        wordTypeAr: 'حرف جر يفيد الظرفية',
        notes: 'Indicates location/place',
        notesAr: 'يفيد الظرفية المكانية'
      },
      {
        word: 'الصَّحْرَاءِ',
        transliteration: 'as-sahraa\'i',
        grammaticalRole: 'Object of preposition (مجرور)',
        grammaticalRoleAr: 'اسم مجرور',
        caseMarking: 'Genitive (مجرور) with kasra',
        caseMarkingAr: 'مجرور وعلامة جره الكسرة الظاهرة',
        wordType: 'Noun (feminine, diptote base but with ال becomes triptote)',
        wordTypeAr: 'اسم ممدود مؤنث',
        notes: 'Ends in ألف ممدودة; with ال takes normal case endings',
        notesAr: 'اسم ممدود، مع (ال) يُعرب إعرابًا ظاهرًا'
      }
    ],

    phraseAnalysis: [
      {
        phrase: 'سَارَ الْمُسَافِرُ',
        phraseType: 'Verbal sentence core',
        phraseTypeAr: 'جملة فعلية - ركن أساسي',
        function: 'Main predication',
        functionAr: 'الإخبار الرئيسي',
        notes: 'Verb + Subject forms the sentence backbone',
        notesAr: 'الفعل + الفاعل يشكلان عماد الجملة'
      },
      {
        phrase: 'سَيْرَ الْجِمَالِ',
        phraseType: 'Idafa construction (مفعول مطلق)',
        phraseTypeAr: 'إضافة - مفعول مطلق مبيّن للنوع',
        function: 'Specifies the manner/type of walking',
        functionAr: 'يبيّن نوع السير وكيفيته',
        notes: 'This is a مفعول مطلق مبيّن للنوع - not just emphasizing the verb but describing HOW the action was done',
        notesAr: 'هذا مفعول مطلق مبيّن للنوع - لا يؤكد الفعل فحسب بل يصف كيفية وقوعه'
      },
      {
        phrase: 'فِي الصَّحْرَاءِ',
        phraseType: 'Prepositional phrase (جار ومجرور)',
        phraseTypeAr: 'جار ومجرور',
        function: 'Adverbial of place (متعلق بالفعل)',
        functionAr: 'متعلق بالفعل سَارَ، يفيد مكان السير',
        notes: 'Attached to the verb سَارَ',
        notesAr: 'شبه جملة متعلقة بالفعل'
      }
    ],

    sentenceAnalysis: {
      sentenceType: 'Verbal sentence (جملة فعلية)',
      sentenceTypeAr: 'جملة فعلية خبرية مثبتة',
      mainComponents: {
        subject: 'الْمُسَافِرُ',
        subjectAr: 'الفاعل: المسافرُ',
        predicate: 'سَارَ',
        predicateAr: 'الفعل: سارَ',
        object: 'سَيْرَ الْجِمَالِ (مفعول مطلق)',
        objectAr: 'المفعول المطلق: سيرَ الجمالِ'
      },
      structure: 'فعل + فاعل + مفعول مطلق مضاف + جار ومجرور',
      structureAr: 'جملة فعلية مكونة من فعل ماضٍ + فاعل + مفعول مطلق مبيّن للنوع (مضاف) + شبه جملة متعلقة بالفعل'
    },

    keyGrammaticalConcepts: [
      {
        concept: 'Types of المفعول المطلق',
        conceptAr: 'أنواع المفعول المطلق',
        explanation: 'There are 3 types: (1) مؤكد للفعل - just emphasizes: ضربتُه ضربًا, (2) مبيّن للنوع - describes manner: ضربتُه ضربًا شديدًا, (3) مبيّن للعدد - specifies count: ضربتُه ضربتَين. This sentence uses type 2.',
        explanationAr: 'ثلاثة أنواع: (١) مؤكد للفعل: ضربتُه ضربًا، (٢) مبيّن للنوع: ضربتُه ضربًا شديدًا، (٣) مبيّن للعدد: ضربتُه ضربتَين. هذه الجملة من النوع الثاني'
      },
      {
        concept: 'المفعول المطلق المضاف',
        conceptAr: 'الإضافة في المفعول المطلق',
        explanation: 'When المفعول المطلق is مبيّن للنوع, it can be modified by: (1) adjective: سيرًا حسنًا, (2) idafa: سيرَ الجمال (walking like camels walk). The idafa form is more eloquent and creates a simile.',
        explanationAr: 'عندما يكون المفعول المطلق مبيّنًا للنوع يُوصف بـ: (١) صفة: سيرًا حسنًا، (٢) إضافة: سيرَ الجمال. والإضافة أبلغ لأنها تُنشئ تشبيهًا'
      },
      {
        concept: 'شروط المفعول المطلق',
        conceptAr: 'الشروط اللازمة',
        explanation: 'المفعول المطلق must be: (1) مصدر (verbal noun), (2) from the same root as the verb OR its synonym, (3) منصوب (accusative). Here سَيْر is the masdar of سَارَ.',
        explanationAr: 'شروط المفعول المطلق: (١) أن يكون مصدرًا، (٢) أن يكون من لفظ الفعل أو مرادفه، (٣) أن يكون منصوبًا. هنا سَيْر مصدر سَارَ'
      }
    ],

    teachingNotes: 'Use this exercise to teach المفعول المطلق المضاف as a stylistic device. Compare: سار سيرًا (mere emphasis) vs سار سيرًا حسنًا (describes manner with adjective) vs سار سيرَ الجمال (vivid simile through idafa). The idafa form is common in classical Arabic and creates elegant comparisons.',
    teachingNotesAr: 'استخدم هذا التمرين لتعليم المفعول المطلق المضاف كأداة بلاغية. قارن: سار سيرًا (تأكيد فقط) vs سار سيرًا حسنًا (بيان النوع بالصفة) vs سار سيرَ الجمال (تشبيه بليغ بالإضافة). صيغة الإضافة شائعة في العربية الفصحى وتُنشئ مقارنات أنيقة'
  },

  // Expert Analysis: Exercise 388 - الحال المتعددة (Multiple حال)
  {
    exerciseId: 388,
    arabic: 'فَخَرَجَ مِنْهَا خَائِفًا يَتَرَقَّبُ',
    translation: 'So he left it fearful and vigilant',

    wordAnalysis: [
      {
        word: 'فَـ',
        transliteration: 'fa-',
        grammaticalRole: 'Conjunction (حرف عطف)',
        grammaticalRoleAr: 'حرف عطف',
        caseMarking: 'No case (particles are not declined)',
        caseMarkingAr: 'مبني على الفتح',
        wordType: 'Particle (الفاء)',
        wordTypeAr: 'حرف عطف يفيد الترتيب والتعقيب',
        notes: 'Indicates sequence and immediate consequence',
        notesAr: 'يفيد الترتيب والتعقيب - خرج فورًا بعد ما سبق'
      },
      {
        word: 'خَرَجَ',
        transliteration: 'kharaja',
        grammaticalRole: 'Verb (فعل)',
        grammaticalRoleAr: 'فعل ماضٍ',
        caseMarking: 'Built on fatha',
        caseMarkingAr: 'مبني على الفتح',
        wordType: 'Past tense verb, Form I',
        wordTypeAr: 'فعل ماضٍ ثلاثي مجرد',
        notes: 'Root: خ-ر-ج (to exit, leave)',
        notesAr: 'الجذر: خ-ر-ج'
      },
      {
        word: 'مِنْهَا',
        transliteration: 'minhaa',
        grammaticalRole: 'Prepositional phrase',
        grammaticalRoleAr: 'جار ومجرور',
        caseMarking: 'Pronoun in genitive position',
        caseMarkingAr: 'ها: ضمير متصل في محل جر',
        wordType: 'Preposition + attached pronoun',
        wordTypeAr: 'حرف جر + ضمير متصل',
        notes: 'The ها refers to the city (المدينة)',
        notesAr: 'الضمير يعود على المدينة'
      },
      {
        word: 'خَائِفًا',
        transliteration: 'khaa\'ifan',
        grammaticalRole: 'حال مفردة (First حال)',
        grammaticalRoleAr: 'حال مفردة',
        caseMarking: 'Accusative (منصوب) with fatha + tanween',
        caseMarkingAr: 'منصوب وعلامة نصبه الفتحة الظاهرة',
        wordType: 'Active participle (اسم فاعل)',
        wordTypeAr: 'اسم فاعل من خَافَ يَخَافُ',
        notes: 'Describes the state of the hidden subject (هو) while exiting',
        notesAr: 'حال من الفاعل المستتر (هو) يصف حالته عند الخروج'
      },
      {
        word: 'يَتَرَقَّبُ',
        transliteration: 'yataraqqabu',
        grammaticalRole: 'حال جملة فعلية (Second حال)',
        grammaticalRoleAr: 'جملة فعلية في محل نصب حال',
        caseMarking: 'Verbal sentence as حال',
        caseMarkingAr: 'جملة في محل نصب حال ثانية',
        wordType: 'Present tense verb, Form V',
        wordTypeAr: 'فعل مضارع مرفوع من الباب الخامس',
        notes: 'Form V (تَفَعَّلَ) - to watch carefully, be vigilant',
        notesAr: 'على وزن تَفَعَّلَ - بمعنى ينتظر ويراقب بحذر'
      }
    ],

    phraseAnalysis: [
      {
        phrase: 'فَخَرَجَ مِنْهَا',
        phraseType: 'Verbal sentence core + prepositional phrase',
        phraseTypeAr: 'فعل + جار ومجرور',
        function: 'Main action with source of movement',
        functionAr: 'الحدث الرئيسي مع بيان مكان الخروج',
        notes: 'Subject is hidden (هو) referring to موسى عليه السلام',
        notesAr: 'الفاعل ضمير مستتر (هو) يعود على موسى عليه السلام'
      },
      {
        phrase: 'خَائِفًا',
        phraseType: 'حال مفردة',
        phraseTypeAr: 'حال أولى مفردة',
        function: 'First circumstantial description - internal state',
        functionAr: 'الحال الأولى - تصف الحالة الداخلية (الخوف)',
        notes: 'Describes emotional/internal state',
        notesAr: 'تصف الحالة النفسية الداخلية'
      },
      {
        phrase: 'يَتَرَقَّبُ',
        phraseType: 'حال جملة فعلية',
        phraseTypeAr: 'حال ثانية جملة فعلية',
        function: 'Second circumstantial description - external action',
        functionAr: 'الحال الثانية - تصف الفعل الخارجي (المراقبة)',
        notes: 'Describes physical action accompanying the exit',
        notesAr: 'تصف الفعل الجسدي المصاحب للخروج'
      }
    ],

    sentenceAnalysis: {
      sentenceType: 'Verbal sentence with dual حال',
      sentenceTypeAr: 'جملة فعلية مع حالين متداخلتين',
      mainComponents: {
        subject: 'هو (hidden pronoun)',
        subjectAr: 'الفاعل: ضمير مستتر تقديره هو',
        predicate: 'خَرَجَ',
        predicateAr: 'الفعل: خرجَ',
        object: 'N/A (intransitive verb)',
        objectAr: 'لا مفعول به (فعل لازم)'
      },
      structure: 'فاء + فعل + (فاعل مستتر) + جار ومجرور + حال مفردة + حال جملة',
      structureAr: 'الفاء العاطفة + فعل ماضٍ + فاعل مستتر + جار ومجرور + حال أولى مفردة + حال ثانية جملة فعلية'
    },

    keyGrammaticalConcepts: [
      {
        concept: 'تعدد الحال (Multiple حال)',
        conceptAr: 'جواز تعدد الحال لصاحب واحد',
        explanation: 'Arabic allows multiple حال for the same صاحب الحال. Here both خائفًا and يترقب describe the state of the subject (موسى). They can be: (1) متداخلة - layered/nested, or (2) متعاطفة - coordinated with و.',
        explanationAr: 'يجوز تعدد الحال لصاحب واحد. هنا كلا الحالَين (خائفًا ويترقب) يصفان حالة الفاعل (موسى). قد تكون: (١) متداخلة، أو (٢) متعاطفة بالواو'
      },
      {
        concept: 'الحال المفردة vs الحال الجملة',
        conceptAr: 'الفرق بين الحال المفردة والجملة',
        explanation: 'خائفًا is حال مفردة (single word in accusative). يترقب is حال جملة فعلية (verbal sentence). When a جملة is حال, the entire sentence is "in the position of accusative" (في محل نصب).',
        explanationAr: 'خائفًا حال مفردة (كلمة منصوبة). يترقب جملة فعلية حال. عندما تكون الجملة حالًا، تكون كلها "في محل نصب"'
      },
      {
        concept: 'الرابط في جملة الحال',
        conceptAr: 'ما يربط جملة الحال بصاحبها',
        explanation: 'Verbal sentence حال usually links to صاحب الحال via a hidden pronoun in the verb. In يترقبُ, the hidden هو refers back to the subject of خرج. This pronoun is the رابط (connector).',
        explanationAr: 'الجملة الفعلية الحالية ترتبط بصاحب الحال عادة بضمير مستتر في الفعل. في يترقبُ، الضمير المستتر (هو) يعود على فاعل خرج. هذا الضمير هو الرابط'
      },
      {
        concept: 'البلاغة في ترتيب الحالين',
        conceptAr: 'لماذا خائفًا قبل يترقب',
        explanation: 'The order is significant: خائفًا (internal state) comes before يترقب (external action). Fear is the cause, vigilance is the effect. This mirrors the psychological reality: first you feel fear, then you act cautiously.',
        explanationAr: 'الترتيب مقصود: خائفًا (حالة داخلية) قبل يترقب (فعل خارجي). الخوف سبب، والترقب نتيجة. هذا يعكس الواقع النفسي: تشعر بالخوف أولًا، ثم تتصرف بحذر'
      }
    ],

    teachingNotes: 'This Quranic verse (28:21) is perfect for teaching multiple حال. Draw a timeline: خرج happens, while TWO things are true simultaneously - he was خائفًا (internal) AND يترقبُ (external). Ask: why didn\'t the Quran say خائفًا مترقبًا (both as مفردة)? The جملة يترقب adds continuity - he kept watching, an ongoing action during the exit.',
    teachingNotesAr: 'هذه الآية القرآنية (القصص ٢١) مثالية لتعليم تعدد الحال. ارسم خطًا زمنيًا: خرج يحدث، بينما شيئان صحيحان في آن واحد - كان خائفًا (داخليًا) ويترقب (خارجيًا). اسأل: لماذا لم يقل القرآن خائفًا مترقبًا (كلاهما مفردة)؟ الجملة يترقب تضيف الاستمرار - ظل يراقب، فعل مستمر أثناء الخروج'
  },

  // Expert Analysis: Exercise 408 - المصدر العامل عمل فعله
  {
    exerciseId: 408,
    arabic: 'أَعْجَبَنِي إِكْرَامُ الْمُعَلِّمِ الطُّلَّابَ',
    translation: 'The teacher\'s honoring of the students pleased me',

    wordAnalysis: [
      {
        word: 'أَعْجَبَ',
        transliteration: '\'a\'jaba',
        grammaticalRole: 'Verb (فعل)',
        grammaticalRoleAr: 'فعل ماضٍ',
        caseMarking: 'Built on fatha',
        caseMarkingAr: 'مبني على الفتح',
        wordType: 'Past tense verb, Form IV',
        wordTypeAr: 'فعل ماضٍ من الباب الرابع (أفعَلَ)',
        notes: 'Root: ع-ج-ب (to wonder, please). Form IV makes it transitive: "to please someone"',
        notesAr: 'الجذر: ع-ج-ب. الباب الرابع يجعله متعديًا: "أعجبه الشيء"'
      },
      {
        word: 'ـنِي',
        transliteration: '-nee',
        grammaticalRole: 'Object pronoun (مفعول به)',
        grammaticalRoleAr: 'ضمير متصل في محل نصب مفعول به',
        caseMarking: 'In position of accusative',
        caseMarkingAr: 'في محل نصب',
        wordType: 'Attached pronoun (ياء المتكلم + نون الوقاية)',
        wordTypeAr: 'نون الوقاية + ياء المتكلم',
        notes: 'نون الوقاية inserted before ياء المتكلم to protect the verb',
        notesAr: 'النون تفصل بين الفعل وياء المتكلم لحماية الفعل من الكسر'
      },
      {
        word: 'إِكْرَامُ',
        transliteration: '\'ikraamu',
        grammaticalRole: 'Subject (فاعل) - also a working masdar',
        grammaticalRoleAr: 'فاعل (مصدر عامل عمل فعله)',
        caseMarking: 'Nominative (مرفوع) with damma',
        caseMarkingAr: 'مرفوع وعلامة رفعه الضمة الظاهرة',
        wordType: 'Masdar of Form IV (إفعال)',
        wordTypeAr: 'مصدر الباب الرابع على وزن إفعال',
        notes: 'This masdar WORKS like its verb - it takes a فاعل and مفعول به',
        notesAr: 'هذا المصدر يعمل عمل فعله - يأخذ فاعلًا ومفعولًا به'
      },
      {
        word: 'الْمُعَلِّمِ',
        transliteration: 'al-mu\'allimi',
        grammaticalRole: 'Doer of the masdar (فاعل للمصدر)',
        grammaticalRoleAr: 'فاعل للمصدر مجرور لفظًا مرفوع محلًا',
        caseMarking: 'Genitive by idafa, nominative in meaning',
        caseMarkingAr: 'مجرور لفظًا بالإضافة، مرفوع محلًا لأنه فاعل',
        wordType: 'Active participle used as noun (teacher)',
        wordTypeAr: 'اسم فاعل من علَّم (الباب الثاني)',
        notes: 'Though in idafa (genitive form), it is semantically the DOER of إكرام',
        notesAr: 'رغم كونه مضافًا إليه مجرورًا، هو فاعل المصدر معنىً'
      },
      {
        word: 'الطُّلَّابَ',
        transliteration: 'at-tullaaba',
        grammaticalRole: 'Object of the masdar (مفعول به للمصدر)',
        grammaticalRoleAr: 'مفعول به للمصدر',
        caseMarking: 'Accusative (منصوب) with fatha',
        caseMarkingAr: 'منصوب وعلامة نصبه الفتحة الظاهرة',
        wordType: 'Broken plural noun',
        wordTypeAr: 'جمع تكسير (طالب → طلاب)',
        notes: 'This is the object that receives the action of the masdar إكرام',
        notesAr: 'هذا المفعول الذي يقع عليه فعل المصدر (الإكرام)'
      }
    ],

    phraseAnalysis: [
      {
        phrase: 'أَعْجَبَنِي',
        phraseType: 'Verb + attached object pronoun',
        phraseTypeAr: 'فعل + ضمير مفعول به متصل',
        function: 'Main clause predicate with affected person',
        functionAr: 'الفعل الرئيسي مع المتأثر (المتكلم)',
        notes: 'The entire masdar phrase is the subject of this verb',
        notesAr: 'كامل تركيب المصدر هو فاعل هذا الفعل'
      },
      {
        phrase: 'إِكْرَامُ الْمُعَلِّمِ الطُّلَّابَ',
        phraseType: 'المصدر العامل (Working Masdar Construction)',
        phraseTypeAr: 'تركيب المصدر العامل عمل فعله',
        function: 'Subject of أعجب (contains its own فاعل and مفعول)',
        functionAr: 'فاعل أعجب، وهو يتضمن فاعله (المعلم) ومفعوله (الطلاب)',
        notes: 'Three-part structure: Masdar + its doer (in idafa) + its object (accusative)',
        notesAr: 'تركيب ثلاثي: المصدر + فاعله (بالإضافة) + مفعوله (منصوب)'
      },
      {
        phrase: 'إِكْرَامُ الْمُعَلِّمِ',
        phraseType: 'إضافة (Idafa)',
        phraseTypeAr: 'إضافة المصدر إلى فاعله',
        function: 'Masdar added to its doer',
        functionAr: 'المصدر مضاف، والمعلم مضاف إليه (وهو الفاعل)',
        notes: 'This idafa expresses the doer relationship, NOT possession',
        notesAr: 'هذه الإضافة تعبر عن علاقة الفاعلية، لا الملكية'
      }
    ],

    sentenceAnalysis: {
      sentenceType: 'Verbal sentence with masdar phrase as subject',
      sentenceTypeAr: 'جملة فعلية فاعلها مصدر مؤول بجملة',
      mainComponents: {
        subject: 'إِكْرَامُ الْمُعَلِّمِ الطُّلَّابَ (entire masdar phrase)',
        subjectAr: 'الفاعل: إكرامُ المعلمِ الطلابَ (تركيب مصدري كامل)',
        predicate: 'أَعْجَبَ',
        predicateAr: 'الفعل: أعجبَ',
        object: 'ـنِي (attached pronoun)',
        objectAr: 'المفعول به: ني (ياء المتكلم)'
      },
      structure: 'فعل + مفعول به (ضمير) + فاعل (مصدر عامل مع فاعله ومفعوله)',
      structureAr: 'تقدم المفعول به (الضمير) على الفاعل (المصدر) لاتصاله بالفعل'
    },

    keyGrammaticalConcepts: [
      {
        concept: 'المصدر العامل عمل فعله',
        conceptAr: 'متى يعمل المصدر عمل فعله',
        explanation: 'A masdar can "work" like its verb (take فاعل and مفعول) when it can be replaced by أنْ + الفعل. Here: أعجبني أن يُكرِمَ المعلمُ الطلابَ = أعجبني إكرامُ المعلمِ الطلابَ.',
        explanationAr: 'يعمل المصدر عمل فعله إذا صح تأويله بـ(أنْ والفعل). هنا: أعجبني أن يُكرِمَ المعلمُ الطلابَ = أعجبني إكرامُ المعلمِ الطلابَ'
      },
      {
        concept: 'إضافة المصدر إلى فاعله',
        conceptAr: 'المصدر المضاف إلى فاعله',
        explanation: 'When masdar is added to its DOER: المعلم is genitive (مجرور) in form due to idafa, but it is the DOER (فاعل) in meaning. We say: مجرور لفظًا، مرفوع محلًا.',
        explanationAr: 'عند إضافة المصدر لفاعله: المعلم مجرور لفظًا بالإضافة، لكنه فاعل معنىً. نقول: مجرور لفظًا، مرفوع محلًا'
      },
      {
        concept: 'مفعول المصدر',
        conceptAr: 'المصدر ينصب مفعولًا',
        explanation: 'Like its verb, the working masdar can take an accusative object. الطلابَ is منصوب as the object of إكرام. This object comes AFTER the idafa is complete.',
        explanationAr: 'كفعله، المصدر العامل ينصب مفعولًا. الطلابَ منصوب مفعول به للمصدر. هذا المفعول يأتي بعد اكتمال الإضافة'
      },
      {
        concept: 'الفرق بين الإضافة للفاعل والمفعول',
        conceptAr: 'إضافة المصدر لفاعله vs لمفعوله',
        explanation: 'Compare: إكرامُ المعلمِ الطلابَ (teacher honors students) vs إكرامُ الطلابِ (honoring of students - passive meaning, or students honor someone). Context determines which reading is correct.',
        explanationAr: 'قارن: إكرامُ المعلمِ الطلابَ (المعلم يُكرم) vs إكرامُ الطلابِ (إما المعنى المبني للمجهول، أو الطلاب يُكرمون). السياق يحدد المعنى'
      }
    ],

    teachingNotes: 'This is a crucial construction for advanced Arabic. Diagram it as: [أعجبَني] + [إكرامُ [المعلمِ]فاعل [الطلابَ]مفعول]. The masdar إكرام functions like a mini-sentence inside the main sentence. Compare with the verb form: أعجبني أن يُكرِمَ المعلمُ الطلابَ - the masdar compresses this into a noun phrase.',
    teachingNotesAr: 'هذا تركيب جوهري للعربية المتقدمة. ارسمه: [أعجبَني] + [إكرامُ [المعلمِ]فاعل [الطلابَ]مفعول]. المصدر إكرام يعمل كجملة صغيرة داخل الجملة الكبرى. قارن بالصيغة الفعلية: أعجبني أن يُكرِمَ المعلمُ الطلابَ - المصدر يضغط هذا في عبارة اسمية'
  },

  // ========== UNIT 13: NESTED SENTENCES (الجملة الصغرى) ==========

  // Expert Analysis: Exercise 419 - الجملة الاسمية خبر
  {
    exerciseId: 419,
    arabic: 'الْمُؤْمِنُ قَلْبُهُ مُطْمَئِنٌّ',
    translation: 'The believer - his heart is tranquil',

    wordAnalysis: [
      {
        word: 'الْمُؤْمِنُ',
        transliteration: 'al-mu\'minu',
        grammaticalRole: 'Subject (مبتدأ أول)',
        grammaticalRoleAr: 'مبتدأ أول',
        caseMarking: 'Nominative (مرفوع) with damma',
        caseMarkingAr: 'مرفوع وعلامة رفعه الضمة الظاهرة',
        wordType: 'Active participle (اسم فاعل)',
        wordTypeAr: 'اسم فاعل من آمَنَ يُؤمِنُ',
        notes: 'Form IV active participle; the first subject of the larger sentence',
        notesAr: 'اسم فاعل من الباب الرابع؛ المبتدأ الأول للجملة الكبرى'
      },
      {
        word: 'قَلْبُهُ',
        transliteration: 'qalbuhu',
        grammaticalRole: 'Subject of nested sentence (مبتدأ ثانٍ)',
        grammaticalRoleAr: 'مبتدأ ثانٍ',
        caseMarking: 'Nominative (مرفوع) with damma',
        caseMarkingAr: 'مرفوع وعلامة رفعه الضمة الظاهرة',
        wordType: 'Noun + attached pronoun',
        wordTypeAr: 'اسم مضاف + ضمير متصل',
        notes: 'قلبُ is مضاف, and ه is مضاف إليه (the connector/رابط)',
        notesAr: 'قلبُ مضاف، والهاء مضاف إليه (وهي الرابط بالجملة الكبرى)'
      },
      {
        word: 'مُطْمَئِنٌّ',
        transliteration: 'mutma\'innun',
        grammaticalRole: 'Predicate of nested sentence (خبر المبتدأ الثاني)',
        grammaticalRoleAr: 'خبر المبتدأ الثاني',
        caseMarking: 'Nominative (مرفوع) with damma + tanween',
        caseMarkingAr: 'مرفوع وعلامة رفعه الضمة الظاهرة',
        wordType: 'Active participle from اطمأنَّ (Form XII)',
        wordTypeAr: 'اسم فاعل من اطمأنَّ (الباب الثاني عشر)',
        notes: 'Derived from طمأنينة; describes state of tranquility',
        notesAr: 'مشتق من الطمأنينة؛ يصف حالة السكينة'
      }
    ],

    phraseAnalysis: [
      {
        phrase: 'الْمُؤْمِنُ',
        phraseType: 'First subject (مبتدأ أول)',
        phraseTypeAr: 'المبتدأ الأول - موضوع الجملة الكبرى',
        function: 'Topic of the larger sentence',
        functionAr: 'موضوع الحديث في الجملة الكبرى',
        notes: 'This is what the sentence is about',
        notesAr: 'هذا ما تتحدث عنه الجملة'
      },
      {
        phrase: 'قَلْبُهُ مُطْمَئِنٌّ',
        phraseType: 'Nested nominal sentence (جملة صغرى)',
        phraseTypeAr: 'جملة اسمية صغرى في محل رفع خبر',
        function: 'Predicate of المؤمنُ (entire sentence functions as خبر)',
        functionAr: 'خبر المبتدأ الأول (الجملة كلها في محل رفع)',
        notes: 'This entire nominal sentence is "in the position of رفع" as the predicate',
        notesAr: 'هذه الجملة الاسمية كلها في محل رفع خبر المبتدأ الأول'
      }
    ],

    sentenceAnalysis: {
      sentenceType: 'Nominal sentence with nominal predicate (جملة كبرى)',
      sentenceTypeAr: 'جملة اسمية كبرى خبرها جملة اسمية صغرى',
      mainComponents: {
        subject: 'الْمُؤْمِنُ (مبتدأ أول)',
        subjectAr: 'المبتدأ الأول: المؤمنُ',
        predicate: 'قَلْبُهُ مُطْمَئِنٌّ (جملة في محل رفع خبر)',
        predicateAr: 'الخبر: جملة (قلبُه مطمئنٌ) في محل رفع'
      },
      structure: 'مبتدأ أول + [مبتدأ ثانٍ + خبر ثانٍ] = خبر أول',
      structureAr: 'جملة كبرى: مبتدأ + جملة صغرى (مبتدأ + خبر) في محل رفع خبر'
    },

    keyGrammaticalConcepts: [
      {
        concept: 'الجملة الكبرى vs الجملة الصغرى',
        conceptAr: 'الفرق بين الجملة الكبرى والصغرى',
        explanation: 'الجملة الكبرى is a sentence whose خبر is itself a sentence (الجملة الصغرى). Here: المؤمنُ (مبتدأ) + [قلبُه مطمئنٌ] (جملة = خبر). The inner sentence is the صغرى.',
        explanationAr: 'الجملة الكبرى خبرها جملة (الصغرى). هنا: المؤمنُ (مبتدأ) + [قلبُه مطمئنٌ] (جملة = خبر). الجملة الداخلية هي الصغرى'
      },
      {
        concept: 'الرابط في الجملة الصغرى',
        conceptAr: 'شرط الرابط',
        explanation: 'When a sentence is a خبر, it MUST contain a رابط (connector) linking it back to the مبتدأ. Here the ه in قلبُه refers to المؤمن. Without this pronoun, the sentence would be disconnected.',
        explanationAr: 'عندما تكون الجملة خبرًا، يجب أن تحتوي رابطًا يربطها بالمبتدأ. هنا الهاء في قلبُه تعود على المؤمن. بدون هذا الضمير تكون الجملة منقطعة'
      },
      {
        concept: 'إعراب الجملة في محل رفع',
        conceptAr: 'الجملة التي لها محل من الإعراب',
        explanation: 'Sentences that fill grammatical positions have محل (position). Here قلبُه مطمئنٌ is "في محل رفع خبر". The sentence as a whole has the grammatical function of a single word (the predicate).',
        explanationAr: 'الجمل التي تشغل مواقع نحوية لها محل. هنا قلبُه مطمئنٌ "في محل رفع خبر". الجملة ككل تؤدي وظيفة كلمة واحدة (الخبر)'
      },
      {
        concept: 'أنواع الروابط',
        conceptAr: 'ما يربط الجملة الصغرى بالكبرى',
        explanation: 'The رابط can be: (1) ضمير like here (قلبُه), (2) إشارة as in: الكتاب هذا نافع, (3) تكرار as in: العلم العلمُ مفيد. The pronoun is most common.',
        explanationAr: 'الرابط يكون: (١) ضميرًا كما هنا (قلبُه)، (٢) إشارة: الكتاب هذا نافع، (٣) تكرارًا: العلم العلمُ مفيد. الضمير أكثرها شيوعًا'
      }
    ],

    teachingNotes: 'This structure is foundational for understanding Arabic sentence nesting. Draw two boxes: [المؤمنُ] + [قلبُه مطمئنٌ]. The second box is a complete sentence that serves as the predicate of the first word. Ask: What links them? The ه in قلبه points back to المؤمن. Compare with simple predicate: المؤمنُ مطمئنٌ.',
    teachingNotesAr: 'هذا التركيب أساسي لفهم التداخل الجملي في العربية. ارسم مربعين: [المؤمنُ] + [قلبُه مطمئنٌ]. المربع الثاني جملة كاملة تعمل خبرًا للكلمة الأولى. اسأل: ما الذي يربطهما؟ الهاء في قلبه تعود على المؤمن. قارن بالخبر المفرد: المؤمنُ مطمئنٌ'
  },

  // Expert Analysis: Exercise 429 - مقول القول (Reported Speech)
  {
    exerciseId: 429,
    arabic: 'قَالَ إِنِّي عَبْدُ اللَّهِ',
    translation: 'He said: Indeed I am a servant of Allah',

    wordAnalysis: [
      {
        word: 'قَالَ',
        transliteration: 'qaala',
        grammaticalRole: 'Verb (فعل)',
        grammaticalRoleAr: 'فعل ماضٍ',
        caseMarking: 'Built on fatha',
        caseMarkingAr: 'مبني على الفتح',
        wordType: 'Past tense verb, Form I (hollow)',
        wordTypeAr: 'فعل ماضٍ أجوف (ق-و-ل)',
        notes: 'The verb قال takes مقول القول as its object',
        notesAr: 'الفعل قال يأخذ مقول القول مفعولًا به'
      },
      {
        word: 'إِنِّي',
        transliteration: '\'innee',
        grammaticalRole: 'إنّ + attached pronoun (اسمها)',
        grammaticalRoleAr: 'إنّ الحرف الناسخ + ياء المتكلم اسمها',
        caseMarking: 'ي is in the position of accusative (اسم إنّ)',
        caseMarkingAr: 'الياء ضمير في محل نصب اسم إنّ',
        wordType: 'Particle + pronoun',
        wordTypeAr: 'حرف ناسخ + ضمير متصل',
        notes: 'إنّ enters upon a nominal sentence, making its مبتدأ accusative',
        notesAr: 'إنّ تدخل على الجملة الاسمية فتنصب المبتدأ'
      },
      {
        word: 'عَبْدُ',
        transliteration: '\'abdu',
        grammaticalRole: 'Predicate of إنّ (خبر إنّ)',
        grammaticalRoleAr: 'خبر إنّ',
        caseMarking: 'Nominative (مرفوع) with damma',
        caseMarkingAr: 'مرفوع وعلامة رفعه الضمة الظاهرة',
        wordType: 'Noun in idafa (مضاف)',
        wordTypeAr: 'اسم مضاف',
        notes: 'Remains رفع because it is the خبر of إنّ',
        notesAr: 'يبقى مرفوعًا لأنه خبر إنّ'
      },
      {
        word: 'اللَّهِ',
        transliteration: 'Allaahi',
        grammaticalRole: 'Possessor (مضاف إليه)',
        grammaticalRoleAr: 'مضاف إليه',
        caseMarking: 'Genitive (مجرور) with kasra',
        caseMarkingAr: 'مجرور وعلامة جره الكسرة الظاهرة',
        wordType: 'Proper noun (لفظ الجلالة)',
        wordTypeAr: 'لفظ الجلالة',
        notes: 'Genitive due to idafa with عبد',
        notesAr: 'مجرور بالإضافة إلى عبد'
      }
    ],

    phraseAnalysis: [
      {
        phrase: 'قَالَ',
        phraseType: 'Main verb (فعل القول)',
        phraseTypeAr: 'فعل القول',
        function: 'Introduces reported speech',
        functionAr: 'يُدخل الكلام المنقول (مقول القول)',
        notes: 'Subject is hidden pronoun (هو) referring to عيسى عليه السلام',
        notesAr: 'الفاعل ضمير مستتر (هو) يعود على عيسى عليه السلام'
      },
      {
        phrase: 'إِنِّي عَبْدُ اللَّهِ',
        phraseType: 'مقول القول (Reported Speech)',
        phraseTypeAr: 'جملة مقول القول في محل نصب مفعول به',
        function: 'Object of قال - the entire sentence is the مفعول به',
        functionAr: 'مفعول به للفعل قال - الجملة كلها في محل نصب',
        notes: 'This Quranic quote shows a complete sentence serving as the object',
        notesAr: 'هذه الآية القرآنية تُظهر جملة كاملة تعمل مفعولًا به'
      },
      {
        phrase: 'عَبْدُ اللَّهِ',
        phraseType: 'Idafa (إضافة)',
        phraseTypeAr: 'إضافة',
        function: 'Predicate of إنّ showing servitude',
        functionAr: 'خبر إنّ يُظهر العبودية',
        notes: 'The idafa structure: servant OF Allah',
        notesAr: 'تركيب الإضافة: عبدُ + الله'
      }
    ],

    sentenceAnalysis: {
      sentenceType: 'Verbal sentence with sentence-object',
      sentenceTypeAr: 'جملة فعلية مفعولها جملة (مقول القول)',
      mainComponents: {
        subject: 'هو (hidden pronoun)',
        subjectAr: 'الفاعل: ضمير مستتر تقديره هو',
        predicate: 'قَالَ',
        predicateAr: 'الفعل: قالَ',
        object: 'إِنِّي عَبْدُ اللَّهِ (جملة في محل نصب)',
        objectAr: 'المفعول به: جملة (إني عبدُ الله) في محل نصب'
      },
      structure: 'فعل + (فاعل مستتر) + جملة مقول القول',
      structureAr: 'فعل القول + فاعل + جملة في محل نصب مفعول به'
    },

    keyGrammaticalConcepts: [
      {
        concept: 'مقول القول',
        conceptAr: 'الجملة المحكية',
        explanation: 'مقول القول is the sentence that comes after verbs of speech (قال، ذكر، حكى). The entire sentence functions as the object. We say the جملة is في محل نصب مفعول به.',
        explanationAr: 'مقول القول هو الجملة التي تأتي بعد أفعال القول (قال، ذكر، حكى). الجملة كلها تعمل مفعولًا به. نقول: الجملة في محل نصب مفعول به'
      },
      {
        concept: 'الجمل التي لها محل من الإعراب',
        conceptAr: 'متى يكون للجملة محل',
        explanation: 'A sentence has محل when it occupies a position that could be filled by a single word. Here إني عبدُ الله could theoretically be replaced by a masdar: قال قولًا. This proves the جملة is في محل نصب.',
        explanationAr: 'للجملة محل عندما تشغل موقعًا يمكن أن تشغله كلمة واحدة. هنا يمكن نظريًا استبدال إني عبدُ الله بمصدر: قال قولًا. هذا يُثبت أن الجملة في محل نصب'
      },
      {
        concept: 'إنّ بعد القول',
        conceptAr: 'كسر همزة إنّ بعد القول',
        explanation: 'After قال, the hamza of إنّ is always كسرة (إِنّ not أَنّ) because it begins new reported speech. This is different from علمتُ أنّ (with fatha) where the clause is embedded.',
        explanationAr: 'بعد قال، همزة إنّ دائمًا مكسورة (إِنّ لا أَنّ) لأنها تبدأ كلامًا محكيًا جديدًا. هذا يختلف عن علمتُ أنّ (بالفتحة) حيث الجملة مُدمجة'
      },
      {
        concept: 'الحكاية vs التضمين',
        conceptAr: 'الفرق بين الحكاية والتضمين',
        explanation: 'قال takes حكاية (direct quote): قال إني... But علم takes تضمين (embedded clause): علمتُ أنّ الله غفور. The former preserves original speech; the latter integrates it grammatically.',
        explanationAr: 'قال يأخذ حكاية (اقتباس مباشر): قال إني... لكن علم يأخذ تضمينًا: علمتُ أنّ الله غفور. الأول يحفظ الكلام الأصلي؛ والثاني يُدمجه نحويًا'
      }
    ],

    teachingNotes: 'This is the miraculous first speech of عيسى in the cradle (Quran 19:30). Use it to teach مقول القول. Show that everything after قال is ONE grammatical unit - the object. Compare: قال كلمةً (single word object) vs قال إني عبدُ الله (sentence object). Both are في محل نصب.',
    teachingNotesAr: 'هذا كلام عيسى المعجز في المهد (مريم ٣٠). استخدمه لتعليم مقول القول. أظهر أن كل ما بعد قال وحدة نحوية واحدة - المفعول به. قارن: قال كلمةً (مفعول مفرد) vs قال إني عبدُ الله (مفعول جملة). كلاهما في محل نصب'
  },

  // Expert Analysis: Exercise 466 - الجملة النعتية (Sentence as Adjective)
  {
    exerciseId: 466,
    arabic: 'قَابَلْتُ شَيْخًا عِلْمُهُ غَزِيرٌ',
    translation: 'I met a sheikh whose knowledge is vast',

    wordAnalysis: [
      {
        word: 'قَابَلْتُ',
        transliteration: 'qaabaltu',
        grammaticalRole: 'Verb + subject pronoun',
        grammaticalRoleAr: 'فعل + فاعل',
        caseMarking: 'Built on sukun (before تُ)',
        caseMarkingAr: 'مبني على السكون، والتاء ضمير الفاعل',
        wordType: 'Past tense verb, Form III',
        wordTypeAr: 'فعل ماضٍ من الباب الثالث (فاعَلَ)',
        notes: 'Form III implies meeting face-to-face',
        notesAr: 'الباب الثالث يفيد المقابلة والمواجهة'
      },
      {
        word: 'شَيْخًا',
        transliteration: 'shaykhan',
        grammaticalRole: 'Object (مفعول به)',
        grammaticalRoleAr: 'مفعول به',
        caseMarking: 'Accusative (منصوب) with fatha + tanween',
        caseMarkingAr: 'منصوب وعلامة نصبه الفتحة الظاهرة',
        wordType: 'Indefinite noun (نكرة)',
        wordTypeAr: 'اسم نكرة',
        notes: 'Being نكرة allows it to be described by a sentence (الجملة النعتية)',
        notesAr: 'كونه نكرة يسمح بوصفه بجملة (النعت الجملي)'
      },
      {
        word: 'عِلْمُهُ',
        transliteration: '\'ilmuhu',
        grammaticalRole: 'Subject of nested sentence (مبتدأ)',
        grammaticalRoleAr: 'مبتدأ الجملة النعتية',
        caseMarking: 'Nominative (مرفوع) with damma',
        caseMarkingAr: 'مرفوع وعلامة رفعه الضمة الظاهرة',
        wordType: 'Noun + attached pronoun',
        wordTypeAr: 'اسم مضاف + ضمير متصل',
        notes: 'The ه is the رابط connecting back to شيخًا',
        notesAr: 'الهاء هي الرابط الذي يربط الجملة بالمنعوت'
      },
      {
        word: 'غَزِيرٌ',
        transliteration: 'ghazeerun',
        grammaticalRole: 'Predicate (خبر)',
        grammaticalRoleAr: 'خبر المبتدأ',
        caseMarking: 'Nominative (مرفوع) with damma + tanween',
        caseMarkingAr: 'مرفوع وعلامة رفعه الضمة الظاهرة',
        wordType: 'Adjective (صفة مشبهة)',
        wordTypeAr: 'صفة مشبهة على وزن فَعِيل',
        notes: 'Means abundant, copious, vast',
        notesAr: 'بمعنى كثير وافر'
      }
    ],

    phraseAnalysis: [
      {
        phrase: 'قَابَلْتُ شَيْخًا',
        phraseType: 'Main clause (verb + object)',
        phraseTypeAr: 'الجملة الرئيسية',
        function: 'Reports the meeting event',
        functionAr: 'تُخبر عن حدث اللقاء',
        notes: 'Complete verbal sentence that can stand alone',
        notesAr: 'جملة فعلية تامة يمكن أن تقف وحدها'
      },
      {
        phrase: 'عِلْمُهُ غَزِيرٌ',
        phraseType: 'Adjectival sentence (نعت جملة)',
        phraseTypeAr: 'جملة اسمية في محل نصب نعت',
        function: 'Describes شيخًا - entire sentence is the adjective',
        functionAr: 'تصف شيخًا - الجملة كلها نعت',
        notes: 'Nominal sentence functioning as an adjective; takes the case of the described noun',
        notesAr: 'جملة اسمية تعمل صفة؛ تأخذ محل المنعوت إعرابيًا'
      }
    ],

    sentenceAnalysis: {
      sentenceType: 'Verbal sentence with adjectival sentence',
      sentenceTypeAr: 'جملة فعلية فيها نعت جملة',
      mainComponents: {
        subject: 'تُ (attached pronoun)',
        subjectAr: 'الفاعل: التاء المتصلة (أنا)',
        predicate: 'قَابَلْ',
        predicateAr: 'الفعل: قابلَ',
        object: 'شَيْخًا (+ جملة نعت)',
        objectAr: 'المفعول به: شيخًا، والجملة (علمُه غزيرٌ) نعت له'
      },
      structure: 'فعل + فاعل + مفعول به (نكرة) + جملة نعت',
      structureAr: 'فعل + فاعل (ضمير) + مفعول به + جملة في محل نصب نعت'
    },

    keyGrammaticalConcepts: [
      {
        concept: 'النعت الجملي',
        conceptAr: 'الجملة الواقعة نعتًا',
        explanation: 'A sentence can describe a noun just like a single adjective. Compare: قابلتُ شيخًا كريمًا (single-word adjective) vs قابلتُ شيخًا علمُه غزيرٌ (sentence adjective). Both describe شيخًا.',
        explanationAr: 'يمكن للجملة أن تصف اسمًا كالصفة المفردة. قارن: قابلتُ شيخًا كريمًا (صفة مفردة) vs قابلتُ شيخًا علمُه غزيرٌ (صفة جملة). كلاهما يصف شيخًا'
      },
      {
        concept: 'شرط النكرة للنعت الجملي',
        conceptAr: 'لماذا يجب أن يكون المنعوت نكرة',
        explanation: 'Sentence adjectives only describe نكرة (indefinite) nouns. For معرفة (definite), use صلة الموصول: قابلتُ الشيخَ الذي علمُه غزيرٌ. This is a key difference in Arabic syntax.',
        explanationAr: 'الجمل النعتية تصف النكرات فقط. للمعارف نستخدم صلة الموصول: قابلتُ الشيخَ الذي علمُه غزيرٌ. هذا فرق جوهري في النحو العربي'
      },
      {
        concept: 'الرابط في النعت الجملي',
        conceptAr: 'ما يربط الجملة بالمنعوت',
        explanation: 'The sentence must contain a رابط (connector) - usually a pronoun referring to the noun being described. Here ه in علمُه refers back to شيخًا. Without it: *قابلتُ شيخًا العلمُ غزيرٌ is wrong.',
        explanationAr: 'يجب أن تحتوي الجملة رابطًا - عادة ضمير يعود على المنعوت. هنا الهاء في علمُه تعود على شيخًا. بدونها: *قابلتُ شيخًا العلمُ غزيرٌ خطأ'
      },
      {
        concept: 'إعراب الجملة النعتية',
        conceptAr: 'محل الجملة من الإعراب',
        explanation: 'The sentence takes the same إعراب position as its منعوت. Since شيخًا is منصوب, the sentence علمُه غزيرٌ is في محل نصب نعت. If we had مررتُ بشيخٍ علمُه غزيرٌ, the sentence would be في محل جر.',
        explanationAr: 'تأخذ الجملة نفس موقع منعوتها إعرابيًا. بما أن شيخًا منصوب، فالجملة في محل نصب نعت. لو قلنا مررتُ بشيخٍ علمُه غزيرٌ، لكانت الجملة في محل جر'
      }
    ],

    teachingNotes: 'Use this to introduce النعت الجملي. Write: قابلتُ شيخًا كريمًا vs قابلتُ شيخًا علمُه غزيرٌ. Both describe the same شيخ. Point out the رابط (ه) and ask: what would happen with المعرفة? You\'d need الذي: قابلتُ الشيخَ الذي علمُه غزيرٌ. The نكرة/معرفة distinction is crucial.',
    teachingNotesAr: 'استخدم هذا لتقديم النعت الجملي. اكتب: قابلتُ شيخًا كريمًا vs قابلتُ شيخًا علمُه غزيرٌ. كلاهما يصف الشيخ نفسه. أشر إلى الرابط (ه) واسأل: ماذا يحدث مع المعرفة؟ ستحتاج الذي: قابلتُ الشيخَ الذي علمُه غزيرٌ. التمييز بين النكرة والمعرفة جوهري'
  },

  // ========== UNIT 14: INDIRECTLY NESTED SENTENCES (الاسم المؤول) ==========

  // Expert Analysis: Exercise 493 - المصدر المؤول مبتدأ (Quranic)
  {
    exerciseId: 493,
    arabic: 'وَأَنْ تَصُومُوا خَيْرٌ لَكُمْ',
    translation: 'And that you fast is better for you',

    wordAnalysis: [
      {
        word: 'وَ',
        transliteration: 'wa-',
        grammaticalRole: 'Conjunction (حرف عطف)',
        grammaticalRoleAr: 'حرف عطف',
        caseMarking: 'No case (particles are not declined)',
        caseMarkingAr: 'مبني على الفتح',
        wordType: 'Particle',
        wordTypeAr: 'حرف عطف',
        notes: 'Connects this sentence to what precedes it',
        notesAr: 'يعطف هذه الجملة على ما قبلها'
      },
      {
        word: 'أَنْ',
        transliteration: '\'an',
        grammaticalRole: 'Subjunctive particle (حرف مصدري ناصب)',
        grammaticalRoleAr: 'حرف مصدري ونصب',
        caseMarking: 'No case (particles are not declined)',
        caseMarkingAr: 'مبني على السكون',
        wordType: 'Particle that creates مصدر مؤول',
        wordTypeAr: 'حرف مصدري ينصب الفعل المضارع',
        notes: 'أنْ + verb = interpreted masdar',
        notesAr: 'أنْ + الفعل = مصدر مؤول'
      },
      {
        word: 'تَصُومُوا',
        transliteration: 'tasuumuu',
        grammaticalRole: 'Verb in subjunctive (فعل مضارع منصوب)',
        grammaticalRoleAr: 'فعل مضارع منصوب',
        caseMarking: 'Subjunctive by deleting the ن (حذف النون)',
        caseMarkingAr: 'منصوب وعلامة نصبه حذف النون (من الأفعال الخمسة)',
        wordType: 'Present tense verb, 2nd person plural',
        wordTypeAr: 'فعل مضارع مسند إلى واو الجماعة',
        notes: 'Root: ص-و-م; the واو is the subject pronoun',
        notesAr: 'الجذر: ص-و-م؛ الواو ضمير متصل فاعل'
      },
      {
        word: 'خَيْرٌ',
        transliteration: 'khayrun',
        grammaticalRole: 'Predicate (خبر)',
        grammaticalRoleAr: 'خبر المبتدأ (المصدر المؤول)',
        caseMarking: 'Nominative (مرفوع) with damma + tanween',
        caseMarkingAr: 'مرفوع وعلامة رفعه الضمة الظاهرة',
        wordType: 'Elative noun (اسم تفضيل)',
        wordTypeAr: 'اسم تفضيل على وزن فَعْل',
        notes: 'خَيْر = أفعل التفضيل من الخير',
        notesAr: 'خيرٌ = أفضل، اسم تفضيل'
      },
      {
        word: 'لَكُمْ',
        transliteration: 'lakum',
        grammaticalRole: 'Prepositional phrase (جار ومجرور)',
        grammaticalRoleAr: 'جار ومجرور متعلق بـ(خير)',
        caseMarking: 'Pronoun in genitive position',
        caseMarkingAr: 'الكاف ضمير في محل جر',
        wordType: 'Preposition + attached pronoun',
        wordTypeAr: 'لام الجر + ضمير متصل',
        notes: 'Specifies for whom it is better',
        notesAr: 'يُحدد لمن الخيرية'
      }
    ],

    phraseAnalysis: [
      {
        phrase: 'أَنْ تَصُومُوا',
        phraseType: 'المصدر المؤول (Interpreted Masdar)',
        phraseTypeAr: 'مصدر مؤول في محل رفع مبتدأ',
        function: 'Subject of the sentence (مبتدأ)',
        functionAr: 'مبتدأ مؤخر للجملة',
        notes: 'أنْ تصوموا = صيامُكم (your fasting). The entire construction functions as a noun.',
        notesAr: 'أنْ تصوموا = صيامُكم. التركيب كله يعمل عمل الاسم'
      },
      {
        phrase: 'خَيْرٌ لَكُمْ',
        phraseType: 'Predicate with complement',
        phraseTypeAr: 'خبر ومتعلقه',
        function: 'Predicate describing the interpreted masdar',
        functionAr: 'خبر المبتدأ (المصدر المؤول)',
        notes: 'Describes the interpreted masdar as "better for you"',
        notesAr: 'يصف المصدر المؤول بأنه خيرٌ لكم'
      }
    ],

    sentenceAnalysis: {
      sentenceType: 'Nominal sentence with interpreted masdar as subject',
      sentenceTypeAr: 'جملة اسمية مبتدؤها مصدر مؤول',
      mainComponents: {
        subject: 'أَنْ تَصُومُوا (مصدر مؤول = صيامُكم)',
        subjectAr: 'المبتدأ: أنْ تصوموا (= صيامكم)',
        predicate: 'خَيْرٌ لَكُمْ',
        predicateAr: 'الخبر: خيرٌ لكم'
      },
      structure: 'مصدر مؤول (مبتدأ) + خبر + جار ومجرور',
      structureAr: '(أنْ + فعل مضارع منصوب) في محل رفع مبتدأ + خبر مرفوع'
    },

    keyGrammaticalConcepts: [
      {
        concept: 'المصدر المؤول',
        conceptAr: 'ما المصدر المؤول',
        explanation: 'المصدر المؤول is when أنْ/أنَّ + clause is interpreted as a single noun (masdar). أنْ تصوموا = صيامُكم. It occupies noun positions (subject, object, etc.) but keeps verbal structure inside.',
        explanationAr: 'المصدر المؤول هو تأويل (أنْ/أنَّ + جملة) باسم مفرد (مصدر). أنْ تصوموا = صيامُكم. يشغل مواقع الأسماء (مبتدأ، مفعول، الخ) لكن يحتفظ بالتركيب الفعلي داخله'
      },
      {
        concept: 'أنْ المصدرية',
        conceptAr: 'كيف تعمل أنْ',
        explanation: 'أنْ is a مصدرية particle that: (1) makes the مضارع منصوب, (2) creates a مصدر مؤول with it. Formula: أنْ + فعل مضارع منصوب = noun that can fill any noun position.',
        explanationAr: 'أنْ حرف مصدري: (١) ينصب المضارع، (٢) يُكوّن معه مصدرًا مؤولًا. المعادلة: أنْ + فعل مضارع منصوب = اسم يشغل أي موقع اسمي'
      },
      {
        concept: 'المصدر المؤول في محل رفع',
        conceptAr: 'المصدر المؤول مبتدأ',
        explanation: 'The مصدر مؤول can be: (1) مبتدأ like here, (2) فاعل as in: يجبُ أن تصدقَ, (3) نائب فاعل as in: يُقال أنّك ناجحٌ. In all cases it is في محل رفع.',
        explanationAr: 'المصدر المؤول يكون: (١) مبتدأ كما هنا، (٢) فاعلًا: يجبُ أن تصدقَ، (٣) نائب فاعل: يُقال أنّك ناجحٌ. في كل الحالات هو في محل رفع'
      },
      {
        concept: 'التحويل للمصدر الصريح',
        conceptAr: 'كيف نؤول المصدر',
        explanation: 'To find the interpreted meaning: أنْ + فعل = مصدر الفعل + فاعله كمضاف إليه. أنْ تصوموا = صيامُكم (your fasting). This test proves the phrase is a noun.',
        explanationAr: 'لإيجاد التأويل: أنْ + فعل = مصدر الفعل + فاعله كمضاف إليه. أنْ تصوموا = صيامُكم. هذا الاختبار يُثبت أن التركيب اسمي'
      }
    ],

    teachingNotes: 'This Quranic verse (2:184) is perfect for introducing المصدر المؤول as مبتدأ. Write on board: أنْ تصوموا = صيامُكم. Then show: صيامُكم خيرٌ لكم = أنْ تصوموا خيرٌ لكم. Both mean the same, proving the مصدر مؤول acts as a noun. Ask: what case is أنْ تصوموا? Answer: في محل رفع مبتدأ.',
    teachingNotesAr: 'هذه الآية (البقرة ١٨٤) مثالية لتقديم المصدر المؤول مبتدأً. اكتب: أنْ تصوموا = صيامُكم. ثم أظهر: صيامُكم خيرٌ لكم = أنْ تصوموا خيرٌ لكم. كلاهما بنفس المعنى، مما يُثبت أن المصدر المؤول يعمل عمل الاسم. اسأل: ما إعراب أنْ تصوموا؟ الجواب: في محل رفع مبتدأ'
  },

  // Expert Analysis: Exercise 502 - مصدران مؤولان معطوفان (Quranic)
  {
    exerciseId: 502,
    arabic: 'اعْلَمْ أَنَّ اللَّهَ شَدِيدُ الْعِقَابِ وَأَنَّ اللَّهَ غَفُورٌ رَحِيمٌ',
    translation: 'Know that Allah is severe in punishment and that Allah is Forgiving, Merciful',

    wordAnalysis: [
      {
        word: 'اعْلَمْ',
        transliteration: 'i\'lam',
        grammaticalRole: 'Command verb (فعل أمر)',
        grammaticalRoleAr: 'فعل أمر',
        caseMarking: 'Built on sukun',
        caseMarkingAr: 'مبني على السكون',
        wordType: 'Imperative verb, Form I',
        wordTypeAr: 'فعل أمر من عَلِمَ يَعْلَمُ',
        notes: 'علم is a verb of certainty that takes two objects or أنّ clause',
        notesAr: 'علم من أفعال اليقين تنصب مفعولين أو تأخذ أنّ'
      },
      {
        word: 'أَنَّ',
        transliteration: '\'anna',
        grammaticalRole: 'Emphatic particle (حرف مشبه بالفعل)',
        grammaticalRoleAr: 'حرف توكيد ونصب (من أخوات إنّ)',
        caseMarking: 'No case (particles are not declined)',
        caseMarkingAr: 'مبني على الفتح',
        wordType: 'Particle that creates مصدر مؤول',
        wordTypeAr: 'حرف مصدري ينصب المبتدأ',
        notes: 'أنَّ + اسم + خبر = مصدر مؤول',
        notesAr: 'أنَّ + اسم + خبر = مصدر مؤول'
      },
      {
        word: 'اللَّهَ',
        transliteration: 'Allaaha',
        grammaticalRole: 'Subject of أنّ (اسم أنّ)',
        grammaticalRoleAr: 'اسم أنّ منصوب',
        caseMarking: 'Accusative (منصوب) with fatha',
        caseMarkingAr: 'منصوب وعلامة نصبه الفتحة الظاهرة',
        wordType: 'Proper noun (لفظ الجلالة)',
        wordTypeAr: 'لفظ الجلالة',
        notes: 'أنّ makes the مبتدأ accusative',
        notesAr: 'أنّ تنصب المبتدأ فيصير اسمها'
      },
      {
        word: 'شَدِيدُ',
        transliteration: 'shadeedu',
        grammaticalRole: 'Predicate of أنّ (خبر أنّ)',
        grammaticalRoleAr: 'خبر أنّ الأولى',
        caseMarking: 'Nominative (مرفوع) with damma',
        caseMarkingAr: 'مرفوع وعلامة رفعه الضمة الظاهرة',
        wordType: 'Intensive adjective (صفة مشبهة)',
        wordTypeAr: 'صفة مشبهة على وزن فَعِيل',
        notes: 'مضاف إلى العقاب',
        notesAr: 'شديدُ مضاف، العقابِ مضاف إليه'
      },
      {
        word: 'الْعِقَابِ',
        transliteration: 'al-\'iqaabi',
        grammaticalRole: 'Possessor (مضاف إليه)',
        grammaticalRoleAr: 'مضاف إليه',
        caseMarking: 'Genitive (مجرور) with kasra',
        caseMarkingAr: 'مجرور وعلامة جره الكسرة',
        wordType: 'Verbal noun (مصدر)',
        wordTypeAr: 'مصدر عاقَبَ',
        notes: 'Means punishment',
        notesAr: 'العقاب مصدر من عاقَبَ'
      },
      {
        word: 'وَأَنَّ',
        transliteration: 'wa-\'anna',
        grammaticalRole: 'Conjunction + emphatic particle',
        grammaticalRoleAr: 'واو العطف + أنَّ',
        caseMarking: 'No case',
        caseMarkingAr: 'الواو حرف عطف، أنّ حرف مصدري',
        wordType: 'Particle combination',
        wordTypeAr: 'واو + أنَّ',
        notes: 'Introduces second مصدر مؤول coordinated with first',
        notesAr: 'تُدخل مصدرًا مؤولًا ثانيًا معطوفًا على الأول'
      },
      {
        word: 'غَفُورٌ رَحِيمٌ',
        transliteration: 'ghafuurun raheemun',
        grammaticalRole: 'Two predicates of second أنّ',
        grammaticalRoleAr: 'خبران لأنّ الثانية',
        caseMarking: 'Both nominative with damma + tanween',
        caseMarkingAr: 'مرفوعان وعلامة رفعهما الضمة',
        wordType: 'Intensive adjectives (صيغة مبالغة)',
        wordTypeAr: 'صيغتا مبالغة على وزن فَعُول وفَعِيل',
        notes: 'Both are خبر لأنّ, showing double predication',
        notesAr: 'كلاهما خبر لأنّ، تعدد الخبر'
      }
    ],

    phraseAnalysis: [
      {
        phrase: 'اعْلَمْ',
        phraseType: 'Command verb',
        phraseTypeAr: 'فعل الأمر',
        function: 'Commands to know/understand',
        functionAr: 'يأمر بالعلم والمعرفة',
        notes: 'Subject is hidden أنتَ; object is the double مصدر مؤول',
        notesAr: 'الفاعل أنتَ مستتر؛ المفعول به المصدران المؤولان'
      },
      {
        phrase: 'أَنَّ اللَّهَ شَدِيدُ الْعِقَابِ',
        phraseType: 'First مصدر مؤول',
        phraseTypeAr: 'مصدر مؤول أول في محل نصب مفعول به',
        function: 'First object of اعلم',
        functionAr: 'مفعول به أول لـ(اعلم)',
        notes: 'أنَّ + اسم + خبر = interpreted as single noun: شِدَّةُ عِقابِ اللهِ',
        notesAr: 'أنَّ + اسم + خبر = مصدر مؤول: شدةُ عقابِ الله'
      },
      {
        phrase: 'وَأَنَّ اللَّهَ غَفُورٌ رَحِيمٌ',
        phraseType: 'Second مصدر مؤول (معطوف)',
        phraseTypeAr: 'مصدر مؤول ثانٍ معطوف على الأول',
        function: 'Coordinated second object',
        functionAr: 'مفعول به ثانٍ معطوف على الأول',
        notes: 'Connected by واو; also في محل نصب: غُفرانُ اللهِ ورحمتُه',
        notesAr: 'معطوف بالواو؛ أيضًا في محل نصب: مغفرةُ الله ورحمتُه'
      }
    ],

    sentenceAnalysis: {
      sentenceType: 'Command sentence with two coordinated مصدر مؤول objects',
      sentenceTypeAr: 'جملة أمرية مفعولها مصدران مؤولان معطوفان',
      mainComponents: {
        subject: 'أنتَ (hidden)',
        subjectAr: 'الفاعل: ضمير مستتر (أنتَ)',
        predicate: 'اعْلَمْ',
        predicateAr: 'الفعل: اعلمْ',
        object: 'أَنَّ... وَأَنَّ... (two interpreted masdars)',
        objectAr: 'المفعول به: مصدران مؤولان معطوفان'
      },
      structure: 'فعل أمر + (فاعل مستتر) + مصدر مؤول + واو + مصدر مؤول معطوف',
      structureAr: 'أمر + مصدر مؤول (مفعول أول) + مصدر مؤول معطوف (مفعول ثانٍ)'
    },

    keyGrammaticalConcepts: [
      {
        concept: 'أَنَّ المشددة vs أَنْ المخففة',
        conceptAr: 'الفرق بين أَنَّ وأَنْ',
        explanation: 'أَنَّ (with shaddah) takes اسم + خبر and makes the اسم accusative. أَنْ (light) takes مضارع منصوب. Both create مصدر مؤول but from different structures.',
        explanationAr: 'أَنَّ (المشددة) تأخذ اسمًا وخبرًا وتنصب الاسم. أَنْ (المخففة) تأخذ مضارعًا منصوبًا. كلاهما يُكوّن مصدرًا مؤولًا لكن من تركيبين مختلفين'
      },
      {
        concept: 'عطف المصادر المؤولة',
        conceptAr: 'تعدد المصدر المؤول',
        explanation: 'Multiple مصدر مؤول phrases can be coordinated with و. Both remain في محل نصب as objects of اعلم. This creates a balanced, parallel structure in the verse.',
        explanationAr: 'يمكن عطف مصادر مؤولة متعددة بالواو. كلاهما يبقى في محل نصب مفعولًا لـ(اعلم). هذا يُنشئ تركيبًا متوازنًا في الآية'
      },
      {
        concept: 'البلاغة في الآية',
        conceptAr: 'الجمع بين الترهيب والترغيب',
        explanation: 'The verse balances شديد العقاب (fearsome) with غفور رحيم (hopeful). Neither attribute alone gives complete understanding. The command اعلم requires knowing BOTH truths about Allah.',
        explanationAr: 'الآية توازن بين شديد العقاب (ترهيب) وغفور رحيم (ترغيب). لا تكفي صفة واحدة. الأمر (اعلم) يتطلب معرفة كِلتا الحقيقتين عن الله'
      },
      {
        concept: 'تعدد الخبر',
        conceptAr: 'خبران لأنّ واحدة',
        explanation: 'In the second clause, أنّ has two predicates: غفورٌ and رحيمٌ. This is تعدد الخبر - multiple predicates describing the same subject. Both describe Allah\'s mercy.',
        explanationAr: 'في الجملة الثانية، لأنّ خبران: غفورٌ ورحيمٌ. هذا تعدد الخبر - أكثر من خبر يصف نفس الاسم. كلاهما يصف رحمة الله'
      }
    ],

    teachingNotes: 'This verse (5:98) is ideal for teaching أَنَّ المشددة and coordinated مصدر مؤول. Draw: اعلم → [أنّ الله شديد العقاب] + [وأنّ الله غفور رحيم]. Both boxes are objects. Convert to explicit masdars: اعلم شِدَّةَ عقابِ اللهِ ومغفرتَه ورحمتَه. Discuss why the verse presents both attributes together.',
    teachingNotesAr: 'هذه الآية (المائدة ٩٨) مثالية لتعليم أَنَّ المشددة والمصادر المؤولة المعطوفة. ارسم: اعلم → [أنّ الله شديد العقاب] + [وأنّ الله غفور رحيم]. كلا المربعين مفعول به. حوّل لمصادر صريحة: اعلم شِدَّةَ عقابِ اللهِ ومغفرتَه. ناقش لماذا تُقدم الآية الصفتين معًا'
  },

  // Expert Analysis: Exercise 539 - المصدر المؤول مضاف إليه
  {
    exerciseId: 539,
    arabic: 'قَبْلَ أَنْ تَخْرُجَ أَغْلِقِ الْبَابَ',
    translation: 'Before you leave, close the door',

    wordAnalysis: [
      {
        word: 'قَبْلَ',
        transliteration: 'qabla',
        grammaticalRole: 'Adverb of time (ظرف زمان)',
        grammaticalRoleAr: 'ظرف زمان منصوب',
        caseMarking: 'Accusative (منصوب) as adverb',
        caseMarkingAr: 'منصوب على الظرفية الزمانية',
        wordType: 'Time adverb (مضاف)',
        wordTypeAr: 'ظرف زمان مضاف',
        notes: 'قبل requires a مضاف إليه - here it is the مصدر مؤول',
        notesAr: 'قبل يحتاج مضافًا إليه - هنا المصدر المؤول'
      },
      {
        word: 'أَنْ',
        transliteration: '\'an',
        grammaticalRole: 'Subjunctive particle (حرف مصدري)',
        grammaticalRoleAr: 'حرف مصدري ونصب',
        caseMarking: 'No case (particles are not declined)',
        caseMarkingAr: 'مبني على السكون',
        wordType: 'Particle',
        wordTypeAr: 'حرف مصدري ينصب المضارع',
        notes: 'Creates مصدر مؤول with following verb',
        notesAr: 'يُكوّن مصدرًا مؤولًا مع الفعل التالي'
      },
      {
        word: 'تَخْرُجَ',
        transliteration: 'takhruja',
        grammaticalRole: 'Verb in subjunctive (فعل مضارع منصوب)',
        grammaticalRoleAr: 'فعل مضارع منصوب بأنْ',
        caseMarking: 'Subjunctive (منصوب) with fatha',
        caseMarkingAr: 'منصوب وعلامة نصبه الفتحة الظاهرة',
        wordType: 'Present tense verb, Form I',
        wordTypeAr: 'فعل مضارع ثلاثي مجرد',
        notes: 'Root: خ-ر-ج; subject is hidden أنتَ',
        notesAr: 'الجذر: خ-ر-ج؛ الفاعل ضمير مستتر (أنتَ)'
      },
      {
        word: 'أَغْلِقِ',
        transliteration: '\'aghliq',
        grammaticalRole: 'Command verb (فعل أمر)',
        grammaticalRoleAr: 'فعل أمر',
        caseMarking: 'Built on sukun (original), kasra for meeting two sukuns',
        caseMarkingAr: 'مبني على السكون، حُرك بالكسر لالتقاء الساكنين',
        wordType: 'Imperative verb, Form IV',
        wordTypeAr: 'فعل أمر من الباب الرابع (أفعَلَ)',
        notes: 'أغلَقَ يُغلِقُ أغلِقْ',
        notesAr: 'من أغلَقَ يُغلِقُ إغلاقًا'
      },
      {
        word: 'الْبَابَ',
        transliteration: 'al-baaba',
        grammaticalRole: 'Object (مفعول به)',
        grammaticalRoleAr: 'مفعول به',
        caseMarking: 'Accusative (منصوب) with fatha',
        caseMarkingAr: 'منصوب وعلامة نصبه الفتحة الظاهرة',
        wordType: 'Definite noun',
        wordTypeAr: 'اسم معرف بـ(ال)',
        notes: 'Object of أغلِقِ',
        notesAr: 'مفعول به للفعل أغلِقِ'
      }
    ],

    phraseAnalysis: [
      {
        phrase: 'قَبْلَ أَنْ تَخْرُجَ',
        phraseType: 'Adverbial phrase with مصدر مؤول',
        phraseTypeAr: 'ظرف + مصدر مؤول في محل جر مضاف إليه',
        function: 'Temporal adverb modifying the command',
        functionAr: 'ظرف زمان متعلق بـ(أغلق)',
        notes: 'قبلَ أنْ تخرجَ = قبلَ خروجِك (before your leaving)',
        notesAr: 'قبلَ أنْ تخرجَ = قبلَ خروجِك'
      },
      {
        phrase: 'أَنْ تَخْرُجَ',
        phraseType: 'المصدر المؤول (مضاف إليه)',
        phraseTypeAr: 'مصدر مؤول في محل جر مضاف إليه',
        function: 'Completes the meaning of قبل',
        functionAr: 'يُتم معنى الظرف (قبل)',
        notes: 'The entire أنْ + verb construction is في محل جر',
        notesAr: 'تركيب أنْ + فعل كله في محل جر مضاف إليه'
      },
      {
        phrase: 'أَغْلِقِ الْبَابَ',
        phraseType: 'Main command clause',
        phraseTypeAr: 'جملة الأمر الرئيسية',
        function: 'Main action being commanded',
        functionAr: 'الأمر الرئيسي المطلوب',
        notes: 'The adverb phrase قبلَ... specifies WHEN to do this',
        notesAr: 'شبه الجملة (قبلَ...) تُحدد وقت الأمر'
      }
    ],

    sentenceAnalysis: {
      sentenceType: 'Command sentence with temporal مصدر مؤول',
      sentenceTypeAr: 'جملة أمرية مع ظرف زمان مضاف إلى مصدر مؤول',
      mainComponents: {
        subject: 'أنتَ (hidden)',
        subjectAr: 'الفاعل: ضمير مستتر (أنتَ)',
        predicate: 'أَغْلِقِ',
        predicateAr: 'الفعل: أغلِقِ',
        object: 'الْبَابَ',
        objectAr: 'المفعول به: البابَ'
      },
      structure: 'ظرف + مصدر مؤول (مضاف إليه) + فعل أمر + مفعول به',
      structureAr: 'ظرف زمان مضاف + (أنْ + فعل مضارع منصوب) في محل جر مضاف إليه + جملة أمرية'
    },

    keyGrammaticalConcepts: [
      {
        concept: 'المصدر المؤول في محل جر',
        conceptAr: 'المصدر المؤول مضافًا إليه',
        explanation: 'When المصدر المؤول follows a مضاف like قبل, بعد, حين, it is في محل جر مضاف إليه. قبلَ أنْ تخرجَ = قبلَ خروجِك. The مصدر مؤول fills a genitive position.',
        explanationAr: 'عندما يأتي المصدر المؤول بعد مضاف مثل قبل، بعد، حين، يكون في محل جر مضاف إليه. قبلَ أنْ تخرجَ = قبلَ خروجِك. المصدر المؤول يشغل موقع المجرور'
      },
      {
        concept: 'الظروف المبهمة',
        conceptAr: 'لماذا تحتاج الظروف مضافًا إليه',
        explanation: 'قبل, بعد, فوق, تحت are "vague" (مبهم) - they need specification through إضافة. قبلَ alone means nothing; قبلَ الصلاةِ or قبلَ أنْ تصلّيَ specifies the time.',
        explanationAr: 'قبل، بعد، فوق، تحت ظروف "مبهمة" تحتاج تخصيصًا بالإضافة. قبلَ وحدها لا تعني شيئًا؛ قبلَ الصلاةِ أو قبلَ أنْ تصلّيَ تُحدد الوقت'
      },
      {
        concept: 'تقديم الظرف',
        conceptAr: 'الظرف في أول الجملة',
        explanation: 'The adverbial phrase قبلَ أنْ تخرجَ is fronted before the main verb. This is common in Arabic: the temporal context comes first, then the command. It emphasizes WHEN the action should happen.',
        explanationAr: 'شبه الجملة الظرفية (قبلَ أنْ تخرجَ) متقدمة على الفعل الرئيسي. هذا شائع في العربية: السياق الزمني أولًا ثم الأمر. يُبرز متى يجب أن يحدث الفعل'
      },
      {
        concept: 'التحويل للمصدر الصريح',
        conceptAr: 'اختبار المصدر المؤول',
        explanation: 'To verify: replace أنْ + verb with explicit masdar. قبلَ أنْ تخرجَ = قبلَ خروجِك. If the sentence works with a masdar, the أنْ clause is مصدر مؤول.',
        explanationAr: 'للتحقق: استبدل أنْ + فعل بمصدر صريح. قبلَ أنْ تخرجَ = قبلَ خروجِك. إذا عملت الجملة بمصدر، فـ(أنْ + فعل) مصدر مؤول'
      }
    ],

    teachingNotes: 'This everyday construction teaches المصدر المؤول in genitive position. Start with explicit: قبلَ خروجِك (before your leaving). Then show the مصدر مؤول version: قبلَ أنْ تخرجَ. Ask: what case is أنْ تخرج? Answer: في محل جر مضاف إليه. Practice with بعد، حتى، منذ، حين.',
    teachingNotesAr: 'هذا التركيب اليومي يُعلّم المصدر المؤول في محل الجر. ابدأ بالصريح: قبلَ خروجِك. ثم أظهر المؤول: قبلَ أنْ تخرجَ. اسأل: ما إعراب أنْ تخرج؟ الجواب: في محل جر مضاف إليه. تدرب مع بعد، حتى، منذ، حين'
  },

  // ═══════════════════════════════════════════════════════════════════════════════
  // UNIT 15: JOINING SENTENCES TOGETHER (رَبْطُ الْجُمَلِ) - Expert Analyses
  // ═══════════════════════════════════════════════════════════════════════════════

  // Expert Analysis: Exercise 566 - الجملة المعترضة
  {
    exerciseId: 566,
    arabic: 'وَإِنَّهُ لَقَسَمٌ - لَوْ تَعْلَمُونَ - عَظِيمٌ',
    translation: 'And indeed it is an oath - if you only knew - great',

    wordAnalysis: [
      {
        word: 'وَإِنَّهُ',
        transliteration: 'wa-innahu',
        grammaticalRole: 'Conjunction + emphatic particle + pronoun',
        grammaticalRoleAr: 'واو استئنافية + إنَّ + الهاء ضمير',
        caseMarking: 'الهاء اسم إنَّ في محل نصب',
        caseMarkingAr: 'الهاء ضمير متصل في محل نصب اسم إنَّ',
        wordType: 'Particle + attached pronoun',
        wordTypeAr: 'حرف توكيد ونصب + ضمير متصل',
        notes: 'The هاء refers to the oath (القسم)',
        notesAr: 'الهاء تعود على القسم المذكور'
      },
      {
        word: 'لَقَسَمٌ',
        transliteration: 'la-qasamun',
        grammaticalRole: 'Predicate of إنّ with emphatic لام',
        grammaticalRoleAr: 'اللام المزحلقة + خبر إنّ',
        caseMarking: 'Nominative (مرفوع) with damma and tanween',
        caseMarkingAr: 'مرفوع وعلامة رفعه الضمة الظاهرة',
        wordType: 'Masdar with emphatic لام',
        wordTypeAr: 'اللام المزحلقة + مصدر',
        notes: 'اللام المزحلقة for emphasis',
        notesAr: 'اللام المزحلقة للتوكيد'
      },
      {
        word: 'لَوْ',
        transliteration: 'law',
        grammaticalRole: 'Conditional particle (للتمني)',
        grammaticalRoleAr: 'حرف شرط غير جازم للتمني',
        caseMarking: 'No case (particle)',
        caseMarkingAr: 'مبني على السكون',
        wordType: 'Particle expressing wish',
        wordTypeAr: 'حرف شرط غير جازم',
        notes: 'Here لو expresses wish rather than counterfactual',
        notesAr: 'هنا (لو) للتمني لا للامتناع'
      },
      {
        word: 'تَعْلَمُونَ',
        transliteration: 'ta\'lamuuna',
        grammaticalRole: 'Verb of the parenthetical clause',
        grammaticalRoleAr: 'فعل مضارع مرفوع',
        caseMarking: 'Nominative with ن',
        caseMarkingAr: 'مرفوع وعلامة رفعه ثبوت النون',
        wordType: 'Present tense verb, plural masculine',
        wordTypeAr: 'فعل مضارع مرفوع بثبوت النون',
        notes: 'The object is omitted: لو تعلمون عظمته',
        notesAr: 'المفعول به محذوف تقديره: عظمتَه'
      },
      {
        word: 'عَظِيمٌ',
        transliteration: '\'azeemun',
        grammaticalRole: 'Adjective (نعت) for قسم',
        grammaticalRoleAr: 'نعت لقسم',
        caseMarking: 'Nominative following the noun it describes',
        caseMarkingAr: 'مرفوع وعلامة رفعه الضمة (تبع المنعوت)',
        wordType: 'Adjective (صفة مشبهة)',
        wordTypeAr: 'صفة مشبهة على وزن فَعِيل',
        notes: 'Separated from قسم by the معترضة clause',
        notesAr: 'فُصل عن (قسم) بالجملة المعترضة'
      }
    ],

    phraseAnalysis: [
      {
        phrase: 'وَإِنَّهُ لَقَسَمٌ',
        phraseType: 'Main clause (الجملة الرئيسية)',
        phraseTypeAr: 'جملة إنَّ واسمها وخبرها',
        function: 'Affirms the greatness of the oath',
        functionAr: 'تأكيد عظمة القسم',
        notes: 'إنّ + لام المزحلقة = double emphasis',
        notesAr: 'إنّ + اللام المزحلقة = توكيدان'
      },
      {
        phrase: 'لَوْ تَعْلَمُونَ',
        phraseType: 'Parenthetical clause (جملة معترضة)',
        phraseTypeAr: 'جملة معترضة لا محل لها من الإعراب',
        function: 'Interrupts to emphasize magnitude',
        functionAr: 'اعتراض للتعظيم والتفخيم',
        notes: 'Comes between the noun (قسم) and its adjective (عظيم)',
        notesAr: 'اعترضت بين النعت (عظيم) والمنعوت (قسم)'
      },
      {
        phrase: 'عَظِيمٌ',
        phraseType: 'Adjective completing the main clause',
        phraseTypeAr: 'نعت مؤخر عن الجملة المعترضة',
        function: 'Describes the oath',
        functionAr: 'يصف القسم',
        notes: 'Delayed after the parenthetical clause',
        notesAr: 'تأخر بعد الجملة المعترضة'
      }
    ],

    sentenceAnalysis: {
      sentenceType: 'Emphatic nominal sentence with parenthetical interruption',
      sentenceTypeAr: 'جملة اسمية مؤكدة فيها جملة معترضة',
      mainComponents: {
        subject: 'الهاء (ضمير)',
        subjectAr: 'اسم إنّ: الهاء في (إنّه)',
        predicate: 'لَقَسَمٌ عَظِيمٌ',
        predicateAr: 'خبر إنّ: قسمٌ + نعته: عظيمٌ'
      },
      structure: 'إنّ + اسم + [جملة معترضة] + خبر مع نعته',
      structureAr: 'واو + إنَّ + اسمها + (جملة معترضة) + خبرها مع نعته'
    },

    keyGrammaticalConcepts: [
      {
        concept: 'الجملة المعترضة',
        conceptAr: 'تعريف الجملة المعترضة',
        explanation: 'A parenthetical clause that interrupts the main sentence for emphasis or clarification. It has no grammatical position (لا محل لها من الإعراب). Here لو تعلمون interrupts between قسم and its adjective عظيم.',
        explanationAr: 'جملة تعترض بين جزأين من الكلام للتأكيد أو التوضيح. لا محل لها من الإعراب. هنا (لو تعلمون) اعترضت بين قسم ونعته عظيم'
      },
      {
        concept: 'مواضع الاعتراض',
        conceptAr: 'أين تقع الجملة المعترضة',
        explanation: 'Parenthetical clauses can occur: 1) Between subject and predicate, 2) Between verb and object, 3) Between noun and adjective, 4) Between إنّ\'s subject and predicate. This verse shows type 3.',
        explanationAr: 'تقع الجملة المعترضة: ١) بين المبتدأ والخبر ٢) بين الفعل والمفعول ٣) بين النعت والمنعوت ٤) بين اسم إنّ وخبرها. الآية من النوع الثالث'
      },
      {
        concept: 'اللام المزحلقة',
        conceptAr: 'لام التوكيد مع إنّ',
        explanation: 'Originally the لام belongs with the subject, but when إنّ is used, the لام "slides" to the predicate: إنّ اللهَ لَكريمٌ. This is اللام المزحلقة.',
        explanationAr: 'أصل اللام مع المبتدأ، لكن عند دخول إنّ تزحلقت للخبر. لذا سُميت اللام المزحلقة'
      }
    ],

    teachingNotes: 'This Quranic verse (56:76) demonstrates the parenthetical clause. Draw: [إنّه لقسم] ← (لو تعلمون) → [عظيم]. The parenthetical creates suspense and emphasis.',
    teachingNotesAr: 'هذه الآية (الواقعة ٧٦) تُظهر الجملة المعترضة بوضوح. ارسم: [إنّه لقسم] ← (لو تعلمون) → [عظيم]. الاعتراض يخلق توقعًا وتأكيدًا'
  },

  // Expert Analysis: Exercise 590 - الجملة الشرطية
  {
    exerciseId: 590,
    arabic: 'إِنْ تَنْصُرُوا اللَّهَ يَنْصُرْكُمْ وَيُثَبِّتْ أَقْدَامَكُمْ',
    translation: 'If you support Allah, He will support you and plant firmly your feet',

    wordAnalysis: [
      {
        word: 'إِنْ',
        transliteration: 'in',
        grammaticalRole: 'Conditional particle (أداة شرط جازمة)',
        grammaticalRoleAr: 'حرف شرط جازم',
        caseMarking: 'No case (particle)',
        caseMarkingAr: 'مبني على السكون',
        wordType: 'Jussive conditional particle',
        wordTypeAr: 'حرف شرط جازم لفعلين',
        notes: 'إن is the mother of conditional particles; it causes jazm',
        notesAr: 'إنْ أم أدوات الشرط الجازمة، تجزم فعلين'
      },
      {
        word: 'تَنْصُرُوا',
        transliteration: 'tansuruuu',
        grammaticalRole: 'Condition verb (فعل الشرط)',
        grammaticalRoleAr: 'فعل الشرط مجزوم',
        caseMarking: 'Jussive - حذف النون',
        caseMarkingAr: 'مجزوم وعلامة جزمه حذف النون',
        wordType: 'Present tense verb, plural, jussive',
        wordTypeAr: 'فعل مضارع مجزوم (من الأفعال الخمسة)',
        notes: 'Root: ن-ص-ر; the ن is deleted due to jazm',
        notesAr: 'الأصل: تنصرون، حُذفت النون للجزم'
      },
      {
        word: 'اللَّهَ',
        transliteration: 'Allaaha',
        grammaticalRole: 'Object (مفعول به)',
        grammaticalRoleAr: 'مفعول به منصوب',
        caseMarking: 'Accusative with fatha',
        caseMarkingAr: 'منصوب وعلامة نصبه الفتحة',
        wordType: 'Proper noun (لفظ الجلالة)',
        wordTypeAr: 'لفظ الجلالة',
        notes: 'نصر الله means supporting His religion',
        notesAr: 'نصر الله = نصر دينه وشرعه'
      },
      {
        word: 'يَنْصُرْكُمْ',
        transliteration: 'yansurkum',
        grammaticalRole: 'Answer to condition (جواب الشرط)',
        grammaticalRoleAr: 'جواب الشرط مجزوم',
        caseMarking: 'Jussive with sukun',
        caseMarkingAr: 'مجزوم وعلامة جزمه السكون',
        wordType: 'Present tense verb + object pronoun',
        wordTypeAr: 'فعل مضارع مجزوم + ضمير مفعول به',
        notes: 'The -كم is attached pronoun (object)',
        notesAr: 'الكاف والميم: ضمير متصل في محل نصب مفعول به'
      },
      {
        word: 'وَيُثَبِّتْ',
        transliteration: 'wa-yuthabbit',
        grammaticalRole: 'Coordinated answer to condition',
        grammaticalRoleAr: 'معطوف على جواب الشرط',
        caseMarking: 'Jussive with sukun',
        caseMarkingAr: 'مجزوم وعلامة جزمه السكون (عطف على المجزوم)',
        wordType: 'Present tense verb, Form II',
        wordTypeAr: 'فعل مضارع مجزوم من الباب الثاني (فَعَّلَ)',
        notes: 'ثبَّت is Form II; more intensive',
        notesAr: 'ثبَّت (فعَّل) أقوى من ثَبَتَ (فَعَلَ)'
      },
      {
        word: 'أَقْدَامَكُمْ',
        transliteration: 'aqdaamakum',
        grammaticalRole: 'Object of يثبّت',
        grammaticalRoleAr: 'مفعول به ليثبّت',
        caseMarking: 'Accusative with fatha',
        caseMarkingAr: 'منصوب وعلامة نصبه الفتحة',
        wordType: 'Plural noun + possessive pronoun',
        wordTypeAr: 'جمع تكسير + ضمير متصل مضاف إليه',
        notes: 'أقدام is broken plural of قَدَم',
        notesAr: 'أقدام جمع تكسير لـ(قَدَم)'
      }
    ],

    phraseAnalysis: [
      {
        phrase: 'إِنْ تَنْصُرُوا اللَّهَ',
        phraseType: 'Condition clause (جملة الشرط)',
        phraseTypeAr: 'جملة الشرط',
        function: 'States the condition for divine support',
        functionAr: 'تبيّن شرط حصول النصر الإلهي',
        notes: 'The condition: supporting Allah\'s cause',
        notesAr: 'الشرط: نصر دين الله'
      },
      {
        phrase: 'يَنْصُرْكُمْ',
        phraseType: 'First answer to condition',
        phraseTypeAr: 'جواب الشرط الأول',
        function: 'First result: Allah supports you',
        functionAr: 'النتيجة الأولى: نصر الله لكم',
        notes: 'Direct reciprocity',
        notesAr: 'تبادل مباشر: تنصرون الله ← ينصركم الله'
      },
      {
        phrase: 'وَيُثَبِّتْ أَقْدَامَكُمْ',
        phraseType: 'Second answer (معطوف)',
        phraseTypeAr: 'معطوف على جواب الشرط',
        function: 'Second result: Allah gives firmness',
        functionAr: 'النتيجة الثانية: تثبيت الأقدام',
        notes: 'تثبيت الأقدام: steadfastness in battle and faith',
        notesAr: 'تثبيت الأقدام: الثبات في الحرب وعلى الإيمان'
      }
    ],

    sentenceAnalysis: {
      sentenceType: 'Conditional sentence with two coordinated answers',
      sentenceTypeAr: 'جملة شرطية ذات جوابين معطوفين',
      mainComponents: {
        subject: 'واو الجماعة (أنتم)',
        subjectAr: 'الفاعل: واو الجماعة في تنصروا',
        predicate: 'الجملة الشرطية كلها',
        predicateAr: 'أداة الشرط + فعل الشرط + جوابان'
      },
      structure: 'إنْ + فعل الشرط + مفعول + جواب الشرط + واو + جواب معطوف',
      structureAr: 'حرف شرط + فعل شرط مجزوم + مفعول + جواب شرط مجزوم + جواب معطوف'
    },

    keyGrammaticalConcepts: [
      {
        concept: 'أدوات الشرط الجازمة',
        conceptAr: 'إنْ وأخواتها',
        explanation: 'إنْ is the primary conditional particle that causes jazm in two verbs: the condition and the answer. Other jussive conditionals include: مَن، ما، مهما، متى، أين، أينما، حيثما، أيّ.',
        explanationAr: 'إنْ حرف شرط يجزم فعلين: فعل الشرط وجوابه. من أخواتها الجازمة: مَن، ما، مهما، متى، أين، أينما، حيثما، أيّ'
      },
      {
        concept: 'جزم الأفعال الخمسة',
        conceptAr: 'علامة الجزم في الأفعال الخمسة',
        explanation: 'The five verb forms are marked jussive by deleting the ن: تنصرون → تنصروا. This is one of the three signs of jazm (sukun, deletion of ن, deletion of weak letter).',
        explanationAr: 'الأفعال الخمسة تُجزم بحذف النون: تنصرون → تنصروا. علامات الجزم ثلاث: السكون، حذف النون، حذف حرف العلة'
      },
      {
        concept: 'عطف الأجوبة',
        conceptAr: 'تعدد جواب الشرط',
        explanation: 'Multiple answers can be coordinated with و. All coordinated answers share the same jazm: ينصرْكم (jussive) → ويثبّتْ (also jussive by coordination).',
        explanationAr: 'يمكن عطف أكثر من جواب بالواو. المعطوف يتبع المعطوف عليه في الجزم: ينصرْكم (مجزوم) → ويثبّتْ (مجزوم بالعطف)'
      }
    ],

    teachingNotes: 'This verse (47:7) is perfect for teaching conditional sentences with إنْ. Show the jazm chain: إنْ → تنصروا (حذف النون) → ينصرْكم (سكون) → ويثبّتْ (سكون بالعطف).',
    teachingNotesAr: 'هذه الآية (محمد ٧) مثالية لتعليم الجملة الشرطية مع إنْ. أظهر سلسلة الجزم: إنْ → تنصروا (حذف النون) → ينصرْكم (سكون) → ويثبّتْ (سكون بالعطف)'
  },

  // Expert Analysis: Exercise 610 - الجملة الاستدراكية
  {
    exerciseId: 610,
    arabic: 'وَمَا رَمَيْتَ إِذْ رَمَيْتَ وَلَكِنَّ اللَّهَ رَمَى',
    translation: 'And you did not throw when you threw, but Allah threw',

    wordAnalysis: [
      {
        word: 'وَمَا',
        transliteration: 'wa-maa',
        grammaticalRole: 'Conjunction + negation particle',
        grammaticalRoleAr: 'واو عاطفة/استئنافية + ما النافية',
        caseMarking: 'No case (particles)',
        caseMarkingAr: 'ما: حرف نفي لا عمل له',
        wordType: 'Conjunction + negation',
        wordTypeAr: 'واو + ما النافية',
        notes: 'ما negates the past tense verb',
        notesAr: 'ما تنفي الفعل الماضي بعدها'
      },
      {
        word: 'رَمَيْتَ',
        transliteration: 'ramayta',
        grammaticalRole: 'Negated verb',
        grammaticalRoleAr: 'فعل ماضٍ منفي بـ(ما)',
        caseMarking: 'Built on sukun',
        caseMarkingAr: 'مبني على السكون لاتصاله بتاء الفاعل',
        wordType: 'Past tense verb + subject pronoun',
        wordTypeAr: 'فعل ماضٍ + تاء الفاعل',
        notes: 'Root: ر-م-ي',
        notesAr: 'الجذر: ر-م-ي'
      },
      {
        word: 'إِذْ',
        transliteration: 'idh',
        grammaticalRole: 'Time adverb (ظرف زمان)',
        grammaticalRoleAr: 'ظرف لما مضى من الزمان',
        caseMarking: 'Built on sukun, في محل نصب',
        caseMarkingAr: 'مبني على السكون في محل نصب ظرف زمان',
        wordType: 'Adverb of past time',
        wordTypeAr: 'ظرف زمان للماضي',
        notes: 'إذْ refers to a specific past moment',
        notesAr: 'إذْ تشير لوقت محدد في الماضي'
      },
      {
        word: 'رَمَيْتَ',
        transliteration: 'ramayta',
        grammaticalRole: 'Verb in إذ clause',
        grammaticalRoleAr: 'فعل ماضٍ في جملة إذ',
        caseMarking: 'Built on sukun',
        caseMarkingAr: 'مبني على السكون',
        wordType: 'Past tense verb (affirmed)',
        wordTypeAr: 'فعل ماضٍ (مُثبَت هذه المرة)',
        notes: 'Same verb, but now affirmed - paradox!',
        notesAr: 'نفس الفعل، لكنه مُثبَت هنا - مفارقة!'
      },
      {
        word: 'وَلَكِنَّ',
        transliteration: 'wa-laakinna',
        grammaticalRole: 'Adversative particle (حرف استدراك)',
        grammaticalRoleAr: 'واو الحال/العطف + لكنَّ',
        caseMarking: 'No case (لكنّ is a naasikh)',
        caseMarkingAr: 'لكنَّ من الحروف الناسخة تنصب الاسم',
        wordType: 'Adversative emphatic particle',
        wordTypeAr: 'واو + حرف استدراك ونصب',
        notes: 'لكنَّ takes اسم + خبر like إنَّ',
        notesAr: 'لكنَّ (المشددة) من أخوات إنَّ'
      },
      {
        word: 'اللَّهَ',
        transliteration: 'Allaaha',
        grammaticalRole: 'Subject of لكنّ (اسم لكنّ)',
        grammaticalRoleAr: 'اسم لكنّ منصوب',
        caseMarking: 'Accusative with fatha',
        caseMarkingAr: 'منصوب وعلامة نصبه الفتحة',
        wordType: 'Proper noun (لفظ الجلالة)',
        wordTypeAr: 'لفظ الجلالة',
        notes: 'The TRUE agent of the action',
        notesAr: 'الفاعل الحقيقي للرمي'
      },
      {
        word: 'رَمَى',
        transliteration: 'ramaa',
        grammaticalRole: 'Predicate of لكنّ (خبر جملة فعلية)',
        grammaticalRoleAr: 'خبر لكنّ جملة فعلية',
        caseMarking: 'Sentence in position of خبر',
        caseMarkingAr: 'جملة فعلية في محل رفع خبر لكنّ',
        wordType: 'Past tense verb',
        wordTypeAr: 'فعل ماضٍ من نفس الجذر',
        notes: 'Allah is the true thrower',
        notesAr: 'الله هو الرامي حقيقة'
      }
    ],

    phraseAnalysis: [
      {
        phrase: 'وَمَا رَمَيْتَ',
        phraseType: 'Negated statement',
        phraseTypeAr: 'جملة منفية',
        function: 'Negates the Prophet\'s independent action',
        functionAr: 'تنفي استقلال النبي ﷺ بالفعل',
        notes: 'You did NOT throw (as the true agent)',
        notesAr: 'لم ترمِ أنت (كفاعل حقيقي مستقل)'
      },
      {
        phrase: 'إِذْ رَمَيْتَ',
        phraseType: 'Temporal clause (جملة ظرفية)',
        phraseTypeAr: 'جملة في محل جر مضاف إليه',
        function: 'Acknowledges the physical action',
        functionAr: 'تُقر بحصول الفعل ظاهريًا',
        notes: 'The physical act of throwing occurred',
        notesAr: 'الفعل الظاهري حصل بالفعل'
      },
      {
        phrase: 'وَلَكِنَّ اللَّهَ رَمَى',
        phraseType: 'Adversative clause (جملة استدراكية)',
        phraseTypeAr: 'جملة لكنّ واسمها وخبرها',
        function: 'Corrects understanding: Allah was the true agent',
        functionAr: 'تصحح الفهم: الله هو الفاعل الحقيقي',
        notes: 'The استدراك attributes the real action to Allah',
        notesAr: 'الاستدراك ينسب الفعل الحقيقي لله'
      }
    ],

    sentenceAnalysis: {
      sentenceType: 'Complex adversative construction with temporal clause',
      sentenceTypeAr: 'تركيب استدراكي مع جملة ظرفية',
      mainComponents: {
        subject: 'أنت (negated), الله (affirmed)',
        subjectAr: 'أنت (منفي الاستقلال) | الله (مُثبَت الفاعلية)',
        predicate: 'رمى (negated for human, affirmed for Allah)',
        predicateAr: 'رمى (منفي عن الإنسان، مُثبَت لله)'
      },
      structure: 'نفي + ظرف (إذ + إثبات) + استدراك (لكنّ + اسم + خبر)',
      structureAr: 'ما + فعل + إذ + فعل + ولكنَّ + اسم + خبر (جملة فعلية)'
    },

    keyGrammaticalConcepts: [
      {
        concept: 'الاستدراك بلكنَّ',
        conceptAr: 'لكنَّ المشددة للاستدراك',
        explanation: 'لكنَّ (with shaddah) is one of إنّ\'s sisters. It takes اسم (accusative) and خبر (nominative). It indicates استدراك: correcting a potential misunderstanding from what preceded.',
        explanationAr: 'لكنَّ (المشددة) من أخوات إنّ، تنصب الاسم وترفع الخبر. تفيد الاستدراك: تصحيح فهم محتمل مما سبق'
      },
      {
        concept: 'المفارقة البلاغية',
        conceptAr: 'نفي وإثبات نفس الفعل',
        explanation: 'The verse contains a paradox: ما رميتَ (you did not throw) + إذ رميتَ (when you threw). Resolution: the Prophet threw physically (ظاهرًا), but Allah threw effectually (حقيقةً).',
        explanationAr: 'الآية تحمل مفارقة: ما رميتَ (نفي) + إذ رميتَ (إثبات). الحل: النبي ﷺ رمى ظاهرًا، لكن الله رمى حقيقة'
      },
      {
        concept: 'إذ الظرفية',
        conceptAr: 'إذ ظرف للماضي',
        explanation: 'إذْ is a time adverb for past events, meaning "when." The clause after إذ is مضاف إليه. إذ رميتَ = وقتَ رميِك.',
        explanationAr: 'إذْ ظرف زمان للماضي بمعنى "حين/وقت". الجملة بعدها في محل جر مضاف إليه. إذ رميتَ = وقتَ رميِك'
      }
    ],

    teachingNotes: 'This famous verse (8:17) demonstrates الاستدراك perfectly. Draw: [ما رميتَ] ← BUT → [الله رمى]. The إذ clause acknowledges physical reality while the main clause negates independent agency.',
    teachingNotesAr: 'هذه الآية الشهيرة (الأنفال ١٧) تُظهر الاستدراك بوضوح. ارسم: [ما رميتَ] ← لكن → [الله رمى]. جملة إذ تُقر الفعل الظاهري بينما الجملة الرئيسية تنفي الفاعلية المستقلة'
  },

  // ===========================================
  // UNIT 16: الاستثناء (Exception) - Expert Analyses
  // ===========================================

  // Example: Exercise 646 - The Shahada (الشهادة)
  {
    exerciseId: 646,
    arabic: 'لَا إِلَهَ إِلَّا اللَّهُ',
    translation: 'There is no god except Allah',

    wordAnalysis: [
      {
        word: 'لَا',
        transliteration: 'lā',
        grammaticalRole: 'لا النافية للجنس',
        grammaticalRoleAr: 'حرف نفي للجنس',
        caseMarking: 'Particle - no case',
        caseMarkingAr: 'حرف مبني على السكون',
        wordType: 'لا that negates the entire genus',
        wordTypeAr: 'لا التي تنفي الجنس بأكمله',
        notes: 'Negates existence of any deity at all',
        notesAr: 'تنفي وجود أي إله مطلقًا'
      },
      {
        word: 'إِلَهَ',
        transliteration: 'ilāha',
        grammaticalRole: 'اسم لا النافية للجنس',
        grammaticalRoleAr: 'اسم لا',
        caseMarking: 'Built on فتح (مبني على الفتح)',
        caseMarkingAr: 'مبني على الفتح في محل نصب',
        wordType: 'Noun - singular indefinite',
        wordTypeAr: 'اسم نكرة مفرد',
        notes: 'Any deity - indefinite because لا للجنس requires indefinite',
        notesAr: 'أي معبود - نكرة لأن لا للجنس تعمل في النكرات'
      },
      {
        word: 'إِلَّا',
        transliteration: 'illā',
        grammaticalRole: 'أداة استثناء',
        grammaticalRoleAr: 'أداة استثناء (حرف)',
        caseMarking: 'Particle - no case',
        caseMarkingAr: 'حرف مبني على السكون',
        wordType: 'Exception particle',
        wordTypeAr: 'أداة حصر واستثناء',
        notes: 'Creates الاستثناء المفرغ (emptied exception)',
        notesAr: 'تُحدث استثناءً مفرغًا (لا مستثنى منه ظاهر)'
      },
      {
        word: 'اللَّهُ',
        transliteration: 'Allāhu',
        grammaticalRole: 'بدل أو خبر لمبتدأ محذوف',
        grammaticalRoleAr: 'بدل من الضمير المستتر أو خبر لمحذوف',
        caseMarking: 'Nominative (رفع) - marked with ضمة',
        caseMarkingAr: 'مرفوع وعلامة رفعه الضمة',
        wordType: 'Proper noun - the Divine Name',
        wordTypeAr: 'اسم علم للذات الإلهية',
        notes: 'Raised because: (1) بدل from implied pronoun, or (2) خبر for محذوف: لا إله [موجودٌ/حقٌّ] إلا اللهُ',
        notesAr: 'مرفوع لأنه: (١) بدل من ضمير مستتر، أو (٢) خبر لمبتدأ محذوف تقديره: لا إله [حقٌّ] إلا اللهُ'
      }
    ],

    phraseAnalysis: [
      {
        phrase: 'لَا إِلَهَ',
        phraseType: 'لا واسمها (Negation of genus)',
        phraseTypeAr: 'لا النافية للجنس واسمها',
        function: 'Negates existence of any deity',
        functionAr: 'تنفي وجود أي معبود',
        notes: 'The خبر of لا is deleted: لا إله [موجودٌ/حقٌّ]',
        notesAr: 'خبر لا محذوف تقديره: موجودٌ أو حقٌّ'
      },
      {
        phrase: 'إِلَّا اللَّهُ',
        phraseType: 'Exception phrase (استثناء مفرغ)',
        phraseTypeAr: 'استثناء مفرغ',
        function: 'Affirms the only true deity',
        functionAr: 'يُثبت الإله الحق الوحيد',
        notes: 'Emptied exception: no explicit مستثنى منه',
        notesAr: 'استثناء مفرغ: لا مستثنى منه صريح'
      }
    ],

    sentenceAnalysis: {
      sentenceType: 'Nominal sentence with لا النافية للجنس + استثناء مفرغ',
      sentenceTypeAr: 'جملة اسمية منفية بـ لا النافية للجنس مع استثناء مفرغ',
      mainComponents: {
        subject: 'إله (negated), الله (excepted/affirmed)',
        subjectAr: 'إلهَ (منفي) | اللهُ (مستثنى/مُثبَت)',
        predicate: 'Deleted - estimated as موجود/حق',
        predicateAr: 'محذوف - تقديره موجود أو حق'
      },
      structure: 'لا + اسمها (مبني على الفتح) + [خبر محذوف] + إلا + مستثنى مرفوع',
      structureAr: 'لا النافية للجنس + اسمها + [خبر محذوف] + إلا + اسم مرفوع (بدل أو خبر)'
    },

    keyGrammaticalConcepts: [
      {
        concept: 'الاستثناء المفرغ',
        conceptAr: 'الاستثناء بدون مستثنى منه ظاهر',
        explanation: 'Emptied exception (مفرغ) occurs when the مستثنى منه is absent. In such cases, إلا acts like "only" and what follows takes the case required by the verb/context. Here: اللهُ is nominative as subject of implied existence.',
        explanationAr: 'الاستثناء المفرغ يحدث عندما يغيب المستثنى منه. في هذه الحالة، إلا بمعنى "فقط" وما بعدها يأخذ الإعراب المطلوب من الفعل/السياق. هنا: اللهُ مرفوع لأنه فاعل أو خبر'
      },
      {
        concept: 'لا النافية للجنس',
        conceptAr: 'لا التي تنفي الجنس كله',
        explanation: 'لا النافية للجنس negates the entire genus/category. It takes an indefinite noun (اسم نكرة) built on فتح when مفرد غير مضاف. Its خبر is often deleted when understood.',
        explanationAr: 'لا النافية للجنس تنفي الجنس بأكمله. تعمل في النكرات، واسمها يُبنى على الفتح إذا كان مفردًا غير مضاف. خبرها كثيرًا ما يُحذف إذا فُهم'
      },
      {
        concept: 'إعراب ما بعد إلا في المفرغ',
        conceptAr: 'ما بعد إلا يُعرب حسب موقعه',
        explanation: 'In استثناء مفرغ, the word after إلا takes the case its position requires. If subject position → nominative. If object → accusative. Here اللهُ is nominative.',
        explanationAr: 'في الاستثناء المفرغ، ما بعد إلا يُعرب حسب موقعه في الجملة. إذا كان في موضع الفاعل → رفع. في موضع المفعول → نصب. هنا اللهُ مرفوع'
      }
    ],

    teachingNotes: 'The Shahada is the most important sentence in Islam and demonstrates الاستثناء المفرغ perfectly. Draw: [لا إله (موجود)] ← EXCEPT → [الله]. The word اللهُ is raised because it fills the subject position in the implied affirmative clause.',
    teachingNotesAr: 'الشهادة أهم جملة في الإسلام وتُظهر الاستثناء المفرغ بوضوح. ارسم: [لا إله (موجود)] ← إلا → [الله]. لفظ الجلالة مرفوع لأنه يملأ موضع المبتدأ أو الخبر في الجملة الإثباتية المقدرة'
  },

  // Example: Exercise 659 - Disconnected Exception (الاستثناء المنقطع)
  {
    exerciseId: 659,
    arabic: 'فَسَجَدَ الْمَلَائِكَةُ كُلُّهُمْ أَجْمَعُونَ إِلَّا إِبْلِيسَ',
    translation: 'So the angels prostrated - all of them entirely - except Iblis',

    wordAnalysis: [
      {
        word: 'فَسَجَدَ',
        transliteration: 'fa-sajada',
        grammaticalRole: 'فعل ماضٍ',
        grammaticalRoleAr: 'فعل ماضٍ',
        caseMarking: 'Built on فتح',
        caseMarkingAr: 'مبني على الفتح',
        wordType: 'Past tense verb + conjunctive فاء',
        wordTypeAr: 'فعل ماضٍ + فاء عاطفة أو فصيحة',
        notes: 'Prostrated - the فاء shows sequence',
        notesAr: 'سجدَ - الفاء تدل على الترتيب والتعقيب'
      },
      {
        word: 'الْمَلَائِكَةُ',
        transliteration: 'al-malāʾikatu',
        grammaticalRole: 'فاعل',
        grammaticalRoleAr: 'فاعل',
        caseMarking: 'Nominative (رفع) - marked with ضمة',
        caseMarkingAr: 'مرفوع وعلامة رفعه الضمة',
        wordType: 'Plural noun - الملائكة',
        wordTypeAr: 'جمع تكسير من ملك',
        notes: 'The angels - this is the مستثنى منه',
        notesAr: 'الملائكة - هذا هو المستثنى منه'
      },
      {
        word: 'كُلُّهُمْ',
        transliteration: 'kulluhum',
        grammaticalRole: 'توكيد معنوي',
        grammaticalRoleAr: 'توكيد معنوي',
        caseMarking: 'Nominative (رفع) following الملائكة',
        caseMarkingAr: 'مرفوع تبعًا للملائكة',
        wordType: 'Emphatic noun (توكيد)',
        wordTypeAr: 'لفظ توكيد معنوي',
        notes: 'All of them - first level of emphasis',
        notesAr: 'كلهم - توكيد أول (جميعهم)'
      },
      {
        word: 'أَجْمَعُونَ',
        transliteration: 'ajmaʿūna',
        grammaticalRole: 'توكيد ثانٍ',
        grammaticalRoleAr: 'توكيد معنوي ثانٍ',
        caseMarking: 'Nominative (رفع) - marked with و',
        caseMarkingAr: 'مرفوع وعلامة رفعه الواو (جمع مذكر سالم)',
        wordType: 'Second emphatic (أجمع/جمعاء)',
        wordTypeAr: 'توكيد من ألفاظ التوكيد المعنوي',
        notes: 'Entirely/altogether - strengthens كلهم',
        notesAr: 'جميعًا/بأسرهم - يؤكد كلهم'
      },
      {
        word: 'إِلَّا',
        transliteration: 'illā',
        grammaticalRole: 'أداة استثناء',
        grammaticalRoleAr: 'أداة استثناء (حرف)',
        caseMarking: 'Particle - no case',
        caseMarkingAr: 'حرف مبني على السكون',
        wordType: 'Exception particle',
        wordTypeAr: 'حرف استثناء',
        notes: 'Introduces the excepted entity',
        notesAr: 'تُدخل المستثنى'
      },
      {
        word: 'إِبْلِيسَ',
        transliteration: 'iblīsa',
        grammaticalRole: 'مستثنى منقطع',
        grammaticalRoleAr: 'مستثنى منصوب (استثناء منقطع)',
        caseMarking: 'Accusative (نصب) - marked with فتحة',
        caseMarkingAr: 'منصوب وعلامة نصبه الفتحة (ممنوع من الصرف)',
        wordType: 'Proper noun - foreign origin (diptote)',
        wordTypeAr: 'اسم علم أعجمي (ممنوع من الصرف)',
        notes: 'Iblis was NOT from the angels - hence منقطع',
        notesAr: 'إبليس ليس من الملائكة - لذا استثناء منقطع'
      }
    ],

    phraseAnalysis: [
      {
        phrase: 'الْمَلَائِكَةُ كُلُّهُمْ أَجْمَعُونَ',
        phraseType: 'Subject with double emphasis',
        phraseTypeAr: 'فاعل مع توكيدين',
        function: 'Emphasizes totality - no angel was left out',
        functionAr: 'تؤكد الشمول - لم يتخلف ملك',
        notes: 'كلهم + أجمعون = double emphasis showing complete unanimity',
        notesAr: 'كلهم + أجمعون = توكيد مزدوج يُظهر الإجماع التام'
      },
      {
        phrase: 'إِلَّا إِبْلِيسَ',
        phraseType: 'Disconnected exception (استثناء منقطع)',
        phraseTypeAr: 'استثناء منقطع',
        function: 'Excludes one who was NOT from the angels',
        functionAr: 'يستثني من ليس من جنس الملائكة',
        notes: 'Iblis was from Jinn (كان من الجن) - not an angel',
        notesAr: 'إبليس كان من الجن - وليس من الملائكة'
      }
    ],

    sentenceAnalysis: {
      sentenceType: 'Verbal sentence with disconnected exception',
      sentenceTypeAr: 'جملة فعلية مع استثناء منقطع',
      mainComponents: {
        subject: 'الملائكة (with emphatics كلهم أجمعون)',
        subjectAr: 'الملائكة + توكيدان (كلهم، أجمعون)',
        predicate: 'سجدوا (understood from فسجد)',
        predicateAr: 'السجود (مفهوم من فسجد)'
      },
      structure: 'فعل + فاعل + توكيد + توكيد + إلا + مستثنى منقطع',
      structureAr: 'ف + فعل ماضٍ + فاعل + توكيد أول + توكيد ثانٍ + إلا + مستثنى منقطع منصوب'
    },

    keyGrammaticalConcepts: [
      {
        concept: 'الاستثناء المنقطع',
        conceptAr: 'المستثنى ليس من جنس المستثنى منه',
        explanation: 'Disconnected exception (منقطع) occurs when the مستثنى is NOT from the same genus as المستثنى منه. Iblis was from the Jinn, not from the angels. The مستثنى منقطع is ALWAYS منصوب.',
        explanationAr: 'الاستثناء المنقطع يحدث عندما لا يكون المستثنى من جنس المستثنى منه. إبليس كان من الجن لا من الملائكة. المستثنى المنقطع منصوب دائمًا'
      },
      {
        concept: 'تعدد التوكيد',
        conceptAr: 'كل + أجمع توكيدان',
        explanation: 'Arabic allows multiple emphatics for stronger emphasis. كل emphasizes "all/every" while أجمع/جمعاء adds "entirely/without exception." They must follow the same case as the noun they emphasize.',
        explanationAr: 'العربية تسمح بتعدد التوكيد للمبالغة. كل تؤكد "الجميع" وأجمع/أجمعون تضيف "بأسرهم". تتبع إعراب المؤكَّد'
      },
      {
        concept: 'إبليس اسم أعجمي',
        conceptAr: 'ممنوع من الصرف للعجمة والعلمية',
        explanation: 'إبليس is a proper noun of foreign origin, making it a diptote (ممنوع من الصرف). It takes فتحة instead of كسرة in genitive, and no tanween.',
        explanationAr: 'إبليس اسم علم أعجمي، ممنوع من الصرف. يُجر بالفتحة بدل الكسرة، ولا ينوّن'
      }
    ],

    teachingNotes: 'This Quranic verse (15:30, 38:73) shows الاستثناء المنقطع. Key point: Iblis was "among" the angels (كان من الجن ففسق) but not OF them. Draw: [الملائكة كلهم] → سجدوا | [إبليس] → لم يسجد (لكنه ليس منهم أصلًا).',
    teachingNotesAr: 'هذه الآية القرآنية (الحجر ٣٠، ص ٧٣) تُظهر الاستثناء المنقطع. النقطة الرئيسية: إبليس كان "في" الملائكة لكن ليس "منهم" (كان من الجن). ارسم: [الملائكة كلهم] → سجدوا | [إبليس] → أبى (لكنه ليس من جنسهم)'
  },

  // Example: Exercise 668 - Exception with Purpose Clause
  {
    exerciseId: 668,
    arabic: 'وَمَا خَلَقْتُ الْجِنَّ وَالْإِنْسَ إِلَّا لِيَعْبُدُونِ',
    translation: 'And I did not create jinn and mankind except to worship Me',

    wordAnalysis: [
      {
        word: 'وَمَا',
        transliteration: 'wa-mā',
        grammaticalRole: 'واو عاطفة + ما النافية',
        grammaticalRoleAr: 'حرف عطف + حرف نفي',
        caseMarking: 'Particles - no case',
        caseMarkingAr: 'حرفان مبنيان',
        wordType: 'Conjunction + negation particle',
        wordTypeAr: 'واو العطف + ما النافية',
        notes: 'ما here negates the verb خلقتُ',
        notesAr: 'ما هنا تنفي الفعل خلقتُ'
      },
      {
        word: 'خَلَقْتُ',
        transliteration: 'khalaqtu',
        grammaticalRole: 'فعل ماضٍ + فاعل',
        grammaticalRoleAr: 'فعل ماضٍ والتاء فاعل',
        caseMarking: 'Built on السكون (before ت)',
        caseMarkingAr: 'مبني على السكون لاتصاله بتاء الفاعل',
        wordType: 'Past verb + pronoun subject',
        wordTypeAr: 'فعل ماضٍ + ضمير رفع متصل (التاء)',
        notes: 'The تُ refers to Allah - Divine speech',
        notesAr: 'التاء تعود على الله - كلام الله تعالى'
      },
      {
        word: 'الْجِنَّ',
        transliteration: 'al-jinna',
        grammaticalRole: 'مفعول به',
        grammaticalRoleAr: 'مفعول به',
        caseMarking: 'Accusative (نصب) - marked with فتحة',
        caseMarkingAr: 'منصوب وعلامة نصبه الفتحة',
        wordType: 'Collective noun for jinn',
        wordTypeAr: 'اسم جنس جمعي',
        notes: 'The jinn - unseen creation from fire',
        notesAr: 'الجن - مخلوقات من نار لا نراها'
      },
      {
        word: 'وَالْإِنْسَ',
        transliteration: 'wa-l-insa',
        grammaticalRole: 'معطوف على الجن',
        grammaticalRoleAr: 'معطوف منصوب',
        caseMarking: 'Accusative (نصب) - marked with فتحة',
        caseMarkingAr: 'منصوب وعلامة نصبه الفتحة',
        wordType: 'Collective noun for humans',
        wordTypeAr: 'اسم جنس جمعي',
        notes: 'Mankind - coordinated with الجن',
        notesAr: 'الإنس - معطوف على الجن'
      },
      {
        word: 'إِلَّا',
        transliteration: 'illā',
        grammaticalRole: 'أداة استثناء/حصر',
        grammaticalRoleAr: 'أداة استثناء (للحصر)',
        caseMarking: 'Particle - no case',
        caseMarkingAr: 'حرف مبني',
        wordType: 'Exception particle (here = only)',
        wordTypeAr: 'أداة حصر (بمعنى: فقط)',
        notes: 'Creates استثناء مفرغ - means "only for"',
        notesAr: 'استثناء مفرغ - بمعنى "لأجل فقط"'
      },
      {
        word: 'لِيَعْبُدُونِ',
        transliteration: 'li-yaʿbudūni',
        grammaticalRole: 'مصدر مؤول في محل نصب مفعول لأجله',
        grammaticalRoleAr: 'لام التعليل + فعل مضارع منصوب + نون الوقاية + ياء المتكلم',
        caseMarking: 'Subjunctive (نصب) - marked with حذف النون',
        caseMarkingAr: 'منصوب بأن مضمرة وعلامة نصبه حذف النون',
        wordType: 'Purpose clause (لام التعليل)',
        wordTypeAr: 'فعل مضارع منصوب بأن مضمرة بعد لام التعليل',
        notes: 'The مصدر مؤول = العبادة (worship)',
        notesAr: 'المصدر المؤول = أن يعبدوني = عبادتهم إياي'
      }
    ],

    phraseAnalysis: [
      {
        phrase: 'مَا خَلَقْتُ الْجِنَّ وَالْإِنْسَ',
        phraseType: 'Negated verbal sentence',
        phraseTypeAr: 'جملة فعلية منفية',
        function: 'Negates creation for any purpose other than...',
        functionAr: 'تنفي الخلق لأي غرض آخر',
        notes: 'The negation sets up the استثناء مفرغ',
        notesAr: 'النفي يُمهّد للاستثناء المفرغ'
      },
      {
        phrase: 'لِيَعْبُدُونِ',
        phraseType: 'Purpose clause (مصدر مؤول)',
        phraseTypeAr: 'مصدر مؤول في محل نصب',
        function: 'Expresses the sole purpose of creation',
        functionAr: 'يُعبّر عن الغاية الوحيدة من الخلق',
        notes: 'لام التعليل + أن مضمرة + فعل مضارع = مصدر مؤول',
        notesAr: 'ل + أن (مضمرة) + يعبدوا = أن يعبدوني = عبادتهم'
      }
    ],

    sentenceAnalysis: {
      sentenceType: 'Negated verbal with emptied exception (purpose)',
      sentenceTypeAr: 'جملة فعلية منفية مع استثناء مفرغ (غرض)',
      mainComponents: {
        subject: 'تُ (ضمير الفاعل - الله)',
        subjectAr: 'التاء في خلقتُ (عائدة على الله)',
        predicate: 'خلقتُ (negated for other purposes)',
        predicateAr: 'خلقتُ (منفي لغير العبادة)'
      },
      structure: 'ما + فعل + فاعل + مفعول به + إلا + مصدر مؤول (مفعول لأجله)',
      structureAr: 'ما النافية + فعل ماضٍ + ت الفاعل + مفعول به + إلا + مصدر مؤول = مفعول لأجله'
    },

    keyGrammaticalConcepts: [
      {
        concept: 'الاستثناء المفرغ مع المصدر المؤول',
        conceptAr: 'إلا + لام التعليل = حصر الغرض',
        explanation: 'When إلا is followed by a purpose clause (ل + مضارع), it creates an emptied exception expressing "only for X purpose." The مصدر مؤول (أن يعبدوني) fills the position of مفعول لأجله.',
        explanationAr: 'عندما تتبع إلا جملة غرض (ل + مضارع)، تُنشئ استثناءً مفرغًا بمعنى "لأجل X فقط". المصدر المؤول يملأ موضع مفعول لأجله'
      },
      {
        concept: 'لام التعليل وأن المضمرة',
        conceptAr: 'اللام تنصب المضارع بأن مضمرة',
        explanation: 'لام التعليل (purpose لام) causes the following مضارع to be منصوب through an implied أن. يعبدون → يعبدوا (dropped ن). The whole = مصدر مؤول.',
        explanationAr: 'لام التعليل تُضمر أن فتنصب المضارع. يعبدون → يعبدوا (حُذفت النون). الكل = مصدر مؤول'
      },
      {
        concept: 'نون الوقاية',
        conceptAr: 'نون تقي الفعل من الكسر',
        explanation: 'نون الوقاية is inserted before ياء المتكلم to protect the verb from the كسرة that would precede ي. يعبدوني = يعبدو + ن (وقاية) + ي.',
        explanationAr: 'نون الوقاية تُدخل قبل ياء المتكلم لتقي الفعل من الكسرة. يعبدوني = يعبدوا + ن + ي'
      }
    ],

    teachingNotes: 'This foundational verse (51:56) shows استثناء مفرغ with a purpose clause. The meaning: "I created them for NO purpose EXCEPT worship." Draw: خلقت الجن والإنس ← لماذا؟ ← [إلا] ← لِيعبدوني. Key: the مصدر مؤول fills the مفعول لأجله slot.',
    teachingNotesAr: 'هذه الآية الأساسية (الذاريات ٥٦) تُظهر الاستثناء المفرغ مع جملة غرض. المعنى: ما خلقتهم لأي غرض إلا العبادة. ارسم: خلقت الجن والإنس ← لماذا؟ ← [إلا] ← ليعبدوني. المفتاح: المصدر المؤول يملأ موضع مفعول لأجله'
  },

  // ===========================================
  // UNIT 17: الممنوع من الصرف (Diptotes) - Expert Analyses
  // ===========================================

  // Example: Exercise 729 - صيغة منتهى الجموع
  {
    exerciseId: 729,
    arabic: 'صَلَّيْتُ فِي مَسَاجِدَ',
    translation: 'I prayed in mosques',

    wordAnalysis: [
      {
        word: 'صَلَّيْتُ',
        transliteration: 'ṣallaytu',
        grammaticalRole: 'فعل + فاعل',
        grammaticalRoleAr: 'فعل ماضٍ + ضمير رفع متصل (تاء الفاعل)',
        caseMarking: 'Built on السكون',
        caseMarkingAr: 'مبني على السكون لاتصاله بتاء الفاعل',
        wordType: 'Past verb + subject pronoun',
        wordTypeAr: 'فعل ماضٍ مبني + التاء فاعل',
        notes: 'I prayed - تاء المتكلم',
        notesAr: 'صلّيتُ - الفعل مضعّف اللام (صلّى)'
      },
      {
        word: 'فِي',
        transliteration: 'fī',
        grammaticalRole: 'حرف جر',
        grammaticalRoleAr: 'حرف جر',
        caseMarking: 'Particle - no case',
        caseMarkingAr: 'مبني على السكون',
        wordType: 'Preposition (in/at)',
        wordTypeAr: 'حرف جر يفيد الظرفية',
        notes: 'In - indicating location',
        notesAr: 'في - للظرفية المكانية'
      },
      {
        word: 'مَسَاجِدَ',
        transliteration: 'masājida',
        grammaticalRole: 'اسم مجرور بالفتحة',
        grammaticalRoleAr: 'اسم مجرور وعلامة جره الفتحة نيابة عن الكسرة',
        caseMarking: 'Genitive (جر) - marked with فتحة (diptote)',
        caseMarkingAr: 'مجرور بالفتحة لأنه ممنوع من الصرف',
        wordType: 'Diptote - صيغة منتهى الجموع',
        wordTypeAr: 'ممنوع من الصرف (صيغة منتهى الجموع: مَفَاعِل)',
        notes: 'مساجد on pattern مَفَاعِل - takes فتحة in جر, no تنوين',
        notesAr: 'مساجد على وزن مَفَاعِل - يُجر بالفتحة ولا يُنوَّن'
      }
    ],

    phraseAnalysis: [
      {
        phrase: 'فِي مَسَاجِدَ',
        phraseType: 'Prepositional phrase (جار ومجرور)',
        phraseTypeAr: 'جار ومجرور',
        function: 'Adverbial of place متعلق بالفعل',
        functionAr: 'شبه جملة متعلقة بالفعل صلّيتُ',
        notes: 'مساجد is مجرور but with فتحة not كسرة',
        notesAr: 'مساجد مجرور لكن بالفتحة لا بالكسرة (ممنوع من الصرف)'
      }
    ],

    sentenceAnalysis: {
      sentenceType: 'Verbal sentence with diptote in genitive',
      sentenceTypeAr: 'جملة فعلية فيها ممنوع من الصرف مجرور',
      mainComponents: {
        subject: 'التاء في صلّيتُ (المتكلم)',
        subjectAr: 'ضمير رفع متصل (أنا)',
        predicate: 'صلّيتُ (فعل ماضٍ)',
        predicateAr: 'الفعل صلّيتُ'
      },
      structure: 'فعل + فاعل (ضمير) + جار ومجرور (مجرور بالفتحة)',
      structureAr: 'فعل ماضٍ + تاء الفاعل + في + اسم مجرور بالفتحة'
    },

    keyGrammaticalConcepts: [
      {
        concept: 'صيغة منتهى الجموع',
        conceptAr: 'جمع على وزن مَفَاعِل أو مَفَاعِيل',
        explanation: 'صيغة منتهى الجموع are plural patterns with ألف followed by 2+ letters: مَفَاعِل (مساجد)، فَعَائِل (رسائل)، مَفَاعِيل (مصابيح). All are diptotes - no تنوين, جر with فتحة.',
        explanationAr: 'صيغة منتهى الجموع: جموع فيها ألف بعدها حرفان أو أكثر: مَفَاعِل، فَعَائِل، مَفَاعِيل. كلها ممنوعة من الصرف - لا تُنوَّن وتُجر بالفتحة'
      },
      {
        concept: 'علامة جر الممنوع من الصرف',
        conceptAr: 'الفتحة نيابة عن الكسرة',
        explanation: 'Diptotes take فتحة instead of كسرة in the genitive case. So في مساجدَ not *في مساجدٍ. The فتحة is a SUBSTITUTE (نيابة) for the كسرة.',
        explanationAr: 'الممنوع من الصرف يُجر بالفتحة نيابة عن الكسرة. فنقول: في مساجدَ، لا *في مساجدٍ. الفتحة علامة فرعية للجر'
      },
      {
        concept: 'أوزان منتهى الجموع',
        conceptAr: 'الأوزان الشائعة',
        explanation: 'Common patterns: مَفَاعِل (مدارس، مساجد)، فَعَائِل (رسائل، قصائد)، فَعَالِل (جعافر)، مَفَاعِيل (مصابيح، عصافير)، فَعَالِيل (دنانير).',
        explanationAr: 'الأوزان الشائعة: مَفَاعِل (مدارس)، فَعَائِل (رسائل)، فَعَالِل (جعافر)، مَفَاعِيل (مصابيح)، فَعَالِيل (دنانير)'
      }
    ],

    teachingNotes: 'This simple example shows the core diptote rule clearly. Compare: صلّيتُ في كُتُبٍ (triptote - with كسرة and تنوين) vs صلّيتُ في مساجدَ (diptote - with فتحة, no تنوين). The pattern مَفَاعِل always creates a diptote.',
    teachingNotesAr: 'هذا المثال البسيط يُظهر قاعدة الممنوع من الصرف بوضوح. قارن: في كُتُبٍ (منصرف - بالكسرة والتنوين) vs في مساجدَ (ممنوع - بالفتحة بلا تنوين). وزن مَفَاعِل يمنع الصرف دائمًا'
  },

  // Example: Exercise 699 - Diptote becoming triptote
  {
    exerciseId: 699,
    arabic: 'مَرَّ يُوسُفُ بِأَصْعَبِ الِابْتِلَاءَاتِ',
    translation: 'Yusuf went through the most difficult trials',

    wordAnalysis: [
      {
        word: 'مَرَّ',
        transliteration: 'marra',
        grammaticalRole: 'فعل ماضٍ',
        grammaticalRoleAr: 'فعل ماضٍ',
        caseMarking: 'Built on فتح',
        caseMarkingAr: 'مبني على الفتح',
        wordType: 'Past verb - to pass by',
        wordTypeAr: 'فعل ماضٍ من مرّ يمرّ',
        notes: 'Passed/went through - intransitive with بـ',
        notesAr: 'مرّ فعل لازم يتعدى بالباء'
      },
      {
        word: 'يُوسُفُ',
        transliteration: 'yūsufu',
        grammaticalRole: 'فاعل مرفوع',
        grammaticalRoleAr: 'فاعل',
        caseMarking: 'Nominative (رفع) - marked with ضمة (no تنوين)',
        caseMarkingAr: 'مرفوع وعلامة رفعه الضمة ولا يُنوَّن',
        wordType: 'Proper noun - foreign origin (diptote)',
        wordTypeAr: 'علم أعجمي - ممنوع من الصرف',
        notes: 'يوسف is diptote: علم + عجمة (foreign proper noun)',
        notesAr: 'يوسف ممنوع من الصرف للعلمية والعجمة'
      },
      {
        word: 'بِأَصْعَبِ',
        transliteration: 'bi-aṣʿabi',
        grammaticalRole: 'جار ومجرور',
        grammaticalRoleAr: 'الباء حرف جر + اسم مجرور بالكسرة',
        caseMarking: 'Genitive (جر) - marked with كسرة (triptote now!)',
        caseMarkingAr: 'مجرور وعلامة جره الكسرة (صار منصرفًا بالإضافة)',
        wordType: 'Comparative أفعل - made triptote by إضافة',
        wordTypeAr: 'أفعل التفضيل - انصرف بالإضافة',
        notes: 'أصعب is normally diptote (أَفْعَل pattern), but إضافة makes it triptote!',
        notesAr: 'أصعب على وزن أَفْعَل (ممنوع)، لكنه انصرف هنا بسبب الإضافة!'
      },
      {
        word: 'الِابْتِلَاءَاتِ',
        transliteration: 'al-ibtilāʾāti',
        grammaticalRole: 'مضاف إليه',
        grammaticalRoleAr: 'مضاف إليه مجرور',
        caseMarking: 'Genitive (جر) - marked with كسرة',
        caseMarkingAr: 'مجرور وعلامة جره الكسرة',
        wordType: 'Feminine plural of ابتلاء',
        wordTypeAr: 'جمع مؤنث سالم من ابتلاء',
        notes: 'Trials/tests - جمع مؤنث سالم',
        notesAr: 'الابتلاءات - جمع مؤنث سالم يُجر بالكسرة'
      }
    ],

    phraseAnalysis: [
      {
        phrase: 'يُوسُفُ',
        phraseType: 'Foreign proper noun (علم أعجمي)',
        phraseTypeAr: 'علم أعجمي ممنوع من الصرف',
        function: 'Subject of مرّ',
        functionAr: 'فاعل للفعل مرّ',
        notes: 'Diptote because: proper noun (علمية) + foreign origin (عجمة)',
        notesAr: 'ممنوع من الصرف لعلتين: العلمية + العجمة'
      },
      {
        phrase: 'بِأَصْعَبِ الِابْتِلَاءَاتِ',
        phraseType: 'Prepositional phrase with إضافة',
        phraseTypeAr: 'جار ومجرور + إضافة',
        function: 'Adverbial - what he passed through',
        functionAr: 'متعلق بالفعل مرّ',
        notes: 'أصعب is diptote pattern but BECOMES triptote when مضاف',
        notesAr: 'أصعب وزنه ممنوع لكنه انصرف بالإضافة'
      }
    ],

    sentenceAnalysis: {
      sentenceType: 'Verbal sentence with two diptote types',
      sentenceTypeAr: 'جملة فعلية فيها ممنوعان من الصرف بأحكام مختلفة',
      mainComponents: {
        subject: 'يوسفُ (علم أعجمي - ممنوع)',
        subjectAr: 'يوسفُ - فاعل مرفوع بالضمة بلا تنوين',
        predicate: 'مرّ (passed through)',
        predicateAr: 'مرّ - فعل ماضٍ'
      },
      structure: 'فعل + فاعل (ممنوع) + ب + مجرور (منصرف للإضافة) + مضاف إليه',
      structureAr: 'فعل ماضٍ + فاعل (ممنوع) + جار + مجرور (منصرف) + مضاف إليه'
    },

    keyGrammaticalConcepts: [
      {
        concept: 'تصريف الممنوع من الصرف',
        conceptAr: 'متى يصير الممنوع منصرفًا',
        explanation: 'A diptote becomes triptote (منصرف) in two cases: (1) with ال: المساجدِ, (2) when مضاف: أصعبِ الابتلاءات. Then it takes كسرة in جر and can take تنوين.',
        explanationAr: 'الممنوع من الصرف ينصرف في حالتين: (١) مع ال: المساجدِ، (٢) إذا أُضيف: أصعبِ الابتلاءات. عندها يُجر بالكسرة ويمكن تنوينه'
      },
      {
        concept: 'العلمية والعجمة',
        conceptAr: 'الاسم الأعجمي إذا كان علمًا',
        explanation: 'Foreign proper nouns exceeding 3 letters are diptotes: إبراهيم، يوسف، موسى، عيسى. Three-letter foreign names CAN be triptote: نوح، لوط.',
        explanationAr: 'الاسم الأعجمي الزائد على ثلاثة أحرف إذا كان علمًا: ممنوع من الصرف. الثلاثي الأعجمي قد ينصرف: نوحٌ، لوطٌ'
      },
      {
        concept: 'أَفْعَل التفضيل',
        conceptAr: 'وزن أَفْعَل كصفة',
        explanation: 'Comparatives on pattern أَفْعَل (أكبر، أصعب، أفضل) are diptotes UNLESS they have ال or are مضاف. Then they take كسرة: في الأكبرِ، من أصعبِ الأيام.',
        explanationAr: 'أفعل التفضيل (أكبر، أصعب) ممنوع من الصرف إلا مع ال أو الإضافة. عندها ينصرف: في الأكبرِ، من أصعبِ الأيام'
      }
    ],

    teachingNotes: 'This verse demonstrates TWO diptote rules in one sentence. يوسفُ stays diptote (no ال, no إضافة), but أصعبِ becomes triptote because of إضافة. Compare: مررتُ بأصعبَ (diptote, فتحة) vs مررتُ بأصعبِ الأيام (triptote, كسرة).',
    teachingNotesAr: 'هذه الجملة تُظهر قاعدتين في آن: يوسفُ بقي ممنوعًا (لا ال ولا إضافة)، لكن أصعبِ انصرف بسبب الإضافة. قارن: بأصعبَ (ممنوع) vs بأصعبِ الأيام (منصرف)'
  },

  // Example: Exercise 752 - Quranic Diptote Example
  {
    exerciseId: 752,
    arabic: 'وَلَقَدْ زَيَّنَّا السَّمَاءَ الدُّنْيَا بِمَصَابِيحَ',
    translation: 'And We have adorned the nearest heaven with lamps',

    wordAnalysis: [
      {
        word: 'وَلَقَدْ',
        transliteration: 'wa-laqad',
        grammaticalRole: 'واو + لام + قد',
        grammaticalRoleAr: 'واو استئنافية + لام التوكيد + قد التحقيقية',
        caseMarking: 'Particles - no case',
        caseMarkingAr: 'حروف مبنية',
        wordType: 'Emphatic particle combination',
        wordTypeAr: 'تركيب توكيدي',
        notes: 'Strong assertion: "Verily We have..."',
        notesAr: 'تأكيد قوي: لام + قد = تحقيق وتوكيد'
      },
      {
        word: 'زَيَّنَّا',
        transliteration: 'zayyannā',
        grammaticalRole: 'فعل + فاعل',
        grammaticalRoleAr: 'فعل ماضٍ + نا الفاعلين',
        caseMarking: 'Built on السكون (before نا)',
        caseMarkingAr: 'مبني على السكون لاتصاله بنا',
        wordType: 'Past verb Form II + We',
        wordTypeAr: 'فعل ماضٍ مزيد (فعّل) + ضمير',
        notes: 'We adorned/beautified - زيّن (Form II of زان)',
        notesAr: 'زيّنّا من زيّن يزيّن (الباب الثاني) - العظمة لله'
      },
      {
        word: 'السَّمَاءَ',
        transliteration: 'as-samāʾa',
        grammaticalRole: 'مفعول به',
        grammaticalRoleAr: 'مفعول به منصوب',
        caseMarking: 'Accusative (نصب) - marked with فتحة',
        caseMarkingAr: 'منصوب وعلامة نصبه الفتحة',
        wordType: 'Noun - sky/heaven',
        wordTypeAr: 'اسم مفرد مؤنث',
        notes: 'The sky - singular feminine',
        notesAr: 'السماء - مفرد مؤنث'
      },
      {
        word: 'الدُّنْيَا',
        transliteration: 'ad-dunyā',
        grammaticalRole: 'صفة منصوبة',
        grammaticalRoleAr: 'نعت',
        caseMarking: 'Accusative (نصب) - فتحة مقدرة',
        caseMarkingAr: 'منصوب وعلامة نصبه الفتحة المقدرة',
        wordType: 'Adjective - feminine أَفْعَل (فُعْلَى)',
        wordTypeAr: 'صفة على وزن فُعْلَى (مؤنث أَفْعَل)',
        notes: 'The nearest - الدنيا = الأقرب (superlative)',
        notesAr: 'الدنيا مؤنث الأدنى = الأقرب'
      },
      {
        word: 'بِمَصَابِيحَ',
        transliteration: 'bi-maṣābīḥa',
        grammaticalRole: 'جار ومجرور',
        grammaticalRoleAr: 'الباء حرف جر + اسم مجرور بالفتحة',
        caseMarking: 'Genitive (جر) - marked with فتحة (diptote)',
        caseMarkingAr: 'مجرور وعلامة جره الفتحة نيابة عن الكسرة',
        wordType: 'Diptote - صيغة منتهى الجموع',
        wordTypeAr: 'ممنوع من الصرف (صيغة منتهى الجموع: مَفَاعِيل)',
        notes: 'مصابيح on pattern مَفَاعِيل - always diptote',
        notesAr: 'مصابيح على وزن مَفَاعِيل - ممنوع من الصرف'
      }
    ],

    phraseAnalysis: [
      {
        phrase: 'السَّمَاءَ الدُّنْيَا',
        phraseType: 'Noun + adjective (موصوف وصفة)',
        phraseTypeAr: 'موصوف ونعت',
        function: 'Object of زيّننا',
        functionAr: 'مفعول به للفعل زيّننا',
        notes: 'The nearest sky/heaven - first of seven heavens',
        notesAr: 'السماء الدنيا - أقرب السماوات إلينا'
      },
      {
        phrase: 'بِمَصَابِيحَ',
        phraseType: 'Prepositional phrase with diptote',
        phraseTypeAr: 'جار ومجرور (ممنوع من الصرف)',
        function: 'Instrument - what it was adorned with',
        functionAr: 'متعلق بزيّننا - الآلة أو ما زُيّن به',
        notes: 'With lamps - مصابيح is مجرور بالفتحة',
        notesAr: 'بمصابيحَ - مجرور بالفتحة لا بالكسرة (ممنوع من الصرف)'
      }
    ],

    sentenceAnalysis: {
      sentenceType: 'Quranic verbal sentence with diptote object of preposition',
      sentenceTypeAr: 'جملة قرآنية فعلية فيها ممنوع من الصرف مجرور',
      mainComponents: {
        subject: 'نا (ضمير الفاعلين - الله)',
        subjectAr: 'نا في زيّنّا (ضمير العظمة لله)',
        predicate: 'زيّننا (We adorned)',
        predicateAr: 'زيّننا - فعل ماضٍ + فاعل'
      },
      structure: 'حروف توكيد + فعل + فاعل + مفعول به + صفة + جار + مجرور (ممنوع)',
      structureAr: 'و + لام التوكيد + قد + فعل + نا الفاعل + مفعول + نعت + ب + ممنوع من الصرف'
    },

    keyGrammaticalConcepts: [
      {
        concept: 'وزن مَفَاعِيل',
        conceptAr: 'من أوزان صيغة منتهى الجموع',
        explanation: 'مَفَاعِيل is a plural pattern (مصباح → مصابيح) that always creates a diptote. Other examples: مفاتيح (keys), تماثيل (statues), عصافير (sparrows).',
        explanationAr: 'مَفَاعِيل وزن من صيغ منتهى الجموع (مصباح → مصابيح). أمثلة: مفاتيح، تماثيل، عصافير. كلها ممنوعة من الصرف'
      },
      {
        concept: 'فُعْلَى مؤنث أَفْعَل',
        conceptAr: 'الدنيا من الأدنى',
        explanation: 'الدنيا is feminine of الأدنى (the nearest). The pattern فُعْلَى (feminine of أَفْعَل) is also a diptote. But here it has ال so it declines normally.',
        explanationAr: 'الدنيا مؤنث الأدنى (الأقرب). وزن فُعْلَى (مؤنث أَفْعَل) ممنوع من الصرف. لكن هنا دخلت عليه ال فهو معرب'
      },
      {
        concept: 'المصابيح = النجوم',
        conceptAr: 'تفسير المصابيح',
        explanation: 'In this Quranic context, مصابيح (lamps) refers to stars. Allah adorned the nearest sky with stars that serve as lamps. This is from Surah Al-Mulk (67:5).',
        explanationAr: 'المصابيح هنا: النجوم. الله زيّن السماء الدنيا بالنجوم كالمصابيح. الآية من سورة الملك (٦٧:٥)'
      }
    ],

    teachingNotes: 'This beautiful Quranic verse (67:5) demonstrates مَفَاعِيل pattern diptotes. Key point: مصابيحَ is مجرور but with فتحة not كسرة. Compare: بالمصابيحِ (with ال = triptote, كسرة) vs بمصابيحَ (without ال = diptote, فتحة).',
    teachingNotesAr: 'هذه الآية الجميلة (الملك ٥) تُظهر وزن مَفَاعِيل الممنوع من الصرف. المفتاح: مصابيحَ مجرور بالفتحة لا الكسرة. قارن: بالمصابيحِ (مع ال = كسرة) vs بمصابيحَ (بدون ال = فتحة)'
  },

  // Example: Exercise 685 - Diptote: Proper noun on verb pattern (العلمية ووزن الفعل)
  {
    exerciseId: 685,
    arabic: 'ذَهَبْتُ إِلَى أَحْمَدَ',
    translation: 'I went to Ahmad',

    wordAnalysis: [
      {
        word: 'ذَهَبْتُ',
        transliteration: 'dhahabtu',
        grammaticalRole: 'فعل + فاعل',
        grammaticalRoleAr: 'فعل ماضٍ + تاء الفاعل',
        caseMarking: 'Built on السكون',
        caseMarkingAr: 'مبني على السكون لاتصاله بضمير الرفع',
        wordType: 'Past verb + attached pronoun',
        wordTypeAr: 'فعل ماضٍ + ضمير متصل',
        notes: 'I went - التاء ضمير رفع متصل فاعل',
        notesAr: 'ذهبتُ: الفعل مبني والتاء فاعل مبني على الضم'
      },
      {
        word: 'إِلَى',
        transliteration: 'ilā',
        grammaticalRole: 'حرف جر',
        grammaticalRoleAr: 'حرف جر',
        caseMarking: 'Particle - no case',
        caseMarkingAr: 'حرف مبني على السكون',
        wordType: 'Preposition',
        wordTypeAr: 'حرف جر يفيد انتهاء الغاية',
        notes: 'To/toward - indicates destination',
        notesAr: 'إلى: حرف جر يدل على انتهاء الغاية المكانية'
      },
      {
        word: 'أَحْمَدَ',
        transliteration: 'aḥmada',
        grammaticalRole: 'اسم مجرور بالفتحة',
        grammaticalRoleAr: 'اسم مجرور',
        caseMarking: 'Genitive (جر) - marked with فتحة (diptote)',
        caseMarkingAr: 'مجرور وعلامة جره الفتحة نيابة عن الكسرة لأنه ممنوع من الصرف',
        wordType: 'Proper noun - diptote (verb pattern)',
        wordTypeAr: 'علم ممنوع من الصرف للعلمية ووزن الفعل',
        notes: 'أحمد is on pattern أَفْعَل (like the verb أَحْمَدُ = I praise more)',
        notesAr: 'أحمد على وزن أَفْعَل الذي يشبه صيغة الفعل (أَحْمَدُ اللهَ)'
      }
    ],

    phraseAnalysis: [
      {
        phrase: 'إِلَى أَحْمَدَ',
        phraseType: 'Prepositional phrase (جار ومجرور)',
        phraseTypeAr: 'جار ومجرور',
        function: 'Destination of the verb ذهب',
        functionAr: 'متعلق بالفعل ذهب - يبين الوجهة',
        notes: 'The مجرور takes فتحة not كسرة because أحمد is diptote',
        notesAr: 'المجرور بالفتحة لا بالكسرة لأن أحمد ممنوع من الصرف'
      }
    ],

    sentenceAnalysis: {
      sentenceType: 'Verbal sentence with diptote object of preposition',
      sentenceTypeAr: 'جملة فعلية فيها اسم مجرور ممنوع من الصرف',
      mainComponents: {
        subject: 'التاء في ذهبتُ (أنا)',
        subjectAr: 'تاء الفاعل - ضمير متصل مبني في محل رفع فاعل',
        predicate: 'ذهبتُ (I went)',
        predicateAr: 'ذهبتُ - فعل ماضٍ'
      },
      structure: 'فعل + فاعل (ضمير) + جار + مجرور (ممنوع من الصرف)',
      structureAr: 'فعل ماضٍ + تاء الفاعل + إلى + اسم مجرور بالفتحة'
    },

    keyGrammaticalConcepts: [
      {
        concept: 'العلمية ووزن الفعل',
        conceptAr: 'اجتماع العلمية مع وزن الفعل',
        explanation: 'A proper noun on a verb pattern (أَفْعَل، يَفْعَل، تَفْعَل، etc.) is diptote. أحمد resembles the verb أَحْمَدُ (I praise more), so with العلمية it becomes diptote.',
        explanationAr: 'الاسم العلم إذا كان على وزن الفعل يُمنع من الصرف. أحمد على وزن أَفْعَل يشبه الفعل أَحْمَدُ، فاجتمعت فيه العلمية ووزن الفعل'
      },
      {
        concept: 'أوزان الفعل في الأسماء',
        conceptAr: 'الأوزان التي تشبه الفعل',
        explanation: 'Verb patterns that make names diptote: أَفْعَل (أحمد، أسعد)، يَفْعَل (يزيد، يعقوب)، تَفْعِل (تغلب)، فُعَل (عُمَر)، فَعْلان (عثمان).',
        explanationAr: 'أوزان تمنع العلم من الصرف: أَفْعَل (أحمد)، يَفْعَل (يزيد)، تَفْعِل (تغلب)، فُعَل (عُمَر)، فَعْلان (عثمان)'
      },
      {
        concept: 'علامة جر الممنوع',
        conceptAr: 'الفتحة علامة الجر للممنوع',
        explanation: 'Diptotes are pulled (مجرور) with فتحة instead of كسرة: إلى أحمدَ (not *إلى أحمدٍ). This فتحة is a substitute (نيابة) for كسرة.',
        explanationAr: 'الممنوع من الصرف يُجر بالفتحة نيابة عن الكسرة: إلى أحمدَ، لا إلى أحمدٍ. الفتحة علامة جر فرعية'
      }
    ],

    teachingNotes: 'أحمد is a classic example of العلمية + وزن الفعل. Compare: مررتُ بأحمدَ (فتحة, no تنوين) vs مررتُ بخالدٍ (كسرة + تنوين). خالد is triptote because its pattern فَاعِل is not a verb pattern.',
    teachingNotesAr: 'أحمد مثال كلاسيكي للعلمية مع وزن الفعل. قارن: بأحمدَ (فتحة بلا تنوين) vs بخالدٍ (كسرة وتنوين). خالد منصرف لأن وزنه فَاعِل ليس وزن فعل'
  },

  // Example: Exercise 686 - Diptote: Proper noun with modification (العلمية والعدل)
  {
    exerciseId: 686,
    arabic: 'مَرَرْتُ بِعُمَرَ',
    translation: 'I passed by Umar',

    wordAnalysis: [
      {
        word: 'مَرَرْتُ',
        transliteration: 'marartu',
        grammaticalRole: 'فعل + فاعل',
        grammaticalRoleAr: 'فعل ماضٍ + تاء الفاعل',
        caseMarking: 'Built on السكون',
        caseMarkingAr: 'مبني على السكون لاتصاله بالتاء',
        wordType: 'Past verb + attached pronoun',
        wordTypeAr: 'فعل ماضٍ + ضمير متصل',
        notes: 'I passed by - مرّ يمرّ (intransitive, needs بـ)',
        notesAr: 'مررتُ من مرّ يمرّ - فعل لازم يتعدى بحرف الجر'
      },
      {
        word: 'بِعُمَرَ',
        transliteration: 'bi-ʿumara',
        grammaticalRole: 'جار ومجرور',
        grammaticalRoleAr: 'الباء حرف جر + عمر اسم مجرور',
        caseMarking: 'Genitive (جر) - marked with فتحة (diptote)',
        caseMarkingAr: 'مجرور وعلامة جره الفتحة نيابة عن الكسرة',
        wordType: 'Proper noun - diptote (العلمية والعدل)',
        wordTypeAr: 'علم ممنوع من الصرف للعلمية والعدل',
        notes: 'عُمَر is معدول (modified) from عَامِر',
        notesAr: 'عُمَر معدول عن عامر، فاجتمعت فيه العلمية والعدل'
      }
    ],

    phraseAnalysis: [
      {
        phrase: 'بِعُمَرَ',
        phraseType: 'Prepositional phrase (جار ومجرور)',
        phraseTypeAr: 'جار ومجرور',
        function: 'Object of passing (ما مُرّ به)',
        functionAr: 'متعلق بالفعل مررتُ',
        notes: 'عمر takes فتحة because it is diptote (العلمية + العدل)',
        notesAr: 'عمر مجرور بالفتحة لأنه ممنوع من الصرف للعلمية والعدل'
      }
    ],

    sentenceAnalysis: {
      sentenceType: 'Verbal sentence with modified proper noun (معدول)',
      sentenceTypeAr: 'جملة فعلية فيها علم معدول ممنوع من الصرف',
      mainComponents: {
        subject: 'التاء في مررتُ (أنا)',
        subjectAr: 'تاء الفاعل - ضمير في محل رفع فاعل',
        predicate: 'مررتُ (I passed)',
        predicateAr: 'مررتُ - فعل ماضٍ'
      },
      structure: 'فعل + فاعل (ضمير) + جار + مجرور (ممنوع - معدول)',
      structureAr: 'فعل ماضٍ + تاء الفاعل + ب + اسم مجرور بالفتحة'
    },

    keyGrammaticalConcepts: [
      {
        concept: 'العلمية والعدل',
        conceptAr: 'الاسم المعدول عن أصله',
        explanation: 'عُمَر is "modified" (معدول) from عَامِر. The pattern فُعَل is considered a deviation from the original فَاعِل. This modification (العدل) + being a proper noun (العلمية) = diptote.',
        explanationAr: 'عُمَر معدول عن عامر. الوزن فُعَل معدول عن فَاعِل. هذا التغيير (العدل) مع العلمية يمنعان الصرف'
      },
      {
        concept: 'الأسماء المعدولة',
        conceptAr: 'قائمة الأسماء المعدولة',
        explanation: 'Modified names on pattern فُعَل: عُمَر (from عامر)، زُفَر (from زافر)، مُضَر (from ماضر)، قُثَم (from قاثم). All are diptotes.',
        explanationAr: 'الأسماء المعدولة على وزن فُعَل: عُمَر، زُفَر، مُضَر، قُثَم. كلها ممنوعة من الصرف للعلمية والعدل'
      },
      {
        concept: 'الفرق بين عُمَر وخالد',
        conceptAr: 'لماذا عمر ممنوع وخالد منصرف',
        explanation: 'خالد (pattern فَاعِل) is triptote - no العدل. عُمَر (pattern فُعَل) is diptote because of العدل. Compare: مررتُ بخالدٍ vs مررتُ بعُمَرَ.',
        explanationAr: 'خالد على وزن فَاعِل - منصرف. عمر على وزن فُعَل المعدول عن فَاعِل - ممنوع. قارن: بخالدٍ vs بعُمَرَ'
      }
    ],

    teachingNotes: 'عُمَر demonstrates العدل - a pattern change from the original. The pattern فُعَل (عُمَر) is considered معدول from فَاعِل (عَامِر). When a proper noun has this modification, it becomes diptote. This is one of the trickier diptote reasons to understand.',
    teachingNotesAr: 'عُمَر يُظهر العدل - تغيير الوزن عن الأصل. فُعَل (عُمَر) معدول عن فَاعِل (عَامِر). إذا كان العلم معدولًا صار ممنوعًا من الصرف. هذا من أصعب أسباب المنع فهمًا'
  },

  // Example: Exercise 687 - Diptote: صيغة منتهى الجموع (مَفَاعِل) with contrast
  {
    exerciseId: 687,
    arabic: 'صَلَّيْتُ فِي مَسَاجِدَ كَثِيرَةٍ',
    translation: 'I prayed in many mosques',

    wordAnalysis: [
      {
        word: 'صَلَّيْتُ',
        transliteration: 'ṣallaytu',
        grammaticalRole: 'فعل + فاعل',
        grammaticalRoleAr: 'فعل ماضٍ + تاء الفاعل',
        caseMarking: 'Built on السكون',
        caseMarkingAr: 'مبني على السكون لاتصاله بالتاء',
        wordType: 'Past verb Form II + attached pronoun',
        wordTypeAr: 'فعل ماضٍ من الباب الثاني (فعّل) + ضمير',
        notes: 'I prayed - صلّى يصلّي (Form II)',
        notesAr: 'صلّيتُ من صلّى يصلّي - فعّل يفعّل'
      },
      {
        word: 'فِي',
        transliteration: 'fī',
        grammaticalRole: 'حرف جر',
        grammaticalRoleAr: 'حرف جر',
        caseMarking: 'Particle - no case',
        caseMarkingAr: 'حرف مبني على السكون',
        wordType: 'Preposition',
        wordTypeAr: 'حرف جر يفيد الظرفية',
        notes: 'In - indicates location',
        notesAr: 'في: حرف جر يفيد الظرفية المكانية'
      },
      {
        word: 'مَسَاجِدَ',
        transliteration: 'masājida',
        grammaticalRole: 'اسم مجرور بالفتحة',
        grammaticalRoleAr: 'اسم مجرور',
        caseMarking: 'Genitive (جر) - marked with فتحة (diptote)',
        caseMarkingAr: 'مجرور وعلامة جره الفتحة نيابة عن الكسرة',
        wordType: 'صيغة منتهى الجموع - pattern مَفَاعِل',
        wordTypeAr: 'صيغة منتهى الجموع على وزن مَفَاعِل',
        notes: 'Mosques - plural of مسجد on pattern مَفَاعِل',
        notesAr: 'مساجد جمع مسجد على وزن مَفَاعِل - ممنوع من الصرف'
      },
      {
        word: 'كَثِيرَةٍ',
        transliteration: 'kathīratin',
        grammaticalRole: 'صفة مجرورة',
        grammaticalRoleAr: 'نعت مجرور',
        caseMarking: 'Genitive (جر) - marked with كسرة + تنوين',
        caseMarkingAr: 'مجرور وعلامة جره الكسرة مع التنوين',
        wordType: 'Adjective - triptote (منصرف)',
        wordTypeAr: 'صفة مؤنثة منصرفة',
        notes: 'Many - triptote, takes كسرة and تنوين normally',
        notesAr: 'كثيرةٍ صفة منصرفة - تُجر بالكسرة وتُنوَّن'
      }
    ],

    phraseAnalysis: [
      {
        phrase: 'فِي مَسَاجِدَ كَثِيرَةٍ',
        phraseType: 'Prepositional phrase with described diptote',
        phraseTypeAr: 'جار ومجرور + صفة',
        function: 'Location adverbial (ظرف مكان)',
        functionAr: 'متعلق بالفعل صلّيتُ - يبين المكان',
        notes: 'مساجد is diptote (فتحة), but كثيرة is triptote (كسرة + تنوين)',
        notesAr: 'مساجدَ ممنوع (بالفتحة) لكن كثيرةٍ منصرف (بالكسرة والتنوين)'
      }
    ],

    sentenceAnalysis: {
      sentenceType: 'Verbal sentence with صيغة منتهى الجموع',
      sentenceTypeAr: 'جملة فعلية فيها صيغة منتهى الجموع الممنوعة من الصرف',
      mainComponents: {
        subject: 'التاء في صلّيتُ (أنا)',
        subjectAr: 'تاء الفاعل - ضمير في محل رفع فاعل',
        predicate: 'صلّيتُ (I prayed)',
        predicateAr: 'صلّيتُ - فعل ماضٍ'
      },
      structure: 'فعل + فاعل (ضمير) + جار + مجرور (منتهى الجموع) + صفة',
      structureAr: 'فعل ماضٍ + تاء الفاعل + في + اسم مجرور بالفتحة + نعت بالكسرة'
    },

    keyGrammaticalConcepts: [
      {
        concept: 'صيغة منتهى الجموع',
        conceptAr: 'الجمع الذي بعد ألفه حرفان أو ثلاثة',
        explanation: 'صيغة منتهى الجموع are plurals with ألف followed by 2+ letters. Pattern مَفَاعِل: مساجد، مدارس، مكاتب. All are diptotes - no تنوين, جر with فتحة.',
        explanationAr: 'صيغة منتهى الجموع: كل جمع تكسير بعد ألفه حرفان أو ثلاثة. مَفَاعِل: مساجد، مدارس، مكاتب. كلها ممنوعة من الصرف'
      },
      {
        concept: 'تبعية الصفة للموصوف',
        conceptAr: 'الصفة تتبع الموصوف في الإعراب',
        explanation: 'The adjective كثيرة follows مساجد in case (جر), but NOT in diptote status. كثيرة is triptote, so it takes كسرة + تنوين even though مساجد takes فتحة.',
        explanationAr: 'الصفة كثيرة تتبع مساجد في الجر، لكنها منصرفة. فتأخذ كسرة وتنوينًا بينما مساجد بالفتحة فقط'
      },
      {
        concept: 'مقارنة الممنوع والمنصرف',
        conceptAr: 'الفرق في علامة الجر',
        explanation: 'Compare: في مساجدَ (فتحة, no تنوين) vs في كُتُبٍ (كسرة + تنوين). Both are جمع تكسير, but مَفَاعِل pattern is diptote while فُعُل pattern is not.',
        explanationAr: 'قارن: في مساجدَ (فتحة بلا تنوين) vs في كُتُبٍ (كسرة وتنوين). كلاهما جمع تكسير، لكن مَفَاعِل ممنوع وفُعُل منصرف'
      }
    ],

    teachingNotes: 'This sentence beautifully contrasts diptote and triptote in the same phrase. مساجدَ (فتحة, no تنوين) vs كثيرةٍ (كسرة + تنوين). The adjective agrees in case but has its own declension rules. This is a key concept for students.',
    teachingNotesAr: 'هذه الجملة تُظهر الفرق بين الممنوع والمنصرف في عبارة واحدة. مساجدَ (فتحة بلا تنوين) vs كثيرةٍ (كسرة وتنوين). الصفة توافق في الإعراب لكن لها إعرابها الخاص'
  },

  // Example: Exercise 689 - Diptote: Feminine proper noun (العلمية والتأنيث)
  {
    exerciseId: 689,
    arabic: 'رَأَيْتُ فَاطِمَةَ فِي الْمَدْرَسَةِ',
    translation: 'I saw Fatimah at the school',

    wordAnalysis: [
      {
        word: 'رَأَيْتُ',
        transliteration: 'raʾaytu',
        grammaticalRole: 'فعل + فاعل',
        grammaticalRoleAr: 'فعل ماضٍ + تاء الفاعل',
        caseMarking: 'Built on السكون',
        caseMarkingAr: 'مبني على السكون لاتصاله بالتاء',
        wordType: 'Past verb + attached pronoun',
        wordTypeAr: 'فعل ماضٍ + ضمير متصل',
        notes: 'I saw - رأى يرى (transitive)',
        notesAr: 'رأيتُ من رأى يرى - فعل متعدٍّ بنفسه'
      },
      {
        word: 'فَاطِمَةَ',
        transliteration: 'fāṭimata',
        grammaticalRole: 'مفعول به منصوب',
        grammaticalRoleAr: 'مفعول به',
        caseMarking: 'Accusative (نصب) - marked with فتحة (no تنوين)',
        caseMarkingAr: 'منصوب وعلامة نصبه الفتحة ولا يُنوَّن',
        wordType: 'Proper noun - diptote (العلمية + التأنيث)',
        wordTypeAr: 'علم مؤنث ممنوع من الصرف',
        notes: 'فاطمة is diptote: proper noun + feminine (with تاء مربوطة)',
        notesAr: 'فاطمة ممنوع من الصرف للعلمية والتأنيث بالتاء المربوطة'
      },
      {
        word: 'فِي',
        transliteration: 'fī',
        grammaticalRole: 'حرف جر',
        grammaticalRoleAr: 'حرف جر',
        caseMarking: 'Particle - no case',
        caseMarkingAr: 'حرف مبني',
        wordType: 'Preposition',
        wordTypeAr: 'حرف جر يفيد الظرفية',
        notes: 'In/at',
        notesAr: 'في: حرف جر'
      },
      {
        word: 'الْمَدْرَسَةِ',
        transliteration: 'al-madrasati',
        grammaticalRole: 'اسم مجرور بالكسرة',
        grammaticalRoleAr: 'اسم مجرور',
        caseMarking: 'Genitive (جر) - marked with كسرة (triptote with ال)',
        caseMarkingAr: 'مجرور وعلامة جره الكسرة',
        wordType: 'Noun with ال - triptote (منصرف)',
        wordTypeAr: 'اسم معرّف بأل - منصرف',
        notes: 'The school - مدرسة is triptote because it has ال',
        notesAr: 'المدرسة منصرف لوجود ال التعريف'
      }
    ],

    phraseAnalysis: [
      {
        phrase: 'فَاطِمَةَ',
        phraseType: 'Feminine proper noun (diptote)',
        phraseTypeAr: 'علم مؤنث ممنوع من الصرف',
        function: 'Direct object of رأيتُ',
        functionAr: 'مفعول به للفعل رأيتُ',
        notes: 'No تنوين because it is diptote (العلمية + التأنيث)',
        notesAr: 'بدون تنوين لأنه ممنوع من الصرف للعلمية والتأنيث'
      },
      {
        phrase: 'فِي الْمَدْرَسَةِ',
        phraseType: 'Prepositional phrase (triptote)',
        phraseTypeAr: 'جار ومجرور (منصرف)',
        function: 'Location adverbial',
        functionAr: 'متعلق بالفعل رأيتُ',
        notes: 'المدرسة with ال is triptote, takes كسرة',
        notesAr: 'المدرسة مع ال منصرف يُجر بالكسرة'
      }
    ],

    sentenceAnalysis: {
      sentenceType: 'Verbal sentence with feminine proper noun',
      sentenceTypeAr: 'جملة فعلية فيها علم مؤنث ممنوع من الصرف',
      mainComponents: {
        subject: 'التاء في رأيتُ (أنا)',
        subjectAr: 'تاء الفاعل - ضمير في محل رفع فاعل',
        predicate: 'رأيتُ (I saw)',
        predicateAr: 'رأيتُ - فعل ماضٍ'
      },
      structure: 'فعل + فاعل (ضمير) + مفعول به (علم مؤنث) + جار ومجرور',
      structureAr: 'فعل ماضٍ + تاء الفاعل + مفعول به ممنوع + في + اسم مجرور منصرف'
    },

    keyGrammaticalConcepts: [
      {
        concept: 'العلمية والتأنيث',
        conceptAr: 'العلم المؤنث ممنوع من الصرف',
        explanation: 'Feminine proper nouns are diptotes. فاطمة has: (1) العلمية (proper noun), (2) التأنيث (feminine with تاء). So: رأيتُ فاطمةَ (no تنوين), not *فاطمةً.',
        explanationAr: 'العلم المؤنث ممنوع من الصرف. فاطمة فيها: العلمية + التأنيث بالتاء. فنقول: رأيتُ فاطمةَ، لا *رأيتُ فاطمةً'
      },
      {
        concept: 'أنواع التأنيث',
        conceptAr: 'التأنيث اللفظي والمعنوي',
        explanation: 'Names can be feminine by: (1) تاء مربوطة (فاطمة، عائشة), (2) ألف مقصورة (سلمى، ليلى), (3) ألف ممدودة (أسماء، زهراء), (4) meaning only (زينب، مريم). All make proper nouns diptote.',
        explanationAr: 'التأنيث أنواع: (١) بالتاء (فاطمة)، (٢) بالألف المقصورة (سلمى)، (٣) بالألف الممدودة (أسماء)، (٤) معنوي فقط (زينب). كلها تمنع العلم من الصرف'
      },
      {
        concept: 'الفرق: فاطمةَ vs المدرسةِ',
        conceptAr: 'لماذا فاطمة ممنوعة والمدرسة منصرفة',
        explanation: 'فاطمة is a proper noun (علم) → diptote. مدرسة is a common noun (اسم جنس) → triptote. Also, المدرسة has ال which makes any word decline normally.',
        explanationAr: 'فاطمة علم فهي ممنوعة. مدرسة اسم جنس فهي منصرفة. أيضًا المدرسة فيها ال التي تُنصرف بها الأسماء'
      }
    ],

    teachingNotes: 'This sentence contrasts two feminine nouns: فاطمةَ (proper noun, diptote) vs المدرسةِ (common noun with ال, triptote). Key rule: Feminine common nouns are triptote, but feminine PROPER nouns are diptote.',
    teachingNotesAr: 'هذه الجملة تقارن اسمين مؤنثين: فاطمةَ (علم، ممنوع) vs المدرسةِ (اسم جنس مع ال، منصرف). القاعدة: اسم الجنس المؤنث منصرف، لكن العلم المؤنث ممنوع'
  },

  // Example: Exercise 690 - Diptote: Comparative (أَفْعَل الصفة)
  {
    exerciseId: 690,
    arabic: 'هَذَا الْأَمْرُ أَفْضَلُ',
    translation: 'This matter is better',

    wordAnalysis: [
      {
        word: 'هَذَا',
        transliteration: 'hādhā',
        grammaticalRole: 'مبتدأ',
        grammaticalRoleAr: 'اسم إشارة مبتدأ',
        caseMarking: 'Nominative (رفع) - built on السكون',
        caseMarkingAr: 'مبني على السكون في محل رفع مبتدأ',
        wordType: 'Demonstrative pronoun',
        wordTypeAr: 'اسم إشارة للقريب المفرد المذكر',
        notes: 'This - pointing to something near',
        notesAr: 'هذا: اسم إشارة للمفرد المذكر القريب'
      },
      {
        word: 'الْأَمْرُ',
        transliteration: 'al-ʾamru',
        grammaticalRole: 'بدل أو عطف بيان',
        grammaticalRoleAr: 'بدل من اسم الإشارة أو عطف بيان',
        caseMarking: 'Nominative (رفع) - marked with ضمة',
        caseMarkingAr: 'مرفوع وعلامة رفعه الضمة',
        wordType: 'Noun with ال',
        wordTypeAr: 'اسم معرّف بأل',
        notes: 'The matter/affair - explains what هذا refers to',
        notesAr: 'الأمر: بدل يوضح المشار إليه'
      },
      {
        word: 'أَفْضَلُ',
        transliteration: 'afḍalu',
        grammaticalRole: 'خبر مرفوع',
        grammaticalRoleAr: 'خبر المبتدأ',
        caseMarking: 'Nominative (رفع) - marked with ضمة (no تنوين)',
        caseMarkingAr: 'مرفوع وعلامة رفعه الضمة ولا يُنوَّن',
        wordType: 'Comparative adjective - diptote (أَفْعَل pattern)',
        wordTypeAr: 'صفة على وزن أَفْعَل - ممنوع من الصرف',
        notes: 'أفضل is diptote: pattern أَفْعَل (comparative) + وصفية',
        notesAr: 'أفضل ممنوع من الصرف للوصفية ووزن أَفْعَل'
      }
    ],

    phraseAnalysis: [
      {
        phrase: 'هَذَا الْأَمْرُ',
        phraseType: 'Demonstrative + noun (subject)',
        phraseTypeAr: 'اسم إشارة + بدل (مبتدأ)',
        function: 'Subject of the nominal sentence',
        functionAr: 'المبتدأ',
        notes: 'هذا is the core subject, الأمر explains it',
        notesAr: 'هذا المبتدأ الأصلي، والأمر بدل منه'
      },
      {
        phrase: 'أَفْضَلُ',
        phraseType: 'Comparative adjective (predicate)',
        phraseTypeAr: 'صفة تفضيل (خبر)',
        function: 'Predicate describing the subject',
        functionAr: 'الخبر',
        notes: 'Diptote - no تنوين despite being indefinite',
        notesAr: 'ممنوع من الصرف - بدون تنوين رغم كونه نكرة'
      }
    ],

    sentenceAnalysis: {
      sentenceType: 'Nominal sentence with comparative predicate',
      sentenceTypeAr: 'جملة اسمية خبرها صفة تفضيل',
      mainComponents: {
        subject: 'هذا الأمرُ',
        subjectAr: 'هذا الأمرُ - مبتدأ وبدل',
        predicate: 'أفضلُ (better)',
        predicateAr: 'أفضلُ - خبر مرفوع'
      },
      structure: 'اسم إشارة + بدل (مبتدأ) + خبر (أَفْعَل)',
      structureAr: 'مبتدأ (إشارة + بدل) + خبر ممنوع من الصرف'
    },

    keyGrammaticalConcepts: [
      {
        concept: 'أَفْعَل الصفة',
        conceptAr: 'صفة على وزن أَفْعَل',
        explanation: 'Adjectives on pattern أَفْعَل (أفضل، أكبر، أصغر، أحسن) are diptotes. They don\'t take تنوين: هذا أفضلُ (not *أفضلٌ). In جر, they take فتحة: من أفضلَ.',
        explanationAr: 'الصفات على وزن أَفْعَل (أفضل، أكبر، أصغر) ممنوعة من الصرف. لا تُنوَّن: هذا أفضلُ. وتُجر بالفتحة: من أفضلَ'
      },
      {
        concept: 'متى ينصرف أَفْعَل؟',
        conceptAr: 'صرف أَفْعَل مع ال والإضافة',
        explanation: 'أَفْعَل becomes triptote with ال or إضافة: الأفضلُ (triptote), أفضلُ الناسِ (triptote, takes كسرة in جر). Without them: أفضلُ (diptote).',
        explanationAr: 'أَفْعَل ينصرف مع ال أو الإضافة: الأفضلُ (منصرف)، أفضلُ الناسِ (منصرف). بدونهما: أفضلُ (ممنوع)'
      },
      {
        concept: 'الفرق بين النكرة والمعرفة هنا',
        conceptAr: 'أفضلُ vs الأفضلُ',
        explanation: 'أفضلُ (indefinite, diptote) means "better than" - comparative. الأفضلُ (definite, triptote) means "the best" - superlative. Both from same root but different grammar.',
        explanationAr: 'أفضلُ (نكرة، ممنوع) = أفضل من غيره - تفضيل. الأفضلُ (معرفة، منصرف) = أفضل الكل - تفضيل مطلق. الجذر واحد لكن الإعراب مختلف'
      }
    ],

    teachingNotes: 'أَفْعَل pattern comparatives are diptotes: أفضلُ، أكبرُ، أصغرُ. Note the absence of تنوين. Compare: هذا أفضلُ (no تنوين) vs هذا كبيرٌ (with تنوين). When you add ال: الأفضلُ becomes triptote!',
    teachingNotesAr: 'صيغة أَفْعَل للتفضيل ممنوعة من الصرف: أفضلُ، أكبرُ، أصغرُ. لاحظ عدم التنوين. قارن: هذا أفضلُ (بلا تنوين) vs هذا كبيرٌ (بتنوين). مع ال: الأفضلُ ينصرف!'
  },

  // Example: Exercise 692 - Diptote: Foreign proper noun (العلمية والعجمة)
  {
    exerciseId: 692,
    arabic: 'آمَنَ إِبْرَاهِيمُ بِاللَّهِ',
    translation: 'Ibrahim believed in Allah',

    wordAnalysis: [
      {
        word: 'آمَنَ',
        transliteration: 'āmana',
        grammaticalRole: 'فعل ماضٍ',
        grammaticalRoleAr: 'فعل ماضٍ',
        caseMarking: 'Built on فتح',
        caseMarkingAr: 'مبني على الفتح',
        wordType: 'Past verb Form IV',
        wordTypeAr: 'فعل ماضٍ من الباب الرابع (أَفْعَلَ)',
        notes: 'He believed - آمن يؤمن (Form IV of أمن)',
        notesAr: 'آمن من آمن يؤمن - أَفْعَلَ يُفْعِلُ'
      },
      {
        word: 'إِبْرَاهِيمُ',
        transliteration: 'ibrāhīmu',
        grammaticalRole: 'فاعل مرفوع',
        grammaticalRoleAr: 'فاعل',
        caseMarking: 'Nominative (رفع) - marked with ضمة (no تنوين)',
        caseMarkingAr: 'مرفوع وعلامة رفعه الضمة ولا يُنوَّن',
        wordType: 'Proper noun - foreign origin (diptote)',
        wordTypeAr: 'علم أعجمي ممنوع من الصرف',
        notes: 'إبراهيم is diptote: proper noun + foreign (العجمة)',
        notesAr: 'إبراهيم ممنوع من الصرف للعلمية والعجمة (أصله عبري)'
      },
      {
        word: 'بِاللَّهِ',
        transliteration: 'bi-llāhi',
        grammaticalRole: 'جار ومجرور',
        grammaticalRoleAr: 'الباء حرف جر + الله اسم مجرور',
        caseMarking: 'Genitive (جر) - marked with كسرة',
        caseMarkingAr: 'مجرور وعلامة جره الكسرة',
        wordType: 'Majestic name - unique declension',
        wordTypeAr: 'لفظ الجلالة',
        notes: 'الله has its own rules - preceded by بـ for آمن',
        notesAr: 'آمن يتعدى بالباء: آمن بالله'
      }
    ],

    phraseAnalysis: [
      {
        phrase: 'إِبْرَاهِيمُ',
        phraseType: 'Foreign proper noun (علم أعجمي)',
        phraseTypeAr: 'علم أعجمي ممنوع من الصرف',
        function: 'Subject of آمن',
        functionAr: 'فاعل للفعل آمن',
        notes: 'Diptote because: العلمية (proper) + العجمة (foreign, Hebrew)',
        notesAr: 'ممنوع من الصرف للعلمية والعجمة - أصله عبري'
      },
      {
        phrase: 'بِاللَّهِ',
        phraseType: 'Prepositional phrase',
        phraseTypeAr: 'جار ومجرور',
        function: 'Object of belief (المؤمَن به)',
        functionAr: 'متعلق بالفعل آمن',
        notes: 'آمن + بـ = believed in',
        notesAr: 'آمن يتعدى بالباء'
      }
    ],

    sentenceAnalysis: {
      sentenceType: 'Verbal sentence with foreign prophet name',
      sentenceTypeAr: 'جملة فعلية فيها اسم نبي أعجمي',
      mainComponents: {
        subject: 'إبراهيمُ (Prophet Ibrahim)',
        subjectAr: 'إبراهيمُ - فاعل مرفوع بالضمة بلا تنوين',
        predicate: 'آمن (believed)',
        predicateAr: 'آمن - فعل ماضٍ'
      },
      structure: 'فعل + فاعل (علم أعجمي) + جار ومجرور',
      structureAr: 'فعل ماضٍ + فاعل ممنوع من الصرف + بـ + اسم مجرور'
    },

    keyGrammaticalConcepts: [
      {
        concept: 'العلمية والعجمة',
        conceptAr: 'العلم الأعجمي الزائد على ثلاثة أحرف',
        explanation: 'Foreign proper nouns exceeding 3 letters are diptotes. إبراهيم (Hebrew origin, 7 letters) is diptote. Compare: إبراهيمُ (no تنوين) but نوحٌ (3 letters, can be triptote).',
        explanationAr: 'العلم الأعجمي إذا زاد على ثلاثة أحرف: ممنوع من الصرف. إبراهيم (أصل عبري، ٧ حروف) ممنوع. قارن: إبراهيمُ vs نوحٌ (ثلاثي قد ينصرف)'
      },
      {
        concept: 'أسماء الأنبياء الأعجمية',
        conceptAr: 'أسماء الأنبياء الممنوعة من الصرف',
        explanation: 'Many prophet names are foreign and diptote: إبراهيم، إسماعيل، إسحاق، يعقوب، يوسف، موسى، عيسى، داود، سليمان. But محمد is Arabic (triptote).',
        explanationAr: 'كثير من أسماء الأنبياء أعجمية ممنوعة: إبراهيم، إسماعيل، يوسف، موسى، عيسى. لكن محمدٌ عربي (منصرف)'
      },
      {
        concept: 'شرط الزيادة على ثلاثة',
        conceptAr: 'الثلاثي الأعجمي قد ينصرف',
        explanation: 'Three-letter foreign names CAN be triptote: نوحٌ، لوطٌ، هودٌ. But longer ones are always diptote: إبراهيمُ، إسماعيلُ، يعقوبُ.',
        explanationAr: 'الاسم الأعجمي الثلاثي قد ينصرف: نوحٌ، لوطٌ، هودٌ. لكن الزائد على ثلاثة ممنوع دائمًا: إبراهيمُ، إسماعيلُ'
      }
    ],

    teachingNotes: 'إبراهيم is the classic example of العلمية والعجمة. It comes from Hebrew (אברהם). Foreign proper nouns over 3 letters are always diptote. Note the beautiful simplicity: آمنَ إبراهيمُ - faith described in just two words.',
    teachingNotesAr: 'إبراهيم المثال الكلاسيكي للعلمية والعجمة. أصله عبري. الأعجمي الزائد على ثلاثة أحرف ممنوع دائمًا. لاحظ جمال البساطة: آمنَ إبراهيمُ - الإيمان في كلمتين'
  },

  // Example: Exercise 693 - Diptote: إسماعيل (foreign prophet name)
  {
    exerciseId: 693,
    arabic: 'دَعَا إِسْمَاعِيلُ رَبَّهُ',
    translation: 'Ismail called upon his Lord',

    wordAnalysis: [
      {
        word: 'دَعَا',
        transliteration: 'daʿā',
        grammaticalRole: 'فعل ماضٍ',
        grammaticalRoleAr: 'فعل ماضٍ',
        caseMarking: 'Built on فتح مقدر',
        caseMarkingAr: 'مبني على الفتح المقدر على الألف',
        wordType: 'Past verb (hollow verb)',
        wordTypeAr: 'فعل ماضٍ ناقص (معتل الآخر)',
        notes: 'He called/prayed - دعا يدعو (Form I)',
        notesAr: 'دعا من دعا يدعو - فعل ناقص'
      },
      {
        word: 'إِسْمَاعِيلُ',
        transliteration: 'ismāʿīlu',
        grammaticalRole: 'فاعل مرفوع',
        grammaticalRoleAr: 'فاعل',
        caseMarking: 'Nominative (رفع) - marked with ضمة (no تنوين)',
        caseMarkingAr: 'مرفوع وعلامة رفعه الضمة ولا يُنوَّن',
        wordType: 'Proper noun - foreign origin (diptote)',
        wordTypeAr: 'علم أعجمي ممنوع من الصرف',
        notes: 'إسماعيل is diptote: العلمية + العجمة (Hebrew/Aramaic)',
        notesAr: 'إسماعيل ممنوع من الصرف للعلمية والعجمة'
      },
      {
        word: 'رَبَّهُ',
        transliteration: 'rabbahu',
        grammaticalRole: 'مفعول به + ضمير مضاف إليه',
        grammaticalRoleAr: 'مفعول به + ضمير مضاف إليه',
        caseMarking: 'Accusative (نصب) - marked with فتحة',
        caseMarkingAr: 'منصوب وعلامة نصبه الفتحة',
        wordType: 'Noun + attached pronoun',
        wordTypeAr: 'اسم مضاف + ضمير متصل',
        notes: 'His Lord - ربّ + هُ',
        notesAr: 'ربَّهُ: ربّ مضاف والهاء مضاف إليه'
      }
    ],

    phraseAnalysis: [
      {
        phrase: 'إِسْمَاعِيلُ',
        phraseType: 'Foreign proper noun (prophet name)',
        phraseTypeAr: 'علم نبي أعجمي',
        function: 'Subject of دعا',
        functionAr: 'فاعل الفعل دعا',
        notes: 'Son of Ibrahim - his name is diptote (foreign)',
        notesAr: 'ابن إبراهيم - اسمه ممنوع من الصرف للعجمة'
      },
      {
        phrase: 'رَبَّهُ',
        phraseType: 'Possessed noun (إضافة)',
        phraseTypeAr: 'مضاف ومضاف إليه',
        function: 'Object of دعا (whom he called)',
        functionAr: 'مفعول به - المدعو',
        notes: 'دعا takes direct object when meaning "called upon"',
        notesAr: 'دعا يتعدى بنفسه بمعنى نادى'
      }
    ],

    sentenceAnalysis: {
      sentenceType: 'Verbal sentence with prophet name',
      sentenceTypeAr: 'جملة فعلية فيها اسم نبي أعجمي',
      mainComponents: {
        subject: 'إسماعيلُ (Prophet Ismail)',
        subjectAr: 'إسماعيلُ - فاعل مرفوع بالضمة بلا تنوين',
        predicate: 'دعا (called upon)',
        predicateAr: 'دعا - فعل ماضٍ'
      },
      structure: 'فعل + فاعل (علم أعجمي) + مفعول به (مضاف)',
      structureAr: 'فعل ماضٍ + فاعل ممنوع من الصرف + مفعول به مضاف'
    },

    keyGrammaticalConcepts: [
      {
        concept: 'إسماعيل - اسم أعجمي',
        conceptAr: 'أصل الاسم ومعناه',
        explanation: 'إسماعيل is from Hebrew/Aramaic (ישמעאל), meaning "God will hear." Being foreign and exceeding 3 letters, it is diptote. Compare: إسماعيلُ (no تنوين).',
        explanationAr: 'إسماعيل أصله عبري (يشمعئيل) بمعنى: الله يسمع. أعجمي زائد على ثلاثة أحرف فهو ممنوع: إسماعيلُ (بلا تنوين)'
      },
      {
        concept: 'مقارنة: إسماعيل vs محمد',
        conceptAr: 'أعجمي vs عربي',
        explanation: 'إسماعيل (foreign) is diptote: إسماعيلُ (ضمة alone). محمد (Arabic) is triptote: محمدٌ (ضمة + تنوين). Same case, different endings.',
        explanationAr: 'إسماعيل (أعجمي) ممنوع: إسماعيلُ. محمد (عربي) منصرف: محمدٌ. نفس الإعراب لكن التنوين مختلف'
      },
      {
        concept: 'أبناء إبراهيم',
        conceptAr: 'إسماعيل وإسحاق',
        explanation: 'Both sons of Ibrahim have foreign names: إسماعيلُ، إسحاقُ. Both are diptotes. Their father\'s name إبراهيمُ is also diptote. All three: foreign proper nouns.',
        explanationAr: 'ابنا إبراهيم كلاهما أعجميان: إسماعيلُ، إسحاقُ. كلاهما ممنوع. وأبوهما إبراهيمُ أيضًا ممنوع. ثلاثتهم أعلام أعجمية'
      }
    ],

    teachingNotes: 'إسماعيل demonstrates العلمية والعجمة beautifully. Students often forget that many Quranic names are Hebrew/Aramaic in origin. إسماعيل، إسحاق، يعقوب، يوسف - all foreign, all diptote. But عربي names like محمدٌ، أحمدُ follow different rules.',
    teachingNotesAr: 'إسماعيل يُظهر العلمية والعجمة بوضوح. كثير من الأسماء القرآنية عبرية الأصل. إسماعيل، إسحاق، يعقوب - كلها أعجمية ممنوعة. لكن الأسماء العربية كمحمدٌ لها أحكام مختلفة'
  },

  // Example: Exercise 694 - Diptote: Allah spoke to Musa (masdar emphasis)
  {
    exerciseId: 694,
    arabic: 'كَلَّمَ اللَّهُ مُوسَى تَكْلِيمًا',
    translation: 'Allah spoke to Musa with direct speech',

    wordAnalysis: [
      {
        word: 'كَلَّمَ',
        transliteration: 'kallama',
        grammaticalRole: 'فعل ماضٍ',
        grammaticalRoleAr: 'فعل ماضٍ',
        caseMarking: 'Built on فتح',
        caseMarkingAr: 'مبني على الفتح',
        wordType: 'Past verb Form II',
        wordTypeAr: 'فعل ماضٍ من الباب الثاني (فعّل)',
        notes: 'He spoke to - كلّم يكلّم (Form II, transitive)',
        notesAr: 'كلّم من كلّم يكلّم - فعّل يفعّل - متعدٍّ'
      },
      {
        word: 'اللَّهُ',
        transliteration: 'allāhu',
        grammaticalRole: 'فاعل مرفوع',
        grammaticalRoleAr: 'فاعل',
        caseMarking: 'Nominative (رفع) - marked with ضمة',
        caseMarkingAr: 'مرفوع وعلامة رفعه الضمة',
        wordType: 'Majestic name',
        wordTypeAr: 'لفظ الجلالة',
        notes: 'The subject - Allah',
        notesAr: 'الفاعل - الله تعالى'
      },
      {
        word: 'مُوسَى',
        transliteration: 'mūsā',
        grammaticalRole: 'مفعول به منصوب',
        grammaticalRoleAr: 'مفعول به',
        caseMarking: 'Accusative (نصب) - فتحة مقدرة (no تنوين)',
        caseMarkingAr: 'منصوب وعلامة نصبه الفتحة المقدرة على الألف',
        wordType: 'Proper noun - foreign, ends in ألف (diptote)',
        wordTypeAr: 'علم أعجمي منتهٍ بألف - ممنوع من الصرف',
        notes: 'موسى is diptote: العلمية + العجمة + ends in ألف مقصورة',
        notesAr: 'موسى ممنوع من الصرف للعلمية والعجمة والألف المقصورة'
      },
      {
        word: 'تَكْلِيمًا',
        transliteration: 'taklīman',
        grammaticalRole: 'مفعول مطلق',
        grammaticalRoleAr: 'مفعول مطلق',
        caseMarking: 'Accusative (نصب) - with تنوين',
        caseMarkingAr: 'منصوب وعلامة نصبه الفتحة مع التنوين',
        wordType: 'Verbal noun (masdar) - triptote',
        wordTypeAr: 'مصدر منصرف من كلّم',
        notes: 'تكليمًا emphasizes the directness of Allah\'s speech',
        notesAr: 'تكليمًا مصدر للتوكيد - يؤكد حقيقة الكلام مباشرةً'
      }
    ],

    phraseAnalysis: [
      {
        phrase: 'كَلَّمَ اللَّهُ مُوسَى',
        phraseType: 'Verbal sentence core',
        phraseTypeAr: 'جملة فعلية أصلية',
        function: 'Main statement about divine speech',
        functionAr: 'إثبات الكلام الإلهي لموسى',
        notes: 'Quranic fact - Allah spoke directly to Musa',
        notesAr: 'حقيقة قرآنية - الله كلّم موسى مباشرةً'
      },
      {
        phrase: 'تَكْلِيمًا',
        phraseType: 'مفعول مطلق للتوكيد',
        phraseTypeAr: 'مفعول مطلق مؤكد',
        function: 'Emphatic object - confirms direct speech',
        functionAr: 'يؤكد أن الكلام كان حقيقيًا مباشرًا',
        notes: 'This word refutes those who deny Allah speaks',
        notesAr: 'هذه الكلمة ترد على من ينفي صفة الكلام لله'
      }
    ],

    sentenceAnalysis: {
      sentenceType: 'Quranic sentence with foreign prophet name and emphatic masdar',
      sentenceTypeAr: 'جملة قرآنية فيها علم أعجمي ومفعول مطلق للتوكيد',
      mainComponents: {
        subject: 'الله (Allah)',
        subjectAr: 'الله - فاعل مرفوع',
        predicate: 'كلّم (spoke to)',
        predicateAr: 'كلّم - فعل ماضٍ'
      },
      structure: 'فعل + فاعل + مفعول به (علم أعجمي) + مفعول مطلق',
      structureAr: 'فعل ماضٍ + فاعل + مفعول به ممنوع + مفعول مطلق للتوكيد'
    },

    keyGrammaticalConcepts: [
      {
        concept: 'موسى - إعراب مقدّر',
        conceptAr: 'الاسم المنتهي بألف لازمة',
        explanation: 'موسى ends in ألف مقصورة which doesn\'t accept حركات. All case markers are مقدّرة (implied): موسى (ضمة مقدرة), موسى (فتحة مقدرة), موسى (فتحة مقدرة for جر too because diptote).',
        explanationAr: 'موسى منتهٍ بألف لازمة لا تقبل الحركات. فإعرابه مقدّر: رفعًا بضمة مقدرة، نصبًا بفتحة مقدرة، جرًّا بفتحة مقدرة (لأنه ممنوع)'
      },
      {
        concept: 'المفعول المطلق للتوكيد',
        conceptAr: 'تأكيد الفعل بالمصدر',
        explanation: 'The مفعول مطلق (تكليمًا) from the same root as the verb (كلّم) emphasizes that the action truly happened. It confirms Allah REALLY spoke, not metaphorically.',
        explanationAr: 'المفعول المطلق (تكليمًا) من نفس جذر الفعل (كلّم) يؤكد حقيقة الفعل. يُثبت أن الله كلّم موسى حقيقةً لا مجازًا'
      },
      {
        concept: 'الفرق بين موسى ومحمد',
        conceptAr: 'أحدهما أعجمي والآخر عربي',
        explanation: 'موسى is foreign (Hebrew משה) → diptote. محمدٌ is Arabic → triptote. Compare: رأيتُ موسى (no تنوين, فتحة مقدرة) vs رأيتُ محمدًا (with تنوين).',
        explanationAr: 'موسى أعجمي (عبري) ← ممنوع. محمدٌ عربي ← منصرف. قارن: رأيتُ موسى vs رأيتُ محمدًا'
      }
    ],

    teachingNotes: 'This famous verse (4:164) demonstrates موسى as a diptote (foreign name). The مفعول مطلق تكليمًا is theologically significant - it confirms Allah\'s attribute of speech (صفة الكلام). Grammatically, note موسى has implied case markers due to the final ألف.',
    teachingNotesAr: 'هذه الآية الشهيرة (النساء ١٦٤) تُظهر موسى كممنوع من الصرف. المفعول المطلق تكليمًا له أهمية عقدية - يُثبت صفة الكلام لله. نحويًا: إعراب موسى مقدّر على الألف'
  }
];
