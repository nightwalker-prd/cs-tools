/**
 * Generates ExerciseItems for all 3 exercise types.
 */

import { SIYAGH } from '@arabtools/conjugation/src/data/siyagh';
import type { Seegah } from '@arabtools/conjugation/src/data/siyagh';
import { shuffle } from '@arabtools/core';
import type { ExerciseItem, ExerciseType, SessionConfig, ArabicWord } from '../types';
import { getConjugatedForm } from './conjugation-bridge';
import { generateDistractors } from './distractor-generator';
import { presetWordLists } from '../data/presets';

/**
 * Generate a full set of exercises for a session.
 */
export function generateExercises(config: SessionConfig): ExerciseItem[] {
  // Collect verbs from selected units
  const verbs = getVerbsFromUnits(config.unitIds);
  if (verbs.length === 0) return [];

  // Filter siyagh by selected categories
  const eligibleSiyagh = getEligibleSiyagh(config.categories);
  if (eligibleSiyagh.length === 0) return [];

  const exercises: ExerciseItem[] = [];
  const maxAttempts = config.sessionSize * 5;
  let attempts = 0;

  while (exercises.length < config.sessionSize && attempts < maxAttempts) {
    attempts++;

    // Pick random verb and seegah
    const verb = verbs[Math.floor(Math.random() * verbs.length)];
    const seegah = eligibleSiyagh[Math.floor(Math.random() * eligibleSiyagh.length)];

    // Pick random exercise type from selected types
    const type = config.exerciseTypes[Math.floor(Math.random() * config.exerciseTypes.length)];

    const exercise = createExercise(verb, seegah, type, config, verbs, eligibleSiyagh);
    if (exercise) {
      // Avoid exact duplicates
      const isDuplicate = exercises.some(e =>
        e.verb.root === exercise.verb.root &&
        e.seegah.number === exercise.seegah.number &&
        e.type === exercise.type
      );
      if (!isDuplicate) {
        exercises.push(exercise);
      }
    }
  }

  return shuffle(exercises);
}

function getVerbsFromUnits(unitIds: string[]): ArabicWord[] {
  const verbs: ArabicWord[] = [];
  for (const unitId of unitIds) {
    const preset = presetWordLists.find(p => p.id === unitId);
    if (preset) {
      verbs.push(...preset.words);
    }
  }
  return verbs;
}

function getEligibleSiyagh(categories: string[]): Seegah[] {
  if (categories.length === 0) return [...SIYAGH];
  return SIYAGH.filter(s => categories.includes(s.category));
}

function createExercise(
  verb: ArabicWord,
  seegah: Seegah,
  type: ExerciseType,
  config: SessionConfig,
  allVerbs: ArabicWord[],
  allSiyagh: Seegah[],
): ExerciseItem | null {
  const conjugatedForm = getConjugatedForm(verb, seegah.number);
  if (!conjugatedForm) return null;

  const id = `${type}:${verb.root}:${verb.verbForm || 'I'}:${seegah.number}`;

  switch (type) {
    case 'conjugation':
      return createConjugationExercise(id, verb, seegah, conjugatedForm, config, allVerbs, allSiyagh);
    case 'translation':
      return createTranslationExercise(id, verb, seegah, conjugatedForm, config, allVerbs);
    case 'labeling':
      return createLabelingExercise(id, verb, seegah, conjugatedForm, config, allSiyagh);
    default:
      return null;
  }
}

function createConjugationExercise(
  id: string,
  verb: ArabicWord,
  seegah: Seegah,
  correctAnswer: string,
  config: SessionConfig,
  allVerbs: ArabicWord[],
  allSiyagh: Seegah[],
): ExerciseItem {
  const distractors = config.answerMode === 'mc'
    ? generateDistractors('conjugation', verb, seegah, correctAnswer, allVerbs, allSiyagh)
    : undefined;

  return {
    id,
    type: 'conjugation',
    verb,
    seegah,
    correctAnswer,
    prompt: {
      primary: `${verb.pastTense} / ${verb.presentTense}`,
      root: verb.root,
      meaning: verb.meaning || '',
      seegahLabel: seegah.label,
      seegahEn: seegah.labelEn,
    },
    distractors,
  };
}

function createTranslationExercise(
  id: string,
  verb: ArabicWord,
  seegah: Seegah,
  conjugatedForm: string,
  config: SessionConfig,
  allVerbs: ArabicWord[],
): ExerciseItem {
  const direction = config.translationDirection;

  if (direction === 'ar-to-en') {
    // Show Arabic form → answer is English meaning
    const distractors = config.answerMode === 'mc'
      ? generateDistractors('translation-ar-en', verb, seegah, verb.meaning || '', allVerbs, [])
      : undefined;

    return {
      id,
      type: 'translation',
      verb,
      seegah,
      correctAnswer: verb.meaning || '',
      prompt: {
        primary: conjugatedForm,
        root: verb.root,
        meaning: '',
        seegahLabel: seegah.label,
        seegahEn: seegah.labelEn,
        direction: 'ar-to-en',
      },
      distractors,
    };
  } else {
    // Show English meaning → answer is conjugated Arabic form
    const distractors = config.answerMode === 'mc'
      ? generateDistractors('translation-en-ar', verb, seegah, conjugatedForm, allVerbs, [])
      : undefined;

    return {
      id,
      type: 'translation',
      verb,
      seegah,
      correctAnswer: conjugatedForm,
      prompt: {
        primary: verb.meaning || '',
        root: verb.root,
        meaning: verb.meaning || '',
        seegahLabel: seegah.label,
        seegahEn: seegah.labelEn,
        direction: 'en-to-ar',
      },
      distractors,
    };
  }
}

function createLabelingExercise(
  id: string,
  verb: ArabicWord,
  seegah: Seegah,
  conjugatedForm: string,
  config: SessionConfig,
  allSiyagh: Seegah[],
): ExerciseItem {
  const distractors = config.answerMode === 'mc'
    ? generateDistractors('labeling', verb, seegah, seegah.label, [], allSiyagh)
    : undefined;

  return {
    id,
    type: 'labeling',
    verb,
    seegah,
    correctAnswer: seegah.label,
    prompt: {
      primary: conjugatedForm,
      root: verb.root,
      meaning: verb.meaning || '',
      seegahLabel: '',
      seegahEn: '',
    },
    distractors,
  };
}
