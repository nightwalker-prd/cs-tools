import type { StoryArc } from '../../../types';
import { episode as ep1 } from './episode1';
import { episode as ep2 } from './episode2';
import { episode as ep3 } from './episode3';
import { episode as ep4 } from './episode4';
import { episode as ep5 } from './episode5';

export const marketplaceArc: StoryArc = {
  id: 'arc2-marketplace',
  titleAr: 'فِي السُّوقِ',
  titleEn: 'The Marketplace',
  description: 'Ahmad explores a traditional marketplace, learning to shop, describe items by color and size, bargain with merchants, and use possessive constructions. Covers adjective agreement, numbers, comparatives, and idafa.',
  difficulty: 'intermediate',
  totalEpisodes: 5,
  episodes: [ep1, ep2, ep3, ep4, ep5],
};
