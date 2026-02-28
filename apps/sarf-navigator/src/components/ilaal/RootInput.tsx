import { useState, useCallback } from 'react';
import { detectExtendedVerbType } from '../../data/ilaal/verb-type-detection';
import { extendedVerbTypeLabels, presetRoots } from '../../data/ilaal/types';
import type { ExtendedVerbType } from '../../data/ilaal/types';

interface RootInputProps {
  value: string;
  onChange: (root: string, detectedType: ExtendedVerbType) => void;
  presetType?: string;
  presetRoot?: string;
}

export function RootInput({ value, onChange, presetRoot }: RootInputProps) {
  const [inputValue, setInputValue] = useState(value || presetRoot || '');

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    // Allow Arabic letters, spaces (for spaced roots like "ق و ل")
    const cleaned = raw.replace(/[^\u0600-\u06FF\s]/g, '');
    setInputValue(cleaned);

    // Extract just the letters (removing spaces and diacritics)
    const letters = cleaned.replace(/[\u064B-\u065F\u0670\s]/g, '').split('').filter(c => c.trim());
    if (letters.length >= 3) {
      const root = letters.slice(0, 3).join('');
      const detected = detectExtendedVerbType(root);
      onChange(root, detected);
    }
  }, [onChange]);

  const handlePreset = useCallback((preset: typeof presetRoots[number]) => {
    setInputValue(preset.root);
    onChange(preset.root, preset.type);
  }, [onChange]);

  const detectedType = (() => {
    const letters = inputValue.replace(/[\u064B-\u065F\u0670\s]/g, '').split('').filter(c => c.trim());
    if (letters.length >= 3) {
      return detectExtendedVerbType(letters.slice(0, 3).join(''));
    }
    return null;
  })();

  return (
    <div className="root-input">
      <div className="root-input-row">
        <label className="root-input-label">Root (الجذر)</label>
        <div className="root-input-field-wrapper">
          <input
            type="text"
            className="root-input-field font-arabic"
            value={inputValue}
            onChange={handleChange}
            placeholder="ق و ل"
            dir="rtl"
            maxLength={10}
          />
          {detectedType && (
            <span className={`verb-type-badge badge-${detectedType.split('-')[0]}`}>
              {extendedVerbTypeLabels[detectedType].shortAr}
              <span className="badge-en">{extendedVerbTypeLabels[detectedType].en}</span>
            </span>
          )}
        </div>
      </div>

      <div className="preset-roots">
        <span className="preset-label">Quick:</span>
        <div className="preset-list">
          {presetRoots.map(preset => (
            <button
              key={preset.root}
              className={`preset-btn ${value === preset.root ? 'active' : ''}`}
              onClick={() => handlePreset(preset)}
              title={`${preset.meaning} (${extendedVerbTypeLabels[preset.type].en})`}
            >
              <span className="font-arabic">{preset.root}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
