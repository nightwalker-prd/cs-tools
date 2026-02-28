import { ArrowLeft } from 'lucide-react'
import { QuranSessionComplete } from './QuranSessionComplete'

interface QuranGameShellProps {
  title: string
  titleAr?: string
  icon: string
  onBack: () => void
  state: 'idle' | 'playing' | 'feedback' | 'complete' | 'answering'
  sessionResults?: Array<{ correct: boolean }>
  perfectRun?: number
  onStart: () => void
  onEndGame?: () => void
  description?: string
  children: React.ReactNode
}

export function QuranGameShell({
  title, titleAr, icon, onBack, state, sessionResults = [], perfectRun = 0,
  onStart, onEndGame, description, children,
}: QuranGameShellProps) {
  const correctCount = sessionResults.filter(r => r.correct).length
  const totalCount = sessionResults.length

  if (state === 'idle') {
    return (
      <div className="game-page animate-fade-in-up">
        <div className="game-header">
          <button className="back-btn" onClick={onBack} aria-label="Back">
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="game-title">{title}</h1>
            {titleAr && <p className="game-subtitle font-arabic" dir="rtl">{titleAr}</p>}
          </div>
        </div>
        <div className="game-area">
          <div className="glass-card" style={{ padding: '2rem', textAlign: 'center', maxWidth: '500px', width: '100%' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{icon}</div>
            {description && <p style={{ color: 'var(--color-muted-foreground)', fontSize: '0.875rem', marginBottom: '1.5rem' }}>{description}</p>}
            <button className="btn-primary" onClick={onStart}>Start Game</button>
          </div>
        </div>
      </div>
    )
  }

  if (state === 'complete') {
    return (
      <div className="game-page animate-fade-in-up">
        <div className="game-header">
          <button className="back-btn" onClick={onBack} aria-label="Back">
            <ArrowLeft size={20} />
          </button>
          <h1 className="game-title">{title}</h1>
        </div>
        <QuranSessionComplete
          correctCount={correctCount}
          totalCount={totalCount}
          perfectRun={perfectRun}
          onPlayAgain={onStart}
          onExit={onBack}
        />
      </div>
    )
  }

  return (
    <div className="game-page animate-fade-in-up">
      <div className="game-header" style={{ justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button className="back-btn" onClick={onEndGame || onBack} aria-label="Exit">
            <ArrowLeft size={20} />
          </button>
          <h1 className="game-title">{title}</h1>
        </div>
        <div style={{ display: 'flex', gap: '1rem', fontSize: '0.875rem', color: 'var(--color-muted-foreground)' }}>
          <span>{correctCount}/{totalCount}</span>
          {perfectRun > 0 && <span style={{ color: 'var(--color-accent)' }}>🔥 {perfectRun}</span>}
        </div>
      </div>
      {children}
    </div>
  )
}
