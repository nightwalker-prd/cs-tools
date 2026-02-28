/**
 * Sarf (صرف) Analysis Tool
 * Classical Arabic Morphology Analysis with Interactive Exercises
 */

import { useState, useEffect } from 'react';
import { ArrowLeft, BookOpen, Eye, EyeOff, ExternalLink, ChevronDown, Filter, Layers, ChevronLeft, ChevronRight, Edit3, Microscope } from 'lucide-react';
import { removeDiacritics } from '@arabtools/core';
import { sarfExercises as defaultSarfExercises, type SarfExercise } from '../data/sarfExercises';
import { sarfAnalysisExamples } from '../data/sarfAnalysis';
import { SarfAnalysisViewer } from './SarfAnalysisViewer';
import { StudentSarfAnalysisForm, type StudentSarfAnalysis } from './StudentSarfAnalysisForm';
import { SarfFlashcardMode } from './SarfFlashcardMode';

const STUDENT_SARF_ANALYSIS_STORAGE_KEY = 'arabtools-student-sarf-analysis';
const ITEMS_PER_PAGE = 12;

type SarfMode = 'exercise' | 'flashcard';

interface SarfToolProps {
  onBack?: () => void;
}

export function SarfTool({ onBack }: SarfToolProps) {
  const [mode, setMode] = useState<SarfMode>('exercise');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedForm, setSelectedForm] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [selectedVerbType, setSelectedVerbType] = useState<string>('all');
  const [currentExercise, setCurrentExercise] = useState<SarfExercise | null>(null);
  const [showTranslation, setShowTranslation] = useState(false);
  const [hideDiacritics, setHideDiacritics] = useState(false);
  const sarfExercises = defaultSarfExercises;

  // Student analyses state
  const [studentAnalyses, setStudentAnalyses] = useState<{ [key: number]: StudentSarfAnalysis }>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STUDENT_SARF_ANALYSIS_STORAGE_KEY);
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error('Failed to parse saved student sarf analyses:', e);
        }
      }
    }
    return {};
  });

  const [showStudentAnalysisForm, setShowStudentAnalysisForm] = useState(false);
  const [viewMode, setViewMode] = useState<'student' | 'expert'>('student');
  const [showResourceLinks, setShowResourceLinks] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // Save student analyses to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STUDENT_SARF_ANALYSIS_STORAGE_KEY, JSON.stringify(studentAnalyses));
    }
  }, [studentAnalyses]);

  const handleSaveStudentAnalysis = (analysis: StudentSarfAnalysis) => {
    setStudentAnalyses(prev => ({
      ...prev,
      [analysis.exerciseId]: analysis
    }));
    setShowStudentAnalysisForm(false);
    setViewMode('student'); // Show the student's analysis after saving
  };

  // removeDiacritics imported from @arabtools/core

  // Map rootType values to filter groups
  const matchesVerbType = (rootType: string | undefined, filter: string): boolean => {
    if (filter === 'all') return true;
    if (!rootType) return false;
    switch (filter) {
      case 'saleem': return rootType === 'saleem';
      case 'mahmooz': return rootType === 'mahmooz';
      case 'mithaal': return rootType === 'mithaal' || rootType === 'mithaal-naqis';
      case 'ajwaf': return rootType.startsWith('ajwaf');
      case 'naqis': return rootType.startsWith('naqis');
      case 'mudhaaf': return rootType === "mudha'af" || rootType === 'mudhaaf';
      case 'lafeef': return rootType === 'lafeef' || rootType.startsWith('lafif');
      default: return false;
    }
  };

  // Filter exercises
  const filteredExercises = sarfExercises.filter(ex => {
    if (selectedCategory !== 'all' && ex.category !== selectedCategory) return false;
    if (selectedForm !== 'all' && ex.verbForm !== selectedForm) return false;
    if (selectedDifficulty !== 'all' && ex.difficulty !== selectedDifficulty) return false;
    if (selectedVerbType !== 'all' && !matchesVerbType(ex.rootType, selectedVerbType)) return false;
    return true;
  });

  // Pagination
  const totalPages = Math.ceil(filteredExercises.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedExercises = filteredExercises.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, selectedForm, selectedDifficulty, selectedVerbType]);

  const handleStartExercise = (exercise: SarfExercise) => {
    setCurrentExercise(exercise);
    setShowTranslation(false);
    setHideDiacritics(false);
  };

  const handleReset = () => {
    setCurrentExercise(null);
    setShowTranslation(false);
    setHideDiacritics(false);
  };

  // Get stats
  const totalExercises = sarfExercises.length;
  const categories = Array.from(new Set(sarfExercises.map(ex => ex.category)));
  const verbForms = Array.from(new Set(sarfExercises.filter(ex => ex.verbForm).map(ex => ex.verbForm!))).sort();

  // Determine if analysis panel should show
  const expertAnalysis = currentExercise
    ? sarfAnalysisExamples.find(a => a.exerciseId === currentExercise.id)
    : null;

  const hasDetailedAnalysis = !!expertAnalysis;
  const hasStudentAnalysis = currentExercise ? !!studentAnalyses[currentExercise.id] : false;
  const showAnalysisPanel = hasDetailedAnalysis || hasStudentAnalysis;

  const currentViewMode = viewMode === 'student' && hasStudentAnalysis ? 'student' : 'expert';
  const studentAnalysis = currentExercise && hasStudentAnalysis ? studentAnalyses[currentExercise.id] : null;

  // If in flashcard mode, render flashcard component
  if (mode === 'flashcard') {
    return <SarfFlashcardMode exercises={sarfExercises} onBack={() => setMode('exercise')} />;
  }

  if (!currentExercise) {
    // Exercise Selection View
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#f8f6f3] via-white to-[#faf8f5] p-4 md:p-8 flex flex-col items-center justify-center">
        <div className="max-w-7xl w-full">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              {onBack && (
                <button
                  onClick={onBack}
                  className="group flex items-center gap-2 text-primary hover:text-accent transition-colors"
                >
                  <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
                  Back to Tools
                </button>
              )}

              <div className="flex items-center gap-4">
                {/* Mode Toggle */}
                <button
                  onClick={() => setMode('flashcard')}
                  className="group flex items-center gap-2 text-primary hover:text-accent transition-colors"
                >
                  <Layers className="w-5 h-5" />
                  Flashcard Mode
                </button>
              </div>
            </div>

            <div className="backdrop-blur-md bg-white/80 border border-white/40 rounded-3xl p-8 shadow-xl">
              <h1 className="text-primary text-3xl mb-2">Sarf Analysis Tool</h1>
              <p className="text-xl mb-4 font-arabic" dir="rtl">
                أداة تحليل الصرف
              </p>
              <p className="text-muted-foreground max-w-3xl">
                Master classical Arabic morphology through interactive word analysis. Study root letters, patterns (أوزان),
                verb forms (I-X), and morphological transformations with expert guidance.
              </p>

              <div className="mt-6 flex flex-wrap gap-4">
                <div className="px-4 py-2 rounded-full bg-accent/10 border border-accent/20">
                  <span className="text-sm text-accent">{totalExercises} exercises</span>
                </div>
                <div className="px-4 py-2 rounded-full bg-accent/10 border border-accent/20">
                  <span className="text-sm text-accent">{categories.length} categories</span>
                </div>
                <div className="px-4 py-2 rounded-full bg-accent/10 border border-accent/20">
                  <span className="text-sm text-accent">{verbForms.length} verb forms</span>
                </div>
              </div>
            </div>
          </div>

          {/* Flashcard Mode Info */}
          <div className="backdrop-blur-md bg-gradient-to-r from-[#1a3150]/5 to-[#c5a253]/5 border border-accent/20 rounded-3xl p-6 shadow-lg mb-8">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                <Layers className="w-6 h-6 text-accent" />
              </div>
              <div className="flex-1">
                <h3 className="text-primary mb-2 flex items-center gap-2">
                  Try Flashcard Mode with Spaced Repetition
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Use the scientifically-proven spaced repetition method to memorize Sarf patterns more effectively.
                  The system automatically schedules reviews based on how well you know each word, optimizing your learning for long-term retention.
                </p>
                <button
                  onClick={() => setMode('flashcard')}
                  className="text-sm text-accent hover:text-primary transition-colors flex items-center gap-1"
                >
                  Launch Flashcard Mode
                  <ChevronDown className="w-4 h-4 -rotate-90" />
                </button>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="backdrop-blur-md bg-white/80 border border-white/40 rounded-3xl p-6 shadow-xl mb-8">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="w-full flex items-center justify-between group cursor-pointer -m-2 p-2 rounded-xl hover:bg-accent/5 transition-all duration-300 active:scale-[0.99]"
            >
              <h3 className="text-primary flex items-center gap-2 transition-colors duration-300 group-hover:text-accent">
                <Filter className="w-5 h-5 text-accent transition-transform duration-300 group-hover:scale-110" />
                Filter Exercises
              </h3>
              <ChevronDown
                className="w-5 h-5 text-accent transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:text-primary"
                style={{
                  transform: showFilters ? 'rotate(180deg)' : 'rotate(0deg)'
                }}
              />
            </button>

            {showFilters && (
              <div className="mt-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm text-muted-foreground mb-2">Category</label>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all"
                    >
                      <option value="all">All Categories</option>
                      <option value="verb">Verbs (فعل)</option>
                      <option value="noun">Nouns (اسم)</option>
                      <option value="active-participle">Active Participles (اسم الفاعل)</option>
                      <option value="passive-participle">Passive Participles (اسم المفعول)</option>
                      <option value="masdar">Verbal Nouns (مصدر)</option>
                      <option value="adjective">Adjectives (صفة)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm text-muted-foreground mb-2">Verb Form</label>
                    <select
                      value={selectedForm}
                      onChange={(e) => setSelectedForm(e.target.value)}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all"
                    >
                      <option value="all">All Forms</option>
                      <option value="I">Form I - فَعَلَ</option>
                      <option value="II">Form II - فَعَّلَ</option>
                      <option value="III">Form III - فَاعَلَ</option>
                      <option value="IV">Form IV - أَفْعَلَ</option>
                      <option value="V">Form V - تَفَعَّلَ</option>
                      <option value="VI">Form VI - تَفَاعَلَ</option>
                      <option value="VII">Form VII - اِنْفَعَلَ</option>
                      <option value="VIII">Form VIII - اِفْتَعَلَ</option>
                      <option value="IX">Form IX - اِفْعَلَّ</option>
                      <option value="X">Form X - اِسْتَفْعَلَ</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm text-muted-foreground mb-2">Verb Type</label>
                    <select
                      value={selectedVerbType}
                      onChange={(e) => setSelectedVerbType(e.target.value)}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all"
                    >
                      <option value="all">All Types</option>
                      <option value="saleem">Saleem - صحيح</option>
                      <option value="mithaal">Mithaal - مثال</option>
                      <option value="ajwaf">Ajwaf - أجوف</option>
                      <option value="naqis">Naqis - ناقص</option>
                      <option value="mudhaaf">Mudha'af - مضاعف</option>
                      <option value="mahmooz">Mahmooz - مهموز</option>
                      <option value="lafeef">Lafeef - لفيف</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm text-muted-foreground mb-2">Difficulty</label>
                    <select
                      value={selectedDifficulty}
                      onChange={(e) => setSelectedDifficulty(e.target.value)}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all"
                    >
                      <option value="all">All Levels</option>
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="advanced">Advanced</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Pagination Info */}
          {filteredExercises.length > 0 && (
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-muted-foreground">
                Showing {startIndex + 1}-{Math.min(startIndex + ITEMS_PER_PAGE, filteredExercises.length)} of {filteredExercises.length} exercises
              </p>
              <p className="text-sm text-muted-foreground">
                Page {currentPage} of {totalPages}
              </p>
            </div>
          )}

          {/* Exercises Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedExercises.map((exercise) => {
              const hasExpertAnalysis = sarfAnalysisExamples.some(a => a.exerciseId === exercise.id);
              const hasMyAnalysis = !!studentAnalyses[exercise.id];

              return (
                <div
                  key={exercise.id}
                  className="backdrop-blur-md bg-white/80 border border-white/40 rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer group"
                  onClick={() => handleStartExercise(exercise)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <span className="px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs">
                      Exercise {exercise.id}
                    </span>
                    <div className="flex gap-1">
                      {hasExpertAnalysis && (
                        <div className="w-2 h-2 rounded-full bg-green-500" title="Expert analysis available" />
                      )}
                      {hasMyAnalysis && (
                        <div className="w-2 h-2 rounded-full bg-[#1a3150]" title="My analysis saved" />
                      )}
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-3xl text-primary leading-loose text-center mb-2 font-arabic" dir="rtl">
                      {exercise.word}
                    </p>
                    <p className="text-sm text-center text-muted-foreground italic">
                      {exercise.transliteration}
                    </p>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Category:</span>
                      <span className="text-primary capitalize">{exercise.category.replace('-', ' ')}</span>
                    </div>
                    {exercise.verbForm && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Form:</span>
                        <span className="text-primary">Form {exercise.verbForm}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Root:</span>
                      <span className="text-primary font-arabic" dir="rtl">{exercise.root}</span>
                    </div>
                    {exercise.rootType && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Type:</span>
                        <span className="text-primary capitalize">{exercise.rootType.replace(/-/g, ' ').replace("'", '\u02BC')}</span>
                      </div>
                    )}
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      exercise.difficulty === 'beginner' ? 'bg-green-100 text-green-700' :
                      exercise.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {exercise.difficulty}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="mt-8 flex items-center justify-center gap-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="flex items-center gap-1 px-4 py-2 rounded-lg bg-white border border-gray-200 text-primary hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </button>

              <div className="flex items-center gap-1">
                {/* First page */}
                {currentPage > 3 && (
                  <>
                    <button
                      onClick={() => setCurrentPage(1)}
                      className="w-10 h-10 rounded-lg bg-white border border-gray-200 text-primary hover:bg-gray-50 transition-all"
                    >
                      1
                    </button>
                    {currentPage > 4 && <span className="px-2 text-muted-foreground">...</span>}
                  </>
                )}

                {/* Page numbers around current */}
                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter(page => page >= currentPage - 2 && page <= currentPage + 2)
                  .map(page => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-10 h-10 rounded-lg transition-all ${
                        page === currentPage
                          ? 'bg-accent text-white shadow-md'
                          : 'bg-white border border-gray-200 text-primary hover:bg-gray-50'
                      }`}
                    >
                      {page}
                    </button>
                  ))}

                {/* Last page */}
                {currentPage < totalPages - 2 && (
                  <>
                    {currentPage < totalPages - 3 && <span className="px-2 text-muted-foreground">...</span>}
                    <button
                      onClick={() => setCurrentPage(totalPages)}
                      className="w-10 h-10 rounded-lg bg-white border border-gray-200 text-primary hover:bg-gray-50 transition-all"
                    >
                      {totalPages}
                    </button>
                  </>
                )}
              </div>

              <button
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="flex items-center gap-1 px-4 py-2 rounded-lg bg-white border border-gray-200 text-primary hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {filteredExercises.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No exercises match your filters.</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Exercise View
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8f6f3] via-white to-[#faf8f5] p-4 md:p-8 flex flex-col items-center justify-center">
      <div className="max-w-7xl w-full">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <button
              onClick={handleReset}
              className="flex items-center gap-2 px-3 py-2 -ml-3 rounded-lg text-primary hover:bg-purple-100 hover:text-purple-700 active:bg-purple-200 transition-all"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Exercises
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className={`grid gap-8 ${showAnalysisPanel ? 'lg:grid-cols-2' : 'lg:grid-cols-1'}`}>
          <div>
            {/* Left Side: Exercise Interface */}
            <div className="space-y-8">
              {/* Arabic Word */}
              <div>
                <div className="backdrop-blur-md bg-white/80 border border-white/40 rounded-3xl p-8 shadow-xl">
                  <div className="text-center mb-4">
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-md bg-accent/10 border border-accent/20 text-accent text-sm mb-4">
                      <BookOpen className="w-4 h-4" />
                      Exercise {currentExercise.id}
                    </span>
                  </div>

                  <div className="text-center mb-6">
                    <p className="text-5xl leading-loose text-primary font-arabic" dir="rtl">
                      {hideDiacritics ? removeDiacritics(currentExercise.word) : currentExercise.word}
                    </p>
                    <p className="text-lg text-muted-foreground italic mt-2">{currentExercise.transliteration}</p>
                  </div>

                  <div className="flex items-center justify-center gap-4 flex-wrap">
                    <button
                      onClick={() => setShowTranslation(!showTranslation)}
                      className="group px-6 py-2 rounded-lg bg-accent/10 text-accent hover:bg-accent/20 transition-all duration-300 text-sm flex items-center gap-2 active:scale-95"
                    >
                      {showTranslation ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      {showTranslation ? 'Hide Info' : 'Show Info'}
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
                  </div>

                  {showTranslation && (
                    <div className="mt-6 pt-6 border-t border-accent/20 space-y-4">
                      <div>
                        <p className="text-sm text-accent mb-1">Meaning:</p>
                        <p className="text-lg text-primary">{currentExercise.meaning}</p>
                      </div>

                      <div>
                        <p className="text-sm text-accent mb-1">Usage:</p>
                        <p className="text-muted-foreground">{currentExercise.usage}</p>
                      </div>

                      {currentExercise.prepositions && currentExercise.prepositions.length > 0 && (
                        <div>
                          <p className="text-sm text-accent mb-1">Common Prepositions:</p>
                          <ul className="space-y-1">
                            {currentExercise.prepositions.map((prep, idx) => (
                              <li key={idx} className="text-muted-foreground text-sm">- {prep}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      <div>
                        <p className="text-sm text-accent mb-1">Example:</p>
                        <p className="text-xl mb-1 font-arabic" dir="rtl">
                          {currentExercise.exampleSentence}
                        </p>
                        <p className="text-sm text-muted-foreground italic">{currentExercise.exampleTranslation}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Word Details */}
              <div className="backdrop-blur-md bg-white/70 border border-white/40 rounded-3xl p-6 shadow-xl">
                <h3 className="text-primary mb-4 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-accent" />
                  Word Details
                </h3>

                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-accent mb-1">Root Letters (جذر)</p>
                    <p className="text-3xl font-arabic" dir="rtl">{currentExercise.root}</p>
                  </div>

                  <div>
                    <p className="text-sm text-accent mb-1">Pattern (وزن)</p>
                    <p className="text-3xl font-arabic" dir="rtl">{currentExercise.pattern}</p>
                    {currentExercise.patternTranslit && (
                      <p className="text-sm text-muted-foreground mt-1">({currentExercise.patternTranslit})</p>
                    )}
                  </div>

                  <div>
                    <p className="text-sm text-accent mb-1">Category</p>
                    <p className="text-primary capitalize">{currentExercise.category.replace('-', ' ')}</p>
                  </div>

                  {currentExercise.verbForm && (
                    <div>
                      <p className="text-sm text-accent mb-1">Verb Form</p>
                      <p className="text-primary">Form {currentExercise.verbForm}</p>
                    </div>
                  )}

                  {currentExercise.notes && (
                    <div className="mt-4 pt-4 border-t border-accent/20">
                      <p className="text-sm text-accent mb-1">Notes</p>
                      <p className="text-sm text-muted-foreground">{currentExercise.notes}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Analysis Actions */}
              <div className="backdrop-blur-md bg-white/70 border border-white/40 rounded-3xl p-6 shadow-xl">
                <h3 className="text-primary mb-4 flex items-center gap-2">
                  <Edit3 className="w-5 h-5 text-accent" />
                  Your Analysis
                </h3>

                <p className="text-sm text-muted-foreground mb-4">
                  Create your own morphological analysis of this word to practice your Sarf skills.
                </p>

                <button
                  onClick={() => setShowStudentAnalysisForm(true)}
                  className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-[#1a3150] to-[#2a4a70] text-white hover:shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <Edit3 className="w-5 h-5" />
                  {hasStudentAnalysis ? 'Edit My Analysis' : 'Create My Analysis'}
                </button>
              </div>

              {/* Quick Links to Resources */}
              <div className="backdrop-blur-md bg-white/70 border border-white/40 rounded-3xl p-6 shadow-xl">
                <button
                  onClick={() => setShowResourceLinks(!showResourceLinks)}
                  className="w-full flex items-center justify-between group cursor-pointer -m-2 p-2 rounded-xl hover:bg-accent/5 transition-all duration-300 active:scale-[0.99]"
                >
                  <h3 className="text-primary flex items-center gap-2 transition-colors duration-300 group-hover:text-accent">
                    <BookOpen className="w-5 h-5 text-accent transition-transform duration-300 group-hover:scale-110" />
                    Quick Links to Resources
                  </h3>
                  <ChevronDown
                    className="w-5 h-5 text-accent transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:text-primary"
                    style={{
                      transform: showResourceLinks ? 'rotate(180deg)' : 'rotate(0deg)'
                    }}
                  />
                </button>

                {showResourceLinks && (
                  <div className="mt-4 space-y-3">
                    <a
                      href="https://www.alqalaminstitute.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white hover:bg-accent/5 border border-accent/20 text-primary hover:text-accent transition-colors text-sm group"
                    >
                      <ExternalLink className="w-4 h-4 transition-transform group-hover:scale-110" />
                      Al Qalam Institute
                    </a>
                    <a
                      href="https://www.youtube.com/@AlQalamInstitute"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white hover:bg-accent/5 border border-accent/20 text-primary hover:text-accent transition-colors text-sm group"
                    >
                      <ExternalLink className="w-4 h-4 transition-transform group-hover:scale-110" />
                      YouTube Channel
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Side: Analysis Viewer */}
          {showAnalysisPanel && (
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
                  <p className="text-sm text-muted-foreground mt-1">تحليل صرفي</p>
                </div>

                {currentViewMode === 'student' && studentAnalysis ? (
                  <SarfAnalysisViewer analysis={studentAnalysis} />
                ) : currentViewMode === 'expert' && expertAnalysis ? (
                  <SarfAnalysisViewer analysis={expertAnalysis} />
                ) : (
                  <p className="text-muted-foreground text-center py-8">No analysis available</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Student Analysis Form Modal */}
      {showStudentAnalysisForm && currentExercise && (
        <StudentSarfAnalysisForm
          exerciseId={currentExercise.id}
          word={currentExercise.word}
          onSave={handleSaveStudentAnalysis}
          onCancel={() => setShowStudentAnalysisForm(false)}
          initialData={studentAnalyses[currentExercise.id]}
        />
      )}
    </div>
  );
}
