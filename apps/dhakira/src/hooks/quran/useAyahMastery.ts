import { useState, useCallback, useEffect } from 'react'
import type { AyahMastery, MasteryLevel, QuranGameType } from '../../types/quran'
import { QURAN_GAME_STORAGE_KEYS } from '../../types/quran'

interface MasteryState {
  [key: string]: AyahMastery
}

const MASTERY_THRESHOLDS = {
  1: { correct: 1, streak: 0, avgTime: Infinity },
  2: { correct: 3, streak: 2, avgTime: Infinity },
  3: { correct: 5, streak: 3, avgTime: 15000 },
  4: { correct: 8, streak: 4, avgTime: 10000 },
  5: { correct: 10, streak: 5, avgTime: 8000 },
} as const

function getKey(surah: number, ayah: number): string {
  return `${surah}:${ayah}`
}

function loadMastery(): MasteryState {
  try {
    const stored = localStorage.getItem(QURAN_GAME_STORAGE_KEYS.mastery)
    return stored ? JSON.parse(stored) : {}
  } catch {
    return {}
  }
}

function saveMastery(state: MasteryState): void {
  localStorage.setItem(QURAN_GAME_STORAGE_KEYS.mastery, JSON.stringify(state))
}

function calculateLevel(mastery: AyahMastery): MasteryLevel {
  for (let level = 5; level >= 1; level--) {
    const threshold = MASTERY_THRESHOLDS[level as 1 | 2 | 3 | 4 | 5]
    if (
      mastery.correctAttempts >= threshold.correct &&
      mastery.correctStreak >= threshold.streak &&
      mastery.avgResponseTime <= threshold.avgTime
    ) {
      return level as MasteryLevel
    }
  }
  return 0
}

export function useAyahMastery() {
  const [masteryState, setMasteryState] = useState<MasteryState>(loadMastery)

  useEffect(() => {
    saveMastery(masteryState)
  }, [masteryState])

  const getMastery = useCallback((surah: number, ayah: number): AyahMastery => {
    const key = getKey(surah, ayah)
    return masteryState[key] || {
      surah, ayah, level: 0, correctStreak: 0, totalAttempts: 0,
      correctAttempts: 0, avgResponseTime: 0, lastAttemptAt: null, mistakeHistory: [],
    }
  }, [masteryState])

  const recordAttempt = useCallback((
    surah: number, ayah: number, correct: boolean, responseTime: number,
    gameType: QuranGameType, mistake?: { expected: string; given: string }
  ) => {
    if (surah < 1 || ayah < 1 || responseTime < 0 || !Number.isFinite(responseTime)) return

    setMasteryState(prev => {
      const key = getKey(surah, ayah)
      const current = prev[key] || {
        surah, ayah, level: 0, correctStreak: 0, totalAttempts: 0,
        correctAttempts: 0, avgResponseTime: 0, lastAttemptAt: null, mistakeHistory: [],
      }

      const newTotalAttempts = current.totalAttempts + 1
      const newCorrectAttempts = current.correctAttempts + (correct ? 1 : 0)
      const newStreak = correct ? current.correctStreak + 1 : 0
      const newAvgTime = current.avgResponseTime === 0
        ? responseTime
        : (current.avgResponseTime * current.totalAttempts + responseTime) / newTotalAttempts

      const mistakeHistory = [...current.mistakeHistory]
      if (!correct && mistake) {
        mistakeHistory.push({ date: new Date().toISOString(), gameType, expected: mistake.expected, given: mistake.given })
        if (mistakeHistory.length > 10) mistakeHistory.shift()
      }

      const updated: AyahMastery = {
        ...current, totalAttempts: newTotalAttempts, correctAttempts: newCorrectAttempts,
        correctStreak: newStreak, avgResponseTime: newAvgTime,
        lastAttemptAt: new Date().toISOString(), mistakeHistory, level: 0,
      }
      updated.level = calculateLevel(updated)

      return { ...prev, [key]: updated }
    })
  }, [])

  const getWeakAyahs = useCallback((limit: number = 20): AyahMastery[] => {
    return Object.values(masteryState)
      .filter(m => m.mistakeHistory.length > 0 || m.level < 3)
      .sort((a, b) => {
        const aScore = a.mistakeHistory.length * 10 - a.level * 5 - a.correctStreak
        const bScore = b.mistakeHistory.length * 10 - b.level * 5 - b.correctStreak
        return bScore - aScore
      })
      .slice(0, limit)
  }, [masteryState])

  const getMasteryStats = useCallback(() => {
    const all = Object.values(masteryState)
    const byLevel = [0, 0, 0, 0, 0, 0]
    all.forEach(m => byLevel[m.level]++)
    return {
      total: all.length, byLevel,
      averageLevel: all.length > 0 ? all.reduce((sum, m) => sum + m.level, 0) / all.length : 0,
    }
  }, [masteryState])

  return { getMastery, recordAttempt, getWeakAyahs, getMasteryStats, allMastery: masteryState }
}
