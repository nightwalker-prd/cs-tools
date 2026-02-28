import type { GrammarData } from '@/types';
import DerivedFormGroup from './DerivedFormGroup';

interface UsagesTabProps {
  grammarData: GrammarData;
}

export default function UsagesTab({ grammarData }: UsagesTabProps) {
  const { derivedForms } = grammarData;

  const totalOccurrences = derivedForms.reduce((sum, f) => sum + f.count, 0);
  const formCount = derivedForms.length;

  // Display root letters spaced out
  const rootDisplay = grammarData.root
    ? grammarData.root.split('').join(' ')
    : grammarData.lemma;

  return (
    <div className="space-y-4">
      {/* Header summary */}
      <div className="bg-card rounded-xl p-4">
        <p className="text-sm text-text leading-relaxed">
          The root{' '}
          <span className="font-arabic text-base font-bold text-grammar-root" dir="rtl">
            {rootDisplay}
          </span>{' '}
          occurs{' '}
          <span className="font-semibold text-primary">{totalOccurrences.toLocaleString()}</span>{' '}
          times in the Quran, in{' '}
          <span className="font-semibold text-primary">{formCount}</span>{' '}
          derived form{formCount !== 1 ? 's' : ''}.
        </p>
      </div>

      {/* Derived form list */}
      <div className="space-y-2">
        {derivedForms.map((form, i) => (
          <DerivedFormGroup key={i} form={form} />
        ))}
      </div>
    </div>
  );
}
