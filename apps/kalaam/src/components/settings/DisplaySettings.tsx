import type { KalaamSettings } from '@/lib/settings';

interface DisplaySettingsProps {
  settings: KalaamSettings;
  onUpdate: (partial: Partial<KalaamSettings>) => void;
}

export default function DisplaySettings({ settings, onUpdate }: DisplaySettingsProps) {
  // Round to 1 decimal for display
  const fontSizeDisplay = Math.round(settings.fontSize * 10) / 10;

  return (
    <div className="bg-card rounded-2xl p-5">
      <h2 className="text-lg font-semibold text-text mb-4">Display Settings</h2>

      <div className="space-y-5">
        {/* Font size slider */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-text">Arabic font size</label>
            <span className="text-sm font-bold text-primary">{fontSizeDisplay}x</span>
          </div>
          <input
            type="range"
            min={0.8}
            max={1.5}
            step={0.1}
            value={settings.fontSize}
            onChange={(e) => onUpdate({ fontSize: parseFloat(e.target.value) })}
            className="w-full h-2 bg-border/50 rounded-full appearance-none cursor-pointer
              accent-primary [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:rounded-full
              [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:appearance-none
              [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white
              [&::-webkit-slider-thumb]:shadow-md"
          />
          <div className="flex justify-between text-xs text-text-secondary mt-1">
            <span>0.8x</span>
            <span>1.5x</span>
          </div>

          {/* Preview text */}
          <div className="mt-3 p-3 bg-white rounded-lg border border-border text-center">
            <p
              className="font-arabic text-text leading-relaxed"
              style={{ fontSize: `${settings.fontSize * 1.5}rem` }}
            >
              بِسْمِ اللَّهِ الرَّحْمَـٰنِ الرَّحِيمِ
            </p>
            <p className="text-xs text-text-secondary mt-1">Preview</p>
          </div>
        </div>

        {/* Show transliteration toggle */}
        <div className="flex items-center justify-between">
          <div>
            <label className="text-sm font-medium text-text block">Show transliteration</label>
            <p className="text-xs text-text-secondary mt-0.5">
              Display romanized text alongside Arabic
            </p>
          </div>
          <button
            role="switch"
            aria-checked={settings.showTransliteration}
            onClick={() => onUpdate({ showTransliteration: !settings.showTransliteration })}
            className={`relative w-11 h-6 rounded-full transition-colors shrink-0 ml-3 ${
              settings.showTransliteration ? 'bg-primary' : 'bg-border'
            }`}
          >
            <span
              className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm
                transition-transform ${settings.showTransliteration ? 'translate-x-5' : 'translate-x-0'}`}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
