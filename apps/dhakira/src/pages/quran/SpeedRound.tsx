import { useState, useEffect, useCallback, useRef } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Play, Zap, RotateCcw, X, Flame } from 'lucide-react'
import { shuffle } from '@arabtools/core'
import { getAyah, getFirstWords, getRandomWord } from '../../data/quran-data'
import { SURAH_DATA } from '../../data/quran-surah'
import type { AyahRange } from '../../types/quran'

interface SpeedRoundProps {
  onBack: () => void
}

type QuestionType = 'which-surah' | 'first-word' | 'what-comes-next'

interface Question {
  type: QuestionType
  surah: number
  ayah: number
  questionText: string
  correctAnswer: string
  options: string[]
}

type GameState = 'idle' | 'playing' | 'complete'

const GAME_DURATION = 60 // seconds
const STREAK_BONUS_THRESHOLD = 3

const DEFAULT_RANGES: AyahRange[] = [
  { surah: 1, startAyah: 1, endAyah: 7 },
  { surah: 2, startAyah: 1, endAyah: 286 },
  { surah: 3, startAyah: 1, endAyah: 200 },
  { surah: 4, startAyah: 1, endAyah: 176 },
  { surah: 5, startAyah: 1, endAyah: 120 },
]

export function SpeedRound({ onBack }: SpeedRoundProps) {
  const [gameState, setGameState] = useState<GameState>('idle')
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION)
  const [score, setScore] = useState(0)
  const [streak, setStreak] = useState(0)
  const [bestStreak, setBestStreak] = useState(0)
  const [questionsAnswered, setQuestionsAnswered] = useState(0)
  const [correctAnswers, setCorrectAnswers] = useState(0)
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const feedbackTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const selectedRanges = DEFAULT_RANGES

  // Get available ayahs from selected ranges
  const getAvailableAyahs = useCallback((): Array<{ surah: number; ayah: number }> => {
    const ayahs: Array<{ surah: number; ayah: number }> = []
    for (const range of selectedRanges) {
      for (let ayah = range.startAyah; ayah <= range.endAyah; ayah++) {
        ayahs.push({ surah: range.surah, ayah })
      }
    }
    return ayahs
  }, [])

  // Get unique surahs from available ayahs
  const getUniqueSurahs = useCallback((): number[] => {
    const ayahs = getAvailableAyahs()
    const surahSet = new Set(ayahs.map(a => a.surah))
    return Array.from(surahSet)
  }, [getAvailableAyahs])

  // Generate question of type "Which surah?"
  const generateWhichSurahQuestion = useCallback((): Question | null => {
    const ayahs = getAvailableAyahs()
    if (ayahs.length === 0) return null

    const randomIndex = Math.floor(Math.random() * ayahs.length)
    const { surah, ayah } = ayahs[randomIndex]

    const ayahData = getAyah(surah, ayah)
    if (!ayahData) return null

    const correctSurahName = SURAH_DATA[surah - 1]?.name || `Surah ${surah}`

    // Get 3 wrong surah names
    const availableSurahs = getUniqueSurahs()
    const wrongSurahs = availableSurahs
      .filter(s => s !== surah)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map(s => SURAH_DATA[s - 1]?.name || `Surah ${s}`)

    // If not enough wrong options, add from other surahs
    while (wrongSurahs.length < 3) {
      const randomSurah = Math.floor(Math.random() * 114) + 1
      const name = SURAH_DATA[randomSurah - 1]?.name
      if (name && name !== correctSurahName && !wrongSurahs.includes(name)) {
        wrongSurahs.push(name)
      }
    }

    const options = shuffle([correctSurahName, ...wrongSurahs.slice(0, 3)])

    return {
      type: 'which-surah',
      surah,
      ayah,
      questionText: ayahData.t,
      correctAnswer: correctSurahName,
      options,
    }
  }, [getAvailableAyahs, getUniqueSurahs])

  // Generate question of type "First word?"
  const generateFirstWordQuestion = useCallback((): Question | null => {
    const ayahs = getAvailableAyahs()
    if (ayahs.length === 0) return null

    const randomIndex = Math.floor(Math.random() * ayahs.length)
    const { surah, ayah } = ayahs[randomIndex]

    const firstWords = getFirstWords(surah, ayah, 1)
    if (firstWords.length === 0) return null

    const correctAnswer = firstWords[0]
    const surahName = SURAH_DATA[surah - 1]?.name || `Surah ${surah}`

    // Get 3 wrong first words from other ayahs
    const wrongWords: string[] = []
    const attempts = 20
    for (let i = 0; i < attempts && wrongWords.length < 3; i++) {
      const word = getRandomWord(surah)
      if (word && word !== correctAnswer && !wrongWords.includes(word)) {
        wrongWords.push(word)
      }
    }

    // Fallback: use random words
    while (wrongWords.length < 3) {
      const word = getRandomWord()
      if (word && word !== correctAnswer && !wrongWords.includes(word)) {
        wrongWords.push(word)
      }
    }

    const options = shuffle([correctAnswer, ...wrongWords.slice(0, 3)])

    return {
      type: 'first-word',
      surah,
      ayah,
      questionText: `${surahName} : ${ayah}`,
      correctAnswer,
      options,
    }
  }, [getAvailableAyahs])

  // Generate question of type "What comes next?"
  const generateWhatComesNextQuestion = useCallback((): Question | null => {
    const ayahs = getAvailableAyahs()
    if (ayahs.length === 0) return null

    // Filter ayahs that have a next ayah in the same surah
    const validAyahs = ayahs.filter(({ surah, ayah }) => {
      const surahData = SURAH_DATA[surah - 1]
      return surahData && ayah < surahData.ayahCount
    })

    if (validAyahs.length === 0) return null

    const randomIndex = Math.floor(Math.random() * validAyahs.length)
    const { surah, ayah } = validAyahs[randomIndex]

    const currentAyahData = getAyah(surah, ayah)
    if (!currentAyahData) return null

    const nextAyahFirstWords = getFirstWords(surah, ayah + 1, 1)
    if (nextAyahFirstWords.length === 0) return null

    const correctAnswer = nextAyahFirstWords[0]

    // Get 3 wrong options
    const wrongWords: string[] = []
    const attempts = 20
    for (let i = 0; i < attempts && wrongWords.length < 3; i++) {
      const word = getRandomWord(surah)
      if (word && word !== correctAnswer && !wrongWords.includes(word)) {
        wrongWords.push(word)
      }
    }

    while (wrongWords.length < 3) {
      const word = getRandomWord()
      if (word && word !== correctAnswer && !wrongWords.includes(word)) {
        wrongWords.push(word)
      }
    }

    const options = shuffle([correctAnswer, ...wrongWords.slice(0, 3)])

    return {
      type: 'what-comes-next',
      surah,
      ayah,
      questionText: currentAyahData.t,
      correctAnswer,
      options,
    }
  }, [getAvailableAyahs])

  // Generate a random question
  const generateQuestion = useCallback((): Question | null => {
    const questionTypes: QuestionType[] = ['which-surah', 'first-word', 'what-comes-next']
    const randomType = questionTypes[Math.floor(Math.random() * questionTypes.length)]

    switch (randomType) {
      case 'which-surah':
        return generateWhichSurahQuestion()
      case 'first-word':
        return generateFirstWordQuestion()
      case 'what-comes-next':
        return generateWhatComesNextQuestion()
      default:
        return generateWhichSurahQuestion()
    }
  }, [generateWhichSurahQuestion, generateFirstWordQuestion, generateWhatComesNextQuestion])

  // Start the game
  const startGame = useCallback(() => {
    setGameState('playing')
    setTimeLeft(GAME_DURATION)
    setScore(0)
    setStreak(0)
    setBestStreak(0)
    setQuestionsAnswered(0)
    setCorrectAnswers(0)
    setSelectedAnswer(null)
    setShowFeedback(false)

    const question = generateQuestion()
    setCurrentQuestion(question)
  }, [generateQuestion])

  // Handle timer
  useEffect(() => {
    if (gameState === 'playing' && timeLeft > 0) {
      timerRef.current = setTimeout(() => {
        setTimeLeft(prev => prev - 1)
      }, 1000)
    } else if (gameState === 'playing' && timeLeft === 0) {
      setGameState('complete')
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    }
  }, [gameState, timeLeft])

  // Clean up feedback timeout on unmount
  useEffect(() => {
    return () => {
      if (feedbackTimeoutRef.current) {
        clearTimeout(feedbackTimeoutRef.current)
      }
    }
  }, [])

  // Handle answer selection
  const handleAnswerSelect = useCallback((answer: string) => {
    if (showFeedback || gameState !== 'playing') return

    setSelectedAnswer(answer)
    setShowFeedback(true)
    setQuestionsAnswered(prev => prev + 1)

    const isCorrect = answer === currentQuestion?.correctAnswer

    if (isCorrect) {
      const streakMultiplier = streak >= STREAK_BONUS_THRESHOLD ? 2 : 1
      const pointsEarned = 10 * streakMultiplier

      setScore(prev => prev + pointsEarned)
      setStreak(prev => {
        const newStreak = prev + 1
        setBestStreak(best => Math.max(best, newStreak))
        return newStreak
      })
      setCorrectAnswers(prev => prev + 1)
    } else {
      setStreak(0)
    }

    // Move to next question after brief feedback
    feedbackTimeoutRef.current = setTimeout(() => {
      setShowFeedback(false)
      setSelectedAnswer(null)

      if (timeLeft > 0) {
        const nextQuestion = generateQuestion()
        setCurrentQuestion(nextQuestion)
      }
    }, 500)
  }, [showFeedback, gameState, currentQuestion, streak, timeLeft, generateQuestion])

  const getQuestionLabel = (type: QuestionType): string => {
    switch (type) {
      case 'which-surah':
        return 'Which surah?'
      case 'first-word':
        return 'First word?'
      case 'what-comes-next':
        return 'What comes next?'
      default:
        return 'Answer:'
    }
  }

  const getOptionStyle = (option: string): React.CSSProperties => {
    if (!showFeedback) {
      return {
        background: 'var(--color-secondary)',
        border: '2px solid var(--color-border)',
        color: 'var(--color-foreground)',
        cursor: 'pointer',
      }
    }

    if (option === currentQuestion?.correctAnswer) {
      return {
        background: 'rgba(34,197,94,0.2)',
        border: '2px solid #4ade80',
        color: '#4ade80',
      }
    }

    if (option === selectedAnswer && option !== currentQuestion?.correctAnswer) {
      return {
        background: 'rgba(244,63,94,0.2)',
        border: '2px solid #fb7185',
        color: '#fb7185',
      }
    }

    return {
      background: 'var(--color-muted)',
      border: '2px solid var(--color-border)',
      color: 'var(--color-muted-foreground)',
      opacity: 0.5,
    }
  }

  const accuracy = questionsAnswered > 0
    ? Math.round((correctAnswers / questionsAnswered) * 100)
    : 0

  return (
    <div className="game-page">
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button className="back-btn" onClick={onBack}>
            <ArrowLeft size={18} />
          </button>
          <div>
            <h2 style={{ margin: 0 }}>Speed Round</h2>
            {gameState === 'playing' && (
              <p style={{ color: 'var(--color-muted-foreground)', fontSize: '0.875rem', margin: 0 }}>
                Rapid fire questions - tap to answer!
              </p>
            )}
          </div>
        </div>

        {/* Timer and Score Display */}
        {gameState === 'playing' && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            {/* Streak */}
            {streak >= STREAK_BONUS_THRESHOLD && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.5rem',
                  padding: '0.25rem 0.75rem',
                  background: 'rgba(244,63,94,0.15)', border: '1px solid rgba(244,63,94,0.3)',
                  borderRadius: '9999px',
                }}
              >
                <Flame size={16} style={{ color: '#fb7185' }} />
                <span style={{ color: '#fb7185', fontWeight: 500 }}>{streak}x</span>
              </motion.div>
            )}

            {/* Score */}
            <div style={{ textAlign: 'right' }}>
              <p style={{ color: 'var(--color-muted-foreground)', fontSize: '0.75rem', margin: 0 }}>Score</p>
              <p style={{ color: 'var(--color-accent)', fontSize: '1.5rem', fontFamily: 'var(--font-serif)', margin: 0 }}>{score}</p>
            </div>

            {/* Timer */}
            <div style={{
              width: '4rem', height: '4rem', borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'var(--font-serif)', fontSize: '1.5rem',
              background: timeLeft <= 10 ? 'rgba(244,63,94,0.15)' : 'var(--color-secondary)',
              color: timeLeft <= 10 ? '#fb7185' : 'var(--color-foreground)',
              border: timeLeft <= 10 ? '2px solid #fb7185' : '2px solid var(--color-border)',
            }}>
              {timeLeft}
            </div>
          </div>
        )}
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
              <div style={{
                width: '5rem', height: '5rem', margin: '0 auto 1.5rem',
                borderRadius: '50%', background: 'var(--color-secondary)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Zap size={40} style={{ color: 'var(--color-accent)' }} />
              </div>
              <h2 style={{ marginBottom: '1rem' }}>60-Second Challenge</h2>
              <p style={{ color: 'var(--color-muted-foreground)', marginBottom: '2rem', maxWidth: '28rem', lineHeight: 1.6 }}>
                Answer as many questions as you can in 60 seconds.
                Build streaks for bonus points. Wrong answers break your streak but don't end the game!
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem', textAlign: 'left' }}>
                {[
                  '"Which surah?" - Identify the surah from ayah text',
                  '"First word?" - Recall the first word from a reference',
                  '"What comes next?" - Tap the first word of the next ayah',
                ].map((text, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--color-muted-foreground)', fontSize: '0.875rem' }}>
                    <span style={{ width: '0.5rem', height: '0.5rem', borderRadius: '50%', background: 'var(--color-accent)', flexShrink: 0 }} />
                    <span>{text}</span>
                  </div>
                ))}
              </div>

              <button className="btn-primary" onClick={startGame} style={{ padding: '1rem 2.5rem', fontSize: '1.125rem' }}>
                <Play size={24} />
                Start Speed Round
              </button>
            </div>
          </motion.div>
        )}

        {/* PLAYING State */}
        {gameState === 'playing' && currentQuestion && (
          <motion.div
            key={currentQuestion.surah + '-' + currentQuestion.ayah + '-' + currentQuestion.type}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            style={{ width: '100%', maxWidth: '40rem' }}
          >
            {/* Question Type Label */}
            <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
              <span style={{
                display: 'inline-block', padding: '0.25rem 1rem',
                background: 'rgba(197,162,83,0.15)', border: '1px solid rgba(197,162,83,0.3)',
                borderRadius: '9999px', color: 'var(--color-accent)', fontSize: '0.875rem', fontWeight: 500,
              }}>
                {getQuestionLabel(currentQuestion.type)}
              </span>
            </div>

            {/* Question Text */}
            <div className="glass-card" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
              <p
                className={
                  currentQuestion.type === 'which-surah' || currentQuestion.type === 'what-comes-next'
                    ? 'font-arabic'
                    : ''
                }
                style={{
                  textAlign: 'center', lineHeight: 1.6, margin: 0,
                  fontSize: currentQuestion.type === 'which-surah' || currentQuestion.type === 'what-comes-next'
                    ? '1.5rem'
                    : '1.875rem',
                  color: currentQuestion.type === 'first-word' ? 'var(--color-accent)' : 'var(--color-foreground)',
                  fontFamily: currentQuestion.type === 'first-word' ? 'var(--font-serif)' : undefined,
                }}
                dir={currentQuestion.type === 'first-word' ? 'ltr' : 'rtl'}
              >
                {currentQuestion.questionText}
              </p>
            </div>

            {/* Answer Options */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              {currentQuestion.options.map((option, index) => (
                <motion.button
                  key={option + index}
                  onClick={() => handleAnswerSelect(option)}
                  disabled={showFeedback}
                  whileTap={{ scale: showFeedback ? 1 : 0.98 }}
                  style={{
                    ...getOptionStyle(option),
                    padding: '1.25rem',
                    borderRadius: '0.75rem',
                    fontSize: '1.125rem',
                    fontWeight: 500,
                    fontFamily: currentQuestion.type !== 'which-surah' ? 'var(--font-arabic)' : 'var(--font-sans)',
                    transition: 'all 0.15s ease',
                  }}
                  dir={currentQuestion.type === 'which-surah' ? 'ltr' : 'rtl'}
                >
                  {option}
                </motion.button>
              ))}
            </div>

            {/* Progress Bar */}
            <div style={{ marginTop: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-muted-foreground)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                <span>Questions: {questionsAnswered}</span>
                <span>Correct: {correctAnswers}</span>
              </div>
              <div className="progress-bar">
                <motion.div
                  className="progress-bar-fill"
                  style={{ background: 'var(--color-accent)' }}
                  initial={{ width: '100%' }}
                  animate={{ width: `${(timeLeft / GAME_DURATION) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>
          </motion.div>
        )}

        {/* COMPLETE State */}
        {gameState === 'complete' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="glass-card" style={{ padding: '2rem', textAlign: 'center', maxWidth: '28rem', margin: '0 auto' }}>
              <div style={{
                width: '4rem', height: '4rem', margin: '0 auto 1rem',
                borderRadius: '50%', background: 'rgba(197,162,83,0.15)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Zap size={32} style={{ color: 'var(--color-accent)' }} />
              </div>

              <h2 style={{ marginBottom: '0.5rem' }}>Time's Up!</h2>
              <p style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-serif)', fontSize: '2.5rem', marginBottom: '1.5rem' }}>{score} points</p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                <div className="glass-card" style={{ padding: '1rem' }}>
                  <p style={{ color: 'var(--color-muted-foreground)', fontSize: '0.75rem', marginBottom: '0.25rem' }}>Accuracy</p>
                  <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', margin: 0 }}>{accuracy}%</p>
                </div>
                <div className="glass-card" style={{ padding: '1rem' }}>
                  <p style={{ color: 'var(--color-muted-foreground)', fontSize: '0.75rem', marginBottom: '0.25rem' }}>Answered</p>
                  <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', margin: 0 }}>{questionsAnswered}</p>
                </div>
                <div className="glass-card" style={{ padding: '1rem' }}>
                  <p style={{ color: 'var(--color-muted-foreground)', fontSize: '0.75rem', marginBottom: '0.25rem' }}>Best Streak</p>
                  <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', margin: 0 }}>{bestStreak}</p>
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
