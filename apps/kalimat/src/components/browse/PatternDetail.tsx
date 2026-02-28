import { grammarPatternMap } from '@/data/grammar-patterns';

interface PatternDetailProps {
  patternId: number;
  navigate: (path: string) => void;
}

export function PatternDetail({ patternId, navigate }: PatternDetailProps) {
  const pattern = grammarPatternMap[patternId];

  if (!pattern) {
    return (
      <div className="animate-fade-in page-max-700">
        <div className="breadcrumb">
          <button className="breadcrumb-link" onClick={() => navigate('#/')}>Home</button>
          <span className="breadcrumb-sep">/</span>
          <button className="breadcrumb-link" onClick={() => navigate('#/patterns')}>Patterns</button>
          <span className="breadcrumb-sep">/</span>
          <span className="breadcrumb-current">Not Found</span>
        </div>
        <p className="muted-text margin-top-2">
          Pattern not found.
        </p>
      </div>
    );
  }

  const affixes = pattern.affixes ? Object.entries(pattern.affixes) : [];

  return (
    <div className="animate-fade-in page-max-700">
      <div className="topic-header">
        <div className="breadcrumb">
          <button className="breadcrumb-link" onClick={() => navigate('#/')}>Home</button>
          <span className="breadcrumb-sep">/</span>
          <button className="breadcrumb-link" onClick={() => navigate('#/patterns')}>Patterns</button>
          <span className="breadcrumb-sep">/</span>
          <span className="breadcrumb-current">{pattern.friendlyName}</span>
        </div>

        <div className="pattern-detail-header">
          <div className="font-arabic pattern-detail-form" dir="rtl">
            {pattern.form}
          </div>
          <div>
            <h1 className="pattern-detail-title">
              {pattern.friendlyName}
            </h1>
            <div className="pattern-detail-meta">
              <span className="pattern-category-pill">{pattern.category}</span>
              <span className="pattern-detail-count">
                {pattern.count.toLocaleString()} occurrences
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Explanation */}
      <div className="etymology-box">
        <div className="etymology-title">Explanation</div>
        <p className="etymology-text">{pattern.explanation}</p>
        {pattern.formDesc && (
          <p className="etymology-text pattern-detail-desc">
            {pattern.formDesc}
          </p>
        )}
      </div>

      {/* Before/After Example */}
      {pattern.example && (
        <>
          <h2 className="pattern-detail-section-title">
            Example
          </h2>
          <div className="pattern-example">
            <div className="pattern-example-side">
              <div className="pattern-example-label">Before</div>
              <div className="pattern-example-arabic font-arabic" dir="rtl">
                {pattern.example.before_word}
              </div>
              <div className="pattern-example-meaning">
                {pattern.example.before_meaning}
              </div>
            </div>
            <div className="pattern-example-arrow">&#10230;</div>
            <div className="pattern-example-side">
              <div className="pattern-example-label">After</div>
              <div className="pattern-example-arabic font-arabic" dir="rtl">
                {pattern.example.after_word}
              </div>
              <div className="pattern-example-meaning">
                {pattern.example.after_meaning}
              </div>
            </div>
          </div>
        </>
      )}

      {/* Affixes */}
      {affixes.length > 0 && (
        <>
          <div className="gold-separator">
            <div className="gold-separator-diamond" />
          </div>
          <h2 className="pattern-detail-section-title">
            Affixes
          </h2>
          <div className="pattern-detail-chip-row">
            {affixes.map(([key, val]) => {
              const info = val as Record<string, string> | null;
              if (!info) return null;
              const type = key.startsWith('prefix') ? 'prefix' :
                           key.startsWith('suffix') ? 'suffix' : 'infix';
              return (
                <span key={key} className={`affix-chip ${type}`}>
                  <span className="affix-chip-type">{key.replace(/_/g, ' ')}</span>
                  {info.add && <span className="font-arabic" dir="rtl">{info.add}</span>}
                </span>
              );
            })}
          </div>
        </>
      )}

      {/* Similar Patterns */}
      {pattern.similar && pattern.similar.similarPatternIds && pattern.similar.similarPatternIds.length > 0 && (
        <>
          <div className="gold-separator">
            <div className="gold-separator-diamond" />
          </div>
          <h2 className="pattern-detail-section-title">
            Similar Patterns
          </h2>
          {pattern.similar.reason && (
            <p className="pattern-detail-reason">
              {pattern.similar.reason}
            </p>
          )}
          <div className="pattern-detail-chip-row">
            {pattern.similar.similarPatternIds.map(id => {
              const sp = grammarPatternMap[id];
              if (!sp) return null;
              return (
                <button
                  key={id}
                  className="btn pattern-detail-similar-btn"
                  onClick={() => navigate(`#/pattern/${id}`)}
                >
                  <span className="font-arabic" dir="rtl">{sp.form}</span>
                  <span className="pattern-detail-similar-label">
                    {sp.friendlyName}
                  </span>
                </button>
              );
            })}
          </div>
        </>
      )}

      {/* Back */}
      <div className="margin-top-2">
        <button className="btn" onClick={() => navigate('#/patterns')}>
          Back to All Patterns
        </button>
      </div>
    </div>
  );
}
