/**
 * Reading Comprehension Question Component
 *
 * Displays a passage with multiple questions of various formats:
 * - Multiple choice
 * - True/False
 * - Short answer
 *
 * All questions shown together, user submits all answers at once.
 */

import { useState, useEffect } from 'react';
import { cn } from '@arabtools/ui';
import { Volume2, BookOpen, CheckCircle2, XCircle, Eye, EyeOff } from 'lucide-react';
import { useSpeechSynthesis } from '@arabtools/core/hooks';
import type {
  ReadingComprehensionItem,
  ComprehensionQuestion,
} from '../data/readingComprehension';
import {
  topicLabels,
  isShortAnswerCorrect,
} from '../data/readingComprehension';

interface ReadingComprehensionQuestionProps {
  item: ReadingComprehensionItem;
  onAnswer: (answer: string, isCorrect: boolean) => void;
  showFeedback: boolean;
  disabled?: boolean;
}

interface QuestionAnswer {
  questionId: string;
  answer: string;
  isCorrect: boolean;
}

export function ReadingComprehensionQuestion({
  item,
  onAnswer,
  showFeedback,
  disabled = false,
}: ReadingComprehensionQuestionProps) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [questionResults, setQuestionResults] = useState<QuestionAnswer[]>([]);
  const [showTranslation, setShowTranslation] = useState(false);
  const { speak, isSpeaking } = useSpeechSynthesis();

  // Reset state when item changes
  useEffect(() => {
    setAnswers({});
    setHasSubmitted(false);
    setQuestionResults([]);
    setShowTranslation(false);
  }, [item.id]);

  const handleSpeak = () => {
    speak(item.passageVocalized);
  };

  const handleAnswerChange = (questionId: string, answer: string) => {
    if (hasSubmitted || disabled) return;
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const checkAnswer = (question: ComprehensionQuestion, userAnswer: string): boolean => {
    if (question.format === 'multiple_choice' || question.format === 'true_false') {
      return userAnswer === question.correctAnswer;
    }
    // Short answer - use lenient matching
    return isShortAnswerCorrect(userAnswer, question.correctAnswer, question.acceptableAnswers);
  };

  const handleSubmit = () => {
    if (hasSubmitted || disabled) return;

    // Check all answers
    const results: QuestionAnswer[] = item.questions.map(q => {
      const userAnswer = answers[q.id] || '';
      const isCorrect = checkAnswer(q, userAnswer);
      return {
        questionId: q.id,
        answer: userAnswer,
        isCorrect,
      };
    });

    setQuestionResults(results);
    setHasSubmitted(true);

    // Calculate overall score for this passage
    const correctCount = results.filter(r => r.isCorrect).length;
    const totalQuestions = item.questions.length;
    const overallCorrect = correctCount === totalQuestions;

    // Report to parent with passage-level result
    // We report the percentage as a string for consistency with other question types
    const scorePercentage = totalQuestions > 0
      ? Math.round((correctCount / totalQuestions) * 100)
      : 0;
    onAnswer(`${correctCount}/${totalQuestions} (${scorePercentage}%)`, overallCorrect);
  };

  const allQuestionsAnswered = item.questions.every(q => answers[q.id]?.trim());

  const getQuestionResult = (questionId: string) => {
    return questionResults.find(r => r.questionId === questionId);
  };

  const renderQuestionOptions = (question: ComprehensionQuestion) => {
    const result = getQuestionResult(question.id);
    const userAnswer = answers[question.id] || '';

    if (question.format === 'multiple_choice') {
      const options = [question.correctAnswer, ...(question.distractors || [])];
      // Shuffle options (but keep consistent for same question)
      const shuffledOptions = [...options].sort((a, b) => {
        const hashA = a.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        const hashB = b.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        return hashA - hashB;
      });

      return (
        <div className="space-y-2">
          {shuffledOptions.map((option, optIndex) => {
            const isSelected = userAnswer === option;
            const isCorrectOption = option === question.correctAnswer;

            return (
              <button
                key={optIndex}
                onClick={() => handleAnswerChange(question.id, option)}
                disabled={hasSubmitted || disabled}
                className={cn(
                  'w-full p-3 rounded-lg border-2 text-left transition-all flex items-center gap-3',
                  !hasSubmitted && 'hover:border-primary/50 hover:bg-primary/5',
                  !hasSubmitted && isSelected && 'border-primary bg-primary/10',
                  hasSubmitted && showFeedback && isCorrectOption && 'border-green-500 bg-green-50',
                  hasSubmitted && showFeedback && isSelected && !isCorrectOption && 'border-red-500 bg-red-50',
                  hasSubmitted && !isSelected && !isCorrectOption && 'opacity-50'
                )}
              >
                <span
                  className={cn(
                    'w-7 h-7 rounded-full flex items-center justify-center text-sm font-semibold border-2 flex-shrink-0',
                    hasSubmitted && showFeedback && isCorrectOption
                      ? 'border-green-500 bg-green-100 text-green-700'
                      : hasSubmitted && showFeedback && isSelected && !isCorrectOption
                        ? 'border-red-500 bg-red-100 text-red-700'
                        : isSelected
                          ? 'border-primary bg-primary/10 text-primary'
                          : 'border-muted-foreground/30 text-muted-foreground'
                  )}
                >
                  {String.fromCharCode(65 + optIndex)}
                </span>
                <span className="text-sm">{option}</span>
              </button>
            );
          })}
        </div>
      );
    }

    if (question.format === 'true_false') {
      return (
        <div className="flex gap-3">
          {['True', 'False'].map(option => {
            const isSelected = userAnswer === option;
            const isCorrectOption = option === question.correctAnswer;

            return (
              <button
                key={option}
                onClick={() => handleAnswerChange(question.id, option)}
                disabled={hasSubmitted || disabled}
                className={cn(
                  'flex-1 p-3 rounded-lg border-2 transition-all font-medium',
                  !hasSubmitted && 'hover:border-primary/50 hover:bg-primary/5',
                  !hasSubmitted && isSelected && 'border-primary bg-primary/10',
                  hasSubmitted && showFeedback && isCorrectOption && 'border-green-500 bg-green-50 text-green-700',
                  hasSubmitted && showFeedback && isSelected && !isCorrectOption && 'border-red-500 bg-red-50 text-red-700',
                  hasSubmitted && !isSelected && !isCorrectOption && 'opacity-50'
                )}
              >
                {option}
              </button>
            );
          })}
        </div>
      );
    }

    // Short answer
    return (
      <div>
        <input
          type="text"
          value={userAnswer}
          onChange={(e) => handleAnswerChange(question.id, e.target.value)}
          disabled={hasSubmitted || disabled}
          placeholder="Type your answer..."
          className={cn(
            'w-full p-3 rounded-lg border-2 transition-all',
            'focus:outline-none focus:ring-2 focus:ring-primary/20',
            !hasSubmitted && 'border-border',
            hasSubmitted && showFeedback && result?.isCorrect && 'border-green-500 bg-green-50',
            hasSubmitted && showFeedback && !result?.isCorrect && 'border-red-500 bg-red-50'
          )}
        />
        {hasSubmitted && showFeedback && !result?.isCorrect && (
          <p className="mt-2 text-sm text-muted-foreground">
            Correct answer: <strong>{question.correctAnswer}</strong>
          </p>
        )}
      </div>
    );
  };

  const correctCount = questionResults.filter(r => r.isCorrect).length;
  const totalQuestions = item.questions.length;

  return (
    <div className="space-y-6">
      {/* Topic and Level Badges */}
      <div className="flex items-center justify-center gap-2 flex-wrap">
        <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
          {topicLabels[item.topic].english}
        </span>
        <span
          className="px-3 py-1 bg-accent/10 text-accent-foreground text-sm font-arabic rounded-full"
          dir="rtl"
        >
          {topicLabels[item.topic].arabic}
        </span>
        <span className="px-3 py-1 bg-muted text-muted-foreground text-sm font-medium rounded-full">
          {item.level.toUpperCase()} Level
        </span>
      </div>

      {/* Title */}
      <div className="text-center">
        <h2 className="text-xl font-semibold text-primary mb-1">{item.title}</h2>
        <p className="text-lg font-arabic text-primary/80" dir="rtl">{item.titleArabic}</p>
      </div>

      {/* Passage */}
      <div className="bg-muted/30 rounded-xl p-4 md:p-6">
        <div className="flex items-start justify-between gap-3 mb-4">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            Passage
          </h3>
          <button
            onClick={handleSpeak}
            disabled={isSpeaking}
            className="p-2 rounded-full hover:bg-primary/10 transition-colors flex-shrink-0"
            aria-label="Listen to passage"
          >
            <Volume2
              className={cn(
                'w-5 h-5',
                isSpeaking ? 'text-accent animate-pulse' : 'text-primary'
              )}
            />
          </button>
        </div>

        <div
          className="text-xl md:text-2xl font-arabic leading-loose text-primary"
          dir="rtl"
        >
          {item.passageVocalized}
        </div>

        {/* Translation Toggle (shown after submit or when feedback enabled) */}
        {(hasSubmitted || showFeedback) && (
          <div className="mt-4 pt-4 border-t border-border">
            <button
              onClick={() => setShowTranslation(!showTranslation)}
              className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
            >
              {showTranslation ? (
                <>
                  <EyeOff className="w-4 h-4" />
                  Hide Translation
                </>
              ) : (
                <>
                  <Eye className="w-4 h-4" />
                  Show Translation
                </>
              )}
            </button>
            {showTranslation && (
              <p className="mt-3 text-muted-foreground italic">
                {item.passageTranslation}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Key Vocabulary (optional, shown after submit) */}
      {hasSubmitted && item.keyVocabulary && item.keyVocabulary.length > 0 && (
        <div className="p-4 bg-accent/5 rounded-lg">
          <h4 className="text-sm font-semibold text-muted-foreground mb-2">Key Vocabulary</h4>
          <div className="flex flex-wrap gap-2">
            {item.keyVocabulary.map((vocab, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-white rounded-full text-sm border"
              >
                <span className="font-arabic" dir="rtl">{vocab.arabic}</span>
                <span className="mx-2 text-muted-foreground">-</span>
                <span>{vocab.english}</span>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Questions Section */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-primary">Questions</h3>

        {item.questions.map((question, index) => {
          const result = getQuestionResult(question.id);

          return (
            <div
              key={question.id}
              className={cn(
                'p-4 rounded-xl border-2 transition-all',
                hasSubmitted && showFeedback && result?.isCorrect && 'border-green-200 bg-green-50/50',
                hasSubmitted && showFeedback && !result?.isCorrect && 'border-red-200 bg-red-50/50',
                !hasSubmitted && 'border-border'
              )}
            >
              <div className="flex items-start gap-3 mb-3">
                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-primary/10 text-primary text-sm font-semibold flex-shrink-0">
                  {index + 1}
                </span>
                <div className="flex-1">
                  <p className="font-medium">{question.questionText}</p>
                  {question.questionTextArabic && (
                    <p className="text-sm font-arabic text-muted-foreground mt-1" dir="rtl">
                      {question.questionTextArabic}
                    </p>
                  )}
                </div>
                {hasSubmitted && showFeedback && (
                  <div className="flex-shrink-0">
                    {result?.isCorrect ? (
                      <CheckCircle2 className="w-6 h-6 text-green-500" />
                    ) : (
                      <XCircle className="w-6 h-6 text-red-500" />
                    )}
                  </div>
                )}
              </div>

              <div className="ml-10">
                {renderQuestionOptions(question)}
              </div>
            </div>
          );
        })}
      </div>

      {/* Submit Button */}
      {!hasSubmitted && (
        <div className="flex justify-center">
          <button
            onClick={handleSubmit}
            disabled={!allQuestionsAnswered || disabled}
            className={cn(
              'px-8 py-3 rounded-xl font-semibold transition-all',
              'bg-primary text-white',
              'hover:bg-primary/90',
              'disabled:opacity-50 disabled:cursor-not-allowed'
            )}
          >
            Submit All Answers
          </button>
        </div>
      )}

      {/* Results Summary (shown after submit with feedback) */}
      {hasSubmitted && showFeedback && (
        <div
          className={cn(
            'p-4 rounded-xl text-center',
            correctCount === totalQuestions
              ? 'bg-green-100 text-green-800'
              : correctCount >= totalQuestions / 2
                ? 'bg-amber-100 text-amber-800'
                : 'bg-red-100 text-red-800'
          )}
        >
          <p className="text-lg font-semibold">
            {correctCount === totalQuestions
              ? 'Perfect! All answers correct!'
              : `You got ${correctCount} out of ${totalQuestions} correct (${totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0}%)`}
          </p>
        </div>
      )}
    </div>
  );
}
