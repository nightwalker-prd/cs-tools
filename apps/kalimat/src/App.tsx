import { useHashRouter } from '@/hooks/useHashRouter';
import { useLearningEngine } from '@/hooks/useLearningEngine';
import { Layout } from '@/components/Layout';
import { Home } from '@/components/browse/Home';
import { SurahBrowser } from '@/components/browse/SurahBrowser';
import { SurahWordList } from '@/components/browse/SurahWordList';
import { RootBrowser } from '@/components/browse/RootBrowser';
import { RootDetail } from '@/components/browse/RootDetail';
import { FrequencyBrowser } from '@/components/browse/FrequencyBrowser';
import { LemmaDetail } from '@/components/browse/LemmaDetail';
import { PatternBrowser } from '@/components/browse/PatternBrowser';
import { PatternDetail } from '@/components/browse/PatternDetail';
import { AyahView } from '@/components/context/AyahView';
import { WordAnatomy } from '@/components/anatomy/WordAnatomy';
import { LearnConfig } from '@/components/learn/LearnConfig';
import { StudySession } from '@/components/learn/StudySession';
import { AssessmentTest } from '@/components/learn/AssessmentTest';
import { ProgressDashboard } from '@/components/progress/ProgressDashboard';
import { QuranReader } from '@/components/reader/QuranReader';
import { WeakVerbTrainer } from '@/components/weak-verbs/WeakVerbTrainer';
import { SimilarWordsTrainer } from '@/components/learn/SimilarWordsTrainer';
import { FamilyHub } from '@/components/families/FamilyHub';
import { FamilyTree } from '@/components/families/FamilyTree';
import { ClusterBrowser } from '@/components/families/ClusterBrowser';
import { ClusterDetail } from '@/components/families/ClusterDetail';
import type { SessionConfig } from '@/types';

export default function App() {
  const { route, navigate } = useHashRouter();
  const { sessionConfig, setSessionConfig } = useLearningEngine();

  const handleStartSession = (config: SessionConfig) => {
    setSessionConfig(config);
    navigate('#/session');
  };

  let content: React.ReactNode;

  switch (route.page) {
    case 'home':
      content = <Home navigate={navigate} />;
      break;
    case 'surah-list':
      content = <SurahBrowser navigate={navigate} />;
      break;
    case 'surah':
      content = <SurahWordList surahNum={route.num} navigate={navigate} />;
      break;
    case 'root-browser':
      content = <RootBrowser navigate={navigate} />;
      break;
    case 'root':
      content = <RootDetail root={route.root} navigate={navigate} />;
      break;
    case 'frequency':
      content = <FrequencyBrowser tier={route.tier} navigate={navigate} />;
      break;
    case 'lemma':
      content = <LemmaDetail lemmaId={route.id} navigate={navigate} />;
      break;
    case 'ayah':
      content = <AyahView surahNum={route.surah} ayahNum={route.ayah} navigate={navigate} />;
      break;
    case 'word-anatomy':
      content = <WordAnatomy surah={route.surah} ayah={route.ayah} word={route.word} navigate={navigate} />;
      break;
    case 'patterns':
      content = <PatternBrowser navigate={navigate} />;
      break;
    case 'pattern':
      content = <PatternDetail patternId={route.id} navigate={navigate} />;
      break;
    case 'assessment':
      content = <AssessmentTest navigate={navigate} />;
      break;
    case 'progress':
      content = <ProgressDashboard navigate={navigate} />;
      break;
    case 'read':
      content = <QuranReader surahNum={route.surahNum} navigate={navigate} />;
      break;
    case 'weak-verbs':
      content = <WeakVerbTrainer navigate={navigate} />;
      break;
    case 'similar-words':
      content = <SimilarWordsTrainer navigate={navigate} />;
      break;
    case 'family-hub':
      content = <FamilyHub navigate={navigate} />;
      break;
    case 'family-tree':
      content = <FamilyTree root={route.root} navigate={navigate} />;
      break;
    case 'cluster-browser':
      content = <ClusterBrowser navigate={navigate} />;
      break;
    case 'cluster-detail':
      content = <ClusterDetail id={route.id} navigate={navigate} />;
      break;
    case 'learn':
      content = <LearnConfig onStart={handleStartSession} navigate={navigate} />;
      break;
    case 'session':
      if (sessionConfig) {
        content = <StudySession config={sessionConfig} navigate={navigate} />;
      } else {
        content = <LearnConfig onStart={handleStartSession} navigate={navigate} />;
      }
      break;
    case 'results':
      // Results are shown inline by StudySession when done
      content = <LearnConfig onStart={handleStartSession} navigate={navigate} />;
      break;
    default:
      content = <Home navigate={navigate} />;
  }

  return (
    <Layout route={route} navigate={navigate}>
      {content}
    </Layout>
  );
}
