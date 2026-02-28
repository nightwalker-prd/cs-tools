import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, X, Volume2 } from 'lucide-react'
import { useQuranGame, useQuranGameConfig } from '../../hooks/quran'
import { getAyah, getLastWords } from '../../data/quran-data'
import { SURAH_DATA } from '../../data/quran-surah'
import { getAudioUrl, getReciterById } from '../../data/reciters'
import { QuranGameShell } from '../../components/quran/QuranGameShell'

interface LastWordsProps {
  onBack: () => void
}

export function LastWords({ onBack }: LastWordsProps) {
  const [answer, setAnswer] = useState('')
  const [showFeedback, setShowFeedback] = useState(false)
  const [lastCorrect, setLastCorrect] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const audioRef = useRef<HTMLAudioElement>(null)

  const { config } = useQuranGameConfig()

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
    gameType: 'last-words',
    mode: config.mode,
    timedMode: config.timedMode,
  })

  useEffect(() => {
    if (state === 'playing' && inputRef.current) {
      inputRef.current.focus()
    }
  }, [state, currentQuestion])

  const getWordsRequired = (): number => {
    if (!currentQuestion) return 3
    const difficulty = getDifficultyForAyah(currentQuestion.surah, currentQuestion.ayah)
    return difficulty.wordsRequired
  }

  const normalize = (s: string) => s.replace(/[ً-ٰٟ]/g, '').trim()

  const checkAnswer = (userAnswer: string): boolean => {
    if (!currentQuestion) return false

    const wordsRequired = getWordsRequired()
    const expectedWords = getLastWords(currentQuestion.surah, currentQuestion.ayah, wordsRequired)
    if (expectedWords.length === 0) return false

    const expectedNormalized = expectedWords.map(normalize).join(' ')
    const answerNormalized = normalize(userAnswer)

    return answerNormalized === expectedNormalized ||
           expectedNormalized.endsWith(answerNormalized)
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

  const getFullAyahWithHighlight = (): { before: string; highlighted: string } => {
    if (!currentQuestion) return { before: '', highlighted: '' }
    const ayahData = getAyah(currentQuestion.surah, currentQuestion.ayah)
    if (!ayahData) return { before: '', highlighted: '' }

    const wordsRequired = getWordsRequired()
    const allWords = ayahData.w
    const beforeWords = allWords.slice(0, -wordsRequired)
    const lastWordsArr = allWords.slice(-wordsRequired)

    return {
      before: beforeWords.join(' '),
      highlighted: lastWordsArr.join(' '),
    }
  }

  return (
    <QuranGameShell
      title="Last Words"
      titleAr="آخر الكلمات"
      icon="➡️"
      onBack={onBack}
      state={state}
      sessionResults={sessionResults}
      perfectRun={perfectRun}
      onStart={startGame}
      onEndGame={endGame}
      description="See an ayah reference and type the last words from memory. Build your reference-to-ending anchors!"
    >
      {/* Hidden audio element */}
      <audio ref={audioRef} />

      {currentQuestion && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ width: '100%', maxWidth: '32rem', margin: '0 auto' }}
        >
          {/* Reference Display */}
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <p style={{ color: 'var(--color-muted-foreground)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
              What are the last {getWordsRequired()} words of:
            </p>
            <h2 style={{ fontSize: '2rem', color: 'var(--color-accent)', margin: 0 }}>
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
              disabled={state === 'feedback'}
              placeholder="Type the last words..."
              dir="rtl"
              className="font-arabic"
              style={{
                width: '100%', padding: '1rem 1.5rem',
                background: 'var(--color-card)', border: '1px solid var(--color-border)',
                borderRadius: '12px', fontSize: '1.5rem', textAlign: 'center',
                color: 'var(--color-foreground)', outline: 'none',
                fontFamily: 'var(--font-arabic)',
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
                disabled={!answer.trim() || state === 'feedback'}
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
                  marginTop: '1.5rem', padding: '1.5rem',
                  border: lastCorrect ? '1px solid rgba(34,197,94,0.4)' : '1px solid rgba(244,63,94,0.4)',
                  background: lastCorrect ? 'rgba(34,197,94,0.08)' : 'rgba(244,63,94,0.08)',
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

                {/* Show full ayah with last words highlighted */}
                <div style={{ marginBottom: '1rem' }}>
                  <p style={{ color: 'var(--color-muted-foreground)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>The full ayah:</p>
                  <p className="font-arabic" style={{ fontSize: '1.25rem', lineHeight: 1.8 }} dir="rtl">
                    {(() => {
                      const { before, highlighted } = getFullAyahWithHighlight()
                      return (
                        <>
                          {before && <span style={{ color: 'var(--color-muted-foreground)' }}>{before} </span>}
                          <span style={{ color: 'var(--color-accent)', fontWeight: 500 }}>{highlighted}</span>
                        </>
                      )
                    })()}
                  </p>
                </div>

                <button
                  onClick={handleNext}
                  className="btn-secondary"
                  style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
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
