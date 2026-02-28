import { Button } from '@cstools/ui';
import { CheckCircle2, Circle } from 'lucide-react';
import { ConceptCard } from './ConceptCard';
import type { Chapter } from '../data/topics';

interface TopicViewProps {
  chapter: Chapter;
  bookmarks: string[];
  onToggleBookmark: (id: string) => void;
  isCompleted: boolean;
  onToggleCompleted: () => void;
}

export function TopicView({ chapter, bookmarks, onToggleBookmark, isCompleted, onToggleCompleted }: TopicViewProps) {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <span className="text-xs text-[#8B949E] bg-[#21262D] px-2 py-0.5 rounded">
            Topic {chapter.id}
          </span>
          <h1 className="text-2xl font-bold text-[#E6EDF3] mt-2">{chapter.title}</h1>
          <p className="text-sm text-[#8B949E] mt-1">{chapter.concepts.length} concepts</p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleCompleted}
          className={isCompleted ? 'text-[#3FB950]' : 'text-[#8B949E]'}
        >
          {isCompleted ? <CheckCircle2 className="w-4 h-4 mr-1" /> : <Circle className="w-4 h-4 mr-1" />}
          {isCompleted ? 'Completed' : 'Mark Complete'}
        </Button>
      </div>

      <div className="space-y-4">
        {chapter.concepts.map(concept => (
          <ConceptCard
            key={concept.id}
            concept={concept}
            isBookmarked={bookmarks.includes(concept.id)}
            onToggleBookmark={onToggleBookmark}
          />
        ))}
      </div>
    </div>
  );
}
