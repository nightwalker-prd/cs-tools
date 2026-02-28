import type { BalagahTopic, BalagahUnit } from '../data/types';
import { Breadcrumb } from './Breadcrumb';
import { TopicContent } from './TopicContent';
import { RelatedTopics } from './RelatedTopics';

interface TopicViewProps {
  topic: BalagahTopic;
  units: BalagahUnit[];
  onNavigate: (slug: string) => void;
  onGoHome: () => void;
}

export function TopicView({ topic, units, onNavigate, onGoHome }: TopicViewProps) {
  return (
    <div className="topic-view animate-fade-in-up">
      <Breadcrumb topic={topic} units={units} onGoHome={onGoHome} />

      <header className="topic-header">
        <h1 className="topic-title-en">{topic.titleEn}</h1>
        <p className="topic-title-ar font-arabic" dir="rtl">{topic.titleAr}</p>
        <p className="topic-transliteration">{topic.transliteration}</p>
      </header>

      <TopicContent content={topic.content} />

      <RelatedTopics topicIds={topic.relatedTopicIds} onNavigate={onNavigate} />
    </div>
  );
}
