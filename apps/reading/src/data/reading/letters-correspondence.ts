// src/data/reading/letters-correspondence.ts

import { ReadingText } from './types';

/**
 * Letters & Correspondence themed reading texts
 * Topics: Epistolary art, diplomatic letters, scholarly exchanges, personal correspondence
 * IDs: b193-b198 (beginner), i184-i189 (intermediate), a179-a184 (advanced)
 */
export const lettersCorrespondenceTexts: ReadingText[] = [
  // ===== BEGINNER (b193-b198) =====
  {
    id: 'b193',
    title: 'Letter to a Friend',
    titleAr: 'رِسَالَةٌ إِلَى صَدِيقٍ',
    level: 'beginner',
    category: 'letters-correspondence',
    categoryAr: 'الرسائل والمراسلات',
    text: 'بِسْمِ اللهِ الرَّحْمَنِ الرَّحِيمِ. صَدِيقِي العَزِيزُ أَحْمَدُ، السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللهِ. أَرْجُو أَنْ تَكُونَ بِخَيْرٍ وَصِحَّةٍ. اشْتَقْتُ إِلَيْكَ كَثِيرًا. مَتَى تَزُورُنَا؟ أُمِّي تَسْأَلُ عَنْكَ. أَنْتَظِرُ رَدَّكَ. مَعَ حُبِّي وَتَقْدِيرِي، صَدِيقُكَ خَالِدٌ.',
    translation: 'In the name of Allah, the Most Gracious, the Most Merciful. My dear friend Ahmad, peace be upon you and Allah\'s mercy. I hope you are well and healthy. I missed you very much. When will you visit us? My mother asks about you. I await your reply. With my love and appreciation, your friend Khalid.',
    grammaticalConcepts: ['vocative يا', 'أنْ + subjunctive', 'attached pronouns'],
    vocabularyHighlights: [
      { word: 'اشْتَقْتُ', meaning: 'I missed/longed for' },
      { word: 'صِحَّة', meaning: 'health' },
      { word: 'تَقْدِير', meaning: 'appreciation' },
      { word: 'رَدّ', meaning: 'reply/response' }
    ],
    moralLesson: 'Letters maintain bonds of friendship across distance.',
    moralLessonAr: 'الرسائل تحافظ على روابط الصداقة رغم المسافة.',
    wordCount: 40
  },
  {
    id: 'b194',
    title: 'A Thank You Letter',
    titleAr: 'رِسَالَةُ شُكْرٍ',
    level: 'beginner',
    category: 'letters-correspondence',
    categoryAr: 'الرسائل والمراسلات',
    text: 'إِلَى مُعَلِّمِي الفَاضِلِ، أَشْكُرُكَ عَلَى كُلِّ مَا عَلَّمْتَنِي. كُنْتَ صَبُورًا مَعِي. سَاعَدْتَنِي حِينَ صَعُبَ عَلَيَّ الفَهْمُ. لَنْ أَنْسَى فَضْلَكَ أَبَدًا. أَدْعُو اللهَ أَنْ يَجْزِيَكَ خَيْرًا. تِلْمِيذُكَ المُحِبُّ، يُوسُفُ.',
    translation: 'To my honorable teacher, I thank you for all that you taught me. You were patient with me. You helped me when understanding was difficult for me. I will never forget your kindness. I pray Allah rewards you with good. Your loving student, Yusuf.',
    grammaticalConcepts: ['ما الموصولة', 'كان with predicate', 'لن + subjunctive'],
    vocabularyHighlights: [
      { word: 'الفَاضِل', meaning: 'honorable/virtuous' },
      { word: 'صَبُور', meaning: 'patient' },
      { word: 'فَضْل', meaning: 'kindness/virtue' },
      { word: 'يَجْزِيكَ', meaning: 'rewards you' }
    ],
    moralLesson: 'Expressing gratitude through letters honors those who helped us.',
    moralLessonAr: 'التعبير عن الشكر بالرسائل يكرّم من ساعدنا.',
    wordCount: 38
  },
  {
    id: 'b195',
    title: 'Invitation Letter',
    titleAr: 'رِسَالَةُ دَعْوَةٍ',
    level: 'beginner',
    category: 'letters-correspondence',
    categoryAr: 'الرسائل والمراسلات',
    text: 'عَزِيزَتِي فَاطِمَةُ، يَسُرُّنِي أَنْ أَدْعُوَكِ إِلَى حَفْلَةِ عِيدِ مِيلَادِي. سَتَكُونُ يَوْمَ السَّبْتِ فِي بَيْتِنَا. سَيَحْضُرُ أَصْدِقَاؤُنَا جَمِيعًا. سَنَلْعَبُ وَنَأْكُلُ الحَلْوَى. أَرْجُو أَنْ تَأْتِي. أَنْتَظِرُكِ بِفَارِغِ الصَّبْرِ. صَدِيقَتُكِ، مَرْيَمُ.',
    translation: 'Dear Fatima, it pleases me to invite you to my birthday party. It will be on Saturday at our house. All our friends will attend. We will play and eat sweets. I hope you come. I await you eagerly. Your friend, Maryam.',
    grammaticalConcepts: ['أنْ + subjunctive', 'سَ future', 'feminine vocative'],
    vocabularyHighlights: [
      { word: 'يَسُرُّنِي', meaning: 'it pleases me' },
      { word: 'حَفْلَة', meaning: 'party/celebration' },
      { word: 'حَلْوَى', meaning: 'sweets/candy' },
      { word: 'بِفَارِغِ الصَّبْر', meaning: 'eagerly (lit: with empty patience)' }
    ],
    moralLesson: 'Written invitations show care and formality in social occasions.',
    moralLessonAr: 'الدعوات المكتوبة تُظهر الاهتمام والاحترام في المناسبات.',
    wordCount: 36
  },
  {
    id: 'b196',
    title: 'Letter from Travel',
    titleAr: 'رِسَالَةٌ مِنَ السَّفَرِ',
    level: 'beginner',
    category: 'letters-correspondence',
    categoryAr: 'الرسائل والمراسلات',
    text: 'أُمِّي الحَبِيبَةُ، وَصَلْنَا إِلَى المَدِينَةِ المُنَوَّرَةِ بِسَلَامٍ. المَسْجِدُ النَّبَوِيُّ جَمِيلٌ جِدًّا. صَلَّيْنَا فِيهِ خَمْسَ صَلَوَاتٍ. النَّاسُ هُنَا طَيِّبُونَ. اشْتَرَيْتُ لَكِ هَدِيَّةً. سَأُعْطِيكِ إِيَّاهَا حِينَ أَعُودُ. دُعَاؤُكِ مَعِي دَائِمًا. ابْنُكِ، عُمَرُ.',
    translation: 'My beloved mother, we arrived at Medina safely. The Prophet\'s Mosque is very beautiful. We prayed five prayers in it. The people here are kind. I bought you a gift. I will give it to you when I return. Your prayers are with me always. Your son, Umar.',
    grammaticalConcepts: ['feminine attached pronouns', 'cardinal numbers', 'حين temporal'],
    vocabularyHighlights: [
      { word: 'المَدِينَة المُنَوَّرَة', meaning: 'the Illuminated City (Medina)' },
      { word: 'بِسَلَام', meaning: 'safely' },
      { word: 'طَيِّبُون', meaning: 'kind/good people' },
      { word: 'هَدِيَّة', meaning: 'gift' }
    ],
    moralLesson: 'Letters from travelers reassure loved ones and share blessings.',
    moralLessonAr: 'رسائل المسافرين تطمئن الأحباء وتشارك البركات.',
    wordCount: 42
  },
  {
    id: 'b197',
    title: 'Apology Letter',
    titleAr: 'رِسَالَةُ اعْتِذَارٍ',
    level: 'beginner',
    category: 'letters-correspondence',
    categoryAr: 'الرسائل والمراسلات',
    text: 'أَخِي العَزِيزُ سَعِيدُ، أَعْتَذِرُ عَمَّا فَعَلْتُ. أَخْطَأْتُ فِي حَقِّكَ. لَمْ أَقْصِدْ أَنْ أُؤْذِيَكَ. أَنَا نَادِمٌ جِدًّا. هَلْ تَسَامِحُنِي؟ أَعِدُكَ أَنْ لَا أُكَرِّرَ هَذَا الخَطَأَ. أَنْتَ أَخِي وَصَدِيقِي. أَرْجُو أَنْ تَقْبَلَ اعْتِذَارِي. أَخُوكَ المُحِبُّ، عَلِيٌّ.',
    translation: 'My dear brother Saeed, I apologize for what I did. I wronged you. I did not intend to hurt you. I am very regretful. Will you forgive me? I promise not to repeat this mistake. You are my brother and friend. I hope you accept my apology. Your loving brother, Ali.',
    grammaticalConcepts: ['عمّا = عن + ما', 'لم + jussive', 'أنْ + subjunctive'],
    vocabularyHighlights: [
      { word: 'أَعْتَذِرُ', meaning: 'I apologize' },
      { word: 'أَخْطَأْتُ', meaning: 'I made a mistake' },
      { word: 'نَادِم', meaning: 'regretful/remorseful' },
      { word: 'تَسَامِحُ', meaning: 'forgive' }
    ],
    moralLesson: 'Written apologies show sincerity and help heal relationships.',
    moralLessonAr: 'الاعتذار المكتوب يُظهر الإخلاص ويساعد على إصلاح العلاقات.',
    wordCount: 40
  },
  {
    id: 'b198',
    title: 'Eid Greetings',
    titleAr: 'تَهْنِئَةُ العِيدِ',
    level: 'beginner',
    category: 'letters-correspondence',
    categoryAr: 'الرسائل والمراسلات',
    text: 'إِلَى جَدِّي وَجَدَّتِي الحَبِيبَيْنِ، كُلُّ عَامٍ وَأَنْتُمَا بِخَيْرٍ. أُهَنِّئُكُمَا بِعِيدِ الفِطْرِ المُبَارَكِ. أَسْأَلُ اللهَ أَنْ يُطِيلَ عُمْرَكُمَا. أَتَمَنَّى أَنْ أَرَاكُمَا قَرِيبًا. أُحِبُّكُمَا كَثِيرًا. حَفِيدُكُمَا، مُصْطَفَى.',
    translation: 'To my beloved grandfather and grandmother, may you be well every year. I congratulate you on the blessed Eid al-Fitr. I ask Allah to lengthen your lives. I wish to see you soon. I love you very much. Your grandson, Mustafa.',
    grammaticalConcepts: ['dual pronouns أنتما/كما', 'أنْ + subjunctive', 'vocative إلى'],
    vocabularyHighlights: [
      { word: 'تَهْنِئَة', meaning: 'congratulation/greeting' },
      { word: 'يُطِيلَ', meaning: 'lengthen/prolong' },
      { word: 'أَتَمَنَّى', meaning: 'I wish/hope' },
      { word: 'حَفِيد', meaning: 'grandson' }
    ],
    moralLesson: 'Holiday letters strengthen family bonds across generations.',
    moralLessonAr: 'رسائل الأعياد تقوّي روابط العائلة عبر الأجيال.',
    wordCount: 35
  },

  // ===== INTERMEDIATE (i184-i189) =====
  {
    id: 'i184',
    title: 'A Scholar\'s Letter to His Student',
    titleAr: 'رِسَالَةُ عَالِمٍ إِلَى تِلْمِيذِهِ',
    level: 'intermediate',
    category: 'letters-correspondence',
    categoryAr: 'الرسائل والمراسلات',
    text: 'بُنَيَّ الحَبِيبُ، وَصَلَتْنِي رِسَالَتُكَ فَفَرِحْتُ بِهَا. سَأَلْتَنِي عَنْ طَرِيقِ طَلَبِ العِلْمِ. اعْلَمْ أَنَّ العِلْمَ يَحْتَاجُ صَبْرًا وَتَوَاضُعًا. لَا تَسْتَحِ مِنَ السُّؤَالِ وَلَا تَتَكَبَّرْ عَلَى مَنْ دُونَكَ. اجْعَلِ القُرْآنَ رَفِيقَكَ وَالعَرَبِيَّةَ سِلَاحَكَ. وَتَذَكَّرْ أَنَّ العَالِمَ يَتَعَلَّمُ حَتَّى المَوْتِ. بَارَكَ اللهُ فِيكَ وَنَفَعَ بِكَ. شَيْخُكَ المُحِبُّ.',
    translation: 'My beloved son, your letter reached me and I was delighted by it. You asked me about the path of seeking knowledge. Know that knowledge requires patience and humility. Do not be shy to ask and do not be arrogant toward those beneath you. Make the Quran your companion and Arabic your weapon. And remember that the scholar keeps learning until death. May Allah bless you and benefit others through you. Your loving teacher.',
    grammaticalConcepts: ['imperative اعلم/اجعل', 'لا + jussive prohibition', 'من الموصولة'],
    vocabularyHighlights: [
      { word: 'تَوَاضُع', meaning: 'humility' },
      { word: 'لا تَسْتَحِ', meaning: 'do not be shy' },
      { word: 'رَفِيق', meaning: 'companion' },
      { word: 'نَفَعَ بِكَ', meaning: 'benefit others through you' }
    ],
    moralLesson: 'Scholarly letters transmit wisdom and guide the next generation.',
    moralLessonAr: 'رسائل العلماء تنقل الحكمة وترشد الجيل القادم.',
    wordCount: 62
  },
  {
    id: 'i185',
    title: 'A Father\'s Letter from War',
    titleAr: 'رِسَالَةُ أَبٍ مِنَ الحَرْبِ',
    level: 'intermediate',
    category: 'letters-correspondence',
    categoryAr: 'الرسائل والمراسلات',
    text: 'زَوْجَتِي الغَالِيَةُ وَأَبْنَائِي الأَعِزَّاءُ، أَكْتُبُ إِلَيْكُمْ مِنْ خَطِّ الجَبْهَةِ. الحَالُ صَعْبٌ لَكِنَّنَا صَابِرُونَ. أَفَتَقِدُكُمْ كُلَّ لَحْظَةٍ. حِينَ أَنْظُرُ إِلَى صُوَرِكُمْ أَجِدُ القُوَّةَ لِأُكْمِلَ. يَا أَبْنَائِي، كُونُوا بَرَرَةً بِأُمِّكُمْ. سَاعِدُوهَا وَلَا تُحْزِنُوهَا. أَعِدُكُمْ أَنْ أَعُودَ إِنْ شَاءَ اللهُ. دَعْوَاتُكُمْ تَحْمِينِي. أَبُوكُمْ المُشْتَاقُ.',
    translation: 'My precious wife and dear children, I write to you from the front line. Conditions are hard but we are patient. I miss you every moment. When I look at your pictures I find the strength to continue. My children, be dutiful to your mother. Help her and do not sadden her. I promise to return, God willing. Your prayers protect me. Your longing father.',
    grammaticalConcepts: ['imperative كونوا', 'لا + jussive prohibition', 'كل + noun accusative'],
    vocabularyHighlights: [
      { word: 'خَطّ الجَبْهَة', meaning: 'front line' },
      { word: 'أَفْتَقِدُ', meaning: 'I miss' },
      { word: 'بَرَرَة', meaning: 'dutiful/righteous (to parents)' },
      { word: 'المُشْتَاق', meaning: 'the longing one' }
    ],
    moralLesson: 'Letters from afar carry love that transcends distance and danger.',
    moralLessonAr: 'الرسائل من بعيد تحمل حبًّا يتجاوز المسافة والخطر.',
    wordCount: 60
  },
  {
    id: 'i186',
    title: 'A Merchant\'s Trade Letter',
    titleAr: 'رِسَالَةُ تَاجِرٍ تِجَارِيَّةٌ',
    level: 'intermediate',
    category: 'letters-correspondence',
    categoryAr: 'الرسائل والمراسلات',
    text: 'إِلَى الأَخِ الكَرِيمِ مُحَمَّدِ بْنِ عَبْدِ اللهِ، تَاجِرِ الحَرِيرِ فِي دِمَشْقَ. بَعْدَ السَّلَامِ، وَصَلَتْنِي بِضَاعَتُكُمْ سَالِمَةً. وَجَدْتُ الجَوْدَةَ عَالِيَةً كَمَا وَعَدْتُمْ. أَرْغَبُ فِي طَلَبِ مِائَةِ ثَوْبٍ إِضَافِيٍّ. أَرْفَقْتُ مَعَ هَذِهِ الرِّسَالَةِ خَمْسِينَ دِينَارًا كَدُفْعَةٍ أُولَى. أَرْجُو الإِسْرَاعَ فِي الشَّحْنِ. وَاللهُ يَرْزُقُنَا وَإِيَّاكُمْ. أَخُوكُمْ فِي التِّجَارَةِ، إِبْرَاهِيمُ.',
    translation: 'To the honorable brother Muhammad ibn Abdullah, silk merchant in Damascus. After greetings, your merchandise reached me safely. I found the quality high as you promised. I wish to order one hundred additional garments. I attached with this letter fifty dinars as a first payment. I request speedy shipping. May Allah provide for us and you. Your brother in trade, Ibrahim.',
    grammaticalConcepts: ['cardinal numbers مائة/خمسين', 'كما comparative', 'مصدر الشحن'],
    vocabularyHighlights: [
      { word: 'حَرِير', meaning: 'silk' },
      { word: 'جَوْدَة', meaning: 'quality' },
      { word: 'دُفْعَة', meaning: 'payment/installment' },
      { word: 'الشَّحْن', meaning: 'shipping' }
    ],
    moralLesson: 'Business letters establish trust and professionalism in trade.',
    moralLessonAr: 'الرسائل التجارية تبني الثقة والمهنية في التجارة.',
    wordCount: 58
  },
  {
    id: 'i187',
    title: 'Letter Between Two Poets',
    titleAr: 'رِسَالَةٌ بَيْنَ شَاعِرَيْنِ',
    level: 'intermediate',
    category: 'letters-correspondence',
    categoryAr: 'الرسائل والمراسلات',
    text: 'أَخِي فِي الشِّعْرِ وَالأَدَبِ، قَرَأْتُ قَصِيدَتَكَ الأَخِيرَةَ فَهَزَّتْ قَلْبِي. كَلِمَاتُكَ كَاللُّؤْلُؤِ المَنْثُورِ. أَعْجَبَنِي تَشْبِيهُكَ اللَّيْلَ بِالبَحْرِ. هَذِهِ صُورَةٌ جَدِيدَةٌ لَمْ أَقْرَأْهَا مِنْ قَبْلُ. أَبْعَثُ لَكَ قَصِيدَةً كَتَبْتُهَا رَدًّا عَلَى قَصِيدَتِكَ. أَرْجُو أَنْ تُعْجِبَكَ. لَنَلْتَقِ فِي مَجْلِسِ الأَدَبِ يَوْمَ الخَمِيسِ. رَفِيقُكَ فِي القَافِيَةِ.',
    translation: 'My brother in poetry and literature, I read your latest poem and it moved my heart. Your words are like scattered pearls. I admired your comparison of night to the sea. This is a new image I haven\'t read before. I send you a poem I wrote in response to yours. I hope you like it. Let us meet at the literary salon on Thursday. Your companion in rhyme.',
    grammaticalConcepts: ['تشبيه structure', 'لم + jussive past negative', 'لام الأمر'],
    vocabularyHighlights: [
      { word: 'هَزَّتْ', meaning: 'shook/moved' },
      { word: 'اللُّؤْلُؤ المَنْثُور', meaning: 'scattered pearls' },
      { word: 'تَشْبِيه', meaning: 'comparison/simile' },
      { word: 'القَافِيَة', meaning: 'rhyme' }
    ],
    moralLesson: 'Literary correspondence nurtures artistic friendship and growth.',
    moralLessonAr: 'المراسلات الأدبية تُنمّي الصداقة الفنية والتطور.',
    wordCount: 58
  },
  {
    id: 'i188',
    title: 'A Governor\'s Report',
    titleAr: 'تَقْرِيرُ وَالٍ',
    level: 'intermediate',
    category: 'letters-correspondence',
    categoryAr: 'الرسائل والمراسلات',
    text: 'إِلَى أَمِيرِ المُؤْمِنِينَ حَفِظَهُ اللهُ، أَرْفَعُ إِلَى مَقَامِكُمُ العَالِي تَقْرِيرَ أَحْوَالِ الوِلَايَةِ. المَحَاصِيلُ هَذَا العَامَ وَفِيرَةٌ بِفَضْلِ اللهِ. الأَمْنُ مُسْتَتِبٌّ وَالتِّجَارَةُ مُزْدَهِرَةٌ. وَصَلَتْنَا الزَّكَاةُ كَامِلَةً وَوُزِّعَتْ عَلَى مُسْتَحِقِّيهَا. أَنْتَظِرُ أَوَامِرَ سَيِّدِي. وَاللهُ يُدِيمُ نِعْمَتَهُ عَلَى الأُمَّةِ. عَبْدُكُمُ الخَادِمُ، وَالِي البَصْرَةِ.',
    translation: 'To the Commander of the Faithful, may Allah protect him. I submit to your high station the report on the province\'s conditions. The crops this year are abundant by Allah\'s grace. Security is established and trade is flourishing. Zakat reached us in full and was distributed to its rightful recipients. I await my lord\'s orders. May Allah perpetuate His blessings upon the nation. Your humble servant, Governor of Basra.',
    grammaticalConcepts: ['passive وُزِّعَت', 'hal مستتبّ/مزدهرة', 'دعاء يُديم'],
    vocabularyHighlights: [
      { word: 'مَقَام', meaning: 'station/position' },
      { word: 'مُسْتَتِبّ', meaning: 'established/stable' },
      { word: 'مُسْتَحِقّ', meaning: 'rightful recipient' },
      { word: 'يُدِيمُ', meaning: 'perpetuates' }
    ],
    moralLesson: 'Administrative letters ensure accountability and good governance.',
    moralLessonAr: 'الرسائل الإدارية تضمن المحاسبة والحكم الرشيد.',
    wordCount: 56
  },
  {
    id: 'i189',
    title: 'A Condolence Letter',
    titleAr: 'رِسَالَةُ تَعْزِيَةٍ',
    level: 'intermediate',
    category: 'letters-correspondence',
    categoryAr: 'الرسائل والمراسلات',
    text: 'أَخِي الحَبِيبُ، بَلَغَنِي خَبَرُ وَفَاةِ وَالِدِكَ الكَرِيمِ فَحَزِنْتُ حُزْنًا شَدِيدًا. أَسْأَلُ اللهَ أَنْ يَتَغَمَّدَهُ بِوَاسِعِ رَحْمَتِهِ وَيُسْكِنَهُ فَسِيحَ جَنَّاتِهِ. كَانَ رَجُلًا فَاضِلًا يُحِبُّهُ الجَمِيعُ. عَزَاؤُنَا أَنَّهُ تَرَكَ ذُرِّيَّةً صَالِحَةً تَدْعُو لَهُ. إِنَّا للهِ وَإِنَّا إِلَيْهِ رَاجِعُونَ. أَخُوكَ فِي الحُزْنِ وَالفَرَحِ.',
    translation: 'My beloved brother, news of your honorable father\'s passing reached me and I grieved deeply. I ask Allah to envelop him in His vast mercy and settle him in His spacious gardens. He was a virtuous man loved by all. Our consolation is that he left righteous offspring who pray for him. Indeed, to Allah we belong and to Him we return. Your brother in sorrow and joy.',
    grammaticalConcepts: ['أنْ + subjunctive', 'كان with predicate', 'إنّا لله'],
    vocabularyHighlights: [
      { word: 'تَعْزِيَة', meaning: 'condolence' },
      { word: 'يَتَغَمَّدَهُ', meaning: 'envelop him (in mercy)' },
      { word: 'فَسِيح', meaning: 'spacious/vast' },
      { word: 'ذُرِّيَّة', meaning: 'offspring/descendants' }
    ],
    moralLesson: 'Condolence letters offer comfort and affirm bonds of brotherhood.',
    moralLessonAr: 'رسائل التعزية تقدم العزاء وتؤكد روابط الأخوة.',
    wordCount: 58
  },

  // ===== ADVANCED (a179-a184) =====
  {
    id: 'a179',
    title: 'Umar\'s Letter to Abu Musa',
    titleAr: 'رِسَالَةُ عُمَرَ إِلَى أَبِي مُوسَى',
    level: 'advanced',
    category: 'letters-correspondence',
    categoryAr: 'الرسائل والمراسلات',
    text: 'مِنْ عَبْدِ اللهِ عُمَرَ أَمِيرِ المُؤْمِنِينَ إِلَى أَبِي مُوسَى الأَشْعَرِيِّ. أَمَّا بَعْدُ، فَإِنَّ القَضَاءَ فَرِيضَةٌ مُحْكَمَةٌ وَسُنَّةٌ مُتَّبَعَةٌ. فَافْهَمْ إِذَا أُدْلِيَ إِلَيْكَ، فَإِنَّهُ لَا يَنْفَعُ تَكَلُّمٌ بِحَقٍّ لَا نَفَاذَ لَهُ. آسِ بَيْنَ النَّاسِ فِي وَجْهِكَ وَمَجْلِسِكَ وَقَضَائِكَ، حَتَّى لَا يَطْمَعَ شَرِيفٌ فِي حَيْفِكَ وَلَا يَيْأَسَ ضَعِيفٌ مِنْ عَدْلِكَ. وَالصُّلْحُ جَائِزٌ بَيْنَ المُسْلِمِينَ إِلَّا صُلْحًا أَحَلَّ حَرَامًا أَوْ حَرَّمَ حَلَالًا.',
    translation: 'From Abdullah Umar, Commander of the Faithful, to Abu Musa al-Ash\'ari. As for what follows: Judging is a firm obligation and an established practice. So understand when arguments are presented to you, for speaking truth that cannot be enforced is useless. Treat people equally in your demeanor, seating, and judgment, so that no noble hopes for your favoritism and no weak person despairs of your justice. Reconciliation is permissible among Muslims except reconciliation that permits the forbidden or forbids the permitted.',
    grammaticalConcepts: ['أمّا بعد formula', 'imperative افهم/آسِ', 'استثناء إلّا'],
    vocabularyHighlights: [
      { word: 'مُحْكَمَة', meaning: 'firm/established' },
      { word: 'أُدْلِيَ', meaning: 'presented (arguments)' },
      { word: 'آسِ', meaning: 'treat equally' },
      { word: 'حَيْف', meaning: 'favoritism/injustice' }
    ],
    moralLesson: 'This famous letter establishes principles of just governance and judiciary.',
    moralLessonAr: 'هذه الرسالة الشهيرة تؤسس مبادئ الحكم والقضاء العادل.',
    wordCount: 78
  },
  {
    id: 'a180',
    title: 'Al-Ghazali to His Student',
    titleAr: 'الغَزَالِيُّ إِلَى تِلْمِيذِهِ',
    level: 'advanced',
    category: 'letters-correspondence',
    categoryAr: 'الرسائل والمراسلات',
    text: 'أَيُّهَا الوَلَدُ، كَتَبْتَ تَسْأَلُنِي عَنْ طَرِيقِ السَّعَادَةِ. اعْلَمْ أَنَّ العِلْمَ بِلَا عَمَلٍ جُنُونٌ، وَالعَمَلَ بِغَيْرِ عِلْمٍ لَا يَكُونُ. كَمْ مِنْ لَيْلَةٍ أَحْيَيْتَهَا بِتَكْرَارِ العِلْمِ وَمُطَالَعَةِ الكُتُبِ، وَحَرَّمْتَ عَلَى نَفْسِكَ النَّوْمَ! لَا أَدْرِي مَا كَانَ البَاعِثُ عَلَيْهِ. إِنْ كَانَ لِعَرَضِ الدُّنْيَا وَجَذْبِ حُطَامِهَا فَوَيْلٌ لَكَ ثُمَّ وَيْلٌ. وَإِنْ كَانَ لِإِحْيَاءِ شَرِيعَةِ النَّبِيِّ وَتَهْذِيبِ أَخْلَاقِكَ فَطُوبَى لَكَ ثُمَّ طُوبَى.',
    translation: 'O my child, you wrote asking me about the path to happiness. Know that knowledge without action is madness, and action without knowledge cannot be. How many nights have you spent repeating knowledge and studying books, depriving yourself of sleep! I do not know what was the motive behind it. If it was for worldly gain and acquiring its debris, then woe to you, then woe! And if it was to revive the Prophet\'s law and refine your character, then blessed are you, then blessed!',
    grammaticalConcepts: ['كم الخبرية', 'conditional إن', 'ويل/طوبى exclamations'],
    vocabularyHighlights: [
      { word: 'أَحْيَيْتَهَا', meaning: 'you spent it awake' },
      { word: 'البَاعِث', meaning: 'the motive' },
      { word: 'حُطَام', meaning: 'debris/wreckage' },
      { word: 'تَهْذِيب', meaning: 'refinement/cultivation' }
    ],
    moralLesson: 'Al-Ghazali\'s letters emphasize sincerity of intention in seeking knowledge.',
    moralLessonAr: 'رسائل الغزالي تؤكد إخلاص النية في طلب العلم.',
    wordCount: 82
  },
  {
    id: 'a181',
    title: 'A Diplomatic Plea',
    titleAr: 'رِسَالَةٌ دِبْلُومَاسِيَّةٌ',
    level: 'advanced',
    category: 'letters-correspondence',
    categoryAr: 'الرسائل والمراسلات',
    text: 'إِلَى المَلِكِ الأَعْظَمِ، قِيصَرِ الرُّومِ، مِنْ خَادِمِ الحَرَمَيْنِ الشَّرِيفَيْنِ. بَلَغَنَا أَنَّ جُنُودَكُمْ تَجَاوَزُوا الحُدُودَ المُتَّفَقَ عَلَيْهَا. إِنَّنَا نَرْغَبُ فِي السَّلَامِ وَنَكْرَهُ الحَرْبَ. لَكِنَّنَا لَنْ نَقْبَلَ الظُّلْمَ. نَطْلُبُ مِنْكُمْ سَحْبَ الجُنُودِ خِلَالَ أَرْبَعِينَ يَوْمًا. فَإِنْ فَعَلْتُمْ فَالصُّلْحُ بَيْنَنَا، وَإِلَّا فَاعْلَمُوا أَنَّنَا قَوْمٌ نُحِبُّ المَوْتَ كَمَا تُحِبُّونَ الحَيَاةَ. وَاللهُ المُسْتَعَانُ.',
    translation: 'To the Great King, Caesar of Rome, from the Servant of the Two Holy Sanctuaries. It has reached us that your soldiers crossed the agreed-upon borders. We desire peace and hate war. But we will not accept injustice. We request that you withdraw the soldiers within forty days. If you do, then there is peace between us; otherwise, know that we are a people who love death as you love life. And Allah is the One whose help is sought.',
    grammaticalConcepts: ['إنّ with attached pronoun', 'conditional فإن', 'كما comparative'],
    vocabularyHighlights: [
      { word: 'الحَرَمَيْنِ الشَّرِيفَيْنِ', meaning: 'the Two Holy Sanctuaries' },
      { word: 'الحُدُود المُتَّفَق عَلَيْهَا', meaning: 'agreed-upon borders' },
      { word: 'سَحْب', meaning: 'withdrawal' },
      { word: 'المُسْتَعَان', meaning: 'the One whose help is sought' }
    ],
    moralLesson: 'Diplomatic letters combine dignity with clarity of ultimatum.',
    moralLessonAr: 'الرسائل الدبلوماسية تجمع الكرامة مع وضوح الإنذار.',
    wordCount: 75
  },
  {
    id: 'a182',
    title: 'Ibn Hazm\'s Letter on Love',
    titleAr: 'رِسَالَةُ ابْنِ حَزْمٍ فِي الحُبِّ',
    level: 'advanced',
    category: 'letters-correspondence',
    categoryAr: 'الرسائل والمراسلات',
    text: 'سَأَلْتَنِي عَنْ حَقِيقَةِ الحُبِّ فَأَقُولُ: الحُبُّ أَوَّلُهُ هَزْلٌ وَآخِرُهُ جِدٌّ. دَقَّتْ مَعَانِيهِ لِجَلَالَتِهَا عَنْ أَنْ تُوصَفَ، فَلَا تُدْرَكُ حَقِيقَتُهَا إِلَّا بِالمُعَانَاةِ. وَلَيْسَ بِمُنْكَرٍ فِي الدِّيَانَةِ وَلَا بِمَحْظُورٍ فِي الشَّرِيعَةِ، إِذِ القُلُوبُ بِيَدِ اللهِ عَزَّ وَجَلَّ. وَقَدْ أَحَبَّ كَثِيرٌ مِنَ الأَئِمَّةِ وَفُضَلَاءِ الأُمَّةِ. وَأَشْرَفُ الحُبِّ مَا كَانَ لِوَجْهِ اللهِ، ثُمَّ مَا كَانَ لِلْعِلْمِ وَالفَضِيلَةِ.',
    translation: 'You asked me about the reality of love, so I say: Love begins as jest and ends as earnest. Its meanings are too subtle in their majesty to be described, so its reality is only grasped through experience. It is neither denounced in religion nor prohibited in sacred law, for hearts are in Allah\'s hand. Many imams and virtuous members of the community have loved. The noblest love is what is for Allah\'s sake, then what is for knowledge and virtue.',
    grammaticalConcepts: ['أوّله/آخره structure', 'passive تُوصف/تُدرك', 'ما الموصولة'],
    vocabularyHighlights: [
      { word: 'هَزْل', meaning: 'jest/play' },
      { word: 'جِدّ', meaning: 'earnest/seriousness' },
      { word: 'المُعَانَاة', meaning: 'suffering/experience' },
      { word: 'مَحْظُور', meaning: 'prohibited' }
    ],
    moralLesson: 'Ibn Hazm\'s letters explore love with philosophical depth and religious awareness.',
    moralLessonAr: 'رسائل ابن حزم تستكشف الحب بعمق فلسفي ووعي ديني.',
    wordCount: 80
  },
  {
    id: 'a183',
    title: 'A Prisoner\'s Letter of Hope',
    titleAr: 'رِسَالَةُ سَجِينٍ مَلِيئَةٌ بِالأَمَلِ',
    level: 'advanced',
    category: 'letters-correspondence',
    categoryAr: 'الرسائل والمراسلات',
    text: 'أُمِّي الحَبِيبَةُ، أَكْتُبُ إِلَيْكِ مِنْ خَلْفِ القُضْبَانِ. الجِدَارَانُ لَمْ تَسْجِنْ رُوحِي وَإِنْ سَجَنَتْ جَسَدِي. أَقْرَأُ القُرْآنَ فَأَجِدُ فِيهِ عَزَائِي. كُلَّمَا ضَاقَتْ نَفْسِي تَذَكَّرْتُ يُوسُفَ فِي سِجْنِهِ. لَمْ يَيْأَسْ فَكَيْفَ أَيْأَسُ؟ أَعْلَمُ أَنَّكِ تَبْكِينَ عَلَيَّ. لَا تَبْكِي يَا أُمِّي فَإِنَّ الفَجْرَ قَرِيبٌ. سَأَخْرُجُ يَوْمًا وَأُقَبِّلُ يَدَيْكِ. انْتَظِرِينِي وَادْعِي لِي. ابْنُكِ الَّذِي لَنْ يَنْكَسِرَ.',
    translation: 'My beloved mother, I write to you from behind bars. The walls have not imprisoned my spirit even if they imprisoned my body. I read the Quran and find in it my solace. Whenever my soul felt constricted, I remembered Yusuf in his prison. He did not despair, so how could I? I know you cry for me. Do not cry, mother, for dawn is near. I will come out one day and kiss your hands. Wait for me and pray for me. Your son who will not break.',
    grammaticalConcepts: ['conditional وإن', 'كلّما temporal', 'لن + subjunctive'],
    vocabularyHighlights: [
      { word: 'القُضْبَان', meaning: 'bars (prison)' },
      { word: 'عَزَاء', meaning: 'solace/consolation' },
      { word: 'ضَاقَتْ نَفْسِي', meaning: 'my soul felt constricted' },
      { word: 'يَنْكَسِر', meaning: 'breaks' }
    ],
    moralLesson: 'Letters from prison reveal the triumph of spirit over circumstance.',
    moralLessonAr: 'رسائل السجن تكشف انتصار الروح على الظروف.',
    wordCount: 77
  },
  {
    id: 'a184',
    title: 'The Prophet\'s Letter to Heraclius',
    titleAr: 'رِسَالَةُ النَّبِيِّ إِلَى هِرَقْلَ',
    level: 'advanced',
    category: 'letters-correspondence',
    categoryAr: 'الرسائل والمراسلات',
    text: 'بِسْمِ اللهِ الرَّحْمَنِ الرَّحِيمِ. مِنْ مُحَمَّدٍ عَبْدِ اللهِ وَرَسُولِهِ إِلَى هِرَقْلَ عَظِيمِ الرُّومِ. سَلَامٌ عَلَى مَنِ اتَّبَعَ الهُدَى. أَمَّا بَعْدُ، فَإِنِّي أَدْعُوكَ بِدِعَايَةِ الإِسْلَامِ. أَسْلِمْ تَسْلَمْ، يُؤْتِكَ اللهُ أَجْرَكَ مَرَّتَيْنِ. فَإِنْ تَوَلَّيْتَ فَإِنَّ عَلَيْكَ إِثْمَ الأَرِيسِيِّينَ. وَيَا أَهْلَ الكِتَابِ تَعَالَوْا إِلَى كَلِمَةٍ سَوَاءٍ بَيْنَنَا وَبَيْنَكُمْ أَلَّا نَعْبُدَ إِلَّا اللهَ وَلَا نُشْرِكَ بِهِ شَيْئًا.',
    translation: 'In the name of Allah, the Most Gracious, the Most Merciful. From Muhammad, the servant of Allah and His Messenger, to Heraclius, the great one of Rome. Peace be upon whoever follows guidance. As for what follows: I invite you with the invitation of Islam. Accept Islam and you will be safe; Allah will give you your reward twice. If you turn away, then upon you is the sin of the peasants. O People of the Book, come to a word equal between us and you—that we worship none but Allah and associate nothing with Him.',
    grammaticalConcepts: ['أمّا بعد formula', 'imperative + jussive أَسْلِمْ تَسْلَمْ', 'conditional فإنْ'],
    vocabularyHighlights: [
      { word: 'عَظِيم الرُّوم', meaning: 'the great one of Rome' },
      { word: 'دِعَايَة', meaning: 'invitation/call' },
      { word: 'الأَرِيسِيِّين', meaning: 'the peasants/farmers' },
      { word: 'كَلِمَة سَوَاء', meaning: 'equal/common word' }
    ],
    moralLesson: 'The Prophet\'s letters demonstrate the universal call of Islam with dignity.',
    moralLessonAr: 'رسائل النبي تُظهر دعوة الإسلام العالمية بكرامة.',
    wordCount: 85
  }
];
