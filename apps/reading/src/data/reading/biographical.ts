// src/data/reading/biographical.ts
// Biographical texts - Lives of scholars, companions, and notable figures

import { ReadingText } from './types';

export const biographicalTexts: ReadingText[] = [
  // ===== BEGINNER (b133-b138) =====
  {
    id: 'b133',
    title: 'Khadijah: The First Believer',
    titleAr: 'خَدِيجَةُ: أَوَّلُ المُؤْمِنِينَ',
    level: 'beginner',
    category: 'biographical',
    categoryAr: 'السير والتراجم',
    text: `خَدِيجَةُ بِنْتُ خُوَيْلِدٍ كَانَتْ سَيِّدَةً غَنِيَّةً وَحَكِيمَةً. تَزَوَّجَتِ النَّبِيَّ مُحَمَّدًا صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ. حِينَ جَاءَهُ الوَحْيُ، كَانَتْ أَوَّلَ مَنْ آمَنَ بِهِ. قَالَتْ لَهُ: "وَاللهِ لَا يُخْزِيكَ اللهُ أَبَدًا." كَانَتْ سَنَدَهُ وَقُوَّتَهُ. مَاتَتْ قَبْلَ الهِجْرَةِ، وَلَمْ يَنْسَهَا النَّبِيُّ أَبَدًا.`,
    translation: `Khadijah bint Khuwaylid was a wealthy and wise lady. She married the Prophet Muhammad, peace be upon him. When revelation came to him, she was the first to believe in him. She said to him: "By Allah, Allah will never disgrace you." She was his support and his strength. She died before the Hijrah, and the Prophet never forgot her.`,
    grammaticalConcepts: ['past tense كَانَ', 'superlative أَوَّل', 'negation with لَا'],
    vocabularyHighlights: [
      { word: 'سَيِّدَةً', meaning: 'lady, noblewoman' },
      { word: 'الوَحْيُ', meaning: 'revelation' },
      { word: 'يُخْزِيكَ', meaning: 'disgrace you' },
      { word: 'سَنَدَهُ', meaning: 'his support' }
    ],
    moralLesson: 'True partnership means unwavering support in times of doubt.',
    moralLessonAr: 'الشَّرَاكَةُ الحَقِيقِيَّةُ تَعْنِي الدَّعْمَ الثَّابِتَ فِي أَوْقَاتِ الشَّكِّ.',
    wordCount: 42
  },
  {
    id: 'b134',
    title: 'Bilal: The Voice of Islam',
    titleAr: 'بِلَالٌ: صَوْتُ الإِسْلَامِ',
    level: 'beginner',
    category: 'biographical',
    categoryAr: 'السير والتراجم',
    text: `بِلَالُ بْنُ رَبَاحٍ كَانَ عَبْدًا حَبَشِيًّا. أَسْلَمَ فَعَذَّبَهُ سَيِّدُهُ. كَانَ يَقُولُ: "أَحَدٌ، أَحَدٌ." اشْتَرَاهُ أَبُو بَكْرٍ وَأَعْتَقَهُ. صَارَ بِلَالٌ أَوَّلَ مُؤَذِّنٍ فِي الإِسْلَامِ. صَوْتُهُ الجَمِيلُ كَانَ يَمْلَأُ سَمَاءَ المَدِينَةِ. مِنْ عَبْدٍ مُعَذَّبٍ إِلَى سَيِّدٍ مُكَرَّمٍ.`,
    translation: `Bilal ibn Rabah was an Abyssinian slave. He accepted Islam and his master tortured him. He would say: "One, One" (meaning God is One). Abu Bakr bought him and freed him. Bilal became the first muezzin in Islam. His beautiful voice would fill the sky of Madinah. From a tortured slave to an honored master.`,
    grammaticalConcepts: ['past tense sequence', 'passive participle', 'صَارَ + noun'],
    vocabularyHighlights: [
      { word: 'عَبْدًا', meaning: 'slave' },
      { word: 'عَذَّبَهُ', meaning: 'tortured him' },
      { word: 'أَعْتَقَهُ', meaning: 'freed him' },
      { word: 'مُؤَذِّنٍ', meaning: 'caller to prayer' }
    ],
    moralLesson: 'Faith elevates a person above all worldly status.',
    moralLessonAr: 'الإِيمَانُ يَرْفَعُ الإِنْسَانَ فَوْقَ كُلِّ مَكَانَةٍ دُنْيَوِيَّةٍ.',
    wordCount: 40
  },
  {
    id: 'b135',
    title: 'Al-Khwarizmi: Father of Algebra',
    titleAr: 'الخَوَارِزْمِيُّ: أَبُو الجَبْرِ',
    level: 'beginner',
    category: 'biographical',
    categoryAr: 'السير والتراجم',
    text: `مُحَمَّدُ بْنُ مُوسَى الخَوَارِزْمِيُّ عَاشَ فِي بَغْدَادَ. كَانَ عَالِمًا فِي الرِّيَاضِيَّاتِ وَالفَلَكِ. أَلَّفَ كِتَابَ "الجَبْرِ وَالمُقَابَلَةِ." مِنِ اسْمِهِ جَاءَتْ كَلِمَةُ "الخَوَارِزْمِيَّة" (Algorithm). عَلَّمَ العَالَمَ الأَرْقَامَ العَرَبِيَّةَ. بِدُونِهِ، لَمَا كَانَتِ الحَوَاسِيبُ مَوْجُودَةً اليَوْمَ.`,
    translation: `Muhammad ibn Musa al-Khwarizmi lived in Baghdad. He was a scholar in mathematics and astronomy. He authored the book "Al-Jabr wal-Muqabala" (Algebra). From his name came the word "algorithm." He taught the world Arabic numerals. Without him, computers would not exist today.`,
    grammaticalConcepts: ['past tense', 'مِن + noun origin', 'conditional لَوْلَا'],
    vocabularyHighlights: [
      { word: 'الرِّيَاضِيَّاتِ', meaning: 'mathematics' },
      { word: 'الفَلَكِ', meaning: 'astronomy' },
      { word: 'أَلَّفَ', meaning: 'authored, composed' },
      { word: 'الحَوَاسِيبُ', meaning: 'computers' }
    ],
    moralLesson: 'One person\'s knowledge can change the course of civilization.',
    moralLessonAr: 'عِلْمُ شَخْصٍ وَاحِدٍ قَدْ يُغَيِّرُ مَسَارَ الحَضَارَةِ.',
    wordCount: 36
  },
  {
    id: 'b136',
    title: 'Fatimah: The Leader of Women',
    titleAr: 'فَاطِمَةُ: سَيِّدَةُ النِّسَاءِ',
    level: 'beginner',
    category: 'biographical',
    categoryAr: 'السير والتراجم',
    text: `فَاطِمَةُ بِنْتُ مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ كَانَتْ أَحَبَّ أَوْلَادِهِ إِلَيْهِ. تَزَوَّجَتْ عَلِيَّ بْنَ أَبِي طَالِبٍ. كَانَتْ تُشْبِهُ أَبَاهَا فِي المَشْيِ وَالكَلَامِ. عَاشَتْ حَيَاةً بَسِيطَةً. كَانَتْ تَطْحَنُ القَمْحَ بِيَدَيْهَا. سَمَّاهَا النَّبِيُّ "سَيِّدَةَ نِسَاءِ الجَنَّةِ."`,
    translation: `Fatimah, daughter of Muhammad, peace be upon him, was the dearest of his children to him. She married Ali ibn Abi Talib. She resembled her father in walking and speaking. She lived a simple life. She would grind wheat with her own hands. The Prophet called her "the leader of the women of Paradise."`,
    grammaticalConcepts: ['superlative أَحَبّ', 'verb Form V تُشْبِه', 'كَانَ + imperfect'],
    vocabularyHighlights: [
      { word: 'أَحَبَّ', meaning: 'dearest, most beloved' },
      { word: 'تُشْبِهُ', meaning: 'resembles' },
      { word: 'تَطْحَنُ', meaning: 'grinds' },
      { word: 'القَمْحَ', meaning: 'wheat' }
    ],
    moralLesson: 'True nobility lies in simplicity and humility.',
    moralLessonAr: 'النُّبْلُ الحَقِيقِيُّ يَكْمُنُ فِي البَسَاطَةِ وَالتَّوَاضُعِ.',
    wordCount: 39
  },
  {
    id: 'b137',
    title: 'Ibn Battuta: The Great Traveler',
    titleAr: 'ابْنُ بَطُّوطَةَ: الرَّحَّالَةُ العَظِيمُ',
    level: 'beginner',
    category: 'biographical',
    categoryAr: 'السير والتراجم',
    text: `ابْنُ بَطُّوطَةَ وُلِدَ فِي طَنْجَةَ بِالمَغْرِبِ. فِي عُمْرِ إِحْدَى وَعِشْرِينَ سَنَةً، خَرَجَ لِلْحَجِّ. لَكِنَّهُ لَمْ يَعُدْ إِلَّا بَعْدَ ثَلَاثِينَ سَنَةً! زَارَ أَكْثَرَ مِنْ أَرْبَعِينَ بَلَدًا. رَأَى الصِّينَ وَالهِنْدَ وَأَفْرِيقِيَا. كَتَبَ رِحْلَتَهُ فِي كِتَابٍ اسْمُهُ "تُحْفَةُ النُّظَّارِ."`,
    translation: `Ibn Battuta was born in Tangier, Morocco. At the age of twenty-one, he set out for Hajj. But he did not return until thirty years later! He visited more than forty countries. He saw China, India, and Africa. He wrote his journey in a book called "A Gift to Those Who Contemplate."`,
    grammaticalConcepts: ['passive voice وُلِدَ', 'numbers with nouns', 'exception with إِلَّا'],
    vocabularyHighlights: [
      { word: 'الرَّحَّالَةُ', meaning: 'traveler, explorer' },
      { word: 'خَرَجَ', meaning: 'set out' },
      { word: 'يَعُدْ', meaning: 'return' },
      { word: 'تُحْفَةُ', meaning: 'gift, masterpiece' }
    ],
    moralLesson: 'Curiosity can lead to a lifetime of discovery.',
    moralLessonAr: 'الفُضُولُ قَدْ يَقُودُ إِلَى عُمْرٍ مِنَ الاكْتِشَافِ.',
    wordCount: 41
  },
  {
    id: 'b138',
    title: 'Salman Al-Farisi: The Seeker',
    titleAr: 'سَلْمَانُ الفَارِسِيُّ: البَاحِثُ عَنِ الحَقِيقَةِ',
    level: 'beginner',
    category: 'biographical',
    categoryAr: 'السير والتراجم',
    text: `سَلْمَانُ وُلِدَ فِي بِلَادِ فَارِسَ. كَانَ ابْنَ رَجُلٍ غَنِيٍّ. تَرَكَ دِينَ أَبِيهِ وَبَحَثَ عَنِ الحَقِيقَةِ. سَافَرَ مِنْ بَلَدٍ إِلَى بَلَدٍ. تَعَلَّمَ مِنَ الرُّهْبَانِ وَالعُلَمَاءِ. أَخِيرًا، وَصَلَ إِلَى المَدِينَةِ وَلَقِيَ النَّبِيَّ. قَالَ النَّبِيُّ: "سَلْمَانُ مِنَّا أَهْلَ البَيْتِ."`,
    translation: `Salman was born in Persia. He was the son of a wealthy man. He left his father's religion and searched for the truth. He traveled from country to country. He learned from monks and scholars. Finally, he reached Madinah and met the Prophet. The Prophet said: "Salman is from us, the People of the House."`,
    grammaticalConcepts: ['past tense sequence', 'مِن + origin', 'verb Form I بَحَثَ'],
    vocabularyHighlights: [
      { word: 'بِلَادِ فَارِسَ', meaning: 'Persia' },
      { word: 'الحَقِيقَةِ', meaning: 'truth' },
      { word: 'الرُّهْبَانِ', meaning: 'monks' },
      { word: 'أَهْلَ البَيْتِ', meaning: 'People of the House' }
    ],
    moralLesson: 'The sincere seeker will find the truth.',
    moralLessonAr: 'البَاحِثُ الصَّادِقُ سَيَجِدُ الحَقِيقَةَ.',
    wordCount: 43
  },

  // ===== INTERMEDIATE (i124-i129) =====
  {
    id: 'i124',
    title: 'Imam Al-Shafi\'i: The Scholar Between Two Worlds',
    titleAr: 'الإِمَامُ الشَّافِعِيُّ: العَالِمُ بَيْنَ عَالَمَيْنِ',
    level: 'intermediate',
    category: 'biographical',
    categoryAr: 'السير والتراجم',
    text: `وُلِدَ مُحَمَّدُ بْنُ إِدْرِيسَ الشَّافِعِيُّ فِي غَزَّةَ وَنَشَأَ يَتِيمًا فَقِيرًا. حَفِظَ القُرْآنَ فِي السَّابِعَةِ، وَالمُوَطَّأَ فِي العَاشِرَةِ. سَافَرَ إِلَى المَدِينَةِ لِيَتَعَلَّمَ مِنَ الإِمَامِ مَالِكٍ، ثُمَّ إِلَى العِرَاقِ لِيَتَعَلَّمَ مِنْ تَلَامِيذِ أَبِي حَنِيفَةَ. جَمَعَ بَيْنَ مَدْرَسَتَيِ الحِجَازِ وَالعِرَاقِ، فَأَسَّسَ مَذْهَبًا وَسَطًا. كَانَ شَاعِرًا بَلِيغًا وَفَقِيهًا عَمِيقًا. قَالَ: "العِلْمُ مَا نَفَعَ، لَا مَا حُفِظَ."`,
    translation: `Muhammad ibn Idris al-Shafi'i was born in Gaza and grew up an orphan in poverty. He memorized the Quran at seven, and al-Muwatta at ten. He traveled to Madinah to learn from Imam Malik, then to Iraq to learn from the students of Abu Hanifa. He combined the schools of Hijaz and Iraq, establishing a middle path. He was an eloquent poet and a profound jurist. He said: "Knowledge is what benefits, not what is memorized."`,
    grammaticalConcepts: ['passive voice وُلِدَ', 'ordinal numbers', 'لِـ + subjunctive purpose'],
    vocabularyHighlights: [
      { word: 'يَتِيمًا', meaning: 'orphan' },
      { word: 'المُوَطَّأَ', meaning: 'al-Muwatta (Malik\'s book)' },
      { word: 'مَذْهَبًا', meaning: 'school of thought' },
      { word: 'بَلِيغًا', meaning: 'eloquent' },
      { word: 'فَقِيهًا', meaning: 'jurist' }
    ],
    moralLesson: 'True scholarship seeks to unite, not divide.',
    moralLessonAr: 'العِلْمُ الحَقِيقِيُّ يَسْعَى لِلْجَمْعِ لَا لِلتَّفْرِيقِ.',
    wordCount: 62
  },
  {
    id: 'i125',
    title: 'Rabi\'a Al-Adawiyya: The Saint of Divine Love',
    titleAr: 'رَابِعَةُ العَدَوِيَّةُ: قِدِّيسَةُ الحُبِّ الإِلَهِيِّ',
    level: 'intermediate',
    category: 'biographical',
    categoryAr: 'السير والتراجم',
    text: `رَابِعَةُ العَدَوِيَّةُ وُلِدَتْ فِي البَصْرَةِ فِي بَيْتٍ فَقِيرٍ. بِيعَتْ جَارِيَةً بَعْدَ وَفَاةِ أَبِيهَا. لَكِنَّهَا وَجَدَتْ فِي العِبَادَةِ حُرِّيَّتَهَا. أَعْتَقَهَا سَيِّدُهَا حِينَ رَآهَا تُصَلِّي وَنُورٌ يَخْرُجُ مِنْهَا. كَرَّسَتْ حَيَاتَهَا لِلْحُبِّ الإِلَهِيِّ. سُئِلَتْ: "أَتُحِبِّينَ اللهَ؟" قَالَتْ: "نَعَمْ." قِيلَ: "أَتَكْرَهِينَ الشَّيْطَانَ؟" قَالَتْ: "حُبِّي لِلرَّحْمَنِ لَا يَتْرُكُ مَكَانًا لِلْكُرْهِ."`,
    translation: `Rabi'a al-Adawiyya was born in Basra in a poor home. She was sold as a slave after her father's death. But she found her freedom in worship. Her master freed her when he saw her praying with light emanating from her. She dedicated her life to divine love. She was asked: "Do you love God?" She said: "Yes." It was said: "Do you hate Satan?" She said: "My love for the Merciful leaves no room for hatred."`,
    grammaticalConcepts: ['passive voice بِيعَتْ/سُئِلَتْ', 'conditional حِينَ', 'negation'],
    vocabularyHighlights: [
      { word: 'جَارِيَةً', meaning: 'slave girl' },
      { word: 'أَعْتَقَهَا', meaning: 'freed her' },
      { word: 'كَرَّسَتْ', meaning: 'dedicated' },
      { word: 'الرَّحْمَنِ', meaning: 'the Merciful' }
    ],
    moralLesson: 'Love so complete leaves no room for anything else.',
    moralLessonAr: 'الحُبُّ الكَامِلُ لَا يَتْرُكُ مَكَانًا لِشَيْءٍ آخَرَ.',
    wordCount: 64
  },
  {
    id: 'i126',
    title: 'Ibn Sina: The Prince of Physicians',
    titleAr: 'ابْنُ سِينَا: أَمِيرُ الأَطِبَّاءِ',
    level: 'intermediate',
    category: 'biographical',
    categoryAr: 'السير والتراجم',
    text: `أَبُو عَلِيٍّ الحُسَيْنُ بْنُ سِينَا وُلِدَ فِي بُخَارَى. حَفِظَ القُرْآنَ وَهُوَ فِي العَاشِرَةِ، وَتَعَلَّمَ الطِّبَّ وَهُوَ فِي السَّادِسَةَ عَشْرَةَ. فِي الثَّامِنَةَ عَشْرَةَ، عَالَجَ السُّلْطَانَ مِنْ مَرَضٍ عَجَزَ عَنْهُ الأَطِبَّاءُ. أَلَّفَ "القَانُونَ فِي الطِّبِّ" الَّذِي ظَلَّ مَرْجِعًا فِي أُورُوبَّا خَمْسَمِئَةِ سَنَةٍ. كَتَبَ فِي الفَلْسَفَةِ وَالمُوسِيقَى وَالفَلَكِ. قَالَ: "الوَهْمُ نِصْفُ الدَّاءِ، وَالاطْمِئْنَانُ نِصْفُ الدَّوَاءِ."`,
    translation: `Abu Ali al-Husayn ibn Sina was born in Bukhara. He memorized the Quran at ten, and learned medicine at sixteen. At eighteen, he treated the Sultan for an illness that had defeated other physicians. He authored "The Canon of Medicine" which remained a reference in Europe for five hundred years. He wrote on philosophy, music, and astronomy. He said: "Illusion is half the disease, and tranquility is half the cure."`,
    grammaticalConcepts: ['ordinal numbers', 'relative clause الَّذِي', 'past continuous'],
    vocabularyHighlights: [
      { word: 'الطِّبَّ', meaning: 'medicine' },
      { word: 'عَالَجَ', meaning: 'treated' },
      { word: 'عَجَزَ', meaning: 'was unable' },
      { word: 'الوَهْمُ', meaning: 'illusion, delusion' },
      { word: 'الدَّاءِ', meaning: 'disease' }
    ],
    moralLesson: 'The mind heals as much as medicine does.',
    moralLessonAr: 'العَقْلُ يَشْفِي بِقَدْرِ مَا يَشْفِي الدَّوَاءُ.',
    wordCount: 63
  },
  {
    id: 'i127',
    title: 'Umar ibn Abd al-Aziz: The Fifth Rightly-Guided Caliph',
    titleAr: 'عُمَرُ بْنُ عَبْدِ العَزِيزِ: الخَلِيفَةُ الرَّاشِدُ الخَامِسُ',
    level: 'intermediate',
    category: 'biographical',
    categoryAr: 'السير والتراجم',
    text: `عُمَرُ بْنُ عَبْدِ العَزِيزِ كَانَ أَمِيرًا يَعِيشُ فِي نَعِيمٍ. ثِيَابُهُ مِنْ حَرِيرٍ، وَقَصْرُهُ مَلِيءٌ بِالخَدَمِ. لَمَّا صَارَ خَلِيفَةً، تَغَيَّرَ تَمَامًا. أَعَادَ أَمْوَالَ بَنِي أُمَيَّةَ إِلَى بَيْتِ المَالِ. أَطْفَأَ الشُّمُوعَ إِذَا تَحَدَّثَ فِي أُمُورٍ شَخْصِيَّةٍ. كَانَ يَقُولُ: "لَا أُرِيدُ أَنْ أَسْتَعْمِلَ مَالَ المُسْلِمِينَ لِنَفْسِي." فِي سَنَتَيْنِ فَقَطْ، لَمْ يَبْقَ فَقِيرٌ يَأْخُذُ الزَّكَاةَ.`,
    translation: `Umar ibn Abd al-Aziz was a prince living in luxury. His clothes were of silk, and his palace was full of servants. When he became caliph, he changed completely. He returned the wealth of the Umayyads to the public treasury. He would extinguish candles if he spoke about personal matters. He would say: "I do not want to use the Muslims' wealth for myself." In only two years, no poor person remained to receive zakat.`,
    grammaticalConcepts: ['لَمَّا temporal', 'conditional إِذَا', 'negation with لَا'],
    vocabularyHighlights: [
      { word: 'نَعِيمٍ', meaning: 'luxury, comfort' },
      { word: 'حَرِيرٍ', meaning: 'silk' },
      { word: 'بَيْتِ المَالِ', meaning: 'public treasury' },
      { word: 'أَطْفَأَ', meaning: 'extinguished' },
      { word: 'الزَّكَاةَ', meaning: 'obligatory charity' }
    ],
    moralLesson: 'Leadership means serving others, not being served.',
    moralLessonAr: 'القِيَادَةُ تَعْنِي خِدْمَةَ الآخَرِينَ لَا أَنْ تُخْدَمَ.',
    wordCount: 65
  },
  {
    id: 'i128',
    title: 'Al-Ghazali: From Doubt to Certainty',
    titleAr: 'الغَزَالِيُّ: مِنَ الشَّكِّ إِلَى اليَقِينِ',
    level: 'intermediate',
    category: 'biographical',
    categoryAr: 'السير والتراجم',
    text: `أَبُو حَامِدٍ الغَزَالِيُّ كَانَ أَشْهَرَ عَالِمٍ فِي عَصْرِهِ. دَرَّسَ فِي النِّظَامِيَّةِ بِبَغْدَادَ. لَكِنَّهُ شَعَرَ بِفَرَاغٍ رُوحِيٍّ عَمِيقٍ. تَرَكَ المَجْدَ وَالمَالَ وَسَافَرَ بَاحِثًا عَنِ الحَقِيقَةِ. عَاشَ فَقِيرًا زَاهِدًا عَشْرَ سَنَوَاتٍ. وَجَدَ السَّلَامَ فِي التَّصَوُّفِ وَالعِبَادَةِ. عَادَ وَكَتَبَ "إِحْيَاءَ عُلُومِ الدِّينِ." قَالَ: "الحَقِيقَةُ لَا تُوجَدُ فِي الكُتُبِ فَقَطْ، بَلْ فِي القَلْبِ."`,
    translation: `Abu Hamid al-Ghazali was the most famous scholar of his era. He taught at the Nizamiyya in Baghdad. But he felt a deep spiritual emptiness. He left glory and wealth and traveled searching for truth. He lived poor and ascetic for ten years. He found peace in Sufism and worship. He returned and wrote "The Revival of Religious Sciences." He said: "Truth is not found in books alone, but in the heart."`,
    grammaticalConcepts: ['superlative أَشْهَر', 'active participle بَاحِثًا', 'negation with بَلْ'],
    vocabularyHighlights: [
      { word: 'فَرَاغٍ رُوحِيٍّ', meaning: 'spiritual emptiness' },
      { word: 'زَاهِدًا', meaning: 'ascetic' },
      { word: 'التَّصَوُّفِ', meaning: 'Sufism' },
      { word: 'إِحْيَاءَ', meaning: 'revival' }
    ],
    moralLesson: 'Sometimes you must lose everything to find what truly matters.',
    moralLessonAr: 'أَحْيَانًا يَجِبُ أَنْ تَخْسَرَ كُلَّ شَيْءٍ لِتَجِدَ مَا يَهُمُّ حَقًّا.',
    wordCount: 66
  },
  {
    id: 'i129',
    title: 'Nusayba bint Ka\'b: The Warrior of Uhud',
    titleAr: 'نُسَيْبَةُ بِنْتُ كَعْبٍ: مُقَاتِلَةُ أُحُدٍ',
    level: 'intermediate',
    category: 'biographical',
    categoryAr: 'السير والتراجم',
    text: `نُسَيْبَةُ بِنْتُ كَعْبٍ خَرَجَتْ إِلَى أُحُدٍ لِتَسْقِيَ الجَرْحَى. لَكِنْ حِينَ انْهَزَمَ المُسْلِمُونَ وَتَفَرَّقُوا، أَخَذَتْ سَيْفًا وَدِرْعًا. وَقَفَتْ أَمَامَ النَّبِيِّ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ تُدَافِعُ عَنْهُ. أُصِيبَتْ بِاثْنَتَيْ عَشْرَةَ طَعْنَةً. قَالَ النَّبِيُّ: "مَا الْتَفَتُّ يَمِينًا وَلَا شِمَالًا إِلَّا وَأَنَا أَرَاهَا تُقَاتِلُ دُونِي." مَا شَكَتْ مِنْ جِرَاحِهَا قَطُّ.`,
    translation: `Nusayba bint Ka'b went out to Uhud to give water to the wounded. But when the Muslims were routed and scattered, she took a sword and shield. She stood before the Prophet, peace be upon him, defending him. She was struck with twelve stab wounds. The Prophet said: "I did not look right or left except I saw her fighting to protect me." She never complained of her wounds.`,
    grammaticalConcepts: ['purpose with لِـ', 'exception with إِلَّا', 'passive voice أُصِيبَتْ'],
    vocabularyHighlights: [
      { word: 'تَسْقِيَ', meaning: 'to give water' },
      { word: 'انْهَزَمَ', meaning: 'were routed' },
      { word: 'دِرْعًا', meaning: 'shield, armor' },
      { word: 'طَعْنَةً', meaning: 'stab wound' },
      { word: 'جِرَاحِهَا', meaning: 'her wounds' }
    ],
    moralLesson: 'Courage knows no gender.',
    moralLessonAr: 'الشَّجَاعَةُ لَا تَعْرِفُ جِنْسًا.',
    wordCount: 58
  },

  // ===== ADVANCED (a119-a124) =====
  {
    id: 'a119',
    title: 'Ibn Arabi: The Greatest Sheikh',
    titleAr: 'ابْنُ عَرَبِيٍّ: الشَّيْخُ الأَكْبَرُ',
    level: 'advanced',
    category: 'biographical',
    categoryAr: 'السير والتراجم',
    text: `مُحْيِي الدِّينِ ابْنُ عَرَبِيٍّ وُلِدَ فِي مُرْسِيَةَ بِالأَنْدَلُسِ وَطَافَ العَالَمَ الإِسْلَامِيَّ بِأَسْرِهِ. الْتَقَى بِابْنِ رُشْدٍ الفَيْلَسُوفِ وَهُوَ شَابٌّ، فَسَأَلَهُ ابْنُ رُشْدٍ: "مَاذَا وَجَدْتَ بِالكَشْفِ؟" فَأَجَابَ: "نَعَمْ وَلَا. بَيْنَ نَعَمْ وَلَا تَطِيرُ الأَرْوَاحُ مِنْ مَوَادِّهَا وَالأَعْنَاقُ مِنْ أَجْسَادِهَا." أَلَّفَ أَكْثَرَ مِنْ ثَلَاثِمِئَةِ كِتَابٍ، أَشْهَرُهَا "الفُتُوحَاتُ المَكِّيَّةُ" وَ"فُصُوصُ الحِكَمِ." رَأَى أَنَّ الوُجُودَ كُلَّهُ تَجَلٍّ لِلْحَقِّ، وَأَنَّ الإِنْسَانَ الكَامِلَ هُوَ مِرْآةُ الأَسْمَاءِ الإِلَهِيَّةِ. اخْتَلَفَ العُلَمَاءُ فِيهِ، فَمِنْهُمْ مَنْ كَفَّرَهُ وَمِنْهُمْ مَنْ قَدَّسَهُ، لَكِنَّ أَثَرَهُ فِي التَّصَوُّفِ لَا يُنْكِرُهُ أَحَدٌ.`,
    translation: `Muhyi al-Din ibn Arabi was born in Murcia, Andalusia, and traveled throughout the entire Islamic world. He met Ibn Rushd the philosopher as a young man, and Ibn Rushd asked him: "What have you found through mystical unveiling?" He answered: "Yes and no. Between yes and no, spirits fly from their substances and necks from their bodies." He authored more than three hundred books, the most famous being "The Meccan Revelations" and "The Bezels of Wisdom." He saw all existence as a manifestation of the Divine, and the Perfect Human as the mirror of Divine Names. Scholars differed about him—some declared him a disbeliever, others sanctified him—but no one denies his influence on Sufism.`,
    grammaticalConcepts: ['dual between structure', 'من + relative pronoun', 'passive voice'],
    vocabularyHighlights: [
      { word: 'طَافَ', meaning: 'traveled around' },
      { word: 'الكَشْفِ', meaning: 'mystical unveiling' },
      { word: 'تَجَلٍّ', meaning: 'manifestation' },
      { word: 'كَفَّرَهُ', meaning: 'declared him disbeliever' },
      { word: 'قَدَّسَهُ', meaning: 'sanctified him' }
    ],
    moralLesson: 'The greatest thinkers often divide opinion yet change the world.',
    moralLessonAr: 'أَعْظَمُ المُفَكِّرِينَ غَالِبًا يُثِيرُونَ الخِلَافَ لَكِنَّهُمْ يُغَيِّرُونَ العَالَمَ.',
    wordCount: 98
  },
  {
    id: 'a120',
    title: 'Maryam Al-Astrolabiyya: The Astronomer',
    titleAr: 'مَرْيَمُ الأَسْطُرْلَابِيَّةُ: عَالِمَةُ الفَلَكِ',
    level: 'advanced',
    category: 'biographical',
    categoryAr: 'السير والتراجم',
    text: `فِي القَرْنِ العَاشِرِ المِيلَادِيِّ، بَرَزَتْ فِي حَلَبَ امْرَأَةٌ اسْمُهَا مَرْيَمُ الأَسْطُرْلَابِيَّةُ. كَانَتِ ابْنَةَ صَانِعِ أَسْطُرْلَابَاتٍ مَشْهُورٍ، وَتَعَلَّمَتْ مِنْهُ الصَّنْعَةَ حَتَّى فَاقَتْهُ. صَنَعَتْ أَسْطُرْلَابَاتٍ لِسَيْفِ الدَّوْلَةِ الحَمْدَانِيِّ، أَمِيرِ حَلَبَ الَّذِي جَمَعَ حَوْلَهُ العُلَمَاءَ وَالشُّعَرَاءَ. الأَسْطُرْلَابُ آلَةٌ مُعَقَّدَةٌ تَجْمَعُ بَيْنَ الرِّيَاضِيَّاتِ وَالفَلَكِ وَالهَنْدَسَةِ. كَانَتْ تُسْتَخْدَمُ لِتَحْدِيدِ أَوْقَاتِ الصَّلَاةِ وَاتِّجَاهِ القِبْلَةِ وَمَوَاقِعِ النُّجُومِ. أَنْ تَبْرَعَ امْرَأَةٌ فِي هَذِهِ الصَّنْعَةِ الدَّقِيقَةِ فِي ذَلِكَ العَصْرِ دَلِيلٌ عَلَى أَنَّ الحَضَارَةَ الإِسْلَامِيَّةَ أَتَاحَتْ لِلْمَرْأَةِ فُرَصًا عِلْمِيَّةً لَمْ تُتَحْ فِي حَضَارَاتٍ أُخْرَى.`,
    translation: `In the tenth century CE, a woman named Maryam al-Astrolabiyya emerged in Aleppo. She was the daughter of a famous astrolabe maker, and learned the craft from him until she surpassed him. She made astrolabes for Sayf al-Dawla al-Hamdani, the Emir of Aleppo who gathered scholars and poets around him. The astrolabe is a complex instrument combining mathematics, astronomy, and engineering. It was used to determine prayer times, the direction of Qibla, and star positions. That a woman excelled in this precise craft in that era is evidence that Islamic civilization afforded women scientific opportunities not available in other civilizations.`,
    grammaticalConcepts: ['relative clause الَّذِي', 'passive voice تُسْتَخْدَم', 'أَنْ + verb as subject'],
    vocabularyHighlights: [
      { word: 'بَرَزَتْ', meaning: 'emerged, excelled' },
      { word: 'فَاقَتْهُ', meaning: 'surpassed him' },
      { word: 'الأَسْطُرْلَابُ', meaning: 'astrolabe' },
      { word: 'الهَنْدَسَةِ', meaning: 'engineering' },
      { word: 'أَتَاحَتْ', meaning: 'afforded, provided' }
    ],
    moralLesson: 'Excellence recognizes no barriers of gender or time.',
    moralLessonAr: 'التَّمَيُّزُ لَا يَعْرِفُ حَوَاجِزَ الجِنْسِ أَوِ الزَّمَانِ.',
    wordCount: 91
  },
  {
    id: 'a121',
    title: 'Imam Ahmad: Standing Alone Against Power',
    titleAr: 'الإِمَامُ أَحْمَدُ: الوُقُوفُ وَحِيدًا أَمَامَ السُّلْطَةِ',
    level: 'advanced',
    category: 'biographical',
    categoryAr: 'السير والتراجم',
    text: `أَحْمَدُ بْنُ حَنْبَلٍ جَمَعَ أَكْثَرَ مِنْ مِلْيُونِ حَدِيثٍ وَأَلَّفَ "المُسْنَدَ" الَّذِي يَحْوِي ثَلَاثِينَ أَلْفَ حَدِيثٍ. لَكِنَّ شُهْرَتَهُ الحَقِيقِيَّةَ جَاءَتْ مِنْ مَوْقِفِهِ فِي المِحْنَةِ. أَرَادَ الخَلِيفَةُ المَأْمُونُ إِجْبَارَ العُلَمَاءِ عَلَى القَوْلِ بِأَنَّ القُرْآنَ مَخْلُوقٌ. رَفَضَ الإِمَامُ أَحْمَدُ وَحْدَهُ بَيْنَ العُلَمَاءِ. سُجِنَ وَجُلِدَ حَتَّى أُغْمِيَ عَلَيْهِ. لَمْ يَتَرَاجَعْ. سَأَلُوهُ: "أَلَا تَخَافُ المَوْتَ؟" قَالَ: "إِذَا سَكَتَ العَالِمُ خَوْفًا، وَتَكَلَّمَ الجَاهِلُ جَهْلًا، فَمَتَى يُعْرَفُ الحَقُّ؟" صَارَ رَمْزًا لِلثَّبَاتِ عَلَى الحَقِّ فِي وَجْهِ الطُّغْيَانِ.`,
    translation: `Ahmad ibn Hanbal collected more than a million hadiths and authored "The Musnad" containing thirty thousand hadiths. But his true fame came from his stance during the Inquisition. Caliph al-Ma'mun wanted to force scholars to say the Quran was created. Imam Ahmad alone among scholars refused. He was imprisoned and flogged until he fainted. He did not retreat. They asked him: "Do you not fear death?" He said: "If the scholar is silent out of fear, and the ignorant speaks out of ignorance, then when will truth be known?" He became a symbol of steadfastness on truth in the face of tyranny.`,
    grammaticalConcepts: ['passive voice سُجِنَ/جُلِدَ', 'conditional إِذَا', 'rhetorical question'],
    vocabularyHighlights: [
      { word: 'المِحْنَةِ', meaning: 'the Inquisition, trial' },
      { word: 'مَخْلُوقٌ', meaning: 'created' },
      { word: 'جُلِدَ', meaning: 'was flogged' },
      { word: 'أُغْمِيَ عَلَيْهِ', meaning: 'he fainted' },
      { word: 'الطُّغْيَانِ', meaning: 'tyranny' }
    ],
    moralLesson: 'One person standing for truth can change history.',
    moralLessonAr: 'شَخْصٌ وَاحِدٌ يَقِفُ لِلْحَقِّ قَدْ يُغَيِّرُ التَّارِيخَ.',
    wordCount: 92
  },
  {
    id: 'a122',
    title: 'Al-Jazari: The Father of Robotics',
    titleAr: 'الجَزَرِيُّ: أَبُو الرُّوبُوتَاتِ',
    level: 'advanced',
    category: 'biographical',
    categoryAr: 'السير والتراجم',
    text: `بَدِيعُ الزَّمَانِ أَبُو العِزِّ الجَزَرِيُّ خَدَمَ أُمَرَاءَ دِيَارِ بَكْرٍ خَمْسًا وَعِشْرِينَ سَنَةً. فِي سَنَةِ 1206م، أَتَمَّ كِتَابَهُ "الجَامِعُ بَيْنَ العِلْمِ وَالعَمَلِ النَّافِعِ فِي صِنَاعَةِ الحِيَلِ." وَصَفَ فِيهِ خَمْسِينَ آلَةً عَجِيبَةً. صَنَعَ سَاعَةً عَلَى شَكْلِ فِيلٍ يَتَحَرَّكُ فِيهَا إِنْسَانٌ آلِيٌّ. صَمَّمَ آلَاتٍ مُوسِيقِيَّةً تَعْزِفُ وَحْدَهَا. اخْتَرَعَ صَمَّامَاتٍ تُسْتَخْدَمُ حَتَّى اليَوْمِ فِي المُحَرِّكَاتِ. جَمَعَ بَيْنَ الخَيَالِ وَالهَنْدَسَةِ وَالفَنِّ. لَمْ يَكُنْ يَصْنَعُ آلَاتٍ نَافِعَةً فَحَسْبُ، بَلْ آلَاتٍ جَمِيلَةً تُدْهِشُ العَقْلَ وَتُسْعِدُ النَّفْسَ. هُوَ دَلِيلٌ عَلَى أَنَّ الإِبْدَاعَ لَا حُدُودَ لَهُ.`,
    translation: `Badi' al-Zaman Abu al-'Izz al-Jazari served the princes of Diyar Bakr for twenty-five years. In 1206 CE, he completed his book "The Book of Knowledge of Ingenious Mechanical Devices." He described fifty wondrous machines in it. He made a clock in the shape of an elephant with an automaton moving inside it. He designed musical instruments that played by themselves. He invented valves still used today in engines. He combined imagination, engineering, and art. He did not only make useful machines, but beautiful ones that amaze the mind and delight the soul. He is proof that creativity has no limits.`,
    grammaticalConcepts: ['numbers with nouns', 'passive voice تُسْتَخْدَم', 'negation لَا...فَحَسْبُ، بَلْ'],
    vocabularyHighlights: [
      { word: 'الحِيَلِ', meaning: 'ingenious devices, tricks' },
      { word: 'إِنْسَانٌ آلِيٌّ', meaning: 'automaton, robot' },
      { word: 'صَمَّامَاتٍ', meaning: 'valves' },
      { word: 'المُحَرِّكَاتِ', meaning: 'engines' },
      { word: 'الإِبْدَاعَ', meaning: 'creativity' }
    ],
    moralLesson: 'True innovation combines utility with beauty.',
    moralLessonAr: 'الابْتِكَارُ الحَقِيقِيُّ يَجْمَعُ بَيْنَ النَّفْعِ وَالجَمَالِ.',
    wordCount: 93
  },
  {
    id: 'a123',
    title: 'Ibn Khaldun: The Father of Sociology',
    titleAr: 'ابْنُ خَلْدُونٍ: أَبُو عِلْمِ الاجْتِمَاعِ',
    level: 'advanced',
    category: 'biographical',
    categoryAr: 'السير والتراجم',
    text: `عَبْدُ الرَّحْمَنِ بْنُ خَلْدُونٍ وُلِدَ فِي تُونُسَ لِأُسْرَةٍ أَنْدَلُسِيَّةٍ. عَاشَ فِي زَمَنِ الفِتَنِ وَسُقُوطِ الدُّوَلِ. شَغَلَ مَنَاصِبَ عَالِيَةً، ثُمَّ اعْتَزَلَ فِي قَلْعَةٍ بِالجَزَائِرِ أَرْبَعَ سَنَوَاتٍ لِيَكْتُبَ "المُقَدِّمَةَ." سَأَلَ: لِمَاذَا تَقُومُ الدُّوَلُ وَلِمَاذَا تَسْقُطُ؟ مَا الَّذِي يُحَرِّكُ التَّارِيخَ؟ اكْتَشَفَ أَنَّ "العَصَبِيَّةَ" (رَوَابِطُ القَرَابَةِ وَالوَلَاءِ) هِيَ مُحَرِّكُ التَّارِيخِ. وَأَنَّ الحَضَارَةَ تَمُرُّ بِمَرَاحِلَ كَالكَائِنِ الحَيِّ: وِلَادَةٌ وَنُمُوٌّ وَشَيْخُوخَةٌ وَمَوْتٌ. قَبْلَ مَاكْيَافِيلِّي بِقَرْنٍ، فَهِمَ ابْنُ خَلْدُونٍ أَنَّ السِّيَاسَةَ عِلْمٌ لَهُ قَوَانِينُهُ.`,
    translation: `Abd al-Rahman ibn Khaldun was born in Tunisia to an Andalusian family. He lived in an era of civil strife and falling states. He held high positions, then secluded himself in a castle in Algeria for four years to write "The Muqaddimah." He asked: Why do states rise and why do they fall? What moves history? He discovered that "asabiyyah" (bonds of kinship and loyalty) is the engine of history. And that civilization passes through stages like a living organism: birth, growth, old age, and death. A century before Machiavelli, Ibn Khaldun understood that politics is a science with its own laws.`,
    grammaticalConcepts: ['indirect questions لِمَاذَا', 'relative clause مَا الَّذِي', 'comparison كَـ'],
    vocabularyHighlights: [
      { word: 'الفِتَنِ', meaning: 'civil strife' },
      { word: 'اعْتَزَلَ', meaning: 'secluded himself' },
      { word: 'العَصَبِيَّةَ', meaning: 'group solidarity' },
      { word: 'مُحَرِّكُ', meaning: 'driver, engine' },
      { word: 'شَيْخُوخَةٌ', meaning: 'old age' }
    ],
    moralLesson: 'Understanding the patterns of history helps us shape the future.',
    moralLessonAr: 'فَهْمُ أَنْمَاطِ التَّارِيخِ يُسَاعِدُنَا عَلَى تَشْكِيلِ المُسْتَقْبَلِ.',
    wordCount: 96
  },
  {
    id: 'a124',
    title: 'Fatima Al-Fihri: Builder of the First University',
    titleAr: 'فَاطِمَةُ الفِهْرِيَّةُ: بَانِيَةُ أَوَّلِ جَامِعَةٍ',
    level: 'advanced',
    category: 'biographical',
    categoryAr: 'السير والتراجم',
    text: `فِي سَنَةِ 859م، فِي مَدِينَةِ فَاسٍ بِالمَغْرِبِ، قَرَّرَتِ امْرَأَةٌ اسْمُهَا فَاطِمَةُ الفِهْرِيَّةُ أَنْ تَبْنِيَ مَسْجِدًا بِمِيرَاثِ أَبِيهَا. لَكِنَّهَا لَمْ تَكْتَفِ بِالمَسْجِدِ، بَلْ أَضَافَتْ إِلَيْهِ مَدْرَسَةً صَارَتْ أَوَّلَ جَامِعَةٍ فِي التَّارِيخِ: جَامِعَةُ القَرَوِيِّينَ. صَامَتْ طُولَ فَتْرَةِ البِنَاءِ تَقَرُّبًا إِلَى اللهِ. دَرَسَ فِيهَا عُلَمَاءُ مُسْلِمُونَ وَيَهُودٌ وَمَسِيحِيُّونَ. تَخَرَّجَ مِنْهَا البَابَا سِيلْفِسْتِرُ الثَّانِي الَّذِي نَقَلَ الأَرْقَامَ العَرَبِيَّةَ إِلَى أُورُوبَّا. لَا تَزَالُ الجَامِعَةُ قَائِمَةً بَعْدَ أَكْثَرَ مِنْ أَلْفِ سَنَةٍ، شَاهِدَةً عَلَى رُؤْيَةِ امْرَأَةٍ آمَنَتْ بِقُوَّةِ العِلْمِ.`,
    translation: `In 859 CE, in the city of Fez, Morocco, a woman named Fatima al-Fihri decided to build a mosque with her father's inheritance. But she was not content with just a mosque—she added a school that became the first university in history: the University of al-Qarawiyyin. She fasted throughout the construction period as an act of devotion to God. Muslim, Jewish, and Christian scholars studied there. Pope Sylvester II, who brought Arabic numerals to Europe, graduated from it. The university still stands after more than a thousand years, witnessing the vision of a woman who believed in the power of knowledge.`,
    grammaticalConcepts: ['negation لَمْ تَكْتَفِ...بَلْ', 'relative clause الَّذِي', 'active participle شَاهِدَةً'],
    vocabularyHighlights: [
      { word: 'مِيرَاثِ', meaning: 'inheritance' },
      { word: 'تَكْتَفِ', meaning: 'be content with' },
      { word: 'تَقَرُّبًا', meaning: 'drawing near, devotion' },
      { word: 'تَخَرَّجَ', meaning: 'graduated' },
      { word: 'شَاهِدَةً', meaning: 'witnessing' }
    ],
    moralLesson: 'One act of vision can echo through a thousand years.',
    moralLessonAr: 'فِعْلُ رُؤْيَةٍ وَاحِدٌ قَدْ يَتَرَدَّدُ صَدَاهُ أَلْفَ سَنَةٍ.',
    wordCount: 95
  }
];
