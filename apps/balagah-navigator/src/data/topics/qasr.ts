import type { BalagahTopic } from '../types';

export const qasr: BalagahTopic = {
  id: 'qasr',
  titleAr: 'القَصْرُ',
  titleEn: 'Restriction',
  transliteration: 'al-Qasr',
  unitId: 'maani',
  partId: 'maani-qasr',
  content: {
    summary:
      'Restriction (qasr) limits the connection between subject and predicate. It has three elements (maqsur, maqsur alayh, adat qasr), two relationship types (sifah ala mawsuf / mawsuf ala sifah), two scope types (haqiqi / idafi), and four methods of creation (illa, innama, bal/lakin, taqdim).',
    body: `## Restriction (القَصْرُ)

The link between the مُسْنَدٌ (predicate) and مُسْنَدٌ إِلَيْهِ (subject) can be restricted. This is called قَصْرٌ.

For example, "Ahmad is happy" informs us of the link. But "**Only** Ahmad is happy" restricts that quality of being happy to Ahmad alone.

### Parts of a قَصْرٌ

A قَصْرٌ comprises three elements:

1. **مَقْصُوْرٌ** — The item or quality being restricted (e.g., happiness)
2. **مَقْصُوْرٌ عَلَيْهِ** — The item it is restricted to (e.g., Ahmad)
3. **أَدَاةُ قَصْرٍ** — The word used to create the restriction (e.g., only)

### Two Relationship Types

#### قَصْرُ الصِّفَةِ عَلَى الْمَوْصُوْفِ — Restricting a Quality to a Being

<div dir="rtl" class="font-arabic">﴿لَآ إِلٰهَ إِلَّا هُوَ﴾</div>

*There is **no** god **but** Allah.* — The quality of being a god is restricted to a single being, Allah.

#### قَصْرُ الْمَوْصُوْفِ عَلَى الصِّفَةِ — Restricting a Being to a Quality

<div dir="rtl" class="font-arabic">﴿وَمَا مُحَمَّدٌ إِلَّا رَسُوْلٌ﴾</div>

***Muhammad** is **but** a messenger.* — A person (Muhammad, peace be upon him) is restricted to one quality.

### Two Scope Types

#### قَصْرٌ حَقِيْقِيٌّ — Absolute Restriction

An absolute restriction — truly exclusive with no exceptions.

<div dir="rtl" class="font-arabic">﴿لَآ إِلٰهَ إِلَّا هُوَ﴾</div>

*There is no god but Allah.* — The restriction is absolute: there is truly no god other than Allah.

#### قَصْرٌ إِضَافِيٌّ — Relative Restriction

A relative restriction — exclusive in comparison to something else, not absolutely.

<div dir="rtl" class="font-arabic">﴿وَمَا مُحَمَّدٌ إِلَّا رَسُوْلٌ﴾</div>

*Muhammad is but a messenger.* — The restriction is relative: he is only a prophet, not an eternal being. (He has other qualities too.)

**Note:** قَصْرُ الْمَوْصُوْفِ عَلَى الصِّفَةِ will always be إِضَافِي because no being can have only one quality.

### Four Ways of Creating قَصْرٌ

#### 1. إِلَّا — Negation + Exception

<div dir="rtl" class="font-arabic">﴿وَمَا مُحَمَّدٌ إِلَّا رَسُوْلٌ﴾</div>

*Muhammad is **but** a messenger.* — Negation (مَا) followed by the exception particle إِلَّا.

#### 2. إِنَّمَا — The Restriction Particle

<div dir="rtl" class="font-arabic">﴿قَالُوْا إِنَّمَا نَحْنُ مُصْلِحُوْنَ﴾</div>

*We are **but** reformers.* — إِنَّمَا precedes the whole sentence to create restriction.

#### 3. بَلْ / لٰكِنْ — Corrective Particles

<div dir="rtl" class="font-arabic">﴿وَقَالُوْا قُلُوْبُنَا غُلْفٌ بَلْ لَعَنَهُمُ اللهُ بِكُفْرِهِمْ﴾</div>

*They said: "Our hearts are sealed" — **rather**, Allah has set a seal over them because of their disbelief.* — بَلْ corrects the previous statement.

<div dir="rtl" class="font-arabic">﴿وَمَا قَتَلُوْهُ وَمَا صَلَبُوْهُ وَلٰكِنْ شُبِّهَ لَهُمْ﴾</div>

*They did not kill him, nor crucify him, **but** they were deluded by resemblance.* — لٰكِنْ corrects the misconception.

#### 4. تَقْدِيْمٌ — Fronting

<div dir="rtl" class="font-arabic">﴿إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِيْنُ﴾</div>

***You alone** do we worship, and **from You alone** do we seek help.* — Fronting إِيَّاكَ (the object) before the verb creates restriction.`,
    rules: [
      {
        arabic: 'القَصْرُ بِإِلَّا',
        english:
          'Restriction with illa: negation + illa + the item restricted to.',
        examples: [
          {
            arabic: '﴿لَآ إِلٰهَ إِلَّا هُوَ﴾',
            translation: 'There is no god but Allah.',
            source: 'Quran 2:255',
            analysis:
              'قَصْرُ الصِّفَةِ عَلَى الْمَوْصُوْفِ — the quality of godhood is restricted to Allah. قَصْرٌ حَقِيْقِيٌّ.',
          },
          {
            arabic: '﴿وَمَا مُحَمَّدٌ إِلَّا رَسُوْلٌ﴾',
            translation: 'Muhammad is but a messenger.',
            source: 'Quran 3:144',
            analysis:
              'قَصْرُ الْمَوْصُوْفِ عَلَى الصِّفَةِ — Muhammad is restricted to the quality of being a messenger. قَصْرٌ إِضَافِيٌّ.',
          },
        ],
      },
      {
        arabic: 'القَصْرُ بِإِنَّمَا',
        english:
          'Restriction with innama: it precedes the whole sentence.',
        examples: [
          {
            arabic: '﴿قَالُوْا إِنَّمَا نَحْنُ مُصْلِحُوْنَ﴾',
            translation: 'We are but reformers.',
            source: 'Quran 2:11',
            analysis:
              'إِنَّمَا restricts them to being reformers (their false claim).',
          },
        ],
      },
      {
        arabic: 'القَصْرُ بِبَلْ وَلٰكِنْ',
        english:
          'Restriction with bal/lakin: corrective particles that redirect meaning.',
        examples: [
          {
            arabic:
              '﴿وَقَالُوْا قُلُوْبُنَا غُلْفٌ بَلْ لَعَنَهُمُ اللهُ بِكُفْرِهِمْ﴾',
            translation:
              'They said: "Our hearts are sealed" — rather, Allah has cursed them for their disbelief.',
            source: 'Quran 2:88',
            analysis:
              'بَلْ corrects their claim, restricting the reality to Allah\'s curse.',
          },
          {
            arabic:
              '﴿وَمَا قَتَلُوْهُ وَمَا صَلَبُوْهُ وَلٰكِنْ شُبِّهَ لَهُمْ﴾',
            translation:
              'They did not kill him, nor crucify him, but they were deluded by resemblance.',
            source: 'Quran 4:157',
            analysis:
              'لٰكِنْ corrects the false claim about Isa (peace be upon him).',
          },
        ],
      },
      {
        arabic: 'القَصْرُ بِالتَّقْدِيمِ',
        english:
          'Restriction with fronting: moving a word forward for emphasis creates restriction.',
        examples: [
          {
            arabic: '﴿إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِيْنُ﴾',
            translation:
              'You alone do we worship, and from You alone do we seek help.',
            source: 'Quran 1:5',
            analysis:
              'إِيَّاكَ (the object) is fronted before the verb, restricting worship and help-seeking to Allah alone.',
          },
        ],
      },
    ],
    examples: [
      {
        arabic: '﴿لَآ إِلٰهَ إِلَّا هُوَ﴾',
        translation: 'There is no god but Allah.',
        source: 'Quran 2:255',
        analysis:
          'قَصْرُ الصِّفَةِ عَلَى الْمَوْصُوْفِ with إِلَّا. Absolute restriction (حَقِيقِي).',
      },
      {
        arabic: '﴿وَمَا مُحَمَّدٌ إِلَّا رَسُوْلٌ﴾',
        translation: 'Muhammad is but a messenger.',
        source: 'Quran 3:144',
        analysis:
          'قَصْرُ الْمَوْصُوْفِ عَلَى الصِّفَةِ with إِلَّا. Relative restriction (إِضَافِي).',
      },
      {
        arabic: '﴿إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِيْنُ﴾',
        translation: 'You alone do we worship, and from You alone do we seek help.',
        source: 'Quran 1:5',
        analysis: 'Restriction through تَقْدِيمٌ (fronting).',
      },
    ],
    tables: [
      {
        title: 'Parts of Qasr',
        titleAr: 'أَرْكَانُ القَصْرِ',
        headers: ['Element', 'Arabic', 'Role'],
        rows: [
          ['Restricted item', 'مَقْصُوْرٌ', 'The item or quality being restricted'],
          [
            'Restricted to',
            'مَقْصُوْرٌ عَلَيْهِ',
            'What the item is restricted to',
          ],
          [
            'Restriction tool',
            'أَدَاةُ قَصْرٍ',
            'The word creating the restriction',
          ],
        ],
      },
      {
        title: 'Relationship Types',
        titleAr: 'أَنْوَاعُ العَلَاقَةِ',
        headers: ['Type', 'Arabic', 'Description'],
        rows: [
          [
            'Quality restricted to being',
            'قَصْرُ الصِّفَةِ عَلَى الْمَوْصُوْفِ',
            '"Only Zayd is generous" — generosity restricted to Zayd',
          ],
          [
            'Being restricted to quality',
            'قَصْرُ الْمَوْصُوْفِ عَلَى الصِّفَةِ',
            '"Zayd is only generous" — Zayd restricted to generosity',
          ],
        ],
      },
      {
        title: 'Scope Types',
        titleAr: 'أَنْوَاعُ القَصْرِ',
        headers: ['Type', 'Arabic', 'Scope'],
        rows: [
          [
            'Absolute',
            'قَصْرٌ حَقِيْقِيٌّ',
            'Truly exclusive — no exceptions',
          ],
          [
            'Relative',
            'قَصْرٌ إِضَافِيٌّ',
            'Exclusive in comparison, not absolutely',
          ],
        ],
      },
      {
        title: 'Methods of Creating Qasr',
        titleAr: 'طُرُقُ القَصْرِ',
        headers: ['Method', 'Arabic', 'Pattern'],
        rows: [
          ['Exception', 'إِلَّا', 'Negation + إِلَّا + restricted item'],
          ['Restriction particle', 'إِنَّمَا', 'إِنَّمَا + full sentence'],
          [
            'Corrective',
            'بَلْ / لٰكِنْ',
            'Statement + بَلْ/لٰكِنْ + correction',
          ],
          ['Fronting', 'تَقْدِيمٌ', 'Move restricted item to front'],
        ],
      },
    ],
    sourceRef: 'First Steps to Understanding Balagah, Hashim Mohamed',
  },
  relatedTopicIds: ['sentence-order', 'khabariyyah'],
  tags: [
    'qasr',
    'restriction',
    'hasr',
    'illa',
    'innama',
    'bal',
    'lakin',
    'taqdim',
    'maqsur',
    'haqiqi',
    'idafi',
  ],
};
