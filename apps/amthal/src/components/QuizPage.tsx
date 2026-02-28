import { Scissors, Languages, PenLine } from 'lucide-react';
import type { QuizMode } from '../types';

interface QuizPageProps {
  navigate: (hash: string) => void;
  getBestScore: (mode: QuizMode) => number;
}

const quizModes: { mode: QuizMode; name: string; desc: string; icon: React.ComponentType<{ size?: number }> }[] = [
  {
    mode: 'match-halves',
    name: 'Match the Halves',
    desc: 'See the first half of a proverb and pick the correct second half.',
    icon: Scissors,
  },
  {
    mode: 'guess-meaning',
    name: 'Guess the Meaning',
    desc: 'Read an Arabic proverb and choose the correct English translation.',
    icon: Languages,
  },
  {
    mode: 'fill-blank',
    name: 'Fill the Blank',
    desc: 'A key word is missing — pick the right word to complete the proverb.',
    icon: PenLine,
  },
];

export function QuizPage({ navigate, getBestScore }: QuizPageProps) {
  return (
    <div className="animate-fade-in-up">
      <div className="quiz-hub-header">
        <h2 className="quiz-hub-title">Test Your Knowledge</h2>
        <p className="quiz-hub-subtitle">
          Choose a quiz mode to challenge yourself
        </p>
      </div>

      <div className="quiz-mode-grid">
        {quizModes.map(({ mode, name, desc, icon: Icon }) => {
          const best = getBestScore(mode);
          return (
            <button
              key={mode}
              className="quiz-mode-card"
              onClick={() => navigate(`quiz/${mode}`)}
            >
              <div className="quiz-mode-icon">
                <Icon size={24} />
              </div>
              <div className="quiz-mode-name">{name}</div>
              <div className="quiz-mode-desc">{desc}</div>
              {best > 0 && (
                <div className="quiz-mode-best">Best: {best}%</div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
