import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface ExplanationSectionProps {
  info: string;
}

export default function ExplanationSection({ info }: ExplanationSectionProps) {
  const [expanded, setExpanded] = useState(false);

  if (!info) return null;

  return (
    <div className="bg-card rounded-xl overflow-hidden">
      <button
        onClick={() => setExpanded((v) => !v)}
        className="w-full flex items-center justify-between p-4 text-left"
      >
        <h3 className="text-sm font-semibold text-text">Explanation</h3>
        {expanded ? (
          <ChevronUp size={18} className="text-text-secondary" />
        ) : (
          <ChevronDown size={18} className="text-text-secondary" />
        )}
      </button>

      {expanded && (
        <div className="px-4 pb-4">
          <p className="text-sm text-text-secondary leading-relaxed">{info}</p>
        </div>
      )}
    </div>
  );
}
