interface FluencyActivityPickerProps {
  hasDrafts: boolean;
  onSelect: (activity: 'sprint' | 'speed-writing' | 'rewrite') => void;
}

export function FluencyActivityPicker({ hasDrafts, onSelect }: FluencyActivityPickerProps) {
  return (
    <div className="fluency-activity-picker">
      <button className="fluency-activity-card" onClick={() => onSelect('sprint')}>
        <div className="fluency-activity-icon">✍️</div>
        <div className="fluency-activity-info">
          <h4>Writing Sprint</h4>
          <p>Timed free-writing on a prompt. Build speed and confidence.</p>
          <span className="fluency-activity-time">5 / 10 / 15 min</span>
        </div>
      </button>

      <button className="fluency-activity-card" onClick={() => onSelect('speed-writing')}>
        <div className="fluency-activity-icon">⚡</div>
        <div className="fluency-activity-info">
          <h4>Speed Writing (4/3/2)</h4>
          <p>Same prompt, 3 rounds with decreasing time. Push your limits.</p>
          <span className="fluency-activity-time">4 + 3 + 2 min</span>
        </div>
      </button>

      <button
        className={`fluency-activity-card ${!hasDrafts ? 'disabled' : ''}`}
        onClick={() => hasDrafts && onSelect('rewrite')}
        disabled={!hasDrafts}
      >
        <div className="fluency-activity-icon">📝</div>
        <div className="fluency-activity-info">
          <h4>Rewrite from Memory</h4>
          <p>Read a previous draft, then rewrite from memory.</p>
          <span className="fluency-activity-time">
            {hasDrafts ? '30s read + free write' : 'Complete a compose first'}
          </span>
        </div>
      </button>
    </div>
  );
}
