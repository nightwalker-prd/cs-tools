// src/data/reading/courage-bravery.ts

import { ReadingText } from './types';

/**
 * Courage & Bravery themed reading texts
 * Topics: Battlefield valor, moral courage, standing for truth, heroic tales
 * IDs: b187-b192 (beginner), i178-i183 (intermediate), a173-a178 (advanced)
 */
export const courageBraveryTexts: ReadingText[] = [
  // ===== BEGINNER (b187-b192) =====
  {
    id: 'b187',
    title: 'The Boy and the Wolf',
    titleAr: 'الصَّبِيُّ وَالذِّئْبُ',
    level: 'beginner',
    category: 'courage-bravery',
    categoryAr: 'الشجاعة والبسالة',
    text: 'رَأَى الصَّبِيُّ ذِئْبًا يَقْتَرِبُ مِنَ الغَنَمِ. خَافَ قَلْبُهُ لَكِنَّهُ لَمْ يَهْرُبْ. أَخَذَ عَصَاهُ وَصَرَخَ بِصَوْتٍ عَالٍ. فَزِعَ الذِّئْبُ وَهَرَبَ. عَادَ الأَبُ فَرَأَى مَا حَدَثَ. قَالَ: أَنْتَ شُجَاعٌ يَا بُنَيَّ. الشَّجَاعَةُ لَيْسَتْ أَنْ لَا تَخَافَ بَلْ أَنْ تَفْعَلَ الصَّوَابَ رَغْمَ الخَوْفِ.',
    translation: 'The boy saw a wolf approaching the sheep. His heart feared but he did not flee. He took his staff and shouted loudly. The wolf panicked and ran away. The father returned and saw what happened. He said: You are brave, my son. Courage is not that you don\'t fear, but that you do what is right despite fear.',
    grammaticalConcepts: ['past tense verbs', 'negation with لم', 'inna with predicate'],
    vocabularyHighlights: [
      { word: 'ذِئْب', meaning: 'wolf' },
      { word: 'عَصَا', meaning: 'staff/stick' },
      { word: 'فَزِعَ', meaning: 'panicked/was startled' },
      { word: 'الصَّوَاب', meaning: 'what is right/correct' }
    ],
    moralLesson: 'True courage is acting rightly despite feeling fear.',
    moralLessonAr: 'الشجاعة الحقيقية هي فعل الصواب رغم الخوف.',
    wordCount: 48
  },
  {
    id: 'b188',
    title: 'Standing for a Friend',
    titleAr: 'الوُقُوفُ مَعَ الصَّدِيقِ',
    level: 'beginner',
    category: 'courage-bravery',
    categoryAr: 'الشجاعة والبسالة',
    text: 'سَخِرَ الأَوْلَادُ مِنْ أَحْمَدَ لِأَنَّهُ فَقِيرٌ. سَكَتَ الجَمِيعُ خَوْفًا. لَكِنَّ خَالِدًا قَامَ وَقَالَ: هَذَا ظُلْمٌ! أَحْمَدُ صَدِيقِي وَهُوَ أَفْضَلُ مِنْكُمْ أَخْلَاقًا. غَضِبَ بَعْضُهُمْ لَكِنَّهُمْ خَجِلُوا. شَكَرَهُ أَحْمَدُ بِدُمُوعِهِ. قَالَ خَالِدٌ: الصَّدِيقُ الحَقِيقِيُّ يَقِفُ مَعَكَ وَقْتَ الشِّدَّةِ.',
    translation: 'The boys mocked Ahmad because he was poor. Everyone stayed silent out of fear. But Khalid stood up and said: This is injustice! Ahmad is my friend and he is better than you in character. Some got angry but they were ashamed. Ahmad thanked him with tears. Khalid said: A true friend stands with you in times of hardship.',
    grammaticalConcepts: ['causative لأنّ', 'comparative أفضل', 'hal accusative'],
    vocabularyHighlights: [
      { word: 'سَخِرَ', meaning: 'mocked/ridiculed' },
      { word: 'ظُلْم', meaning: 'injustice/oppression' },
      { word: 'خَجِلُوا', meaning: 'they were ashamed' },
      { word: 'الشِّدَّة', meaning: 'hardship/adversity' }
    ],
    moralLesson: 'Standing up for others when they are wronged requires moral courage.',
    moralLessonAr: 'الوقوف مع الآخرين عند ظلمهم يحتاج شجاعة أخلاقية.',
    wordCount: 45
  },
  {
    id: 'b189',
    title: 'The First Swim',
    titleAr: 'السِّبَاحَةُ الأُولَى',
    level: 'beginner',
    category: 'courage-bravery',
    categoryAr: 'الشجاعة والبسالة',
    text: 'نَظَرَ سَعِيدٌ إِلَى النَّهْرِ بِخَوْفٍ. قَالَ الأَبُ: أَنَا مَعَكَ. دَخَلَ سَعِيدٌ المَاءَ بِبُطْءٍ. كَانَ قَلْبُهُ يَخْفِقُ. لَكِنَّهُ تَذَكَّرَ كَلِمَاتِ أَبِيهِ. حَرَّكَ يَدَيْهِ وَرِجْلَيْهِ. سَبَحَ! فَرِحَ كَثِيرًا وَقَالَ: كُنْتُ أَخَافُ لَكِنِّي فَعَلْتُهَا. قَالَ الأَبُ: هَذِهِ الشَّجَاعَةُ يَا بُنَيَّ.',
    translation: 'Saeed looked at the river with fear. The father said: I am with you. Saeed entered the water slowly. His heart was pounding. But he remembered his father\'s words. He moved his hands and legs. He swam! He was very happy and said: I was afraid but I did it. The father said: This is courage, my son.',
    grammaticalConcepts: ['كان with present', 'dual يدين/رجلين', 'past continuous'],
    vocabularyHighlights: [
      { word: 'يَخْفِقُ', meaning: 'pounding/beating' },
      { word: 'بِبُطْءٍ', meaning: 'slowly' },
      { word: 'تَذَكَّرَ', meaning: 'remembered' },
      { word: 'حَرَّكَ', meaning: 'moved' }
    ],
    moralLesson: 'Overcoming fear through action builds true courage.',
    moralLessonAr: 'التغلب على الخوف بالعمل يبني الشجاعة الحقيقية.',
    wordCount: 46
  },
  {
    id: 'b190',
    title: 'Telling the Truth',
    titleAr: 'قَوْلُ الحَقِّ',
    level: 'beginner',
    category: 'courage-bravery',
    categoryAr: 'الشجاعة والبسالة',
    text: 'كَسَرَ عَلِيٌّ المِزْهَرِيَّةَ بِالخَطَأِ. خَافَ مِنْ غَضَبِ أُمِّهِ. فَكَّرَ أَنْ يَكْذِبَ. لَكِنَّهُ تَذَكَّرَ أَنَّ الكَذِبَ حَرَامٌ. ذَهَبَ إِلَى أُمِّهِ وَقَالَ: أَنَا كَسَرْتُهَا يَا أُمِّي. غَضِبَتِ الأُمُّ قَلِيلًا ثُمَّ قَالَتْ: أَنَا فَخُورَةٌ بِصِدْقِكَ. الصِّدْقُ يَحْتَاجُ شَجَاعَةً.',
    translation: 'Ali broke the vase by mistake. He feared his mother\'s anger. He thought to lie. But he remembered that lying is forbidden. He went to his mother and said: I broke it, mother. The mother got a little angry then said: I am proud of your honesty. Honesty requires courage.',
    grammaticalConcepts: ['أنّ with predicate', 'verbal noun الصدق', 'feminine past tense'],
    vocabularyHighlights: [
      { word: 'مِزْهَرِيَّة', meaning: 'vase' },
      { word: 'بِالخَطَأِ', meaning: 'by mistake' },
      { word: 'حَرَام', meaning: 'forbidden' },
      { word: 'فَخُورَة', meaning: 'proud (f.)' }
    ],
    moralLesson: 'Admitting mistakes requires courage but earns respect.',
    moralLessonAr: 'الاعتراف بالخطأ يحتاج شجاعة لكنه يكسب الاحترام.',
    wordCount: 42
  },
  {
    id: 'b191',
    title: 'The Small Defender',
    titleAr: 'المُدَافِعُ الصَّغِيرُ',
    level: 'beginner',
    category: 'courage-bravery',
    categoryAr: 'الشجاعة والبسالة',
    text: 'رَأَتْ فَاطِمَةُ قِطَّةً صَغِيرَةً. كَانَ كَلْبٌ كَبِيرٌ يُطَارِدُهَا. خَافَتْ فَاطِمَةُ لَكِنَّهَا لَمْ تَتْرُكِ القِطَّةَ. حَمَلَتْهَا وَصَرَخَتْ فِي الكَلْبِ. هَرَبَ الكَلْبُ. أَخَذَتْ فَاطِمَةُ القِطَّةَ إِلَى البَيْتِ. قَالَتِ الأُمُّ: حَمَيْتِ الضَّعِيفَ. هَذِهِ شَجَاعَةُ الرَّحْمَةِ.',
    translation: 'Fatima saw a small cat. A big dog was chasing it. Fatima was afraid but she did not leave the cat. She carried it and shouted at the dog. The dog ran away. Fatima took the cat home. The mother said: You protected the weak. This is the courage of mercy.',
    grammaticalConcepts: ['feminine verb forms', 'كان with present', 'idafa الرحمة'],
    vocabularyHighlights: [
      { word: 'يُطَارِدُ', meaning: 'chasing/pursuing' },
      { word: 'حَمَلَتْ', meaning: 'she carried' },
      { word: 'حَمَيْتِ', meaning: 'you (f.) protected' },
      { word: 'الضَّعِيف', meaning: 'the weak one' }
    ],
    moralLesson: 'Protecting the vulnerable is a noble form of courage.',
    moralLessonAr: 'حماية الضعفاء شجاعة نبيلة.',
    wordCount: 44
  },
  {
    id: 'b192',
    title: 'Facing the Bully',
    titleAr: 'مُوَاجَهَةُ المُتَنَمِّرِ',
    level: 'beginner',
    category: 'courage-bravery',
    categoryAr: 'الشجاعة والبسالة',
    text: 'كَانَ زَيْدٌ يَأْخُذُ طَعَامَ الأَطْفَالِ الصِّغَارِ. سَكَتَ الجَمِيعُ خَوْفًا مِنْهُ. قَرَّرَ مُحَمَّدٌ أَنْ يَتَكَلَّمَ. قَالَ لِزَيْدٍ: هَذَا خَطَأٌ كَبِيرٌ. أَعِدْ طَعَامَهُمْ. غَضِبَ زَيْدٌ لَكِنَّهُ أَعَادَ الطَّعَامَ. شَكَرَ الأَطْفَالُ مُحَمَّدًا. الشُّجَاعُ يَقِفُ ضِدَّ الظُّلْمِ وَلَوْ كَانَ وَحْدَهُ.',
    translation: 'Zaid used to take the small children\'s food. Everyone stayed silent fearing him. Muhammad decided to speak. He said to Zaid: This is a big mistake. Return their food. Zaid got angry but returned the food. The children thanked Muhammad. The brave one stands against injustice even if alone.',
    grammaticalConcepts: ['كان with present habitual', 'imperative أعِدْ', 'conditional لو'],
    vocabularyHighlights: [
      { word: 'يَأْخُذُ', meaning: 'takes/used to take' },
      { word: 'قَرَّرَ', meaning: 'decided' },
      { word: 'أَعِدْ', meaning: 'return! (imperative)' },
      { word: 'ضِدَّ', meaning: 'against' }
    ],
    moralLesson: 'Standing against wrongdoing, even alone, defines true bravery.',
    moralLessonAr: 'الوقوف ضد الظلم ولو وحدك يعرّف الشجاعة الحقيقية.',
    wordCount: 43
  },

  // ===== INTERMEDIATE (i178-i183) =====
  {
    id: 'i178',
    title: 'The Courage of Bilal',
    titleAr: 'شَجَاعَةُ بِلَالٍ',
    level: 'intermediate',
    category: 'courage-bravery',
    categoryAr: 'الشجاعة والبسالة',
    text: 'كَانَ بِلَالُ بْنُ رَبَاحٍ عَبْدًا حَبَشِيًّا أَسْلَمَ فِي مَكَّةَ. عَذَّبَهُ سَيِّدُهُ أُمَيَّةُ بْنُ خَلَفٍ عَذَابًا شَدِيدًا. كَانَ يَضَعُ الصَّخْرَةَ الكَبِيرَةَ عَلَى صَدْرِهِ تَحْتَ شَمْسِ الصَّحْرَاءِ الحَارِقَةِ. وَكَانَ يَقُولُ لَهُ: اكْفُرْ بِمُحَمَّدٍ! لَكِنَّ بِلَالًا كَانَ يُرَدِّدُ بِصَوْتٍ ثَابِتٍ: أَحَدٌ، أَحَدٌ. لَمْ يَكْسِرْ التَّعْذِيبُ إِيمَانَهُ. اشْتَرَاهُ أَبُو بَكْرٍ وَأَعْتَقَهُ. صَارَ بِلَالٌ مُؤَذِّنَ الإِسْلَامِ الأَوَّلَ.',
    translation: 'Bilal ibn Rabah was an Abyssinian slave who embraced Islam in Mecca. His master Umayyah ibn Khalaf tortured him severely. He would place a huge rock on his chest under the burning desert sun. He would say to him: Disbelieve in Muhammad! But Bilal would repeat with a steady voice: One, One (meaning Allah is One). The torture did not break his faith. Abu Bakr bought him and freed him. Bilal became the first muezzin of Islam.',
    grammaticalConcepts: ['كان with habitual past', 'imperative اكفر', 'passive voice'],
    vocabularyHighlights: [
      { word: 'عَذَّبَ', meaning: 'tortured' },
      { word: 'الحَارِقَة', meaning: 'burning/scorching' },
      { word: 'يُرَدِّدُ', meaning: 'repeats/chants' },
      { word: 'أَعْتَقَهُ', meaning: 'freed him' }
    ],
    moralLesson: 'True faith gives courage to endure any persecution.',
    moralLessonAr: 'الإيمان الحقيقي يمنح الشجاعة لتحمل أي اضطهاد.',
    wordCount: 68
  },
  {
    id: 'i179',
    title: 'The Honest Merchant',
    titleAr: 'التَّاجِرُ الأَمِينُ',
    level: 'intermediate',
    category: 'courage-bravery',
    categoryAr: 'الشجاعة والبسالة',
    text: 'كَانَ التَّاجِرُ مَحْمُودٌ مَشْهُورًا بِأَمَانَتِهِ فِي السُّوقِ. جَاءَهُ رَجُلٌ غَنِيٌّ وَقَالَ: سَأُعْطِيكَ أَلْفَ دِينَارٍ إِنْ أَخْفَيْتَ عَيْبَ هَذِهِ البِضَاعَةِ عَنِ المُشْتَرِينَ. نَظَرَ مَحْمُودٌ إِلَى المَالِ الكَثِيرِ ثُمَّ قَالَ بِحَزْمٍ: لَوْ أَعْطَيْتَنِي كُلَّ ذَهَبِ الدُّنْيَا لَمَا خُنْتُ ضَمِيرِي. الصِّدْقُ أَغْلَى مِنْ كُلِّ مَالٍ. غَضِبَ الرَّجُلُ وَذَهَبَ. لَكِنَّ النَّاسَ زَادَتْ ثِقَتُهُمْ بِمَحْمُودٍ وَازْدَهَرَتْ تِجَارَتُهُ.',
    translation: 'The merchant Mahmoud was famous for his honesty in the market. A rich man came to him and said: I will give you a thousand dinars if you hide this merchandise\'s defect from buyers. Mahmoud looked at the large sum then said firmly: Even if you gave me all the world\'s gold, I would not betray my conscience. Honesty is more precious than all wealth. The man got angry and left. But people\'s trust in Mahmoud increased and his trade flourished.',
    grammaticalConcepts: ['conditional لو with لما', 'comparative أغلى', 'passive ازدهرت'],
    vocabularyHighlights: [
      { word: 'أَمَانَة', meaning: 'honesty/trustworthiness' },
      { word: 'عَيْب', meaning: 'defect/flaw' },
      { word: 'بِحَزْمٍ', meaning: 'firmly/resolutely' },
      { word: 'ضَمِير', meaning: 'conscience' }
    ],
    moralLesson: 'Resisting bribery requires courage but builds lasting reputation.',
    moralLessonAr: 'مقاومة الرشوة تحتاج شجاعة لكنها تبني سمعة دائمة.',
    wordCount: 66
  },
  {
    id: 'i180',
    title: 'The Scholar\'s Stance',
    titleAr: 'مَوْقِفُ العَالِمِ',
    level: 'intermediate',
    category: 'courage-bravery',
    categoryAr: 'الشجاعة والبسالة',
    text: 'طَلَبَ السُّلْطَانُ مِنَ العَالِمِ أَنْ يُفْتِيَ بِجَوَازِ أَخْذِ أَمْوَالِ الفُقَرَاءِ. قَالَ لَهُ: أُعْطِيكَ مَنْصِبًا كَبِيرًا وَمَالًا وَفِيرًا. نَظَرَ العَالِمُ إِلَى السُّلْطَانِ بِهُدُوءٍ وَقَالَ: يَا مَوْلَايَ، أَخَافُ يَوْمًا أَقِفُ فِيهِ بَيْنَ يَدَيِ اللهِ. لَا أَسْتَطِيعُ أَنْ أُحِلَّ مَا حَرَّمَ اللهُ. غَضِبَ السُّلْطَانُ وَسَجَنَهُ. لَكِنَّ النَّاسَ احْتَرَمُوهُ وَذَكَرُوا شَجَاعَتَهُ عَبْرَ القُرُونِ.',
    translation: 'The sultan asked the scholar to issue a fatwa permitting taking the poor\'s money. He told him: I will give you a high position and abundant wealth. The scholar looked at the sultan calmly and said: O my lord, I fear a day when I stand before Allah. I cannot make permissible what Allah has forbidden. The sultan got angry and imprisoned him. But people respected him and remembered his courage across the centuries.',
    grammaticalConcepts: ['أنْ + subjunctive', 'relative clause يوم أقف فيه', 'مصدر جواز'],
    vocabularyHighlights: [
      { word: 'يُفْتِي', meaning: 'to issue a fatwa' },
      { word: 'جَوَاز', meaning: 'permissibility' },
      { word: 'وَفِير', meaning: 'abundant' },
      { word: 'عَبْرَ القُرُون', meaning: 'across centuries' }
    ],
    moralLesson: 'Scholars of integrity refuse to compromise truth for worldly gain.',
    moralLessonAr: 'العلماء الأمناء يرفضون المساومة على الحق لمكاسب دنيوية.',
    wordCount: 65
  },
  {
    id: 'i181',
    title: 'Khalid\'s First Battle',
    titleAr: 'أَوَّلُ مَعْرَكَةٍ لِخَالِدٍ',
    level: 'intermediate',
    category: 'courage-bravery',
    categoryAr: 'الشجاعة والبسالة',
    text: 'كَانَ خَالِدٌ شَابًّا فِي أَوَّلِ مَعْرَكَةٍ لَهُ. رَأَى الجُيُوشَ الكَثِيرَةَ فَارْتَعَشَتْ يَدَاهُ. جَاءَ إِلَيْهِ قَائِدٌ مُسِنٌّ وَقَالَ: أَرَى الخَوْفَ فِي عَيْنَيْكَ. هَذَا طَبِيعِيٌّ. لَكِنِ انْظُرْ إِلَى إِخْوَانِكَ الَّذِينَ يَعْتَمِدُونَ عَلَيْكَ. تَذَكَّرْ لِمَاذَا نُقَاتِلُ. تَنَفَّسَ خَالِدٌ بِعُمْقٍ وَأَمْسَكَ سَيْفَهُ بِثَبَاتٍ. قَاتَلَ ذَلِكَ اليَوْمَ كَالأُسُودِ. اكْتَشَفَ أَنَّ الشَّجَاعَةَ تُولَدُ فِي لَحْظَةِ الاخْتِيَارِ.',
    translation: 'Khalid was a young man in his first battle. He saw the large armies and his hands trembled. An elderly commander came to him and said: I see fear in your eyes. This is natural. But look at your brothers who depend on you. Remember why we fight. Khalid breathed deeply and held his sword steadily. He fought that day like a lion. He discovered that courage is born in the moment of choice.',
    grammaticalConcepts: ['relative clause الذين', 'imperative انظر/تذكر', 'passive تُولَدُ'],
    vocabularyHighlights: [
      { word: 'ارْتَعَشَتْ', meaning: 'trembled' },
      { word: 'مُسِنّ', meaning: 'elderly' },
      { word: 'بِثَبَات', meaning: 'steadily/firmly' },
      { word: 'لَحْظَة الاخْتِيَار', meaning: 'moment of choice' }
    ],
    moralLesson: 'Courage emerges when we choose to act despite fear.',
    moralLessonAr: 'الشجاعة تظهر عندما نختار الفعل رغم الخوف.',
    wordCount: 70
  },
  {
    id: 'i182',
    title: 'The Mother\'s Sacrifice',
    titleAr: 'تَضْحِيَةُ الأُمِّ',
    level: 'intermediate',
    category: 'courage-bravery',
    categoryAr: 'الشجاعة والبسالة',
    text: 'فِي زَمَنِ المَجَاعَةِ، كَانَتِ الأُمُّ تَقْسِمُ الطَّعَامَ القَلِيلَ بَيْنَ أَطْفَالِهَا الثَّلَاثَةِ. كَانَتْ تَدَّعِي أَنَّهَا أَكَلَتْ قَبْلَهُمْ. مَرَّتِ الأَيَّامُ وَهِيَ تَجُوعُ فِي صَمْتٍ. ضَعُفَ جِسْمُهَا لَكِنَّ ابْتِسَامَتَهَا لَمْ تَغِبْ. اكْتَشَفَ الأَطْفَالُ حَقِيقَتَهَا عِنْدَمَا مَرِضَتْ. بَكَوْا وَأَصَرُّوا عَلَى مُشَارَكَتِهَا. قَالَتْ بِضَعْفٍ: شَجَاعَةُ الأُمِّ أَنْ تَتَأَلَّمَ وَتَبْتَسِمَ لِأَجْلِ مَنْ تُحِبُّ.',
    translation: 'In the time of famine, the mother would divide the little food among her three children. She would pretend she had eaten before them. Days passed while she starved in silence. Her body weakened but her smile never disappeared. The children discovered her truth when she fell ill. They cried and insisted on sharing with her. She said weakly: A mother\'s courage is to suffer and smile for those she loves.',
    grammaticalConcepts: ['كانت with habitual', 'أنّ with past tense', 'لأجل + من relative'],
    vocabularyHighlights: [
      { word: 'مَجَاعَة', meaning: 'famine' },
      { word: 'تَدَّعِي', meaning: 'pretends/claims' },
      { word: 'تَجُوعُ', meaning: 'starving/goes hungry' },
      { word: 'تَتَأَلَّم', meaning: 'suffers pain' }
    ],
    moralLesson: 'The courage of love often means silent sacrifice.',
    moralLessonAr: 'شجاعة الحب كثيرًا ما تعني التضحية الصامتة.',
    wordCount: 67
  },
  {
    id: 'i183',
    title: 'Speaking Truth to the Caliph',
    titleAr: 'الصِّدْقُ أَمَامَ الخَلِيفَةِ',
    level: 'intermediate',
    category: 'courage-bravery',
    categoryAr: 'الشجاعة والبسالة',
    text: 'دَخَلَ رَجُلٌ بَسِيطٌ عَلَى الخَلِيفَةِ عُمَرَ بْنِ عَبْدِ العَزِيزِ. قَالَ لَهُ بِوُضُوحٍ: يَا أَمِيرَ المُؤْمِنِينَ، إِنَّ وَالِيَ مَدِينَتِنَا ظَالِمٌ. يَأْخُذُ أَمْوَالَ النَّاسِ وَيُهِينُ الضُّعَفَاءَ. ارْتَعَشَ الحُرَّاسُ خَوْفًا مِنْ جُرْأَتِهِ. لَكِنَّ عُمَرَ ابْتَسَمَ وَقَالَ: شَكَرًا لِشَجَاعَتِكَ. الحَقُّ يَحْتَاجُ مَنْ يَنْطِقُ بِهِ. ثُمَّ عَزَلَ الوَالِيَ الظَّالِمَ وَعَيَّنَ وَالِيًا عَادِلًا.',
    translation: 'A simple man entered upon Caliph Umar ibn Abd al-Aziz. He told him clearly: O Commander of the Faithful, the governor of our city is unjust. He takes people\'s money and humiliates the weak. The guards trembled fearing his audacity. But Umar smiled and said: Thank you for your courage. Truth needs those who speak it. Then he removed the unjust governor and appointed a just one.',
    grammaticalConcepts: ['إنّ with predicate', 'من relative pronoun', 'مفعول مطلق شكرًا'],
    vocabularyHighlights: [
      { word: 'وَالِي', meaning: 'governor' },
      { word: 'يُهِينُ', meaning: 'humiliates' },
      { word: 'جُرْأَة', meaning: 'audacity/boldness' },
      { word: 'عَزَلَ', meaning: 'removed/dismissed' }
    ],
    moralLesson: 'Speaking truth to power requires courage and serves justice.',
    moralLessonAr: 'قول الحق للسلطة يحتاج شجاعة ويخدم العدالة.',
    wordCount: 62
  },

  // ===== ADVANCED (a173-a178) =====
  {
    id: 'a173',
    title: 'Hamza: Lion of Allah',
    titleAr: 'حَمْزَةُ أَسَدُ اللهِ',
    level: 'advanced',
    category: 'courage-bravery',
    categoryAr: 'الشجاعة والبسالة',
    text: 'لَمَّا أَسْلَمَ حَمْزَةُ بْنُ عَبْدِ المُطَّلِبِ، تَحَوَّلَ مِيزَانُ القُوَّةِ فِي مَكَّةَ. كَانَ فَارِسًا لَا يُشَقُّ لَهُ غُبَارٌ، وَصَيَّادًا لَا يُجَارَى. ذَاتَ يَوْمٍ ضَرَبَ أَبُو جَهْلٍ النَّبِيَّ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ. سَمِعَ حَمْزَةُ الخَبَرَ فَثَارَتْ حَمِيَّتُهُ. ذَهَبَ إِلَى الكَعْبَةِ حَيْثُ قُرَيْشٌ مُجْتَمِعَةٌ وَضَرَبَ أَبَا جَهْلٍ بِقَوْسِهِ ضَرْبَةً شَقَّتْ رَأْسَهُ. ثُمَّ أَعْلَنَ إِسْلَامَهُ أَمَامَ الجَمِيعِ مُتَحَدِّيًا قُرَيْشًا كُلَّهَا. مَا تَجَرَّأَ أَحَدٌ أَنْ يَرُدَّ عَلَيْهِ.',
    translation: 'When Hamza ibn Abd al-Muttalib embraced Islam, the balance of power shifted in Mecca. He was an unmatched horseman, and an unrivaled hunter. One day Abu Jahl struck the Prophet, peace be upon him. Hamza heard the news and his protective zeal ignited. He went to the Kaaba where Quraysh was gathered and struck Abu Jahl with his bow, a blow that split his head. Then he proclaimed his Islam before everyone, challenging all of Quraysh. No one dared to respond to him.',
    grammaticalConcepts: ['لما temporal', 'passive لا يُشَقُّ', 'حال مجتمعة'],
    vocabularyHighlights: [
      { word: 'لا يُشَقُّ لَهُ غُبَار', meaning: 'unmatched/unrivaled (idiom)' },
      { word: 'حَمِيَّة', meaning: 'protective zeal/honor' },
      { word: 'ثَارَتْ', meaning: 'ignited/erupted' },
      { word: 'مُتَحَدِّيًا', meaning: 'challenging/defying' }
    ],
    moralLesson: 'True courage announces itself through decisive action.',
    moralLessonAr: 'الشجاعة الحقيقية تُعلن عن نفسها بالفعل الحاسم.',
    wordCount: 78
  },
  {
    id: 'a174',
    title: 'Abu Dharr\'s Lonely Stand',
    titleAr: 'مَوْقِفُ أَبِي ذَرٍّ الوَحِيدِ',
    level: 'advanced',
    category: 'courage-bravery',
    categoryAr: 'الشجاعة والبسالة',
    text: 'كَانَ أَبُو ذَرٍّ الغِفَارِيُّ رَجُلًا لَا يَخَافُ فِي الحَقِّ لَوْمَةَ لَائِمٍ. بَعْدَ وَفَاةِ النَّبِيِّ بِسَنَوَاتٍ، رَأَى بَعْضَ الوُلَاةِ يَجْمَعُونَ الثَّرْوَاتِ وَيَحْرِمُونَ الفُقَرَاءَ. قَامَ يُنْكِرُ عَلَيْهِمْ بِصَوْتٍ عَالٍ فِي المَسَاجِدِ وَالأَسْوَاقِ. قَالُوا لَهُ: اسْكُتْ تَسْلَمْ. قَالَ: وَاللهِ لَوْ وَضَعْتُمُ السَّيْفَ عَلَى عُنُقِي لَقُلْتُ الحَقَّ. نُفِيَ إِلَى الرَّبَذَةِ وَحِيدًا حَيْثُ مَاتَ غَرِيبًا. لَكِنَّ كَلِمَاتِهِ بَقِيَتْ نُورًا يُضِيءُ ضَمِيرَ الأُمَّةِ.',
    translation: 'Abu Dharr al-Ghifari was a man who, in matters of truth, feared no blame from any critic. Years after the Prophet\'s death, he saw some governors accumulating wealth and depriving the poor. He rose to denounce them loudly in mosques and markets. They told him: Be silent and you\'ll be safe. He said: By Allah, even if you placed the sword on my neck, I would speak the truth. He was exiled to Rabadha alone where he died a stranger. But his words remained a light illuminating the nation\'s conscience.',
    grammaticalConcepts: ['لا يخاف لومة لائم', 'conditional لو', 'passive نُفِيَ'],
    vocabularyHighlights: [
      { word: 'لَوْمَة لَائِم', meaning: 'blame from a critic' },
      { word: 'يُنْكِرُ', meaning: 'denounces/objects to' },
      { word: 'نُفِيَ', meaning: 'was exiled' },
      { word: 'الرَّبَذَة', meaning: 'Rabadha (a desert area)' }
    ],
    moralLesson: 'Prophetic courage means speaking truth regardless of consequences.',
    moralLessonAr: 'الشجاعة النبوية تعني قول الحق بغض النظر عن العواقب.',
    wordCount: 82
  },
  {
    id: 'a175',
    title: 'Saladin at Hattin',
    titleAr: 'صَلَاحُ الدِّينِ فِي حِطِّينَ',
    level: 'advanced',
    category: 'courage-bravery',
    categoryAr: 'الشجاعة والبسالة',
    text: 'فِي مَعْرَكَةِ حِطِّينَ، وَاجَهَ صَلَاحُ الدِّينِ جَيْشَ الفِرِنْجَةِ الضَّخْمَ. كَانَ الحَرُّ شَدِيدًا وَالعَطَشُ يُهْلِكُ الجُنُودَ. جَاءَ قَائِدٌ وَقَالَ: يَا سُلْطَانُ، العَدُوُّ كَثِيرٌ. قَالَ صَلَاحُ الدِّينِ بِهُدُوءٍ: نَحْنُ لَا نُقَاتِلُ بِالعَدَدِ بَلْ بِالإِيمَانِ. ثُمَّ رَكِبَ فَرَسَهُ وَتَقَدَّمَ الصُّفُوفَ. رَآهُ الجُنُودُ فَامْتَلَأَتْ قُلُوبُهُمْ شَجَاعَةً. انْتَصَرُوا ذَلِكَ اليَوْمَ وَحَرَّرُوا القُدْسَ. قَالَ المُؤَرِّخُونَ: شَجَاعَةُ القَائِدِ تُضَاعِفُ شَجَاعَةَ الجَيْشِ.',
    translation: 'At the Battle of Hattin, Saladin faced the massive Crusader army. The heat was intense and thirst was killing the soldiers. A commander came and said: O Sultan, the enemy is numerous. Saladin said calmly: We do not fight with numbers but with faith. Then he mounted his horse and advanced to the front lines. The soldiers saw him and their hearts filled with courage. They were victorious that day and liberated Jerusalem. Historians said: A leader\'s courage multiplies the army\'s courage.',
    grammaticalConcepts: ['لا نقاتل بل', 'تمييز شجاعةً', 'passive تُضَاعِف'],
    vocabularyHighlights: [
      { word: 'الفِرِنْجَة', meaning: 'the Franks/Crusaders' },
      { word: 'يُهْلِكُ', meaning: 'destroys/kills' },
      { word: 'تَقَدَّمَ الصُّفُوف', meaning: 'advanced to the front lines' },
      { word: 'تُضَاعِفُ', meaning: 'multiplies/doubles' }
    ],
    moralLesson: 'A leader\'s courage in crisis inspires extraordinary valor in others.',
    moralLessonAr: 'شجاعة القائد في الأزمات تُلهم الآخرين شجاعة استثنائية.',
    wordCount: 80
  },
  {
    id: 'a176',
    title: 'Al-Izz ibn Abd al-Salam\'s Fatwa',
    titleAr: 'فَتْوَى العِزِّ بْنِ عَبْدِ السَّلَامِ',
    level: 'advanced',
    category: 'courage-bravery',
    categoryAr: 'الشجاعة والبسالة',
    text: 'لُقِّبَ العِزُّ بْنُ عَبْدِ السَّلَامِ بِسُلْطَانِ العُلَمَاءِ لِشَجَاعَتِهِ فِي الحَقِّ. فِي زَمَنِهِ، بَاعَ الحَاكِمُ أُمَرَاءَ المَمَالِيكِ لِلْمَغُولِ ضِمَانًا لِسَلَامِهِ. أَفْتَى العِزُّ بِتَحْرِيمِ هَذَا البَيْعِ لِأَنَّ المَمَالِيكَ أَصْبَحُوا أَحْرَارًا بِإِسْلَامِهِمْ. غَضِبَ الحَاكِمُ وَأَمَرَ بِقَتْلِهِ. فَخَرَجَ العِزُّ يَمْشِي وَحْدَهُ مُتَوَجِّهًا إِلَى القَصْرِ. لَكِنَّ المَمَالِيكَ تَجَمَّعُوا خَلْفَهُ بِالآلَافِ. خَافَ الحَاكِمُ وَتَرَاجَعَ. قَالَ العِزُّ: العَالِمُ الَّذِي يَخَافُ إِلَّا اللهَ لَيْسَ بِعَالِمٍ.',
    translation: 'Al-Izz ibn Abd al-Salam was titled Sultan of the Scholars for his courage in truth. In his time, the ruler sold Mamluk princes to the Mongols to guarantee his safety. Al-Izz issued a fatwa prohibiting this sale because the Mamluks had become free through their Islam. The ruler got angry and ordered his killing. Al-Izz went out walking alone heading to the palace. But the Mamluks gathered behind him by the thousands. The ruler feared and retreated. Al-Izz said: A scholar who fears other than Allah is no scholar.',
    grammaticalConcepts: ['لُقِّبَ passive', 'لأنّ causative', 'إلّا exception'],
    vocabularyHighlights: [
      { word: 'المَمَالِيك', meaning: 'Mamluks (military slaves)' },
      { word: 'ضِمَانًا', meaning: 'as guarantee' },
      { word: 'تَحْرِيم', meaning: 'prohibition' },
      { word: 'تَرَاجَعَ', meaning: 'retreated/backed down' }
    ],
    moralLesson: 'True scholars fear only Allah and stand for justice regardless of power.',
    moralLessonAr: 'العلماء الحقيقيون يخافون الله فقط ويقفون للعدالة بغض النظر عن السلطة.',
    wordCount: 85
  },
  {
    id: 'a177',
    title: 'The Night of Hijra',
    titleAr: 'لَيْلَةُ الهِجْرَةِ',
    level: 'advanced',
    category: 'courage-bravery',
    categoryAr: 'الشجاعة والبسالة',
    text: 'لَيْلَةَ الهِجْرَةِ، أَحَاطَتْ قُرَيْشٌ بِبَيْتِ النَّبِيِّ لِقَتْلِهِ. كَانَ عَلِيُّ بْنُ أَبِي طَالِبٍ شَابًّا فِي العِشْرِينَ مِنْ عُمْرِهِ. طَلَبَ مِنْهُ النَّبِيُّ أَنْ يَنَامَ فِي فِرَاشِهِ لِيَظُنَّ القَتَلَةُ أَنَّهُ مَا زَالَ فِي البَيْتِ. عَرَفَ عَلِيٌّ أَنَّهُ قَدْ يُقْتَلُ. لَكِنَّهُ نَامَ بِهُدُوءٍ تَحْتَ سُيُوفِ الأَعْدَاءِ. سَأَلُوهُ لَاحِقًا: أَمَا خِفْتَ؟ قَالَ: كَيْفَ أَخَافُ وَأَنَا فِي طَاعَةِ اللهِ وَفِدَاءِ رَسُولِهِ؟ نَزَلَ فِيهِ قُرْآنٌ: وَمِنَ النَّاسِ مَنْ يَشْرِي نَفْسَهُ ابْتِغَاءَ مَرْضَاتِ اللهِ.',
    translation: 'On the night of Hijra, Quraysh surrounded the Prophet\'s house to kill him. Ali ibn Abi Talib was a young man in his twenties. The Prophet asked him to sleep in his bed so the assassins would think he was still in the house. Ali knew he might be killed. But he slept calmly under the enemies\' swords. They asked him later: Weren\'t you afraid? He said: How could I fear when I am in obedience to Allah and sacrificing for His Messenger? Quran was revealed about him: "And among people is he who sells his soul seeking Allah\'s pleasure."',
    grammaticalConcepts: ['لِيَظُنَّ purpose clause', 'ما زال', 'interrogative أما'],
    vocabularyHighlights: [
      { word: 'فِرَاش', meaning: 'bed/bedding' },
      { word: 'القَتَلَة', meaning: 'the assassins/killers' },
      { word: 'فِدَاء', meaning: 'sacrifice/ransom' },
      { word: 'يَشْرِي', meaning: 'sells/trades' }
    ],
    moralLesson: 'Supreme courage comes from complete trust in Allah.',
    moralLessonAr: 'الشجاعة العظمى تأتي من التوكل الكامل على الله.',
    wordCount: 88
  },
  {
    id: 'a178',
    title: 'Courage Beyond the Battlefield',
    titleAr: 'شَجَاعَةٌ أَبْعَدُ مِنَ المَعْرَكَةِ',
    level: 'advanced',
    category: 'courage-bravery',
    categoryAr: 'الشجاعة والبسالة',
    text: 'سُئِلَ حَكِيمٌ: مَا أَعْظَمُ أَنْوَاعِ الشَّجَاعَةِ؟ قَالَ: النَّاسُ يَظُنُّونَ أَنَّهَا مُوَاجَهَةُ العَدُوِّ بِالسَّيْفِ. لَكِنَّ الشَّجَاعَةَ الحَقِيقِيَّةَ أَنْوَاعٌ: شَجَاعَةُ الاعْتِرَافِ بِالخَطَأِ أَمَامَ مَنْ أَخْطَأْتَ بِحَقِّهِ. وَشَجَاعَةُ العَفْوِ عَمَّنْ قَدَرْتَ عَلَيْهِ. وَشَجَاعَةُ قَوْلِ لَا أَعْلَمُ لِلْعَالِمِ. وَشَجَاعَةُ التَّغْيِيرِ حِينَ تَكْتَشِفُ خَطَأَ طَرِيقِكَ. وَأَعْظَمُهَا: شَجَاعَةُ مُحَارَبَةِ نَفْسِكَ حِينَ تَدْعُوكَ إِلَى الشَّرِّ. هَذِهِ شَجَاعَةُ كُلِّ يَوْمٍ الَّتِي لَا يَرَاهَا أَحَدٌ لَكِنَّهَا تَبْنِي العَظَمَةَ.',
    translation: 'A sage was asked: What is the greatest type of courage? He said: People think it is facing the enemy with the sword. But true courage has types: The courage to admit error to those you wronged. The courage to pardon those you have power over. The courage to say "I don\'t know" for the scholar. The courage to change when you discover your path is wrong. And greatest of all: the courage to fight your soul when it calls you to evil. This is everyday courage that no one sees but it builds greatness.',
    grammaticalConcepts: ['interrogative ما أعظم', 'من relative', 'مصدر الاعتراف'],
    vocabularyHighlights: [
      { word: 'العَفْو', meaning: 'pardon/forgiveness' },
      { word: 'قَدَرْتَ عَلَيْهِ', meaning: 'you have power over him' },
      { word: 'مُحَارَبَة النَّفْس', meaning: 'fighting the self/ego' },
      { word: 'العَظَمَة', meaning: 'greatness' }
    ],
    moralLesson: 'The greatest courage is the daily struggle against one\'s own flaws.',
    moralLessonAr: 'أعظم الشجاعة هي الجهاد اليومي ضد عيوب النفس.',
    wordCount: 90
  }
];
