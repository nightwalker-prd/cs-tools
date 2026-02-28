import { useState } from 'react';
import type { ComparisonSection, ComparisonSlot } from '../../data/ilaal/types';
import type { IlaalStep } from '../../data/ilaal/types';
import { StepByStepPanel } from './StepByStepPanel';
import { getAnnotation } from '../../data/ilaal/annotation-engine';
import type { ExtendedVerbType } from '../../data/ilaal/types';

interface ComparisonTableProps {
  sections: ComparisonSection[];
  extendedType: ExtendedVerbType;
  formNumber: string;
}

export function ComparisonTable({ sections, extendedType, formNumber }: ComparisonTableProps) {
  const [expandedSlot, setExpandedSlot] = useState<string | null>(null);

  const handleRowClick = (sectionId: string, pronoun: string) => {
    const key = `${sectionId}:${pronoun}`;
    setExpandedSlot(prev => (prev === key ? null : key));
  };

  return (
    <div className="comparison-table">
      {sections.map(section => (
        <div key={section.id} className="comparison-section">
          <h4 className="comparison-section-title">
            <span>{section.titleEn}</span>
            <span className="font-arabic comparison-section-title-ar">{section.titleAr}</span>
          </h4>

          <div className="comparison-table-scroll">
            <table className="comparison-table-inner">
              <thead>
                <tr>
                  {section.slots[0]?.pronoun && <th>Pronoun</th>}
                  <th>Sound Pattern</th>
                  <th>Actual Form</th>
                  <th className="col-status"></th>
                </tr>
              </thead>
              <tbody>
                {section.slots.map((slot, i) => {
                  const key = `${section.id}:${slot.pronoun || i}`;
                  const isExpanded = expandedSlot === key;
                  const steps = slot.isDifferent ? getAnnotation(extendedType, formNumber, section.id, slot.pronoun) : [];
                  const hasAnnotation = steps.length > 0;

                  return (
                    <ComparisonRow
                      key={key}
                      slot={slot}
                      showPronoun={!!section.slots[0]?.pronoun}
                      isExpanded={isExpanded}
                      hasAnnotation={hasAnnotation}
                      steps={steps}
                      onClick={() => slot.isDifferent && handleRowClick(section.id, slot.pronoun || String(i))}
                    />
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
}

interface ComparisonRowProps {
  slot: ComparisonSlot;
  showPronoun: boolean;
  isExpanded: boolean;
  hasAnnotation: boolean;
  steps: IlaalStep[];
  onClick: () => void;
}

function ComparisonRow({ slot, showPronoun, isExpanded, hasAnnotation, steps, onClick }: ComparisonRowProps) {
  return (
    <>
      <tr
        className={`comparison-row ${slot.isDifferent ? 'diff-row clickable' : ''}`}
        onClick={onClick}
      >
        {showPronoun && (
          <td className="font-arabic pronoun-cell">{slot.pronoun.replace(/_[مف]$/, '')}</td>
        )}
        <td className={`font-arabic form-cell ${slot.isDifferent ? 'diff-deleted' : ''}`}>
          {slot.soundForm || '—'}
        </td>
        <td className={`font-arabic form-cell ${slot.isDifferent ? 'diff-changed' : ''}`}>
          {slot.actualForm || '—'}
        </td>
        <td className="col-status">
          {slot.isDifferent && (
            <span className="diff-indicator" title={hasAnnotation ? 'Click for details' : 'I\'laal applied'}>
              {hasAnnotation ? '▸' : '●'}
            </span>
          )}
        </td>
      </tr>
      {isExpanded && hasAnnotation && (
        <tr className="step-row">
          <td colSpan={showPronoun ? 4 : 3}>
            <StepByStepPanel steps={steps} />
          </td>
        </tr>
      )}
    </>
  );
}
