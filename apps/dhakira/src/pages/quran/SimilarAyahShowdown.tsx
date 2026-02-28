import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, X } from 'lucide-react'
import { shuffle } from '@arabtools/core'
import { useQuranGame, useQuranDataLoader } from '../../hooks/quran'
import { getAyah, getSimilarAyahs, fromGlobalAyahNumber } from '../../data/quran-data'
import { SURAH_DATA } from '../../data/quran-surah'
import { QuranGameShell } from '../../components/quran/QuranGameShell'
import type { QuranGameMode, AyahRange } from '../../types/quran'

interface SimilarAyahShowdownProps {
  onBack: () => void
  mode?: QuranGameMode
  timedMode?: boolean
  selectedRanges?: AyahRange[]
}

interface AyahChoice {
  surah: number
  ayah: number
  text: string
  isCorrect: boolean
}

export function SimilarAyahShowdown({ onBack, mode = 'practice-any', timedMode = false, selectedRanges = [] }: SimilarAyahShowdownProps) {
  const { loading, error, isReady } = useQuranDataLoader()
  const [choices, setChoices] = useState<AyahChoice[]>([])
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [lastCorrect, setLastCorrect] = useState(false)
  const [targetReference, setTargetReference] = useState<string>('')

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
    gameType: 'similar-ayah',
    mode,
    timedMode,
    selectedRanges,
  })

  const getSurahName = (surah: number): string => {
    return SURAH_DATA[surah - 1]?.name || `Surah ${surah}`
  }

  // Generate choices when question changes
  useEffect(() => {
    if (state === 'playing' && currentQuestion) {
      const { surah, ayah } = currentQuestion

      const ayahData = getAyah(surah, ayah)
      if (!ayahData) return

      // Get similar ayahs
      const similarGlobalAyahs = getSimilarAyahs(surah, ayah)

      if (similarGlobalAyahs.length > 0) {
        const randomSimilarGlobal = similarGlobalAyahs[Math.floor(Math.random() * similarGlobalAyahs.length)]
        const similarRef = fromGlobalAyahNumber(randomSimilarGlobal)

        if (similarRef) {
          const similarAyahData = getAyah(similarRef.surah, similarRef.ayah)

          if (similarAyahData) {
            const choicesList: AyahChoice[] = [
              {
                surah,
                ayah,
                text: ayahData.t,
                isCorrect: true,
              },
              {
                surah: similarRef.surah,
                ayah: similarRef.ayah,
                text: similarAyahData.t,
                isCorrect: false,
              },
            ]

            setChoices(shuffle(choicesList))
            setTargetReference(`${getSurahName(surah)} : ${ayah}`)
            setSelectedIndex(null)
            return
          }
        }
      }

      // Fallback: if no similar ayahs, use adjacent ayah
      const fallbackAyah = ayah > 1 ? ayah - 1 : ayah + 1
      const fallbackData = getAyah(surah, fallbackAyah)

      if (fallbackData) {
        const choicesList: AyahChoice[] = [
          {
            surah,
            ayah,
            text: ayahData.t,
            isCorrect: true,
          },
          {
            surah,
            ayah: fallbackAyah,
            text: fallbackData.t,
            isCorrect: false,
          },
        ]

        setChoices(shuffle(choicesList))
        setTargetReference(`${getSurahName(surah)} : ${ayah}`)
        setSelectedIndex(null)
      }
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

    const answerStr = `${selected.surah}:${selected.ayah}`
    submitAnswer(answerStr, isCorrect)
  }

  const handleNext = () => {
    setShowFeedback(false)
    setSelectedIndex(null)
    setChoices([])
    nextQuestion()
  }

  return (
    <QuranGameShell
      title="Similar Ayah Showdown"
      icon="🔍"
      onBack={onBack}
      state={showFeedback ? 'feedback' : state}
      sessionResults={sessionResults}
      perfectRun={perfectRun}
      onStart={startGame}
      onEndGame={endGame}
      description="Two similar ayahs appear - identify which one matches the reference. Master the subtle differences!"
    >
      {currentQuestion && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ width: '100%', maxWidth: '42rem', margin: '0 auto' }}
        >
          {/* Question */}
          <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            <p style={{ color: 'var(--color-muted-foreground)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>Which ayah is:</p>
            <h2 style={{ fontSize: '1.75rem', color: 'var(--color-accent)' }}>
              {targetReference}
            </h2>
          </div>

          {/* Choices */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
            {choices.map((choice, index) => {
              let bgStyle: React.CSSProperties = {
                background: 'var(--color-card)',
                border: '1px solid var(--color-border)',
              }

              if (showFeedback) {
                if (choice.isCorrect) {
                  bgStyle = {
                    background: 'rgba(34,197,94,0.1)',
                    border: '1px solid rgba(34,197,94,0.3)',
                  }
                } else if (selectedIndex === index) {
                  bgStyle = {
                    background: 'rgba(244,63,94,0.1)',
                    border: '1px solid rgba(244,63,94,0.3)',
                  }
                }
              } else if (selectedIndex === index) {
                bgStyle = {
                  background: 'rgba(197,162,83,0.15)',
                  border: '1px solid var(--color-accent)',
                }
              }

              return (
                <button
                  key={`${choice.surah}-${choice.ayah}`}
                  onClick={() => handleSelect(index)}
                  disabled={showFeedback}
                  style={{
                    ...bgStyle,
                    width: '100%',
                    padding: '1.5rem',
                    borderRadius: '12px',
                    textAlign: 'right',
                    cursor: showFeedback ? 'default' : 'pointer',
                    transition: 'all 0.2s ease',
                    fontFamily: 'inherit',
                  }}
                >
                  <p className="font-arabic" style={{ fontSize: '1.25rem', lineHeight: 1.8 }} dir="rtl">
                    {choice.text}
                  </p>
                  {showFeedback && (
                    <p style={{ color: 'var(--color-muted-foreground)', fontSize: '0.875rem', marginTop: '0.75rem', textAlign: 'left' }}>
                      {getSurahName(choice.surah)} : {choice.ayah}
                      {choice.isCorrect && (
                        <span style={{ color: '#4ade80', marginLeft: '0.5rem' }}>(Correct)</span>
                      )}
                    </p>
                  )}
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
                  background: lastCorrect ? 'rgba(34,197,94,0.1)' : 'rgba(244,63,94,0.1)',
                  border: lastCorrect ? '1px solid rgba(34,197,94,0.3)' : '1px solid rgba(244,63,94,0.3)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                  {lastCorrect ? (
                    <>
                      <Check size={24} style={{ color: '#4ade80' }} />
                      <span style={{ color: '#4ade80', fontWeight: 500 }}>Correct! You know your similar ayahs!</span>
                    </>
                  ) : (
                    <>
                      <X size={24} style={{ color: '#fb7185' }} />
                      <span style={{ color: '#fb7185', fontWeight: 500 }}>Not quite - study the differences</span>
                    </>
                  )}
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
