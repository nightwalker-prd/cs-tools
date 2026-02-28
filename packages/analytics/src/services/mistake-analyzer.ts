import type { ErrorCategory, ErrorStore } from '../types/errors';
import type { Severity, TrendDirection } from '../types/blind-spots';

export interface MistakePattern {
  category: ErrorCategory;
  frequency: number;
  severity: Severity;
  trend: TrendDirection;
  examples: { expected: string; actual: string }[];
}

const FOURTEEN_DAYS_MS = 14 * 24 * 60 * 60 * 1000;

function classifySeverity(count: number): Severity {
  if (count >= 10) return 'severe';
  if (count >= 5) return 'moderate';
  return 'mild';
}

function determineTrend(entries: { timestamp: number }[], now: number): TrendDirection {
  if (entries.length === 0) return 'stable';

  const cutoff = now - FOURTEEN_DAYS_MS;
  const recentCount = entries.filter(e => e.timestamp >= cutoff).length;
  const recentRatio = recentCount / entries.length;

  if (recentRatio > 0.6) return 'worsening';
  if (recentRatio < 0.3) return 'improving';
  return 'stable';
}

/**
 * Analyze mistake patterns by grouping errors by category.
 * Returns patterns sorted by frequency (descending).
 */
export function analyzeMistakes(store: ErrorStore, now: number): MistakePattern[] {
  const grouped = new Map<ErrorCategory, typeof store.entries>();

  for (const entry of store.entries) {
    const group = grouped.get(entry.category) ?? [];
    group.push(entry);
    grouped.set(entry.category, group);
  }

  const patterns: MistakePattern[] = [];

  for (const [category, entries] of grouped) {
    // Take last 5 entries as examples
    const recentEntries = entries.slice(-5);
    patterns.push({
      category,
      frequency: entries.length,
      severity: classifySeverity(entries.length),
      trend: determineTrend(entries, now),
      examples: recentEntries.map(e => ({ expected: e.expected, actual: e.actual })),
    });
  }

  // Sort by frequency descending
  patterns.sort((a, b) => b.frequency - a.frequency);

  return patterns;
}
