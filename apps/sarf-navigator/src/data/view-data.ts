import type { SarfTopic, SarfCategory } from './types';
import { allTopics, topicMap as fstuTopicMap } from './topics';
import { categories as fstuCategories } from './categories';
import { classicTopics, classicTopicMap } from './topics/classic-index';
import { classicCategories } from './classic-categories';

export type ViewMode = 'classic' | 'fstu';

export function getTopicsForView(view: ViewMode): SarfTopic[] {
  return view === 'classic' ? classicTopics : allTopics;
}

export function getTopicMapForView(view: ViewMode): Record<string, SarfTopic> {
  return view === 'classic' ? classicTopicMap : fstuTopicMap;
}

export function getCategoriesForView(view: ViewMode): SarfCategory[] {
  return view === 'classic' ? classicCategories : fstuCategories;
}
