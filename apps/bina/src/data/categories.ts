import type { CategoryInfo } from '../types';

export const categories: CategoryInfo[] = [
  {
    id: 'nominal',
    name: 'Nominal Sentences',
    nameAr: 'الجملة الاسمية',
    description: 'Subject-predicate structures starting with a noun',
    icon: 'BookOpen',
  },
  {
    id: 'possessive',
    name: 'Possessive (Idafa)',
    nameAr: 'الإضافة',
    description: 'Noun-noun possessive constructions',
    icon: 'Link',
  },
  {
    id: 'definiteness',
    name: 'Definiteness',
    nameAr: 'التعريف والتنكير',
    description: 'Definite and indefinite noun phrases',
    icon: 'Tag',
  },
  {
    id: 'verbal',
    name: 'Verbal Sentences',
    nameAr: 'الجملة الفعلية',
    description: 'Verb-subject-object structures and agreement',
    icon: 'Zap',
  },
  {
    id: 'particles',
    name: 'Particles (Kana/Inna)',
    nameAr: 'كان وأخواتها / إنّ وأخواتها',
    description: 'Kana and sisters, Inna and sisters',
    icon: 'Star',
  },
  {
    id: 'complex',
    name: 'Complex Structures',
    nameAr: 'التراكيب المركّبة',
    description: 'Nested sentences, relative clauses, conditionals',
    icon: 'Layers',
  },
];

export function getCategoryById(id: string): CategoryInfo | undefined {
  return categories.find(c => c.id === id);
}
