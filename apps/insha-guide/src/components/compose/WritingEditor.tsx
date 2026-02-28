import { useState, useEffect, useRef } from 'react';
import type { WordBankCategory } from '../../data/types';
import { WordBankPanel } from './WordBankPanel';

interface WritingEditorProps {
  initialText: string;
  wordBank: WordBankCategory[];
  targetLength: { min: number; max: number };
  onTextChange: (text: string) => void;
  onNext: () => void;
}

function countArabicWords(text: string): number {
  return text.split(/\s+/).filter(w => w.length > 0).length;
}

export function WritingEditor({ initialText, wordBank, targetLength, onTextChange, onNext }: WritingEditorProps) {
  const [text, setText] = useState(initialText);
  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const wordCount = countArabicWords(text);
  const { min, max } = targetLength;

  const progressPct = Math.min((wordCount / max) * 100, 100);
  const barColor = wordCount < min ? 'var(--color-muted-foreground)' : wordCount <= max ? 'var(--color-accent)' : 'var(--color-destructive)';

  useEffect(() => {
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    saveTimerRef.current = setTimeout(() => {
      onTextChange(text);
    }, 3000);
    return () => { if (saveTimerRef.current) clearTimeout(saveTimerRef.current); };
  }, [text, onTextChange]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  // Save immediately before navigating
  const handleNext = () => {
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    onTextChange(text);
    onNext();
  };

  return (
    <div className="compose-editor animate-fade-in">
      <div className="compose-split-view">
        <WordBankPanel wordBank={wordBank} />

        <div className="compose-writing-area">
          <textarea
            className="writing-textarea font-arabic"
            dir="rtl"
            value={text}
            onChange={handleChange}
            placeholder="اكتب هنا..."
          />

          <div className="word-count-section">
            <div className="word-count-bar">
              <div
                className="word-count-bar-fill"
                style={{ width: `${progressPct}%`, backgroundColor: barColor }}
              />
            </div>
            <div className="word-count-label">
              {wordCount} / {min}–{max} words
            </div>
          </div>
        </div>
      </div>

      <div className="compose-nav-actions">
        <button
          className="btn btn-primary"
          disabled={wordCount < min}
          onClick={handleNext}
        >
          Next: Grammar Checklist →
        </button>
      </div>
    </div>
  );
}
