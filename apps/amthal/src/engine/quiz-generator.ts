import { shuffle, pickRandomN } from '@arabtools/core';
import type { Proverb, QuizMode, QuizQuestion } from '../types';

function splitProverbInHalf(arabic: string): { first: string; second: string } {
  const words = arabic.split(/\s+/);
  const mid = Math.ceil(words.length / 2);
  return {
    first: words.slice(0, mid).join(' '),
    second: words.slice(mid).join(' '),
  };
}

function getKeyWord(arabic: string): { word: string; blanked: string } {
  const words = arabic.split(/\s+/);
  // Pick a content word (skip first word which may be a particle, and skip very short words)
  const candidates = words
    .map((w, i) => ({ word: w, index: i }))
    .filter(({ word, index }) => index > 0 && word.length > 2);

  if (candidates.length === 0) {
    // Fallback: use last word
    const lastIdx = words.length - 1;
    const blanked = [...words];
    blanked[lastIdx] = '______';
    return { word: words[lastIdx], blanked: blanked.join(' ') };
  }

  const pick = candidates[Math.floor(Math.random() * candidates.length)];
  const blanked = [...words];
  blanked[pick.index] = '______';
  return { word: pick.word, blanked: blanked.join(' ') };
}

function generateMatchHalvesQuestion(
  target: Proverb,
  distractors: Proverb[],
  questionIndex: number
): QuizQuestion {
  const { first, second } = splitProverbInHalf(target.arabic);
  const distractorHalves = distractors.map(d => splitProverbInHalf(d.arabic).second);
  const allOptions = shuffle([second, ...distractorHalves]);
  const correctIndex = allOptions.indexOf(second);

  return {
    id: `mh-${questionIndex}`,
    mode: 'match-halves',
    prompt: `Complete this proverb:`,
    promptArabic: `${first} ...`,
    options: allOptions,
    correctIndex,
    proverbId: target.id,
  };
}

function generateGuessMeaningQuestion(
  target: Proverb,
  distractors: Proverb[],
  questionIndex: number
): QuizQuestion {
  const allOptions = shuffle([
    target.translation,
    ...distractors.map(d => d.translation),
  ]);
  const correctIndex = allOptions.indexOf(target.translation);

  return {
    id: `gm-${questionIndex}`,
    mode: 'guess-meaning',
    prompt: 'What does this proverb mean?',
    promptArabic: target.arabic,
    options: allOptions,
    correctIndex,
    proverbId: target.id,
  };
}

function generateFillBlankQuestion(
  target: Proverb,
  distractors: Proverb[],
  questionIndex: number
): QuizQuestion {
  const { word, blanked } = getKeyWord(target.arabic);

  // Get distractor words from other proverbs
  const distractorWords = distractors.map(d => {
    const words = d.arabic.split(/\s+/).filter(w => w.length > 2);
    return words[Math.floor(Math.random() * words.length)] || words[0];
  });

  const allOptions = shuffle([word, ...distractorWords]);
  const correctIndex = allOptions.indexOf(word);

  return {
    id: `fb-${questionIndex}`,
    mode: 'fill-blank',
    prompt: 'Fill in the missing word:',
    promptArabic: blanked,
    options: allOptions,
    correctIndex,
    proverbId: target.id,
  };
}

export function generateQuiz(
  mode: QuizMode,
  allProverbs: Proverb[],
  count: number = 10
): QuizQuestion[] {
  const available = shuffle(allProverbs);
  const questionCount = Math.min(count, available.length);
  const questions: QuizQuestion[] = [];

  for (let i = 0; i < questionCount; i++) {
    const target = available[i];
    const others = available.filter(p => p.id !== target.id);
    const distractors = pickRandomN(others, 3);

    switch (mode) {
      case 'match-halves':
        questions.push(generateMatchHalvesQuestion(target, distractors, i));
        break;
      case 'guess-meaning':
        questions.push(generateGuessMeaningQuestion(target, distractors, i));
        break;
      case 'fill-blank':
        questions.push(generateFillBlankQuestion(target, distractors, i));
        break;
    }
  }

  return questions;
}
