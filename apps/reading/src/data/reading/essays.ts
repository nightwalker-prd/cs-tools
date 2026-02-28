// src/data/reading/essays.ts
// Contemporary Arabic Essays & Reflections (مقالات وتأملات)
// Philosophical reflections in classical Arabic style

import { ReadingText } from './types';

export const essayTexts: ReadingText[] = [
  // ============================================
  // BEGINNER ESSAYS (b91-b96)
  // Simple reflective pieces ~30 words
  // ============================================
  {
    "id": "b91",
    "title": "The Morning",
    "titleAr": "الصَّبَاحُ",
    "level": "beginner",
    "category": "Essays & Reflections",
    "categoryAr": "مقالات وتأملات",
    "text": "أُحِبُّ الصَّبَاحَ الْبَاكِرَ. الشَّمْسُ تَطْلُعُ بِهُدُوءٍ. الطُّيُورُ تُغَنِّي فَوْقَ الْأَشْجَارِ. الْهَوَاءُ نَقِيٌّ وَبَارِدٌ. فِي الصَّبَاحِ أَشْعُرُ بِالْأَمَلِ. كُلُّ يَوْمٍ جَدِيدٍ هَدِيَّةٌ مِنَ اللهِ.",
    "translation": "I love the early morning. The sun rises quietly. The birds sing above the trees. The air is pure and cool. In the morning I feel hope. Every new day is a gift from Allah.",
    "grammaticalConcepts": [
      "Present tense verbs (أحب، تطلع، تغني، أشعر)",
      "Nominal sentences (الهواء نقي)",
      "Prepositions (في، فوق، من، بـ)",
      "Adjectives (باكر، نقي، بارد، جديد)",
      "Idafa (هدية من الله)"
    ],
    "vocabularyHighlights": [
      { "word": "الصَّبَاح الْبَاكِر", "meaning": "early morning" },
      { "word": "بِهُدُوءٍ", "meaning": "quietly, calmly" },
      { "word": "نَقِيّ", "meaning": "pure, clean" },
      { "word": "أَشْعُرُ", "meaning": "I feel" },
      { "word": "هَدِيَّة", "meaning": "gift" }
    ],
    "moralLesson": "Each morning offers a fresh start. Finding beauty in simple moments—sunrise, birdsong, fresh air—cultivates gratitude and hope.",
    "moralLessonAr": "كل صباح يقدم بداية جديدة. إيجاد الجمال في اللحظات البسيطة—شروق الشمس، غناء الطيور، الهواء النقي—يغرس الامتنان والأمل.",
    "wordCount": 30
  },
  {
    "id": "b92",
    "title": "The Tree",
    "titleAr": "الشَّجَرَةُ",
    "level": "beginner",
    "category": "Essays & Reflections",
    "categoryAr": "مقالات وتأملات",
    "text": "فِي حَدِيقَةِ بَيْتِنَا شَجَرَةٌ كَبِيرَةٌ. زَرَعَهَا جَدِّي قَبْلَ خَمْسِينَ سَنَةً. أَجْلِسُ تَحْتَهَا وَأَقْرَأُ. تُعْطِينِي ظِلًّا فِي الصَّيْفِ. الشَّجَرَةُ صَدِيقَةٌ صَامِتَةٌ. تَكْبُرُ مَعَنَا وَتَحْفَظُ ذِكْرَيَاتِنَا.",
    "translation": "In our home's garden there is a big tree. My grandfather planted it fifty years ago. I sit under it and read. It gives me shade in the summer. The tree is a silent friend. It grows with us and keeps our memories.",
    "grammaticalConcepts": [
      "Idafa chains (حديقة بيتنا)",
      "Past tense (زرعها)",
      "Present tense (أجلس، أقرأ، تعطيني، تكبر)",
      "Attached pronouns (بيتنا، جدي، تحتها)",
      "Adjective agreement (شجرة كبيرة، صديقة صامتة)"
    ],
    "vocabularyHighlights": [
      { "word": "حَدِيقَة", "meaning": "garden" },
      { "word": "زَرَعَ", "meaning": "planted" },
      { "word": "ظِلّ", "meaning": "shade, shadow" },
      { "word": "صَامِتَة", "meaning": "silent" },
      { "word": "ذِكْرَيَات", "meaning": "memories" }
    ],
    "moralLesson": "Trees connect generations. What our ancestors planted, we enjoy. What we plant, our descendants will enjoy. Nature holds our collective memory.",
    "moralLessonAr": "الأشجار تربط الأجيال. ما زرعه أجدادنا، نستمتع به. ما نزرعه، سيستمتع به أحفادنا. الطبيعة تحفظ ذاكرتنا الجماعية.",
    "wordCount": 32
  },
  {
    "id": "b93",
    "title": "The Book",
    "titleAr": "الْكِتَابُ",
    "level": "beginner",
    "category": "Essays & Reflections",
    "categoryAr": "مقالات وتأملات",
    "text": "الْكِتَابُ صَدِيقٌ لَا يَخُونُ. يُحَدِّثُنِي بِلَا صَوْتٍ. يَأْخُذُنِي إِلَى أَمَاكِنَ بَعِيدَةٍ. أَتَعَلَّمُ مِنْهُ كُلَّ يَوْمٍ شَيْئًا جَدِيدًا. الْقِرَاءَةُ رِحْلَةٌ بِلَا تَذْكِرَةٍ. مَنْ يَقْرَأُ لَا يَشْعُرُ بِالْوَحْدَةِ أَبَدًا.",
    "translation": "The book is a friend that does not betray. It speaks to me without voice. It takes me to distant places. I learn from it something new every day. Reading is a journey without a ticket. Whoever reads never feels loneliness.",
    "grammaticalConcepts": [
      "Nominal sentences (الكتاب صديق، القراءة رحلة)",
      "Negation with لا (لا يخون، بلا صوت)",
      "Present tense verbs (يحدثني، يأخذني، أتعلم)",
      "Relative clause (صديق لا يخون)",
      "Conditional (من يقرأ لا يشعر)"
    ],
    "vocabularyHighlights": [
      { "word": "يَخُونُ", "meaning": "betrays" },
      { "word": "يُحَدِّثُنِي", "meaning": "speaks to me" },
      { "word": "أَمَاكِن بَعِيدَة", "meaning": "distant places" },
      { "word": "تَذْكِرَة", "meaning": "ticket" },
      { "word": "الْوَحْدَة", "meaning": "loneliness" }
    ],
    "moralLesson": "Books are loyal companions that transport us beyond our physical limitations. Reading conquers loneliness and opens infinite worlds.",
    "moralLessonAr": "الكتب رفاق مخلصون ينقلوننا إلى ما وراء حدودنا المادية. القراءة تغلب الوحدة وتفتح عوالم لا نهائية.",
    "wordCount": 31
  },
  {
    "id": "b94",
    "title": "Rain",
    "titleAr": "الْمَطَرُ",
    "level": "beginner",
    "category": "Essays & Reflections",
    "categoryAr": "مقالات وتأملات",
    "text": "يَنْزِلُ الْمَطَرُ مِنَ السَّمَاءِ. أَسْمَعُ صَوْتَهُ عَلَى النَّافِذَةِ. رَائِحَةُ الْأَرْضِ بَعْدَ الْمَطَرِ جَمِيلَةٌ. يَفْرَحُ الْفَلَّاحُ وَتَفْرَحُ الْأَشْجَارُ. الْمَطَرُ رَحْمَةٌ مِنَ السَّمَاءِ. كُلُّ قَطْرَةٍ تَحْمِلُ الْحَيَاةَ.",
    "translation": "Rain falls from the sky. I hear its sound on the window. The smell of the earth after rain is beautiful. The farmer rejoices and the trees rejoice. Rain is mercy from the sky. Every drop carries life.",
    "grammaticalConcepts": [
      "Present tense verbs (ينزل، أسمع، يفرح، تحمل)",
      "Idafa (صوته، رائحة الأرض)",
      "Prepositions (من، على، بعد)",
      "Adjective (جميلة)",
      "Nominal sentence (المطر رحمة)"
    ],
    "vocabularyHighlights": [
      { "word": "يَنْزِلُ", "meaning": "descends, falls" },
      { "word": "النَّافِذَة", "meaning": "window" },
      { "word": "رَائِحَة", "meaning": "smell, scent" },
      { "word": "الْفَلَّاح", "meaning": "farmer" },
      { "word": "قَطْرَة", "meaning": "drop" }
    ],
    "moralLesson": "Rain is divine mercy that brings life to earth and joy to hearts. Even simple natural phenomena reveal profound blessings when we pay attention.",
    "moralLessonAr": "المطر رحمة إلهية تجلب الحياة للأرض والفرح للقلوب. حتى الظواهر الطبيعية البسيطة تكشف نعماً عميقة عندما ننتبه.",
    "wordCount": 32
  },
  {
    "id": "b95",
    "title": "The Moon",
    "titleAr": "الْقَمَرُ",
    "level": "beginner",
    "category": "Essays & Reflections",
    "categoryAr": "مقالات وتأملات",
    "text": "فِي اللَّيْلِ أَنْظُرُ إِلَى الْقَمَرِ. ضَوْءُهُ هَادِئٌ وَلَطِيفٌ. يُضِيءُ الطَّرِيقَ لِلْمُسَافِرِينَ. نَفْسُ الْقَمَرِ يَرَاهُ النَّاسُ فِي كُلِّ مَكَانٍ. يَرْبِطُ الْبَعِيدِينَ بِخَيْطٍ مِنْ نُورٍ. الْقَمَرُ شَاهِدٌ عَلَى كُلِّ اللَّيَالِي.",
    "translation": "At night I look at the moon. Its light is calm and gentle. It illuminates the path for travelers. The same moon is seen by people everywhere. It connects the distant with a thread of light. The moon is a witness to all nights.",
    "grammaticalConcepts": [
      "Present tense (أنظر، يضيء، يراه، يربط)",
      "Adjectives (هادئ، لطيف)",
      "Idafa (ضوءه، خيط من نور)",
      "Prepositions (في، إلى، لـ)",
      "Passive meaning (يراه الناس)"
    ],
    "vocabularyHighlights": [
      { "word": "ضَوْء", "meaning": "light" },
      { "word": "هَادِئ", "meaning": "calm, quiet" },
      { "word": "يُضِيءُ", "meaning": "illuminates" },
      { "word": "الْمُسَافِرِين", "meaning": "travelers" },
      { "word": "شَاهِد", "meaning": "witness" }
    ],
    "moralLesson": "The moon reminds us of our shared humanity. When we look up at night, we share that moment with millions across the world. We are connected even when apart.",
    "moralLessonAr": "القمر يذكرنا بإنسانيتنا المشتركة. عندما ننظر للأعلى ليلاً، نشارك تلك اللحظة مع الملايين حول العالم. نحن متصلون حتى عندما نكون متباعدين.",
    "wordCount": 35
  },
  {
    "id": "b96",
    "title": "The Old House",
    "titleAr": "الْبَيْتُ الْقَدِيمُ",
    "level": "beginner",
    "category": "Essays & Reflections",
    "categoryAr": "مقالات وتأملات",
    "text": "أَتَذَكَّرُ بَيْتَ جَدَّتِي الْقَدِيمَ. كَانَ صَغِيرًا لَكِنَّهُ كَانَ دَافِئًا. رَائِحَةُ الْخُبْزِ تَمْلَأُ الْمَطْبَخَ. صَوْتُ جَدَّتِي يَمْلَأُ الْبَيْتَ. الْبُيُوتُ لَيْسَتْ جُدْرَانًا. الْبُيُوتُ ذِكْرَيَاتٌ وَحُبٌّ.",
    "translation": "I remember my grandmother's old house. It was small but it was warm. The smell of bread filled the kitchen. My grandmother's voice filled the house. Houses are not walls. Houses are memories and love.",
    "grammaticalConcepts": [
      "Past tense with كان (كان صغيراً، كان دافئاً)",
      "Present tense (أتذكر، تملأ، يملأ)",
      "Idafa (بيت جدتي، رائحة الخبز، صوت جدتي)",
      "Negation with ليس (ليست جدراناً)",
      "Nominal predicate (البيوت ذكريات)"
    ],
    "vocabularyHighlights": [
      { "word": "أَتَذَكَّرُ", "meaning": "I remember" },
      { "word": "دَافِئ", "meaning": "warm" },
      { "word": "رَائِحَة الْخُبْز", "meaning": "smell of bread" },
      { "word": "الْمَطْبَخ", "meaning": "kitchen" },
      { "word": "جُدْرَان", "meaning": "walls" }
    ],
    "moralLesson": "A home is not defined by its physical structure but by the love and memories it holds. The simplest houses can contain the richest treasures.",
    "moralLessonAr": "البيت لا يُعرَّف ببنائه المادي بل بالحب والذكريات التي يحتويها. أبسط البيوت يمكن أن تحتوي على أغنى الكنوز.",
    "wordCount": 30
  },

  // ============================================
  // INTERMEDIATE ESSAYS (i82-i87)
  // Deeper reflections ~55 words
  // ============================================
  {
    "id": "i82",
    "title": "Seasons of Life",
    "titleAr": "فُصُولُ الْحَيَاةِ",
    "level": "intermediate",
    "category": "Essays & Reflections",
    "categoryAr": "مقالات وتأملات",
    "text": "الْحَيَاةُ كَالسَّنَةِ لَهَا فُصُولٌ أَرْبَعَةٌ. الطُّفُولَةُ رَبِيعٌ مَلِيءٌ بِالْبَرَاءَةِ وَالدَّهْشَةِ. الشَّبَابُ صَيْفٌ حَارٌّ مَلِيءٌ بِالطَّاقَةِ وَالْأَحْلَامِ. الْكُهُولَةُ خَرِيفٌ يَجْمَعُ ثِمَارَ الْعُمُرِ. وَالشَّيْخُوخَةُ شِتَاءٌ هَادِئٌ لِلتَّأَمُّلِ وَالْحِكْمَةِ. كُلُّ فَصْلٍ لَهُ جَمَالُهُ الْخَاصُّ. لَا يَنْبَغِي أَنْ نَسْتَعْجِلَ فَصْلًا وَلَا أَنْ نَحْزَنَ عَلَى فَصْلٍ مَضَى. الْحِكْمَةُ أَنْ نَعِيشَ كُلَّ فَصْلٍ بِكَمَالِهِ.",
    "translation": "Life is like the year—it has four seasons. Childhood is a spring full of innocence and wonder. Youth is a hot summer full of energy and dreams. Middle age is an autumn that gathers the fruits of life. And old age is a quiet winter for contemplation and wisdom. Each season has its own beauty. We should not rush a season nor grieve over a season that has passed. Wisdom is to live each season in its fullness.",
    "grammaticalConcepts": [
      "Simile with كـ (كالسنة)",
      "Nominal sentences as metaphors (الطفولة ربيع)",
      "Active participle (مليء)",
      "Relative clause (فصل مضى)",
      "Negation with لا ينبغي",
      "Masdar (التأمل، الحكمة)"
    ],
    "vocabularyHighlights": [
      { "word": "فُصُول", "meaning": "seasons" },
      { "word": "الْبَرَاءَة", "meaning": "innocence" },
      { "word": "الدَّهْشَة", "meaning": "wonder, amazement" },
      { "word": "الْكُهُولَة", "meaning": "middle age" },
      { "word": "الشَّيْخُوخَة", "meaning": "old age" },
      { "word": "نَسْتَعْجِلَ", "meaning": "we rush" }
    ],
    "moralLesson": "Life unfolds in natural stages, each with its unique gifts. Rushing through youth or lamenting aging wastes the present moment. True wisdom embraces each phase fully.",
    "moralLessonAr": "الحياة تتكشف في مراحل طبيعية، لكل منها هداياها الفريدة. التسرع في الشباب أو الحزن على الشيخوخة يهدر اللحظة الحاضرة. الحكمة الحقيقية تحتضن كل مرحلة بالكامل.",
    "wordCount": 55
  },
  {
    "id": "i83",
    "title": "The Traveler's Heart",
    "titleAr": "قَلْبُ الْمُسَافِرِ",
    "level": "intermediate",
    "category": "Essays & Reflections",
    "categoryAr": "مقالات وتأملات",
    "text": "لِلسَّفَرِ سِحْرٌ لَا يَفْهَمُهُ إِلَّا مَنْ غَادَرَ بَيْتَهُ. عِنْدَمَا نُسَافِرُ، نَتْرُكُ الْمَأْلُوفَ وَرَاءَنَا. نَكْتَشِفُ عَوَالِمَ جَدِيدَةً وَوُجُوهًا غَرِيبَةً. لَكِنَّ أَهَمَّ اكْتِشَافٍ هُوَ أَنْفُسُنَا. فِي الْغُرْبَةِ نَعْرِفُ مَنْ نَحْنُ حَقًّا. السَّفَرُ يُعَلِّمُنَا التَّوَاضُعَ أَمَامَ اتِّسَاعِ الْعَالَمِ. وَيُعَلِّمُنَا الشُّكْرَ لِلْوَطَنِ الَّذِي تَرَكْنَاهُ. الْمُسَافِرُ الْحَقِيقِيُّ لَا يَعُودُ كَمَا كَانَ.",
    "translation": "Travel has a magic that only those who left their homes understand. When we travel, we leave the familiar behind. We discover new worlds and strange faces. But the most important discovery is ourselves. In foreignness we know who we truly are. Travel teaches us humility before the vastness of the world. And it teaches us gratitude for the homeland we left. The true traveler does not return as he was.",
    "grammaticalConcepts": [
      "Exception with إلا (لا يفهمه إلا من)",
      "Conditional (عندما نسافر)",
      "Inna with sisters (لكنّ أهم)",
      "Relative clauses (الوطن الذي تركناه)",
      "Negation (لا يعود)",
      "Masdar (اكتشاف، التواضع، الشكر)"
    ],
    "vocabularyHighlights": [
      { "word": "سِحْر", "meaning": "magic" },
      { "word": "الْمَأْلُوف", "meaning": "the familiar" },
      { "word": "نَكْتَشِفُ", "meaning": "we discover" },
      { "word": "الْغُرْبَة", "meaning": "foreignness, being away from home" },
      { "word": "التَّوَاضُع", "meaning": "humility" },
      { "word": "اتِّسَاع", "meaning": "vastness, expanse" }
    ],
    "moralLesson": "Travel is ultimately a journey inward. Encountering the unfamiliar reveals our assumptions, teaches humility, and deepens appreciation for home. We return transformed.",
    "moralLessonAr": "السفر في نهايته رحلة إلى الداخل. مواجهة غير المألوف تكشف افتراضاتنا، وتعلم التواضع، وتعمق التقدير للوطن. نعود متحولين.",
    "wordCount": 58
  },
  {
    "id": "i84",
    "title": "Silence",
    "titleAr": "الصَّمْتُ",
    "level": "intermediate",
    "category": "Essays & Reflections",
    "categoryAr": "مقالات وتأملات",
    "text": "فِي عَالَمٍ مَلِيءٍ بِالضَّجِيجِ، أَصْبَحَ الصَّمْتُ نَادِرًا كَالذَّهَبِ. نَخَافُ مِنَ الصَّمْتِ لِأَنَّهُ يُجْبِرُنَا عَلَى مُوَاجَهَةِ أَنْفُسِنَا. نَمْلَأُ حَيَاتَنَا بِالْأَصْوَاتِ هُرُوبًا مِنَ الْأَسْئِلَةِ الْكَبِيرَةِ. لَكِنَّ الصَّمْتَ لَيْسَ فَرَاغًا. الصَّمْتُ مَلِيءٌ بِالْحِكْمَةِ لِمَنْ يَسْتَمِعُ. فِيهِ نَسْمَعُ صَوْتَ قُلُوبِنَا. فِيهِ نَجِدُ السَّكِينَةَ الَّتِي نَبْحَثُ عَنْهَا. مَنْ تَعَلَّمَ الصَّمْتَ تَعَلَّمَ الْكَلَامَ.",
    "translation": "In a world full of noise, silence has become rare as gold. We fear silence because it forces us to face ourselves. We fill our lives with sounds fleeing from the big questions. But silence is not emptiness. Silence is full of wisdom for those who listen. In it we hear the voice of our hearts. In it we find the tranquility we seek. Whoever learned silence learned speech.",
    "grammaticalConcepts": [
      "Simile with كـ (نادراً كالذهب)",
      "Causation with لأنّ",
      "Inna with sisters (لكنّ الصمت)",
      "Negation with ليس (ليس فراغاً)",
      "Relative clause (السكينة التي نبحث عنها)",
      "Conditional (من تعلم...تعلم)"
    ],
    "vocabularyHighlights": [
      { "word": "الضَّجِيج", "meaning": "noise" },
      { "word": "نَادِر", "meaning": "rare" },
      { "word": "يُجْبِرُنَا", "meaning": "forces us" },
      { "word": "هُرُوبًا", "meaning": "fleeing" },
      { "word": "فَرَاغ", "meaning": "emptiness" },
      { "word": "السَّكِينَة", "meaning": "tranquility" }
    ],
    "moralLesson": "Silence is not absence but presence—the presence of wisdom, self-awareness, and peace. In our noisy age, cultivating silence is essential for the soul.",
    "moralLessonAr": "الصمت ليس غياباً بل حضور—حضور الحكمة والوعي الذاتي والسلام. في عصرنا الصاخب، تنمية الصمت ضرورية للروح.",
    "wordCount": 56
  },
  {
    "id": "i85",
    "title": "The City at Night",
    "titleAr": "الْمَدِينَةُ فِي اللَّيْلِ",
    "level": "intermediate",
    "category": "Essays & Reflections",
    "categoryAr": "مقالات وتأملات",
    "text": "تَتَغَيَّرُ الْمَدِينَةُ عِنْدَمَا يَنَامُ النَّاسُ. الشَّوَارِعُ الَّتِي كَانَتْ مَلِيئَةً بِالزِّحَامِ تُصْبِحُ هَادِئَةً. الْأَضْوَاءُ تُضِيءُ النَّوَافِذَ كَنُجُومٍ عَلَى الْأَرْضِ. أَمْشِي وَحْدِي وَأَسْمَعُ صَوْتَ خُطُوَاتِي. فِي اللَّيْلِ، الْمَدِينَةُ تَكْشِفُ وَجْهًا آخَرَ. أَرَى الْجَمَالَ الَّذِي يَخْتَفِي فِي صَخَبِ النَّهَارِ. أُفَكِّرُ فِي الْحَيَوَاتِ خَلْفَ كُلِّ نَافِذَةٍ مُضِيئَةٍ. كَمْ قِصَّةٍ تَرْوِيهَا هَذِهِ الْمَدِينَةُ!",
    "translation": "The city changes when people sleep. Streets that were full of crowds become quiet. Lights illuminate windows like stars on earth. I walk alone and hear the sound of my steps. At night, the city reveals another face. I see the beauty that hides in the clamor of day. I think of the lives behind every lit window. How many stories this city tells!",
    "grammaticalConcepts": [
      "Temporal clause (عندما ينام)",
      "Relative clause (الشوارع التي كانت)",
      "Simile (كنجوم على الأرض)",
      "Present tense verbs (تتغير، تصبح، أمشي، أسمع)",
      "Exclamation (كم قصة!)",
      "Passive participle (مضيئة)"
    ],
    "vocabularyHighlights": [
      { "word": "تَتَغَيَّرُ", "meaning": "changes" },
      { "word": "الزِّحَام", "meaning": "crowds, congestion" },
      { "word": "خُطُوَات", "meaning": "steps, footsteps" },
      { "word": "تَكْشِفُ", "meaning": "reveals" },
      { "word": "صَخَب", "meaning": "clamor, noise" },
      { "word": "تَرْوِي", "meaning": "tells, narrates" }
    ],
    "moralLesson": "Cities have hidden dimensions revealed only in stillness. Night walks offer perspective on the countless lives unfolding around us—each window a world, each light a story.",
    "moralLessonAr": "للمدن أبعاد خفية لا تُكشف إلا في السكون. المشي الليلي يقدم منظوراً على الحياوات اللانهائية المتكشفة حولنا—كل نافذة عالم، كل ضوء قصة.",
    "wordCount": 58
  },
  {
    "id": "i86",
    "title": "Letters Never Sent",
    "titleAr": "رَسَائِلُ لَمْ تُرْسَلْ",
    "level": "intermediate",
    "category": "Essays & Reflections",
    "categoryAr": "مقالات وتأملات",
    "text": "فِي دُرْجِي رَسَائِلُ كَثِيرَةٌ لَمْ أُرْسِلْهَا أَبَدًا. رِسَالَةُ اعْتِذَارٍ لِصَدِيقٍ غَادَرَ. رِسَالَةُ شُكْرٍ لِمُعَلِّمٍ نَسِيتُهُ. رِسَالَةُ حُبٍّ لَمْ أَجْرُؤْ عَلَى إِرْسَالِهَا. الْكَلِمَاتُ الَّتِي لَا نَقُولُهَا تَبْقَى فِي قُلُوبِنَا. تَثْقُلُ عَلَيْنَا مَعَ مُرُورِ السِّنِينَ. أَحْيَانًا الصَّمْتُ أَقْسَى مِنَ الْكَلَامِ. لَا تُؤَجِّلْ كَلِمَةً طَيِّبَةً. فَالْغَدُ لَيْسَ مَضْمُونًا.",
    "translation": "In my drawer are many letters I never sent. A letter of apology to a friend who left. A letter of thanks to a teacher I forgot. A letter of love I did not dare send. Words we do not say remain in our hearts. They weigh on us with the passing of years. Sometimes silence is crueler than speech. Do not postpone a good word. For tomorrow is not guaranteed.",
    "grammaticalConcepts": [
      "Passive (لم تُرسل)",
      "Negation with لم (لم أرسلها، لم أجرؤ)",
      "Idafa chains (رسالة اعتذار، رسالة شكر)",
      "Relative clause (الكلمات التي لا نقولها)",
      "Comparative (أقسى من الكلام)",
      "Negative command (لا تؤجل)",
      "Passive participle (مضمون)"
    ],
    "vocabularyHighlights": [
      { "word": "دُرْج", "meaning": "drawer" },
      { "word": "اعْتِذَار", "meaning": "apology" },
      { "word": "أَجْرُؤْ", "meaning": "I dare" },
      { "word": "تَثْقُلُ", "meaning": "weighs down" },
      { "word": "أَقْسَى", "meaning": "crueler, harsher" },
      { "word": "مَضْمُون", "meaning": "guaranteed" }
    ],
    "moralLesson": "Unspoken words become burdens. The apology, the thanks, the declaration of love—don't wait for the perfect moment. Time is uncertain; kindness should not be delayed.",
    "moralLessonAr": "الكلمات غير المنطوقة تصبح أعباء. الاعتذار، الشكر، إعلان الحب—لا تنتظر اللحظة المثالية. الوقت غير مؤكد؛ اللطف لا ينبغي تأجيله.",
    "wordCount": 55
  },
  {
    "id": "i87",
    "title": "The Art of Waiting",
    "titleAr": "فَنُّ الانْتِظَارِ",
    "level": "intermediate",
    "category": "Essays & Reflections",
    "categoryAr": "مقالات وتأملات",
    "text": "نَعِيشُ فِي عَصْرِ السُّرْعَةِ. نُرِيدُ كُلَّ شَيْءٍ الْآنَ. لَكِنَّ الْأَشْيَاءَ الثَّمِينَةَ تَحْتَاجُ إِلَى وَقْتٍ. الثَّمَرَةُ تَحْتَاجُ شُهُورًا لِتَنْضُجَ. الْعِلْمُ يَحْتَاجُ سَنَوَاتٍ لِيَكْتَمِلَ. الانْتِظَارُ لَيْسَ ضَعْفًا بَلْ قُوَّةٌ. فِيهِ صَبْرٌ وَأَمَلٌ وَثِقَةٌ بِالْقَادِمِ. الْفَلَّاحُ يَزْرَعُ الْبَذْرَةَ وَيَنْتَظِرُ بِهُدُوءٍ. يَعْلَمُ أَنَّ الْحَصَادَ آتٍ. الانْتِظَارُ الْجَمِيلُ لَا يُضِيعُ الْوَقْتَ. بَلْ يَمْلَؤُهُ بِالتَّأَمُّلِ وَالاسْتِعْدَادِ.",
    "translation": "We live in the age of speed. We want everything now. But precious things need time. The fruit needs months to ripen. Knowledge needs years to be complete. Waiting is not weakness but strength. In it is patience, hope, and trust in what is coming. The farmer plants the seed and waits calmly. He knows the harvest is coming. Beautiful waiting does not waste time. Rather it fills it with contemplation and preparation.",
    "grammaticalConcepts": [
      "Present tense (نعيش، نريد، تحتاج)",
      "Inna with sisters (لكنّ الأشياء)",
      "Negation with ليس (ليس ضعفاً بل قوة)",
      "Purpose clause (لتنضج، ليكتمل)",
      "Active participle (القادم، آتٍ)",
      "Masdar (الانتظار، الحصاد، التأمل)"
    ],
    "vocabularyHighlights": [
      { "word": "عَصْر السُّرْعَة", "meaning": "age of speed" },
      { "word": "الثَّمِينَة", "meaning": "precious" },
      { "word": "تَنْضُجَ", "meaning": "ripens" },
      { "word": "يَكْتَمِلَ", "meaning": "be complete" },
      { "word": "الْحَصَاد", "meaning": "harvest" },
      { "word": "الاسْتِعْدَاد", "meaning": "preparation" }
    ],
    "moralLesson": "Instant gratification culture forgets that meaningful things require time. The farmer's patient waiting is not passive—it's active trust. Good waiting prepares us for what we await.",
    "moralLessonAr": "ثقافة الإشباع الفوري تنسى أن الأشياء ذات المعنى تتطلب وقتاً. انتظار الفلاح الصبور ليس سلبياً—إنه ثقة نشطة. الانتظار الجيد يُعدّنا لما ننتظره.",
    "wordCount": 62
  },

  // ============================================
  // ADVANCED ESSAYS (a77-a82)
  // Philosophical depth ~100 words
  // ============================================
  {
    "id": "a77",
    "title": "On Solitude",
    "titleAr": "فِي الْعُزْلَةِ",
    "level": "advanced",
    "category": "Essays & Reflections",
    "categoryAr": "مقالات وتأملات",
    "text": "لَيْسَتِ الْعُزْلَةُ هِيَ الْوَحْدَةُ. الْوَحْدَةُ أَلَمٌ يُصِيبُنَا رَغْمًا عَنَّا، أَمَّا الْعُزْلَةُ فَاخْتِيَارٌ وَاعٍ. الْعُزْلَةُ انْسِحَابٌ مُؤَقَّتٌ مِنْ ضَجِيجِ الْعَالَمِ لِمُقَابَلَةِ الذَّاتِ. فِي الْعُزْلَةِ نُعِيدُ اكْتِشَافَ أَنْفُسِنَا بَعِيدًا عَنْ تَوَقُّعَاتِ الْآخَرِينَ. نَسْأَلُ الْأَسْئِلَةَ الَّتِي نَتَجَنَّبُهَا فِي زَحْمَةِ الْحَيَاةِ: مَنْ أَنَا حَقًّا؟ مَا الَّذِي أُرِيدُهُ؟ إِلَى أَيْنَ أَتَّجِهُ؟ الْعُظَمَاءُ عَرَفُوا قِيمَةَ الْعُزْلَةِ. كَانَ النَّبِيُّ ﷺ يَتَحَنَّثُ فِي غَارِ حِرَاءٍ قَبْلَ الْبَعْثَةِ. الْمُتَصَوِّفَةُ يَلُوذُونَ بِالْخَلْوَةِ لِتَصْفِيَةِ الْقَلْبِ. لَكِنَّ الْعُزْلَةَ الصِّحِّيَّةَ مُؤَقَّتَةٌ لَا دَائِمَةٌ. هِيَ اسْتِرَاحَةٌ لِلرُّوحِ قَبْلَ الْعَوْدَةِ إِلَى الْجَمَاعَةِ.",
    "translation": "Solitude is not loneliness. Loneliness is a pain that afflicts us against our will, while solitude is a conscious choice. Solitude is a temporary withdrawal from the world's noise to meet the self. In solitude we rediscover ourselves away from others' expectations. We ask the questions we avoid in life's bustle: Who am I truly? What do I want? Where am I heading? The great ones knew the value of solitude. The Prophet ﷺ used to contemplate in the cave of Hira before the mission. The Sufis retreat to seclusion to purify the heart. But healthy solitude is temporary, not permanent. It is a rest for the soul before returning to the community.",
    "grammaticalConcepts": [
      "Negation with ليس (ليست العزلة هي الوحدة)",
      "Contrast with أما...فـ",
      "Masdar as subject (العزلة انسحاب)",
      "Questions (من أنا؟ ما الذي؟ إلى أين؟)",
      "Past tense narrative (كان...يتحنث)",
      "Purpose clause (لتصفية القلب)",
      "Inna with sisters (لكنّ العزلة)"
    ],
    "vocabularyHighlights": [
      { "word": "الْعُزْلَة", "meaning": "solitude" },
      { "word": "الْوَحْدَة", "meaning": "loneliness" },
      { "word": "انْسِحَاب", "meaning": "withdrawal" },
      { "word": "تَوَقُّعَات", "meaning": "expectations" },
      { "word": "نَتَجَنَّبُ", "meaning": "we avoid" },
      { "word": "يَتَحَنَّثُ", "meaning": "contemplates, worships" },
      { "word": "الْخَلْوَة", "meaning": "seclusion, retreat" },
      { "word": "تَصْفِيَة", "meaning": "purification" }
    ],
    "moralLesson": "Solitude differs from loneliness in its intentionality. Strategic withdrawal enables self-discovery and spiritual renewal. The Prophet's Hira retreats model this: temporary solitude prepares us for meaningful engagement with the world.",
    "moralLessonAr": "العزلة تختلف عن الوحدة في قصديتها. الانسحاب الاستراتيجي يمكّن من اكتشاف الذات والتجديد الروحي. خلوات النبي في حراء تنمذج هذا: العزلة المؤقتة تُعدّنا للانخراط ذي المعنى مع العالم.",
    "wordCount": 102
  },
  {
    "id": "a78",
    "title": "The Weight of Words",
    "titleAr": "ثِقَلُ الْكَلِمَاتِ",
    "level": "advanced",
    "category": "Essays & Reflections",
    "categoryAr": "مقالات وتأملات",
    "text": "الْكَلِمَةُ كَائِنٌ حَيٌّ يُولَدُ عَلَى اللِّسَانِ وَيَحْيَا فِي الْآذَانِ. قَدْ تَبْنِي قُصُورًا مِنَ الْأَمَلِ أَوْ تَهْدِمُ جُسُورًا لَا تُعَوَّضُ. فِي لَحْظَةِ غَضَبٍ قَدْ نَقُولُ كَلِمَةً تَجْرَحُ قَلْبًا لِسَنَوَاتٍ. وَفِي لَحْظَةِ رَحْمَةٍ قَدْ نَقُولُ كَلِمَةً تُنْقِذُ رُوحًا مِنَ الْيَأْسِ. قَالَ الْحُكَمَاءُ: رُبَّ كَلِمَةٍ قَالَتْ لِصَاحِبِهَا دَعْنِي. الْكَلِمَةُ سِلَاحٌ ذُو حَدَّيْنِ: تَشْفِي وَتُؤْذِي، تُحْيِي وَتُمِيتُ. لِذَلِكَ أَوْصَانَا الْإِسْلَامُ بِحِفْظِ اللِّسَانِ. فَالْكَلِمَةُ إِذَا خَرَجَتْ لَا تَعُودُ. وَالْجُرُوحُ تَلْتَئِمُ وَالْقُلُوبُ قَدْ لَا تَنْسَى. فَكِّرْ قَبْلَ أَنْ تَتَكَلَّمَ: هَلْ كَلِمَتِي تَبْنِي أَمْ تَهْدِمُ؟",
    "translation": "A word is a living being born on the tongue and living in ears. It may build palaces of hope or demolish irreplaceable bridges. In a moment of anger we may say a word that wounds a heart for years. And in a moment of mercy we may say a word that saves a soul from despair. The wise said: Perhaps a word said to its speaker 'leave me.' The word is a double-edged weapon: it heals and harms, gives life and kills. Therefore Islam commanded us to guard the tongue. For a word once uttered does not return. Wounds heal but hearts may not forget. Think before you speak: does my word build or demolish?",
    "grammaticalConcepts": [
      "Metaphor (الكلمة كائن حي)",
      "Modal قد with present (قد تبني، قد نقول)",
      "Conditional (إذا خرجت لا تعود)",
      "Quotation (قال الحكماء)",
      "Contrast (تشفي وتؤذي، تحيي وتميت)",
      "Command (فكّر قبل أن)",
      "Question (هل كلمتي تبني أم تهدم؟)"
    ],
    "vocabularyHighlights": [
      { "word": "كَائِن حَيّ", "meaning": "living being" },
      { "word": "تَهْدِمُ", "meaning": "demolishes" },
      { "word": "جُسُور", "meaning": "bridges" },
      { "word": "لَا تُعَوَّض", "meaning": "irreplaceable" },
      { "word": "الْيَأْس", "meaning": "despair" },
      { "word": "سِلَاح ذُو حَدَّيْن", "meaning": "double-edged weapon" },
      { "word": "تَلْتَئِمُ", "meaning": "heal (wounds)" },
      { "word": "حِفْظ اللِّسَان", "meaning": "guarding the tongue" }
    ],
    "moralLesson": "Words are living forces with permanent consequences. A careless word can wound for years; a kind word can save a soul. Islamic ethics emphasize tongue-guarding because spoken words cannot be retrieved—only their effects remain.",
    "moralLessonAr": "الكلمات قوى حية ذات عواقب دائمة. كلمة طائشة قد تجرح لسنوات؛ كلمة طيبة قد تنقذ روحاً. الأخلاق الإسلامية تؤكد على حفظ اللسان لأن الكلمات المنطوقة لا تُسترجع—تبقى آثارها فقط.",
    "wordCount": 105
  },
  {
    "id": "a79",
    "title": "Memory and Forgetting",
    "titleAr": "الذَّاكِرَةُ وَالنِّسْيَانُ",
    "level": "advanced",
    "category": "Essays & Reflections",
    "categoryAr": "مقالات وتأملات",
    "text": "الذَّاكِرَةُ لَيْسَتْ مُسَجِّلًا أَمِينًا لِلْمَاضِي. هِيَ فَنَّانَةٌ تُعِيدُ رَسْمَ الْأَحْدَاثِ بِأَلْوَانِ الْحَاضِرِ. نَتَذَكَّرُ مَا نُرِيدُ وَنَنْسَى مَا يُؤْلِمُنَا. وَأَحْيَانًا نَتَذَكَّرُ مَا لَمْ يَحْدُثْ وَنَنْسَى مَا حَدَثَ فِعْلًا. النِّسْيَانُ رَحْمَةٌ مِنَ اللهِ. لَوْ تَذَكَّرْنَا كُلَّ أَلَمٍ لَمَا اسْتَطَعْنَا الْعَيْشَ. لَكِنَّ النِّسْيَانَ قَدْ يَكُونُ خِيَانَةً أَيْضًا. نَنْسَى الْمَظْلُومِينَ وَنَنْسَى دُرُوسَ التَّارِيخِ. الذَّاكِرَةُ الْجَمَاعِيَّةُ هُوِيَّةُ الشُّعُوبِ. مَنْ يَتَحَكَّمُ فِي الذَّاكِرَةِ يَتَحَكَّمُ فِي الْمُسْتَقْبَلِ. لِذَلِكَ نَحْتَاجُ تَوَازُنًا: نَتَذَكَّرُ بِمَا يَكْفِي لِنَتَعَلَّمَ، وَنَنْسَى بِمَا يَكْفِي لِنُشْفَى.",
    "translation": "Memory is not a faithful recorder of the past. It is an artist that repaints events in the colors of the present. We remember what we want and forget what pains us. And sometimes we remember what did not happen and forget what actually happened. Forgetting is a mercy from Allah. If we remembered every pain, we could not live. But forgetting can be betrayal too. We forget the oppressed and forget history's lessons. Collective memory is peoples' identity. Whoever controls memory controls the future. Therefore we need balance: we remember enough to learn, and forget enough to heal.",
    "grammaticalConcepts": [
      "Negation with ليس (ليست مسجلاً)",
      "Metaphor (هي فنانة)",
      "Conditional (لو تذكرنا...لما استطعنا)",
      "Modal قد (قد يكون)",
      "Relative clause (من يتحكم في)",
      "Purpose clause (لنتعلم، لنُشفى)",
      "Contrast (نتذكر...وننسى)"
    ],
    "vocabularyHighlights": [
      { "word": "مُسَجِّل أَمِين", "meaning": "faithful recorder" },
      { "word": "فَنَّانَة", "meaning": "artist (fem.)" },
      { "word": "يُؤْلِمُنَا", "meaning": "pains us" },
      { "word": "خِيَانَة", "meaning": "betrayal" },
      { "word": "الْمَظْلُومِين", "meaning": "the oppressed" },
      { "word": "الذَّاكِرَة الْجَمَاعِيَّة", "meaning": "collective memory" },
      { "word": "هُوِيَّة", "meaning": "identity" },
      { "word": "يَتَحَكَّمُ", "meaning": "controls" }
    ],
    "moralLesson": "Memory is creative, not documentary—it reshapes the past through present needs. Forgetting is both mercy (healing) and danger (injustice, historical amnesia). Wisdom lies in the balance: remember to learn, forget to heal.",
    "moralLessonAr": "الذاكرة إبداعية لا وثائقية—تعيد تشكيل الماضي عبر حاجات الحاضر. النسيان رحمة (شفاء) وخطر (ظلم، فقدان ذاكرة تاريخية). الحكمة في التوازن: تذكّر لتتعلم، انسَ لتُشفى.",
    "wordCount": 98
  },
  {
    "id": "a80",
    "title": "The Stranger Within",
    "titleAr": "الْغَرِيبُ فِي دَاخِلِنَا",
    "level": "advanced",
    "category": "Essays & Reflections",
    "categoryAr": "مقالات وتأملات",
    "text": "نَظُنُّ أَنَّنَا نَعْرِفُ أَنْفُسَنَا جَيِّدًا. لَكِنَّ فِي أَعْمَاقِنَا غَرِيبًا لَا نَعْرِفُهُ. يَظْهَرُ فِي لَحَظَاتِ الْأَزَمَاتِ فَنَتَفَاجَأُ: مَنْ هَذَا الَّذِي تَصَرَّفَ بِشَجَاعَةٍ لَمْ أَعْرِفْهَا فِي نَفْسِي؟ أَوْ بِجُبْنٍ لَمْ أَتَوَقَّعْهُ؟ الْإِنْسَانُ مَحِيطٌ لَا قَاعَ لَهُ. كُلَّمَا غُصْنَا أَعْمَقَ وَجَدْنَا طَبَقَاتٍ جَدِيدَةً. هَذَا الْغَرِيبُ لَيْسَ عَدُوًّا يَجِبُ قَمْعُهُ. هُوَ جُزْءٌ مِنَّا يَحْتَاجُ الْفَهْمَ وَالتَّهْذِيبَ. رِحْلَةُ مَعْرِفَةِ الذَّاتِ لَا تَنْتَهِي. وَالْإِنْسَانُ الْحَكِيمُ يَقْبَلُ أَنَّهُ لَنْ يَعْرِفَ نَفْسَهُ كُلِّيًّا. هَذَا التَّوَاضُعُ أَمَامَ غُمُوضِ الذَّاتِ هُوَ بِدَايَةُ الْحِكْمَةِ.",
    "translation": "We think we know ourselves well. But in our depths is a stranger we do not know. He appears in moments of crisis and we are surprised: who is this who acted with courage I did not know in myself? Or with cowardice I did not expect? The human is an ocean without bottom. The deeper we dive, the more new layers we find. This stranger is not an enemy to be suppressed. He is a part of us that needs understanding and refinement. The journey of self-knowledge never ends. And the wise person accepts that he will never know himself completely. This humility before the self's mystery is the beginning of wisdom.",
    "grammaticalConcepts": [
      "Inna with أنّ (نظن أننا)",
      "Temporal clause (كلما غصنا...وجدنا)",
      "Question (من هذا الذي تصرف؟)",
      "Negation (لا قاع له، ليس عدواً)",
      "Masdar (معرفة الذات، التهذيب)",
      "Future negation (لن يعرف)",
      "Metaphor (الإنسان محيط)"
    ],
    "vocabularyHighlights": [
      { "word": "أَعْمَاق", "meaning": "depths" },
      { "word": "الْأَزَمَات", "meaning": "crises" },
      { "word": "نَتَفَاجَأُ", "meaning": "we are surprised" },
      { "word": "جُبْن", "meaning": "cowardice" },
      { "word": "مَحِيط", "meaning": "ocean" },
      { "word": "غُصْنَا", "meaning": "we dive" },
      { "word": "قَمْع", "meaning": "suppression" },
      { "word": "التَّهْذِيب", "meaning": "refinement, cultivation" },
      { "word": "غُمُوض", "meaning": "mystery" }
    ],
    "moralLesson": "Self-knowledge is an endless journey. Crises reveal unknown aspects of ourselves—both noble and ignoble. Wisdom accepts this inner mystery with humility rather than suppression, seeking to understand and refine rather than deny.",
    "moralLessonAr": "معرفة الذات رحلة لا نهائية. الأزمات تكشف جوانب مجهولة من أنفسنا—نبيلة ودنيئة. الحكمة تقبل هذا الغموض الداخلي بتواضع لا بقمع، ساعية للفهم والتهذيب لا للإنكار.",
    "wordCount": 100
  },
  {
    "id": "a81",
    "title": "Time's River",
    "titleAr": "نَهْرُ الزَّمَانِ",
    "level": "advanced",
    "category": "Essays & Reflections",
    "categoryAr": "مقالات وتأملات",
    "text": "الزَّمَانُ نَهْرٌ لَا يَتَوَقَّفُ. نَقِفُ عَلَى ضِفَّتِهِ وَنَرَاقِبُ الْمِيَاهَ تَمُرُّ. الْمَاءُ الَّذِي رَأَيْنَاهُ لَحْظَةً قَدْ ذَهَبَ إِلَى الْأَبَدِ. هَكَذَا اللَّحَظَاتُ: تَمُرُّ وَلَا تَعُودُ. نُؤَجِّلُ الْفَرَحَ إِلَى الْغَدِ وَلَا نَدْرِي أَنَّ الْغَدَ لَيْسَ مِلْكَنَا. نُرْجِئُ الْمُصَالَحَةَ وَقَدْ لَا تَأْتِي الْفُرْصَةُ. الْحَكِيمُ يَعِيشُ فِي الْحَاضِرِ لَا فِي الْمَاضِي الَّذِي انْتَهَى وَلَا فِي الْمُسْتَقْبَلِ الَّذِي لَمْ يَأْتِ. هَذِهِ اللَّحْظَةُ الَّتِي أَنْتَ فِيهَا الْآنَ هِيَ كُلُّ مَا تَمْلِكُ حَقًّا. فَاغْتَنِمْهَا قَبْلَ أَنْ تُصْبِحَ ذِكْرَى. قَالَ عَلِيٌّ رَضِيَ اللهُ عَنْهُ: الْفُرْصَةُ تَمُرُّ مَرَّ السَّحَابِ.",
    "translation": "Time is a river that does not stop. We stand on its bank and watch the waters pass. The water we saw a moment ago has gone forever. Thus are moments: they pass and do not return. We postpone joy to tomorrow not knowing tomorrow is not ours. We delay reconciliation and the opportunity may not come. The wise person lives in the present, not in the past that ended nor in the future that has not come. This moment you are in now is all you truly own. So seize it before it becomes a memory. Ali (may Allah be pleased with him) said: Opportunity passes like clouds.",
    "grammaticalConcepts": [
      "Metaphor (الزمان نهر)",
      "Relative clause (الماء الذي رأيناه)",
      "Negation (لا يتوقف، لا تعود، لا ندري)",
      "Modal قد (قد ذهب، قد لا تأتي)",
      "Command (فاغتنمها)",
      "Quotation (قال علي)",
      "Simile (مرّ السحاب)"
    ],
    "vocabularyHighlights": [
      { "word": "ضِفَّة", "meaning": "bank (of river)" },
      { "word": "نُرَاقِبُ", "meaning": "we watch" },
      { "word": "نُؤَجِّلُ", "meaning": "we postpone" },
      { "word": "نُرْجِئُ", "meaning": "we delay" },
      { "word": "الْمُصَالَحَة", "meaning": "reconciliation" },
      { "word": "اغْتَنِمْ", "meaning": "seize, take advantage of" },
      { "word": "السَّحَاب", "meaning": "clouds" }
    ],
    "moralLesson": "Time flows irreversibly. Postponing joy, love, or reconciliation gambles on a tomorrow we may not have. Ali's wisdom—'opportunity passes like clouds'—urges presence: the current moment is our only true possession.",
    "moralLessonAr": "الزمان يتدفق بلا رجعة. تأجيل الفرح أو الحب أو المصالحة مقامرة بغد قد لا نملكه. حكمة علي—'الفرصة تمر مرّ السحاب'—تحث على الحضور: اللحظة الحالية ملكنا الحقيقي الوحيد.",
    "wordCount": 103
  },
  {
    "id": "a82",
    "title": "Between Two Worlds",
    "titleAr": "بَيْنَ عَالَمَيْنِ",
    "level": "advanced",
    "category": "Essays & Reflections",
    "categoryAr": "مقالات وتأملات",
    "text": "مَنْ عَاشَ بَيْنَ ثَقَافَتَيْنِ يَعْرِفُ شُعُورًا غَرِيبًا: أَنْ تَكُونَ مِنْ هُنَا وَهُنَاكَ فِي آنٍ وَاحِدٍ، وَأَلَّا تَكُونَ مِنْ أَيِّ مَكَانٍ بِالْكَامِلِ. هَذَا الْوُجُودُ الْبَيْنِيُّ مُؤْلِمٌ وَمُثْرٍ فِي الْوَقْتِ نَفْسِهِ. مُؤْلِمٌ لِأَنَّ الانْتِمَاءَ مَشْقُوقٌ. وَمُثْرٍ لِأَنَّنَا نَرَى مَا لَا يَرَاهُ الْآخَرُونَ: نَرَى حُدُودَ كُلِّ ثَقَافَةٍ وَإِمْكَانَاتِهَا. نُتَرْجِمُ بَيْنَ الْعَوَالِمِ وَنَبْنِي جُسُورًا. الْهُوِيَّةُ لَيْسَتْ صُنْدُوقًا نُوضَعُ فِيهِ. بَلْ هِيَ نَهْرٌ يَتَدَفَّقُ وَيَتَغَيَّرُ. مَنْ يَعِيشُ عَلَى الْحُدُودِ يَفْهَمُ أَنَّ الْهُوِيَّاتِ مُرَكَّبَةٌ لَا بَسِيطَةٌ. وَأَنَّ التَّعَدُّدِيَّةَ ثَرْوَةٌ لَا أَزْمَةٌ. وَأَنَّ الانْتِمَاءَ يُمْكِنُ أَنْ يَكُونَ مُتَعَدِّدًا بِلَا تَنَاقُضٍ.",
    "translation": "Whoever lived between two cultures knows a strange feeling: to be from here and there at once, and to be from nowhere completely. This in-between existence is painful and enriching at the same time. Painful because belonging is split. And enriching because we see what others do not see: we see the limits and possibilities of each culture. We translate between worlds and build bridges. Identity is not a box we are placed in. Rather it is a river that flows and changes. Whoever lives on the borders understands that identities are composite, not simple. And that plurality is wealth, not crisis. And that belonging can be multiple without contradiction.",
    "grammaticalConcepts": [
      "Conditional (من عاش...يعرف)",
      "Dual (ثقافتين، عالمين، مؤلم ومثر)",
      "Contrast (مؤلم...ومثر، من هنا وهناك)",
      "Negation with ليس (ليست صندوقاً)",
      "Metaphor (الهوية نهر)",
      "Anna clauses (أنّ الهويات مركبة)",
      "Passive participle (مشقوق، مركّبة)"
    ],
    "vocabularyHighlights": [
      { "word": "ثَقَافَتَيْن", "meaning": "two cultures (dual)" },
      { "word": "الْوُجُود الْبَيْنِيّ", "meaning": "in-between existence" },
      { "word": "مُثْرٍ", "meaning": "enriching" },
      { "word": "الانْتِمَاء", "meaning": "belonging" },
      { "word": "مَشْقُوق", "meaning": "split" },
      { "word": "إِمْكَانَات", "meaning": "possibilities" },
      { "word": "نُتَرْجِمُ", "meaning": "we translate" },
      { "word": "مُرَكَّبَة", "meaning": "composite, compound" },
      { "word": "التَّعَدُّدِيَّة", "meaning": "plurality, multiplicity" }
    ],
    "moralLesson": "Living between cultures is both painful and privileged. The 'in-between' person sees what monocultural people miss—the limits and gifts of each world. Identity is not a fixed box but a flowing river; multiple belongings can coexist.",
    "moralLessonAr": "العيش بين ثقافتين مؤلم ومميز معاً. الشخص 'البيني' يرى ما يفوته أحاديو الثقافة—حدود وهبات كل عالم. الهوية ليست صندوقاً ثابتاً بل نهر متدفق؛ الانتماءات المتعددة يمكن أن تتعايش.",
    "wordCount": 108
  }
];
