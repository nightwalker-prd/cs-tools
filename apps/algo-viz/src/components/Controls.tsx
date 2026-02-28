import { Play, Pause, SkipBack, SkipForward, RotateCcw } from 'lucide-react';
import { Button } from '@cstools/ui';

interface ControlsProps {
  isPlaying: boolean;
  onPlay: () => void;
  onPause: () => void;
  onStepForward: () => void;
  onStepBack: () => void;
  onReset: () => void;
  speed: number;
  onSpeedChange: (speed: number) => void;
  canStepForward: boolean;
  canStepBack: boolean;
}

export function Controls({
  isPlaying, onPlay, onPause, onStepForward, onStepBack, onReset,
  speed, onSpeedChange, canStepForward, canStepBack,
}: ControlsProps) {
  return (
    <div className="flex items-center gap-2 p-3 bg-[#161B22] rounded-md border border-[#30363D]">
      <Button variant="ghost" size="icon" onClick={onReset} className="text-[#8B949E] hover:text-[#E6EDF3]">
        <RotateCcw className="w-4 h-4" />
      </Button>
      <Button variant="ghost" size="icon" onClick={onStepBack} disabled={!canStepBack} className="text-[#8B949E] hover:text-[#E6EDF3]">
        <SkipBack className="w-4 h-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={isPlaying ? onPause : onPlay}
        disabled={!canStepForward && !isPlaying}
        className="text-[#58A6FF] hover:text-[#79C0FF]"
      >
        {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
      </Button>
      <Button variant="ghost" size="icon" onClick={onStepForward} disabled={!canStepForward} className="text-[#8B949E] hover:text-[#E6EDF3]">
        <SkipForward className="w-4 h-4" />
      </Button>
      <div className="flex items-center gap-2 ml-4 border-l border-[#30363D] pl-4">
        <span className="text-xs text-[#8B949E]">Speed:</span>
        <input
          type="range"
          min="0.25"
          max="4"
          step="0.25"
          value={speed}
          onChange={(e) => onSpeedChange(parseFloat(e.target.value))}
          className="w-20 accent-[#58A6FF]"
        />
        <span className="text-xs font-mono text-[#E6EDF3] w-8">{speed}x</span>
      </div>
    </div>
  );
}
