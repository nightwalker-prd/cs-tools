import { useMemo } from 'react';
import { getAvailableForms, allForms } from '../../data/ilaal/comparison-engine';
import type { ExtendedVerbType } from '../../data/ilaal/types';

interface FormSelectorProps {
  extendedType: ExtendedVerbType;
  selectedForm: string;
  onSelect: (formNumber: string) => void;
}

export function FormSelector({ extendedType, selectedForm, onSelect }: FormSelectorProps) {
  const availableForms = useMemo(() => {
    return getAvailableForms(extendedType);
  }, [extendedType]);

  const availableNumbers = useMemo(() => {
    return new Set(availableForms.map(f => f.number));
  }, [availableForms]);

  return (
    <div className="form-selector">
      <label className="form-selector-label">Form (الباب)</label>
      <div className="form-tabs">
        {allForms.map(form => {
          const isAvailable = availableNumbers.has(form.number);
          const isActive = form.number === selectedForm;

          return (
            <button
              key={form.number}
              className={`form-tab ${isActive ? 'active' : ''} ${!isAvailable ? 'unavailable' : ''}`}
              onClick={() => isAvailable && onSelect(form.number)}
              disabled={!isAvailable}
              title={isAvailable ? `Form ${form.roman} — ${form.arabic}` : `Form ${form.roman} — not available for this verb type`}
            >
              <span className="form-roman">{form.roman}</span>
              <span className="form-arabic font-arabic">{form.arabic}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
