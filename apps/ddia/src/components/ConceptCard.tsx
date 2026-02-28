import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@cstools/ui';
import { ChevronDown, ChevronRight, Bookmark, BookmarkCheck } from 'lucide-react';
import type { Concept } from '../data/chapters';

interface ConceptCardProps {
  concept: Concept;
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
}

export function ConceptCard({ concept, isBookmarked, onToggleBookmark }: ConceptCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card className="bg-[#161B22] border-[#30363D] hover:border-[#484F58] transition-colors">
      <CardHeader
        className="flex flex-row items-start justify-between space-y-0 pb-2 cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-start gap-2 flex-1 min-w-0">
          {expanded ? (
            <ChevronDown className="w-4 h-4 text-[#58A6FF] shrink-0 mt-0.5" />
          ) : (
            <ChevronRight className="w-4 h-4 text-[#8B949E] shrink-0 mt-0.5" />
          )}
          <div className="min-w-0">
            <CardTitle className="text-base text-[#E6EDF3]">{concept.name}</CardTitle>
            <p className="text-sm text-[#8B949E] mt-1">{concept.description}</p>
          </div>
        </div>
        <button
          onClick={(e) => { e.stopPropagation(); onToggleBookmark(concept.id); }}
          className="text-[#8B949E] hover:text-[#D29922] shrink-0 ml-2"
        >
          {isBookmarked ? <BookmarkCheck className="w-4 h-4 text-[#D29922]" /> : <Bookmark className="w-4 h-4" />}
        </button>
      </CardHeader>

      {expanded && (
        <CardContent className="pt-0 space-y-4">
          <div>
            <h4 className="text-xs font-semibold text-[#58A6FF] uppercase tracking-wider mb-2">Key Points</h4>
            <ul className="space-y-1.5">
              {concept.keyPoints.map((point, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-[#8B949E]">
                  <span className="text-[#30363D] mt-1.5 shrink-0">-</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {concept.tradeoffs && concept.tradeoffs.length > 0 && (
            <div className="border-t border-[#21262D] pt-3">
              <h4 className="text-xs font-semibold text-[#D29922] uppercase tracking-wider mb-2">Trade-offs</h4>
              <ul className="space-y-1.5">
                {concept.tradeoffs.map((t, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-[#8B949E]">
                    <span className="text-[#D29922] mt-1.5 shrink-0">-</span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {concept.realWorld && concept.realWorld.length > 0 && (
            <div className="border-t border-[#21262D] pt-3">
              <h4 className="text-xs font-semibold text-[#8B949E] uppercase tracking-wider mb-2">Real World</h4>
              <div className="flex flex-wrap gap-1.5">
                {concept.realWorld.map((ex, i) => (
                  <span key={i} className="text-xs bg-[#21262D] text-[#8B949E] px-2 py-0.5 rounded">
                    {ex}
                  </span>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      )}
    </Card>
  );
}
