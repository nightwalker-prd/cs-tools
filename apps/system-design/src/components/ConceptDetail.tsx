import { Button } from '@cstools/ui';
import { ArrowLeft, Bookmark, BookmarkCheck } from 'lucide-react';
import type { Concept } from '../data/concepts';

interface ConceptDetailProps {
  concept: Concept;
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
  onBack: () => void;
}

export function ConceptDetail({ concept, isBookmarked, onToggleBookmark, onBack }: ConceptDetailProps) {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" onClick={onBack} className="text-[#8B949E]">
          <ArrowLeft className="w-4 h-4 mr-1" /> Back
        </Button>
      </div>

      <div className="flex items-start justify-between">
        <div>
          <span className="text-xs text-[#8B949E] bg-[#21262D] px-2 py-1 rounded">{concept.category}</span>
          <h1 className="text-2xl font-bold text-[#E6EDF3] mt-2">{concept.name}</h1>
        </div>
        <button onClick={() => onToggleBookmark(concept.id)} className="text-[#8B949E] hover:text-[#D29922]">
          {isBookmarked ? <BookmarkCheck className="w-5 h-5 text-[#D29922]" /> : <Bookmark className="w-5 h-5" />}
        </button>
      </div>

      <p className="text-[#8B949E] leading-relaxed">{concept.description}</p>

      <div className="bg-[#161B22] rounded-md border border-[#30363D] p-4">
        <h3 className="text-sm font-semibold text-[#E6EDF3] mb-3">Key Points</h3>
        <ul className="space-y-2">
          {concept.keyPoints.map((point, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-[#8B949E]">
              <span className="text-[#58A6FF] mt-1">-</span>
              {point}
            </li>
          ))}
        </ul>
      </div>

      {concept.tradeoffs && (
        <div className="bg-[#161B22] rounded-md border border-[#D29922]/30 p-4">
          <h3 className="text-sm font-semibold text-[#D29922] mb-3">Trade-offs</h3>
          <ul className="space-y-2">
            {concept.tradeoffs.map((t, i) => (
              <li key={i} className="text-sm text-[#8B949E]">- {t}</li>
            ))}
          </ul>
        </div>
      )}

      {concept.realWorld && (
        <div className="bg-[#161B22] rounded-md border border-[#30363D] p-4">
          <h3 className="text-sm font-semibold text-[#E6EDF3] mb-3">Real-World Examples</h3>
          <div className="flex flex-wrap gap-2">
            {concept.realWorld.map((ex, i) => (
              <span key={i} className="text-xs bg-[#21262D] text-[#8B949E] px-2 py-1 rounded">{ex}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
