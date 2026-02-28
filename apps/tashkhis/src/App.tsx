import { useState } from 'react';
import type { AppPhase, PlacementResult } from './types';
import { StartScreen } from './components/StartScreen';
import { TestScreen } from './components/TestScreen';
import { ResultsScreen } from './components/ResultsScreen';
import { HistoryScreen } from './components/HistoryScreen';

export default function App() {
  const [phase, setPhase] = useState<AppPhase>('start');
  const [maxQuestions, setMaxQuestions] = useState(80);
  const [lastResult, setLastResult] = useState<PlacementResult | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-3xl px-4 py-8">
        {phase === 'start' && (
          <StartScreen
            maxQuestions={maxQuestions}
            onChangeMax={setMaxQuestions}
            onStart={() => setPhase('testing')}
            onViewHistory={() => setPhase('history')}
          />
        )}
        {phase === 'testing' && (
          <TestScreen
            maxQuestions={maxQuestions}
            onComplete={(result) => {
              setLastResult(result);
              setPhase('results');
            }}
            onCancel={() => setPhase('start')}
          />
        )}
        {phase === 'results' && lastResult && (
          <ResultsScreen
            result={lastResult}
            onRetake={() => setPhase('start')}
            onViewHistory={() => setPhase('history')}
          />
        )}
        {phase === 'history' && (
          <HistoryScreen onBack={() => setPhase('start')} />
        )}
      </div>
    </div>
  );
}
