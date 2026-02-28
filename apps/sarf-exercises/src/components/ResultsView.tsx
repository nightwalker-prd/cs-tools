import { useEffect, useRef } from 'react';
import { Target, Clock, Zap } from 'lucide-react';
import { useGamification } from '@arabtools/gamification/hooks';
import { recordError } from '@arabtools/analytics/services';
import { loadErrorStore, saveErrorStore } from '@arabtools/analytics/storage';
import type { SessionResults } from '../types';

interface ResultsViewProps {
  results: SessionResults;
  onGoHome: () => void;
  onRestart: () => void;
}

function getProgressClass(pct: number): string {
  if (pct >= 90) return 'excellent';
  if (pct >= 70) return 'good';
  if (pct >= 50) return 'needs-work';
  return 'poor';
}

export function ResultsView({ results, onGoHome, onRestart }: ResultsViewProps) {
  const { recordPractice } = useGamification();
  const recorded = useRef(false);

  // Record practice and errors on first render of results
  useEffect(() => {
    if (recorded.current) return;
    recorded.current = true;

    // Record gamification practice
    recordPractice({
      exercisesCompleted: results.totalQuestions,
      exercisesCorrect: results.score,
      isPerfectSession: results.score === results.totalQuestions,
      sourceApp: 'sarf-exercises',
    });

    // Record errors for wrong answers
    let errorStore = loadErrorStore();
    const now = Date.now();
    for (let i = 0; i < results.answers.length; i++) {
      const answer = results.answers[i];
      if (!answer.isCorrect) {
        const exercise = results.exercises[i];
        errorStore = recordError(errorStore, {
          wordId: exercise?.id ?? `sarf-${i}`,
          category: 'verb-conjugation',
          expected: answer.correctAnswer,
          actual: answer.userAnswer,
          sourceApp: 'sarf-exercises',
        }, now);
      }
    }
    saveErrorStore(errorStore);
  }, [results, recordPractice]);

  const percentage = results.totalQuestions > 0
    ? Math.round((results.score / results.totalQuestions) * 100)
    : 0;

  const scoreClass = getProgressClass(percentage);

  const avgTime = results.answers.length > 0
    ? Math.round(results.answers.reduce((sum, a) => sum + a.timeMs, 0) / results.answers.length / 1000 * 10) / 10
    : 0;

  const totalMinutes = Math.round(results.totalTime / 1000 / 60 * 10) / 10;

  return (
    <div className="results-view animate-fade-in-up">
      <h1>Session Complete</h1>

      {/* Glass card score */}
      <div className="results-score-card">
        <div className={`results-score ${scoreClass}`}>
          {percentage}%
        </div>
        <div className="results-score-label">
          {results.score}/{results.totalQuestions} correct
        </div>
      </div>

      <p className="results-summary">
        {percentage >= 90 ? 'Excellent work!' : percentage >= 70 ? 'Good progress!' : percentage >= 50 ? 'Keep practicing!' : 'Review and try again'}
        {totalMinutes > 0 && ` — ${totalMinutes} min`}
      </p>

      {/* Stats pills */}
      <div className="results-stats-row">
        <div className="stats-pill">
          <span className="stat-icon"><Target size={18} /></span>
          <div className="stat-content">
            <div className="stat-value">{percentage}%</div>
            <div className="stat-label">Accuracy</div>
          </div>
        </div>
        <div className="stats-pill">
          <span className="stat-icon"><Zap size={18} /></span>
          <div className="stat-content">
            <div className="stat-value">{avgTime}s</div>
            <div className="stat-label">Avg. Time</div>
          </div>
        </div>
        <div className="stats-pill">
          <span className="stat-icon"><Clock size={18} /></span>
          <div className="stat-content">
            <div className="stat-value">{totalMinutes}m</div>
            <div className="stat-label">Total Time</div>
          </div>
        </div>
      </div>

      {/* Breakdown by Type with progress bars */}
      <div className="results-breakdown">
        <h3>By Exercise Type</h3>
        {Object.entries(results.byType).map(([type, stats]) => {
          if (stats.total === 0) return null;
          const typeLabel = type === 'conjugation' ? 'Conjugation (تصريف)'
            : type === 'translation' ? 'Translation (ترجمة)'
            : 'Labeling (تسمية)';
          const pct = stats.total > 0 ? Math.round(stats.correct / stats.total * 100) : 0;
          return (
            <div key={type} className="breakdown-progress-row">
              <div className="breakdown-progress-header">
                <span className="breakdown-label">{typeLabel}</span>
                <span className="breakdown-value">
                  {stats.correct}/{stats.total} ({pct}%)
                </span>
              </div>
              <div className="breakdown-progress-bar">
                <div
                  className={`breakdown-progress-fill ${getProgressClass(pct)}`}
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Breakdown by Category with progress bars */}
      {Object.keys(results.byCategory).length > 0 && (
        <div className="results-breakdown">
          <h3>By Siyagh Category</h3>
          {Object.entries(results.byCategory).map(([category, stats]) => {
            const pct = Math.round(stats.correct / stats.total * 100);
            return (
              <div key={category} className="breakdown-progress-row">
                <div className="breakdown-progress-header">
                  <span className="breakdown-label font-arabic" dir="rtl">{category}</span>
                  <span className="breakdown-value">
                    {stats.correct}/{stats.total} ({pct}%)
                  </span>
                </div>
                <div className="breakdown-progress-bar">
                  <div
                    className={`breakdown-progress-fill ${getProgressClass(pct)}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Session info */}
      <div className="results-breakdown">
        <h3>Session Info</h3>
        <div className="breakdown-row">
          <span className="breakdown-label">Answer Mode</span>
          <span className="breakdown-value">
            {results.config.answerMode === 'mc' ? 'Multiple Choice' : 'Text Input'}
          </span>
        </div>
        <div className="breakdown-row">
          <span className="breakdown-label">SRS</span>
          <span className="breakdown-value">
            {results.config.srsEnabled ? 'Enabled' : 'Disabled'}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="results-actions">
        <button className="results-action-btn primary" onClick={onRestart}>
          New Session
        </button>
        <button className="results-action-btn secondary" onClick={onGoHome}>
          Home
        </button>
      </div>
    </div>
  );
}
