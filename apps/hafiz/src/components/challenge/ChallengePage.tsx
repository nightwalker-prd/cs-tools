import { useHifdhChallenge } from '../../hooks/useHifdhChallenge';
import { ChallengeStart } from './ChallengeStart';
import { ChallengeProgress } from './ChallengeProgress';
import { DailyChecklist } from './DailyChecklist';

export function ChallengePage() {
  const {
    challenge,
    isActive,
    isPaused,
    currentDay,
    todayLog,
    progress,
    juzProgress,
    startChallenge,
    toggleChecklist,
    setNotes,
    pauseChallenge,
    resumeChallenge,
    completeChallenge,
    abandonChallenge,
    resetChallenge,
  } = useHifdhChallenge();

  // No challenge exists or previous one was completed/abandoned
  if (!challenge || challenge.status === 'completed' || challenge.status === 'abandoned') {
    return (
      <div className="challenge-page fade-in-up">
        <div className="page-header">
          <h2>30-Day Challenge</h2>
          <p className="page-subtitle">
            Commit to a structured memorization or review plan
          </p>
        </div>

        {challenge && challenge.status === 'completed' && (
          <div className="challenge-banner challenge-banner-success">
            <p>Your last challenge was completed. Start a new one below.</p>
            <button className="btn btn-ghost btn-sm" onClick={resetChallenge}>
              Clear History
            </button>
          </div>
        )}

        {challenge && challenge.status === 'abandoned' && (
          <div className="challenge-banner challenge-banner-muted">
            <p>Your last challenge was abandoned. Ready to try again?</p>
            <button className="btn btn-ghost btn-sm" onClick={resetChallenge}>
              Clear History
            </button>
          </div>
        )}

        <ChallengeStart onStart={startChallenge} />
      </div>
    );
  }

  // Active or paused challenge
  return (
    <div className="challenge-page fade-in-up">
      <div className="page-header">
        <h2>30-Day Challenge</h2>
        <p className="page-subtitle">
          {isActive
            ? `Day ${currentDay} - Keep going!`
            : 'Challenge paused'}
        </p>
      </div>

      {isPaused && (
        <div className="challenge-banner challenge-banner-warning">
          <p>Your challenge is currently paused.</p>
          <button className="btn btn-primary btn-sm" onClick={resumeChallenge}>
            Resume
          </button>
        </div>
      )}

      <ChallengeProgress
        currentDay={currentDay}
        totalRubs={progress.totalRubs}
        completedRubs={progress.completedRubs}
        percentComplete={progress.percentComplete}
        onTrack={progress.onTrack}
        streak={progress.streak}
        daysRemaining={progress.daysRemaining}
        juzProgress={juzProgress}
      />

      {isActive && todayLog && (
        <DailyChecklist
          checklist={todayLog.checklist}
          onToggle={toggleChecklist}
          notes={todayLog.notes}
          onNotesChange={setNotes}
        />
      )}

      <div className="challenge-actions">
        {isActive && (
          <>
            <button
              className="btn btn-ghost btn-sm"
              onClick={pauseChallenge}
            >
              Pause Challenge
            </button>
            {progress.percentComplete >= 90 && (
              <button
                className="btn btn-primary btn-sm"
                onClick={completeChallenge}
              >
                Complete Challenge
              </button>
            )}
          </>
        )}
        <button
          className="btn btn-ghost btn-sm challenge-abandon-btn"
          onClick={abandonChallenge}
        >
          Abandon Challenge
        </button>
      </div>
    </div>
  );
}
