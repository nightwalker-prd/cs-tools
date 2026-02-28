import type { ModelEssayData } from '../../data/types';

interface ModelEssayProps {
  data: ModelEssayData;
}

export function ModelEssay({ data }: ModelEssayProps) {
  return (
    <div className="model-essay">
      <h4 className="model-essay-title">
        {data.title}
        {data.titleAr && <span className="font-arabic" style={{ marginRight: '0.5rem', color: 'var(--color-accent)' }}> {data.titleAr}</span>}
      </h4>

      {data.paragraphs.map((p, i) => (
        <div key={i} style={{ marginBottom: '1rem' }}>
          <div className="model-essay-arabic font-arabic">{p.arabic}</div>
          <div className="model-essay-translation">{p.translation}</div>
        </div>
      ))}

      {data.vocabulary && data.vocabulary.length > 0 && (
        <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '0.75rem', marginTop: '0.75rem' }}>
          <h5 style={{ fontSize: '0.85rem', color: 'var(--color-primary)', marginBottom: '0.5rem' }}>Key Vocabulary</h5>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {data.vocabulary.map((v, i) => (
              <span key={i} className="synonym-item">
                <span className="synonym-item-ar font-arabic">{v.arabic}</span>
                <span className="synonym-item-en">{v.english}</span>
              </span>
            ))}
          </div>
        </div>
      )}

      {data.questions && data.questions.length > 0 && (
        <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '0.75rem', marginTop: '0.75rem' }}>
          <h5 style={{ fontSize: '0.85rem', color: 'var(--color-primary)', marginBottom: '0.5rem' }}>Discussion Questions</h5>
          <ol style={{ paddingLeft: '1.25rem', fontSize: '0.9rem', color: 'var(--color-foreground)' }}>
            {data.questions.map((q, i) => (
              <li key={i} style={{ marginBottom: '0.25rem' }}>{q}</li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}
