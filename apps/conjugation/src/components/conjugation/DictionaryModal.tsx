import { useState, useEffect } from 'react';
import { X, AlertCircle, BookOpen } from 'lucide-react';
import type { ArabicWord } from '../../data/arabicRoots';
import { lookupRoot, getTableRows, type HansWehrTableRow } from '../../utils/hansWehrLoader';

interface DictionaryModalProps {
  word: ArabicWord | null;
  onClose: () => void;
}

export function DictionaryModal({ word, onClose }: DictionaryModalProps) {
  const [rows, setRows] = useState<HansWehrTableRow[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!word) return;

    let cancelled = false;
    setIsLoading(true);
    setError(null);
    setRows([]);

    lookupRoot(word.root)
      .then(entries => {
        if (cancelled) return;
        const tableRows = getTableRows(entries);
        if (tableRows.length === 0) {
          setError('Root not found in dictionary.');
        } else {
          setRows(tableRows);
        }
      })
      .catch(err => {
        if (cancelled) return;
        console.error('Dictionary lookup error:', err);
        setError('Failed to load dictionary data.');
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => { cancelled = true; };
  }, [word]);

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

  if (!word) return null;

  const compactRoot = word.root.replace(/\s/g, '');
  const notFound = error === 'Root not found in dictionary.';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="dictionary-modal-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-3xl mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-3xl z-10">
          <div>
            <h2 id="dictionary-modal-title" className="text-2xl font-semibold text-primary">
              Dictionary Lookup
            </h2>
            <div className="flex items-center gap-3 mt-1">
              <span className="text-lg font-arabic" dir="rtl">{compactRoot}</span>
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

        {/* Body */}
        <div className="px-6 py-4">
          {isLoading && (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto mb-4" />
              <p className="text-muted-foreground">Loading dictionary data...</p>
            </div>
          )}

          {error && !isLoading && notFound && (
            <div className="text-center py-8">
              <BookOpen className="w-12 h-12 text-accent/50 mx-auto mb-3" />
              <h4 className="text-primary mb-2">
                <span dir="rtl" className="font-arabic">غير موجود</span> (Not Found)
              </h4>
              <p className="text-sm text-muted-foreground">Root not found in dictionary.</p>
            </div>
          )}

          {error && !isLoading && !notFound && (
            <div className="text-center py-8">
              <div className="bg-red-50 border border-red-200 rounded-2xl p-6 max-w-md mx-auto">
                <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-3" />
                <h4 className="text-red-800 mb-2">
                  <span dir="rtl" className="font-arabic">خطأ</span> (Error)
                </h4>
                <p className="text-sm text-red-600">{error}</p>
              </div>
            </div>
          )}

          {!isLoading && !error && rows.length > 0 && (
            <>
              <p className="text-sm text-muted-foreground mb-3">
                {rows.length} entries found
              </p>
              <div className="overflow-x-auto" dir="rtl">
                <table className="w-full min-w-[600px] border-collapse bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                  <thead>
                    <tr className="bg-gradient-to-r from-primary to-primary/80">
                      <th className="px-3 py-2.5 text-right text-white border-l border-white/20">
                        <div className="text-sm font-arabic" dir="rtl">الكلمة</div>
                        <div className="text-xs opacity-80 font-normal">Word</div>
                      </th>
                      <th className="px-3 py-2.5 text-center text-white border-l border-white/20">
                        <div className="text-sm font-arabic" dir="rtl">النقل الحرفي</div>
                        <div className="text-xs opacity-80 font-normal">Transliteration</div>
                      </th>
                      <th className="px-3 py-2.5 text-center text-white border-l border-white/20">
                        <div className="text-sm font-arabic" dir="rtl">الباب</div>
                        <div className="text-xs opacity-80 font-normal">Form</div>
                      </th>
                      <th className="px-3 py-2.5 text-right text-white">
                        <div className="text-sm font-arabic" dir="rtl">الترجمة</div>
                        <div className="text-xs opacity-80 font-normal">Translation</div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((row, index) => (
                      <tr
                        key={`${row.arabic}-${row.form}-${index}`}
                        className={`transition-colors hover:bg-accent/10 ${
                          index % 2 === 0 ? 'bg-gray-50/50' : 'bg-white/50'
                        }`}
                      >
                        <td className="px-3 py-2.5 border-b border-gray-200 text-right">
                          <span className="text-lg font-arabic" dir="rtl">{row.arabic}</span>
                        </td>
                        <td className="px-3 py-2.5 border-b border-l border-gray-200 text-center" dir="ltr">
                          {row.transliteration}
                        </td>
                        <td className="px-3 py-2.5 border-b border-l border-gray-200 text-center" dir="ltr">
                          {row.form}
                        </td>
                        <td className="px-3 py-2.5 border-b border-l border-gray-200 text-right text-sm max-w-md break-words whitespace-normal" dir="ltr">
                          {row.translation}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
