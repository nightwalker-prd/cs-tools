import type { DerivativeType } from '../types';

const DERIVATIVE_COLORS: Record<DerivativeType, { bg: string; text: string; border: string }> = {
  masdar: { bg: 'bg-blue-100', text: 'text-blue-800', border: 'border-blue-200' },
  'ism-fail': { bg: 'bg-emerald-100', text: 'text-emerald-800', border: 'border-emerald-200' },
  'ism-maful': { bg: 'bg-purple-100', text: 'text-purple-800', border: 'border-purple-200' },
};

const DERIVATIVE_LABELS: Record<DerivativeType, { ar: string; en: string }> = {
  masdar: { ar: 'المصدر', en: 'Masdar' },
  'ism-fail': { ar: 'اسم الفاعل', en: "Ism Fa'il" },
  'ism-maful': { ar: 'اسم المفعول', en: "Ism Maf'ul" },
};

interface DerivativeTypeBadgeProps {
  type: DerivativeType;
  showEnglish?: boolean;
}

export function DerivativeTypeBadge({ type, showEnglish = false }: DerivativeTypeBadgeProps) {
  const colors = DERIVATIVE_COLORS[type];
  const label = DERIVATIVE_LABELS[type];

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 text-xs font-medium rounded-full border ${colors.bg} ${colors.text} ${colors.border}`}
    >
      <span className="font-arabic" dir="rtl">{label.ar}</span>
      {showEnglish && <span className="opacity-70">({label.en})</span>}
    </span>
  );
}

export { DERIVATIVE_LABELS };
