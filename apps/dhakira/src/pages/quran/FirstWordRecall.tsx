import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Volume2, Check, X } from 'lucide-react'
import { useQuranGame, useQuranDataLoader } from '../../hooks/quran'
import { getAyah } from '../../data/quran-data'
import { SURAH_DATA } from '../../data/quran-surah'
import { getAudioUrl, getReciterById } from '../../data/reciters'
import { QuranGameShell } from '../../components/quran/QuranGameShell'
import type { QuranGameMode, AyahRange } from '../../types/quran'

interface FirstWordRecallProps {
  onBack: () => void
  mode?: QuranGameMode
  timedMode?: boolean
  selectedRanges?: AyahRange[]
}

export function FirstWordRecall({ onBack, mode = 'practice-any', timedMode = false, selectedRanges = [] }: FirstWordRecallProps) {
  const { loading, error, isReady } = useQuranDataLoader()
  const [answer, setAnswer] = useState('')
  const [showFeedback, setShowFeedback] = useState(false)
  const [lastCorrect, setLastCorrect] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const audioRef = useRef<HTMLAudioElement>(null)

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
    gameType: 'first-word',
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

  const getWordsRequired = (): number => {
    if (!currentQuestion) return 3
    const difficulty = getDifficultyForAyah(currentQuestion.surah, currentQuestion.ayah)
    return difficulty.wordsRequired
  }

  const checkAnswer = (userAnswer: string): boolean => {
    if (!currentQuestion) return false

    const ayahData = getAyah(currentQuestion.surah, currentQuestion.ayah)
    if (!ayahData) return false

    const wordsRequired = getWordsRequired()
    const expectedWords = ayahData.w.slice(0, wordsRequired)

    const normalize = (s: string) => s.replace(/[ً-ٰٟ]/g, '').trim()
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

  const playAudioHint = () => {
    if (!currentQuestion || !audioRef.current) return

    const reciter = getReciterById('mishary')
    if (!reciter) return

    const url = getAudioUrl(reciter.folder, currentQuestion.surah, currentQuestion.ayah)
    audioRef.current.src = url
    audioRef.current.play()
  }

  const getSurahName = (surah: number): string => {
    return SURAH_DATA[surah - 1]?.name || `Surah ${surah}`
  }

  const getExpectedWords = (): string => {
    if (!currentQuestion) return ''
    const ayahData = getAyah(currentQuestion.surah, currentQuestion.ayah)
    if (!ayahData) return ''
    return ayahData.w.slice(0, getWordsRequired()).join(' ')
  }

  return (
    <QuranGameShell
      title="First Word Recall"
      icon="🔤"
      onBack={onBack}
      state={showFeedback ? 'feedback' : state}
      sessionResults={sessionResults}
      perfectRun={perfectRun}
      onStart={startGame}
      onEndGame={endGame}
      description="See an ayah reference and type the first words from memory. Build your reference-to-text anchors!"
    >
      <audio ref={audioRef} />

      {currentQuestion && (
        <div style={{ width: '100%', maxWidth: '32rem', margin: '0 auto' }}>
          {/* Reference Display */}
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <p style={{ color: 'var(--color-muted-foreground)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
              What are the first {getWordsRequired()} words of:
            </p>
            <h2 style={{ fontSize: '2rem', color: 'var(--color-accent)' }}>
              {getSurahName(currentQuestion.surah)} : {currentQuestion.ayah}
            </h2>
          </div>

          {/* Answer Input */}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <input
              ref={inputRef}
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              disabled={showFeedback}
              placeholder="Type the first words..."
              dir="rtl"
              className="font-arabic"
              style={{
                width: '100%',
                padding: '1rem 1.5rem',
                background: 'var(--color-card)',
                border: '1px solid var(--color-border)',
                borderRadius: '12px',
                fontSize: '1.5rem',
                textAlign: 'center',
                outline: 'none',
                color: 'var(--color-foreground)',
                boxSizing: 'border-box',
              }}
            />

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button
                type="button"
                onClick={playAudioHint}
                className="btn-secondary"
                style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
              >
                <Volume2 size={18} />
                Audio Hint
              </button>
              <button
                type="submit"
                disabled={!answer.trim() || showFeedback}
                className="btn-primary"
                style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
              >
                <Check size={18} />
                Submit
              </button>
            </div>
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

                <div style={{ marginBottom: '1rem' }}>
                  <p style={{ color: 'var(--color-muted-foreground)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>The ayah begins:</p>
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
