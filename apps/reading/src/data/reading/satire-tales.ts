// src/data/reading/satire-tales.ts

import { ReadingText } from './types';

/**
 * Satire Tales reading texts
 * Topics: social satire, court mockery, merchant tales, intellectual pretensions
 * 18 texts: 6 beginner, 6 intermediate, 6 advanced
 */
export const satireTalesTexts: ReadingText[] = [
  // ===== BEGINNER (b169-b174) =====
  {
    id: 'b169',
    title: 'The Deaf Judge',
    titleAr: 'القاضي الأَصَمُّ',
    level: 'beginner',
    category: 'humor-satire',
    categoryAr: 'الفكاهة والسخرية',
    text: 'كانَ القاضي أَصَمَّ لَكِنَّهُ يُخْفي ذَلِكَ. جاءَهُ رَجُلٌ يَشْكو جارَهُ: سَرَقَ دَجاجَتي! فَهِمَ القاضي: أَخَذَ ناقَتي. قالَ لِلْجارِ: رُدَّ الناقَةَ! قالَ الجارُ: لَكِنَّها دَجاجَةٌ! قالَ القاضي: أَعْرِفُ أَنَّها عَرْجاءُ، لَكِنْ رُدَّها! خَرَجَ الرَّجُلانِ حائِرَيْنِ. قالَ أَحَدُهُما: القاضي مَجْنونٌ! قالَ الآخَرُ: لا، هُوَ حَكيمٌ! نَحْنُ لا نَفْهَمُ حِكْمَتَهُ!',
    translation: 'The judge was deaf but hid it. A man came complaining about his neighbor: "He stole my chicken!" The judge understood: "He took my camel." He told the neighbor: "Return the camel!" The neighbor said: "But it\'s a chicken!" The judge said: "I know it\'s lame, but return it!" The two men left confused. One said: "The judge is crazy!" The other said: "No, he\'s wise! We don\'t understand his wisdom!"',
    grammaticalConcepts: ['استدراك', 'أمر', 'جملة حالية'],
    vocabularyHighlights: [
      { word: 'أَصَمّ', meaning: 'deaf' },
      { word: 'دَجاجَة', meaning: 'chicken' },
      { word: 'ناقَة', meaning: 'she-camel' },
      { word: 'عَرْجاء', meaning: 'lame' }
    ],
    moralLesson: 'People often see wisdom where there is only confusion.',
    moralLessonAr: 'كثيرًا ما يرى الناس حكمة حيث لا يوجد سوى الارتباك.',
    wordCount: 58
  },
  {
    id: 'b170',
    title: 'The Doctor\'s Medicine',
    titleAr: 'دَواءُ الطَّبيبِ',
    level: 'beginner',
    category: 'humor-satire',
    categoryAr: 'الفكاهة والسخرية',
    text: 'ذَهَبَ مَريضٌ إِلى طَبيبٍ مَشْهورٍ. قالَ: أَشْعُرُ بِأَلَمٍ في كُلِّ مَكانٍ! فَحَصَهُ الطَّبيبُ وَقالَ: خُذْ هَذا الدَّواءَ. سَأَلَ المَريضُ: ما هَذا؟ قالَ: لا أَعْرِفُ، لَكِنَّهُ غالٍ جِدًّا! إِذا لَمْ يَشْفِكَ، فَعَلى الأَقَلِّ سَتَشْعُرُ أَنَّكَ دَفَعْتَ ما يَكْفي! دَفَعَ المَريضُ وَخَرَجَ. في الطَّريقِ رَمى الدَّواءَ وَشَعَرَ بِالتَّحَسُّنِ!',
    translation: 'A sick man went to a famous doctor. He said: "I feel pain everywhere!" The doctor examined him and said: "Take this medicine." The patient asked: "What is this?" He said: "I don\'t know, but it\'s very expensive! If it doesn\'t cure you, at least you\'ll feel you paid enough!" The patient paid and left. On the way, he threw the medicine away and felt better!',
    grammaticalConcepts: ['أمر', 'شرط', 'ظرف مكان'],
    vocabularyHighlights: [
      { word: 'مَشْهور', meaning: 'famous' },
      { word: 'غالٍ', meaning: 'expensive' },
      { word: 'يَشْفي', meaning: 'cures' },
      { word: 'التَّحَسُّن', meaning: 'improvement' }
    ],
    moralLesson: 'Expensive doesn\'t mean effective.',
    moralLessonAr: 'الغالي لا يعني الفعّال.',
    wordCount: 52
  },
  {
    id: 'b171',
    title: 'The Lazy Student',
    titleAr: 'الطّالِبُ الكَسولُ',
    level: 'beginner',
    category: 'humor-satire',
    categoryAr: 'الفكاهة والسخرية',
    text: 'سَأَلَ المُعَلِّمُ: مَنْ فَتَحَ الأَنْدَلُسَ؟ سَكَتَ الطّالِبُ. قالَ المُعَلِّمُ غاضِبًا: أَجِبْ! قالَ الطّالِبُ: لَمْ أَفْتَحْها يا أُسْتاذُ! فَتَّشوا غَيْري! ضَحِكَ الصَّفُّ. سَأَلَ المُعَلِّمُ: وَمَنْ بَنى الأَهْرامَ؟ قالَ: لا أَعْرِفُ، لَكِنْ لَيْسَ أَنا! سَأَلَهُ أَبوهُ في البَيْتِ: ماذا تَعَلَّمْتَ اليَوْمَ؟ قالَ: تَعَلَّمْتُ أَنَّ المُعَلِّمَ يَتَّهِمُني بِأَشْياءَ لَمْ أَفْعَلْها!',
    translation: 'The teacher asked: "Who conquered Andalusia?" The student stayed silent. The teacher said angrily: "Answer!" The student said: "I didn\'t conquer it, teacher! Search someone else!" The class laughed. The teacher asked: "And who built the pyramids?" He said: "I don\'t know, but it wasn\'t me!" His father asked at home: "What did you learn today?" He said: "I learned that the teacher accuses me of things I didn\'t do!"',
    grammaticalConcepts: ['استفهام', 'نفي', 'أمر'],
    vocabularyHighlights: [
      { word: 'الكَسول', meaning: 'lazy' },
      { word: 'فَتَحَ', meaning: 'conquered, opened' },
      { word: 'الأَهْرام', meaning: 'pyramids' },
      { word: 'يَتَّهِم', meaning: 'accuses' }
    ],
    moralLesson: 'Ignorance sometimes produces unintentional comedy.',
    moralLessonAr: 'الجهل أحيانًا ينتج كوميديا غير مقصودة.',
    wordCount: 56
  },
  {
    id: 'b172',
    title: 'The Merchant\'s Honesty',
    titleAr: 'أَمانَةُ التّاجِرِ',
    level: 'beginner',
    category: 'humor-satire',
    categoryAr: 'الفكاهة والسخرية',
    text: 'عَلَّقَ تاجِرٌ لافِتَةً: هُنا الصِّدْقُ وَالأَمانَةُ! دَخَلَ زَبونٌ وَسَأَلَ عَنْ ثَوْبٍ. قالَ التّاجِرُ: عَشَرَةُ دَنانيرَ. قالَ الزَّبونُ: غالٍ جِدًّا! قالَ التّاجِرُ: حَسَنًا، ثَمانِيَةٌ لِأَنَّكَ صَديقٌ. قالَ: لَكِنَّني لا أَعْرِفُكَ! قالَ: سِتَّةٌ لِأَنَّكَ طَيِّبٌ. قالَ: لَكِنَّكَ لا تَعْرِفُني! قالَ: أَرْبَعَةٌ وَهَذا سِعْرُ التَّكْلِفَةِ! قالَ الزَّبونُ: وَأَيْنَ الصِّدْقُ؟ قالَ التّاجِرُ: الصِّدْقُ في اللّافِتَةِ فَقَطْ!',
    translation: 'A merchant hung a sign: "Here is honesty and trustworthiness!" A customer entered and asked about a garment. The merchant said: "Ten dinars." The customer said: "Too expensive!" The merchant said: "Fine, eight because you\'re a friend." He said: "But I don\'t know you!" He said: "Six because you\'re kind." He said: "But you don\'t know me!" He said: "Four, and that\'s the cost price!" The customer said: "And where\'s the honesty?" The merchant said: "The honesty is only on the sign!"',
    grammaticalConcepts: ['عدد', 'تعليل', 'استفهام'],
    vocabularyHighlights: [
      { word: 'لافِتَة', meaning: 'sign' },
      { word: 'الصِّدْق', meaning: 'honesty' },
      { word: 'الأَمانَة', meaning: 'trustworthiness' },
      { word: 'التَّكْلِفَة', meaning: 'cost' }
    ],
    moralLesson: 'Words on signs don\'t guarantee words in practice.',
    moralLessonAr: 'الكلمات على اللافتات لا تضمن الكلمات في الممارسة.',
    wordCount: 62
  },
  {
    id: 'b173',
    title: 'The Expert\'s Advice',
    titleAr: 'نَصيحَةُ الخَبيرِ',
    level: 'beginner',
    category: 'humor-satire',
    categoryAr: 'الفكاهة والسخرية',
    text: 'سَأَلَ فَلّاحٌ خَبيرًا: كَيْفَ أَزيدُ مَحْصولي؟ قالَ الخَبيرُ: اسْتَخْدِمْ تِقْنِيّاتٍ حَديثَةً! قالَ الفَلّاحُ: مِثْلَ ماذا؟ قالَ: لا أَعْرِفُ، أَنا خَبيرٌ نَظَرِيٌّ! قالَ الفَلّاحُ: وَما الفَرْقُ؟ قالَ الخَبيرُ: أَنا أَتَكَلَّمُ وَأَنْتَ تَعْمَلُ. أَنا آخُذُ المالَ وَأَنْتَ تَأْخُذُ النَّصيحَةَ. قالَ الفَلّاحُ: وَإِذا فَشِلَتِ النَّصيحَةُ؟ قالَ الخَبيرُ: أُعْطيكَ نَصيحَةً جَديدَةً بِسِعْرٍ جَديدٍ!',
    translation: 'A farmer asked an expert: "How do I increase my harvest?" The expert said: "Use modern techniques!" The farmer said: "Like what?" He said: "I don\'t know, I\'m a theoretical expert!" The farmer said: "And what\'s the difference?" The expert said: "I talk and you work. I take the money and you take the advice." The farmer said: "And if the advice fails?" The expert said: "I give you new advice at a new price!"',
    grammaticalConcepts: ['استفهام', 'أمر', 'شرط'],
    vocabularyHighlights: [
      { word: 'فَلّاح', meaning: 'farmer' },
      { word: 'مَحْصول', meaning: 'harvest, crop' },
      { word: 'تِقْنِيّات', meaning: 'techniques' },
      { word: 'نَظَرِيّ', meaning: 'theoretical' }
    ],
    moralLesson: 'Theory without practice is just expensive talk.',
    moralLessonAr: 'النظرية بدون ممارسة مجرد كلام مكلف.',
    wordCount: 58
  },
  {
    id: 'b174',
    title: 'The Weather Prophet',
    titleAr: 'نَبِيُّ الطَّقْسِ',
    level: 'beginner',
    category: 'humor-satire',
    categoryAr: 'الفكاهة والسخرية',
    text: 'ادَّعى رَجُلٌ أَنَّهُ يَعْرِفُ الطَّقْسَ. سَأَلَهُ النّاسُ: هَلْ سَتُمْطِرُ غَدًا؟ قالَ: نَعَمْ! لَمْ تُمْطِرْ. سَأَلوهُ ثانِيَةً: هَلْ سَيَكونُ الجَوُّ حارًّا؟ قالَ: لا! كانَ حارًّا جِدًّا. قالوا لَهُ: أَنْتَ تُخْطِئُ دائِمًا! قالَ: هَذا يَعْني أَنَّني أَعْرِفُ الطَّقْسَ! فَقَطْ اعْكِسوا ما أَقولُ! أَصْبَحَ مَشْهورًا، وَصارَ النّاسُ يَسْأَلونَهُ لِيَعْرِفوا العَكْسَ!',
    translation: 'A man claimed he knew the weather. People asked: "Will it rain tomorrow?" He said: "Yes!" It didn\'t rain. They asked again: "Will it be hot?" He said: "No!" It was very hot. They told him: "You\'re always wrong!" He said: "That means I know the weather! Just reverse what I say!" He became famous, and people would ask him to know the opposite!',
    grammaticalConcepts: ['استفهام', 'نفي', 'أمر'],
    vocabularyHighlights: [
      { word: 'ادَّعى', meaning: 'claimed' },
      { word: 'الطَّقْس', meaning: 'weather' },
      { word: 'تُمْطِر', meaning: 'rains' },
      { word: 'اعْكِسوا', meaning: 'reverse' }
    ],
    moralLesson: 'Even consistent failure can become a useful pattern.',
    moralLessonAr: 'حتى الفشل المستمر يمكن أن يصبح نمطًا مفيدًا.',
    wordCount: 54
  },

  // ===== INTERMEDIATE (i160-i165) =====
  {
    id: 'i160',
    title: 'The Royal Astrologer',
    titleAr: 'مُنَجِّمُ المَلِكِ',
    level: 'intermediate',
    category: 'humor-satire',
    categoryAr: 'الفكاهة والسخرية',
    text: 'كانَ لِلْمَلِكِ مُنَجِّمٌ يَتَنَبَّأُ بِكُلِّ شَيْءٍ. قالَ يَوْمًا: سَتَموتُ بَعْدَ وَفاةِ مُنَجِّمِكَ بِيَوْمٍ واحِدٍ! خافَ المَلِكُ وَأَحاطَ المُنَجِّمَ بِالحُرّاسِ لِيَحْميَهُ. صارَ المُنَجِّمُ يَعيشُ كَالأَميرِ. بَعْدَ سَنَواتٍ اكْتَشَفَ المَلِكُ الحيلَةَ. قالَ لِلْمُنَجِّمِ: إِذَنْ مَتى سَتَموتُ أَنْتَ؟ قالَ المُنَجِّمُ مُرْتَجِفًا: لا أَعْرِفُ... النُّجومُ لا تُخْبِرُني عَنْ نَفْسي! ضَحِكَ المَلِكُ: عَجيبٌ! تَعْرِفُ مَوْتَ المَلِكِ وَلا تَعْرِفُ مَوْتَكَ؟ اذْهَبْ قَبْلَ أَنْ أُريكَ مَوْعِدَ مَوْتِكَ الآنَ!',
    translation: 'The king had an astrologer who predicted everything. One day he said: "You will die one day after your astrologer dies!" The king feared and surrounded the astrologer with guards to protect him. The astrologer lived like a prince. Years later, the king discovered the trick. He told the astrologer: "So when will you die?" The astrologer said trembling: "I don\'t know... the stars don\'t tell me about myself!" The king laughed: "Strange! You know the king\'s death but not your own? Leave before I show you your death date now!"',
    grammaticalConcepts: ['جملة شرطية', 'استفهام', 'تعجب'],
    vocabularyHighlights: [
      { word: 'مُنَجِّم', meaning: 'astrologer' },
      { word: 'يَتَنَبَّأ', meaning: 'predicts, prophesies' },
      { word: 'الحيلَة', meaning: 'trick' },
      { word: 'مُرْتَجِف', meaning: 'trembling' }
    ],
    moralLesson: 'Frauds construct elaborate schemes for their own benefit.',
    moralLessonAr: 'المحتالون يبنون مخططات معقدة لمصلحتهم.',
    wordCount: 72
  },
  {
    id: 'i161',
    title: 'The Sleeping Minister',
    titleAr: 'الوَزيرُ النّائِمُ',
    level: 'intermediate',
    category: 'humor-satire',
    categoryAr: 'الفكاهة والسخرية',
    text: 'كانَ وَزيرٌ يَنامُ في كُلِّ اجْتِماعٍ. سَأَلَهُ المَلِكُ: لِماذا تَنامُ وَنَحْنُ نُناقِشُ أُمورَ الدَّوْلَةِ؟ قالَ الوَزيرُ: يا مَوْلايَ، أَنامُ لِأَحْلُمَ بِحُلولٍ لِمَشاكِلِنا! قالَ المَلِكُ: وَهَلْ وَجَدْتَ حَلًّا؟ قالَ: نَعَمْ! حَلِمْتُ أَنَّكَ أَعْطَيْتَني ضِعْفَ راتِبي! ضَحِكَ المَلِكُ: هَذا حُلْمٌ جَميلٌ. لَكِنْ أَنا أَيْضًا حَلِمْتُ أَنَّني طَرَدْتُكَ! أَيُّ الحُلْمَيْنِ نُحَقِّقُ أَوَّلًا؟ اسْتَيْقَظَ الوَزيرُ فَجْأَةً وَلَمْ يَنَمْ بَعْدَها في أَيِّ اجْتِماعٍ!',
    translation: 'A minister used to sleep in every meeting. The king asked him: "Why do you sleep while we discuss state affairs?" The minister said: "My lord, I sleep to dream of solutions to our problems!" The king said: "And did you find a solution?" He said: "Yes! I dreamed you gave me double my salary!" The king laughed: "That\'s a nice dream. But I also dreamed I fired you! Which dream shall we fulfill first?" The minister suddenly woke up and never slept in any meeting after that!',
    grammaticalConcepts: ['استفهام', 'تعليل', 'اسم تفضيل'],
    vocabularyHighlights: [
      { word: 'الوَزير', meaning: 'minister' },
      { word: 'اجْتِماع', meaning: 'meeting' },
      { word: 'راتِب', meaning: 'salary' },
      { word: 'طَرَدَ', meaning: 'fired, expelled' }
    ],
    moralLesson: 'Self-interest wakes people faster than duty.',
    moralLessonAr: 'المصلحة الذاتية توقظ الناس أسرع من الواجب.',
    wordCount: 70
  },
  {
    id: 'i162',
    title: 'The Critic\'s Masterpiece',
    titleAr: 'تُحْفَةُ النّاقِدِ',
    level: 'intermediate',
    category: 'humor-satire',
    categoryAr: 'الفكاهة والسخرية',
    text: 'كانَ ناقِدٌ يَنْتَقِدُ كُلَّ الشُّعَراءِ بِقَسْوَةٍ. قالَ لِشاعِرٍ: قَصيدَتُكَ ضَعيفَةٌ! قالَ لِآخَرَ: كَلامُكَ فارِغٌ! قالَ لِثالِثٍ: أَنْتَ لَسْتَ شاعِرًا! طَلَبوا مِنْهُ أَنْ يَكْتُبَ قَصيدَةً لِيُرِيَهُمْ كَيْفَ تَكونُ الشِّعْرُ الحَقيقِيُّ. حاوَلَ وَفَشِلَ. حاوَلَ ثانِيَةً وَفَشِلَ. قالَ أَخيرًا: أَنا ناقِدٌ لا شاعِرٌ! وَظيفَتي أَنْ أَجِدَ الأَخْطاءَ، لا أَنْ أَصْنَعَ الجَمالَ! قالَ شاعِرٌ: عَجيبٌ! مَنْ لا يَسْتَطيعُ البِناءَ يُجيدُ الهَدْمَ!',
    translation: 'A critic harshly criticized all poets. He told one poet: "Your poem is weak!" He told another: "Your words are empty!" He told a third: "You\'re not a poet!" They asked him to write a poem to show them what real poetry is. He tried and failed. He tried again and failed. He finally said: "I\'m a critic, not a poet! My job is to find errors, not to create beauty!" A poet said: "Strange! One who cannot build excels at demolishing!"',
    grammaticalConcepts: ['نفي', 'أمر', 'تعجب'],
    vocabularyHighlights: [
      { word: 'ناقِد', meaning: 'critic' },
      { word: 'يَنْتَقِد', meaning: 'criticizes' },
      { word: 'قَسْوَة', meaning: 'harshness' },
      { word: 'الهَدْم', meaning: 'demolishing' }
    ],
    moralLesson: 'Critics rarely create what they so easily destroy.',
    moralLessonAr: 'النقاد نادرًا ما يخلقون ما يهدمونه بسهولة.',
    wordCount: 68
  },
  {
    id: 'i163',
    title: 'The Generous Miser',
    titleAr: 'البَخيلُ الكَريمُ',
    level: 'intermediate',
    category: 'humor-satire',
    categoryAr: 'الفكاهة والسخرية',
    text: 'قَرَّرَ بَخيلٌ مَشْهورٌ أَنْ يُغَيِّرَ سُمْعَتَهُ. أَعْلَنَ أَنَّهُ سَيُقيمُ وَليمَةً كَبيرَةً. جاءَ النّاسُ فَوَجَدوا طَعامًا قَليلًا في صُحونٍ ضَخْمَةٍ. سَأَلوهُ: أَيْنَ الوَليمَةُ الكَبيرَةُ؟ قالَ: انْظُروا إِلى حَجْمِ الصُّحونِ! هَذِهِ أَكْبَرُ صُحونٍ في المَدينَةِ! قالوا: لَكِنَّ الطَّعامَ قَليلٌ! قالَ: قُلْتُ وَليمَةٌ كَبيرَةٌ، وَلَمْ أَقُلْ طَعامٌ كَثيرٌ! خَرَجوا جائِعينَ، وَخَرَجَ هُوَ سَعيدًا بِتَوْفيرِ المالِ!',
    translation: 'A famous miser decided to change his reputation. He announced he would hold a great feast. People came and found little food in huge plates. They asked: "Where\'s the great feast?" He said: "Look at the size of the plates! These are the biggest plates in the city!" They said: "But the food is little!" He said: "I said a great feast, I didn\'t say lots of food!" They left hungry, and he left happy with saving money!',
    grammaticalConcepts: ['صفة', 'استفهام', 'نفي'],
    vocabularyHighlights: [
      { word: 'سُمْعَة', meaning: 'reputation' },
      { word: 'وَليمَة', meaning: 'feast, banquet' },
      { word: 'ضَخْم', meaning: 'huge' },
      { word: 'تَوْفير', meaning: 'saving' }
    ],
    moralLesson: 'The miser finds loopholes even in generosity.',
    moralLessonAr: 'البخيل يجد ثغرات حتى في الكرم.',
    wordCount: 66
  },
  {
    id: 'i164',
    title: 'The Boasting Traveler',
    titleAr: 'المُسافِرُ المُتَفاخِرُ',
    level: 'intermediate',
    category: 'humor-satire',
    categoryAr: 'الفكاهة والسخرية',
    text: 'عادَ مُسافِرٌ مِنْ رِحْلَةٍ وَبَدَأَ يَتَفاخَرُ: رَأَيْتُ جَبَلًا يَصِلُ إِلى السَّماءِ! وَنَهْرًا عَرْضُهُ أَلْفُ ميلٍ! وَطَيْرًا يَحْمِلُ فيلًا! سَأَلَهُ صَديقُهُ: وَماذا رَأَيْتَ أَيْضًا؟ قالَ: رَأَيْتُ مَدينَةً كُلُّ سُكّانِها صادِقونَ! ضَحِكَ الصَّديقُ: هَذِهِ أَكْبَرُ كَذْبَةٍ! لا تُوجَدُ مَدينَةٌ كَذَلِكَ! قالَ المُسافِرُ: صَحيحٌ! لِذَلِكَ لَمْ يَقْبَلوني فيها!',
    translation: 'A traveler returned from a trip and started boasting: "I saw a mountain reaching the sky! A river a thousand miles wide! A bird carrying an elephant!" His friend asked: "What else did you see?" He said: "I saw a city where all inhabitants are honest!" The friend laughed: "That\'s the biggest lie! No such city exists!" The traveler said: "True! That\'s why they didn\'t accept me there!"',
    grammaticalConcepts: ['عدد', 'صفة', 'تعجب'],
    vocabularyHighlights: [
      { word: 'يَتَفاخَر', meaning: 'boasts' },
      { word: 'عَرْض', meaning: 'width' },
      { word: 'سُكّان', meaning: 'inhabitants' },
      { word: 'كَذْبَة', meaning: 'lie' }
    ],
    moralLesson: 'The liar\'s own words expose him.',
    moralLessonAr: 'كلمات الكاذب نفسها تفضحه.',
    wordCount: 60
  },
  {
    id: 'i165',
    title: 'The Complaining Rich Man',
    titleAr: 'الغَنِيُّ الشّاكي',
    level: 'intermediate',
    category: 'humor-satire',
    categoryAr: 'الفكاهة والسخرية',
    text: 'جَلَسَ غَنِيٌّ يَشْكو: الحَياةُ صَعْبَةٌ! عِنْدي عَشْرُ خَدَمٍ وَلا يَكْفونَ! قَصْري صَغيرٌ، فيهِ خَمْسونَ غُرْفَةً فَقَطْ! طَعامي مُمِلٌّ، آكُلُ لَحْمًا كُلَّ يَوْمٍ! سَمِعَهُ فَقيرٌ وَقالَ: يا سَيِّدي، أَنا لا أَمْلِكُ بَيْتًا، وَآكُلُ مَرَّةً في اليَوْمِ إِذا وَجَدْتُ. قالَ الغَنِيُّ: هَذِهِ مُشْكِلَتُكَ! أَنا أَتَكَلَّمُ عَنْ مُشْكِلاتي! ثُمَّ نادى خادِمَهُ: أَبْعِدْ هَذا الفَقيرَ! يُزْعِجُني بِحَديثِهِ عَنِ الجوعِ!',
    translation: 'A rich man sat complaining: "Life is hard! I have ten servants and they\'re not enough! My palace is small, it has only fifty rooms! My food is boring, I eat meat every day!" A poor man heard him and said: "Sir, I don\'t have a house, and I eat once a day if I find food." The rich man said: "That\'s your problem! I\'m talking about my problems!" Then he called his servant: "Remove this poor man! He bothers me with his talk about hunger!"',
    grammaticalConcepts: ['عدد', 'نفي', 'أمر'],
    vocabularyHighlights: [
      { word: 'خَدَم', meaning: 'servants' },
      { word: 'قَصْر', meaning: 'palace' },
      { word: 'مُمِلّ', meaning: 'boring' },
      { word: 'يُزْعِج', meaning: 'bothers, annoys' }
    ],
    moralLesson: 'Privilege blinds people to real suffering.',
    moralLessonAr: 'الامتياز يعمي الناس عن المعاناة الحقيقية.',
    wordCount: 68
  },

  // ===== ADVANCED (a155-a160) =====
  {
    id: 'a155',
    title: 'The Committee of Experts',
    titleAr: 'لَجْنَةُ الخُبَراءِ',
    level: 'advanced',
    category: 'humor-satire',
    categoryAr: 'الفكاهة والسخرية',
    text: 'شَكا النّاسُ مِنْ مُشْكِلَةٍ بَسيطَةٍ: الطَّريقُ بِهِ حُفْرَةٌ. شَكَّلَ الوالي لَجْنَةً مِنْ عَشَرَةِ خُبَراءَ. اجْتَمَعوا سَنَةً كامِلَةً لِدِراسَةِ الحُفْرَةِ. كَتَبوا تَقْريرًا مِنْ مِئَةِ صَفْحَةٍ عَنْ تاريخِ الحُفْرَةِ وَأَسْبابِها وَتَأْثيرِها عَلى المُجْتَمَعِ. طَلَبوا ميزانِيَّةً ضَخْمَةً لِمَزيدٍ مِنَ الدِّراسَةِ. في هَذِهِ الأَثْناءِ، جاءَ فَلّاحٌ بِعَرَبَةِ تُرابٍ وَمَلَأَ الحُفْرَةَ في ساعَةٍ. سَأَلَهُ الخُبَراءُ غاضِبينَ: كَيْفَ تَجْرُؤُ عَلى حَلِّ المُشْكِلَةِ بِدونِ دِراسَةٍ؟! قالَ: لَوِ انْتَظَرْتُ دِراسَتَكُمْ، لَماتَ حِماري في الحُفْرَةِ!',
    translation: 'People complained of a simple problem: the road has a pothole. The governor formed a committee of ten experts. They met for a full year to study the pothole. They wrote a hundred-page report about the pothole\'s history, causes, and impact on society. They requested a huge budget for more study. Meanwhile, a farmer came with a cart of dirt and filled the pothole in an hour. The angry experts asked: "How dare you solve the problem without a study?!" He said: "If I waited for your study, my donkey would have died in the pothole!"',
    grammaticalConcepts: ['عدد', 'جملة شرطية', 'مصدر'],
    vocabularyHighlights: [
      { word: 'لَجْنَة', meaning: 'committee' },
      { word: 'حُفْرَة', meaning: 'pothole, hole' },
      { word: 'تَقْرير', meaning: 'report' },
      { word: 'ميزانِيَّة', meaning: 'budget' }
    ],
    moralLesson: 'Bureaucracy turns simple solutions into eternal problems.',
    moralLessonAr: 'البيروقراطية تحول الحلول البسيطة إلى مشاكل أبدية.',
    wordCount: 85
  },
  {
    id: 'a156',
    title: 'The Honest Politician',
    titleAr: 'السِّياسِيُّ الصّادِقُ',
    level: 'advanced',
    category: 'humor-satire',
    categoryAr: 'الفكاهة والسخرية',
    text: 'قَرَّرَ سِياسِيٌّ أَنْ يَكونَ صادِقًا لِيَوْمٍ واحِدٍ. سَأَلَهُ مُواطِنٌ: هَلْ سَتُصْلِحُ الطُّرُقَ؟ قالَ: لا، سَأَسْرِقُ المالَ المُخَصَّصَ لَها. سَأَلَ آخَرُ: هَلْ سَتُخَفِّضُ الضَّرائِبَ؟ قالَ: بَلْ سَأَزيدُها لِأَشْتَرِيَ سَيّارَةً جَديدَةً. سَأَلَتْهُ امْرَأَةٌ: هَلْ تُحِبُّ الشَّعْبَ؟ قالَ: أُحِبُّ أَصْواتَهُمْ فَقَطْ، وَبَعْدَ الانْتِخاباتِ أَنْساهُمْ! صَفَّقَ النّاسُ طَويلًا. سَأَلَهُ مُساعِدُهُ: لِماذا يُصَفِّقونَ لِلصِّدْقِ؟ قالَ: لِأَنَّهُمْ يَظُنّونَ أَنَّني أَمْزَحُ!',
    translation: 'A politician decided to be honest for one day. A citizen asked: "Will you fix the roads?" He said: "No, I\'ll steal the money allocated for them." Another asked: "Will you lower taxes?" He said: "Rather I\'ll raise them to buy a new car." A woman asked: "Do you love the people?" He said: "I only love their votes, and after elections I forget them!" People applauded for a long time. His assistant asked: "Why do they applaud honesty?" He said: "Because they think I\'m joking!"',
    grammaticalConcepts: ['استفهام', 'نفي', 'تعليل'],
    vocabularyHighlights: [
      { word: 'سِياسِيّ', meaning: 'politician' },
      { word: 'المُخَصَّص', meaning: 'allocated' },
      { word: 'الضَّرائِب', meaning: 'taxes' },
      { word: 'الانْتِخابات', meaning: 'elections' }
    ],
    moralLesson: 'People are so used to lies that truth sounds like comedy.',
    moralLessonAr: 'الناس معتادون على الكذب لدرجة أن الحقيقة تبدو كوميديا.',
    wordCount: 82
  },
  {
    id: 'a157',
    title: 'The Academy of Fools',
    titleAr: 'أَكاديمِيَّةُ الحَمْقى',
    level: 'advanced',
    category: 'humor-satire',
    categoryAr: 'الفكاهة والسخرية',
    text: 'أَسَّسَ مَلِكٌ أَكاديمِيَّةً لِلْحُكَماءِ. تَسابَقَ العُلَماءُ لِلانْضِمامِ. اشْتَرَطَ المَلِكُ أَنْ يُجيبوا عَنْ سُؤالٍ واحِدٍ: كَمْ شَعْرَةً في ذَيْلِ الحِصانِ المَلَكِيِّ؟ قالَ الأَوَّلُ: هَذا سُؤالٌ غَبِيٌّ! فَطُرِدَ. قالَ الثّاني: هَذا سُؤالٌ فَلْسَفِيٌّ عَميقٌ! وَبَدَأَ يُحَلِّلُ. قالَ الثّالِثُ: أَلْفُ شَعْرَةٍ بِالضَّبْطِ! سَأَلَ المَلِكُ: كَيْفَ عَرَفْتَ؟ قالَ: لَمْ أَعْرِفْ، لَكِنَّني أَعْرِفُ أَنَّكَ لَنْ تَعُدَّها لِتُكَذِّبَني! قَبِلَهُ المَلِكُ وَقالَ: هَذا هُوَ الحَكيمُ الحَقيقِيُّ! يَعْرِفُ أَنَّ الإِجابَةَ الواثِقَةَ أَهَمُّ مِنَ الإِجابَةِ الصَّحيحَةِ!',
    translation: 'A king founded an academy for the wise. Scholars competed to join. The king required them to answer one question: How many hairs are in the royal horse\'s tail? The first said: "This is a stupid question!" and was expelled. The second said: "This is a deep philosophical question!" and began analyzing. The third said: "Exactly one thousand hairs!" The king asked: "How did you know?" He said: "I didn\'t, but I know you won\'t count them to prove me wrong!" The king accepted him and said: "This is the true wise man! He knows a confident answer is more important than a correct one!"',
    grammaticalConcepts: ['استفهام', 'عدد', 'اسم تفضيل'],
    vocabularyHighlights: [
      { word: 'أَكاديمِيَّة', meaning: 'academy' },
      { word: 'اشْتَرَطَ', meaning: 'required, stipulated' },
      { word: 'ذَيْل', meaning: 'tail' },
      { word: 'الواثِقَة', meaning: 'confident' }
    ],
    moralLesson: 'Confidence often trumps competence in social success.',
    moralLessonAr: 'الثقة غالبًا تتفوق على الكفاءة في النجاح الاجتماعي.',
    wordCount: 90
  },
  {
    id: 'a158',
    title: 'The Philosopher\'s Shoes',
    titleAr: 'حِذاءُ الفَيْلَسوفِ',
    level: 'advanced',
    category: 'humor-satire',
    categoryAr: 'الفكاهة والسخرية',
    text: 'كانَ فَيْلَسوفٌ مَشْهورٌ يَمْشي حافِيًا دائِمًا. سَأَلَهُ تَلاميذُهُ: لِماذا لا تَلْبَسُ حِذاءً؟ قالَ: الحِذاءُ يَفْصِلُ الإِنْسانَ عَنِ الأَرْضِ، وَيُبْعِدُهُ عَنِ الطَّبيعَةِ، وَيُفْسِدُ عَلاقَتَهُ بِالكَوْنِ! كَتَبَ التَّلاميذُ هَذِهِ الحِكْمَةَ. بَعْدَ سَنَواتٍ، رَآهُ تِلْميذٌ قَديمٌ يَلْبَسُ حِذاءً فاخِرًا! سَأَلَهُ: وَماذا عَنِ الطَّبيعَةِ وَالكَوْنِ؟ قالَ الفَيْلَسوفُ: هَذا كانَ قَبْلَ أَنْ يُصْبِحَ عِنْدي مالٌ كافٍ لِشِراءِ حِذاءٍ! ضَحِكَ وَقالَ: الفَقْرُ يَصْنَعُ فَلاسِفَةً، وَالغِنى يَصْنَعُ أَصْحابَ أَحْذِيَةٍ!',
    translation: 'A famous philosopher always walked barefoot. His students asked: "Why don\'t you wear shoes?" He said: "Shoes separate man from the earth, distance him from nature, and corrupt his relationship with the universe!" The students wrote down this wisdom. Years later, a former student saw him wearing fancy shoes! He asked: "What about nature and the universe?" The philosopher said: "That was before I had enough money to buy shoes!" He laughed and said: "Poverty creates philosophers, and wealth creates shoe owners!"',
    grammaticalConcepts: ['استفهام', 'تعليل', 'فعل ماضي'],
    vocabularyHighlights: [
      { word: 'حافِيًا', meaning: 'barefoot' },
      { word: 'يَفْصِل', meaning: 'separates' },
      { word: 'يُفْسِد', meaning: 'corrupts' },
      { word: 'الكَوْن', meaning: 'universe' }
    ],
    moralLesson: 'Philosophical ideals often crumble before material comfort.',
    moralLessonAr: 'المثاليات الفلسفية كثيرًا ما تنهار أمام الراحة المادية.',
    wordCount: 84
  },
  {
    id: 'a159',
    title: 'The Perfect Society',
    titleAr: 'المُجْتَمَعُ المِثالِيُّ',
    level: 'advanced',
    category: 'humor-satire',
    categoryAr: 'الفكاهة والسخرية',
    text: 'اجْتَمَعَ الحُكَماءُ لِيُصَمِّموا مُجْتَمَعًا مِثالِيًّا. قالَ الأَوَّلُ: يَجِبُ أَنْ يَحْكُمَ الفَلاسِفَةُ! قالَ الثّاني: بَلِ العُلَماءُ! قالَ الثّالِثُ: بَلِ الأَتْقِياءُ! تَجادَلوا سَنَواتٍ وَلَمْ يَتَّفِقوا. في هَذِهِ الأَثْناءِ، بَنى رَجُلٌ بَسيطٌ قَرْيَةً صَغيرَةً. سَأَلوهُ: مَنْ يَحْكُمُها؟ قالَ: لا أَحَدَ. نَتَشاوَرُ مَعًا. سَأَلوا: وَإِذا اخْتَلَفْتُمْ؟ قالَ: نَأْكُلُ مَعًا وَنَضْحَكُ حَتّى نَتَّفِقَ. ذَهَبَ الحُكَماءُ لِيَدْرُسوا قَرْيَتَهُ، فَأُعْجِبوا بِها. عَرَضوا أَنْ يُديروها عِلْمِيًّا. رَفَضَ القَرَوِيّونَ وَقالوا: نَحْنُ سُعَداءُ بِجَهْلِنا!',
    translation: 'Sages gathered to design a perfect society. The first said: "Philosophers must rule!" The second: "Rather scholars!" The third: "Rather the pious!" They argued for years and didn\'t agree. Meanwhile, a simple man built a small village. They asked: "Who rules it?" He said: "No one. We consult together." They asked: "What if you disagree?" He said: "We eat together and laugh until we agree." The sages went to study his village and were impressed. They offered to manage it scientifically. The villagers refused and said: "We\'re happy with our ignorance!"',
    grammaticalConcepts: ['جملة شرطية', 'استفهام', 'أمر'],
    vocabularyHighlights: [
      { word: 'مِثالِيّ', meaning: 'perfect, ideal' },
      { word: 'الأَتْقِياء', meaning: 'the pious' },
      { word: 'نَتَشاوَر', meaning: 'we consult' },
      { word: 'القَرَوِيّون', meaning: 'villagers' }
    ],
    moralLesson: 'Simple wisdom often outperforms sophisticated theory.',
    moralLessonAr: 'الحكمة البسيطة غالبًا تتفوق على النظرية المعقدة.',
    wordCount: 88
  },
  {
    id: 'a160',
    title: 'The Death of Satire',
    titleAr: 'مَوْتُ السُّخْرِيَةِ',
    level: 'advanced',
    category: 'humor-satire',
    categoryAr: 'الفكاهة والسخرية',
    text: 'أَمَرَ طاغِيَةٌ بِمَنْعِ السُّخْرِيَةِ. مَنْ يَضْحَكُ يُعاقَبُ. مَنْ يَنْتَقِدُ يُسْجَنُ. مَنْ يَسْخَرُ يُقْتَلُ. أَصْبَحَتِ الشَّوارِعُ صامِتَةً. الوُجوهُ جامِدَةٌ. الألْسُنُ مَرْبوطَةٌ. ثُمَّ حَدَثَ شَيْءٌ غَريبٌ: بَدَأَ النّاسُ يَمْرَضونَ بِلا سَبَبٍ، وَيَموتونَ بِلا مَرَضٍ. اسْتَدْعى الطّاغِيَةُ الأَطِبّاءَ. قالوا: النّاسُ يَحْتاجونَ إِلى الضَّحِكِ لِيَعيشوا! قالَ: إِذَنْ فَلْيَضْحَكوا! لَكِنَّ أَحَدًا لَمْ يَتَذَكَّرْ كَيْفَ يَضْحَكُ. ماتَتِ السُّخْرِيَةُ، وَماتَ مَعَها الأَمَلُ، وَماتَتِ الحَياةُ نَفْسُها. هَكَذا تَسْقُطُ الإِمْبِراطورِيّاتُ: لا بِالسُّيوفِ، بَلْ بِقَتْلِ الابْتِسامَةِ.',
    translation: 'A tyrant ordered banning satire. Whoever laughs is punished. Whoever criticizes is imprisoned. Whoever mocks is killed. Streets became silent. Faces frozen. Tongues tied. Then something strange happened: people began getting sick without reason, dying without disease. The tyrant summoned doctors. They said: "People need laughter to live!" He said: "Then let them laugh!" But no one remembered how to laugh. Satire died, and with it hope died, and life itself died. Thus empires fall: not by swords, but by killing the smile.',
    grammaticalConcepts: ['مبني للمجهول', 'جملة شرطية', 'عطف'],
    vocabularyHighlights: [
      { word: 'طاغِيَة', meaning: 'tyrant' },
      { word: 'جامِدَة', meaning: 'frozen, rigid' },
      { word: 'مَرْبوطَة', meaning: 'tied' },
      { word: 'الإِمْبِراطورِيّات', meaning: 'empires' }
    ],
    moralLesson: 'A society that cannot laugh at itself is already dying.',
    moralLessonAr: 'المجتمع الذي لا يستطيع أن يسخر من نفسه يموت بالفعل.',
    wordCount: 92
  }
];
