import type { NahwTopic } from '../types';

export const nominalSentence: NahwTopic = {
  id: 'nominal-sentence',
  titleAr: 'الجملة الاسمية',
  titleEn: 'The Nominal Sentence',
  transliteration: 'al-Jumla al-Ismiyya',
  categoryId: 'sentences',
  subcategoryId: 'nominal-sentence',
  levels: [
    {
      difficulty: 'beginner',
      summary: 'The nominal sentence (jumla ismiyya) consists of a subject (mubtada\') and a predicate (khabar). The mubtada\' is definite and marfu\', the khabar is indefinite and marfu\'. They must agree in i\'rab, number, and gender. The khabar can also be a noun, participle, or phrase.',
      body: `## The Nominal Sentence (الجملة الاسمية)

In Arabic, a sentence is called a **جُمْلَة** (plural: **جُمَل**). There are two types: the **جُمْلَة اسْمِيَّة** (nominal sentence) and the **جُمْلَة فِعْلِيَّة** (verbal sentence).

The **جُمْلَة اسْمِيَّة** is made up of two parts:

1. **مُبْتَدَأ** — the subject (what you are talking about)
2. **خَبَر** — the predicate/information about the subject

> **الرَّجُلُ صَادِقٌ** — *The man is truthful.*

Here, **الرَّجُلُ** is the مُبْتَدَأ and **صَادِقٌ** is the خَبَر.

### Rules of مُبْتَدَأ and خَبَر

1. The مُبْتَدَأ comes first, followed by the خَبَر
2. The مُبْتَدَأ must be a noun in the **مَرْفُوع** (nominative) case
3. The خَبَر must match the مُبْتَدَأ in **i\\'rab, number, and gender** — but **not** in definiteness
4. The مُبْتَدَأ is **definite** (مَعْرِفَة) and the خَبَر is **indefinite** (نَكِرَة)

In Arabic there is no word for "is" or "are" — they must be added in English translation.

### When خَبَر is an Adjective vs. a Noun

- If the خَبَر is an **adjective**, it must agree with the مُبْتَدَأ in number and gender
- If the خَبَر is a **noun**, it does **not** need to agree in number or gender

> **الحَرْفُ قِسْمَانِ** — *Harf is two types.* (singular مُبْتَدَأ, dual خَبَر — no agreement needed because خَبَر is a noun)

### The خَبَر as a Participle

The **اِسْم الفَاعِل** (active participle) and **اِسْم المَفْعُول** (passive participle) can serve as خَبَر, expressing present continuous or near future tense:

> **الأُخْتُ ذَاهِبَةٌ** — *The sister is going / is about to go.*
> **النَّاسُ مَسْؤُولُونَ** — *The people are being questioned / will be questioned.*`,
      rules: [
        {
          arabic: 'المُبْتَدَأ مَعْرِفَة مَرْفُوع، والخَبَر نَكِرَة مَرْفُوع',
          english: 'The mubtada\' is definite and nominative (marfu\'), and the khabar is indefinite and nominative. They must agree in i\'rab, number, and gender.',
          examples: [
            { arabic: 'الرَّجُلُ صَادِقٌ', translation: 'The man is truthful', irab: 'الرَّجُلُ: mubtada\' marfu\' — صَادِقٌ: khabar marfu\'' },
            { arabic: 'الأُخْتُ صَادِقَةٌ', translation: 'The sister is truthful', irab: 'Agreement in gender (feminine)' },
            { arabic: 'الرِّجَالُ صَادِقُونَ', translation: 'The men are truthful', irab: 'Agreement in number (plural masculine)' },
          ],
        },
        {
          arabic: 'إذا كان الخَبَر اسمًا لا يشترط المطابقة في العدد والجنس',
          english: 'If the khabar is a noun (not an adjective), it does not need to agree in number or gender with the mubtada\'.',
          examples: [
            { arabic: 'الحَرْفُ قِسْمَانِ', translation: 'Harf is two types', irab: 'مُبْتَدَأ singular, خَبَر dual — no agreement needed' },
            { arabic: 'الصِّدْقُ نَجَاةٌ', translation: 'Truth is salvation', irab: 'مُبْتَدَأ masculine, خَبَر feminine — no agreement needed' },
          ],
        },
        {
          arabic: 'اسم الفاعل واسم المفعول يقعان خبرًا',
          english: 'The active participle (ism al-fa\'il) and passive participle (ism al-maf\'ul) can serve as khabar, expressing present continuous or near future meaning.',
          examples: [
            { arabic: 'الإِمَامُ مُبْتَسِمٌ', translation: 'The imam is smiling', irab: 'مُبْتَسِمٌ: ism al-fa\'il as khabar — present continuous meaning' },
            { arabic: 'النَّاسُ مَسْؤُولُونَ', translation: 'The people are being questioned', irab: 'مَسْؤُولُونَ: ism al-maf\'ul as khabar — passive meaning' },
          ],
        },
      ],
      tables: [
        {
          title: 'Agreement in the Nominal Sentence',
          titleAr: 'المطابقة في الجملة الاسمية',
          headers: ['', 'Singular (مُفْرَد)', 'Dual (مُثَنَّى)', 'Plural (جَمْع)'],
          rows: [
            ['Masculine (مُذَكَّر)', 'الرَّجُلُ صَادِقٌ', 'الرَّجُلَانِ صَادِقَانِ', 'الرِّجَالُ صَادِقُونَ'],
            ['Feminine (مُؤَنَّث)', 'الأُخْتُ صَادِقَةٌ', 'الأُخْتَانِ صَادِقَتَانِ', 'الأَخَوَاتُ صَادِقَاتٌ'],
          ],
        },
        {
          title: 'Nominal Sentence Components',
          titleAr: 'أركان الجملة الاسمية',
          headers: ['Component', 'Role', 'Definiteness', 'Case'],
          rows: [
            ['مُبْتَدَأ', 'Subject', 'مَعْرِفَة (definite)', 'مَرْفُوع (nominative)'],
            ['خَبَر', 'Predicate', 'نَكِرَة (indefinite)', 'مَرْفُوع (nominative)'],
          ],
        },
        {
          title: 'Adjective vs. Noun Khabar',
          titleAr: 'الخبر الوصفي والخبر الاسمي',
          headers: ['Type', 'Agreement Required?', 'Example'],
          rows: [
            ['Adjective khabar', 'Must agree in number and gender', 'الأَوْلَادُ صَالِحُونَ'],
            ['Noun khabar', 'No agreement needed', 'الصِّدْقُ نَجَاةٌ'],
          ],
        },
      ],
      sourceRef: 'FSTU Arabic, Unit 2, pp. 61-81',
    },
  ],
  relatedTopicIds: ['kana-and-sisters', 'inna-and-sisters', 'verbal-sentence'],
  tags: ['jumla ismiyya', 'nominal sentence', 'mubtada', 'khabar', 'subject', 'predicate', 'marfu', 'agreement'],
};

export const kanaAndSisters: NahwTopic = {
  id: 'kana-and-sisters',
  titleAr: 'كان وأخواتها',
  titleEn: 'Kana and Its Sisters',
  transliteration: 'Kaana wa Akhawaatuhaa',
  categoryId: 'sentences',
  subcategoryId: 'nominal-sentence',
  levels: [
    {
      difficulty: 'beginner',
      summary: 'Kana and its sisters are incomplete verbs (af\'al naqisa) that precede a nominal sentence. They include kana (was), laysa (is not), yakunu (will be), and ma al-mushabaha bi-laysa. They keep the subject marfu\' but change the khabar to mansub.',
      body: `## Incomplete Verbs (أفعال ناقصة)

A **فِعْل نَاقِص** (incomplete verb) is an auxiliary verb that precedes a جُمْلَة اسْمِيَّة. When it enters the sentence:

1. The **مُبْتَدَأ** becomes the **اِسْم** of the فِعْل نَاقِص and **remains مَرْفُوع**
2. The **خَبَر** becomes the **خَبَر** of the فِعْل نَاقِص and **becomes مَنْصُوب**

### كَانَ (was) — Past Tense

**كَانَ** changes the nominal sentence to the past tense.

> **زَيْدٌ مَرِيضٌ** → **كَانَ زَيْدٌ مَرِيضًا**
> *Zaid is ill.* → *Zaid was ill.*

### مَا كَانَ (was not) — Negative Past

Adding **مَا** (particle of negation) before كَانَ gives a negative past meaning.

> **مَا كَانَ الرَّجُلُ مَرِيضًا** — *The man was not ill.*

### يَكُونُ (will be) — Future Tense

**يَكُونُ** is the مُضَارِع form of كَانَ. It changes the sentence to the future tense.

> **يَكُونُ زَيْدٌ قَوِيًّا** — *Zaid will be strong.*

The negative is **لَا يَكُونُ** (will not be):

> **لَا يَكُونُ زَيْدٌ مَرِيضًا** — *Zaid will not be ill.*

### لَيْسَ (is not) — Present Negative

**لَيْسَ** gives a present negative meaning. It only exists in the مَاضِي form — it has no مُضَارِع.

> **لَيْسَ زَيْدٌ مَرِيضًا** — *Zaid is not ill.*

### مَا المُشَبَّهَة بِلَيْسَ (مَا that Resembles لَيْسَ)

The particle **مَا** can precede a جُمْلَة اسْمِيَّة (without كَانَ) to negate it, resembling لَيْسَ. It also makes the خَبَر مَنْصُوب.

> **مَا زَيْدٌ مَرِيضًا** — *Zaid is not ill.*

### Gender Agreement

If the اِسْم is feminine, the فِعْل نَاقِص takes its feminine form:

- كَانَ → كَانَتْ
- يَكُونُ → تَكُونُ
- لَيْسَ → لَيْسَتْ

> **كَانَتْ فَاطِمَةُ صَائِمَةً** — *Fatima was fasting.*

### Pronunciation Rule: Feminine Verb Before ال

If the word after the feminine past form (ending in ـتْ) starts with **ال**, the sukun on the تْ changes to a **kasra** (ـتِ) for smooth pronunciation:

> **كَانَتْ فَاطِمَةُ** (normal) → **كَانَتِ الْبِنْتُ** (before ال)
> **لَيْسَتْ هِنْدُ** (normal) → **لَيْسَتِ الأُخْتُ** (before ال)

This applies to all feminine past-tense forms followed by a word beginning with ال.`,
      rules: [
        {
          arabic: 'كَانَ ترفع الاسم وتنصب الخبر',
          english: 'Kana and its sisters keep the subject (ism) in the nominative case (marfu\') and change the predicate (khabar) to the accusative case (mansub).',
          examples: [
            { arabic: 'كَانَ زَيْدٌ مَرِيضًا', translation: 'Zaid was ill', irab: 'زَيْدٌ: ism kana marfu\' — مَرِيضًا: khabar kana mansub' },
            { arabic: 'لَيْسَ زَيْدٌ مَرِيضًا', translation: 'Zaid is not ill', irab: 'زَيْدٌ: ism laysa marfu\' — مَرِيضًا: khabar laysa mansub' },
          ],
        },
        {
          arabic: 'إذا كان الاسم مؤنثًا يؤنث الفعل الناقص',
          english: 'If the ism of a fi\'l naqis is feminine, the incomplete verb must take its feminine form.',
          examples: [
            { arabic: 'كَانَتْ فَاطِمَةُ صَائِمَةً', translation: 'Fatima was fasting', irab: 'كَانَتْ: feminine form of kana' },
            { arabic: 'لَيْسَتْ فَاطِمَةُ صَائِمَةً', translation: 'Fatima is not fasting', irab: 'لَيْسَتْ: feminine form of laysa' },
          ],
        },
        {
          arabic: 'مَا المشبهة بليس تعمل عمل ليس',
          english: 'Ma al-mushabaha bi-laysa (ma resembling laysa) precedes a nominal sentence, negates it, and makes the khabar mansub — just like laysa.',
          examples: [
            { arabic: 'مَا زَيْدٌ مَرِيضًا', translation: 'Zaid is not ill', irab: 'زَيْدٌ: ism ma marfu\' — مَرِيضًا: khabar ma mansub' },
          ],
        },
        {
          arabic: 'إذا جاء بعد التاء الساكنة كلمة فيها ال تتحول إلى كسرة',
          english: 'When a feminine past verb (ending in ـتْ) is followed by a word starting with ال, the sukun on the taa changes to a kasra (ـتِ) for smooth pronunciation.',
          examples: [
            { arabic: 'كَانَتِ الْبِنْتُ مَرِيضَةً', translation: 'The girl was ill', irab: 'كَانَتِ: kasra before ال (not كَانَتْ)' },
            { arabic: 'لَيْسَتِ الأُخْتُ صَائِمَةً', translation: 'The sister is not fasting', irab: 'لَيْسَتِ: kasra before ال' },
          ],
        },
      ],
      tables: [
        {
          title: 'Kana and Its Sisters: Affirmative and Negative',
          titleAr: 'كان وأخواتها: المثبت والمنفي',
          headers: ['Affirmative', 'Meaning', 'Negative', 'Meaning'],
          rows: [
            ['كَانَ', 'was', 'مَا كَانَ', 'was not'],
            ['يَكُونُ', 'will be', 'لَا يَكُونُ', 'will not be'],
            ['—', '—', 'لَيْسَ', 'is/are not'],
            ['—', '—', 'مَا (المشبهة بليس)', 'is/are not'],
          ],
        },
        {
          title: 'Effect on Case',
          titleAr: 'أثر الفعل الناقص على الإعراب',
          headers: ['Component', 'Role', 'Case'],
          rows: [
            ['اِسْم كَانَ / لَيْسَ / مَا', 'Subject', 'مَرْفُوع (nominative)'],
            ['خَبَر كَانَ / لَيْسَ / مَا', 'Predicate', 'مَنْصُوب (accusative)'],
          ],
        },
        {
          title: 'Feminine Forms',
          titleAr: 'التأنيث',
          headers: ['Masculine', 'Feminine'],
          rows: [
            ['كَانَ', 'كَانَتْ'],
            ['يَكُونُ', 'تَكُونُ'],
            ['لَيْسَ', 'لَيْسَتْ'],
          ],
        },
        {
          title: 'Negative Forms Across Tenses',
          titleAr: 'النفي عبر الأزمنة',
          headers: ['Tense', 'Negative Particle', 'Example', 'Translation'],
          rows: [
            ['Past', 'مَا كَانَ', 'مَا كَانَ زَيْدٌ مَرِيضًا', 'Zaid was not sick'],
            ['Present', 'لَيْسَ / مَا', 'لَيْسَ زَيْدٌ مَرِيضًا', 'Zaid is not sick'],
            ['Future', 'لَا يَكُونُ', 'لَا يَكُونُ زَيْدٌ مَرِيضًا', 'Zaid will not be sick'],
          ],
        },
      ],
      sourceRef: 'FSTU Arabic, Unit 2, pp. 61-81',
    },
  ],
  relatedTopicIds: ['nominal-sentence', 'inna-and-sisters', 'verbal-sentence'],
  tags: ['kana', 'laysa', 'yakunu', 'fi\'l naqis', 'incomplete verb', 'mansub', 'past tense', 'negation', 'pronunciation', 'taa ta\'nith'],
};

export const innaAndSisters: NahwTopic = {
  id: 'inna-and-sisters',
  titleAr: 'إنّ وأخواتها',
  titleEn: 'Inna and Its Sisters',
  transliteration: 'Inna wa Akhawaatuhaa',
  categoryId: 'sentences',
  subcategoryId: 'nominal-sentence',
  levels: [
    {
      difficulty: 'beginner',
      summary: 'Inna is a particle resembling a verb (harf mushabah bil-fi\'l) that creates emphasis in a nominal sentence. It puts the mubtada\' (now called ism inna) in the accusative (mansub) and keeps the khabar nominative (marfu\') — the opposite effect of kana.',
      body: `## Particles Resembling Verbs (حروف مشبّهة بالفعل)

A **حَرْف مُشَبَّه بِالْفِعْل** is a particle that precedes a جُمْلَة اسْمِيَّة. The most important is **إِنَّ** (indeed/certainly).

### إِنَّ (Indeed / Certainly)

When إِنَّ precedes a nominal sentence:

1. The **مُبْتَدَأ** becomes the **اِسْم** of إِنَّ and **becomes مَنْصُوب**
2. The **خَبَر** becomes the **خَبَر** of إِنَّ and **remains مَرْفُوع**

This is the **opposite** of كَانَ: with كَانَ the خَبَر becomes مَنْصُوب, but with إِنَّ the اِسْم becomes مَنْصُوب.

> **إِنَّ اللهَ غَفُورٌ** — *Indeed, Allah is Forgiving.*

### لَامُ الاِبْتِدَاءِ (Laam of Beginning)

A **لَ** can be placed at the beginning of a sentence for emphasis. This is called **لَامُ الاِبْتِدَاءِ**.

> **لَزَيْدٌ صَادِقٌ** — *Zaid is truthful.* (with emphasis)

Key rules:
- It creates emphasis not always reflected in translation
- It is **غَيْر عَامِل** — it does not change the i\\'rab of following words
- If the next word has **ال**, the alif is not written: **لَلْوَلَدُ** (not لَالْوَلَدُ)

### اللَّامُ المُزَحْلَقَةُ (The Displaced Laam)

When **لَ** is added to the **خَبَر** of **إِنَّ**, it is called **اللَّامُ المُزَحْلَقَةُ** (the displaced laam). It adds extra emphasis.

> **إِنَّ زَيْدًا لَصَادِقٌ** — *Indeed, Zaid is truthful.* (extra emphasis)

This لَ is also **غَيْر عَامِل** and does not affect the i\\'rab.`,
      rules: [
        {
          arabic: 'إِنَّ تنصب الاسم وترفع الخبر',
          english: 'Inna puts its noun (ism) in the accusative (mansub) and keeps its predicate (khabar) in the nominative (marfu\') — the opposite of kana.',
          examples: [
            { arabic: 'إِنَّ اللهَ غَفُورٌ', translation: 'Indeed, Allah is Forgiving', irab: 'اللهَ: ism inna mansub — غَفُورٌ: khabar inna marfu\'' },
            { arabic: 'إِنَّ زَيْدًا صَادِقٌ', translation: 'Indeed, Zaid is truthful', irab: 'زَيْدًا: ism inna mansub — صَادِقٌ: khabar inna marfu\'' },
          ],
        },
        {
          arabic: 'اللام المزحلقة تدخل على خبر إنّ للتوكيد',
          english: 'The displaced laam (laam muzahlaqa) is attached to the khabar of inna for extra emphasis. It is non-governing (ghayr \'amil).',
          examples: [
            { arabic: 'إِنَّ اللهَ لَغَفُورٌ', translation: 'Indeed, Allah is Forgiving', irab: 'لَ: laam muzahlaqa (non-governing) on khabar' },
            { arabic: 'إِنَّ زَيْدًا لَصَادِقٌ', translation: 'Indeed, Zaid is truthful', irab: 'لَ: extra emphasis, does not change i\'rab' },
          ],
        },
        {
          arabic: 'لام الابتداء حرف غير عامل يفيد التوكيد',
          english: 'Laam al-ibtida\' (laam of beginning) is placed before the mubtada\' for emphasis. It is non-governing and does not change i\'rab.',
          examples: [
            { arabic: 'لَزَيْدٌ صَادِقٌ', translation: 'Zaid is truthful (emphatic)', irab: 'لَ: laam al-ibtida\' — emphasis, non-governing' },
          ],
        },
      ],
      tables: [
        {
          title: 'Contrast: Kana vs. Inna',
          titleAr: 'المقارنة بين كان وإنّ',
          headers: ['', 'Subject Case', 'Predicate Case'],
          rows: [
            ['Basic (مبتدأ + خبر)', 'مَرْفُوع (nominative)', 'مَرْفُوع (nominative)'],
            ['With كَانَ / لَيْسَ / مَا', 'مَرْفُوع (nominative)', 'مَنْصُوب (accusative)'],
            ['With إِنَّ', 'مَنْصُوب (accusative)', 'مَرْفُوع (nominative)'],
          ],
        },
        {
          title: 'Three Types of Emphasis',
          titleAr: 'ثلاث طرق للتوكيد',
          headers: ['Particle', 'Example', 'Translation'],
          rows: [
            ['إِنَّ', 'إِنَّ زَيْدًا صَادِقٌ', 'Indeed, Zaid is truthful.'],
            ['لَامُ الاِبْتِدَاءِ', 'لَزَيْدٌ صَادِقٌ', 'Zaid is truthful. (emphatic)'],
            ['اللَّامُ المُزَحْلَقَةُ', 'إِنَّ زَيْدًا لَصَادِقٌ', 'Indeed, Zaid is truthful. (extra emphasis)'],
          ],
        },
      ],
      sourceRef: 'FSTU Arabic, Unit 2, pp. 61-81',
    },
  ],
  relatedTopicIds: ['nominal-sentence', 'kana-and-sisters', 'verbal-sentence'],
  tags: ['inna', 'harf mushabah', 'emphasis', 'laam', 'muzahlaqa', 'ibtida', 'mansub', 'marfu'],
};
