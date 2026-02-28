import type { XpEntry } from '@arabtools/gamification/types';

interface XpChartProps {
  xpHistory: XpEntry[];
}

function getLast14Days(): string[] {
  const days: string[] = [];
  const now = new Date();
  for (let i = 13; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    days.push(d.toISOString().slice(0, 10));
  }
  return days;
}

export function XpChart({ xpHistory }: XpChartProps) {
  const days = getLast14Days();

  // Aggregate XP by day
  const dailyXp: Record<string, number> = {};
  for (const entry of xpHistory) {
    const date = new Date(entry.timestamp).toISOString().slice(0, 10);
    dailyXp[date] = (dailyXp[date] ?? 0) + entry.amount;
  }

  const values = days.map((d) => dailyXp[d] ?? 0);
  const maxVal = Math.max(...values, 1);

  return (
    <div className="xp-chart">
      <div className="xp-chart-bars">
        {days.map((date, i) => {
          const val = values[i];
          const height = Math.max((val / maxVal) * 100, val > 0 ? 4 : 0);
          const dayLabel = new Date(date + 'T12:00:00').toLocaleDateString('en', { weekday: 'narrow' });
          return (
            <div key={date} className="xp-chart-col">
              <div className="xp-chart-bar-wrapper">
                <div
                  className="xp-chart-bar"
                  style={{ height: `${height}%` }}
                  title={`${date}: ${val} XP`}
                />
              </div>
              <span className="xp-chart-day">{dayLabel}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
