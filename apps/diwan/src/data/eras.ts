import { EraInfo } from '../types';

export const ERAS: EraInfo[] = [
  { id: 'jahili', nameAr: 'العصر الجاهلي', nameEn: 'Pre-Islamic', order: 1 },
  { id: 'islami', nameAr: 'صدر الإسلام', nameEn: 'Early Islamic', order: 2 },
  { id: 'umawi', nameAr: 'العصر الأموي', nameEn: 'Umayyad', order: 3 },
  { id: 'abbasi', nameAr: 'العصر العباسي', nameEn: 'Abbasid', order: 4 },
  { id: 'andalusi', nameAr: 'العصر الأندلسي', nameEn: 'Andalusian', order: 5 },
  { id: 'sufi', nameAr: 'الشعر الصوفي', nameEn: 'Sufi', order: 6 },
  { id: 'modern', nameAr: 'العصر الحديث', nameEn: 'Modern', order: 7 },
];
