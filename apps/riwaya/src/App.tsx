import { useHashRouter } from './hooks/useHashRouter';
import { useProgress } from './hooks/useProgress';
import { getArc, getEpisode } from './data/arcs';
import { Layout } from './components/Layout';
import { HomePage } from './components/HomePage';
import { EpisodePlayer } from './components/EpisodePlayer';
import { EpisodeLocked } from './components/EpisodeLocked';

export default function App() {
  const { route, navigate } = useHashRouter();
  const {
    progress,
    isEpisodeCompleted,
    isEpisodeUnlocked,
    completeEpisode,
    getArcProgress,
  } = useProgress();

  function renderPage() {
    if (route.page === 'story') {
      const arc = getArc(route.arcId);
      const episode = getEpisode(route.arcId, route.episodeNum);

      if (!arc || !episode) {
        return (
          <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
            <p className="text-lg text-parchment-dark">Episode not found.</p>
            <button
              onClick={() => navigate('')}
              className="px-4 py-2 bg-lapis text-white rounded-lg hover:bg-lapis/90 transition-colors"
            >
              Back to Home
            </button>
          </div>
        );
      }

      if (!isEpisodeUnlocked(route.arcId, route.episodeNum)) {
        return (
          <EpisodeLocked
            episodeNum={route.episodeNum}
            onBack={() => navigate('')}
          />
        );
      }

      return (
        <EpisodePlayer
          episode={episode}
          arc={arc}
          isCompleted={isEpisodeCompleted(route.arcId, route.episodeNum)}
          onComplete={() =>
            completeEpisode(route.arcId, route.episodeNum, arc.totalEpisodes)
          }
          onNext={() => {
            const nextEp = route.episodeNum + 1;
            if (nextEp <= arc.totalEpisodes) {
              navigate(`stories/${route.arcId}/${nextEp}`);
            } else {
              navigate('');
            }
          }}
          onBack={() => navigate('')}
        />
      );
    }

    return (
      <HomePage
        progress={progress}
        isEpisodeCompleted={isEpisodeCompleted}
        isEpisodeUnlocked={isEpisodeUnlocked}
        getArcProgress={getArcProgress}
        onSelectEpisode={(arcId, episodeNum) =>
          navigate(`stories/${arcId}/${episodeNum}`)
        }
      />
    );
  }

  return <Layout totalXp={progress.totalXp}>{renderPage()}</Layout>;
}
