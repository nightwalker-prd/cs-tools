import type { GrammarChecklistItem } from '../../data/types';

interface GrammarChecklistProps {
  items: GrammarChecklistItem[];
  checked: string[];
  onToggle: (id: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export function GrammarChecklist({ items, checked, onToggle, onNext, onBack }: GrammarChecklistProps) {
  const requiredIds = items.filter(i => i.required).map(i => i.id);
  const allRequiredChecked = requiredIds.every(id => checked.includes(id));

  return (
    <div className="compose-checklist animate-fade-in">
      <p className="compose-checklist-instruction">
        Review your writing and check off each grammar point you've used.
      </p>

      <div className="checklist-items">
        {items.map(item => (
          <label key={item.id} className={`checklist-item ${item.required ? 'required' : ''}`}>
            <input
              type="checkbox"
              checked={checked.includes(item.id)}
              onChange={() => onToggle(item.id)}
            />
            <div className="checklist-item-content">
              <div className="checklist-item-label">
                <span>{item.labelEn}</span>
                {item.required && <span className="required-badge">Required</span>}
              </div>
              <span className="checklist-item-ar font-arabic">{item.labelAr}</span>
              {item.examples.length > 0 && (
                <div className="checklist-examples font-arabic" dir="rtl">
                  {item.examples.join(' ، ')}
                </div>
              )}
            </div>
          </label>
        ))}
      </div>

      <div className="compose-nav-actions">
        <button className="btn" onClick={onBack}>← Back to Editor</button>
        <button
          className="btn btn-primary"
          disabled={!allRequiredChecked}
          onClick={onNext}
        >
          Next: Self-Assessment →
        </button>
      </div>
    </div>
  );
}
