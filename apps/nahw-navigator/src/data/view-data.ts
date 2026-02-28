import type { NahwTopic, NahwCategory, Difficulty } from './types';
import { allTopics, topicMap as fstuTopicMap } from './topics';
import { categories as fstuCategories } from './categories';
import { classicTopics } from './topics/classic-index';
import { classicCategories } from './classic-categories';
import { getVideosForTopic } from './video-mapping';

export type ViewMode = 'classic' | 'fstu';

// Enrich classic topics with video data at module load time.
// Each level gets videos from the matching playlist (beginner→Sugra, etc.)
const enrichedClassicTopics: NahwTopic[] = classicTopics.map(topic => ({
  ...topic,
  levels: topic.levels.map(level => {
    const videos = getVideosForTopic(topic.id, level.difficulty as Difficulty);
    return videos.length > 0 ? { ...level, videos } : level;
  }),
}));

const enrichedClassicTopicMap: Record<string, NahwTopic> = {};
for (const topic of enrichedClassicTopics) {
  enrichedClassicTopicMap[topic.id] = topic;
}

export function getTopicsForView(view: ViewMode): NahwTopic[] {
  return view === 'classic' ? enrichedClassicTopics : allTopics;
}

export function getTopicMapForView(view: ViewMode): Record<string, NahwTopic> {
  return view === 'classic' ? enrichedClassicTopicMap : fstuTopicMap;
}

export function getCategoriesForView(view: ViewMode): NahwCategory[] {
  return view === 'classic' ? classicCategories : fstuCategories;
}
