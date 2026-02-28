import type { NahwTopic } from '../types';

export const atf: NahwTopic = {
  id: 'atf',
  titleAr: 'حَرْفُ العَطْف',
  titleEn: 'Conjunctive Phrases',
  transliteration: "Harf al-'Atf",
  categoryId: 'phrases',
  subcategoryId: 'conjunctive-appositive',
  levels: [
    {
      difficulty: 'beginner',
      summary:
        'A conjunctive phrase joins two or more words with a conjunction particle. Arabic has nine conjunctions: wa, fa, thumma, aw, imma, la, wa-la, bal, and lakin. The conjoined word must match the first in grammatical case (i\'rab).',
      body: `## Conjunctive Phrases (حَرْفُ العَطْف)

A conjunctive phrase comprises **two or more words joined with a conjunction**.

### Terminology

- **حَرْفُ عَطْف** -- the conjunction particle itself (and, or, then)
- **مَعْطُوفٌ عَلَيْهِ** -- the word **before** the conjunction
- **مَعْطُوفٌ** -- the word **after** the conjunction

### Core Rule: Agreement in I\`rab

The مَعْطُوفٌ (second word) must have the **same case ending** as the مَعْطُوفٌ عَلَيْهِ (first word).

> **مُحَمَّدٌ وَأَحْمَدُ** -- *Muhammad and Ahmad* (both marfu\`)

### The Nine Conjunctions

Arabic has nine conjunction particles, each with its own nuance of meaning. Some join affirmative elements, others introduce negation.

**Affirmative conjunctions:**
1. **وَ** (and) -- basic conjunction
2. **فَ** (then) -- immediate sequence
3. **ثُمَّ** (then) -- delayed sequence
4. **أَوْ** (or) -- alternative
5. **إِمَّا ... وَإِمَّا** (either ... or) -- similar to aw

**Negative/corrective conjunctions:**
6. **لَا** (not) -- negates the second element in an affirmative sentence
7. **وَلَا** (nor) -- negates the second element in a negative sentence
8. **بَلْ** (rather) -- affirms the second in a negative sentence
9. **لٰكِنْ** (rather/but) -- same function as bal

### Multiple معطوف

A single phrase may have multiple conjoined words. In Arabic, each is preceded by وَ. In English, only the last gets "and":

> **جَاءَ زَيْدٌ وَخَالِدٌ وَأَحْمَدُ** -- *Zaid, Khalid, and Ahmad came.*

### Separated and Intertwined مَعْطُوف

Ma\`tuf pairs can be arranged in two ways:

**Separated (مُفْتَرِقَة):** Each ma\`tuf pair is listed separately:
> **جَاءَ زَيْدٌ وَخَالِدٌ وَعَمْرٌو وَبَكْرٌ** -- *Zaid and Khalid, and Amr and Bakr came.*

**Intertwined (مُتَدَاخِلَة):** Ma\`tuf elements are mixed together:
> **جَاءَ زَيْدٌ وَعَمْرٌو وَخَالِدٌ وَبَكْرٌ** -- *Zaid and Amr, and Khalid and Bakr came.*

### مَفْعُول مَعَهُ (Accompaniment Object)

When وَ indicates accompaniment rather than conjunction, the word after it is called **مفعول معه** and is always **منصوب**:

> **جَاءَ زَيْدٌ وَخَالِدًا** -- *Zaid came with Khalid.* (simultaneously)

Compare with conjunction: **جَاءَ زَيْدٌ وَخَالِدٌ** -- *Zaid and Khalid came.* (not necessarily simultaneous)

### Conjunction Between Sentences

A حرف عطف can join **two complete sentences**:

> **جَاءَ زَيْدٌ وَذَهَبَ عَمْرُو** -- *Zaid came and Amr went.*

### خَبَر ثَانٍ and نَعْت ثَانٍ

A subject can have two predicates without a conjunction (خبر ثان), and a noun can have two adjectives without a conjunction (نعت ثان):

> **﴿إِنَّ اللهَ لَعَلِيمٌ حَلِيمٌ﴾** -- *Indeed, Allah is All-Knowing and Forbearing.* (عليم = خبر, حليم = خبر ثان)`,
      rules: [
        {
          arabic: 'المَعْطُوفُ يَتْبَعُ المَعْطُوفَ عَلَيْهِ فِي الإعْرَابِ',
          english:
            'The conjoined word (ma\'tuf) must agree in grammatical case with the word before the conjunction (ma\'tuf \'alayhi).',
          examples: [
            {
              arabic: 'سَافَرَ خَالِدٌ وَحَامِدٌ',
              translation: 'Khalid and Hamid travelled.',
              irab: 'Both are marfu\' (nominative) as fa\'il',
            },
          ],
        },
        {
          arabic: 'وَ لِلجَمْعِ، فَ لِلتَّرْتِيبِ بِلَا مُهْلَةٍ، ثُمَّ لِلتَّرْتِيبِ بِمُهْلَةٍ',
          english:
            'Wa (and) is for basic joining; fa (then) for immediate sequence; thumma (then) for delayed sequence.',
          examples: [
            { arabic: 'جَاءَ زَيْدٌ وَخَالِدٌ', translation: 'Zaid and Khalid came.' },
            { arabic: 'جَاءَ زَيْدٌ فَخَالِدٌ', translation: 'Zaid came, then Khalid (immediately).' },
            { arabic: 'جَاءَ زَيْدٌ ثُمَّ خَالِدٌ', translation: 'Zaid came, then Khalid (after a delay).' },
          ],
        },
        {
          english:
            'La (not) negates the second element in an affirmative sentence. Wa-la (nor) negates it in a negative sentence. Bal and lakin (rather) affirm the second element in a negative sentence.',
          examples: [
            { arabic: 'جَاءَ زَيْدٌ لَا خَالِدٌ', translation: 'Zaid came, not Khalid.' },
            { arabic: 'مَا جَاءَ زَيْدٌ وَلَا خَالِدٌ', translation: 'Neither Zaid nor Khalid came.' },
            { arabic: 'مَا جَاءَ زَيْدٌ بَلْ خَالِدٌ', translation: 'Zaid did not come, rather Khalid (came).' },
            { arabic: 'مَا جَاءَ زَيْدٌ لٰكِنْ خَالِدٌ', translation: 'Zaid did not come, rather Khalid (came).' },
          ],
        },
        {
          english:
            'The مَفْعُول مَعَه (accompaniment object) is always mansub and implies simultaneous action, unlike a regular ma\'tuf which can be in any case.',
          examples: [
            {
              arabic: 'جَاءَ زَيْدٌ وَخَالِدًا',
              translation: 'Zaid came with Khalid. (simultaneously, khalidan is mansub)',
            },
            {
              arabic: 'جَاءَ زَيْدٌ وَخَالِدٌ',
              translation: 'Zaid and Khalid came. (conjunction, khalidun is marfu\')',
            },
          ],
        },
      ],
      tables: [
        {
          title: 'Summary of Arabic Conjunctions',
          titleAr: 'حُرُوفُ العَطْفِ',
          headers: ['Conjunction', 'Ma\'tuf \'Alayhi', 'Ma\'tuf', 'Translation'],
          rows: [
            ['وَ', 'Affirmative', 'Affirmative', 'and'],
            ['فَ', 'Affirmative', 'Affirmative', 'then (immediate)'],
            ['ثُمَّ', 'Affirmative', 'Affirmative', 'then (delayed)'],
            ['أَوْ', 'Affirmative', 'Affirmative', 'or'],
            ['إِمَّا … وَإِمَّا', 'Affirmative', 'Affirmative', 'either … or'],
            ['لَا', 'Affirmative', 'Negative', 'not'],
            ['وَلَا', 'Negative', 'Negative', 'nor'],
            ['لَا … وَلَا', 'Negative', 'Negative', 'neither … nor'],
            ['بَلْ', 'Negative', 'Affirmative', 'rather, but'],
            ['لٰكِنْ', 'Negative', 'Affirmative', 'rather, but'],
          ],
        },
      ],
      sourceRef: 'FSTU Arabic, Unit 3, pp. 155-174',
    },
  ],
  relatedTopicIds: ['na-t', 'badal', 'demonstrative-phrases', 'mudaf-ilayhi'],
  tags: ['conjunction', 'atf', 'wa', 'fa', 'thumma', 'aw', 'bal', 'lakin', 'ma\'tuf', 'phrase', 'maf\'ul ma\'ahu'],
};

export const badal: NahwTopic = {
  id: 'badal',
  titleAr: 'البَدَل',
  titleEn: 'Appositive Phrases',
  transliteration: 'al-Badal',
  categoryId: 'phrases',
  subcategoryId: 'conjunctive-appositive',
  levels: [
    {
      difficulty: 'beginner',
      summary:
        'An appositive phrase (badal) consists of two nouns where the second explains or identifies the first. They agree in i\'rab (case) only -- not in definiteness, number, or gender. It is commonly used with names and titles.',
      body: `## Appositive Phrases (البَدَل)

An appositive phrase is made up of two nouns, where the second explains or gives more information about the first.

- The first word (being explained) is called **مُبْدَل مِنْهُ**
- The second word (the explanation) is called **بَدَل**

> *Your brother, Ahmad, is very clever.*

### Rules of Appositive Phrases

1. **Case agreement:** The بَدَل will have the same إعراب as the مُبْدَل مِنْهُ.
2. **Punctuation:** The appositive phrase is usually punctuated with a comma.
3. **Position:** An appositive phrase can occur as any of the main parts of a sentence.

> **أَرْسَلَ اللهُ النَّبِيَّ مُحَمَّدًا ﷺ** -- *Allah sent the Prophet, Muhammad.*

### Identifying Phrase Types

To determine the type of phrase:
- Contains a **حَرْفُ عَطْف** -- Conjunctive Phrase
- First word is an **اسْمُ الإِشَارَة** -- Demonstrative Phrase
- Second word is an **adjective** -- Descriptive Phrase
- Second word is a **noun** -- Appositive Phrase

### Appositive with Names (اِبْن)

Appositive phrases are commonly used with Arabic names:

> **مُحَمَّدُ بْنُ عَبْدِ اللهِ** -- *Muhammad, son of Abdullah*

When the name after اِبْن is the father, the alif at the beginning of اِبْن is dropped (بْنُ). When it is someone other than the father, the alif is retained (ابْنَ):

> **عِيسَى ابْنَ مَرْيَمَ** -- *Isa, son of Maryam* (not the father, alif retained)

### اِبْن for Age and Attribution

اِبْن / بِنْت can also express age or attribution (not parentage):

**Age:** > **كَانَ مُحَمَّدٌ ﷺ ابْنَ أَرْبَعِينَ سَنَةً** -- *Muhammad was forty years old.*

**Attribution:** > **زَيْدٌ ابْنُ المَدِينَةِ** -- *Zaid is a native of Madinah.*

### Agreement Comparison

Unlike descriptive and demonstrative phrases which agree in DING (all four characteristics), both conjunctive and appositive phrases agree only in **i\`rab** (case ending).`,
      rules: [
        {
          arabic: 'البَدَلُ يَتْبَعُ المُبْدَلَ مِنْهُ فِي الإعْرَابِ فَقَطْ',
          english:
            'The badal agrees with the mubdal minhu in i\'rab (case) only -- not in definiteness, number, or gender.',
          examples: [
            {
              arabic: 'أَرْسَلَ اللهُ النَّبِيَّ مُحَمَّدًا ﷺ',
              translation: 'Allah sent the Prophet, Muhammad.',
              irab: 'النبي = mubdal minhu (mansub), محمدا = badal (mansub)',
            },
          ],
        },
        {
          english:
            'When ibn follows a name and refers to the father, the alif is dropped. When it refers to someone else, the alif is retained.',
          examples: [
            {
              arabic: 'مُحَمَّدُ بْنُ عَبْدِ اللهِ ﷺ',
              translation: 'Muhammad, son of Abdullah (father -- alif dropped)',
            },
            {
              arabic: 'عِيسَى ابْنَ مَرْيَمَ عليه السلام',
              translation: 'Isa, son of Maryam (not father -- alif retained)',
            },
          ],
        },
      ],
      tables: [
        {
          title: 'All Four Phrase Types Compared',
          titleAr: 'مُقَارَنَةُ التَّرَاكِيبِ',
          headers: ['Phrase Type', 'Components', 'Agreement'],
          rows: [
            ['Descriptive (نعت)', 'Noun + Adjective', 'Agree in DING'],
            ['Demonstrative (إشارة)', 'Demonstrative + Noun', 'Agree in DING'],
            ['Conjunctive (عطف)', 'Noun + Conjunction + Noun', 'Agree only in I\'rab'],
            ['Appositive (بدل)', 'Noun + Noun', 'Agree only in I\'rab'],
          ],
        },
      ],
      sourceRef: 'FSTU Arabic, Unit 3, pp. 155-194',
    },
  ],
  relatedTopicIds: ['na-t', 'atf', 'demonstrative-phrases', 'mudaf-ilayhi'],
  tags: ['badal', 'appositive', 'mubdal minhu', 'ibn', 'phrase', 'agreement'],
};
