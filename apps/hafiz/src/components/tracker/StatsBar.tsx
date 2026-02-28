import type { HafizStats } from '../../types';

interface StatsBarProps {
  stats: HafizStats;
}

export function StatsBar({ stats }: StatsBarProps) {
  return (
    <div className="stats-bar">
      <div className="stats-progress">
        <div className="stats-progress-bar">
          <div
            className="stats-progress-fill"
            style={{ width: `${stats.percentComplete}%` }}
          />
        </div>
        <span className="stats-progress-label">{stats.percentComplete}% Complete</span>
      </div>

      <div className="stats-grid">
        <div className="stats-card">
          <div className="stats-card-value">{stats.memorized}</div>
          <div className="stats-card-label">Memorized</div>
        </div>
        <div className="stats-card">
          <div className="stats-card-value stats-card-gold">{stats.learning}</div>
          <div className="stats-card-label">Learning</div>
        </div>
        <div className="stats-card">
          <div className="stats-card-value stats-card-blue">{stats.dueCount}</div>
          <div className="stats-card-label">Due Today</div>
        </div>
        <div className="stats-card">
          <div className="stats-card-value stats-card-red">{stats.overdueCount}</div>
          <div className="stats-card-label">Overdue</div>
        </div>
        <div className="stats-card">
          <div className="stats-card-value stats-card-green">{stats.solid}</div>
          <div className="stats-card-label">Solid</div>
        </div>
      </div>
    </div>
  );
}
