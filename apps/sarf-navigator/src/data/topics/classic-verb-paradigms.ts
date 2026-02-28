import type { SarfTopic } from '../types';

// ============================================================================
// Topic 5: The Six Doors of the Bare Trilateral (Abwaab ath-Thulaathi al-Mujarrad)
// ============================================================================

export const clSixTrilateralDoors: SarfTopic = {
  id: 'cl-six-trilateral-doors',
  titleAr: 'أبواب الثلاثي المجرد',
  titleEn: 'Six Trilateral Doors',
  transliteration: 'Abwaab ath-Thulaathi al-Mujarrad',
  categoryId: 'cl-verb-paradigms',
  subcategoryId: 'cl-bare-trilateral',
  levels: [
    {
      difficulty: 'beginner',
      summary:
        'The bare trilateral verb has six paradigms (abwaab) distinguished by the vowel pattern of the past and present tenses. These six doors are the foundation of all Arabic verb conjugation.',
      body: `## The Six Doors of the Bare Trilateral (أبواب الثلاثي المجرد)

There are **six paradigms** (أبواب / abwaab) for the unaugmented trilateral verb, distinguished by the **vowel on the middle letter** ('ayn al-kalima) in the past and present tenses:

### Baab 1: فَعَلَ يَفْعُلُ (Fatha-Damma)
Example: **نَصَرَ يَنْصُرُ** — he helped / he helps

### Baab 2: فَعَلَ يَفْعِلُ (Fatha-Kasra)
Example: **ضَرَبَ يَضْرِبُ** — he struck / he strikes

### Baab 3: فَعَلَ يَفْعَلُ (Fatha-Fatha)
Example: **فَتَحَ يَفْتَحُ** — he opened / he opens

### Baab 4: فَعِلَ يَفْعَلُ (Kasra-Fatha)
Example: **سَمِعَ يَسْمَعُ** — he heard / he hears

### Baab 5: فَعُلَ يَفْعُلُ (Damma-Damma)
Example: **حَسُنَ يَحْسُنُ** — he was good / he is good

### Baab 6: فَعِلَ يَفْعِلُ (Kasra-Kasra)
Example: **حَسِبَ يَحْسِبُ** — he reckoned / he reckons

The key is the **vowel on the 'ayn** in both the past (ماضٍ) and present (مضارع) tenses. Three possible vowels (fatha, kasra, damma) combine into these six patterns.`,
      rules: [
        {
          arabic: 'الثلاثي المجرد له ستة أبواب',
          english:
            'The bare trilateral verb has six paradigms (doors), each defined by its past-present vowel pattern on the middle radical.',
          examples: [
            { arabic: 'نَصَرَ يَنْصُرُ', translation: 'he helped / he helps — Baab 1 (fatha-damma)' },
            { arabic: 'ضَرَبَ يَضْرِبُ', translation: 'he struck / he strikes — Baab 2 (fatha-kasra)' },
            { arabic: 'فَتَحَ يَفْتَحُ', translation: 'he opened / he opens — Baab 3 (fatha-fatha)' },
          ],
        },
      ],
      tables: [
        {
          title: 'The Six Doors of the Bare Trilateral',
          titleAr: 'أبواب الثلاثي المجرد الستة',
          headers: ['Baab #', 'Past Pattern', 'Present Pattern', 'Arabic Pattern', 'Example'],
          rows: [
            ['1', 'fa\'ala', 'yaf\'ulu', 'فَعَلَ يَفْعُلُ', 'نَصَرَ يَنْصُرُ (he helped)'],
            ['2', 'fa\'ala', 'yaf\'ilu', 'فَعَلَ يَفْعِلُ', 'ضَرَبَ يَضْرِبُ (he struck)'],
            ['3', 'fa\'ala', 'yaf\'alu', 'فَعَلَ يَفْعَلُ', 'فَتَحَ يَفْتَحُ (he opened)'],
            ['4', 'fa\'ila', 'yaf\'alu', 'فَعِلَ يَفْعَلُ', 'سَمِعَ يَسْمَعُ (he heard)'],
            ['5', 'fa\'ula', 'yaf\'ulu', 'فَعُلَ يَفْعُلُ', 'حَسُنَ يَحْسُنُ (he was good)'],
            ['6', 'fa\'ila', 'yaf\'ilu', 'فَعِلَ يَفْعِلُ', 'حَسِبَ يَحْسِبُ (he reckoned)'],
          ],
        },
      ],
      sourceRef: 'As-Sughra fi at-Tasreef, Maqsid 1, Section 2 (Baab 2, Fasl 1)',
    },
    {
      difficulty: 'intermediate',
      summary:
        'Al-Wusta details each of the six doors with their typical semantic meanings, transitivity patterns, and conditions. Baab 1 is associated with competition, Baab 3 requires a throat letter, Baab 4 is for qualities and states, Baab 5 is always intransitive (innate nature), and Baab 6 contains only specific limited words.',
      body: `## Detailed Analysis of the Six Doors

Al-Wusta provides semantic analysis and usage conditions for each door:

### Baab 1: فَعَلَ يَفْعُلُ (Fatha-Damma)
- **Example:** نَصَرَ يَنْصُرُ (he helped / he helps)
- **Typical meaning:** مُغَالَبَة (mughaalaba — competition/contesting)
- Example: فَاصَلْتُهُ فَفَصَلْتُهُ — "I competed with him in separating, and I prevailed"

### Baab 2: فَعَلَ يَفْعِلُ (Fatha-Kasra)
- **Example:** ضَرَبَ يَضْرِبُ (he struck / he strikes)
- No specific semantic restriction is given for this door.

### Baab 3: فَعَلَ يَفْعَلُ (Fatha-Fatha)
- **Example:** فَتَحَ يَفْتَحُ (he opened / he opens)
- **Condition:** The 'ayn or lam of the verb must be one of the **six throat letters** (حروف الحلق): ح، خ، ع، غ، ه، ء
- **Exception (شاذ):** أَبَى يَأْبَى (he refused) — irregular, lacking a throat letter
- **Typical meaning:** Usually transitive. Example: فَتَحَ زَيْدٌ البَابَ ("Zayd opened the door"). Can also be intransitive: ذَهَبَ زَيْدٌ ("Zayd went").

### Baab 4: فَعِلَ يَفْعَلُ (Kasra-Fatha)
- **Example:** سَمِعَ يَسْمَعُ (he heard / he hears)
- **Typical meaning:** Usually intransitive, for **qualities and states** (صفات):
  - **Permanent qualities (ملازمة):** عَرِجَ (he became lame)
  - **Temporary states (عارضة):** مَرِضَ (he became sick), عَطِشَ (he became thirsty)
- Can also be transitive: سَمِعَ زَيْدٌ الأَذَانَ ("Zayd heard the adhaan")

### Baab 5: فَعُلَ يَفْعُلُ (Damma-Damma)
- **Example:** حَسُنَ يَحْسُنُ (he became good / he becomes good)
- **Always intransitive** (لازم دائمًا). Used for:
  - **Natural dispositions (أفعال الطبائع):** كَرُمَ (he became noble), حَسُنَ (he became good)
  - **Acquired nature:** فَقُهَ (he became a person of deep understanding)
- **Rare transitive (شاذ):** رَحُبَتْكَ الدَّارُ ("The house became spacious for you")

### Baab 6: فَعِلَ يَفْعِلُ (Kasra-Kasra)
- **Example:** حَسِبَ يَحْسِبُ (he reckoned / he reckons)
- **Contains limited, specific words** (كلمات معينة):
  - **Sound verbs:** حَسِبَ (he reckoned), نَعِمَ (he enjoyed blessings)
  - **Waawi weak verbs:** وَرِثَ (he inherited), وَرِعَ (he was pious), وَلِيَ (he was close), وَطِئَ (he stepped on), and others
  - **Yaa'i weak verbs:** يَئِسَ (he despaired), يَبِسَ (he dried up)`,
      rules: [
        {
          arabic: 'باب فَعَلَ يَفْعُلُ يختص بمعنى المغالبة',
          english:
            'Baab 1 (fa\'ala yaf\'ulu) is typically associated with the meaning of competition/contesting (mughaalaba).',
          examples: [
            {
              arabic: 'فَاصَلْتُهُ فَفَصَلْتُهُ',
              translation: 'I competed with him in separating and I prevailed',
            },
          ],
        },
        {
          arabic: 'باب فَعَلَ يَفْعَلُ يشترط فيه أن تكون عين الفعل أو لامه حرف حلق',
          english:
            'Baab 3 (fa\'ala yaf\'alu) requires that the middle or final root letter be one of the six throat letters: haa\', khaa\', \'ayn, ghayn, haa\', hamza.',
          examples: [
            {
              arabic: 'فَتَحَ يَفْتَحُ',
              translation: 'he opened — the ح (haa\') is a throat letter',
            },
            {
              arabic: 'أَبَى يَأْبَى',
              translation: 'he refused — irregular exception with no throat letter (shaadhdh)',
            },
          ],
        },
        {
          arabic: 'باب فَعُلَ يَفْعُلُ لازم دائمًا ويدل على الطبائع',
          english:
            'Baab 5 (fa\'ula yaf\'ulu) is always intransitive and denotes innate natural dispositions (af\'aal at-tabaa\'i\').',
          examples: [
            { arabic: 'كَرُمَ', translation: 'he became noble — innate quality' },
            { arabic: 'حَسُنَ', translation: 'he became good — innate quality' },
            { arabic: 'فَقُهَ', translation: 'he became deeply understanding — acquired nature' },
          ],
        },
        {
          arabic: 'باب فَعِلَ يَفْعِلُ يشتمل على كلمات معينة محدودة',
          english:
            'Baab 6 (fa\'ila yaf\'ilu) contains only specific, limited words. It includes sound verbs like hasiba and na\'ima, plus certain waawi and yaa\'i weak verbs.',
          examples: [
            { arabic: 'حَسِبَ يَحْسِبُ', translation: 'he reckoned — sound verb' },
            { arabic: 'وَرِثَ يَرِثُ', translation: 'he inherited — waawi weak verb' },
            { arabic: 'يَئِسَ يَيْئِسُ', translation: 'he despaired — yaa\'i weak verb' },
          ],
        },
      ],
      tables: [
        {
          title: 'Six Doors with Semantic Meanings',
          titleAr: 'الأبواب الستة مع معانيها',
          headers: ['Baab', 'Pattern', 'Example', 'Typical Meaning', 'Transitivity'],
          rows: [
            ['1', 'فَعَلَ يَفْعُلُ', 'نَصَرَ يَنْصُرُ', 'Competition (مغالبة)', 'Both'],
            ['2', 'فَعَلَ يَفْعِلُ', 'ضَرَبَ يَضْرِبُ', 'General', 'Both'],
            ['3', 'فَعَلَ يَفْعَلُ', 'فَتَحَ يَفْتَحُ', 'Requires throat letter', 'Usually transitive'],
            ['4', 'فَعِلَ يَفْعَلُ', 'سَمِعَ يَسْمَعُ', 'Qualities/states (صفات)', 'Usually intransitive'],
            ['5', 'فَعُلَ يَفْعُلُ', 'حَسُنَ يَحْسُنُ', 'Innate nature (طبائع)', 'Always intransitive'],
            ['6', 'فَعِلَ يَفْعِلُ', 'حَسِبَ يَحْسِبُ', 'Limited specific words', 'Both'],
          ],
        },
      ],
      sourceRef: 'Al-Wusta fi at-Tasreef, Maqsid 1, Baab 2, Fasl 1',
    },
  ],
  relatedTopicIds: ['cl-foundational-principles', 'cl-augmented-one'],
  tags: [
    'abwab',
    'doors',
    'trilateral',
    'mujarrad',
    "fa'ala",
    "fa'ila",
    "fa'ula",
    'fataha',
    'kasara',
    'damma',
  ],
};

// ============================================================================
// Topic 6: Augmented by One Letter (ath-Thulaathi al-Mazeed bi-Harf)
// ============================================================================

export const clAugmentedOne: SarfTopic = {
  id: 'cl-augmented-one',
  titleAr: 'الثلاثي المزيد بحرف',
  titleEn: 'Augmented by One Letter',
  transliteration: 'ath-Thulaathi al-Mazeed bi-Harf',
  categoryId: 'cl-verb-paradigms',
  subcategoryId: 'cl-augmented-trilateral',
  levels: [
    {
      difficulty: 'beginner',
      summary:
        'Three verb patterns are formed by adding one letter to the bare trilateral root: Taf\'eel (فَعَّلَ), Mufaa\'alah (فَاعَلَ), and If\'aal (أَفْعَلَ). These correspond to Forms II, III, and IV in Western sarf terminology.',
      body: `## Augmented by One Letter (المزيد بحرف واحد)

When **one letter** is added to the bare trilateral root, three patterns (doors) result:

### Baab 1: Taf'eel (تفعيل) — Form II
**Pattern:** فَعَّلَ يُفَعِّلُ تَفْعِيلًا
**Example:** فَرَّحَ يُفَرِّحُ تَفْرِيحًا — "he gladdened / he gladdens / gladdening"
The added element is the **doubling** (tashdeed) of the middle radical.

### Baab 2: Mufaa'alah (مفاعلة) — Form III
**Pattern:** فَاعَلَ يُفَاعِلُ مُفَاعَلَةً
**Example:** قَاتَلَ يُقَاتِلُ مُقَاتَلَةً — "he fought / he fights / fighting"
The added letter is an **alif** after the first radical.
Additional masdar forms: قِتَالًا (qitaalan) and قِيتَالًا (qeetaalan).

### Baab 3: If'aal (إفعال) — Form IV
**Pattern:** أَفْعَلَ يُفْعِلُ إِفْعَالًا
**Example:** أَكْرَمَ يُكْرِمُ إِكْرَامًا — "he honoured / he honours / honouring"
The added letter is a **hamza** before the first radical.`,
      rules: [
        {
          arabic: 'المزيد بحرف واحد ثلاثة أبواب: تفعيل ومفاعلة وإفعال',
          english:
            'Adding one letter to the trilateral root produces three patterns: Taf\'eel (doubling), Mufaa\'alah (alif insertion), and If\'aal (hamza prefix).',
          examples: [
            { arabic: 'فَرَّحَ يُفَرِّحُ تَفْرِيحًا', translation: 'he gladdened — Taf\'eel (Form II)' },
            { arabic: 'قَاتَلَ يُقَاتِلُ مُقَاتَلَةً', translation: 'he fought — Mufaa\'alah (Form III)' },
            { arabic: 'أَكْرَمَ يُكْرِمُ إِكْرَامًا', translation: 'he honoured — If\'aal (Form IV)' },
          ],
        },
      ],
      tables: [
        {
          title: 'Three Patterns of One-Letter Augmentation',
          titleAr: 'أبواب المزيد بحرف واحد',
          headers: ['Baab', 'Name', 'Past', 'Present', 'Masdar', 'Example'],
          rows: [
            ['1', 'Taf\'eel (تفعيل)', 'فَعَّلَ', 'يُفَعِّلُ', 'تَفْعِيلًا', 'فَرَّحَ (he gladdened)'],
            ['2', 'Mufaa\'alah (مفاعلة)', 'فَاعَلَ', 'يُفَاعِلُ', 'مُفَاعَلَةً', 'قَاتَلَ (he fought)'],
            ['3', 'If\'aal (إفعال)', 'أَفْعَلَ', 'يُفْعِلُ', 'إِفْعَالًا', 'أَكْرَمَ (he honoured)'],
          ],
        },
      ],
      sourceRef: 'As-Sughra fi at-Tasreef, Maqsid 1, Section 3 (Category 1)',
    },
    {
      difficulty: 'intermediate',
      summary:
        'Al-Wusta details the semantic meanings of each form: Taf\'eel has 8 meanings (causation, intensification, attribution, removal, etc.), Mufaa\'alah primarily indicates mutual participation, and If\'aal has 10 meanings (causation, removal, entering a time/place, becoming, finding, etc.).',
      body: `## Detailed Semantic Analysis of the Three One-Letter Augmented Forms

### Taf'eel (تفعيل) — Form II: 8 Meanings

1. **التعدية (Causation):** Making an intransitive verb transitive.
   - فَرِحَ الابنُ وَفَرَّحَ الرَّجُلُ ابْنَهُ — "The son was happy" becomes "The man made his son happy"
   - Can also add a second object: عَلِمَ → عَلَّمَ ("he knew" → "he taught")

2. **التصيير (Making into):** Making the object possess a quality.
   - وَكَفَّلَهَا زَكَرِيَّا — "He made Zakariyya her guardian" (Quranic)

3. **المبالغة (Intensification):** Emphasis and repetition.
   - طَوَّفَ زَيْدٌ الكَعْبَةَ — "Zayd circumambulated the Ka'ba extensively"
   - مَوَّتَ الإِبِلُ — "The camels died in great numbers" (intensity in the doer)
   - غَلَّقَ زَيْدٌ الأَبْوَابَ — "Zayd locked all the doors" (intensity in the object)

4. **النسبة (Attribution):** Attributing the verb's meaning to the object.
   - فَسَّقَهُ وَكَفَّرَهُ — "he declared him a faasiq / kaafir"

5. **الاتخاذ (Taking as):** Taking the object as possessing the meaning.
   - عَبَّدَهُ — "he took him as a slave"

6. **الوقت (Time):** Indicating a time of action.
   - غَلَّسَ بِالفَجْرِ — "he came at dawn"

7. **الإزالة (Removal):** Removing the meaning from the object.
   - قَشَّرْتُ التُّفَّاحَةَ — "I peeled the apple"

8. **حكاية الكلمة المركبة (Quoting compound phrases):**
   - هَلَّلَ — "he said laa ilaaha illallaah"; also كَبَّرَ / سَبَّحَ / حَمَّدَ / أَمَّنَ

**Other masdar forms:** فَعَال (سَلَام), تَفْعِلَة (تَكْمِلَة), فِعَّال (كِذَّاب), تَفْعَال (تَكْرَار)

### Mufaa'alah (مفاعلة) — Form III: 2 Main Meanings

1. **المشاركة (Mutual participation):** Both the doer and the object share in the action; the doer initiates.
   - قَاتَلَ زَيْدٌ عَمْرًا — "Zayd fought 'Amr" (both participate in fighting)

2. **المبالغة (Exaggeration without participation):**
   - ضَاعَفَ — "he multiplied/doubled"

**Note:** فَاعَلَ may have independent meaning: سَافَرَ — "he travelled" (no mutual participation)

### If'aal (إفعال) — Form IV: 10 Meanings

1. **التعدية (Causation):** جَلَسَ → أَجْلَسَ ("he sat" → "he seated")
2. **التصيير (Causing to become):** وَآمَنَهُم مِّنْ خَوْفٍ ("and secured them from fear" — Quranic)
3. **الإزالة (Removal):** أَعْجَمَ الكِتَابَ ("he removed ambiguity from the book")
4. **السلب (Stripping/Negating):** أَقْسَطَ الحَاكِمُ ("The judge was just" — removed injustice)
5. **الدخول (Entering):** أَصْبَحَ (entered the morning), أَمْصَرَ (entered the city)
6. **العرض (Exposing):** أَبَعْتُ الثَّوْبَ ("I offered the garment for sale")
7. **الصيرورة (Becoming):** أَثْمَرَ البُسْتَانُ ("The garden bore fruit")
8. **المصادفة (Finding):** أَحْصَدَ الزَّرْعُ ("The crop was found ready for harvest")
9. **الاستحقاق (Deserving):** أَحْصَدَ الزَّرْعَ ("The crop deserved harvesting")
10. **المطاوعة (Compliance/Result):** كَبَبْتُهُ عَلَى وَجْهِهِ فَأَكَبَّ ("I flipped him on his face, so he fell face-down")

**Important:** المُطَاوَعَة (compliance) is the reverse of ta'diya — it makes a transitive verb intransitive.`,
      rules: [
        {
          arabic: 'فَعَّلَ له ثمانية معانٍ أبرزها التعدية والمبالغة والإزالة',
          english:
            'Taf\'eel (Form II) has eight meanings, the most prominent being causation (ta\'diya), intensification (mubalagha), and removal (izaala).',
          examples: [
            {
              arabic: 'فَرِحَ → فَرَّحَ',
              translation: 'was happy → made happy — causation (ta\'diya)',
            },
            {
              arabic: 'غَلَّقَ الأَبْوَابَ',
              translation: 'he locked all the doors — intensification (mubalagha)',
            },
            {
              arabic: 'قَشَّرَ التُّفَّاحَةَ',
              translation: 'he peeled the apple — removal (izaala)',
            },
          ],
        },
        {
          arabic: 'فَاعَلَ يدل في الأغلب على المشاركة بين الفاعل والمفعول',
          english:
            'Mufaa\'alah (Form III) primarily indicates mutual participation between the doer and the object, with the doer being the initiator.',
          examples: [
            {
              arabic: 'قَاتَلَ زَيْدٌ عَمْرًا',
              translation: 'Zayd fought Amr — both participate in fighting',
            },
          ],
        },
        {
          arabic: 'أَفْعَلَ له عشرة معانٍ أبرزها التعدية والصيرورة والدخول',
          english:
            'If\'aal (Form IV) has ten meanings, the most prominent being causation (ta\'diya), becoming (sayrooraa), and entering (dukhool).',
          examples: [
            { arabic: 'أَجْلَسَ', translation: 'he seated — causation (from jalasa, he sat)' },
            { arabic: 'أَثْمَرَ', translation: 'bore fruit — becoming (sayrooraa)' },
            { arabic: 'أَصْبَحَ', translation: 'he entered the morning — entering a time (dukhool)' },
          ],
        },
      ],
      tables: [
        {
          title: 'Meanings of Taf\'eel (Form II)',
          titleAr: 'معاني باب التفعيل',
          headers: ['#', 'Meaning', 'Arabic Term', 'Example'],
          rows: [
            ['1', 'Causation', 'التعدية', 'فَرَّحَ — he made happy'],
            ['2', 'Making into', 'التصيير', 'كَفَّلَ — he made a guardian'],
            ['3', 'Intensification', 'المبالغة', 'غَلَّقَ — he locked (all doors)'],
            ['4', 'Attribution', 'النسبة', 'كَفَّرَ — he declared a kaafir'],
            ['5', 'Taking as', 'الاتخاذ', 'عَبَّدَ — he took as a slave'],
            ['6', 'Time', 'الوقت', 'غَلَّسَ — he came at dawn'],
            ['7', 'Removal', 'الإزالة', 'قَشَّرَ — he peeled'],
            ['8', 'Quoting phrases', 'حكاية الكلمة المركبة', 'هَلَّلَ — he said "la ilaha illallah"'],
          ],
        },
        {
          title: 'Meanings of If\'aal (Form IV)',
          titleAr: 'معاني باب الإفعال',
          headers: ['#', 'Meaning', 'Arabic Term', 'Example'],
          rows: [
            ['1', 'Causation', 'التعدية', 'أَجْلَسَ — he seated'],
            ['2', 'Causing to become', 'التصيير', 'آمَنَ — he secured'],
            ['3', 'Removal', 'الإزالة', 'أَعْجَمَ — he removed ambiguity'],
            ['4', 'Stripping/Negating', 'السلب', 'أَقْسَطَ — he was just'],
            ['5', 'Entering', 'الدخول', 'أَصْبَحَ — he entered the morning'],
            ['6', 'Exposing', 'العرض', 'أَبَاعَ — he offered for sale'],
            ['7', 'Becoming', 'الصيرورة', 'أَثْمَرَ — bore fruit'],
            ['8', 'Finding', 'المصادفة', 'أَحْصَدَ — found ready for harvest'],
            ['9', 'Deserving', 'الاستحقاق', 'أَحْصَدَ — deserved harvesting'],
            ['10', 'Compliance', 'المطاوعة', 'أَكَبَّ — he fell face-down'],
          ],
        },
      ],
      sourceRef: 'Al-Wusta fi at-Tasreef, Muqaddimah, Maqsid 1 (Baab 2, Fasl 1, Category 1)',
    },
  ],
  relatedTopicIds: ['cl-six-trilateral-doors', 'cl-augmented-two'],
  tags: [
    "taf'eel",
    "mufaa'ala",
    "if'aal",
    'form II',
    'form III',
    'form IV',
    'mazeed',
  ],
};

// ============================================================================
// Topic 7: Augmented by Two Letters (ath-Thulaathi al-Mazeed bi-Harfayn)
// ============================================================================

export const clAugmentedTwo: SarfTopic = {
  id: 'cl-augmented-two',
  titleAr: 'الثلاثي المزيد بحرفين',
  titleEn: 'Augmented by Two Letters',
  transliteration: 'ath-Thulaathi al-Mazeed bi-Harfayn',
  categoryId: 'cl-verb-paradigms',
  subcategoryId: 'cl-augmented-trilateral',
  levels: [
    {
      difficulty: 'beginner',
      summary:
        'Five verb patterns are formed by adding two letters to the bare trilateral root: Tafa\'\'ul (تَفَعُّل), Tafaa\'ul (تَفَاعُل), Infi\'aal (اِنْفِعَال), Ifti\'aal (اِفْتِعَال), and If\'ilaal (اِفْعِلَال). These correspond to Forms V through IX.',
      body: `## Augmented by Two Letters (المزيد بحرفين)

When **two letters** are added to the bare trilateral root, five patterns result:

### Baab 1: Tafa''ul (تَفَعُّل) — Form V
**Pattern:** تَفَعَّلَ يَتَفَعَّلُ تَفَعُّلًا
**Example:** تَكَلَّمَ يَتَكَلَّمُ تَكَلُّمًا — "he spoke / he speaks / speaking"
Added: **تا** (ta) before the root + **doubling** of the middle radical.

### Baab 2: Tafaa'ul (تَفَاعُل) — Form VI
**Pattern:** تَفَاعَلَ يَتَفَاعَلُ تَفَاعُلًا
**Example:** تَبَاعَدَ يَتَبَاعَدُ تَبَاعُدًا — "he kept away / he keeps away / keeping away"
Added: **تا** (ta) before the root + **alif** after the first radical.

### Baab 3: Infi'aal (اِنْفِعَال) — Form VII
**Pattern:** اِنْفَعَلَ يَنْفَعِلُ اِنْفِعَالًا
**Example:** اِنْكَسَرَ يَنْكَسِرُ اِنْكِسَارًا — "it broke / it breaks / breaking"
Added: **ان** (alif-noon) before the root.

### Baab 4: Ifti'aal (اِفْتِعَال) — Form VIII
**Pattern:** اِفْتَعَلَ يَفْتَعِلُ اِفْتِعَالًا
**Example:** اِجْتَمَعَ يَجْتَمِعُ اِجْتِمَاعًا — "they gathered / they gather / gathering"
Added: **همزة** (hamza) before the root + **تا** (ta) after the first radical.

### Baab 5: If'ilaal (اِفْعِلَال) — Form IX
**Pattern:** اِفْعَلَّ يَفْعَلُّ اِفْعِلَالًا
**Example:** اِحْمَرَّ يَحْمَرُّ اِحْمِرَارًا — "it became red / it becomes red / becoming red"
Added: **همزة** (hamza) before the root + **doubling** of the last radical.`,
      rules: [
        {
          arabic: 'المزيد بحرفين خمسة أبواب',
          english:
            'Adding two letters to the trilateral root produces five patterns: Tafa\'\'ul, Tafaa\'ul, Infi\'aal, Ifti\'aal, and If\'ilaal (Forms V-IX).',
          examples: [
            { arabic: 'تَكَلَّمَ يَتَكَلَّمُ تَكَلُّمًا', translation: 'he spoke — Tafa\'\'ul (Form V)' },
            { arabic: 'تَبَاعَدَ يَتَبَاعَدُ تَبَاعُدًا', translation: 'he kept away — Tafaa\'ul (Form VI)' },
            { arabic: 'اِنْكَسَرَ يَنْكَسِرُ اِنْكِسَارًا', translation: 'it broke — Infi\'aal (Form VII)' },
            { arabic: 'اِجْتَمَعَ يَجْتَمِعُ اِجْتِمَاعًا', translation: 'they gathered — Ifti\'aal (Form VIII)' },
            { arabic: 'اِحْمَرَّ يَحْمَرُّ اِحْمِرَارًا', translation: 'it became red — If\'ilaal (Form IX)' },
          ],
        },
      ],
      tables: [
        {
          title: 'Five Patterns of Two-Letter Augmentation',
          titleAr: 'أبواب المزيد بحرفين الخمسة',
          headers: ['Baab', 'Name', 'Past', 'Present', 'Masdar', 'Example'],
          rows: [
            ['1', 'Tafa\'\'ul (تفعّل)', 'تَفَعَّلَ', 'يَتَفَعَّلُ', 'تَفَعُّلًا', 'تَكَلَّمَ (he spoke)'],
            ['2', 'Tafaa\'ul (تفاعل)', 'تَفَاعَلَ', 'يَتَفَاعَلُ', 'تَفَاعُلًا', 'تَبَاعَدَ (he kept away)'],
            ['3', 'Infi\'aal (انفعال)', 'اِنْفَعَلَ', 'يَنْفَعِلُ', 'اِنْفِعَالًا', 'اِنْكَسَرَ (it broke)'],
            ['4', 'Ifti\'aal (افتعال)', 'اِفْتَعَلَ', 'يَفْتَعِلُ', 'اِفْتِعَالًا', 'اِجْتَمَعَ (they gathered)'],
            ['5', 'If\'ilaal (افعلال)', 'اِفْعَلَّ', 'يَفْعَلُّ', 'اِفْعِلَالًا', 'اِحْمَرَّ (it became red)'],
          ],
        },
      ],
      sourceRef: 'As-Sughra fi at-Tasreef, Maqsid 1, Section 3 (Category 2)',
    },
    {
      difficulty: 'intermediate',
      summary:
        'Al-Wusta details the semantic meanings of each form: Tafa\'\'ul has 9 meanings including striving and avoidance, Tafaa\'ul has 5 meanings centered on mutual action and pretending, Infi\'aal indicates compliance/passivity, Ifti\'aal has 4 meanings including mutual participation and taking, and If\'ilaal is specialized for colors and physical defects.',
      body: `## Detailed Semantic Analysis of the Five Two-Letter Augmented Forms

### Tafa''ul (تَفَعُّل) — Form V: 9 Meanings

1. **التكلف (Striving/Exertion):** Obtaining the meaning gradually.
   - تَعَلَّمْتُ العِلْمَ مَسْأَلَةً بَعْدَ مَسْأَلَةٍ — "I learned knowledge, question by question"
2. **المعاناة (Undergoing difficulty):** تَشَجَّعَ — "he tried to be brave"
3. **المطاوعة (Compliance with فَعَّلَ):** نَزَّلَهُ فَتَنَزَّلَ — "He sent it down, so it came down"
4. **التعدية (Making transitive):** تَعَلَّمَ (from 'alima); تَوَسَّدَ — "he used as a pillow"
5. **التجنب (Avoidance):** تَأَثَّمَ — "he avoided sin"
6. **الصيرورة (Becoming):** تَنَصَّرَ — "he became a Christian"; تَهَوَّدَ / تَمَجَّسَ
7. **الانتساب (Self-attribution):** تَمَصَّرَ — "he claimed to be Egyptian"
8. **الطلب (Seeking):** تَكَبَّرَ — "he sought greatness / acted arrogantly"
9. **المبالغة (Exaggeration):** تَوَلَّى — "he turned away completely"

### Tafaa'ul (تَفَاعُل) — Form VI: 5 Meanings

1. **المشاركة (Mutual participation):** تَبَاعَدَ زَيْدٌ عَنْ عَمْرٍو — mutual distancing; تَصَالَحَ القَوْمُ — "the people reconciled"
2. **المبالغة (Exaggeration):** تَعَالَى — "He is highly exalted"
3. **الإيهام (Pretending/Feigning):** تَجَاهَلْتُ — "I pretended to be ignorant"
4. **المطاوعة (Compliance with فَاعَلَ):** بَاعَدَهُ فَتَبَاعَدَ — "He distanced him, so he became distant"
5. **الطلب (Seeking):** تَرَاءَى — "he sought to see / tried to see"

### Infi'aal (اِنْفِعَال) — Form VII: Compliance/Passivity

**Primary meaning:** المطاوعة (al-mutaawa'a) — the result of a transitive verb acting on its object.
- Compliance of mujarrad: كَسَرْتُ الزُّجَاجَ فَانْكَسَرَ — "I broke the glass, so it broke"
- Compliance of af'ala: أَطْلَقَهُ فَانْطَلَقَ — "He released him, so he went free"

**Note:** May sometimes be independent: اِنْكَدَرَ — "it fell/scattered"; اِنْطَلَقَ — "he set off"

### Ifti'aal (اِفْتِعَال) — Form VIII: 4 Meanings

1. **المطاوعة (Compliance):** For various verb forms:
   - Of mujarrad: كَسَوْتُ الفَقِيرَ ثَوْبًا فَاكْتَسَى — "I clothed the poor man, so he wore the garment"
   - Of af'ala: أَوْقَدْتُ النَّارَ فَاتَّقَدَتْ — "I lit the fire, so it ignited"
   - Of fa''ala: قَرَّبْتُهُ فَاقْتَرَبَ — "I brought him close, so he drew near"
2. **الاتخاذ (Taking as):** اِخْتَتَمَ — "he sealed / put a seal"
3. **المشاركة (Mutual participation):** اِحْتَصَمَ — "they disputed" (Quranic: هٰذَانِ خَصْمَانِ اخْتَصَمُوا فِي رَبِّهِمْ)
4. **المبالغة (Intensification):** اِكْتَسَبَ — "he earned earnestly"

### If'ilaal (اِفْعِلَال) — Form IX: Colors and Physical Defects

1. **المبالغة (Intensification):** اِخْضَلَّ — "it became very lush/moist"
2. **Specialized for:**
   - **Colors (الألوان):** اِحْمَرَّ الزَّهْرُ — "The flowers became red"
   - **Physical defects (العيوب):** اِعْوَرَّ الرَّجُلُ — "The man became one-eyed"`,
      rules: [
        {
          arabic: 'تَفَعَّلَ يطاوع فَعَّلَ، وتَفَاعَلَ يطاوع فَاعَلَ',
          english:
            'Tafa\'\'ul (Form V) is the compliance/reflexive of Taf\'eel (Form II), and Tafaa\'ul (Form VI) is the compliance/reflexive of Mufaa\'alah (Form III). This means Forms V and VI express the result or effect of Forms II and III acting upon an object.',
          examples: [
            {
              arabic: 'نَزَّلَهُ فَتَنَزَّلَ',
              translation: 'He sent it down, so it came down — Form II → Form V compliance',
            },
            {
              arabic: 'بَاعَدَهُ فَتَبَاعَدَ',
              translation: 'He distanced him, so he became distant — Form III → Form VI compliance',
            },
          ],
        },
        {
          arabic: 'اِنْفَعَلَ يدل على المطاوعة — أي نتيجة وقوع الفعل على المفعول',
          english:
            'Infi\'aal (Form VII) indicates compliance/passivity — it expresses the result of a transitive action falling upon the object.',
          examples: [
            {
              arabic: 'كَسَرْتُ الزُّجَاجَ فَانْكَسَرَ',
              translation: 'I broke the glass, so it broke — result of the action',
            },
          ],
        },
        {
          arabic: 'اِفْعَلَّ يختص بالألوان والعيوب',
          english:
            'If\'ilaal (Form IX) is specialized for colors (alwaan) and physical defects (\'uyoob).',
          examples: [
            { arabic: 'اِحْمَرَّ', translation: 'it became red — color' },
            { arabic: 'اِعْوَرَّ', translation: 'he became one-eyed — physical defect' },
          ],
        },
      ],
      tables: [
        {
          title: 'Meanings of Tafa\'\'ul (Form V)',
          titleAr: 'معاني باب التفعّل',
          headers: ['#', 'Meaning', 'Arabic Term', 'Example'],
          rows: [
            ['1', 'Striving', 'التكلف', 'تَعَلَّمَ — he learned (gradually)'],
            ['2', 'Difficulty', 'المعاناة', 'تَشَجَّعَ — he tried to be brave'],
            ['3', 'Compliance (of فَعَّلَ)', 'المطاوعة', 'تَنَزَّلَ — it came down'],
            ['4', 'Making transitive', 'التعدية', 'تَعَلَّمَ — he learned (took knowledge)'],
            ['5', 'Avoidance', 'التجنب', 'تَأَثَّمَ — he avoided sin'],
            ['6', 'Becoming', 'الصيرورة', 'تَنَصَّرَ — he became a Christian'],
            ['7', 'Self-attribution', 'الانتساب', 'تَمَصَّرَ — he claimed to be Egyptian'],
            ['8', 'Seeking', 'الطلب', 'تَكَبَّرَ — he sought greatness'],
            ['9', 'Exaggeration', 'المبالغة', 'تَوَلَّى — he turned away completely'],
          ],
        },
        {
          title: 'Meanings of Tafaa\'ul (Form VI)',
          titleAr: 'معاني باب التفاعل',
          headers: ['#', 'Meaning', 'Arabic Term', 'Example'],
          rows: [
            ['1', 'Mutual participation', 'المشاركة', 'تَصَالَحَ القَوْمُ — the people reconciled'],
            ['2', 'Exaggeration', 'المبالغة', 'تَعَالَى — He is highly exalted'],
            ['3', 'Pretending', 'الإيهام', 'تَجَاهَلَ — he pretended to be ignorant'],
            ['4', 'Compliance (of فَاعَلَ)', 'المطاوعة', 'تَبَاعَدَ — he became distant'],
            ['5', 'Seeking', 'الطلب', 'تَرَاءَى — he tried to see'],
          ],
        },
        {
          title: 'Compliance Patterns (Form VII & VIII)',
          titleAr: 'أنماط المطاوعة',
          headers: ['Source Form', 'Compliance Form', 'Example'],
          rows: [
            ['فَعَلَ (mujarrad)', 'اِنْفَعَلَ (Form VII)', 'كَسَرَ → اِنْكَسَرَ (he broke → it broke)'],
            ['أَفْعَلَ (Form IV)', 'اِنْفَعَلَ (Form VII)', 'أَطْلَقَ → اِنْطَلَقَ (he released → he went free)'],
            ['فَعَلَ (mujarrad)', 'اِفْتَعَلَ (Form VIII)', 'كَسَا → اِكْتَسَى (he clothed → he wore)'],
            ['أَفْعَلَ (Form IV)', 'اِفْتَعَلَ (Form VIII)', 'أَوْقَدَ → اِتَّقَدَ (he lit → it ignited)'],
            ['فَعَّلَ (Form II)', 'اِفْتَعَلَ (Form VIII)', 'قَرَّبَ → اِقْتَرَبَ (he brought near → he drew near)'],
          ],
        },
      ],
      sourceRef: 'Al-Wusta fi at-Tasreef, Muqaddimah (Maqsid 1, Baab 2, Fasl 1, Category 2)',
    },
  ],
  relatedTopicIds: ['cl-augmented-one', 'cl-augmented-three'],
  tags: [
    "tafa'ul",
    "tafaa'ul",
    "infi'aal",
    "ifti'aal",
    "if'ilaal",
    'form V',
    'form VI',
    'form VII',
    'form VIII',
    'form IX',
  ],
};

// ============================================================================
// Topic 8: Augmented by Three Letters (ath-Thulaathi al-Mazeed bi-Thalaathati Ahruf)
// ============================================================================

export const clAugmentedThree: SarfTopic = {
  id: 'cl-augmented-three',
  titleAr: 'الثلاثي المزيد بثلاثة أحرف',
  titleEn: 'Augmented by Three Letters',
  transliteration: 'ath-Thulaathi al-Mazeed bi-Thalaathati Ahruf',
  categoryId: 'cl-verb-paradigms',
  subcategoryId: 'cl-augmented-trilateral',
  levels: [
    {
      difficulty: 'beginner',
      summary:
        'Four verb patterns are formed by adding three letters to the bare trilateral root: Istif\'aal (اِسْتِفْعَال / Form X), If\'eelaal (اِفْعِيلَال), If\'ee\'aal (اِفْعِيعَال), and If\'iwwaal (اِفْعِوَّال). Only Istif\'aal (Form X) is common; the other three are rare.',
      body: `## Augmented by Three Letters (المزيد بثلاثة أحرف)

When **three letters** are added to the bare trilateral root, four patterns result:

### Baab 1: Istif'aal (اِسْتِفْعَال) — Form X
**Pattern:** اِسْتَفْعَلَ يَسْتَفْعِلُ اِسْتِفْعَالًا
**Example:** اِسْتَخْرَجَ يَسْتَخْرِجُ اِسْتِخْرَاجًا — "he extracted / he extracts / extraction"
Added: **ا، س، ت** (alif, sin, ta) before the root.
This is by far the **most common** of the four patterns.

### Baab 2: If'eelaal (اِفْعِيلَال)
**Pattern:** اِفْعَالَّ يَفْعَالُّ اِفْعِيلَالًا
**Example:** اِحْمَارَّ يَحْمَارُّ اِحْمِيرَارًا — "it became very red / it becomes very red"
This is the **intensive** form of If'ilaal (Form IX). Rare.

### Baab 3: If'ee'aal (اِفْعِيعَال)
**Pattern:** اِفْعَوْعَلَ يَفْعَوْعِلُ اِفْعِيعَالًا
**Example:** اِعْشَوْشَبَ يَعْشَوْشِبُ اِعْشِيشَابًا — "it became very grassy"
Very rare, used for **intensification** (مبالغة).

### Baab 4: If'iwwaal (اِفْعِوَّال)
**Pattern:** اِفْعَوَّلَ يَفْعَوِّلُ اِفْعِوَّالًا
**Example:** اِجْلَوَّذَ يَجْلَوِّذُ اِجْلِوَّاذًا — "he hurried / he moves swiftly"
Very rare, used for **intensification** (مبالغة).`,
      rules: [
        {
          arabic: 'المزيد بثلاثة أحرف أربعة أبواب أشهرها الاستفعال',
          english:
            'Adding three letters to the trilateral root produces four patterns. The most well-known and commonly used is Istif\'aal (Form X), while the other three (If\'eelaal, If\'ee\'aal, If\'iwwaal) are rare.',
          examples: [
            { arabic: 'اِسْتَخْرَجَ يَسْتَخْرِجُ اِسْتِخْرَاجًا', translation: 'he extracted — Istif\'aal (Form X)' },
            { arabic: 'اِحْمَارَّ يَحْمَارُّ اِحْمِيرَارًا', translation: 'it became very red — If\'eelaal (rare)' },
            { arabic: 'اِعْشَوْشَبَ يَعْشَوْشِبُ اِعْشِيشَابًا', translation: 'it became very grassy — If\'ee\'aal (rare)' },
            { arabic: 'اِجْلَوَّذَ يَجْلَوِّذُ اِجْلِوَّاذًا', translation: 'he hurried — If\'iwwaal (rare)' },
          ],
        },
      ],
      tables: [
        {
          title: 'Four Patterns of Three-Letter Augmentation',
          titleAr: 'أبواب المزيد بثلاثة أحرف',
          headers: ['Baab', 'Name', 'Past', 'Present', 'Masdar', 'Example'],
          rows: [
            ['1', 'Istif\'aal (استفعال)', 'اِسْتَفْعَلَ', 'يَسْتَفْعِلُ', 'اِسْتِفْعَالًا', 'اِسْتَخْرَجَ (he extracted)'],
            ['2', 'If\'eelaal (افعيلال)', 'اِفْعَالَّ', 'يَفْعَالُّ', 'اِفْعِيلَالًا', 'اِحْمَارَّ (it became very red)'],
            ['3', 'If\'ee\'aal (افعيعال)', 'اِفْعَوْعَلَ', 'يَفْعَوْعِلُ', 'اِفْعِيعَالًا', 'اِعْشَوْشَبَ (it became grassy)'],
            ['4', 'If\'iwwaal (افعوّال)', 'اِفْعَوَّلَ', 'يَفْعَوِّلُ', 'اِفْعِوَّالًا', 'اِجْلَوَّذَ (he hurried)'],
          ],
        },
      ],
      sourceRef: 'As-Sughra fi at-Tasreef, Maqsid 1, Section 3 (Category 3)',
    },
    {
      difficulty: 'intermediate',
      summary:
        'Al-Wusta details the 5 meanings of Istif\'aal (Form X): seeking, intensification, transformation, finding, and compliance with Form IV. The three rare forms (If\'eelaal, If\'ee\'aal, If\'iwwaal) all serve intensification/hyperbole, with If\'eelaal being more emphatic than If\'ilaal (Form IX).',
      body: `## Detailed Semantic Analysis of the Three-Letter Augmented Forms

### Istif'aal (اِسْتِفْعَال) — Form X: 5 Meanings

1. **طلب الفعل (Seeking the action):** The doer requests the verb's meaning.
   - اِسْتَغْفَرَ اللهَ — "he sought forgiveness from Allah"
   - اِسْتَرْجَعَ — "he said 'inna lillahi wa inna ilayhi raaji'oon'" (narrating a phrase)

2. **المبالغة (Intensification):**
   - اِسْتَعْصَمَ — "he held firm strongly"

3. **التحول (Transformation):** Transitioning from one state to another.
   - اِسْتَنْسَرَ البُغَاثُ — "The small birds became like eagles" (the weak became strong)

4. **المصادفة (Finding):** Finding the object upon the verb's meaning.
   - اِسْتَعْظَمْتُهُ — "I found it to be great"

5. **مطاوعة أفعل (Compliance with Form IV):**
   - أَقَمْتُهُ فَاسْتَقَامَ — "I straightened it, so it became straight"

**Note:** اِسْتَفْعَلَ may sometimes replace a base trilateral in meaning:
- اِسْتَطَاعَ replaces طَاعَ — "he was able"

### If'eelaal (اِفْعِيلَال): Intensive Hyperbole

- **Primary meaning:** مُبَالَغَة (intensification/hyperbole)
- **Example:** اِحْمَارَّ زَيْدٌ — "Zayd became intensely red"
- **Key distinction:** اِفْعِيلَال is **more emphatic** (أَبْلَغ) than اِفْعِلَال (Form IX)
  - اِحْمَارَّ (intensely red) vs. اِحْمَرَّ (became red)

### If'ee'aal (اِفْعِيعَال): Intensive Hyperbole

- **Primary meaning:** مُبَالَغَة (intensification/hyperbole)
- **Example:** اِعْشَوْشَبَتِ الْأَرْضُ — "the land became abundantly grassy"

### If'iwwaal (اِفْعِوَّال): Intensive Hyperbole

- **Primary meaning:** مُبَالَغَة (intensification/hyperbole)
- **Example:** اِجْلَوَّذَ الْإِبِلُ — "the camels moved swiftly"`,
      rules: [
        {
          arabic: 'اِسْتَفْعَلَ أشهر معانيه طلب الفعل',
          english:
            'The most famous meaning of Istif\'aal (Form X) is seeking the action (talab al-fi\'l) — the doer requests the verb\'s meaning from someone or something.',
          examples: [
            {
              arabic: 'اِسْتَغْفَرَ اللهَ',
              translation: 'he sought forgiveness from Allah — seeking (talab)',
            },
            {
              arabic: 'أَقَمْتُهُ فَاسْتَقَامَ',
              translation: 'I straightened it, so it became straight — compliance with Form IV',
            },
          ],
        },
        {
          arabic: 'اِفْعِيلَال أبلغ من اِفْعِلَال في المبالغة',
          english:
            'If\'eelaal is more emphatic than If\'ilaal (Form IX). Both indicate intensification, but If\'eelaal adds an extra degree of hyperbole.',
          examples: [
            {
              arabic: 'اِحْمَرَّ → اِحْمَارَّ',
              translation: 'became red → became intensely red — If\'ilaal vs. If\'eelaal',
            },
          ],
        },
        {
          arabic: 'اِسْتَفْعَلَ قد يُغني عن الثلاثي المجرد',
          english:
            'Istif\'aal may sometimes replace a base trilateral verb in meaning, functioning independently rather than adding the usual "seeking" sense.',
          examples: [
            {
              arabic: 'اِسْتَطَاعَ',
              translation: 'he was able — replaces طَاعَ with independent meaning',
            },
          ],
        },
      ],
      tables: [
        {
          title: 'Meanings of Istif\'aal (Form X)',
          titleAr: 'معاني باب الاستفعال',
          headers: ['#', 'Meaning', 'Arabic Term', 'Example'],
          rows: [
            ['1', 'Seeking the action', 'طلب الفعل', 'اِسْتَغْفَرَ — he sought forgiveness'],
            ['2', 'Intensification', 'المبالغة', 'اِسْتَعْصَمَ — he held firm strongly'],
            ['3', 'Transformation', 'التحول', 'اِسْتَنْسَرَ — became like eagles'],
            ['4', 'Finding', 'المصادفة', 'اِسْتَعْظَمَ — he found it to be great'],
            ['5', 'Compliance (of أَفْعَلَ)', 'مطاوعة أفعل', 'اِسْتَقَامَ — it became straight'],
          ],
        },
        {
          title: 'Rare Forms: Intensive Patterns',
          titleAr: 'الأبواب النادرة: أنماط المبالغة',
          headers: ['Form', 'Pattern', 'Example', 'Meaning', 'Compared to'],
          rows: [
            ['If\'eelaal', 'اِفْعَالَّ', 'اِحْمَارَّ', 'Became intensely red', 'More emphatic than اِحْمَرَّ (Form IX)'],
            ['If\'ee\'aal', 'اِفْعَوْعَلَ', 'اِعْشَوْشَبَ', 'Became abundantly grassy', 'Intensive hyperbole'],
            ['If\'iwwaal', 'اِفْعَوَّلَ', 'اِجْلَوَّذَ', 'Moved swiftly', 'Intensive hyperbole'],
          ],
        },
      ],
      sourceRef: 'Al-Wusta fi at-Tasreef, Maqsid 1 (Part 2, pages 21-24)',
    },
  ],
  relatedTopicIds: ['cl-augmented-two', 'cl-quadrilateral-verbs'],
  tags: [
    "istif'aal",
    'form X',
    "if'iw'aal",
    "if'ii'aal",
    'rare forms',
  ],
};

// ============================================================================
// Topic 9: Quadrilateral Verbs (al-Fi'l ar-Rubaa'i)
// ============================================================================

export const clQuadrilateralVerbs: SarfTopic = {
  id: 'cl-quadrilateral-verbs',
  titleAr: 'الفعل الرباعي',
  titleEn: 'Quadrilateral Verbs',
  transliteration: "al-Fi'l ar-Rubaa'i",
  categoryId: 'cl-verb-paradigms',
  subcategoryId: 'cl-quadrilateral',
  levels: [
    {
      difficulty: 'beginner',
      summary:
        'Quadrilateral verbs have four root letters. The bare quadrilateral has one pattern (Fa\'lalah / فَعْلَلَة). The augmented quadrilateral adds one letter (Tafa\'lul / تَفَعْلُل) or two letters (If\'inlaal / اِفْعِنْلَال and If\'ilaal / اِفْعِلَال), giving a total of four patterns.',
      body: `## Quadrilateral Verbs (الفعل الرباعي)

Quadrilateral verbs have **four root letters** (الرباعي). They are divided into bare (mujarrad) and augmented (mazeed fih):

### Type 1: The Bare Quadrilateral (الرباعي المجرد) — 1 Pattern

**Fa'lalah (فَعْلَلَة):**
- **Pattern:** فَعْلَلَ يُفَعْلِلُ فَعْلَلَةً وفِعْلَالًا
- **Example:** دَحْرَجَ يُدَحْرِجُ دَحْرَجَةً ودِحْرَاجًا — "he rolled / he rolls / rolling"
- Note the two masdar forms: فَعْلَلَة and فِعْلَال.

### Type 2: The Augmented Quadrilateral (الرباعي المزيد فيه)

#### One letter added — 1 Pattern

**Tafa'lul (تَفَعْلُل):**
- **Pattern:** تَفَعْلَلَ يَتَفَعْلَلُ تَفَعْلُلًا
- **Example:** تَدَحْرَجَ يَتَدَحْرَجُ تَدَحْرُجًا — "it rolled (intransitive) / it rolls"

#### Two letters added — 2 Patterns

**If'inlaal (اِفْعِنْلَال):**
- **Pattern:** اِفْعَنْلَلَ يَفْعَنْلِلُ اِفْعِنْلَالًا
- **Example:** اِحْرَنْجَمَ يَحْرَنْجِمُ اِحْرِنْجَامًا — "they crowded together"

**If'ilaal (اِفْعِلَال — quadrilateral):**
- **Pattern:** اِفْعَلَلَّ يَفْعَلِلُّ اِفْعِلَالًا
- **Example:** اِقْشَعَرَّ يَقْشَعِرُّ اِقْشِعْرَارًا — "it shuddered / got goosebumps"`,
      rules: [
        {
          arabic: 'الرباعي المجرد له باب واحد: فَعْلَلَ',
          english:
            'The bare quadrilateral has only one pattern: Fa\'lala, with two masdar forms (fa\'lalah and fi\'laal).',
          examples: [
            {
              arabic: 'دَحْرَجَ يُدَحْرِجُ دَحْرَجَةً ودِحْرَاجًا',
              translation: 'he rolled — the standard quadrilateral verb',
            },
          ],
        },
        {
          arabic: 'الرباعي المزيد بحرف: تَفَعْلَلَ، وبحرفين: اِفْعَنْلَلَ واِفْعَلَلَّ',
          english:
            'The augmented quadrilateral has three patterns: one with one letter added (Tafa\'lul), and two with two letters added (If\'inlaal and If\'ilaal).',
          examples: [
            { arabic: 'تَدَحْرَجَ يَتَدَحْرَجُ', translation: 'it rolled (intransitive) — +1 letter' },
            { arabic: 'اِحْرَنْجَمَ يَحْرَنْجِمُ', translation: 'they crowded together — +2 letters' },
            { arabic: 'اِقْشَعَرَّ يَقْشَعِرُّ', translation: 'it shuddered — +2 letters' },
          ],
        },
      ],
      tables: [
        {
          title: 'All Quadrilateral Verb Patterns',
          titleAr: 'جميع أبواب الفعل الرباعي',
          headers: ['Category', 'Name', 'Past', 'Present', 'Masdar', 'Example'],
          rows: [
            ['Bare', 'Fa\'lalah (فعللة)', 'فَعْلَلَ', 'يُفَعْلِلُ', 'فَعْلَلَةً / فِعْلَالًا', 'دَحْرَجَ (he rolled)'],
            ['+1 letter', 'Tafa\'lul (تفعلل)', 'تَفَعْلَلَ', 'يَتَفَعْلَلُ', 'تَفَعْلُلًا', 'تَدَحْرَجَ (it rolled)'],
            ['+2 letters', 'If\'inlaal (افعنلال)', 'اِفْعَنْلَلَ', 'يَفْعَنْلِلُ', 'اِفْعِنْلَالًا', 'اِحْرَنْجَمَ (they crowded)'],
            ['+2 letters', 'If\'ilaal (افعلال)', 'اِفْعَلَلَّ', 'يَفْعَلِلُّ', 'اِفْعِلَالًا', 'اِقْشَعَرَّ (it shuddered)'],
          ],
        },
      ],
      sourceRef: 'As-Sughra fi at-Tasreef, Maqsid 1, Section 4 (Fasl 2)',
    },
    {
      difficulty: 'intermediate',
      summary:
        'Al-Wusta adds detail on the meanings of quadrilateral verb forms and introduces six mulhaq (assimilated) patterns that are trilateral roots reshaped to match the quadrilateral pattern. These include fa\'lala (with repeated lam), faw\'ala, fa\'wala, fay\'ala, fa\'eela, and fa\'laa.',
      body: `## Detailed Analysis of Quadrilateral Verbs

### The Bare Quadrilateral (الرباعي المجرد): Meanings

**Fa'lala** can be:
- **Transitive (تعدية):** دَحْرَجَ زَيْدٌ الْحَجَرَ — "Zayd rolled the stone"
- **Intransitive (لزوم):** دَرْبَخَ زَيْدٌ — "Zayd submitted/was humble"

### Six Mulhaq (Assimilated) Patterns (الملحق بالرباعي المجرد)

The concept of **إلحاق** (ilhaaq / assimilation) means making a trilateral root match the quadrilateral pattern by adding an extra letter in a way that mimics a four-letter root. There are **six** such patterns:

1. **Fa'lala (فَعْلَلَ)** — with repeated lam:
   - جَلْبَبَ يُجَلْبِبُ — "he clothed with a jilbab"
   - For **transitivity only**.

2. **Faw'ala (فَوْعَلَ)** — with added waw:
   - حَوْقَلَ يُحَوْقِلُ — "he said 'la hawla wa la quwwata illa billah'"
   - For **intransitivity only**.

3. **Fa'wala (فَعْوَلَ)** — with waw after 'ayn:
   - جَهْوَرَ يُجَهْوِرُ — "he spoke loudly"
   - For **transitivity**: جَهْوَرَ زَيْدٌ الْقُرْآنَ — "Zayd recited the Quran loudly"

4. **Fay'ala (فَيْعَلَ)** — with added ya:
   - بَيْطَرَ يُبَيْطِرُ — "he practiced veterinary medicine"
   - For **transitivity**.

5. **Fa'eela (فَعِيلَ)** — with added ya between 'ayn and lam:
   - عَيْثَرَ يُعَيْثِرُ — "he stumbled"
   - For **intransitivity**.

6. **Fa'laa (فَعْلَى)** — with added alif maqsoora:
   - سَلْقَى يُسَلْقِي — "he threw someone on their back"
   - For **transitivity**: سَلْقَيْتُ رَجُلًا — "I threw a man on his back"

### Augmented Quadrilateral: Meanings

**Tafa'lul (تَفَعْلُل)** — +1 letter:
- **Compliance/Reflexive (مطاوعة):** تَدَحْرَجَ الْحَجَرُ — "the stone rolled"
- **Hyperbole (مبالغة):** تَلَعْثَمَ — "he stammered greatly"

**If'inlaal (اِفْعِنْلَال)** — +2 letters:
- **Compliance/Reflexive (مطاوعة):** اِحْرَنْجَمَ الْإِبِلُ — "the camels gathered together"

**If'ilaal (اِفْعِلَّال)** — +2 letters:
- **Hyperbole (مبالغة):** اِقْشَعَرَّ جِلْدُ الرَّجُلِ — "the man's skin got goosebumps"
- **Compliance of fa'lala (مطاوعة فَعْلَلَ):** طَمْأَنَهُ فَاطْمَأَنَّ — "he reassured him, so he became at ease"`,
      rules: [
        {
          arabic: 'الملحق بالرباعي ستة أبواب وأصلها ثلاثي مع زيادة حرف لمحاكاة الرباعي',
          english:
            'The mulhaq (assimilated) patterns are six doors that have a trilateral origin but are reshaped with an extra letter to match the quadrilateral morphological form (ilhaaq).',
          examples: [
            { arabic: 'جَلْبَبَ', translation: 'he clothed with a jilbab — fa\'lala mulhaq (repeated lam)' },
            { arabic: 'حَوْقَلَ', translation: 'he said the hawqala — faw\'ala (added waw)' },
            { arabic: 'بَيْطَرَ', translation: 'he practiced veterinary medicine — fay\'ala (added ya)' },
          ],
        },
        {
          arabic: 'تَفَعْلَلَ يطاوع فَعْلَلَ، واِفْعَلَلَّ يطاوع فَعْلَلَ أيضًا',
          english:
            'Both Tafa\'lul (+1 letter) and If\'ilaal (+2 letters) serve as compliance/reflexive forms of the bare quadrilateral Fa\'lala.',
          examples: [
            {
              arabic: 'دَحْرَجَ → تَدَحْرَجَ',
              translation: 'he rolled → it rolled — Tafa\'lul as compliance of Fa\'lala',
            },
            {
              arabic: 'طَمْأَنَ → اِطْمَأَنَّ',
              translation: 'he reassured → he became at ease — If\'ilaal as compliance of Fa\'lala',
            },
          ],
        },
      ],
      tables: [
        {
          title: 'Six Mulhaq Patterns (Assimilated to the Quadrilateral)',
          titleAr: 'الأبواب الستة الملحقة بالرباعي المجرد',
          headers: ['#', 'Pattern', 'Arabic', 'Example', 'Transitivity'],
          rows: [
            ['1', 'Fa\'lala (repeated lam)', 'فَعْلَلَ', 'جَلْبَبَ (he clothed)', 'Transitive only'],
            ['2', 'Faw\'ala (added waw)', 'فَوْعَلَ', 'حَوْقَلَ (he said hawqala)', 'Intransitive only'],
            ['3', 'Fa\'wala (waw after \'ayn)', 'فَعْوَلَ', 'جَهْوَرَ (he spoke loudly)', 'Transitive'],
            ['4', 'Fay\'ala (added ya)', 'فَيْعَلَ', 'بَيْطَرَ (veterinary med.)', 'Transitive'],
            ['5', 'Fa\'eela (ya between \'ayn & lam)', 'فَعِيلَ', 'عَيْثَرَ (he stumbled)', 'Intransitive'],
            ['6', 'Fa\'laa (added alif maqsoora)', 'فَعْلَى', 'سَلْقَى (he threw down)', 'Transitive'],
          ],
        },
        {
          title: 'Quadrilateral Augmented: Meanings',
          titleAr: 'معاني الرباعي المزيد',
          headers: ['Pattern', 'Primary Meaning', 'Example'],
          rows: [
            ['تَفَعْلَلَ (+1 letter)', 'Compliance/reflexive (مطاوعة)', 'تَدَحْرَجَ — the stone rolled'],
            ['تَفَعْلَلَ (+1 letter)', 'Hyperbole (مبالغة)', 'تَلَعْثَمَ — he stammered greatly'],
            ['اِفْعَنْلَلَ (+2 letters)', 'Compliance/reflexive (مطاوعة)', 'اِحْرَنْجَمَ — they crowded together'],
            ['اِفْعَلَلَّ (+2 letters)', 'Hyperbole (مبالغة)', 'اِقْشَعَرَّ — got goosebumps'],
            ['اِفْعَلَلَّ (+2 letters)', 'Compliance of fa\'lala', 'اِطْمَأَنَّ — he became at ease'],
          ],
        },
      ],
      sourceRef: 'Al-Wusta fi at-Tasreef, Maqsid 1 (Part 2, Fasl 2 — Quadrilateral)',
    },
  ],
  relatedTopicIds: ['cl-augmented-three', 'cl-foundational-principles'],
  tags: [
    'quadrilateral',
    'rubaai',
    "fa'lala",
    "tafa'lul",
    'mulhaq',
  ],
};
