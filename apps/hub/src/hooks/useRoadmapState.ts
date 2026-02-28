import { useCallback, useMemo } from 'react';
import { usePersistedState } from '@arabtools/core';
import type { UnitProgress } from '@/types/roadmap';

interface RoadmapState {
  expandedUnits: number[];
  selectedTopic: string | null;
}

const DEFAULT_STATE: RoadmapState = {
  expandedUnits: [],
  selectedTopic: null,
};

export function useRoadmapState(unitProgress: UnitProgress[]) {
  const [state, setState] = usePersistedState<RoadmapState>(
    'arabtools-hub-roadmap',
    DEFAULT_STATE,
  );

  // Auto-expand units with in-progress topics (if user hasn't manually set any)
  const expandedUnits = useMemo(() => {
    if (state.expandedUnits.length > 0) return new Set(state.expandedUnits);
    // Default: expand units that have in-progress topics
    const autoExpand = new Set<number>();
    for (const unit of unitProgress) {
      if (unit.topics.some((t) => t.status === 'in-progress')) {
        autoExpand.add(unit.unitNumber);
      }
    }
    // If nothing is in-progress, expand unit 1
    if (autoExpand.size === 0) autoExpand.add(1);
    return autoExpand;
  }, [state.expandedUnits, unitProgress]);

  const toggleUnit = useCallback((unitNum: number) => {
    setState((prev) => {
      const current = new Set(prev.expandedUnits);
      if (current.has(unitNum)) {
        current.delete(unitNum);
      } else {
        current.add(unitNum);
      }
      return { ...prev, expandedUnits: [...current] };
    });
  }, [setState]);

  const selectTopic = useCallback((topicId: string | null) => {
    setState((prev) => ({
      ...prev,
      selectedTopic: prev.selectedTopic === topicId ? null : topicId,
    }));
  }, [setState]);

  return {
    expandedUnits,
    selectedTopic: state.selectedTopic,
    toggleUnit,
    selectTopic,
  };
}
