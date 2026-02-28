import { ArrowLeft, Volume2 } from 'lucide-react';
import { useSpeechSynthesis } from '@arabtools/core/hooks';
import type { ResponseQuality } from '@arabtools/srs/types';
import type { DrillState } from '../hooks/useInshaDrill';
import { CompletionView } from './modes/CompletionView';
import { TransformationView } from './modes/TransformationView';
import { TranslationView } from './modes/TranslationView';
import { AssemblyView } from './modes/AssemblyView';
import { ParagraphTranslationView } from './modes/ParagraphTranslationView';

interface ExerciseViewProps {
  drillState: DrillState;
  showGrammarNotes: boolean;
  onStudentAnswerChange: (answer: string) => void;
  onSelectedOptionChange: (option: string) => void;
  onArrangedSentencesChange: (order: number[]) => void;
  onPlacedConnectorsChange: (connectors: Record<number, string>) => void;
  onSubmit: () => void;
  onRate: (quality: ResponseQuality) => void;
  onBack: () => void;
}

const RATING_BUTTONS: { quality: ResponseQuality; label: string; labelAr: string; color: string; desc: string }[] = [
  { quality: 0, label: 'Again', labelAr: 'مرة أخرى', color: 'bg-red-500 hover:bg-red-600', desc: 'Complete blank' },
  { quality: 1, label: 'Hard', labelAr: 'صعب', color: 'bg-orange-500 hover:bg-orange-600', desc: 'Major errors' },
  { quality: 2, label: 'Good', labelAr: 'جيد', color: 'bg-blue-500 hover:bg-blue-600', desc: 'Minor errors' },
  { quality: 3, label: 'Easy', labelAr: 'سهل', color: 'bg-green-500 hover:bg-green-600', desc: 'Perfect recall' },
];

const MODE_LABELS: Record<string, string> = {
  'sentence-completion': 'Completion',
  'sentence-transformation': 'Transformation',
  'sentence-translation': 'Translation',
  'paragraph-assembly': 'Assembly',
  'paragraph-translation': 'Para. Translation',
};

export function ExerciseView({
  drillState,
  showGrammarNotes,
  onStudentAnswerChange,
  onSelectedOptionChange,
  onArrangedSentencesChange,
  onPlacedConnectorsChange,
  onSubmit,
  onRate,
  onBack,
}: ExerciseViewProps) {
  const { speak } = useSpeechSynthesis();

  if (!drillState.currentExercise) return null;

  const exercise = drillState.currentExercise;
  const progress = drillState.totalExercises > 0
    ? (drillState.exercisesReviewed / drillState.totalExercises) * 100
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-amber-50 p-4 md:p-8">
      <div className="max-w-2xl mx-auto space-y-5 animate-fade-in-up">
        {/* Header with progress */}
        <div className="backdrop-blur-md bg-white/70 border border-white/40 rounded-3xl p-4 shadow-lg">
          <div className="flex items-center justify-between">
            <button
              onClick={onBack}
              className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
            <div className="text-center flex items-center gap-3">
              <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-primary/10 text-primary">
                {MODE_LABELS[exercise.mode]}
              </span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                exercise.difficulty === 'beginner' ? 'bg-green-100 text-green-700' :
                exercise.difficulty === 'intermediate' ? 'bg-blue-100 text-blue-700' :
                'bg-purple-100 text-purple-700'
              }`}>
                {exercise.difficulty}
              </span>
              <span className="text-xs text-muted-foreground">
                {drillState.exercisesReviewed + 1}/{drillState.totalExercises}
              </span>
            </div>
            <div className="w-16" />
          </div>

          {/* Progress bar */}
          <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden mt-3">
            <div
              className="h-full bg-accent rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Nahw topic tags */}
        {exercise.nahwTopics.length > 0 && (
          <div className="flex items-center justify-center gap-2 flex-wrap">
            {exercise.nahwTopics.slice(0, 3).map(topic => (
              <span key={topic} className="px-2 py-0.5 rounded-full text-xs bg-accent/10 text-accent-foreground">
                {topic.replace(/-/g, ' ')}
              </span>
            ))}
          </div>
        )}

        {/* Mode-specific prompt/interaction area */}
        {drillState.phase === 'prompt' && (
          <>
            {exercise.mode === 'sentence-completion' && (
              <CompletionView
                exercise={exercise}
                selectedOption={drillState.selectedOption}
                onSelectOption={onSelectedOptionChange}
              />
            )}
            {exercise.mode === 'sentence-transformation' && (
              <TransformationView
                exercise={exercise}
                studentAnswer={drillState.studentAnswer}
                onAnswerChange={onStudentAnswerChange}
              />
            )}
            {exercise.mode === 'sentence-translation' && (
              <TranslationView
                exercise={exercise}
                studentAnswer={drillState.studentAnswer}
                onAnswerChange={onStudentAnswerChange}
              />
            )}
            {exercise.mode === 'paragraph-assembly' && (
              <AssemblyView
                exercise={exercise}
                arrangedSentences={drillState.arrangedSentences}
                placedConnectors={drillState.placedConnectors}
                onArrange={onArrangedSentencesChange}
                onPlaceConnectors={onPlacedConnectorsChange}
              />
            )}
            {exercise.mode === 'paragraph-translation' && (
              <ParagraphTranslationView
                exercise={exercise}
                studentAnswer={drillState.studentAnswer}
                onAnswerChange={onStudentAnswerChange}
              />
            )}

            {/* Submit button */}
            <button
              onClick={onSubmit}
              disabled={
                (exercise.mode === 'sentence-completion' && !drillState.selectedOption) ||
                ((exercise.mode === 'sentence-transformation' || exercise.mode === 'sentence-translation' || exercise.mode === 'paragraph-translation') && !drillState.studentAnswer.trim())
              }
              className="w-full px-6 py-4 bg-gradient-to-r from-accent to-[#d4b366] text-white rounded-xl font-medium text-lg hover:opacity-90 transition-all shadow-lg shadow-accent/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Check Answer
            </button>
          </>
        )}

        {/* Answer reveal + rating */}
        {drillState.phase === 'answer' && (
          <div className="space-y-4 animate-fade-in-up">
            {/* Model answer card */}
            <div className="backdrop-blur-md bg-white/70 border border-accent/30 rounded-3xl p-6 shadow-md">
              <div className="text-center space-y-3">
                <p className="text-sm font-medium text-accent uppercase tracking-wide">Model Answer</p>
                <button
                  onClick={() => speak(exercise.modelAnswerClean)}
                  className="inline-flex items-center gap-2 group"
                >
                  <p
                    dir="rtl"
                    className="font-arabic text-2xl leading-relaxed text-primary group-hover:text-accent transition-colors"
                  >
                    {exercise.modelAnswer}
                  </p>
                  <Volume2 className="w-5 h-5 text-muted-foreground group-hover:text-accent transition-colors" />
                </button>
                <p className="text-sm text-muted-foreground" dir="rtl">
                  {exercise.modelAnswerClean}
                </p>
              </div>
            </div>

            {/* Student answer comparison */}
            {exercise.mode === 'sentence-completion' && drillState.selectedOption && (
              <div className="backdrop-blur-md bg-white/70 border border-white/40 rounded-2xl p-4 shadow-sm">
                <p className="text-sm text-muted-foreground mb-1">Your selection:</p>
                <p dir="rtl" className="font-arabic text-lg leading-relaxed text-primary">
                  {exercise.sentenceTemplate?.replace('___', drillState.selectedOption)}
                </p>
              </div>
            )}

            {(exercise.mode !== 'sentence-completion' && exercise.mode !== 'paragraph-assembly') && drillState.studentAnswer.trim() && (
              <div className="backdrop-blur-md bg-white/70 border border-white/40 rounded-2xl p-4 shadow-sm">
                <p className="text-sm text-muted-foreground mb-1">Your answer:</p>
                <p dir="rtl" className="font-arabic text-lg leading-relaxed text-primary">
                  {drillState.studentAnswer}
                </p>
              </div>
            )}

            {exercise.mode === 'paragraph-assembly' && exercise.sentences && (
              <div className="backdrop-blur-md bg-white/70 border border-white/40 rounded-2xl p-4 shadow-sm">
                <p className="text-sm text-muted-foreground mb-1">Your arrangement:</p>
                <p dir="rtl" className="font-arabic text-base leading-relaxed text-primary">
                  {drillState.arrangedSentences
                    .map(idx => exercise.sentences![idx]?.arabic)
                    .join('. ')}
                </p>
              </div>
            )}

            {/* Grammar notes */}
            {showGrammarNotes && (
              <div className="backdrop-blur-md bg-white/70 border border-amber-200/50 rounded-2xl p-4">
                <p className="text-sm font-medium text-primary mb-2">Grammar Notes</p>
                <p className="text-sm text-muted-foreground">{exercise.grammarNotes}</p>
                <p dir="rtl" className="font-arabic text-sm text-muted-foreground mt-2">
                  {exercise.grammarNotesAr}
                </p>
              </div>
            )}

            {/* Rating buttons */}
            <div className="space-y-2">
              <p className="text-center text-sm text-muted-foreground">
                How well did you do?
              </p>
              <div className="grid grid-cols-4 gap-2">
                {RATING_BUTTONS.map(({ quality, label, color, desc }) => (
                  <button
                    key={quality}
                    onClick={() => onRate(quality)}
                    className={`${color} text-white rounded-xl py-3 px-2 text-center transition-all active:scale-95 shadow-md`}
                  >
                    <div className="font-semibold text-sm">{label}</div>
                    <div className="text-[10px] opacity-80">{desc}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
