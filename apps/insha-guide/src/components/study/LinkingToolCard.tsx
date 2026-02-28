import type { LinkingToolData } from '../../data/types';

interface LinkingToolCardProps {
  data: LinkingToolData;
}

export function LinkingToolCard({ data }: LinkingToolCardProps) {
  return (
    <div className="linking-tools-section">
      {data.title && (
        <div className="grammar-table-title" style={{ marginBottom: '0.75rem' }}>
          <h4>{data.title}</h4>
          {data.titleAr && <span className="grammar-table-title-ar font-arabic">{data.titleAr}</span>}
        </div>
      )}
      {data.categories.map((cat, ci) => (
        <div key={ci} className="linking-category">
          <div className="linking-category-title">
            {cat.name} <span className="font-arabic" style={{ color: 'var(--color-accent)' }}>{cat.nameAr}</span>
          </div>
          <div className="linking-items">
            {cat.tools.map((tool, ti) => (
              <div key={ti} style={{ marginBottom: '0.35rem' }}>
                <span className="linking-item">{tool.arabic}</span>
                <span style={{ fontSize: '0.82rem', color: 'var(--color-muted-foreground)', marginRight: '0.5rem', marginLeft: '0.5rem' }}>
                  {tool.english}
                </span>
                {tool.example && (
                  <div style={{ fontSize: '0.82rem', color: 'var(--color-muted-foreground)', fontStyle: 'italic', marginTop: '0.15rem' }}>
                    <span className="font-arabic" style={{ color: 'var(--color-primary)', fontSize: '0.95rem' }}>{tool.example}</span>
                    {tool.exampleTranslation && <span> — {tool.exampleTranslation}</span>}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
