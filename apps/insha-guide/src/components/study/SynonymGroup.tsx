import type { SynonymGroupData } from '../../data/types';

interface SynonymGroupProps {
  data: SynonymGroupData;
}

export function SynonymGroup({ data }: SynonymGroupProps) {
  return (
    <div>
      {data.title && (
        <div className="grammar-table-title" style={{ marginBottom: '0.75rem' }}>
          <h4>{data.title}</h4>
          {data.titleAr && <span className="grammar-table-title-ar font-arabic">{data.titleAr}</span>}
        </div>
      )}
      {data.groups.map((group, gi) => (
        <div key={gi} className="synonym-group">
          <div className="synonym-group-title">
            {group.concept} <span className="font-arabic" style={{ color: 'var(--color-accent)' }}>{group.conceptAr}</span>
          </div>
          <div className="synonym-items">
            {group.words.map((w, wi) => (
              <span key={wi} className="synonym-item">
                <span className="synonym-item-ar font-arabic">{w.arabic}</span>
                <span className="synonym-item-en">{w.english}</span>
              </span>
            ))}
          </div>
          {group.example && (
            <div style={{ marginTop: '0.5rem', fontSize: '0.85rem', color: 'var(--color-muted-foreground)', fontStyle: 'italic' }}>
              {group.example}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
