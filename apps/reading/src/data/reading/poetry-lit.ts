// src/data/reading/poetry-lit.ts
// Poetry & Literature Texts (الشعر والأدب)
// Classical Arabic texts about poetic forms, literary concepts, and Arab literary heritage

import { ReadingText } from './types';

export const poetryLitTexts: ReadingText[] = [
  // ============================================
  // BEGINNER POETRY & LITERATURE TEXTS (b121-b126)
  // Simple introductions to poetry ~30 words
  // ============================================
  {
    "id": "b121",
    "title": "What is Poetry?",
    "titleAr": "مَا هُوَ الشِّعْرُ؟",
    "level": "beginner",
    "category": "Poetry & Literature",
    "categoryAr": "الشعر والأدب",
    "text": "الشِّعْرُ كَلَامٌ مَوْزُونٌ وَمُقَفًّى. يُعَبِّرُ عَنِ الْمَشَاعِرِ وَالْأَفْكَارِ. الْعَرَبُ يُحِبُّونَ الشِّعْرَ كَثِيرًا. قَالُوا: الشِّعْرُ دِيوَانُ الْعَرَبِ. فِيهِ تَارِيخُهُمْ وَحِكْمَتُهُمْ وَأَخْبَارُهُمْ.",
    "translation": "Poetry is metered and rhymed speech. It expresses feelings and ideas. Arabs love poetry very much. They said: Poetry is the register of the Arabs. In it is their history, wisdom, and news.",
    "grammaticalConcepts": [
      "Nominal sentences (الشعر كلام)",
      "Passive participles (موزون، مقفّى)",
      "Present tense (يعبّر، يحبون)",
      "Idafa chains (ديوان العرب، تاريخهم)",
      "Attached pronouns (تاريخهم، حكمتهم)"
    ],
    "vocabularyHighlights": [
      { "word": "مَوْزُون", "meaning": "metered" },
      { "word": "مُقَفًّى", "meaning": "rhymed" },
      { "word": "الْمَشَاعِر", "meaning": "feelings" },
      { "word": "دِيوَان", "meaning": "register, anthology" },
      { "word": "حِكْمَة", "meaning": "wisdom" }
    ],
    "moralLesson": "Poetry preserves culture and expresses the human soul. For Arabs, it was their primary means of recording history and wisdom.",
    "moralLessonAr": "الشعر يحفظ الثقافة ويعبر عن الروح الإنسانية. للعرب كان وسيلتهم الأساسية لتسجيل التاريخ والحكمة.",
    "wordCount": 28
  },
  {
    "id": "b122",
    "title": "The Poet",
    "titleAr": "الشَّاعِرُ",
    "level": "beginner",
    "category": "Poetry & Literature",
    "categoryAr": "الشعر والأدب",
    "text": "الشَّاعِرُ يَرَى مَا لَا يَرَاهُ غَيْرُهُ. يَشْعُرُ بِالْجَمَالِ فِي كُلِّ مَكَانٍ. يُحَوِّلُ الْكَلِمَاتِ إِلَى مُوسِيقَى. الشَّاعِرُ الْجَيِّدُ يُحَرِّكُ الْقُلُوبَ. كَانَ لِكُلِّ قَبِيلَةٍ شَاعِرٌ يَفْخَرُ بِهَا.",
    "translation": "The poet sees what others do not see. He feels beauty everywhere. He transforms words into music. A good poet moves hearts. Every tribe had a poet who boasted of it.",
    "grammaticalConcepts": [
      "Relative clause (ما لا يراه غيره)",
      "Form II verbs (يحوّل، يحرّك)",
      "Kanat + li (كان لكل قبيلة)",
      "Active participle (الشاعر)",
      "Negation with لا (لا يراه)"
    ],
    "vocabularyHighlights": [
      { "word": "شَاعِر", "meaning": "poet" },
      { "word": "يَشْعُرُ", "meaning": "feels, senses" },
      { "word": "يُحَوِّلُ", "meaning": "transforms" },
      { "word": "يُحَرِّكُ", "meaning": "moves" },
      { "word": "يَفْخَرُ", "meaning": "boasts, prides" }
    ],
    "moralLesson": "Poets have a special gift of perception. In Arab culture, they were honored as the voices of their communities.",
    "moralLessonAr": "الشعراء لديهم موهبة خاصة في الإدراك. في الثقافة العربية كانوا مكرمين كأصوات لمجتمعاتهم.",
    "wordCount": 30
  },
  {
    "id": "b123",
    "title": "Arabic Rhyme",
    "titleAr": "الْقَافِيَةُ الْعَرَبِيَّةُ",
    "level": "beginner",
    "category": "Poetry & Literature",
    "categoryAr": "الشعر والأدب",
    "text": "الْقَافِيَةُ هِيَ نِهَايَةُ الْبَيْتِ. تَتَكَرَّرُ فِي كُلِّ الْأَبْيَاتِ. تُعْطِي الشِّعْرَ إِيقَاعًا جَمِيلًا. الْعَرَبُ أَتْقَنُوا فَنَّ الْقَافِيَةِ. لِكُلِّ حَرْفٍ قَافِيَةٌ سُمِّيَتْ بِاسْمِهِ.",
    "translation": "The rhyme is the end of the verse. It repeats in all verses. It gives poetry a beautiful rhythm. Arabs mastered the art of rhyme. Every letter has a rhyme named after it.",
    "grammaticalConcepts": [
      "Nominal sentence (القافية هي نهاية)",
      "Form V verb (تتكرر)",
      "Form IV verb (أتقنوا)",
      "Passive (سُمّيت)",
      "Fronted predicate (لكل حرف قافية)"
    ],
    "vocabularyHighlights": [
      { "word": "قَافِيَة", "meaning": "rhyme" },
      { "word": "بَيْت", "meaning": "verse (of poetry)" },
      { "word": "تَتَكَرَّرُ", "meaning": "repeats" },
      { "word": "إِيقَاع", "meaning": "rhythm" },
      { "word": "أَتْقَنُوا", "meaning": "mastered" }
    ],
    "moralLesson": "Rhyme creates the musical quality of Arabic poetry. It requires skill and has been refined over centuries.",
    "moralLessonAr": "القافية تخلق الجودة الموسيقية للشعر العربي. تتطلب مهارة وقد صُقلت على مر القرون.",
    "wordCount": 29
  },
  {
    "id": "b124",
    "title": "The Qasida",
    "titleAr": "الْقَصِيدَةُ",
    "level": "beginner",
    "category": "Poetry & Literature",
    "categoryAr": "الشعر والأدب",
    "text": "الْقَصِيدَةُ هِيَ الشَّكْلُ الرَّئِيسِيُّ لِلشِّعْرِ الْعَرَبِيِّ. تَتَكَوَّنُ مِنْ أَبْيَاتٍ كَثِيرَةٍ. لَهَا قَافِيَةٌ وَاحِدَةٌ. تَبْدَأُ عَادَةً بِذِكْرِ الْأَطْلَالِ. ثُمَّ تَنْتَقِلُ إِلَى الْمَوْضُوعِ الرَّئِيسِيِّ.",
    "translation": "The qasida is the main form of Arabic poetry. It consists of many verses. It has one rhyme. It usually begins with mentioning ruins. Then it moves to the main subject.",
    "grammaticalConcepts": [
      "Nominal sentence (القصيدة هي الشكل)",
      "Form V verb (تتكون)",
      "Fronted predicate (لها قافية)",
      "Adverb (عادةً)",
      "Sequence with ثم (ثم تنتقل)"
    ],
    "vocabularyHighlights": [
      { "word": "قَصِيدَة", "meaning": "ode, poem" },
      { "word": "الشَّكْل الرَّئِيسِيّ", "meaning": "main form" },
      { "word": "أَبْيَات", "meaning": "verses" },
      { "word": "الْأَطْلَال", "meaning": "ruins, abandoned camps" },
      { "word": "تَنْتَقِلُ", "meaning": "moves, transitions" }
    ],
    "moralLesson": "The qasida has a traditional structure that poets followed for centuries. Understanding its form helps appreciate classical Arabic poetry.",
    "moralLessonAr": "القصيدة لها بنية تقليدية اتبعها الشعراء لقرون. فهم شكلها يساعد في تقدير الشعر العربي الكلاسيكي.",
    "wordCount": 30
  },
  {
    "id": "b125",
    "title": "Nature in Poetry",
    "titleAr": "الطَّبِيعَةُ فِي الشِّعْرِ",
    "level": "beginner",
    "category": "Poetry & Literature",
    "categoryAr": "الشعر والأدب",
    "text": "الشُّعَرَاءُ يُحِبُّونَ الطَّبِيعَةَ. يَكْتُبُونَ عَنِ الصَّحْرَاءِ وَالنُّجُومِ. يَصِفُونَ الْقَمَرَ وَالشَّمْسَ. يَتَغَنَّوْنَ بِالرَّبِيعِ وَالْأَمْطَارِ. الطَّبِيعَةُ تُلْهِمُ الشَّاعِرَ وَتَفْتَحُ خَيَالَهُ.",
    "translation": "Poets love nature. They write about the desert and stars. They describe the moon and sun. They sing of spring and rains. Nature inspires the poet and opens his imagination.",
    "grammaticalConcepts": [
      "Present tense verbs (يحبون، يكتبون، يصفون)",
      "Form V verb (يتغنّون)",
      "Form IV verb (تُلهم)",
      "Attached pronouns (خياله)",
      "Prepositions (عن، بـ)"
    ],
    "vocabularyHighlights": [
      { "word": "الشُّعَرَاء", "meaning": "poets" },
      { "word": "يَصِفُونَ", "meaning": "they describe" },
      { "word": "يَتَغَنَّوْنَ", "meaning": "they sing of" },
      { "word": "تُلْهِمُ", "meaning": "inspires" },
      { "word": "خَيَال", "meaning": "imagination" }
    ],
    "moralLesson": "Nature has always been a source of poetic inspiration. Arab poets found beauty and meaning in the desert landscape.",
    "moralLessonAr": "الطبيعة كانت دائمًا مصدر إلهام شعري. الشعراء العرب وجدوا الجمال والمعنى في المشهد الصحراوي.",
    "wordCount": 28
  },
  {
    "id": "b126",
    "title": "Poetry of Praise",
    "titleAr": "شِعْرُ الْمَدْحِ",
    "level": "beginner",
    "category": "Poetry & Literature",
    "categoryAr": "الشعر والأدب",
    "text": "الْمَدْحُ نَوْعٌ مِنْ أَنْوَاعِ الشِّعْرِ. الشَّاعِرُ يَمْدَحُ الْمَلِكَ أَوِ الْقَائِدَ. يَذْكُرُ صِفَاتِهِ الْحَسَنَةَ. الْكَرَمُ وَالشَّجَاعَةُ وَالْعَدْلُ. كَانَ الشُّعَرَاءُ يَأْخُذُونَ جَوَائِزَ عَلَى مَدْحِهِمْ.",
    "translation": "Praise is a type of poetry. The poet praises the king or leader. He mentions his good qualities. Generosity, courage, and justice. Poets used to receive rewards for their praise.",
    "grammaticalConcepts": [
      "Nominal sentence (المدح نوع)",
      "Present tense (يمدح، يذكر)",
      "Kanat + present (كان يأخذون)",
      "Enumeration (الكرم والشجاعة والعدل)",
      "Attached pronouns (صفاته، مدحهم)"
    ],
    "vocabularyHighlights": [
      { "word": "الْمَدْح", "meaning": "praise poetry" },
      { "word": "يَمْدَحُ", "meaning": "praises" },
      { "word": "صِفَات", "meaning": "qualities, attributes" },
      { "word": "الشَّجَاعَة", "meaning": "courage" },
      { "word": "جَوَائِز", "meaning": "rewards, prizes" }
    ],
    "moralLesson": "Praise poetry celebrated virtues that society valued. It encouraged leaders to embody the qualities poets praised.",
    "moralLessonAr": "شعر المدح احتفى بالفضائل التي يقدرها المجتمع. شجع القادة على تجسيد الصفات التي مدحها الشعراء.",
    "wordCount": 31
  },

  // ============================================
  // INTERMEDIATE POETRY & LITERATURE TEXTS (i112-i117)
  // Deeper exploration of poetic forms ~55 words
  // ============================================
  {
    "id": "i112",
    "title": "Pre-Islamic Poetry",
    "titleAr": "الشِّعْرُ الْجَاهِلِيُّ",
    "level": "intermediate",
    "category": "Poetry & Literature",
    "categoryAr": "الشعر والأدب",
    "text": "قَبْلَ الْإِسْلَامِ ازْدَهَرَ الشِّعْرُ الْعَرَبِيُّ. كَانَ لِكُلِّ قَبِيلَةٍ شُعَرَاؤُهَا. تَنَافَسُوا فِي سُوقِ عُكَاظٍ. عُلِّقَتْ أَفْضَلُ الْقَصَائِدِ عَلَى الْكَعْبَةِ. سُمِّيَتِ الْمُعَلَّقَاتِ. تَنَاوَلَتِ الْفَخْرَ وَالْحَمَاسَةَ وَالْغَزَلَ وَالرِّثَاءَ. هَذَا الشِّعْرُ وَثَّقَ حَيَاةَ الْعَرَبِ قَبْلَ الْإِسْلَامِ.",
    "translation": "Before Islam, Arabic poetry flourished. Every tribe had its poets. They competed in the market of Ukaz. The best poems were hung on the Kaaba. They were called the Mu'allaqat. They covered pride, enthusiasm, love poetry, and elegy. This poetry documented Arab life before Islam.",
    "grammaticalConcepts": [
      "Form VIII verb (ازدهر)",
      "Form VI verb (تنافسوا)",
      "Passive (عُلّقت، سُمّيت)",
      "Form V verb (تناولت)",
      "Form II verb (وثّق)"
    ],
    "vocabularyHighlights": [
      { "word": "الْجَاهِلِيّ", "meaning": "pre-Islamic" },
      { "word": "ازْدَهَرَ", "meaning": "flourished" },
      { "word": "تَنَافَسُوا", "meaning": "competed" },
      { "word": "الْمُعَلَّقَات", "meaning": "the Hanging Poems" },
      { "word": "الرِّثَاء", "meaning": "elegy" }
    ],
    "moralLesson": "Pre-Islamic poetry reached remarkable heights of artistry. It remains a foundation for understanding Arabic language and culture.",
    "moralLessonAr": "الشعر الجاهلي وصل إلى ذروة فنية ملحوظة. يظل أساسًا لفهم اللغة والثقافة العربية.",
    "wordCount": 48
  },
  {
    "id": "i113",
    "title": "The Ghazal",
    "titleAr": "الْغَزَلُ",
    "level": "intermediate",
    "category": "Poetry & Literature",
    "categoryAr": "الشعر والأدب",
    "text": "الْغَزَلُ هُوَ شِعْرُ الْحُبِّ وَالْعِشْقِ. يَصِفُ الشَّاعِرُ جَمَالَ الْمَحْبُوبَةِ. يَتَغَزَّلُ بِعَيْنَيْهَا وَشَعْرِهَا وَقَامَتِهَا. يُعَبِّرُ عَنِ الشَّوْقِ وَاللَّوْعَةِ وَالْحَنِينِ. مِنْ أَشْهَرِ شُعَرَاءِ الْغَزَلِ: عُمَرُ بْنُ أَبِي رَبِيعَةَ وَجَمِيلُ بُثَيْنَةَ. الْغَزَلُ الْعُذْرِيُّ يَتَمَيَّزُ بِالْعِفَّةِ وَالطُّهْرِ.",
    "translation": "Ghazal is the poetry of love and passion. The poet describes the beloved's beauty. He praises her eyes, hair, and stature. He expresses longing, anguish, and yearning. Among the most famous ghazal poets: Umar ibn Abi Rabi'ah and Jamil Buthayna. Udhri ghazal is distinguished by chastity and purity.",
    "grammaticalConcepts": [
      "Nominal sentence (الغزل هو شعر)",
      "Form V verb (يتغزّل، يتميّز)",
      "Dual (عينيها)",
      "Enumeration (الشوق واللوعة والحنين)",
      "Superlative (من أشهر)"
    ],
    "vocabularyHighlights": [
      { "word": "الْغَزَل", "meaning": "love poetry, ghazal" },
      { "word": "الْمَحْبُوبَة", "meaning": "beloved (female)" },
      { "word": "الشَّوْق", "meaning": "longing" },
      { "word": "اللَّوْعَة", "meaning": "anguish of love" },
      { "word": "الْعُذْرِيّ", "meaning": "Udhri (chaste love)" }
    ],
    "moralLesson": "Ghazal poetry explores the depths of human emotion. The Udhri tradition elevated love to a spiritual experience.",
    "moralLessonAr": "شعر الغزل يستكشف أعماق العاطفة الإنسانية. التقليد العذري رفع الحب إلى تجربة روحانية.",
    "wordCount": 52
  },
  {
    "id": "i114",
    "title": "The Mu'allaqat",
    "titleAr": "الْمُعَلَّقَاتُ",
    "level": "intermediate",
    "category": "Poetry & Literature",
    "categoryAr": "الشعر والأدب",
    "text": "الْمُعَلَّقَاتُ سَبْعُ قَصَائِدَ أَوْ عَشْرٌ. اخْتَارَهَا الْعَرَبُ كَأَفْضَلِ مَا قِيلَ. قِيلَ إِنَّهَا كُتِبَتْ بِمَاءِ الذَّهَبِ. عُلِّقَتْ عَلَى جِدَارِ الْكَعْبَةِ تَكْرِيمًا لَهَا. مِنْ شُعَرَائِهَا: امْرُؤُ الْقَيْسِ وَطَرَفَةُ بْنُ الْعَبْدِ. كُلُّ مُعَلَّقَةٍ تَحْكِي قِصَّةً وَتُجَسِّدُ قِيَمًا.",
    "translation": "The Mu'allaqat are seven or ten poems. Arabs chose them as the best ever composed. It is said they were written in gold water. They were hung on the Kaaba's wall to honor them. Among their poets: Imru' al-Qays and Tarafa ibn al-Abd. Each Mu'allaqa tells a story and embodies values.",
    "grammaticalConcepts": [
      "Numbers (سبع، عشر)",
      "Superlative (كأفضل ما قيل)",
      "Passive (قيل، اختارها، عُلّقت، كُتبت)",
      "Maf'ul li-ajlih (تكريمًا)",
      "Form II verb (تجسّد)"
    ],
    "vocabularyHighlights": [
      { "word": "الْمُعَلَّقَات", "meaning": "the Hanging Poems" },
      { "word": "مَاء الذَّهَب", "meaning": "gold water/ink" },
      { "word": "جِدَار", "meaning": "wall" },
      { "word": "تَكْرِيمًا", "meaning": "honoring" },
      { "word": "تُجَسِّدُ", "meaning": "embodies" }
    ],
    "moralLesson": "The Mu'allaqat represent the pinnacle of pre-Islamic poetry. They remain essential for studying classical Arabic language.",
    "moralLessonAr": "المعلقات تمثل ذروة الشعر الجاهلي. تظل ضرورية لدراسة اللغة العربية الكلاسيكية.",
    "wordCount": 50
  },
  {
    "id": "i115",
    "title": "Poetry of Longing",
    "titleAr": "شِعْرُ الْحَنِينِ",
    "level": "intermediate",
    "category": "Poetry & Literature",
    "categoryAr": "الشعر والأدب",
    "text": "الْحَنِينُ شُعُورٌ عَمِيقٌ بِالشَّوْقِ. يَحِنُّ الشَّاعِرُ إِلَى وَطَنِهِ وَأَهْلِهِ. يَتَذَكَّرُ أَيَّامَ الطُّفُولَةِ وَالشَّبَابِ. الْمُغْتَرِبُ يَكْتُبُ أَجْمَلَ شِعْرِ الْحَنِينِ. الْبُعْدُ يَزِيدُ الشَّوْقَ وَالدُّمُوعَ. هَذَا الشِّعْرُ يُلَامِسُ قُلُوبَ كُلِّ مَنْ ذَاقَ الْغُرْبَةَ.",
    "translation": "Longing is a deep feeling of yearning. The poet yearns for his homeland and family. He remembers the days of childhood and youth. The expatriate writes the most beautiful poetry of longing. Distance increases yearning and tears. This poetry touches the hearts of all who have tasted exile.",
    "grammaticalConcepts": [
      "Nominal sentences (الحنين شعور)",
      "Form V verb (يتذكر)",
      "Form III verb (يلامس)",
      "Active participle (المغترب)",
      "Relative clause (كل من ذاق)"
    ],
    "vocabularyHighlights": [
      { "word": "الْحَنِين", "meaning": "longing, nostalgia" },
      { "word": "يَحِنُّ", "meaning": "yearns" },
      { "word": "الْمُغْتَرِب", "meaning": "expatriate" },
      { "word": "الْغُرْبَة", "meaning": "exile, being away from home" },
      { "word": "ذَاقَ", "meaning": "tasted, experienced" }
    ],
    "moralLesson": "Poetry of longing speaks to a universal human experience. Distance from home intensifies our appreciation of what we left behind.",
    "moralLessonAr": "شعر الحنين يتحدث إلى تجربة إنسانية عالمية. البعد عن الوطن يزيد تقديرنا لما تركناه.",
    "wordCount": 50
  },
  {
    "id": "i116",
    "title": "Sufi Poetry",
    "titleAr": "الشِّعْرُ الصُّوفِيُّ",
    "level": "intermediate",
    "category": "Poetry & Literature",
    "categoryAr": "الشعر والأدب",
    "text": "الشِّعْرُ الصُّوفِيُّ يُعَبِّرُ عَنِ الْحُبِّ الْإِلَهِيِّ. يَسْتَخْدِمُ لُغَةَ الْغَزَلِ لِلتَّعْبِيرِ عَنِ الشَّوْقِ إِلَى اللهِ. الْمَحْبُوبُ هُوَ اللهُ وَالْعَاشِقُ هُوَ الْعَبْدُ. مِنْ أَشْهَرِ شُعَرَائِهِ: رَابِعَةُ الْعَدَوِيَّةُ وَجَلَالُ الدِّينِ الرُّومِيُّ وَابْنُ الْفَارِضِ. شِعْرُهُمْ يُحَلِّقُ بِالرُّوحِ إِلَى عَوَالِمَ عُلْوِيَّةٍ.",
    "translation": "Sufi poetry expresses divine love. It uses the language of ghazal to express longing for Allah. The beloved is Allah and the lover is the servant. Among its most famous poets: Rabi'a al-Adawiyya, Jalal al-Din Rumi, and Ibn al-Farid. Their poetry elevates the soul to higher realms.",
    "grammaticalConcepts": [
      "Form II verb (يعبّر، يحلّق)",
      "Lam of purpose (للتعبير)",
      "Nominal equations (المحبوب هو الله)",
      "Superlative (من أشهر)",
      "Form II verb (يحلّق)"
    ],
    "vocabularyHighlights": [
      { "word": "الصُّوفِيّ", "meaning": "Sufi, mystical" },
      { "word": "الْحُبّ الْإِلَهِيّ", "meaning": "divine love" },
      { "word": "الْعَاشِق", "meaning": "lover" },
      { "word": "يُحَلِّقُ", "meaning": "soars, elevates" },
      { "word": "عَوَالِم عُلْوِيَّة", "meaning": "higher realms" }
    ],
    "moralLesson": "Sufi poetry transformed earthly love language into expressions of divine longing. It represents the spiritual dimension of Arabic literature.",
    "moralLessonAr": "الشعر الصوفي حوّل لغة الحب الأرضي إلى تعبيرات عن الشوق الإلهي. يمثل البعد الروحاني للأدب العربي.",
    "wordCount": 52
  },
  {
    "id": "i117",
    "title": "Modern Arabic Poetry",
    "titleAr": "الشِّعْرُ الْعَرَبِيُّ الْحَدِيثُ",
    "level": "intermediate",
    "category": "Poetry & Literature",
    "categoryAr": "الشعر والأدب",
    "text": "فِي الْقَرْنِ الْعِشْرِينَ تَطَوَّرَ الشِّعْرُ الْعَرَبِيُّ. كَسَرَ الشُّعَرَاءُ قُيُودَ الْوَزْنِ التَّقْلِيدِيِّ. ظَهَرَ الشِّعْرُ الْحُرُّ وَقَصِيدَةُ النَّثْرِ. تَنَاوَلَ الشِّعْرُ قَضَايَا اجْتِمَاعِيَّةً وَسِيَاسِيَّةً. مِنْ رُوَّادِهِ: نَازِكُ الْمَلَائِكَةِ وَبَدْرُ شَاكِرِ السَّيَّابِ وَمَحْمُودُ دَرْوِيشُ. جَمَعُوا بَيْنَ التُّرَاثِ وَالتَّجْدِيدِ.",
    "translation": "In the twentieth century, Arabic poetry evolved. Poets broke the constraints of traditional meter. Free verse and prose poetry appeared. Poetry addressed social and political issues. Among its pioneers: Nazik al-Malaika, Badr Shakir al-Sayyab, and Mahmoud Darwish. They combined heritage with innovation.",
    "grammaticalConcepts": [
      "Form V verb (تطوّر)",
      "Past tense narrative (كسر، ظهر، تناول)",
      "Idafa (قيود الوزن، قصيدة النثر)",
      "Plural patterns (قضايا، روّاد)",
      "Bayna... wa (بين التراث والتجديد)"
    ],
    "vocabularyHighlights": [
      { "word": "تَطَوَّرَ", "meaning": "evolved" },
      { "word": "قُيُود", "meaning": "constraints" },
      { "word": "الشِّعْر الْحُرّ", "meaning": "free verse" },
      { "word": "رُوَّاد", "meaning": "pioneers" },
      { "word": "التَّجْدِيد", "meaning": "innovation, renewal" }
    ],
    "moralLesson": "Modern Arabic poetry balanced tradition with innovation. It engaged with contemporary issues while honoring classical heritage.",
    "moralLessonAr": "الشعر العربي الحديث وازن بين التراث والتجديد. تفاعل مع القضايا المعاصرة مع تكريم التراث الكلاسيكي.",
    "wordCount": 52
  },

  // ============================================
  // ADVANCED POETRY & LITERATURE TEXTS (a107-a112)
  // Deep literary analysis ~100+ words
  // ============================================
  {
    "id": "a107",
    "title": "The Art of Arabic Verse",
    "titleAr": "فَنُّ الشِّعْرِ الْعَرَبِيِّ",
    "level": "advanced",
    "category": "Poetry & Literature",
    "categoryAr": "الشعر والأدب",
    "text": "الشِّعْرُ الْعَرَبِيُّ يَقُومُ عَلَى الْوَزْنِ وَالْقَافِيَةِ. وَضَعَ الْخَلِيلُ بْنُ أَحْمَدَ عِلْمَ الْعَرُوضِ. اكْتَشَفَ سِتَّةَ عَشَرَ بَحْرًا شِعْرِيًّا. لِكُلِّ بَحْرٍ إِيقَاعُهُ الْخَاصُّ وَمِزَاجُهُ. الطَّوِيلُ لِلْفَخْرِ وَالْكَامِلُ لِلرِّثَاءِ. الْوَزْنُ لَيْسَ قَيْدًا بَلْ إِطَارًا يُحَرِّرُ الْإِبْدَاعَ. الشَّاعِرُ الْمَاهِرُ يَلْعَبُ دَاخِلَ الْقَوَاعِدِ فَيُنْتِجُ جَمَالًا لَا يُوصَفُ.",
    "translation": "Arabic poetry is based on meter and rhyme. Al-Khalil ibn Ahmad established the science of prosody. He discovered sixteen poetic meters. Each meter has its own rhythm and mood. Al-Tawil for pride and Al-Kamil for elegy. Meter is not a constraint but a framework that liberates creativity. The skilled poet plays within the rules and produces indescribable beauty.",
    "grammaticalConcepts": [
      "Yaqum ala (يقوم على - is based on)",
      "Form VIII verb (اكتشف)",
      "Numbers (ستة عشر)",
      "Leysa... bal (ليس قيدًا بل إطارًا)",
      "Fa of consequence (فينتج)",
      "Passive (لا يُوصف)"
    ],
    "vocabularyHighlights": [
      { "word": "الْعَرُوض", "meaning": "prosody" },
      { "word": "بَحْر", "meaning": "poetic meter (lit. sea)" },
      { "word": "إِيقَاع", "meaning": "rhythm" },
      { "word": "قَيْد", "meaning": "constraint" },
      { "word": "إِطَار", "meaning": "framework" }
    ],
    "moralLesson": "Arabic prosody is a sophisticated science. Mastering its rules enables creative freedom rather than limiting it.",
    "moralLessonAr": "علم العروض العربي علم متطور. إتقان قواعده يمكّن من الحرية الإبداعية بدلًا من تقييدها.",
    "wordCount": 72
  },
  {
    "id": "a108",
    "title": "Love in Classical Poetry",
    "titleAr": "الْحُبُّ فِي الشِّعْرِ الْكِلَاسِيكِيِّ",
    "level": "advanced",
    "category": "Poetry & Literature",
    "categoryAr": "الشعر والأدب",
    "text": "الْحُبُّ مَوْضُوعٌ أَسَاسِيٌّ فِي الشِّعْرِ الْعَرَبِيِّ. تَعَدَّدَتْ مَدَارِسُهُ: الْغَزَلُ الصَّرِيحُ الَّذِي يَصِفُ الْجَمَالَ الْحِسِّيَّ. وَالْغَزَلُ الْعُذْرِيُّ الَّذِي يُمَجِّدُ الْحُبَّ الطَّاهِرَ حَتَّى الْمَوْتِ. قَيْسٌ وَلَيْلَى رَمْزُ الْحُبِّ الْعُذْرِيِّ. مَاتَ قَيْسٌ مَجْنُونًا مِنَ الْحُبِّ. الشِّعْرُ حَوَّلَ قِصَّتَهُمْ إِلَى أُسْطُورَةٍ خَالِدَةٍ. الْحُبُّ فِي الشِّعْرِ لَيْسَ مُجَرَّدَ عَاطِفَةٍ بَلْ فَلْسَفَةٌ وَرُؤْيَةٌ لِلْحَيَاةِ.",
    "translation": "Love is a fundamental theme in Arabic poetry. Its schools varied: explicit ghazal that describes sensual beauty, and Udhri ghazal that glorifies pure love unto death. Qays and Layla are symbols of Udhri love. Qays died mad from love. Poetry transformed their story into an immortal legend. Love in poetry is not merely emotion but a philosophy and vision of life.",
    "grammaticalConcepts": [
      "Form V verb (تعددت)",
      "Relative clauses (الذي يصف، الذي يمجّد)",
      "Hal (مجنونًا)",
      "Form II verb (حوّل، يمجّد)",
      "Leysa... bal (ليس مجرد... بل فلسفة)"
    ],
    "vocabularyHighlights": [
      { "word": "مَدَارِس", "meaning": "schools (of thought)" },
      { "word": "الصَّرِيح", "meaning": "explicit" },
      { "word": "يُمَجِّدُ", "meaning": "glorifies" },
      { "word": "أُسْطُورَة", "meaning": "legend" },
      { "word": "خَالِدَة", "meaning": "immortal" }
    ],
    "moralLesson": "Arabic love poetry evolved different approaches to romance. The Udhri tradition made love a transformative spiritual experience.",
    "moralLessonAr": "شعر الحب العربي طوّر مقاربات مختلفة للرومانسية. التقليد العذري جعل الحب تجربة روحانية تحويلية.",
    "wordCount": 78
  },
  {
    "id": "a109",
    "title": "The Poet as Spokesman",
    "titleAr": "الشَّاعِرُ لِسَانُ قَوْمِهِ",
    "level": "advanced",
    "category": "Poetry & Literature",
    "categoryAr": "الشعر والأدب",
    "text": "فِي الْمُجْتَمَعِ الْعَرَبِيِّ الْقَدِيمِ كَانَ الشَّاعِرُ لِسَانَ قَبِيلَتِهِ. يُدَافِعُ عَنْ شَرَفِهَا وَيَرُدُّ عَلَى أَعْدَائِهَا. يَحْفَظُ أَنْسَابَهَا وَأَمْجَادَهَا. يُؤَرِّخُ مَعَارِكَهَا وَانْتِصَارَاتِهَا. كَانَ الشِّعْرُ سِلَاحًا كَالسَّيْفِ. الْهِجَاءُ يُؤْذِي أَكْثَرَ مِنَ الطَّعْنِ. لِذَلِكَ كَانَتِ الْقَبَائِلُ تَحْتَفِي بِمِيلَادِ شَاعِرٍ كَمَا تَحْتَفِي بِمِيلَادِ فَارِسٍ.",
    "translation": "In ancient Arab society, the poet was his tribe's spokesman. He defended its honor and replied to its enemies. He preserved its lineages and glories. He chronicled its battles and victories. Poetry was a weapon like the sword. Satire hurts more than stabbing. Therefore tribes celebrated the birth of a poet as they celebrated the birth of a knight.",
    "grammaticalConcepts": [
      "Kanat + noun (كان لسان، كان سلاحًا)",
      "Form II verbs (يدافع، يؤرّخ)",
      "Comparative (أكثر من)",
      "Kama + verb (كما تحتفي)",
      "Attached pronouns (شرفها، أعدائها، أنسابها)"
    ],
    "vocabularyHighlights": [
      { "word": "لِسَان", "meaning": "tongue, spokesman" },
      { "word": "أَنْسَاب", "meaning": "lineages" },
      { "word": "يُؤَرِّخُ", "meaning": "chronicles" },
      { "word": "الْهِجَاء", "meaning": "satire" },
      { "word": "فَارِس", "meaning": "knight" }
    ],
    "moralLesson": "Poetry was a powerful social force in Arab culture. Poets shaped public opinion and preserved collective memory.",
    "moralLessonAr": "الشعر كان قوة اجتماعية مؤثرة في الثقافة العربية. الشعراء شكّلوا الرأي العام وحفظوا الذاكرة الجماعية.",
    "wordCount": 74
  },
  {
    "id": "a110",
    "title": "Metaphor and Imagery",
    "titleAr": "الِاسْتِعَارَةُ وَالتَّصْوِيرُ",
    "level": "advanced",
    "category": "Poetry & Literature",
    "categoryAr": "الشعر والأدب",
    "text": "الشِّعْرُ الْعَرَبِيُّ غَنِيٌّ بِالصُّوَرِ الْبَلَاغِيَّةِ. الِاسْتِعَارَةُ تُعْطِي الْكَلِمَاتِ أَبْعَادًا جَدِيدَةً. الْقَمَرُ وَجْهٌ وَالشَّمْسُ عَيْنٌ وَالنُّجُومُ دُمُوعٌ. التَّشْبِيهُ يَرْبِطُ بَيْنَ الْمَحْسُوسِ وَالْمَعْنَوِيِّ. الْكِنَايَةُ تُخْفِي الْمَعْنَى وَتَكْشِفُهُ فِي آنٍ وَاحِدٍ. طَوَّرَ النُّقَّادُ عِلْمَ الْبَلَاغَةِ لِتَحْلِيلِ هَذِهِ الْفُنُونِ. مَنْ فَهِمَ الْبَلَاغَةَ فَتَحَ أَبْوَابَ الشِّعْرِ وَالْقُرْآنِ.",
    "translation": "Arabic poetry is rich in rhetorical imagery. Metaphor gives words new dimensions. The moon is a face, the sun an eye, and stars are tears. Simile connects the sensory and the abstract. Metonymy conceals and reveals meaning simultaneously. Critics developed the science of rhetoric to analyze these arts. Whoever understands rhetoric opens the doors of poetry and the Quran.",
    "grammaticalConcepts": [
      "Nominal equations (القمر وجه، الشمس عين)",
      "Form II verb (طوّر)",
      "Lam of purpose (لتحليل)",
      "Fi anin wahid (في آن واحد - simultaneously)",
      "Conditional with من (من فهم... فتح)"
    ],
    "vocabularyHighlights": [
      { "word": "الِاسْتِعَارَة", "meaning": "metaphor" },
      { "word": "التَّشْبِيه", "meaning": "simile" },
      { "word": "الْكِنَايَة", "meaning": "metonymy" },
      { "word": "الْبَلَاغَة", "meaning": "rhetoric" },
      { "word": "النُّقَّاد", "meaning": "critics" }
    ],
    "moralLesson": "Arabic rhetoric is key to understanding both poetry and the Quran. Literary devices transform ordinary words into extraordinary meaning.",
    "moralLessonAr": "البلاغة العربية مفتاح لفهم الشعر والقرآن معًا. الأدوات الأدبية تحوّل الكلمات العادية إلى معانٍ غير عادية.",
    "wordCount": 76
  },
  {
    "id": "a111",
    "title": "Poetry and Society",
    "titleAr": "الشِّعْرُ وَالْمُجْتَمَعُ",
    "level": "advanced",
    "category": "Poetry & Literature",
    "categoryAr": "الشعر والأدب",
    "text": "الشِّعْرُ مِرْآةُ الْمُجْتَمَعِ. يَعْكِسُ قِيَمَهُ وَأَحْلَامَهُ وَصِرَاعَاتِهِ. فِي الْجَاهِلِيَّةِ مَجَّدَ الشَّجَاعَةَ وَالْكَرَمَ. فِي الْعَصْرِ الْإِسْلَامِيِّ تَغَنَّى بِالْفُتُوحَاتِ وَالْإِيمَانِ. فِي عَصْرِ الِانْحِطَاطِ تَرَاجَعَ مَعَ الْأُمَّةِ. فِي الْعَصْرِ الْحَدِيثِ حَمَلَ هُمُومَ التَّحْرِيرِ وَالْهُوِيَّةِ. الشِّعْرُ لَيْسَ تَرَفًا بَلْ ضَرُورَةٌ اجْتِمَاعِيَّةٌ. يُعَبِّرُ عَمَّا يَعْجَزُ النَّثْرُ عَنِ التَّعْبِيرِ عَنْهُ.",
    "translation": "Poetry is society's mirror. It reflects its values, dreams, and conflicts. In pre-Islamic times, it glorified courage and generosity. In the Islamic era, it celebrated conquests and faith. In the age of decline, it declined with the nation. In the modern age, it carried the concerns of liberation and identity. Poetry is not a luxury but a social necessity. It expresses what prose cannot express.",
    "grammaticalConcepts": [
      "Metaphor (مرآة المجتمع)",
      "Form II verbs (مجّد، تغنّى)",
      "Form V verb (تراجع)",
      "Leysa... bal (ليس ترفًا بل ضرورة)",
      "Relative clause (ما يعجز النثر عن)"
    ],
    "vocabularyHighlights": [
      { "word": "مِرْآة", "meaning": "mirror" },
      { "word": "صِرَاعَات", "meaning": "conflicts" },
      { "word": "الِانْحِطَاط", "meaning": "decline" },
      { "word": "تَرَف", "meaning": "luxury" },
      { "word": "النَّثْر", "meaning": "prose" }
    ],
    "moralLesson": "Poetry evolves with society. It reflects collective experiences and articulates what people feel but cannot say.",
    "moralLessonAr": "الشعر يتطور مع المجتمع. يعكس التجارب الجماعية ويعبر عما يشعر به الناس ولا يستطيعون قوله.",
    "wordCount": 80
  },
  {
    "id": "a112",
    "title": "The Enduring Word",
    "titleAr": "الْكَلِمَةُ الْخَالِدَةُ",
    "level": "advanced",
    "category": "Poetry & Literature",
    "categoryAr": "الشعر والأدب",
    "text": "الْمُلُوكُ مَاتُوا وَبَقِيَ ذِكْرُ مَنْ مَدَحَهُمُ الشُّعَرَاءُ. الْمَعَارِكُ انْتَهَتْ وَبَقِيَتِ الْقَصَائِدُ الَّتِي خَلَّدَتْهَا. الْحُبُّ ذَهَبَ وَبَقِيَتْ كَلِمَاتُ الْعَاشِقِينَ. الشِّعْرُ يَتَحَدَّى الزَّمَنَ. نَقْرَأُ امْرَأَ الْقَيْسِ بَعْدَ أَلْفٍ وَخَمْسِمِئَةِ سَنَةٍ. نَفْهَمُ مَشَاعِرَهُ كَأَنَّهُ مَعَاصِرٌ. الْكَلِمَةُ الصَّادِقَةُ لَا تَمُوتُ. الشَّاعِرُ يَمُوتُ وَيَبْقَى شِعْرُهُ حَيًّا يُحَدِّثُ الْأَجْيَالَ.",
    "translation": "Kings died but the memory of those poets praised remains. Battles ended but the poems that immortalized them remain. Love departed but the words of lovers remain. Poetry defies time. We read Imru' al-Qays after fifteen hundred years. We understand his feelings as if he were contemporary. The sincere word does not die. The poet dies but his poetry remains alive, speaking to generations.",
    "grammaticalConcepts": [
      "Contrast (ماتوا... وبقي)",
      "Relative clause (الذي خلّدتها، من مدحهم)",
      "Form II verb (خلّد)",
      "Ka'anna + noun (كأنه معاصر)",
      "Hal (حيًّا)"
    ],
    "vocabularyHighlights": [
      { "word": "خَلَّدَ", "meaning": "immortalized" },
      { "word": "يَتَحَدَّى", "meaning": "defies" },
      { "word": "مُعَاصِر", "meaning": "contemporary" },
      { "word": "الصَّادِقَة", "meaning": "sincere" },
      { "word": "الْأَجْيَال", "meaning": "generations" }
    ],
    "moralLesson": "Great poetry transcends time. The authentic expression of human experience speaks across centuries.",
    "moralLessonAr": "الشعر العظيم يتجاوز الزمن. التعبير الأصيل عن التجربة الإنسانية يتحدث عبر القرون.",
    "wordCount": 76
  }
];
