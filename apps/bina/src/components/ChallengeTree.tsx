import { useState } from 'react';
import { ChevronRight, CheckCircle2, Circle } from 'lucide-react';
import { categories } from '../data/categories';
import { getChallengesByCategory } from '../data/challenges';
import { DifficultyBadge } from './DifficultyBadge';
import type { BinaProgress } from '../types';

interface ChallengeTreeProps {
  activeChallengeId: string | null;
  progress: BinaProgress;
  onNavigate: (id: string) => void;
}

export function ChallengeTree({ activeChallengeId, progress, onNavigate }: ChallengeTreeProps) {
  const [expanded, setExpanded] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    for (const cat of categories) {
      const challenges = getChallengesByCategory(cat.id);
      if (challenges.some(c => c.id === activeChallengeId)) {
        initial[cat.id] = true;
      }
    }
    if (Object.keys(initial).length === 0 && categories.length > 0) {
      initial[categories[0].id] = true;
    }
    return initial;
  });

  const toggle = (catId: string) => {
    setExpanded(prev => ({ ...prev, [catId]: !prev[catId] }));
  };

  return (
    <nav className="sidebar-nav">
      {categories.map(cat => {
        const challenges = getChallengesByCategory(cat.id);
        const isExpanded = expanded[cat.id] || false;
        const completedCount = challenges.filter(c => progress.challenges[c.id]?.completed).length;
        const hasActive = challenges.some(c => c.id === activeChallengeId);

        return (
          <div key={cat.id} className="folder-group">
            <button
              className={`folder-header ${hasActive ? 'active' : ''}`}
              onClick={() => toggle(cat.id)}
            >
              <ChevronRight
                size={14}
                className={`chevron-icon ${isExpanded ? 'expanded' : ''}`}
              />
              <span className="folder-name">{cat.name}</span>
              <span className="folder-count">
                {completedCount}/{challenges.length}
              </span>
            </button>

            {isExpanded && (
              <div className="folder-children">
                {challenges.map(challenge => {
                  const isActive = challenge.id === activeChallengeId;
                  const isCompleted = progress.challenges[challenge.id]?.completed;

                  return (
                    <button
                      key={challenge.id}
                      className={`nav-item ${isActive ? 'active' : ''}`}
                      onClick={() => onNavigate(challenge.id)}
                    >
                      <span className="nav-icon">
                        {isCompleted ? (
                          <CheckCircle2 size={14} className="nav-check" style={{ color: 'var(--color-success)' }} />
                        ) : (
                          <Circle size={14} />
                        )}
                      </span>
                      <span className="nav-title">{challenge.title}</span>
                      <DifficultyBadge difficulty={challenge.difficulty} />
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
}
