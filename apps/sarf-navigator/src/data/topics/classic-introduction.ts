import type { SarfTopic } from '../types';

// ============================================================================
// Topic 1: Word Types (Aqsaam al-Kalima)
// ============================================================================

export const clWordTypes: SarfTopic = {
  id: 'cl-word-types',
  titleAr: 'أقسام الكلمة',
  titleEn: 'Word Types',
  transliteration: 'Aqsaam al-Kalima',
  categoryId: 'cl-introduction',
  subcategoryId: 'cl-word-fundamentals',
  levels: [
    {
      difficulty: 'beginner',
      summary:
        'The Arabic word (kalima) is divided into three types: noun (ism), verb (fi\'l), and particle (harf). Every word in Arabic falls into one of these categories.',
      body: `## The Three Types of Words (أقسام الكلمة)

The Arabic word (الكلمة / al-kalima) is of **three types**:

1. **Noun (اسم / ism)** — A word that indicates a meaning by itself, such as الرَّبّ (the Lord).
2. **Verb (فعل / fi'l)** — A word that indicates an action tied to a time, such as عَبَدَ (he worshipped), يَعْبُدُ (he worships), اعْبُدْ (worship!).
3. **Particle (حرف / harf)** — A word that indicates a meaning only in relation to other words, such as إنَّ (indeed).

These three categories are exhaustive — every word in the Arabic language must be one of these.`,
      rules: [
        {
          arabic: 'الكلمة ثلاثة أقسام: اسم وفعل وحرف',
          english:
            'The Arabic word is of three types: noun (ism), verb (fi\'l), and particle (harf).',
          examples: [
            { arabic: 'الرَّبّ', translation: 'the Lord (noun)' },
            { arabic: 'عَبَدَ', translation: 'he worshipped (verb)' },
            { arabic: 'إنَّ', translation: 'indeed (particle)' },
          ],
        },
      ],
      tables: [
        {
          title: 'The Three Word Types',
          titleAr: 'أقسام الكلمة الثلاثة',
          headers: ['#', 'Type', 'Arabic', 'Example'],
          rows: [
            ['1', 'Noun (ism)', 'الاسم', 'الرَّبّ (the Lord)'],
            [
              '2',
              'Verb (fi\'l)',
              'الفعل',
              'عَبَدَ، يَعْبُدُ، اعْبُدْ',
            ],
            ['3', 'Particle (harf)', 'الحرف', 'إنَّ (indeed)'],
          ],
        },
      ],
      sourceRef: 'As-Sughra fi at-Tasreef, Muqaddimah, Chapter 1',
    },
    {
      difficulty: 'intermediate',
      summary:
        'Al-Wusta provides formal definitions for each word type based on meaning and time: the noun indicates a meaning in itself without time, the verb indicates a meaning in itself connected to time, and the particle indicates a meaning only in something other than itself.',
      body: `## Detailed Definitions of the Three Word Types

Al-Wusta gives precise grammatical definitions for each word type:

### 1. The Noun (الاسم / al-Ism)
**Definition:** That which indicates a meaning in itself, not connected to a time (ما دلّ على معنى في نفسه غير مقترن بزمان).

For example, الرَّجُل (the man) conveys the concept of "a man" without indicating when.

### 2. The Particle (الحرف / al-Harf)
**Definition:** That which indicates a meaning in something other than itself (ما دلّ على معنى في غيره).

For example, إنَّ (indeed/verily) has no standalone meaning — it only functions in the context of a sentence.

### 3. The Verb (الفعل / al-Fi'l)
**Definition:** That which indicates a meaning in itself, connected to a time (ما دلّ على معنى في نفسه مقترن بزمان).

For example:
- عَبَدَ (he worshipped) — past time
- يَعْبُدُ (he worships) — present/future time
- اعْبُدْ (worship!) — future time

### Key Distinction
The **noun** and the **verb** both indicate meaning in themselves, but they differ in whether that meaning is **tied to time**. The noun is timeless; the verb is time-bound. The **particle** has no independent meaning at all.`,
      rules: [
        {
          arabic: 'الاسم: ما دلّ على معنى في نفسه غير مقترن بزمان',
          english:
            'The noun indicates a meaning in itself, not connected to time.',
          examples: [
            { arabic: 'الرَّجُل', translation: 'the man — meaning without time reference' },
          ],
        },
        {
          arabic: 'الفعل: ما دلّ على معنى في نفسه مقترن بزمان',
          english:
            'The verb indicates a meaning in itself, connected to time.',
          examples: [
            { arabic: 'عَبَدَ', translation: 'he worshipped — past time' },
            { arabic: 'يَعْبُدُ', translation: 'he worships — present/future time' },
            { arabic: 'اعْبُدْ', translation: 'worship! — future time (command)' },
          ],
        },
        {
          arabic: 'الحرف: ما دلّ على معنى في غيره',
          english:
            'The particle indicates a meaning only in something other than itself — it has no standalone meaning.',
          examples: [
            { arabic: 'إنَّ', translation: 'indeed — only meaningful in a sentence' },
          ],
        },
      ],
      tables: [
        {
          title: 'Word Type Definitions Compared',
          titleAr: 'مقارنة تعريفات أقسام الكلمة',
          headers: ['Type', 'Meaning in itself?', 'Connected to time?', 'Example'],
          rows: [
            ['Noun (اسم)', 'Yes', 'No', 'الرَّجُل (the man)'],
            ['Verb (فعل)', 'Yes', 'Yes', 'عَبَدَ (he worshipped)'],
            ['Particle (حرف)', 'No (in other)', 'No', 'إنَّ (indeed)'],
          ],
        },
      ],
      sourceRef: 'Al-Wusta fi at-Tasreef, Muqaddimah, Chapter 2',
    },
  ],
  relatedTopicIds: ['cl-verb-categories', 'cl-foundational-principles'],
  tags: ['ism', 'fi\'l', 'harf', 'noun', 'verb', 'particle', 'kalima', 'word types'],
};

// ============================================================================
// Topic 2: Verb Categories (Aqsaam al-Fi'l)
// ============================================================================

export const clVerbCategories: SarfTopic = {
  id: 'cl-verb-categories',
  titleAr: 'أقسام الفعل',
  titleEn: 'Verb Categories',
  transliteration: "Aqsaam al-Fi'l",
  categoryId: 'cl-introduction',
  subcategoryId: 'cl-word-fundamentals',
  levels: [
    {
      difficulty: 'beginner',
      summary:
        'Verbs are classified by four criteria: transitivity (transitive vs. intransitive), voice (active vs. passive), polarity (affirmative vs. negative), and conjugability (conjugable vs. frozen).',
      body: `## Four Classifications of the Verb (أقسام الفعل)

As-Sughra presents four ways to classify Arabic verbs, each with two types:

### 1. Transitivity (تعديًا ولزومًا)
- **Transitive (المتعدي / al-muta'addi):** The action passes to an object. Example: أَعْبُدُ اللهَ (I worship Allah).
- **Intransitive (اللازم / al-laazim):** The action stays with the subject. Example: حَسُنَتْ أخلاقُ النبيِّ ﷺ (The Prophet's character was beautiful).

### 2. Voice (ذكرًا لفاعله وحذفًا له)
- **Active (المعلوم فاعله):** The doer is mentioned. Example: خَلَقَ اللهُ آدمَ (Allah created Adam).
- **Passive (المجهول فاعله):** The doer is removed. Example: خُلِقَ آدمُ (Adam was created).

### 3. Polarity (إثباتًا ونفيًا)
- **Affirmative (المثبت):** The action is affirmed. Example: صَدَقَ اللهُ (Allah spoke the truth).
- **Negative (المنفي):** The action is negated. Example: ما كَذَبَ الرسولُ (The Messenger did not lie).

### 4. Conjugability (تصرفًا وعدمه)
- **Conjugable (المتصرف):** Can take all forms. Example: أطاعَ، يُطيعُ، أطِعْ (he obeyed, he obeys, obey!).
- **Frozen / Non-conjugable (الجامد):** Fixed forms only. Example: نِعْمَ، بِئْسَ (how excellent!, how wretched!).`,
      rules: [
        {
          arabic: 'الفعل المتعدي يتجاوز أثره إلى المفعول به',
          english:
            'The transitive verb is one whose action passes beyond its doer to a direct object.',
          examples: [
            { arabic: 'أَعْبُدُ اللهَ', translation: 'I worship Allah — action passes to "Allah"' },
          ],
        },
        {
          arabic: 'الفعل اللازم لا يتجاوز أثره إلى المفعول به',
          english:
            'The intransitive verb is one whose action does not pass to an object.',
          examples: [
            {
              arabic: 'حَسُنَتْ أخلاقُ النبيِّ ﷺ',
              translation: 'The Prophet\'s character was beautiful — no direct object',
            },
          ],
        },
        {
          arabic: 'الفعل الجامد لا يتصرف',
          english:
            'The frozen verb does not conjugate into other forms; it remains fixed.',
          examples: [
            { arabic: 'نِعْمَ', translation: 'how excellent! — frozen form' },
            { arabic: 'بِئْسَ', translation: 'how wretched! — frozen form' },
          ],
        },
      ],
      tables: [
        {
          title: 'Four Verb Classifications',
          titleAr: 'أقسام الفعل الأربعة',
          headers: ['Classification', 'Type 1', 'Type 2'],
          rows: [
            ['Transitivity', 'Transitive (متعدٍّ)', 'Intransitive (لازم)'],
            ['Voice', 'Active (المعلوم فاعله)', 'Passive (المجهول فاعله)'],
            ['Polarity', 'Affirmative (مثبت)', 'Negative (منفيّ)'],
            ['Conjugability', 'Conjugable (متصرف)', 'Frozen (جامد)'],
          ],
        },
      ],
      sourceRef: 'As-Sughra fi at-Tasreef, Muqaddimah, Chapter 2',
    },
    {
      difficulty: 'intermediate',
      summary:
        'Al-Wusta expands each verb category with formal definitions, alternative terminologies, and sub-types. Notably, conjugable verbs are divided into fully conjugable and partially conjugable, and non-conjugable verbs are divided into those that accept subject pronouns and those that do not.',
      body: `## Expanded Verb Categories from Al-Wusta

Al-Wusta provides detailed definitions, alternative names, and important sub-classifications:

### 1. Transitive vs. Intransitive (تعديًا ولزومًا)

**Transitive (المتعدي):** The verb whose effect passes beyond its doer to the object (يتجاوز أثر فاعله إلى المفعول به).
- Also called: فعل واقع (fi'l waaqi') or فعل مجاوز (fi'l mujaawiz).
- Example: أَعْبُدُ اللهَ — "I worship Allah."

**Intransitive (غير المتعدي):** The verb whose effect does not pass beyond its doer (لم يتجاوز أثر فاعله إلى المفعول به).
- Also called: فعل لازم (fi'l laazim) or فعل غير واقع (fi'l ghayr waaqi').
- Example: حَسُنَ زَيْدٌ — "Zayd became good."

### 2. Active vs. Passive (ذكرًا لفاعله وحذفًا له)

**Active (المعلوم فاعله):** The verb in which the doer is mentioned.
- Also called: مبني للفاعل (mabniyy lil-faa'il) or فعل معروف (fi'l ma'roof).
- Example: خَلَقَ اللهُ آدَمَ — "Allah created Adam."

**Passive (المجهول فاعله):** The verb in which the doer is not mentioned.
- Also called: مبني للمفعول (mabniyy lil-maf'ool) or فعل لم يُسَمَّ فاعله (fi'l lam yusamma faa'iluhu).
- Example: خُلِقَ آدَمُ — "Adam was created."

### 3. Affirmative vs. Negative (إثباتًا ونفيًا)

**Affirmative (المثبت):** Indicates the occurrence of the action (دلّ على وقوع الفعل).
- Example: صَدَقَ اللهُ — "Allah spoke the truth."

**Negative (المنفي):** Indicates the negation of the occurrence (دلّ على نفي وقوع الفعل).
- Example: مَا كَذَبَ الرَّسُولُ — "The Messenger did not lie."

### 4. Conjugability (تصرفًا)

**Conjugable (المتصرف)** — has two sub-types:
- **Fully Conjugable (التام التصرف):** Conjugates into present, command, active participle, and all other forms. Example: أَطَاعَ / يُطِيعُ / أَطِعْ / مُطِيعٌ / مُطَاعٌ.
- **Partially Conjugable (الناقص التصرف):** Conjugates only into the present. Example: مَا زَالَ / لا يَزَالُ (he did not cease / he does not cease).

**Non-conjugable (غير المتصرف / الجامد)** — has two sub-types:
- **Accepts subject pronouns (ما يلحقه ضمير الفاعل):** Example: لَسْتُم / عَسَيْتُم (you are not / perhaps you).
- **Does not accept subject pronouns (ما لا يلحقه ضمير الفاعل):** Example: نِعْمَ / بِئْسَ (how excellent! / how wretched!).`,
      rules: [
        {
          arabic: 'المتصرف قسمان: تام التصرف وناقص التصرف',
          english:
            'The conjugable verb has two sub-types: fully conjugable (taamm at-tasarruf) which forms all derivatives, and partially conjugable (naaqis at-tasarruf) which only has a present tense form.',
          examples: [
            {
              arabic: 'أَطَاعَ / يُطِيعُ / أَطِعْ / مُطِيعٌ',
              translation: 'he obeyed / he obeys / obey! / obedient one — fully conjugable',
            },
            {
              arabic: 'مَا زَالَ / لا يَزَالُ',
              translation: 'he did not cease / he does not cease — partially conjugable (no imperative or participle)',
            },
          ],
        },
        {
          arabic: 'الجامد قسمان: ما يلحقه ضمير الفاعل وما لا يلحقه',
          english:
            'The frozen verb has two sub-types: one that accepts subject pronouns (e.g., لَسْتُم) and one that does not (e.g., نِعْمَ).',
          examples: [
            { arabic: 'لَسْتُم', translation: 'you (pl.) are not — accepts pronoun attachment' },
            { arabic: 'نِعْمَ', translation: 'how excellent! — does not accept pronoun attachment' },
          ],
        },
      ],
      tables: [
        {
          title: 'Verb Categories with Sub-Types',
          titleAr: 'أقسام الفعل مع الأنواع الفرعية',
          headers: ['Category', 'Type', 'Sub-type', 'Example'],
          rows: [
            ['Transitivity', 'Transitive (متعدٍّ)', '—', 'أَعْبُدُ اللهَ'],
            ['Transitivity', 'Intransitive (لازم)', '—', 'حَسُنَ زَيْدٌ'],
            ['Voice', 'Active (المعلوم)', '—', 'خَلَقَ اللهُ آدَمَ'],
            ['Voice', 'Passive (المجهول)', '—', 'خُلِقَ آدَمُ'],
            ['Polarity', 'Affirmative (مثبت)', '—', 'صَدَقَ اللهُ'],
            ['Polarity', 'Negative (منفي)', '—', 'مَا كَذَبَ الرَّسُولُ'],
            ['Conjugability', 'Conjugable (متصرف)', 'Fully (تام)', 'أَطَاعَ / يُطِيعُ / أَطِعْ'],
            ['Conjugability', 'Conjugable (متصرف)', 'Partially (ناقص)', 'مَا زَالَ / لا يَزَالُ'],
            ['Conjugability', 'Frozen (جامد)', 'Accepts pronouns', 'لَسْتُم / عَسَيْتُم'],
            ['Conjugability', 'Frozen (جامد)', 'No pronouns', 'نِعْمَ / بِئْسَ'],
          ],
        },
      ],
      sourceRef: 'Al-Wusta fi at-Tasreef, Muqaddimah, Chapter 3',
    },
  ],
  relatedTopicIds: ['cl-word-types', 'cl-six-trilateral-doors'],
  tags: [
    'verb',
    'transitive',
    'intransitive',
    'active',
    'passive',
    'past',
    'present',
    'imperative',
  ],
};

// ============================================================================
// Topic 3: The Morphological Scale (al-Meezaan as-Sarfiyy)
// ============================================================================

export const clMorphologicalScale: SarfTopic = {
  id: 'cl-morphological-scale',
  titleAr: 'الميزان الصرفي',
  titleEn: 'The Morphological Scale',
  transliteration: 'al-Meezaan as-Sarfiyy',
  categoryId: 'cl-introduction',
  subcategoryId: 'cl-morphology-basics',
  levels: [
    {
      difficulty: 'beginner',
      summary:
        'The morphological scale (al-meezaan as-sarfiyy) uses the root letters fa-ayn-lam (ف-ع-ل) to represent the pattern of any Arabic word, mapping each root letter to its corresponding position.',
      body: `## The Morphological Scale (الميزان الصرفي)

The morphological scale (الميزان الصرفي / al-meezaan as-sarfiyy) is a tool used in Arabic grammar to represent the pattern (wazn / وزن) of a word.

### How It Works
The three letters **ف-ع-ل** (Fa, 'Ayn, Lam) are used as placeholders for the root letters of any trilateral word:
- **ف** (Faa) = 1st root letter
- **ع** ('Ayn) = 2nd root letter
- **ل** (Lam) = 3rd root letter

The vowels on the scale letters match the vowels on the actual word.

### Example
The word سَمِعَ (he heard) has the root letters س-م-ع:
- س maps to ف
- م maps to ع
- ع maps to ل
- So سَمِعَ is on the pattern **فَعِلَ** (fa'ila).`,
      rules: [
        {
          arabic: 'الميزان الصرفي يقيس الكلمة على حروف ف-ع-ل',
          english:
            'The morphological scale maps a word against the template letters Fa-Ayn-Lam, preserving the vowel pattern.',
          examples: [
            { arabic: 'سَمِعَ → فَعِلَ', translation: 'he heard — pattern fa\'ila' },
            { arabic: 'نَصَرَ → فَعَلَ', translation: 'he helped — pattern fa\'ala' },
            { arabic: 'حَسُنَ → فَعُلَ', translation: 'he was good — pattern fa\'ula' },
          ],
        },
      ],
      sourceRef: 'As-Sughra fi at-Tasreef, Muqaddimah, Chapter 3',
    },
    {
      difficulty: 'intermediate',
      summary:
        'Al-Wusta details the scale rules for words with more than three root letters, repeated root letters, and non-root augmented letters. It also explains how weak-letter transformations are handled on the scale.',
      body: `## Detailed Rules of the Morphological Scale

Al-Wusta expands the basic concept with precise rules for different word types. The scale is also called a **wazn** (وزن / pattern/measure).

### Rule 1: Words with More Than Three Root Letters
If the extra letters are **root letters** (حروف أصلية), repeat the lam (ل) in the scale:
- **Four-letter root (رباعي):** دَحْرَجَ → **فَعْلَلَ** (fa'lala — "he rolled")
- **Five-letter root (خماسي):** سَفَرْجَلٌ → **فَعَلَّلٌ** (fa'allalun — "quince")

### Rule 2: Repeated Root Letters
If a root letter is **doubled**, the repetition is shown in the scale:
- صَرَّفَ → **فَعَّلَ** (fa''ala — "he conjugated") — the middle root letter is doubled

### Rule 3: Non-Root Augmented Letters (حروف الزيادة)
If the extra letters are from the augmentation letters (أمانٌ وتسهيلٌ), the augmented letter **itself** appears in the scale:
- أَكْرَمَ → **أَفْعَلَ** (af'ala — the hamza is augmented)
- قَاتَلَ → **فَاعَلَ** (faa'ala — the alif is augmented)
- تَكَلَّمَ → **تَفَعَّلَ** (tafa''ala — the ta is augmented)
- اسْتَغْفَرَ → **اسْتَفْعَلَ** (istaf'ala — alif, sin, ta are augmented)

### Rule 4: Weak Letter Transformations (الإعلال)
When a word has a weak letter change, the scale reflects the **original form**:
- قَالَ → on the pattern **فَعَلَ** (its origin is قَوَلَ)
- دَعَا → on the pattern **فَعَلَ** (its origin is دَعَوَ)

**Exception — in cases of deletion (حذف):**
- قُلْتُ → **فُعْلْتُ** (the 'ayn was deleted)
- يَدْعُونَ → **يَفْعُونَ** (the lam was deleted)
- قُلْ → **فُلْ** (the 'ayn was deleted)`,
      rules: [
        {
          arabic: 'إذا زادت الحروف الأصلية على ثلاثة تُكرر اللام في الميزان',
          english:
            'If root letters exceed three, the lam is repeated in the scale to accommodate the extra root letter(s).',
          examples: [
            { arabic: 'دَحْرَجَ → فَعْلَلَ', translation: 'he rolled — four root letters, lam repeated' },
            {
              arabic: 'سَفَرْجَلٌ → فَعَلَّلٌ',
              translation: 'quince — five root letters, lam repeated twice',
            },
          ],
        },
        {
          arabic: 'الحروف الزائدة تُوضع بنفسها في الميزان',
          english:
            'Augmented (non-root) letters appear as themselves in the scale, not as fa-ayn-lam.',
          examples: [
            { arabic: 'أَكْرَمَ → أَفْعَلَ', translation: 'he honored — hamza is augmented' },
            { arabic: 'اسْتَغْفَرَ → اسْتَفْعَلَ', translation: 'he sought forgiveness — alif, sin, ta are augmented' },
          ],
        },
        {
          arabic: 'عند الإعلال يُوزن على الأصل إلا في الحذف',
          english:
            'When weak-letter changes occur, the scale uses the original form. But in cases of letter deletion, the scale reflects the deletion.',
          examples: [
            { arabic: 'قَالَ → فَعَلَ', translation: 'he said — weighed on original قَوَلَ' },
            { arabic: 'قُلْتُ → فُعْلْتُ', translation: 'I said — middle letter deleted in both word and scale' },
          ],
        },
      ],
      tables: [
        {
          title: 'Scale Rules Summary',
          titleAr: 'قواعد الميزان الصرفي',
          headers: ['Scenario', 'Rule', 'Example'],
          rows: [
            ['Three root letters', 'Standard fa-ayn-lam', 'غَفَرَ → فَعَلَ'],
            ['Four root letters', 'Repeat lam once', 'دَحْرَجَ → فَعْلَلَ'],
            ['Five root letters', 'Repeat lam twice', 'سَفَرْجَلٌ → فَعَلَّلٌ'],
            ['Doubled root letter', 'Double the letter in scale', 'صَرَّفَ → فَعَّلَ'],
            ['Non-root augmentation', 'Augmented letter appears as itself', 'أَكْرَمَ → أَفْعَلَ'],
            ['Weak letter change', 'Use original form', 'قَالَ → فَعَلَ'],
            ['Weak letter deletion', 'Reflect the deletion', 'قُلْتُ → فُعْلْتُ'],
          ],
        },
      ],
      sourceRef: 'Al-Wusta fi at-Tasreef, Muqaddimah, Chapter 4',
    },
  ],
  relatedTopicIds: ['cl-foundational-principles', 'cl-six-trilateral-doors'],
  tags: ['wazn', 'mizan', 'scale', 'root', 'pattern', 'fa-ayn-lam'],
};

// ============================================================================
// Topic 4: Foundational Principles (al-Mabaadi')
// ============================================================================

export const clFoundationalPrinciples: SarfTopic = {
  id: 'cl-foundational-principles',
  titleAr: 'المبادئ',
  titleEn: 'Foundational Principles',
  transliteration: 'al-Mabaadi\'',
  categoryId: 'cl-introduction',
  subcategoryId: 'cl-morphology-basics',
  levels: [
    {
      difficulty: 'beginner',
      summary:
        'Eight foundational principles of sarf: pattern (seegha), root letters, augmentation letters (remembered via the mnemonic "amaanun wa tasheel"), trilateral/quadrilateral/quinqueliteral roots, and the mujarrad/mazeed distinction.',
      body: `## Foundational Principles of Morphology (المبادئ)

Before studying verb and noun paradigms, As-Sughra establishes **eight foundational principles** (مبادئ / mabaadi'):

### 1. Pattern (الصيغة / as-Seegha)
The morphological template of a word — its structural shape.

### 2. Root Letters (الحروف الأصلية / al-Huroof al-Asliyya)
The original letters that form the core of a word.

### 3. Letters of Augmentation (حروف الزيادة / Huroof az-Ziyaada)
There are **10 letters** that can be added to a root to create new forms. They are encoded in the mnemonic: **أمانٌ وتسهيلٌ** (amaanun wa tasheel).
The 10 letters are: **أ، م، ا، ن، و، ت، س، ه، ي، ل**

### 4. Trilateral (الثلاثي / ath-Thulaathi)
A word with 3 root letters. Example: غَفَرَ (he forgave).

### 5. Quadrilateral (الرباعي / ar-Rubaa'i)
A word with 4 root letters. Example: بَعْثَرَ (he scattered).

### 6. Quinqueliteral (الخماسي / al-Khumaasi)
A word with 5 root letters. Example: سَفَرْجَلٌ (quince).

### 7. Bare / Unaugmented (المجرد / al-Mujarrad)
A word containing only root letters. Example: غَفَرَ (root: غ-ف-ر, no extra letters).

### 8. Augmented (المزيد فيه / al-Mazeed fihi)
A word containing root letters plus extra letters. Example: اسْتَغْفَرَ (he sought forgiveness — root: غ-ف-ر with added ا، س، ت).

### Noun Categories by Root Letters
Nouns are classified into three categories:
- **Trilateral:** قَلَمٌ (pen)
- **Quadrilateral:** بَرْزَخٌ (barrier/isthmus)
- **Quinqueliteral:** سَفَرْجَلٌ (quince)`,
      rules: [
        {
          arabic: 'حروف الزيادة عشرة مجموعة في: أمانٌ وتسهيلٌ',
          english:
            'The letters of augmentation are ten, collected in the mnemonic phrase "amaanun wa tasheel": hamza, meem, alif, noon, waw, ta, sin, ha, ya, lam.',
        },
        {
          arabic: 'المجرد ما كان على حروفه الأصلية فقط',
          english:
            'The mujarrad (bare) word contains only its root letters with no additions.',
          examples: [
            { arabic: 'غَفَرَ', translation: 'he forgave — root letters only: غ-ف-ر' },
            { arabic: 'بَعْثَرَ', translation: 'he scattered — root letters only: ب-ع-ث-ر' },
          ],
        },
        {
          arabic: 'المزيد فيه ما زيد على حروفه الأصلية',
          english:
            'The mazeed fih (augmented) word has extra letters beyond its root.',
          examples: [
            {
              arabic: 'اسْتَغْفَرَ',
              translation: 'he sought forgiveness — root غ-ف-ر + augmented ا، س، ت',
            },
          ],
        },
      ],
      tables: [
        {
          title: 'The Eight Foundational Principles',
          titleAr: 'المبادئ الثمانية',
          headers: ['#', 'Principle', 'Arabic', 'Example'],
          rows: [
            ['1', 'Pattern (seegha)', 'الصيغة', 'فَعَلَ — the template'],
            ['2', 'Root letters', 'الحروف الأصلية', 'غ-ف-ر in غَفَرَ'],
            ['3', 'Letters of augmentation', 'حروف الزيادة', 'أمانٌ وتسهيلٌ — 10 letters'],
            ['4', 'Trilateral', 'الثلاثي', 'غَفَرَ (3 root letters)'],
            ['5', 'Quadrilateral', 'الرباعي', 'بَعْثَرَ (4 root letters)'],
            ['6', 'Quinqueliteral', 'الخماسي', 'سَفَرْجَلٌ (5 root letters)'],
            ['7', 'Bare / Unaugmented', 'المجرد', 'غَفَرَ (root only)'],
            ['8', 'Augmented', 'المزيد فيه', 'اسْتَغْفَرَ (root + extras)'],
          ],
        },
        {
          title: 'Noun Categories by Root Letter Count',
          titleAr: 'أقسام الاسم بحسب عدد الحروف الأصلية',
          headers: ['#', 'Category', 'Arabic', 'Example'],
          rows: [
            ['1', 'Trilateral', 'ثلاثيّ', 'قَلَمٌ (pen)'],
            ['2', 'Quadrilateral', 'رباعيّ', 'بَرْزَخٌ (barrier)'],
            ['3', 'Quinqueliteral', 'خماسيّ', 'سَفَرْجَلٌ (quince)'],
          ],
        },
      ],
      sourceRef: 'As-Sughra fi at-Tasreef, Maqsid 1, Section 1',
    },
    {
      difficulty: 'intermediate',
      summary:
        'Al-Wusta expands the foundational principles to eight formal terms with precise definitions, adds the concepts of root (jidhr) and pattern (seegha/mithaal/binya), and provides the noun example salsabeel for quinqueliteral nouns.',
      body: `## Expanded Foundational Principles from Al-Wusta

Al-Wusta defines **eight foundational terms** with greater precision:

### 1. Trilateral (الثلاثي / ath-Thulaathi)
A word containing three root letters.
- Example: غَفَرَ (ghafara — "he forgave")

### 2. Quadrilateral (الرباعي / ar-Rubaa'iyy)
A word containing four root letters.
- Example: بَعْثَرَ (ba'thara — "he scattered")

### 3. Quinqueliteral (الخماسي / al-Khumaasiyy)
A word containing five root letters.
- Example: سَفَرْجَلٌ (safarjalun — "quince")

### 4. Mujarrad / Bare Form (المجرد / al-Mujarrad)
A word with no extra letters beyond its root.
- Example: غَفَرَ and بَعْثَرَ — both contain only root letters.

### 5. Mazeed Fih / Augmented (المزيد فيه / al-Mazeed fih)
A word with extra letters added to its root.
- Example: اسْتَغْفَرَ (istaghfara — "he sought forgiveness") — root is غ-ف-ر with three additions.

### 6. Letters of Augmentation (حروف الزيادة / Huroof az-Ziyaada)
There are **ten** augmentation letters collected in the mnemonic:
> **أَمَانٌ وَتَسْهِيلٌ** (amaanun wa tasheel)

The letters: **أ / م / ا / ن / و / ت / س / ه / ي / ل**

Any letter in a word that is not a root letter must be one of these ten.

### 7. Root (الجذر / al-Jidhr)
Also called the root letters (حروف أصلية / huroof asliyya) — the core letters from which words branch off.

### 8. Pattern / Form (الصيغة / as-Seegha)
Also called مثال (mithaal) and بنية (binya) — the shape, form, or structure of the word.

### Noun Categories
Nouns in Al-Wusta are similarly divided by root letter count:
- **Trilateral:** قَلَمٌ (qalamun — "pen")
- **Quadrilateral:** بَرْزَخٌ (barzakhun — "barrier/isthmus")
- **Quinqueliteral:** سَلْسَبِيلٌ (salsabeel — "a spring in Paradise")

Note that Al-Wusta uses the example سَلْسَبِيلٌ for the quinqueliteral noun instead of سَفَرْجَلٌ used in As-Sughra, showing that different words can illustrate the same principle.`,
      rules: [
        {
          arabic: 'حروف الزيادة عشرة مجموعة في: أَمَانٌ وَتَسْهِيلٌ',
          english:
            'The ten letters of augmentation are collected in the mnemonic "amaanun wa tasheel": alif with hamza, meem, alif, noon, waw, ta, sin, ha, ya, lam.',
        },
        {
          arabic: 'الجذر هو الحروف الأصلية التي تتفرع منها الكلمات',
          english:
            'The root (jidhr) is the set of original letters from which words branch off. It is also called al-huroof al-asliyya.',
        },
        {
          arabic: 'الصيغة تُسمى أيضًا مثالًا وبنية',
          english:
            'The pattern (seegha) is also called mithaal (model) and binya (structure) — all three terms refer to the morphological shape of a word.',
        },
      ],
      tables: [
        {
          title: 'The Eight Foundational Terms (Al-Wusta)',
          titleAr: 'المبادئ الثمانية من الوسطى',
          headers: ['#', 'Term', 'Arabic', 'Definition', 'Example'],
          rows: [
            ['1', 'Trilateral', 'الثلاثي', 'Three root letters', 'غَفَرَ'],
            ['2', 'Quadrilateral', 'الرباعي', 'Four root letters', 'بَعْثَرَ'],
            ['3', 'Quinqueliteral', 'الخماسي', 'Five root letters', 'سَفَرْجَلٌ'],
            ['4', 'Mujarrad', 'المجرد', 'Root letters only', 'غَفَرَ، بَعْثَرَ'],
            ['5', 'Mazeed fih', 'المزيد فيه', 'Root + augmented letters', 'اسْتَغْفَرَ'],
            ['6', 'Huroof az-Ziyaada', 'حروف الزيادة', 'Ten augmentation letters', 'أمانٌ وتسهيلٌ'],
            ['7', 'Root (Jidhr)', 'الجذر', 'Core root letters', 'حروف أصلية'],
            ['8', 'Pattern (Seegha)', 'الصيغة', 'Morphological form', 'Also: مثال، بنية'],
          ],
        },
        {
          title: 'Noun Categories Compared (As-Sughra vs. Al-Wusta)',
          titleAr: 'أقسام الاسم — مقارنة',
          headers: ['Category', 'Arabic', 'As-Sughra Example', 'Al-Wusta Example'],
          rows: [
            ['Trilateral', 'ثلاثي', 'قَلَمٌ (pen)', 'قَلَمٌ (pen)'],
            ['Quadrilateral', 'رباعي', 'بَرْزَخٌ (barrier)', 'بَرْزَخٌ (barrier)'],
            ['Quinqueliteral', 'خماسي', 'سَفَرْجَلٌ (quince)', 'سَلْسَبِيلٌ (spring in Paradise)'],
          ],
        },
      ],
      sourceRef: 'Al-Wusta fi at-Tasreef, Maqsid 1, Preliminaries',
    },
  ],
  relatedTopicIds: ['cl-word-types', 'cl-morphological-scale', 'cl-six-trilateral-doors'],
  tags: [
    'trilateral',
    'quadrilateral',
    'mujarrad',
    'mazeed',
    'ziyaadah',
    'noun categories',
  ],
};
