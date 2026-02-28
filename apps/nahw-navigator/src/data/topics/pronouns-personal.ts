import type { NahwTopic } from '../types';

export const damirMarfu: NahwTopic = {
  id: 'damir-marfu',
  titleAr: 'الضمير المرفوع',
  titleEn: 'Nominative Pronouns',
  transliteration: 'ad-Damir al-Marfu\'',
  categoryId: 'pronouns',
  subcategoryId: 'personal-pronouns',
  levels: [
    {
      difficulty: 'beginner',
      summary: 'Nominative pronouns (ضمير مرفوع) replace nouns in the marfu\' state. They serve as the subject of nominal sentences (ضمير المبتدأ) or as the subject of verbs (ضمير الفاعل). Verbal subject pronouns can be visible (بارز) or hidden (مستتر) within the verb.',
      body: `## Nominative Pronouns (الضمير المرفوع)

A pronoun (ضَمِيرٌ) takes the place of a regular noun. Arabic pronouns are **مَبْنِيٌّ** (indeclinable) — their endings do not change based on grammatical state. Instead, there are separate pronoun forms for each grammatical state: مَرْفُوعٌ (nominative), مَنْصُوبٌ (accusative), and مَجْرُورٌ (genitive).

Each set consists of **fourteen pronouns** (صِيَغ), representing different combinations of person, gender, and number:

1. **First person (مُتَكَلِّمٌ):** The speaker — I, we
2. **Second person (مُخَاطَبٌ):** The addressee — you
3. **Third person (غَائِبٌ):** The one spoken about — he, she, they

### Two Uses of the Nominative Pronoun

A ضَمِيرٌ مَرْفُوعٌ replaces a noun in the مَرْفُوعٌ state, namely:

1. **ضَمِيرُ الْمُبْتَدَإِ** — pronouns used as the subject of a nominal sentence (مُبْتَدَأٌ). These are always **مُنْفَصِل** (detached/standalone).
2. **ضَمِيرُ الْفَاعِلِ** — pronouns used as the subject/doer of a verb (فَاعِلٌ). These are always **مُتَّصِل** (attached to the verb), either visible (بَارِزٌ) or hidden (مُسْتَتِرٌ).

### Important: No Neutral Gender

Arabic has no equivalent of English "it." Inanimate objects use **هُوَ** for masculine nouns and **هِيَ** for feminine nouns.

### Hidden vs. Visible Pronouns

- **ضَمِيرٌ مُسْتَتِرٌ (hidden):** Not visibly attached to the verb — e.g., جَلَسَ (هُوَ) means "He sat," where هُوَ is implied inside the verb.
- **ضَمِيرٌ بَارِزٌ (visible):** Visibly attached at the end of the verb — e.g., جَلَسْتُ where تُ is the visible pronoun "I."

### Verb Stays Singular with a Noun Subject

When the فَاعِلٌ is a noun (not a pronoun) placed after the verb, the verb remains in the **singular form**, even if the subject is plural:
> جَاءَ الرِّجَالُ — "The men came." (verb is singular despite plural subject)

### كَانَ and لَيْسَ with Pronoun Subjects

The اسْمُ of كَانَ and لَيْسَ is مَرْفُوعٌ. Its pronoun takes the same form as ضَمِيرُ الْفَاعِلِ but is labelled as اسْمٌ, not فَاعِلٌ.

### The Imperative (الأمر) and Negative Imperative (النهي)

The imperative is made from the مُخَاطَب form of the مُضَارِع in its مَجْزُوم state by removing the تَ prefix. If the resulting letter has a سُكُون, a هَمْزَةُ الْوَصْلِ is added. The negative imperative uses لَا + مُضَارِع مَجْزُوم.`,
      rules: [
        {
          arabic: 'الضمائر مبنية لا تتغير أواخرها',
          english: 'Pronouns are indeclinable (مَبْنِيٌّ) — their endings do not change. Instead, separate pronoun forms exist for each grammatical state.',
          examples: [
            { arabic: 'أَنَا طَالِبٌ', translation: 'I am a student', irab: 'أَنَا: ضمير مرفوع منفصل (detached nominative pronoun) — مبتدأ' },
            { arabic: 'هُوَ كَبِيرٌ', translation: 'He/It is big', irab: 'هُوَ: ضمير مرفوع منفصل — مبتدأ' },
          ],
        },
        {
          arabic: 'ضمير الفاعل إما مستتر أو بارز',
          english: 'The subject pronoun of a verb is either hidden (مُسْتَتِر — implied within the verb) or visible (بَارِز — attached to the end of the verb).',
          examples: [
            { arabic: 'ذَهَبَ', translation: 'He went', irab: 'ضمير الفاعل مستتر (هُوَ) — hidden pronoun' },
            { arabic: 'ذَهَبْتُ', translation: 'I went', irab: 'تُ: ضمير الفاعل بارز — visible attached pronoun' },
            { arabic: 'يَذْهَبُونَ', translation: 'They go', irab: 'و: ضمير الفاعل بارز — visible attached pronoun' },
          ],
        },
        {
          arabic: 'الفعل يبقى مفردًا إذا تقدم على الفاعل الاسم',
          english: 'When the verb precedes a noun subject, the verb stays in singular form even if the subject is plural.',
          examples: [
            { arabic: 'جَاءَ الرِّجَالُ', translation: 'The men came', irab: 'جَاءَ: singular verb despite plural subject الرِّجَالُ' },
          ],
        },
        {
          arabic: 'اسم كان وليس يأخذ شكل ضمير الفاعل',
          english: 'The subject of كَانَ and لَيْسَ takes the same pronoun form as ضمير الفاعل but is labelled اسم, not فاعل.',
          examples: [
            { arabic: 'كَانُوا ظَالِمِينَ', translation: 'They were oppressors', irab: 'و: اسم كان (not فاعل) — خبر كان: ظَالِمِينَ' },
            { arabic: 'لَسْتُ كَاذِبًا', translation: 'I am not a liar', irab: 'تُ: اسم ليس — خبر ليس: كَاذِبًا' },
          ],
        },
      ],
      tables: [
        {
          title: 'Detached Nominative Pronouns (ضمير المبتدأ)',
          titleAr: 'ضمير المبتدأ المنفصل',
          headers: ['Person', 'Arabic', 'English'],
          rows: [
            ['3rd m. sing.', 'هُوَ', 'He / It'],
            ['3rd m. dual', 'هُمَا', 'They (m/d)'],
            ['3rd m. pl.', 'هُمْ', 'They (m/p)'],
            ['3rd f. sing.', 'هِيَ', 'She / It'],
            ['3rd f. dual', 'هُمَا', 'They (f/d)'],
            ['3rd f. pl.', 'هُنَّ', 'They (f/p)'],
            ['2nd m. sing.', 'أَنْتَ', 'You (m/s)'],
            ['2nd m. dual', 'أَنْتُمَا', 'You (m/d)'],
            ['2nd m. pl.', 'أَنْتُمْ', 'You (m/p)'],
            ['2nd f. sing.', 'أَنْتِ', 'You (f/s)'],
            ['2nd f. dual', 'أَنْتُمَا', 'You (f/d)'],
            ['2nd f. pl.', 'أَنْتُنَّ', 'You (f/p)'],
            ['1st sing.', 'أَنَا', 'I'],
            ['1st pl.', 'نَحْنُ', 'We'],
          ],
        },
        {
          title: 'Attached Subject Pronouns in Past and Present Tense',
          titleAr: 'ضمير الفاعل المتصل في الماضي والمضارع',
          headers: ['Person', 'Past (الماضي)', 'Present (المضارع)'],
          rows: [
            ['He', 'فَعَلَ (هُوَ)', 'يَفْعَلُ (هُوَ)'],
            ['They m/d', 'فَعَلَا (ا)', 'يَفْعَلَانِ (ا)'],
            ['They m/p', 'فَعَلُوا (و)', 'يَفْعَلُونَ (و)'],
            ['She', 'فَعَلَتْ (هِيَ)', 'تَفْعَلُ (هِيَ)'],
            ['They f/d', 'فَعَلَتَا (ا)', 'تَفْعَلَانِ (ا)'],
            ['They f/p', 'فَعَلْنَ (نَ)', 'يَفْعَلْنَ (نَ)'],
            ['You m/s', 'فَعَلْتَ (تَ)', 'تَفْعَلُ (أَنْتَ)'],
            ['You m/d', 'فَعَلْتُمَا (تُمَا)', 'تَفْعَلَانِ (ا)'],
            ['You m/p', 'فَعَلْتُمْ (تُمْ)', 'تَفْعَلُونَ (و)'],
            ['You f/s', 'فَعَلْتِ (تِ)', 'تَفْعَلِينَ (ي)'],
            ['You f/d', 'فَعَلْتُمَا (تُمَا)', 'تَفْعَلَانِ (ا)'],
            ['You f/p', 'فَعَلْتُنَّ (تُنَّ)', 'تَفْعَلْنَ (نَ)'],
            ['I', 'فَعَلْتُ (تُ)', 'أَفْعَلُ (أَنَا)'],
            ['We', 'فَعَلْنَا (نَا)', 'نَفْعَلُ (نَحْنُ)'],
          ],
        },
        {
          title: 'Imperative and Negative Imperative',
          titleAr: 'الأمر والنهي',
          headers: ['Person', 'Imperative (الأمر)', 'Negative Imperative (النهي)'],
          rows: [
            ['You m/s', 'اِفْعَلْ', 'لَا تَفْعَلْ'],
            ['You m/d', 'اِفْعَلَا', 'لَا تَفْعَلَا'],
            ['You m/p', 'اِفْعَلُوا', 'لَا تَفْعَلُوا'],
            ['You f/s', 'اِفْعَلِي', 'لَا تَفْعَلِي'],
            ['You f/d', 'اِفْعَلَا', 'لَا تَفْعَلَا'],
            ['You f/p', 'اِفْعَلْنَ', 'لَا تَفْعَلْنَ'],
          ],
        },
      ],
      sourceRef: 'FSTU Arabic, Unit 4, pp 296-335',
    },
  ],
  relatedTopicIds: ['damir-mansub', 'damir-majrur', 'fi-l-madi', 'fi-l-mudari', 'kaana-laysa'],
  tags: ['damir', 'pronoun', 'marfu', 'nominative', 'fa-il', 'mubtada', 'hidden pronoun', 'visible pronoun', 'imperative'],
};

export const damirMansub: NahwTopic = {
  id: 'damir-mansub',
  titleAr: 'الضمير المنصوب',
  titleEn: 'Accusative Pronouns',
  transliteration: 'ad-Damir al-Mansub',
  categoryId: 'pronouns',
  subcategoryId: 'personal-pronouns',
  levels: [
    {
      difficulty: 'beginner',
      summary: 'Accusative pronouns (ضمير منصوب) replace nouns in the mansub state. They serve as the object of a verb (ضمير المفعول به) or as the subject of إنّ (اسم إنّ). They can be attached (متصل) or detached (منفصل) using the إيّا prefix.',
      body: `## Accusative Pronouns (الضمير المنصوب)

A **ضَمِيرٌ مَنْصُوبٌ** replaces a noun in the مَنْصُوب state. There are two categories:

1. **ضَمِيرُ الْمَفْعُولِ بِهِ** — object pronoun (replaces the direct object of a verb)
2. **ضَمِيرُ اسْمِ إِنَّ** — pronoun as the subject of إِنَّ and its sisters

### Attached Object Pronouns

Object pronouns attach directly to the verb. When the subject is a regular noun, the object pronoun comes **before** the noun subject:
> خَلَقَكَ اللهُ — "Allah created you."

A complete sentence can appear as a single unit with both subject and object pronouns:
> سَمِعْتُكَ — "I heard you." (سَمِعَ + تُ [subject] + كَ [object])

### Attached Pronouns with إنّ

When the subject of إِنَّ is a pronoun, it attaches directly:
> إِنَّهُ صَادِقٌ — "Indeed, he is truthful."

### Detached Accusative Pronouns (إيّا)

The detached مَنْصُوب pronoun is formed with the prefix **إِيَّا**:
> إِيَّاكَ نَعْبُدُ — "You alone do we worship." (Quran 1:5)

The detached form is used in four situations:
1. As a second object when the verb already has an attached object
2. As a fronted object (مَفْعُول بِهِ مُقَدَّم) for emphasis
3. After إِلَّا for emphasis or exclusion
4. As a conjoined element (مَعْطُوف) to a مَنْصُوب noun`,
      rules: [
        {
          arabic: 'ضمير المفعول به يتصل بالفعل مباشرة',
          english: 'The object pronoun attaches directly to the verb. When the subject is a noun (not a pronoun), the object comes before the subject.',
          examples: [
            { arabic: 'خَلَقَكَ اللهُ', translation: 'Allah created you', irab: 'كَ: ضمير المفعول به متصل بالفعل — اللهُ: فاعل' },
            { arabic: 'سَمِعْتُكَ', translation: 'I heard you', irab: 'تُ: ضمير الفاعل — كَ: ضمير المفعول به' },
          ],
        },
        {
          arabic: 'اسم إنّ إذا كان ضميرًا يتصل بإنّ',
          english: 'When the subject of إنّ is a pronoun, it attaches directly to إنّ.',
          examples: [
            { arabic: 'إِنَّهُ صَادِقٌ', translation: 'Indeed, he is truthful', irab: 'هُ: اسم إنّ — صَادِقٌ: خبر إنّ' },
            { arabic: 'إِنَّكُمْ مُسْلِمُونَ', translation: 'Indeed, you are Muslims', irab: 'كُمْ: اسم إنّ — مُسْلِمُونَ: خبر إنّ' },
          ],
        },
        {
          arabic: 'الضمير المنصوب المنفصل يكون بإيّا',
          english: 'The detached accusative pronoun is formed with إِيَّا and is used for fronted objects, after إِلَّا, or as a conjoined element.',
          examples: [
            { arabic: 'إِيَّاكَ نَعْبُدُ', translation: 'You alone do we worship', source: 'Al-Fatiha 1:5', irab: 'إِيَّاكَ: مفعول به مقدم — نَعْبُدُ: فعل وفاعل' },
            { arabic: 'رَأَيْتُكَ وَإِيَّاهُ', translation: 'I saw you and him', irab: 'إِيَّاهُ: ضمير منصوب منفصل — معطوف على كَ' },
          ],
        },
        {
          arabic: 'سَمِعَنَا وسَمِعْنَا — الفرق بالحركة',
          english: 'سَمِعَنَا (fatha on ع) means "He heard us" (نَا = object), while سَمِعْنَا (sukun on ع) means "We heard" (نَا = subject).',
          examples: [
            { arabic: 'سَمِعَنَا', translation: 'He heard us', irab: 'نَا: ضمير المفعول به' },
            { arabic: 'سَمِعْنَا', translation: 'We heard', irab: 'نَا: ضمير الفاعل' },
          ],
        },
      ],
      tables: [
        {
          title: 'Attached Accusative Pronouns',
          titleAr: 'الضمير المنصوب المتصل',
          headers: ['Person', 'As Object (المفعول به)', 'As Subject of إنّ (اسم إنّ)'],
          rows: [
            ['He/Him', 'سَمِعْتُهُ', 'إِنَّهُ'],
            ['They m/d', 'سَمِعْتُهُمَا', 'إِنَّهُمَا'],
            ['They m/p', 'سَمِعْتُهُمْ', 'إِنَّهُمْ'],
            ['She/Her', 'سَمِعْتُهَا', 'إِنَّهَا'],
            ['They f/d', 'سَمِعْتُهُمَا', 'إِنَّهُمَا'],
            ['They f/p', 'سَمِعْتُهُنَّ', 'إِنَّهُنَّ'],
            ['You m/s', 'سَمِعْتُكَ', 'إِنَّكَ'],
            ['You m/d', 'سَمِعْتُكُمَا', 'إِنَّكُمَا'],
            ['You m/p', 'سَمِعْتُكُمْ', 'إِنَّكُمْ'],
            ['You f/s', 'سَمِعْتُكِ', 'إِنَّكِ'],
            ['You f/d', 'سَمِعْتُكُمَا', 'إِنَّكُمَا'],
            ['You f/p', 'سَمِعْتُكُنَّ', 'إِنَّكُنَّ'],
            ['Me', 'سَمِعْتَنِي', 'إِنَّنِي / إِنِّي'],
            ['Us', 'سَمِعْتَنَا', 'إِنَّنَا / إِنَّا'],
          ],
        },
        {
          title: 'Detached Accusative Pronouns (إيّا)',
          titleAr: 'الضمير المنصوب المنفصل',
          headers: ['Person', 'Detached Pronoun'],
          rows: [
            ['Him', 'إِيَّاهُ'],
            ['Them m/d', 'إِيَّاهُمَا'],
            ['Them m/p', 'إِيَّاهُمْ'],
            ['Her', 'إِيَّاهَا'],
            ['Them f/d', 'إِيَّاهُمَا'],
            ['Them f/p', 'إِيَّاهُنَّ'],
            ['You m/s', 'إِيَّاكَ'],
            ['You m/d', 'إِيَّاكُمَا'],
            ['You m/p', 'إِيَّاكُمْ'],
            ['You f/s', 'إِيَّاكِ'],
            ['You f/d', 'إِيَّاكُمَا'],
            ['You f/p', 'إِيَّاكُنَّ'],
            ['Me', 'إِيَّايَ'],
            ['Us', 'إِيَّانَا'],
          ],
        },
      ],
      sourceRef: 'FSTU Arabic, Unit 4, pp 296-335',
    },
  ],
  relatedTopicIds: ['damir-marfu', 'damir-majrur', 'maf-ul-bihi', 'inna-wa-akhawat'],
  tags: ['damir', 'pronoun', 'mansub', 'accusative', 'maf-ul bihi', 'object pronoun', 'inna', 'iyya'],
};

export const damirMajrur: NahwTopic = {
  id: 'damir-majrur',
  titleAr: 'الضمير المجرور',
  titleEn: 'Genitive Pronouns',
  transliteration: 'ad-Damir al-Majrur',
  categoryId: 'pronouns',
  subcategoryId: 'personal-pronouns',
  levels: [
    {
      difficulty: 'beginner',
      summary: 'Genitive pronouns (ضمير مجرور) replace nouns in the majrur state. They are always attached (متصل) and appear in two positions: after a preposition (حرف جارّ) or as the second part of a possessive construction (مضاف إليه). Special phonological rules apply when pronouns follow certain sounds.',
      body: `## Genitive Pronouns (الضمير المجرور)

A **ضَمِيرٌ مَجْرُورٌ** replaces a noun in the مَجْرُور state. It is always **مُتَّصِل** (attached). It is used in two positions:

1. **After a حَرْفُ جَارٍّ** (preposition) — replacing the مَجْرُور noun
2. **As a مُضَافٌ إِلَيْهِ** — replacing the second element of an إِضَافَة (possessive construction)

### After a Preposition

The pronoun attaches directly to the preposition:
> ذَهَبَ الوَلَدُ إِلَيْهِ — "The child went towards him."

### As a Possessive Pronoun (مضاف إليه)

The pronoun attaches to the noun it possesses:
> صَامَتْ أُخْتُكَ — "Your sister fasted."
> هٰذَا كِتَابِي — "This is my book."

### Spelling Changes

The ألف (ى) at the end of إِلَى and عَلَى changes to ي when joined to a pronoun:
- إِلَى + pronoun → إِلَيْهِ
- عَلَى + pronoun → عَلَيْهِ

### Phonological Rule

The ضَمَّة on هُ, هُمَا, and هُمْ changes to a كَسْرَة when preceded by a يَاء or كَسْرَة:
- فِيهِ (not فِيهُ) — "in it"
- إِلَى رَبِّهِمْ (not رَبِّهُمْ) — "to their Lord"

### Recognizing Pronouns by Position

A pronoun takes different grammatical roles depending on where it appears:
- On its own → مُبْتَدَأ (subject)
- After a verb → فَاعِل (doer)
- Object pronoun on verb → مَفْعُول بِهِ (object)
- Joined to إِنَّ → اسْم إِنَّ
- Joined to a noun → مُضَاف إِلَيْهِ (possessive)
- Joined to a preposition → مَجْرُور (genitive)

### Reflexive and Reciprocal Pronouns

Arabic uses نَفْس (self) / أَنْفُس (selves) for reflexive meaning, and بَعْض...بَعْضًا for reciprocal meaning ("each other").`,
      rules: [
        {
          arabic: 'الضمير المجرور يتصل بحرف الجر أو بالمضاف',
          english: 'The genitive pronoun attaches directly to the preposition or to the noun it possesses (as مضاف إليه).',
          examples: [
            { arabic: 'ذَهَبَ إِلَيْهِ', translation: 'He went towards him', irab: 'هِ: ضمير مجرور بحرف الجر إلى' },
            { arabic: 'هٰذَا كِتَابِي', translation: 'This is my book', irab: 'ي: ضمير مجرور — مضاف إليه' },
          ],
        },
        {
          arabic: 'ألف إلى وعلى تتحول إلى ياء عند اتصالها بضمير',
          english: 'The alif at the end of إلى and على changes to ya when a pronoun is attached.',
          examples: [
            { arabic: 'إِلَيْهِ', translation: 'towards him', irab: 'إلى + هِ → إليهِ (ى becomes ي)' },
            { arabic: 'عَلَيْهِمْ', translation: 'upon them', irab: 'على + هِمْ → عليهِمْ (ى becomes ي)' },
          ],
        },
        {
          arabic: 'ضمة الهاء تتحول إلى كسرة بعد ياء أو كسرة',
          english: 'The damma on هُ, هُمَا, and هُمْ changes to kasra when preceded by a ya or kasra sound.',
          examples: [
            { arabic: 'فِيهِ', translation: 'in it', irab: 'هِ (with kasra, not damma) because preceded by ي' },
            { arabic: 'إِلَى رَبِّهِمْ', translation: 'to their Lord', irab: 'هِمْ (with kasra) because preceded by كسرة on بِّ' },
          ],
        },
        {
          arabic: 'نَفْس للانعكاس وبَعْض للتبادل',
          english: 'Use نَفْس/أَنْفُس for reflexive meaning (himself/themselves) and بَعْض...بَعْضًا for reciprocal meaning (each other).',
          examples: [
            { arabic: 'رَأَى الرَّجُلُ نَفْسَهُ', translation: 'The man saw himself', irab: 'نَفْسَهُ: reflexive pronoun — مفعول به' },
            { arabic: 'نَصَرَ بَعْضُ الأَوْلَادِ بَعْضًا', translation: 'The children helped each other', irab: 'بَعْضُ...بَعْضًا: reciprocal pronoun structure' },
          ],
        },
      ],
      tables: [
        {
          title: 'Genitive Pronouns',
          titleAr: 'الضمير المجرور',
          headers: ['Person', 'As Possessive (مضاف إليه)', 'After Preposition (حرف جارّ)'],
          rows: [
            ['His/Him', 'رَبُّهُ', 'لَهُ'],
            ['Their m/d', 'رَبُّهُمَا', 'لَهُمَا'],
            ['Their m/p', 'رَبُّهُمْ', 'لَهُمْ'],
            ['Her', 'رَبُّهَا', 'لَهَا'],
            ['Their f/d', 'رَبُّهُمَا', 'لَهُمَا'],
            ['Their f/p', 'رَبُّهُنَّ', 'لَهُنَّ'],
            ['Your m/s', 'رَبُّكَ', 'لَكَ'],
            ['Your m/d', 'رَبُّكُمَا', 'لَكُمَا'],
            ['Your m/p', 'رَبُّكُمْ', 'لَكُمْ'],
            ['Your f/s', 'رَبُّكِ', 'لَكِ'],
            ['Your f/d', 'رَبُّكُمَا', 'لَكُمَا'],
            ['Your f/p', 'رَبُّكُنَّ', 'لَكُنَّ'],
            ['My', 'رَبِّي', 'لِي'],
            ['Our', 'رَبَّنَا', 'لَنَا'],
          ],
        },
        {
          title: 'Complete Pronoun Overview by Position',
          titleAr: 'نظرة شاملة على مواقع الضمائر',
          headers: ['Position', 'Grammatical Role', 'Type'],
          rows: [
            ['Standalone', 'مبتدأ (subject)', 'منفصل مرفوع'],
            ['After verb', 'فاعل (doer)', 'متصل مرفوع'],
            ['Object on verb', 'مفعول به (object)', 'متصل منصوب'],
            ['With إيّا', 'مفعول به / اسم إنّ', 'منفصل منصوب'],
            ['Joined to إنّ', 'اسم إنّ', 'متصل منصوب'],
            ['Joined to noun', 'مضاف إليه (possessive)', 'متصل مجرور'],
            ['After preposition', 'مجرور', 'متصل مجرور'],
          ],
        },
      ],
      sourceRef: 'FSTU Arabic, Unit 4, pp 296-350',
    },
  ],
  relatedTopicIds: ['damir-marfu', 'damir-mansub', 'harf-jarr', 'idafa'],
  tags: ['damir', 'pronoun', 'majrur', 'genitive', 'possessive', 'preposition', 'mudaf ilayhi', 'reflexive', 'reciprocal'],
};
