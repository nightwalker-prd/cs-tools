export interface GrammaticalPerson {
  id: string;
  english: string;
  arabic: string;
}

export const grammaticalPersons: GrammaticalPerson[] = [
  { id: 'هُوَ', english: 'He (3rd masc. sing.)', arabic: 'هُوَ' },
  { id: 'هُمَا_مُذَكَّر', english: 'They two (3rd masc. dual)', arabic: 'هُمَا (مُذَكَّر)' },
  { id: 'هُمْ', english: 'They (3rd masc. pl.)', arabic: 'هُمْ' },
  { id: 'هِيَ', english: 'She (3rd fem. sing.)', arabic: 'هِيَ' },
  { id: 'هُمَا_مُؤَنَّث', english: 'They two (3rd fem. dual)', arabic: 'هُمَا (مُؤَنَّث)' },
  { id: 'هُنَّ', english: 'They (3rd fem. pl.)', arabic: 'هُنَّ' },
  { id: 'أَنْتَ', english: 'You (2nd masc. sing.)', arabic: 'أَنْتَ' },
  { id: 'أَنْتُمَا', english: 'You two (2nd dual)', arabic: 'أَنْتُمَا' },
  { id: 'أَنْتُمْ', english: 'You (2nd masc. pl.)', arabic: 'أَنْتُمْ' },
  { id: 'أَنْتِ', english: 'You (2nd fem. sing.)', arabic: 'أَنْتِ' },
  { id: 'أَنْتُمَا_2', english: 'You two (2nd dual)', arabic: 'أَنْتُمَا' },
  { id: 'أَنْتُنَّ', english: 'You (2nd fem. pl.)', arabic: 'أَنْتُنَّ' },
  { id: 'أَنَا', english: 'I (1st sing.)', arabic: 'أَنَا' },
  { id: 'نَحْنُ', english: 'We (1st pl.)', arabic: 'نَحْنُ' },
];

export interface ColumnInfo {
  id: string;
  labelAr: string;
  labelEn: string;
}

export const columns: ColumnInfo[] = [
  { id: 'activePast', labelAr: 'الماضي المعلوم', labelEn: 'Active Past' },
  { id: 'activePresent', labelAr: 'المضارع المعلوم', labelEn: 'Active Present' },
  { id: 'passivePast', labelAr: 'الماضي المجهول', labelEn: 'Passive Past' },
  { id: 'passivePresent', labelAr: 'المضارع المجهول', labelEn: 'Passive Present' },
  { id: 'imperative', labelAr: 'الأمر', labelEn: 'Imperative' },
  { id: 'prohibition', labelAr: 'النهي', labelEn: 'Prohibition' },
  { id: 'activeParticiple', labelAr: 'اسم الفاعل', labelEn: 'Active Participle' },
  { id: 'passiveParticiple', labelAr: 'اسم المفعول', labelEn: 'Passive Participle' },
];
