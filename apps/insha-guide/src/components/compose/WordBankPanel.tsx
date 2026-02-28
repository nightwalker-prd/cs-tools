import { useState } from 'react';
import type { WordBankCategory } from '../../data/types';

interface WordBankPanelProps {
  wordBank: WordBankCategory[];
}

export function WordBankPanel({ wordBank }: WordBankPanelProps) {
  const [copiedWord, setCopiedWord] = useState<string | null>(null);
  const [collapsed, setCollapsed] = useState(false);

  const handleCopy = (word: string) => {
    navigator.clipboard.writeText(word);
    setCopiedWord(word);
    setTimeout(() => setCopiedWord(null), 1200);
  };

  return (
    <div className={`word-bank-panel ${collapsed ? 'collapsed' : ''}`}>
      <button className="word-bank-toggle" onClick={() => setCollapsed(!collapsed)}>
        <span>Word Bank</span>
        <span className="font-arabic">بنك الكلمات</span>
        <span className="toggle-icon">{collapsed ? '▸' : '▾'}</span>
      </button>

      {!collapsed && (
        <div className="word-bank-categories">
          {wordBank.map((cat, ci) => (
            <div key={ci} className="word-bank-category">
              <div className="word-bank-category-title">
                <span>{cat.categoryEn}</span>
                <span className="font-arabic">{cat.categoryAr}</span>
              </div>
              <div className="word-bank-words">
                {cat.words.map((w, wi) => (
                  <button
                    key={wi}
                    className={`word-bank-item ${copiedWord === w.arabic ? 'copied' : ''}`}
                    onClick={() => handleCopy(w.arabic)}
                    title={w.english}
                  >
                    <span className="font-arabic" dir="rtl">{w.arabic}</span>
                    {copiedWord === w.arabic && <span className="copied-badge">Copied!</span>}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
