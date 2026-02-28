import type { ForgeRoot, Tier, VerbType, VerbForm } from '../types';
import { arabicWords } from '@arabtools/conjugation/src/data/arabicRoots';

function buildRoots(): ForgeRoot[] {
  const seen = new Set<string>();
  const roots: ForgeRoot[] = [];

  for (const word of arabicWords) {
    const rootKey = word.root;
    if (seen.has(rootKey)) continue;
    seen.add(rootKey);

    const letters = word.root.split(' ');
    const id = letters.join('');
    const tier = assignTier(word.type, word.verbForm);

    roots.push({
      id,
      letters: letters.join('-'),
      arabic: letters.join(''),
      root: word.root,
      meaning: word.meaning || '',
      field: word.meaning ? capitalizeFirst(word.meaning.replace(/^to /, '')) : '',
      type: word.type as VerbType,
      verbForm: (word.verbForm || 'I') as VerbForm,
      pastTense: word.pastTense,
      presentTense: word.presentTense,
      tier,
    });
  }

  return roots;
}

function assignTier(type: string, verbForm?: string): Tier {
  if (verbForm && verbForm !== 'I') return 4;
  if (type === 'Regular') return 1;
  if (type.startsWith('Mahmooz')) return 2;
  if (type === 'Mithal') return 2;
  if (type === 'Ajwaf' || type === 'Naqis') return 3;
  return 4;
}

function capitalizeFirst(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export const ROOTS: ForgeRoot[] = buildRoots();

export function getAvailableRoots(unlockedTiers: Set<number>): ForgeRoot[] {
  return ROOTS.filter(r => unlockedTiers.has(r.tier));
}
