import { describe, it, expect } from 'vitest';
import { calculateLevel, getLevelInfo, addXpEntry } from '../engine/xp-engine';
import { LEVELS } from '../data/levels';
import type { XpState } from '../types/xp';

describe('calculateLevel', () => {
  it('returns level 1 for 0 XP', () => {
    expect(calculateLevel(0, LEVELS)).toBe(1);
  });

  it('returns level 1 for XP below level 2 threshold', () => {
    expect(calculateLevel(50, LEVELS)).toBe(1);
  });

  it('returns level 5 at exactly 1000 XP', () => {
    expect(calculateLevel(1000, LEVELS)).toBe(5);
  });

  it('returns level 10 at exactly 8000 XP', () => {
    expect(calculateLevel(8000, LEVELS)).toBe(10);
  });

  it('returns level 25 at exactly 200000 XP', () => {
    expect(calculateLevel(200000, LEVELS)).toBe(25);
  });

  it('returns max level for XP beyond max', () => {
    expect(calculateLevel(999999, LEVELS)).toBe(25);
  });

  it('returns correct level for mid-range XP', () => {
    // 600 XP should be level 4 (600 required)
    expect(calculateLevel(600, LEVELS)).toBe(4);
    // 599 XP should be level 3 (300 required, next at 600)
    expect(calculateLevel(599, LEVELS)).toBe(3);
  });
});

describe('getLevelInfo', () => {
  it('returns correct info for level 1 with 0 XP', () => {
    const info = getLevelInfo(0, LEVELS);
    expect(info.level).toBe(1);
    expect(info.titleEn).toBe('Beginner');
    expect(info.progress).toBe(0);
    expect(info.xpRequired).toBe(0);
    expect(info.xpForNext).toBe(100);
  });

  it('returns progress fraction between levels', () => {
    // Level 1 (0 XP) → Level 2 (100 XP), at 50 XP = 50% progress
    const info = getLevelInfo(50, LEVELS);
    expect(info.level).toBe(1);
    expect(info.progress).toBeCloseTo(0.5);
  });

  it('returns progress 1 at max level', () => {
    const info = getLevelInfo(200000, LEVELS);
    expect(info.level).toBe(25);
    expect(info.progress).toBe(1);
  });

  it('returns Arabic title', () => {
    const info = getLevelInfo(0, LEVELS);
    expect(info.titleAr).toBe('مُبْتَدِئ');
  });
});

describe('addXpEntry', () => {
  const emptyState: XpState = { totalXp: 0, level: 1, history: [] };

  it('adds XP and updates total', () => {
    const result = addXpEntry(
      emptyState,
      { amount: 10, source: 'exerciseCorrect', sourceApp: 'test' },
      LEVELS,
      1000,
    );
    expect(result.totalXp).toBe(10);
    expect(result.history).toHaveLength(1);
    expect(result.history[0].timestamp).toBe(1000);
  });

  it('updates level when XP crosses threshold', () => {
    const state: XpState = { totalXp: 95, level: 1, history: [] };
    const result = addXpEntry(
      state,
      { amount: 10, source: 'exerciseCorrect', sourceApp: 'test' },
      LEVELS,
      1000,
    );
    expect(result.totalXp).toBe(105);
    expect(result.level).toBe(2);
  });

  it('trims history to 100 entries', () => {
    const fullHistory = Array.from({ length: 100 }, (_, i) => ({
      amount: 1,
      source: 'test',
      sourceApp: 'test',
      timestamp: i,
    }));
    const state: XpState = { totalXp: 100, level: 1, history: fullHistory };
    const result = addXpEntry(
      state,
      { amount: 1, source: 'test', sourceApp: 'test' },
      LEVELS,
      200,
    );
    expect(result.history).toHaveLength(100);
    expect(result.history[99].timestamp).toBe(200);
    expect(result.history[0].timestamp).toBe(1);
  });

  it('returns immutable state', () => {
    const result = addXpEntry(
      emptyState,
      { amount: 10, source: 'test', sourceApp: 'test' },
      LEVELS,
      1000,
    );
    expect(result).not.toBe(emptyState);
    expect(emptyState.totalXp).toBe(0);
  });
});
