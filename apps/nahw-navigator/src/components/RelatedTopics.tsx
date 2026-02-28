import { topicMap } from '../data/topics';

interface RelatedTopicsProps {
  topicIds: string[];
  onNavigate: (slug: string) => void;
}

export function RelatedTopics({ topicIds, onNavigate }: RelatedTopicsProps) {
  const topics = topicIds
    .map(id => topicMap[id])
    .filter(Boolean);

  if (topics.length === 0) return null;

  return (
    <div className="related-topics">
      <h4>Related Topics</h4>
      <div className="related-topics-list">
        {topics.map(topic => (
          <button
            key={topic.id}
            className="related-topic-chip"
            onClick={() => onNavigate(topic.id)}
          >
            <span>{topic.titleEn}</span>
            <span className="font-arabic related-topic-ar">{topic.titleAr}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
