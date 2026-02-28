import { Flame, Clock } from 'lucide-react';
import type { DashboardData } from '@/types/progress';
import { CircularProgress } from './CircularProgress';
import { MilestoneChip } from './MilestoneChip';

interface ScoreCardProps {
  data: DashboardData;
}

function formatTimeAgo(timestamp: number): string {
  const diff = Date.now() - timestamp;
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return 'just now';
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  const weeks = Math.floor(days / 7);
  return `${weeks}w ago`;
}

export function ScoreCard({ data }: ScoreCardProps) {
  const earnedMilestones = data.milestones.filter((m) => m.earned);
  const unearnedMilestones = data.milestones.filter((m) => !m.earned);

  return (
    <div className="scorecard">
      <div className="scorecard-top">
        <CircularProgress value={data.overall} size={110} strokeWidth={10} />
        <div className="scorecard-info">
          <h2 className="scorecard-title">Overall Progress</h2>
          <div className="scorecard-stats">
            {data.streak > 0 && (
              <span className="scorecard-stat">
                <Flame size={16} />
                {data.streak}-day streak
              </span>
            )}
            {data.lastActive && (
              <span className="scorecard-stat">
                <Clock size={16} />
                Last: {formatTimeAgo(data.lastActive)}
              </span>
            )}
          </div>
        </div>
      </div>

      {data.milestones.length > 0 && (
        <div className="scorecard-milestones">
          {earnedMilestones.map((m) => (
            <MilestoneChip key={m.id} milestone={m} />
          ))}
          {unearnedMilestones.map((m) => (
            <MilestoneChip key={m.id} milestone={m} />
          ))}
        </div>
      )}
    </div>
  );
}
