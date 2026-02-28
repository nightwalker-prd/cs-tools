import { BookOpen, Layers, Languages } from 'lucide-react';
import type { DeckFilters } from '../data/types';
import { ALL_CARDS } from '../data/cards';

interface DashboardProps {
  stats: {
    totalCards: number;
    cardsInDeck: number;
    dueNow: number;
    newCards: number;
    learningCards: number;
    reviewCards: number;
  };
  filters: DeckFilters;
  onFiltersChange: (filters: DeckFilters) => void;
  onStartDrill: () => void;
  onBrowse: () => void;
  onBackTranslation: () => void;
}

const SOURCES = [
  { value: 'all', label: 'All Sources' },
  { value: 'fstu', label: 'FSTU' },
  { value: 'quran', label: 'Quranic' },
  { value: 'hadith', label: 'Hadith' },
] as const;

const DIFFICULTIES = ['all', 'beginner', 'intermediate', 'advanced'] as const;

export function Dashboard({ stats, filters, onFiltersChange, onStartDrill, onBrowse, onBackTranslation }: DashboardProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-amber-50 p-4 md:p-8">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center pt-4 pb-2">
          <h1 className="text-3xl font-serif text-primary mb-1">Tarjama</h1>
          <p className="text-xl font-arabic text-primary/80" dir="rtl">ترجمة</p>
          <p className="text-sm text-muted-foreground mt-2">
            English → Arabic translation drills with spaced repetition
          </p>
        </div>

        {/* Stats pills */}
        <div className="grid grid-cols-3 gap-3">
          <div className="stats-pill px-4 py-3 text-center">
            <div className="text-2xl font-bold text-accent">{stats.dueNow}</div>
            <div className="text-xs text-muted-foreground">Due Now</div>
          </div>
          <div className="stats-pill px-4 py-3 text-center">
            <div className="text-2xl font-bold text-primary">{stats.learningCards}</div>
            <div className="text-xs text-muted-foreground">Learning</div>
          </div>
          <div className="stats-pill px-4 py-3 text-center">
            <div className="text-2xl font-bold text-green-600">{stats.reviewCards}</div>
            <div className="text-xs text-muted-foreground">Mastered</div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="backdrop-blur-md bg-white/70 border border-white/40 rounded-2xl p-4">
          <div className="flex justify-between text-sm text-muted-foreground mb-2">
            <span>{stats.cardsInDeck} / {stats.totalCards} cards in deck</span>
            <span>{stats.newCards} new</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-accent rounded-full transition-all duration-500"
              style={{ width: `${stats.totalCards > 0 ? (stats.reviewCards / stats.totalCards) * 100 : 0}%` }}
            />
          </div>
        </div>

        {/* Difficulty filter pills */}
        <div className="flex items-center justify-center gap-2">
          {DIFFICULTIES.map(d => (
            <button
              key={d}
              onClick={() => onFiltersChange({ ...filters, difficulty: d })}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                filters.difficulty === d
                  ? 'bg-primary text-white'
                  : 'bg-white/70 text-muted-foreground hover:bg-white'
              }`}
            >
              {d === 'all' ? 'All' : d.charAt(0).toUpperCase() + d.slice(1)}
            </button>
          ))}
        </div>

        {/* Source filter */}
        <div className="flex items-center justify-center gap-2">
          {SOURCES.map(s => (
            <button
              key={s.value}
              onClick={() => onFiltersChange({ ...filters, source: s.value as DeckFilters['source'] })}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                filters.source === s.value
                  ? 'bg-primary text-white'
                  : 'bg-white/70 text-muted-foreground hover:bg-white'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* Card count info */}
        <div className="stats-pill p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Layers className="w-5 h-5 text-accent" />
            <span className="text-sm text-primary">Available Cards</span>
          </div>
          <span className="text-lg font-bold text-accent">{ALL_CARDS.length}</span>
        </div>

        {/* Action buttons */}
        <div className="flex gap-3">
          <button
            onClick={onStartDrill}
            className="flex-1 px-6 py-4 bg-gradient-to-r from-accent to-[#d4b366] text-white rounded-xl font-medium text-lg hover:opacity-90 transition-all shadow-lg shadow-accent/20"
          >
            {stats.dueNow > 0 ? `Start Review (${stats.dueNow} due)` : 'Start Drill'}
          </button>
          <button
            onClick={onBrowse}
            className="flex items-center gap-2 px-6 py-4 bg-white border-2 border-primary text-primary rounded-xl font-medium hover:bg-primary/5 transition-colors"
          >
            <BookOpen className="w-5 h-5" />
            Browse
          </button>
        </div>

        {/* Back Translation */}
        <button
          onClick={onBackTranslation}
          className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-white border-2 border-accent text-accent rounded-xl font-medium hover:bg-accent/5 transition-colors"
        >
          <Languages className="w-5 h-5" />
          Back Translation
        </button>
      </div>
    </div>
  );
}
