// Memory Science: Generation Effect (Make It Stick)
// "Trying to produce an answer before seeing it strengthens memory"

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, X } from 'lucide-react'
import { useQuranGame, useQuranGameConfig } from '../../hooks/quran'
import { getAyah, getFirstLettersOfAyah, getFirstNLettersOfAyah, stripDiacritics } from '../../data/quran-data'
import { SURAH_DATA } from '../../data/quran-surah'
import { QuranGameShell } from '../../components/quran/QuranGameShell'

interface FirstLettersProps {
  onBack: () => void
}

export function FirstLetters({ onBack }: FirstLettersProps) {
  const { config } = useQuranGameConfig()
  const mode = config.mode
  const timedMode = config.timedMode
  const selectedRanges: import('../../types/quran').AyahRange[] = []
  const [answer, setAnswer] = useState('')
  const [showFeedback, setShowFeedback] = useState(false)
  const [lastCorrect, setLastCorrect] = useState(false)
  const [hintLetters, setHintLetters] = useState<string[]>([])
  const inputRef = useRef<HTMLTextAreaElement>(null)

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
    gameType: 'first-letters',
    mode,
    timedMode,
    selectedRanges,
  })

  // Generate hint letters based on difficulty
  useEffect(() => {
    if (state === 'playing' && currentQuestion) {
      const difficulty = getDifficultyForAyah(currentQuestion.surah, currentQuestion.ayah)
      const level = difficulty.hintLevel

      // Higher difficulty = fewer letters shown
      if (level >= 2) {
        // Easy: Show first 2 letters of each word
        setHintLetters(getFirstNLettersOfAyah(currentQuestion.surah, currentQuestion.ayah, 2))
      } else if (level === 1) {
        // Medium: Show first letter only
        setHintLetters(getFirstLettersOfAyah(currentQuestion.surah, currentQuestion.ayah))
      } else {
        // Hard: Show first letter of every other word
        const allLetters = getFirstLettersOfAyah(currentQuestion.surah, currentQuestion.ayah)
        setHintLetters(allLetters.map((letter, i) => i % 2 === 0 ? letter : '•'))
      }
    }
  }, [state, currentQuestion, getDifficultyForAyah])

  useEffect(() => {
    if (state === 'playing' && inputRef.current) {
      inputRef.current.focus()
    }
  }, [state, currentQuestion])

  const checkAnswer = (userAnswer: string): boolean => {
    if (!currentQuestion) return false

    const ayahData = getAyah(currentQuestion.surah, currentQuestion.ayah)
    if (!ayahData) return false

    // Normalize both for comparison
    const normalize = (s: string) => stripDiacritics(s).replace(/\s+/g, ' ').trim()
    const expectedText = normalize(ayahData.t)
    const answerNormalized = normalize(userAnswer)

    // Check for exact match or close match (allowing minor differences)
    if (answerNormalized === expectedText) return true

    // Check word-by-word with tolerance
    const expectedWords = expectedText.split(' ')
    const answerWords = answerNormalized.split(' ')

    if (answerWords.length < expectedWords.length * 0.7) return false

    let correctWords = 0
    for (let i = 0; i < Math.min(expectedWords.length, answerWords.length); i++) {
      if (expectedWords[i] === answerWords[i]) correctWords++
    }

    return correctWords >= expectedWords.length * 0.8
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!currentQuestion || state !== 'playing') return

    const isCorrect = checkAnswer(answer)
    setLastCorrect(isCorrect)
    setShowFeedback(true)
    submitAnswer(answer, isCorrect)
  }

  const handleNext = () => {
    setShowFeedback(false)
    setAnswer('')
    nextQuestion()
  }

  const getSurahName = (surah: number): string => {
    return SURAH_DATA[surah - 1]?.name || `Surah ${surah}`
  }

  const getFullAyah = (): string => {
    if (!currentQuestion) return ''
    const ayahData = getAyah(currentQuestion.surah, currentQuestion.ayah)
    return ayahData?.t || ''
  }

  return (
    <QuranGameShell
      title="First Letters"
      icon="✒️"
      onBack={onBack}
      state={state}
      sessionResults={sessionResults}
      perfectRun={perfectRun}
      onStart={startGame}
      onEndGame={endGame}
      description="See only the first letter of each word. Reconstruct the full ayah from memory. This forces deep retrieval, strengthening your memory pathways."
    >
      {/* PLAYING State */}
      {(state === 'playing' || state === 'feedback') && currentQuestion && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ width: '100%', maxWidth: '42rem' }}
        >
          {/* Reference Display */}
          <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1.5rem', color: 'var(--color-accent)' }}>
              {getSurahName(currentQuestion.surah)} : {currentQuestion.ayah}
            </h2>
          </div>

          {/* First Letters Hint */}
          <div className="glass-card" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-muted-foreground)', marginBottom: '0.75rem', textAlign: 'center' }}>First letters:</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.75rem' }} dir="rtl">
              {hintLetters.map((letter, i) => (
                <span
                  key={i}
                  style={{
                    width: '2.5rem',
                    height: '2.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'var(--color-secondary)',
                    borderRadius: '0.5rem',
                    fontSize: '1.25rem',
                    border: '1px solid var(--color-border)',
                  }}
                >
                  {letter}
                </span>
              ))}
            </div>
          </div>

          {/* Answer Input */}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <textarea
                ref={inputRef}
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                disabled={state === 'feedback'}
                placeholder="Type the complete ayah..."
                dir="rtl"
                rows={4}
                className="font-arabic"
                style={{
                  width: '100%',
                  padding: '1rem 1.5rem',
                  background: 'var(--color-card)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '0.75rem',
                  fontSize: '1.25rem',
                  resize: 'none',
                  outline: 'none',
                  fontFamily: 'var(--font-arabic)',
                  boxSizing: 'border-box',
                }}
              />
            </div>

            <button
              type="submit"
              disabled={!answer.trim() || state === 'feedback'}
              className="btn-primary"
              style={{ width: '100%' }}
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
                  marginTop: '1.5rem',
                  padding: '1.5rem',
                  borderRadius: '0.75rem',
                  border: '1px solid',
                  borderColor: lastCorrect ? 'rgba(34,197,94,0.4)' : 'rgba(244,63,94,0.4)',
                  background: lastCorrect ? 'rgba(34,197,94,0.1)' : 'rgba(244,63,94,0.1)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                  {lastCorrect ? (
                    <>
                      <Check size={24} style={{ color: '#4ade80' }} />
                      <span style={{ color: '#4ade80', fontWeight: 500 }}>Excellent recall!</span>
                    </>
                  ) : (
                    <>
                      <X size={24} style={{ color: '#fb7185' }} />
                      <span style={{ color: '#fb7185', fontWeight: 500 }}>Keep practicing</span>
                    </>
                  )}
                </div>

                {/* Show correct answer */}
                <div style={{ marginBottom: '1rem' }}>
                  <p style={{ fontSize: '0.875rem', color: 'var(--color-muted-foreground)', marginBottom: '0.5rem' }}>The complete ayah:</p>
                  <p className="font-arabic" style={{ fontSize: '1.125rem', lineHeight: 1.8 }} dir="rtl">
                    {getFullAyah()}
                  </p>
                </div>

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
        </motion.div>
      )}
    </QuranGameShell>
  )
}
