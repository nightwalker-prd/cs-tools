import { Settings, BookOpen, BookX } from 'lucide-react';
import { isPrimarilyArabic } from '@arabtools/core';
import { Volume2 } from 'lucide-react';
import type { Exercise, ExerciseMode, ExerciseSection, ExerciseUnit, ExerciseTag } from '../types';
import { TAG_LABELS } from '../types';
import { PracticeMode } from './modes/PracticeMode';
import { QuizMode } from './modes/QuizMode';
import { FlashcardMode } from './modes/FlashcardMode';
import type { useProgress } from '../hooks/useProgress';
import type { useAudio } from '../hooks/useAudio';

interface ExerciseViewProps {
  exercise: Exercise;
  unit: ExerciseUnit;
  section: ExerciseSection;
  mode: ExerciseMode;
  onModeChange: (mode: ExerciseMode) => void;
  progress: ReturnType<typeof useProgress>;
  audio: ReturnType<typeof useAudio>;
  onOpenSettings: () => void;
  onNextExercise: (() => void) | null;
  onGoHome: () => void;
  onFilterByTag: (tag: ExerciseTag) => void;
  showPdf?: boolean;
  onTogglePdf?: () => void;
}

const MODES: { key: ExerciseMode; label: string }[] = [
  { key: 'practice', label: 'Practice' },
  { key: 'quiz', label: 'Quiz' },
  { key: 'flashcard', label: 'Flashcard' },
];

export function ExerciseView({
  exercise,
  unit,
  section,
  mode,
  onModeChange,
  progress,
  audio,
  onOpenSettings,
  onNextExercise,
  onGoHome,
  onFilterByTag,
  showPdf,
  onTogglePdf,
}: ExerciseViewProps) {
  const descIsArabic = isPrimarilyArabic(exercise.description);

  return (
    <div className="animate-fade-in-up" style={{ maxWidth: '800px' }}>
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <button className="breadcrumb-link" onClick={onGoHome}>Home</button>
        <span className="breadcrumb-sep">/</span>
        <span className="breadcrumb-current">Unit {unit.unit} · {section.title}</span>
      </div>

      {/* Header */}
      <div className="mb-8 pb-8 border-b border-border">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="exercise-title">{exercise.title}</h1>
            <div className="flex items-center gap-2">
              <p className={`exercise-description ${descIsArabic ? 'font-arabic' : ''}`}
                 dir={descIsArabic ? 'rtl' : 'ltr'}>
                {exercise.description}
              </p>
              {descIsArabic && audio.isSupported && (
                <button
                  className={`audio-btn ${audio.isSpeaking ? 'speaking' : ''}`}
                  onClick={() => audio.speak(exercise.description)}
                >
                  <Volume2 size={14} />
                </button>
              )}
            </div>
            {exercise.tags.length > 0 && (
              <div className="exercise-tags">
                {exercise.tags.map(tag => (
                  <button key={tag} className="tag-chip" onClick={() => onFilterByTag(tag)}>
                    {TAG_LABELS[tag]}
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {onTogglePdf && (
              <button
                onClick={onTogglePdf}
                className="btn flex items-center gap-2"
                title={showPdf ? 'Hide Textbook' : 'Show Textbook'}
              >
                {showPdf ? <BookX size={16} /> : <BookOpen size={16} />}
                <span className="hidden sm:inline">{showPdf ? 'Hide' : 'Textbook'}</span>
              </button>
            )}
            <button
              onClick={onOpenSettings}
              className="btn flex items-center gap-2"
            >
              <Settings size={16} />
              <span className="hidden sm:inline">Settings</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mode tabs */}
      <div className="mode-tabs">
        {MODES.map(m => (
          <button
            key={m.key}
            className={`mode-tab ${mode === m.key ? 'active' : ''}`}
            onClick={() => onModeChange(m.key)}
          >
            {m.label}
          </button>
        ))}
      </div>

      {/* Active mode — key forces remount on exercise change */}
      {mode === 'practice' && (
        <PracticeMode
          key={exercise.id}
          exercise={exercise}
          progress={progress}
          audio={audio}
          onNextExercise={onNextExercise}
        />
      )}
      {mode === 'quiz' && (
        <QuizMode
          key={exercise.id}
          exercise={exercise}
          progress={progress}
          audio={audio}
        />
      )}
      {mode === 'flashcard' && (
        <FlashcardMode
          key={exercise.id}
          exercise={exercise}
          progress={progress}
          audio={audio}
        />
      )}
    </div>
  );
}
