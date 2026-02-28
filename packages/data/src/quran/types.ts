export interface SurahInfo {
  number: number;
  name: string;
  ayahCount: number;
}

export type RubRange =
  | { surah: number; startAyah: number; endAyah: number }
  | {
      startSurah: number;
      startAyah: number;
      endSurah: number;
      endAyah: number;
    };
