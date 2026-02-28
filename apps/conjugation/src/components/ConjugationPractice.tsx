/**
 * Conjugation Practice Tool
 *
 * Arabic verb conjugation practice drills for all ten forms (I-X)
 * with 3-layer validation system and custom word list support.
 */

import { useState, useEffect, useMemo, useCallback } from 'react';
import { removeDiacritics, shuffle } from '@arabtools/core';
import { getRandomWords, getRandomWordsWithFallback, type ArabicWord } from '../data/arabicRoots';

// Known masdar patterns (without root substitution) - these are invalid gerunds
const MASDAR_PATTERNS = [
  'تفعيل', 'مفاعلة', 'إفعال', 'تفعل', 'تفاعل', 'انفعال', 'افتعال', 'افعلال', 'استفعال',
  'توحيد', 'موافقة', 'إيراد', 'توكل', 'تواضع', 'اتساع', 'استيداع',
  'تغيير', 'محاولة', 'إرادة', 'تجول', 'تعاون', 'انهيار', 'احتياج', 'اسوداد', 'استعاذة',
  'تصلية', 'منادات', 'إبكاء', 'تمني', 'تهادي', 'انجلاء', 'اجتباء', 'استغناء',
  'تخفيف', 'مشاقة', 'إحباب', 'تكرر', 'تحاج', 'انحلال', 'اعتداد', 'استقرار'
];

// Check if a verb has all required fields and valid data
function isValidVerb(word: ArabicWord): boolean {
  if (!word.pastTense || !word.presentTense || !word.gerund) return false;
  const cleanGerund = word.gerund.replace(/[\u064B-\u065F\u0670]/g, '');
  if (MASDAR_PATTERNS.includes(cleanGerund)) return false;
  return true;
}

import { getRandomFormCombinations, type FormCombination } from '../data/arabicForms';
import { getValidVerbTypesForForms, getValidConjugationTypesForForms } from '../data/conjugationValidation';
import { ConfigPanel } from './conjugation/ConfigPanel';

import { CustomWordManager } from './conjugation/CustomWordManager';
import { WordListSelector } from './conjugation/WordListSelector';
import { CreateListModal } from './conjugation/CreateListModal';
// import { ConjugationTableModal } from './conjugation/ConjugationTableModal'; // Disabled: conjugation tables have morphological accuracy issues
// import { DictionaryModal } from './conjugation/DictionaryModal'; // Disabled: Hans Wehr dictionary modal removed
import { RotateCcw, Play, Pause, Timer, ChevronDown } from 'lucide-react';
import type { WordList } from '../types';
import { presetWordLists, type PresetWordList } from '../data/presets';

type DisplayMode = 'tense-only' | 'seegah-only' | 'gerund-practice';

/** Diacritized display labels for tense-only and gerund-practice modes */
const TENSE_DISPLAY_LABELS: Record<string, string> = {
  'تصريف صغير': 'تَصْرِيْفٌ صَغِيْرٌ',
  'الماضي المبني للمعلوم': 'اَلْمَاضِي الْمَعْلُوْمُ',
  'الماضي المبني للمجهول': 'الْمَاضِي الْمَجْهُوْلُ',
  'المضارع المبني للمعلوم': 'الْمُضَارِعُ الْمَعْلُوْمُ',
  'المضارع المبني للمجهول': 'الْمُضَارِعُ الْمَجْهُوْلُ',
  'الأمر': 'اَلْأَمْرُ',
  'النهي': 'النَّهْيُ',
  'اسم الفاعل': 'اسْمُ الْفَاعِلِ',
  'اسم المفعول': 'اسْمُ الْمَفْعُوْلِ',
};

export function ConjugationPractice() {
  const [refreshKey, setRefreshKey] = useState(0);
  const [selectedForms, setSelectedForms] = useState<number[]>([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  const [selectedVerbTypes, setSelectedVerbTypes] = useState<string[]>([
    'Regular', 'Mithal', 'Ajwaf', 'Naqis', "Mudaa'af",
    "Mahmooz al-Fa'", "Mahmooz al-'Ayn", 'Mahmooz al-Lam',
    'Lafif Maqroon', 'Lafif Mafrooq'
  ]);
  const [selectedConjugationTypes, setSelectedConjugationTypes] = useState<string[]>([
    'تصريف صغير',
    'الماضي المبني للمعلوم',
    'الماضي المبني للمجهول',
    'المضارع المبني للمعلوم',
    'المضارع المبني للمجهول',
    'الأمر',
    'النهي',
    'اسم الفاعل',
    'اسم المفعول'
  ]);
  const [displayMode, setDisplayMode] = useState<DisplayMode>('tense-only');
  const [strictMode, setStrictMode] = useState(false);
  const [cellCount, setCellCount] = useState(10);
  const [fixedBaabs, setFixedBaabs] = useState<[string, string][] | null>(null);
  const [words, setWords] = useState<ArabicWord[]>([]);
  const [forms, setForms] = useState<FormCombination[]>([]);
  const [formsProgressionWords, setFormsProgressionWords] = useState<{ form: number; word: ArabicWord }[]>([]);

  // Display options
  const [useFormsProgression, setUseFormsProgression] = useState(true);
  const [showFormLabel, setShowFormLabel] = useState(false);
  const [showVerbType, setShowVerbType] = useState(false);
  const [showTranslation, setShowTranslation] = useState(false);
  const [showDiacritics, setShowDiacritics] = useState(true);

  // Modal state

  const [isCustomWordManagerOpen, setIsCustomWordManagerOpen] = useState(false);
  const [isCreateListModalOpen, setIsCreateListModalOpen] = useState(false);
  // const [conjugationTableWord, setConjugationTableWord] = useState<ArabicWord | null>(null); // Disabled: conjugation tables have morphological accuracy issues
  // const [dictionaryWord, setDictionaryWord] = useState<ArabicWord | null>(null); // Disabled: Hans Wehr dictionary modal removed

  // Word list state
  const [wordLists, setWordLists] = useState<WordList[]>([]);
  const [activeListId, setActiveListId] = useState<string | null>(null);

  const [isLoadingLists, setIsLoadingLists] = useState(false);

  // Timer state
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);

  // Mobile state
  const [isDisplayOptionsExpanded, setIsDisplayOptionsExpanded] = useState(false);

  // Filter verb types based on selected forms using validation
  const validVerbTypes = useMemo(() => {
    return getValidVerbTypesForForms(selectedForms, selectedVerbTypes, strictMode);
  }, [selectedForms, selectedVerbTypes, strictMode]);

  // Filter conjugation types based on selected forms
  const validConjugationTypes = useMemo(() => {
    return getValidConjugationTypesForForms(selectedForms, selectedConjugationTypes, !strictMode);
  }, [selectedForms, selectedConjugationTypes, strictMode]);

  // Compute words to practice based on mode and selected list
  const customWordsPool = useMemo(() => {
    if (activeListId) {
      const list = wordLists.find(l => l.id === activeListId);
      return list?.words || [];
    }
    return wordLists.flatMap(l => l.words);
  }, [wordLists, activeListId]);

  // Helper to convert form number to Roman numeral
  const numberToRoman = useCallback((num: number): string => {
    const map: Record<number, string> = {
      1: 'I', 2: 'II', 3: 'III', 4: 'IV', 5: 'V',
      6: 'VI', 7: 'VII', 8: 'VIII', 9: 'IX', 10: 'X'
    };
    return map[num] || 'I';
  }, []);

  // Generate forms progression words (one word per selected form) - synchronous version
  const generateFormsProgressionWordsSync = useCallback(() => {
    const typesToUse = validVerbTypes.length > 0 ? validVerbTypes : selectedVerbTypes;
    const sortedForms = [...selectedForms].sort((a, b) => a - b);
    const results: { form: number; word: ArabicWord }[] = [];

    for (const formNum of sortedForms) {
      const customWordsForForm = customWordsPool.filter(w => {
        const wordFormNum = w.verbForm
          ? ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'].indexOf(w.verbForm) + 1
          : 1;
        return wordFormNum === formNum && isValidVerb(w);
      });

      if (customWordsForForm.length > 0) {
        const shuffled = shuffle(customWordsForForm);
        results.push({ form: formNum, word: shuffled[0] });
      } else {
        const wordsForForm = getRandomWords(5, typesToUse, [formNum], strictMode);
        const validWordsForForm = wordsForForm.filter(w => isValidVerb(w));

        if (validWordsForForm.length > 0) {
          results.push({ form: formNum, word: validWordsForForm[0] });
        } else if (customWordsForForm.length > 0) {
          results.push({ form: formNum, word: customWordsForForm[0] });
        }
      }
    }

    return results;
  }, [selectedForms, validVerbTypes, selectedVerbTypes, strictMode, customWordsPool]);

  // Generate cards only on mount and when user clicks Randomize
  useEffect(() => {
    const typesToUse = validVerbTypes.length > 0 ? validVerbTypes : selectedVerbTypes;

    const baseWords = getRandomWordsWithFallback(cellCount * 2, typesToUse, selectedForms, strictMode);
    const validBaseWords = baseWords.filter(w => isValidVerb(w));
    const validCustomWords = customWordsPool.filter(w => isValidVerb(w));

    let selectedWords: ArabicWord[];
    if (fixedBaabs) {
      // Pick one random verb per baab pattern (عين vowel in past/present)
      const pool = validCustomWords.length > 0 ? validCustomWords : validBaseWords;
      const diacriticRe = /[\u064B-\u065F\u0670]/;
      const getVowelAfterNthConsonant = (verb: string, n: number): string => {
        let consonantCount = 0;
        for (let i = 0; i < verb.length; i++) {
          if (!diacriticRe.test(verb[i])) consonantCount++;
          if (consonantCount === n && diacriticRe.test(verb[i])) return verb[i];
        }
        return '';
      };
      selectedWords = fixedBaabs.map(([pastVowel, presentVowel]) => {
        const matches = pool.filter(w =>
          getVowelAfterNthConsonant(w.pastTense, 2) === pastVowel &&
          getVowelAfterNthConsonant(w.presentTense, 3) === presentVowel
        );
        if (matches.length > 0) return shuffle(matches)[0];
        return null;
      }).filter((w): w is ArabicWord => w != null);
    } else {
      selectedWords = validCustomWords.length === 0
        ? shuffle(validBaseWords).slice(0, cellCount)
        : shuffle(validCustomWords).slice(0, cellCount);
    }

    setWords(selectedWords);

    const generatedForms = getRandomFormCombinations(cellCount, selectedForms, selectedConjugationTypes, {
      strictMode,
      allowDisputed: !strictMode
    });

    setForms(generatedForms);

    // Generate forms progression words
    const progressionWords = generateFormsProgressionWordsSync();
    setFormsProgressionWords(progressionWords);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshKey, customWordsPool, cellCount, fixedBaabs]);

  // Regenerate forms progression when toggle is enabled or forms change
  useEffect(() => {
    if (useFormsProgression) {
      const progressionWords = generateFormsProgressionWordsSync();
      setFormsProgressionWords(progressionWords);
    }
  }, [useFormsProgression, selectedForms, generateFormsProgressionWordsSync]);

  // Timer interval effect
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;

    if (isTimerRunning) {
      interval = setInterval(() => {
        setElapsedTime(prev => prev + 1);
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning]);

  // LocalStorage key for word lists
  const WORD_LISTS_KEY = 'arabtools-conjugation-word-lists';

  // Helper to load from localStorage
  const loadFromLocalStorage = (): WordList[] => {
    try {
      const stored = localStorage.getItem(WORD_LISTS_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  };

  // Helper to save to localStorage
  const saveToLocalStorage = (lists: WordList[]) => {
    localStorage.setItem(WORD_LISTS_KEY, JSON.stringify(lists));
  };

  // Load word lists on mount (localStorage only, seed presets on first use)
  useEffect(() => {
    setIsLoadingLists(true);
    let lists = loadFromLocalStorage();
    if (lists.length === 0) {
      const now = new Date().toISOString();
      lists = presetWordLists.map(preset => ({
        id: crypto.randomUUID(),
        name: preset.name,
        nameAr: preset.nameAr,
        words: preset.words,
        createdAt: now,
        updatedAt: now,
      }));
      saveToLocalStorage(lists);
    }
    setWordLists(lists);
    setIsLoadingLists(false);
  }, []);

  const handleCreateList = (name: string, nameAr?: string) => {
    const newList: WordList = {
      id: crypto.randomUUID(),
      name,
      nameAr,
      words: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const updated = [newList, ...wordLists];
    setWordLists(updated);
    setActiveListId(newList.id);
    saveToLocalStorage(updated);
  };


  const handleDeleteWordFromList = (listId: string, wordIndex: number) => {
    const list = wordLists.find(l => l.id === listId);
    if (!list) return;

    const updatedWords = list.words.filter((_, i) => i !== wordIndex);
    const updated = wordLists.map(l =>
      l.id === listId ? { ...l, words: updatedWords, updatedAt: new Date().toISOString() } : l
    );

    setWordLists(updated);
    saveToLocalStorage(updated);
  };

  const handleRenameList = (listId: string, name: string, nameAr?: string) => {
    const updated = wordLists.map(l =>
      l.id === listId ? { ...l, name, nameAr, updatedAt: new Date().toISOString() } : l
    );

    setWordLists(updated);
    saveToLocalStorage(updated);
  };

  const handleDeleteList = (listId: string) => {
    const updated = wordLists.filter(l => l.id !== listId);
    setWordLists(updated);
    if (activeListId === listId) {
      setActiveListId(null);
    }
    saveToLocalStorage(updated);
  };

  const handleExportList = (listId: string) => {
    const list = wordLists.find(l => l.id === listId);
    if (!list) return;

    const dataStr = JSON.stringify(list.words, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${list.name.replace(/\s+/g, '-')}-words.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportWords = (listId: string, importedWords: ArabicWord[]) => {
    const list = wordLists.find(l => l.id === listId);
    if (!list) return;

    const updatedWords = [...list.words, ...importedWords];
    const updated = wordLists.map(l =>
      l.id === listId ? { ...l, words: updatedWords, updatedAt: new Date().toISOString() } : l
    );

    setWordLists(updated);
    saveToLocalStorage(updated);
  };

  const handleImportPreset = (preset: PresetWordList) => {
    // Create a new word list from the preset
    const newList: WordList = {
      id: crypto.randomUUID(),
      name: preset.name,
      nameAr: preset.nameAr,
      words: preset.words,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const updated = [newList, ...wordLists];
    setWordLists(updated);
    setActiveListId(newList.id);
    saveToLocalStorage(updated);
  };

  const handleRandomize = () => {
    setRefreshKey(prev => prev + 1);
  };

  const handleTimerToggle = () => {
    setIsTimerRunning(prev => !prev);
  };

  const handleTimerReset = () => {
    setIsTimerRunning(false);
    setElapsedTime(0);
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8f6f3] via-white to-[#faf8f5] p-4 md:p-6 lg:p-8">
      <div className="max-w-5xl mx-auto">
        {/* Config Panel */}
        <ConfigPanel
          selectedForms={selectedForms}
          selectedVerbTypes={selectedVerbTypes}
          selectedConjugationTypes={selectedConjugationTypes}
          onFormsChange={setSelectedForms}
          onVerbTypesChange={setSelectedVerbTypes}
          onConjugationTypesChange={setSelectedConjugationTypes}
          validVerbTypes={validVerbTypes}
          validConjugationTypes={validConjugationTypes}
          strictMode={strictMode}
          onStrictModeChange={setStrictMode}
          cellCount={cellCount}
          onCellCountChange={setCellCount}
          onPresetSelect={(presetListName, options) => {
            const match = wordLists.find(l => l.name === presetListName);
            if (match) setActiveListId(match.id);
            if (options?.cellCount) setCellCount(options.cellCount);
            if (options?.disableFormsProgression) {
              setUseFormsProgression(false);
            } else {
              setUseFormsProgression(true);
            }
            setFixedBaabs(options?.fixedBaabs || null);
          }}
        />

        {/* Display Mode, Strict Mode & Randomize Controls */}
        <div className="mb-8 backdrop-blur-md bg-white/80 border border-white/40 rounded-3xl shadow-lg flex flex-col">
          {/* Mobile: Collapsible header for display options */}
          <button
            onClick={() => setIsDisplayOptionsExpanded(!isDisplayOptionsExpanded)}
            className="sm:hidden flex items-center justify-between p-4 w-full"
            aria-expanded={isDisplayOptionsExpanded}
            aria-controls="display-options-panel"
          >
            <span className="text-sm font-medium text-primary">Display Options</span>
            <ChevronDown
              className={`w-5 h-5 text-primary transition-transform ${
                isDisplayOptionsExpanded ? 'rotate-180' : ''
              }`}
            />
          </button>

          {/* Row 1: Display options on left, Forms I-X on right */}
          <div
            id="display-options-panel"
            className={`flex items-center justify-between flex-wrap gap-4 p-5 pt-0 sm:pt-5 ${
              isDisplayOptionsExpanded ? 'block' : 'hidden sm:flex'
            }`}
          >
            <div className="flex items-center gap-4 flex-wrap mobile-controls">
              {/* Display Mode */}
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm text-muted-foreground">Display:</span>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setDisplayMode('tense-only')}
                    className={`px-3 py-2 sm:py-1 text-xs rounded-lg border transition-all ${
                      displayMode === 'tense-only'
                        ? 'bg-accent text-white border-accent'
                        : 'bg-white text-primary border-gray-300 hover:border-accent'
                    }`}
                  >
                    Tenses
                  </button>
                  <button
                    onClick={() => setDisplayMode('seegah-only')}
                    className={`px-3 py-2 sm:py-1 text-xs rounded-lg border transition-all ${
                      displayMode === 'seegah-only'
                        ? 'bg-accent text-white border-accent'
                        : 'bg-white text-primary border-gray-300 hover:border-accent'
                    }`}
                  >
                    Seegah
                  </button>
                  <button
                    onClick={() => setDisplayMode('gerund-practice')}
                    className={`px-3 py-2 sm:py-1 text-xs rounded-lg border transition-all ${
                      displayMode === 'gerund-practice'
                        ? 'bg-accent text-white border-accent'
                        : 'bg-white text-primary border-gray-300 hover:border-accent'
                    }`}
                  >
                    Gerund Practice
                  </button>
                </div>
              </div>

              {/* Show/Hide toggles */}
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs text-muted-foreground">Show:</span>
                <button
                  onClick={() => setShowFormLabel(!showFormLabel)}
                  className={`px-3 py-2 sm:py-1 text-xs rounded-lg border transition-all ${
                    showFormLabel
                      ? 'bg-accent text-white border-accent'
                      : 'bg-white text-primary border-gray-300 hover:border-accent'
                  }`}
                >
                  Form Label
                </button>
                <button
                  onClick={() => setShowVerbType(!showVerbType)}
                  className={`px-3 py-2 sm:py-1 text-xs rounded-lg border transition-all ${
                    showVerbType
                      ? 'bg-accent text-white border-accent'
                      : 'bg-white text-primary border-gray-300 hover:border-accent'
                  }`}
                >
                  Verb Type
                </button>
                <button
                  onClick={() => setShowTranslation(!showTranslation)}
                  className={`px-3 py-2 sm:py-1 text-xs rounded-lg border transition-all ${
                    showTranslation
                      ? 'bg-accent text-white border-accent'
                      : 'bg-white text-primary border-gray-300 hover:border-accent'
                  }`}
                >
                  Translation
                </button>
                <button
                  onClick={() => setShowDiacritics(!showDiacritics)}
                  className={`px-3 py-2 sm:py-1 text-xs rounded-lg border transition-all ${
                    showDiacritics
                      ? 'bg-accent text-white border-accent'
                      : 'bg-white text-primary border-gray-300 hover:border-accent'
                  }`}
                  title="Show/hide diacritics (tashkeel) on Arabic text"
                  aria-label={showDiacritics ? 'Hide diacritics' : 'Show diacritics'}
                >
                  Diacritics
                </button>
              </div>

              {/* Mode toggles */}
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs text-muted-foreground">Mode:</span>
                <button
                  onClick={() => setUseFormsProgression(!useFormsProgression)}
                  className={`px-3 py-2 sm:py-1 text-xs rounded-lg border transition-all ${
                    useFormsProgression
                      ? 'bg-accent text-white border-accent'
                      : 'bg-white text-primary border-gray-300 hover:border-accent'
                  }`}
                  aria-pressed={useFormsProgression}
                >
                  Forms I-X
                </button>
                <button
                  onClick={() => setStrictMode(!strictMode)}
                  className={`px-3 py-2 sm:py-1 text-xs rounded-lg border transition-all ${
                    strictMode
                      ? 'bg-accent text-white border-accent'
                      : 'bg-white text-primary border-gray-300 hover:border-accent'
                  }`}
                  title="Blocks rare combinations and disputed passives"
                  aria-pressed={strictMode}
                >
                  Strict
                </button>
              </div>
            </div>
          </div>

          {/* Row 2: Word list controls on left, actions on right */}
          <div className="flex items-center justify-between flex-wrap gap-4 p-5 pt-0 border-t border-gray-200 sm:border-t-0">
            <div className="flex items-center gap-4 flex-wrap">
              {/* Word List Controls */}
              <WordListSelector
                wordLists={wordLists}
                activeListId={activeListId}
                onSelectList={setActiveListId}
                onCreateList={() => setIsCreateListModalOpen(true)}
                isLoading={isLoadingLists}
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {/* Timer */}
              <div className="flex items-center gap-2 px-3 py-2 sm:py-1 rounded-lg border border-gray-300 bg-white">
                <Timer className="w-3.5 h-3.5 text-primary" aria-hidden="true" />
                <span className="text-sm font-mono text-primary min-w-[3rem]" aria-live="polite" aria-label={`Timer: ${formatTime(elapsedTime)}`}>
                  {formatTime(elapsedTime)}
                </span>
                <button
                  onClick={handleTimerToggle}
                  className="p-2 sm:p-1 rounded hover:bg-gray-100 transition-all"
                  aria-label={isTimerRunning ? 'Pause timer' : 'Start timer'}
                >
                  {isTimerRunning ? (
                    <Pause className="w-3.5 h-3.5 text-accent" />
                  ) : (
                    <Play className="w-3.5 h-3.5 text-accent" />
                  )}
                </button>
                <button
                  onClick={handleTimerReset}
                  className="p-2 sm:p-1 rounded hover:bg-gray-100 transition-all"
                  aria-label="Reset timer"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-muted-foreground" />
                </button>
              </div>

              <button
                onClick={handleRandomize}
                className="flex items-center gap-2 px-3 py-2 sm:py-1 text-xs rounded-lg border transition-all bg-accent text-white border-accent hover:opacity-90"
                aria-label="Randomize practice cards"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Randomize
              </button>
            </div>
          </div>
        </div>

        {/* Main Content: Paired Rows */}
        <div className="space-y-6 lg:space-y-8 max-w-5xl mx-auto px-2 py-4">
          {(useFormsProgression ? formsProgressionWords : words.slice(0, Math.min(words.length, forms.length)).map((w, i) => ({ form: null as number | null, word: w, index: i }))).map((item, idx) => {
            const isFormsMode = useFormsProgression;
            const formNum = isFormsMode ? (item as { form: number; word: ArabicWord }).form : null;
            const word = item.word;
            const index = isFormsMode ? idx : (item as { form: null; word: ArabicWord; index: number }).index;
            const formData = forms[index % forms.length];

            // For gerund practice mode
            if (displayMode === 'gerund-practice') {
              return (
                <div key={isFormsMode ? formNum : index} className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                  {/* Left: Gerund only */}
                  <div
                    className="rounded-lg shadow-md border border-accent/20 transition-all duration-200 hover:shadow-lg flex flex-col"
                    style={{
                      backgroundColor: 'rgba(197, 162, 83, 0.05)',
                      borderColor: '#c5a253'
                    }}
                  >
                    <div className="flex items-center justify-between px-4 py-2 border-b border-accent/20">
                      <div className="flex items-center gap-2">
                        {showFormLabel && (
                          <span className="text-xs font-medium px-2 py-1 bg-accent/20 text-accent rounded">
                            Form {numberToRoman(formNum || (['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'].indexOf(word.verbForm || 'I') + 1))}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        {showVerbType && (
                          <span className="text-xs text-muted-foreground">
                            {word.type}
                          </span>
                        )}
                        {/* Dictionary + Conjugation table buttons disabled */}
                      </div>
                    </div>
                    <div className="flex-1 flex items-center justify-center p-6" dir="rtl">
                      <div className="text-center">
                        <div className="text-3xl mb-2 font-arabic text-primary">
                          {showDiacritics ? word.gerund : removeDiacritics(word.gerund)}
                        </div>
                        {showTranslation && word.meaning && (
                          <div className="text-sm text-muted-foreground">{word.meaning}</div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right: Conjugation type */}
                  <div
                    className="rounded-lg shadow-md border border-primary/20 transition-all duration-200 hover:shadow-lg flex items-center justify-center"
                    style={{
                      backgroundColor: 'rgba(26, 49, 80, 0.05)',
                      borderColor: '#1a3150',
                      padding: '1.5rem'
                    }}
                  >
                    {formData ? (
                      <div className="text-center" dir="rtl">
                        <div className="text-2xl font-arabic text-primary">
                          {(() => { const key = formData.conjugationType.split(' (')[0]; const label = TENSE_DISPLAY_LABELS[key] || key; return showDiacritics ? label : removeDiacritics(label); })()}
                        </div>
                      </div>
                    ) : (
                      <div className="text-muted-foreground">-</div>
                    )}
                  </div>
                </div>
              );
            }

            // Normal display modes (tense-only, seegah-only)
            return (
              <div key={isFormsMode ? formNum : index} className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                {/* Left: Verb card */}
                <div
                  className="rounded-lg shadow-md border border-accent/20 transition-all duration-200 hover:shadow-lg flex flex-col"
                  style={{
                    backgroundColor: 'rgba(197, 162, 83, 0.05)',
                    borderColor: '#c5a253'
                  }}
                >
                  <div className="flex items-center justify-between px-4 py-2 border-b border-accent/20">
                    <div className="flex items-center gap-2">
                      {showFormLabel && (
                        <span className="text-xs font-medium px-2 py-1 bg-accent/20 text-accent rounded">
                          Form {numberToRoman(formNum || (['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'].indexOf(word.verbForm || 'I') + 1))}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      {showVerbType && (
                        <span className="text-xs text-muted-foreground">
                          {word.type}
                        </span>
                      )}
                      {/* Dictionary + Conjugation table buttons disabled */}
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col justify-center">
                    <div className="verb-triplet flex items-center justify-center gap-4 sm:gap-6 p-4 sm:p-6" dir="rtl" lang="ar">
                      <div className="text-xl sm:text-2xl font-arabic text-primary">
                        {showDiacritics ? word.pastTense : removeDiacritics(word.pastTense)}
                      </div>
                      <div className="text-xl sm:text-2xl font-arabic text-primary">
                        {showDiacritics ? word.presentTense : removeDiacritics(word.presentTense)}
                      </div>
                      <div className="text-xl sm:text-2xl font-arabic text-primary">
                        {showDiacritics ? word.gerund : removeDiacritics(word.gerund)}
                      </div>
                    </div>
                    {showTranslation && word.meaning && (
                      <div className="text-center pb-4 px-4">
                        <div className="text-sm text-muted-foreground">{word.meaning}</div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Right: Form/Seegah card */}
                <div
                  className="rounded-lg shadow-md border border-primary/20 transition-all duration-200 hover:shadow-lg flex items-center justify-center"
                  style={{
                    backgroundColor: 'rgba(26, 49, 80, 0.05)',
                    borderColor: '#1a3150',
                    padding: '1.5rem'
                  }}
                >
                  {formData ? (
                    <div className="text-center" dir="rtl">
                      {displayMode === 'tense-only' && (
                        <div className="text-xl font-arabic text-primary">
                          {(() => { const key = formData.conjugationType.split(' (')[0]; const label = TENSE_DISPLAY_LABELS[key] || key; return showDiacritics ? label : removeDiacritics(label); })()}
                        </div>
                      )}
                      {displayMode === 'seegah-only' && formData.seegah && (
                        <div className="text-xl font-arabic text-primary leading-relaxed">
                          {showDiacritics ? formData.seegah.label : removeDiacritics(formData.seegah.label)}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-muted-foreground">-</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Custom Word Manager Modal */}
        <CustomWordManager
          isOpen={isCustomWordManagerOpen}
          onClose={() => setIsCustomWordManagerOpen(false)}
          wordLists={wordLists}
          activeListId={activeListId}
          onSelectList={setActiveListId}
          onCreateList={() => {
            setIsCustomWordManagerOpen(false);
            setIsCreateListModalOpen(true);
          }}
          onRenameList={handleRenameList}
          onDeleteList={handleDeleteList}
          onDeleteWord={handleDeleteWordFromList}
          onExportList={handleExportList}
          onImportWords={handleImportWords}
          onImportPreset={handleImportPreset}
        />

        {/* Create List Modal */}
        <CreateListModal
          isOpen={isCreateListModalOpen}
          onClose={() => setIsCreateListModalOpen(false)}
          onCreate={handleCreateList}
        />

        {/* Conjugation Table Modal + Dictionary Modal disabled */}
      </div>
    </div>
  );
}
