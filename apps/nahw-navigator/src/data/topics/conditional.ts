import type { NahwTopic } from '../types';

export const shart: NahwTopic = {
  id: 'shart',
  titleAr: 'الشرط',
  titleEn: 'Conditional Sentences (Shart)',
  transliteration: 'ash-Shart',
  categoryId: 'joining-sentences',
  subcategoryId: 'conditional',
  levels: [
    {
      difficulty: 'beginner',
      summary: 'Conditional sentences consist of a conditional conjunction (adaat al-shart), a condition clause (shart), and a result clause (jawab al-shart). There are 9 noun conjunctions (man, ma, ayna, etc.) and 3 particle conjunctions (in, law, lawla). The noun conjunctions and إِنْ cause the mudari\' verb to be majzum in both clauses.',
      body: `## Conditional Sentences (الشرط)

A conditional sentence is comprised of three parts:

1. **أَدَاةُ الشَّرْطِ** — the conditional conjunction (if, when, whoever, etc.)
2. **شَرْطٌ** — the condition clause
3. **جَوَابُ الشَّرْطِ** — the result clause

### Conditional Conjunctions

There are two types of conditional conjunctions:

#### A. اسْمُ الشَّرْطِ (Noun Conditional Conjunctions)

There are nine أَسْمَاءُ الشَّرْطِ. These nouns also function as أَسْمَاءُ الاسْتِفْهَام (interrogative nouns). They are **عَامِلٌ**: they render the مُضَارِع in both the condition and result to be مَجْزُومٌ.

#### B. حَرْفُ الشَّرْطِ (Particle Conditional Conjunctions)

There are three حُرُوفُ الشَّرْطِ:
- **إِنْ** (if) — عَامِلٌ: causes jazm in both clauses
- **لَوْ** (if — unreal) — غَيْرُ عَامِلٍ
- **لَوْلَا** (if not) — غَيْرُ عَامِلٍ

### Types of Conditional Sentences

#### Real Conditionals
Conditions which may be met. Constructed using أَسْمَاءُ الشَّرْطِ or إِنْ.

**Zero Conditionals** — General truths. Present tense in both clauses:
> *If you work hard, you are successful.*

**First Conditionals** — Future situations which may occur. Present in condition, future in result:
> *If you work hard, you will be successful.*

#### Unreal Conditionals
Conditions which cannot be met. Constructed using لَوْ or لَوْلَا.

**Second Conditional** — Future but unlikely. Past tense in condition, would + infinitive in result:
> *If you worked hard, you would be successful.*

**Third Conditional** — Past and unchangeable. Had + past in condition, would have + past participle in result:
> *If you had worked hard, you would have been successful.*

### Comparing إِنْ and إِذَا

- **إِذَا** is used for events certain to occur — meaning **when**
- **إِنْ** is used for uncertain events — meaning **if**

### The Condition Clause (شَرْط)

The verb in the شَرْطٌ is primarily a فِعْلٌ مُضَارِعٌ which is مَجْزُومٌ, but it can also be:
1. A فِعْلٌ مَاضٍ — translated with present meaning
2. كَانَ of فِعْلٌ نَاقِصٌ — not translated as "was/were"

### The Result Clause (جَوَابُ الشَّرْطِ)

The result clause can be:
1. A فِعْلٌ مُضَارِعٌ مَجْزُومٌ (without additions)
2. A فِعْلٌ مَاضٍ with مُضَارِع meaning
3. Other sentence types preceded by **فَ** (called رَابِطَة — linking particle)

### Negating the Condition

- The شَرْطٌ is negated with **لَمْ**
- The جَوَابُ الشَّرْطِ is negated with **لَا** or **مَا**
- A negative condition can be translated as **unless**

### The Fronted Result Clause (جَوَابٌ مُقَدَّمٌ)

The جَوَابُ الشَّرْطِ may precede the شَرْطٌ. In this case, the أَدَاةُ الشَّرْطِ will NOT cause jazm on the result.

### لَوْ (If / Had)

**لَوْ** can be followed by:
1. A **جُمْلَة فِعْلِيَّة** — both شَرْط and جَوَاب usually contain a فِعْل مَاضٍ. The جَوَاب is preceded by **لَامُ الجَوَاب**.
2. A **جُمْلَة اسْمِيَّة** — with كَانَ or أَنَّ

### لَوْلَا (Were it not for)

**لَوْلَا** is followed by a جُمْلَة اسْمِيَّة in which the خَبَر is hidden (مَحْذُوف). Translated as "were it not for" or "had it not been for."

### وَلَوْ and وَإِنْ (Even though / Even if)

The conditional particles can be preceded by وَاو حَالِيَّة to give the meaning of **even though** or **even if**. The sentence after وَلَوْ becomes the حَال.

### لَوْ for Requests and Wishes

**لَوْ** can express a polite request ("could you kindly") or a wish ("if only"):
> **لَوْ جَلَسْتَ هُنَاكَ** — Could you kindly sit over there.
> **لَوْ لَمْ أُضِيِّعْ وَقْتِي** — If only I did not waste my time.`,
      rules: [
        {
          arabic: 'أَسْمَاءُ الشَّرْطِ وَإِنْ تَجْزِمُ المُضَارِعَ في الشَّرْطِ وَالجَوَابِ',
          english: 'The conditional nouns (man, ma, ayna, etc.) and إِنْ cause the mudari\' verb to be majzum in both the condition and result clauses.',
          examples: [
            { arabic: 'مَنْ يَجْتَهِدْ يَنْجَحْ', translation: 'Whoever works hard succeeds', irab: 'يَجْتَهِدْ: fi\'l mudari\' majzum (shart) — يَنْجَحْ: fi\'l mudari\' majzum (jawab al-shart)' },
            { arabic: 'إِنْ تَجْتَهِدْ تَنْجَحْ', translation: 'If you work hard, you succeed', irab: 'إِنْ: harf al-shart — تَجْتَهِدْ: majzum (shart) — تَنْجَحْ: majzum (jawab)' },
          ],
        },
        {
          arabic: 'لَوْ وَلَوْلَا غَيْرُ عَامِلَيْن',
          english: 'لَوْ and لَوْلَا are non-governing (ghayr \'amil) — they do not affect verb endings. They are used for unreal conditionals.',
          examples: [
            { arabic: 'لَوِ اجْتَهَدْتَ لَنَجَحْتَ', translation: 'If you had worked hard, you would have been successful', irab: 'لَوْ: harf shart — لَ: lam al-jawab — both verbs are fi\'l madi' },
            { arabic: 'لَوْلَا الأَنْبِيَاءُ لَضَلَّ النَّاسُ', translation: 'Were it not for the Prophets, people would have been misguided', irab: 'لَوْلَا: harf shart — الأَنْبِيَاءُ: mubtada\' (khabar mahdhuf) — لَ: lam al-jawab' },
          ],
        },
        {
          arabic: 'جَوَابُ الشَّرْطِ قد يُقدَّم على الشَّرْط',
          english: 'The result clause may precede the condition clause (jawab muqaddam). In this case, the conditional conjunction does NOT cause jazm on the result.',
          examples: [
            { arabic: 'أَجْتَهِدُ إِنِ اجْتَهَدْتَ', translation: 'I will work hard if you work hard', irab: 'أَجْتَهِدُ: jawab shart muqaddam (marfu\', not majzum) — اجْتَهَدْتَ: shart mu\'akhkhar' },
          ],
        },
        {
          arabic: 'الفَاءُ الرَّابِطَة تربط الجَوَاب بالشَّرْط',
          english: 'When the result clause is not a simple mudari\' majzum or madi verb, it must be preceded by فَ (fa\' rabitah — linking fa) to connect it to the condition.',
          examples: [
            { arabic: 'إِنْ يَضْرِبْكَ زَيْدٌ فَلَا تَضْرِبْهُ', translation: 'If Zayd hits you, do not hit him', irab: 'فَ: fa\' rabitah — لَا تَضْرِبْهُ: jawab al-shart (nahy sentence, needs فَ)' },
          ],
        },
        {
          arabic: 'وَلَوْ وَوَإِنْ بمعنى حتى لو / حتى إنْ',
          english: 'When preceded by واو حالية, لَوْ and إِنْ give the meaning of "even though" or "even if." The sentence becomes a hal (state/circumstance).',
          examples: [
            { arabic: 'أَنْصِفُوا النَّاسَ وَلَوْ ظَلَمُوكُمْ', translation: 'Be fair to people even though they wronged you', irab: 'وَ: waw haliyya — لَوْ: harf shart — ظَلَمُوكُمْ: shart (jawab mahdhuf)' },
          ],
        },
      ],
      tables: [
        {
          title: 'Conditional Nouns (Asma\' al-Shart)',
          titleAr: 'أسماء الشرط',
          headers: ['Arabic', 'English', 'Arabic', 'English'],
          rows: [
            ['مَنْ', 'whoever', 'كَيْفَ', 'however'],
            ['مَا', 'whatever', 'أَنَّى', 'from wherever / however'],
            ['أَيْنَ', 'wherever', 'كَمْ', 'however many'],
            ['مَتَى', 'whenever', 'أَيُّ', 'whichever'],
            ['أَيَّانَ', 'whenever', '', ''],
          ],
        },
        {
          title: 'Conditional Particles (Huruf al-Shart)',
          titleAr: 'حروف الشرط',
          headers: ['Particle', 'Meaning', 'Governing?', 'Type of Conditional'],
          rows: [
            ['إِنْ', 'if', 'Yes (\'amil — causes jazm)', 'Real conditional'],
            ['لَوْ', 'if (unreal)', 'No (ghayr \'amil)', 'Unreal conditional'],
            ['لَوْلَا', 'if not / were it not for', 'No (ghayr \'amil)', 'Unreal conditional'],
          ],
        },
        {
          title: 'Forms of the Condition and Result Clauses',
          titleAr: 'أشكال الشرط والجواب',
          headers: ['Clause', 'Form', 'Example'],
          rows: [
            ['Shart', 'Mudari\' majzum', 'مَنْ يَفْعَلْ ...'],
            ['Shart', 'Madi (present meaning)', 'مَنْ فَعَلَ ...'],
            ['Shart', 'Kana (not translated as was)', 'مَنْ كَانَ فَاعِلًا ...'],
            ['Jawab', 'Mudari\' majzum (no additions)', 'يَنْجَحْ'],
            ['Jawab', 'Madi (present meaning)', 'نَجَحَ'],
            ['Jawab', 'Other (preceded by فَ)', 'فَهُوَ نَاجِحٌ / فَسَيَنْجَحُ'],
          ],
        },
        {
          title: 'Summary of All Four Conditional Types',
          titleAr: 'ملخص أنواع الشرط الأربعة',
          headers: ['Type', 'Condition Clause', 'Result Clause'],
          rows: [
            ['Zero (General Truths)', 'Present tense', 'Present tense'],
            ['First (Future: Possible)', 'Present tense', 'Future (will)'],
            ['Second (Future: Unlikely)', 'Past tense', 'Would + infinitive'],
            ['Third (Past: Unchangeable)', 'Had + past tense', 'Would have + past participle'],
          ],
        },
      ],
      sourceRef: 'FSTU Arabic, Unit 6, pp 561-602',
    },
  ],
  relatedTopicIds: ['nida', 'qasam', 'amr-nahy', 'jazm-particles'],
  tags: ['shart', 'conditional', 'in', 'law', 'lawla', 'man', 'ma', 'ayna', 'mata', 'jazm', 'condition', 'result'],
};
