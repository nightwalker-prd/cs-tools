import { useState, useCallback, useMemo } from 'react';
import { usePersistedState } from '@cstools/core/hooks';
import {
  loadWeeklyStats,
  saveWeeklyStats,
  recordDailyActivity,
  loadErrorStore,
  saveErrorStore,
  recordError,
} from '@cstools/analytics';
import type { ErrorCategory } from '@cstools/analytics';
import {
  useGamification,
  XpGainIndicator,
  AchievementToast,
  ACHIEVEMENT_DEFS,
} from '@cstools/gamification';
import type { AchievementDef } from '@cstools/gamification';
import { Sidebar } from './components/Sidebar';
import type { DifficultyFilter } from './components/Sidebar';
import { FlashCard } from './components/FlashCard';
import { Dashboard } from './components/Dashboard';
import type { CategoryStat } from './components/Dashboard';
import { sampleQuestions, categories, getQuestionsByCategory } from './data/questions';

type CategoryStatsMap = Record<string, { solved: number; correct: number }>;

/** Map a question tag to the closest analytics error category. */
function tagToErrorCategory(tag: string): ErrorCategory {
  switch (tag) {
    case 'complexity':
      return 'wrong-complexity';
    case 'data-structures':
    case 'arrays':
    case 'linked-lists':
    case 'stacks':
    case 'queues':
    case 'heaps':
    case 'hash-tables':
      return 'wrong-data-structure';
    case 'recursion':
    case 'backtracking':
      return 'incorrect-base-case';
    case 'sorting':
    case 'searching':
    case 'graphs':
    case 'dynamic-programming':
      return 'wrong-algorithm';
    case 'strings':
      return 'missing-edge-case';
    default:
      return 'logic-error';
  }
}

export default function App() {
  const [activeTab, setActiveTab] = useState('practice');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [difficultyFilter, setDifficultyFilter] = useState<DifficultyFilter>('all');

  // Gamification hook replaces basic XP/streak tracking
  const { xpState, levelInfo, streakData, streakMultiplier, achievements, recordPractice } =
    useGamification();

  // XP gain floating indicators
  const [xpGainEvents, setXpGainEvents] = useState<{ amount: number; key: number }[]>([]);

  // Achievement toasts
  const [newAchievements, setNewAchievements] = useState<AchievementDef[]>([]);

  // Per-category stats (separate from gamification -- tracks per-topic accuracy)
  const [categoryStatsMap, setCategoryStatsMap] = usePersistedState<CategoryStatsMap>('dsa-drills-category-stats', {});

  // Basic session counter (totalSolved/correct for display in practice header)
  const [sessionCounts, setSessionCounts] = usePersistedState<{ totalSolved: number; correct: number }>(
    'dsa-drills-session-counts',
    { totalSolved: 0, correct: 0 },
  );

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

  const handleAnswer = useCallback((correct: boolean, selectedOption?: string) => {
    if (!currentQuestion) return;

    // Update session counters
    setSessionCounts(prev => ({
      totalSolved: prev.totalSolved + 1,
      correct: prev.correct + (correct ? 1 : 0),
    }));

    // Record practice with gamification on every answer
    const result = recordPractice({
      exercisesCompleted: 1,
      exercisesCorrect: correct ? 1 : 0,
      isPerfectSession: correct,
      sourceApp: 'dsa-drills',
    });

    // Show XP gain indicator
    if (result.xpGained > 0) {
      setXpGainEvents(prev => [...prev, { amount: result.xpGained, key: Date.now() }]);
    }

    // Show achievement toasts
    if (result.newAchievements.length > 0) {
      setNewAchievements(prev => [...prev, ...result.newAchievements]);
    }

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

    // ── Analytics: record error on wrong answers ──
    if (!correct) {
      const errorCategory = tagToErrorCategory(currentQuestion.tags[0] ?? '');
      const expectedAnswer = Array.isArray(currentQuestion.answer)
        ? currentQuestion.answer.join(', ')
        : currentQuestion.answer;

      const errorStore = loadErrorStore();
      const updatedErrorStore = recordError(
        errorStore,
        {
          wordId: currentQuestion.id,
          category: errorCategory,
          expected: expectedAnswer,
          actual: selectedOption ?? 'incorrect',
          sourceApp: 'dsa-drills',
        },
        Date.now(),
      );
      saveErrorStore(updatedErrorStore);
    }

    // ── Analytics: record daily activity ──
    const today = new Date().toISOString().slice(0, 10);
    const weeklyStats = loadWeeklyStats();
    const updatedWeeklyStats = recordDailyActivity(weeklyStats, today, {
      exercisesCompleted: 1,
      exercisesCorrect: correct ? 1 : 0,
      errorsRecorded: correct ? 0 : 1,
    });
    saveWeeklyStats(updatedWeeklyStats);

    setCurrentIndex(i => i + 1);
  }, [currentQuestion, setSessionCounts, recordPractice, setCategoryStatsMap]);

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

  const accuracy = sessionCounts.totalSolved > 0
    ? Math.round((sessionCounts.correct / sessionCounts.totalSolved) * 100)
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

  // Count unlocked achievements
  const unlockedCount = Object.keys(achievements).length;
  const totalAchievementCount = ACHIEVEMENT_DEFS.length;

  // Remove XP gain event
  const handleXpGainComplete = useCallback((key: number) => {
    setXpGainEvents(prev => prev.filter(e => e.key !== key));
  }, []);

  // Dismiss achievement toast
  const handleAchievementDismiss = useCallback((id: string) => {
    setNewAchievements(prev => prev.filter(a => a.id !== id));
  }, []);

  return (
    <div className="flex h-screen bg-[#0D1117]">
      <Sidebar
        activeTab={activeTab}
        onTabChange={handleTabChange}
        levelInfo={levelInfo}
        streakData={streakData}
        streakMultiplier={streakMultiplier.multiplier}
        xp={xpState.totalXp}
        cardsDue={totalAvailable}
        cardsNew={Math.max(0, totalAvailable - sessionCounts.totalSolved)}
        categories={categoryInfos}
        difficultyFilter={difficultyFilter}
        onDifficultyChange={handleDifficultyChange}
      />

      <main className="flex-1 overflow-y-auto p-8">
        {activeTab === 'dashboard' ? (
          <Dashboard
            stats={{
              totalSolved: sessionCounts.totalSolved,
              accuracy,
            }}
            levelInfo={levelInfo}
            streakData={streakData}
            streakMultiplier={streakMultiplier.multiplier}
            xp={xpState.totalXp}
            unlockedAchievements={unlockedCount}
            totalAchievements={totalAchievementCount}
            achievements={achievements}
            categoryStats={dashboardCategoryStats}
          />
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-[#E6EDF3]">
                {activeTab === 'practice' ? 'Practice Session' : categories.find(c => c.id === activeTab)?.name ?? activeTab.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </h2>
              <div className="flex items-center gap-4 text-sm text-[#8B949E]">
                <span>Solved: <strong className="text-[#E6EDF3]">{sessionCounts.totalSolved}</strong></span>
                <span>Accuracy: <strong className="text-[#E6EDF3]">{accuracy}%</strong></span>
                <span>XP: <strong className="text-[#58A6FF]">{xpState.totalXp.toLocaleString()}</strong></span>
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

      {/* Floating XP gain indicators */}
      {xpGainEvents.map(event => (
        <XpGainIndicator
          key={event.key}
          amount={event.amount}
          onComplete={() => handleXpGainComplete(event.key)}
        />
      ))}

      {/* Achievement toasts (stacked from top-right) */}
      {newAchievements.map((achievement, index) => (
        <div key={achievement.id} style={{ position: 'fixed', top: `${16 + index * 88}px`, right: '16px', zIndex: 9999 }}>
          <AchievementToast
            achievement={achievement}
            onDismiss={() => handleAchievementDismiss(achievement.id)}
          />
        </div>
      ))}
    </div>
  );
}
