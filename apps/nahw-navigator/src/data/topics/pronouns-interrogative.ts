import type { NahwTopic } from '../types';

export const harfIstifham: NahwTopic = {
  id: 'harf-istifham',
  titleAr: 'حرف الاستفهام',
  titleEn: 'Interrogative Particles',
  transliteration: 'Harf al-Istifham',
  categoryId: 'pronouns',
  subcategoryId: 'interrogative-pronouns',
  levels: [
    {
      difficulty: 'beginner',
      summary: 'Interrogative particles (حرف الاستفهام) are هَلْ and أ (hamza). They form polar (yes/no) questions by being placed at the beginning of a sentence. Unlike noun interrogatives, they do not occupy any grammatical slot in the sentence. Answers use special particles: نَعَمْ, بَلَى, أَجَلْ, لَا, كَلَّا.',
      body: `## Interrogative Particles (حرف الاستفهام)

An interrogative pronoun is a word used to ask a question. In Arabic, an interrogative sentence is called **اِسْتِفْهَامٌ** and the interrogative word is called **أَدَاةُ الاسْتِفْهَام**.

There are two types:
1. **حَرْفُ الاسْتِفْهَام** — particle interrogatives (هَلْ and أ)
2. **اسْمُ الاسْتِفْهَام** — noun interrogatives (مَنْ, مَا, أَيْنَ, etc.)

### Polar Questions (Yes/No)

Polar questions are formed by adding **هَلْ** or **أ** (hamza) at the beginning of a sentence. These particles do **not** take the place of any grammatical slot — they sit outside the sentence structure.

### Translation Rules

**In a nominal sentence (جملة اسمية):** Move is/are/was/were to the beginning:
> هُوَ قَائِمٌ → هَلْ هُوَ قَائِمٌ؟ — "Is he standing?"

**In a verbal sentence (جملة فعلية):** Add an auxiliary (did/do/is/will):
> جَاءَ زَيْدٌ → هَلْ جَاءَ زَيْدٌ؟ — "Did Zaid come?"

### Hamza with Non-Polar Questions

The hamza can also form **non-polar** (choice) questions when combined with **أَمْ** (or). The focal point of the question must come **immediately after** the hamza:
> أَزَيْدًا رَأَيْتَ أَمْ خَالِدًا؟ — "Did you see Zaid or Khalid?"

### Special Rules for هَمْزَة الاستفهام

1. When أ comes before a word starting with اَلْ, it changes to آ: أ + اللهُ خَيْرٌ → آللهُ خَيْرٌ
2. The hamza is placed **before** the conjunction particle (حرف عطف), unlike other interrogatives: أَفَأَنْتَ ذَاهِبٌ (hamza before فَ)
3. The hamza can be combined with negation for rhetorical/emphatic questions: أَلَا تَشْكُرُ اللهَ — "Will you not be thankful to Allah?"

### Answering Polar Questions (أحرف الجواب)

**Affirmative particles:**
- **نَعَمْ** (yes) — reply to a question
- **أَجَلْ** (yes) — affirm a statement
- **بَلَى** (certainly) — affirm in response to a negative question

**Negative particles:**
- **لَا** (no)
- **كَلَّا** (certainly not / never) — more emphatic

### Important: بَلَى vs. نَعَمْ with Negative Questions

When answering a negative question, use **بَلَى** to deny the negation. Using نَعَمْ would affirm the negative:
> أَلَا تُصَلِّي؟ — "Do you not pray?"
> بَلَى — "Certainly (I do pray)." vs. نَعَمْ — "Yes (I do not pray)."`,
      rules: [
        {
          arabic: 'حرف الاستفهام لا يحتل موقعًا إعرابيًا',
          english: 'Interrogative particles (هَلْ and أ) do not occupy any grammatical slot in the sentence. They sit outside the sentence structure.',
          examples: [
            { arabic: 'هَلْ هُوَ قَائِمٌ؟', translation: 'Is he standing?', irab: 'هَلْ: حرف استفهام — هُوَ: مبتدأ — قَائِمٌ: خبر' },
            { arabic: 'أَجَاءَ زَيْدٌ؟', translation: 'Did Zaid come?', irab: 'أ: حرف استفهام — جَاءَ: فعل — زَيْدٌ: فاعل' },
          ],
        },
        {
          arabic: 'بَلَى تنفي النفي وتثبت الإيجاب',
          english: 'بَلَى is used to deny the negation in a negative question (meaning "actually, yes"). Using نَعَمْ with a negative question affirms the negative.',
          examples: [
            { arabic: 'أَلَسْتُ بِرَبِّكُمْ؟ قَالُوا بَلَى', translation: 'Am I not your Lord? They said: Certainly (You are)', source: 'Al-A\'raf 7:172', irab: 'بَلَى: حرف جواب — denies the negation, affirming that He is their Lord' },
          ],
        },
        {
          arabic: 'الهمزة مع أَمْ تصنع سؤالًا اختياريًا',
          english: 'When the hamza is paired with أَمْ (or), the question becomes a choice question (non-polar). The focal point must come immediately after the hamza.',
          examples: [
            { arabic: 'أَزَيْدًا رَأَيْتَ أَمْ خَالِدًا؟', translation: 'Did you see Zaid or Khalid?', irab: 'أ: حرف استفهام — زَيْدًا: مفعول به مقدم — أَمْ: حرف عطف' },
          ],
        },
      ],
      tables: [
        {
          title: 'Interrogative Particles',
          titleAr: 'حروف الاستفهام',
          headers: ['Particle', 'Usage', 'Example', 'Translation'],
          rows: [
            ['هَلْ', 'Yes/no questions', 'هَلْ جَاءَ زَيْدٌ؟', 'Did Zaid come?'],
            ['أ (hamza)', 'Yes/no or choice questions', 'أَجَاءَ زَيْدٌ؟', 'Did Zaid come?'],
            ['أ...أَمْ', 'Choice questions', 'أَزَيْدٌ هُنَا أَمْ عَمْرٌو؟', 'Is Zaid here or Amr?'],
          ],
        },
        {
          title: 'Answer Particles',
          titleAr: 'أحرف الجواب',
          headers: ['Particle', 'Meaning', 'Usage'],
          rows: [
            ['نَعَمْ', 'Yes', 'Reply affirmatively to a question'],
            ['أَجَلْ', 'Yes', 'Affirm a statement (not a question)'],
            ['بَلَى', 'Certainly yes', 'Affirm in response to a negative question'],
            ['لَا', 'No', 'Reply negatively'],
            ['كَلَّا', 'Certainly not', 'Emphatic negation'],
          ],
        },
        {
          title: 'Translation Auxiliaries for Verbal Sentences',
          titleAr: 'ترجمة الاستفهام في الجملة الفعلية',
          headers: ['Tense', 'English Auxiliary', 'Example'],
          rows: [
            ['Past', 'Did', 'هَلْ ذَهَبَ؟ — Did he go?'],
            ['Present Habitual', 'Do/Does', 'هَلْ تَذْهَبُ؟ — Do you go?'],
            ['Present Continuous', 'Is/Are', 'هَلْ يَذْهَبُ الآنَ؟ — Is he going now?'],
            ['Future', 'Will', 'هَلْ سَتَذْهَبُ؟ — Will you go?'],
          ],
        },
      ],
      sourceRef: 'FSTU Arabic, Unit 4, pp 351-416',
    },
  ],
  relatedTopicIds: ['ism-istifham', 'damir-marfu', 'jumlah-ismiyyah', 'jumlah-fi-liyyah'],
  tags: ['istifham', 'interrogative', 'hal', 'hamza', 'question', 'polar', 'yes-no', 'answer particles', 'bala'],
};

export const ismIstifham: NahwTopic = {
  id: 'ism-istifham',
  titleAr: 'اسم الاستفهام',
  titleEn: 'Interrogative Nouns',
  transliteration: 'Ism al-Istifham',
  categoryId: 'pronouns',
  subcategoryId: 'interrogative-pronouns',
  levels: [
    {
      difficulty: 'beginner',
      summary: 'Interrogative nouns (اسم الاستفهام) are words like مَنْ (who), مَا (what), أَيْنَ (where), مَتَى (when), كَيْفَ (how), كَمْ (how many), and أَيّ (which). Unlike particles, they occupy a grammatical slot in the sentence. They can also be used rhetorically to make statements rather than ask questions.',
      body: `## Interrogative Nouns (اسم الاستفهام)

There are eight noun interrogatives. Unlike حَرْف الاستفهام, the اسْمُ الاسْتِفْهَام **takes the place of a grammatical slot** in the sentence. Its slot depends on the word it replaces.

### مَنْ / مَنْ ذَا (Who)

In a **nominal sentence**: مَنْ is مُبْتَدَأ (if followed by indefinite/semi-sentence) or خَبَر مُقَدَّم (if followed by definite word):
> مَنْ فِي الْبَيْتِ؟ — "Who is in the house?" (مَنْ = مبتدأ)
> مَنْ خَالِدٌ؟ — "Who is Khalid?" (مَنْ = خبر مقدم)

In a **verbal sentence**: مَنْ becomes مَفْعُول بِهِ مُقَدَّم:
> مَنْ رَأَيْتَ؟ — "Who did you see?"

In an **إضافة**: مَنْ becomes مُضَاف إِلَيْهِ and translates as "whose":
> كِتَابُ مَنْ هٰذَا؟ — "Whose book is this?"

### مَا / مَاذَا (What)

Follows the same tarkib rules as مَنْ. When preceded by a preposition, the alif drops: بِمَ, مِمَّ, عَمَّ.

### أَيْنَ (Where)

Always خَبَر مُقَدَّم in nominal sentences, مَفْعُول فِيهِ مُقَدَّم in verbal sentences.

### مَتَى (When)

Same pattern as أَيْنَ. The related word أَيَّانَ also means "when" but is reserved for matters of great importance (e.g., the Day of Judgement in the Quran).

### كَيْفَ (How)

خَبَر مُقَدَّم in nominal sentences, حَال مُقَدَّم in verbal sentences.

### أَنَّى (From where / How)

Has two meanings depending on context: "from where" (like أَيْنَ) or "how" (like كَيْفَ).

### كَمْ (How many)

Followed by a تَمْيِيز (specifier) in the singular accusative. Can fill multiple grammatical slots: مبتدأ, خبر مقدم, مفعول به, مفعول فيه, or مفعول مطلق.

**كَمْ الخَبَرِيَّة (Rhetorical كَمْ):** When used rhetorically (exclamation, not a real question), the تمييز becomes **مَجْرُور** (genitive) and can be singular or plural. It can also be preceded by **مِنْ** (حَرْفُ صِلَة — emphatic particle). When مِنْ is present, the تمييز does not have to come immediately after كَمْ:

> **كَمْ مِنْ تَمْرَةٍ أَكَلْتَ!** or **كَمْ أَكَلْتَ مِنْ تَمْرَةٍ!** — *How many dates you ate!*

### أَيُّ (Which)

Becomes مُضَاف to the noun it asks about. Translated as "which" (with indefinite) or "which of" (with definite).

### لِمَ / لِمَاذَا (Why)

Composed of لِ (preposition) + مَ/مَاذَا. Functions as مَفْعُول لَهُ (adverb of cause).

### Rhetorical Questions (الاستفهام البلاغي)

Interrogatives can be used rhetorically to make statements:
> أَإِلٰهٌ مَعَ اللهِ — "Is there a god with Allah?" (meaning: there is no other god)`,
      rules: [
        {
          arabic: 'اسم الاستفهام يحتل موقعًا إعرابيًا في الجملة',
          english: 'Unlike particles, noun interrogatives occupy a grammatical slot in the sentence. Their slot depends on what they replace in the answer.',
          examples: [
            { arabic: 'مَنْ خَالِدٌ؟', translation: 'Who is Khalid?', irab: 'مَنْ: خبر مقدم — خَالِدٌ: مبتدأ مؤخر' },
            { arabic: 'مَنْ رَأَيْتَ؟', translation: 'Who did you see?', irab: 'مَنْ: مفعول به مقدم — رَأَيْتَ: فعل وفاعل' },
          ],
        },
        {
          arabic: 'مَنْ ومَا: مبتدأ مع النكرة، خبر مقدم مع المعرفة',
          english: 'مَنْ and مَا are مبتدأ when followed by indefinite/semi-sentence, and خبر مقدم when followed by a definite word.',
          examples: [
            { arabic: 'مَنْ فِي الْبَيْتِ؟', translation: 'Who is in the house?', irab: 'مَنْ: مبتدأ — فِي الْبَيْتِ: خبر (شبه جملة)' },
            { arabic: 'مَا هٰذَا؟', translation: 'What is this?', irab: 'مَا: خبر مقدم — هٰذَا: مبتدأ مؤخر' },
          ],
        },
        {
          arabic: 'كَمْ يليها تمييز مفرد منصوب',
          english: 'كَمْ is followed by a singular accusative specifier (تمييز) but translated as plural.',
          examples: [
            { arabic: 'كَمْ تَمْرَةً أَكَلْتَ؟', translation: 'How many dates did you eat?', irab: 'كَمْ تَمْرَةً: مفعول به مقدم — تَمْرَةً: تمييز منصوب' },
            { arabic: 'كَمْ سَنَةً عُمُرُكَ؟', translation: 'How old are you?', irab: 'كَمْ سَنَةً: خبر مقدم — عُمُرُكَ: مبتدأ مؤخر' },
          ],
        },
        {
          arabic: 'مَا تُحذف ألفها بعد حرف الجر',
          english: 'When مَا is preceded by a preposition, its alif is dropped: بِمَ, لِمَ, مِمَّ, عَمَّ.',
          examples: [
            { arabic: 'بِمَ يَطُوفُ الحُجَّاجُ؟', translation: 'What do the pilgrims circumambulate?', irab: 'بِمَ: حرف جر + مجرور — مفعول فيه غير صريح' },
            { arabic: 'لِمَ تَذْهَبُ؟', translation: 'Why are you going?', irab: 'لِمَ: حرف جر + مجرور — مفعول له غير صريح' },
          ],
        },
        {
          arabic: 'أَيُّ تصير مضافًا إلى ما بعدها',
          english: 'أَيُّ becomes مضاف to the noun after it. Translated as "which" (with indefinite) or "which of" (with definite).',
          examples: [
            { arabic: 'أَيَّ كِتَابٍ قَرَأْتَ؟', translation: 'Which book did you read?', irab: 'أَيَّ: مفعول به مقدم (مضاف) — كِتَابٍ: مضاف إليه' },
            { arabic: 'أَيَّ يَوْمٍ صُمْتَ؟', translation: 'Which day did you fast?', irab: 'أَيَّ يَوْمٍ: مفعول فيه مقدم' },
          ],
        },
      ],
      tables: [
        {
          title: 'The Eight Noun Interrogatives',
          titleAr: 'أسماء الاستفهام الثمانية',
          headers: ['#', 'Arabic', 'Meaning', 'Example'],
          rows: [
            ['1', 'مَنْ / مَنْ ذَا', 'Who', 'مَنْ رَبُّكَ؟'],
            ['2', 'مَا / مَاذَا', 'What', 'مَا هٰذَا؟'],
            ['3', 'أَيْنَ', 'Where', 'أَيْنَ الْكِتَابُ؟'],
            ['4', 'مَتَى', 'When', 'مَتَى الصَّلَاةُ؟'],
            ['5', 'كَيْفَ', 'How', 'كَيْفَ حَالُكَ؟'],
            ['6', 'أَنَّى', 'From where / How', 'أَنَّى هٰذَا؟'],
            ['7', 'كَمْ', 'How many', 'كَمْ وَلَدًا عِنْدَكَ؟'],
            ['8', 'أَيُّ', 'Which', 'أَيُّ كِتَابٍ قَرَأْتَ؟'],
          ],
        },
        {
          title: 'Interrogative Noun Slots in Sentences',
          titleAr: 'مواقع أسماء الاستفهام الإعرابية',
          headers: ['Interrogative', 'In Nominal Sentence', 'In Verbal Sentence'],
          rows: [
            ['مَنْ (who)', 'مبتدأ or خبر مقدم', 'مفعول به مقدم'],
            ['مَا/مَاذَا (what)', 'مبتدأ or خبر مقدم', 'مفعول به مقدم'],
            ['أَيْنَ (where)', 'خبر مقدم', 'مفعول فيه مقدم'],
            ['مَتَى (when)', 'خبر مقدم', 'مفعول فيه مقدم'],
            ['كَيْفَ (how)', 'خبر مقدم', 'حال مقدم'],
            ['أَنَّى (where/how)', 'like أَيْنَ or كَيْفَ', 'like أَيْنَ or كَيْفَ'],
            ['كَمْ (how many)', 'مبتدأ or خبر مقدم', 'مفعول به / فيه / مطلق'],
            ['أَيُّ (which)', 'depends on context', 'depends on context'],
          ],
        },
        {
          title: 'Interrogatives with Prepositions',
          titleAr: 'أسماء الاستفهام مع حروف الجر',
          headers: ['Combination', 'Meaning', 'Example'],
          rows: [
            ['إِلَى مَنْ', 'To whom', 'إِلَى مَنْ تَذْهَبُ؟'],
            ['لِمَنْ', 'Whose / For whom', 'لِمَنْ هٰذَا؟'],
            ['بِمَ', 'With what', 'بِمَ يَطُوفُ الحُجَّاجُ؟'],
            ['مِمَّ', 'From what', 'مِمَّ صُنِعَ؟'],
            ['عَمَّ', 'About what', 'عَمَّ يَتَسَاءَلُونَ؟'],
            ['لِمَ / لِمَاذَا', 'Why', 'لِمَ تَذْهَبُ؟'],
          ],
        },
      ],
      sourceRef: 'FSTU Arabic, Unit 4, pp 351-416',
    },
  ],
  relatedTopicIds: ['harf-istifham', 'damir-marfu', 'mubtada-khabar', 'maf-ul-bihi', 'maf-ul-fihi'],
  tags: ['istifham', 'interrogative', 'man', 'ma', 'ayna', 'mata', 'kayfa', 'kam', 'ayyu', 'question', 'rhetorical'],
};
