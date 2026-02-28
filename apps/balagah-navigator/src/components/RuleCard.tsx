import type { BalagahRule } from '../data/types';
import { ExampleBlock } from './ExampleBlock';

interface RuleCardProps {
  rule: BalagahRule;
  index: number;
}

export function RuleCard({ rule, index }: RuleCardProps) {
  return (
    <div className="rule-card">
      <div className="rule-card-header">
        <span className="rule-number">{index + 1}</span>
        <div className="rule-card-text">
          {rule.arabic && (
            <p className="rule-arabic font-arabic" dir="rtl">{rule.arabic}</p>
          )}
          <p className="rule-english">{rule.english}</p>
        </div>
      </div>
      {rule.examples && rule.examples.length > 0 && (
        <div className="rule-examples">
          {rule.examples.map((ex, i) => (
            <ExampleBlock key={i} example={ex} />
          ))}
        </div>
      )}
    </div>
  );
}
