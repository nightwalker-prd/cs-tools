import { useState } from 'react';
import { ArrowLeft, Search, Volume2, PenTool, Repeat, Languages, AlignJustify, FileText } from 'lucide-react';
import { useSpeechSynthesis } from '@arabtools/core/hooks';
import type { ExerciseFilters, ExerciseMode } from '../data/types';
import { getFilteredExercises } from '../data/exercises';

interface ExerciseBrowserProps {
  filters: ExerciseFilters;
  onBack: () => void;
}

const MODE_ICONS: Record<ExerciseMode, typeof PenTool> = {
  'sentence-completion': PenTool,
  'sentence-transformation': Repeat,
  'sentence-translation': Languages,
  'paragraph-assembly': AlignJustify,
  'paragraph-translation': FileText,
};

const MODE_LABELS: Record<ExerciseMode, string> = {
  'sentence-completion': 'Completion',
  'sentence-transformation': 'Transform',
  'sentence-translation': 'Translation',
  'paragraph-assembly': 'Assembly',
  'paragraph-translation': 'Para. Trans.',
};

export function ExerciseBrowser({ filters, onBack }: ExerciseBrowserProps) {
  const { speak } = useSpeechSynthesis();
  const [search, setSearch] = useState('');

  const exercises = getFilteredExercises(filters);

  const filtered = search.trim()
    ? exercises.filter(
        e =>
          e.modelAnswer.includes(search) ||
          e.modelAnswerClean.includes(search) ||
          (e.prompt && e.prompt.toLowerCase().includes(search.toLowerCase())) ||
          (e.sentenceTemplate && e.sentenceTemplate.includes(search)) ||
          (e.sourceArabic && e.sourceArabic.includes(search)) ||
          e.nahwTopics.some(t => t.includes(search.toLowerCase())),
      )
    : exercises;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-amber-50 p-4 md:p-8">
      <div className="max-w-2xl mx-auto space-y-4">
        {/* Header */}
        <div className="backdrop-blur-md bg-white/70 border border-white/40 rounded-3xl p-4 shadow-lg">
          <div className="flex items-center justify-between">
            <button
              onClick={onBack}
              className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
            <h2 className="text-lg font-serif text-primary">Exercise Browser</h2>
            <span className="text-xs text-muted-foreground">{filtered.length} exercises</span>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search exercises..."
            className="w-full pl-10 pr-4 py-3 backdrop-blur-md bg-white/70 border border-white/40 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
          />
        </div>

        {/* Exercise list */}
        <div className="space-y-2">
          {filtered.map(exercise => {
            const ModeIcon = MODE_ICONS[exercise.mode];
            return (
              <div
                key={exercise.id}
                className="backdrop-blur-md bg-white/70 border border-white/40 rounded-2xl p-4 hover:scale-[1.01] transition-transform"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    {/* Mode + difficulty badges */}
                    <div className="flex items-center gap-2 mb-2">
                      <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-primary/10 text-primary">
                        <ModeIcon className="w-3 h-3" />
                        {MODE_LABELS[exercise.mode]}
                      </span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                        exercise.difficulty === 'beginner' ? 'bg-green-100 text-green-700' :
                        exercise.difficulty === 'intermediate' ? 'bg-blue-100 text-blue-700' :
                        'bg-purple-100 text-purple-700'
                      }`}>
                        {exercise.difficulty}
                      </span>
                    </div>

                    {/* Exercise preview */}
                    {exercise.mode === 'sentence-completion' && exercise.sentenceTemplate && (
                      <p dir="rtl" className="font-arabic text-base leading-relaxed text-primary truncate">
                        {exercise.sentenceTemplate}
                      </p>
                    )}
                    {exercise.mode === 'sentence-transformation' && exercise.sourceArabic && (
                      <p dir="rtl" className="font-arabic text-base leading-relaxed text-primary truncate">
                        {exercise.sourceArabic}
                      </p>
                    )}
                    {(exercise.mode === 'sentence-translation' || exercise.mode === 'paragraph-translation') && exercise.prompt && (
                      <p className="text-sm text-primary truncate">
                        {exercise.prompt}
                      </p>
                    )}
                    {exercise.mode === 'paragraph-assembly' && exercise.sentences && (
                      <p dir="rtl" className="font-arabic text-sm leading-relaxed text-primary truncate">
                        {exercise.sentences.map(s => s.arabic).join(' · ')}
                      </p>
                    )}

                    {/* Nahw topics */}
                    <div className="flex items-center gap-1 mt-2 flex-wrap">
                      {exercise.nahwTopics.slice(0, 3).map(topic => (
                        <span key={topic} className="px-1.5 py-0.5 rounded-full text-[9px] bg-accent/10 text-accent-foreground">
                          {topic.replace(/-/g, ' ')}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* TTS button */}
                  <button
                    onClick={() => speak(exercise.modelAnswerClean)}
                    className="flex-shrink-0 p-2 rounded-lg hover:bg-accent/10 transition-colors"
                  >
                    <Volume2 className="w-4 h-4 text-muted-foreground" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <p className="text-sm">No exercises match your search</p>
          </div>
        )}
      </div>
    </div>
  );
}
