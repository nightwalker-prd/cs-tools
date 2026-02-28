import type { ChallengeTest, TestResult, ValidatorParams } from '../types';
import {
  containsText,
  notContainsText,
  textStartsWith,
  textEndsWith,
  checkWordCount,
  containsWord,
  wordAtPosition,
  hasDiacriticOnWord,
  matchesPattern,
  exactMatch,
} from './arabic-matchers';

type ValidatorFn = (input: string, params: ValidatorParams) => { passed: boolean; message: string };

const validators: Record<string, ValidatorFn> = {
  contains: (input, params) => {
    const target = params.text || '';
    const passed = containsText(input, target, params.ignoreHarakat);
    return {
      passed,
      message: passed
        ? `Contains "${target}"`
        : `Expected to contain "${target}"`,
    };
  },

  notContains: (input, params) => {
    const target = params.text || '';
    const passed = notContainsText(input, target, params.ignoreHarakat);
    return {
      passed,
      message: passed
        ? `Does not contain "${target}"`
        : `Should not contain "${target}"`,
    };
  },

  startsWith: (input, params) => {
    const target = params.text || '';
    const passed = textStartsWith(input, target, params.ignoreHarakat);
    return {
      passed,
      message: passed
        ? `Starts with "${target}"`
        : `Expected to start with "${target}"`,
    };
  },

  endsWith: (input, params) => {
    const target = params.text || '';
    const passed = textEndsWith(input, target, params.ignoreHarakat);
    return {
      passed,
      message: passed
        ? `Ends with "${target}"`
        : `Expected to end with "${target}"`,
    };
  },

  wordCount: (input, params) => {
    const passed = checkWordCount(input, params.min, params.max);
    const parts: string[] = [];
    if (params.min !== undefined) parts.push(`at least ${params.min}`);
    if (params.max !== undefined) parts.push(`at most ${params.max}`);
    const desc = parts.join(' and ');
    return {
      passed,
      message: passed
        ? `Word count is within range (${desc})`
        : `Expected ${desc} words`,
    };
  },

  hasDiacritic: (input, params) => {
    const word = params.word || '';
    const diacritic = params.diacritic!;
    const passed = hasDiacriticOnWord(input, word, diacritic);
    return {
      passed,
      message: passed
        ? `"${word}" has ${diacritic}`
        : `Expected "${word}" to have ${diacritic}`,
    };
  },

  exactMatch: (input, params) => {
    const validStrings = params.texts || (params.text ? [params.text] : []);
    const passed = exactMatch(input, validStrings, params.ignoreHarakat);
    return {
      passed,
      message: passed
        ? 'Exact match found'
        : 'Does not match any valid answer',
    };
  },

  pattern: (input, params) => {
    const pattern = params.pattern || '';
    const passed = matchesPattern(input, pattern);
    return {
      passed,
      message: passed
        ? 'Pattern matched'
        : `Does not match expected pattern`,
    };
  },

  containsWord: (input, params) => {
    const word = params.word || '';
    const passed = containsWord(input, word, params.ignoreHarakat);
    return {
      passed,
      message: passed
        ? `Contains word "${word}"`
        : `Expected to contain word "${word}"`,
    };
  },

  wordAtPosition: (input, params) => {
    const position = params.position ?? 0;
    const word = params.word || '';
    const passed = wordAtPosition(input, position, word, params.ignoreHarakat);
    return {
      passed,
      message: passed
        ? `Word at position ${position} matches`
        : `Expected "${word}" at position ${position}`,
    };
  },

  custom: (input, params) => {
    const fnName = params.customFn || '';
    const fn = customValidators[fnName];
    if (!fn) {
      return { passed: false, message: `Unknown custom validator: ${fnName}` };
    }
    return fn(input, params);
  },
};

const customValidators: Record<string, ValidatorFn> = {
  isNominalSentence: (input) => {
    const trimmed = input.trim();
    if (!trimmed) return { passed: false, message: 'Input is empty' };
    const firstChar = trimmed[0];
    const isNoun = /[\u0627-\u064A]/.test(firstChar);
    return {
      passed: isNoun,
      message: isNoun
        ? 'Starts with a noun (nominal sentence)'
        : 'Expected a nominal sentence (should start with a noun)',
    };
  },

  hasIdafaStructure: (input) => {
    const words = input.trim().split(/\s+/);
    if (words.length < 2) {
      return { passed: false, message: 'Idafa requires at least 2 words' };
    }
    return { passed: true, message: 'Has idafa structure' };
  },

  allWordsDefinite: (input) => {
    const words = input.trim().split(/\s+/).filter(Boolean);
    const allDef = words.every(w => w.startsWith('ال') || w.startsWith('الْ'));
    return {
      passed: allDef,
      message: allDef
        ? 'All words are definite'
        : 'Expected all words to be definite (with ال)',
    };
  },
};

export function runValidator(test: ChallengeTest, input: string): TestResult {
  const validate = validators[test.validator];
  if (!validate) {
    return {
      testId: test.id,
      name: test.name,
      passed: false,
      message: `Unknown validator: ${test.validator}`,
    };
  }

  const result = validate(input, test.params);

  return {
    testId: test.id,
    name: test.name,
    passed: result.passed,
    message: result.passed
      ? (test.message || result.message)
      : (test.failMessage || result.message),
  };
}
