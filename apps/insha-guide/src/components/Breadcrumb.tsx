import type { Unit } from '../data/types';

interface BreadcrumbProps {
  unit: Unit;
  lessonTitle: string;
  onGoHome: () => void;
}

export function Breadcrumb({ unit, lessonTitle, onGoHome }: BreadcrumbProps) {
  return (
    <nav className="breadcrumb">
      <button onClick={onGoHome} className="breadcrumb-link">Home</button>
      <span className="breadcrumb-sep">/</span>
      <span className="breadcrumb-item">{unit.titleEn}</span>
      <span className="breadcrumb-sep">/</span>
      <span className="breadcrumb-current">{lessonTitle}</span>
    </nav>
  );
}
