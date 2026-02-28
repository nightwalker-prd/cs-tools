// src/data/reading/science.ts
// Science & Nature Texts (العلوم والطبيعة)
// Classical Arabic texts about astronomy, animals, plants, and natural phenomena

import { ReadingText } from './types';

export const scienceTexts: ReadingText[] = [
  // ============================================
  // BEGINNER SCIENCE TEXTS (b97-b102)
  // Simple observations about nature ~30 words
  // ============================================
  {
    "id": "b97",
    "title": "The Sun",
    "titleAr": "الشَّمْسُ",
    "level": "beginner",
    "category": "Science & Nature",
    "categoryAr": "العلوم والطبيعة",
    "text": "الشَّمْسُ نَجْمٌ كَبِيرٌ. تُشْرِقُ فِي الصَّبَاحِ وَتَغْرُبُ فِي الْمَسَاءِ. تُعْطِينَا الضَّوْءَ وَالْحَرَارَةَ. بِدُونِ الشَّمْسِ لَا حَيَاةَ عَلَى الْأَرْضِ. الشَّمْسُ نِعْمَةٌ عَظِيمَةٌ مِنَ اللهِ.",
    "translation": "The sun is a large star. It rises in the morning and sets in the evening. It gives us light and heat. Without the sun there is no life on Earth. The sun is a great blessing from Allah.",
    "grammaticalConcepts": [
      "Nominal sentences (الشمس نجم)",
      "Present tense verbs (تشرق، تغرب، تعطينا)",
      "Prepositions (في، على، من، بـ)",
      "Negation with لا (لا حياة)",
      "Adjective agreement (نجم كبير، نعمة عظيمة)"
    ],
    "vocabularyHighlights": [
      { "word": "نَجْم", "meaning": "star" },
      { "word": "تُشْرِقُ", "meaning": "rises (sun)" },
      { "word": "تَغْرُبُ", "meaning": "sets (sun)" },
      { "word": "الْحَرَارَة", "meaning": "heat" },
      { "word": "نِعْمَة", "meaning": "blessing" }
    ],
    "moralLesson": "The sun is a sign of Allah's power and mercy. Its daily cycle reminds us of the order and precision in creation.",
    "moralLessonAr": "الشمس آية من آيات قدرة الله ورحمته. دورتها اليومية تذكرنا بالنظام والدقة في الخلق.",
    "wordCount": 28
  },
  {
    "id": "b98",
    "title": "The Moon",
    "titleAr": "الْقَمَرُ",
    "level": "beginner",
    "category": "Science & Nature",
    "categoryAr": "العلوم والطبيعة",
    "text": "الْقَمَرُ يُضِيءُ اللَّيْلَ. يَدُورُ حَوْلَ الْأَرْضِ. أَحْيَانًا نَرَاهُ كَامِلًا وَأَحْيَانًا هِلَالًا. الْمُسْلِمُونَ يَعْرِفُونَ الشُّهُورَ بِالْقَمَرِ. رَمَضَانُ يَبْدَأُ بِرُؤْيَةِ الْهِلَالِ.",
    "translation": "The moon illuminates the night. It orbits around the Earth. Sometimes we see it full and sometimes as a crescent. Muslims know the months by the moon. Ramadan begins with the sighting of the crescent.",
    "grammaticalConcepts": [
      "Present tense verbs (يضيء، يدور، نراه، يعرفون، يبدأ)",
      "Adverbs of time (أحيانًا)",
      "Hal (حال) - كاملًا، هلالًا",
      "Attached pronouns (نراه)",
      "Prepositions (حول، بـ)"
    ],
    "vocabularyHighlights": [
      { "word": "يُضِيءُ", "meaning": "illuminates" },
      { "word": "يَدُورُ", "meaning": "orbits, revolves" },
      { "word": "كَامِلًا", "meaning": "full (moon)" },
      { "word": "هِلَال", "meaning": "crescent" },
      { "word": "رُؤْيَة", "meaning": "sighting" }
    ],
    "moralLesson": "The moon serves as a natural calendar. Its phases connect us to Islamic months and remind us of time's passage.",
    "moralLessonAr": "القمر يعمل كتقويم طبيعي. أطواره تربطنا بالأشهر الإسلامية وتذكرنا بمرور الزمن.",
    "wordCount": 27
  },
  {
    "id": "b99",
    "title": "Water",
    "titleAr": "الْمَاءُ",
    "level": "beginner",
    "category": "Science & Nature",
    "categoryAr": "العلوم والطبيعة",
    "text": "الْمَاءُ ضَرُورِيٌّ لِلْحَيَاةِ. نَشْرَبُهُ كُلَّ يَوْمٍ. النَّبَاتَاتُ تَحْتَاجُ إِلَى الْمَاءِ. الْحَيَوَانَاتُ تَشْرَبُ مِنَ الْأَنْهَارِ. يَنْزِلُ الْمَطَرُ مِنَ السَّمَاءِ. قَالَ اللهُ: وَجَعَلْنَا مِنَ الْمَاءِ كُلَّ شَيْءٍ حَيٍّ.",
    "translation": "Water is essential for life. We drink it every day. Plants need water. Animals drink from rivers. Rain falls from the sky. Allah said: And We made from water every living thing.",
    "grammaticalConcepts": [
      "Nominal sentences (الماء ضروري)",
      "Present tense verbs (نشربه، تحتاج، تشرب، ينزل)",
      "Prepositions (لـ، إلى، من)",
      "Quranic quotation style",
      "Attached pronouns (نشربه)"
    ],
    "vocabularyHighlights": [
      { "word": "ضَرُورِيّ", "meaning": "essential, necessary" },
      { "word": "نَبَاتَات", "meaning": "plants" },
      { "word": "حَيَوَانَات", "meaning": "animals" },
      { "word": "أَنْهَار", "meaning": "rivers" },
      { "word": "حَيّ", "meaning": "living" }
    ],
    "moralLesson": "Water is the foundation of all life. The Quran reminds us that every living thing depends on this blessing from Allah.",
    "moralLessonAr": "الماء أساس كل حياة. القرآن يذكرنا أن كل شيء حي يعتمد على هذه النعمة من الله.",
    "wordCount": 32
  },
  {
    "id": "b100",
    "title": "The Bee",
    "titleAr": "النَّحْلَةُ",
    "level": "beginner",
    "category": "Science & Nature",
    "categoryAr": "العلوم والطبيعة",
    "text": "النَّحْلَةُ حَشَرَةٌ صَغِيرَةٌ وَمُفِيدَةٌ. تَطِيرُ مِنْ زَهْرَةٍ إِلَى زَهْرَةٍ. تَجْمَعُ الرَّحِيقَ وَتَصْنَعُ الْعَسَلَ. الْعَسَلُ فِيهِ شِفَاءٌ لِلنَّاسِ. النَّحْلُ يَعْمَلُ بِنِظَامٍ عَجِيبٍ.",
    "translation": "The bee is a small and useful insect. It flies from flower to flower. It collects nectar and makes honey. In honey there is healing for people. Bees work with an amazing system.",
    "grammaticalConcepts": [
      "Nominal sentences (النحلة حشرة)",
      "Present tense verbs (تطير، تجمع، تصنع، يعمل)",
      "Prepositions (من، إلى، في، لـ، بـ)",
      "Adjective agreement (حشرة صغيرة ومفيدة)",
      "Muqaddam khabar (فيه شفاء)"
    ],
    "vocabularyHighlights": [
      { "word": "حَشَرَة", "meaning": "insect" },
      { "word": "زَهْرَة", "meaning": "flower" },
      { "word": "رَحِيق", "meaning": "nectar" },
      { "word": "عَسَل", "meaning": "honey" },
      { "word": "شِفَاء", "meaning": "healing, cure" }
    ],
    "moralLesson": "The bee teaches us the value of hard work and organization. Its honey is mentioned in the Quran as a healing gift.",
    "moralLessonAr": "النحلة تعلمنا قيمة العمل الجاد والنظام. عسلها مذكور في القرآن كهدية شافية.",
    "wordCount": 29
  },
  {
    "id": "b101",
    "title": "The Tree",
    "titleAr": "الشَّجَرَةُ",
    "level": "beginner",
    "category": "Science & Nature",
    "categoryAr": "العلوم والطبيعة",
    "text": "الشَّجَرَةُ تَنْمُو مِنْ بَذْرَةٍ صَغِيرَةٍ. جُذُورُهَا فِي الْأَرْضِ وَأَغْصَانُهَا فِي السَّمَاءِ. تُعْطِينَا الْأُكْسُجِينَ وَالظِّلَّ وَالثَّمَرَ. الْأَشْجَارُ بُيُوتٌ لِلطُّيُورِ. يَجِبُ أَنْ نَحْمِيَ الْغَابَاتِ.",
    "translation": "The tree grows from a small seed. Its roots are in the ground and its branches in the sky. It gives us oxygen, shade, and fruit. Trees are homes for birds. We must protect the forests.",
    "grammaticalConcepts": [
      "Present tense (تنمو، تعطينا)",
      "Attached pronouns (جذورها، أغصانها)",
      "Nominal sentences (الأشجار بيوت)",
      "Modal construction (يجب أن نحمي)",
      "Plural forms (جذور، أغصان، طيور، غابات)"
    ],
    "vocabularyHighlights": [
      { "word": "بَذْرَة", "meaning": "seed" },
      { "word": "جُذُور", "meaning": "roots" },
      { "word": "أَغْصَان", "meaning": "branches" },
      { "word": "أُكْسُجِين", "meaning": "oxygen" },
      { "word": "غَابَات", "meaning": "forests" }
    ],
    "moralLesson": "Trees sustain life in countless ways. Protecting forests is protecting our future and fulfilling our role as stewards of the Earth.",
    "moralLessonAr": "الأشجار تدعم الحياة بطرق لا تحصى. حماية الغابات هي حماية مستقبلنا وأداء دورنا كمستخلفين في الأرض.",
    "wordCount": 30
  },
  {
    "id": "b102",
    "title": "The Four Seasons",
    "titleAr": "الْفُصُولُ الْأَرْبَعَةُ",
    "level": "beginner",
    "category": "Science & Nature",
    "categoryAr": "العلوم والطبيعة",
    "text": "فِي السَّنَةِ أَرْبَعَةُ فُصُولٍ. الرَّبِيعُ جَمِيلٌ وَالصَّيْفُ حَارٌّ. الْخَرِيفُ تَسْقُطُ فِيهِ الْأَوْرَاقُ. الشِّتَاءُ بَارِدٌ وَيَنْزِلُ الثَّلْجُ. كُلُّ فَصْلٍ لَهُ جَمَالُهُ الْخَاصُّ.",
    "translation": "In the year there are four seasons. Spring is beautiful and summer is hot. In autumn the leaves fall. Winter is cold and snow falls. Every season has its own special beauty.",
    "grammaticalConcepts": [
      "Numbers with counted noun (أربعة فصول)",
      "Nominal sentences (الربيع جميل)",
      "Fronted predicate (في السنة أربعة فصول)",
      "Present tense (تسقط، ينزل)",
      "Possessive construction (جماله الخاص)"
    ],
    "vocabularyHighlights": [
      { "word": "فُصُول", "meaning": "seasons" },
      { "word": "الرَّبِيع", "meaning": "spring" },
      { "word": "الْخَرِيف", "meaning": "autumn" },
      { "word": "أَوْرَاق", "meaning": "leaves" },
      { "word": "ثَلْج", "meaning": "snow" }
    ],
    "moralLesson": "The changing seasons reflect Allah's wisdom in creation. Each brings its own blessings and reminds us of life's cycles.",
    "moralLessonAr": "تغير الفصول يعكس حكمة الله في الخلق. كل فصل يحمل بركاته ويذكرنا بدورات الحياة.",
    "wordCount": 31
  },

  // ============================================
  // INTERMEDIATE SCIENCE TEXTS (i88-i93)
  // More detailed explanations ~55 words
  // ============================================
  {
    "id": "i88",
    "title": "The Solar System",
    "titleAr": "الْمَجْمُوعَةُ الشَّمْسِيَّةُ",
    "level": "intermediate",
    "category": "Science & Nature",
    "categoryAr": "العلوم والطبيعة",
    "text": "الْمَجْمُوعَةُ الشَّمْسِيَّةُ تَتَكَوَّنُ مِنَ الشَّمْسِ وَثَمَانِيَةِ كَوَاكِبَ. الْأَرْضُ هِيَ الْكَوْكَبُ الثَّالِثُ مِنَ الشَّمْسِ. كُلُّ كَوْكَبٍ يَدُورُ فِي مَدَارِهِ بِدِقَّةٍ عَجِيبَةٍ. بَعْضُ الْكَوَاكِبِ لَهَا أَقْمَارٌ كَثِيرَةٌ. الْمَسَافَاتُ بَيْنَ الْكَوَاكِبِ هَائِلَةٌ جِدًّا. هَذَا النِّظَامُ الْكَوْنِيُّ يَدُلُّ عَلَى عَظَمَةِ الْخَالِقِ.",
    "translation": "The solar system consists of the sun and eight planets. Earth is the third planet from the sun. Every planet orbits in its path with amazing precision. Some planets have many moons. The distances between planets are extremely vast. This cosmic system indicates the greatness of the Creator.",
    "grammaticalConcepts": [
      "Form V verb (تتكون من)",
      "Ordinal numbers (الثالث)",
      "Cardinal numbers (ثمانية)",
      "Attached pronouns (مداره)",
      "Comparative/superlative implied (هائلة جدًا)"
    ],
    "vocabularyHighlights": [
      { "word": "كَوَاكِب", "meaning": "planets" },
      { "word": "مَدَار", "meaning": "orbit" },
      { "word": "دِقَّة", "meaning": "precision" },
      { "word": "هَائِلَة", "meaning": "vast, enormous" },
      { "word": "الْخَالِق", "meaning": "the Creator" }
    ],
    "moralLesson": "The precise order of the solar system points to intentional design. Such harmony could not arise by chance but reflects divine wisdom.",
    "moralLessonAr": "النظام الدقيق للمجموعة الشمسية يشير إلى تصميم مقصود. هذا التناغم لا يمكن أن ينشأ بالصدفة بل يعكس الحكمة الإلهية.",
    "wordCount": 48
  },
  {
    "id": "i89",
    "title": "Bird Migration",
    "titleAr": "هِجْرَةُ الطُّيُورِ",
    "level": "intermediate",
    "category": "Science & Nature",
    "categoryAr": "العلوم والطبيعة",
    "text": "كَثِيرٌ مِنَ الطُّيُورِ تُهَاجِرُ كُلَّ سَنَةٍ. تَطِيرُ آلَافَ الْكِيلُومِتْرَاتِ بَحْثًا عَنِ الدِّفْءِ وَالطَّعَامِ. تَعْرِفُ طَرِيقَهَا بِالنُّجُومِ وَالشَّمْسِ. تَسْتَخْدِمُ بُوصُلَةً دَاخِلِيَّةً عَجِيبَةً. تَعُودُ إِلَى نَفْسِ الْمَكَانِ كُلَّ عَامٍ. مَنْ عَلَّمَ الطُّيُورَ هَذَا الْعِلْمَ إِلَّا اللهُ؟",
    "translation": "Many birds migrate every year. They fly thousands of kilometers searching for warmth and food. They know their way by the stars and sun. They use an amazing internal compass. They return to the same place every year. Who taught the birds this knowledge except Allah?",
    "grammaticalConcepts": [
      "Form III verb (تهاجر)",
      "Maf'ul li-ajlih (بحثًا عن)",
      "Numbers with tamyiz (آلاف الكيلومترات)",
      "Rhetorical question (من علّم... إلا الله)",
      "Present tense narration"
    ],
    "vocabularyHighlights": [
      { "word": "تُهَاجِرُ", "meaning": "migrate" },
      { "word": "الدِّفْء", "meaning": "warmth" },
      { "word": "بُوصُلَة", "meaning": "compass" },
      { "word": "دَاخِلِيَّة", "meaning": "internal" },
      { "word": "تَعُودُ", "meaning": "returns" }
    ],
    "moralLesson": "Bird migration demonstrates Allah's guidance of His creatures. The instincts He placed in them accomplish what human technology struggles to match.",
    "moralLessonAr": "هجرة الطيور تُظهر هداية الله لمخلوقاته. الغرائز التي وضعها فيها تحقق ما تعجز التكنولوجيا البشرية عن مضاهاته.",
    "wordCount": 45
  },
  {
    "id": "i90",
    "title": "Photosynthesis",
    "titleAr": "التَّمْثِيلُ الضَّوْئِيُّ",
    "level": "intermediate",
    "category": "Science & Nature",
    "categoryAr": "العلوم والطبيعة",
    "text": "النَّبَاتَاتُ تَصْنَعُ غِذَاءَهَا بِنَفْسِهَا. تَأْخُذُ ثَانِيَ أُكْسِيدِ الْكَرْبُونِ مِنَ الْهَوَاءِ وَالْمَاءَ مِنَ التُّرْبَةِ. تَسْتَخْدِمُ ضَوْءَ الشَّمْسِ لِتَحْوِيلِهَا إِلَى سُكَّرٍ. تُطْلِقُ الْأُكْسِجِينَ الَّذِي نَتَنَفَّسُهُ. هَذِهِ الْعَمَلِيَّةُ تُسَمَّى التَّمْثِيلَ الضَّوْئِيَّ. بِدُونِهَا لَا حَيَاةَ عَلَى الْأَرْضِ.",
    "translation": "Plants make their own food. They take carbon dioxide from the air and water from the soil. They use sunlight to convert them into sugar. They release the oxygen that we breathe. This process is called photosynthesis. Without it there is no life on Earth.",
    "grammaticalConcepts": [
      "Reflexive (بنفسها)",
      "Scientific terminology in Arabic",
      "Relative clause (الذي نتنفسه)",
      "Passive voice (تسمّى)",
      "Lam of purpose (لتحويلها)"
    ],
    "vocabularyHighlights": [
      { "word": "غِذَاء", "meaning": "food, nourishment" },
      { "word": "ثَانِي أُكْسِيد الْكَرْبُون", "meaning": "carbon dioxide" },
      { "word": "تُرْبَة", "meaning": "soil" },
      { "word": "سُكَّر", "meaning": "sugar" },
      { "word": "عَمَلِيَّة", "meaning": "process" }
    ],
    "moralLesson": "Photosynthesis reveals the interconnectedness of creation. Plants serve animals and humans in ways we often overlook.",
    "moralLessonAr": "التمثيل الضوئي يكشف عن ترابط الخلق. النباتات تخدم الحيوانات والبشر بطرق كثيرًا ما نغفلها.",
    "wordCount": 47
  },
  {
    "id": "i91",
    "title": "The Water Cycle",
    "titleAr": "دَوْرَةُ الْمَاءِ",
    "level": "intermediate",
    "category": "Science & Nature",
    "categoryAr": "العلوم والطبيعة",
    "text": "الْمَاءُ يَتَحَرَّكُ فِي دَوْرَةٍ مُسْتَمِرَّةٍ. تُسَخِّنُ الشَّمْسُ الْبِحَارَ فَيَتَبَخَّرُ الْمَاءُ. يَصْعَدُ الْبُخَارُ إِلَى السَّمَاءِ وَيُشَكِّلُ السُّحُبَ. تَهُبُّ الرِّيَاحُ وَتَحْمِلُ السُّحُبَ فَوْقَ الْيَابِسَةِ. يَنْزِلُ الْمَطَرُ وَيَمْلَأُ الْأَنْهَارَ وَالْبُحَيْرَاتِ. ثُمَّ يَعُودُ الْمَاءُ إِلَى الْبَحْرِ. هَذِهِ الدَّوْرَةُ لَا تَتَوَقَّفُ أَبَدًا.",
    "translation": "Water moves in a continuous cycle. The sun heats the seas so the water evaporates. The vapor rises to the sky and forms clouds. The winds blow and carry the clouds over the land. Rain falls and fills rivers and lakes. Then the water returns to the sea. This cycle never stops.",
    "grammaticalConcepts": [
      "Form V verb (يتحرك، يتبخر)",
      "Form II verb (تسخّن، يشكّل)",
      "Fa of consequence (فيتبخر، فوق)",
      "Present tense narrative sequence",
      "Negation with لا + present (لا تتوقف)"
    ],
    "vocabularyHighlights": [
      { "word": "دَوْرَة", "meaning": "cycle" },
      { "word": "يَتَبَخَّرُ", "meaning": "evaporates" },
      { "word": "بُخَار", "meaning": "vapor, steam" },
      { "word": "سُحُب", "meaning": "clouds" },
      { "word": "الْيَابِسَة", "meaning": "land, dry land" }
    ],
    "moralLesson": "The water cycle demonstrates perfect recycling in nature. Allah's system wastes nothing and sustains all life continuously.",
    "moralLessonAr": "دورة الماء تُظهر إعادة التدوير المثالية في الطبيعة. نظام الله لا يُهدر شيئًا ويحفظ الحياة باستمرار.",
    "wordCount": 53
  },
  {
    "id": "i92",
    "title": "The Human Body",
    "titleAr": "جِسْمُ الْإِنْسَانِ",
    "level": "intermediate",
    "category": "Science & Nature",
    "categoryAr": "العلوم والطبيعة",
    "text": "جِسْمُ الْإِنْسَانِ آيَةٌ عَظِيمَةٌ. الْقَلْبُ يَنْبِضُ أَكْثَرَ مِنْ مِئَةِ أَلْفِ مَرَّةٍ يَوْمِيًّا. الْعَيْنُ تَرَى مَلَايِينَ الْأَلْوَانِ. الْأُذُنُ تَسْمَعُ آلَافَ الْأَصْوَاتِ. الدِّمَاغُ يُخَزِّنُ ذِكْرَيَاتِ سِنِينَ طَوِيلَةٍ. كُلُّ عُضْوٍ يَعْمَلُ بِتَنَاسُقٍ مَعَ غَيْرِهِ. سُبْحَانَ الَّذِي خَلَقَ فَسَوَّى!",
    "translation": "The human body is a great sign. The heart beats more than a hundred thousand times daily. The eye sees millions of colors. The ear hears thousands of sounds. The brain stores memories of many long years. Every organ works in harmony with others. Glory to the One who created and proportioned!",
    "grammaticalConcepts": [
      "Numbers with tamyiz (مئة ألف مرة)",
      "Form II verb (يخزّن)",
      "Tasbeeh construction (سبحان الذي)",
      "Relative clause (الذي خلق)",
      "Idafa chains (جسم الإنسان)"
    ],
    "vocabularyHighlights": [
      { "word": "يَنْبِضُ", "meaning": "beats (heart)" },
      { "word": "دِمَاغ", "meaning": "brain" },
      { "word": "يُخَزِّنُ", "meaning": "stores" },
      { "word": "تَنَاسُق", "meaning": "harmony, coordination" },
      { "word": "سَوَّى", "meaning": "proportioned, perfected" }
    ],
    "moralLesson": "The human body's complexity points to intentional design. Every system working together is evidence of the Creator's wisdom.",
    "moralLessonAr": "تعقيد جسم الإنسان يشير إلى تصميم مقصود. كل نظام يعمل مع غيره دليل على حكمة الخالق.",
    "wordCount": 50
  },
  {
    "id": "i93",
    "title": "The Ant Colony",
    "titleAr": "مُسْتَعْمَرَةُ النَّمْلِ",
    "level": "intermediate",
    "category": "Science & Nature",
    "categoryAr": "العلوم والطبيعة",
    "text": "النَّمْلُ مِنْ أَعْجَبِ الْمَخْلُوقَاتِ. يَعِيشُ فِي مُسْتَعْمَرَاتٍ مُنَظَّمَةٍ. لِكُلِّ نَمْلَةٍ وَظِيفَةٌ مُحَدَّدَةٌ: الْمَلِكَةُ وَالْعَامِلَاتُ وَالْجُنُودُ. يَتَوَاصَلُونَ بِرَوَائِحَ خَاصَّةٍ. يَخْزِنُونَ الطَّعَامَ لِلشِّتَاءِ. يَبْنُونَ أَنْفَاقًا تَحْتَ الْأَرْضِ. ذَكَرَ اللهُ النَّمْلَ فِي الْقُرْآنِ لِنَتَعَلَّمَ مِنْهُ.",
    "translation": "Ants are among the most amazing creatures. They live in organized colonies. Every ant has a specific role: the queen, workers, and soldiers. They communicate with special scents. They store food for winter. They build tunnels underground. Allah mentioned ants in the Quran so we may learn from them.",
    "grammaticalConcepts": [
      "Superlative (من أعجب)",
      "Form VI verb (يتواصلون)",
      "Lam of purpose (لنتعلم)",
      "Passive participle (منظّمة، محدّدة)",
      "Enumeration with و (الملكة والعاملات والجنود)"
    ],
    "vocabularyHighlights": [
      { "word": "مُسْتَعْمَرَات", "meaning": "colonies" },
      { "word": "وَظِيفَة", "meaning": "role, function" },
      { "word": "رَوَائِح", "meaning": "scents, smells" },
      { "word": "أَنْفَاق", "meaning": "tunnels" },
      { "word": "يَخْزِنُونَ", "meaning": "they store" }
    ],
    "moralLesson": "Ants exemplify cooperation and planning. Their mention in Surah An-Naml invites us to observe and learn from small creatures.",
    "moralLessonAr": "النمل يجسد التعاون والتخطيط. ذكره في سورة النمل يدعونا لنتأمل ونتعلم من المخلوقات الصغيرة.",
    "wordCount": 51
  },

  // ============================================
  // ADVANCED SCIENCE TEXTS (a83-a88)
  // Deep scientific/philosophical reflections ~100+ words
  // ============================================
  {
    "id": "a83",
    "title": "Signs in the Horizons",
    "titleAr": "آيَاتٌ فِي الْآفَاقِ",
    "level": "advanced",
    "category": "Science & Nature",
    "categoryAr": "العلوم والطبيعة",
    "text": "قَالَ اللهُ تَعَالَى: سَنُرِيهِمْ آيَاتِنَا فِي الْآفَاقِ وَفِي أَنْفُسِهِمْ. كُلَّمَا تَقَدَّمَ الْعِلْمُ اكْتَشَفْنَا عَجَائِبَ جَدِيدَةً. نَرَى مَجَرَّاتٍ تَبْعُدُ بِلْيُونَاتِ السِّنِينَ الضَّوْئِيَّةِ. نَكْتَشِفُ خَلَايَا أَصْغَرَ مِنْ ذَرَّةِ الْغُبَارِ. كُلُّ اكْتِشَافٍ يَزِيدُ إِيمَانَ الْعَالِمِ الْمُتَوَاضِعِ. الْجَاهِلُ يَظُنُّ أَنَّ الْعِلْمَ يُنَاقِضُ الدِّينَ، لَكِنَّ الْعَالِمَ الْحَقِيقِيَّ يَرَى أَنَّ كُلَّ قَانُونٍ طَبِيعِيٍّ يَشْهَدُ بِوُجُودِ الْمُشَرِّعِ. الْكَوْنُ كِتَابٌ مَفْتُوحٌ لِمَنْ يَقْرَأُ بِعَيْنِ الْبَصِيرَةِ.",
    "translation": "Allah the Exalted said: We will show them Our signs in the horizons and in themselves. Whenever science advances, we discover new wonders. We see galaxies billions of light-years away. We discover cells smaller than a speck of dust. Every discovery increases the faith of the humble scholar. The ignorant thinks science contradicts religion, but the true scientist sees that every natural law testifies to the existence of the Lawgiver. The universe is an open book for those who read with the eye of insight.",
    "grammaticalConcepts": [
      "Quranic quotation and tafsir",
      "Kullama conditional (كلما تقدم... اكتشفنا)",
      "Comparative (أصغر من)",
      "Anna clauses (أن العلم، أن كل قانون)",
      "Lakinna for contrast (لكن العالم)",
      "Metaphor (الكون كتاب)"
    ],
    "vocabularyHighlights": [
      { "word": "الْآفَاق", "meaning": "horizons" },
      { "word": "مَجَرَّات", "meaning": "galaxies" },
      { "word": "خَلَايَا", "meaning": "cells" },
      { "word": "الْمُشَرِّع", "meaning": "the Lawgiver" },
      { "word": "الْبَصِيرَة", "meaning": "insight, inner vision" }
    ],
    "moralLesson": "True science and faith are complementary, not contradictory. The more we understand creation, the more we appreciate the Creator.",
    "moralLessonAr": "العلم الحقيقي والإيمان متكاملان لا متناقضان. كلما فهمنا الخلق أكثر، ازداد تقديرنا للخالق.",
    "wordCount": 85
  },
  {
    "id": "a84",
    "title": "The Balance of Nature",
    "titleAr": "تَوَازُنُ الطَّبِيعَةِ",
    "level": "advanced",
    "category": "Science & Nature",
    "categoryAr": "العلوم والطبيعة",
    "text": "خَلَقَ اللهُ كُلَّ شَيْءٍ بِقَدَرٍ. النِّظَامُ الْبِيئِيُّ يَعْمَلُ بِتَوَازُنٍ دَقِيقٍ. الْمُفْتَرِسَاتُ تُنَظِّمُ أَعْدَادَ الْفَرَائِسِ. النَّبَاتَاتُ تُنْتِجُ الْأُكْسِجِينَ وَالْحَيَوَانَاتُ تُنْتِجُ ثَانِيَ أُكْسِيدِ الْكَرْبُونِ. الْبَكْتِيرْيَا تُحَلِّلُ الْمَوَادَّ الْعُضْوِيَّةَ وَتُعِيدُهَا لِلتُّرْبَةِ. كُلُّ كَائِنٍ لَهُ دَوْرٌ لَا يَسْتَطِيعُ غَيْرُهُ أَنْ يُؤَدِّيَهُ. لَكِنَّ الْإِنْسَانَ أَفْسَدَ هَذَا التَّوَازُنَ بِالتَّلَوُّثِ وَالِاسْتِهْلَاكِ الْمُفْرِطِ. نَحْنُ مُسْتَخْلَفُونَ فِي الْأَرْضِ وَمَسْؤُولُونَ عَنْ حِمَايَتِهَا.",
    "translation": "Allah created everything in measure. The ecosystem works with precise balance. Predators regulate prey populations. Plants produce oxygen and animals produce carbon dioxide. Bacteria decompose organic matter and return it to the soil. Every creature has a role that no other can fulfill. But humans have corrupted this balance with pollution and excessive consumption. We are stewards on Earth and responsible for protecting it.",
    "grammaticalConcepts": [
      "Form II verbs (تنظّم، تحلّل، تعيد)",
      "Form IV verb (أفسد)",
      "Passive participle (مستخلفون، مسؤولون)",
      "Scientific terminology",
      "Contrast with لكنّ",
      "Attached pronouns (تعيدها، حمايتها)"
    ],
    "vocabularyHighlights": [
      { "word": "النِّظَام الْبِيئِيّ", "meaning": "ecosystem" },
      { "word": "الْمُفْتَرِسَات", "meaning": "predators" },
      { "word": "الْفَرَائِس", "meaning": "prey" },
      { "word": "التَّلَوُّث", "meaning": "pollution" },
      { "word": "مُسْتَخْلَفُونَ", "meaning": "stewards, successors" }
    ],
    "moralLesson": "Environmental stewardship is an Islamic responsibility. The balance Allah created should be preserved, not destroyed.",
    "moralLessonAr": "حفظ البيئة مسؤولية إسلامية. التوازن الذي خلقه الله ينبغي أن يُحفظ لا أن يُدمّر.",
    "wordCount": 78
  },
  {
    "id": "a85",
    "title": "The Language of DNA",
    "titleAr": "لُغَةُ الْحَمْضِ النَّوَوِيِّ",
    "level": "advanced",
    "category": "Science & Nature",
    "categoryAr": "العلوم والطبيعة",
    "text": "فِي كُلِّ خَلِيَّةٍ مِنْ خَلَايَانَا كِتَابٌ مَكْتُوبٌ بِلُغَةٍ عَجِيبَةٍ. الْحَمْضُ النَّوَوِيُّ يَحْتَوِي عَلَى تَعْلِيمَاتٍ لِبِنَاءِ الْجِسْمِ كُلِّهِ. أَرْبَعَةُ أَحْرُفٍ فَقَطْ تَكْتُبُ رِسَالَةً مِنْ ثَلَاثَةِ مِلْيَارَاتِ حَرْفٍ. هَذِهِ الرِّسَالَةُ تُحَدِّدُ لَوْنَ عَيْنَيْكَ وَشَكْلَ وَجْهِكَ وَكُلَّ صِفَةٍ فِيكَ. الصُّدْفَةُ لَا تَكْتُبُ كِتَابًا. كُلُّ لُغَةٍ تَحْتَاجُ إِلَى كَاتِبٍ. فَمَنْ كَتَبَ كِتَابَ الْحَيَاةِ إِلَّا الْعَلِيمُ الْخَبِيرُ؟",
    "translation": "In every cell of our cells is a book written in an amazing language. DNA contains instructions for building the entire body. Only four letters write a message of three billion characters. This message determines the color of your eyes, the shape of your face, and every trait in you. Chance does not write books. Every language needs a writer. So who wrote the book of life except the All-Knowing, the All-Aware?",
    "grammaticalConcepts": [
      "Metaphor (كتاب مكتوب)",
      "Numbers (أربعة أحرف، ثلاثة مليارات)",
      "Form II verb (تحدّد)",
      "Rhetorical question (فمن كتب... إلا)",
      "Divine names (العليم الخبير)",
      "Negation (لا تكتب)"
    ],
    "vocabularyHighlights": [
      { "word": "خَلِيَّة", "meaning": "cell" },
      { "word": "الْحَمْض النَّوَوِيّ", "meaning": "DNA (nucleic acid)" },
      { "word": "تَعْلِيمَات", "meaning": "instructions" },
      { "word": "صِفَة", "meaning": "trait, characteristic" },
      { "word": "الصُّدْفَة", "meaning": "chance, coincidence" }
    ],
    "moralLesson": "The complexity of DNA is a powerful argument for design. Information and language point to an intelligent source.",
    "moralLessonAr": "تعقيد الحمض النووي حجة قوية على التصميم. المعلومات واللغة تشير إلى مصدر عاقل.",
    "wordCount": 76
  },
  {
    "id": "a86",
    "title": "The Ocean Depths",
    "titleAr": "أَعْمَاقُ الْمُحِيطِ",
    "level": "advanced",
    "category": "Science & Nature",
    "categoryAr": "العلوم والطبيعة",
    "text": "الْمُحِيطَاتُ تُغَطِّي أَكْثَرَ مِنْ سَبْعِينَ بِالْمِئَةِ مِنْ سَطْحِ الْأَرْضِ. فِي أَعْمَاقِهَا ظُلُمَاتٌ فَوْقَ ظُلُمَاتٍ. يَعِيشُ هُنَاكَ مَخْلُوقَاتٌ لَمْ نَكْتَشِفْ مِنْهَا إِلَّا الْقَلِيلَ. بَعْضُهَا يُضِيءُ فِي الظَّلَامِ. بَعْضُهَا يَتَحَمَّلُ ضَغْطًا هَائِلًا لَا يَتَحَمَّلُهُ الْإِنْسَانُ. قَالَ تَعَالَى: أَوْ كَظُلُمَاتٍ فِي بَحْرٍ لُجِّيٍّ يَغْشَاهُ مَوْجٌ مِنْ فَوْقِهِ مَوْجٌ. كَيْفَ عَرَفَ الْقُرْآنُ هَذِهِ الْحَقِيقَةَ قَبْلَ أَنْ يَغُوصَ الْإِنْسَانُ إِلَى تِلْكَ الْأَعْمَاقِ؟",
    "translation": "The oceans cover more than seventy percent of the Earth's surface. In their depths are layers of darkness upon darkness. There live creatures of which we have discovered only a few. Some glow in the darkness. Some withstand enormous pressure that humans cannot bear. Allah said: Or like layers of darkness in a deep sea, covered by waves upon waves. How did the Quran know this truth before humans dove to those depths?",
    "grammaticalConcepts": [
      "Percentages (سبعين بالمئة)",
      "Layered idafa (ظلمات فوق ظلمات)",
      "Exceptive (إلا القليل)",
      "Quranic quotation",
      "Rhetorical question (كيف عرف)",
      "Form V verb (يتحمّل)"
    ],
    "vocabularyHighlights": [
      { "word": "أَعْمَاق", "meaning": "depths" },
      { "word": "ظُلُمَات", "meaning": "layers of darkness" },
      { "word": "يُضِيءُ", "meaning": "glows, illuminates" },
      { "word": "ضَغْط", "meaning": "pressure" },
      { "word": "لُجِّيّ", "meaning": "deep (sea)" }
    ],
    "moralLesson": "The Quran contains scientific descriptions that could not have been known 1400 years ago. This is evidence of its divine origin.",
    "moralLessonAr": "القرآن يحتوي على وصف علمي لم يكن يمكن معرفته قبل 1400 سنة. هذا دليل على مصدره الإلهي.",
    "wordCount": 82
  },
  {
    "id": "a87",
    "title": "Time and Space",
    "titleAr": "الزَّمَانُ وَالْمَكَانُ",
    "level": "advanced",
    "category": "Science & Nature",
    "categoryAr": "العلوم والطبيعة",
    "text": "اكْتَشَفَ الْعُلَمَاءُ أَنَّ الزَّمَنَ لَيْسَ ثَابِتًا كَمَا كُنَّا نَظُنُّ. يَتَغَيَّرُ الزَّمَنُ بِتَغَيُّرِ السُّرْعَةِ وَالْجَاذِبِيَّةِ. يَوْمٌ عِنْدَ اللهِ كَأَلْفِ سَنَةٍ مِمَّا تَعُدُّونَ. هَذِهِ الْآيَةُ تُشِيرُ إِلَى نِسْبِيَّةِ الزَّمَنِ. الْكَوْنُ بَدَأَ مِنْ نُقْطَةٍ وَاحِدَةٍ وَلَا يَزَالُ يَتَوَسَّعُ. قَالَ تَعَالَى: وَالسَّمَاءَ بَنَيْنَاهَا بِأَيْدٍ وَإِنَّا لَمُوسِعُونَ. سُبْحَانَ الَّذِي خَلَقَ هَذَا الْكَوْنَ الْعَظِيمَ وَجَعَلَ فِيهِ آيَاتٍ لِلْمُتَفَكِّرِينَ!",
    "translation": "Scientists discovered that time is not constant as we used to think. Time changes with changes in speed and gravity. A day with Allah is like a thousand years of what you count. This verse indicates the relativity of time. The universe began from a single point and continues to expand. Allah said: And the heaven We constructed with strength, and indeed We are its expander. Glory to the One who created this magnificent universe and placed in it signs for those who reflect!",
    "grammaticalConcepts": [
      "Anna clause (أنّ الزمن ليس ثابتًا)",
      "Kana + present (كنا نظن)",
      "Quranic quotations",
      "La yazal + present (لا يزال يتوسع)",
      "Nominal predicate (لموسعون)",
      "Tasbeeh (سبحان الذي)"
    ],
    "vocabularyHighlights": [
      { "word": "ثَابِت", "meaning": "constant, fixed" },
      { "word": "الْجَاذِبِيَّة", "meaning": "gravity" },
      { "word": "نِسْبِيَّة", "meaning": "relativity" },
      { "word": "يَتَوَسَّعُ", "meaning": "expands" },
      { "word": "الْمُتَفَكِّرِين", "meaning": "those who reflect" }
    ],
    "moralLesson": "The Quran speaks of concepts like time relativity and cosmic expansion long before modern physics. This invites deeper reflection.",
    "moralLessonAr": "القرآن يتحدث عن مفاهيم كنسبية الزمن وتوسع الكون قبل الفيزياء الحديثة بقرون. هذا يدعو إلى تأمل أعمق.",
    "wordCount": 84
  },
  {
    "id": "a88",
    "title": "The Healing Plants",
    "titleAr": "النَّبَاتَاتُ الشَّافِيَةُ",
    "level": "advanced",
    "category": "Science & Nature",
    "categoryAr": "العلوم والطبيعة",
    "text": "خَلَقَ اللهُ لِكُلِّ دَاءٍ دَوَاءً. فِي النَّبَاتَاتِ أَسْرَارٌ شِفَائِيَّةٌ اكْتَشَفَ الْإِنْسَانُ بَعْضَهَا وَلَمْ يَكْتَشِفْ أَكْثَرَهَا. الْحَبَّةُ السَّوْدَاءُ شِفَاءٌ مِنْ كُلِّ دَاءٍ إِلَّا السَّامَ. الْعَسَلُ فِيهِ شِفَاءٌ لِلنَّاسِ. الزَّنْجَبِيلُ وَالزَّعْتَرُ وَالْحِلْبَةُ كُلُّهَا ذُكِرَتْ فِي الطِّبِّ النَّبَوِيِّ. الْيَوْمَ يَعُودُ الْعَالَمُ إِلَى الطِّبِّ الطَّبِيعِيِّ بَعْدَ أَنْ رَأَى أَضْرَارَ الْمَوَادِّ الْكِيمْيَائِيَّةِ. الْحِكْمَةُ تَجْمَعُ بَيْنَ الْقَدِيمِ وَالْحَدِيثِ.",
    "translation": "Allah created for every disease a cure. In plants are healing secrets, some of which humans have discovered and most of which they have not. The black seed is a cure for every disease except death. In honey there is healing for people. Ginger, thyme, and fenugreek are all mentioned in prophetic medicine. Today the world returns to natural medicine after seeing the harms of chemical substances. Wisdom combines the old and the new.",
    "grammaticalConcepts": [
      "Exception (إلا السام، بعضها... أكثرها)",
      "Muqaddam khabar (فيه شفاء)",
      "Passive (ذُكرت)",
      "Ba'd + an (بعد أن رأى)",
      "Dual objects (القديم والحديث)",
      "Prophetic hadith reference"
    ],
    "vocabularyHighlights": [
      { "word": "دَاء", "meaning": "disease" },
      { "word": "دَوَاء", "meaning": "cure, medicine" },
      { "word": "الْحَبَّة السَّوْدَاء", "meaning": "black seed (Nigella sativa)" },
      { "word": "الطِّبّ النَّبَوِيّ", "meaning": "prophetic medicine" },
      { "word": "الْمَوَادّ الْكِيمْيَائِيَّة", "meaning": "chemical substances" }
    ],
    "moralLesson": "Traditional Islamic medicine contains wisdom validated by modern research. Combining prophetic guidance with contemporary science offers the best approach to health.",
    "moralLessonAr": "الطب الإسلامي التقليدي يحتوي على حكمة أثبتها البحث الحديث. الجمع بين الهدي النبوي والعلم المعاصر يقدم أفضل نهج للصحة.",
    "wordCount": 80
  }
];
