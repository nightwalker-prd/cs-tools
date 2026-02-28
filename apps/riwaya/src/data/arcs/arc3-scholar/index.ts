import type { StoryArc } from '../../../types';
import { episode as ep1 } from './episode1';
import { episode as ep2 } from './episode2';
import { episode as ep3 } from './episode3';
import { episode as ep4 } from './episode4';
import { episode as ep5 } from './episode5';

export const scholarJourneyArc: StoryArc = {
  id: 'arc3-scholar',
  titleAr: 'رِحْلَةُ الطَّالِبِ',
  titleEn: "The Scholar's Journey",
  description: 'Ahmad joins a traditional study circle and delves into classical Arabic grammar — from the three parts of speech to inna and its sisters, conditionals, relative clauses, and kana. Culminates in Ahmad becoming a teacher himself.',
  difficulty: 'advanced',
  totalEpisodes: 5,
  episodes: [ep1, ep2, ep3, ep4, ep5],
};
