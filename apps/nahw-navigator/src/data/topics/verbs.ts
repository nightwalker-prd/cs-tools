import type { NahwTopic } from '../types';

export const verbTense: NahwTopic = {
  id: 'verb-tense',
  titleAr: 'أزمنة الفعل',
  titleEn: 'Verb Tenses',
  transliteration: 'Azminat al-Fi\'l',
  categoryId: 'words',
  subcategoryId: 'verb-characteristics',
  levels: [
    {
      difficulty: 'beginner',
      summary: 'Arabic verbs come in three tenses: past (al-maadi), present/future (al-mudaari\'), and imperative (al-amr). The mudaari\' covers present habitual, present continuous, and future meanings.',
      body: `## Verb Tenses

A verb (**فِعْلٌ**) is a word that shows an action. Verbs have five characteristics, remembered by the mnemonic **VoTING**: Voice, Tense, I'rab, Negative/Affirmative, and Gender.

Arabic verbs come in three tenses:

### 1. Past Tense (اَلْمَاضِي)

Shows that the action took place in the past:
> **ذَهَبَ زَيْدٌ** — Zaid went.

### 2. Present/Future Tense (اَلْمُضَارِعُ)

Covers three time frames (context determines which):
1. **Present habitual** — Zaid goes.
2. **Present continuous** — Zaid is going.
3. **Future** — Zaid will go.

> **يَذْهَبُ زَيْدٌ** — Zaid goes / is going / will go.

### 3. Imperative (اَلْأَمْرُ)

A command:
> **اِذْهَبْ** — Go!

### Future Tense Particles (سَـ and سَوْفَ)

The مُضَارِع on its own can mean present or future. Two particles **specify the future tense**:

**سَـ** (near future — "soon"):
> **سَيَذْهَبُ زَيْدٌ** — *Zaid will soon go.*

**سَوْفَ** (distant future — "will"):
> **سَوْفَ يَذْهَبُ زَيْدٌ** — *Zaid will go.*

Both are **غَيْر عَامِل** — they do not affect the verb's i'rab. سَـ is written as a prefix attached to the verb.`,
      rules: [
        {
          arabic: 'الماضي يدل على حدث وقع في الزمن الماضي',
          english: 'The past tense (al-maadi) indicates an action that occurred in the past.',
          examples: [
            { arabic: 'ذَهَبَ زَيْدٌ', translation: 'Zaid went.' },
            { arabic: 'فَتَحَ', translation: 'he opened' },
          ],
        },
        {
          arabic: 'المضارع يدل على الحال أو الاستقبال',
          english: 'The present/future tense (al-mudaari\') covers present habitual, present continuous, and future meanings — context determines which.',
          examples: [
            { arabic: 'يَذْهَبُ زَيْدٌ', translation: 'Zaid goes / is going / will go.' },
            { arabic: 'يَفْتَحُ', translation: 'he opens / is opening / will open' },
          ],
        },
        {
          arabic: 'الأمر يدل على طلب الفعل',
          english: 'The imperative (al-amr) is a command to perform an action.',
          examples: [
            { arabic: 'اِذْهَبْ', translation: 'Go!' },
            { arabic: 'اِفْتَحْ', translation: 'Open!' },
          ],
        },
        {
          arabic: 'سَـ وسَوْفَ تخصّصان المضارع للاستقبال',
          english: 'The particles sa- (near future) and sawfa (distant future) specify the mudaari\' for the future tense. Both are non-governing.',
          examples: [
            { arabic: 'سَيَذْهَبُ زَيْدٌ', translation: 'Zaid will soon go.', irab: 'سَـ: near future — verb remains marfu\'' },
            { arabic: 'سَوْفَ يَذْهَبُ زَيْدٌ', translation: 'Zaid will go.', irab: 'سَوْفَ: distant future — verb remains marfu\'' },
          ],
        },
      ],
      tables: [
        {
          title: 'The Three Verb Tenses',
          titleAr: 'أزمنة الفعل الثلاثة',
          headers: ['Tense', 'Arabic Term', 'Time', 'Example'],
          rows: [
            ['Past', 'اَلْمَاضِي', 'Past', 'ذَهَبَ (he went)'],
            ['Present/Future', 'اَلْمُضَارِعُ', 'Present or Future', 'يَذْهَبُ (he goes / will go)'],
            ['Imperative', 'اَلْأَمْرُ', 'Command', 'اِذْهَبْ (go!)'],
          ],
        },
        {
          title: 'Future Tense Particles',
          titleAr: 'حروف الاستقبال',
          headers: ['Particle', 'Meaning', 'Usage', 'Example'],
          rows: [
            ['سَـ', 'Near future (soon)', 'Prefix on mudaari\'', 'سَيَذْهَبُ زَيْدٌ'],
            ['سَوْفَ', 'Distant future (will)', 'Separate word before mudaari\'', 'سَوْفَ يَذْهَبُ زَيْدٌ'],
          ],
        },
        {
          title: 'Verb Characteristics (VoTING)',
          titleAr: 'خصائص الفعل',
          headers: ['Letter', 'Characteristic', 'Arabic'],
          rows: [
            ['Vo', 'Voice', 'المعلوم والمجهول'],
            ['T', 'Tense', 'الزمن'],
            ['I', 'I\'rab', 'الإعراب'],
            ['N', 'Negative & Affirmative', 'النفي والإثبات'],
            ['G', 'Gender', 'الجنس'],
          ],
        },
      ],
      sourceRef: 'FSTU Arabic, Unit 1, pp. 30-31',
    },
  ],
  relatedTopicIds: ['word-types', 'verb-irab', 'verb-negation', 'verb-gender-voice'],
  tags: ['verb', 'tense', 'past', 'present', 'future', 'imperative', 'maadi', 'mudaari\'', 'amr', 'fi\'l', 'sa', 'sawfa', 'near future', 'distant future'],
};

export const verbIrab: NahwTopic = {
  id: 'verb-irab',
  titleAr: 'إعراب الأفعال',
  titleEn: 'Verb I\'rab',
  transliteration: 'I\'raab al-Af\'aal',
  categoryId: 'words',
  subcategoryId: 'verb-characteristics',
  levels: [
    {
      difficulty: 'beginner',
      summary: 'The past tense verb and imperative are non-declinable (mabni). Only the present tense verb (mudaari\') is declinable, occurring in three states: raf\' (damma), nasb (fatha), and jazm (sukuun).',
      body: `## Verb I'rab (Declension)

In Arabic, verbs can either be **مُعْرَبٌ** (declinable) or **مَبْنِيٌّ** (non-declinable).

### Past Tense (اَلْفِعْلُ الْمَاضِي)
The past tense verb is **مَبْنِيٌّ** — non-declinable. It does not occur in any i'rab state.

### Present/Future Tense (اَلْفِعْلُ الْمُضَارِعُ)
The present tense verb is **مُعْرَبٌ** — declinable. It can occur in three states:

1. **مَرْفُوعٌ** (Raf' — nominative/default) — indicated by **ضَمَّة**: **يَفْعَلُ**
2. **مَنْصُوبٌ** (Nasb — accusative) — indicated by **فَتْحَة**: **يَفْعَلَ**
3. **مَجْزُومٌ** (Jazm — jussive) — indicated by **سُكُونٌ**: **يَفْعَلْ**

### Imperative (فِعْلُ الْأَمْرِ)
The imperative only occurs in the **مَجْزُومٌ** state: **اِفْعَلْ**.

### Weak Letters in Mudaari' Verbs

**Hollow verbs** (middle weak letter): If the middle letter is an alif, waw, or yaa, it drops in the jazm state:
> **يَقُومُ** → **لَمْ يَقُمْ** (the waw drops)

**Defective verbs** (final weak letter): If the last letter is an alif, waw, or yaa:
- It drops in jazm: **يُعْطِي** → **لَمْ يُعْطِ** (the yaa drops)
- Its damma drops in raf': **يُعْطِي** (not يُعْطِيُ)`,
      rules: [
        {
          arabic: 'الفعل الماضي مبني دائما',
          english: 'The past tense verb is always non-declinable (mabni) — its ending never changes for i\'rab.',
        },
        {
          arabic: 'الفعل المضارع معرب: يُرفع بالضمة ويُنصب بالفتحة ويُجزم بالسكون',
          english: 'The present tense verb is declinable: raf\' with damma, nasb with fatha, jazm with sukuun.',
          examples: [
            { arabic: 'يَفْعَلُ', translation: 'he does (raf\')', irab: 'Marfu\' — damma on last letter' },
            { arabic: 'لَنْ يَفْعَلَ', translation: 'he will not do (nasb)', irab: 'Mansub — fatha on last letter' },
            { arabic: 'لَمْ يَفْعَلْ', translation: 'he did not do (jazm)', irab: 'Majzum — sukuun on last letter' },
          ],
        },
        {
          arabic: 'فعل الأمر مجزوم دائما',
          english: 'The imperative verb is always in the jazm (jussive) state.',
          examples: [
            { arabic: 'اِفْعَلْ', translation: 'Do!', irab: 'Imperative — always majzum' },
          ],
        },
        {
          arabic: 'الأجوف تُحذف عينه في الجزم',
          english: 'In hollow verbs, the middle weak letter drops in the jazm state.',
          examples: [
            { arabic: 'لَمْ يَقُمْ', translation: 'he did not stand', irab: 'Hollow verb — waw dropped in jazm (from يَقُومُ)' },
          ],
        },
        {
          arabic: 'الناقص تُحذف لامه في الجزم',
          english: 'In defective verbs, the final weak letter drops in the jazm state, and the damma drops in raf\'.',
          examples: [
            { arabic: 'لَمْ يُعْطِ', translation: 'he did not give', irab: 'Defective verb — yaa dropped in jazm (from يُعْطِي)' },
          ],
        },
      ],
      tables: [
        {
          title: 'Verb I\'rab Summary',
          titleAr: 'إعراب الأفعال',
          headers: ['Verb Type', 'I\'rab Status', 'States'],
          rows: [
            ['Past (الماضي)', 'مَبْنِيٌّ (non-declinable)', 'No i\'rab states'],
            ['Present (المضارع)', 'مُعْرَبٌ (declinable)', 'مَرْفُوعٌ (ضمة) / مَنْصُوبٌ (فتحة) / مَجْزُومٌ (سكون)'],
            ['Imperative (الأمر)', 'مَبْنِيٌّ (non-declinable)', 'Always مَجْزُومٌ form'],
          ],
        },
      ],
      sourceRef: 'FSTU Arabic, Unit 1, pp. 35-37',
    },
  ],
  relatedTopicIds: ['verb-tense', 'noun-irab', 'verb-negation'],
  tags: ['verb i\'rab', 'declension', 'raf\'', 'nasb', 'jazm', 'damma', 'fatha', 'sukuun', 'mu\'rab', 'mabni', 'hollow verb', 'defective verb'],
};

export const verbNegation: NahwTopic = {
  id: 'verb-negation',
  titleAr: 'نفي الأفعال',
  titleEn: 'Verb Negation',
  transliteration: 'Nafy al-Af\'aal',
  categoryId: 'words',
  subcategoryId: 'verb-characteristics',
  levels: [
    {
      difficulty: 'beginner',
      summary: 'Verbs are either affirmative (muthbat) or negative (manfiyy). Negation is done with particles: maa for past tense, and lam, maa, laa, lan for present tense. Each particle affects a different tense and may change the verb\'s i\'rab.',
      body: `## Verb Negation (Affirmative and Negative)

Verbs are either **affirmative** or **negative**:

- An **affirmative verb** (**مُثْبَتٌ**) shows that the action took place.
- A **negative verb** (**مَنْفِيٌّ**) shows that the action did not take place.

A verb becomes negative when preceded by a **حَرْفُ نَفْيٍ** (negative particle). Without such a particle, the verb is affirmative.

### Negating the Past Tense (الماضي)

**مَا** makes the past tense negative:
> **مَا ذَهَبَ زَيْدٌ** — Zaid did not go.

### Negating the Present Tense (المضارع)

Four particles negate the mudaari':

#### 1. لَمْ — Past tense negation
Gives the mudaari' a negative meaning in the **past tense**. The verb becomes **مَجْزُومٌ**:
> **لَمْ يَذْهَبْ زَيْدٌ** — Zaid did not go.

#### 2. مَا — Present tense negation (habitual/continuous)
Gives the mudaari' a negative meaning in the **present tense**. No i'rab effect:
> **مَا يَذْهَبُ زَيْدٌ** — Zaid does not go. / Zaid is not going.

#### 3. لَا — Present/Future negation
Gives the mudaari' a negative meaning in the **present or future**. No i'rab effect:
> **لَا يَذْهَبُ زَيْدٌ** — Zaid does not go. / Zaid will not go.

#### 4. لَنْ — Emphatic future negation
Gives the mudaari' an **emphatic negative** meaning in the **future**. The verb becomes **مَنْصُوبٌ**:
> **لَنْ يَذْهَبَ زَيْدٌ** — Zaid will never go.`,
      rules: [
        {
          arabic: 'مَا تنفي الماضي',
          english: 'Maa negates the past tense verb without changing its i\'rab.',
          examples: [
            { arabic: 'مَا ذَهَبَ زَيْدٌ', translation: 'Zaid did not go.', irab: 'ذَهَبَ: mabni — no i\'rab change' },
          ],
        },
        {
          arabic: 'لَمْ تنفي المضارع في الماضي وتجزمه',
          english: 'Lam negates the mudaari\' with past tense meaning and puts it in the jazm (jussive) state.',
          examples: [
            { arabic: 'لَمْ يَذْهَبْ زَيْدٌ', translation: 'Zaid did not go.', irab: 'يَذْهَبْ: majzum — sukuun because of لَمْ' },
          ],
        },
        {
          arabic: 'مَا تنفي المضارع في الحال',
          english: 'Maa negates the mudaari\' in the present tense (habitual or continuous) without changing i\'rab.',
          examples: [
            { arabic: 'مَا يَذْهَبُ زَيْدٌ', translation: 'Zaid does not go. / Zaid is not going.', irab: 'يَذْهَبُ: marfu\' — no i\'rab change' },
          ],
        },
        {
          arabic: 'لَا تنفي المضارع في الحال أو الاستقبال',
          english: 'Laa negates the mudaari\' in present or future without changing i\'rab.',
          examples: [
            { arabic: 'لَا يَذْهَبُ زَيْدٌ', translation: 'Zaid does not go. / Zaid will not go.', irab: 'يَذْهَبُ: marfu\' — no i\'rab change' },
          ],
        },
        {
          arabic: 'لَنْ تنفي المضارع في المستقبل نفيا مؤكدا وتنصبه',
          english: 'Lan gives emphatic future negation and puts the mudaari\' in the nasb (accusative) state.',
          examples: [
            { arabic: 'لَنْ يَذْهَبَ زَيْدٌ', translation: 'Zaid will never go.', irab: 'يَذْهَبَ: mansub — fatha because of لَنْ' },
          ],
        },
      ],
      tables: [
        {
          title: 'Negative Particles Summary',
          titleAr: 'حروف النفي',
          headers: ['Particle', 'Verb Type', 'Tense', 'I\'rab Effect', 'Example'],
          rows: [
            ['مَا', 'الماضي', 'Past', 'None', 'مَا ذَهَبَ زَيْدٌ'],
            ['لَمْ', 'المضارع', 'Past', 'مَجْزُومٌ', 'لَمْ يَذْهَبْ زَيْدٌ'],
            ['مَا', 'المضارع', 'Present', 'None', 'مَا يَذْهَبُ زَيْدٌ'],
            ['لَا', 'المضارع', 'Present/Future', 'None', 'لَا يَذْهَبُ زَيْدٌ'],
            ['لَنْ', 'المضارع', 'Future (emphatic)', 'مَنْصُوبٌ', 'لَنْ يَذْهَبَ زَيْدٌ'],
          ],
        },
      ],
      sourceRef: 'FSTU Arabic, Unit 1, pp. 37-39',
    },
  ],
  relatedTopicIds: ['verb-tense', 'verb-irab', 'particles'],
  tags: ['negation', 'nafy', 'maa', 'lam', 'laa', 'lan', 'affirmative', 'negative', 'muthbat', 'manfiyy', 'harf nafy'],
};

export const verbGenderVoice: NahwTopic = {
  id: 'verb-gender-voice',
  titleAr: 'جنس الفعل والمعلوم والمجهول',
  titleEn: 'Verb Gender & Voice',
  transliteration: 'Jins al-Fi\'l wa al-Ma\'luum wa al-Majhuul',
  categoryId: 'words',
  subcategoryId: 'verb-characteristics',
  levels: [
    {
      difficulty: 'beginner',
      summary: 'Verbs are classified by gender (masculine/feminine) and voice (active/passive). The feminine past is formed by adding taa, and the feminine present by changing the yaa prefix to taa. Passive voice is formed by changing the internal vowels of the verb.',
      body: `## Verb Gender

Verbs are classified as masculine (**مُذَكَّرٌ**) or feminine (**مُؤَنَّثٌ**).

### Forming the Feminine

**Past tense** is made feminine by adding **التَّاءُ الْمَفْتُوحَةُ** (ت) at the end:
> **فَعَلَ** → **فَعَلَتْ**

**Present tense** is made feminine by changing the **يـ** prefix to **تـ**:
> **يَفْعَلُ** → **تَفْعَلُ**

## Verb Voice (Active & Passive)

### Active Voice (فِعْلٌ مَعْلُومٌ)
The subject carries out the action upon the object:
> **عَرَفَ الرَّجُلُ الْوَلَدَ** — The man recognised the boy.

### Passive Voice (فِعْلٌ مَجْهُولٌ)
The subject is the recipient of the verb's action:
> **عُرِفَ الْوَلَدُ** — The boy was recognised.

### Forming the Passive — Past Tense

Three steps:
1. **Leave** the harakah of the **last letter** as it is.
2. Give the **second-to-last letter** a **كَسْرَة** (kasra).
3. Give all **remaining letters** a **ضَمَّة** (damma).

> **بَعَثَ** → **بُعِثَ** (he was sent)
> **أَنْزَلَ** → **أُنْزِلَ** (it was sent down)

### Forming the Passive — Present Tense

Three steps:
1. Give the **first letter** a **ضَمَّة** (damma).
2. Give the **second-to-last letter** a **فَتْحَة** (fatha).
3. **Leave** the harakah of all **remaining letters** as they are.

> **يَبْعَثُ** → **يُبْعَثُ** (he is sent)
> **يُنْزِلُ** → **يُنْزَلُ** (it is sent down)

### Translating the Passive

The passive is translated by adding **to be** (was, is, will be) to the past participle:
- Past: **was stolen**
- Present habitual: **is stolen**
- Present continuous: **is being stolen**
- Future: **will be stolen**`,
      rules: [
        {
          arabic: 'الماضي يُؤنث بإضافة التاء المفتوحة',
          english: 'The past tense is made feminine by adding open taa (ت) at the end.',
          examples: [
            { arabic: 'فَعَلَ → فَعَلَتْ', translation: 'he did → she did' },
            { arabic: 'ذَهَبَ → ذَهَبَتْ', translation: 'he went → she went' },
          ],
        },
        {
          arabic: 'المضارع يُؤنث بتبديل الياء بالتاء',
          english: 'The present tense is made feminine by changing the yaa prefix to taa.',
          examples: [
            { arabic: 'يَفْعَلُ → تَفْعَلُ', translation: 'he does → she does' },
            { arabic: 'يَذْهَبُ → تَذْهَبُ', translation: 'he goes → she goes' },
          ],
        },
        {
          arabic: 'المعلوم: الفاعل معروف',
          english: 'In the active voice (fi\'l ma\'luum), the doer of the action is known and mentioned.',
          examples: [
            { arabic: 'عَرَفَ الرَّجُلُ الْوَلَدَ', translation: 'The man recognised the boy.', irab: 'Active — الرَّجُلُ is the known doer' },
          ],
        },
        {
          arabic: 'المجهول: الفاعل غير معروف',
          english: 'In the passive voice (fi\'l majhuul), the doer is unknown and the object becomes the subject.',
          examples: [
            { arabic: 'عُرِفَ الْوَلَدُ', translation: 'The boy was recognised.', irab: 'Passive — الْوَلَدُ is now the subject (naib al-fa\'il)' },
          ],
        },
        {
          arabic: 'المجهول الماضي: ضمة + كسرة ما قبل الآخر',
          english: 'Passive past: give remaining letters damma, second-to-last letter kasra, keep last letter\'s harakah.',
          examples: [
            { arabic: 'بَعَثَ → بُعِثَ', translation: 'he sent → he was sent' },
            { arabic: 'أَنْزَلَ → أُنْزِلَ', translation: 'he sent down → it was sent down' },
            { arabic: 'اِسْتَغْفَرَ → اُسْتُغْفِرَ', translation: 'he sought forgiveness → forgiveness was sought' },
          ],
        },
        {
          arabic: 'المجهول المضارع: ضمة الأول + فتحة ما قبل الآخر',
          english: 'Passive present: give first letter damma, second-to-last letter fatha, keep remaining letters.',
          examples: [
            { arabic: 'يَبْعَثُ → يُبْعَثُ', translation: 'he sends → he is sent' },
            { arabic: 'يُنْزِلُ → يُنْزَلُ', translation: 'he sends down → it is sent down' },
            { arabic: 'يَسْتَغْفِرُ → يُسْتَغْفَرُ', translation: 'he seeks forgiveness → forgiveness is sought' },
          ],
        },
      ],
      tables: [
        {
          title: 'Passive Voice Formation — Past Tense',
          titleAr: 'صياغة المجهول — الماضي',
          headers: ['Active (مَعْلُوم)', 'Step 1 (keep last)', 'Step 2 (kasra penult.)', 'Passive (مَجْهُول)'],
          rows: [
            ['بَعَثَ', 'بَعَثَ', 'بِعَثَ', 'بُعِثَ'],
            ['أَنْزَلَ', 'أَنْزَلَ', 'أَنْزِلَ', 'أُنْزِلَ'],
            ['اِسْتَغْفَرَ', 'اِسْتَغْفَرَ', 'اِسْتَغْفِرَ', 'اُسْتُغْفِرَ'],
          ],
        },
        {
          title: 'Passive Voice Formation — Present Tense',
          titleAr: 'صياغة المجهول — المضارع',
          headers: ['Active (مَعْلُوم)', 'Step 1 (damma first)', 'Step 2 (fatha penult.)', 'Passive (مَجْهُول)'],
          rows: [
            ['يَبْعَثُ', 'يُبْعَثُ', 'يُبْعَثُ', 'يُبْعَثُ'],
            ['يُنْزِلُ', 'يُنْزِلُ', 'يُنْزَلُ', 'يُنْزَلُ'],
            ['يَسْتَغْفِرُ', 'يُسْتَغْفِرُ', 'يُسْتَغْفَرُ', 'يُسْتَغْفَرُ'],
          ],
        },
        {
          title: 'Translating the Passive Voice',
          titleAr: 'ترجمة المجهول',
          headers: ['Tense', 'Active', 'Passive'],
          rows: [
            ['Past (الماضي)', 'The thief stole the bike.', 'The bike was stolen.'],
            ['Present Habitual', 'The thief steals the bike.', 'The bike is stolen.'],
            ['Present Continuous', 'The thief is stealing the bike.', 'The bike is being stolen.'],
            ['Future', 'The thief will steal the bike.', 'The bike will be stolen.'],
          ],
        },
      ],
      sourceRef: 'FSTU Arabic, Unit 1, pp. 39-44',
    },
  ],
  relatedTopicIds: ['verb-tense', 'gender', 'verb-irab'],
  tags: ['gender', 'voice', 'active', 'passive', 'ma\'luum', 'majhuul', 'masculine', 'feminine', 'taa maftuuha', 'verb conjugation'],
};
