import type { SarfTopic } from '../types';

export const verbForms: SarfTopic = {
  id: 'verb-forms',
  titleAr: 'الصِّيَغ الأربع عشرة',
  titleEn: '14 Verb Forms',
  transliteration: "as-Siyagh al-Arba' Ashara",
  categoryId: 'fundamentals',
  subcategoryId: 'verb-structure',
  levels: [
    {
      difficulty: 'beginner',
      summary: 'Arabic verbs conjugate into 14 forms (siyagh) based on person, gender, and number. These 14 forms cover third person (ghaa\'ib), second person (mukhatabah), and first person (mutakallim).',
      body: `## The 14 Verb Forms (الصِّيَغ)

Every Arabic verb can be conjugated into **14 forms** based on three factors:
- **Person**: 3rd person (غائب), 2nd person (مُخاطَب), 1st person (مُتكلِّم)
- **Gender**: Masculine (مذكر) and Feminine (مؤنث)
- **Number**: Singular (مفرد), Dual (مثنى), Plural (جمع)

### The Scale (الميزان)
Every triliteral verb is measured against the root فَعَلَ:
- **ف** (Faa) = 1st root letter
- **ع** (Ayn) = 2nd root letter
- **ل** (Lam) = 3rd root letter

For example, فَتَحَ has the root letters ف-ت-ح mapped to ف-ع-ل.`,
      rules: [
        {
          arabic: 'كل فعل ثلاثي يُقاس على ميزان فَعَلَ',
          english: 'Every triliteral verb is measured on the scale of fa\'ala (فَعَلَ), where faa, ayn, and lam represent the root letters.',
          examples: [
            { arabic: 'فَتَحَ', translation: 'he opened', irab: 'ف=ف، ت=ع، ح=ل' },
            { arabic: 'نَصَرَ', translation: 'he helped', irab: 'ن=ف، ص=ع، ر=ل' },
          ],
        },
        {
          arabic: 'الصيغ الأربع عشرة تشمل الغائب والمخاطب والمتكلم',
          english: 'The 14 forms cover all combinations of person (3rd, 2nd, 1st), gender, and number.',
        },
      ],
      tables: [
        {
          title: '14 Forms of فَتَحَ (Past Tense)',
          titleAr: 'صيغ الماضي من فَتَحَ',
          headers: ['#', 'Person', 'Arabic', 'Translation'],
          rows: [
            ['1', '3rd masc. sg.', 'فَتَحَ', 'he opened'],
            ['2', '3rd masc. dual', 'فَتَحَا', 'they two (m) opened'],
            ['3', '3rd masc. pl.', 'فَتَحُوا', 'they (m) opened'],
            ['4', '3rd fem. sg.', 'فَتَحَتْ', 'she opened'],
            ['5', '3rd fem. dual', 'فَتَحَتَا', 'they two (f) opened'],
            ['6', '3rd fem. pl.', 'فَتَحْنَ', 'they (f) opened'],
            ['7', '2nd masc. sg.', 'فَتَحْتَ', 'you (m) opened'],
            ['8', '2nd masc. dual', 'فَتَحْتُمَا', 'you two opened'],
            ['9', '2nd masc. pl.', 'فَتَحْتُمْ', 'you (m.pl) opened'],
            ['10', '2nd fem. sg.', 'فَتَحْتِ', 'you (f) opened'],
            ['11', '2nd fem. dual', 'فَتَحْتُمَا', 'you two (f) opened'],
            ['12', '2nd fem. pl.', 'فَتَحْتُنَّ', 'you (f.pl) opened'],
            ['13', '1st sg.', 'فَتَحْتُ', 'I opened'],
            ['14', '1st pl.', 'فَتَحْنَا', 'we opened'],
          ],
        },
      ],
      sourceRef: 'FSTU Sarf, Pages 15-76',
    },
    {
      difficulty: 'intermediate',
      summary: 'The 14 forms apply to every tense: past (maadi), present (mudaari), command (amr), and prohibition (nahi). Each tense has its own voweling pattern. The present tense adds prefix letters (حروف المضارعة): أ، ن، ي، ت.',
      body: `## Applying the 14 Forms Across Tenses

The same 14-person framework applies to all tenses:

### Present Tense Prefix Letters (حروف المضارعة)
The present tense adds one of four prefix letters: **أ، ن، ي، ت** (remembered as أَنَيْتُ).

### Tense Patterns for باب فَتَحَ
- **Past**: فَتَحَ (fatha throughout)
- **Present**: يَفْتَحُ (prefix + sukun on faa + fatha on ayn)
- **Command**: اِفْتَحْ (hamzatul-wasl + sukun)
- **Prohibition**: لَا تَفْتَحْ (laa + present with jazm)`,
      rules: [
        {
          arabic: 'حروف المضارعة أربعة: أ ن ي ت',
          english: 'The present tense uses four prefix letters: hamza (I), nun (we), ya (he/they), ta (she/you).',
        },
        {
          arabic: 'الأمر يُبنى من المضارع المجزوم',
          english: 'The command form is built from the jussive (majzoom) present tense by removing the prefix letter.',
        },
      ],
      tables: [
        {
          title: '14 Forms of يَفْتَحُ (Present Tense)',
          titleAr: 'صيغ المضارع من فَتَحَ',
          headers: ['#', 'Person', 'Arabic', 'Translation'],
          rows: [
            ['1', '3rd masc. sg.', 'يَفْتَحُ', 'he opens'],
            ['2', '3rd masc. dual', 'يَفْتَحَانِ', 'they two (m) open'],
            ['3', '3rd masc. pl.', 'يَفْتَحُونَ', 'they (m) open'],
            ['4', '3rd fem. sg.', 'تَفْتَحُ', 'she opens'],
            ['5', '3rd fem. dual', 'تَفْتَحَانِ', 'they two (f) open'],
            ['6', '3rd fem. pl.', 'يَفْتَحْنَ', 'they (f) open'],
            ['7', '2nd masc. sg.', 'تَفْتَحُ', 'you (m) open'],
            ['8', '2nd masc. dual', 'تَفْتَحَانِ', 'you two open'],
            ['9', '2nd masc. pl.', 'تَفْتَحُونَ', 'you (m.pl) open'],
            ['10', '2nd fem. sg.', 'تَفْتَحِينَ', 'you (f) open'],
            ['11', '2nd fem. dual', 'تَفْتَحَانِ', 'you two (f) open'],
            ['12', '2nd fem. pl.', 'تَفْتَحْنَ', 'you (f.pl) open'],
            ['13', '1st sg.', 'أَفْتَحُ', 'I open'],
            ['14', '1st pl.', 'نَفْتَحُ', 'we open'],
          ],
        },
      ],
      sourceRef: 'FSTU Sarf, Pages 15-76',
    },
    {
      difficulty: 'advanced',
      summary: 'Advanced study covers the الأفعال الخمسة (five verbs with special endings), the full التصريف الكبير (complete conjugation), and comparison of how the 14 forms behave differently across sound verbs, weak verbs, and hamzah verbs.',
      body: `## Advanced Verb Form Analysis

### الأفعال الخمسة (The Five Verbs)
Five specific present-tense forms have special declension — they end in نِ which drops in the jussive and subjunctive:
1. يَفْعَلَانِ (3rd masc. dual)
2. تَفْعَلَانِ (3rd fem. dual / 2nd dual)
3. يَفْعَلُونَ (3rd masc. pl.)
4. تَفْعَلُونَ (2nd masc. pl.)
5. تَفْعَلِينَ (2nd fem. sg.)

### Declension States
- **Nominative (مرفوع)**: يَفْتَحُونَ — indicated by ثبوت النون
- **Accusative (منصوب)**: لَنْ يَفْتَحُوا — indicated by حذف النون
- **Jussive (مجزوم)**: لَمْ يَفْتَحُوا — indicated by حذف النون

### التصريف الكبير
The full conjugation includes all 14 forms × active/passive × all tenses/states.`,
      rules: [
        {
          arabic: 'الأفعال الخمسة ترفع بثبوت النون وتنصب وتجزم بحذفها',
          english: 'The five verbs are raised by keeping the noon, and are put in accusative/jussive by dropping it.',
          examples: [
            { arabic: 'يَكْتُبُونَ', translation: 'they write (marfoo\')', irab: 'Raised by presence of noon' },
            { arabic: 'لَنْ يَكْتُبُوا', translation: 'they will not write', irab: 'Accusative by dropping noon' },
            { arabic: 'لَمْ يَكْتُبُوا', translation: 'they did not write', irab: 'Jussive by dropping noon' },
          ],
        },
      ],
      sourceRef: 'FSTU Sarf, Pages 15-76',
    },
  ],
  relatedTopicIds: ['past-tense', 'present-tense', 'abwab-overview'],
  tags: ['siyagh', 'conjugation', 'forms', '14 forms', 'mizan', 'scale'],
};

export const pastTense: SarfTopic = {
  id: 'past-tense',
  titleAr: 'الماضي',
  titleEn: 'Past Tense',
  transliteration: 'al-Maadi',
  categoryId: 'fundamentals',
  subcategoryId: 'verb-structure',
  levels: [
    {
      difficulty: 'beginner',
      summary: 'The past tense (الماضي) indicates an action completed in the past. It is مَبْنِيّ (non-declinable) — its ending vowels are fixed regardless of grammatical position.',
      body: `## The Past Tense (الماضي)

The past tense verb indicates an action that has been completed. It is always **مَبْنِيّ** (indeclinable) — meaning its endings do not change based on grammatical case.

### Building Rules
- Built on **فَتْحَة** (fatha) by default: فَتَحَ
- Built on **ضَمَّة** when followed by واو الجماعة: فَتَحُوا
- Built on **سُكُون** when followed by a consonant pronoun: فَتَحْتُ`,
      rules: [
        {
          arabic: 'الماضي مبني دائمًا',
          english: 'The past tense is always indeclinable (mabni) — its form does not change with grammatical position.',
          examples: [
            { arabic: 'فَتَحَ', translation: 'he opened', irab: 'مبني على الفتح' },
            { arabic: 'فَتَحُوا', translation: 'they opened', irab: 'مبني على الضم لاتصاله بواو الجماعة' },
            { arabic: 'فَتَحْتُ', translation: 'I opened', irab: 'مبني على السكون لاتصاله بضمير رفع متحرك' },
          ],
        },
      ],
      tables: [
        {
          title: 'Past Tense Conjugation — باب فَتَحَ',
          titleAr: 'تصريف الماضي المعلوم',
          headers: ['Person', 'Active', 'Passive'],
          rows: [
            ['3rd m. sg.', 'فَتَحَ', 'فُتِحَ'],
            ['3rd m. dual', 'فَتَحَا', 'فُتِحَا'],
            ['3rd m. pl.', 'فَتَحُوا', 'فُتِحُوا'],
            ['3rd f. sg.', 'فَتَحَتْ', 'فُتِحَتْ'],
            ['3rd f. dual', 'فَتَحَتَا', 'فُتِحَتَا'],
            ['3rd f. pl.', 'فَتَحْنَ', 'فُتِحْنَ'],
            ['1st sg.', 'فَتَحْتُ', 'فُتِحْتُ'],
            ['1st pl.', 'فَتَحْنَا', 'فُتِحْنَا'],
          ],
        },
      ],
      sourceRef: 'FSTU Sarf, Pages 15-30',
    },
    {
      difficulty: 'intermediate',
      summary: 'The past tense passive (المبني للمجهول) is formed by changing the internal vowel pattern: the first letter gets damma and the letter before the last gets kasra. This applies across all six abwab.',
      body: `## Passive Voice in the Past Tense

### Formation Rule
To form the passive past tense (الماضي المجهول):
- **First letter**: ضَمَّة (damma)
- **Letter before last**: كَسْرَة (kasra)

### Examples Across the Abwab
- فَتَحَ → فُتِحَ (it was opened)
- سَمِعَ → سُمِعَ (it was heard)
- ضَرَبَ → ضُرِبَ (it was struck)
- نَصَرَ → نُصِرَ (it was helped)`,
      rules: [
        {
          arabic: 'الماضي المجهول يُضم أوله ويُكسر ما قبل آخره',
          english: 'The passive past is formed by giving damma to the first letter and kasra to the letter before the last.',
          examples: [
            { arabic: 'فَتَحَ → فُتِحَ', translation: 'opened → was opened' },
            { arabic: 'كَتَبَ → كُتِبَ', translation: 'wrote → was written' },
          ],
        },
      ],
      sourceRef: 'FSTU Sarf, Pages 15-30',
    },
    {
      difficulty: 'advanced',
      summary: 'Advanced past tense study includes negation with مَا and لَمْ, the use of قَدْ for emphasis or near-past, and the detailed rules for the past tense of weak and hamzah verbs where internal vowel changes occur.',
      body: `## Advanced Past Tense

### Negation of the Past
1. **مَا + ماضي**: مَا فَتَحَ (he did not open) — direct negation
2. **لَمْ + مضارع مجزوم**: لَمْ يَفْتَحْ (he did not open) — past meaning via present form

### قَدْ with the Past
- **قَدْ + ماضي**: قَدْ فَتَحَ — emphasizes completion or indicates near-past
- Quranic: قَدْ أَفْلَحَ المُؤْمِنُونَ (The believers have indeed succeeded)

### Passive Past in Weak Verbs
- **Ajwaf**: قَالَ → قِيلَ (the middle letter changes to kasra)
- **Naqis**: دَعَا → دُعِيَ (the final letter changes)`,
      rules: [
        {
          arabic: 'الأجوف في المجهول تُقلب عينه',
          english: 'In hollow (ajwaf) verbs, the passive past changes the middle radical.',
          examples: [
            { arabic: 'قَالَ → قِيلَ', translation: 'he said → it was said' },
            { arabic: 'بَاعَ → بِيعَ', translation: 'he sold → it was sold' },
          ],
        },
      ],
      sourceRef: 'FSTU Sarf, Pages 15-30',
    },
  ],
  relatedTopicIds: ['verb-forms', 'present-tense', 'passive-voice'],
  tags: ['maadi', 'past', 'tense', 'mabni', 'conjugation'],
};

export const presentTense: SarfTopic = {
  id: 'present-tense',
  titleAr: 'المضارع',
  titleEn: 'Present Tense',
  transliteration: 'al-Mudaari\'',
  categoryId: 'fundamentals',
  subcategoryId: 'verb-structure',
  levels: [
    {
      difficulty: 'beginner',
      summary: 'The present tense (المضارع) indicates an ongoing or future action. Unlike the past tense, it is مُعْرَب (declinable) — its ending changes based on grammatical state: marfoo\' (ـُ), mansoob (ـَ), or majzoom (ـْ).',
      body: `## The Present Tense (المضارع)

The present tense indicates an action happening now or in the future. It is **مُعْرَب** (declinable) — its ending changes with grammatical state.

### Three States of the Present Tense
1. **مرفوع** (Nominative): يَفْتَحُ — default state, ending with damma
2. **منصوب** (Accusative): لَنْ يَفْتَحَ — after لَنْ and other naasib particles
3. **مجزوم** (Jussive): لَمْ يَفْتَحْ — after لَمْ and other jaazim particles

### Prefix Letters (حروف المضارعة)
Remembered by the word **أَنَيْتُ**: أ (I), ن (we), ي (he/they), ت (she/you).`,
      rules: [
        {
          arabic: 'المضارع معرب يرفع بالضمة وينصب بالفتحة ويجزم بالسكون',
          english: 'The present tense is declinable: raised with damma, accusative with fatha, jussive with sukoon.',
          examples: [
            { arabic: 'يَفْتَحُ', translation: 'he opens (default/marfoo\')' },
            { arabic: 'لَنْ يَفْتَحَ', translation: 'he will not open (mansoob)' },
            { arabic: 'لَمْ يَفْتَحْ', translation: 'he did not open (majzoom)' },
          ],
        },
      ],
      sourceRef: 'FSTU Sarf, Pages 15-30',
    },
    {
      difficulty: 'intermediate',
      summary: 'The present tense passive (المضارع المجهول) is formed by adding damma to the prefix letter and fatha to the letter before the last. Negation uses مَا/لَا for present and لَنْ for emphatic future negative.',
      body: `## Present Tense Details

### Passive Present Formation
- **Prefix letter**: ضَمَّة (damma)
- **Letter before last**: فَتْحَة (fatha)
- يَفْتَحُ → يُفْتَحُ (it is opened)

### Negation
- **مَا + مضارع**: مَا يَفْتَحُ (he does not open — present/habitual)
- **لَا + مضارع**: لَا يَفْتَحُ (he does not open — continuous/future)
- **لَنْ + مضارع منصوب**: لَنْ يَفْتَحَ (he will never open — emphatic future)`,
      rules: [
        {
          arabic: 'المضارع المجهول يُضم أوله ويُفتح ما قبل آخره',
          english: 'The passive present has damma on the prefix and fatha on the pre-final letter.',
          examples: [
            { arabic: 'يَفْتَحُ → يُفْتَحُ', translation: 'he opens → it is opened' },
            { arabic: 'يَكْتُبُ → يُكْتَبُ', translation: 'he writes → it is written' },
          ],
        },
      ],
      sourceRef: 'FSTU Sarf, Pages 15-30',
    },
    {
      difficulty: 'advanced',
      summary: 'Advanced present tense study covers the الأفعال الخمسة (five special forms raised by keeping noon), naasib particles (أَنْ، لَنْ، كَيْ، إِذَنْ), jaazim particles (لَمْ، لَمَّا، لام الأمر، لا الناهية), and conditional structures.',
      body: `## Advanced Present Tense

### الأفعال الخمسة and Their Declension
The "five verbs" end in ن which drops in mansoob/majzoom:
- **Marfoo'**: يَفْتَحُونَ (noon present = sign of raf')
- **Mansoob**: لَنْ يَفْتَحُوا (noon drops = sign of nasb)
- **Majzoom**: لَمْ يَفْتَحُوا (noon drops = sign of jazm)

### Naasib Particles (حروف النصب)
أَنْ، لَنْ، كَيْ، إِذَنْ — put the mudaari' in the accusative state.

### Jaazim Particles (حروف الجزم)
لَمْ، لَمَّا، لام الأمر، لا الناهية — put the mudaari' in the jussive state.`,
      rules: [
        {
          arabic: 'حروف النصب: أَنْ ولَنْ وكَيْ وإِذَنْ',
          english: 'The naasib particles that put the present tense in the accusative are: an, lan, kay, idhan.',
        },
        {
          arabic: 'حروف الجزم: لَمْ ولَمَّا ولام الأمر ولا الناهية',
          english: 'The jaazim particles that put the present tense in the jussive are: lam, lammaa, laam al-amr, laa an-naahiya.',
        },
      ],
      sourceRef: 'FSTU Sarf, Pages 15-76',
    },
  ],
  relatedTopicIds: ['verb-forms', 'past-tense', 'irab-mudari'],
  tags: ['mudaari', 'present', 'tense', 'mu\'rab', 'declinable'],
};
