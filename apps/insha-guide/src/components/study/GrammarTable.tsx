import type { GrammarTableData } from '../../data/types';

interface GrammarTableProps {
  data: GrammarTableData;
}

const ARABIC_RE = /[\u0600-\u06FF]/;

export function GrammarTable({ data }: GrammarTableProps) {
  return (
    <div className="grammar-table-wrapper">
      <div className="grammar-table-title">
        <h4>{data.title}</h4>
        {data.titleAr && <span className="grammar-table-title-ar font-arabic">{data.titleAr}</span>}
      </div>
      <div className="grammar-table-scroll">
        <table className="grammar-table">
          <thead>
            <tr>
              {data.headers.map((h, i) => (
                <th key={i}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.rows.map((row, ri) => (
              <tr key={ri}>
                {row.map((cell, ci) => (
                  <td
                    key={ci}
                    className={ARABIC_RE.test(cell) ? 'arabic-cell' : undefined}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {data.note && <p style={{ fontSize: '0.82rem', color: 'var(--color-muted-foreground)', marginTop: '0.5rem' }}>{data.note}</p>}
    </div>
  );
}
