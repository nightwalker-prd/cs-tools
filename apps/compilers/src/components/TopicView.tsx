import { Button } from '@cstools/ui';
import { CheckCircle2, Circle } from 'lucide-react';
import type { Topic } from '../data/topics';
import { ConceptCard } from './ConceptCard';

interface TopicViewProps {
  chapter: Topic;
  bookmarks: string[];
  onToggleBookmark: (id: string) => void;
  isCompleted: boolean;
  onToggleCompleted: () => void;
}

export function TopicView({ chapter: topic, bookmarks, onToggleBookmark, isCompleted, onToggleCompleted }: TopicViewProps) {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs text-[#8B949E] bg-[#21262D] px-2 py-0.5 rounded">
              Part {topic.part}: {topic.partTitle}
            </span>
            <span className="text-xs text-[#484F58]">Topic {topic.id}</span>
          </div>
          <h2 className="text-2xl font-bold text-[#E6EDF3]">{topic.title}</h2>
          <p className="text-[#8B949E] mt-2 leading-relaxed">{topic.summary}</p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleCompleted}
          className={isCompleted ? 'text-[#3FB950]' : 'text-[#8B949E]'}
        >
          {isCompleted ? (
            <><CheckCircle2 className="w-4 h-4 mr-1" /> Completed</>
          ) : (
            <><Circle className="w-4 h-4 mr-1" /> Mark complete</>
          )}
        </Button>
      </div>

      <div className="border-t border-[#30363D] pt-4">
        <h3 className="text-sm font-semibold text-[#8B949E] uppercase tracking-wider mb-4">
          {topic.concepts.length} Concepts
        </h3>
        <div className="space-y-3">
          {topic.concepts.map(concept => (
            <ConceptCard
              key={concept.id}
              concept={concept}
              isBookmarked={bookmarks.includes(concept.id)}
              onToggleBookmark={onToggleBookmark}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
