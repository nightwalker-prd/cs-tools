// src/data/reading/ghazal.ts
// Ghazal & Love Poetry - Vivid imagery celebrating love, beauty, and longing

import { ReadingText } from './types';

export const ghazalTexts: ReadingText[] = [
  // ===== BEGINNER (b127-b132) =====
  {
    id: 'b127',
    title: "The Beloved's Eyes",
    titleAr: 'عُيُونُ الحَبِيبِ',
    level: 'beginner',
    category: 'ghazal-love-poetry',
    categoryAr: 'الغزل والشعر العاطفي',
    text: `عُيُونُ الحَبِيبِ كَالبَحْرِ العَمِيقِ. فِيهَا أَغْرَقُ كُلَّ يَوْمٍ وَلَا أُرِيدُ النَّجَاةَ. هِيَ سَوْدَاءُ كَاللَّيْلِ، لَكِنَّهَا تُضِيءُ حَيَاتِي. حِينَ تَنْظُرُ إِلَيَّ، أَنْسَى كُلَّ شَيْءٍ. العَالَمُ يَخْتَفِي وَلَا يَبْقَى إِلَّا تِلْكَ العُيُونُ.`,
    translation: `The beloved's eyes are like the deep sea. In them I drown every day and do not want to be saved. They are black as the night, yet they illuminate my life. When they look at me, I forget everything. The world disappears and nothing remains but those eyes.`,
    grammaticalConcepts: ['comparison with كَـ', 'negation with لَا', 'conditional حِينَ'],
    vocabularyHighlights: [
      { word: 'أَغْرَقُ', meaning: 'I drown' },
      { word: 'النَّجَاةَ', meaning: 'salvation, rescue' },
      { word: 'تُضِيءُ', meaning: 'illuminates' },
      { word: 'يَخْتَفِي', meaning: 'disappears' }
    ],
    moralLesson: 'Love transforms our perception of the world.',
    moralLessonAr: 'الحُبُّ يُغَيِّرُ نَظْرَتَنَا لِلْعَالَمِ.',
    wordCount: 38
  },
  {
    id: 'b128',
    title: 'The Rose and the Nightingale',
    titleAr: 'الوَرْدَةُ وَالبُلْبُلُ',
    level: 'beginner',
    category: 'ghazal-love-poetry',
    categoryAr: 'الغزل والشعر العاطفي',
    text: `البُلْبُلُ يُغَنِّي لِلْوَرْدَةِ كُلَّ لَيْلَةٍ. هُوَ يُحِبُّهَا لَكِنَّهُ لَا يَسْتَطِيعُ لَمْسَهَا. الأَشْوَاكُ تَحْمِيهَا مِنْهُ. فَيَبْكِي بِصَوْتِهِ العَذْبِ. هَكَذَا العَاشِقُ: يُحِبُّ مِنْ بَعِيدٍ، وَيَحْتَرِقُ بِنَارِ الشَّوْقِ.`,
    translation: `The nightingale sings to the rose every night. He loves her but cannot touch her. The thorns protect her from him. So he weeps with his sweet voice. Such is the lover: loving from afar, burning in the fire of longing.`,
    grammaticalConcepts: ['present tense verbs', 'possession with ـهَا', 'comparison هَكَذَا'],
    vocabularyHighlights: [
      { word: 'البُلْبُلُ', meaning: 'nightingale' },
      { word: 'الأَشْوَاكُ', meaning: 'thorns' },
      { word: 'العَذْبِ', meaning: 'sweet, melodious' },
      { word: 'يَحْتَرِقُ', meaning: 'burns' }
    ],
    moralLesson: 'Sometimes love means accepting distance with grace.',
    moralLessonAr: 'أَحْيَانًا الحُبُّ يَعْنِي قَبُولَ البُعْدِ بِرِضًا.',
    wordCount: 36
  },
  {
    id: 'b129',
    title: 'The Night of Separation',
    titleAr: 'لَيْلَةُ الفِرَاقِ',
    level: 'beginner',
    category: 'ghazal-love-poetry',
    categoryAr: 'الغزل والشعر العاطفي',
    text: `اللَّيْلَةُ طَوِيلَةٌ بِدُونِكَ. السَّاعَاتُ لَا تَمُرُّ. القَمَرُ حَزِينٌ مِثْلِي. النُّجُومُ تَبْكِي دُمُوعًا مِنْ نُورٍ. أَنْتَظِرُ الفَجْرَ لَكِنَّهُ لَا يَأْتِي. كُلُّ شَيْءٍ يَذْكُرُنِي بِكَ. حَتَّى الصَّمْتُ يَنْطِقُ بِاسْمِكَ.`,
    translation: `The night is long without you. The hours do not pass. The moon is sad like me. The stars weep tears of light. I wait for dawn but it does not come. Everything reminds me of you. Even the silence speaks your name.`,
    grammaticalConcepts: ['adjective agreement', 'negation with لَا', 'preposition بِـ'],
    vocabularyHighlights: [
      { word: 'الفِرَاقِ', meaning: 'separation' },
      { word: 'تَمُرُّ', meaning: 'pass (time)' },
      { word: 'الفَجْرَ', meaning: 'dawn' },
      { word: 'يَنْطِقُ', meaning: 'speaks, pronounces' }
    ],
    moralLesson: 'In absence, the beloved becomes present everywhere.',
    moralLessonAr: 'فِي الغِيَابِ يُصْبِحُ الحَبِيبُ حَاضِرًا فِي كُلِّ مَكَانٍ.',
    wordCount: 37
  },
  {
    id: 'b130',
    title: 'The Garden of Love',
    titleAr: 'حَدِيقَةُ الحُبِّ',
    level: 'beginner',
    category: 'ghazal-love-poetry',
    categoryAr: 'الغزل والشعر العاطفي',
    text: `قَلْبِي حَدِيقَةٌ وَأَنْتِ رَبِيعُهَا. حِينَ تَأْتِينَ، تَتَفَتَّحُ الأَزْهَارُ. حِينَ تَغِيبِينَ، يَذْبُلُ كُلُّ شَيْءٍ. ابْتِسَامَتُكِ شَمْسٌ تُنِيرُ الظَّلَامَ. صَوْتُكِ مَاءٌ يَسْقِي الزُّهُورَ. بِدُونِكِ أَنَا صَحْرَاءُ قَاحِلَةٌ.`,
    translation: `My heart is a garden and you are its spring. When you come, the flowers bloom. When you are absent, everything withers. Your smile is a sun that lights the darkness. Your voice is water that nourishes the flowers. Without you I am a barren desert.`,
    grammaticalConcepts: ['metaphor structure', 'conditional حِينَ', 'feminine address'],
    vocabularyHighlights: [
      { word: 'رَبِيعُهَا', meaning: 'its spring' },
      { word: 'تَتَفَتَّحُ', meaning: 'bloom, open' },
      { word: 'يَذْبُلُ', meaning: 'withers' },
      { word: 'قَاحِلَةٌ', meaning: 'barren, arid' }
    ],
    moralLesson: 'Love brings life to the heart like spring to a garden.',
    moralLessonAr: 'الحُبُّ يُحْيِي القَلْبَ كَمَا يُحْيِي الرَّبِيعُ الحَدِيقَةَ.',
    wordCount: 35
  },
  {
    id: 'b131',
    title: 'The Moonlit Face',
    titleAr: 'وَجْهٌ كَالقَمَرِ',
    level: 'beginner',
    category: 'ghazal-love-poetry',
    categoryAr: 'الغزل والشعر العاطفي',
    text: `وَجْهُهَا كَالقَمَرِ فِي لَيْلَةٍ صَافِيَةٍ. شَعْرُهَا كَاللَّيْلِ الطَّوِيلِ. عَيْنَاهَا نَجْمَتَانِ تَلْمَعَانِ. خَدَّاهَا وَرْدَتَانِ حَمْرَاوَانِ. شِفَاهُهَا عَسَلٌ حُلْوٌ. كُلَّمَا نَظَرْتُ إِلَيْهَا، نَسِيتُ أَنْ أَتَنَفَّسَ.`,
    translation: `Her face is like the moon on a clear night. Her hair is like the long night. Her eyes are two shining stars. Her cheeks are two red roses. Her lips are sweet honey. Whenever I look at her, I forget to breathe.`,
    grammaticalConcepts: ['dual form', 'comparison with كَـ', 'كُلَّمَا conditional'],
    vocabularyHighlights: [
      { word: 'صَافِيَةٍ', meaning: 'clear, pure' },
      { word: 'تَلْمَعَانِ', meaning: 'shine (dual)' },
      { word: 'خَدَّاهَا', meaning: 'her cheeks' },
      { word: 'أَتَنَفَّسَ', meaning: 'to breathe' }
    ],
    moralLesson: 'Beauty stops time itself.',
    moralLessonAr: 'الجَمَالُ يُوقِفُ الزَّمَانَ نَفْسَهُ.',
    wordCount: 32
  },
  {
    id: 'b132',
    title: "The Lover's Tears",
    titleAr: 'دُمُوعُ العَاشِقِ',
    level: 'beginner',
    category: 'ghazal-love-poetry',
    categoryAr: 'الغزل والشعر العاطفي',
    text: `دُمُوعِي نَهْرٌ لَا يَنْتَهِي. تَجْرِي مِنْ عَيْنَيَّ كُلَّ لَيْلَةٍ. أَبْكِي لِأَنَّكَ بَعِيدٌ. أَبْكِي لِأَنَّ قَلْبِي يَشْتَاقُ. الدُّمُوعُ كَلِمَاتٌ لَا أَسْتَطِيعُ قَوْلَهَا. هِيَ لُغَةُ الحُبِّ الصَّامِتَةُ.`,
    translation: `My tears are an endless river. They flow from my eyes every night. I weep because you are far. I weep because my heart yearns. Tears are words I cannot say. They are the silent language of love.`,
    grammaticalConcepts: ['reason with لِأَنَّ', 'adjectives', 'metaphor'],
    vocabularyHighlights: [
      { word: 'تَجْرِي', meaning: 'flow, run' },
      { word: 'يَشْتَاقُ', meaning: 'yearns, longs' },
      { word: 'الصَّامِتَةُ', meaning: 'silent' },
      { word: 'لُغَةُ', meaning: 'language' }
    ],
    moralLesson: 'Tears express what words cannot.',
    moralLessonAr: 'الدُّمُوعُ تُعَبِّرُ عَمَّا لَا تَسْتَطِيعُ الكَلِمَاتُ قَوْلَهُ.',
    wordCount: 33
  },

  // ===== INTERMEDIATE (i118-i123) =====
  {
    id: 'i118',
    title: 'The Wine of Love',
    titleAr: 'خَمْرُ الحُبِّ',
    level: 'intermediate',
    category: 'ghazal-love-poetry',
    categoryAr: 'الغزل والشعر العاطفي',
    text: `سَقَانِي الحُبُّ كَأْسًا لَمْ أَشْرَبْ مِثْلَهَا قَطُّ. خَمْرٌ مِنْ نَظَرَاتِكِ، مَمْزُوجَةٌ بِعِطْرِ شَعْرِكِ. شَرِبْتُ وَلَمْ أَسْكَرْ، بَلْ صَحَوْتُ مِنْ غَفْلَةِ العُمْرِ. رَأَيْتُ العَالَمَ بِعُيُونٍ جَدِيدَةٍ. كُلُّ لَوْنٍ صَارَ أَكْثَرَ إِشْرَاقًا، وَكُلُّ صَوْتٍ صَارَ أَكْثَرَ عُذُوبَةً. هَذَا هُوَ سُكْرُ العَارِفِينَ: سُكْرٌ يَزِيدُ الوَعْيَ وَلَا يُنْقِصُهُ.`,
    translation: `Love gave me a cup I had never drunk before. Wine from your glances, mixed with the perfume of your hair. I drank and did not become drunk, but rather awoke from a lifetime of heedlessness. I saw the world with new eyes. Every color became more radiant, every sound more melodious. This is the intoxication of the mystics: an intoxication that increases awareness rather than diminishing it.`,
    grammaticalConcepts: ['past tense negation with لَمْ', 'passive participle', 'comparative أَكْثَر'],
    vocabularyHighlights: [
      { word: 'سَقَانِي', meaning: 'gave me to drink' },
      { word: 'مَمْزُوجَةٌ', meaning: 'mixed' },
      { word: 'غَفْلَةِ', meaning: 'heedlessness' },
      { word: 'إِشْرَاقًا', meaning: 'radiance' },
      { word: 'العَارِفِينَ', meaning: 'the mystics, knowers' }
    ],
    moralLesson: 'True love awakens rather than intoxicates.',
    moralLessonAr: 'الحُبُّ الحَقِيقِيُّ يُوقِظُ وَلَا يُسْكِرُ.',
    wordCount: 55
  },
  {
    id: 'i119',
    title: 'The Caravan of the Heart',
    titleAr: 'قَافِلَةُ القَلْبِ',
    level: 'intermediate',
    category: 'ghazal-love-poetry',
    categoryAr: 'الغزل والشعر العاطفي',
    text: `قَلْبِي قَافِلَةٌ تَسِيرُ فِي صَحْرَاءِ الشَّوْقِ. الإِبِلُ مُحَمَّلَةٌ بِالأَحْلَامِ وَالذِّكْرَيَاتِ. النُّجُومُ تُرْشِدُنِي إِلَيْكِ كَمَا تُرْشِدُ المُسَافِرِينَ. كُلَّمَا ظَنَنْتُ أَنِّي اقْتَرَبْتُ، ابْتَعَدَ السَّرَابُ. لَكِنَّنِي لَا أَيْأَسُ، فَالوُصُولُ لَيْسَ الغَايَةَ. الغَايَةُ هِيَ الرِّحْلَةُ نَفْسُهَا، وَأَنَا أَسْتَمْتِعُ بِكُلِّ خُطْوَةٍ تُقَرِّبُنِي مِنْكِ.`,
    translation: `My heart is a caravan traveling through the desert of longing. The camels are loaded with dreams and memories. The stars guide me to you as they guide travelers. Whenever I think I have drawn near, the mirage recedes. But I do not despair, for arrival is not the goal. The goal is the journey itself, and I enjoy every step that brings me closer to you.`,
    grammaticalConcepts: ['passive participle مُحَمَّلَة', 'كُلَّمَا conditional', 'negation with لَا'],
    vocabularyHighlights: [
      { word: 'قَافِلَةٌ', meaning: 'caravan' },
      { word: 'الإِبِلُ', meaning: 'camels' },
      { word: 'تُرْشِدُنِي', meaning: 'guides me' },
      { word: 'السَّرَابُ', meaning: 'mirage' },
      { word: 'أَيْأَسُ', meaning: 'despair' }
    ],
    moralLesson: 'The journey of love is as precious as its destination.',
    moralLessonAr: 'رِحْلَةُ الحُبِّ ثَمِينَةٌ كَغَايَتِهَا.',
    wordCount: 53
  },
  {
    id: 'i120',
    title: 'The Ghazal of the Desert',
    titleAr: 'غَزَلُ الصَّحْرَاءِ',
    level: 'intermediate',
    category: 'ghazal-love-poetry',
    categoryAr: 'الغزل والشعر العاطفي',
    text: `فِي قَلْبِ الصَّحْرَاءِ، حَيْثُ لَا مَاءَ وَلَا ظِلَّ، وَجَدْتُ وَاحَةَ حُبِّكِ. الرِّمَالُ الذَّهَبِيَّةُ تُذَكِّرُنِي بِلَوْنِ بَشَرَتِكِ. الرِّيحُ الحَارَّةُ تَحْمِلُ هَمْسَ صَوْتِكِ. حَتَّى الشَّمْسُ القَاسِيَةُ تَبْدُو لَطِيفَةً حِينَ أَتَذَكَّرُ دِفْءَ عِنَاقِكِ. الصَّحْرَاءُ قَاسِيَةٌ لِمَنْ لَا يُحِبُّ، لَكِنَّهَا جَنَّةٌ لِلْعَاشِقِينَ.`,
    translation: `In the heart of the desert, where there is no water and no shade, I found the oasis of your love. The golden sands remind me of the color of your skin. The hot wind carries the whisper of your voice. Even the harsh sun seems gentle when I remember the warmth of your embrace. The desert is cruel to those who do not love, but it is paradise for lovers.`,
    grammaticalConcepts: ['relative clause حَيْثُ', 'comparison', 'لِـ + من construction'],
    vocabularyHighlights: [
      { word: 'وَاحَةَ', meaning: 'oasis' },
      { word: 'الرِّمَالُ', meaning: 'sands' },
      { word: 'بَشَرَتِكِ', meaning: 'your skin' },
      { word: 'هَمْسَ', meaning: 'whisper' },
      { word: 'عِنَاقِكِ', meaning: 'your embrace' }
    ],
    moralLesson: 'Love transforms harsh realities into beauty.',
    moralLessonAr: 'الحُبُّ يُحَوِّلُ الوَاقِعَ القَاسِيَ إِلَى جَمَالٍ.',
    wordCount: 54
  },
  {
    id: 'i121',
    title: 'The Burning of Longing',
    titleAr: 'حَرِيقُ الشَّوْقِ',
    level: 'intermediate',
    category: 'ghazal-love-poetry',
    categoryAr: 'الغزل والشعر العاطفي',
    text: `فِي صَدْرِي نَارٌ لَا تَنْطَفِئُ. اللَّهِيبُ يَصْعَدُ إِلَى حَلْقِي فَأَتَكَلَّمُ شِعْرًا. الدُّخَانُ يَخْرُجُ مِنْ عَيْنَيَّ دُمُوعًا سَاخِنَةً. أَنَا الفَرَاشَةُ الَّتِي رَأَتِ الشَّمْعَةَ فَأَحَبَّتْهَا. أَعْرِفُ أَنَّ الاقْتِرَابَ يَحْرِقُنِي، لَكِنَّ البُعْدَ يَقْتُلُنِي. فَلْأَمُتْ مُحْتَرِقًا بِنُورِكِ، خَيْرٌ مِنْ أَنْ أَعِيشَ فِي ظَلَامٍ بِدُونِكِ.`,
    translation: `In my chest is a fire that does not extinguish. The flame rises to my throat so I speak poetry. The smoke exits from my eyes as hot tears. I am the moth that saw the candle and loved it. I know that drawing near burns me, but distance kills me. So let me die burning in your light—better than living in darkness without you.`,
    grammaticalConcepts: ['relative clause الَّتِي', 'jussive فَلْأَمُتْ', 'active participle'],
    vocabularyHighlights: [
      { word: 'اللَّهِيبُ', meaning: 'flame' },
      { word: 'حَلْقِي', meaning: 'my throat' },
      { word: 'الفَرَاشَةُ', meaning: 'moth, butterfly' },
      { word: 'الشَّمْعَةَ', meaning: 'candle' },
      { word: 'مُحْتَرِقًا', meaning: 'burning' }
    ],
    moralLesson: 'Some loves are worth any sacrifice.',
    moralLessonAr: 'بَعْضُ الحُبِّ يَسْتَحِقُّ أَيَّ تَضْحِيَةٍ.',
    wordCount: 55
  },
  {
    id: 'i122',
    title: 'The Dream of the Beloved',
    titleAr: 'حُلْمُ الحَبِيبَةِ',
    level: 'intermediate',
    category: 'ghazal-love-poetry',
    categoryAr: 'الغزل والشعر العاطفي',
    text: `رَأَيْتُكِ فِي المَنَامِ فَاسْتَيْقَظْتُ سَعِيدًا. كُنْتِ تَمْشِينَ فِي حَدِيقَةٍ مِنَ الوُرُودِ البَيْضَاءِ. ثَوْبُكِ أَخْضَرُ كَالرَّبِيعِ، وَشَعْرُكِ يَتَطَايَرُ مَعَ النَّسِيمِ. مَدَدْتُ يَدِي لِأَلْمَسَ وَجْهَكِ، فَاخْتَفَيْتِ كَالضَّبَابِ. صَرَخْتُ اسْمَكِ فَلَمْ يُجِبْنِي إِلَّا الصَّدَى. اسْتَيْقَظْتُ وَالوِسَادَةُ مُبَلَّلَةٌ بِالدُّمُوعِ، لَكِنَّ قَلْبِي مُمْتَلِئٌ بِذِكْرَاكِ.`,
    translation: `I saw you in my dream and awoke happy. You were walking in a garden of white roses. Your dress was green like spring, your hair flying with the breeze. I extended my hand to touch your face, but you vanished like mist. I called your name but only the echo answered. I awoke with my pillow wet with tears, yet my heart was full of your memory.`,
    grammaticalConcepts: ['past tense sequence', 'exception with إِلَّا', 'passive participle'],
    vocabularyHighlights: [
      { word: 'المَنَامِ', meaning: 'dream, sleep' },
      { word: 'يَتَطَايَرُ', meaning: 'flies about' },
      { word: 'النَّسِيمِ', meaning: 'breeze' },
      { word: 'الضَّبَابِ', meaning: 'mist, fog' },
      { word: 'الصَّدَى', meaning: 'echo' }
    ],
    moralLesson: 'Even dreams of the beloved bring joy amid sorrow.',
    moralLessonAr: 'حَتَّى أَحْلَامُ الحَبِيبِ تَجْلِبُ الفَرَحَ وَسَطَ الحُزْنِ.',
    wordCount: 57
  },
  {
    id: 'i123',
    title: 'The Poetry of Glances',
    titleAr: 'شِعْرُ اللَّحَظَاتِ',
    level: 'intermediate',
    category: 'ghazal-love-poetry',
    categoryAr: 'الغزل والشعر العاطفي',
    text: `بَيْنَ نَظْرَةٍ وَنَظْرَةٍ، يُكْتَبُ دِيوَانٌ كَامِلٌ. عُيُونُنَا تَتَحَدَّثُ بِلُغَةٍ لَا يَفْهَمُهَا الآخَرُونَ. حِينَ أَنْظُرُ إِلَيْكِ، أَقُولُ أَلْفَ كَلِمَةٍ فِي لَحْظَةٍ. وَحِينَ تَنْظُرِينَ إِلَيَّ، أَسْمَعُ أَلْفَ جَوَابٍ. الصَّمْتُ بَيْنَنَا أَبْلَغُ مِنْ كُلِّ كَلَامٍ. العُيُونُ لَا تَكْذِبُ، وَنَظَرَاتُنَا أَصْدَقُ مِنَ الشِّعْرِ.`,
    translation: `Between one glance and another, a complete collection of poetry is written. Our eyes speak in a language others do not understand. When I look at you, I say a thousand words in an instant. When you look at me, I hear a thousand answers. The silence between us is more eloquent than all speech. Eyes do not lie, and our glances are truer than poetry.`,
    grammaticalConcepts: ['passive voice يُكْتَب', 'comparative أَبْلَغ/أَصْدَق', 'negation'],
    vocabularyHighlights: [
      { word: 'دِيوَانٌ', meaning: 'collection of poetry' },
      { word: 'تَتَحَدَّثُ', meaning: 'speaks' },
      { word: 'لَحْظَةٍ', meaning: 'moment, instant' },
      { word: 'أَبْلَغُ', meaning: 'more eloquent' },
      { word: 'أَصْدَقُ', meaning: 'more truthful' }
    ],
    moralLesson: 'The deepest communication transcends words.',
    moralLessonAr: 'أَعْمَقُ التَّوَاصُلِ يَتَجَاوَزُ الكَلِمَاتِ.',
    wordCount: 52
  },

  // ===== ADVANCED (a113-a118) =====
  {
    id: 'a113',
    title: 'The Philosophy of Longing',
    titleAr: 'فَلْسَفَةُ الشَّوْقِ',
    level: 'advanced',
    category: 'ghazal-love-poetry',
    categoryAr: 'الغزل والشعر العاطفي',
    text: `الشَّوْقُ لَيْسَ مَرَضًا يُعَالَجُ، بَلْ هُوَ حَالَةُ وُجُودٍ عُلْيَا. مَنْ لَمْ يَشْتَقْ لَمْ يَعِشْ حَقًّا. الشَّوْقُ يُخْرِجُنَا مِنْ سِجْنِ الذَّاتِ إِلَى فَضَاءِ الآخَرِ. هُوَ الجِسْرُ الَّذِي يَصِلُ بَيْنَ رُوحَيْنِ مُنْفَصِلَتَيْنِ. فِي الشَّوْقِ نَكْتَشِفُ أَنَّنَا غَيْرُ مُكْتَمِلِينَ، وَأَنَّ جُزْءًا مِنَّا يَسْكُنُ فِي الآخَرِ. لَوْلَا الشَّوْقُ لَمَا كَتَبَ الشُّعَرَاءُ، وَلَمَا غَنَّى المُطْرِبُونَ، وَلَمَا بَحَثَ الفَلَاسِفَةُ عَنْ مَعْنَى الوُجُودِ. الشَّوْقُ هُوَ النَّارُ الَّتِي تُنْضِجُ الرُّوحَ، وَالمَاءُ الَّذِي يُرَوِّي عَطَشَ القَلْبِ، وَالرِّيحُ الَّتِي تَحْمِلُ أَحْلَامَنَا إِلَى السَّمَاءِ.`,
    translation: `Longing is not a disease to be treated, but rather a higher state of existence. One who has not longed has not truly lived. Longing draws us out of the prison of self into the expanse of the other. It is the bridge connecting two separated souls. In longing we discover that we are incomplete, and that part of us dwells within the other. Without longing, poets would not have written, singers would not have sung, and philosophers would not have searched for the meaning of existence. Longing is the fire that ripens the soul, the water that quenches the heart's thirst, and the wind that carries our dreams to the sky.`,
    grammaticalConcepts: ['conditional لَوْلَا', 'negative past لَمْ', 'relative clauses', 'philosophical abstraction'],
    vocabularyHighlights: [
      { word: 'حَالَةُ وُجُودٍ', meaning: 'state of existence' },
      { word: 'فَضَاءِ', meaning: 'expanse, space' },
      { word: 'مُنْفَصِلَتَيْنِ', meaning: 'separated (dual fem.)' },
      { word: 'مُكْتَمِلِينَ', meaning: 'complete' },
      { word: 'تُنْضِجُ', meaning: 'ripens, matures' }
    ],
    moralLesson: 'Longing is evidence of our interconnected nature.',
    moralLessonAr: 'الشَّوْقُ دَلِيلٌ عَلَى تَرَابُطِ طَبِيعَتِنَا.',
    wordCount: 95
  },
  {
    id: 'a114',
    title: 'Between Presence and Absence',
    titleAr: 'بَيْنَ الحُضُورِ وَالغِيَابِ',
    level: 'advanced',
    category: 'ghazal-love-poetry',
    categoryAr: 'الغزل والشعر العاطفي',
    text: `أَنْتِ حَاضِرَةٌ فِي غِيَابِكِ أَكْثَرَ مِنْ حُضُورِكِ. حِينَ تَكُونِينَ مَعِي، أَنْشَغِلُ بِالتَّفَاصِيلِ الصَّغِيرَةِ. لَكِنْ حِينَ تَغِيبِينَ، تَمْتَلِئُ الذَّاكِرَةُ بِصُورَتِكِ الكَامِلَةِ. الغِيَابُ يُنَقِّي الحُبَّ مِنَ الشَّوَائِبِ، وَيُبْقِي الجَوْهَرَ فَقَطْ. فِي الغِيَابِ، لَا أَرَى عُيُوبَكِ بَلْ أَرَى جَمَالَكِ الأَبَدِيَّ. هَذَا هُوَ سِرُّ الشُّعَرَاءِ: يَكْتُبُونَ أَجْمَلَ القَصَائِدِ عَنْ مَنْ فَقَدُوا. الحُضُورُ يُعْطِينَا اللَّحْظَةَ، لَكِنَّ الغِيَابَ يُعْطِينَا الأَبَدِيَّةَ. وَأَنَا أُفَضِّلُ أَبَدِيَّتَكِ عَلَى لَحْظَاتِ الآخَرِينَ.`,
    translation: `You are more present in your absence than in your presence. When you are with me, I am occupied with small details. But when you are gone, memory fills with your complete image. Absence purifies love from impurities, leaving only the essence. In absence, I see not your flaws but your eternal beauty. This is the secret of poets: they write the most beautiful poems about those they have lost. Presence gives us the moment, but absence gives us eternity. And I prefer your eternity to the moments of others.`,
    grammaticalConcepts: ['comparative structures', 'temporal conditionals', 'abstract nouns'],
    vocabularyHighlights: [
      { word: 'أَنْشَغِلُ', meaning: 'I become occupied' },
      { word: 'الشَّوَائِبِ', meaning: 'impurities' },
      { word: 'الجَوْهَرَ', meaning: 'essence' },
      { word: 'الأَبَدِيَّ', meaning: 'eternal' },
      { word: 'أُفَضِّلُ', meaning: 'I prefer' }
    ],
    moralLesson: 'Distance can deepen rather than diminish love.',
    moralLessonAr: 'البُعْدُ قَدْ يُعَمِّقُ الحُبَّ بَدَلًا مِنْ أَنْ يُنْقِصَهُ.',
    wordCount: 88
  },
  {
    id: 'a115',
    title: 'The Language of Silence',
    titleAr: 'لُغَةُ الصَّمْتِ',
    level: 'advanced',
    category: 'ghazal-love-poetry',
    categoryAr: 'الغزل والشعر العاطفي',
    text: `تَعَلَّمْنَا لُغَةً لَا يُدْرِكُهَا أَحَدٌ سِوَانَا. الكَلِمَاتُ تَفْشَلُ حَيْثُ يَنْجَحُ الصَّمْتُ. نَظْرَةٌ وَاحِدَةٌ تَحْمِلُ مَا لَا تَحْمِلُهُ أَلْفُ رِسَالَةٍ. لَمْسَةُ يَدٍ تَقُولُ مَا تَعْجَزُ عَنْهُ كُلُّ اللُّغَاتِ. فِي صَمْتِنَا مُوسِيقَى لَا يَسْمَعُهَا إِلَّا قُلُوبُنَا. الحُبُّ الحَقِيقِيُّ لَا يَحْتَاجُ إِلَى تَفْسِيرٍ، كَمَا أَنَّ الشَّمْسَ لَا تَحْتَاجُ إِلَى دَلِيلٍ عَلَى وُجُودِهَا. أَجْلِسُ بِجَانِبِكِ سَاعَاتٍ دُونَ كَلِمَةٍ، وَأَشْعُرُ أَنَّنِي قُلْتُ كُلَّ شَيْءٍ. هَذَا الصَّمْتُ الخَصِيبُ أَبْلَغُ مِنْ ضَجِيجِ العَالَمِ كُلِّهِ.`,
    translation: `We have learned a language no one understands but us. Words fail where silence succeeds. A single glance carries what a thousand letters cannot. A touch of the hand says what all languages are unable to express. In our silence is music that only our hearts can hear. True love needs no explanation, just as the sun needs no proof of its existence. I sit beside you for hours without a word, and feel I have said everything. This fertile silence is more eloquent than all the noise of the world.`,
    grammaticalConcepts: ['exception with سِوَى/إِلَّا', 'ما + verb as noun', 'comparative superlative'],
    vocabularyHighlights: [
      { word: 'تَفْشَلُ', meaning: 'fails' },
      { word: 'تَعْجَزُ', meaning: 'is unable' },
      { word: 'تَفْسِيرٍ', meaning: 'explanation' },
      { word: 'الخَصِيبُ', meaning: 'fertile, rich' },
      { word: 'ضَجِيجِ', meaning: 'noise, clamor' }
    ],
    moralLesson: 'The deepest understanding needs no words.',
    moralLessonAr: 'أَعْمَقُ التَّفَاهُمِ لَا يَحْتَاجُ إِلَى كَلِمَاتٍ.',
    wordCount: 87
  },
  {
    id: 'a116',
    title: 'The Mirror of the Soul',
    titleAr: 'مِرْآةُ الرُّوحِ',
    level: 'advanced',
    category: 'ghazal-love-poetry',
    categoryAr: 'الغزل والشعر العاطفي',
    text: `حِينَ أَنْظُرُ فِي عَيْنَيْكِ، أَرَى نَفْسِي كَمَا يَنْبَغِي أَنْ أَكُونَ. أَنْتِ المِرْآةُ الَّتِي تَعْكِسُ أَفْضَلَ مَا فِيَّ. قَبْلَكِ، كُنْتُ أَعِيشُ فِي غُرْفَةٍ مُظْلِمَةٍ لَا أَعْرِفُ شَكْلِي. جِئْتِ كَالضَّوْءِ فَأَضَأْتِ زَوَايَايَ المَخْفِيَّةَ. أَكْرَهُ مَا أَكْرَهْتِ فِي نَفْسِي، وَأُحِبُّ مَا أَحْبَبْتِ. شَكَّلْتِنِي مِنْ جَدِيدٍ كَمَا يُشَكِّلُ الفَنَّانُ الطِّينَ. الحُبُّ لَيْسَ فَقَطْ أَنْ تَرَى الآخَرَ، بَلْ أَنْ تَرَى نَفْسَكَ فِيهِ. وَأَنَا رَأَيْتُ فِيكِ الإِنْسَانَ الَّذِي أَحْلُمُ أَنْ أَكُونَهُ.`,
    translation: `When I look into your eyes, I see myself as I should be. You are the mirror that reflects the best in me. Before you, I lived in a dark room not knowing my own shape. You came like light and illuminated my hidden corners. I hate what you hated in me, and love what you loved. You shaped me anew as an artist shapes clay. Love is not only to see the other, but to see yourself in them. And in you I saw the person I dream of becoming.`,
    grammaticalConcepts: ['يَنْبَغِي أَنْ subjunctive', 'relative clauses', 'past tense sequence'],
    vocabularyHighlights: [
      { word: 'تَعْكِسُ', meaning: 'reflects' },
      { word: 'زَوَايَايَ', meaning: 'my corners' },
      { word: 'المَخْفِيَّةَ', meaning: 'hidden' },
      { word: 'شَكَّلْتِنِي', meaning: 'you shaped me' },
      { word: 'الطِّينَ', meaning: 'clay' }
    ],
    moralLesson: 'True love reveals and transforms us.',
    moralLessonAr: 'الحُبُّ الحَقِيقِيُّ يَكْشِفُنَا وَيُغَيِّرُنَا.',
    wordCount: 86
  },
  {
    id: 'a117',
    title: 'The Alchemy of Love',
    titleAr: 'كِيمْيَاءُ العِشْقِ',
    level: 'advanced',
    category: 'ghazal-love-poetry',
    categoryAr: 'الغزل والشعر العاطفي',
    text: `الحُبُّ كِيمْيَاءٌ تُحَوِّلُ الرَّصَاصَ إِلَى ذَهَبٍ. كُنْتُ مَعْدِنًا خَامًا قَبْلَ أَنْ تَلْمِسِينِي يَدُ الحُبِّ. الآنَ أَشْعُرُ بِأَنَّنِي جَوْهَرَةٌ نَادِرَةٌ. هَكَذَا يَفْعَلُ الحُبُّ: يَأْخُذُ الحَجَرَ فَيَصِيرُ يَاقُوتَةً، وَيَأْخُذُ التُّرَابَ فَيَصِيرُ وَرْدَةً. نَظَرَاتُكِ أَكْسِيرُ الحَيَاةِ الَّذِي بَحَثَ عَنْهُ العُلَمَاءُ قُرُونًا. بِكَلِمَةٍ وَاحِدَةٍ مِنْكِ، يَتَحَوَّلُ حُزْنِي إِلَى فَرَحٍ، وَخَوْفِي إِلَى شَجَاعَةٍ، وَضَعْفِي إِلَى قُوَّةٍ. أَنَا الرَّجُلُ الَّذِي صَنَعَهُ حُبُّكِ، وَلَوْلَاكِ لَبَقِيتُ غُبَارًا فِي مَهَبِّ الرِّيحِ.`,
    translation: `Love is an alchemy that transforms lead into gold. I was raw ore before the hand of love touched me. Now I feel I am a rare gem. This is what love does: it takes stone and it becomes ruby, takes dust and it becomes a rose. Your glances are the elixir of life that scientists sought for centuries. With a single word from you, my sorrow transforms to joy, my fear to courage, my weakness to strength. I am the man your love created, and without you I would have remained dust in the wind.`,
    grammaticalConcepts: ['conditional لَوْلَا', 'transformation verbs', 'parallel structure'],
    vocabularyHighlights: [
      { word: 'كِيمْيَاءٌ', meaning: 'alchemy' },
      { word: 'مَعْدِنًا خَامًا', meaning: 'raw ore' },
      { word: 'يَاقُوتَةً', meaning: 'ruby' },
      { word: 'أَكْسِيرُ', meaning: 'elixir' },
      { word: 'مَهَبِّ الرِّيحِ', meaning: 'where the wind blows' }
    ],
    moralLesson: 'Love has the power to fundamentally transform us.',
    moralLessonAr: 'الحُبُّ لَهُ قُدْرَةٌ عَلَى تَحْوِيلِنَا جَذْرِيًّا.',
    wordCount: 89
  },
  {
    id: 'a118',
    title: 'The Eternal Moment',
    titleAr: 'اللَّحْظَةُ الخَالِدَةُ',
    level: 'advanced',
    category: 'ghazal-love-poetry',
    categoryAr: 'الغزل والشعر العاطفي',
    text: `هُنَاكَ لَحَظَاتٌ يَتَوَقَّفُ فِيهَا الزَّمَانُ. لَيْسَ لِأَنَّ السَّاعَةَ تَعَطَّلَتْ، بَلْ لِأَنَّ الرُّوحَ خَرَجَتْ مِنْ قُيُودِ الوَقْتِ. تِلْكَ اللَّحْظَةُ حِينَ الْتَقَتْ عَيْنَانَا أَوَّلَ مَرَّةٍ، لَا زِلْتُ أَعِيشُهَا حَتَّى الآنَ. كُلُّ نَبْضَةٍ مِنْ قَلْبِي تُعِيدُ تَشْغِيلَهَا كَفِيلْمٍ لَا يَنْتَهِي. اللَّحْظَةُ الوَاحِدَةُ مَعَكِ تُسَاوِي عُمْرًا كَامِلًا بِدُونِكِ. وَأَنَا أَجْمَعُ هَذِهِ اللَّحَظَاتِ كَمَنْ يَجْمَعُ اللآلِئَ. سَأَصْنَعُ مِنْهَا عِقْدًا أَحْمِلُهُ مَعِي إِلَى الأَبَدِ. وَحِينَ أَمُوتُ، سَيَجِدُونَ هَذِهِ اللَّحَظَاتِ مَحْفُورَةً عَلَى قَلْبِي كَالنُّقُوشِ الأَبَدِيَّةِ.`,
    translation: `There are moments when time stops. Not because the clock has broken, but because the soul has escaped the constraints of time. That moment when our eyes first met, I am still living it until now. Every beat of my heart replays it like a film that never ends. A single moment with you equals an entire lifetime without you. And I collect these moments like one who collects pearls. I will make from them a necklace I carry with me forever. And when I die, they will find these moments engraved upon my heart like eternal inscriptions.`,
    grammaticalConcepts: ['future tense', 'passive participle', 'simile with كَـ'],
    vocabularyHighlights: [
      { word: 'يَتَوَقَّفُ', meaning: 'stops' },
      { word: 'قُيُودِ', meaning: 'constraints, chains' },
      { word: 'نَبْضَةٍ', meaning: 'heartbeat' },
      { word: 'اللآلِئَ', meaning: 'pearls' },
      { word: 'مَحْفُورَةً', meaning: 'engraved' },
      { word: 'النُّقُوشِ', meaning: 'inscriptions' }
    ],
    moralLesson: 'Love creates moments that transcend time itself.',
    moralLessonAr: 'الحُبُّ يَخْلُقُ لَحَظَاتٍ تَتَجَاوَزُ الزَّمَانَ نَفْسَهُ.',
    wordCount: 94
  }
];
