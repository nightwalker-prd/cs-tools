import type { NahwTable } from '../data/types';

interface GrammarTableProps {
  table: NahwTable;
}

function isArabic(text: string): boolean {
  const arabicChars = text.match(/[\u0600-\u06FF\u0750-\u077F\uFB50-\uFDFF\uFE70-\uFEFF]/g);
  if (!arabicChars) return false;
  const letterChars = text.match(/\S/g);
  if (!letterChars) return false;
  return arabicChars.length / letterChars.length > 0.3;
}

export function GrammarTable({ table }: GrammarTableProps) {
  return (
    <div className="grammar-table-wrapper">
      <div className="grammar-table-title">
        <h4>{table.title}</h4>
        {table.titleAr && <span className="font-arabic" dir="rtl">{table.titleAr}</span>}
      </div>
      <div className="grammar-table-scroll">
        <table className="grammar-table">
          <thead>
            <tr>
              {table.headers.map((h, i) => (
                <th key={i} className={isArabic(h) ? 'arabic-cell' : ''}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.rows.map((row, ri) => (
              <tr key={ri}>
                {row.map((cell, ci) => (
                  <td key={ci} className={isArabic(cell) ? 'arabic-cell' : ''}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
