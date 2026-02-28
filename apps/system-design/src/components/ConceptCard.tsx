import { Card, CardContent, CardHeader, CardTitle } from '@cstools/ui';
import { Bookmark, BookmarkCheck } from 'lucide-react';

interface Concept {
  id: string;
  title: string;
  keyPoints: string[];
  tradeoffs: string[];
  realWorld: string[];
}

interface ConceptCardProps {
  concept: Concept;
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
}

export function ConceptCard({ concept, isBookmarked, onToggleBookmark }: ConceptCardProps) {
  return (
    <Card className="bg-[#161B22] border-[#30363D]">
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <CardTitle className="text-base text-[#E6EDF3]">{concept.title}</CardTitle>
        <button
          onClick={() => onToggleBookmark(concept.id)}
          className="text-[#8B949E] hover:text-[#D29922] shrink-0"
        >
          {isBookmarked ? <BookmarkCheck className="w-4 h-4 text-[#D29922]" /> : <Bookmark className="w-4 h-4" />}
        </button>
      </CardHeader>
      <CardContent className="space-y-3">
        <div>
          <h4 className="text-xs font-semibold text-[#58A6FF] uppercase tracking-wider mb-2">Key Points</h4>
          <ul className="space-y-1">
            {concept.keyPoints.map((point, i) => (
              <li key={i} className="text-sm text-[#8B949E] flex items-start gap-2">
                <span className="text-[#30363D] mt-1.5 shrink-0">-</span>
                {point}
              </li>
            ))}
          </ul>
        </div>

        {concept.tradeoffs.length > 0 && (
          <div>
            <h4 className="text-xs font-semibold text-[#D29922] uppercase tracking-wider mb-2">Trade-offs</h4>
            <ul className="space-y-1">
              {concept.tradeoffs.map((t, i) => (
                <li key={i} className="text-sm text-[#8B949E] flex items-start gap-2">
                  <span className="text-[#D29922] mt-1.5 shrink-0">-</span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
        )}

        {concept.realWorld.length > 0 && (
          <div>
            <h4 className="text-xs font-semibold text-[#8B949E] uppercase tracking-wider mb-2">Real-World</h4>
            <div className="flex flex-wrap gap-1.5">
              {concept.realWorld.map((ex, i) => (
                <span key={i} className="text-xs bg-[#21262D] text-[#8B949E] px-2 py-0.5 rounded">{ex}</span>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
