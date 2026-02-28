import type { ExerciseItem, AnswerMode } from '../types';
import { MultipleChoiceOptions } from './MultipleChoiceOptions';
import { TextInputAnswer } from './TextInputAnswer';

interface TranslationExerciseProps {
  exercise: ExerciseItem;
  answerMode: AnswerMode;
  onAnswer: (answer: string) => void;
  disabled: boolean;
  revealedAnswer?: string;
  revealedResult?: { isCorrect: boolean };
}

export function TranslationExercise({
  exercise,
  answerMode,
  onAnswer,
  disabled,
  revealedAnswer,
  revealedResult,
}: TranslationExerciseProps) {
  const isArToEn = exercise.prompt.direction === 'ar-to-en';
  const answerIsArabic = !isArToEn;

  return (
    <div className="animate-fade-in-up">
      <div className="exercise-type-badge">
        ترجمة Translation ({isArToEn ? 'AR → EN' : 'EN → AR'})
      </div>

      <div className="exercise-prompt">
        {isArToEn ? (
          <>
            <div className="exercise-primary-text font-arabic" dir="rtl">
              {exercise.prompt.primary}
            </div>
            <div className="seegah-label font-arabic" dir="rtl">
              {exercise.prompt.seegahLabel}
            </div>
            <div className="seegah-en">{exercise.prompt.seegahEn}</div>
          </>
        ) : (
          <>
            <div className="exercise-primary-text english">
              {exercise.prompt.primary}
            </div>
            <div className="seegah-label font-arabic" dir="rtl">
              {exercise.prompt.seegahLabel}
            </div>
            <div className="seegah-en">{exercise.prompt.seegahEn}</div>
            <div className="verb-info-compact">
              <span className="root">{exercise.prompt.root}</span>
            </div>
          </>
        )}
      </div>

      {answerMode === 'mc' && exercise.distractors ? (
        <MultipleChoiceOptions
          correctAnswer={exercise.correctAnswer}
          distractors={exercise.distractors}
          isArabic={answerIsArabic}
          onAnswer={onAnswer}
          disabled={disabled}
          revealedAnswer={revealedAnswer}
        />
      ) : (
        <TextInputAnswer
          isArabic={answerIsArabic}
          onAnswer={onAnswer}
          disabled={disabled}
          revealedResult={revealedResult}
        />
      )}
    </div>
  );
}
