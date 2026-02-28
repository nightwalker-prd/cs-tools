import { useLearningEngine } from '@/hooks/useLearningEngine';
import { useComprehension } from '@/hooks/useComprehension';
import { rootFrequency } from '@/data/root-frequency';
import { rootToLemma } from '@/data/root-to-lemma';
import { surahNames } from '@/data/surah-names';
import { ProgressRing } from '@/components/shared/ProgressRing';

interface ProgressDashboardProps {
  navigate: (path: string) => void;
}

function getTierColor(pct: number): string {
  if (pct >= 75) return 'var(--color-accent)';
  if (pct >= 50) return 'var(--color-tier-2)';
  if (pct >= 25) return 'var(--color-tier-4)';
  return 'var(--color-destructive)';
}

export function ProgressDashboard({ navigate }: ProgressDashboardProps) {
  const { progress } = useLearningEngine();
  const { overall, surahComprehension, tierStats } = useComprehension(progress);

  // Compute tier breakdown from rootFrequency
  const tierBreakdown = [1, 2, 3, 4].map(tier => {
    const tierRoots = rootFrequency.filter(r => r.tier === tier);
    let mastered = 0;
    for (const rf of tierRoots) {
      const linkedIds = rootToLemma[rf.root] || [];
      if (linkedIds.some(id => progress[id] && progress[id].phase !== 'new')) {
        mastered++;
      }
    }
    return { tier, total: tierRoots.length, mastered };
  });

  return (
    <div className="animate-fade-in" style={{ maxWidth: 900 }}>
      <div className="topic-header">
        <div className="breadcrumb">
          <button className="breadcrumb-link" onClick={() => navigate('#/')}>Home</button>
          <span className="breadcrumb-sep">/</span>
          <span className="breadcrumb-current">Progress</span>
        </div>
      </div>

      {/* Hero: Comprehension Ring */}
      <div className="progress-hero">
        <ProgressRing value={overall} size={180} />
        <div className="progress-hero-pct">{overall}%</div>
        <div className="progress-hero-label">
          You understand {overall}% of the Quran's vocabulary
        </div>
      </div>

      {/* Quick Stats */}
      <div className="stats-bar" style={{ marginBottom: '2rem' }}>
        <div className="stat">
          <div className="stat-value">{tierStats.totalLemmasKnown}</div>
          <div className="stat-label">Words Learned</div>
        </div>
        <div className="stat">
          <div className="stat-value">{tierStats.totalRootsMastered}</div>
          <div className="stat-label">Roots Mastered</div>
        </div>
        <div className="stat">
          <div className="stat-value">{tierStats.surahsAbove50}</div>
          <div className="stat-label">Surahs &gt;50%</div>
        </div>
      </div>

      {/* Tier Breakdown */}
      <h2 style={{ fontSize: '1.15rem', color: 'var(--color-primary)', marginBottom: '1rem' }}>
        Frequency Tier Progress
      </h2>
      <div className="progress-tier-cards">
        {tierBreakdown.map(tb => {
          const pct = tb.total > 0 ? Math.round((tb.mastered / tb.total) * 100) : 0;
          return (
            <div key={tb.tier} className="progress-tier-card" data-tier={tb.tier}>
              <div className="progress-tier-header">
                <span className="assessment-tier-badge" data-tier={tb.tier}>Tier {tb.tier}</span>
                <span className="progress-tier-pct">{pct}%</span>
              </div>
              <div className="assessment-tier-bar-bg">
                <div
                  className="assessment-tier-bar-fill"
                  data-tier={tb.tier}
                  style={{ width: `${pct}%` }}
                />
              </div>
              <div className="progress-tier-detail">
                {tb.mastered} / {tb.total} roots
              </div>
            </div>
          );
        })}
      </div>

      {/* Surah Grid */}
      <h2 style={{ fontSize: '1.15rem', color: 'var(--color-primary)', margin: '2rem 0 1rem' }}>
        Surah Comprehension
      </h2>
      <div className="surah-progress-grid">
        {surahComprehension.map(sc => {
          const surah = surahNames.find(s => s.num === sc.surahNum);
          const color = getTierColor(sc.pct);
          return (
            <button
              key={sc.surahNum}
              className="surah-progress-item"
              onClick={() => navigate(`#/read/${sc.surahNum}`)}
            >
              <div className="surah-progress-num">{sc.surahNum}</div>
              <div className="surah-progress-name">{surah?.english || ''}</div>
              <div className="surah-progress-bar-bg">
                <div
                  className="surah-progress-bar-fill"
                  style={{ width: `${sc.pct}%`, backgroundColor: color }}
                />
              </div>
              <div className="surah-progress-pct" style={{ color }}>{sc.pct}%</div>
            </button>
          );
        })}
      </div>

      {/* CTA */}
      <div style={{ display: 'flex', gap: '0.75rem', marginTop: '2rem' }}>
        <button
          className="btn btn-accent"
          style={{ flex: 1, padding: '0.85rem' }}
          onClick={() => navigate('#/learn')}
        >
          Continue Learning
        </button>
        <button
          className="btn"
          style={{ flex: 1, padding: '0.85rem' }}
          onClick={() => navigate('#/read/1')}
        >
          Read the Quran
        </button>
      </div>

    </div>
  );
}
