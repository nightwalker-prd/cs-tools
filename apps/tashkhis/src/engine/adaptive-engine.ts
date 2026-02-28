import { shuffle } from '@arabtools/core';
import type {
  CategoryState,
  EngineState,
  PlacementQuestion,
  QuestionPool,
  Difficulty,
} from '../types';
import { CATEGORIES } from '../data/category-map';

/**
 * Initialize engine state with all categories from the pool.
 */
export function initEngine(
  pool: QuestionPool,
  maxQuestions: number,
): EngineState {
  const categories: CategoryState[] = pool.allCategories.map(id => {
    const def = CATEGORIES.find(c => c.id === id);
    return {
      categoryId: id,
      categoryType: def?.type ?? 'nahw',
      theta: 0.5,
      questionsAsked: 0,
      questionsCorrect: 0,
      isDone: false,
      answers: [],
    };
  });

  return {
    categories,
    questionsAnswered: 0,
    maxQuestions,
    startedAt: Date.now(),
  };
}

/**
 * Select the next category to test.
 * Priority: untested categories first, then lowest-confidence ones.
 */
export function selectNextCategory(state: EngineState): CategoryState | null {
  const active = state.categories.filter(c => !c.isDone);
  if (active.length === 0) return null;

  // Untested categories first (shuffled for variety)
  const untested = active.filter(c => c.questionsAsked === 0);
  if (untested.length > 0) {
    return shuffle([...untested])[0];
  }

  // Then pick lowest-confidence category (fewest questions asked, then lowest theta)
  const sorted = [...active].sort((a, b) => {
    if (a.questionsAsked !== b.questionsAsked) return a.questionsAsked - b.questionsAsked;
    return a.theta - b.theta;
  });
  return sorted[0];
}

/**
 * Select a question from the pool for the given category.
 * Difficulty is chosen based on current theta estimate.
 */
export function selectQuestion(
  pool: QuestionPool,
  category: CategoryState,
  usedQuestionIds: Set<string>,
): PlacementQuestion | null {
  const catPool = pool.byCategoryAndDifficulty.get(category.categoryId);
  if (!catPool) return null;

  // Choose difficulty based on theta
  const targetDifficulty = thetaToDifficulty(category.theta);

  // Try target difficulty first, then adjacent ones
  const difficultyOrder: Difficulty[] = getDifficultyOrder(targetDifficulty);

  for (const diff of difficultyOrder) {
    const questions = catPool.get(diff);
    if (!questions) continue;

    const available = questions.filter(q => !usedQuestionIds.has(q.id));
    if (available.length > 0) {
      return shuffle([...available])[0];
    }
  }

  return null;
}

/**
 * Process an answer and update the category state.
 */
export function processAnswer(
  state: EngineState,
  categoryId: string,
  correct: boolean,
): EngineState {
  const newCategories = state.categories.map(cat => {
    if (cat.categoryId !== categoryId) return cat;

    const newAsked = cat.questionsAsked + 1;
    const newCorrect = cat.questionsCorrect + (correct ? 1 : 0);
    const newAnswers = [...cat.answers, correct];

    // Step size: 0.25 for 1st question, 0.15 for 2nd, 0.10 for 3rd+
    const step = newAsked === 1 ? 0.25 : newAsked === 2 ? 0.15 : 0.10;

    // Theta update with diminishing returns
    let newTheta = cat.theta;
    if (correct) {
      newTheta = cat.theta + step * (1 - cat.theta);
    } else {
      newTheta = cat.theta - step * cat.theta;
    }
    newTheta = Math.max(0, Math.min(1, newTheta));

    // Early stopping: 3+ asked AND last 2 consistent, OR 5 hard cap
    const isDone = checkEarlyStop(newAnswers, newAsked);

    return {
      ...cat,
      theta: newTheta,
      questionsAsked: newAsked,
      questionsCorrect: newCorrect,
      isDone,
      answers: newAnswers,
    };
  });

  return {
    ...state,
    categories: newCategories,
    questionsAnswered: state.questionsAnswered + 1,
  };
}

/**
 * Check if the test is complete.
 */
export function isTestComplete(state: EngineState): boolean {
  if (state.questionsAnswered >= state.maxQuestions) return true;
  return state.categories.every(c => c.isDone);
}

// ── Helpers ──

function thetaToDifficulty(theta: number): Difficulty {
  if (theta < 0.33) return 'beginner';
  if (theta < 0.66) return 'intermediate';
  return 'advanced';
}

function getDifficultyOrder(target: Difficulty): Difficulty[] {
  switch (target) {
    case 'beginner': return ['beginner', 'intermediate', 'advanced'];
    case 'intermediate': return ['intermediate', 'beginner', 'advanced'];
    case 'advanced': return ['advanced', 'intermediate', 'beginner'];
  }
}

function checkEarlyStop(answers: boolean[], asked: number): boolean {
  if (asked >= 5) return true;
  if (asked >= 3) {
    const lastTwo = answers.slice(-2);
    if (lastTwo.length === 2 && lastTwo[0] === lastTwo[1]) return true;
  }
  return false;
}
