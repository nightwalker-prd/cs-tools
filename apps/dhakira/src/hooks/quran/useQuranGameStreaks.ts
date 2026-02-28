import { useState, useCallback, useEffect } from 'react'
import type { QuranGameStats } from '../../types/quran'
import { QURAN_GAME_STORAGE_KEYS } from '../../types/quran'

function loadStats(): QuranGameStats {
  try {
    const stored = localStorage.getItem(QURAN_GAME_STORAGE_KEYS.streaks)
    return stored ? JSON.parse(stored) : {
      dailyStreak: 0, lastPlayedDate: null, totalSessions: 0, totalAyahsTested: 0, totalCorrect: 0,
    }
  } catch {
    return { dailyStreak: 0, lastPlayedDate: null, totalSessions: 0, totalAyahsTested: 0, totalCorrect: 0 }
  }
}

function saveStats(stats: QuranGameStats): void {
  localStorage.setItem(QURAN_GAME_STORAGE_KEYS.streaks, JSON.stringify(stats))
}

function isSameDay(date1: string, date2: string): boolean {
  return date1.slice(0, 10) === date2.slice(0, 10)
}

function isYesterday(date: string): boolean {
  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  return date.slice(0, 10) === yesterday.toISOString().slice(0, 10)
}

export function useQuranGameStreaks() {
  const [stats, setStats] = useState<QuranGameStats>(loadStats)

  useEffect(() => { saveStats(stats) }, [stats])

  useEffect(() => {
    const today = new Date().toISOString()
    if (stats.lastPlayedDate) {
      if (!isSameDay(stats.lastPlayedDate, today) && !isYesterday(stats.lastPlayedDate)) {
        setStats(prev => ({ ...prev, dailyStreak: 0 }))
      }
    }
  }, [])

  const recordSession = useCallback((ayahsTested: number, correctCount: number) => {
    const today = new Date().toISOString()
    setStats(prev => {
      const isNewDay = !prev.lastPlayedDate || !isSameDay(prev.lastPlayedDate, today)
      const wasYesterday = prev.lastPlayedDate && isYesterday(prev.lastPlayedDate)
      let newStreak = prev.dailyStreak
      if (isNewDay) {
        newStreak = wasYesterday || prev.dailyStreak === 0 ? prev.dailyStreak + 1 : 1
      }
      return {
        dailyStreak: newStreak, lastPlayedDate: today,
        totalSessions: prev.totalSessions + 1,
        totalAyahsTested: prev.totalAyahsTested + ayahsTested,
        totalCorrect: prev.totalCorrect + correctCount,
      }
    })
  }, [])

  return { stats, recordSession }
}
