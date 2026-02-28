import type { LevelContent as LevelContentType } from '../data/types';
import { SummaryBox } from './SummaryBox';
import { RuleCard } from './RuleCard';
import { GrammarTable } from './GrammarTable';
import { ExampleBlock } from './ExampleBlock';
import { ContentRenderer } from './ContentRenderer';
import { IlaalTransformer } from './ilaal/IlaalTransformer';

interface LevelContentProps {
  content: LevelContentType;
}

export function LevelContent({ content }: LevelContentProps) {
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
          <h3 className="section-title">Rules</h3>
          {content.rules.map((rule, i) => (
            <RuleCard key={i} rule={rule} index={i} />
          ))}
        </div>
      )}

      {content.tables && content.tables.length > 0 && (
        <div className="tables-section">
          {content.tables.map((table, i) => (
            <GrammarTable key={i} table={table} />
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

      {content.interactiveWidget === 'ilaal-transformer' && (
        <div className="interactive-widget-section">
          <IlaalTransformer
            presetVerbType={content.widgetConfig?.presetVerbType}
            presetRoot={content.widgetConfig?.presetRoot}
            compact={content.widgetConfig?.compact}
          />
        </div>
      )}
    </div>
  );
}
