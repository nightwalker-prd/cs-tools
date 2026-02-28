import type { RetentionBucket } from '@arabtools/analytics/types';

interface MemoryStrengthChartProps {
  buckets: RetentionBucket[];
}

export function MemoryStrengthChart({ buckets }: MemoryStrengthChartProps) {
  const totalItems = buckets.reduce((sum, b) => sum + b.count, 0);
  if (totalItems === 0) return null;

  return (
    <div className="memory-chart">
      <div className="memory-chart-bars">
        {buckets.map((bucket) => {
          const pct = totalItems > 0 ? (bucket.count / totalItems) * 100 : 0;
          return (
            <div key={bucket.label} className="memory-chart-row">
              <span className="memory-chart-label">{bucket.label}</span>
              <div className="memory-chart-bar-track">
                <div
                  className="memory-chart-bar-fill"
                  style={{ width: `${pct}%`, backgroundColor: bucket.color }}
                />
              </div>
              <span className="memory-chart-count">{bucket.count}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
