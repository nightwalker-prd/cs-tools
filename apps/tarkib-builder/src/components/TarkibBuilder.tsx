import { useState, useMemo } from 'react';
import { BookOpen, Trophy, ChevronRight, CheckCircle2, Star } from 'lucide-react';
import type { PhraseType, AppPhase } from '../data/types';
import { PHRASE_TYPE_LABELS } from '../data/types';
import { getExercises } from '../data/exercises';
import { useProgress } from '../hooks/useProgress';
import { ExerciseView } from './exercise/ExerciseView';

type DifficultyFilter = 'all' | 'beginner' | 'intermediate' | 'advanced';

function MasteryStars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4].map(i => (
        <Star
          key={i}
          className={`w-3.5 h-3.5 ${i <= count ? 'text-accent fill-accent' : 'text-gray-300'}`}
        />
      ))}
    </div>
  );
}

export function TarkibBuilder() {
  const [phase, setPhase] = useState<AppPhase>('browse');
  const [selectedType, setSelectedType] = useState<PhraseType | null>(null);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [difficultyFilter, setDifficultyFilter] = useState<DifficultyFilter>('all');
  const { progress, recordResult, isCompleted, getScore, getMastery, isUnlocked } = useProgress();

  const exercises = useMemo(() => {
    if (!selectedType) return [];
    return getExercises(selectedType, difficultyFilter === 'all' ? undefined : difficultyFilter);
  }, [selectedType, difficultyFilter]);

  const currentExercise = exercises[currentExerciseIndex] ?? null;

  const handleSelectType = (type: PhraseType) => {
    setSelectedType(type);
    setCurrentExerciseIndex(0);
    setPhase('exercise');
  };

  const handleComplete = (exerciseId: string, score: number) => {
    recordResult({
      exerciseId,
      slotResults: [],
      allCorrect: true,
      score,
      attempts: 1,
      timeSpent: 0,
      hintsUsed: false,
    });
  };

  const handleNext = () => {
    if (currentExerciseIndex + 1 < exercises.length) {
      setCurrentExerciseIndex(prev => prev + 1);
    } else {
      setPhase('results');
    }
  };

  const handleSkip = () => {
    handleNext();
  };

  const handleBackToBrowse = () => {
    setPhase('browse');
    setSelectedType(null);
    setCurrentExerciseIndex(0);
  };

  // All phrase types with their exercise counts and status
  const phraseTypeCards = useMemo(() => {
    const allTypes: PhraseType[] = [
      'possessive', 'descriptive', 'prepositional',
      'demonstrative', 'conjunctive', 'appositive',
      'number', 'nominal-sentence', 'verbal-sentence',
      'kana-sentence', 'inna-sentence', 'nested',
      'hal', 'tamyiz', 'maful-bihi', 'naib-fail',
      'maful-mutlaq', 'maful-li-ajlihi', 'zarf',
      'istithna', 'nida', 'shart', 'mawsul',
    ];

    return allTypes.map(type => {
      const typeExercises = getExercises(type);
      const unlocked = isUnlocked(type);
      const hasExercises = typeExercises.length > 0;
      const isAvailable = unlocked && hasExercises;
      const completedCount = typeExercises.filter(e => isCompleted(e.id)).length;
      const totalScore = typeExercises.reduce((sum, e) => sum + getScore(e.id), 0);
      const mastery = getMastery(type);

      return {
        type,
        label: PHRASE_TYPE_LABELS[type],
        exerciseCount: typeExercises.length,
        completedCount,
        totalScore,
        isAvailable,
        hasExercises,
        unlocked,
        mastery,
      };
    });
  }, [isCompleted, getScore, getMastery, isUnlocked]);

  // Results phase
  if (phase === 'results' && selectedType) {
    const typeExercises = getExercises(selectedType);
    const completedCount = typeExercises.filter(e => isCompleted(e.id)).length;
    const totalScore = typeExercises.reduce((sum, e) => sum + getScore(e.id), 0);
    const label = PHRASE_TYPE_LABELS[selectedType];

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-amber-50 p-4 md:p-8">
        <div className="max-w-lg mx-auto space-y-6 animate-fade-in-up">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent/20 flex items-center justify-center">
              <Trophy className="w-8 h-8 text-accent" />
            </div>
            <h2 className="text-2xl font-serif text-primary mb-1">Session Complete!</h2>
            <p className="text-muted-foreground">
              {label.en} — <span className="font-arabic" dir="rtl">{label.ar}</span>
            </p>
          </div>

          <div className="backdrop-blur-md bg-white/70 border border-white/40 rounded-3xl p-6 shadow-xl">
            <div className="flex items-center justify-center gap-6 mb-6">
              <div className="stats-pill px-5 py-3 text-center">
                <div className="text-2xl font-bold text-primary">{completedCount}/{typeExercises.length}</div>
                <div className="text-xs text-muted-foreground">Completed</div>
              </div>
              <div className="stats-pill px-5 py-3 text-center">
                <div className="text-2xl font-bold text-accent">{totalScore}</div>
                <div className="text-xs text-muted-foreground">Total Score</div>
              </div>
            </div>

            {/* Per-exercise scores */}
            <div className="space-y-2">
              {typeExercises.map(ex => {
                const score = getScore(ex.id);
                const completed = isCompleted(ex.id);
                return (
                  <div key={ex.id} className="flex items-center justify-between py-2 px-3 rounded-xl bg-white/50">
                    <div className="flex items-center gap-2">
                      {completed ? (
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                      ) : (
                        <div className="w-4 h-4 rounded-full border-2 border-gray-300" />
                      )}
                      <span className="text-sm text-primary font-arabic" dir="rtl">{ex.targetPhrase}</span>
                    </div>
                    <span className="text-sm font-medium text-muted-foreground">{score > 0 ? score : '—'}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => {
                setCurrentExerciseIndex(0);
                setPhase('exercise');
              }}
              className="flex-1 px-6 py-3 bg-white border-2 border-primary text-primary rounded-xl font-medium hover:bg-primary/5 transition-colors"
            >
              Practice Again
            </button>
            <button
              onClick={handleBackToBrowse}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-accent to-[#d4b366] text-white rounded-xl font-medium hover:opacity-90 transition-all"
            >
              Back to Browse
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Exercise phase
  if (phase === 'exercise' && currentExercise) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-amber-50 p-4 md:p-8">
        <div className="max-w-2xl mx-auto">
          <ExerciseView
            key={currentExercise.id}
            exercise={currentExercise}
            exerciseIndex={currentExerciseIndex}
            totalExercises={exercises.length}
            onComplete={handleComplete}
            onNext={handleNext}
            onSkip={handleSkip}
            onBack={handleBackToBrowse}
          />
        </div>
      </div>
    );
  }

  // Browse phase (default)
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-amber-50 p-4 md:p-8">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center pt-4 pb-2">
          <h1 className="text-3xl font-serif text-primary mb-1">Tarkib Builder</h1>
          <p className="text-xl font-arabic text-primary/80" dir="rtl">بنّاء التراكيب</p>
          <p className="text-sm text-muted-foreground mt-2">
            Build Arabic phrases and sentences from word components
          </p>
        </div>

        {/* Overall progress */}
        {progress.totalScore > 0 && (
          <div className="stats-pill p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Trophy className="w-5 h-5 text-accent" />
              <span className="text-sm text-primary">Total Score</span>
            </div>
            <span className="text-lg font-bold text-accent">{progress.totalScore}</span>
          </div>
        )}

        {/* Difficulty filter */}
        <div className="flex items-center justify-center gap-2">
          {(['all', 'beginner', 'intermediate', 'advanced'] as const).map(d => (
            <button
              key={d}
              onClick={() => setDifficultyFilter(d)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                difficultyFilter === d
                  ? 'bg-primary text-white'
                  : 'bg-white/70 text-muted-foreground hover:bg-white'
              }`}
            >
              {d === 'all' ? 'All' : d.charAt(0).toUpperCase() + d.slice(1)}
            </button>
          ))}
        </div>

        {/* Phrase type cards */}
        <div className="space-y-3">
          <h2 className="text-sm font-medium text-muted-foreground px-1 flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            Phrase Types
          </h2>

          {phraseTypeCards.map(card => {
            const filteredCount = difficultyFilter === 'all'
              ? card.exerciseCount
              : getExercises(card.type, difficultyFilter).length;

            return (
              <button
                key={card.type}
                onClick={() => card.isAvailable && filteredCount > 0 && handleSelectType(card.type)}
                disabled={!card.isAvailable || filteredCount === 0}
                className={`
                  w-full text-left backdrop-blur-md border border-white/40 rounded-2xl p-4 shadow-md transition-all
                  ${card.isAvailable && filteredCount > 0
                    ? 'bg-white/70 hover:shadow-lg hover:scale-[1.01] cursor-pointer active:scale-[0.99]'
                    : 'bg-gray-100/50 opacity-60 cursor-not-allowed'
                  }
                `}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-serif text-primary">{card.label.en}</span>
                      <span className="font-arabic text-primary/70 text-sm" dir="rtl">{card.label.ar}</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span>{filteredCount} exercises</span>
                      {card.completedCount > 0 && (
                        <>
                          <span>·</span>
                          <span className="text-green-600">{card.completedCount} completed</span>
                        </>
                      )}
                      {card.totalScore > 0 && (
                        <>
                          <span>·</span>
                          <span className="text-accent">{card.totalScore} pts</span>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {card.mastery > 0 && <MasteryStars count={card.mastery} />}
                    {card.isAvailable && filteredCount > 0 && (
                      <ChevronRight className="w-5 h-5 text-muted-foreground" />
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
