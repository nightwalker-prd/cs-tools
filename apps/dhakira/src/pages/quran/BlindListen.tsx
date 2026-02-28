import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, X, Ear, Volume2, Loader2 } from 'lucide-react'
import { shuffle } from '@arabtools/core'
import { useQuranGame, useQuranGameConfig } from '../../hooks/quran'
import { getAyah } from '../../data/quran-data'
import { SURAH_DATA } from '../../data/quran-surah'
import { getAudioUrl, getReciterById } from '../../data/reciters'
import { QuranGameShell } from '../../components/quran/QuranGameShell'

interface BlindListenProps {
  onBack: () => void
}

interface ReferenceChoice {
  surah: number
  ayah: number
  display: string
  isCorrect: boolean
}

export function BlindListen({ onBack }: BlindListenProps) {
  const [choices, setChoices] = useState<ReferenceChoice[]>([])
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [lastCorrect, setLastCorrect] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [hasPlayed, setHasPlayed] = useState(false)

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
  } = useQuranGame({
    gameType: 'blind-listen',
    mode: config.mode,
    timedMode: config.timedMode,
  })

  const getSurahName = (surah: number): string => {
    return SURAH_DATA[surah - 1]?.name || `Surah ${surah}`
  }

  const getSurahAyahCount = (surah: number): number => {
    return SURAH_DATA[surah - 1]?.ayahCount || 1
  }

  // Generate wrong options that are nearby ayahs
  const generateWrongOptions = (
    correctSurah: number,
    correctAyah: number
  ): Array<{ surah: number; ayah: number }> => {
    const wrongOptions: Array<{ surah: number; ayah: number }> = []
    const maxAyahs = getSurahAyahCount(correctSurah)
    const usedAyahs = new Set<string>()
    usedAyahs.add(`${correctSurah}:${correctAyah}`)

    // Generate nearby ayahs from the same surah (within +/- 1-5)
    const offsets = [-1, 1, -2, 2, -3, 3, -4, 4, -5, 5]

    for (const offset of offsets) {
      if (wrongOptions.length >= 3) break

      const candidateAyah = correctAyah + offset
      const key = `${correctSurah}:${candidateAyah}`

      if (candidateAyah >= 1 && candidateAyah <= maxAyahs && !usedAyahs.has(key)) {
        // Verify the ayah exists in our data
        const ayahData = getAyah(correctSurah, candidateAyah)
        if (ayahData) {
          wrongOptions.push({ surah: correctSurah, ayah: candidateAyah })
          usedAyahs.add(key)
        }
      }
    }

    // If we still need more options, try adjacent surahs
    if (wrongOptions.length < 3) {
      const adjacentSurahs = [correctSurah - 1, correctSurah + 1].filter(
        s => s >= 1 && s <= 114
      )

      for (const surah of adjacentSurahs) {
        if (wrongOptions.length >= 3) break

        const surahMaxAyahs = getSurahAyahCount(surah)
        // Try a similar ayah number in the adjacent surah
        const candidateAyah = Math.min(correctAyah, surahMaxAyahs)
        const key = `${surah}:${candidateAyah}`

        if (!usedAyahs.has(key)) {
          const ayahData = getAyah(surah, candidateAyah)
          if (ayahData) {
            wrongOptions.push({ surah, ayah: candidateAyah })
            usedAyahs.add(key)
          }
        }
      }
    }

    return wrongOptions
  }

  // Generate choices when question changes
  useEffect(() => {
    if (state === 'playing' && currentQuestion) {
      const { surah, ayah } = currentQuestion

      const wrongOptions = generateWrongOptions(surah, ayah)

      const choicesList: ReferenceChoice[] = [
        {
          surah,
          ayah,
          display: `${getSurahName(surah)}:${ayah}`,
          isCorrect: true,
        },
        ...wrongOptions.map(opt => ({
          surah: opt.surah,
          ayah: opt.ayah,
          display: `${getSurahName(opt.surah)}:${opt.ayah}`,
          isCorrect: false,
        })),
      ]

      setChoices(shuffle(choicesList))
      setSelectedIndex(null)
      setHasPlayed(false)
    }
  }, [state, currentQuestion])

  // Handle audio events
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handlePlay = () => {
      setIsPlaying(true)
      setIsLoading(false)
    }

    const handlePause = () => {
      setIsPlaying(false)
    }

    const handleEnded = () => {
      setIsPlaying(false)
      setHasPlayed(true)
    }

    const handleError = () => {
      setIsPlaying(false)
      setIsLoading(false)
    }

    const handleWaiting = () => {
      setIsLoading(true)
    }

    const handleCanPlay = () => {
      setIsLoading(false)
    }

    audio.addEventListener('play', handlePlay)
    audio.addEventListener('pause', handlePause)
    audio.addEventListener('ended', handleEnded)
    audio.addEventListener('error', handleError)
    audio.addEventListener('waiting', handleWaiting)
    audio.addEventListener('canplay', handleCanPlay)

    return () => {
      audio.removeEventListener('play', handlePlay)
      audio.removeEventListener('pause', handlePause)
      audio.removeEventListener('ended', handleEnded)
      audio.removeEventListener('error', handleError)
      audio.removeEventListener('waiting', handleWaiting)
      audio.removeEventListener('canplay', handleCanPlay)
    }
  }, [])

  const playAudio = () => {
    if (!currentQuestion || !audioRef.current) return

    const reciter = getReciterById('minshawi')
    if (!reciter) return

    const url = getAudioUrl(reciter.folder, currentQuestion.surah, currentQuestion.ayah)

    if (audioRef.current.src !== url) {
      audioRef.current.src = url
    }

    if (isPlaying) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
    } else {
      setIsLoading(true)
      audioRef.current.play().catch(() => {
        setIsLoading(false)
      })
    }
  }

  const handleSelect = (index: number) => {
    if (state !== 'playing' || showFeedback) return
    setSelectedIndex(index)
  }

  const handleSubmit = () => {
    if (!currentQuestion || state !== 'playing' || selectedIndex === null) return

    const selected = choices[selectedIndex]
    const isCorrect = selected.isCorrect
    setLastCorrect(isCorrect)
    setShowFeedback(true)

    // Stop audio if playing
    if (audioRef.current && isPlaying) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
    }

    const answer = `${selected.surah}:${selected.ayah}`
    submitAnswer(answer, isCorrect)
  }

  const handleNext = () => {
    setShowFeedback(false)
    setSelectedIndex(null)
    setChoices([])
    setHasPlayed(false)
    nextQuestion()
  }

  const getCorrectReference = (): string => {
    if (!currentQuestion) return ''
    return `${getSurahName(currentQuestion.surah)}:${currentQuestion.ayah}`
  }

  const getAyahText = (): string => {
    if (!currentQuestion) return ''
    const ayahData = getAyah(currentQuestion.surah, currentQuestion.ayah)
    return ayahData?.t || ''
  }

  return (
    <QuranGameShell
      title="Blind Listen"
      titleAr="استماع أعمى"
      icon="👂"
      onBack={onBack}
      state={state}
      sessionResults={sessionResults}
      perfectRun={perfectRun}
      onStart={startGame}
      onEndGame={endGame}
      description="Listen to an ayah recitation and identify which surah and ayah it is. Train your ears to recognize ayahs by sound!"
    >
      {/* Hidden audio element */}
      <audio ref={audioRef} />

      {currentQuestion && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ width: '100%', maxWidth: '32rem', margin: '0 auto' }}
        >
          {/* Audio Player */}
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <p style={{ color: 'var(--color-muted-foreground)', fontSize: '0.875rem', marginBottom: '1rem' }}>Listen and identify the ayah:</p>
            <button
              onClick={playAudio}
              disabled={showFeedback}
              style={{
                width: '6rem', height: '6rem', borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto', border: 'none', cursor: 'pointer',
                transition: 'all 0.3s ease',
                background: isPlaying ? 'var(--color-accent)' : 'var(--color-secondary)',
                color: isPlaying ? 'var(--color-accent-foreground)' : 'var(--color-muted-foreground)',
                opacity: showFeedback ? 0.5 : 1,
              }}
            >
              {isLoading ? (
                <Loader2 size={40} className="animate-spin" />
              ) : isPlaying ? (
                <Volume2 size={40} />
              ) : (
                <Ear size={40} />
              )}
            </button>
            <p style={{ color: 'var(--color-muted-foreground)', fontSize: '0.875rem', marginTop: '0.5rem' }}>
              {isPlaying ? 'Playing...' : hasPlayed ? 'Tap to replay' : 'Tap to listen'}
            </p>
          </div>

          {/* Choice Options */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1.5rem' }}>
            {choices.map((choice, index) => {
              let bg = 'var(--color-card)'
              let borderColor = 'var(--color-border)'

              if (showFeedback) {
                if (choice.isCorrect) {
                  bg = 'rgba(34,197,94,0.1)'
                  borderColor = 'rgba(34,197,94,0.4)'
                } else if (selectedIndex === index) {
                  bg = 'rgba(244,63,94,0.1)'
                  borderColor = 'rgba(244,63,94,0.4)'
                }
              } else if (selectedIndex === index) {
                bg = 'rgba(197,162,83,0.15)'
                borderColor = 'var(--color-accent)'
              }

              return (
                <button
                  key={`${choice.surah}-${choice.ayah}`}
                  onClick={() => handleSelect(index)}
                  disabled={showFeedback}
                  style={{
                    padding: '1rem', borderRadius: '12px',
                    border: `1px solid ${borderColor}`,
                    background: bg, textAlign: 'center',
                    transition: 'all 0.2s ease', cursor: showFeedback ? 'default' : 'pointer',
                  }}
                >
                  <p style={{ fontSize: '1.125rem', fontWeight: 500 }}>{choice.display}</p>
                </button>
              )
            })}
          </div>

          {/* Submit Button */}
          {!showFeedback && (
            <button
              onClick={handleSubmit}
              disabled={selectedIndex === null}
              className="btn-primary"
              style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
            >
              <Check size={18} />
              Confirm Selection
            </button>
          )}

          {/* Feedback */}
          <AnimatePresence>
            {showFeedback && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="glass-card"
                style={{
                  padding: '1.5rem',
                  border: lastCorrect ? '1px solid rgba(34,197,94,0.4)' : '1px solid rgba(244,63,94,0.4)',
                  background: lastCorrect ? 'rgba(34,197,94,0.08)' : 'rgba(244,63,94,0.08)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                  {lastCorrect ? (
                    <>
                      <Check size={24} style={{ color: '#4ade80' }} />
                      <span style={{ color: '#4ade80', fontWeight: 500 }}>Correct! You recognized the ayah!</span>
                    </>
                  ) : (
                    <>
                      <X size={24} style={{ color: '#fb7185' }} />
                      <span style={{ color: '#fb7185', fontWeight: 500 }}>Not quite - keep training your ear</span>
                    </>
                  )}
                </div>

                {/* Show correct answer and ayah text */}
                <div style={{ marginBottom: '1rem' }}>
                  <p style={{ color: 'var(--color-muted-foreground)', fontSize: '0.875rem', marginBottom: '0.25rem' }}>The correct answer:</p>
                  <p style={{ color: 'var(--color-accent)', fontWeight: 500, fontSize: '1.125rem', marginBottom: '0.5rem' }}>{getCorrectReference()}</p>
                  <p className="font-arabic" style={{ fontSize: '1.125rem', lineHeight: 1.8 }} dir="rtl">
                    {getAyahText()}
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
