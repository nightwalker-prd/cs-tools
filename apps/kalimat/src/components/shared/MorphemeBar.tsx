import { useState } from 'react';

// Morpheme type classification based on common Arabic prefixes/suffixes
function classifyPiece(piece: string): string {
  const p = piece.trim();
  // Common prefixes
  if (/^[وَفَبِلِكَسَ]$/.test(p) || p === 'وَ' || p === 'فَ' || p === 'بِ' || p === 'لِ' || p === 'كَ' || p === 'سَ') return 'prefix';
  // Article
  if (p === 'ٱل' || p === 'ال' || p === 'ٱلْ' || p === 'الْ') return 'article';
  // Suffix markers (case endings, pronouns at end)
  if (/^[ِّةٌٍَُْ]$/.test(p) || p.length === 1) return 'suffix';
  // Default to stem
  return 'stem';
}

interface MorphemeBarProps {
  pieces: Record<string, string[]>;
  compact?: boolean;
}

export function MorphemeBar({ pieces, compact }: MorphemeBarProps) {
  const [activePiece, setActivePiece] = useState<string | null>(null);
  const entries = Object.entries(pieces);

  if (entries.length === 0) return null;

  const getTypeColor = (type: string, isActive: boolean) => {
      switch (type) {
          case 'prefix': return isActive ? 'bg-amber-200 text-amber-900 ring-2 ring-amber-400' : 'bg-amber-100/50 text-amber-700 hover:bg-amber-100';
          case 'article': return isActive ? 'bg-orange-200 text-orange-900 ring-2 ring-orange-400' : 'bg-orange-100/50 text-orange-700 hover:bg-orange-100';
          case 'suffix': return isActive ? 'bg-blue-200 text-blue-900 ring-2 ring-blue-400' : 'bg-blue-100/50 text-blue-700 hover:bg-blue-100';
          default: return isActive ? 'bg-primary/20 text-primary ring-2 ring-primary' : 'bg-muted/50 text-foreground hover:bg-muted';
      }
  };

  return (
    <div className="relative inline-flex flex-col items-center">
      <div className="flex flex-wrap items-center justify-center gap-1 font-arabic text-xl" dir="rtl">
        {entries.map(([piece, meanings], i) => { // eslint-ignore-line
          const type = classifyPiece(piece);
          const isActive = activePiece === piece;
          return (
            <button
              key={i}
              className={`
                px-2 py-0.5 rounded cursor-pointer transition-all duration-200 select-none
                ${getTypeColor(type, isActive)}
                ${compact ? 'text-lg' : 'text-xl'}
              `}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setActivePiece(isActive ? null : piece);
              }}
              title={meanings.join(', ')}
            >
              {piece}
            </button>
          );
        })}
      </div>
      
      {activePiece && pieces[activePiece] && (
        <div className="mt-2 text-center animate-in fade-in zoom-in-95 duration-200 bg-popover border border-border text-popover-foreground px-3 py-1.5 rounded-md shadow-md z-10 max-w-[200px]">
          <div className="font-arabic text-lg leading-tight mb-1 text-primary" dir="rtl">{activePiece}</div>
          <div className="text-xs text-muted-foreground leading-tight">{pieces[activePiece].join(', ')}</div>
        </div>
      )}
    </div>
  );
}
