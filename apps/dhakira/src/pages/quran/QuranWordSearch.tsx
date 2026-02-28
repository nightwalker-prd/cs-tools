import { useState, useCallback, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Play, RotateCcw, X, Check } from 'lucide-react'
import { shuffle } from '@arabtools/core'
import { useAyahMastery } from '../../hooks/quran'
import { getWordsFromRanges, getRandomArabicLetters } from '../../data/quran-data'
import { SURAH_DATA } from '../../data/quran-surah'
import type { AyahRange } from '../../types/quran'

interface QuranWordSearchProps {
  onBack: () => void
}

const GRID_SIZE = 10
const WORDS_TO_FIND = 6
const DEFAULT_RANGES: AyahRange[] = [
  { surah: 1, startAyah: 1, endAyah: 7 },
  { surah: 2, startAyah: 1, endAyah: 286 },
  { surah: 3, startAyah: 1, endAyah: 200 },
  { surah: 4, startAyah: 1, endAyah: 176 },
  { surah: 5, startAyah: 1, endAyah: 120 },
]

type Direction = 'horizontal' | 'vertical' | 'diagonal'

interface PlacedWord {
  word: string              // Original word with diacritics (for display)
  baseLetters: string[]     // Base letters only (for grid & matching)
  surah: number
  ayah: number
  startRow: number
  startCol: number
  direction: Direction
  found: boolean
}

interface GridCell {
  letter: string
  wordIndices: number[] // Which words this cell belongs to
  isSelected: boolean
  isFound: boolean
}

interface SelectionState {
  startRow: number
  startCol: number
  endRow: number
  endCol: number
}

export function QuranWordSearch({ onBack }: QuranWordSearchProps) {
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'complete'>('idle')
  const [grid, setGrid] = useState<GridCell[][]>([])
  const [placedWords, setPlacedWords] = useState<PlacedWord[]>([])
  const [selection, setSelection] = useState<SelectionState | null>(null)
  const [isSelecting, setIsSelecting] = useState(false)
  const [startTime, setStartTime] = useState<number>(0)
  const [elapsedTime, setElapsedTime] = useState<number>(0)
  const gridRef = useRef<HTMLDivElement>(null)

  const ranges = DEFAULT_RANGES
  const { recordAttempt } = useAyahMastery()

  // Timer
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>
    if (gameState === 'playing') {
      interval = setInterval(() => {
        setElapsedTime(Date.now() - startTime)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [gameState, startTime])

  // Generate the puzzle grid
  const generateGrid = useCallback((): { grid: GridCell[][]; words: PlacedWord[] } => {
    // Get all available words (already has baseLetters extracted)
    const allWords = getWordsFromRanges(ranges)

    // Filter to reasonable lengths (3-7 base letters) and shuffle
    const eligibleWords = shuffle(
      allWords.filter(w => w.baseLetters.length >= 3 && w.baseLetters.length <= 7)
    )

    // Initialize empty grid
    const newGrid: GridCell[][] = Array.from({ length: GRID_SIZE }, () =>
      Array.from({ length: GRID_SIZE }, () => ({
        letter: '',
        wordIndices: [],
        isSelected: false,
        isFound: false,
      }))
    )

    const placed: PlacedWord[] = []
    const directions: Direction[] = ['horizontal', 'vertical', 'diagonal']

    // Try to place words
    for (const wordData of eligibleWords) {
      if (placed.length >= WORDS_TO_FIND) break

      const baseLetters = wordData.baseLetters
      const wordLen = baseLetters.length

      // Shuffle directions for variety
      const shuffledDirs = shuffle([...directions])

      for (const direction of shuffledDirs) {
        // Calculate valid starting positions
        let maxRow = GRID_SIZE
        let maxCol = GRID_SIZE

        if (direction === 'horizontal') {
          maxCol = GRID_SIZE - wordLen + 1
        } else if (direction === 'vertical') {
          maxRow = GRID_SIZE - wordLen + 1
        } else {
          maxRow = GRID_SIZE - wordLen + 1
          maxCol = GRID_SIZE - wordLen + 1
        }

        if (maxRow <= 0 || maxCol <= 0) continue

        // Try random positions
        const attempts = 50
        for (let attempt = 0; attempt < attempts; attempt++) {
          const startRow = Math.floor(Math.random() * maxRow)
          const startCol = Math.floor(Math.random() * maxCol)

          // Check if word fits
          let canPlace = true
          const positions: { row: number; col: number }[] = []

          for (let i = 0; i < wordLen; i++) {
            let row = startRow
            let col = startCol

            if (direction === 'horizontal') {
              col = startCol + i
            } else if (direction === 'vertical') {
              row = startRow + i
            } else {
              row = startRow + i
              col = startCol + i
            }

            positions.push({ row, col })
            const cell = newGrid[row][col]

            // Cell must be empty or have the same letter
            if (cell.letter !== '' && cell.letter !== baseLetters[i]) {
              canPlace = false
              break
            }
          }

          if (canPlace) {
            // Place the word using base letters
            const wordIndex = placed.length
            for (let i = 0; i < wordLen; i++) {
              const { row, col } = positions[i]
              newGrid[row][col].letter = baseLetters[i]
              newGrid[row][col].wordIndices.push(wordIndex)
            }

            placed.push({
              word: wordData.word,
              baseLetters: baseLetters,
              surah: wordData.surah,
              ayah: wordData.ayah,
              startRow,
              startCol,
              direction,
              found: false,
            })
            break
          }
        }

        if (placed.length > 0 && placed[placed.length - 1].word === wordData.word) {
          break // Word was placed, move to next word
        }
      }
    }

    // Fill remaining empty cells with random Arabic letters
    const randomLetters = getRandomArabicLetters(GRID_SIZE * GRID_SIZE)
    let letterIndex = 0
    for (let row = 0; row < GRID_SIZE; row++) {
      for (let col = 0; col < GRID_SIZE; col++) {
        if (newGrid[row][col].letter === '') {
          newGrid[row][col].letter = randomLetters[letterIndex++]
        }
      }
    }

    return { grid: newGrid, words: placed }
  }, [])

  const startGame = () => {
    const { grid: newGrid, words } = generateGrid()
    setGrid(newGrid)
    setPlacedWords(words)
    setSelection(null)
    setStartTime(Date.now())
    setElapsedTime(0)
    setGameState('playing')
  }

  // Get cells in a straight line between two points
  const getCellsBetween = (start: { row: number; col: number }, end: { row: number; col: number }): { row: number; col: number }[] => {
    const cells: { row: number; col: number }[] = []

    const rowDiff = end.row - start.row
    const colDiff = end.col - start.col
    const steps = Math.max(Math.abs(rowDiff), Math.abs(colDiff))

    if (steps === 0) {
      cells.push(start)
      return cells
    }

    // Check if it's a valid direction (horizontal, vertical, or diagonal)
    const rowStep = rowDiff / steps
    const colStep = colDiff / steps

    // Only allow straight lines
    if (![0, 1, -1].includes(rowStep) || ![0, 1, -1].includes(colStep)) {
      return []
    }

    for (let i = 0; i <= steps; i++) {
      cells.push({
        row: start.row + Math.round(i * rowStep),
        col: start.col + Math.round(i * colStep),
      })
    }

    return cells
  }

  // Check if selection matches any word
  const checkSelection = (cells: { row: number; col: number }[]) => {
    if (cells.length === 0) return

    // Build the selected letters (both directions)
    const selectedLetters = cells.map(c => grid[c.row][c.col].letter)
    const reversedLetters = [...selectedLetters].reverse()

    // Check against placed words using base letters
    let foundWordIndex = -1
    for (let i = 0; i < placedWords.length; i++) {
      const pw = placedWords[i]
      if (!pw.found) {
        const baseStr = pw.baseLetters.join('')
        const selectedStr = selectedLetters.join('')
        const reversedStr = reversedLetters.join('')
        if (baseStr === selectedStr || baseStr === reversedStr) {
          foundWordIndex = i
          break
        }
      }
    }

    if (foundWordIndex >= 0) {
      // Mark word as found
      const newPlacedWords = [...placedWords]
      newPlacedWords[foundWordIndex].found = true
      setPlacedWords(newPlacedWords)

      // Mark cells as found
      const newGrid = grid.map(row => row.map(cell => ({ ...cell })))
      for (const { row, col } of cells) {
        newGrid[row][col].isFound = true
      }
      setGrid(newGrid)

      // Record attempt - use elapsed time as response time
      const word = newPlacedWords[foundWordIndex]
      recordAttempt(word.surah, word.ayah, true, elapsedTime, 'quran-word-search')

      // Check if all words found
      if (newPlacedWords.every(w => w.found)) {
        setGameState('complete')
      }
    }
  }

  // Handle cell selection
  const handleCellMouseDown = (row: number, col: number) => {
    if (gameState !== 'playing') return
    setIsSelecting(true)
    setSelection({ startRow: row, startCol: col, endRow: row, endCol: col })

    // Update visual selection
    const newGrid = grid.map((r, ri) =>
      r.map((c, ci) => ({
        ...c,
        isSelected: ri === row && ci === col,
      }))
    )
    setGrid(newGrid)
  }

  const handleCellMouseEnter = (row: number, col: number) => {
    if (!isSelecting || gameState !== 'playing' || !selection) return

    const newSelection = { ...selection, endRow: row, endCol: col }
    setSelection(newSelection)

    // Get cells in the line and update visual selection
    const cells = getCellsBetween(
      { row: selection.startRow, col: selection.startCol },
      { row, col }
    )

    const cellSet = new Set(cells.map(c => `${c.row},${c.col}`))
    const newGrid = grid.map((r, ri) =>
      r.map((c, ci) => ({
        ...c,
        isSelected: cellSet.has(`${ri},${ci}`),
      }))
    )
    setGrid(newGrid)
  }

  const handleCellMouseUp = () => {
    if (!isSelecting || !selection) return
    setIsSelecting(false)

    // Get final selection and check for word
    const cells = getCellsBetween(
      { row: selection.startRow, col: selection.startCol },
      { row: selection.endRow, col: selection.endCol }
    )
    checkSelection(cells)

    // Clear selection visual
    setSelection(null)
    const newGrid = grid.map(r =>
      r.map(c => ({
        ...c,
        isSelected: false,
      }))
    )
    setGrid(newGrid)
  }

  // Touch handlers
  const handleTouchStart = (row: number, col: number) => {
    handleCellMouseDown(row, col)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!gridRef.current || !isSelecting) return

    const touch = e.touches[0]
    const gridRect = gridRef.current.getBoundingClientRect()
    const cellSize = gridRect.width / GRID_SIZE

    const col = Math.floor((touch.clientX - gridRect.left) / cellSize)
    const row = Math.floor((touch.clientY - gridRect.top) / cellSize)

    if (row >= 0 && row < GRID_SIZE && col >= 0 && col < GRID_SIZE) {
      handleCellMouseEnter(row, col)
    }
  }

  const getSurahName = (surah: number): string => {
    return SURAH_DATA[surah - 1]?.name || `Surah ${surah}`
  }

  const formatTime = (ms: number): string => {
    const seconds = Math.floor(ms / 1000)
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const foundCount = placedWords.filter(w => w.found).length

  const getCellStyle = (cell: GridCell): React.CSSProperties => {
    if (cell.isFound) {
      return {
        background: 'rgba(34,197,94,0.3)',
        color: '#4ade80',
      }
    }
    if (cell.isSelected) {
      return {
        background: 'rgba(197,162,83,0.3)',
        color: 'var(--color-accent)',
      }
    }
    return {
      background: 'var(--color-secondary)',
      color: 'var(--color-foreground)',
    }
  }

  return (
    <div className="game-page">
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
        <button className="back-btn" onClick={onBack}>
          <ArrowLeft size={18} />
        </button>
        <div style={{ flex: 1 }}>
          <h2 style={{ margin: 0 }}>Word Search</h2>
          <p style={{ color: 'var(--color-muted-foreground)', fontSize: '0.875rem', margin: 0 }}>
            {gameState === 'playing' ? `${foundCount}/${placedWords.length} found • ${formatTime(elapsedTime)}` : 'Find Quranic words in the grid'}
          </p>
        </div>
      </div>

      {/* Game Area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        {/* IDLE State */}
        {gameState === 'idle' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{ textAlign: 'center' }}
          >
            <div className="glass-card" style={{ padding: '2rem', maxWidth: '500px', margin: '0 auto' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</div>
              <h2 style={{ marginBottom: '1rem' }}>Word Search</h2>
              <p style={{ color: 'var(--color-muted-foreground)', marginBottom: '1.5rem', maxWidth: '28rem' }}>
                Find {WORDS_TO_FIND} hidden Quranic words in the grid.
                Words can go horizontally, vertically, or diagonally.
              </p>
              <button className="btn-primary" onClick={startGame} style={{ padding: '1rem 2rem', fontSize: '1.125rem' }}>
                <Play size={24} />
                Start Game
              </button>
            </div>
          </motion.div>
        )}

        {/* PLAYING State */}
        {gameState === 'playing' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ width: '100%', maxWidth: '32rem' }}
          >
            {/* Word List */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem', justifyContent: 'center' }}>
              {placedWords.map((pw, idx) => (
                <span
                  key={idx}
                  className="font-arabic"
                  style={{
                    padding: '0.25rem 0.75rem', borderRadius: '0.5rem', fontSize: '0.875rem',
                    background: pw.found ? 'rgba(34,197,94,0.2)' : 'var(--color-secondary)',
                    color: pw.found ? '#4ade80' : 'var(--color-foreground)',
                    textDecoration: pw.found ? 'line-through' : 'none',
                  }}
                  dir="rtl"
                >
                  {pw.word}
                </span>
              ))}
            </div>

            {/* Grid */}
            <div
              ref={gridRef}
              className="glass-card"
              style={{ padding: '0.5rem', userSelect: 'none', touchAction: 'none' }}
              onMouseUp={handleCellMouseUp}
              onMouseLeave={() => {
                if (isSelecting) handleCellMouseUp()
              }}
              onTouchEnd={handleCellMouseUp}
              onTouchMove={handleTouchMove}
            >
              <div
                style={{
                  display: 'grid', gap: '2px',
                  gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
                }}
                dir="rtl"
              >
                {grid.map((row, rowIdx) =>
                  row.map((cell, colIdx) => (
                    <div
                      key={`${rowIdx}-${colIdx}`}
                      onMouseDown={() => handleCellMouseDown(rowIdx, colIdx)}
                      onMouseEnter={() => handleCellMouseEnter(rowIdx, colIdx)}
                      onTouchStart={() => handleTouchStart(rowIdx, colIdx)}
                      className="font-arabic"
                      style={{
                        aspectRatio: '1',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '1.125rem', borderRadius: '0.25rem',
                        cursor: 'pointer', transition: 'background 0.15s ease',
                        ...getCellStyle(cell),
                      }}
                    >
                      {cell.letter}
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Instructions */}
            <p style={{ color: 'var(--color-muted-foreground)', fontSize: '0.75rem', textAlign: 'center', marginTop: '1rem' }}>
              Drag to select words (horizontal, vertical, or diagonal)
            </p>
          </motion.div>
        )}

        {/* COMPLETE State */}
        {gameState === 'complete' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="glass-card" style={{ padding: '2rem', textAlign: 'center', maxWidth: '28rem', margin: '0 auto' }}>
              <h2 style={{ color: '#4ade80', marginBottom: '1rem' }}>
                <Check style={{ display: 'inline-block', marginRight: '0.5rem', verticalAlign: 'middle' }} size={32} />
                All Found!
              </h2>

              {/* Stats */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                <div className="glass-card" style={{ padding: '1rem' }}>
                  <p style={{ color: 'var(--color-muted-foreground)', fontSize: '0.875rem', margin: 0 }}>Time</p>
                  <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', margin: 0 }}>
                    {formatTime(elapsedTime)}
                  </p>
                </div>
                <div className="glass-card" style={{ padding: '1rem' }}>
                  <p style={{ color: 'var(--color-muted-foreground)', fontSize: '0.875rem', margin: 0 }}>Words</p>
                  <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', margin: 0 }}>
                    {placedWords.length}
                  </p>
                </div>
              </div>

              {/* Words found with references */}
              <div className="glass-card" style={{ padding: '1rem', marginBottom: '1.5rem' }}>
                <p style={{ color: 'var(--color-muted-foreground)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>Words from:</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center' }}>
                  {placedWords.map((pw, idx) => (
                    <span key={idx} style={{ color: 'var(--color-muted-foreground)', fontSize: '0.75rem' }}>
                      {getSurahName(pw.surah)}:{pw.ayah}
                    </span>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button className="btn-primary" onClick={startGame} style={{ flex: 1 }}>
                  <RotateCcw size={18} />
                  Play Again
                </button>
                <button className="btn-secondary" onClick={onBack} style={{ flex: 1 }}>
                  <X size={18} />
                  Exit
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
