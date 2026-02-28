import { BookOpen, ChevronDown } from 'lucide-react';
import type { VocabularyHighlight } from '../data/reading';

interface VocabularyPanelProps {
  items: VocabularyHighlight[];
  isOpen: boolean;
  onToggle: () => void;
}

export function VocabularyPanel({ items, isOpen, onToggle }: VocabularyPanelProps) {
  return (
    <div className="panel-collapsible">
      <button className="panel-header" onClick={onToggle}>
        <div className="panel-header-left">
          <BookOpen size={16} className="panel-icon" />
          <span className="panel-title">Key Vocabulary</span>
          <span className="panel-count">({items.length})</span>
        </div>
        <ChevronDown size={16} className={`panel-chevron${isOpen ? ' expanded' : ''}`} />
      </button>

      {isOpen && (
        <div className="panel-body">
          {items.map((vocab, idx) => (
            <div key={idx} className="vocab-item">
              <span className="vocab-word" dir="rtl">{vocab.word}</span>
              <span className="vocab-meaning">{vocab.meaning}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
