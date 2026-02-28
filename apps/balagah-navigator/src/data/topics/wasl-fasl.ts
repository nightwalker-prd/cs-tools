import type { BalagahTopic } from '../types';

export const waslFasl: BalagahTopic = {
  id: 'wasl-fasl',
  titleAr: 'الوَصْلُ وَالفَصْلُ',
  titleEn: 'Joining & Separating Sentences',
  transliteration: 'al-Wasl wal-Fasl',
  unitId: 'maani',
  partId: 'maani-wasl-fasl',
  content: {
    summary:
      "Joining (wasl) connects sentences with waw al-'atf, while separating (fasl) juxtaposes them without a conjunction. Fasl occurs in two situations: complete connection (kamal al-ittisal — badal, bayan, tawkid) and near-complete connection (shibh kamal al-ittisal — answering an implied question).",
    body: `## Joining & Separating (الوَصْلُ وَالفَصْلُ)

One of the most important topics in Balagah is knowing when to **join** sentences with a conjunction and when to **separate** them without one.

### الوَصْلُ (Wasl — Joining)

Joining two sentences together using **وَاوُ الْعَطْفِ** (the conjunction waw) or another حَرْفُ عَطْفٍ. Used when the two sentences share a common context or purpose.

### الفَصْلُ (Fasl — Separating)

Joining two sentences **without** having the وَاوُ of حَرْفُ عَطْفٍ or any other حَرْفُ عَطْفٍ.

---

## Places of فَصْلٌ

Two sentences will be joined without a حَرْفُ عَطْفٍ in two situations:

### 1. كَمَالُ الاِتِّصَالِ — Complete Connection

The second sentence is a تَابِعٌ (follower) to the first — so closely connected that a conjunction would weaken the relationship.

#### بَدَلٌ — Substitution

The second sentence substitutes / elaborates on the first.

<div dir="rtl" class="font-arabic">﴿وَاتَّقُوا الَّذِيْ أَمَدَّكُمْ بِمَا تَعْلَمُوْنَ ۞ أَمَدَّكُمْ بِأَنْعَامٍ وَبَنِيْنَ ۞ وَجَنّٰتٍ وَعُيُوْنٍ﴾</div>

*And fear the One who has supported you with what you know. **He has supported you with cattle and sons, and with gardens and springs**.* — The second sentence is a بَدَلٌ (substitution) that details what was mentioned generally.

#### بَيَانٌ — Clarification

The second sentence explains or clarifies the first.

<div dir="rtl" class="font-arabic">﴿فَوَسْوَسَ إِلَيْهِ الشَّيْطٰنُ قَالَ يَآاٰدَمُ هَلْ أَدُلُّكَ عَلَىٰ شَجَرَةِ الْخُلْدِ وَمُلْكٍ لَّا يَبْلَىٰ﴾</div>

*Then Satan instigated him. **He said, "Adam, shall I guide you to the tree of eternity?"*** — The second sentence clarifies what the whispering was.

#### تَوْكِيْدٌ — Emphasis

The second sentence reinforces and emphasizes the first.

<div dir="rtl" class="font-arabic">﴿مَا هٰذَا بَشَرًا إِنْ هٰذَآ إِلَّا مَلَكٌ كَرِيْمٌ﴾</div>

*He is no human being. **He is but a noble angel**.* — The second sentence emphasizes the denial of being human.

### 2. شِبْهُ كَمَالِ الاِتِّصَالِ — Near-Complete Connection

The second sentence answers a **query which may arise** from the first.

<div dir="rtl" class="font-arabic">﴿وَمَآ أُبَرِّئُ نَفْسِيْ إِنَّ النَّفْسَ لَأَمَّارَةٌ بِالسُّوْءِ إِلَّا مَا رَحِمَ رَبِّيْ﴾</div>

*And I do not absolve my inner self of blame. **Surely, man's inner self often incites to evil**.* — After the first sentence, a question could be posed: "Why do you not absolve your inner self?" The second sentence answers it.

---

## Places of وَصْلٌ

Apart from the cases of فَصْلٌ above, وَصْلٌ takes place — sentences that share context and are neither subordinate to each other are joined with وَاوُ الْعَطْفِ.

<div dir="rtl" class="font-arabic">﴿إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِيْنُ﴾</div>

*You alone do we worship, **and** from You alone do we seek help.* — Two parallel sentences sharing the same context, joined by وَ.`,
    rules: [
      {
        arabic: 'كَمَالُ الاِتِّصَالِ',
        english:
          'Use fasl when the second sentence is a follower (tabi\') of the first: badal (substitution), bayan (clarification), or tawkid (emphasis).',
        examples: [
          {
            arabic:
              '﴿أَمَدَّكُمْ بِمَا تَعْلَمُوْنَ ۞ أَمَدَّكُمْ بِأَنْعَامٍ وَبَنِيْنَ﴾',
            translation:
              'He has supported you with what you know. He has supported you with cattle and sons.',
            source: 'Quran 26:132-133',
            analysis:
              'بَدَلٌ — the second sentence details what was mentioned generally in the first.',
          },
          {
            arabic:
              '﴿فَوَسْوَسَ إِلَيْهِ الشَّيْطٰنُ قَالَ يَآاٰدَمُ هَلْ أَدُلُّكَ عَلَىٰ شَجَرَةِ الْخُلْدِ﴾',
            translation:
              'Then Satan instigated him. He said, "Adam, shall I guide you to the tree of eternity?"',
            source: 'Quran 20:120',
            analysis:
              'بَيَانٌ — the second sentence clarifies what the whispering was.',
          },
          {
            arabic: '﴿مَا هٰذَا بَشَرًا إِنْ هٰذَآ إِلَّا مَلَكٌ كَرِيْمٌ﴾',
            translation: 'He is no human being. He is but a noble angel.',
            source: 'Quran 12:31',
            analysis:
              'تَوْكِيْدٌ — the second sentence emphasizes the first.',
          },
        ],
      },
      {
        arabic: 'شِبْهُ كَمَالِ الاِتِّصَالِ',
        english:
          'Use fasl when the second sentence answers an implied question raised by the first.',
        examples: [
          {
            arabic:
              '﴿وَمَآ أُبَرِّئُ نَفْسِيْ إِنَّ النَّفْسَ لَأَمَّارَةٌ بِالسُّوْءِ﴾',
            translation:
              "I do not absolve my inner self. Surely, man's inner self often incites to evil.",
            source: 'Quran 12:53',
            analysis:
              'شِبْهُ كَمَالِ الاِتِّصَالِ — the second answers "Why don\'t you absolve yourself?"',
          },
        ],
      },
      {
        english:
          'Use wasl (with conjunction) when two sentences share context and neither is subordinate to the other.',
        examples: [
          {
            arabic: '﴿إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِيْنُ﴾',
            translation:
              'You alone do we worship, and from You alone do we seek help.',
            source: 'Quran 1:5',
            analysis:
              'وَصْلٌ — two parallel sentences sharing context, joined by وَ.',
          },
          {
            arabic:
              '﴿إِنَّ الْأَبْرَارَ لَفِي نَعِيمٍ وَإِنَّ الْفُجَّارَ لَفِي جَحِيمٍ﴾',
            translation:
              'Indeed, the righteous will be in pleasure, and indeed, the wicked will be in Hellfire.',
            source: 'Quran 82:13-14',
            analysis:
              'وَصْلٌ — parallel sentences contrasting two groups, joined by وَ.',
          },
        ],
      },
    ],
    examples: [
      {
        arabic:
          '﴿أَمَدَّكُمْ بِمَا تَعْلَمُوْنَ ۞ أَمَدَّكُمْ بِأَنْعَامٍ وَبَنِيْنَ﴾',
        translation:
          'He supported you with what you know. He supported you with cattle and sons.',
        source: 'Quran 26:132-133',
        analysis: 'فَصْلٌ — كَمَالُ الاِتِّصَالِ (بَدَلٌ).',
      },
      {
        arabic: '﴿مَا هٰذَا بَشَرًا إِنْ هٰذَآ إِلَّا مَلَكٌ كَرِيْمٌ﴾',
        translation: 'He is no human being. He is but a noble angel.',
        source: 'Quran 12:31',
        analysis: 'فَصْلٌ — كَمَالُ الاِتِّصَالِ (تَوْكِيْدٌ).',
      },
      {
        arabic:
          '﴿وَمَآ أُبَرِّئُ نَفْسِيْ إِنَّ النَّفْسَ لَأَمَّارَةٌ بِالسُّوْءِ﴾',
        translation:
          "I do not absolve my inner self. Surely, man's inner self often incites to evil.",
        source: 'Quran 12:53',
        analysis: 'فَصْلٌ — شِبْهُ كَمَالِ الاِتِّصَالِ (answering implied question).',
      },
      {
        arabic: '﴿إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِيْنُ﴾',
        translation:
          'You alone do we worship, and from You alone do we seek help.',
        source: 'Quran 1:5',
        analysis: 'وَصْلٌ — parallel sentences sharing context.',
      },
    ],
    tables: [
      {
        title: 'Places of Fasl',
        titleAr: 'مَوَاضِعُ الفَصْلِ',
        headers: ['Situation', 'Arabic', 'Subtypes'],
        rows: [
          [
            'Complete Connection',
            'كَمَالُ الاِتِّصَالِ',
            'بَدَلٌ (substitution), بَيَانٌ (clarification), تَوْكِيْدٌ (emphasis)',
          ],
          [
            'Near-Complete Connection',
            'شِبْهُ كَمَالِ الاِتِّصَالِ',
            'Second sentence answers an implied question',
          ],
        ],
      },
    ],
    sourceRef: 'First Steps to Understanding Balagah, Hashim Mohamed',
  },
  relatedTopicIds: ['sentence-order', 'musawah'],
  tags: [
    'wasl',
    'fasl',
    'joining',
    'separating',
    'waw',
    'atf',
    'conjunction',
    'kamal ittisal',
    'badal',
    'bayan',
    'tawkid',
  ],
};
