// src/data/reading/history.ts
// History & Events Texts (التاريخ والأحداث)
// Classical Arabic texts about Islamic history, battles, and turning points

import { ReadingText } from './types';

export const historyTexts: ReadingText[] = [
  // ============================================
  // BEGINNER HISTORY TEXTS (b115-b120)
  // Simple historical moments ~30 words
  // ============================================
  {
    "id": "b115",
    "title": "The Hijra",
    "titleAr": "الْهِجْرَةُ",
    "level": "beginner",
    "category": "History & Events",
    "categoryAr": "التاريخ والأحداث",
    "text": "هَاجَرَ النَّبِيُّ مِنْ مَكَّةَ إِلَى الْمَدِينَةِ. كَانَ مَعَهُ أَبُو بَكْرٍ الصِّدِّيقُ. اخْتَبَآ فِي غَارِ ثَوْرٍ ثَلَاثَةَ أَيَّامٍ. اسْتَقْبَلَهُمَا أَهْلُ الْمَدِينَةِ بِالْفَرَحِ. بَدَأَ التَّارِيخُ الْهِجْرِيُّ مِنْ هَذَا الْيَوْمِ.",
    "translation": "The Prophet migrated from Mecca to Medina. Abu Bakr Al-Siddiq was with him. They hid in the Cave of Thawr for three days. The people of Medina received them with joy. The Hijri calendar began from this day.",
    "grammaticalConcepts": [
      "Past tense verbs (هاجر، اختبأ، استقبل، بدأ)",
      "Dual verb (اختبآ، استقبلهما)",
      "Kanat + noun (كان معه)",
      "Numbers with tamyiz (ثلاثة أيام)",
      "Proper nouns (أبو بكر، غار ثور)"
    ],
    "vocabularyHighlights": [
      { "word": "هَاجَرَ", "meaning": "migrated" },
      { "word": "الصِّدِّيق", "meaning": "the truthful one" },
      { "word": "غَار", "meaning": "cave" },
      { "word": "اسْتَقْبَلَ", "meaning": "received, welcomed" },
      { "word": "التَّارِيخ الْهِجْرِيّ", "meaning": "Hijri calendar" }
    ],
    "moralLesson": "The Hijra marks the beginning of the Islamic state and calendar. It teaches us that sometimes leaving home is necessary for a greater purpose.",
    "moralLessonAr": "الهجرة تمثل بداية الدولة الإسلامية والتقويم الهجري. تعلمنا أن ترك الوطن أحيانًا ضروري لغاية أعظم.",
    "wordCount": 32
  },
  {
    "id": "b116",
    "title": "The First Adhan",
    "titleAr": "الْأَذَانُ الْأَوَّلُ",
    "level": "beginner",
    "category": "History & Events",
    "categoryAr": "التاريخ والأحداث",
    "text": "فِي الْمَدِينَةِ احْتَاجَ الْمُسْلِمُونَ طَرِيقَةً لِلنِّدَاءِ لِلصَّلَاةِ. رَأَى عَبْدُ اللهِ بْنُ زَيْدٍ الْأَذَانَ فِي الْمَنَامِ. أَمَرَ النَّبِيُّ بِلَالًا أَنْ يُؤَذِّنَ. صَعِدَ بِلَالٌ وَرَفَعَ صَوْتَهُ: اللهُ أَكْبَرُ! كَانَ صَوْتُهُ جَمِيلًا جِدًّا.",
    "translation": "In Medina, Muslims needed a way to call for prayer. Abdullah ibn Zayd saw the adhan in a dream. The Prophet ordered Bilal to give the call. Bilal climbed up and raised his voice: Allahu Akbar! His voice was very beautiful.",
    "grammaticalConcepts": [
      "Form VIII verb (احتاج)",
      "Lam of purpose (للنداء، للصلاة)",
      "Anna clause (أمر بلالًا أن يؤذن)",
      "Past tense narrative",
      "Kanat + adjective (كان صوته جميلًا)"
    ],
    "vocabularyHighlights": [
      { "word": "النِّدَاء", "meaning": "call" },
      { "word": "الْمَنَام", "meaning": "dream, sleep" },
      { "word": "يُؤَذِّنَ", "meaning": "to give the call to prayer" },
      { "word": "صَعِدَ", "meaning": "climbed up" },
      { "word": "رَفَعَ صَوْتَهُ", "meaning": "raised his voice" }
    ],
    "moralLesson": "The adhan came through divine guidance and human collaboration. Bilal, a freed slave, became the first muezzin, showing Islam's equality.",
    "moralLessonAr": "الأذان جاء بتوجيه إلهي وتعاون بشري. بلال العبد المحرر أصبح أول مؤذن، مما يظهر المساواة في الإسلام.",
    "wordCount": 35
  },
  {
    "id": "b117",
    "title": "Bilal the Muezzin",
    "titleAr": "بِلَالٌ الْمُؤَذِّنُ",
    "level": "beginner",
    "category": "History & Events",
    "categoryAr": "التاريخ والأحداث",
    "text": "بِلَالٌ كَانَ عَبْدًا فِي مَكَّةَ. أَسْلَمَ فَعَذَّبَهُ سَيِّدُهُ. كَانَ يَقُولُ: أَحَدٌ أَحَدٌ. اشْتَرَاهُ أَبُو بَكْرٍ وَأَعْتَقَهُ. أَصْبَحَ مُؤَذِّنَ الرَّسُولِ. عَاشَ حُرًّا كَرِيمًا بَعْدَ أَنْ كَانَ عَبْدًا.",
    "translation": "Bilal was a slave in Mecca. He became Muslim so his master tortured him. He kept saying: One, One (God is One). Abu Bakr bought him and freed him. He became the Prophet's muezzin. He lived free and honored after being a slave.",
    "grammaticalConcepts": [
      "Kanat + noun (كان عبدًا)",
      "Fa of consequence (فعذّبه)",
      "Form IV verb (أعتقه)",
      "Form I verb becoming Form IV (أسلم)",
      "Contrast (بعد أن كان)"
    ],
    "vocabularyHighlights": [
      { "word": "عَبْد", "meaning": "slave" },
      { "word": "عَذَّبَ", "meaning": "tortured" },
      { "word": "أَحَد", "meaning": "One (referring to God)" },
      { "word": "أَعْتَقَ", "meaning": "freed" },
      { "word": "مُؤَذِّن", "meaning": "muezzin, caller to prayer" }
    ],
    "moralLesson": "Bilal's story shows that faith gives strength to endure hardship. Islam honored the oppressed and freed the enslaved.",
    "moralLessonAr": "قصة بلال تُظهر أن الإيمان يعطي قوة لتحمل المشقة. الإسلام كرّم المظلومين وحرر المستعبدين.",
    "wordCount": 33
  },
  {
    "id": "b118",
    "title": "The Opening of Mecca",
    "titleAr": "فَتْحُ مَكَّةَ",
    "level": "beginner",
    "category": "History & Events",
    "categoryAr": "التاريخ والأحداث",
    "text": "بَعْدَ ثَمَانِ سَنَوَاتٍ مِنَ الْهِجْرَةِ عَادَ النَّبِيُّ إِلَى مَكَّةَ. دَخَلَهَا بِعَشَرَةِ آلَافِ مُسْلِمٍ. لَمْ يَقْتُلْ أَحَدًا. قَالَ لِأَهْلِ مَكَّةَ: اذْهَبُوا فَأَنْتُمُ الطُّلَقَاءُ. كَسَرَ الْأَصْنَامَ حَوْلَ الْكَعْبَةِ. عَادَتْ مَكَّةُ إِلَى التَّوْحِيدِ.",
    "translation": "After eight years from the Hijra, the Prophet returned to Mecca. He entered it with ten thousand Muslims. He did not kill anyone. He said to the people of Mecca: Go, for you are free. He broke the idols around the Kaaba. Mecca returned to monotheism.",
    "grammaticalConcepts": [
      "Numbers (ثمان سنوات، عشرة آلاف)",
      "Negation with لم (لم يقتل)",
      "Imperative (اذهبوا)",
      "Fa of explanation (فأنتم)",
      "Past tense narrative (عاد، دخل، قال، كسر)"
    ],
    "vocabularyHighlights": [
      { "word": "فَتْح", "meaning": "opening, conquest" },
      { "word": "الطُّلَقَاء", "meaning": "the freed ones" },
      { "word": "أَصْنَام", "meaning": "idols" },
      { "word": "كَسَرَ", "meaning": "broke" },
      { "word": "التَّوْحِيد", "meaning": "monotheism" }
    ],
    "moralLesson": "The Prophet showed mercy in victory. He forgave those who had persecuted him, setting an example of noble character.",
    "moralLessonAr": "النبي أظهر الرحمة في النصر. سامح من اضطهدوه، ضاربًا مثالًا للشخصية النبيلة.",
    "wordCount": 38
  },
  {
    "id": "b119",
    "title": "Building the Mosque",
    "titleAr": "بِنَاءُ الْمَسْجِدِ",
    "level": "beginner",
    "category": "History & Events",
    "categoryAr": "التاريخ والأحداث",
    "text": "أَوَّلُ شَيْءٍ فَعَلَهُ النَّبِيُّ فِي الْمَدِينَةِ بِنَاءُ الْمَسْجِدِ. عَمِلَ مَعَ الصَّحَابَةِ بِيَدِهِ. حَمَلَ الْحِجَارَةَ وَالطُّوبَ. كَانَ الْمَسْجِدُ بَسِيطًا. سَقْفُهُ مِنْ جَرِيدِ النَّخْلِ. لَكِنَّهُ كَانَ قَلْبَ الْمُجْتَمَعِ الْجَدِيدِ.",
    "translation": "The first thing the Prophet did in Medina was building the mosque. He worked with the companions by his own hand. He carried stones and bricks. The mosque was simple. Its roof was from palm branches. But it was the heart of the new community.",
    "grammaticalConcepts": [
      "Superlative (أول شيء)",
      "Relative clause (شيء فعله)",
      "Idafa chains (بناء المسجد، جريد النخل)",
      "Kanat + adjective (كان بسيطًا)",
      "Lakinna contrast (لكنه كان)"
    ],
    "vocabularyHighlights": [
      { "word": "بِنَاء", "meaning": "building, construction" },
      { "word": "الصَّحَابَة", "meaning": "companions" },
      { "word": "طُوب", "meaning": "bricks" },
      { "word": "جَرِيد النَّخْل", "meaning": "palm branches" },
      { "word": "قَلْب", "meaning": "heart" }
    ],
    "moralLesson": "The Prophet's first priority was establishing a place of worship and community. He led by example, working alongside everyone.",
    "moralLessonAr": "أولوية النبي الأولى كانت إنشاء مكان للعبادة والمجتمع. قاد بالقدوة، عاملًا جنبًا إلى جنب مع الجميع.",
    "wordCount": 36
  },
  {
    "id": "b120",
    "title": "The Farewell Pilgrimage",
    "titleAr": "حَجَّةُ الْوَدَاعِ",
    "level": "beginner",
    "category": "History & Events",
    "categoryAr": "التاريخ والأحداث",
    "text": "فِي السَّنَةِ الْعَاشِرَةِ لِلْهِجْرَةِ حَجَّ النَّبِيُّ. كَانَ مَعَهُ أَكْثَرُ مِنْ مِئَةِ أَلْفِ مُسْلِمٍ. خَطَبَ خُطْبَةً عَظِيمَةً. قَالَ: كُلُّ الْمُسْلِمِينَ إِخْوَةٌ. لَا فَضْلَ لِعَرَبِيٍّ عَلَى أَعْجَمِيٍّ إِلَّا بِالتَّقْوَى. بَعْدَهَا بِشُهُورٍ تُوُفِّيَ النَّبِيُّ.",
    "translation": "In the tenth year of Hijra, the Prophet performed pilgrimage. With him were more than a hundred thousand Muslims. He gave a great sermon. He said: All Muslims are brothers. There is no superiority of an Arab over a non-Arab except by piety. Months after, the Prophet passed away.",
    "grammaticalConcepts": [
      "Ordinal (السنة العاشرة)",
      "Numbers (مئة ألف)",
      "Exception (إلا بالتقوى)",
      "Passive (تُوفّي)",
      "Negation (لا فضل)"
    ],
    "vocabularyHighlights": [
      { "word": "حَجَّة الْوَدَاع", "meaning": "Farewell Pilgrimage" },
      { "word": "خَطَبَ", "meaning": "gave a sermon" },
      { "word": "خُطْبَة", "meaning": "sermon" },
      { "word": "أَعْجَمِيّ", "meaning": "non-Arab" },
      { "word": "التَّقْوَى", "meaning": "piety, God-consciousness" }
    ],
    "moralLesson": "The Farewell Sermon established fundamental Islamic principles: equality of all races and the importance of piety over lineage.",
    "moralLessonAr": "خطبة الوداع أرست مبادئ إسلامية أساسية: المساواة بين الأعراق وأهمية التقوى على النسب.",
    "wordCount": 40
  },

  // ============================================
  // INTERMEDIATE HISTORY TEXTS (i106-i111)
  // Key historical events ~55 words
  // ============================================
  {
    "id": "i106",
    "title": "The Battle of Badr",
    "titleAr": "غَزْوَةُ بَدْرٍ",
    "level": "intermediate",
    "category": "History & Events",
    "categoryAr": "التاريخ والأحداث",
    "text": "فِي السَّنَةِ الثَّانِيَةِ لِلْهِجْرَةِ وَقَعَتْ غَزْوَةُ بَدْرٍ. كَانَ الْمُسْلِمُونَ ثَلَاثَمِئَةٍ وَالْمُشْرِكُونَ أَلْفًا. نَصَرَ اللهُ الْمُسْلِمِينَ نَصْرًا عَظِيمًا. قُتِلَ سَبْعُونَ مِنَ الْمُشْرِكِينَ وَأُسِرَ سَبْعُونَ. هَذِهِ الْغَزْوَةُ سُمِّيَتْ يَوْمَ الْفُرْقَانِ. فَرَّقَتْ بَيْنَ الْحَقِّ وَالْبَاطِلِ.",
    "translation": "In the second year of Hijra, the Battle of Badr occurred. The Muslims were three hundred and the polytheists were a thousand. Allah gave the Muslims a great victory. Seventy polytheists were killed and seventy captured. This battle was called the Day of Criterion. It distinguished between truth and falsehood.",
    "grammaticalConcepts": [
      "Ordinal (الثانية)",
      "Numbers (ثلاثمئة، ألف، سبعون)",
      "Passive verbs (قُتل، أُسر، سُمّيت)",
      "Masdar as cognate accusative (نصرًا عظيمًا)",
      "Form II verb (فرّقت)"
    ],
    "vocabularyHighlights": [
      { "word": "غَزْوَة", "meaning": "battle, military expedition" },
      { "word": "الْمُشْرِكُون", "meaning": "polytheists" },
      { "word": "نَصَرَ", "meaning": "gave victory" },
      { "word": "أُسِرَ", "meaning": "was captured" },
      { "word": "الْفُرْقَان", "meaning": "criterion (between truth and falsehood)" }
    ],
    "moralLesson": "Badr showed that victory comes from Allah, not numbers. The Muslims' faith and unity overcame overwhelming odds.",
    "moralLessonAr": "بدر أظهرت أن النصر من الله لا من الأعداد. إيمان المسلمين ووحدتهم تغلبا على احتمالات ساحقة.",
    "wordCount": 48
  },
  {
    "id": "i107",
    "title": "The Treaty of Hudaybiyyah",
    "titleAr": "صُلْحُ الْحُدَيْبِيَةِ",
    "level": "intermediate",
    "category": "History & Events",
    "categoryAr": "التاريخ والأحداث",
    "text": "فِي السَّنَةِ السَّادِسَةِ خَرَجَ النَّبِيُّ لِلْعُمْرَةِ. مَنَعَتْهُ قُرَيْشٌ مِنْ دُخُولِ مَكَّةَ. عَقَدَ صُلْحًا مَعَهُمْ لِعَشْرِ سَنَوَاتٍ. ظَنَّ بَعْضُ الصَّحَابَةِ أَنَّهُ هَزِيمَةٌ. لَكِنَّ اللهَ سَمَّاهُ فَتْحًا مُبِينًا. فِي سَنَتَيْنِ دَخَلَ فِي الْإِسْلَامِ أَكْثَرُ مِمَّا دَخَلَ فِي عِشْرِينَ سَنَةً.",
    "translation": "In the sixth year, the Prophet went out for Umrah. Quraysh prevented him from entering Mecca. He made a treaty with them for ten years. Some companions thought it was a defeat. But Allah called it a clear victory. In two years, more people entered Islam than in twenty years.",
    "grammaticalConcepts": [
      "Numbers (السادسة، عشر سنوات، سنتين، عشرين)",
      "Form VIII verb (عقد صلحًا)",
      "Anna clause (ظن... أنه هزيمة)",
      "Lakinna contrast (لكن الله سماه)",
      "Comparative (أكثر مما دخل)"
    ],
    "vocabularyHighlights": [
      { "word": "صُلْح", "meaning": "treaty, peace agreement" },
      { "word": "الْعُمْرَة", "meaning": "minor pilgrimage" },
      { "word": "مَنَعَ", "meaning": "prevented" },
      { "word": "هَزِيمَة", "meaning": "defeat" },
      { "word": "فَتْحًا مُبِينًا", "meaning": "clear victory" }
    ],
    "moralLesson": "What appears as setback may be strategic success. Peace allowed Islam to spread faster than war ever could.",
    "moralLessonAr": "ما يبدو كنكسة قد يكون نجاحًا استراتيجيًا. السلام سمح للإسلام بالانتشار أسرع مما كانت لتفعله الحرب.",
    "wordCount": 52
  },
  {
    "id": "i108",
    "title": "The Opening of Egypt",
    "titleAr": "فَتْحُ مِصْرَ",
    "level": "intermediate",
    "category": "History & Events",
    "categoryAr": "التاريخ والأحداث",
    "text": "فِي عَهْدِ عُمَرَ بْنِ الْخَطَّابِ فُتِحَتْ مِصْرُ. قَادَ الْفَتْحَ عَمْرُو بْنُ الْعَاصِ. رَحَّبَ الْمِصْرِيُّونَ بِالْمُسْلِمِينَ لِأَنَّهُمْ كَانُوا يُعَانُونَ مِنْ ظُلْمِ الرُّومِ. أَسَّسَ عَمْرٌو مَدِينَةَ الْفُسْطَاطِ. بَنَى فِيهَا أَوَّلَ مَسْجِدٍ فِي أَفْرِيقْيَا. أَصْبَحَتْ مِصْرُ مَرْكَزًا لِلْحَضَارَةِ الْإِسْلَامِيَّةِ.",
    "translation": "In the era of Umar ibn Al-Khattab, Egypt was opened. Amr ibn Al-As led the conquest. The Egyptians welcomed the Muslims because they were suffering from Roman oppression. Amr founded the city of Fustat. He built in it the first mosque in Africa. Egypt became a center of Islamic civilization.",
    "grammaticalConcepts": [
      "Passive (فُتحت)",
      "Li-anna causal (لأنهم كانوا يعانون)",
      "Kanat + present (كانوا يعانون)",
      "Superlative (أول مسجد)",
      "Form II verb (أسّس)"
    ],
    "vocabularyHighlights": [
      { "word": "عَهْد", "meaning": "era, reign" },
      { "word": "قَادَ", "meaning": "led" },
      { "word": "يُعَانُونَ", "meaning": "were suffering" },
      { "word": "ظُلْم", "meaning": "oppression" },
      { "word": "الْفُسْطَاط", "meaning": "Fustat (first Islamic capital of Egypt)" }
    ],
    "moralLesson": "The Islamic conquest brought relief to oppressed populations. Justice and fair treatment won hearts more than military force.",
    "moralLessonAr": "الفتح الإسلامي جلب الراحة للشعوب المظلومة. العدل والمعاملة الحسنة كسبت القلوب أكثر من القوة العسكرية.",
    "wordCount": 52
  },
  {
    "id": "i109",
    "title": "Tariq and the Opening of Spain",
    "titleAr": "طَارِقٌ وَفَتْحُ الْأَنْدَلُسِ",
    "level": "intermediate",
    "category": "History & Events",
    "categoryAr": "التاريخ والأحداث",
    "text": "فِي سَنَةِ اثْنَتَيْنِ وَتِسْعِينَ لِلْهِجْرَةِ عَبَرَ طَارِقُ بْنُ زِيَادٍ الْبَحْرَ إِلَى إسْبَانْيَا. نَزَلَ عِنْدَ جَبَلٍ سُمِّيَ بِاسْمِهِ: جَبَلُ طَارِقٍ. قَالَ لِجُنُودِهِ: الْبَحْرُ وَرَاءَكُمْ وَالْعَدُوُّ أَمَامَكُمْ. هَزَمَ جَيْشَ الْقُوطِ الْكَبِيرَ. بَدَأَتْ ثَمَانِيَةُ قُرُونٍ مِنَ الْحَضَارَةِ الْإِسْلَامِيَّةِ فِي أُورُوبَّا.",
    "translation": "In the year ninety-two of Hijra, Tariq ibn Ziyad crossed the sea to Spain. He landed at a mountain named after him: Gibraltar (Jabal Tariq). He said to his soldiers: The sea is behind you and the enemy before you. He defeated the great Gothic army. Eight centuries of Islamic civilization in Europe began.",
    "grammaticalConcepts": [
      "Numbers (اثنتين وتسعين، ثمانية قرون)",
      "Passive (سُمّي)",
      "Nominal sentences (البحر وراءكم، العدو أمامكم)",
      "Past tense narrative",
      "Idafa (جبل طارق، جيش القوط)"
    ],
    "vocabularyHighlights": [
      { "word": "عَبَرَ", "meaning": "crossed" },
      { "word": "جَبَل طَارِق", "meaning": "Gibraltar" },
      { "word": "جُنُود", "meaning": "soldiers" },
      { "word": "الْعَدُوّ", "meaning": "enemy" },
      { "word": "الْقُوط", "meaning": "Goths (Visigoths)" }
    ],
    "moralLesson": "Tariq's bold crossing changed European history. His words inspire courage: when retreat is impossible, one must advance.",
    "moralLessonAr": "عبور طارق الجريء غيّر التاريخ الأوروبي. كلماته تلهم الشجاعة: عندما يستحيل التراجع، يجب التقدم.",
    "wordCount": 54
  },
  {
    "id": "i110",
    "title": "The Fall of Baghdad",
    "titleAr": "سُقُوطُ بَغْدَادَ",
    "level": "intermediate",
    "category": "History & Events",
    "categoryAr": "التاريخ والأحداث",
    "text": "فِي سَنَةِ سِتِّمِئَةٍ وَسِتٍّ وَخَمْسِينَ لِلْهِجْرَةِ سَقَطَتْ بَغْدَادُ. هَجَمَ الْمَغُولُ بِقِيَادَةِ هُولَاكُو. قَتَلُوا الْخَلِيفَةَ وَمَلَايِينَ الْمُسْلِمِينَ. أَحْرَقُوا الْكُتُبَ وَدَمَّرُوا الْمَكْتَبَاتِ. صَارَ نَهْرُ دِجْلَةَ أَسْوَدَ مِنَ الْحِبْرِ. كَانَتْ كَارِثَةً عَظِيمَةً. لَكِنَّ الْإِسْلَامَ بَقِيَ وَأَسْلَمَ كَثِيرٌ مِنَ الْمَغُولِ لَاحِقًا.",
    "translation": "In the year six hundred and fifty-six of Hijra, Baghdad fell. The Mongols attacked under Hulagu's leadership. They killed the caliph and millions of Muslims. They burned books and destroyed libraries. The Tigris River turned black from ink. It was a great catastrophe. But Islam remained and many Mongols later embraced Islam.",
    "grammaticalConcepts": [
      "Complex numbers (ستمئة وست وخمسين)",
      "Past tense verbs (سقطت، هجم، قتلوا، أحرقوا، دمّروا)",
      "Form II verbs (دمّروا)",
      "Kanat + noun (كانت كارثة)",
      "Lakinna contrast (لكن الإسلام بقي)"
    ],
    "vocabularyHighlights": [
      { "word": "سُقُوط", "meaning": "fall" },
      { "word": "الْمَغُول", "meaning": "Mongols" },
      { "word": "أَحْرَقُوا", "meaning": "burned" },
      { "word": "الْحِبْر", "meaning": "ink" },
      { "word": "كَارِثَة", "meaning": "catastrophe" }
    ],
    "moralLesson": "Even the greatest disasters cannot destroy faith. Islam survived and eventually converted its conquerors.",
    "moralLessonAr": "حتى أعظم الكوارث لا يمكنها تدمير الإيمان. الإسلام نجا وفي النهاية حوّل فاتحيه.",
    "wordCount": 56
  },
  {
    "id": "i111",
    "title": "Saladin and Jerusalem",
    "titleAr": "صَلَاحُ الدِّينِ وَالْقُدْسُ",
    "level": "intermediate",
    "category": "History & Events",
    "categoryAr": "التاريخ والأحداث",
    "text": "احْتَلَّ الصَّلِيبِيُّونَ الْقُدْسَ تِسْعِينَ سَنَةً. قَتَلُوا سَبْعِينَ أَلْفًا عِنْدَ دُخُولِهِمْ. جَاءَ صَلَاحُ الدِّينِ الْأَيُّوبِيُّ وَوَحَّدَ الْمُسْلِمِينَ. هَزَمَ الصَّلِيبِيِّينَ فِي حِطِّينَ. دَخَلَ الْقُدْسَ بِلَا مَذْبَحَةٍ. عَفَا عَنِ الْأَسْرَى وَسَمَحَ لِلْمَسِيحِيِّينَ بِالْبَقَاءِ. أَظْهَرَ الْفَرْقَ بَيْنَ أَخْلَاقِ الْإِسْلَامِ وَأَخْلَاقِ أَعْدَائِهِ.",
    "translation": "The Crusaders occupied Jerusalem for ninety years. They killed seventy thousand upon their entry. Saladin came and united the Muslims. He defeated the Crusaders at Hattin. He entered Jerusalem without massacre. He pardoned prisoners and allowed Christians to stay. He showed the difference between Islamic ethics and his enemies' ethics.",
    "grammaticalConcepts": [
      "Form VIII verb (احتلّ)",
      "Numbers (تسعين، سبعين ألفًا)",
      "Form II verb (وحّد)",
      "Negation with بلا (بلا مذبحة)",
      "Form I verbs (عفا، سمح، أظهر)"
    ],
    "vocabularyHighlights": [
      { "word": "الصَّلِيبِيُّون", "meaning": "Crusaders" },
      { "word": "احْتَلَّ", "meaning": "occupied" },
      { "word": "حِطِّين", "meaning": "Hattin (battle site)" },
      { "word": "مَذْبَحَة", "meaning": "massacre" },
      { "word": "عَفَا", "meaning": "pardoned" }
    ],
    "moralLesson": "Saladin demonstrated that true strength includes mercy. His conduct in victory contrasted sharply with the Crusaders' brutality.",
    "moralLessonAr": "صلاح الدين أظهر أن القوة الحقيقية تشمل الرحمة. سلوكه في النصر تناقض بشكل صارخ مع وحشية الصليبيين.",
    "wordCount": 56
  },

  // ============================================
  // ADVANCED HISTORY TEXTS (a101-a106)
  // Deep historical analysis ~100+ words
  // ============================================
  {
    "id": "a101",
    "title": "The Constitution of Medina",
    "titleAr": "صَحِيفَةُ الْمَدِينَةِ",
    "level": "advanced",
    "category": "History & Events",
    "categoryAr": "التاريخ والأحداث",
    "text": "عِنْدَمَا وَصَلَ النَّبِيُّ إِلَى الْمَدِينَةِ وَجَدَ مُجْتَمَعًا مُتَنَوِّعًا. كَانَ فِيهَا الْمُهَاجِرُونَ وَالْأَنْصَارُ وَالْيَهُودُ وَالْمُشْرِكُونَ. كَتَبَ صَحِيفَةً نَظَّمَتِ الْعَلَاقَاتِ بَيْنَهُمْ. أَعْطَتْ كُلَّ طَائِفَةٍ حُقُوقَهَا وَوَاجِبَاتِهَا. جَعَلَتِ الْجَمِيعَ مَسْؤُولِينَ عَنِ الدِّفَاعِ عَنِ الْمَدِينَةِ. هَذِهِ أَوَّلُ وَثِيقَةٍ دُسْتُورِيَّةٍ فِي التَّارِيخِ الْإِسْلَامِيِّ. أَسَّسَتْ لِمَبْدَأِ الْمُوَاطَنَةِ الْمُشْتَرَكَةِ.",
    "translation": "When the Prophet arrived in Medina, he found a diverse society. In it were the Emigrants, the Helpers, the Jews, and the polytheists. He wrote a document that organized relations between them. It gave every group its rights and duties. It made everyone responsible for defending Medina. This is the first constitutional document in Islamic history. It established the principle of shared citizenship.",
    "grammaticalConcepts": [
      "Temporal clause (عندما وصل)",
      "Relative clause (صحيفة نظّمت)",
      "Form II verb (نظّمت، أسّست)",
      "Plural forms (المهاجرون، الأنصار)",
      "Superlative (أول وثيقة)"
    ],
    "vocabularyHighlights": [
      { "word": "صَحِيفَة", "meaning": "document, charter" },
      { "word": "الْمُهَاجِرُون", "meaning": "Emigrants (from Mecca)" },
      { "word": "الْأَنْصَار", "meaning": "Helpers (Medinan Muslims)" },
      { "word": "طَائِفَة", "meaning": "group, sect" },
      { "word": "الْمُوَاطَنَة", "meaning": "citizenship" }
    ],
    "moralLesson": "The Constitution of Medina shows Islam's ability to create pluralistic governance. Rights and responsibilities applied to all residents regardless of faith.",
    "moralLessonAr": "صحيفة المدينة تُظهر قدرة الإسلام على إنشاء حكم تعددي. الحقوق والمسؤوليات انطبقت على جميع السكان بغض النظر عن الدين.",
    "wordCount": 72
  },
  {
    "id": "a102",
    "title": "Lessons from Uhud",
    "titleAr": "دُرُوسٌ مِنْ أُحُدٍ",
    "level": "advanced",
    "category": "History & Events",
    "categoryAr": "التاريخ والأحداث",
    "text": "فِي غَزْوَةِ أُحُدٍ تَحَوَّلَ النَّصْرُ إِلَى هَزِيمَةٍ. كَانَ السَّبَبُ أَنَّ الرُّمَاةَ تَرَكُوا مَوَاقِعَهُمْ طَمَعًا فِي الْغَنِيمَةِ. خَالَفُوا أَمْرَ النَّبِيِّ الصَّرِيحَ. اسْتُشْهِدَ سَبْعُونَ صَحَابِيًّا مِنْهُمْ حَمْزَةُ عَمُّ النَّبِيِّ. جُرِحَ النَّبِيُّ نَفْسُهُ. لَكِنَّ الْقُرْآنَ نَزَلَ يُعَلِّمُ الْمُسْلِمِينَ. النَّصْرُ يَحْتَاجُ إِلَى الطَّاعَةِ وَالِانْضِبَاطِ لَا الْحَمَاسَ فَقَطْ.",
    "translation": "In the Battle of Uhud, victory turned into defeat. The reason was that the archers left their positions out of greed for spoils. They disobeyed the Prophet's explicit order. Seventy companions were martyred, including Hamza, the Prophet's uncle. The Prophet himself was wounded. But the Quran descended teaching the Muslims. Victory requires obedience and discipline, not just enthusiasm.",
    "grammaticalConcepts": [
      "Form V verb (تحوّل)",
      "Anna clause (أن الرماة تركوا)",
      "Maf'ul li-ajlih (طمعًا في الغنيمة)",
      "Passive (استُشهد، جُرح)",
      "Negation with لا... فقط (لا الحماس فقط)"
    ],
    "vocabularyHighlights": [
      { "word": "الرُّمَاة", "meaning": "archers" },
      { "word": "الْغَنِيمَة", "meaning": "war spoils" },
      { "word": "الصَّرِيح", "meaning": "explicit, clear" },
      { "word": "اسْتُشْهِدَ", "meaning": "was martyred" },
      { "word": "الِانْضِبَاط", "meaning": "discipline" }
    ],
    "moralLesson": "Uhud taught that disobedience has consequences. Following leadership and maintaining discipline are essential for collective success.",
    "moralLessonAr": "أحد علّمت أن العصيان له عواقب. اتباع القيادة والحفاظ على الانضباط ضروريان للنجاح الجماعي.",
    "wordCount": 74
  },
  {
    "id": "a103",
    "title": "The Abbasid Golden Age",
    "titleAr": "الْعَصْرُ الذَّهَبِيُّ الْعَبَّاسِيُّ",
    "level": "advanced",
    "category": "History & Events",
    "categoryAr": "التاريخ والأحداث",
    "text": "فِي الْقَرْنَيْنِ الثَّالِثِ وَالرَّابِعِ لِلْهِجْرَةِ بَلَغَتِ الْحَضَارَةُ الْإِسْلَامِيَّةُ ذِرْوَتَهَا. تُرْجِمَتْ كُتُبُ الْيُونَانِ وَالْفُرْسِ وَالْهِنْدِ إِلَى الْعَرَبِيَّةِ. طَوَّرَ الْعُلَمَاءُ هَذِهِ الْعُلُومَ وَأَضَافُوا إِلَيْهَا. اخْتَرَعَ الْخَوَارِزْمِيُّ الْجَبْرَ. وَصَفَ ابْنُ الْهَيْثَمِ الْبَصَرِيَّاتِ. كَتَبَ ابْنُ سِينَا فِي الطِّبِّ. بَغْدَادُ وَقُرْطُبَةُ كَانَتَا أَنْوَرَ مُدُنِ الْعَالَمِ. هَذَا التُّرَاثُ أَسَّسَ لِلنَّهْضَةِ الْأُورُوبِيَّةِ لَاحِقًا.",
    "translation": "In the third and fourth centuries of Hijra, Islamic civilization reached its peak. Books of the Greeks, Persians, and Indians were translated into Arabic. Scholars developed these sciences and added to them. Al-Khwarizmi invented algebra. Ibn Al-Haytham described optics. Ibn Sina wrote on medicine. Baghdad and Cordoba were the most illuminated cities in the world. This heritage laid the foundation for the European Renaissance later.",
    "grammaticalConcepts": [
      "Dual (القرنين)",
      "Passive (تُرجمت)",
      "Form II verb (طوّر، أسّس)",
      "Dual nominal (كانتا أنور)",
      "Superlative (أنور مدن)"
    ],
    "vocabularyHighlights": [
      { "word": "ذِرْوَة", "meaning": "peak, zenith" },
      { "word": "الْجَبْر", "meaning": "algebra" },
      { "word": "الْبَصَرِيَّات", "meaning": "optics" },
      { "word": "التُّرَاث", "meaning": "heritage" },
      { "word": "النَّهْضَة", "meaning": "Renaissance" }
    ],
    "moralLesson": "The Islamic Golden Age preserved and advanced human knowledge. Muslims were bridges between ancient wisdom and modern science.",
    "moralLessonAr": "العصر الذهبي الإسلامي حفظ المعرفة البشرية وطورها. المسلمون كانوا جسورًا بين الحكمة القديمة والعلم الحديث.",
    "wordCount": 76
  },
  {
    "id": "a104",
    "title": "The Crusades and Their End",
    "titleAr": "الْحُرُوبُ الصَّلِيبِيَّةُ وَنِهَايَتُهَا",
    "level": "advanced",
    "category": "History & Events",
    "categoryAr": "التاريخ والأحداث",
    "text": "اسْتَمَرَّتِ الْحُرُوبُ الصَّلِيبِيَّةُ قَرْنَيْنِ تَقْرِيبًا. جَاءَ الْغُزَاةُ مِنْ أُورُوبَّا بِدَعْوَى تَحْرِيرِ الْقُدْسِ. ارْتَكَبُوا مَجَازِرَ فَظِيعَةً. لَكِنَّ الْمُسْلِمِينَ اتَّحَدُوا تَدْرِيجِيًّا. بَدَأَ عِمَادُ الدِّينِ زَنْكِي ثُمَّ ابْنُهُ نُورُ الدِّينِ. ثُمَّ جَاءَ صَلَاحُ الدِّينِ فَحَرَّرَ الْقُدْسَ. انْتَهَتِ الْمَمَالِكُ الصَّلِيبِيَّةُ عَلَى يَدِ الْمَمَالِيكِ. بَقِيَتِ الْعِبْرَةُ: الْوَحْدَةُ شَرْطُ النَّصْرِ.",
    "translation": "The Crusades lasted approximately two centuries. The invaders came from Europe claiming to liberate Jerusalem. They committed terrible massacres. But Muslims gradually united. Imad al-Din Zangi began, then his son Nur al-Din. Then Saladin came and liberated Jerusalem. The Crusader kingdoms ended at the hands of the Mamluks. The lesson remains: unity is a condition of victory.",
    "grammaticalConcepts": [
      "Form X verb (استمرت)",
      "Bi-da'wa (بدعوى - claiming)",
      "Form VIII verb (اتحدوا، ارتكبوا)",
      "Sequence with ثم (ثم ابنه، ثم جاء)",
      "Idiomatic (على يد = at the hands of)"
    ],
    "vocabularyHighlights": [
      { "word": "الْغُزَاة", "meaning": "invaders" },
      { "word": "مَجَازِر", "meaning": "massacres" },
      { "word": "تَدْرِيجِيًّا", "meaning": "gradually" },
      { "word": "الْمَمَالِيك", "meaning": "Mamluks" },
      { "word": "شَرْط", "meaning": "condition" }
    ],
    "moralLesson": "The Crusades were overcome only when Muslims unified. Division invites aggression; unity enables resistance and victory.",
    "moralLessonAr": "الحروب الصليبية تم التغلب عليها فقط عندما توحد المسلمون. الانقسام يدعو للعدوان؛ الوحدة تمكّن المقاومة والنصر.",
    "wordCount": 74
  },
  {
    "id": "a105",
    "title": "The Rise of the Ottomans",
    "titleAr": "صُعُودُ الْعُثْمَانِيِّينَ",
    "level": "advanced",
    "category": "History & Events",
    "categoryAr": "التاريخ والأحداث",
    "text": "بَدَأَتِ الدَّوْلَةُ الْعُثْمَانِيَّةُ إِمَارَةً صَغِيرَةً فِي الْأَنَاضُولِ. تَوَسَّعَتْ تَدْرِيجِيًّا حَتَّى فَتَحَتِ الْقُسْطَنْطِينِيَّةَ سَنَةَ 857 هـ. حَوَّلَهَا مُحَمَّدٌ الْفَاتِحُ إِلَى إسْطَنْبُولَ عَاصِمَةً لِلْخِلَافَةِ. حَكَمَ الْعُثْمَانِيُّونَ سِتَّةَ قُرُونٍ. وَصَلُوا إِلَى فِيينَّا وَشَمَالِ أَفْرِيقْيَا. حَمَوُا الْحَرَمَيْنِ الشَّرِيفَيْنِ. كَانُوا آخِرَ خِلَافَةٍ إِسْلَامِيَّةٍ كُبْرَى قَبْلَ الْعَصْرِ الْحَدِيثِ.",
    "translation": "The Ottoman state began as a small emirate in Anatolia. It expanded gradually until it conquered Constantinople in 857 AH. Muhammad the Conqueror transformed it into Istanbul, capital of the caliphate. The Ottomans ruled for six centuries. They reached Vienna and North Africa. They protected the Two Holy Sanctuaries. They were the last major Islamic caliphate before the modern era.",
    "grammaticalConcepts": [
      "Form V verb (توسّعت)",
      "Hatta + past (حتى فتحت)",
      "Form II verb (حوّل)",
      "Numbers (ستة قرون، 857)",
      "Superlative (آخر خلافة)"
    ],
    "vocabularyHighlights": [
      { "word": "إِمَارَة", "meaning": "emirate" },
      { "word": "الْأَنَاضُول", "meaning": "Anatolia" },
      { "word": "الْقُسْطَنْطِينِيَّة", "meaning": "Constantinople" },
      { "word": "الْفَاتِح", "meaning": "the Conqueror" },
      { "word": "الْحَرَمَيْن", "meaning": "the Two Holy Sanctuaries" }
    ],
    "moralLesson": "Great empires can grow from humble beginnings. The Ottomans preserved Islamic unity and protected Muslim lands for centuries.",
    "moralLessonAr": "الإمبراطوريات العظيمة يمكن أن تنمو من بدايات متواضعة. العثمانيون حافظوا على الوحدة الإسلامية وحموا أراضي المسلمين لقرون.",
    "wordCount": 72
  },
  {
    "id": "a106",
    "title": "Colonialism and Revival",
    "titleAr": "الِاسْتِعْمَارُ وَالنَّهْضَةُ",
    "level": "advanced",
    "category": "History & Events",
    "categoryAr": "التاريخ والأحداث",
    "text": "فِي الْقَرْنَيْنِ التَّاسِعَ عَشَرَ وَالْعِشْرِينَ احْتَلَّتْ أُورُوبَّا مُعْظَمَ الْعَالَمِ الْإِسْلَامِيِّ. اسْتَغَلَّتْ ثَرَوَاتِهِ وَفَرَّقَتْ شُعُوبَهُ. سَقَطَتِ الْخِلَافَةُ الْعُثْمَانِيَّةُ سَنَةَ 1924م. لَكِنَّ حَرَكَاتِ الْإِصْلَاحِ وَالتَّحْرِيرِ بَدَأَتْ. نَالَتِ الشُّعُوبُ اسْتِقْلَالَهَا تَدْرِيجِيًّا. الْيَوْمَ يَبْحَثُ الْمُسْلِمُونَ عَنْ طَرِيقٍ لِلنَّهْضَةِ. يَجْمَعُ بَيْنَ الْأَصَالَةِ وَالْمُعَاصَرَةِ، بَيْنَ الْهُوِيَّةِ وَالتَّقَدُّمِ.",
    "translation": "In the nineteenth and twentieth centuries, Europe occupied most of the Islamic world. It exploited its resources and divided its peoples. The Ottoman Caliphate fell in 1924. But reform and liberation movements began. Peoples gradually gained their independence. Today Muslims search for a path to revival. One that combines authenticity with modernity, identity with progress.",
    "grammaticalConcepts": [
      "Form VIII verb (احتلّت، استغلّت)",
      "Form II verb (فرّقت)",
      "Ordinal (التاسع عشر والعشرين)",
      "Lakinna contrast (لكن حركات)",
      "Bayna... wa bayna (بين الأصالة والمعاصرة)"
    ],
    "vocabularyHighlights": [
      { "word": "الِاسْتِعْمَار", "meaning": "colonialism" },
      { "word": "اسْتَغَلَّ", "meaning": "exploited" },
      { "word": "ثَرَوَات", "meaning": "resources, wealth" },
      { "word": "الْأَصَالَة", "meaning": "authenticity" },
      { "word": "الْمُعَاصَرَة", "meaning": "modernity" }
    ],
    "moralLesson": "Colonialism brought hardship but also sparked renewal. The ongoing challenge is balancing Islamic identity with contemporary needs.",
    "moralLessonAr": "الاستعمار جلب المشقة لكنه أيضًا أشعل التجديد. التحدي المستمر هو موازنة الهوية الإسلامية مع الاحتياجات المعاصرة.",
    "wordCount": 72
  }
];
