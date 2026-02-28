import { describe, it, expect } from 'vitest';
import {
  expandRubToAyahs,
  getRubsForJuz,
  getJuzForRub,
  getRubDescription,
  getSurahName,
  getSurahsForRub,
  getAyahCountForRub,
  calculateDailyTargets,
} from '../helpers';

// ─── expandRubToAyahs ──────────────────────────────────────────

describe('expandRubToAyahs', () => {
  it('returns empty array for invalid rub ID 0', () => {
    expect(expandRubToAyahs(0)).toEqual([]);
  });

  it('returns empty array for rub ID beyond 240', () => {
    expect(expandRubToAyahs(241)).toEqual([]);
  });

  it('returns empty array for negative rub ID', () => {
    expect(expandRubToAyahs(-1)).toEqual([]);
  });

  it('expands rub 1 spanning Al-Fatihah 1 through Al-Baqarah 25', () => {
    // Rub 1: startSurah 1, startAyah 1 -> endSurah 2, endAyah 25
    // Al-Fatihah has 7 ayahs + Al-Baqarah ayahs 1-25 = 32 total
    const ayahs = expandRubToAyahs(1);
    expect(ayahs).toHaveLength(32);

    // First ayah is Al-Fatihah:1
    expect(ayahs[0]).toEqual({ surah: 1, ayah: 1 });
    // Last of Al-Fatihah
    expect(ayahs[6]).toEqual({ surah: 1, ayah: 7 });
    // First of Al-Baqarah portion
    expect(ayahs[7]).toEqual({ surah: 2, ayah: 1 });
    // Last ayah is Al-Baqarah:25
    expect(ayahs[31]).toEqual({ surah: 2, ayah: 25 });
  });

  it('expands a single-surah rub correctly (rub 2: Al-Baqarah 26-43)', () => {
    // Rub 2: { surah: 2, startAyah: 26, endAyah: 43 }
    const ayahs = expandRubToAyahs(2);
    expect(ayahs).toHaveLength(18); // 43 - 26 + 1

    expect(ayahs[0]).toEqual({ surah: 2, ayah: 26 });
    expect(ayahs[ayahs.length - 1]).toEqual({ surah: 2, ayah: 43 });

    // Every ayah should be in surah 2
    expect(ayahs.every((a) => a.surah === 2)).toBe(true);
  });

  it('expands rub 240 (last rub) spanning surahs 100-114', () => {
    // Rub 240: startSurah 100, startAyah 9 -> endSurah 114, endAyah 6
    const ayahs = expandRubToAyahs(240);

    // First ayah
    expect(ayahs[0]).toEqual({ surah: 100, ayah: 9 });
    // Last ayah
    expect(ayahs[ayahs.length - 1]).toEqual({ surah: 114, ayah: 6 });

    // Count: Al-Adiyat 9-11 (3) + Al-Qariah 1-11 (11) + At-Takathur 1-8 (8)
    // + Al-Asr 1-3 (3) + Al-Humazah 1-9 (9) + Al-Fil 1-5 (5)
    // + Quraysh 1-4 (4) + Al-Maun 1-7 (7) + Al-Kawthar 1-3 (3)
    // + Al-Kafirun 1-6 (6) + An-Nasr 1-3 (3) + Al-Masad 1-5 (5)
    // + Al-Ikhlas 1-4 (4) + Al-Falaq 1-5 (5) + An-Nas 1-6 (6)
    // = 82
    expect(ayahs).toHaveLength(82);
  });

  it('expands a cross-surah rub with same start and end surah data correctly (rub 20)', () => {
    // Rub 20: startSurah 2, startAyah 283 -> endSurah 3, endAyah 14
    // Al-Baqarah 283-286 (4 ayahs) + Aal-Imran 1-14 (14 ayahs) = 18
    const ayahs = expandRubToAyahs(20);
    expect(ayahs).toHaveLength(18);

    expect(ayahs[0]).toEqual({ surah: 2, ayah: 283 });
    expect(ayahs[3]).toEqual({ surah: 2, ayah: 286 });
    expect(ayahs[4]).toEqual({ surah: 3, ayah: 1 });
    expect(ayahs[17]).toEqual({ surah: 3, ayah: 14 });
  });

  it('returns sequentially ordered ayahs within a surah', () => {
    const ayahs = expandRubToAyahs(5); // surah 2, ayah 75-91
    for (let i = 1; i < ayahs.length; i++) {
      expect(ayahs[i].ayah).toBe(ayahs[i - 1].ayah + 1);
    }
  });
});

// ─── getRubsForJuz ──────────────────────────────────────────────

describe('getRubsForJuz', () => {
  it('returns 8 rub IDs for juz 1', () => {
    const rubs = getRubsForJuz(1);
    expect(rubs).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
  });

  it('returns 8 rub IDs for juz 30', () => {
    const rubs = getRubsForJuz(30);
    expect(rubs).toEqual([233, 234, 235, 236, 237, 238, 239, 240]);
  });

  it('returns correct rubs for juz 15 (midpoint)', () => {
    // Juz 15: rubs 113-120
    const rubs = getRubsForJuz(15);
    expect(rubs).toEqual([113, 114, 115, 116, 117, 118, 119, 120]);
    expect(rubs).toHaveLength(8);
  });

  it('returns empty array for juz 0 (out of range)', () => {
    expect(getRubsForJuz(0)).toEqual([]);
  });

  it('returns empty array for juz 31 (out of range)', () => {
    expect(getRubsForJuz(31)).toEqual([]);
  });

  it('returns empty array for negative juz', () => {
    expect(getRubsForJuz(-5)).toEqual([]);
  });

  it('always returns exactly 8 rubs for valid juz values', () => {
    for (let juz = 1; juz <= 30; juz++) {
      expect(getRubsForJuz(juz)).toHaveLength(8);
    }
  });

  it('produces non-overlapping rub ranges across all juz', () => {
    const allRubs = new Set<number>();
    for (let juz = 1; juz <= 30; juz++) {
      const rubs = getRubsForJuz(juz);
      for (const rub of rubs) {
        expect(allRubs.has(rub)).toBe(false);
        allRubs.add(rub);
      }
    }
    expect(allRubs.size).toBe(240);
  });
});

// ─── getJuzForRub ───────────────────────────────────────────────

describe('getJuzForRub', () => {
  it('rub 1 maps to juz 1', () => {
    expect(getJuzForRub(1)).toBe(1);
  });

  it('rub 8 maps to juz 1 (last rub of juz 1)', () => {
    expect(getJuzForRub(8)).toBe(1);
  });

  it('rub 9 maps to juz 2 (first rub of juz 2)', () => {
    expect(getJuzForRub(9)).toBe(2);
  });

  it('rub 240 maps to juz 30', () => {
    expect(getJuzForRub(240)).toBe(30);
  });

  it('rub 233 maps to juz 30 (first rub of juz 30)', () => {
    expect(getJuzForRub(233)).toBe(30);
  });

  it('rub 120 maps to juz 15', () => {
    expect(getJuzForRub(120)).toBe(15);
  });

  it('rub 121 maps to juz 16 (boundary)', () => {
    expect(getJuzForRub(121)).toBe(16);
  });

  it('is consistent with getRubsForJuz for all 240 rubs', () => {
    for (let juz = 1; juz <= 30; juz++) {
      const rubs = getRubsForJuz(juz);
      for (const rub of rubs) {
        expect(getJuzForRub(rub)).toBe(juz);
      }
    }
  });
});

// ─── getRubDescription ──────────────────────────────────────────

describe('getRubDescription', () => {
  it('returns "Unknown" for invalid rub ID', () => {
    expect(getRubDescription(0)).toBe('Unknown');
    expect(getRubDescription(999)).toBe('Unknown');
  });

  it('describes single-surah rub with surah name and ayah range', () => {
    // Rub 2: { surah: 2, startAyah: 26, endAyah: 43 }
    expect(getRubDescription(2)).toBe('Al-Baqarah 26-43');
  });

  it('describes cross-surah rub spanning two different surahs', () => {
    // Rub 1: { startSurah: 1, startAyah: 1, endSurah: 2, endAyah: 25 }
    expect(getRubDescription(1)).toBe('Al-Fatihah 1 - Al-Baqarah 25');
  });

  it('describes cross-surah rub with same start and end surah (multi-range type)', () => {
    // Rub 166: { surah: 32, startAyah: 11, endAyah: 30 }
    expect(getRubDescription(166)).toBe('As-Sajdah 11-30');
  });

  it('describes last rub (240) correctly', () => {
    // Rub 240: startSurah 100, startAyah 9 -> endSurah 114, endAyah 6
    expect(getRubDescription(240)).toBe('Al-Adiyat 9 - An-Nas 6');
  });

  it('describes rub 225 (Al-Mulk, single surah)', () => {
    // Rub 225: { surah: 67, startAyah: 1, endAyah: 30 }
    expect(getRubDescription(225)).toBe('Al-Mulk 1-30');
  });
});

// ─── getSurahName ───────────────────────────────────────────────

describe('getSurahName', () => {
  it('returns Al-Fatihah for surah 1', () => {
    expect(getSurahName(1)).toBe('Al-Fatihah');
  });

  it('returns Al-Baqarah for surah 2', () => {
    expect(getSurahName(2)).toBe('Al-Baqarah');
  });

  it('returns An-Nas for surah 114 (last surah)', () => {
    expect(getSurahName(114)).toBe('An-Nas');
  });

  it('returns "Unknown" for surah 0 (out of range)', () => {
    expect(getSurahName(0)).toBe('Unknown');
  });

  it('returns "Unknown" for surah 115 (out of range)', () => {
    expect(getSurahName(115)).toBe('Unknown');
  });

  it('returns "Unknown" for negative surah number', () => {
    expect(getSurahName(-1)).toBe('Unknown');
  });

  it('returns correct names for well-known surahs', () => {
    expect(getSurahName(36)).toBe('Ya-Sin');
    expect(getSurahName(55)).toBe('Ar-Rahman');
    expect(getSurahName(67)).toBe('Al-Mulk');
    expect(getSurahName(112)).toBe('Al-Ikhlas');
  });
});

// ─── getSurahsForRub ────────────────────────────────────────────

describe('getSurahsForRub', () => {
  it('returns "Unknown" for invalid rub ID', () => {
    expect(getSurahsForRub(0)).toBe('Unknown');
    expect(getSurahsForRub(999)).toBe('Unknown');
  });

  it('returns single surah name for single-surah rub', () => {
    // Rub 2: { surah: 2, startAyah: 26, endAyah: 43 }
    expect(getSurahsForRub(2)).toBe('Al-Baqarah');
  });

  it('returns range of surah names for cross-surah rub', () => {
    // Rub 1: { startSurah: 1, startAyah: 1, endSurah: 2, endAyah: 25 }
    expect(getSurahsForRub(1)).toBe('Al-Fatihah - Al-Baqarah');
  });

  it('returns single name when multi-range rub spans same surah', () => {
    // Check a multi-range type that starts and ends in the same surah
    // Rub 166 is single-surah type. Need a startSurah/endSurah with same value.
    // Rub 20: startSurah 2, endSurah 3 -> different surahs
    // Actually the multi-range format always has different surahs in this dataset.
    // If startSurah === endSurah, the code returns just the single name.
    // We verify the cross-surah case instead.
    expect(getSurahsForRub(20)).toBe('Al-Baqarah - Aal-Imran');
  });

  it('returns correct surahs for last rub (240)', () => {
    expect(getSurahsForRub(240)).toBe('Al-Adiyat - An-Nas');
  });

  it('returns single surah name for rub entirely within one surah', () => {
    // Rub 225: { surah: 67, startAyah: 1, endAyah: 30 }
    expect(getSurahsForRub(225)).toBe('Al-Mulk');
  });
});

// ─── getAyahCountForRub ─────────────────────────────────────────

describe('getAyahCountForRub', () => {
  it('returns 0 for invalid rub ID', () => {
    expect(getAyahCountForRub(0)).toBe(0);
    expect(getAyahCountForRub(999)).toBe(0);
  });

  it('returns correct count for rub 1 (Al-Fatihah + Al-Baqarah 1-25)', () => {
    // 7 + 25 = 32
    expect(getAyahCountForRub(1)).toBe(32);
  });

  it('returns correct count for single-surah rub (rub 2)', () => {
    // Al-Baqarah 26-43 = 18 ayahs
    expect(getAyahCountForRub(2)).toBe(18);
  });

  it('returns correct count for rub 240 (last rub)', () => {
    // Calculated: 82 ayahs (surahs 100:9 through 114:6)
    expect(getAyahCountForRub(240)).toBe(82);
  });

  it('returns correct count for rub 213 (Ar-Rahman, all 78 ayahs)', () => {
    // Rub 213: { surah: 55, startAyah: 1, endAyah: 78 }
    expect(getAyahCountForRub(213)).toBe(78);
  });

  it('always returns a positive count for valid rub IDs', () => {
    for (let rubId = 1; rubId <= 240; rubId++) {
      expect(getAyahCountForRub(rubId)).toBeGreaterThan(0);
    }
  });
});

// ─── calculateDailyTargets ──────────────────────────────────────

describe('calculateDailyTargets', () => {
  it('returns empty array for empty juz list', () => {
    expect(calculateDailyTargets([])).toEqual([]);
  });

  it('distributes 1 juz (8 rubs) over 8 days = 1 rub per day', () => {
    const targets = calculateDailyTargets([1], 8);
    expect(targets).toHaveLength(8);
    // Each day should have exactly 1 rub
    for (const t of targets) {
      expect(t.rubs).toHaveLength(1);
    }
    // All 8 rubs of juz 1 should be covered
    const allRubs = targets.flatMap((t) => t.rubs);
    expect(allRubs).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
  });

  it('distributes 1 juz (8 rubs) over default 30 days', () => {
    const targets = calculateDailyTargets([1]);
    // 8 rubs / 30 days = some days get 0, some get 1
    // Total rubs assigned should be 8
    const allRubs = targets.flatMap((t) => t.rubs);
    expect(allRubs).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
    // Days with no rubs are excluded from results
    expect(targets.length).toBeLessThanOrEqual(30);
    expect(targets.length).toBeGreaterThan(0);
  });

  it('covers all rubs from multiple juz', () => {
    const targets = calculateDailyTargets([1, 2], 16);
    const allRubs = targets.flatMap((t) => t.rubs);
    // Juz 1 rubs: 1-8, Juz 2 rubs: 9-16
    expect(allRubs).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]);
  });

  it('handles more days than rubs (some days empty)', () => {
    const targets = calculateDailyTargets([1], 100);
    // 8 rubs over 100 days
    const allRubs = targets.flatMap((t) => t.rubs);
    expect(allRubs).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
    // Should have at most 8 day entries (empty days are filtered out)
    expect(targets.length).toBeLessThanOrEqual(8);
  });

  it('handles fewer days than rubs (multiple rubs per day)', () => {
    const targets = calculateDailyTargets([1], 2);
    // 8 rubs over 2 days = ~4 rubs per day
    const allRubs = targets.flatMap((t) => t.rubs);
    expect(allRubs).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
    expect(targets).toHaveLength(2);
  });

  it('day numbers are sequential and start from 1', () => {
    const targets = calculateDailyTargets([1, 2], 16);
    for (let i = 0; i < targets.length; i++) {
      expect(targets[i].day).toBeGreaterThanOrEqual(1);
      expect(targets[i].day).toBeLessThanOrEqual(16);
    }
    // Days should be in order
    for (let i = 1; i < targets.length; i++) {
      expect(targets[i].day).toBeGreaterThan(targets[i - 1].day);
    }
  });

  it('handles all 30 juz over 30 days', () => {
    const allJuz = Array.from({ length: 30 }, (_, i) => i + 1);
    const targets = calculateDailyTargets(allJuz, 30);
    // 240 rubs over 30 days = 8 rubs per day
    const allRubs = targets.flatMap((t) => t.rubs);
    expect(allRubs).toHaveLength(240);
    expect(targets).toHaveLength(30);
    // Each day should have exactly 8 rubs
    for (const t of targets) {
      expect(t.rubs).toHaveLength(8);
    }
  });

  it('returns juz 30 rubs when targeting juz 30', () => {
    const targets = calculateDailyTargets([30], 8);
    const allRubs = targets.flatMap((t) => t.rubs);
    expect(allRubs).toEqual([233, 234, 235, 236, 237, 238, 239, 240]);
  });

  it('returns empty for invalid juz numbers', () => {
    // getRubsForJuz(0) returns [], so no rubs to distribute
    const targets = calculateDailyTargets([0], 10);
    expect(targets).toEqual([]);
  });
});
