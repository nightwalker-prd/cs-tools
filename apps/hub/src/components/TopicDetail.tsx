import { ExternalLink } from 'lucide-react';
import type { TopicDefinition, TopicMastery } from '@/types/roadmap';
import { getDirectPrerequisites, getDirectDependents } from '@/data/topics';
import { TOPIC_TOOLS, MAX_TOOLS_PER_TOPIC } from '@/data/topic-tools';
import { tools, type Tool } from '@/data/tools';

interface TopicDetailProps {
  topic: TopicDefinition;
  mastery: TopicMastery;
  topicMasteryMap: Map<string, TopicMastery>;
  allTopics: Map<string, TopicDefinition>;
  onSelectTopic: (topicId: string) => void;
}

const STATUS_LABELS: Record<string, string> = {
  'not-started': 'Not Started',
  'in-progress': 'In Progress',
  'mastered': 'Mastered',
};

export function TopicDetail({
  topic,
  mastery,
  topicMasteryMap,
  allTopics,
  onSelectTopic,
}: TopicDetailProps) {
  const prerequisites = getDirectPrerequisites(topic.id);
  const dependents = getDirectDependents(topic.id);
  const toolIds = (TOPIC_TOOLS[topic.id] ?? []).slice(0, MAX_TOOLS_PER_TOPIC);
  const toolItems = toolIds
    .map((id) => tools.find((t) => t.id === id))
    .filter((t): t is Tool => t !== undefined);

  return (
    <div className="topic-detail animate-fade-in">
      <div className="topic-detail-header">
        <div>
          <h3 className="topic-detail-title">{topic.label}</h3>
          <p className="topic-detail-title-ar font-arabic" dir="rtl">{topic.labelAr}</p>
        </div>
        <div className={`topic-detail-status topic-detail-status--${mastery.status}`}>
          {STATUS_LABELS[mastery.status]}
          {mastery.percentage > 0 && ` (${Math.round(mastery.percentage)}%)`}
        </div>
      </div>

      {prerequisites.length > 0 && (
        <div className="topic-detail-section">
          <h4 className="topic-detail-section-title">Prerequisites</h4>
          <div className="topic-detail-chips">
            {prerequisites.map((prereqId) => {
              const prereq = allTopics.get(prereqId);
              const prereqMastery = topicMasteryMap.get(prereqId);
              if (!prereq) return null;
              return (
                <button
                  key={prereqId}
                  className={`topic-chip topic-chip--${prereqMastery?.status ?? 'not-started'}`}
                  onClick={() => onSelectTopic(prereqId)}
                  type="button"
                >
                  {prereq.label}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {dependents.length > 0 && (
        <div className="topic-detail-section">
          <h4 className="topic-detail-section-title">Unlocks</h4>
          <div className="topic-detail-chips">
            {dependents.map((depId) => {
              const dep = allTopics.get(depId);
              if (!dep) return null;
              return (
                <button
                  key={depId}
                  className="topic-chip topic-chip--not-started"
                  onClick={() => onSelectTopic(depId)}
                  type="button"
                >
                  {dep.label}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {toolItems.length > 0 && (
        <div className="topic-detail-section">
          <h4 className="topic-detail-section-title">Practice with</h4>
          <div className="topic-detail-tools">
            {toolItems.map((tool) => (
              <a
                key={tool.id}
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                className="topic-detail-tool"
              >
                <span className="topic-detail-tool-name">{tool.name}</span>
                <span className="topic-detail-tool-name-ar font-arabic">{tool.nameAr}</span>
                <ExternalLink size={12} className="topic-detail-tool-icon" />
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
