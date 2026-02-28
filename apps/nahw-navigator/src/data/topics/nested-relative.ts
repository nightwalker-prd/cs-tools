import type { NahwTopic } from '../types';

export const ismMawsul: NahwTopic = {
  id: 'ism-mawsul',
  titleAr: 'الاسم الموصول',
  titleEn: 'Relative Pronouns (Ism Mawsul)',
  transliteration: 'al-Ism al-Mawsul',
  categoryId: 'nested-sentences',
  subcategoryId: 'relative-pronouns',
  levels: [
    {
      difficulty: 'beginner',
      summary: 'The ism mawsul (relative pronoun) precedes a sentence and extracts a noun meaning from it, forming an ism mu\'awwal (interpreted noun). Relative pronouns include man (who), ma (what), alladhi/allati and their variants. The clause after the mawsul is the sila, which must contain a return pronoun (\'a\'id).',
      body: `## Overview: Indirectly Nested Sentences

A sentence may be **indirectly nested** when preceded by a **relative pronoun** (\u0645\u064E\u0648\u0652\u0635\u064F\u0648\u0644\u064C). The relative pronoun extracts a noun meaning from the nested sentence, allowing it to function within a single slot of the main sentence.

| Component | Role |
|-----------|------|
| **\u0645\u064E\u0648\u0652\u0635\u064F\u0648\u0644\u064C** | Relative pronoun |
| **\u0635\u0650\u0644\u064E\u0629\u064C** | The relative clause that follows |
| **\u0627\u0650\u0633\u0652\u0645\u064C \u0645\u064F\u0624\u064E\u0648\u064E\u0651\u0644\u064C** | The mawsul + sila together, functioning as a single noun |

---

## Types of Ism Mawsul

### 1. Gender and Number Neutral

These do not change form:

- **\u0645\u064E\u0646\u0652** \u2014 refers to **people**: *who, the one who*
  > **\u0645\u064E\u0646\u0652 \u064A\u064E\u062E\u064E\u0627\u0641\u064F \u0627\u0644\u0644\u0647\u064E** \u2014 *who fears Allah / the one who fears Allah*

- **\u0645\u064E\u0627** \u2014 refers to **things**: *what, that which*
  > **\u0645\u064E\u0627 \u0642\u064E\u0627\u0644\u064E\u062A\u0650 \u0627\u0644\u0623\u064F\u0645\u064F\u0651** \u2014 *what the mother said*

### 2. Gender and Number Specific (\u0627\u0644\u0623\u064E\u0633\u0652\u0645\u064E\u0627\u0621\u064F \u0627\u0644\u0645\u064E\u0648\u0652\u0635\u064F\u0648\u0644\u064E\u0629\u064F)

These change according to gender and number:

| | Singular | Dual | Plural |
|---|---|---|---|
| **Masculine** | \u0627\u0644\u064E\u0651\u0630\u0650\u064A | \u0627\u0644\u0644\u064E\u0651\u0630\u064E\u0627\u0646\u0650 | \u0627\u0644\u064E\u0651\u0630\u0650\u064A\u0646\u064E |
| **Feminine** | \u0627\u0644\u064E\u0651\u062A\u0650\u064A | \u0627\u0644\u0644\u064E\u0651\u062A\u064E\u0627\u0646\u0650 | \u0627\u0644\u0644\u064E\u0651\u0627\u062A\u0650\u064A / \u0627\u0644\u0644\u064E\u0651\u0627\u0626\u0650\u064A |

All are **\u0645\u064E\u0628\u0652\u0646\u0650\u064A\u0651** (indeclinable), **except** the dual forms which are **\u0645\u064F\u0639\u0652\u0631\u064E\u0628** (declinable):
- \u0627\u0644\u0644\u064E\u0651\u0630\u064E\u0627\u0646\u0650 \u2192 \u0627\u0644\u0644\u064E\u0651\u0630\u064E\u064A\u0652\u0646\u0650 (nominative \u2192 accusative/genitive)
- \u0627\u0644\u0644\u064E\u0651\u062A\u064E\u0627\u0646\u0650 \u2192 \u0627\u0644\u0644\u064E\u0651\u062A\u064E\u064A\u0652\u0646\u0650 (nominative \u2192 accusative/genitive)

---

## The Sila (Relative Clause)

### Types of Sila

1. **\u062C\u064F\u0645\u0652\u0644\u064E\u0629** (full sentence) \u2014 either nominal or verbal
   > **\u0645\u064E\u0646\u0652 \u0631\u064E\u0623\u064E\u064A\u0652\u062A\u064F\u0647\u064F** \u2014 *the one whom I saw*

2. **\u0634\u0650\u0628\u0652\u0647\u064F \u0627\u0644\u062C\u064F\u0645\u0652\u0644\u064E\u0629\u0650** (semi-sentence / prepositional phrase)
   > **\u0645\u064E\u0646\u0652 \u0641\u0650\u064A \u0627\u0644\u0628\u064E\u064A\u0652\u062A\u0650** \u2014 *the one who is in the house*

### Rules of Sila

**Rule 1: \u0639\u064E\u0627\u0626\u0650\u062F (Return Pronoun)**
If the sila is a full sentence, it **must** contain a \u0639\u064E\u0627\u0626\u0650\u062F \u2014 a pronoun referring back to the ism mawsul:
- **Explicit**: \u0645\u064E\u0646\u0652 \u0631\u064E\u0623\u064E\u064A\u0652\u062A\u064F**\u0647\u064F** (the \u0647\u064F is the \u2018a\u2019id)
- **Omitted**: \u0645\u064E\u0646\u0652 \u0631\u064E\u0623\u064E\u064A\u0652\u062A\u064F (the \u0647\u064F is understood)

If the sila is a shibh al-jumla, it does **not** have a \u2018a\u2019id.

---

## Translating the Ism Mawsul

The translation varies depending on the grammatical role of the \u2018a\u2019id within the sila:

### 1. \u2018A\u2019id as Fa\u2018il (Subject)
- Human: **who** / **the one who** \u2014 \u0645\u064E\u0646\u0652 \u064A\u064E\u0646\u0652\u0641\u064E\u0639\u064F \u2192 *the one who benefits*
- Non-human: **that** / **that which** \u2014 \u0645\u064E\u0627 \u064A\u064E\u0646\u0652\u0641\u064E\u0639\u064F \u2192 *that which benefits*

### 2. \u2018A\u2019id as Maf\u2018ul Bihi (Object)
- Human: **whom** / **who** \u2014 \u0645\u064E\u0646\u0652 \u0646\u064E\u0635\u064E\u0631\u0652\u062A\u064F\u0647\u064F \u2192 *whom I helped*
- Non-human: **what** / **that** \u2014 \u0645\u064E\u0627 \u0643\u064E\u062A\u064E\u0628\u0652\u062A\u064F\u0647\u064F \u2192 *what I wrote*

### 3. \u2018A\u2019id as Mudaf Ilayhi (Possessive)
- **whose** \u2014 \u0627\u0644\u064E\u0651\u0630\u0650\u064A \u0628\u064E\u0627\u0628\u064F\u0647\u064F \u0645\u064E\u0641\u0652\u062A\u064F\u0648\u062D\u064C \u2192 *whose door is open*

### 4. \u2018A\u2019id as Majrur (Preposition-related)
- Human: **whom** \u2014 \u0627\u0644\u064E\u0651\u0630\u0650\u064A \u0642\u064E\u0631\u064E\u0623\u0652\u062A\u064F \u0645\u064E\u0639\u064E\u0647\u064F \u2192 *with whom I read*
- Non-human: **which** \u2014 \u0627\u0644\u064E\u0651\u0630\u0650\u064A \u0642\u064E\u0631\u064E\u0623\u0652\u062A\u064F \u0645\u0650\u0646\u0652\u0647\u064F \u2192 *from which I read*

### 5. \u2018A\u2019id in Khabar Muqaddam
- Human: **who has** \u2014 \u0627\u0644\u064E\u0651\u0630\u0650\u064A \u0639\u064E\u0644\u064E\u064A\u0652\u0647\u0650 \u062F\u064E\u064A\u0652\u0646\u064C \u2192 *who has a loan on him*
- Non-human: **which has** \u2014 \u0627\u0644\u064E\u0651\u0630\u0650\u064A \u0641\u0650\u064A\u0647\u0650 \u0642\u0650\u0635\u064E\u0635\u064C \u2192 *which has stories in it*

---

## Using Ism Mawsul in a Sentence

An ism mawsul and its sila can occupy **any noun slot where a definite noun can occur**.

### In a Nominal Sentence:
- **Mubtada\u2019** (subject): \u0627\u0644\u064E\u0651\u0630\u0650\u064A \u0622\u0645\u064E\u0646\u064E \u0641\u064E\u0644\u064E\u0647\u064F \u0623\u064E\u062C\u0652\u0631\u064C \u0639\u064E\u0638\u0650\u064A\u0645\u064C
- **Khabar** (predicate): \u0627\u0644\u0644\u0647\u064F \u0647\u064F\u0648\u064E \u0627\u0644\u064E\u0651\u0630\u0650\u064A \u062E\u064E\u0644\u064E\u0642\u064E\u0646\u0650\u064A

### In a Verbal Sentence:
- **Fa\u2018il**: \u0644\u064E\u0645\u0652 \u064A\u064E\u0641\u0652\u0647\u064E\u0645\u0650 \u0627\u0644\u062F\u064E\u0651\u0631\u0652\u0633\u064E \u0627\u0644\u064E\u0651\u0630\u0650\u064A\u0646\u064E \u063A\u064E\u0627\u0628\u064F\u0648\u0627 \u0623\u064E\u0645\u0652\u0633\u0650
- **Maf\u2018ul bihi**: \u0623\u064F\u062D\u0650\u0628\u064F\u0651 \u0645\u064E\u0646\u0652 \u064A\u064E\u062C\u0652\u062A\u064E\u0647\u0650\u062F\u064F

### In a Phrase:
- **Na\u2018t of a ma\u2018rifa**: \u0627\u0644\u0631\u064E\u0651\u062C\u064F\u0644\u064F \u0627\u0644\u064E\u0651\u0630\u0650\u064A \u062C\u064E\u0627\u0621\u064E \u0645\u0650\u0646\u064E \u0627\u0644\u0642\u064E\u0631\u0652\u064A\u064E\u0629\u0650
- **Mudaf ilayhi**: \u0643\u0650\u062A\u064E\u0627\u0628\u064F \u0627\u0644\u064E\u0651\u0630\u0650\u064A \u0643\u064E\u062A\u064E\u0628\u064E
- **Majrur**: \u0645\u064E\u0631\u064E\u0631\u0652\u062A\u064F \u0628\u0650\u0627\u0644\u064E\u0651\u0630\u0650\u064A \u0643\u064E\u062A\u064E\u0628\u064E

### Ma\u2018rifa vs. Nakira with Na\u2018t Sentences

| | After a ma\u2018rifa (definite) | After a nakira (indefinite) |
|---|---|---|
| **Connector** | Via an ism mawsul (\u0627\u0644\u064E\u0651\u0630\u0650\u064A etc.) | Directly (no connector needed) |
| **Example** | \u0627\u0644\u0643\u0650\u062A\u064E\u0627\u0628\u064F \u0627\u0644\u064E\u0651\u0630\u0650\u064A \u0642\u064E\u0631\u064E\u0623\u0652\u062A\u064F\u0647\u064F \u2014 *The book that I read* | \u0643\u0650\u062A\u064E\u0627\u0628\u064C \u0642\u064E\u0631\u064E\u0623\u0652\u062A\u064F\u0647\u064F \u2014 *A book that I read* |

---

## The Different Types of \u0645\u064E\u0627

There are four distinct uses of the particle \u0645\u064E\u0627:

1. **\u0645\u064E\u0627 \u0627\u0644\u0645\u064F\u0634\u064E\u0628\u064E\u0651\u0647\u064E\u0629\u064F \u0628\u0650\u0644\u064E\u064A\u0652\u0633\u064E** \u2014 negates nominal sentences (like \u0644\u064E\u064A\u0652\u0633\u064E): \u0645\u064E\u0627 \u0627\u0644\u0648\u064E\u0644\u064E\u062F\u064F \u0643\u064E\u0627\u0630\u0650\u0628\u064B\u0627 (*The boy is not a liar*)
2. **\u0645\u064E\u0627 \u0627\u0644\u0646\u064E\u0651\u0627\u0641\u0650\u064A\u064E\u0629\u064F** \u2014 negates verbs: \u0645\u064E\u0627 \u0643\u064E\u0630\u064E\u0628\u064E \u0627\u0644\u0648\u064E\u0644\u064E\u062F\u064F (*The boy did not lie*)
3. **\u0645\u064E\u0627 \u0627\u0644\u0627\u0650\u0633\u0652\u062A\u0650\u0641\u0652\u0647\u064E\u0627\u0645\u0650\u064A\u064E\u0651\u0629\u064F** \u2014 interrogative: \u0645\u064E\u0627 \u0642\u064E\u0627\u0644\u064E \u0627\u0644\u0648\u064E\u0644\u064E\u062F\u064F\u061F (*What did the boy say?*)
4. **\u0645\u064E\u0627 \u0627\u0644\u0645\u064E\u0648\u0652\u0635\u064F\u0648\u0644\u064E\u0629\u064F** \u2014 relative pronoun: \u0645\u064E\u0627 \u0643\u064E\u062A\u064E\u0628\u0652\u062A\u064E \u0635\u064E\u062D\u0650\u064A\u062D\u064C (*What you wrote is correct*)

The first three always occur at the beginning of the sentence; \u0645\u064E\u0627 \u0627\u0644\u0645\u064E\u0648\u0652\u0635\u064F\u0648\u0644\u064E\u0629 can occur anywhere.

---

## Supplement: The Indefinite Relative Pronoun (\u0627\u0644\u0646\u0651\u0650\u0643\u0652\u0631\u064E\u0629\u064F \u0627\u0644\u0645\u064E\u0648\u0652\u0635\u064F\u0648\u0644\u064E\u0629\u064F)

The words \u0645\u064E\u0646\u0652 and \u0645\u064E\u0627 usually carry a definite meaning. However, they can also carry an **indefinite** meaning:

> **\u0623\u064F\u062D\u0650\u0628\u064F\u0651 \u0645\u064E\u0646\u0652 \u064A\u064E\u062C\u0652\u062A\u064E\u0647\u0650\u062F\u064F**

Two interpretations:
- **Definite**: *I love the one who works hard* (\u0645\u064E\u0646\u0652 is ism mawsul)
- **Indefinite**: *I love one who works hard* (\u0645\u064E\u0646\u0652 is nakira mawsula, and the sentence is a na\u2018t)

When \u0645\u064E\u0646\u0652 and \u0645\u064E\u0627 mean \u201Csome\u201D (\u0628\u064E\u0639\u0652\u0636):

> **\u0645\u0650\u0646\u0652\u0643\u064F\u0645\u0652 \u0645\u064E\u0646\u0652 \u064A\u064F\u0631\u0650\u064A\u062F\u064F \u0627\u0644\u062F\u064F\u0651\u0646\u0652\u064A\u064E\u0627** \u2014 *Some of you desire the world.*`,
      rules: [
        {
          arabic: '\u0627\u0644\u0627\u0650\u0633\u0652\u0645\u064F \u0627\u0644\u0645\u064E\u0648\u0652\u0635\u064F\u0648\u0644\u064F \u064A\u064E\u0633\u0652\u062A\u064E\u062E\u0652\u0631\u0650\u062C\u064F \u0645\u064E\u0639\u0652\u0646\u064E\u0649 \u0627\u0644\u0627\u0650\u0633\u0652\u0645\u0650 \u0645\u0650\u0646\u064E \u0627\u0644\u062C\u064F\u0645\u0652\u0644\u064E\u0629\u0650',
          english: 'The ism mawsul (relative pronoun) precedes a sentence and extracts a noun meaning from it. Man refers to people, ma refers to things, and alladhi/allati change for gender and number.',
          examples: [
            { arabic: '\u0645\u064E\u0646\u0652 \u064A\u064E\u062E\u064E\u0627\u0641\u064F \u0627\u0644\u0644\u0647\u064E', translation: 'Who fears Allah / the one who fears Allah', irab: '\u0645\u064E\u0646\u0652: ism mawsul, \u064A\u064E\u062E\u064E\u0627\u0641\u064F \u0627\u0644\u0644\u0647\u064E: sila' },
            { arabic: '\u0645\u064E\u0627 \u0642\u064E\u0627\u0644\u064E\u062A\u0650 \u0627\u0644\u0623\u064F\u0645\u064F\u0651', translation: 'What the mother said', irab: '\u0645\u064E\u0627: ism mawsul, \u0642\u064E\u0627\u0644\u064E\u062A\u0650 \u0627\u0644\u0623\u064F\u0645\u064F\u0651: sila' },
          ],
        },
        {
          arabic: '\u0627\u0644\u0635\u0651\u0650\u0644\u064E\u0629\u064F \u064A\u064E\u062C\u0650\u0628\u064F \u0623\u064E\u0646\u0652 \u062A\u064E\u062D\u0652\u062A\u064E\u0648\u0650\u064A\u064E \u0639\u064E\u0644\u064E\u0649 \u0639\u064E\u0627\u0626\u0650\u062F\u064D',
          english: 'When the sila is a full sentence, it must contain a return pronoun (\u2018a\u2019id) referring back to the ism mawsul. The \u2018a\u2019id may be explicit or omitted (understood).',
          examples: [
            { arabic: '\u0645\u064E\u0646\u0652 \u0631\u064E\u0623\u064E\u064A\u0652\u062A\u064F\u0647\u064F', translation: 'The one whom I saw', irab: '\u0647\u064F: explicit \u2018a\u2019id (maf\u2018ul bihi)' },
            { arabic: '\u0645\u064E\u0646\u0652 \u0631\u064E\u0623\u064E\u064A\u0652\u062A\u064F', translation: 'The one whom I saw', irab: '\u2018a\u2019id (\u0647\u064F) is understood/omitted' },
            { arabic: '\u0645\u064E\u0646\u0652 \u0641\u0650\u064A \u0627\u0644\u0628\u064E\u064A\u0652\u062A\u0650', translation: 'The one who is in the house', irab: 'Sila is shibh al-jumla \u2014 no \u2018a\u2019id needed' },
          ],
        },
        {
          arabic: '\u0627\u0644\u0646\u064E\u0651\u0639\u0652\u062A\u064F \u0628\u0650\u0627\u0644\u0645\u064E\u0648\u0652\u0635\u064F\u0648\u0644\u0650 \u0644\u0650\u0644\u0645\u064E\u0639\u0652\u0631\u0650\u0641\u064E\u0629\u0650 \u0641\u064E\u0642\u064E\u0637',
          english: 'Definite nouns use an ism mawsul (alladhi etc.) before the qualifying sentence. Indefinite nouns attach the sentence directly without a connector.',
          examples: [
            { arabic: '\u0627\u0644\u0643\u0650\u062A\u064E\u0627\u0628\u064F \u0627\u0644\u064E\u0651\u0630\u0650\u064A \u0642\u064E\u0631\u064E\u0623\u0652\u062A\u064F\u0647\u064F', translation: 'The book that I read', irab: '\u0627\u0644\u0643\u0650\u062A\u064E\u0627\u0628\u064F: ma\u2018rifa (definite) \u2192 needs \u0627\u0644\u064E\u0651\u0630\u0650\u064A' },
            { arabic: '\u0643\u0650\u062A\u064E\u0627\u0628\u064C \u0642\u064E\u0631\u064E\u0623\u0652\u062A\u064F\u0647\u064F', translation: 'A book that I read', irab: '\u0643\u0650\u062A\u064E\u0627\u0628\u064C: nakira (indefinite) \u2192 no connector needed' },
          ],
        },
        {
          arabic: '\u0645\u0650\u0646\u0652 \u0627\u0644\u0628\u064E\u064A\u064E\u0627\u0646\u0650\u064A\u064E\u0651\u0629\u0650',
          english: 'The explanatory min (\u0645\u0650\u0646\u0652 \u0627\u0644\u0628\u064E\u064A\u064E\u0627\u0646\u0650\u064A\u064E\u0651\u0629) can follow the sila of man or ma as a badal (appositive), clarifying the ism mawsul.',
          examples: [
            { arabic: '\u0645\u064E\u0627 \u0631\u064E\u0632\u064E\u0642\u064E\u0643\u064E \u0627\u0644\u0644\u0647\u064F \u0645\u0650\u0646\u0652 \u0645\u064E\u0627\u0644\u064D', translation: 'The wealth that Allah granted you', irab: '\u0645\u0650\u0646\u0652 \u0645\u064E\u0627\u0644\u064D: badal with min al-bayaniyya, clarifying \u0645\u064E\u0627' },
          ],
        },
      ],
      examples: [
        { arabic: '\u0627\u0644\u0644\u0647\u064F \u0647\u064F\u0648\u064E \u0627\u0644\u064E\u0651\u0630\u0650\u064A \u062E\u064E\u0644\u064E\u0642\u064E\u0646\u0650\u064A', translation: 'Allah is the one who created me', source: 'FSTU Arabic, Unit 5', irab: '\u0627\u0644\u0644\u0647\u064F: mubtada\u2019, \u0647\u064F\u0648\u064E: damir al-fasl, \u0627\u0644\u064E\u0651\u0630\u0650\u064A \u062E\u064E\u0644\u064E\u0642\u064E\u0646\u0650\u064A: khabar (ism mawsul + sila)' },
        { arabic: '\u0627\u0644\u064E\u0651\u0630\u0650\u064A \u0622\u0645\u064E\u0646\u064E \u0641\u064E\u0644\u064E\u0647\u064F \u0623\u064E\u062C\u0652\u0631\u064C \u0639\u064E\u0638\u0650\u064A\u0645\u064C', translation: 'For the one who believes is a great reward', source: 'FSTU Arabic, Unit 5', irab: '\u0627\u0644\u064E\u0651\u0630\u0650\u064A \u0622\u0645\u064E\u0646\u064E: mubtada\u2019 (ism mawsul + sila), \u0641\u064E: fa\u2019, \u0644\u064E\u0647\u064F \u0623\u064E\u062C\u0652\u0631\u064C \u0639\u064E\u0638\u0650\u064A\u0645\u064C: khabar' },
        { arabic: '\u0644\u064E\u0645\u0652 \u064A\u064E\u0641\u0652\u0647\u064E\u0645\u0650 \u0627\u0644\u062F\u064E\u0651\u0631\u0652\u0633\u064E \u0627\u0644\u064E\u0651\u0630\u0650\u064A\u0646\u064E \u063A\u064E\u0627\u0628\u064F\u0648\u0627 \u0623\u064E\u0645\u0652\u0633\u0650', translation: 'Those who were absent yesterday did not understand the lesson', source: 'FSTU Arabic, Unit 5', irab: '\u0627\u0644\u064E\u0651\u0630\u0650\u064A\u0646\u064E: ism mawsul as fa\u2018il, \u063A\u064E\u0627\u0628\u064F\u0648\u0627 \u0623\u064E\u0645\u0652\u0633\u0650: sila' },
        { arabic: '\u0627\u0644\u0631\u064E\u0651\u062C\u064F\u0644\u064F \u0627\u0644\u064E\u0651\u0630\u0650\u064A \u062C\u064E\u0627\u0621\u064E \u0645\u0650\u0646\u064E \u0627\u0644\u0642\u064E\u0631\u0652\u064A\u064E\u0629\u0650', translation: 'The man who came from the village', source: 'FSTU Arabic, Unit 5', irab: '\u0627\u0644\u064E\u0651\u0630\u0650\u064A \u062C\u064E\u0627\u0621\u064E: na\u2018t of the definite \u0627\u0644\u0631\u064E\u0651\u062C\u064F\u0644\u064F (requires ism mawsul)' },
        { arabic: '\u0645\u0650\u0646\u0652\u0643\u064F\u0645\u0652 \u0645\u064E\u0646\u0652 \u064A\u064F\u0631\u0650\u064A\u062F\u064F \u0627\u0644\u062F\u064F\u0651\u0646\u0652\u064A\u064E\u0627', translation: 'From amongst you, there are those who desire the world', source: 'FSTU Arabic, Unit 5', irab: '\u0645\u0650\u0646\u0652\u0643\u064F\u0645\u0652: khabar muqaddam, \u0645\u064E\u0646\u0652 \u064A\u064F\u0631\u0650\u064A\u062F\u064F: mubtada\u2019 mu\u2019akhkhar' },
      ],
      tables: [
        {
          title: 'Relative Pronouns (Al-Asma\u2019 al-Mawsula)',
          titleAr: '\u0627\u0644\u0623\u064E\u0633\u0652\u0645\u064E\u0627\u0621\u064F \u0627\u0644\u0645\u064E\u0648\u0652\u0635\u064F\u0648\u0644\u064E\u0629\u064F',
          headers: ['', 'Singular', 'Dual', 'Plural'],
          rows: [
            ['Masculine', '\u0627\u0644\u064E\u0651\u0630\u0650\u064A', '\u0627\u0644\u0644\u064E\u0651\u0630\u064E\u0627\u0646\u0650 / \u0627\u0644\u0644\u064E\u0651\u0630\u064E\u064A\u0652\u0646\u0650', '\u0627\u0644\u064E\u0651\u0630\u0650\u064A\u0646\u064E'],
            ['Feminine', '\u0627\u0644\u064E\u0651\u062A\u0650\u064A', '\u0627\u0644\u0644\u064E\u0651\u062A\u064E\u0627\u0646\u0650 / \u0627\u0644\u0644\u064E\u0651\u062A\u064E\u064A\u0652\u0646\u0650', '\u0627\u0644\u0644\u064E\u0651\u0627\u062A\u0650\u064A / \u0627\u0644\u0644\u064E\u0651\u0627\u0626\u0650\u064A'],
            ['Neutral (human)', '\u0645\u064E\u0646\u0652', '\u2014', '\u2014'],
            ['Neutral (non-human)', '\u0645\u064E\u0627', '\u2014', '\u2014'],
          ],
        },
        {
          title: 'Translation by \u2018A\u2019id Position',
          titleAr: '\u062A\u064E\u0631\u0652\u062C\u064E\u0645\u064E\u0629 \u062D\u064E\u0633\u064E\u0628\u064E \u0645\u064E\u0648\u0652\u0642\u0650\u0639\u0650 \u0627\u0644\u0639\u064E\u0627\u0626\u0650\u062F\u0650',
          headers: ['\u2018A\u2019id Slot', 'Human', 'Non-Human'],
          rows: [
            ['Fa\u2018il', 'who / the one who', 'that / that which'],
            ['Maf\u2018ul bihi', 'whom / who', 'what / that / which'],
            ['Mudaf ilayhi', 'whose / the one whose', 'whose'],
            ['Majrur', 'whom (+ preposition)', 'which (+ preposition)'],
            ['Khabar muqaddam', 'who has', 'which has'],
          ],
        },
        {
          title: 'Four Types of \u0645\u064E\u0627',
          titleAr: '\u0623\u064E\u0646\u0652\u0648\u064E\u0627\u0639\u064F \u0645\u064E\u0627',
          headers: ['Type', 'Arabic Term', 'What Follows', 'Position'],
          rows: [
            ['Resembling laysa', '\u0645\u064F\u0634\u064E\u0628\u064E\u0651\u0647\u064E\u0629\u064C \u0628\u0650\u0644\u064E\u064A\u0652\u0633\u064E', 'marfu\u2018 + mansub', 'Beginning'],
            ['Negating', '\u0646\u064E\u0627\u0641\u0650\u064A\u064E\u0629\u064C', 'A verb (past or present)', 'Beginning'],
            ['Interrogative', '\u0627\u0650\u0633\u0652\u062A\u0650\u0641\u0652\u0647\u064E\u0627\u0645\u0650\u064A\u064E\u0651\u0629\u064C', 'Noun or verbal sentence', 'Beginning'],
            ['Relative pronoun', '\u0645\u064E\u0648\u0652\u0635\u064F\u0648\u0644\u064E\u0629\u064C', 'Sila + other slots', 'Any position'],
          ],
        },
      ],
      sourceRef: 'FSTU Arabic, Unit 5, pp 473-496',
    },
  ],
  relatedTopicIds: ['jumla-sughra', 'harf-mawsul', 'na-t', 'mubtada-khabar', 'verbal-phrases'],
  tags: ['relative pronouns', 'ism mawsul', 'alladhi', 'allati', 'alladhina', 'man', 'ma', 'sila', 'a\'id', 'return pronoun', 'ism mu\'awwal', 'nakira mawsula', 'types of ma'],
};
