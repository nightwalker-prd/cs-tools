// Memory Science: Interleaving + Discrimination (Make It Stick)
// "Mixing different problem types during practice leads to better long-term retention"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, X } from 'lucide-react'
import { useQuranGame, useQuranGameConfig } from '../../hooks/quran'
import { getAyah, getDistractorSurahs } from '../../data/quran-data'
import { SURAH_DATA } from '../../data/quran-surah'
import { QuranGameShell } from '../../components/quran/QuranGameShell'

interface SurahSleuthProps {
  onBack: () => void
}

interface SurahOption {
  surah: number
  name: string
  isCorrect: boolean
}

export function SurahSleuth({ onBack }: SurahSleuthProps) {
  const { config } = useQuranGameConfig()
  const mode = config.mode
  const timedMode = config.timedMode
  const selectedRanges: import('../../types/quran').AyahRange[] = []
  const [options, setOptions] = useState<SurahOption[]>([])
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [lastCorrect, setLastCorrect] = useState(false)

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
    gameType: 'surah-sleuth',
    mode,
    timedMode,
    selectedRanges,
  })

  // Generate options when question changes
  useEffect(() => {
    if (state === 'playing' && currentQuestion) {
      const difficulty = getDifficultyForAyah(currentQuestion.surah, currentQuestion.ayah)

      // Difficulty determines how similar the distractors are
      let similarityLevel: 'easy' | 'medium' | 'hard' = 'medium'
      if (difficulty.hintLevel >= 2) similarityLevel = 'easy'
      else if (difficulty.hintLevel === 0) similarityLevel = 'hard'

      const distractors = getDistractorSurahs(currentQuestion.surah, 3, similarityLevel)

      const allOptions: SurahOption[] = [
        {
          surah: currentQuestion.surah,
          name: SURAH_DATA[currentQuestion.surah - 1]?.name || `Surah ${currentQuestion.surah}`,
          isCorrect: true,
        },
        ...distractors.map(s => ({
          surah: s,
          name: SURAH_DATA[s - 1]?.name || `Surah ${s}`,
          isCorrect: false,
        })),
      ]

      // Fisher-Yates shuffle
      for (let i = allOptions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[allOptions[i], allOptions[j]] = [allOptions[j], allOptions[i]]
      }

      setOptions(allOptions)
      setSelectedOption(null)
    }
  }, [state, currentQuestion, getDifficultyForAyah])

  const handleSelect = (surah: number) => {
    if (state !== 'playing' || showFeedback) return

    setSelectedOption(surah)
    const isCorrect = surah === currentQuestion?.surah
    setLastCorrect(isCorrect)
    setShowFeedback(true)
    submitAnswer(surah.toString(), isCorrect)
  }

  const handleNext = () => {
    setShowFeedback(false)
    setSelectedOption(null)
    nextQuestion()
  }

  const getAyahText = (): string => {
    if (!currentQuestion) return ''
    const ayahData = getAyah(currentQuestion.surah, currentQuestion.ayah)
    return ayahData?.t || ''
  }

  const getSurahName = (surah: number): string => {
    return SURAH_DATA[surah - 1]?.name || `Surah ${surah}`
  }

  return (
    <QuranGameShell
      title="Surah Sleuth"
      icon="🔍"
      onBack={onBack}
      state={state}
      sessionResults={sessionResults}
      perfectRun={perfectRun}
      onStart={startGame}
      onEndGame={endGame}
      description="Read an ayah and identify which surah it belongs to. Interleaving tests discrimination, strengthening your ability to distinguish sources."
    >
      {/* PLAYING State */}
      {(state === 'playing' || state === 'feedback') && currentQuestion && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ width: '100%', maxWidth: '42rem' }}
        >
          {/* Ayah Display (no reference shown!) */}
          <div className="glass-card" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-muted-foreground)', marginBottom: '0.75rem', textAlign: 'center' }}>Which surah is this ayah from?</p>
            <p className="font-arabic" style={{ fontSize: '1.25rem', lineHeight: 1.8, textAlign: 'center' }} dir="rtl">
              {getAyahText()}
            </p>
          </div>

          {/* Surah Options */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1.5rem' }}>
            {options.map((option) => {
              let btnStyle: React.CSSProperties = {
                padding: '1rem',
                borderRadius: '0.75rem',
                border: '1px solid var(--color-border)',
                background: 'var(--color-card)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                textAlign: 'center' as const,
              }

              if (showFeedback) {
                if (option.isCorrect) {
                  btnStyle = { ...btnStyle, background: 'rgba(34,197,94,0.15)', borderColor: 'rgba(34,197,94,0.5)', color: '#16a34a' }
                } else if (selectedOption === option.surah && !option.isCorrect) {
                  btnStyle = { ...btnStyle, background: 'rgba(244,63,94,0.15)', borderColor: 'rgba(244,63,94,0.5)', color: '#dc2626' }
                } else {
                  btnStyle = { ...btnStyle, opacity: 0.5 }
                }
              }

              return (
                <button
                  key={option.surah}
                  onClick={() => handleSelect(option.surah)}
                  disabled={showFeedback}
                  style={btnStyle}
                >
                  <p style={{ fontWeight: 500 }}>{option.name}</p>
                  <p style={{ fontSize: '0.875rem', opacity: 0.6 }}>Surah {option.surah}</p>
                </button>
              )
            })}
          </div>

          {/* Feedback */}
          <AnimatePresence>
            {showFeedback && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                style={{
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

                <p style={{ color: 'var(--color-muted-foreground)', marginBottom: '1rem' }}>
                  This is from <span style={{ color: 'var(--color-accent)', fontWeight: 500 }}>{getSurahName(currentQuestion.surah)}</span>, Ayah {currentQuestion.ayah}
                </p>

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
