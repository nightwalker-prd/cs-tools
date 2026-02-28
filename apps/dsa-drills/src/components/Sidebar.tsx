import { Book, BarChart3, Trophy } from 'lucide-react';
import { LevelBadge, StreakDisplay } from '@cstools/gamification';
import type { LevelInfo, StreakData } from '@cstools/gamification';

export type DifficultyFilter = 'all' | 'easy' | 'medium' | 'hard';

interface CategoryInfo {
  id: string;
  name: string;
  count: number;
  accuracy?: number; // 0-100, undefined if no attempts
}

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  levelInfo: LevelInfo;
  streakData: StreakData;
  streakMultiplier: number;
  xp: number;
  cardsDue: number;
  cardsNew: number;
  categories: CategoryInfo[];
  difficultyFilter: DifficultyFilter;
  onDifficultyChange: (d: DifficultyFilter) => void;
}

const difficultyOptions: { value: DifficultyFilter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'easy', label: 'Easy' },
  { value: 'medium', label: 'Medium' },
  { value: 'hard', label: 'Hard' },
];

function accuracyColor(accuracy: number): string {
  if (accuracy >= 80) return 'bg-[#3FB950]';
  if (accuracy >= 50) return 'bg-[#D29922]';
  return 'bg-[#F85149]';
}

export function Sidebar({
  activeTab,
  onTabChange,
  levelInfo,
  streakData,
  streakMultiplier,
  xp,
  cardsDue,
  cardsNew,
  categories,
  difficultyFilter,
  onDifficultyChange,
}: SidebarProps) {
  return (
    <aside className="w-64 bg-[#161B22] border-r border-[#30363D] flex flex-col h-screen">
      <div className="p-4 border-b border-[#30363D]">
        <h1 className="text-lg font-bold text-[#E6EDF3]">DSA Drills</h1>
        <p className="text-xs text-[#8B949E]">Spaced repetition flashcards</p>
      </div>

      {/* Level & Streak */}
      <div className="p-3 border-b border-[#30363D] space-y-2">
        <LevelBadge levelInfo={levelInfo} />
        <div className="flex items-center justify-between px-1">
          <StreakDisplay streak={streakData.currentStreak} multiplier={streakMultiplier} compact />
          <div className="flex items-center gap-1">
            <Trophy className="w-3.5 h-3.5 text-[#58A6FF]" />
            <span className="text-xs font-semibold text-[#E6EDF3]">{xp.toLocaleString()} XP</span>
          </div>
        </div>
      </div>

      {/* Cards stats */}
      <div className="px-4 py-2 border-b border-[#30363D] flex items-center gap-4">
        <div className="flex items-center gap-1.5">
          <BarChart3 className="w-3.5 h-3.5 text-[#D29922]" />
          <span className="text-xs text-[#E6EDF3]">{cardsDue} due</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Book className="w-3.5 h-3.5 text-[#3FB950]" />
          <span className="text-xs text-[#E6EDF3]">{cardsNew} new</span>
        </div>
      </div>

      {/* Difficulty Filter */}
      <div className="p-2 border-b border-[#30363D]">
        <div className="text-xs text-[#8B949E] px-3 py-1 uppercase tracking-wider">Difficulty</div>
        <div className="flex gap-1 px-2">
          {difficultyOptions.map(opt => (
            <button
              key={opt.value}
              onClick={() => onDifficultyChange(opt.value)}
              className={`flex-1 text-xs py-1 rounded transition-colors ${
                difficultyFilter === opt.value
                  ? 'bg-[#58A6FF]/20 text-[#58A6FF] font-medium'
                  : 'text-[#8B949E] hover:text-[#E6EDF3] hover:bg-[#21262D]'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Nav */}
      <div className="p-2 border-b border-[#30363D]">
        <button
          onClick={() => onTabChange('practice')}
          className={`w-full text-left px-3 py-2 rounded text-sm ${activeTab === 'practice' ? 'bg-[#58A6FF]/10 text-[#58A6FF]' : 'text-[#8B949E] hover:text-[#E6EDF3] hover:bg-[#21262D]'}`}
        >
          Practice
        </button>
        <button
          onClick={() => onTabChange('dashboard')}
          className={`w-full text-left px-3 py-2 rounded text-sm ${activeTab === 'dashboard' ? 'bg-[#58A6FF]/10 text-[#58A6FF]' : 'text-[#8B949E] hover:text-[#E6EDF3] hover:bg-[#21262D]'}`}
        >
          Dashboard
        </button>
      </div>

      {/* Topics */}
      <div className="flex-1 overflow-y-auto p-2">
        <div className="text-xs text-[#8B949E] px-3 py-2 uppercase tracking-wider">Topics</div>
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => onTabChange(cat.id)}
            className={`w-full text-left px-3 py-1.5 rounded text-sm flex items-center justify-between ${activeTab === cat.id ? 'bg-[#58A6FF]/10 text-[#58A6FF]' : 'text-[#8B949E] hover:text-[#E6EDF3] hover:bg-[#21262D]'}`}
          >
            <span className="flex items-center gap-2">
              {cat.accuracy !== undefined && (
                <span className={`w-2 h-2 rounded-full ${accuracyColor(cat.accuracy)}`} title={`${cat.accuracy}% accuracy`} />
              )}
              <span>{cat.name}</span>
            </span>
            <span className="text-xs">{cat.count}</span>
          </button>
        ))}
      </div>
    </aside>
  );
}
