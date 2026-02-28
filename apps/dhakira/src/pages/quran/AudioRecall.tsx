import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, X, RefreshCw, Headphones, Play } from 'lucide-react'
import { useQuranGame, useQuranGameConfig } from '../../hooks/quran'
import { getAyah, getFirstWords } from '../../data/quran-data'
import { SURAH_DATA } from '../../data/quran-surah'
import { getAudioUrl, getReciterById } from '../../data/reciters'
import { QuranGameShell } from '../../components/quran/QuranGameShell'

interface AudioRecallProps {
  onBack: () => void
}

export function AudioRecall({ onBack }: AudioRecallProps) {
  const [answer, setAnswer] = useState('')
  const [showFeedback, setShowFeedback] = useState(false)
  const [lastCorrect, setLastCorrect] = useState(false)
  const [audioPlaying, setAudioPlaying] = useState(false)
  const [audioLoaded, setAudioLoaded] = useState(false)
  const [audioError, setAudioError] = useState(false)
  const [hasPlayedOnce, setHasPlayedOnce] = useState(false)
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
    gameType: 'audio-recall',
    mode: config.mode,
    timedMode: config.timedMode,
  })

  // Reset audio state when question changes
  useEffect(() => {
    if (state === 'playing' && currentQuestion && !showFeedback) {
      setAudioLoaded(false)
      setAudioError(false)
      setHasPlayedOnce(false)
    }
  }, [state, currentQuestion, showFeedback])

  // Focus input after audio ends
  useEffect(() => {
    if (state === 'playing' && !audioPlaying && audioLoaded && inputRef.current) {
      inputRef.current.focus()
    }
  }, [state, audioPlaying, audioLoaded])

  const getWordsRequired = (): number => {
    if (!currentQuestion) return 3
    const difficulty = getDifficultyForAyah(currentQuestion.surah, currentQuestion.ayah)
    return difficulty.wordsRequired
  }

  const playAudio = async () => {
    if (!currentQuestion || !audioRef.current) return

    const reciter = getReciterById('mishary')
    if (!reciter) {
      setAudioError(true)
      return
    }

    const url = getAudioUrl(reciter.folder, currentQuestion.surah, currentQuestion.ayah)
    audioRef.current.src = url
    setAudioError(false)

    try {
      await audioRef.current.play()
      setAudioPlaying(true)
      setHasPlayedOnce(true)
    } catch (err) {
      console.error('Audio playback failed:', err)
      setAudioError(true)
      setAudioPlaying(false)
    }
  }

  const handleAudioEnded = () => {
    setAudioPlaying(false)
    setAudioLoaded(true)
  }

  const handleAudioError = () => {
    setAudioPlaying(false)
    setAudioLoaded(true)
  }

  const checkAnswer = (userAnswer: string): boolean => {
    if (!currentQuestion) return false

    const ayahData = getAyah(currentQuestion.surah, currentQuestion.ayah)
    if (!ayahData) return false

    const wordsRequired = getWordsRequired()
    const expectedWords = ayahData.w.slice(0, wordsRequired)

    // Normalize both for comparison (remove tashkeel/diacritics)
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
    setAudioLoaded(false)
    nextQuestion()
  }

  const getSurahName = (surah: number): string => {
    return SURAH_DATA[surah - 1]?.name || `Surah ${surah}`
  }

  const getExpectedWords = (): string => {
    if (!currentQuestion) return ''
    const words = getFirstWords(currentQuestion.surah, currentQuestion.ayah, getWordsRequired())
    return words.join(' ')
  }

  const getFullAyahText = (): string => {
    if (!currentQuestion) return ''
    const ayahData = getAyah(currentQuestion.surah, currentQuestion.ayah)
    return ayahData?.t || ''
  }

  return (
    <QuranGameShell
      title="Audio Recall"
      titleAr="استرجاع سمعي"
      icon="🎧"
      onBack={onBack}
      state={state}
      sessionResults={sessionResults}
      perfectRun={perfectRun}
      onStart={startGame}
      onEndGame={endGame}
      description="Listen to an ayah recitation and type the first words from memory. No text hints - train your ears!"
    >
      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        onEnded={handleAudioEnded}
        onError={handleAudioError}
      />

      {currentQuestion && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ width: '100%', maxWidth: '32rem', margin: '0 auto' }}
        >
          {/* Audio Status Display */}
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            {!hasPlayedOnce && !showFeedback ? (
              // First time - show big play button
              <button
                onClick={playAudio}
                disabled={audioPlaying}
                className="btn-primary"
                style={{
                  width: '8rem', height: '8rem', borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 1rem', padding: 0,
                }}
              >
                {audioPlaying ? (
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ repeat: Infinity, duration: 1 }}
                  >
                    <Headphones size={48} />
                  </motion.div>
                ) : (
                  <Play size={48} style={{ marginLeft: '4px' }} />
                )}
              </button>
            ) : (
              <div
                style={{
                  width: '6rem', height: '6rem', borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 1rem',
                  background: audioPlaying ? 'rgba(197,162,83,0.2)' : 'var(--color-secondary)',
                  border: audioPlaying ? '2px solid var(--color-accent)' : '2px solid var(--color-border)',
                  transition: 'all 0.3s ease',
                }}
              >
                {audioPlaying ? (
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ repeat: Infinity, duration: 1 }}
                  >
                    <Headphones size={40} style={{ color: 'var(--color-accent)' }} />
                  </motion.div>
                ) : (
                  <Headphones size={40} style={{ color: 'var(--color-muted-foreground)' }} />
                )}
              </div>
            )}
            <p style={{ color: 'var(--color-muted-foreground)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
              {audioPlaying
                ? 'Listen carefully...'
                : showFeedback
                  ? `${getSurahName(currentQuestion.surah)} : ${currentQuestion.ayah}`
                  : !hasPlayedOnce
                    ? 'Tap to play the ayah'
                    : `Type the first ${getWordsRequired()} words you heard`
              }
            </p>
            {audioError && (
              <p style={{ color: 'var(--color-destructive)', fontSize: '0.75rem' }}>
                Audio failed to load. Try again.
              </p>
            )}
          </div>

          {/* Answer Input */}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <input
              ref={inputRef}
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              disabled={state === 'feedback'}
              placeholder="Type what you hear..."
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
                onClick={playAudio}
                disabled={audioPlaying}
                className="btn-secondary"
                style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
              >
                <RefreshCw size={18} className={audioPlaying ? 'animate-spin' : ''} />
                Replay
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

                {/* Show correct answer and full ayah */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1rem' }}>
                  <div>
                    <p style={{ color: 'var(--color-muted-foreground)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>The ayah begins:</p>
                    <p className="font-arabic" style={{ fontSize: '1.25rem' }} dir="rtl">
                      {getExpectedWords()}
                    </p>
                  </div>
                  <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '0.75rem' }}>
                    <p style={{ color: 'var(--color-muted-foreground)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>Full ayah:</p>
                    <p className="font-arabic" style={{ fontSize: '1.125rem', lineHeight: 1.8 }} dir="rtl">
                      {getFullAyahText()}
                    </p>
                  </div>
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
