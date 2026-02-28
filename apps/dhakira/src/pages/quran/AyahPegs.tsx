// pages/quran/AyahPegs.tsx
// Peg System for Quran memorization
// Based on: Your Memory (Kenneth Higbee), Unlimited Memory (Kevin Horsley)

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft, Hash, Zap, BookOpen, Check, X,
  Timer, Target, Trophy, Plus, Star
} from 'lucide-react'
import { useAyahPegs } from '../../hooks/quran'
import { SURAH_DATA } from '../../data/quran-surah'
import type {
  Peg, PegToAyahQuestion, AyahToNumberQuestion,
  ChallengeResult, ChallengeMetrics
} from '../../hooks/quran/useAyahPegs'

interface AyahPegsProps {
  onBack: () => void
}

type ViewState = 'menu' | 'learn' | 'create-association' | 'speed-drill' | 'timed-challenge' | 'results'

export function AyahPegs({ onBack }: AyahPegsProps) {
  const [view, setView] = useState<ViewState>('menu')
  const [selectedSystem, setSelectedSystem] = useState<'rhyme' | 'major'>('rhyme')
  const [selectedSurah, setSelectedSurah] = useState(1)

  // Association creation state
  const [associationAyah, setAssociationAyah] = useState(1)
  const [associationImagery, setAssociationImagery] = useState('')

  // Speed drill state
  const [drillQuestion, setDrillQuestion] = useState<PegToAyahQuestion | AyahToNumberQuestion | null>(null)
  const [drillAnswer, setDrillAnswer] = useState('')
  const [showDrillResult, setShowDrillResult] = useState(false)
  const [isDrillCorrect, setIsDrillCorrect] = useState(false)
  const [drillScore, setDrillScore] = useState({ correct: 0, total: 0 })
  const [questionType, setQuestionType] = useState<'peg-to-ayah' | 'ayah-to-number'>('peg-to-ayah')

  // Timed challenge state
  const [challengeQuestions, setChallengeQuestions] = useState<Array<PegToAyahQuestion | AyahToNumberQuestion>>([])
  const [challengeIndex, setChallengeIndex] = useState(0)
  const [challengeResults, setChallengeResults] = useState<ChallengeResult[]>([])
  const [challengeStartTime, setChallengeStartTime] = useState(0)
  const [timeRemaining, setTimeRemaining] = useState(60)
  const [isChallengeDone, setIsChallengeDone] = useState(false)
  const [challengeMetrics, setChallengeMetrics] = useState<ChallengeMetrics | null>(null)

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const {
    getSystemPegs,
    getSurahProgress,
    createAssociation,
    getAssociations,
    generatePegToAyahQuestion,
    generateAyahToNumberQuestion,
    recordPegAttempt,
    startTimedChallenge,
    calculateMetrics
  } = useAyahPegs()

  const pegs = getSystemPegs(selectedSystem)
  const surahData = SURAH_DATA[selectedSurah - 1]

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [])

  // Timed challenge timer
  useEffect(() => {
    if (view === 'timed-challenge' && !isChallengeDone && timeRemaining > 0) {
      timerRef.current = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            finishChallenge()
            return 0
          }
          return prev - 1
        })
      }, 1000)
      return () => {
        if (timerRef.current) clearInterval(timerRef.current)
      }
    }
  }, [view, isChallengeDone, timeRemaining])

  // Generate next drill question
  const nextDrillQuestion = () => {
    let question: PegToAyahQuestion | AyahToNumberQuestion | null = null
    if (questionType === 'peg-to-ayah') {
      question = generatePegToAyahQuestion(selectedSurah)
    } else {
      question = generateAyahToNumberQuestion(selectedSurah)
    }
    setDrillQuestion(question)
    setDrillAnswer('')
    setShowDrillResult(false)
  }

  // Check drill answer
  const checkDrillAnswer = () => {
    if (!drillQuestion) return

    let correct = false
    if ('pegNumber' in drillQuestion) {
      // PegToAyahQuestion
      const q = drillQuestion as PegToAyahQuestion
      const [s, a] = drillAnswer.split(':').map(Number)
      correct = (s === q.answer.surah && a === q.answer.ayah) || parseInt(drillAnswer) === q.answer.ayah
    } else {
      // AyahToNumberQuestion
      const q = drillQuestion as AyahToNumberQuestion
      correct = parseInt(drillAnswer) === q.answer
    }

    setIsDrillCorrect(correct)
    setShowDrillResult(true)
    setDrillScore(prev => ({
      correct: prev.correct + (correct ? 1 : 0),
      total: prev.total + 1
    }))

    // Record mastery
    if ('pegNumber' in drillQuestion) {
      const q = drillQuestion as PegToAyahQuestion
      recordPegAttempt(q.answer.surah, q.answer.ayah, correct)
    }
  }

  // Start speed drill
  const startSpeedDrill = () => {
    setDrillScore({ correct: 0, total: 0 })
    setQuestionType('peg-to-ayah')
    nextDrillQuestion()
    setView('speed-drill')
  }

  // Start timed challenge
  const startChallenge = (timeLimit: number) => {
    const challenge = startTimedChallenge(selectedSurah, timeLimit)
    setChallengeQuestions(challenge.questions)
    setChallengeIndex(0)
    setChallengeResults([])
    setTimeRemaining(timeLimit)
    setChallengeStartTime(Date.now())
    setIsChallengeDone(false)
    setChallengeMetrics(null)
    setDrillAnswer('')
    setView('timed-challenge')
  }

  // Answer challenge question
  const answerChallengeQuestion = () => {
    if (challengeIndex >= challengeQuestions.length) return

    const question = challengeQuestions[challengeIndex]
    const responseTime = Date.now() - challengeStartTime

    let correct = false
    if ('pegNumber' in question) {
      const q = question as PegToAyahQuestion
      const answer = parseInt(drillAnswer)
      correct = answer === q.answer.ayah
    } else {
      const q = question as AyahToNumberQuestion
      correct = parseInt(drillAnswer) === q.answer
    }

    const result: ChallengeResult = { correct, responseTime }
    setChallengeResults(prev => [...prev, result])
    setDrillAnswer('')
    setChallengeStartTime(Date.now())

    if (challengeIndex + 1 >= challengeQuestions.length) {
      finishChallenge([...challengeResults, result])
    } else {
      setChallengeIndex(prev => prev + 1)
    }
  }

  // Finish challenge
  const finishChallenge = (results?: ChallengeResult[]) => {
    if (timerRef.current) clearInterval(timerRef.current)
    setIsChallengeDone(true)
    const finalResults = results || challengeResults
    const metrics = calculateMetrics(finalResults)
    setChallengeMetrics(metrics)
    setView('results')
  }

  // Save association
  const handleSaveAssociation = () => {
    const pegNumber = associationAyah
    createAssociation({
      surah: selectedSurah,
      ayah: associationAyah,
      pegNumber,
      imagery: associationImagery
    })
    setAssociationAyah(prev => Math.min(prev + 1, surahData?.ayahCount || 1))
    setAssociationImagery('')
  }

  // Get peg for a number
  const getPegForNumber = (num: number): Peg | undefined => {
    if (selectedSystem === 'rhyme') {
      return pegs.find(p => p.number === num)
    } else {
      // Major system - use last two digits
      const index = num % 100
      return pegs[index]
    }
  }

  return (
    <div className="game-page" style={{ padding: '2rem', overflowY: 'auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
        <button
          className="back-btn"
          onClick={() => {
            if (view === 'menu') onBack()
            else setView('menu')
          }}
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 style={{ fontSize: '1.5rem', margin: 0 }}>Ayah Pegs</h1>
          <p style={{ color: 'var(--color-muted-foreground)', fontSize: '0.875rem', margin: 0 }}>
            {view === 'menu' && 'Number associations for instant recall'}
            {view === 'learn' && `${selectedSystem === 'rhyme' ? 'Rhyme' : 'Major'} System Pegs`}
            {view === 'create-association' && `Creating pegs for ${surahData?.name}`}
            {view === 'speed-drill' && 'Speed Drill'}
            {view === 'timed-challenge' && `Challenge - ${timeRemaining}s`}
            {view === 'results' && 'Challenge Complete'}
          </p>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {/* MENU VIEW */}
        {view === 'menu' && (
          <motion.div
            key="menu"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
          >
            {/* System Selection */}
            <div style={{ marginBottom: '2rem' }}>
              <h2 style={{ color: 'var(--color-muted-foreground)', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.75rem' }}>
                Choose Peg System
              </h2>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button
                  onClick={() => setSelectedSystem('rhyme')}
                  className="glass-card"
                  style={{
                    flex: 1,
                    padding: '1rem',
                    textAlign: 'left',
                    cursor: 'pointer',
                    border: selectedSystem === 'rhyme' ? '2px solid var(--color-accent)' : '1px solid var(--color-border)',
                    background: selectedSystem === 'rhyme' ? 'rgba(197, 162, 83, 0.1)' : undefined,
                  }}
                >
                  <div style={{ fontSize: '1.125rem', fontWeight: 'bold', marginBottom: '0.25rem' }}>Rhyme System</div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--color-muted-foreground)' }}>1-sun, 2-shoe, 3-tree...</div>
                </button>
                <button
                  onClick={() => setSelectedSystem('major')}
                  className="glass-card"
                  style={{
                    flex: 1,
                    padding: '1rem',
                    textAlign: 'left',
                    cursor: 'pointer',
                    border: selectedSystem === 'major' ? '2px solid var(--color-accent)' : '1px solid var(--color-border)',
                    background: selectedSystem === 'major' ? 'rgba(197, 162, 83, 0.1)' : undefined,
                  }}
                >
                  <div style={{ fontSize: '1.125rem', fontWeight: 'bold', marginBottom: '0.25rem' }}>Major System</div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--color-muted-foreground)' }}>00-99 phonetic pegs</div>
                </button>
              </div>
            </div>

            {/* Surah Selection */}
            <div style={{ marginBottom: '2rem' }}>
              <h2 style={{ color: 'var(--color-muted-foreground)', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.75rem' }}>
                Select Surah
              </h2>
              <select
                value={selectedSurah}
                onChange={(e) => setSelectedSurah(Number(e.target.value))}
                style={{
                  width: '100%',
                  background: 'var(--color-secondary)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '0.75rem',
                  padding: '0.75rem 1rem',
                  color: 'var(--color-foreground)',
                }}
              >
                {SURAH_DATA.map(s => {
                  const progress = getSurahProgress(s.number)
                  return (
                    <option key={s.number} value={s.number}>
                      {s.number}. {s.name} ({progress.pegged}/{progress.total} pegged)
                    </option>
                  )
                })}
              </select>
            </div>

            {/* Actions */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={() => setView('learn')}
                className="glass-card"
                style={{ padding: '1.25rem', textAlign: 'left', cursor: 'pointer', border: 'none', width: '100%' }}
              >
                <BookOpen size={24} style={{ color: 'var(--color-accent)', marginBottom: '0.5rem' }} />
                <h3 style={{ fontWeight: 500, fontSize: '0.875rem', marginBottom: '0.25rem' }}>Learn Pegs</h3>
                <p style={{ color: 'var(--color-muted-foreground)', fontSize: '0.75rem', margin: 0 }}>
                  Study the {selectedSystem === 'rhyme' ? '20' : '100'} number-image associations
                </p>
              </motion.button>

              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 }}
                onClick={() => {
                  setAssociationAyah(1)
                  setAssociationImagery('')
                  setView('create-association')
                }}
                className="glass-card"
                style={{ padding: '1.25rem', textAlign: 'left', cursor: 'pointer', border: 'none', width: '100%' }}
              >
                <Plus size={24} style={{ color: 'var(--color-accent)', marginBottom: '0.5rem' }} />
                <h3 style={{ fontWeight: 500, fontSize: '0.875rem', marginBottom: '0.25rem' }}>Create Peg Associations</h3>
                <p style={{ color: 'var(--color-muted-foreground)', fontSize: '0.75rem', margin: 0 }}>
                  Link ayahs to peg images for {surahData?.name}
                </p>
              </motion.button>

              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                onClick={startSpeedDrill}
                className="glass-card"
                style={{ padding: '1.25rem', textAlign: 'left', cursor: 'pointer', border: 'none', width: '100%' }}
              >
                <Zap size={24} style={{ color: 'var(--color-accent)', marginBottom: '0.5rem' }} />
                <h3 style={{ fontWeight: 500, fontSize: '0.875rem', marginBottom: '0.25rem' }}>Speed Drill</h3>
                <p style={{ color: 'var(--color-muted-foreground)', fontSize: '0.75rem', margin: 0 }}>
                  Test your peg recall at your own pace
                </p>
              </motion.button>

              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                onClick={() => startChallenge(60)}
                className="glass-card"
                style={{ padding: '1.25rem', textAlign: 'left', cursor: 'pointer', border: 'none', width: '100%' }}
              >
                <Timer size={24} style={{ color: 'var(--color-accent)', marginBottom: '0.5rem' }} />
                <h3 style={{ fontWeight: 500, fontSize: '0.875rem', marginBottom: '0.25rem' }}>Timed Challenge</h3>
                <p style={{ color: 'var(--color-muted-foreground)', fontSize: '0.75rem', margin: 0 }}>
                  60 second peg recall competition
                </p>
              </motion.button>
            </div>

            {/* Surah Progress */}
            <div>
              <h2 style={{ color: 'var(--color-muted-foreground)', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.75rem' }}>
                Progress Overview
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: '0.75rem' }}>
                {SURAH_DATA.slice(0, 5).map(surah => {
                  const progress = getSurahProgress(surah.number)
                  return (
                    <div
                      key={surah.number}
                      className="glass-card"
                      style={{ padding: '0.75rem' }}
                    >
                      <div style={{ color: 'var(--color-muted-foreground)', fontSize: '0.75rem', marginBottom: '0.25rem' }}>{surah.name}</div>
                      <div style={{ fontWeight: 'bold' }}>{progress.pegged}/{progress.total}</div>
                      <div style={{ height: '0.375rem', background: 'var(--color-muted)', borderRadius: '9999px', overflow: 'hidden', marginTop: '0.5rem' }}>
                        <div
                          style={{
                            height: '100%',
                            background: 'var(--color-accent)',
                            transition: 'width 0.3s',
                            width: `${progress.percent}%`,
                          }}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </motion.div>
        )}

        {/* LEARN VIEW */}
        {view === 'learn' && (
          <motion.div
            key="learn"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
          >
            <h2 style={{ color: 'var(--color-muted-foreground)', fontSize: '0.875rem', fontWeight: 500, marginBottom: '1rem' }}>
              {selectedSystem === 'rhyme' ? 'Rhyme Pegs (1-20)' : 'Major System (00-99)'}
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: '0.75rem' }}>
              {pegs.slice(0, selectedSystem === 'rhyme' ? 20 : 100).map(peg => (
                <motion.div
                  key={peg.number}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="glass-card"
                  style={{ padding: '0.75rem', textAlign: 'center' }}
                >
                  <div style={{ color: 'var(--color-accent)', fontWeight: 'bold', fontSize: '1.25rem', marginBottom: '0.25rem' }}>{peg.number}</div>
                  <div style={{ fontWeight: 500 }}>{peg.peg}</div>
                  <div style={{ color: 'var(--color-muted-foreground)', fontSize: '0.75rem', marginTop: '0.25rem' }}>{peg.imageHint}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* CREATE ASSOCIATION VIEW */}
        {view === 'create-association' && (
          <motion.div
            key="create"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
          >
            <div className="glass-card" style={{ padding: '1.5rem', maxWidth: '28rem', margin: '0 auto' }}>
              {/* Current Peg */}
              <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                <div style={{ color: 'var(--color-muted-foreground)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                  Ayah {associationAyah}
                </div>
                <div style={{ color: 'var(--color-accent)', fontWeight: 'bold', fontSize: '2.25rem', marginBottom: '0.5rem' }}>
                  {getPegForNumber(associationAyah)?.peg || associationAyah}
                </div>
                <div style={{ color: 'var(--color-muted-foreground)', fontSize: '0.875rem' }}>
                  {getPegForNumber(associationAyah)?.imageHint || 'Create your own image'}
                </div>
              </div>

              {/* Ayah selector */}
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ color: 'var(--color-muted-foreground)', fontSize: '0.75rem', marginBottom: '0.25rem', display: 'block' }}>Ayah Number</label>
                <input
                  type="number"
                  min={1}
                  max={surahData?.ayahCount || 1}
                  value={associationAyah}
                  onChange={(e) => setAssociationAyah(Number(e.target.value))}
                  style={{
                    width: '100%',
                    background: 'var(--color-secondary)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '0.5rem',
                    padding: '0.75rem 1rem',
                    color: 'var(--color-foreground)',
                    textAlign: 'center',
                    fontSize: '1.25rem',
                    boxSizing: 'border-box',
                  }}
                />
              </div>

              {/* Imagery input */}
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ color: 'var(--color-muted-foreground)', fontSize: '0.75rem', marginBottom: '0.25rem', display: 'block' }}>Your Vivid Imagery</label>
                <textarea
                  value={associationImagery}
                  onChange={(e) => setAssociationImagery(e.target.value)}
                  placeholder={`Link "${getPegForNumber(associationAyah)?.peg || associationAyah}" to ayah ${associationAyah} with a vivid scene...`}
                  style={{
                    width: '100%',
                    background: 'var(--color-secondary)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '0.5rem',
                    padding: '0.75rem 1rem',
                    color: 'var(--color-foreground)',
                    height: '6rem',
                    resize: 'none',
                    boxSizing: 'border-box',
                  }}
                />
              </div>

              <button
                className="btn-primary"
                onClick={handleSaveAssociation}
                disabled={!associationImagery.trim()}
                style={{ width: '100%' }}
              >
                Save & Next
              </button>

              {/* Existing associations */}
              {getAssociations(selectedSurah).length > 0 && (
                <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--color-border)' }}>
                  <div style={{ color: 'var(--color-muted-foreground)', fontSize: '0.75rem', marginBottom: '0.5rem' }}>
                    {getAssociations(selectedSurah).length} associations created
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {getAssociations(selectedSurah).slice(-10).map(a => (
                      <span
                        key={a.ayah}
                        style={{
                          padding: '0.25rem 0.5rem',
                          background: 'rgba(197, 162, 83, 0.2)',
                          color: 'var(--color-accent)',
                          fontSize: '0.75rem',
                          borderRadius: '0.25rem',
                        }}
                      >
                        {a.ayah}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* SPEED DRILL VIEW */}
        {view === 'speed-drill' && (
          <motion.div
            key="drill"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
          >
            <div style={{ color: 'var(--color-muted-foreground)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
              Score: {drillScore.correct}/{drillScore.total}
            </div>

            {/* Question type toggle */}
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
              <button
                onClick={() => {
                  setQuestionType('peg-to-ayah')
                  nextDrillQuestion()
                }}
                className={questionType === 'peg-to-ayah' ? 'btn-primary' : 'btn-secondary'}
                style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}
              >
                Peg &rarr; Ayah
              </button>
              <button
                onClick={() => {
                  setQuestionType('ayah-to-number')
                  nextDrillQuestion()
                }}
                className={questionType === 'ayah-to-number' ? 'btn-primary' : 'btn-secondary'}
                style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}
              >
                Ayah &rarr; Number
              </button>
            </div>

            {drillQuestion ? (
              <div className="glass-card" style={{ padding: '2rem', maxWidth: '28rem', width: '100%', marginBottom: '1.5rem' }}>
                {'pegNumber' in drillQuestion ? (
                  <>
                    <p style={{ fontSize: '1.125rem', marginBottom: '0.5rem' }}>{drillQuestion.prompt}</p>
                    <p style={{ color: 'var(--color-accent)', fontSize: '0.875rem', marginBottom: '1rem' }}>{drillQuestion.imagery}</p>
                  </>
                ) : (
                  <>
                    <p style={{ fontSize: '1.125rem', marginBottom: '0.5rem' }}>What ayah number is this?</p>
                    <p style={{ color: 'var(--color-accent)', fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>{drillQuestion.ayahRef}</p>
                    <p style={{ color: 'var(--color-muted-foreground)', fontSize: '0.875rem', marginBottom: '1rem' }}>{drillQuestion.imagery}</p>
                  </>
                )}

                {!showDrillResult ? (
                  <>
                    <input
                      type="text"
                      value={drillAnswer}
                      onChange={(e) => setDrillAnswer(e.target.value)}
                      placeholder={'pegNumber' in drillQuestion ? 'e.g., 5 or 2:5' : 'Ayah number...'}
                      onKeyDown={(e) => e.key === 'Enter' && checkDrillAnswer()}
                      autoFocus
                      style={{
                        width: '100%',
                        background: 'var(--color-secondary)',
                        border: '1px solid var(--color-border)',
                        borderRadius: '0.5rem',
                        padding: '0.75rem 1rem',
                        color: 'var(--color-foreground)',
                        textAlign: 'center',
                        fontSize: '1.25rem',
                        marginBottom: '1rem',
                        boxSizing: 'border-box',
                      }}
                    />
                    <button
                      className="btn-primary"
                      onClick={checkDrillAnswer}
                      style={{ width: '100%' }}
                    >
                      Check
                    </button>
                  </>
                ) : (
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ marginBottom: '0.5rem' }}>
                      {isDrillCorrect
                        ? <Check size={48} style={{ margin: '0 auto', color: '#4ade80' }} />
                        : <X size={48} style={{ margin: '0 auto', color: '#fb7185' }} />
                      }
                    </div>
                    <p style={{ marginBottom: '1rem' }}>
                      {isDrillCorrect ? 'Correct!' : (
                        'pegNumber' in drillQuestion
                          ? `Answer: ${drillQuestion.answer.surah}:${drillQuestion.answer.ayah}`
                          : `Answer: ${drillQuestion.answer}`
                      )}
                    </p>
                    <button
                      className="btn-primary"
                      onClick={nextDrillQuestion}
                      style={{ padding: '0.75rem 1.5rem' }}
                    >
                      Next
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div style={{ textAlign: 'center' }}>
                <Hash size={48} style={{ margin: '0 auto', color: 'var(--color-muted-foreground)', marginBottom: '1rem' }} />
                <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>No Pegs Created</h2>
                <p style={{ color: 'var(--color-muted-foreground)', marginBottom: '1.5rem' }}>Create peg associations first</p>
                <button
                  className="btn-primary"
                  onClick={() => setView('create-association')}
                  style={{ padding: '0.75rem 1.5rem' }}
                >
                  Create Associations
                </button>
              </div>
            )}
          </motion.div>
        )}

        {/* TIMED CHALLENGE VIEW */}
        {view === 'timed-challenge' && !isChallengeDone && (
          <motion.div
            key="challenge"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
          >
            {/* Timer */}
            <div style={{
              fontSize: '2.25rem',
              fontWeight: 'bold',
              marginBottom: '1rem',
              color: timeRemaining <= 10 ? '#fb7185' : 'var(--color-accent)',
            }}>
              {timeRemaining}s
            </div>

            <div style={{ color: 'var(--color-muted-foreground)', fontSize: '0.875rem', marginBottom: '1rem' }}>
              Question {challengeIndex + 1} of {challengeQuestions.length}
            </div>

            {challengeQuestions[challengeIndex] && (
              <div className="glass-card" style={{ padding: '2rem', maxWidth: '28rem', width: '100%' }}>
                {(() => {
                  const q = challengeQuestions[challengeIndex]
                  if ('pegNumber' in q) {
                    return (
                      <>
                        <p style={{ fontSize: '1.125rem', marginBottom: '0.5rem' }}>{q.prompt}</p>
                        <p style={{ color: 'var(--color-accent)', fontSize: '0.875rem', marginBottom: '1rem' }}>{q.imagery}</p>
                      </>
                    )
                  } else {
                    return (
                      <>
                        <p style={{ fontSize: '1.125rem', marginBottom: '0.5rem' }}>What ayah number?</p>
                        <p style={{ color: 'var(--color-accent)', fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>{q.ayahRef}</p>
                      </>
                    )
                  }
                })()}

                <input
                  type="number"
                  value={drillAnswer}
                  onChange={(e) => setDrillAnswer(e.target.value)}
                  placeholder="Answer..."
                  onKeyDown={(e) => e.key === 'Enter' && answerChallengeQuestion()}
                  autoFocus
                  style={{
                    width: '100%',
                    background: 'var(--color-secondary)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '0.5rem',
                    padding: '0.75rem 1rem',
                    color: 'var(--color-foreground)',
                    textAlign: 'center',
                    fontSize: '1.25rem',
                    marginBottom: '1rem',
                    boxSizing: 'border-box',
                  }}
                />
                <button
                  className="btn-primary"
                  onClick={answerChallengeQuestion}
                  style={{ width: '100%' }}
                >
                  Submit
                </button>
              </div>
            )}
          </motion.div>
        )}

        {/* RESULTS VIEW */}
        {view === 'results' && challengeMetrics && (
          <motion.div
            key="results"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
          >
            <div className="glass-card" style={{ padding: '2rem', maxWidth: '28rem', width: '100%', textAlign: 'center' }}>
              <Trophy size={64} style={{ margin: '0 auto', color: '#fbbf24', marginBottom: '1rem' }} />
              <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>Challenge Complete!</h2>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                <div className="glass-card" style={{ padding: '1rem' }}>
                  <Target size={24} style={{ margin: '0 auto', color: 'var(--color-accent)', marginBottom: '0.5rem' }} />
                  <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{Math.round(challengeMetrics.accuracy)}%</div>
                  <div style={{ color: 'var(--color-muted-foreground)', fontSize: '0.75rem' }}>Accuracy</div>
                </div>
                <div className="glass-card" style={{ padding: '1rem' }}>
                  <Timer size={24} style={{ margin: '0 auto', color: '#fbbf24', marginBottom: '0.5rem' }} />
                  <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{(challengeMetrics.avgResponseTime / 1000).toFixed(1)}s</div>
                  <div style={{ color: 'var(--color-muted-foreground)', fontSize: '0.75rem' }}>Avg Response</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
                <div style={{ color: '#4ade80', fontWeight: 'bold' }}>{challengeMetrics.correctCount}</div>
                <Check size={20} style={{ color: '#4ade80' }} />
                <span style={{ color: 'var(--color-muted-foreground)' }}>/</span>
                <div style={{ fontWeight: 'bold' }}>{challengeMetrics.totalCount}</div>
                <span style={{ color: 'var(--color-muted-foreground)' }}>total</span>
              </div>

              {/* Stars */}
              <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
                {[1, 2, 3].map(star => (
                  <Star
                    key={star}
                    size={32}
                    style={{
                      color: challengeMetrics.accuracy >= star * 33 ? '#fbbf24' : 'var(--color-muted)',
                      fill: challengeMetrics.accuracy >= star * 33 ? '#fbbf24' : 'none',
                    }}
                  />
                ))}
              </div>

              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button
                  className="btn-primary"
                  onClick={() => startChallenge(60)}
                  style={{ flex: 1 }}
                >
                  Try Again
                </button>
                <button
                  className="btn-secondary"
                  onClick={() => setView('menu')}
                  style={{ flex: 1 }}
                >
                  Done
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
