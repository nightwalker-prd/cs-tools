import type { NahwTopic } from '../types';

export const tawkid: NahwTopic = {
  id: 'tawkid',
  titleAr: 'التوكيد',
  titleEn: 'Emphasis (Tawkid)',
  transliteration: 'at-Tawkid',
  categoryId: 'pronouns',
  subcategoryId: 'emphasis',
  levels: [
    {
      difficulty: 'beginner',
      summary: 'Emphasis (تأكيد) reinforces the meaning of a word. It has two structures: verbal emphasis (تأكيد لفظي) repeats the word, and semantic emphasis (تأكيد معنوي) uses special words like نَفْس, عَيْن, كُلّ, جَمِيع, كِلَا/كِلْتَا, and أَجْمَع. The emphasis word (تأكيد) must agree in case with the emphasized word (مؤكَّد). Quantifiers can also function as direct grammatical slots.',
      body: `## Emphasis (التأكيد)

In Arabic, emphasis is called **تَأْكِيد**. Nouns, adjectives, verbs, and particles can all be emphasised:

| Word Type | Purpose of Emphasis |
|---|---|
| **Noun** | Emphatic pronoun (himself, herself) or quantifier (all, every) |
| **Adjective** | Intensifier (very, extremely) |
| **Verb** | Certainty of occurrence (certainly, indeed, do) |
| **Particle** | Intensifier (definitely, surely) |

### Two Structures of Arabic Emphasis

1. **تَأْكِيد لَفْظِيّ** (Verbal/Literal Emphasis) — repeating the word to be emphasised
2. **تَأْكِيد مَعْنَوِيّ** (Semantic Emphasis) — using specific words created for emphasis

**Terminology:** The original word = **مُؤَكَّد** (the emphasised); the repeating/emphatic word = **تَأْكِيد** (the emphasiser). Both must **agree in i\`rab** (grammatical case).

---

### تأكيد لفظي (Emphasis by Repetition)

Works with any word type:

- **Noun:** جَاءَ زَيْدٌ زَيْدٌ — "Zaid himself came"
- **Adjective:** الْمَاءُ حَارٌّ حَارٌّ — "The water is extremely hot"
- **Verb:** ذَهَبَ ذَهَبَ زَيْدٌ — "Zaid certainly went"
- **Particle:** لَا لَا أَغْتَابُ أَحَدًا — "I will definitely not backbite anyone"

---

### تأكيد معنوي (Semantic Emphasis)

Uses specific Arabic words. Two subcategories:

#### A. Emphatic Pronouns: نَفْس and عَيْن

These become مُضَاف to the pronoun of the مُؤَكَّد:
> جَاءَ المَلِكُ نَفْسُهُ — "The king himself came"
> جَاءَ المَلِكُ عَيْنُهُ — "The king himself came"

For duals: أَنْفُسُهُمَا / أَعْيُنُهُمَا. For plurals: أَنْفُسُهُمْ / أَعْيُنُهُمْ.

**Distinguishing نَفْس as emphasis vs. reflexive:**
- As emphasis: agrees in i\`rab with the word it emphasises — رَأَيْتُ الرَّجُلَ نَفْسَهُ (I saw the man himself)
- As reflexive: is the مَفْعُول بِهِ and refers back to the فَاعِل — رَأَى الرَّجُلُ نَفْسَهُ (The man saw himself)

#### B. Inclusive Quantifiers: كِلَا, كِلْتَا, كُلّ, جَمِيع, أَجْمَع

These emphasize totality:
- **كِلَا / كِلْتَا** (both) — for duals only
- **كُلّ** (all, every, entire) — for singular and plural
- **جَمِيع** (all, entire) — for singular and plural
- **أَجْمَع** (all together) — strongest emphasis, can follow كُلّ as a second layer

In the مُؤَكَّد–تأكيد structure, quantifiers become مُضَاف to the **pronoun** of the مُؤَكَّد.

#### Quantifiers as Direct Slots

When quantifiers become مُضَاف to the **noun** directly (not its pronoun), they fill a direct grammatical slot:
> جَاءَ كُلُّ النَّاسِ — "All the people came" (كُلُّ = فاعل directly)

vs. the emphasis structure:
> جَاءَ النَّاسُ كُلُّهُمْ — "The people came, all of them" (كُلُّهُمْ = تأكيد)

#### Non-Inclusive Quantifiers

Words that denote a subset: بَعْض (some), سَائِر (remaining/rest), بَقِيَّة (remainder).

---

### Emphasis of Verbs

Different tenses use different emphatic tools:
- **Past tense:** قَدْ (indeed) and لَقَدْ (certainly indeed)
- **Present tense:** لَامُ الابْتِدَاء (prefix لَ for emphasis)
- **Future tense:** نُونُ التَّأْكِيد (suffix نَّ for strong emphasis)
- **All tenses:** Verbal repetition (تأكيد لفظي)

---

### Emphasis of Pronouns

An attached pronoun (ضمير متصل) is emphasised using a detached pronoun (ضمير منفصل):
> ذَهَبْتُ أَنَا — "I went" (أَنَا emphasises تُ)
> رَأَيْتُكَ أَنْتَ — "I saw you" (أَنْتَ emphasises كَ)
> هٰذَا كِتَابِي أَنَا — "This is my book" (أَنَا emphasises ي)

---

### حَرْفُ صِلَةٍ with تأكيد مَعْنَوِيّ

Some تأكيد مَعْنَوِيّ words, such as **نَفْس** and **أَجْمَع**, can be preceded by the preposition **بِ** (called حَرْفُ صِلَة — an emphatic particle that adds no translatable meaning):

> **ذَبَحَ رَسُولُ اللهِ ﷺ كَبْشًا بِنَفْسِهِ** — *The Prophet of Allah slaughtered a lamb himself.*

The بِ here is not a regular preposition; it is حَرْفُ صِلَة added for emphasis.`,
      rules: [
        {
          arabic: 'التأكيد يتبع المؤكَّد في إعرابه',
          english: 'The emphasis word (تأكيد) must agree in grammatical case (i\`rab) with the emphasized word (مؤكَّد).',
          examples: [
            { arabic: 'جَاءَ المَلِكُ نَفْسُهُ', translation: 'The king himself came', irab: 'نَفْسُهُ: تأكيد معنوي مرفوع — agrees with المَلِكُ (فاعل مرفوع)' },
            { arabic: 'رَأَيْتُ المَلِكَ نَفْسَهُ', translation: 'I saw the king himself', irab: 'نَفْسَهُ: تأكيد معنوي منصوب — agrees with المَلِكَ (مفعول به منصوب)' },
          ],
        },
        {
          arabic: 'التأكيد اللفظي يكون بتكرار اللفظ لأي نوع من الكلمات',
          english: 'Verbal emphasis (تأكيد لفظي) works by repeating the exact word. It applies to nouns, adjectives, verbs, and particles.',
          examples: [
            { arabic: 'جَاءَ زَيْدٌ زَيْدٌ', translation: 'Zaid himself came', irab: 'زَيْدٌ (second): تأكيد لفظي — repeating the noun' },
            { arabic: 'الْمَاءُ حَارٌّ حَارٌّ', translation: 'The water is extremely hot', irab: 'حَارٌّ (second): تأكيد لفظي — intensifies the adjective' },
            { arabic: 'ذَهَبَ ذَهَبَ زَيْدٌ', translation: 'Zaid certainly went', irab: 'ذَهَبَ (first): مؤكَّد — ذَهَبَ (second): تأكيد لفظي' },
            { arabic: 'لَا لَا أَغْتَابُ أَحَدًا', translation: 'I will definitely not backbite anyone', irab: 'لَا (second): تأكيد لفظي of the particle' },
          ],
        },
        {
          arabic: 'كِلَا/كِلْتَا للمثنى، وكُلّ وجَمِيع للجمع والمفرد',
          english: 'كِلَا (m.) and كِلْتَا (f.) are used for duals only ("both"). كُلّ and جَمِيع are used for plural and singular nouns ("all/every/entire").',
          examples: [
            { arabic: 'جَاءَ الوَلَدَانِ كِلَاهُمَا', translation: 'Both boys came', irab: 'كِلَاهُمَا: تأكيد معنوي — quantifier for dual' },
            { arabic: 'سَجَدَ المَلَائِكَةُ كُلُّهُمْ أَجْمَعُونَ', translation: 'Every single one of the angels prostrated', irab: 'كُلُّهُمْ: تأكيد أول — أَجْمَعُونَ: تأكيد ثانٍ (second layer after كُلّ)' },
            { arabic: 'جَاءَ الرِّجَالُ جَمِيعُهُمْ', translation: 'All the men came', irab: 'جَمِيعُهُمْ: تأكيد معنوي مرفوع' },
          ],
        },
        {
          arabic: 'ضمير التأكيد للضمير المتصل يكون ضميرًا منفصلًا',
          english: 'An attached pronoun is emphasized using a detached pronoun. It would be incorrect to repeat an attached pronoun.',
          examples: [
            { arabic: 'ذَهَبْتُ أَنَا', translation: 'I went (emphatic)', irab: 'أَنَا: تأكيد لفظي for the attached pronoun تُ' },
            { arabic: 'رَأَيْتُكَ أَنْتَ', translation: 'I saw you (emphatic)', irab: 'أَنْتَ: تأكيد لفظي for the attached pronoun كَ' },
            { arabic: 'هٰذَا كِتَابِي أَنَا', translation: 'This is my book (emphatic)', irab: 'أَنَا: تأكيد لفظي for the attached pronoun ي' },
          ],
        },
        {
          arabic: 'الفعل يُؤكَّد بقَدْ ولَقَدْ ولام الابتداء ونون التأكيد',
          english: 'Verbs are emphasized using قَدْ (past, "indeed"), لَقَدْ (past, "certainly"), لام الابتداء (present), and نون التأكيد (future, "certainly will").',
          examples: [
            { arabic: 'قَدْ أَفْلَحَ المُؤْمِنُونَ', translation: 'Indeed the believers have succeeded', source: 'Al-Mu\'minun 23:1', irab: 'قَدْ: حرف تحقيق — emphasizes the past verb' },
            { arabic: 'لَقَدْ أَغْرَقَ اللهُ فِرْعَوْنَ', translation: 'Indeed Allah certainly drowned Pharaoh', irab: 'لَقَدْ: لام + قد — double emphasis on past verb' },
            { arabic: 'لَيَفْعَلَنَّ', translation: 'He will certainly do', irab: 'لَ: لام الابتداء — نَّ: نون التأكيد' },
          ],
        },
      ],
      examples: [
        { arabic: 'ذَبَحَ رَسُولُ اللهِ ﷺ كَبْشًا بِنَفْسِهِ', translation: 'The Prophet of Allah slaughtered a lamb himself', source: 'FSTU Arabic, Unit 4', irab: 'بِ: حرف صلة (emphatic), نَفْسِهِ: تأكيد معنوي مجرور لفظًا منصوب محلًّا' },
      ],
      tables: [
        {
          title: 'Types of Emphasis',
          titleAr: 'أنواع التأكيد',
          headers: ['Type', 'Arabic', 'Method', 'Example'],
          rows: [
            ['Verbal (Noun)', 'تأكيد لفظي', 'Repeat the noun', 'جَاءَ زَيْدٌ زَيْدٌ'],
            ['Verbal (Adjective)', 'تأكيد لفظي', 'Repeat the adjective', 'الْمَاءُ حَارٌّ حَارٌّ'],
            ['Verbal (Verb)', 'تأكيد لفظي', 'Repeat the verb', 'ذَهَبَ ذَهَبَ زَيْدٌ'],
            ['Verbal (Particle)', 'تأكيد لفظي', 'Repeat the particle', 'إِنَّ إِنَّ زَيْدًا قَائِمٌ'],
            ['Semantic (Identity)', 'تأكيد معنوي', 'نَفْس / عَيْن', 'جَاءَ المَلِكُ نَفْسُهُ'],
            ['Semantic (Quantifier)', 'تأكيد معنوي', 'كُلّ / جَمِيع / كِلَا / أَجْمَع', 'سَجَدَ المَلَائِكَةُ كُلُّهُمْ'],
          ],
        },
        {
          title: 'Inclusive Quantifiers',
          titleAr: 'ألفاظ التأكيد المعنوي (الشمول)',
          headers: ['Word', 'Meaning', 'Used with', 'Example'],
          rows: [
            ['كِلَا / كِلْتَا', 'Both', 'Duals only', 'جَاءَ الوَلَدَانِ كِلَاهُمَا'],
            ['كُلّ', 'All / every / entire', 'Singular & plural', 'سَجَدَ المَلَائِكَةُ كُلُّهُمْ'],
            ['جَمِيع', 'All / entire', 'Singular & plural', 'جَاءَ الرِّجَالُ جَمِيعُهُمْ'],
            ['أَجْمَع / أَجْمَعُونَ', 'All together (strongest)', 'After كُلّ for extra emphasis', 'كُلُّهُمْ أَجْمَعُونَ'],
          ],
        },
        {
          title: 'Quantifiers: Emphasis vs. Direct Slot',
          titleAr: 'الفرق بين التأكيد والموقع المباشر',
          headers: ['Structure', 'Emphasis (مؤكد–تأكيد)', 'Direct Slot'],
          rows: [
            ['كِلَا', 'جَاءَ الرَّجُلَانِ كِلَاهُمَا', 'جَاءَ كِلَا الرَّجُلَيْنِ'],
            ['كُلّ', 'جَاءَ النَّاسُ كُلُّهُمْ', 'جَاءَ كُلُّ النَّاسِ'],
            ['جَمِيع', 'جَاءَ الرِّجَالُ جَمِيعُهُمْ', 'جَاءَ جَمِيعُ الرِّجَالِ'],
          ],
        },
        {
          title: 'Verb Emphasis Tools by Tense',
          titleAr: 'أدوات تأكيد الفعل',
          headers: ['Tense', 'Tool', 'Example', 'Translation'],
          rows: [
            ['Past', 'قَدْ', 'قَدْ أَفْلَحَ المُؤْمِنُونَ', 'Indeed the believers succeeded'],
            ['Past', 'لَقَدْ', 'لَقَدْ أَغْرَقَ اللهُ فِرْعَوْنَ', 'Allah certainly drowned Pharaoh'],
            ['Present', 'لامُ الابْتِدَاء', 'لَنَعْتَصِمُ بِكِتَابِ اللهِ', 'We certainly hold fast to the Book of Allah'],
            ['Future', 'نُونُ التَّأْكِيد', 'لَنَتُوبَنَّ مِنَ الذُّنُوبِ', 'We will certainly repent from sins'],
            ['All', 'تأكيد لفظي', 'نَعْتَصِمُ نَعْتَصِمُ بِالقُرْآنِ', 'We hold fast, we hold fast to the Quran'],
          ],
        },
      ],
      sourceRef: 'FSTU Arabic, Unit 4, pp 351-416',
    },
  ],
  relatedTopicIds: ['na-t', 'atf', 'badal', 'damir-marfu', 'damir-mansub'],
  tags: ['tawkid', 'emphasis', 'tabi', 'follower', 'nafs', 'ayn', 'kull', 'jami', 'ajma', 'kila', 'kilta', 'repetition', 'quantifier', 'nun tawkid', 'harf sila'],
};
