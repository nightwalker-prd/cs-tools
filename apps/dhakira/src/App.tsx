import { useHashRouter } from './hooks/useHashRouter';
import { Layout } from './components/Layout';
import { HomePage } from './components/HomePage';
import { GamePage } from './components/GamePage';

export default function App() {
  const { gameId, navigate, goHome } = useHashRouter();

  return (
    <Layout activeGame={gameId} onNavigate={navigate} onGoHome={goHome}>
      {gameId ? (
        <GamePage gameId={gameId} onBack={goHome} />
      ) : (
        <HomePage onNavigate={navigate} />
      )}
    </Layout>
  );
}
