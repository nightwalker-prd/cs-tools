import { VerbType } from '../utils/verbTypeDetection';
import { getAvailableForms, allForms } from '../utils/conjugationGenerator';

interface FormSelectorProps {
  verbType: VerbType;
  selectedForm: string;
  onSelectForm: (form: string) => void;
}

export function FormSelector({ verbType, selectedForm, onSelectForm }: FormSelectorProps) {
  const availableForms = getAvailableForms(verbType);
  const availableFormNumbers = availableForms.map(f => f.number);

  return (
    <div className="flex items-center gap-4 flex-wrap">
      <span className="text-sm text-muted-foreground">Form:</span>
      <div className="flex flex-wrap gap-2">
        {allForms.map((form) => {
          const isAvailable = availableFormNumbers.includes(form.number);
          const isSelected = selectedForm === form.number;

          return (
            <button
              key={form.number}
              onClick={() => isAvailable && onSelectForm(form.number)}
              disabled={!isAvailable}
              title={isAvailable ? `${form.arabic} - Form ${form.roman}` : 'Not available for this verb type'}
              className={`px-3 py-1 text-xs rounded-lg border transition-all ${
                !isAvailable
                  ? 'bg-gray-50 text-gray-300 border-gray-200 cursor-not-allowed'
                  : isSelected
                    ? 'bg-accent text-white border-accent'
                    : 'bg-white text-primary border-gray-300 hover:border-accent'
              }`}
            >
              {form.roman}
            </button>
          );
        })}
      </div>

      {availableForms.length === 0 && (
        <p className="text-sm text-red-600">
          No forms available for this verb type
        </p>
      )}
    </div>
  );
}
