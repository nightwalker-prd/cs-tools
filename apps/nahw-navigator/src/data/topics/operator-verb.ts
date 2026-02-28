import type { NahwTopic } from '../types';

export const transitiveIntransitive: NahwTopic = {
  id: 'transitive-intransitive',
  titleAr: 'اللازم والمتعدي',
  titleEn: 'Intransitive & Transitive Verbs',
  transliteration: 'al-Laazim wa al-Muta\'addi',
  categoryId: 'operator',
  subcategoryId: 'operator-verbs',
  levels: [
    {
      difficulty: 'beginner',
      summary: 'Verbs are either intransitive (laazim) — requiring only a subject, or transitive (muta\'addi) — requiring both a subject and an object.',
      body: `## Intransitive and Transitive Verbs

### Intransitive (اللازم)
An intransitive verb is complete with just a subject (fa'il). It does not take a direct object.

### Transitive (المتعدي)
A transitive verb requires a direct object (maf'ul bih) in addition to the subject to complete its meaning.`,
      rules: [
        {
          arabic: 'الفعل اللازم يكتفي بالفاعل',
          english: 'An intransitive verb is complete with just its subject.',
          examples: [
            { arabic: 'جَلَسَ الطَّالِبُ أَمَامَ المُعَلِّمِ مُتَأَدِّبًا', translation: 'The student sat before the teacher politely' },
            { arabic: 'جَاءَ الحَقُّ', translation: 'The truth has come', source: 'Al-Isra 17:81' },
          ],
        },
        {
          arabic: 'الفعل المتعدي يحتاج إلى مفعول به',
          english: 'A transitive verb requires a direct object to complete its meaning.',
          examples: [
            { arabic: 'يَعْبُدُ المُسْلِمُ اللهَ', translation: 'The Muslim worships Allah' },
            { arabic: 'خَلَقَ اللهُ السَّمَاوَاتِ وَالأَرْضَ', translation: 'Allah created the heavens and the earth' },
          ],
        },
      ],
      tables: [
        {
          title: 'Regular Verbs',
          titleAr: 'الفعل القياسي',
          headers: ['Type', 'Arabic', 'Example', 'Translation'],
          rows: [
            ['Intransitive', 'الفعل اللازم', 'جَلَسَ الطَّالِبُ', 'The student sat'],
            ['Transitive', 'الفعل المتعدي', 'يَعْبُدُ المُسْلِمُ اللهَ', 'The Muslim worships Allah'],
          ],
        },
      ],
      sourceRef: 'As-Sughra, Section 1, Chapter 1',
    },
    {
      difficulty: 'intermediate',
      summary: 'Transitive verbs can take one, two, or even three objects. Verbs of the heart (af\'al al-qulub) like ظَنَّ and عَلِمَ take two objects. Some verbs like أَعْلَمَ and أَرَى take three objects.',
      body: `## Transitivity Levels

### Single-object transitive (يتعدى إلى مفعول واحد)
Most transitive verbs take a single direct object.

### Double-object transitive (يتعدى إلى مفعولين)
**Verbs of the heart** (أفعال القلوب) take two objects:

**Verbs of certainty:** عَلِمَ، رَأَى، وَجَدَ، دَرَى، تَعَلَّمَ، أَلْفَى، حَسِبَ
**Verbs of supposition:** ظَنَّ، خَالَ، حَسِبَ، زَعَمَ، عَدَّ

### Triple-object transitive (يتعدى إلى ثلاثة مفاعيل)
Verbs like أَعْلَمَ، أَرَى، حَدَّثَ، أَخْبَرَ، أَنْبَأَ take three objects.`,
      rules: [
        {
          arabic: 'أفعال القلوب تنصب مفعولين',
          english: 'Verbs of the heart take two objects (originally mubtada\' and khabar).',
          examples: [
            { arabic: 'ظَنَنْتُ الامْتِحَانَ سَهْلًا', translation: 'I thought the exam was easy', irab: 'الامتحانَ: first object — سَهْلًا: second object' },
            { arabic: 'عَلِمْتُ الحَقَّ وَاضِحًا', translation: 'I knew the truth to be clear' },
          ],
        },
      ],
      sourceRef: 'Al-Wusta, Book 1',
    },
    {
      difficulty: 'advanced',
      summary: 'Advanced transitivity covers verbs of the heart (أفعال القلوب) in depth — including their ability to be suspended (تعليق) or cancelled (إلغاء), triple-object verbs, and detailed categorization of verb transitivity with methods to make intransitive verbs transitive.',
      body: `## Advanced Transitivity Study

### 1. Verbs of the Heart — Suspension (التعليق)
When a لام or ما or لا comes between the verb and its objects, the verb is "suspended" — it doesn't directly govern the objects:
- عَلِمْتُ لَزَيْدٌ قَائِمٌ (I knew Zayd is standing — لام prevents governance)
- The verb's meaning still applies but its grammatical governance is suspended

### 2. Verbs of the Heart — Cancellation (الإلغاء)
When the verb is placed AFTER its two objects, its governance can be cancelled:
- زَيْدٌ قَائِمٌ ظَنَنْتُ → ظَنَّ is cancelled, objects are mubtada' and khabar

### 3. Triple-Object Verbs
أَعْلَمَ، أَرَى، أَنْبَأَ، حَدَّثَ، أَخْبَرَ take three objects:
- أَعْلَمْتُ زَيْدًا عَمْرًا فَاضِلًا (I informed Zayd that Amr is virtuous)

### 4. Making Intransitive Verbs Transitive
a. **With hamza** (التعدية بالهمزة): جَلَسَ (sat, intrans.) → أَجْلَسْتُهُ (I seated him, trans.)
b. **With tad'if** (التعدية بالتضعيف): فَرِحَ → فَرَّحْتُهُ
c. **With preposition**: ذَهَبَ بِهِ (went with him) — preposition extends transitivity`,
      rules: [
        {
          arabic: 'أفعال القلوب يجوز تعليقها وإلغاؤها',
          english: 'Verbs of the heart can be suspended (ta\'liq) by intervening particles or cancelled (ilgha\') when placed after their objects.',
          examples: [
            { arabic: 'عَلِمْتُ لَزَيْدٌ قَائِمٌ', translation: 'I knew that indeed Zayd is standing', irab: 'عَلِمْتُ: suspended (mu\'allaq) by لام — زَيْدٌ قَائِمٌ: mubtada\' and khabar (not objects)' },
            { arabic: 'زَيْدٌ قَائِمٌ عَلِمْتُ', translation: 'Zayd is standing, I know', irab: 'عَلِمْتُ: cancelled (mulgha) — placed after objects' },
          ],
        },
        {
          arabic: 'الفعل اللازم يتعدى بالهمزة أو التضعيف',
          english: 'Intransitive verbs can be made transitive through the causative hamza (af\'ala pattern) or doubling the middle radical (fa\'\'ala pattern).',
          examples: [
            { arabic: 'جَلَسَ → أَجْلَسْتُهُ', translation: 'he sat → I seated him', irab: 'جَلَسَ: intransitive — أَجْلَسَ: transitive through hamza (أَفْعَلَ pattern)' },
          ],
        },
      ],
      sourceRef: 'An-Nahw al-Kubra, Parts 1-2',
    },
  ],
  relatedTopicIds: ['fail', 'maf-ul-bih', 'verbal-sentence'],
  tags: ['laazim', 'muta\'addi', 'transitive', 'intransitive', 'verb'],
};

export const kanaAndSisters: NahwTopic = {
  id: 'kana-and-sisters',
  titleAr: 'كان وأخواتها',
  titleEn: 'Kana and Its Sisters',
  transliteration: 'Kaana wa Akhawaatuha',
  categoryId: 'operator',
  subcategoryId: 'operator-verbs',
  levels: [
    {
      difficulty: 'beginner',
      summary: 'Kana and its 13 sister verbs enter upon the nominal sentence. They raise the subject (called their "noun" - ism) and put the predicate (called their "khabar") in the accusative case.',
      body: `## Kana and Its Sisters (كان وأخواتها)

These are **deficient verbs** (الأفعال الناقصة) that enter upon a nominal sentence. They:
- Keep the mubtada' in the nominative → called **اسم كان** (ism of kana)
- Change the khabar to accusative → called **خبر كان** (khabar of kana)

### The 13 Verbs

The sisters of kana fall into groups based on meaning:

**Time-based:** كَانَ، أَصْبَحَ، أَضْحَى، أَمْسَى، ظَلَّ، بَاتَ

**Transformation:** صَارَ

**Continuity (must be negated):** مَا بَرِحَ، مَا انْفَكَّ، مَا زَالَ، مَا فَتِئَ

**Duration:** مَا دَامَ

**Negation:** لَيْسَ`,
      rules: [
        {
          arabic: 'كان ترفع الاسم وتنصب الخبر',
          english: 'Kana and its sisters raise their noun (ism) and put their predicate (khabar) in the accusative.',
          examples: [
            { arabic: 'كَانَ الرَّجُلُ مَرِيضًا', translation: 'The man was sick', irab: 'الرَّجُلُ: ism of kana (marfu\') — مَرِيضًا: khabar of kana (mansub)' },
            { arabic: 'أَصْبَحَ الرَّجُلُ بَارِئًا', translation: 'The man became healthy in the morning' },
          ],
        },
      ],
      tables: [
        {
          title: 'Kana and Its Sisters',
          titleAr: 'كان وأخواتها',
          headers: ['#', 'Verb', 'Meaning', 'Example'],
          rows: [
            ['1', 'كَانَ', 'was', 'كَانَ الرَّجُلُ مَرِيضًا'],
            ['2', 'أَصْبَحَ', 'became (morning)', 'أَصْبَحَ الرَّجُلُ بَارِئًا'],
            ['3', 'أَضْحَى', 'became (forenoon)', 'أَضْحَى الرَّجُلُ عَامِلًا'],
            ['4', 'أَمْسَى', 'became (evening)', 'أَمْسَى الرَّجُلُ كَالًّا'],
            ['5', 'ظَلَّ', 'remained', 'ظَلَّ الصَّائِمُ مُسْتَغْفِرًا'],
            ['6', 'بَاتَ', 'spent the night', 'بَاتَ العَابِدُ سَاجِدًا'],
            ['7', 'صَارَ', 'became', 'صَارَ الجَاهِلُ عَالِمًا'],
            ['8', 'مَا بَرِحَ', 'still/kept', 'مَا بَرِحَ الحَاجُّ مُلَبِّيًا'],
            ['9', 'مَا انْفَكَّ', 'still/kept', 'مَا انْفَكَّ المُذْنِبُ رَاجِيًا'],
            ['10', 'مَا زَالَ', 'still/kept', 'مَا زَالَ الحُجَّاجُ وَاقِفِينَ'],
            ['11', 'مَا فَتِئَ', 'still/kept', 'مَا فَتِئَ المُذْنِبُ نَادِمًا'],
            ['12', 'مَا دَامَ', 'as long as', 'أَطْلُبُ العِلْمَ مَا دُمْتُ حَيًّا'],
            ['13', 'لَيْسَ', 'is not', 'لَيْسَ رَبُّنَا ظَالِمًا'],
          ],
        },
      ],
      sourceRef: 'As-Sughra, Section 1, Chapter 1',
    },
    {
      difficulty: 'intermediate',
      summary: 'Kana\'s sisters differ in conjugation flexibility. Some conjugate fully (kana, asbaha, saara), some are used only in the past tense (laysa), and the continuity verbs require a negation particle. The khabar of kana can be a single word, phrase, or sentence.',
      body: `## Intermediate Study of Kana and Its Sisters

### Conjugation Categories

**Fully conjugating (past, present, imperative):**
كَانَ، أَصْبَحَ، أَضْحَى، أَمْسَى، ظَلَّ، بَاتَ، صَارَ، مَا بَرِحَ، مَا انْفَكَّ، مَا زَالَ، مَا فَتِئَ

**Past tense only:** لَيْسَ

**Condition-dependent:** مَا دَامَ (only used in temporal/conditional clauses)

### Continuity Verbs
The four continuity verbs (بَرِحَ، انْفَكَّ، زَالَ، فَتِئَ) **must** be preceded by a negation particle (مَا، لَمْ، لَنْ) or an oath. Without negation, they lose their status as sisters of kana.

### Types of Khabar
The khabar of kana can be:
1. **A single noun/adjective:** كَانَ زَيْدٌ قَائِمًا
2. **A prepositional phrase:** كَانَ الكِتَابُ عَلَى المَكْتَبِ
3. **A sentence:** كَانَ الرَّجُلُ يَقْرَأُ القُرْآنَ`,
      rules: [
        {
          arabic: 'أفعال الاستمرار تحتاج إلى نفي',
          english: 'The continuity verbs (بَرِحَ، انْفَكَّ، زَالَ، فَتِئَ) require negation to function as kana\'s sisters.',
          examples: [
            { arabic: 'مَا زَالَ المُؤْمِنُ صَابِرًا', translation: 'The believer is still patient' },
            { arabic: 'لَنْ يَبْرَحَ الطَّالِبُ مُجْتَهِدًا', translation: 'The student will continue to be diligent' },
          ],
        },
        {
          arabic: 'خبر كان قد يكون جملة',
          english: 'The khabar of kana can be a sentence (verbal or nominal).',
          examples: [
            { arabic: 'كَانَ الرَّجُلُ يَقْرَأُ القُرْآنَ', translation: 'The man was reading the Quran', irab: 'يَقْرَأُ القُرْآنَ: verbal sentence as khabar of kana' },
          ],
        },
      ],
      sourceRef: 'Al-Wusta, Book 1-2',
    },
    {
      difficulty: 'advanced',
      summary: 'Advanced topics include: kana as a complete (taamm) verb meaning "existed", deletion of kana and its noun/khabar, conditions for fronting the khabar before the ism, and the distinction between kana al-naaqisa (deficient) and kana al-taamm (complete).',
      body: `## Advanced Study of Kana and Its Sisters

### Kana as a Complete Verb (كان التامة)
When kana means **"existed"** or **"happened"**, it functions as a complete verb with just a fa'il — no khabar needed:

> كَانَ اللهُ وَلَمْ يَكُنْ شَيْءٌ غَيْرُهُ
> "Allah existed and nothing else existed besides Him."

### Deletion of Kana
Kana itself can be deleted in certain constructions, particularly after إِنْ (conditional):

> الناسُ مَجْزِيُّونَ بِأَعْمَالِهِمْ إِنْ خَيْرًا فَخَيْرٌ
> "People are rewarded for their deeds — if good, then good" (i.e., إِنْ كَانَ خَيْرًا)

### Fronting the Khabar
The khabar of kana can be fronted before the ism:
- **Obligatory** when the khabar is a question word: أَيْنَ كَانَ زَيْدٌ؟
- **Permissible** in most cases: كَانَ مَرِيضًا الرَّجُلُ
- **Prohibited** when there is ambiguity between ism and khabar

### Special Conditions for Each Sister

**ظَلَّ (zalla):** Originally means "remained throughout the day" — extended to general continuity.

**مَا دَامَ:** Used only in the context of ظَرْف (temporal adverb), meaning "as long as." It cannot be used independently.

**لَيْسَ:** Scholars differ on whether it is truly a verb or a particle. The majority consider it a verb that is frozen in the past-tense form with present meaning.`,
      rules: [
        {
          arabic: 'كان التامة تكتفي بالفاعل',
          english: 'When kana means "existed," it is a complete verb needing only a subject (fa\'il), no khabar.',
          examples: [
            { arabic: 'كَانَ اللهُ وَلَمْ يَكُنْ شَيْءٌ غَيْرُهُ', translation: 'Allah existed and nothing else existed besides Him' },
          ],
        },
        {
          arabic: 'يجوز حذف كان بعد إنْ الشرطية',
          english: 'Kana may be deleted after the conditional particle إنْ.',
        },
        {
          arabic: 'تقديم خبر كان على اسمها',
          english: 'The khabar of kana may be fronted before its ism — obligatory when the khabar is an interrogative.',
          examples: [
            { arabic: 'أَيْنَ كَانَ زَيْدٌ؟', translation: 'Where was Zayd?', irab: 'أَيْنَ: fronted khabar of kana' },
          ],
        },
      ],
      sourceRef: 'An-Nahw al-Kubra, Part 2-3',
    },
  ],
  relatedTopicIds: ['inna-and-sisters', 'nominal-sentence', 'mubtada-khabar'],
  tags: ['kana', 'kaana', 'sisters', 'akhawat', 'deficient', 'naaqis', 'laysa'],
};

export const innaAndSisters: NahwTopic = {
  id: 'inna-and-sisters',
  titleAr: 'إن وأخواتها',
  titleEn: 'Inna and Its Sisters',
  transliteration: 'Inna wa Akhawaatuha',
  categoryId: 'operator',
  subcategoryId: 'operator-verbs',
  levels: [
    {
      difficulty: 'beginner',
      summary: 'Inna and its 6 sister particles enter upon the nominal sentence. They put the subject (their "noun") in the accusative and keep the predicate (their "khabar") nominative — the opposite of kana.',
      body: `## Inna and Its Sisters (إن وأخواتها)

These are **particles resembling verbs** (الحروف المشبهة بالفعل). They enter upon the nominal sentence and:
- Put the mubtada' in the accusative → called **اسم إنّ** (ism of inna)
- Keep the khabar nominative → called **خبر إنّ** (khabar of inna)

### The 6 Particles

Each has a distinct meaning:
1. **إِنَّ** — indeed/verily (emphasis)
2. **أَنَّ** — that (content clause)
3. **كَأَنَّ** — as if (simile)
4. **لَكِنَّ** — but/however (contrast)
5. **لَعَلَّ** — perhaps/hopefully (hope)
6. **لَيْتَ** — if only/I wish (wish)`,
      rules: [
        {
          arabic: 'إنّ تنصب الاسم وترفع الخبر',
          english: 'Inna and its sisters put their noun in the accusative and keep their predicate nominative.',
          examples: [
            { arabic: 'إِنَّ اللهَ رَحِيمٌ', translation: 'Indeed Allah is Merciful', irab: 'اللهَ: ism of inna (mansub) — رَحِيمٌ: khabar of inna (marfu\')' },
          ],
        },
      ],
      tables: [
        {
          title: 'Inna and Its Sisters',
          titleAr: 'إنّ وأخواتها',
          headers: ['#', 'Particle', 'Meaning', 'Example', 'Translation'],
          rows: [
            ['1', 'إِنَّ', 'indeed', 'إِنَّ اللهَ رَحِيمٌ', 'Indeed Allah is Merciful'],
            ['2', 'أَنَّ', 'that', 'أَعْلَمُ أَنَّ اللهَ غَفُورٌ', 'I know that Allah is Forgiving'],
            ['3', 'كَأَنَّ', 'as if', 'كَأَنَّ الحَرَامَ نَارٌ', 'As if the forbidden is fire'],
            ['4', 'لَكِنَّ', 'but', 'مَا فَازَ الكَسُولُ لَكِنَّ المُجْتَهِدَ فَائِزٌ', 'The lazy didn\'t succeed but the diligent is successful'],
            ['5', 'لَعَلَّ', 'perhaps', 'لَعَلَّ اللهَ غَافِرٌ ذَنْبِي', 'Perhaps Allah will forgive my sin'],
            ['6', 'لَيْتَ', 'if only', 'لَيْتَ السَّنَةَ رَمَضَانُ', 'If only the year were Ramadan'],
          ],
        },
      ],
      sourceRef: 'As-Sughra, Section 1, Chapter 2',
    },
    {
      difficulty: 'intermediate',
      summary: 'These particles are called "resembling verbs" because they have meaning, govern two nouns, and are built on fatha like past tense verbs. When "ma al-kaaffa" (ما) is attached, they lose their governance and can enter upon verbs.',
      body: `## Intermediate Study of Inna and Its Sisters

### Why "Resembling Verbs"?
They are called الحروف المشبهة بالفعل because they share three features with verbs:
1. They carry meaning (emphasis, wish, etc.)
2. They are built on fatha (إِنَّ، أَنَّ، كَأَنَّ, لَكِنَّ, لَيْتَ, لَعَلَّ)
3. They govern two words (ism and khabar)

### The Kaaffa Maa (ما الكافة)
When مَا is attached to these particles, it **prevents** them from governing:
- إِنَّمَا اللهُ إِلَهٌ وَاحِدٌ — "Indeed, Allah is but one God" (no accusative noun — ما blocked governance)

With ما, they can even enter upon **verbs**:
- إِنَّمَا يَخْشَى اللهَ مِنْ عِبَادِهِ العُلَمَاءُ

### Inna vs. Anna
- **إِنَّ** begins sentences and comes after قَالَ
- **أَنَّ** comes after verbs of knowledge, certainty, and perception
- Rule: if you can replace with أَنَّ + pronoun construction, use أَنَّ; otherwise use إِنَّ`,
      rules: [
        {
          arabic: 'ما الكافة تمنع العمل',
          english: 'When ما is attached to inna\'s sisters, it blocks their governance and they can enter upon verbs.',
          examples: [
            { arabic: 'إِنَّمَا يَخْشَى اللهَ مِنْ عِبَادِهِ العُلَمَاءُ', translation: 'Only the scholars fear Allah among His servants', source: 'Fatir 35:28' },
          ],
        },
      ],
      sourceRef: 'Al-Wusta, Book 2',
    },
    {
      difficulty: 'advanced',
      summary: 'Advanced topics: lightening (takhfif) of inna and anna, conditions for the open/broken hamza distinction, la li-nafy al-jins as the 7th sister, and scholarly debates on the governance mechanism of these particles.',
      body: `## Advanced Study of Inna and Its Sisters

### Lightening (التخفيف)
Three of the particles can be "lightened" by removing the shadda:

**إِنَّ → إِنْ:** When lightened, it mostly loses governance. An obligatory لام الفارقة is added to the khabar:
> إِنْ زَيْدٌ لَقَائِمٌ — "Indeed Zayd is standing"

**أَنَّ → أَنْ:** When lightened, it becomes أَنْ المُخَفَّفَة and usually governs a verb:
> عَلِمْتُ أَنْ سَيَفُوزُ — "I knew that he would win"

**كَأَنَّ → كَأَنْ:** When lightened, its governance becomes weak:
> كَأَنْ ظَبْيَةٌ تَعْطُو — "As if a gazelle stretching"

### La li-Nafy al-Jins (لا لنفي الجنس)
This is sometimes considered the **7th sister** of inna. It negates the entire genus/species:
> لَا إِلَهَ إِلَّا اللهُ — "There is no god but Allah"

**Conditions:** Its ism must be indefinite (نكرة) and directly attached (no separation allowed).

### The Open vs. Broken Hamza
Scholars established rules for when to use إِنَّ (broken/kasra) vs. أَنَّ (open/fatha):
- **إِنَّ** at the beginning of speech, after قَالَ, after لَكِنَّ, after oath
- **أَنَّ** when it and its clause can be replaced by a masdar

### Fronting the Khabar
The khabar of inna can be fronted in certain cases:
- **Permissible** when the khabar is a jar-majrur or dharf: إِنَّ فِي ذَلِكَ لَعِبْرَةً
- **Prohibited** when the khabar is a single noun (unlike kana)`,
      rules: [
        {
          arabic: 'تخفيف إنّ يبطل عملها غالباً',
          english: 'Lightening inna (removing shadda) mostly cancels its governance, and لام الفارقة is added to the khabar.',
          examples: [
            { arabic: 'إِنْ زَيْدٌ لَقَائِمٌ', translation: 'Indeed Zayd is standing', irab: 'إِنْ: lightened inna — لَقَائِمٌ: khabar with lam al-fariqa' },
          ],
        },
        {
          arabic: 'لا لنفي الجنس اسمها نكرة',
          english: 'The ism of la li-nafy al-jins must be indefinite (nakira) and attached directly.',
          examples: [
            { arabic: 'لَا إِلَهَ إِلَّا اللهُ', translation: 'There is no god but Allah' },
            { arabic: 'لَا فَاعِلَ شَرٍّ فَائِزٌ', translation: 'No evildoer is successful' },
          ],
        },
      ],
      sourceRef: 'An-Nahw al-Kubra, Part 4',
    },
  ],
  relatedTopicIds: ['kana-and-sisters', 'nominal-sentence', 'mubtada-khabar'],
  tags: ['inna', 'anna', 'ka\'anna', 'lakinna', 'la\'alla', 'layta', 'sisters', 'akhawat', 'huruf mushabbaha'],
};
