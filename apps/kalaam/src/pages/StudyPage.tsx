import { useCallback } from 'react';
import { useRouter } from '@/hooks/useRouter';
import { useSettings } from '@/hooks/useSettings';
import { useKalaamSrs } from '@/hooks/useKalaamSrs';
import { useLemmaIndex } from '@/hooks/useLemmaIndex';
import { useUnderstanding } from '@/hooks/useUnderstanding';
import DailyLessonCard from '@/components/study/DailyLessonCard';
import ProgressSection from '@/components/study/ProgressSection';
import UnderstandingChart from '@/components/study/UnderstandingChart';
import { Loader2 } from 'lucide-react';

export default function StudyPage() {
  const { navigate } = useRouter();
  const { settings } = useSettings();
  const srs = useKalaamSrs(settings);
  const { data: lemmas } = useLemmaIndex();
  const understanding = useUnderstanding(srs.engine.items, lemmas, settings.newPerDay);

  const handleStartLesson = useCallback(() => {
    srs.startLesson();
    navigate('#/lesson');
  }, [srs, navigate]);

  const handleStartChallenge = useCallback(() => {
    srs.startLesson('quiz');
    navigate('#/lesson?mode=quiz');
  }, [srs, navigate]);

  const handleOpenSettings = useCallback(() => {
    navigate('#/settings');
  }, [navigate]);

  // Show loading while SRS engine seeds
  if (srs.isSeeding) {
    return (
      <div className="flex flex-col items-center justify-center pt-20 gap-3">
        <Loader2 size={32} className="text-primary animate-spin" />
        <p className="text-sm text-text-secondary">Preparing your vocabulary deck...</p>
      </div>
    );
  }

  return (
    <div className="pt-6 space-y-4">
      {/* Header */}
      <div className="mb-2">
        <h1 className="text-2xl font-bold text-text">Assalamu Alaikum</h1>
        <p className="text-sm text-text-secondary mt-0.5">
          Ready to learn Quranic Arabic?
        </p>
      </div>

      <DailyLessonCard
        newCount={srs.newCount}
        reviewCount={srs.reviewCount}
        totalLearned={srs.totalLearned}
        onStartLesson={handleStartLesson}
        onStartChallenge={handleStartChallenge}
        onOpenSettings={handleOpenSettings}
      />

      <ProgressSection />

      <UnderstandingChart
        percentage={understanding.percentage}
        projectionMonths={understanding.projectionMonths}
        learnedCount={understanding.learnedCount ?? 0}
        totalLemmas={understanding.totalLemmas ?? 0}
        newPerDay={settings.newPerDay}
      />
    </div>
  );
}
