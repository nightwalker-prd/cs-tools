import type { GrammarPoint } from '../types';

interface GrammarCardProps {
  grammar: GrammarPoint;
}

export function GrammarCard({ grammar }: GrammarCardProps) {
  return (
    <div className="bg-white rounded-xl border border-gold/30 overflow-hidden">
      <div className="px-4 py-2.5 bg-gold/10 border-b border-gold/20">
        <h4 className="font-serif text-lapis text-sm font-medium">
          <span className="font-arabic text-base">{grammar.titleAr}</span>
          <span className="mx-2 text-parchment-dark/40">|</span>
          <span>{grammar.titleEn}</span>
        </h4>
      </div>
      <div className="p-4 space-y-3">
        <p className="text-sm text-parchment-dark leading-relaxed">
          {grammar.explanation}
        </p>
        <div className="space-y-1.5">
          {grammar.examples.map((ex, i) => (
            <p
              key={i}
              className="text-sm font-arabic bg-parchment-warm/30 rounded px-3 py-1.5"
              dir="rtl"
            >
              {ex}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
