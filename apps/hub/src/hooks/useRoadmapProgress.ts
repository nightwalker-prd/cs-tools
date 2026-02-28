import { useMemo } from 'react';
import type { TopicMastery, TopicStatus, UnitProgress } from '@/types/roadmap';
import { getTopicsByUnit, UNIT_TITLES } from '@/data/topics';

/** Tashkhis types — read raw from localStorage */
interface TashkhisCategoryScore {
  categoryId: string;
  percentage: number;
}

interface TashkhisUnitScorecard {
  categories: TashkhisCategoryScore[];
}

interface TashkhisResult {
  completedAt: number;
  scorecards: TashkhisUnitScorecard[];
}

function getStatusFromPercentage(percentage: number): TopicStatus {
  if (percentage >= 70) return 'mastered';
  if (percentage > 0) return 'in-progress';
  return 'not-started';
}

function readTashkhisHistory(): TashkhisResult | null {
  try {
    const raw = localStorage.getItem('arabtools-tashkhis-history');
    if (!raw) return null;
    const history: TashkhisResult[] = JSON.parse(raw);
    if (!Array.isArray(history) || history.length === 0) return null;
    // Most recent result (highest completedAt)
    return history.reduce((a, b) => (a.completedAt > b.completedAt ? a : b));
  } catch {
    return null;
  }
}

export function useRoadmapProgress() {
  const topicsByUnit = useMemo(() => getTopicsByUnit(), []);

  const tashkhisResult = useMemo(() => readTashkhisHistory(), []);

  const scoreByTopic = useMemo(() => {
    const map = new Map<string, number>();
    if (!tashkhisResult) return map;
    for (const scorecard of tashkhisResult.scorecards) {
      for (const cat of scorecard.categories) {
        map.set(cat.categoryId, cat.percentage);
      }
    }
    return map;
  }, [tashkhisResult]);

  const topicMasteryMap = useMemo(() => {
    const map = new Map<string, TopicMastery>();
    for (const [, topics] of topicsByUnit) {
      for (const topic of topics) {
        const percentage = scoreByTopic.get(topic.id) ?? 0;
        map.set(topic.id, {
          topicId: topic.id,
          status: getStatusFromPercentage(percentage),
          percentage,
        });
      }
    }
    return map;
  }, [topicsByUnit, scoreByTopic]);

  const unitProgress = useMemo((): UnitProgress[] => {
    const result: UnitProgress[] = [];
    for (const [unitNum, topics] of topicsByUnit) {
      const title = UNIT_TITLES[unitNum];
      if (!title) continue;
      const topicMasteries = topics.map(
        (t) => topicMasteryMap.get(t.id) ?? { topicId: t.id, status: 'not-started' as const, percentage: 0 }
      );
      result.push({
        unitNumber: unitNum,
        titleEn: title.en,
        titleAr: title.ar,
        topics: topicMasteries,
        masteredCount: topicMasteries.filter((t) => t.status === 'mastered').length,
        totalCount: topicMasteries.length,
      });
    }
    return result;
  }, [topicsByUnit, topicMasteryMap]);

  return {
    hasTashkhisData: tashkhisResult !== null,
    topicMasteryMap,
    unitProgress,
  };
}
