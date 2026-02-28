import { useState } from 'react';
import { usePersistedState } from '@cstools/core/hooks';
import { chapters, getChapter } from './data/chapters';
import { Sidebar } from './components/Sidebar';
import { ChapterView } from './components/ChapterView';
import { SearchResults } from './components/SearchResults';
import { QuizMode } from './components/QuizMode';
import { BookOpen } from 'lucide-react';

export interface QuizScore {
  score: number;
  total: number;
  bestPct: number;
  lastAttempt: string;
}

export default function App() {
  const [activeChapter, setActiveChapter] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [quizMode, setQuizMode] = useState(false);
  const [bookmarks, setBookmarks] = usePersistedState<string[]>('ddia-bookmarks', []);
  const [completedChapters, setCompletedChapters] = usePersistedState<number[]>('ddia-completed', []);
  const [quizScores, setQuizScores] = usePersistedState<Record<number, QuizScore>>('ddia-quiz-scores', {});

  const handleQuizComplete = (chapterId: number, score: number, total: number) => {
    const pct = Math.round((score / total) * 100);
    setQuizScores(prev => ({
      ...prev,
      [chapterId]: {
        score,
        total,
        bestPct: Math.max(pct, prev[chapterId]?.bestPct ?? 0),
        lastAttempt: new Date().toISOString(),
      },
    }));
  };

  const toggleBookmark = (id: string) => {
    setBookmarks(prev => prev.includes(id) ? prev.filter(b => b !== id) : [...prev, id]);
  };

  const toggleCompleted = (chapterId: number) => {
    setCompletedChapters(prev =>
      prev.includes(chapterId) ? prev.filter(id => id !== chapterId) : [...prev, chapterId]
    );
  };

  const handleChapterChange = (id: number) => {
    setActiveChapter(id);
    setSearchQuery('');
  };

  const chapter = activeChapter ? getChapter(activeChapter) : null;

  const renderContent = () => {
    if (searchQuery.trim()) {
      return (
        <SearchResults
          query={searchQuery}
          bookmarks={bookmarks}
          onToggleBookmark={toggleBookmark}
          onGoToChapter={handleChapterChange}
        />
      );
    }

    if (quizMode && chapter) {
      return <QuizMode chapterId={chapter.id} chapterTitle={chapter.title} onQuizComplete={handleQuizComplete} bestScore={quizScores[chapter.id]?.bestPct} />;
    }

    if (chapter) {
      return (
        <ChapterView
          chapter={chapter}
          bookmarks={bookmarks}
          onToggleBookmark={toggleBookmark}
          isCompleted={completedChapters.includes(chapter.id)}
          onToggleCompleted={() => toggleCompleted(chapter.id)}
        />
      );
    }

    return (
      <div className="max-w-2xl mx-auto text-center py-20 space-y-6">
        <BookOpen className="w-16 h-16 text-[#58A6FF] mx-auto" />
        <h2 className="text-2xl font-bold text-[#E6EDF3]">DDIA Explorer</h2>
        <p className="text-[#8B949E] leading-relaxed">
          Explore key concepts from Designing Data-Intensive Applications by Martin Kleppmann.
          Select a chapter from the sidebar to begin.
        </p>
        <div className="grid grid-cols-3 gap-4 pt-4">
          <div className="bg-[#161B22] border border-[#30363D] rounded-lg p-4">
            <div className="text-2xl font-bold font-mono text-[#E6EDF3]">{chapters.length}</div>
            <div className="text-xs text-[#8B949E]">Chapters</div>
          </div>
          <div className="bg-[#161B22] border border-[#30363D] rounded-lg p-4">
            <div className="text-2xl font-bold font-mono text-[#3FB950]">{completedChapters.length}</div>
            <div className="text-xs text-[#8B949E]">Completed</div>
          </div>
          <div className="bg-[#161B22] border border-[#30363D] rounded-lg p-4">
            <div className="text-2xl font-bold font-mono text-[#D29922]">{bookmarks.length}</div>
            <div className="text-xs text-[#8B949E]">Bookmarked</div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex h-screen bg-[#0D1117]">
      <Sidebar
        activeChapter={activeChapter}
        onChapterChange={handleChapterChange}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        completedChapters={completedChapters}
        quizMode={quizMode}
        onToggleQuizMode={() => setQuizMode(!quizMode)}
        quizScores={quizScores}
      />
      <main className="flex-1 overflow-y-auto p-8">
        {renderContent()}
      </main>
    </div>
  );
}
