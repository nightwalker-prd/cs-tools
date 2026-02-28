/**
 * Tarkeeb Analysis Tool
 *
 * Standalone Arabic grammar analysis tool for sentence parsing.
 * Part of the Arab Tools monorepo.
 */

import { TarkeebTool } from './components/TarkeebTool';

export default function App() {
  // For standalone use, onBack just stays on the page
  const handleBack = () => {
    // In standalone mode, we don't navigate away
  };

  return <TarkeebTool onBack={handleBack} />;
}
