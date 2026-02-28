import type { NahwTopic } from '../types';

export const naibAlFail: NahwTopic = {
  id: 'naib-al-fail',
  titleAr: 'نائب الفاعل',
  titleEn: 'Deputy Subject (Na\'ib al-Fa\'il)',
  transliteration: 'Naa\'ib al-Faa\'il',
  categoryId: 'governed',
  subcategoryId: 'nominative',
  levels: [
    {
      difficulty: 'beginner',
      summary: 'The na\'ib al-fa\'il (deputy subject) replaces the fa\'il when the verb is in the passive voice. The verb changes form and the original object takes the fa\'il\'s position, becoming marfu\' (nominative).',
      body: `## The Deputy Subject (نائب الفاعل)

When the fa'il is removed (passive voice), the object steps up as the **na'ib al-fa'il** (deputy subject).

### How It Works

- **Active:** كَتَبَ الطَّالِبُ الدَّرْسَ (The student wrote the lesson)
- **Passive:** كُتِبَ الدَّرْسُ (The lesson was written)

### Key Points

- The na'ib al-fa'il is **always marfu'** (nominative)
- The verb agrees with it in **gender and number**
- The verb changes to the passive form (المبني للمجهول)`,
      rules: [
        {
          arabic: 'نائب الفاعل مرفوع',
          english: 'The deputy subject takes the nominative case, just like the original fa\'il would.',
          examples: [
            { arabic: 'رُحِمَ التَّائِبُ', translation: 'The repentant was shown mercy', irab: 'التَّائِبُ: na\'ib al-fa\'il marfu\' with damma' },
            { arabic: 'قُرِئَ القُرْآنُ', translation: 'The Quran was recited', irab: 'القُرْآنُ: na\'ib al-fa\'il marfu\'' },
          ],
        },
        {
          arabic: 'الفعل يُبنى للمجهول عند حذف الفاعل',
          english: 'The verb changes to passive form when the fa\'il is deleted, and the original object becomes the deputy subject.',
          examples: [
            { arabic: 'Active: كَتَبَ الطَّالِبُ الدَّرْسَ → Passive: كُتِبَ الدَّرْسُ', translation: 'The student wrote the lesson → The lesson was written' },
          ],
        },
      ],
      tables: [
        {
          title: 'Passive Voice Formation',
          titleAr: 'بناء الفعل للمجهول',
          headers: ['Verb Type', 'Active', 'Passive', 'Pattern'],
          rows: [
            ['Past (3-letter)', 'كَتَبَ', 'كُتِبَ', 'ضُمّ أوّله وكُسر ما قبل آخره'],
            ['Present (3-letter)', 'يَكْتُبُ', 'يُكْتَبُ', 'ضُمّ أوّله وفُتح ما قبل آخره'],
            ['Past (4-letter)', 'أَكْرَمَ', 'أُكْرِمَ', 'ضُمّ أوّله وكُسر ما قبل آخره'],
            ['Present (4-letter)', 'يُكْرِمُ', 'يُكْرَمُ', 'ضُمّ أوّله وفُتح ما قبل آخره'],
          ],
        },
      ],
      sourceRef: 'As-Sughra, Section 2, Chapter 1',
    },
    {
      difficulty: 'intermediate',
      summary: 'When there is no direct object, other elements can become na\'ib al-fa\'il: a jar-majrur (prepositional phrase), a dharf (adverb), or even a masdar. The passive verb form differs between past tense (ضُمّ أوّله وكُسر ما قبل آخره) and present tense (ضُمّ أوّله وفُتح ما قبل آخره).',
      body: `## What Can Become Na'ib al-Fa'il?

### Priority Order

1. **Direct object** → na'ib al-fa'il (most common): كُتِبَ الدَّرْسُ
2. **Jar-majrur** → na'ib al-fa'il: نُظِرَ فِي الأَمْرِ (فِي الأَمْرِ is in place of na'ib al-fa'il)
3. **Dharf** → na'ib al-fa'il: صِيمَ رَمَضَانُ (رَمَضَانُ was dharf, now na'ib al-fa'il)
4. **Masdar** → na'ib al-fa'il: سِيرَ سَيْرٌ طَوِيلٌ

The priority is: direct object > jar-majrur > dharf > masdar

### Passive Voice Patterns

- **Past tense:** ضُمّ أوّله وكُسر ما قبل آخره (first letter gets damma, letter before last gets kasra)
- **Present tense:** ضُمّ أوّله وفُتح ما قبل آخره (first letter gets damma, letter before last gets fatha)`,
      rules: [
        {
          arabic: 'قد ينوب عن الفاعل الجار والمجرور أو الظرف',
          english: 'When there is no direct object, a prepositional phrase or adverb can serve as na\'ib al-fa\'il.',
          examples: [
            { arabic: 'نُظِرَ فِي الأَمْرِ', translation: 'The matter was looked into', irab: 'فِي الأَمْرِ: jar-majrur in place of na\'ib al-fa\'il' },
            { arabic: 'صِيمَ رَمَضَانُ', translation: 'Ramadan was fasted', irab: 'رَمَضَانُ: na\'ib al-fa\'il (originally dharf)' },
          ],
        },
        {
          arabic: 'الماضي المبني للمجهول: ضُمّ أوّله وكُسر ما قبل آخره',
          english: 'Passive past tense: first letter gets damma, letter before last gets kasra. Passive present: first letter gets damma, letter before last gets fatha.',
          examples: [
            { arabic: 'عُلِمَ / يُعْلَمُ', translation: 'was known / is known', irab: 'Past: ضُمّ الأول (عُ) وكُسر ما قبل الآخر (لِ). Present: ضُمّ الأول (يُ) وفُتح ما قبل الآخر (لَ)' },
          ],
        },
      ],
      sourceRef: 'Al-Wusta, Part 4',
    },
    {
      difficulty: 'advanced',
      summary: 'When a verb has multiple objects (like verbs of the heart), scholars differ on which object becomes na\'ib al-fa\'il. Also examined: the reasons for deleting the fa\'il (unknown, obvious, fear, or rhetorical elevation of the object), and scholarly positions on intransitive verbs in passive.',
      body: `## Advanced Na'ib al-Fa'il Topics

### 1. Multiple Objects

When a verb takes two objects (like verbs of the heart), the **first object** becomes na'ib al-fa'il according to the majority:

ظُنَّ الامْتِحَانُ سَهْلًا — the first object (الامْتِحَانُ) becomes na'ib al-fa'il

Some scholars allow the second object to take this role: ظُنَّ سَهْلًا الامْتِحَانُ (rare).

### 2. Reasons for Deleting the Fa'il

The fa'il is removed for specific purposes:

a. **Unknown** (الجهل به): سُرِقَ المَتَاعُ — the goods were stolen (thief unknown)

b. **Known/obvious** (العلم به): خُلِقَ الإِنْسَانُ مِنْ عَجَلٍ — Man was created from haste (Allah is the known creator)

c. **Fear** (الخوف): ضُرِبَ زَيْدٌ — Zayd was hit (speaker fears naming who did it)

d. **Rhetorical focus on object** (تعظيم المفعول): أُنْزِلَ القُرْآنُ — the Quran was sent down (focus on the Quran)

### 3. Intransitive Verbs in Passive

Intransitive verbs can only be made passive with a cognate object or dharf:
- سِيرَ بِهِ (he was traveled with)
- جُلِسَ أَمَامَهُ (it was sat in front of him)`,
      rules: [
        {
          arabic: 'إذا تعدّد المفعول نابَ الأول عند الجمهور',
          english: 'When a verb has multiple objects, the first object becomes na\'ib al-fa\'il according to the majority of scholars.',
          examples: [
            { arabic: 'ظُنَّ الامْتِحَانُ سَهْلًا', translation: 'The exam was thought to be easy', irab: 'الامْتِحَانُ: na\'ib al-fa\'il (first object) — سَهْلًا: second object remains mansub' },
          ],
        },
        {
          arabic: 'يُحذف الفاعل لأسباب منها: الجهل به أو الخوف منه أو عليه',
          english: 'The fa\'il is deleted for reasons including: ignorance, fear, obviousness, or to rhetorically foreground the object.',
          examples: [
            { arabic: 'خُلِقَ الإِنْسَانُ مِنْ عَجَلٍ', translation: 'Man was created from haste', source: 'Al-Anbiya 21:37', irab: 'الإِنْسَانُ: na\'ib al-fa\'il — fa\'il (Allah) is known/obvious' },
          ],
        },
      ],
      sourceRef: 'An-Nahw al-Kubra, Part 7',
    },
  ],
  relatedTopicIds: ['fail', 'maf-ul-bih', 'verbal-sentence', 'transitive-intransitive'],
  tags: ['na\'ib', 'fa\'il', 'deputy', 'passive', 'marfu', 'nominative', 'majhul'],
};
