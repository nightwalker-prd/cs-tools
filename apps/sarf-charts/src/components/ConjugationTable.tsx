import { useState, useEffect, useMemo } from 'react';
import { AlertCircle } from 'lucide-react';
import { removeDiacritics } from '@arabtools/core';
import { VerbType } from '../utils/verbTypeDetection';
import { ConjugationData, generateConjugation } from '../utils/conjugationGenerator';
import { grammaticalPersons, columns } from '../constants/grammaticalPersons';

interface ConjugationTableProps {
  root: string;
  verbType: VerbType;
  formNumber: string;
  visibleColumns: string[];
  showDiacritics?: boolean;
}

export function ConjugationTable({ root, verbType, formNumber, visibleColumns, showDiacritics = true }: ConjugationTableProps) {
  const [error, setError] = useState<string | null>(null);
  const [conjugationData, setConjugationData] = useState<ConjugationData | null>(null);

  useEffect(() => {
    try {
      setError(null);
      const data = generateConjugation(root, verbType, formNumber);
      setConjugationData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate conjugation');
      setConjugationData(null);
    }
  }, [root, verbType, formNumber]);

  const visibleColumnDefs = useMemo(() => {
    return columns.filter(col => visibleColumns.includes(col.id));
  }, [visibleColumns]);

  if (error) {
    return (
      <div className="text-center py-8">
        <div className="backdrop-blur-md bg-red-50/80 border border-red-200 rounded-2xl p-6 max-w-md mx-auto">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-3" />
          <h4 className="text-red-800 mb-2">
            <span dir="rtl" className="font-arabic">خطأ</span> (Error)
          </h4>
          <p className="text-sm text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  if (!conjugationData) {
    return null;
  }

  const lookupPerson = (data: Record<string, string>, personId: string): string | undefined => {
    if (data[personId]) return data[personId];
    const matchingKey = Object.keys(data).find(k =>
      k.normalize('NFC') === personId.normalize('NFC')
    );
    return matchingKey ? data[matchingKey] : undefined;
  };

  const getCellValue = (columnId: string, personId: string): string => {
    switch (columnId) {
      case 'activePast':
        return lookupPerson(conjugationData.activePast, personId) || '—';
      case 'activePresent':
        return lookupPerson(conjugationData.activePresent.marfoo, personId) || '—';
      case 'passivePast':
        return lookupPerson(conjugationData.passivePast, personId) || '—';
      case 'passivePresent':
        return lookupPerson(conjugationData.passivePresent.marfoo, personId) || '—';
      case 'imperative':
        return lookupPerson(conjugationData.imperative, personId) || '—';
      case 'prohibition':
        return conjugationData.prohibition || '—';
      case 'activeParticiple':
        return conjugationData.activeParticiple || '—';
      case 'passiveParticiple':
        return conjugationData.passiveParticiple || '—';
      default:
        return '—';
    }
  };

  return (
    <div className="overflow-x-auto -mx-6 px-6 md:mx-0 md:px-0" dir="rtl">
      <table className="w-full min-w-[800px] md:min-w-0 border-collapse backdrop-blur-md bg-white/80 border border-white/40 rounded-2xl overflow-hidden shadow-xl">
        <thead>
          <tr className="bg-gradient-to-r from-primary to-primary/80">
            <th className="px-4 py-3 text-right text-white border-l border-white/20">
              <div className="text-sm font-arabic" dir="rtl">
                الصيغة
              </div>
              <div className="text-xs opacity-80 font-normal">Person</div>
            </th>

            {visibleColumnDefs.map((column) => (
              <th key={column.id} className="px-4 py-3 text-center text-white border-l border-white/20">
                <div className="text-sm font-arabic" dir="rtl">
                  {column.labelAr}
                </div>
                <div className="text-xs opacity-80 font-normal">{column.labelEn}</div>
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {grammaticalPersons.map((person, index) => (
            <tr
              key={person.id}
              className={`transition-colors hover:bg-accent/10 ${
                index % 2 === 0 ? 'bg-gray-50/50' : 'bg-white/50'
              }`}
            >
              <td className="px-4 py-3 border-b border-gray-200 text-right">
                <div className="text-sm text-primary">{person.english}</div>
                <div className="text-xs text-gray-600 font-arabic" dir="rtl">
                  {person.arabic}
                </div>
              </td>

              {visibleColumnDefs.map((column) => {
                const cellValue = getCellValue(column.id, person.id);
                return (
                  <td key={column.id} className="px-4 py-3 border-b border-l border-gray-200 text-center">
                    <span className="text-lg font-arabic" dir="rtl">
                      {showDiacritics ? cellValue : removeDiacritics(cellValue)}
                    </span>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
