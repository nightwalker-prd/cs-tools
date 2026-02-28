import { useState, useCallback, useMemo, useRef, useEffect, lazy, Suspense } from 'react';
import { UNIT_INDEX, loadUnit } from './data';
import { Sidebar, HamburgerButton } from './components/Sidebar';
import { ExerciseView } from './components/ExerciseView';
import { HomePage } from './components/HomePage';
import { SettingsPanel } from './components/SettingsPanel';
import { SplitPane } from './components/SplitPane';
import { useProgress } from './hooks/useProgress';
import { useAudio } from './hooks/useAudio';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';
import { useSidebarState } from '@arabtools/core';
import type { ExerciseUnit, ExerciseMode, ExerciseTag } from './types';

const PdfViewer = lazy(() => import('./components/PdfViewer').then(m => ({ default: m.PdfViewer })));

interface ActiveExercise {
  unitNum: number;
  sectionIdx: number;
  exerciseIdx: number;
}

export default function App() {
  const progressHook = useProgress();
  const audioHook = useAudio();

  const [loadedUnits, setLoadedUnits] = useState<Record<number, ExerciseUnit>>({});
  const [active, setActive] = useState<ActiveExercise | null>(null);
  const [mode, setMode] = useState<ExerciseMode>('practice');
  const sidebar = useSidebarState('fstu-ex');
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [activeTag, setActiveTag] = useState<ExerciseTag | null>(null);
  const [showPdf, setShowPdf] = useState(true);
  const mainRef = useRef<HTMLElement>(null);

  // Scroll to top when active exercise changes
  useEffect(() => {
    if (mainRef.current) {
      mainRef.current.scrollTop = 0;
    }
  }, [active]);

  // Eagerly load unit 1 on mount for homepage recommendations
  useEffect(() => {
    if (!loadedUnits[1]) {
      loadUnit(1).then(data => {
        setLoadedUnits(prev => ({ ...prev, [1]: data }));
      });
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleLoadUnit = useCallback(async (unit: number) => {
    if (loadedUnits[unit]) return;
    const data = await loadUnit(unit);
    setLoadedUnits(prev => ({ ...prev, [unit]: data }));
  }, [loadedUnits]);

  const handleSelectExercise = useCallback((unitNum: number, sectionIdx: number, exerciseIdx: number) => {
    if (!loadedUnits[unitNum]) {
      loadUnit(unitNum).then(data => {
        setLoadedUnits(prev => ({ ...prev, [unitNum]: data }));
        setActive({ unitNum, sectionIdx, exerciseIdx });
      });
    } else {
      setActive({ unitNum, sectionIdx, exerciseIdx });
    }
    progressHook.updateStreak();
  }, [loadedUnits, progressHook]);

  const resolved = useMemo(() => {
    if (!active) return null;
    const unit = loadedUnits[active.unitNum];
    if (!unit) return null;
    const section = unit.sections[active.sectionIdx];
    if (!section) return null;
    const exercise = section.exercises[active.exerciseIdx];
    if (!exercise) return null;
    return { unit, section, exercise };
  }, [active, loadedUnits]);

  const onNextExercise = useMemo(() => {
    if (!active || !resolved) return null;
    const { section } = resolved;
    const nextIdx = active.exerciseIdx + 1;
    if (nextIdx < section.exercises.length) {
      return () => setActive({ ...active, exerciseIdx: nextIdx });
    }
    return null;
  }, [active, resolved]);

  const onGoHome = useCallback(() => {
    setActive(null);
  }, []);

  const handleSelectUnit = useCallback(async (unit: number) => {
    if (!loadedUnits[unit]) {
      const data = await loadUnit(unit);
      setLoadedUnits(prev => ({ ...prev, [unit]: data }));
    }
    // Select first exercise in the unit
    const unitData = loadedUnits[unit] || await loadUnit(unit);
    if (unitData.sections.length > 0 && unitData.sections[0].exercises.length > 0) {
      setActive({ unitNum: unit, sectionIdx: 0, exerciseIdx: 0 });
      progressHook.updateStreak();
    }
  }, [loadedUnits, progressHook]);

  const handleResumeExercise = useCallback(() => {
    const exId = progressHook.data.lastViewed?.exerciseId;
    if (!exId) return;
    for (const meta of UNIT_INDEX) {
      const unit = loadedUnits[meta.unit];
      if (!unit) continue;
      for (let sIdx = 0; sIdx < unit.sections.length; sIdx++) {
        for (let eIdx = 0; eIdx < unit.sections[sIdx].exercises.length; eIdx++) {
          if (unit.sections[sIdx].exercises[eIdx].id === exId) {
            handleSelectExercise(meta.unit, sIdx, eIdx);
            return;
          }
        }
      }
    }
  }, [loadedUnits, progressHook.data.lastViewed, handleSelectExercise]);

  const handleFilterByTag = useCallback((tag: ExerciseTag) => {
    setActiveTag(tag);
    sidebar.openDrawer();
  }, [sidebar]);

  useKeyboardShortcuts({
    mode,
    onSwitchMode: setMode,
    onClosePanel: () => setSettingsOpen(false),
  });

  const targetPage = resolved?.section.bookPages.start ?? 1;

  const exerciseContent = resolved ? (
    <ExerciseView
      exercise={resolved.exercise}
      unit={resolved.unit}
      section={resolved.section}
      mode={mode}
      onModeChange={setMode}
      progress={progressHook}
      audio={audioHook}
      onOpenSettings={() => setSettingsOpen(true)}
      onNextExercise={onNextExercise}
      onGoHome={onGoHome}
      onFilterByTag={handleFilterByTag}
      showPdf={showPdf}
      onTogglePdf={() => setShowPdf(prev => !prev)}
    />
  ) : null;

  return (
    <div className={`app-layout ${sidebar.layoutClass}`}>
      <HamburgerButton onClick={sidebar.openDrawer} />

      <Sidebar
        loadedUnits={loadedUnits}
        onLoadUnit={handleLoadUnit}
        activeExerciseId={resolved?.exercise.id ?? null}
        onSelectExercise={handleSelectExercise}
        progress={progressHook}
        sidebarOpen={sidebar.collapsed ? sidebar.drawerOpen : true}
        onCloseSidebar={sidebar.closeDrawer}
        onGoHome={onGoHome}
        activeTag={activeTag}
        onTagChange={setActiveTag}
        isCollapsed={sidebar.collapsed}
        onToggleCollapse={sidebar.toggleCollapse}
      />

      <main ref={mainRef} className={`main-content ${resolved && showPdf ? 'has-split-pane' : ''}`}>
        {resolved && showPdf ? (
          <SplitPane
            pdfPane={
              <Suspense fallback={<div className="pdf-loading"><p>Loading viewer...</p></div>}>
                <PdfViewer targetPage={targetPage} />
              </Suspense>
            }
            exercisePane={
              <div className="main-content-center split-exercise-pane">
                {exerciseContent}
              </div>
            }
          />
        ) : (
          <div className="main-content-center">
            {exerciseContent || (
              <HomePage
                onSelectUnit={handleSelectUnit}
                onSelectExercise={handleSelectExercise}
                progress={progressHook}
                loadedUnits={loadedUnits}
                onResumeExercise={handleResumeExercise}
                hasLastViewed={!!progressHook.data.lastViewed}
              />
            )}
          </div>
        )}
      </main>

      <SettingsPanel
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        progress={progressHook}
        audio={audioHook}
      />
    </div>
  );
}
