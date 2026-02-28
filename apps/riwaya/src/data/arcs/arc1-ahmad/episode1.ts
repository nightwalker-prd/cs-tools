import type { StoryEpisode } from '../../../types';

export const episode: StoryEpisode = {
  id: 'arc1-ep1',
  arcId: 'arc1-ahmad',
  number: 1,
  titleAr: 'الوُصُولُ',
  titleEn: 'Arrival',
  setting: 'Ahmad arrives at a Saudi university campus for his first day. He enters the registration building and meets the receptionist and another student.',
  characters: [
    { id: 'ahmad', nameAr: 'أَحْمَدُ', nameEn: 'Ahmad', role: 'protagonist' },
    { id: 'receptionist', nameAr: 'المُوَظَّفُ', nameEn: 'Receptionist', role: 'supporting' },
    { id: 'yusuf', nameAr: 'يُوسُفُ', nameEn: 'Yusuf', role: 'supporting' },
  ],
  dialogueLines: [
    { speaker: 'ahmad', textAr: 'السَّلَامُ عَلَيْكُمْ.', textEn: 'Peace be upon you.' },
    { speaker: 'receptionist', textAr: 'وَعَلَيْكُمُ السَّلَامُ وَرَحْمَةُ اللهِ. أَهْلًا وَسَهْلًا! أَأَنْتَ طَالِبٌ جَدِيدٌ؟', textEn: 'And upon you be peace and the mercy of Allah. Welcome! Are you a new student?' },
    { speaker: 'ahmad', textAr: 'نَعَمْ، أَنَا طَالِبٌ جَدِيدٌ. اسْمِي أَحْمَدُ.', textEn: 'Yes, I am a new student. My name is Ahmad.' },
    { speaker: 'receptionist', textAr: 'أَهْلًا يَا أَحْمَدُ. مِنْ أَيْنَ أَنْتَ؟', textEn: 'Welcome, Ahmad. Where are you from?' },
    { speaker: 'ahmad', textAr: 'أَنَا مِنْ مِصْرَ. أَنَا مِنَ القَاهِرَةِ.', textEn: 'I am from Egypt. I am from Cairo.' },
    { speaker: 'receptionist', textAr: 'مَا شَاءَ اللهُ! هَذَا فَصْلُكَ. الفَصْلُ فِي الطَّابِقِ الثَّانِي.', textEn: 'Ma sha Allah! This is your class. The classroom is on the second floor.' },
    { speaker: 'ahmad', textAr: 'شُكْرًا جَزِيلًا.', textEn: 'Thank you very much.' },
    { speaker: 'yusuf', textAr: 'السَّلَامُ عَلَيْكُمْ! أَنَا يُوسُفُ. أَنَا طَالِبٌ أَيْضًا. هَلْ أَنْتَ فِي الفَصْلِ الأَوَّلِ؟', textEn: 'Peace be upon you! I am Yusuf. I am also a student. Are you in the first class?' },
    { speaker: 'ahmad', textAr: 'وَعَلَيْكُمُ السَّلَامُ. نَعَمْ! أَنَا فِي الفَصْلِ الأَوَّلِ.', textEn: 'And upon you be peace. Yes! I am in the first class.' },
    { speaker: 'yusuf', textAr: 'الحَمْدُ لِلَّهِ! أَنَا أَيْضًا فِي الفَصْلِ الأَوَّلِ. تَعَالَ مَعِي!', textEn: 'Praise be to Allah! I am also in the first class. Come with me!' },
  ],
  vocabulary: [
    { arabic: 'السَّلَامُ عَلَيْكُمْ', transliteration: 'as-salāmu ʿalaykum', english: 'peace be upon you', root: 'س-ل-م' },
    { arabic: 'طَالِبٌ', transliteration: 'ṭālib', english: 'student', root: 'ط-ل-ب' },
    { arabic: 'جَدِيدٌ', transliteration: 'jadīd', english: 'new', root: 'ج-د-د' },
    { arabic: 'اسْمِي', transliteration: 'ismī', english: 'my name', root: 'س-م-و' },
    { arabic: 'مِنْ أَيْنَ', transliteration: 'min ayna', english: 'from where' },
    { arabic: 'فَصْلٌ', transliteration: 'faṣl', english: 'classroom / class', root: 'ف-ص-ل' },
    { arabic: 'الطَّابِقُ', transliteration: 'aṭ-ṭābiq', english: 'floor / story', root: 'ط-ب-ق' },
    { arabic: 'تَعَالَ', transliteration: 'taʿāla', english: 'come', root: 'ع-ل-و' },
  ],
  grammarPoint: {
    titleAr: 'الجُمْلَةُ الاسْمِيَّةُ',
    titleEn: 'The Nominal Sentence',
    explanation: 'Arabic sentences can begin with a noun (mubtada) followed by a predicate (khabar). For example: أَنَا طَالِبٌ (I am a student). There is no verb "to be" in the present tense. The subject (أَنَا) is the mubtada and the predicate (طَالِبٌ) is the khabar.',
    examples: [
      'أَنَا طَالِبٌ جَدِيدٌ — I am a new student',
      'هَذَا فَصْلُكَ — This is your classroom',
      'أَنَا مِنْ مِصْرَ — I am from Egypt',
    ],
  },
  comprehensionQuestions: [
    {
      questionAr: 'مِنْ أَيْنَ أَحْمَدُ؟',
      questionEn: 'Where is Ahmad from?',
      options: ['مِنَ المَدِينَةِ', 'مِنَ القَاهِرَةِ', 'مِنَ الرِّيَاضِ', 'مِنْ لُنْدُنَ'],
      correctIndex: 1,
    },
    {
      questionAr: 'أَيْنَ الفَصْلُ؟',
      questionEn: 'Where is the classroom?',
      options: ['فِي الطَّابِقِ الأَوَّلِ', 'فِي الطَّابِقِ الثَّانِي', 'فِي الطَّابِقِ الثَّالِثِ', 'فِي المَكْتَبَةِ'],
      correctIndex: 1,
    },
    {
      questionAr: 'مَنْ يُوسُفُ؟',
      questionEn: 'Who is Yusuf?',
      options: ['مُعَلِّمٌ', 'مُوَظَّفٌ', 'طَالِبٌ', 'طَبِيبٌ'],
      correctIndex: 2,
    },
  ],
  culturalNotes: [
    'The greeting السَّلَامُ عَلَيْكُمْ is the standard Islamic greeting, replied to with وَعَلَيْكُمُ السَّلَامُ. It is customary to add وَرَحْمَةُ اللهِ وَبَرَكَاتُهُ for added warmth.',
    'Saudi universities often have dedicated Arabic programs for international students, known as مَعَاهِدُ تَعْلِيمِ اللُّغَةِ العَرَبِيَّةِ (Arabic Language Institutes).',
  ],
};
