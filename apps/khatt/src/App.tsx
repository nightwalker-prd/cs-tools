import { useHashRouter } from '@/hooks/useHashRouter';
import { useNotebook } from '@/hooks/useNotebook';
import { useDrawingSettings } from '@/hooks/useDrawingSettings';
import { NotebookBrowser } from '@/components/NotebookBrowser';
import { PageBrowser } from '@/components/PageBrowser';
import { Canvas } from '@/components/Canvas';

export default function App() {
  const router = useHashRouter();
  const notebook = useNotebook();
  const [settings, updateSettings] = useDrawingSettings();

  if (router.view === 'page' && router.pageId) {
    return (
      <Canvas
        pageId={router.pageId}
        notebook={notebook}
        settings={settings}
        updateSettings={updateSettings}
        onNavigate={router.navigate}
      />
    );
  }

  if (router.view === 'notebook' && router.notebookId) {
    return (
      <PageBrowser
        notebookId={router.notebookId}
        notebook={notebook}
        onNavigate={router.navigate}
      />
    );
  }

  return (
    <NotebookBrowser
      notebook={notebook}
      onNavigate={router.navigate}
    />
  );
}
