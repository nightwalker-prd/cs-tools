import { useRef } from 'react';
import { ReciterSelector } from '../audio/ReciterSelector';
import type { HafizSettings } from '../../types';

interface SettingsPageProps {
  settings: HafizSettings;
  onUpdateSettings: (updates: Partial<HafizSettings>) => void;
}

const STORAGE_KEYS_PREFIX = 'arabtools-hafiz-';

export function SettingsPage({ settings, onUpdateSettings }: SettingsPageProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExport = () => {
    const data: Record<string, string> = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(STORAGE_KEYS_PREFIX)) {
        const value = localStorage.getItem(key);
        if (value !== null) {
          data[key] = value;
        }
      }
    }

    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `hafiz-backup-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target?.result as string);
        if (typeof data !== 'object' || data === null) {
          alert('Invalid backup file format.');
          return;
        }

        let imported = 0;
        for (const [key, value] of Object.entries(data)) {
          if (key.startsWith(STORAGE_KEYS_PREFIX) && typeof value === 'string') {
            localStorage.setItem(key, value);
            imported++;
          }
        }

        alert(`Imported ${imported} item(s). Reloading...`);
        window.location.reload();
      } catch {
        alert('Failed to parse backup file.');
      }
    };
    reader.readAsText(file);

    // Reset input so same file can be selected again
    e.target.value = '';
  };

  return (
    <div className="settings-page fade-in-up">
      <div className="page-header">
        <h2>Settings</h2>
        <p className="page-subtitle">Configure your memorization preferences</p>
      </div>

      <div className="settings-section">
        <h3 className="section-title">Audio</h3>
        <ReciterSelector
          value={settings.reciterId}
          onChange={(reciterId) => onUpdateSettings({ reciterId })}
        />
      </div>

      <div className="settings-section">
        <h3 className="section-title">Daily Goals</h3>

        <div className="settings-field">
          <label className="form-label" htmlFor="daily-new-target">
            Daily New Rub&apos; Target
          </label>
          <p className="settings-field-hint">
            Number of new rub&apos; to learn each day
          </p>
          <input
            id="daily-new-target"
            type="number"
            className="form-input"
            min={1}
            max={30}
            value={settings.dailyNewTarget}
            onChange={(e) =>
              onUpdateSettings({
                dailyNewTarget: Math.max(1, parseInt(e.target.value, 10) || 1),
              })
            }
          />
        </div>

        <div className="settings-field">
          <label className="form-label" htmlFor="revision-session-size">
            Revision Session Size
          </label>
          <p className="settings-field-hint">
            Number of rub&apos; per revision session
          </p>
          <input
            id="revision-session-size"
            type="number"
            className="form-input"
            min={1}
            max={50}
            value={settings.revisionSessionSize}
            onChange={(e) =>
              onUpdateSettings({
                revisionSessionSize: Math.max(
                  1,
                  parseInt(e.target.value, 10) || 1,
                ),
              })
            }
          />
        </div>
      </div>

      <div className="settings-section">
        <h3 className="section-title">SRS Settings</h3>

        <div className="settings-field">
          <label className="form-label" htmlFor="max-srs-interval">
            Max SRS Interval (days)
          </label>
          <p className="settings-field-hint">
            Maximum number of days between reviews
          </p>
          <input
            id="max-srs-interval"
            type="number"
            className="form-input"
            min={7}
            max={365}
            value={settings.maxSrsInterval}
            onChange={(e) =>
              onUpdateSettings({
                maxSrsInterval: Math.max(7, parseInt(e.target.value, 10) || 30),
              })
            }
          />
        </div>
      </div>

      <div className="settings-section">
        <h3 className="section-title">Data</h3>

        <div className="settings-data-actions">
          <button className="btn btn-primary" onClick={handleExport}>
            Export Data
          </button>
          <button className="btn btn-ghost" onClick={handleImport}>
            Import Data
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            className="settings-file-input"
            onChange={handleFileChange}
          />
        </div>

        <p className="settings-data-hint">
          Export saves all hafiz data as a JSON backup. Import restores from a
          previously exported file.
        </p>
      </div>
    </div>
  );
}
