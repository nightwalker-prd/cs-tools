import { CheckCircle2, XCircle } from 'lucide-react';
import type { ComprehensionQuestion as QuestionType } from '../types';

interface ComprehensionQuestionProps {
  question: QuestionType;
  questionIndex: number;
  selectedAnswer: number | undefined;
  onAnswer: (questionIndex: number, choiceIndex: number) => void;
}

export function ComprehensionQuestion({
  question,
  questionIndex,
  selectedAnswer,
  onAnswer,
}: ComprehensionQuestionProps) {
  const hasAnswered = selectedAnswer !== undefined;
  const isCorrect = selectedAnswer === question.correctIndex;

  return (
    <div className="bg-white rounded-xl border border-parchment-dark/10 p-4">
      <p
        className="font-arabic text-lg mb-1 text-right"
        dir="rtl"
      >
        {question.questionAr}
      </p>
      <p className="text-sm text-parchment-dark mb-3">
        {question.questionEn}
      </p>
      <div className="space-y-2">
        {question.options.map((option, i) => {
          let style = 'border-parchment-dark/20 hover:border-lapis/40';
          if (hasAnswered) {
            if (i === question.correctIndex) {
              style = 'border-green-500 bg-green-50';
            } else if (i === selectedAnswer && !isCorrect) {
              style = 'border-red-400 bg-red-50';
            } else {
              style = 'border-parchment-dark/10 opacity-50';
            }
          }

          return (
            <button
              key={i}
              onClick={() => !hasAnswered && onAnswer(questionIndex, i)}
              disabled={hasAnswered}
              className={`w-full text-right px-4 py-2.5 rounded-lg border transition-colors flex items-center justify-between ${style}`}
              dir="rtl"
            >
              <span className="font-arabic text-base">{option}</span>
              {hasAnswered && i === question.correctIndex && (
                <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
              )}
              {hasAnswered &&
                i === selectedAnswer &&
                !isCorrect &&
                i !== question.correctIndex && (
                  <XCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
