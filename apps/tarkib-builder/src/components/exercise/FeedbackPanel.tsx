import { Check, Volume2, ArrowRight } from 'lucide-react';
import { useSpeechSynthesis, removeDiacritics } from '@arabtools/core';
import type { TarkibExercise } from '../../data/types';
import { PHRASE_TYPE_LABELS } from '../../data/types';
import { formatTime } from '../../utils/validation';

interface FeedbackPanelProps {
  exercise: TarkibExercise;
  score: number;
  attempts: number;
  timeSpent: number;
  showDiacritics: boolean;
  wasRevealed: boolean;
  onNext: () => void;
}

const DING_LABELS = [
  { key: 'D', label: 'التعريف', labelEn: 'Definiteness' },
  { key: 'I', label: 'الإعراب', labelEn: "I'rab" },
  { key: 'N', label: 'العدد', labelEn: 'Number' },
  { key: 'G', label: 'الجنس', labelEn: 'Gender' },
] as const;

export function FeedbackPanel({ exercise, score, attempts, timeSpent, showDiacritics, wasRevealed, onNext }: FeedbackPanelProps) {
  const { speak, isSupported } = useSpeechSynthesis({ lang: 'ar-SA', rate: 0.8 });
  const phraseLabel = PHRASE_TYPE_LABELS[exercise.phraseType];

  const displayWord = (text: string) =>
    showDiacritics ? text : removeDiacritics(text);

  // Check DING agreement for the correct answer
  const dingResults = (() => {
    if (exercise.agreementType !== 'ding' || exercise.slots.length < 2) return null;
    const w1 = exercise.wordBank.find(w => w.id === exercise.slots[0].expectedWordId);
    const w2 = exercise.wordBank.find(w => w.id === exercise.slots[1].expectedWordId);
    if (!w1 || !w2) return null;
    return {
      D: w1.definiteness === w2.definiteness,
      I: w1.case === w2.case,
      N: w1.number === w2.number,
      G: w1.gender === w2.gender,
    };
  })();

  return (
    <div className="backdrop-blur-md bg-green-50/80 border border-green-200 rounded-3xl p-6 shadow-xl animate-fade-in-up" aria-live="polite">
      {/* Success header */}
      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center flex-shrink-0">
          <Check className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-green-800">
            {wasRevealed ? 'Answer Revealed' : 'Correct!'}
          </h3>
          <p className="text-sm text-green-600">
            {phraseLabel.en} — <span className="font-arabic" dir="rtl">{phraseLabel.ar}</span>
          </p>
        </div>
      </div>

      {/* Tarkib notation */}
      <div className="bg-white/70 rounded-2xl p-5 mb-5">
        <div className="flex items-center justify-center gap-8" dir="rtl">
          {exercise.slots.map((slot, i) => {
            const word = exercise.wordBank.find(w => w.id === slot.expectedWordId);
            return (
              <div key={slot.id} className="text-center">
                <div className="text-3xl font-arabic text-primary mb-2 leading-relaxed">
                  {word ? displayWord(word.word) : ''}
                </div>
                <div className="h-0.5 w-full rounded-full mb-1" style={{ backgroundColor: slot.color }} />
                <span className="text-sm font-arabic font-bold" style={{ color: slot.color }} dir="rtl">
                  {slot.label}
                </span>
                <span className="text-xs text-muted-foreground block">{slot.labelEn}</span>
                {i < exercise.slots.length - 1 && (
                  <span className="sr-only">+</span>
                )}
              </div>
            );
          })}
        </div>

        {/* DING agreement badges */}
        {dingResults && (
          <div className="flex items-center justify-center gap-3 mt-4">
            {DING_LABELS.map(({ key, labelEn }) => {
              const match = dingResults[key as keyof typeof dingResults];
              return (
                <div key={key} className="flex flex-col items-center gap-1">
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white ${
                      match ? 'bg-green-500' : 'bg-red-500'
                    }`}
                  >
                    {key}
                  </div>
                  <span className="text-[10px] text-muted-foreground">{labelEn}</span>
                </div>
              );
            })}
          </div>
        )}

        {isSupported && (
          <button
            onClick={() => speak(exercise.targetPhrase)}
            className="mt-4 mx-auto flex items-center gap-2 px-4 py-2 rounded-xl bg-accent/10 hover:bg-accent/20 text-accent transition-colors"
          >
            <Volume2 className="w-4 h-4" />
            <span className="text-sm">Listen</span>
          </button>
        )}
      </div>

      {/* Explanation */}
      <div className="bg-white/50 rounded-2xl p-4 mb-5 space-y-2">
        <p className="text-sm text-primary">{exercise.explanation}</p>
        <p className="text-sm font-arabic text-primary" dir="rtl">
          {displayWord(exercise.explanationAr)}
        </p>
      </div>

      {/* Stats */}
      <div className="flex items-center justify-center gap-4 mb-5">
        <div className="stats-pill px-4 py-2 text-center">
          <div className="text-lg font-bold text-primary">{score}</div>
          <div className="text-xs text-muted-foreground">Score</div>
        </div>
        <div className="stats-pill px-4 py-2 text-center">
          <div className="text-lg font-bold text-primary">{attempts}</div>
          <div className="text-xs text-muted-foreground">{attempts === 1 ? 'Attempt' : 'Attempts'}</div>
        </div>
        <div className="stats-pill px-4 py-2 text-center">
          <div className="text-lg font-bold text-primary">{formatTime(timeSpent)}</div>
          <div className="text-xs text-muted-foreground">Time</div>
        </div>
      </div>

      {/* Next button */}
      <button
        onClick={onNext}
        className="w-full px-6 py-3 bg-gradient-to-r from-accent to-[#d4b366] text-white rounded-xl font-medium hover:opacity-90 transition-all flex items-center justify-center gap-2"
      >
        Next Exercise
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
}
