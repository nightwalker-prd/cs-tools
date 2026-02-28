import { CheckCircle, XCircle, RotateCcw, Home } from 'lucide-react';
import type { QuizMode, QuizQuestion, QuizResult } from '../types';
import { getProverbById } from '../data/proverbs';

interface QuizResultsProps {
  result: QuizResult;
  questions: QuizQuestion[];
  navigate: (hash: string) => void;
  mode: QuizMode;
}

function formatTime(ms: number): string {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return minutes > 0 ? `${minutes}m ${secs}s` : `${secs}s`;
}

function getScoreMessage(pct: number): string {
  if (pct === 100) return 'Perfect Score!';
  if (pct >= 80) return 'Excellent!';
  if (pct >= 60) return 'Well Done!';
  if (pct >= 40) return 'Good Effort!';
  return 'Keep Practicing!';
}

export function QuizResults({ result, questions, navigate, mode }: QuizResultsProps) {
  const pct = Math.round((result.score / result.total) * 100);
  const incorrectAnswers = result.answers.filter(a => !a.correct);

  return (
    <div className="quiz-results">
      <div className="results-header">
        <div className="results-score-ring">
          <div className="results-score-number">{pct}%</div>
          <div className="results-score-label">Score</div>
        </div>
        <h2 className="results-title">{getScoreMessage(pct)}</h2>
      </div>

      <div className="results-stats">
        <div className="stat-item">
          <div className="stat-value">{result.score}/{result.total}</div>
          <div className="stat-label">Correct</div>
        </div>
        <div className="stat-item">
          <div className="stat-value">{formatTime(result.timeMs)}</div>
          <div className="stat-label">Time</div>
        </div>
      </div>

      {incorrectAnswers.length > 0 && (
        <div className="results-review">
          <div className="results-review-title">Review Incorrect Answers</div>
          {incorrectAnswers.map(answer => {
            const question = questions.find(q => q.id === answer.questionId);
            if (!question) return null;
            const proverb = getProverbById(question.proverbId);
            return (
              <div key={answer.questionId} className="review-item">
                <div className="review-icon incorrect">
                  <XCircle size={18} />
                </div>
                <div className="review-content">
                  {proverb && <div className="review-arabic">{proverb.arabic}</div>}
                  <div className="review-answer">
                    Your answer: {question.options[answer.selectedIndex]}
                  </div>
                  <div className="review-answer" style={{ color: 'var(--color-success)' }}>
                    Correct: {question.options[question.correctIndex]}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {incorrectAnswers.length === 0 && (
        <div className="results-review">
          <div className="results-review-title">All Correct!</div>
          {result.answers.slice(0, 3).map(answer => {
            const question = questions.find(q => q.id === answer.questionId);
            if (!question) return null;
            const proverb = getProverbById(question.proverbId);
            return (
              <div key={answer.questionId} className="review-item">
                <div className="review-icon correct">
                  <CheckCircle size={18} />
                </div>
                <div className="review-content">
                  {proverb && <div className="review-arabic">{proverb.arabic}</div>}
                  <div className="review-answer">{proverb?.translation}</div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className="results-actions">
        <button className="btn" onClick={() => navigate(`quiz/${mode}`)}>
          <RotateCcw size={16} />
          Try Again
        </button>
        <button className="btn btn-primary" onClick={() => navigate('quiz')}>
          <Home size={16} />
          Quiz Hub
        </button>
      </div>
    </div>
  );
}
