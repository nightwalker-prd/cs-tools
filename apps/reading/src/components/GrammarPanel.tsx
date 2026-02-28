import { GraduationCap, ChevronDown } from 'lucide-react';

interface GrammarPanelProps {
  concepts: string[];
  isOpen: boolean;
  onToggle: () => void;
}

export function GrammarPanel({ concepts, isOpen, onToggle }: GrammarPanelProps) {
  return (
    <div className="panel-collapsible">
      <button className="panel-header" onClick={onToggle}>
        <div className="panel-header-left">
          <GraduationCap size={16} className="panel-icon" />
          <span className="panel-title">Grammar Concepts</span>
          <span className="panel-count">({concepts.length})</span>
        </div>
        <ChevronDown size={16} className={`panel-chevron${isOpen ? ' expanded' : ''}`} />
      </button>

      {isOpen && (
        <div className="panel-body">
          {concepts.map((concept, idx) => (
            <div key={idx} className="grammar-item">
              <span className="grammar-bullet">&#8226;</span>
              <span className="grammar-text">{concept}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
