import { Card, CardContent, CardHeader, CardTitle } from '@cstools/ui';
import { Bookmark, BookmarkCheck } from 'lucide-react';
import type { Concept } from '../data/concepts';

interface ConceptCardProps {
  concept: Concept;
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
  onClick: () => void;
}

export function ConceptCard({ concept, isBookmarked, onToggleBookmark, onClick }: ConceptCardProps) {
  return (
    <Card className="bg-[#161B22] border-[#30363D] hover:border-[#484F58] transition-colors cursor-pointer" onClick={onClick}>
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <div>
          <span className="text-xs text-[#8B949E] bg-[#21262D] px-2 py-0.5 rounded mb-2 inline-block">{concept.category}</span>
          <CardTitle className="text-base text-[#E6EDF3]">{concept.name}</CardTitle>
        </div>
        <button
          onClick={(e) => { e.stopPropagation(); onToggleBookmark(concept.id); }}
          className="text-[#8B949E] hover:text-[#D29922]"
        >
          {isBookmarked ? <BookmarkCheck className="w-4 h-4 text-[#D29922]" /> : <Bookmark className="w-4 h-4" />}
        </button>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-[#8B949E] line-clamp-2">{concept.description}</p>
      </CardContent>
    </Card>
  );
}
