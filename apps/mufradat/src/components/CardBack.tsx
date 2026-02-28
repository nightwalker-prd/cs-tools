import type { WordFamily } from '@arabtools/data';
import type { ResponseQuality } from '@arabtools/srs';
import { formatRoot } from '../utils/vocab-helpers';

interface CardBackProps {
  word: WordFamily;
  onGrade: (quality: ResponseQuality) => void;
  showGradeButtons: boolean;
}

export function CardBack({ word, onGrade, showGradeButtons }: CardBackProps) {
  return (
    <div className="animate-fade-in-up">
      {/* Arabic word */}
      <div className="study-card-arabic font-arabic" dir="rtl" style={{ fontSize: '2.5rem' }}>
        {word.headwordVocalized}
      </div>

      {/* Meanings */}
      <div className="study-card-meanings">
        {word.meanings.join('; ')}
      </div>
      <div style={{ textAlign: 'center', marginTop: '0.5rem' }}>
        <span className="word-pos-badge">{word.partOfSpeech}</span>
      </div>

      {/* Root */}
      <div className="study-card-root">
        <span className="study-card-root-label">Root: </span>
        <span className="font-arabic" dir="rtl">{formatRoot(word.root)}</span>
      </div>

      {/* Family Members */}
      {word.familyMembers && word.familyMembers.length > 0 && (
        <div className="study-card-family">
          <span className="study-card-family-label">Family:</span>
          <div className="family-chips">
            {word.familyMembers.map((member) => (
              <span key={member} className="related-topic-chip font-arabic" dir="rtl">
                {member}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Example */}
      {word.example && (
        <div className="example-block" style={{ marginTop: '1rem' }}>
          <div className="example-arabic font-arabic">{word.example.arabic}</div>
          <div className="example-translation">{word.example.translation}</div>
        </div>
      )}

      {/* Grade Buttons */}
      {showGradeButtons && (
        <div className="grade-buttons">
          <button className="grade-btn again" onClick={() => onGrade(0)}>Again</button>
          <button className="grade-btn hard" onClick={() => onGrade(1)}>Hard</button>
          <button className="grade-btn good" onClick={() => onGrade(2)}>Good</button>
          <button className="grade-btn easy" onClick={() => onGrade(3)}>Easy</button>
        </div>
      )}
    </div>
  );
}
