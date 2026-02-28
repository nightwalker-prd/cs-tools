import { BookOpen, Layers, PenTool, Repeat, Languages, AlignJustify, FileText } from 'lucide-react';
import type { ExerciseFilters, ExerciseMode } from '../data/types';
import { getExerciseCountByMode } from '../data/exercises';

interface DashboardProps {
  stats: {
    totalExercises: number;
    exercisesInDeck: number;
    dueNow: number;
    newExercises: number;
    learningExercises: number;
    reviewExercises: number;
  };
  filters: ExerciseFilters;
  onFiltersChange: (filters: ExerciseFilters) => void;
  onStartDrill: () => void;
  onBrowse: () => void;
}

const MODES: { value: ExerciseMode | 'all'; label: string; icon: typeof PenTool }[] = [
  { value: 'all', label: 'All Modes', icon: Layers },
  { value: 'sentence-completion', label: 'Completion', icon: PenTool },
  { value: 'sentence-transformation', label: 'Transform', icon: Repeat },
  { value: 'sentence-translation', label: 'Translate', icon: Languages },
  { value: 'paragraph-assembly', label: 'Assembly', icon: AlignJustify },
  { value: 'paragraph-translation', label: 'Para. Trans.', icon: FileText },
];

const DIFFICULTIES = ['all', 'beginner', 'intermediate', 'advanced'] as const;

export function Dashboard({ stats, filters, onFiltersChange, onStartDrill, onBrowse }: DashboardProps) {
  const modeCounts = getExerciseCountByMode();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-amber-50 p-4 md:p-8">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center pt-4 pb-2">
          <h1 className="text-3xl font-serif text-primary mb-1">Insha</h1>
          <p className="text-xl font-arabic text-primary/80" dir="rtl">إنشاء</p>
          <p className="text-sm text-muted-foreground mt-2">
            Guided sentence & paragraph building with spaced repetition
          </p>
        </div>

        {/* Stats pills */}
        <div className="grid grid-cols-3 gap-3">
          <div className="stats-pill px-4 py-3 text-center">
            <div className="text-2xl font-bold text-accent">{stats.dueNow}</div>
            <div className="text-xs text-muted-foreground">Due Now</div>
          </div>
          <div className="stats-pill px-4 py-3 text-center">
            <div className="text-2xl font-bold text-primary">{stats.learningExercises}</div>
            <div className="text-xs text-muted-foreground">Learning</div>
          </div>
          <div className="stats-pill px-4 py-3 text-center">
            <div className="text-2xl font-bold text-green-600">{stats.reviewExercises}</div>
            <div className="text-xs text-muted-foreground">Mastered</div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="backdrop-blur-md bg-white/70 border border-white/40 rounded-2xl p-4">
          <div className="flex justify-between text-sm text-muted-foreground mb-2">
            <span>{stats.exercisesInDeck} / {stats.totalExercises} exercises in deck</span>
            <span>{stats.newExercises} new</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-accent rounded-full transition-all duration-500"
              style={{ width: `${stats.totalExercises > 0 ? (stats.reviewExercises / stats.totalExercises) * 100 : 0}%` }}
            />
          </div>
        </div>

        {/* Mode filter */}
        <div className="grid grid-cols-3 gap-2">
          {MODES.map(m => {
            const Icon = m.icon;
            const count = m.value === 'all' ? stats.totalExercises : modeCounts[m.value];
            return (
              <button
                key={m.value}
                onClick={() => onFiltersChange({ ...filters, mode: m.value })}
                className={`flex flex-col items-center gap-1 px-3 py-3 rounded-xl text-xs font-medium transition-all ${
                  filters.mode === m.value
                    ? 'bg-primary text-white shadow-md'
                    : 'backdrop-blur-md bg-white/70 border border-white/40 text-muted-foreground hover:bg-white/90'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{m.label}</span>
                <span className="text-[10px] opacity-70">{count}</span>
              </button>
            );
          })}
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

        {/* Exercise count */}
        <div className="stats-pill p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Layers className="w-5 h-5 text-accent" />
            <span className="text-sm text-primary">Available Exercises</span>
          </div>
          <span className="text-lg font-bold text-accent">{stats.totalExercises}</span>
        </div>

        {/* Action buttons */}
        <div className="flex gap-3">
          <button
            onClick={onStartDrill}
            className="flex-1 px-6 py-4 bg-gradient-to-r from-accent to-[#d4b366] text-white rounded-xl font-medium text-lg hover:opacity-90 transition-all shadow-lg shadow-accent/20"
          >
            {stats.dueNow > 0 ? `Start Review (${stats.dueNow} due)` : 'Start Practice'}
          </button>
          <button
            onClick={onBrowse}
            className="flex items-center gap-2 px-6 py-4 bg-white border-2 border-primary text-primary rounded-xl font-medium hover:bg-primary/5 transition-colors"
          >
            <BookOpen className="w-5 h-5" />
            Browse
          </button>
        </div>
      </div>
    </div>
  );
}
