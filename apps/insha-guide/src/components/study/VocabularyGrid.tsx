import type { VocabularyGridData } from '../../data/types';

interface VocabularyGridProps {
  data: VocabularyGridData;
}

export function VocabularyGrid({ data }: VocabularyGridProps) {
  return (
    <div>
      {data.title && (
        <div className="grammar-table-title" style={{ marginBottom: '0.75rem' }}>
          <h4>{data.title}</h4>
          {data.titleAr && <span className="grammar-table-title-ar font-arabic">{data.titleAr}</span>}
        </div>
      )}
      <div className="vocabulary-grid">
        {data.items.map((item, i) => (
          <div key={i} className="vocab-card">
            <div className="vocab-arabic font-arabic">{item.arabic}</div>
            {item.transliteration && (
              <div style={{ fontSize: '0.75rem', color: 'var(--color-muted-foreground)', fontStyle: 'italic' }}>
                {item.transliteration}
              </div>
            )}
            <div className="vocab-english">{item.english}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
