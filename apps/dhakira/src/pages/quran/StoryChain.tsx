// pages/quran/StoryChain.tsx
// Story Method for Quran memorization
// Based on: Remember It! (Nelson Dellis), Unlimited Memory (Kevin Horsley)

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft, BookText, Plus, Play, Link2, Check, X,
  ChevronRight, ChevronLeft, Trash2, Lightbulb,
  Eye, Sparkles, Zap
} from 'lucide-react'
import { useStoryChain } from '../../hooks/quran'
import { SURAH_DATA } from '../../data/quran-surah'
import type {
  StoryChain as Chain,
  WalkStep,
  RecallQuestion,
  StoryValidation,
} from '../../hooks/quran/useStoryChain'

interface StoryChainProps {
  onBack: () => void
}

type ViewState = 'list' | 'chain-detail' | 'add-link' | 'walk' | 'quiz-forward' | 'quiz-backward'

export function StoryChain({ onBack }: StoryChainProps) {
  const [view, setView] = useState<ViewState>('list')
  const [selectedChain, setSelectedChain] = useState<Chain | null>(null)
  const [editingLink, setEditingLink] = useState<{ fromAyah: number; toAyah: number } | null>(null)

  // Creation state
  const [createSurah, setCreateSurah] = useState(1)
  const [createStart, setCreateStart] = useState(1)
  const [createEnd, setCreateEnd] = useState(10)

  // Link editing state
  const [linkStory, setLinkStory] = useState('')
  const [linkImagery, setLinkImagery] = useState('')
  const [storyValidation, setStoryValidation] = useState<StoryValidation | null>(null)

  // Walk state
  const [walkSteps, setWalkSteps] = useState<WalkStep[]>([])
  const [walkIndex, setWalkIndex] = useState(0)
  const [showStory, setShowStory] = useState(false)

  // Quiz state
  const [currentQuestion, setCurrentQuestion] = useState<RecallQuestion | null>(null)
  const [userAnswer, setUserAnswer] = useState('')
  const [showResult, setShowResult] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [score, setScore] = useState({ correct: 0, total: 0 })

  const {
    chains,
    createChain,
    deleteChain,
    addLink,
    updateLink,
    getLinks,
    getCompletion,
    findGaps,
    generateWalk,
    generateRecallQuestion,
    validateStory,
    getSEESuggestions
  } = useStoryChain()

  // Validate story as user types
  useEffect(() => {
    if (linkStory.length > 5) {
      setStoryValidation(validateStory(linkStory))
    } else {
      setStoryValidation(null)
    }
  }, [linkStory, validateStory])

  const handleCreateChain = () => {
    const surahData = SURAH_DATA[createSurah - 1]
    const maxAyah = surahData?.ayahCount || 1
    const end = Math.min(createEnd, maxAyah)

    createChain({
      id: `${createSurah}-${createStart}-${end}-${Date.now()}`,
      name: `${surahData?.name || 'Surah ' + createSurah} (${createStart}-${end})`,
      surah: createSurah,
      startAyah: createStart,
      endAyah: end,
    })
  }

  const handleSaveLink = () => {
    if (!selectedChain || !editingLink) return

    const existingLink = getLinks(selectedChain.id).find(
      l => l.fromAyah === editingLink.fromAyah && l.toAyah === editingLink.toAyah
    )

    if (existingLink) {
      updateLink(selectedChain.id, editingLink.fromAyah, editingLink.toAyah, {
        story: linkStory,
        imagery: linkImagery || undefined
      })
    } else {
      addLink({
        chainId: selectedChain.id,
        fromAyah: editingLink.fromAyah,
        toAyah: editingLink.toAyah,
        story: linkStory,
        imagery: linkImagery || undefined
      })
    }

    // Move to next gap or back to detail
    const gaps = findGaps(selectedChain.id)
    const nextGap = gaps.find(g => g.fromAyah > editingLink.toAyah) || gaps[0]
    if (nextGap && gaps.length > 1) {
      setEditingLink(nextGap)
      setLinkStory('')
      setLinkImagery('')
    } else {
      setView('chain-detail')
      setEditingLink(null)
    }
  }

  const startWalk = () => {
    if (!selectedChain) return
    const steps = generateWalk(selectedChain.id)
    setWalkSteps(steps)
    setWalkIndex(0)
    setShowStory(false)
    setView('walk')
  }

  const startQuiz = (direction: 'forward' | 'backward') => {
    if (!selectedChain) return
    setScore({ correct: 0, total: 0 })
    const question = generateRecallQuestion(selectedChain.id, { direction })
    setCurrentQuestion(question)
    setUserAnswer('')
    setShowResult(false)
    setView(direction === 'forward' ? 'quiz-forward' : 'quiz-backward')
  }

  const nextQuestion = () => {
    if (!selectedChain) return
    const direction = view === 'quiz-forward' ? 'forward' : 'backward'
    const question = generateRecallQuestion(selectedChain.id, { direction })
    setCurrentQuestion(question)
    setUserAnswer('')
    setShowResult(false)
  }

  const checkAnswer = () => {
    if (!currentQuestion) return
    const userAyah = parseInt(userAnswer)
    const correct = userAyah === currentQuestion.answer.ayah
    setIsCorrect(correct)
    setShowResult(true)
    setScore(prev => ({
      correct: prev.correct + (correct ? 1 : 0),
      total: prev.total + 1
    }))
  }

  const openLinkEditor = (fromAyah: number, toAyah: number) => {
    if (!selectedChain) return
    const existingLink = getLinks(selectedChain.id).find(
      l => l.fromAyah === fromAyah && l.toAyah === toAyah
    )
    setEditingLink({ fromAyah, toAyah })
    setLinkStory(existingLink?.story || '')
    setLinkImagery(existingLink?.imagery || '')
    setView('add-link')
  }

  return (
    <div className="game-page" style={{ padding: '2rem', overflowY: 'auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
        <button
          className="back-btn"
          onClick={() => {
            if (view === 'list') onBack()
            else if (view === 'chain-detail') setView('list')
            else setView('chain-detail')
          }}
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 style={{ fontSize: '1.5rem', margin: 0 }}>Story Chain</h1>
          <p style={{ color: 'var(--color-muted-foreground)', fontSize: '0.875rem', margin: 0 }}>
            {view === 'list' && 'Link ayahs through narratives'}
            {view === 'chain-detail' && selectedChain?.name}
            {view === 'add-link' && `Linking ayah ${editingLink?.fromAyah} → ${editingLink?.toAyah}`}
            {view === 'walk' && 'Walking through your story'}
            {view === 'quiz-forward' && 'Forward recall quiz'}
            {view === 'quiz-backward' && 'Backward recall quiz'}
          </p>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {/* LIST VIEW */}
        {view === 'list' && (
          <motion.div
            key="list"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
          >
            {/* Existing Chains */}
            {chains.length > 0 && (
              <div style={{ marginBottom: '2rem' }}>
                <h2 style={{ color: 'var(--color-muted-foreground)', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.75rem' }}>Your Story Chains</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
                  {chains.map(chain => {
                    const completion = getCompletion(chain.id)
                    const gaps = findGaps(chain.id)
                    return (
                      <motion.button
                        key={chain.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        onClick={() => {
                          setSelectedChain(chain)
                          setView('chain-detail')
                        }}
                        className="glass-card"
                        style={{ padding: '1.25rem', textAlign: 'left', cursor: 'pointer', border: 'none', width: '100%' }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                          <div>
                            <h3 style={{ fontWeight: 500, margin: 0 }}>{chain.name}</h3>
                            <p style={{ color: 'var(--color-muted-foreground)', fontSize: '0.875rem', margin: 0 }}>{chain.ayahCount} ayahs</p>
                          </div>
                          <BookText size={20} style={{ color: 'var(--color-accent)' }} />
                        </div>

                        {/* Progress bar */}
                        <div style={{ marginBottom: '0.75rem' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '0.25rem' }}>
                            <span style={{ color: 'var(--color-muted-foreground)' }}>Chain completion</span>
                            <span style={{ color: 'var(--color-accent)' }}>{completion}%</span>
                          </div>
                          <div style={{ height: '0.5rem', background: 'var(--color-muted)', borderRadius: '9999px', overflow: 'hidden' }}>
                            <div
                              style={{ height: '100%', background: 'var(--color-accent)', transition: 'all 0.3s', width: `${completion}%` }}
                            />
                          </div>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ color: 'var(--color-muted-foreground)', fontSize: '0.75rem' }}>
                            {gaps.length > 0 ? `${gaps.length} links missing` : 'Complete!'}
                          </span>
                          <ChevronRight size={16} style={{ color: 'var(--color-muted-foreground)' }} />
                        </div>
                      </motion.button>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Create New Chain */}
            <div>
              <h2 style={{ color: 'var(--color-muted-foreground)', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.75rem' }}>
                {chains.length > 0 ? 'Create Another Chain' : 'Start Your First Story Chain'}
              </h2>
              <div className="glass-card" style={{ padding: '1.5rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                  <div>
                    <label style={{ color: 'var(--color-muted-foreground)', fontSize: '0.75rem', marginBottom: '0.25rem', display: 'block' }}>Surah</label>
                    <select
                      value={createSurah}
                      onChange={(e) => {
                        setCreateSurah(Number(e.target.value))
                        setCreateStart(1)
                        setCreateEnd(10)
                      }}
                      style={{
                        width: '100%',
                        background: 'var(--color-secondary)',
                        border: '1px solid var(--color-border)',
                        borderRadius: '0.5rem',
                        padding: '0.5rem 0.75rem',
                        color: 'var(--color-foreground)',
                      }}
                    >
                      {SURAH_DATA.map(s => (
                        <option key={s.number} value={s.number}>
                          {s.number}. {s.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label style={{ color: 'var(--color-muted-foreground)', fontSize: '0.75rem', marginBottom: '0.25rem', display: 'block' }}>Start Ayah</label>
                    <input
                      type="number"
                      min={1}
                      max={SURAH_DATA[createSurah - 1]?.ayahCount || 1}
                      value={createStart}
                      onChange={(e) => setCreateStart(Number(e.target.value))}
                      style={{
                        width: '100%',
                        background: 'var(--color-secondary)',
                        border: '1px solid var(--color-border)',
                        borderRadius: '0.5rem',
                        padding: '0.5rem 0.75rem',
                        color: 'var(--color-foreground)',
                        boxSizing: 'border-box',
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ color: 'var(--color-muted-foreground)', fontSize: '0.75rem', marginBottom: '0.25rem', display: 'block' }}>End Ayah</label>
                    <input
                      type="number"
                      min={createStart}
                      max={SURAH_DATA[createSurah - 1]?.ayahCount || 1}
                      value={createEnd}
                      onChange={(e) => setCreateEnd(Number(e.target.value))}
                      style={{
                        width: '100%',
                        background: 'var(--color-secondary)',
                        border: '1px solid var(--color-border)',
                        borderRadius: '0.5rem',
                        padding: '0.5rem 0.75rem',
                        color: 'var(--color-foreground)',
                        boxSizing: 'border-box',
                      }}
                    />
                  </div>
                </div>
                <button
                  className="btn-primary"
                  onClick={handleCreateChain}
                  style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                >
                  <Plus size={18} />
                  Create Story Chain
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* CHAIN DETAIL VIEW */}
        {view === 'chain-detail' && selectedChain && (
          <motion.div
            key="detail"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
          >
            {/* Actions */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <button
                onClick={startWalk}
                className="glass-card"
                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '1rem', cursor: 'pointer', border: 'none' }}
              >
                <Play size={20} style={{ color: 'var(--color-accent)' }} />
                <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>Story Walk</span>
              </button>
              <button
                onClick={() => startQuiz('forward')}
                className="glass-card"
                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '1rem', cursor: 'pointer', border: 'none' }}
              >
                <ChevronRight size={20} style={{ color: '#22d3ee' }} />
                <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>Forward Quiz</span>
              </button>
              <button
                onClick={() => startQuiz('backward')}
                className="glass-card"
                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '1rem', cursor: 'pointer', border: 'none' }}
              >
                <ChevronLeft size={20} style={{ color: '#fb7185' }} />
                <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>Backward Quiz</span>
              </button>
            </div>

            {/* SEE Suggestions */}
            {(() => {
              const suggestions = getSEESuggestions(selectedChain.id)
              if (suggestions.length === 0) return null
              return (
                <div className="glass-card" style={{ marginBottom: '1.5rem', padding: '1rem', border: '1px solid rgba(197, 162, 83, 0.3)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-accent)', marginBottom: '0.5rem' }}>
                    <Lightbulb size={18} />
                    <span style={{ fontWeight: 500, fontSize: '0.875rem' }}>SEE Principle Tips</span>
                  </div>
                  <p style={{ color: 'var(--color-muted-foreground)', fontSize: '0.875rem', margin: 0 }}>
                    {suggestions.length} {suggestions.length === 1 ? 'story needs' : 'stories need'} more vivid imagery.
                    Use Senses, Exaggeration, and Energy!
                  </p>
                </div>
              )
            })()}

            {/* Story Links */}
            <h2 style={{ color: 'var(--color-muted-foreground)', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.75rem' }}>Story Links</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem' }}>
              {Array.from({ length: selectedChain.ayahCount - 1 }).map((_, i) => {
                const fromAyah = selectedChain.startAyah + i
                const toAyah = fromAyah + 1
                const link = getLinks(selectedChain.id).find(
                  l => l.fromAyah === fromAyah && l.toAyah === toAyah
                )
                const validation = link ? validateStory(link.story) : null

                return (
                  <motion.button
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.02 }}
                    onClick={() => openLinkEditor(fromAyah, toAyah)}
                    className="glass-card"
                    style={{
                      width: '100%',
                      padding: '1rem',
                      textAlign: 'left',
                      cursor: 'pointer',
                      border: link ? 'none' : '1px dashed var(--color-border)',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ color: 'var(--color-accent)', fontWeight: 500 }}>
                          {selectedChain.surah}:{fromAyah}
                        </span>
                        <Link2 size={14} style={{ color: 'var(--color-muted-foreground)' }} />
                        <span style={{ color: 'var(--color-accent)', fontWeight: 500 }}>
                          {selectedChain.surah}:{toAyah}
                        </span>
                      </div>
                      {link && validation && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                          {validation.hasSensory && (
                            <Eye size={14} style={{ color: '#4ade80' }} />
                          )}
                          {validation.hasExaggeration && (
                            <Sparkles size={14} style={{ color: '#c084fc' }} />
                          )}
                          {validation.hasEnergy && (
                            <Zap size={14} style={{ color: '#facc15' }} />
                          )}
                        </div>
                      )}
                    </div>
                    {link ? (
                      <p style={{ color: 'var(--color-muted-foreground)', fontSize: '0.875rem', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>{link.story}</p>
                    ) : (
                      <p style={{ color: 'var(--color-muted-foreground)', fontSize: '0.875rem', fontStyle: 'italic', margin: 0 }}>Click to add story link...</p>
                    )}
                  </motion.button>
                )
              })}
            </div>

            {/* Delete Chain */}
            <button
              onClick={() => {
                deleteChain(selectedChain.id)
                setView('list')
              }}
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#f87171', fontSize: '0.875rem', background: 'none', border: 'none', cursor: 'pointer' }}
            >
              <Trash2 size={16} />
              Delete this chain
            </button>
          </motion.div>
        )}

        {/* ADD/EDIT LINK VIEW */}
        {view === 'add-link' && selectedChain && editingLink && (
          <motion.div
            key="add-link"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
          >
            <div className="glass-card" style={{ padding: '1.5rem' }}>
              {/* Link Header */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ color: 'var(--color-accent)', fontWeight: 'bold', fontSize: '1.25rem' }}>
                    {selectedChain.surah}:{editingLink.fromAyah}
                  </div>
                  <div style={{ color: 'var(--color-muted-foreground)', fontSize: '0.75rem' }}>From</div>
                </div>
                <Link2 size={24} style={{ color: 'var(--color-muted-foreground)' }} />
                <div style={{ textAlign: 'center' }}>
                  <div style={{ color: 'var(--color-accent)', fontWeight: 'bold', fontSize: '1.25rem' }}>
                    {selectedChain.surah}:{editingLink.toAyah}
                  </div>
                  <div style={{ color: 'var(--color-muted-foreground)', fontSize: '0.75rem' }}>To</div>
                </div>
              </div>

              {/* Story Input */}
              <div style={{ marginBottom: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <label style={{ color: 'var(--color-muted-foreground)', fontSize: '0.875rem', fontWeight: 500 }}>Story Connection</label>
                  {storyValidation && (
                    <span style={{
                      fontSize: '0.75rem',
                      color: storyValidation.score >= 66 ? '#4ade80' :
                        storyValidation.score >= 33 ? 'var(--color-accent)' : '#fb7185'
                    }}>
                      SEE Score: {storyValidation.score}%
                    </span>
                  )}
                </div>
                <textarea
                  value={linkStory}
                  onChange={(e) => setLinkStory(e.target.value)}
                  placeholder="Create a vivid story that links these two ayahs... Use sensory details, exaggeration, and action!"
                  style={{
                    width: '100%',
                    background: 'var(--color-secondary)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '0.5rem',
                    padding: '0.75rem 1rem',
                    color: 'var(--color-foreground)',
                    height: '8rem',
                    resize: 'none',
                    boxSizing: 'border-box',
                  }}
                />
                {storyValidation && storyValidation.feedback.length > 0 && (
                  <div style={{ marginTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    {storyValidation.feedback.map((tip, i) => (
                      <p key={i} style={{ color: 'var(--color-accent)', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.25rem', margin: 0 }}>
                        <Lightbulb size={12} />
                        {tip}
                      </p>
                    ))}
                  </div>
                )}
              </div>

              {/* Imagery Input */}
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ color: 'var(--color-muted-foreground)', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem', display: 'block' }}>
                  Mental Image (optional)
                </label>
                <input
                  type="text"
                  value={linkImagery}
                  onChange={(e) => setLinkImagery(e.target.value)}
                  placeholder="Describe the key visual scene..."
                  style={{
                    width: '100%',
                    background: 'var(--color-secondary)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '0.5rem',
                    padding: '0.75rem 1rem',
                    color: 'var(--color-foreground)',
                    boxSizing: 'border-box',
                  }}
                />
              </div>

              {/* SEE Principle Hints */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <div className="glass-card" style={{ padding: '0.75rem', textAlign: 'center' }}>
                  <Eye size={20} style={{ margin: '0 auto 0.25rem', color: storyValidation?.hasSensory ? '#4ade80' : 'var(--color-muted-foreground)' }} />
                  <div style={{ fontSize: '0.75rem' }}>Senses</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-muted-foreground)' }}>see, hear, feel</div>
                </div>
                <div className="glass-card" style={{ padding: '0.75rem', textAlign: 'center' }}>
                  <Sparkles size={20} style={{ margin: '0 auto 0.25rem', color: storyValidation?.hasExaggeration ? '#c084fc' : 'var(--color-muted-foreground)' }} />
                  <div style={{ fontSize: '0.75rem' }}>Exaggerate</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-muted-foreground)' }}>huge, tiny, million</div>
                </div>
                <div className="glass-card" style={{ padding: '0.75rem', textAlign: 'center' }}>
                  <Zap size={20} style={{ margin: '0 auto 0.25rem', color: storyValidation?.hasEnergy ? '#facc15' : 'var(--color-muted-foreground)' }} />
                  <div style={{ fontSize: '0.75rem' }}>Energize</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-muted-foreground)' }}>explode, race, fly</div>
                </div>
              </div>

              <button
                className="btn-primary"
                onClick={handleSaveLink}
                disabled={linkStory.length < 10}
                style={{ width: '100%' }}
              >
                Save & Continue
              </button>
            </div>
          </motion.div>
        )}

        {/* WALK VIEW */}
        {view === 'walk' && walkSteps.length > 0 && (
          <motion.div
            key="walk"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
          >
            <div style={{ color: 'var(--color-muted-foreground)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
              Step {walkIndex + 1} of {walkSteps.length}
            </div>

            <div className="glass-card" style={{ padding: '2rem', maxWidth: '28rem', width: '100%', textAlign: 'center', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <span style={{ color: 'var(--color-accent)', fontWeight: 'bold', fontSize: '1.25rem' }}>
                  {selectedChain?.surah}:{walkSteps[walkIndex].fromAyah}
                </span>
                <Link2 size={18} style={{ color: 'var(--color-muted-foreground)' }} />
                <span style={{ color: 'var(--color-accent)', fontWeight: 'bold', fontSize: '1.25rem' }}>
                  {selectedChain?.surah}:{walkSteps[walkIndex].toAyah}
                </span>
              </div>

              <AnimatePresence mode="wait">
                {showStory ? (
                  <motion.div
                    key="story"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <p style={{ fontSize: '1.125rem', marginBottom: '0.5rem' }}>
                      {walkSteps[walkIndex].story}
                    </p>
                    {walkSteps[walkIndex].imagery && (
                      <p style={{ color: 'var(--color-muted-foreground)', fontSize: '0.875rem', fontStyle: 'italic' }}>
                        {walkSteps[walkIndex].imagery}
                      </p>
                    )}
                  </motion.div>
                ) : (
                  <motion.button
                    key="reveal"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onClick={() => setShowStory(true)}
                    style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', margin: '0 auto', color: 'var(--color-accent)', background: 'none', border: 'none', cursor: 'pointer' }}
                  >
                    <Eye size={20} />
                    <span>Recall your story...</span>
                  </motion.button>
                )}
              </AnimatePresence>
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <button
                onClick={() => {
                  if (walkIndex > 0) {
                    setWalkIndex(prev => prev - 1)
                    setShowStory(false)
                  }
                }}
                disabled={walkIndex === 0}
                className="btn-secondary"
                style={{ padding: '0.75rem', opacity: walkIndex === 0 ? 0.5 : 1, cursor: walkIndex === 0 ? 'not-allowed' : 'pointer' }}
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={() => {
                  if (walkIndex < walkSteps.length - 1) {
                    setWalkIndex(prev => prev + 1)
                    setShowStory(false)
                  } else {
                    setView('chain-detail')
                  }
                }}
                className="btn-primary"
                style={{ padding: '0.75rem 1.5rem' }}
              >
                {walkIndex < walkSteps.length - 1 ? (
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    Next <ChevronRight size={20} />
                  </span>
                ) : (
                  'Finish Walk'
                )}
              </button>
            </div>
          </motion.div>
        )}

        {/* Empty walk */}
        {view === 'walk' && walkSteps.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <div style={{ textAlign: 'center' }}>
              <Link2 size={48} style={{ margin: '0 auto', color: 'var(--color-muted-foreground)', marginBottom: '1rem' }} />
              <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>No Stories Yet</h2>
              <p style={{ color: 'var(--color-muted-foreground)', marginBottom: '1.5rem' }}>Add story links to your chain first</p>
              <button
                className="btn-secondary"
                onClick={() => setView('chain-detail')}
                style={{ padding: '0.75rem 1.5rem' }}
              >
                Back to Chain
              </button>
            </div>
          </motion.div>
        )}

        {/* QUIZ VIEW */}
        {(view === 'quiz-forward' || view === 'quiz-backward') && (
          <motion.div
            key="quiz"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
          >
            <div style={{ color: 'var(--color-muted-foreground)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
              Score: {score.correct}/{score.total}
            </div>

            {currentQuestion ? (
              <div className="glass-card" style={{ padding: '2rem', maxWidth: '28rem', width: '100%', marginBottom: '1.5rem' }}>
                <p style={{ fontSize: '1.125rem', marginBottom: '1rem' }}>{currentQuestion.prompt}</p>
                <p style={{ color: 'var(--color-muted-foreground)', fontSize: '0.875rem', fontStyle: 'italic', marginBottom: '1.5rem' }}>&ldquo;{currentQuestion.story}&rdquo;</p>

                {!showResult ? (
                  <>
                    <input
                      type="number"
                      value={userAnswer}
                      onChange={(e) => setUserAnswer(e.target.value)}
                      placeholder="Ayah number..."
                      onKeyDown={(e) => e.key === 'Enter' && checkAnswer()}
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
                      onClick={checkAnswer}
                      style={{ width: '100%' }}
                    >
                      Check Answer
                    </button>
                  </>
                ) : (
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>
                      {isCorrect
                        ? <Check size={48} style={{ margin: '0 auto', color: '#4ade80' }} />
                        : <X size={48} style={{ margin: '0 auto', color: '#fb7185' }} />
                      }
                    </div>
                    <p style={{ marginBottom: '1rem' }}>
                      {isCorrect ? 'Correct!' : `Answer: ${currentQuestion.answer.surah}:${currentQuestion.answer.ayah}`}
                    </p>
                    <button
                      className="btn-primary"
                      onClick={nextQuestion}
                      style={{ padding: '0.75rem 1.5rem' }}
                    >
                      Next Question
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div style={{ textAlign: 'center' }}>
                <p style={{ color: 'var(--color-muted-foreground)', marginBottom: '1rem' }}>No questions available</p>
                <button
                  className="btn-secondary"
                  onClick={() => setView('chain-detail')}
                  style={{ padding: '0.75rem 1.5rem' }}
                >
                  Back to Chain
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
