import { X } from 'lucide-react';
import type { IrabWord } from '../types';

const CATEGORY_LABELS: Record<string, { en: string; ar: string }> = {
  nominal: { en: 'Nominal', ar: 'اسمي' },
  verbal: { en: 'Verbal', ar: 'فعلي' },
  particle: { en: 'Particle', ar: 'حرف' },
  modifier: { en: 'Modifier', ar: 'تابع / فضلة' },
};

interface IrabDetailProps {
  annotation: IrabWord | null;
  onClose: () => void;
}

export function IrabDetail({ annotation, onClose }: IrabDetailProps) {
  if (!annotation) return null;

  const cat = CATEGORY_LABELS[annotation.category];

  return (
    <div className="irab-detail">
      <div className="irab-detail-header">
        <span className="irab-detail-word font-arabic" dir="rtl">
          {annotation.word}
        </span>
        <button className="irab-detail-close" onClick={onClose}>
          <X size={16} />
        </button>
      </div>
      <div className="irab-detail-body">
        <div className="irab-detail-row">
          <span className="irab-detail-label">Part of Speech</span>
          <span className="irab-detail-value">
            <span className={`irab-dot irab-${annotation.category}`} />
            {annotation.pos}
            <span className="irab-detail-ar font-arabic">{annotation.posAr}</span>
          </span>
        </div>
        <div className="irab-detail-row">
          <span className="irab-detail-label">Category</span>
          <span className="irab-detail-value">
            {cat?.en}
            <span className="irab-detail-ar font-arabic">{cat?.ar}</span>
          </span>
        </div>
        <div className="irab-detail-row">
          <span className="irab-detail-label">Grammatical Role</span>
          <span className="irab-detail-value">
            {annotation.role}
            <span className="irab-detail-ar font-arabic">{annotation.roleAr}</span>
          </span>
        </div>
        <div className="irab-detail-row">
          <span className="irab-detail-label">Case / Mood</span>
          <span className="irab-detail-value">
            {annotation.case}
            <span className="irab-detail-ar font-arabic">{annotation.caseAr}</span>
          </span>
        </div>
        {annotation.notes && (
          <div className="irab-detail-notes">
            {annotation.notes}
          </div>
        )}
      </div>
    </div>
  );
}
