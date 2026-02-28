import { Check } from 'lucide-react';
import type { TopicMastery, TopicDefinition } from '@/types/roadmap';

interface TopicNodeProps {
  topic: TopicDefinition;
  mastery: TopicMastery;
  isSelected: boolean;
  onClick: () => void;
}

export function TopicNode({ topic, mastery, isSelected, onClick }: TopicNodeProps) {
  const statusClass =
    mastery.status === 'mastered'
      ? 'topic-node--mastered'
      : mastery.status === 'in-progress'
        ? 'topic-node--in-progress'
        : 'topic-node--not-started';

  return (
    <button
      className={`topic-node ${statusClass} ${isSelected ? 'topic-node--selected' : ''}`}
      onClick={onClick}
      type="button"
    >
      <span className="topic-node-indicator">
        {mastery.status === 'mastered' ? (
          <Check size={12} />
        ) : mastery.status === 'in-progress' ? (
          <span className="topic-node-pct">{Math.round(mastery.percentage)}%</span>
        ) : null}
      </span>
      <span className="topic-node-label">{topic.label}</span>
      <span className="topic-node-label-ar font-arabic" dir="rtl">{topic.labelAr}</span>
    </button>
  );
}
