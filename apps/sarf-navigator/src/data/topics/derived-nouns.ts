import type { SarfTopic } from '../types';

export const sifahMushabbahah: SarfTopic = {
  id: 'sifah-mushabbahah',
  titleAr: 'الصفة المشبهة',
  titleEn: 'Descriptive Adjective',
  transliteration: 'as-Sifah al-Mushabbahah',
  categoryId: 'derived',
  subcategoryId: 'derived-nouns',
  levels: [
    {
      difficulty: 'beginner',
      summary: 'The descriptive adjective (الصفة المشبهة) is derived from intransitive verbs to describe permanent qualities. Unlike the active participle which describes temporary states, it describes inherent characteristics.',
      body: `## الصفة المشبهة (Descriptive Adjective)

The **sifah mushabbahah** describes a **permanent quality** or inherent characteristic.

### Active Participle vs. Sifah Mushabbahah
- **Active Participle** (فَاعِل): temporary state → غَاضِبٌ (angry right now)
- **Sifah Mushabbahah**: permanent quality → حَسَنٌ (beautiful by nature)

### Common Patterns
- فَعِيلٌ: كَرِيمٌ (noble), عَظِيمٌ (great)
- فَعْلَانُ: عَطْشَانُ (thirsty), جَوْعَانُ (hungry)
- فَعِلٌ: فَرِحٌ (happy), حَذِرٌ (cautious)
- أَفْعَلُ: أَحْمَرُ (red), أَكْبَرُ (bigger)`,
      rules: [
        {
          arabic: 'الصفة المشبهة تدل على صفة ثابتة لا تتغير',
          english: 'The sifah mushabbahah indicates a fixed, unchanging quality.',
          examples: [
            { arabic: 'كَرِيمٌ', translation: 'noble (permanent quality — from كَرُمَ)' },
            { arabic: 'حَسَنٌ', translation: 'beautiful (permanent quality — from حَسُنَ)' },
          ],
        },
      ],
      sourceRef: 'FSTU Sarf, Pages 319-327',
    },
    {
      difficulty: 'intermediate',
      summary: 'The sifah mushabbahah typically derives from باب كَرُمَ (stative verbs) and باب سَمِعَ. It has multiple patterns depending on the meaning category: colors (أَفْعَل), qualities (فَعِيل), and states (فَعْلَان).',
      body: `## Patterns of Sifah Mushabbahah

### By Source Baab
| Baab | Pattern | Example |
|------|---------|---------|
| كَرُمَ | فَعِيلٌ | كَرِيمٌ (noble) |
| كَرُمَ | فَعْلٌ | صَعْبٌ (difficult) |
| سَمِعَ | فَعِلٌ | فَرِحٌ (happy) |
| سَمِعَ | فَعْلَانُ | عَطْشَانُ (thirsty) |

### Colors and Defects (أَفْعَلُ / فَعْلَاءُ)
This special pattern is used for:
- **Colors**: أَحْمَرُ / حَمْرَاءُ (red)
- **Physical defects**: أَعْمَى / عَمْيَاءُ (blind)
- **Physical traits**: أَطْوَلُ / طُولَى (taller)

### Feminine Forms
| Masculine | Feminine | Meaning |
|-----------|----------|---------|
| كَرِيمٌ | كَرِيمَةٌ | noble |
| عَطْشَانُ | عَطْشَى | thirsty |
| أَحْمَرُ | حَمْرَاءُ | red |`,
      rules: [
        {
          arabic: 'أَفْعَلُ / فَعْلَاءُ للألوان والعيوب',
          english: 'The أَفْعَلُ/فَعْلَاءُ pattern is used for colors and physical defects.',
          examples: [
            { arabic: 'أَحْمَرُ / حَمْرَاءُ', translation: 'red (masc/fem)' },
            { arabic: 'أَعْرَجُ / عَرْجَاءُ', translation: 'lame (masc/fem)' },
          ],
        },
      ],
      sourceRef: 'FSTU Sarf, Pages 319-327',
    },
    {
      difficulty: 'advanced',
      summary: 'Advanced study covers the complete list of sifah mushabbahah patterns, the semantic distinction from active participle and ism tafdil, and the grammatical behavior of sifah mushabbahah in sentences.',
      body: `## Advanced Sifah Mushabbahah

### Complete Pattern List
| Pattern | Example | From Verb | Meaning |
|---------|---------|-----------|---------|
| فَعِيلٌ | كَرِيمٌ | كَرُمَ | noble |
| فَعْلٌ | صَعْبٌ | صَعُبَ | difficult |
| فَعِلٌ | حَذِرٌ | حَذِرَ | cautious |
| فَعْلَانُ | عَطْشَانُ | عَطِشَ | thirsty |
| أَفْعَلُ | أَحْمَرُ | حَمِرَ | red |
| فَيْعِلٌ | سَيِّدٌ | سَادَ | master |
| فُعَالٌ | شُجَاعٌ | شَجُعَ | brave |

### Grammatical Behavior
The sifah mushabbahah:
1. Agrees with its noun in gender, number, and definiteness
2. Can take a direct object (like transitive verbs) in certain constructions
3. Can have its object added in three ways (رفع، نصب، جر)

### Three-Way Comparison
| Feature | Active Part. | Sifah Mush. | Ism Tafdil |
|---------|-------------|-------------|------------|
| Duration | Temporary | Permanent | Comparison |
| Example | غَاضِبٌ | حَسَنٌ | أَحْسَنُ |
| From | All verbs | Intransitive | All verbs |`,
      rules: [
        {
          arabic: 'الصفة المشبهة تشبه اسم الفاعل في العمل لكنها تدل على الثبوت',
          english: 'The sifah mushabbahah works like the active participle grammatically but indicates permanence.',
        },
      ],
      sourceRef: 'FSTU Sarf, Pages 319-327',
    },
  ],
  relatedTopicIds: ['ism-tafdil', 'participles', 'ism-dharf-aalah'],
  tags: ['sifah', 'mushabbahah', 'adjective', 'derived noun'],
};

export const ismTafdil: SarfTopic = {
  id: 'ism-tafdil',
  titleAr: 'اسم التفضيل',
  titleEn: 'Comparative Form',
  transliteration: 'Ism at-Tafdeel',
  categoryId: 'derived',
  subcategoryId: 'derived-nouns',
  levels: [
    {
      difficulty: 'beginner',
      summary: 'The comparative form (اسم التفضيل) is used to express "more" or "most" in Arabic. It follows the pattern أَفْعَلُ for masculine and فُعْلَى for feminine. Example: أَكْبَرُ (bigger/biggest).',
      body: `## اسم التفضيل (Comparative/Superlative Form)

The **ism tafdil** expresses comparison — equivalent to English "-er" or "-est" (or "more/most").

### Pattern
- **Masculine**: أَفْعَلُ
- **Feminine**: فُعْلَى

### Common Examples
- أَكْبَرُ / كُبْرَى (bigger/biggest)
- أَصْغَرُ / صُغْرَى (smaller/smallest)
- أَحْسَنُ / حُسْنَى (better/best)
- أَعْلَى / عُلْيَا (higher/highest)
- أَفْضَلُ / فُضْلَى (better/superior)`,
      rules: [
        {
          arabic: 'اسم التفضيل على وزن أَفْعَل للمذكر وفُعْلَى للمؤنث',
          english: 'The comparative form follows أَفْعَلُ for masculine and فُعْلَى for feminine.',
          examples: [
            { arabic: 'أَكْبَرُ / كُبْرَى', translation: 'bigger/biggest (masc/fem)' },
            { arabic: 'أَحْسَنُ / حُسْنَى', translation: 'better/best (masc/fem)' },
          ],
        },
      ],
      sourceRef: 'FSTU Sarf, Pages 319-327',
    },
    {
      difficulty: 'intermediate',
      summary: 'Ism tafdil has three uses: comparative with مِنْ (أكبر من), superlative with definite article (الأكبر), and superlative with idafah (أكبر الطلاب). Conditions for direct formation: triliteral, non-color, base form.',
      body: `## Uses of Ism Tafdil

### Three Constructions
1. **Comparative** (مُفاضَلة): أَكْبَرُ مِنْ (bigger than)
2. **Superlative** (definite): الأَكْبَرُ (the biggest)
3. **Superlative** (idafah): أَكْبَرُ الطُّلَّابِ (the biggest of the students)

### Conditions for Direct Formation
Ism tafdil forms directly from a verb only when:
1. **Triliteral** base form (not enhanced)
2. **Not a color** (not أَفْعَل pattern already)
3. **Can vary in degree** (not absolute qualities)
4. **Active voice**

### Indirect Formation
When conditions aren't met, use أَكْثَرُ/أَشَدُّ + masdar:
- اِسْتِقَامَةً → أَكْثَرُ اسْتِقَامَةً (more upright)
- اِحْمِرَارًا → أَشَدُّ احْمِرَارًا (more red)`,
      rules: [
        {
          arabic: 'إذا لم تتوفر الشروط يُستعمل أكثر أو أشد مع المصدر',
          english: 'When conditions for direct formation are not met, use أَكْثَرُ or أَشَدُّ with the masdar.',
          examples: [
            { arabic: 'أَكْثَرُ اجْتِهَادًا', translation: 'more diligent (indirect — from Form VIII)' },
            { arabic: 'أَشَدُّ احْمِرَارًا', translation: 'more red (indirect — from color verb)' },
          ],
        },
      ],
      sourceRef: 'FSTU Sarf, Pages 319-327',
    },
    {
      difficulty: 'advanced',
      summary: 'Advanced study covers agreement rules (ism tafdil is often diptote), the scholarly debate on whether it can be made from intransitive verbs, and its interaction with weak/hamzah roots.',
      body: `## Advanced Ism Tafdil

### Agreement Rules
| Construction | Gender Agreement | Number Agreement |
|-------------|-----------------|------------------|
| Comparative (مِنْ) | Always masculine | Always singular |
| Definite (الأفعل) | Agrees | Agrees |
| Idafah | Always masculine | Always singular |

### With Weak Roots
| Root Type | Base | Comparative |
|-----------|------|-------------|
| Sound | كَبُرَ | أَكْبَرُ |
| Ajwaf | طَالَ | أَطْوَلُ |
| Naqis | عَلَا | أَعْلَى |
| Hamzah | بَطُؤَ | أَبْطَأُ |
| Doubled | شَدَّ | أَشَدُّ |

### Diptote Behavior
Ism tafdil is **diptote** (ممنوع من الصرف):
- Never takes tanween
- Takes fatha instead of kasra in genitive
- Except: when definite (الأَكْبَرُ) or in idafah (أَكْبَرُ القَوْمِ)

### Frozen Comparatives
Some comparatives have lost their verb origins:
- آخَرُ (other) — no verb أَخَرَ in modern use
- أَوَّلُ (first) — debated origin`,
      rules: [
        {
          arabic: 'اسم التفضيل ممنوع من الصرف على وزن أَفْعَل',
          english: 'Ism tafdil on the أَفْعَلُ pattern is diptote (no tanween, fatha in genitive).',
          examples: [
            { arabic: 'هذا أَكْبَرُ (diptote)', translation: 'this is bigger (no tanween)' },
            { arabic: 'مِنْ أَكْبَرَ (fatha)', translation: 'from bigger (fatha not kasra)' },
          ],
        },
      ],
      sourceRef: 'FSTU Sarf, Pages 319-327',
    },
  ],
  relatedTopicIds: ['sifah-mushabbahah', 'participles', 'ism-dharf-aalah'],
  tags: ['tafdil', 'comparative', 'superlative', 'derived noun'],
};

export const ismDharfAalah: SarfTopic = {
  id: 'ism-dharf-aalah',
  titleAr: 'اسم الظرف والآلة',
  titleEn: 'Locative & Tool Nouns',
  transliteration: "Ism adh-Dharf wa al-Aalah",
  categoryId: 'derived',
  subcategoryId: 'derived-nouns',
  levels: [
    {
      difficulty: 'beginner',
      summary: 'Locative nouns (اسم المكان/الزمان) indicate where or when an action happens. Tool nouns (اسم الآلة) indicate the instrument used. Both derive from verb roots with specific patterns.',
      body: `## اسم الظرف والآلة (Locative & Tool Nouns)

### Locative Nouns (اسم المكان والزمان)
Indicate **where** or **when** an action takes place.

#### Patterns
- **مَفْعَلٌ**: مَكْتَبٌ (office — place of writing)
- **مَفْعِلٌ**: مَنْزِلٌ (home — place of descending)

### Tool Nouns (اسم الآلة)
Indicate the **instrument** used for an action.

#### Patterns
- **مِفْعَلٌ**: مِفْتَاحٌ (key — tool for opening)
- **مِفْعَلَةٌ**: مِكْنَسَةٌ (broom — tool for sweeping)
- **مِفْعَالٌ**: مِنْشَارٌ (saw — tool for sawing)`,
      rules: [
        {
          arabic: 'اسم المكان والزمان على وزن مَفْعَل أو مَفْعِل',
          english: 'Locative nouns follow مَفْعَلٌ or مَفْعِلٌ patterns.',
          examples: [
            { arabic: 'مَكْتَبٌ (مَفْعَلٌ)', translation: 'office/desk (place of writing)' },
            { arabic: 'مَجْلِسٌ (مَفْعِلٌ)', translation: 'council/sitting place' },
          ],
        },
        {
          arabic: 'اسم الآلة على وزن مِفْعَل أو مِفْعَلَة أو مِفْعَال',
          english: 'Tool nouns follow مِفْعَلٌ, مِفْعَلَةٌ, or مِفْعَالٌ patterns.',
          examples: [
            { arabic: 'مِفْتَاحٌ (مِفْعَالٌ)', translation: 'key (tool for opening)' },
            { arabic: 'مِكْنَسَةٌ (مِفْعَلَةٌ)', translation: 'broom (tool for sweeping)' },
          ],
        },
      ],
      sourceRef: 'FSTU Sarf, Pages 319-327',
    },
    {
      difficulty: 'intermediate',
      summary: 'The choice between مَفْعَل and مَفْعِل depends on the verb\'s baab. Verbs of باب ضرب/باب سمع use مَفْعِل, while باب فتح/نصر use مَفْعَل. Enhanced form locatives use مُفْعَل.',
      body: `## Choosing the Correct Pattern

### Locative Pattern Rules
| Verb Pattern | Locative Pattern | Example |
|-------------|-----------------|---------|
| يَفْعَلُ (a) | مَفْعَلٌ | مَذْهَبٌ (from ذَهَبَ — school of thought) |
| يَفْعِلُ (i) | مَفْعِلٌ | مَجْلِسٌ (from جَلَسَ — sitting place) |
| يَفْعُلُ (u) | مَفْعَلٌ | مَدْخَلٌ (from دَخَلَ — entrance) |

### Enhanced Form Locatives
Enhanced forms (II-X) use the **passive participle** pattern as locative:
- اِجْتَمَعَ → مُجْتَمَعٌ (meeting place / society)
- اِنْطَلَقَ → مُنْطَلَقٌ (starting point)
- اِسْتَشْفَى → مُسْتَشْفًى (hospital)

### Modern Tool Nouns
Arabic creates new tool nouns for modern inventions:
- حَاسُوبٌ (computer — on pattern فَاعُول)
- هَاتِفٌ (telephone — active participle used as tool)
- ثَلَّاجَةٌ (refrigerator — on pattern فَعَّالَة)`,
      rules: [
        {
          arabic: 'اسم المكان من المزيد على وزن اسم المفعول',
          english: 'Locative nouns from enhanced forms follow the passive participle pattern.',
          examples: [
            { arabic: 'مُسْتَشْفًى (Form X)', translation: 'hospital (place of seeking cure)' },
            { arabic: 'مُجْتَمَعٌ (Form VIII)', translation: 'society (place of gathering)' },
          ],
        },
      ],
      sourceRef: 'FSTU Sarf, Pages 319-327',
    },
    {
      difficulty: 'advanced',
      summary: 'Advanced study covers the complete list of locative and tool noun patterns, non-standard patterns used in modern Arabic, and the semantic relationship between locative, temporal, and tool nouns.',
      body: `## Advanced Locative & Tool Nouns

### Complete Pattern Reference
| Category | Pattern | Vowel | Example | Meaning |
|----------|---------|-------|---------|---------|
| Place | مَفْعَلٌ | fatha | مَلْعَبٌ | playground |
| Place | مَفْعِلٌ | kasra | مَسْجِدٌ | mosque |
| Place | مَفْعَلَةٌ | ta | مَكْتَبَةٌ | library |
| Time | مَفْعَلٌ | fatha | مَوْعِدٌ | appointment |
| Tool | مِفْعَلٌ | mi- | مِبْرَدٌ | file (tool) |
| Tool | مِفْعَلَةٌ | mi-ta | مِكْوَاةٌ | iron (tool) |
| Tool | مِفْعَالٌ | mi-aal | مِفْتَاحٌ | key |

### Modern Patterns (Non-Classical)
Modern Arabic has developed new tool noun patterns:
| Pattern | Example | Meaning |
|---------|---------|---------|
| فَاعُولٌ | حَاسُوبٌ | computer |
| فَعَّالَةٌ | غَسَّالَةٌ | washing machine |
| فَاعِلَةٌ | طَابِعَةٌ | printer |
| فَعَّالٌ | بَرَّادٌ | cooler |

### Ambiguity: Place vs. Time
The same pattern can indicate both place and time:
- مَوْعِدٌ — appointment (time) or meeting place
- مَغْرِبٌ — sunset time or the West (place)

Context determines the meaning.`,
      rules: [
        {
          arabic: 'قد يتحد وزن اسم المكان واسم الزمان والسياق يحدد المراد',
          english: 'Locative and temporal nouns often share the same pattern — context determines the meaning.',
          examples: [
            { arabic: 'مَوْعِد: زمان أو مكان', translation: 'appointment (time) or meeting place' },
            { arabic: 'مَغْرِب: وقت أو مكان', translation: 'sunset (time) or the West (place)' },
          ],
        },
      ],
      sourceRef: 'FSTU Sarf, Pages 319-327',
    },
  ],
  relatedTopicIds: ['sifah-mushabbahah', 'ism-tafdil', 'participles'],
  tags: ['ism makan', 'ism zaman', 'ism aalah', 'locative', 'tool noun'],
};
