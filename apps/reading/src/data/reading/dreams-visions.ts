// src/data/reading/dreams-visions.ts

import { ReadingText } from './types';

/**
 * Dreams & Visions themed reading texts
 * Topics: Prophetic dreams, dream interpretation (Ibn Sirin), sleep mysticism, visions
 * IDs: b205-b210 (beginner), i196-i201 (intermediate), a191-a196 (advanced)
 */
export const dreamsVisionsTexts: ReadingText[] = [
  // ===== BEGINNER (b205-b210) =====
  {
    id: 'b205',
    title: 'The Good Dream',
    titleAr: 'الرُّؤْيَا الصَّالِحَةُ',
    level: 'beginner',
    category: 'dreams-visions',
    categoryAr: 'الرؤى والأحلام',
    text: 'نَامَ أَحْمَدُ وَرَأَى حُلْمًا جَمِيلًا. رَأَى نَفْسَهُ يَطِيرُ فَوْقَ الجِبَالِ. الشَّمْسُ مُشْرِقَةٌ وَالسَّمَاءُ زَرْقَاءُ. اسْتَيْقَظَ سَعِيدًا. أَخْبَرَ أُمَّهُ فَقَالَتْ: هَذِهِ رُؤْيَا صَالِحَةٌ. اشْكُرِ اللهَ عَلَيْهَا. الرُّؤْيَا الصَّالِحَةُ مِنَ اللهِ.',
    translation: 'Ahmad slept and saw a beautiful dream. He saw himself flying over the mountains. The sun was shining and the sky was blue. He woke up happy. He told his mother and she said: This is a good dream. Thank Allah for it. The good dream is from Allah.',
    grammaticalConcepts: ['past tense verbs', 'nominal sentences', 'imperative اشكر'],
    vocabularyHighlights: [
      { word: 'رُؤْيَا', meaning: 'vision/dream (good)' },
      { word: 'حُلْم', meaning: 'dream' },
      { word: 'يَطِيرُ', meaning: 'flies' },
      { word: 'مُشْرِقَة', meaning: 'shining/bright' }
    ],
    moralLesson: 'Good dreams are blessings from Allah to be grateful for.',
    moralLessonAr: 'الرؤى الصالحة نعم من الله يجب شكرها.',
    wordCount: 38
  },
  {
    id: 'b206',
    title: 'The Prophet\'s Dream',
    titleAr: 'رُؤْيَا النَّبِيِّ',
    level: 'beginner',
    category: 'dreams-visions',
    categoryAr: 'الرؤى والأحلام',
    text: 'قَالَ النَّبِيُّ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ: الرُّؤْيَا الصَّالِحَةُ جُزْءٌ مِنْ سِتَّةٍ وَأَرْبَعِينَ جُزْءًا مِنَ النُّبُوَّةِ. وَقَالَ: مَنْ رَآنِي فِي المَنَامِ فَقَدْ رَآنِي حَقًّا. لِأَنَّ الشَّيْطَانَ لَا يَتَمَثَّلُ بِي. الرُّؤْيَا الصَّادِقَةُ بُشْرَى لِلْمُؤْمِنِ.',
    translation: 'The Prophet, peace be upon him, said: The good dream is one part of forty-six parts of prophethood. And he said: Whoever sees me in sleep has truly seen me, because Satan cannot take my form. The true dream is glad tidings for the believer.',
    grammaticalConcepts: ['cardinal numbers', 'من الشرطية', 'لأنّ causative'],
    vocabularyHighlights: [
      { word: 'جُزْء', meaning: 'part/portion' },
      { word: 'النُّبُوَّة', meaning: 'prophethood' },
      { word: 'يَتَمَثَّلُ', meaning: 'takes the form of' },
      { word: 'بُشْرَى', meaning: 'glad tidings' }
    ],
    moralLesson: 'True dreams are connected to divine guidance.',
    moralLessonAr: 'الرؤى الصادقة مرتبطة بالهداية الإلهية.',
    wordCount: 40
  },
  {
    id: 'b207',
    title: 'What to Do After a Dream',
    titleAr: 'مَاذَا نَفْعَلُ بَعْدَ الحُلْمِ',
    level: 'beginner',
    category: 'dreams-visions',
    categoryAr: 'الرؤى والأحلام',
    text: 'عَلَّمَنَا النَّبِيُّ مَاذَا نَفْعَلُ بَعْدَ الأَحْلَامِ. إِذَا رَأَيْتَ حُلْمًا جَمِيلًا: احْمَدِ اللهَ وَأَخْبِرْ مَنْ تُحِبُّ. إِذَا رَأَيْتَ حُلْمًا مُخِيفًا: اسْتَعِذْ بِاللهِ وَانْفُثْ عَنْ يَسَارِكَ ثَلَاثًا. وَلَا تُخْبِرْ بِهِ أَحَدًا. الحُلْمُ السَّيِّئُ مِنَ الشَّيْطَانِ.',
    translation: 'The Prophet taught us what to do after dreams. If you see a beautiful dream: praise Allah and tell those you love. If you see a frightening dream: seek refuge in Allah and blow to your left three times. And do not tell anyone about it. The bad dream is from Satan.',
    grammaticalConcepts: ['conditional إذا', 'imperative forms', 'لا + jussive prohibition'],
    vocabularyHighlights: [
      { word: 'اسْتَعِذْ', meaning: 'seek refuge' },
      { word: 'انْفُثْ', meaning: 'blow lightly' },
      { word: 'يَسَار', meaning: 'left side' },
      { word: 'مُخِيف', meaning: 'frightening' }
    ],
    moralLesson: 'The Prophet taught specific etiquettes for handling dreams.',
    moralLessonAr: 'علّمنا النبي آدابًا خاصة للتعامل مع الأحلام.',
    wordCount: 42
  },
  {
    id: 'b208',
    title: 'Ibrahim\'s Dream',
    titleAr: 'رُؤْيَا إِبْرَاهِيمَ',
    level: 'beginner',
    category: 'dreams-visions',
    categoryAr: 'الرؤى والأحلام',
    text: 'رَأَى إِبْرَاهِيمُ عَلَيْهِ السَّلَامُ فِي المَنَامِ أَنَّهُ يَذْبَحُ ابْنَهُ إِسْمَاعِيلَ. قَالَ لِابْنِهِ: يَا بُنَيَّ، إِنِّي أَرَى فِي المَنَامِ أَنِّي أَذْبَحُكَ. قَالَ إِسْمَاعِيلُ: يَا أَبَتِ، افْعَلْ مَا تُؤْمَرُ. كَانَا مُطِيعَيْنِ للهِ. فَلَمَّا أَرَادَ أَنْ يَذْبَحَهُ، أَرْسَلَ اللهُ كَبْشًا بَدَلًا مِنْهُ.',
    translation: 'Ibrahim, peace be upon him, saw in a dream that he was sacrificing his son Ismail. He said to his son: O my son, I see in the dream that I am sacrificing you. Ismail said: O my father, do what you are commanded. They were both obedient to Allah. When he was about to sacrifice him, Allah sent a ram instead.',
    grammaticalConcepts: ['أنّ with present', 'dual مطيعين', 'لمّا temporal'],
    vocabularyHighlights: [
      { word: 'يَذْبَحُ', meaning: 'sacrifices/slaughters' },
      { word: 'تُؤْمَرُ', meaning: 'you are commanded' },
      { word: 'مُطِيعَين', meaning: 'obedient (dual)' },
      { word: 'كَبْش', meaning: 'ram' }
    ],
    moralLesson: 'Prophetic dreams may contain divine commands requiring obedience.',
    moralLessonAr: 'رؤى الأنبياء قد تحمل أوامر إلهية تستوجب الطاعة.',
    wordCount: 48
  },
  {
    id: 'b209',
    title: 'The Dream Interpreter',
    titleAr: 'مُفَسِّرُ الأَحْلَامِ',
    level: 'beginner',
    category: 'dreams-visions',
    categoryAr: 'الرؤى والأحلام',
    text: 'ذَهَبَ رَجُلٌ إِلَى عَالِمٍ وَقَالَ: رَأَيْتُ فِي حُلْمِي أَنِّي أَسْقُطُ ثُمَّ أَطِيرُ. قَالَ العَالِمُ: السُّقُوطُ يَعْنِي صُعُوبَةً سَتَمُرُّ بِهَا. وَالطَّيَرَانُ يَعْنِي النَّجَاحَ بَعْدَهَا. فَلَا تَخَفْ. اصْبِرْ وَسَتَنْجَحُ. شَكَرَهُ الرَّجُلُ وَذَهَبَ مُطْمَئِنًّا.',
    translation: 'A man went to a scholar and said: I saw in my dream that I fall then fly. The scholar said: Falling means difficulty you will go through. And flying means success after it. So do not fear. Be patient and you will succeed. The man thanked him and left reassured.',
    grammaticalConcepts: ['أنّ with present', 'سوف future', 'imperative اصبر'],
    vocabularyHighlights: [
      { word: 'مُفَسِّر', meaning: 'interpreter' },
      { word: 'أَسْقُطُ', meaning: 'I fall' },
      { word: 'صُعُوبَة', meaning: 'difficulty' },
      { word: 'مُطْمَئِنًّا', meaning: 'reassured' }
    ],
    moralLesson: 'Dream interpretation requires knowledge and wisdom.',
    moralLessonAr: 'تفسير الأحلام يحتاج علمًا وحكمة.',
    wordCount: 40
  },
  {
    id: 'b210',
    title: 'The King\'s Dream',
    titleAr: 'حُلْمُ المَلِكِ',
    level: 'beginner',
    category: 'dreams-visions',
    categoryAr: 'الرؤى والأحلام',
    text: 'رَأَى مَلِكُ مِصْرَ حُلْمًا غَرِيبًا. رَأَى سَبْعَ بَقَرَاتٍ سِمَانٍ تَأْكُلُهَا سَبْعُ بَقَرَاتٍ عِجَافٍ. لَمْ يَفْهَمْ أَحَدٌ الحُلْمَ. جَاءُوا بِيُوسُفَ مِنَ السِّجْنِ. قَالَ: سَتَأْتِي سَبْعُ سَنَوَاتٍ خِصْبَةٍ ثُمَّ سَبْعُ سَنَوَاتٍ قَحْطٍ. اخْزِنُوا الطَّعَامَ! أَعْجَبَ المَلِكُ بِيُوسُفَ وَجَعَلَهُ وَزِيرًا.',
    translation: 'The king of Egypt saw a strange dream. He saw seven fat cows being eaten by seven lean cows. No one understood the dream. They brought Yusuf from prison. He said: Seven fertile years will come then seven years of drought. Store the food! The king was impressed by Yusuf and made him a minister.',
    grammaticalConcepts: ['cardinal numbers', 'future ستأتي', 'imperative اخزنوا'],
    vocabularyHighlights: [
      { word: 'سِمَان', meaning: 'fat (plural)' },
      { word: 'عِجَاف', meaning: 'lean/thin (plural)' },
      { word: 'خِصْبَة', meaning: 'fertile' },
      { word: 'قَحْط', meaning: 'drought/famine' }
    ],
    moralLesson: 'Allah grants some people the gift of interpreting dreams.',
    moralLessonAr: 'الله يمنح بعض الناس موهبة تفسير الأحلام.',
    wordCount: 46
  },

  // ===== INTERMEDIATE (i196-i201) =====
  {
    id: 'i196',
    title: 'Yusuf\'s Childhood Dream',
    titleAr: 'رُؤْيَا يُوسُفَ فِي طُفُولَتِهِ',
    level: 'intermediate',
    category: 'dreams-visions',
    categoryAr: 'الرؤى والأحلام',
    text: 'قَالَ يُوسُفُ لِأَبِيهِ يَعْقُوبَ: يَا أَبَتِ، إِنِّي رَأَيْتُ أَحَدَ عَشَرَ كَوْكَبًا وَالشَّمْسَ وَالقَمَرَ رَأَيْتُهُمْ لِي سَاجِدِينَ. قَالَ يَعْقُوبُ: يَا بُنَيَّ، لَا تَقْصُصْ رُؤْيَاكَ عَلَى إِخْوَتِكَ فَيَكِيدُوا لَكَ كَيْدًا. إِنَّ الشَّيْطَانَ لِلْإِنْسَانِ عَدُوٌّ مُبِينٌ. مَرَّتِ السَّنَوَاتُ وَتَحَقَّقَتِ الرُّؤْيَا. صَارَ يُوسُفُ عَزِيزَ مِصْرَ، وَسَجَدَ لَهُ أَبَوَاهُ وَإِخْوَتُهُ الأَحَدَ عَشَرَ.',
    translation: 'Yusuf said to his father Yaqub: O my father, I saw eleven stars, the sun and the moon—I saw them prostrating to me. Yaqub said: O my son, do not relate your vision to your brothers lest they plot against you. Indeed, Satan is a clear enemy to man. Years passed and the vision came true. Yusuf became the Aziz of Egypt, and his parents and eleven brothers prostrated to him.',
    grammaticalConcepts: ['cardinal أحد عشر', 'لا + jussive prohibition', 'فاء السببية'],
    vocabularyHighlights: [
      { word: 'كَوْكَب', meaning: 'star/planet' },
      { word: 'سَاجِدِين', meaning: 'prostrating' },
      { word: 'يَكِيدُوا', meaning: 'plot against' },
      { word: 'عَزِيز', meaning: 'minister/dear one' }
    ],
    moralLesson: 'True dreams from Allah inevitably come to pass.',
    moralLessonAr: 'الرؤى الصادقة من الله لا بد أن تتحقق.',
    wordCount: 65
  },
  {
    id: 'i197',
    title: 'Ibn Sirin the Interpreter',
    titleAr: 'ابْنُ سِيرِينَ المُفَسِّرُ',
    level: 'intermediate',
    category: 'dreams-visions',
    categoryAr: 'الرؤى والأحلام',
    text: 'كَانَ مُحَمَّدُ بْنُ سِيرِينَ أَشْهَرَ مُفَسِّرٍ لِلْأَحْلَامِ فِي التَّارِيخِ الإِسْلَامِيِّ. جَاءَهُ رَجُلٌ وَقَالَ: رَأَيْتُ أَنِّي أُؤَذِّنُ فِي المَنَامِ. قَالَ ابْنُ سِيرِينَ: سَتَحُجُّ إِنْ شَاءَ اللهُ. جَاءَهُ آخَرُ بِنَفْسِ الرُّؤْيَا. قَالَ لَهُ: أَخْشَى أَنْ تُقْطَعَ يَدُكَ بِسَبَبِ سَرِقَةٍ! تَعَجَّبَ النَّاسُ. قَالَ: الأَوَّلُ صَالِحٌ فَفَسَّرْتُ لَهُ بِالخَيْرِ. وَالثَّانِي مَعْرُوفٌ بِالسَّرِقَةِ. التَّفْسِيرُ يَخْتَلِفُ بِحَالِ الرَّائِي.',
    translation: 'Muhammad ibn Sirin was the most famous dream interpreter in Islamic history. A man came to him and said: I saw that I was giving the adhan in my sleep. Ibn Sirin said: You will perform Hajj, God willing. Another came with the same vision. He told him: I fear your hand will be cut for theft! People were amazed. He said: The first is righteous so I interpreted it well. The second is known for stealing. Interpretation differs according to the dreamer\'s state.',
    grammaticalConcepts: ['أنّ with present', 'passive تُقطع', 'بـ causative'],
    vocabularyHighlights: [
      { word: 'أُؤَذِّنُ', meaning: 'I give the call to prayer' },
      { word: 'تَعَجَّبَ', meaning: 'was amazed' },
      { word: 'الرَّائِي', meaning: 'the dreamer/seer' },
      { word: 'حَال', meaning: 'state/condition' }
    ],
    moralLesson: 'Dream interpretation considers the dreamer\'s character and circumstances.',
    moralLessonAr: 'تفسير الأحلام يراعي شخصية الرائي وظروفه.',
    wordCount: 68
  },
  {
    id: 'i198',
    title: 'The Dream Before Badr',
    titleAr: 'الرُّؤْيَا قَبْلَ بَدْرٍ',
    level: 'intermediate',
    category: 'dreams-visions',
    categoryAr: 'الرؤى والأحلام',
    text: 'قَبْلَ مَعْرَكَةِ بَدْرٍ، رَأَى النَّبِيُّ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ رُؤْيَا صَادِقَةً. رَأَى جَيْشَ الكُفَّارِ قَلِيلًا فِي عَيْنِهِ. أَخْبَرَ الصَّحَابَةَ فَامْتَلَأَتْ قُلُوبُهُمْ شَجَاعَةً. وَفِي المَعْرَكَةِ، أَرَاهُمُ اللهُ الكُفَّارَ قَلِيلًا أَيْضًا. هَذِهِ الرُّؤْيَا كَانَتْ بِشَارَةً بِالنَّصْرِ. وَنَزَلَ القُرْآنُ يَذْكُرُهَا: إِذْ يُرِيكَهُمُ اللهُ فِي مَنَامِكَ قَلِيلًا.',
    translation: 'Before the Battle of Badr, the Prophet, peace be upon him, saw a true vision. He saw the disbelievers\' army as few in his eye. He told the Companions and their hearts filled with courage. In the battle, Allah also showed them the disbelievers as few. This vision was glad tidings of victory. And the Quran was revealed mentioning it: "When Allah showed them to you in your dream as few."',
    grammaticalConcepts: ['حال قليلاً', 'إذ temporal', 'كان with خبر'],
    vocabularyHighlights: [
      { word: 'صَادِقَة', meaning: 'true/truthful' },
      { word: 'الكُفَّار', meaning: 'disbelievers' },
      { word: 'بِشَارَة', meaning: 'glad tidings' },
      { word: 'نَصْر', meaning: 'victory' }
    ],
    moralLesson: 'Divine dreams can prepare believers for upcoming challenges.',
    moralLessonAr: 'الرؤى الإلهية يمكن أن تُعِدّ المؤمنين للتحديات القادمة.',
    wordCount: 62
  },
  {
    id: 'i199',
    title: 'Symbols in Dreams',
    titleAr: 'الرُّمُوزُ فِي الأَحْلَامِ',
    level: 'intermediate',
    category: 'dreams-visions',
    categoryAr: 'الرؤى والأحلام',
    text: 'لِلْأَحْلَامِ لُغَةٌ رَمْزِيَّةٌ تَحْتَاجُ فَهْمًا. المَاءُ الصَّافِي يَدُلُّ عَلَى العِلْمِ وَالرِّزْقِ. النَّارُ قَدْ تَعْنِي الفِتْنَةَ أَوِ الغَضَبَ. الطَّيَرَانُ يُشِيرُ إِلَى الرِّفْعَةِ وَالمَكَانَةِ. السُّقُوطُ قَدْ يَدُلُّ عَلَى الخَوْفِ أَوِ التَّغْيِيرِ. رُؤْيَةُ المَيِّتِ حَيًّا قَدْ تَكُونُ رِسَالَةً مِنْهُ. لَكِنَّ التَّفْسِيرَ يَعْتَمِدُ عَلَى السِّيَاقِ وَحَالِ الرَّائِي وَمَا يَمُرُّ بِهِ.',
    translation: 'Dreams have a symbolic language that needs understanding. Clear water indicates knowledge and provision. Fire may mean tribulation or anger. Flying points to elevation and status. Falling may indicate fear or change. Seeing the dead alive may be a message from them. But interpretation depends on context, the dreamer\'s state, and what they are going through.',
    grammaticalConcepts: ['يدلّ على', 'قد للاحتمال', 'ما الموصولة'],
    vocabularyHighlights: [
      { word: 'رَمْزِيَّة', meaning: 'symbolic' },
      { word: 'يَدُلُّ', meaning: 'indicates' },
      { word: 'رِفْعَة', meaning: 'elevation/honor' },
      { word: 'سِيَاق', meaning: 'context' }
    ],
    moralLesson: 'Dream symbols have meanings but require contextual interpretation.',
    moralLessonAr: 'رموز الأحلام لها معانٍ لكنها تحتاج تفسيرًا سياقيًّا.',
    wordCount: 58
  },
  {
    id: 'i200',
    title: 'The Mother of the Believers\' Dream',
    titleAr: 'رُؤْيَا أُمِّ المُؤْمِنِينَ',
    level: 'intermediate',
    category: 'dreams-visions',
    categoryAr: 'الرؤى والأحلام',
    text: 'رَأَتْ عَائِشَةُ رَضِيَ اللهُ عَنْهَا أَنَّ ثَلَاثَةَ أَقْمَارٍ سَقَطَتْ فِي حُجْرَتِهَا. أَخْبَرَتْ أَبَاهَا أَبَا بَكْرٍ فَسَكَتَ. لَمَّا تُوُفِّيَ النَّبِيُّ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ وَدُفِنَ فِي حُجْرَتِهَا، قَالَ لَهَا أَبُوهَا: هَذَا أَوَّلُ أَقْمَارِكِ وَأَفْضَلُهَا. ثُمَّ دُفِنَ أَبُو بَكْرٍ وَعُمَرُ فِي نَفْسِ الحُجْرَةِ. تَحَقَّقَتِ الرُّؤْيَا بِدَفْنِ ثَلَاثَةٍ مِنْ خَيْرِ البَشَرِ.',
    translation: 'Aisha, may Allah be pleased with her, saw that three moons fell into her room. She told her father Abu Bakr and he was silent. When the Prophet, peace be upon him, passed away and was buried in her room, her father told her: This is the first of your moons and the best of them. Then Abu Bakr and Umar were buried in the same room. The vision was fulfilled by the burial of three of the best of mankind.',
    grammaticalConcepts: ['لمّا temporal', 'passive دُفِنَ', 'superlative أفضلها'],
    vocabularyHighlights: [
      { word: 'أَقْمَار', meaning: 'moons' },
      { word: 'حُجْرَة', meaning: 'room/chamber' },
      { word: 'تُوُفِّيَ', meaning: 'passed away' },
      { word: 'تَحَقَّقَت', meaning: 'came true/was fulfilled' }
    ],
    moralLesson: 'True dreams may reveal future events in symbolic form.',
    moralLessonAr: 'الرؤى الصادقة قد تكشف أحداثًا مستقبلية بشكل رمزي.',
    wordCount: 64
  },
  {
    id: 'i201',
    title: 'Types of Dreams',
    titleAr: 'أَنْوَاعُ الأَحْلَامِ',
    level: 'intermediate',
    category: 'dreams-visions',
    categoryAr: 'الرؤى والأحلام',
    text: 'قَسَّمَ العُلَمَاءُ الأَحْلَامَ إِلَى ثَلَاثَةِ أَنْوَاعٍ. الأَوَّلُ: الرُّؤْيَا الصَّالِحَةُ مِنَ اللهِ، وَهِيَ بُشْرَى أَوْ تَحْذِيرٌ. الثَّانِي: حَدِيثُ النَّفْسِ، وَهُوَ مَا يَشْغَلُ الإِنْسَانَ فِي يَقَظَتِهِ فَيَرَاهُ فِي نَوْمِهِ. الثَّالِثُ: التَّخْوِيفُ مِنَ الشَّيْطَانِ، وَهُوَ الكَابُوسُ المُزْعِجُ. الرُّؤْيَا الصَّالِحَةُ تَأْتِي قُبَيْلَ الفَجْرِ غَالِبًا، وَتَكُونُ وَاضِحَةً لَا تُنْسَى.',
    translation: 'Scholars divided dreams into three types. The first: the good vision from Allah, which is glad tidings or warning. The second: self-talk, which is what occupies a person while awake so they see it in sleep. The third: frightening from Satan, which is the disturbing nightmare. The good vision usually comes shortly before dawn, and is clear and unforgettable.',
    grammaticalConcepts: ['ما الموصولة', 'إلى للتقسيم', 'تصغير قُبيل'],
    vocabularyHighlights: [
      { word: 'تَحْذِير', meaning: 'warning' },
      { word: 'يَقَظَة', meaning: 'wakefulness' },
      { word: 'كَابُوس', meaning: 'nightmare' },
      { word: 'قُبَيْلَ', meaning: 'shortly before' }
    ],
    moralLesson: 'Understanding dream types helps distinguish divine messages from other dreams.',
    moralLessonAr: 'فهم أنواع الأحلام يساعد على تمييز الرسائل الإلهية من غيرها.',
    wordCount: 60
  },

  // ===== ADVANCED (a191-a196) =====
  {
    id: 'a191',
    title: 'The Prisoners\' Dreams',
    titleAr: 'رُؤْيَا السَّجِينَيْنِ',
    level: 'advanced',
    category: 'dreams-visions',
    categoryAr: 'الرؤى والأحلام',
    text: 'فِي السِّجْنِ، جَاءَ يُوسُفَ فَتَيَانِ يَسْأَلَانِهِ عَنْ رُؤْيَاهُمَا. قَالَ الأَوَّلُ: إِنِّي أَرَانِي أَعْصِرُ خَمْرًا. وَقَالَ الآخَرُ: إِنِّي أَرَانِي أَحْمِلُ فَوْقَ رَأْسِي خُبْزًا تَأْكُلُ الطَّيْرُ مِنْهُ. قَالَ يُوسُفُ لِلْأَوَّلِ: سَتَعُودُ لِخِدْمَةِ المَلِكِ وَتَسْقِيهِ الخَمْرَ. وَقَالَ لِلثَّانِي: سَتُصْلَبُ فَتَأْكُلُ الطَّيْرُ مِنْ رَأْسِكَ. قُضِيَ الأَمْرُ الَّذِي فِيهِ تَسْتَفْتِيَانِ. تَحَقَّقَ كُلُّ شَيْءٍ كَمَا قَالَ يُوسُفُ.',
    translation: 'In prison, two young men came to Yusuf asking about their dreams. The first said: I see myself pressing wine. The other said: I see myself carrying bread on my head from which birds eat. Yusuf told the first: You will return to serve the king and give him wine. He told the second: You will be crucified and birds will eat from your head. The matter you inquire about has been decided. Everything came true as Yusuf said.',
    grammaticalConcepts: ['أراني + present', 'dual تستفتيان', 'passive قُضِيَ'],
    vocabularyHighlights: [
      { word: 'أَعْصِرُ', meaning: 'I press/squeeze' },
      { word: 'خَمْر', meaning: 'wine' },
      { word: 'تُصْلَبُ', meaning: 'you will be crucified' },
      { word: 'تَسْتَفْتِيَانِ', meaning: 'you two inquire about' }
    ],
    moralLesson: 'Yusuf\'s interpretations show that dreams can reveal fixed destinies.',
    moralLessonAr: 'تفسيرات يوسف تُظهر أن الأحلام قد تكشف أقدارًا محتومة.',
    wordCount: 75
  },
  {
    id: 'a192',
    title: 'The Philosophy of Dreams in Islam',
    titleAr: 'فَلْسَفَةُ الأَحْلَامِ فِي الإِسْلَامِ',
    level: 'advanced',
    category: 'dreams-visions',
    categoryAr: 'الرؤى والأحلام',
    text: 'تَسَاءَلَ الفَلَاسِفَةُ المُسْلِمُونَ: كَيْفَ تَرَى الرُّوحُ مَا لَمْ يَحْدُثْ بَعْدُ؟ قَالَ ابْنُ سِينَا: الرُّوحُ فِي النَّوْمِ تَتَحَرَّرُ مِنْ قُيُودِ الجَسَدِ فَتَتَّصِلُ بِعَالَمِ الغَيْبِ. وَقَالَ الغَزَالِيُّ: النَّوْمُ أَخُو المَوْتِ، وَفِيهِ تُعَايِنُ النَّفْسُ حَقَائِقَ لَا تَرَاهَا يَقَظَةً. الرُّؤْيَا الصَّادِقَةُ نَافِذَةٌ صَغِيرَةٌ يُفْتَحُ مِنْهَا الحِجَابُ بَيْنَ عَالَمِ الشَّهَادَةِ وَعَالَمِ الغَيْبِ لَحْظَاتٍ.',
    translation: 'Muslim philosophers wondered: How does the soul see what has not yet happened? Ibn Sina said: The soul in sleep is freed from the body\'s constraints and connects to the unseen world. Al-Ghazali said: Sleep is the brother of death, and in it the soul witnesses realities it cannot see while awake. The true dream is a small window through which the veil between the visible and unseen worlds is briefly opened.',
    grammaticalConcepts: ['ما الموصولة مع لم', 'مصدر يقظة', 'passive يُفتح'],
    vocabularyHighlights: [
      { word: 'تَتَحَرَّرُ', meaning: 'is freed' },
      { word: 'قُيُود', meaning: 'constraints/chains' },
      { word: 'تُعَايِنُ', meaning: 'witnesses/observes' },
      { word: 'حِجَاب', meaning: 'veil/barrier' }
    ],
    moralLesson: 'Islamic philosophy sees dreams as moments when the soul transcends physical limits.',
    moralLessonAr: 'الفلسفة الإسلامية ترى الأحلام لحظات تتجاوز فيها الروح الحدود المادية.',
    wordCount: 78
  },
  {
    id: 'a193',
    title: 'The Caliph\'s Warning Dream',
    titleAr: 'رُؤْيَا الخَلِيفَةِ التَّحْذِيرِيَّةُ',
    level: 'advanced',
    category: 'dreams-visions',
    categoryAr: 'الرؤى والأحلام',
    text: 'رَأَى الخَلِيفَةُ المَأْمُونُ فِي مَنَامِهِ أَرِسْطُو يُحَادِثُهُ. سَأَلَهُ المَأْمُونُ: مَا الخَيْرُ؟ قَالَ: مَا حَسُنَ فِي العَقْلِ. قَالَ: ثُمَّ مَاذَا؟ قَالَ: مَا حَسُنَ فِي الشَّرْعِ. قَالَ: ثُمَّ مَاذَا؟ قَالَ: مَا حَسُنَ عِنْدَ الجُمْهُورِ. قَالَ: ثُمَّ مَاذَا؟ قَالَ: لَا ثُمَّ. اسْتَيْقَظَ المَأْمُونُ وَأَمَرَ بِتَرْجَمَةِ كُتُبِ الفَلَاسِفَةِ. هَذِهِ الرُّؤْيَا غَيَّرَتْ تَارِيخَ العِلْمِ الإِسْلَامِيِّ.',
    translation: 'Caliph al-Ma\'mun saw Aristotle conversing with him in his dream. Al-Ma\'mun asked: What is good? He said: What is good in reason. He said: Then what? He said: What is good in divine law. He said: Then what? He said: What is good among the masses. He said: Then what? He said: No more. Al-Ma\'mun woke up and ordered the translation of philosophers\' books. This dream changed the history of Islamic science.',
    grammaticalConcepts: ['ما الاستفهامية', 'حَسُنَ فِي', 'أمر بـ'],
    vocabularyHighlights: [
      { word: 'يُحَادِثُهُ', meaning: 'conversing with him' },
      { word: 'العَقْل', meaning: 'reason/intellect' },
      { word: 'الشَّرْع', meaning: 'divine law' },
      { word: 'الجُمْهُور', meaning: 'the masses/public' }
    ],
    moralLesson: 'Dreams have influenced major historical and intellectual movements.',
    moralLessonAr: 'الأحلام أثّرت في حركات تاريخية وفكرية كبرى.',
    wordCount: 80
  },
  {
    id: 'a194',
    title: 'Dreams of the Righteous',
    titleAr: 'رُؤَى الصَّالِحِينَ',
    level: 'advanced',
    category: 'dreams-visions',
    categoryAr: 'الرؤى والأحلام',
    text: 'قَالَ ابْنُ القَيِّمِ: رُؤَى الصَّالِحِينَ أَصْدَقُ مِنْ رُؤَى غَيْرِهِمْ. لِأَنَّ قُلُوبَهُمْ صَافِيَةٌ كَالمِرْآةِ المَجْلُوَّةِ تَعْكِسُ الحَقَائِقَ. وَكُلَّمَا صَدَقَ العَبْدُ فِي يَقَظَتِهِ صَدَقَتْ رُؤْيَاهُ فِي مَنَامِهِ. الكَاذِبُ لَا يَصْدُقُ حُلْمُهُ. وَالفَاسِقُ تَخْتَلِطُ رُؤَاهُ بِالأَبَاطِيلِ. النَّفْسُ الزَّكِيَّةُ تَرَى مَا لَا تَرَاهُ النَّفْسُ الكَدِرَةُ. لِذَلِكَ كَانَتْ رُؤَى الأَنْبِيَاءِ وَحْيًا.',
    translation: 'Ibn al-Qayyim said: The visions of the righteous are truer than others\'. Because their hearts are pure like polished mirrors reflecting realities. The more truthful a servant is while awake, the truer his dream in sleep. The liar\'s dream is not true. The corrupt one\'s visions mix with falsehoods. The pure soul sees what the murky soul cannot. Therefore, the prophets\' dreams were revelation.',
    grammaticalConcepts: ['comparative أصدق', 'كلّما...', 'لذلك causative'],
    vocabularyHighlights: [
      { word: 'المَجْلُوَّة', meaning: 'polished' },
      { word: 'الفَاسِق', meaning: 'the corrupt/sinful one' },
      { word: 'أَبَاطِيل', meaning: 'falsehoods' },
      { word: 'الكَدِرَة', meaning: 'murky/turbid' }
    ],
    moralLesson: 'Spiritual purity directly correlates with the truthfulness of dreams.',
    moralLessonAr: 'النقاء الروحي يرتبط مباشرة بصدق الأحلام.',
    wordCount: 76
  },
  {
    id: 'a195',
    title: 'The Interpretation Controversy',
    titleAr: 'خِلَافُ التَّفْسِيرِ',
    level: 'advanced',
    category: 'dreams-visions',
    categoryAr: 'الرؤى والأحلام',
    text: 'اخْتَلَفَ العُلَمَاءُ: هَلْ تَقَعُ الرُّؤْيَا عَلَى مَا فُسِّرَتْ بِهِ؟ قَالَ بَعْضُهُمْ: نَعَمْ، لِقَوْلِ النَّبِيِّ: الرُّؤْيَا عَلَى رِجْلِ طَائِرٍ، فَإِذَا فُسِّرَتْ وَقَعَتْ. لِذَلِكَ لَا تَقُصَّ رُؤْيَاكَ إِلَّا عَلَى عَالِمٍ أَوْ نَاصِحٍ. وَقَالَ آخَرُونَ: الرُّؤْيَا مُقَدَّرَةٌ قَبْلَ التَّفْسِيرِ، وَالتَّفْسِيرُ يَكْشِفُهَا لَا يُغَيِّرُهَا. وَالحَقُّ أَنَّ الدُّعَاءَ قَدْ يَصْرِفُ السُّوءَ المَرْئِيَّ فِي المَنَامِ.',
    translation: 'Scholars differed: Does a dream happen according to how it\'s interpreted? Some said: Yes, based on the Prophet\'s saying: "A dream is on the leg of a bird; when interpreted, it occurs." Therefore, do not tell your dream except to a scholar or a sincere advisor. Others said: The dream is predetermined before interpretation, and interpretation reveals it but doesn\'t change it. The truth is that supplication may avert the evil seen in dreams.',
    grammaticalConcepts: ['هل الاستفهامية', 'passive فُسِّرَت', 'إلّا استثناء'],
    vocabularyHighlights: [
      { word: 'رِجْل طَائِر', meaning: 'leg of a bird (idiom: suspended)' },
      { word: 'نَاصِح', meaning: 'sincere advisor' },
      { word: 'مُقَدَّرَة', meaning: 'predetermined' },
      { word: 'يَصْرِفُ', meaning: 'averts/turns away' }
    ],
    moralLesson: 'Dream interpretation carries responsibility and should be done carefully.',
    moralLessonAr: 'تفسير الأحلام يحمل مسؤولية ويجب أن يتم بحذر.',
    wordCount: 82
  },
  {
    id: 'a196',
    title: 'The Last Dream',
    titleAr: 'الرُّؤْيَا الأَخِيرَةُ',
    level: 'advanced',
    category: 'dreams-visions',
    categoryAr: 'الرؤى والأحلام',
    text: 'رَأَى النَّبِيُّ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ فِي مَرَضِهِ الأَخِيرِ رُؤْيَا. رَأَى كَأَنَّ دَلْوًا نَزَلَ مِنَ السَّمَاءِ فَأَخَذَهُ أَبُو بَكْرٍ فَشَرِبَ، ثُمَّ أَخَذَهُ عُمَرُ فَشَرِبَ حَتَّى رَوِيَ، ثُمَّ أَخَذَهُ عُثْمَانُ فَشَرِبَ. فُسِّرَتِ الرُّؤْيَا بِخِلَافَةِ الثَّلَاثَةِ بَعْدَهُ. الدَّلْوُ هُوَ الخِلَافَةُ، وَالشُّرْبُ هُوَ تَوَلِّيهَا. وَهَكَذَا وَقَعَتِ الرُّؤْيَا كَمَا رَآهَا صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ.',
    translation: 'The Prophet, peace be upon him, saw a vision in his final illness. He saw as if a bucket descended from the sky, Abu Bakr took it and drank, then Umar took it and drank until satisfied, then Uthman took it and drank. The vision was interpreted as the caliphate of the three after him. The bucket is the caliphate, and drinking is assuming it. Thus the vision occurred as he saw it, peace be upon him.',
    grammaticalConcepts: ['كأنّ للتشبيه', 'حتى + past', 'passive فُسِّرَت'],
    vocabularyHighlights: [
      { word: 'دَلْو', meaning: 'bucket' },
      { word: 'رَوِيَ', meaning: 'was satisfied (thirst)' },
      { word: 'خِلَافَة', meaning: 'caliphate' },
      { word: 'تَوَلِّي', meaning: 'assuming (office)' }
    ],
    moralLesson: 'The Prophet\'s dreams foretold significant events in Islamic history.',
    moralLessonAr: 'أحلام النبي تنبأت بأحداث مهمة في التاريخ الإسلامي.',
    wordCount: 78
  }
];
