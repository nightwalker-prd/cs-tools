import { useState, useCallback, useRef } from 'react'
import { shuffle } from '@arabtools/core'
import { getAyah } from '../../data/quran-data'
import { SURAH_DATA } from '../../data/quran-surah'
import type { QuranGameState, QuranGameQuestion, QuranGameType, QuranGameMode, AyahRange } from '../../types/quran'
import { useAyahMastery } from './useAyahMastery'
import { useAdaptiveDifficulty } from './useAdaptiveDifficulty'
import { useQuranGameStreaks } from './useQuranGameStreaks'

const JUZ_1_5_RANGE = [
  { surah: 1, start: 1, end: 7 },
  { surah: 2, start: 1, end: 286 },
  { surah: 3, start: 1, end: 200 },
  { surah: 4, start: 1, end: 176 },
  { surah: 5, start: 1, end: 120 },
]

interface UseQuranGameOptions {
  gameType: QuranGameType
  mode: QuranGameMode
  timedMode?: boolean
  selectedRanges?: AyahRange[]
}

export function useQuranGame(options: UseQuranGameOptions) {
  const { gameType, mode, timedMode = false, selectedRanges = [] } = options

  const [state, setState] = useState<QuranGameState>('idle')
  const [currentQuestion, setCurrentQuestion] = useState<QuranGameQuestion | null>(null)
  const [sessionResults, setSessionResults] = useState<Array<{
    surah: number; ayah: number; correct: boolean; responseTime: number
  }>>([])
  const [perfectRun, setPerfectRun] = useState(0)

  const questionStartTime = useRef<number>(0)
  const { getMastery, recordAttempt, getWeakAyahs } = useAyahMastery()
  const { getDifficultyForAyah, recordSessionResult, resetSession } = useAdaptiveDifficulty(timedMode)
  const { recordSession } = useQuranGameStreaks()

  const getAyahPool = useCallback((): Array<{ surah: number; ayah: number }> => {
    const pool: Array<{ surah: number; ayah: number }> = []

    if (mode === 'my-progress') {
      const weakAyahs = getWeakAyahs(50)
      if (weakAyahs.length > 0) {
        weakAyahs.forEach(m => pool.push({ surah: m.surah, ayah: m.ayah }))
      }
    }

    if (pool.length < 20) {
      const ranges = selectedRanges.length > 0
        ? selectedRanges.map(r => ({ surah: r.surah, start: r.startAyah, end: r.endAyah }))
        : JUZ_1_5_RANGE

      ranges.forEach(range => {
        for (let a = range.start; a <= range.end; a++) {
          if (!pool.some(p => p.surah === range.surah && p.ayah === a)) {
            pool.push({ surah: range.surah, ayah: a })
          }
        }
      })
    }

    return shuffle(pool)
  }, [mode, selectedRanges, getWeakAyahs])

  const generateQuestion = useCallback((surah: number, ayah: number): QuranGameQuestion | null => {
    const ayahData = getAyah(surah, ayah)
    if (!ayahData) return null
    const surahName = SURAH_DATA[surah - 1]?.name || `Surah ${surah}`
    return { surah, ayah, questionText: `${surahName}:${ayah}`, correctAnswer: ayahData.t, words: ayahData.w }
  }, [])

  const startGame = useCallback(() => {
    resetSession()
    setSessionResults([])
    setPerfectRun(0)
    const pool = getAyahPool()
    if (pool.length === 0) { setState('complete'); return }
    const first = pool[0]
    const question = generateQuestion(first.surah, first.ayah)
    if (question) {
      setCurrentQuestion(question)
      setState('playing')
      questionStartTime.current = Date.now()
    }
  }, [getAyahPool, generateQuestion, resetSession])

  const submitAnswer = useCallback((answer: string, isCorrect: boolean) => {
    if (!currentQuestion || state !== 'playing') return
    const responseTime = Date.now() - questionStartTime.current
    recordAttempt(currentQuestion.surah, currentQuestion.ayah, isCorrect, responseTime, gameType,
      isCorrect ? undefined : { expected: currentQuestion.correctAnswer, given: answer })
    recordSessionResult(isCorrect)
    setSessionResults(prev => [...prev, { surah: currentQuestion.surah, ayah: currentQuestion.ayah, correct: isCorrect, responseTime }])
    setPerfectRun(prev => isCorrect ? prev + 1 : 0)
    setState('feedback')
  }, [currentQuestion, state, gameType, recordAttempt, recordSessionResult])

  const nextQuestion = useCallback(() => {
    const pool = getAyahPool()
    const tested = new Set(sessionResults.map(r => `${r.surah}:${r.ayah}`))
    const next = pool.find(p => !tested.has(`${p.surah}:${p.ayah}`))
    if (!next || sessionResults.length >= 20) {
      const correctCount = sessionResults.filter(r => r.correct).length
      recordSession(sessionResults.length, correctCount)
      setState('complete')
      return
    }
    const question = generateQuestion(next.surah, next.ayah)
    if (question) {
      setCurrentQuestion(question)
      setState('playing')
      questionStartTime.current = Date.now()
    }
  }, [getAyahPool, sessionResults, generateQuestion, recordSession])

  const endGame = useCallback(() => {
    if (sessionResults.length > 0) {
      const correctCount = sessionResults.filter(r => r.correct).length
      recordSession(sessionResults.length, correctCount)
    }
    setState('idle')
    setCurrentQuestion(null)
    setSessionResults([])
  }, [sessionResults, recordSession])

  const getGameDifficultyForAyah = useCallback(
    (surah: number, ayah: number) => getDifficultyForAyah(getMastery(surah, ayah)),
    [getDifficultyForAyah, getMastery]
  )

  return {
    state, currentQuestion, sessionResults, perfectRun,
    startGame, submitAnswer, nextQuestion, endGame,
    getMastery, getDifficultyForAyah: getGameDifficultyForAyah,
  }
}
