import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, X } from 'lucide-react'
import { shuffle } from '@arabtools/core'
import { useQuranGame, useQuranGameConfig } from '../../hooks/quran'
import { getAyah, parseReference } from '../../data/quran-data'
import { SURAH_DATA } from '../../data/quran-surah'
import { QuranGameShell } from '../../components/quran/QuranGameShell'

interface ReverseLookupProps {
  onBack: () => void
}

interface ReferenceChoice {
  surah: number
  ayah: number
  displayText: string
  isCorrect: boolean
}

export function ReverseLookup({ onBack }: ReverseLookupProps) {
  const [answer, setAnswer] = useState('')
  const [showFeedback, setShowFeedback] = useState(false)
  const [lastCorrect, setLastCorrect] = useState(false)
  const [choices, setChoices] = useState<ReferenceChoice[]>([])
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

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
    getMastery,
  } = useQuranGame({
    gameType: 'reverse-lookup',
    mode: config.mode,
    timedMode: config.timedMode,
  })

  // Determine if we should use multiple choice based on mastery level
  const isMultipleChoice = (): boolean => {
    if (!currentQuestion) return true
    const mastery = getMastery(currentQuestion.surah, currentQuestion.ayah)
    return mastery.level < 2
  }

  // Generate multiple choice options when question changes
  useEffect(() => {
    if (state === 'playing' && currentQuestion && isMultipleChoice()) {
      const { surah, ayah } = currentQuestion

      // Create the correct choice
      const correctChoice: ReferenceChoice = {
        surah,
        ayah,
        displayText: `${surah}:${ayah}`,
        isCorrect: true,
      }

      // Generate 3 wrong choices
      const wrongChoices: ReferenceChoice[] = []
      const usedRefs = new Set<string>([`${surah}:${ayah}`])

      // Try to pick from the same surah first for harder options
      const surahData = SURAH_DATA[surah - 1]
      const maxAyah = surahData?.ayahCount || 286

      while (wrongChoices.length < 3) {
        let wrongSurah: number
        let wrongAyah: number

        if (wrongChoices.length < 2 && surahData) {
          // Same surah, different ayah
          wrongSurah = surah
          wrongAyah = Math.floor(Math.random() * maxAyah) + 1
        } else {
          // Different surah
          wrongSurah = Math.floor(Math.random() * 114) + 1
          const wrongSurahData = SURAH_DATA[wrongSurah - 1]
          wrongAyah = Math.floor(Math.random() * (wrongSurahData?.ayahCount || 10)) + 1
        }

        const refKey = `${wrongSurah}:${wrongAyah}`
        if (!usedRefs.has(refKey)) {
          usedRefs.add(refKey)
          wrongChoices.push({
            surah: wrongSurah,
            ayah: wrongAyah,
            displayText: `${wrongSurah}:${wrongAyah}`,
            isCorrect: false,
          })
        }
      }

      // Shuffle all choices
      setChoices(shuffle([correctChoice, ...wrongChoices]))
      setSelectedIndex(null)
    }
  }, [state, currentQuestion])

  useEffect(() => {
    if (state === 'playing' && inputRef.current && !isMultipleChoice()) {
      inputRef.current.focus()
    }
  }, [state, currentQuestion])

  const getSurahName = (surah: number): string => {
    return SURAH_DATA[surah - 1]?.name || `Surah ${surah}`
  }

  const getCorrectReference = (): string => {
    if (!currentQuestion) return ''
    const surahName = getSurahName(currentQuestion.surah)
    return `${surahName}:${currentQuestion.ayah} (${currentQuestion.surah}:${currentQuestion.ayah})`
  }

  const getAyahText = (): string => {
    if (!currentQuestion) return ''
    const ayahData = getAyah(currentQuestion.surah, currentQuestion.ayah)
    return ayahData?.t || ''
  }

  const checkAnswer = (userAnswer: string): boolean => {
    if (!currentQuestion) return false

    const parsed = parseReference(userAnswer)
    if (!parsed) return false

    return parsed.surah === currentQuestion.surah && parsed.ayah === currentQuestion.ayah
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!currentQuestion || state !== 'playing') return

    const isCorrect = checkAnswer(answer)
    setLastCorrect(isCorrect)
    setShowFeedback(true)
    submitAnswer(answer, isCorrect)
  }

  const handleSelect = (index: number) => {
    if (state !== 'playing' || showFeedback) return
    setSelectedIndex(index)
  }

  const handleMultipleChoiceSubmit = () => {
    if (!currentQuestion || state !== 'playing' || selectedIndex === null) return

    const selected = choices[selectedIndex]
    const isCorrect = selected.isCorrect
    setLastCorrect(isCorrect)
    setShowFeedback(true)

    const answerText = `${selected.surah}:${selected.ayah}`
    submitAnswer(answerText, isCorrect)
  }

  const handleNext = () => {
    setShowFeedback(false)
    setAnswer('')
    setSelectedIndex(null)
    setChoices([])
    nextQuestion()
  }

  return (
    <QuranGameShell
      title="Reverse Lookup"
      titleAr="بحث عكسي"
      icon="🔍"
      onBack={onBack}
      state={state}
      sessionResults={sessionResults}
      perfectRun={perfectRun}
      onStart={startGame}
      onEndGame={endGame}
      description="See an ayah in Arabic and identify its reference (surah:ayah). Master your reference memory!"
    >
      {currentQuestion && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ width: '100%', maxWidth: '40rem', margin: '0 auto' }}
        >
          {/* Ayah Display */}
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <p style={{ color: 'var(--color-muted-foreground)', fontSize: '0.875rem', marginBottom: '1rem' }}>
              What is the reference for this ayah?
            </p>
            <div className="glass-card" style={{ padding: '1.5rem' }}>
              <p className="font-arabic" style={{ fontSize: '1.5rem', lineHeight: 1.8 }} dir="rtl">
                {getAyahText()}
              </p>
            </div>
          </div>

          {/* Multiple Choice Mode (Level 0-1) */}
          {isMultipleChoice() ? (
            <>
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
                      <p style={{ fontSize: '1.25rem', fontFamily: 'monospace' }}>
                        {choice.displayText}
                      </p>
                      {showFeedback && (
                        <p style={{ color: 'var(--color-muted-foreground)', fontSize: '0.875rem', marginTop: '0.5rem' }}>
                          {getSurahName(choice.surah)}
                          {choice.isCorrect && (
                            <span style={{ color: '#4ade80', marginLeft: '0.5rem' }}>(Correct)</span>
                          )}
                        </p>
                      )}
                    </button>
                  )
                })}
              </div>

              {!showFeedback && (
                <button
                  onClick={handleMultipleChoiceSubmit}
                  disabled={selectedIndex === null}
                  className="btn-primary"
                  style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                >
                  <Check size={18} />
                  Confirm Selection
                </button>
              )}
            </>
          ) : (
            /* Type Input Mode (Level 2+) */
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <input
                ref={inputRef}
                type="text"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                disabled={state === 'feedback'}
                placeholder="Type reference (e.g., 2:255 or Al-Baqarah:255)"
                style={{
                  width: '100%', padding: '1rem 1.5rem',
                  background: 'var(--color-card)', border: '1px solid var(--color-border)',
                  borderRadius: '12px', fontSize: '1.25rem', textAlign: 'center',
                  color: 'var(--color-foreground)', outline: 'none',
                }}
              />

              <button
                type="submit"
                disabled={!answer.trim() || state === 'feedback'}
                className="btn-primary"
                style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
              >
                <Check size={18} />
                Submit
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

                {/* Show correct reference */}
                <div style={{ marginBottom: '1rem' }}>
                  <p style={{ color: 'var(--color-muted-foreground)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>The correct reference is:</p>
                  <p style={{ fontSize: '1.25rem', fontFamily: 'monospace' }}>
                    {getCorrectReference()}
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
