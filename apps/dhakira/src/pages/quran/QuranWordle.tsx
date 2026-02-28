import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Play, RotateCcw, X } from 'lucide-react'
import { useAyahMastery } from '../../hooks/quran'
import { getRandomWordWithContext, extractBaseLetters, isQuranWord } from '../../data/quran-data'
import { SURAH_DATA } from '../../data/quran-surah'
import type { AyahRange } from '../../types/quran'

interface QuranWordleProps {
  onBack: () => void
}

const MAX_GUESSES = 6
const DEFAULT_RANGES: AyahRange[] = [
  { surah: 1, startAyah: 1, endAyah: 7 },
  { surah: 2, startAyah: 1, endAyah: 286 },
  { surah: 3, startAyah: 1, endAyah: 200 },
  { surah: 4, startAyah: 1, endAyah: 176 },
  { surah: 5, startAyah: 1, endAyah: 120 },
]

type LetterStatus = 'correct' | 'present' | 'absent'

interface WordleGuess {
  letters: string[]  // Base letters of the guess
  result: LetterStatus[]
}

interface CurrentPuzzle {
  targetWord: string           // Original word with diacritics (for display)
  targetBaseLetters: string[]  // Base letters only (for comparison)
  surah: number
  ayah: number
  ayahWords: string[]
  wordIndex: number
}

// Arabic keyboard layout
const ARABIC_ROWS = [
  ['ض', 'ص', 'ث', 'ق', 'ف', 'غ', 'ع', 'ه', 'خ', 'ح', 'ج', 'د'],
  ['ش', 'س', 'ي', 'ب', 'ل', 'ا', 'ت', 'ن', 'م', 'ك', 'ط'],
  ['ئ', 'ء', 'ؤ', 'ر', 'لا', 'ى', 'ة', 'و', 'ز', 'ظ', 'ذ'],
]

export function QuranWordle({ onBack }: QuranWordleProps) {
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'won' | 'lost'>('idle')
  const [puzzle, setPuzzle] = useState<CurrentPuzzle | null>(null)
  const [guesses, setGuesses] = useState<WordleGuess[]>([])
  const [currentGuessLetters, setCurrentGuessLetters] = useState<string[]>([])
  const [letterStatuses, setLetterStatuses] = useState<Record<string, LetterStatus>>({})
  const [shake, setShake] = useState(false)
  const [message, setMessage] = useState('')
  const [gamesPlayed, setGamesPlayed] = useState(0)
  const [gamesWon, setGamesWon] = useState(0)
  const [questionStartTime, setQuestionStartTime] = useState<number>(0)

  const ranges = DEFAULT_RANGES
  const { recordAttempt } = useAyahMastery()

  // Generate a new puzzle
  const generatePuzzle = useCallback(() => {
    const minLength = 3
    const maxLength = 6

    const result = getRandomWordWithContext(ranges, minLength, maxLength)
    if (!result) {
      setMessage('No words found in selected range')
      return null
    }

    return {
      targetWord: result.word.word,
      targetBaseLetters: result.word.baseLetters,
      surah: result.word.surah,
      ayah: result.word.ayah,
      ayahWords: result.words,
      wordIndex: result.word.wordIndex,
    }
  }, [])

  const startGame = () => {
    const newPuzzle = generatePuzzle()
    if (newPuzzle) {
      setPuzzle(newPuzzle)
      setGuesses([])
      setCurrentGuessLetters([])
      setLetterStatuses({})
      setMessage('')
      setQuestionStartTime(Date.now())
      setGameState('playing')
    }
  }

  // Evaluate a guess against the target word using base letters
  const evaluateGuess = (guessLetters: string[]): LetterStatus[] => {
    if (!puzzle) return []

    const target = puzzle.targetBaseLetters
    const result: LetterStatus[] = new Array(guessLetters.length).fill('absent')
    const targetLetterCounts: Record<string, number> = {}

    // Count letters in target
    for (const letter of target) {
      targetLetterCounts[letter] = (targetLetterCounts[letter] || 0) + 1
    }

    // First pass: mark correct positions
    for (let i = 0; i < guessLetters.length; i++) {
      if (i < target.length && guessLetters[i] === target[i]) {
        result[i] = 'correct'
        targetLetterCounts[guessLetters[i]]--
      }
    }

    // Second pass: mark present letters
    for (let i = 0; i < guessLetters.length; i++) {
      if (result[i] !== 'correct') {
        const letter = guessLetters[i]
        if (targetLetterCounts[letter] && targetLetterCounts[letter] > 0) {
          result[i] = 'present'
          targetLetterCounts[letter]--
        }
      }
    }

    return result
  }

  // Update keyboard letter statuses
  const updateLetterStatuses = (guessLetters: string[], result: LetterStatus[]) => {
    const newStatuses = { ...letterStatuses }

    for (let i = 0; i < guessLetters.length; i++) {
      const letter = guessLetters[i]
      const status = result[i]

      // Only upgrade status, never downgrade
      if (status === 'correct') {
        newStatuses[letter] = 'correct'
      } else if (status === 'present' && newStatuses[letter] !== 'correct') {
        newStatuses[letter] = 'present'
      } else if (status === 'absent' && !newStatuses[letter]) {
        newStatuses[letter] = 'absent'
      }
    }

    setLetterStatuses(newStatuses)
  }

  const submitGuess = () => {
    if (!puzzle || gameState !== 'playing') return

    const targetLength = puzzle.targetBaseLetters.length

    // Validate guess length
    if (currentGuessLetters.length !== targetLength) {
      setShake(true)
      setMessage(`Word must be ${targetLength} letters`)
      setTimeout(() => setShake(false), 500)
      return
    }

    // Check if it's a valid Quran word
    const guessWord = currentGuessLetters.join('')
    if (!isQuranWord(guessWord)) {
      setShake(true)
      setMessage('Not a Quran word')
      setTimeout(() => setShake(false), 500)
      return
    }

    // Evaluate the guess
    const result = evaluateGuess(currentGuessLetters)
    const newGuess: WordleGuess = { letters: [...currentGuessLetters], result }
    const newGuesses = [...guesses, newGuess]
    setGuesses(newGuesses)
    updateLetterStatuses(currentGuessLetters, result)
    setCurrentGuessLetters([])
    setMessage('')

    // Check win/lose conditions
    const responseTime = Date.now() - questionStartTime
    const isCorrect = currentGuessLetters.join('') === puzzle.targetBaseLetters.join('')

    if (isCorrect) {
      setGameState('won')
      setGamesPlayed(prev => prev + 1)
      setGamesWon(prev => prev + 1)
      recordAttempt(puzzle.surah, puzzle.ayah, true, responseTime, 'quran-wordle')
    } else if (newGuesses.length >= MAX_GUESSES) {
      setGameState('lost')
      setGamesPlayed(prev => prev + 1)
      recordAttempt(puzzle.surah, puzzle.ayah, false, responseTime, 'quran-wordle', {
        expected: puzzle.targetWord,
        given: guessWord
      })
    }
  }

  const handleKeyPress = (letter: string) => {
    if (gameState !== 'playing' || !puzzle) return

    // Extract base letter from input (in case it has diacritics)
    const baseLetters = extractBaseLetters(letter)
    if (baseLetters.length === 0) return

    const baseLetter = baseLetters[0]

    if (currentGuessLetters.length < puzzle.targetBaseLetters.length) {
      setCurrentGuessLetters(prev => [...prev, baseLetter])
    }
  }

  const handleBackspace = () => {
    if (gameState !== 'playing') return
    setCurrentGuessLetters(prev => prev.slice(0, -1))
  }

  // Physical keyboard support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameState !== 'playing') return

      if (e.key === 'Enter') {
        submitGuess()
      } else if (e.key === 'Backspace') {
        handleBackspace()
      } else if (/[؀-ۿ]/.test(e.key)) {
        handleKeyPress(e.key)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [gameState, currentGuessLetters, puzzle])

  const getSurahName = (surah: number): string => {
    return SURAH_DATA[surah - 1]?.name || `Surah ${surah}`
  }

  // Render the ayah with the target word blanked out
  const renderAyahClue = () => {
    if (!puzzle) return null

    return (
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem', justifyContent: 'center', fontSize: '1.125rem' }} dir="rtl">
        {puzzle.ayahWords.map((word, idx) => (
          <span
            key={idx}
            className="font-arabic"
            style={idx === puzzle.wordIndex ? {
              padding: '0.25rem 0.5rem',
              background: 'rgba(197,162,83,0.15)', border: '1px solid rgba(197,162,83,0.3)',
              borderRadius: '0.25rem', color: 'var(--color-accent)',
            } : {
              color: 'var(--color-muted-foreground)',
            }}
          >
            {idx === puzzle.wordIndex ? '؟؟؟' : word}
          </span>
        ))}
      </div>
    )
  }

  const getLetterTileStyle = (status: LetterStatus | undefined): React.CSSProperties => {
    switch (status) {
      case 'correct':
        return { background: '#16a34a', borderColor: '#22c55e', color: 'white' }
      case 'present':
        return { background: 'var(--color-accent)', borderColor: 'var(--color-accent)', color: 'white' }
      case 'absent':
        return { background: 'var(--color-muted)', borderColor: 'var(--color-border)', color: 'var(--color-muted-foreground)' }
      default:
        return { background: 'var(--color-card)', borderColor: 'var(--color-border)', color: 'var(--color-foreground)' }
    }
  }

  // Render guess grid
  const renderGuessGrid = () => {
    if (!puzzle) return null

    const targetLength = puzzle.targetBaseLetters.length
    const rows: React.ReactNode[] = []

    for (let i = 0; i < MAX_GUESSES; i++) {
      const guess = guesses[i]
      const isCurrentRow = i === guesses.length && gameState === 'playing'

      if (guess) {
        // Submitted guess row
        rows.push(
          <div key={i} style={{ display: 'flex', gap: '0.25rem', justifyContent: 'center' }} dir="rtl">
            {guess.letters.map((letter, j) => (
              <motion.div
                key={j}
                initial={{ rotateX: 0 }}
                animate={{ rotateX: [0, 90, 0] }}
                transition={{ delay: j * 0.1, duration: 0.3 }}
                className="font-arabic"
                style={{
                  width: '3rem', height: '3rem',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.25rem', borderRadius: '0.5rem',
                  border: '2px solid',
                  ...getLetterTileStyle(guess.result[j]),
                }}
              >
                {letter}
              </motion.div>
            ))}
          </div>
        )
      } else if (isCurrentRow) {
        // Current input row
        rows.push(
          <motion.div
            key={i}
            animate={shake ? { x: [-10, 10, -10, 10, 0] } : {}}
            style={{ display: 'flex', gap: '0.25rem', justifyContent: 'center' }}
            dir="rtl"
          >
            {Array.from({ length: targetLength }).map((_, j) => (
              <div
                key={j}
                className="font-arabic"
                style={{
                  width: '3rem', height: '3rem',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.25rem', borderRadius: '0.5rem',
                  border: '2px solid',
                  background: currentGuessLetters[j] ? 'var(--color-secondary)' : 'var(--color-card)',
                  borderColor: currentGuessLetters[j] ? 'var(--color-foreground)' : 'var(--color-border)',
                  color: 'var(--color-foreground)',
                }}
              >
                {currentGuessLetters[j] || ''}
              </div>
            ))}
          </motion.div>
        )
      } else {
        // Empty row
        rows.push(
          <div key={i} style={{ display: 'flex', gap: '0.25rem', justifyContent: 'center' }} dir="rtl">
            {Array.from({ length: targetLength }).map((_, j) => (
              <div
                key={j}
                style={{
                  width: '3rem', height: '3rem',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  borderRadius: '0.5rem',
                  border: '2px solid var(--color-border)',
                  background: 'var(--color-card)',
                }}
              />
            ))}
          </div>
        )
      }
    }

    return <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>{rows}</div>
  }

  // Render Arabic keyboard
  const renderKeyboard = () => {
    const getKeyStyle = (letter: string): React.CSSProperties => {
      const status = letterStatuses[letter]
      const base: React.CSSProperties = {
        padding: '0.5rem 0.375rem',
        borderRadius: '0.375rem',
        border: '1px solid var(--color-border)',
        fontSize: '1rem',
        cursor: 'pointer',
        transition: 'all 0.15s ease',
        minWidth: '2rem',
        textAlign: 'center',
        fontFamily: 'var(--font-arabic)',
      }
      if (status === 'correct') return { ...base, background: '#16a34a', borderColor: '#22c55e', color: 'white' }
      if (status === 'present') return { ...base, background: 'var(--color-accent)', borderColor: 'var(--color-accent)', color: 'white' }
      if (status === 'absent') return { ...base, background: 'var(--color-muted)', borderColor: 'var(--color-border)', color: 'var(--color-muted-foreground)', opacity: 0.5 }
      return { ...base, background: 'var(--color-secondary)', color: 'var(--color-foreground)' }
    }

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem', alignItems: 'center' }}>
        {ARABIC_ROWS.map((row, rowIdx) => (
          <div key={rowIdx} style={{ display: 'flex', gap: '0.25rem', justifyContent: 'center' }} dir="rtl">
            {rowIdx === 2 && (
              <button
                onClick={submitGuess}
                style={{
                  padding: '0.5rem 0.75rem', borderRadius: '0.375rem',
                  background: 'var(--color-accent)', border: '1px solid var(--color-accent)',
                  color: 'white', fontSize: '0.75rem', cursor: 'pointer', fontWeight: 600,
                }}
              >
                Enter
              </button>
            )}
            {row.map((letter) => (
              <button
                key={letter}
                onClick={() => handleKeyPress(letter)}
                style={getKeyStyle(letter)}
              >
                {letter}
              </button>
            ))}
            {rowIdx === 2 && (
              <button
                onClick={handleBackspace}
                style={{
                  padding: '0.5rem 0.75rem', borderRadius: '0.375rem',
                  background: 'var(--color-secondary)', border: '1px solid var(--color-border)',
                  color: 'var(--color-foreground)', fontSize: '0.75rem', cursor: 'pointer', fontWeight: 600,
                }}
              >
                &#9003;
              </button>
            )}
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="game-page">
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
        <button className="back-btn" onClick={onBack}>
          <ArrowLeft size={18} />
        </button>
        <div>
          <h2 style={{ margin: 0 }}>Quran Wordle</h2>
          <p style={{ color: 'var(--color-muted-foreground)', fontSize: '0.875rem', margin: 0 }}>
            {gamesPlayed > 0 ? `${gamesWon}/${gamesPlayed} won` : 'Guess the hidden word'}
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
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔤</div>
              <h2 style={{ marginBottom: '1rem' }}>Quran Wordle</h2>
              <p style={{ color: 'var(--color-muted-foreground)', marginBottom: '1.5rem', maxWidth: '28rem' }}>
                Guess the missing word from the ayah in 6 tries.
                Green = correct position, Yellow = wrong position.
              </p>
              <button className="btn-primary" onClick={startGame} style={{ padding: '1rem 2rem', fontSize: '1.125rem' }}>
                <Play size={24} />
                Start Game
              </button>
            </div>
          </motion.div>
        )}

        {/* PLAYING State */}
        {gameState === 'playing' && puzzle && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ width: '100%', maxWidth: '32rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
          >
            {/* Reference & Clue */}
            <div style={{ textAlign: 'center', marginBottom: '1.5rem', width: '100%' }}>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: 'var(--color-accent)', marginBottom: '0.5rem' }}>
                {getSurahName(puzzle.surah)} : {puzzle.ayah}
              </h3>
              <div className="glass-card" style={{ padding: '1rem', marginBottom: '0.5rem' }}>
                {renderAyahClue()}
              </div>
              <p style={{ color: 'var(--color-muted-foreground)', fontSize: '0.875rem', margin: 0 }}>
                {puzzle.targetBaseLetters.length} letters
              </p>
            </div>

            {/* Message */}
            <AnimatePresence>
              {message && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  style={{ color: '#fb7185', fontSize: '0.875rem', marginBottom: '1rem' }}
                >
                  {message}
                </motion.p>
              )}
            </AnimatePresence>

            {/* Guess Grid */}
            <div style={{ marginBottom: '1.5rem' }}>
              {renderGuessGrid()}
            </div>

            {/* Keyboard */}
            {renderKeyboard()}
          </motion.div>
        )}

        {/* WON / LOST State */}
        {(gameState === 'won' || gameState === 'lost') && puzzle && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="glass-card" style={{ padding: '2rem', textAlign: 'center', maxWidth: '28rem', margin: '0 auto' }}>
              <h2 style={{
                marginBottom: '1rem',
                color: gameState === 'won' ? '#4ade80' : '#fb7185',
              }}>
                {gameState === 'won' ? 'Correct!' : 'Not this time'}
              </h2>

              {/* Show the answer */}
              <div style={{ marginBottom: '1.5rem' }}>
                <p style={{ color: 'var(--color-muted-foreground)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>The word was:</p>
                <p className="font-arabic" style={{ fontSize: '1.875rem', margin: 0 }} dir="rtl">
                  {puzzle.targetWord}
                </p>
                <p style={{ color: 'var(--color-muted-foreground)', fontSize: '0.75rem', marginTop: '0.25rem' }} dir="rtl">
                  ({puzzle.targetBaseLetters.join(' ')})
                </p>
                <p style={{ color: 'var(--color-muted-foreground)', fontSize: '0.875rem', marginTop: '0.5rem' }}>
                  {getSurahName(puzzle.surah)} : {puzzle.ayah}
                </p>
              </div>

              {/* Stats */}
              {gameState === 'won' && (
                <div className="glass-card" style={{ padding: '1rem', marginBottom: '1.5rem' }}>
                  <p style={{ color: 'var(--color-muted-foreground)', fontSize: '0.875rem', margin: 0 }}>Guessed in</p>
                  <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', margin: 0 }}>
                    {guesses.length} {guesses.length === 1 ? 'try' : 'tries'}
                  </p>
                </div>
              )}

              {/* Guess History */}
              <div style={{ marginBottom: '1.5rem' }}>
                {renderGuessGrid()}
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
