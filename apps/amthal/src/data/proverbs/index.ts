import type { Proverb, ProverbCategory } from '../../types';
import { wisdomProverbs } from './wisdom';
import { socialProverbs } from './social';
import { humorProverbs } from './humor';
import { perseveranceProverbs } from './perseverance';
import { knowledgeProverbs } from './knowledge';
import { faithProverbs } from './faith';

export const ALL_PROVERBS: Proverb[] = [
  ...wisdomProverbs,
  ...socialProverbs,
  ...humorProverbs,
  ...perseveranceProverbs,
  ...knowledgeProverbs,
  ...faithProverbs,
];

export const PROVERBS_BY_CATEGORY: Record<ProverbCategory, Proverb[]> = {
  wisdom: wisdomProverbs,
  social: socialProverbs,
  humor: humorProverbs,
  perseverance: perseveranceProverbs,
  knowledge: knowledgeProverbs,
  faith: faithProverbs,
};

const proverbMap = new Map(ALL_PROVERBS.map(p => [p.id, p]));

export function getProverbById(id: string): Proverb | undefined {
  return proverbMap.get(id);
}

export function getProverbsByCategory(category: ProverbCategory): Proverb[] {
  return PROVERBS_BY_CATEGORY[category] || [];
}

export function getProverbCount(): number {
  return ALL_PROVERBS.length;
}

export function getCategoryCount(): number {
  return Object.keys(PROVERBS_BY_CATEGORY).length;
}
