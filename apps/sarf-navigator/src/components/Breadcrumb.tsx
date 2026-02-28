import type { SarfTopic, SarfCategory } from '../data/types';

interface BreadcrumbProps {
  topic: SarfTopic;
  categories: SarfCategory[];
  onGoHome: () => void;
}

export function Breadcrumb({ topic, categories, onGoHome }: BreadcrumbProps) {
  const category = categories.find(c => c.id === topic.categoryId);

  return (
    <nav className="breadcrumb">
      <button onClick={onGoHome} className="breadcrumb-link">Home</button>
      <span className="breadcrumb-sep">/</span>
      {category && (
        <>
          <span className="breadcrumb-item">{category.titleEn}</span>
          <span className="breadcrumb-sep">/</span>
        </>
      )}
      <span className="breadcrumb-current">{topic.titleEn}</span>
    </nav>
  );
}
