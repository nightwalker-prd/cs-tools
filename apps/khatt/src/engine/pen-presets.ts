import type { StrokeOptions } from 'perfect-freehand';
import type { PenStyle } from '@/types';

export const PEN_PRESETS: Record<PenStyle, StrokeOptions> = {
  fine: {
    size: 3,
    thinning: 0.5,
    smoothing: 0.5,
    streamline: 0.5,
    simulatePressure: false,
    start: { taper: true },
    end: { taper: true },
  },
  marker: {
    size: 12,
    thinning: 0.1,
    smoothing: 0.8,
    streamline: 0.3,
    simulatePressure: false,
    start: { taper: false },
    end: { taper: false },
  },
  calligraphy: {
    size: 8,
    thinning: 0.9,
    smoothing: 0.4,
    streamline: 0.2,
    simulatePressure: false,
    start: { taper: 20 },
    end: { taper: 20 },
  },
};

export function getPenPreset(style: PenStyle, sizeOverride?: number): StrokeOptions {
  const preset = PEN_PRESETS[style];
  return sizeOverride != null ? { ...preset, size: sizeOverride } : preset;
}
