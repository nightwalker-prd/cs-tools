import type { NahwTopic } from '../types';

export const mafUlFihi: NahwTopic = {
  id: 'maf-ul-fihi',
  titleAr: 'المفعول فيه',
  titleEn: 'Adverbs of Time and Place (Maf\'ul Fihi)',
  transliteration: 'al-Maf\'ul Fihi',
  categoryId: 'sentences',
  subcategoryId: 'adverbs-state',
  levels: [
    {
      difficulty: 'beginner',
      summary: 'The maf\'ul fihi (adverb of time and place) shows when or where an action takes place. It is mansub (accusative) and can appear at the beginning or end of the sentence. A sentence may have more than one maf\'ul fihi.',
      body: `## Adverbs of Time and Place (المفعول فيه)

An adverb gives more information about the verb. Adverbs of time and place show **when** or **where** the action takes place.

In Arabic, this is called **مَفْعُول فِيه**. Its grammatical status is **مَنْصُوب** (accusative).

The مَفْعُول فِيه can come at the **beginning** or the **end** of the sentence in both Arabic and English.

> **جَاءَ الضُّيُوفُ البَارِحَةَ** — *The guests came last night.*
> **البَارِحَةَ جَاءَ الضُّيُوفُ** — *Last night, the guests came.*

### Translation Notes

1. Words like "at," "on," "in" may need to be added in translation
   > **صَلَّى الرَّجُلُ لَيْلًا** — *The man prayed at night.*

2. **يَوْم** on its own means "day." With ال it becomes **اليَوْمَ** meaning "today."

3. **أَحْيَانًا** (the plural of حِين = time) is translated as "sometimes."

4. **قَطُّ** is used with a negative past-tense verb and means "ever."
   > **مَا عَبَدَ الأَنْبِيَاءُ صَنَمًا قَطُّ** — *The prophets did not ever worship an idol.*

### Multiple مفعول فيه

A sentence may have more than one مَفْعُول فِيه:

> **اليَوْمَ قَرَأَتْ فَاطِمَةُ سَاعَةً** — *Today, Fatima read for an hour.*

### مفعول فيه in a جملة اسمية

A فِعْل نَاقِص (like كَانَ) with a جُمْلَة اسْمِيَّة can also have a مَفْعُول فِيه:

> **كَانَ زَيْدٌ مَرِيضًا البَارِحَةَ** — *Zaid was sick last night.*`,
      rules: [
        {
          arabic: 'المفعول فيه منصوب ويدل على الزمان أو المكان',
          english: 'The maf\'ul fihi (adverb of time/place) is always mansub (accusative). It shows when or where the action takes place and can appear at the beginning or end of the sentence.',
          examples: [
            { arabic: 'جَاءَ الضُّيُوفُ البَارِحَةَ', translation: 'The guests came last night', irab: 'البَارِحَةَ: maf\'ul fihi mansub (time)' },
            { arabic: 'صَلَّى الرَّجُلُ لَيْلًا', translation: 'The man prayed at night', irab: 'لَيْلًا: maf\'ul fihi mansub (time)' },
          ],
        },
        {
          arabic: 'قد يتعدد المفعول فيه في الجملة الواحدة',
          english: 'A sentence may have more than one maf\'ul fihi (e.g. one for time and one for duration).',
          examples: [
            { arabic: 'اليَوْمَ قَرَأَتْ فَاطِمَةُ سَاعَةً', translation: 'Today, Fatima read for an hour', irab: 'اليَوْمَ: maf\'ul fihi (when) — سَاعَةً: maf\'ul fihi (duration)' },
          ],
        },
      ],
      tables: [
        {
          title: 'Tarkib with Maf\'ul Fihi',
          titleAr: 'تركيب المفعول فيه',
          headers: ['فعل', 'فاعل', 'مفعول فيه'],
          rows: [
            ['جَاءَ', 'الضُّيُوفُ', 'البَارِحَةَ'],
            ['صَلَّى', 'الرَّجُلُ', 'لَيْلًا'],
          ],
        },
        {
          title: 'Maf\'ul Fihi with Kana',
          titleAr: 'المفعول فيه مع كان',
          headers: ['فعل ناقص', 'اسم كان', 'خبر كان', 'مفعول فيه'],
          rows: [
            ['كَانَ', 'زَيْدٌ', 'مَرِيضًا', 'البَارِحَةَ'],
          ],
        },
      ],
      sourceRef: 'FSTU Arabic, Unit 2, pp. 83-102',
    },
  ],
  relatedTopicIds: ['verbal-sentence', 'maf-ul-mutlaq', 'maf-ul-lahu', 'kana-and-sisters'],
  tags: ['maf\'ul fihi', 'adverb', 'time', 'place', 'dharf', 'mansub', 'accusative'],
};

export const mafUlMutlaq: NahwTopic = {
  id: 'maf-ul-mutlaq',
  titleAr: 'المفعول المطلق',
  titleEn: 'Adverbs of Degree and Frequency (Maf\'ul Mutlaq)',
  transliteration: 'al-Maf\'ul al-Mutlaq',
  categoryId: 'sentences',
  subcategoryId: 'adverbs-state',
  levels: [
    {
      difficulty: 'beginner',
      summary: 'The maf\'ul mutlaq shows the degree or frequency of an action. It is nakira (indefinite) and mansub (accusative). For degree, it uses the masdar of the main verb or a synonym. For frequency, it uses the fa\'la pattern or the word marra.',
      body: `## Adverbs of Degree and Frequency (المفعول المطلق)

Some adverbs show the **degree** to which an action occurs, or the **frequency** with which it takes place. In Arabic, this is called **مَفْعُول مُطْلَق**. It is **نَكِرَة** (indefinite) and **مَنْصُوب** (accusative).

### Adverbs of Degree

The مَفْعُول مُطْلَق showing degree is usually the **مَصْدَر** (verbal noun) of the main verb, or a synonym of that مَصْدَر.

> **جَلَسَ الرَّجُلُ جُلُوسًا** — *The man sat (a sitting).*
> **جَلَسَ الرَّجُلُ قُعُودًا** — *The man sat (a sitting).* (synonym مَصْدَر)

**Position:** The مَفْعُول مُطْلَق usually comes after the فَاعِل (and after مَفْعُول بِه if there is one).

**Stative verbs:** The مَفْعُول مُطْلَق of stative verbs can be translated as "so," "very," "extremely," etc.

> **صَبَرَ يَعْقُوبُ صَبْرًا** — *Yaqub was very patient.*

### Adverbs of Frequency

When مَفْعُول مُطْلَق shows frequency, it takes two forms:

**1. A مَصْدَر on the pattern فَعْلَة** — can be made dual and plural:

> **جَلَسَ الوَلَدُ جَلْسَةً** — *The boy sat once.*
> **جَلَسَ الوَلَدُ جَلْسَتَيْنِ** — *The boy sat twice.*
> **جَلَسَ الوَلَدُ جَلَسَاتٍ** — *The boy sat a few times.*

**2. The word مَرَّة** (plural: مَرَّات):

> **غَابَتِ المُعَلِّمَةُ مَرَّتَيْنِ** — *The teacher was absent twice.*

### Distinguishing from مفعول له

Both مَفْعُول مُطْلَق and مَفْعُول لَه are derived from a مَصْدَر, but:
- **مَفْعُول مُطْلَق** is the مَصْدَر of the **main verb** → used for **emphasis**
- **مَفْعُول لَه** is the مَصْدَر of **another verb** → used to express **reason**`,
      rules: [
        {
          arabic: 'المفعول المطلق نكرة منصوب من جنس مصدر الفعل',
          english: 'The maf\'ul mutlaq is indefinite (nakira) and accusative (mansub). It is the masdar of the main verb (or a synonym) and shows the degree or emphasis of the action.',
          examples: [
            { arabic: 'صَبَرَ يَعْقُوبُ صَبْرًا', translation: 'Yaqub was very patient', irab: 'صَبْرًا: maf\'ul mutlaq mansub — masdar of صَبَرَ (degree)' },
            { arabic: 'جَلَسَ الرَّجُلُ جُلُوسًا', translation: 'The man sat (a sitting)', irab: 'جُلُوسًا: maf\'ul mutlaq mansub — masdar of جَلَسَ' },
          ],
        },
        {
          arabic: 'المفعول المطلق للتكرار يأتي على وزن فَعْلَة',
          english: 'For frequency, the maf\'ul mutlaq uses the fa\'la pattern (which can be made dual and plural) or the word marra/marrat.',
          examples: [
            { arabic: 'جَلَسَ الوَلَدُ جَلْسَةً', translation: 'The boy sat once', irab: 'جَلْسَةً: maf\'ul mutlaq (frequency — once)' },
            { arabic: 'جَلَسَ الوَلَدُ جَلْسَتَيْنِ', translation: 'The boy sat twice', irab: 'جَلْسَتَيْنِ: dual form (frequency — twice)' },
            { arabic: 'غَابَتِ المُعَلِّمَةُ مَرَّتَيْنِ', translation: 'The teacher was absent twice', irab: 'مَرَّتَيْنِ: maf\'ul mutlaq using مَرَّة (frequency)' },
          ],
        },
        {
          arabic: 'المفعول المطلق من مصدر الفعل نفسه بخلاف المفعول له',
          english: 'Maf\'ul mutlaq uses the masdar of the main verb (for emphasis), while maf\'ul lahu uses the masdar of a different verb (for reason).',
          examples: [
            { arabic: 'صَبَرَ يَعْقُوبُ صَبْرًا', translation: 'Yaqub was very patient', irab: 'صَبْرًا from صَبَرَ → maf\'ul mutlaq (emphasis)' },
            { arabic: 'صَبَرَ يَعْقُوبُ رَغْبَةً', translation: 'Yaqub was patient in hope', irab: 'رَغْبَةً from رَغِبَ (different verb) → maf\'ul lahu (reason)' },
          ],
        },
      ],
      tables: [
        {
          title: 'Tarkib with Maf\'ul Mutlaq',
          titleAr: 'تركيب المفعول المطلق',
          headers: ['فعل', 'فاعل', 'مفعول مطلق'],
          rows: [
            ['صَبَرَ', 'يَعْقُوبُ', 'صَبْرًا'],
            ['جَلَسَ', 'الرَّجُلُ', 'جُلُوسًا'],
          ],
        },
        {
          title: 'Frequency Forms',
          titleAr: 'صيغ التكرار',
          headers: ['Form', 'Meaning', 'Example'],
          rows: [
            ['فَعْلَة (singular)', 'Once', 'جَلْسَةً'],
            ['فَعْلَتَيْن (dual)', 'Twice', 'جَلْسَتَيْنِ'],
            ['فَعَلَات (plural)', 'A few times', 'جَلَسَاتٍ'],
            ['مَرَّة / مَرَّات', 'Once / times', 'مَرَّتَيْنِ'],
          ],
        },
      ],
      sourceRef: 'FSTU Arabic, Unit 2, pp. 83-102',
    },
  ],
  relatedTopicIds: ['verbal-sentence', 'maf-ul-fihi', 'maf-ul-lahu'],
  tags: ['maf\'ul mutlaq', 'adverb', 'degree', 'frequency', 'masdar', 'mansub', 'accusative', 'emphasis'],
};

export const mafUlLahu: NahwTopic = {
  id: 'maf-ul-lahu',
  titleAr: 'المفعول له',
  titleEn: 'Adverbs of Reason (Maf\'ul Lahu)',
  transliteration: 'al-Maf\'ul Lahu',
  categoryId: 'sentences',
  subcategoryId: 'adverbs-state',
  levels: [
    {
      difficulty: 'beginner',
      summary: 'The maf\'ul lahu (adverb of reason) shows why the subject carries out the action. It is usually a masdar from a different verb than the main verb, and it is nakira (indefinite) and mansub (accusative). It is translated as "because of," "due to," "in hope of," etc.',
      body: `## Adverbs of Reason (المفعول له)

Some adverbs show **why** the subject carries out the verb. In Arabic, this is called **مَفْعُول لَه**. It is usually a **مَصْدَر** (verbal noun), **نَكِرَة** (indefinite), and **مَنْصُوب** (accusative).

It can be translated as "because of," "due to," "in," "for," "in hope of," etc.

> **يَصُومُ الرَّجُلُ احْتِسَابًا** — *The man fasts in hope of reward.*

### Key Distinction from مفعول مطلق

The مَفْعُول لَه is the مَصْدَر of a **different verb** from the main verb in the sentence:
- **صَبَرَ يَعْقُوبُ رَغْبَةً** — *Yaqub was patient in hope.* (رَغْبَة is from رَغِبَ, not from صَبَرَ)

Compare with مَفْعُول مُطْلَق which uses the مَصْدَر of the **same verb**:
- **صَبَرَ يَعْقُوبُ صَبْرًا** — *Yaqub was very patient.* (صَبْر is from صَبَرَ itself)`,
      rules: [
        {
          arabic: 'المفعول له مصدر نكرة منصوب يبيّن سبب الفعل',
          english: 'The maf\'ul lahu is a masdar (from a different verb), indefinite (nakira), and accusative (mansub). It explains the reason or motive for the action.',
          examples: [
            { arabic: 'يَصُومُ الرَّجُلُ احْتِسَابًا', translation: 'The man fasts in hope of reward', irab: 'احْتِسَابًا: maf\'ul lahu mansub — masdar of اِحْتَسَبَ (reason)' },
            { arabic: 'صَبَرَ يَعْقُوبُ رَغْبَةً', translation: 'Yaqub was patient in hope', irab: 'رَغْبَةً: maf\'ul lahu mansub — masdar of رَغِبَ (reason)' },
          ],
        },
      ],
      tables: [
        {
          title: 'Tarkib with Maf\'ul Lahu',
          titleAr: 'تركيب المفعول له',
          headers: ['فعل', 'فاعل', 'مفعول له'],
          rows: [
            ['يَصُومُ', 'الرَّجُلُ', 'احْتِسَابًا'],
          ],
        },
        {
          title: 'Maf\'ul Mutlaq vs. Maf\'ul Lahu',
          titleAr: 'الفرق بين المفعول المطلق والمفعول له',
          headers: ['Type', 'Source', 'Purpose', 'Example'],
          rows: [
            ['مفعول مطلق', 'Masdar of same verb', 'Emphasis/degree', 'صَبَرَ يَعْقُوبُ صَبْرًا'],
            ['مفعول له', 'Masdar of different verb', 'Reason/motive', 'صَبَرَ يَعْقُوبُ رَغْبَةً'],
          ],
        },
      ],
      sourceRef: 'FSTU Arabic, Unit 2, pp. 83-102',
    },
  ],
  relatedTopicIds: ['verbal-sentence', 'maf-ul-mutlaq', 'maf-ul-fihi'],
  tags: ['maf\'ul lahu', 'adverb', 'reason', 'motive', 'masdar', 'mansub', 'accusative'],
};

export const hal: NahwTopic = {
  id: 'hal',
  titleAr: 'الحال',
  titleEn: 'State / Circumstantial (Hal)',
  transliteration: 'al-Haal',
  categoryId: 'sentences',
  subcategoryId: 'adverbs-state',
  levels: [
    {
      difficulty: 'beginner',
      summary: 'Hal describes the condition or state of the subject or object at the time of the verb. It is nakira (indefinite) and mansub (accusative). It typically comes in the pattern of ism al-fa\'il or ism al-maf\'ul and is translated with "-ing" or "-ly" in English.',
      body: `## State / Circumstantial (الحال)

**حَالٌ** describes the condition or state of the subject or object at the time the verb takes place. It is **نَكِرَة** (indefinite) and **مَنْصُوب** (accusative).

The حَالٌ is typically translated by adding **-ing** or **-ly** in English (e.g. crying, riding, quietly, patiently).

> **جَاءَ الرَّجُلُ رَاكِبًا** — *The man came riding.*

### Pattern of حال

The حَالٌ comes in the pattern of:
- **اِسْم الفَاعِل** (active participle): رَاكِبًا (riding)
- **اِسْم المَفْعُول** (passive participle): مَسْرُورًا (delighted)

### Agreement Rules

The حَالٌ **agrees with the noun it describes** in number and gender:

- Masculine singular: **رَاكِبًا**
- Feminine singular: **رَاكِبَةً**
- Masculine plural: **رَاكِبِينَ**
- Feminine plural: **رَاكِبَاتٍ**

### مَعًا — Together

The word **مَعَ** on its own means "with." When it is نَكِرَة, it becomes حَالٌ and is translated as "together," "all together," or "at the same time."

> **جَاءَ الضُّيُوفُ مَعًا** — *The guests came together.*`,
      rules: [
        {
          arabic: 'الحال نكرة منصوب يبيّن هيئة الفاعل أو المفعول',
          english: 'Hal is indefinite (nakira) and accusative (mansub). It describes the state/condition of the subject or object at the time of the verb.',
          examples: [
            { arabic: 'جَاءَ الرَّجُلُ رَاكِبًا', translation: 'The man came riding', irab: 'رَاكِبًا: hal mansub — describes state of the fa\'il' },
            { arabic: 'جَاءَ الضُّيُوفُ مَعًا', translation: 'The guests came together', irab: 'مَعًا: hal mansub — together/at the same time' },
          ],
        },
        {
          arabic: 'الحال يطابق صاحبه في العدد والجنس',
          english: 'Hal agrees with the noun it describes (sahib al-hal) in number and gender.',
          examples: [
            { arabic: 'جَاءَتْ فَاطِمَةُ رَاكِبَةً', translation: 'Fatima came riding', irab: 'رَاكِبَةً: hal feminine singular — agrees with fa\'il' },
            { arabic: 'جَاءَ الرِّجَالُ رَاكِبِينَ', translation: 'The men came riding', irab: 'رَاكِبِينَ: hal masculine plural — agrees with fa\'il' },
          ],
        },
      ],
      tables: [
        {
          title: 'Hal Agreement',
          titleAr: 'مطابقة الحال',
          headers: ['', 'Singular (مُفْرَد)', 'Dual (مُثَنَّى)', 'Plural (جَمْع)'],
          rows: [
            ['Masculine (مُذَكَّر)', 'رَاكِبًا', 'رَاكِبَيْنِ', 'رَاكِبِينَ'],
            ['Feminine (مُؤَنَّث)', 'رَاكِبَةً', 'رَاكِبَتَيْنِ', 'رَاكِبَاتٍ'],
          ],
        },
        {
          title: 'Tarkib with Hal',
          titleAr: 'تركيب الحال',
          headers: ['فعل', 'فاعل', 'حال'],
          rows: [
            ['جَاءَ', 'الرَّجُلُ', 'رَاكِبًا'],
            ['جَاءَ', 'الضُّيُوفُ', 'مَعًا'],
          ],
        },
      ],
      sourceRef: 'FSTU Arabic, Unit 2, pp. 103-120',
    },
  ],
  relatedTopicIds: ['verbal-sentence', 'tamyiz', 'maf-ul-fihi'],
  tags: ['hal', 'state', 'circumstantial', 'ism al-fa\'il', 'participle', 'mansub', 'accusative', 'agreement'],
};

export const tamyiz: NahwTopic = {
  id: 'tamyiz',
  titleAr: 'التمييز',
  titleEn: 'Specification / Clarification (Tamyiz)',
  transliteration: 'at-Tamyiiz',
  categoryId: 'sentences',
  subcategoryId: 'adverbs-state',
  levels: [
    {
      difficulty: 'beginner',
      summary: 'Tamyiz clarifies any ambiguity in a sentence. It is nakira (indefinite) and mansub (accusative), translated as "with," "in," or "of." It can appear in both verbal and nominal sentences, and is commonly used with ism al-tafdil (comparatives/superlatives).',
      body: `## Specification / Clarification (التمييز)

**تَمْيِيزٌ** clarifies any ambiguity that may occur in a sentence. It is **نَكِرَة** (indefinite) and **مَنْصُوب** (accusative). It is translated as "with," "in," "of," etc.

> **زَادَ اللهُ النَّبِيَّ عِلْمًا** — *Allah increased the Prophet in knowledge.*

Here, **عِلْمًا** (tamyiz) clarifies *what* was increased.

### تمييز in a Nominal Sentence

A nominal sentence may also contain a تَمْيِيزٌ:

> **الإِنَاءُ مَمْلُوءٌ مَاءً** — *The container is filled with water.*

### تمييز with اسم التفضيل (Comparative/Superlative)

It is common for اِسْم التَّفْضِيل to have a تَمْيِيزٌ:

> **الطُّلَّابُ أَكْثَرُ احْتِرَامًا** — *The students are most respectful.*`,
      rules: [
        {
          arabic: 'التمييز نكرة منصوب يرفع الإبهام',
          english: 'Tamyiz is indefinite (nakira) and accusative (mansub). It removes ambiguity by specifying what is being described or measured.',
          examples: [
            { arabic: 'زَادَ اللهُ النَّبِيَّ عِلْمًا', translation: 'Allah increased the Prophet in knowledge', irab: 'عِلْمًا: tamyiz mansub — clarifies what was increased' },
            { arabic: 'الإِنَاءُ مَمْلُوءٌ مَاءً', translation: 'The container is filled with water', irab: 'مَاءً: tamyiz mansub — clarifies what it is filled with' },
          ],
        },
        {
          arabic: 'اسم التفضيل كثيرًا ما يأتي معه تمييز',
          english: 'The comparative/superlative (ism al-tafdil) commonly takes a tamyiz to clarify the aspect of comparison.',
          examples: [
            { arabic: 'الطُّلَّابُ أَكْثَرُ احْتِرَامًا', translation: 'The students are most respectful', irab: 'احْتِرَامًا: tamyiz with ism al-tafdil — clarifies the comparison' },
          ],
        },
      ],
      tables: [
        {
          title: 'Tarkib with Tamyiz (Verbal Sentence)',
          titleAr: 'تركيب التمييز في الجملة الفعلية',
          headers: ['فعل', 'فاعل', 'مفعول به', 'تمييز'],
          rows: [
            ['زَادَ', 'اللهُ', 'النَّبِيَّ', 'عِلْمًا'],
          ],
        },
        {
          title: 'Tarkib with Tamyiz (Nominal Sentence)',
          titleAr: 'تركيب التمييز في الجملة الاسمية',
          headers: ['مبتدأ', 'خبر', 'تمييز'],
          rows: [
            ['الإِنَاءُ', 'مَمْلُوءٌ', 'مَاءً'],
            ['الطُّلَّابُ', 'أَكْثَرُ', 'احْتِرَامًا'],
          ],
        },
      ],
      sourceRef: 'FSTU Arabic, Unit 2, pp. 103-120',
    },
  ],
  relatedTopicIds: ['verbal-sentence', 'hal', 'maf-ul-bih'],
  tags: ['tamyiz', 'specification', 'clarification', 'mansub', 'accusative', 'ism al-tafdil', 'comparative'],
};

export const mustathna: NahwTopic = {
  id: 'mustathna',
  titleAr: 'المستثنى',
  titleEn: 'Exception (Mustathna)',
  transliteration: 'al-Mustathna',
  categoryId: 'sentences',
  subcategoryId: 'adverbs-state',
  levels: [
    {
      difficulty: 'beginner',
      summary: 'Istithna (exception) removes someone or something from a general judgement using illa (except). The excluded element (mustathna) is mansub. When illa appears in a negative sentence without a mustathna minhu, it becomes harf hasr (emphasis particle) meaning "only" — and the word after it takes its normal grammatical role.',
      body: `## Exception (الاستثناء)

**الاِسْتِثْنَاء** (exception) is to remove someone or something from a judgement.

- The word **إِلَّا** (except) is called **حَرْفُ الاسْتِثْنَاءِ** (particle of exception)
- The word after إِلَّا is called **مُسْتَثْنَى** (the excluded) — it is **مَنْصُوب** (accusative)

> **جَاءَ الطُّلَّابُ إِلَّا زَيْدًا** — *The students came except Zaid.*

In tarkib, the element from which the exception is made (**مُسْتَثْنَى مِنْهُ**) must be mentioned.

### مُسْتَثْنَى in a Nominal Sentence

> **الطُّلَّابُ مُجْتَهِدُونَ إِلَّا زَيْدًا** — *The students are hardworking except Zaid.*

### إلّا for Emphasis (حَرْفُ حَصْرٍ)

When إِلَّا occurs in a **negative sentence** and the مُسْتَثْنَى مِنْهُ is **omitted**, إِلَّا is **not** for exception — it is for **emphasis**.

In this case:
- The negative particle + إِلَّا together translate as **"only"**
- إِلَّا is labelled **حَرْفُ حَصْرٍ** (particle of emphasis)
- The word after إِلَّا takes its **normal grammatical role** (not مُسْتَثْنَى)

> **مَا جَاءَ إِلَّا زَيْدٌ** — *Only Zaid came.* (زَيْدٌ is فَاعِل, not مُسْتَثْنَى)

Compare:
- **جَاءَ الرِّجَالُ إِلَّا زَيْدًا** — *The men came except Zaid.* (exception — مُسْتَثْنَى مَنْصُوب)
- **مَا جَاءَ الرِّجَالُ إِلَّا زَيْدًا** — *The men did not come except Zaid.* (exception — مُسْتَثْنَى مَنْصُوب)
- **مَا جَاءَ إِلَّا زَيْدٌ** — *Only Zaid came.* (emphasis — فَاعِل مَرْفُوع)

### Gender of the Verb with إلّا for Emphasis

If a feminine فَاعِل comes after إِلَّا (emphasis), the verb **remains masculine**:

> **مَا قَامَ إِلَّا فَاطِمَةُ** (correct — verb stays masculine)

### Other Emphasis Particles: إنْ النافية and إنَّما

**إنْ** (with sukun) is a negative particle used with **إِلَّا** for restriction, meaning "only" or "surely":

> **إِنِ الرَّجُلُ إِلَّا قَائِمٌ** — *The man is surely standing.*

**إِنَّمَا** is a particle of emphasis/restriction meaning "only" or "surely." The emphasised word comes **last**:

> **إِنَّمَا يَنَامُ الطِّفْلُ نَهَارًا** — *The child sleeps only during the day.* (emphasis on when)
> **إِنَّمَا يَنَامُ نَهَارًا الطِّفْلُ** — *Only the child sleeps during the day.* (emphasis on who)`,
      rules: [
        {
          arabic: 'المستثنى بإلّا منصوب',
          english: 'The mustathna (excluded element) after illa is always mansub (accusative) when used for true exception.',
          examples: [
            { arabic: 'جَاءَ الطُّلَّابُ إِلَّا زَيْدًا', translation: 'The students came except Zaid', irab: 'إِلَّا: harf istithna\' — زَيْدًا: mustathna mansub' },
            { arabic: 'الطُّلَّابُ مُجْتَهِدُونَ إِلَّا زَيْدًا', translation: 'The students are hardworking except Zaid', irab: 'زَيْدًا: mustathna min al-mubtada\' mansub' },
          ],
        },
        {
          arabic: 'إذا حُذف المستثنى منه صارت إلّا حرف حصر',
          english: 'When illa appears in a negative sentence without a mustathna minhu, it becomes harf hasr (emphasis), meaning "only." The word after it takes its normal grammatical role.',
          examples: [
            { arabic: 'مَا جَاءَ إِلَّا زَيْدٌ', translation: 'Only Zaid came', irab: 'إِلَّا: harf hasr — زَيْدٌ: fa\'il marfu\' (normal role, not mustathna)' },
            { arabic: 'لَا يَعْبُدُ الْمُسْلِمُونَ إِلَّا اللهَ', translation: 'Muslims worship only Allah', irab: 'إِلَّا: harf hasr — اللهَ: maf\'ul bih mansub (normal role)' },
          ],
        },
        {
          arabic: 'إنَّما حرف حصر والمحصور فيه يأتي آخر الجملة',
          english: 'Innama is a particle of emphasis/restriction. The emphasised/restricted element is always placed last in the sentence — rearranging changes the meaning.',
          examples: [
            { arabic: 'إِنَّمَا يَنَامُ الطِّفْلُ نَهَارًا', translation: 'The child sleeps only during the day', irab: 'نَهَارًا: the last word receives the emphasis' },
            { arabic: 'إِنَّمَا يَنَامُ نَهَارًا الطِّفْلُ', translation: 'Only the child sleeps during the day', irab: 'الطِّفْلُ: last word, receives emphasis' },
          ],
        },
      ],
      tables: [
        {
          title: 'Exception vs. Emphasis',
          titleAr: 'الاستثناء مقابل الحصر',
          headers: ['', 'Affirmative', 'Negative + مستثنى منه', 'Negative, no مستثنى منه'],
          rows: [
            ['Label', 'حرف استثناء', 'حرف استثناء', 'حرف حصر'],
            ['Purpose', 'Exception', 'Exception', 'Emphasis'],
            ['Translation', 'Except', 'Except', 'Only'],
            ['Word after إلّا', 'مستثنى — منصوب', 'مستثنى — منصوب', 'Normal role (varies)'],
            ['Example', 'جَاءَ الرِّجَالُ إِلَّا زَيْدًا', 'مَا جَاءَ الرِّجَالُ إِلَّا زَيْدًا', 'مَا جَاءَ إِلَّا زَيْدٌ'],
          ],
        },
        {
          title: 'Tarkib: Exception',
          titleAr: 'تركيب الاستثناء',
          headers: ['فعل', 'فاعل', 'حرف الاستثناء', 'مستثنى'],
          rows: [
            ['جَاءَ', 'الطُّلَّابُ', 'إِلَّا', 'زَيْدًا'],
          ],
        },
      ],
      sourceRef: 'FSTU Arabic, Unit 2, pp. 103-134',
    },
  ],
  relatedTopicIds: ['verbal-sentence', 'nominal-sentence', 'hal', 'tamyiz'],
  tags: ['mustathna', 'istithna', 'exception', 'illa', 'harf hasr', 'innama', 'emphasis', 'only', 'mansub'],
};

export const mafUlMaAhu: NahwTopic = {
  id: 'maf-ul-ma-ahu',
  titleAr: 'المفعول معه',
  titleEn: 'Object of Accompaniment (Maf\'ul Ma\'ahu)',
  transliteration: 'al-Maf\'ul Ma\'ahu',
  categoryId: 'sentences',
  subcategoryId: 'adverbs-state',
  levels: [
    {
      difficulty: 'beginner',
      summary: 'The maf\'ul ma\'ahu (object of accompaniment) indicates something or someone that accompanies the subject during the action. It comes after the waw al-ma\'iyya (waw of accompaniment) and is mansub (accusative).',
      body: `## Object of Accompaniment (المفعول معه)

The **مَفْعُول مَعَه** indicates something or someone that **accompanies** the subject during the action. It is **مَنْصُوب** (accusative).

It comes after the **وَاو المَعِيَّة** (waw of accompaniment), which means "together with" or "along with."

> **مَشَى الرَّجُلُ وَالنَّهْرَ** — *The man walked along the river.*

Here, **النَّهْرَ** is the مَفْعُول مَعَه — it did not walk; it merely accompanied the man during his walk.

### Key Distinction

The وَاو المَعِيَّة differs from the وَاو العَطْف (conjunction waw meaning "and"):
- **وَاو العَطْف**: both parties share in the action → **جَاءَ زَيْدٌ وَعَمْرٌو** (Zaid and Amr came — both came)
- **وَاو المَعِيَّة**: only the subject does the action, the other accompanies → **مَشَى الرَّجُلُ وَالنَّهْرَ** (the man walked along the river — the river did not walk)

With وَاو العَطْف, the word after it follows the case of the word before it (marfu\' if the fa\'il is marfu\'). With وَاو المَعِيَّة, the word after it is always **مَنْصُوب**.`,
      rules: [
        {
          arabic: 'المفعول معه منصوب يأتي بعد واو المعيّة',
          english: 'The maf\'ul ma\'ahu (object of accompaniment) comes after the waw al-ma\'iyya and is always mansub (accusative). It indicates something that accompanies the subject without sharing in the action.',
          examples: [
            { arabic: 'مَشَى الرَّجُلُ وَالنَّهْرَ', translation: 'The man walked along the river', irab: 'وَ: waw al-ma\'iyya — النَّهْرَ: maf\'ul ma\'ahu mansub' },
          ],
        },
        {
          arabic: 'واو المعيّة تختلف عن واو العطف',
          english: 'The waw al-ma\'iyya (accompaniment) differs from the waw al-\'atf (conjunction). With \'atf, both parties share the action. With ma\'iyya, only the subject performs the action.',
          examples: [
            { arabic: 'جَاءَ زَيْدٌ وَعَمْرٌو', translation: 'Zaid and Amr came', irab: 'وَ: waw al-\'atf — عَمْرٌو: ma\'tuf marfu\' (both came)' },
            { arabic: 'مَشَى الرَّجُلُ وَالنَّهْرَ', translation: 'The man walked along the river', irab: 'وَ: waw al-ma\'iyya — النَّهْرَ: maf\'ul ma\'ahu mansub (river did not walk)' },
          ],
        },
      ],
      tables: [
        {
          title: 'Waw al-\'Atf vs. Waw al-Ma\'iyya',
          titleAr: 'واو العطف مقابل واو المعيّة',
          headers: ['Type', 'Meaning', 'Case of following noun', 'Example'],
          rows: [
            ['واو العطف', 'And (both do the action)', 'Same as preceding noun', 'جَاءَ زَيْدٌ وَعَمْرٌو'],
            ['واو المعيّة', 'Along with (accompaniment)', 'منصوب (accusative)', 'مَشَى الرَّجُلُ وَالنَّهْرَ'],
          ],
        },
      ],
      sourceRef: 'FSTU Arabic, Unit 2, pp. 125-134',
    },
  ],
  relatedTopicIds: ['verbal-sentence', 'hal', 'maf-ul-fihi'],
  tags: ['maf\'ul ma\'ahu', 'accompaniment', 'waw', 'ma\'iyya', 'mansub', 'accusative'],
};
