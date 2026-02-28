import { useState } from 'react';
import type { DrawingSettings, PenStyle, InkColor } from '@/types';
import { INK_COLORS } from '@/types';
import { SettingsPanel } from './SettingsPanel';

interface ToolbarProps {
  settings: DrawingSettings;
  updateSettings: (updates: Partial<DrawingSettings>) => void;
  isErasing: boolean;
  onToggleEraser: () => void;
  canUndo: boolean;
  canRedo: boolean;
  onUndo: () => void;
  onRedo: () => void;
  onClear: () => void;
  onExport: () => void;
}

const PEN_NIB_CLASS: Record<PenStyle, string> = {
  fine: 'pen-nib-fine',
  marker: 'pen-nib-marker',
  calligraphy: 'pen-nib-calligraphy',
};

export function Toolbar({
  settings,
  updateSettings,
  isErasing,
  onToggleEraser,
  canUndo,
  canRedo,
  onUndo,
  onRedo,
  onClear,
  onExport,
}: ToolbarProps) {
  const [showSettings, setShowSettings] = useState(false);

  return (
    <>
      <div className="toolbar-float">
        {/* Pen style buttons */}
        {(['fine', 'marker', 'calligraphy'] as PenStyle[]).map(pen => (
          <button
            key={pen}
            className={!isErasing && settings.penStyle === pen ? 'active' : ''}
            onClick={() => {
              updateSettings({ penStyle: pen });
              if (isErasing) onToggleEraser();
            }}
            title={pen.charAt(0).toUpperCase() + pen.slice(1)}
          >
            <div className="pen-nib">
              <div className={PEN_NIB_CLASS[pen]} />
            </div>
          </button>
        ))}

        <div className="separator" />

        {/* Ink color buttons */}
        {INK_COLORS.map(ink => (
          <button
            key={ink.value}
            className={!isErasing && settings.inkColor === ink.value ? 'active' : ''}
            onClick={() => {
              updateSettings({ inkColor: ink.value as InkColor });
              if (isErasing) onToggleEraser();
            }}
            title={ink.label}
          >
            <div
              className={`ink-swatch ${!isErasing && settings.inkColor === ink.value ? 'selected' : ''}`}
              style={{ background: ink.value }}
            />
          </button>
        ))}

        <div className="separator" />

        {/* Eraser */}
        <button
          className={isErasing ? 'active' : ''}
          onClick={onToggleEraser}
          title="Eraser"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m7 21-4.3-4.3c-1-1-1-2.5 0-3.4l9.6-9.6c1-1 2.5-1 3.4 0l5.6 5.6c1 1 1 2.5 0 3.4L13 21" />
            <path d="M22 21H7" />
            <path d="m5 11 9 9" />
          </svg>
        </button>

        <div className="separator" />

        {/* Undo / Redo */}
        <button onClick={onUndo} disabled={!canUndo} title="Undo">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 7v6h6" /><path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13" />
          </svg>
        </button>
        <button onClick={onRedo} disabled={!canRedo} title="Redo">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 7v6h-6" /><path d="M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3L21 13" />
          </svg>
        </button>

        <div className="separator" />

        {/* Settings */}
        <button
          className={showSettings ? 'active' : ''}
          onClick={() => setShowSettings(!showSettings)}
          title="Settings"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
        </button>

        {/* More: Clear & Export */}
        <button onClick={onClear} title="Clear page">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
          </svg>
        </button>
        <button onClick={onExport} title="Export as PNG">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
          </svg>
        </button>
      </div>

      {showSettings && (
        <>
          <div className="settings-overlay" onClick={() => setShowSettings(false)} />
          <div className="settings-panel">
            <SettingsPanel settings={settings} updateSettings={updateSettings} />
          </div>
        </>
      )}
    </>
  );
}
