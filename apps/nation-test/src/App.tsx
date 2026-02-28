import { useHashRouter } from './hooks/useHashRouter';
import { Layout } from './components/Layout';
import { HomePage } from './components/HomePage';
import { TestTypePage } from './components/TestTypePage';

export default function App() {
  const { testType, navigate, goHome } = useHashRouter();

  return (
    <Layout activeType={testType} onNavigate={navigate} onGoHome={goHome}>
      {!testType ? (
        <HomePage onNavigate={navigate} />
      ) : (
        <TestTypePage key={testType} testType={testType} onGoHome={goHome} />
      )}
    </Layout>
  );
}
