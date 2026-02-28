import type { SrsInsightsData } from '@arabtools/analytics/types';

interface MasteryDistributionProps {
  insights: SrsInsightsData;
}

export function MasteryDistribution({ insights }: MasteryDistributionProps) {
  const { retentionBuckets, totalItems } = insights;
  if (totalItems === 0) return null;

  // Map retention buckets to mastery levels
  const mastered = retentionBuckets.find((b) => b.range[0] >= 0.8)?.count ?? 0;
  const familiar = retentionBuckets.find((b) => b.range[0] >= 0.6 && b.range[0] < 0.8)?.count ?? 0;
  const learning = retentionBuckets.find((b) => b.range[0] >= 0.4 && b.range[0] < 0.6)?.count ?? 0;
  const newItems = retentionBuckets
    .filter((b) => b.range[0] < 0.4)
    .reduce((sum, b) => sum + b.count, 0);

  const segments = [
    { label: 'Mastered', count: mastered, color: 'var(--color-mastered, #4A7C59)' },
    { label: 'Familiar', count: familiar, color: 'var(--color-learning, #D4A574)' },
    { label: 'Learning', count: learning, color: 'var(--color-accent, #c5a253)' },
    { label: 'New', count: newItems, color: 'var(--color-new, #E8DFD0)' },
  ];

  return (
    <div className="mastery-dist">
      <div className="mastery-bar">
        {segments.map((seg) => {
          const pct = totalItems > 0 ? (seg.count / totalItems) * 100 : 0;
          if (pct === 0) return null;
          return (
            <div
              key={seg.label}
              className="mastery-segment"
              style={{ width: `${pct}%`, backgroundColor: seg.color }}
              title={`${seg.label}: ${seg.count} (${Math.round(pct)}%)`}
            />
          );
        })}
      </div>
      <div className="mastery-legend">
        {segments.map((seg) => (
          <div key={seg.label} className="mastery-legend-item">
            <div className="mastery-legend-dot" style={{ backgroundColor: seg.color }} />
            <span className="mastery-legend-label">{seg.label}</span>
            <span className="mastery-legend-count">{seg.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
