import { useMemo } from 'react';
import type { Lesson } from '../data/types';

export interface SearchResult {
  lessonId: string;
  titleEn: string;
  titleAr: string;
  unitId: string;
  matchType: 'title' | 'content';
}

export function useSearch(lessons: Lesson[], query: string): SearchResult[] {
  return useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase().trim();
    const results: SearchResult[] = [];

    for (const lesson of lessons) {
      const titleMatch =
        lesson.titleEn.toLowerCase().includes(q) ||
        lesson.titleAr.includes(q);

      if (titleMatch) {
        results.push({
          lessonId: lesson.id,
          titleEn: lesson.titleEn,
          titleAr: lesson.titleAr,
          unitId: lesson.unitId,
          matchType: 'title',
        });
        continue;
      }

      // Search content blocks for text matches
      const contentMatch = lesson.content.some(block => {
        if (block.type === 'text') return block.data.content.toLowerCase().includes(q);
        if (block.type === 'grammar-table') return block.data.title.toLowerCase().includes(q);
        if (block.type === 'vocabulary-grid') {
          return block.data.items.some(
            item => item.arabic.includes(q) || item.english.toLowerCase().includes(q)
          );
        }
        return false;
      });

      if (contentMatch) {
        results.push({
          lessonId: lesson.id,
          titleEn: lesson.titleEn,
          titleAr: lesson.titleAr,
          unitId: lesson.unitId,
          matchType: 'content',
        });
      }
    }

    return results;
  }, [lessons, query]);
}
