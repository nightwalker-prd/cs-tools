import type { NahwTopic, NahwCategory, Difficulty } from '../data/types';
import type { ResourceInfo } from '../data/video-mapping';
import type { ViewMode } from '../data/view-data';
import { Breadcrumb } from './Breadcrumb';
import { LevelTabs } from './LevelTabs';
import { LevelContent } from './LevelContent';
import { RelatedTopics } from './RelatedTopics';

interface TopicViewProps {
  topic: NahwTopic;
  categories: NahwCategory[];
  onNavigate: (slug: string) => void;
  onGoHome: () => void;
  showResources?: boolean;
  activeLevel: Difficulty;
  onChangeLevel: (level: Difficulty) => void;
  viewMode: ViewMode;
  activePdfUrl?: string | null;
  onSelectPdf?: (resource: ResourceInfo) => void;
}

export function TopicView({ topic, categories, onNavigate, onGoHome, showResources, activeLevel, onChangeLevel, viewMode, activePdfUrl, onSelectPdf }: TopicViewProps) {
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
        onChangeLevel={onChangeLevel}
      />

      {content && (
        <LevelContent
          content={content}
          showResources={showResources}
          viewMode={viewMode}
          activePdfUrl={activePdfUrl}
          onSelectPdf={onSelectPdf}
        />
      )}

      <RelatedTopics topicIds={topic.relatedTopicIds} onNavigate={onNavigate} />
    </div>
  );
}
