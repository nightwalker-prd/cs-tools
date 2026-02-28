import { lazy, Suspense } from 'react';
import { usePersistedState } from '@arabtools/core';
import { useHashRouter } from './hooks/useHashRouter';
import { Layout } from './components/Layout';
import { HomePage } from './components/HomePage';
import { ConfigPanel } from './components/ConfigPanel';
import { ExerciseView } from './components/ExerciseView';
import { ResultsView } from './components/ResultsView';
import { SplitPane } from './components/SplitPane';
import { useExerciseSession } from './hooks/useExerciseSession';
import { useSarfSrs } from './hooks/useSarfSrs';

const PdfViewer = lazy(() => import('./components/PdfViewer').then(m => ({ default: m.PdfViewer })));

export default function App() {
  const { route, navigate, goHome } = useHashRouter();
  const srs = useSarfSrs();
  const session = useExerciseSession(srs, navigate);
  const [showPdf, setShowPdf] = usePersistedState('sarf-ex-show-pdf', false);

  const togglePdf = () => setShowPdf(prev => !prev);

  const content = (
    <>
      {route === '' && (
        <HomePage onNavigate={navigate} srs={srs} />
      )}
      {route === 'config' && (
        <ConfigPanel onStart={session.start} />
      )}
      {route === 'exercise' && session.state && (
        <ExerciseView session={session} srs={srs} />
      )}
      {route === 'results' && session.results && (
        <ResultsView results={session.results} onGoHome={goHome} onRestart={() => navigate('config')} />
      )}
    </>
  );

  return (
    <Layout route={route} onNavigate={navigate} onGoHome={goHome} srs={srs} showPdf={showPdf} onTogglePdf={togglePdf}>
      {showPdf ? (
        <SplitPane
          pdfPane={
            <Suspense fallback={<div className="pdf-loading"><p>Loading viewer...</p></div>}>
              <PdfViewer />
            </Suspense>
          }
          exercisePane={
            <div className="main-content-center">
              {content}
            </div>
          }
        />
      ) : (
        <div className="main-content-center">
          {content}
        </div>
      )}
    </Layout>
  );
}
