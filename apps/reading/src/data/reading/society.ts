// src/data/reading/society.ts
// Daily Life & Society Texts (الحياة اليومية والمجتمع)
// Classical Arabic texts about family, work, community, and social interactions

import { ReadingText } from './types';

export const societyTexts: ReadingText[] = [
  // ============================================
  // BEGINNER SOCIETY TEXTS (b103-b108)
  // Simple texts about daily life ~30 words
  // ============================================
  {
    "id": "b103",
    "title": "The Family",
    "titleAr": "الْأُسْرَةُ",
    "level": "beginner",
    "category": "Daily Life & Society",
    "categoryAr": "الحياة اليومية والمجتمع",
    "text": "أَعِيشُ مَعَ أُسْرَتِي. أَبِي يَعْمَلُ وَأُمِّي تَهْتَمُّ بِالْبَيْتِ. لِي أَخٌ وَأُخْتٌ. نَأْكُلُ مَعًا وَنَتَحَدَّثُ. أُحِبُّ عَائِلَتِي كَثِيرًا. الْأُسْرَةُ نِعْمَةٌ كَبِيرَةٌ مِنَ اللهِ.",
    "translation": "I live with my family. My father works and my mother takes care of the house. I have a brother and a sister. We eat together and talk. I love my family very much. The family is a great blessing from Allah.",
    "grammaticalConcepts": [
      "Present tense verbs (أعيش، يعمل، تهتم، نأكل)",
      "Attached pronouns (أسرتي، أبي، أمي)",
      "Possession with لـ (لي أخ)",
      "Adverbs (معًا، كثيرًا)",
      "Nominal sentence (الأسرة نعمة)"
    ],
    "vocabularyHighlights": [
      { "word": "أُسْرَة", "meaning": "family" },
      { "word": "تَهْتَمُّ", "meaning": "takes care of" },
      { "word": "نَتَحَدَّثُ", "meaning": "we talk" },
      { "word": "عَائِلَة", "meaning": "family" },
      { "word": "نِعْمَة", "meaning": "blessing" }
    ],
    "moralLesson": "The family is the foundation of society. Time spent together strengthens bonds and creates lasting memories.",
    "moralLessonAr": "الأسرة أساس المجتمع. الوقت الذي نقضيه معًا يقوي الروابط ويخلق ذكريات دائمة.",
    "wordCount": 30
  },
  {
    "id": "b104",
    "title": "The Neighbor",
    "titleAr": "الْجَارُ",
    "level": "beginner",
    "category": "Daily Life & Society",
    "categoryAr": "الحياة اليومية والمجتمع",
    "text": "جَارُنَا رَجُلٌ طَيِّبٌ. نُسَلِّمُ عَلَيْهِ كُلَّ يَوْمٍ. إِذَا مَرِضَ زُرْنَاهُ. إِذَا احْتَاجَ سَاعَدْنَاهُ. قَالَ النَّبِيُّ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ: مَا زَالَ جِبْرِيلُ يُوصِينِي بِالْجَارِ.",
    "translation": "Our neighbor is a good man. We greet him every day. If he gets sick, we visit him. If he needs something, we help him. The Prophet, peace be upon him, said: Jibreel kept advising me about the neighbor.",
    "grammaticalConcepts": [
      "Conditional with إذا (إذا مرض، إذا احتاج)",
      "Form II verb (نسلّم)",
      "Attached pronouns (جارنا، عليه، زرناه)",
      "Hadith quotation format",
      "Past tense (مرض، احتاج)"
    ],
    "vocabularyHighlights": [
      { "word": "جَار", "meaning": "neighbor" },
      { "word": "نُسَلِّمُ", "meaning": "we greet" },
      { "word": "مَرِضَ", "meaning": "got sick" },
      { "word": "سَاعَدْنَاهُ", "meaning": "we helped him" },
      { "word": "يُوصِينِي", "meaning": "kept advising me" }
    ],
    "moralLesson": "The rights of neighbors are emphasized in Islam. Good neighbors create safe and supportive communities.",
    "moralLessonAr": "حقوق الجار مؤكدة في الإسلام. الجيران الطيبون يصنعون مجتمعات آمنة ومتعاونة.",
    "wordCount": 31
  },
  {
    "id": "b105",
    "title": "The Market",
    "titleAr": "السُّوقُ",
    "level": "beginner",
    "category": "Daily Life & Society",
    "categoryAr": "الحياة اليومية والمجتمع",
    "text": "أَذْهَبُ إِلَى السُّوقِ مَعَ أُمِّي. نَشْتَرِي الْخُضَارَ وَالْفَوَاكِهَ. الْبَائِعُ يُرَحِّبُ بِنَا. نَدْفَعُ الثَّمَنَ وَنَشْكُرُهُ. الْمُسْلِمُ صَادِقٌ فِي الْبَيْعِ وَالشِّرَاءِ. لَا يَغُشُّ وَلَا يَكْذِبُ.",
    "translation": "I go to the market with my mother. We buy vegetables and fruits. The seller welcomes us. We pay the price and thank him. The Muslim is honest in buying and selling. He does not cheat and does not lie.",
    "grammaticalConcepts": [
      "Present tense narration",
      "Form II verb (يرحّب)",
      "Negation with لا (لا يغش، لا يكذب)",
      "Masdar (البيع، الشراء)",
      "Adjective (صادق)"
    ],
    "vocabularyHighlights": [
      { "word": "سُوق", "meaning": "market" },
      { "word": "خُضَار", "meaning": "vegetables" },
      { "word": "بَائِع", "meaning": "seller" },
      { "word": "ثَمَن", "meaning": "price" },
      { "word": "يَغُشُّ", "meaning": "cheats" }
    ],
    "moralLesson": "Honesty in trade is a religious duty. Fair dealings build trust in the community.",
    "moralLessonAr": "الصدق في التجارة واجب ديني. المعاملات العادلة تبني الثقة في المجتمع.",
    "wordCount": 32
  },
  {
    "id": "b106",
    "title": "The School",
    "titleAr": "الْمَدْرَسَةُ",
    "level": "beginner",
    "category": "Daily Life & Society",
    "categoryAr": "الحياة اليومية والمجتمع",
    "text": "أَذْهَبُ إِلَى الْمَدْرَسَةِ صَبَاحًا. أَتَعَلَّمُ الْقِرَاءَةَ وَالْكِتَابَةَ وَالْحِسَابَ. أُحِبُّ مُعَلِّمِي وَأَحْتَرِمُهُ. أَلْعَبُ مَعَ أَصْدِقَائِي فِي الْفُسْحَةِ. الْعِلْمُ نُورٌ يُنِيرُ حَيَاتَنَا.",
    "translation": "I go to school in the morning. I learn reading, writing, and arithmetic. I love my teacher and respect him. I play with my friends during break time. Knowledge is a light that illuminates our lives.",
    "grammaticalConcepts": [
      "Present tense verbs (أذهب، أتعلم، أحب، ألعب)",
      "Masdar as object (القراءة، الكتابة، الحساب)",
      "Attached pronouns (معلمي، أصدقائي، حياتنا)",
      "Relative clause (نور ينير)",
      "Time adverb (صباحًا)"
    ],
    "vocabularyHighlights": [
      { "word": "مَدْرَسَة", "meaning": "school" },
      { "word": "الْقِرَاءَة", "meaning": "reading" },
      { "word": "الْكِتَابَة", "meaning": "writing" },
      { "word": "الْحِسَاب", "meaning": "arithmetic" },
      { "word": "الْفُسْحَة", "meaning": "break time, recess" }
    ],
    "moralLesson": "School is where we gain knowledge and build friendships. Respecting teachers is part of respecting knowledge.",
    "moralLessonAr": "المدرسة حيث نكتسب العلم ونبني الصداقات. احترام المعلمين جزء من احترام العلم.",
    "wordCount": 28
  },
  {
    "id": "b107",
    "title": "The Mosque",
    "titleAr": "الْمَسْجِدُ",
    "level": "beginner",
    "category": "Daily Life & Society",
    "categoryAr": "الحياة اليومية والمجتمع",
    "text": "الْمَسْجِدُ بَيْتُ اللهِ. نَذْهَبُ إِلَيْهِ لِلصَّلَاةِ. نَخْلَعُ أَحْذِيَتَنَا وَنَتَوَضَّأُ. نَقِفُ فِي صُفُوفٍ مُنَظَّمَةٍ. نُصَلِّي خَلْفَ الْإِمَامِ. فِي الْمَسْجِدِ نَشْعُرُ بِالسَّكِينَةِ وَنَلْتَقِي بِإِخْوَانِنَا.",
    "translation": "The mosque is the house of Allah. We go to it for prayer. We remove our shoes and make ablution. We stand in organized rows. We pray behind the imam. In the mosque we feel tranquility and meet our brothers.",
    "grammaticalConcepts": [
      "Idafa (بيت الله)",
      "Lam of purpose (للصلاة)",
      "Form V verb (نتوضأ)",
      "Plural patterns (صفوف، أحذية)",
      "Prepositions (إلى، في، خلف، بـ)"
    ],
    "vocabularyHighlights": [
      { "word": "مَسْجِد", "meaning": "mosque" },
      { "word": "نَخْلَعُ", "meaning": "we remove" },
      { "word": "نَتَوَضَّأُ", "meaning": "we make ablution" },
      { "word": "صُفُوف", "meaning": "rows" },
      { "word": "السَّكِينَة", "meaning": "tranquility" }
    ],
    "moralLesson": "The mosque is a place of worship and community. It brings Muslims together in prayer and brotherhood.",
    "moralLessonAr": "المسجد مكان للعبادة والمجتمع. يجمع المسلمين في الصلاة والأخوة.",
    "wordCount": 32
  },
  {
    "id": "b108",
    "title": "Friendship",
    "titleAr": "الصَّدَاقَةُ",
    "level": "beginner",
    "category": "Daily Life & Society",
    "categoryAr": "الحياة اليومية والمجتمع",
    "text": "لِي صَدِيقٌ اسْمُهُ أَحْمَدُ. نَلْعَبُ مَعًا وَنَدْرُسُ مَعًا. إِذَا حَزِنْتُ وَاسَانِي. إِذَا أَخْطَأْتُ نَصَحَنِي. الصَّدِيقُ الْحَقِيقِيُّ كَنْزٌ ثَمِينٌ. قَالَ النَّبِيُّ: الْمَرْءُ عَلَى دِينِ خَلِيلِهِ.",
    "translation": "I have a friend named Ahmad. We play together and study together. If I am sad, he comforts me. If I make a mistake, he advises me. A true friend is a precious treasure. The Prophet said: A person is upon the religion of his close friend.",
    "grammaticalConcepts": [
      "Possession with لـ (لي صديق)",
      "Conditional with إذا (إذا حزنت، إذا أخطأت)",
      "Form III verb (واساني)",
      "Hadith quotation",
      "Nominal predicate (كنز ثمين)"
    ],
    "vocabularyHighlights": [
      { "word": "صَدِيق", "meaning": "friend" },
      { "word": "وَاسَانِي", "meaning": "comforted me" },
      { "word": "نَصَحَنِي", "meaning": "advised me" },
      { "word": "كَنْز", "meaning": "treasure" },
      { "word": "خَلِيل", "meaning": "close friend" }
    ],
    "moralLesson": "Choose friends wisely, for they influence your character and faith. True friendship involves mutual support and sincere advice.",
    "moralLessonAr": "اختر أصدقاءك بحكمة فهم يؤثرون في شخصيتك وإيمانك. الصداقة الحقيقية تتضمن الدعم المتبادل والنصيحة الصادقة.",
    "wordCount": 33
  },

  // ============================================
  // INTERMEDIATE SOCIETY TEXTS (i94-i99)
  // More detailed social topics ~55 words
  // ============================================
  {
    "id": "i94",
    "title": "Hospitality",
    "titleAr": "الضِّيَافَةُ",
    "level": "intermediate",
    "category": "Daily Life & Society",
    "categoryAr": "الحياة اليومية والمجتمع",
    "text": "الضِّيَافَةُ مِنْ أَخْلَاقِ الْعَرَبِ وَالْمُسْلِمِينَ. إِذَا جَاءَ الضَّيْفُ رَحَّبْنَا بِهِ وَأَكْرَمْنَاهُ. نُقَدِّمُ لَهُ أَحْسَنَ الطَّعَامِ وَنُجْلِسُهُ فِي أَفْضَلِ مَكَانٍ. قَالَ النَّبِيُّ: مَنْ كَانَ يُؤْمِنُ بِاللهِ وَالْيَوْمِ الْآخِرِ فَلْيُكْرِمْ ضَيْفَهُ. الْكَرَمُ لَا يَعْنِي الْإِسْرَافَ بَلِ الْإِحْسَانَ بِمَا نَمْلِكُ.",
    "translation": "Hospitality is from the ethics of Arabs and Muslims. When a guest comes, we welcome and honor him. We offer him the best food and seat him in the best place. The Prophet said: Whoever believes in Allah and the Last Day, let him honor his guest. Generosity does not mean extravagance but rather doing good with what we have.",
    "grammaticalConcepts": [
      "Conditional with إذا + past (إذا جاء)",
      "Superlative (أحسن، أفضل)",
      "Conditional with من + كان (من كان يؤمن)",
      "Lam of command (فليكرم)",
      "Contrast with بل (لا يعني... بل)"
    ],
    "vocabularyHighlights": [
      { "word": "ضِيَافَة", "meaning": "hospitality" },
      { "word": "ضَيْف", "meaning": "guest" },
      { "word": "رَحَّبْنَا", "meaning": "we welcomed" },
      { "word": "الْكَرَم", "meaning": "generosity" },
      { "word": "الْإِسْرَاف", "meaning": "extravagance" }
    ],
    "moralLesson": "Hospitality reflects faith. Honoring guests with what we have, without extravagance, is the balanced Islamic approach.",
    "moralLessonAr": "الضيافة تعكس الإيمان. إكرام الضيوف بما نملك دون إسراف هو النهج الإسلامي المتوازن.",
    "wordCount": 52
  },
  {
    "id": "i95",
    "title": "Work Ethics",
    "titleAr": "أَخْلَاقِيَّاتُ الْعَمَلِ",
    "level": "intermediate",
    "category": "Daily Life & Society",
    "categoryAr": "الحياة اليومية والمجتمع",
    "text": "الْعَمَلُ عِبَادَةٌ إِذَا أَخْلَصْنَا النِّيَّةَ. الْمُسْلِمُ يُتْقِنُ عَمَلَهُ وَلَا يَغُشُّ. يَحْتَرِمُ الْوَقْتَ وَلَا يُضَيِّعُهُ. يَتَعَامَلُ مَعَ زُمَلَائِهِ بِاحْتِرَامٍ. لَا يَأْخُذُ مَالًا لَمْ يَسْتَحِقَّهُ. قَالَ النَّبِيُّ: إِنَّ اللهَ يُحِبُّ إِذَا عَمِلَ أَحَدُكُمْ عَمَلًا أَنْ يُتْقِنَهُ. الْإِتْقَانُ طَرِيقُ النَّجَاحِ.",
    "translation": "Work is worship if we purify our intention. The Muslim perfects his work and does not cheat. He respects time and does not waste it. He deals with his colleagues with respect. He does not take money he did not earn. The Prophet said: Allah loves when one of you does work that he perfects it. Excellence is the path to success.",
    "grammaticalConcepts": [
      "Conditional with إذا (إذا أخلصنا، إذا عمل)",
      "Form IV verb (يتقن، أخلصنا)",
      "Form II verb (يضيّع)",
      "Negation with لا (لا يغش، لا يضيعه، لا يأخذ)",
      "Anna clause (إن الله يحب)"
    ],
    "vocabularyHighlights": [
      { "word": "عِبَادَة", "meaning": "worship" },
      { "word": "أَخْلَصْنَا", "meaning": "we purified" },
      { "word": "يُتْقِنُ", "meaning": "perfects" },
      { "word": "زُمَلَاء", "meaning": "colleagues" },
      { "word": "الْإِتْقَان", "meaning": "excellence, perfection" }
    ],
    "moralLesson": "Islam elevates work to worship when done with sincerity and excellence. Perfection in work is beloved to Allah.",
    "moralLessonAr": "الإسلام يرفع العمل إلى مرتبة العبادة حين يُؤدى بإخلاص وإتقان. الإتقان في العمل محبوب عند الله.",
    "wordCount": 55
  },
  {
    "id": "i96",
    "title": "Raising Children",
    "titleAr": "تَرْبِيَةُ الْأَطْفَالِ",
    "level": "intermediate",
    "category": "Daily Life & Society",
    "categoryAr": "الحياة اليومية والمجتمع",
    "text": "الْأَطْفَالُ أَمَانَةٌ مِنَ اللهِ. يَجِبُ أَنْ نُعَلِّمَهُمُ الدِّينَ وَالْأَخْلَاقَ الْحَسَنَةَ. نُعَامِلُهُمْ بِالرَّحْمَةِ لَا بِالْقَسْوَةِ. نَسْتَمِعُ إِلَيْهِمْ وَنَحْتَرِمُ مَشَاعِرَهُمْ. نَكُونُ لَهُمْ قُدْوَةً حَسَنَةً. قَالَ النَّبِيُّ: كُلُّكُمْ رَاعٍ وَكُلُّكُمْ مَسْؤُولٌ عَنْ رَعِيَّتِهِ.",
    "translation": "Children are a trust from Allah. We must teach them religion and good morals. We treat them with mercy, not harshness. We listen to them and respect their feelings. We become good role models for them. The Prophet said: Each of you is a shepherd and each of you is responsible for his flock.",
    "grammaticalConcepts": [
      "Modal (يجب أن نعلّمهم)",
      "Form II verb (نعلّمهم، نعاملهم)",
      "Contrast with لا (بالرحمة لا بالقسوة)",
      "Attached pronouns (مشاعرهم، رعيته)",
      "Kana as auxiliary (نكون لهم)"
    ],
    "vocabularyHighlights": [
      { "word": "أَمَانَة", "meaning": "trust" },
      { "word": "تَرْبِيَة", "meaning": "upbringing, education" },
      { "word": "الْقَسْوَة", "meaning": "harshness" },
      { "word": "قُدْوَة", "meaning": "role model" },
      { "word": "رَعِيَّة", "meaning": "flock, those under one's care" }
    ],
    "moralLesson": "Parenting is a responsibility that requires mercy, listening, and leading by example. Children learn more from what we do than what we say.",
    "moralLessonAr": "التربية مسؤولية تتطلب الرحمة والاستماع والقدوة. الأطفال يتعلمون من أفعالنا أكثر من أقوالنا.",
    "wordCount": 47
  },
  {
    "id": "i97",
    "title": "Community Service",
    "titleAr": "خِدْمَةُ الْمُجْتَمَعِ",
    "level": "intermediate",
    "category": "Daily Life & Society",
    "categoryAr": "الحياة اليومية والمجتمع",
    "text": "الْمُسْلِمُ يُحِبُّ الْخَيْرَ لِلنَّاسِ جَمِيعًا. يُسَاعِدُ الْفُقَرَاءَ وَيَزُورُ الْمَرْضَى. يُعَلِّمُ الْجَاهِلَ وَيُرْشِدُ الضَّالَّ. يُشَارِكُ فِي تَنْظِيفِ الْحَيِّ وَتَجْمِيلِهِ. كُلُّ عَمَلٍ نَافِعٍ صَدَقَةٌ. قَالَ النَّبِيُّ: خَيْرُ النَّاسِ أَنْفَعُهُمْ لِلنَّاسِ. فَلْنَكُنْ مِمَّنْ يَنْفَعُ مُجْتَمَعَهُ.",
    "translation": "The Muslim loves good for all people. He helps the poor and visits the sick. He teaches the ignorant and guides the lost. He participates in cleaning and beautifying the neighborhood. Every beneficial deed is charity. The Prophet said: The best people are those most beneficial to people. So let us be among those who benefit their community.",
    "grammaticalConcepts": [
      "Form II verbs (يساعد، يعلّم، يرشد، يشارك)",
      "Active participles (الفقراء، المرضى، الجاهل، الضال)",
      "Superlative (خير الناس أنفعهم)",
      "Lam of command (فلنكن)",
      "Relative clause (ممن ينفع)"
    ],
    "vocabularyHighlights": [
      { "word": "خِدْمَة", "meaning": "service" },
      { "word": "يُرْشِدُ", "meaning": "guides" },
      { "word": "الْحَيّ", "meaning": "neighborhood" },
      { "word": "نَافِع", "meaning": "beneficial" },
      { "word": "صَدَقَة", "meaning": "charity" }
    ],
    "moralLesson": "Serving the community is a form of worship. The best Muslims are those who benefit others most.",
    "moralLessonAr": "خدمة المجتمع شكل من أشكال العبادة. أفضل المسلمين من ينفعون الناس أكثر.",
    "wordCount": 53
  },
  {
    "id": "i98",
    "title": "Marriage",
    "titleAr": "الزَّوَاجُ",
    "level": "intermediate",
    "category": "Daily Life & Society",
    "categoryAr": "الحياة اليومية والمجتمع",
    "text": "الزَّوَاجُ سُنَّةُ النَّبِيِّ وَنِصْفُ الدِّينِ. الزَّوْجُ وَالزَّوْجَةُ شَرِيكَانِ فِي الْحَيَاةِ. يَتَعَاوَنَانِ عَلَى الْخَيْرِ وَيَتَحَمَّلَانِ الصَّعْبَ مَعًا. الْمَوَدَّةُ وَالرَّحْمَةُ أَسَاسُ الْعَلَاقَةِ. لَا تَكْتَمِلُ السَّعَادَةُ إِلَّا بِالتَّفَاهُمِ وَالِاحْتِرَامِ الْمُتَبَادَلِ. وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُمْ مِنْ أَنْفُسِكُمْ أَزْوَاجًا لِتَسْكُنُوا إِلَيْهَا.",
    "translation": "Marriage is the Prophet's tradition and half of the religion. The husband and wife are partners in life. They cooperate on good and bear hardship together. Love and mercy are the foundation of the relationship. Happiness is not complete except with mutual understanding and respect. And among His signs is that He created for you from yourselves spouses that you may find tranquility in them.",
    "grammaticalConcepts": [
      "Idafa (سنة النبي، نصف الدين)",
      "Dual verbs (يتعاونان، يتحملان)",
      "Negation with إلا (لا تكتمل إلا)",
      "Quranic quotation",
      "Lam of purpose (لتسكنوا)"
    ],
    "vocabularyHighlights": [
      { "word": "شَرِيكَان", "meaning": "two partners" },
      { "word": "يَتَعَاوَنَان", "meaning": "they cooperate" },
      { "word": "الْمَوَدَّة", "meaning": "love, affection" },
      { "word": "التَّفَاهُم", "meaning": "understanding" },
      { "word": "لِتَسْكُنُوا", "meaning": "that you may find tranquility" }
    ],
    "moralLesson": "Marriage is built on partnership, love, and mercy. Success requires mutual respect and cooperation through all circumstances.",
    "moralLessonAr": "الزواج مبني على الشراكة والمودة والرحمة. النجاح يتطلب الاحترام المتبادل والتعاون في كل الظروف.",
    "wordCount": 55
  },
  {
    "id": "i99",
    "title": "Respecting Elders",
    "titleAr": "احْتِرَامُ الْكِبَارِ",
    "level": "intermediate",
    "category": "Daily Life & Society",
    "categoryAr": "الحياة اليومية والمجتمع",
    "text": "كِبَارُ السِّنِّ لَهُمْ مَكَانَةٌ خَاصَّةٌ فِي الْإِسْلَامِ. نَحْتَرِمُهُمْ وَنُقَدِّرُ تَجْرِبَتَهُمْ. نُسَاعِدُهُمْ إِذَا احْتَاجُوا وَنَسْتَمِعُ إِلَى نَصَائِحِهِمْ. نُقَدِّمُهُمْ فِي الْمَجَالِسِ وَنَبْدَأُ بِهِمْ فِي الطَّعَامِ. قَالَ النَّبِيُّ: لَيْسَ مِنَّا مَنْ لَمْ يَرْحَمْ صَغِيرَنَا وَيُوَقِّرْ كَبِيرَنَا. فِي تَوْقِيرِ الْكِبَارِ بَرَكَةٌ.",
    "translation": "Elderly people have a special status in Islam. We respect them and appreciate their experience. We help them if they need and listen to their advice. We give them precedence in gatherings and start with them in food. The Prophet said: He is not of us who does not have mercy on our young and respect our elders. In honoring elders there is blessing.",
    "grammaticalConcepts": [
      "Idafa (كبار السن)",
      "Conditional with إذا (إذا احتاجوا)",
      "Negation with ليس من (ليس منا من)",
      "Form II verbs (نقدّر، نساعد، نقدّم، يوقّر)",
      "Fronted predicate (في توقير الكبار بركة)"
    ],
    "vocabularyHighlights": [
      { "word": "كِبَار السِّنّ", "meaning": "elderly, seniors" },
      { "word": "تَجْرِبَة", "meaning": "experience" },
      { "word": "نَصَائِح", "meaning": "advice" },
      { "word": "الْمَجَالِس", "meaning": "gatherings" },
      { "word": "تَوْقِير", "meaning": "respect, honor" }
    ],
    "moralLesson": "Respecting elders is a sign of good character and faith. Their wisdom and experience are treasures for society.",
    "moralLessonAr": "احترام الكبار علامة حسن الخلق والإيمان. حكمتهم وتجربتهم كنوز للمجتمع.",
    "wordCount": 56
  },

  // ============================================
  // ADVANCED SOCIETY TEXTS (a89-a94)
  // Deep social and ethical topics ~100+ words
  // ============================================
  {
    "id": "a89",
    "title": "Social Bonds in Islam",
    "titleAr": "الرَّوَابِطُ الِاجْتِمَاعِيَّةُ فِي الْإِسْلَامِ",
    "level": "advanced",
    "category": "Daily Life & Society",
    "categoryAr": "الحياة اليومية والمجتمع",
    "text": "بَنَى الْإِسْلَامُ مُجْتَمَعًا مُتَمَاسِكًا. جَعَلَ الْمُسْلِمِينَ إِخْوَةً تَجْمَعُهُمْ رَابِطَةُ الْإِيمَانِ. إِنَّمَا الْمُؤْمِنُونَ إِخْوَةٌ. هَذِهِ الْأُخُوَّةُ لَيْسَتْ كَلَامًا بَلْ لَهَا حُقُوقٌ وَوَاجِبَاتٌ. نُصْرَةُ الْمَظْلُومِ وَإِغَاثَةُ الْمَلْهُوفِ وَعِيَادَةُ الْمَرِيضِ وَتَشْيِيعُ الْجَنَائِزِ. الْمُسْلِمُونَ كَالْجَسَدِ الْوَاحِدِ، إِذَا اشْتَكَى مِنْهُ عُضْوٌ تَدَاعَى لَهُ سَائِرُ الْجَسَدِ. هَذَا التَّكَافُلُ يَحْمِي الْفَرْدَ وَالْمُجْتَمَعَ.",
    "translation": "Islam built a cohesive society. It made Muslims brothers united by the bond of faith. The believers are but brothers. This brotherhood is not just words but has rights and duties: supporting the oppressed, aiding the distressed, visiting the sick, and attending funerals. Muslims are like one body—if one limb complains, the rest of the body responds to it. This solidarity protects the individual and society.",
    "grammaticalConcepts": [
      "Innama for restriction (إنما المؤمنون)",
      "Leysat + accusative (ليست كلامًا)",
      "Contrast with بل (بل لها حقوق)",
      "Conditional with إذا (إذا اشتكى)",
      "Simile with كـ (كالجسد الواحد)",
      "Masdar series (نصرة، إغاثة، عيادة)"
    ],
    "vocabularyHighlights": [
      { "word": "مُتَمَاسِك", "meaning": "cohesive, solid" },
      { "word": "رَابِطَة", "meaning": "bond, connection" },
      { "word": "الْمَظْلُوم", "meaning": "the oppressed" },
      { "word": "الْمَلْهُوف", "meaning": "the distressed" },
      { "word": "التَّكَافُل", "meaning": "solidarity, mutual support" }
    ],
    "moralLesson": "Islamic brotherhood creates a safety net for all members of society. Faith-based bonds transcend tribal and national divisions.",
    "moralLessonAr": "الأخوة الإسلامية تخلق شبكة أمان لكل أفراد المجتمع. الروابط الإيمانية تتجاوز الانقسامات القبلية والوطنية.",
    "wordCount": 76
  },
  {
    "id": "a90",
    "title": "Rights of Others",
    "titleAr": "حُقُوقُ الْآخَرِينَ",
    "level": "advanced",
    "category": "Daily Life & Society",
    "categoryAr": "الحياة اليومية والمجتمع",
    "text": "لَا يَكْتَمِلُ إِيمَانُ الْمَرْءِ حَتَّى يُحِبَّ لِأَخِيهِ مَا يُحِبُّ لِنَفْسِهِ. لِكُلِّ إِنْسَانٍ حُقُوقٌ يَجِبُ احْتِرَامُهَا. لِلْوَالِدَيْنِ حَقُّ الْبِرِّ وَالطَّاعَةِ. لِلْجَارِ حَقُّ الْإِحْسَانِ وَكَفِّ الْأَذَى. لِلطَّرِيقِ حَقٌّ أَنْ نُزِيلَ عَنْهُ الْأَذَى. لِلْحَيَوَانِ حَقٌّ أَلَّا نُعَذِّبَهُ. حَتَّى الْبِيئَةُ لَهَا حَقٌّ عَلَيْنَا. الْإِسْلَامُ دِينُ الْحُقُوقِ وَالْوَاجِبَاتِ الْمُتَوَازِنَةِ.",
    "translation": "A person's faith is not complete until he loves for his brother what he loves for himself. Every person has rights that must be respected. Parents have the right to kindness and obedience. The neighbor has the right to good treatment and refraining from harm. The road has a right that we remove harm from it. Animals have a right not to be tortured. Even the environment has a right over us. Islam is a religion of balanced rights and duties.",
    "grammaticalConcepts": [
      "Negation with حتى (لا يكتمل حتى)",
      "Fronted predicate (للوالدين حق)",
      "Anna clauses (أن نزيل، ألا نعذبه)",
      "Active participle (المتوازنة)",
      "Idafa chains (حق البر والطاعة)"
    ],
    "vocabularyHighlights": [
      { "word": "الْبِرّ", "meaning": "righteousness, kindness to parents" },
      { "word": "كَفّ الْأَذَى", "meaning": "refraining from harm" },
      { "word": "نُعَذِّبَ", "meaning": "torture" },
      { "word": "الْبِيئَة", "meaning": "environment" },
      { "word": "الْمُتَوَازِنَة", "meaning": "balanced" }
    ],
    "moralLesson": "Islam established a comprehensive system of rights extending to parents, neighbors, animals, and the environment. Faith is demonstrated through respecting these rights.",
    "moralLessonAr": "الإسلام أسس نظامًا شاملًا للحقوق يمتد إلى الوالدين والجيران والحيوانات والبيئة. الإيمان يُثبت باحترام هذه الحقوق.",
    "wordCount": 80
  },
  {
    "id": "a91",
    "title": "Balance Between Work and Family",
    "titleAr": "التَّوَازُنُ بَيْنَ الْعَمَلِ وَالْأُسْرَةِ",
    "level": "advanced",
    "category": "Daily Life & Society",
    "categoryAr": "الحياة اليومية والمجتمع",
    "text": "يَسْعَى الْإِنْسَانُ لِكَسْبِ الرِّزْقِ وَتَوْفِيرِ حَيَاةٍ كَرِيمَةٍ لِأُسْرَتِهِ. لَكِنَّ الْإِغْرَاقَ فِي الْعَمَلِ قَدْ يُدَمِّرُ الْأُسْرَةَ. الْأَوْلَادُ يَحْتَاجُونَ إِلَى وَقْتِ آبَائِهِمْ أَكْثَرَ مِنْ حَاجَتِهِمْ إِلَى الْمَالِ. الزَّوْجَةُ تَحْتَاجُ إِلَى شَرِيكٍ حَاضِرٍ لَا غَائِبٍ. قَالَ سَلْمَانُ لِأَبِي الدَّرْدَاءِ: إِنَّ لِرَبِّكَ عَلَيْكَ حَقًّا، وَلِأَهْلِكَ عَلَيْكَ حَقًّا، فَأَعْطِ كُلَّ ذِي حَقٍّ حَقَّهُ. الْحِكْمَةُ فِي التَّوَازُنِ لَا فِي التَّطَرُّفِ.",
    "translation": "A person strives to earn provision and provide a dignified life for his family. But drowning in work may destroy the family. Children need their parents' time more than they need money. The wife needs a present partner, not an absent one. Salman said to Abu Darda: Your Lord has a right over you, and your family has a right over you, so give every right-holder their right. Wisdom is in balance, not in extremism.",
    "grammaticalConcepts": [
      "Lakinna for contrast (لكن الإغراق)",
      "Comparative (أكثر من)",
      "Contrast with لا (حاضر لا غائب)",
      "Anna clauses (إن لربك، ولأهلك)",
      "Imperative (أعطِ)",
      "Fronted predicate (الحكمة في التوازن)"
    ],
    "vocabularyHighlights": [
      { "word": "كَسْب الرِّزْق", "meaning": "earning provision" },
      { "word": "الْإِغْرَاق", "meaning": "drowning, immersion" },
      { "word": "يُدَمِّرُ", "meaning": "destroys" },
      { "word": "شَرِيك حَاضِر", "meaning": "present partner" },
      { "word": "التَّطَرُّف", "meaning": "extremism" }
    ],
    "moralLesson": "Islam teaches balance in all things. Family has rights that cannot be sacrificed for career ambitions. True success includes family wellbeing.",
    "moralLessonAr": "الإسلام يعلّم التوازن في كل شيء. الأسرة لها حقوق لا يمكن التضحية بها من أجل الطموحات المهنية. النجاح الحقيقي يشمل رفاهية الأسرة.",
    "wordCount": 82
  },
  {
    "id": "a92",
    "title": "The Role of Women",
    "titleAr": "دَوْرُ الْمَرْأَةِ",
    "level": "advanced",
    "category": "Daily Life & Society",
    "categoryAr": "الحياة اليومية والمجتمع",
    "text": "رَفَعَ الْإِسْلَامُ مَكَانَةَ الْمَرْأَةِ بَعْدَ أَنْ كَانَتْ مُهَانَةً فِي الْجَاهِلِيَّةِ. جَعَلَهَا شَرِيكَةً لِلرَّجُلِ فِي الْإِنْسَانِيَّةِ وَالتَّكْلِيفِ. لَهَا حَقُّ التَّعْلِيمِ وَالْعَمَلِ وَالتَّمَلُّكِ. كَانَتْ خَدِيجَةُ تَاجِرَةً نَاجِحَةً، وَعَائِشَةُ عَالِمَةً يَأْتِيهَا الصَّحَابَةُ لِلْفَتْوَى. الْمَرْأَةُ أُمٌّ وَمُرَبِّيَةٌ وَمُعَلِّمَةٌ. تَحْتَ أَقْدَامِهَا الْجَنَّةُ إِذَا كَانَتْ أُمًّا. دَوْرُهَا فِي بِنَاءِ الْأَجْيَالِ لَا يَقِلُّ أَهَمِّيَّةً عَنْ أَيِّ دَوْرٍ آخَرَ.",
    "translation": "Islam elevated the status of women after they were humiliated in pre-Islamic times. It made her a partner to man in humanity and religious duty. She has the right to education, work, and ownership. Khadijah was a successful merchant, and Aisha was a scholar whom companions would come to for religious rulings. Woman is mother, educator, and teacher. Paradise is under her feet if she is a mother. Her role in building generations is no less important than any other role.",
    "grammaticalConcepts": [
      "Kanat + predicate (كانت مهانة، كانت تاجرة)",
      "Form II verb (رفع، جعل)",
      "Idafa chains (حق التعليم والعمل والتملك)",
      "Relative clause (عالمة يأتيها الصحابة)",
      "Negation with لا يقل (لا يقل أهمية)"
    ],
    "vocabularyHighlights": [
      { "word": "مُهَانَة", "meaning": "humiliated" },
      { "word": "الْجَاهِلِيَّة", "meaning": "pre-Islamic era" },
      { "word": "التَّكْلِيف", "meaning": "religious duty" },
      { "word": "التَّمَلُّك", "meaning": "ownership" },
      { "word": "مُرَبِّيَة", "meaning": "educator" }
    ],
    "moralLesson": "Islam dignified women and granted them rights centuries before modern movements. Their contributions span scholarship, commerce, and the crucial role of raising future generations.",
    "moralLessonAr": "الإسلام كرّم المرأة ومنحها حقوقها قبل الحركات الحديثة بقرون. إسهاماتها تشمل العلم والتجارة والدور الحاسم في تربية الأجيال.",
    "wordCount": 82
  },
  {
    "id": "a93",
    "title": "Justice in Society",
    "titleAr": "الْعَدْلُ فِي الْمُجْتَمَعِ",
    "level": "advanced",
    "category": "Daily Life & Society",
    "categoryAr": "الحياة اليومية والمجتمع",
    "text": "الْعَدْلُ أَسَاسُ الْمُلْكِ وَعَمُودُ الْحَضَارَةِ. أَمَرَ اللهُ بِالْعَدْلِ حَتَّى مَعَ الْأَعْدَاءِ: وَلَا يَجْرِمَنَّكُمْ شَنَآنُ قَوْمٍ عَلَى أَلَّا تَعْدِلُوا. لَا فَرْقَ بَيْنَ غَنِيٍّ وَفَقِيرٍ أَمَامَ الْقَانُونِ. لَا فَرْقَ بَيْنَ قَوِيٍّ وَضَعِيفٍ أَمَامَ الْقَضَاءِ. قَالَ عُمَرُ: لَوْ عَثَرَتْ بَغْلَةٌ فِي الْعِرَاقِ لَخَشِيتُ أَنْ يَسْأَلَنِي اللهُ عَنْهَا. هَذَا مُسْتَوَى الْمَسْؤُولِيَّةِ الَّذِي يُرِيدُهُ الْإِسْلَامُ مِنَ الْحَاكِمِ.",
    "translation": "Justice is the foundation of governance and the pillar of civilization. Allah commanded justice even with enemies: And do not let hatred of a people prevent you from being just. There is no difference between rich and poor before the law. No difference between strong and weak before the judiciary. Umar said: If a mule stumbled in Iraq, I would fear that Allah would ask me about it. This is the level of responsibility that Islam wants from the ruler.",
    "grammaticalConcepts": [
      "Quranic quotation with لا (لا يجرمنّكم)",
      "Emphatic nun (يجرمنّكم)",
      "Conditional with لو (لو عثرت... لخشيت)",
      "Negation with لا فرق (لا فرق بين)",
      "Relative clause (الذي يريده)"
    ],
    "vocabularyHighlights": [
      { "word": "الْمُلْك", "meaning": "governance, kingdom" },
      { "word": "شَنَآن", "meaning": "hatred" },
      { "word": "الْقَضَاء", "meaning": "judiciary" },
      { "word": "عَثَرَتْ", "meaning": "stumbled" },
      { "word": "بَغْلَة", "meaning": "mule" }
    ],
    "moralLesson": "Islamic justice is absolute and universal, regardless of status or enmity. Rulers are accountable for the welfare of every creature under their care.",
    "moralLessonAr": "العدل الإسلامي مطلق وشامل بغض النظر عن المكانة أو العداوة. الحكام مسؤولون عن رفاهية كل مخلوق تحت رعايتهم.",
    "wordCount": 83
  },
  {
    "id": "a94",
    "title": "Unity and Brotherhood",
    "titleAr": "الْوَحْدَةُ وَالْأُخُوَّةُ",
    "level": "advanced",
    "category": "Daily Life & Society",
    "categoryAr": "الحياة اليومية والمجتمع",
    "text": "حَذَّرَ الْإِسْلَامُ مِنَ الْفُرْقَةِ وَالتَّنَازُعِ. وَاعْتَصِمُوا بِحَبْلِ اللهِ جَمِيعًا وَلَا تَفَرَّقُوا. الْخِلَافَاتُ الْمَذْهَبِيَّةُ وَالْعِرْقِيَّةُ وَالْقَوْمِيَّةُ مَزَّقَتِ الْأُمَّةَ. نَسِينَا أَنَّ الَّذِي يَجْمَعُنَا أَكْثَرُ مِمَّا يُفَرِّقُنَا. كُلُّنَا نَعْبُدُ اللهَ وَنَتَّبِعُ رَسُولَهُ. كُلُّنَا نُصَلِّي إِلَى قِبْلَةٍ وَاحِدَةٍ وَنَصُومُ شَهْرًا وَاحِدًا. الِاخْتِلَافُ فِي الْفُرُوعِ لَا يَنْبَغِي أَنْ يُفْسِدَ وَحْدَتَنَا فِي الْأُصُولِ.",
    "translation": "Islam warned against division and conflict. Hold firmly to the rope of Allah all together and do not become divided. Sectarian, ethnic, and nationalistic differences have torn the Ummah apart. We forgot that what unites us is more than what divides us. We all worship Allah and follow His Messenger. We all pray toward one qiblah and fast one month. Differences in secondary matters should not corrupt our unity in fundamentals.",
    "grammaticalConcepts": [
      "Form II verb (حذّر، فرّق، مزّق)",
      "Imperative (اعتصموا)",
      "Prohibition (لا تفرّقوا)",
      "Anna clause (أن الذي يجمعنا)",
      "Comparative (أكثر مما)",
      "Modal (لا ينبغي أن يفسد)"
    ],
    "vocabularyHighlights": [
      { "word": "الْفُرْقَة", "meaning": "division" },
      { "word": "التَّنَازُع", "meaning": "conflict" },
      { "word": "الْمَذْهَبِيَّة", "meaning": "sectarian" },
      { "word": "الْعِرْقِيَّة", "meaning": "ethnic" },
      { "word": "الْفُرُوع", "meaning": "secondary matters" }
    ],
    "moralLesson": "Muslims share more than they differ. Focusing on common beliefs rather than secondary differences preserves the strength and unity of the Ummah.",
    "moralLessonAr": "المسلمون يشتركون أكثر مما يختلفون. التركيز على المشتركات بدل الخلافات الفرعية يحفظ قوة الأمة ووحدتها.",
    "wordCount": 78
  }
];
