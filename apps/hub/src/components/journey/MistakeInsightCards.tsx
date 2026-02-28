import { AlertTriangle, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import type { BlindSpotAnalysis } from '@arabtools/analytics/types';

interface MistakeInsightCardsProps {
  analysis: BlindSpotAnalysis;
}

const SEVERITY_COLORS: Record<string, string> = {
  mild: 'var(--color-accent, #c5a253)',
  moderate: '#e67e22',
  severe: 'var(--color-destructive, #d4183d)',
};

function TrendIcon({ trend }: { trend: string }) {
  if (trend === 'improving') return <TrendingDown size={14} style={{ color: 'var(--progress-green, #228b22)' }} />;
  if (trend === 'worsening') return <TrendingUp size={14} style={{ color: 'var(--color-destructive, #d4183d)' }} />;
  return <Minus size={14} style={{ color: 'var(--color-muted-foreground)' }} />;
}

function formatCategory(cat: string): string {
  return cat.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

export function MistakeInsightCards({ analysis }: MistakeInsightCardsProps) {
  if (analysis.spots.length === 0) return null;

  return (
    <div className="mistake-cards">
      {analysis.spots.map((spot) => (
        <div key={`${spot.category}-${spot.wordId}`} className="mistake-card">
          <div className="mistake-card-header">
            <span
              className="mistake-severity-badge"
              style={{ borderColor: SEVERITY_COLORS[spot.severity] ?? SEVERITY_COLORS.mild }}
            >
              <AlertTriangle size={12} />
              {spot.severity}
            </span>
            <span className="mistake-category">{formatCategory(spot.category)}</span>
            <TrendIcon trend={spot.trend} />
          </div>
          <p className="mistake-advice">{spot.advice}</p>
          {spot.recentExamples.length > 0 && (
            <div className="mistake-examples">
              {spot.recentExamples.slice(0, 2).map((ex, i) => (
                <div key={i} className="mistake-example">
                  <span className="mistake-expected" dir="rtl">{ex.expected}</span>
                  <span className="mistake-arrow">→</span>
                  <span className="mistake-actual" dir="rtl">{ex.actual}</span>
                </div>
              ))}
            </div>
          )}
          <span className="mistake-freq">{spot.frequency} occurrences</span>
        </div>
      ))}
    </div>
  );
}
