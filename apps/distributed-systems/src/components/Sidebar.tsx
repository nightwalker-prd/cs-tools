import { Search, GitBranchPlus, CheckCircle2 } from 'lucide-react';
import { Input } from '@cstools/ui';
import { chapters, parts } from '../data/topics';

import type { QuizScore } from '../App';

interface SidebarProps {
  activeChapter: number | null;
  onChapterChange: (id: number) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  completedChapters: number[];
  quizMode: boolean;
  onToggleQuizMode: () => void;
  quizScores: Record<number, QuizScore>;
}

export function Sidebar({
  activeChapter,
  onChapterChange,
  searchQuery,
  onSearchChange,
  completedChapters,
  quizMode,
  onToggleQuizMode,
  quizScores,
}: SidebarProps) {
  return (
    <aside className="w-72 bg-[#161B22] border-r border-[#30363D] flex flex-col h-screen">
      <div className="p-4 border-b border-[#30363D]">
        <div className="flex items-center gap-2 mb-1">
          <GitBranchPlus className="w-5 h-5 text-[#C9A0FF]" />
          <h1 className="text-base font-bold text-[#E6EDF3]">Distributed Systems</h1>
        </div>
        <p className="text-xs text-[#8B949E]">Distributed Systems Concepts</p>
      </div>

      <div className="p-3 border-b border-[#30363D]">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8B949E]" />
          <Input
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search concepts..."
            className="pl-9 bg-[#0D1117] border-[#30363D] text-sm"
          />
        </div>
      </div>

      <div className="p-3 border-b border-[#30363D]">
        <button
          onClick={onToggleQuizMode}
          className={`w-full text-left px-3 py-2 rounded text-sm font-medium transition-colors ${
            quizMode
              ? 'bg-[#D2A8FF]/10 text-[#D2A8FF]'
              : 'text-[#8B949E] hover:text-[#E6EDF3] hover:bg-[#21262D]'
          }`}
        >
          {quizMode ? 'Exit Quiz Mode' : 'Quiz Mode'}
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto p-2">
        <div className="px-2 py-1.5 mb-1">
          <span className="text-xs font-medium text-[#8B949E]">
            {completedChapters.length}/{chapters.length} topics completed
          </span>
          <div className="mt-1 h-1 bg-[#21262D] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#3FB950] rounded-full transition-all duration-300"
              style={{ width: `${(completedChapters.length / chapters.length) * 100}%` }}
            />
          </div>
        </div>

        {parts.map(part => (
          <div key={part.id} className="mt-3 first:mt-1">
            <div className="px-2 py-1.5">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-[#484F58]">
                Part {part.id}: {part.title}
              </span>
            </div>
            {chapters
              .filter(ch => ch.part === part.id)
              .map(ch => (
                <button
                  key={ch.id}
                  onClick={() => onChapterChange(ch.id)}
                  className={`w-full text-left px-3 py-2 rounded text-sm flex items-center gap-2 mb-0.5 transition-colors ${
                    activeChapter === ch.id
                      ? 'bg-[#58A6FF]/10 text-[#58A6FF]'
                      : 'text-[#8B949E] hover:text-[#E6EDF3] hover:bg-[#21262D]'
                  }`}
                >
                  {completedChapters.includes(ch.id) ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#3FB950] shrink-0" />
                  ) : (
                    <span className="w-3.5 h-3.5 rounded-full border border-[#30363D] shrink-0" />
                  )}
                  <span className="truncate flex-1">
                    <span className="text-[#484F58] mr-1">{ch.id}.</span>
                    {ch.title}
                  </span>
                  {quizScores[ch.id] && (
                    <span className={`text-[10px] font-mono shrink-0 ${quizScores[ch.id].bestPct >= 80 ? 'text-[#3FB950]' : quizScores[ch.id].bestPct >= 50 ? 'text-[#D29922]' : 'text-[#F85149]'}`}>
                      {quizScores[ch.id].bestPct}%
                    </span>
                  )}
                </button>
              ))}
          </div>
        ))}
      </nav>
    </aside>
  );
}
