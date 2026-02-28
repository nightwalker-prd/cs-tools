import type { BalagahTopic } from '../types';

export const khabariyyah: BalagahTopic = {
  id: 'khabariyyah',
  titleAr: 'جُمْلَةٌ خَبَرِيَّةٌ',
  titleEn: 'Informative Sentences',
  transliteration: 'Jumlah Khabariyyah',
  unitId: 'maani',
  partId: 'maani-types-meaning',
  content: {
    summary:
      'A Jumlah Khabariyyah is a sentence that consists of information with a true or false value in accordance with reality. It can be verified against facts.',
    body: `## Definition

According to its meaning, there are two types of sentences:

<div dir="rtl" class="font-arabic">
١) جُمْلَةٌ خَبَرِيَّةٌ
٢) جُمْلَةٌ إِنْشَائِيَّةٌ
</div>

A جُمْلَةٌ خَبَرِيَّةٌ is a sentence which consists of information with a true or false value in accordance with reality.

For example, the sentence "The pen is broken" has a true or false value depending on whether the pen is actually broken or not.

### Quranic Examples

**True informative sentence:**

<div dir="rtl" class="font-arabic">﴿لَقَدْ أَرْسَلْنَا نُوْحًا إِلَىٰ قَوْمِهِ﴾</div>

*Indeed, we sent Nooh to his people.*

This is a جُمْلَةٌ خَبَرِيَّةٌ with a true value — it is in accordance with reality.

**False informative sentence:**

<div dir="rtl" class="font-arabic">﴿...لَيَقُوْلُوْنَ ۞ وَلَدَ اللهُ وَإِنَّهُمْ لَكَاذِبُوْنَ ۞﴾</div>

*Indeed, they say, "Allah has given birth," and surely, they are liars.*

The middle sentence is a جُمْلَةٌ خَبَرِيَّةٌ with a false value — it is not in accordance with reality.`,
    rules: [
      {
        arabic: 'جُمْلَةٌ خَبَرِيَّةٌ',
        english:
          'An informative sentence that contains information which can be judged as true or false based on reality.',
        examples: [
          {
            arabic: '﴿لَقَدْ أَرْسَلْنَا نُوْحًا إِلَىٰ قَوْمِهِ﴾',
            translation: 'Indeed, we sent Nooh to his people.',
            source: 'Quran 71:1',
            analysis: 'A khabariyyah with a true value — verifiable against reality.',
          },
        ],
      },
    ],
    examples: [
      {
        arabic: '﴿لَقَدْ أَرْسَلْنَا نُوْحًا إِلَىٰ قَوْمِهِ﴾',
        translation: 'Indeed, we sent Nooh to his people.',
        source: 'Quran 71:1',
        analysis: 'True khabariyyah — verifiable and in accordance with reality.',
      },
      {
        arabic: '﴿وَلَدَ اللهُ﴾',
        translation: 'Allah has given birth.',
        source: 'Quran 37:152',
        analysis: 'False khabariyyah — not in accordance with reality.',
      },
    ],
    sourceRef: 'First Steps to Understanding Balagah, Hashim Mohamed',
  },
  relatedTopicIds: ['inshaiyyah-intro', 'khabar-insha-interchange'],
  tags: ['maani', 'khabariyyah', 'informative', 'true-false'],
};

export const inshaiyyahIntro: BalagahTopic = {
  id: 'inshaiyyah-intro',
  titleAr: 'جُمْلَةٌ إِنْشَائِيَّةٌ',
  titleEn: 'Performative Sentences (Overview)',
  transliteration: 'Jumlah Insha\'iyyah',
  unitId: 'maani',
  partId: 'maani-types-meaning',
  content: {
    summary:
      'A Jumlah Insha\'iyyah is a sentence that does not carry a true or false value. Instead, it consists of commands, prohibitions, questions, wishes, hopes, or calls. There are six types studied in Balagah.',
    body: `## Definition

A جُمْلَةٌ إِنْشَائِيَّةٌ is a sentence which does not consist of information with a true or false value. Instead, it consists of commands, requests, etc.

For example, the sentence "Do not break the pen" is a command. It does not have a true or false value; it has no reality to be checked against.

### Quranic Example

<div dir="rtl" class="font-arabic">﴿وَأَقِمِ الصَّلوٰةَ﴾</div>

*And establish salah.*

## The Six Types of جُمْلَةٌ إِنْشَائِيَّةٌ

<div dir="rtl" class="font-arabic">
١) أَمْرٌ
٢) نَهْيٌ
٣) اِسْتِفْهَامٌ
٤) تَمَنٍّ
٥) تَرَجٍّ
٦) نِدَاءٌ
</div>

Each type has a primary usage and may have secondary (rhetorical) usages where the form is used for a purpose other than its literal meaning.`,
    rules: [
      {
        arabic: 'جُمْلَةٌ إِنْشَائِيَّةٌ',
        english:
          'A performative sentence that does not carry a truth value. It consists of commands, prohibitions, questions, wishes, hopes, or calls.',
        examples: [
          {
            arabic: '﴿وَأَقِمِ الصَّلوٰةَ﴾',
            translation: 'And establish salah.',
            source: 'Quran 11:114',
            analysis: 'A command (amr) — has no true/false value.',
          },
        ],
      },
    ],
    tables: [
      {
        title: 'The Six Types of Insha\'iyyah',
        titleAr: 'أَنْوَاعُ الْجُمْلَةِ الإِنْشَائِيَّةِ',
        headers: ['#', 'Arabic Term', 'English', 'Meaning'],
        rows: [
          ['1', 'أَمْرٌ', 'Command', 'Ordering someone to do something'],
          ['2', 'نَهْيٌ', 'Prohibition', 'Forbidding someone from doing something'],
          ['3', 'اِسْتِفْهَامٌ', 'Interrogation', 'Asking a question'],
          ['4', 'تَمَنٍّ', 'Wishing', 'Expressing desire for the impossible or improbable'],
          ['5', 'تَرَجٍّ', 'Hoping', 'Expressing desire for something possible'],
          ['6', 'نِدَاءٌ', 'Calling', 'Calling or addressing someone'],
        ],
      },
    ],
    sourceRef: 'First Steps to Understanding Balagah, Hashim Mohamed',
  },
  relatedTopicIds: ['khabariyyah', 'amr', 'nahy', 'istifham'],
  tags: ['maani', 'inshaiyyah', 'performative'],
};

export const amr: BalagahTopic = {
  id: 'amr',
  titleAr: 'أَمْرٌ',
  titleEn: 'Command',
  transliteration: 'Amr',
  unitId: 'maani',
  partId: 'maani-types-meaning',
  content: {
    summary:
      'Amr (command) is a type of insha\'iyyah used by a speaker in authority to issue an order to a lower-ranked addressee. It has four forms and six secondary usages including advice, permission, request, supplication, wishing, and equalization.',
    body: `## Primary Usage

An أَمْرٌ is a type of word primarily used by the speaker (مُتَكَلِّمٌ), who assumes himself to be in authority, to issue an order to an addressee (مُخَاطَبٌ), whom he assumes is lower in rank.

## Four Forms of الأَمْرُ

### 1. صِيغَةُ الأَمْرِ — The Imperative Form

<div dir="rtl" class="font-arabic">﴿يَيْحَيٰ خُذِ الْكِتٰبَ بِقُوَّةٍ﴾</div>

*Hold fast to the Scripture.*

### 2. صِيغَةُ الأَمْرِ لِلْغَائِبِ — The Imperative for the Absent

<div dir="rtl" class="font-arabic">﴿لِيُنْفِقْ ذُو سَعَةٍ مِنْ سَعَتِهِ﴾</div>

*A man of vast means should spend according to his vast means.*

### 3. الْمَصْدَرُ — The Verbal Noun

<div dir="rtl" class="font-arabic">﴿وَبِالْوَالِدَيْنِ إِحْسَانًا﴾</div>

*Be good to parents.*

### 4. اِسْمُ الْفِعْلِ — Noun of Action

<div dir="rtl" class="font-arabic">﴿هَآؤُمُ اقْرَءُوا كِتٰبِيَهْ﴾</div>

*Come here! Read my book.*

> **Note:** The مَصْدَرٌ and اِسْمُ الْفِعْلِ depict a more emphatic command compared to the standard صِيغَةُ الأَمْرِ.

## Secondary Usages of الأَمْرُ

### إِرْشَادٌ — Advice

<div dir="rtl" class="font-arabic">﴿يَٓاَيُّهَا الَّذِيْنَ اٰمَنُوْٓا اِذَا تَدَايَنْتُمْ بِدَيْنٍ اِلٰٓى اَجَلٍ مُسَمًّى فَاكْتُبُوْهُ﴾</div>

*O you who believe, when you transact a debt payable at a specified time, put it in writing.*

### إِبَاحَةٌ — Permission

<div dir="rtl" class="font-arabic">﴿يَٓاَيُّهَا النَّاسُ كُلُوْا مِمَّا فِي الْأَرْضِ حَلٰلًا طَيِّبًا﴾</div>

*O people, eat permissible good things out of what lies in the earth.*

### اِلْتِمَاسٌ — Request from a Peer or Superior

<div dir="rtl" class="font-arabic">﴿قَالَ ابْنَ أُمَّ إِنَّ الْقَوْمَ اسْتَضْعَفُونِي وَكَادُوا يَقْتُلُونَنِي فَلَا تُشْمِتْ بِيَ الْأَعْدَاءَ وَلَا تَجْعَلْنِي مَعَ الْقَوْمِ الظّٰلِمِينَ﴾</div>

*He [Harun] said [to Musa], "My mother's son, the people took me as weak and were about to kill me. So do not let the enemies laugh at me, and do not count me with the wrong-doers."*

### دُعَاءٌ — Prayer

<div dir="rtl" class="font-arabic">﴿رَبَّنَا تَقَبَّلْ مِنَّا﴾</div>

*"Our Lord, accept from us!"*

### تَمَنٍّ — Wishing for the Impossible

<div dir="rtl" class="font-arabic">﴿وَنَادَوْا يٰمٰلِكُ لِيَقْضِ عَلَيْنَا رَبُّكَ﴾</div>

*"O Malik [warden of the Hell], let your Lord make an end of us."*

### تَسْوِيَةٌ — Equalization

<div dir="rtl" class="font-arabic">﴿اِصْلَوْهَا فَاصْبِرُوْٓا اَوْ لَا تَصْبِرُوْا سَوَآءٌ عَلَيْكُمْ﴾</div>

*Whether you endure it patiently or impatiently, it is all the same for you.*`,
    rules: [
      {
        arabic: 'أَمْرٌ',
        english:
          'A command issued by a speaker in authority to an addressee of lower rank. It has four forms: imperative (sighat al-amr), imperative for the absent, masdar, and ism al-fi\'l.',
      },
      {
        english:
          'The masdar and ism al-fi\'l depict a more emphatic command compared to the standard imperative form.',
      },
    ],
    examples: [
      {
        arabic: '﴿يَيْحَيٰ خُذِ الْكِتٰبَ بِقُوَّةٍ﴾',
        translation: 'Hold fast to the Scripture.',
        source: 'Quran 19:12',
        analysis: 'صِيغَةُ الأَمْرِ — the standard imperative form.',
      },
      {
        arabic: '﴿لِيُنْفِقْ ذُو سَعَةٍ مِنْ سَعَتِهِ﴾',
        translation: 'A man of vast means should spend according to his vast means.',
        source: 'Quran 65:7',
        analysis: 'صِيغَةُ الأَمْرِ لِلْغَائِبِ — imperative for the absent.',
      },
      {
        arabic: '﴿وَبِالْوَالِدَيْنِ إِحْسَانًا﴾',
        translation: 'Be good to parents.',
        source: 'Quran 2:83',
        analysis: 'الْمَصْدَرُ — the verbal noun used as an emphatic command.',
      },
      {
        arabic: '﴿رَبَّنَا تَقَبَّلْ مِنَّا﴾',
        translation: 'Our Lord, accept from us!',
        source: 'Quran 2:127',
        analysis: 'Secondary usage — du\'a (prayer to Allah).',
      },
      {
        arabic: '﴿يَٓاَيُّهَا النَّاسُ كُلُوْا مِمَّا فِي الْأَرْضِ حَلٰلًا طَيِّبًا﴾',
        translation: 'O people, eat permissible good things out of what lies in the earth.',
        source: 'Quran 2:168',
        analysis: 'Secondary usage — ibahah (permission).',
      },
    ],
    tables: [
      {
        title: 'Forms of Command',
        titleAr: 'صِيَغُ الأَمْرِ',
        headers: ['Form', 'Arabic Name', 'Example', 'Translation'],
        rows: [
          ['Imperative', 'صِيغَةُ الأَمْرِ', '﴿خُذِ الْكِتٰبَ بِقُوَّةٍ﴾', 'Hold fast to the Scripture'],
          ['Imperative (absent)', 'صِيغَةُ الأَمْرِ لِلْغَائِبِ', '﴿لِيُنْفِقْ ذُو سَعَةٍ﴾', 'A man of vast means should spend'],
          ['Verbal noun', 'الْمَصْدَرُ', '﴿وَبِالْوَالِدَيْنِ إِحْسَانًا﴾', 'Be good to parents'],
          ['Noun of action', 'اِسْمُ الْفِعْلِ', '﴿هَآؤُمُ اقْرَءُوا كِتٰبِيَهْ﴾', 'Come here! Read my book'],
        ],
      },
      {
        title: 'Secondary Usages of Command',
        titleAr: 'الاِسْتِعْمَالَاتُ الثَّانَوِيَّةُ لِلْأَمْرِ',
        headers: ['Purpose', 'Arabic Term', 'Speaker', 'Addressee'],
        rows: [
          ['Necessary command', 'الأَمْرُ (وُجُوبٌ)', 'Higher (أَعْلَى)', 'Lower (أَدْنَى)'],
          ['Advice', 'الإِرْشَادُ', 'Higher (أَعْلَى)', 'Lower (أَدْنَى)'],
          ['Permission', 'الإِبَاحَةُ', 'Higher (أَعْلَى)', 'Lower (أَدْنَى)'],
          ['Request', 'الْتِمَاسٌ', 'Equal / Lower', 'Equal / Higher'],
          ['Prayer', 'الدُّعَاءُ', 'Lower (أَدْنَى)', 'Higher (أَعْلَى)'],
          ['Wishing', 'التَّمَنِّي', '—', '—'],
          ['Equalization', 'التَّسْوِيَةُ', '—', '—'],
        ],
      },
    ],
    sourceRef: 'First Steps to Understanding Balagah, Hashim Mohamed',
  },
  relatedTopicIds: ['nahy', 'khabar-insha-interchange'],
  tags: ['maani', 'inshaiyyah', 'amr', 'command', 'irshad', 'ibahah', 'iltimas', 'dua'],
};

export const nahy: BalagahTopic = {
  id: 'nahy',
  titleAr: 'نَهْيٌ',
  titleEn: 'Prohibition',
  transliteration: 'Nahy',
  unitId: 'maani',
  partId: 'maani-types-meaning',
  content: {
    summary:
      'Nahy (prohibition) is a type of insha\'iyyah used by a speaker in authority to issue a prohibition to a lower-ranked addressee. It has two forms: the standard prohibitive and the prohibitive for the absent.',
    body: `## Primary Usage

A نَهْيٌ is a type of word primarily used by the speaker (مُتَكَلِّمٌ), who assumes himself to be in authority, to issue a prohibition to an addressee (مُخَاطَبٌ), whom he assumes is lower in rank.

## Two Forms of النَّهْيُ

### 1. صِيغَةُ النَّهْيِ — The Prohibitive Form

<div dir="rtl" class="font-arabic">﴿لَا تُشْرِكْ بِاللّٰهِ﴾</div>

*Do not associate anything with Allah.*

### 2. صِيغَةُ النَّهْيِ لِلْغَائِبِ — The Prohibitive for the Absent

<div dir="rtl" class="font-arabic">﴿وَلَا يَأْتَلِ أُولُوا الْفَضْلِ مِنْكُمْ وَالسَّعَةِ﴾</div>

*The men of grace and wealth among you should not take an oath against ...*

## Secondary Usages

The نَهْيٌ shares its secondary usages with the أَمْرٌ. Both can be used for اِلْتِمَاسٌ (request), دُعَاءٌ (prayer), تَسْوِيَةٌ (equalization), and other purposes depending on the relationship between speaker and addressee.`,
    rules: [
      {
        arabic: 'نَهْيٌ',
        english:
          'A prohibition issued by a speaker in authority to an addressee of lower rank. It has two forms: the standard prohibitive (sighat al-nahy) and the prohibitive for the absent.',
      },
    ],
    examples: [
      {
        arabic: '﴿لَا تُشْرِكْ بِاللّٰهِ﴾',
        translation: 'Do not associate anything with Allah.',
        source: 'Quran 31:13',
        analysis: 'صِيغَةُ النَّهْيِ — the standard prohibitive form.',
      },
      {
        arabic: '﴿وَلَا يَأْتَلِ أُولُوا الْفَضْلِ مِنْكُمْ وَالسَّعَةِ﴾',
        translation: 'The men of grace and wealth among you should not take an oath against ...',
        source: 'Quran 24:22',
        analysis: 'صِيغَةُ النَّهْيِ لِلْغَائِبِ — the prohibitive for the absent.',
      },
    ],
    tables: [
      {
        title: 'Forms of Prohibition',
        titleAr: 'صِيَغُ النَّهْيِ',
        headers: ['Form', 'Arabic Name', 'Example', 'Translation'],
        rows: [
          ['Prohibitive', 'صِيغَةُ النَّهْيِ', '﴿لَا تُشْرِكْ بِاللّٰهِ﴾', 'Do not associate anything with Allah'],
          ['Prohibitive (absent)', 'صِيغَةُ النَّهْيِ لِلْغَائِبِ', '﴿وَلَا يَأْتَلِ أُولُوا الْفَضْلِ﴾', 'The men of grace should not take an oath against ...'],
        ],
      },
    ],
    sourceRef: 'First Steps to Understanding Balagah, Hashim Mohamed',
  },
  relatedTopicIds: ['amr', 'khabar-insha-interchange'],
  tags: ['maani', 'inshaiyyah', 'nahy', 'prohibition'],
};

export const istifham: BalagahTopic = {
  id: 'istifham',
  titleAr: 'اِسْتِفْهَامٌ',
  titleEn: 'Interrogation',
  transliteration: 'Istifham',
  unitId: 'maani',
  partId: 'maani-types-meaning',
  content: {
    summary:
      'Istifham (interrogation) is to ask a question using particles like hamza, hal, ma, man, etc. It also has rhetorical (secondary) usages including command, prohibition, amazement, drawing attention, and showing greatness.',
    body: `## Primary Usage

اِسْتِفْهَامٌ is to ask a question. Arabic has several particles for forming questions.

## Particles of اِسْتِفْهَامٌ

The main particles are: أَ (hamza), هَلْ, مَا (what), مَنْ (who), مَتٰى (when), أَيَّانَ (when), كَيْفَ (how), أَيْنَ (where), أَنّٰى (how/from where), كَمْ (how many), and أَيُّ (which).

## Secondary (Rhetorical) Usages

An اِسْتِفْهَامٌ can be rhetorical — intended for something other than a question:

### أَمْرٌ — Command

<div dir="rtl" class="font-arabic">﴿فَهَلْ أَنْتُمْ شٰكِرُوْنَ﴾</div>

*So will you be grateful?* — A question form used to mean "Be grateful!"

### نَهْيٌ — Prohibition

<div dir="rtl" class="font-arabic">﴿أَتَخْشَوْنَهُمْ﴾</div>

*Do you fear them?* — A question form used to mean "Do not fear them!"

### تَعَجُّبٌ — Amazement

<div dir="rtl" class="font-arabic">﴿وَقَالُوا مَالِ هٰذَا الرَّسُولِ يَأْكُلُ الطَّعَامَ وَيَمْشِيْ فِي الْأَسْوَاقِ﴾</div>

*What sort of messenger is this who eats food and walks in the markets?*

### تَشْوِيقٌ — Drawing Attention

<div dir="rtl" class="font-arabic">﴿يَٓاَيُّهَا الَّذِيْنَ اٰمَنُوْا هَلْ أَدُلُّكُمْ عَلٰى تِجَارَةٍ تُنْجِيْكُمْ مِنْ عَذَابٍ أَلِيمٍ﴾</div>

*Shall I tell you about a trade that saves you from a painful punishment?*

### تَعْظِيمٌ — Showing Greatness

<div dir="rtl" class="font-arabic">﴿مَنْ ذَا الَّذِيْ يَشْفَعُ عِنْدَهُ إِلَّا بِإِذْنِهِ﴾</div>

*Who can intercede with Him without His permission?*`,
    rules: [
      {
        arabic: 'اِسْتِفْهَامٌ',
        english:
          'Interrogation — asking a question. Arabic has 11 main particles for forming questions.',
      },
      {
        english:
          'Istifham can be rhetorical, used for purposes other than asking — including command, prohibition, amazement, drawing attention, and showing greatness.',
      },
    ],
    examples: [
      {
        arabic: '﴿أَأَنْتُمْ أَعْلَمُ أَمِ اللّٰهُ﴾',
        translation: 'Do you know better or does Allah?',
        source: 'Quran 2:140',
        analysis: 'أَ (hamza) — the primary interrogative particle.',
      },
      {
        arabic: '﴿هَلْ عِنْدَكُمْ مِنْ عِلْمٍ﴾',
        translation: 'Do you have any sure knowledge?',
        source: 'Quran 6:148',
        analysis: 'هَلْ — used for yes/no questions.',
      },
      {
        arabic: '﴿فَهَلْ أَنْتُمْ شٰكِرُوْنَ﴾',
        translation: 'So will you be grateful?',
        source: 'Quran 21:80',
        analysis: 'Rhetorical — used as a command meaning "Be grateful!"',
      },
      {
        arabic: '﴿مَنْ ذَا الَّذِيْ يَشْفَعُ عِنْدَهُ إِلَّا بِإِذْنِهِ﴾',
        translation: 'Who can intercede with Him without His permission?',
        source: 'Quran 2:255',
        analysis: 'Rhetorical — used for ta\'dhim (showing greatness of Allah).',
      },
    ],
    tables: [
      {
        title: 'Particles of Interrogation',
        titleAr: 'أَدَوَاتُ الاِسْتِفْهَامِ',
        headers: ['Particle', 'Meaning', 'Example', 'Translation'],
        rows: [
          ['أَ', 'Is/Are', '﴿أَأَنْتُمْ أَعْلَمُ أَمِ اللّٰهُ﴾', 'Do you know better or does Allah?'],
          ['هَلْ', 'Is/Are', '﴿هَلْ عِنْدَكُمْ مِنْ عِلْمٍ﴾', 'Do you have any sure knowledge?'],
          ['مَا', 'What', '﴿وَمَا تِلْكَ بِيَمِينِكَ يٰمُوسٰى﴾', 'What is that in your right hand, O Musa?'],
          ['مَنْ', 'Who', '﴿مَنْ هُوَ أَشَدُّ مِنْهُ قُوَّةً﴾', 'Who is stronger than us in power?'],
          ['مَتٰى', 'When', '﴿مَتٰى هٰذَا الْوَعْدُ﴾', 'When will this promise ...?'],
          ['أَيَّانَ', 'When', '﴿أَيَّانَ يَوْمُ الدِّينِ﴾', 'When shall be the Day of Recompense?'],
          ['كَيْفَ', 'How', '﴿كَيْفَ تُحْيِ الْمَوْتٰى﴾', 'How do You give life to the dead?'],
          ['أَيْنَ', 'Where', '﴿أَيْنَ شُرَكَاؤُكُمْ﴾', 'Where are those you claimed to be partners?'],
          ['أَنّٰى', 'How / From where', '﴿أَنّٰى يَكُوْنُ لَهُ الْمُلْكُ عَلَيْنَا﴾', 'How could he have kingship over us?'],
          ['كَمْ', 'How many', '﴿كَمْ لَبِثْتَ﴾', 'How long did you remain?'],
          ['أَيُّ', 'Which', '﴿أَيُّ الْفَرِيقَيْنِ خَيْرٌ مَقَامًا﴾', 'Which of the two groups is superior?'],
        ],
      },
      {
        title: 'Rhetorical Usages of Interrogation',
        titleAr: 'الاِسْتِعْمَالَاتُ الْبَلَاغِيَّةُ لِلاِسْتِفْهَامِ',
        headers: ['Usage', 'Arabic', 'Example', 'Actual Meaning'],
        rows: [
          ['Command', 'أَمْرٌ', '﴿فَهَلْ أَنْتُمْ شٰكِرُوْنَ﴾', 'Be grateful!'],
          ['Prohibition', 'نَهْيٌ', '﴿أَتَخْشَوْنَهُمْ﴾', 'Do not fear them!'],
          ['Amazement', 'تَعَجُّبٌ', '﴿مَالِ هٰذَا الرَّسُولِ يَأْكُلُ الطَّعَامَ﴾', 'Expressing wonder'],
          ['Drawing attention', 'تَشْوِيقٌ', '﴿هَلْ أَدُلُّكُمْ عَلٰى تِجَارَةٍ﴾', 'Leading into important info'],
          ['Showing greatness', 'تَعْظِيمٌ', '﴿مَنْ ذَا الَّذِيْ يَشْفَعُ عِنْدَهُ﴾', 'No one can — showing Allah\'s greatness'],
        ],
      },
    ],
    sourceRef: 'First Steps to Understanding Balagah, Hashim Mohamed',
  },
  relatedTopicIds: ['amr', 'nahy'],
  tags: ['maani', 'inshaiyyah', 'istifham', 'interrogation', 'rhetorical'],
};

export const tamanni: BalagahTopic = {
  id: 'tamanni',
  titleAr: 'تَمَنٍّ',
  titleEn: 'Wishing',
  transliteration: 'Tamanni',
  unitId: 'maani',
  partId: 'maani-types-meaning',
  content: {
    summary:
      'Tamanni (wishing) is to express desire for something impossible or improbable. The main particle is layta, with hal and law also used.',
    body: `## Primary Usage

تَمَنٍّ is to express desire for something impossible or improbable.

The main particle of تَمَنٍّ is لَيْتَ. This is often preceded by يَا which is not translated.

<div dir="rtl" class="font-arabic">﴿قَالَ يٰلَيْتَ قَوْمِيْ يَعْلَمُوْنَ﴾</div>

*I wish my people knew.*

## Other Particles of تَمَنٍّ

### هَلْ

<div dir="rtl" class="font-arabic">﴿فَهَلْ لَنَا مِنْ شُفَعَاءَ فَيَشْفَعُوْا لَنَا﴾</div>

*So, are there any intercessors for us who could intercede in our favour?*

### لَوْ

<div dir="rtl" class="font-arabic">﴿مِنْ قَبْلِ أَنْ يَّأْتِيَ أَحَدَكُمُ الْمَوْتُ فَيَقُوْلَ رَبِّ لَوْلَآ أَخَّرْتَنِيْٓ إِلٰٓى أَجَلٍ قَرِيبٍ﴾</div>

*Would you have not spared us for a little more time?*

The particles of تَرَجٍّ and تَمَنٍّ can be interchanged — see the topic on تَرَجٍّ for details.`,
    rules: [
      {
        arabic: 'تَمَنٍّ',
        english:
          'Wishing — expressing desire for something impossible or improbable. The main particle is لَيْتَ.',
      },
      {
        english:
          'The particles هَلْ and لَوْ can also be used to express tamanni (wishing).',
      },
    ],
    examples: [
      {
        arabic: '﴿قَالَ يٰلَيْتَ قَوْمِيْ يَعْلَمُوْنَ﴾',
        translation: 'I wish my people knew.',
        source: 'Quran 36:26',
        analysis: 'لَيْتَ — the primary particle of tamanni.',
      },
      {
        arabic: '﴿فَهَلْ لَنَا مِنْ شُفَعَاءَ فَيَشْفَعُوْا لَنَا﴾',
        translation: 'So, are there any intercessors for us who could intercede in our favour?',
        source: 'Quran 7:53',
        analysis: 'هَلْ — used as a tamanni particle to express an impossible wish.',
      },
    ],
    tables: [
      {
        title: 'Particles of Wishing',
        titleAr: 'أَدَوَاتُ التَّمَنِّي',
        headers: ['Particle', 'Type', 'Example'],
        rows: [
          ['لَيْتَ', 'Primary', '﴿يٰلَيْتَ قَوْمِيْ يَعْلَمُوْنَ﴾'],
          ['هَلْ', 'Secondary', '﴿فَهَلْ لَنَا مِنْ شُفَعَاءَ﴾'],
          ['لَوْ', 'Secondary', '﴿لَوْلَآ أَخَّرْتَنِيْٓ إِلٰٓى أَجَلٍ قَرِيبٍ﴾'],
        ],
      },
    ],
    sourceRef: 'First Steps to Understanding Balagah, Hashim Mohamed',
  },
  relatedTopicIds: ['taraji', 'nida-insha'],
  tags: ['maani', 'inshaiyyah', 'tamanni', 'wishing', 'layta'],
};

export const taraji: BalagahTopic = {
  id: 'taraji',
  titleAr: 'تَرَجٍّ',
  titleEn: 'Hoping',
  transliteration: 'Tarajji',
  unitId: 'maani',
  partId: 'maani-types-meaning',
  content: {
    summary:
      'Tarajji (hoping) is to express desire for something possible. The two main particles are \'asa and la\'alla. The particles of tarajji and tamanni can be interchanged.',
    body: `## Primary Usage

تَرَجٍّ is to express desire for something possible. Unlike تَمَنٍّ which is for the impossible, تَرَجٍّ is used when there is a realistic hope.

## Particles of تَرَجٍّ

### عَسٰى

<div dir="rtl" class="font-arabic">﴿عَسَى اللّٰهُ أَنْ يَّأْتِيَنِيْ بِهِمْ جَمِيْعًا﴾</div>

*Hopefully, Allah may bring them all together.*

### لَعَلَّ

<div dir="rtl" class="font-arabic">﴿لَا تَدْرِيْ لَعَلَّ اللّٰهَ يُحْدِثُ بَعْدَ ذٰلِكَ أَمْرًا﴾</div>

*It may be that Allah brings about a new situation thereafter.*

## Interchanging تَرَجٍّ and تَمَنٍّ

The particles of تَرَجٍّ and تَمَنٍّ can be interchanged. For example:

<div dir="rtl" class="font-arabic">﴿وَقَالَ فِرْعَوْنُ يَٓاَيُّهَا الْمَلَأُ مَا عَلِمْتُ لَكُمْ مِنْ اِلٰهٍ غَيْرِيْ فَأَوْقِدْ لِيْ يٰهَامٰنُ عَلَى الطِّيْنِ فَاجْعَلْ لِّيْ صَرْحًا لَعَلِّيْٓ أَطَّلِعُ إِلٰٓى اِلٰهِ مُوسٰى﴾</div>

*And Fir'aun said, "O Haman, make a tower for me, perhaps I could reach the ways to the heavens, and peek towards the God of Musa."*

Even though reaching the heavens is impossible, Fir'aun expressed this using لَعَلَّ (a tarajji particle) to give the impression to those around him that it was possible.`,
    rules: [
      {
        arabic: 'تَرَجٍّ',
        english:
          'Hoping — expressing desire for something possible. The two particles are عَسٰى and لَعَلَّ.',
      },
      {
        english:
          'The particles of tarajji and tamanni can be interchanged — a tarajji particle may be used for something impossible (or vice versa) for rhetorical effect.',
      },
    ],
    examples: [
      {
        arabic: '﴿عَسَى اللّٰهُ أَنْ يَّأْتِيَنِيْ بِهِمْ جَمِيْعًا﴾',
        translation: 'Hopefully, Allah may bring them all together.',
        source: 'Quran 12:83',
        analysis: 'عَسٰى — expressing realistic hope for a possible outcome.',
      },
      {
        arabic: '﴿لَا تَدْرِيْ لَعَلَّ اللّٰهَ يُحْدِثُ بَعْدَ ذٰلِكَ أَمْرًا﴾',
        translation: 'It may be that Allah brings about a new situation thereafter.',
        source: 'Quran 65:1',
        analysis: 'لَعَلَّ — expressing hope for a possible future event.',
      },
      {
        arabic: '﴿فَاجْعَلْ لِّيْ صَرْحًا لَعَلِّيْٓ أَطَّلِعُ إِلٰٓى اِلٰهِ مُوسٰى﴾',
        translation: 'Make a tower for me, perhaps I could peek towards the God of Musa.',
        source: 'Quran 28:38',
        analysis: 'لَعَلَّ used for something impossible (tamanni) — Fir\'aun pretends it is achievable.',
      },
    ],
    tables: [
      {
        title: 'Particles of Hoping',
        titleAr: 'أَدَوَاتُ التَّرَجِّي',
        headers: ['Particle', 'Example', 'Translation'],
        rows: [
          ['عَسٰى', '﴿عَسَى اللّٰهُ أَنْ يَّأْتِيَنِيْ بِهِمْ جَمِيْعًا﴾', 'Hopefully, Allah may bring them all together.'],
          ['لَعَلَّ', '﴿لَعَلَّ اللّٰهَ يُحْدِثُ بَعْدَ ذٰلِكَ أَمْرًا﴾', 'It may be that Allah brings about a new situation.'],
        ],
      },
    ],
    sourceRef: 'First Steps to Understanding Balagah, Hashim Mohamed',
  },
  relatedTopicIds: ['tamanni'],
  tags: ['maani', 'inshaiyyah', 'tarajji', 'hoping', 'asa', 'laalla'],
};

export const nidaInsha: BalagahTopic = {
  id: 'nida-insha',
  titleAr: 'نِدَاءٌ',
  titleEn: 'Calling',
  transliteration: 'Nida\'',
  unitId: 'maani',
  partId: 'maani-types-meaning',
  content: {
    summary:
      'Nida (calling) is to call someone. It has two particles: ya (for the far) and ay/a (for the near). The particles can be inverted for rhetorical effect. Secondary usages include urging, jesting, and mocking.',
    body: `## Primary Usage

نِدَاءٌ is to call someone. There are two particles:

- **أَيْ** or **أَ** — used to call someone who is close.
- **يَا** — used to call someone who is far.

<div dir="rtl" class="font-arabic">﴿يَٓا آدَمُ﴾</div>

*O Adam!*

## Inverted Uses of the Particles

Someone who is **close** may be called via يَا to show abstract distance. Similarly, someone **far** may be called via أَ to show abstract proximity.

<div dir="rtl" class="font-arabic">﴿قَالَ يَبْنَؤُمَّ لَا تَأْخُذْ بِلِحْيَتِيْ وَلَا بِرَأْسِيْ﴾</div>

*He replied: O son of my mother, do not hold me by my beard, nor by my head.*

Even though Harun and Musa were physically close, the word يَا is used to show the abstract distance between them due to the heated exchange.

## Secondary Usages

### إِغْرَاءٌ — Urging/Inciting

<div dir="rtl" class="font-arabic">﴿يٰٓاُخْتَ هٰرُوْنَ مَا كَانَ اَبُوْكِ امْرَأَ سَوْءٍ وَّمَا كَانَتْ اُمُّكِ بَغِيًّا﴾</div>

*O sister of Harun, neither your father was a man of evil nor was your mother unchaste.*

They addressed Maryam as "sister of Harun" to reprimand her that being from such a noble family, it was not befitting of her to carry out such an act (according to their assumption).

### مِزَاحٌ وَتَلَطُّفٌ — Jesting and Playing

Once Ali (may Allah be pleased with him) stormed out of his house after an argument with Fatima. The Prophet (peace and blessings be upon him) found him sleeping on the ground of the masjid covered in dust. To lighten the mood, the Prophet addressed him:

<div dir="rtl" class="font-arabic">يَا أَبَا تُرَابٍ</div>

*O Abu Turab (one covered in dust)*

### اِسْتِهْزَاءٌ — Mocking

<div dir="rtl" class="font-arabic">﴿وَقَالُوْا يَٓاَيُّهَا الَّذِيْ نُزِّلَ عَلَيْهِ الذِّكْرُ إِنَّكَ لَمَجْنُوْنٌ﴾</div>

*They say, "O you to whom the Dhikr has been revealed, you are surely insane."*

The people of Makkah did not believe that revelation came to the Prophet. Hence, their statement was sarcastic.`,
    rules: [
      {
        arabic: 'نِدَاءٌ',
        english:
          'Calling someone. Particles: يَا (for the far) and أَيْ or أَ (for the near). Particles can be inverted for rhetorical effect.',
      },
    ],
    examples: [
      {
        arabic: '﴿يَٓا آدَمُ﴾',
        translation: 'O Adam!',
        source: 'Quran 2:33',
        analysis: 'يَا — the standard particle for calling someone distant.',
      },
      {
        arabic: '﴿يٰٓاُخْتَ هٰرُوْنَ مَا كَانَ اَبُوْكِ امْرَأَ سَوْءٍ﴾',
        translation: 'O sister of Harun, neither your father was a man of evil.',
        source: 'Quran 19:28',
        analysis: 'Secondary usage — ighra\' (urging/reprimanding) by invoking her noble lineage.',
      },
      {
        arabic: '﴿وَقَالُوْا يَٓاَيُّهَا الَّذِيْ نُزِّلَ عَلَيْهِ الذِّكْرُ إِنَّكَ لَمَجْنُوْنٌ﴾',
        translation: 'O you to whom the Dhikr has been revealed, you are surely insane.',
        source: 'Quran 15:6',
        analysis: 'Secondary usage — istihza\' (mocking). The disbelievers did not believe in revelation.',
      },
      {
        arabic: 'يَا أَبَا تُرَابٍ',
        translation: 'O Abu Turab (one covered in dust)',
        source: 'Hadith (Bukhari)',
        analysis: 'Secondary usage — mizah (jesting) by the Prophet to lighten the mood.',
      },
    ],
    tables: [
      {
        title: 'Particles of Calling',
        titleAr: 'أَدَوَاتُ النِّدَاءِ',
        headers: ['Particle', 'Usage', 'Distance'],
        rows: [
          ['يَا', 'Standard calling', 'Far'],
          ['أَيْ / أَ', 'Calling someone nearby', 'Close'],
        ],
      },
      {
        title: 'Secondary Usages of Nida',
        titleAr: 'الاِسْتِعْمَالَاتُ الثَّانَوِيَّةُ لِلنِّدَاءِ',
        headers: ['Usage', 'Arabic', 'Description'],
        rows: [
          ['Urging', 'إِغْرَاءٌ', 'Reprimanding or inciting someone by calling them with a specific title'],
          ['Jesting', 'مِزَاحٌ وَتَلَطُّفٌ', 'Playful or light-hearted address to ease tension'],
          ['Mocking', 'اِسْتِهْزَاءٌ', 'Sarcastic address that does not reflect the speaker\'s true belief'],
        ],
      },
    ],
    sourceRef: 'First Steps to Understanding Balagah, Hashim Mohamed',
  },
  relatedTopicIds: ['tamanni', 'taraji'],
  tags: ['maani', 'inshaiyyah', 'nida', 'calling', 'ighra', 'istihza'],
};

export const khabarInshaInterchange: BalagahTopic = {
  id: 'khabar-insha-interchange',
  titleAr: 'تَبَادُلُ الْخَبَرِيَّةِ وَالإِنْشَائِيَّةِ',
  titleEn: 'Interchanging Informative & Performative',
  transliteration: 'Tabaadul al-Khabariyyah wa al-Insha\'iyyah',
  unitId: 'maani',
  partId: 'maani-types-meaning',
  content: {
    summary:
      'Informative (khabariyyah) and performative (insha\'iyyah) sentences can be interchanged for emphasis. Using a khabariyyah in place of a command creates stronger emphasis because it presents the instruction as an established fact.',
    body: `## Overview

A جُمْلَةٌ إِنْشَائِيَّةٌ and a جُمْلَةٌ خَبَرِيَّةٌ can be interchanged for rhetorical effect.

## Using a خَبَرِيَّةٌ in Place of an أَمْرٌ or نَهْيٌ

In an أَمْرٌ or نَهْيٌ, the addressee is issued an instruction or prohibition — and then has the choice to carry it out or not. In a خَبَرِيَّةٌ, a statement is issued regarding something that **is** going to be done or not done as a matter of fact. Therefore, expressing a command as a خَبَرِيَّةٌ creates **more emphasis**.

### Example with فِعْلِيَّةٌ

<div dir="rtl" class="font-arabic">﴿وَاِذْ اَخَذْنَا مِيْثَاقَكُمْ لَا تَسْفِكُوْنَ دِمَآءَكُمْ وَلَا تُخْرِجُوْنَ اَنْفُسَكُمْ مِنْ دِيَارِكُمْ﴾</div>

*When We took a pledge from you: "You shall not shed the blood of one another, and you shall not drive one another out of your homes."*

The prohibition is expressed as a statement of fact (khabariyyah) rather than a direct command, making it more emphatic.

### Example with اِسْمِيَّةٌ

<div dir="rtl" class="font-arabic">﴿فَمَنْ فَرَضَ فِيْهِنَّ الْحَجَّ فَلَا رَفَثَ وَلَا فُسُوْقَ وَلَا جِدَالَ فِي الْحَجِّ﴾</div>

*There should be no obscenity, no sin, and no quarrel in Hajj.*

## Using an إِنْشَائِيَّةٌ in Place of a خَبَرِيَّةٌ

An إِنْشَائِيَّةٌ may also be used in place of a خَبَرِيَّةٌ for emphasis.

<div dir="rtl" class="font-arabic">﴿قُلْ اَمَرَ رَبِّيْ بِالْقِسْطِ وَاَقِيْمُوْا وُجُوْهَكُمْ عِنْدَ كُلِّ مَسْجِدٍ وَادْعُوْهُ مُخْلِصِيْنَ لَهُ الدِّيْنَ﴾</div>

*My Lord has commanded justice and that you should face Him only during prayers in every place of worship.*

Two commands are issued: to be just and to turn towards Allah at prayer. The second command is expressed via an إِنْشَائِيَّةٌ (different style from the first), creating emphasis on the second command.`,
    rules: [
      {
        english:
          'A khabariyyah (informative) used in place of an amr/nahy creates more emphasis — it presents the instruction as an established fact, not as a choice.',
      },
      {
        english:
          'An insha\'iyyah (performative) can be used in place of a khabariyyah to create emphasis through stylistic variation.',
      },
    ],
    examples: [
      {
        arabic: '﴿لَا تَسْفِكُوْنَ دِمَآءَكُمْ وَلَا تُخْرِجُوْنَ اَنْفُسَكُمْ مِنْ دِيَارِكُمْ﴾',
        translation: 'You shall not shed the blood of one another, and you shall not drive one another out of your homes.',
        source: 'Quran 2:84',
        analysis: 'Khabariyyah used as nahy (prohibition) — presents the prohibition as a factual statement for emphasis.',
      },
      {
        arabic: '﴿فَلَا رَفَثَ وَلَا فُسُوْقَ وَلَا جِدَالَ فِي الْحَجِّ﴾',
        translation: 'There should be no obscenity, no sin, and no quarrel in Hajj.',
        source: 'Quran 2:197',
        analysis: 'Ismiyyah khabariyyah used as nahy — the negation is stated as fact.',
      },
      {
        arabic: '﴿قُلْ اَمَرَ رَبِّيْ بِالْقِسْطِ وَاَقِيْمُوْا وُجُوْهَكُمْ عِنْدَ كُلِّ مَسْجِدٍ﴾',
        translation: 'My Lord has commanded justice and that you should face Him only during prayers.',
        source: 'Quran 7:29',
        analysis: 'Insha\'iyyah used in place of khabariyyah — stylistic variation creates emphasis on the second command.',
      },
    ],
    sourceRef: 'First Steps to Understanding Balagah, Hashim Mohamed',
  },
  relatedTopicIds: ['khabariyyah', 'amr'],
  tags: ['maani', 'interchange', 'khabariyyah', 'inshaiyyah', 'emphasis'],
};
