// src/data/reading/medicine-healing.ts

import { ReadingText } from './types';

/**
 * Medicine & Healing themed reading texts
 * Topics: Prophetic medicine, Ibn Sina, historical physicians, healing traditions
 * IDs: b211-b216 (beginner), i202-i207 (intermediate), a197-a202 (advanced)
 */
export const medicineHealingTexts: ReadingText[] = [
  // ===== BEGINNER (b211-b216) =====
  {
    id: 'b211',
    title: 'Honey is Medicine',
    titleAr: 'العَسَلُ دَوَاءٌ',
    level: 'beginner',
    category: 'medicine-healing',
    categoryAr: 'الطب والشفاء',
    text: 'قَالَ اللهُ تَعَالَى عَنِ العَسَلِ: فِيهِ شِفَاءٌ لِلنَّاسِ. وَقَالَ النَّبِيُّ: عَلَيْكُمْ بِالشِّفَاءَيْنِ: العَسَلِ وَالقُرْآنِ. العَسَلُ حُلْوٌ وَمُفِيدٌ. يُعَالِجُ السُّعَالَ وَالجُرُوحَ. النَّحْلُ يَصْنَعُهُ مِنَ الأَزْهَارِ. سُبْحَانَ الَّذِي جَعَلَ فِيهِ الشِّفَاءَ.',
    translation: 'Allah the Exalted said about honey: "In it is healing for people." The Prophet said: "Hold fast to the two healings: honey and the Quran." Honey is sweet and beneficial. It treats coughs and wounds. Bees make it from flowers. Glory to He who placed healing in it.',
    grammaticalConcepts: ['فيه + noun', 'عليكم بـ imperative', 'الذي relative'],
    vocabularyHighlights: [
      { word: 'شِفَاء', meaning: 'healing/cure' },
      { word: 'سُعَال', meaning: 'cough' },
      { word: 'جُرُوح', meaning: 'wounds' },
      { word: 'نَحْل', meaning: 'bees' }
    ],
    moralLesson: 'Natural remedies like honey are blessings mentioned in the Quran.',
    moralLessonAr: 'العلاجات الطبيعية كالعسل نعم ذُكرت في القرآن.',
    wordCount: 40
  },
  {
    id: 'b212',
    title: 'The Black Seed',
    titleAr: 'الحَبَّةُ السَّوْدَاءُ',
    level: 'beginner',
    category: 'medicine-healing',
    categoryAr: 'الطب والشفاء',
    text: 'قَالَ النَّبِيُّ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ: فِي الحَبَّةِ السَّوْدَاءِ شِفَاءٌ مِنْ كُلِّ دَاءٍ إِلَّا المَوْتَ. الحَبَّةُ السَّوْدَاءُ صَغِيرَةٌ لَكِنَّهَا قَوِيَّةٌ. النَّاسُ يَسْتَخْدِمُونَهَا مُنْذُ آلَافِ السِّنِينَ. تُقَوِّي الجِسْمَ وَتَحْمِيهِ مِنَ الأَمْرَاضِ.',
    translation: 'The Prophet, peace be upon him, said: "In the black seed is healing from every disease except death." The black seed is small but powerful. People have used it for thousands of years. It strengthens the body and protects it from diseases.',
    grammaticalConcepts: ['استثناء إلّا', 'لكنّ contrast', 'منذ temporal'],
    vocabularyHighlights: [
      { word: 'حَبَّة', meaning: 'seed' },
      { word: 'دَاء', meaning: 'disease/ailment' },
      { word: 'تُقَوِّي', meaning: 'strengthens' },
      { word: 'أَمْرَاض', meaning: 'diseases' }
    ],
    moralLesson: 'The Prophet taught about beneficial natural medicines.',
    moralLessonAr: 'النبي علّم عن الأدوية الطبيعية المفيدة.',
    wordCount: 36
  },
  {
    id: 'b213',
    title: 'Visiting the Sick',
    titleAr: 'زِيَارَةُ المَرِيضِ',
    level: 'beginner',
    category: 'medicine-healing',
    categoryAr: 'الطب والشفاء',
    text: 'زِيَارَةُ المَرِيضِ حَقٌّ عَلَى المُسْلِمِ. قَالَ النَّبِيُّ: مَنْ عَادَ مَرِيضًا لَمْ يَزَلْ فِي خُرْفَةِ الجَنَّةِ. ادْعُ لَهُ بِالشِّفَاءِ. أَعْطِهِ الأَمَلَ وَالبَسْمَةَ. لَا تُطِلِ الزِّيَارَةَ حَتَّى لَا تُتْعِبَهُ. الكَلِمَةُ الطَّيِّبَةُ دَوَاءٌ لِلرُّوحِ.',
    translation: 'Visiting the sick is a right upon the Muslim. The Prophet said: "Whoever visits a sick person remains in the harvest of paradise." Pray for his healing. Give him hope and a smile. Do not prolong the visit so you don\'t tire him. A good word is medicine for the soul.',
    grammaticalConcepts: ['من الشرطية', 'imperative forms', 'لا + jussive prohibition'],
    vocabularyHighlights: [
      { word: 'عَادَ', meaning: 'visited (a sick person)' },
      { word: 'خُرْفَة', meaning: 'harvest/gathering' },
      { word: 'بَسْمَة', meaning: 'smile' },
      { word: 'تُتْعِبَهُ', meaning: 'tire him' }
    ],
    moralLesson: 'Visiting the sick is both a duty and a source of spiritual reward.',
    moralLessonAr: 'زيارة المريض واجب ومصدر للأجر الروحي.',
    wordCount: 42
  },
  {
    id: 'b214',
    title: 'Cleanliness and Health',
    titleAr: 'النَّظَافَةُ وَالصِّحَّةُ',
    level: 'beginner',
    category: 'medicine-healing',
    categoryAr: 'الطب والشفاء',
    text: 'قَالَ النَّبِيُّ: الطُّهُورُ شَطْرُ الإِيمَانِ. النَّظَافَةُ تَحْمِي مِنَ الأَمْرَاضِ. اغْسِلْ يَدَيْكَ قَبْلَ الأَكْلِ وَبَعْدَهُ. نَظِّفْ أَسْنَانَكَ بِالسِّوَاكِ. اسْتَحِمَّ بِانْتِظَامٍ. الجَسَمُ النَّظِيفُ يَبْقَى صَحِيحًا.',
    translation: 'The Prophet said: "Cleanliness is half of faith." Cleanliness protects from diseases. Wash your hands before eating and after. Clean your teeth with the miswak. Bathe regularly. A clean body stays healthy.',
    grammaticalConcepts: ['imperative forms', 'nominal sentences', 'بـ instrumental'],
    vocabularyHighlights: [
      { word: 'طُهُور', meaning: 'cleanliness/purity' },
      { word: 'شَطْر', meaning: 'half' },
      { word: 'سِوَاك', meaning: 'miswak (teeth-cleaning stick)' },
      { word: 'بِانْتِظَام', meaning: 'regularly' }
    ],
    moralLesson: 'Islam emphasizes cleanliness as essential for both faith and health.',
    moralLessonAr: 'الإسلام يؤكد على النظافة كأساس للإيمان والصحة.',
    wordCount: 34
  },
  {
    id: 'b215',
    title: 'The Sick Child',
    titleAr: 'الطِّفْلُ المَرِيضُ',
    level: 'beginner',
    category: 'medicine-healing',
    categoryAr: 'الطب والشفاء',
    text: 'مَرِضَ الطِّفْلُ فَأَخَذَتْهُ أُمُّهُ إِلَى الطَّبِيبِ. فَحَصَهُ الطَّبِيبُ وَقَالَ: إِنَّهُ يَحْتَاجُ رَاحَةً وَدَوَاءً. أَعْطَتْهُ أُمُّهُ الدَّوَاءَ. قَرَأَتْ عَلَيْهِ القُرْآنَ. دَعَتْ لَهُ بِالشِّفَاءِ. بَعْدَ أَيَّامٍ شُفِيَ الطِّفْلُ وَحَمِدَ اللهَ.',
    translation: 'The child got sick so his mother took him to the doctor. The doctor examined him and said: He needs rest and medicine. His mother gave him the medicine. She recited Quran over him. She prayed for his healing. After days the child was healed and praised Allah.',
    grammaticalConcepts: ['past tense sequence', 'أنّ with predicate', 'passive شُفِيَ'],
    vocabularyHighlights: [
      { word: 'فَحَصَ', meaning: 'examined' },
      { word: 'رَاحَة', meaning: 'rest' },
      { word: 'دَوَاء', meaning: 'medicine' },
      { word: 'شُفِيَ', meaning: 'was healed' }
    ],
    moralLesson: 'Healing combines medical treatment with spiritual care.',
    moralLessonAr: 'الشفاء يجمع بين العلاج الطبي والرعاية الروحية.',
    wordCount: 40
  },
  {
    id: 'b216',
    title: 'Food as Medicine',
    titleAr: 'الغِذَاءُ دَوَاءٌ',
    level: 'beginner',
    category: 'medicine-healing',
    categoryAr: 'الطب والشفاء',
    text: 'قَالَ الحُكَمَاءُ: المَعِدَةُ بَيْتُ الدَّاءِ. كُلْ قَلِيلًا تَصِحَّ كَثِيرًا. التَّمْرُ يُقَوِّي الجِسْمَ. الحَلِيبُ يَبْنِي العِظَامَ. الخُضَارُ تَحْمِي مِنَ الأَمْرَاضِ. قَالَ النَّبِيُّ: مَا مَلَأَ ابْنُ آدَمَ وِعَاءً شَرًّا مِنْ بَطْنِهِ.',
    translation: 'The wise said: The stomach is the house of disease. Eat little and you will be healthy much. Dates strengthen the body. Milk builds bones. Vegetables protect from diseases. The Prophet said: "The son of Adam has not filled a vessel worse than his stomach."',
    grammaticalConcepts: ['imperative + jussive', 'ما النافية + comparative', 'nominal predication'],
    vocabularyHighlights: [
      { word: 'مَعِدَة', meaning: 'stomach' },
      { word: 'تَمْر', meaning: 'dates' },
      { word: 'عِظَام', meaning: 'bones' },
      { word: 'وِعَاء', meaning: 'vessel/container' }
    ],
    moralLesson: 'Moderation in eating is key to good health.',
    moralLessonAr: 'الاعتدال في الأكل مفتاح الصحة الجيدة.',
    wordCount: 42
  },

  // ===== INTERMEDIATE (i202-i207) =====
  {
    id: 'i202',
    title: 'The Prophetic Medicine',
    titleAr: 'الطِّبُّ النَّبَوِيُّ',
    level: 'intermediate',
    category: 'medicine-healing',
    categoryAr: 'الطب والشفاء',
    text: 'تَرَكَ النَّبِيُّ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ إِرْشَادَاتٍ طِبِّيَّةً كَثِيرَةً. أَوْصَى بِالحِجَامَةِ لِلصُّدَاعِ. وَبِالعَسَلِ لِلْمَعِدَةِ. وَبِالتَّمْرِ لِلْقُوَّةِ. وَبِالكَمْأَةِ لِلْعَيْنِ. وَنَهَى عَنِ الإِسْرَافِ فِي الطَّعَامِ. وَأَمَرَ بِالتَّدَاوِي قَائِلًا: تَدَاوَوْا فَإِنَّ اللهَ مَا أَنْزَلَ دَاءً إِلَّا أَنْزَلَ لَهُ شِفَاءً. جَمَعَ العُلَمَاءُ هَذِهِ الإِرْشَادَاتِ فِي كُتُبِ الطِّبِّ النَّبَوِيِّ.',
    translation: 'The Prophet, peace be upon him, left many medical guidelines. He recommended cupping for headaches, honey for the stomach, dates for strength, and truffles for the eyes. He prohibited excess in food. He commanded seeking treatment saying: "Seek treatment, for Allah has not sent down a disease except that He sent down a cure for it." Scholars compiled these guidelines in books of Prophetic Medicine.',
    grammaticalConcepts: ['أوصى بـ', 'ما...إلّا exception', 'حال قائلاً'],
    vocabularyHighlights: [
      { word: 'حِجَامَة', meaning: 'cupping therapy' },
      { word: 'كَمْأَة', meaning: 'truffles' },
      { word: 'إِسْرَاف', meaning: 'excess/extravagance' },
      { word: 'تَدَاوَوْا', meaning: 'seek treatment' }
    ],
    moralLesson: 'The Prophet encouraged both prevention and seeking medical treatment.',
    moralLessonAr: 'النبي شجّع على الوقاية وطلب العلاج الطبي.',
    wordCount: 62
  },
  {
    id: 'i203',
    title: 'Ibn Sina the Physician',
    titleAr: 'ابْنُ سِينَا الطَّبِيبُ',
    level: 'intermediate',
    category: 'medicine-healing',
    categoryAr: 'الطب والشفاء',
    text: 'كَانَ أَبُو عَلِيِّ بْنُ سِينَا أَعْظَمَ طَبِيبٍ فِي التَّارِيخِ الإِسْلَامِيِّ. وُلِدَ سَنَةَ ثَمَانِينَ وَثَلَاثِمِائَةٍ هِجْرِيَّةً. حَفِظَ القُرْآنَ وَهُوَ ابْنُ عَشْرٍ. دَرَسَ الطِّبَّ وَالفَلْسَفَةَ وَالرِّيَاضِيَّاتِ. أَلَّفَ كِتَابَ القَانُونِ فِي الطِّبِّ الَّذِي صَارَ مَرْجِعًا لِلْأَطِبَّاءِ فِي الشَّرْقِ وَالغَرْبِ لِخَمْسَةِ قُرُونٍ. عَالَجَ أُمَرَاءَ وَسُلْطَانِينَ وَفُقَرَاءَ بِلَا تَفْرِيقٍ.',
    translation: 'Abu Ali ibn Sina was the greatest physician in Islamic history. He was born in the year 380 Hijri. He memorized the Quran at age ten. He studied medicine, philosophy, and mathematics. He authored "The Canon of Medicine" which became a reference for physicians in East and West for five centuries. He treated princes, sultans, and the poor without discrimination.',
    grammaticalConcepts: ['superlative أعظم', 'الذي relative', 'بلا + مصدر'],
    vocabularyHighlights: [
      { word: 'القَانُون', meaning: 'The Canon (book title)' },
      { word: 'مَرْجِع', meaning: 'reference' },
      { word: 'قُرُون', meaning: 'centuries' },
      { word: 'تَفْرِيق', meaning: 'discrimination' }
    ],
    moralLesson: 'Muslim scholars contributed foundational works to world medicine.',
    moralLessonAr: 'العلماء المسلمون ساهموا بأعمال أساسية في الطب العالمي.',
    wordCount: 60
  },
  {
    id: 'i204',
    title: 'The First Hospitals',
    titleAr: 'المُسْتَشْفَيَاتُ الأُولَى',
    level: 'intermediate',
    category: 'medicine-healing',
    categoryAr: 'الطب والشفاء',
    text: 'أَسَّسَ المُسْلِمُونَ أَوَّلَ المُسْتَشْفَيَاتِ الحَدِيثَةِ. سَمَّوْهَا البِيمَارِسْتَانَاتِ. كَانَتْ مَجَّانِيَّةً لِلْجَمِيعِ: غَنِيًّا وَفَقِيرًا، مُسْلِمًا وَغَيْرَهُ. فِيهَا أَقْسَامٌ مُتَخَصِّصَةٌ: لِلْجِرَاحَةِ وَالعُيُونِ وَالأَمْرَاضِ العَقْلِيَّةِ. كَانَ فِيهَا صَيْدَلِيَّاتٌ وَمَكْتَبَاتٌ طِبِّيَّةٌ. دَرَّبَتِ الأَطِبَّاءَ الجُدُدَ وَمَنَحَتْهُمْ شَهَادَاتٍ. هَذَا النِّظَامُ سَبَقَ أُورُوبَّا بِقُرُونٍ.',
    translation: 'Muslims established the first modern hospitals. They called them bimaristans. They were free for everyone: rich and poor, Muslim and non-Muslim. They had specialized departments: for surgery, ophthalmology, and mental illnesses. They had pharmacies and medical libraries. They trained new doctors and granted them certificates. This system preceded Europe by centuries.',
    grammaticalConcepts: ['passive سَمَّوْهَا', 'لـ purpose', 'بـ difference'],
    vocabularyHighlights: [
      { word: 'بِيمَارِسْتَان', meaning: 'hospital (Persian origin)' },
      { word: 'مَجَّانِيَّة', meaning: 'free of charge' },
      { word: 'جِرَاحَة', meaning: 'surgery' },
      { word: 'صَيْدَلِيَّات', meaning: 'pharmacies' }
    ],
    moralLesson: 'Islamic civilization pioneered organized healthcare for all.',
    moralLessonAr: 'الحضارة الإسلامية ابتكرت الرعاية الصحية المنظمة للجميع.',
    wordCount: 58
  },
  {
    id: 'i205',
    title: 'Al-Zahrawi the Surgeon',
    titleAr: 'الزَّهْرَاوِيُّ الجَرَّاحُ',
    level: 'intermediate',
    category: 'medicine-healing',
    categoryAr: 'الطب والشفاء',
    text: 'أَبُو القَاسِمِ الزَّهْرَاوِيُّ طَبِيبٌ أَنْدَلُسِيٌّ عَاشَ فِي قُرْطُبَةَ. يُسَمَّى أَبَا الجِرَاحَةِ الحَدِيثَةِ. اخْتَرَعَ أَكْثَرَ مِنْ مِائَتَيْ أَدَاةٍ جِرَاحِيَّةٍ. أَلَّفَ كِتَابَ التَّصْرِيفِ لِمَنْ عَجَزَ عَنِ التَّأْلِيفِ. رَسَمَ فِيهِ أَدَوَاتِهِ وَشَرَحَ عَمَلِيَّاتِهِ بِالتَّفْصِيلِ. تُرْجِمَ كِتَابُهُ إِلَى اللَّاتِينِيَّةِ وَدُرِّسَ فِي جَامِعَاتِ أُورُوبَّا لِقُرُونٍ.',
    translation: 'Abu al-Qasim al-Zahrawi was an Andalusian physician who lived in Cordoba. He is called the father of modern surgery. He invented more than two hundred surgical instruments. He authored "Al-Tasrif" (The Method of Medicine). He drew his instruments in it and explained his operations in detail. His book was translated into Latin and taught in European universities for centuries.',
    grammaticalConcepts: ['passive يُسَمَّى/تُرْجِمَ', 'أكثر من + number', 'لِمَن relative'],
    vocabularyHighlights: [
      { word: 'أَدَاة جِرَاحِيَّة', meaning: 'surgical instrument' },
      { word: 'التَّصْرِيف', meaning: 'The Method (book title)' },
      { word: 'عَمَلِيَّات', meaning: 'operations/surgeries' },
      { word: 'اللَّاتِينِيَّة', meaning: 'Latin' }
    ],
    moralLesson: 'Muslim surgeons developed techniques and tools still influencing medicine today.',
    moralLessonAr: 'الجراحون المسلمون طوّروا تقنيات وأدوات لا تزال تؤثر في الطب.',
    wordCount: 62
  },
  {
    id: 'i206',
    title: 'The Ruqyah Healing',
    titleAr: 'الشِّفَاءُ بِالرُّقْيَةِ',
    level: 'intermediate',
    category: 'medicine-healing',
    categoryAr: 'الطب والشفاء',
    text: 'الرُّقْيَةُ الشَّرْعِيَّةُ عِلَاجٌ بِالقُرْآنِ وَالأَدْعِيَةِ النَّبَوِيَّةِ. كَانَ النَّبِيُّ يَرْقِي المَرْضَى بِالفَاتِحَةِ وَالمُعَوِّذَاتِ. الرُّقْيَةُ الصَّحِيحَةُ لَا تُنَافِي الطِّبَّ بَلْ تُكَمِّلُهُ. يَجِبُ أَنْ تَكُونَ بِكَلَامِ اللهِ لَا بِطَلَاسِمَ. وَأَنْ يَعْتَقِدَ المَرِيضُ أَنَّ الشِّفَاءَ مِنَ اللهِ وَحْدَهُ. قَالَ تَعَالَى: وَنُنَزِّلُ مِنَ القُرْآنِ مَا هُوَ شِفَاءٌ وَرَحْمَةٌ لِلْمُؤْمِنِينَ.',
    translation: 'Ruqyah is treatment with Quran and Prophetic supplications. The Prophet used to perform ruqyah on the sick with Al-Fatiha and the protective surahs. Correct ruqyah does not contradict medicine but complements it. It must be with Allah\'s words, not incantations. The patient must believe that healing is from Allah alone. Allah said: "We send down of the Quran that which is healing and mercy for the believers."',
    grammaticalConcepts: ['لا...بل', 'أنْ + subjunctive', 'ما الموصولة'],
    vocabularyHighlights: [
      { word: 'رُقْيَة', meaning: 'spiritual healing/recitation' },
      { word: 'المُعَوِّذَات', meaning: 'protective surahs' },
      { word: 'طَلَاسِم', meaning: 'incantations/amulets' },
      { word: 'تُكَمِّلُهُ', meaning: 'complements it' }
    ],
    moralLesson: 'Spiritual healing through Quran complements medical treatment.',
    moralLessonAr: 'العلاج الروحي بالقرآن يكمّل العلاج الطبي.',
    wordCount: 64
  },
  {
    id: 'i207',
    title: 'Prevention is Better',
    titleAr: 'الوِقَايَةُ خَيْرٌ مِنَ العِلَاجِ',
    level: 'intermediate',
    category: 'medicine-healing',
    categoryAr: 'الطب والشفاء',
    text: 'قَالَ الأَطِبَّاءُ المُسْلِمُونَ: دَرْهَمُ وِقَايَةٍ خَيْرٌ مِنْ قِنْطَارِ عِلَاجٍ. لِذَلِكَ أَكَّدُوا عَلَى النَّظَافَةِ وَالغِذَاءِ الصِّحِّيِّ وَالرِّيَاضَةِ. نَهَى النَّبِيُّ عَنِ الدُّخُولِ فِي أَرْضٍ فِيهَا وَبَاءٌ. وَأَمَرَ بِغَسْلِ اليَدَيْنِ قَبْلَ الأَكْلِ. هَذِهِ مَبَادِئُ الطِّبِّ الوِقَائِيِّ الَّتِي يُؤَكِّدُهَا العِلْمُ الحَدِيثُ.',
    translation: 'Muslim physicians said: A dirham of prevention is better than a quintal of treatment. Therefore they emphasized cleanliness, healthy food, and exercise. The Prophet prohibited entering land where there is plague. He commanded washing hands before eating. These are principles of preventive medicine that modern science confirms.',
    grammaticalConcepts: ['خَيْرٌ مِنْ comparison', 'الَّتِي relative', 'نَهَى عَنْ'],
    vocabularyHighlights: [
      { word: 'وِقَايَة', meaning: 'prevention' },
      { word: 'قِنْطَار', meaning: 'quintal (large weight)' },
      { word: 'وَبَاء', meaning: 'plague/epidemic' },
      { word: 'الطِّبّ الوِقَائِي', meaning: 'preventive medicine' }
    ],
    moralLesson: 'Islamic medicine emphasized prevention centuries before modern medicine.',
    moralLessonAr: 'الطب الإسلامي أكّد على الوقاية قبل الطب الحديث بقرون.',
    wordCount: 56
  },

  // ===== ADVANCED (a197-a202) =====
  {
    id: 'a197',
    title: 'The Canon of Medicine',
    titleAr: 'القَانُونُ فِي الطِّبِّ',
    level: 'advanced',
    category: 'medicine-healing',
    categoryAr: 'الطب والشفاء',
    text: 'كِتَابُ القَانُونِ لِابْنِ سِينَا مَوْسُوعَةٌ طِبِّيَّةٌ مِنْ خَمْسِ مُجَلَّدَاتٍ. المُجَلَّدُ الأَوَّلُ يَشْرَحُ الأُصُولَ النَّظَرِيَّةَ لِلطِّبِّ. الثَّانِي يَتَنَاوَلُ الأَدْوِيَةَ البَسِيطَةَ وَخَصَائِصَهَا. الثَّالِثُ يَخُصُّ أَمْرَاضَ كُلِّ عُضْوٍ مِنَ الرَّأْسِ إِلَى القَدَمِ. الرَّابِعُ عَنِ الأَمْرَاضِ العَامَّةِ كَالحُمَّى وَالأَوْرَامِ. الخَامِسُ عَنِ الأَدْوِيَةِ المُرَكَّبَةِ. ظَلَّ القَانُونُ مَرْجِعًا فِي جَامِعَاتِ أُورُوبَّا حَتَّى القَرْنِ الثَّامِنَ عَشَرَ.',
    translation: 'The Canon of Medicine by Ibn Sina is a medical encyclopedia of five volumes. The first volume explains the theoretical foundations of medicine. The second covers simple medicines and their properties. The third is specific to diseases of each organ from head to foot. The fourth is about general diseases like fever and tumors. The fifth is about compound medicines. The Canon remained a reference in European universities until the eighteenth century.',
    grammaticalConcepts: ['ordinal numbers', 'يَخُصُّ + accusative', 'ظَلَّ + predicate'],
    vocabularyHighlights: [
      { word: 'مَوْسُوعَة', meaning: 'encyclopedia' },
      { word: 'مُجَلَّدَات', meaning: 'volumes' },
      { word: 'خَصَائِص', meaning: 'properties/characteristics' },
      { word: 'مُرَكَّبَة', meaning: 'compound' }
    ],
    moralLesson: 'Ibn Sina\'s work represents the pinnacle of Islamic medical scholarship.',
    moralLessonAr: 'عمل ابن سينا يمثل قمة العلم الطبي الإسلامي.',
    wordCount: 78
  },
  {
    id: 'a198',
    title: 'The Ethics of the Physician',
    titleAr: 'أَخْلَاقُ الطَّبِيبِ',
    level: 'advanced',
    category: 'medicine-healing',
    categoryAr: 'الطب والشفاء',
    text: 'كَتَبَ إِسْحَاقُ بْنُ عَلِيٍّ الرُّهَاوِيُّ أَوَّلَ كِتَابٍ فِي أَخْلَاقِيَّاتِ الطِّبِّ. قَالَ: عَلَى الطَّبِيبِ أَنْ يَحْفَظَ أَسْرَارَ مَرْضَاهُ. وَأَنْ يُعَامِلَ الفَقِيرَ كَالغَنِيِّ. وَأَنْ لَا يَصِفَ دَوَاءً يَضُرُّ. وَأَنْ يَسْتَمِرَّ فِي التَّعَلُّمِ. وَأَنْ يَتَوَاضَعَ مَعَ زُمَلَائِهِ. وَأَنْ يَذْكُرَ أَنَّ الشِّفَاءَ بِيَدِ اللهِ. هَذِهِ المَبَادِئُ سَبَقَتِ القَسَمَ الطِّبِّيَّ الحَدِيثَ بِقُرُونٍ.',
    translation: 'Ishaq ibn Ali al-Ruhawi wrote the first book on medical ethics. He said: The physician must keep his patients\' secrets. He must treat the poor like the rich. He must not prescribe harmful medicine. He must continue learning. He must be humble with colleagues. He must remember that healing is in Allah\'s hand. These principles preceded the modern medical oath by centuries.',
    grammaticalConcepts: ['عَلَى + أنْ obligation', 'كـ comparison', 'أنْ لا + subjunctive'],
    vocabularyHighlights: [
      { word: 'أَخْلَاقِيَّات', meaning: 'ethics' },
      { word: 'أَسْرَار', meaning: 'secrets' },
      { word: 'يَصِفَ', meaning: 'prescribes' },
      { word: 'القَسَم الطِّبِّي', meaning: 'medical oath' }
    ],
    moralLesson: 'Islamic medical ethics established professional standards still relevant today.',
    moralLessonAr: 'أخلاقيات الطب الإسلامية وضعت معايير مهنية لا تزال صالحة.',
    wordCount: 72
  },
  {
    id: 'a199',
    title: 'The Discovery of Blood Circulation',
    titleAr: 'اكْتِشَافُ الدَّوْرَةِ الدَّمَوِيَّةِ',
    level: 'advanced',
    category: 'medicine-healing',
    categoryAr: 'الطب والشفاء',
    text: 'قَبْلَ وِيلْيَامْ هَارْفِي بِثَلَاثِمِائَةِ سَنَةٍ، وَصَفَ ابْنُ النَّفِيسِ الدَّوْرَةَ الدَّمَوِيَّةَ الصُّغْرَى. شَرَحَ كَيْفَ يَنْتَقِلُ الدَّمُ مِنَ القَلْبِ إِلَى الرِّئَتَيْنِ ثُمَّ يَعُودُ إِلَى القَلْبِ. رَفَضَ نَظَرِيَّةَ جَالِينُوسَ الخَاطِئَةَ. كَتَبَ فِي شَرْحِهِ لِكِتَابِ القَانُونِ: الدَّمُ يَتَنَقَّى فِي الرِّئَةِ وَيَأْخُذُ الهَوَاءَ. هَذَا الاكْتِشَافُ الثَّوْرِيُّ ظَلَّ مَجْهُولًا فِي أُورُوبَّا لِقُرُونٍ.',
    translation: 'Three hundred years before William Harvey, Ibn al-Nafis described the pulmonary circulation. He explained how blood travels from the heart to the lungs then returns to the heart. He rejected Galen\'s incorrect theory. He wrote in his commentary on the Canon: Blood is purified in the lung and takes in air. This revolutionary discovery remained unknown in Europe for centuries.',
    grammaticalConcepts: ['قَبْلَ بـ temporal', 'كَيْفَ indirect question', 'ظَلَّ + predicate'],
    vocabularyHighlights: [
      { word: 'الدَّوْرَة الدَّمَوِيَّة', meaning: 'blood circulation' },
      { word: 'الرِّئَتَيْن', meaning: 'the two lungs' },
      { word: 'يَتَنَقَّى', meaning: 'is purified' },
      { word: 'ثَوْرِي', meaning: 'revolutionary' }
    ],
    moralLesson: 'Muslim scientists made fundamental discoveries often credited to later Europeans.',
    moralLessonAr: 'العلماء المسلمون حققوا اكتشافات أساسية غالبًا تُنسب لأوروبيين لاحقين.',
    wordCount: 75
  },
  {
    id: 'a200',
    title: 'Quarantine in Islamic Law',
    titleAr: 'الحَجْرُ الصِّحِّيُّ فِي الشَّرِيعَةِ',
    level: 'advanced',
    category: 'medicine-healing',
    categoryAr: 'الطب والشفاء',
    text: 'أَسَّسَ النَّبِيُّ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ مَبْدَأَ الحَجْرِ الصِّحِّيِّ. قَالَ: إِذَا سَمِعْتُمْ بِالطَّاعُونِ بِأَرْضٍ فَلَا تَدْخُلُوهَا، وَإِذَا وَقَعَ بِأَرْضٍ وَأَنْتُمْ بِهَا فَلَا تَخْرُجُوا مِنْهَا. هَذَا الحَدِيثُ يُؤَسِّسُ لِمَنْعِ انْتِشَارِ الأَوْبِئَةِ. طَبَّقَهُ عُمَرُ بْنُ الخَطَّابِ حِينَ رَجَعَ مِنَ الشَّامِ بِسَبَبِ طَاعُونِ عَمْوَاسَ. الطِّبُّ الحَدِيثُ يُؤَكِّدُ هَذِهِ الإِجْرَاءَاتِ الوِقَائِيَّةَ.',
    translation: 'The Prophet, peace be upon him, established the principle of quarantine. He said: "If you hear of plague in a land, do not enter it. And if it occurs in a land while you are in it, do not leave it." This hadith establishes preventing the spread of epidemics. Umar ibn al-Khattab applied it when he returned from Sham due to the Amwas plague. Modern medicine confirms these preventive measures.',
    grammaticalConcepts: ['إذا conditional', 'لا + jussive prohibition', 'لِـ purpose'],
    vocabularyHighlights: [
      { word: 'الحَجْر الصِّحِّي', meaning: 'quarantine' },
      { word: 'الطَّاعُون', meaning: 'plague' },
      { word: 'انْتِشَار', meaning: 'spread' },
      { word: 'إِجْرَاءَات', meaning: 'measures/procedures' }
    ],
    moralLesson: 'Islamic teachings on quarantine preceded modern epidemiology by 1400 years.',
    moralLessonAr: 'تعاليم الإسلام عن الحجر الصحي سبقت علم الأوبئة الحديث بـ1400 سنة.',
    wordCount: 76
  },
  {
    id: 'a201',
    title: 'Psychology in Islamic Medicine',
    titleAr: 'عِلْمُ النَّفْسِ فِي الطِّبِّ الإِسْلَامِيِّ',
    level: 'advanced',
    category: 'medicine-healing',
    categoryAr: 'الطب والشفاء',
    text: 'اهْتَمَّ الأَطِبَّاءُ المُسْلِمُونَ بِالصِّحَّةِ النَّفْسِيَّةِ. خَصَّصُوا فِي البِيمَارِسْتَانَاتِ أَقْسَامًا لِلْأَمْرَاضِ العَقْلِيَّةِ. عَالَجُوا المَرْضَى بِالمُوسِيقَى وَالمَاءِ الجَارِي وَالحَدَائِقِ. كَتَبَ الرَّازِيُّ عَنِ الطِّبِّ الرُّوحَانِيِّ. وَتَحَدَّثَ ابْنُ سِينَا عَنِ العَلَاقَةِ بَيْنَ الجِسْمِ وَالنَّفْسِ. أَكَّدُوا أَنَّ الأَمْرَاضَ النَّفْسِيَّةَ لَيْسَتْ عَيْبًا بَلْ حَالَةٌ تَحْتَاجُ عِلَاجًا كَسَائِرِ الأَمْرَاضِ.',
    translation: 'Muslim physicians cared about mental health. They dedicated sections in hospitals for mental illnesses. They treated patients with music, flowing water, and gardens. Al-Razi wrote about spiritual medicine. Ibn Sina discussed the relationship between body and soul. They confirmed that mental illnesses are not a shame but a condition needing treatment like other diseases.',
    grammaticalConcepts: ['خَصَّصُوا لِـ', 'لَيْسَتْ...بَلْ', 'كـ comparison'],
    vocabularyHighlights: [
      { word: 'الصِّحَّة النَّفْسِيَّة', meaning: 'mental health' },
      { word: 'الأَمْرَاض العَقْلِيَّة', meaning: 'mental illnesses' },
      { word: 'الطِّبّ الرُّوحَانِي', meaning: 'spiritual medicine' },
      { word: 'عَيْب', meaning: 'shame/defect' }
    ],
    moralLesson: 'Islamic medicine treated mental health with compassion and scientific methods.',
    moralLessonAr: 'الطب الإسلامي عالج الصحة النفسية بالرحمة والأساليب العلمية.',
    wordCount: 70
  },
  {
    id: 'a202',
    title: 'The Patient\'s Trust',
    titleAr: 'ثِقَةُ المَرِيضِ',
    level: 'advanced',
    category: 'medicine-healing',
    categoryAr: 'الطب والشفاء',
    text: 'كَتَبَ الأَطِبَّاءُ المُسْلِمُونَ عَنْ أَهَمِّيَّةِ ثِقَةِ المَرِيضِ. قَالَ الرَّازِيُّ: إِذَا أَيِسَ المَرِيضُ مِنَ الشِّفَاءِ ضَعُفَ جِسْمُهُ وَتَأَخَّرَ بُرْؤُهُ. وَإِذَا كَانَ وَاثِقًا مُتَفَائِلًا قَوِيَتْ مَنَاعَتُهُ وَتَسَارَعَ شِفَاؤُهُ. الطَّبِيبُ الحَكِيمُ يَبْنِي الأَمَلَ فِي نَفْسِ المَرِيضِ. يُخْبِرُهُ بِالحَقِيقَةِ بِأُسْلُوبٍ لَا يُيَئِّسُهُ. العِلَاجُ يَجْمَعُ بَيْنَ الدَّوَاءِ وَالكَلِمَةِ الطَّيِّبَةِ.',
    translation: 'Muslim physicians wrote about the importance of patient\'s trust. Al-Razi said: If the patient despairs of healing, his body weakens and his recovery is delayed. If he is confident and optimistic, his immunity strengthens and his healing accelerates. The wise physician builds hope in the patient\'s soul. He tells him the truth in a way that does not despair him. Treatment combines medicine and good words.',
    grammaticalConcepts: ['إذا conditional', 'ضَعُفَ/قَوِيَت', 'بـ manner'],
    vocabularyHighlights: [
      { word: 'أَيِسَ', meaning: 'despaired' },
      { word: 'بُرْء', meaning: 'recovery/healing' },
      { word: 'مَنَاعَة', meaning: 'immunity' },
      { word: 'يُيَئِّسُهُ', meaning: 'despairs him' }
    ],
    moralLesson: 'Muslim doctors understood the psychological dimension of healing.',
    moralLessonAr: 'الأطباء المسلمون فهموا البُعد النفسي للشفاء.',
    wordCount: 74
  }
];
