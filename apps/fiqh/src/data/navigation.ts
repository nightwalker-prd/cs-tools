import type { KitabMeta, Kitab, Bab, Section } from '../types';
import { CATEGORIES } from './categories';

export function getKitabsByCategory(index: KitabMeta[]) {
  return CATEGORIES.map(cat => ({
    ...cat,
    kutub: index.filter(k => cat.kitabIds.includes(k.id)),
  }));
}

export function flattenSections(kitab: Kitab): Section[] {
  return kitab.abwab.flatMap(b => b.sections);
}

export function findSection(kitab: Kitab, babId: string): { bab: Bab; section: Section } | undefined {
  for (const bab of kitab.abwab) {
    if (bab.id === babId) {
      return { bab, section: bab.sections[0] };
    }
    for (const section of bab.sections) {
      if (section.id === babId) {
        return { bab, section };
      }
    }
  }
  return undefined;
}

export function getAdjacentBab(kitab: Kitab, currentBabId: string, direction: 'prev' | 'next'): Bab | undefined {
  const idx = kitab.abwab.findIndex(b => b.id === currentBabId);
  if (idx === -1) return undefined;
  return direction === 'prev' ? kitab.abwab[idx - 1] : kitab.abwab[idx + 1];
}
