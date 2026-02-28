/**
 * Spaced Repetition Flashcard Mode for Sarf Analysis
 * Implements SM-2 algorithm for optimal learning
 */

import { useState, useEffect, useMemo } from 'react';
import { ArrowLeft, RotateCcw, Eye, EyeOff, ChevronRight, Filter, TrendingUp, CheckCircle, XCircle } from 'lucide-react';
import { removeDiacritics } from '@arabtools/core';
import type { SarfExercise } from '../data/sarfExercises';

const SRS_STORAGE_KEY = 'arabtools-sarf-spaced-repetition';

// Spaced Repetition Data for each exercise
interface SRSCard {
  exerciseId: number;
  nextReviewDate: string; // ISO date string
  interval: number; // Days until next review
  easeFactor: number; // Difficulty multiplier (default 2.5)
  repetitions: number; // Successful review count
  lastReviewed: string | null; // ISO date string
}

interface SarfFlashcardModeProps {
  exercises: SarfExercise[];
  onBack: () => void;
}

export function SarfFlashcardMode({ exercises, onBack }: SarfFlashcardModeProps) {
  // SRS state
  const [srsData, setSrsData] = useState<{ [key: number]: SRSCard }>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(SRS_STORAGE_KEY);
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error('Failed to parse SRS data:', e);
        }
      }
    }
    return {};
  });

  // Filters
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedForm, setSelectedForm] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [showDueOnly, setShowDueOnly] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  // Flashcard state
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [hideDiacritics, setHideDiacritics] = useState(false);

  // Save SRS data to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(SRS_STORAGE_KEY, JSON.stringify(srsData));
    }
  }, [srsData]);

  // Initialize SRS data for exercises that don't have it
  useEffect(() => {
    const newSrsData = { ...srsData };
    let hasChanges = false;

    exercises.forEach(exercise => {
      if (!newSrsData[exercise.id]) {
        newSrsData[exercise.id] = {
          exerciseId: exercise.id,
          nextReviewDate: new Date().toISOString(), // Due now
          interval: 0,
          easeFactor: 2.5,
          repetitions: 0,
          lastReviewed: null
        };
        hasChanges = true;
      }
    });

    if (hasChanges) {
      setSrsData(newSrsData);
    }
  }, [exercises]);

  // Filter exercises based on criteria
  const filteredExercises = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return exercises.filter(ex => {
      // Category filter
      if (selectedCategory !== 'all' && ex.category !== selectedCategory) return false;

      // Form filter
      if (selectedForm !== 'all' && ex.verbForm !== selectedForm) return false;

      // Difficulty filter
      if (selectedDifficulty !== 'all' && ex.difficulty !== selectedDifficulty) return false;

      // Due date filter
      if (showDueOnly) {
        const card = srsData[ex.id];
        if (card) {
          const nextReview = new Date(card.nextReviewDate);
          nextReview.setHours(0, 0, 0, 0);
          if (nextReview > today) return false;
        }
      }

      return true;
    });
  }, [exercises, selectedCategory, selectedForm, selectedDifficulty, showDueOnly, srsData]);

  // Current card
  const currentExercise = filteredExercises[currentCardIndex] || null;
  const currentSrsCard = currentExercise ? srsData[currentExercise.id] : null;

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Only handle shortcuts when we have a current card
      if (!currentExercise) return;

      // Space or Enter to flip card
      if ((e.code === 'Space' || e.code === 'Enter') && !isFlipped) {
        e.preventDefault();
        setIsFlipped(true);
        return;
      }

      // Rating shortcuts (only when flipped)
      if (isFlipped) {
        switch (e.key) {
          case '1':
            e.preventDefault();
            handleRate(0); // Again
            break;
          case '2':
            e.preventDefault();
            handleRate(3); // Hard
            break;
          case '3':
            e.preventDefault();
            handleRate(4); // Good
            break;
          case '4':
            e.preventDefault();
            handleRate(5); // Easy
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentExercise, isFlipped, currentCardIndex, filteredExercises.length]);

  // removeDiacritics imported from @arabtools/core

  /**
   * SM-2 Algorithm: Calculate next review date based on performance
   */
  const calculateNextReview = (quality: number, card: SRSCard): SRSCard => {
    let { interval, easeFactor, repetitions } = card;

    if (quality >= 3) {
      // Correct response - increase interval
      if (repetitions === 0) {
        interval = 1; // First review: 1 day
      } else if (repetitions === 1) {
        interval = 6; // Second review: 6 days
      } else {
        // Subsequent reviews: multiply by ease factor
        interval = Math.round(interval * easeFactor);
      }
      repetitions += 1;
    } else {
      // Incorrect response - reset to beginning
      repetitions = 0;
      interval = 1;
    }

    // Adjust ease factor based on quality of recall
    easeFactor = easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
    if (easeFactor < 1.3) easeFactor = 1.3; // Minimum ease factor

    const nextReviewDate = new Date();
    nextReviewDate.setDate(nextReviewDate.getDate() + interval);

    return {
      exerciseId: card.exerciseId,
      nextReviewDate: nextReviewDate.toISOString(),
      interval,
      easeFactor,
      repetitions,
      lastReviewed: new Date().toISOString()
    };
  };

  // Handle rating
  const handleRate = (quality: number) => {
    if (!currentExercise || !currentSrsCard) return;

    const updatedCard = calculateNextReview(quality, currentSrsCard);
    setSrsData(prev => ({
      ...prev,
      [currentExercise.id]: updatedCard
    }));

    // Move to next card
    setIsFlipped(false);
    if (currentCardIndex < filteredExercises.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
    } else {
      setCurrentCardIndex(0);
    }
  };

  // Get stats
  const stats = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let dueCount = 0;
    let learnedCount = 0;
    let totalCards = 0;

    exercises.forEach(ex => {
      const card = srsData[ex.id];
      if (card) {
        totalCards++;
        const nextReview = new Date(card.nextReviewDate);
        nextReview.setHours(0, 0, 0, 0);
        if (nextReview <= today) dueCount++;
        if (card.repetitions > 0) learnedCount++;
      }
    });

    return { dueCount, learnedCount, totalCards };
  }, [exercises, srsData]);

  // Get unique categories and forms
  const categories = Array.from(new Set(exercises.map(ex => ex.category)));
  const verbForms = Array.from(new Set(exercises.filter(ex => ex.verbForm).map(ex => ex.verbForm!))).sort();

  if (!currentExercise) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#f8f6f3] via-white to-[#faf8f5] p-4 md:p-8 flex flex-col items-center justify-center">
        <div className="max-w-4xl w-full">
          <button
            onClick={onBack}
            className="group flex items-center gap-2 text-primary hover:text-accent transition-colors mb-6"
          >
            <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
            Back to Sarf Tool
          </button>

          <div className="backdrop-blur-md bg-white/80 border border-white/40 rounded-3xl p-8 shadow-xl text-center">
            <p className="text-xl text-muted-foreground mb-4">
              No cards match your current filters.
            </p>
            <p className="text-muted-foreground">
              Try adjusting your filters or disable "Due Only" to see all cards.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8f6f3] via-white to-[#faf8f5] p-4 md:p-8 flex flex-col items-center justify-center">
      <div className="max-w-4xl w-full">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={onBack}
            className="group flex items-center gap-2 text-primary hover:text-accent transition-colors mb-6"
          >
            <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
            Back to Sarf Tool
          </button>

          <div className="backdrop-blur-md bg-white/80 border border-white/40 rounded-3xl p-8 shadow-xl">
            <h1 className="text-primary text-3xl mb-2">Flashcard Mode</h1>
            <p className="text-xl mb-4 font-arabic" dir="rtl">
              وضع البطاقات التعليمية
            </p>
            <p className="text-muted-foreground max-w-2xl">
              Learn Sarf using spaced repetition - the scientifically proven method for long-term retention.
            </p>

            {/* Stats */}
            <div className="mt-6 flex flex-wrap gap-4">
              <div className="px-4 py-2 rounded-full bg-accent/10 border border-accent/20">
                <span className="text-sm text-accent">{stats.dueCount} due today</span>
              </div>
              <div className="px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20">
                <span className="text-sm text-green-700">{stats.learnedCount} learned</span>
              </div>
              <div className="px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
                <span className="text-sm text-primary">{stats.totalCards} total cards</span>
              </div>
            </div>

            {/* Quick Guide */}
            <div className="mt-6 pt-6 border-t border-accent/20">
              <p className="text-sm text-muted-foreground mb-2">
                <strong className="text-primary">How it works:</strong> Study the Arabic word, try to recall its meaning and analysis,
                then flip the card to check. Rate your recall honestly - the system will automatically schedule the next review.
              </p>
              <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                <span className="px-2 py-1 rounded bg-red-50 text-red-700">Again = forgot completely</span>
                <span className="px-2 py-1 rounded bg-yellow-50 text-yellow-700">Hard = struggled to remember</span>
                <span className="px-2 py-1 rounded bg-green-50 text-green-700">Good = recalled with effort</span>
                <span className="px-2 py-1 rounded bg-blue-50 text-blue-700">Easy = instant recall</span>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="backdrop-blur-md bg-white/80 border border-white/40 rounded-3xl p-6 shadow-xl mb-8">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="w-full flex items-center justify-between group cursor-pointer -m-2 p-2 rounded-xl hover:bg-accent/5 transition-all duration-300 active:scale-[0.99]"
          >
            <h3 className="text-primary flex items-center gap-2 transition-colors duration-300 group-hover:text-accent">
              <Filter className="w-5 h-5 text-accent transition-transform duration-300 group-hover:scale-110" />
              Filter Cards
            </h3>
            <span className="text-sm text-muted-foreground">
              {filteredExercises.length} cards
            </span>
          </button>

          {showFilters && (
            <div className="mt-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Category Filter */}
                <div>
                  <label className="block text-sm text-accent mb-2">Category</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => {
                      setSelectedCategory(e.target.value);
                      setCurrentCardIndex(0);
                    }}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all"
                  >
                    <option value="all">All Categories</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat.replace('-', ' ')}</option>
                    ))}
                  </select>
                </div>

                {/* Verb Form Filter */}
                <div>
                  <label className="block text-sm text-accent mb-2">Verb Form</label>
                  <select
                    value={selectedForm}
                    onChange={(e) => {
                      setSelectedForm(e.target.value);
                      setCurrentCardIndex(0);
                    }}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all"
                  >
                    <option value="all">All Forms</option>
                    {verbForms.map(form => (
                      <option key={form} value={form}>Form {form}</option>
                    ))}
                  </select>
                </div>

                {/* Difficulty Filter */}
                <div>
                  <label className="block text-sm text-accent mb-2">Difficulty</label>
                  <select
                    value={selectedDifficulty}
                    onChange={(e) => {
                      setSelectedDifficulty(e.target.value);
                      setCurrentCardIndex(0);
                    }}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all"
                  >
                    <option value="all">All Levels</option>
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>

                {/* Due Only Toggle */}
                <div>
                  <label className="block text-sm text-accent mb-2">Review Status</label>
                  <button
                    onClick={() => {
                      setShowDueOnly(!showDueOnly);
                      setCurrentCardIndex(0);
                    }}
                    className={`w-full px-4 py-2 rounded-lg border transition-all ${
                      showDueOnly
                        ? 'bg-accent text-white border-accent'
                        : 'bg-white text-primary border-gray-300 hover:border-accent'
                    }`}
                  >
                    {showDueOnly ? 'Due Only' : 'All Cards'}
                  </button>
                </div>
              </div>

              {/* Reset Progress */}
              <div className="pt-4 border-t border-accent/20">
                <button
                  onClick={() => {
                    if (window.confirm('Are you sure you want to reset all flashcard progress?')) {
                      setSrsData({});
                      localStorage.removeItem(SRS_STORAGE_KEY);
                      setCurrentCardIndex(0);
                    }
                  }}
                  className="w-full px-4 py-2 rounded-lg border border-red-300 bg-red-50 text-red-700 hover:bg-red-100 transition-all text-sm flex items-center justify-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  Reset All Progress
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Progress */}
        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Card {currentCardIndex + 1} of {filteredExercises.length}
          </p>
          {currentSrsCard && (
            <p className="text-sm text-accent">
              {currentSrsCard.repetitions > 0
                ? `Reviewed ${currentSrsCard.repetitions} times`
                : 'New card'
              }
            </p>
          )}
        </div>

        {/* Flashcard */}
        <div className="mb-8">
          <div
            className="backdrop-blur-md bg-white/80 border border-white/40 rounded-3xl p-12 shadow-xl min-h-[400px] flex flex-col justify-center cursor-pointer transition-all duration-300 hover:shadow-2xl"
            onClick={() => setIsFlipped(!isFlipped)}
          >
            {!isFlipped ? (
              // Front of card - Arabic word
              <div className="text-center">
                <p className="text-sm text-accent mb-4">
                  Click or press <kbd className="px-2 py-1 rounded bg-accent/10 border border-accent/20 text-xs">Space</kbd> to reveal answer
                </p>
                <p className="text-6xl leading-loose text-primary mb-4 font-arabic" dir="rtl">
                  {hideDiacritics ? removeDiacritics(currentExercise.word) : currentExercise.word}
                </p>
                <p className="text-xl text-muted-foreground italic">{currentExercise.transliteration}</p>

                <div className="mt-8 flex justify-center gap-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setHideDiacritics(!hideDiacritics);
                    }}
                    className="px-6 py-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-all duration-300 text-sm flex items-center gap-2 active:scale-95"
                  >
                    {hideDiacritics ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    {hideDiacritics ? 'Show Tashkeel' : 'Hide Tashkeel'}
                  </button>
                </div>
              </div>
            ) : (
              // Back of card - Full analysis
              <div className="space-y-6">
                <div className="text-center">
                  <p className="text-4xl leading-loose text-primary mb-2 font-arabic" dir="rtl">
                    {currentExercise.word}
                  </p>
                  <p className="text-lg text-muted-foreground italic mb-4">{currentExercise.transliteration}</p>
                  <p className="text-xl text-primary">{currentExercise.meaning}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-6 border-t border-accent/20">
                  <div>
                    <p className="text-sm text-accent mb-1">Root (جذر)</p>
                    <p className="text-2xl text-primary font-arabic" dir="rtl">
                      {currentExercise.root}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-accent mb-1">Pattern (وزن)</p>
                    <p className="text-2xl text-primary font-arabic" dir="rtl">
                      {currentExercise.pattern}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-accent mb-1">Category</p>
                    <p className="text-primary capitalize">{currentExercise.category.replace('-', ' ')}</p>
                  </div>

                  {currentExercise.verbForm && (
                    <div>
                      <p className="text-sm text-accent mb-1">Verb Form</p>
                      <p className="text-primary">Form {currentExercise.verbForm}</p>
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-accent/20">
                  <p className="text-sm text-accent mb-1">Example</p>
                  <p className="text-lg mb-1 font-arabic" dir="rtl">
                    {currentExercise.exampleSentence}
                  </p>
                  <p className="text-sm text-muted-foreground italic">{currentExercise.exampleTranslation}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Rating Buttons - Only show when flipped */}
        {isFlipped && (
          <div className="backdrop-blur-md bg-white/80 border border-white/40 rounded-3xl p-6 shadow-xl">
            <p className="text-center text-sm text-muted-foreground mb-4">
              How well did you know this? (or press <kbd className="px-2 py-1 rounded bg-accent/10 border border-accent/20 text-xs">1-4</kbd>)
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <button
                onClick={() => handleRate(0)}
                className="px-6 py-4 rounded-lg bg-red-100 text-red-700 hover:bg-red-200 transition-all duration-300 active:scale-95 flex flex-col items-center gap-2 relative"
              >
                <kbd className="absolute top-2 right-2 px-2 py-1 rounded bg-red-200/50 text-xs">1</kbd>
                <XCircle className="w-5 h-5" />
                <span className="text-sm">Again</span>
                <span className="text-xs text-red-600">{'<1 day'}</span>
              </button>

              <button
                onClick={() => handleRate(3)}
                className="px-6 py-4 rounded-lg bg-yellow-100 text-yellow-700 hover:bg-yellow-200 transition-all duration-300 active:scale-95 flex flex-col items-center gap-2 relative"
              >
                <kbd className="absolute top-2 right-2 px-2 py-1 rounded bg-yellow-200/50 text-xs">2</kbd>
                <span className="text-sm">Hard</span>
                <span className="text-xs text-yellow-600">1 day</span>
              </button>

              <button
                onClick={() => handleRate(4)}
                className="px-6 py-4 rounded-lg bg-green-100 text-green-700 hover:bg-green-200 transition-all duration-300 active:scale-95 flex flex-col items-center gap-2 relative"
              >
                <kbd className="absolute top-2 right-2 px-2 py-1 rounded bg-green-200/50 text-xs">3</kbd>
                <CheckCircle className="w-5 h-5" />
                <span className="text-sm">Good</span>
                <span className="text-xs text-green-600">
                  {currentSrsCard && currentSrsCard.repetitions > 0
                    ? `${Math.round(currentSrsCard.interval * currentSrsCard.easeFactor)} days`
                    : '6 days'
                  }
                </span>
              </button>

              <button
                onClick={() => handleRate(5)}
                className="px-6 py-4 rounded-lg bg-blue-100 text-blue-700 hover:bg-blue-200 transition-all duration-300 active:scale-95 flex flex-col items-center gap-2 relative"
              >
                <kbd className="absolute top-2 right-2 px-2 py-1 rounded bg-blue-200/50 text-xs">4</kbd>
                <TrendingUp className="w-5 h-5" />
                <span className="text-sm">Easy</span>
                <span className="text-xs text-blue-600">
                  {currentSrsCard && currentSrsCard.repetitions > 0
                    ? `${Math.round(currentSrsCard.interval * currentSrsCard.easeFactor * 1.3)} days`
                    : '8 days'
                  }
                </span>
              </button>
            </div>
          </div>
        )}

        {/* Navigation - Only show when not flipped */}
        {!isFlipped && (
          <div className="flex justify-center gap-4">
            <button
              onClick={() => {
                setIsFlipped(false);
                setCurrentCardIndex(Math.max(0, currentCardIndex - 1));
              }}
              disabled={currentCardIndex === 0}
              className="px-6 py-3 rounded-lg bg-white/80 text-primary hover:bg-accent/10 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed border border-white/40 shadow-lg"
            >
              Previous
            </button>
            <button
              onClick={() => {
                setIsFlipped(false);
                setCurrentCardIndex(Math.min(filteredExercises.length - 1, currentCardIndex + 1));
              }}
              disabled={currentCardIndex === filteredExercises.length - 1}
              className="px-6 py-3 rounded-lg bg-accent text-white hover:bg-accent/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg flex items-center gap-2"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
