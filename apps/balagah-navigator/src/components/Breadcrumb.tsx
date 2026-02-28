import type { BalagahTopic, BalagahUnit } from '../data/types';

interface BreadcrumbProps {
  topic: BalagahTopic;
  units: BalagahUnit[];
  onGoHome: () => void;
}

export function Breadcrumb({ topic, units, onGoHome }: BreadcrumbProps) {
  const unit = units.find(u => u.id === topic.unitId);

  return (
    <nav className="breadcrumb">
      <button onClick={onGoHome} className="breadcrumb-link">Home</button>
      <span className="breadcrumb-sep">/</span>
      {unit && (
        <>
          <span className="breadcrumb-item">{unit.titleEn}</span>
          <span className="breadcrumb-sep">/</span>
        </>
      )}
      <span className="breadcrumb-current">{topic.titleEn}</span>
    </nav>
  );
}
