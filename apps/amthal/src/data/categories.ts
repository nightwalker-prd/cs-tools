import type { CategoryInfo } from '../types';

export const CATEGORIES: CategoryInfo[] = [
  {
    id: 'wisdom',
    nameEn: 'Wisdom',
    nameAr: 'حِكْمَة',
    icon: 'Lightbulb',
    color: '#c5a253',
    description: 'Timeless wisdom passed down through generations',
  },
  {
    id: 'social',
    nameEn: 'Social Relations',
    nameAr: 'العَلاقَات',
    icon: 'Users',
    color: '#4A90A4',
    description: 'Proverbs about relationships, community, and social life',
  },
  {
    id: 'humor',
    nameEn: 'Wit & Humor',
    nameAr: 'فُكَاهَة',
    icon: 'Smile',
    color: '#D4956A',
    description: 'Clever and humorous sayings with sharp observations',
  },
  {
    id: 'perseverance',
    nameEn: 'Perseverance',
    nameAr: 'صَبْر وَمُثَابَرَة',
    icon: 'Mountain',
    color: '#6B8E5A',
    description: 'Sayings about patience, endurance, and persistence',
  },
  {
    id: 'knowledge',
    nameEn: 'Knowledge',
    nameAr: 'عِلْم',
    icon: 'BookOpen',
    color: '#7B6BA4',
    description: 'Proverbs celebrating learning, education, and expertise',
  },
  {
    id: 'faith',
    nameEn: 'Faith & Trust',
    nameAr: 'إِيمَان وَتَوَكُّل',
    icon: 'Heart',
    color: '#1a3150',
    description: 'Sayings about faith, trust in God, and spiritual wisdom',
  },
];

export const CATEGORY_MAP = Object.fromEntries(
  CATEGORIES.map(c => [c.id, c])
) as Record<string, CategoryInfo>;
