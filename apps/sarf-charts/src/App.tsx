/**
 * Sarf Charts - Arabic Verb Conjugation Tables
 *
 * Standalone tool for viewing complete Arabic verb conjugations
 */

import { useState, useEffect } from 'react';
import { BookOpen, Eye, EyeOff } from 'lucide-react';
import { containsArabic } from '@arabtools/core';
import { VerbType, detectVerbType } from './utils/verbTypeDetection';
import { VerbTypeIndicator } from './components/VerbTypeIndicator';
import { FormSelector } from './components/FormSelector';
import { ColumnToggleControls } from './components/ColumnToggleControls';
import { ConjugationTable } from './components/ConjugationTable';

interface VerbEntry {
  root: string;
  translation?: string;
}

export default function App() {
  const [selectedVerb, setSelectedVerb] = useState<VerbEntry | null>(null);
  const [selectedForm, setSelectedForm] = useState<string>('');
  const [verbType, setVerbType] = useState<VerbType>('sahih');
  const [visibleColumns, setVisibleColumns] = useState<string[]>([
    'activePast',
    'activePresent',
    'imperative',
    'activeParticiple',
  ]);
  const [rootInput, setRootInput] = useState<string>('');
  const [showDiacritics, setShowDiacritics] = useState(true);
  const [inputError, setInputError] = useState<string>('');

  // Auto-detect verb type when verb is selected
  useEffect(() => {
    if (selectedVerb) {
      const detected = detectVerbType(selectedVerb.root);
      setVerbType(detected);
      setSelectedForm('');
    }
  }, [selectedVerb]);

  // Handle root submission
  const handleRootSubmit = () => {
    const trimmedRoot = rootInput.trim();
    setInputError('');

    if (trimmedRoot.length < 3) {
      return;
    }

    if (!containsArabic(trimmedRoot)) {
      setInputError('Please enter Arabic letters (أدخل حروفًا عربية)');
      return;
    }

    setSelectedVerb({
      root: trimmedRoot,
      translation: 'Manual entry',
    });
    setRootInput('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8f6f3] via-white to-[#faf8f5] p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="backdrop-blur-md bg-white/80 border border-white/40 rounded-3xl p-8 shadow-xl">
            <h1 className="text-primary text-3xl mb-2">Sarf Conjugation Charts</h1>
            <p className="text-xl mb-4 font-arabic" dir="rtl">
              جداول الصرف
            </p>
            <p className="text-muted-foreground max-w-3xl">
              Interactive Arabic verb conjugation tables for all ten forms (I-X). Enter any verb root to see complete conjugations across all grammatical persons.
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-6">
          {/* Root Entry */}
          <div className="backdrop-blur-md bg-white/80 border border-white/40 rounded-3xl p-6 shadow-xl">
            <label className="block text-sm text-primary mb-2">
              <span dir="rtl" className="font-arabic">أدخل الجذر</span>
              <span className="opacity-70"> (Enter root)</span>
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                dir="rtl"
                value={rootInput}
                onChange={(e) => { setRootInput(e.target.value); setInputError(''); }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleRootSubmit();
                  }
                }}
                className="flex-1 px-4 py-3 rounded-lg border border-gray-300
                           focus:border-accent focus:ring-2 focus:ring-accent/20
                           outline-none transition-all text-xl font-arabic"
                placeholder="كتب، نصر، ضرب..."
              />
              <button
                onClick={handleRootSubmit}
                disabled={rootInput.trim().length < 3}
                className="px-6 py-3 bg-accent text-white rounded-lg
                           hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed
                           transition-all font-medium"
              >
                Enter
              </button>
            </div>
            {inputError ? (
              <p className="text-xs text-red-500 mt-2">{inputError}</p>
            ) : (
              <p className="text-xs text-gray-500 mt-2">
                <span dir="rtl" className="font-arabic">مثال: كتب (k-t-b), نصر (n-ṣ-r), ضرب (ḍ-r-b)</span>
              </p>
            )}
          </div>

          {selectedVerb && (
            <>
              {/* Verb Info & Controls */}
              <div className="backdrop-blur-md bg-white/80 border border-white/40 rounded-3xl p-6 shadow-xl">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                  {/* Selected Verb Display */}
                  <div>
                    <h2
                      className="text-3xl text-primary mb-2 font-arabic"
                      dir="rtl"
                    >
                      {selectedVerb.root}
                    </h2>
                    <p className="text-sm text-gray-600">
                      {selectedVerb.translation || ''}
                    </p>
                  </div>

                  {/* Verb Type Indicator */}
                  <VerbTypeIndicator detectedType={verbType} onChangeType={setVerbType} />
                </div>

                {/* Form Selector */}
                <FormSelector
                  verbType={verbType}
                  selectedForm={selectedForm}
                  onSelectForm={setSelectedForm}
                />
              </div>

              {selectedForm && (
                <>
                  {/* Column Toggle Controls + Diacritics Toggle */}
                  <div className="backdrop-blur-md bg-white/80 border border-white/40 rounded-3xl p-6 shadow-xl">
                    <div className="flex items-center justify-between flex-wrap gap-4">
                      <ColumnToggleControls
                        visibleColumns={visibleColumns}
                        onToggle={setVisibleColumns}
                      />
                      <button
                        onClick={() => setShowDiacritics(!showDiacritics)}
                        className={`flex items-center gap-2 px-3 py-1.5 text-sm rounded-lg border transition-all ${
                          showDiacritics
                            ? 'bg-accent text-white border-accent'
                            : 'bg-white text-primary border-gray-300 hover:border-accent'
                        }`}
                        title={showDiacritics ? 'Hide diacritics (tashkeel)' : 'Show diacritics (tashkeel)'}
                        aria-label={showDiacritics ? 'Hide diacritics' : 'Show diacritics'}
                        aria-pressed={showDiacritics}
                      >
                        {showDiacritics ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                        Diacritics
                      </button>
                    </div>
                  </div>

                  {/* Conjugation Table */}
                  <div className="backdrop-blur-md bg-white/80 border border-white/40 rounded-3xl p-6 shadow-xl">
                    <ConjugationTable
                      root={selectedVerb.root}
                      verbType={verbType}
                      formNumber={selectedForm}
                      visibleColumns={visibleColumns}
                      showDiacritics={showDiacritics}
                    />
                  </div>
                </>
              )}
            </>
          )}

          {/* Empty State */}
          {!selectedVerb && (
            <div className="text-center py-16">
              <div className="backdrop-blur-md bg-white/80 border border-white/40 rounded-3xl p-12 shadow-xl max-w-md mx-auto">
                <BookOpen className="w-16 h-16 text-accent mx-auto mb-4" />
                <h3 className="text-xl text-primary mb-2">
                  <span dir="rtl" className="font-arabic">ابدأ بإدخال الجذر</span>
                </h3>
                <p className="text-sm text-gray-600">
                  Enter a three-letter Arabic root to view its complete conjugation tables
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-muted-foreground text-sm">
          <p>Arab Tools - Sarf Conjugation Charts</p>
        </div>
      </div>
    </div>
  );
}
