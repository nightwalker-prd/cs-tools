import { useState, useCallback, useRef } from 'react';
import { isPrimarilyArabic, shuffle } from '@arabtools/core';
import { Volume2, ChevronLeft, ChevronRight } from 'lucide-react';
import type { Exercise } from '../../types';
import type { useProgress } from '../../hooks/useProgress';
import type { useAudio } from '../../hooks/useAudio';

interface FlashcardState {
  currentIndex: number;
  flipped: boolean;
  cards: { origIdx: number; status: 'unseen' | 'known' | 'learning' }[];
  reviewMode: boolean;
}

interface FlashcardModeProps {
  exercise: Exercise;
  progress: ReturnType<typeof useProgress>;
  audio: ReturnType<typeof useAudio>;
}

export function FlashcardMode({ exercise, progress, audio }: FlashcardModeProps) {
  const [state, setState] = useState<FlashcardState>(() => ({
    currentIndex: 0,
    flipped: false,
    cards: exercise.questions.map((_, i) => ({ origIdx: i, status: 'unseen' })),
    reviewMode: false,
  }));

  // Touch support
  const touchStartRef = useRef<number>(0);

  const currentCard = state.cards[state.currentIndex];
  const currentQ = currentCard ? exercise.questions[currentCard.origIdx] : null;
  const totalCards = state.cards.length;

  const flip = useCallback(() => {
    setState(prev => ({ ...prev, flipped: !prev.flipped }));
  }, []);

  const goNext = useCallback(() => {
    setState(prev => {
      if (prev.currentIndex >= prev.cards.length - 1) return prev;
      return { ...prev, currentIndex: prev.currentIndex + 1, flipped: false };
    });
  }, []);

  const goPrev = useCallback(() => {
    setState(prev => {
      if (prev.currentIndex <= 0) return prev;
      return { ...prev, currentIndex: prev.currentIndex - 1, flipped: false };
    });
  }, []);

  const markCard = useCallback((status: 'known' | 'learning') => {
    setState(prev => {
      const newCards = [...prev.cards];
      newCards[prev.currentIndex] = { ...newCards[prev.currentIndex], status };

      if (status === 'known') {
        const q = exercise.questions[newCards[prev.currentIndex].origIdx];
        progress.markQuestionMastered(q.id);
      }

      // Auto advance
      const nextIndex = prev.currentIndex < newCards.length - 1
        ? prev.currentIndex + 1
        : prev.currentIndex;

      // Check if all done
      const allDone = newCards.every(c => c.status !== 'unseen');
      if (allDone) {
        const knownCount = newCards.filter(c => c.status === 'known').length;
        const score = Math.round((knownCount / newCards.length) * 100);
        progress.markExerciseCompleted(exercise.id, score);
        progress.updateStreak();
      }

      return {
        ...prev,
        cards: newCards,
        currentIndex: nextIndex,
        flipped: false,
      };
    });
  }, [exercise, progress]);

  const shuffleCards = useCallback(() => {
    setState(prev => ({
      ...prev,
      currentIndex: 0,
      flipped: false,
      cards: shuffle(prev.cards),
    }));
  }, []);

  const reviewStillLearning = useCallback(() => {
    setState(prev => {
      const learningCards = prev.cards
        .filter(c => c.status === 'learning')
        .map(c => ({ ...c, status: 'unseen' as const }));
      if (learningCards.length === 0) return prev;
      return {
        currentIndex: 0,
        flipped: false,
        cards: learningCards,
        reviewMode: true,
      };
    });
  }, []);

  const resetCards = useCallback(() => {
    setState({
      currentIndex: 0,
      flipped: false,
      cards: exercise.questions.map((_, i) => ({ origIdx: i, status: 'unseen' })),
      reviewMode: false,
    });
  }, [exercise.questions]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartRef.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    const delta = e.changedTouches[0].clientX - touchStartRef.current;
    if (Math.abs(delta) > 50) {
      if (delta > 0) goPrev();
      else goNext();
    }
  };

  const knownCount = state.cards.filter(c => c.status === 'known').length;
  const learningCount = state.cards.filter(c => c.status === 'learning').length;
  const allReviewed = state.cards.every(c => c.status !== 'unseen');

  if (!currentQ) return null;

  const qIsArabic = isPrimarilyArabic(currentQ.question);
  const aIsArabic = isPrimarilyArabic(currentQ.answer);

  return (
    <div className="flashcard-container">
      {/* Flashcard */}
      <div
        className={`flashcard ${state.flipped ? 'flipped' : ''}`}
        onClick={flip}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div className="flashcard-inner">
          <div className="flashcard-front">
            <div className="flashcard-label">Question</div>
            <div className={`flashcard-text ${qIsArabic ? '' : 'ltr'}`} dir={qIsArabic ? 'rtl' : 'ltr'}>
              {currentQ.question}
            </div>
            {qIsArabic && audio.isSupported && (
              <button
                className={`audio-btn mt-4 ${audio.isSpeaking ? 'speaking' : ''}`}
                onClick={e => { e.stopPropagation(); audio.speak(currentQ.question); }}
              >
                <Volume2 size={14} />
              </button>
            )}
            <div className="flashcard-hint">Click or press Space to flip</div>
          </div>
          <div className="flashcard-back">
            <div className="flashcard-label">Answer</div>
            <div className={`flashcard-text ${aIsArabic ? '' : 'ltr'}`} dir={aIsArabic ? 'rtl' : 'ltr'}>
              {currentQ.answer}
            </div>
            {aIsArabic && audio.isSupported && (
              <button
                className={`audio-btn mt-4 ${audio.isSpeaking ? 'speaking' : ''}`}
                onClick={e => { e.stopPropagation(); audio.speak(currentQ.answer); }}
              >
                <Volume2 size={14} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flashcard-nav">
        <button className="btn" onClick={goPrev} disabled={state.currentIndex === 0}>
          <ChevronLeft size={18} />
        </button>
        <span className="flashcard-counter">
          {state.currentIndex + 1} / {totalCards}
        </span>
        <button className="btn" onClick={goNext} disabled={state.currentIndex >= totalCards - 1}>
          <ChevronRight size={18} />
        </button>
      </div>

      {/* Actions */}
      <div className="flashcard-actions">
        <button className="btn-gold" onClick={() => markCard('known')}>
          Know It!
        </button>
        <button className="btn btn-learning" onClick={() => markCard('learning')}>
          Still Learning
        </button>
      </div>

      {/* Summary when all reviewed */}
      {allReviewed && (
        <div className="glass-card text-center mb-4 p-4 rounded animate-fade-in">
          <div className="text-lg mb-2">Session Complete</div>
          <div className="flex justify-center gap-6 mb-4">
            <div>
              <span className="text-success text-xl font-bold">{knownCount}</span>
              <div className="text-xs text-muted-foreground font-sans">Known</div>
            </div>
            <div>
              <span className="text-primary text-xl font-bold">{learningCount}</span>
              <div className="text-xs text-muted-foreground font-sans">Learning</div>
            </div>
          </div>
        </div>
      )}

      {/* Toolbar */}
      <div className="flashcard-toolbar">
        <button className="btn" onClick={shuffleCards}>Shuffle</button>
        {learningCount > 0 && (
          <button className="btn" onClick={reviewStillLearning}>
            Review Learning ({learningCount})
          </button>
        )}
        <button className="btn" onClick={resetCards}>Reset</button>
      </div>
    </div>
  );
}
