/**
 * Tarkeeb Analysis Tool
 * Classical Arabic Grammar Analysis with Interactive Exercises
 */

import { useState, useEffect, useMemo } from 'react';
import {
  ArrowLeft,
  BookOpen,
  RotateCcw,
  Microscope,
  Edit3,
  Eye,
  EyeOff,
  Volume2,
} from 'lucide-react';
import { useSpeechSynthesis } from '@arabtools/core';
import {
  tarkeebExercises as defaultTarkeebExercises,
  type TarkeebExercise,
} from '../data/tarkeebExercises';
import { tarkeebAnalysisExamples } from '../data/tarkeebAnalysis';
import { TarkeebAnalysisViewer } from './TarkeebAnalysisViewer';
import { StudentAnalysisForm, type StudentAnalysis } from './StudentAnalysisForm';
import { GrammaticalLabelSelector, SelectedLabelsDisplay } from './tarkeeb';
import { ResourceLinks } from './tarkeeb/ResourceLinks';
import { FstuPractice } from './FstuPractice';

type ListTab = 'tarkeeb' | 'fstu';

const STUDENT_ANALYSIS_STORAGE_KEY = 'arabtools-student-analysis';

// Re-export from shared package
export { grammaticalLabels } from '@arabtools/core';

interface TarkeebToolProps {
  onBack: () => void;
  initialExerciseId?: number | null;
}

export function TarkeebTool({ onBack, initialExerciseId }: TarkeebToolProps) {
  const [listTab, setListTab] = useState<ListTab>('tarkeeb');
  const [selectedUnit, setSelectedUnit] = useState<string>('2');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');
  const [currentExercise, setCurrentExercise] = useState<TarkeebExercise | null>(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [showTranslation, setShowTranslation] = useState(false);
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);
  // Always use core exercises from data files (not localStorage)
  const tarkeebExercises = defaultTarkeebExercises;

  // Student analyses state
  const [studentAnalyses, setStudentAnalyses] = useState<{ [key: number]: StudentAnalysis }>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STUDENT_ANALYSIS_STORAGE_KEY);
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error('Failed to parse saved student analyses:', e);
        }
      }
    }
    return {};
  });

  const [showStudentAnalysisForm, setShowStudentAnalysisForm] = useState(false);
  const [viewMode, setViewMode] = useState<'student' | 'expert'>('student');
  const [hideDiacritics, setHideDiacritics] = useState(false);

  // TTS hook
  const { speak, isSpeaking, isSupported } = useSpeechSynthesis({
    lang: 'ar-SA',
    rate: 0.8,
  });

  // Save student analyses to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STUDENT_ANALYSIS_STORAGE_KEY, JSON.stringify(studentAnalyses));
    }
  }, [studentAnalyses]);

  const handleSaveStudentAnalysis = (analysis: StudentAnalysis) => {
    setStudentAnalyses((prev) => ({
      ...prev,
      [analysis.exerciseId]: analysis,
    }));
    setShowStudentAnalysisForm(false);
    setViewMode('student'); // Show the student's analysis after saving
  };

  // Debounce search query for performance
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Load initial exercise if provided (when returning from related content)
  useEffect(() => {
    if (initialExerciseId) {
      const exercise = tarkeebExercises.find((ex) => ex.id === initialExerciseId);
      if (exercise) {
        setCurrentExercise(exercise);
        // Clear the exercise list filters to ensure the exercise is visible
        setSearchQuery('');
        setDebouncedSearchQuery('');
      }
    }
  }, [initialExerciseId, tarkeebExercises]);

  // Remove Arabic diacritical marks (tashkeel)
  const removeDiacritics = (text: string): string => {
    // Remove all Arabic diacritical marks (harakat)
    return text.replace(/[\u064B-\u0652\u0670\u0640]/g, '');
  };

  // Normalize Arabic text for flexible search (remove diacritics)
  const normalizeArabic = (text: string): string => {
    return text.replace(/[\u064B-\u0652\u0670\u0640]/g, '').trim();
  };

  // Pre-compute normalized Arabic text once for performance (using Map)
  const normalizedMap = useMemo(() => {
    const map = new Map<number, string>();
    tarkeebExercises.forEach((ex) => {
      map.set(ex.id, normalizeArabic(ex.arabic));
    });
    return map;
  }, [tarkeebExercises]);

  // Filter exercises
  const filteredExercises = useMemo(() => {
    return tarkeebExercises.filter((ex) => {
      const difficultyMatch = selectedDifficulty === 'all' || ex.difficulty === selectedDifficulty;

      // If there's a search query, search across ALL units
      if (debouncedSearchQuery.trim() !== '') {
        const normalizedQuery = normalizeArabic(debouncedSearchQuery);
        const normalizedArabic = normalizedMap.get(ex.id)!;
        const searchMatch = normalizedArabic.includes(normalizedQuery);
        return searchMatch && difficultyMatch;
      }

      // Otherwise, apply unit filter
      const unitMatch = selectedUnit === 'all' || ex.unit === selectedUnit;
      return unitMatch && difficultyMatch;
    });
  }, [debouncedSearchQuery, selectedUnit, selectedDifficulty, normalizedMap, tarkeebExercises]);

  // Limit displayed results for performance
  const MAX_RESULTS = 100;
  const displayedExercises = useMemo(() => {
    return filteredExercises.slice(0, MAX_RESULTS);
  }, [filteredExercises]);

  const handleStartExercise = (exercise: TarkeebExercise) => {
    setCurrentExercise(exercise);
    setUserAnswer('');
    setShowTranslation(false);
    setSelectedLabels([]);
    setHideDiacritics(false);
  };

  const handleReset = () => {
    setCurrentExercise(null);
    setUserAnswer('');
    setShowTranslation(false);
    setSelectedLabels([]);
    setHideDiacritics(false);
  };

  const toggleLabel = (labelId: string) => {
    setSelectedLabels((prev) =>
      prev.includes(labelId) ? prev.filter((l) => l !== labelId) : [...prev, labelId]
    );
  };

  if (currentExercise) {
    const hasDetailedAnalysis = tarkeebAnalysisExamples.some(
      (a) => a.exerciseId === currentExercise.id
    );
    const detailedAnalysis = tarkeebAnalysisExamples.find(
      (a) => a.exerciseId === currentExercise.id
    );
    const studentAnalysis = studentAnalyses[currentExercise.id];
    const hasStudentAnalysis = !!studentAnalysis;

    // Analysis panel is visible if any analysis exists
    const showAnalysisPanel = hasDetailedAnalysis || hasStudentAnalysis;

    // Determine which analysis to show based on viewMode and availability
    const currentViewMode =
      hasStudentAnalysis && hasDetailedAnalysis
        ? viewMode
        : hasStudentAnalysis
          ? 'student'
          : 'expert';

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-amber-50 flex flex-col">
        {/* Student Analysis Form Modal */}
        {showStudentAnalysisForm && (
          <StudentAnalysisForm
            exercise={currentExercise}
            existingAnalysis={studentAnalysis}
            onClose={() => setShowStudentAnalysisForm(false)}
            onSave={handleSaveStudentAnalysis}
          />
        )}

        {/* Header */}
        <div className="backdrop-blur-md bg-white/70 border-b border-white/40 sticky top-0 z-10">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <button
                onClick={handleReset}
                className="flex items-center gap-2 text-primary hover:text-accent transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Exercises</span>
              </button>
              <div className="flex items-center gap-3">
                {/* Student Analysis Controls */}
                <button
                  onClick={() => setShowStudentAnalysisForm(true)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white border-2 border-[#1a3150] text-[#1a3150] hover:bg-[#1a3150] hover:text-white transition-all text-sm"
                >
                  <Edit3 className="w-4 h-4" />
                  <span>{hasStudentAnalysis ? 'Edit' : 'Create'} My Analysis</span>
                </button>

                {hasDetailedAnalysis && (
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gradient-to-r from-green-500 to-green-600 text-white text-xs">
                    <Microscope className="w-3.5 h-3.5" />
                    <span>Expert Available</span>
                  </div>
                )}

                <div className="text-sm text-muted-foreground">
                  Unit {currentExercise.unit} - Section {currentExercise.section}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Exercise Content */}
        <div className="flex-1 flex flex-col items-center justify-center py-8 px-4">
          <div className={`w-full ${showAnalysisPanel ? 'max-w-[1800px]' : 'max-w-5xl'}`}>
            <div className={`${showAnalysisPanel ? 'grid lg:grid-cols-2 gap-6' : ''}`}>
              {/* Left Side: Exercise Interface */}
              <div className="space-y-8">
                {/* Arabic Sentence */}
                <div>
                  <div className="backdrop-blur-md bg-white/80 border border-white/40 rounded-3xl p-8 shadow-xl">
                    <div className="text-center mb-4">
                      <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-md bg-accent/10 border border-accent/20 text-accent text-sm mb-4">
                        <BookOpen className="w-4 h-4" />
                        Exercise {currentExercise.id}
                      </span>
                    </div>

                    <div className="text-center mb-6">
                      <p
                        className="text-4xl leading-loose text-primary mb-4"
                        style={{ fontFamily: 'Amiri, serif' }}
                        dir="rtl"
                      >
                        {hideDiacritics
                          ? removeDiacritics(currentExercise.arabic)
                          : currentExercise.arabic}
                      </p>
                    </div>

                    <div className="flex items-center justify-center gap-4">
                      <button
                        onClick={() => setShowTranslation(!showTranslation)}
                        className="group px-6 py-2 rounded-lg bg-accent/10 text-accent hover:bg-accent/20 transition-all duration-300 text-sm flex items-center gap-2 active:scale-95"
                      >
                        {showTranslation ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                        {showTranslation ? 'Hide Translation' : 'Show Translation'}
                      </button>

                      <button
                        onClick={() => setHideDiacritics(!hideDiacritics)}
                        className="group px-6 py-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-all duration-300 text-sm flex items-center gap-2 active:scale-95"
                        title={hideDiacritics ? 'Show Diacritical Marks' : 'Hide Diacritical Marks'}
                      >
                        {hideDiacritics ? (
                          <>
                            <Eye className="w-4 h-4" />
                            Show Tashkeel
                          </>
                        ) : (
                          <>
                            <EyeOff className="w-4 h-4" />
                            Hide Tashkeel
                          </>
                        )}
                      </button>

                      {isSupported && (
                        <button
                          onClick={() => speak(currentExercise.arabic)}
                          disabled={isSpeaking}
                          className={`group px-6 py-2 rounded-lg bg-green-500/10 text-green-700 hover:bg-green-500/20 transition-all duration-300 text-sm flex items-center gap-2 active:scale-95 ${isSpeaking ? 'opacity-50 cursor-not-allowed' : ''}`}
                          title="Listen to pronunciation"
                        >
                          <Volume2 className={`w-4 h-4 ${isSpeaking ? 'animate-pulse' : ''}`} />
                          {isSpeaking ? 'Playing...' : 'Listen'}
                        </button>
                      )}
                    </div>

                    {showTranslation && (
                      <div className="mt-6 pt-6 border-t border-accent/20">
                        <p className="text-center text-lg text-muted-foreground">
                          {currentExercise.translation}
                        </p>
                        {currentExercise.vocabulary && (
                          <p className="text-center text-sm text-muted-foreground mt-2">
                            <span className="text-accent">Vocabulary:</span>{' '}
                            {currentExercise.vocabulary}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Quick Links to Resources */}
                <ResourceLinks />

                {/* Grammatical Analysis Section */}
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Label Categories */}
                  <div className="backdrop-blur-md bg-white/70 border border-white/40 rounded-3xl p-6 shadow-xl">
                    <h3 className="text-primary mb-4">Grammatical Labels</h3>
                    <GrammaticalLabelSelector
                      selectedLabels={selectedLabels}
                      onToggleLabel={toggleLabel}
                    />
                  </div>

                  {/* Analysis Workspace */}
                  <div className="backdrop-blur-md bg-white/70 border border-white/40 rounded-3xl p-6 shadow-xl">
                    <h3 className="text-primary mb-4">Your Analysis</h3>

                    <div className="space-y-4">
                      {/* Selected Labels */}
                      <div>
                        <label className="block text-sm text-gray-700 mb-2">
                          Selected Labels ({selectedLabels.length})
                        </label>
                        <div className="min-h-[100px] p-4 rounded-lg bg-white/60 border border-accent/20">
                          <SelectedLabelsDisplay selectedLabels={selectedLabels} />
                        </div>
                      </div>

                      {/* Written Analysis */}
                      <div>
                        <label className="block text-sm text-gray-700 mb-2">
                          Written Analysis (Optional)
                        </label>
                        <textarea
                          value={userAnswer}
                          onChange={(e) => setUserAnswer(e.target.value)}
                          placeholder="Write your grammatical analysis here..."
                          rows={8}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent resize-none"
                        />
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-3">
                        <button
                          onClick={handleReset}
                          className="flex-1 px-4 py-2 rounded-lg bg-white/60 text-muted-foreground hover:bg-white transition-colors flex items-center justify-center gap-2"
                        >
                          <RotateCcw className="w-4 h-4" />
                          Reset
                        </button>
                        <button
                          onClick={handleReset}
                          className="flex-1 px-4 py-2 rounded-lg bg-accent text-primary hover:bg-accent/90 transition-colors"
                        >
                          Next Exercise
                        </button>
                      </div>

                      {/* Helper Note */}
                      <div className="mt-4 p-4 rounded-lg bg-accent/5 border border-accent/20">
                        <p className="text-xs text-muted-foreground">
                          <span className="text-accent">Tip:</span> Start by identifying the
                          sentence type (Nominal or Verbal), then identify each word's part of
                          speech, grammatical case, and role in the sentence.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side: Analysis Viewer */}
              {showAnalysisPanel &&
                (hasStudentAnalysis || (hasDetailedAnalysis && detailedAnalysis)) && (
                  <div className="lg:sticky lg:top-24 lg:h-[calc(100vh-8rem)] lg:overflow-y-auto">
                    <div className="backdrop-blur-md bg-white/80 border border-white/40 rounded-3xl p-6 shadow-xl">
                      {/* Toggle between Student and Expert Analysis */}
                      {hasStudentAnalysis && hasDetailedAnalysis && (
                        <div className="mb-4 flex gap-2">
                          <button
                            onClick={() => setViewMode('student')}
                            className={`flex-1 px-3 py-2 rounded-lg text-sm transition-all ${
                              viewMode === 'student'
                                ? 'bg-[#1a3150] text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                          >
                            My Analysis
                          </button>
                          <button
                            onClick={() => setViewMode('expert')}
                            className={`flex-1 px-3 py-2 rounded-lg text-sm transition-all ${
                              viewMode === 'expert'
                                ? 'bg-green-600 text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                          >
                            Expert Analysis
                          </button>
                        </div>
                      )}

                      <div className="mb-4 pb-4 border-b border-accent/20">
                        <h3 className="text-primary flex items-center gap-2">
                          {currentViewMode === 'student' ? (
                            <>
                              <Edit3 className="w-5 h-5 text-[#1a3150]" />
                              My Analysis
                            </>
                          ) : (
                            <>
                              <Microscope className="w-5 h-5 text-green-600" />
                              Expert Analysis
                            </>
                          )}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          Multi-level grammatical analysis
                        </p>
                      </div>

                      {currentViewMode === 'student' && studentAnalysis ? (
                        <TarkeebAnalysisViewer analysis={studentAnalysis} />
                      ) : currentViewMode === 'expert' && detailedAnalysis ? (
                        <TarkeebAnalysisViewer analysis={detailedAnalysis} />
                      ) : null}
                    </div>
                  </div>
                )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Exercise List View
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-amber-50 flex flex-col">
      {/* Header */}
      <div className="backdrop-blur-md bg-white/70 border-b border-white/40 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-primary hover:text-accent transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Home</span>
            </button>
          </div>

          <div className="text-center mb-4">
            <h1 className="text-primary mb-2">Tarkeeb Analysis Tool</h1>
            <p className="text-lg text-muted-foreground">
              Classical Arabic Grammar Analysis
            </p>
          </div>

          {/* Tab Switcher */}
          <div className="flex justify-center gap-2 mb-4">
            <button
              onClick={() => setListTab('tarkeeb')}
              className={`px-5 py-2 rounded-lg text-sm transition-all ${
                listTab === 'tarkeeb'
                  ? 'bg-[#1a3150] text-white shadow-md'
                  : 'bg-white/60 text-gray-700 hover:bg-white/80'
              }`}
            >
              Tarkeeb Exercises
            </button>
            <button
              onClick={() => setListTab('fstu')}
              className={`px-5 py-2 rounded-lg text-sm transition-all ${
                listTab === 'fstu'
                  ? 'bg-[#1a3150] text-white shadow-md'
                  : 'bg-white/60 text-gray-700 hover:bg-white/80'
              }`}
            >
              FSTU Practice
            </button>
          </div>

          {/* Tarkeeb Filters (only shown on tarkeeb tab) */}
          {listTab === 'tarkeeb' && (
          <div className="flex flex-wrap gap-4 justify-center">
            <div>
              <label className="text-sm text-gray-700 mr-2">Unit:</label>
              <select
                value={selectedUnit}
                onChange={(e) => setSelectedUnit(e.target.value)}
                className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-accent focus:border-transparent"
              >
                <option value="2">Unit 2 - Basic Sentences</option>
                <option value="3">Unit 3 - Adjectives</option>
                <option value="4">Unit 4 - Idafa</option>
                <option value="6">Unit 6 - Conditionals</option>
                <option value="7">Unit 7 - Emphasis</option>
                <option value="11">Unit 11 - Inna and Sisters</option>
                <option value="12">Unit 12 - Verbal Sentences</option>
                <option value="13">Unit 13 - Complex Sentences</option>
                <option value="25">Unit 25 - Hal</option>
                <option value="26">Unit 26 - Tamyiz</option>
                <option value="27">Unit 27 - Vocative</option>
              </select>
            </div>

            <div>
              <label className="text-sm text-gray-700 mr-2">Difficulty:</label>
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-accent focus:border-transparent"
              >
                <option value="all">All Levels</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>

            <div>
              <label className="text-sm text-gray-700 mr-2">Search:</label>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Arabic text..."
                dir="rtl"
                className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-accent focus:border-transparent"
              />
            </div>
          </div>
          )}
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 flex flex-col items-center justify-center py-8 px-4">
        <div className="w-full max-w-7xl">
          {listTab === 'tarkeeb' ? (
            <>
              <div className="mb-6 text-center">
                <p className="text-sm text-muted-foreground">
                  Showing {displayedExercises.length} of {filteredExercises.length} exercise
                  {filteredExercises.length !== 1 ? 's' : ''}
                  {filteredExercises.length > MAX_RESULTS && (
                    <span className="text-accent"> - refine your search to see more</span>
                  )}
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayedExercises.map((exercise) => {
                  const hasDetailedAnalysis = tarkeebAnalysisExamples.some(
                    (a) => a.exerciseId === exercise.id
                  );
                  const hasStudentAnalysisForExercise = !!studentAnalyses[exercise.id];

                  return (
                    <button
                      key={exercise.id}
                      onClick={() => handleStartExercise(exercise)}
                      className={`backdrop-blur-md bg-white/70 border-2 rounded-3xl p-6 shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all text-left group ${
                        hasDetailedAnalysis
                          ? 'border-[#c5a253]/50'
                          : hasStudentAnalysisForExercise
                            ? 'border-[#1a3150]/30'
                            : 'border-white/40'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-sm text-accent">
                          Unit {exercise.unit}.{exercise.section}
                        </span>
                        <div className="flex items-center gap-2">
                          {hasStudentAnalysisForExercise && (
                            <span className="flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-[#1a3150] text-white">
                              <Edit3 className="w-3 h-3" />
                              My
                            </span>
                          )}
                          {hasDetailedAnalysis && (
                            <span className="flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-gradient-to-r from-green-500 to-green-600 text-white">
                              <Microscope className="w-3 h-3" />
                              Expert
                            </span>
                          )}
                          <span
                            className={`text-xs px-2 py-1 rounded-full ${
                              exercise.difficulty === 'beginner'
                                ? 'bg-green-100 text-green-700'
                                : exercise.difficulty === 'intermediate'
                                  ? 'bg-yellow-100 text-yellow-700'
                                  : 'bg-red-100 text-red-700'
                            }`}
                          >
                            {exercise.difficulty}
                          </span>
                        </div>
                      </div>

                      <div className="mb-4">
                        <p
                          className="text-2xl leading-relaxed text-primary mb-2"
                          style={{ fontFamily: 'Amiri, serif' }}
                          dir="rtl"
                        >
                          {exercise.arabic}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-accent/20">
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {exercise.translation}
                        </p>
                      </div>

                      <div className="mt-4 flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">Exercise {exercise.id}</span>
                        <span className="text-accent text-sm group-hover:translate-x-1 transition-transform">
                          Start
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </>
          ) : (
            <FstuPractice />
          )}
        </div>
      </div>
    </div>
  );
}
