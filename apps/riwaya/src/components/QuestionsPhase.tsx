import { ComprehensionQuestion } from './ComprehensionQuestion';
import type { ComprehensionQuestion as QuestionType } from '../types';

interface QuestionsPhaseProps {
  questions: QuestionType[];
  answers: Record<number, number>;
  onAnswer: (questionIndex: number, choiceIndex: number) => void;
  onFinish: () => void;
}

export function QuestionsPhase({
  questions,
  answers,
  onAnswer,
  onFinish,
}: QuestionsPhaseProps) {
  const allAnswered = questions.every((_, i) => answers[i] !== undefined);
  const correctCount = questions.filter(
    (q, i) => answers[i] === q.correctIndex,
  ).length;

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-serif text-lapis text-center">
        Comprehension Questions
      </h3>
      <div className="space-y-3">
        {questions.map((q, i) => (
          <ComprehensionQuestion
            key={i}
            question={q}
            questionIndex={i}
            selectedAnswer={answers[i]}
            onAnswer={onAnswer}
          />
        ))}
      </div>

      {allAnswered && (
        <div className="text-center space-y-3 pt-2">
          <p className="text-sm text-parchment-dark">
            You got{' '}
            <span className="font-bold text-lapis">
              {correctCount}/{questions.length}
            </span>{' '}
            correct
          </p>
          <button
            onClick={onFinish}
            className="px-6 py-2.5 bg-gold text-white rounded-lg font-medium hover:bg-gold/90 transition-colors"
          >
            Continue to Recap
          </button>
        </div>
      )}
    </div>
  );
}
