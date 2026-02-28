/**
 * Arabic Roots Data
 *
 * Static verb data for conjugation practice with curated examples
 * for all verb types (Form I) and derived forms (Forms II-X).
 *
 * Copied from Alqalaminstituteplatform - complete verb collection
 */

import { validateFormForVerbType } from './conjugationValidation';
import { shuffle } from '@arabtools/core';

export interface ArabicWord {
  root: string;
  gerund: string;
  presentTense: string;
  pastTense: string;
  type: string;

  // Optional sarf metadata for enrichment
  verbForm?: 'I' | 'II' | 'III' | 'IV' | 'V' | 'VI' | 'VII' | 'VIII' | 'IX' | 'X';
  meaning?: string;
  exampleSentence?: string;
  exampleTranslation?: string;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  sarfId?: number; // Link to sarf exercise ID for reference
}

export const arabicWords: ArabicWord[] = [
  // Regular (صحيح) - 13 verbs
  {
    root: 'ك ت ب',
    gerund: 'كِتَابَة',
    presentTense: 'يَكْتُبُ',
    pastTense: 'كَتَبَ',
    type: 'Regular',
    verbForm: 'I',
    meaning: 'to write',
    exampleSentence: 'كَتَبَ الطَّالِبُ الدَّرْسَ',
    exampleTranslation: 'The student wrote the lesson',
    difficulty: 'beginner',
    sarfId: 1
  },
  {
    root: 'ذ ه ب',
    gerund: 'ذَهَاب',
    presentTense: 'يَذْهَبُ',
    pastTense: 'ذَهَبَ',
    type: 'Regular',
    verbForm: 'I',
    meaning: 'to go',
    difficulty: 'beginner'
  },
  {
    root: 'ج ل س',
    gerund: 'جُلُوس',
    presentTense: 'يَجْلِسُ',
    pastTense: 'جَلَسَ',
    type: 'Regular',
    verbForm: 'I',
    meaning: 'to sit',
    difficulty: 'beginner'
  },
  {
    root: 'ف ت ح',
    gerund: 'فَتْح',
    presentTense: 'يَفْتَحُ',
    pastTense: 'فَتَحَ',
    type: 'Regular',
    verbForm: 'I',
    meaning: 'to open',
    difficulty: 'beginner'
  },
  {
    root: 'د ر س',
    gerund: 'دِرَاسَة',
    presentTense: 'يَدْرُسُ',
    pastTense: 'دَرَسَ',
    type: 'Regular',
    verbForm: 'I',
    meaning: 'to study',
    difficulty: 'beginner'
  },
  {
    root: 'ش ر ب',
    gerund: 'شُرْب',
    presentTense: 'يَشْرَبُ',
    pastTense: 'شَرِبَ',
    type: 'Regular',
    verbForm: 'I',
    meaning: 'to drink',
    exampleSentence: 'كُلُوا وَاشْرَبُوا مِنْ رِزْقِ اللهِ',
    exampleTranslation: 'Eat and drink from the provision of Allah',
    difficulty: 'beginner',
    sarfId: 893
  },
  {
    root: 'ع ل م',
    gerund: 'عِلْم',
    presentTense: 'يَعْلَمُ',
    pastTense: 'عَلِمَ',
    type: 'Regular',
    verbForm: 'I',
    meaning: 'to knew, learned, came to know',
    exampleSentence: 'وَعَلَّمَ آدَمَ الْأَسْمَاءَ كُلَّهَا',
    exampleTranslation: 'And He taught Adam the names - all of them',
    difficulty: 'beginner',
    sarfId: 81
  },
  {
    root: 'ن ص ر',
    gerund: 'نَصْر',
    presentTense: 'يَنْصُرُ',
    pastTense: 'نَصَرَ',
    type: 'Regular',
    verbForm: 'I',
    meaning: 'to helped, aided, gave victory',
    exampleSentence: 'إِنْ يَنْصُرْكُمُ اللهُ فَلَا غَالِبَ لَكُمْ',
    exampleTranslation: 'If Allah helps you, no one can overcome you',
    difficulty: 'beginner',
    sarfId: 87
  },
  {
    root: 'ض ر ب',
    gerund: 'ضَرْب',
    presentTense: 'يَضْرِبُ',
    pastTense: 'ضَرَبَ',
    type: 'Regular',
    verbForm: 'I',
    meaning: 'to hit, to strike, to set forth',
    exampleSentence: 'وَاضْرِبْ لَهُم مَّثَلاً',
    exampleTranslation: 'And present to them an example',
    difficulty: 'beginner',
    sarfId: 1383
  },
  {
    root: 'ح م د',
    gerund: 'حَمْد',
    presentTense: 'يَحْمَدُ',
    pastTense: 'حَمِدَ',
    type: 'Regular',
    verbForm: 'I',
    meaning: 'to praised',
    exampleSentence: 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ',
    exampleTranslation: 'All praise is to Allah, Lord of the worlds',
    difficulty: 'beginner',
    sarfId: 275
  },
  {
    root: 'س م ع',
    gerund: 'سَمْع',
    presentTense: 'يَسْمَعُ',
    pastTense: 'سَمِعَ',
    type: 'Regular',
    verbForm: 'I',
    meaning: 'to heard, listened',
    exampleSentence: 'سَمِعْنَا وَأَطَعْنَا',
    exampleTranslation: 'We hear and we obey',
    difficulty: 'beginner',
    sarfId: 70
  },
  {
    root: 'ف ع ل',
    gerund: 'فِعْل',
    presentTense: 'يَفْعَلُ',
    pastTense: 'فَعَلَ',
    type: 'Regular',
    verbForm: 'I',
    meaning: 'to did, acted, performed',
    exampleSentence: 'وَفَعَلْتَ فَعْلَتَكَ الَّتِي فَعَلْتَ',
    exampleTranslation: 'And you did your deed which you did',
    difficulty: 'beginner',
    sarfId: 103
  },
  {
    root: 'ق ت ل',
    gerund: 'قَتْل',
    presentTense: 'يَقْتُلُ',
    pastTense: 'قَتَلَ',
    type: 'Regular',
    verbForm: 'I',
    meaning: 'to kill',
    exampleSentence: 'وَلَا تَقْتُلُوا النَّفْسَ الَّتِي حَرَّمَ اللَّهُ إِلَّا بِالْحَقِّ',
    exampleTranslation: 'And do not kill the soul which Allah has forbidden except by right',
    difficulty: 'beginner',
    sarfId: 1401
  },

  // Mithal (مثال) - 8 verbs
  {
    root: 'و ص ل',
    gerund: 'وُصُول',
    presentTense: 'يَصِلُ',
    pastTense: 'وَصَلَ',
    type: 'Mithal',
    verbForm: 'I',
    meaning: 'to arrived, reached, connected',
    exampleSentence: 'وَالَّذِينَ يَصِلُونَ مَا أَمَرَ اللهُ بِهِ أَنْ يُوصَلَ',
    exampleTranslation: 'And those who join what Allah has ordered to be joined',
    difficulty: 'intermediate',
    sarfId: 138
  },
  {
    root: 'و ج د',
    gerund: 'وُجُود',
    presentTense: 'يَجِدُ',
    pastTense: 'وَجَدَ',
    type: 'Mithal',
    verbForm: 'I',
    meaning: 'to found, discovered',
    exampleSentence: 'وَوَجَدَكَ ضَالًّا فَهَدَىٰ',
    exampleTranslation: 'And He found you lost and guided you',
    difficulty: 'beginner',
    sarfId: 119
  },
  {
    root: 'و ق ف',
    gerund: 'وُقُوف',
    presentTense: 'يَقِفُ',
    pastTense: 'وَقَفَ',
    type: 'Mithal',
    verbForm: 'I',
    meaning: 'to stop, to stand, to halt',
    exampleSentence: 'وَلَوْ تَرَىٰ إِذْ وُقِفُوا عَلَى النَّارِ',
    exampleTranslation: 'If you could see when they are made to stand before the Fire',
    difficulty: 'intermediate',
    sarfId: 1557
  },
  {
    root: 'و ض ع',
    gerund: 'وَضْع',
    presentTense: 'يَضَعُ',
    pastTense: 'وَضَعَ',
    type: 'Mithal',
    verbForm: 'I',
    meaning: 'to put, placed, set down; gave birth',
    exampleSentence: 'فَلَمَّا وَضَعَتْهَا قَالَتْ رَبِّ إِنِّي وَضَعْتُهَا أُنْثَىٰ',
    exampleTranslation: 'When she gave birth, she said, "My Lord, I have given birth to a female"',
    difficulty: 'intermediate',
    sarfId: 405
  },
  {
    root: 'و ع د',
    gerund: 'وَعْد',
    presentTense: 'يَعِدُ',
    pastTense: 'وَعَدَ',
    type: 'Mithal',
    verbForm: 'I',
    meaning: 'to promised',
    exampleSentence: 'وَعَدَ اللهُ الْمُؤْمِنِينَ وَالْمُؤْمِنَاتِ جَنَّاتٍ',
    exampleTranslation: 'Allah has promised the believing men and women gardens',
    difficulty: 'intermediate',
    sarfId: 134
  },
  {
    root: 'و ل د',
    gerund: 'وِلَادَة',
    presentTense: 'يَلِدُ',
    pastTense: 'وَلَدَ',
    type: 'Mithal',
    verbForm: 'I',
    meaning: 'to give birth',
    exampleSentence: 'لَمْ يَلِدْ وَلَمْ يُولَدْ',
    exampleTranslation: 'He neither begets nor is born',
    difficulty: 'beginner',
    sarfId: 2276
  },
  {
    root: 'و ز ن',
    gerund: 'وَزْن',
    presentTense: 'يَزِنُ',
    pastTense: 'وَزَنَ',
    type: 'Mithal',
    verbForm: 'I',
    difficulty: 'intermediate'
  },
  {
    root: 'و ر ث',
    gerund: 'وِرَاثَة',
    presentTense: 'يَرِثُ',
    pastTense: 'وَرِثَ',
    type: 'Mithal',
    verbForm: 'I',
    meaning: 'to inherited',
    exampleSentence: 'وَوَرِثَ سُلَيْمَانُ دَاوُودَ',
    exampleTranslation: 'And Solomon inherited David',
    difficulty: 'intermediate',
    sarfId: 141
  },

  // Ajwaf (أجوف) - 8 verbs
  {
    root: 'ق و ل',
    gerund: 'قَوْل',
    presentTense: 'يَقُولُ',
    pastTense: 'قَالَ',
    type: 'Ajwaf',
    verbForm: 'I',
    meaning: 'to said, spoke',
    exampleSentence: 'وَإِذْ قَالَ رَبُّكَ لِلْمَلَائِكَةِ',
    exampleTranslation: 'And when your Lord said to the angels',
    difficulty: 'beginner',
    sarfId: 99
  },
  {
    root: 'ب ي ع',
    gerund: 'بَيْع',
    presentTense: 'يَبِيعُ',
    pastTense: 'بَاعَ',
    type: 'Ajwaf',
    verbForm: 'I',
    meaning: 'to sell',
    exampleSentence: 'وَأَحَلَّ اللَّهُ الْبَيْعَ وَحَرَّمَ الرِّبَا',
    exampleTranslation: 'Allah has permitted trade and forbidden usury',
    difficulty: 'intermediate',
    sarfId: 1616
  },
  {
    root: 'ن و م',
    gerund: 'نَوْم',
    presentTense: 'يَنَامُ',
    pastTense: 'نَامَ',
    type: 'Ajwaf',
    verbForm: 'I',
    meaning: 'to sleep',
    exampleSentence: 'وَجَعَلْنَا نَوْمَكُمْ سُبَاتًا',
    exampleTranslation: 'And We made your sleep rest',
    difficulty: 'intermediate',
    sarfId: 900
  },
  {
    root: 'ص و م',
    gerund: 'صَوْم',
    presentTense: 'يَصُومُ',
    pastTense: 'صَامَ',
    type: 'Ajwaf',
    verbForm: 'I',
    meaning: 'to fasted',
    exampleSentence: 'فَمَنْ شَهِدَ مِنْكُمُ الشَّهْرَ فَلْيَصُمْهُ',
    exampleTranslation: 'So whoever sights the month, let him fast it',
    difficulty: 'beginner',
    sarfId: 410
  },
  {
    root: 'ز و ر',
    gerund: 'زِيَارَة',
    presentTense: 'يَزُورُ',
    pastTense: 'زَارَ',
    type: 'Ajwaf',
    verbForm: 'I',
    difficulty: 'intermediate'
  },
  {
    root: 'ع و د',
    gerund: 'عَوْدَة',
    presentTense: 'يَعُودُ',
    pastTense: 'عَادَ',
    type: 'Ajwaf',
    verbForm: 'I',
    difficulty: 'intermediate'
  },
  {
    root: 'ق و م',
    gerund: 'قِيَام',
    presentTense: 'يَقُومُ',
    pastTense: 'قَامَ',
    type: 'Ajwaf',
    verbForm: 'I',
    meaning: 'to stood, rose, established',
    exampleSentence: 'قُمِ اللَّيْلَ إِلَّا قَلِيلًا',
    exampleTranslation: 'Arise [to pray] the night, except for a little',
    difficulty: 'intermediate',
    sarfId: 145
  },
  {
    root: 'خ و ف',
    gerund: 'خَوْف',
    presentTense: 'يَخَافُ',
    pastTense: 'خَافَ',
    type: 'Ajwaf',
    verbForm: 'I',
    meaning: 'to feared',
    exampleSentence: 'فَلَا تَخَافُوهُمْ وَخَافُونِ',
    exampleTranslation: 'So do not fear them but fear Me',
    difficulty: 'beginner',
    sarfId: 467
  },

  // Naqis (ناقص) - 8 verbs
  {
    root: 'م ش ي',
    gerund: 'مَشْي',
    presentTense: 'يَمْشِي',
    pastTense: 'مَشَى',
    type: 'Naqis',
    verbForm: 'I',
    meaning: 'to walked',
    exampleSentence: 'وَعِبَادُ الرَّحْمَٰنِ الَّذِينَ يَمْشُونَ عَلَى الْأَرْضِ هَوْنًا',
    exampleTranslation: 'And the servants of the Most Merciful are those who walk upon the earth humbly',
    difficulty: 'intermediate',
    sarfId: 375
  },
  {
    root: 'ب ك ي',
    gerund: 'بُكَاء',
    presentTense: 'يَبْكِي',
    pastTense: 'بَكَى',
    type: 'Naqis',
    verbForm: 'I',
    meaning: 'to wept, cried',
    exampleSentence: 'فَلْيَضْحَكُوا قَلِيلًا وَلْيَبْكُوا كَثِيرًا',
    exampleTranslation: 'So let them laugh a little and weep much',
    difficulty: 'intermediate',
    sarfId: 165
  },
  {
    root: 'ر م ي',
    gerund: 'رَمْي',
    presentTense: 'يَرْمِي',
    pastTense: 'رَمَى',
    type: 'Naqis',
    verbForm: 'I',
    meaning: 'to threw, cast',
    exampleSentence: 'وَمَا رَمَيْتَ إِذْ رَمَيْتَ وَلَٰكِنَّ اللهَ رَمَىٰ',
    exampleTranslation: 'And you did not throw when you threw, but Allah threw',
    difficulty: 'intermediate',
    sarfId: 161
  },
  {
    root: 'ق ض ي',
    gerund: 'قَضَاء',
    presentTense: 'يَقْضِي',
    pastTense: 'قَضَى',
    type: 'Naqis',
    verbForm: 'I',
    meaning: 'to decreed, judged, finished',
    exampleSentence: 'وَقَضَىٰ رَبُّكَ أَلَّا تَعْبُدُوا إِلَّا إِيَّاهُ',
    exampleTranslation: 'And your Lord has decreed that you worship none but Him',
    difficulty: 'beginner',
    sarfId: 682
  },
  {
    root: 'د ع و',
    gerund: 'دَعْوَة',
    presentTense: 'يَدْعُو',
    pastTense: 'دَعَا',
    type: 'Naqis',
    verbForm: 'I',
    meaning: 'to called, invoked, prayed, invited',
    exampleSentence: 'ادْعُوا رَبَّكُمْ تَضَرُّعًا وَخُفْيَةً',
    exampleTranslation: 'Call upon your Lord in humility and privately',
    difficulty: 'intermediate',
    sarfId: 108
  },
  {
    root: 'ر ج و',
    gerund: 'رَجَاء',
    presentTense: 'يَرْجُو',
    pastTense: 'رَجَا',
    type: 'Naqis',
    verbForm: 'I',
    meaning: 'to hoped, expected',
    exampleSentence: 'مَنْ كَانَ يَرْجُو لِقَاءَ اللهِ',
    exampleTranslation: 'Whoever hopes for the meeting with Allah',
    difficulty: 'intermediate',
    sarfId: 472
  },
  {
    root: 'ن س ي',
    gerund: 'نِسْيَان',
    presentTense: 'يَنْسَى',
    pastTense: 'نَسِيَ',
    type: 'Naqis',
    verbForm: 'I',
    meaning: 'to forgot',
    exampleSentence: 'نَسُوا اللهَ فَنَسِيَهُمْ',
    exampleTranslation: 'They forgot Allah, so He forgot them',
    difficulty: 'intermediate',
    sarfId: 173
  },
  {
    root: 'ب ق ي',
    gerund: 'بَقَاء',
    presentTense: 'يَبْقَى',
    pastTense: 'بَقِيَ',
    type: 'Naqis',
    verbForm: 'I',
    meaning: 'to remain',
    exampleSentence: 'وَالْبَاقِيَاتُ الصَّالِحَاتُ خَيْرٌ',
    exampleTranslation: 'And the enduring good deeds are better',
    difficulty: 'intermediate',
    sarfId: 1172
  },

  // Mudaa'af (مضاعف) - 10 verbs
  {
    root: 'ر د د',
    gerund: 'رَدّ',
    presentTense: 'يَرُدُّ',
    pastTense: 'رَدَّ',
    type: "Mudaa'af",
    verbForm: 'I',
    meaning: 'to returned, replied, rejected',
    exampleSentence: 'فَإِنْ تَنَازَعْتُمْ فِي شَيْءٍ فَرُدُّوهُ إِلَى اللهِ وَالرَّسُولِ',
    exampleTranslation: 'If you disagree over anything, refer it to Allah and the Messenger',
    difficulty: 'intermediate',
    sarfId: 192
  },
  {
    root: 'م د د',
    gerund: 'مَدّ',
    presentTense: 'يَمُدُّ',
    pastTense: 'مَدَّ',
    type: "Mudaa'af",
    verbForm: 'I',
    meaning: 'to extended, stretched, prolonged',
    exampleSentence: 'وَاللهُ يَمُدُّ لَهُ مَدًّا',
    exampleTranslation: 'And Allah extends his [term] extensively',
    difficulty: 'intermediate',
    sarfId: 184
  },
  {
    root: 'ع د د',
    gerund: 'عَدّ',
    presentTense: 'يَعُدُّ',
    pastTense: 'عَدَّ',
    type: "Mudaa'af",
    verbForm: 'I',
    meaning: 'to count, enumerate',
    difficulty: 'intermediate'
  },
  {
    root: 'ح ل ل',
    gerund: 'حَلّ',
    presentTense: 'يَحُلُّ',
    pastTense: 'حَلَّ',
    type: "Mudaa'af",
    verbForm: 'I',
    meaning: 'to untie, solve, be lawful',
    difficulty: 'intermediate'
  },
  {
    root: 'ت م م',
    gerund: 'تَمَام',
    presentTense: 'يَتِمُّ',
    pastTense: 'تَمَّ',
    type: "Mudaa'af",
    verbForm: 'I',
    meaning: 'to be complete, finish',
    difficulty: 'intermediate'
  },
  {
    root: 'ض ل ل',
    gerund: 'ضَلَال',
    presentTense: 'يَضِلُّ',
    pastTense: 'ضَلَّ',
    type: "Mudaa'af",
    verbForm: 'I',
    meaning: 'to went astray, was lost, erred',
    exampleSentence: 'غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ',
    exampleTranslation: 'Not of those who have earned anger nor of those who are astray',
    difficulty: 'beginner',
    sarfId: 198
  },
  {
    root: 'م ر ر',
    gerund: 'مُرُور',
    presentTense: 'يَمُرُّ',
    pastTense: 'مَرَّ',
    type: "Mudaa'af",
    verbForm: 'I',
    meaning: 'to pass, to go by',
    exampleSentence: 'وَإِذَا مَرُّوا بِاللَّغْوِ مَرُّوا كِرَاماً',
    exampleTranslation: 'And when they pass by ill speech, they pass by with dignity',
    difficulty: 'intermediate',
    sarfId: 1758
  },
  {
    root: 'ف ر ر',
    gerund: 'فِرَار',
    presentTense: 'يَفِرُّ',
    pastTense: 'فَرَّ',
    type: "Mudaa'af",
    verbForm: 'I',
    meaning: 'to flee, to escape',
    exampleSentence: 'فَفِرُّوا إِلَى اللَّهِ',
    exampleTranslation: 'So flee to Allah',
    difficulty: 'intermediate',
    sarfId: 1476
  },
  {
    root: 'ش د د',
    gerund: 'شَدّ',
    presentTense: 'يَشُدُّ',
    pastTense: 'شَدَّ',
    type: "Mudaa'af",
    verbForm: 'I',
    meaning: 'to tighten, pull, strengthen',
    difficulty: 'intermediate'
  },
  {
    root: 'س د د',
    gerund: 'سَدّ',
    presentTense: 'يَسُدُّ',
    pastTense: 'سَدَّ',
    type: "Mudaa'af",
    verbForm: 'I',
    meaning: 'to block, obstruct, close',
    difficulty: 'intermediate'
  },

  // Mahmooz al-Fa' (مهموز الفاء) - 5 verbs
  {
    root: 'أ خ ذ',
    gerund: 'أَخْذ',
    presentTense: 'يَأْخُذُ',
    pastTense: 'أَخَذَ',
    type: "Mahmooz al-Fa'",
    verbForm: 'I',
    meaning: 'to took, seized, grasped',
    exampleSentence: 'وَأَخَذْنَا مِنْهُمْ مِيثَاقًا غَلِيظًا',
    exampleTranslation: 'And We took from them a solemn covenant',
    difficulty: 'beginner',
    sarfId: 125
  },
  {
    root: 'أ ك ل',
    gerund: 'أَكْل',
    presentTense: 'يَأْكُلُ',
    pastTense: 'أَكَلَ',
    type: "Mahmooz al-Fa'",
    verbForm: 'I',
    meaning: 'to eat, consume',
    exampleSentence: 'كُلُوا مِنْ طَيِّبَاتِ مَا رَزَقْنَاكُمْ',
    exampleTranslation: 'Eat from the good things We have provided for you',
    difficulty: 'beginner',
    sarfId: 881
  },
  {
    root: 'أ م ر',
    gerund: 'أَمْر',
    presentTense: 'يَأْمُرُ',
    pastTense: 'أَمَرَ',
    type: "Mahmooz al-Fa'",
    verbForm: 'I',
    meaning: 'to commanded, ordered',
    exampleSentence: 'إِنَّ اللهَ يَأْمُرُ بِالْعَدْلِ وَالْإِحْسَانِ',
    exampleTranslation: 'Indeed, Allah commands justice and good conduct',
    difficulty: 'beginner',
    sarfId: 130
  },
  {
    root: 'أ م ن',
    gerund: 'أَمَان',
    presentTense: 'يَأْمَنُ',
    pastTense: 'أَمِنَ',
    type: "Mahmooz al-Fa'",
    verbForm: 'I',
    meaning: 'to be safe, to feel secure',
    exampleSentence: 'أَفَأَمِنُوا مَكْرَ اللَّهِ',
    exampleTranslation: 'Do they feel secure from the plan of Allah?',
    difficulty: 'intermediate',
    sarfId: 1502
  },
  {
    root: 'أ ذ ن',
    gerund: 'إِذْن',
    presentTense: 'يَأْذَنُ',
    pastTense: 'أَذِنَ',
    type: "Mahmooz al-Fa'",
    verbForm: 'I',
    meaning: 'to permit, to allow',
    exampleSentence: 'مَن ذَا الَّذِي يَشْفَعُ عِندَهُ إِلَّا بِإِذْنِهِ',
    exampleTranslation: 'Who is it that can intercede with Him except by His permission',
    difficulty: 'intermediate',
    sarfId: 1486
  },

  // Mahmooz al-'Ayn (مهموز العين) - 3 verbs
  {
    root: 'س أ ل',
    gerund: 'سُؤَال',
    presentTense: 'يَسْأَلُ',
    pastTense: 'سَأَلَ',
    type: "Mahmooz al-'Ayn",
    verbForm: 'I',
    meaning: 'to asked, questioned, requested',
    exampleSentence: 'وَإِذَا سَأَلَكَ عِبَادِي عَنِّي فَإِنِّي قَرِيبٌ',
    exampleTranslation: 'And when My servants ask you about Me, indeed I am near',
    difficulty: 'intermediate',
    sarfId: 121
  },
  {
    root: 'ر أ س',
    gerund: 'رِئَاسَة',
    presentTense: 'يَرْأَسُ',
    pastTense: 'رَأَسَ',
    type: "Mahmooz al-'Ayn",
    verbForm: 'I',
    meaning: 'to lead, head, preside over',
    difficulty: 'intermediate'
  },
  {
    root: 'ر أ ي',
    gerund: 'رَأْي',
    presentTense: 'يَرَى',
    pastTense: 'رَأَى',
    type: "Mahmooz al-'Ayn",
    verbForm: 'I',
    meaning: 'to saw, perceived, thought',
    exampleSentence: 'فَلَمَّا رَأَى الْقَمَرَ بَازِغًا',
    exampleTranslation: 'And when he saw the moon rising',
    difficulty: 'beginner',
    sarfId: 711
  },

  // Mahmooz al-Lam (مهموز اللام) - 5 verbs
  {
    root: 'ق ر أ',
    gerund: 'قِرَاءَة',
    presentTense: 'يَقْرَأُ',
    pastTense: 'قَرَأَ',
    type: 'Mahmooz al-Lam',
    verbForm: 'I',
    meaning: 'to read',
    exampleSentence: 'قَرَأَ الْقُرْآنَ',
    exampleTranslation: 'He read the Quran',
    difficulty: 'beginner',
    sarfId: 2
  },
  {
    root: 'ب د أ',
    gerund: 'بَدْء',
    presentTense: 'يَبْدَأُ',
    pastTense: 'بَدَأَ',
    type: 'Mahmooz al-Lam',
    verbForm: 'I',
    meaning: 'to begin, start',
    difficulty: 'intermediate'
  },
  {
    root: 'ن ش أ',
    gerund: 'نَشْأَة',
    presentTense: 'يَنْشَأُ',
    pastTense: 'نَشَأَ',
    type: 'Mahmooz al-Lam',
    verbForm: 'I',
    meaning: 'to grow up, originate',
    difficulty: 'intermediate'
  },
  {
    root: 'ل ج أ',
    gerund: 'لُجُوء',
    presentTense: 'يَلْجَأُ',
    pastTense: 'لَجَأَ',
    type: 'Mahmooz al-Lam',
    verbForm: 'I',
    meaning: 'to seek refuge, resort to',
    difficulty: 'intermediate'
  },
  {
    root: 'م ل أ',
    gerund: 'مَلْء',
    presentTense: 'يَمْلَأُ',
    pastTense: 'مَلَأَ',
    type: 'Mahmooz al-Lam',
    verbForm: 'I',
    meaning: 'to fill',
    exampleSentence: 'لَأَمْلَأَنَّ جَهَنَّمَ',
    exampleTranslation: 'I will surely fill Hell',
    difficulty: 'intermediate',
    sarfId: 1517
  },

  // Lafif Maqroon (لفيف مقرون) - 7 verbs
  {
    root: 'ط و ي',
    gerund: 'طَيّ',
    presentTense: 'يَطْوِي',
    pastTense: 'طَوَى',
    type: 'Lafif Maqroon',
    verbForm: 'I',
    meaning: 'to fold, roll up',
    difficulty: 'intermediate'
  },
  {
    root: 'ر و ي',
    gerund: 'رِوَايَة',
    presentTense: 'يَرْوِي',
    pastTense: 'رَوَى',
    type: 'Lafif Maqroon',
    verbForm: 'I',
    meaning: 'to narrate, to transmit',
    exampleSentence: 'رَوَى الْبُخَارِيُّ هَذَا الْحَدِيثَ',
    exampleTranslation: 'Al-Bukhari narrated this hadith',
    difficulty: 'intermediate',
    sarfId: 1671
  },
  {
    root: 'ع و ي',
    gerund: 'عُوَاء',
    presentTense: 'يَعْوِي',
    pastTense: 'عَوَى',
    type: 'Lafif Maqroon',
    verbForm: 'I',
    meaning: 'to howl',
    difficulty: 'intermediate'
  },
  {
    root: 'ن و ي',
    gerund: 'نِيَّة',
    presentTense: 'يَنْوِي',
    pastTense: 'نَوَى',
    type: 'Lafif Maqroon',
    verbForm: 'I',
    meaning: 'to intend, to have intention',
    exampleSentence: 'إِنَّمَا الْأَعْمَالُ بِالنِّيَّاتِ',
    exampleTranslation: 'Actions are only by intentions',
    difficulty: 'intermediate',
    sarfId: 1685
  },
  {
    root: 'ه و ي',
    gerund: 'هَوَاء',
    presentTense: 'يَهْوِي',
    pastTense: 'هَوَى',
    type: 'Lafif Maqroon',
    verbForm: 'I',
    meaning: 'to fall, to plunge down',
    exampleSentence: 'وَالنَّجْمِ إِذَا هَوَىٰ',
    exampleTranslation: 'By the star when it falls',
    difficulty: 'intermediate',
    sarfId: 1689
  },
  {
    root: 'ش و ي',
    gerund: 'شِوَاء',
    presentTense: 'يَشْوِي',
    pastTense: 'شَوَى',
    type: 'Lafif Maqroon',
    verbForm: 'I',
    meaning: 'to roast, grill',
    difficulty: 'intermediate'
  },
  {
    root: 'ل و ي',
    gerund: 'لَيّ',
    presentTense: 'يَلْوِي',
    pastTense: 'لَوَى',
    type: 'Lafif Maqroon',
    verbForm: 'I',
    meaning: 'to twist, turn',
    difficulty: 'intermediate'
  },

  // Lafif Mafrooq (لفيف مفروق) - 6 verbs
  {
    root: 'و ق ي',
    gerund: 'وِقَايَة',
    presentTense: 'يَقِي',
    pastTense: 'وَقَى',
    type: 'Lafif Mafrooq',
    verbForm: 'I',
    meaning: 'to protected, guarded, shielded',
    exampleSentence: 'فَوَقَاهُمُ اللهُ شَرَّ ذَٰلِكَ الْيَوْمِ',
    exampleTranslation: 'So Allah will protect them from the evil of that Day',
    difficulty: 'advanced',
    sarfId: 210
  },
  {
    root: 'و ف ي',
    gerund: 'وَفَاء',
    presentTense: 'يَفِي',
    pastTense: 'وَفَى',
    type: 'Lafif Mafrooq',
    verbForm: 'I',
    meaning: 'to fulfill, to keep a promise',
    exampleSentence: 'وَمَنْ أَوْفَىٰ بِعَهْدِهِ مِنَ اللَّهِ',
    exampleTranslation: 'And who is more faithful to his covenant than Allah',
    difficulty: 'intermediate',
    sarfId: 1774
  },
  {
    root: 'و ع ي',
    gerund: 'وَعْي',
    presentTense: 'يَعِي',
    pastTense: 'وَعَى',
    type: 'Lafif Mafrooq',
    verbForm: 'I',
    meaning: 'to be aware, comprehend',
    difficulty: 'intermediate'
  },
  {
    root: 'و ش ي',
    gerund: 'وِشَايَة',
    presentTense: 'يَشِي',
    pastTense: 'وَشَى',
    type: 'Lafif Mafrooq',
    verbForm: 'I',
    meaning: 'to slander, inform against',
    difficulty: 'intermediate'
  },
  {
    root: 'و ل ي',
    gerund: 'وِلَايَة',
    presentTense: 'يَلِي',
    pastTense: 'وَلِيَ',
    type: 'Lafif Mafrooq',
    verbForm: 'I',
    meaning: 'to was near, was in charge of, governed',
    exampleSentence: 'اللهُ وَلِيُّ الَّذِينَ آمَنُوا',
    exampleTranslation: 'Allah is the ally of those who believe',
    difficulty: 'intermediate',
    sarfId: 217
  },
  {
    root: 'و ه ي',
    gerund: 'وَهْي',
    presentTense: 'يَهِي',
    pastTense: 'وَهَى',
    type: 'Lafif Mafrooq',
    verbForm: 'I',
    meaning: 'to be weak, fragile',
    difficulty: 'intermediate'
  },

  // ========================================
  // FORMS II-X (Derived Forms)
  // ========================================

  // Form II (تفعيل) - Causative/Intensive - 8 verbs
  {
    root: 'ع ل م',
    gerund: 'تَعْلِيم',
    presentTense: 'يُعَلِّمُ',
    pastTense: 'عَلَّمَ',
    type: 'Regular',
    verbForm: 'II',
    meaning: 'to teach',
    exampleSentence: 'عَلَّمَ الْمُعَلِّمُ الطُّلَّابَ',
    exampleTranslation: 'The teacher taught the students',
    difficulty: 'intermediate',
    sarfId: 11
  },
  {
    root: 'ك س ر',
    gerund: 'تَكْسِير',
    presentTense: 'يُكَسِّرُ',
    pastTense: 'كَسَّرَ',
    type: 'Regular',
    verbForm: 'II',
    meaning: 'to break into pieces, shatter',
    exampleSentence: 'كَسَّرَ الزُّجَاجَ',
    exampleTranslation: 'He shattered the glass',
    difficulty: 'intermediate',
    sarfId: 12
  },
  {
    root: 'ص د ق',
    gerund: 'تَصْدِيق',
    presentTense: 'يُصَدِّقُ',
    pastTense: 'صَدَّقَ',
    type: 'Regular',
    verbForm: 'II',
    meaning: 'to confirm as true, believe',
    exampleSentence: 'وَصَدَّقَتْ بِكَلِمَاتِ رَبِّهَا',
    exampleTranslation: 'And she believed in the words of her Lord',
    difficulty: 'intermediate',
    sarfId: 266
  },
  {
    root: 'ك ذ ب',
    gerund: 'تَكْذِيب',
    presentTense: 'يُكَذِّبُ',
    pastTense: 'كَذَّبَ',
    type: 'Regular',
    verbForm: 'II',
    meaning: 'to deny, reject as false, call a liar',
    exampleSentence: 'كَذَّبَتْ قَبْلَهُمْ قَوْمُ نُوحٍ',
    exampleTranslation: 'The people of Noah denied before them',
    difficulty: 'intermediate',
    sarfId: 272
  },
  {
    root: 'س ب ح',
    gerund: 'تَسْبِيح',
    presentTense: 'يُسَبِّحُ',
    pastTense: 'سَبَّحَ',
    type: 'Regular',
    verbForm: 'II',
    meaning: 'to glorify, declare perfection',
    exampleSentence: 'سَبَّحَ لِلَّهِ مَا فِي السَّمَاوَاتِ وَالْأَرْضِ',
    exampleTranslation: 'Whatever is in the heavens and earth glorifies Allah',
    difficulty: 'beginner',
    sarfId: 281
  },
  {
    root: 'ع ذ ب',
    gerund: 'تَعْذِيب',
    presentTense: 'يُعَذِّبُ',
    pastTense: 'عَذَّبَ',
    type: 'Regular',
    verbForm: 'II',
    meaning: 'to punish, torment, torture',
    exampleSentence: 'وَمَنْ يَكْفُرْ فَأُعَذِّبُهُ عَذَابًا شَدِيدًا',
    exampleTranslation: 'And whoever disbelieves, I will punish him with a severe punishment',
    difficulty: 'intermediate',
    sarfId: 294
  },
  {
    root: 'ن ز ل',
    gerund: 'تَنْزِيل',
    presentTense: 'يُنَزِّلُ',
    pastTense: 'نَزَّلَ',
    type: 'Regular',
    verbForm: 'II',
    meaning: 'to send down (gradually), reveal (in stages)',
    exampleSentence: 'نَزَّلَ عَلَيْكَ الْكِتَابَ بِالْحَقِّ',
    exampleTranslation: 'He has sent down upon you the Book in truth',
    difficulty: 'intermediate',
    sarfId: 317
  },
  {
    root: 'ذ ك ر',
    gerund: 'تَذْكِير',
    presentTense: 'يُذَكِّرُ',
    pastTense: 'ذَكَّرَ',
    type: 'Regular',
    verbForm: 'II',
    meaning: 'to remind',
    exampleSentence: 'فَذَكِّرْ إِنَّمَا أَنْتَ مُذَكِّرٌ',
    exampleTranslation: 'So remind; you are only a reminder',
    difficulty: 'intermediate',
    sarfId: 347
  },

  // Form IV (إفعال) - Causative - 8 verbs
  {
    root: 'س ل م',
    gerund: 'إِسْلَام',
    presentTense: 'يُسْلِمُ',
    pastTense: 'أَسْلَمَ',
    type: 'Regular',
    verbForm: 'IV',
    meaning: 'to submit (to Allah), embrace Islam',
    exampleSentence: 'أَسْلَمَ الرَّجُلُ',
    exampleTranslation: 'The man embraced Islam',
    difficulty: 'intermediate',
    sarfId: 20
  },
  {
    root: 'ك ر م',
    gerund: 'إِكْرَام',
    presentTense: 'يُكْرِمُ',
    pastTense: 'أَكْرَمَ',
    type: 'Regular',
    verbForm: 'IV',
    meaning: 'to honor, be generous to',
    exampleSentence: 'أَكْرَمَ الضَّيْفَ',
    exampleTranslation: 'He honored the guest',
    difficulty: 'intermediate',
    sarfId: 21
  },
  {
    root: 'أ م ن',
    gerund: 'إِيمَان',
    presentTense: 'يُؤْمِنُ',
    pastTense: 'آمَنَ',
    type: "Mahmooz al-Fa'",
    verbForm: 'IV',
    meaning: 'to believe, have faith',
    exampleSentence: 'آمَنَ الرَّسُولُ بِمَا أُنْزِلَ إِلَيْهِ مِنْ رَبِّهِ',
    exampleTranslation: 'The Messenger has believed in what was revealed to him from his Lord',
    difficulty: 'beginner',
    sarfId: 52
  },
  {
    root: 'ر س ل',
    gerund: 'إِرْسَال',
    presentTense: 'يُرْسِلُ',
    pastTense: 'أَرْسَلَ',
    type: 'Regular',
    verbForm: 'IV',
    meaning: 'to send, dispatch',
    exampleSentence: 'وَمَا أَرْسَلْنَاكَ إِلَّا رَحْمَةً لِلْعَالَمِينَ',
    exampleTranslation: 'And We have not sent you except as a mercy to the worlds',
    difficulty: 'intermediate',
    sarfId: 115
  },
  {
    root: 'ق و م',
    gerund: 'إِقَامَة',
    presentTense: 'يُقِيمُ',
    pastTense: 'أَقَامَ',
    type: 'Ajwaf',
    verbForm: 'IV',
    meaning: 'to establish, set up, perform (prayer)',
    exampleSentence: 'وَأَقِيمُوا الصَّلَاةَ وَآتُوا الزَّكَاةَ',
    exampleTranslation: 'And establish prayer and give zakah',
    difficulty: 'intermediate',
    sarfId: 150
  },
  {
    root: 'ن ز ل',
    gerund: 'إِنْزَال',
    presentTense: 'يُنْزِلُ',
    pastTense: 'أَنْزَلَ',
    type: 'Regular',
    verbForm: 'IV',
    meaning: 'to send down, reveal',
    exampleSentence: 'أَنْزَلَ اللهُ الْقُرْآنَ',
    exampleTranslation: 'Allah sent down the Quran',
    difficulty: 'beginner',
    sarfId: 118
  },
  {
    root: 'خ ر ج',
    gerund: 'إِخْرَاج',
    presentTense: 'يُخْرِجُ',
    pastTense: 'أَخْرَجَ',
    type: 'Regular',
    verbForm: 'IV',
    meaning: 'to expel, bring out, extract',
    exampleSentence: 'أَخْرَجَهُمْ مِنَ الْجَنَّةِ',
    exampleTranslation: 'He expelled them from Paradise',
    difficulty: 'intermediate',
    sarfId: 149
  },
  {
    root: 'ع ط ي',
    gerund: 'إِعْطَاء',
    presentTense: 'يُعْطِي',
    pastTense: 'أَعْطَى',
    type: 'Naqis',
    verbForm: 'IV',
    meaning: 'to give, grant, bestow',
    exampleSentence: 'أَعْطَاهُ مَالًا',
    exampleTranslation: 'He gave him money',
    difficulty: 'intermediate',
    sarfId: 265
  },

  // Form V (تفعّل) - Reflexive/Intensive - 5 verbs
  {
    root: 'ع ل م',
    gerund: 'تَعَلُّم',
    presentTense: 'يَتَعَلَّمُ',
    pastTense: 'تَعَلَّمَ',
    type: 'Regular',
    verbForm: 'V',
    meaning: 'to learn',
    exampleSentence: 'تَعَلَّمَ الطَّالِبُ اللُّغَةَ الْعَرَبِيَّةَ',
    exampleTranslation: 'The student learned the Arabic language',
    difficulty: 'beginner',
    sarfId: 23
  },
  {
    root: 'ك ل م',
    gerund: 'تَكَلُّم',
    presentTense: 'يَتَكَلَّمُ',
    pastTense: 'تَكَلَّمَ',
    type: 'Regular',
    verbForm: 'V',
    meaning: 'to speak, talk',
    exampleSentence: 'تَكَلَّمَ بِالْعَرَبِيَّةِ',
    exampleTranslation: 'He spoke in Arabic',
    difficulty: 'beginner',
    sarfId: 24
  },
  {
    root: 'ذ ك ر',
    gerund: 'تَذَكُّر',
    presentTense: 'يَتَذَكَّرُ',
    pastTense: 'تَذَكَّرَ',
    type: 'Regular',
    verbForm: 'V',
    meaning: 'to remember, recall',
    exampleSentence: 'تَذَكَّرَ مَا قَالَهُ أَبُوهُ',
    exampleTranslation: 'He remembered what his father said',
    difficulty: 'intermediate',
    sarfId: 354
  },
  {
    root: 'ق د م',
    gerund: 'تَقَدُّم',
    presentTense: 'يَتَقَدَّمُ',
    pastTense: 'تَقَدَّمَ',
    type: 'Regular',
    verbForm: 'V',
    meaning: 'to advance, progress, move forward',
    exampleSentence: 'تَقَدَّمَ الْجَيْشُ نَحْوَ الْعَدُوِّ',
    exampleTranslation: 'The army advanced toward the enemy',
    difficulty: 'intermediate',
    sarfId: 398
  },
  {
    root: 'م ن ي',
    gerund: 'تَمَنِّي',
    presentTense: 'يَتَمَنَّى',
    pastTense: 'تَمَنَّى',
    type: 'Naqis',
    verbForm: 'V',
    meaning: 'to wish, desire',
    exampleSentence: 'يَتَمَنَّى النَّجَاحَ',
    exampleTranslation: 'He wishes for success',
    difficulty: 'intermediate',
    sarfId: 433
  },

  // Form VIII (افتعال) - Reflexive - 5 verbs
  {
    root: 'ج م ع',
    gerund: 'اِجْتِمَاع',
    presentTense: 'يَجْتَمِعُ',
    pastTense: 'اِجْتَمَعَ',
    type: 'Regular',
    verbForm: 'VIII',
    meaning: 'to gather, assemble, meet',
    exampleSentence: 'اجْتَمَعَ النَّاسُ فِي الْمَسْجِدِ',
    exampleTranslation: 'The people gathered in the mosque',
    difficulty: 'intermediate',
    sarfId: 40
  },
  {
    root: 'ن ص ر',
    gerund: 'اِنْتِصَار',
    presentTense: 'يَنْتَصِرُ',
    pastTense: 'اِنْتَصَرَ',
    type: 'Regular',
    verbForm: 'VIII',
    meaning: 'to prevail, triumph, be victorious',
    exampleSentence: 'انْتَصَرَ الْجَيْشُ عَلَى الْعَدُوِّ',
    exampleTranslation: 'The army prevailed over the enemy',
    difficulty: 'intermediate',
    sarfId: 45
  },
  {
    root: 'ق ص د',
    gerund: 'اِقْتِصَاد',
    presentTense: 'يَقْتَصِدُ',
    pastTense: 'اِقْتَصَدَ',
    type: 'Regular',
    verbForm: 'VIII',
    meaning: 'to economize, be moderate',
    exampleSentence: 'اقْتَصَدَ فِي النَّفَقَةِ',
    exampleTranslation: 'He economized in spending',
    difficulty: 'intermediate',
    sarfId: 47
  },
  {
    root: 'ع ذ ر',
    gerund: 'اِعْتِذَار',
    presentTense: 'يَعْتَذِرُ',
    pastTense: 'اِعْتَذَرَ',
    type: 'Regular',
    verbForm: 'VIII',
    meaning: 'to apologize, excuse oneself',
    exampleSentence: 'اعْتَذَرَ عَنْ تَأَخُّرِهِ',
    exampleTranslation: 'He apologized for his lateness',
    difficulty: 'intermediate',
    sarfId: 509
  },
  {
    root: 'ح و ج',
    gerund: 'اِحْتِيَاج',
    presentTense: 'يَحْتَاجُ',
    pastTense: 'اِحْتَاجَ',
    type: 'Ajwaf',
    verbForm: 'VIII',
    meaning: 'to need, require',
    exampleSentence: 'يَحْتَاجُ إِلَى مُسَاعَدَةٍ',
    exampleTranslation: 'He needs help',
    difficulty: 'beginner',
    sarfId: 563
  },

  // ========================================
  // EXPANDED FORMS II-X (Additional Verbs)
  // ========================================

  // Form II (فَعَّلَ) - Additional verbs (12 new)
  {
    root: 'ق د س',
    gerund: 'تَقْدِيس',
    presentTense: 'يُقَدِّسُ',
    pastTense: 'قَدَّسَ',
    type: 'Regular',
    verbForm: 'II',
    meaning: 'to sanctify, glorify',
    exampleSentence: 'نُقَدِّسُ لَكَ',
    exampleTranslation: 'We glorify You',
    difficulty: 'intermediate'
  },
  {
    root: 'ح ر م',
    gerund: 'تَحْرِيم',
    presentTense: 'يُحَرِّمُ',
    pastTense: 'حَرَّمَ',
    type: 'Regular',
    verbForm: 'II',
    meaning: 'to forbid, make unlawful',
    exampleSentence: 'حَرَّمَ اللهُ الرِّبَا',
    exampleTranslation: 'Allah has forbidden usury',
    difficulty: 'intermediate'
  },
  {
    root: 'ب ش ر',
    gerund: 'تَبْشِير',
    presentTense: 'يُبَشِّرُ',
    pastTense: 'بَشَّرَ',
    type: 'Regular',
    verbForm: 'II',
    meaning: 'to give good news, announce',
    exampleSentence: 'بَشَّرَهُمْ رَبُّهُمْ بِرَحْمَةٍ مِنْهُ',
    exampleTranslation: 'Their Lord gives them good tidings of mercy from Him',
    difficulty: 'intermediate'
  },
  {
    root: 'غ ي ر',
    gerund: 'تَغْيِير',
    presentTense: 'يُغَيِّرُ',
    pastTense: 'غَيَّرَ',
    type: 'Regular',
    verbForm: 'II',
    meaning: 'to change, alter',
    exampleSentence: 'إِنَّ اللهَ لَا يُغَيِّرُ مَا بِقَوْمٍ',
    exampleTranslation: 'Indeed, Allah will not change the condition of a people',
    difficulty: 'intermediate'
  },
  {
    root: 'ص ل ي',
    gerund: 'تَصْلِيَة',
    presentTense: 'يُصَلِّي',
    pastTense: 'صَلَّى',
    type: 'Naqis',
    verbForm: 'II',
    meaning: 'to pray, send blessings',
    exampleSentence: 'صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ',
    exampleTranslation: 'May Allah bless him and grant him peace',
    difficulty: 'beginner'
  },
  {
    root: 'ط ه ر',
    gerund: 'تَطْهِير',
    presentTense: 'يُطَهِّرُ',
    pastTense: 'طَهَّرَ',
    type: 'Regular',
    verbForm: 'II',
    meaning: 'to purify, cleanse',
    exampleSentence: 'وَيُطَهِّرَكُمْ تَطْهِيرًا',
    exampleTranslation: 'And purify you with thorough purification',
    difficulty: 'intermediate'
  },
  {
    root: 'ف ض ل',
    gerund: 'تَفْضِيل',
    presentTense: 'يُفَضِّلُ',
    pastTense: 'فَضَّلَ',
    type: 'Regular',
    verbForm: 'II',
    meaning: 'to prefer, favor',
    exampleSentence: 'فَضَّلْنَا بَعْضَهُمْ عَلَى بَعْضٍ',
    exampleTranslation: 'We have favored some over others',
    difficulty: 'intermediate'
  },
  {
    root: 'ز ك ي',
    gerund: 'تَزْكِيَة',
    presentTense: 'يُزَكِّي',
    pastTense: 'زَكَّى',
    type: 'Naqis',
    verbForm: 'II',
    meaning: 'to purify, commend',
    exampleSentence: 'قَدْ أَفْلَحَ مَنْ زَكَّاهَا',
    exampleTranslation: 'He has succeeded who purifies it',
    difficulty: 'intermediate'
  },
  {
    root: 'ق ر ب',
    gerund: 'تَقْرِيب',
    presentTense: 'يُقَرِّبُ',
    pastTense: 'قَرَّبَ',
    type: 'Regular',
    verbForm: 'II',
    meaning: 'to bring close, offer',
    exampleSentence: 'قَرَّبَ قُرْبَانًا',
    exampleTranslation: 'He offered a sacrifice',
    difficulty: 'intermediate'
  },
  {
    root: 'ح ق ق',
    gerund: 'تَحْقِيق',
    presentTense: 'يُحَقِّقُ',
    pastTense: 'حَقَّقَ',
    type: "Mudaa'af",
    verbForm: 'II',
    meaning: 'to achieve, realize, verify',
    exampleSentence: 'حَقَّقَ هَدَفَهُ',
    exampleTranslation: 'He achieved his goal',
    difficulty: 'intermediate'
  },
  {
    root: 'ج ر ب',
    gerund: 'تَجْرِيب',
    presentTense: 'يُجَرِّبُ',
    pastTense: 'جَرَّبَ',
    type: 'Regular',
    verbForm: 'II',
    meaning: 'to try, experiment, test',
    exampleSentence: 'جَرَّبَ الدَّوَاءَ الْجَدِيدَ',
    exampleTranslation: 'He tried the new medicine',
    difficulty: 'intermediate'
  },
  {
    root: 'ف ك ر',
    gerund: 'تَفْكِير',
    presentTense: 'يُفَكِّرُ',
    pastTense: 'فَكَّرَ',
    type: 'Regular',
    verbForm: 'II',
    meaning: 'to think, ponder',
    exampleSentence: 'فَكَّرَ فِي الْأَمْرِ',
    exampleTranslation: 'He thought about the matter',
    difficulty: 'intermediate'
  },

  // Form III (فَاعَلَ) - Additional verbs (15 new)
  {
    root: 'ج ه د',
    gerund: 'جِهَاد',
    presentTense: 'يُجَاهِدُ',
    pastTense: 'جَاهَدَ',
    type: 'Regular',
    verbForm: 'III',
    meaning: 'to struggle, strive',
    exampleSentence: 'جَاهَدُوا فِي سَبِيلِ اللهِ',
    exampleTranslation: 'They strove in the way of Allah',
    difficulty: 'intermediate'
  },
  {
    root: 'ق ت ل',
    gerund: 'قِتَال',
    presentTense: 'يُقَاتِلُ',
    pastTense: 'قَاتَلَ',
    type: 'Regular',
    verbForm: 'III',
    meaning: 'to fight, combat',
    exampleSentence: 'وَقَاتِلُوا فِي سَبِيلِ اللهِ',
    exampleTranslation: 'And fight in the way of Allah',
    difficulty: 'intermediate'
  },
  {
    root: 'ش ه د',
    gerund: 'مُشَاهَدَة',
    presentTense: 'يُشَاهِدُ',
    pastTense: 'شَاهَدَ',
    type: 'Regular',
    verbForm: 'III',
    meaning: 'to witness, watch, observe',
    exampleSentence: 'شَاهَدَ الْمُبَارَاةَ',
    exampleTranslation: 'He watched the match',
    difficulty: 'beginner'
  },
  {
    root: 'س ف ر',
    gerund: 'مُسَافَرَة',
    presentTense: 'يُسَافِرُ',
    pastTense: 'سَافَرَ',
    type: 'Regular',
    verbForm: 'III',
    meaning: 'to travel',
    exampleSentence: 'سَافَرَ إِلَى مَكَّةَ',
    exampleTranslation: 'He traveled to Mecca',
    difficulty: 'beginner'
  },
  {
    root: 'ق ب ل',
    gerund: 'مُقَابَلَة',
    presentTense: 'يُقَابِلُ',
    pastTense: 'قَابَلَ',
    type: 'Regular',
    verbForm: 'III',
    meaning: 'to meet, interview, encounter',
    exampleSentence: 'قَابَلَ صَدِيقَهُ',
    exampleTranslation: 'He met his friend',
    difficulty: 'intermediate'
  },
  {
    root: 'ح و ل',
    gerund: 'مُحَاوَلَة',
    presentTense: 'يُحَاوِلُ',
    pastTense: 'حَاوَلَ',
    type: 'Ajwaf',
    verbForm: 'III',
    meaning: 'to try, attempt',
    exampleSentence: 'حَاوَلَ أَنْ يَفْهَمَ',
    exampleTranslation: 'He tried to understand',
    difficulty: 'beginner'
  },
  {
    root: 'ع و ن',
    gerund: 'مُعَاوَنَة',
    presentTense: 'يُعَاوِنُ',
    pastTense: 'عَاوَنَ',
    type: 'Ajwaf',
    verbForm: 'III',
    meaning: 'to help, assist',
    exampleSentence: 'عَاوَنَهُ فِي الْعَمَلِ',
    exampleTranslation: 'He helped him in the work',
    difficulty: 'intermediate'
  },
  {
    root: 'ن د ي',
    gerund: 'مُنَادَاة',
    presentTense: 'يُنَادِي',
    pastTense: 'نَادَى',
    type: 'Naqis',
    verbForm: 'III',
    meaning: 'to call out, summon',
    exampleSentence: 'نَادَاهُ رَبُّهُ',
    exampleTranslation: 'His Lord called him',
    difficulty: 'intermediate'
  },
  {
    root: 'ح س ب',
    gerund: 'مُحَاسَبَة',
    presentTense: 'يُحَاسِبُ',
    pastTense: 'حَاسَبَ',
    type: 'Regular',
    verbForm: 'III',
    meaning: 'to hold accountable, audit',
    exampleSentence: 'حَاسِبُوا أَنْفُسَكُمْ',
    exampleTranslation: 'Hold yourselves accountable',
    difficulty: 'intermediate'
  },
  {
    root: 'ش ر ك',
    gerund: 'مُشَارَكَة',
    presentTense: 'يُشَارِكُ',
    pastTense: 'شَارَكَ',
    type: 'Regular',
    verbForm: 'III',
    meaning: 'to participate, share',
    exampleSentence: 'شَارَكَ فِي الْمُسَابَقَةِ',
    exampleTranslation: 'He participated in the competition',
    difficulty: 'intermediate'
  },
  {
    root: 'ب ي ع',
    gerund: 'مُبَايَعَة',
    presentTense: 'يُبَايِعُ',
    pastTense: 'بَايَعَ',
    type: 'Ajwaf',
    verbForm: 'III',
    meaning: 'to pledge allegiance, make a pact',
    exampleSentence: 'بَايَعُوا الْخَلِيفَةَ',
    exampleTranslation: 'They pledged allegiance to the caliph',
    difficulty: 'advanced'
  },
  {
    root: 'ع م ل',
    gerund: 'مُعَامَلَة',
    presentTense: 'يُعَامِلُ',
    pastTense: 'عَامَلَ',
    type: 'Regular',
    verbForm: 'III',
    meaning: 'to treat, deal with',
    exampleSentence: 'عَامَلَهُ بِاحْتِرَامٍ',
    exampleTranslation: 'He treated him with respect',
    difficulty: 'intermediate'
  },
  {
    root: 'ج و ب',
    gerund: 'مُجَاوَبَة',
    presentTense: 'يُجَاوِبُ',
    pastTense: 'جَاوَبَ',
    type: 'Ajwaf',
    verbForm: 'III',
    meaning: 'to answer, respond',
    exampleSentence: 'جَاوَبَهُ عَلَى سُؤَالِهِ',
    exampleTranslation: 'He answered his question',
    difficulty: 'intermediate'
  },
  {
    root: 'خ ط ب',
    gerund: 'مُخَاطَبَة',
    presentTense: 'يُخَاطِبُ',
    pastTense: 'خَاطَبَ',
    type: 'Regular',
    verbForm: 'III',
    meaning: 'to address, speak to',
    exampleSentence: 'خَاطَبَ الْجُمْهُورَ',
    exampleTranslation: 'He addressed the audience',
    difficulty: 'intermediate'
  },
  {
    root: 'ر ج ع',
    gerund: 'مُرَاجَعَة',
    presentTense: 'يُرَاجِعُ',
    pastTense: 'رَاجَعَ',
    type: 'Regular',
    verbForm: 'III',
    meaning: 'to review, revise',
    exampleSentence: 'رَاجَعَ الدَّرْسَ',
    exampleTranslation: 'He reviewed the lesson',
    difficulty: 'intermediate'
  },

  // Form V (تَفَعَّلَ) - Additional verbs (10 new)
  {
    root: 'و ض أ',
    gerund: 'تَوَضُّؤ',
    presentTense: 'يَتَوَضَّأُ',
    pastTense: 'تَوَضَّأَ',
    type: 'Mahmooz al-Lam',
    verbForm: 'V',
    meaning: 'to perform ablution',
    exampleSentence: 'تَوَضَّأَ لِلصَّلَاةِ',
    exampleTranslation: 'He performed ablution for prayer',
    difficulty: 'beginner'
  },
  {
    root: 'ص د ق',
    gerund: 'تَصَدُّق',
    presentTense: 'يَتَصَدَّقُ',
    pastTense: 'تَصَدَّقَ',
    type: 'Regular',
    verbForm: 'V',
    meaning: 'to give charity',
    exampleSentence: 'تَصَدَّقَ عَلَى الْفُقَرَاءِ',
    exampleTranslation: 'He gave charity to the poor',
    difficulty: 'intermediate'
  },
  {
    root: 'ح ر ك',
    gerund: 'تَحَرُّك',
    presentTense: 'يَتَحَرَّكُ',
    pastTense: 'تَحَرَّكَ',
    type: 'Regular',
    verbForm: 'V',
    meaning: 'to move',
    exampleSentence: 'تَحَرَّكَ الْمَوْكِبُ',
    exampleTranslation: 'The procession moved',
    difficulty: 'intermediate'
  },
  {
    root: 'ع ر ف',
    gerund: 'تَعَرُّف',
    presentTense: 'يَتَعَرَّفُ',
    pastTense: 'تَعَرَّفَ',
    type: 'Regular',
    verbForm: 'V',
    meaning: 'to get to know, recognize',
    exampleSentence: 'تَعَرَّفَ عَلَى أَصْدِقَاءَ جُدُدٍ',
    exampleTranslation: 'He got to know new friends',
    difficulty: 'intermediate'
  },
  {
    root: 'ف ق ه',
    gerund: 'تَفَقُّه',
    presentTense: 'يَتَفَقَّهُ',
    pastTense: 'تَفَقَّهَ',
    type: 'Regular',
    verbForm: 'V',
    meaning: 'to study deeply, gain understanding',
    exampleSentence: 'تَفَقَّهَ فِي الدِّينِ',
    exampleTranslation: 'He gained deep understanding in religion',
    difficulty: 'advanced'
  },
  {
    root: 'ح د ث',
    gerund: 'تَحَدُّث',
    presentTense: 'يَتَحَدَّثُ',
    pastTense: 'تَحَدَّثَ',
    type: 'Regular',
    verbForm: 'V',
    meaning: 'to speak, talk',
    exampleSentence: 'تَحَدَّثَ عَنِ الْمَوْضُوعِ',
    exampleTranslation: 'He spoke about the topic',
    difficulty: 'beginner'
  },
  {
    root: 'ف ر ق',
    gerund: 'تَفَرُّق',
    presentTense: 'يَتَفَرَّقُ',
    pastTense: 'تَفَرَّقَ',
    type: 'Regular',
    verbForm: 'V',
    meaning: 'to disperse, separate',
    exampleSentence: 'تَفَرَّقَ الْقَوْمُ',
    exampleTranslation: 'The people dispersed',
    difficulty: 'intermediate'
  },
  {
    root: 'ب د ل',
    gerund: 'تَبَدُّل',
    presentTense: 'يَتَبَدَّلُ',
    pastTense: 'تَبَدَّلَ',
    type: 'Regular',
    verbForm: 'V',
    meaning: 'to change, be transformed',
    exampleSentence: 'تَبَدَّلَ الْحَالُ',
    exampleTranslation: 'The situation changed',
    difficulty: 'intermediate'
  },
  {
    root: 'و ك ل',
    gerund: 'تَوَكُّل',
    presentTense: 'يَتَوَكَّلُ',
    pastTense: 'تَوَكَّلَ',
    type: 'Mithal',
    verbForm: 'V',
    meaning: 'to rely on, trust in',
    exampleSentence: 'تَوَكَّلْ عَلَى اللهِ',
    exampleTranslation: 'Rely on Allah',
    difficulty: 'intermediate'
  },
  {
    root: 'و ق ع',
    gerund: 'تَوَقُّع',
    presentTense: 'يَتَوَقَّعُ',
    pastTense: 'تَوَقَّعَ',
    type: 'Mithal',
    verbForm: 'V',
    meaning: 'to expect, anticipate',
    exampleSentence: 'تَوَقَّعَ النَّتِيجَةَ',
    exampleTranslation: 'He expected the result',
    difficulty: 'intermediate'
  },

  // Form VI (تَفَاعَلَ) - Additional verbs (10 new)
  {
    root: 'ع و ن',
    gerund: 'تَعَاوُن',
    presentTense: 'يَتَعَاوَنُ',
    pastTense: 'تَعَاوَنَ',
    type: 'Ajwaf',
    verbForm: 'VI',
    meaning: 'to cooperate, help one another',
    exampleSentence: 'تَعَاوَنُوا عَلَى الْبِرِّ وَالتَّقْوَى',
    exampleTranslation: 'Cooperate in righteousness and piety',
    difficulty: 'intermediate'
  },
  {
    root: 'س أ ل',
    gerund: 'تَسَاؤُل',
    presentTense: 'يَتَسَاءَلُ',
    pastTense: 'تَسَاءَلَ',
    type: "Mahmooz al-'Ayn",
    verbForm: 'VI',
    meaning: 'to wonder, ask one another',
    exampleSentence: 'تَسَاءَلُوا عَنِ الْأَمْرِ',
    exampleTranslation: 'They wondered about the matter',
    difficulty: 'intermediate'
  },
  {
    root: 'ش و ر',
    gerund: 'تَشَاوُر',
    presentTense: 'يَتَشَاوَرُ',
    pastTense: 'تَشَاوَرَ',
    type: 'Ajwaf',
    verbForm: 'VI',
    meaning: 'to consult one another',
    exampleSentence: 'تَشَاوَرُوا فِي أَمْرِهِمْ',
    exampleTranslation: 'They consulted one another about their affair',
    difficulty: 'intermediate'
  },
  {
    root: 'ص ل ح',
    gerund: 'تَصَالُح',
    presentTense: 'يَتَصَالَحُ',
    pastTense: 'تَصَالَحَ',
    type: 'Regular',
    verbForm: 'VI',
    meaning: 'to reconcile, make peace',
    exampleSentence: 'تَصَالَحَ الْفَرِيقَانِ',
    exampleTranslation: 'The two parties reconciled',
    difficulty: 'intermediate'
  },
  {
    root: 'ق ب ل',
    gerund: 'تَقَابُل',
    presentTense: 'يَتَقَابَلُ',
    pastTense: 'تَقَابَلَ',
    type: 'Regular',
    verbForm: 'VI',
    meaning: 'to meet one another, face each other',
    exampleSentence: 'تَقَابَلُوا فِي الْمَسْجِدِ',
    exampleTranslation: 'They met each other in the mosque',
    difficulty: 'intermediate'
  },
  {
    root: 'ن ص ر',
    gerund: 'تَنَاصُر',
    presentTense: 'يَتَنَاصَرُ',
    pastTense: 'تَنَاصَرَ',
    type: 'Regular',
    verbForm: 'VI',
    meaning: 'to help one another, support each other',
    exampleSentence: 'تَنَاصَرُوا فِي الْحَقِّ',
    exampleTranslation: 'They helped one another in truth',
    difficulty: 'intermediate'
  },
  {
    root: 'ح ب ب',
    gerund: 'تَحَابُّ',
    presentTense: 'يَتَحَابُّ',
    pastTense: 'تَحَابَّ',
    type: "Mudaa'af",
    verbForm: 'VI',
    meaning: 'to love one another',
    exampleSentence: 'تَحَابُّوا فِي اللهِ',
    exampleTranslation: 'Love one another for the sake of Allah',
    difficulty: 'intermediate'
  },
  {
    root: 'ف ه م',
    gerund: 'تَفَاهُم',
    presentTense: 'يَتَفَاهَمُ',
    pastTense: 'تَفَاهَمَ',
    type: 'Regular',
    verbForm: 'VI',
    meaning: 'to understand one another',
    exampleSentence: 'تَفَاهَمُوا عَلَى الشُّرُوطِ',
    exampleTranslation: 'They came to an understanding on the conditions',
    difficulty: 'intermediate'
  },
  {
    root: 'ب ع د',
    gerund: 'تَبَاعُد',
    presentTense: 'يَتَبَاعَدُ',
    pastTense: 'تَبَاعَدَ',
    type: 'Regular',
    verbForm: 'VI',
    meaning: 'to distance from one another',
    exampleSentence: 'تَبَاعَدَتِ الْمَسَافَاتُ',
    exampleTranslation: 'The distances grew apart',
    difficulty: 'intermediate'
  },
  {
    root: 'ك ث ر',
    gerund: 'تَكَاثُر',
    presentTense: 'يَتَكَاثَرُ',
    pastTense: 'تَكَاثَرَ',
    type: 'Regular',
    verbForm: 'VI',
    meaning: 'to compete in abundance',
    exampleSentence: 'أَلْهَاكُمُ التَّكَاثُرُ',
    exampleTranslation: 'Competition in increase diverts you',
    difficulty: 'intermediate'
  },

  // Form VII (اِنْفَعَلَ) - Additional verbs (10 new)
  {
    root: 'ك س ر',
    gerund: 'اِنْكِسَار',
    presentTense: 'يَنْكَسِرُ',
    pastTense: 'اِنْكَسَرَ',
    type: 'Regular',
    verbForm: 'VII',
    meaning: 'to be broken',
    exampleSentence: 'انْكَسَرَ الزُّجَاجُ',
    exampleTranslation: 'The glass was broken',
    difficulty: 'intermediate'
  },
  {
    root: 'ف ت ح',
    gerund: 'اِنْفِتَاح',
    presentTense: 'يَنْفَتِحُ',
    pastTense: 'اِنْفَتَحَ',
    type: 'Regular',
    verbForm: 'VII',
    meaning: 'to be opened',
    exampleSentence: 'انْفَتَحَ الْبَابُ',
    exampleTranslation: 'The door was opened',
    difficulty: 'intermediate'
  },
  {
    root: 'ق ل ب',
    gerund: 'اِنْقِلَاب',
    presentTense: 'يَنْقَلِبُ',
    pastTense: 'اِنْقَلَبَ',
    type: 'Regular',
    verbForm: 'VII',
    meaning: 'to be overturned, transform',
    exampleSentence: 'انْقَلَبَ عَلَى عَقِبَيْهِ',
    exampleTranslation: 'He turned on his heels',
    difficulty: 'intermediate'
  },
  {
    root: 'ط ل ق',
    gerund: 'اِنْطِلَاق',
    presentTense: 'يَنْطَلِقُ',
    pastTense: 'اِنْطَلَقَ',
    type: 'Regular',
    verbForm: 'VII',
    meaning: 'to set off, depart',
    exampleSentence: 'انْطَلَقُوا فِي رِحْلَتِهِمْ',
    exampleTranslation: 'They set off on their journey',
    difficulty: 'intermediate'
  },
  {
    root: 'ش ق ق',
    gerund: 'اِنْشِقَاق',
    presentTense: 'يَنْشَقُّ',
    pastTense: 'اِنْشَقَّ',
    type: "Mudaa'af",
    verbForm: 'VII',
    meaning: 'to be split, divided',
    exampleSentence: 'انْشَقَّ الْقَمَرُ',
    exampleTranslation: 'The moon was split',
    difficulty: 'intermediate'
  },
  {
    root: 'ق ط ع',
    gerund: 'اِنْقِطَاع',
    presentTense: 'يَنْقَطِعُ',
    pastTense: 'اِنْقَطَعَ',
    type: 'Regular',
    verbForm: 'VII',
    meaning: 'to be cut off, disconnected',
    exampleSentence: 'انْقَطَعَ التَّيَّارُ',
    exampleTranslation: 'The power was cut off',
    difficulty: 'intermediate'
  },
  {
    root: 'ه ز م',
    gerund: 'اِنْهِزَام',
    presentTense: 'يَنْهَزِمُ',
    pastTense: 'اِنْهَزَمَ',
    type: 'Regular',
    verbForm: 'VII',
    meaning: 'to be defeated',
    exampleSentence: 'انْهَزَمَ الْجَيْشُ',
    exampleTranslation: 'The army was defeated',
    difficulty: 'intermediate'
  },
  {
    root: 'ص ر ف',
    gerund: 'اِنْصِرَاف',
    presentTense: 'يَنْصَرِفُ',
    pastTense: 'اِنْصَرَفَ',
    type: 'Regular',
    verbForm: 'VII',
    meaning: 'to leave, depart',
    exampleSentence: 'انْصَرَفَ مِنَ الْمَجْلِسِ',
    exampleTranslation: 'He left the gathering',
    difficulty: 'intermediate'
  },
  {
    root: 'د ف ع',
    gerund: 'اِنْدِفَاع',
    presentTense: 'يَنْدَفِعُ',
    pastTense: 'اِنْدَفَعَ',
    type: 'Regular',
    verbForm: 'VII',
    meaning: 'to rush forward, be pushed',
    exampleSentence: 'انْدَفَعَ نَحْوَ الْبَابِ',
    exampleTranslation: 'He rushed toward the door',
    difficulty: 'intermediate'
  },
  {
    root: 'ج ذ ب',
    gerund: 'اِنْجِذَاب',
    presentTense: 'يَنْجَذِبُ',
    pastTense: 'اِنْجَذَبَ',
    type: 'Regular',
    verbForm: 'VII',
    meaning: 'to be attracted',
    exampleSentence: 'انْجَذَبَ إِلَى الْعِلْمِ',
    exampleTranslation: 'He was attracted to knowledge',
    difficulty: 'intermediate'
  },

  // Form VIII (اِفْتَعَلَ) - Additional verbs (10 new)
  {
    root: 'ك س ب',
    gerund: 'اِكْتِسَاب',
    presentTense: 'يَكْتَسِبُ',
    pastTense: 'اِكْتَسَبَ',
    type: 'Regular',
    verbForm: 'VIII',
    meaning: 'to acquire, earn',
    exampleSentence: 'اكْتَسَبَ خِبْرَةً',
    exampleTranslation: 'He acquired experience',
    difficulty: 'intermediate'
  },
  {
    root: 'ش ر ي',
    gerund: 'اِشْتِرَاء',
    presentTense: 'يَشْتَرِي',
    pastTense: 'اِشْتَرَى',
    type: 'Naqis',
    verbForm: 'VIII',
    meaning: 'to buy, purchase',
    exampleSentence: 'اشْتَرَى كِتَابًا',
    exampleTranslation: 'He bought a book',
    difficulty: 'beginner'
  },
  {
    root: 'ق ر ب',
    gerund: 'اِقْتِرَاب',
    presentTense: 'يَقْتَرِبُ',
    pastTense: 'اِقْتَرَبَ',
    type: 'Regular',
    verbForm: 'VIII',
    meaning: 'to approach, draw near',
    exampleSentence: 'اقْتَرَبَتِ السَّاعَةُ',
    exampleTranslation: 'The Hour has drawn near',
    difficulty: 'intermediate'
  },
  {
    root: 'خ ل ف',
    gerund: 'اِخْتِلَاف',
    presentTense: 'يَخْتَلِفُ',
    pastTense: 'اِخْتَلَفَ',
    type: 'Regular',
    verbForm: 'VIII',
    meaning: 'to differ, disagree',
    exampleSentence: 'اخْتَلَفُوا فِي الرَّأْيِ',
    exampleTranslation: 'They differed in opinion',
    difficulty: 'intermediate'
  },
  {
    root: 'خ ي ر',
    gerund: 'اِخْتِيَار',
    presentTense: 'يَخْتَارُ',
    pastTense: 'اِخْتَارَ',
    type: 'Ajwaf',
    verbForm: 'VIII',
    meaning: 'to choose, select',
    exampleSentence: 'اخْتَارَ أَفْضَلَ الْخِيَارَاتِ',
    exampleTranslation: 'He chose the best options',
    difficulty: 'intermediate'
  },
  {
    root: 'ن ظ ر',
    gerund: 'اِنْتِظَار',
    presentTense: 'يَنْتَظِرُ',
    pastTense: 'اِنْتَظَرَ',
    type: 'Regular',
    verbForm: 'VIII',
    meaning: 'to wait, expect',
    exampleSentence: 'انْتَظَرَ صَدِيقَهُ',
    exampleTranslation: 'He waited for his friend',
    difficulty: 'beginner'
  },
  {
    root: 'ه م م',
    gerund: 'اِهْتِمَام',
    presentTense: 'يَهْتَمُّ',
    pastTense: 'اِهْتَمَّ',
    type: "Mudaa'af",
    verbForm: 'VIII',
    meaning: 'to be concerned, care about',
    exampleSentence: 'اهْتَمَّ بِدِرَاسَتِهِ',
    exampleTranslation: 'He was concerned with his studies',
    difficulty: 'intermediate'
  },
  {
    root: 'ع ت ق',
    gerund: 'اِعْتِقَاد',
    presentTense: 'يَعْتَقِدُ',
    pastTense: 'اِعْتَقَدَ',
    type: 'Regular',
    verbForm: 'VIII',
    meaning: 'to believe, hold a belief',
    exampleSentence: 'اعْتَقَدَ أَنَّهُ صَوَابٌ',
    exampleTranslation: 'He believed it was correct',
    difficulty: 'intermediate'
  },
  {
    root: 'ح ت ر',
    gerund: 'اِحْتِرَام',
    presentTense: 'يَحْتَرِمُ',
    pastTense: 'اِحْتَرَمَ',
    type: 'Regular',
    verbForm: 'VIII',
    meaning: 'to respect',
    exampleSentence: 'احْتَرَمَ مُعَلِّمَهُ',
    exampleTranslation: 'He respected his teacher',
    difficulty: 'beginner'
  },
  {
    root: 'ف ت ق',
    gerund: 'اِفْتِتَاح',
    presentTense: 'يَفْتَتِحُ',
    pastTense: 'اِفْتَتَحَ',
    type: 'Regular',
    verbForm: 'VIII',
    meaning: 'to inaugurate, open',
    exampleSentence: 'افْتَتَحَ الْمَعْرِضَ',
    exampleTranslation: 'He inaugurated the exhibition',
    difficulty: 'intermediate'
  },

  // Form IX (اِفْعَلَّ) - Color/Defect verbs (5 new)
  {
    root: 'ح م ر',
    gerund: 'اِحْمِرَار',
    presentTense: 'يَحْمَرُّ',
    pastTense: 'اِحْمَرَّ',
    type: 'Regular',
    verbForm: 'IX',
    meaning: 'to become red, blush',
    exampleSentence: 'احْمَرَّ وَجْهُهُ خَجَلاً',
    exampleTranslation: 'His face reddened with embarrassment',
    difficulty: 'advanced'
  },
  {
    root: 'ب ي ض',
    gerund: 'اِبْيِضَاض',
    presentTense: 'يَبْيَضُّ',
    pastTense: 'اِبْيَضَّ',
    type: 'Ajwaf',
    verbForm: 'IX',
    meaning: 'to become white',
    exampleSentence: 'ابْيَضَّتْ عَيْنَاهُ مِنَ الْحُزْنِ',
    exampleTranslation: 'His eyes became white from grief',
    difficulty: 'advanced'
  },
  {
    root: 'س و د',
    gerund: 'اِسْوِدَاد',
    presentTense: 'يَسْوَدُّ',
    pastTense: 'اِسْوَدَّ',
    type: 'Ajwaf',
    verbForm: 'IX',
    meaning: 'to become black',
    exampleSentence: 'اسْوَدَّ وَجْهُهُ مِنَ الْغَضَبِ',
    exampleTranslation: 'His face blackened with anger',
    difficulty: 'advanced'
  },
  {
    root: 'خ ض ر',
    gerund: 'اِخْضِرَار',
    presentTense: 'يَخْضَرُّ',
    pastTense: 'اِخْضَرَّ',
    type: 'Regular',
    verbForm: 'IX',
    meaning: 'to become green',
    exampleSentence: 'اخْضَرَّتِ الْأَرْضُ',
    exampleTranslation: 'The land became green',
    difficulty: 'advanced'
  },
  {
    root: 'ص ف ر',
    gerund: 'اِصْفِرَار',
    presentTense: 'يَصْفَرُّ',
    pastTense: 'اِصْفَرَّ',
    type: 'Regular',
    verbForm: 'IX',
    meaning: 'to become yellow',
    exampleSentence: 'اصْفَرَّتِ الْأَوْرَاقُ',
    exampleTranslation: 'The leaves turned yellow',
    difficulty: 'advanced'
  },

  // Form X (اِسْتَفْعَلَ) - Additional verbs (15 new)
  {
    root: 'غ ف ر',
    gerund: 'اِسْتِغْفَار',
    presentTense: 'يَسْتَغْفِرُ',
    pastTense: 'اِسْتَغْفَرَ',
    type: 'Regular',
    verbForm: 'X',
    meaning: 'to seek forgiveness',
    exampleSentence: 'اسْتَغْفَرَ اللهَ',
    exampleTranslation: 'He sought forgiveness from Allah',
    difficulty: 'beginner'
  },
  {
    root: 'ع و ن',
    gerund: 'اِسْتِعَانَة',
    presentTense: 'يَسْتَعِينُ',
    pastTense: 'اِسْتَعَانَ',
    type: 'Ajwaf',
    verbForm: 'X',
    meaning: 'to seek help',
    exampleSentence: 'إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ',
    exampleTranslation: 'You alone we worship and You alone we ask for help',
    difficulty: 'beginner'
  },
  {
    root: 'ق و م',
    gerund: 'اِسْتِقَامَة',
    presentTense: 'يَسْتَقِيمُ',
    pastTense: 'اِسْتَقَامَ',
    type: 'Ajwaf',
    verbForm: 'X',
    meaning: 'to be upright, straighten',
    exampleSentence: 'اسْتَقِيمُوا كَمَا أُمِرْتُمْ',
    exampleTranslation: 'Be upright as you have been commanded',
    difficulty: 'intermediate'
  },
  {
    root: 'ط و ع',
    gerund: 'اِسْتِطَاعَة',
    presentTense: 'يَسْتَطِيعُ',
    pastTense: 'اِسْتَطَاعَ',
    type: 'Ajwaf',
    verbForm: 'X',
    meaning: 'to be able, can',
    exampleSentence: 'مَنِ اسْتَطَاعَ إِلَيْهِ سَبِيلاً',
    exampleTranslation: 'Whoever is able to find a way to it',
    difficulty: 'beginner'
  },
  {
    root: 'ج و ب',
    gerund: 'اِسْتِجَابَة',
    presentTense: 'يَسْتَجِيبُ',
    pastTense: 'اِسْتَجَابَ',
    type: 'Ajwaf',
    verbForm: 'X',
    meaning: 'to respond, answer',
    exampleSentence: 'فَاسْتَجَابَ لَهُمْ رَبُّهُمْ',
    exampleTranslation: 'So their Lord responded to them',
    difficulty: 'intermediate'
  },
  {
    root: 'خ ر ج',
    gerund: 'اِسْتِخْرَاج',
    presentTense: 'يَسْتَخْرِجُ',
    pastTense: 'اِسْتَخْرَجَ',
    type: 'Regular',
    verbForm: 'X',
    meaning: 'to extract, derive',
    exampleSentence: 'اسْتَخْرَجَ الْحُكْمَ مِنَ الْآيَةِ',
    exampleTranslation: 'He derived the ruling from the verse',
    difficulty: 'intermediate'
  },
  {
    root: 'ع م ل',
    gerund: 'اِسْتِعْمَال',
    presentTense: 'يَسْتَعْمِلُ',
    pastTense: 'اِسْتَعْمَلَ',
    type: 'Regular',
    verbForm: 'X',
    meaning: 'to use, employ',
    exampleSentence: 'اسْتَعْمَلَ الْحَاسُوبَ',
    exampleTranslation: 'He used the computer',
    difficulty: 'beginner'
  },
  {
    root: 'ق ب ل',
    gerund: 'اِسْتِقْبَال',
    presentTense: 'يَسْتَقْبِلُ',
    pastTense: 'اِسْتَقْبَلَ',
    type: 'Regular',
    verbForm: 'X',
    meaning: 'to receive, welcome, face',
    exampleSentence: 'اسْتَقْبَلَ الضُّيُوفَ',
    exampleTranslation: 'He received the guests',
    difficulty: 'intermediate'
  },
  {
    root: 'م ر ر',
    gerund: 'اِسْتِمْرَار',
    presentTense: 'يَسْتَمِرُّ',
    pastTense: 'اِسْتَمَرَّ',
    type: "Mudaa'af",
    verbForm: 'X',
    meaning: 'to continue, persist',
    exampleSentence: 'اسْتَمَرَّ فِي عَمَلِهِ',
    exampleTranslation: 'He continued in his work',
    difficulty: 'intermediate'
  },
  {
    root: 'ف ه م',
    gerund: 'اِسْتِفْهَام',
    presentTense: 'يَسْتَفْهِمُ',
    pastTense: 'اِسْتَفْهَمَ',
    type: 'Regular',
    verbForm: 'X',
    meaning: 'to inquire, question',
    exampleSentence: 'اسْتَفْهَمَ عَنِ الْمَعْنَى',
    exampleTranslation: 'He inquired about the meaning',
    difficulty: 'intermediate'
  },
  {
    root: 'ش ه د',
    gerund: 'اِسْتِشْهَاد',
    presentTense: 'يَسْتَشْهِدُ',
    pastTense: 'اِسْتَشْهَدَ',
    type: 'Regular',
    verbForm: 'X',
    meaning: 'to cite evidence, be martyred',
    exampleSentence: 'اسْتَشْهَدَ بِالْآيَةِ',
    exampleTranslation: 'He cited the verse as evidence',
    difficulty: 'intermediate'
  },
  {
    root: 'ق ر ر',
    gerund: 'اِسْتِقْرَار',
    presentTense: 'يَسْتَقِرُّ',
    pastTense: 'اِسْتَقَرَّ',
    type: "Mudaa'af",
    verbForm: 'X',
    meaning: 'to settle, be stable',
    exampleSentence: 'اسْتَقَرَّ فِي الْمَدِينَةِ',
    exampleTranslation: 'He settled in the city',
    difficulty: 'intermediate'
  },
  {
    root: 'ع د د',
    gerund: 'اِسْتِعْدَاد',
    presentTense: 'يَسْتَعِدُّ',
    pastTense: 'اِسْتَعَدَّ',
    type: "Mudaa'af",
    verbForm: 'X',
    meaning: 'to prepare, get ready',
    exampleSentence: 'اسْتَعَدَّ لِلسَّفَرِ',
    exampleTranslation: 'He prepared for the journey',
    difficulty: 'intermediate'
  },
  {
    root: 'ف ي د',
    gerund: 'اِسْتِفَادَة',
    presentTense: 'يَسْتَفِيدُ',
    pastTense: 'اِسْتَفَادَ',
    type: 'Ajwaf',
    verbForm: 'X',
    meaning: 'to benefit',
    exampleSentence: 'اسْتَفَادَ مِنَ الدَّرْسِ',
    exampleTranslation: 'He benefited from the lesson',
    difficulty: 'intermediate'
  },
  {
    root: 'ح ق ق',
    gerund: 'اِسْتِحْقَاق',
    presentTense: 'يَسْتَحِقُّ',
    pastTense: 'اِسْتَحَقَّ',
    type: "Mudaa'af",
    verbForm: 'X',
    meaning: 'to deserve, merit',
    exampleSentence: 'اسْتَحَقَّ الْجَائِزَةَ',
    exampleTranslation: 'He deserved the prize',
    difficulty: 'intermediate'
  },
];

/**
 * Get random words filtered by verb type and form compatibility
 *
 * @param count - Number of words to return
 * @param selectedTypes - Verb types to include (e.g., ['Regular', 'Mithal'])
 * @param selectedForms - Verb forms to validate against (e.g., [1, 2, 7])
 * @param strictMode - Whether to block rare combinations
 * @returns Array of random ArabicWord objects
 */
export function getRandomWords(
  count: number,
  selectedTypes: string[],
  selectedForms?: number[],
  strictMode: boolean = false
): ArabicWord[] {
  let pool = arabicWords;

  // Filter by verb type
  if (selectedTypes.length > 0) {
    pool = pool.filter(word => selectedTypes.includes(word.type));
  }

  // Filter by form compatibility AND actual form
  if (selectedForms && selectedForms.length > 0) {
    pool = pool.filter(word => {
      // Convert verb form to number for comparison
      const wordFormNumber = word.verbForm
        ? ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'].indexOf(word.verbForm) + 1
        : 1;

      // Must match one of the selected forms AND be valid for that form
      return selectedForms.some(formNumber => {
        if (wordFormNumber !== formNumber) return false; // Form doesn't match
        const result = validateFormForVerbType(formNumber, word.type, strictMode);
        return result.valid; // Check compatibility
      });
    });
  }

  // Shuffle and return requested count
  const shuffled = shuffle(pool);
  return shuffled.slice(0, Math.min(count, pool.length));
}

/**
 * Get random words with progressive relaxation fallback
 * Guarantees exactly 'count' words by relaxing filters if needed
 */
export function getRandomWordsWithFallback(
  count: number,
  selectedTypes: string[],
  selectedForms?: number[],
  strictMode = false
): ArabicWord[] {
  let words: ArabicWord[] = [];

  // === TIER 1: User Preferences ===
  words = getRandomWords(count, selectedTypes, selectedForms, strictMode);

  if (words.length >= count) {
    return words.slice(0, count);
  }

  // === TIER 2: Relax Verb Type Filter ===
  if (words.length < count) {
    const needed = count - words.length;
    const tier2Words = getRandomWords(
      needed * 2, // Request 2x to account for deduplication
      [], // All verb types
      selectedForms, // Keep form constraints
      false // Disable strict mode
    );

    // Merge and deduplicate
    const allWords = [...words, ...tier2Words];
    const seen = new Set<string>();
    const uniqueWords = allWords.filter(word => {
      const key = `${word.root}-${word.verbForm || 'I'}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });

    words = uniqueWords.slice(0, count);

    if (words.length >= count) {
      return words.slice(0, count);
    }
  }

  // === TIER 3: Remove All Restrictions ===
  if (words.length < count) {
    const needed = count - words.length;
    const tier3Words = getRandomWords(
      needed * 3, // Request 3x to ensure success
      [], // All verb types
      undefined, // All forms
      false // Disable strict mode
    );

    // Merge and deduplicate
    const allWords = [...words, ...tier3Words];
    const seen = new Set<string>();
    const uniqueWords = allWords.filter(word => {
      const key = `${word.root}-${word.verbForm || 'I'}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });

    words = uniqueWords.slice(0, count);
  }

  // Final safety check
  if (words.length < count) {
    console.warn(
      `CRITICAL: Could only generate ${words.length}/${count} words after all fallback tiers. ` +
      `This indicates insufficient vocabulary data in the system.`
    );
  }

  return words;
}
