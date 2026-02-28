import { useState, useMemo } from 'react';
import { ArrowLeft, Volume2 } from 'lucide-react';
import { useSpeechSynthesis } from '@arabtools/core/hooks';
import type { TranslationCard, DeckFilters } from '../data/types';
import { getFilteredCards } from '../data/cards';

interface DeckBrowserProps {
  filters: DeckFilters;
  onBack: () => void;
}

export function DeckBrowser({ filters, onBack }: DeckBrowserProps) {
  const { speak } = useSpeechSynthesis();
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  const cards = useMemo(() => {
    let filtered = getFilteredCards({
      difficulty: filters.difficulty,
      source: filters.source,
      nahwTopic: filters.nahwTopic,
    });

    if (search.trim()) {
      const q = search.toLowerCase();
      filtered = filtered.filter(c =>
        c.english.toLowerCase().includes(q) ||
        c.modelArabicClean.includes(q) ||
        c.nahwTopics.some(t => t.includes(q)),
      );
    }

    return filtered;
  }, [filters, search]);

  const grouped = useMemo(() => {
    const groups: Record<string, TranslationCard[]> = {};
    for (const card of cards) {
      const key = card.source;
      if (!groups[key]) groups[key] = [];
      groups[key].push(card);
    }
    return groups;
  }, [cards]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-amber-50 p-4 md:p-8">
      <div className="max-w-2xl mx-auto space-y-4">
        {/* Header */}
        <div className="backdrop-blur-md bg-white/70 border border-white/40 rounded-3xl p-4 shadow-lg">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
            <h2 className="text-xl font-serif text-primary flex-1">Card Browser</h2>
            <span className="text-sm text-muted-foreground">{cards.length} cards</span>
          </div>
        </div>

        {/* Search */}
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search cards..."
          className="w-full backdrop-blur-md bg-white/70 border border-white/40 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 shadow-sm"
        />

        {/* Card groups */}
        {Object.entries(grouped).map(([source, sourceCards]) => (
          <div key={source} className="space-y-2">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide px-1">
              {source} ({sourceCards.length})
            </h3>
            {sourceCards.map(card => (
              <button
                key={card.id}
                onClick={() => setExpandedId(expandedId === card.id ? null : card.id)}
                className="w-full text-left backdrop-blur-md bg-white/70 border border-white/40 rounded-2xl p-4 shadow-md transition-all hover:shadow-lg hover:scale-[1.01] active:scale-[0.99]"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm leading-relaxed text-primary">{card.english}</p>
                    {expandedId === card.id && (
                      <div className="mt-3 space-y-2 animate-fade-in-up">
                        <div
                          className="flex items-center gap-2 cursor-pointer"
                          onClick={e => { e.stopPropagation(); speak(card.modelArabicClean); }}
                        >
                          <p
                            dir="rtl"
                            className="font-arabic text-lg leading-relaxed text-primary hover:text-accent transition-colors"
                          >
                            {card.modelArabic}
                          </p>
                          <Volume2 className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {card.nahwTopics.map(t => (
                            <span key={t} className="px-2 py-0.5 rounded-full text-[10px] bg-accent/10 text-accent-foreground">
                              {t.replace(/-/g, ' ')}
                            </span>
                          ))}
                        </div>
                        {card.hint && (
                          <p className="text-xs text-muted-foreground italic">{card.hint}</p>
                        )}
                      </div>
                    )}
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium shrink-0 ${
                    card.difficulty === 'beginner' ? 'bg-green-100 text-green-700' :
                    card.difficulty === 'intermediate' ? 'bg-blue-100 text-blue-700' :
                    'bg-purple-100 text-purple-700'
                  }`}>
                    {card.difficulty}
                  </span>
                </div>
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
