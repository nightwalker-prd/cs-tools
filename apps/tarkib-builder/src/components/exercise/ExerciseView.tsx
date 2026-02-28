import { useState } from 'react';
import { ArrowLeft, Lightbulb, RotateCcw, Settings, SkipForward, Eye, Clock } from 'lucide-react';
import { removeDiacritics } from '@arabtools/core';
import type { TarkibExercise } from '../../data/types';
import { PHRASE_TYPE_LABELS } from '../../data/types';
import { useTarkibExercise } from '../../hooks/useTarkibExercise';
import { calculateScore, formatTime } from '../../utils/validation';
import { ConstructionWorkspace } from './ConstructionWorkspace';
import { WordBank } from './WordBank';
import { FeedbackPanel } from './FeedbackPanel';

interface ExerciseViewProps {
  exercise: TarkibExercise;
  exerciseIndex: number;
  totalExercises: number;
  onComplete: (exerciseId: string, score: number) => void;
  onNext: () => void;
  onSkip: () => void;
  onBack: () => void;
}

export function ExerciseView({
  exercise,
  exerciseIndex,
  totalExercises,
  onComplete,
  onNext,
  onSkip,
  onBack,
}: ExerciseViewProps) {
  const {
    placement,
    selectedWordId,
    slotResults,
    mistakeCount,
    hintsUsed,
    isComplete,
    showAnswer,
    elapsedTime,
    usedWordIds,
    canCheck,
    selectWord,
    placeInSlot,
    dropInSlot,
    checkAnswer,
    useHint,
    revealAnswer,
    reset,
  } = useTarkibExercise(exercise);

  const [showDiacritics, setShowDiacritics] = useState(true);
  const [showSettings, setShowSettings] = useState(false);

  const phraseLabel = PHRASE_TYPE_LABELS[exercise.phraseType];
  const hasHint = exercise.hint || exercise.hintAr;
  const isChecked = slotResults !== null;
  const score = isComplete
    ? (showAnswer ? 0 : calculateScore(slotResults!, mistakeCount, hintsUsed, elapsedTime))
    : 0;

  const handleCheck = () => {
    const results = checkAnswer();
    const allCorrect = results.every(r => r.isCorrect);
    if (allCorrect) {
      const finalScore = showAnswer
        ? 0
        : calculateScore(results, mistakeCount, hintsUsed, elapsedTime);
      onComplete(exercise.id, finalScore);
    }
  };

  const handleNext = () => {
    onNext();
  };

  const stripDiacritics = (text: string) =>
    showDiacritics ? text : removeDiacritics(text);

  return (
    <div className="animate-fade-in-up space-y-5">
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
          <div className="text-center flex items-center gap-3">
            <span className="text-xs text-muted-foreground">
              {phraseLabel.en}
            </span>
            <span className="text-xs text-muted-foreground">·</span>
            <span className="text-xs text-muted-foreground">
              {exerciseIndex + 1} / {totalExercises}
            </span>
            <span className="text-xs text-muted-foreground">·</span>
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {formatTime(elapsedTime)}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <div className="relative">
              <button
                onClick={() => setShowSettings(prev => !prev)}
                className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                aria-label="Settings"
              >
                <Settings className="w-4 h-4 text-muted-foreground" />
              </button>
              {showSettings && (
                <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-xl shadow-lg border border-gray-200 p-3 z-10">
                  <label className="flex items-center justify-between cursor-pointer">
                    <span className="text-xs text-primary">Show diacritics</span>
                    <input
                      type="checkbox"
                      checked={showDiacritics}
                      onChange={e => setShowDiacritics(e.target.checked)}
                      className="rounded accent-accent"
                    />
                  </label>
                </div>
              )}
            </div>
            <button
              onClick={reset}
              className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Reset exercise"
            >
              <RotateCcw className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>
        </div>

        {/* Progress bar */}
        <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden mt-3">
          <div
            className="h-full bg-accent rounded-full transition-all duration-500"
            style={{ width: `${((exerciseIndex + 1) / totalExercises) * 100}%` }}
          />
        </div>
      </div>

      {/* Translation prompt */}
      <div className="text-center py-2">
        <p className="text-lg text-primary font-serif">
          &ldquo;{exercise.targetTranslation}&rdquo;
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          Build the Arabic phrase for this translation
        </p>
      </div>

      {/* Construction workspace */}
      <ConstructionWorkspace
        slots={exercise.slots}
        placement={placement}
        wordBank={exercise.wordBank}
        slotResults={slotResults}
        isChecked={isChecked}
        showDiacritics={showDiacritics}
        onSlotTap={placeInSlot}
        onSlotDrop={dropInSlot}
      />

      {/* Feedback panel (when complete) */}
      {isComplete && (
        <FeedbackPanel
          exercise={exercise}
          score={score}
          attempts={mistakeCount + 1}
          timeSpent={elapsedTime}
          showDiacritics={showDiacritics}
          wasRevealed={showAnswer}
          onNext={handleNext}
        />
      )}

      {/* Word bank (hide when complete) */}
      {!isComplete && (
        <WordBank
          words={exercise.wordBank}
          selectedWordId={selectedWordId}
          usedWordIds={usedWordIds}
          isChecked={isChecked}
          showDiacritics={showDiacritics}
          onSelect={selectWord}
        />
      )}

      {/* Action buttons */}
      {!isComplete && (
        <div className="flex items-center justify-between gap-3">
          {/* Left side: Hint + Skip */}
          <div className="flex items-center gap-2">
            {hasHint && !hintsUsed ? (
              <button
                onClick={useHint}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 border-amber-300 bg-amber-50 text-amber-700 hover:bg-amber-100 transition-colors text-sm"
              >
                <Lightbulb className="w-4 h-4" />
                Hint
              </button>
            ) : (
              <div />
            )}
            <button
              onClick={onSkip}
              className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-muted-foreground hover:text-primary hover:bg-gray-100 transition-colors text-sm"
            >
              <SkipForward className="w-4 h-4" />
              Skip
            </button>
          </div>

          {/* Right side: Show Answer + Check */}
          <div className="flex items-center gap-2">
            {mistakeCount >= 3 && (
              <button
                onClick={revealAnswer}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border-2 border-blue-300 bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors text-sm"
              >
                <Eye className="w-4 h-4" />
                Show Answer
              </button>
            )}
            <button
              onClick={handleCheck}
              disabled={!canCheck}
              className="px-8 py-3 bg-gradient-to-r from-accent to-[#d4b366] text-white rounded-xl font-medium hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-lg shadow-accent/20"
            >
              Check Answer
            </button>
          </div>
        </div>
      )}

      {/* Hint display */}
      {hintsUsed && hasHint && !isComplete && (
        <div className="bg-amber-50/80 border border-amber-200 rounded-2xl p-4 animate-fade-in-up">
          <div className="flex items-start gap-2">
            <Lightbulb className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
            <div className="space-y-1">
              {exercise.hint && <p className="text-sm text-amber-800">{exercise.hint}</p>}
              {exercise.hintAr && (
                <p className="text-sm font-arabic text-amber-800" dir="rtl">
                  {stripDiacritics(exercise.hintAr)}
                </p>
              )}
            </div>
          </div>
          <p className="text-xs text-amber-600 mt-2">-25 points for using hint</p>
        </div>
      )}

      {/* Error feedback (when checked but not all correct) */}
      {isChecked && !isComplete && (
        <div className="bg-red-50/80 border border-red-200 rounded-2xl p-4 animate-fade-in-up text-center" aria-live="polite">
          <p className="text-sm text-red-700">
            Some slots are incorrect. Tap a red slot to remove the word, then try again.
          </p>
          {mistakeCount >= 2 && (
            <p className="text-xs text-red-500 mt-1">
              Hint: look at the slot labels and think about what type of word goes in each
            </p>
          )}
        </div>
      )}
    </div>
  );
}
