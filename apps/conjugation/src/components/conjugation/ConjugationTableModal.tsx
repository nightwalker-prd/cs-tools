import { useState, useEffect, useMemo } from 'react';
import { X, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { removeDiacritics } from '@arabtools/core';
import type { ArabicWord } from '../../data/arabicRoots';
import { grammaticalPersons, columns } from '../../constants/grammaticalPersons';
import {
  type ConjugationData,
  type FormInfo,
  getAvailableForms,
  generateFullConjugation,
  allForms,
} from '../../utils/fullConjugationGenerator';

interface ConjugationTableModalProps {
  word: ArabicWord | null;
  onClose: () => void;
}

const DEFAULT_COLUMNS = ['activePast', 'activePresent', 'imperative', 'activeParticiple'];

function romanToFormNumber(roman: string): string {
  const map: Record<string, string> = {
    'I': '1', 'II': '2', 'III': '3', 'IV': '4', 'V': '5',
    'VI': '6', 'VII': '7', 'VIII': '8', 'IX': '9', 'X': '10'
  };
  return map[roman] || '1';
}

export function ConjugationTableModal({ word, onClose }: ConjugationTableModalProps) {
  const [selectedForm, setSelectedForm] = useState<FormInfo | null>(null);
  const [visibleColumns, setVisibleColumns] = useState<string[]>(DEFAULT_COLUMNS);
  const [showDiacritics, setShowDiacritics] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [conjugationData, setConjugationData] = useState<ConjugationData | null>(null);

  // Get available forms when word changes
  const availableForms = useMemo(() => {
    if (!word) return [];
    return getAvailableForms(word.type);
  }, [word]);

  // Set default form when word changes
  useEffect(() => {
    if (!word) return;
    const wordFormNumber = word.verbForm ? romanToFormNumber(word.verbForm) : '1';
    const matching = availableForms.find(f => f.number === wordFormNumber);
    setSelectedForm(matching || availableForms[0] || allForms[0]);
  }, [word, availableForms]);

  // Generate conjugation when form changes
  useEffect(() => {
    if (!word || !selectedForm) return;
    try {
      setError(null);
      const data = generateFullConjugation(word.root, word.type, selectedForm.number, word.pastTense, word.presentTense);
      setConjugationData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate conjugation');
      setConjugationData(null);
    }
  }, [word, selectedForm]);

  // Escape key handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && word) {
        onClose();
      }
    };
    if (word) {
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [word, onClose]);

  const visibleColumnDefs = useMemo(() => {
    return columns.filter(col => visibleColumns.includes(col.id));
  }, [visibleColumns]);

  const toggleColumn = (columnId: string) => {
    setVisibleColumns(prev =>
      prev.includes(columnId)
        ? prev.filter(c => c !== columnId)
        : [...prev, columnId]
    );
  };

  const lookupPerson = (data: Record<string, string>, personId: string): string | undefined => {
    // Strip duplicate suffix (e.g. أَنْتُمَا_2 → أَنْتُمَا) for repeated rows
    const baseId = personId.replace(/_\d+$/, '');
    if (data[baseId]) return data[baseId];
    const matchingKey = Object.keys(data).find(k =>
      k.normalize('NFC') === baseId.normalize('NFC')
    );
    return matchingKey ? data[matchingKey] : undefined;
  };

  const getCellValue = (columnId: string, personId: string): string => {
    if (!conjugationData) return '—';
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

  if (!word) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="conjugation-table-modal-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-5xl mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-3xl z-10">
          <div>
            <h2 id="conjugation-table-modal-title" className="text-2xl font-semibold text-primary">
              Full Conjugation Table
            </h2>
            <div className="flex items-center gap-3 mt-1">
              <span className="text-lg font-arabic" dir="rtl">{word.root}</span>
              <span className="text-sm text-muted-foreground">
                {word.pastTense} / {word.presentTense} / {word.gerund}
              </span>
              {word.meaning && (
                <span className="text-sm text-muted-foreground italic">— {word.meaning}</span>
              )}
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Controls */}
        <div className="px-6 py-4 border-b border-gray-100 space-y-3">
          {/* Form selector */}
          {availableForms.length > 0 && (
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm text-muted-foreground">Form:</span>
              {availableForms.map(form => (
                <button
                  key={form.number}
                  onClick={() => setSelectedForm(form)}
                  className={`px-3 py-1 text-xs rounded-lg border transition-all ${
                    selectedForm?.number === form.number
                      ? 'bg-accent text-white border-accent'
                      : 'bg-white text-primary border-gray-300 hover:border-accent'
                  }`}
                >
                  {form.roman} <span className="font-arabic">{form.arabic}</span>
                </button>
              ))}
            </div>
          )}

          {/* Column toggles + diacritics */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm text-muted-foreground">Columns:</span>
            {columns.map(col => (
              <button
                key={col.id}
                onClick={() => toggleColumn(col.id)}
                className={`px-2 py-1 text-xs rounded-lg border transition-all ${
                  visibleColumns.includes(col.id)
                    ? 'bg-primary text-white border-primary'
                    : 'bg-white text-gray-500 border-gray-300 hover:border-primary'
                }`}
              >
                {col.labelEn}
              </button>
            ))}
            <div className="w-px h-5 bg-gray-300 mx-1" />
            <button
              onClick={() => setShowDiacritics(!showDiacritics)}
              className={`flex items-center gap-1 px-2 py-1 text-xs rounded-lg border transition-all ${
                showDiacritics
                  ? 'bg-accent text-white border-accent'
                  : 'bg-white text-gray-500 border-gray-300 hover:border-accent'
              }`}
              title={showDiacritics ? 'Hide diacritics' : 'Show diacritics'}
            >
              {showDiacritics ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
              Diacritics
            </button>
          </div>
        </div>

        {/* Table content */}
        <div className="px-6 py-4">
          {error ? (
            <div className="text-center py-8">
              <div className="bg-red-50 border border-red-200 rounded-2xl p-6 max-w-md mx-auto">
                <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-3" />
                <h4 className="text-red-800 mb-2">
                  <span dir="rtl" className="font-arabic">خطأ</span> (Error)
                </h4>
                <p className="text-sm text-red-600">{error}</p>
              </div>
            </div>
          ) : conjugationData && visibleColumnDefs.length > 0 ? (
            <div className="overflow-x-auto" dir="rtl">
              <table className="w-full min-w-[600px] border-collapse bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                <thead>
                  <tr className="bg-gradient-to-r from-primary to-primary/80">
                    <th className="px-3 py-2.5 text-right text-white border-l border-white/20">
                      <div className="text-sm font-arabic" dir="rtl">الصيغة</div>
                      <div className="text-xs opacity-80 font-normal">Person</div>
                    </th>
                    {visibleColumnDefs.map(column => (
                      <th key={column.id} className="px-3 py-2.5 text-center text-white border-l border-white/20">
                        <div className="text-sm font-arabic" dir="rtl">{column.labelAr}</div>
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
                      <td className="px-3 py-2.5 border-b border-gray-200 text-right">
                        <div className="text-sm text-primary">{person.english}</div>
                        <div className="text-xs text-gray-600 font-arabic" dir="rtl">{person.arabic}</div>
                      </td>
                      {visibleColumnDefs.map(column => {
                        const cellValue = getCellValue(column.id, person.id);
                        return (
                          <td key={column.id} className="px-3 py-2.5 border-b border-l border-gray-200 text-center">
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
          ) : visibleColumnDefs.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              Select at least one column to display the conjugation table.
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
