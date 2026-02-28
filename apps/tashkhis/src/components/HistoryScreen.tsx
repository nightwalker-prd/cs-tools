import { Card } from '@arabtools/ui';
import { usePlacementHistory } from '../hooks/usePlacementHistory';

interface HistoryScreenProps {
  onBack: () => void;
}

function formatDate(ts: number): string {
  return new Date(ts).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function formatDuration(ms: number): string {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  return minutes > 0 ? `${minutes}m ${seconds}s` : `${seconds}s`;
}

export function HistoryScreen({ onBack }: HistoryScreenProps) {
  const { history, clearHistory } = usePlacementHistory();

  return (
    <div className="py-8 animate-fade-in-up">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl text-primary">History</h1>
          <p className="font-arabic text-lg text-accent" dir="rtl">السجل</p>
        </div>
        <button
          onClick={onBack}
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          Back
        </button>
      </div>

      {history.length === 0 ? (
        <Card className="p-8 text-center">
          <p className="text-muted-foreground">No test results yet. Take the placement test to see your results here.</p>
        </Card>
      ) : (
        <>
          <div className="space-y-3">
            {history.map((result, i) => (
              <Card key={result.id} className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">
                      Test #{history.length - i}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {formatDate(result.completedAt)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-primary">{result.overallPercentage}%</p>
                    <p className="text-xs text-muted-foreground">
                      {result.totalCorrect}/{result.totalQuestions} in {formatDuration(result.duration)}
                    </p>
                  </div>
                </div>

                {/* Mini scorecard summary */}
                <div className="mt-3 pt-3 border-t flex flex-wrap gap-2">
                  {result.scorecards.map(sc => (
                    <span
                      key={sc.unitNumber}
                      className={`text-xs px-2 py-0.5 rounded-full ${
                        sc.proficiencyLevel === 'advanced'
                          ? 'bg-success/10 text-success'
                          : sc.proficiencyLevel === 'intermediate'
                          ? 'bg-accent/10 text-accent'
                          : 'bg-destructive/10 text-destructive'
                      }`}
                    >
                      {sc.unitTitle}: {sc.overallPercentage}%
                    </span>
                  ))}
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center mt-6">
            <button
              onClick={clearHistory}
              className="text-xs text-muted-foreground hover:text-destructive transition-colors"
            >
              Clear History
            </button>
          </div>
        </>
      )}
    </div>
  );
}
