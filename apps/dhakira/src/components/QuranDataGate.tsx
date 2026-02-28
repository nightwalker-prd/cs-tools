import { useQuranDataLoader } from '../hooks/quran/useQuranDataLoader'

interface QuranDataGateProps {
  children: React.ReactNode
}

export function QuranDataGate({ children }: QuranDataGateProps) {
  const { loading, error, isReady } = useQuranDataLoader()

  if (loading) {
    return (
      <div className="game-page" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
        <div style={{ textAlign: 'center' }}>
          <div className="loading-spinner" />
          <p style={{ marginTop: '1rem', color: 'var(--color-muted-foreground)' }}>Loading Quran data...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="game-page" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
        <div className="glass-card" style={{ padding: '2rem', textAlign: 'center', maxWidth: '400px' }}>
          <p style={{ color: 'var(--color-foreground)', fontWeight: 600, marginBottom: '0.5rem' }}>Failed to load Quran data</p>
          <p style={{ color: 'var(--color-muted-foreground)', fontSize: '0.875rem' }}>{error}</p>
          <button className="btn-primary" style={{ marginTop: '1rem' }} onClick={() => window.location.reload()}>
            Retry
          </button>
        </div>
      </div>
    )
  }

  if (!isReady) return null

  return <>{children}</>
}
