import type { StoryArc } from '../../../types';
import { episode as ep1 } from './episode1';
import { episode as ep2 } from './episode2';
import { episode as ep3 } from './episode3';
import { episode as ep4 } from './episode4';
import { episode as ep5 } from './episode5';

export const ahmadFirstWeekArc: StoryArc = {
  id: 'arc1-ahmad',
  titleAr: 'أُسْبُوعُ أَحْمَدَ الأَوَّلُ',
  titleEn: "Ahmad's First Week",
  description: 'Follow Ahmad as he arrives at a Saudi university and navigates his first week — from registration to making friends. Covers greetings, introductions, classroom vocabulary, directions, food, and descriptions.',
  difficulty: 'beginner',
  totalEpisodes: 5,
  episodes: [ep1, ep2, ep3, ep4, ep5],
};
