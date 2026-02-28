import type { SarfTopic } from '../types';

export const clIlaalAugmentedForms: SarfTopic = {
  id: 'cl-ilaal-augmented-forms',
  titleAr: 'الإعلال في الأبواب المزيدة',
  titleEn: "I'laal in Augmented Forms",
  transliteration: "I'laal fil-Abwaab al-Mazeeda",
  categoryId: 'cl-seven-categories',
  subcategoryId: 'cl-ilaal-reference',
  levels: [
    {
      difficulty: 'beginner',
      summary:
        "Augmented forms (II-X) add extra letters to the root. When the root contains weak letters, i'laal still occurs — but the added letters can change which rules apply and how.",
      body: `## How Augmented Forms Interact with Weak Roots

When we add letters to a trilateral root (augmentation), the basic i'laal rules still apply, but the **added letters create new phonetic environments** that can trigger different changes.

### Key Differences from Form I

| Aspect | Form I | Augmented Forms (II-X) |
|--------|--------|----------------------|
| Extra letters | None | 1-3 added letters |
| Weak letter environment | Direct | Modified by added letters |
| I'laal types | All types possible | Some blocked, new ones triggered |
| Passive voice | Standard | Additional i'laal in passive |

### General Principles

1. **The weak letter still changes** — augmentation doesn't "protect" it
2. **Added letters can block some changes** — e.g., Form II's shaddah can prevent naql
3. **New changes can emerge** — e.g., the taa' of Form VIII can assimilate with root letters
4. **Some forms have no i'laal** — Form IX (if'alalla) has limited weak verb usage`,
      rules: [
        {
          arabic: 'الزيادة لا تمنع الإعلال بل قد تغير نوعه',
          english:
            "Augmentation doesn't prevent i'laal but may change which type applies. The weak letter still undergoes changes, adapted to the new phonetic environment.",
          examples: [
            { arabic: 'أَقْوَلَ → أَقَالَ (إفعال)', translation: "Form IV: waaw still flips to alif" },
            { arabic: 'اِسْتَقْوَلَ → اِسْتَقَالَ (استفعال)', translation: "Form X: waaw still flips to alif" },
          ],
        },
      ],
      sourceRef: 'Al-Wusta fi at-Tasreef, Maqsid 3',
    },
    {
      difficulty: 'intermediate',
      summary:
        "A form-by-form breakdown of how i'laal manifests in each augmented pattern, with examples from hollow, defective, and assimilated verbs.",
      body: `## I'laal by Augmented Form

### Form II (فَعَّلَ) — Taf'eel
- The shaddah on the 'ayn **blocks naql** in hollow verbs
- Hollow: قَوَّلَ → قَوَّلَ (no change — shaddah prevents it)
- Defective: رَمَّى → رَمَّى (yaa' still flips to alif when preceded by fathah)
- Assimilated: وَصَّلَ → وَصَّلَ (waaw stays — Form II protects it)

### Form III (فَاعَلَ) — Mufaa'ala
- Hollow: قَاوَلَ → قَاوَلَ (waaw stays — alif of the form creates buffer)
- Defective: دَاعَى → دَاعَى (yaa' → alif via qalb)
- Assimilated: وَاعَدَ → وَاعَدَ (no change)

### Form IV (أَفْعَلَ) — If'aal
- Hollow: أَقْوَلَ → أَقَالَ (naql + qalb — same as Form I pattern)
- Defective: أَدْعَى → أَدْعَى (standard qalb)
- Assimilated: أَوْعَدَ → أَوْعَدَ (waaw stays — it's now after hamza)

### Form V (تَفَعَّلَ) — Tafa''ul
- Similar to Form II: shaddah blocks naql in hollow verbs
- Defective: تَرَمَّى → تَرَمَّى (qalb on laam)

### Form VI (تَفَاعَلَ) — Tafaa'ul
- Similar to Form III: alif creates buffer
- Defective: تَدَاعَى → تَدَاعَى (qalb on laam)

### Form VII (اِنْفَعَلَ) — Infi'aal
- Hollow: اِنْقَوَلَ → اِنْقَالَ (naql + qalb)
- Defective: اِنْدَعَى → اِنْدَعَى (qalb on laam)
- Active/passive participles become **identical**: مُنْقَادٌ

### Form VIII (اِفْتَعَلَ) — Ifti'aal
- Hollow: اِقْتَوَلَ → اِقْتَالَ (naql + qalb)
- Assimilated waaw: اِوْتَعَدَ → اِتَّعَدَ (waaw → taa' + idghaam)
- Active/passive participles identical: مُخْتَارٌ

### Form X (اِسْتَفْعَلَ) — Istif'aal
- Hollow: اِسْتَقْوَلَ → اِسْتَقَالَ (naql + qalb in past)
- Present: يَسْتَقْوِلُ → يَسْتَقِيلُ (naql + qalb)
- Assimilated: اِسْتَوْعَدَ → اِسْتَوْعَدَ (waaw stays)`,
      rules: [
        {
          arabic: 'التشديد في الباب الثاني يمنع النقل، وتاء الافتعال تدغم مع واو المثال',
          english:
            "Form II's shaddah blocks naql in hollow verbs. Form VIII's taa' assimilates with the waaw of assimilated verbs (waaw → taa' → idghaam).",
          examples: [
            { arabic: 'قَوَّلَ (لا إعلال)', translation: 'Form II hollow: no i\'laal (shaddah blocks)' },
            { arabic: 'اِوْتَعَدَ → اِتَّعَدَ', translation: 'Form VIII assimilated: waaw → taa\' + assimilation' },
            { arabic: 'اِسْتَقَالَ', translation: 'Form X hollow: naql + qalb like Form I' },
          ],
        },
      ],
      tables: [
        {
          title: "I'laal Behavior Across Forms",
          titleAr: 'سلوك الإعلال في الأبواب المزيدة',
          headers: ['Form', 'Hollow', 'Defective', 'Assimilated', 'Doubled'],
          rows: [
            ['II فَعَّلَ', 'Blocked by shaddah', 'Qalb on laam', 'No change', 'Standard idghaam'],
            ['III فَاعَلَ', 'Buffered by alif', 'Qalb on laam', 'No change', 'Standard idghaam'],
            ['IV أَفْعَلَ', 'Naql + qalb', 'Qalb on laam', 'No change', 'Standard idghaam'],
            ['V تَفَعَّلَ', 'Blocked by shaddah', 'Qalb on laam', 'No change', 'Standard idghaam'],
            ['VI تَفَاعَلَ', 'Buffered by alif', 'Qalb on laam', 'No change', 'Standard idghaam'],
            ['VII اِنْفَعَلَ', 'Naql + qalb', 'Qalb on laam', 'Naql on faa\'', 'Standard idghaam'],
            ['VIII اِفْتَعَلَ', 'Naql + qalb', 'Qalb on laam', 'Waaw → taa\' + idghaam', 'Standard idghaam'],
            ['X اِسْتَفْعَلَ', 'Naql + qalb', 'Qalb on laam', 'No change', 'Standard idghaam'],
          ],
        },
      ],
      sourceRef: 'Al-Wusta fi at-Tasreef, Maqsid 3, across all verb categories',
    },
    {
      difficulty: 'advanced',
      summary:
        "Use the interactive transformer to explore how any root behaves across all available forms (I-X). Compare side-by-side how the same root produces different i'laal patterns in each form.",
      body: `## Cross-Form I'laal Explorer

The transformer below lets you explore how a single root behaves across **all forms (I-X)**. This is especially revealing for:

- **Hollow verbs** (e.g., ق و ل): See how Forms II, III block naql while IV, VII, VIII, X allow it
- **Assimilated verbs** (e.g., و ع د): See waaw deletion in Form I present, and taa' assimilation in Form VIII
- **Defective verbs** (e.g., ر م ي): See qalb and hadhf patterns across all forms

### Key Cross-Form Patterns

1. **Forms II & V** — The shaddah on 'ayn blocks naql → hollow verbs conjugate like sound verbs
2. **Forms III & VI** — The long alif creates a buffer → hollow 'ayn is not affected
3. **Forms IV, VII, VIII, X** — Full naql + qalb operates → hollow verbs show complete i'laal
4. **Form VIII** — Special assimilation of assimilated waaw with the form's taa'
5. **Forms VII & VIII** — Active and passive participles become identical for hollow verbs`,
      interactiveWidget: 'ilaal-transformer',
      widgetConfig: { compact: false },
      sourceRef: 'Interactive tool based on @arabiyya/sarf conjugation data',
    },
  ],
  relatedTopicIds: ['cl-ilaal-overview', 'cl-augmented-one', 'cl-augmented-two', 'cl-augmented-three'],
  tags: ['ilaal', 'augmented', 'mazeed', 'forms', 'II-X', 'reference'],
};
