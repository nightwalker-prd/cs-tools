// src/data/reading/humor-satire.ts

import { ReadingText } from './types';

/**
 * Humor & Satire reading texts
 * Topics: Juha tales, witty anecdotes, clever retorts, satirical observations
 * 18 texts: 6 beginner, 6 intermediate, 6 advanced
 */
export const humorSatireTexts: ReadingText[] = [
  // ===== BEGINNER (b163-b168) =====
  {
    id: 'b163',
    title: 'Juha and the Donkey',
    titleAr: 'جُحا وَالحِمارُ',
    level: 'beginner',
    category: 'humor-satire',
    categoryAr: 'الفكاهة والسخرية',
    text: 'رَكِبَ جُحا حِمارَهُ وَمَشى ابْنُهُ بِجانِبِهِ. قالَ النّاسُ: رَجُلٌ قاسٍ! يَرْكَبُ وَيَتْرُكُ الطِّفْلَ يَمْشي! فَنَزَلَ جُحا وَأَرْكَبَ ابْنَهُ. قالَ النّاسُ: وَلَدٌ عاقٌّ! يَرْكَبُ وَأَبوهُ يَمْشي! فَرَكِبا مَعًا. قالَ النّاسُ: قَلْبانِ قاسِيانِ! المِسْكينُ الحِمارُ! فَنَزَلا وَمَشَيا. قالَ النّاسُ: يا لَلْغَباءِ! حِمارٌ فارِغٌ وَهُما يَمْشِيانِ! ضَحِكَ جُحا وَقالَ: مَنْ أَرادَ إِرْضاءَ النّاسِ ماتَ هَمًّا.',
    translation: 'Juha rode his donkey while his son walked beside him. People said: "A harsh man! He rides and leaves the child to walk!" So Juha got down and put his son on. People said: "An ungrateful child! He rides while his father walks!" So they both rode. People said: "Two cruel hearts! Poor donkey!" So they got down and walked. People said: "How stupid! An empty donkey while they walk!" Juha laughed and said: "Whoever tries to please everyone dies of worry."',
    grammaticalConcepts: ['فعل ماضي', 'جملة شرطية', 'نداء'],
    vocabularyHighlights: [
      { word: 'قاسٍ', meaning: 'harsh, cruel' },
      { word: 'عاقّ', meaning: 'ungrateful, disobedient' },
      { word: 'الغَباء', meaning: 'stupidity' },
      { word: 'هَمًّا', meaning: 'of worry' }
    ],
    moralLesson: 'You cannot please everyone, so please yourself.',
    moralLessonAr: 'لا يمكنك إرضاء الجميع، فأرضِ نفسك.',
    wordCount: 68
  },
  {
    id: 'b164',
    title: 'The Lost Key',
    titleAr: 'المِفْتاحُ الضّائِعُ',
    level: 'beginner',
    category: 'humor-satire',
    categoryAr: 'الفكاهة والسخرية',
    text: 'رَأى النّاسُ جُحا يَبْحَثُ تَحْتَ المِصْباحِ في الشّارِعِ. سَأَلوهُ: ماذا تَبْحَثُ يا جُحا؟ قالَ: أَبْحَثُ عَنْ مِفْتاحي. فَساعَدوهُ في البَحْثِ ساعَةً كامِلَةً. ثُمَّ سَأَلوهُ: أَيْنَ أَضَعْتَهُ بِالضَّبْطِ؟ قالَ: في البَيْتِ. صاحوا: فَلِماذا تَبْحَثُ هُنا؟! قالَ: لِأَنَّ الضَّوْءَ هُنا أَفْضَلُ!',
    translation: 'People saw Juha searching under the lamp in the street. They asked: "What are you looking for, Juha?" He said: "I\'m looking for my key." They helped him search for a full hour. Then they asked: "Where exactly did you lose it?" He said: "In the house." They shouted: "Then why are you searching here?!" He said: "Because the light here is better!"',
    grammaticalConcepts: ['استفهام', 'ظرف مكان', 'تعليل'],
    vocabularyHighlights: [
      { word: 'المِصْباح', meaning: 'lamp' },
      { word: 'أَضَعْتَ', meaning: 'you lost' },
      { word: 'بِالضَّبْط', meaning: 'exactly' },
      { word: 'الضَّوْء', meaning: 'light' }
    ],
    moralLesson: 'We often look for solutions where it\'s easy, not where they actually are.',
    moralLessonAr: 'كثيرًا ما نبحث عن الحلول حيث يسهل البحث، لا حيث توجد فعلًا.',
    wordCount: 48
  },
  {
    id: 'b165',
    title: 'Juha\'s Turban',
    titleAr: 'عِمامَةُ جُحا',
    level: 'beginner',
    category: 'humor-satire',
    categoryAr: 'الفكاهة والسخرية',
    text: 'سَرَقَ لِصٌّ عِمامَةَ جُحا مِنْ رَأْسِهِ وَهَرَبَ. لَمْ يَجْرِ جُحا خَلْفَهُ. قالَ لَهُ صَديقُهُ: لِماذا لا تَلْحَقُ بِهِ؟ قالَ جُحا: لا داعِيَ. هُوَ ذاهِبٌ إِلى بَيْتِهِ، وَأَنا أَعْرِفُ أَيْنَ يَسْكُنُ. سَأَذْهَبُ إِلَيْهِ غَدًا بِكُلِّ هُدوءٍ!',
    translation: 'A thief stole Juha\'s turban from his head and fled. Juha didn\'t run after him. His friend said: "Why don\'t you chase him?" Juha said: "No need. He\'s going to his house, and I know where he lives. I\'ll go to him tomorrow calmly!"',
    grammaticalConcepts: ['فعل ماضي', 'نفي', 'استفهام'],
    vocabularyHighlights: [
      { word: 'لِصّ', meaning: 'thief' },
      { word: 'عِمامَة', meaning: 'turban' },
      { word: 'تَلْحَق', meaning: 'chase, catch up' },
      { word: 'هُدوء', meaning: 'calm' }
    ],
    moralLesson: 'Sometimes patience is smarter than haste.',
    moralLessonAr: 'أحيانًا الصبر أذكى من العجلة.',
    wordCount: 38
  },
  {
    id: 'b166',
    title: 'The Borrowed Pot',
    titleAr: 'القِدْرُ المُسْتَعارُ',
    level: 'beginner',
    category: 'humor-satire',
    categoryAr: 'الفكاهة والسخرية',
    text: 'اسْتَعارَ جُحا قِدْرًا مِنْ جارِهِ. أَعادَهُ وَمَعَهُ قِدْرٌ صَغيرٌ. قالَ الجارُ: ما هَذا؟ قالَ جُحا: قِدْرُكَ وَلَدَ! فَرِحَ الجارُ وَأَخَذَهُما. بَعْدَ أُسْبوعٍ اسْتَعارَ جُحا القِدْرَ مَرَّةً أُخْرى. مَرَّتْ أَيّامٌ وَلَمْ يُعِدْهُ. سَأَلَ الجارُ: أَيْنَ قِدْري؟ قالَ جُحا بِحُزْنٍ: ماتَ! صاحَ الجارُ: كَيْفَ يَموتُ قِدْرٌ؟! قالَ جُحا: مَنْ صَدَّقَ أَنَّهُ يَلِدُ، يُصَدِّقُ أَنَّهُ يَموتُ!',
    translation: 'Juha borrowed a pot from his neighbor. He returned it with a small pot. The neighbor said: "What\'s this?" Juha said: "Your pot gave birth!" The neighbor was happy and took both. After a week, Juha borrowed the pot again. Days passed and he didn\'t return it. The neighbor asked: "Where\'s my pot?" Juha said sadly: "It died!" The neighbor shouted: "How can a pot die?!" Juha said: "Whoever believed it gives birth can believe it dies!"',
    grammaticalConcepts: ['فعل ماضي', 'استفهام', 'جملة شرطية'],
    vocabularyHighlights: [
      { word: 'اسْتَعارَ', meaning: 'borrowed' },
      { word: 'قِدْر', meaning: 'pot' },
      { word: 'وَلَدَ', meaning: 'gave birth' },
      { word: 'صَدَّقَ', meaning: 'believed' }
    ],
    moralLesson: 'Greed blinds people to obvious tricks.',
    moralLessonAr: 'الطمع يعمي الناس عن الحيل الواضحة.',
    wordCount: 62
  },
  {
    id: 'b167',
    title: 'The Greedy Guest',
    titleAr: 'الضَّيْفُ الطَّمّاعُ',
    level: 'beginner',
    category: 'humor-satire',
    categoryAr: 'الفكاهة والسخرية',
    text: 'جاءَ ضَيْفٌ إِلى بَيْتِ جُحا. أَكَلَ كَثيرًا ثُمَّ قالَ: الطَّعامُ لَذيذٌ، لَكِنْ يَنْقُصُهُ المِلْحُ! في اليَوْمِ التّالي أَكَلَ أَكْثَرَ وَقالَ: اليَوْمَ المِلْحُ كَثيرٌ! في اليَوْمِ الثّالِثِ قالَ: الطَّعامُ بارِدٌ! قالَ جُحا: أَنْتَ مَريضٌ يا صَديقي. اذْهَبْ إِلى الطَّبيبِ. قالَ الضَّيْفُ: لَسْتُ مَريضًا! قالَ جُحا: بَلى! مَنْ يَأْكُلُ كُلَّ يَوْمٍ ثَلاثَ وَجَباتٍ في بَيْتِ غَيْرِهِ وَلا يَذْهَبُ، فَهُوَ مَريضٌ جِدًّا!',
    translation: 'A guest came to Juha\'s house. He ate a lot then said: "The food is delicious, but it needs salt!" The next day he ate more and said: "Today the salt is too much!" On the third day he said: "The food is cold!" Juha said: "You\'re sick, my friend. Go to the doctor." The guest said: "I\'m not sick!" Juha said: "Yes you are! Whoever eats three meals every day in someone else\'s house and doesn\'t leave is very sick!"',
    grammaticalConcepts: ['اسم تفضيل', 'نفي', 'جملة شرطية'],
    vocabularyHighlights: [
      { word: 'الطَّمّاع', meaning: 'greedy' },
      { word: 'يَنْقُصُ', meaning: 'lacks, needs' },
      { word: 'بارِد', meaning: 'cold' },
      { word: 'وَجَبات', meaning: 'meals' }
    ],
    moralLesson: 'Overstaying your welcome is a social illness.',
    moralLessonAr: 'البقاء أكثر من اللازم مرض اجتماعي.',
    wordCount: 64
  },
  {
    id: 'b168',
    title: 'The Wise Fool',
    titleAr: 'الأَحْمَقُ الذَّكِيُّ',
    level: 'beginner',
    category: 'humor-satire',
    categoryAr: 'الفكاهة والسخرية',
    text: 'سَأَلَ المَلِكُ جُحا: أَيُّهُما أَنْفَعُ، الشَّمْسُ أَمِ القَمَرُ؟ فَكَّرَ جُحا وَقالَ: القَمَرُ بِالطَّبْعِ! ضَحِكَ المَلِكُ: وَلِماذا؟ قالَ جُحا: لِأَنَّ القَمَرَ يُضيءُ في اللَّيْلِ حينَ نَحْتاجُ إِلى الضَّوْءِ. أَمّا الشَّمْسُ فَتُشْرِقُ في النَّهارِ حينَ يَكونُ الضَّوْءُ مَوْجودًا أَصْلًا! ضَحِكَ الجَميعُ، لَكِنَّ جُحا كانَ يَضْحَكُ في قَلْبِهِ مِنْ سُؤالِهِمُ الغَبِيِّ.',
    translation: 'The king asked Juha: "Which is more useful, the sun or the moon?" Juha thought and said: "The moon, of course!" The king laughed: "And why?" Juha said: "Because the moon shines at night when we need light. But the sun rises during the day when light already exists!" Everyone laughed, but Juha was laughing in his heart at their stupid question.',
    grammaticalConcepts: ['اسم تفضيل', 'استفهام', 'تعليل'],
    vocabularyHighlights: [
      { word: 'أَنْفَع', meaning: 'more useful' },
      { word: 'يُضيء', meaning: 'shines, illuminates' },
      { word: 'تُشْرِق', meaning: 'rises (sun)' },
      { word: 'أَصْلًا', meaning: 'already, originally' }
    ],
    moralLesson: 'Sometimes the fool\'s answer exposes the foolishness of the question.',
    moralLessonAr: 'أحيانًا إجابة الأحمق تكشف حماقة السؤال.',
    wordCount: 52
  },

  // ===== INTERMEDIATE (i154-i159) =====
  {
    id: 'i154',
    title: 'Juha\'s Funeral',
    titleAr: 'جَنازَةُ جُحا',
    level: 'intermediate',
    category: 'humor-satire',
    categoryAr: 'الفكاهة والسخرية',
    text: 'سَمِعَ جُحا أَنَّ النّاسَ يَتَحَدَّثونَ عَنْهُ بِالسّوءِ. فَقَرَّرَ أَنْ يَتَظاهَرَ بِالمَوْتِ. وَضَعوهُ في التّابوتِ وَمَشَوا في جَنازَتِهِ. وَصَلوا إِلى مُفْتَرَقِ طُرُقٍ. اخْتَلَفَ النّاسُ: مِنْ هُنا أَقْرَبُ! لا، مِنْ هُناكَ! عَلا الصِّياحُ وَكادوا يَتَشاجَرونَ. فَجْأَةً رَفَعَ جُحا رَأْسَهُ مِنَ التّابوتِ وَقالَ: عِنْدَما كُنْتُ حَيًّا، كُنْتُ آخُذُ الطَّريقَ الأَيْسَرَ. ثُمَّ أَغْمَضَ عَيْنَيْهِ وَعادَ إِلى مَوْتِهِ المُزَيَّفِ!',
    translation: 'Juha heard that people were speaking ill of him. So he decided to pretend to be dead. They placed him in the coffin and walked in his funeral. They reached a crossroads. People disagreed: "This way is shorter!" "No, that way!" The shouting rose and they nearly fought. Suddenly Juha raised his head from the coffin and said: "When I was alive, I used to take the left road." Then he closed his eyes and returned to his fake death!',
    grammaticalConcepts: ['جملة شرطية', 'فعل ماضي', 'ظرف زمان'],
    vocabularyHighlights: [
      { word: 'يَتَظاهَر', meaning: 'pretends' },
      { word: 'التّابوت', meaning: 'coffin' },
      { word: 'مُفْتَرَق طُرُق', meaning: 'crossroads' },
      { word: 'المُزَيَّف', meaning: 'fake' }
    ],
    moralLesson: 'People will argue even at your funeral.',
    moralLessonAr: 'الناس سيتجادلون حتى في جنازتك.',
    wordCount: 62
  },
  {
    id: 'i155',
    title: 'The Preacher and the Congregation',
    titleAr: 'الواعِظُ وَالجَماعَةُ',
    level: 'intermediate',
    category: 'humor-satire',
    categoryAr: 'الفكاهة والسخرية',
    text: 'صَعِدَ جُحا المِنْبَرَ وَسَأَلَ: هَلْ تَعْلَمونَ ما سَأَقولُ؟ قالوا: لا! قالَ: إِذَنْ لا فائِدَةَ مِنَ الكَلامِ مَعَ جُهّالٍ! وَنَزَلَ. في الأُسْبوعِ التّالي سَأَلَ نَفْسَ السُّؤالِ. قالوا: نَعَمْ! قالَ: إِذَنْ لا حاجَةَ لِأَنْ أُكَرِّرَ ما تَعْرِفونَ! وَنَزَلَ. في الأُسْبوعِ الثّالِثِ قالَ بَعْضُهُمْ: نَعَمْ! وَبَعْضُهُمْ: لا! قالَ جُحا: مُمْتازٌ! لِيُعَلِّمْ مَنْ يَعْرِفُ مَنْ لا يَعْرِفُ! وَنَزَلَ وَذَهَبَ إِلى بَيْتِهِ!',
    translation: 'Juha climbed the pulpit and asked: "Do you know what I will say?" They said: "No!" He said: "Then there\'s no point talking to ignorant people!" And he descended. The following week he asked the same question. They said: "Yes!" He said: "Then there\'s no need for me to repeat what you know!" And he descended. In the third week, some said: "Yes!" and some said: "No!" Juha said: "Excellent! Let those who know teach those who don\'t!" And he descended and went home!',
    grammaticalConcepts: ['استفهام', 'شرط', 'أمر'],
    vocabularyHighlights: [
      { word: 'المِنْبَر', meaning: 'pulpit' },
      { word: 'الواعِظ', meaning: 'preacher' },
      { word: 'جُهّال', meaning: 'ignorant people' },
      { word: 'أُكَرِّر', meaning: 'repeat' }
    ],
    moralLesson: 'Cleverness can get you out of any situation.',
    moralLessonAr: 'الذكاء يمكن أن يخرجك من أي موقف.',
    wordCount: 68
  },
  {
    id: 'i156',
    title: 'The Judge\'s Verdict',
    titleAr: 'حُكْمُ القاضي',
    level: 'intermediate',
    category: 'humor-satire',
    categoryAr: 'الفكاهة والسخرية',
    text: 'تَخاصَمَ رَجُلانِ أَمامَ جُحا القاضي. قالَ الأَوَّلُ قِصَّتَهُ. قالَ جُحا: أَنْتَ عَلى حَقٍّ! قالَ الثّاني قِصَّتَهُ. قالَ جُحا: أَنْتَ عَلى حَقٍّ! صاحَتْ زَوْجَتُهُ: كَيْفَ يَكونُ الاثْنانِ عَلى حَقٍّ؟! نَظَرَ جُحا إِلَيْها وَقالَ: وَأَنْتِ أَيْضًا عَلى حَقٍّ! ضَحِكَ الجَميعُ. لَكِنَّ جُحا كانَ يَعْلَمُ أَنَّ الحَقيقَةَ لَها وُجوهٌ كَثيرَةٌ، وَكُلُّ إِنْسانٍ يَرى مِنْها وَجْهًا واحِدًا فَقَطْ.',
    translation: 'Two men quarreled before Juha the judge. The first told his story. Juha said: "You are right!" The second told his story. Juha said: "You are right!" His wife shouted: "How can both be right?!" Juha looked at her and said: "And you too are right!" Everyone laughed. But Juha knew that truth has many faces, and each person sees only one face of it.',
    grammaticalConcepts: ['استفهام', 'عدد', 'جملة حالية'],
    vocabularyHighlights: [
      { word: 'تَخاصَمَ', meaning: 'quarreled' },
      { word: 'القاضي', meaning: 'judge' },
      { word: 'حُكْم', meaning: 'verdict, judgment' },
      { word: 'وُجوه', meaning: 'faces, aspects' }
    ],
    moralLesson: 'Truth is often more complex than simple right and wrong.',
    moralLessonAr: 'الحقيقة غالبًا أعقد من الصواب والخطأ البسيط.',
    wordCount: 58
  },
  {
    id: 'i157',
    title: 'The Stingy Host',
    titleAr: 'المُضيفُ البَخيلُ',
    level: 'intermediate',
    category: 'humor-satire',
    categoryAr: 'الفكاهة والسخرية',
    text: 'دَعا رَجُلٌ بَخيلٌ أَصْدِقاءَهُ إِلى العَشاءِ. قَدَّمَ لَهُمْ طَعامًا قَليلًا في صُحونٍ كَبيرَةٍ. قالَ ضَيْفٌ: يا صاحِبي، أَرى الصَّحْنَ وَلا أَرى الطَّعامَ! قالَ البَخيلُ: عَيْناكَ ضَعيفَتانِ. قالَ ضَيْفٌ آخَرُ: الطَّعامُ لَذيذٌ لَكِنَّهُ خَفيفٌ جِدًّا! قالَ البَخيلُ: هَذا أَفْضَلُ لِصِحَّتِكُمْ. قالَ ثالِثٌ: شَكَرًا عَلى الدَّعْوَةِ، أَظُنُّ أَنَّني سَآكُلُ العَشاءَ في بَيْتي! قالَ البَخيلُ بِسَعادَةٍ: هَذا ما كُنْتُ أَتَمَنّاهُ!',
    translation: 'A stingy man invited his friends to dinner. He served them little food in big plates. A guest said: "My friend, I see the plate but not the food!" The stingy man said: "Your eyes are weak." Another guest said: "The food is delicious but very light!" The stingy man said: "That\'s better for your health." A third said: "Thanks for the invitation, I think I\'ll eat dinner at my house!" The stingy man said happily: "That\'s what I was hoping for!"',
    grammaticalConcepts: ['صفة', 'استدراك', 'مفعول به'],
    vocabularyHighlights: [
      { word: 'البَخيل', meaning: 'stingy, miser' },
      { word: 'صُحون', meaning: 'plates' },
      { word: 'خَفيف', meaning: 'light' },
      { word: 'أَتَمَنّى', meaning: 'hope, wish' }
    ],
    moralLesson: 'The stingy person\'s hospitality exposes their true nature.',
    moralLessonAr: 'كرم البخيل يكشف طبيعته الحقيقية.',
    wordCount: 66
  },
  {
    id: 'i158',
    title: 'The Borrowed Coat',
    titleAr: 'المِعْطَفُ المُسْتَعارُ',
    level: 'intermediate',
    category: 'humor-satire',
    categoryAr: 'الفكاهة والسخرية',
    text: 'ذَهَبَ جُحا إِلى حَفْلَةٍ بِثِيابِهِ القَديمَةِ. لَمْ يُعِرْهُ أَحَدٌ اهْتِمامًا، وَلَمْ يُقَدِّموا لَهُ طَعامًا. رَجَعَ إِلى بَيْتِهِ وَلَبِسَ مِعْطَفًا فاخِرًا اسْتَعارَهُ مِنْ صَديقٍ. عادَ إِلى الحَفْلَةِ فَاسْتَقْبَلوهُ بِحَفاوَةٍ وَأَجْلَسوهُ في صَدْرِ المَجْلِسِ. قَدَّموا لَهُ أَطْيَبَ الطَّعامِ. أَخَذَ جُحا الطَّعامَ وَوَضَعَهُ في جَيْبِ مِعْطَفِهِ! صاحوا: ماذا تَفْعَلُ؟! قالَ: أُطْعِمُ المِعْطَفَ، فَهُوَ الَّذي دَعَوْتُموهُ، لا أَنا!',
    translation: 'Juha went to a party in his old clothes. No one paid him attention, and they didn\'t offer him food. He returned home and wore a fancy coat he borrowed from a friend. He returned to the party and they welcomed him warmly and seated him at the head of the gathering. They served him the finest food. Juha took the food and put it in his coat pocket! They shouted: "What are you doing?!" He said: "I\'m feeding the coat, for it\'s what you invited, not me!"',
    grammaticalConcepts: ['فعل ماضي', 'نفي', 'اسم موصول'],
    vocabularyHighlights: [
      { word: 'فاخِر', meaning: 'fancy, luxurious' },
      { word: 'حَفاوَة', meaning: 'warm welcome' },
      { word: 'صَدْر المَجْلِس', meaning: 'head of the gathering' },
      { word: 'جَيْب', meaning: 'pocket' }
    ],
    moralLesson: 'Society often judges by appearance, not substance.',
    moralLessonAr: 'المجتمع غالبًا يحكم بالمظهر، لا بالجوهر.',
    wordCount: 70
  },
  {
    id: 'i159',
    title: 'The Poet and the Patron',
    titleAr: 'الشّاعِرُ وَالمُمَوِّلُ',
    level: 'intermediate',
    category: 'humor-satire',
    categoryAr: 'الفكاهة والسخرية',
    text: 'مَدَحَ شاعِرٌ أَميرًا بِقَصيدَةٍ طَويلَةٍ. انْتَظَرَ المُكافَأَةَ، فَأَعْطاهُ الأَميرُ دِرْهَمًا واحِدًا! غَضِبَ الشّاعِرُ وَقالَ: يا سَيِّدي، هَذا لا يَكْفي ثَمَنَ الحِبْرِ! قالَ الأَميرُ: لَكِنَّ الكَلامَ رَخيصٌ! قالَ الشّاعِرُ: إِذَنْ اسْمَعْ هَذا الكَلامَ الرَّخيصَ: كانَ أَبوكَ كَريمًا، فَأَيْنَ ذَهَبَ كَرَمُهُ؟ وَكانَ جَدُّكَ شُجاعًا، فَأَيْنَ ذَهَبَتْ شَجاعَتُهُ؟ أَعْطاهُ الأَميرُ كيسًا مِنَ الذَّهَبِ وَقالَ: اذْهَبْ قَبْلَ أَنْ يَصيرَ الكَلامُ أَغْلى!',
    translation: 'A poet praised a prince with a long poem. He waited for the reward, but the prince gave him one dirham! The poet got angry and said: "My lord, this doesn\'t cover the cost of ink!" The prince said: "But words are cheap!" The poet said: "Then hear these cheap words: Your father was generous, so where did his generosity go? Your grandfather was brave, so where did his courage go?" The prince gave him a bag of gold and said: "Leave before words become more expensive!"',
    grammaticalConcepts: ['فعل ماضي', 'استفهام', 'شرط'],
    vocabularyHighlights: [
      { word: 'مَدَحَ', meaning: 'praised' },
      { word: 'المُكافَأَة', meaning: 'reward' },
      { word: 'الحِبْر', meaning: 'ink' },
      { word: 'رَخيص', meaning: 'cheap' }
    ],
    moralLesson: 'The pen can be mightier than the sword—and costlier.',
    moralLessonAr: 'القلم قد يكون أقوى من السيف - وأكثر تكلفة.',
    wordCount: 72
  },

  // ===== ADVANCED (a149-a154) =====
  {
    id: 'a149',
    title: 'The Caliph\'s New Clothes',
    titleAr: 'ثِيابُ الخَليفَةِ الجَديدَةُ',
    level: 'advanced',
    category: 'humor-satire',
    categoryAr: 'الفكاهة والسخرية',
    text: 'جاءَ خَيّاطٌ ماكِرٌ إِلى الخَليفَةِ وَقالَ: سَأَصْنَعُ لَكَ ثَوْبًا سِحْرِيًّا لا يَراهُ إِلّا الأَذْكِياءُ وَالمُخْلِصونَ! أَخَذَ ذَهَبًا كَثيرًا وَجَلَسَ يَخيطُ الهَواءَ. جاءَ الوُزَراءُ، لَمْ يَرَوْا شَيْئًا، لَكِنَّهُمْ خافوا أَنْ يُتَّهَموا بِالغَباءِ، فَصاحوا: ما أَجْمَلَهُ! لَبِسَ الخَليفَةُ "الثَّوْبَ" وَخَرَجَ إِلى الشّارِعِ. صَفَّقَ النّاسُ خَوْفًا وَنِفاقًا. فَجْأَةً صاحَ طِفْلٌ صَغيرٌ: الخَليفَةُ عُرْيانٌ! سَكَتَ الجَميعُ، ثُمَّ انْفَجَروا ضاحِكينَ. الحَقيقَةُ أَحْيانًا تَحْتاجُ بَراءَةَ طِفْلٍ لِتَخْرُجَ مِنْ سِجْنِ الخَوْفِ وَالمُجامَلَةِ.',
    translation: 'A cunning tailor came to the caliph and said: "I will make you a magical garment that only the intelligent and loyal can see!" He took much gold and sat sewing air. The ministers came, saw nothing, but feared being accused of stupidity, so they shouted: "How beautiful!" The caliph wore the "garment" and went out to the street. People applauded out of fear and hypocrisy. Suddenly a small child shouted: "The caliph is naked!" Everyone fell silent, then burst out laughing. Truth sometimes needs a child\'s innocence to escape the prison of fear and flattery.',
    grammaticalConcepts: ['استثناء', 'جملة حالية', 'اسم تفضيل'],
    vocabularyHighlights: [
      { word: 'ماكِر', meaning: 'cunning' },
      { word: 'سِحْرِيّ', meaning: 'magical' },
      { word: 'نِفاق', meaning: 'hypocrisy' },
      { word: 'المُجامَلَة', meaning: 'flattery, politeness' }
    ],
    moralLesson: 'Fear of speaking truth enables absurdity to parade as reality.',
    moralLessonAr: 'الخوف من قول الحقيقة يمكّن السخافة من التظاهر كحقيقة.',
    wordCount: 82
  },
  {
    id: 'a150',
    title: 'The Scholar\'s Donkey',
    titleAr: 'حِمارُ العالِمِ',
    level: 'advanced',
    category: 'humor-satire',
    categoryAr: 'الفكاهة والسخرية',
    text: 'كانَ عالِمٌ يَفْتَخِرُ بِأَنَّهُ يَحْفَظُ أَلْفَ كِتابٍ. قالَ لَهُ جُحا: حِماري يَحْمِلُ أَلْفَيْ كِتابٍ كُلَّ يَوْمٍ! احْمَرَّ وَجْهُ العالِمِ غَضَبًا: أَتُقارِنُني بِحِمارٍ؟! قالَ جُحا: أَسْتَغْفِرُ اللهَ! الفَرْقُ كَبيرٌ بَيْنَكُما. الحِمارُ يَعْرِفُ أَنَّهُ حِمارٌ، وَلا يَفْتَخِرُ بِما يَحْمِلُ. أَمّا أَنْتَ فَتَظُنُّ أَنَّ حِفْظَ الكُتُبِ يَجْعَلُكَ عالِمًا! العِلْمُ ما نَفَعَ، لا ما حُفِظَ. كَمْ مِنْ حافِظٍ لِلْعِلْمِ جاهِلٌ بِهِ، وَكَمْ مِنْ قَليلِ الحِفْظِ كَثيرُ الفَهْمِ! سَكَتَ العالِمُ، فَقَدْ عَلِمَ أَنَّ جُحا أَعْلَمُ مِنْهُ.',
    translation: 'A scholar used to boast that he memorized a thousand books. Juha told him: "My donkey carries two thousand books every day!" The scholar\'s face reddened with anger: "You compare me to a donkey?!" Juha said: "God forbid! The difference between you is great. The donkey knows he\'s a donkey and doesn\'t boast about what he carries. But you think memorizing books makes you a scholar! Knowledge is what benefits, not what is memorized. How many memorizers of knowledge are ignorant of it, and how many with little memorization have much understanding!" The scholar fell silent, for he knew Juha was more learned than him.',
    grammaticalConcepts: ['اسم تفضيل', 'استفهام إنكاري', 'مقابلة'],
    vocabularyHighlights: [
      { word: 'يَفْتَخِر', meaning: 'boasts' },
      { word: 'يَحْفَظ', meaning: 'memorizes' },
      { word: 'الفَرْق', meaning: 'difference' },
      { word: 'الفَهْم', meaning: 'understanding' }
    ],
    moralLesson: 'True knowledge is understanding, not mere memorization.',
    moralLessonAr: 'العلم الحقيقي هو الفهم، لا مجرد الحفظ.',
    wordCount: 88
  },
  {
    id: 'a151',
    title: 'The Satirist and the Sultan',
    titleAr: 'السّاخِرُ وَالسُّلْطانُ',
    level: 'advanced',
    category: 'humor-satire',
    categoryAr: 'الفكاهة والسخرية',
    text: 'أَمَرَ السُّلْطانُ بِإِحْضارِ الشّاعِرِ السّاخِرِ الَّذي يَسْخَرُ مِنْهُ في قَصائِدِهِ. قالَ لَهُ: لِماذا تَسْخَرُ مِنّي وَأَنا أَسْتَطيعُ قَتْلَكَ؟ قالَ الشّاعِرُ: لِأَنَّ النّاسَ يَنْسَوْنَ السَّلاطينَ بَعْدَ مَوْتِهِمْ، لَكِنَّهُمْ يَتَذَكَّرونَ مَنْ سَخِرَ مِنْهُمْ. اقْتُلْني، وَسَيَذْكُرُكَ التّاريخُ كَطاغِيَةٍ قَتَلَ شاعِرًا لِأَنَّهُ قالَ الحَقَّ! فَكَّرَ السُّلْطانُ طَويلًا، ثُمَّ قالَ: اذْهَبْ. أَنْتَ أَخْطَرُ حَيًّا مِنْكَ مَيِّتًا، لَكِنَّني لَنْ أَكونَ طاغِيَةً في كُتُبِ التّاريخِ. قالَ الشّاعِرُ وَهُوَ يَخْرُجُ: الآنَ أَصْبَحْتَ تَسْتَحِقُّ المَدْحَ لا السُّخْرِيَةَ!',
    translation: 'The sultan ordered bringing the satirical poet who mocked him in his poems. He said: "Why do you mock me when I can kill you?" The poet said: "Because people forget sultans after their death, but they remember those who mocked them. Kill me, and history will remember you as a tyrant who killed a poet for speaking truth!" The sultan thought long, then said: "Go. You are more dangerous alive than dead, but I will not be a tyrant in history books." The poet said as he left: "Now you have become worthy of praise, not mockery!"',
    grammaticalConcepts: ['استفهام', 'جملة شرطية', 'اسم تفضيل'],
    vocabularyHighlights: [
      { word: 'السّاخِر', meaning: 'satirist, mocker' },
      { word: 'يَسْخَر', meaning: 'mocks' },
      { word: 'طاغِيَة', meaning: 'tyrant' },
      { word: 'المَدْح', meaning: 'praise' }
    ],
    moralLesson: 'The satirist\'s pen can change the powerful more than their sword.',
    moralLessonAr: 'قلم الساخر يمكن أن يغير الأقوياء أكثر من سيفهم.',
    wordCount: 86
  },
  {
    id: 'a152',
    title: 'The Philosopher\'s Dilemma',
    titleAr: 'مُعْضِلَةُ الفَيْلَسوفِ',
    level: 'advanced',
    category: 'humor-satire',
    categoryAr: 'الفكاهة والسخرية',
    text: 'سَأَلَ فَيْلَسوفٌ جُحا: إِذا سَقَطْتَ في بِئْرٍ عَميقٍ وَعِنْدَكَ حَبْلٌ، كَيْفَ تَخْرُجُ؟ قالَ جُحا: أَرْمي الحَبْلَ إِلى أَعْلى وَأَتَسَلَّقُهُ. قالَ الفَيْلَسوفُ: لَكِنَّ الحَبْلَ لَنْ يَبْقى مُعَلَّقًا في الهَواءِ! قالَ جُحا: وَأَنْتَ كَيْفَ تَخْرُجُ؟ قالَ: أُفَكِّرُ في المُشْكِلَةِ فَلْسَفِيًّا حَتّى أَجِدَ حَلًّا مَنْطِقِيًّا. قالَ جُحا: حَسَنًا، أَنا أَخْرُجُ بِحَبْلي الغَبِيِّ خِلالَ دَقائِقَ، وَأَنْتَ فَكِّرْ فَلْسَفِيًّا حَتّى تَموتَ في البِئْرِ! العَمَلُ النّاقِصُ خَيْرٌ مِنَ التَّفْكيرِ الكامِلِ بِلا عَمَلٍ.',
    translation: 'A philosopher asked Juha: "If you fell in a deep well and had a rope, how would you get out?" Juha said: "I throw the rope up and climb it." The philosopher said: "But the rope won\'t stay hanging in the air!" Juha said: "And how would you get out?" He said: "I think about the problem philosophically until I find a logical solution." Juha said: "Fine, I get out with my stupid rope in minutes, and you think philosophically until you die in the well! Imperfect action is better than perfect thinking with no action."',
    grammaticalConcepts: ['جملة شرطية', 'استفهام', 'اسم تفضيل'],
    vocabularyHighlights: [
      { word: 'مُعْضِلَة', meaning: 'dilemma' },
      { word: 'فَلْسَفِيًّا', meaning: 'philosophically' },
      { word: 'مَنْطِقِيّ', meaning: 'logical' },
      { word: 'النّاقِص', meaning: 'imperfect, incomplete' }
    ],
    moralLesson: 'Action beats analysis paralysis.',
    moralLessonAr: 'العمل يتفوق على شلل التحليل.',
    wordCount: 82
  },
  {
    id: 'a153',
    title: 'The Hypocrite\'s Prayer',
    titleAr: 'صَلاةُ المُنافِقِ',
    level: 'advanced',
    category: 'humor-satire',
    categoryAr: 'الفكاهة والسخرية',
    text: 'رَأى جُحا رَجُلًا يُطيلُ صَلاتَهُ وَيَبْكي بِصَوْتٍ عالٍ. بَعْدَ الصَّلاةِ خَرَجَ الرَّجُلُ وَضَرَبَ خادِمَهُ بِلا سَبَبٍ. سَأَلَهُ جُحا: أَراكَ تَبْكي في صَلاتِكَ، فَعَلى ماذا تَبْكي؟ قالَ: عَلى ذُنوبي! قالَ جُحا: وَماذا فَعَلْتَ بَعْدَ البُكاءِ؟ قالَ: لا شَيْءَ. قالَ جُحا: عَجيبٌ! تَبْكي عَلى ذُنوبٍ ماضِيَةٍ، ثُمَّ تَخْرُجُ لِتَصْنَعَ ذُنوبًا جَديدَةً! دُموعُكَ كاذِبَةٌ، وَصَلاتُكَ تَمْثيلٌ، وَإِيمانُكَ في لِسانِكَ لا في قَلْبِكَ. الإِيمانُ الحَقيقِيُّ يَظْهَرُ في مُعامَلَةِ الضُّعَفاءِ، لا في إِطالَةِ السُّجودِ.',
    translation: 'Juha saw a man prolonging his prayer and crying loudly. After the prayer, the man went out and hit his servant for no reason. Juha asked him: "I saw you crying in your prayer, so what were you crying about?" He said: "My sins!" Juha said: "And what did you do after crying?" He said: "Nothing." Juha said: "Strange! You cry over past sins, then go out to commit new ones! Your tears are false, your prayer is acting, and your faith is on your tongue not in your heart. True faith appears in treating the weak, not in prolonging prostration."',
    grammaticalConcepts: ['استفهام', 'نفي', 'مقابلة'],
    vocabularyHighlights: [
      { word: 'المُنافِق', meaning: 'hypocrite' },
      { word: 'يُطيل', meaning: 'prolongs' },
      { word: 'تَمْثيل', meaning: 'acting, pretense' },
      { word: 'السُّجود', meaning: 'prostration' }
    ],
    moralLesson: 'Worship without ethics is performance, not faith.',
    moralLessonAr: 'العبادة بدون أخلاق تمثيل، لا إيمان.',
    wordCount: 85
  },
  {
    id: 'a154',
    title: 'The Weight of Words',
    titleAr: 'ثِقَلُ الكَلِماتِ',
    level: 'advanced',
    category: 'humor-satire',
    categoryAr: 'الفكاهة والسخرية',
    text: 'جاءَ تاجِرٌ إِلى جُحا يَشْكو: قالَ لي فُلانٌ كَلامًا جَرَحَني! ماذا أَفْعَلُ؟ قالَ جُحا: كَمْ كَلِمَةً قالَ؟ قالَ: عَشْرَ كَلِماتٍ. قالَ جُحا: اذْهَبْ وَقُلْ لَهُ عِشْرينَ! عادَ التّاجِرُ: قالَ لي ثَلاثينَ! قالَ جُحا: رُدَّ عَلَيْهِ بِسِتّينَ! عادَ: الآنَ صارَتْ مِئَةً! ضَحِكَ جُحا: أَرَأَيْتَ؟ كُلَّما رَدَدْتَ زادَتِ الكَلِماتُ! لَوْ سَكَتَّ مِنَ البِدايَةِ لَبَقِيَتْ عَشْرًا فَقَطْ. النّارُ لا تُطْفَأُ بِالنّارِ، وَالكَلامُ الجارِحُ لا يُعالَجُ بِأَجْرَحَ مِنْهُ. الصَّمْتُ أَحْيانًا أَبْلَغُ رَدٍّ وَأَقْوى سِلاحٍ.',
    translation: 'A merchant came to Juha complaining: "Someone said words that hurt me! What do I do?" Juha said: "How many words did he say?" He said: "Ten words." Juha said: "Go tell him twenty!" The merchant returned: "He said thirty to me!" Juha said: "Reply with sixty!" He returned: "Now it\'s a hundred!" Juha laughed: "You see? The more you reply, the more the words increase! If you had stayed silent from the beginning, it would have remained only ten. Fire is not extinguished by fire, and hurtful words are not healed by more hurtful ones. Silence is sometimes the most eloquent reply and the strongest weapon."',
    grammaticalConcepts: ['شرط', 'عدد', 'اسم تفضيل'],
    vocabularyHighlights: [
      { word: 'جَرَحَ', meaning: 'hurt, wounded' },
      { word: 'رُدَّ', meaning: 'reply' },
      { word: 'الجارِح', meaning: 'hurtful' },
      { word: 'أَبْلَغ', meaning: 'most eloquent' }
    ],
    moralLesson: 'Silence can be the wisest response to provocation.',
    moralLessonAr: 'الصمت قد يكون أحكم رد على الاستفزاز.',
    wordCount: 90
  }
];
