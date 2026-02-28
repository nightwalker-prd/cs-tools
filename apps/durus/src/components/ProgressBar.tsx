interface ProgressBarProps {
  watched: number;
  total: number;
  showLabel?: boolean;
}

export function ProgressBar({ watched, total, showLabel = true }: ProgressBarProps) {
  const pct = total > 0 ? Math.round((watched / total) * 100) : 0;

  return (
    <div className="progress-bar-container">
      <div className="progress-bar-track">
        <div className="progress-bar-fill" style={{ width: `${pct}%` }} />
      </div>
      {showLabel && (
        <div className="progress-bar-label">
          {watched}/{total} watched ({pct}%)
        </div>
      )}
    </div>
  );
}
