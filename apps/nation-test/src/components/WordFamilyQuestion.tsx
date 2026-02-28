/**
 * Word Family Question Component
 *
 * Tests the ability to identify which words belong to the same
 * root family (عائلة الكلمة). Users select all words derived
 * from a given Arabic root.
 */

import { useState, useEffect } from 'react';
import { cn } from '@arabtools/ui';
import { Volume2, Check, X, Users } from 'lucide-react';
import { useSpeechSynthesis } from '@arabtools/core/hooks';
import type { WordFamilyItem } from '../data/wordFamily';

interface WordFamilyQuestionProps {
  item: WordFamilyItem;
  onAnswer: (answer: string, isCorrect: boolean) => void;
  showFeedback: boolean;
  disabled?: boolean;
}

export function WordFamilyQuestion({
  item,
  onAnswer,
  showFeedback,
  disabled = false,
}: WordFamilyQuestionProps) {
  const [selectedWords, setSelectedWords] = useState<Set<string>>(new Set());
  const [hasAnswered, setHasAnswered] = useState(false);
  const [shuffledWords, setShuffledWords] = useState(item.words);
  const { speak, isSpeaking } = useSpeechSynthesis();

  // Shuffle words when item changes
  useEffect(() => {
    const shuffled = [...item.words].sort(() => Math.random() - 0.5);
    setShuffledWords(shuffled);
    setSelectedWords(new Set());
    setHasAnswered(false);
  }, [item.id]);

  const toggleWord = (word: string) => {
    if (hasAnswered || disabled) return;

    const newSelected = new Set(selectedWords);
    if (newSelected.has(word)) {
      newSelected.delete(word);
    } else {
      newSelected.add(word);
    }
    setSelectedWords(newSelected);
  };

  const handleSubmit = () => {
    if (hasAnswered || disabled || selectedWords.size === 0) return;

    setHasAnswered(true);

    // Check if selection is correct
    const correctWords = item.words
      .filter(w => w.isFromRoot)
      .map(w => w.word);

    const selectedArray = Array.from(selectedWords);
    const allCorrectSelected = correctWords.every(w => selectedWords.has(w));
    const noIncorrectSelected = selectedArray.every(w =>
      item.words.find(iw => iw.word === w)?.isFromRoot
    );

    const isCorrect = allCorrectSelected && noIncorrectSelected;

    onAnswer(selectedArray.join(','), isCorrect);
  };

  const handleSpeak = (wordVocalized: string) => {
    speak(wordVocalized);
  };

  // Calculate score for feedback
  const correctWords = item.words.filter(w => w.isFromRoot);
  const selectedCorrect = Array.from(selectedWords).filter(w =>
    item.words.find(iw => iw.word === w)?.isFromRoot
  ).length;
  const selectedIncorrect = selectedWords.size - selectedCorrect;
  const isFullyCorrect = selectedCorrect === correctWords.length && selectedIncorrect === 0;

  return (
    <div className="space-y-6">
      {/* Root and Level Info */}
      <div className="flex items-center justify-center gap-2 flex-wrap">
        <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
          Word Family
        </span>
        <span
          className="px-3 py-1 bg-accent/10 text-accent-foreground text-sm font-arabic rounded-full"
          dir="rtl"
        >
          عائلة الكلمة
        </span>
        <span className="px-3 py-1 bg-muted text-muted-foreground text-sm rounded-full">
          {item.level.toUpperCase()}
        </span>
      </div>

      {/* Root Display */}
      <div className="text-center p-6 bg-muted/30 rounded-xl space-y-3">
        <p className="text-sm text-muted-foreground">
          Select all words derived from this root:
        </p>

        <div className="flex items-center justify-center gap-4">
          <Users className="w-8 h-8 text-primary/50" />
          <h2 className="text-5xl font-arabic text-primary" dir="rtl">
            {item.root}
          </h2>
        </div>

        <p className="text-lg text-muted-foreground">
          Core meaning: <span className="font-semibold text-primary">{item.rootMeaning}</span>
        </p>

        <p className="text-sm text-muted-foreground">
          ({item.correctCount} words belong to this family)
        </p>
      </div>

      {/* Word Selection Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {shuffledWords.map((wordItem, index) => {
          const isSelected = selectedWords.has(wordItem.word);
          const isThisCorrect = wordItem.isFromRoot;

          return (
            <button
              key={`${item.id}-${index}`}
              onClick={() => toggleWord(wordItem.word)}
              disabled={hasAnswered || disabled}
              className={cn(
                'p-4 rounded-xl border-2 text-center transition-all relative',
                'hover:border-primary/50 hover:bg-primary/5',
                !hasAnswered && 'cursor-pointer',
                hasAnswered && 'cursor-default',
                // Before answering - selected state
                !hasAnswered && isSelected && 'border-primary bg-primary/10',
                !hasAnswered && !isSelected && 'border-border',
                // After answering with feedback
                hasAnswered && showFeedback && isThisCorrect && isSelected &&
                  'border-green-500 bg-green-50',
                hasAnswered && showFeedback && isThisCorrect && !isSelected &&
                  'border-amber-500 bg-amber-50', // Missed correct answer
                hasAnswered && showFeedback && !isThisCorrect && isSelected &&
                  'border-red-500 bg-red-50', // Wrong selection
                hasAnswered && showFeedback && !isThisCorrect && !isSelected &&
                  'opacity-50'
              )}
            >
              {/* Selection indicator */}
              {!hasAnswered && isSelected && (
                <div className="absolute top-2 right-2">
                  <Check className="w-4 h-4 text-primary" />
                </div>
              )}

              {/* Feedback indicators */}
              {hasAnswered && showFeedback && (
                <div className="absolute top-2 right-2">
                  {isThisCorrect && isSelected && (
                    <Check className="w-4 h-4 text-green-600" />
                  )}
                  {isThisCorrect && !isSelected && (
                    <span className="text-xs text-amber-600 font-medium">missed</span>
                  )}
                  {!isThisCorrect && isSelected && (
                    <X className="w-4 h-4 text-red-600" />
                  )}
                </div>
              )}

              <div className="flex items-center justify-center gap-2">
                <span className="text-2xl font-arabic" dir="rtl">
                  {wordItem.wordVocalized}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSpeak(wordItem.wordVocalized);
                  }}
                  disabled={isSpeaking}
                  className="p-1 rounded-full hover:bg-primary/10 transition-colors"
                  aria-label="Listen"
                >
                  <Volume2
                    className={cn(
                      'w-4 h-4',
                      isSpeaking ? 'text-accent animate-pulse' : 'text-muted-foreground'
                    )}
                  />
                </button>
              </div>
              <p className="text-sm text-muted-foreground mt-1">{wordItem.meaning}</p>
              <p className="text-xs text-muted-foreground/70">{wordItem.partOfSpeech}</p>
            </button>
          );
        })}
      </div>

      {/* Submit Button */}
      {!hasAnswered && (
        <div className="flex justify-center">
          <button
            onClick={handleSubmit}
            disabled={selectedWords.size === 0 || disabled}
            className={cn(
              'px-8 py-3 rounded-xl font-semibold transition-all',
              selectedWords.size > 0
                ? 'bg-primary text-white hover:bg-primary/90'
                : 'bg-muted text-muted-foreground cursor-not-allowed'
            )}
          >
            Submit Selection ({selectedWords.size} selected)
          </button>
        </div>
      )}

      {/* Feedback */}
      {showFeedback && hasAnswered && (
        <div
          className={cn(
            'p-4 rounded-xl',
            isFullyCorrect ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'
          )}
        >
          {isFullyCorrect ? (
            <p className="font-semibold">Perfect! You identified all {item.correctCount} words correctly.</p>
          ) : (
            <p>
              <span className="font-semibold">
                {selectedCorrect}/{item.correctCount} correct
              </span>
              {selectedIncorrect > 0 && (
                <span>, {selectedIncorrect} incorrect selection{selectedIncorrect > 1 ? 's' : ''}</span>
              )}
            </p>
          )}
        </div>
      )}

      {/* Explanation (after answering) */}
      {hasAnswered && (
        <div className="p-4 bg-primary/5 rounded-xl border border-primary/20 space-y-4">
          {/* Root Family */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Users className="w-5 h-5 text-primary" />
              <span className="font-semibold text-primary">
                The {item.root} Family ({item.rootMeaning})
              </span>
            </div>
          </div>

          {/* Correct Words */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {item.words.filter(w => w.isFromRoot).map((wordItem, index) => (
              <div
                key={index}
                className="p-2 bg-green-50 rounded-lg border border-green-200 text-center"
              >
                <div className="font-arabic text-lg text-green-700" dir="rtl">
                  {wordItem.wordVocalized}
                </div>
                <div className="text-xs text-green-600">{wordItem.meaning}</div>
              </div>
            ))}
          </div>

          {/* Explanation */}
          <div className="pt-3 border-t border-primary/20">
            <p className="text-sm text-muted-foreground">
              <strong className="text-primary">Connection:</strong> {item.explanation}
            </p>
          </div>

          {/* Distractors explanation */}
          <div className="pt-3 border-t border-primary/20">
            <p className="text-sm text-muted-foreground mb-2">
              <strong className="text-primary">Not from this root:</strong>
            </p>
            <div className="flex flex-wrap gap-2">
              {item.words.filter(w => !w.isFromRoot).map((wordItem, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-muted rounded text-sm"
                >
                  <span className="font-arabic" dir="rtl">{wordItem.word}</span>
                  {' - '}{wordItem.meaning}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
