// src/data/reading/fables.ts
// Fables & Parables - Animal stories and moral tales in the tradition of Kalila wa Dimna

import { ReadingText } from './types';

export const fableTexts: ReadingText[] = [
  // ===== BEGINNER (b139-b144) =====
  {
    id: 'b139',
    title: 'The Crow and the Pitcher',
    titleAr: 'الغُرَابُ وَالجَرَّةُ',
    level: 'beginner',
    category: 'fables-parables',
    categoryAr: 'الحكايات والأمثال',
    text: `كَانَ غُرَابٌ عَطْشَانُ جِدًّا. وَجَدَ جَرَّةً فِيهَا مَاءٌ قَلِيلٌ. حَاوَلَ أَنْ يَشْرَبَ لَكِنَّ رَأْسَهُ لَمْ يَصِلْ إِلَى المَاءِ. فَكَّرَ الغُرَابُ طَوِيلًا. ثُمَّ بَدَأَ يَرْمِي الحَصَى فِي الجَرَّةِ. حَصَاةً بَعْدَ حَصَاةٍ. صَعِدَ المَاءُ شَيْئًا فَشَيْئًا. أَخِيرًا شَرِبَ الغُرَابُ وَارْتَوَى.`,
    translation: `A crow was very thirsty. He found a pitcher with little water in it. He tried to drink but his head could not reach the water. The crow thought for a long time. Then he began to throw pebbles into the pitcher. Pebble after pebble. The water rose little by little. Finally the crow drank and quenched his thirst.`,
    grammaticalConcepts: ['past tense كَانَ', 'negation with لَمْ', 'sequential actions'],
    vocabularyHighlights: [
      { word: 'غُرَابٌ', meaning: 'crow' },
      { word: 'جَرَّةً', meaning: 'pitcher, jar' },
      { word: 'الحَصَى', meaning: 'pebbles' },
      { word: 'ارْتَوَى', meaning: 'quenched his thirst' }
    ],
    moralLesson: 'Patience and cleverness solve problems that strength cannot.',
    moralLessonAr: 'الصَّبْرُ وَالذَّكَاءُ يَحُلَّانِ مَشَاكِلَ لَا تَحُلُّهَا القُوَّةُ.',
    wordCount: 38
  },
  {
    id: 'b140',
    title: 'The Lion and the Mouse',
    titleAr: 'الأَسَدُ وَالفَأْرُ',
    level: 'beginner',
    category: 'fables-parables',
    categoryAr: 'الحكايات والأمثال',
    text: `نَامَ أَسَدٌ كَبِيرٌ تَحْتَ شَجَرَةٍ. جَاءَ فَأْرٌ صَغِيرٌ وَمَشَى عَلَى جِسْمِهِ. اسْتَيْقَظَ الأَسَدُ غَاضِبًا. قَالَ الفَأْرُ: "أَرْجُوكَ لَا تَقْتُلْنِي. سَأُسَاعِدُكَ يَوْمًا مَا." ضَحِكَ الأَسَدُ وَأَطْلَقَهُ. بَعْدَ أَيَّامٍ، وَقَعَ الأَسَدُ فِي شَبَكَةِ صَيَّادٍ. جَاءَ الفَأْرُ وَقَطَعَ الشَّبَكَةَ بِأَسْنَانِهِ. الصَّغِيرُ أَنْقَذَ الكَبِيرَ.`,
    translation: `A big lion slept under a tree. A small mouse came and walked on his body. The lion woke up angry. The mouse said: "Please don't kill me. I will help you someday." The lion laughed and released him. After some days, the lion fell into a hunter's net. The mouse came and cut the net with his teeth. The small one saved the big one.`,
    grammaticalConcepts: ['imperative negation لَا تَقْتُلْ', 'future with سَـ', 'past tense sequence'],
    vocabularyHighlights: [
      { word: 'فَأْرٌ', meaning: 'mouse' },
      { word: 'أَطْلَقَهُ', meaning: 'released him' },
      { word: 'شَبَكَةِ', meaning: 'net' },
      { word: 'أَنْقَذَ', meaning: 'saved' }
    ],
    moralLesson: 'Never underestimate the small; everyone has value.',
    moralLessonAr: 'لَا تَسْتَصْغِرِ الصَّغِيرَ؛ لِكُلِّ وَاحِدٍ قِيمَةٌ.',
    wordCount: 47
  },
  {
    id: 'b141',
    title: 'The Tortoise and the Hare',
    titleAr: 'السُّلَحْفَاةُ وَالأَرْنَبُ',
    level: 'beginner',
    category: 'fables-parables',
    categoryAr: 'الحكايات والأمثال',
    text: `تَحَدَّى أَرْنَبٌ سَرِيعٌ سُلَحْفَاةً بَطِيئَةً. قَالَ: "أَنَا أَسْرَعُ مِنْكِ!" قَبِلَتِ السُّلَحْفَاةُ التَّحَدِّي. بَدَأَ السِّبَاقُ. رَكَضَ الأَرْنَبُ بِسُرْعَةٍ ثُمَّ نَامَ تَحْتَ شَجَرَةٍ. قَالَ: "السُّلَحْفَاةُ بَعِيدَةٌ جِدًّا." مَشَتِ السُّلَحْفَاةُ بِبُطْءٍ لَكِنَّهَا لَمْ تَتَوَقَّفْ. وَصَلَتْ قَبْلَ أَنْ يَسْتَيْقِظَ الأَرْنَبُ. البُطْءُ الثَّابِتُ أَفْضَلُ مِنَ السُّرْعَةِ المُتَقَطِّعَةِ.`,
    translation: `A fast hare challenged a slow tortoise. He said: "I am faster than you!" The tortoise accepted the challenge. The race began. The hare ran quickly then slept under a tree. He said: "The tortoise is very far behind." The tortoise walked slowly but did not stop. She arrived before the hare woke up. Steady slowness is better than intermittent speed.`,
    grammaticalConcepts: ['comparative أَسْرَع/أَفْضَل', 'negation with لَمْ', 'temporal قَبْلَ أَنْ'],
    vocabularyHighlights: [
      { word: 'تَحَدَّى', meaning: 'challenged' },
      { word: 'السِّبَاقُ', meaning: 'race' },
      { word: 'بِبُطْءٍ', meaning: 'slowly' },
      { word: 'الثَّابِتُ', meaning: 'steady, constant' }
    ],
    moralLesson: 'Consistency beats talent that gives up.',
    moralLessonAr: 'الثَّبَاتُ يَتَفَوَّقُ عَلَى المَوْهِبَةِ الَّتِي تَسْتَسْلِمُ.',
    wordCount: 46
  },
  {
    id: 'b142',
    title: 'The Fox and the Grapes',
    titleAr: 'الثَّعْلَبُ وَالعِنَبُ',
    level: 'beginner',
    category: 'fables-parables',
    categoryAr: 'الحكايات والأمثال',
    text: `رَأَى ثَعْلَبٌ جَائِعٌ عِنَبًا جَمِيلًا. كَانَ العِنَبُ عَالِيًا عَلَى شَجَرَةٍ. قَفَزَ الثَّعْلَبُ مَرَّةً. لَمْ يَصِلْ. قَفَزَ مَرَّتَيْنِ وَثَلَاثًا. لَمْ يَصِلْ. أَخِيرًا، مَشَى الثَّعْلَبُ بَعِيدًا. قَالَ: "هَذَا العِنَبُ حَامِضٌ عَلَى كُلِّ حَالٍ. لَا أُرِيدُهُ." هَكَذَا نَفْعَلُ حِينَ لَا نَسْتَطِيعُ الحُصُولَ عَلَى شَيْءٍ.`,
    translation: `A hungry fox saw beautiful grapes. The grapes were high on a tree. The fox jumped once. He did not reach. He jumped twice and three times. He did not reach. Finally, the fox walked away. He said: "These grapes are sour anyway. I don't want them." This is what we do when we cannot obtain something.`,
    grammaticalConcepts: ['past tense sequence', 'negation with لَمْ', 'numbers with verbs'],
    vocabularyHighlights: [
      { word: 'ثَعْلَبٌ', meaning: 'fox' },
      { word: 'عِنَبًا', meaning: 'grapes' },
      { word: 'قَفَزَ', meaning: 'jumped' },
      { word: 'حَامِضٌ', meaning: 'sour' }
    ],
    moralLesson: 'We often devalue what we cannot have.',
    moralLessonAr: 'كَثِيرًا مَا نُقَلِّلُ مِنْ قِيمَةِ مَا لَا نَسْتَطِيعُ الحُصُولَ عَلَيْهِ.',
    wordCount: 44
  },
  {
    id: 'b143',
    title: 'The Ant and the Grasshopper',
    titleAr: 'النَّمْلَةُ وَالجُنْدُبُ',
    level: 'beginner',
    category: 'fables-parables',
    categoryAr: 'الحكايات والأمثال',
    text: `فِي الصَّيْفِ، عَمِلَتِ النَّمْلَةُ كُلَّ يَوْمٍ. جَمَعَتِ الطَّعَامَ لِلشِّتَاءِ. الجُنْدُبُ كَانَ يَلْعَبُ وَيُغَنِّي. قَالَ لِلنَّمْلَةِ: "لِمَاذَا تَعْمَلِينَ؟ تَعَالَيْ وَالْعَبِي!" قَالَتِ النَّمْلَةُ: "الشِّتَاءُ قَادِمٌ." جَاءَ الشِّتَاءُ البَارِدُ. النَّمْلَةُ فِي بَيْتِهَا الدَّافِئِ مَعَ طَعَامِهَا. الجُنْدُبُ بَارِدٌ وَجَائِعٌ يَطْلُبُ المُسَاعَدَةَ.`,
    translation: `In summer, the ant worked every day. She gathered food for winter. The grasshopper was playing and singing. He said to the ant: "Why do you work? Come and play!" The ant said: "Winter is coming." The cold winter came. The ant was in her warm home with her food. The grasshopper was cold and hungry, asking for help.`,
    grammaticalConcepts: ['past continuous كَانَ يَلْعَبُ', 'imperative تَعَالَيْ', 'active participle قَادِمٌ'],
    vocabularyHighlights: [
      { word: 'النَّمْلَةُ', meaning: 'ant' },
      { word: 'الجُنْدُبُ', meaning: 'grasshopper' },
      { word: 'جَمَعَتِ', meaning: 'gathered' },
      { word: 'الدَّافِئِ', meaning: 'warm' }
    ],
    moralLesson: 'Prepare today for tomorrow\'s needs.',
    moralLessonAr: 'اسْتَعِدَّ اليَوْمَ لِحَاجَاتِ الغَدِ.',
    wordCount: 45
  },
  {
    id: 'b144',
    title: 'The Dog and the Bone',
    titleAr: 'الكَلْبُ وَالعَظْمُ',
    level: 'beginner',
    category: 'fables-parables',
    categoryAr: 'الحكايات والأمثال',
    text: `حَمَلَ كَلْبٌ عَظْمًا كَبِيرًا فِي فَمِهِ. مَشَى فَوْقَ جِسْرٍ صَغِيرٍ. نَظَرَ إِلَى المَاءِ فَرَأَى كَلْبًا آخَرَ. كَانَ ذَلِكَ انْعِكَاسَهُ. رَأَى عَظْمًا فِي فَمِ الكَلْبِ الآخَرِ. طَمِعَ فِي العَظْمِ الثَّانِي. فَتَحَ فَمَهُ لِيَأْخُذَهُ. سَقَطَ عَظْمُهُ فِي المَاءِ. خَسِرَ مَا عِنْدَهُ بِسَبَبِ طَمَعِهِ.`,
    translation: `A dog carried a big bone in his mouth. He walked over a small bridge. He looked at the water and saw another dog. That was his reflection. He saw a bone in the other dog's mouth. He coveted the second bone. He opened his mouth to take it. His bone fell in the water. He lost what he had because of his greed.`,
    grammaticalConcepts: ['past tense sequence', 'demonstrative ذَلِكَ', 'reason with بِسَبَبِ'],
    vocabularyHighlights: [
      { word: 'عَظْمًا', meaning: 'bone' },
      { word: 'جِسْرٍ', meaning: 'bridge' },
      { word: 'انْعِكَاسَهُ', meaning: 'his reflection' },
      { word: 'طَمِعَ', meaning: 'coveted, was greedy' }
    ],
    moralLesson: 'Greed for more can make you lose what you have.',
    moralLessonAr: 'الطَّمَعُ فِي المَزِيدِ قَدْ يُفْقِدُكَ مَا عِنْدَكَ.',
    wordCount: 46
  },

  // ===== INTERMEDIATE (i130-i135) =====
  {
    id: 'i130',
    title: 'The Two Jackals: Kalila and Dimna',
    titleAr: 'ابْنَا آوَى: كَلِيلَةُ وَدِمْنَةُ',
    level: 'intermediate',
    category: 'fables-parables',
    categoryAr: 'الحكايات والأمثال',
    text: `كَانَ هُنَاكَ ابْنَا آوَى يُدْعَيَانِ كَلِيلَةَ وَدِمْنَةَ. كَلِيلَةُ كَانَ حَكِيمًا قَنُوعًا، وَدِمْنَةُ كَانَ طَمُوحًا مُتَسَرِّعًا. قَالَ دِمْنَةُ: "أُرِيدُ أَنْ أَصِلَ إِلَى الأَسَدِ المَلِكِ." حَذَّرَهُ كَلِيلَةُ: "القُرْبُ مِنَ المُلُوكِ خَطِرٌ." لَمْ يَسْمَعْ دِمْنَةُ. تَقَرَّبَ مِنَ الأَسَدِ بِالكَذِبِ وَالمَكْرِ. فِي النِّهَايَةِ، انْكَشَفَ كَذِبُهُ وَهَلَكَ. أَمَّا كَلِيلَةُ فَعَاشَ آمِنًا لِأَنَّهُ رَضِيَ بِمَا عِنْدَهُ.`,
    translation: `There were two jackals called Kalila and Dimna. Kalila was wise and content, while Dimna was ambitious and hasty. Dimna said: "I want to reach the Lion King." Kalila warned him: "Proximity to kings is dangerous." Dimna did not listen. He drew near the lion through lies and cunning. In the end, his lies were exposed and he perished. As for Kalila, he lived safely because he was content with what he had.`,
    grammaticalConcepts: ['dual form ابْنَا', 'passive يُدْعَيَانِ', 'contrast with أَمَّا...فَـ'],
    vocabularyHighlights: [
      { word: 'ابْنَا آوَى', meaning: 'two jackals' },
      { word: 'قَنُوعًا', meaning: 'content' },
      { word: 'المَكْرِ', meaning: 'cunning' },
      { word: 'انْكَشَفَ', meaning: 'was exposed' },
      { word: 'هَلَكَ', meaning: 'perished' }
    ],
    moralLesson: 'Ambition without integrity leads to ruin.',
    moralLessonAr: 'الطُّمُوحُ بِدُونِ نَزَاهَةٍ يَقُودُ إِلَى الهَلَاكِ.',
    wordCount: 58
  },
  {
    id: 'i131',
    title: 'The Owl and the Crows',
    titleAr: 'البُومَةُ وَالغِرْبَانُ',
    level: 'intermediate',
    category: 'fables-parables',
    categoryAr: 'الحكايات والأمثال',
    text: `اجْتَمَعَتِ الطُّيُورُ لِتَخْتَارَ مَلِكًا. قَالَ بَعْضُهُمْ: "لِنَخْتَرِ البُومَةَ لِأَنَّهَا تَرَى فِي اللَّيْلِ." قَامَ غُرَابٌ حَكِيمٌ وَقَالَ: "البُومَةُ عَابِسَةٌ فِي النَّهَارِ، غَاضِبَةٌ فِي اللَّيْلِ. كَيْفَ تَكُونُ مَلِكًا وَهِيَ لَا تُحِبُّ أَحَدًا؟" رَفَضَتِ الطُّيُورُ البُومَةَ. مُنْذُ ذَلِكَ اليَوْمِ، صَارَتِ البُومَةُ عَدُوَّةً لِلْغِرْبَانِ. هَكَذَا يُوَلِّدُ الصِّدْقُ أَعْدَاءً أَحْيَانًا، لَكِنَّهُ يَحْمِي الجَمَاعَةَ مِنَ الخَطَأِ.`,
    translation: `The birds gathered to choose a king. Some said: "Let us choose the owl because she sees at night." A wise crow stood up and said: "The owl is sullen by day, angry by night. How can she be king when she loves no one?" The birds rejected the owl. From that day, the owl became an enemy of crows. Thus honesty sometimes creates enemies, but it protects the community from error.`,
    grammaticalConcepts: ['jussive لِنَخْتَرْ', 'reason with لِأَنَّ', 'rhetorical question كَيْفَ'],
    vocabularyHighlights: [
      { word: 'البُومَةُ', meaning: 'owl' },
      { word: 'عَابِسَةٌ', meaning: 'sullen, frowning' },
      { word: 'يُوَلِّدُ', meaning: 'creates, generates' },
      { word: 'الجَمَاعَةَ', meaning: 'community, group' }
    ],
    moralLesson: 'Speaking truth may cost friends but saves communities.',
    moralLessonAr: 'قَوْلُ الحَقِّ قَدْ يُكَلِّفُ أَصْدِقَاءَ لَكِنَّهُ يُنْقِذُ المُجْتَمَعَاتِ.',
    wordCount: 61
  },
  {
    id: 'i132',
    title: 'The Monkey and the Carpenter',
    titleAr: 'القِرْدُ وَالنَّجَّارُ',
    level: 'intermediate',
    category: 'fables-parables',
    categoryAr: 'الحكايات والأمثال',
    text: `كَانَ نَجَّارٌ يَشُقُّ جِذْعًا كَبِيرًا. وَضَعَ إِسْفِينًا خَشَبِيًّا فِي الشَّقِّ لِيُبْقِيَهُ مَفْتُوحًا. ذَهَبَ لِيَأْكُلَ غَدَاءَهُ. جَاءَ قِرْدٌ فُضُولِيٌّ. جَلَسَ عَلَى الجِذْعِ وَذَيْلُهُ فِي الشَّقِّ. بَدَأَ يَلْعَبُ بِالإِسْفِينِ. سَحَبَ الإِسْفِينَ فَانْغَلَقَ الشَّقُّ عَلَى ذَيْلِهِ. صَرَخَ القِرْدُ مِنَ الأَلَمِ. عَادَ النَّجَّارُ وَحَرَّرَهُ. قَالَ: "لِمَاذَا تُدْخِلُ نَفْسَكَ فِيمَا لَا يَعْنِيكَ؟"`,
    translation: `A carpenter was splitting a large log. He placed a wooden wedge in the split to keep it open. He went to eat his lunch. A curious monkey came. He sat on the log with his tail in the split. He began playing with the wedge. He pulled out the wedge and the split closed on his tail. The monkey screamed in pain. The carpenter returned and freed him. He said: "Why do you involve yourself in what does not concern you?"`,
    grammaticalConcepts: ['purpose with لِـ', 'circumstantial clause وَذَيْلُهُ', 'indirect question'],
    vocabularyHighlights: [
      { word: 'نَجَّارٌ', meaning: 'carpenter' },
      { word: 'جِذْعًا', meaning: 'log, trunk' },
      { word: 'إِسْفِينًا', meaning: 'wedge' },
      { word: 'فُضُولِيٌّ', meaning: 'curious, nosy' },
      { word: 'حَرَّرَهُ', meaning: 'freed him' }
    ],
    moralLesson: 'Meddling in others\' affairs brings harm to yourself.',
    moralLessonAr: 'التَّدَخُّلُ فِي شُؤُونِ الآخَرِينَ يَجْلِبُ الضَّرَرَ لِنَفْسِكَ.',
    wordCount: 62
  },
  {
    id: 'i133',
    title: 'The Merchant and the Iron',
    titleAr: 'التَّاجِرُ وَالحَدِيدُ',
    level: 'intermediate',
    category: 'fables-parables',
    categoryAr: 'الحكايات والأمثال',
    text: `تَرَكَ تَاجِرٌ حَدِيدًا كَثِيرًا عِنْدَ صَدِيقِهِ وَسَافَرَ. لَمَّا عَادَ، طَلَبَ حَدِيدَهُ. قَالَ الصَّدِيقُ: "أَكَلَتْهُ الفِئْرَانُ." قَالَ التَّاجِرُ: "عَجَبًا! فِئْرَانٌ تَأْكُلُ الحَدِيدَ!" سَكَتَ وَذَهَبَ. فِي اليَوْمِ التَّالِي، أَخَذَ التَّاجِرُ ابْنَ صَدِيقِهِ وَخَبَّأَهُ. سَأَلَ الصَّدِيقُ: "أَيْنَ ابْنِي؟" قَالَ التَّاجِرُ: "خَطَفَتْهُ بُومَةٌ." صَرَخَ الصَّدِيقُ: "مُسْتَحِيلٌ! بُومَةٌ تَخْطِفُ طِفْلًا؟!" قَالَ التَّاجِرُ: "فِي بَلَدٍ تَأْكُلُ فِيهِ الفِئْرَانُ الحَدِيدَ، يُمْكِنُ لِلْبُومَةِ أَنْ تَخْطِفَ طِفْلًا."`,
    translation: `A merchant left much iron with his friend and traveled. When he returned, he asked for his iron. The friend said: "The mice ate it." The merchant said: "Strange! Mice that eat iron!" He was silent and left. The next day, the merchant took his friend's son and hid him. The friend asked: "Where is my son?" The merchant said: "An owl snatched him." The friend screamed: "Impossible! An owl snatching a child?!" The merchant said: "In a land where mice eat iron, an owl can snatch a child."`,
    grammaticalConcepts: ['temporal لَمَّا', 'exclamation عَجَبًا', 'relative clause فِي بَلَدٍ...'],
    vocabularyHighlights: [
      { word: 'الحَدِيدَ', meaning: 'iron' },
      { word: 'الفِئْرَانُ', meaning: 'mice' },
      { word: 'خَبَّأَهُ', meaning: 'hid him' },
      { word: 'خَطَفَتْهُ', meaning: 'snatched him' }
    ],
    moralLesson: 'Liars will face their own logic turned against them.',
    moralLessonAr: 'الكَذَّابُونَ سَيُوَاجِهُونَ مَنْطِقَهُمْ مُنْقَلِبًا عَلَيْهِمْ.',
    wordCount: 74
  },
  {
    id: 'i134',
    title: 'The Dove and the Hunter',
    titleAr: 'الحَمَامَةُ وَالصَّيَّادُ',
    level: 'intermediate',
    category: 'fables-parables',
    categoryAr: 'الحكايات والأمثال',
    text: `نَصَبَ صَيَّادٌ شَبَكَةً وَنَثَرَ عَلَيْهَا حَبًّا. جَاءَتْ حَمَامَاتٌ كَثِيرَةٌ وَوَقَعْنَ فِي الشَّبَكَةِ. قَالَتِ المَلِكَةُ: "إِنْ طَارَتْ كُلُّ وَاحِدَةٍ وَحْدَهَا، لَنْ تَسْتَطِيعَ. لَكِنْ إِنْ طِرْنَا مَعًا..." طَارَتِ الحَمَامَاتُ مَعًا وَحَمَلْنَ الشَّبَكَةَ مَعَهُنَّ. ذَهَبْنَ إِلَى صَدِيقَتِهِنَّ الفَأْرَةِ. قَطَعَتِ الفَأْرَةُ الشَّبَكَةَ وَحَرَّرَتْهُنَّ. التَّعَاوُنُ بَيْنَ الأَصْدِقَاءِ يَهْزِمُ أَقْوَى الأَعْدَاءِ.`,
    translation: `A hunter set a net and scattered grain on it. Many doves came and fell into the net. The queen said: "If each one flies alone, she cannot escape. But if we fly together..." The doves flew together and carried the net with them. They went to their friend the mouse. The mouse cut the net and freed them. Cooperation between friends defeats the strongest enemies.`,
    grammaticalConcepts: ['conditional إِنْ', 'feminine plural verb forms', 'collective action'],
    vocabularyHighlights: [
      { word: 'نَصَبَ', meaning: 'set up' },
      { word: 'نَثَرَ', meaning: 'scattered' },
      { word: 'حَبًّا', meaning: 'grain, seeds' },
      { word: 'التَّعَاوُنُ', meaning: 'cooperation' },
      { word: 'يَهْزِمُ', meaning: 'defeats' }
    ],
    moralLesson: 'Unity achieves what individuals cannot.',
    moralLessonAr: 'الاتِّحَادُ يُحَقِّقُ مَا لَا يَسْتَطِيعُهُ الأَفْرَادُ.',
    wordCount: 56
  },
  {
    id: 'i135',
    title: 'The Scorpion and the Frog',
    titleAr: 'العَقْرَبُ وَالضِّفْدَعُ',
    level: 'intermediate',
    category: 'fables-parables',
    categoryAr: 'الحكايات والأمثال',
    text: `أَرَادَ عَقْرَبٌ أَنْ يَعْبُرَ النَّهْرَ. طَلَبَ مِنْ ضِفْدَعٍ أَنْ يَحْمِلَهُ. قَالَ الضِّفْدَعُ: "سَتَلْدَغُنِي!" قَالَ العَقْرَبُ: "لَوْ لَدَغْتُكَ لَغَرِقْنَا مَعًا. لَنْ أَفْعَلَ." صَدَّقَهُ الضِّفْدَعُ وَحَمَلَهُ. فِي مُنْتَصَفِ النَّهْرِ، لَدَغَ العَقْرَبُ الضِّفْدَعَ. بَدَأَ الضِّفْدَعُ يَغْرَقُ. سَأَلَ: "لِمَاذَا؟ سَنَمُوتُ كِلَانَا!" قَالَ العَقْرَبُ وَهُوَ يَغْرَقُ: "إِنَّهَا طَبِيعَتِي. لَا أَسْتَطِيعُ تَغْيِيرَهَا."`,
    translation: `A scorpion wanted to cross the river. He asked a frog to carry him. The frog said: "You will sting me!" The scorpion said: "If I stung you, we would both drown. I will not do it." The frog believed him and carried him. In the middle of the river, the scorpion stung the frog. The frog began to drown. He asked: "Why? We will both die!" The scorpion said as he drowned: "It is my nature. I cannot change it."`,
    grammaticalConcepts: ['conditional لَوْ', 'future negation لَنْ', 'circumstantial وَهُوَ يَغْرَقُ'],
    vocabularyHighlights: [
      { word: 'عَقْرَبٌ', meaning: 'scorpion' },
      { word: 'ضِفْدَعٍ', meaning: 'frog' },
      { word: 'يَعْبُرَ', meaning: 'to cross' },
      { word: 'لَدَغَ', meaning: 'stung' },
      { word: 'طَبِيعَتِي', meaning: 'my nature' }
    ],
    moralLesson: 'Some cannot change their nature, even for self-preservation.',
    moralLessonAr: 'بَعْضُهُمْ لَا يَسْتَطِيعُ تَغْيِيرَ طَبِيعَتِهِ حَتَّى لِلنَّجَاةِ.',
    wordCount: 59
  },

  // ===== ADVANCED (a125-a130) =====
  {
    id: 'a125',
    title: 'The King and the Wise Fool',
    titleAr: 'المَلِكُ وَالمَجْنُونُ الحَكِيمُ',
    level: 'advanced',
    category: 'fables-parables',
    categoryAr: 'الحكايات والأمثال',
    text: `كَانَ فِي المَدِينَةِ مَجْنُونٌ يَقُولُ الحَقِيقَةَ. سَمِعَ بِهِ المَلِكُ فَأَحْضَرَهُ. سَأَلَهُ: "مَا رَأْيُكَ فِي حُكْمِي؟" قَالَ المَجْنُونُ: "أَنْتَ تَجْلِسُ عَلَى كُرْسِيٍّ مِنْ ظُلْمٍ، وَتَلْبَسُ ثَوْبًا مِنْ كَذِبٍ، وَتَأْكُلُ مِنْ أَمْوَالِ الفُقَرَاءِ." غَضِبَ الوَزِيرُ وَقَالَ: "اقْتُلْهُ يَا مَوْلَايَ!" لَكِنَّ المَلِكَ سَكَتَ طَوِيلًا. ثُمَّ قَالَ: "أَطْلِقُوهُ. الحَقِيقَةُ لَا تُعَاقَبُ. بَلْ يُعَاقَبُ مَنْ يَخَافُ مِنْهَا." مُنْذُ ذَلِكَ اليَوْمِ، غَيَّرَ المَلِكُ سِيرَتَهُ. أَحْيَانًا يَحْتَاجُ العُقَلَاءُ إِلَى المَجَانِينِ لِيُبْصِرُوا.`,
    translation: `There was a madman in the city who spoke the truth. The king heard of him and summoned him. He asked: "What is your opinion of my rule?" The madman said: "You sit on a throne of injustice, wear a garment of lies, and eat from the wealth of the poor." The vizier grew angry and said: "Kill him, my lord!" But the king was silent for a long time. Then he said: "Release him. Truth is not punished. Rather, those who fear it are punished." From that day, the king changed his ways. Sometimes the wise need the mad to see clearly.`,
    grammaticalConcepts: ['passive voice تُعَاقَب', 'imperative أَطْلِقُوهُ', 'purpose with لِـ'],
    vocabularyHighlights: [
      { word: 'مَجْنُونٌ', meaning: 'madman' },
      { word: 'ظُلْمٍ', meaning: 'injustice' },
      { word: 'الوَزِيرُ', meaning: 'vizier, minister' },
      { word: 'سِيرَتَهُ', meaning: 'his conduct, ways' },
      { word: 'يُبْصِرُوا', meaning: 'to see clearly' }
    ],
    moralLesson: 'Those called mad may see what the sane refuse to see.',
    moralLessonAr: 'مَنْ يُسَمَّوْنَ مَجَانِينَ قَدْ يَرَوْنَ مَا يَرْفُضُ العُقَلَاءُ رُؤْيَتَهُ.',
    wordCount: 85
  },
  {
    id: 'a126',
    title: 'The Parable of the Cave',
    titleAr: 'مَثَلُ الكَهْفِ',
    level: 'advanced',
    category: 'fables-parables',
    categoryAr: 'الحكايات والأمثال',
    text: `تَخَيَّلْ نَاسًا يَعِيشُونَ فِي كَهْفٍ مُظْلِمٍ مُنْذُ وِلَادَتِهِمْ. خَلْفَهُمْ نَارٌ، وَأَمَامَهُمْ جِدَارٌ. يَرَوْنَ ظِلَالَ الأَشْيَاءِ عَلَى الجِدَارِ وَيَظُنُّونَهَا الحَقِيقَةَ. لَوْ خَرَجَ أَحَدُهُمْ إِلَى النُّورِ، لَأَلَمَتْ عَيْنَاهُ أَوَّلًا. ثُمَّ سَيَرَى الأَشْيَاءَ الحَقِيقِيَّةَ لَا ظِلَالَهَا. لَوْ عَادَ لِيُخْبِرَ أَهْلَ الكَهْفِ، لَكَذَّبُوهُ وَرُبَّمَا قَتَلُوهُ. لِأَنَّ الظِّلَالَ صَارَتْ حَقِيقَتَهُمُ الوَحِيدَةَ. هَكَذَا نَحْنُ: نَخَافُ مِنْ نُورِ الحَقِيقَةِ لِأَنَّهُ يُؤْلِمُ، وَنُفَضِّلُ ظَلَامَ الوَهْمِ لِأَنَّهُ مُرِيحٌ.`,
    translation: `Imagine people living in a dark cave since birth. Behind them is a fire, before them a wall. They see shadows of things on the wall and think them reality. If one of them went out to the light, his eyes would hurt at first. Then he would see real things, not their shadows. If he returned to tell the cave-dwellers, they would call him a liar and perhaps kill him. Because shadows have become their only reality. Thus are we: we fear the light of truth because it hurts, and prefer the darkness of illusion because it is comfortable.`,
    grammaticalConcepts: ['imperative تَخَيَّلْ', 'conditional لَوْ', 'reason with لِأَنَّ'],
    vocabularyHighlights: [
      { word: 'كَهْفٍ', meaning: 'cave' },
      { word: 'ظِلَالَ', meaning: 'shadows' },
      { word: 'لَأَلَمَتْ', meaning: 'would have hurt' },
      { word: 'كَذَّبُوهُ', meaning: 'called him a liar' },
      { word: 'الوَهْمِ', meaning: 'illusion, delusion' }
    ],
    moralLesson: 'Comfort in illusion is the enemy of truth.',
    moralLessonAr: 'الرَّاحَةُ فِي الوَهْمِ عَدُوُّ الحَقِيقَةِ.',
    wordCount: 88
  },
  {
    id: 'a127',
    title: 'The Three Fish',
    titleAr: 'السَّمَكَاتُ الثَّلَاثُ',
    level: 'advanced',
    category: 'fables-parables',
    categoryAr: 'الحكايات والأمثال',
    text: `فِي بُحَيْرَةٍ عَاشَتْ ثَلَاثُ سَمَكَاتٍ. الأُولَى حَكِيمَةٌ، وَالثَّانِيَةُ ذَكِيَّةٌ، وَالثَّالِثَةُ غَافِلَةٌ. جَاءَ صَيَّادُونَ لِيَصْطَادُوا غَدًا. السَّمَكَةُ الحَكِيمَةُ لَمْ تَنْتَظِرْ؛ خَرَجَتْ مِنَ البُحَيْرَةِ فَوْرًا عَبْرَ قَنَاةٍ ضَيِّقَةٍ. الثَّانِيَةُ انْتَظَرَتْ حَتَّى جَاءَ الصَّيَّادُونَ. تَظَاهَرَتْ بِالمَوْتِ، فَرَمَوْهَا، فَهَرَبَتْ. الثَّالِثَةُ قَالَتْ: "لَعَلَّهُمْ لَا يَصْطَادُونَنِي." اصْطَادُوهَا وَأَكَلُوهَا. الحِكْمَةُ أَنْ تَتَصَرَّفَ قَبْلَ المُشْكِلَةِ. الذَّكَاءُ أَنْ تَحُلَّهَا حِينَ تَقَعُ. الغَفْلَةُ أَنْ تَأْمُلَ أَنْ تَخْتَفِيَ وَحْدَهَا.`,
    translation: `In a lake lived three fish. The first was wise, the second clever, the third heedless. Fishermen came to fish tomorrow. The wise fish did not wait; she left the lake immediately through a narrow canal. The second waited until the fishermen came. She pretended to be dead, so they threw her back, and she escaped. The third said: "Perhaps they won't catch me." They caught her and ate her. Wisdom is to act before the problem. Cleverness is to solve it when it occurs. Heedlessness is to hope it disappears on its own.`,
    grammaticalConcepts: ['ordinal numbers', 'negation with لَمْ', 'purpose with أَنْ'],
    vocabularyHighlights: [
      { word: 'سَمَكَاتٍ', meaning: 'fish (plural)' },
      { word: 'غَافِلَةٌ', meaning: 'heedless' },
      { word: 'قَنَاةٍ', meaning: 'canal' },
      { word: 'تَظَاهَرَتْ', meaning: 'pretended' },
      { word: 'تَتَصَرَّفَ', meaning: 'to act' }
    ],
    moralLesson: 'Prevention is wisdom; cure is cleverness; denial is folly.',
    moralLessonAr: 'الوِقَايَةُ حِكْمَةٌ؛ العِلَاجُ ذَكَاءٌ؛ الإِنْكَارُ حَمَاقَةٌ.',
    wordCount: 79
  },
  {
    id: 'a128',
    title: 'The Blind Men and the Elephant',
    titleAr: 'العُمْيَانُ وَالفِيلُ',
    level: 'advanced',
    category: 'fables-parables',
    categoryAr: 'الحكايات والأمثال',
    text: `جَاءَ فِيلٌ إِلَى قَرْيَةٍ. أَرَادَ سِتَّةُ عُمْيَانٍ أَنْ يَعْرِفُوا مَا هُوَ. لَمَسَ الأَوَّلُ سَاقَهُ فَقَالَ: "الفِيلُ كَالشَّجَرَةِ." لَمَسَ الثَّانِي خُرْطُومَهُ فَقَالَ: "الفِيلُ كَالأُفْعُوَانِ." لَمَسَ الثَّالِثُ أُذُنَهُ: "كَالمِرْوَحَةِ." الرَّابِعُ لَمَسَ ذَيْلَهُ: "كَالحَبْلِ." الخَامِسُ لَمَسَ بَطْنَهُ: "كَالجِدَارِ." السَّادِسُ لَمَسَ نَابَهُ: "كَالرُّمْحِ." تَشَاجَرُوا، كُلٌّ يَظُنُّ أَنَّهُ عَلَى حَقٍّ. وَكُلُّهُمْ مُخْطِئُونَ وَمُصِيبُونَ مَعًا. كُلٌّ أَمْسَكَ جُزْءًا مِنَ الحَقِيقَةِ وَظَنَّهُ الحَقِيقَةَ كُلَّهَا.`,
    translation: `An elephant came to a village. Six blind men wanted to know what it was. The first touched its leg and said: "The elephant is like a tree." The second touched its trunk: "Like a serpent." The third touched its ear: "Like a fan." The fourth touched its tail: "Like a rope." The fifth touched its belly: "Like a wall." The sixth touched its tusk: "Like a spear." They quarreled, each thinking he was right. And all were wrong and right together. Each grasped a part of the truth and thought it was the whole truth.`,
    grammaticalConcepts: ['ordinal numbers', 'comparison with كَـ', 'كُلّ + singular'],
    vocabularyHighlights: [
      { word: 'عُمْيَانٍ', meaning: 'blind men' },
      { word: 'خُرْطُومَهُ', meaning: 'its trunk' },
      { word: 'نَابَهُ', meaning: 'its tusk' },
      { word: 'تَشَاجَرُوا', meaning: 'they quarreled' },
      { word: 'مُصِيبُونَ', meaning: 'correct, right' }
    ],
    moralLesson: 'Our limited perspective makes us mistake the part for the whole.',
    moralLessonAr: 'مَنْظُورُنَا المَحْدُودُ يَجْعَلُنَا نَخْلِطُ الجُزْءَ بِالكُلِّ.',
    wordCount: 82
  },
  {
    id: 'a129',
    title: 'The Ring of Solomon',
    titleAr: 'خَاتَمُ سُلَيْمَانَ',
    level: 'advanced',
    category: 'fables-parables',
    categoryAr: 'الحكايات والأمثال',
    text: `طَلَبَ المَلِكُ سُلَيْمَانُ مِنْ حَكِيمٍ خَاتَمًا يُسْعِدُهُ إِذَا حَزِنَ، وَيُحْزِنُهُ إِذَا فَرِحَ أَكْثَرَ مِمَّا يَنْبَغِي. بَحَثَ الحَكِيمُ طَوِيلًا. أَخِيرًا صَنَعَ خَاتَمًا بَسِيطًا وَكَتَبَ عَلَيْهِ: "وَهَذَا أَيْضًا سَيَمُرُّ." حِينَ يَحْزَنُ المَلِكُ، يَنْظُرُ إِلَى الخَاتَمِ فَيَتَذَكَّرُ أَنَّ الحُزْنَ زَائِلٌ. وَحِينَ يَفْرَحُ كَثِيرًا، يَنْظُرُ فَيَتَذَكَّرُ أَنَّ الفَرَحَ زَائِلٌ أَيْضًا. هَكَذَا يَبْقَى مُتَوَازِنًا. كُلُّ شَيْءٍ فِي الحَيَاةِ مَرْحَلَةٌ تَمُرُّ: الأَلَمُ وَالسَّعَادَةُ، النَّجَاحُ وَالفَشَلُ.`,
    translation: `King Solomon asked a wise man for a ring that would make him happy when sad, and make him sad when too happy. The wise man searched long. Finally he made a simple ring and inscribed on it: "This too shall pass." When the king is sad, he looks at the ring and remembers that sorrow is passing. When he is too happy, he looks and remembers that joy too is passing. Thus he stays balanced. Everything in life is a passing phase: pain and happiness, success and failure.`,
    grammaticalConcepts: ['conditional إِذَا', 'active participle زَائِلٌ', 'demonstrative هَذَا'],
    vocabularyHighlights: [
      { word: 'خَاتَمًا', meaning: 'ring' },
      { word: 'يَنْبَغِي', meaning: 'should, ought' },
      { word: 'زَائِلٌ', meaning: 'passing, transient' },
      { word: 'مُتَوَازِنًا', meaning: 'balanced' },
      { word: 'مَرْحَلَةٌ', meaning: 'phase, stage' }
    ],
    moralLesson: 'Knowing all things pass brings peace in both joy and sorrow.',
    moralLessonAr: 'مَعْرِفَةُ أَنَّ كُلَّ شَيْءٍ زَائِلٌ تَجْلِبُ السَّلَامَ فِي الفَرَحِ وَالحُزْنِ.',
    wordCount: 82
  },
  {
    id: 'a130',
    title: 'The Gardener and the Nightingale',
    titleAr: 'البُسْتَانِيُّ وَالبُلْبُلُ',
    level: 'advanced',
    category: 'fables-parables',
    categoryAr: 'الحكايات والأمثال',
    text: `اصْطَادَ بُسْتَانِيٌّ بُلْبُلًا وَوَضَعَهُ فِي قَفَصٍ. تَوَقَّفَ البُلْبُلُ عَنِ الغِنَاءِ. قَالَ البُسْتَانِيُّ: "غَنِّ لِي!" قَالَ البُلْبُلُ: "أَطْلِقْنِي وَأُخْبِرُكَ ثَلَاثَ حِكَمٍ." أَطْلَقَهُ. طَارَ البُلْبُلُ إِلَى شَجَرَةٍ وَقَالَ: "الأُولَى: لَا تَنْدَمْ عَلَى مَا فَاتَ. الثَّانِيَةُ: لَا تُصَدِّقْ مَا لَا يُصَدَّقُ. الثَّالِثَةُ: لَا تَطْلُبِ المُسْتَحِيلَ." ثُمَّ قَالَ: "فِي بَطْنِي جَوْهَرَةٌ ثَمِينَةٌ!" نَدِمَ البُسْتَانِيُّ وَحَاوَلَ اصْطِيَادَهُ. ضَحِكَ البُلْبُلُ: "نَسِيتَ الحِكَمَ الثَّلَاثَ فَوْرًا! نَدِمْتَ عَلَى مَا فَاتَ، صَدَّقْتَ مَا لَا يُصَدَّقُ، وَطَلَبْتَ المُسْتَحِيلَ."`,
    translation: `A gardener caught a nightingale and put it in a cage. The nightingale stopped singing. The gardener said: "Sing for me!" The nightingale said: "Release me and I will tell you three wisdoms." He released it. The nightingale flew to a tree and said: "First: Don't regret what is past. Second: Don't believe the unbelievable. Third: Don't seek the impossible." Then it said: "In my belly is a precious gem!" The gardener regretted and tried to catch it. The nightingale laughed: "You forgot the three wisdoms immediately! You regretted what is past, believed the unbelievable, and sought the impossible."`,
    grammaticalConcepts: ['imperative أَطْلِقْنِي', 'jussive لَا تَنْدَمْ', 'passive voice يُصَدَّق'],
    vocabularyHighlights: [
      { word: 'بُسْتَانِيٌّ', meaning: 'gardener' },
      { word: 'قَفَصٍ', meaning: 'cage' },
      { word: 'حِكَمٍ', meaning: 'wisdoms' },
      { word: 'جَوْهَرَةٌ', meaning: 'gem, jewel' },
      { word: 'المُسْتَحِيلَ', meaning: 'the impossible' }
    ],
    moralLesson: 'Wisdom is useless if not applied in the moment of need.',
    moralLessonAr: 'الحِكْمَةُ عَدِيمَةُ الفَائِدَةِ إِنْ لَمْ تُطَبَّقْ عِنْدَ الحَاجَةِ.',
    wordCount: 92
  }
];
