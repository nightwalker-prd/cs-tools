import type { StoryArc, StoryEpisode } from '../../types';
import { ahmadFirstWeekArc } from './arc1-ahmad';
import { marketplaceArc } from './arc2-marketplace';
import { scholarJourneyArc } from './arc3-scholar';

export const allArcs: StoryArc[] = [
  ahmadFirstWeekArc,
  marketplaceArc,
  scholarJourneyArc,
];

export function getArc(arcId: string): StoryArc | undefined {
  return allArcs.find((arc) => arc.id === arcId);
}

export function getEpisode(
  arcId: string,
  episodeNum: number,
): StoryEpisode | undefined {
  const arc = getArc(arcId);
  if (!arc) return undefined;
  return arc.episodes.find((ep) => ep.number === episodeNum);
}
