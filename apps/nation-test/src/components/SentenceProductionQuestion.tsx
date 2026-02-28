/**
 * Sentence Production Question Component
 *
 * Tests learners' ability to PRODUCE sentences with specific
 * grammatical structures. Based on Nation's "meaning-focused output" strand.
 *
 * Features:
 * - English prompt for what to express
 * - Key vocabulary hints
 * - Grammar structure guidance
 * - Flexible answer checking
 * - Model answer reveal
 */

import { useState, useEffect, useRef } from 'react';
import { cn } from '@arabtools/ui';
import { Volume2, Lightbulb, BookOpen, CheckCircle2, XCircle } from 'lucide-react';
import { useSpeechSynthesis } from '@arabtools/core/hooks';
import { removeDiacritics } from '@arabtools/core/utils';
import type { SentenceProductionItem } from '../data/sentenceProduction';
import { difficultyLabels, grammarFocusLabels } from '../data/sentenceProduction';

interface SentenceProductionQuestionProps {
  item: SentenceProductionItem;
  onAnswer: (answer: string, isCorrect: boolean) => void;
  showFeedback: boolean;
  disabled?: boolean;
}

export function SentenceProductionQuestion({
  item,
  onAnswer,
  showFeedback,
  disabled = false,
}: SentenceProductionQuestionProps) {
  const [inputValue, setInputValue] = useState('');
  const [hasAnswered, setHasAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showHints, setShowHints] = useState(false);
  const [showStructure, setShowStructure] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const { speak, isSpeaking } = useSpeechSynthesis();

  // Reset state when item changes
  useEffect(() => {
    setInputValue('');
    setHasAnswered(false);
    setIsCorrect(false);
    setShowHints(false);
    setShowStructure(false);
    inputRef.current?.focus();
  }, [item.id]);

  /**
   * Check if the user's answer is acceptable
   * Uses flexible matching that:
   * - Ignores diacritics
   * - Checks against model answer and alternatives
   * - Allows for minor variations
   */
  const checkAnswer = (answer: string): boolean => {
    const normalizedAnswer = removeDiacritics(answer.trim());

    // Check against model answer
    const normalizedModel = removeDiacritics(item.modelAnswer);
    if (normalizedAnswer === normalizedModel) {
      return true;
    }

    // Check against alternatives
    if (item.alternatives) {
      for (const alt of item.alternatives) {
        if (normalizedAnswer === removeDiacritics(alt)) {
          return true;
        }
      }
    }

    // Partial matching - check if key words are present
    // This is a more lenient check for production tasks
    const keyWordsPresent = item.keyWords.every((kw) =>
      normalizedAnswer.includes(removeDiacritics(kw.arabic))
    );

    // If all key words are present and answer is reasonably similar in length
    if (
      keyWordsPresent &&
      normalizedAnswer.length >= normalizedModel.length * 0.7 &&
      normalizedAnswer.length <= normalizedModel.length * 1.3
    ) {
      return true;
    }

    return false;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (hasAnswered || disabled || !inputValue.trim()) return;

    const correct = checkAnswer(inputValue);
    setIsCorrect(correct);
    setHasAnswered(true);
    onAnswer(inputValue, correct);
  };

  const handlePlayModel = () => {
    speak(item.modelAnswerVocalized);
  };

  const getDifficultyColor = () => {
    switch (item.difficulty) {
      case 'beginner':
        return 'bg-green-100 text-green-800';
      case 'intermediate':
        return 'bg-amber-100 text-amber-800';
      case 'advanced':
        return 'bg-red-100 text-red-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with difficulty and grammar focus */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        <span className={cn('px-3 py-1 text-sm font-medium rounded-full', getDifficultyColor())}>
          {difficultyLabels[item.difficulty].english}
        </span>
        <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
          {grammarFocusLabels[item.grammarFocus]}
        </span>
      </div>

      {/* English Prompt */}
      <div className="text-center p-6 bg-muted/30 rounded-xl">
        <p className="text-sm text-muted-foreground mb-2">Express this in Arabic:</p>
        <h2 className="text-2xl font-semibold text-primary">"{item.prompt}"</h2>
      </div>

      {/* Hints Section */}
      <div className="space-y-3">
        {/* Key Words Toggle */}
        <button
          onClick={() => setShowHints(!showHints)}
          className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
        >
          <Lightbulb className="w-4 h-4" />
          {showHints ? 'Hide' : 'Show'} Key Vocabulary
        </button>

        {showHints && (
          <div className="flex flex-wrap gap-2 p-4 bg-accent/10 rounded-lg">
            {item.keyWords.map((kw, i) => (
              <span
                key={i}
                className="px-3 py-1 bg-white rounded-lg border text-sm"
              >
                <span className="font-arabic" dir="rtl">
                  {kw.arabic}
                </span>
                <span className="text-muted-foreground mx-1">=</span>
                <span>{kw.english}</span>
              </span>
            ))}
          </div>
        )}

        {/* Structure Hint Toggle */}
        <button
          onClick={() => setShowStructure(!showStructure)}
          className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
        >
          <BookOpen className="w-4 h-4" />
          {showStructure ? 'Hide' : 'Show'} Structure Hint
        </button>

        {showStructure && (
          <div className="p-4 bg-muted/50 rounded-lg text-sm">
            <p className="font-mono text-muted-foreground">{item.structureHint}</p>
          </div>
        )}
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <textarea
            ref={inputRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={hasAnswered || disabled}
            dir="rtl"
            placeholder="اكتب الجملة هنا..."
            rows={3}
            className={cn(
              'w-full px-4 py-3 text-xl font-arabic text-right',
              'border-2 rounded-xl resize-none',
              'focus:outline-none focus:ring-2 focus:ring-primary/50',
              hasAnswered && isCorrect && 'border-green-500 bg-green-50',
              hasAnswered && !isCorrect && 'border-amber-500 bg-amber-50'
            )}
          />
        </div>

        {!hasAnswered && (
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={!inputValue.trim() || disabled}
              className={cn(
                'px-8 py-3 bg-primary text-white rounded-xl font-semibold',
                'hover:bg-primary/90 transition-colors',
                'disabled:opacity-50 disabled:cursor-not-allowed'
              )}
            >
              Check My Sentence
            </button>
          </div>
        )}
      </form>

      {/* Feedback */}
      {showFeedback && hasAnswered && (
        <div className="space-y-4">
          {/* Result indicator */}
          <div
            className={cn(
              'p-4 rounded-xl flex items-start gap-3',
              isCorrect ? 'bg-green-100' : 'bg-amber-100'
            )}
          >
            {isCorrect ? (
              <>
                <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-green-800">Excellent!</p>
                  <p className="text-green-700 text-sm">
                    Your sentence correctly expresses the meaning.
                  </p>
                </div>
              </>
            ) : (
              <>
                <XCircle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-amber-800">Good attempt!</p>
                  <p className="text-amber-700 text-sm">
                    Compare your sentence with the model answer below.
                  </p>
                </div>
              </>
            )}
          </div>

          {/* Model Answer */}
          <div className="p-4 bg-primary/5 rounded-xl border border-primary/20">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-medium text-primary">Model Answer:</p>
              <button
                onClick={handlePlayModel}
                disabled={isSpeaking}
                className="p-2 rounded-full hover:bg-primary/10 transition-colors"
                aria-label="Listen to model answer"
              >
                <Volume2
                  className={cn(
                    'w-5 h-5',
                    isSpeaking ? 'text-accent animate-pulse' : 'text-primary'
                  )}
                />
              </button>
            </div>

            <p className="text-2xl font-arabic text-primary mb-2" dir="rtl">
              {item.modelAnswerVocalized}
            </p>

            {/* Alternatives */}
            {item.alternatives && item.alternatives.length > 0 && (
              <div className="mt-3 pt-3 border-t border-primary/10">
                <p className="text-xs text-muted-foreground mb-2">Also acceptable:</p>
                <div className="space-y-1">
                  {item.alternatives.map((alt, i) => (
                    <p key={i} className="text-lg font-arabic text-muted-foreground" dir="rtl">
                      {alt}
                    </p>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Grammar Tip */}
          <div className="p-4 bg-muted/30 rounded-xl">
            <p className="text-sm font-medium text-primary mb-1">Grammar Tip:</p>
            <p className="text-sm text-muted-foreground">{item.grammarTip}</p>
          </div>

          {/* Your answer comparison */}
          {!isCorrect && (
            <div className="p-4 bg-white rounded-xl border">
              <p className="text-sm font-medium text-muted-foreground mb-2">Your answer:</p>
              <p className="text-lg font-arabic" dir="rtl">
                {inputValue}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
