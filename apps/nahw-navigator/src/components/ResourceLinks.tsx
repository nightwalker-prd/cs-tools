import type { Difficulty } from '../data/types';
import type { ResourceInfo } from '../data/video-mapping';
import { getResourcesForDifficulty, fstuResources } from '../data/video-mapping';
import type { ViewMode } from '../data/view-data';

interface ResourceLinksProps {
  difficulty: Difficulty;
  viewMode: ViewMode;
  activePdfUrl?: string | null;
  onSelectPdf?: (resource: ResourceInfo) => void;
}

export function ResourceLinks({ difficulty, viewMode, activePdfUrl, onSelectPdf }: ResourceLinksProps) {
  const classicRes = getResourcesForDifficulty(difficulty);
  const resources = viewMode === 'fstu' ? fstuResources : [classicRes];

  return (
    <div className="resource-links">
      {resources.map((res) => (
        <button
          key={res.textbookName}
          className={`resource-link${activePdfUrl === res.pdfUrl ? ' resource-link-active' : ''}`}
          onClick={() => onSelectPdf?.(res)}
        >
          <span className="resource-link-icon">PDF</span>
          {res.textbookName} Textbook
        </button>
      ))}
      <a
        className="resource-link"
        href={classicRes.durusUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        <span className="resource-link-icon">▶</span>
        Watch in Durus
      </a>
      <a
        className="resource-link"
        href={classicRes.resourceUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        <span className="resource-link-icon">↗</span>
        More Resources
      </a>
    </div>
  );
}
