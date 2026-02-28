import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Play, Check, X, RotateCcw, Target, AlertTriangle } from 'lucide-react'
import { shuffle } from '@arabtools/core'
import { useAyahMastery } from '../../hooks/quran'
import { getAyah } from '../../data/quran-data'
import { SURAH_DATA } from '../../data/quran-surah'
import type { AyahMastery } from '../../types/quran'

interface MistakeMarathonProps {
  onBack: () => void
}

type GameVariant = 'first-word' | 'complete-word'

interface SessionResult {
  surah: number
  ayah: number
  correct: boolean
  responseTime: number
}

export function MistakeMarathon({ onBack }: MistakeMarathonProps) {
  const [state, setState] = useState<'idle' | 'playing' | 'feedback' | 'complete' | 'no-mistakes'>('idle')
  const [weakAyahs, setWeakAyahs] = useState<AyahMastery[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [currentVariant, setCurrentVariant] = useState<GameVariant>('first-word')
  const [answer, setAnswer] = useState('')
  const [showFeedback, setShowFeedback] = useState(false)
  const [lastCorrect, setLastCorrect] = useState(false)
  const [sessionResults, setSessionResults] = useState<SessionResult[]>([])
  const [perfectRun, setPerfectRun] = useState(0)
  const questionStartTime = useRef<number>(0)
  const inputRef = useRef<HTMLInputElement>(null)

  const { getWeakAyahs, recordAttempt } = useAyahMastery()

  useEffect(() => {
    if (state === 'playing' && inputRef.current) {
      inputRef.current.focus()
    }
  }, [state, currentIndex])

  const startGame = useCallback(() => {
    const weak = getWeakAyahs(20)

    if (weak.length === 0) {
      setState('no-mistakes')
      return
    }

    // Shuffle using Fisher-Yates from core
    const shuffled = shuffle(weak)
    setWeakAyahs(shuffled)
    setCurrentIndex(0)
    setSessionResults([])
    setPerfectRun(0)
    setAnswer('')
    setShowFeedback(false)

    // Randomly pick game variant
    setCurrentVariant(Math.random() > 0.5 ? 'first-word' : 'complete-word')

    setState('playing')
    questionStartTime.current = Date.now()
  }, [getWeakAyahs])

  const getCurrentAyah = () => {
    if (currentIndex >= weakAyahs.length) return null
    const current = weakAyahs[currentIndex]
    return getAyah(current.surah, current.ayah)
  }

  const getCurrentMastery = () => {
    if (currentIndex >= weakAyahs.length) return null
    return weakAyahs[currentIndex]
  }

  const normalize = (s: string) => s.replace(/[ً-ٰٟ]/g, '').trim()

  const checkAnswer = (userAnswer: string): boolean => {
    const ayahData = getCurrentAyah()
    if (!ayahData) return false

    if (currentVariant === 'first-word') {
      // Check first 3 words
      const expectedWords = ayahData.w.slice(0, 3)
      const expectedNormalized = expectedWords.map(normalize).join(' ')
      const answerNormalized = normalize(userAnswer)
      return answerNormalized === expectedNormalized ||
             expectedNormalized.startsWith(answerNormalized)
    } else {
      // Complete word: show part of ayah, user completes
      // For simplicity, check if user typed a word that appears in the ayah
      const answerNormalized = normalize(userAnswer)
      return ayahData.w.some(w => normalize(w) === answerNormalized)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (state !== 'playing') return

    const mastery = getCurrentMastery()
    if (!mastery) return

    const responseTime = Date.now() - questionStartTime.current
    const isCorrect = checkAnswer(answer)

    setLastCorrect(isCorrect)
    setShowFeedback(true)
    setState('feedback')

    // Record the attempt
    recordAttempt(
      mastery.surah,
      mastery.ayah,
      isCorrect,
      responseTime,
      currentVariant === 'first-word' ? 'first-word' : 'complete-ayah',
      isCorrect ? undefined : { expected: getExpectedAnswer(), given: answer }
    )

    setSessionResults(prev => [...prev, {
      surah: mastery.surah,
      ayah: mastery.ayah,
      correct: isCorrect,
      responseTime,
    }])

    setPerfectRun(prev => isCorrect ? prev + 1 : 0)
  }

  const handleNext = () => {
    setShowFeedback(false)
    setAnswer('')

    if (currentIndex + 1 >= weakAyahs.length || sessionResults.length >= 20) {
      setState('complete')
      return
    }

    setCurrentIndex(prev => prev + 1)
    // Alternate game variant
    setCurrentVariant(prev => prev === 'first-word' ? 'complete-word' : 'first-word')
    setState('playing')
    questionStartTime.current = Date.now()
  }

  const getSurahName = (surah: number): string => {
    return SURAH_DATA[surah - 1]?.name || `Surah ${surah}`
  }

  const getExpectedAnswer = (): string => {
    const ayahData = getCurrentAyah()
    if (!ayahData) return ''

    if (currentVariant === 'first-word') {
      return ayahData.w.slice(0, 3).join(' ')
    } else {
      // For complete word, show last missed word or random word
      const mastery = getCurrentMastery()
      if (mastery && mastery.mistakeHistory.length > 0) {
        return mastery.mistakeHistory[mastery.mistakeHistory.length - 1].expected
      }
      return ayahData.w[Math.floor(ayahData.w.length / 2)]
    }
  }

  const getPartialAyah = (): string => {
    const ayahData = getCurrentAyah()
    if (!ayahData) return ''

    if (currentVariant === 'complete-word') {
      // Show ayah with one word blanked
      const words = [...ayahData.w]
      const blankIndex = Math.floor(words.length / 2)
      words[blankIndex] = '______'
      return words.join(' ')
    }
    return ''
  }

  const getRecentMistake = (): string | null => {
    const mastery = getCurrentMastery()
    if (!mastery || mastery.mistakeHistory.length === 0) return null
    const last = mastery.mistakeHistory[mastery.mistakeHistory.length - 1]
    return `Last mistake: "${last.given}" instead of "${last.expected}"`
  }

  const completionAccuracy = sessionResults.length > 0
    ? Math.round((sessionResults.filter(r => r.correct).length / sessionResults.length) * 100)
    : 0

  return (
    <div className="game-page">
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
        <button className="back-btn" onClick={onBack}>
          <ArrowLeft size={18} />
        </button>
        <div>
          <h2 style={{ margin: 0 }}>Mistake Marathon</h2>
          {(state === 'playing' || state === 'feedback') && (
            <p style={{ color: 'var(--color-muted-foreground)', fontSize: '0.875rem', margin: 0 }}>
              {sessionResults.length + 1}/{Math.min(weakAyahs.length, 20)} &bull; Perfect run: {perfectRun}
            </p>
          )}
        </div>
      </div>

      {/* Game Area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        {/* IDLE State */}
        {state === 'idle' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{ textAlign: 'center' }}
          >
            <div className="glass-card" style={{ padding: '2rem', maxWidth: '500px', margin: '0 auto' }}>
              <div style={{
                width: '4rem', height: '4rem', margin: '0 auto 1rem',
                borderRadius: '50%', background: 'rgba(244,63,94,0.15)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Target size={32} style={{ color: '#fb7185' }} />
              </div>
              <h2 style={{ marginBottom: '1rem' }}>Mistake Marathon</h2>
              <p style={{ color: 'var(--color-muted-foreground)', marginBottom: '1.5rem', maxWidth: '28rem' }}>
                Focus on your weak spots! This mode drills ayahs you&apos;ve
                struggled with, cycling through different game types.
              </p>
              <button className="btn-primary" onClick={startGame} style={{ padding: '1rem 2rem', fontSize: '1.125rem' }}>
                <Play size={24} />
                Start Marathon
              </button>
            </div>
          </motion.div>
        )}

        {/* NO MISTAKES State */}
        {state === 'no-mistakes' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{ textAlign: 'center' }}
          >
            <div className="glass-card" style={{ padding: '2rem', maxWidth: '500px', margin: '0 auto' }}>
              <div style={{
                width: '4rem', height: '4rem', margin: '0 auto 1rem',
                borderRadius: '50%', background: 'rgba(34,197,94,0.15)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Check size={32} style={{ color: '#4ade80' }} />
              </div>
              <h2 style={{ marginBottom: '1rem' }}>No Weak Ayahs Found!</h2>
              <p style={{ color: 'var(--color-muted-foreground)', marginBottom: '1.5rem', maxWidth: '28rem' }}>
                Great job! You don&apos;t have any recorded mistakes to practice.
                Play other games first to build your mistake history.
              </p>
              <button className="btn-secondary" onClick={onBack} style={{ padding: '1rem 2rem', fontSize: '1.125rem' }}>
                <ArrowLeft size={24} />
                Back to Games
              </button>
            </div>
          </motion.div>
        )}

        {/* PLAYING State */}
        {(state === 'playing' || state === 'feedback') && getCurrentMastery() && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ width: '100%', maxWidth: '32rem' }}
          >
            {/* Current ayah info */}
            <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                padding: '0.25rem 0.75rem',
                background: 'rgba(244,63,94,0.15)', border: '1px solid rgba(244,63,94,0.3)',
                borderRadius: '9999px', color: '#fb7185', fontSize: '0.875rem',
                marginBottom: '0.5rem',
              }}>
                <AlertTriangle size={14} />
                Weak Ayah
              </div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: 'var(--color-accent)', margin: 0 }}>
                {getSurahName(getCurrentMastery()!.surah)} : {getCurrentMastery()!.ayah}
              </h2>
            </div>

            {/* Game variant specific content */}
            {currentVariant === 'first-word' ? (
              <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                <p style={{ color: 'var(--color-muted-foreground)', fontSize: '0.875rem', margin: 0 }}>
                  Type the first 3 words of this ayah:
                </p>
              </div>
            ) : (
              <div className="glass-card" style={{ padding: '1rem', marginBottom: '1.5rem' }}>
                <p style={{ color: 'var(--color-muted-foreground)', fontSize: '0.875rem', marginBottom: '0.5rem', textAlign: 'center' }}>
                  Fill in the missing word:
                </p>
                <p className="font-arabic" style={{ textAlign: 'center', fontSize: '1.25rem', lineHeight: 1.6, margin: 0 }} dir="rtl">
                  {getPartialAyah()}
                </p>
              </div>
            )}

            {/* Recent mistake hint */}
            {getRecentMistake() && (
              <div className="glass-card" style={{ padding: '0.75rem', marginBottom: '1rem', textAlign: 'center' }}>
                <p style={{ color: 'var(--color-muted-foreground)', fontSize: '0.875rem', margin: 0 }}>{getRecentMistake()}</p>
              </div>
            )}

            {/* Answer Input */}
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <input
                ref={inputRef}
                type="text"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                disabled={state === 'feedback'}
                placeholder={currentVariant === 'first-word' ? 'Type the first words...' : 'Type the missing word...'}
                dir="rtl"
                className="font-arabic"
                style={{
                  width: '100%', padding: '1rem 1.5rem',
                  background: 'var(--color-card)',
                  border: '2px solid var(--color-border)',
                  borderRadius: '0.75rem',
                  color: 'var(--color-foreground)', fontSize: '1.25rem', textAlign: 'center',
                  outline: 'none', boxSizing: 'border-box',
                }}
              />

              <button
                type="submit"
                disabled={!answer.trim() || state === 'feedback'}
                className="btn-primary"
                style={{ width: '100%', padding: '0.75rem' }}
              >
                <Check size={18} />
                Submit
              </button>
            </form>

            {/* Feedback */}
            <AnimatePresence>
              {showFeedback && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  style={{
                    marginTop: '1.5rem', padding: '1.5rem', borderRadius: '0.75rem',
                    border: '1px solid',
                    background: lastCorrect ? 'rgba(34,197,94,0.15)' : 'rgba(244,63,94,0.15)',
                    borderColor: lastCorrect ? 'rgba(34,197,94,0.3)' : 'rgba(244,63,94,0.3)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                    {lastCorrect ? (
                      <>
                        <Check size={24} style={{ color: '#4ade80' }} />
                        <span style={{ color: '#4ade80', fontWeight: 500 }}>Correct! You&apos;re improving!</span>
                      </>
                    ) : (
                      <>
                        <X size={24} style={{ color: '#fb7185' }} />
                        <span style={{ color: '#fb7185', fontWeight: 500 }}>Keep practicing this one</span>
                      </>
                    )}
                  </div>

                  {/* Show correct answer */}
                  <div style={{ marginBottom: '1rem' }}>
                    <p style={{ color: 'var(--color-muted-foreground)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>Correct answer:</p>
                    <p className="font-arabic" style={{ fontSize: '1.25rem', margin: 0 }} dir="rtl">
                      {getExpectedAnswer()}
                    </p>
                  </div>

                  <button
                    onClick={handleNext}
                    className="btn-secondary"
                    style={{ width: '100%' }}
                  >
                    {currentIndex + 1 >= weakAyahs.length ? 'Finish' : 'Next Ayah'}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {/* COMPLETE State */}
        {state === 'complete' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="glass-card" style={{ padding: '2rem', textAlign: 'center', maxWidth: '28rem', margin: '0 auto' }}>
              <h2 style={{ marginBottom: '1.5rem' }}>Marathon Complete</h2>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                <div className="glass-card" style={{ padding: '1rem' }}>
                  <p style={{ color: 'var(--color-muted-foreground)', fontSize: '0.875rem', margin: 0 }}>Accuracy</p>
                  <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.875rem', margin: 0 }}>
                    {completionAccuracy}%
                  </p>
                </div>
                <div className="glass-card" style={{ padding: '1rem' }}>
                  <p style={{ color: 'var(--color-muted-foreground)', fontSize: '0.875rem', margin: 0 }}>Practiced</p>
                  <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.875rem', margin: 0 }}>{sessionResults.length}</p>
                </div>
              </div>

              {sessionResults.filter(r => r.correct).length === sessionResults.length && sessionResults.length > 0 && (
                <div style={{
                  marginBottom: '1.5rem', padding: '1rem',
                  background: 'rgba(34,197,94,0.15)', border: '1px solid rgba(34,197,94,0.3)',
                  borderRadius: '0.75rem',
                }}>
                  <p style={{ color: '#4ade80', fontWeight: 500, margin: 0 }}>Perfect run! Your weak spots are getting stronger!</p>
                </div>
              )}

              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button className="btn-primary" onClick={startGame} style={{ flex: 1 }}>
                  <RotateCcw size={18} />
                  Again
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
