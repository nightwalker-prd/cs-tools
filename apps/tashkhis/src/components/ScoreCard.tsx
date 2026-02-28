import { Card } from '@arabtools/ui';
import type { UnitScorecard } from '../types';

const LEVEL_COLORS = {
  beginner: 'bg-destructive',
  intermediate: 'bg-accent',
  advanced: 'bg-success',
};

const LEVEL_LABELS = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
};

interface ScoreCardProps {
  scorecard: UnitScorecard;
}

export function ScoreCard({ scorecard }: ScoreCardProps) {
  return (
    <Card className="p-5">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg text-primary font-medium">{scorecard.unitTitle}</h3>
          <p className="font-arabic text-sm text-accent" dir="rtl">{scorecard.unitTitleAr}</p>
        </div>
        <div className="text-right">
          <span className="text-2xl font-bold text-primary">{scorecard.overallPercentage}%</span>
          <div className={`text-xs px-2 py-0.5 rounded-full text-white mt-1 inline-block ${LEVEL_COLORS[scorecard.proficiencyLevel]}`}>
            {LEVEL_LABELS[scorecard.proficiencyLevel]}
          </div>
        </div>
      </div>

      {/* Category breakdown */}
      <div className="space-y-2.5">
        {scorecard.categories.map(cat => (
          <div key={cat.categoryId}>
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="text-foreground truncate mr-2">{cat.label}</span>
              <span className="text-muted-foreground whitespace-nowrap">
                {cat.questionsCorrect}/{cat.questionsAsked}
                {cat.questionsAsked > 0 && ` (${cat.percentage}%)`}
              </span>
            </div>
            <div className="mini-bar">
              <div
                className={`mini-bar-fill ${LEVEL_COLORS[cat.proficiencyLevel]}`}
                style={{ width: `${Math.max(cat.theta * 100, 2)}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
