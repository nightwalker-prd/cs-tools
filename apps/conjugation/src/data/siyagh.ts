/**
 * Siyagh (صِيَغ) — The 80 Traditional Arabic Conjugation Forms
 *
 * Each seegah combines person/number/gender with tense into a single label,
 * following the traditional Arabic grammar numbering system.
 */

export interface Seegah {
  number: number;       // 1-80
  label: string;        // Arabic label with diacritics
  labelEn: string;      // English description
  category: string;     // Maps to selectedConjugationTypes key
}

/**
 * Maps selectedConjugationTypes keys to siyagh categories.
 * The selectedConjugationTypes values contain English in parentheses,
 * so we match on the Arabic prefix.
 */
export const CATEGORY_MAP: Record<string, string> = {
  'الماضي المبني للمعلوم': 'الْمَاضِي الْمَعْلُوْمِ',
  'الماضي المبني للمجهول': 'الْمَاضِي الْمَجْهُوْلِ',
  'المضارع المبني للمعلوم': 'الْمُضَارِعِ الْمَعْلُوْمِ',
  'المضارع المبني للمجهول': 'الْمُضَارِعِ الْمَجْهُوْلِ',
  'الأمر': 'الْأَمْرِ',
  'النهي': 'النَّهْيِ',
  'اسم الفاعل': 'اسْمُ الْفَاعِلِ',
  'اسم المفعول': 'اسْمُ الْمَفْعُولِ',
};

/** Reverse map: siyagh category → selectedConjugationTypes key */
const REVERSE_CATEGORY_MAP: Record<string, string> = Object.fromEntries(
  Object.entries(CATEGORY_MAP).map(([k, v]) => [v, k])
);

export const SIYAGH: Seegah[] = [
  // الْمَاضِي الْمَعْلُوْمِ — Past Active (#1-14)
  { number: 1,  label: 'الْغَائِبُ مِنَ الْمَاضِي الْمَعْلُوْمِ',           labelEn: '3rd person sing. masc. (هُوَ)',     category: 'الْمَاضِي الْمَعْلُوْمِ' },
  { number: 2,  label: 'الْغَائِبَةُ مِنَ الْمَاضِي الْمَعْلُوْمِ',          labelEn: '3rd person sing. fem. (هِيَ)',      category: 'الْمَاضِي الْمَعْلُوْمِ' },
  { number: 3,  label: 'الْغَائِبَانِ مِنَ الْمَاضِي الْمَعْلُوْمِ',          labelEn: '3rd person dual masc. (هُمَا)',     category: 'الْمَاضِي الْمَعْلُوْمِ' },
  { number: 4,  label: 'الْغَائِبَتَانِ مِنَ الْمَاضِي الْمَعْلُوْمِ',        labelEn: '3rd person dual fem. (هُمَا)',      category: 'الْمَاضِي الْمَعْلُوْمِ' },
  { number: 5,  label: 'الْغَائِبُوْنَ مِنَ الْمَاضِي الْمَعْلُوْمِ',         labelEn: '3rd person pl. masc. (هُمْ)',       category: 'الْمَاضِي الْمَعْلُوْمِ' },
  { number: 6,  label: 'الْغَائِبَاتُ مِنَ الْمَاضِي الْمَعْلُوْمِ',          labelEn: '3rd person pl. fem. (هُنَّ)',       category: 'الْمَاضِي الْمَعْلُوْمِ' },
  { number: 7,  label: 'الْمُخَاطَبُ مِنَ الْمَاضِي الْمَعْلُوْمِ',           labelEn: '2nd person sing. masc. (أَنْتَ)',   category: 'الْمَاضِي الْمَعْلُوْمِ' },
  { number: 8,  label: 'الْمُخَاطَبَةُ مِنَ الْمَاضِي الْمَعْلُوْمِ',         labelEn: '2nd person sing. fem. (أَنْتِ)',    category: 'الْمَاضِي الْمَعْلُوْمِ' },
  { number: 9,  label: 'الْمُخَاطَبَانِ مِنَ الْمَاضِي الْمَعْلُوْمِ',        labelEn: '2nd person dual (أَنْتُمَا)',       category: 'الْمَاضِي الْمَعْلُوْمِ' },
  { number: 10, label: 'الْمُخَاطَبُوْنَ مِنَ الْمَاضِي الْمَعْلُوْمِ',       labelEn: '2nd person pl. masc. (أَنْتُمْ)',   category: 'الْمَاضِي الْمَعْلُوْمِ' },
  { number: 11, label: 'الْمُخَاطَبَاتُ مِنَ الْمَاضِي الْمَعْلُوْمِ',        labelEn: '2nd person pl. fem. (أَنْتُنَّ)',   category: 'الْمَاضِي الْمَعْلُوْمِ' },
  { number: 12, label: 'الْمُتَكَلِّمُ مِنَ الْمَاضِي الْمَعْلُوْمِ',          labelEn: '1st person sing. (أَنَا)',          category: 'الْمَاضِي الْمَعْلُوْمِ' },
  { number: 13, label: 'الْمُتَكَلِّمَانِ مِنَ الْمَاضِي الْمَعْلُوْمِ',       labelEn: '1st person dual (نَحْنُ‎ dual)',    category: 'الْمَاضِي الْمَعْلُوْمِ' },
  { number: 14, label: 'الْمُتَكَلِّمُوْنَ مِنَ الْمَاضِي الْمَعْلُوْمِ',      labelEn: '1st person pl. (نَحْنُ)',           category: 'الْمَاضِي الْمَعْلُوْمِ' },

  // الْمَاضِي الْمَجْهُوْلِ — Past Passive (#15-28)
  { number: 15, label: 'الْغَائِبُ مِنَ الْمَاضِي الْمَجْهُوْلِ',           labelEn: '3rd person sing. masc. (هُوَ)',     category: 'الْمَاضِي الْمَجْهُوْلِ' },
  { number: 16, label: 'الْغَائِبَةُ مِنَ الْمَاضِي الْمَجْهُوْلِ',          labelEn: '3rd person sing. fem. (هِيَ)',      category: 'الْمَاضِي الْمَجْهُوْلِ' },
  { number: 17, label: 'الْغَائِبَانِ مِنَ الْمَاضِي الْمَجْهُوْلِ',          labelEn: '3rd person dual masc. (هُمَا)',     category: 'الْمَاضِي الْمَجْهُوْلِ' },
  { number: 18, label: 'الْغَائِبَتَانِ مِنَ الْمَاضِي الْمَجْهُوْلِ',        labelEn: '3rd person dual fem. (هُمَا)',      category: 'الْمَاضِي الْمَجْهُوْلِ' },
  { number: 19, label: 'الْغَائِبُوْنَ مِنَ الْمَاضِي الْمَجْهُوْلِ',         labelEn: '3rd person pl. masc. (هُمْ)',       category: 'الْمَاضِي الْمَجْهُوْلِ' },
  { number: 20, label: 'الْغَائِبَاتُ مِنَ الْمَاضِي الْمَجْهُوْلِ',          labelEn: '3rd person pl. fem. (هُنَّ)',       category: 'الْمَاضِي الْمَجْهُوْلِ' },
  { number: 21, label: 'الْمُخَاطَبُ مِنَ الْمَاضِي الْمَجْهُوْلِ',           labelEn: '2nd person sing. masc. (أَنْتَ)',   category: 'الْمَاضِي الْمَجْهُوْلِ' },
  { number: 22, label: 'الْمُخَاطَبَةُ مِنَ الْمَاضِي الْمَجْهُوْلِ',         labelEn: '2nd person sing. fem. (أَنْتِ)',    category: 'الْمَاضِي الْمَجْهُوْلِ' },
  { number: 23, label: 'الْمُخَاطَبَانِ مِنَ الْمَاضِي الْمَجْهُوْلِ',        labelEn: '2nd person dual (أَنْتُمَا)',       category: 'الْمَاضِي الْمَجْهُوْلِ' },
  { number: 24, label: 'الْمُخَاطَبُوْنَ مِنَ الْمَاضِي الْمَجْهُوْلِ',       labelEn: '2nd person pl. masc. (أَنْتُمْ)',   category: 'الْمَاضِي الْمَجْهُوْلِ' },
  { number: 25, label: 'الْمُخَاطَبَاتُ مِنَ الْمَاضِي الْمَجْهُوْلِ',        labelEn: '2nd person pl. fem. (أَنْتُنَّ)',   category: 'الْمَاضِي الْمَجْهُوْلِ' },
  { number: 26, label: 'الْمُتَكَلِّمُ مِنَ الْمَاضِي الْمَجْهُوْلِ',          labelEn: '1st person sing. (أَنَا)',          category: 'الْمَاضِي الْمَجْهُوْلِ' },
  { number: 27, label: 'الْمُتَكَلِّمَانِ مِنَ الْمَاضِي الْمَجْهُوْلِ',       labelEn: '1st person dual (نَحْنُ‎ dual)',    category: 'الْمَاضِي الْمَجْهُوْلِ' },
  { number: 28, label: 'الْمُتَكَلِّمُوْنَ مِنَ الْمَاضِي الْمَجْهُوْلِ',      labelEn: '1st person pl. (نَحْنُ)',           category: 'الْمَاضِي الْمَجْهُوْلِ' },

  // الْمُضَارِعِ الْمَعْلُوْمِ — Present Active (#29-42)
  { number: 29, label: 'الْغَائِبُ مِنَ الْمُضَارِعِ الْمَعْلُوْمِ',           labelEn: '3rd person sing. masc. (هُوَ)',     category: 'الْمُضَارِعِ الْمَعْلُوْمِ' },
  { number: 30, label: 'الْغَائِبَةُ مِنَ الْمُضَارِعِ الْمَعْلُوْمِ',          labelEn: '3rd person sing. fem. (هِيَ)',      category: 'الْمُضَارِعِ الْمَعْلُوْمِ' },
  { number: 31, label: 'الْغَائِبَانِ مِنَ الْمُضَارِعِ الْمَعْلُوْمِ',          labelEn: '3rd person dual masc. (هُمَا)',     category: 'الْمُضَارِعِ الْمَعْلُوْمِ' },
  { number: 32, label: 'الْغَائِبَتَانِ مِنَ الْمُضَارِعِ الْمَعْلُوْمِ',        labelEn: '3rd person dual fem. (هُمَا)',      category: 'الْمُضَارِعِ الْمَعْلُوْمِ' },
  { number: 33, label: 'الْغَائِبُوْنَ مِنَ الْمُضَارِعِ الْمَعْلُوْمِ',         labelEn: '3rd person pl. masc. (هُمْ)',       category: 'الْمُضَارِعِ الْمَعْلُوْمِ' },
  { number: 34, label: 'الْغَائِبَاتُ مِنَ الْمُضَارِعِ الْمَعْلُوْمِ',          labelEn: '3rd person pl. fem. (هُنَّ)',       category: 'الْمُضَارِعِ الْمَعْلُوْمِ' },
  { number: 35, label: 'الْمُخَاطَبُ مِنَ الْمُضَارِعِ الْمَعْلُوْمِ',           labelEn: '2nd person sing. masc. (أَنْتَ)',   category: 'الْمُضَارِعِ الْمَعْلُوْمِ' },
  { number: 36, label: 'الْمُخَاطَبَةُ مِنَ الْمُضَارِعِ الْمَعْلُوْمِ',         labelEn: '2nd person sing. fem. (أَنْتِ)',    category: 'الْمُضَارِعِ الْمَعْلُوْمِ' },
  { number: 37, label: 'الْمُخَاطَبَانِ مِنَ الْمُضَارِعِ الْمَعْلُوْمِ',        labelEn: '2nd person dual (أَنْتُمَا)',       category: 'الْمُضَارِعِ الْمَعْلُوْمِ' },
  { number: 38, label: 'الْمُخَاطَبُوْنَ مِنَ الْمُضَارِعِ الْمَعْلُوْمِ',       labelEn: '2nd person pl. masc. (أَنْتُمْ)',   category: 'الْمُضَارِعِ الْمَعْلُوْمِ' },
  { number: 39, label: 'الْمُخَاطَبَاتُ مِنَ الْمُضَارِعِ الْمَعْلُوْمِ',        labelEn: '2nd person pl. fem. (أَنْتُنَّ)',   category: 'الْمُضَارِعِ الْمَعْلُوْمِ' },
  { number: 40, label: 'الْمُتَكَلِّمُ مِنَ الْمُضَارِعِ الْمَعْلُوْمِ',          labelEn: '1st person sing. (أَنَا)',          category: 'الْمُضَارِعِ الْمَعْلُوْمِ' },
  { number: 41, label: 'الْمُتَكَلِّمَانِ مِنَ الْمُضَارِعِ الْمَعْلُوْمِ',       labelEn: '1st person dual (نَحْنُ‎ dual)',    category: 'الْمُضَارِعِ الْمَعْلُوْمِ' },
  { number: 42, label: 'الْمُتَكَلِّمُوْنَ مِنَ الْمُضَارِعِ الْمَعْلُوْمِ',      labelEn: '1st person pl. (نَحْنُ)',           category: 'الْمُضَارِعِ الْمَعْلُوْمِ' },

  // الْمُضَارِعِ الْمَجْهُوْلِ — Present Passive (#43-56)
  { number: 43, label: 'الْغَائِبُ مِنَ الْمُضَارِعِ الْمَجْهُوْلِ',           labelEn: '3rd person sing. masc. (هُوَ)',     category: 'الْمُضَارِعِ الْمَجْهُوْلِ' },
  { number: 44, label: 'الْغَائِبَةُ مِنَ الْمُضَارِعِ الْمَجْهُوْلِ',          labelEn: '3rd person sing. fem. (هِيَ)',      category: 'الْمُضَارِعِ الْمَجْهُوْلِ' },
  { number: 45, label: 'الْغَائِبَانِ مِنَ الْمُضَارِعِ الْمَجْهُوْلِ',          labelEn: '3rd person dual masc. (هُمَا)',     category: 'الْمُضَارِعِ الْمَجْهُوْلِ' },
  { number: 46, label: 'الْغَائِبَتَانِ مِنَ الْمُضَارِعِ الْمَجْهُوْلِ',        labelEn: '3rd person dual fem. (هُمَا)',      category: 'الْمُضَارِعِ الْمَجْهُوْلِ' },
  { number: 47, label: 'الْغَائِبُوْنَ مِنَ الْمُضَارِعِ الْمَجْهُوْلِ',         labelEn: '3rd person pl. masc. (هُمْ)',       category: 'الْمُضَارِعِ الْمَجْهُوْلِ' },
  { number: 48, label: 'الْغَائِبَاتُ مِنَ الْمُضَارِعِ الْمَجْهُوْلِ',          labelEn: '3rd person pl. fem. (هُنَّ)',       category: 'الْمُضَارِعِ الْمَجْهُوْلِ' },
  { number: 49, label: 'الْمُخَاطَبُ مِنَ الْمُضَارِعِ الْمَجْهُوْلِ',           labelEn: '2nd person sing. masc. (أَنْتَ)',   category: 'الْمُضَارِعِ الْمَجْهُوْلِ' },
  { number: 50, label: 'الْمُخَاطَبَةُ مِنَ الْمُضَارِعِ الْمَجْهُوْلِ',         labelEn: '2nd person sing. fem. (أَنْتِ)',    category: 'الْمُضَارِعِ الْمَجْهُوْلِ' },
  { number: 51, label: 'الْمُخَاطَبَانِ مِنَ الْمُضَارِعِ الْمَجْهُوْلِ',        labelEn: '2nd person dual (أَنْتُمَا)',       category: 'الْمُضَارِعِ الْمَجْهُوْلِ' },
  { number: 52, label: 'الْمُخَاطَبُوْنَ مِنَ الْمُضَارِعِ الْمَجْهُوْلِ',       labelEn: '2nd person pl. masc. (أَنْتُمْ)',   category: 'الْمُضَارِعِ الْمَجْهُوْلِ' },
  { number: 53, label: 'الْمُخَاطَبَاتُ مِنَ الْمُضَارِعِ الْمَجْهُوْلِ',        labelEn: '2nd person pl. fem. (أَنْتُنَّ)',   category: 'الْمُضَارِعِ الْمَجْهُوْلِ' },
  { number: 54, label: 'الْمُتَكَلِّمُ مِنَ الْمُضَارِعِ الْمَجْهُوْلِ',          labelEn: '1st person sing. (أَنَا)',          category: 'الْمُضَارِعِ الْمَجْهُوْلِ' },
  { number: 55, label: 'الْمُتَكَلِّمَانِ مِنَ الْمُضَارِعِ الْمَجْهُوْلِ',       labelEn: '1st person dual (نَحْنُ‎ dual)',    category: 'الْمُضَارِعِ الْمَجْهُوْلِ' },
  { number: 56, label: 'الْمُتَكَلِّمُوْنَ مِنَ الْمُضَارِعِ الْمَجْهُوْلِ',      labelEn: '1st person pl. (نَحْنُ)',           category: 'الْمُضَارِعِ الْمَجْهُوْلِ' },

  // الْأَمْرِ — Imperative (#57-62, 2nd person only)
  { number: 57, label: 'الْمُخَاطَبُ مِنَ الْأَمْرِ',           labelEn: '2nd person sing. masc. (أَنْتَ)',   category: 'الْأَمْرِ' },
  { number: 58, label: 'الْمُخَاطَبَةُ مِنَ الْأَمْرِ',         labelEn: '2nd person sing. fem. (أَنْتِ)',    category: 'الْأَمْرِ' },
  { number: 59, label: 'الْمُخَاطَبَانِ مِنَ الْأَمْرِ',        labelEn: '2nd person dual (أَنْتُمَا)',       category: 'الْأَمْرِ' },
  { number: 60, label: 'الْمُخَاطَبُوْنَ مِنَ الْأَمْرِ',       labelEn: '2nd person pl. masc. (أَنْتُمْ)',   category: 'الْأَمْرِ' },
  { number: 61, label: 'الْمُخَاطَبَاتُ مِنَ الْأَمْرِ',        labelEn: '2nd person pl. fem. (أَنْتُنَّ)',   category: 'الْأَمْرِ' },
  { number: 62, label: 'الْمُتَكَلِّمُ مِنَ الْأَمْرِ',          labelEn: '1st person (let me — أَنَا)',       category: 'الْأَمْرِ' },

  // النَّهْيِ — Prohibition (#63-68)
  { number: 63, label: 'الْمُخَاطَبُ مِنَ النَّهْيِ',           labelEn: '2nd person sing. masc. (أَنْتَ)',   category: 'النَّهْيِ' },
  { number: 64, label: 'الْمُخَاطَبَةُ مِنَ النَّهْيِ',         labelEn: '2nd person sing. fem. (أَنْتِ)',    category: 'النَّهْيِ' },
  { number: 65, label: 'الْمُخَاطَبَانِ مِنَ النَّهْيِ',        labelEn: '2nd person dual (أَنْتُمَا)',       category: 'النَّهْيِ' },
  { number: 66, label: 'الْمُخَاطَبُوْنَ مِنَ النَّهْيِ',       labelEn: '2nd person pl. masc. (أَنْتُمْ)',   category: 'النَّهْيِ' },
  { number: 67, label: 'الْمُخَاطَبَاتُ مِنَ النَّهْيِ',        labelEn: '2nd person pl. fem. (أَنْتُنَّ)',   category: 'النَّهْيِ' },
  { number: 68, label: 'الْمُتَكَلِّمُ مِنَ النَّهْيِ',          labelEn: '1st person (let me not — أَنَا)',   category: 'النَّهْيِ' },

  // اسْمُ الْفَاعِلِ — Active Participle (#69-74)
  { number: 69, label: 'اسْمُ الْفَاعِلِ الْمُوَحَّدُ',            labelEn: 'Active participle sing. masc.',     category: 'اسْمُ الْفَاعِلِ' },
  { number: 70, label: 'اسْمُ الْفَاعِلِ الْمُثْنَى',             labelEn: 'Active participle dual masc.',      category: 'اسْمُ الْفَاعِلِ' },
  { number: 71, label: 'اسْمُ الْفَاعِلِ مَجْمُوعُ الْمُذَكَّرِ',  labelEn: 'Active participle pl. masc.',       category: 'اسْمُ الْفَاعِلِ' },
  { number: 72, label: 'اسْمُ الْفَاعِلِ الْمُوَحَّدَةُ',          labelEn: 'Active participle sing. fem.',      category: 'اسْمُ الْفَاعِلِ' },
  { number: 73, label: 'اسْمُ الْفَاعِلِ الْمُثْنَاةُ',           labelEn: 'Active participle dual fem.',       category: 'اسْمُ الْفَاعِلِ' },
  { number: 74, label: 'اسْمُ الْفَاعِلِ مَجْمُوعُ الْمُؤَنَّثِ',  labelEn: 'Active participle pl. fem.',        category: 'اسْمُ الْفَاعِلِ' },

  // اسْمُ الْمَفْعُولِ — Passive Participle (#75-80)
  { number: 75, label: 'اسْمُ الْمَفْعُولِ الْمُوَحَّدُ',            labelEn: 'Passive participle sing. masc.',    category: 'اسْمُ الْمَفْعُولِ' },
  { number: 76, label: 'اسْمُ الْمَفْعُولِ الْمُثْنَى',             labelEn: 'Passive participle dual masc.',     category: 'اسْمُ الْمَفْعُولِ' },
  { number: 77, label: 'اسْمُ الْمَفْعُولِ مَجْمُوعُ الْمُذَكَّرِ',  labelEn: 'Passive participle pl. masc.',      category: 'اسْمُ الْمَفْعُولِ' },
  { number: 78, label: 'اسْمُ الْمَفْعُولِ الْمُوَحَّدَةُ',          labelEn: 'Passive participle sing. fem.',     category: 'اسْمُ الْمَفْعُولِ' },
  { number: 79, label: 'اسْمُ الْمَفْعُولِ الْمُثْنَاةُ',           labelEn: 'Passive participle dual fem.',      category: 'اسْمُ الْمَفْعُولِ' },
  { number: 80, label: 'اسْمُ الْمَفْعُولِ مَجْمُوعُ الْمُؤَنَّثِ',  labelEn: 'Passive participle pl. fem.',       category: 'اسْمُ الْمَفْعُولِ' },
];

/**
 * Get a random seegah from categories matching the selected conjugation types.
 * @param selectedConjugationTypes - The user's selected conjugation type keys
 *   (e.g. 'الماضي المبني للمعلوم', 'الأمر', etc.)
 * @returns A random Seegah, or the first entry as fallback
 */
export function getRandomSeegah(selectedConjugationTypes: string[]): Seegah {
  // Map selected conjugation type keys to siyagh categories
  const activeCategories = selectedConjugationTypes
    .map(ct => CATEGORY_MAP[ct])
    .filter(Boolean);

  // Filter siyagh to only those in active categories
  const eligible = activeCategories.length > 0
    ? SIYAGH.filter(s => activeCategories.includes(s.category))
    : SIYAGH;

  return eligible[Math.floor(Math.random() * eligible.length)];
}

/**
 * Get the selectedConjugationTypes key for a given siyagh category.
 */
export function getCategoryKey(seegahCategory: string): string | undefined {
  return REVERSE_CATEGORY_MAP[seegahCategory];
}
