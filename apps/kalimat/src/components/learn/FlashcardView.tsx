import { useState, useEffect } from 'react';
import type { Lemma } from '@/data/lemmas';
import type { MorphemeData } from '@/types';
import { MorphemeBar } from '@/components/shared/MorphemeBar';

interface FlashcardViewProps {
  lemma: Lemma;
  root: string | undefined;
  morpheme?: MorphemeData | null;
  onGrade: (grade: 'again' | 'hard' | 'good' | 'easy') => void;
}

const GRADE_KEYS: Record<string, 'again' | 'hard' | 'good' | 'easy'> = {
  '1': 'again', '2': 'hard', '3': 'good', '4': 'easy',
};

export function FlashcardView({ lemma, root, morpheme, onGrade }: FlashcardViewProps) {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!revealed && (e.key === ' ' || e.key === 'Enter')) {
        e.preventDefault();
        setRevealed(true);
      } else if (revealed && GRADE_KEYS[e.key]) {
        onGrade(GRADE_KEYS[e.key]);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [revealed, onGrade]);

  return (
    <div className="study-card">
      <div className="study-card-content">
        <div
          className="study-card-arabic font-arabic"
          dir="rtl"
          onClick={() => setRevealed(true)}
        >
          {lemma.lemma}
        </div>

        {!revealed ? (
          <div className="study-hint">Tap the word to reveal its meaning</div>
        ) : (
          <div className="study-card-reveal">
            <div className="study-card-meaning">{lemma.meaning}</div>
            <div className="study-card-translit">{lemma.transliteration}</div>
            {root && (
              <div className="study-card-root">
                Root: <span className="font-arabic" dir="rtl">{root}</span>
              </div>
            )}
            {morpheme && Object.keys(morpheme.p).length > 0 && (
              <div style={{ marginTop: '0.75rem' }}>
                <MorphemeBar pieces={morpheme.p} />
              </div>
            )}

            <div className="grade-buttons">
              <button className="grade-btn again" onClick={() => onGrade('again')}>Again</button>
              <button className="grade-btn hard" onClick={() => onGrade('hard')}>Hard</button>
              <button className="grade-btn good" onClick={() => onGrade('good')}>Good</button>
              <button className="grade-btn easy" onClick={() => onGrade('easy')}>Easy</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
