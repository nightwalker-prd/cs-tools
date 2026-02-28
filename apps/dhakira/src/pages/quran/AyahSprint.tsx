import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Play, Timer, RotateCcw, X, Check } from 'lucide-react'
import { shuffle } from '@arabtools/core'
import { getFirstWords } from '../../data/quran-data'
import { SURAH_DATA } from '../../data/quran-surah'
import type { AyahRange } from '../../types/quran'

interface AyahSprintProps {
  onBack: () => void
}

interface AyahRef {
  surah: number
  ayah: number
}

interface FeedbackState {
  correct: boolean
  expectedAnswer: string
}

// Default range: Juz 1-5 (Al-Fatihah through Al-Maidah)
const JUZ_1_5_RANGE: AyahRange[] = [
  { surah: 1, startAyah: 1, endAyah: 7 },
  { surah: 2, startAyah: 1, endAyah: 286 },
  { surah: 3, startAyah: 1, endAyah: 200 },
  { surah: 4, startAyah: 1, endAyah: 176 },
  { surah: 5, startAyah: 1, endAyah: 120 },
]

const GAME_DURATION = 120 // 2 minutes in seconds
const WORDS_REQUIRED = 3
const WRONG_ANSWER_DELAY = 1000 // 1 second to show correct answer

// Normalize Arabic text for comparison (remove tashkeel/diacritics)
const normalizeArabic = (s: string) => s.replace(/[ً-ٰٟ]/g, '').trim()

// Generate all ayah references from ranges
function generateAyahPool(ranges: AyahRange[]): AyahRef[] {
  const pool: AyahRef[] = []
  for (const range of ranges) {
    for (let ayah = range.startAyah; ayah <= range.endAyah; ayah++) {
      pool.push({ surah: range.surah, ayah })
    }
  }
  return pool
}

export function AyahSprint({ onBack }: AyahSprintProps) {
  // Game state
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'feedback' | 'complete'>('idle')
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION)
  const [answer, setAnswer] = useState('')

  // Current ayah
  const [currentAyah, setCurrentAyah] = useState<AyahRef | null>(null)
  const [ayahQueue, setAyahQueue] = useState<AyahRef[]>([])
  const [queueIndex, setQueueIndex] = useState(0)

  // Feedback state
  const [feedback, setFeedback] = useState<FeedbackState | null>(null)

  // Stats
  const [correctCount, setCorrectCount] = useState(0)
  const [wrongCount, setWrongCount] = useState(0)
  const [totalAttempted, setTotalAttempted] = useState(0)

  // Refs
  const inputRef = useRef<HTMLInputElement>(null)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const feedbackTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const startTimeRef = useRef<number>(0)

  // Get ranges to use
  const ranges = JUZ_1_5_RANGE

  // Initialize ayah queue
  const initializeQueue = useCallback(() => {
    const pool = generateAyahPool(ranges)
    const shuffled = shuffle(pool)
    setAyahQueue(shuffled)
    setQueueIndex(0)
    return shuffled
  }, [])

  // Get next ayah from queue
  const getNextAyah = useCallback(() => {
    if (queueIndex >= ayahQueue.length) {
      // Reshuffle when we run out
      const newQueue = shuffle(ayahQueue)
      setAyahQueue(newQueue)
      setQueueIndex(1)
      return newQueue[0]
    }
    const next = ayahQueue[queueIndex]
    setQueueIndex(prev => prev + 1)
    return next
  }, [ayahQueue, queueIndex])

  // Start the game
  const startGame = useCallback(() => {
    const queue = initializeQueue()
    const firstAyah = queue[0]
    setQueueIndex(1)
    setCurrentAyah(firstAyah)
    setTimeLeft(GAME_DURATION)
    setCorrectCount(0)
    setWrongCount(0)
    setTotalAttempted(0)
    setAnswer('')
    setFeedback(null)
    setGameState('playing')
    startTimeRef.current = Date.now()

    // Focus input
    setTimeout(() => {
      inputRef.current?.focus()
    }, 100)
  }, [initializeQueue])

  // Move to next ayah
  const moveToNext = useCallback(() => {
    const next = getNextAyah()
    setCurrentAyah(next)
    setAnswer('')
    setFeedback(null)
    setGameState('playing')
    inputRef.current?.focus()
  }, [getNextAyah])

  // Check answer
  const checkAnswer = useCallback((userAnswer: string): boolean => {
    if (!currentAyah) return false

    const expectedWords = getFirstWords(currentAyah.surah, currentAyah.ayah, WORDS_REQUIRED)
    if (!expectedWords || expectedWords.length === 0) return false

    const expectedNormalized = expectedWords.map(normalizeArabic).join(' ')
    const answerNormalized = normalizeArabic(userAnswer)

    // Check if answer matches or starts with the expected
    return answerNormalized === expectedNormalized ||
           expectedNormalized.startsWith(answerNormalized)
  }, [currentAyah])

  // Get expected answer text
  const getExpectedAnswer = useCallback((): string => {
    if (!currentAyah) return ''
    const words = getFirstWords(currentAyah.surah, currentAyah.ayah, WORDS_REQUIRED)
    return words?.join(' ') || ''
  }, [currentAyah])

  // Handle answer submission
  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault()
    if (!currentAyah || gameState !== 'playing' || !answer.trim()) return

    const isCorrect = checkAnswer(answer)
    setTotalAttempted(prev => prev + 1)

    if (isCorrect) {
      setCorrectCount(prev => prev + 1)
      // Immediately move to next
      moveToNext()
    } else {
      setWrongCount(prev => prev + 1)
      // Show correct answer briefly
      setFeedback({
        correct: false,
        expectedAnswer: getExpectedAnswer(),
      })
      setGameState('feedback')

      // Clear any existing timeout
      if (feedbackTimeoutRef.current) {
        clearTimeout(feedbackTimeoutRef.current)
      }

      // Move to next after delay
      feedbackTimeoutRef.current = setTimeout(() => {
        if (timeLeft > 0) {
          moveToNext()
        }
      }, WRONG_ANSWER_DELAY)
    }
  }, [currentAyah, gameState, answer, checkAnswer, moveToNext, getExpectedAnswer, timeLeft])

  // Timer effect
  useEffect(() => {
    if (gameState === 'playing' || gameState === 'feedback') {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setGameState('complete')
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [gameState])

  // Cleanup feedback timeout on unmount
  useEffect(() => {
    return () => {
      if (feedbackTimeoutRef.current) {
        clearTimeout(feedbackTimeoutRef.current)
      }
    }
  }, [])

  // End game when time runs out
  useEffect(() => {
    if (timeLeft === 0 && (gameState === 'playing' || gameState === 'feedback')) {
      setGameState('complete')
      if (feedbackTimeoutRef.current) {
        clearTimeout(feedbackTimeoutRef.current)
      }
    }
  }, [timeLeft, gameState])

  // Get surah name
  const getSurahName = (surah: number): string => {
    return SURAH_DATA[surah - 1]?.name || `Surah ${surah}`
  }

  // Format time as MM:SS
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  // Calculate stats
  const accuracy = totalAttempted > 0 ? Math.round((correctCount / totalAttempted) * 100) : 0
  const elapsedTime = GAME_DURATION - timeLeft
  const ayahsPerMinute = elapsedTime > 0 ? ((correctCount / elapsedTime) * 60).toFixed(1) : '0.0'

  return (
    <div className="game-page">
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button className="back-btn" onClick={onBack}>
            <ArrowLeft size={18} />
          </button>
          <div>
            <h2 style={{ margin: 0 }}>Ayah Sprint</h2>
            {gameState !== 'idle' && gameState !== 'complete' && (
              <p style={{ color: 'var(--color-muted-foreground)', fontSize: '0.875rem', margin: 0 }}>
                {correctCount} correct | {accuracy}% accuracy
              </p>
            )}
          </div>
        </div>

        {/* Timer display during game */}
        {(gameState === 'playing' || gameState === 'feedback') && (
          <div style={{
            display: 'flex', alignItems: 'center', gap: '0.5rem',
            padding: '0.5rem 1rem', borderRadius: '0.75rem',
            background: timeLeft <= 10 ? 'rgba(244,63,94,0.15)' : 'var(--color-secondary)',
            color: timeLeft <= 10 ? '#fb7185' : 'var(--color-foreground)',
          }}>
            <Timer size={20} />
            <span style={{ fontFamily: 'monospace', fontSize: '1.25rem', fontWeight: 700 }}>{formatTime(timeLeft)}</span>
          </div>
        )}
      </div>

      {/* Game Area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        {/* IDLE State */}
        {gameState === 'idle' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{ textAlign: 'center' }}
          >
            <div className="glass-card" style={{ padding: '2rem', maxWidth: '500px', margin: '0 auto' }}>
              <div style={{
                width: '6rem', height: '6rem', borderRadius: '50%',
                background: 'var(--color-secondary)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 1.5rem',
              }}>
                <Timer size={48} style={{ color: 'var(--color-accent)' }} />
              </div>
              <h2 style={{ marginBottom: '1rem' }}>2-Minute Sprint</h2>
              <p style={{ color: 'var(--color-muted-foreground)', marginBottom: '1.5rem', maxWidth: '28rem' }}>
                Type the first {WORDS_REQUIRED} words of each ayah as fast as possible.
                Correct answers advance immediately. Wrong answers show the answer briefly.
              </p>
              <button className="btn-primary" onClick={startGame} style={{ padding: '1rem 2rem', fontSize: '1.125rem' }}>
                <Play size={24} />
                Start Sprint
              </button>
            </div>
          </motion.div>
        )}

        {/* PLAYING / FEEDBACK State */}
        {(gameState === 'playing' || gameState === 'feedback') && currentAyah && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ width: '100%', maxWidth: '32rem' }}
          >
            {/* Live Stats Bar */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginBottom: '1.5rem', fontSize: '0.875rem' }}>
              <div style={{ textAlign: 'center' }}>
                <span style={{ color: 'var(--color-muted-foreground)' }}>Correct</span>
                <p style={{ color: '#4ade80', fontWeight: 700, fontSize: '1.25rem', margin: 0 }}>{correctCount}</p>
              </div>
              <div style={{ textAlign: 'center' }}>
                <span style={{ color: 'var(--color-muted-foreground)' }}>Wrong</span>
                <p style={{ color: '#fb7185', fontWeight: 700, fontSize: '1.25rem', margin: 0 }}>{wrongCount}</p>
              </div>
              <div style={{ textAlign: 'center' }}>
                <span style={{ color: 'var(--color-muted-foreground)' }}>Ayahs/min</span>
                <p style={{ color: 'var(--color-accent)', fontWeight: 700, fontSize: '1.25rem', margin: 0 }}>{ayahsPerMinute}</p>
              </div>
            </div>

            {/* Reference Display */}
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <p style={{ color: 'var(--color-muted-foreground)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                First {WORDS_REQUIRED} words of:
              </p>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', color: 'var(--color-accent)', margin: 0 }}>
                {getSurahName(currentAyah.surah)} : {currentAyah.ayah}
              </h2>
            </div>

            {/* Answer Input */}
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ position: 'relative' }}>
                <input
                  ref={inputRef}
                  type="text"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  disabled={gameState === 'feedback'}
                  placeholder="Type the first words..."
                  dir="rtl"
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="off"
                  spellCheck={false}
                  className="font-arabic"
                  style={{
                    width: '100%', padding: '1.25rem 1.5rem',
                    background: 'var(--color-card)',
                    border: gameState === 'feedback' ? '2px solid rgba(244,63,94,0.5)' : '2px solid var(--color-border)',
                    borderRadius: '0.75rem',
                    color: 'var(--color-foreground)', fontSize: '1.5rem', textAlign: 'center',
                    outline: 'none', boxSizing: 'border-box',
                  }}
                />
              </div>

              <button
                type="submit"
                disabled={!answer.trim() || gameState === 'feedback'}
                className="btn-primary"
                style={{ width: '100%', padding: '1rem', fontSize: '1.125rem' }}
              >
                <Check size={20} />
                Submit
              </button>
            </form>

            {/* Wrong Answer Feedback */}
            <AnimatePresence>
              {gameState === 'feedback' && feedback && !feedback.correct && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  style={{
                    marginTop: '1.5rem', padding: '1rem', borderRadius: '0.75rem',
                    background: 'rgba(244,63,94,0.15)', border: '1px solid rgba(244,63,94,0.3)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <X size={20} style={{ color: '#fb7185' }} />
                    <span style={{ color: '#fb7185', fontWeight: 500 }}>Correct answer:</span>
                  </div>
                  <p className="font-arabic" style={{ textAlign: 'center', fontSize: '1.25rem', margin: 0 }} dir="rtl">
                    {feedback.expectedAnswer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {/* COMPLETE State */}
        {gameState === 'complete' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="glass-card" style={{ padding: '2rem', textAlign: 'center', maxWidth: '28rem', margin: '0 auto' }}>
              <h2 style={{ marginBottom: '0.5rem' }}>Sprint Complete!</h2>
              <p style={{ color: 'var(--color-muted-foreground)', marginBottom: '1.5rem' }}>2 minutes of intense practice</p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                <div className="glass-card" style={{ padding: '1rem' }}>
                  <p style={{ color: 'var(--color-muted-foreground)', fontSize: '0.875rem', margin: 0 }}>Total Correct</p>
                  <p style={{ color: '#4ade80', fontFamily: 'var(--font-serif)', fontSize: '2rem', margin: 0 }}>{correctCount}</p>
                </div>
                <div className="glass-card" style={{ padding: '1rem' }}>
                  <p style={{ color: 'var(--color-muted-foreground)', fontSize: '0.875rem', margin: 0 }}>Accuracy</p>
                  <p style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-serif)', fontSize: '2rem', margin: 0 }}>{accuracy}%</p>
                </div>
                <div className="glass-card" style={{ padding: '1rem' }}>
                  <p style={{ color: 'var(--color-muted-foreground)', fontSize: '0.875rem', margin: 0 }}>Ayahs/min</p>
                  <p style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', margin: 0 }}>{ayahsPerMinute}</p>
                </div>
                <div className="glass-card" style={{ padding: '1rem' }}>
                  <p style={{ color: 'var(--color-muted-foreground)', fontSize: '0.875rem', margin: 0 }}>Wrong</p>
                  <p style={{ color: '#fb7185', fontFamily: 'var(--font-serif)', fontSize: '2rem', margin: 0 }}>{wrongCount}</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button className="btn-primary" onClick={startGame} style={{ flex: 1 }}>
                  <RotateCcw size={18} />
                  Sprint Again
                </button>
                <button className="btn-secondary" onClick={onBack} style={{ flex: 1 }}>
                  <X size={18} />
                  Exit
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
