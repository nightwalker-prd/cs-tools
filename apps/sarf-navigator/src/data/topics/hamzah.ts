import type { SarfTopic } from '../types';

export const hamzatulWasl: SarfTopic = {
  id: 'hamzatul-wasl',
  titleAr: 'همزة الوصل',
  titleEn: 'Connecting Hamzah',
  transliteration: 'Hamzatul-Wasl',
  categoryId: 'hamzah',
  subcategoryId: 'hamzah-rules',
  levels: [
    {
      difficulty: 'beginner',
      summary: 'Hamzatul-wasl (همزة الوصل) is a hamzah that is pronounced at the start of speech but drops when preceded by another word. It appears in command verbs, Form VII-X verbs, and certain nouns.',
      body: `## Hamzatul-Wasl (همزة الوصل)

Hamzatul-wasl is a **connecting hamzah** — it helps you start pronouncing a word that begins with a consonant cluster (sukoon). When the word comes after another word in connected speech, the hamzah **drops**.

### Where It Appears
1. **Command verbs**: اِفْتَحْ (open!)
2. **Forms VII-X verbs**: اِنْفَعَلَ، اِفْتَعَلَ، اِسْتَفْعَلَ
3. **Certain nouns**: اِسْمٌ، اِبْنٌ، اِمْرَأَةٌ

### Key Rule
- Written as plain alif (ا) without hamzah mark
- Pronounced only at the beginning of speech`,
      rules: [
        {
          arabic: 'همزة الوصل تُنطق في الابتداء وتسقط في الوصل',
          english: 'Hamzatul-wasl is pronounced at the start of speech but drops in connected speech.',
          examples: [
            { arabic: 'اِفْتَحِ البَابَ', translation: 'open the door', irab: 'Hamzah is pronounced because it starts the sentence' },
            { arabic: 'وَافْتَحِ البَابَ', translation: 'and open the door', irab: 'Hamzah drops in connected speech after وَ' },
          ],
        },
      ],
      sourceRef: 'FSTU Sarf, Pages 111-135',
    },
    {
      difficulty: 'intermediate',
      summary: 'The vowel of hamzatul-wasl depends on the verb form: kasra for most verbs, damma when the third root letter has damma (باب نصر). In the definite article أل, the hamzah always has fatha.',
      body: `## Hamzatul-Wasl Vowel Rules

### In Verbs
- **Kasra**: Most verb commands — اِفْتَحْ، اِسْمَعْ، اِضْرِبْ
- **Damma**: When 3rd root letter has damma — اُنْصُرْ، اُكْتُبْ

### In Nouns
Always **kasra**: اِسْمٌ، اِبْنٌ، اِثْنَانِ

### In the Definite Article
Always **fatha**: اَلْكِتَابُ`,
      rules: [
        {
          arabic: 'همزة الوصل في الأمر تُكسر إلا إذا كان ثالث الفعل مضمومًا',
          english: 'Hamzatul-wasl in commands has kasra unless the 3rd root letter has damma.',
          examples: [
            { arabic: 'اِفْتَحْ', translation: 'open! (kasra — 3rd letter has fatha)' },
            { arabic: 'اُكْتُبْ', translation: 'write! (damma — 3rd letter has damma)' },
          ],
        },
      ],
      sourceRef: 'FSTU Sarf, Pages 111-135',
    },
    {
      difficulty: 'advanced',
      summary: 'Advanced study distinguishes hamzatul-wasl from hamzatul-qat\' in all positions, covers the special deletion of hamzah in four verbs (أَكَلَ→كُلْ, أَخَذَ→خُذْ, أَمَرَ→مُرْ), and the takhfeef rules for consecutive hamzahs.',
      body: `## Advanced Hamzatul-Wasl

### Hamzatul-Wasl vs. Hamzatul-Qat'
| Feature | Wasl (وصل) | Qat' (قطع) |
|---------|-----------|-----------|
| Writing | ا (plain alif) | أ/إ/آ (with hamzah) |
| Connected speech | Drops | Stays |
| Examples | اِفْتَحْ | أَكْرَمَ |

### Special Deletions
Four verbs lose their initial hamzah in the command:
- أَكَلَ → كُلْ (eat!)
- أَخَذَ → خُذْ (take!)
- أَمَرَ → مُرْ (command!)
- سَأَلَ → سَلْ (ask! — in certain readings)

### Form IV Distinction
باب الإفعال uses **permanent hamzah** (قطع): أَكْرَمَ، أَرْسَلَ — this hamzah never drops.`,
      rules: [
        {
          arabic: 'أربعة أفعال تحذف همزتها في الأمر: أكل أخذ أمر سأل',
          english: 'Four verbs delete their hamzah in the command form: akala, akhadha, amara, sa\'ala.',
          examples: [
            { arabic: 'كُلْ', translation: 'eat! (from أَكَلَ)' },
            { arabic: 'خُذْ', translation: 'take! (from أَخَذَ)' },
          ],
        },
      ],
      sourceRef: 'FSTU Sarf, Pages 111-135',
    },
  ],
  relatedTopicIds: ['hamzah-writing', 'hamzah-conjugation', 'negation-commands'],
  tags: ['hamzah', 'wasl', 'connecting', 'alif'],
};

export const hamzahWriting: SarfTopic = {
  id: 'hamzah-writing',
  titleAr: 'كتابة الهمزة',
  titleEn: 'Writing Hamzah',
  transliteration: 'Kitaabat al-Hamzah',
  categoryId: 'hamzah',
  subcategoryId: 'hamzah-rules',
  levels: [
    {
      difficulty: 'beginner',
      summary: 'Hamzah appears in three positions in a verb root: initial (مهموز الفاء), middle (مهموز العين), or final (مهموز اللام). Each position has specific writing and conjugation rules.',
      body: `## Hamzah Positions in Verbs

### Three Types
1. **مَهْمُوزُ الفَاء** (Hamzah as 1st root): أَكَلَ (to eat)
2. **مَهْمُوزُ العَيْن** (Hamzah as 2nd root): سَأَلَ (to ask)
3. **مَهْمُوزُ اللَّام** (Hamzah as 3rd root): قَرَأَ (to read)`,
      rules: [
        {
          english: 'Hamzah can be any of the three root letters, and each position creates different morphological effects.',
          examples: [
            { arabic: 'أَكَلَ', translation: 'to eat (hamzah is faa)' },
            { arabic: 'سَأَلَ', translation: 'to ask (hamzah is ayn)' },
            { arabic: 'قَرَأَ', translation: 'to read (hamzah is lam)' },
          ],
        },
      ],
      sourceRef: 'FSTU Sarf, Pages 111-135',
    },
    {
      difficulty: 'intermediate',
      summary: 'Writing rules for hamzah depend on the surrounding vowels. The strongest vowel determines the seat: kasra → ya seat (ئ), damma → waw seat (ؤ), fatha → alif seat (أ), sukoon → no seat (ء).',
      body: `## Hamzah Writing Rules

### Vowel Strength Hierarchy
كَسْرَة > ضَمَّة > فَتْحَة > سُكُون

### Rules by Position
- **Initial**: Always on alif — أ or إ based on its own vowel
- **Medial**: Seat determined by strongest surrounding vowel
- **Final**: Seat determined by the vowel before it`,
      rules: [
        {
          arabic: 'أقوى الحركات الكسرة ثم الضمة ثم الفتحة ثم السكون',
          english: 'Kasra is strongest, then damma, then fatha, then sukoon — the strongest determines hamzah\'s seat.',
          examples: [
            { arabic: 'سُئِلَ', translation: 'he was asked (kasra wins → ya seat)' },
            { arabic: 'يُؤْمِنُ', translation: 'he believes (damma wins → waw seat)' },
          ],
        },
      ],
      sourceRef: 'FSTU Sarf, Pages 111-135',
    },
    {
      difficulty: 'advanced',
      summary: 'Advanced hamzah study covers تخفيف الهمزة (lightening), where two consecutive hamzahs merge into a madd: أَأْمَنَ → آمَنَ, and the complete conjugation tables for all three hamzah positions across all abwab.',
      body: `## Advanced Hamzah Rules

### تخفيف الهمزة (Hamzah Lightening)
When two hamzahs appear consecutively, the second is lightened:
- **أَأْمَنَ → آمَنَ** (hamzah + sukoon hamzah = madd)
- **أَأْكُلُ → آكُلُ** (I eat)

### Complete Patterns
| Root Position | Past | Present | Command | Participle |
|--------------|------|---------|---------|------------|
| Faa: أَكَلَ | أَكَلَ | يَأْكُلُ | كُلْ | آكِلٌ |
| Ayn: سَأَلَ | سَأَلَ | يَسْأَلُ | اِسْأَلْ | سَائِلٌ |
| Lam: قَرَأَ | قَرَأَ | يَقْرَأُ | اِقْرَأْ | قَارِئٌ |`,
      rules: [
        {
          arabic: 'إذا اجتمعت همزتان أولاهما متحركة والثانية ساكنة أُبدلت مدًّا',
          english: 'When two hamzahs meet and the second has sukoon, it becomes a madd.',
          examples: [
            { arabic: 'أَأْمَنَ → آمَنَ', translation: 'he believed (takhfeef)' },
          ],
        },
      ],
      sourceRef: 'FSTU Sarf, Pages 111-135',
    },
  ],
  relatedTopicIds: ['hamzatul-wasl', 'hamzah-conjugation'],
  tags: ['hamzah', 'writing', 'spelling', 'mahmuz'],
};

export const hamzahConjugation: SarfTopic = {
  id: 'hamzah-conjugation',
  titleAr: 'تصريف المهموز',
  titleEn: 'Hamzah Verb Forms',
  transliteration: 'Tasreef al-Mahmuz',
  categoryId: 'hamzah',
  subcategoryId: 'hamzah-conjugation',
  levels: [
    {
      difficulty: 'beginner',
      summary: 'Hamzah verbs (المهموز) conjugate like regular sound verbs but with hamzah writing changes. The three types (faa/ayn/lam) each have their own patterns.',
      body: `## Conjugation of Hamzah Verbs

Hamzah verbs follow the same conjugation rules as sound verbs. The main difference is in **how the hamzah is written** as vowels change around it.

### Key Examples
- **أَخَذَ يَأْخُذُ** (to take) — mahmuz al-faa
- **سَأَلَ يَسْأَلُ** (to ask) — mahmuz al-ayn
- **قَرَأَ يَقْرَأُ** (to read) — mahmuz al-lam`,
      rules: [
        {
          english: 'Hamzah verbs conjugate like sound verbs but with hamzah writing adjustments.',
          examples: [
            { arabic: 'أَخَذَ - يَأْخُذُ - خُذْ', translation: 'took - takes - take! (hamzah dropped in command)' },
          ],
        },
      ],
      tables: [
        {
          title: 'Hamzah Verb Conjugation Summary',
          titleAr: 'ملخص تصريف المهموز',
          headers: ['Type', 'Past', 'Present', 'Command', 'Passive Past'],
          rows: [
            ['Faa', 'أَكَلَ', 'يَأْكُلُ', 'كُلْ', 'أُكِلَ'],
            ['Ayn', 'سَأَلَ', 'يَسْأَلُ', 'اِسْأَلْ', 'سُئِلَ'],
            ['Lam', 'قَرَأَ', 'يَقْرَأُ', 'اِقْرَأْ', 'قُرِئَ'],
          ],
        },
      ],
      sourceRef: 'FSTU Sarf, Pages 111-135',
    },
    {
      difficulty: 'intermediate',
      summary: 'The full conjugation of hamzah verbs across all 14 forms shows how the hamzah seat changes with different vowel environments. Passive forms create interesting hamzah writing combinations.',
      body: `## Full Hamzah Verb Conjugation

### Passive Voice Changes
In the passive, vowel changes affect hamzah writing:
- أَخَذَ → أُخِذَ (damma on hamzah-alif)
- يَأْخُذُ → يُؤْخَذُ (hamzah moves to waw seat after damma)
- سَأَلَ → سُئِلَ (hamzah on ya seat after damma+kasra)`,
      rules: [
        {
          arabic: 'المهموز في المجهول يتغير كرسي الهمزة حسب الحركات',
          english: 'In passive voice, the hamzah seat changes according to surrounding vowels.',
          examples: [
            { arabic: 'أُخِذَ', translation: 'it was taken (hamzah keeps alif seat)' },
            { arabic: 'سُئِلَ', translation: 'he was asked (kasra wins → ya seat)' },
            { arabic: 'يُؤْخَذُ', translation: 'it is taken (damma → waw seat)' },
          ],
        },
      ],
      sourceRef: 'FSTU Sarf, Pages 111-135',
    },
    {
      difficulty: 'advanced',
      summary: 'Advanced hamzah conjugation covers Forms I-X of hamzah verbs, where takhfeef (lightening) creates madd letters. The verb آمَنَ (Form IV of أَمِنَ) demonstrates how أَ + أ becomes آ. Complete tables for all enhanced forms.',
      body: `## Advanced Hamzah Forms

### Enhanced Forms with Hamzah
- **Form IV**: أَأْمَنَ → آمَنَ (believed) — takhfeef
- **Form VIII**: اِئْتَمَنَ → اِيتَمَنَ (trusted) — hamzah becomes ya
- **Form X**: اِسْتَأْذَنَ (sought permission) — no takhfeef needed

### Hamzah in All Ten Forms
| Form | Active | Passive | Meaning |
|------|--------|---------|---------|
| I | أَمَرَ | أُمِرَ | to command |
| II | أَمَّرَ | أُمِّرَ | to appoint as leader |
| III | آمَرَ | أُومِرَ | to consult |
| IV | آمَنَ | أُومِنَ | to believe |
| V | تَأَمَّرَ | تُأُمِّرَ | to assume command |
| VIII | اِئْتَمَرَ | اُؤْتُمِرَ | to conspire |
| X | اِسْتَأْمَرَ | اُسْتُؤْمِرَ | to seek advice |`,
      rules: [
        {
          arabic: 'باب الإفعال من المهموز يخفف الهمزتين إلى مدّ',
          english: 'Form IV of hamzah verbs lightens two consecutive hamzahs into a madd.',
          examples: [
            { arabic: 'أَأْمَنَ → آمَنَ', translation: 'he believed (two hamzahs → madd)' },
            { arabic: 'أَأْنَبَ → آنَبَ', translation: 'he warned (same takhfeef pattern)' },
          ],
        },
      ],
      sourceRef: 'FSTU Sarf, Pages 111-135',
    },
  ],
  relatedTopicIds: ['hamzatul-wasl', 'hamzah-writing', 'verb-forms'],
  tags: ['hamzah', 'conjugation', 'mahmuz', 'takhfeef'],
};
