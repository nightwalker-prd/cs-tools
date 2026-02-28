import { useRouter } from './hooks/useRouter';
import BottomNav from './components/BottomNav';
import PageContainer from './components/PageContainer';
import StudyPage from './pages/StudyPage';
import ReadPage from './pages/ReadPage';
import SurahReaderPage from './pages/SurahReaderPage';
import LessonPage from './pages/LessonPage';
import WordDetailPage from './pages/WordDetailPage';
import SettingsPage from './pages/SettingsPage';

export default function App() {
  const { route, navigate } = useRouter();

  const renderPage = () => {
    switch (route.page) {
      case 'study': return <StudyPage />;
      case 'read': return <ReadPage />;
      case 'surah': return <SurahReaderPage surahNum={route.params.surahNum} />;
      case 'lesson': return <LessonPage />;
      case 'word': return <WordDetailPage lemmaId={route.params.lemmaId} />;
      case 'settings': return <SettingsPage />;
      default: return <StudyPage />;
    }
  };

  const showNav = !['lesson', 'word', 'surah'].includes(route.page);

  return (
    <div className="min-h-screen bg-background desktop-bg">
      <PageContainer>
        {renderPage()}
      </PageContainer>
      {showNav && <BottomNav currentPage={route.page} navigate={navigate} />}
    </div>
  );
}
