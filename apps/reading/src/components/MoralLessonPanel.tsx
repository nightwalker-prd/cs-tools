import { Lightbulb, ChevronDown } from 'lucide-react';

interface MoralLessonPanelProps {
  moralLessonAr: string;
  moralLesson: string;
  isOpen: boolean;
  onToggle: () => void;
}

export function MoralLessonPanel({ moralLessonAr, moralLesson, isOpen, onToggle }: MoralLessonPanelProps) {
  return (
    <div className="panel-collapsible">
      <button className="panel-header" onClick={onToggle}>
        <div className="panel-header-left">
          <Lightbulb size={16} className="panel-icon" />
          <span className="panel-title">Moral Lesson</span>
        </div>
        <ChevronDown size={16} className={`panel-chevron${isOpen ? ' expanded' : ''}`} />
      </button>

      {isOpen && (
        <div className="panel-body">
          <div className="moral-section">
            <div className="moral-label">Arabic</div>
            <p className="moral-text-ar" dir="rtl">{moralLessonAr}</p>
          </div>
          <div className="moral-section">
            <div className="moral-label">English</div>
            <p className="moral-text-en">{moralLesson}</p>
          </div>
        </div>
      )}
    </div>
  );
}
