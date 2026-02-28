import { useState, useMemo, useCallback } from 'react';
import { RootInput } from './RootInput';
import { FormSelector } from './FormSelector';
import { ComparisonTable } from './ComparisonTable';
import { compareForms } from '../../data/ilaal/comparison-engine';
import { detectExtendedVerbType } from '../../data/ilaal/verb-type-detection';
import { extendedVerbTypeLabels } from '../../data/ilaal/types';
import type { ExtendedVerbType } from '../../data/ilaal/types';

interface IlaalTransformerProps {
  presetVerbType?: string;
  presetRoot?: string;
  compact?: boolean;
}

export function IlaalTransformer({ presetRoot, compact }: IlaalTransformerProps) {
  const initialRoot = presetRoot || '';
  const initialType = initialRoot ? detectExtendedVerbType(initialRoot) : ('sahih' as ExtendedVerbType);

  const [root, setRoot] = useState(initialRoot);
  const [extendedType, setExtendedType] = useState<ExtendedVerbType>(initialType);
  const [selectedForm, setSelectedForm] = useState('1');

  const handleRootChange = useCallback((newRoot: string, detectedType: ExtendedVerbType) => {
    setRoot(newRoot);
    setExtendedType(detectedType);
    setSelectedForm('1');
  }, []);

  const comparison = useMemo(() => {
    if (!root || root.length < 3) return null;
    try {
      return compareForms(root, extendedType, selectedForm);
    } catch {
      return null;
    }
  }, [root, extendedType, selectedForm]);

  return (
    <div className={`ilaal-transformer ${compact ? 'compact' : ''}`}>
      <div className="transformer-header">
        <h3 className="transformer-title">
          I'laal Transformer
          <span className="font-arabic transformer-title-ar">محوّل الإعلال</span>
        </h3>
      </div>

      <div className="transformer-controls">
        <RootInput
          value={root}
          onChange={handleRootChange}
          presetRoot={presetRoot}
        />

        {root && root.length >= 3 && (
          <FormSelector
            extendedType={extendedType}
            selectedForm={selectedForm}
            onSelect={setSelectedForm}
          />
        )}
      </div>

      {comparison && (
        <>
          <div className="transformer-summary">
            <div className="summary-stat">
              <span className="summary-label">Verb Type</span>
              <span className="summary-value font-arabic">
                {extendedVerbTypeLabels[extendedType].ar}
              </span>
              <span className="summary-sub">{extendedVerbTypeLabels[extendedType].en}</span>
            </div>
            <div className="summary-stat">
              <span className="summary-label">Total Slots</span>
              <span className="summary-value">{comparison.totalSlots}</span>
            </div>
            <div className="summary-stat">
              <span className="summary-label">With I'laal</span>
              <span className={`summary-value ${comparison.slotsWithIlaal > 0 ? 'has-ilaal' : ''}`}>
                {comparison.slotsWithIlaal}
              </span>
            </div>
          </div>

          {comparison.slotsWithIlaal === 0 && (
            <div className="no-ilaal-notice">
              No i'laal differences detected. This verb conjugates like a sound verb in Form {selectedForm}.
            </div>
          )}

          <ComparisonTable
            sections={comparison.sections}
            extendedType={extendedType}
            formNumber={selectedForm}
          />
        </>
      )}

      {!root && (
        <div className="transformer-placeholder">
          Enter an Arabic root above to see the i'laal comparison.
        </div>
      )}
    </div>
  );
}
