import type { PillarScore, Milestone } from '@/types/progress';

interface MilestoneCheck {
  id: string;
  label: string;
  description: string;
  icon: string;
  check: (pillars: PillarScore[], raw: RawProgressData) => boolean;
}

export interface RawProgressData {
  tashkhisHistory: unknown[] | null;
  binaProgress: Record<string, unknown> | null;
  fstuProgress: Record<string, unknown> | null;
  sarfExState: Record<string, unknown> | null;
  hafizState: Record<string, unknown> | null;
  srsState: Record<string, unknown> | null;
  readingVisited: unknown[] | null;
  inshaProgress: Record<string, unknown> | null;
  durusProgress: Record<string, unknown> | null;
  kalimatProgress: Record<string, unknown> | null;
  dhakiraStats: Record<string, unknown> | null;
}

function hasAnyData(raw: RawProgressData): boolean {
  return Object.values(raw).some((v) => v !== null);
}

function countNahwCategories(raw: RawProgressData): number {
  if (!raw.tashkhisHistory || !Array.isArray(raw.tashkhisHistory) || raw.tashkhisHistory.length === 0) return 0;
  type TashkhisEntry = { completedAt?: number; scorecards?: { categories?: { categoryId?: string; percentage?: number }[] }[] };
  const entries = raw.tashkhisHistory as TashkhisEntry[];
  const latest = entries.reduce((a, b) =>
    (a.completedAt ?? 0) > (b.completedAt ?? 0) ? a : b
  );
  if (!latest.scorecards) return 0;
  let count = 0;
  for (const sc of latest.scorecards) {
    if (sc.categories) count += sc.categories.filter((c) => (c.percentage ?? 0) > 0).length;
  }
  return count;
}

function countBinaCompleted(raw: RawProgressData): number {
  if (!raw.binaProgress) return 0;
  const progress = raw.binaProgress as Record<string, { completed?: boolean }>;
  return Object.values(progress).filter((v) => v?.completed).length;
}

function countHafizRubs(raw: RawProgressData): number {
  if (!raw.hafizState) return 0;
  const state = raw.hafizState as { rubs?: Record<string, { status?: string }> };
  if (!state.rubs) return 0;
  return Object.values(state.rubs).filter((r) => r?.status === 'memorized' || r?.status === 'solid').length;
}

function countSrsReviewItems(raw: RawProgressData): number {
  if (!raw.sarfExState) return 0;
  const state = raw.sarfExState as { items?: Record<string, { phase?: string }> };
  if (!state.items) return 0;
  return Object.values(state.items).filter((i) => i?.phase === 'review').length;
}

function countReadingPages(raw: RawProgressData): number {
  if (!raw.readingVisited || !Array.isArray(raw.readingVisited)) return 0;
  return raw.readingVisited.length;
}

function countFstuCompleted(raw: RawProgressData): number {
  if (!raw.fstuProgress) return 0;
  const progress = raw.fstuProgress as Record<string, { mastered?: number }>;
  return Object.values(progress).reduce((sum, v) => sum + (v?.mastered ?? 0), 0);
}

function countInshaComposeCompleted(raw: RawProgressData): number {
  if (!raw.inshaProgress) return 0;
  const progress = raw.inshaProgress as { compose?: { completed?: number } };
  return progress.compose?.completed ?? 0;
}

function hasActivePillar(pillar: PillarScore): boolean {
  return pillar.tools.some((t) => t.hasData);
}

const MILESTONE_DEFS: MilestoneCheck[] = [
  {
    id: 'first-steps',
    label: 'First Steps',
    description: 'Start using any tool',
    icon: 'Footprints',
    check: (_pillars, raw) => hasAnyData(raw),
  },
  {
    id: 'grammar-explorer',
    label: 'Grammar Explorer',
    description: '5+ nahw categories scored',
    icon: 'GitBranch',
    check: (_pillars, raw) => countNahwCategories(raw) >= 5,
  },
  {
    id: 'word-collector',
    label: 'Word Collector',
    description: '100+ vocabulary items learning/mastered',
    icon: 'BookA',
    check: (_pillars, raw) => {
      if (!raw.srsState) return false;
      const state = raw.srsState as { items?: Record<string, { reps?: number }> };
      if (!state.items) return false;
      return Object.values(state.items).filter((i) => (i?.reps ?? 0) > 0).length >= 100;
    },
  },
  {
    id: 'half-hafiz',
    label: 'Half Hafiz',
    description: '120+ rubs memorized',
    icon: 'BookMarked',
    check: (_pillars, raw) => countHafizRubs(raw) >= 120,
  },
  {
    id: 'sarf-scholar',
    label: 'Sarf Scholar',
    description: '50+ sarf SRS items in review',
    icon: 'Dumbbell',
    check: (_pillars, raw) => countSrsReviewItems(raw) >= 50,
  },
  {
    id: 'prolific-writer',
    label: 'Prolific Writer',
    description: '3+ insha compose tasks completed',
    icon: 'Pencil',
    check: (_pillars, raw) => countInshaComposeCompleted(raw) >= 3,
  },
  {
    id: 'bookworm',
    label: 'Bookworm',
    description: '20+ reading pages visited',
    icon: 'BookOpen',
    check: (_pillars, raw) => countReadingPages(raw) >= 20,
  },
  {
    id: 'drill-master',
    label: 'Drill Master',
    description: '100+ FSTU exercises completed',
    icon: 'ClipboardList',
    check: (_pillars, raw) => countFstuCompleted(raw) >= 100,
  },
  {
    id: 'code-builder',
    label: 'Code Builder',
    description: '10+ Bina challenges completed',
    icon: 'Code',
    check: (_pillars, raw) => countBinaCompleted(raw) >= 10,
  },
  {
    id: 'assessor',
    label: 'Assessor',
    description: 'Completed Tashkhis placement test',
    icon: 'Target',
    check: (_pillars, raw) =>
      raw.tashkhisHistory !== null && Array.isArray(raw.tashkhisHistory) && raw.tashkhisHistory.length > 0,
  },
  {
    id: 'polyglot',
    label: 'Polyglot',
    description: 'Active in all 5 pillars',
    icon: 'Globe',
    check: (pillars) => pillars.every((p) => hasActivePillar(p)),
  },
];

export function evaluateMilestones(pillars: PillarScore[], raw: RawProgressData): Milestone[] {
  return MILESTONE_DEFS.map((def) => ({
    id: def.id,
    label: def.label,
    description: def.description,
    icon: def.icon,
    earned: def.check(pillars, raw),
  }));
}
