import type { DrawingSettings, LinePattern } from '@/types';

interface SettingsPanelProps {
  settings: DrawingSettings;
  updateSettings: (updates: Partial<DrawingSettings>) => void;
}

const LINE_PATTERNS: { value: LinePattern; label: string }[] = [
  { value: 'lined', label: 'Lined' },
  { value: 'grid', label: 'Grid' },
  { value: 'blank', label: 'Blank' },
];

export function SettingsPanel({ settings, updateSettings }: SettingsPanelProps) {
  return (
    <div className="space-y-4">
      <h3>Settings</h3>

      {/* Line Pattern */}
      <div>
        <label className="settings-label">Line Pattern</label>
        <div className="settings-row">
          {LINE_PATTERNS.map(lp => (
            <button
              key={lp.value}
              onClick={() => updateSettings({ linePattern: lp.value })}
              className={`settings-chip ${settings.linePattern === lp.value ? 'active' : ''}`}
            >
              {lp.label}
            </button>
          ))}
        </div>
      </div>

      {/* Pen Size */}
      <div>
        <label className="settings-label">
          Pen Size: {settings.penSize}
        </label>
        <div className="settings-size-preview">
          <div
            style={{
              width: settings.penSize,
              height: settings.penSize,
              borderRadius: '50%',
              background: 'var(--color-accent)',
            }}
          />
        </div>
        <input
          type="range"
          min="1"
          max="24"
          value={settings.penSize}
          onChange={e => updateSettings({ penSize: Number(e.target.value) })}
          className="settings-slider"
        />
      </div>
    </div>
  );
}
