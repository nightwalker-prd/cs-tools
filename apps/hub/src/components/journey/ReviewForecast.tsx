import type { ReviewForecast as ReviewForecastType } from '@arabtools/analytics/types';

interface ReviewForecastProps {
  forecast: ReviewForecastType[];
}

export function ReviewForecast({ forecast }: ReviewForecastProps) {
  if (forecast.length === 0) return null;

  const maxReviews = Math.max(...forecast.map((f) => f.reviewCount), 1);

  return (
    <div className="review-forecast">
      <div className="forecast-bars">
        {forecast.map((day) => {
          const height = Math.max((day.reviewCount / maxReviews) * 100, day.reviewCount > 0 ? 4 : 0);
          const dateObj = new Date(day.date + 'T12:00:00');
          const label = dateObj.toLocaleDateString('en', { month: 'short', day: 'numeric' });
          const isToday = day.date === new Date().toISOString().slice(0, 10);
          return (
            <div key={day.date} className="forecast-col">
              <div className="forecast-bar-wrapper">
                <div
                  className={`forecast-bar ${isToday ? 'forecast-bar--today' : ''}`}
                  style={{ height: `${height}%` }}
                  title={`${day.date}: ${day.reviewCount} reviews`}
                />
              </div>
              <span className={`forecast-day ${isToday ? 'forecast-day--today' : ''}`}>
                {label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
