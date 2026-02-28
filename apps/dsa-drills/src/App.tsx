import { useState, useCallback } from 'react';
import { usePersistedState } from '@cstools/core/hooks';
import { Sidebar } from './components/Sidebar';
import { FlashCard } from './components/FlashCard';
import { Dashboard } from './components/Dashboard';
import { sampleQuestions } from './data/questions';

interface SessionStats {
  totalSolved: number;
  correct: number;
  streak: number;
  xp: number;
}

export default function App() {
  const [activeTab, setActiveTab] = useState('practice');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sessionStats, setSessionStats] = usePersistedState<SessionStats>('dsa-drills-session', {
    totalSolved: 0,
    correct: 0,
    streak: 0,
    xp: 0,
  });

  const currentQuestion = sampleQuestions[currentIndex % sampleQuestions.length];

  const handleAnswer = useCallback((correct: boolean) => {
    setSessionStats(prev => ({
      totalSolved: prev.totalSolved + 1,
      correct: prev.correct + (correct ? 1 : 0),
      streak: correct ? prev.streak + 1 : 0,
      xp: prev.xp + (correct ? 10 : 2),
    }));
    setCurrentIndex(i => i + 1);
  }, [setSessionStats]);

  const handleSkip = useCallback(() => {
    setCurrentIndex(i => i + 1);
  }, []);

  const accuracy = sessionStats.totalSolved > 0
    ? Math.round((sessionStats.correct / sessionStats.totalSolved) * 100)
    : 0;

  return (
    <div className="flex h-screen bg-[#0D1117]">
      <Sidebar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        stats={{
          streak: sessionStats.streak,
          xp: sessionStats.xp,
          cardsDue: sampleQuestions.length,
          cardsNew: 5,
        }}
      />

      <main className="flex-1 overflow-y-auto p-8">
        {activeTab === 'dashboard' ? (
          <Dashboard
            stats={{
              totalSolved: sessionStats.totalSolved,
              accuracy,
              streak: sessionStats.streak,
              xp: sessionStats.xp,
              weakAreas: ['Dynamic Programming', 'Graph Algorithms', 'Heap Operations'],
              strongAreas: ['Array Operations', 'Binary Search', 'Stack/Queue'],
            }}
          />
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-[#E6EDF3]">
                {activeTab === 'practice' ? 'Practice Session' : activeTab.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </h2>
              <div className="flex items-center gap-4 text-sm text-[#8B949E]">
                <span>Solved: <strong className="text-[#E6EDF3]">{sessionStats.totalSolved}</strong></span>
                <span>Accuracy: <strong className="text-[#E6EDF3]">{accuracy}%</strong></span>
                <span>XP: <strong className="text-[#58A6FF]">{sessionStats.xp}</strong></span>
              </div>
            </div>
            <FlashCard
              question={currentQuestion}
              onAnswer={handleAnswer}
              onSkip={handleSkip}
            />
          </div>
        )}
      </main>
    </div>
  );
}
