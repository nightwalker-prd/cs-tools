interface StatItem {
  label: string;
  value: string | number;
}

interface StatsDisplayProps {
  stats: StatItem[];
}

export function StatsDisplay({ stats }: StatsDisplayProps) {
  return (
    <div className="stats-grid">
      {stats.map((stat) => (
        <div key={stat.label} className="stats-pill">
          <span className="stats-pill-value">{stat.value}</span>
          <span className="stats-pill-label">{stat.label}</span>
        </div>
      ))}
    </div>
  );
}
