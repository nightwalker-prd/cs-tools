import type { ExerciseItem, AnswerMode } from '../types';
import { MultipleChoiceOptions } from './MultipleChoiceOptions';
import { TextInputAnswer } from './TextInputAnswer';

interface LabelingExerciseProps {
  exercise: ExerciseItem;
  answerMode: AnswerMode;
  onAnswer: (answer: string) => void;
  disabled: boolean;
  revealedAnswer?: string;
  revealedResult?: { isCorrect: boolean };
}

export function LabelingExercise({
  exercise,
  answerMode,
  onAnswer,
  disabled,
  revealedAnswer,
  revealedResult,
}: LabelingExerciseProps) {
  return (
    <div className="animate-fade-in-up">
      <div className="exercise-type-badge">تسمية Labeling</div>

      <div className="exercise-prompt">
        <div className="exercise-primary-text large font-arabic" dir="rtl">
          {exercise.prompt.primary}
        </div>
        <div className="verb-info">
          <span className="root">{exercise.prompt.root}</span>
          <span className="meaning">{exercise.prompt.meaning}</span>
        </div>
        <p className="exercise-instruction">
          What is the seegah (form label) of this conjugation?
        </p>
      </div>

      {answerMode === 'mc' && exercise.distractors ? (
        <MultipleChoiceOptions
          correctAnswer={exercise.correctAnswer}
          distractors={exercise.distractors}
          isArabic={true}
          onAnswer={onAnswer}
          disabled={disabled}
          revealedAnswer={revealedAnswer}
        />
      ) : (
        <TextInputAnswer
          isArabic={true}
          onAnswer={onAnswer}
          disabled={disabled}
          revealedResult={revealedResult}
        />
      )}
    </div>
  );
}
