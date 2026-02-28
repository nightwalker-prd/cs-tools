import { Target, Clock, TrendingUp, Flame, RotateCcw, Volume2 } from 'lucide-react';
import { useSpeechSynthesis } from '@arabtools/core';
import type { DrillAnswer, DrillQuestion, DerivativeType, VerbForm } from '../types';
import { FormBadge } from './FormBadge';
import { DerivativeTypeBadge } from './DerivativeTypeBadge';

interface ResultsSummaryProps {
  questions: DrillQuestion[];
  answers: DrillAnswer[];
  elapsedTime: number;
  onPracticeAgain: () => void;
  onNewConfig: () => void;
}

function scoreColor(pct: number): string {
  if (pct >= 80) return 'text-green-600';
  if (pct >= 60) return 'text-amber-600';
  return 'text-red-600';
}

function barColor(pct: number): string {
  if (pct >= 80) return 'bg-green-500';
  if (pct >= 60) return 'bg-amber-500';
  return 'bg-red-500';
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}m ${s}s`;
}

export function ResultsSummary({ questions, answers, elapsedTime, onPracticeAgain, onNewConfig }: ResultsSummaryProps) {
  const { speak, isSupported } = useSpeechSynthesis({ lang: 'ar-SA', rate: 0.8 });

  const total = answers.length;
  const correct = answers.filter(a => a.isCorrect).length;
  const percentage = total > 0 ? Math.round((correct / total) * 100) : 0;
  const avgTime = total > 0 ? (answers.reduce((sum, a) => sum + a.timeSpent, 0) / total).toFixed(1) : '0';

  // Best streak
  let bestStreak = 0;
  let currentStreak = 0;
  for (const a of answers) {
    if (a.isCorrect) {
      currentStreak++;
      bestStreak = Math.max(bestStreak, currentStreak);
    } else {
      currentStreak = 0;
    }
  }

  // Breakdown by derivative type
  const derivativeBreakdown = (['masdar', 'ism-fail', 'ism-maful'] as DerivativeType[]).map(dt => {
    const relevant = questions
      .map((q, i) => ({ q, a: answers[i] }))
      .filter(({ q }) => q.questionType === dt);
    const dtCorrect = relevant.filter(({ a }) => a?.isCorrect).length;
    const dtTotal = relevant.length;
    return { type: dt, correct: dtCorrect, total: dtTotal, pct: dtTotal > 0 ? Math.round((dtCorrect / dtTotal) * 100) : 0 };
  }).filter(d => d.total > 0);

  // Breakdown by verb form
  const formSet = new Set(questions.map(q => q.verb.verbForm));
  const formBreakdown = Array.from(formSet).sort().map((form: VerbForm) => {
    const relevant = questions
      .map((q, i) => ({ q, a: answers[i] }))
      .filter(({ q }) => q.verb.verbForm === form);
    const fCorrect = relevant.filter(({ a }) => a?.isCorrect).length;
    const fTotal = relevant.length;
    return { form, correct: fCorrect, total: fTotal, pct: fTotal > 0 ? Math.round((fCorrect / fTotal) * 100) : 0 };
  });

  // Mistakes
  const mistakes = questions
    .map((q, i) => ({ q, a: answers[i] }))
    .filter(({ a }) => a && !a.isCorrect)
    .map(({ q, a }) => ({ question: q, answer: a }));

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-fade-in-up">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-serif text-primary mb-2">Drill Complete</h1>
        <p className="text-muted-foreground">Masdar & Derivatives Trainer</p>
      </div>

      {/* Main Score Card */}
      <div className="glass-card p-8 text-center">
        <Target className="w-12 h-12 mx-auto text-primary mb-2" />
        <p className="text-muted-foreground text-sm uppercase tracking-wide mb-4">Overall Score</p>
        <div className={`text-6xl font-bold mb-2 ${scoreColor(percentage)}`}>{percentage}%</div>
        <p className="text-lg text-muted-foreground">{correct} correct out of {total} questions</p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="stats-pill p-4 text-center">
          <Clock className="w-6 h-6 mx-auto text-primary mb-2" />
          <p className="text-2xl font-semibold">{formatTime(elapsedTime)}</p>
          <p className="text-sm text-muted-foreground">Total Time</p>
        </div>
        <div className="stats-pill p-4 text-center">
          <TrendingUp className="w-6 h-6 mx-auto text-primary mb-2" />
          <p className="text-2xl font-semibold">{avgTime}s</p>
          <p className="text-sm text-muted-foreground">Avg. Response</p>
        </div>
        <div className="stats-pill p-4 text-center">
          <Flame className="w-6 h-6 mx-auto text-accent mb-2" />
          <p className="text-2xl font-semibold">{bestStreak}</p>
          <p className="text-sm text-muted-foreground">Best Streak</p>
        </div>
        <div className="stats-pill p-4 text-center">
          <Target className="w-6 h-6 mx-auto text-primary mb-2" />
          <p className="text-2xl font-semibold">{formSet.size}</p>
          <p className="text-sm text-muted-foreground">Forms Tested</p>
        </div>
      </div>

      {/* Breakdown by Derivative Type */}
      {derivativeBreakdown.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-serif text-primary">Score by Derivative Type</h2>
          <div className="space-y-3">
            {derivativeBreakdown.map(d => (
              <div key={d.type} className="stats-pill p-4">
                <div className="flex justify-between items-center mb-2">
                  <DerivativeTypeBadge type={d.type} />
                  <span className={`font-bold ${scoreColor(d.pct)}`}>
                    {d.correct}/{d.total} ({d.pct}%)
                  </span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${barColor(d.pct)}`}
                    style={{ width: `${d.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Breakdown by Verb Form */}
      {formBreakdown.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-serif text-primary">Score by Verb Form</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {formBreakdown.map(f => (
              <div key={f.form} className="stats-pill p-3 text-center">
                <FormBadge form={f.form} />
                <p className={`text-xl font-bold mt-2 ${scoreColor(f.pct)}`}>{f.pct}%</p>
                <p className="text-xs text-muted-foreground">{f.correct}/{f.total}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Mistakes Review */}
      {mistakes.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-serif text-primary">Review Mistakes</h2>
          <div className="space-y-3">
            {mistakes.map(({ question: q, answer: a }) => (
              <div key={a.questionId} className="glass-card p-4">
                <div className="flex items-center gap-2 mb-2">
                  <FormBadge form={q.verb.verbForm} />
                  <DerivativeTypeBadge type={q.questionType} />
                </div>
                <div className="flex items-center gap-2 mb-2" dir="rtl">
                  <span className="text-xl font-arabic text-primary">
                    {q.verb.pastTense} - {q.verb.presentTense}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <span className="text-red-600 line-through font-arabic" dir="rtl">{a.userInput}</span>
                  <span className="text-muted-foreground">-&gt;</span>
                  <span className="text-green-700 font-semibold font-arabic" dir="rtl">{a.correctAnswer}</span>
                  {isSupported && (
                    <button
                      onClick={() => speak(a.correctAnswer)}
                      className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                    >
                      <Volume2 className="w-4 h-4 text-muted-foreground" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={onPracticeAgain}
          className="flex items-center justify-center gap-2 px-8 py-3 rounded-2xl border-2 border-primary text-primary font-semibold hover:bg-primary/5 transition-all hover:-translate-y-0.5"
        >
          <RotateCcw className="w-5 h-5" />
          Practice Again
        </button>
        <button
          onClick={onNewConfig}
          className="flex items-center justify-center gap-2 px-8 py-3 rounded-2xl bg-primary text-white font-semibold shadow-lg hover:bg-primary/90 hover:shadow-xl transition-all hover:-translate-y-0.5"
        >
          New Drill Configuration
        </button>
      </div>
    </div>
  );
}
