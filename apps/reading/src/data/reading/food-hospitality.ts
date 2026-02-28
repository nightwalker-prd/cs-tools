// src/data/reading/food-hospitality.ts

import { ReadingText } from './types';

/**
 * Food & Hospitality reading texts
 * Topics: Arabian feasts, hospitality customs, bazaar scenes, cooking traditions
 * 18 texts: 6 beginner, 6 intermediate, 6 advanced
 */
export const foodHospitalityTexts: ReadingText[] = [
  // ===== BEGINNER (b181-b186) =====
  {
    id: 'b181',
    title: 'The Guest is King',
    titleAr: 'الضَّيْفُ مَلِكٌ',
    level: 'beginner',
    category: 'food-hospitality',
    categoryAr: 'الطعام والضيافة',
    text: 'طَرَقَ الضَّيْفُ البابَ. فَتَحَ صاحِبُ البَيْتِ وَابْتَسَمَ: أَهْلًا وَسَهْلًا! تَفَضَّلْ! أَجْلَسَهُ في أَفْضَلِ مَكانٍ. قَدَّمَ لَهُ القَهْوَةَ وَالتَّمْرَ. ثُمَّ جاءَ بِالطَّعامِ: لَحْمٌ وَأَرُزٌّ وَخُضَرٌ. قالَ الضَّيْفُ: هَذا كَثيرٌ جِدًّا! قالَ المُضيفُ: الضَّيْفُ مَلِكٌ، وَبَيْتُنا بَيْتُهُ. كُلْ وَلا تَسْتَحِ!',
    translation: 'The guest knocked on the door. The host opened and smiled: "Welcome! Please come in!" He seated him in the best place. He served him coffee and dates. Then he brought food: meat, rice, and vegetables. The guest said: "This is too much!" The host said: "The guest is king, and our house is his house. Eat and don\'t be shy!"',
    grammaticalConcepts: ['أمر', 'جملة اسمية', 'نهي'],
    vocabularyHighlights: [
      { word: 'طَرَقَ', meaning: 'knocked' },
      { word: 'تَفَضَّلْ', meaning: 'please, come in' },
      { word: 'التَّمْر', meaning: 'dates' },
      { word: 'لا تَسْتَحِ', meaning: 'don\'t be shy' }
    ],
    moralLesson: 'Generosity to guests is a noble Arab tradition.',
    moralLessonAr: 'الكرم مع الضيوف تقليد عربي نبيل.',
    wordCount: 52
  },
  {
    id: 'b182',
    title: 'In the Bazaar',
    titleAr: 'في السّوقِ',
    level: 'beginner',
    category: 'food-hospitality',
    categoryAr: 'الطعام والضيافة',
    text: 'السّوقُ مَلِيءٌ بِالحَياةِ. البائِعونَ يُنادونَ: تَعالَوْا! أَطْيَبُ الفَواكِهِ! رائِحَةُ التَّوابِلِ تَمْلَأُ الهَواءَ. هُنا الزَّعْفَرانُ الذَّهَبِيُّ، وَهُناكَ الفُلْفُلُ الأَسْوَدُ. الخُبْزُ الطّازِجُ يَخْرُجُ مِنَ الفُرْنِ. العَسَلُ يَلْمَعُ في الشَّمْسِ. اشْتَرَيْتُ تُفّاحًا أَحْمَرَ وَعِنَبًا حُلْوًا. عُدْتُ إِلى البَيْتِ سَعيدًا!',
    translation: 'The bazaar is full of life. Sellers call out: "Come! The finest fruits!" The smell of spices fills the air. Here is golden saffron, and there is black pepper. Fresh bread comes out of the oven. Honey glistens in the sun. I bought red apples and sweet grapes. I returned home happy!',
    grammaticalConcepts: ['اسم تفضيل', 'صفة', 'أمر'],
    vocabularyHighlights: [
      { word: 'التَّوابِل', meaning: 'spices' },
      { word: 'الزَّعْفَران', meaning: 'saffron' },
      { word: 'الفُرْن', meaning: 'oven' },
      { word: 'يَلْمَع', meaning: 'glistens, shines' }
    ],
    moralLesson: 'Markets are places of life, color, and community.',
    moralLessonAr: 'الأسواق أماكن للحياة واللون والمجتمع.',
    wordCount: 48
  },
  {
    id: 'b183',
    title: 'Mother\'s Cooking',
    titleAr: 'طَبْخُ أُمّي',
    level: 'beginner',
    category: 'food-hospitality',
    categoryAr: 'الطعام والضيافة',
    text: 'أُمّي أَحْسَنُ طَبّاخَةٍ في العالَمِ! تَسْتَيْقِظُ مُبَكِّرًا وَتَدْخُلُ المَطْبَخَ. تُقَطِّعُ البَصَلَ وَالثّومَ وَالطَّماطِمَ. رائِحَةُ الطَّعامِ تَنْتَشِرُ في البَيْتِ. نَجْلِسُ حَوْلَ المائِدَةِ جائِعينَ. نَأْكُلُ وَنَضْحَكُ وَنَتَحَدَّثُ. طَعامُ أُمّي لَيْسَ طَعامًا فَقَطْ، بَلْ حُبٌّ في صَحْنٍ!',
    translation: 'My mother is the best cook in the world! She wakes early and enters the kitchen. She chops onions, garlic, and tomatoes. The smell of food spreads through the house. We sit around the table hungry. We eat, laugh, and talk. My mother\'s food isn\'t just food—it\'s love on a plate!',
    grammaticalConcepts: ['اسم تفضيل', 'جملة حالية', 'نفي واستدراك'],
    vocabularyHighlights: [
      { word: 'طَبّاخَة', meaning: 'cook (female)' },
      { word: 'تُقَطِّع', meaning: 'chops' },
      { word: 'المائِدَة', meaning: 'dining table' },
      { word: 'صَحْن', meaning: 'plate, dish' }
    ],
    moralLesson: 'Home-cooked food carries the taste of love.',
    moralLessonAr: 'الطعام المنزلي يحمل طعم الحب.',
    wordCount: 46
  },
  {
    id: 'b184',
    title: 'The Coffee Ritual',
    titleAr: 'طَقْسُ القَهْوَةِ',
    level: 'beginner',
    category: 'food-hospitality',
    categoryAr: 'الطعام والضيافة',
    text: 'القَهْوَةُ العَرَبِيَّةُ لَها طَقْسٌ خاصٌّ. تُحَمَّصُ الحُبوبُ عَلى النّارِ. تُطْحَنُ بِالمِهْباجِ مَعَ الهالِ. تُصَبُّ في الدَّلَّةِ وَتُغْلى. ثُمَّ تُسْكَبُ في الفَناجينِ الصَّغيرَةِ. الضَّيْفُ يَشْرَبُ ثَلاثَ فَناجينَ. الأُولى لِلضَّيْفِ، الثّانِيَةُ لِلسَّيْفِ، الثّالِثَةُ لِلْكَيْفِ!',
    translation: 'Arabic coffee has a special ritual. The beans are roasted over fire. They\'re ground with a mortar with cardamom. It\'s poured into the dallah pot and boiled. Then it\'s poured into small cups. The guest drinks three cups. The first for the guest, the second for the sword (honor), the third for pleasure!',
    grammaticalConcepts: ['مبني للمجهول', 'عدد', 'إضافة'],
    vocabularyHighlights: [
      { word: 'تُحَمَّص', meaning: 'is roasted' },
      { word: 'المِهْباج', meaning: 'mortar (for grinding)' },
      { word: 'الهال', meaning: 'cardamom' },
      { word: 'الدَّلَّة', meaning: 'Arabic coffee pot' }
    ],
    moralLesson: 'Coffee rituals reflect culture and hospitality values.',
    moralLessonAr: 'طقوس القهوة تعكس الثقافة وقيم الضيافة.',
    wordCount: 50
  },
  {
    id: 'b185',
    title: 'Ramadan Iftar',
    titleAr: 'إِفْطارُ رَمَضانَ',
    level: 'beginner',
    category: 'food-hospitality',
    categoryAr: 'الطعام والضيافة',
    text: 'غُروبُ الشَّمْسِ في رَمَضانَ لَحْظَةٌ سَعيدَةٌ. يَجْتَمِعُ الأَهْلُ حَوْلَ المائِدَةِ. يَبْدَأُ الإِفْطارُ بِتَمْرَةٍ وَماءٍ. ثُمَّ الشّوربَةُ السّاخِنَةُ وَالسَّمْبوسَةُ المَقْلِيَّةُ. الأَطْفالُ يَنْتَظِرونَ الحَلْوى. الكَبيرُ وَالصَّغيرُ يَأْكُلونَ مَعًا. رَمَضانُ شَهْرُ الصِّيامِ وَشَهْرُ اللِّقاءِ!',
    translation: 'Sunset in Ramadan is a happy moment. The family gathers around the table. Iftar begins with a date and water. Then hot soup and fried samosas. Children wait for dessert. Young and old eat together. Ramadan is the month of fasting and the month of gathering!',
    grammaticalConcepts: ['إضافة', 'عطف', 'جملة اسمية'],
    vocabularyHighlights: [
      { word: 'غُروب', meaning: 'sunset' },
      { word: 'الإِفْطار', meaning: 'breaking fast, iftar' },
      { word: 'الشّوربَة', meaning: 'soup' },
      { word: 'السَّمْبوسَة', meaning: 'samosas' }
    ],
    moralLesson: 'Ramadan brings families together around food and faith.',
    moralLessonAr: 'رمضان يجمع العائلات حول الطعام والإيمان.',
    wordCount: 46
  },
  {
    id: 'b186',
    title: 'The Baker\'s Shop',
    titleAr: 'دُكّانُ الخَبّازِ',
    level: 'beginner',
    category: 'food-hospitality',
    categoryAr: 'الطعام والضيافة',
    text: 'الخَبّازُ يَسْتَيْقِظُ قَبْلَ الفَجْرِ. يُشْعِلُ النّارَ في الفُرْنِ الكَبيرِ. يَعْجِنُ الدَّقيقَ وَالماءَ وَالمِلْحَ. يُشَكِّلُ العَجينَ دَوائِرَ وَأَشْكالًا. يَدْخُلُ الخُبْزُ الفُرْنَ أَبْيَضَ وَيَخْرُجُ ذَهَبِيًّا. رائِحَتُهُ تَمْلَأُ الشّارِعَ. النّاسُ يَصْطَفّونَ لِيَشْتَروا الخُبْزَ الطّازِجَ. الخُبْزُ نِعْمَةٌ لا نُقَدِّرُها!',
    translation: 'The baker wakes before dawn. He lights the fire in the big oven. He kneads flour, water, and salt. He shapes the dough into circles and forms. The bread enters the oven white and comes out golden. Its smell fills the street. People line up to buy fresh bread. Bread is a blessing we don\'t appreciate!',
    grammaticalConcepts: ['فعل مضارع', 'جملة حالية', 'نفي'],
    vocabularyHighlights: [
      { word: 'الخَبّاز', meaning: 'baker' },
      { word: 'يَعْجِن', meaning: 'kneads' },
      { word: 'الدَّقيق', meaning: 'flour' },
      { word: 'العَجين', meaning: 'dough' }
    ],
    moralLesson: 'Simple blessings like bread deserve gratitude.',
    moralLessonAr: 'النعم البسيطة مثل الخبز تستحق الشكر.',
    wordCount: 52
  },

  // ===== INTERMEDIATE (i172-i177) =====
  {
    id: 'i172',
    title: 'The Wedding Feast',
    titleAr: 'وَليمَةُ العُرْسِ',
    level: 'intermediate',
    category: 'food-hospitality',
    categoryAr: 'الطعام والضيافة',
    text: 'الوَليمَةُ تَليقُ بِالمَلِكِ. الخِرافُ تُشْوى عَلى نارٍ هادِئَةٍ طَوالَ اللَّيْلِ. الأَرُزُّ مُعَطَّرٌ بِالزَّعْفَرانِ وَالهالِ وَاللَّوْزِ. السَّلَطاتُ مُلَوَّنَةٌ كَالحَديقَةِ. الحَلَوى طَبَقاتٌ مِنَ القَطائِفِ وَالكُنافَةِ وَالبَقْلاوَةِ. المُضيفُ يَطوفُ عَلى الضُّيوفِ: كُلوا! هَذا يَوْمُ فَرَحٍ! الموسيقى تَعْزِفُ وَالنّاسُ يَرْقُصونَ. العُرْسُ لَيْسَ زَواجًا فَقَطْ، بَلْ احْتِفالٌ بِالحَياةِ نَفْسِها.',
    translation: 'The feast befits a king. Sheep are roasted over slow fire throughout the night. Rice is perfumed with saffron, cardamom, and almonds. Salads are colorful like a garden. Desserts are layers of qatayef, kunafa, and baklava. The host circles among guests: "Eat! This is a day of joy!" Music plays and people dance. A wedding isn\'t just marriage—it\'s a celebration of life itself.',
    grammaticalConcepts: ['مبني للمجهول', 'تشبيه', 'أمر'],
    vocabularyHighlights: [
      { word: 'الخِراف', meaning: 'sheep' },
      { word: 'تُشْوى', meaning: 'is roasted' },
      { word: 'القَطائِف', meaning: 'qatayef (stuffed pancakes)' },
      { word: 'الكُنافَة', meaning: 'kunafa (cheese pastry)' }
    ],
    moralLesson: 'Feasts celebrate community as much as the occasion.',
    moralLessonAr: 'الولائم تحتفي بالمجتمع بقدر ما تحتفي بالمناسبة.',
    wordCount: 68
  },
  {
    id: 'i173',
    title: 'The Spice Merchant',
    titleAr: 'تاجِرُ التَّوابِلِ',
    level: 'intermediate',
    category: 'food-hospitality',
    categoryAr: 'الطعام والضيافة',
    text: 'دُكّانُ العَطّارِ كَنْزٌ مِنَ الرَّوائِحِ. أَكْياسٌ مَفْتوحَةٌ تَفوحُ مِنْها عُطورُ الشَّرْقِ. الكُرْكُمُ الأَصْفَرُ كَالذَّهَبِ، وَالقِرْفَةُ البُنِّيَّةُ كَالخَشَبِ العَتيقِ. الفُلْفُلُ الأَسْوَدُ وَالأَبْيَضُ وَالأَحْمَرُ. الزَّنْجَبيلُ الحارُّ وَالكَمّونُ العَطِرُ. قالَ التّاجِرُ: هَذِهِ التَّوابِلُ جاءَتْ مِنَ الهِنْدِ وَاليَمَنِ وَزِنْجِبارَ. سافَرَتْ بِالسُّفُنِ وَالقَوافِلِ لِتَصِلَ إِلى مَطْبَخِكَ. كُلُّ ذَرَّةٍ فيها قِصَّةٌ!',
    translation: 'The spice merchant\'s shop is a treasure of aromas. Open sacks exude the perfumes of the East. Turmeric is yellow like gold, and cinnamon is brown like aged wood. Black pepper, white and red. Hot ginger and fragrant cumin. The merchant said: "These spices came from India, Yemen, and Zanzibar. They traveled by ships and caravans to reach your kitchen. Every grain has a story!"',
    grammaticalConcepts: ['تشبيه', 'صفة', 'إضافة'],
    vocabularyHighlights: [
      { word: 'العَطّار', meaning: 'spice merchant' },
      { word: 'الكُرْكُم', meaning: 'turmeric' },
      { word: 'القِرْفَة', meaning: 'cinnamon' },
      { word: 'القَوافِل', meaning: 'caravans' }
    ],
    moralLesson: 'Spices carry the stories of distant lands.',
    moralLessonAr: 'التوابل تحمل قصص الأراضي البعيدة.',
    wordCount: 66
  },
  {
    id: 'i174',
    title: 'The Three-Day Guest',
    titleAr: 'ضَيْفُ الثَّلاثَةِ أَيّامٍ',
    level: 'intermediate',
    category: 'food-hospitality',
    categoryAr: 'الطعام والضيافة',
    text: 'في التَّقاليدِ العَرَبِيَّةِ، الضَّيْفُ لَهُ ثَلاثَةُ أَيّامٍ. اليَوْمُ الأَوَّلُ: نُقَدِّمُ لَهُ أَفْضَلَ ما عِنْدَنا. نَذْبَحُ الذَّبيحَةَ وَنَصْنَعُ أَشْهى الطَّعامِ. اليَوْمُ الثّاني: نُكْرِمُهُ كَأَنَّهُ مِنَ الأَهْلِ. اليَوْمُ الثّالِثُ: نَسْأَلُهُ عَنْ حاجَتِهِ. بَعْدَ ذَلِكَ، إِنْ بَقِيَ صارَ مِنَ البَيْتِ، وَإِنْ ذَهَبَ وَدَّعْناهُ بِالحُبِّ. هَكَذا كانَ العَرَبُ يَسْتَقْبِلونَ حَتّى الغُرَباءَ في الصَّحْراءِ.',
    translation: 'In Arab traditions, the guest has three days. Day one: we offer him the best we have. We slaughter the sacrifice and make the finest food. Day two: we honor him as if he\'s family. Day three: we ask about his need. After that, if he stays he becomes part of the household, and if he leaves we bid him farewell with love. Thus did Arabs welcome even strangers in the desert.',
    grammaticalConcepts: ['عدد', 'جملة شرطية', 'اسم تفضيل'],
    vocabularyHighlights: [
      { word: 'الذَّبيحَة', meaning: 'sacrifice, slaughtered animal' },
      { word: 'أَشْهى', meaning: 'finest, most delicious' },
      { word: 'نُكْرِم', meaning: 'we honor' },
      { word: 'وَدَّعْنا', meaning: 'we bid farewell' }
    ],
    moralLesson: 'Hospitality has structure that balances generosity and boundaries.',
    moralLessonAr: 'للضيافة هيكل يوازن بين الكرم والحدود.',
    wordCount: 70
  },
  {
    id: 'i175',
    title: 'Grandmother\'s Recipe',
    titleAr: 'وَصْفَةُ الجَدَّةِ',
    level: 'intermediate',
    category: 'food-hospitality',
    categoryAr: 'الطعام والضيافة',
    text: 'سَأَلْتُ جَدَّتي: كَيْفَ تَصْنَعينَ هَذا الطَّبَقَ اللَّذيذَ؟ قالَتْ: لَيْسَ هُناكَ وَصْفَةٌ مَكْتوبَةٌ! أَنْظُرُ إِلى اللَّحْمِ وَأَعْرِفُ ما يَحْتاجُ. أَشُمُّ التَّوابِلَ وَأُحِسُّ بِالمِقْدارِ. سَأَلْتُها: كَيْفَ تَعَلَّمْتِ؟ قالَتْ: وَقَفْتُ بِجانِبِ أُمّي سَنَواتٍ. راقَبْتُ يَدَيْها وَحَفِظْتُ حَرَكاتِها. الطَّبْخُ لا يُتَعَلَّمُ مِنَ الكُتُبِ، بَلْ مِنَ القَلْبِ إِلى القَلْبِ، وَمِنَ الجيلِ إِلى الجيلِ.',
    translation: 'I asked my grandmother: "How do you make this delicious dish?" She said: "There\'s no written recipe! I look at the meat and know what it needs. I smell the spices and feel the amount." I asked her: "How did you learn?" She said: "I stood beside my mother for years. I watched her hands and memorized her movements. Cooking isn\'t learned from books, but from heart to heart, and from generation to generation."',
    grammaticalConcepts: ['استفهام', 'نفي', 'مبني للمجهول'],
    vocabularyHighlights: [
      { word: 'وَصْفَة', meaning: 'recipe' },
      { word: 'المِقْدار', meaning: 'amount, quantity' },
      { word: 'راقَبْتُ', meaning: 'I watched' },
      { word: 'الجيل', meaning: 'generation' }
    ],
    moralLesson: 'Traditional knowledge passes through practice, not books.',
    moralLessonAr: 'المعرفة التقليدية تنتقل عبر الممارسة، لا الكتب.',
    wordCount: 68
  },
  {
    id: 'i176',
    title: 'The Street Food',
    titleAr: 'طَعامُ الشّارِعِ',
    level: 'intermediate',
    category: 'food-hospitality',
    categoryAr: 'الطعام والضيافة',
    text: 'في شَوارِعِ المَدينَةِ القَديمَةِ، الطَّعامُ في كُلِّ مَكانٍ. هُنا رَجُلٌ يَبيعُ الفولَ المُدَمَّسَ السّاخِنَ. هُناكَ امْرَأَةٌ تَقْلي الفَلافِلَ الذَّهَبِيَّةَ. عَرَباتٌ تَبيعُ الكُشَرِيَّ وَالطَّعْمِيَّةَ وَالشّاوِرْما. الدُّخانُ يَرْتَفِعُ وَالرَّوائِحُ تَخْتَلِطُ. الغَنِيُّ وَالفَقيرُ يَأْكُلونَ جَنْبًا إِلى جَنْبٍ. طَعامُ الشّارِعِ لا يَعْرِفُ الطَّبَقاتِ، فالجوعُ يُساوي بَيْنَ النّاسِ!',
    translation: 'In the old city\'s streets, food is everywhere. Here a man sells hot ful medames. There a woman fries golden falafel. Carts sell koshari, ta\'meya, and shawarma. Smoke rises and aromas mix. Rich and poor eat side by side. Street food knows no classes—hunger makes people equal!',
    grammaticalConcepts: ['ظرف مكان', 'جملة اسمية', 'نفي'],
    vocabularyHighlights: [
      { word: 'الفول المُدَمَّس', meaning: 'ful medames (fava beans)' },
      { word: 'الفَلافِل', meaning: 'falafel' },
      { word: 'الكُشَرِيّ', meaning: 'koshari' },
      { word: 'الطَّبَقات', meaning: 'classes, levels' }
    ],
    moralLesson: 'Street food creates democratic spaces where all are equal.',
    moralLessonAr: 'طعام الشارع يخلق مساحات ديمقراطية حيث الجميع متساوون.',
    wordCount: 64
  },
  {
    id: 'i177',
    title: 'The Empty Plate',
    titleAr: 'الصَّحْنُ الفارِغُ',
    level: 'intermediate',
    category: 'food-hospitality',
    categoryAr: 'الطعام والضيافة',
    text: 'في بَيْتِ الفَقيرِ، طَرَقَ ضَيْفٌ البابَ. لَمْ يَكُنْ هُناكَ طَعامٌ. قالَتِ الزَّوْجَةُ: ماذا نَفْعَلُ؟ قالَ الزَّوْجُ: أَطْفِئي الضَّوْءَ وَقَدِّمي الصَّحْنَ فارِغًا. جَلَسوا في الظَّلامِ يَتَظاهَرونَ بِالأَكْلِ. الضَّيْفُ لَمْ يَعْرِفْ. أَكَلَ الهَواءَ مَعَهُمْ! في الصَّباحِ عَرَفَ الحَقيقَةَ. بَكى وَقالَ: هَذا أَكْرَمُ بَيْتٍ! أَطْعَمْتُموني كَرامَتَكُمْ حينَ لَمْ يَكُنْ عِنْدَكُمْ شَيْءٌ!',
    translation: 'In the poor man\'s house, a guest knocked on the door. There was no food. The wife said: "What do we do?" The husband said: "Turn off the light and serve the plate empty." They sat in darkness pretending to eat. The guest didn\'t know. He ate air with them! In the morning he learned the truth. He cried and said: "This is the most generous house! You fed me your dignity when you had nothing!"',
    grammaticalConcepts: ['نفي', 'أمر', 'اسم تفضيل'],
    vocabularyHighlights: [
      { word: 'أَطْفِئي', meaning: 'turn off' },
      { word: 'يَتَظاهَرون', meaning: 'pretending' },
      { word: 'الكَرامَة', meaning: 'dignity' },
      { word: 'أَكْرَم', meaning: 'most generous' }
    ],
    moralLesson: 'True hospitality gives dignity, not just food.',
    moralLessonAr: 'الضيافة الحقيقية تعطي الكرامة، لا الطعام فقط.',
    wordCount: 72
  },

  // ===== ADVANCED (a167-a172) =====
  {
    id: 'a167',
    title: 'The Philosophy of the Table',
    titleAr: 'فَلْسَفَةُ المائِدَةِ',
    level: 'advanced',
    category: 'food-hospitality',
    categoryAr: 'الطعام والضيافة',
    text: 'المائِدَةُ لَيْسَتْ لِلْأَكْلِ فَقَطْ، بَلْ مِنْبَرٌ لِلْحَضارَةِ. عَلى المائِدَةِ تَظْهَرُ أَخْلاقُ الإِنْسانِ: كَيْفَ يَأْكُلُ، وَكَيْفَ يُشارِكُ، وَكَيْفَ يَشْكُرُ. العَرَبُ يَبْدَأونَ بِالبَسْمَلَةِ وَيَخْتِمونَ بِالحَمْدَلَةِ. يَأْكُلونَ بِاليَمينِ وَمِمّا يَليهِمْ. لا يَعيبونَ طَعامًا وَلا يُسْرِفونَ فيهِ. الأَكْلُ الجَماعِيُّ مِنْ صَحْنٍ واحِدٍ يُوَحِّدُ القُلوبَ وَيُزيلُ الفَوارِقَ. المائِدَةُ مَدْرَسَةٌ يَتَعَلَّمُ فيها الأَطْفالُ قِيَمَ المُشارَكَةِ وَالاحْتِرامِ وَالقَناعَةِ.',
    translation: 'The table isn\'t just for eating—it\'s a platform for civilization. At the table, a person\'s character appears: how he eats, shares, and thanks. Arabs begin with bismillah and end with alhamdulillah. They eat with the right hand and from what\'s near them. They don\'t criticize food or waste it. Communal eating from one plate unites hearts and removes differences. The table is a school where children learn values of sharing, respect, and contentment.',
    grammaticalConcepts: ['نفي واستدراك', 'استفهام', 'مصدر'],
    vocabularyHighlights: [
      { word: 'مِنْبَر', meaning: 'platform, pulpit' },
      { word: 'البَسْمَلَة', meaning: 'saying bismillah' },
      { word: 'الحَمْدَلَة', meaning: 'saying alhamdulillah' },
      { word: 'الفَوارِق', meaning: 'differences' }
    ],
    moralLesson: 'Dining etiquette reflects and teaches core values.',
    moralLessonAr: 'آداب الطعام تعكس وتعلم القيم الأساسية.',
    wordCount: 82
  },
  {
    id: 'a168',
    title: 'Hatim al-Ta\'i\'s Hospitality',
    titleAr: 'كَرَمُ حاتِمٍ الطّائِيِّ',
    level: 'advanced',
    category: 'food-hospitality',
    categoryAr: 'الطعام والضيافة',
    text: 'حاتِمٌ الطّائِيُّ أَشْهَرُ كَريمٍ في تاريخِ العَرَبِ. كانَ يُوقِدُ النّارَ عَلى الجَبَلِ لِيَهْتَدِيَ إِلَيْهِ الضُّيوفُ في الظَّلامِ. ذَبَحَ فَرَسَهُ المَحْبوبَ لِيُطْعِمَ ضَيْفًا جائِعًا. وَهَبَ كُلَّ مالِهِ حَتّى لَمْ يَبْقَ لَهُ شَيْءٌ. سَأَلَهُ قَوْمُهُ: لِماذا تُعْطي حَتّى تَجوعَ؟ قالَ: أَجوعُ يَوْمًا وَيَذْكُرُني التّاريخُ دَهْرًا. الكَرَمُ خُلودٌ، وَالبُخْلُ فَناءٌ. ماتَ حاتِمٌ فَقيرًا، لَكِنَّ اسْمَهُ صارَ رَمْزًا لِلْكَرَمِ إِلى اليَوْمِ.',
    translation: 'Hatim al-Ta\'i is the most famous generous man in Arab history. He would light fire on the mountain so guests could find their way in darkness. He slaughtered his beloved horse to feed a hungry guest. He gave away all his wealth until nothing remained. His people asked: "Why do you give until you starve?" He said: "I starve for a day and history remembers me for ages. Generosity is immortality, and miserliness is oblivion." Hatim died poor, but his name became a symbol of generosity to this day.',
    grammaticalConcepts: ['اسم تفضيل', 'تعليل', 'استدراك'],
    vocabularyHighlights: [
      { word: 'يُوقِد', meaning: 'lights (fire)' },
      { word: 'يَهْتَدي', meaning: 'finds the way' },
      { word: 'دَهْر', meaning: 'ages, eternity' },
      { word: 'خُلود', meaning: 'immortality' }
    ],
    moralLesson: 'Legendary generosity lives forever in memory.',
    moralLessonAr: 'الكرم الأسطوري يعيش إلى الأبد في الذاكرة.',
    wordCount: 86
  },
  {
    id: 'a169',
    title: 'The Caliph\'s Kitchen',
    titleAr: 'مَطْبَخُ الخَليفَةِ',
    level: 'advanced',
    category: 'food-hospitality',
    categoryAr: 'الطعام والضيافة',
    text: 'في بَغْدادَ العَبّاسِيَّةِ، كانَ مَطْبَخُ الخَليفَةِ مَدينَةً صَغيرَةً. مِئاتُ الطَّبّاخينَ مِنْ كُلِّ البِلادِ: فارِسِيّونَ وَهِنْدِيّونَ وَرومِيّونَ. وَصَفاتٌ سِرِّيَّةٌ تُوَرَّثُ بَيْنَ الأَجْيالِ. طَبَقاتٌ تَجْمَعُ بَيْنَ التَّوابِلِ الهِنْدِيَّةِ وَالأَعْشابِ الفارِسِيَّةِ وَالأَساليبِ البيزَنْطِيَّةِ. المائِدَةُ تَعْكِسُ إِمْبِراطورِيَّةً مُتَعَدِّدَةَ الثَّقافاتِ. الطَّعامُ كانَ سِياسَةً: مَنْ تَجْلِسُ مَعَهُ، وَماذا تُقَدِّمُ لَهُ، وَبِأَيِّ تَرْتيبٍ. المَطْبَخُ مَرْكَزُ قُوَّةٍ لا يَقِلُّ عَنِ الجَيْشِ!',
    translation: 'In Abbasid Baghdad, the caliph\'s kitchen was a small city. Hundreds of cooks from all lands: Persian, Indian, and Byzantine. Secret recipes passed between generations. Dishes combining Indian spices, Persian herbs, and Byzantine techniques. The table reflects a multicultural empire. Food was politics: who you sit with, what you serve them, in what order. The kitchen was a power center no less than the army!',
    grammaticalConcepts: ['عدد', 'صفة', 'مقارنة'],
    vocabularyHighlights: [
      { word: 'تُوَرَّث', meaning: 'is inherited' },
      { word: 'الأَعْشاب', meaning: 'herbs' },
      { word: 'إِمْبِراطورِيَّة', meaning: 'empire' },
      { word: 'مَرْكَز قُوَّة', meaning: 'power center' }
    ],
    moralLesson: 'Food in palaces was diplomacy on a plate.',
    moralLessonAr: 'الطعام في القصور كان دبلوماسية في صحن.',
    wordCount: 80
  },
  {
    id: 'a170',
    title: 'The Famine and the Feast',
    titleAr: 'المَجاعَةُ وَالوَليمَةُ',
    level: 'advanced',
    category: 'food-hospitality',
    categoryAr: 'الطعام والضيافة',
    text: 'في عامِ المَجاعَةِ، فَتَحَ رَجُلٌ غَنِيٌّ مَخازِنَهُ لِلْفُقَراءِ. وَزَّعَ الحُبوبَ وَالتَّمْرَ حَتّى نَفِدَ كُلُّ شَيْءٍ. جاءَهُ أَصْدِقاؤُهُ الأَغْنِياءُ وَلامُوهُ: أَفْقَرْتَ نَفْسَكَ! قالَ: لَمْ أُفْقِرْ نَفْسي، بَلْ أَغْنَيْتُها. المالُ الَّذي خَزَّنْتُهُ كانَ سَيَأْكُلُهُ العُثُّ وَالسّوسُ. المالُ الَّذي وَزَّعْتُهُ صارَ حُبًّا في قُلوبِ الآلافِ. أَيُّهُما أَبْقى: ذَهَبٌ صَدِئٌ في صُنْدوقٍ، أَمْ دُعاءٌ في كُلِّ بَيْتٍ؟ مَرَّتِ المَجاعَةُ، وَصارَ هَذا الرَّجُلُ أَغْنى النّاسِ بِالمَحَبَّةِ.',
    translation: 'In the year of famine, a wealthy man opened his stores to the poor. He distributed grain and dates until everything was gone. His rich friends came and blamed him: "You\'ve impoverished yourself!" He said: "I didn\'t impoverish myself—I enriched it. The wealth I stored would have been eaten by moths and weevils. The wealth I distributed became love in thousands of hearts. Which lasts longer: rusty gold in a box, or prayers in every home?" The famine passed, and this man became the richest in love.',
    grammaticalConcepts: ['نفي', 'استفهام', 'اسم تفضيل'],
    vocabularyHighlights: [
      { word: 'المَخازِن', meaning: 'stores, warehouses' },
      { word: 'نَفِدَ', meaning: 'ran out' },
      { word: 'العُثّ', meaning: 'moths' },
      { word: 'السّوس', meaning: 'weevils' }
    ],
    moralLesson: 'Generosity in crisis creates lasting wealth of gratitude.',
    moralLessonAr: 'الكرم في الأزمات يخلق ثروة دائمة من الامتنان.',
    wordCount: 88
  },
  {
    id: 'a171',
    title: 'The Last Supper of al-Mutanabbi',
    titleAr: 'عَشاءُ المُتَنَبّي الأَخيرُ',
    level: 'advanced',
    category: 'food-hospitality',
    categoryAr: 'الطعام والضيافة',
    text: 'قَبْلَ مَقْتَلِهِ بِلَيْلَةٍ، دُعِيَ المُتَنَبّي إِلى مَأْدُبَةٍ. جَلَسَ بَيْنَ الشُّعَراءِ وَالأُمَراءِ. قُدِّمَتِ الأَطْباقُ الفاخِرَةُ، لَكِنَّهُ لَمْ يَأْكُلْ إِلّا قَليلًا. سَأَلوهُ: أَلَيْسَ الطَّعامُ لَذيذًا؟ قالَ: الطَّعامُ لَذيذٌ، لَكِنَّ قَلْبي مَشْغولٌ بِما هُوَ آتٍ. مَنْ يَعْلَمُ أَيُّ عَشاءٍ هُوَ الأَخيرُ؟ ضَحِكوا وَظَنّوهُ يَمْزَحُ. في الغَدِ قُتِلَ في الطَّريقِ. صارَتْ تِلْكَ اللَّيْلَةُ مَثَلًا: كُلْ كَأَنَّهُ عَشاؤُكَ الأَخيرُ، وَعِشْ كَأَنَّكَ تَعيشُ أَبَدًا.',
    translation: 'The night before his death, al-Mutanabbi was invited to a banquet. He sat among poets and princes. Lavish dishes were served, but he ate only a little. They asked: "Isn\'t the food delicious?" He said: "The food is delicious, but my heart is occupied with what\'s coming. Who knows which supper is the last?" They laughed, thinking he joked. The next day he was killed on the road. That night became a proverb: Eat as if it\'s your last supper, and live as if you live forever.',
    grammaticalConcepts: ['استفهام', 'استدراك', 'أمر'],
    vocabularyHighlights: [
      { word: 'مَأْدُبَة', meaning: 'banquet, feast' },
      { word: 'الفاخِرَة', meaning: 'lavish, luxurious' },
      { word: 'مَشْغول', meaning: 'occupied, preoccupied' },
      { word: 'مَثَل', meaning: 'proverb, example' }
    ],
    moralLesson: 'Every meal could be the last—savor it fully.',
    moralLessonAr: 'كل وجبة قد تكون الأخيرة - استمتع بها كاملة.',
    wordCount: 84
  },
  {
    id: 'a172',
    title: 'The Ethics of Eating',
    titleAr: 'أَخْلاقِيّاتُ الأَكْلِ',
    level: 'advanced',
    category: 'food-hospitality',
    categoryAr: 'الطعام والضيافة',
    text: 'كَتَبَ الغَزالِيُّ في آدابِ الأَكْلِ فُصولًا عَميقَةً. قالَ: الأَكْلُ عِبادَةٌ إِنْ صَحَّتِ النِّيَّةُ. كُلْ لِتَقْوى عَلى العِبادَةِ، لا لِتَتَلَذَّذَ فَقَطْ. لا تَمْلَأِ البَطْنَ كُلَّهُ، بَلْ ثُلُثًا لِلطَّعامِ وَثُلُثًا لِلشَّرابِ وَثُلُثًا لِلنَّفَسِ. لا تَنْظُرْ إِلى طَعامِ غَيْرِكَ. لا تَعِبْ ما قُدِّمَ لَكَ. إِنْ أَحْبَبْتَهُ أَكَلْتَهُ، وَإِنْ كَرِهْتَهُ سَكَتَّ. الحَلالُ ما طابَ مَصْدَرُهُ وَطابَ أَثَرُهُ. الطَّعامُ النَّظيفُ يُنَقّي الجَسَدَ، وَالمالُ الحَلالُ يُنَقّي الرُّوحَ.',
    translation: 'Al-Ghazali wrote deep chapters on eating etiquette. He said: Eating is worship if the intention is sound. Eat to gain strength for worship, not just for pleasure. Don\'t fill the whole stomach—a third for food, a third for drink, and a third for breath. Don\'t look at others\' food. Don\'t criticize what\'s served to you. If you like it, eat it; if you dislike it, stay silent. Halal is what\'s pure in source and pure in effect. Clean food purifies the body, and lawful wealth purifies the soul.',
    grammaticalConcepts: ['شرط', 'نهي', 'عدد'],
    vocabularyHighlights: [
      { word: 'النِّيَّة', meaning: 'intention' },
      { word: 'تَتَلَذَّذ', meaning: 'enjoy, take pleasure' },
      { word: 'ثُلُث', meaning: 'third' },
      { word: 'الحَلال', meaning: 'lawful, halal' }
    ],
    moralLesson: 'Eating with intention transforms consumption into worship.',
    moralLessonAr: 'الأكل بنية يحول الاستهلاك إلى عبادة.',
    wordCount: 90
  }
];
