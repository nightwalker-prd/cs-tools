import type { RubRange } from './types';
import { SURAH_DATA } from './surah-data';
import { RUB_AYAH_RANGES } from './rub-mappings';

/** Expand a rub range into individual surah:ayah pairs */
export function expandRubToAyahs(
  rubId: number,
): Array<{ surah: number; ayah: number }> {
  const range = RUB_AYAH_RANGES[rubId];
  if (!range) return [];

  const ayahs: Array<{ surah: number; ayah: number }> = [];

  if ('surah' in range) {
    for (let ayah = range.startAyah; ayah <= range.endAyah; ayah++) {
      ayahs.push({ surah: range.surah, ayah });
    }
  } else {
    for (let surah = range.startSurah; surah <= range.endSurah; surah++) {
      const surahData = SURAH_DATA[surah - 1];
      if (!surahData) continue;

      const startAyah = surah === range.startSurah ? range.startAyah : 1;
      const endAyah =
        surah === range.endSurah ? range.endAyah : surahData.ayahCount;

      for (let ayah = startAyah; ayah <= endAyah; ayah++) {
        ayahs.push({ surah, ayah });
      }
    }
  }

  return ayahs;
}

/** Get the 8 rub IDs belonging to a juz (1-30) */
export function getRubsForJuz(juz: number): number[] {
  if (juz < 1 || juz > 30) return [];
  const startRub = (juz - 1) * 8 + 1;
  return Array.from({ length: 8 }, (_, i) => startRub + i);
}

/** Get the juz number (1-30) for a given rub ID (1-240) */
export function getJuzForRub(rubId: number): number {
  return Math.ceil(rubId / 8);
}

/** Get a human-readable description of a rub's ayah range */
export function getRubDescription(rubId: number): string {
  const range = RUB_AYAH_RANGES[rubId];
  if (!range) return 'Unknown';

  if ('surah' in range) {
    const surahName = SURAH_DATA[range.surah - 1]?.name ?? 'Unknown';
    return `${surahName} ${range.startAyah}-${range.endAyah}`;
  } else {
    const startSurah = SURAH_DATA[range.startSurah - 1]?.name ?? 'Unknown';
    const endSurah = SURAH_DATA[range.endSurah - 1]?.name ?? 'Unknown';
    if (range.startSurah === range.endSurah) {
      return `${startSurah} ${range.startAyah}-${range.endAyah}`;
    }
    return `${startSurah} ${range.startAyah} - ${endSurah} ${range.endAyah}`;
  }
}

/** Get surah name by number (1-indexed) */
export function getSurahName(surahNumber: number): string {
  return SURAH_DATA[surahNumber - 1]?.name ?? 'Unknown';
}

/** Get rub's ayah range data */
export function getRubRange(rubId: number): RubRange | null {
  return RUB_AYAH_RANGES[rubId] ?? null;
}

/** Get the surah name(s) that a rub spans */
export function getSurahsForRub(rubId: number): string {
  const range = RUB_AYAH_RANGES[rubId];
  if (!range) return 'Unknown';

  if ('surah' in range) {
    return SURAH_DATA[range.surah - 1]?.name ?? 'Unknown';
  } else {
    const startName = SURAH_DATA[range.startSurah - 1]?.name ?? 'Unknown';
    const endName = SURAH_DATA[range.endSurah - 1]?.name ?? 'Unknown';
    if (startName === endName) return startName;
    return `${startName} - ${endName}`;
  }
}

/** Get total ayah count for a rub */
export function getAyahCountForRub(rubId: number): number {
  return expandRubToAyahs(rubId).length;
}

/** Calculate daily rub targets for a challenge over N days */
export function calculateDailyTargets(
  targetJuz: number[],
  totalDays: number = 30,
): Array<{ day: number; rubs: number[] }> {
  const allRubs = targetJuz.flatMap(getRubsForJuz);
  const totalRubs = allRubs.length;
  const rubsPerDay = totalRubs / totalDays;

  const dailyTargets: Array<{ day: number; rubs: number[] }> = [];
  let rubIndex = 0;

  for (let day = 1; day <= totalDays; day++) {
    const targetEnd = Math.round(day * rubsPerDay);
    const dayRubs: number[] = [];

    while (rubIndex < targetEnd && rubIndex < totalRubs) {
      dayRubs.push(allRubs[rubIndex]);
      rubIndex++;
    }

    if (dayRubs.length > 0) {
      dailyTargets.push({ day, rubs: dayRubs });
    }
  }

  return dailyTargets;
}
