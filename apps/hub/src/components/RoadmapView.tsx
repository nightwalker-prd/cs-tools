import { useMemo } from 'react';
import { ClipboardList } from 'lucide-react';
import type { TopicDefinition } from '@/types/roadmap';
import { useRoadmapProgress } from '@/hooks/useRoadmapProgress';
import { useRoadmapState } from '@/hooks/useRoadmapState';
import { getTopicsByUnit } from '@/data/topics';
import { UnitCard } from './UnitCard';

export function RoadmapView() {
  const { hasTashkhisData, topicMasteryMap, unitProgress } = useRoadmapProgress();
  const { expandedUnits, selectedTopic, toggleUnit, selectTopic } = useRoadmapState(unitProgress);
  const topicsByUnit = useMemo(() => getTopicsByUnit(), []);

  // Flat map of all topics for TopicDetail prereq/dependent lookup
  const allTopics = useMemo(() => {
    const map = new Map<string, TopicDefinition>();
    for (const [, topics] of topicsByUnit) {
      for (const topic of topics) {
        map.set(topic.id, topic);
      }
    }
    return map;
  }, [topicsByUnit]);

  return (
    <div className="roadmap-view animate-fade-in-up">
      {!hasTashkhisData && (
        <div className="roadmap-cta">
          <ClipboardList size={20} />
          <div>
            <p className="roadmap-cta-title">Take the Placement Test</p>
            <p className="roadmap-cta-desc">See your progress across all 43 grammar topics.</p>
          </div>
          <a
            href="https://arabtools-tashkhis.pages.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="roadmap-cta-btn"
          >
            Start Test
          </a>
        </div>
      )}

      <div className="roadmap-units">
        {unitProgress.map((unit) => (
          <UnitCard
            key={unit.unitNumber}
            unit={unit}
            topics={topicsByUnit.get(unit.unitNumber) ?? []}
            isExpanded={expandedUnits.has(unit.unitNumber)}
            selectedTopic={
              selectedTopic && topicsByUnit.get(unit.unitNumber)?.some((t) => t.id === selectedTopic)
                ? selectedTopic
                : null
            }
            topicMasteryMap={topicMasteryMap}
            allTopics={allTopics}
            onToggle={() => toggleUnit(unit.unitNumber)}
            onSelectTopic={selectTopic}
          />
        ))}
      </div>
    </div>
  );
}
