import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, X } from 'lucide-react'
import { useQuranGame, useQuranDataLoader } from '../../hooks/quran'
import { getAyah } from '../../data/quran-data'
import { SURAH_DATA } from '../../data/quran-surah'
import { QuranGameShell } from '../../components/quran/QuranGameShell'
import type { QuranGameMode, AyahRange } from '../../types/quran'

interface CompleteTheAyahProps {
  onBack: () => void
  mode?: QuranGameMode
  timedMode?: boolean
  selectedRanges?: AyahRange[]
}

interface BlankWord {
  index: number
  word: string
  userInput: string
}

export function CompleteTheAyah({ onBack, mode = 'practice-any', timedMode = false, selectedRanges = [] }: CompleteTheAyahProps) {
  const { loading, error, isReady } = useQuranDataLoader()
  const [blanks, setBlanks] = useState<BlankWord[]>([])
  const [showFeedback, setShowFeedback] = useState(false)
  const [lastCorrect, setLastCorrect] = useState(false)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  const {
    state,
    currentQuestion,
    sessionResults,
    perfectRun,
    startGame,
    submitAnswer,
    nextQuestion,
    endGame,
    getDifficultyForAyah,
  } = useQuranGame({
    gameType: 'complete-ayah',
    mode,
    timedMode,
    selectedRanges,
  })

  // Generate blanks when question changes
  useEffect(() => {
    if (state === 'playing' && currentQuestion) {
      const ayahData = getAyah(currentQuestion.surah, currentQuestion.ayah)
      if (ayahData) {
        const words = ayahData.w
        const difficulty = getDifficultyForAyah(currentQuestion.surah, currentQuestion.ayah)
        const blanksPercent = difficulty.blanksPercent || 0.3

        const numBlanks = Math.max(1, Math.floor(words.length * blanksPercent))

        // Fisher-Yates shuffle to select random indices
        const indices = Array.from({ length: words.length }, (_, i) => i)
        for (let i = indices.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1))
          ;[indices[i], indices[j]] = [indices[j], indices[i]]
        }

        const selectedIndices = indices.slice(0, numBlanks).sort((a, b) => a - b)
        const newBlanks = selectedIndices.map(idx => ({
          index: idx,
          word: words[idx],
          userInput: '',
        }))

        setBlanks(newBlanks)
        inputRefs.current = new Array(newBlanks.length).fill(null)
      }
    }
  }, [state, currentQuestion, getDifficultyForAyah])

  // Focus first input when playing
  useEffect(() => {
    if (state === 'playing' && inputRefs.current[0]) {
      inputRefs.current[0]?.focus()
    }
  }, [state, blanks])

  if (loading) {
    return (
      <div className="game-page">
        <div className="glass-card" style={{ padding: '2rem', textAlign: 'center', margin: '2rem auto' }}>
          Loading Quran data...
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="game-page">
        <div className="glass-card" style={{ padding: '2rem', textAlign: 'center', margin: '2rem auto', color: 'var(--color-destructive)' }}>
          {error}
        </div>
      </div>
    )
  }

  if (!isReady) return null

  const handleInputChange = (blankIndex: number, value: string) => {
    setBlanks(prev =>
      prev.map((b, i) => (i === blankIndex ? { ...b, userInput: value } : b))
    )
  }

  const handleKeyDown = (e: React.KeyboardEvent, blankIndex: number) => {
    if (e.key === 'Enter') {
      if (blankIndex < blanks.length - 1) {
        inputRefs.current[blankIndex + 1]?.focus()
      } else {
        handleSubmit()
      }
    }
  }

  const normalize = (s: string) => s.replace(/[ً-ٰٟ]/g, '').trim()

  const checkAnswers = (): boolean => {
    return blanks.every(blank => {
      const expected = normalize(blank.word)
      const given = normalize(blank.userInput)
      return expected === given
    })
  }

  const handleSubmit = () => {
    if (!currentQuestion || state !== 'playing') return

    const isCorrect = checkAnswers()
    setLastCorrect(isCorrect)
    setShowFeedback(true)

    const userAnswer = blanks.map(b => b.userInput).join(' ')
    submitAnswer(userAnswer, isCorrect)
  }

  const handleNext = () => {
    setShowFeedback(false)
    setBlanks([])
    nextQuestion()
  }

  const getSurahName = (surah: number): string => {
    return SURAH_DATA[surah - 1]?.name || `Surah ${surah}`
  }

  const renderAyahWithBlanks = () => {
    if (!currentQuestion) return null
    const ayahData = getAyah(currentQuestion.surah, currentQuestion.ayah)
    if (!ayahData) return null

    const words = ayahData.w
    const blankIndices = new Set(blanks.map(b => b.index))

    return (
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center', alignItems: 'center', fontSize: '1.5rem' }} dir="rtl">
        {words.map((word, idx) => {
          if (blankIndices.has(idx)) {
            const blankIndex = blanks.findIndex(b => b.index === idx)
            return (
              <input
                key={idx}
                ref={el => { inputRefs.current[blankIndex] = el }}
                type="text"
                value={blanks[blankIndex]?.userInput || ''}
                onChange={e => handleInputChange(blankIndex, e.target.value)}
                onKeyDown={e => handleKeyDown(e, blankIndex)}
                disabled={showFeedback}
                className="font-arabic"
                style={{
                  width: '6rem',
                  padding: '0.25rem 0.5rem',
                  background: 'var(--color-secondary)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '6px',
                  textAlign: 'center',
                  outline: 'none',
                  fontSize: 'inherit',
                  color: 'var(--color-foreground)',
                }}
                dir="rtl"
              />
            )
          }
          return (
            <span key={idx} className="font-arabic">
              {word}
            </span>
          )
        })}
      </div>
    )
  }

  const allFilled = blanks.every(b => b.userInput.trim() !== '')

  return (
    <QuranGameShell
      title="Complete the Ayah"
      icon="📝"
      onBack={onBack}
      state={showFeedback ? 'feedback' : state}
      sessionResults={sessionResults}
      perfectRun={perfectRun}
      onStart={startGame}
      onEndGame={endGame}
      description="Fill in the missing words to complete each ayah. Test your detailed recall!"
    >
      {currentQuestion && (
        <div style={{ width: '100%', maxWidth: '42rem', margin: '0 auto' }}>
          {/* Reference Display */}
          <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1.5rem', color: 'var(--color-accent)' }}>
              {getSurahName(currentQuestion.surah)} : {currentQuestion.ayah}
            </h2>
            <p style={{ color: 'var(--color-muted-foreground)', fontSize: '0.875rem', marginTop: '0.5rem' }}>
              Fill in the {blanks.length} missing word{blanks.length !== 1 ? 's' : ''}
            </p>
          </div>

          {/* Ayah with blanks */}
          <div className="glass-card" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
            {renderAyahWithBlanks()}
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={!allFilled || showFeedback}
            className="btn-primary"
            style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
          >
            <Check size={18} />
            Submit
          </button>

          {/* Feedback */}
          <AnimatePresence>
            {showFeedback && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="glass-card"
                style={{
                  marginTop: '1.5rem',
                  padding: '1.5rem',
                  background: lastCorrect ? 'rgba(34,197,94,0.1)' : 'rgba(244,63,94,0.1)',
                  border: lastCorrect ? '1px solid rgba(34,197,94,0.3)' : '1px solid rgba(244,63,94,0.3)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                  {lastCorrect ? (
                    <>
                      <Check size={24} style={{ color: '#4ade80' }} />
                      <span style={{ color: '#4ade80', fontWeight: 500 }}>Correct!</span>
                    </>
                  ) : (
                    <>
                      <X size={24} style={{ color: '#fb7185' }} />
                      <span style={{ color: '#fb7185', fontWeight: 500 }}>Not quite</span>
                    </>
                  )}
                </div>

                {/* Show correct answers */}
                {!lastCorrect && (
                  <div style={{ marginBottom: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <p style={{ color: 'var(--color-muted-foreground)', fontSize: '0.875rem' }}>Correct words:</p>
                    {blanks.map((blank, idx) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}>
                        <span style={{ color: 'var(--color-muted-foreground)' }}>#{idx + 1}:</span>
                        <span className="font-arabic" dir="rtl">{blank.word}</span>
                        {normalize(blank.word) !== normalize(blank.userInput) && (
                          <span style={{ color: '#fb7185' }} dir="rtl">
                            (you wrote: {blank.userInput || '—'})
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                <button
                  onClick={handleNext}
                  className="btn-secondary"
                  style={{ width: '100%' }}
                >
                  Next Question
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </QuranGameShell>
  )
}
