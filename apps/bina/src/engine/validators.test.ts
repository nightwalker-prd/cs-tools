import { describe, it, expect } from 'vitest';
import { runValidator } from './validators';
import type { ChallengeTest } from '../types';

function makeTest(overrides: Partial<ChallengeTest> & Pick<ChallengeTest, 'validator' | 'params'>): ChallengeTest {
  return {
    id: 'test-1',
    name: 'Test',
    ...overrides,
  };
}

describe('validators', () => {
  describe('contains', () => {
    it('passes when text is found', () => {
      const t = makeTest({ validator: 'contains', params: { text: 'الكتاب' } });
      expect(runValidator(t, 'الكتابُ جديدٌ').passed).toBe(true);
    });

    it('fails when text is not found', () => {
      const t = makeTest({ validator: 'contains', params: { text: 'القلم' } });
      expect(runValidator(t, 'الكتابُ جديدٌ').passed).toBe(false);
    });

    it('ignores harakat when specified', () => {
      const t = makeTest({ validator: 'contains', params: { text: 'الكتاب', ignoreHarakat: true } });
      expect(runValidator(t, 'الكتابُ').passed).toBe(true);
    });
  });

  describe('notContains', () => {
    it('passes when text is absent', () => {
      const t = makeTest({ validator: 'notContains', params: { text: 'الباب' } });
      expect(runValidator(t, 'باب البيت').passed).toBe(true);
    });

    it('fails when text is present', () => {
      const t = makeTest({ validator: 'notContains', params: { text: 'الباب' } });
      expect(runValidator(t, 'الباب كبير').passed).toBe(false);
    });
  });

  describe('startsWith', () => {
    it('passes when input starts with target', () => {
      const t = makeTest({ validator: 'startsWith', params: { text: 'ال' } });
      expect(runValidator(t, 'الكتابُ جديدٌ').passed).toBe(true);
    });

    it('fails when input does not start with target', () => {
      const t = makeTest({ validator: 'startsWith', params: { text: 'كتب' } });
      expect(runValidator(t, 'الكتابُ جديدٌ').passed).toBe(false);
    });

    it('trims input before checking', () => {
      const t = makeTest({ validator: 'startsWith', params: { text: 'ال' } });
      expect(runValidator(t, '  الكتابُ جديدٌ').passed).toBe(true);
    });
  });

  describe('endsWith', () => {
    it('passes when input ends with target', () => {
      const t = makeTest({ validator: 'endsWith', params: { text: 'جديدٌ' } });
      expect(runValidator(t, 'الكتابُ جديدٌ').passed).toBe(true);
    });

    it('fails when input does not end with target', () => {
      const t = makeTest({ validator: 'endsWith', params: { text: 'الكتاب' } });
      expect(runValidator(t, 'الكتابُ جديدٌ').passed).toBe(false);
    });
  });

  describe('wordCount', () => {
    it('passes when count is within min/max', () => {
      const t = makeTest({ validator: 'wordCount', params: { min: 2, max: 3 } });
      expect(runValidator(t, 'الكتابُ جديدٌ').passed).toBe(true);
    });

    it('fails when count is below min', () => {
      const t = makeTest({ validator: 'wordCount', params: { min: 3, max: 5 } });
      expect(runValidator(t, 'الكتابُ جديدٌ').passed).toBe(false);
    });

    it('fails when count is above max', () => {
      const t = makeTest({ validator: 'wordCount', params: { min: 1, max: 1 } });
      expect(runValidator(t, 'الكتابُ جديدٌ').passed).toBe(false);
    });

    it('passes with only min', () => {
      const t = makeTest({ validator: 'wordCount', params: { min: 2 } });
      expect(runValidator(t, 'الكتابُ جديدٌ').passed).toBe(true);
    });

    it('passes with only max', () => {
      const t = makeTest({ validator: 'wordCount', params: { max: 5 } });
      expect(runValidator(t, 'الكتابُ جديدٌ').passed).toBe(true);
    });
  });

  describe('containsWord', () => {
    it('passes when exact word is found', () => {
      const t = makeTest({ validator: 'containsWord', params: { word: 'الكتاب', ignoreHarakat: true } });
      expect(runValidator(t, 'الكتابُ جديدٌ').passed).toBe(true);
    });

    it('fails when word is only a substring', () => {
      const t = makeTest({ validator: 'containsWord', params: { word: 'كتاب' } });
      // "الكتاب" is a different word than "كتاب" (no ال)
      expect(runValidator(t, 'الكتابُ جديدٌ').passed).toBe(false);
    });

    it('matches with ignoreHarakat', () => {
      const t = makeTest({ validator: 'containsWord', params: { word: 'جديد', ignoreHarakat: true } });
      expect(runValidator(t, 'كتابٌ جديدٌ').passed).toBe(true);
    });
  });

  describe('wordAtPosition', () => {
    it('passes when word at position matches', () => {
      const t = makeTest({ validator: 'wordAtPosition', params: { position: 0, word: 'كتب', ignoreHarakat: true } });
      expect(runValidator(t, 'كتبَ الطالبُ الدرسَ').passed).toBe(true);
    });

    it('fails when word at position does not match', () => {
      const t = makeTest({ validator: 'wordAtPosition', params: { position: 0, word: 'قرأ', ignoreHarakat: true } });
      expect(runValidator(t, 'كتبَ الطالبُ الدرسَ').passed).toBe(false);
    });

    it('fails when position is out of bounds', () => {
      const t = makeTest({ validator: 'wordAtPosition', params: { position: 5, word: 'كلمة' } });
      expect(runValidator(t, 'الكتابُ جديدٌ').passed).toBe(false);
    });
  });

  describe('hasDiacritic', () => {
    it('passes when word has the specified diacritic', () => {
      const t = makeTest({ validator: 'hasDiacritic', params: { word: 'الباب', diacritic: 'fatha' } });
      expect(runValidator(t, 'فتحَ المعلمُ البابَ').passed).toBe(true);
    });

    it('fails when word lacks the specified diacritic', () => {
      const t = makeTest({ validator: 'hasDiacritic', params: { word: 'الباب', diacritic: 'kasra' } });
      expect(runValidator(t, 'فتحَ المعلمُ البابَ').passed).toBe(false);
    });

    it('detects tanwin-damma', () => {
      const t = makeTest({ validator: 'hasDiacritic', params: { word: 'جديد', diacritic: 'tanwin-damma' } });
      expect(runValidator(t, 'كتابٌ جديدٌ').passed).toBe(true);
    });

    it('detects shadda', () => {
      const t = makeTest({ validator: 'hasDiacritic', params: { word: 'إن', diacritic: 'shadda' } });
      expect(runValidator(t, 'إنّ الدرسَ سهلٌ').passed).toBe(true);
    });
  });

  describe('exactMatch', () => {
    it('passes when input matches one of the valid strings', () => {
      const t = makeTest({ validator: 'exactMatch', params: { texts: ['الكتابُ جديدٌ', 'الكتاب جديد'] } });
      expect(runValidator(t, 'الكتابُ جديدٌ').passed).toBe(true);
    });

    it('fails when input matches none', () => {
      const t = makeTest({ validator: 'exactMatch', params: { texts: ['الكتابُ جديدٌ'] } });
      expect(runValidator(t, 'الكتاب قديم').passed).toBe(false);
    });

    it('matches ignoring harakat', () => {
      const t = makeTest({ validator: 'exactMatch', params: { texts: ['الكتابُ جديدٌ'], ignoreHarakat: true } });
      expect(runValidator(t, 'الكتاب جديد').passed).toBe(true);
    });

    it('works with single text param', () => {
      const t = makeTest({ validator: 'exactMatch', params: { text: 'الكتابُ جديدٌ' } });
      expect(runValidator(t, 'الكتابُ جديدٌ').passed).toBe(true);
    });
  });

  describe('pattern', () => {
    it('passes when regex matches', () => {
      const t = makeTest({ validator: 'pattern', params: { pattern: 'باب.*البيت.*الكبير' } });
      expect(runValidator(t, 'باب البيت الكبير').passed).toBe(true);
    });

    it('fails when regex does not match', () => {
      const t = makeTest({ validator: 'pattern', params: { pattern: '^كتب' } });
      expect(runValidator(t, 'الكتاب جديد').passed).toBe(false);
    });

    it('handles invalid regex gracefully', () => {
      const t = makeTest({ validator: 'pattern', params: { pattern: '[invalid' } });
      expect(runValidator(t, 'anything').passed).toBe(false);
    });
  });

  describe('custom validators', () => {
    it('isNominalSentence passes for noun-first input', () => {
      const t = makeTest({ validator: 'custom', params: { customFn: 'isNominalSentence' } });
      expect(runValidator(t, 'الكتابُ جديدٌ').passed).toBe(true);
    });

    it('isNominalSentence fails for empty input', () => {
      const t = makeTest({ validator: 'custom', params: { customFn: 'isNominalSentence' } });
      expect(runValidator(t, '').passed).toBe(false);
    });

    it('hasIdafaStructure passes for multi-word input', () => {
      const t = makeTest({ validator: 'custom', params: { customFn: 'hasIdafaStructure' } });
      expect(runValidator(t, 'باب البيت').passed).toBe(true);
    });

    it('hasIdafaStructure fails for single word', () => {
      const t = makeTest({ validator: 'custom', params: { customFn: 'hasIdafaStructure' } });
      expect(runValidator(t, 'باب').passed).toBe(false);
    });

    it('allWordsDefinite passes when all words have ال', () => {
      const t = makeTest({ validator: 'custom', params: { customFn: 'allWordsDefinite' } });
      expect(runValidator(t, 'البيت الكبير الجديد').passed).toBe(true);
    });

    it('allWordsDefinite fails when some words lack ال', () => {
      const t = makeTest({ validator: 'custom', params: { customFn: 'allWordsDefinite' } });
      expect(runValidator(t, 'بيت الكبير').passed).toBe(false);
    });

    it('unknown custom fn returns error', () => {
      const t = makeTest({ validator: 'custom', params: { customFn: 'nonExistent' } });
      const result = runValidator(t, 'anything');
      expect(result.passed).toBe(false);
      expect(result.message).toContain('Unknown');
    });
  });

  describe('unknown validator', () => {
    it('returns error for unknown validator type', () => {
      const t = makeTest({ validator: 'nonExistent' as any, params: {} });
      const result = runValidator(t, 'anything');
      expect(result.passed).toBe(false);
      expect(result.message).toContain('Unknown validator');
    });
  });

  describe('custom messages', () => {
    it('uses custom message on pass', () => {
      const t = makeTest({
        validator: 'contains',
        params: { text: 'الكتاب' },
        message: 'Found the book!',
      });
      const result = runValidator(t, 'الكتابُ جديدٌ');
      expect(result.message).toBe('Found the book!');
    });

    it('uses custom failMessage on fail', () => {
      const t = makeTest({
        validator: 'contains',
        params: { text: 'القلم' },
        failMessage: 'Missing the pen!',
      });
      const result = runValidator(t, 'الكتابُ جديدٌ');
      expect(result.message).toBe('Missing the pen!');
    });
  });
});
