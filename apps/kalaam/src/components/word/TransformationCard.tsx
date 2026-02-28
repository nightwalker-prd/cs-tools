import type { ReactNode } from 'react';
import type { Transformation } from '@/types';

interface TransformationCardProps {
  transformation: Transformation;
  isRoot?: boolean;
  isFinal?: boolean;
}

// Color palette for different pieces of a color-coded word
const PIECE_COLORS = ['#2D8C3C', '#1D729B', '#E8751A', '#9333EA', '#DC2626'];

function renderColorCodedArabic(
  arabic: string,
  colorCoding: Record<string, string>,
): ReactNode {
  // The colorCoding object may contain a "pieces" key with sub-pieces
  // that map Arabic text fragments to their meanings.
  // Try to extract pieces for coloring.
  const piecesValue = colorCoding['pieces' as keyof typeof colorCoding];

  if (piecesValue && typeof piecesValue === 'object') {
    const pieces = piecesValue as unknown as Record<string, string[]>;
    const entries = Object.entries(pieces);

    if (entries.length > 0) {
      return (
        <>
          {entries.map(([piece], i) => (
            <span key={i} style={{ color: PIECE_COLORS[i % PIECE_COLORS.length] }}>
              {piece}
            </span>
          ))}
        </>
      );
    }
  }

  return <>{arabic}</>;
}

export default function TransformationCard({ transformation, isRoot, isFinal }: TransformationCardProps) {
  const bgClass = isRoot
    ? 'bg-grammar-root/10 border-grammar-root/20'
    : isFinal
    ? 'bg-primary-light border-primary/20'
    : 'bg-card border-border';

  const textClass = isRoot ? 'text-grammar-root' : 'text-text';

  return (
    <div className={`rounded-xl p-4 border ${bgClass}`}>
      {/* Arabic word */}
      <p className={`font-arabic text-xl text-center ${textClass}`} dir="rtl">
        {transformation.colorCoding
          ? renderColorCodedArabic(transformation.arabic, transformation.colorCoding)
          : transformation.arabic}
      </p>

      {/* Form label */}
      {transformation.form && (
        <p className="text-xs text-center text-text-secondary mt-1 font-arabic" dir="rtl">
          {transformation.form}
        </p>
      )}

      {/* Meaning */}
      <p className="text-sm text-center text-text-secondary mt-2">
        {transformation.meaning}
      </p>

      {/* Notes */}
      {transformation.notes && (
        <p className="text-xs text-center text-text-secondary/70 mt-1.5 leading-relaxed">
          {transformation.notes}
        </p>
      )}
    </div>
  );
}
