import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, X } from 'lucide-react'
import { useQuranGame, useQuranDataLoader } from '../../hooks/quran'
import { getAyah } from '../../data/quran-data'
import { SURAH_DATA } from '../../data/quran-surah'
import { QuranGameShell } from '../../components/quran/QuranGameShell'
import type { QuranGameMode, AyahRange } from '../../types/quran'

interface ChainReactionProps {
  onBack: () => void
  mode?: QuranGameMode
  timedMode?: boolean
  selectedRanges?: AyahRange[]
}

export function ChainReaction({ onBack, mode = 'practice-any', timedMode = false, selectedRanges = [] }: ChainReactionProps) {
  const { loading, error, isReady } = useQuranDataLoader()
  const [answer, setAnswer] = useState('')
  const [showFeedback, setShowFeedback] = useState(false)
  const [lastCorrect, setLastCorrect] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

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
    gameType: 'chain-reaction',
    mode,
    timedMode,
    selectedRanges,
  })

  useEffect(() => {
    if (state === 'playing' && inputRef.current) {
      inputRef.current.focus()
    }
  }, [state, currentQuestion])

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

  const getNextAyahInfo = () => {
    if (!currentQuestion) return null

    const { surah, ayah } = currentQuestion
    const surahData = SURAH_DATA[surah - 1]
    if (!surahData) return null

    // Check if there's a next ayah in same surah
    if (ayah < surahData.ayahCount) {
      return { surah, ayah: ayah + 1 }
    }

    // Move to next surah if not at end of Juz 1-5 (surah 5)
    if (surah < 5) {
      return { surah: surah + 1, ayah: 1 }
    }

    return null
  }

  const getWordsRequired = (): number => {
    if (!currentQuestion) return 3
    const difficulty = getDifficultyForAyah(currentQuestion.surah, currentQuestion.ayah)
    return difficulty.wordsRequired
  }

  const normalize = (s: string) => s.replace(/[ً-ٰٟ]/g, '').trim()

  const checkAnswer = (userAnswer: string): boolean => {
    const nextAyah = getNextAyahInfo()
    if (!nextAyah) return false

    const ayahData = getAyah(nextAyah.surah, nextAyah.ayah)
    if (!ayahData) return false

    const wordsRequired = getWordsRequired()
    const expectedWords = ayahData.w.slice(0, wordsRequired)

    const expectedNormalized = expectedWords.map(normalize).join(' ')
    const answerNormalized = normalize(userAnswer)

    return answerNormalized === expectedNormalized ||
           expectedNormalized.startsWith(answerNormalized)
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

  const getExpectedWords = (): string => {
    const nextAyah = getNextAyahInfo()
    if (!nextAyah) return ''
    const ayahData = getAyah(nextAyah.surah, nextAyah.ayah)
    if (!ayahData) return ''
    return ayahData.w.slice(0, getWordsRequired()).join(' ')
  }

  const getNextReference = (): string => {
    const nextAyah = getNextAyahInfo()
    if (!nextAyah) return ''
    return `${getSurahName(nextAyah.surah)} : ${nextAyah.ayah}`
  }

  return (
    <QuranGameShell
      title="Chain Reaction"
      icon="🔗"
      onBack={onBack}
      state={showFeedback ? 'feedback' : state}
      sessionResults={sessionResults}
      perfectRun={perfectRun}
      onStart={startGame}
      onEndGame={endGame}
      description="See an ayah and type the first words of the NEXT ayah. Build your ayah-to-ayah chain memory!"
    >
      {currentQuestion && (
        <div style={{ width: '100%', maxWidth: '32rem', margin: '0 auto' }}>
          {/* Current Ayah Display */}
          <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
            <p style={{ color: 'var(--color-muted-foreground)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>Current Ayah:</p>
            <h2 style={{ fontSize: '1.25rem', color: 'var(--color-accent)', marginBottom: '0.5rem' }}>
              {getSurahName(currentQuestion.surah)} : {currentQuestion.ayah}
            </h2>
          </div>

          {/* Show current ayah text */}
          <div className="glass-card" style={{ padding: '1rem', marginBottom: '1.5rem' }}>
            <p className="font-arabic" style={{ fontSize: '1.25rem', textAlign: 'center', lineHeight: 1.8 }} dir="rtl">
              {getCurrentAyahText()}
            </p>
          </div>

          {/* Question */}
          <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
            <p>
              What are the first {getWordsRequired()} words of the <span style={{ color: 'var(--color-accent)' }}>next ayah</span>?
            </p>
            <p style={{ color: 'var(--color-muted-foreground)', fontSize: '0.875rem' }}>({getNextReference()})</p>
          </div>

          {/* Answer Input */}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <input
              ref={inputRef}
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              disabled={showFeedback}
              placeholder="Type the first words of the next ayah..."
              dir="rtl"
              className="font-arabic"
              style={{
                width: '100%',
                padding: '1rem 1.5rem',
                background: 'var(--color-card)',
                border: '1px solid var(--color-border)',
                borderRadius: '12px',
                fontSize: '1.25rem',
                textAlign: 'center',
                outline: 'none',
                color: 'var(--color-foreground)',
                boxSizing: 'border-box',
              }}
            />

            <button
              type="submit"
              disabled={!answer.trim() || showFeedback}
              className="btn-primary"
              style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
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

                {/* Show correct answer */}
                <div style={{ marginBottom: '1rem' }}>
                  <p style={{ color: 'var(--color-muted-foreground)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                    {getNextReference()} begins:
                  </p>
                  <p className="font-arabic" style={{ fontSize: '1.25rem' }} dir="rtl">
                    {getExpectedWords()}
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
        </div>
      )}
    </QuranGameShell>
  )
}
