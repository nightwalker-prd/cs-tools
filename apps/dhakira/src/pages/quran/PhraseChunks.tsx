// Memory Science: Chunking (Moonwalking with Einstein + Higbee)
// "Breaking information into meaningful chunks reduces cognitive load and improves retention"

import { useState, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, X, GripVertical, ArrowUp, ArrowDown } from 'lucide-react'
import { useAyahMastery, useQuranGameConfig } from '../../hooks/quran'
import { getAyahPhrases } from '../../data/quran-data'
import { SURAH_DATA } from '../../data/quran-surah'
import { QuranGameShell } from '../../components/quran/QuranGameShell'
import type { AyahRange } from '../../types/quran'

interface PhraseChunksProps {
  onBack: () => void
}

interface Phrase {
  id: string
  text: string
  originalIndex: number
}

const DEFAULT_RANGES: AyahRange[] = [
  { surah: 1, startAyah: 1, endAyah: 7 },
  { surah: 2, startAyah: 1, endAyah: 286 },
  { surah: 3, startAyah: 1, endAyah: 200 },
  { surah: 4, startAyah: 1, endAyah: 176 },
  { surah: 5, startAyah: 1, endAyah: 120 },
]

export function PhraseChunks({ onBack }: PhraseChunksProps) {
  const { config } = useQuranGameConfig()
  const mode = config.mode
  const selectedRanges: AyahRange[] = []
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'feedback' | 'complete'>('idle')
  const [currentAyah, setCurrentAyah] = useState<{ surah: number; ayah: number } | null>(null)
  const [phrases, setPhrases] = useState<Phrase[]>([])
  const [originalPhrases, setOriginalPhrases] = useState<string[]>([])
  const [showFeedback, setShowFeedback] = useState(false)
  const [lastCorrect, setLastCorrect] = useState(false)
  const [sessionResults, setSessionResults] = useState<{ correct: boolean }[]>([])
  const [perfectRun, setPerfectRun] = useState(0)
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null)
  const dragOverIndex = useRef<number | null>(null)

  const { recordAttempt, getWeakAyahs } = useAyahMastery()

  const ranges = selectedRanges.length > 0 ? selectedRanges : DEFAULT_RANGES

  const findAyahWithPhrases = useCallback((): { surah: number; ayah: number; phrases: string[] } | null => {
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

      const ayahPhrases = getAyahPhrases(surah, ayah)
      // Need at least 2 phrases to make it a game
      if (ayahPhrases.length >= 2) {
        return { surah, ayah, phrases: ayahPhrases }
      }
    }

    // Fallback to Al-Fatiha ayah 5 which should have phrases
    return { surah: 1, ayah: 5, phrases: getAyahPhrases(1, 5) }
  }, [mode, ranges, getWeakAyahs])

  const startGame = () => {
    setSessionResults([])
    setPerfectRun(0)
    loadNextQuestion()
    setGameState('playing')
  }

  const loadNextQuestion = () => {
    const result = findAyahWithPhrases()
    if (!result || result.phrases.length < 2) return

    setCurrentAyah({ surah: result.surah, ayah: result.ayah })
    setOriginalPhrases(result.phrases)

    // Create phrase objects with original indices
    const phraseObjects: Phrase[] = result.phrases.map((text, index) => ({
      id: `phrase-${index}`,
      text,
      originalIndex: index,
    }))

    // Fisher-Yates shuffle
    const shuffled = [...phraseObjects]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }

    // Ensure it's actually shuffled (not same order)
    const isSameOrder = shuffled.every((p, i) => p.originalIndex === i)
    if (isSameOrder && shuffled.length > 1) {
      // Swap first two
      [shuffled[0], shuffled[1]] = [shuffled[1], shuffled[0]]
    }

    setPhrases(shuffled)
    setShowFeedback(false)
  }

  // Native HTML5 drag-and-drop handlers
  const handleDragStart = (index: number) => {
    setDraggedIndex(index)
  }

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault()
    dragOverIndex.current = index
  }

  const handleDragEnd = () => {
    if (draggedIndex !== null && dragOverIndex.current !== null && draggedIndex !== dragOverIndex.current) {
      setPhrases(prev => {
        const newPhrases = [...prev]
        const [removed] = newPhrases.splice(draggedIndex, 1)
        newPhrases.splice(dragOverIndex.current!, 0, removed)
        return newPhrases
      })
    }
    setDraggedIndex(null)
    dragOverIndex.current = null
  }

  // Button-based reorder (fallback for touch devices)
  const movePhrase = (index: number, direction: 'up' | 'down') => {
    if (showFeedback) return
    const newIndex = direction === 'up' ? index - 1 : index + 1
    if (newIndex < 0 || newIndex >= phrases.length) return

    setPhrases(prev => {
      const newPhrases = [...prev]
      ;[newPhrases[index], newPhrases[newIndex]] = [newPhrases[newIndex], newPhrases[index]]
      return newPhrases
    })
  }

  const checkOrder = (): boolean => {
    return phrases.every((phrase, index) => phrase.originalIndex === index)
  }

  const handleSubmit = () => {
    if (gameState !== 'playing') return

    const isCorrect = checkOrder()
    setLastCorrect(isCorrect)
    setShowFeedback(true)

    if (currentAyah) {
      recordAttempt(currentAyah.surah, currentAyah.ayah, isCorrect, 0, 'phrase-chunks')
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

  // Map to QuranGameShell states
  const shellState = gameState === 'feedback' ? 'playing' as const : gameState

  return (
    <QuranGameShell
      title="Phrase Chunks"
      icon="🧩"
      onBack={onBack}
      state={shellState}
      sessionResults={sessionResults}
      perfectRun={perfectRun}
      onStart={startGame}
      onEndGame={() => setGameState('idle')}
      description="Arrange phrase chunks in the correct order. Unlike word order, these are meaningful phrase units - teaching you natural recitation rhythm and flow."
    >
      {/* PLAYING State */}
      {(gameState === 'playing' || gameState === 'feedback') && currentAyah && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ width: '100%', maxWidth: '42rem' }}
        >
          {/* Reference Display */}
          <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1.25rem', color: 'var(--color-accent)' }}>
              {getSurahName(currentAyah.surah)} : {currentAyah.ayah}
            </h2>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-muted-foreground)', marginTop: '0.25rem' }}>
              Arrange the phrases in correct order
            </p>
          </div>

          {/* Phrase Chunks */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
            {phrases.map((phrase, index) => (
              <div
                key={phrase.id}
                draggable={!showFeedback}
                onDragStart={() => handleDragStart(index)}
                onDragOver={(e) => handleDragOver(e, index)}
                onDragEnd={handleDragEnd}
                style={{
                  padding: '1rem',
                  background: 'var(--color-card)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '0.75rem',
                  cursor: showFeedback ? 'default' : 'grab',
                  transition: 'all 0.2s ease',
                  opacity: draggedIndex === index ? 0.5 : 1,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                }}
              >
                {/* Move buttons for touch */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.125rem', flexShrink: 0 }}>
                  <button
                    onClick={() => movePhrase(index, 'up')}
                    disabled={index === 0 || showFeedback}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: index === 0 || showFeedback ? 'default' : 'pointer',
                      padding: '0.125rem',
                      opacity: index === 0 || showFeedback ? 0.3 : 0.6,
                      color: 'var(--color-muted-foreground)',
                    }}
                  >
                    <ArrowUp size={14} />
                  </button>
                  <button
                    onClick={() => movePhrase(index, 'down')}
                    disabled={index === phrases.length - 1 || showFeedback}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: index === phrases.length - 1 || showFeedback ? 'default' : 'pointer',
                      padding: '0.125rem',
                      opacity: index === phrases.length - 1 || showFeedback ? 0.3 : 0.6,
                      color: 'var(--color-muted-foreground)',
                    }}
                  >
                    <ArrowDown size={14} />
                  </button>
                </div>

                <GripVertical size={16} style={{ color: 'var(--color-muted-foreground)', opacity: 0.4, flexShrink: 0 }} />

                <p className="font-arabic" style={{ fontSize: '1.125rem', textAlign: 'center', flex: 1 }} dir="rtl">
                  {phrase.text}
                </p>
              </div>
            ))}
          </div>

          {/* Submit Button */}
          {!showFeedback && (
            <button
              onClick={handleSubmit}
              className="btn-primary"
              style={{ width: '100%' }}
            >
              <Check size={18} />
              Check Order
            </button>
          )}

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
                      <span style={{ color: '#4ade80', fontWeight: 500 }}>Perfect order!</span>
                    </>
                  ) : (
                    <>
                      <X size={24} style={{ color: '#fb7185' }} />
                      <span style={{ color: '#fb7185', fontWeight: 500 }}>Not quite right</span>
                    </>
                  )}
                </div>

                {!lastCorrect && (
                  <div style={{ marginBottom: '1rem' }}>
                    <p style={{ fontSize: '0.875rem', color: 'var(--color-muted-foreground)', marginBottom: '0.5rem' }}>The correct order:</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      {originalPhrases.map((phrase, i) => (
                        <div key={i} style={{
                          padding: '0.75rem',
                          background: 'var(--color-secondary)',
                          borderRadius: '0.5rem',
                          border: '1px solid var(--color-border)',
                        }}>
                          <p className="font-arabic" dir="rtl">{phrase}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

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
