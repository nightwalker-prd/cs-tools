interface StatsPanelProps {
  algorithm: string;
  timeComplexity: { best: string; average: string; worst: string };
  spaceComplexity: string;
  currentStep: number;
  totalSteps: number;
  stable?: boolean;
}

export function StatsPanel({ algorithm, timeComplexity, spaceComplexity, currentStep, totalSteps, stable }: StatsPanelProps) {
  return (
    <div className="bg-[#161B22] rounded-md border border-[#30363D] p-4 space-y-4">
      <h3 className="text-sm font-semibold text-[#E6EDF3]">{algorithm}</h3>
      <div className="space-y-2">
        <div className="text-xs text-[#8B949E]">Time Complexity</div>
        <div className="grid grid-cols-3 gap-2">
          <div className="text-center">
            <div className="text-xs text-[#8B949E]">Best</div>
            <div className="text-sm font-mono text-[#3FB950]">{timeComplexity.best}</div>
          </div>
          <div className="text-center">
            <div className="text-xs text-[#8B949E]">Avg</div>
            <div className="text-sm font-mono text-[#D29922]">{timeComplexity.average}</div>
          </div>
          <div className="text-center">
            <div className="text-xs text-[#8B949E]">Worst</div>
            <div className="text-sm font-mono text-[#F85149]">{timeComplexity.worst}</div>
          </div>
        </div>
      </div>
      <div>
        <div className="text-xs text-[#8B949E]">Space</div>
        <div className="text-sm font-mono text-[#D2A8FF]">{spaceComplexity}</div>
      </div>
      <div>
        <div className="text-xs text-[#8B949E]">Stable</div>
        <div className="text-sm text-[#E6EDF3]">{stable ? 'Yes' : 'No'}</div>
      </div>
      <div>
        <div className="text-xs text-[#8B949E]">Progress</div>
        <div className="text-sm font-mono text-[#E6EDF3]">Step {currentStep + 1} / {totalSteps}</div>
        <div className="mt-1 h-1.5 bg-[#21262D] rounded-full overflow-hidden">
          <div className="h-full bg-[#58A6FF] rounded-full transition-all" style={{ width: `${totalSteps > 0 ? ((currentStep + 1) / totalSteps) * 100 : 0}%` }} />
        </div>
      </div>
    </div>
  );
}
