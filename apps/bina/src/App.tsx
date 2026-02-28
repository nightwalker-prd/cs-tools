import { useHashRouter } from './hooks/useHashRouter';
import { Layout } from './components/Layout';
import { HomePage } from './components/HomePage';
import { ChallengePage } from './components/ChallengePage';

export default function App() {
  const { challengeId, navigate, goHome } = useHashRouter();

  return (
    <Layout activeChallengeId={challengeId} onNavigate={navigate} onGoHome={goHome}>
      {!challengeId ? (
        <HomePage onNavigate={navigate} />
      ) : (
        <ChallengePage key={challengeId} challengeId={challengeId} onGoHome={goHome} onNavigate={navigate} />
      )}
    </Layout>
  );
}
