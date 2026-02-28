import type { SubjectGroup } from './types';

export const SUBJECTS: SubjectGroup[] = [
  { id: 'arabic', title: 'Arabic', titleAr: 'العربية', icon: 'book-open' },
  { id: 'nahw', title: 'Nahw', titleAr: 'النحو', icon: 'git-branch' },
  { id: 'sarf', title: 'Sarf', titleAr: 'الصرف', icon: 'puzzle' },
  { id: 'balagah', title: 'Balagah', titleAr: 'البلاغة', icon: 'feather' },
  { id: 'logic', title: 'Logic', titleAr: 'المنطق', icon: 'brain' },
  { id: 'urdu', title: 'Urdu', titleAr: 'اردو', icon: 'languages' },
];

export const SUBJECT_MAP = Object.fromEntries(
  SUBJECTS.map((s) => [s.id, s])
) as Record<string, SubjectGroup>;
