import type { NahwTopic } from '../types';

export const amrNahy: NahwTopic = {
  id: 'amr-nahy',
  titleAr: 'جواب الأمر والنهي',
  titleEn: 'Command & Prohibition Results',
  transliteration: 'Jawab al-Amr wa an-Nahy',
  categoryId: 'joining-sentences',
  subcategoryId: 'command-reason-clarification',
  levels: [
    {
      difficulty: 'beginner',
      summary: 'A command (amr) or prohibition (nahy) sentence may be followed by a result sentence. In jawab al-amr, the result verb is majzum. In jawab al-nahy without fa, the verb is majzum (result of obeying). With fa, the verb is mansub (result of disobeying), and the fa is called fa\' al-sababiyya.',
      body: `## Sentences after Command and Prohibition (جَوَابُ الأَمْرِ وَالنَّهْيِ)

### جَوَابُ الأَمْرِ (Result of a Command)

A sentence with a فِعْل أَمْرٍ (command verb) is sometimes followed by another sentence showing the result of adhering to the command. This second sentence is called **جَوَابُ الأَمْرِ**.

**Key rule:** The verb of the jawab is a فِعْل مُضَارِع in the **مَجْزُوم** state.

In translation, the two sentences are separated by a comma or joined with "and."

### جَوَابُ النَّهْيِ (Result of a Prohibition)

**جَوَابُ النَّهْيِ** occurs in two ways:

#### 1. Without فَ — Result of Obeying the Prohibition

Without فَ, the jawab shows the result of **adhering to** (obeying) the prohibition. The verb is **مَجْزُوم**.

#### 2. With فَ — Result of Disobeying the Prohibition

With **فَ**, the jawab shows the result of **not adhering to** (disobeying) the prohibition. The verb is **مَنْصُوب**. This فَ is called **فَاءُ السَّبَبِ** (the fa of causation).

This can be translated as "lest," "otherwise," or "or."`,
      rules: [
        {
          arabic: 'فِعْل جَوَابِ الأَمْرِ يكون مَجْزُومًا',
          english: 'The verb in jawab al-amr (result of a command) is a mudari\' in the majzum state.',
          examples: [
            { arabic: 'اُعْبُدِ اللهَ تَدْخُلِ الجَنَّةَ', translation: 'Worship Allah, you will enter Jannah', irab: 'اُعْبُدِ: fi\'l amr — تَدْخُلِ: fi\'l mudari\' majzum (jawab al-amr)' },
            { arabic: 'اِجْتَهِدْ تَنْجَحْ', translation: 'Work hard and you will be successful', irab: 'اِجْتَهِدْ: fi\'l amr — تَنْجَحْ: fi\'l mudari\' majzum (jawab al-amr)' },
          ],
        },
        {
          arabic: 'جَوَابُ النَّهْيِ بدون فَ: مَجْزُوم — نتيجة الطاعة',
          english: 'Jawab al-nahy without fa: the verb is majzum, showing the result of obeying the prohibition.',
          examples: [
            { arabic: 'لَا تَكْفُرْ تَدْخُلِ الجَنَّةَ', translation: 'Do not disbelieve and you will enter Jannah', irab: 'لَا تَكْفُرْ: nahy — تَدْخُلِ: fi\'l mudari\' majzum (jawab al-nahy — result of obeying)' },
            { arabic: 'لَا تَكْسَلْ تَنْجَحْ', translation: 'Do not be lazy and you will be successful', irab: 'لَا تَكْسَلْ: nahy — تَنْجَحْ: majzum (jawab al-nahy — result of obeying)' },
          ],
        },
        {
          arabic: 'جَوَابُ النَّهْيِ مع فَ: مَنْصُوب — نتيجة المعصية',
          english: 'Jawab al-nahy with fa: the verb is mansub after fa\' al-sababiyya, showing the result of disobeying the prohibition. Translated as "lest," "otherwise," or "or."',
          examples: [
            { arabic: 'لَا تَكْسَلْ فَتَنْدَمَ', translation: 'Do not be lazy, lest you regret it', irab: 'فَ: fa\' al-sababiyya — تَنْدَمَ: fi\'l mudari\' mansub (jawab al-nahy — result of disobeying)' },
          ],
        },
      ],
      tables: [
        {
          title: 'Summary: Jawab al-Amr and Jawab al-Nahy',
          titleAr: 'ملخص: جواب الأمر والنهي',
          headers: ['Main Sentence', 'Meaning of Result', 'I\'rab of Verb', 'Example'],
          rows: [
            ['Command (الأَمْر)', 'Result of obeying', 'Majzum', 'اِجْتَهِدْ تَنْجَحْ'],
            ['Prohibition (النَّهْي, no فَ)', 'Result of obeying', 'Majzum', 'لَا تَكْسَلْ تَنْجَحْ'],
            ['Prohibition (النَّهْي, with فَ)', 'Result of disobeying', 'فَ + Mansub', 'لَا تَكْسَلْ فَتَنْدَمَ'],
          ],
        },
      ],
      sourceRef: 'FSTU Arabic, Unit 6, pp 561-602',
    },
  ],
  relatedTopicIds: ['shart', 'nida', 'jumla-ta-liliyya', 'jazm-particles', 'nasb-particles'],
  tags: ['amr', 'nahy', 'command', 'prohibition', 'jawab', 'result', 'fa al-sababiyya', 'majzum', 'mansub'],
};

export const jumlaTaliliyya: NahwTopic = {
  id: 'jumla-ta-liliyya',
  titleAr: 'الجملة التعليلية',
  titleEn: 'Reason/Explanation Sentence',
  transliteration: 'al-Jumla at-Ta\'liliyya',
  categoryId: 'joining-sentences',
  subcategoryId: 'command-reason-clarification',
  levels: [
    {
      difficulty: 'beginner',
      summary: 'A jumla ta\'liliyya is an independent sentence that shows the cause or reason of the previous sentence, like a maf\'ul lahu. It comes in three types: without additions, with لَعَلَّ (so that / perhaps), or with فَ (fa\' musabbaba — the fa of causation). It is translated with "for," "because," "so that," or "perhaps."',
      body: `## Reason/Explanation Sentences (الجملة التعليلية)

Sometimes, an independent sentence may show the **cause or reason** of the previous sentence, like a مَفْعُول لَهُ. This is called **جُمْلَة تَعْلِيلِيَّة**.

It is translated by adding **for**, **because**, **so that**, or **perhaps** between the two sentences.

### Three Types

#### Type 1: Without Additions

The causal sentence occurs without any connecting particles. The second sentence simply provides the reason for the first.

> **أَحْسِنُوا إِنَّ اللهَ يُحِبُّ المُحْسِنِينَ**
> *Do good, for verily Allah loves those who do good.*

#### Type 2: With لَعَلَّ

The causal sentence occurs with **لَعَلَّ** (حَرْفٌ مُشَبَّهٌ بِالْفِعْلِ), giving the meaning of **so that** or **perhaps**.

> **﴿اتَّقُوا اللهَ لَعَلَّكُمْ تُفْلِحُونَ﴾**
> *Fear Allah so that you may be successful.*

لَعَلَّ takes an اسْم (mansub) and a خَبَر, just like إِنَّ.

#### Type 3: With فَ (فَاءُ مُسَبَّبَة)

The causal sentence occurs after **فَ** of حَرْفُ عَطْفٍ, known as **فَاءُ مُسَبَّبَة** (the fa of causation).

The reason can come **after** the action:
> **اُعْبُدُوا اللهَ فَإِنَّهُ خَلَقَكَ** — *Worship Allah because He created you.*

Or the reason can come **before** the action:
> **﴿اللهُ رَبِّي وَرَبُّكُمْ فَاعْبُدُوهُ﴾** — *Allah is my Lord and your Lord, so worship Him.*`,
      rules: [
        {
          arabic: 'الجملة التعليلية بدون إضافات',
          english: 'Type 1: The causal sentence occurs without any connecting particles. The second sentence provides the reason for the first, translated with "for" or "because."',
          examples: [
            { arabic: 'أَحْسِنُوا إِنَّ اللهَ يُحِبُّ المُحْسِنِينَ', translation: 'Do good, for verily Allah loves those who do good', irab: 'إِنَّ اللهَ يُحِبُّ المُحْسِنِينَ: jumla ta\'liliyya (reason for the command)' },
          ],
        },
        {
          arabic: 'الجملة التعليلية مع لَعَلَّ',
          english: 'Type 2: With لَعَلَّ (a harf mushabba bi-l-fi\'l), meaning "so that" or "perhaps." It takes an ism (mansub) and a khabar.',
          examples: [
            { arabic: 'اتَّقُوا اللهَ لَعَلَّكُمْ تُفْلِحُونَ', translation: 'Fear Allah so that you may be successful', source: 'Al-Baqarah 2:189', irab: 'لَعَلَّ: harf mushabba bi-l-fi\'l — كُمْ: ism la\'alla — تُفْلِحُونَ: khabar la\'alla' },
          ],
        },
        {
          arabic: 'الجملة التعليلية مع فَاءُ مُسَبَّبَة',
          english: 'Type 3: With فَ (fa\' musabbaba — the fa of causation, a harf \'atf). The reason can come after or before the action.',
          examples: [
            { arabic: 'اُعْبُدُوا اللهَ فَإِنَّهُ خَلَقَكَ', translation: 'Worship Allah because He created you', irab: 'فَ: fa\' musabbaba — action first, then reason' },
            { arabic: 'اللهُ رَبِّي وَرَبُّكُمْ فَاعْبُدُوهُ', translation: 'Allah is my Lord and your Lord, so worship Him', source: 'Maryam 19:36', irab: 'فَ: fa\' musabbaba — reason first, then action' },
          ],
        },
      ],
      tables: [
        {
          title: 'Types of Jumla Ta\'liliyya',
          titleAr: 'أنواع الجملة التعليلية',
          headers: ['Type', 'Order', 'Example'],
          rows: [
            ['Without additions', 'Action \u2013 Reason', 'أَحْسِنُوا إِنَّ اللهَ يُحِبُّ المُحْسِنِينَ'],
            ['With لَعَلَّ', 'Action \u2013 Reason', 'اتَّقُوا اللهَ لَعَلَّكُمْ تُفْلِحُونَ'],
            ['With فَ (reason after)', 'Action \u2013 Reason', 'اُعْبُدُوا اللهَ فَإِنَّهُ خَلَقَكَ'],
            ['With فَ (reason before)', 'Reason \u2013 Action', 'اللهُ رَبِّي وَرَبُّكُمْ فَاعْبُدُوهُ'],
          ],
        },
      ],
      sourceRef: 'FSTU Arabic, Unit 6, pp 561-602',
    },
  ],
  relatedTopicIds: ['amr-nahy', 'maf-ul-lahu', 'jumla-istidrakiyya', 'inna-and-sisters'],
  tags: ['ta\'lil', 'reason', 'explanation', 'causal', 'la\'alla', 'fa musabbaba', 'because', 'so that'],
};

export const jumlaIstidrakiyya: NahwTopic = {
  id: 'jumla-istidrakiyya',
  titleAr: 'الجملة الاستدراكية',
  titleEn: 'Rectification/Correction Sentence',
  transliteration: 'al-Jumla al-Istidrakiyya',
  categoryId: 'joining-sentences',
  subcategoryId: 'command-reason-clarification',
  levels: [
    {
      difficulty: 'beginner',
      summary: 'A jumla istidrakiyya is an independent sentence that removes a presumption arising from the previous sentence. It uses لكِنَّ (heavy nun, a harf mushabba bi-l-fi\'l that takes ism and khabar) or لكِنْ (light nun, a harf \'atf / conjunction particle). Both are translated as "but" or "however."',
      body: `## Rectification/Correction Sentences (الجملة الاستدراكية)

Sometimes, an independent sentence may be used to **remove a presumption** arising from the previous sentence. This is called **جُمْلَة اسْتِدْرَاكِيَّة**.

It is translated by adding **but** or **however** before it.

### Two Types

#### 1. لكِنَّ (Heavy Nun — حَرْفٌ مُشَبَّهٌ بِالْفِعْلِ)

**لكِنَّ** is a حَرْفٌ مُشَبَّهٌ بِالْفِعْلِ — a particle that resembles a verb. It takes an اسْم (in نَصْب) and a خَبَر, just like إِنَّ.

> **صَامَتْ زَيْنَبُ لكِنَّ فَاطِمَةَ مَا صَامَتْ**
> *Zainab fasted, but Fatima did not fast.*

**لكِنَّ** can be preceded by **وَ** (conjunction):
> **صَامَتْ زَيْنَبُ وَلكِنَّ فَاطِمَةَ مَا صَامَتْ**

#### 2. لكِنْ (Light Nun — حَرْفُ عَطْفٍ)

**لكِنْ** (with sukun on the nun) is a **حَرْفُ عَطْفٍ** — a conjunction particle. Unlike لكِنَّ, it does not govern case endings on what follows.

> **صَامَتْ زَيْنَبُ لكِنْ مَا صَامَتْ فَاطِمَةُ**
> *Zainab fasted, but Fatima did not fast.*

**لكِنْ** can also be preceded by **وَ**:
> **صَامَتْ زَيْنَبُ وَلكِنْ مَا صَامَتْ فَاطِمَةُ**`,
      rules: [
        {
          arabic: 'لكِنَّ حَرْفٌ مُشَبَّهٌ بِالْفِعْلِ تنصب الاسْمَ وترفع الخَبَرَ',
          english: 'لكِنَّ (heavy nun) is a harf mushabba bi-l-fi\'l — it puts its ism in nasb (accusative) and its khabar in raf\' (nominative), just like إِنَّ.',
          examples: [
            { arabic: 'صَامَتْ زَيْنَبُ لكِنَّ فَاطِمَةَ مَا صَامَتْ', translation: 'Zainab fasted, but Fatima did not fast', irab: 'لكِنَّ: harf mushabba bi-l-fi\'l — فَاطِمَةَ: ism lakinna (mansub) — مَا صَامَتْ: khabar lakinna' },
            { arabic: 'صَامَتْ زَيْنَبُ وَلكِنَّ فَاطِمَةَ مَا صَامَتْ', translation: 'Zainab fasted, but Fatima did not fast', irab: 'وَ: harf \'atf — لكِنَّ: harf mushabba bi-l-fi\'l' },
          ],
        },
        {
          arabic: 'لكِنْ حَرْفُ عَطْفٍ لا يعمل',
          english: 'لكِنْ (light nun) is a conjunction particle (harf \'atf). It does not govern case endings on what follows it.',
          examples: [
            { arabic: 'صَامَتْ زَيْنَبُ لكِنْ مَا صَامَتْ فَاطِمَةُ', translation: 'Zainab fasted, but Fatima did not fast', irab: 'لكِنْ: harf \'atf — فَاطِمَةُ: fa\'il marfu\' (not affected by لكِنْ)' },
            { arabic: 'صَامَتْ زَيْنَبُ وَلكِنْ مَا صَامَتْ فَاطِمَةُ', translation: 'Zainab fasted, but Fatima did not fast', irab: 'وَ + لكِنْ: both are harf \'atf' },
          ],
        },
      ],
      tables: [
        {
          title: 'Comparing لكِنَّ and لكِنْ',
          titleAr: 'الفرق بين لكِنَّ ولكِنْ',
          headers: ['Particle', 'Type', 'Governs Case?', 'Note'],
          rows: [
            ['لكِنَّ / وَلكِنَّ', 'Harf mushabba bi-l-fi\'l', 'Yes \u2014 takes ism (mansub) and khabar', 'Like إِنَّ in structure'],
            ['لكِنْ / وَلكِنْ', 'Harf \'atf (conjunction)', 'No \u2014 simple conjunction', 'Does not affect case endings'],
          ],
        },
      ],
      sourceRef: 'FSTU Arabic, Unit 6, pp 561-602',
    },
  ],
  relatedTopicIds: ['jumla-ta-liliyya', 'amr-nahy', 'inna-and-sisters', 'atf'],
  tags: ['istidrak', 'rectification', 'correction', 'lakinna', 'lakin', 'but', 'however', 'adversative'],
};
