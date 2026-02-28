import type { FiqhTerm } from '../types';
import { TermTooltip } from './TermTooltip';

interface ArabicTextBlockProps {
  textAr: string;
  terms: FiqhTerm[];
  showTermHighlights: boolean;
}

export function ArabicTextBlock({ textAr, terms, showTermHighlights }: ArabicTextBlockProps) {
  const paragraphs = textAr.split(/\n\n+/);

  return (
    <div className="arabic-text-block">
      <div className="arabic-text" dir="rtl">
        {paragraphs.map((para, i) => (
          <p key={i} style={{ marginBottom: i < paragraphs.length - 1 ? '1rem' : 0 }}>
            {showTermHighlights ? (
              <TermTooltip textAr={para} terms={terms} />
            ) : (
              para
            )}
          </p>
        ))}
      </div>
    </div>
  );
}
