import { describe, it, expect } from 'vitest';
import {
  removeDiacritics,
  containsArabic,
  isPrimarilyArabic,
  normalizeArabic,
  extractRootLetters,
  countArabicWords,
  splitArabicWords,
  getTextDirection,
  isSunLetter,
  isMoonLetter,
  ARABIC_LETTERS,
} from './arabic';

describe('removeDiacritics', () => {
  it('removes fatha, kasra, damma, sukun', () => {
    expect(removeDiacritics('كَتَبَ')).toBe('كتب');
  });

  it('removes shadda', () => {
    expect(removeDiacritics('عَلَّمَ')).toBe('علم');
  });

  it('removes tanween', () => {
    expect(removeDiacritics('كِتَابًا')).toBe('كتابا');
  });

  it('removes alef khanjariyya (U+0670)', () => {
    expect(removeDiacritics('رَحْمٰن')).toBe('رحمن');
  });

  it('preserves text without diacritics', () => {
    expect(removeDiacritics('كتاب')).toBe('كتاب');
  });

  it('handles empty string', () => {
    expect(removeDiacritics('')).toBe('');
  });

  it('preserves non-Arabic text', () => {
    expect(removeDiacritics('hello')).toBe('hello');
  });

  it('removes full tashkeel from الْكِتَابُ', () => {
    expect(removeDiacritics('الْكِتَابُ')).toBe('الكتاب');
  });
});

describe('containsArabic', () => {
  it('returns true for Arabic text', () => {
    expect(containsArabic('كتاب')).toBe(true);
  });

  it('returns true for mixed text', () => {
    expect(containsArabic('The word كتاب means book')).toBe(true);
  });

  it('returns false for English text', () => {
    expect(containsArabic('hello world')).toBe(false);
  });

  it('returns false for empty string', () => {
    expect(containsArabic('')).toBe(false);
  });
});

describe('isPrimarilyArabic', () => {
  it('returns true for pure Arabic', () => {
    expect(isPrimarilyArabic('كتاب جميل')).toBe(true);
  });

  it('returns false for pure English', () => {
    expect(isPrimarilyArabic('hello world')).toBe(false);
  });

  it('returns false for empty string', () => {
    expect(isPrimarilyArabic('')).toBe(false);
  });

  it('returns true when Arabic is majority', () => {
    expect(isPrimarilyArabic('كتاب a')).toBe(true);
  });

  it('returns false when English is majority', () => {
    expect(isPrimarilyArabic('a long English text ك')).toBe(false);
  });
});

describe('normalizeArabic', () => {
  it('removes diacritics', () => {
    expect(normalizeArabic('كَتَبَ')).toBe('كتب');
  });

  it('normalizes alef with hamza above', () => {
    expect(normalizeArabic('أحمد')).toBe('احمد');
  });

  it('normalizes alef with hamza below', () => {
    expect(normalizeArabic('إبراهيم')).toBe('ابراهيم');
  });

  it('normalizes alef madda', () => {
    expect(normalizeArabic('آمن')).toBe('امن');
  });

  it('normalizes taa marbuta to haa', () => {
    expect(normalizeArabic('مدرسة')).toBe('مدرسه');
  });

  it('normalizes alef maqsura to yaa', () => {
    expect(normalizeArabic('على')).toBe('علي');
  });

  it('normalizes waw with hamza', () => {
    expect(normalizeArabic('مؤمن')).toBe('مومن');
  });

  it('normalizes yaa with hamza', () => {
    expect(normalizeArabic('رئيس')).toBe('رييس');
  });

  it('handles combined normalizations', () => {
    expect(normalizeArabic('إِبْرَاهِيمَ')).toBe('ابراهيم');
  });
});

describe('extractRootLetters', () => {
  it('removes definite article and common prefix', () => {
    // After removing ال, the ك is stripped as a common prefix (ك = like)
    expect(extractRootLetters('الكتاب')).toBe('تاب');
  });

  it('removes diacritics first', () => {
    expect(extractRootLetters('الْكِتَابُ')).toBe('تاب');
  });

  it('removes common prefixes', () => {
    expect(extractRootLetters('وكتب')).toBe('كتب');
  });

  it('removes taa marbuta suffix', () => {
    expect(extractRootLetters('مدرسة')).toBe('مدرس');
  });

  it('removes nun suffix', () => {
    // ون suffix: ن is removed, then و is removed as prefix
    expect(extractRootLetters('كاتبون')).toBe('اتبو');
  });
});

describe('countArabicWords', () => {
  it('counts words correctly', () => {
    expect(countArabicWords('كتاب جميل كبير')).toBe(3);
  });

  it('returns 0 for empty string', () => {
    expect(countArabicWords('')).toBe(0);
  });

  it('returns 0 for whitespace-only', () => {
    expect(countArabicWords('   ')).toBe(0);
  });

  it('handles single word', () => {
    expect(countArabicWords('كتاب')).toBe(1);
  });

  it('handles multiple spaces between words', () => {
    expect(countArabicWords('كتاب   جميل')).toBe(2);
  });
});

describe('splitArabicWords', () => {
  it('splits words correctly', () => {
    expect(splitArabicWords('كتاب جميل')).toEqual(['كتاب', 'جميل']);
  });

  it('returns empty array for empty string', () => {
    expect(splitArabicWords('')).toEqual([]);
  });

  it('returns empty array for whitespace-only', () => {
    expect(splitArabicWords('   ')).toEqual([]);
  });

  it('handles multiple spaces', () => {
    expect(splitArabicWords('كتاب   جميل')).toEqual(['كتاب', 'جميل']);
  });
});

describe('getTextDirection', () => {
  it('returns rtl for Arabic text', () => {
    expect(getTextDirection('كتاب جميل')).toBe('rtl');
  });

  it('returns ltr for English text', () => {
    expect(getTextDirection('hello world')).toBe('ltr');
  });

  it('returns ltr for empty string', () => {
    expect(getTextDirection('')).toBe('ltr');
  });
});

describe('sun and moon letters', () => {
  it('has 14 sun letters', () => {
    expect(ARABIC_LETTERS.sun).toHaveLength(14);
  });

  it('has 14 moon letters', () => {
    expect(ARABIC_LETTERS.moon).toHaveLength(14);
  });

  it('identifies sun letters correctly', () => {
    expect(isSunLetter('ت')).toBe(true);
    expect(isSunLetter('ش')).toBe(true);
    expect(isSunLetter('ل')).toBe(true);
    expect(isSunLetter('ن')).toBe(true);
  });

  it('identifies moon letters correctly', () => {
    expect(isMoonLetter('ب')).toBe(true);
    expect(isMoonLetter('ك')).toBe(true);
    expect(isMoonLetter('م')).toBe(true);
    expect(isMoonLetter('و')).toBe(true);
  });

  it('sun letters are not moon letters', () => {
    for (const letter of ARABIC_LETTERS.sun) {
      expect(isMoonLetter(letter)).toBe(false);
    }
  });

  it('moon letters are not sun letters', () => {
    for (const letter of ARABIC_LETTERS.moon) {
      expect(isSunLetter(letter)).toBe(false);
    }
  });
});
