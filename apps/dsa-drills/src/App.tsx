import { useState, useCallback, useMemo } from 'react';
import { usePersistedState } from '@cstools/core/hooks';
import { Sidebar } from './components/Sidebar';
import type { DifficultyFilter } from './components/Sidebar';
import { FlashCard } from './components/FlashCard';
import { Dashboard } from './components/Dashboard';
import type { CategoryStat } from './components/Dashboard';
import { sampleQuestions, categories, getQuestionsByCategory } from './data/questions';

interface SessionStats {
  totalSolved: number;
  correct: number;
  streak: number;
  xp: number;
}

type CategoryStatsMap = Record<string, { solved: number; correct: number }>;

export default function App() {
  const [activeTab, setActiveTab] = useState('practice');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [difficultyFilter, setDifficultyFilter] = useState<DifficultyFilter>('all');

  const [sessionStats, setSessionStats] = usePersistedState<SessionStats>('dsa-drills-session', {
    totalSolved: 0,
    correct: 0,
    streak: 0,
    xp: 0,
  });

  const [categoryStatsMap, setCategoryStatsMap] = usePersistedState<CategoryStatsMap>('dsa-drills-category-stats', {});

  // Filter questions based on active tab (category) and difficulty
  const filteredQuestions = useMemo(() => {
    let questions = activeTab === 'practice' || activeTab === 'dashboard'
      ? sampleQuestions
      : getQuestionsByCategory(activeTab);

    if (difficultyFilter !== 'all') {
      questions = questions.filter(q => q.difficulty === difficultyFilter);
    }

    return questions;
  }, [activeTab, difficultyFilter]);

  const currentQuestion = filteredQuestions.length > 0
    ? filteredQuestions[currentIndex % filteredQuestions.length]
    : null;

  const handleAnswer = useCallback((correct: boolean) => {
    if (!currentQuestion) return;

    setSessionStats(prev => ({
      totalSolved: prev.totalSolved + 1,
      correct: prev.correct + (correct ? 1 : 0),
      streak: correct ? prev.streak + 1 : 0,
      xp: prev.xp + (correct ? 10 : 2),
    }));

    // Update per-category stats using the first tag (primary category)
    const primaryCategory = currentQuestion.tags[0];
    if (primaryCategory) {
      setCategoryStatsMap(prev => {
        const existing = prev[primaryCategory] || { solved: 0, correct: 0 };
        return {
          ...prev,
          [primaryCategory]: {
            solved: existing.solved + 1,
            correct: existing.correct + (correct ? 1 : 0),
          },
        };
      });
    }

    setCurrentIndex(i => i + 1);
  }, [currentQuestion, setSessionStats, setCategoryStatsMap]);

  const handleSkip = useCallback(() => {
    setCurrentIndex(i => i + 1);
  }, []);

  // Reset index when switching tabs or difficulty
  const handleTabChange = useCallback((tab: string) => {
    setActiveTab(tab);
    setCurrentIndex(0);
  }, []);

  const handleDifficultyChange = useCallback((d: DifficultyFilter) => {
    setDifficultyFilter(d);
    setCurrentIndex(0);
  }, []);

  const accuracy = sessionStats.totalSolved > 0
    ? Math.round((sessionStats.correct / sessionStats.totalSolved) * 100)
    : 0;

  // Build category info for sidebar with real counts and accuracy
  const categoryInfos = useMemo(() => {
    return categories.map(cat => {
      let questions = getQuestionsByCategory(cat.id);
      if (difficultyFilter !== 'all') {
        questions = questions.filter(q => q.difficulty === difficultyFilter);
      }
      const stats = categoryStatsMap[cat.id];
      const catAccuracy = stats && stats.solved > 0
        ? Math.round((stats.correct / stats.solved) * 100)
        : undefined;
      return {
        id: cat.id,
        name: cat.name,
        count: questions.length,
        accuracy: catAccuracy,
      };
    });
  }, [categoryStatsMap, difficultyFilter]);

  // Build per-category stats for dashboard
  const dashboardCategoryStats: CategoryStat[] = useMemo(() => {
    return categories.map(cat => {
      const stats = categoryStatsMap[cat.id] || { solved: 0, correct: 0 };
      return {
        id: cat.id,
        name: cat.name,
        solved: stats.solved,
        correct: stats.correct,
      };
    });
  }, [categoryStatsMap]);

  // Count total questions available (respecting difficulty filter)
  const totalAvailable = useMemo(() => {
    if (difficultyFilter === 'all') return sampleQuestions.length;
    return sampleQuestions.filter(q => q.difficulty === difficultyFilter).length;
  }, [difficultyFilter]);

  return (
    <div className="flex h-screen bg-[#0D1117]">
      <Sidebar
        activeTab={activeTab}
        onTabChange={handleTabChange}
        stats={{
          streak: sessionStats.streak,
          xp: sessionStats.xp,
          cardsDue: totalAvailable,
          cardsNew: Math.max(0, totalAvailable - sessionStats.totalSolved),
        }}
        categories={categoryInfos}
        difficultyFilter={difficultyFilter}
        onDifficultyChange={handleDifficultyChange}
      />

      <main className="flex-1 overflow-y-auto p-8">
        {activeTab === 'dashboard' ? (
          <Dashboard
            stats={{
              totalSolved: sessionStats.totalSolved,
              accuracy,
              streak: sessionStats.streak,
              xp: sessionStats.xp,
            }}
            categoryStats={dashboardCategoryStats}
          />
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-[#E6EDF3]">
                {activeTab === 'practice' ? 'Practice Session' : categories.find(c => c.id === activeTab)?.name ?? activeTab.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </h2>
              <div className="flex items-center gap-4 text-sm text-[#8B949E]">
                <span>Solved: <strong className="text-[#E6EDF3]">{sessionStats.totalSolved}</strong></span>
                <span>Accuracy: <strong className="text-[#E6EDF3]">{accuracy}%</strong></span>
                <span>XP: <strong className="text-[#58A6FF]">{sessionStats.xp}</strong></span>
                {filteredQuestions.length > 0 && (
                  <span className="text-xs">({filteredQuestions.length} questions)</span>
                )}
              </div>
            </div>
            {currentQuestion ? (
              <FlashCard
                question={currentQuestion}
                onAnswer={handleAnswer}
                onSkip={handleSkip}
              />
            ) : (
              <div className="max-w-2xl mx-auto bg-[#161B22] rounded-lg border border-[#30363D] p-8 text-center">
                <p className="text-[#8B949E]">No questions match the current filters. Try changing the difficulty or category.</p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
