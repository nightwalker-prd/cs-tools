import type { NahwTopic } from '../types';

export const harfMawsul: NahwTopic = {
  id: 'harf-mawsul',
  titleAr: 'الحرف الموصول',
  titleEn: 'Conjunction Particles (Harf Mawsul)',
  transliteration: 'al-Harf al-Mawsul',
  categoryId: 'nested-sentences',
  subcategoryId: 'conjunction-particles',
  levels: [
    {
      difficulty: 'beginner',
      summary: 'Conjunction particles (huruf mawsula) connect a clause to the main sentence, forming an ism mu\'awwal (interpreted noun). The four particles are: anna (that \u2014 indicative, followed by ism + khabar), ma masdariyya (that \u2014 indicative, followed by a verb), an (to/that \u2014 subjunctive, causes nasb), and kay (so that \u2014 subjunctive, restricted to maf\'ul lahu).',
      body: `## Overview: Nested Sentences with Harf Mawsul

A **\u062D\u064E\u0631\u0652\u0641\u064C \u0645\u064E\u0648\u0652\u0635\u064F\u0648\u0644\u064C** (conjunction particle) together with its **\u0635\u0650\u0644\u064E\u0629** (connected clause) forms an **\u0627\u0650\u0633\u0652\u0645\u064C \u0645\u064F\u0624\u064E\u0648\u064E\u0651\u0644\u064C** (interpreted noun) \u2014 a clause that functions as a single noun within the main sentence. Unlike the ism mawsul which extracts noun meaning, the harf mawsul extracts **verb meaning** from the sentence.

---

## The Four \u062D\u064F\u0631\u064F\u0648\u0641 \u0645\u064E\u0648\u0652\u0635\u064F\u0648\u0644\u064E\u0629

### Unrestricted (can fill any grammatical slot)

**1. \u0623\u064E\u0646\u064E\u0651 (anna)** \u2014 Indicative mood (facts, descriptions)
- Followed by **\u0627\u0650\u0633\u0652\u0645 + \u062E\u064E\u0628\u064E\u0631** (noun + predicate)
- **\u0639\u064E\u0627\u0645\u0650\u0644** (governing): \u062D\u064E\u0631\u0652\u0641\u064C \u0645\u064F\u0634\u064E\u0628\u064E\u0651\u0647\u064C \u0628\u0650\u0627\u0644\u0641\u0650\u0639\u0652\u0644\u0650 (causes nasb of its ism)
- Translated as **\u201Cthat\u201D**

> **\u0627\u0644\u062D\u064E\u0642\u064F\u0651 \u0623\u064E\u0646\u064E\u0651\u0643\u064E \u0644\u064E\u0627 \u062A\u064E\u0643\u0652\u0630\u0650\u0628\u064F** \u2014 *The truth is that you do not lie.*

**2. \u0645\u064E\u0627 (ma masdariyya)** \u2014 Indicative mood
- Followed by a **\u0641\u0650\u0639\u0652\u0644** (verb)
- **\u063A\u064E\u064A\u0652\u0631\u064F \u0639\u064E\u0627\u0645\u0650\u0644** (non-governing)
- Translated as **\u201Cthat\u201D** or as a **gerund** (-ing)
- Key distinction: \u0623\u064E\u0646\u064E\u0651 takes ism + khabar; \u0645\u064E\u0627 takes a verb

**3. \u0623\u064E\u0646\u0652 (an)** \u2014 Subjunctive mood (wishes, doubts, recommendations)
- Followed by a **\u0641\u0650\u0639\u0652\u0644 \u0645\u064F\u0636\u064E\u0627\u0631\u0650\u0639** (present tense verb)
- **\u0639\u064E\u0627\u0645\u0650\u0644** (governing): causes **\u0646\u064E\u0635\u0652\u0628** of the following verb
- Translated as **\u201Cthat\u201D**, a **gerund**, or an **infinitive** (to + verb)

> **\u0623\u064E\u0631\u0652\u062C\u064F\u0648 \u0623\u064E\u0646\u0652 \u062A\u064E\u0635\u0652\u062F\u064F\u0642\u064E** \u2014 *I hope that you speak the truth / I hope to speak the truth.*

### Restricted (limited to one slot)

**4. \u0643\u064E\u064A\u0652 (kay)** \u2014 Subjunctive mood
- Fills only the **\u0645\u064E\u0641\u0652\u0639\u064F\u0648\u0644\u064C \u0644\u064E\u0647\u064F** (adverb of reason/purpose) slot
- **\u0639\u064E\u0627\u0645\u0650\u0644** (governing): causes **\u0646\u064E\u0635\u0652\u0628** of the verb
- Translated as **\u201Cso that\u201D** or **\u201Cto\u201D**

> **\u0623\u064E\u0631\u0652\u0633\u064E\u0644\u064E \u0627\u0644\u0644\u0647\u064F \u0627\u0644\u0623\u064E\u0646\u0652\u0628\u0650\u064A\u064E\u0627\u0621\u064E \u0643\u064E\u064A\u0652 \u064A\u064E\u0647\u0652\u062F\u064F\u0648\u0627 \u0627\u0644\u0646\u064E\u0651\u0627\u0633\u064E** \u2014 *Allah sent messengers to guide people.*

---

## Negating the Sila after \u0623\u064E\u0646\u0652

The sila is negated by **\u0644\u064E\u0627** (harf nafi). In writing, \u0623\u064E\u0646\u0652 + \u0644\u064E\u0627 merge into **\u0623\u064E\u0644\u064E\u0651\u0627**, but in tarkib they are separated:

> *not lying / not to lie / that you do not lie*

### Differentiating \u0623\u064E\u0646\u0652 \u0627\u0644\u0645\u064E\u0648\u0652\u0635\u064F\u0648\u0644\u064E\u0629 from \u0623\u064E\u0646\u0652 \u0627\u0644\u062A\u064E\u0651\u0641\u0652\u0633\u0650\u064A\u0631\u0650\u064A\u064E\u0651\u0629

| Feature | \u0623\u064E\u0646\u0652 \u0627\u0644\u0645\u064E\u0648\u0652\u0635\u064F\u0648\u0644\u064E\u0629 (conjunction) | \u0623\u064E\u0646\u0652 \u0627\u0644\u062A\u064E\u0651\u0641\u0652\u0633\u0650\u064A\u0631\u0650\u064A\u064E\u0651\u0629 (explanatory) |
|---|---|---|
| Governance | Causes nasb of mudari\u2018 | No grammatical effect |
| What follows | Fi\u2018l mudari\u2018 only | Any sentence type |
| Translation | Gerund or infinitive | Not translated |

---

## Grammatical Slots of Ism Mu\u2019awwal

An ism mu\u2019awwal can occupy any noun slot:

### In a Nominal Sentence:
- **Mubtada\u2019**: \u0623\u064E\u0646\u0652 \u062A\u064E\u0635\u064F\u0648\u0645\u064F\u0648\u0627 \u062E\u064E\u064A\u0652\u0631\u064C \u2014 *Fasting / To fast is better*
- **Mubtada\u2019 mu\u2019akhkhar**: \u0625\u0650\u0646\u064E\u0651 \u0645\u0650\u0646\u064E \u0627\u0644\u0633\u064F\u0651\u0646\u064E\u0651\u0629\u0650 \u0623\u064E\u0646\u0652 \u062A\u064E\u0623\u0652\u0643\u064F\u0644\u064E \u0628\u0650\u064A\u064E\u0645\u0650\u064A\u0646\u0650\u0643\u064E \u2014 *It is from the Sunnah to eat with your right hand*
- **Khabar**: \u0627\u0644\u062D\u064E\u0642\u064F\u0651 \u0623\u064E\u0646\u064E\u0651\u0643\u064E \u062A\u064E\u062C\u0652\u062A\u064E\u0647\u0650\u062F\u064F \u2014 *The truth is that you work hard*

### In a Verbal Sentence:
- **Fa\u2018il**: \u064A\u064E\u062C\u0650\u0628\u064F \u0639\u064E\u0644\u064E\u064A\u0652\u0643\u064E \u0623\u064E\u0646\u0652 \u062A\u064E\u0635\u0652\u062F\u064F\u0642\u064E \u2014 *Speaking the truth is incumbent upon you*
- **Maf\u2018ul bihi**: \u0623\u064E\u0631\u0652\u062C\u064F\u0648 \u0623\u064E\u0646\u0652 \u064A\u064E\u063A\u0652\u0641\u0650\u0631\u064E \u0627\u0644\u0644\u0647\u064F \u0644\u0650\u064A \u2014 *I hope that Allah forgives me*
- **Maf\u2018ul fihi**: \u0623\u064E\u0635\u064F\u0648\u0645\u064F \u0645\u064E\u0627 \u062F\u064F\u0645\u0652\u062A\u064F \u0635\u064E\u062D\u0650\u064A\u062D\u064B\u0627 \u2014 *I will fast as long as I am healthy*
- **Maf\u2018ul lahu**: \u0623\u064E\u0631\u0652\u0633\u064E\u0644\u064E \u0627\u0644\u0644\u0647\u064F \u0627\u0644\u0623\u064E\u0646\u0652\u0628\u0650\u064A\u064E\u0627\u0621\u064E \u0643\u064E\u064A\u0652 \u064A\u064E\u0647\u0652\u062F\u064F\u0648\u0627 \u0627\u0644\u0646\u064E\u0651\u0627\u0633\u064E \u2014 *Allah sent messengers to guide people*
- **Maf\u2018ul mutlaq**: \u064A\u064E\u0642\u0652\u0631\u064E\u0624\u064F\u0648\u0646\u064E \u0643\u064E\u0645\u064E\u0627 \u064A\u064E\u0642\u0652\u0631\u064E\u0623\u064F \u0627\u0644\u0642\u064F\u0631\u064E\u0651\u0627\u0621\u064F \u2014 *They recite as the reciters recite*
- **Mustathna**: \u064A\u064E\u062D\u0652\u0636\u064F\u0631\u064F \u0627\u0644\u062F\u064E\u0651\u0631\u0652\u0633\u064E \u0625\u0650\u0644\u064E\u0651\u0627 \u0623\u064E\u0646\u0652 \u064A\u064E\u0643\u064F\u0648\u0646\u064E \u0645\u064E\u0631\u0650\u064A\u0636\u064B\u0627 \u2014 *He attends unless he is ill*

### In a Phrase:
- **Mudaf ilayhi**: \u064A\u064E\u0623\u0652\u0643\u064F\u0644\u064F \u0642\u064E\u0628\u0652\u0644\u064E \u0623\u064E\u0646\u0652 \u062A\u064E\u0637\u0652\u0644\u064F\u0639\u064E \u0627\u0644\u0641\u064E\u062C\u0652\u0631\u064F \u2014 *He eats before the dawn rises*

---

## Special Translations

### \u0639\u064E\u0644\u064E\u0649 + Ism Mu\u2019awwal \u2192 duty/obligation
> **\u0639\u064E\u0644\u064E\u064A\u0652\u0643\u064E \u0623\u064E\u0646\u0652 \u062A\u064E\u062E\u0652\u062F\u0650\u0645\u064E \u0648\u064E\u0627\u0644\u0650\u062F\u064E\u064A\u0652\u0643\u064E** \u2014 *It is your duty to serve your parents.*

### \u0644\u0650 + Ism Mu\u2019awwal (affirmative) \u2192 right/permission
> **\u0644\u064E\u0643\u064E \u0623\u064E\u0646\u0652 \u062A\u064E\u062C\u0652\u0644\u0650\u0633\u064E \u0647\u064F\u0646\u064E\u0627** \u2014 *You can sit here / You are allowed to sit here.*

### \u0644\u0650 + Ism Mu\u2019awwal (negative) \u2192 prohibition
> **\u0644\u064E\u064A\u0652\u0633\u064E \u0644\u064E\u0643\u064E \u0623\u064E\u0646\u0652 \u062A\u064E\u062C\u0652\u0644\u0650\u0633\u064E \u0647\u064F\u0646\u064E\u0627** \u2014 *You are not allowed to sit here.*

### \u0645\u064E\u0627 \u0627\u0644\u0638\u064E\u0651\u0631\u0652\u0641\u0650\u064A\u064E\u0651\u0629 (Temporal ma) \u2192 \u201Cas long as\u201D
> **\u062C\u064E\u0644\u064E\u0633\u0652\u062A\u064F \u0645\u064E\u0627 \u0642\u064F\u0645\u0652\u062A\u064E** \u2014 *I sat as long as you stood.*
> **\u0623\u064E\u0635\u064F\u0648\u0645\u064F \u0645\u064E\u0627 \u062F\u064F\u0645\u0652\u062A\u064F \u0635\u064E\u062D\u0650\u064A\u062D\u064B\u0627** \u2014 *I will fast as long as I am healthy.*

### Subjunctive \u2192 purpose; Indicative \u2192 cause
- **Subjunctive** (goal): \u0623\u064E\u062A\u0652\u0644\u064F\u0648 \u0627\u0644\u0642\u064F\u0631\u0652\u0622\u0646\u064E \u0644\u0650\u0623\u064E\u062D\u0652\u0635\u064F\u0644\u064E \u0639\u064E\u0644\u064E\u0649 \u0627\u0644\u0623\u064E\u062C\u0652\u0631\u0650 \u2014 *I recite the Quran so that I acquire reward*
- **Indicative** (cause): \u0623\u064E\u0639\u0652\u0628\u064F\u062F\u064F \u0627\u0644\u0644\u0647\u064E \u0644\u0650\u0623\u064E\u0646\u064E\u0651\u0647\u064F \u062E\u064E\u0644\u064E\u0642\u064E\u0646\u0650\u064A \u2014 *I worship Allah because He created me*`,
      rules: [
        {
          arabic: '\u0627\u0644\u062D\u064F\u0631\u064F\u0648\u0641\u064F \u0627\u0644\u0645\u064E\u0648\u0652\u0635\u064F\u0648\u0644\u064E\u0629\u064F \u0623\u064E\u0631\u0652\u0628\u064E\u0639\u064E\u0629\u064C',
          english: 'There are four conjunction particles: anna (indicative, ism + khabar), ma masdariyya (indicative, verb), an (subjunctive, causes nasb), and kay (subjunctive, maf\'ul lahu only).',
          examples: [
            { arabic: '\u0627\u0644\u062D\u064E\u0642\u064F\u0651 \u0623\u064E\u0646\u064E\u0651\u0643\u064E \u0644\u064E\u0627 \u062A\u064E\u0643\u0652\u0630\u0650\u0628\u064F', translation: 'The truth is that you do not lie', irab: '\u0623\u064E\u0646\u064E\u0651: harf mawsul, \u0643\u064E: ism anna, \u0644\u064E\u0627 \u062A\u064E\u0643\u0652\u0630\u0650\u0628\u064F: khabar anna' },
            { arabic: '\u0623\u064E\u0631\u0652\u062C\u064F\u0648 \u0623\u064E\u0646\u0652 \u062A\u064E\u0635\u0652\u062F\u064F\u0642\u064E', translation: 'I hope that you speak the truth', irab: '\u0623\u064E\u0646\u0652: harf mawsul (subjunctive), \u062A\u064E\u0635\u0652\u062F\u064F\u0642\u064E: fi\u2018l mudari\u2018 mansub' },
          ],
        },
        {
          arabic: '\u0623\u064E\u0646\u0652 \u0627\u0644\u0645\u064E\u0648\u0652\u0635\u064F\u0648\u0644\u064E\u0629\u064F \u062A\u064F\u0633\u064E\u0628\u0651\u0650\u0628\u064F \u0646\u064E\u0635\u0652\u0628\u064E \u0627\u0644\u0641\u0650\u0639\u0652\u0644\u0650',
          english: 'An al-mawsula (conjunction) causes nasb of the following mudari\u2018 verb. An al-tafsiriyya (explanatory) has no grammatical effect and can be followed by any sentence type.',
          examples: [
            { arabic: '\u0623\u064E\u0631\u064E\u0627\u062F\u064E\u062A\u0650 \u0627\u0644\u0623\u064F\u0645\u064F\u0651 \u0623\u064E\u0646\u0652 \u064A\u064E\u0635\u0652\u062F\u064F\u0642\u064E \u0627\u0644\u0648\u064E\u0644\u064E\u062F\u064F', translation: 'The mother wanted the child to speak the truth', irab: '\u0623\u064E\u0646\u0652: mawsula (causes nasb of \u064A\u064E\u0635\u0652\u062F\u064F\u0642\u064E)' },
            { arabic: '\u0646\u064E\u0627\u062F\u064E\u062A\u0650 \u0627\u0644\u0623\u064F\u0645\u064F\u0651 \u0623\u064E\u0646\u0650 \u0627\u0635\u0652\u062F\u064F\u0642\u0652', translation: 'The mother called out: Speak the truth', irab: '\u0623\u064E\u0646\u0652: tafsiriyya (no nasb, imperative follows)' },
          ],
        },
        {
          arabic: '\u0643\u064E\u064A\u0652 \u0645\u064E\u062D\u0652\u0635\u064F\u0648\u0631\u064E\u0629\u064C \u0641\u0650\u064A \u0627\u0644\u0645\u064E\u0641\u0652\u0639\u064F\u0648\u0644\u0650 \u0644\u064E\u0647\u064F',
          english: 'Kay is restricted to the maf\u2018ul lahu (purpose/reason) slot. If the subject of the sila is mentioned in the main sentence, kay = "to". If not, kay = "so that".',
          examples: [
            { arabic: '\u0623\u064E\u0631\u0652\u0633\u064E\u0644\u064E \u0627\u0644\u0644\u0647\u064F \u0627\u0644\u0623\u064E\u0646\u0652\u0628\u0650\u064A\u064E\u0627\u0621\u064E \u0643\u064E\u064A\u0652 \u064A\u064E\u0647\u0652\u062F\u064F\u0648\u0627 \u0627\u0644\u0646\u064E\u0651\u0627\u0633\u064E', translation: 'Allah sent messengers to guide people', irab: '\u0643\u064E\u064A\u0652: harf mawsul, \u064A\u064E\u0647\u0652\u062F\u064F\u0648\u0627: fi\u2018l mansub, subject in main sentence \u2192 "to"' },
            { arabic: '\u0623\u064E\u0631\u0652\u0633\u064E\u0644\u064E \u0627\u0644\u0644\u0647\u064F \u0627\u0644\u0623\u064E\u0646\u0652\u0628\u0650\u064A\u064E\u0627\u0621\u064E \u0643\u064E\u064A\u0652 \u064A\u064E\u0647\u0652\u062A\u064E\u062F\u0650\u064A\u064E \u0627\u0644\u0646\u064E\u0651\u0627\u0633\u064F', translation: 'Allah sent messengers so that people are guided', irab: '\u0643\u064E\u064A\u0652: harf mawsul, subject not in main sentence \u2192 "so that"' },
          ],
        },
        {
          arabic: '\u0644\u0650 + \u0627\u0644\u0641\u0650\u0639\u0652\u0644\u0650 \u0627\u0644\u0645\u064F\u0636\u064E\u0627\u0631\u0650\u0639\u0650 = \u0623\u064E\u0646\u0652 \u0645\u064E\u062D\u0652\u0630\u064F\u0648\u0641\u064E\u0629',
          english: 'When lam (li) precedes a mudari\u2018 verb expressing purpose, an is present but commonly omitted. The verb remains mansub. Hatta can replace li-an for "until".',
          examples: [
            { arabic: '\u0630\u064E\u0647\u064E\u0628\u0652\u062A\u064F\u0645\u0652 \u0625\u0650\u0644\u064E\u0649 \u0627\u0644\u0645\u064E\u0633\u0652\u062C\u0650\u062F\u0650 \u0644\u0650\u062A\u064F\u0635\u064E\u0644\u064F\u0651\u0648\u0627', translation: 'You went to the masjid to perform Salah', irab: '\u0644\u0650: harf jarr, \u0623\u064E\u0646\u0652 hidden, \u062A\u064F\u0635\u064E\u0644\u064F\u0651\u0648\u0627: mansub' },
            { arabic: '\u0644\u064E\u0627 \u064A\u064E\u0623\u0652\u0643\u064F\u0644\u064F \u0627\u0644\u0635\u064E\u0651\u0627\u0626\u0650\u0645\u064F\u0648\u0646\u064E \u062D\u064E\u062A\u064E\u0651\u0649 \u062A\u064E\u063A\u0652\u0631\u064F\u0628\u064E \u0627\u0644\u0634\u064E\u0651\u0645\u0652\u0633\u064F', translation: 'Those fasting will not eat until the sun sets', irab: '\u062D\u064E\u062A\u064E\u0651\u0649: harf jarr, \u0623\u064E\u0646\u0652 hidden, \u062A\u064E\u063A\u0652\u0631\u064F\u0628\u064E: mansub' },
          ],
        },
        {
          arabic: '\u0645\u064E\u0627 \u0627\u0644\u0638\u064E\u0651\u0631\u0652\u0641\u0650\u064A\u064E\u0651\u0629\u064F \u062A\u064F\u062A\u064E\u0631\u0652\u062C\u064E\u0645\u064F \u0628\u0640\u0640\u0640 \u00ABas long as\u00BB',
          english: 'Ma al-zarfiyya (temporal ma) makes the ism mu\u2019awwal an adverb of time. Translated as "as long as". Ma dam means "as long as" with a fi\u2018l naqis.',
          examples: [
            { arabic: '\u062C\u064E\u0644\u064E\u0633\u0652\u062A\u064F \u0645\u064E\u0627 \u0642\u064F\u0645\u0652\u062A\u064E', translation: 'I sat as long as you stood', irab: '\u0645\u064E\u0627: harf mawsul (zarfiyya), \u0642\u064F\u0645\u0652\u062A\u064E: sila, whole = maf\u2018ul fihi' },
            { arabic: '\u0623\u064E\u0635\u064F\u0648\u0645\u064F \u0645\u064E\u0627 \u062F\u064F\u0645\u0652\u062A\u064F \u0635\u064E\u062D\u0650\u064A\u062D\u064B\u0627', translation: 'I will fast as long as I am healthy', irab: '\u0645\u064E\u0627 \u062F\u064F\u0645\u0652\u062A\u064F: ma + dama (fi\u2018l naqis), \u0635\u064E\u062D\u0650\u064A\u062D\u064B\u0627: khabar ma dama' },
          ],
        },
      ],
      examples: [
        { arabic: '\u0645\u0650\u0646\u0652 \u0639\u064E\u0642\u0650\u064A\u062F\u064E\u0629\u0650 \u0627\u0644\u0645\u064F\u0624\u0652\u0645\u0650\u0646\u0650\u064A\u0646\u064E \u0623\u064E\u0646\u064E\u0651 \u0627\u0644\u0644\u0647\u064E \u0648\u064E\u0627\u062D\u0650\u062F\u064C', translation: 'It is a Muslim\'s belief that Allah is One', source: 'FSTU Arabic, Unit 5', irab: '\u0623\u064E\u0646\u064E\u0651 \u0627\u0644\u0644\u0647\u064E \u0648\u064E\u0627\u062D\u0650\u062F\u064C: mubtada\u2019 mu\u2019akhkhar (ism mu\u2019awwal)' },
        { arabic: '\u064A\u064E\u062C\u0650\u0628\u064F \u0639\u064E\u0644\u064E\u064A\u0652\u0643\u064E \u0623\u064E\u0646\u0652 \u062A\u064E\u0635\u0652\u062F\u064F\u0642\u064E', translation: 'Speaking the truth is incumbent upon you', source: 'FSTU Arabic, Unit 5', irab: '\u0623\u064E\u0646\u0652 \u062A\u064E\u0635\u0652\u062F\u064F\u0642\u064E: ism mu\u2019awwal as fa\u2018il of \u064A\u064E\u062C\u0650\u0628\u064F' },
        { arabic: '\u064A\u064E\u0639\u0652\u0644\u064E\u0645\u064F\u0648\u0646\u064E \u0623\u064E\u0646\u064E\u0651 \u0627\u0644\u0644\u0647\u064E \u0631\u064E\u0628\u064F\u0651\u0647\u064F\u0645\u0652', translation: 'They know that Allah is their Lord', source: 'FSTU Arabic, Unit 5', irab: '\u0623\u064E\u0646\u064E\u0651 \u0627\u0644\u0644\u0647\u064E \u0631\u064E\u0628\u064F\u0651\u0647\u064F\u0645\u0652: ism mu\u2019awwal as maf\u2018ul bihi' },
        { arabic: '\u064A\u064E\u0623\u0652\u0643\u064F\u0644\u064F \u0627\u0644\u0635\u064E\u0651\u0627\u0626\u0650\u0645\u064F\u0648\u0646\u064E \u0642\u064E\u0628\u0652\u0644\u064E \u0623\u064E\u0646\u0652 \u062A\u064E\u0637\u0652\u0644\u064F\u0639\u064E \u0627\u0644\u0641\u064E\u062C\u0652\u0631\u064F', translation: 'Those fasting eat before the dawn rises', source: 'FSTU Arabic, Unit 5', irab: '\u0642\u064E\u0628\u0652\u0644\u064E: mudaf (adverb), \u0623\u064E\u0646\u0652 \u062A\u064E\u0637\u0652\u0644\u064F\u0639\u064E \u0627\u0644\u0641\u064E\u062C\u0652\u0631\u064F: mudaf ilayhi (ism mu\u2019awwal)' },
        { arabic: '\u064A\u064E\u062D\u0652\u0636\u064F\u0631\u064F \u0623\u064E\u062D\u0652\u0645\u064E\u062F\u064F \u0627\u0644\u062F\u064E\u0651\u0631\u0652\u0633\u064E \u0625\u0650\u0644\u064E\u0651\u0627 \u0623\u064E\u0646\u0652 \u064A\u064E\u0643\u064F\u0648\u0646\u064E \u0645\u064E\u0631\u0650\u064A\u0636\u064B\u0627', translation: 'Ahmad attends lesson unless he is ill', source: 'FSTU Arabic, Unit 5', irab: '\u0625\u0650\u0644\u064E\u0651\u0627: harf istithna\u2019, \u0623\u064E\u0646\u0652 \u064A\u064E\u0643\u064F\u0648\u0646\u064E \u0645\u064E\u0631\u0650\u064A\u0636\u064B\u0627: mustathna (ism mu\u2019awwal)' },
        { arabic: '\u064A\u064E\u0642\u0652\u0631\u064E\u0624\u064F\u0648\u0646\u064E \u0643\u064E\u0645\u064E\u0627 \u064A\u064E\u0642\u0652\u0631\u064E\u0623\u064F \u0627\u0644\u0642\u064F\u0631\u064E\u0651\u0627\u0621\u064F', translation: 'They recite as the reciters recite', source: 'FSTU Arabic, Unit 5', irab: '\u0643\u064E: harf jarr, \u0645\u064E\u0627: harf mawsul, whole = maf\u2018ul mutlaq' },
      ],
      tables: [
        {
          title: 'The Four Conjunction Particles',
          titleAr: '\u0627\u0644\u062D\u064F\u0631\u064F\u0648\u0641\u064F \u0627\u0644\u0645\u064E\u0648\u0652\u0635\u064F\u0648\u0644\u064E\u0629\u064F \u0627\u0644\u0623\u064E\u0631\u0652\u0628\u064E\u0639\u064E\u0629\u064F',
          headers: ['Particle', 'Mood', 'What Follows', 'Governance'],
          rows: [
            ['\u0623\u064E\u0646\u064E\u0651', 'Indicative', 'Ism + khabar', '\u0639\u064E\u0627\u0645\u0650\u0644 (harf mushabbah bil-fi\u2018l)'],
            ['\u0645\u064E\u0627', 'Indicative', 'Verb', '\u063A\u064E\u064A\u0652\u0631\u064F \u0639\u064E\u0627\u0645\u0650\u0644'],
            ['\u0623\u064E\u0646\u0652', 'Subjunctive', 'Fi\u2018l mudari\u2018', '\u0639\u064E\u0627\u0645\u0650\u0644 (causes nasb)'],
            ['\u0643\u064E\u064A\u0652', 'Subjunctive', 'Fi\u2018l mudari\u2018', '\u0639\u064E\u0627\u0645\u0650\u0644 (causes nasb, maf\u2018ul lahu only)'],
          ],
        },
        {
          title: 'All Slots for Ism Mu\u2019awwal',
          titleAr: '\u0645\u064E\u0648\u064E\u0627\u0642\u0650\u0639\u064F \u0627\u0644\u0627\u0650\u0633\u0652\u0645\u0650 \u0627\u0644\u0645\u064F\u0624\u064E\u0648\u064E\u0651\u0644\u0650',
          headers: ['Slot', 'Example'],
          rows: [
            ['Mubtada\u2019', '\u0623\u064E\u0646\u0652 \u062A\u064E\u0635\u064F\u0648\u0645\u064F\u0648\u0627 \u062E\u064E\u064A\u0652\u0631\u064C'],
            ['Mubtada\u2019 mu\u2019akhkhar', '\u0625\u0650\u0646\u064E\u0651 \u0645\u0650\u0646\u064E \u0627\u0644\u0633\u064F\u0651\u0646\u064E\u0651\u0629\u0650 \u0623\u064E\u0646\u0652 \u062A\u064E\u0623\u0652\u0643\u064F\u0644\u064E \u0628\u0650\u064A\u064E\u0645\u0650\u064A\u0646\u0650\u0643\u064E'],
            ['Khabar', '\u0627\u0644\u062D\u064E\u0642\u064F\u0651 \u0623\u064E\u0646\u064E\u0651\u0643\u064E \u062A\u064E\u062C\u0652\u062A\u064E\u0647\u0650\u062F\u064F'],
            ['Fa\u2018il', '\u064A\u064E\u062C\u0650\u0628\u064F \u0639\u064E\u0644\u064E\u064A\u0652\u0643\u064E \u0623\u064E\u0646\u0652 \u062A\u064E\u0635\u0652\u062F\u064F\u0642\u064E'],
            ['Maf\u2018ul bihi', '\u0623\u064E\u0631\u0652\u062C\u064F\u0648 \u0623\u064E\u0646\u0652 \u064A\u064E\u063A\u0652\u0641\u0650\u0631\u064E \u0627\u0644\u0644\u0647\u064F \u0644\u0650\u064A'],
            ['Maf\u2018ul fihi', '\u0623\u064E\u0635\u064F\u0648\u0645\u064F \u0645\u064E\u0627 \u062F\u064F\u0645\u0652\u062A\u064F \u0635\u064E\u062D\u0650\u064A\u062D\u064B\u0627'],
            ['Maf\u2018ul lahu', '\u0643\u064E\u064A\u0652 \u064A\u064E\u0647\u0652\u062F\u064F\u0648\u0627 \u0627\u0644\u0646\u064E\u0651\u0627\u0633\u064E / \u0644\u0650\u062A\u064F\u0635\u064E\u0644\u064F\u0651\u0648\u0627'],
            ['Maf\u2018ul mutlaq', '\u0643\u064E\u0645\u064E\u0627 \u064A\u064E\u0642\u0652\u0631\u064E\u0623\u064F \u0627\u0644\u0642\u064F\u0631\u064E\u0651\u0627\u0621\u064F'],
            ['Mustathna', '\u0625\u0650\u0644\u064E\u0651\u0627 \u0623\u064E\u0646\u0652 \u064A\u064E\u0643\u064F\u0648\u0646\u064E \u0645\u064E\u0631\u0650\u064A\u0636\u064B\u0627'],
            ['Mudaf ilayhi', '\u0642\u064E\u0628\u0652\u0644\u064E \u0623\u064E\u0646\u0652 \u062A\u064E\u0637\u0652\u0644\u064F\u0639\u064E \u0627\u0644\u0641\u064E\u062C\u0652\u0631\u064F'],
          ],
        },
        {
          title: 'Common Adverbs with Ism Mu\u2019awwal as Mudaf Ilayhi',
          titleAr: '\u0627\u0644\u0638\u064F\u0631\u064F\u0648\u0641\u064F \u0645\u064E\u0639\u064E \u0627\u0644\u0627\u0650\u0633\u0652\u0645\u0650 \u0627\u0644\u0645\u064F\u0624\u064E\u0648\u064E\u0651\u0644\u0650',
          headers: ['Arabic', 'English', 'Arabic', 'English'],
          rows: [
            ['\u0642\u064E\u0628\u0652\u0644\u064E \u0623\u064E\u0646\u0652', 'before', '\u0628\u064E\u0639\u0652\u062F\u064E \u0645\u064E\u0627 / \u0628\u064E\u0639\u0652\u062F\u064E \u0623\u064E\u0646\u0652', 'after'],
            ['\u0628\u064E\u064A\u0652\u0646\u064E\u0645\u064E\u0627', 'when, whilst', '\u062D\u0650\u064A\u0646\u064E\u0645\u064E\u0627', 'when, while'],
            ['\u0631\u064E\u064A\u0652\u062B\u064E\u0645\u064E\u0627', 'while, as long as', '\u0639\u0650\u0646\u0652\u062F\u064E\u0645\u064E\u0627', 'when, whilst'],
          ],
        },
      ],
      sourceRef: 'FSTU Arabic, Unit 5, pp 497-560',
    },
  ],
  relatedTopicIds: ['jumla-sughra', 'ism-mawsul', 'verbal-phrases', 'harf-mushabbah', 'nasb-particles'],
  tags: ['harf mawsul', 'conjunction particles', 'anna', 'an', 'ma masdariyya', 'kay', 'ism mu\'awwal', 'nasb', 'subjunctive', 'indicative', 'maf\'ul lahu', 'purpose', 'ma zarfiyya', 'temporal ma', 'ma dama'],
};

export const verbalPhrases: NahwTopic = {
  id: 'verbal-phrases',
  titleAr: 'الجمل الفعلية',
  titleEn: 'Verbal Phrases',
  transliteration: 'al-Jumal al-Fi\'liyya',
  categoryId: 'nested-sentences',
  subcategoryId: 'conjunction-particles',
  levels: [
    {
      difficulty: 'beginner',
      summary: 'Verbal phrases are phrases headed by a masdar (verbal noun) or a derived noun (ism fa\'il, sifa mushabbaha, ism maf\'ul, ism tafdil) that carry verbal meaning. These phrases have their own fa\'il, maf\'ul bihi, and other verbal slots, and can fill any grammatical position in a sentence.',
      body: `## Introduction to Verbal Phrases

Both **\u0645\u064E\u0635\u0652\u062F\u064E\u0631** (verbal nouns) and **\u0645\u064F\u0634\u0652\u062A\u064E\u0642\u064E\u0651\u0627\u062A** (derived nouns) can carry verbal meanings. When they do, they form **verbal phrases** with their own fa\u2018il, maf\u2018ul bihi, and other slots.

### Five Types of Verbal Phrases

1. **\u0645\u064E\u0635\u0652\u062F\u064E\u0631 verbal phrase** (verbal noun phrase)
2. **\u0627\u0650\u0633\u0652\u0645\u064F \u0627\u0644\u0641\u064E\u0627\u0639\u0650\u0644\u0650 verbal phrase** (active participle phrase)
3. **\u0627\u0644\u0635\u0651\u0650\u0641\u064E\u0629\u064F \u0627\u0644\u0645\u064F\u0634\u064E\u0628\u064E\u0651\u0647\u064E\u0629\u064F verbal phrase** (resembling adjective phrase)
4. **\u0627\u0650\u0633\u0652\u0645\u064F \u0627\u0644\u0645\u064E\u0641\u0652\u0639\u064F\u0648\u0644\u0650 verbal phrase** (passive participle phrase)
5. **\u0627\u0650\u0633\u0652\u0645\u064F \u0627\u0644\u062A\u064E\u0651\u0641\u0652\u0636\u0650\u064A\u0644\u0650 verbal phrase** (comparative/superlative phrase)

---

## The Masdar Verbal Phrase

### Construction

A masdar verbal phrase has:
- **Essential**: The masdar itself
- **Non-essential**: mudaf ilayhi slot, ghayr sarih or mansub slot(s)

### The Mudaf Ilayhi Slot

The masdar\u2019s mudaf ilayhi can function as the **fa\u2018il**, **maf\u2018ul bihi**, or **maf\u2018ul fihi**:

> **\u0641\u064E\u0647\u0652\u0645\u064F \u0627\u0644\u0637\u064E\u0651\u0627\u0644\u0650\u0628\u0650** \u2014 *the student\u2019s understanding* (mudaf ilayhi = fa\u2018il)
> **\u0641\u064E\u0647\u0652\u0645\u064F \u0627\u0644\u062F\u064E\u0651\u0631\u0652\u0633\u0650** \u2014 *the understanding of the lesson* (mudaf ilayhi = maf\u2018ul bihi)
> **\u0642\u0650\u064A\u064E\u0627\u0645\u064F \u0627\u0644\u0644\u064E\u0651\u064A\u0652\u0644\u0650** \u2014 *standing during the night* (mudaf ilayhi = maf\u2018ul fihi)

### Both Fa\u2018il and Maf\u2018ul Bihi

> **\u0641\u064E\u0647\u0652\u0645\u064F \u0627\u0644\u0637\u064E\u0651\u0627\u0644\u0650\u0628\u0650 \u0627\u0644\u062F\u064E\u0651\u0631\u0652\u0633\u064E** \u2014 *the student\u2019s understanding of the lesson*

Here \u0627\u0644\u0637\u064E\u0651\u0627\u0644\u0650\u0628\u0650 is mudaf ilayhi (as fa\u2018il) and \u0627\u0644\u062F\u064E\u0651\u0631\u0652\u0633\u064E is maf\u2018ul bihi.

### Negation

A masdar phrase is negated by placing **\u0639\u064E\u062F\u064E\u0645\u064F** before it:

> **\u0639\u064E\u062F\u064E\u0645\u064F \u0627\u0644\u0641\u064E\u0647\u0652\u0645\u0650 \u0644\u0650\u0644\u062F\u064E\u0651\u0631\u0652\u0633\u0650** \u2014 *not understanding the lesson*

---

## The Ism al-Fa\u2018il Verbal Phrase

The **\u0627\u0650\u0633\u0652\u0645\u064F \u0627\u0644\u0641\u064E\u0627\u0639\u0650\u0644\u0650** (active participle) can head a verbal phrase, functioning like a present-tense verb.

### Fa\u2018il Slot

The ism al-fa\u2018il must have a fa\u2018il, either as a hidden pronoun or a regular noun:

> **\u0627\u0644\u0631\u064E\u0651\u062C\u064F\u0644\u064F \u0633\u064E\u0627\u0645\u0650\u0639\u064C** \u2014 *The man is listening.* (fa\u2018il: hidden \u0647\u064F\u0648\u064E)
> **\u0627\u0644\u0631\u064E\u0651\u062C\u064F\u0644\u064F \u0633\u064E\u0627\u0645\u0650\u0639\u064C \u0648\u064E\u0644\u064E\u062F\u064F\u0647\u064F** \u2014 *The man\u2019s son is listening.* (fa\u2018il: \u0648\u064E\u0644\u064E\u062F\u064F\u0647\u064F)

### Without \u0623\u064E\u0644 \u2014 Three Positions

1. **Khabar**: \u0647\u064F\u0648\u064E \u0642\u064E\u0627\u0626\u0650\u0645\u064C \u0639\u0650\u0646\u0652\u062F\u064E \u0627\u0644\u0628\u064E\u0627\u0628\u0650 \u2014 *He is standing by the door*
2. **Hal**: \u0631\u064E\u0623\u064E\u064A\u0652\u062A\u064F\u0647\u064F \u0642\u064E\u0627\u0626\u0650\u0645\u064B\u0627 \u0639\u0650\u0646\u0652\u062F\u064E \u0627\u0644\u0628\u064E\u0627\u0628\u0650 \u2014 *I saw him standing by the door*
3. After **\u0645\u064E\u0627 \u0627\u0644\u0645\u064F\u0634\u064E\u0628\u064E\u0651\u0647\u064E\u0629**: \u0645\u064E\u0627 \u0643\u064E\u0627\u0630\u0650\u0628\u064C \u0627\u0644\u062A\u064E\u0651\u0627\u062C\u0650\u0631\u064F \u2014 *The merchant is not lying*

### With \u0623\u064E\u0644 \u2014 Functions as Ism Mawsul

> **\u0627\u0644\u0642\u064E\u0627\u0626\u0650\u0645\u064F \u0639\u0650\u0646\u0652\u062F\u064E \u0627\u0644\u0628\u064E\u0627\u0628\u0650 \u0647\u064F\u0648\u064E \u0635\u064E\u062F\u0650\u064A\u0642\u0650\u064A** \u2014 *The one standing by the door is my friend.*

---

## The Sifa Mushabbaha Verbal Phrase

The **\u0627\u0644\u0635\u0651\u0650\u0641\u064E\u0629\u064F \u0627\u0644\u0645\u064F\u0634\u064E\u0628\u064E\u0651\u0647\u064E\u0629\u064F** describes inherent, lasting qualities (unlike the temporary actions of ism al-fa\u2018il).

The fa\u2018il can appear as a hidden pronoun, a regular noun, or as mudaf ilayhi:

> **\u0627\u0644\u0644\u0647\u064F \u063A\u064E\u0641\u064F\u0648\u0631\u064C** \u2014 *Allah is Forgiving.* (hidden fa\u2018il)
> **\u0627\u0644\u0644\u0647\u064F \u0633\u064E\u0631\u0650\u064A\u0639\u064C \u062D\u0650\u0633\u064E\u0627\u0628\u064F\u0647\u064F** \u2014 *Allah\u2019s reckoning is swift.* (fa\u2018il: \u062D\u0650\u0633\u064E\u0627\u0628\u064F\u0647\u064F)
> **\u0627\u0644\u0644\u0647\u064F \u0633\u064E\u0631\u0650\u064A\u0639\u064F \u0627\u0644\u062D\u0650\u0633\u064E\u0627\u0628\u0650** \u2014 *Allah is swift in reckoning.* (fa\u2018il as mudaf ilayhi)

---

## The Ism al-Maf\u2018ul Verbal Phrase

The **\u0627\u0650\u0633\u0652\u0645\u064F \u0627\u0644\u0645\u064E\u0641\u0652\u0639\u064F\u0648\u0644\u0650** (passive participle) verbal phrase is constructed like the ism al-fa\u2018il phrase, except it has a **\u0646\u064E\u0627\u0626\u0650\u0628\u064F \u0627\u0644\u0641\u064E\u0627\u0639\u0650\u0644\u0650** (deputy subject) instead of a fa\u2018il:

> **\u0627\u0644\u062A\u064E\u0651\u0627\u0626\u0650\u0628\u064F \u0645\u064E\u0642\u0652\u0628\u064F\u0648\u0644\u064E\u0629\u064C \u062A\u064E\u0648\u0652\u0628\u064E\u062A\u064F\u0647\u064F** \u2014 *The repentance of the one who repents will be accepted.*

When the na\u2019ib al-fa\u2018il is a ghayr sarih (indirect), the ism al-maf\u2018ul remains **masculine singular**:

> **\u0627\u0644\u063A\u0650\u064A\u0628\u064E\u0629\u064F \u0645\u064E\u0646\u0652\u0647\u0650\u064A\u0651\u064C \u0639\u064E\u0646\u0652\u0647\u064E\u0627** \u2014 *Backbiting is prohibited.* (\u0645\u064E\u0646\u0652\u0647\u0650\u064A\u0651\u064C stays masculine despite \u0627\u0644\u063A\u0650\u064A\u0628\u064E\u0629\u064F being feminine)

---

## The Ism al-Tafdil Verbal Phrase

The **\u0627\u0650\u0633\u0652\u0645\u064F \u0627\u0644\u062A\u064E\u0651\u0641\u0652\u0636\u0650\u064A\u0644\u0650** (comparative/superlative) expresses comparison or superlative.

### Comparative vs. Superlative

- **With \u0645\u0650\u0646\u0652** \u2192 comparative: \u0641\u064E\u0627\u0637\u0650\u0645\u064E\u0629\u064F \u0623\u064E\u0637\u0652\u0648\u064E\u0644\u064F \u0645\u0650\u0646\u0652 \u062E\u064E\u062F\u0650\u064A\u062C\u064E\u0629\u064E \u2014 *Fatima is taller than Khadeejah*
- **Without \u0645\u0650\u0646\u0652** \u2192 superlative: \u0627\u0644\u0635\u064E\u0651\u0644\u064E\u0627\u0629\u064F \u0623\u064E\u0641\u0652\u0636\u064E\u0644\u064F \u0639\u064E\u0645\u064E\u0644\u064D \u2014 *Salah is the most virtuous deed*

### Without \u0623\u064E\u0644 \u2014 Usually Masculine Singular

> **\u0627\u0644\u0635\u064E\u0651\u0644\u064E\u0627\u0629\u064F \u0623\u064E\u0641\u0652\u0636\u064E\u0644\u064F \u0639\u064E\u0645\u064E\u0644\u064D \u0628\u064E\u0639\u0652\u062F\u064E \u0627\u0644\u0625\u0650\u064A\u0645\u064E\u0627\u0646\u0650** \u2014 *Salah is the most virtuous deed after faith.*

### With \u0623\u064E\u0644 \u2014 Agrees in Gender and Number

> **\u0627\u0644\u0648\u064E\u0644\u064E\u062F\u064F \u0627\u0644\u0623\u064E\u0643\u0652\u0628\u064E\u0631\u064F** \u2014 *the eldest boy*

### Tamyiz with Ism al-Tafdil

Common with words like \u0623\u064E\u0643\u0652\u062B\u064E\u0631\u064F, \u0623\u064E\u062D\u0652\u0633\u064E\u0646\u064F, \u0623\u064E\u0642\u064E\u0644\u064F\u0651, \u0623\u064E\u0634\u064E\u062F\u064F\u0651:

> **\u0647\u064F\u0645\u0652 \u0623\u064E\u0643\u0652\u062B\u064E\u0631\u064F \u0627\u0644\u0646\u064E\u0651\u0627\u0633\u0650 \u062D\u064E\u0627\u062C\u064E\u0629\u064B** \u2014 *They are the neediest people.* (\u062D\u064E\u0627\u062C\u064E\u0629\u064B is tamyiz)`,
      rules: [
        {
          arabic: '\u0627\u0644\u0645\u064E\u0635\u0652\u062F\u064E\u0631\u064F \u064A\u064E\u0639\u0652\u0645\u064E\u0644\u064F \u0639\u064E\u0645\u064E\u0644\u064E \u0627\u0644\u0641\u0650\u0639\u0652\u0644\u0650',
          english: 'The masdar (verbal noun) can head a verbal phrase. Its mudaf ilayhi can function as fa\u2018il (doer), maf\u2018ul bihi (object), or maf\u2018ul fihi (adverb).',
          examples: [
            { arabic: '\u0634\u064F\u0631\u0652\u0628\u064F \u0627\u0644\u062E\u064E\u0645\u0652\u0631\u0650 \u062D\u064E\u0631\u064E\u0627\u0645\u064C', translation: 'Drinking alcohol is forbidden', irab: '\u0634\u064F\u0631\u0652\u0628\u064F: masdar (mubtada\u2019), \u0627\u0644\u062E\u064E\u0645\u0652\u0631\u0650: mudaf ilayhi (maf\u2018ul bihi meaning)' },
            { arabic: '\u0641\u064E\u0647\u0652\u0645\u064F \u0627\u0644\u0637\u064E\u0651\u0627\u0644\u0650\u0628\u0650 \u0627\u0644\u062F\u064E\u0651\u0631\u0652\u0633\u064E', translation: 'The student\u2019s understanding of the lesson', irab: '\u0627\u0644\u0637\u064E\u0651\u0627\u0644\u0650\u0628\u0650: mudaf ilayhi (fa\u2018il), \u0627\u0644\u062F\u064E\u0651\u0631\u0652\u0633\u064E: maf\u2018ul bihi' },
          ],
        },
        {
          arabic: '\u0627\u0650\u0633\u0652\u0645\u064F \u0627\u0644\u0641\u064E\u0627\u0639\u0650\u0644\u0650 \u064A\u064E\u0639\u0652\u0645\u064E\u0644\u064F \u0639\u064E\u0645\u064E\u0644\u064E \u0627\u0644\u0641\u0650\u0639\u0652\u0644\u0650 \u0627\u0644\u0645\u064F\u0636\u064E\u0627\u0631\u0650\u0639\u0650',
          english: 'The ism al-fa\u2018il (active participle) heads a verbal phrase like a present-tense verb. Without al, it can be khabar or hal. With al, it functions as an ism mawsul.',
          examples: [
            { arabic: '\u0643\u064F\u0644\u064F\u0651 \u0646\u064E\u0641\u0652\u0633\u064D \u0630\u064E\u0627\u0626\u0650\u0642\u064E\u0629\u064F \u0627\u0644\u0645\u064E\u0648\u0652\u062A\u0650', translation: 'Every soul is going to taste death', irab: '\u0630\u064E\u0627\u0626\u0650\u0642\u064E\u0629\u064F: ism al-fa\u2018il, \u0627\u0644\u0645\u064E\u0648\u0652\u062A\u0650: mudaf ilayhi (maf\u2018ul bihi meaning)' },
            { arabic: '\u0627\u0644\u0642\u064E\u0627\u0626\u0650\u0645\u064F \u0639\u0650\u0646\u0652\u062F\u064E \u0627\u0644\u0628\u064E\u0627\u0628\u0650 \u0647\u064F\u0648\u064E \u0635\u064E\u062F\u0650\u064A\u0642\u0650\u064A', translation: 'The one standing by the door is my friend', irab: '\u0627\u0644\u0642\u064E\u0627\u0626\u0650\u0645\u064F: ism al-fa\u2018il with al (= ism mawsul), mubtada\u2019' },
          ],
        },
        {
          arabic: '\u0627\u0650\u0633\u0652\u0645\u064F \u0627\u0644\u0645\u064E\u0641\u0652\u0639\u064F\u0648\u0644\u0650 \u0644\u064E\u0647\u064F \u0646\u064E\u0627\u0626\u0650\u0628\u064F \u0627\u0644\u0641\u064E\u0627\u0639\u0650\u0644\u0650',
          english: 'The ism al-maf\u2018ul (passive participle) takes a na\u2019ib al-fa\u2018il (deputy subject) instead of a fa\u2018il. When the na\u2019ib is indirect (ghayr sarih), the ism stays masculine singular.',
          examples: [
            { arabic: '\u0627\u0644\u062A\u064E\u0651\u0627\u0626\u0650\u0628\u064F \u0645\u064E\u0642\u0652\u0628\u064F\u0648\u0644\u064E\u0629\u064C \u062A\u064E\u0648\u0652\u0628\u064E\u062A\u064F\u0647\u064F', translation: 'The repentance of the repentant will be accepted', irab: '\u0645\u064E\u0642\u0652\u0628\u064F\u0648\u0644\u064E\u0629\u064C: ism al-maf\u2018ul, \u062A\u064E\u0648\u0652\u0628\u064E\u062A\u064F\u0647\u064F: na\u2019ib al-fa\u2018il' },
            { arabic: '\u0627\u0644\u063A\u0650\u064A\u0628\u064E\u0629\u064F \u0645\u064E\u0646\u0652\u0647\u0650\u064A\u0651\u064C \u0639\u064E\u0646\u0652\u0647\u064E\u0627', translation: 'Backbiting is prohibited', irab: '\u0645\u064E\u0646\u0652\u0647\u0650\u064A\u0651\u064C: stays masc. sing. because na\u2019ib is ghayr sarih (\u0639\u064E\u0646\u0652\u0647\u064E\u0627)' },
          ],
        },
        {
          arabic: '\u0627\u0650\u0633\u0652\u0645\u064F \u0627\u0644\u062A\u064E\u0651\u0641\u0652\u0636\u0650\u064A\u0644\u0650: \u0645\u0650\u0646\u0652 = \u062A\u064E\u0641\u0652\u0636\u0650\u064A\u0644\u060C \u0628\u0650\u062F\u064F\u0648\u0646\u0650 \u0645\u0650\u0646\u0652 = \u062A\u064E\u0641\u0652\u0636\u0650\u064A\u0644 \u0645\u064F\u0637\u0652\u0644\u064E\u0642',
          english: 'Ism al-tafdil with min = comparative (taller than). Without min = superlative (the tallest). Without al, it stays masculine singular regardless of what it describes.',
          examples: [
            { arabic: '\u0641\u064E\u0627\u0637\u0650\u0645\u064E\u0629\u064F \u0623\u064E\u0637\u0652\u0648\u064E\u0644\u064F \u0645\u0650\u0646\u0652 \u062E\u064E\u062F\u0650\u064A\u062C\u064E\u0629\u064E', translation: 'Fatima is taller than Khadeejah', irab: '\u0623\u064E\u0637\u0652\u0648\u064E\u0644\u064F: ism tafdil (comparative, with \u0645\u0650\u0646\u0652)' },
            { arabic: '\u0627\u0644\u0635\u064E\u0651\u0644\u064E\u0627\u0629\u064F \u0623\u064E\u0641\u0652\u0636\u064E\u0644\u064F \u0639\u064E\u0645\u064E\u0644\u064D', translation: 'Salah is the most virtuous deed', irab: '\u0623\u064E\u0641\u0652\u0636\u064E\u0644\u064F: ism tafdil (superlative, no \u0645\u0650\u0646\u0652), stays masc. sing.' },
          ],
        },
      ],
      examples: [
        { arabic: '\u0627\u0644\u062D\u064F\u062C\u064E\u0651\u0627\u062C\u064F \u0631\u064E\u0627\u062C\u0650\u0639\u064F\u0648\u0646\u064E \u0645\u0650\u0646\u0652 \u0639\u064E\u0631\u064E\u0641\u064E\u0629\u064E \u0627\u0644\u0622\u0646\u064E', translation: 'The pilgrims are returning from Arafah now', source: 'FSTU Arabic, Unit 5', irab: '\u0631\u064E\u0627\u062C\u0650\u0639\u064F\u0648\u0646\u064E: ism al-fa\u2018il verbal phrase as khabar' },
        { arabic: '\u062E\u064E\u0627\u0644\u0650\u062F\u064C \u0645\u064F\u0633\u064E\u0627\u0641\u0650\u0631\u064C \u0625\u0650\u0644\u064E\u0649 \u0645\u064E\u0643\u064E\u0651\u0629\u064E \u063A\u064E\u062F\u064B\u0627', translation: 'Khalid is travelling to Makkah tomorrow', source: 'FSTU Arabic, Unit 5', irab: '\u0645\u064F\u0633\u064E\u0627\u0641\u0650\u0631\u064C: ism fa\u2018il, \u0625\u0650\u0644\u064E\u0649 \u0645\u064E\u0643\u064E\u0651\u0629\u064E: maf\u2018ul fihi ghayr sarih, \u063A\u064E\u062F\u064B\u0627: maf\u2018ul fihi' },
        { arabic: '\u0627\u0644\u062D\u064F\u062C\u064E\u0651\u0627\u062C\u064F \u0645\u064E\u063A\u0652\u0641\u064F\u0648\u0631\u064C \u0644\u064E\u0647\u064F\u0645\u0652', translation: 'The pilgrims are forgiven', source: 'FSTU Arabic, Unit 5', irab: '\u0645\u064E\u063A\u0652\u0641\u064F\u0648\u0631\u064C: ism maf\u2018ul, \u0644\u064E\u0647\u064F\u0645\u0652: na\u2019ib al-fa\u2018il (shibh jumla)' },
        { arabic: '\u0647\u064F\u0645\u0652 \u0623\u064E\u0643\u0652\u062B\u064E\u0631\u064F \u0627\u0644\u0646\u064E\u0651\u0627\u0633\u0650 \u062D\u064E\u0627\u062C\u064E\u0629\u064B', translation: 'They are the neediest people', source: 'FSTU Arabic, Unit 5', irab: '\u0623\u064E\u0643\u0652\u062B\u064E\u0631\u064F: ism tafdil, \u0627\u0644\u0646\u064E\u0651\u0627\u0633\u0650: mudaf ilayhi, \u062D\u064E\u0627\u062C\u064E\u0629\u064B: tamyiz' },
        { arabic: '\u064A\u064E\u062A\u064E\u0642\u064E\u0628\u064E\u0651\u0644\u064F \u0627\u0644\u0644\u0647\u064F \u0635\u064E\u0627\u0644\u0650\u062D\u064E \u0627\u0644\u0623\u064E\u0639\u0652\u0645\u064E\u0627\u0644\u0650', translation: 'Allah accepts good deeds', source: 'FSTU Arabic, Unit 5', irab: '\u0635\u064E\u0627\u0644\u0650\u062D\u064E: sifa mushabbaha as na\u2018t (mudaf), \u0627\u0644\u0623\u064E\u0639\u0652\u0645\u064E\u0627\u0644\u0650: man\u2018ut (mudaf ilayhi)' },
      ],
      tables: [
        {
          title: 'Five Types of Verbal Phrases',
          titleAr: '\u0623\u064E\u0646\u0652\u0648\u064E\u0627\u0639\u064F \u0627\u0644\u062C\u064F\u0645\u064E\u0644\u0650 \u0627\u0644\u0641\u0650\u0639\u0652\u0644\u0650\u064A\u064E\u0651\u0629\u0650',
          headers: ['Type', 'Essential Slots', 'Key Feature'],
          rows: [
            ['Masdar phrase', 'Masdar + (mudaf ilayhi)', 'Mudaf ilayhi = fa\u2018il, maf\u2018ul bihi, or maf\u2018ul fihi'],
            ['Ism al-fa\u2018il phrase', 'Ism fa\u2018il + fa\u2018il', 'Acts like a present-tense verb; with al = ism mawsul'],
            ['Sifa mushabbaha phrase', 'Sifa mushabbaha + fa\u2018il', 'Describes lasting qualities; fa\u2018il often as mudaf ilayhi'],
            ['Ism al-maf\u2018ul phrase', 'Ism maf\u2018ul + na\u2019ib fa\u2018il', 'Passive meaning; stays masc. sing. if na\u2019ib is indirect'],
            ['Ism al-tafdil phrase', 'Ism tafdil + (hidden fa\u2018il)', 'With min = comparative; without min = superlative'],
          ],
        },
        {
          title: 'Ism al-Tafdil Conjugation',
          titleAr: '\u062A\u064E\u0635\u0652\u0631\u0650\u064A\u0641\u064F \u0627\u0650\u0633\u0652\u0645\u0650 \u0627\u0644\u062A\u064E\u0651\u0641\u0652\u0636\u0650\u064A\u0644\u0650',
          headers: ['', 'Singular', 'Dual', 'Plural'],
          rows: [
            ['Masculine', '\u0623\u064E\u0643\u0652\u0628\u064E\u0631\u064F', '\u0623\u064E\u0643\u0652\u0628\u064E\u0631\u064E\u0627\u0646\u0650', '\u0623\u064E\u0643\u0652\u0628\u064E\u0631\u064F\u0648\u0646\u064E / \u0623\u064E\u0643\u064E\u0627\u0628\u0650\u0631\u064F'],
            ['Feminine', '\u0643\u064F\u0628\u0652\u0631\u064E\u0649', '\u0643\u064F\u0628\u0652\u0631\u064E\u064A\u064E\u0627\u0646\u0650', '\u0643\u064F\u0628\u0652\u0631\u064E\u064A\u064E\u0627\u062A\u064C / \u0643\u064F\u0628\u064E\u0631\u064C'],
          ],
        },
      ],
      sourceRef: 'FSTU Arabic, Unit 5, pp 497-560',
    },
  ],
  relatedTopicIds: ['jumla-sughra', 'ism-mawsul', 'harf-mawsul', 'masdar', 'ism-fail', 'ism-maf\'ul'],
  tags: ['verbal phrases', 'masdar', 'ism fa\'il', 'active participle', 'sifa mushabbaha', 'ism maf\'ul', 'passive participle', 'ism tafdil', 'comparative', 'superlative', 'tamyiz', 'na\'ib fa\'il'],
};
