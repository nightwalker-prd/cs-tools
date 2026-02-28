import { useMemo } from 'react';
import type { DashboardData, PillarScore, ToolScore } from '@/types/progress';
import { PILLAR_CONFIGS } from '@/data/pillar-config';
import { evaluateMilestones, type RawProgressData } from '@/data/milestones';

function readJson<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

// ─── Per-tool score computation ───

function computeTashkhisNahwScore(): number {
  const history = readJson<{ completedAt: number; scorecards: { categories: { categoryId: string; percentage: number }[] }[] }[]>('arabtools-tashkhis-history');
  if (!history || history.length === 0) return -1;
  const latest = history.reduce((a, b) => (a.completedAt > b.completedAt ? a : b));
  const nahwCategories: number[] = [];
  for (const sc of latest.scorecards) {
    for (const cat of sc.categories) {
      // Nahw categories are the first 43 (non-sarf, non-vocab)
      nahwCategories.push(cat.percentage);
    }
  }
  if (nahwCategories.length === 0) return -1;
  return nahwCategories.reduce((a, b) => a + b, 0) / nahwCategories.length;
}

function computeTashkhisSarfScore(): number {
  const history = readJson<{ completedAt: number; scorecards: { categories: { categoryId: string; percentage: number }[] }[] }[]>('arabtools-tashkhis-history');
  if (!history || history.length === 0) return -1;
  const latest = history.reduce((a, b) => (a.completedAt > b.completedAt ? a : b));
  // Sarf categories are identified by 'sarf' in their categoryId
  const sarfCats: number[] = [];
  for (const sc of latest.scorecards) {
    for (const cat of sc.categories) {
      if (cat.categoryId.includes('sarf')) {
        sarfCats.push(cat.percentage);
      }
    }
  }
  if (sarfCats.length === 0) return -1;
  return sarfCats.reduce((a, b) => a + b, 0) / sarfCats.length;
}

function computeFstuScore(): number {
  const progress = readJson<Record<string, { mastered?: number; total?: number }>>('arabtools-fstu-progress');
  if (!progress) return -1;
  const entries = Object.values(progress);
  if (entries.length === 0) return -1;
  let totalMastered = 0;
  let totalQuestions = 0;
  for (const entry of entries) {
    totalMastered += entry.mastered ?? 0;
    totalQuestions += entry.total ?? 0;
  }
  if (totalQuestions === 0) return -1;
  return (totalMastered / totalQuestions) * 100;
}

function computeBinaScore(): number {
  const progress = readJson<Record<string, { completed?: boolean }>>('arabtools-bina-progress');
  if (!progress) return -1;
  const completed = Object.values(progress).filter((v) => v?.completed).length;
  if (completed === 0 && Object.keys(progress).length === 0) return -1;
  return (completed / 22) * 100;
}

function computeTarkibBuilderScore(): number {
  const progress = readJson<Record<string, { score?: number }>>('arabtools-tarkib-builder-progress');
  if (!progress) return -1;
  const scores = Object.values(progress).map((v) => v?.score ?? 0).filter((s) => s > 0);
  if (scores.length === 0) return -1;
  return scores.reduce((a, b) => a + b, 0) / scores.length;
}

function computeSarfExScore(): number {
  const state = readJson<{ items?: Record<string, { phase?: string }> }>('arabtools-sarf-ex-state');
  if (!state?.items) return -1;
  const items = Object.values(state.items);
  if (items.length === 0) return -1;
  const reviewItems = items.filter((i) => i?.phase === 'review').length;
  return (reviewItems / items.length) * 100;
}

function computeKalimatScore(): number {
  const progress = readJson<Record<string, { phase?: string }>>('arabtools-kalimat-progress');
  if (!progress) return -1;
  const items = Object.values(progress);
  if (items.length === 0) return -1;
  const mastered = items.filter((i) => i?.phase === 'mastered').length;
  return (mastered / items.length) * 100;
}

function computeMufradatScore(): number {
  const state = readJson<{ items?: Record<string, { reps?: number }> }>('arabtools-srs-state');
  if (!state?.items) return -1;
  const items = Object.values(state.items);
  if (items.length === 0) return -1;
  const active = items.filter((i) => (i?.reps ?? 0) > 0).length;
  return (active / items.length) * 100;
}

function computeHafizScore(): number {
  const state = readJson<{ rubs?: Record<string, { status?: string }> }>('arabtools-hafiz-state');
  if (!state?.rubs) return -1;
  const rubs = Object.values(state.rubs);
  const memorized = rubs.filter((r) => r?.status === 'memorized' || r?.status === 'solid').length;
  return (memorized / 240) * 100;
}

function computeDhakiraScore(): number {
  const stats = readJson<Record<string, { attempts?: number }>>('dhakira-stats');
  if (!stats) return -1;
  const games = Object.values(stats);
  if (games.length === 0) return -1;
  const attempted = games.filter((g) => (g?.attempts ?? 0) > 0).length;
  return (attempted / games.length) * 100;
}

function computeInshaScore(): number {
  const progress = readJson<{
    lessons?: Record<string, boolean>;
    exercises?: Record<string, { score?: number }>;
    compose?: { completed?: number };
  }>('arabtools-insha-progress');
  if (!progress) return -1;
  let score = 0;
  let parts = 0;
  if (progress.lessons) {
    const visited = Object.values(progress.lessons).filter(Boolean).length;
    const total = Object.keys(progress.lessons).length || 1;
    score += (visited / total) * 100 * 0.3;
    parts++;
  }
  if (progress.exercises) {
    const scores = Object.values(progress.exercises).map((e) => e?.score ?? 0);
    if (scores.length > 0) {
      score += (scores.reduce((a, b) => a + b, 0) / scores.length) * 0.4;
      parts++;
    }
  }
  if (progress.compose) {
    const completed = progress.compose.completed ?? 0;
    score += Math.min((completed / 5) * 100, 100) * 0.3;
    parts++;
  }
  if (parts === 0) return -1;
  return score;
}

function computeReadingScore(): number {
  const visited = readJson<string[]>('arabtools-reading-visited');
  if (!visited || !Array.isArray(visited) || visited.length === 0) return -1;
  // Estimate total pages at ~600
  return Math.min((visited.length / 600) * 100, 100);
}

function computeDurusScore(): number {
  const progress = readJson<Record<string, { watched?: boolean }>>('arabtools-durus-progress');
  if (!progress) return -1;
  const entries = Object.values(progress);
  if (entries.length === 0) return -1;
  const watched = entries.filter((e) => e?.watched).length;
  return (watched / entries.length) * 100;
}

// ─── Score computation by tool ID ───

function getToolScore(toolId: string, pillarId: string): number {
  switch (toolId) {
    case 'tashkhis':
      return pillarId === 'morphology' ? computeTashkhisSarfScore() : computeTashkhisNahwScore();
    case 'fstu-exercises':
      return computeFstuScore();
    case 'bina':
      return computeBinaScore();
    case 'tarkib-builder':
      return computeTarkibBuilderScore();
    case 'sarf-exercises':
      return computeSarfExScore();
    case 'kalimat':
      return computeKalimatScore();
    case 'mufradat':
      return computeMufradatScore();
    case 'hafiz':
      return computeHafizScore();
    case 'dhakira':
      return computeDhakiraScore();
    case 'insha-guide':
      return computeInshaScore();
    case 'reading':
      return computeReadingScore();
    case 'durus':
      return computeDurusScore();
    default:
      return -1;
  }
}

// ─── Raw data collector for milestone evaluation ───

function collectRawData(): RawProgressData {
  return {
    tashkhisHistory: readJson('arabtools-tashkhis-history'),
    binaProgress: readJson('arabtools-bina-progress'),
    fstuProgress: readJson('arabtools-fstu-progress'),
    sarfExState: readJson('arabtools-sarf-ex-state'),
    hafizState: readJson('arabtools-hafiz-state'),
    srsState: readJson('arabtools-srs-state'),
    readingVisited: readJson('arabtools-reading-visited'),
    inshaProgress: readJson('arabtools-insha-progress'),
    durusProgress: readJson('arabtools-durus-progress'),
    kalimatProgress: readJson('arabtools-kalimat-progress'),
    dhakiraStats: readJson('dhakira-stats'),
  };
}

// ─── Last active timestamp ───

function getLastActiveTimestamp(): number | null {
  const keys = [
    'arabtools-tashkhis-history',
    'arabtools-bina-progress',
    'arabtools-fstu-progress',
    'arabtools-sarf-ex-state',
    'arabtools-hafiz-state',
    'arabtools-srs-state',
    'arabtools-kalimat-progress',
    'arabtools-insha-progress',
    'arabtools-reading-visited',
    'arabtools-durus-progress',
    'arabtools-srf-ex-history',
    'arabtools-srs-history',
    'arabtools-hafiz-srs',
  ];

  let latest: number | null = null;
  for (const key of keys) {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) continue;
      const data = JSON.parse(raw);
      // Check for common timestamp patterns
      if (Array.isArray(data) && data.length > 0) {
        for (const item of data) {
          const ts = item?.completedAt ?? item?.timestamp ?? item?.date ?? item?.lastReview;
          if (typeof ts === 'number' && (latest === null || ts > latest)) {
            latest = ts;
          }
        }
      } else if (typeof data === 'object' && data !== null) {
        const ts = data.lastUpdated ?? data.lastActive ?? data.timestamp ?? data.lastReview;
        if (typeof ts === 'number' && (latest === null || ts > latest)) {
          latest = ts;
        }
      }
    } catch {
      // skip
    }
  }
  return latest;
}

// ─── Main hook ───

export function useProgressDashboard(): DashboardData {
  return useMemo(() => {
    const rawData = collectRawData();

    // Compute pillar scores
    const pillars: PillarScore[] = PILLAR_CONFIGS.map((config) => {
      const tools: ToolScore[] = config.tools.map((tool) => {
        const score = getToolScore(tool.toolId, config.pillarId);
        return {
          toolId: tool.toolId,
          name: tool.name,
          score: score < 0 ? 0 : Math.round(score),
          hasData: score >= 0,
        };
      });

      // Weighted average — skip tools with no data
      const activeTools = config.tools.filter((_, i) => tools[i].hasData);
      let pillarScore = 0;
      if (activeTools.length > 0) {
        const totalWeight = activeTools.reduce((sum, t) => sum + t.weight, 0);
        pillarScore = activeTools.reduce((sum, t) => {
          const toolIdx = config.tools.indexOf(t);
          return sum + tools[toolIdx].score * (t.weight / totalWeight);
        }, 0);
      }

      return {
        pillarId: config.pillarId,
        nameEn: config.nameEn,
        nameAr: config.nameAr,
        score: Math.round(pillarScore),
        tools,
      };
    });

    // Overall score — average of active pillars
    const activePillars = pillars.filter((p) => p.tools.some((t) => t.hasData));
    const overall =
      activePillars.length > 0
        ? Math.round(activePillars.reduce((sum, p) => sum + p.score, 0) / activePillars.length)
        : 0;

    const milestones = evaluateMilestones(pillars, rawData);
    const lastActive = getLastActiveTimestamp();

    return {
      overall,
      pillars,
      streak: 0, // Streak requires daily tracking not yet implemented
      lastActive,
      milestones,
    };
  }, []);
}
