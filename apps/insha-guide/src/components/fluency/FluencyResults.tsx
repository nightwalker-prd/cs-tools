import type { FluencySession, FluencyRound } from '../../data/types';

interface FluencyResultsProps {
  session: FluencySession;
  previousBest?: { wpm: number; wordCount: number } | null;
  onDone: () => void;
}

function formatTime(sec: number): string {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}:${String(s).padStart(2, '0')}`;
}

function RoundRow({ round, index }: { round: FluencyRound; index: number }) {
  return (
    <tr>
      <td>{index + 1}</td>
      <td>{formatTime(round.durationSec)}</td>
      <td>{round.wordCount}</td>
      <td>{round.wpm.toFixed(1)}</td>
      <td>{formatTime(round.elapsedSec)}</td>
    </tr>
  );
}

export function FluencyResults({ session, previousBest, onDone }: FluencyResultsProps) {
  const totalWords = session.rounds.reduce((s, r) => s + r.wordCount, 0);
  const avgWpm = session.rounds.length > 0
    ? session.rounds.reduce((s, r) => s + r.wpm, 0) / session.rounds.length
    : 0;
  const bestRoundWpm = Math.max(...session.rounds.map(r => r.wpm), 0);

  const improved = previousBest && bestRoundWpm > previousBest.wpm;

  return (
    <div className="fluency-results animate-fade-in">
      <h3 className="fluency-results-title">
        {session.type === 'sprint' ? 'Sprint' : session.type === 'speed-writing' ? 'Speed Writing' : 'Rewrite'} Complete!
      </h3>

      <div className="fluency-results-stats">
        <div className="fluency-stat-card">
          <div className="fluency-stat-value">{totalWords}</div>
          <div className="fluency-stat-label">Total Words</div>
        </div>
        <div className="fluency-stat-card">
          <div className="fluency-stat-value">{avgWpm.toFixed(1)}</div>
          <div className="fluency-stat-label">Avg WPM</div>
        </div>
        <div className="fluency-stat-card">
          <div className="fluency-stat-value">{bestRoundWpm.toFixed(1)}</div>
          <div className="fluency-stat-label">Best WPM</div>
        </div>
        {session.overlapPercent !== undefined && (
          <div className="fluency-stat-card">
            <div className="fluency-stat-value">{session.overlapPercent}%</div>
            <div className="fluency-stat-label">Content Overlap</div>
          </div>
        )}
      </div>

      {previousBest && (
        <div className={`fluency-comparison ${improved ? 'improved' : ''}`}>
          {improved
            ? `New personal best! +${(bestRoundWpm - previousBest.wpm).toFixed(1)} WPM improvement`
            : `Previous best: ${previousBest.wpm.toFixed(1)} WPM`
          }
        </div>
      )}

      {session.rounds.length > 1 && (
        <div className="fluency-rounds-table">
          <table>
            <thead>
              <tr>
                <th>Round</th>
                <th>Time Limit</th>
                <th>Words</th>
                <th>WPM</th>
                <th>Used</th>
              </tr>
            </thead>
            <tbody>
              {session.rounds.map((round, i) => (
                <RoundRow key={i} round={round} index={i} />
              ))}
            </tbody>
          </table>
        </div>
      )}

      <button className="btn btn-primary" onClick={onDone} style={{ marginTop: '1.5rem' }}>
        Done
      </button>
    </div>
  );
}
