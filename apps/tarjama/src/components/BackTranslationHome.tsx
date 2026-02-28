import { useState } from 'react';
import { ArrowLeft, BookOpen } from 'lucide-react';
import type { BackTranslationPassage, SelfRating } from '../data/types';
import { ALL_PASSAGES, getFilteredPassages } from '../data/passages';

interface BackTranslationHomeProps {
  onSelectPassage: (passage: BackTranslationPassage) => void;
  onBack: () => void;
  getLastAttempt: (passageId: string) => { rating: SelfRating } | undefined;
}

const SOURCES = [
  { value: 'all', label: 'All Sources' },
  { value: 'quran', label: 'Quran' },
  { value: 'hadith', label: 'Hadith' },
  { value: 'prose', label: 'Prose' },
  { value: 'grammar', label: 'Grammar' },
] as const;

const DIFFICULTIES = ['all', 'beginner', 'intermediate', 'advanced'] as const;

const RATING_DISPLAY: Record<SelfRating, { emoji: string; color: string }> = {
  'perfect': { emoji: '\u{1F7E2}', color: 'text-green-600' },
  'close': { emoji: '\u{1F535}', color: 'text-blue-600' },
  'partial': { emoji: '\u{1F7E1}', color: 'text-yellow-600' },
  'needs-work': { emoji: '\u{1F534}', color: 'text-red-600' },
};

const SOURCE_COLORS: Record<string, string> = {
  quran: 'bg-emerald-100 text-emerald-700',
  hadith: 'bg-amber-100 text-amber-700',
  prose: 'bg-blue-100 text-blue-700',
  grammar: 'bg-purple-100 text-purple-700',
};

export function BackTranslationHome({ onSelectPassage, onBack, getLastAttempt }: BackTranslationHomeProps) {
  const [difficulty, setDifficulty] = useState<typeof DIFFICULTIES[number]>('all');
  const [source, setSource] = useState<typeof SOURCES[number]['value']>('all');

  const passages = getFilteredPassages({ difficulty, source });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-amber-50 p-4 md:p-8">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="backdrop-blur-md bg-white/70 border border-white/40 rounded-3xl p-4 shadow-lg">
          <div className="flex items-center justify-between">
            <button
              onClick={onBack}
              className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Dashboard
            </button>
            <div className="text-center">
              <h1 className="text-xl font-serif text-primary">Back Translation</h1>
              <p className="text-sm font-arabic text-primary/70" dir="rtl">الترجمة العكسية</p>
            </div>
            <div className="w-20" />
          </div>
        </div>

        {/* Description */}
        <div className="stats-pill p-4 flex items-center gap-3">
          <BookOpen className="w-5 h-5 text-accent shrink-0" />
          <p className="text-sm text-muted-foreground">
            Translate Arabic to English, then reconstruct the Arabic from your translation. Compare with the original and self-assess.
          </p>
        </div>

        {/* Difficulty filter */}
        <div className="flex items-center justify-center gap-2">
          {DIFFICULTIES.map(d => (
            <button
              key={d}
              onClick={() => setDifficulty(d)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                difficulty === d
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
              onClick={() => setSource(s.value)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                source === s.value
                  ? 'bg-primary text-white'
                  : 'bg-white/70 text-muted-foreground hover:bg-white'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* Count */}
        <div className="text-center text-sm text-muted-foreground">
          {passages.length} of {ALL_PASSAGES.length} passages
        </div>

        {/* Passage cards */}
        <div className="space-y-3">
          {passages.map(passage => {
            const lastAttempt = getLastAttempt(passage.id);
            return (
              <button
                key={passage.id}
                onClick={() => onSelectPassage(passage)}
                className="w-full text-left backdrop-blur-md bg-white/70 border border-white/40 rounded-2xl p-4 shadow-sm hover:shadow-md hover:bg-white/80 transition-all"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-serif text-primary font-medium truncate">{passage.title}</h3>
                      {lastAttempt && (
                        <span className={`text-sm ${RATING_DISPLAY[lastAttempt.rating].color}`}>
                          {RATING_DISPLAY[lastAttempt.rating].emoji}
                        </span>
                      )}
                    </div>
                    <p className="font-arabic text-primary/70 text-sm mb-2" dir="rtl">
                      {passage.titleArabic}
                    </p>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${SOURCE_COLORS[passage.source]}`}>
                        {passage.source}
                      </span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                        passage.difficulty === 'beginner' ? 'bg-green-100 text-green-700' :
                        passage.difficulty === 'intermediate' ? 'bg-blue-100 text-blue-700' :
                        'bg-purple-100 text-purple-700'
                      }`}>
                        {passage.difficulty}
                      </span>
                      <span className="text-[10px] text-muted-foreground">
                        {passage.wordCount} words
                      </span>
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {passages.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            No passages match the selected filters.
          </div>
        )}
      </div>
    </div>
  );
}
