import { ChevronRight } from 'lucide-react';
import type { TopicDefinition, TopicMastery, UnitProgress } from '@/types/roadmap';
import { TopicNode } from './TopicNode';
import { TopicDetail } from './TopicDetail';

interface UnitCardProps {
  unit: UnitProgress;
  topics: TopicDefinition[];
  isExpanded: boolean;
  selectedTopic: string | null;
  topicMasteryMap: Map<string, TopicMastery>;
  allTopics: Map<string, TopicDefinition>;
  onToggle: () => void;
  onSelectTopic: (topicId: string | null) => void;
}

export function UnitCard({
  unit,
  topics,
  isExpanded,
  selectedTopic,
  topicMasteryMap,
  allTopics,
  onToggle,
  onSelectTopic,
}: UnitCardProps) {
  const progressPct = unit.totalCount > 0
    ? Math.round((unit.masteredCount / unit.totalCount) * 100)
    : 0;

  const selectedTopicDef = selectedTopic ? topics.find((t) => t.id === selectedTopic) : null;
  const selectedTopicMastery = selectedTopic ? topicMasteryMap.get(selectedTopic) : null;

  return (
    <section className="unit-card">
      <button className="unit-card-header" onClick={onToggle} type="button">
        <ChevronRight
          size={16}
          className={`unit-card-chevron ${isExpanded ? 'expanded' : ''}`}
        />
        <div className="unit-card-titles">
          <span className="unit-card-title">{unit.titleEn}</span>
          <span className="unit-card-title-ar font-arabic" dir="rtl">{unit.titleAr}</span>
        </div>
        <span className="unit-card-progress-text">
          {unit.masteredCount}/{unit.totalCount}
        </span>
        <div className="unit-card-progress-bar">
          <div className="unit-card-progress-fill" style={{ width: `${progressPct}%` }} />
        </div>
      </button>

      {isExpanded && (
        <div className="unit-card-body animate-fade-in">
          <div className="topic-grid">
            {topics.map((topic) => {
              const mastery = topicMasteryMap.get(topic.id) ?? {
                topicId: topic.id,
                status: 'not-started' as const,
                percentage: 0,
              };
              return (
                <TopicNode
                  key={topic.id}
                  topic={topic}
                  mastery={mastery}
                  isSelected={selectedTopic === topic.id}
                  onClick={() => onSelectTopic(topic.id)}
                />
              );
            })}
          </div>

          {selectedTopicDef && selectedTopicMastery && (
            <TopicDetail
              topic={selectedTopicDef}
              mastery={selectedTopicMastery}
              topicMasteryMap={topicMasteryMap}
              allTopics={allTopics}
              onSelectTopic={(id) => onSelectTopic(id)}
            />
          )}
        </div>
      )}
    </section>
  );
}
