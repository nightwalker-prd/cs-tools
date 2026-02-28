// Memory Science: Elaboration + Semantic Encoding (Make It Stick + Higbee)
// "Connecting new information to existing knowledge creates stronger, more retrievable memories"

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, X } from 'lucide-react'
import { useAyahMastery, useQuranGameConfig } from '../../hooks/quran'
import { getAyah, getAyahTheme, getDistractorThemes } from '../../data/quran-data'
import { SURAH_DATA } from '../../data/quran-surah'
import { QuranGameShell } from '../../components/quran/QuranGameShell'
import type { AyahRange } from '../../types/quran'

interface MeaningLinksProps {
  onBack: () => void
}

interface ThemeOption {
  theme: string
  isCorrect: boolean
}

const DEFAULT_RANGES: AyahRange[] = [
  { surah: 1, startAyah: 1, endAyah: 7 },
  { surah: 2, startAyah: 1, endAyah: 286 },
  { surah: 3, startAyah: 1, endAyah: 200 },
  { surah: 4, startAyah: 1, endAyah: 176 },
  { surah: 5, startAyah: 1, endAyah: 120 },
]

export function MeaningLinks({ onBack }: MeaningLinksProps) {
  const { config } = useQuranGameConfig()
  const mode = config.mode
  const selectedRanges: AyahRange[] = []
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'feedback' | 'complete'>('idle')
  const [currentAyah, setCurrentAyah] = useState<{ surah: number; ayah: number } | null>(null)
  const [correctTheme, setCorrectTheme] = useState<string | null>(null)
  const [options, setOptions] = useState<ThemeOption[]>([])
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [lastCorrect, setLastCorrect] = useState(false)
  const [sessionResults, setSessionResults] = useState<{ correct: boolean }[]>([])
  const [perfectRun, setPerfectRun] = useState(0)

  const { recordAttempt, getWeakAyahs } = useAyahMastery()

  const ranges = selectedRanges.length > 0 ? selectedRanges : DEFAULT_RANGES

  const findAyahWithTheme = useCallback((): { surah: number; ayah: number; theme: string } | null => {
    // Try to find an ayah that has a detectable theme
    const maxAttempts = 100

    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      let surah: number
      let ayah: number

      if (mode === 'my-progress') {
        const weakAyahs = getWeakAyahs(50)
        if (weakAyahs.length > 0) {
          const random = weakAyahs[Math.floor(Math.random() * weakAyahs.length)]
          surah = random.surah
          ayah = random.ayah
        } else {
          // Fallback to random
          const totalAyahs = ranges.reduce((sum, r) => sum + (r.endAyah - r.startAyah + 1), 0)
          let randomIndex = Math.floor(Math.random() * totalAyahs)

          surah = 1
          ayah = 1

          for (const range of ranges) {
            const rangeSize = range.endAyah - range.startAyah + 1
            if (randomIndex < rangeSize) {
              surah = range.surah
              ayah = range.startAyah + randomIndex
              break
            }
            randomIndex -= rangeSize
          }
        }
      } else {
        // Random from ranges
        const totalAyahs = ranges.reduce((sum, r) => sum + (r.endAyah - r.startAyah + 1), 0)
        let randomIndex = Math.floor(Math.random() * totalAyahs)

        surah = 1
        ayah = 1

        for (const range of ranges) {
          const rangeSize = range.endAyah - range.startAyah + 1
          if (randomIndex < rangeSize) {
            surah = range.surah
            ayah = range.startAyah + randomIndex
            break
          }
          randomIndex -= rangeSize
        }
      }

      const theme = getAyahTheme(surah, ayah)
      if (theme) {
        return { surah, ayah, theme }
      }
    }

    // Fallback: use a known ayah with a theme (Al-Fatiha)
    return { surah: 1, ayah: 2, theme: 'Praise and Gratitude' }
  }, [mode, ranges, getWeakAyahs])

  const startGame = () => {
    setSessionResults([])
    setPerfectRun(0)
    loadNextQuestion()
    setGameState('playing')
  }

  const loadNextQuestion = () => {
    const result = findAyahWithTheme()
    if (!result) return

    setCurrentAyah({ surah: result.surah, ayah: result.ayah })
    setCorrectTheme(result.theme)

    // Get 3 distractor themes
    const distractors = getDistractorThemes(result.theme, 3)

    const allOptions: ThemeOption[] = [
      { theme: result.theme, isCorrect: true },
      ...distractors.map(t => ({ theme: t, isCorrect: false })),
    ]

    // Fisher-Yates shuffle
    for (let i = allOptions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[allOptions[i], allOptions[j]] = [allOptions[j], allOptions[i]]
    }

    setOptions(allOptions)
    setSelectedOption(null)
    setShowFeedback(false)
  }

  const handleSelect = (theme: string) => {
    if (gameState !== 'playing' || showFeedback) return

    setSelectedOption(theme)
    const isCorrect = theme === correctTheme
    setLastCorrect(isCorrect)
    setShowFeedback(true)

    if (currentAyah) {
      recordAttempt(currentAyah.surah, currentAyah.ayah, isCorrect, 0, 'meaning-links')
    }

    setSessionResults(prev => [...prev, { correct: isCorrect }])

    if (isCorrect) {
      setPerfectRun(prev => prev + 1)
    } else {
      setPerfectRun(0)
    }
  }

  const handleNext = () => {
    if (sessionResults.length >= 20) {
      setGameState('complete')
    } else {
      loadNextQuestion()
    }
  }

  const getSurahName = (surah: number): string => {
    return SURAH_DATA[surah - 1]?.name || `Surah ${surah}`
  }

  const getAyahText = (): string => {
    if (!currentAyah) return ''
    const ayahData = getAyah(currentAyah.surah, currentAyah.ayah)
    return ayahData?.t || ''
  }

  // Map to QuranGameShell states
  const shellState = gameState === 'feedback' ? 'playing' as const : gameState

  return (
    <QuranGameShell
      title="Meaning Links"
      icon="🔗"
      onBack={onBack}
      state={shellState}
      sessionResults={sessionResults}
      perfectRun={perfectRun}
      onStart={startGame}
      onEndGame={() => setGameState('idle')}
      description="Read an ayah and identify its main theme or meaning. Connecting meaning to text builds stronger, more retrievable memories."
    >
      {/* PLAYING State */}
      {(gameState === 'playing' || gameState === 'feedback') && currentAyah && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ width: '100%', maxWidth: '42rem' }}
        >
          {/* Reference Display */}
          <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
            <h2 style={{ fontSize: '1.25rem', color: 'var(--color-accent)' }}>
              {getSurahName(currentAyah.surah)} : {currentAyah.ayah}
            </h2>
          </div>

          {/* Ayah Display */}
          <div className="glass-card" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
            <p className="font-arabic" style={{ fontSize: '1.25rem', lineHeight: 1.8, textAlign: 'center' }} dir="rtl">
              {getAyahText()}
            </p>
          </div>

          {/* Theme Question */}
          <p style={{ color: 'var(--color-muted-foreground)', textAlign: 'center', marginBottom: '1rem' }}>What is the main theme of this ayah?</p>

          {/* Theme Options */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1.5rem' }}>
            {options.map((option) => {
              let btnStyle: React.CSSProperties = {
                padding: '1rem',
                borderRadius: '0.75rem',
                border: '1px solid var(--color-border)',
                background: 'var(--color-card)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                textAlign: 'left' as const,
              }

              if (showFeedback) {
                if (option.isCorrect) {
                  btnStyle = { ...btnStyle, background: 'rgba(34,197,94,0.15)', borderColor: 'rgba(34,197,94,0.5)', color: '#16a34a' }
                } else if (selectedOption === option.theme && !option.isCorrect) {
                  btnStyle = { ...btnStyle, background: 'rgba(244,63,94,0.15)', borderColor: 'rgba(244,63,94,0.5)', color: '#dc2626' }
                } else {
                  btnStyle = { ...btnStyle, opacity: 0.5 }
                }
              }

              return (
                <button
                  key={option.theme}
                  onClick={() => handleSelect(option.theme)}
                  disabled={showFeedback}
                  style={btnStyle}
                >
                  <p style={{ fontWeight: 500 }}>{option.theme}</p>
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
                  The theme is <span style={{ color: 'var(--color-accent)', fontWeight: 500 }}>{correctTheme}</span>
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
