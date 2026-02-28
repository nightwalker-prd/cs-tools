import { ArrowDown } from 'lucide-react';
import type { GrammarData } from '@/types';
import TransformationCard from './TransformationCard';

interface GrammarFlowDiagramProps {
  grammarData: GrammarData;
}

export default function GrammarFlowDiagram({ grammarData }: GrammarFlowDiagramProps) {
  const transformations = [...grammarData.transformations].sort((a, b) => a.step - b.step);

  if (transformations.length === 0) return null;

  return (
    <div className="space-y-1">
      <h3 className="text-sm font-semibold text-text mb-3">Word Derivation</h3>

      <div className="flex flex-col items-center gap-0">
        {transformations.map((t, i) => (
          <div key={t.step} className="w-full flex flex-col items-center">
            {/* Arrow between cards */}
            {i > 0 && (
              <div className="py-1.5">
                <ArrowDown size={18} className="text-text-secondary/40" />
              </div>
            )}

            {/* Transformation card */}
            <div className="w-full">
              <TransformationCard
                transformation={t}
                isRoot={i === 0}
                isFinal={i === transformations.length - 1}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
