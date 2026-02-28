import { chapters } from '../data/topics';
import { ConceptCard } from './ConceptCard';

interface SearchResultsProps {
  query: string;
  bookmarks: string[];
  onToggleBookmark: (id: string) => void;
  onGoToChapter: (id: number) => void;
}

export function SearchResults({ query, bookmarks, onToggleBookmark, onGoToChapter }: SearchResultsProps) {
  const lq = query.toLowerCase();

  const results = chapters.flatMap(ch =>
    ch.concepts
      .filter(c =>
        c.title.toLowerCase().includes(lq) ||
        c.keyPoints.some(k => k.toLowerCase().includes(lq)) ||
        c.tradeoffs.some(t => t.toLowerCase().includes(lq)) ||
        c.realWorld.some(r => r.toLowerCase().includes(lq))
      )
      .map(c => ({ concept: c, chapter: ch }))
  );

  if (results.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-[#8B949E]">No results for &ldquo;{query}&rdquo;</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-4">
      <p className="text-sm text-[#8B949E]">{results.length} result{results.length !== 1 ? 's' : ''} for &ldquo;{query}&rdquo;</p>
      {results.map(({ concept, chapter }) => (
        <div key={concept.id}>
          <button
            onClick={() => onGoToChapter(chapter.id)}
            className="text-xs text-[#58A6FF] hover:underline mb-1 inline-block"
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
