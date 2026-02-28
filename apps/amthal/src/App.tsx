import { useHashRouter } from './hooks/useHashRouter';
import { useFavorites } from './hooks/useFavorites';
import { useProgress } from './hooks/useProgress';
import { Layout } from './components/Layout';
import { HomePage } from './components/HomePage';
import { BrowsePage } from './components/BrowsePage';
import { ProverbDetail } from './components/ProverbDetail';
import { QuizPage } from './components/QuizPage';
import { QuizSession } from './components/QuizSession';
import { FavoritesPage } from './components/FavoritesPage';
import type { ProverbCategory, QuizMode } from './types';

const VALID_CATEGORIES: ProverbCategory[] = ['wisdom', 'social', 'humor', 'perseverance', 'knowledge', 'faith'];
const VALID_QUIZ_MODES: QuizMode[] = ['match-halves', 'guess-meaning', 'fill-blank'];

export default function App() {
  const { route, navigate, goHome } = useHashRouter();
  const { favorites, toggleFavorite, isFavorite } = useFavorites();
  const { progress, recordQuizResult, markViewed, getBestScore } = useProgress();

  const renderPage = () => {
    switch (route.type) {
      case 'home':
        return <HomePage navigate={navigate} progress={progress} />;

      case 'browse':
        return (
          <BrowsePage
            navigate={navigate}
            isFavorite={isFavorite}
            onToggleFavorite={toggleFavorite}
          />
        );

      case 'browse-category': {
        const cat = route.id as ProverbCategory;
        if (!VALID_CATEGORIES.includes(cat)) {
          return <BrowsePage navigate={navigate} isFavorite={isFavorite} onToggleFavorite={toggleFavorite} />;
        }
        return (
          <BrowsePage
            category={cat}
            navigate={navigate}
            isFavorite={isFavorite}
            onToggleFavorite={toggleFavorite}
          />
        );
      }

      case 'proverb':
        return (
          <ProverbDetail
            proverbId={route.id || ''}
            navigate={navigate}
            isFavorite={isFavorite(route.id || '')}
            onToggleFavorite={toggleFavorite}
            onViewed={markViewed}
          />
        );

      case 'quiz':
        return <QuizPage navigate={navigate} getBestScore={getBestScore} />;

      case 'quiz-session': {
        const mode = route.id as QuizMode;
        if (!VALID_QUIZ_MODES.includes(mode)) {
          return <QuizPage navigate={navigate} getBestScore={getBestScore} />;
        }
        return (
          <QuizSession
            key={`${mode}-${Date.now()}`}
            mode={mode}
            navigate={navigate}
            onComplete={recordQuizResult}
          />
        );
      }

      case 'favorites':
        return (
          <FavoritesPage
            favorites={favorites}
            isFavorite={isFavorite}
            onToggleFavorite={toggleFavorite}
            navigate={navigate}
          />
        );

      default:
        return <HomePage navigate={navigate} progress={progress} />;
    }
  };

  return (
    <Layout
      currentRoute={route.type}
      navigate={navigate}
      goHome={goHome}
      favoriteCount={favorites.length}
    >
      {renderPage()}
    </Layout>
  );
}
