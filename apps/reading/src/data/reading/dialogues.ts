// src/data/reading/dialogues.ts

import { ReadingText } from './types';

/**
 * Dialogues & Debates reading texts
 * Topics: teacher-student exchanges, philosophical debates, scholarly disputes
 * 18 texts: 6 beginner, 6 intermediate, 6 advanced
 */
export const dialoguesTexts: ReadingText[] = [
  // ===== BEGINNER (b175-b180) =====
  {
    id: 'b175',
    title: 'The Student\'s Question',
    titleAr: 'سُؤالُ التِّلْميذِ',
    level: 'beginner',
    category: 'dialogues-debates',
    categoryAr: 'الحوارات والمناظرات',
    text: 'سَأَلَ التِّلْميذُ: يا مُعَلِّمي، ما أَفْضَلُ العِلْمِ؟ قالَ المُعَلِّمُ: عِلْمُ ما يَنْفَعُكَ. سَأَلَ: وَما أَسْوَأُ الجَهْلِ؟ قالَ: جَهْلُكَ بِنَفْسِكَ. سَأَلَ: وَكَيْفَ أَعْرِفُ نَفْسي؟ قالَ: اسْأَلْ مَنْ يُحِبُّكَ بِصِدْقٍ، لا مَنْ يَمْدَحُكَ بِكَذِبٍ. سَكَتَ التِّلْميذُ، ثُمَّ قالَ: أَظُنُّ أَنَّني سَأَتَعَلَّمُ الكَثيرَ مِنْكَ!',
    translation: 'The student asked: "Teacher, what is the best knowledge?" The teacher said: "Knowledge of what benefits you." He asked: "And what is the worst ignorance?" He said: "Ignorance of yourself." He asked: "And how do I know myself?" He said: "Ask one who loves you truthfully, not one who praises you falsely." The student was silent, then said: "I think I will learn much from you!"',
    grammaticalConcepts: ['اسم تفضيل', 'استفهام', 'أمر'],
    vocabularyHighlights: [
      { word: 'أَفْضَل', meaning: 'best' },
      { word: 'أَسْوَأ', meaning: 'worst' },
      { word: 'يَمْدَح', meaning: 'praises' },
      { word: 'بِصِدْق', meaning: 'truthfully' }
    ],
    moralLesson: 'Self-knowledge is the foundation of all wisdom.',
    moralLessonAr: 'معرفة النفس أساس كل حكمة.',
    wordCount: 52
  },
  {
    id: 'b176',
    title: 'The Debate About Wealth',
    titleAr: 'جِدالٌ حَوْلَ الغِنى',
    level: 'beginner',
    category: 'dialogues-debates',
    categoryAr: 'الحوارات والمناظرات',
    text: 'قالَ الغَنِيُّ: المالُ يَجْلِبُ السَّعادَةَ. قالَ الفَقيرُ: لَكِنَّكَ لَسْتَ سَعيدًا! قالَ الغَنِيُّ: لِأَنَّني أُريدُ المَزيدَ. قالَ الفَقيرُ: وَأَنا سَعيدٌ بِما عِنْدي. قالَ الغَنِيُّ: لِأَنَّكَ لا تَعْرِفُ ما يَنْقُصُكَ! قالَ الفَقيرُ: أَعْرِفُ، لَكِنَّني لا أَحْتاجُهُ. مَرَّ حَكيمٌ وَسَمِعَهُما. قالَ: كِلاكُما مُحِقٌّ. الغِنى الحَقيقِيُّ أَنْ تَمْلِكَ ما تَحْتاجُ، لا أَنْ تَحْتاجَ ما تَمْلِكُ.',
    translation: 'The rich man said: "Money brings happiness." The poor man said: "But you\'re not happy!" The rich man said: "Because I want more." The poor man said: "And I\'m happy with what I have." The rich man said: "Because you don\'t know what you\'re missing!" The poor man said: "I know, but I don\'t need it." A wise man passed and heard them. He said: "You\'re both right. True wealth is to own what you need, not to need what you own."',
    grammaticalConcepts: ['استدراك', 'تعليل', 'نفي'],
    vocabularyHighlights: [
      { word: 'يَجْلِب', meaning: 'brings' },
      { word: 'المَزيد', meaning: 'more' },
      { word: 'يَنْقُص', meaning: 'is missing, lacks' },
      { word: 'مُحِقّ', meaning: 'right, correct' }
    ],
    moralLesson: 'Contentment is greater wealth than possession.',
    moralLessonAr: 'القناعة غنى أعظم من الملكية.',
    wordCount: 58
  },
  {
    id: 'b177',
    title: 'Father and Son',
    titleAr: 'الأَبُ وَالابْنُ',
    level: 'beginner',
    category: 'dialogues-debates',
    categoryAr: 'الحوارات والمناظرات',
    text: 'قالَ الابْنُ: لِماذا أَذْهَبُ إِلى المَدْرَسَةِ؟ قالَ الأَبُ: لِتَتَعَلَّمَ. قالَ الابْنُ: لِماذا أَتَعَلَّمُ؟ قالَ الأَبُ: لِتَعْمَلَ. قالَ الابْنُ: لِماذا أَعْمَلُ؟ قالَ الأَبُ: لِتَكْسِبَ المالَ. قالَ الابْنُ: لِماذا أَكْسِبُ المالَ؟ قالَ الأَبُ: لِتَعيشَ سَعيدًا. قالَ الابْنُ: لَكِنَّني سَعيدٌ الآنَ! ضَحِكَ الأَبُ وَقالَ: أَحْسَنْتَ! لَقَدْ عَلَّمْتَني دَرْسًا!',
    translation: 'The son said: "Why do I go to school?" The father said: "To learn." The son said: "Why do I learn?" The father said: "To work." The son said: "Why do I work?" The father said: "To earn money." The son said: "Why do I earn money?" The father said: "To live happily." The son said: "But I\'m happy now!" The father laughed and said: "Well done! You\'ve taught me a lesson!"',
    grammaticalConcepts: ['تعليل', 'استفهام', 'أمر'],
    vocabularyHighlights: [
      { word: 'لِتَتَعَلَّمَ', meaning: 'to learn' },
      { word: 'تَكْسِب', meaning: 'earn' },
      { word: 'أَحْسَنْتَ', meaning: 'well done' },
      { word: 'دَرْس', meaning: 'lesson' }
    ],
    moralLesson: 'Children sometimes see what adults forget.',
    moralLessonAr: 'الأطفال أحيانًا يرون ما ينساه الكبار.',
    wordCount: 54
  },
  {
    id: 'b178',
    title: 'The Two Neighbors',
    titleAr: 'الجارانِ',
    level: 'beginner',
    category: 'dialogues-debates',
    categoryAr: 'الحوارات والمناظرات',
    text: 'تَخاصَمَ جارانِ. قالَ الأَوَّلُ: شَجَرَتُكَ تَسْقُطُ أَوْراقُها في حَديقَتي! قالَ الثّاني: وَدَجاجَتُكَ تَأْكُلُ حُبوبي! قالَ الأَوَّلُ: أَطْفالُكَ يُزْعِجونَني! قالَ الثّاني: وَكَلْبُكَ يَنْبَحُ طَوالَ اللَّيْلِ! سَكَتا. ثُمَّ ضَحِكَ الأَوَّلُ: نَحْنُ سَخيفانِ! ضَحِكَ الثّاني: صَحيحٌ! تَعالَ نَشْرَبِ الشّايَ وَنَنْسى كُلَّ هَذا! وَصارا صَديقَيْنِ.',
    translation: 'Two neighbors quarreled. The first said: "Your tree drops its leaves in my garden!" The second said: "And your chicken eats my grains!" The first said: "Your children annoy me!" The second said: "And your dog barks all night!" They fell silent. Then the first laughed: "We\'re being silly!" The second laughed: "True! Come, let\'s drink tea and forget all this!" And they became friends.',
    grammaticalConcepts: ['إضافة', 'عطف', 'أمر'],
    vocabularyHighlights: [
      { word: 'تَخاصَمَ', meaning: 'quarreled' },
      { word: 'تَسْقُط', meaning: 'drops, falls' },
      { word: 'يَنْبَح', meaning: 'barks' },
      { word: 'سَخيفان', meaning: 'silly (dual)' }
    ],
    moralLesson: 'Most conflicts can be resolved with laughter and tea.',
    moralLessonAr: 'معظم الخلافات يمكن حلها بالضحك والشاي.',
    wordCount: 52
  },
  {
    id: 'b179',
    title: 'What is Courage?',
    titleAr: 'ما الشَّجاعَةُ؟',
    level: 'beginner',
    category: 'dialogues-debates',
    categoryAr: 'الحوارات والمناظرات',
    text: 'سَأَلَ التِّلْميذُ: ما الشَّجاعَةُ؟ قالَ الأَوَّلُ: أَنْ تُقاتِلَ بِلا خَوْفٍ. قالَ الثّاني: أَنْ تَعْتَرِفَ بِخَطَئِكَ. قالَ الثّالِثُ: أَنْ تَقولَ الحَقَّ أَمامَ القَوِيِّ. قالَ الرّابِعُ: أَنْ تَبْكِيَ عِنْدَما تَحْتاجُ. قالَ المُعَلِّمُ: كُلُّكُمْ مُحِقّونَ. الشَّجاعَةُ لَها وُجوهٌ كَثيرَةٌ، وَأَصْعَبُها شَجاعَةُ أَنْ تَكونَ نَفْسَكَ.',
    translation: 'The student asked: "What is courage?" The first said: "To fight without fear." The second said: "To admit your mistake." The third said: "To speak truth before the powerful." The fourth said: "To cry when you need to." The teacher said: "You\'re all right. Courage has many faces, and the hardest is the courage to be yourself."',
    grammaticalConcepts: ['استفهام', 'مصدر مؤول', 'اسم تفضيل'],
    vocabularyHighlights: [
      { word: 'الشَّجاعَة', meaning: 'courage' },
      { word: 'تُقاتِل', meaning: 'fight' },
      { word: 'تَعْتَرِف', meaning: 'admit' },
      { word: 'وُجوه', meaning: 'faces, aspects' }
    ],
    moralLesson: 'True courage takes many forms beyond physical bravery.',
    moralLessonAr: 'الشجاعة الحقيقية لها أشكال كثيرة تتجاوز الشجاعة الجسدية.',
    wordCount: 48
  },
  {
    id: 'b180',
    title: 'The Blind and the Lame',
    titleAr: 'الأَعْمى وَالأَعْرَجُ',
    level: 'beginner',
    category: 'dialogues-debates',
    categoryAr: 'الحوارات والمناظرات',
    text: 'قالَ الأَعْمى: أَنا أَتْعَسُ النّاسِ! لا أَرى الشَّمْسَ وَلا الوُرودَ! قالَ الأَعْرَجُ: بَلْ أَنا! لا أَسْتَطيعُ المَشْيَ وَلا الرَّكْضَ! سَكَتا لَحْظَةً. قالَ الأَعْمى: لَكِنَّني أَسْتَطيعُ المَشْيَ. قالَ الأَعْرَجُ: وَأَنا أَسْتَطيعُ أَنْ أَرى. ضَحِكا. قالَ الأَعْمى: اصْعَدْ عَلى ظَهْري! قالَ الأَعْرَجُ: وَأَنا سَأَكونُ عَيْنَيْكَ! وَمَشَيا مَعًا.',
    translation: 'The blind man said: "I\'m the most miserable! I can\'t see the sun or roses!" The lame man said: "Rather I am! I can\'t walk or run!" They fell silent for a moment. The blind man said: "But I can walk." The lame man said: "And I can see." They laughed. The blind man said: "Climb on my back!" The lame man said: "And I\'ll be your eyes!" And they walked together.',
    grammaticalConcepts: ['اسم تفضيل', 'نفي', 'أمر'],
    vocabularyHighlights: [
      { word: 'الأَعْمى', meaning: 'blind man' },
      { word: 'الأَعْرَج', meaning: 'lame man' },
      { word: 'أَتْعَس', meaning: 'most miserable' },
      { word: 'ظَهْر', meaning: 'back' }
    ],
    moralLesson: 'Together we can overcome what alone we cannot.',
    moralLessonAr: 'معًا نستطيع التغلب على ما لا نستطيعه وحدنا.',
    wordCount: 56
  },

  // ===== INTERMEDIATE (i166-i171) =====
  {
    id: 'i166',
    title: 'The Debate of the Senses',
    titleAr: 'مُناظَرَةُ الحَواسِّ',
    level: 'intermediate',
    category: 'dialogues-debates',
    categoryAr: 'الحوارات والمناظرات',
    text: 'تَناظَرَتِ الحَواسُّ الخَمْسُ. قالَتِ العَيْنُ: أَنا أَهَمُّكُمْ! بِدوني لا تَرَوْنَ الطَّريقَ! قالَتِ الأُذُنُ: بَلْ أَنا! بِدوني لا تَسْمَعونَ الخَطَرَ! قالَ اللِّسانُ: أَنا سَيِّدُكُمْ! بِدوني لا تَتَكَلَّمونَ! قالَتِ اليَدُ: وَمَنْ يَعْمَلُ لَوْلايَ؟ قالَ الأَنْفُ: وَمَنْ يَشُمُّ الطَّعامَ لَوْلايَ؟ جاءَ القَلْبُ وَقالَ: اسْكُتوا جَميعًا! أَنْتُمْ خَدَمي. إِذا تَوَقَّفْتُ، ماتَتِ الجَميعُ. لَكِنَّ العَقْلَ أَجابَ: وَأَنا مَنْ يَأْمُرُكَ أَنْ تَنْبِضَ!',
    translation: 'The five senses debated. The eye said: "I\'m the most important! Without me you can\'t see the path!" The ear said: "Rather I am! Without me you can\'t hear danger!" The tongue said: "I\'m your master! Without me you can\'t speak!" The hand said: "Who works without me?" The nose said: "Who smells food without me?" The heart came and said: "All of you be silent! You\'re my servants. If I stop, everyone dies." But the mind answered: "And I\'m who commands you to beat!"',
    grammaticalConcepts: ['اسم تفضيل', 'شرط', 'أمر'],
    vocabularyHighlights: [
      { word: 'الحَواسّ', meaning: 'senses' },
      { word: 'تَناظَرَت', meaning: 'debated' },
      { word: 'يَنْبِض', meaning: 'beats' },
      { word: 'الخَطَر', meaning: 'danger' }
    ],
    moralLesson: 'Every part serves the whole; none stands alone.',
    moralLessonAr: 'كل جزء يخدم الكل؛ لا شيء يقوم وحده.',
    wordCount: 72
  },
  {
    id: 'i167',
    title: 'The Scholar and the Boatman',
    titleAr: 'العالِمُ وَالمَلّاحُ',
    level: 'intermediate',
    category: 'dialogues-debates',
    categoryAr: 'الحوارات والمناظرات',
    text: 'رَكِبَ عالِمٌ قارِبًا. سَأَلَ المَلّاحَ: هَلْ دَرَسْتَ النَّحْوَ؟ قالَ: لا. قالَ العالِمُ: ضاعَ رُبْعُ حَياتِكَ! سَأَلَ: هَلْ دَرَسْتَ الفَلْسَفَةَ؟ قالَ: لا. قالَ: ضاعَ نِصْفُ حَياتِكَ! فَجْأَةً هَبَّتْ عاصِفَةٌ. سَأَلَ المَلّاحُ: هَلْ تَعَلَّمْتَ السِّباحَةَ؟ قالَ العالِمُ مُرْتَعِبًا: لا! قالَ المَلّاحُ: إِذَنْ ضاعَتْ حَياتُكَ كُلُّها! وَقَفَزَ في الماءِ لِيُنْقِذَهُ.',
    translation: 'A scholar boarded a boat. He asked the boatman: "Did you study grammar?" He said: "No." The scholar said: "A quarter of your life is wasted!" He asked: "Did you study philosophy?" He said: "No." He said: "Half your life is wasted!" Suddenly a storm arose. The boatman asked: "Did you learn swimming?" The scholar said terrified: "No!" The boatman said: "Then your whole life is wasted!" And he jumped in the water to save him.',
    grammaticalConcepts: ['استفهام', 'عدد', 'جملة شرطية'],
    vocabularyHighlights: [
      { word: 'المَلّاح', meaning: 'boatman, sailor' },
      { word: 'النَّحْو', meaning: 'grammar' },
      { word: 'هَبَّت', meaning: 'arose, blew' },
      { word: 'مُرْتَعِب', meaning: 'terrified' }
    ],
    moralLesson: 'Practical knowledge can save you when theory fails.',
    moralLessonAr: 'المعرفة العملية يمكن أن تنقذك عندما تفشل النظرية.',
    wordCount: 62
  },
  {
    id: 'i168',
    title: 'The Debate About Death',
    titleAr: 'جِدالٌ حَوْلَ المَوْتِ',
    level: 'intermediate',
    category: 'dialogues-debates',
    categoryAr: 'الحوارات والمناظرات',
    text: 'قالَ المُتَشائِمُ: المَوْتُ نِهايَةٌ مُخيفَةٌ! قالَ المُتَفائِلُ: بَلْ هُوَ بِدايَةٌ جَديدَةٌ! قالَ المُتَشائِمُ: نَخْسَرُ كُلَّ شَيْءٍ! قالَ المُتَفائِلُ: نَتَحَرَّرُ مِنْ كُلِّ ثِقَلٍ! قالَ المُتَشائِمُ: نُفارِقُ مَنْ نُحِبُّ! قالَ المُتَفائِلُ: نَلْتَقي بِمَنْ فَقَدْنا! سَكَتا. قالَ حَكيمٌ: المَوْتُ مِرْآةٌ. المُتَشائِمُ يَرى فيهِ خَوْفَهُ، وَالمُتَفائِلُ يَرى فيهِ أَمَلَهُ. لَكِنَّ الحَقيقَةَ أَنَّ أَحَدًا لا يَعْرِفُ ما وَراءَهُ.',
    translation: 'The pessimist said: "Death is a frightening end!" The optimist said: "Rather it\'s a new beginning!" The pessimist said: "We lose everything!" The optimist said: "We\'re freed from every burden!" The pessimist said: "We part from those we love!" The optimist said: "We meet those we lost!" They fell silent. A wise man said: "Death is a mirror. The pessimist sees his fear in it, and the optimist sees his hope. But the truth is no one knows what\'s beyond it."',
    grammaticalConcepts: ['استدراك', 'نفي', 'اسم موصول'],
    vocabularyHighlights: [
      { word: 'المُتَشائِم', meaning: 'pessimist' },
      { word: 'المُتَفائِل', meaning: 'optimist' },
      { word: 'نَتَحَرَّر', meaning: 'we\'re freed' },
      { word: 'مِرْآة', meaning: 'mirror' }
    ],
    moralLesson: 'Our view of death reflects our view of life.',
    moralLessonAr: 'نظرتنا للموت تعكس نظرتنا للحياة.',
    wordCount: 66
  },
  {
    id: 'i169',
    title: 'The King and the Beggar',
    titleAr: 'المَلِكُ وَالمُتَسَوِّلُ',
    level: 'intermediate',
    category: 'dialogues-debates',
    categoryAr: 'الحوارات والمناظرات',
    text: 'مَرَّ مَلِكٌ بِمُتَسَوِّلٍ. قالَ المَلِكُ: يا مِسْكينُ! لَيْتَكَ تَعْرِفُ طَعْمَ القُصورِ! قالَ المُتَسَوِّلُ: وَلَيْتَكَ تَعْرِفُ طَعْمَ الحُرِّيَّةِ! قالَ المَلِكُ: أَنا حُرٌّ! أَفْعَلُ ما أَشاءُ! قالَ المُتَسَوِّلُ: هَلْ تَسْتَطيعُ أَنْ تَنامَ تَحْتَ النُّجومِ بِلا حُرّاسٍ؟ أَنْ تَأْكُلَ في السّوقِ مَعَ الفُقَراءِ؟ أَنْ تَضْحَكَ بِصَوْتٍ عالٍ بِلا بُروتوكولٍ؟ سَكَتَ المَلِكُ. قالَ المُتَسَوِّلُ: العَرْشُ سِجْنٌ مِنْ ذَهَبٍ، وَالشّارِعُ حُرِّيَّةٌ مِنْ تُرابٍ!',
    translation: 'A king passed by a beggar. The king said: "Poor man! If only you knew the taste of palaces!" The beggar said: "And if only you knew the taste of freedom!" The king said: "I\'m free! I do what I want!" The beggar said: "Can you sleep under the stars without guards? Eat in the market with the poor? Laugh loudly without protocol?" The king fell silent. The beggar said: "The throne is a prison of gold, and the street is freedom of dust!"',
    grammaticalConcepts: ['تمني', 'استفهام', 'إضافة'],
    vocabularyHighlights: [
      { word: 'مُتَسَوِّل', meaning: 'beggar' },
      { word: 'الحُرِّيَّة', meaning: 'freedom' },
      { word: 'بُروتوكول', meaning: 'protocol' },
      { word: 'العَرْش', meaning: 'throne' }
    ],
    moralLesson: 'Freedom has forms that wealth cannot buy.',
    moralLessonAr: 'للحرية أشكال لا يستطيع المال شراءها.',
    wordCount: 70
  },
  {
    id: 'i170',
    title: 'The Two Brothers',
    titleAr: 'الأَخَوانِ',
    level: 'intermediate',
    category: 'dialogues-debates',
    categoryAr: 'الحوارات والمناظرات',
    text: 'اخْتَلَفَ أَخَوانِ في الميراثِ. قالَ الأَوَّلُ: أَسْتَحِقُّ النِّصْفَ! أَنا الأَكْبَرُ! قالَ الثّاني: بَلْ أَنا! أَنا مَنْ خَدَمَ أَبانا! قالَ الأَوَّلُ: أَنْتَ تَكْذِبُ! قالَ الثّاني: بَلْ أَنْتَ الكَذّابُ! كادا يَتَضارَبانِ. فَجْأَةً دَخَلَتْ أُمُّهُما. قالَتْ: أَبوكُما لَمْ يَتْرُكْ لَكُما مالًا. تَرَكَ لَكُما أَخًا! وَهَذا أَغْلى مِنْ كُلِّ ذَهَبِ العالَمِ! بَكَيا وَتَعانَقا.',
    translation: 'Two brothers disagreed over inheritance. The first said: "I deserve half! I\'m the older!" The second said: "Rather I do! I\'m the one who served our father!" The first said: "You\'re lying!" The second said: "Rather you\'re the liar!" They nearly fought. Suddenly their mother entered. She said: "Your father didn\'t leave you money. He left you a brother! And that\'s worth more than all the gold in the world!" They cried and embraced.',
    grammaticalConcepts: ['نفي', 'اسم تفضيل', 'اسم موصول'],
    vocabularyHighlights: [
      { word: 'الميراث', meaning: 'inheritance' },
      { word: 'أَسْتَحِقّ', meaning: 'I deserve' },
      { word: 'يَتَضارَبان', meaning: 'fight each other' },
      { word: 'تَعانَقا', meaning: 'embraced' }
    ],
    moralLesson: 'Family bonds are worth more than any inheritance.',
    moralLessonAr: 'روابط العائلة أغلى من أي ميراث.',
    wordCount: 64
  },
  {
    id: 'i171',
    title: 'The Debate of Day and Night',
    titleAr: 'مُناظَرَةُ اللَّيْلِ وَالنَّهارِ',
    level: 'intermediate',
    category: 'dialogues-debates',
    categoryAr: 'الحوارات والمناظرات',
    text: 'تَخاصَمَ اللَّيْلُ وَالنَّهارُ. قالَ النَّهارُ: أَنا أَفْضَلُ! فِيَّ يَعْمَلُ النّاسُ وَيَبْنونَ الحَضاراتِ! قالَ اللَّيْلُ: بَلْ أَنا! فِيَّ يَرْتاحونَ وَيَحْلُمونَ الأَحْلامَ! قالَ النَّهارُ: أَنا نورٌ وَأَمَلٌ! قالَ اللَّيْلُ: وَأَنا سُكونٌ وَسَلامٌ! سَمِعَهُما الإِنْسانُ وَقالَ: كِلاكُما ضَروريٌّ. بِدونِ النَّهارِ لا أَعْمَلُ، وَبِدونِ اللَّيْلِ لا أَسْتَريحُ. أَنْتُما وَجْهانِ لِعُمْلَةٍ واحِدَةٍ اسْمُها الحَياةُ.',
    translation: 'Day and night quarreled. Day said: "I\'m better! In me people work and build civilizations!" Night said: "Rather I am! In me they rest and dream dreams!" Day said: "I\'m light and hope!" Night said: "And I\'m stillness and peace!" A human heard them and said: "You\'re both necessary. Without day I don\'t work, and without night I don\'t rest. You\'re two faces of one coin called life."',
    grammaticalConcepts: ['اسم تفضيل', 'ظرف', 'استدراك'],
    vocabularyHighlights: [
      { word: 'الحَضارات', meaning: 'civilizations' },
      { word: 'يَحْلُمون', meaning: 'dream' },
      { word: 'سُكون', meaning: 'stillness' },
      { word: 'عُمْلَة', meaning: 'coin' }
    ],
    moralLesson: 'Opposites often complement rather than contradict.',
    moralLessonAr: 'الأضداد غالبًا ما تكمل بعضها بدلًا من أن تتناقض.',
    wordCount: 66
  },

  // ===== ADVANCED (a161-a166) =====
  {
    id: 'a161',
    title: 'The Debate of Reason and Heart',
    titleAr: 'مُناظَرَةُ العَقْلِ وَالقَلْبِ',
    level: 'advanced',
    category: 'dialogues-debates',
    categoryAr: 'الحوارات والمناظرات',
    text: 'تَناظَرَ العَقْلُ وَالقَلْبُ. قالَ العَقْلُ: أَنا سَيِّدُ الإِنْسانِ! بِي يُفَكِّرُ وَيُحَلِّلُ وَيَتَّخِذُ القَراراتِ الحَكيمَةَ! قالَ القَلْبُ: لَكِنَّ القَراراتِ الحَكيمَةَ بارِدَةٌ! أَنا مَنْ يُعْطي الحَياةَ دِفْئَها وَمَعْناها! قالَ العَقْلُ: العَواطِفُ تُضِلُّ الإِنْسانَ! قالَ القَلْبُ: وَالحِسابُ البارِدُ يُجَمِّدُهُ! قالَ العَقْلُ: بِدوني يَضيعُ! قالَ القَلْبُ: وَبِدوني يَموتُ وَهُوَ حَيٌّ! سَكَتَتِ الرّوحُ ثُمَّ قالَتْ: كِلاكُما جَناحايَ. بِواحِدٍ لا أَطيرُ، وَبِالاثْنَيْنِ أَصِلُ إِلى السَّماءِ.',
    translation: 'Reason and heart debated. Reason said: "I\'m the human\'s master! Through me he thinks, analyzes, and makes wise decisions!" The heart said: "But wise decisions are cold! I\'m who gives life its warmth and meaning!" Reason said: "Emotions mislead humans!" The heart said: "And cold calculation freezes them!" Reason said: "Without me he\'s lost!" The heart said: "And without me he dies while living!" The soul fell silent then said: "You\'re both my wings. With one I cannot fly, and with both I reach the sky."',
    grammaticalConcepts: ['استدراك', 'جملة حالية', 'تشبيه'],
    vocabularyHighlights: [
      { word: 'يُحَلِّل', meaning: 'analyzes' },
      { word: 'دِفْء', meaning: 'warmth' },
      { word: 'تُضِلّ', meaning: 'misleads' },
      { word: 'يُجَمِّد', meaning: 'freezes' }
    ],
    moralLesson: 'Wisdom lies in balancing reason and emotion.',
    moralLessonAr: 'الحكمة تكمن في التوازن بين العقل والعاطفة.',
    wordCount: 82
  },
  {
    id: 'a162',
    title: 'The Philosopher and the Mystic',
    titleAr: 'الفَيْلَسوفُ وَالصّوفِيُّ',
    level: 'advanced',
    category: 'dialogues-debates',
    categoryAr: 'الحوارات والمناظرات',
    text: 'الْتَقى فَيْلَسوفٌ وَصوفِيٌّ. قالَ الفَيْلَسوفُ: أَبْحَثُ عَنِ الحَقيقَةِ بِالعَقْلِ. قالَ الصّوفِيُّ: وَأَنا أَجِدُها بِالقَلْبِ. قالَ الفَيْلَسوفُ: الحَقيقَةُ تُثْبَتُ بِالدَّليلِ. قالَ الصّوفِيُّ: الحَقيقَةُ تُذاقُ بِالتَّجْرِبَةِ. قالَ الفَيْلَسوفُ: أَنْتَ تَتَّبِعُ الوَهْمَ! قالَ الصّوفِيُّ: وَأَنْتَ تَطْرُقُ بابًا مُغْلَقًا بِمِفْتاحٍ خَطَأٍ! ضَحِكا. قالَ الفَيْلَسوفُ: رُبَّما نَبْحَثُ عَنْ نَفْسِ الشَّيْءِ بِطُرُقٍ مُخْتَلِفَةٍ. قالَ الصّوفِيُّ: أَوْ رُبَّما الحَقيقَةُ أَوْسَعُ مِنْ طُرُقِنا جَميعًا.',
    translation: 'A philosopher and a mystic met. The philosopher said: "I seek truth with reason." The mystic said: "And I find it with the heart." The philosopher said: "Truth is proven by evidence." The mystic said: "Truth is tasted through experience." The philosopher said: "You follow illusion!" The mystic said: "And you knock on a closed door with the wrong key!" They laughed. The philosopher said: "Perhaps we seek the same thing in different ways." The mystic said: "Or perhaps truth is wider than all our ways."',
    grammaticalConcepts: ['مصدر', 'مبني للمجهول', 'اسم تفضيل'],
    vocabularyHighlights: [
      { word: 'الصّوفِيّ', meaning: 'mystic, Sufi' },
      { word: 'الدَّليل', meaning: 'evidence, proof' },
      { word: 'تُذاق', meaning: 'is tasted' },
      { word: 'الوَهْم', meaning: 'illusion' }
    ],
    moralLesson: 'Different paths may lead to the same truth.',
    moralLessonAr: 'الطرق المختلفة قد تؤدي إلى نفس الحقيقة.',
    wordCount: 78
  },
  {
    id: 'a163',
    title: 'The Debate of Free Will',
    titleAr: 'مُناظَرَةُ الإِرادَةِ الحُرَّةِ',
    level: 'advanced',
    category: 'dialogues-debates',
    categoryAr: 'الحوارات والمناظرات',
    text: 'قالَ الجَبْرِيُّ: الإِنْسانُ مَجْبورٌ عَلى أَفْعالِهِ. كُلُّ شَيْءٍ مَكْتوبٌ وَمُقَدَّرٌ. قالَ القَدَرِيُّ: بَلِ الإِنْسانُ حُرٌّ تَمامًا. يَخْلُقُ أَفْعالَهُ بِنَفْسِهِ. قالَ الجَبْرِيُّ: فَلِماذا نُعاقَبُ عَلى ما لا نَخْتارُهُ؟ قالَ القَدَرِيُّ: وَلِماذا نُكافَأُ إِنْ كانَ كُلُّ شَيْءٍ مُقَرَّرًا؟ تَدَخَّلَ عالِمٌ: الحَقيقَةُ بَيْنَكُما. الإِنْسانُ مُخَيَّرٌ في أَفْعالِهِ، مُسَيَّرٌ في ظُروفِهِ. يَخْتارُ ما يَفْعَلُ، لَكِنَّهُ لا يَخْتارُ أَيْنَ وُلِدَ أَوْ مَتى يَموتُ. هَذا هُوَ سِرُّ الابْتِلاءِ.',
    translation: 'The determinist said: "Humans are compelled in their actions. Everything is written and predestined." The libertarian said: "Rather humans are completely free. They create their actions themselves." The determinist said: "Then why are we punished for what we don\'t choose?" The libertarian said: "And why are we rewarded if everything is predetermined?" A scholar intervened: "The truth is between you. Humans have choice in their actions, are driven in their circumstances. They choose what they do, but don\'t choose where they\'re born or when they die. This is the secret of divine testing."',
    grammaticalConcepts: ['مبني للمجهول', 'استفهام', 'استدراك'],
    vocabularyHighlights: [
      { word: 'الجَبْرِيّ', meaning: 'determinist' },
      { word: 'القَدَرِيّ', meaning: 'libertarian (in free will)' },
      { word: 'مُخَيَّر', meaning: 'having choice' },
      { word: 'مُسَيَّر', meaning: 'driven, compelled' }
    ],
    moralLesson: 'Free will and destiny coexist in the human experience.',
    moralLessonAr: 'الإرادة الحرة والقدر يتعايشان في التجربة الإنسانية.',
    wordCount: 84
  },
  {
    id: 'a164',
    title: 'The Theologians\' Debate',
    titleAr: 'مُناظَرَةُ المُتَكَلِّمينَ',
    level: 'advanced',
    category: 'dialogues-debates',
    categoryAr: 'الحوارات والمناظرات',
    text: 'تَناظَرَ مُتَكَلِّمانِ في صِفاتِ اللهِ. قالَ الأَوَّلُ: صِفاتُ اللهِ زائِدَةٌ عَلى ذاتِهِ. قالَ الثّاني: بَلْ هِيَ عَيْنُ ذاتِهِ. طالَتِ المُناظَرَةُ وَاشْتَدَّتْ. دَخَلَ عارِفٌ بَسيطٌ وَسَمِعَهُما. قالَ: أَنْتُما تَتَحَدَّثانِ عَمَّنْ لا تُدْرِكُهُ العُقولُ، وَتُريدانِ أَنْ تُحيطا بِهِ بِالكَلِماتِ! اللهُ أَعْظَمُ مِنْ كُلِّ وَصْفٍ، وَأَكْبَرُ مِنْ كُلِّ تَصَوُّرٍ. سُبْحانَ مَنْ لَيْسَ كَمِثْلِهِ شَيْءٌ! سَكَتا وَاعْتَرَفا بِأَنَّ العَجْزَ عَنِ الإِدْراكِ إِدْراكٌ.',
    translation: 'Two theologians debated about Allah\'s attributes. The first said: "Allah\'s attributes are additional to His essence." The second said: "Rather they are His very essence." The debate went long and intensified. A simple gnostic entered and heard them. He said: "You speak of One whom minds cannot comprehend, wanting to encompass Him with words! Allah is greater than any description, larger than any conception. Glory be to Him like unto whom there is nothing!" They fell silent and admitted that inability to comprehend is itself comprehension.',
    grammaticalConcepts: ['اسم تفضيل', 'نفي', 'استثناء'],
    vocabularyHighlights: [
      { word: 'المُتَكَلِّمون', meaning: 'theologians' },
      { word: 'صِفات', meaning: 'attributes' },
      { word: 'ذات', meaning: 'essence' },
      { word: 'العَجْز', meaning: 'inability' }
    ],
    moralLesson: 'Some truths transcend the limits of rational debate.',
    moralLessonAr: 'بعض الحقائق تتجاوز حدود الجدل العقلي.',
    wordCount: 80
  },
  {
    id: 'a165',
    title: 'Socrates and the Sophist',
    titleAr: 'سُقْراطُ وَالسّوفَسْطائِيُّ',
    level: 'advanced',
    category: 'dialogues-debates',
    categoryAr: 'الحوارات والمناظرات',
    text: 'قالَ السّوفَسْطائِيُّ: لا وُجودَ لِلْحَقيقَةِ! كُلُّ شَيْءٍ نِسْبِيٌّ! قالَ سُقْراطُ: هَلْ هَذِهِ العِبارَةُ حَقيقَةٌ؟ قالَ السّوفَسْطائِيُّ: نَعَمْ! ابْتَسَمَ سُقْراطُ: إِذَنْ هُناكَ حَقيقَةٌ واحِدَةٌ عَلى الأَقَلِّ: أَنَّهُ لا حَقيقَةَ! احْمَرَّ وَجْهُ السّوفَسْطائِيِّ: هَذِهِ مُغالَطَةٌ! قالَ سُقْراطُ: لا، هَذا مَنْطِقٌ. مَنْ يُنْكِرُ الحَقيقَةَ يَسْتَخْدِمُها لِيُثْبِتَ إِنْكارَهُ. أَنْتَ تُناقِضُ نَفْسَكَ بِنَفْسِكَ. اعْتَرِفْ أَنَّ هُناكَ حَقائِقَ، ثُمَّ ناقِشْ ما هِيَ.',
    translation: 'The sophist said: "There is no truth! Everything is relative!" Socrates said: "Is this statement true?" The sophist said: "Yes!" Socrates smiled: "Then there is at least one truth: that there is no truth!" The sophist\'s face reddened: "This is a fallacy!" Socrates said: "No, this is logic. Whoever denies truth uses it to prove his denial. You contradict yourself with yourself. Admit there are truths, then debate what they are."',
    grammaticalConcepts: ['نفي', 'استفهام', 'أمر'],
    vocabularyHighlights: [
      { word: 'السّوفَسْطائِيّ', meaning: 'sophist' },
      { word: 'نِسْبِيّ', meaning: 'relative' },
      { word: 'مُغالَطَة', meaning: 'fallacy' },
      { word: 'يُناقِض', meaning: 'contradicts' }
    ],
    moralLesson: 'Absolute relativism refutes itself.',
    moralLessonAr: 'النسبية المطلقة تدحض نفسها.',
    wordCount: 76
  },
  {
    id: 'a166',
    title: 'The Final Debate',
    titleAr: 'المُناظَرَةُ الأَخيرَةُ',
    level: 'advanced',
    category: 'dialogues-debates',
    categoryAr: 'الحوارات والمناظرات',
    text: 'عَلى فِراشِ المَوْتِ، سَأَلَ تِلْميذٌ شَيْخَهُ: ما أَهَمُّ ما تَعَلَّمْتَ في حَياتِكَ؟ قالَ الشَّيْخُ: تَعَلَّمْتُ أَنَّني لا أَعْرِفُ شَيْئًا. سَأَلَ التِّلْميذُ: وَهَلْ هَذا يَسْتَحِقُّ حَياةً؟ قالَ الشَّيْخُ: نَعَمْ! لِأَنَّ مَنْ عَرَفَ أَنَّهُ لا يَعْرِفُ، فَتَحَ بابَ المَعْرِفَةِ. وَمَنْ ظَنَّ أَنَّهُ يَعْرِفُ، أَغْلَقَهُ. سَأَلَ: وَماذا بَعْدَ المَوْتِ؟ ابْتَسَمَ الشَّيْخُ: أَجْهَلُ ذَلِكَ أَيْضًا، لَكِنَّني لَسْتُ خائِفًا. الجاهِلُ المُتَواضِعُ يَدْخُلُ الآخِرَةَ طالِبًا لِلْعِلْمِ، وَالعالِمُ المُتَكَبِّرُ يَدْخُلُها مُنْكَسِرًا.',
    translation: 'On his deathbed, a student asked his teacher: "What\'s the most important thing you learned in your life?" The teacher said: "I learned that I know nothing." The student asked: "Is this worth a lifetime?" The teacher said: "Yes! Because whoever knows he doesn\'t know has opened the door of knowledge. And whoever thinks he knows has closed it." He asked: "And what\'s after death?" The teacher smiled: "I\'m ignorant of that too, but I\'m not afraid. The humble ignorant enters the afterlife as a seeker of knowledge, and the arrogant scholar enters it broken."',
    grammaticalConcepts: ['جملة شرطية', 'اسم تفضيل', 'مقابلة'],
    vocabularyHighlights: [
      { word: 'فِراش المَوْت', meaning: 'deathbed' },
      { word: 'المُتَواضِع', meaning: 'humble' },
      { word: 'المُتَكَبِّر', meaning: 'arrogant' },
      { word: 'مُنْكَسِر', meaning: 'broken' }
    ],
    moralLesson: 'Admitting ignorance is the beginning of true wisdom.',
    moralLessonAr: 'الاعتراف بالجهل هو بداية الحكمة الحقيقية.',
    wordCount: 88
  }
];
