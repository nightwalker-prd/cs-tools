// Memory Science: Contextual/Sequential Retrieval (Make It Stick + Kandel)
// "Memory is context-dependent. Strengthening sequential connections improves recall"

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, X } from 'lucide-react'
import { useQuranGame, useQuranGameConfig } from '../../hooks/quran'
import { getAyah, getAdjacentAyah, stripDiacritics } from '../../data/quran-data'
import { SURAH_DATA } from '../../data/quran-surah'
import { QuranGameShell } from '../../components/quran/QuranGameShell'

interface BeforeAfterProps {
  onBack: () => void
}

type Direction = 'before' | 'after'

export function BeforeAfter({ onBack }: BeforeAfterProps) {
  const { config } = useQuranGameConfig()
  const mode = config.mode
  const timedMode = config.timedMode
  const selectedRanges: import('../../types/quran').AyahRange[] = []
  const [answer, setAnswer] = useState('')
  const [showFeedback, setShowFeedback] = useState(false)
  const [lastCorrect, setLastCorrect] = useState(false)
  const [direction, setDirection] = useState<Direction>('after')
  const [wordsRequired, setWordsRequired] = useState(3)
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
    gameType: 'before-after',
    mode,
    timedMode,
    selectedRanges,
  })

  // Set random direction and words required when question changes
  useEffect(() => {
    if (state === 'playing' && currentQuestion) {
      // Random direction
      setDirection(Math.random() > 0.5 ? 'before' : 'after')

      // Words required based on difficulty
      const difficulty = getDifficultyForAyah(currentQuestion.surah, currentQuestion.ayah)
      if (difficulty.hintLevel >= 2) {
        setWordsRequired(1) // Easy: first word only
      } else if (difficulty.hintLevel === 1) {
        setWordsRequired(3) // Medium: first 3 words
      } else {
        setWordsRequired(0) // Hard: complete ayah (0 = all)
      }
    }
  }, [state, currentQuestion, getDifficultyForAyah])

  useEffect(() => {
    if (state === 'playing' && inputRef.current) {
      inputRef.current.focus()
    }
  }, [state, currentQuestion])

  const getAdjacentAyahData = () => {
    if (!currentQuestion) return null
    return getAdjacentAyah(currentQuestion.surah, currentQuestion.ayah, direction)
  }

  const checkAnswer = (userAnswer: string): boolean => {
    const adjacent = getAdjacentAyahData()
    if (!adjacent) return false

    const normalize = (s: string) => stripDiacritics(s).replace(/\s+/g, ' ').trim()

    if (wordsRequired === 0) {
      // Full ayah required
      const expectedText = normalize(adjacent.t)
      const answerNormalized = normalize(userAnswer)

      // Check word-by-word with tolerance
      const expectedWords = expectedText.split(' ')
      const answerWords = answerNormalized.split(' ')

      if (answerWords.length < expectedWords.length * 0.7) return false

      let correctWords = 0
      for (let i = 0; i < Math.min(expectedWords.length, answerWords.length); i++) {
        if (expectedWords[i] === answerWords[i]) correctWords++
      }

      return correctWords >= expectedWords.length * 0.8
    } else {
      // Only N words required
      const expectedWords = adjacent.w.slice(0, wordsRequired)
      const expectedNormalized = expectedWords.map(w => normalize(w)).join(' ')
      const answerNormalized = normalize(userAnswer)

      return answerNormalized === expectedNormalized ||
             expectedNormalized.startsWith(answerNormalized) ||
             answerNormalized.includes(expectedNormalized)
    }
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

  const getCurrentAyahText = (): string => {
    if (!currentQuestion) return ''
    const ayahData = getAyah(currentQuestion.surah, currentQuestion.ayah)
    return ayahData?.t || ''
  }

  const getExpectedAnswer = (): string => {
    const adjacent = getAdjacentAyahData()
    if (!adjacent) return ''

    if (wordsRequired === 0) {
      return adjacent.t
    }
    return adjacent.w.slice(0, wordsRequired).join(' ')
  }

  const getAdjacentReference = (): string => {
    const adjacent = getAdjacentAyahData()
    if (!adjacent) return ''
    return `${getSurahName(adjacent.s)} : ${adjacent.a}`
  }

  return (
    <QuranGameShell
      title="Before & After"
      icon="↔️"
      onBack={onBack}
      state={state}
      sessionResults={sessionResults}
      perfectRun={perfectRun}
      onStart={startGame}
      onEndGame={endGame}
      description="Given an ayah, recall what comes before or after it. Most people only memorize forwards - this strengthens bidirectional recall."
    >
      {/* PLAYING State */}
      {(state === 'playing' || state === 'feedback') && currentQuestion && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ width: '100%', maxWidth: '42rem' }}
        >
          {/* Reference Display */}
          <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
            <h2 style={{ fontSize: '1.25rem', color: 'var(--color-accent)' }}>
              {getSurahName(currentQuestion.surah)} : {currentQuestion.ayah}
            </h2>
          </div>

          {/* Current Ayah Display */}
          <div className="glass-card" style={{ padding: '1.5rem', marginBottom: '1rem' }}>
            <p className="font-arabic" style={{ fontSize: '1.25rem', lineHeight: 1.8, textAlign: 'center' }} dir="rtl">
              {getCurrentAyahText()}
            </p>
          </div>

          {/* Direction Prompt */}
          <div style={{
            padding: '1rem',
            borderRadius: '0.75rem',
            marginBottom: '1rem',
            textAlign: 'center',
            border: '1px solid',
            borderColor: direction === 'before' ? 'rgba(245,158,11,0.4)' : 'rgba(56,189,248,0.4)',
            background: direction === 'before' ? 'rgba(245,158,11,0.1)' : 'rgba(56,189,248,0.1)',
          }}>
            <p style={{
              fontWeight: 500,
              color: direction === 'before' ? '#f59e0b' : '#38bdf8',
            }}>
              What comes {direction === 'before' ? 'BEFORE' : 'AFTER'} this ayah?
              {wordsRequired > 0 && ` (First ${wordsRequired} word${wordsRequired > 1 ? 's' : ''})`}
            </p>
          </div>

          {/* Answer Input */}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <textarea
                ref={inputRef}
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                disabled={state === 'feedback'}
                placeholder={`Type what comes ${direction}...`}
                dir="rtl"
                rows={3}
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
                      <span style={{ color: '#4ade80', fontWeight: 500 }}>Correct!</span>
                    </>
                  ) : (
                    <>
                      <X size={24} style={{ color: '#fb7185' }} />
                      <span style={{ color: '#fb7185', fontWeight: 500 }}>Not quite</span>
                    </>
                  )}
                </div>

                {/* Show correct answer */}
                <div style={{ marginBottom: '1rem' }}>
                  <p style={{ fontSize: '0.875rem', color: 'var(--color-muted-foreground)', marginBottom: '0.5rem' }}>
                    The {direction === 'before' ? 'preceding' : 'following'} ayah ({getAdjacentReference()}):
                  </p>
                  <p className="font-arabic" style={{ fontSize: '1.125rem', lineHeight: 1.8 }} dir="rtl">
                    {getExpectedAnswer()}
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
