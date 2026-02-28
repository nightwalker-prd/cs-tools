import { useState } from 'react';
import { Input, Card, CardContent } from '@cstools/ui';

const complexities = [
  { name: 'O(1)', fn: () => 1 },
  { name: 'O(log n)', fn: (n: number) => Math.log2(n) },
  { name: 'O(n)', fn: (n: number) => n },
  { name: 'O(n log n)', fn: (n: number) => n * Math.log2(n) },
  { name: 'O(n\u00B2)', fn: (n: number) => n * n },
  { name: 'O(n\u00B3)', fn: (n: number) => n * n * n },
  { name: 'O(2^n)', fn: (n: number) => Math.pow(2, Math.min(n, 40)) },
];

function formatOps(ops: number): string {
  if (ops > 1e15) return '> 10^15 (infeasible)';
  if (ops > 1e12) return `${(ops / 1e12).toFixed(1)} trillion`;
  if (ops > 1e9) return `${(ops / 1e9).toFixed(1)} billion`;
  if (ops > 1e6) return `${(ops / 1e6).toFixed(1)} million`;
  if (ops > 1e3) return `${(ops / 1e3).toFixed(1)} thousand`;
  return ops.toFixed(0);
}

export function Calculator() {
  const [n, setN] = useState(1000);

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-[#E6EDF3]">Input Size Calculator</h3>
      <p className="text-sm text-[#8B949E]">See how many operations each complexity class requires for a given input size.</p>
      <div className="flex items-center gap-3">
        <span className="text-sm text-[#8B949E]">n =</span>
        <Input
          type="number"
          value={n}
          onChange={(e) => setN(parseInt(e.target.value) || 0)}
          className="w-40 bg-[#0D1117] border-[#30363D] font-mono"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {complexities.map(c => (
          <Card key={c.name} className="bg-[#161B22] border-[#30363D]">
            <CardContent className="p-4">
              <div className="text-sm font-mono text-[#58A6FF]">{c.name}</div>
              <div className="text-lg font-bold text-[#E6EDF3] mt-1">{formatOps(c.fn(n))}</div>
              <div className="text-xs text-[#8B949E]">operations</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
