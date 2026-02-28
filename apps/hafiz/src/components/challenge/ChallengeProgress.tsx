interface JuzProgressItem {
  juz: number;
  total: number;
  completed: number;
  percentComplete: number;
}

interface ChallengeProgressProps {
  currentDay: number;
  totalRubs: number;
  completedRubs: number;
  percentComplete: number;
  onTrack: boolean;
  streak: number;
  daysRemaining: number;
  juzProgress: JuzProgressItem[];
}

export function ChallengeProgress({
  currentDay,
  totalRubs,
  completedRubs,
  percentComplete,
  onTrack,
  streak,
  daysRemaining,
  juzProgress,
}: ChallengeProgressProps) {
  return (
    <div className="challenge-progress">
      <div className="challenge-day-counter">
        <span className="challenge-day-number">Day {currentDay}</span>
        <span className="challenge-day-of"> of 30</span>
      </div>

      <div className="challenge-overall">
        <div className="challenge-progress-header">
          <span className="challenge-progress-label">
            {completedRubs} / {totalRubs} rub&apos;
          </span>
          <span className="challenge-progress-percent">{percentComplete}%</span>
        </div>
        <div className="challenge-progress-bar">
          <div
            className="challenge-progress-fill"
            style={{ width: `${percentComplete}%` }}
          />
        </div>
      </div>

      <div className="challenge-indicators">
        <div className={`challenge-indicator ${onTrack ? 'on-track' : 'behind'}`}>
          <span className="challenge-indicator-dot" />
          <span className="challenge-indicator-label">
            {onTrack ? 'On Track' : 'Behind Schedule'}
          </span>
        </div>

        <div className="challenge-indicator">
          <span className="challenge-streak-value">{streak}</span>
          <span className="challenge-indicator-label">Day Streak</span>
        </div>

        <div className="challenge-indicator">
          <span className="challenge-remaining-value">{daysRemaining}</span>
          <span className="challenge-indicator-label">Days Left</span>
        </div>
      </div>

      {juzProgress.length > 0 && (
        <div className="challenge-juz-breakdown">
          <h4 className="section-title">Juz Progress</h4>
          <div className="challenge-juz-list">
            {juzProgress.map((jp) => (
              <div key={jp.juz} className="challenge-juz-item">
                <div className="challenge-juz-item-header">
                  <span className="challenge-juz-item-label">Juz {jp.juz}</span>
                  <span className="challenge-juz-item-count">
                    {jp.completed}/{jp.total}
                  </span>
                </div>
                <div className="challenge-juz-progress-bar">
                  <div
                    className="challenge-juz-progress-fill"
                    style={{ width: `${jp.percentComplete}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
