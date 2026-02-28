interface StreakCalendarProps {
  activityMap: Record<string, number>;
  currentStreak: number;
}

function getIntensityClass(count: number): string {
  if (count === 0) return 'cal-cell--empty';
  if (count <= 3) return 'cal-cell--low';
  if (count <= 10) return 'cal-cell--med';
  if (count <= 20) return 'cal-cell--high';
  return 'cal-cell--max';
}

function getLast90Days(): string[] {
  const days: string[] = [];
  const now = new Date();
  for (let i = 89; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    days.push(d.toISOString().slice(0, 10));
  }
  return days;
}

export function StreakCalendar({ activityMap, currentStreak }: StreakCalendarProps) {
  const days = getLast90Days();
  const totalActive = days.filter((d) => (activityMap[d] ?? 0) > 0).length;

  return (
    <div className="streak-calendar">
      <div className="streak-calendar-header">
        <span className="streak-calendar-stat">
          {currentStreak} day streak
        </span>
        <span className="streak-calendar-stat">
          {totalActive}/90 days active
        </span>
      </div>
      <div className="streak-calendar-grid">
        {days.map((date) => {
          const count = activityMap[date] ?? 0;
          return (
            <div
              key={date}
              className={`cal-cell ${getIntensityClass(count)}`}
              title={`${date}: ${count} reviews`}
            />
          );
        })}
      </div>
      <div className="streak-calendar-legend">
        <span className="streak-calendar-legend-label">Less</span>
        <div className="cal-cell cal-cell--empty" />
        <div className="cal-cell cal-cell--low" />
        <div className="cal-cell cal-cell--med" />
        <div className="cal-cell cal-cell--high" />
        <div className="cal-cell cal-cell--max" />
        <span className="streak-calendar-legend-label">More</span>
      </div>
    </div>
  );
}
