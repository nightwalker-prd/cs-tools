import { useState, useCallback, useEffect, useMemo, useRef } from 'react';
import { ChevronRight, Search, Menu, X, BookOpen, PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { UNIT_INDEX } from '../data';
import type { ExerciseUnit, Exercise, SearchMode, ExerciseTag } from '../types';
import { TAG_LABELS } from '../types';
import type { useProgress } from '../hooks/useProgress';

const ALL_TAGS: ExerciseTag[] = Object.keys(TAG_LABELS) as ExerciseTag[];

interface SidebarProps {
  loadedUnits: Record<number, ExerciseUnit>;
  onLoadUnit: (unit: number) => Promise<void>;
  activeExerciseId: string | null;
  onSelectExercise: (unitNum: number, sectionIdx: number, exerciseIdx: number) => void;
  progress: ReturnType<typeof useProgress>;
  sidebarOpen: boolean;
  onCloseSidebar: () => void;
  onGoHome: () => void;
  activeTag: ExerciseTag | null;
  onTagChange: (tag: ExerciseTag | null) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export function Sidebar({
  loadedUnits,
  onLoadUnit,
  activeExerciseId,
  onSelectExercise,
  progress,
  sidebarOpen,
  onCloseSidebar,
  onGoHome,
  activeTag,
  onTagChange,
  isCollapsed,
  onToggleCollapse,
}: SidebarProps) {
  const [expandedUnits, setExpandedUnits] = useState<Set<number>>(new Set());
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');
  const [searchMode, setSearchMode] = useState<SearchMode>('title');
  const searchTimerRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const [debouncedQuery, setDebouncedQuery] = useState('');

  // Debounce search
  useEffect(() => {
    clearTimeout(searchTimerRef.current);
    searchTimerRef.current = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 250);
    return () => clearTimeout(searchTimerRef.current);
  }, [searchQuery]);

  // Load all units when content search or tag filter is active
  useEffect(() => {
    if ((debouncedQuery && searchMode === 'content') || activeTag) {
      for (const meta of UNIT_INDEX) {
        if (!loadedUnits[meta.unit]) {
          onLoadUnit(meta.unit);
        }
      }
    }
  }, [debouncedQuery, searchMode, activeTag, loadedUnits, onLoadUnit]);

  const toggleUnit = useCallback(async (unit: number) => {
    if (!loadedUnits[unit]) {
      await onLoadUnit(unit);
    }
    setExpandedUnits(prev => {
      const next = new Set(prev);
      if (next.has(unit)) next.delete(unit);
      else next.add(unit);
      return next;
    });
  }, [loadedUnits, onLoadUnit]);

  const toggleSection = useCallback((key: string) => {
    setExpandedSections(prev => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }, []);

  // Filter exercises based on search and/or tag
  const filteredNav = useMemo(() => {
    const hasQuery = debouncedQuery.trim().length > 0;
    if (!hasQuery && !activeTag) return null;

    const query = debouncedQuery.toLowerCase();
    const results: Array<{
      unitNum: number;
      unitTitle: string;
      sectionIdx: number;
      sectionTitle: string;
      exerciseIdx: number;
      exercise: Exercise;
    }> = [];

    for (const meta of UNIT_INDEX) {
      const unit = loadedUnits[meta.unit];
      if (!unit) continue;

      for (let sIdx = 0; sIdx < unit.sections.length; sIdx++) {
        const section = unit.sections[sIdx];
        for (let eIdx = 0; eIdx < section.exercises.length; eIdx++) {
          const exercise = section.exercises[eIdx];

          // Tag filter
          if (activeTag && !exercise.tags.includes(activeTag)) continue;

          // Search filter (only if query is present)
          if (hasQuery) {
            if (searchMode === 'title') {
              if (!exercise.title.toLowerCase().includes(query) &&
                  !exercise.description.toLowerCase().includes(query)) continue;
            } else {
              const hasMatch = exercise.questions.some(q =>
                q.question.toLowerCase().includes(query) ||
                q.answer.toLowerCase().includes(query)
              );
              if (!hasMatch) continue;
            }
          }

          results.push({ unitNum: meta.unit, unitTitle: meta.title, sectionIdx: sIdx, sectionTitle: section.title, exerciseIdx: eIdx, exercise });
        }
      }
    }
    return results;
  }, [debouncedQuery, searchMode, activeTag, loadedUnits]);

  function getExerciseDotClass(exercise: Exercise): string {
    const { completed, total } = progress.getExerciseProgress(exercise.id, exercise.questions.map(q => q.id));
    if (completed === total && total > 0) return 'completed';
    if (completed > 0) return 'in-progress';
    return 'not-started';
  }

  const { stats } = progress;

  return (
    <>
      {/* Mobile overlay */}
      <div
        className={`sidebar-overlay ${sidebarOpen ? 'visible' : ''}`}
        onClick={onCloseSidebar}
      />

      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        {/* Header */}
        <div className="sidebar-header">
          <div className="sidebar-header-top">
            <button className="sidebar-collapse-btn" onClick={onToggleCollapse}
              title={isCollapsed ? 'Pin sidebar' : 'Collapse sidebar'}>
              {isCollapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}
            </button>
            {isCollapsed && (
              <button className="sidebar-close-btn" onClick={onCloseSidebar}>
                <X size={18} />
              </button>
            )}
          </div>
          <button className="sidebar-brand" onClick={onGoHome}>
            <span className="brand-icon">ف</span>
            <div>
              <h1>FSTU Exercises</h1>
              <div className="subtitle">تمارين فقه اللغة</div>
            </div>
          </button>
          <div className="sidebar-stats">
            <div className="stat">
              <div className="stat-value">{stats.completed}</div>
              <div className="stat-label">Done</div>
            </div>
            <div className="stat">
              <div className="stat-value">{stats.mastered}</div>
              <div className="stat-label">Mastered</div>
            </div>
            <div className="stat">
              <div className="stat-value">{stats.streak}</div>
              <div className="stat-label">Streak</div>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="sidebar-search">
          <div className="search-input-container">
            <Search size={14} className="search-icon" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search exercises..."
              className="search-input"
            />
          </div>
          <div className="search-mode-toggle">
            <button
              className={`search-mode-btn ${searchMode === 'title' ? 'active' : ''}`}
              onClick={() => setSearchMode('title')}
            >
              Title
            </button>
            <button
              className={`search-mode-btn ${searchMode === 'content' ? 'active' : ''}`}
              onClick={() => setSearchMode('content')}
            >
              Content
            </button>
          </div>
        </div>

        {/* Tag Filter Bar */}
        <div className="tag-filter-bar">
          {ALL_TAGS.map(tag => (
            <button
              key={tag}
              className={`tag-chip ${activeTag === tag ? 'active' : ''}`}
              onClick={() => onTagChange(activeTag === tag ? null : tag)}
            >
              {TAG_LABELS[tag]}
            </button>
          ))}
        </div>

        {/* Navigation */}
        <div className="sidebar-nav">
          {filteredNav ? (
            // Search/tag filter results
            filteredNav.length === 0 ? (
              <div className="px-4 py-8 text-center text-sm text-muted-foreground font-sans">
                No exercises found
              </div>
            ) : (
              <div>
                <div className="px-4 py-2 text-xs text-muted-foreground font-sans">
                  {filteredNav.length} exercise{filteredNav.length !== 1 ? 's' : ''}{activeTag ? ` · ${TAG_LABELS[activeTag]}` : ''}
                </div>
                {filteredNav.map(result => (
                  <div
                    key={result.exercise.id}
                    className={`exercise-item ${activeExerciseId === result.exercise.id ? 'active' : ''}`}
                    onClick={() => {
                      onSelectExercise(result.unitNum, result.sectionIdx, result.exerciseIdx);
                      onCloseSidebar();
                    }}
                  >
                    <span className={`exercise-dot ${getExerciseDotClass(result.exercise)}`} />
                    <div className="search-result-text">
                      <span className="truncate">{result.exercise.title}</span>
                      <span className="search-result-context">
                        Unit {result.unitNum} · {result.sectionTitle}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )
          ) : (
            // Tree navigation
            UNIT_INDEX.map(meta => {
              const isExpanded = expandedUnits.has(meta.unit);
              const unit = loadedUnits[meta.unit];

              return (
                <div key={meta.unit} className="folder-group">
                  <div
                    className={`folder-header ${isExpanded ? 'active' : ''}`}
                    onClick={() => toggleUnit(meta.unit)}
                  >
                    <ChevronRight
                      size={16}
                      className={`text-primary transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`}
                    />
                    <span className="folder-name">Unit {meta.unit}: {meta.title}</span>
                    <span className="folder-count">{meta.exerciseCount}</span>
                  </div>

                  {isExpanded && unit && (
                    <div className="folder-children">
                      {unit.sections.map((section, sIdx) => {
                        const sectionKey = `${meta.unit}-${sIdx}`;
                        const isSectionExpanded = expandedSections.has(sectionKey);

                        return (
                          <div key={sectionKey} className="section-group">
                            <div
                              className="section-header"
                              onClick={() => toggleSection(sectionKey)}
                            >
                              <ChevronRight
                                size={12}
                                className={`text-muted-foreground transition-transform duration-200 ${isSectionExpanded ? 'rotate-90' : ''}`}
                              />
                              <span className="section-name">{section.title}</span>
                              <span className="text-xs text-muted-foreground font-sans">{section.exercises.length}</span>
                            </div>

                            {isSectionExpanded && section.exercises.map((exercise, eIdx) => (
                              <div
                                key={exercise.id}
                                className={`exercise-item ${activeExerciseId === exercise.id ? 'active' : ''}`}
                                onClick={() => {
                                  onSelectExercise(meta.unit, sIdx, eIdx);
                                  onCloseSidebar();
                                }}
                              >
                                <span className={`exercise-dot ${getExerciseDotClass(exercise)}`} />
                                <span className="truncate">{exercise.title}</span>
                              </div>
                            ))}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        <div className="sidebar-footer">
          <BookOpen size={14} />
          <span>FSTU Arabic Curriculum</span>
        </div>
      </aside>
    </>
  );
}

export function HamburgerButton({ onClick }: { onClick: () => void }) {
  return (
    <button className="hamburger-btn" onClick={onClick}>
      <Menu size={20} />
    </button>
  );
}
