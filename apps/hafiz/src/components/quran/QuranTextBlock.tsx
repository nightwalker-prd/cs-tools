import { useMemo } from 'react';
import { toArabicIndic } from '../../utils/arabic-numerals';

interface QuranTextBlockProps {
  ayahTexts: Array<{ surah: number; ayah: number; text: string; surahName: string }>;
  currentAyah: { surah: number; ayah: number } | null;
  onAyahClick: (surah: number, ayah: number) => void;
  loading?: boolean;
}

interface SurahSegment {
  surah: number;
  surahName: string;
  ayahs: Array<{ ayah: number; text: string }>;
  startsAtAyah1: boolean;
}

const BISMILLAH = 'بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ';

export function QuranTextBlock({
  ayahTexts,
  currentAyah,
  onAyahClick,
  loading,
}: QuranTextBlockProps) {
  const segments = useMemo(() => {
    const result: SurahSegment[] = [];
    let current: SurahSegment | null = null;

    for (const a of ayahTexts) {
      if (!current || current.surah !== a.surah) {
        current = {
          surah: a.surah,
          surahName: a.surahName,
          ayahs: [],
          startsAtAyah1: a.ayah === 1,
        };
        result.push(current);
      }
      current.ayahs.push({ ayah: a.ayah, text: a.text });
    }

    return result;
  }, [ayahTexts]);

  if (loading) {
    return <div className="loading-state">Loading ayah text...</div>;
  }

  if (ayahTexts.length === 0) {
    return <div className="loading-state">No ayah text available.</div>;
  }

  return (
    <div className="quran-text-block">
      {segments.map((seg) => (
        <div key={seg.surah} className="quran-segment">
          <div className="surah-header">
            <span className="surah-header-name">{seg.surahName}</span>
          </div>

          {seg.startsAtAyah1 && seg.surah !== 9 && seg.surah !== 1 && (
            <p className="bismillah">{BISMILLAH}</p>
          )}

          <p className="quran-flowing-text" dir="rtl">
            {seg.ayahs.map((a) => {
              const isPlaying =
                currentAyah?.surah === seg.surah && currentAyah?.ayah === a.ayah;

              return (
                <span key={a.ayah}>
                  <span
                    className={`ayah-span${isPlaying ? ' playing' : ''}`}
                    onClick={() => onAyahClick(seg.surah, a.ayah)}
                  >
                    {a.text}
                  </span>
                  <span className="ayah-end-marker">
                    {' '}﴿{toArabicIndic(a.ayah)}﴾{' '}
                  </span>
                </span>
              );
            })}
          </p>
        </div>
      ))}
    </div>
  );
}
