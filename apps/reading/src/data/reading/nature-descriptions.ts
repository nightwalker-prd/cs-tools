// src/data/reading/nature-descriptions.ts

import { ReadingText } from './types';

/**
 * Nature Descriptions themed reading texts
 * Topics: Gardens, rivers, storms, seasons, desert landscapes in classical prose
 * IDs: b199-b204 (beginner), i190-i195 (intermediate), a185-a190 (advanced)
 */
export const natureDescriptionsTexts: ReadingText[] = [
  // ===== BEGINNER (b199-b204) =====
  {
    id: 'b199',
    title: 'The Garden in Spring',
    titleAr: 'الحَدِيقَةُ فِي الرَّبِيعِ',
    level: 'beginner',
    category: 'nature-descriptions',
    categoryAr: 'وصف الطبيعة',
    text: 'جَاءَ الرَّبِيعُ فَتَفَتَّحَتِ الأَزْهَارُ. الوُرُودُ حَمْرَاءُ وَالْيَاسَمِينُ أَبْيَضُ. الفَرَاشَاتُ تَطِيرُ مِنْ زَهْرَةٍ إِلَى زَهْرَةٍ. العَصَافِيرُ تُغَنِّي فَوْقَ الأَشْجَارِ. الهَوَاءُ عَلِيلٌ وَالشَّمْسُ دَافِئَةٌ. جَلَسْتُ تَحْتَ الشَّجَرَةِ وَشَكَرْتُ اللهَ عَلَى هَذَا الجَمَالِ.',
    translation: 'Spring came and the flowers bloomed. The roses are red and the jasmine is white. Butterflies fly from flower to flower. Birds sing above the trees. The breeze is gentle and the sun is warm. I sat under the tree and thanked Allah for this beauty.',
    grammaticalConcepts: ['feminine adjectives', 'nominal sentences', 'past tense verbs'],
    vocabularyHighlights: [
      { word: 'تَفَتَّحَتْ', meaning: 'bloomed/opened' },
      { word: 'يَاسَمِين', meaning: 'jasmine' },
      { word: 'فَرَاشَات', meaning: 'butterflies' },
      { word: 'عَلِيل', meaning: 'gentle/refreshing (breeze)' }
    ],
    moralLesson: 'Nature in spring reflects Allah\'s beauty and mercy.',
    moralLessonAr: 'الطبيعة في الربيع تعكس جمال الله ورحمته.',
    wordCount: 38
  },
  {
    id: 'b200',
    title: 'The River',
    titleAr: 'النَّهْرُ',
    level: 'beginner',
    category: 'nature-descriptions',
    categoryAr: 'وصف الطبيعة',
    text: 'يَجْرِي النَّهْرُ بَيْنَ الحُقُولِ الخَضْرَاءِ. مَاؤُهُ صَافٍ وَبَارِدٌ. الأَسْمَاكُ تَسْبَحُ فِيهِ. الأَطْفَالُ يَلْعَبُونَ عَلَى ضِفَافِهِ. الفَلَّاحُونَ يَسْقُونَ زَرْعَهُمْ مِنْهُ. النَّهْرُ يُعْطِي الحَيَاةَ لِكُلِّ مَنْ حَوْلَهُ. سُبْحَانَ مَنْ خَلَقَ المَاءَ.',
    translation: 'The river flows between the green fields. Its water is clear and cold. Fish swim in it. Children play on its banks. Farmers water their crops from it. The river gives life to everyone around it. Glory to Him who created water.',
    grammaticalConcepts: ['present tense verbs', 'attached pronouns', 'من الموصولة'],
    vocabularyHighlights: [
      { word: 'يَجْرِي', meaning: 'flows/runs' },
      { word: 'صَافٍ', meaning: 'clear/pure' },
      { word: 'ضِفَاف', meaning: 'banks (of river)' },
      { word: 'يَسْقُونَ', meaning: 'they water/irrigate' }
    ],
    moralLesson: 'Rivers are a blessing that sustains life for all creatures.',
    moralLessonAr: 'الأنهار نعمة تحافظ على الحياة لكل المخلوقات.',
    wordCount: 36
  },
  {
    id: 'b201',
    title: 'The Rain',
    titleAr: 'المَطَرُ',
    level: 'beginner',
    category: 'nature-descriptions',
    categoryAr: 'وصف الطبيعة',
    text: 'تَجَمَّعَتِ الغُيُومُ فِي السَّمَاءِ. أَظْلَمَ الجَوُّ وَهَبَّتِ الرِّيَاحُ. ثُمَّ نَزَلَ المَطَرُ. قَطَرَاتُهُ تَضْرِبُ النَّوَافِذَ. رَائِحَةُ الأَرْضِ المَبْلُولَةِ جَمِيلَةٌ. النَّبَاتَاتُ تَشْرَبُ المَاءَ بِفَرَحٍ. قَالَ أَبِي: المَطَرُ رَحْمَةٌ مِنَ اللهِ.',
    translation: 'The clouds gathered in the sky. The atmosphere darkened and the winds blew. Then the rain fell. Its drops hit the windows. The smell of wet earth is beautiful. The plants drink the water with joy. My father said: Rain is mercy from Allah.',
    grammaticalConcepts: ['feminine verb agreement', 'nominal sentences', 'past tense sequence'],
    vocabularyHighlights: [
      { word: 'غُيُوم', meaning: 'clouds' },
      { word: 'أَظْلَمَ', meaning: 'darkened' },
      { word: 'هَبَّتْ', meaning: 'blew' },
      { word: 'المَبْلُولَة', meaning: 'wet/moistened' }
    ],
    moralLesson: 'Rain is a mercy from Allah that brings life to the earth.',
    moralLessonAr: 'المطر رحمة من الله تُحيي الأرض.',
    wordCount: 40
  },
  {
    id: 'b202',
    title: 'The Desert at Night',
    titleAr: 'الصَّحْرَاءُ لَيْلًا',
    level: 'beginner',
    category: 'nature-descriptions',
    categoryAr: 'وصف الطبيعة',
    text: 'غَابَتِ الشَّمْسُ وَجَاءَ اللَّيْلُ. الصَّحْرَاءُ هَادِئَةٌ جِدًّا. النُّجُومُ كَثِيرَةٌ فِي السَّمَاءِ. القَمَرُ يُضِيءُ الرِّمَالَ. الهَوَاءُ بَارِدٌ وَمُنْعِشٌ. سَمِعْتُ صَوْتَ الذِّئْبِ بَعِيدًا. الصَّحْرَاءُ جَمِيلَةٌ فِي هُدُوئِهَا.',
    translation: 'The sun set and night came. The desert is very quiet. The stars are many in the sky. The moon illuminates the sand. The air is cold and refreshing. I heard the wolf\'s howl far away. The desert is beautiful in its stillness.',
    grammaticalConcepts: ['feminine noun/adjective agreement', 'nominal sentences', 'adverbs'],
    vocabularyHighlights: [
      { word: 'غَابَتْ', meaning: 'set (sun)' },
      { word: 'يُضِيءُ', meaning: 'illuminates' },
      { word: 'مُنْعِش', meaning: 'refreshing' },
      { word: 'هُدُوء', meaning: 'stillness/quiet' }
    ],
    moralLesson: 'The desert night reveals creation\'s vastness and tranquility.',
    moralLessonAr: 'ليل الصحراء يكشف اتساع الخلق وسكينته.',
    wordCount: 38
  },
  {
    id: 'b203',
    title: 'The Mountain',
    titleAr: 'الجَبَلُ',
    level: 'beginner',
    category: 'nature-descriptions',
    categoryAr: 'وصف الطبيعة',
    text: 'الجَبَلُ عَالٍ وَكَبِيرٌ. قِمَّتُهُ تَلْمَسُ السَّحَابَ. الثَّلْجُ يُغَطِّي رَأْسَهُ فِي الشِّتَاءِ. الأَشْجَارُ تَنْمُو عَلَى جَوَانِبِهِ. الطُّيُورُ تَبْنِي أَعْشَاشَهَا هُنَاكَ. صَعِدْتُ الجَبَلَ مَعَ أَبِي. رَأَيْتُ المَدِينَةَ صَغِيرَةً مِنْ فَوْقُ.',
    translation: 'The mountain is tall and big. Its peak touches the clouds. Snow covers its top in winter. Trees grow on its sides. Birds build their nests there. I climbed the mountain with my father. I saw the city small from above.',
    grammaticalConcepts: ['صفة agreement', 'present tense verbs', 'attached pronouns'],
    vocabularyHighlights: [
      { word: 'قِمَّة', meaning: 'peak/summit' },
      { word: 'سَحَاب', meaning: 'clouds' },
      { word: 'يُغَطِّي', meaning: 'covers' },
      { word: 'أَعْشَاش', meaning: 'nests' }
    ],
    moralLesson: 'Mountains remind us of Allah\'s power and creation\'s grandeur.',
    moralLessonAr: 'الجبال تذكرنا بقدرة الله وعظمة الخلق.',
    wordCount: 40
  },
  {
    id: 'b204',
    title: 'The Sea',
    titleAr: 'البَحْرُ',
    level: 'beginner',
    category: 'nature-descriptions',
    categoryAr: 'وصف الطبيعة',
    text: 'وَقَفْتُ عَلَى الشَّاطِئِ. البَحْرُ وَاسِعٌ لَا نِهَايَةَ لَهُ. الأَمْوَاجُ تَأْتِي وَتَذْهَبُ. المَاءُ أَزْرَقُ مِثْلَ السَّمَاءِ. رَائِحَةُ المِلْحِ فِي الهَوَاءِ. السُّفُنُ تُبْحِرُ بَعِيدًا. البَحْرُ يُذَكِّرُنِي بِعَظَمَةِ الخَالِقِ.',
    translation: 'I stood on the shore. The sea is vast with no end. The waves come and go. The water is blue like the sky. The smell of salt is in the air. Ships sail far away. The sea reminds me of the Creator\'s greatness.',
    grammaticalConcepts: ['لا النافية للجنس', 'مثل comparison', 'present tense verbs'],
    vocabularyHighlights: [
      { word: 'شَاطِئ', meaning: 'shore/beach' },
      { word: 'أَمْوَاج', meaning: 'waves' },
      { word: 'مِلْح', meaning: 'salt' },
      { word: 'تُبْحِرُ', meaning: 'sail' }
    ],
    moralLesson: 'The sea\'s vastness reflects the infinite power of Allah.',
    moralLessonAr: 'اتساع البحر يعكس قدرة الله اللامتناهية.',
    wordCount: 38
  },

  // ===== INTERMEDIATE (i190-i195) =====
  {
    id: 'i190',
    title: 'The Andalusian Garden',
    titleAr: 'الحَدِيقَةُ الأَنْدَلُسِيَّةُ',
    level: 'intermediate',
    category: 'nature-descriptions',
    categoryAr: 'وصف الطبيعة',
    text: 'دَخَلْتُ حَدِيقَةَ الزَّهْرَاءِ فَانْبَهَرْتُ بِجَمَالِهَا. النَّوَافِيرُ تَتَدَفَّقُ بِمَاءٍ صَافٍ كَالبِلَّوْرِ. أَشْجَارُ البُرْتُقَالِ تَمْلَأُ الجَوَّ بِعِطْرِهَا. الوُرُودُ مُرَتَّبَةٌ فِي صُفُوفٍ كَأَنَّهَا جَيْشٌ مِنَ الجَمَالِ. القَنَوَاتُ المَائِيَّةُ تَجْرِي بَيْنَ المَمَرَّاتِ. المَوْسِيقَى الوَحِيدَةُ هِيَ خَرِيرُ المَاءِ وَتَغْرِيدُ الطُّيُورِ. هُنَا صَنَعَ الإِنْسَانُ جَنَّةً عَلَى الأَرْضِ.',
    translation: 'I entered the Zahra garden and was amazed by its beauty. Fountains flow with water clear as crystal. Orange trees fill the air with their fragrance. Roses are arranged in rows as if an army of beauty. Water channels run between the pathways. The only music is the murmur of water and the singing of birds. Here man created a paradise on earth.',
    grammaticalConcepts: ['كأنّ comparison', 'مصدر خرير/تغريد', 'passive participle مرتّبة'],
    vocabularyHighlights: [
      { word: 'نَوَافِير', meaning: 'fountains' },
      { word: 'بِلَّوْر', meaning: 'crystal' },
      { word: 'قَنَوَات', meaning: 'channels' },
      { word: 'خَرِير', meaning: 'murmur/gurgling' }
    ],
    moralLesson: 'Islamic gardens reflect the Quranic vision of paradise.',
    moralLessonAr: 'الحدائق الإسلامية تعكس الرؤية القرآنية للجنة.',
    wordCount: 62
  },
  {
    id: 'i191',
    title: 'The Storm',
    titleAr: 'العَاصِفَةُ',
    level: 'intermediate',
    category: 'nature-descriptions',
    categoryAr: 'وصف الطبيعة',
    text: 'اسْوَدَّتِ السَّمَاءُ فَجْأَةً كَأَنَّ اللَّيْلَ هَجَمَ عَلَى النَّهَارِ. هَبَّتِ الرِّيَاحُ عَاتِيَةً تَقْتَلِعُ الأَشْجَارَ. البَرْقُ يَشُقُّ الظَّلَامَ بِسُيُوفٍ مِنْ نُورٍ. الرَّعْدُ يَهْدِرُ كَأَنَّ الجِبَالَ تَتَصَادَمُ. المَطَرُ يَنْهَمِرُ كَأَنَّهُ سُيُولٌ مِنَ السَّمَاءِ. النَّاسُ يَخْتَبِئُونَ فِي بُيُوتِهِمْ. ثُمَّ هَدَأَتِ العَاصِفَةُ وَطَلَعَتِ الشَّمْسُ. سُبْحَانَ المُتَحَكِّمِ فِي الكَوْنِ.',
    translation: 'The sky blackened suddenly as if night attacked the day. Fierce winds blew, uprooting trees. Lightning splits the darkness with swords of light. Thunder roars as if mountains are colliding. Rain pours as if floods from the sky. People hide in their homes. Then the storm calmed and the sun rose. Glory to the One who controls the universe.',
    grammaticalConcepts: ['كأنّ repeated', 'حال عاتية', 'passive المتحكّم'],
    vocabularyHighlights: [
      { word: 'اسْوَدَّتْ', meaning: 'blackened' },
      { word: 'عَاتِيَة', meaning: 'fierce/violent' },
      { word: 'تَقْتَلِعُ', meaning: 'uproots' },
      { word: 'يَهْدِرُ', meaning: 'roars/rumbles' }
    ],
    moralLesson: 'Storms display Allah\'s power and remind us of our fragility.',
    moralLessonAr: 'العواصف تُظهر قدرة الله وتذكرنا بضعفنا.',
    wordCount: 65
  },
  {
    id: 'i192',
    title: 'The Oasis',
    titleAr: 'الوَاحَةُ',
    level: 'intermediate',
    category: 'nature-descriptions',
    categoryAr: 'وصف الطبيعة',
    text: 'بَعْدَ أَيَّامٍ مِنَ السَّيْرِ فِي الصَّحْرَاءِ القَاحِلَةِ، ظَهَرَتِ الوَاحَةُ كَحُلْمٍ. النَّخِيلُ الشَّامِخُ يُظَلِّلُ العُيُونَ العَذْبَةَ. المَاءُ يَنْبُعُ مِنَ الأَرْضِ بَارِدًا كَالثَّلْجِ. العُشْبُ الأَخْضَرُ يَفْتَرِشُ الأَرْضَ. الطُّيُورُ تَرْتَوِي وَالجِمَالُ تَسْتَرِيحُ. هُنَا يَجِدُ المُسَافِرُ المُتْعَبُ الحَيَاةَ بَعْدَ أَنْ كَادَ المَوْتُ يَأْخُذُهُ. الوَاحَةُ هَدِيَّةُ اللهِ لِلصَّحْرَاءِ.',
    translation: 'After days of walking in the barren desert, the oasis appeared like a dream. Tall palm trees shade the sweet springs. Water springs from the ground cold as snow. Green grass spreads across the earth. Birds drink and camels rest. Here the tired traveler finds life after death almost took him. The oasis is Allah\'s gift to the desert.',
    grammaticalConcepts: ['كاد + present', 'حال بارداً', 'إضافة chain'],
    vocabularyHighlights: [
      { word: 'قَاحِلَة', meaning: 'barren/arid' },
      { word: 'شَامِخ', meaning: 'tall/towering' },
      { word: 'يَنْبُعُ', meaning: 'springs/gushes' },
      { word: 'تَرْتَوِي', meaning: 'drinks/quenches thirst' }
    ],
    moralLesson: 'Oases are signs of Allah\'s mercy in the harshest environments.',
    moralLessonAr: 'الواحات آيات من رحمة الله في أقسى البيئات.',
    wordCount: 60
  },
  {
    id: 'i193',
    title: 'Autumn Leaves',
    titleAr: 'أَوْرَاقُ الخَرِيفِ',
    level: 'intermediate',
    category: 'nature-descriptions',
    categoryAr: 'وصف الطبيعة',
    text: 'جَاءَ الخَرِيفُ فَتَبَدَّلَتِ الأَلْوَانُ. الأَوْرَاقُ الَّتِي كَانَتْ خَضْرَاءَ صَارَتْ صَفْرَاءَ وَبُرْتُقَالِيَّةً وَحَمْرَاءَ. تَتَسَاقَطُ كَفَرَاشَاتٍ تَرْقُصُ فِي الهَوَاءِ. الأَشْجَارُ تَخْلَعُ ثِيَابَهَا اسْتِعْدَادًا لِلشِّتَاءِ. الطَّرِيقُ مَفْرُوشٌ بِسِجَّادٍ ذَهَبِيٍّ. الهَوَاءُ يَحْمِلُ رَائِحَةَ الأَرْضِ الرَّطْبَةِ. الخَرِيفُ يُعَلِّمُنَا أَنَّ كُلَّ شَيْءٍ يَتَغَيَّرُ، وَفِي التَّغْيِيرِ جَمَالٌ.',
    translation: 'Autumn came and colors changed. Leaves that were green became yellow, orange, and red. They fall like butterflies dancing in the air. Trees shed their clothes preparing for winter. The road is carpeted with a golden rug. The air carries the smell of moist earth. Autumn teaches us that everything changes, and in change there is beauty.',
    grammaticalConcepts: ['كان with past', 'تمييز كفراشات', 'حال استعداداً'],
    vocabularyHighlights: [
      { word: 'تَبَدَّلَتْ', meaning: 'changed/transformed' },
      { word: 'تَتَسَاقَطُ', meaning: 'fall (leaves)' },
      { word: 'تَخْلَعُ', meaning: 'sheds/removes' },
      { word: 'مَفْرُوش', meaning: 'carpeted/spread' }
    ],
    moralLesson: 'Autumn\'s transformation reminds us of life\'s cycles and change\'s beauty.',
    moralLessonAr: 'تحوّل الخريف يذكرنا بدورات الحياة وجمال التغيير.',
    wordCount: 58
  },
  {
    id: 'i194',
    title: 'The Nile at Dawn',
    titleAr: 'النِّيلُ عِنْدَ الفَجْرِ',
    level: 'intermediate',
    category: 'nature-descriptions',
    categoryAr: 'وصف الطبيعة',
    text: 'اسْتَيْقَظْتُ قَبْلَ الفَجْرِ لِأَرَى النِّيلَ. كَانَ المَاءُ سَاكِنًا كَالمِرْآةِ. السَّمَاءُ تَتَلَوَّنُ بِالبُرْتُقَالِيِّ وَالوَرْدِيِّ. القَوَارِبُ الصَّغِيرَةُ تَنْتَظِرُ الصَّيَّادِينَ. الضَّبَابُ الخَفِيفُ يَلُفُّ الضِّفَّتَيْنِ. ثُمَّ طَلَعَتِ الشَّمْسُ فَتَحَوَّلَ النِّيلُ إِلَى ذَهَبٍ سَائِلٍ. فَهِمْتُ لِمَاذَا عَبَدَ المِصْرِيُّونَ القُدَمَاءُ هَذَا النَّهْرَ. لَكِنَّ الحَقِيقَةَ أَنَّ الخَالِقَ أَعْظَمُ مِنْ خَلْقِهِ.',
    translation: 'I woke before dawn to see the Nile. The water was still like a mirror. The sky is colored with orange and pink. Small boats await the fishermen. Light fog wraps the two banks. Then the sun rose and the Nile turned to liquid gold. I understood why ancient Egyptians worshipped this river. But the truth is the Creator is greater than His creation.',
    grammaticalConcepts: ['لام التعليل', 'dual الضفّتين', 'comparative أعظم'],
    vocabularyHighlights: [
      { word: 'سَاكِن', meaning: 'still/calm' },
      { word: 'تَتَلَوَّنُ', meaning: 'is colored' },
      { word: 'ضَبَاب', meaning: 'fog/mist' },
      { word: 'سَائِل', meaning: 'liquid/flowing' }
    ],
    moralLesson: 'Nature\'s majesty should direct our worship to the Creator, not creation.',
    moralLessonAr: 'عظمة الطبيعة يجب أن توجّه عبادتنا للخالق لا المخلوق.',
    wordCount: 66
  },
  {
    id: 'i195',
    title: 'Winter Snow',
    titleAr: 'ثَلْجُ الشِّتَاءِ',
    level: 'intermediate',
    category: 'nature-descriptions',
    categoryAr: 'وصف الطبيعة',
    text: 'اسْتَيْقَظْتُ فَوَجَدْتُ العَالَمَ أَبْيَضَ. الثَّلْجُ يُغَطِّي كُلَّ شَيْءٍ: الأَسْطُحَ وَالأَشْجَارَ وَالشَّوَارِعَ. السُّكُونُ عَجِيبٌ كَأَنَّ الأَرْضَ تَسْتَرِيحُ. رُقَاقَاتُ الثَّلْجِ تَتَسَاقَطُ بِهُدُوءٍ. لَمَسْتُ الثَّلْجَ فَكَانَ بَارِدًا وَنَاعِمًا. صَنَعَ الأَطْفَالُ رَجُلَ ثَلْجٍ. قَالَ جَدِّي: الثَّلْجُ يُطَهِّرُ الأَرْضَ كَمَا يُطَهِّرُ التَّوْبَةُ القُلُوبَ.',
    translation: 'I woke up and found the world white. Snow covers everything: rooftops, trees, and streets. The silence is strange as if the earth is resting. Snowflakes fall quietly. I touched the snow and it was cold and soft. The children made a snowman. My grandfather said: Snow purifies the earth as repentance purifies hearts.',
    grammaticalConcepts: ['كأنّ comparison', 'كما comparative', 'past tense sequence'],
    vocabularyHighlights: [
      { word: 'أَسْطُح', meaning: 'rooftops' },
      { word: 'سُكُون', meaning: 'silence/stillness' },
      { word: 'رُقَاقَات', meaning: 'flakes' },
      { word: 'يُطَهِّرُ', meaning: 'purifies' }
    ],
    moralLesson: 'Snow\'s purity symbolizes spiritual cleansing and renewal.',
    moralLessonAr: 'نقاء الثلج يرمز للتطهير الروحي والتجديد.',
    wordCount: 58
  },

  // ===== ADVANCED (a185-a190) =====
  {
    id: 'a185',
    title: 'The Gardens of Damascus',
    titleAr: 'غُوطَةُ دِمَشْقَ',
    level: 'advanced',
    category: 'nature-descriptions',
    categoryAr: 'وصف الطبيعة',
    text: 'قَالَ ابْنُ جُبَيْرٍ فِي وَصْفِ دِمَشْقَ: مَا رَأَتْ عَيْنَايَ أَجْمَلَ مِنْ غُوطَتِهَا. هِيَ جَنَّةٌ تُحِيطُ بِالمَدِينَةِ كَالهَالَةِ حَوْلَ القَمَرِ. الأَنْهَارُ تَتَشَعَّبُ فِيهَا كَعُرُوقِ الحَيَاةِ. أَشْجَارُ المِشْمِشِ وَالتُّفَّاحِ وَالجَوْزِ تَتَسَابَقُ فِي العُلُوِّ. العَصَافِيرُ تُغَنِّي أَغَانِيَ لَا تَعْرِفُهَا اللُّغَاتُ. الهَوَاءُ مُعَطَّرٌ بِأَنْفَاسِ الأَزْهَارِ. مَنْ دَخَلَهَا نَسِيَ هُمُومَ الدُّنْيَا وَظَنَّ أَنَّهُ فِي الجَنَّةِ.',
    translation: 'Ibn Jubayr said describing Damascus: My eyes never saw anything more beautiful than its Ghouta. It is a paradise surrounding the city like a halo around the moon. Rivers branch through it like the veins of life. Apricot, apple, and walnut trees race in height. Birds sing songs that languages do not know. The air is perfumed with the breath of flowers. Whoever entered it forgot the world\'s worries and thought he was in paradise.',
    grammaticalConcepts: ['ما النافية + comparative', 'كـ comparison chain', 'من الشرطية'],
    vocabularyHighlights: [
      { word: 'غُوطَة', meaning: 'Ghouta (fertile area)' },
      { word: 'هَالَة', meaning: 'halo/aura' },
      { word: 'تَتَشَعَّبُ', meaning: 'branch out' },
      { word: 'مُعَطَّر', meaning: 'perfumed/scented' }
    ],
    moralLesson: 'Classical travelers preserved the beauty of lands through eloquent description.',
    moralLessonAr: 'الرحالة الكلاسيكيون حفظوا جمال البلاد بالوصف البليغ.',
    wordCount: 78
  },
  {
    id: 'a186',
    title: 'The Desert Wind',
    titleAr: 'رِيَاحُ الصَّحْرَاءِ',
    level: 'advanced',
    category: 'nature-descriptions',
    categoryAr: 'وصف الطبيعة',
    text: 'هَبَّتِ الرِّيحُ الصَّفْرَاءُ فَحَمَلَتْ مَعَهَا الرِّمَالَ كَجَيْشٍ غَازٍ. أَظْلَمَتِ السَّمَاءُ وَصَارَ النَّهَارُ لَيْلًا. الرَّمْلُ يَلْسَعُ الوُجُوهَ كَالإِبَرِ المُحْمَاةِ. البَدَوِيُّ يُغَطِّي وَجْهَهُ وَيَحْتَمِي خَلْفَ جَمَلِهِ. الصَّحْرَاءُ تَغْضَبُ أَحْيَانًا فَتُظْهِرُ وَجْهَهَا القَاسِيَ. لَكِنَّ البَدَوِيَّ يَعْرِفُ أَنَّ الغَضَبَ لَا يَدُومُ. يَنْتَظِرُ بِصَبْرٍ حَتَّى تَهْدَأَ الرِّيحُ وَيَعُودَ السَّلَامُ إِلَى الصَّحْرَاءِ الأُمِّ.',
    translation: 'The yellow wind blew, carrying sand like an invading army. The sky darkened and day became night. Sand stings faces like heated needles. The Bedouin covers his face and shelters behind his camel. The desert sometimes rages and shows its harsh face. But the Bedouin knows that anger does not last. He waits patiently until the wind calms and peace returns to the mother desert.',
    grammaticalConcepts: ['تشبيه كجيش', 'present with habitual meaning', 'حتى + subjunctive'],
    vocabularyHighlights: [
      { word: 'غَازٍ', meaning: 'invading' },
      { word: 'يَلْسَعُ', meaning: 'stings' },
      { word: 'المُحْمَاة', meaning: 'heated' },
      { word: 'يَحْتَمِي', meaning: 'takes shelter' }
    ],
    moralLesson: 'Desert dwellers teach patience through understanding nature\'s cycles.',
    moralLessonAr: 'سكان الصحراء يعلّمون الصبر من خلال فهم دورات الطبيعة.',
    wordCount: 75
  },
  {
    id: 'a187',
    title: 'The Tigris and Euphrates',
    titleAr: 'دِجْلَةُ وَالفُرَاتُ',
    level: 'advanced',
    category: 'nature-descriptions',
    categoryAr: 'وصف الطبيعة',
    text: 'نَهْرَانِ عَظِيمَانِ يَنْبُعَانِ مِنْ جِبَالِ الشَّمَالِ وَيَصُبَّانِ فِي بَحْرِ الجَنُوبِ. بَيْنَهُمَا قَامَتْ أَعْظَمُ حَضَارَاتِ التَّارِيخِ. دِجْلَةُ سَرِيعُ الجَرَيَانِ، عَنِيفُ الطَّبْعِ، يَفِيضُ فِي الرَّبِيعِ فَيُغْرِقُ وَيُحْيِي. الفُرَاتُ هَادِئٌ وَقُورٌ، يَسِيرُ بِتَأَنٍّ كَشَيْخٍ حَكِيمٍ. قَالَ الشَّاعِرُ: هُمَا شِرْيَانَا الحَيَاةِ لِأَرْضِ السَّوَادِ. مَنْ شَرِبَ مِنْهُمَا لَا يَنْسَاهُمَا أَبَدًا.',
    translation: 'Two great rivers spring from the northern mountains and pour into the southern sea. Between them arose history\'s greatest civilizations. The Tigris is fast-flowing, violent in nature, flooding in spring, drowning and reviving. The Euphrates is calm and dignified, moving deliberately like a wise elder. The poet said: They are the arteries of life for the land of Sawad. Whoever drinks from them never forgets them.',
    grammaticalConcepts: ['dual verb forms', 'مصدر الجريان', 'من الشرطية'],
    vocabularyHighlights: [
      { word: 'يَنْبُعَانِ', meaning: 'spring forth (dual)' },
      { word: 'يَصُبَّانِ', meaning: 'pour into (dual)' },
      { word: 'وَقُور', meaning: 'dignified/solemn' },
      { word: 'شِرْيَان', meaning: 'artery' }
    ],
    moralLesson: 'Rivers shaped civilizations and carry the memory of nations.',
    moralLessonAr: 'الأنهار شكّلت الحضارات وتحمل ذاكرة الأمم.',
    wordCount: 77
  },
  {
    id: 'a188',
    title: 'The Cedar Forests of Lebanon',
    titleAr: 'غَابَاتُ أَرْزِ لُبْنَانَ',
    level: 'advanced',
    category: 'nature-descriptions',
    categoryAr: 'وصف الطبيعة',
    text: 'صَعِدْتُ إِلَى جَبَلِ لُبْنَانَ حَيْثُ تَقِفُ أَشْجَارُ الأَرْزِ شَامِخَةً مُنْذُ آلَافِ السِّنِينَ. جُذُوعُهَا كَأَعْمِدَةِ المَعَابِدِ، وَأَغْصَانُهَا كَأَذْرُعٍ مَمْدُودَةٍ لِلسَّمَاءِ. الهَوَاءُ عَلِيلٌ يَحْمِلُ عِطْرَ الخَشَبِ المُقَدَّسِ. الصَّمْتُ هُنَا لَهُ هَيْبَةٌ. الأَرْزُ شَاهِدٌ عَلَى حَضَارَاتٍ وَلَّتْ وَمُلُوكٍ مَاتُوا. قَطَعَهُ الفِينِيقِيُّونَ لِبِنَاءِ سُفُنِهِمْ، وَاسْتَوْرَدَهُ سُلَيْمَانُ لِهَيْكَلِهِ. وَهُوَ بَاقٍ يُذَكِّرُ بِالخُلُودِ.',
    translation: 'I climbed Mount Lebanon where cedar trees stand tall since thousands of years. Their trunks are like temple pillars, their branches like arms extended to the sky. The breeze is gentle, carrying the fragrance of sacred wood. Silence here has majesty. The cedar witnesses civilizations that passed and kings who died. The Phoenicians cut it to build their ships, Solomon imported it for his temple. And it remains, reminding of eternity.',
    grammaticalConcepts: ['حال شامخة', 'كـ comparison', 'relative clause مُلُوك ماتوا'],
    vocabularyHighlights: [
      { word: 'جُذُوع', meaning: 'trunks' },
      { word: 'مَعَابِد', meaning: 'temples' },
      { word: 'هَيْبَة', meaning: 'majesty/awe' },
      { word: 'الخُلُود', meaning: 'eternity' }
    ],
    moralLesson: 'Ancient trees connect us to history and remind us of permanence amid change.',
    moralLessonAr: 'الأشجار القديمة تربطنا بالتاريخ وتذكرنا بالثبات وسط التغيير.',
    wordCount: 80
  },
  {
    id: 'a189',
    title: 'The Starry Night',
    titleAr: 'السَّمَاءُ المُرَصَّعَةُ بِالنُّجُومِ',
    level: 'advanced',
    category: 'nature-descriptions',
    categoryAr: 'وصف الطبيعة',
    text: 'خَرَجْتُ إِلَى الصَّحْرَاءِ لَيْلًا فَرَأَيْتُ مَا لَمْ أَرَهُ مِنْ قَبْلُ. السَّمَاءُ قُبَّةٌ مِنَ الأَلْمَاسِ المُتَلَأْلِئِ. المَجَرَّةُ نَهْرٌ مِنَ الضَّوْءِ يَشُقُّ الظَّلَامَ. النُّجُومُ لَا تُحْصَى كَرِمَالِ الشَّاطِئِ. بَعْضُهَا يَخْفِتُ وَبَعْضُهَا يَتَوَهَّجُ. الكَوْنُ يَبْدُو لَا نِهَائِيًّا. شَعَرْتُ بِصِغَرِي أَمَامَ هَذَا الجَلَالِ. ثُمَّ تَذَكَّرْتُ أَنَّ الَّذِي خَلَقَ كُلَّ هَذَا يَسْمَعُ دُعَائِي. فَامْتَلَأَ قَلْبِي سَكِينَةً.',
    translation: 'I went out to the desert at night and saw what I had never seen before. The sky is a dome of sparkling diamonds. The galaxy is a river of light splitting the darkness. Stars are countless like sand grains on a beach. Some dim and some glow. The universe seems infinite. I felt small before this majesty. Then I remembered that He who created all this hears my prayer. My heart filled with tranquility.',
    grammaticalConcepts: ['ما الموصولة', 'لا تُحصى passive', 'الذي relative'],
    vocabularyHighlights: [
      { word: 'المُتَلَأْلِئ', meaning: 'sparkling/glittering' },
      { word: 'المَجَرَّة', meaning: 'galaxy' },
      { word: 'يَخْفِتُ', meaning: 'dims' },
      { word: 'يَتَوَهَّجُ', meaning: 'glows' }
    ],
    moralLesson: 'The night sky inspires awe and connects the observer to the Creator.',
    moralLessonAr: 'السماء الليلية تلهم الخشوع وتربط المراقب بالخالق.',
    wordCount: 82
  },
  {
    id: 'a190',
    title: 'The Earthquake',
    titleAr: 'الزِّلْزَالُ',
    level: 'advanced',
    category: 'nature-descriptions',
    categoryAr: 'وصف الطبيعة',
    text: 'فَجْأَةً اهْتَزَّتِ الأَرْضُ تَحْتَ أَقْدَامِنَا. المَبَانِي تَتَمَايَلُ كَسُكَارَى. الأَثَاثُ يَسْقُطُ وَالزُّجَاجُ يَتَكَسَّرُ. صُرَاخُ النَّاسِ يَعْلُو. الأَطْفَالُ يَبْكُونَ. خَرَجْنَا إِلَى الشَّارِعِ وَالأَرْضُ مَا زَالَتْ تَرْتَجِفُ. ثَوَانٍ قَلِيلَةٌ بَدَتْ كَسَاعَاتٍ. ثُمَّ سَكَنَتِ الأَرْضُ كَأَنَّ شَيْئًا لَمْ يَحْدُثْ. نَظَرْنَا إِلَى بَعْضِنَا فِي صَمْتٍ. أَدْرَكْنَا أَنَّنَا ضُيُوفٌ عَلَى هَذِهِ الأَرْضِ، وَأَنَّ مَا نَظُنُّهُ ثَابِتًا قَدْ يَتَزَلْزَلُ فِي لَحْظَةٍ.',
    translation: 'Suddenly the earth shook beneath our feet. Buildings sway like drunkards. Furniture falls and glass shatters. People\'s screams rise. Children cry. We went out to the street while the earth still trembled. A few seconds seemed like hours. Then the earth calmed as if nothing happened. We looked at each other in silence. We realized we are guests on this earth, and what we think is stable may shake in a moment.',
    grammaticalConcepts: ['ما زالت + present', 'كأنّ + لم', 'ما الموصولة'],
    vocabularyHighlights: [
      { word: 'اهْتَزَّتْ', meaning: 'shook/trembled' },
      { word: 'تَتَمَايَلُ', meaning: 'sway' },
      { word: 'تَرْتَجِفُ', meaning: 'trembles' },
      { word: 'يَتَزَلْزَلُ', meaning: 'shakes/quakes' }
    ],
    moralLesson: 'Natural disasters remind us of life\'s fragility and our dependence on Allah.',
    moralLessonAr: 'الكوارث الطبيعية تذكرنا بهشاشة الحياة واعتمادنا على الله.',
    wordCount: 85
  }
];
