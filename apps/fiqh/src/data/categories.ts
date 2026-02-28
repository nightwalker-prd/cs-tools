import type { FiqhCategory } from '../types';

export const CATEGORIES: FiqhCategory[] = [
  {
    id: 'ibadat',
    titleAr: 'العبادات',
    titleEn: 'Acts of Worship',
    icon: '🕌',
    description: 'Purification, prayer, fasting, zakat, hajj, sacrifice, and slaughter',
    kitabIds: ['taharah', 'salah', 'zakah', 'sawm', 'hajj', 'ashribah', 'sayd-dhabaih', 'udhiyah'],
  },
  {
    id: 'muamalat',
    titleAr: 'المعاملات',
    titleEn: 'Financial Transactions',
    icon: '⚖️',
    description: 'Sales, loans, partnerships, hiring, and commercial law',
    kitabIds: [
      'buyu', 'rahn', 'hajr', 'ijarah', 'shufah', 'shirkah', 'mudarabah',
      'wakalah', 'kafalah', 'hawalah', 'sulh', 'hibah', 'waqf', 'ghasb',
      'wadiah', 'ariyah', 'laqit', 'ihya-mawat', 'muzaraah',
    ],
  },
  {
    id: 'munakahaat',
    titleAr: 'المناكحات',
    titleEn: 'Marriage & Family',
    icon: '👨‍👩‍👧',
    description: 'Marriage, divorce, custody, maintenance, and family relations',
    kitabIds: ['nikah', 'radaa', 'talaq', 'ila', 'dhihar', 'nafaqat', 'hadanah'],
  },
  {
    id: 'jinayaat',
    titleAr: 'الجنايات',
    titleEn: 'Criminal Law',
    icon: '⚔️',
    description: 'Criminal offenses, punishments, retribution, and military law',
    kitabIds: ['jinayat', 'diyat', 'hudud', 'sariqah', 'siyar', 'bughat'],
  },
  {
    id: 'aqdhiyah',
    titleAr: 'القضاء والشهادات',
    titleEn: 'Judiciary & Testimony',
    icon: '📜',
    description: 'Claims, testimony, judicial conduct, and legal proceedings',
    kitabIds: ['iqrar', 'dawa', 'shahadat', 'adab-qadi', 'qismah'],
  },
  {
    id: 'mutafarriqat',
    titleAr: 'المتفرقات',
    titleEn: 'Miscellaneous',
    icon: '📚',
    description: 'Oaths, wills, inheritance, manumission, and other topics',
    kitabIds: [
      'khuntha', 'mafqud', 'ibaq', 'madhun', 'itq', 'mukatab',
      'walaa', 'ayman', 'ikrah', 'hazr-ibahah', 'wasaya', 'faraid',
    ],
  },
];

export function getCategoryById(id: string): FiqhCategory | undefined {
  return CATEGORIES.find(c => c.id === id);
}

export function getCategoryForKitab(kitabId: string): FiqhCategory | undefined {
  return CATEGORIES.find(c => c.kitabIds.includes(kitabId));
}
