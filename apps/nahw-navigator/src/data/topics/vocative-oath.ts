import type { NahwTopic } from '../types';

export const nida: NahwTopic = {
  id: 'nida',
  titleAr: 'النداء',
  titleEn: 'Vocative (Nida\')',
  transliteration: 'an-Nida\'',
  categoryId: 'joining-sentences',
  subcategoryId: 'vocative-oath',
  levels: [
    {
      difficulty: 'beginner',
      summary: 'The vocative (nida\') is used to address or call someone directly. It consists of a vocative particle (harf al-nida\') like يَا and the person being called (munada). The munada is mansub if it is in a possessive phrase, and has a single damma otherwise.',
      body: `## The Vocative (النداء)

A vocative expression is used to address or call out to someone. It is comprised of two parts:

1. **نِدَاءٌ** — the phrase used to call someone
2. **جَوَابُ النِّدَاءِ** — the sentence after the نِدَاء, conveying information to the addressee

> **يَا زَيْدُ، قُمْ** — *Zaid, stand up.*

Here **يَا زَيْدُ** is the نِدَاء and **قُمْ** is the جَوَابُ النِّدَاء.

### The نِدَاء

The نِدَاء is constructed using:
- **حَرْفُ النِّدَاءِ** — a vocative particle
- **مُنَادَى** — the person being called

The most common حَرْفُ النِّدَاءِ is **يَا**. It is translated as "O" or left untranslated.

### Rules of المُنَادَى

The مُنَادَى can come in two forms:

1. **In a possessive phrase (مُضَاف):** the مُنَادَى will be **مَنْصُوبٌ** (accusative).
   > **يَا عَبْدَ اللهِ** — O servant of Allah

2. **Outside a possessive phrase (non-مُضَاف):** the مُنَادَى will have one **ضَمَّة** (nominative-like ending).
   > **يَا زَيْدُ** — O Zayd

### أَيُّهَا and أَيَّتُهَا

When the مُنَادَى has **ال** (the definite article):
- **أَيُّهَا** is used for masculine: يَا أَيُّهَا الوَلَدُ — O boy
- **أَيَّتُهَا** is used for feminine: يَا أَيَّتُهَا البِنْتُ — O girl

### The Word اللَّهُمَّ

**اللَّهُمَّ** on its own means "O Allah." It does not require a حَرْفُ النِّدَاءِ before it.

### Dropping the حَرْفُ النِّدَاءِ

The vocative particle may be dropped if understood from context:
> **رَبَّنَا** ← **يَا رَبَّنَا** — O Our Lord

### Dropping the ي from the مُنَادَى

If the مُنَادَى is مُضَاف to the possessive pronoun ي, the ي may be dropped. The مُضَاف keeps its كَسْرَة:
> **يَا قَوْمِي** → **يَا قَوْمِ**
> **رَبِّي** → **رَبِّ**`,
      rules: [
        {
          arabic: 'المُنَادَى المُضَاف يكون مَنْصُوبًا',
          english: 'The munada in a possessive phrase (mudaf) is in the accusative case (mansub).',
          examples: [
            { arabic: 'يَا عَبْدَ اللهِ', translation: 'O servant of Allah', irab: 'عَبْدَ: munada mansub because it is mudaf to اللهِ' },
            { arabic: 'يَا رَبَّنَا', translation: 'O Our Lord', irab: 'رَبَّنَا: munada mansub because it is mudaf to نَا' },
          ],
        },
        {
          arabic: 'المُنَادَى غَيْر المُضَاف يُبنى على الضَّم',
          english: 'The munada outside a possessive phrase takes a single damma (built on damm).',
          examples: [
            { arabic: 'يَا زَيْدُ', translation: 'O Zayd', irab: 'زَيْدُ: munada mabni ala al-damm' },
            { arabic: 'يَا أَيُّهَا الوَلَدُ', translation: 'O boy', irab: 'أَيُّهَا: used with masculine nouns that have ال' },
          ],
        },
        {
          arabic: 'اللَّهُمَّ بمعنى يَا اللهُ',
          english: 'The word اللَّهُمَّ means "O Allah" and does not need a vocative particle before it.',
          examples: [
            { arabic: 'اللَّهُمَّ اغْفِرْ لِي', translation: 'O Allah, forgive me', irab: 'اللَّهُمَّ: munada — no harf al-nida\' needed' },
          ],
        },
      ],
      tables: [
        {
          title: 'Types of Munada',
          titleAr: 'أنواع المنادى',
          headers: ['Type', 'I\'rab', 'Example', 'Translation'],
          rows: [
            ['Mudaf (possessive)', 'Mansub', 'يَا عَبْدَ اللهِ', 'O servant of Allah'],
            ['Non-mudaf (proper noun)', 'Mabni ala al-damm', 'يَا زَيْدُ', 'O Zayd'],
            ['With ال (masculine)', 'Uses أَيُّهَا', 'يَا أَيُّهَا الوَلَدُ', 'O boy'],
            ['With ال (feminine)', 'Uses أَيَّتُهَا', 'يَا أَيَّتُهَا البِنْتُ', 'O girl'],
            ['Allah', 'اللَّهُمَّ (no يَا)', 'اللَّهُمَّ', 'O Allah'],
          ],
        },
      ],
      sourceRef: 'FSTU Arabic, Unit 6, pp 561-602',
    },
  ],
  relatedTopicIds: ['qasam', 'shart', 'amr-nahy'],
  tags: ['nida', 'vocative', 'munada', 'ya', 'ayyuha', 'calling', 'address'],
};

export const qasam: NahwTopic = {
  id: 'qasam',
  titleAr: 'القسم',
  titleEn: 'Oath (Qasam)',
  transliteration: 'al-Qasam',
  categoryId: 'joining-sentences',
  subcategoryId: 'vocative-oath',
  levels: [
    {
      difficulty: 'beginner',
      summary: 'An oath (qasam) is brought before a sentence to create emphasis. It consists of the oath itself (using particles وَ, بِ, or تَ) and the response (jawab al-qasam). The jawab uses different emphasis markers depending on whether it is nominal, past, present, or future.',
      body: `## Oaths (القسم)

An oath (**قَسَم**) is brought before a sentence to create emphasis. A sentence with an oath is made up of two parts:

1. **قَسَمٌ** — the oath itself
2. **جَوَابُ القَسَمِ** — the sentence being emphasised

### Structure of the Oath

The قَسَم is made up of:
1. **The verb** (أُقْسِمُ — "I swear") — usually hidden/implied
2. **The thing sworn upon** — becomes the مَفْعُولٌ بِهِ غَيْرُ صَرِيح of the hidden verb

### Oath Particles (حُرُوفُ القَسَم)

The following حُرُوفٌ جَارَّة are used:
- **وَ** — the most common particle: وَالعَصْرِ — *by time*
- **بِ** — بِاللهِ — *by Allah*
- **تَ** — only used with the word Allah; seldom used: تَاللهِ — *by Allah*

### Rules of جَوَابُ القَسَمِ

The جَوَابُ القَسَمِ uses different emphasis markers based on the sentence type and tense.

**Affirmative jawab:**
- Nominal sentence: إِنَّ + لَ (واللهِ إنَّهُ لَصَادِقٌ)
- Past verbal: لَقَدْ (واللهِ لَقَدْ صَدَقَ)
- Present verbal: لَ (واللهِ لَيَصْدُقُ)
- Future verbal: لَ + نون التوكيد (واللهِ لَتَصْدُقَنَّ)

**Negative jawab:**
- Nominal: مَا ... بِ (واللهِ مَا هُوَ بِكَاذِبٍ)
- Past: مَا (واللهِ مَا كَذَبَ)
- Present: مَا (واللهِ مَا يَكْذِبُ)
- Future: لَنْ (واللهِ لَنْ أَكْذِبَ)

### Additional Notes

1. Sometimes the verb of the oath is mentioned explicitly: أُقْسِمُ بِاللهِ
2. The negative particle **لَا** before the oath verb creates **emphasis**, not negation: لَا أُقْسِمُ بِيَوْمِ القِيَامَةِ — *I swear by the Day of Reckoning*
3. **وَاوُ القَسَمِ** vs. **وَاوُ العَطْفِ**: the oath و comes at the start of a sentence and means "by"; the conjunction و comes between words and means "and"`,
      rules: [
        {
          arabic: 'القَسَم يُؤتى به قبل الجملة للتوكيد',
          english: 'An oath is placed before a sentence to create emphasis. It uses one of three particles: وَ (most common), بِ, or تَ.',
          examples: [
            { arabic: 'وَاللهِ إنَّهُ لَصَادِقٌ', translation: 'By Allah, he is indeed truthful', irab: 'وَ: harf qasam (harf jarr) — اللهِ: muqsam bihi majrur — إنَّهُ لَصَادِقٌ: jawab al-qasam' },
            { arabic: 'بِاللهِ لَقَدْ صَدَقَ', translation: 'By Allah, he certainly spoke the truth', irab: 'بِ: harf qasam — لَقَدْ: emphasis markers in jawab' },
            { arabic: 'تَاللهِ لَأَفْعَلَنَّ', translation: 'By Allah, I will surely do it', irab: 'تَ: harf qasam (only used with Allah)' },
          ],
        },
        {
          arabic: 'جَوَابُ القَسَمِ يختلف بحسب نوع الجملة',
          english: 'The jawab al-qasam uses different emphasis markers depending on sentence type (nominal vs verbal) and tense (past, present, future).',
          examples: [
            { arabic: 'واللهِ لَقَدْ صَدَقَ', translation: 'By Allah, he certainly spoke the truth', irab: 'لَقَدْ: emphasis for affirmative past verbal jawab' },
            { arabic: 'واللهِ لَتَصْدُقَنَّ', translation: 'By Allah, you will surely speak the truth', irab: 'لَ + نون التوكيد: emphasis for affirmative future jawab' },
            { arabic: 'واللهِ مَا كَذَبَ', translation: 'By Allah, he did not lie', irab: 'مَا: negation for past verbal jawab' },
          ],
        },
        {
          arabic: 'واو القسم تأتي في أول الجملة وتُترجم بـ by',
          english: 'The waw of oath comes at the start of a sentence and is translated as "by," while the waw of conjunction comes between words and means "and."',
          examples: [
            { arabic: 'واللهِ إنَّهُ صَادِقٌ وَصَالِحٌ', translation: 'By Allah, he is truthful and righteous', irab: 'First وَ: waw al-qasam (oath) — second وَ: waw al-\'atf (conjunction)' },
          ],
        },
      ],
      tables: [
        {
          title: 'Emphasis Markers in Jawab al-Qasam',
          titleAr: 'علامات التوكيد في جواب القسم',
          headers: ['', 'Nominal', 'Past Verbal', 'Present Verbal', 'Future Verbal'],
          rows: [
            ['Affirmative', 'إنَّ ... لَ', 'لَقَدْ', 'لَ', 'لَ ... نَّ'],
            ['Negative', 'مَا ... بِ', 'مَا', 'مَا', 'لَنْ'],
          ],
        },
        {
          title: 'Oath Particles',
          titleAr: 'حروف القسم',
          headers: ['Particle', 'Usage', 'Example', 'Translation'],
          rows: [
            ['وَ', 'Most common', 'وَالعَصْرِ', 'By time'],
            ['بِ', 'General use', 'بِاللهِ', 'By Allah'],
            ['تَ', 'Only with Allah', 'تَاللهِ', 'By Allah'],
          ],
        },
      ],
      sourceRef: 'FSTU Arabic, Unit 6, pp 561-602',
    },
  ],
  relatedTopicIds: ['nida', 'prepositions', 'shart'],
  tags: ['qasam', 'oath', 'swearing', 'wallahi', 'billahi', 'tallahi', 'emphasis', 'jawab'],
};
