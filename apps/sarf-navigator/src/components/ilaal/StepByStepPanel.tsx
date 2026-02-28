import type { IlaalStep, IlaalRuleType } from '../../data/ilaal/types';

interface StepByStepPanelProps {
  steps: IlaalStep[];
}

const ruleColors: Record<IlaalRuleType, string> = {
  qalb: '#9333ea',      // purple
  naql: '#2563eb',      // blue
  hadhf: '#dc2626',     // red
  taskeen: '#059669',   // green
  idghaam: '#ea580c',   // orange
  takhfeef: '#0891b2',  // cyan
  ibdaal: '#7c3aed',    // violet
  "ta'weed": '#ca8a04', // amber
};

export function StepByStepPanel({ steps }: StepByStepPanelProps) {
  if (steps.length === 0) return null;

  return (
    <div className="step-by-step-panel">
      <div className="steps-list">
        {steps.map((step, i) => (
          <div key={i} className="step-item">
            <div className="step-number">{i + 1}</div>
            <div className="step-content">
              <div className="step-transformation">
                <span className="font-arabic step-before">{step.before}</span>
                <span className="step-arrow">→</span>
                <span className="font-arabic step-after">{step.after}</span>
              </div>
              <div className="step-meta">
                <span
                  className="rule-type-badge"
                  style={{ backgroundColor: ruleColors[step.ruleType] }}
                >
                  {step.ruleNameAr}
                </span>
                <span className="step-explanation">{step.explanation}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
