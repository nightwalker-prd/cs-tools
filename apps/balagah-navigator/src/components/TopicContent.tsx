import type { TopicContent as TopicContentType } from '../data/types';
import { SummaryBox } from './SummaryBox';
import { RuleCard } from './RuleCard';
import { BalagahTable } from './BalagahTable';
import { ExampleBlock } from './ExampleBlock';
import { ContentRenderer } from './ContentRenderer';

interface TopicContentProps {
  content: TopicContentType;
}

export function TopicContent({ content }: TopicContentProps) {
  return (
    <div className="level-content animate-fade-in">
      <SummaryBox summary={content.summary} sourceRef={content.sourceRef} />

      {content.body && (
        <div className="prose-content">
          <ContentRenderer markdown={content.body} />
        </div>
      )}

      {content.rules && content.rules.length > 0 && (
        <div className="rules-section">
          <h3 className="section-title">Key Rules</h3>
          {content.rules.map((rule, i) => (
            <RuleCard key={i} rule={rule} index={i} />
          ))}
        </div>
      )}

      {content.tables && content.tables.length > 0 && (
        <div className="tables-section">
          {content.tables.map((table, i) => (
            <BalagahTable key={i} table={table} />
          ))}
        </div>
      )}

      {content.examples && content.examples.length > 0 && (
        <div className="examples-section">
          <h3 className="section-title">Examples</h3>
          {content.examples.map((ex, i) => (
            <ExampleBlock key={i} example={ex} />
          ))}
        </div>
      )}
    </div>
  );
}
