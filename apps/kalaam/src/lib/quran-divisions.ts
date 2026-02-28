/**
 * Standard Quran division data (Juz boundaries).
 *
 * Each entry marks the starting surah and ayah for a given juz.
 */

export interface QuranDivision {
  number: number;
  name: string;
  startSurah: number;
  startAyah: number;
}

/** All 30 Juz divisions with their standard names and start points. */
export const JUZ_DIVISIONS: QuranDivision[] = [
  { number: 1, name: 'Alif Lam Mim', startSurah: 1, startAyah: 1 },
  { number: 2, name: 'Sayaqool', startSurah: 2, startAyah: 142 },
  { number: 3, name: 'Tilkal Rusul', startSurah: 2, startAyah: 253 },
  { number: 4, name: 'Lan Tanaloo', startSurah: 3, startAyah: 92 },
  { number: 5, name: 'Wal Muhsanat', startSurah: 4, startAyah: 24 },
  { number: 6, name: 'La Yuhibbullah', startSurah: 4, startAyah: 148 },
  { number: 7, name: 'Wa Idha Sami\'oo', startSurah: 5, startAyah: 82 },
  { number: 8, name: 'Wa Law Annana', startSurah: 6, startAyah: 111 },
  { number: 9, name: 'Qalal Mala\'u', startSurah: 7, startAyah: 88 },
  { number: 10, name: 'Wa A\'lamoo', startSurah: 8, startAyah: 41 },
  { number: 11, name: 'Ya\'tadhiroon', startSurah: 9, startAyah: 94 },
  { number: 12, name: 'Wa Maa Min Daabbah', startSurah: 11, startAyah: 6 },
  { number: 13, name: 'Wa Ma Ubarri\'u', startSurah: 12, startAyah: 53 },
  { number: 14, name: 'Rubama', startSurah: 15, startAyah: 1 },
  { number: 15, name: 'Subhanallazi', startSurah: 17, startAyah: 1 },
  { number: 16, name: 'Qal Alam', startSurah: 18, startAyah: 75 },
  { number: 17, name: 'Iqtaraba', startSurah: 21, startAyah: 1 },
  { number: 18, name: 'Qad Aflaha', startSurah: 23, startAyah: 1 },
  { number: 19, name: 'Wa Qalallazina', startSurah: 25, startAyah: 21 },
  { number: 20, name: 'A\'man Khalaq', startSurah: 27, startAyah: 56 },
  { number: 21, name: 'Utlu Ma Uhiya', startSurah: 29, startAyah: 46 },
  { number: 22, name: 'Wa Man Yaqnut', startSurah: 33, startAyah: 31 },
  { number: 23, name: 'Wa Mali', startSurah: 36, startAyah: 28 },
  { number: 24, name: 'Faman Azlam', startSurah: 39, startAyah: 32 },
  { number: 25, name: 'Ilayhi Yurad', startSurah: 41, startAyah: 47 },
  { number: 26, name: 'Ha Mim', startSurah: 46, startAyah: 1 },
  { number: 27, name: 'Qala Fama Khatbukum', startSurah: 51, startAyah: 31 },
  { number: 28, name: 'Qad Sami\'a', startSurah: 58, startAyah: 1 },
  { number: 29, name: 'Tabarakallazi', startSurah: 67, startAyah: 1 },
  { number: 30, name: 'Amma Yatasaa\'aloon', startSurah: 78, startAyah: 1 },
];
