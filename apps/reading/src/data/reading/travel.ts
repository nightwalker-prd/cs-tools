// src/data/reading/travel.ts
// Travel & Geography Texts (السفر والجغرافيا)
// Classical Arabic texts about journeys, cities, lands, and cultures

import { ReadingText } from './types';

export const travelTexts: ReadingText[] = [
  // ============================================
  // BEGINNER TRAVEL TEXTS (b109-b114)
  // Simple texts about places and journeys ~30 words
  // ============================================
  {
    "id": "b109",
    "title": "The Journey",
    "titleAr": "الرِّحْلَةُ",
    "level": "beginner",
    "category": "Travel & Geography",
    "categoryAr": "السفر والجغرافيا",
    "text": "أُحِبُّ السَّفَرَ وَالرِّحْلَاتِ. أَرَى أَمَاكِنَ جَدِيدَةً وَأَتَعَرَّفُ عَلَى نَاسٍ جُدُدٍ. أَتَعَلَّمُ مِنْ كُلِّ مَكَانٍ شَيْئًا. السَّفَرُ يَفْتَحُ الْعَقْلَ وَيُوَسِّعُ الْأُفُقَ. قَالَ الشَّاعِرُ: سَافِرْ تَجِدْ عِوَضًا عَمَّنْ تُفَارِقُهُ.",
    "translation": "I love traveling and trips. I see new places and meet new people. I learn something from every place. Travel opens the mind and broadens horizons. The poet said: Travel, and you will find compensation for those you leave behind.",
    "grammaticalConcepts": [
      "Present tense verbs (أحب، أرى، أتعرف، أتعلم)",
      "Form V verb (أتعرف)",
      "Imperative in poetry (سافر)",
      "Jussive (تجد)",
      "Idafa (عوضًا عمن)"
    ],
    "vocabularyHighlights": [
      { "word": "رِحْلَة", "meaning": "journey, trip" },
      { "word": "أَتَعَرَّفُ", "meaning": "I get to know" },
      { "word": "يُوَسِّعُ", "meaning": "broadens" },
      { "word": "الْأُفُق", "meaning": "horizon" },
      { "word": "عِوَض", "meaning": "compensation" }
    ],
    "moralLesson": "Travel is a form of education. New experiences and encounters expand our understanding of the world and ourselves.",
    "moralLessonAr": "السفر شكل من أشكال التعليم. التجارب واللقاءات الجديدة توسع فهمنا للعالم ولأنفسنا.",
    "wordCount": 32
  },
  {
    "id": "b110",
    "title": "The City",
    "titleAr": "الْمَدِينَةُ",
    "level": "beginner",
    "category": "Travel & Geography",
    "categoryAr": "السفر والجغرافيا",
    "text": "الْمَدِينَةُ كَبِيرَةٌ وَمُزْدَحِمَةٌ. فِيهَا شَوَارِعُ وَاسِعَةٌ وَمَبَانٍ عَالِيَةٌ. النَّاسُ يَذْهَبُونَ إِلَى الْعَمَلِ كُلَّ يَوْمٍ. السَّيَّارَاتُ كَثِيرَةٌ وَالْأَسْوَاقُ مَمْلُوءَةٌ. الْمَدِينَةُ لَا تَنَامُ أَبَدًا.",
    "translation": "The city is big and crowded. In it are wide streets and tall buildings. People go to work every day. Cars are many and markets are full. The city never sleeps.",
    "grammaticalConcepts": [
      "Nominal sentences (المدينة كبيرة)",
      "Fronted predicate (فيها شوارع)",
      "Adjective agreement (شوارع واسعة، مبانٍ عالية)",
      "Defective noun (مبانٍ)",
      "Negation with لا (لا تنام)"
    ],
    "vocabularyHighlights": [
      { "word": "مُزْدَحِمَة", "meaning": "crowded" },
      { "word": "شَوَارِع", "meaning": "streets" },
      { "word": "مَبَانٍ", "meaning": "buildings" },
      { "word": "مَمْلُوءَة", "meaning": "full" },
      { "word": "تَنَامُ", "meaning": "sleeps" }
    ],
    "moralLesson": "Cities are centers of human activity and civilization. They bring people together for work, trade, and community.",
    "moralLessonAr": "المدن مراكز للنشاط البشري والحضارة. تجمع الناس للعمل والتجارة والمجتمع.",
    "wordCount": 28
  },
  {
    "id": "b111",
    "title": "The Desert",
    "titleAr": "الصَّحْرَاءُ",
    "level": "beginner",
    "category": "Travel & Geography",
    "categoryAr": "السفر والجغرافيا",
    "text": "الصَّحْرَاءُ وَاسِعَةٌ وَجَمِيلَةٌ. الرِّمَالُ ذَهَبِيَّةٌ تَحْتَ الشَّمْسِ. اللَّيْلُ فِيهَا بَارِدٌ وَالنُّجُومُ كَثِيرَةٌ. الْجِمَالُ تَمْشِي عَلَى الرِّمَالِ بِهُدُوءٍ. الصَّحْرَاءُ تُعَلِّمُنَا الصَّبْرَ وَالتَّأَمُّلَ.",
    "translation": "The desert is vast and beautiful. The sands are golden under the sun. The night there is cold and the stars are many. Camels walk on the sand quietly. The desert teaches us patience and contemplation.",
    "grammaticalConcepts": [
      "Nominal sentences (الصحراء واسعة)",
      "Fronted predicate (الليل فيها بارد)",
      "Adjectives (ذهبية، بارد، كثيرة)",
      "Present tense (تمشي، تعلّمنا)",
      "Attached pronouns (فيها، تعلمنا)"
    ],
    "vocabularyHighlights": [
      { "word": "صَحْرَاء", "meaning": "desert" },
      { "word": "رِمَال", "meaning": "sands" },
      { "word": "ذَهَبِيَّة", "meaning": "golden" },
      { "word": "جِمَال", "meaning": "camels" },
      { "word": "التَّأَمُّل", "meaning": "contemplation" }
    ],
    "moralLesson": "The desert's vastness and silence invite reflection. Its beauty lies in simplicity and the lessons it teaches about patience.",
    "moralLessonAr": "اتساع الصحراء وصمتها يدعوان للتأمل. جمالها في بساطتها والدروس التي تعلمها عن الصبر.",
    "wordCount": 29
  },
  {
    "id": "b112",
    "title": "The Sea",
    "titleAr": "الْبَحْرُ",
    "level": "beginner",
    "category": "Travel & Geography",
    "categoryAr": "السفر والجغرافيا",
    "text": "الْبَحْرُ أَزْرَقُ وَعَمِيقٌ. الْأَمْوَاجُ تَأْتِي وَتَذْهَبُ. السُّفُنُ تُسَافِرُ عَبْرَ الْبَحْرِ. الصَّيَّادُونَ يَصْطَادُونَ السَّمَكَ. عِنْدَ الْغُرُوبِ يَكُونُ الْبَحْرُ جَمِيلًا جِدًّا. الْبَحْرُ عَالَمٌ كَبِيرٌ مَلِيءٌ بِالْأَسْرَارِ.",
    "translation": "The sea is blue and deep. The waves come and go. Ships travel across the sea. Fishermen catch fish. At sunset the sea is very beautiful. The sea is a big world full of secrets.",
    "grammaticalConcepts": [
      "Nominal sentences (البحر أزرق)",
      "Present tense (تأتي، تذهب، تسافر، يصطادون)",
      "Form VIII verb (يصطادون)",
      "Time phrase (عند الغروب)",
      "Kana as auxiliary (يكون البحر)"
    ],
    "vocabularyHighlights": [
      { "word": "أَمْوَاج", "meaning": "waves" },
      { "word": "سُفُن", "meaning": "ships" },
      { "word": "صَيَّادُون", "meaning": "fishermen" },
      { "word": "الْغُرُوب", "meaning": "sunset" },
      { "word": "أَسْرَار", "meaning": "secrets" }
    ],
    "moralLesson": "The sea reminds us of Allah's vast creation. It provides sustenance and carries people to distant lands.",
    "moralLessonAr": "البحر يذكرنا بخلق الله الواسع. يوفر الرزق ويحمل الناس إلى بلاد بعيدة.",
    "wordCount": 32
  },
  {
    "id": "b113",
    "title": "The Mountain",
    "titleAr": "الْجَبَلُ",
    "level": "beginner",
    "category": "Travel & Geography",
    "categoryAr": "السفر والجغرافيا",
    "text": "الْجَبَلُ عَالٍ وَقَوِيٌّ. قِمَّتُهُ تَلْمَسُ السَّحَابَ. نَتَسَلَّقُهُ بِبُطْءٍ وَحَذَرٍ. مِنْ فَوْقِ الْجَبَلِ نَرَى الْعَالَمَ صَغِيرًا. الْهَوَاءُ هُنَاكَ نَقِيٌّ وَبَارِدٌ. الْجِبَالُ آيَةٌ مِنْ آيَاتِ اللهِ.",
    "translation": "The mountain is high and strong. Its peak touches the clouds. We climb it slowly and carefully. From the top of the mountain we see the world small. The air there is pure and cold. Mountains are a sign of Allah's signs.",
    "grammaticalConcepts": [
      "Defective adjective (عالٍ)",
      "Attached pronouns (قمته)",
      "Form V verb (نتسلّق)",
      "Hal (حال) - صغيرًا",
      "Adverbs (ببطء، بحذر)"
    ],
    "vocabularyHighlights": [
      { "word": "قِمَّة", "meaning": "peak, summit" },
      { "word": "السَّحَاب", "meaning": "clouds" },
      { "word": "نَتَسَلَّقُ", "meaning": "we climb" },
      { "word": "بُطْء", "meaning": "slowness" },
      { "word": "حَذَر", "meaning": "caution" }
    ],
    "moralLesson": "Mountains represent stability and perspective. Climbing them teaches patience, and reaching the top rewards with a wider view.",
    "moralLessonAr": "الجبال ترمز للثبات والمنظور. تسلقها يعلم الصبر، والوصول للقمة يكافئ برؤية أوسع.",
    "wordCount": 33
  },
  {
    "id": "b114",
    "title": "My Country",
    "titleAr": "بِلَادِي",
    "level": "beginner",
    "category": "Travel & Geography",
    "categoryAr": "السفر والجغرافيا",
    "text": "أُحِبُّ بِلَادِي كَثِيرًا. فِيهَا وُلِدْتُ وَتَعَلَّمْتُ. فِيهَا أَهْلِي وَأَصْدِقَائِي. أَعْرِفُ شَوَارِعَهَا وَأَسْوَاقَهَا. لُغَتُهَا لُغَتِي وَثَقَافَتُهَا ثَقَافَتِي. حُبُّ الْوَطَنِ مِنَ الْإِيمَانِ.",
    "translation": "I love my country very much. In it I was born and learned. In it are my family and friends. I know its streets and markets. Its language is my language and its culture is my culture. Love of homeland is from faith.",
    "grammaticalConcepts": [
      "Attached pronouns (بلادي، أهلي، شوارعها)",
      "Passive (وُلدت)",
      "Fronted predicate (فيها أهلي)",
      "Nominal equations (لغتها لغتي)",
      "Idafa (حب الوطن)"
    ],
    "vocabularyHighlights": [
      { "word": "بِلَاد", "meaning": "country, homeland" },
      { "word": "وُلِدْتُ", "meaning": "I was born" },
      { "word": "ثَقَافَة", "meaning": "culture" },
      { "word": "الْوَطَن", "meaning": "homeland" },
      { "word": "الْإِيمَان", "meaning": "faith" }
    ],
    "moralLesson": "Love of one's homeland is natural and virtuous. It includes appreciating its people, language, and culture.",
    "moralLessonAr": "حب الوطن أمر طبيعي وفاضل. يشمل تقدير أهله ولغته وثقافته.",
    "wordCount": 30
  },

  // ============================================
  // INTERMEDIATE TRAVEL TEXTS (i136-i141)
  // More detailed texts about places and journeys ~55 words
  // ============================================
  {
    "id": "i136",
    "title": "Travel Etiquette",
    "titleAr": "آدَابُ السَّفَرِ",
    "level": "intermediate",
    "category": "Travel & Geography",
    "categoryAr": "السفر والجغرافيا",
    "text": "لِلسَّفَرِ فِي الْإِسْلَامِ آدَابٌ كَثِيرَةٌ. نُوَدِّعُ الْأَهْلَ وَنَطْلُبُ مِنْهُمُ الدُّعَاءَ. نَقْرَأُ دُعَاءَ السَّفَرِ عِنْدَ الرُّكُوبِ. نُصَلِّي قَصْرًا فِي السَّفَرِ الطَّوِيلِ. نَحْتَرِمُ أَهْلَ الْبِلَادِ الَّتِي نَزُورُهَا. إِذَا رَجَعْنَا أَخْبَرْنَا النَّاسَ بِمَا رَأَيْنَا. وَفِي السَّفَرِ سَبْعُ فَوَائِدَ كَمَا قَالَ الشَّافِعِيُّ.",
    "translation": "Travel in Islam has many etiquettes. We bid farewell to family and ask them for prayers. We recite the travel supplication when riding. We pray shortened in long journeys. We respect the people of the lands we visit. When we return, we tell people what we saw. And in travel there are seven benefits, as Al-Shafi'i said.",
    "grammaticalConcepts": [
      "Fronted predicate (للسفر آداب)",
      "Form II verb (نودّع)",
      "Hal accusative (قصرًا)",
      "Conditional with إذا (إذا رجعنا)",
      "Relative clause (التي نزورها)"
    ],
    "vocabularyHighlights": [
      { "word": "آدَاب", "meaning": "etiquettes, manners" },
      { "word": "نُوَدِّعُ", "meaning": "we bid farewell" },
      { "word": "الرُّكُوب", "meaning": "riding, boarding" },
      { "word": "قَصْرًا", "meaning": "shortened (prayer)" },
      { "word": "فَوَائِد", "meaning": "benefits" }
    ],
    "moralLesson": "Islam provides guidance for every aspect of life, including travel. Following these etiquettes makes journeys blessed and beneficial.",
    "moralLessonAr": "الإسلام يقدم إرشادات لكل جانب من جوانب الحياة، بما فيها السفر. اتباع هذه الآداب يجعل الرحلات مباركة ومفيدة.",
    "wordCount": 52
  },
  {
    "id": "i137",
    "title": "The Caravan",
    "titleAr": "الْقَافِلَةُ",
    "level": "intermediate",
    "category": "Travel & Geography",
    "categoryAr": "السفر والجغرافيا",
    "text": "كَانَتِ الْقَوَافِلُ تَعْبُرُ الصَّحْرَاءَ قَدِيمًا. تَحْمِلُ التُّجَّارَ وَالْبَضَائِعَ مِنْ بَلَدٍ إِلَى بَلَدٍ. الْجِمَالُ سُفُنُ الصَّحْرَاءِ. كَانَ التُّجَّارُ يَتَبَادَلُونَ السِّلَعَ وَالْأَفْكَارَ وَالثَّقَافَاتِ. طَرِيقُ الْحَرِيرِ رَبَطَ الشَّرْقَ بِالْغَرْبِ. هَكَذَا انْتَشَرَ الْإِسْلَامُ إِلَى آسْيَا وَأَفْرِيقْيَا سِلْمِيًّا.",
    "translation": "Caravans used to cross the desert in ancient times. They carried merchants and goods from country to country. Camels are the ships of the desert. Merchants used to exchange goods, ideas, and cultures. The Silk Road connected the East to the West. Thus Islam spread to Asia and Africa peacefully.",
    "grammaticalConcepts": [
      "Kanat + present (كانت تعبر، كان يتبادلون)",
      "Metaphor (سفن الصحراء)",
      "Form VI verb (يتبادلون)",
      "Form VIII verb (انتشر)",
      "Hal (سلميًّا)"
    ],
    "vocabularyHighlights": [
      { "word": "قَوَافِل", "meaning": "caravans" },
      { "word": "تُجَّار", "meaning": "merchants" },
      { "word": "بَضَائِع", "meaning": "goods" },
      { "word": "سِلَع", "meaning": "commodities" },
      { "word": "طَرِيق الْحَرِير", "meaning": "Silk Road" }
    ],
    "moralLesson": "Trade routes were highways of civilization, spreading not just goods but ideas and faiths. Islam spread through honest merchants.",
    "moralLessonAr": "طرق التجارة كانت طرقًا سريعة للحضارة، تنشر ليس البضائع فقط بل الأفكار والأديان. الإسلام انتشر عبر التجار الصادقين.",
    "wordCount": 48
  },
  {
    "id": "i138",
    "title": "Mecca and Medina",
    "titleAr": "مَكَّةُ وَالْمَدِينَةُ",
    "level": "intermediate",
    "category": "Travel & Geography",
    "categoryAr": "السفر والجغرافيا",
    "text": "مَكَّةُ أُمُّ الْقُرَى وَأَقْدَسُ مَكَانٍ عَلَى الْأَرْضِ. فِيهَا الْكَعْبَةُ الْمُشَرَّفَةُ. يَحُجُّ إِلَيْهَا الْمُسْلِمُونَ مِنْ كُلِّ مَكَانٍ. الْمَدِينَةُ الْمُنَوَّرَةُ دَارُ الْهِجْرَةِ. فِيهَا مَسْجِدُ النَّبِيِّ وَقَبْرُهُ الشَّرِيفُ. الْمَدِينَتَانِ قَلْبُ الْعَالَمِ الْإِسْلَامِيِّ. زِيَارَتُهُمَا حُلْمٌ لِكُلِّ مُسْلِمٍ.",
    "translation": "Mecca is the Mother of Cities and the holiest place on Earth. In it is the Noble Kaaba. Muslims make pilgrimage to it from everywhere. Medina the Radiant is the land of migration. In it is the Prophet's mosque and his noble grave. The two cities are the heart of the Islamic world. Visiting them is a dream for every Muslim.",
    "grammaticalConcepts": [
      "Superlative (أقدس)",
      "Title/epithet (أم القرى، المنورة)",
      "Fronted predicate (فيها الكعبة)",
      "Dual noun (المدينتان)",
      "Idafa chains (مسجد النبي، قبره الشريف)"
    ],
    "vocabularyHighlights": [
      { "word": "أُمّ الْقُرَى", "meaning": "Mother of Cities" },
      { "word": "الْكَعْبَة", "meaning": "Kaaba" },
      { "word": "يَحُجُّ", "meaning": "makes pilgrimage" },
      { "word": "دَار الْهِجْرَة", "meaning": "land of migration" },
      { "word": "الْمُنَوَّرَة", "meaning": "the Radiant" }
    ],
    "moralLesson": "Mecca and Medina hold special significance for Muslims. They are destinations of the heart as much as of physical travel.",
    "moralLessonAr": "مكة والمدينة لهما أهمية خاصة عند المسلمين. هما وجهتان للقلب بقدر ما هما للسفر المادي.",
    "wordCount": 50
  },
  {
    "id": "i139",
    "title": "Al-Andalus",
    "titleAr": "الْأَنْدَلُسُ",
    "level": "intermediate",
    "category": "Travel & Geography",
    "categoryAr": "السفر والجغرافيا",
    "text": "الْأَنْدَلُسُ كَانَتْ جَنَّةَ الْمُسْلِمِينَ فِي أُورُوبَّا. حَكَمَهَا الْمُسْلِمُونَ ثَمَانِيَةَ قُرُونٍ. بَنَوْا فِيهَا قُصُورًا وَمَسَاجِدَ رَائِعَةً. قُرْطُبَةُ كَانَتْ عَاصِمَةَ الْعِلْمِ وَالثَّقَافَةِ. مِنْهَا خَرَجَ عُلَمَاءُ كَابْنِ رُشْدٍ وَالزَّهْرَاوِيِّ. بَقِيَتْ آثَارُهُمُ الْعَظِيمَةُ شَاهِدَةً عَلَى حَضَارَتِهِمْ.",
    "translation": "Al-Andalus was the Muslims' paradise in Europe. Muslims ruled it for eight centuries. They built magnificent palaces and mosques in it. Cordoba was the capital of knowledge and culture. From it came scholars like Ibn Rushd and Al-Zahrawi. Their great monuments remain as witnesses to their civilization.",
    "grammaticalConcepts": [
      "Kanat + noun (كانت جنة، كانت عاصمة)",
      "Numbers with tamyiz (ثمانية قرون)",
      "Plural patterns (قصور، مساجد، علماء، آثار)",
      "Form VIII verb (خرج)",
      "Active participle (شاهدة)"
    ],
    "vocabularyHighlights": [
      { "word": "الْأَنْدَلُس", "meaning": "Al-Andalus (Islamic Spain)" },
      { "word": "قُرُون", "meaning": "centuries" },
      { "word": "قُصُور", "meaning": "palaces" },
      { "word": "عَاصِمَة", "meaning": "capital" },
      { "word": "آثَار", "meaning": "monuments, traces" }
    ],
    "moralLesson": "Al-Andalus represents Islamic civilization at its height. Its achievements in science, art, and architecture continue to inspire.",
    "moralLessonAr": "الأندلس تمثل الحضارة الإسلامية في أوجها. إنجازاتها في العلم والفن والعمارة لا تزال ملهمة.",
    "wordCount": 47
  },
  {
    "id": "i140",
    "title": "Damascus",
    "titleAr": "دِمَشْقُ",
    "level": "intermediate",
    "category": "Travel & Geography",
    "categoryAr": "السفر والجغرافيا",
    "text": "دِمَشْقُ مِنْ أَقْدَمِ الْمُدُنِ فِي الْعَالَمِ. سَكَنَهَا النَّاسُ مُنْذُ آلَافِ السِّنِينَ. كَانَتْ عَاصِمَةَ الْخِلَافَةِ الْأُمَوِيَّةِ. الْجَامِعُ الْأُمَوِيُّ مِنْ أَجْمَلِ الْمَسَاجِدِ. أَسْوَاقُهَا الْقَدِيمَةُ مَازَالَتْ حَيَّةً. قِيلَ إِنَّ الْجَنَّةَ لَوْ كَانَتْ عَلَى الْأَرْضِ لَكَانَتْ دِمَشْقَ.",
    "translation": "Damascus is one of the oldest cities in the world. People have inhabited it for thousands of years. It was the capital of the Umayyad Caliphate. The Umayyad Mosque is one of the most beautiful mosques. Its old markets are still alive. It is said that if paradise were on earth, it would be Damascus.",
    "grammaticalConcepts": [
      "Superlative (من أقدم، من أجمل)",
      "Kanat + predicate (كانت عاصمة)",
      "Conditional with لو (لو كانت... لكانت)",
      "Passive (قيل)",
      "Ma zala + adjective (مازالت حية)"
    ],
    "vocabularyHighlights": [
      { "word": "الْخِلَافَة", "meaning": "caliphate" },
      { "word": "الْأُمَوِيَّة", "meaning": "Umayyad" },
      { "word": "جَامِع", "meaning": "grand mosque" },
      { "word": "أَسْوَاق", "meaning": "markets" },
      { "word": "حَيَّة", "meaning": "alive" }
    ],
    "moralLesson": "Damascus has witnessed millennia of human history. Its endurance through time teaches us about resilience and cultural continuity.",
    "moralLessonAr": "دمشق شهدت آلاف السنين من التاريخ البشري. صمودها عبر الزمن يعلمنا عن المرونة والاستمرارية الثقافية.",
    "wordCount": 50
  },
  {
    "id": "i141",
    "title": "Baghdad",
    "titleAr": "بَغْدَادُ",
    "level": "intermediate",
    "category": "Travel & Geography",
    "categoryAr": "السفر والجغرافيا",
    "text": "بَغْدَادُ مَدِينَةُ السَّلَامِ. بَنَاهَا الْخَلِيفَةُ الْمَنْصُورُ عَلَى نَهْرِ دِجْلَةَ. كَانَتْ أَكْبَرَ مَدِينَةٍ فِي الْعَالَمِ. بَيْتُ الْحِكْمَةِ فِيهَا جَمَعَ عُلُومَ الدُّنْيَا. تُرْجِمَتْ فِيهَا كُتُبُ الْيُونَانِ وَالْهِنْدِ وَفَارِسَ. مِنْهَا خَرَجَ الْخَوَارِزْمِيُّ وَالرَّازِيُّ وَغَيْرُهُمْ. كَانَتْ مَنَارَةَ الْعِلْمِ لِلْعَالَمِ كُلِّهِ.",
    "translation": "Baghdad is the City of Peace. Caliph Al-Mansur built it on the Tigris River. It was the largest city in the world. The House of Wisdom in it gathered the sciences of the world. In it the books of Greece, India, and Persia were translated. From it came Al-Khwarizmi, Al-Razi, and others. It was the lighthouse of knowledge for the entire world.",
    "grammaticalConcepts": [
      "Title/epithet (مدينة السلام)",
      "Passive (تُرجمت، بناها)",
      "Superlative (أكبر مدينة)",
      "Idafa chains (بيت الحكمة، منارة العلم)",
      "Kanat + predicate (كانت أكبر، كانت منارة)"
    ],
    "vocabularyHighlights": [
      { "word": "الْخَلِيفَة", "meaning": "caliph" },
      { "word": "دِجْلَة", "meaning": "Tigris" },
      { "word": "بَيْت الْحِكْمَة", "meaning": "House of Wisdom" },
      { "word": "تُرْجِمَتْ", "meaning": "were translated" },
      { "word": "مَنَارَة", "meaning": "lighthouse, minaret" }
    ],
    "moralLesson": "Baghdad's golden age shows how Islamic civilization preserved and advanced human knowledge. It was a center of translation and innovation.",
    "moralLessonAr": "العصر الذهبي لبغداد يُظهر كيف حفظت الحضارة الإسلامية المعرفة البشرية وطورتها. كانت مركزًا للترجمة والابتكار.",
    "wordCount": 55
  },

  // ============================================
  // ADVANCED TRAVEL TEXTS (a95-a100)
  // Deep geographical and cultural reflections ~100+ words
  // ============================================
  {
    "id": "a95",
    "title": "The Hajj Journey",
    "titleAr": "رِحْلَةُ الْحَجِّ",
    "level": "advanced",
    "category": "Travel & Geography",
    "categoryAr": "السفر والجغرافيا",
    "text": "الْحَجُّ رِحْلَةٌ لَيْسَتْ كَأَيِّ رِحْلَةٍ. فِيهَا يَتْرُكُ الْإِنْسَانُ كُلَّ مَا يُحِبُّ وَيَتَوَجَّهُ إِلَى بَيْتِ اللهِ. يَلْبَسُ الْإِحْرَامَ فَيَتَسَاوَى الْغَنِيُّ وَالْفَقِيرُ. يَقِفُ عَلَى عَرَفَةَ مَعَ مَلَايِينِ الْمُسْلِمِينَ مِنْ كُلِّ بَلَدٍ وَلَوْنٍ وَلُغَةٍ. يَطُوفُ حَوْلَ الْكَعْبَةِ وَيَشْعُرُ بِصِغَرِهِ أَمَامَ عَظَمَةِ الْخَالِقِ. يَرْجِعُ مِنَ الْحَجِّ كَيَوْمِ وَلَدَتْهُ أُمُّهُ. هَذِهِ الرِّحْلَةُ تَجْدِيدٌ لِلرُّوحِ وَتَذْكِيرٌ بِالْمَصِيرِ.",
    "translation": "Hajj is a journey unlike any journey. In it, a person leaves everything they love and heads to the House of Allah. They wear ihram, so the rich and poor become equal. They stand at Arafat with millions of Muslims from every country, color, and language. They circumambulate the Kaaba and feel their smallness before the Creator's greatness. They return from Hajj like the day their mother gave birth to them. This journey is a renewal of the soul and a reminder of destiny.",
    "grammaticalConcepts": [
      "Leysat + ka (ليست كأي رحلة)",
      "Form V verb (يتوجه، يتساوى)",
      "Fa of consequence (فيتساوى)",
      "Simile (كيوم ولدته أمه)",
      "Masdar as predicate (تجديد، تذكير)"
    ],
    "vocabularyHighlights": [
      { "word": "الْإِحْرَام", "meaning": "ihram (pilgrimage garment)" },
      { "word": "عَرَفَة", "meaning": "Arafat" },
      { "word": "يَطُوفُ", "meaning": "circumambulates" },
      { "word": "تَجْدِيد", "meaning": "renewal" },
      { "word": "الْمَصِير", "meaning": "destiny" }
    ],
    "moralLesson": "Hajj is a transformative journey that strips away worldly distinctions and renews the soul. It is a rehearsal for the Day of Judgment.",
    "moralLessonAr": "الحج رحلة تحويلية تزيل الفوارق الدنيوية وتجدد الروح. إنه تدريب ليوم الحساب.",
    "wordCount": 82
  },
  {
    "id": "a96",
    "title": "Travel as Education",
    "titleAr": "السَّفَرُ مَدْرَسَةٌ",
    "level": "advanced",
    "category": "Travel & Geography",
    "categoryAr": "السفر والجغرافيا",
    "text": "كَانَ الْعُلَمَاءُ قَدِيمًا يُسَافِرُونَ طَلَبًا لِلْعِلْمِ. الْإِمَامُ الْبُخَارِيُّ زَارَ عَشَرَاتِ الْمُدُنِ لِجَمْعِ الْأَحَادِيثِ. ابْنُ بَطُّوطَةَ طَافَ الْعَالَمَ الْإِسْلَامِيَّ كُلَّهُ. كَتَبُوا مَا رَأَوْهُ وَوَثَّقُوا ثَقَافَاتِ الشُّعُوبِ. السَّفَرُ يُعَلِّمُ مَا لَا تُعَلِّمُهُ الْكُتُبُ. يُعَلِّمُكَ فَهْمَ الْآخَرِ وَتَقَبُّلَ الِاخْتِلَافِ. يُعَلِّمُكَ الصَّبْرَ وَالتَّكَيُّفَ وَالِاعْتِمَادَ عَلَى النَّفْسِ. مَنْ لَمْ يُسَافِرْ لَمْ يَعْرِفِ الدُّنْيَا حَقًّا.",
    "translation": "Scholars of old used to travel seeking knowledge. Imam Al-Bukhari visited dozens of cities to collect hadith. Ibn Battuta traveled the entire Islamic world. They wrote what they saw and documented the cultures of peoples. Travel teaches what books cannot teach. It teaches you to understand others and accept differences. It teaches you patience, adaptation, and self-reliance. Whoever has not traveled has not truly known the world.",
    "grammaticalConcepts": [
      "Kanat + present (كان يسافرون)",
      "Maf'ul li-ajlih (طلبًا للعلم)",
      "Relative clause (ما لا تعلمه الكتب)",
      "Form V verbs (تقبّل، التكيّف)",
      "Conditional with من لم (من لم يسافر)"
    ],
    "vocabularyHighlights": [
      { "word": "طَلَبًا", "meaning": "seeking" },
      { "word": "وَثَّقُوا", "meaning": "documented" },
      { "word": "تَقَبُّل", "meaning": "acceptance" },
      { "word": "التَّكَيُّف", "meaning": "adaptation" },
      { "word": "الِاعْتِمَاد عَلَى النَّفْس", "meaning": "self-reliance" }
    ],
    "moralLesson": "Travel was the methodology of great scholars. It provides experiential education that cannot be gained from books alone.",
    "moralLessonAr": "السفر كان منهج العلماء العظماء. يوفر تعليمًا تجريبيًا لا يمكن اكتسابه من الكتب وحدها.",
    "wordCount": 77
  },
  {
    "id": "a97",
    "title": "East and West",
    "titleAr": "الشَّرْقُ وَالْغَرْبُ",
    "level": "advanced",
    "category": "Travel & Geography",
    "categoryAr": "السفر والجغرافيا",
    "text": "اخْتَلَفَ الشَّرْقُ وَالْغَرْبُ فِي كَثِيرٍ مِنَ الْعَادَاتِ وَالتَّقَالِيدِ. لَكِنَّهُمَا يَشْتَرِكَانِ فِي الْإِنْسَانِيَّةِ. كِلَاهُمَا يُحِبُّ أَطْفَالَهُ وَيَحْلُمُ بِالسَّلَامِ. أَخَذَ كُلٌّ مِنْهُمَا مِنَ الْآخَرِ عَبْرَ التَّارِيخِ. الْغَرْبُ تَعَلَّمَ مِنْ عُلُومِ الْمُسْلِمِينَ فِي الْقُرُونِ الْوُسْطَى. الْمُسْلِمُونَ الْيَوْمَ يَأْخُذُونَ مِنْ تِقْنِيَاتِ الْغَرْبِ. التَّبَادُلُ الثَّقَافِيُّ يُغْنِي الْجَمِيعَ. وَجَعَلْنَاكُمْ شُعُوبًا وَقَبَائِلَ لِتَعَارَفُوا.",
    "translation": "East and West differ in many customs and traditions. But they share humanity. Both love their children and dream of peace. Each has taken from the other throughout history. The West learned from Muslim sciences in the Middle Ages. Muslims today take from Western technologies. Cultural exchange enriches everyone. And We made you peoples and tribes so that you may know one another.",
    "grammaticalConcepts": [
      "Form VIII verb (اختلف، يشتركان)",
      "Dual verbs (يشتركان)",
      "Kilahuma (كلاهما)",
      "Form V verb (تعلّم)",
      "Quranic quotation (لتعارفوا)"
    ],
    "vocabularyHighlights": [
      { "word": "عَادَات", "meaning": "customs" },
      { "word": "تَقَالِيد", "meaning": "traditions" },
      { "word": "الْقُرُون الْوُسْطَى", "meaning": "Middle Ages" },
      { "word": "تِقْنِيَات", "meaning": "technologies" },
      { "word": "التَّبَادُل", "meaning": "exchange" }
    ],
    "moralLesson": "Cultural exchange is divinely ordained. The Quran teaches that human diversity is meant for mutual understanding, not conflict.",
    "moralLessonAr": "التبادل الثقافي مقرر إلهيًا. القرآن يعلمنا أن التنوع البشري للتعارف لا للصراع.",
    "wordCount": 76
  },
  {
    "id": "a98",
    "title": "The Silk Road",
    "titleAr": "طَرِيقُ الْحَرِيرِ",
    "level": "advanced",
    "category": "Travel & Geography",
    "categoryAr": "السفر والجغرافيا",
    "text": "طَرِيقُ الْحَرِيرِ شَبَكَةٌ مِنَ الطُّرُقِ رَبَطَتِ الصِّينَ بِالْبَحْرِ الْمُتَوَسِّطِ. عَبْرَهَا انْتَقَلَتِ الْبَضَائِعُ الثَّمِينَةُ: الْحَرِيرُ وَالتَّوَابِلُ وَالذَّهَبُ. لَكِنَّ الْأَفْكَارَ وَالْأَدْيَانَ سَافَرَتْ أَيْضًا. وَصَلَ الْإِسْلَامُ إِلَى الصِّينِ وَإِنْدُونِيسْيَا عَبْرَ التُّجَّارِ. تَبَادَلَتِ الْحَضَارَاتُ عُلُومَهَا وَفُنُونَهَا. الصِّينُ أَعْطَتِ الْوَرَقَ وَالْبَارُودَ. الْعَرَبُ أَعْطَوُا الْأَرْقَامَ وَالْجَبْرَ. هَكَذَا تَقَدَّمَتِ الْبَشَرِيَّةُ بِالتَّعَاوُنِ لَا بِالصِّرَاعِ.",
    "translation": "The Silk Road is a network of routes that connected China to the Mediterranean. Through it traveled precious goods: silk, spices, and gold. But ideas and religions also traveled. Islam reached China and Indonesia through merchants. Civilizations exchanged their sciences and arts. China gave paper and gunpowder. Arabs gave numerals and algebra. Thus humanity advanced through cooperation, not conflict.",
    "grammaticalConcepts": [
      "Relative clause (شبكة من الطرق ربطت)",
      "Form VIII verb (انتقلت)",
      "Form VI verb (تبادلت)",
      "Lakinna for contrast (لكن الأفكار)",
      "Parallel structure (أعطت... أعطوا)"
    ],
    "vocabularyHighlights": [
      { "word": "شَبَكَة", "meaning": "network" },
      { "word": "تَوَابِل", "meaning": "spices" },
      { "word": "الْبَارُود", "meaning": "gunpowder" },
      { "word": "الْجَبْر", "meaning": "algebra" },
      { "word": "الصِّرَاع", "meaning": "conflict" }
    ],
    "moralLesson": "The Silk Road demonstrates that human progress comes from exchange and cooperation. Ideas traveled further than goods.",
    "moralLessonAr": "طريق الحرير يُظهر أن التقدم البشري يأتي من التبادل والتعاون. الأفكار سافرت أبعد من البضائع.",
    "wordCount": 74
  },
  {
    "id": "a99",
    "title": "Jerusalem",
    "titleAr": "الْقُدْسُ",
    "level": "advanced",
    "category": "Travel & Geography",
    "categoryAr": "السفر والجغرافيا",
    "text": "الْقُدْسُ مَدِينَةٌ مُقَدَّسَةٌ عِنْدَ الْأَدْيَانِ الثَّلَاثَةِ. فِيهَا الْمَسْجِدُ الْأَقْصَى أَوَّلُ قِبْلَةٍ لِلْمُسْلِمِينَ. مِنْهَا عُرِجَ بِالنَّبِيِّ إِلَى السَّمَاءِ. فَتَحَهَا عُمَرُ بْنُ الْخَطَّابِ وَأَعْطَى أَهْلَهَا الْأَمَانَ. عَاشَ فِيهَا الْمُسْلِمُونَ وَالْمَسِيحِيُّونَ وَالْيَهُودُ قُرُونًا طَوِيلَةً. حَرَّرَهَا صَلَاحُ الدِّينِ بِلَا إِرَاقَةِ دِمَاءِ الْأَبْرِيَاءِ. الْقُدْسُ رَمْزٌ لِلتَّعَايُشِ الْمُمْكِنِ إِذَا سَادَ الْعَدْلُ.",
    "translation": "Jerusalem is a sacred city for the three religions. In it is Al-Aqsa Mosque, the first qiblah for Muslims. From it the Prophet was taken up to heaven. Umar ibn Al-Khattab conquered it and gave its people safety. Muslims, Christians, and Jews lived in it for long centuries. Saladin liberated it without spilling innocent blood. Jerusalem is a symbol of possible coexistence when justice prevails.",
    "grammaticalConcepts": [
      "Passive (عُرج بالنبي)",
      "Ordinal (أول قبلة)",
      "Idafa chains (المسجد الأقصى، عمر بن الخطاب)",
      "Conditional with إذا (إذا ساد العدل)",
      "Negation with بلا (بلا إراقة)"
    ],
    "vocabularyHighlights": [
      { "word": "مُقَدَّسَة", "meaning": "sacred" },
      { "word": "قِبْلَة", "meaning": "direction of prayer" },
      { "word": "عُرِجَ", "meaning": "was taken up" },
      { "word": "الْأَمَان", "meaning": "safety, security" },
      { "word": "التَّعَايُش", "meaning": "coexistence" }
    ],
    "moralLesson": "Jerusalem's history shows that different faiths can coexist under just rule. The city belongs to those who treat all its people with dignity.",
    "moralLessonAr": "تاريخ القدس يُظهر أن الأديان المختلفة يمكنها التعايش تحت حكم عادل. المدينة لمن يعامل كل أهلها بكرامة.",
    "wordCount": 78
  },
  {
    "id": "a100",
    "title": "Lost Civilizations",
    "titleAr": "حَضَارَاتٌ ضَائِعَةٌ",
    "level": "advanced",
    "category": "Travel & Geography",
    "categoryAr": "السفر والجغرافيا",
    "text": "كَثِيرٌ مِنَ الْحَضَارَاتِ الْعَظِيمَةِ اخْتَفَتْ مِنَ الْأَرْضِ. الْفَرَاعِنَةُ بَنَوْا الْأَهْرَامَاتِ ثُمَّ ذَهَبُوا. تَدْمُرُ كَانَتْ جَنَّةً فِي الصَّحْرَاءِ. بَابِلُ بِحَدَائِقِهَا الْمُعَلَّقَةِ لَمْ تَبْقَ إِلَّا ذِكْرَى. الْقُرْآنُ يُذَكِّرُنَا بِعَادٍ وَثَمُودَ وَقَوْمِ لُوطٍ. كُلُّ حَضَارَةٍ ظَنَّتْ أَنَّهَا خَالِدَةٌ. لَكِنَّ اللهَ يَرِثُ الْأَرْضَ وَمَنْ عَلَيْهَا. الْعِبْرَةُ لِمَنْ يَعْتَبِرُ: الْبَقَاءُ لِلْقِيَمِ لَا لِلْحِجَارَةِ.",
    "translation": "Many great civilizations have disappeared from the Earth. The Pharaohs built the pyramids then departed. Palmyra was a paradise in the desert. Babylon with its hanging gardens remained only a memory. The Quran reminds us of 'Ad, Thamud, and the people of Lot. Every civilization thought it was eternal. But Allah inherits the Earth and those upon it. The lesson is for those who reflect: permanence is for values, not stones.",
    "grammaticalConcepts": [
      "Form VIII verb (اختفت)",
      "Exception (لم تبق إلا ذكرى)",
      "Anna clause (ظنت أنها خالدة)",
      "Lakinna contrast (لكن الله يرث)",
      "Fronted predicate (البقاء للقيم)"
    ],
    "vocabularyHighlights": [
      { "word": "اخْتَفَتْ", "meaning": "disappeared" },
      { "word": "الْحَدَائِق الْمُعَلَّقَة", "meaning": "hanging gardens" },
      { "word": "خَالِدَة", "meaning": "eternal" },
      { "word": "يَرِثُ", "meaning": "inherits" },
      { "word": "الْعِبْرَة", "meaning": "lesson, moral" }
    ],
    "moralLesson": "Civilizations rise and fall, but moral values endure. The Quran uses these examples to remind us that no worldly power is permanent.",
    "moralLessonAr": "الحضارات تنهض وتسقط، لكن القيم الأخلاقية تدوم. القرآن يستخدم هذه الأمثلة ليذكرنا أنه لا قوة دنيوية دائمة.",
    "wordCount": 80
  }
];
