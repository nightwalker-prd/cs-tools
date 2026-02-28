/**
 * Expert Sarf Analysis Examples
 * Detailed morphological analyses for exercises
 */

export interface SarfAnalysisLevel {
  title: string;
  content: string;
  arabicText?: string;
}

export interface SarfAnalysisExample {
  exerciseId: number;
  word: string;
  
  // Root Analysis (جذر)
  rootAnalysis: {
    root: string;
    meaning: string;
    familyWords?: string[]; // Other words from same root
  };
  
  // Pattern Analysis (وزن)
  patternAnalysis: {
    pattern: string;
    patternMeaning: string;
    function: string; // What this pattern indicates
    patternTranslit?: string; // Optional pattern transliteration
  };
  
  // Morphological Breakdown
  morphology: {
    category: string; // verb, noun, participle, etc.
    form?: string; // I-X for verbs
    structure: string; // How it's built
    changes?: string; // Any morphological changes
  };
  
  // Usage & Grammar
  usage: {
    grammaticalRole: string;
    prepositions?: string[];
    examples: string[];
  };
  
  // Related Forms (تصريف)
  relatedForms?: {
    pastTense?: string;
    presentTense?: string;
    imperative?: string;
    activeParticiple?: string;
    passiveParticiple?: string;
    masdar?: string;
  };
  
  // Advanced Notes
  notes?: string;
}

export const sarfAnalysisExamples: SarfAnalysisExample[] = [
  {
    exerciseId: 1,
    word: 'كَتَبَ',
    rootAnalysis: {
      root: 'ك ت ب',
      meaning: 'writing, inscription',
      familyWords: ['كِتَاب (book)', 'كَاتِب (writer)', 'مَكْتُوب (written)', 'مَكْتَب (office)']
    },
    patternAnalysis: {
      pattern: 'فَعَلَ',
      patternMeaning: 'Basic trilateral verb pattern',
      function: 'Indicates simple past action in Form I'
    },
    morphology: {
      category: 'Past tense verb',
      form: 'I',
      structure: 'ك (root 1) + تَ (root 2) + بَ (root 3) with vowel pattern فَعَلَ',
      changes: 'No irregular changes - regular Form I verb'
    },
    usage: {
      grammaticalRole: 'Transitive verb taking a direct object (مفعول به)',
      examples: [
        'كَتَبَ الطَّالِبُ الدَّرْسَ (The student wrote the lesson)',
        'كَتَبْتُ رِسَالَةً (I wrote a letter)'
      ]
    },
    relatedForms: {
      pastTense: 'كَتَبَ',
      presentTense: 'يَكْتُبُ',
      imperative: 'اُكْتُبْ',
      activeParticiple: 'كَاتِب',
      passiveParticiple: 'مَكْتُوب',
      masdar: 'كِتَابَة / كَتْب'
    },
    notes: 'One of the most common Form I verbs. Used extensively in Quranic Arabic.'
  },
  {
    exerciseId: 4,
    word: 'كَاتِب',
    rootAnalysis: {
      root: 'ك ت ب',
      meaning: 'writing, inscription',
      familyWords: ['كَتَبَ (wrote)', 'كِتَاب (book)', 'مَكْتُوب (written)']
    },
    patternAnalysis: {
      pattern: 'فَاعِل',
      patternMeaning: 'Active participle pattern for Form I',
      function: 'Indicates the doer of the action (اسم الفاعل)'
    },
    morphology: {
      category: 'Active participle (اسم الفاعل)',
      form: 'I',
      structure: 'ك (root 1) + ا (long vowel) + تِ (root 2 + kasra) + ب (root 3)',
      changes: 'Regular formation - middle root letter takes kasra, alif added after first root'
    },
    usage: {
      grammaticalRole: 'Can function as noun (writer) or adjective (writing/one who writes)',
      examples: [
        'الْكَاتِبُ مَشْهُورٌ (The writer is famous)',
        'رَجُلٌ كَاتِبٌ (A writing man / a man who writes)'
      ]
    },
    relatedForms: {
      pastTense: 'كَتَبَ',
      presentTense: 'يَكْتُبُ',
      activeParticiple: 'كَاتِب',
      passiveParticiple: 'مَكْتُوب',
      masdar: 'كِتَابَة'
    },
    notes: 'Active participles in Arabic can indicate current or habitual action, similar to English -ing or -er'
  },
  {
    exerciseId: 7,
    word: 'مَكْتُوب',
    rootAnalysis: {
      root: 'ك ت ب',
      meaning: 'writing, inscription',
      familyWords: ['كَتَبَ (wrote)', 'كَاتِب (writer)', 'كِتَاب (book)']
    },
    patternAnalysis: {
      pattern: 'مَفْعُول',
      patternMeaning: 'Passive participle pattern for Form I',
      function: 'Indicates the recipient of the action (اسم المفعول)'
    },
    morphology: {
      category: 'Passive participle (اسم المفعول)',
      form: 'I',
      structure: 'مَـ prefix + كْ (root 1 + sukūn) + تُو (root 2 + long ū) + ب (root 3)',
      changes: 'Regular formation with prefix مَـ and long vowel ū before last root letter'
    },
    usage: {
      grammaticalRole: 'Can function as noun or adjective indicating something acted upon',
      examples: [
        'الْكِتَابُ مَكْتُوبٌ (The book is written)',
        'رِسَالَةٌ مَكْتُوبَةٌ (A written letter)'
      ]
    },
    relatedForms: {
      pastTense: 'كَتَبَ',
      presentTense: 'يَكْتُبُ',
      activeParticiple: 'كَاتِب',
      passiveParticiple: 'مَكْتُوب',
      masdar: 'كِتَابَة'
    },
    notes: 'Passive participles can function similar to past participles in English'
  },
  {
    exerciseId: 11,
    word: 'عَلَّمَ',
    rootAnalysis: {
      root: 'ع ل م',
      meaning: 'knowledge, knowing',
      familyWords: ['عَلِمَ (he knew)', 'عَالِم (scholar)', 'عِلْم (knowledge)', 'مُعَلِّم (teacher)']
    },
    patternAnalysis: {
      pattern: 'فَعَّلَ',
      patternMeaning: 'Form II verb pattern with doubled middle radical',
      function: 'Often indicates causative (making someone do Form I) or intensive meaning'
    },
    morphology: {
      category: 'Past tense verb',
      form: 'II',
      structure: 'عَـ (root 1 + fatha) + لَّ (root 2 doubled with shadda) + مَ (root 3)',
      changes: 'Middle radical is doubled (shadda) - characteristic of Form II'
    },
    usage: {
      grammaticalRole: 'Transitive verb, causative of عَلِمَ (to know)',
      examples: [
        'عَلَّمَ الْمُعَلِّمُ الطُّلَّابَ (The teacher taught the students)',
        'عَلَّمَهُ الْقُرْآنَ (He taught him the Quran)'
      ]
    },
    relatedForms: {
      pastTense: 'عَلَّمَ',
      presentTense: 'يُعَلِّمُ',
      imperative: 'عَلِّمْ',
      activeParticiple: 'مُعَلِّم',
      passiveParticiple: 'مُعَلَّم',
      masdar: 'تَعْلِيم'
    },
    notes: 'Form II of عَلِمَ (to know) becomes عَلَّمَ (to teach/make someone know) - classic causative usage'
  },
  {
    exerciseId: 13,
    word: 'مُعَلِّم',
    rootAnalysis: {
      root: 'ع ل م',
      meaning: 'knowledge, knowing',
      familyWords: ['عَلَّمَ (taught)', 'عَالِم (scholar)', 'عِلْم (knowledge)']
    },
    patternAnalysis: {
      pattern: 'مُفَعِّل',
      patternMeaning: 'Active participle pattern for Form II',
      function: 'Indicates the doer of Form II action'
    },
    morphology: {
      category: 'Active participle from Form II',
      form: 'II',
      structure: 'مُـ prefix + عَلِّ (first two roots with doubled second) + م (third root)',
      changes: 'Prefix مُـ with damma, doubled middle radical with kasra'
    },
    usage: {
      grammaticalRole: 'Noun meaning "teacher" or adjective "teaching"',
      examples: [
        'الْمُعَلِّمُ فِي الْفَصْلِ (The teacher is in the classroom)',
        'رَجُلٌ مُعَلِّمٌ (A teaching man / a teacher)'
      ]
    },
    relatedForms: {
      pastTense: 'عَلَّمَ',
      presentTense: 'يُعَلِّمُ',
      activeParticiple: 'مُعَلِّم',
      passiveParticiple: 'مُعَلَّم',
      masdar: 'تَعْلِيم'
    },
    notes: 'One of the most common occupational nouns in Arabic'
  },
  {
    exerciseId: 20,
    word: 'أَسْلَمَ',
    rootAnalysis: {
      root: 'س ل م',
      meaning: 'safety, peace, submission',
      familyWords: ['سَلِمَ (was safe)', 'سَلَام (peace)', 'مُسْلِم (Muslim)', 'إِسْلَام (Islam)']
    },
    patternAnalysis: {
      pattern: 'أَفْعَلَ',
      patternMeaning: 'Form IV verb pattern with hamza prefix',
      function: 'Often makes intransitive verbs transitive or adds causative meaning'
    },
    morphology: {
      category: 'Past tense verb',
      form: 'IV',
      structure: 'أَ hamza prefix + سْلَمَ (roots with sukūn on first radical)',
      changes: 'Hamza prefix is characteristic of Form IV'
    },
    usage: {
      grammaticalRole: 'Intransitive verb meaning to submit (to Allah)',
      examples: [
        'أَسْلَمَ الرَّجُلُ (The man embraced Islam)',
        'أَسْلَمْتُ وَجْهِيَ لِلَّهِ (I have submitted myself to Allah)'
      ]
    },
    relatedForms: {
      pastTense: 'أَسْلَمَ',
      presentTense: 'يُسْلِمُ',
      imperative: 'أَسْلِمْ',
      activeParticiple: 'مُسْلِم',
      passiveParticiple: 'مُسْلَم',
      masdar: 'إِسْلَام'
    },
    notes: 'From root س ل م (peace/safety). Form IV adds meaning of entering into that state (submission)'
  },
  {
    exerciseId: 22,
    word: 'مُسْلِم',
    rootAnalysis: {
      root: 'س ل م',
      meaning: 'safety, peace, submission',
      familyWords: ['أَسْلَمَ (submitted)', 'إِسْلَام (Islam)', 'سَلَام (peace)']
    },
    patternAnalysis: {
      pattern: 'مُفْعِل',
      patternMeaning: 'Active participle pattern for Form IV',
      function: 'Indicates the doer of Form IV action'
    },
    morphology: {
      category: 'Active participle from Form IV',
      form: 'IV',
      structure: 'مُـ prefix + سْلِم (roots with sukūn on first, kasra on second)',
      changes: 'Prefix مُـ is characteristic of Form IV active participle'
    },
    usage: {
      grammaticalRole: 'Noun/adjective meaning "Muslim, one who submits"',
      examples: [
        'الْمُسْلِمُ أَخُو الْمُسْلِمِ (The Muslim is the brother of the Muslim)',
        'رَجُلٌ مُسْلِمٌ (A Muslim man)'
      ]
    },
    relatedForms: {
      pastTense: 'أَسْلَمَ',
      presentTense: 'يُسْلِمُ',
      activeParticiple: 'مُسْلِم',
      passiveParticiple: 'مُسْلَم',
      masdar: 'إِسْلَام'
    },
    notes: 'The word "Muslim" in English comes from this active participle'
  },
  {
    exerciseId: 24,
    word: 'تَعَلَّمَ',
    rootAnalysis: {
      root: 'ع ل م',
      meaning: 'knowledge, knowing',
      familyWords: ['عَلِمَ (knew)', 'عَلَّمَ (taught)', 'عَالِم (scholar)', 'عِلْم (knowledge)']
    },
    patternAnalysis: {
      pattern: 'تَفَعَّلَ',
      patternMeaning: 'Form V verb pattern - reflexive/passive of Form II',
      function: 'Often indicates reflexive action or effort to achieve Form II meaning'
    },
    morphology: {
      category: 'Past tense verb',
      form: 'V',
      structure: 'تَـ prefix + عَلَّمَ (with doubled middle radical like Form II)',
      changes: 'تَـ prefix and doubled middle radical are Form V characteristics'
    },
    usage: {
      grammaticalRole: 'Transitive verb meaning "to learn" (reflexive of "to teach")',
      examples: [
        'تَعَلَّمَ الْعَرَبِيَّةَ (He learned Arabic)',
        'تَعَلَّمْتُ الْقُرْآنَ (I learned the Quran)'
      ]
    },
    relatedForms: {
      pastTense: 'تَعَلَّمَ',
      presentTense: 'يَتَعَلَّمُ',
      imperative: 'تَعَلَّمْ',
      activeParticiple: 'مُتَعَلِّم',
      passiveParticiple: 'مُتَعَلَّم',
      masdar: 'تَعَلُّم'
    },
    notes: 'Perfect example of Form V being reflexive of Form II: عَلَّمَ (taught) → تَعَلَّمَ (learned)'
  },
  {
    exerciseId: 30,
    word: 'اِجْتَهَدَ',
    rootAnalysis: {
      root: 'ج ه د',
      meaning: 'effort, striving',
      familyWords: ['جَهَدَ (strove)', 'جِهَاد (struggle)', 'مُجَاهِد (striver)']
    },
    patternAnalysis: {
      pattern: 'اِفْتَعَلَ',
      patternMeaning: 'Form VIII verb pattern with infixed تـ',
      function: 'Often indicates reflexive or intensive meaning, effort or acquisition'
    },
    morphology: {
      category: 'Past tense verb',
      form: 'VIII',
      structure: 'اِـ prefix + ج (root 1) + تَ (infixed تـ) + هَدَ (roots 2-3)',
      changes: 'The تـ is infixed after the first root letter - characteristic of Form VIII'
    },
    usage: {
      grammaticalRole: 'Intransitive verb meaning "to exert effort, be diligent"',
      prepositions: ['فِي (in)'],
      examples: [
        'اِجْتَهَدَ فِي الدِّرَاسَةِ (He exerted effort in studying)',
        'اِجْتَهَدَ الطَّالِبُ (The student was diligent)'
      ]
    },
    relatedForms: {
      pastTense: 'اِجْتَهَدَ',
      presentTense: 'يَجْتَهِدُ',
      imperative: 'اِجْتَهِدْ',
      activeParticiple: 'مُجْتَهِد',
      masdar: 'اِجْتِهَاد'
    },
    notes: 'اجتهاد (ijtihad) in Islamic law means independent legal reasoning'
  },
  {
    exerciseId: 34,
    word: 'اِسْتَغْفَرَ',
    rootAnalysis: {
      root: 'غ ف ر',
      meaning: 'forgiveness, covering (sins)',
      familyWords: ['غَفَرَ (forgave)', 'غَفُور (Forgiving)', 'مَغْفِرَة (forgiveness)']
    },
    patternAnalysis: {
      pattern: 'اِسْتَفْعَلَ',
      patternMeaning: 'Form X verb pattern - seeking or requesting',
      function: 'Primarily means to seek or request the Form I meaning'
    },
    morphology: {
      category: 'Past tense verb',
      form: 'X',
      structure: 'اِسْتَـ prefix + غْفَرَ (roots with sukūn on first)',
      changes: 'اِسْتَـ prefix is the defining characteristic of Form X'
    },
    usage: {
      grammaticalRole: 'Transitive verb meaning "to seek forgiveness"',
      examples: [
        'اِسْتَغْفَرَ اللهَ (He sought forgiveness from Allah)',
        'اِسْتَغْفِرُوا رَبَّكُمْ (Seek forgiveness from your Lord)'
      ]
    },
    relatedForms: {
      pastTense: 'اِسْتَغْفَرَ',
      presentTense: 'يَسْتَغْفِرُ',
      imperative: 'اِسْتَغْفِرْ',
      activeParticiple: 'مُسْتَغْفِر',
      masdar: 'اِسْتِغْفَار'
    },
    notes: 'Classic Form X: غَفَرَ (to forgive) → اِسْتَغْفَرَ (to seek forgiveness). Extremely common in Islamic practice'
  },
  {
    exerciseId: 38,
    word: 'مَسْجِد',
    rootAnalysis: {
      root: 'س ج د',
      meaning: 'prostration, bowing down',
      familyWords: ['سَجَدَ (prostrated)', 'سَاجِد (one prostrating)', 'سُجُود (prostration)']
    },
    patternAnalysis: {
      pattern: 'مَفْعِل',
      patternMeaning: 'Noun of place or time pattern',
      function: 'Indicates the place where the root action occurs'
    },
    morphology: {
      category: 'Noun of place (اسم المكان)',
      structure: 'مَـ prefix + سْجِد (roots with kasra before last letter)',
      changes: 'The مَـ prefix with pattern مَفْعِل/مَفْعَل indicates place'
    },
    usage: {
      grammaticalRole: 'Noun meaning "place of prostration, mosque"',
      prepositions: ['فِي (in)', 'إِلَى (to)', 'مِنَ (from)'],
      examples: [
        'ذَهَبَ إِلَى الْمَسْجِدِ (He went to the mosque)',
        'صَلَّى فِي الْمَسْجِدِ (He prayed in the mosque)'
      ]
    },
    notes: 'The word "mosque" in English comes from مَسْجِد. Pattern مَفْعِل often forms nouns of place'
  }
];
