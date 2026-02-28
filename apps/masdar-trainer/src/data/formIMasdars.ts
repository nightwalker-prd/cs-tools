/**
 * Form I Masdar Pattern Catalog
 *
 * Form I masdars are notoriously irregular -- there are 30+ possible patterns.
 * Each must be memorized individually. This catalog provides a reference
 * organized by pattern.
 */

export interface FormIMasdarPattern {
  pattern: string;
  patternAr: string;
  examples: { verb: string; masdar: string; meaning: string }[];
}

export const formIMasdars: FormIMasdarPattern[] = [
  {
    pattern: "fa'l",
    patternAr: 'فَعْل',
    examples: [
      { verb: 'فَتَحَ', masdar: 'فَتْح', meaning: 'to open' },
      { verb: 'نَصَرَ', masdar: 'نَصْر', meaning: 'to help' },
      { verb: 'ضَرَبَ', masdar: 'ضَرْب', meaning: 'to hit' },
      { verb: 'أَكَلَ', masdar: 'أَكْل', meaning: 'to eat' },
      { verb: 'شَرِبَ', masdar: 'شُرْب', meaning: 'to drink' },
    ],
  },
  {
    pattern: "fu'uul",
    patternAr: 'فُعُول',
    examples: [
      { verb: 'جَلَسَ', masdar: 'جُلُوس', meaning: 'to sit' },
      { verb: 'دَخَلَ', masdar: 'دُخُول', meaning: 'to enter' },
      { verb: 'خَرَجَ', masdar: 'خُرُوج', meaning: 'to exit' },
      { verb: 'سَجَدَ', masdar: 'سُجُود', meaning: 'to prostrate' },
      { verb: 'نَزَلَ', masdar: 'نُزُول', meaning: 'to descend' },
    ],
  },
  {
    pattern: "fi'aalah",
    patternAr: 'فِعَالَة',
    examples: [
      { verb: 'كَتَبَ', masdar: 'كِتَابَة', meaning: 'to write' },
      { verb: 'قَرَأَ', masdar: 'قِرَاءَة', meaning: 'to read' },
      { verb: 'تَجَرَ', masdar: 'تِجَارَة', meaning: 'to trade' },
      { verb: 'زَرَعَ', masdar: 'زِرَاعَة', meaning: 'to farm' },
    ],
  },
  {
    pattern: "fi'l",
    patternAr: 'فِعْل',
    examples: [
      { verb: 'عَلِمَ', masdar: 'عِلْم', meaning: 'to know' },
      { verb: 'حِفْظَ', masdar: 'حِفْظ', meaning: 'to memorize' },
      { verb: 'فِقْهَ', masdar: 'فِقْه', meaning: 'to understand' },
    ],
  },
  {
    pattern: "fu'lah",
    patternAr: 'فُعْلَة',
    examples: [
      { verb: 'غَرَفَ', masdar: 'غُرْفَة', meaning: 'to scoop (a room)' },
      { verb: 'لَقَمَ', masdar: 'لُقْمَة', meaning: 'to eat a morsel' },
    ],
  },
  {
    pattern: "fa'aal",
    patternAr: 'فَعَال',
    examples: [
      { verb: 'ذَهَبَ', masdar: 'ذَهَاب', meaning: 'to go' },
      { verb: 'سَمَحَ', masdar: 'سَمَاح', meaning: 'to permit' },
      { verb: 'جَمَلَ', masdar: 'جَمَال', meaning: 'to be beautiful' },
    ],
  },
  {
    pattern: "fa'iil",
    patternAr: 'فَعِيل',
    examples: [
      { verb: 'رَحِلَ', masdar: 'رَحِيل', meaning: 'to depart' },
      { verb: 'نَبَحَ', masdar: 'نَبِيح', meaning: 'to bark' },
    ],
  },
  {
    pattern: "fa'alaan",
    patternAr: 'فَعَلَان',
    examples: [
      { verb: 'غَضِبَ', masdar: 'غَضَبَان', meaning: 'to be angry' },
      { verb: 'طَارَ', masdar: 'طَيَرَان', meaning: 'to fly' },
      { verb: 'دَارَ', masdar: 'دَوَرَان', meaning: 'to rotate' },
    ],
  },
  {
    pattern: "fa'aalah",
    patternAr: 'فَعَالَة',
    examples: [
      { verb: 'شَجُعَ', masdar: 'شَجَاعَة', meaning: 'to be brave' },
      { verb: 'فَصُحَ', masdar: 'فَصَاحَة', meaning: 'to be eloquent' },
      { verb: 'بَلُغَ', masdar: 'بَلَاغَة', meaning: 'to be eloquent (rhetoric)' },
    ],
  },
  {
    pattern: "fu'aal",
    patternAr: 'فُعَال',
    examples: [
      { verb: 'صَدَعَ', masdar: 'صُدَاع', meaning: 'to have a headache' },
      { verb: 'سَعَلَ', masdar: 'سُعَال', meaning: 'to cough' },
    ],
  },
  {
    pattern: "maf'al",
    patternAr: 'مَفْعَل',
    examples: [
      { verb: 'رَجَعَ', masdar: 'مَرْجِع', meaning: 'to return' },
      { verb: 'دَخَلَ', masdar: 'مَدْخَل', meaning: 'to enter (entrance)' },
    ],
  },
  {
    pattern: "taf'iilah",
    patternAr: 'تَفْعِلَة',
    examples: [
      { verb: 'ذَكَرَ', masdar: 'تَذْكِرَة', meaning: 'to remember (reminder/ticket)' },
      { verb: 'جَرَبَ', masdar: 'تَجْرِبَة', meaning: 'to try (experience)' },
    ],
  },
];
