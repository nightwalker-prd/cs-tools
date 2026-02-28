import { Play, Square, Eye, EyeOff, AlertCircle } from 'lucide-react';

interface TextToolbarProps {
  showTranslation: boolean;
  onToggleTranslation: () => void;
  hideDiacritics: boolean;
  onToggleDiacritics: () => void;
  isPlaying: boolean;
  onPlay: () => void;
  onStop: () => void;
  isSupported: boolean;
  hasArabicVoice: boolean;
}

export function TextToolbar({
  showTranslation,
  onToggleTranslation,
  hideDiacritics,
  onToggleDiacritics,
  isPlaying,
  onPlay,
  onStop,
  isSupported,
  hasArabicVoice,
}: TextToolbarProps) {
  return (
    <div className="text-toolbar">
      {isSupported && (
        isPlaying ? (
          <button className="toolbar-btn stop" onClick={onStop}>
            <Square size={14} />
            Stop
          </button>
        ) : (
          <button className="toolbar-btn play" onClick={onPlay}>
            <Play size={14} />
            Play
          </button>
        )
      )}

      {isSupported && !hasArabicVoice && (
        <span className="toolbar-warning">
          <AlertCircle size={12} />
          No Arabic voice
        </span>
      )}

      <span className="toolbar-spacer" />

      <button
        className={`toolbar-btn${showTranslation ? ' active' : ''}`}
        onClick={onToggleTranslation}
      >
        {showTranslation ? <EyeOff size={14} /> : <Eye size={14} />}
        Translation
      </button>

      <button
        className={`toolbar-btn${hideDiacritics ? ' active' : ''}`}
        onClick={onToggleDiacritics}
      >
        {hideDiacritics ? <Eye size={14} /> : <EyeOff size={14} />}
        Tashkeel
      </button>
    </div>
  );
}
