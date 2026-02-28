// pages/quran/MemoryPalace.tsx
// Method of Loci for Quran memorization
// Based on: Moonwalking with Einstein (Foer), The Art of Memory (Yates)

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft, MapPin, Plus, Home, Building, School,
  Eye, Check, X, ChevronRight, ChevronLeft, Footprints,
  HelpCircle, RotateCcw, Trash2
} from 'lucide-react'
import { useMemoryPalace } from '../../hooks/quran'
import { SURAH_DATA } from '../../data/quran-surah'
import type {
  MemoryPalace as Palace,
  PalaceRoom,
  WalkStep,
  RecallQuestion,
  LocationQuestion,
} from '../../hooks/quran/useMemoryPalace'

interface MemoryPalaceProps {
  onBack: () => void
}

type ViewState = 'list' | 'palace-detail' | 'place-ayah' | 'walk' | 'recall-quiz' | 'location-quiz'

export function MemoryPalace({ onBack }: MemoryPalaceProps) {
  const [view, setView] = useState<ViewState>('list')
  const [selectedPalace, setSelectedPalace] = useState<Palace | null>(null)
  const [selectedRoom, setSelectedRoom] = useState<PalaceRoom | null>(null)
  const [selectedLocusIndex, setSelectedLocusIndex] = useState<number>(0)

  // Walk state
  const [walkSteps, setWalkSteps] = useState<WalkStep[]>([])
  const [walkIndex, setWalkIndex] = useState(0)
  const [showAyah, setShowAyah] = useState(false)
  const [isReverse, setIsReverse] = useState(false)

  // Quiz state
  const [currentQuestion, setCurrentQuestion] = useState<RecallQuestion | LocationQuestion | null>(null)
  const [userAnswer, setUserAnswer] = useState('')
  const [showResult, setShowResult] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [score, setScore] = useState({ correct: 0, total: 0 })

  // Placement state
  const [placementSurah, setPlacementSurah] = useState(1)
  const [placementAyah, setPlacementAyah] = useState(1)
  const [placementMnemonic, setPlacementMnemonic] = useState('')

  const {
    palaces,
    getTemplates,
    createFromTemplate,
    deletePalace,
    getPlacements,
    placeAyah,
    removePlacement,
    generateWalk,
    generateRecallQuestion,
    generateLocationQuestion
  } = useMemoryPalace()

  const templates = getTemplates()

  const getIcon = (id: string) => {
    if (id.includes('home')) return Home
    if (id.includes('masjid')) return Building
    return School
  }

  // Start palace walk
  const startWalk = (reverse = false) => {
    if (!selectedPalace) return
    setIsReverse(reverse)
    const steps = generateWalk(selectedPalace.id, { reverse })
    setWalkSteps(steps)
    setWalkIndex(0)
    setShowAyah(false)
    setView('walk')
  }

  // Start recall quiz
  const startRecallQuiz = () => {
    if (!selectedPalace) return
    setScore({ correct: 0, total: 0 })
    nextRecallQuestion()
    setView('recall-quiz')
  }

  const nextRecallQuestion = () => {
    if (!selectedPalace) return
    const question = generateRecallQuestion(selectedPalace.id)
    setCurrentQuestion(question)
    setUserAnswer('')
    setShowResult(false)
  }

  // Start location quiz
  const startLocationQuiz = () => {
    if (!selectedPalace) return
    setScore({ correct: 0, total: 0 })
    nextLocationQuestion()
    setView('location-quiz')
  }

  const nextLocationQuestion = () => {
    if (!selectedPalace) return
    const question = generateLocationQuestion(selectedPalace.id)
    setCurrentQuestion(question)
    setUserAnswer('')
    setShowResult(false)
  }

  // Check answer for recall quiz
  const checkRecallAnswer = () => {
    if (!currentQuestion || !('answer' in currentQuestion) || !('prompt' in currentQuestion)) return
    const q = currentQuestion as RecallQuestion
    const [surah, ayah] = userAnswer.split(':').map(Number)
    const correct = surah === q.answer.surah && ayah === q.answer.ayah
    setIsCorrect(correct)
    setShowResult(true)
    setScore(prev => ({
      correct: prev.correct + (correct ? 1 : 0),
      total: prev.total + 1
    }))
  }

  // Check answer for location quiz
  const checkLocationAnswer = () => {
    if (!currentQuestion || !('ayahRef' in currentQuestion)) return
    const q = currentQuestion as LocationQuestion
    const correct = userAnswer.toLowerCase().includes(q.answer.roomName.toLowerCase())
    setIsCorrect(correct)
    setShowResult(true)
    setScore(prev => ({
      correct: prev.correct + (correct ? 1 : 0),
      total: prev.total + 1
    }))
  }

  // Handle ayah placement
  const handlePlaceAyah = () => {
    if (!selectedPalace || !selectedRoom) return
    const success = placeAyah({
      palaceId: selectedPalace.id,
      roomId: selectedRoom.id,
      locusIndex: selectedLocusIndex,
      surah: placementSurah,
      ayah: placementAyah,
      mnemonic: placementMnemonic || undefined
    })
    if (success) {
      setPlacementMnemonic('')
      setPlacementAyah(prev => prev + 1)
      if (selectedLocusIndex < selectedRoom.lociCount - 1) {
        setSelectedLocusIndex(prev => prev + 1)
      }
    }
  }

  const currentPlacement = selectedPalace && selectedRoom ?
    getPlacements(selectedPalace.id).find(
      p => p.roomId === selectedRoom.id && p.locusIndex === selectedLocusIndex
    ) : null

  return (
    <div className="game-page" style={{ padding: '2rem', overflowY: 'auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
        <button
          className="back-btn"
          onClick={() => {
            if (view === 'list') onBack()
            else if (view === 'palace-detail') setView('list')
            else if (view === 'place-ayah') setView('palace-detail')
            else setView('palace-detail')
          }}
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 style={{ fontSize: '1.5rem', margin: 0 }}>Memory Palace</h1>
          <p style={{ color: 'var(--color-muted-foreground)', fontSize: '0.875rem', margin: 0 }}>
            {view === 'list' && 'Place ayahs in mental locations'}
            {view === 'palace-detail' && selectedPalace?.name}
            {view === 'place-ayah' && `Placing in ${selectedRoom?.name}`}
            {view === 'walk' && `Walking through ${selectedPalace?.name}`}
            {view === 'recall-quiz' && 'Location → Ayah Quiz'}
            {view === 'location-quiz' && 'Ayah → Location Quiz'}
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
            {palaces.length > 0 && (
              <div style={{ marginBottom: '2rem' }}>
                <h2 style={{ color: 'var(--color-muted-foreground)', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.75rem' }}>Your Palaces</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
                  {palaces.map(palace => {
                    const placements = getPlacements(palace.id)
                    const Icon = getIcon(palace.id)
                    return (
                      <motion.button
                        key={palace.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        onClick={() => {
                          setSelectedPalace(palace)
                          setView('palace-detail')
                        }}
                        className="glass-card"
                        style={{ padding: '1.25rem', textAlign: 'left', cursor: 'pointer', border: 'none', width: '100%' }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                          <div>
                            <h3 style={{ fontWeight: 500, margin: 0 }}>{palace.name}</h3>
                            <p style={{ color: 'var(--color-muted-foreground)', fontSize: '0.875rem', margin: 0 }}>{palace.rooms?.length ?? 0} rooms</p>
                          </div>
                          <Icon size={24} style={{ color: 'var(--color-accent)' }} />
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ color: 'var(--color-muted-foreground)', fontSize: '0.75rem' }}>{placements.length} ayahs placed</span>
                          <ChevronRight size={16} style={{ color: 'var(--color-muted-foreground)' }} />
                        </div>
                      </motion.button>
                    )
                  })}
                </div>
              </div>
            )}

            <div>
              <h2 style={{ color: 'var(--color-muted-foreground)', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.75rem' }}>
                {palaces.length > 0 ? 'Add Another Palace' : 'Create Your First Palace'}
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
                {templates.map(template => {
                  const Icon = getIcon(template.id)
                  return (
                    <motion.button
                      key={template.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      onClick={() => createFromTemplate(template.id)}
                      className="glass-card"
                      style={{ padding: '1.25rem', textAlign: 'left', cursor: 'pointer', border: 'none', width: '100%' }}
                    >
                      <Icon size={24} style={{ color: 'var(--color-accent)', marginBottom: '0.5rem' }} />
                      <h3 style={{ fontWeight: 500, fontSize: '0.875rem', marginBottom: '0.25rem' }}>{template.name}</h3>
                      <p style={{ color: 'var(--color-muted-foreground)', fontSize: '0.75rem', margin: 0 }}>{template.description}</p>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: '0.5rem' }}>
                        <Plus size={14} style={{ color: 'var(--color-muted-foreground)' }} />
                        <span style={{ color: 'var(--color-muted-foreground)', fontSize: '0.75rem' }}>Create from template</span>
                      </div>
                    </motion.button>
                  )
                })}
              </div>
            </div>
          </motion.div>
        )}

        {/* PALACE DETAIL VIEW */}
        {view === 'palace-detail' && selectedPalace && (
          <motion.div
            key="detail"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
          >
            {/* Actions */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <button
                onClick={() => startWalk(false)}
                className="glass-card"
                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '1rem', cursor: 'pointer', border: 'none' }}
              >
                <Footprints size={20} style={{ color: 'var(--color-accent)' }} />
                <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>Walk Forward</span>
              </button>
              <button
                onClick={() => startWalk(true)}
                className="glass-card"
                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '1rem', cursor: 'pointer', border: 'none' }}
              >
                <RotateCcw size={20} style={{ color: 'var(--color-accent)' }} />
                <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>Walk Reverse</span>
              </button>
              <button
                onClick={startRecallQuiz}
                className="glass-card"
                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '1rem', cursor: 'pointer', border: 'none' }}
              >
                <HelpCircle size={20} style={{ color: '#fbbf24' }} />
                <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>Location Quiz</span>
              </button>
              <button
                onClick={startLocationQuiz}
                className="glass-card"
                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '1rem', cursor: 'pointer', border: 'none' }}
              >
                <MapPin size={20} style={{ color: '#22d3ee' }} />
                <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>Ayah Quiz</span>
              </button>
            </div>

            {/* Rooms */}
            <h2 style={{ color: 'var(--color-muted-foreground)', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.75rem' }}>Rooms</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
              {selectedPalace.rooms?.map(room => {
                const roomPlacements = getPlacements(selectedPalace.id).filter(p => p.roomId === room.id)
                return (
                  <motion.button
                    key={room.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    onClick={() => {
                      setSelectedRoom(room)
                      setSelectedLocusIndex(0)
                      setView('place-ayah')
                    }}
                    className="glass-card"
                    style={{ padding: '1rem', textAlign: 'left', cursor: 'pointer', border: 'none', width: '100%' }}
                  >
                    <h3 style={{ fontWeight: 500, marginBottom: '0.25rem' }}>{room.name}</h3>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ color: 'var(--color-muted-foreground)', fontSize: '0.75rem' }}>{room.lociCount} loci</span>
                      <span style={{ color: 'var(--color-accent)', fontSize: '0.75rem' }}>{roomPlacements.length} placed</span>
                    </div>
                    {/* Loci progress */}
                    <div style={{ display: 'flex', gap: '0.25rem', marginTop: '0.5rem' }}>
                      {Array.from({ length: room.lociCount }).map((_, i) => {
                        const hasPlacement = roomPlacements.some(p => p.locusIndex === i)
                        return (
                          <div
                            key={i}
                            style={{
                              width: '0.5rem',
                              height: '0.5rem',
                              borderRadius: '50%',
                              background: hasPlacement ? 'var(--color-accent)' : 'var(--color-muted)',
                            }}
                          />
                        )
                      })}
                    </div>
                  </motion.button>
                )
              })}
            </div>

            {/* Delete Palace */}
            <button
              onClick={() => {
                deletePalace(selectedPalace.id)
                setView('list')
              }}
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#f87171', fontSize: '0.875rem', background: 'none', border: 'none', cursor: 'pointer' }}
            >
              <Trash2 size={16} />
              Delete this palace
            </button>
          </motion.div>
        )}

        {/* PLACE AYAH VIEW */}
        {view === 'place-ayah' && selectedPalace && selectedRoom && (
          <motion.div
            key="place"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
          >
            {/* Loci selector */}
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
              {Array.from({ length: selectedRoom.lociCount }).map((_, i) => {
                const hasPlacement = getPlacements(selectedPalace.id).some(
                  p => p.roomId === selectedRoom.id && p.locusIndex === i
                )
                return (
                  <button
                    key={i}
                    onClick={() => setSelectedLocusIndex(i)}
                    style={{
                      flexShrink: 0,
                      width: '3rem',
                      height: '3rem',
                      borderRadius: '0.75rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 'bold',
                      border: 'none',
                      cursor: 'pointer',
                      background: selectedLocusIndex === i
                        ? 'var(--color-accent)'
                        : hasPlacement
                          ? 'rgba(197, 162, 83, 0.3)'
                          : 'var(--color-secondary)',
                      color: selectedLocusIndex === i
                        ? '#fff'
                        : hasPlacement
                          ? 'var(--color-accent)'
                          : 'var(--color-foreground)',
                    }}
                  >
                    {i + 1}
                  </button>
                )
              })}
            </div>

            {/* Current placement or form */}
            {currentPlacement ? (
              <div className="glass-card" style={{ padding: '1.5rem', marginBottom: '1rem' }}>
                <div style={{ color: 'var(--color-accent)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                  Locus {selectedLocusIndex + 1} - Occupied
                </div>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                  {currentPlacement.surah}:{currentPlacement.ayah}
                </div>
                {currentPlacement.mnemonic && (
                  <p style={{ color: 'var(--color-muted-foreground)', fontSize: '0.875rem', marginBottom: '1rem' }}>{currentPlacement.mnemonic}</p>
                )}
                <button
                  onClick={() => removePlacement(selectedPalace.id, selectedRoom.id, selectedLocusIndex)}
                  style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#f87171', fontSize: '0.875rem', background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  <Trash2 size={14} />
                  Remove placement
                </button>
              </div>
            ) : (
              <div className="glass-card" style={{ padding: '1.5rem' }}>
                <div style={{ color: 'var(--color-muted-foreground)', fontSize: '0.875rem', marginBottom: '1rem' }}>
                  Place an ayah at Locus {selectedLocusIndex + 1}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                  <div>
                    <label style={{ color: 'var(--color-muted-foreground)', fontSize: '0.75rem', marginBottom: '0.25rem', display: 'block' }}>Surah</label>
                    <select
                      value={placementSurah}
                      onChange={(e) => {
                        setPlacementSurah(Number(e.target.value))
                        setPlacementAyah(1)
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
                    <label style={{ color: 'var(--color-muted-foreground)', fontSize: '0.75rem', marginBottom: '0.25rem', display: 'block' }}>Ayah</label>
                    <input
                      type="number"
                      min={1}
                      max={SURAH_DATA[placementSurah - 1]?.ayahCount || 1}
                      value={placementAyah}
                      onChange={(e) => setPlacementAyah(Number(e.target.value))}
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

                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ color: 'var(--color-muted-foreground)', fontSize: '0.75rem', marginBottom: '0.25rem', display: 'block' }}>Mnemonic (optional)</label>
                  <textarea
                    value={placementMnemonic}
                    onChange={(e) => setPlacementMnemonic(e.target.value)}
                    placeholder="Describe a vivid image linking the ayah to this location..."
                    style={{
                      width: '100%',
                      background: 'var(--color-secondary)',
                      border: '1px solid var(--color-border)',
                      borderRadius: '0.5rem',
                      padding: '0.5rem 0.75rem',
                      color: 'var(--color-foreground)',
                      height: '6rem',
                      resize: 'none',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>

                <button
                  className="btn-primary"
                  onClick={handlePlaceAyah}
                  style={{ width: '100%' }}
                >
                  Place {placementSurah}:{placementAyah} Here
                </button>
              </div>
            )}
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
              {isReverse && ' (Reverse)'}
            </div>

            <div className="glass-card" style={{ padding: '2rem', maxWidth: '28rem', width: '100%', textAlign: 'center', marginBottom: '1.5rem' }}>
              <div style={{ color: 'var(--color-accent)', fontWeight: 500, marginBottom: '0.5rem' }}>
                {walkSteps[walkIndex].roomName}
              </div>
              <div style={{ color: 'var(--color-muted-foreground)', fontSize: '0.875rem', marginBottom: '1rem' }}>
                Locus {walkSteps[walkIndex].locusIndex + 1}
              </div>

              {walkSteps[walkIndex].mnemonic && (
                <p style={{ color: 'var(--color-muted-foreground)', fontSize: '0.875rem', fontStyle: 'italic', marginBottom: '1rem' }}>
                  &ldquo;{walkSteps[walkIndex].mnemonic}&rdquo;
                </p>
              )}

              <AnimatePresence mode="wait">
                {showAyah ? (
                  <motion.div
                    key="ayah"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    style={{ fontSize: '1.875rem', fontWeight: 'bold' }}
                  >
                    {walkSteps[walkIndex].surah}:{walkSteps[walkIndex].ayah}
                  </motion.div>
                ) : (
                  <motion.button
                    key="reveal"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onClick={() => setShowAyah(true)}
                    style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', margin: '0 auto', color: 'var(--color-accent)', background: 'none', border: 'none', cursor: 'pointer' }}
                  >
                    <Eye size={20} />
                    <span>Reveal Ayah</span>
                  </motion.button>
                )}
              </AnimatePresence>
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <button
                onClick={() => {
                  if (walkIndex > 0) {
                    setWalkIndex(prev => prev - 1)
                    setShowAyah(false)
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
                    setShowAyah(false)
                  } else {
                    setView('palace-detail')
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

        {/* Empty walk state */}
        {view === 'walk' && walkSteps.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <div style={{ textAlign: 'center' }}>
              <MapPin size={48} style={{ margin: '0 auto', color: 'var(--color-muted-foreground)', marginBottom: '1rem' }} />
              <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>No Ayahs Placed</h2>
              <p style={{ color: 'var(--color-muted-foreground)', marginBottom: '1.5rem' }}>Place some ayahs in your palace first</p>
              <button
                className="btn-secondary"
                onClick={() => setView('palace-detail')}
                style={{ padding: '0.75rem 1.5rem' }}
              >
                Back to Palace
              </button>
            </div>
          </motion.div>
        )}

        {/* RECALL QUIZ VIEW */}
        {view === 'recall-quiz' && (
          <motion.div
            key="recall"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
          >
            <div style={{ color: 'var(--color-muted-foreground)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
              Score: {score.correct}/{score.total}
            </div>

            {currentQuestion && 'prompt' in currentQuestion ? (
              <div className="glass-card" style={{ padding: '2rem', maxWidth: '28rem', width: '100%', marginBottom: '1.5rem' }}>
                <p style={{ fontSize: '1.125rem', marginBottom: '1rem' }}>
                  {(currentQuestion as RecallQuestion).prompt}
                </p>

                {(currentQuestion as RecallQuestion).hint && (
                  <p style={{ color: 'var(--color-muted-foreground)', fontSize: '0.875rem', fontStyle: 'italic', marginBottom: '1rem' }}>
                    Hint: &ldquo;{(currentQuestion as RecallQuestion).hint}&rdquo;
                  </p>
                )}

                {!showResult ? (
                  <>
                    <input
                      type="text"
                      value={userAnswer}
                      onChange={(e) => setUserAnswer(e.target.value)}
                      placeholder="e.g., 2:255"
                      onKeyDown={(e) => e.key === 'Enter' && checkRecallAnswer()}
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
                      onClick={checkRecallAnswer}
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
                      {isCorrect ? 'Correct!' : `Answer: ${(currentQuestion as RecallQuestion).answer.surah}:${(currentQuestion as RecallQuestion).answer.ayah}`}
                    </p>
                    <button
                      className="btn-primary"
                      onClick={nextRecallQuestion}
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
                  onClick={() => setView('palace-detail')}
                  style={{ padding: '0.75rem 1.5rem' }}
                >
                  Back to Palace
                </button>
              </div>
            )}
          </motion.div>
        )}

        {/* LOCATION QUIZ VIEW */}
        {view === 'location-quiz' && (
          <motion.div
            key="location"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
          >
            <div style={{ color: 'var(--color-muted-foreground)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
              Score: {score.correct}/{score.total}
            </div>

            {currentQuestion && 'ayahRef' in currentQuestion ? (
              <div className="glass-card" style={{ padding: '2rem', maxWidth: '28rem', width: '100%', marginBottom: '1.5rem' }}>
                <p style={{ fontSize: '1.125rem', marginBottom: '0.5rem' }}>Where is this ayah located?</p>
                <p style={{ color: 'var(--color-accent)', fontSize: '1.875rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>
                  {(currentQuestion as LocationQuestion).ayahRef}
                </p>

                {!showResult ? (
                  <>
                    <input
                      type="text"
                      value={userAnswer}
                      onChange={(e) => setUserAnswer(e.target.value)}
                      placeholder="Room name..."
                      onKeyDown={(e) => e.key === 'Enter' && checkLocationAnswer()}
                      style={{
                        width: '100%',
                        background: 'var(--color-secondary)',
                        border: '1px solid var(--color-border)',
                        borderRadius: '0.5rem',
                        padding: '0.75rem 1rem',
                        color: 'var(--color-foreground)',
                        textAlign: 'center',
                        marginBottom: '1rem',
                        boxSizing: 'border-box',
                      }}
                    />
                    <button
                      className="btn-primary"
                      onClick={checkLocationAnswer}
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
                      {isCorrect ? 'Correct!' : `Answer: ${(currentQuestion as LocationQuestion).answer.roomName}, Locus ${(currentQuestion as LocationQuestion).answer.locusIndex + 1}`}
                    </p>
                    <button
                      className="btn-primary"
                      onClick={nextLocationQuestion}
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
                  onClick={() => setView('palace-detail')}
                  style={{ padding: '0.75rem 1.5rem' }}
                >
                  Back to Palace
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
