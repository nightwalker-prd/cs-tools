/**
 * Add Custom Word Modal
 *
 * Modal form for creating custom Arabic verbs with:
 * - Root input with validation
 * - Verb type and form selection
 * - Auto-generated conjugations from @arabiyya/sarf
 * - Fallback manual entry if generation fails
 * - Optional meaning field
 */

import { useState, useEffect, useRef, useCallback } from 'react';
import { X, AlertCircle, CheckCircle, RefreshCw, Edit3 } from 'lucide-react';
import type { ArabicWord } from '../../data/arabicRoots';
import type { WordList } from '../../types';
import { validateFormForVerbType } from '../../data/conjugationValidation';
import { generateConjugation, isGenerationAvailable } from '../../utils/generateConjugation';

type VerbForm = 'I' | 'II' | 'III' | 'IV' | 'V' | 'VI' | 'VII' | 'VIII' | 'IX' | 'X';

// Validation utilities
function isValidArabicRoot(root: string): boolean {
  // Pattern: Arabic letter + space + Arabic letter + space + Arabic letter
  const pattern = /^[\u0600-\u06FF]\s[\u0600-\u06FF]\s[\u0600-\u06FF]$/;
  return pattern.test(root);
}

function romanToNumber(roman: string): number {
  const map: Record<string, number> = {
    'I': 1, 'II': 2, 'III': 3, 'IV': 4, 'V': 5,
    'VI': 6, 'VII': 7, 'VIII': 8, 'IX': 9, 'X': 10
  };
  return map[roman] || 1;
}

const VERB_TYPE_LABELS: Record<string, { en: string; ar: string }> = {
  'Regular': { en: 'Regular (Salim)', ar: 'سالم' },
  'Mithal': { en: 'Mithal (Initial Weak)', ar: 'مثال' },
  'Ajwaf': { en: 'Ajwaf (Hollow)', ar: 'أجوف' },
  'Naqis': { en: 'Naqis (Defective)', ar: 'ناقص' },
  "Mudaa'af": { en: "Mudaa'af (Doubled)", ar: 'مضاعف' },
  "Mahmooz al-Fa'": { en: "Mahmooz al-Fa' (Initial Hamza)", ar: 'مهموز الفاء' },
  "Mahmooz al-'Ayn": { en: "Mahmooz al-'Ayn (Medial Hamza)", ar: 'مهموز العين' },
  'Mahmooz al-Lam': { en: 'Mahmooz al-Lam (Final Hamza)', ar: 'مهموز اللام' },
  'Lafif Maqroon': { en: 'Lafif Maqroon (Adjacent Weak)', ar: 'لفيف مقرون' },
  'Lafif Mafrooq': { en: 'Lafif Mafrooq (Separated Weak)', ar: 'لفيف مفروق' }
};

const VERB_FORM_OPTIONS: Array<{ value: string; label: string }> = [
  { value: 'I', label: 'Form I (فَعَلَ)' },
  { value: 'II', label: 'Form II (فَعَّلَ)' },
  { value: 'III', label: 'Form III (فَاعَلَ)' },
  { value: 'IV', label: 'Form IV (أَفْعَلَ)' },
  { value: 'V', label: 'Form V (تَفَعَّلَ)' },
  { value: 'VI', label: 'Form VI (تَفَاعَلَ)' },
  { value: 'VII', label: 'Form VII (اِنْفَعَلَ)' },
  { value: 'VIII', label: 'Form VIII (اِفْتَعَلَ)' },
  { value: 'IX', label: 'Form IX (اِفْعَلَّ)' },
  { value: 'X', label: 'Form X (اِسْتَفْعَلَ)' }
];

interface AddCustomWordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (word: ArabicWord, listId: string) => void;
  wordLists: WordList[];
  defaultListId?: string;
}

export function AddCustomWordModal({ isOpen, onClose, onAdd, wordLists, defaultListId }: AddCustomWordModalProps) {
  const [root, setRoot] = useState('');
  const [verbType, setVerbType] = useState('Regular');
  const [verbForm, setVerbForm] = useState<VerbForm>('I');
  const [meaning, setMeaning] = useState('');
  const [selectedListId, setSelectedListId] = useState<string>(defaultListId || '');
  const [error, setError] = useState<string | null>(null);
  const [isValid, setIsValid] = useState(false);

  // Auto-generated conjugations
  const [pastTense, setPastTense] = useState('');
  const [presentTense, setPresentTense] = useState('');
  const [gerund, setGerund] = useState('');
  const [isManualMode, setIsManualMode] = useState(false);
  const [generationStatus, setGenerationStatus] = useState<'idle' | 'generating' | 'success' | 'failed'>('idle');

  // Refs for focus management
  const firstInputRef = useRef<HTMLSelectElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Reset selectedListId when defaultListId changes
  useEffect(() => {
    if (defaultListId) {
      setSelectedListId(defaultListId);
    }
  }, [defaultListId]);

  // Focus first input when modal opens
  useEffect(() => {
    if (isOpen && firstInputRef.current) {
      setTimeout(() => firstInputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Keyboard event handler for Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  // Auto-generate conjugations when root, type, and form are valid
  const attemptGeneration = useCallback(() => {
    if (!isValidArabicRoot(root)) {
      return;
    }

    // Check if generation is available for this combination
    if (!isGenerationAvailable(verbType, verbForm)) {
      setGenerationStatus('failed');
      setIsManualMode(true);
      return;
    }

    setGenerationStatus('generating');

    // Small delay to show generating state
    setTimeout(() => {
      const result = generateConjugation(root, verbType, verbForm);

      if (result) {
        setPastTense(result.pastTense);
        setPresentTense(result.presentTense);
        setGerund(result.gerund);
        setGenerationStatus('success');
        setIsManualMode(false);
      } else {
        setGenerationStatus('failed');
        setIsManualMode(true);
      }
    }, 100);
  }, [root, verbType, verbForm]);

  // Trigger generation when inputs change (and are valid)
  useEffect(() => {
    if (isValidArabicRoot(root) && !isManualMode) {
      attemptGeneration();
    }
  }, [root, verbType, verbForm, attemptGeneration, isManualMode]);

  // Real-time validation
  useEffect(() => {
    setError(null);
    setIsValid(false);

    // Don't validate if root is empty
    if (!root.trim()) {
      return;
    }

    // Validate root format
    if (!isValidArabicRoot(root)) {
      setError('Root must be 3 Arabic letters separated by spaces (e.g., "ك ت ب")');
      return;
    }

    // Validate form-type compatibility
    const formNumber = romanToNumber(verbForm);
    const validation = validateFormForVerbType(formNumber, verbType, false);
    if (!validation.valid) {
      setError(validation.message || 'Invalid combination');
      return;
    }

    // Check if we have conjugations (either generated or manual)
    if (!pastTense || !presentTense) {
      if (generationStatus === 'failed' || isManualMode) {
        setError('Please enter the past and present tense forms manually');
      }
      return;
    }

    setIsValid(true);
  }, [root, verbType, verbForm, pastTense, presentTense, generationStatus, isManualMode]);

  const handleAdd = () => {
    if (!isValid || !selectedListId) return;

    const customWord: ArabicWord = {
      root,
      type: verbType,
      verbForm,
      pastTense,
      presentTense,
      gerund: gerund || '',
      meaning: meaning.trim() || undefined,
      difficulty: 'intermediate'
    };

    onAdd(customWord, selectedListId);
    handleClose();
  };

  const handleClose = () => {
    // Reset form
    setRoot('');
    setVerbType('Regular');
    setVerbForm('I');
    setMeaning('');
    setPastTense('');
    setPresentTense('');
    setGerund('');
    setIsManualMode(false);
    setGenerationStatus('idle');
    setError(null);
    setIsValid(false);
    onClose();
  };

  const handleRetryGeneration = () => {
    setIsManualMode(false);
    setPastTense('');
    setPresentTense('');
    setGerund('');
    attemptGeneration();
  };

  const handleSwitchToManual = () => {
    setIsManualMode(true);
    setGenerationStatus('idle');
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="add-word-modal-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        ref={modalRef}
        className="relative bg-white rounded-3xl shadow-2xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
          <div>
            <h2 id="add-word-modal-title" className="text-2xl font-semibold text-primary">Add Custom Word</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Create a custom Arabic verb for practice
            </p>
          </div>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-6 space-y-6">
          {/* List Selector */}
          {wordLists.length > 0 && (
            <div>
              <label htmlFor="word-list-select" className="block text-sm font-medium text-gray-700 mb-2">
                Add to List <span className="text-red-500">*</span>
              </label>
              <select
                id="word-list-select"
                ref={firstInputRef}
                value={selectedListId}
                onChange={(e) => setSelectedListId(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
              >
                <option value="">Select a list...</option>
                {wordLists.map((list) => (
                  <option key={list.id} value={list.id}>
                    {list.name} {list.nameAr && `(${list.nameAr})`}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Root Input */}
          <div>
            <label htmlFor="root-input" className="block text-sm font-medium text-gray-700 mb-2">
              Root Letters <span className="text-red-500">*</span>
            </label>
            <input
              id="root-input"
              type="text"
              value={root}
              onChange={(e) => setRoot(e.target.value)}
              placeholder="ك ت ب"
              dir="rtl"
              lang="ar"
              className="w-full px-4 py-3 text-2xl border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent font-arabic"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Enter 3 Arabic letters separated by spaces
            </p>
          </div>

          {/* Verb Type Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Verb Type <span className="text-red-500">*</span>
            </label>
            <select
              value={verbType}
              onChange={(e) => setVerbType(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
            >
              {Object.entries(VERB_TYPE_LABELS).map(([key, { en, ar }]) => (
                <option key={key} value={key}>
                  {en} ({ar})
                </option>
              ))}
            </select>
          </div>

          {/* Verb Form Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Verb Form <span className="text-red-500">*</span>
            </label>
            <select
              value={verbForm}
              onChange={(e) => setVerbForm(e.target.value as VerbForm)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
            >
              {VERB_FORM_OPTIONS.map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>

          {/* Conjugation Fields - Auto-generated or Manual */}
          {isValidArabicRoot(root) && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-gray-700">
                  Conjugations <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center gap-2">
                  {generationStatus === 'generating' && (
                    <span className="flex items-center gap-1 text-xs text-blue-600">
                      <RefreshCw className="w-3 h-3 animate-spin" />
                      Generating...
                    </span>
                  )}
                  {generationStatus === 'success' && !isManualMode && (
                    <button
                      type="button"
                      onClick={handleSwitchToManual}
                      className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700"
                      aria-label="Switch to manual entry"
                    >
                      <Edit3 className="w-3 h-3" />
                      Edit manually
                    </button>
                  )}
                  {(generationStatus === 'failed' || isManualMode) && (
                    <button
                      type="button"
                      onClick={handleRetryGeneration}
                      className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700"
                      aria-label="Retry auto-generation"
                    >
                      <RefreshCw className="w-3 h-3" />
                      Try auto-generate
                    </button>
                  )}
                </div>
              </div>

              {generationStatus === 'failed' && !pastTense && !presentTense && (
                <p className="text-xs text-amber-600">
                  Auto-generation unavailable for this combination. Please enter manually.
                </p>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Past Tense */}
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Past Tense (ماضي)
                  </label>
                  <input
                    type="text"
                    value={pastTense}
                    onChange={(e) => {
                      setPastTense(e.target.value);
                      if (!isManualMode) setIsManualMode(true);
                    }}
                    placeholder="كَتَبَ"
                    dir="rtl"
                    lang="ar"
                    disabled={generationStatus === 'generating'}
                    className="w-full px-3 py-2 text-xl border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent disabled:bg-gray-100 font-arabic"
                  />
                </div>

                {/* Present Tense */}
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Present Tense (مضارع)
                  </label>
                  <input
                    type="text"
                    value={presentTense}
                    onChange={(e) => {
                      setPresentTense(e.target.value);
                      if (!isManualMode) setIsManualMode(true);
                    }}
                    placeholder="يَكْتُبُ"
                    dir="rtl"
                    lang="ar"
                    disabled={generationStatus === 'generating'}
                    className="w-full px-3 py-2 text-xl border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent disabled:bg-gray-100 font-arabic"
                  />
                </div>

                {/* Gerund */}
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Verbal Noun (مصدر)
                  </label>
                  <input
                    type="text"
                    value={gerund}
                    onChange={(e) => {
                      setGerund(e.target.value);
                      if (!isManualMode) setIsManualMode(true);
                    }}
                    placeholder="كِتَابَة"
                    dir="rtl"
                    lang="ar"
                    disabled={generationStatus === 'generating'}
                    className="w-full px-3 py-2 text-xl border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent disabled:bg-gray-100 font-arabic"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Meaning Input (Optional) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Meaning (Optional)
            </label>
            <input
              type="text"
              value={meaning}
              onChange={(e) => setMeaning(e.target.value)}
              placeholder="to write, to compose"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
            />
          </div>

          {/* Error Display */}
          {error && (
            <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
              <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-red-700">{error}</div>
            </div>
          )}

          {/* Valid Display */}
          {isValid && !error && (
            <div className="flex items-center gap-2 text-sm font-medium text-green-600">
              <CheckCircle className="w-4 h-4" />
              Ready to add
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 flex items-center justify-end gap-3 rounded-b-2xl">
          <button
            onClick={handleClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleAdd}
            disabled={!isValid || (wordLists.length > 0 && !selectedListId)}
            className={`px-6 py-2 text-sm font-medium rounded-lg transition-all ${
              isValid && (wordLists.length === 0 || selectedListId)
                ? 'bg-accent text-white hover:opacity-90 shadow-md'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Add Word
          </button>
        </div>
      </div>
    </div>
  );
}
