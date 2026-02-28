import { useState, useCallback } from 'react';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { useRouter } from '@/hooks/useRouter';
import { useQuranData } from '@/hooks/useQuranData';
import type { WordData } from '@/types';
import SurahHeader from '@/components/read/SurahHeader';
import AyahBlock from '@/components/read/AyahBlock';
import WordPopup from '@/components/read/WordPopup';
import ReaderModeBar from '@/components/read/ReaderModeBar';
import ErrorState from '@/components/ErrorState';

interface SurahReaderPageProps {
  surahNum: number;
}

export default function SurahReaderPage({ surahNum }: SurahReaderPageProps) {
  const { data: surah, loading, error } = useQuranData(surahNum);
  const [showTranslation, setShowTranslation] = useState(true);
  const [wordByWord, setWordByWord] = useState(false);
  const [selectedWord, setSelectedWord] = useState<{
    word: WordData;
    position: { top: number; left: number };
  } | null>(null);
  const { navigate } = useRouter();

  const handleWordClick = useCallback((word: WordData, rect: DOMRect) => {
    setSelectedWord({
      word,
      position: {
        top: rect.bottom + 8,
        left: Math.max(8, rect.left + rect.width / 2 - 128), // center the 256px popup
      },
    });
  }, []);

  const handleClosePopup = useCallback(() => {
    setSelectedWord(null);
  }, []);

  const handleMoreInfo = useCallback(
    (lemmaId: number) => {
      setSelectedWord(null);
      navigate(`#/word/${lemmaId}`);
    },
    [navigate],
  );

  // Loading state
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center pt-20 gap-3">
        <Loader2 size={32} className="text-primary animate-spin" />
        <p className="text-sm text-text-secondary">Loading surah...</p>
      </div>
    );
  }

  // Error state
  if (error || !surah) {
    return (
      <ErrorState
        message={error || 'Surah not found'}
        onRetry={() => navigate('#/read')}
      />
    );
  }

  return (
    <div className="pb-14">
      {/* Back button */}
      <div className="sticky top-0 bg-background z-30 py-3 flex items-center gap-2">
        <button
          onClick={() => navigate('#/read')}
          className="flex items-center gap-1 text-sm text-primary hover:text-primary-dark transition-colors"
        >
          <ArrowLeft size={18} />
          Surahs
        </button>
      </div>

      {/* Surah header */}
      <SurahHeader
        name={surah.name}
        surahNum={surah.surahNum}
        ayahCount={surah.ayahs.length}
      />

      {/* Ayahs */}
      <div className="mt-4">
        {surah.ayahs.map((ayah) => (
          <AyahBlock
            key={ayah.ayahNum}
            ayah={ayah}
            showTranslation={showTranslation}
            wordByWord={wordByWord}
            onWordClick={handleWordClick}
          />
        ))}
      </div>

      {/* Word popup */}
      {selectedWord && (
        <WordPopup
          word={selectedWord.word}
          position={selectedWord.position}
          onClose={handleClosePopup}
          onMoreInfo={handleMoreInfo}
        />
      )}

      {/* Reader mode bar */}
      <ReaderModeBar
        showTranslation={showTranslation}
        wordByWord={wordByWord}
        onToggleTranslation={() => setShowTranslation((v) => !v)}
        onToggleWordByWord={() => setWordByWord((v) => !v)}
      />
    </div>
  );
}
