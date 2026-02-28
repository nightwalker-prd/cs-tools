import { useState } from 'react';

interface FluencyDashboardProps {
  lessonStats: { totalSessions: number; avgWpm: number; bestWpm: number; totalWords: number; recentWpms: number[] };
  allStats: { totalSessions: number; avgWpm: number; bestWpm: number; totalWords: number; recentWpms: number[] };
}

export function FluencyDashboard({ lessonStats, allStats }: FluencyDashboardProps) {
  const [showAll, setShowAll] = useState(false);
  const stats = showAll ? allStats : lessonStats;

  if (stats.totalSessions === 0 && !showAll) {
    return null;
  }

  const maxWpm = Math.max(...stats.recentWpms, 1);

  return (
    <div className="fluency-dashboard">
      <div className="fluency-dashboard-header">
        <h3>Fluency Progress</h3>
        <button
          className="fluency-toggle-btn"
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? 'This lesson' : 'All lessons'}
        </button>
      </div>

      <div className="fluency-dashboard-stats">
        <div className="fluency-stat-card compact">
          <div className="fluency-stat-value">{stats.totalSessions}</div>
          <div className="fluency-stat-label">Sessions</div>
        </div>
        <div className="fluency-stat-card compact">
          <div className="fluency-stat-value">{stats.avgWpm}</div>
          <div className="fluency-stat-label">Avg WPM</div>
        </div>
        <div className="fluency-stat-card compact">
          <div className="fluency-stat-value">{stats.bestWpm}</div>
          <div className="fluency-stat-label">Best WPM</div>
        </div>
        <div className="fluency-stat-card compact">
          <div className="fluency-stat-value">{stats.totalWords.toLocaleString()}</div>
          <div className="fluency-stat-label">Total Words</div>
        </div>
      </div>

      {stats.recentWpms.length > 0 && (
        <div className="fluency-chart">
          <div className="fluency-chart-label">WPM History (last 10 sessions)</div>
          <div className="fluency-chart-bars">
            {stats.recentWpms.map((wpm, i) => (
              <div key={i} className="fluency-chart-bar-wrapper">
                <div
                  className="fluency-chart-bar"
                  style={{ height: `${(wpm / maxWpm) * 100}%` }}
                >
                  <span className="fluency-chart-bar-value">{wpm}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
