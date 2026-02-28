import { useState, useCallback, useEffect } from 'react';
import { useRouter } from '@/hooks/useRouter';
import { useSettings } from '@/hooks/useSettings';
import { useKalaamSrs } from '@/hooks/useKalaamSrs';
import { useLemmaIndex } from '@/hooks/useLemmaIndex';
import { useUnderstanding } from '@/hooks/useUnderstanding';
import ViewTypeSelector from '@/components/read/ViewTypeSelector';
import UnderstandingBar from '@/components/read/UnderstandingBar';
import SurahList from '@/components/read/SurahList';
import { BookOpen } from 'lucide-react';

const BOOKMARK_KEY = 'kalaam-bookmarks';

function getLastReadSurah(): number | null {
  try {
    const raw = localStorage.getItem(BOOKMARK_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw) as { lastSurah?: number };
    return data.lastSurah ?? null;
  } catch {
    return null;
  }
}

export default function ReadPage() {
  const { navigate } = useRouter();
  const { settings } = useSettings();
  const srs = useKalaamSrs(settings);
  const { data: lemmas } = useLemmaIndex();
  const understanding = useUnderstanding(srs.engine.items, lemmas, settings.newPerDay);

  const [viewType, setViewType] = useState<'surah' | 'juz'>('surah');
  const [lastSurah, setLastSurah] = useState<number | null>(null);

  useEffect(() => {
    setLastSurah(getLastReadSurah());
  }, []);

  const handleSelectSurah = useCallback(
    (surahNum: number) => {
      navigate(`#/read/${surahNum}`);
    },
    [navigate],
  );

  const handleContinueReading = useCallback(() => {
    if (lastSurah) {
      navigate(`#/read/${lastSurah}`);
    }
  }, [lastSurah, navigate]);

  return (
    <div className="pt-6 space-y-4 pb-4">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-text">Read</h1>
        <p className="text-sm text-text-secondary mt-0.5">
          Browse and read the Quran word by word
        </p>
      </div>

      {/* Understanding bar */}
      <UnderstandingBar percentage={understanding.percentage} />

      {/* View type selector */}
      <ViewTypeSelector value={viewType} onChange={setViewType} />

      {/* Surah / Juz list */}
      <SurahList viewType={viewType} onSelectSurah={handleSelectSurah} />

      {/* Continue reading sticky button */}
      {lastSurah && (
        <div className="fixed bottom-16 left-0 right-0 flex justify-center px-4 pb-2">
          <button
            onClick={handleContinueReading}
            className="w-full max-w-[398px] flex items-center justify-center gap-2 bg-primary text-white font-medium
              py-3 rounded-xl shadow-lg hover:bg-primary-dark transition-colors"
          >
            <BookOpen size={18} />
            Continue reading
          </button>
        </div>
      )}
    </div>
  );
}
