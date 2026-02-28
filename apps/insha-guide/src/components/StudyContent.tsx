import type { LessonContentBlock } from '../data/types';
import {
  GrammarTable,
  VocabularyGrid,
  ModelEssay,
  RuleCard,
  SynonymGroup,
  LinkingToolCard,
  TextBlock,
} from './study';

interface StudyContentProps {
  blocks: LessonContentBlock[];
}

export function StudyContent({ blocks }: StudyContentProps) {
  if (blocks.length === 0) {
    return (
      <div className="empty-state">
        <p>No study content available for this lesson yet.</p>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      {blocks.map((block, i) => {
        switch (block.type) {
          case 'grammar-table':
            return <GrammarTable key={i} data={block.data} />;
          case 'vocabulary-grid':
            return <VocabularyGrid key={i} data={block.data} />;
          case 'model-essay':
            return <ModelEssay key={i} data={block.data} />;
          case 'rule-card':
            return <RuleCard key={i} data={block.data} index={i} />;
          case 'synonym-group':
            return <SynonymGroup key={i} data={block.data} />;
          case 'linking-tools':
            return <LinkingToolCard key={i} data={block.data} />;
          case 'text':
            return <TextBlock key={i} data={block.data} />;
        }
      })}
    </div>
  );
}
