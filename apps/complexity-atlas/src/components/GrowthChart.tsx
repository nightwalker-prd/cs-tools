import { useState, useMemo } from 'react';
import { Card, CardContent } from '@cstools/ui';

const N_OPTIONS = [10, 100, 1000, 10000] as const;

interface ComplexityClass {
  name: string;
  fn: (n: number) => number;
  color: string;
  bgColor: string;
  tier: 'excellent' | 'good' | 'fair' | 'poor';
}

const COMPLEXITY_CLASSES: ComplexityClass[] = [
  {
    name: 'O(1)',
    fn: () => 1,
    color: 'text-[#3FB950]',
    bgColor: 'bg-[#3FB950]',
    tier: 'excellent',
  },
  {
    name: 'O(log n)',
    fn: (n) => Math.log2(n),
    color: 'text-[#3FB950]',
    bgColor: 'bg-[#3FB950]',
    tier: 'excellent',
  },
  {
    name: 'O(n)',
    fn: (n) => n,
    color: 'text-[#D29922]',
    bgColor: 'bg-[#D29922]',
    tier: 'good',
  },
  {
    name: 'O(n log n)',
    fn: (n) => n * Math.log2(n),
    color: 'text-[#D29922]',
    bgColor: 'bg-[#D29922]',
    tier: 'good',
  },
  {
    name: 'O(n\u00B2)',
    fn: (n) => n * n,
    color: 'text-[#E3B341]',
    bgColor: 'bg-[#E3B341]',
    tier: 'fair',
  },
  {
    name: 'O(2^n)',
    fn: (n) => Math.pow(2, Math.min(n, 40)),
    color: 'text-[#F85149]',
    bgColor: 'bg-[#F85149]',
    tier: 'poor',
  },
];

function formatValue(val: number): string {
  if (val >= 1e15) return '> 10^15';
  if (val >= 1e12) return `${(val / 1e12).toFixed(1)}T`;
  if (val >= 1e9) return `${(val / 1e9).toFixed(1)}B`;
  if (val >= 1e6) return `${(val / 1e6).toFixed(1)}M`;
  if (val >= 1e3) return `${(val / 1e3).toFixed(1)}K`;
  if (val >= 100) return val.toFixed(0);
  if (val >= 1) return val.toFixed(1);
  return val.toFixed(2);
}

export function GrowthChart() {
  const [n, setN] = useState<number>(100);

  const barData = useMemo(() => {
    const rawValues = COMPLEXITY_CLASSES.map(c => ({
      ...c,
      rawValue: c.fn(n),
    }));

    // Use log scale for the bar widths to make them all visible
    // O(1) would be invisible otherwise at large n
    const logValues = rawValues.map(v => ({
      ...v,
      logValue: Math.log2(v.rawValue + 1),
    }));

    const maxLog = Math.max(...logValues.map(v => v.logValue));

    return logValues.map(v => ({
      ...v,
      widthPercent: maxLog > 0 ? Math.max((v.logValue / maxLog) * 100, 2) : 2,
    }));
  }, [n]);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-[#E6EDF3]">Complexity Growth Chart</h3>
        <p className="text-sm text-[#8B949E]">
          See how different complexity classes scale as input size grows
        </p>
      </div>

      {/* Input size selector */}
      <div className="flex items-center gap-3">
        <span className="text-sm text-[#8B949E]">n =</span>
        <div className="flex gap-2">
          {N_OPTIONS.map(option => (
            <button
              key={option}
              onClick={() => setN(option)}
              className={`px-4 py-1.5 rounded-md text-sm font-mono border transition-colors ${
                n === option
                  ? 'bg-[#58A6FF]/15 border-[#58A6FF] text-[#58A6FF]'
                  : 'bg-[#0D1117] border-[#30363D] text-[#8B949E] hover:border-[#58A6FF]/50 hover:text-[#E6EDF3]'
              }`}
            >
              {option.toLocaleString()}
            </button>
          ))}
        </div>
      </div>

      {/* Chart */}
      <Card className="bg-[#161B22] border-[#30363D]">
        <CardContent className="p-6 space-y-4">
          {barData.map(item => (
            <div key={item.name} className="space-y-1">
              <div className="flex items-center justify-between text-sm">
                <span className={`font-mono font-medium ${item.color}`}>
                  {item.name}
                </span>
                <span className="font-mono text-[#8B949E] text-xs">
                  {formatValue(item.rawValue)} ops
                </span>
              </div>
              <div className="h-6 w-full bg-[#0D1117] rounded-md overflow-hidden border border-[#21262D]">
                <div
                  className={`h-full ${item.bgColor} rounded-md transition-all duration-500 ease-out`}
                  style={{
                    width: `${item.widthPercent}%`,
                    opacity: 0.7,
                  }}
                />
              </div>
            </div>
          ))}

          {/* Legend */}
          <div className="pt-4 border-t border-[#21262D] flex flex-wrap gap-x-6 gap-y-2 text-xs text-[#8B949E]">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm bg-[#3FB950] opacity-70" />
              <span>Excellent</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm bg-[#D29922] opacity-70" />
              <span>Fair</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm bg-[#E3B341] opacity-70" />
              <span>Slow</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm bg-[#F85149] opacity-70" />
              <span>Infeasible for large n</span>
            </div>
          </div>

          {/* Scale note */}
          <p className="text-xs text-[#484F58] italic">
            Bar widths use logarithmic scale for readability. Actual values shown on the right.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
