import type { SarfTopic } from '../types';

export const passiveVoice: SarfTopic = {
  id: 'passive-voice',
  titleAr: 'المبني للمجهول',
  titleEn: 'Passive Voice',
  transliteration: 'al-Mabni lil-Majhool',
  categoryId: 'fundamentals',
  subcategoryId: 'verb-operations',
  levels: [
    {
      difficulty: 'beginner',
      summary: 'The passive voice (المبني للمجهول) is used when the doer is unknown or unmentioned. The verb\'s internal vowels change: past tense gets ضُمّ-كُسر, present tense gets ضُمّ-فُتح.',
      body: `## The Passive Voice (المبني للمجهول)

When the doer (فاعل) of an action is unknown or intentionally hidden, the verb is put in the passive voice. The object becomes the **نائب الفاعل** (deputy subject).

### Formation
- **Past**: ضُمَّ أوله وكُسِرَ ما قبل آخره → فُعِلَ
- **Present**: ضُمَّ أوله وفُتِحَ ما قبل آخره → يُفْعَلُ`,
      rules: [
        {
          arabic: 'الماضي المجهول: ضُمَّ أوله وكُسر ما قبل آخره',
          english: 'Passive past: damma on first letter, kasra on pre-final letter.',
          examples: [
            { arabic: 'فَتَحَ → فُتِحَ', translation: 'he opened → it was opened' },
            { arabic: 'كَتَبَ → كُتِبَ', translation: 'he wrote → it was written' },
          ],
        },
        {
          arabic: 'المضارع المجهول: ضُمَّ أوله وفُتح ما قبل آخره',
          english: 'Passive present: damma on prefix letter, fatha on pre-final letter.',
          examples: [
            { arabic: 'يَفْتَحُ → يُفْتَحُ', translation: 'he opens → it is opened' },
            { arabic: 'يَكْتُبُ → يُكْتَبُ', translation: 'he writes → it is written' },
          ],
        },
      ],
      sourceRef: 'FSTU Sarf, Pages 15-30',
    },
    {
      difficulty: 'intermediate',
      summary: 'The passive voice applies to all six abwab and all derived forms. In enhanced forms (المزيد فيه), only the first letter gets damma and the pre-final gets kasra (past) or fatha (present).',
      body: `## Passive Voice Across Verb Forms

### Enhanced Forms (المزيد فيه)
- **Form II**: عَلَّمَ → عُلِّمَ / يُعَلَّمُ
- **Form IV**: أَرْسَلَ → أُرْسِلَ / يُرْسَلُ
- **Form X**: اسْتَخْرَجَ → اُسْتُخْرِجَ / يُسْتَخْرَجُ`,
      rules: [
        {
          arabic: 'المزيد فيه يُضم أوله ويُكسر ما قبل آخره في الماضي',
          english: 'In enhanced forms, passive past has damma on first, kasra on pre-final.',
          examples: [
            { arabic: 'أَكْرَمَ → أُكْرِمَ', translation: 'he honored → he was honored' },
            { arabic: 'اسْتَغْفَرَ → اُسْتُغْفِرَ', translation: 'he sought forgiveness → forgiveness was sought' },
          ],
        },
      ],
      sourceRef: 'FSTU Sarf, Pages 15-60',
    },
    {
      difficulty: 'advanced',
      summary: 'Advanced passive study covers weak verb passive forms where vowel changes interact: ajwaf verbs change to kasra (قَالَ→قِيلَ), naqis verbs change final letters, and the distinction between مبني للمفعول and مبني للمجهول terminology.',
      body: `## Advanced Passive Voice

### Weak Verb Passives
- **Ajwaf (hollow)**: قَالَ → قِيلَ / يُقَالُ (middle changes to kasra)
- **Naqis waawi**: دَعَا → دُعِيَ / يُدْعَى
- **Naqis ya'i**: رَمَى → رُمِيَ / يُرْمَى
- **Mudaaf**: رَدَّ → رُدَّ / يُرَدُّ`,
      rules: [
        {
          arabic: 'الأجوف في المجهول تصير عينه كسرة في الماضي',
          english: 'Hollow verbs in passive past change middle to kasra: qawala → qeela.',
          examples: [
            { arabic: 'قَالَ → قِيلَ', translation: 'he said → it was said' },
            { arabic: 'بَاعَ → بِيعَ', translation: 'he sold → it was sold' },
          ],
        },
      ],
      sourceRef: 'FSTU Sarf, Pages 15-76',
    },
  ],
  relatedTopicIds: ['past-tense', 'present-tense', 'participles'],
  tags: ['passive', 'majhool', 'voice', 'naib al-fail'],
};

export const negationCommands: SarfTopic = {
  id: 'negation-commands',
  titleAr: 'النفي والأمر والنهي',
  titleEn: 'Negation & Commands',
  transliteration: 'an-Nafy wal-Amr wan-Nahy',
  categoryId: 'fundamentals',
  subcategoryId: 'verb-operations',
  levels: [
    {
      difficulty: 'beginner',
      summary: 'Arabic verbs are negated with specific particles: مَا for past, لَا for present, and لَنْ for future. Commands use the imperative (أمر) and prohibitions use لَا + مضارع مجزوم.',
      body: `## Negation, Commands & Prohibitions

### Negation Particles
- **مَا + ماضي**: مَا فَعَلَ (he did not do)
- **لَا + مضارع**: لَا يَفْعَلُ (he does not do)
- **لَنْ + مضارع منصوب**: لَنْ يَفْعَلَ (he will never do)
- **لَمْ + مضارع مجزوم**: لَمْ يَفْعَلْ (he did not do)

### Command (الأمر)
The command is formed from the **مضارع مجزوم** by:
1. Removing the prefix letter
2. Adding همزة الوصل if needed

### Prohibition (النهي)
Formed with **لَا الناهية + مضارع مجزوم**: لَا تَفْعَلْ (don't do!)`,
      rules: [
        {
          arabic: 'الأمر يُبنى من المضارع المجزوم بحذف حرف المضارعة',
          english: 'The command is formed from the jussive present by dropping the prefix letter.',
          examples: [
            { arabic: 'يَفْتَحُ → لَمْ يَفْتَحْ → اِفْتَحْ', translation: 'he opens → he didn\'t open → open!' },
          ],
        },
        {
          arabic: 'النهي بلا الناهية مع المضارع المجزوم',
          english: 'Prohibition uses لَا + jussive present tense.',
          examples: [
            { arabic: 'لَا تَفْتَحْ', translation: 'don\'t open!' },
            { arabic: 'لَا تَكْتُبْ', translation: 'don\'t write!' },
          ],
        },
      ],
      sourceRef: 'FSTU Sarf, Pages 41-60',
    },
    {
      difficulty: 'intermediate',
      summary: 'Command formation has special rules: when the second root letter has sukoon, a hamzatul-wasl is added. Its vowel depends on the baab: kasra for abwab 1-3, damma for baab 4 (nasara).',
      body: `## Detailed Command Formation

### Hamzatul-Wasl Vowel
- **Kasra** for abwab with fatha/kasra on ayn: اِفْتَحْ, اِسْمَعْ, اِضْرِبْ
- **Damma** for baab nasara (damma on ayn): اُنْصُرْ

### Special Cases
- If the second letter already has a vowel, no hamzah is needed
- The four verbs that drop hamzah entirely: كُلْ، خُذْ، مُرْ (and sometimes سَلْ)`,
      rules: [
        {
          arabic: 'همزة الوصل تُكسر إلا في باب نَصَرَ فتُضم',
          english: 'Hamzatul-wasl has kasra except in baab nasara where it has damma.',
          examples: [
            { arabic: 'اِفْتَحْ', translation: 'open! (kasra — baab fataha)' },
            { arabic: 'اُنْصُرْ', translation: 'help! (damma — baab nasara)' },
          ],
        },
      ],
      sourceRef: 'FSTU Sarf, Pages 41-60',
    },
    {
      difficulty: 'advanced',
      summary: 'Advanced topics include the nuances between مَا and لَمْ for past negation, the use of لَمَّا for "not yet," emphatic commands with نون التوكيد, and the difference between لَا الناهية and لَا النافية.',
      body: `## Advanced Negation & Commands

### Negation Nuances
- **مَا فَعَلَ**: Simple past negation, no effect on verb form
- **لَمْ يَفْعَلْ**: Past negation using present form + jazm
- **لَمَّا يَفْعَلْ**: "He has not yet done" — implies expectation

### Emphatic Commands
- **نون التوكيد الثقيلة**: اِفْتَحَنَّ (definitely open!)
- **نون التوكيد الخفيفة**: اِفْتَحَنْ (open! — lighter emphasis)

### Multiple Negation Distinctions
- **لَا النافية**: لَا يَفْعَلُ (does not do — no case change)
- **لَا الناهية**: لَا تَفْعَلْ (don't do! — causes jazm)`,
      rules: [
        {
          arabic: 'لَمَّا تفيد نفي الماضي مع توقع الحصول',
          english: 'Lammaa negates the past while implying the action is still expected.',
          examples: [
            { arabic: 'لَمَّا يَحْضُرْ', translation: 'he has not yet arrived (but is expected)' },
          ],
        },
      ],
      sourceRef: 'FSTU Sarf, Pages 41-60',
    },
  ],
  relatedTopicIds: ['present-tense', 'irab-mudari', 'noon-tawkeed'],
  tags: ['negation', 'command', 'prohibition', 'amr', 'nahy', 'nafy'],
};

export const participles: SarfTopic = {
  id: 'participles',
  titleAr: 'اسم الفاعل والمفعول',
  titleEn: 'Active & Passive Participles',
  transliteration: 'Ism al-Faa\'il wal-Maf\'ool',
  categoryId: 'fundamentals',
  subcategoryId: 'verb-operations',
  levels: [
    {
      difficulty: 'beginner',
      summary: 'The active participle (اسم الفاعل) follows the pattern فَاعِلٌ and indicates the doer. The passive participle (اسم المفعول) follows مَفْعُولٌ and indicates what the action was done to.',
      body: `## Participles in Arabic

### Active Participle (اسم الفاعل)
Pattern: **فَاعِلٌ** — indicates the one who does the action.
- فَتَحَ → فَاتِحٌ (opener/one who opens)
- كَتَبَ → كَاتِبٌ (writer/one who writes)

### Passive Participle (اسم المفعول)
Pattern: **مَفْعُولٌ** — indicates what the action is done to.
- فَتَحَ → مَفْتُوحٌ (opened)
- كَتَبَ → مَكْتُوبٌ (written)`,
      rules: [
        {
          arabic: 'اسم الفاعل من الثلاثي على وزن فَاعِل',
          english: 'The active participle of triliteral verbs follows the pattern faa\'il (فَاعِلٌ).',
          examples: [
            { arabic: 'عَالِمٌ', translation: 'knower/scholar (from عَلِمَ)' },
            { arabic: 'نَاصِرٌ', translation: 'helper (from نَصَرَ)' },
          ],
        },
        {
          arabic: 'اسم المفعول من الثلاثي على وزن مَفْعُول',
          english: 'The passive participle of triliteral verbs follows the pattern maf\'ool (مَفْعُولٌ).',
          examples: [
            { arabic: 'مَعْلُومٌ', translation: 'known (from عَلِمَ)' },
            { arabic: 'مَنْصُورٌ', translation: 'helped/victorious (from نَصَرَ)' },
          ],
        },
      ],
      sourceRef: 'FSTU Sarf, Pages 41-60',
    },
    {
      difficulty: 'intermediate',
      summary: 'Participles from enhanced forms (المزيد فيه) follow different patterns: the active uses the mudaari\' pattern with meem prefix and kasra on pre-final; the passive uses the same but with fatha on pre-final.',
      body: `## Participles from Enhanced Forms

### Pattern for Enhanced Forms
- **Active**: Replace ي of mudaari' with مُ, put kasra on pre-final
- **Passive**: Replace ي of mudaari' with مُ, put fatha on pre-final

### Examples
| Form | Active Participle | Passive Participle |
|------|------------------|-------------------|
| II عَلَّمَ | مُعَلِّمٌ | مُعَلَّمٌ |
| IV أَرْسَلَ | مُرْسِلٌ | مُرْسَلٌ |
| X اسْتَغْفَرَ | مُسْتَغْفِرٌ | مُسْتَغْفَرٌ |`,
      rules: [
        {
          arabic: 'اسم الفاعل من غير الثلاثي يُبنى من المضارع بإبدال حرف المضارعة ميمًا مضمومة',
          english: 'Active participle of non-triliteral forms: replace the prefix letter with damma-meem.',
          examples: [
            { arabic: 'يُعَلِّمُ → مُعَلِّمٌ', translation: 'teaching → teacher' },
            { arabic: 'يُرْسِلُ → مُرْسِلٌ', translation: 'sending → sender' },
          ],
        },
      ],
      sourceRef: 'FSTU Sarf, Pages 41-60',
    },
    {
      difficulty: 'advanced',
      summary: 'Advanced participle study covers irregular patterns, participles from weak verbs (قَائِلٌ from قَالَ, دَاعٍ from دَعَا), feminine and plural forms, and how participles function grammatically as both nouns and adjectives.',
      body: `## Advanced Participle Analysis

### Participles from Weak Verbs
- **Ajwaf**: قَالَ → قَائِلٌ (hamzah replaces weak letter)
- **Naqis waawi**: دَعَا → دَاعٍ (tanween replaces final letter in indefinite)
- **Naqis ya'i**: رَمَى → رَامٍ

### Gender and Number
| Form | Masculine | Feminine | Plural |
|------|-----------|----------|--------|
| فَاعِل | كَاتِبٌ | كَاتِبَةٌ | كَاتِبُونَ / كُتَّابٌ |
| مَفْعُول | مَكْتُوبٌ | مَكْتُوبَةٌ | مَكْتُوبُونَ / مَكَاتِيبُ |`,
      rules: [
        {
          arabic: 'اسم الفاعل من الأجوف يُقلب حرف العلة همزة',
          english: 'Active participle of hollow verbs: the weak middle letter becomes hamzah.',
          examples: [
            { arabic: 'قَالَ → قَائِلٌ', translation: 'said → sayer' },
            { arabic: 'بَاعَ → بَائِعٌ', translation: 'sold → seller' },
          ],
        },
      ],
      sourceRef: 'FSTU Sarf, Pages 41-60',
    },
  ],
  relatedTopicIds: ['passive-voice', 'verb-forms', 'sifah-mushabbahah'],
  tags: ['participle', 'ism al-fail', 'ism al-mafool', 'faa\'il', 'maf\'ool'],
};

export const conjugationPatterns: SarfTopic = {
  id: 'conjugation-patterns',
  titleAr: 'التصريف الصغير والكبير',
  titleEn: 'Short & Full Conjugation',
  transliteration: 'at-Tasreef as-Sagheer wal-Kabeer',
  categoryId: 'fundamentals',
  subcategoryId: 'verb-operations',
  levels: [
    {
      difficulty: 'beginner',
      summary: 'Arabic verb conjugation has two levels: التصريف الصغير (short) lists the key forms of a verb, while التصريف الكبير (full) conjugates every form across all 14 persons.',
      body: `## Conjugation Systems

### التصريف الصغير (Short Conjugation)
Lists one representative form for each category:
1. الماضي المعلوم — فَتَحَ
2. المضارع المعلوم — يَفْتَحُ
3. الأمر — اِفْتَحْ
4. النهي — لَا تَفْتَحْ
5. الماضي المجهول — فُتِحَ
6. المضارع المجهول — يُفْتَحُ
7. اسم الفاعل — فَاتِحٌ
8. اسم المفعول — مَفْتُوحٌ
9. المصدر — فَتْحًا

### التصريف الكبير (Full Conjugation)
Takes each of the forms above and conjugates it across all 14 persons.`,
      rules: [
        {
          arabic: 'التصريف الصغير يجمع أصول الفعل في تسع صيغ',
          english: 'The short conjugation collects the verb\'s core forms in nine entries.',
        },
      ],
      sourceRef: 'FSTU Sarf, Pages 41-60',
    },
    {
      difficulty: 'intermediate',
      summary: 'The short conjugation differs by baab — each of the six categories has its own pattern for the masdar, participles, and command form. Mastering the short conjugation is the key to productive Arabic.',
      body: `## Short Conjugation by Baab

Each baab has distinctive forms:

| Component | باب فتح | باب سمع | باب ضرب | باب نصر |
|-----------|---------|---------|---------|---------|
| ماضي | فَتَحَ | سَمِعَ | ضَرَبَ | نَصَرَ |
| مضارع | يَفْتَحُ | يَسْمَعُ | يَضْرِبُ | يَنْصُرُ |
| أمر | اِفْتَحْ | اِسْمَعْ | اِضْرِبْ | اُنْصُرْ |
| اسم فاعل | فَاتِحٌ | سَامِعٌ | ضَارِبٌ | نَاصِرٌ |
| اسم مفعول | مَفْتُوحٌ | مَسْمُوعٌ | مَضْرُوبٌ | مَنْصُورٌ |`,
      rules: [
        {
          arabic: 'كل باب له تصريفه الصغير الخاص',
          english: 'Each baab has its own distinct short conjugation pattern.',
        },
      ],
      sourceRef: 'FSTU Sarf, Pages 41-60',
    },
    {
      difficulty: 'advanced',
      summary: 'The full conjugation (التصريف الكبير) systematically conjugates every form through all 14 persons, including active and passive voice across past, present, command, and prohibition. This creates a complete paradigm of 100+ forms per verb.',
      body: `## The Full Conjugation System

### Structure
The التصريف الكبير produces the complete paradigm:
- 14 persons × ماضي معلوم = 14 forms
- 14 persons × ماضي مجهول = 14 forms
- 14 persons × مضارع معلوم = 14 forms
- 14 persons × مضارع مجهول = 14 forms
- 12 persons × أمر = 12 forms (no 3rd person or 1st person)
- 12 persons × نهي = 12 forms
- Plus: مضارع منصوب (14 + 14) and مضارع مجزوم (14 + 14)

This gives **100+ total forms** for each verb.`,
      rules: [
        {
          arabic: 'التصريف الكبير يشمل جميع الصيغ مع جميع الضمائر',
          english: 'The full conjugation covers every form across all pronoun/person combinations.',
        },
      ],
      sourceRef: 'FSTU Sarf, Pages 41-60',
    },
  ],
  relatedTopicIds: ['verb-forms', 'abwab-overview', 'past-tense', 'present-tense'],
  tags: ['tasreef', 'conjugation', 'sagheer', 'kabeer', 'short', 'full'],
};

export const irabMudari: SarfTopic = {
  id: 'irab-mudari',
  titleAr: 'إعراب المضارع',
  titleEn: 'Verb Case Endings',
  transliteration: "I'raab al-Mudaari'",
  categoryId: 'fundamentals',
  subcategoryId: 'verb-operations',
  levels: [
    {
      difficulty: 'beginner',
      summary: 'The present tense verb is the only declinable (معرب) verb tense. It has three states: marfoo\' (ـُ), mansoob (ـَ), and majzoom (ـْ). The default state is marfoo\'.',
      body: `## I'rab of the Present Tense

### The Three States
1. **مرفوع**: يَفْتَحُ — default state, with damma
2. **منصوب**: لَنْ يَفْتَحَ — after naasib particles, with fatha
3. **مجزوم**: لَمْ يَفْتَحْ — after jaazim particles, with sukoon`,
      rules: [
        {
          english: 'The present tense is marfoo\' by default with damma on the last letter.',
          examples: [
            { arabic: 'يَكْتُبُ الطَّالِبُ', translation: 'The student writes' },
          ],
        },
      ],
      sourceRef: 'FSTU Sarf, Pages 41-60',
    },
    {
      difficulty: 'intermediate',
      summary: 'The signs of i\'rab vary: regular verbs use harakat (damma/fatha/sukoon), while the five verbs (الأفعال الخمسة) use noon (presence = raf\', absence = nasb/jazm).',
      body: `## I'rab Signs

### Regular Present Tense
| State | Sign | Example |
|-------|------|---------|
| مرفوع | ضَمَّة | يَكْتُبُ |
| منصوب | فَتْحَة | لَنْ يَكْتُبَ |
| مجزوم | سُكُون | لَمْ يَكْتُبْ |

### الأفعال الخمسة
| State | Sign | Example |
|-------|------|---------|
| مرفوع | ثبوت النون | يَكْتُبُونَ |
| منصوب | حذف النون | لَنْ يَكْتُبُوا |
| مجزوم | حذف النون | لَمْ يَكْتُبُوا |`,
      rules: [
        {
          arabic: 'الأفعال الخمسة ترفع بثبوت النون',
          english: 'The five verbs are raised by the presence of noon, and lowered by its absence.',
        },
      ],
      sourceRef: 'FSTU Sarf, Pages 41-60',
    },
    {
      difficulty: 'advanced',
      summary: 'Advanced i\'rab covers verbs ending in weak letters (الفعل المعتل الآخر) where the final letter is deleted in jazm, the detailed list of naasib and jaazim particles, and conditional structures that cause jazm.',
      body: `## Advanced I'rab of the Mudaari'

### Weak-Ending Verbs
When a present tense verb ends in a weak letter (alif/waw/ya):
- **Marfoo'**: estimated damma — يَدْعُو، يَرْمِي، يَسْعَى
- **Mansoob**: visible fatha — لَنْ يَدْعُوَ، لَنْ يَرْمِيَ (hidden on alif: لَنْ يَسْعَى)
- **Majzoom**: deletion of weak letter — لَمْ يَدْعُ، لَمْ يَرْمِ، لَمْ يَسْعَ`,
      rules: [
        {
          arabic: 'المعتل الآخر يُجزم بحذف حرف العلة',
          english: 'Verbs ending in a weak letter are put in jazm by deleting that letter.',
          examples: [
            { arabic: 'لَمْ يَدْعُ', translation: 'he did not call (waw deleted)' },
            { arabic: 'لَمْ يَرْمِ', translation: 'he did not throw (ya deleted)' },
            { arabic: 'لَمْ يَسْعَ', translation: 'he did not strive (alif deleted)' },
          ],
        },
      ],
      sourceRef: 'FSTU Sarf, Pages 41-60',
    },
  ],
  relatedTopicIds: ['present-tense', 'mudari-mansoob', 'mudari-majzoom'],
  tags: ['irab', 'mudaari', 'case endings', 'marfoo', 'mansoob', 'majzoom'],
};
