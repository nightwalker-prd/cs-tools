import type { SarfTopic } from '../types';

export const mudariMansoob: SarfTopic = {
  id: 'mudari-mansoob',
  titleAr: 'المضارع المنصوب',
  titleEn: 'Accusative Present',
  transliteration: "al-Mudaari' al-Mansoob",
  categoryId: 'derived',
  subcategoryId: 'verb-inflection',
  levels: [
    {
      difficulty: 'beginner',
      summary: 'The accusative present (المضارع المنصوب) occurs when the present tense verb is preceded by specific particles like أَنْ، لَنْ، كَيْ، إِذَنْ. The final damma changes to fatha.',
      body: `## المضارع المنصوب (Accusative Present)

The present tense verb normally ends with **damma** (يَكْتُبُ). When preceded by certain particles, it changes to **fatha** (يَكْتُبَ).

### Particles That Cause Nasb
- **أَنْ**: that (to) — أُرِيدُ أَنْ أَكْتُبَ (I want to write)
- **لَنْ**: will never — لَنْ أَذْهَبَ (I will never go)
- **كَيْ**: in order to — جِئْتُ كَيْ أَتَعَلَّمَ (I came to learn)
- **إِذَنْ**: then/therefore — إِذَنْ أَذْهَبَ (then I'll go)

### What Changes
- Regular: يَكْتُبُ → يَكْتُبَ (damma → fatha)
- Five verbs: يَكْتُبُونَ → يَكْتُبُوا (noon drops)`,
      rules: [
        {
          arabic: 'المضارع يُنصب بالفتحة بعد أَنْ ولَنْ وكَيْ وإِذَنْ',
          english: 'The present tense takes fatha (accusative) after أَنْ, لَنْ, كَيْ, and إِذَنْ.',
          examples: [
            { arabic: 'أُرِيدُ أَنْ أَكْتُبَ', translation: 'I want to write (أَنْ + accusative)' },
            { arabic: 'لَنْ أَذْهَبَ', translation: 'I will never go (لَنْ + accusative)' },
          ],
        },
      ],
      sourceRef: 'FSTU Sarf, Pages 319-327',
    },
    {
      difficulty: 'intermediate',
      summary: 'The five special verb forms (الأفعال الخمسة) show nasb by dropping the noon: يَكْتُبُونَ→يَكْتُبُوا, تَكْتُبِينَ→تَكْتُبِي. Hidden أَنْ after certain particles also causes nasb.',
      body: `## Nasb Details

### The Five Verb Forms (الأفعال الخمسة)
These forms show nasb by **dropping the noon** (نون):
| Normal (marfu') | Accusative (mansoob) |
|----------------|---------------------|
| يَكْتُبُونَ | يَكْتُبُوا |
| تَكْتُبُونَ | تَكْتُبُوا |
| يَكْتُبَانِ | يَكْتُبَا |
| تَكْتُبَانِ | تَكْتُبَا |
| تَكْتُبِينَ | تَكْتُبِي |

### Hidden أَنْ (أَنْ المُضْمَرَة)
Some particles have a hidden أَنْ after them:
- **لِـ** (purpose): جِئْتُ لِأَتَعَلَّمَ (I came to learn)
- **حَتَّى** (until/so that): اِجْتَهَدَ حَتَّى يَنْجَحَ (he studied so he'd succeed)
- **فَـ** (result after certain structures): لَا تَنْهَ عَنْ خُلُقٍ فَتَأْتِيَ مِثْلَهُ

### Weak-Ending Verbs in Nasb
- يَدْعُو → يَدْعُوَ (fatha appears on و)
- يَرْمِي → يَرْمِيَ (fatha appears on ي)
- يَخْشَى → يَخْشَى (fatha estimated on alif)`,
      rules: [
        {
          arabic: 'الأفعال الخمسة تُنصب بحذف النون',
          english: 'The five verb forms show accusative (nasb) by dropping the noon.',
          examples: [
            { arabic: 'لَنْ يَكْتُبُوا', translation: "they will never write (noon dropped)" },
            { arabic: 'أَنْ تَكْتُبِي', translation: "that you (f) write (noon dropped)" },
          ],
        },
      ],
      sourceRef: 'FSTU Sarf, Pages 319-327',
    },
    {
      difficulty: 'advanced',
      summary: 'Advanced study covers all cases of hidden أَنْ, the لام الجحود construction, the distinction between لِ of purpose and لِ of negated obligation, and the interaction of nasb with weak verb endings.',
      body: `## Advanced Accusative Present

### All Cases of Hidden أَنْ
| Particle | Example | Type |
|----------|---------|------|
| لِـ (purpose) | لِيَتَعَلَّمَ | Obligatory |
| حَتَّى | حَتَّى يَنْجَحَ | Obligatory |
| فَـ (result) | فَيَنْجَحَ | After commands/wishes |
| وَ (accompaniment) | وَيَنْجَحَ | After negation/wish |
| أَوْ (until) | أَوْ يَتُوبَ | = إِلَى أَنْ |

### لام الجحود (Lam of Denial)
After negated كَانَ, لِـ causes nasb:
- مَا كَانَ اللهُ **لِيُضِيعَ** إِيمَانَكُمْ
- "God would never waste your faith"

### Accusative in Weak Verbs
| Verb Type | Marfu' | Mansoob |
|-----------|--------|---------|
| Sound | يَكْتُبُ | يَكْتُبَ |
| Waawi naqis | يَدْعُو | يَدْعُوَ |
| Ya'i naqis | يَرْمِي | يَرْمِيَ |
| Alif naqis | يَخْشَى | يَخْشَى (estimated) |
| Five forms | يَكْتُبُونَ | يَكْتُبُوا |`,
      rules: [
        {
          arabic: 'لام الجحود بعد كان المنفية تنصب المضارع بأن مضمرة',
          english: 'The lam of denial after negated كَانَ triggers nasb with a hidden أَنْ.',
          examples: [
            { arabic: 'مَا كَانَ لِيَفْعَلَ', translation: 'he would never do (lam of denial)' },
          ],
        },
      ],
      sourceRef: 'FSTU Sarf, Pages 319-327',
    },
  ],
  relatedTopicIds: ['mudari-majzoom', 'irab-mudari', 'noon-tawkeed'],
  tags: ['mudari', 'mansoob', 'accusative', 'nasb', 'verb inflection'],
};

export const mudariMajzoom: SarfTopic = {
  id: 'mudari-majzoom',
  titleAr: 'المضارع المجزوم',
  titleEn: 'Jussive Present',
  transliteration: "al-Mudaari' al-Majzoom",
  categoryId: 'derived',
  subcategoryId: 'verb-inflection',
  levels: [
    {
      difficulty: 'beginner',
      summary: 'The jussive present (المضارع المجزوم) occurs when the present tense verb is preceded by jazm particles like لَمْ، لَمَّا، لام الأمر، لا الناهية. The final vowel becomes sukoon.',
      body: `## المضارع المجزوم (Jussive Present)

The present tense verb takes **sukoon** (or drops its weak letter) when preceded by jazm particles.

### Particles That Cause Jazm
- **لَمْ**: did not — لَمْ يَكْتُبْ (he did not write)
- **لَمَّا**: not yet — لَمَّا يَصِلْ (he hasn't arrived yet)
- **لَامُ الأَمْر**: let/should — لِيَكْتُبْ (let him write)
- **لا النَّاهِيَة**: don't — لَا تَكْتُبْ (don't write!)

### What Changes
- Regular: يَكْتُبُ → يَكْتُبْ (damma → sukoon)
- Five verbs: يَكْتُبُونَ → يَكْتُبُوا (noon drops)
- Weak ending: يَرْمِي → يَرْمِ (weak letter drops)`,
      rules: [
        {
          arabic: 'المضارع يُجزم بالسكون بعد لَمْ ولَمَّا ولام الأمر ولا الناهية',
          english: 'The present tense takes sukoon (jazm) after لَمْ, لَمَّا, لام الأمر, and لا الناهية.',
          examples: [
            { arabic: 'لَمْ يَكْتُبْ', translation: 'he did not write' },
            { arabic: 'لَا تَكْتُبْ', translation: "don't write!" },
          ],
        },
      ],
      sourceRef: 'FSTU Sarf, Pages 319-327',
    },
    {
      difficulty: 'intermediate',
      summary: 'Jazm also occurs in conditional sentences (إِنْ، مَنْ، مَا، مَهْمَا) where two verbs are affected. Weak-ending verbs show jazm by dropping the final weak letter entirely.',
      body: `## Jazm Details

### Conditional Particles (Two Verbs Affected)
These particles cause jazm on **both** the condition and result verbs:
- **إِنْ**: إِنْ تَدْرُسْ تَنْجَحْ (if you study, you'll succeed)
- **مَنْ**: مَنْ يَعْمَلْ خَيْرًا يَجِدْهُ (whoever does good finds it)
- **مَا**: مَا تَفْعَلْ مِنْ خَيْرٍ يُعْلَمْ (whatever good you do is known)

### Jazm in Weak Verbs
Weak-ending verbs show jazm by **deleting** the final weak letter:
| Type | Marfu' | Majzoom | Deleted |
|------|--------|---------|---------|
| Waawi naqis | يَدْعُو | يَدْعُ | و deleted |
| Ya'i naqis | يَرْمِي | يَرْمِ | ي deleted |
| Alif naqis | يَخْشَى | يَخْشَ | ا deleted |

### Jazm in Hollow Verbs
The middle weak letter is also deleted:
- يَقُولُ → لَمْ يَقُلْ (و deleted)
- يَبِيعُ → لَمْ يَبِعْ (ي deleted)

### Five Verb Forms in Jazm
Same as nasb — noon drops:
- يَكْتُبُونَ → لَمْ يَكْتُبُوا`,
      rules: [
        {
          arabic: 'أدوات الشرط تجزم فعلين: فعل الشرط وجوابه',
          english: 'Conditional particles cause jazm on both the condition verb and the result verb.',
          examples: [
            { arabic: 'إِنْ تَدْرُسْ تَنْجَحْ', translation: 'if you study, you succeed (both jazm)' },
            { arabic: 'مَنْ يَجْتَهِدْ يَنْجَحْ', translation: 'whoever strives, succeeds (both jazm)' },
          ],
        },
      ],
      sourceRef: 'FSTU Sarf, Pages 319-327',
    },
    {
      difficulty: 'advanced',
      summary: 'Advanced study covers all conditional particles (18+), the jussive of doubled verbs (two valid forms), the distinction between لَمْ and لَمَّا, and the rarely-used lam of command for third person.',
      body: `## Advanced Jussive Present

### Complete Conditional Particle List
| Particle | Meaning | Example |
|----------|---------|---------|
| إِنْ | if | إِنْ تَذْهَبْ أَذْهَبْ |
| مَنْ | whoever | مَنْ يَعْمَلْ يُجْزَ |
| مَا | whatever | مَا تَفْعَلْ أَفْعَلْ |
| مَهْمَا | whatever | مَهْمَا تَقُلْ أَسْمَعْ |
| مَتَى | whenever | مَتَى تَأْتِ أُكْرِمْكَ |
| أَيْنَمَا | wherever | أَيْنَمَا تَكُنْ أَكُنْ |
| أَيَّانَ | whenever | أَيَّانَ تَدْعُ أُجِبْ |
| حَيْثُمَا | wherever | حَيْثُمَا تَجْلِسْ أَجْلِسْ |
| كَيْفَمَا | however | كَيْفَمَا تَجْلِسْ أَجْلِسْ |
| أَيُّ | whichever | أَيَّ كِتَابٍ تَقْرَأْ أَقْرَأْ |

### Doubled Verbs in Jazm
Two valid forms (as discussed in المضاعف):
- لَمْ يَمُدَّ (idgham with fatha)
- لَمْ يَمْدُدْ (fakk with sukoon)

### لَمْ vs. لَمَّا
| Feature | لَمْ | لَمَّا |
|---------|------|-------|
| Meaning | did not | not yet |
| Implies | Past negation | Expected to happen |
| Example | لَمْ يَأْتِ | لَمَّا يَأْتِ |
| Nuance | Simple negation | Still waiting |`,
      rules: [
        {
          arabic: 'لَمَّا تدل على نفي الماضي مع توقع الحصول',
          english: 'لَمَّا negates the past while implying the action is still expected to happen (not yet).',
          examples: [
            { arabic: 'لَمَّا يَصِلْ', translation: "he hasn't arrived yet (but expected to)" },
            { arabic: 'لَمْ يَصِلْ', translation: 'he did not arrive (simple negation)' },
          ],
        },
      ],
      sourceRef: 'FSTU Sarf, Pages 319-327',
    },
  ],
  relatedTopicIds: ['mudari-mansoob', 'irab-mudari', 'noon-tawkeed', 'negation-commands'],
  tags: ['mudari', 'majzoom', 'jussive', 'jazm', 'conditional', 'verb inflection'],
};

export const noonTawkeed: SarfTopic = {
  id: 'noon-tawkeed',
  titleAr: 'نون التوكيد',
  titleEn: 'Emphasis Noon',
  transliteration: 'Noon at-Tawkeed',
  categoryId: 'derived',
  subcategoryId: 'verb-inflection',
  levels: [
    {
      difficulty: 'beginner',
      summary: 'The emphasis noon (نون التوكيد) is added to verbs to express strong emphasis or certainty. There are two types: the heavy noon (نَّ) with shaddah and the light noon (نْ) with sukoon.',
      body: `## نون التوكيد (Emphasis Noon)

The **emphasis noon** is added to the end of a verb to add **strong emphasis** — like "indeed" or "definitely" in English.

### Two Types
1. **Heavy noon** (نون التوكيد الثقيلة): ـَنَّ (with shaddah)
2. **Light noon** (نون التوكيد الخفيفة): ـَنْ (with sukoon)

### Examples
- لَيَكْتُبَنَّ — He will **definitely** write (heavy)
- لَيَكْتُبَنْ — He will **definitely** write (light)

### When It's Used
- After **oath + لَـ**: وَاللهِ لَأَفْعَلَنَّ (By God, I will definitely do it)
- With **commands** for emphasis: اُكْتُبَنَّ (Write! — emphatic)`,
      rules: [
        {
          arabic: 'نون التوكيد الثقيلة مشددة والخفيفة ساكنة',
          english: 'The heavy emphasis noon has shaddah (نَّ), the light one has sukoon (نْ).',
          examples: [
            { arabic: 'لَيَكْتُبَنَّ', translation: 'he will definitely write (heavy noon)' },
            { arabic: 'لَيَكْتُبَنْ', translation: 'he will definitely write (light noon)' },
          ],
        },
      ],
      sourceRef: 'FSTU Sarf, Pages 319-327',
    },
    {
      difficulty: 'intermediate',
      summary: 'When the emphasis noon is added, the verb ending changes: the final damma becomes fatha, the noon of the five forms drops, and the subject pronoun noon (نَ) of feminine plural is separated by an alif.',
      body: `## Emphasis Noon Conjugation

### Changes When Adding Emphasis Noon
The present tense verb undergoes several changes:

| Original | With Heavy Noon | Notes |
|----------|----------------|-------|
| يَكْتُبُ | يَكْتُبَنَّ | Damma → fatha |
| يَكْتُبُونَ | يَكْتُبُنَّ | Drop واو and noon |
| تَكْتُبِينَ | تَكْتُبِنَّ | Drop ياء and noon |
| يَكْتُبَانِ | يَكْتُبَانِّ | Keep alif, noon becomes emphatic |
| يَكْتُبْنَ | يَكْتُبْنَانِّ | Add alif between noons |

### Obligatory vs. Optional Use
- **Obligatory**: After oath + لَ + positive future verb
  - وَاللهِ لَأَذْهَبَنَّ (By God, I will go)
- **Near-obligatory**: After لَا in oath
  - وَاللهِ لَا أَفْعَلَنَّ (By God, I will not do it)
- **Optional**: In commands and after إِمَّا
  - اُكْتُبَنَّ (Write! — emphatic)

### With Command Form
The command can also take emphasis noon:
- اُكْتُبْ → اُكْتُبَنَّ (write! — emphatic)
- اُكْتُبُوا → اُكْتُبُنَّ (write! pl. — emphatic)`,
      rules: [
        {
          arabic: 'نون التوكيد واجبة بعد لام القسم مع المضارع المثبت المستقبل',
          english: 'The emphasis noon is obligatory after the lam of oath with a positive future present tense.',
          examples: [
            { arabic: 'وَاللهِ لَأَفْعَلَنَّ', translation: 'By God, I will definitely do it (obligatory)' },
            { arabic: 'تَاللهِ لَأَكِيدَنَّ', translation: 'By God, I will plot against (Quran)' },
          ],
        },
      ],
      sourceRef: 'FSTU Sarf, Pages 319-327',
    },
    {
      difficulty: 'advanced',
      summary: 'Advanced study covers the grammatical status of the verb with emphasis noon (مبني — indeclinable), the rare light noon usage, the interaction with weak verb endings, and Quranic examples.',
      body: `## Advanced Emphasis Noon

### Grammatical Status
When emphasis noon is attached, the verb becomes **مبني** (indeclinable):
- The verb is no longer in the normal marfu'/mansoob/majzoom paradigm
- It's built on fatha: يَكْتُبَنَّ (fatha on the letter before noon)

### With Weak Verbs
| Type | Without | With Noon |
|------|---------|-----------|
| Sound | يَكْتُبُ | يَكْتُبَنَّ |
| Waawi naqis | يَدْعُو | يَدْعُوَنَّ |
| Ya'i naqis | يَرْمِي | يَرْمِيَنَّ |
| Alif naqis | يَخْشَى | يَخْشَيَنَّ (ya returns!) |

### Quranic Examples
- لَنَسْفَعًا بِالنَّاصِيَةِ — "We will surely drag by the forelock" (Quran 96:15) — light noon written as alif
- لَيُسْجَنَنَّ وَلَيَكُونًا مِنَ الصَّاغِرِينَ — "He will surely be imprisoned" (Quran 12:32) — both heavy and light noon

### Light Noon Special Rules
The light noon (نْ):
- Cannot come before a pause (end of sentence)
- Cannot come before a consonant
- Often written as alif in Quran: لَنَسْفَعًا (the alif represents light noon)
- Less common than heavy noon in usage`,
      rules: [
        {
          arabic: 'الفعل المؤكد بالنون مبني على الفتح',
          english: 'A verb with emphasis noon is indeclinable (mabni), built on fatha.',
          examples: [
            { arabic: 'لَيَكْتُبَنَّ (مبني على الفتح)', translation: 'he will definitely write (built on fatha)' },
            { arabic: 'لَنَسْفَعًا (نون خفيفة)', translation: 'we will surely drag (Quran — light noon as alif)' },
          ],
        },
      ],
      sourceRef: 'FSTU Sarf, Pages 319-327',
    },
  ],
  relatedTopicIds: ['mudari-mansoob', 'mudari-majzoom', 'irab-mudari'],
  tags: ['noon', 'tawkeed', 'emphasis', 'verb inflection'],
};
