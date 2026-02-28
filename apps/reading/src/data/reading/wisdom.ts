// src/data/reading/wisdom.ts
// Wisdom & Proverbs - Classical Arabic wisdom literature, moral maxims, and timeless sayings

import { ReadingText } from './types';

export const wisdomTexts: ReadingText[] = [
  // ===== BEGINNER (b145-b150) =====
  {
    id: 'b145',
    title: 'The Value of Silence',
    titleAr: 'قِيمَةُ الصَّمْتِ',
    level: 'beginner',
    category: 'wisdom-proverbs',
    categoryAr: 'الحكم والأمثال',
    text: `قَالَ الحُكَمَاءُ: "إِذَا كَانَ الكَلَامُ مِنْ فِضَّةٍ، فَالسُّكُوتُ مِنْ ذَهَبٍ." الكَلَامُ الكَثِيرُ يُوقِعُ الإِنْسَانَ فِي المَشَاكِلِ. السُّكُوتُ يَحْمِي مِنَ النَّدَمِ. مَنْ صَمَتَ سَلِمَ. لَكِنَّ السُّكُوتَ عَنِ الحَقِّ لَيْسَ حِكْمَةً. الحِكْمَةُ أَنْ تَتَكَلَّمَ فِي الوَقْتِ المُنَاسِبِ، وَتَسْكُتَ فِي الوَقْتِ المُنَاسِبِ.`,
    translation: `The wise said: "If speech is silver, then silence is gold." Too much talk leads a person into problems. Silence protects from regret. Whoever is silent is safe. But silence about truth is not wisdom. Wisdom is to speak at the right time, and be silent at the right time.`,
    grammaticalConcepts: ['conditional إِذَا', 'من + past tense', 'مصدر as subject'],
    vocabularyHighlights: [
      { word: 'الحُكَمَاءُ', meaning: 'the wise ones' },
      { word: 'فِضَّةٍ', meaning: 'silver' },
      { word: 'السُّكُوتُ', meaning: 'silence' },
      { word: 'النَّدَمِ', meaning: 'regret' }
    ],
    moralLesson: 'Know when to speak and when to remain silent.',
    moralLessonAr: 'اعْرِفْ مَتَى تَتَكَلَّمُ وَمَتَى تَصْمُتُ.',
    wordCount: 42
  },
  {
    id: 'b146',
    title: 'Patience is a Tree',
    titleAr: 'الصَّبْرُ شَجَرَةٌ',
    level: 'beginner',
    category: 'wisdom-proverbs',
    categoryAr: 'الحكم والأمثال',
    text: `قِيلَ: "الصَّبْرُ شَجَرَةٌ جُذُورُهَا مُرَّةٌ، وَثِمَارُهَا حُلْوَةٌ." الصَّبْرُ صَعْبٌ فِي البِدَايَةِ. لَكِنَّ نَتَائِجَهُ جَمِيلَةٌ. مَنْ صَبَرَ ظَفِرَ. الصَّبْرُ مِفْتَاحُ الفَرَجِ. كُلُّ شِدَّةٍ بَعْدَهَا فَرَجٌ، وَكُلُّ ضِيقٍ بَعْدَهُ سَعَةٌ.`,
    translation: `It was said: "Patience is a tree whose roots are bitter, but whose fruits are sweet." Patience is difficult in the beginning. But its results are beautiful. Whoever is patient succeeds. Patience is the key to relief. After every hardship comes ease, and after every constriction comes expansion.`,
    grammaticalConcepts: ['passive voice قِيلَ', 'relative clause جُذُورُهَا', 'من + past tense'],
    vocabularyHighlights: [
      { word: 'جُذُورُهَا', meaning: 'its roots' },
      { word: 'مُرَّةٌ', meaning: 'bitter' },
      { word: 'ظَفِرَ', meaning: 'succeeded, won' },
      { word: 'الفَرَجِ', meaning: 'relief' }
    ],
    moralLesson: 'Endure the difficulty; the reward will come.',
    moralLessonAr: 'تَحَمَّلِ الصُّعُوبَةَ؛ المُكَافَأَةُ سَتَأْتِي.',
    wordCount: 38
  },
  {
    id: 'b147',
    title: 'The Friend in Need',
    titleAr: 'الصَّدِيقُ وَقْتَ الضِّيقِ',
    level: 'beginner',
    category: 'wisdom-proverbs',
    categoryAr: 'الحكم والأمثال',
    text: `يَقُولُ المَثَلُ العَرَبِيُّ: "الصَّدِيقُ وَقْتَ الضِّيقِ." مَعْنَاهُ أَنَّ الصَّدِيقَ الحَقِيقِيَّ يَظْهَرُ فِي الأَوْقَاتِ الصَّعْبَةِ. الأَصْدِقَاءُ كَثِيرُونَ فِي الرَّخَاءِ. لَكِنَّ القَلِيلَ يَبْقَى فِي الشِّدَّةِ. اخْتَبِرْ صَدِيقَكَ قَبْلَ أَنْ تَحْتَاجَهُ. الصَّدِيقُ الوَفِيُّ كَنْزٌ لَا يُقَدَّرُ بِثَمَنٍ.`,
    translation: `The Arabic proverb says: "A friend in time of hardship." It means the true friend appears in difficult times. Friends are many in prosperity. But few remain in adversity. Test your friend before you need him. A loyal friend is a treasure beyond price.`,
    grammaticalConcepts: ['imperative اخْتَبِرْ', 'قَبْلَ أَنْ + subjunctive', 'passive يُقَدَّر'],
    vocabularyHighlights: [
      { word: 'الضِّيقِ', meaning: 'hardship, distress' },
      { word: 'الرَّخَاءِ', meaning: 'prosperity' },
      { word: 'الشِّدَّةِ', meaning: 'adversity' },
      { word: 'الوَفِيُّ', meaning: 'loyal, faithful' }
    ],
    moralLesson: 'True friendship is proven in times of need.',
    moralLessonAr: 'الصَّدَاقَةُ الحَقِيقِيَّةُ تُثْبَتُ فِي أَوْقَاتِ الحَاجَةِ.',
    wordCount: 40
  },
  {
    id: 'b148',
    title: 'Knowledge is Light',
    titleAr: 'العِلْمُ نُورٌ',
    level: 'beginner',
    category: 'wisdom-proverbs',
    categoryAr: 'الحكم والأمثال',
    text: `قَالَ عَلِيُّ بْنُ أَبِي طَالِبٍ: "العِلْمُ خَيْرٌ مِنَ المَالِ. العِلْمُ يَحْرُسُكَ، وَأَنْتَ تَحْرُسُ المَالَ." العِلْمُ نُورٌ يُضِيءُ الطَّرِيقَ. الجَهْلُ ظَلَامٌ يُضِلُّ الإِنْسَانَ. العِلْمُ يَزِيدُ بِالإِنْفَاقِ، وَالمَالُ يَنْقُصُ. اطْلُبِ العِلْمَ مِنَ المَهْدِ إِلَى اللَّحْدِ.`,
    translation: `Ali ibn Abi Talib said: "Knowledge is better than wealth. Knowledge guards you, while you guard wealth." Knowledge is a light that illuminates the path. Ignorance is darkness that misguides a person. Knowledge increases by spending, while wealth decreases. Seek knowledge from the cradle to the grave.`,
    grammaticalConcepts: ['comparative خَيْرٌ مِن', 'contrast وَ', 'imperative اطْلُبْ'],
    vocabularyHighlights: [
      { word: 'يَحْرُسُكَ', meaning: 'guards you' },
      { word: 'يُضِلُّ', meaning: 'misguides' },
      { word: 'المَهْدِ', meaning: 'cradle' },
      { word: 'اللَّحْدِ', meaning: 'grave' }
    ],
    moralLesson: 'Invest in knowledge; it is the only wealth that grows when shared.',
    moralLessonAr: 'اسْتَثْمِرْ فِي العِلْمِ؛ هُوَ الثَّرْوَةُ الوَحِيدَةُ الَّتِي تَنْمُو بِالمُشَارَكَةِ.',
    wordCount: 39
  },
  {
    id: 'b149',
    title: 'The Mirror of the Heart',
    titleAr: 'مِرْآةُ القَلْبِ',
    level: 'beginner',
    category: 'wisdom-proverbs',
    categoryAr: 'الحكم والأمثال',
    text: `قَالَ حَكِيمٌ: "القَلْبُ مِرْآةٌ. إِذَا كَانَ نَقِيًّا، رَأَى الجَمَالَ فِي كُلِّ شَيْءٍ." القَلْبُ الطَّيِّبُ يَرَى الخَيْرَ فِي النَّاسِ. القَلْبُ الفَاسِدُ يَرَى السُّوءَ فِي كُلِّ مَكَانٍ. نَظِّفْ قَلْبَكَ أَوَّلًا، ثُمَّ سَتَرَى العَالَمَ جَمِيلًا.`,
    translation: `A wise man said: "The heart is a mirror. If it is pure, it sees beauty in everything." The good heart sees goodness in people. The corrupt heart sees evil everywhere. Clean your heart first, then you will see the world as beautiful.`,
    grammaticalConcepts: ['conditional إِذَا كَانَ', 'imperative نَظِّفْ', 'future with سَـ'],
    vocabularyHighlights: [
      { word: 'مِرْآةٌ', meaning: 'mirror' },
      { word: 'نَقِيًّا', meaning: 'pure, clean' },
      { word: 'الطَّيِّبُ', meaning: 'good, pure' },
      { word: 'الفَاسِدُ', meaning: 'corrupt' }
    ],
    moralLesson: 'What you see in others reflects what is in your heart.',
    moralLessonAr: 'مَا تَرَاهُ فِي الآخَرِينَ يَعْكِسُ مَا فِي قَلْبِكَ.',
    wordCount: 36
  },
  {
    id: 'b150',
    title: 'Actions Speak',
    titleAr: 'الأَفْعَالُ تَتَكَلَّمُ',
    level: 'beginner',
    category: 'wisdom-proverbs',
    categoryAr: 'الحكم والأمثال',
    text: `مِنْ أَمْثَالِ العَرَبِ: "لَا تَنْظُرْ إِلَى مَا يَقُولُ، بَلِ انْظُرْ إِلَى مَا يَفْعَلُ." الكَلَامُ سَهْلٌ، وَالفِعْلُ صَعْبٌ. النَّاسُ يُعْرَفُونَ بِأَفْعَالِهِمْ لَا بِأَقْوَالِهِمْ. الوَعْدُ بِدُونِ فِعْلٍ كَالسَّحَابِ بِدُونِ مَطَرٍ. أَرِنِي فِعْلَكَ، لَا كَلَامَكَ.`,
    translation: `From Arab proverbs: "Don't look at what he says, but look at what he does." Talk is easy, action is hard. People are known by their actions, not their words. A promise without action is like clouds without rain. Show me your action, not your words.`,
    grammaticalConcepts: ['imperative negative لَا تَنْظُرْ', 'passive يُعْرَفُون', 'comparison كَـ'],
    vocabularyHighlights: [
      { word: 'أَمْثَالِ', meaning: 'proverbs' },
      { word: 'يُعْرَفُونَ', meaning: 'are known' },
      { word: 'الوَعْدُ', meaning: 'promise' },
      { word: 'السَّحَابِ', meaning: 'clouds' }
    ],
    moralLesson: 'Judge by deeds, not by words.',
    moralLessonAr: 'احْكُمْ بِالأَفْعَالِ لَا بِالأَقْوَالِ.',
    wordCount: 38
  },

  // ===== INTERMEDIATE (i136-i141) =====
  {
    id: 'i226',
    title: 'The Wisdom of Luqman',
    titleAr: 'حِكْمَةُ لُقْمَانَ',
    level: 'intermediate',
    category: 'wisdom-proverbs',
    categoryAr: 'الحكم والأمثال',
    text: `قَالَ لُقْمَانُ لِابْنِهِ: "يَا بُنَيَّ، لَا تُعَلِّقْ قَلْبَكَ بِمَا لَمْ تَنَلْهُ، فَتَشْقَى بِمَا لَيْسَ لَكَ. وَلَا تُهْمِلْ مَا نِلْتَهُ، فَتَخْسَرَ مَا هُوَ لَكَ." وَقَالَ: "ثَلَاثَةٌ لَا يُعْرَفُونَ إِلَّا فِي ثَلَاثٍ: الشُّجَاعُ فِي الحَرْبِ، وَالحَلِيمُ عِنْدَ الغَضَبِ، وَالصَّدِيقُ عِنْدَ الحَاجَةِ." هَذِهِ الحِكَمُ بَاقِيَةٌ رَغْمَ مُرُورِ آلَافِ السِّنِينَ.`,
    translation: `Luqman said to his son: "My son, do not attach your heart to what you have not attained, lest you suffer for what is not yours. And do not neglect what you have attained, lest you lose what is yours." He also said: "Three are not known except in three situations: the brave in war, the forbearing at anger, and the friend at need." These wisdoms remain despite thousands of years passing.`,
    grammaticalConcepts: ['prohibitive لَا تُعَلِّقْ', 'فَـ + subjunctive result', 'exception إِلَّا'],
    vocabularyHighlights: [
      { word: 'تَنَلْهُ', meaning: 'attain it' },
      { word: 'تَشْقَى', meaning: 'suffer' },
      { word: 'الحَلِيمُ', meaning: 'forbearing, patient' },
      { word: 'بَاقِيَةٌ', meaning: 'remaining, lasting' }
    ],
    moralLesson: 'Appreciate what you have; true character shows in trials.',
    moralLessonAr: 'قَدِّرْ مَا عِنْدَكَ؛ الشَّخْصِيَّةُ الحَقِيقِيَّةُ تَظْهَرُ فِي المِحَنِ.',
    wordCount: 56
  },
  {
    id: 'i227',
    title: 'The Wisdom of Moderation',
    titleAr: 'حِكْمَةُ الاعْتِدَالِ',
    level: 'intermediate',
    category: 'wisdom-proverbs',
    categoryAr: 'الحكم والأمثال',
    text: `قَالَ الإِمَامُ عَلِيٌّ: "خَيْرُ الأُمُورِ أَوْسَطُهَا." الإِفْرَاطُ وَالتَّفْرِيطُ كِلَاهُمَا ضَرَرٌ. الكَرَمُ الزَّائِدُ يُصْبِحُ تَبْذِيرًا. وَالحَذَرُ الزَّائِدُ يُصْبِحُ جُبْنًا. وَالثِّقَةُ الزَّائِدَةُ تُصْبِحُ غُرُورًا. الحَكِيمُ يَمْشِي فِي الوَسَطِ. لَا يَمِيلُ يَمِينًا وَلَا شِمَالًا. التَّوَازُنُ هُوَ سِرُّ السَّعَادَةِ وَالاسْتِقْرَارِ.`,
    translation: `Imam Ali said: "The best of matters is the middle." Excess and negligence are both harmful. Too much generosity becomes wastefulness. Too much caution becomes cowardice. Too much confidence becomes arrogance. The wise walks in the middle. He does not lean right or left. Balance is the secret of happiness and stability.`,
    grammaticalConcepts: ['superlative خَيْرُ', 'dual كِلَاهُمَا', 'negation لَا...وَلَا'],
    vocabularyHighlights: [
      { word: 'الإِفْرَاطُ', meaning: 'excess' },
      { word: 'التَّفْرِيطُ', meaning: 'negligence' },
      { word: 'تَبْذِيرًا', meaning: 'wastefulness' },
      { word: 'غُرُورًا', meaning: 'arrogance' },
      { word: 'التَّوَازُنُ', meaning: 'balance' }
    ],
    moralLesson: 'Moderation in all things leads to lasting success.',
    moralLessonAr: 'الاعْتِدَالُ فِي كُلِّ شَيْءٍ يَقُودُ إِلَى نَجَاحٍ دَائِمٍ.',
    wordCount: 52
  },
  {
    id: 'i228',
    title: 'The Tongue is a Beast',
    titleAr: 'اللِّسَانُ وَحْشٌ',
    level: 'intermediate',
    category: 'wisdom-proverbs',
    categoryAr: 'الحكم والأمثال',
    text: `قَالَ حَكِيمٌ: "اللِّسَانُ وَحْشٌ. إِنْ أَطْلَقْتَهُ افْتَرَسَكَ." جُرْحُ اللِّسَانِ أَعْمَقُ مِنْ جُرْحِ السَّيْفِ. الكَلِمَةُ إِذَا خَرَجَتْ لَا تَعُودُ. كَمْ مِنْ صَدَاقَةٍ قَتَلَتْهَا كَلِمَةٌ! وَكَمْ مِنْ حَرْبٍ أَشْعَلَتْهَا كَلِمَةٌ! فَكِّرْ ثَلَاثًا قَبْلَ أَنْ تَتَكَلَّمَ مَرَّةً. لِسَانُكَ حِصَانُكَ: إِنْ صُنْتَهُ صَانَكَ، وَإِنْ خُنْتَهُ خَانَكَ.`,
    translation: `A wise man said: "The tongue is a beast. If you release it, it devours you." A wound from the tongue is deeper than a wound from the sword. A word once uttered does not return. How many friendships has a word killed! How many wars has a word ignited! Think three times before speaking once. Your tongue is your horse: if you preserve it, it preserves you; if you betray it, it betrays you.`,
    grammaticalConcepts: ['conditional إِنْ', 'rhetorical كَمْ مِنْ', 'parallel structure'],
    vocabularyHighlights: [
      { word: 'وَحْشٌ', meaning: 'beast' },
      { word: 'افْتَرَسَكَ', meaning: 'devours you' },
      { word: 'أَشْعَلَتْهَا', meaning: 'ignited it' },
      { word: 'صُنْتَهُ', meaning: 'preserve it' }
    ],
    moralLesson: 'Guard your tongue; words once spoken cannot be taken back.',
    moralLessonAr: 'احْفَظْ لِسَانَكَ؛ الكَلِمَاتُ إِذَا قِيلَتْ لَا تُسْتَرَدُّ.',
    wordCount: 58
  },
  {
    id: 'i229',
    title: 'The Four Pillars of Wisdom',
    titleAr: 'أَرْكَانُ الحِكْمَةِ الأَرْبَعَةُ',
    level: 'intermediate',
    category: 'wisdom-proverbs',
    categoryAr: 'الحكم والأمثال',
    text: `سُئِلَ حَكِيمٌ: "مَا أَرْكَانُ الحِكْمَةِ؟" قَالَ: "أَرْبَعَةٌ. أَوَّلُهَا: أَنْ تَعْرِفَ أَنَّكَ لَا تَعْرِفُ كُلَّ شَيْءٍ. ثَانِيهَا: أَنْ تَسْمَعَ أَكْثَرَ مِمَّا تَتَكَلَّمُ. ثَالِثُهَا: أَنْ تَتَعَلَّمَ مِنْ أَخْطَائِكَ. رَابِعُهَا: أَنْ تَتَوَاضَعَ مَهْمَا عَلَتْ مَكَانَتُكَ." هَذِهِ الأَرْبَعَةُ أَبْوَابُ الحِكْمَةِ. مَنْ دَخَلَهَا صَارَ حَكِيمًا.`,
    translation: `A wise man was asked: "What are the pillars of wisdom?" He said: "Four. The first: to know that you do not know everything. The second: to listen more than you speak. The third: to learn from your mistakes. The fourth: to be humble no matter how high your status rises." These four are the gates of wisdom. Whoever enters them becomes wise.`,
    grammaticalConcepts: ['ordinal numbers', 'أَنْ + subjunctive', 'مَهْمَا concessive'],
    vocabularyHighlights: [
      { word: 'أَرْكَانُ', meaning: 'pillars' },
      { word: 'تَتَوَاضَعَ', meaning: 'be humble' },
      { word: 'عَلَتْ', meaning: 'rose, became high' },
      { word: 'مَكَانَتُكَ', meaning: 'your status' }
    ],
    moralLesson: 'Humility and self-awareness are the foundations of wisdom.',
    moralLessonAr: 'التَّوَاضُعُ وَالوَعْيُ بِالذَّاتِ أَسَاسَا الحِكْمَةِ.',
    wordCount: 54
  },
  {
    id: 'i230',
    title: 'Time is a Sword',
    titleAr: 'الوَقْتُ كَالسَّيْفِ',
    level: 'intermediate',
    category: 'wisdom-proverbs',
    categoryAr: 'الحكم والأمثال',
    text: `مِنْ أَشْهَرِ الحِكَمِ العَرَبِيَّةِ: "الوَقْتُ كَالسَّيْفِ، إِنْ لَمْ تَقْطَعْهُ قَطَعَكَ." الوَقْتُ لَا يَنْتَظِرُ أَحَدًا. كُلُّ لَحْظَةٍ تَمُرُّ لَا تَعُودُ أَبَدًا. الحَكِيمُ يَسْتَثْمِرُ وَقْتَهُ فِيمَا يَنْفَعُ. الجَاهِلُ يُضَيِّعُهُ فِيمَا لَا يَنْفَعُ. النَّدَمُ عَلَى الوَقْتِ الضَّائِعِ لَا يُعِيدُهُ. افْعَلِ اليَوْمَ مَا تَسْتَطِيعُ، وَلَا تُؤَجِّلْهُ إِلَى الغَدِ.`,
    translation: `Among the most famous Arabic wisdoms: "Time is like a sword; if you do not cut it, it cuts you." Time waits for no one. Every moment that passes never returns. The wise invests his time in what benefits. The ignorant wastes it in what does not benefit. Regret over wasted time does not bring it back. Do today what you can, and do not postpone it to tomorrow.`,
    grammaticalConcepts: ['conditional إِنْ لَمْ', 'relative clause فِيمَا', 'imperative + prohibition'],
    vocabularyHighlights: [
      { word: 'تَقْطَعْهُ', meaning: 'cut it' },
      { word: 'يَسْتَثْمِرُ', meaning: 'invests' },
      { word: 'الضَّائِعِ', meaning: 'wasted, lost' },
      { word: 'تُؤَجِّلْهُ', meaning: 'postpone it' }
    ],
    moralLesson: 'Use time wisely; wasted moments never return.',
    moralLessonAr: 'اسْتَخْدِمِ الوَقْتَ بِحِكْمَةٍ؛ اللَّحَظَاتُ الضَّائِعَةُ لَا تَعُودُ.',
    wordCount: 54
  },
  {
    id: 'i231',
    title: 'The Rich and the Poor',
    titleAr: 'الغَنِيُّ وَالفَقِيرُ',
    level: 'intermediate',
    category: 'wisdom-proverbs',
    categoryAr: 'الحكم والأمثال',
    text: `قَالَ حَكِيمٌ: "لَيْسَ الغِنَى كَثْرَةَ المَالِ، بَلْ غِنَى النَّفْسِ. وَلَيْسَ الفَقْرُ قِلَّةَ المَالِ، بَلْ فَقْرُ القَلْبِ." كَمْ مِنْ غَنِيٍّ يَشْكُو وَفَقِيرٍ يَشْكُرُ! الرِّضَا كَنْزٌ لَا يَفْنَى. مَنْ رَضِيَ بِمَا قَسَمَ اللهُ لَهُ، فَهُوَ أَغْنَى النَّاسِ. وَمَنْ طَمِعَ فِي مَا لَيْسَ لَهُ، فَهُوَ أَفْقَرُ النَّاسِ.`,
    translation: `A wise man said: "Wealth is not abundance of money, but richness of soul. And poverty is not lack of money, but poverty of heart." How many rich complain while poor give thanks! Contentment is a treasure that does not perish. Whoever is content with what God has allotted him is the richest of people. Whoever covets what is not his is the poorest of people.`,
    grammaticalConcepts: ['لَيْسَ...بَلْ contrast', 'rhetorical كَمْ مِنْ', 'superlative أَغْنَى/أَفْقَر'],
    vocabularyHighlights: [
      { word: 'كَثْرَةَ', meaning: 'abundance' },
      { word: 'الرِّضَا', meaning: 'contentment' },
      { word: 'يَفْنَى', meaning: 'perishes' },
      { word: 'قَسَمَ', meaning: 'allotted, divided' }
    ],
    moralLesson: 'True wealth is contentment of the soul.',
    moralLessonAr: 'الغِنَى الحَقِيقِيُّ رِضَا النَّفْسِ.',
    wordCount: 56
  },

  // ===== ADVANCED (a232-a237) =====
  {
    id: 'a232',
    title: 'The Wisdom of Opposites',
    titleAr: 'حِكْمَةُ الأَضْدَادِ',
    level: 'advanced',
    category: 'wisdom-proverbs',
    categoryAr: 'الحكم والأمثال',
    text: `قَالَ ابْنُ عَطَاءِ اللهِ السَّكَنْدَرِيُّ: "لَوْلَا مَيَادِينُ النُّفُوسِ، مَا تَحَقَّقَ سَيْرُ السَّائِرِينَ." الظَّلَامُ يُعَلِّمُنَا قِيمَةَ النُّورِ. المَرَضُ يُعَلِّمُنَا قِيمَةَ الصِّحَّةِ. الفَقْدُ يُعَلِّمُنَا قِيمَةَ الوُجُودِ. بِالأَضْدَادِ تُعْرَفُ الأَشْيَاءُ. لَوْلَا اللَّيْلُ لَمَا عَرَفْنَا النَّهَارَ. وَلَوْلَا الحُزْنُ لَمَا ذُقْنَا حَلَاوَةَ الفَرَحِ. الحِكْمَةُ أَنْ نَفْهَمَ أَنَّ الابْتِلَاءَ مَدْرَسَةٌ، وَأَنَّ كُلَّ مِحْنَةٍ تَحْمِلُ فِي طَيَّاتِهَا مِنْحَةً.`,
    translation: `Ibn Ata'illah al-Iskandari said: "Were it not for the battlefields of the souls, the journey of seekers would not be realized." Darkness teaches us the value of light. Illness teaches us the value of health. Loss teaches us the value of presence. By opposites, things are known. Without night, we would not know day. Without sorrow, we would not taste the sweetness of joy. Wisdom is to understand that trials are a school, and every affliction carries within its folds a gift.`,
    grammaticalConcepts: ['conditional لَوْلَا', 'passive voice تُعْرَف', 'أَنْ + subjunctive'],
    vocabularyHighlights: [
      { word: 'مَيَادِينُ', meaning: 'battlefields' },
      { word: 'السَّائِرِينَ', meaning: 'seekers, travelers' },
      { word: 'الابْتِلَاءَ', meaning: 'trials, tribulations' },
      { word: 'طَيَّاتِهَا', meaning: 'its folds' },
      { word: 'مِنْحَةً', meaning: 'gift, blessing' }
    ],
    moralLesson: 'Hardship is the teacher that reveals the value of blessings.',
    moralLessonAr: 'الشِّدَّةُ مُعَلِّمٌ يَكْشِفُ قِيمَةَ النِّعَمِ.',
    wordCount: 78
  },
  {
    id: 'a233',
    title: 'The Treasury of the Wise',
    titleAr: 'خَزَائِنُ الحُكَمَاءِ',
    level: 'advanced',
    category: 'wisdom-proverbs',
    categoryAr: 'الحكم والأمثال',
    text: `سُئِلَ سُقْرَاطُ: "مَا خَزَائِنُكَ؟" قَالَ: "أَصْدِقَائِي." وَسُئِلَ أَفْلَاطُونُ: "مَا أَغْلَى مَا تَمْلِكُ؟" قَالَ: "الأَمَلُ." وَسُئِلَ أَرِسْطُو: "مَا أَثْمَنُ شَيْءٍ؟" قَالَ: "الوَقْتُ، لِأَنَّهُ لَا يُشْتَرَى." وَسُئِلَ حَكِيمٌ عَرَبِيٌّ: "مَا أَجْمَلُ مَا فِي الحَيَاةِ؟" قَالَ: "أَنْ تَجِدَ مَعْنًى لَهَا." الحُكَمَاءُ لَا يَمْلِكُونَ ذَهَبًا، لَكِنَّهُمْ يَمْلِكُونَ مَا لَا يُقَدَّرُ بِالذَّهَبِ.`,
    translation: `Socrates was asked: "What are your treasures?" He said: "My friends." Plato was asked: "What is the most precious thing you own?" He said: "Hope." Aristotle was asked: "What is the most valuable thing?" He said: "Time, because it cannot be bought." An Arab sage was asked: "What is the most beautiful thing in life?" He said: "To find meaning for it." The wise do not own gold, but they own what cannot be valued in gold.`,
    grammaticalConcepts: ['passive سُئِلَ', 'superlative أَغْلَى/أَثْمَن/أَجْمَل', 'reason with لِأَنَّ'],
    vocabularyHighlights: [
      { word: 'خَزَائِنُكَ', meaning: 'your treasures' },
      { word: 'أَثْمَنُ', meaning: 'most valuable' },
      { word: 'يُشْتَرَى', meaning: 'is bought' },
      { word: 'مَعْنًى', meaning: 'meaning' }
    ],
    moralLesson: 'The wisest treasures cannot be measured in gold.',
    moralLessonAr: 'أَثْمَنُ الكُنُوزِ لَا تُقَاسُ بِالذَّهَبِ.',
    wordCount: 68
  },
  {
    id: 'a234',
    title: 'The Seven Deadly Traits',
    titleAr: 'الصِّفَاتُ السَّبْعُ المُهْلِكَةُ',
    level: 'advanced',
    category: 'wisdom-proverbs',
    categoryAr: 'الحكم والأمثال',
    text: `قَالَ حَكِيمٌ: "سَبْعُ صِفَاتٍ تُهْلِكُ صَاحِبَهَا. الكِبْرُ: يُعْمِي عَنِ الحَقِيقَةِ. الحَسَدُ: يَأْكُلُ الحَسَانَاتِ كَمَا تَأْكُلُ النَّارُ الحَطَبَ. الغَضَبُ: يُفْقِدُ العَقْلَ. الطَّمَعُ: يُذِلُّ النَّفْسَ. الكَسَلُ: يُضَيِّعُ الفُرَصَ. الجُبْنُ: يَقْتُلُ قَبْلَ المَوْتِ. الكَذِبُ: يَهْدِمُ الثِّقَةَ." وَأَضْدَادُهَا سَبْعُ صِفَاتٍ تُنْجِي: التَّوَاضُعُ، وَالقَنَاعَةُ، وَالحِلْمُ، وَالزُّهْدُ، وَالهِمَّةُ، وَالشَّجَاعَةُ، وَالصِّدْقُ.`,
    translation: `A wise man said: "Seven traits destroy their owner. Pride: blinds one to truth. Envy: consumes good deeds as fire consumes wood. Anger: causes loss of reason. Greed: humiliates the soul. Laziness: wastes opportunities. Cowardice: kills before death. Lying: demolishes trust." And their opposites are seven traits that save: humility, contentment, forbearance, asceticism, determination, courage, and honesty.`,
    grammaticalConcepts: ['numbers with counted nouns', 'present tense descriptions', 'كَمَا comparison'],
    vocabularyHighlights: [
      { word: 'تُهْلِكُ', meaning: 'destroys' },
      { word: 'يُعْمِي', meaning: 'blinds' },
      { word: 'الحَطَبَ', meaning: 'firewood' },
      { word: 'يُذِلُّ', meaning: 'humiliates' },
      { word: 'تُنْجِي', meaning: 'saves' }
    ],
    moralLesson: 'Master your vices; cultivate their opposites.',
    moralLessonAr: 'تَغَلَّبْ عَلَى رَذَائِلِكَ؛ وَازْرَعْ أَضْدَادَهَا.',
    wordCount: 68
  },
  {
    id: 'a235',
    title: 'The Paradox of Knowledge',
    titleAr: 'مُفَارَقَةُ العِلْمِ',
    level: 'advanced',
    category: 'wisdom-proverbs',
    categoryAr: 'الحكم والأمثال',
    text: `قَالَ الإِمَامُ الشَّافِعِيُّ: "كُلَّمَا أَدَّبَنِي الدَّهْرُ، أَرَانِي نَقْصَ عَقْلِي. وَكُلَّمَا ازْدَدْتُ عِلْمًا، ازْدَدْتُ عِلْمًا بِجَهْلِي." هَذِهِ مُفَارَقَةُ العِلْمِ: كُلَّمَا عَرَفْتَ أَكْثَرَ، أَدْرَكْتَ كَمْ تَجْهَلُ. الجَاهِلُ يَظُنُّ أَنَّهُ يَعْرِفُ كُلَّ شَيْءٍ. العَالِمُ يَعْرِفُ أَنَّ مَا يَجْهَلُهُ أَكْثَرُ بِكَثِيرٍ مِمَّا يَعْرِفُهُ. لِذَلِكَ قَالَ سُقْرَاطُ: "أَعْرِفُ شَيْئًا وَاحِدًا: أَنَّنِي لَا أَعْرِفُ شَيْئًا."`,
    translation: `Imam al-Shafi'i said: "Every time life disciplined me, it showed me the deficiency of my mind. And every time I increased in knowledge, I increased in knowledge of my ignorance." This is the paradox of knowledge: the more you know, the more you realize how much you don't know. The ignorant thinks he knows everything. The scholar knows that what he doesn't know is much more than what he knows. Therefore Socrates said: "I know one thing: that I know nothing."`,
    grammaticalConcepts: ['كُلَّمَا...', 'ازْدَدْتُ Form VIII', 'relative clause مَا'],
    vocabularyHighlights: [
      { word: 'أَدَّبَنِي', meaning: 'disciplined me' },
      { word: 'الدَّهْرُ', meaning: 'time, life' },
      { word: 'نَقْصَ', meaning: 'deficiency' },
      { word: 'مُفَارَقَةُ', meaning: 'paradox' }
    ],
    moralLesson: 'True knowledge begins with knowing what you do not know.',
    moralLessonAr: 'العِلْمُ الحَقِيقِيُّ يَبْدَأُ بِمَعْرِفَةِ مَا لَا تَعْرِفُ.',
    wordCount: 72
  },
  {
    id: 'a236',
    title: 'The Wisdom of Death',
    titleAr: 'حِكْمَةُ المَوْتِ',
    level: 'advanced',
    category: 'wisdom-proverbs',
    categoryAr: 'الحكم والأمثال',
    text: `قَالَ عَلِيُّ بْنُ أَبِي طَالِبٍ: "النَّاسُ نِيَامٌ، فَإِذَا مَاتُوا انْتَبَهُوا." يَعِيشُ كَثِيرٌ مِنَّا كَأَنَّهُمْ خَالِدُونَ. يُؤَجِّلُونَ التَّوْبَةَ، وَيُؤَخِّرُونَ الخَيْرَ، وَيَنْسَوْنَ أَنَّ كُلَّ يَوْمٍ يُقَرِّبُهُمْ مِنَ النِّهَايَةِ. تَذَكُّرُ المَوْتِ لَيْسَ تَشَاؤُمًا، بَلْ هُوَ أَعْظَمُ حَافِزٍ لِلْعَمَلِ. مَنْ تَذَكَّرَ المَوْتَ لَمْ يُضَيِّعْ لَحْظَةً. الحَكِيمُ يَعِيشُ كُلَّ يَوْمٍ كَأَنَّهُ الأَخِيرُ، وَيَعْمَلُ كَأَنَّهُ سَيَعِيشُ أَبَدًا.`,
    translation: `Ali ibn Abi Talib said: "People are asleep; when they die, they awaken." Many of us live as if we are immortal. They postpone repentance, delay good deeds, and forget that every day brings them closer to the end. Remembering death is not pessimism; rather, it is the greatest motivation for action. Whoever remembers death does not waste a moment. The wise lives every day as if it were the last, and works as if he will live forever.`,
    grammaticalConcepts: ['conditional إِذَا', 'كَأَنَّ comparison', 'من + past = whoever'],
    vocabularyHighlights: [
      { word: 'نِيَامٌ', meaning: 'asleep (plural)' },
      { word: 'انْتَبَهُوا', meaning: 'they awoke' },
      { word: 'خَالِدُونَ', meaning: 'immortal' },
      { word: 'حَافِزٍ', meaning: 'motivation' },
      { word: 'تَشَاؤُمًا', meaning: 'pessimism' }
    ],
    moralLesson: 'Remember death to truly live each day.',
    moralLessonAr: 'تَذَكَّرِ المَوْتَ لِتَحْيَا كُلَّ يَوْمٍ حَقًّا.',
    wordCount: 74
  },
  {
    id: 'a237',
    title: 'The Ultimate Wisdom',
    titleAr: 'الحِكْمَةُ العُلْيَا',
    level: 'advanced',
    category: 'wisdom-proverbs',
    categoryAr: 'الحكم والأمثال',
    text: `سُئِلَ حَكِيمٌ: "مَا خُلَاصَةُ حِكْمَةِ الحُكَمَاءِ؟" قَالَ: "ثَلَاثُ كَلِمَاتٍ. الأُولَى: اعْرِفْ نَفْسَكَ، فَمَنْ عَرَفَ نَفْسَهُ عَرَفَ رَبَّهُ. الثَّانِيَةُ: أَحْسِنْ إِلَى غَيْرِكَ، فَمَا نَفَعَكَ نَفَعَ غَيْرَكَ، وَمَا ضَرَّكَ ضَرَّ غَيْرَكَ. الثَّالِثَةُ: لَا تَتَعَلَّقْ بِشَيْءٍ، فَكُلُّ شَيْءٍ زَائِلٌ إِلَّا وَجْهَ اللهِ." هَذِهِ الكَلِمَاتُ الثَّلَاثُ جَمَعَتْ عِلْمَ الحَيَاةِ وَالآخِرَةِ. مَنْ فَهِمَهَا وَطَبَّقَهَا فَقَدْ بَلَغَ الحِكْمَةَ العُلْيَا.`,
    translation: `A wise man was asked: "What is the essence of the wisdom of the wise?" He said: "Three statements. The first: Know yourself, for whoever knows himself knows his Lord. The second: Do good to others, for what benefits you benefits others, and what harms you harms others. The third: Do not attach to anything, for everything is passing except the face of God." These three statements gathered the knowledge of life and the hereafter. Whoever understands and applies them has attained the ultimate wisdom.`,
    grammaticalConcepts: ['imperative اعْرِفْ/أَحْسِنْ', 'من + past tense = whoever', 'exception إِلَّا'],
    vocabularyHighlights: [
      { word: 'خُلَاصَةُ', meaning: 'essence, summary' },
      { word: 'تَتَعَلَّقْ', meaning: 'attach to' },
      { word: 'زَائِلٌ', meaning: 'passing, transient' },
      { word: 'بَلَغَ', meaning: 'attained, reached' }
    ],
    moralLesson: 'Know yourself, serve others, detach from the transient.',
    moralLessonAr: 'اعْرِفْ نَفْسَكَ، وَاخْدُمْ غَيْرَكَ، وَلَا تَتَعَلَّقْ بِالزَّائِلِ.',
    wordCount: 76
  }
];

