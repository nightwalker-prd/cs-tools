import { describe, it, expect } from 'vitest';
import {
  calculateImplicitCredit,
  applyImplicitCredit,
  getCreditDecay,
} from '../engine/implicit-credit';
import { buildGraph } from '../graph/prerequisite-graph';
import type { PrerequisiteEdge } from '../types/graph';
import type { SrsItem } from '../types/items';

// ─── Helpers ────────────────────────────────────────────────────

function makeItem(contentId: string, stability: number = 5): SrsItem {
  return {
    id: `srs-${contentId}`,
    pillar: 'grammar',
    difficulty: 'beginner',
    phase: 'review',
    stability,
    difficulty_score: 5,
    elapsed_days: 5,
    scheduled_days: 5,
    reps: 3,
    lapses: 0,
    last_review: Date.now() - 5 * 24 * 60 * 60 * 1000,
    due: Date.now(),
    contentId,
    contentType: 'grammar-topic',
  };
}

/**
 * Simple linear graph: A → B → C → D
 */
function makeLinearGraph() {
  const edges: PrerequisiteEdge[] = [
    { from: 'A', to: 'B' },
    { from: 'B', to: 'C' },
    { from: 'C', to: 'D' },
  ];
  return buildGraph(edges);
}

/**
 * Diamond graph:
 *     A
 *    / \
 *   B   C
 *    \ /
 *     D
 */
function makeDiamondGraph() {
  const edges: PrerequisiteEdge[] = [
    { from: 'A', to: 'B' },
    { from: 'A', to: 'C' },
    { from: 'B', to: 'D' },
    { from: 'C', to: 'D' },
  ];
  return buildGraph(edges);
}

// ─── getCreditDecay ─────────────────────────────────────────────

describe('getCreditDecay', () => {
  it('returns 1.0 for 0 hops', () => {
    expect(getCreditDecay(0)).toBe(1.0);
  });

  it('returns 0.5 for 1 hop', () => {
    expect(getCreditDecay(1)).toBe(0.5);
  });

  it('returns 0.3 for 2 hops', () => {
    expect(getCreditDecay(2)).toBe(0.3);
  });

  it('returns 0.15 for 3 hops', () => {
    expect(getCreditDecay(3)).toBe(0.15);
  });

  it('returns 0 for 4+ hops', () => {
    expect(getCreditDecay(4)).toBe(0);
    expect(getCreditDecay(10)).toBe(0);
  });

  it('returns 0 for negative hops', () => {
    expect(getCreditDecay(-1)).toBe(0);
  });
});

// ─── calculateImplicitCredit ────────────────────────────────────

describe('calculateImplicitCredit', () => {
  it('returns empty for Again (quality 0) response', () => {
    const graph = makeLinearGraph();
    const credits = calculateImplicitCredit(graph, 'D', 0);
    expect(credits).toEqual([]);
  });

  it('gives credit to direct prerequisites', () => {
    const graph = makeLinearGraph();
    const credits = calculateImplicitCredit(graph, 'D', 2); // Good

    const cCredit = credits.find(c => c.topicId === 'C');
    expect(cCredit).toBeDefined();
    expect(cCredit!.hops).toBe(1);
    expect(cCredit!.credit).toBeCloseTo(0.5 * (2 / 3), 2); // decay * qualityFactor
  });

  it('propagates credit through multiple hops', () => {
    const graph = makeLinearGraph();
    const credits = calculateImplicitCredit(graph, 'D', 3); // Easy

    expect(credits).toHaveLength(3); // C (1 hop), B (2 hops), A (3 hops)

    const cCredit = credits.find(c => c.topicId === 'C');
    const bCredit = credits.find(c => c.topicId === 'B');
    const aCredit = credits.find(c => c.topicId === 'A');

    expect(cCredit!.hops).toBe(1);
    expect(bCredit!.hops).toBe(2);
    expect(aCredit!.hops).toBe(3);

    // Credit should decay with distance
    expect(cCredit!.credit).toBeGreaterThan(bCredit!.credit);
    expect(bCredit!.credit).toBeGreaterThan(aCredit!.credit);
  });

  it('handles diamond graphs without duplicate credit', () => {
    const graph = makeDiamondGraph();
    const credits = calculateImplicitCredit(graph, 'D', 2);

    // Should have B (1 hop), C (1 hop), A (2 hops)
    const topicIds = credits.map(c => c.topicId);
    expect(topicIds).toContain('B');
    expect(topicIds).toContain('C');
    expect(topicIds).toContain('A');

    // A should appear only once
    const aCredits = credits.filter(c => c.topicId === 'A');
    expect(aCredits).toHaveLength(1);
    expect(aCredits[0].hops).toBe(2);
  });

  it('returns empty for root nodes with no prerequisites', () => {
    const graph = makeLinearGraph();
    const credits = calculateImplicitCredit(graph, 'A', 3);
    expect(credits).toEqual([]);
  });

  it('gives more credit for Easy (3) than Good (2)', () => {
    const graph = makeLinearGraph();
    const creditsGood = calculateImplicitCredit(graph, 'B', 2);
    const creditsEasy = calculateImplicitCredit(graph, 'B', 3);

    const goodA = creditsGood.find(c => c.topicId === 'A')!;
    const easyA = creditsEasy.find(c => c.topicId === 'A')!;

    expect(easyA.credit).toBeGreaterThan(goodA.credit);
  });
});

// ─── applyImplicitCredit ────────────────────────────────────────

describe('applyImplicitCredit', () => {
  it('returns items unchanged when credits are empty', () => {
    const items = [makeItem('A'), makeItem('B')];
    const result = applyImplicitCredit(items, []);
    expect(result).toBe(items); // same reference
  });

  it('boosts stability of credited items', () => {
    const items = [makeItem('A', 10), makeItem('B', 10)];
    const credits = [{ topicId: 'A', credit: 0.5, hops: 1 }];

    const result = applyImplicitCredit(items, credits);

    const itemA = result.find(i => i.contentId === 'A')!;
    const itemB = result.find(i => i.contentId === 'B')!;

    expect(itemA.stability).toBeGreaterThan(10); // boosted
    expect(itemB.stability).toBe(10); // unchanged
  });

  it('does not boost new items', () => {
    const items = [{ ...makeItem('A', 10), phase: 'new' as const }];
    const credits = [{ topicId: 'A', credit: 0.5, hops: 1 }];

    const result = applyImplicitCredit(items, credits);
    expect(result[0].stability).toBe(10); // unchanged
  });

  it('applies credit proportionally to stability', () => {
    const items = [makeItem('A', 20), makeItem('B', 10)];
    const credits = [
      { topicId: 'A', credit: 0.5, hops: 1 },
      { topicId: 'B', credit: 0.5, hops: 1 },
    ];

    const result = applyImplicitCredit(items, credits);
    const boostA = result.find(i => i.contentId === 'A')!.stability - 20;
    const boostB = result.find(i => i.contentId === 'B')!.stability - 10;

    // Item A should get a larger absolute boost (proportional to stability)
    expect(boostA).toBeGreaterThan(boostB);
  });

  it('takes max credit when multiple assignments exist for same topic', () => {
    const items = [makeItem('A', 10)];
    const credits = [
      { topicId: 'A', credit: 0.3, hops: 2 },
      { topicId: 'A', credit: 0.5, hops: 1 },
    ];

    const result = applyImplicitCredit(items, credits);
    // Should use max credit (0.5), not sum (0.8)
    // boost = 10 * 0.1 * 0.5 = 0.5
    expect(result[0].stability).toBeCloseTo(10.5, 1);
  });
});
