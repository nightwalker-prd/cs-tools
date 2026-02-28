import type { NahwTopic } from '../types';

export const verbalSentence: NahwTopic = {
  id: 'verbal-sentence',
  titleAr: 'الجملة الفعلية',
  titleEn: 'The Verbal Sentence',
  transliteration: 'al-Jumla al-Fi\'liyya',
  categoryId: 'sentences',
  subcategoryId: 'verbal-sentence',
  levels: [
    {
      difficulty: 'beginner',
      summary: 'The verbal sentence (jumla fi\'liyya) starts with a verb and has two essential slots: the verb (fi\'l) and the subject (fa\'il). The fa\'il is always marfu\'. Feminine subjects require feminine verb forms. Stative verbs express a state rather than an action.',
      body: `## The Verbal Sentence (الجملة الفعلية)

The **الجُمْلَة الفِعْلِيَّة** is a sentence that starts with a verb. It has two **essential** slots:

1. **فِعْل** — the verb
2. **فَاعِل** — the subject (the one who carries out the action)

The remaining slots (objects, adverbs, state, etc.) are **non-essential** — a sentence does not have to include them.

### The Subject (الفاعل)

The فَاعِل is always **مَرْفُوع** (nominative). In Arabic, the فَاعِل comes **after** the فِعْل. When translating to English, the subject should be written first.

> **ذَهَبَ زَيْدٌ** — *Zaid went.*

If the verb is negated, the negative particle is labelled **حَرْف نَفِي**:

> **مَا جَاءَ الرَّجُلُ** — *The man did not come.*

**Note:** In a جُمْلَة اسْمِيَّة the subject is called **مُبْتَدَأ**, while in a جُمْلَة فِعْلِيَّة it is called **فَاعِل**. In English, both are simply called "subject."

### Feminine Subjects

If the فَاعِل is feminine (مُؤَنَّث), the verb must take its feminine form:

> **جَلَسَتْ فَاطِمَةُ** — *Fatima sat.*
> **تَجْلِسُ فَاطِمَةُ** — *Fatima sits / is sitting / will sit.*

The feminine marker on the past-tense verb is the **تَاءُ التَّأْنِيثِ السَّاكِنَة** (تْ).

### Stative and Dynamic Verbs

**Dynamic verbs** show the occurrence of an action — e.g. to eat, to walk.

**Stative verbs** show a state — e.g. to be sick, to be happy. They are translated with an auxiliary verb (is, was, will be) followed by the state, similar to a جُمْلَة اسْمِيَّة.

> **فَرِحَ الرَّجُلُ** — *The man was happy / became happy.* (past)
> **يَفْرَحُ الرَّجُلُ** — *The man is happy.* (present)

### Word Order and Emphasis (تَقْدِيم)

Arabic word order is flexible. Bringing any part of a sentence before its usual place creates emphasis. For example, the مَفْعُول بِه can be fronted:

> **يَعْبُدُ اللهَ الْمُسْلِمُونَ** — *Muslims worship Allah.* (normal order)
> **اللهَ يَعْبُدُ الْمُسْلِمُونَ** — *It is Allah whom the Muslims worship.* (مَفْعُول بِه مُقَدَّم)

**Important:** If a sentence starts with a مَنْصُوب word, it is a مَفْعُول بِه مُقَدَّم, making the sentence a جُمْلَة فِعْلِيَّة (not a جُمْلَة اسْمِيَّة).

### Emphasising the Verb with قَدْ

The particle **قَدْ** (called **حَرْفُ تَحْقِيقٍ** — particle of verification) is placed before a verb for emphasis. It is **غَيْر عَامِل** (non-governing).

**قَدْ + past tense:** Translated as "indeed," "certainly," or with emphatic "did" / "has":
> **قَدْ ذَهَبَ زَيْدٌ** — *Indeed, Zaid went.* / *Zaid did go.* / *Zaid has gone.*

**قَدْ + present tense:** Two meanings (context decides):
1. **Indeed / certainly:** **قَدْ يَعْلَمُ اللهُ** — *Indeed, Allah knows.*
2. **Sometimes / maybe** (حَرْفُ تَقْلِيلٍ): **قَدْ يَصْدُقُ الْكَذُوبُ** — *Sometimes, a liar speaks the truth.*

**لَقَدْ** — لَامُ الابْتِدَاءِ + قَدْ for extra emphasis:
> **﴿لَقَدْ سَمِعَ اللهُ﴾** — *Indeed, Allah has heard.*

### لَامُ الابْتِدَاءِ with Verbal Sentences

A لَامُ الابْتِدَاءِ can be added directly to a مُضَارِع, creating emphasis and specifying the **present tense**:
> **لَيَفْتَحُ الرَّجُلُ الْبَابَ** — *Indeed, the man is opening the door.*

### نُونُ التَّأْكِيدِ (The Emphatic Nun)

The particle **نَّ** (nun of emphasis) can be added to a مُضَارِع for strong emphasis. Formation:
1. Place **لَامُ الابْتِدَاءِ** before the verb
2. Change the verb ending to a **فَتْحَة**
3. Add **نَّ** at the end

> **لَيَنْصُرَنَّ اللهُ الْمُسْلِمِينَ** — *Allah will most definitely help the Muslims.*

The verb with نُونُ التَّأْكِيدِ is translated in the **future tense** with "most certainly" or "most definitely."`,
      rules: [
        {
          arabic: 'الفاعل مرفوع دائمًا',
          english: 'The fa\'il (subject) is always in the nominative case (marfu\') and comes after the verb in Arabic word order.',
          examples: [
            { arabic: 'ذَهَبَ زَيْدٌ', translation: 'Zaid went', irab: 'ذَهَبَ: fi\'l — زَيْدٌ: fa\'il marfu\'' },
            { arabic: 'شَرِبَ الرَّجُلُ الْمَاءَ', translation: 'The man drank the water', irab: 'الرَّجُلُ: fa\'il marfu\' — الْمَاءَ: maf\'ul bih mansub' },
          ],
        },
        {
          arabic: 'إذا كان الفاعل مؤنثًا يؤنث الفعل',
          english: 'When the fa\'il is feminine, the verb must take its feminine form (ta\' al-ta\'nith in past, ta\' prefix in present).',
          examples: [
            { arabic: 'جَلَسَتْ فَاطِمَةُ', translation: 'Fatima sat', irab: 'جَلَسَتْ: past feminine — فَاطِمَةُ: fa\'il mu\'annath' },
            { arabic: 'تَجْلِسُ فَاطِمَةُ', translation: 'Fatima sits', irab: 'تَجْلِسُ: present feminine form' },
          ],
        },
        {
          arabic: 'الفعل اللازم يدل على حالة لا حدث',
          english: 'Stative verbs express a state (not an action) and are translated like a nominal sentence with "is/was/will be" followed by the state.',
          examples: [
            { arabic: 'فَرِحَ الرَّجُلُ', translation: 'The man was happy / became happy', irab: 'فَرِحَ: stative verb (past) — translated with auxiliary' },
            { arabic: 'يَفْرَحُ الرَّجُلُ', translation: 'The man is happy', irab: 'يَفْرَحُ: stative verb (present)' },
          ],
        },
        {
          arabic: 'التقديم يفيد التوكيد',
          english: 'Bringing any part of the sentence before its usual position (taqdim) creates emphasis on that element.',
          examples: [
            { arabic: 'اللهَ يَعْبُدُ الْمُسْلِمُونَ', translation: 'It is Allah whom the Muslims worship', irab: 'اللهَ: maf\'ul bih muqaddam — emphasis on Allah' },
          ],
        },
        {
          arabic: 'قَدْ حرف تحقيق يؤكد الفعل',
          english: 'Qad is a particle of verification placed before a verb for emphasis. With past tense: "indeed/has." With present tense: "indeed" or "sometimes" (context decides).',
          examples: [
            { arabic: 'قَدْ ذَهَبَ زَيْدٌ', translation: 'Indeed, Zaid went. / Zaid has gone.', irab: 'قَدْ: harf tahqiq (non-governing)' },
            { arabic: 'قَدْ يَصْدُقُ الْكَذُوبُ', translation: 'Sometimes, a liar speaks the truth.', irab: 'قَدْ + mudaari\' = harf taqlil (sometimes)' },
            { arabic: 'لَقَدْ سَمِعَ اللهُ', translation: 'Indeed, Allah has heard.', irab: 'لَـ: laam al-ibtida\' + قَدْ: extra emphasis' },
          ],
        },
        {
          arabic: 'نون التأكيد تدل على المستقبل مع التوكيد الشديد',
          english: 'The nun of emphasis (nun al-ta\'kid) is added to a mudaari\' with laam al-ibtida\' for strong future emphasis. The verb ending changes to fatha before adding -anna.',
          examples: [
            { arabic: 'لَيَنْصُرَنَّ اللهُ الْمُسْلِمِينَ', translation: 'Allah will most definitely help the Muslims.', irab: 'لَ: laam — يَنْصُرَ: verb (fatha) — نَّ: nun al-ta\'kid' },
          ],
        },
      ],
      tables: [
        {
          title: 'Verbal Sentence Slots',
          titleAr: 'أجزاء الجملة الفعلية',
          headers: ['Slot', 'Arabic Term', 'Case', 'Required?'],
          rows: [
            ['Verb', 'فِعْل', '—', 'Yes'],
            ['Subject', 'فَاعِل', 'مَرْفُوع', 'Yes'],
            ['Object', 'مَفْعُول بِه', 'مَنْصُوب', 'No'],
            ['Adverb of Time/Place', 'مَفْعُول فِيه', 'مَنْصُوب', 'No'],
            ['Adverb of Degree', 'مَفْعُول مُطْلَق', 'مَنْصُوب', 'No'],
            ['Adverb of Reason', 'مَفْعُول لَه', 'مَنْصُوب', 'No'],
            ['State', 'حَال', 'مَنْصُوب', 'No'],
            ['Clarification', 'تَمْيِيز', 'مَنْصُوب', 'No'],
            ['Exclusion', 'مُسْتَثْنَى', 'مَنْصُوب', 'No'],
          ],
        },
        {
          title: 'Verb Emphasis Summary',
          titleAr: 'ملخص توكيد الفعل',
          headers: ['Tense', 'Particle(s)', 'Example', 'Translation'],
          rows: [
            ['Past', 'قَدْ / لَقَدْ', 'قَدْ ذَهَبَ / لَقَدْ سَمِعَ', 'Indeed went / Indeed heard'],
            ['Present', 'لَامُ الابْتِدَاءِ + مُضَارِع', 'لَيَفْتَحُ الرَّجُلُ', 'Indeed, the man is opening'],
            ['Future (affirmative)', 'لَ + verb + نَّ', 'لَيَنْصُرَنَّ', 'Will most definitely help'],
            ['Future (negative)', 'لَنْ + مُضَارِع', 'لَنْ يَذْهَبَ', 'Will never go'],
          ],
        },
        {
          title: 'Translation of Negative Sentences with Nakira',
          titleAr: 'ترجمة الجمل المنفية مع النكرة',
          headers: ['Type', 'Rule', 'Example', 'Translation'],
          rows: [
            ['Fa\'il is nakira', 'Add "no" before it, omit negative particle', 'مَا جَاءَ رَجُلٌ', 'No man came'],
            ['Maf\'ul bih is nakira', 'Add "any" before it, keep negative', 'مَا شَرِبَ الوَلَدُ مَاءً', 'The child did not drink any water'],
          ],
        },
      ],
      sourceRef: 'FSTU Arabic, Unit 2, pp. 83-134',
    },
  ],
  relatedTopicIds: ['nominal-sentence', 'maf-ul-bih', 'naib-al-fail', 'maf-ul-fihi', 'maf-ul-mutlaq', 'maf-ul-lahu', 'hal', 'tamyiz'],
  tags: ['jumla fi\'liyya', 'verbal sentence', 'fa\'il', 'subject', 'stative', 'dynamic', 'taqdim', 'word order', 'feminine', 'qad', 'tahqiq', 'nun al-ta\'kid', 'emphasis', 'laam al-ibtida'],
};

export const mafUlBih: NahwTopic = {
  id: 'maf-ul-bih',
  titleAr: 'المفعول به',
  titleEn: 'The Direct Object (Maf\'ul Bih)',
  transliteration: 'al-Maf\'ul Bih',
  categoryId: 'sentences',
  subcategoryId: 'verbal-sentence',
  levels: [
    {
      difficulty: 'beginner',
      summary: 'The maf\'ul bih (direct object) is the one upon whom the action is carried out. It is always mansub (accusative). Some verbs take two objects (maf\'ul bih thani), both mansub. The second object follows agreement rules similar to the khabar.',
      body: `## The Object (المفعول به)

The object is the one upon whom the action is carried out. In Arabic it is called **مَفْعُول بِه**. Its grammatical status is **مَنْصُوب** (accusative).

The مَفْعُول بِه comes after the فَاعِل in both English and Arabic.

> **شَرِبَ الرَّجُلُ الْمَاءَ** — *The man drank the water.*

### Translation of Negative Sentences with نكرة Objects

When a negative sentence has an indefinite مَفْعُول بِه, add "any" before it:

> **مَا شَرِبَ الوَلَدُ مَاءً** — *The child did not drink any water.*

Key words in negative sentences: **أَحَدٌ** (anyone) and **شَيْءٌ** (anything).

> **مَا سَأَلَ الوَلَدُ أَحَدًا** — *The child did not ask anyone.*

### Two Objects (المفعول به الأول والثاني)

Some verbs take two objects:
- The **first object** (indirect) = **مَفْعُول بِه أَوَّل**
- The **second object** (direct) = **مَفْعُول بِه ثَانٍ**

Both are **مَنْصُوب**.

> **جَعَلَ اللهُ مُحَمَّدًا نَبِيًّا** — *Allah made Muhammad a prophet.*

### Agreement Rules for مفعول به ثانٍ

- If the مَفْعُول بِه ثَانٍ is an **adjective**, it must agree with the first object in number and gender
- If it is a **noun**, it does not have to agree

### Multi-word Verbs

If an Arabic verb is translated as multiple English words, place the مَفْعُول بِه between them:

> **سَقَى أَحْمَدُ فَاطِمَةَ مَاءً** — *Ahmad gave Fatima water to drink.*`,
      rules: [
        {
          arabic: 'المفعول به منصوب',
          english: 'The maf\'ul bih (direct object) is always in the accusative case (mansub) and comes after the fa\'il.',
          examples: [
            { arabic: 'شَرِبَ الرَّجُلُ الْمَاءَ', translation: 'The man drank the water', irab: 'الرَّجُلُ: fa\'il marfu\' — الْمَاءَ: maf\'ul bih mansub' },
            { arabic: 'نَصَرَ اللهُ الْمُؤْمِنِينَ', translation: 'Allah helped the believers', irab: 'الْمُؤْمِنِينَ: maf\'ul bih mansub (ya\' for jam\' mudhakkar salim)' },
          ],
        },
        {
          arabic: 'بعض الأفعال تأخذ مفعولين',
          english: 'Some verbs take two objects (maf\'ul bih awwal and thani). Both are mansub. If the second object is an adjective, it must agree with the first in number and gender.',
          examples: [
            { arabic: 'جَعَلَ اللهُ مُحَمَّدًا نَبِيًّا', translation: 'Allah made Muhammad a prophet', irab: 'مُحَمَّدًا: maf\'ul bih awwal — نَبِيًّا: maf\'ul bih thani' },
            { arabic: 'أَنْذَرَ الرَّسُولُ النَّاسَ العَذَابَ', translation: 'The Prophet warned the people of the punishment', irab: 'النَّاسَ: first object — العَذَابَ: second object' },
          ],
        },
      ],
      tables: [
        {
          title: 'Verbal Sentence with Object',
          titleAr: 'الجملة الفعلية بالمفعول به',
          headers: ['فعل', 'فاعل', 'مفعول به'],
          rows: [
            ['شَرِبَ', 'الرَّجُلُ', 'الْمَاءَ'],
          ],
        },
        {
          title: 'Two-Object Verbs',
          titleAr: 'الأفعال المتعدية إلى مفعولين',
          headers: ['فعل', 'فاعل', 'مفعول به أول', 'مفعول به ثانٍ'],
          rows: [
            ['جَعَلَ', 'اللهُ', 'مُحَمَّدًا', 'نَبِيًّا'],
            ['أَنْذَرَ', 'الرَّسُولُ', 'النَّاسَ', 'العَذَابَ'],
            ['سَقَى', 'أَحْمَدُ', 'فَاطِمَةَ', 'مَاءً'],
          ],
        },
        {
          title: 'Agreement of Second Object',
          titleAr: 'مطابقة المفعول به الثاني',
          headers: ['Type', 'Agreement', 'Example'],
          rows: [
            ['Adjective', 'Must agree in number and gender', 'جَعَلَ اللهُ الشَّمْسَ كَبِيرَةً'],
            ['Noun', 'No agreement needed', 'جَعَلَ اللهُ الشَّمْسَ ضِيَاءً'],
          ],
        },
      ],
      sourceRef: 'FSTU Arabic, Unit 2, pp. 83-102',
    },
  ],
  relatedTopicIds: ['verbal-sentence', 'naib-al-fail', 'hal', 'tamyiz'],
  tags: ['maf\'ul bih', 'object', 'mansub', 'accusative', 'transitive', 'two objects'],
};

export const naibAlFail: NahwTopic = {
  id: 'naib-al-fail',
  titleAr: 'نائب الفاعل',
  titleEn: 'The Deputy Subject (Na\'ib al-Fa\'il)',
  transliteration: 'Naa\'ib al-Faa\'il',
  categoryId: 'sentences',
  subcategoryId: 'verbal-sentence',
  levels: [
    {
      difficulty: 'beginner',
      summary: 'When the verb is in the passive voice (fi\'l majhul), the fa\'il is removed and the maf\'ul bih takes its place as na\'ib al-fa\'il (deputy subject). The na\'ib al-fa\'il is marfu\' and the verb agrees with it in gender.',
      body: `## The Deputy Subject (نائب الفاعل)

When the verb is in the **passive form** (فِعْل مَجْهُول), the فَاعِل is removed and the **مَفْعُول بِه** takes its place. It is now called **نَائِب الفَاعِل** (deputy subject).

### Key Rules

- نَائِب الفَاعِل is **مَرْفُوع** (nominative) — same as the original فَاعِل
- The verb agrees with the نَائِب الفَاعِل in **gender**
- In tarkib, the verb must be labelled as **فِعْل مَجْهُول** (passive verb)

### Active to Passive Transformation

> **سَمِعَتِ البِنْتُ القُرْآنَ** — *The girl heard the Quran.*
> **سُمِعَ القُرْآنُ** — *The Quran was heard.*

### Translation of Passive Verbs

The فِعْل مَجْهُول is translated using the English passive:

- Past: **سُمِعَ القُرْآنُ** → *The Quran was heard*
- Present habitual: **يُسْمَعُ القُرْآنُ** → *The Quran is heard*
- Present continuous: → *The Quran is being heard*
- Future: → *The Quran will be heard*

### Passive with Two Objects

If a verb has two مَفْعُول بِه and is made passive:
- The **first** مَفْعُول بِه becomes the **نَائِب الفَاعِل** (مَرْفُوع)
- The **second** remains **مَفْعُول بِه** (مَنْصُوب)

> **أَعْطَى اللهُ زَيْدًا مَالًا** → **أُعْطِيَ زَيْدٌ مَالًا**
> *Allah gave Zaid wealth.* → *Zaid was given wealth.*`,
      rules: [
        {
          arabic: 'نائب الفاعل مرفوع ويحل محل الفاعل',
          english: 'The deputy subject (na\'ib al-fa\'il) replaces the fa\'il in passive voice and takes the nominative case (marfu\'). The verb agrees with it in gender.',
          examples: [
            { arabic: 'سُمِعَ القُرْآنُ', translation: 'The Quran was heard', irab: 'سُمِعَ: fi\'l majhul — القُرْآنُ: na\'ib al-fa\'il marfu\'' },
            { arabic: 'أُكْرِمَ الضَّيْفُ', translation: 'The guest was honored', irab: 'أُكْرِمَ: passive past — الضَّيْفُ: na\'ib al-fa\'il marfu\'' },
          ],
        },
        {
          arabic: 'إذا تعدّى الفعل لمفعولين صار الأول نائب فاعل',
          english: 'When a two-object verb is made passive, the first object becomes the na\'ib al-fa\'il (marfu\') and the second remains maf\'ul bih (mansub).',
          examples: [
            { arabic: 'أُعْطِيَ زَيْدٌ مَالًا', translation: 'Zaid was given wealth', irab: 'زَيْدٌ: na\'ib al-fa\'il — مَالًا: maf\'ul bih thani remains mansub' },
          ],
        },
      ],
      tables: [
        {
          title: 'Active to Passive Transformation',
          titleAr: 'التحويل من المعلوم إلى المجهول',
          headers: ['Active', 'Translation', 'Passive', 'Translation'],
          rows: [
            ['سَمِعَتِ البِنْتُ القُرْآنَ', 'The girl heard the Quran', 'سُمِعَ القُرْآنُ', 'The Quran was heard'],
            ['أَعْطَى اللهُ زَيْدًا مَالًا', 'Allah gave Zaid wealth', 'أُعْطِيَ زَيْدٌ مَالًا', 'Zaid was given wealth'],
          ],
        },
        {
          title: 'Passive Verb Translation by Tense',
          titleAr: 'ترجمة الفعل المجهول حسب الزمن',
          headers: ['Tense', 'Example', 'Translation'],
          rows: [
            ['Past (الماضي)', 'سُمِعَ القُرْآنُ', 'The Quran was heard'],
            ['Present habitual', 'يُسْمَعُ القُرْآنُ', 'The Quran is heard'],
            ['Present continuous', 'يُسْمَعُ القُرْآنُ', 'The Quran is being heard'],
            ['Future', 'يُسْمَعُ القُرْآنُ', 'The Quran will be heard'],
          ],
        },
        {
          title: 'Passive Tarkib (Two Objects)',
          titleAr: 'تركيب المجهول (مفعولين)',
          headers: ['فعل مجهول', 'نائب الفاعل', 'مفعول به'],
          rows: [
            ['أُعْطِيَ', 'زَيْدٌ', 'مَالًا'],
          ],
        },
      ],
      sourceRef: 'FSTU Arabic, Unit 2, pp. 83-102',
    },
  ],
  relatedTopicIds: ['verbal-sentence', 'maf-ul-bih'],
  tags: ['na\'ib al-fa\'il', 'deputy subject', 'passive', 'majhul', 'marfu', 'nominative'],
};
