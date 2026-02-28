// src/data/reading/vivid-scenes.ts

import { ReadingText } from './types';

/**
 * Vivid Scenes & Raw Imagery reading texts
 * Topics: battle, desert hardship, grief, storms, intense emotions, survival
 * 18 texts: 6 beginner, 6 intermediate, 6 advanced
 */
export const vividScenesTexts: ReadingText[] = [
  // ===== BEGINNER (b157-b162) =====
  {
    id: 'b157',
    title: 'Thirst in the Desert',
    titleAr: 'العَطَشُ في الصَّحْراءِ',
    level: 'beginner',
    category: 'vivid-scenes',
    categoryAr: 'مشاهد حية',
    text: 'جَفَّ الحَلْقُ وَتَشَقَّقَتِ الشِّفاهُ. الشَّمْسُ تَصُبُّ نارَها عَلى الرِّمالِ. المُسافِرُ يَزْحَفُ عَلى رُكْبَتَيْهِ، وَعَيْناهُ تَبْحَثانِ عَنْ ظِلٍّ. اللِّسانُ كَالخَشَبِ اليابِسِ. قَطْرَةُ ماءٍ واحِدَةٌ تُساوي الدُّنْيا كُلَّها. ثُمَّ لاحَ بِئْرٌ في الأُفُقِ، فَدَبَّتِ الحَياةُ في عُروقِهِ مِنْ جَديدٍ.',
    translation: 'The throat dried and the lips cracked. The sun pours its fire upon the sands. The traveler crawls on his knees, his eyes searching for shade. The tongue is like dry wood. A single drop of water equals the entire world. Then a well appeared on the horizon, and life flowed through his veins again.',
    grammaticalConcepts: ['فعل ماضي', 'تشبيه', 'جملة حالية'],
    vocabularyHighlights: [
      { word: 'جَفَّ', meaning: 'dried up' },
      { word: 'تَشَقَّقَت', meaning: 'cracked' },
      { word: 'يَزْحَف', meaning: 'crawls' },
      { word: 'لاحَ', meaning: 'appeared, loomed' }
    ],
    moralLesson: 'Desperation sharpens appreciation for life\'s simplest blessings.',
    moralLessonAr: 'اليأس يزيد من تقدير أبسط نعم الحياة.',
    wordCount: 44
  },
  {
    id: 'b158',
    title: 'The Storm\'s Fury',
    titleAr: 'غَضَبُ العاصِفَةِ',
    level: 'beginner',
    category: 'vivid-scenes',
    categoryAr: 'مشاهد حية',
    text: 'اسْوَدَّتِ السَّماءُ وَهَدَرَ الرَّعْدُ. البَرْقُ يَشُقُّ الظَّلامَ كَسَيْفٍ مِنْ نورٍ. الرِّياحُ تَعْوي كَالذِّئابِ الجائِعَةِ. الأَشْجارُ تَنْحَني حَتّى تَكادُ تَنْكَسِرُ. المَطَرُ يَنْهَمِرُ كَأَنَّ السَّماءَ تَبْكي. الأَرْضُ تَرْتَجِفُ تَحْتَ أَقْدامِنا. لَكِنَّ كُلَّ عاصِفَةٍ تَنْتَهي بِهُدوءٍ.',
    translation: 'The sky blackened and thunder roared. Lightning tears through the darkness like a sword of light. The winds howl like hungry wolves. Trees bend until they nearly break. Rain pours as if the sky weeps. The earth trembles beneath our feet. But every storm ends with calm.',
    grammaticalConcepts: ['تشبيه', 'فعل مضارع', 'جملة حالية'],
    vocabularyHighlights: [
      { word: 'اسْوَدَّت', meaning: 'blackened' },
      { word: 'هَدَرَ', meaning: 'roared' },
      { word: 'تَعْوي', meaning: 'howls' },
      { word: 'يَنْهَمِر', meaning: 'pours down' }
    ],
    moralLesson: 'Even the fiercest storms eventually pass.',
    moralLessonAr: 'حتى أعنف العواصف تمر في النهاية.',
    wordCount: 42
  },
  {
    id: 'b159',
    title: 'Blood on the Sand',
    titleAr: 'دَمٌ عَلى الرَّمْلِ',
    level: 'beginner',
    category: 'vivid-scenes',
    categoryAr: 'مشاهد حية',
    text: 'سَقَطَ الفارِسُ عَنْ جَوادِهِ. الدَّمُ يَنْزِفُ مِنْ جُرْحِهِ العَميقِ. الرَّمْلُ الأَصْفَرُ صارَ أَحْمَرَ. نَظَرَ إِلى السَّماءِ وَابْتَسَمَ. هَمَسَ: هَذا يَوْمي. ثُمَّ أَغْمَضَ عَيْنَيْهِ بِسَلامٍ. ماتَ وَهُوَ يُدافِعُ عَمّا يُحِبُّ.',
    translation: 'The horseman fell from his steed. Blood flows from his deep wound. The yellow sand turned red. He looked at the sky and smiled. He whispered: "This is my day." Then he closed his eyes in peace. He died defending what he loved.',
    grammaticalConcepts: ['فعل ماضي', 'جملة حالية', 'صفة'],
    vocabularyHighlights: [
      { word: 'الفارِس', meaning: 'horseman, knight' },
      { word: 'جَواد', meaning: 'steed, horse' },
      { word: 'يَنْزِف', meaning: 'bleeds' },
      { word: 'هَمَسَ', meaning: 'whispered' }
    ],
    moralLesson: 'Some find peace in sacrificing for what matters most.',
    moralLessonAr: 'البعض يجد السلام في التضحية من أجل ما يهم.',
    wordCount: 38
  },
  {
    id: 'b160',
    title: 'The Widow\'s Tears',
    titleAr: 'دُموعُ الأَرْمَلَةِ',
    level: 'beginner',
    category: 'vivid-scenes',
    categoryAr: 'مشاهد حية',
    text: 'جَلَسَتْ عِنْدَ القَبْرِ وَحْدَها. الدُّموعُ تَسيلُ عَلى خَدَّيْها كَالمَطَرِ. قَلْبُها يَحْتَرِقُ مِنَ الحُزْنِ. تَمَسُّ التُّرابَ بِيَدٍ مُرْتَجِفَةٍ. تَهْمِسُ: أَيْنَ أَنْتَ يا حَبيبي؟ الصَّمْتُ يُجيبُها. لَكِنَّها تَعْلَمُ أَنَّهُ في مَكانٍ أَفْضَلَ.',
    translation: 'She sat alone by the grave. Tears flow down her cheeks like rain. Her heart burns from grief. She touches the soil with a trembling hand. She whispers: "Where are you, my beloved?" Silence answers her. But she knows he is in a better place.',
    grammaticalConcepts: ['جملة حالية', 'تشبيه', 'نداء'],
    vocabularyHighlights: [
      { word: 'الأَرْمَلَة', meaning: 'widow' },
      { word: 'القَبْر', meaning: 'grave' },
      { word: 'يَحْتَرِق', meaning: 'burns' },
      { word: 'مُرْتَجِفَة', meaning: 'trembling' }
    ],
    moralLesson: 'Grief is the price of deep love.',
    moralLessonAr: 'الحزن هو ثمن الحب العميق.',
    wordCount: 40
  },
  {
    id: 'b161',
    title: 'The Hungry Wolf',
    titleAr: 'الذِّئْبُ الجائِعُ',
    level: 'beginner',
    category: 'vivid-scenes',
    categoryAr: 'مشاهد حية',
    text: 'عَيْناهُ تَتَوَهَّجانِ في الظَّلامِ. بَطْنُهُ فارِغٌ مُنْذُ أَيّامٍ. يَشُمُّ رائِحَةَ الدَّمِ في الهَواءِ. أَنْيابُهُ حادَّةٌ كَالسَّكاكينِ. يَتَسَلَّلُ بَيْنَ الصُّخورِ بِصَمْتٍ. فَجْأَةً يَنْقَضُّ عَلى فَريسَتِهِ. الطَّبيعَةُ قاسِيَةٌ لَكِنَّها عادِلَةٌ.',
    translation: 'His eyes glow in the darkness. His belly has been empty for days. He smells the scent of blood in the air. His fangs are sharp as knives. He creeps silently between the rocks. Suddenly he pounces on his prey. Nature is harsh but just.',
    grammaticalConcepts: ['جملة اسمية', 'تشبيه', 'ظرف زمان'],
    vocabularyHighlights: [
      { word: 'تَتَوَهَّج', meaning: 'glow' },
      { word: 'أَنْياب', meaning: 'fangs' },
      { word: 'يَتَسَلَّل', meaning: 'creeps, sneaks' },
      { word: 'يَنْقَضّ', meaning: 'pounces' }
    ],
    moralLesson: 'Survival demands both patience and decisive action.',
    moralLessonAr: 'البقاء يتطلب الصبر والعمل الحاسم.',
    wordCount: 38
  },
  {
    id: 'b162',
    title: 'Fire Consumes',
    titleAr: 'النّارُ تَلْتَهِمُ',
    level: 'beginner',
    category: 'vivid-scenes',
    categoryAr: 'مشاهد حية',
    text: 'الَّلهَبُ يَرْقُصُ عَلى الجُدْرانِ. الدُّخانُ الأَسْوَدُ يَمْلَأُ السَّماءَ. الحَرارَةُ تَلْسَعُ الوُجوهَ. صُراخُ الخائِفينَ يَمْزِقُ اللَّيْلَ. المَنْزِلُ الَّذي بَناهُ الجَدُّ يَتَحَوَّلُ إِلى رَمادٍ. لَكِنَّ الأُسْرَةَ نَجَتْ، وَالبَيْتُ يُمْكِنُ أَنْ يُبْنى مِنْ جَديدٍ.',
    translation: 'The flames dance on the walls. Black smoke fills the sky. The heat stings faces. The screams of the frightened tear through the night. The house the grandfather built turns to ash. But the family survived, and a home can be rebuilt.',
    grammaticalConcepts: ['فعل مضارع', 'اسم موصول', 'استدراك'],
    vocabularyHighlights: [
      { word: 'اللَّهَب', meaning: 'flames' },
      { word: 'تَلْسَع', meaning: 'stings, burns' },
      { word: 'صُراخ', meaning: 'screams' },
      { word: 'رَماد', meaning: 'ash' }
    ],
    moralLesson: 'Material things can be replaced; lives cannot.',
    moralLessonAr: 'الأشياء المادية يمكن تعويضها؛ الأرواح لا يمكن.',
    wordCount: 40
  },

  // ===== INTERMEDIATE (i148-i153) =====
  {
    id: 'i148',
    title: 'The Battle of Uhud',
    titleAr: 'يَوْمُ أُحُدٍ',
    level: 'intermediate',
    category: 'vivid-scenes',
    categoryAr: 'مشاهد حية',
    text: 'دارَتِ الدّائِرَةُ عَلى المُسْلِمينَ. السُّيوفُ تَصْطَكُّ وَالدِّماءُ تَسيلُ. حَمْزَةُ يُقاتِلُ كَالأَسَدِ الهائِجِ حَتّى سَقَطَ شَهيدًا. جُرِحَ النَّبِيُّ صَلّى اللهُ عَلَيْهِ وَسَلَّمَ في وَجْهِهِ الشَّريفِ، وَكُسِرَتْ رَباعِيَتُهُ. الأَرْضُ مُبَلَّلَةٌ بِدِماءِ الشُّهَداءِ. صاحَ المُشْرِكونَ: قُتِلَ مُحَمَّدٌ! لَكِنَّ النَّبِيَّ صامِدٌ يُنادي: إِلَيَّ عِبادَ اللهِ! فَالْتَفَّ حَوْلَهُ الصَّحابَةُ كَالدِّرْعِ الحَصينِ.',
    translation: 'The tide turned against the Muslims. Swords clash and blood flows. Hamza fights like a raging lion until he fell as a martyr. The Prophet, peace be upon him, was wounded in his noble face, and his tooth was broken. The earth is wet with martyrs\' blood. The polytheists shouted: "Muhammad is killed!" But the Prophet stands firm calling: "To me, servants of Allah!" And the companions gathered around him like an impenetrable shield.',
    grammaticalConcepts: ['مبني للمجهول', 'تشبيه', 'جملة حالية'],
    vocabularyHighlights: [
      { word: 'دارَت الدّائِرَة', meaning: 'the tide turned' },
      { word: 'تَصْطَكّ', meaning: 'clash' },
      { word: 'الهائِج', meaning: 'raging' },
      { word: 'رَباعِيَة', meaning: 'front tooth' }
    ],
    moralLesson: 'True leaders stand firm when others flee.',
    moralLessonAr: 'القادة الحقيقيون يصمدون عندما يفر الآخرون.',
    wordCount: 62
  },
  {
    id: 'i149',
    title: 'Lost in the Sandstorm',
    titleAr: 'ضائِعٌ في العاصِفَةِ الرَّمْلِيَّةِ',
    level: 'intermediate',
    category: 'vivid-scenes',
    categoryAr: 'مشاهد حية',
    text: 'الرَّمْلُ يَضْرِبُ الوَجْهَ كَالإِبَرِ الحارِقَةِ. الرُّؤْيَةُ صِفْرٌ، كَأَنَّ العالَمَ اخْتَفى. الرِّيحُ تَعْصِفُ بِقُوَّةٍ تَكادُ تَقْتَلِعُ الإِنْسانَ مِنْ مَكانِهِ. غَطّى فَمَهُ بِقِطْعَةِ قُماشٍ، لَكِنَّ الرَّمْلَ يَتَسَلَّلُ إِلى كُلِّ مَكانٍ. الجِمالُ تَئِنُّ وَتَرْفُضُ التَّقَدُّمَ. جَلَسَ خَلْفَ صَخْرَةٍ يَنْتَظِرُ نِهايَةَ الغَضَبِ. ساعاتٌ مَرَّتْ كَالسِّنينَ. ثُمَّ سَكَنَتِ العاصِفَةُ فَجْأَةً، وَعادَتِ الشَّمْسُ تَبْتَسِمُ كَأَنَّ شَيْئًا لَمْ يَكُنْ.',
    translation: 'Sand strikes the face like burning needles. Visibility is zero, as if the world disappeared. Wind blows with force nearly uprooting a man from his place. He covered his mouth with cloth, but sand infiltrates everywhere. The camels groan and refuse to advance. He sat behind a rock waiting for the fury to end. Hours passed like years. Then the storm suddenly calmed, and the sun returned smiling as if nothing had happened.',
    grammaticalConcepts: ['تشبيه', 'جملة حالية', 'فعل ماضي'],
    vocabularyHighlights: [
      { word: 'الإِبَر', meaning: 'needles' },
      { word: 'تَعْصِف', meaning: 'blows violently' },
      { word: 'تَئِنّ', meaning: 'groan, moan' },
      { word: 'سَكَنَت', meaning: 'calmed down' }
    ],
    moralLesson: 'Sometimes survival means waiting out the storm.',
    moralLessonAr: 'أحيانًا البقاء يعني انتظار انتهاء العاصفة.',
    wordCount: 64
  },
  {
    id: 'i150',
    title: 'The Mother\'s Scream',
    titleAr: 'صَرْخَةُ الأُمِّ',
    level: 'intermediate',
    category: 'vivid-scenes',
    categoryAr: 'مشاهد حية',
    text: 'صَرْخَةٌ مَزَّقَتِ الصَّمْتَ. الأُمُّ تَرْكُضُ نَحْوَ النَّهْرِ بِجُنونٍ. طِفْلُها يَغْرَقُ! قَفَزَتْ في الماءِ البارِدِ دونَ تَفْكيرٍ. المَوْجُ يَضْرِبُها وَالتَّيّارُ يَجُرُّها. لَكِنَّها تُقاوِمُ بِقُوَّةٍ لا تَمْلِكُها. وَصَلَتْ إِلى طِفْلِها وَأَمْسَكَتْهُ بِيَدَيْنِ لَنْ تَفْتَحَهُما المَنِيَّةُ. سَحَبَتْهُ إِلى الشّاطِئِ وَهِيَ تَلْهَثُ. نَظَرَتْ إِلَيْهِ وَبَكَتْ، ثُمَّ ضَحِكَتْ، ثُمَّ بَكَتْ مِنْ جَديدٍ.',
    translation: 'A scream tore through the silence. The mother runs toward the river in madness. Her child is drowning! She jumped into the cold water without thinking. Waves strike her and the current pulls her. But she resists with strength she doesn\'t possess. She reached her child and held him with hands that death itself won\'t open. She pulled him to shore, gasping. She looked at him and wept, then laughed, then wept again.',
    grammaticalConcepts: ['جملة حالية', 'فعل ماضي', 'نفي'],
    vocabularyHighlights: [
      { word: 'مَزَّقَت', meaning: 'tore' },
      { word: 'يَغْرَق', meaning: 'drowns' },
      { word: 'التَّيّار', meaning: 'current' },
      { word: 'تَلْهَث', meaning: 'gasps, pants' }
    ],
    moralLesson: 'A mother\'s love defies the limits of human strength.',
    moralLessonAr: 'حب الأم يتحدى حدود القوة البشرية.',
    wordCount: 63
  },
  {
    id: 'i151',
    title: 'The Executioner\'s Blade',
    titleAr: 'سَيْفُ الجَلّادِ',
    level: 'intermediate',
    category: 'vivid-scenes',
    categoryAr: 'مشاهد حية',
    text: 'رَكَعَ السَّجينُ في السّاحَةِ العامَّةِ. الجُمْهورُ صامِتٌ، وَالهَواءُ ثَقيلٌ. الجَلّادُ يَرْفَعُ سَيْفَهُ اللّامِعَ. سَأَلوهُ: هَلْ تُريدُ أَنْ تَقولَ شَيْئًا؟ رَفَعَ رَأْسَهُ وَقالَ: أَشْهَدُ أَنْ لا إِلَهَ إِلّا اللهُ. نَزَلَ السَّيْفُ. لَكِنَّ كَلِماتِهِ الأَخيرَةَ بَقِيَتْ تَرِنُّ في آذانِ الحاضِرينَ. الجَسَدُ يَموتُ، لَكِنَّ الرِّسالَةَ تَبْقى خالِدَةً.',
    translation: 'The prisoner knelt in the public square. The crowd is silent, and the air is heavy. The executioner raises his gleaming sword. They asked him: "Do you want to say something?" He raised his head and said: "I bear witness that there is no god but Allah." The sword descended. But his last words remained ringing in the ears of those present. The body dies, but the message remains eternal.',
    grammaticalConcepts: ['فعل ماضي', 'استفهام', 'استدراك'],
    vocabularyHighlights: [
      { word: 'الجَلّاد', meaning: 'executioner' },
      { word: 'اللّامِع', meaning: 'gleaming' },
      { word: 'تَرِنّ', meaning: 'rings, echoes' },
      { word: 'خالِدَة', meaning: 'eternal, immortal' }
    ],
    moralLesson: 'Conviction can make death a victory.',
    moralLessonAr: 'الإيمان يمكن أن يجعل الموت انتصارًا.',
    wordCount: 58
  },
  {
    id: 'i152',
    title: 'The Shipwreck',
    titleAr: 'الغَرَقُ',
    level: 'intermediate',
    category: 'vivid-scenes',
    categoryAr: 'مشاهد حية',
    text: 'تَحَطَّمَتِ السَّفينَةُ عَلى الصُّخورِ. الأَمْواجُ العاتِيَةُ تَبْتَلِعُ كُلَّ شَيْءٍ. البَحّارَةُ يَصْرُخونَ وَيَتَشَبَّثونَ بِالأَلْواحِ. الماءُ المالِحُ يَمْلَأُ الرِّئاتِ. الظَّلامُ يَلُفُّ كُلَّ شَيْءٍ. رَجُلٌ واحِدٌ يَسْبَحُ نَحْوَ ضَوْءٍ بَعيدٍ. ذِراعاهُ تَتَخَدَّرانِ مِنَ البَرْدِ. لَكِنَّهُ يَرْفُضُ الاسْتِسْلامَ. أَخيرًا لَمَسَتْ يَدُهُ الرَّمْلَ. سَقَطَ عَلى الشّاطِئِ وَبَكى كَالطِّفْلِ.',
    translation: 'The ship shattered on the rocks. Raging waves swallow everything. Sailors scream and cling to planks. Salt water fills lungs. Darkness wraps everything. One man swims toward a distant light. His arms go numb from cold. But he refuses to surrender. Finally, his hand touched sand. He collapsed on the shore and wept like a child.',
    grammaticalConcepts: ['فعل ماضي', 'جملة حالية', 'تشبيه'],
    vocabularyHighlights: [
      { word: 'تَحَطَّمَت', meaning: 'shattered' },
      { word: 'العاتِيَة', meaning: 'raging, fierce' },
      { word: 'يَتَشَبَّثون', meaning: 'cling to' },
      { word: 'تَتَخَدَّر', meaning: 'go numb' }
    ],
    moralLesson: 'The will to live can overcome impossible odds.',
    moralLessonAr: 'إرادة الحياة تتغلب على المستحيل.',
    wordCount: 59
  },
  {
    id: 'i153',
    title: 'The Famine',
    titleAr: 'المَجاعَةُ',
    level: 'intermediate',
    category: 'vivid-scenes',
    categoryAr: 'مشاهد حية',
    text: 'عامُ الرَّمادَةِ. الأَرْضُ قاحِلَةٌ وَالسَّماءُ بَخيلَةٌ. النّاسُ يَأْكُلونَ أَوْراقَ الشَّجَرِ وَجُلودَ الحَيَواناتِ. الأَطْفالُ يَبْكونَ مِنَ الجوعِ حَتّى لا تَبْقى لَهُمْ دُموعٌ. عُمَرُ بْنُ الخَطّابِ يَمْشي بَيْنَ الخِيامِ، بَطْنُهُ خاوِيَةٌ كَبُطونِهِمْ. يَرْفُضُ أَنْ يَأْكُلَ ما لا يَأْكُلُهُ أَفْقَرُ رَعِيَّتِهِ. قالَ: لَنْ أَشْبَعَ حَتّى يَشْبَعَ آخِرُ جائِعٍ في دَوْلَتي.',
    translation: 'The Year of Ashes. The land is barren and the sky is stingy. People eat tree leaves and animal hides. Children cry from hunger until no tears remain. Umar ibn al-Khattab walks among the tents, his belly empty like theirs. He refuses to eat what the poorest of his subjects cannot eat. He said: "I will not be full until the last hungry person in my state is full."',
    grammaticalConcepts: ['جملة اسمية', 'نفي', 'جملة شرطية'],
    vocabularyHighlights: [
      { word: 'الرَّمادَة', meaning: 'Year of Ashes (famine)' },
      { word: 'قاحِلَة', meaning: 'barren' },
      { word: 'خاوِيَة', meaning: 'empty' },
      { word: 'رَعِيَّة', meaning: 'subjects, people' }
    ],
    moralLesson: 'True leadership means sharing the suffering of your people.',
    moralLessonAr: 'القيادة الحقيقية تعني مشاركة معاناة شعبك.',
    wordCount: 61
  },

  // ===== ADVANCED (a143-a148) =====
  {
    id: 'a143',
    title: 'The Siege of Baghdad',
    titleAr: 'حِصارُ بَغْدادَ',
    level: 'advanced',
    category: 'vivid-scenes',
    categoryAr: 'مشاهد حية',
    text: 'سَنَةُ سِتِّ مِئَةٍ وَسِتٍّ وَخَمْسينَ. جُيوشُ المَغولِ تُحاصِرُ مَدينَةَ السَّلامِ. صَريرُ المَنْجَنيقاتِ يُمَزِّقُ الهَواءَ، وَكُراتُ النّارِ تَسْقُطُ كَالنُّجومِ السّاقِطَةِ. الأَسْوارُ الَّتي صَمَدَتْ خَمْسَةَ قُرونٍ تَتَداعى. دِجْلَةُ يَجْري أَسْوَدَ مِنْ حِبْرِ الكُتُبِ المُلْقاةِ فيهِ، ثُمَّ أَحْمَرَ مِنْ دِماءِ العُلَماءِ وَالشُّعَراءِ. مَكْتَبَةُ بَيْتِ الحِكْمَةِ تَحْتَرِقُ، وَمَعَها أَلْفُ سَنَةٍ مِنَ المَعْرِفَةِ. الخَليفَةُ المُسْتَعْصِمُ يُساقُ إِلى حَتْفِهِ ذَليلًا. لَيْلَةٌ سَوْداءُ في تاريخِ الإِنْسانِيَّةِ.',
    translation: 'The year six hundred and fifty-six. Mongol armies besiege the City of Peace. The creaking of catapults tears the air, and fireballs fall like falling stars. Walls that stood for five centuries crumble. The Tigris runs black from the ink of books thrown in it, then red from the blood of scholars and poets. The library of the House of Wisdom burns, and with it a thousand years of knowledge. The Caliph al-Musta\'sim is led to his death humiliated. A black night in the history of humanity.',
    grammaticalConcepts: ['عدد', 'اسم موصول', 'جملة حالية'],
    vocabularyHighlights: [
      { word: 'المَنْجَنيقات', meaning: 'catapults' },
      { word: 'تَتَداعى', meaning: 'crumbles' },
      { word: 'بَيْت الحِكْمَة', meaning: 'House of Wisdom' },
      { word: 'حَتْف', meaning: 'death, doom' }
    ],
    moralLesson: 'Civilizations can fall in a single day, but their legacy echoes forever.',
    moralLessonAr: 'الحضارات قد تسقط في يوم واحد، لكن إرثها يتردد إلى الأبد.',
    wordCount: 78
  },
  {
    id: 'a144',
    title: 'Bilal Under the Boulder',
    titleAr: 'بِلالٌ تَحْتَ الصَّخْرَةِ',
    level: 'advanced',
    category: 'vivid-scenes',
    categoryAr: 'مشاهد حية',
    text: 'شَمْسُ مَكَّةَ تَشْوي الرِّمالَ. بِلالٌ مُلْقًى عَلى ظَهْرِهِ، وَصَخْرَةٌ عَظيمَةٌ تَسْحَقُ صَدْرَهُ. العَرَقُ يَخْتَلِطُ بِالدَّمِ. أُمَيَّةُ بْنُ خَلَفٍ يَصْرُخُ: اكْفُرْ بِمُحَمَّدٍ! لَكِنَّ الصَّوْتَ الخارِجَ مِنْ تَحْتِ الصَّخْرَةِ يَقولُ: أَحَدٌ أَحَدٌ. يَزيدونَ الصَّخْرَةَ ثِقَلًا، فَيَزيدُ هُوَ إِيمانًا. جِلْدُهُ الأَسْوَدُ يَحْتَرِقُ عَلى الرَّمْلِ المُلْتَهِبِ، لَكِنَّ قَلْبَهُ أَبْرَدُ مِنَ الثَّلْجِ يَقينًا. هَكَذا يُصْنَعُ الرِّجالُ: تَحْتَ الصُّخورِ وَفي قَلْبِ النّارِ.',
    translation: 'Mecca\'s sun roasts the sand. Bilal lies on his back, a great boulder crushing his chest. Sweat mixes with blood. Umayyah ibn Khalaf screams: "Disbelieve in Muhammad!" But the voice from under the rock says: "One, One." They add weight to the boulder, and he increases in faith. His black skin burns on the scorching sand, but his heart is colder than snow in certainty. Thus are men made: under boulders and in the heart of fire.',
    grammaticalConcepts: ['جملة حالية', 'مقابلة', 'أمر'],
    vocabularyHighlights: [
      { word: 'تَشْوي', meaning: 'roasts' },
      { word: 'تَسْحَق', meaning: 'crushes' },
      { word: 'المُلْتَهِب', meaning: 'scorching, blazing' },
      { word: 'يَقينًا', meaning: 'in certainty' }
    ],
    moralLesson: 'True faith transforms torture into triumph.',
    moralLessonAr: 'الإيمان الحقيقي يحول التعذيب إلى انتصار.',
    wordCount: 76
  },
  {
    id: 'a145',
    title: 'The Plague of Amwas',
    titleAr: 'طاعونُ عَمَواسَ',
    level: 'advanced',
    category: 'vivid-scenes',
    categoryAr: 'مشاهد حية',
    text: 'المَوْتُ الأَسْوَدُ يَحْصُدُ الشّامَ حَصْدًا. كُلَّ يَوْمٍ يَسْقُطُ أَلْفٌ. الجُثَثُ تَمْلَأُ الشَّوارِعَ، وَرائِحَةُ المَوْتِ تَخْنُقُ الهَواءَ. أَبو عُبَيْدَةَ بْنُ الجَرّاحِ، أَمينُ هَذِهِ الأُمَّةِ، يُصابُ بِالطّاعونِ. نَظَرَ إِلى إِصْبَعِهِ المُتَوَرِّمِ وَابْتَسَمَ: نِعْمَ البَثْرَةُ هَذِهِ! مُعاذُ بْنُ جَبَلٍ يَخْطُبُ وَالحُمّى تَهُزُّ جَسَدَهُ: لا تَكْرَهوا هَذا الطّاعونَ، فَإِنَّهُ رَحْمَةُ رَبِّكُمْ وَدَعْوَةُ نَبِيِّكُمْ. ماتَ في ذَلِكَ العامِ خَمْسَةٌ وَعِشْرونَ أَلْفًا مِنْ خَيْرَةِ الصَّحابَةِ وَالتّابِعينَ.',
    translation: 'The Black Death reaps the Levant completely. Each day a thousand fall. Corpses fill the streets, and the smell of death chokes the air. Abu Ubaydah ibn al-Jarrah, the trustee of this nation, is struck with plague. He looked at his swollen finger and smiled: "What an excellent pustule this is!" Mu\'adh ibn Jabal preaches while fever shakes his body: "Do not hate this plague, for it is your Lord\'s mercy and your Prophet\'s invitation." In that year, twenty-five thousand of the finest Companions and Followers died.',
    grammaticalConcepts: ['مفعول مطلق', 'نهي', 'عدد'],
    vocabularyHighlights: [
      { word: 'يَحْصُد', meaning: 'reaps, harvests' },
      { word: 'الجُثَث', meaning: 'corpses' },
      { word: 'المُتَوَرِّم', meaning: 'swollen' },
      { word: 'البَثْرَة', meaning: 'pustule, blister' }
    ],
    moralLesson: 'Faith transforms even death into divine mercy.',
    moralLessonAr: 'الإيمان يحول حتى الموت إلى رحمة إلهية.',
    wordCount: 82
  },
  {
    id: 'a146',
    title: 'The Massacre of Karbala',
    titleAr: 'مَذْبَحَةُ كَرْبَلاءَ',
    level: 'advanced',
    category: 'vivid-scenes',
    categoryAr: 'مشاهد حية',
    text: 'العاشِرُ مِنْ مُحَرَّمٍ. الحُسَيْنُ وَأَهْلُ بَيْتِهِ مُحاصَرونَ في صَحْراءَ كَرْبَلاءَ. العَطَشُ يَقْتُلُهُمْ قَبْلَ السُّيوفِ. الفُراتُ أَمامَهُمْ، لَكِنَّهُمْ مَمْنوعونَ مِنَ الماءِ. واحِدًا واحِدًا يَسْقُطُ رِجالُهُ. حَمَلَ طِفْلَهُ الرَّضيعَ يَطْلُبُ لَهُ الماءَ، فَأَصابَهُ سَهْمٌ في حَلْقِهِ. الدَّمُ يَسيلُ عَلى يَدَيِ الأَبِ المَفْجوعِ. ثُمَّ تَقَدَّمَ الحُسَيْنُ وَحْدَهُ نَحْوَ الآلافِ. قاتَلَ حَتّى قُطِعَتْ يَداهُ، ثُمَّ سَقَطَ مَضْرِجًا بِدَمِهِ. يَوْمٌ لَمْ تَرَ الشَّمْسُ أَبْشَعَ مِنْهُ.',
    translation: 'The tenth of Muharram. Husayn and his household are besieged in the desert of Karbala. Thirst kills them before swords. The Euphrates is before them, but they are forbidden water. One by one his men fall. He carried his nursing infant asking for water, and an arrow struck him in the throat. Blood flows over the grieving father\'s hands. Then Husayn advanced alone toward the thousands. He fought until his hands were severed, then fell drenched in his blood. A day more horrific the sun never witnessed.',
    grammaticalConcepts: ['مبني للمجهول', 'جملة حالية', 'تفضيل'],
    vocabularyHighlights: [
      { word: 'مَذْبَحَة', meaning: 'massacre' },
      { word: 'الرَّضيع', meaning: 'nursing infant' },
      { word: 'المَفْجوع', meaning: 'grieving, bereaved' },
      { word: 'مَضْرِجًا', meaning: 'drenched, soaked' }
    ],
    moralLesson: 'Standing for principle can cost everything yet gain eternity.',
    moralLessonAr: 'الوقوف على المبدأ قد يكلف كل شيء لكنه يكسب الخلود.',
    wordCount: 85
  },
  {
    id: 'a147',
    title: 'The Drowning Ship of Refugees',
    titleAr: 'سَفينَةُ اللّاجِئينَ الغارِقَةُ',
    level: 'advanced',
    category: 'vivid-scenes',
    categoryAr: 'مشاهد حية',
    text: 'قارِبٌ صَغيرٌ يَحْمِلُ مِئَةَ نَفْسٍ في مَكانٍ لا يَتَّسِعُ لِعِشْرينَ. البَحْرُ المُتَوَسِّطُ يَتَحَوَّلُ إِلى قَبْرٍ. الأَمْواجُ تَرْتَفِعُ كَالجِبالِ. الأُمَّهاتُ يُشَدِّدْنَ قَبْضَتَهُنَّ عَلى أَطْفالِهِنَّ. ثُمَّ يَنْقَلِبُ القارِبُ. صُراخٌ يَخْتَلِطُ بِصَوْتِ المَوْجِ. أَيْدٍ صَغيرَةٌ تَمْتَدُّ نَحْوَ السَّماءِ ثُمَّ تَخْتَفي. في الصَّباحِ، جُثَثٌ صَغيرَةٌ تَطْفو عَلى الشّاطِئِ. هَرَبوا مِنَ المَوْتِ فَوَجَدوهُ في الطَّريقِ. العالَمُ يُشاهِدُ وَيَصْمُتُ. هَذا عارُ القَرْنِ الواحِدِ وَالعِشْرينَ.',
    translation: 'A small boat carries a hundred souls in space that doesn\'t fit twenty. The Mediterranean turns into a grave. Waves rise like mountains. Mothers tighten their grip on their children. Then the boat capsizes. Screams mix with the sound of waves. Small hands reach toward the sky then disappear. In the morning, small corpses float on the shore. They fled from death and found it on the way. The world watches and stays silent. This is the shame of the twenty-first century.',
    grammaticalConcepts: ['عدد', 'جملة حالية', 'تشبيه'],
    vocabularyHighlights: [
      { word: 'يَتَّسِع', meaning: 'fits, accommodates' },
      { word: 'يَنْقَلِب', meaning: 'capsizes, overturns' },
      { word: 'تَطْفو', meaning: 'float' },
      { word: 'عار', meaning: 'shame, disgrace' }
    ],
    moralLesson: 'Indifference to suffering is humanity\'s greatest sin.',
    moralLessonAr: 'اللامبالاة بالمعاناة هي أعظم خطيئة للإنسانية.',
    wordCount: 80
  },
  {
    id: 'a148',
    title: 'The Final Breath',
    titleAr: 'النَّفَسُ الأَخيرُ',
    level: 'advanced',
    category: 'vivid-scenes',
    categoryAr: 'مشاهد حية',
    text: 'الغُرْفَةُ صامِتَةٌ إِلّا مِنْ صَوْتِ الأَنْفاسِ المُتَقَطِّعَةِ. الشَّيْخُ يَرْقُدُ عَلى فِراشِهِ، جِلْدُهُ شَفّافٌ كَالوَرَقِ. أَبْناؤُهُ يُحيطونَ بِهِ، دُموعُهُمْ حَبيسَةٌ في عُيونِهِمْ. فَتَحَ عَيْنَيْهِ فَجْأَةً وَابْتَسَمَ ابْتِسامَةً غَريبَةً. هَمَسَ: أَرى ما لا تَرَوْنَ. مَلائِكَةً في ثِيابٍ بَيْضاءَ. ثُمَّ تَلا: يا أَيَّتُها النَّفْسُ المُطْمَئِنَّةُ ارْجِعي إِلى رَبِّكِ راضِيَةً مَرْضِيَّةً. خَرَجَ نَفَسُهُ الأَخيرُ كَالنَّسيمِ، وَعَلى وَجْهِهِ سَكينَةٌ لَمْ يَعْرِفوها مِنْ قَبْلُ. المَوْتُ لَيْسَ نِهايَةً، بَلْ بابٌ يُفْتَحُ عَلى الأَبَدِيَّةِ.',
    translation: 'The room is silent except for the sound of labored breathing. The old man lies on his bed, his skin transparent as paper. His sons surround him, their tears imprisoned in their eyes. He suddenly opened his eyes and smiled a strange smile. He whispered: "I see what you do not see. Angels in white garments." Then he recited: "O tranquil soul, return to your Lord, pleased and pleasing." His final breath left like a breeze, and on his face was a serenity they never knew before. Death is not an end, but a door opening to eternity.',
    grammaticalConcepts: ['استثناء', 'تشبيه', 'نداء'],
    vocabularyHighlights: [
      { word: 'المُتَقَطِّعَة', meaning: 'labored, intermittent' },
      { word: 'شَفّاف', meaning: 'transparent' },
      { word: 'حَبيسَة', meaning: 'imprisoned, held back' },
      { word: 'الأَبَدِيَّة', meaning: 'eternity' }
    ],
    moralLesson: 'A life well-lived transforms death into a peaceful homecoming.',
    moralLessonAr: 'الحياة الطيبة تحول الموت إلى عودة سلمية للوطن.',
    wordCount: 88
  }
];
