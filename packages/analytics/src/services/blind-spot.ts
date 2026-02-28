import type { ErrorStore } from '../types/errors';
import type { BlindSpot, BlindSpotAnalysis, Severity, TrendDirection } from '../types/blind-spots';

const SEVERITY_MULTIPLIER: Record<Severity, number> = {
  mild: 1,
  moderate: 2,
  severe: 3,
};

const ADVICE_MAP: Record<string, string> = {
  'vocabulary-confusion': 'Review word pairs that look similar. Practice in context.',
  'grammar-error': 'Review the grammar rule. Try constructing examples.',
  'case-ending': 'Focus on i\'raab rules. Practice identifying word positions.',
  'gender-agreement': 'Review masculine/feminine patterns. Check adjective agreement.',
  'verb-conjugation': 'Review the verb forms table. Practice with root variations.',
  'word-order': 'Study sentence structure patterns. Practice with different sentence types.',
};

const FOURTEEN_DAYS_MS = 14 * 24 * 60 * 60 * 1000;

function determineTrendForWord(
  entries: { timestamp: number }[],
  now: number,
): TrendDirection {
  if (entries.length === 0) return 'stable';

  const cutoff = now - FOURTEEN_DAYS_MS;
  const recentCount = entries.filter(e => e.timestamp >= cutoff).length;
  const recentRatio = recentCount / entries.length;

  if (recentRatio > 0.6) return 'worsening';
  if (recentRatio < 0.3) return 'improving';
  return 'stable';
}

function classifySeverity(count: number): Severity {
  if (count >= 10) return 'severe';
  if (count >= 5) return 'moderate';
  return 'mild';
}

/**
 * Analyze blind spots by combining word-level and category-level error patterns.
 * Returns the top N blind spots ranked by weighted score.
 */
export function analyzeBlindSpots(
  store: ErrorStore,
  topN: number,
  now: number,
): BlindSpotAnalysis {
  // Group entries by wordId + category combination
  const groups = new Map<string, typeof store.entries>();

  for (const entry of store.entries) {
    const key = `${entry.wordId}::${entry.category}`;
    const group = groups.get(key) ?? [];
    group.push(entry);
    groups.set(key, group);
  }

  const spots: BlindSpot[] = [];

  for (const [key, entries] of groups) {
    const [wordId, category] = key.split('::');
    const frequency = entries.length;
    const severity = classifySeverity(frequency);
    const trend = determineTrendForWord(entries, now);
    const score = frequency * SEVERITY_MULTIPLIER[severity];

    // Recent examples (last 3)
    const recentExamples = entries.slice(-3).map(e => ({
      expected: e.expected,
      actual: e.actual,
      timestamp: e.timestamp,
    }));

    spots.push({
      category,
      wordId,
      frequency,
      severity,
      trend,
      score,
      advice: ADVICE_MAP[category] ?? 'Review this area and practice more.',
      recentExamples,
    });
  }

  // Sort by score descending, take top N
  spots.sort((a, b) => b.score - a.score);

  return {
    spots: spots.slice(0, topN),
    analyzedAt: now,
    totalErrorsAnalyzed: store.entries.length,
  };
}
