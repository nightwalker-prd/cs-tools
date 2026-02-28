// pages/quran/ElaborativeRecall.tsx
// Elaborative Interrogation for deep Quran understanding
// Based on: Make It Stick (Brown, Roediger, McDaniel)

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Brain, MessageCircle, Link2, Sparkles, Send, CheckCircle } from 'lucide-react'
import { useElaborativeRecall } from '../../hooks/quran'
import { getAyah } from '../../data/quran-data'
import { SURAH_DATA } from '../../data/quran-surah'
import type { QuestionType } from '../../hooks/quran/useElaborativeRecall'

interface ElaborativeRecallProps {
  onBack: () => void
}

export function ElaborativeRecall({ onBack }: ElaborativeRecallProps) {
  const [view, setView] = useState<'menu' | 'practice' | 'results'>('menu')
  const [currentSurah, setCurrentSurah] = useState(2)
  const [currentAyah, setCurrentAyah] = useState(255)
  const [questionType, setQuestionType] = useState<QuestionType>('why')
  const [response, setResponse] = useState('')
  const [showEvaluation, setShowEvaluation] = useState(false)

  const {
    generateWhyQuestion,
    generateHowQuestion,
    generateWhatIfQuestion,
    generateSelfExplanationPrompt,
    evaluateExplanation,
    saveElaboration,
    getElaborationStats,
  } = useElaborativeRecall()

  const ayahData = getAyah(currentSurah, currentAyah)
  const surahName = SURAH_DATA[currentSurah - 1]?.name || `Surah ${currentSurah}`

  const getQuestion = () => {
    switch (questionType) {
      case 'why':
        return generateWhyQuestion(currentSurah, currentAyah)
      case 'how':
        return generateHowQuestion(currentSurah, currentAyah)
      case 'what-if':
        return generateWhatIfQuestion(currentSurah, currentAyah)
    }
  }

  const question = getQuestion()
  // Self-explanation prompt available for future expansion
  void generateSelfExplanationPrompt(currentSurah, currentAyah)
  const stats = getElaborationStats(currentSurah)

  const handleSubmit = () => {
    if (!response.trim()) return

    const evaluation = evaluateExplanation(response)

    saveElaboration({
      surah: currentSurah,
      ayah: currentAyah,
      questionType,
      question: question?.prompt || '',
      response,
      quality: evaluation.quality,
    })

    setShowEvaluation(true)
  }

  const handleNext = () => {
    setResponse('')
    setShowEvaluation(false)
    // Move to next ayah
    const surahInfo = SURAH_DATA[currentSurah - 1]
    if (currentAyah < (surahInfo?.ayahCount || 1)) {
      setCurrentAyah(prev => prev + 1)
    } else {
      setView('results')
    }
  }

  const evaluation = showEvaluation ? evaluateExplanation(response) : null

  const getQualityColor = (quality: string) => {
    switch (quality) {
      case 'excellent': return '#fbbf24'
      case 'good': return '#4ade80'
      case 'fair': return '#60a5fa'
      default: return 'var(--color-muted-foreground)'
    }
  }

  return (
    <div className="game-page" style={{ padding: '2rem', overflowY: 'auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
        <button
          className="back-btn"
          onClick={view === 'menu' ? onBack : () => setView('menu')}
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 style={{ fontSize: '1.5rem', margin: 0 }}>Elaborative Recall</h1>
          <p style={{ color: 'var(--color-muted-foreground)', fontSize: '0.875rem', margin: 0 }}>
            Deep understanding through questioning
          </p>
        </div>
      </div>

      {view === 'menu' && (
        <>
          {/* Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.75rem', marginBottom: '1.5rem' }}>
            <div className="glass-card" style={{ padding: '0.75rem', textAlign: 'center' }}>
              <div style={{ color: '#fbbf24', fontWeight: 'bold', fontSize: '1.25rem' }}>{stats.excellentCount}</div>
              <div style={{ color: 'var(--color-muted-foreground)', fontSize: '0.75rem' }}>Excellent</div>
            </div>
            <div className="glass-card" style={{ padding: '0.75rem', textAlign: 'center' }}>
              <div style={{ color: '#4ade80', fontWeight: 'bold', fontSize: '1.25rem' }}>{stats.goodCount}</div>
              <div style={{ color: 'var(--color-muted-foreground)', fontSize: '0.75rem' }}>Good</div>
            </div>
            <div className="glass-card" style={{ padding: '0.75rem', textAlign: 'center' }}>
              <div style={{ color: '#60a5fa', fontWeight: 'bold', fontSize: '1.25rem' }}>{stats.fairCount}</div>
              <div style={{ color: 'var(--color-muted-foreground)', fontSize: '0.75rem' }}>Fair</div>
            </div>
            <div className="glass-card" style={{ padding: '0.75rem', textAlign: 'center' }}>
              <div style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>{stats.totalCount}</div>
              <div style={{ color: 'var(--color-muted-foreground)', fontSize: '0.75rem' }}>Total</div>
            </div>
          </div>

          {/* Question Type Selection */}
          <div style={{ marginBottom: '1.5rem' }}>
            <h2 style={{ color: 'var(--color-muted-foreground)', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.75rem' }}>
              Question Type
            </h2>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              {[
                { type: 'why' as QuestionType, label: 'Why?', icon: Brain, color: '#a855f7' },
                { type: 'how' as QuestionType, label: 'How?', icon: Link2, color: '#3b82f6' },
                { type: 'what-if' as QuestionType, label: 'What if?', icon: Sparkles, color: '#f59e0b' },
              ].map(({ type, label, icon: Icon, color }) => (
                <button
                  key={type}
                  onClick={() => setQuestionType(type)}
                  className="glass-card"
                  style={{
                    flex: 1,
                    padding: '1rem',
                    textAlign: 'center',
                    cursor: 'pointer',
                    border: questionType === type
                      ? `2px solid ${color}`
                      : '1px solid var(--color-border)',
                    background: questionType === type
                      ? `${color}15`
                      : undefined,
                  }}
                >
                  <Icon size={24} style={{ margin: '0 auto 0.5rem', color: questionType === type ? color : 'var(--color-muted-foreground)' }} />
                  <div style={{ fontSize: '0.875rem', fontWeight: 500, color: questionType === type ? color : undefined }}>{label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Surah Selection */}
          <div style={{ marginBottom: '1.5rem' }}>
            <h2 style={{ color: 'var(--color-muted-foreground)', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.75rem' }}>
              Select Surah
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '0.5rem' }}>
              {SURAH_DATA.slice(0, 5).map(surah => (
                <button
                  key={surah.number}
                  onClick={() => {
                    setCurrentSurah(surah.number)
                    setCurrentAyah(1)
                  }}
                  className="glass-card"
                  style={{
                    padding: '0.75rem',
                    textAlign: 'center',
                    fontSize: '0.875rem',
                    cursor: 'pointer',
                    border: currentSurah === surah.number
                      ? '2px solid #a855f7'
                      : '1px solid var(--color-border)',
                    background: currentSurah === surah.number
                      ? 'rgba(168, 85, 247, 0.1)'
                      : undefined,
                    color: currentSurah === surah.number
                      ? '#a855f7'
                      : undefined,
                  }}
                >
                  {surah.name}
                </button>
              ))}
            </div>
          </div>

          {/* Start Button */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="btn-primary"
            onClick={() => setView('practice')}
            style={{ width: '100%', padding: '1rem' }}
          >
            Start Elaborative Practice
          </motion.button>
        </>
      )}

      {view === 'practice' && ayahData && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          {/* Ayah Display */}
          <div className="glass-card" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
            <div style={{ color: '#a855f7', fontSize: '0.875rem', marginBottom: '0.5rem' }}>{surahName} : {currentAyah}</div>
            <p className="font-arabic" style={{ fontSize: '1.25rem', lineHeight: 2, textAlign: 'right' }} dir="rtl">
              {ayahData.t}
            </p>
          </div>

          {/* Question */}
          <div style={{
            background: 'var(--color-secondary)',
            borderRadius: '0.75rem',
            padding: '1rem',
            marginBottom: '1rem',
          }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
              <MessageCircle size={20} style={{ color: '#a855f7', marginTop: '0.125rem', flexShrink: 0 }} />
              <div>
                <div style={{ fontWeight: 500, marginBottom: '0.25rem' }}>{question?.prompt}</div>
                {question?.hints && (
                  <div style={{ color: 'var(--color-muted-foreground)', fontSize: '0.875rem' }}>{question.hints[0]}</div>
                )}
              </div>
            </div>
          </div>

          {/* Response Input */}
          <div style={{ flex: 1, marginBottom: '1rem' }}>
            <textarea
              value={response}
              onChange={(e) => setResponse(e.target.value)}
              placeholder="Type your thoughtful response here..."
              disabled={showEvaluation}
              style={{
                width: '100%',
                height: '10rem',
                background: 'var(--color-secondary)',
                border: '1px solid var(--color-border)',
                borderRadius: '0.75rem',
                padding: '1rem',
                color: 'var(--color-foreground)',
                resize: 'none',
                boxSizing: 'border-box',
                opacity: showEvaluation ? 0.7 : 1,
              }}
            />
          </div>

          {/* Evaluation Feedback */}
          {showEvaluation && evaluation && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card"
              style={{ padding: '1rem', marginBottom: '1rem' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                <CheckCircle size={20} style={{ color: getQualityColor(evaluation.quality) }} />
                <span style={{ fontWeight: 500, textTransform: 'capitalize' }}>{evaluation.quality} Response</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem', textAlign: 'center' }}>
                <div>
                  <div style={{ color: '#a855f7', fontWeight: 'bold' }}>{evaluation.depth}/100</div>
                  <div style={{ color: 'var(--color-muted-foreground)', fontSize: '0.75rem' }}>Depth</div>
                </div>
                <div>
                  <div style={{ color: '#a855f7', fontWeight: 'bold' }}>{evaluation.concepts}</div>
                  <div style={{ color: 'var(--color-muted-foreground)', fontSize: '0.75rem' }}>Concepts</div>
                </div>
                <div>
                  <div style={{ color: '#a855f7', fontWeight: 'bold' }}>{evaluation.connections}</div>
                  <div style={{ color: 'var(--color-muted-foreground)', fontSize: '0.75rem' }}>Connections</div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Action Button */}
          {!showEvaluation ? (
            <button
              className="btn-primary"
              onClick={handleSubmit}
              disabled={!response.trim()}
              style={{ width: '100%', padding: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
            >
              <Send size={18} />
              Submit Response
            </button>
          ) : (
            <button
              className="btn-secondary"
              onClick={handleNext}
              style={{ width: '100%', padding: '1rem' }}
            >
              Next Ayah
            </button>
          )}
        </div>
      )}

      {view === 'results' && (
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ textAlign: 'center' }}>
            <Brain size={48} style={{ margin: '0 auto', color: '#a855f7', marginBottom: '1rem' }} />
            <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Session Complete!</h2>
            <p style={{ color: 'var(--color-muted-foreground)', marginBottom: '1.5rem' }}>Great job deepening your understanding</p>
            <button
              className="btn-primary"
              onClick={() => {
                setView('menu')
                setCurrentAyah(1)
              }}
              style={{ padding: '0.75rem 1.5rem' }}
            >
              Back to Menu
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
