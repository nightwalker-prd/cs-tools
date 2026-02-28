import type { ProverbCategory } from '../types';
import { CATEGORY_MAP } from '../data/categories';

interface CategoryBadgeProps {
  category: ProverbCategory;
}

export function CategoryBadge({ category }: CategoryBadgeProps) {
  const info = CATEGORY_MAP[category];
  if (!info) return null;

  return (
    <span
      className="category-badge"
      style={{ '--badge-color': info.color } as React.CSSProperties}
    >
      {info.nameEn}
    </span>
  );
}
