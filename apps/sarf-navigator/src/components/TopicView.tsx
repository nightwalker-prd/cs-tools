import { usePersistedState } from '@arabtools/core';
import type { SarfTopic, SarfCategory, Difficulty } from '../data/types';
import { Breadcrumb } from './Breadcrumb';
import { LevelTabs } from './LevelTabs';
import { LevelContent } from './LevelContent';
import { RelatedTopics } from './RelatedTopics';

interface TopicViewProps {
  topic: SarfTopic;
  categories: SarfCategory[];
  onNavigate: (slug: string) => void;
  onGoHome: () => void;
}

export function TopicView({ topic, categories, onNavigate, onGoHome }: TopicViewProps) {
  const [activeLevel, setActiveLevel] = usePersistedState<Difficulty>('arabtools-sarf-level', 'beginner');

  // Find the content for the active level, fall back to first available
  const availableLevels = topic.levels.map(l => l.difficulty);
  const effectiveLevel = availableLevels.includes(activeLevel) ? activeLevel : availableLevels[0];
  const content = topic.levels.find(l => l.difficulty === effectiveLevel);

  return (
    <div className="topic-view animate-fade-in-up">
      <Breadcrumb topic={topic} categories={categories} onGoHome={onGoHome} />

      <header className="topic-header">
        <h1 className="topic-title-en">{topic.titleEn}</h1>
        <p className="topic-title-ar font-arabic" dir="rtl">{topic.titleAr}</p>
        <p className="topic-transliteration">{topic.transliteration}</p>
      </header>

      <LevelTabs
        levels={topic.levels}
        activeLevel={effectiveLevel}
        onChangeLevel={setActiveLevel}
      />

      {content && <LevelContent content={content} />}

      <RelatedTopics topicIds={topic.relatedTopicIds} onNavigate={onNavigate} />
    </div>
  );
}
