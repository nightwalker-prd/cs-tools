import { useState } from 'react';
import { VerbType, verbTypeLabels } from '../utils/verbTypeDetection';

interface VerbTypeIndicatorProps {
  detectedType: VerbType;
  onChangeType: (type: VerbType) => void;
}

export function VerbTypeIndicator({ detectedType, onChangeType }: VerbTypeIndicatorProps) {
  const [showOverride, setShowOverride] = useState(false);

  return (
    <div>
      <div className="flex items-center gap-3">
        <div className="px-3 py-1.5 bg-accent/20 border border-accent rounded-lg">
          <span className="text-sm text-primary">
            <span dir="rtl" className="font-arabic">مُكتَشَف</span>
            <span className="opacity-70"> (Detected)</span>:{' '}
            <strong dir="rtl" className="font-arabic">
              {verbTypeLabels[detectedType].ar}
            </strong>{' '}
            ({verbTypeLabels[detectedType].en})
          </span>
        </div>

        <button
          onClick={() => setShowOverride(!showOverride)}
          className="text-sm text-accent hover:text-accent/80 underline"
        >
          {showOverride ? 'إخفاء (Hide)' : 'تغيير (Change type)'}
        </button>
      </div>

      {showOverride && (
        <div className="mt-3">
          <label className="block text-sm text-primary mb-2">
            <span dir="rtl" className="font-arabic">اختر نوع الفعل</span>
            <span className="opacity-70"> (Select verb type)</span>
          </label>
          <select
            value={detectedType}
            onChange={(e) => onChangeType(e.target.value as VerbType)}
            className="w-full max-w-xs px-4 py-2 rounded-lg border border-gray-300
                       focus:border-accent focus:ring-2 focus:ring-accent/20
                       outline-none transition-all"
          >
            <option value="sahih">صحيح (Sahih)</option>
            <option value="ajwaf">أجوف (Ajwaf)</option>
            <option value="naaqis">ناقص (Naaqis)</option>
            <option value="mithaal">مثال (Mithaal)</option>
            <option value="mudaa'af">مضاعف (Mudaa'af)</option>
          </select>
        </div>
      )}
    </div>
  );
}
