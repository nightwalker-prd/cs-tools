import { useState, useCallback, useRef } from 'react';
import { Download, Upload, Trash2, Check, AlertTriangle } from 'lucide-react';
import {
  exportAllData,
  importAllData,
  clearAllSrsData,
} from '@arabtools/srs';
import type { SrsExport } from '@arabtools/srs';
import { STORAGE_KEY as SETTINGS_KEY } from '@/lib/settings';

const KALAAM_KEYS = [
  SETTINGS_KEY,          // kalaam-settings
  'kalaam-streak',
  'kalaam-bookmarks',
  'kalaam-srs-seeded',
] as const;

interface BackupData {
  version: 1;
  exportedAt: number;
  srs: SrsExport;
  kalaam: Record<string, string | null>;
}

type FeedbackState =
  | { type: 'idle' }
  | { type: 'success'; message: string }
  | { type: 'error'; message: string };

export default function DataExport() {
  const [feedback, setFeedback] = useState<FeedbackState>({ type: 'idle' });
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const showFeedback = useCallback((state: FeedbackState) => {
    setFeedback(state);
    if (state.type !== 'idle') {
      setTimeout(() => setFeedback({ type: 'idle' }), 3000);
    }
  }, []);

  // ── Export ────────────────────────────────────────────
  const handleExport = useCallback(() => {
    try {
      const srs = exportAllData();

      // Collect kalaam-specific localStorage entries
      const kalaam: Record<string, string | null> = {};
      for (const key of KALAAM_KEYS) {
        kalaam[key] = localStorage.getItem(key);
      }

      const backup: BackupData = {
        version: 1,
        exportedAt: Date.now(),
        srs,
        kalaam,
      };

      const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const date = new Date().toISOString().slice(0, 10);
      const a = document.createElement('a');
      a.href = url;
      a.download = `kalaam-backup-${date}.json`;
      a.click();
      URL.revokeObjectURL(url);

      showFeedback({ type: 'success', message: 'Progress exported successfully!' });
    } catch {
      showFeedback({ type: 'error', message: 'Failed to export progress.' });
    }
  }, [showFeedback]);

  // ── Import ────────────────────────────────────────────
  const handleImport = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = () => {
        try {
          const raw = JSON.parse(reader.result as string) as BackupData;

          // Validate structure
          if (raw.version !== 1 || !raw.srs || !raw.kalaam) {
            throw new Error('Invalid backup file format');
          }

          // Restore SRS data
          importAllData(raw.srs);

          // Restore kalaam-specific data
          for (const [key, value] of Object.entries(raw.kalaam)) {
            if (value !== null) {
              localStorage.setItem(key, value);
            }
          }

          showFeedback({ type: 'success', message: 'Progress restored! Reloading...' });
          setTimeout(() => window.location.reload(), 1500);
        } catch (err) {
          const message =
            err instanceof Error ? err.message : 'Failed to import backup.';
          showFeedback({ type: 'error', message });
        }
      };

      reader.readAsText(file);

      // Reset input so same file can be selected again
      e.target.value = '';
    },
    [showFeedback],
  );

  // ── Reset ─────────────────────────────────────────────
  const handleReset = useCallback(() => {
    try {
      // Clear SRS data
      clearAllSrsData();

      // Clear kalaam-specific keys
      for (const key of KALAAM_KEYS) {
        localStorage.removeItem(key);
      }

      showFeedback({ type: 'success', message: 'Progress reset. Reloading...' });
      setTimeout(() => window.location.reload(), 1500);
    } catch {
      showFeedback({ type: 'error', message: 'Failed to reset progress.' });
    }
  }, [showFeedback]);

  return (
    <div className="bg-card rounded-2xl p-5">
      <h2 className="text-lg font-semibold text-text mb-4">Data</h2>

      {/* Feedback banner */}
      {feedback.type !== 'idle' && (
        <div
          className={`flex items-center gap-2 p-3 rounded-lg mb-4 text-sm font-medium ${
            feedback.type === 'success'
              ? 'bg-success/10 text-success'
              : 'bg-danger/10 text-danger'
          }`}
        >
          {feedback.type === 'success' ? <Check size={16} /> : <AlertTriangle size={16} />}
          {feedback.message}
        </div>
      )}

      <div className="space-y-3">
        {/* Export */}
        <button
          onClick={handleExport}
          className="w-full flex items-center gap-3 p-3 rounded-xl bg-white border border-border
            hover:bg-card-hover transition-colors text-left"
        >
          <div className="w-9 h-9 rounded-lg bg-primary-light flex items-center justify-center shrink-0">
            <Download size={18} className="text-primary" />
          </div>
          <div>
            <span className="text-sm font-medium text-text block">Export Progress</span>
            <span className="text-xs text-text-secondary">
              Download SRS data and settings as JSON
            </span>
          </div>
        </button>

        {/* Import */}
        <button
          onClick={handleImport}
          className="w-full flex items-center gap-3 p-3 rounded-xl bg-white border border-border
            hover:bg-card-hover transition-colors text-left"
        >
          <div className="w-9 h-9 rounded-lg bg-accent-light flex items-center justify-center shrink-0">
            <Upload size={18} className="text-accent" />
          </div>
          <div>
            <span className="text-sm font-medium text-text block">Import Progress</span>
            <span className="text-xs text-text-secondary">
              Restore from a JSON backup file
            </span>
          </div>
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept=".json"
          onChange={handleFileChange}
          className="hidden"
        />

        {/* Reset */}
        {!showResetConfirm ? (
          <button
            onClick={() => setShowResetConfirm(true)}
            className="w-full flex items-center gap-3 p-3 rounded-xl bg-white border border-danger/20
              hover:bg-danger/5 transition-colors text-left"
          >
            <div className="w-9 h-9 rounded-lg bg-danger/10 flex items-center justify-center shrink-0">
              <Trash2 size={18} className="text-danger" />
            </div>
            <div>
              <span className="text-sm font-medium text-danger block">Reset Progress</span>
              <span className="text-xs text-text-secondary">
                Clear all learning data and start fresh
              </span>
            </div>
          </button>
        ) : (
          <div className="p-4 rounded-xl bg-danger/5 border border-danger/20">
            <p className="text-sm font-medium text-danger mb-1">Are you sure?</p>
            <p className="text-xs text-text-secondary mb-3">
              This will permanently delete all your learning progress. This action cannot be undone.
            </p>
            <div className="flex gap-2">
              <button
                onClick={handleReset}
                className="flex-1 py-2 px-3 text-sm font-medium text-white bg-danger rounded-lg
                  hover:bg-danger/90 transition-colors"
              >
                Yes, reset everything
              </button>
              <button
                onClick={() => setShowResetConfirm(false)}
                className="flex-1 py-2 px-3 text-sm font-medium text-text bg-white rounded-lg
                  border border-border hover:bg-card-hover transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
