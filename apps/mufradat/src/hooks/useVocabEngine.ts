import { useEffect, useMemo, useCallback, useRef } from 'react';
import {
  level1k,
  level2k,
  level3k,
  level5k,
  level10k,
} from '@arabtools/data';
import type { WordFamily, FrequencyLevel } from '@arabtools/data';
import type { Difficulty, SrsItem } from '@arabtools/srs';
import { useSrsEngine } from '@arabtools/srs';
import type { BandStatsMap, MufradatSessionConfig, SessionResultData } from '../types';

const ALL_WORDS: WordFamily[] = [
  ...level1k,
  ...level2k,
  ...level3k,
  ...level5k,
  ...level10k,
];

const WORDS_BY_ID = new Map<string, WordFamily>();
for (const word of ALL_WORDS) {
  WORDS_BY_ID.set(word.id, word);
}

const WORDS_BY_LEVEL: Record<FrequencyLevel, WordFamily[]> = {
  '1k': level1k,
  '2k': level2k,
  '3k': level3k,
  '5k': level5k,
  '10k': level10k,
};

function levelToDifficulty(level: FrequencyLevel): Difficulty {
  switch (level) {
    case '1k':
    case '2k':
      return 'beginner';
    case '3k':
    case '5k':
      return 'intermediate';
    case '10k':
      return 'advanced';
  }
}

export function useVocabEngine() {
  const engine = useSrsEngine();
  const seededRef = useRef(false);

  // Seed deck with all vocabulary items on first load
  useEffect(() => {
    if (!engine.isLoaded || seededRef.current) return;
    seededRef.current = true;

    // Check if deck already has vocab items
    const hasVocab = engine.items.some(item => item.pillar === 'vocabulary');
    if (hasVocab) return;

    // Seed all 1,824 words
    for (const word of ALL_WORDS) {
      engine.addItem(
        word.id,
        'vocabulary',
        levelToDifficulty(word.level),
        word.id,
        'vocab-word',
      );
    }
  }, [engine.isLoaded, engine.items, engine.addItem]);

  // Filter to vocabulary items only
  const vocabItems = useMemo(
    () => engine.items.filter(item => item.pillar === 'vocabulary'),
    [engine.items],
  );

  // Look up WordFamily by SRS item's contentId
  const getWordForItem = useCallback((srsItem: SrsItem): WordFamily | undefined => {
    return WORDS_BY_ID.get(srsItem.contentId);
  }, []);

  // Compute per-band statistics
  const bandStats = useMemo((): BandStatsMap => {
    const stats: BandStatsMap = {
      '1k': { total: 0, newCount: 0, learning: 0, review: 0, mastered: 0 },
      '2k': { total: 0, newCount: 0, learning: 0, review: 0, mastered: 0 },
      '3k': { total: 0, newCount: 0, learning: 0, review: 0, mastered: 0 },
      '5k': { total: 0, newCount: 0, learning: 0, review: 0, mastered: 0 },
      '10k': { total: 0, newCount: 0, learning: 0, review: 0, mastered: 0 },
    };

    for (const item of vocabItems) {
      const word = WORDS_BY_ID.get(item.contentId);
      if (!word) continue;

      const band = stats[word.level];
      band.total++;

      if (item.phase === 'new') {
        band.newCount++;
      } else if (item.phase === 'learning' || item.phase === 'relearning') {
        band.learning++;
      } else if (item.phase === 'review') {
        // Consider "mastered" if stability > 21 days (3 weeks)
        if (item.stability > 21) {
          band.mastered++;
        } else {
          band.review++;
        }
      }
    }

    return stats;
  }, [vocabItems]);

  // Start a vocab session
  const startVocabSession = useCallback((config: MufradatSessionConfig) => {
    engine.startSession({
      maxItems: config.sessionSize,
      maxNewItems: config.newWordsPerSession,
      newItemRatio: config.newWordsPerSession / config.sessionSize,
      pillars: ['vocabulary'],
      interleave: false,
    });
  }, [engine]);

  // Compute session results
  const getSessionResults = useCallback((): SessionResultData => {
    const reviews = engine.session.state.reviews;
    let againCount = 0;
    let hardCount = 0;
    let goodCount = 0;
    let easyCount = 0;

    const newItemIds = new Set<string>();

    for (const review of reviews) {
      switch (review.quality) {
        case 0: againCount++; break;
        case 1: hardCount++; break;
        case 2: goodCount++; break;
        case 3: easyCount++; break;
      }

      // Track new items (stability_before was 0 = first ever review)
      if (review.stability_before === 0) {
        newItemIds.add(review.itemId);
      }
    }

    const totalReviewed = reviews.length;
    const correct = goodCount + easyCount;

    return {
      totalReviewed,
      correct,
      accuracy: totalReviewed > 0 ? Math.round((correct / totalReviewed) * 100) : 0,
      newLearned: newItemIds.size,
      againCount,
      hardCount,
      goodCount,
      easyCount,
    };
  }, [engine.session.state.reviews]);

  return {
    ...engine,
    vocabItems,
    allWords: ALL_WORDS,
    wordsByLevel: WORDS_BY_LEVEL,
    getWordForItem,
    bandStats,
    startVocabSession,
    getSessionResults,
  };
}
