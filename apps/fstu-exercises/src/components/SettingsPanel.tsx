import { useRef } from 'react';
import { X } from 'lucide-react';
import type { useProgress } from '../hooks/useProgress';
import type { useAudio } from '../hooks/useAudio';

interface SettingsPanelProps {
  open: boolean;
  onClose: () => void;
  progress: ReturnType<typeof useProgress>;
  audio: ReturnType<typeof useAudio>;
}

export function SettingsPanel({ open, onClose, progress, audio }: SettingsPanelProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!open) return null;

  return (
    <>
      <div className="settings-overlay" onClick={onClose} />
      <div className="settings-panel">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl text-primary">Settings</h2>
          <button onClick={onClose} className="btn" style={{ padding: '0.5rem' }}>
            <X size={18} />
          </button>
        </div>

        {/* Audio Settings */}
        <div className="settings-section">
          <h3>Audio</h3>

          <div className="setting-row">
            <div>
              <div className="setting-label">Enable Audio</div>
              <div className="setting-description">Play Arabic pronunciation</div>
            </div>
            <div
              className={`toggle ${audio.settings.enabled ? 'active' : ''}`}
              onClick={() => audio.updateSettings({ enabled: !audio.settings.enabled })}
            />
          </div>

          <div className="setting-row">
            <div>
              <div className="setting-label">Auto-play on Reveal</div>
              <div className="setting-description">Speak when answer is shown</div>
            </div>
            <div
              className={`toggle ${audio.settings.autoPlay ? 'active' : ''}`}
              onClick={() => audio.updateSettings({ autoPlay: !audio.settings.autoPlay })}
            />
          </div>

          <div className="setting-row">
            <div>
              <div className="setting-label">Speech Rate</div>
              <div className="setting-description">{audio.settings.rate.toFixed(1)}x</div>
            </div>
            <input
              type="range"
              className="range-slider"
              min="0.5"
              max="2"
              step="0.1"
              value={audio.settings.rate}
              onChange={e => audio.updateSettings({ rate: parseFloat(e.target.value) })}
            />
          </div>

          {!audio.isSupported && (
            <div className="text-xs text-failure font-sans mt-2">
              Speech synthesis not supported in this browser
            </div>
          )}
          {audio.isSupported && !audio.hasArabicVoice && (
            <div className="text-xs text-muted-foreground font-sans mt-2">
              No Arabic voice found. Using fallback voice.
            </div>
          )}
        </div>

        {/* Progress Settings */}
        <div className="settings-section">
          <h3>Progress</h3>

          <div className="setting-row">
            <div>
              <div className="setting-label">Export Progress</div>
              <div className="setting-description">Download as JSON file</div>
            </div>
            <button className="btn" onClick={progress.exportProgress}>
              Export
            </button>
          </div>

          <div className="setting-row">
            <div>
              <div className="setting-label">Import Progress</div>
              <div className="setting-description">Merge from JSON file</div>
            </div>
            <button className="btn" onClick={() => fileInputRef.current?.click()}>
              Import
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              className="hidden"
              onChange={e => {
                const file = e.target.files?.[0];
                if (file) progress.importProgress(file);
                e.target.value = '';
              }}
            />
          </div>

          <div className="setting-row">
            <div>
              <div className="setting-label">Reset All Progress</div>
              <div className="setting-description">Cannot be undone</div>
            </div>
            <button
              className="btn"
              style={{ borderColor: 'var(--color-failure)', color: 'var(--color-failure)' }}
              onClick={() => {
                if (window.confirm('Reset all progress? This cannot be undone.')) {
                  progress.resetProgress();
                }
              }}
            >
              Reset
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="settings-section">
          <h3>Statistics</h3>
          <div className="space-y-2 font-sans text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Exercises completed</span>
              <span className="text-foreground">{progress.stats.completed}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Questions mastered</span>
              <span className="text-foreground">{progress.stats.mastered}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Current streak</span>
              <span className="text-foreground">{progress.stats.streak} day{progress.stats.streak !== 1 ? 's' : ''}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
