import type { NahwTopic } from '../types';

export const jumlaSughra: NahwTopic = {
  id: 'jumla-sughra',
  titleAr: 'الجملة الصغرى',
  titleEn: 'Nested Sentences (Jumla Sughra)',
  transliteration: 'al-Jumla as-Sughra',
  categoryId: 'nested-sentences',
  subcategoryId: 'direct-nesting',
  levels: [
    {
      difficulty: 'beginner',
      summary: 'A sentence can be nested directly inside another sentence to fill a grammatical slot. The outer sentence is the jumla kubra and the inner is the jumla sughra. The nested sentence can serve as khabar, maf\'ul bihi (quotation), hal, ma\'tuf, badal, mudaf ilayhi, or na\'t.',
      body: `## Introduction to Nested Sentences

The slots of a sentence can be filled by a noun, a pronoun, or a phrase. Similarly, a **sentence can take the place of a slot within another sentence** \u2014 one sentence nested within another.

### Terminology

| Arabic Term | Meaning |
|---|---|
| **\u0627\u0644\u062C\u064F\u0645\u0652\u0644\u064E\u0629\u064F \u0627\u0644\u0643\u064F\u0628\u0652\u0631\u064E\u0649** | The main (outer) sentence |
| **\u0627\u0644\u062C\u064F\u0645\u0652\u0644\u064E\u0629\u064F \u0627\u0644\u0635\u064F\u0651\u063A\u0652\u0631\u064E\u0649** | The directly nested (inner) sentence |
| **\u0627\u0650\u0633\u0652\u0645\u064C \u0645\u064F\u0624\u064E\u0648\u064E\u0651\u0644\u064C** | The indirectly nested sentence (via a connector) |

### Key Rules

- The entire \u062C\u064F\u0645\u0652\u0644\u064E\u0629\u064C \u0635\u064F\u063A\u0652\u0631\u064E\u0649 becomes **part of** the \u062C\u064F\u0645\u0652\u0644\u064E\u0629\u064C \u0643\u064F\u0628\u0652\u0631\u064E\u0649.
- However, the **slots within the \u062C\u064F\u0645\u0652\u0644\u064E\u0629\u064C \u0635\u064F\u063A\u0652\u0631\u064E\u0649 remain independent** \u2014 the i\u2018rab of each word is determined by its role *within* the nested sentence, not by the outer sentence.

---

## Part 1: Khabar as a Jumla Sughra

The khabar (predicate) can occur as a nested sentence \u2014 either nominal (ismiyya) or verbal (fi\u2018liyya). In both cases, the sughra **must contain a pronoun (\u0639\u0627\u0626\u0650\u062F)** referring back to the mubtada\u2019.

### As a Nominal Sentence

> **\u0627\u0644\u0644\u0647\u064F \u0631\u064E\u062D\u0652\u0645\u064E\u062A\u064F\u0647\u064F \u0648\u064E\u0627\u0633\u0650\u0639\u064E\u0629\u064C**
> *Allah \u2014 His mercy is vast.*

The pronoun \u0640\u0647\u064F (in \u0631\u064E\u062D\u0652\u0645\u064E\u062A\u064F\u0647\u064F) is the \u0639\u0627\u0626\u0650\u062F referring back to \u0627\u0644\u0644\u0647.

### As a Verbal Sentence

> **\u0627\u0644\u0644\u0647\u064F \u062E\u064E\u0644\u064E\u0642\u064E \u0627\u0644\u0633\u064E\u0651\u0645\u064E\u0627\u0621\u064E \u0648\u064E\u0627\u0644\u0623\u064E\u0631\u0652\u0636\u064E**
> *Allah created the skies and the earth.*

The hidden pronoun (\u0647\u064F\u0648\u064E) in \u062E\u064E\u0644\u064E\u0642\u064E is the \u0639\u0627\u0626\u0650\u062F referring to \u0627\u0644\u0644\u0647.

### Translation Rule

1. Translate the khabar on its own: \u0631\u064E\u062D\u0652\u0645\u064E\u062A\u064F\u0647\u064F \u0648\u064E\u0627\u0633\u0650\u0639\u064E\u0629\u064C \u2192 *His mercy is vast*
2. Replace the \u0639\u0627\u0626\u0650\u062F with the mubtada\u2019: \u2192 *Allah\u2019s mercy is vast*

### Supplement: Past Tense + Fi\u2018l Mudari\u2018

When the past tense is coupled with a fi\u2018l mudari\u2018, they denote the **past continuous or habitual** tense. The fi\u2018l naqis **\u0643\u064E\u0627\u0646\u064E** is commonly used with a mudari\u2018 verb:

> **\u0643\u064E\u0627\u0646\u064E \u0632\u064E\u064A\u0652\u062F\u064C \u064A\u064E\u0642\u0652\u0631\u064E\u0623\u064F** \u2014 *Zaid used to read / Zaid was reading*

### The Anticipatory Pronoun (\u0636\u064E\u0645\u0650\u064A\u0631\u064F \u0627\u0644\u0634\u064E\u0651\u0623\u0652\u0646\u0650)

The pronouns \u0647\u064F\u0648\u064E or \u0647\u0650\u064A\u064E can be used as anticipatory pronouns that allude to the importance of the subsequent statement:

> **\u0647\u064F\u0648\u064E \u0627\u0644\u0644\u0647\u064F \u0623\u064E\u062D\u064E\u062F\u064C** \u2014 *[The truth] is that Allah is One.*

---

## Part 2: Maf\u2018ul Bihi as a Jumla Sughra

The maf\u2018ul bihi can be a nested sentence **when it is a quotation**. There are two types:

### Without \u0623\u064E\u0646\u0652

The verbs **\u0642\u064E\u0627\u0644\u064E** (to say) and **\u0633\u064E\u0623\u064E\u0644\u064E** (to ask) take their quotation directly:

> **\u0642\u064E\u0627\u0644\u064E \u0627\u0644\u0631\u064E\u0651\u062C\u064F\u0644\u064F: \u0627\u0644\u0644\u0647\u064F \u0631\u064E\u062D\u0650\u064A\u0645\u064C** \u2014 *The man said: Allah is merciful.*

### With \u0623\u064E\u0646\u0652 \u0627\u0644\u062A\u064E\u0651\u0641\u0652\u0633\u0650\u064A\u0631\u0650\u064A\u064E\u0651\u0629

All other verbs require **\u0623\u064E\u0646\u0652** before their quotation (non-governing, not translated):

> **\u0623\u064E\u0648\u0652\u062D\u064E\u064A\u0652\u062A\u064F \u0625\u0650\u0644\u064E\u0649 \u0627\u0644\u062D\u064E\u0648\u064E\u0627\u0631\u0650\u064A\u0651\u0650\u064A\u0646\u064E \u0623\u064E\u0646\u0652 \u0622\u0645\u0650\u0646\u064F\u0648\u0627 \u0628\u0650\u064A \u0648\u064E\u0628\u0650\u0631\u064E\u0633\u064F\u0648\u0644\u0650\u064A** \u2014 *I inspired the helpers: Believe in me and my messenger.*

---

## Part 3: Hal as a Jumla Sughra

The hal (state/circumstantial clause) can be a nested sentence \u2014 verbal or nominal.

### Fi\u2018l Mudari\u2018 as Hal

Comes directly after the main sentence, representing a simultaneous action:

> **\u0631\u064E\u0623\u064E\u064A\u0652\u062A\u064F \u0632\u064E\u064A\u0652\u062F\u064B\u0627 \u064A\u064F\u0635\u064E\u0644\u0651\u0650\u064A** \u2014 *I saw Zaid praying.*

### Fi\u2018l Madi as Hal

Requires the particle **\u0648** (\u0648\u064E\u0627\u0648\u064C \u062D\u064E\u0627\u0644\u0650\u064A\u064E\u0651\u0629), often followed by **\u0642\u064E\u062F\u0652**. Two meanings:

1. **Prior state**: *I came but you had already left* \u2014 **\u062C\u0650\u0626\u0652\u062A\u064F \u0648\u064E\u0642\u064E\u062F\u0652 \u062E\u064E\u0631\u064E\u062C\u0652\u062A\u064E**
2. **Contrast**: *Why did you not pray even though I instructed you?* \u2014 **\u0644\u0650\u0645\u064E \u0644\u064E\u0645\u0652 \u062A\u064F\u0635\u064E\u0644\u0651\u0650 \u0648\u064E\u0642\u064E\u062F\u0652 \u0623\u064E\u0645\u064E\u0631\u0652\u062A\u064F\u0643\u064E**

### Nominal Sentence as Hal

Preceded by \u0648\u064E\u0627\u0648\u064F \u062D\u064E\u0627\u0644\u0650\u064A\u064E\u0651\u0629, expressing simultaneous state or contrast:

> **\u062C\u0650\u0626\u0652\u062A\u064F \u0648\u064E\u0623\u064E\u0646\u0652\u062A\u064E \u0646\u064E\u0627\u0626\u0650\u0645\u064C** \u2014 *I came whilst you were sleeping.*
> **\u064A\u064E\u0639\u0652\u0628\u064F\u062F\u064F\u0648\u0646\u064E \u0627\u0644\u0623\u064E\u0635\u0652\u0646\u064E\u0627\u0645\u064E \u0648\u064E\u0647\u0650\u064A\u064E \u062D\u0650\u062C\u064E\u0627\u0631\u064E\u0629\u064C** \u2014 *They worship idols even though they are stones.*

---

## Part 4: Ma\u2018tuf as a Jumla Sughra

The ma\u2018tuf (conjoined element) can occur as a nested sentence if the ma\u2018tuf \u2018alayhi is itself a sughra:

> **\u0632\u064E\u064A\u0652\u062F\u064C \u062C\u064E\u0627\u0621\u064E \u0648\u064E\u0630\u064E\u0647\u064E\u0628\u064E** \u2014 *Zaid came and went.*

The second sentence \u0630\u064E\u0647\u064E\u0628\u064E is conjoined within the khabar.

---

## Part 5: Badal as a Jumla Sughra

The badal (apposition) can occur as a nested sentence, elaborating on the first clause:

> **\u0625\u0650\u0646\u064E\u0651 \u0627\u0644\u0644\u0647\u064E \u0623\u064E\u0646\u0652\u0639\u064E\u0645\u064E \u0639\u064E\u0644\u064E\u064A\u0652\u0643\u064E \u062C\u064E\u0639\u064E\u0644\u064E\u0643\u064E \u0645\u064F\u0624\u0652\u0645\u0650\u0646\u064B\u0627** \u2014 *Indeed, Allah bestowed his favour upon you; he made you a believer.*

---

## Part 6: Mudaf Ilayhi as a Jumla Sughra

The mudaf ilayhi can occur as a nested sentence. This happens with regular time adverbs and special adverbs.

### Regular Adverbs of Time

Words like **\u062D\u0650\u064A\u0646\u064C**, **\u0633\u064E\u0646\u064E\u0629\u064C**, **\u064A\u064E\u0648\u0652\u0645\u064C** can be mudaf to a sentence:

> **\u064A\u064E\u0648\u0652\u0645\u064E \u0645\u064E\u0627\u062A\u064E\u062A\u0652 \u0623\u064F\u0645\u064F\u0651\u0647\u064F** \u2014 *The day his mother died*

### Special Adverbs of Time

Six special time adverbs take sentences as their mudaf ilayhi:

- **\u0644\u064E\u0645\u064E\u0651\u0627** \u2014 \u201Cwhen\u201D (past): **\u0635\u064E\u0644\u064E\u0651\u064A\u0652\u062A\u064F \u0644\u064E\u0645\u064E\u0651\u0627 \u0633\u064E\u0645\u0650\u0639\u0652\u062A\u064F \u0627\u0644\u0623\u064E\u0630\u064E\u0627\u0646\u064E** (*I prayed when I heard the athan*)
- **\u0643\u064F\u0644\u064E\u0651\u0645\u064E\u0627** \u2014 \u201Cwhenever\u201D: **\u0633\u064E\u0644\u0651\u0650\u0645\u0652 \u0639\u064E\u0644\u064E\u0649 \u0648\u064E\u0627\u0644\u0650\u062F\u064E\u064A\u0652\u0643\u064E \u0643\u064F\u0644\u064E\u0651\u0645\u064E\u0627 \u062F\u064E\u062E\u064E\u0644\u0652\u062A\u064E \u0627\u0644\u0628\u064E\u064A\u0652\u062A\u064E** (*Greet your parents whenever you enter the house*)
- **\u0625\u0650\u0630\u0652** \u2014 \u201Cwhen\u201D (past): **\u0646\u064E\u0635\u064E\u0631\u064E \u0627\u0644\u0644\u0647\u064F \u0627\u0644\u0646\u064E\u0651\u0628\u0650\u064A\u064E\u0651 \u0625\u0650\u0630\u0652 \u0623\u064E\u062E\u0652\u0631\u064E\u062C\u064E\u0647\u064F \u0642\u064E\u0648\u0652\u0645\u064F\u0647\u064F** (*Allah assisted the Prophet when his people expelled him*)
- **\u0625\u0650\u0630\u064E\u0627** \u2014 \u201Cwhen\u201D (present habitual/future): **\u0625\u0650\u0630\u064E\u0627 \u0633\u064E\u0645\u0650\u0639\u0652\u062A\u064F \u0627\u0644\u0623\u064E\u0630\u064E\u0627\u0646\u064E \u0630\u064E\u0647\u064E\u0628\u0652\u062A\u064F \u0625\u0650\u0644\u064E\u0649 \u0627\u0644\u0645\u064E\u0633\u0652\u062C\u0650\u062F\u0650** (*When I hear the athan, I go to the masjid*)
- **\u0645\u064F\u0646\u0652\u0630\u064F / \u0645\u064F\u0630\u0652** \u2014 \u201Csince\u201D: **\u0645\u064E\u0627 \u0631\u064E\u0623\u064E\u064A\u0652\u062A\u064F\u0647\u064F \u0645\u064F\u0630\u0652 \u0644\u064E\u0642\u0650\u064A\u062A\u064F\u0647\u064F \u0641\u0650\u064A \u0628\u064E\u064A\u0652\u062A\u0650\u0643\u064E** (*I have not seen him since I met him at your house*)

### Special Adverb of Place: \u062D\u064E\u064A\u0652\u062B\u064F

Takes a sentence (usually verbal) as its mudaf ilayhi. Translated as \u201Cwhere\u201D or \u201Cwherever\u201D:

> **\u062C\u064E\u0644\u064E\u0633\u064E\u062A\u0652 \u0641\u064E\u0627\u0637\u0650\u0645\u064E\u0629\u064F \u062D\u064E\u064A\u0652\u062B\u064F \u062C\u064E\u0644\u064E\u0633\u064E\u062A\u0652 \u0623\u064F\u0645\u064F\u0651\u0647\u064E\u0627** \u2014 *Fatima sat where her mother sat.*

### \u0625\u0650\u0630\u064E\u0627 \u0627\u0644\u0645\u064F\u0641\u064E\u0627\u062C\u064E\u0623\u064E\u0629 (Sudden/Surprise)

The word \u0625\u0650\u0630\u064E\u0627 can express an unexpected event (\u201Csuddenly\u201D / \u201Clo and behold\u201D), preceded by \u0641\u064E and followed by a nominal sentence:

> **\u0623\u064E\u0644\u0652\u0642\u064E\u0649 \u0645\u064F\u0648\u0633\u064E\u0649 \u0639\u064E\u0635\u064E\u0627\u0647\u064F \u0641\u064E\u0625\u0650\u0630\u064E\u0627 \u0647\u0650\u064A\u064E \u062B\u064F\u0639\u0652\u0628\u064E\u0627\u0646\u064C** \u2014 *Musa threw his staff and lo, it was a serpent.*

**مَا الصِّلَة with إِذَا:** Sometimes إِذَا is followed by the particle **مَا** (called مَا الصِّلَة). This creates emphasis but does **not affect the grammar**:

> **إِذَا مَا مَرَّ يَوْمٌ ذَهَبَ بَعْضُكَ** — *When a day passes, a part of you passes.*

**بِ as حَرْفُ صِلَة with إِذَا المُفَاجَأَة:** The مُبْتَدَأ after إِذَا المُفَاجَأَة can be preceded by **بِ** (a حَرْفُ صِلَة — emphatic particle that adds no meaning):

> **دَخَلْنَا الفَصْلَ فَإِذَا بِزَيْدٍ جَالِسٌ** — *We entered the class and there was Zaid sitting.*

### Compensatory Tanwin (\u062A\u064E\u0646\u0652\u0648\u0650\u064A\u0646\u064F \u0627\u0644\u0639\u0650\u0648\u064E\u0636\u0650)

The mudaf ilayhi sentence can be replaced by a tanwin on the mudaf: \u064A\u064E\u0648\u0652\u0645\u064E + \u0625\u0650\u0630\u0652 + (sentence) \u2192 **\u064A\u064E\u0648\u0652\u0645\u064E\u0626\u0650\u0630\u064D** (that day).

---

## Part 7: Na\u2018t as a Jumla Sughra

A sentence can function as a na\u2018t (adjective) when the described noun (man\u2018ut) is **indefinite**:

> **\u0647\u0670\u0630\u064E\u0627 \u0631\u064E\u062C\u064F\u0644\u064C \u062C\u064E\u0627\u0621\u064E \u0645\u0650\u0646\u064E \u0627\u0644\u0642\u064E\u0631\u0652\u064A\u064E\u0629\u0650** \u2014 *This is a man who came from the village.*

The na\u2018t sentence must contain a **\u0639\u0627\u0626\u0650\u062F** (referent pronoun) referring back to the man\u2018ut. The relative pronoun \u201Cwho\u201D appears in English but has no equivalent word in the Arabic.

### Translation by \u2018A\u2019id Type

The English translation uses different relative pronouns depending on the role of the \u2018a\u2019id:

- **Fa\u2018il**: \u0631\u064E\u062C\u064F\u0644\u064C \u0633\u064E\u0642\u064E\u0637\u064E \u2014 a man *who* fell
- **Maf\u2018ul bihi**: \u0631\u064E\u062C\u064F\u0644\u064C \u0631\u064E\u0623\u064E\u064A\u0652\u062A\u064F\u0647\u064F \u2014 a man *whom* I saw
- **Mudaf ilayhi**: \u0631\u064E\u062C\u064F\u0644\u064C \u064A\u064E\u062F\u064F\u0647\u064F \u0648\u064E\u0633\u0650\u062E\u064E\u0629\u064C \u2014 a man *whose* hand is dirty
- **Majrur**: \u0631\u064E\u062C\u064F\u0644\u064C \u0642\u064E\u0631\u064E\u0623\u0652\u062A\u064F \u0645\u064E\u0639\u064E\u0647\u064F \u2014 a man *with whom* I read
- **Khabar muqaddam**: \u0631\u064E\u062C\u064F\u0644\u064C \u0639\u064E\u0644\u064E\u064A\u0652\u0647\u0650 \u062F\u064E\u064A\u0652\u0646\u064C \u2014 a man *who has* a loan on him`,
      rules: [
        {
          arabic: '\u0627\u0644\u062C\u064F\u0645\u0652\u0644\u064E\u0629\u064F \u0627\u0644\u0635\u064F\u0651\u063A\u0652\u0631\u064E\u0649 \u062C\u064F\u0632\u0652\u0621\u064C \u0645\u0650\u0646\u064E \u0627\u0644\u062C\u064F\u0645\u0652\u0644\u064E\u0629\u0650 \u0627\u0644\u0643\u064F\u0628\u0652\u0631\u064E\u0649',
          english: 'The nested sentence becomes part of the main sentence, but its internal slots retain their own independent i\'rab.',
          examples: [
            { arabic: '\u0643\u064E\u0627\u0646\u064E \u0627\u0644\u0631\u064E\u0651\u062C\u064F\u0644\u064F \u0648\u064E\u0644\u064E\u062F\u064F\u0647\u064F \u0645\u064E\u0631\u0650\u064A\u0636\u064C', translation: 'The man\'s son was sick', irab: '\u0648\u064E\u0644\u064E\u062F\u064F\u0647\u064F: mubtada\u2019 marfu\u2018, \u0645\u064E\u0631\u0650\u064A\u0636\u064C: khabar marfu\u2018 (within the sughra)' },
          ],
        },
        {
          arabic: '\u0627\u0644\u062E\u064E\u0628\u064E\u0631\u064F \u0627\u0644\u062C\u064F\u0645\u0652\u0644\u064E\u0629\u064F \u064A\u064E\u062C\u0650\u0628\u064F \u0623\u064E\u0646\u0652 \u064A\u064E\u062D\u0652\u062A\u064E\u0648\u0650\u064A\u064E \u0639\u064E\u0644\u064E\u0649 \u0639\u064E\u0627\u0626\u0650\u062F\u064D',
          english: 'When the khabar is a sentence, it must contain a pronoun (\u2018a\u2019id) referring back to the mubtada\u2019.',
          examples: [
            { arabic: '\u0627\u0644\u0644\u0647\u064F \u0631\u064E\u062D\u0652\u0645\u064E\u062A\u064F\u0647\u064F \u0648\u064E\u0627\u0633\u0650\u0639\u064E\u0629\u064C', translation: 'Allah \u2014 His mercy is vast', irab: '\u0627\u0644\u0644\u0647\u064F: mubtada\u2019, \u0631\u064E\u062D\u0652\u0645\u064E\u062A\u064F\u0647\u064F \u0648\u064E\u0627\u0633\u0650\u0639\u064E\u0629\u064C: khabar jumla ismiyya, \u0640\u0647\u064F: \u2018a\u2019id' },
            { arabic: '\u0627\u0644\u0644\u0647\u064F \u062E\u064E\u0644\u064E\u0642\u064E \u0627\u0644\u0633\u064E\u0651\u0645\u064E\u0627\u0621\u064E \u0648\u064E\u0627\u0644\u0623\u064E\u0631\u0652\u0636\u064E', translation: 'Allah created the skies and the earth', irab: '\u0627\u0644\u0644\u0647\u064F: mubtada\u2019, \u062E\u064E\u0644\u064E\u0642\u064E \u0627\u0644\u0633\u0645\u0627\u0621 \u0648\u0627\u0644\u0623\u0631\u0636: khabar jumla fi\u2018liyya, hidden \u0647\u064F\u0648\u064E: \u2018a\u2019id' },
          ],
        },
        {
          arabic: '\u0627\u0644\u0645\u064E\u0641\u0652\u0639\u064F\u0648\u0644\u064F \u0628\u0650\u0647\u0650 \u064A\u064E\u0643\u064F\u0648\u0646\u064F \u062C\u064F\u0645\u0652\u0644\u064E\u0629\u064B \u0635\u064F\u063A\u0652\u0631\u064E\u0649 \u0625\u0650\u0630\u064E\u0627 \u0643\u064E\u0627\u0646\u064E \u0645\u064E\u0642\u064F\u0648\u0644\u064E\u0629\u064B',
          english: 'The maf\u2018ul bihi becomes a jumla sughra when it is a quotation. Qala/sa\u2019ala take quotations directly; other verbs use an al-tafsiriyya.',
          examples: [
            { arabic: '\u0642\u064E\u0627\u0644\u064E \u0627\u0644\u0631\u064E\u0651\u062C\u064F\u0644\u064F: \u0627\u0644\u0644\u0647\u064F \u0631\u064E\u062D\u0650\u064A\u0645\u064C', translation: 'The man said: Allah is merciful', irab: '\u0642\u064E\u0627\u0644\u064E: fi\u2018l, \u0627\u0644\u0631\u064E\u0651\u062C\u064F\u0644\u064F: fa\u2018il, \u0627\u0644\u0644\u0647\u064F \u0631\u064E\u062D\u0650\u064A\u0645\u064C: maf\u2018ul bihi (jumla ismiyya)' },
            { arabic: '\u0646\u064E\u0627\u062F\u064E\u064A\u0652\u062A\u064F \u0623\u064E\u0646\u0650 \u0627\u0646\u0652\u0635\u064F\u0631\u0652\u0646\u0650\u064A', translation: 'I called out: Help me', irab: '\u0623\u064E\u0646\u0652: an al-tafsiriyya, \u0627\u0646\u0652\u0635\u064F\u0631\u0652\u0646\u0650\u064A: maf\u2018ul bihi (jumla fi\u2018liyya)' },
          ],
        },
        {
          arabic: '\u0627\u0644\u062D\u064E\u0627\u0644\u064F \u0642\u064E\u062F\u0652 \u064A\u064E\u0643\u064F\u0648\u0646\u064F \u062C\u064F\u0645\u0652\u0644\u064E\u0629\u064B \u0635\u064F\u063A\u0652\u0631\u064E\u0649',
          english: 'The hal can be a jumla sughra. A mudari\u2018 hal is simultaneous (no waw). A madi hal requires waw haliyya (+ qad). A nominal hal requires waw haliyya.',
          examples: [
            { arabic: '\u0631\u064E\u0623\u064E\u064A\u0652\u062A\u064F \u0632\u064E\u064A\u0652\u062F\u064B\u0627 \u064A\u064F\u0635\u064E\u0644\u0651\u0650\u064A', translation: 'I saw Zaid praying', irab: '\u064A\u064F\u0635\u064E\u0644\u0651\u0650\u064A: hal (fi\u2018l wa fa\u2018il), simultaneous action' },
            { arabic: '\u062C\u0650\u0626\u0652\u062A\u064F \u0648\u064E\u0642\u064E\u062F\u0652 \u062E\u064E\u0631\u064E\u062C\u0652\u062A\u064E', translation: 'I came but you had already left', irab: '\u0648\u064E: waw haliyya, \u0642\u064E\u062F\u0652 \u062E\u064E\u0631\u064E\u062C\u0652\u062A\u064E: hal (prior state)' },
            { arabic: '\u062C\u0650\u0626\u0652\u062A\u064F \u0648\u064E\u0623\u064E\u0646\u0652\u062A\u064E \u0646\u064E\u0627\u0626\u0650\u0645\u064C', translation: 'I came whilst you were sleeping', irab: '\u0648\u064E: waw haliyya, \u0623\u064E\u0646\u0652\u062A\u064E \u0646\u064E\u0627\u0626\u0650\u0645\u064C: hal (jumla ismiyya)' },
          ],
        },
        {
          arabic: '\u0627\u0644\u0646\u064E\u0651\u0639\u0652\u062A\u064F \u0627\u0644\u062C\u064F\u0645\u0652\u0644\u064E\u0629\u064F \u0644\u0650\u0644\u0646\u064E\u0651\u0643\u0650\u0631\u064E\u0629\u0650 \u0641\u064E\u0642\u064E\u0637',
          english: 'A sentence can serve as a na\'t (adjective) only for an indefinite noun. The na\'t sentence must contain a referent pronoun (\u2018a\u2019id) linking back to the described noun.',
          examples: [
            { arabic: '\u0647\u0670\u0630\u064E\u0627 \u0631\u064E\u062C\u064F\u0644\u064C \u062C\u064E\u0627\u0621\u064E \u0645\u0650\u0646\u064E \u0627\u0644\u0642\u064E\u0631\u0652\u064A\u064E\u0629\u0650', translation: 'This is a man who came from the village', irab: '\u0631\u064E\u062C\u064F\u0644\u064C: man\u2018ut (indefinite), \u062C\u064E\u0627\u0621\u064E \u0645\u0650\u0646\u064E \u0627\u0644\u0642\u064E\u0631\u0652\u064A\u064E\u0629\u0650: na\u2018t jumla, hidden \u0647\u064F\u0648\u064E: \u2018a\u2019id' },
            { arabic: '\u0631\u064E\u062C\u064F\u0644\u064C \u064A\u064E\u062F\u064F\u0647\u064F \u0648\u064E\u0633\u0650\u062E\u064E\u0629\u064C', translation: 'A man whose hand is dirty', irab: '\u064A\u064E\u062F\u064F\u0647\u064F \u0648\u064E\u0633\u0650\u062E\u064E\u0629\u064C: na\u2018t jumla ismiyya, \u0640\u0647\u064F: \u2018a\u2019id as mudaf ilayhi' },
          ],
        },
      ],
      examples: [
        { arabic: '\u0642\u064F\u0644\u0652\u062A\u064F: \u0628\u064E\u0643\u064E\u0649 \u0627\u0644\u0648\u064E\u0644\u064E\u062F\u064F \u0627\u0644\u0628\u064E\u0627\u0631\u0650\u062D\u064E\u0629\u064E', translation: 'I said: The boy cried last night', source: 'FSTU Arabic, Unit 5', irab: '\u0627\u0644\u0648\u064E\u0644\u064E\u062F\u064F: fa\u2018il of \u0628\u064E\u0643\u064E\u0649, \u0627\u0644\u0628\u064E\u0627\u0631\u0650\u062D\u064E\u0629\u064E: maf\u2018ul fihi \u2014 within the sughra' },
        { arabic: '\u0643\u064E\u0627\u0646\u064E \u0632\u064E\u064A\u0652\u062F\u064C \u064A\u064E\u0642\u0652\u0631\u064E\u0623\u064F', translation: 'Zaid used to read / was reading', source: 'FSTU Arabic, Unit 5', irab: '\u0643\u064E\u0627\u0646\u064E: fi\u2018l naqis, \u064A\u064E\u0642\u0652\u0631\u064E\u0623\u064F: khabar kana (past continuous)' },
        { arabic: '\u0635\u064E\u0644\u064E\u0651\u064A\u0652\u062A\u064F \u0644\u064E\u0645\u064E\u0651\u0627 \u0633\u064E\u0645\u0650\u0639\u0652\u062A\u064F \u0627\u0644\u0623\u064E\u0630\u064E\u0627\u0646\u064E', translation: 'I prayed when I heard the athan', source: 'FSTU Arabic, Unit 5', irab: '\u0644\u064E\u0645\u064E\u0651\u0627: mudaf (special adverb), \u0633\u064E\u0645\u0650\u0639\u0652\u062A\u064F \u0627\u0644\u0623\u064E\u0630\u064E\u0627\u0646\u064E: mudaf ilayhi (jumla fi\u2018liyya)' },
        { arabic: '\u0625\u0650\u0630\u064E\u0627 \u0633\u064E\u0623\u064E\u0644\u0652\u062A\u064E \u0641\u064E\u0627\u0633\u0652\u0623\u064E\u0644\u0650 \u0627\u0644\u0644\u0647\u064E', translation: 'When you (need to) ask anyone, ask Allah', source: 'FSTU Arabic, Unit 5', irab: '\u0625\u0650\u0630\u064E\u0627: mudaf (special adverb, future), \u0641\u064E: fa\u2019 rabita' },
        { arabic: '\u0643\u064E\u0633\u064E\u0631\u064E \u0625\u0650\u0628\u0652\u0631\u064E\u0627\u0647\u0650\u064A\u0645\u064F \u062A\u064E\u0645\u064E\u0627\u062B\u0650\u064A\u0644\u064E \u064A\u064E\u0639\u0652\u0628\u064F\u062F\u064F\u0647\u064E\u0627 \u0627\u0644\u0646\u064E\u0651\u0627\u0633\u064F', translation: 'Ibrahim broke the idols that people used to worship', source: 'FSTU Arabic, Unit 5', irab: '\u062A\u064E\u0645\u064E\u0627\u062B\u0650\u064A\u0644\u064E: man\u2018ut (indefinite), \u064A\u064E\u0639\u0652\u0628\u064F\u062F\u064F\u0647\u064E\u0627 \u0627\u0644\u0646\u064E\u0651\u0627\u0633\u064F: na\u2018t jumla' },
      ],
      tables: [
        {
          title: 'Positions of Jumla Sughra',
          titleAr: '\u0645\u064E\u0648\u064E\u0627\u0642\u0650\u0639\u064F \u0627\u0644\u062C\u064F\u0645\u0652\u0644\u064E\u0629\u0650 \u0627\u0644\u0635\u064F\u0651\u063A\u0652\u0631\u064E\u0649',
          headers: ['Position', 'Type', 'Key Feature'],
          rows: [
            ['Khabar', 'Ismiyya or fi\u2018liyya', 'Must contain \u2018a\u2019id referring to mubtada\u2019'],
            ['Maf\u2018ul bihi', 'Quotation', 'Qala/sa\u2019ala: no an; other verbs: an al-tafsiriyya'],
            ['Hal (mudari\u2018)', 'Fi\u2018liyya', 'Directly after main sentence; simultaneous'],
            ['Hal (madi)', 'Fi\u2018liyya', 'Requires waw haliyya (+ qad); prior/contrast'],
            ['Hal (nominal)', 'Ismiyya', 'Requires waw haliyya; simultaneous/contrast'],
            ['Ma\u2018tuf', 'Matches ma\u2018tuf \u2018alayhi', 'After harf \u2018atf'],
            ['Badal', 'Fi\u2018liyya', 'Elaboration (semicolon in text)'],
            ['Mudaf ilayhi', 'Fi\u2018liyya (usually)', 'After time/place adverbs'],
            ['Na\u2018t', 'Ismiyya or fi\u2018liyya', 'Only for indefinite (nakira) nouns; needs \u2018a\u2019id'],
          ],
        },
        {
          title: 'Special Time Adverbs',
          titleAr: '\u0627\u0644\u0638\u064F\u0631\u064F\u0648\u0641\u064F \u0627\u0644\u062E\u064E\u0627\u0635\u064E\u0651\u0629\u064F',
          headers: ['Adverb', 'Translation', 'Tense', 'Mudaf ilayhi Type'],
          rows: [
            ['\u0644\u064E\u0645\u064E\u0651\u0627', 'when', 'Past', 'Fi\u2018l madi only'],
            ['\u0643\u064F\u0644\u064E\u0651\u0645\u064E\u0627', 'whenever', 'Past / Present / Future', 'Fi\u2018l madi only'],
            ['\u0625\u0650\u0630\u0652', 'when', 'Past', 'Jumla fi\u2018liyya or ismiyya'],
            ['\u0625\u0650\u0630\u064E\u0627', 'when', 'Present habitual / Future', 'Fi\u2018l madi (form), present/future (meaning)'],
            ['\u0645\u064F\u0646\u0652\u0630\u064F / \u0645\u064F\u0630\u0652', 'since', 'Past (negative)', 'Fi\u2018l madi'],
            ['\u062D\u064E\u064A\u0652\u062B\u064F', 'where / wherever', 'Any', 'Jumla fi\u2018liyya or ismiyya'],
          ],
        },
        {
          title: 'Na\'t Translation by \u2018A\u2019id Type',
          titleAr: '\u062A\u064E\u0631\u0652\u062C\u064E\u0645\u064E\u0629\u064F \u0627\u0644\u0646\u064E\u0651\u0639\u0652\u062A\u0650 \u062D\u064E\u0633\u064E\u0628\u064E \u0627\u0644\u0639\u064E\u0627\u0626\u0650\u062F\u0650',
          headers: ['\u2018A\u2019id Slot', 'Human Example', 'Non-Human Example'],
          rows: [
            ['Fa\u2018il', '\u0631\u064E\u062C\u064F\u0644\u064C \u0633\u064E\u0642\u064E\u0637\u064E \u2014 a man who fell', '\u0642\u064E\u0644\u064E\u0645\u064C \u0633\u064E\u0642\u064E\u0637\u064E \u2014 a pen that fell'],
            ['Maf\u2018ul bihi', '\u0631\u064E\u062C\u064F\u0644\u064C \u0631\u064E\u0623\u064E\u064A\u0652\u062A\u064F\u0647\u064F \u2014 a man whom I saw', '\u0642\u064E\u0644\u064E\u0645\u064C \u0631\u064E\u0623\u064E\u064A\u0652\u062A\u064F\u0647\u064F \u2014 a pen that I saw'],
            ['Mudaf ilayhi', '\u0631\u064E\u062C\u064F\u0644\u064C \u064A\u064E\u062F\u064F\u0647\u064F \u0648\u064E\u0633\u0650\u062E\u064E\u0629\u064C \u2014 a man whose hand is dirty', '\u0628\u064E\u064A\u0652\u062A\u064C \u0628\u064E\u0627\u0628\u064F\u0647\u064F \u0645\u064E\u0641\u0652\u062A\u064F\u0648\u062D\u064C \u2014 a house whose door is open'],
            ['Majrur', '\u0631\u064E\u062C\u064F\u0644\u064C \u0642\u064E\u0631\u064E\u0623\u0652\u062A\u064F \u0645\u064E\u0639\u064E\u0647\u064F \u2014 a man with whom I read', '\u0643\u0650\u062A\u064E\u0627\u0628\u064C \u0642\u064E\u0631\u064E\u0623\u0652\u062A\u064F \u0645\u0650\u0646\u0652\u0647\u064F \u2014 a book from which I read'],
            ['Khabar muqaddam', '\u0631\u064E\u062C\u064F\u0644\u064C \u0639\u064E\u0644\u064E\u064A\u0652\u0647\u0650 \u062F\u064E\u064A\u0652\u0646\u064C \u2014 a man who has a loan', '\u0643\u0650\u062A\u064E\u0627\u0628\u064C \u0641\u0650\u064A\u0647\u0650 \u0642\u0650\u0635\u064E\u0635\u064C \u2014 a book which has stories'],
          ],
        },
      ],
      sourceRef: 'FSTU Arabic, Unit 5, pp 417-472',
    },
  ],
  relatedTopicIds: ['ism-mawsul', 'harf-mawsul', 'verbal-phrases', 'mubtada-khabar', 'hal', 'na-t'],
  tags: ['nested sentences', 'jumla sughra', 'jumla kubra', 'khabar jumla', 'hal jumla', 'na\'t jumla', 'quotation', 'maf\'ul bihi', 'mudaf ilayhi', 'time adverbs', 'waw haliyya', 'an tafsiriyya'],
};
