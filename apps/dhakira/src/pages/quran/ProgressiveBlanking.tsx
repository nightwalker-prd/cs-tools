// Memory Science: Desirable Difficulties (Make It Stick)
// "Making learning conditions harder (within reason) enhances long-term retention"

import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, X } from 'lucide-react'
import { useAyahMastery, useQuranGameConfig } from '../../hooks/quran'
import { getAyah, stripDiacritics } from '../../data/quran-data'
import { SURAH_DATA } from '../../data/quran-surah'
import { QuranGameShell } from '../../components/quran/QuranGameShell'
import type { AyahRange } from '../../types/quran'

interface ProgressiveBlankingProps {
  onBack: () => void
}

interface BlankSlot {
  index: number
  word: string
  userInput: string
}

const DEFAULT_RANGES: AyahRange[] = [
  { surah: 1, startAyah: 1, endAyah: 7 },
  { surah: 2, startAyah: 1, endAyah: 286 },
  { surah: 3, startAyah: 1, endAyah: 200 },
  { surah: 4, startAyah: 1, endAyah: 176 },
  { surah: 5, startAyah: 1, endAyah: 120 },
]

export function ProgressiveBlanking({ onBack }: ProgressiveBlankingProps) {
  const { config } = useQuranGameConfig()
  const mode = config.mode
  const selectedRanges: AyahRange[] = []
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'feedback' | 'complete'>('idle')
  const [currentAyah, setCurrentAyah] = useState<{ surah: number; ayah: number } | null>(null)
  const [words, setWords] = useState<string[]>([])
  const [blanks, setBlanks] = useState<BlankSlot[]>([])
  const [round, setRound] = useState(0)
  const [maxRound, setMaxRound] = useState(0)
  const [showFeedback, setShowFeedback] = useState(false)
  const [roundCorrect, setRoundCorrect] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const [, setTotalScore] = useState(0)
  const [sessionResults, setSessionResults] = useState<{ correct: boolean }[]>([])
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  const { recordAttempt, getWeakAyahs } = useAyahMastery()

  const ranges = selectedRanges.length > 0 ? selectedRanges : DEFAULT_RANGES

  const getRandomAyah = useCallback(() => {
    if (mode === 'my-progress') {
      const weakAyahs = getWeakAyahs(50)
      if (weakAyahs.length > 0) {
        const random = weakAyahs[Math.floor(Math.random() * weakAyahs.length)]
        return { surah: random.surah, ayah: random.ayah }
      }
    }

    // Random from ranges
    const totalAyahs = ranges.reduce((sum, r) => sum + (r.endAyah - r.startAyah + 1), 0)
    let randomIndex = Math.floor(Math.random() * totalAyahs)

    for (const range of ranges) {
      const rangeSize = range.endAyah - range.startAyah + 1
      if (randomIndex < rangeSize) {
        return { surah: range.surah, ayah: range.startAyah + randomIndex }
      }
      randomIndex -= rangeSize
    }

    return { surah: 1, ayah: 1 }
  }, [mode, ranges, getWeakAyahs])

  const startGame = () => {
    const ayahRef = getRandomAyah()
    const ayahData = getAyah(ayahRef.surah, ayahRef.ayah)

    if (!ayahData) return

    setCurrentAyah(ayahRef)
    setWords(ayahData.w)
    setRound(1)
    setMaxRound(0)
    setTotalScore(0)
    setGameOver(false)
    setSessionResults([])
    setGameState('playing')

    // Start with 1 blank
    const randomIndex = Math.floor(Math.random() * ayahData.w.length)
    setBlanks([{ index: randomIndex, word: ayahData.w[randomIndex], userInput: '' }])
  }

  const advanceRound = () => {
    if (!currentAyah || words.length === 0) return

    const newRound = round + 1

    // Check if all words are blanked
    if (newRound > words.length) {
      // Perfect completion!
      setGameOver(true)
      setMaxRound(round)
      setTotalScore(prev => prev + round * 10) // Bonus for completing
      recordAttempt(currentAyah.surah, currentAyah.ayah, true, 0, 'progressive-blanking')
      setSessionResults(prev => [...prev, { correct: true }])
      setGameState('complete')
      return
    }

    setRound(newRound)

    // Add one more blank (not already blanked)
    const blankedIndices = new Set(blanks.map(b => b.index))
    const availableIndices = words
      .map((_, i) => i)
      .filter(i => !blankedIndices.has(i))

    if (availableIndices.length > 0) {
      const newBlankIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)]
      setBlanks(prev => [
        ...prev.map(b => ({ ...b, userInput: '' })), // Clear previous inputs
        { index: newBlankIndex, word: words[newBlankIndex], userInput: '' }
      ])
    }

    setShowFeedback(false)
  }

  const checkAnswers = (): boolean => {
    const normalize = (s: string) => stripDiacritics(s).trim()

    for (const blank of blanks) {
      if (normalize(blank.userInput) !== normalize(blank.word)) {
        return false
      }
    }
    return true
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (gameState !== 'playing') return

    const isCorrect = checkAnswers()
    setRoundCorrect(isCorrect)
    setShowFeedback(true)

    if (isCorrect) {
      setMaxRound(round)
      setTotalScore(prev => prev + round)
    } else {
      // Game over on wrong answer
      setGameOver(true)
      if (currentAyah) {
        recordAttempt(currentAyah.surah, currentAyah.ayah, false, 0, 'progressive-blanking')
      }
      setSessionResults(prev => [...prev, { correct: false }])
    }
  }

  const handleNext = () => {
    if (gameOver) {
      setGameState('complete')
    } else {
      advanceRound()
    }
  }

  const handleInputChange = (blankIndex: number, value: string) => {
    setBlanks(prev => prev.map((b, i) =>
      i === blankIndex ? { ...b, userInput: value } : b
    ))
  }

  useEffect(() => {
    if (gameState === 'playing' && inputRefs.current[0]) {
      inputRefs.current[0]?.focus()
    }
  }, [gameState, round])

  const getSurahName = (surah: number): string => {
    return SURAH_DATA[surah - 1]?.name || `Surah ${surah}`
  }

  const renderAyahWithBlanks = () => {
    const blankedIndices = new Set(blanks.map(b => b.index))

    return (
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.5rem', fontSize: '1.25rem' }} dir="rtl">
        {words.map((word, index) => {
          if (blankedIndices.has(index)) {
            const blankData = blanks.find(b => b.index === index)
            const blankArrayIndex = blanks.findIndex(b => b.index === index)

            return (
              <input
                key={index}
                ref={el => { inputRefs.current[blankArrayIndex] = el }}
                type="text"
                value={blankData?.userInput || ''}
                onChange={(e) => handleInputChange(blankArrayIndex, e.target.value)}
                disabled={showFeedback}
                placeholder="___"
                dir="rtl"
                className="font-arabic"
                style={{
                  width: '6rem',
                  padding: '0.25rem 0.5rem',
                  background: 'var(--color-secondary)',
                  border: '1px solid var(--color-accent)',
                  borderRadius: '0.25rem',
                  textAlign: 'center',
                  outline: 'none',
                  fontFamily: 'var(--font-arabic)',
                  fontSize: '1rem',
                }}
              />
            )
          }

          return (
            <span key={index} className="font-arabic">
              {word}
            </span>
          )
        })}
      </div>
    )
  }

  // Map to QuranGameShell states
  const shellState = gameState === 'feedback' ? 'playing' as const : gameState

  return (
    <QuranGameShell
      title="Progressive Blanking"
      icon="🚫"
      onBack={onBack}
      state={shellState}
      sessionResults={sessionResults}
      perfectRun={maxRound}
      onStart={startGame}
      onEndGame={() => setGameState('idle')}
      description="Start with one blank, then progressively more words disappear each round. How far can you go before failing? Builds confidence under pressure."
    >
      {/* PLAYING State */}
      {(gameState === 'playing' || gameState === 'feedback') && currentAyah && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ width: '100%', maxWidth: '42rem' }}
        >
          {/* Reference Display */}
          <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
            <h2 style={{ fontSize: '1.25rem', color: 'var(--color-accent)' }}>
              {getSurahName(currentAyah.surah)} : {currentAyah.ayah}
            </h2>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-muted-foreground)', marginTop: '0.25rem' }}>
              Round {round} - Fill in {blanks.length} blank{blanks.length > 1 ? 's' : ''}
            </p>
          </div>

          {/* Progress Bar */}
          <div className="progress-bar" style={{ marginBottom: '1.5rem' }}>
            <div
              className="progress-bar-fill"
              style={{ width: `${(round / words.length) * 100}%`, background: 'var(--color-accent)' }}
            />
          </div>

          {/* Ayah with Blanks */}
          <div className="glass-card" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
            {renderAyahWithBlanks()}
          </div>

          {/* Submit Button */}
          {!showFeedback && (
            <form onSubmit={handleSubmit}>
              <button
                type="submit"
                disabled={blanks.some(b => !b.userInput.trim())}
                className="btn-primary"
                style={{ width: '100%' }}
              >
                <Check size={18} />
                Submit Round {round}
              </button>
            </form>
          )}

          {/* Feedback */}
          <AnimatePresence>
            {showFeedback && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                style={{
                  padding: '1.5rem',
                  borderRadius: '0.75rem',
                  border: '1px solid',
                  borderColor: roundCorrect ? 'rgba(34,197,94,0.4)' : 'rgba(244,63,94,0.4)',
                  background: roundCorrect ? 'rgba(34,197,94,0.1)' : 'rgba(244,63,94,0.1)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                  {roundCorrect ? (
                    <>
                      <Check size={24} style={{ color: '#4ade80' }} />
                      <span style={{ color: '#4ade80', fontWeight: 500 }}>
                        {gameOver ? 'Perfect! All words completed!' : `Round ${round} complete!`}
                      </span>
                    </>
                  ) : (
                    <>
                      <X size={24} style={{ color: '#fb7185' }} />
                      <span style={{ color: '#fb7185', fontWeight: 500 }}>Game Over - Round {round}</span>
                    </>
                  )}
                </div>

                {!roundCorrect && (
                  <div style={{ marginBottom: '1rem' }}>
                    <p style={{ fontSize: '0.875rem', color: 'var(--color-muted-foreground)', marginBottom: '0.5rem' }}>The correct answers were:</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                      {blanks.map((blank, i) => (
                        <span key={i} className="font-arabic" style={{
                          padding: '0.25rem 0.75rem',
                          background: 'var(--color-secondary)',
                          borderRadius: '0.25rem',
                          border: '1px solid var(--color-border)',
                        }} dir="rtl">
                          {blank.word}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <button
                  onClick={handleNext}
                  className="btn-secondary"
                  style={{ width: '100%' }}
                >
                  {gameOver ? 'See Results' : 'Next Round'}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </QuranGameShell>
  )
}
