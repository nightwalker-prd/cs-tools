import type { RuleCardData } from '../../data/types';

interface RuleCardProps {
  data: RuleCardData;
  index?: number;
}

export function RuleCard({ data, index }: RuleCardProps) {
  return (
    <div className="rule-card">
      <div className="rule-card-header">
        {index !== undefined && <span className="rule-number">{index + 1}</span>}
        <div>
          <span className="rule-arabic font-arabic">{data.titleAr ?? data.title}</span>
        </div>
      </div>

      <p className="rule-english">{data.rule}</p>

      {data.examples.length > 0 && (
        <div className="rule-examples">
          {data.examples.map((ex, i) => (
            <div key={i} className="example-block">
              <div className="example-arabic font-arabic">{ex.arabic}</div>
              <div className="example-translation">{ex.explanation}</div>
            </div>
          ))}
        </div>
      )}

      {data.note && (
        <p style={{ fontSize: '0.82rem', color: 'var(--color-muted-foreground)', marginTop: '0.5rem', fontStyle: 'italic' }}>
          {data.note}
        </p>
      )}
    </div>
  );
}
