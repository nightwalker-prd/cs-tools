import { useState, useCallback } from 'react'
import type { DifficultySettings, AyahMastery } from '../../types/quran'

const DEFAULT_DIFFICULTY: DifficultySettings = {
  hintLevel: 2, timeLimit: null, blanksPercent: 0.2, wordsRequired: 3,
}

const DIFFICULTY_BY_LEVEL: Record<number, Partial<DifficultySettings>> = {
  0: { hintLevel: 3, timeLimit: null, blanksPercent: 0.1, wordsRequired: 2 },
  1: { hintLevel: 2, timeLimit: 30, blanksPercent: 0.15, wordsRequired: 3 },
  2: { hintLevel: 2, timeLimit: 25, blanksPercent: 0.2, wordsRequired: 3 },
  3: { hintLevel: 1, timeLimit: 20, blanksPercent: 0.3, wordsRequired: 4 },
  4: { hintLevel: 1, timeLimit: 15, blanksPercent: 0.4, wordsRequired: 5 },
  5: { hintLevel: 0, timeLimit: 10, blanksPercent: 0.5, wordsRequired: 6 },
}

export function useAdaptiveDifficulty(timedMode: boolean = false) {
  const [sessionStats, setSessionStats] = useState({ correct: 0, wrong: 0, streak: 0 })

  const getDifficultyForAyah = useCallback((mastery: AyahMastery): DifficultySettings => {
    let adjustment = 0
    if (sessionStats.streak >= 5) adjustment = 1
    if (sessionStats.wrong > sessionStats.correct && sessionStats.correct > 3) adjustment = -1

    const adjustedLevel = Math.max(0, Math.min(5, mastery.level + adjustment))
    const settings = { ...DEFAULT_DIFFICULTY, ...DIFFICULTY_BY_LEVEL[adjustedLevel] }
    if (!timedMode) settings.timeLimit = null
    return settings
  }, [sessionStats, timedMode])

  const recordSessionResult = useCallback((correct: boolean) => {
    setSessionStats(prev => ({
      correct: prev.correct + (correct ? 1 : 0),
      wrong: prev.wrong + (correct ? 0 : 1),
      streak: correct ? prev.streak + 1 : 0,
    }))
  }, [])

  const resetSession = useCallback(() => {
    setSessionStats({ correct: 0, wrong: 0, streak: 0 })
  }, [])

  return { getDifficultyForAyah, recordSessionResult, resetSession, sessionStats }
}
