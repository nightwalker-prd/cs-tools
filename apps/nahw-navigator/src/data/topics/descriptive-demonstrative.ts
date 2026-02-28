import type { NahwTopic } from '../types';

export const nat: NahwTopic = {
  id: 'na-t',
  titleAr: 'النَّعْت',
  titleEn: 'Descriptive Phrases',
  transliteration: "an-Na't",
  categoryId: 'phrases',
  subcategoryId: 'descriptive-demonstrative',
  levels: [
    {
      difficulty: 'beginner',
      summary:
        'A descriptive phrase (na\'t) pairs a noun with an adjective. The adjective must agree with the noun in definiteness, case, number, and gender (DING). This is distinct from a predicate (khabar), which differs in definiteness.',
      body: `## Descriptive Phrases (النَّعْت)

A descriptive phrase is made up of **an adjective and a noun**.

- The noun being described is called the **مَنْعُوتٌ** (the described).
- The adjective is called the **نَعْتٌ** (the descriptor/adjective).

### Word Order

In English, the adjective precedes the noun (*small house*). In Arabic, the **noun comes first**, followed by the **adjective**:

> **عَبْدٌ مُؤْمِنٌ** -- *a believing servant*

### Agreement in Four Characteristics (DING)

The نَعْتٌ must agree with the مَنْعُوتٌ in four characteristics:

1. **D**efiniteness (معرفة / نكرة)
2. **I**\`rab (case ending)
3. **N**umber (singular, dual, or plural)
4. **G**ender (masculine or feminine)

### Descriptive Phrase in a Sentence

A descriptive phrase can occur as any of the main parts of a sentence (subject, object, predicate, etc.):

> **يُصَلِّي الرَّجُلُ الصَّالِحُ وَقْتًا طَوِيلًا** -- *The pious man prays for a long time.*

- الرَّجُلُ = منعوت, الصَّالِحُ = نعت
- وَقْتًا = منعوت, طَوِيلًا = نعت

### Non-Human Plurals

Plurals of non-human nouns (animals, things) are treated as **singular feminine** for agreement:

> **الأَنْهَارُ كَبِيرَةٌ** -- *The rivers are big.* (Not كَبِيرُونَ)

Sometimes the نَعْتٌ of non-human plurals can also appear in the plural form:

> **آيَاتٌ بَيِّنَاتٌ** -- *clear signs*

### Removing the مَنْعُوت

The مَنْعُوتٌ can be removed, leaving the نَعْتٌ to take its grammatical place:

> **أَعْمَالٌ صَالِحَاتٌ** becomes **صَالِحَاتٌ** -- *righteous deeds*

### Differentiating Between نَعْتٌ and خَبَرٌ

This is a critical distinction:

- **منعوت + نعت** agree in **DING** (all four characteristics)
- **مبتدأ + خبر** agree in only **ING** (three) -- they differ in definiteness

**Key test:** If both words match in definiteness, it is a **phrase** (نعت). If they differ, it is a **sentence** (خبر).`,
      rules: [
        {
          arabic: 'النَّعْتُ يَتْبَعُ المَنْعُوتَ فِي الدِّينْغ',
          english:
            'The adjective (na\'t) must agree with its noun (man\'ut) in Definiteness, I\'rab, Number, and Gender (DING).',
          examples: [
            {
              arabic: 'الْوَلَدُ الصَّادِقُ',
              translation: 'the truthful boy',
              irab: 'Both definite, both marfu\', both singular masculine -- DING agreement = phrase',
            },
            {
              arabic: 'وَلَدٌ صَادِقٌ',
              translation: 'a truthful boy',
              irab: 'Both indefinite, both marfu\', both singular masculine -- DING agreement = phrase',
            },
          ],
        },
        {
          arabic: 'جَمْعُ غَيْرِ الْعُقَلَاءِ يُعَامَلُ مُعَامَلَةَ المُفْرَدِ المُؤَنَّثِ',
          english:
            'Non-human plurals are treated as singular feminine for na\'t agreement.',
          examples: [
            {
              arabic: 'جَاءَتْ أَيَّامٌ مُبَارَكَةٌ',
              translation: 'Blessed days have come.',
              irab: 'أيام is non-human plural; مباركة is singular feminine na\'t',
            },
          ],
        },
        {
          english:
            'If both words match in definiteness (both definite or both indefinite), it is a descriptive phrase. If they differ, it is a subject-predicate sentence.',
          examples: [
            {
              arabic: 'الْوَلَدُ الصَّادِقُ',
              translation: 'the truthful boy (phrase -- both definite)',
            },
            {
              arabic: 'الْوَلَدُ صَادِقٌ',
              translation: 'The boy is truthful. (sentence -- definite + indefinite)',
            },
          ],
        },
        {
          english:
            'The مَفْعُول مُطْلَق often has its مَنْعُوت removed, leaving the نَعْت alone to describe the verb.',
          examples: [
            {
              arabic: 'يَذْكُرُ الْمُسْلِمُونَ اللهَ كَثِيرًا',
              translation: 'Muslims remember Allah abundantly.',
              irab: 'كثيرًا is a na\'t whose man\'ut (ذِكْرًا) has been removed',
            },
          ],
        },
      ],
      tables: [
        {
          title: 'Agreement of Na\'t with Different Noun Types',
          titleAr: 'مُطَابَقَةُ النَّعْتِ',
          headers: ['Noun Type', 'Na\'t Agreement', 'Example'],
          rows: [
            ['Human Plurals', 'Agree in DING (all four)', 'الرِّجَالُ الصَّالِحُونَ'],
            ['Non-Human Plurals', 'Agree in DI, singular feminine', 'الأَنْهَارُ كَبِيرَةٌ'],
            ['Broken Plurals (Human)', 'Can be singular feminine or masculine', 'جَاءَ/جَاءَتِ الرِّجَالُ'],
          ],
        },
        {
          title: 'Na\'t vs Khabar',
          titleAr: 'الفَرْقُ بَيْنَ النَّعْتِ وَالخَبَرِ',
          headers: ['Structure', 'Agreement', 'Example', 'Translation'],
          rows: [
            ['منعوت + نعت (Phrase)', 'DING (all 4)', 'الْوَلَدُ الصَّادِقُ', 'the truthful boy'],
            ['مبتدأ + خبر (Sentence)', 'ING (3 only)', 'الْوَلَدُ صَادِقٌ', 'The boy is truthful.'],
          ],
        },
        {
          title: 'Maf\'ul Mutlaq Recap',
          titleAr: 'المَفْعُولُ المُطْلَقُ',
          headers: ['Type', 'Function', 'Example'],
          rows: [
            ['Masdar with na\'t', 'Description of verb', 'شَكَرَ الرَّجُلُ شُكْرًا كَثِيرًا'],
            ['Masdar on its own', 'Emphasis', 'شَكَرَ الرَّجُلُ شُكْرًا'],
            ['Na\'t alone (masdar removed)', 'Description of verb', 'شَكَرَ الرَّجُلُ كَثِيرًا'],
          ],
        },
      ],
      sourceRef: 'FSTU Arabic, Unit 3, pp. 135-154',
    },
  ],
  relatedTopicIds: ['demonstrative-phrases', 'mudaf-ilayhi', 'badal', 'atf'],
  tags: ['na\'t', 'man\'ut', 'adjective', 'descriptive', 'DING', 'agreement', 'phrase', 'non-human plural'],
};

export const demonstrativePhrases: NahwTopic = {
  id: 'demonstrative-phrases',
  titleAr: 'اسْمُ الإِشَارَة',
  titleEn: 'Demonstrative Phrases',
  transliteration: 'Ism al-Ishara',
  categoryId: 'phrases',
  subcategoryId: 'descriptive-demonstrative',
  levels: [
    {
      difficulty: 'beginner',
      summary:
        'A demonstrative phrase pairs a demonstrative pronoun (this, that) with a definite noun. Arabic has twelve demonstrative pronouns -- six for near and six for far. The pointed-to noun must have al- and agree with the pronoun in DING.',
      body: `## Demonstrative Phrases (اسْمُ الإِشَارَة)

A demonstrative phrase is made up of a **demonstrative pronoun** followed by a **noun**.

- The demonstrative pronoun is called **اسْمُ الإِشَارَة** (pointing word).
- The thing being pointed at is called **مُشَارٌ إِلَيْهِ** (the pointed-to).

### The Twelve Demonstrative Pronouns

There are twelve demonstrative pronouns -- six for near and six for far.

**Masculine:**
- Singular: **هٰذَا** (this) / **ذٰلِكَ** (that)
- Dual: **هٰذَانِ** (these two) / **ذَانِكَ** (those two)
- Plural: **هٰؤُلَاءِ** (these) / **أُولٰئِكَ** (those)

**Feminine:**
- Singular: **هٰذِهِ** (this) / **تِلْكَ** (that)
- Dual: **هَاتَانِ** (these two) / **تَانِكَ** (those two)
- Plural: **هٰؤُلَاءِ** (these) / **أُولٰئِكَ** (those)

The plural forms are shared between masculine and feminine.

### Rules of the Demonstrative Pronoun

1. Demonstrative pronouns are **معرفة** (definite) by nature -- they do not need ال.
2. They are **مبني** (indeclinable) -- except the dual forms which change like normal duals (هٰذَانِ becomes هٰذَيْنِ in nasb/jarr).
3. The demonstrative pronoun comes **before** the noun.

### Rules of the مُشَارٌ إِلَيْهِ

1. The مشار إليه must **always have ال**. A proper name cannot be the مشار إليه.
2. The demonstrative and its noun must **agree in DING**.
3. If the مشار إليه is a **non-human plural**, the demonstrative will be **singular feminine**: **هٰذِهِ الأَبْوَابُ** -- *these doors*.

### Demonstrative Phrase in a Sentence

A demonstrative phrase can occur as any main part of a sentence:

> **يُصَلِّي ذٰلِكَ الرَّجُلُ لَيْلًا** -- *That man prays at night.*

### Broken Human Plurals with Demonstratives

When the مشار إليه is a **broken plural of human nouns**, the demonstrative can be either **singular feminine** or **plural**:

> **هٰذِهِ الرِّجَالُ** or **هٰؤُلَاءِ الرِّجَالُ** -- *these men*

### Differentiating مُشَارٌ إِلَيْهِ and خَبَر

The key test is **ال**:
- If the word after the demonstrative has **ال**, it is مشار إليه (demonstrative phrase).
- If it does **not** have **ال**, it is خبر (predicate of a sentence).`,
      rules: [
        {
          arabic: 'المُشَارُ إِلَيْهِ يَجِبُ أَنْ يَكُونَ مَعْرِفَةً بِأَلْ',
          english:
            'The pointed-to noun (mushaar ilayhi) must always have al- (the definite article).',
          examples: [
            {
              arabic: 'هٰذَا الْقُرْآنُ',
              translation: 'this Quran',
              irab: 'هذا = ism al-ishara, القرآن = mushaar ilayhi (has al-)',
            },
          ],
        },
        {
          arabic: 'أَسْمَاءُ الإِشَارَةِ مَبْنِيَّةٌ إِلَّا المُثَنَّى',
          english:
            'Demonstrative pronouns are indeclinable (mabni) except the dual forms, which change like normal duals.',
          examples: [
            {
              arabic: 'هٰذَانِ / هٰذَيْنِ',
              translation: 'these two (nominative / accusative-genitive)',
              irab: 'Dual demonstrative changes: -aani in raf\', -ayni in nasb/jarr',
            },
          ],
        },
        {
          english:
            'If the word after the demonstrative has al-, it is a demonstrative phrase. If it lacks al-, it is a sentence (mubtada + khabar).',
          examples: [
            {
              arabic: 'هٰذَا الْوَلَدُ',
              translation: 'this boy (phrase)',
            },
            {
              arabic: 'هٰذَا وَلَدٌ',
              translation: 'This is a boy. (sentence)',
            },
            {
              arabic: 'هٰذَا زَيْدٌ',
              translation: 'This is Zaid. (sentence -- proper noun without al-)',
            },
          ],
        },
        {
          english:
            'For non-human plurals, the demonstrative is singular feminine.',
          examples: [
            {
              arabic: 'هٰذِهِ الأَبْوَابُ',
              translation: 'these doors',
              irab: 'أبواب is non-human plural; هذه is singular feminine demonstrative',
            },
          ],
        },
      ],
      tables: [
        {
          title: 'Masculine Demonstrative Pronouns',
          titleAr: 'أَسْمَاءُ الإِشَارَةِ لِلمُذَكَّرِ',
          headers: ['Number', 'Near (this/these)', 'Far (that/those)'],
          rows: [
            ['Singular', 'هٰذَا', 'ذٰلِكَ'],
            ['Dual', 'هٰذَانِ', 'ذَانِكَ'],
            ['Plural', 'هٰؤُلَاءِ', 'أُولٰئِكَ'],
          ],
        },
        {
          title: 'Feminine Demonstrative Pronouns',
          titleAr: 'أَسْمَاءُ الإِشَارَةِ لِلمُؤَنَّثِ',
          headers: ['Number', 'Near (this/these)', 'Far (that/those)'],
          rows: [
            ['Singular', 'هٰذِهِ', 'تِلْكَ'],
            ['Dual', 'هَاتَانِ', 'تَانِكَ'],
            ['Plural', 'هٰؤُلَاءِ', 'أُولٰئِكَ'],
          ],
        },
        {
          title: 'Mushaar Ilayhi vs Khabar',
          titleAr: 'المُشَارُ إِلَيْهِ أَوِ الخَبَر',
          headers: ['Example', 'Structure', 'Translation'],
          rows: [
            ['هٰذَا الْوَلَدُ', 'Demonstrative phrase', 'this boy'],
            ['هٰذَا وَلَدٌ', 'Sentence (mubtada + khabar)', 'This is a boy.'],
            ['هٰذَا زَيْدٌ', 'Sentence (mubtada + khabar)', 'This is Zaid.'],
          ],
        },
      ],
      sourceRef: 'FSTU Arabic, Unit 3, pp. 135-154',
    },
  ],
  relatedTopicIds: ['na-t', 'mudaf-ilayhi', 'badal'],
  tags: ['demonstrative', 'ism al-ishara', 'mushaar ilayhi', 'this', 'that', 'DING', 'phrase'],
};
