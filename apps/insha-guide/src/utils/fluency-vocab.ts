import type { Lesson, VocabularyItem, ProgressData } from '../data/types';

/**
 * Extract all vocabulary items from a lesson's content blocks and compose word bank.
 */
export function extractLessonVocabulary(lesson: Lesson): VocabularyItem[] {
  const items: VocabularyItem[] = [];
  const seen = new Set<string>();

  const add = (item: VocabularyItem) => {
    if (!seen.has(item.arabic)) {
      seen.add(item.arabic);
      items.push(item);
    }
  };

  for (const block of lesson.content) {
    if (block.type === 'vocabulary-grid') {
      for (const item of block.data.items) add(item);
    } else if (block.type === 'synonym-group') {
      for (const group of block.data.groups) {
        for (const w of group.words) add({ arabic: w.arabic, english: w.english });
      }
    } else if (block.type === 'linking-tools') {
      for (const cat of block.data.categories) {
        for (const tool of cat.tools) add({ arabic: tool.arabic, english: tool.english });
      }
    } else if (block.type === 'model-essay' && block.data.vocabulary) {
      for (const item of block.data.vocabulary) add(item);
    }
  }

  // Also pull from compose word bank
  if (lesson.compose) {
    for (const cat of lesson.compose.wordBank) {
      for (const w of cat.words) add(w);
    }
  }

  return items;
}

/**
 * Pool vocabulary from all visited lessons.
 */
export function poolVocabulary(
  lessons: Lesson[],
  progress: ProgressData,
  currentLessonId: string,
  includeAll: boolean
): VocabularyItem[] {
  if (!includeAll) {
    const lesson = lessons.find(l => l.id === currentLessonId);
    return lesson ? extractLessonVocabulary(lesson) : [];
  }

  const items: VocabularyItem[] = [];
  const seen = new Set<string>();

  for (const lesson of lessons) {
    if (!progress.lessonsVisited[lesson.id]) continue;
    for (const item of extractLessonVocabulary(lesson)) {
      if (!seen.has(item.arabic)) {
        seen.add(item.arabic);
        items.push(item);
      }
    }
  }

  return items;
}
