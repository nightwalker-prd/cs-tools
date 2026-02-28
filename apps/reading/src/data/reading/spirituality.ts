// src/data/reading/spirituality.ts

import { ReadingText } from './types';

/**
 * Islamic Spirituality reading texts
 * Topics: dhikr, tawakkul, purification of the heart, stations of the soul, divine love
 * 18 texts: 6 beginner, 6 intermediate, 6 advanced
 */
export const spiritualityTexts: ReadingText[] = [
  // ===== BEGINNER (b151-b156) =====
  {
    id: 'b151',
    title: 'Remembrance of Allah',
    titleAr: 'الذِّكْرُ',
    level: 'beginner',
    category: 'islamic-spirituality',
    categoryAr: 'الروحانية الإسلامية',
    text: 'الذِّكْرُ حَياةُ القُلوبِ وَنورُ الصُّدورِ. مَنْ ذَكَرَ اللهَ في السَّرّاءِ ذَكَرَهُ اللهُ في الضَّرّاءِ. اللِّسانُ الرَّطْبُ بِذِكْرِ اللهِ يَجِدُ السَّكينَةَ وَالطُّمَأْنينَةَ. قالَ تَعالى: أَلا بِذِكْرِ اللهِ تَطْمَئِنُّ القُلوبُ. فَالذّاكِرُ في غَفْلَةِ النّاسِ كَالحَيِّ بَيْنَ الأَمْواتِ.',
    translation: 'Remembrance is the life of hearts and light of chests. Whoever remembers Allah in ease, Allah remembers him in hardship. The tongue moist with Allah\'s remembrance finds tranquility and peace. Allah said: "Verily, in the remembrance of Allah do hearts find rest." The one who remembers among heedless people is like the living among the dead.',
    grammaticalConcepts: ['إضافة', 'جملة شرطية', 'اسم فاعل'],
    vocabularyHighlights: [
      { word: 'الذِّكْر', meaning: 'remembrance' },
      { word: 'السَّكينَة', meaning: 'tranquility' },
      { word: 'الطُّمَأْنينَة', meaning: 'peace of heart' }
    ],
    moralLesson: 'Constant remembrance of Allah brings inner peace.',
    moralLessonAr: 'ذكر الله المستمر يجلب السكينة الداخلية.',
    wordCount: 42
  },
  {
    id: 'b152',
    title: 'Trust in Allah',
    titleAr: 'التَّوَكُّلُ',
    level: 'beginner',
    category: 'islamic-spirituality',
    categoryAr: 'الروحانية الإسلامية',
    text: 'التَّوَكُّلُ عَلى اللهِ مِنْ أَعْظَمِ العِباداتِ. المُتَوَكِّلُ يَأْخُذُ بِالأَسْبابِ ثُمَّ يُفَوِّضُ الأَمْرَ إِلى اللهِ. قالَ النَّبِيُّ: لَوْ تَوَكَّلْتُمْ عَلى اللهِ حَقَّ تَوَكُّلِهِ لَرَزَقَكُمْ كَما يَرْزُقُ الطَّيْرَ. فَالطَّيْرُ تَغْدو خِماصًا وَتَروحُ بِطانًا.',
    translation: 'Trust in Allah is among the greatest acts of worship. The one who trusts takes the means then delegates the matter to Allah. The Prophet said: "If you trusted in Allah with true trust, He would provide for you as He provides for the birds." The birds go out hungry in the morning and return full in the evening.',
    grammaticalConcepts: ['مصدر', 'اسم فاعل', 'جملة شرطية'],
    vocabularyHighlights: [
      { word: 'التَّوَكُّل', meaning: 'trust, reliance' },
      { word: 'يُفَوِّض', meaning: 'delegates' },
      { word: 'خِماصًا', meaning: 'hungry (empty-bellied)' }
    ],
    moralLesson: 'True trust combines effort with reliance on Allah.',
    moralLessonAr: 'التوكل الحقيقي يجمع بين العمل والاعتماد على الله.',
    wordCount: 40
  },
  {
    id: 'b153',
    title: 'Gratitude to the Creator',
    titleAr: 'شُكْرُ الخالِقِ',
    level: 'beginner',
    category: 'islamic-spirituality',
    categoryAr: 'الروحانية الإسلامية',
    text: 'الشُّكْرُ عِبادَةٌ عَظيمَةٌ وَسَبَبٌ لِلْمَزيدِ. قالَ تَعالى: لَئِنْ شَكَرْتُمْ لَأَزيدَنَّكُمْ. الشُّكْرُ يَكونُ بِالقَلْبِ وَاللِّسانِ وَالجَوارِحِ. شُكْرُ القَلْبِ الاعْتِرافُ بِالنِّعْمَةِ، وَشُكْرُ اللِّسانِ الحَمْدُ وَالثَّناءُ، وَشُكْرُ الجَوارِحِ العَمَلُ الصّالِحُ.',
    translation: 'Gratitude is a great worship and a cause for increase. Allah said: "If you are grateful, I will surely increase you." Gratitude is through the heart, tongue, and limbs. Gratitude of the heart is acknowledging the blessing, gratitude of the tongue is praise and thanks, and gratitude of the limbs is righteous action.',
    grammaticalConcepts: ['خبر مقدم ومبتدأ مؤخر', 'جملة شرطية', 'عطف'],
    vocabularyHighlights: [
      { word: 'الشُّكْر', meaning: 'gratitude' },
      { word: 'النِّعْمَة', meaning: 'blessing' },
      { word: 'الجَوارِح', meaning: 'limbs' }
    ],
    moralLesson: 'True gratitude encompasses heart, tongue, and action.',
    moralLessonAr: 'الشكر الحقيقي يشمل القلب واللسان والعمل.',
    wordCount: 43
  },
  {
    id: 'b154',
    title: 'Patience in Trials',
    titleAr: 'الصَّبْرُ عَلى البَلاءِ',
    level: 'beginner',
    category: 'islamic-spirituality',
    categoryAr: 'الروحانية الإسلامية',
    text: 'الصَّبْرُ نِصْفُ الإيمانِ وَمِفْتاحُ الفَرَجِ. المُؤْمِنُ يَصْبِرُ عِنْدَ البَلاءِ وَيَحْتَسِبُ الأَجْرَ عِنْدَ اللهِ. قالَ تَعالى: إِنَّما يُوَفّى الصّابِرونَ أَجْرَهُمْ بِغَيْرِ حِسابٍ. فَالصَّبْرُ ضِياءٌ يُنيرُ الطَّريقَ في ظُلُماتِ المِحَنِ.',
    translation: 'Patience is half of faith and the key to relief. The believer is patient during trials and seeks reward from Allah. Allah said: "Indeed, the patient will be given their reward without account." Patience is a light that illuminates the path in the darkness of tribulations.',
    grammaticalConcepts: ['خبر مقدم', 'جملة حالية', 'استعارة'],
    vocabularyHighlights: [
      { word: 'الصَّبْر', meaning: 'patience' },
      { word: 'البَلاء', meaning: 'trial, tribulation' },
      { word: 'الفَرَج', meaning: 'relief' }
    ],
    moralLesson: 'Patience during hardship leads to immense reward.',
    moralLessonAr: 'الصبر على الشدائد يؤدي إلى الأجر العظيم.',
    wordCount: 38
  },
  {
    id: 'b155',
    title: 'Good Opinion of Allah',
    titleAr: 'حُسْنُ الظَّنِّ بِاللهِ',
    level: 'beginner',
    category: 'islamic-spirituality',
    categoryAr: 'الروحانية الإسلامية',
    text: 'حُسْنُ الظَّنِّ بِاللهِ مِنْ أَعْمالِ القُلوبِ العَظيمَةِ. قالَ اللهُ في الحَديثِ القُدْسِيِّ: أَنا عِنْدَ ظَنِّ عَبْدي بي. فَمَنْ ظَنَّ خَيْرًا وَجَدَ خَيْرًا. المُؤْمِنُ يَرى في كُلِّ بَلاءٍ حِكْمَةً، وَفي كُلِّ ضيقٍ فَرَجًا قَريبًا.',
    translation: 'Good opinion of Allah is among the great deeds of the heart. Allah said in the sacred hadith: "I am as My servant thinks of Me." Whoever thinks good finds good. The believer sees in every trial wisdom, and in every hardship near relief.',
    grammaticalConcepts: ['إضافة متعددة', 'جملة شرطية', 'مفعول به'],
    vocabularyHighlights: [
      { word: 'حُسْن الظَّنّ', meaning: 'good opinion' },
      { word: 'الحَديث القُدْسِيّ', meaning: 'sacred hadith' },
      { word: 'حِكْمَة', meaning: 'wisdom' }
    ],
    moralLesson: 'Positive expectation of Allah brings positive outcomes.',
    moralLessonAr: 'حسن الظن بالله يجلب النتائج الحسنة.',
    wordCount: 39
  },
  {
    id: 'b156',
    title: 'The Sound Heart',
    titleAr: 'القَلْبُ السَّليمُ',
    level: 'beginner',
    category: 'islamic-spirituality',
    categoryAr: 'الروحانية الإسلامية',
    text: 'القَلْبُ السَّليمُ هُوَ القَلْبُ الخالي مِنَ الشِّرْكِ وَالحِقْدِ وَالحَسَدِ. يَوْمَ القِيامَةِ لا يَنْفَعُ مالٌ وَلا بَنونَ إِلّا مَنْ أَتى اللهَ بِقَلْبٍ سَليمٍ. صاحِبُ القَلْبِ السَّليمِ يُحِبُّ الخَيْرَ لِلنّاسِ وَيَفْرَحُ بِفَرَحِهِمْ وَيَحْزَنُ لِحُزْنِهِمْ.',
    translation: 'The sound heart is the heart free from polytheism, grudges, and envy. On the Day of Judgment, neither wealth nor children will benefit except one who comes to Allah with a sound heart. The owner of a sound heart loves good for people, rejoices in their joy, and grieves in their grief.',
    grammaticalConcepts: ['صفة', 'استثناء', 'عطف'],
    vocabularyHighlights: [
      { word: 'السَّليم', meaning: 'sound, healthy' },
      { word: 'الحِقْد', meaning: 'grudge, malice' },
      { word: 'الحَسَد', meaning: 'envy' }
    ],
    moralLesson: 'A pure heart free from spiritual diseases is the greatest treasure.',
    moralLessonAr: 'القلب النقي الخالي من الأمراض الروحية هو أعظم كنز.',
    wordCount: 41
  },

  // ===== INTERMEDIATE (i142-i147) =====
  {
    id: 'i142',
    title: 'Purification of the Soul',
    titleAr: 'تَزْكِيَةُ النَّفْسِ',
    level: 'intermediate',
    category: 'islamic-spirituality',
    categoryAr: 'الروحانية الإسلامية',
    text: 'تَزْكِيَةُ النَّفْسِ فَريضَةٌ رَبّانِيَّةٌ وَسَبيلٌ إِلى الفَلاحِ. قالَ تَعالى: قَدْ أَفْلَحَ مَنْ زَكّاها وَقَدْ خابَ مَنْ دَسّاها. التَّزْكِيَةُ تَكونُ بِمُجاهَدَةِ النَّفْسِ وَمُحاسَبَتِها، وَبِتَطْهيرِها مِنَ الرَّذائِلِ وَتَحْليَتِها بِالفَضائِلِ. وَالنَّفْسُ كَالأَرْضِ إِنْ لَمْ تُزْرَعْ بِالخَيْرِ نَبَتَ فيها الشَّرُّ. فَمَنْ أَهْمَلَ نَفْسَهُ أَوْبَقَتْهُ، وَمَنْ جاهَدَها أَنْجَتْهُ.',
    translation: 'Purification of the soul is a divine obligation and a path to success. Allah said: "Successful is one who purifies it, and failed is one who corrupts it." Purification is through struggling with the self and holding it accountable, cleansing it from vices and adorning it with virtues. The soul is like land—if not planted with good, evil grows in it. Whoever neglects his soul, it destroys him; whoever struggles with it, it saves him.',
    grammaticalConcepts: ['مصدر', 'جملة شرطية', 'تشبيه'],
    vocabularyHighlights: [
      { word: 'تَزْكِيَة', meaning: 'purification' },
      { word: 'مُجاهَدَة', meaning: 'struggling, striving' },
      { word: 'الرَّذائِل', meaning: 'vices' },
      { word: 'الفَضائِل', meaning: 'virtues' }
    ],
    moralLesson: 'The soul requires constant cultivation and purification.',
    moralLessonAr: 'النفس تحتاج إلى التهذيب والتزكية المستمرة.',
    wordCount: 58
  },
  {
    id: 'i143',
    title: 'Awareness of Allah\'s Watchfulness',
    titleAr: 'المُراقَبَةُ',
    level: 'intermediate',
    category: 'islamic-spirituality',
    categoryAr: 'الروحانية الإسلامية',
    text: 'المُراقَبَةُ أَنْ تَعْبُدَ اللهَ كَأَنَّكَ تَراهُ، فَإِنْ لَمْ تَكُنْ تَراهُ فَإِنَّهُ يَراكَ. هَذا هُوَ الإِحْسانُ الَّذي جاءَ في حَديثِ جِبْريلَ. المُراقِبُ لِلّهِ لا يَعْصيهِ في خَلْوَةٍ وَلا جَلْوَةٍ، وَلا يَسْتَحْيي مِنَ النّاسِ أَكْثَرَ مِمّا يَسْتَحْيي مِنَ اللهِ. وَمَنْ راقَبَ اللهَ في سِرِّهِ حَفِظَهُ اللهُ في عَلانِيَتِهِ، وَأَصْلَحَ لَهُ ظاهِرَهُ وَباطِنَهُ.',
    translation: 'Watchfulness is to worship Allah as if you see Him, and if you cannot see Him, know that He sees you. This is the excellence mentioned in the hadith of Gabriel. One who is watchful of Allah does not disobey Him in private or public, and does not feel more shame before people than before Allah. Whoever watches Allah in secret, Allah protects him openly, and rectifies his outer and inner states.',
    grammaticalConcepts: ['جملة شرطية', 'مقابلة', 'اسم فاعل'],
    vocabularyHighlights: [
      { word: 'المُراقَبَة', meaning: 'watchfulness, vigilance' },
      { word: 'الإِحْسان', meaning: 'excellence in worship' },
      { word: 'خَلْوَة', meaning: 'privacy, seclusion' },
      { word: 'جَلْوَة', meaning: 'public gathering' }
    ],
    moralLesson: 'True faith means behaving the same in private as in public.',
    moralLessonAr: 'الإيمان الحقيقي يعني التصرف بنفس الطريقة في السر والعلن.',
    wordCount: 62
  },
  {
    id: 'i144',
    title: 'Sincerity in Worship',
    titleAr: 'الإِخْلاصُ',
    level: 'intermediate',
    category: 'islamic-spirituality',
    categoryAr: 'الروحانية الإسلامية',
    text: 'الإِخْلاصُ رُوحُ الأَعْمالِ وَسِرُّ قَبولِها. العَمَلُ بِلا إِخْلاصٍ كَالجَسَدِ بِلا رُوحٍ. قالَ النَّبِيُّ: إِنَّمَا الأَعْمالُ بِالنِّيّاتِ. المُخْلِصُ لا يَطْلُبُ بِعِبادَتِهِ جَزاءً مِنَ النّاسِ وَلا شُكْرًا، بَلْ يَبْتَغي وَجْهَ اللهِ وَرِضاهُ فَقَطْ. وَالرِّياءُ آفَةُ الإِخْلاصِ، وَهُوَ الشِّرْكُ الخَفِيُّ الَّذي يُحْبِطُ الأَعْمالَ وَيُضيعُ الأَجْرَ.',
    translation: 'Sincerity is the soul of deeds and the secret of their acceptance. A deed without sincerity is like a body without a soul. The Prophet said: "Actions are judged by intentions." The sincere one does not seek reward or thanks from people through his worship, but seeks only Allah\'s countenance and pleasure. Showing off is the blight of sincerity—it is the hidden polytheism that nullifies deeds and wastes reward.',
    grammaticalConcepts: ['تشبيه', 'حصر', 'اسم فاعل'],
    vocabularyHighlights: [
      { word: 'الإِخْلاص', meaning: 'sincerity' },
      { word: 'النِّيّات', meaning: 'intentions' },
      { word: 'الرِّياء', meaning: 'showing off' },
      { word: 'يُحْبِط', meaning: 'nullifies' }
    ],
    moralLesson: 'Sincerity is the foundation that validates all worship.',
    moralLessonAr: 'الإخلاص هو الأساس الذي يصحح جميع العبادات.',
    wordCount: 56
  },
  {
    id: 'i145',
    title: 'Renunciation of Worldliness',
    titleAr: 'الزُّهْدُ في الدُّنْيا',
    level: 'intermediate',
    category: 'islamic-spirituality',
    categoryAr: 'الروحانية الإسلامية',
    text: 'الزُّهْدُ لَيْسَ تَحْريمَ الحَلالِ وَلا تَرْكَ المالِ، بَلْ هُوَ أَلّا يَمْلِكَ المالُ قَلْبَكَ. الزّاهِدُ يَسْتَعْمِلُ الدُّنْيا وَلا تَسْتَعْمِلُهُ، يَمْلِكُها وَلا تَمْلِكُهُ. قالَ عَلِيٌّ رَضِيَ اللهُ عَنْهُ: الزُّهْدُ في الدُّنْيا قِصَرُ الأَمَلِ. فَالعاقِلُ يَعْمَلُ لِدُنْياهُ كَأَنَّهُ يَعيشُ أَبَدًا، وَيَعْمَلُ لِآخِرَتِهِ كَأَنَّهُ يَموتُ غَدًا.',
    translation: 'Renunciation is not forbidding the lawful nor abandoning wealth, but rather that wealth does not possess your heart. The renunciant uses the world and is not used by it; he possesses it and is not possessed by it. Ali, may Allah be pleased with him, said: "Renunciation in the world is shortening hope." The wise one works for his world as if he lives forever, and works for his afterlife as if he dies tomorrow.',
    grammaticalConcepts: ['نفي وإثبات', 'مقابلة', 'تشبيه'],
    vocabularyHighlights: [
      { word: 'الزُّهْد', meaning: 'renunciation, asceticism' },
      { word: 'قِصَر الأَمَل', meaning: 'shortening hope' },
      { word: 'الآخِرَة', meaning: 'the afterlife' }
    ],
    moralLesson: 'True renunciation is freedom of the heart from attachment to worldly things.',
    moralLessonAr: 'الزهد الحقيقي هو تحرر القلب من التعلق بالدنيا.',
    wordCount: 59
  },
  {
    id: 'i146',
    title: 'Humility in Prayer',
    titleAr: 'الخُشوعُ في الصَّلاةِ',
    level: 'intermediate',
    category: 'islamic-spirituality',
    categoryAr: 'الروحانية الإسلامية',
    text: 'الخُشوعُ رُوحُ الصَّلاةِ وَلُبُّها. صَلاةٌ بِلا خُشوعٍ كَجَسَدٍ بِلا رُوحٍ. الخاشِعُ يُقْبِلُ عَلى صَلاتِهِ بِقَلْبِهِ وَقالَبِهِ، يَسْتَشْعِرُ عَظَمَةَ مَنْ يُناجيهِ. قالَ الحَسَنُ البَصْرِيُّ: كُلُّ صَلاةٍ لا يَحْضُرُ فيها القَلْبُ فَهِيَ إِلى العُقوبَةِ أَسْرَعُ. فَاجْعَلْ صَلاتَكَ آخِرَ صَلاتِكَ، وَوَدِّعْ فيها الدُّنْيا وَمَنْ فيها.',
    translation: 'Humility is the soul and essence of prayer. Prayer without humility is like a body without a soul. The humble one approaches his prayer with heart and body, sensing the greatness of the One he converses with. Al-Hasan al-Basri said: "Every prayer in which the heart is not present hastens toward punishment." So make your prayer as if it were your last prayer, and bid farewell in it to the world and all in it.',
    grammaticalConcepts: ['تشبيه', 'اسم فاعل', 'أمر'],
    vocabularyHighlights: [
      { word: 'الخُشوع', meaning: 'humility, reverence' },
      { word: 'لُبّ', meaning: 'essence, core' },
      { word: 'يُناجي', meaning: 'converses intimately' }
    ],
    moralLesson: 'The value of prayer lies in the presence of the heart.',
    moralLessonAr: 'قيمة الصلاة تكمن في حضور القلب.',
    wordCount: 57
  },
  {
    id: 'i147',
    title: 'Sincere Repentance',
    titleAr: 'التَّوْبَةُ النَّصوحُ',
    level: 'intermediate',
    category: 'islamic-spirituality',
    categoryAr: 'الروحانية الإسلامية',
    text: 'التَّوْبَةُ النَّصوحُ هِيَ التَّوْبَةُ الصّادِقَةُ الخالِصَةُ. شُروطُها أَرْبَعَةٌ: الإِقْلاعُ عَنِ الذَّنْبِ، وَالنَّدَمُ عَلى ما فاتَ، وَالعَزْمُ عَلى عَدَمِ العَوْدَةِ، وَرَدُّ الحُقوقِ إِلى أَهْلِها. وَبابُ التَّوْبَةِ مَفْتوحٌ ما لَمْ تَطْلُعِ الشَّمْسُ مِنْ مَغْرِبِها. قالَ اللهُ تَعالى: إِنَّ اللهَ يُحِبُّ التَّوّابينَ وَيُحِبُّ المُتَطَهِّرينَ.',
    translation: 'Sincere repentance is truthful and pure repentance. Its conditions are four: ceasing the sin, remorse for what passed, determination not to return, and returning rights to their owners. The door of repentance is open as long as the sun has not risen from the west. Allah said: "Indeed, Allah loves those who repent and loves those who purify themselves."',
    grammaticalConcepts: ['صفة', 'عدد', 'جملة شرطية'],
    vocabularyHighlights: [
      { word: 'النَّصوح', meaning: 'sincere, pure' },
      { word: 'الإِقْلاع', meaning: 'ceasing, stopping' },
      { word: 'النَّدَم', meaning: 'remorse, regret' },
      { word: 'العَزْم', meaning: 'determination' }
    ],
    moralLesson: 'True repentance requires both feeling and action.',
    moralLessonAr: 'التوبة الحقيقية تتطلب الشعور والعمل معًا.',
    wordCount: 55
  },

  // ===== ADVANCED (a137-a142) =====
  {
    id: 'a137',
    title: 'Stations of the Wayfarers',
    titleAr: 'مَقاماتُ السّالِكينَ',
    level: 'advanced',
    category: 'islamic-spirituality',
    categoryAr: 'الروحانية الإسلامية',
    text: 'المَقاماتُ مَنازِلُ السّالِكينَ في طَريقِهِمْ إِلى اللهِ. قَسَّمَها العُلَماءُ إِلى مَراتِبَ مُتَدَرِّجَةٍ: التَّوْبَةُ بابُ الدُّخولِ، ثُمَّ الوَرَعُ وَالزُّهْدُ، ثُمَّ الصَّبْرُ وَالشُّكْرُ، ثُمَّ الخَوْفُ وَالرَّجاءُ، ثُمَّ التَّوَكُّلُ وَالرِّضا، وَأَعْلاها المَحَبَّةُ وَالشَّوْقُ. لا يَنْتَقِلُ السّالِكُ مِنْ مَقامٍ إِلى مَقامٍ حَتّى يَسْتَكْمِلَ أَحْكامَ المَقامِ الأَوَّلِ. وَلِكُلِّ مَقامٍ عِلْمٌ وَعَمَلٌ وَحالٌ، فَالعِلْمُ أَساسُهُ، وَالعَمَلُ طَريقُهُ، وَالحالُ ثَمَرَتُهُ.',
    translation: 'The stations are the wayfarers\' dwelling places on their path to Allah. Scholars divided them into gradual ranks: repentance is the door of entry, then scrupulousness and renunciation, then patience and gratitude, then fear and hope, then trust and contentment, and the highest are love and longing. The wayfarer does not move from one station to another until completing the rulings of the first. Each station has knowledge, action, and state: knowledge is its foundation, action is its path, and state is its fruit.',
    grammaticalConcepts: ['إضافة', 'ترتيب', 'حصر'],
    vocabularyHighlights: [
      { word: 'المَقامات', meaning: 'stations, stages' },
      { word: 'السّالِكين', meaning: 'wayfarers, spiritual travelers' },
      { word: 'الوَرَع', meaning: 'scrupulousness' },
      { word: 'الرِّضا', meaning: 'contentment' }
    ],
    moralLesson: 'The spiritual journey progresses through defined stages of development.',
    moralLessonAr: 'الرحلة الروحية تتقدم عبر مراحل محددة من التطور.',
    wordCount: 72
  },
  {
    id: 'a138',
    title: 'States of the Hearts',
    titleAr: 'أَحْوالُ القُلوبِ',
    level: 'advanced',
    category: 'islamic-spirituality',
    categoryAr: 'الروحانية الإسلامية',
    text: 'الأَحْوالُ مَواهِبُ رَبّانِيَّةٌ تَرِدُ عَلى القَلْبِ بِلا اكْتِسابٍ وَلا اسْتِحْقاقٍ. هِيَ كَالبَرْقِ تَلْمَعُ ثُمَّ تَغيبُ، فَإِنْ دامَتْ صارَتْ مَقامًا. مِنَ الأَحْوالِ: القَبْضُ وَالبَسْطُ، وَالهَيْبَةُ وَالأُنْسُ، وَالفَناءُ وَالبَقاءُ. القَبْضُ ضيقُ القَلْبِ، وَالبَسْطُ انْشِراحُهُ. وَالهَيْبَةُ خَوْفٌ مُقْتَرِنٌ بِالتَّعْظيمِ، وَالأُنْسُ سُرورٌ مُقْتَرِنٌ بِالمَحَبَّةِ. لا يَمْلِكُ العَبْدُ جَلْبَ الحالِ وَلا دَفْعَهُ، وَإِنَّما يُهَيِّئُ نَفْسَهُ بِالعَمَلِ الصّالِحِ لِتَقَبُّلِ هَذِهِ المَواهِبِ.',
    translation: 'States are divine gifts that descend upon the heart without acquisition or entitlement. They are like lightning that flashes then disappears; if they persist, they become stations. Among the states: contraction and expansion, awe and intimacy, annihilation and subsistence. Contraction is the heart\'s constriction, and expansion is its opening. Awe is fear combined with veneration, and intimacy is joy combined with love. The servant cannot attract or repel a state, but can only prepare himself through righteous deeds to receive these gifts.',
    grammaticalConcepts: ['تشبيه', 'مقابلة', 'حصر'],
    vocabularyHighlights: [
      { word: 'الأَحْوال', meaning: 'states' },
      { word: 'القَبْض', meaning: 'contraction' },
      { word: 'البَسْط', meaning: 'expansion' },
      { word: 'الهَيْبَة', meaning: 'awe, reverence' },
      { word: 'الأُنْس', meaning: 'intimacy' }
    ],
    moralLesson: 'Spiritual states are gifts that cannot be forced, only prepared for.',
    moralLessonAr: 'الأحوال الروحية هبات لا يمكن فرضها، بل الاستعداد لها فقط.',
    wordCount: 75
  },
  {
    id: 'a139',
    title: 'Annihilation and Subsistence',
    titleAr: 'الفَناءُ وَالبَقاءُ',
    level: 'advanced',
    category: 'islamic-spirituality',
    categoryAr: 'الروحانية الإسلامية',
    text: 'الفَناءُ عِنْدَ العارِفينَ لَيْسَ فَناءَ الذّاتِ، بَلْ فَناءُ الإِرادَةِ في إِرادَةِ الحَقِّ، وَفَناءُ رُؤْيَةِ النَّفْسِ في مُشاهَدَةِ الحَقِّ. الفاني عَنْ نَفْسِهِ باقٍ بِرَبِّهِ، قَدْ غابَتْ عَنْهُ رُؤْيَةُ الأَغْيارِ في نورِ الواحِدِ القَهّارِ. وَالفَناءُ المَحْمودُ ما لا يُخْرِجُ صاحِبَهُ عَنِ الشَّريعَةِ، فَمَنِ ادَّعى الفَناءَ وَتَرَكَ الفَرائِضَ فَقَدْ ضَلَّ ضَلالًا بَعيدًا. أَمّا البَقاءُ فَهُوَ البَقاءُ بِاللهِ بَعْدَ الفَناءِ عَمّا سِواهُ، وَهُوَ رُجوعُ العَبْدِ إِلى الخَلْقِ بِالحَقِّ لِنَفْعِهِمْ وَإِرْشادِهِمْ.',
    translation: 'Annihilation for the gnostics is not annihilation of the self, but annihilation of will in the will of the Truth, and annihilation of seeing the self in witnessing the Truth. One annihilated from himself subsists through his Lord; the vision of others has disappeared in the light of the One, the Subduer. Praiseworthy annihilation does not remove its possessor from sacred law—whoever claims annihilation and abandons obligations has gone far astray. As for subsistence, it is remaining with Allah after annihilation from all else—the servant\'s return to creation through the Truth to benefit and guide them.',
    grammaticalConcepts: ['نفي وإثبات', 'إضافة', 'جملة شرطية'],
    vocabularyHighlights: [
      { word: 'الفَناء', meaning: 'annihilation' },
      { word: 'البَقاء', meaning: 'subsistence' },
      { word: 'العارِفين', meaning: 'the gnostics' },
      { word: 'مُشاهَدَة', meaning: 'witnessing' }
    ],
    moralLesson: 'True spiritual annihilation leads to serving creation, not abandoning duty.',
    moralLessonAr: 'الفناء الروحي الحقيقي يؤدي إلى خدمة الخلق، لا ترك الواجبات.',
    wordCount: 82
  },
  {
    id: 'a140',
    title: 'Divine Love',
    titleAr: 'المَحَبَّةُ الإِلَهِيَّةُ',
    level: 'advanced',
    category: 'islamic-spirituality',
    categoryAr: 'الروحانية الإسلامية',
    text: 'المَحَبَّةُ أَعْلى مَقاماتِ السّالِكينَ وَغايَةُ المُريدينَ. قالَ اللهُ تَعالى: يُحِبُّهُمْ وَيُحِبّونَهُ. حُبُّ اللهِ لِلْعَبْدِ رِضاهُ عَنْهُ وَإِكْرامُهُ لَهُ، وَحُبُّ العَبْدِ لِلّهِ إِيثارُهُ عَلى كُلِّ مَحْبوبٍ. عَلاماتُ المَحَبَّةِ: كَثْرَةُ ذِكْرِ المَحْبوبِ، وَإِيثارُ مُرادِهِ، وَحُبُّ ما يُحِبُّهُ، وَالأُنْسُ بِمُناجاتِهِ، وَالشَّوْقُ إِلى لِقائِهِ. مَنْ أَحَبَّ اللهَ أَحَبَّ طاعَتَهُ وَكَرِهَ مَعْصِيَتَهُ، وَأَحَبَّ أَوْلِياءَهُ وَعادى أَعْداءَهُ. وَالمَحَبَّةُ الصّادِقَةُ تُفْني صاحِبَها عَنْ نَفْسِهِ وَتُبْقيهِ بِمَحْبوبِهِ.',
    translation: 'Love is the highest station of wayfarers and the goal of seekers. Allah said: "He loves them and they love Him." Allah\'s love for the servant is His pleasure with him and honoring him; the servant\'s love for Allah is preferring Him over every beloved. Signs of love: frequent remembrance of the Beloved, preferring His will, loving what He loves, finding intimacy in conversing with Him, and longing for meeting Him. Whoever loves Allah loves His obedience and hates His disobedience, loves His friends and opposes His enemies. True love annihilates its possessor from himself and sustains him through his Beloved.',
    grammaticalConcepts: ['إضافة', 'اسم تفضيل', 'عطف'],
    vocabularyHighlights: [
      { word: 'المَحَبَّة', meaning: 'love' },
      { word: 'إِيثار', meaning: 'preference, selflessness' },
      { word: 'الشَّوْق', meaning: 'longing' },
      { word: 'المُريدين', meaning: 'seekers' }
    ],
    moralLesson: 'Divine love transforms the entire being toward Allah.',
    moralLessonAr: 'المحبة الإلهية تحول الكيان بأكمله نحو الله.',
    wordCount: 85
  },
  {
    id: 'a141',
    title: 'Light of Spiritual Insight',
    titleAr: 'نورُ البَصيرَةِ',
    level: 'advanced',
    category: 'islamic-spirituality',
    categoryAr: 'الروحانية الإسلامية',
    text: 'البَصيرَةُ نورٌ يَقْذِفُهُ اللهُ في القَلْبِ يَرى بِهِ حَقائِقَ الأَشْياءِ. البَصَرُ لِلْعَيْنِ وَالبَصيرَةُ لِلْقَلْبِ، فَكَمْ مِنْ بَصيرٍ أَعْمى القَلْبِ، وَكَمْ مِنْ أَعْمى البَصَرِ نافِذِ البَصيرَةِ. قالَ تَعالى: فَإِنَّها لا تَعْمَى الأَبْصارُ وَلَكِنْ تَعْمى القُلوبُ الَّتي في الصُّدورِ. صاحِبُ البَصيرَةِ يَرى عَواقِبَ الأُمورِ قَبْلَ وُقوعِها، وَيُمَيِّزُ بَيْنَ الحَقِّ وَالباطِلِ بِنورٍ رَبّانِيٍّ. وَالبَصيرَةُ تُكْتَسَبُ بِالتَّقْوى وَالذِّكْرِ وَالتَّفَكُّرِ وَمُجاهَدَةِ النَّفْسِ.',
    translation: 'Insight is a light that Allah casts into the heart, through which one sees the realities of things. Sight is for the eye and insight is for the heart—how many are those with sight but blind hearts, and how many are those blind in sight but penetrating in insight. Allah said: "For indeed, it is not eyes that are blinded, but blinded are the hearts within the chests." The possessor of insight sees the consequences of matters before they occur, and distinguishes between truth and falsehood with a divine light. Insight is acquired through God-consciousness, remembrance, reflection, and struggling with the self.',
    grammaticalConcepts: ['مقابلة', 'استفهام إنكاري', 'حصر'],
    vocabularyHighlights: [
      { word: 'البَصيرَة', meaning: 'spiritual insight' },
      { word: 'البَصَر', meaning: 'eyesight' },
      { word: 'عَواقِب', meaning: 'consequences' },
      { word: 'التَّقْوى', meaning: 'God-consciousness' }
    ],
    moralLesson: 'True vision comes from the heart, not the eyes.',
    moralLessonAr: 'الرؤية الحقيقية تأتي من القلب، لا من العين.',
    wordCount: 79
  },
  {
    id: 'a142',
    title: 'Reaching the Ultimate Truth',
    titleAr: 'الوُصولُ إِلى الحَقِّ',
    level: 'advanced',
    category: 'islamic-spirituality',
    categoryAr: 'الروحانية الإسلامية',
    text: 'الوُصولُ إِلى اللهِ لَيْسَ وُصولًا مَكانِيًّا، فَاللهُ مُنَزَّهٌ عَنِ المَكانِ وَالزَّمانِ، وَإِنَّما هُوَ وُصولٌ مَعْنَوِيٌّ بِالمَعْرِفَةِ وَالمَحَبَّةِ. الواصِلُ مَنْ وَصَلَ إِلى مُرادِ اللهِ مِنْهُ، فَفَنِيَ عَنْ مُرادِ نَفْسِهِ في مُرادِ رَبِّهِ. وَالوُصولُ نِهايَةُ السَّيْرِ وَبِدايَةُ الطَّيَرانِ، فَمَنْ وَصَلَ انْفَتَحَتْ لَهُ أَبْوابُ المَعارِفِ الَّتي لا نِهايَةَ لَها. قالَ بَعْضُ العارِفينَ: الوُصولُ لَيْسَ بِالأَقْدامِ بَلْ بِالقُلوبِ، وَلَيْسَ بِقَطْعِ المَسافاتِ بَلْ بِقَطْعِ الشَّهَواتِ وَرَفْضِ المَألوفاتِ.',
    translation: 'Reaching Allah is not a spatial arrival, for Allah is transcendent beyond place and time; rather, it is a spiritual arrival through knowledge and love. The one who has arrived has reached what Allah desires from him, annihilating his own desire in the desire of his Lord. Arrival is the end of walking and the beginning of flying—whoever arrives, doors of endless knowledge open for him. Some gnostics said: "Arrival is not by feet but by hearts, not by crossing distances but by cutting desires and rejecting habits."',
    grammaticalConcepts: ['نفي وإثبات', 'مقابلة', 'استعارة'],
    vocabularyHighlights: [
      { word: 'الوُصول', meaning: 'arrival, reaching' },
      { word: 'مُنَزَّه', meaning: 'transcendent' },
      { word: 'الواصِل', meaning: 'the one who has arrived' },
      { word: 'الشَّهَوات', meaning: 'desires' }
    ],
    moralLesson: 'The spiritual journey is about inner transformation, not physical travel.',
    moralLessonAr: 'الرحلة الروحية تتعلق بالتحول الداخلي، لا السفر الجسدي.',
    wordCount: 88
  }
];
