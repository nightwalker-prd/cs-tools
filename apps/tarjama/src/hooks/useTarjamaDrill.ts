/**
 * Core drill hook — manages the translation drill flow.
 *
 * 1. Show English prompt
 * 2. Student types Arabic
 * 3. Tap "Show Answer" → model answer revealed
 * 4. Self-rate: Again(0) / Hard(1) / Good(2) / Easy(3)
 * 5. Next card
 */

import { useState, useCallback, useMemo } from 'react';
import { useSrsEngine } from '@arabtools/srs/hooks';
import type { ResponseQuality } from '@arabtools/srs/types';
import type { TranslationCard, DeckFilters } from '../data/types';
import { ALL_CARDS, getFilteredCards } from '../data/cards';

export type DrillPhase = 'prompt' | 'answer' | 'rating' | 'complete';

export interface DrillState {
  phase: DrillPhase;
  currentCard: TranslationCard | null;
  studentAnswer: string;
  cardsReviewed: number;
  totalCards: number;
  queue: TranslationCard[];
}

export function useTarjamaDrill(filters: DeckFilters) {
  const srs = useSrsEngine();

  const [drillState, setDrillState] = useState<DrillState>({
    phase: 'prompt',
    currentCard: null,
    studentAnswer: '',
    cardsReviewed: 0,
    totalCards: 0,
    queue: [],
  });

  // Ensure all cards exist in SRS deck
  const ensureCardsInDeck = useCallback(() => {
    const cards = getFilteredCards({
      difficulty: filters.difficulty,
      source: filters.source,
      nahwTopic: filters.nahwTopic,
    });

    for (const card of cards) {
      srs.addItem(
        card.id,
        'grammar',
        card.difficulty,
        card.id,
        'translation-card',
      );
    }

    return cards;
  }, [filters, srs]);

  // Build a drill queue from due cards
  const startDrill = useCallback((maxCards = 20) => {
    const cards = ensureCardsInDeck();

    // Get due SRS items
    const now = Date.now();
    const dueItemIds = new Set(
      srs.items
        .filter(item => item.contentType === 'translation-card' && item.due <= now)
        .sort((a, b) => a.due - b.due)
        .slice(0, maxCards)
        .map(item => item.contentId),
    );

    // If not enough due items, add new ones
    let queue = cards.filter(c => dueItemIds.has(c.id));

    if (queue.length < maxCards) {
      const newItems = srs.items
        .filter(item =>
          item.contentType === 'translation-card' &&
          item.phase === 'new' &&
          !dueItemIds.has(item.contentId),
        )
        .slice(0, maxCards - queue.length);

      const newCards = newItems
        .map(item => cards.find(c => c.id === item.contentId))
        .filter((c): c is TranslationCard => c !== undefined);

      queue = [...queue, ...newCards];
    }

    if (queue.length === 0) {
      setDrillState(prev => ({ ...prev, phase: 'complete', totalCards: 0 }));
      return;
    }

    setDrillState({
      phase: 'prompt',
      currentCard: queue[0],
      studentAnswer: '',
      cardsReviewed: 0,
      totalCards: queue.length,
      queue: queue.slice(1),
    });
  }, [ensureCardsInDeck, srs.items]);

  const setStudentAnswer = useCallback((answer: string) => {
    setDrillState(prev => ({ ...prev, studentAnswer: answer }));
  }, []);

  const showAnswer = useCallback(() => {
    setDrillState(prev => ({ ...prev, phase: 'answer' }));
  }, []);

  const rateCard = useCallback((quality: ResponseQuality) => {
    if (!drillState.currentCard) return;

    // Grade through SRS
    // First, start a mini-session for this card
    const cardItem = srs.items.find(
      i => i.contentId === drillState.currentCard!.id && i.contentType === 'translation-card',
    );

    if (cardItem) {
      // Directly grade without full session — use the engine's addItem + grade pattern
      srs.startSession({
        maxItems: 1,
        maxNewItems: 1,
        newItemRatio: 1,
        pillars: [],
        interleave: false,
      });
      srs.gradeCard(quality);
      srs.nextCard();
    }

    // Move to next card
    const nextQueue = drillState.queue;
    if (nextQueue.length === 0) {
      setDrillState(prev => ({
        ...prev,
        phase: 'complete',
        cardsReviewed: prev.cardsReviewed + 1,
        currentCard: null,
      }));
    } else {
      setDrillState(prev => ({
        ...prev,
        phase: 'prompt',
        currentCard: nextQueue[0],
        studentAnswer: '',
        cardsReviewed: prev.cardsReviewed + 1,
        queue: nextQueue.slice(1),
      }));
    }
  }, [drillState, srs]);

  // Dashboard stats
  const stats = useMemo(() => {
    const translationItems = srs.items.filter(i => i.contentType === 'translation-card');
    const now = Date.now();
    return {
      totalCards: ALL_CARDS.length,
      cardsInDeck: translationItems.length,
      dueNow: translationItems.filter(i => i.due <= now).length,
      newCards: translationItems.filter(i => i.phase === 'new').length,
      learningCards: translationItems.filter(i => i.phase === 'learning' || i.phase === 'relearning').length,
      reviewCards: translationItems.filter(i => i.phase === 'review').length,
    };
  }, [srs.items]);

  return {
    drillState,
    stats,
    srsEngine: srs,
    startDrill,
    setStudentAnswer,
    showAnswer,
    rateCard,
  };
}
