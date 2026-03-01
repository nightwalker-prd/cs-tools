import { chapters } from '../data/topics';
import { ConceptCard } from './ConceptCard';

interface SearchResultsProps {
  query: string;
  bookmarks: string[];
  onToggleBookmark: (id: string) => void;
  onGoToChapter: (chapterId: number) => void;
}

export function SearchResults({ query, bookmarks, onToggleBookmark, onGoToChapter }: SearchResultsProps) {
  const lowerQuery = query.toLowerCase();

  const results = chapters.flatMap(ch =>
    ch.concepts
      .filter(c =>
        c.name.toLowerCase().includes(lowerQuery) ||
        c.description.toLowerCase().includes(lowerQuery) ||
        c.keyPoints.some(p => p.toLowerCase().includes(lowerQuery)) ||
        c.tradeoffs?.some(t => t.toLowerCase().includes(lowerQuery)) ||
        c.realWorld?.some(r => r.toLowerCase().includes(lowerQuery))
      )
      .map(c => ({ concept: c, chapter: ch }))
  );

  if (results.length === 0) {
    return (
      <div className="max-w-4xl mx-auto text-center py-16">
        <p className="text-[#8B949E]">No concepts found matching "{query}"</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-4">
      <h2 className="text-lg font-bold text-[#E6EDF3]">
        Search Results <span className="text-sm text-[#8B949E] font-normal ml-2">({results.length})</span>
      </h2>
      {results.map(({ concept, chapter }) => (
        <div key={concept.id}>
          <button
            onClick={() => onGoToChapter(chapter.id)}
            className="text-xs text-[#484F58] hover:text-[#58A6FF] mb-1 transition-colors"
          >
            Topic {chapter.id}: {chapter.title}
          </button>
          <ConceptCard
            concept={concept}
            isBookmarked={bookmarks.includes(concept.id)}
            onToggleBookmark={onToggleBookmark}
          />
        </div>
      ))}
    </div>
  );
}
