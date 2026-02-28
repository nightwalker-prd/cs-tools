interface SurahHeaderProps {
  name: { arabic: string; english: string; transliteration: string };
  surahNum: number;
  ayahCount: number;
}

export default function SurahHeader({ name, surahNum, ayahCount }: SurahHeaderProps) {
  const showBismillah = surahNum !== 9;

  return (
    <div className="bg-primary-light rounded-2xl px-5 py-6 text-center space-y-2">
      {/* Surah name in Arabic */}
      <h1 className="font-quran text-3xl text-primary-dark leading-relaxed">
        {name.arabic}
      </h1>

      {/* English name + transliteration */}
      <p className="text-sm text-text-secondary">
        {name.english} &middot; {name.transliteration}
      </p>

      {/* Surah number and ayah count */}
      <p className="text-xs text-text-secondary">
        Surah {surahNum} &middot; {ayahCount} Ayahs
      </p>

      {/* Bismillah */}
      {showBismillah && (
        <p className="font-quran text-xl text-text pt-2 border-t border-primary/20 mt-3">
          بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ
        </p>
      )}
    </div>
  );
}
