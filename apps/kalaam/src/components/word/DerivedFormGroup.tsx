import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import type { DerivedForm } from '@/types';

interface DerivedFormGroupProps {
  form: DerivedForm;
}

export default function DerivedFormGroup({ form }: DerivedFormGroupProps) {
  const [expanded, setExpanded] = useState(false);

  const displayExamples = form.examples.slice(0, 3);

  return (
    <div className="bg-card rounded-xl overflow-hidden">
      <button
        onClick={() => setExpanded((v) => !v)}
        className="w-full flex items-center gap-3 p-3 text-left"
      >
        {/* Grammar color dot */}
        <span
          className="w-2.5 h-2.5 rounded-full shrink-0"
          style={{ backgroundColor: form.grammarColor || '#6B7280' }}
        />

        {/* Left side: meaning + tag + count */}
        <div className="flex-1 min-w-0">
          <p className="text-sm text-text truncate">{form.meaning}</p>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="text-xs text-text-secondary">{form.grammarTag}</span>
            <span className="text-xs text-text-secondary/60">·</span>
            <span className="text-xs text-text-secondary">{form.count}x</span>
          </div>
        </div>

        {/* Right side: Arabic form */}
        <p className="font-arabic text-lg text-text shrink-0" dir="rtl">
          {form.arabic}
        </p>

        {/* Expand chevron */}
        {displayExamples.length > 0 && (
          expanded ? (
            <ChevronUp size={16} className="text-text-secondary shrink-0" />
          ) : (
            <ChevronDown size={16} className="text-text-secondary shrink-0" />
          )
        )}
      </button>

      {/* Expanded examples */}
      {expanded && displayExamples.length > 0 && (
        <div className="px-3 pb-3 space-y-3 border-t border-border/50">
          {displayExamples.map((ex, i) => (
            <div key={i} className="pt-3">
              {/* Reference */}
              <p className="text-xs text-primary font-medium mb-1.5">
                {ex.surahNum}:{ex.ayahNum}
              </p>

              {/* Arabic ayah text */}
              <p className="font-quran text-base leading-loose text-text text-right mb-1" dir="rtl">
                {ex.ayahArabic}
              </p>

              {/* English translation */}
              <p className="text-xs text-text-secondary leading-relaxed">
                {ex.ayahTranslation}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
