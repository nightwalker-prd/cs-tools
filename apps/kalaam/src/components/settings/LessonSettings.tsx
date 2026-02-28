import type { KalaamSettings } from '@/lib/settings';

interface LessonSettingsProps {
  settings: KalaamSettings;
  onUpdate: (partial: Partial<KalaamSettings>) => void;
}

export default function LessonSettings({ settings, onUpdate }: LessonSettingsProps) {
  return (
    <div className="bg-card rounded-2xl p-5">
      <h2 className="text-lg font-semibold text-text mb-4">Lesson Settings</h2>

      <div className="space-y-5">
        {/* New words per day */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-text">New words per day</label>
            <span className="text-sm font-bold text-primary">{settings.newPerDay}</span>
          </div>
          <input
            type="range"
            min={1}
            max={20}
            step={1}
            value={settings.newPerDay}
            onChange={(e) => onUpdate({ newPerDay: parseInt(e.target.value, 10) })}
            className="w-full h-2 bg-border/50 rounded-full appearance-none cursor-pointer
              accent-primary [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:rounded-full
              [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:appearance-none
              [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white
              [&::-webkit-slider-thumb]:shadow-md"
          />
          <div className="flex justify-between text-xs text-text-secondary mt-1">
            <span>1</span>
            <span>20</span>
          </div>
        </div>

        {/* Max reviews per session */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-text">Max reviews per session</label>
            <span className="text-sm font-bold text-primary">{settings.maxReviews}</span>
          </div>
          <input
            type="range"
            min={5}
            max={50}
            step={5}
            value={settings.maxReviews}
            onChange={(e) => onUpdate({ maxReviews: parseInt(e.target.value, 10) })}
            className="w-full h-2 bg-border/50 rounded-full appearance-none cursor-pointer
              accent-primary [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:rounded-full
              [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:appearance-none
              [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white
              [&::-webkit-slider-thumb]:shadow-md"
          />
          <div className="flex justify-between text-xs text-text-secondary mt-1">
            <span>5</span>
            <span>50</span>
          </div>
        </div>

        {/* Delay grammar toggle */}
        <div className="flex items-center justify-between">
          <div>
            <label className="text-sm font-medium text-text block">Delay grammar</label>
            <p className="text-xs text-text-secondary mt-0.5">
              Hide grammar breakdowns in flashcards until word is learned
            </p>
          </div>
          <button
            role="switch"
            aria-checked={settings.delayGrammar}
            onClick={() => onUpdate({ delayGrammar: !settings.delayGrammar })}
            className={`relative w-11 h-6 rounded-full transition-colors shrink-0 ml-3 ${
              settings.delayGrammar ? 'bg-primary' : 'bg-border'
            }`}
          >
            <span
              className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm
                transition-transform ${settings.delayGrammar ? 'translate-x-5' : 'translate-x-0'}`}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
