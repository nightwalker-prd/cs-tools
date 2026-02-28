import { useMemo } from 'react';
import { useSettings } from '@/hooks/useSettings';
import { useKalaamSrs } from '@/hooks/useKalaamSrs';
import { useLemmaIndex } from '@/hooks/useLemmaIndex';
import { useUnderstanding } from '@/hooks/useUnderstanding';
import StatsOverview from '@/components/settings/StatsOverview';
import LessonSettings from '@/components/settings/LessonSettings';
import DisplaySettings from '@/components/settings/DisplaySettings';
import SurahPrioritization from '@/components/settings/SurahPrioritization';
import DataExport from '@/components/settings/DataExport';
import { Loader2 } from 'lucide-react';

export default function SettingsPage() {
  const { settings, updateSettings } = useSettings();
  const srs = useKalaamSrs(settings);
  const { data: lemmas } = useLemmaIndex();
  const understanding = useUnderstanding(srs.engine.items, lemmas, settings.newPerDay);

  // Compute streak from localStorage
  const streak = useMemo(() => {
    try {
      const raw = localStorage.getItem('kalaam-streak');
      if (!raw) return 0;
      const parsed = JSON.parse(raw) as { current?: number };
      return parsed.current ?? 0;
    } catch {
      return 0;
    }
  }, []);

  // Total reviews = SRS review history length
  const totalReviews = srs.engine.history.length;

  // Total words in the Quran corpus
  const totalWords = lemmas?.length ?? 0;

  if (srs.isSeeding) {
    return (
      <div className="flex flex-col items-center justify-center pt-20 gap-3">
        <Loader2 size={32} className="text-primary animate-spin" />
        <p className="text-sm text-text-secondary">Loading settings...</p>
      </div>
    );
  }

  return (
    <div className="pt-6 space-y-4 pb-4">
      {/* Header */}
      <div className="mb-2">
        <h1 className="text-2xl font-bold text-primary">Settings</h1>
      </div>

      {/* Stats overview */}
      <StatsOverview
        wordsLearned={srs.totalLearned}
        totalWords={totalWords}
        understandingPct={understanding.percentage}
        streak={streak}
        totalReviews={totalReviews}
      />

      {/* Lesson configuration */}
      <LessonSettings settings={settings} onUpdate={updateSettings} />

      {/* Display preferences */}
      <DisplaySettings settings={settings} onUpdate={updateSettings} />

      {/* Surah prioritization */}
      <SurahPrioritization
        prioritizedSurahs={settings.prioritizedSurahs}
        onUpdate={(surahs) => updateSettings({ prioritizedSurahs: surahs })}
      />

      {/* Data export/import/reset */}
      <DataExport />
    </div>
  );
}
