import { Book, BarChart3, Flame, Trophy } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  stats: { streak: number; xp: number; cardsDue: number; cardsNew: number };
}

const topics = [
  { id: 'arrays', name: 'Arrays', count: 5 },
  { id: 'linked-lists', name: 'Linked Lists', count: 4 },
  { id: 'stacks-queues', name: 'Stacks & Queues', count: 3 },
  { id: 'trees', name: 'Trees', count: 5 },
  { id: 'graphs', name: 'Graphs', count: 4 },
  { id: 'sorting', name: 'Sorting', count: 5 },
  { id: 'searching', name: 'Searching', count: 3 },
  { id: 'dynamic-programming', name: 'Dynamic Programming', count: 4 },
  { id: 'complexity', name: 'Complexity', count: 3 },
];

export function Sidebar({ activeTab, onTabChange, stats }: SidebarProps) {
  return (
    <aside className="w-64 bg-[#161B22] border-r border-[#30363D] flex flex-col h-screen">
      <div className="p-4 border-b border-[#30363D]">
        <h1 className="text-lg font-bold text-[#E6EDF3]">DSA Drills</h1>
        <p className="text-xs text-[#8B949E]">Spaced repetition flashcards</p>
      </div>

      {/* Stats */}
      <div className="p-4 border-b border-[#30363D] grid grid-cols-2 gap-3">
        <div className="flex items-center gap-2">
          <Flame className="w-4 h-4 text-[#FFA657]" />
          <span className="text-sm text-[#E6EDF3]">{stats.streak}d</span>
        </div>
        <div className="flex items-center gap-2">
          <Trophy className="w-4 h-4 text-[#58A6FF]" />
          <span className="text-sm text-[#E6EDF3]">{stats.xp} XP</span>
        </div>
        <div className="flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-[#D29922]" />
          <span className="text-sm text-[#E6EDF3]">{stats.cardsDue} due</span>
        </div>
        <div className="flex items-center gap-2">
          <Book className="w-4 h-4 text-[#3FB950]" />
          <span className="text-sm text-[#E6EDF3]">{stats.cardsNew} new</span>
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
        {topics.map(topic => (
          <button
            key={topic.id}
            onClick={() => onTabChange(topic.id)}
            className={`w-full text-left px-3 py-1.5 rounded text-sm flex justify-between ${activeTab === topic.id ? 'bg-[#58A6FF]/10 text-[#58A6FF]' : 'text-[#8B949E] hover:text-[#E6EDF3] hover:bg-[#21262D]'}`}
          >
            <span>{topic.name}</span>
            <span className="text-xs">{topic.count}</span>
          </button>
        ))}
      </div>
    </aside>
  );
}
