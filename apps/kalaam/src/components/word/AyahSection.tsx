import { useState, type ReactNode } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface AyahSectionProps {
  ayahArabic?: string;
  ayahTranslation?: string;
  targetWord?: string;
}

function highlightWord(text: string, word: string): ReactNode {
  if (!word || !text.includes(word)) {
    return <>{text}</>;
  }

  const parts = text.split(word);
  return (
    <>
      {parts.map((part, i) => (
        <span key={i}>
          {part}
          {i < parts.length - 1 && (
            <span className="text-primary font-bold">{word}</span>
          )}
        </span>
      ))}
    </>
  );
}

function highlightTranslation(text: string): ReactNode {
  // Look for words wrapped in brackets or quotation marks as potential highlights
  return <>{text}</>;
}

export default function AyahSection({ ayahArabic, ayahTranslation, targetWord }: AyahSectionProps) {
  const [expanded, setExpanded] = useState(true);

  if (!ayahArabic && !ayahTranslation) return null;

  return (
    <div className="bg-card rounded-xl overflow-hidden">
      <button
        onClick={() => setExpanded((v) => !v)}
        className="w-full flex items-center justify-between p-4 text-left"
      >
        <h3 className="text-sm font-semibold text-text">Ayah</h3>
        {expanded ? (
          <ChevronUp size={18} className="text-text-secondary" />
        ) : (
          <ChevronDown size={18} className="text-text-secondary" />
        )}
      </button>

      {expanded && (
        <div className="px-4 pb-4 space-y-3">
          {ayahArabic && (
            <p className="font-quran text-xl leading-loose text-text text-right" dir="rtl">
              {targetWord ? highlightWord(ayahArabic, targetWord) : ayahArabic}
            </p>
          )}

          {ayahTranslation && (
            <p className="text-sm text-text-secondary leading-relaxed">
              {highlightTranslation(ayahTranslation)}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
