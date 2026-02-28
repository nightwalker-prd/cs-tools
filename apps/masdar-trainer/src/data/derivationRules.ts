import type { VerbForm } from '../types';

export interface DerivationRule {
  verbForm: VerbForm;
  masdarPattern: string;
  masdarPatternAlt?: string[];
  ismFailPattern: string;
  ismMafulPattern: string;
  hasPassive: boolean;
  notes: string;
  examples: { root: string; masdar: string; ismFail: string; ismMaful: string }[];
}

export const derivationRules: DerivationRule[] = [
  {
    verbForm: 'I',
    masdarPattern: 'فَعْل (and 30+ others)',
    masdarPatternAlt: [
      'فَعْل', 'فُعُول', 'فِعَالَة', 'فَعَال', 'فَعِيل', 'فُعْلَة',
      'فِعَال', 'فَعَلَان', 'فُعَال', 'تَفْعِلَة', 'مَفْعَل', 'فَعَالَة',
    ],
    ismFailPattern: 'فَاعِل',
    ismMafulPattern: 'مَفْعُول',
    hasPassive: true,
    notes: 'Form I masdars are irregular and must be memorized. Ism fa\'il is always فَاعِل EXCEPT بَاب كَرُمَ يَكْرُمُ which uses فَعِيل (e.g. كَرِيمٌ, not *كَارِمٌ). Ism maf\'ul is always مَفْعُول, though weak roots cause predictable changes (e.g. مَبِيعٌ for ajwaf, مَدْعُوٌّ for naqis).',
    examples: [
      { root: 'ك ت ب', masdar: 'كِتَابَة', ismFail: 'كَاتِب', ismMaful: 'مَكْتُوب' },
      { root: 'ف ت ح', masdar: 'فَتْح', ismFail: 'فَاتِح', ismMaful: 'مَفْتُوح' },
      { root: 'ع ل م', masdar: 'عِلْم', ismFail: 'عَالِم', ismMaful: 'مَعْلُوم' },
    ],
  },
  {
    verbForm: 'II',
    masdarPattern: 'تَفْعِيل',
    ismFailPattern: 'مُفَعِّل',
    ismMafulPattern: 'مُفَعَّل',
    hasPassive: true,
    notes: 'Form II masdar regularly follows تَفْعِيل. With naqis roots, masdar becomes تَفْعِلَة (e.g. تَصْلِيَة from صَلَّى, تَسْوِيَة from سَوَّى). Ism fa\'il/maf\'ul: replace يُ prefix with مُ.',
    examples: [
      { root: 'ع ل م', masdar: 'تَعْلِيم', ismFail: 'مُعَلِّم', ismMaful: 'مُعَلَّم' },
      { root: 'د ر س', masdar: 'تَدْرِيس', ismFail: 'مُدَرِّس', ismMaful: 'مُدَرَّس' },
      { root: 'ق د م', masdar: 'تَقْدِيم', ismFail: 'مُقَدِّم', ismMaful: 'مُقَدَّم' },
    ],
  },
  {
    verbForm: 'III',
    masdarPattern: 'مُفَاعَلَة',
    masdarPatternAlt: ['فِعَال'],
    ismFailPattern: 'مُفَاعِل',
    ismMafulPattern: 'مُفَاعَل',
    hasPassive: true,
    notes: 'Form III masdar commonly uses مُفَاعَلَة; some verbs also use فِعَال (e.g. جِهَاد from جَاهَدَ, قِتَال from قَاتَلَ, دِفَاع from دَافَعَ). With naqis roots, masdar becomes مُفَاعَاة (e.g. مُنَادَاة from نَادَى, مُسَاوَاة from سَاوَى).',
    examples: [
      { root: 'ج ه د', masdar: 'مُجَاهَدَة', ismFail: 'مُجَاهِد', ismMaful: 'مُجَاهَد' },
      { root: 'ق ت ل', masdar: 'مُقَاتَلَة', ismFail: 'مُقَاتِل', ismMaful: 'مُقَاتَل' },
      { root: 'س ف ر', masdar: 'مُسَافَرَة', ismFail: 'مُسَافِر', ismMaful: 'مُسَافَر' },
    ],
  },
  {
    verbForm: 'IV',
    masdarPattern: 'إِفْعَال',
    ismFailPattern: 'مُفْعِل',
    ismMafulPattern: 'مُفْعَل',
    hasPassive: true,
    notes: 'Form IV masdar follows إِفْعَال. With ajwaf/naqis roots, masdar may become إِفَالَة (e.g. إِرَادَة from أَرَادَ) or إِفْعَاء (e.g. إِبْقَاء from أَبْقَى). Ism fa\'il/maf\'ul: replace يُ prefix with مُ.',
    examples: [
      { root: 'ر س ل', masdar: 'إِرْسَال', ismFail: 'مُرْسِل', ismMaful: 'مُرْسَل' },
      { root: 'س ل م', masdar: 'إِسْلَام', ismFail: 'مُسْلِم', ismMaful: 'مُسْلَم' },
      { root: 'ح س ن', masdar: 'إِحْسَان', ismFail: 'مُحْسِن', ismMaful: 'مُحْسَن' },
    ],
  },
  {
    verbForm: 'V',
    masdarPattern: 'تَفَعُّل',
    ismFailPattern: 'مُتَفَعِّل',
    ismMafulPattern: 'مُتَفَعَّل',
    hasPassive: true,
    notes: 'Form V masdar follows تَفَعُّل (reflexive of Form II). With naqis roots, masdar becomes تَفَعِّي (e.g. تَلَقِّي from تَلَقَّى, تَوَفِّي from تَوَفَّى).',
    examples: [
      { root: 'ع ل م', masdar: 'تَعَلُّم', ismFail: 'مُتَعَلِّم', ismMaful: 'مُتَعَلَّم' },
      { root: 'ك ل م', masdar: 'تَكَلُّم', ismFail: 'مُتَكَلِّم', ismMaful: 'مُتَكَلَّم' },
      { root: 'و ض أ', masdar: 'تَوَضُّؤ', ismFail: 'مُتَوَضِّئ', ismMaful: 'مُتَوَضَّأ' },
    ],
  },
  {
    verbForm: 'VI',
    masdarPattern: 'تَفَاعُل',
    ismFailPattern: 'مُتَفَاعِل',
    ismMafulPattern: 'مُتَفَاعَل',
    hasPassive: true,
    notes: 'Form VI masdar follows تَفَاعُل (reciprocal reflexive). With naqis roots, masdar becomes تَفَاعِي (e.g. تَلَاقِي from تَلَاقَى, تَدَاوِي from تَدَاوَى).',
    examples: [
      { root: 'ع و ن', masdar: 'تَعَاوُن', ismFail: 'مُتَعَاوِن', ismMaful: 'مُتَعَاوَن' },
      { root: 'ب ع د', masdar: 'تَبَاعُد', ismFail: 'مُتَبَاعِد', ismMaful: 'مُتَبَاعَد' },
      { root: 'ش و ر', masdar: 'تَشَاوُر', ismFail: 'مُتَشَاوِر', ismMaful: 'مُتَشَاوَر' },
    ],
  },
  {
    verbForm: 'VII',
    masdarPattern: 'اِنْفِعَال',
    ismFailPattern: 'مُنْفَعِل',
    ismMafulPattern: '',
    hasPassive: false,
    notes: 'Form VII has NO passive voice and NO ism maf\'ul. It is inherently passive/reflexive.',
    examples: [
      { root: 'ك س ر', masdar: 'اِنْكِسَار', ismFail: 'مُنْكَسِر', ismMaful: '' },
      { root: 'ف ت ح', masdar: 'اِنْفِتَاح', ismFail: 'مُنْفَتِح', ismMaful: '' },
      { root: 'ق ل ب', masdar: 'اِنْقِلَاب', ismFail: 'مُنْقَلِب', ismMaful: '' },
    ],
  },
  {
    verbForm: 'VIII',
    masdarPattern: 'اِفْتِعَال',
    ismFailPattern: 'مُفْتَعِل',
    ismMafulPattern: 'مُفْتَعَل',
    hasPassive: true,
    notes: 'Form VIII masdar follows اِفْتِعَال.',
    examples: [
      { root: 'ج م ع', masdar: 'اِجْتِمَاع', ismFail: 'مُجْتَمِع', ismMaful: 'مُجْتَمَع' },
      { root: 'ح ت ج', masdar: 'اِحْتِيَاج', ismFail: 'مُحْتَاج', ismMaful: 'مُحْتَاج' },
      { root: 'خ ت ر', masdar: 'اِخْتِيَار', ismFail: 'مُخْتَار', ismMaful: 'مُخْتَار' },
    ],
  },
  {
    verbForm: 'IX',
    masdarPattern: 'اِفْعِلَال',
    ismFailPattern: 'مُفْعَلّ',
    ismMafulPattern: '',
    hasPassive: false,
    notes: 'Form IX is used for colors/defects. Has NO passive voice and NO ism maf\'ul.',
    examples: [
      { root: 'ح م ر', masdar: 'اِحْمِرَار', ismFail: 'مُحْمَرّ', ismMaful: '' },
      { root: 'ب ي ض', masdar: 'اِبْيِضَاض', ismFail: 'مُبْيَضّ', ismMaful: '' },
      { root: 'س و د', masdar: 'اِسْوِدَاد', ismFail: 'مُسْوَدّ', ismMaful: '' },
    ],
  },
  {
    verbForm: 'X',
    masdarPattern: 'اِسْتِفْعَال',
    ismFailPattern: 'مُسْتَفْعِل',
    ismMafulPattern: 'مُسْتَفْعَل',
    hasPassive: true,
    notes: 'Form X masdar follows اِسْتِفْعَال (seeking/deeming). With some ajwaf roots, masdar may become اِسْتِفَالَة or اِسْتِفَامَة (e.g. اِسْتِقَامَة from اِسْتَقَامَ).',
    examples: [
      { root: 'خ د م', masdar: 'اِسْتِخْدَام', ismFail: 'مُسْتَخْدِم', ismMaful: 'مُسْتَخْدَم' },
      { root: 'ع م ل', masdar: 'اِسْتِعْمَال', ismFail: 'مُسْتَعْمِل', ismMaful: 'مُسْتَعْمَل' },
      { root: 'غ ف ر', masdar: 'اِسْتِغْفَار', ismFail: 'مُسْتَغْفِر', ismMaful: 'مُسْتَغْفَر' },
    ],
  },
];

/** Get derivation rule for a specific form */
export function getRuleForForm(form: VerbForm): DerivationRule | undefined {
  return derivationRules.find(r => r.verbForm === form);
}
