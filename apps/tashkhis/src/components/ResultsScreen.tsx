import { Card } from '@arabtools/ui';
import type { PlacementResult } from '../types';
import { ScoreCard } from './ScoreCard';
import { usePlacementHistory } from '../hooks/usePlacementHistory';
import { useEffect, useRef } from 'react';

interface ResultsScreenProps {
  result: PlacementResult;
  onRetake: () => void;
  onViewHistory: () => void;
}

function formatDuration(ms: number): string {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  return minutes > 0 ? `${minutes}m ${seconds}s` : `${seconds}s`;
}

export function ResultsScreen({ result, onRetake, onViewHistory }: ResultsScreenProps) {
  const { addResult } = usePlacementHistory();
  const saved = useRef(false);

  // Save result to history once
  useEffect(() => {
    if (!saved.current) {
      addResult(result);
      saved.current = true;
    }
  }, [result, addResult]);

  // Find strongest/weakest
  const allCategories = result.scorecards.flatMap(s => s.categories).filter(c => c.questionsAsked > 0);
  const sorted = [...allCategories].sort((a, b) => b.theta - a.theta);
  const strongest = sorted[0];
  const weakest = sorted[sorted.length - 1];

  return (
    <div className="py-8 animate-fade-in-up">
      {/* Summary header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl text-primary mb-1">Results</h1>
        <p className="font-arabic text-xl text-accent" dir="rtl">النتائج</p>
      </div>

      <Card className="p-6 mb-8">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div>
            <p className="text-3xl font-bold text-primary">{result.overallPercentage}%</p>
            <p className="text-xs text-muted-foreground mt-1">Overall Score</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-primary">{result.totalQuestions}</p>
            <p className="text-xs text-muted-foreground mt-1">Questions</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-primary">{result.totalCorrect}</p>
            <p className="text-xs text-muted-foreground mt-1">Correct</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-primary">{formatDuration(result.duration)}</p>
            <p className="text-xs text-muted-foreground mt-1">Time</p>
          </div>
        </div>

        {strongest && weakest && (
          <div className="mt-4 pt-4 border-t grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Strongest Area</p>
              <p className="text-sm font-medium text-success">{strongest.label}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Weakest Area</p>
              <p className="text-sm font-medium text-destructive">{weakest.label}</p>
            </div>
          </div>
        )}
      </Card>

      {/* Scorecards */}
      <h2 className="text-xl text-primary mb-4">Category Breakdown</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {result.scorecards.map(sc => (
          <ScoreCard key={sc.unitNumber} scorecard={sc} />
        ))}
      </div>

      {/* Actions */}
      <div className="flex justify-center gap-4 mt-8">
        <button
          onClick={onRetake}
          className="px-6 py-2.5 bg-primary text-primary-foreground rounded-xl font-medium hover:opacity-90 transition-opacity"
        >
          Retake Test
        </button>
        <button
          onClick={onViewHistory}
          className="px-6 py-2.5 border rounded-xl text-foreground hover:bg-muted transition-colors"
        >
          View History
        </button>
      </div>
    </div>
  );
}
