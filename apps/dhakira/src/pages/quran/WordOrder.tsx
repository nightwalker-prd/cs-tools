import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, X } from 'lucide-react'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import type { DragEndEvent } from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  horizontalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { shuffle } from '@arabtools/core'
import { useQuranGame, useQuranDataLoader } from '../../hooks/quran'
import { getAyah } from '../../data/quran-data'
import { SURAH_DATA } from '../../data/quran-surah'
import { QuranGameShell } from '../../components/quran/QuranGameShell'
import type { QuranGameMode, AyahRange } from '../../types/quran'

interface WordOrderProps {
  onBack: () => void
  mode?: QuranGameMode
  timedMode?: boolean
  selectedRanges?: AyahRange[]
}

interface SortableWord {
  id: string
  word: string
  originalIndex: number
}

interface SortableItemProps {
  id: string
  word: string
  disabled: boolean
}

function SortableItem({ id, word, disabled }: SortableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id, disabled })

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    padding: '0.5rem 1rem',
    borderRadius: '8px',
    fontSize: '1.125rem',
    userSelect: 'none',
    background: isDragging
      ? 'var(--color-accent)'
      : 'var(--color-secondary)',
    color: isDragging
      ? 'var(--color-accent-foreground)'
      : 'var(--color-foreground)',
    border: isDragging
      ? '1px solid var(--color-accent)'
      : '1px solid var(--color-border)',
    cursor: disabled ? 'default' : isDragging ? 'grabbing' : 'grab',
    boxShadow: isDragging ? '0 4px 16px rgba(0,0,0,0.15)' : 'none',
    zIndex: isDragging ? 10 : 'auto',
    fontFamily: 'var(--font-arabic)',
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      dir="rtl"
    >
      {word}
    </div>
  )
}

export function WordOrder({ onBack, mode = 'practice-any', timedMode = false, selectedRanges = [] }: WordOrderProps) {
  const { loading, error, isReady } = useQuranDataLoader()
  const [words, setWords] = useState<SortableWord[]>([])
  const [showFeedback, setShowFeedback] = useState(false)
  const [lastCorrect, setLastCorrect] = useState(false)

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

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
    gameType: 'word-order',
    mode,
    timedMode,
    selectedRanges,
  })

  // Generate shuffled words when question changes
  useEffect(() => {
    if (state === 'playing' && currentQuestion) {
      const ayahData = getAyah(currentQuestion.surah, currentQuestion.ayah)
      if (ayahData) {
        // Take first 6-10 words for manageable game
        const wordCount = Math.min(ayahData.w.length, Math.max(6, Math.floor(ayahData.w.length * 0.5)))
        const selectedWords = ayahData.w.slice(0, wordCount)

        const sortableWords: SortableWord[] = selectedWords.map((word, idx) => ({
          id: `word-${idx}`,
          word,
          originalIndex: idx,
        }))

        // Shuffle
        let shuffled = shuffle([...sortableWords])

        // Make sure it's not already in correct order
        let attempts = 0
        while (
          attempts < 10 &&
          shuffled.every((w, i) => w.originalIndex === i)
        ) {
          shuffled = shuffle([...sortableWords])
          attempts++
        }

        setWords(shuffled)
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

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (over && active.id !== over.id) {
      setWords(items => {
        const oldIndex = items.findIndex(item => item.id === active.id)
        const newIndex = items.findIndex(item => item.id === over.id)
        return arrayMove(items, oldIndex, newIndex)
      })
    }
  }

  const checkOrder = (): boolean => {
    return words.every((word, index) => word.originalIndex === index)
  }

  const handleSubmit = () => {
    if (!currentQuestion || state !== 'playing') return

    const isCorrect = checkOrder()
    setLastCorrect(isCorrect)
    setShowFeedback(true)

    const userAnswer = words.map(w => w.word).join(' ')
    submitAnswer(userAnswer, isCorrect)
  }

  const handleNext = () => {
    setShowFeedback(false)
    setWords([])
    nextQuestion()
  }

  const getSurahName = (surah: number): string => {
    return SURAH_DATA[surah - 1]?.name || `Surah ${surah}`
  }

  const getCorrectOrder = (): string => {
    if (!currentQuestion) return ''
    const ayahData = getAyah(currentQuestion.surah, currentQuestion.ayah)
    if (!ayahData) return ''
    const wordCount = Math.min(ayahData.w.length, Math.max(6, Math.floor(ayahData.w.length * 0.5)))
    return ayahData.w.slice(0, wordCount).join(' ')
  }

  return (
    <QuranGameShell
      title="Word Order"
      icon="🔀"
      onBack={onBack}
      state={showFeedback ? 'feedback' : state}
      sessionResults={sessionResults}
      perfectRun={perfectRun}
      onStart={startGame}
      onEndGame={endGame}
      description="Drag the words into the correct order to reconstruct the ayah. Test your word sequence memory!"
    >
      {currentQuestion && (
        <div style={{ width: '100%', maxWidth: '42rem', margin: '0 auto' }}>
          {/* Reference Display */}
          <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1.5rem', color: 'var(--color-accent)' }}>
              {getSurahName(currentQuestion.surah)} : {currentQuestion.ayah}
            </h2>
            <p style={{ color: 'var(--color-muted-foreground)', fontSize: '0.875rem', marginTop: '0.5rem' }}>
              Arrange the {words.length} words in correct order
            </p>
          </div>

          {/* Draggable words */}
          <div className="glass-card" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={words.map(w => w.id)}
                strategy={horizontalListSortingStrategy}
              >
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', justifyContent: 'center' }} dir="rtl">
                  {words.map(word => (
                    <SortableItem
                      key={word.id}
                      id={word.id}
                      word={word.word}
                      disabled={showFeedback}
                    />
                  ))}
                </div>
              </SortableContext>
            </DndContext>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={showFeedback}
            className="btn-primary"
            style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
          >
            <Check size={18} />
            Submit Order
          </button>

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

                {/* Show correct order */}
                <div style={{ marginBottom: '1rem' }}>
                  <p style={{ color: 'var(--color-muted-foreground)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>Correct order:</p>
                  <p className="font-arabic" style={{ fontSize: '1.125rem' }} dir="rtl">
                    {getCorrectOrder()}
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
