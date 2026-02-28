import type { RubricCriterion } from '../../data/types';

interface SelfAssessmentRubricProps {
  rubric: RubricCriterion[];
  scores: Record<string, number>;
  onRate: (criterionId: string, score: number) => void;
  onComplete: () => void;
  onBackToEditor: () => void;
}

export function SelfAssessmentRubric({ rubric, scores, onRate, onComplete, onBackToEditor }: SelfAssessmentRubricProps) {
  const allRated = rubric.every(c => scores[c.id] != null);
  const totalScore = Object.values(scores).reduce((sum, s) => sum + s, 0);
  const maxScore = rubric.length * 4;

  return (
    <div className="compose-rubric animate-fade-in">
      <p className="compose-rubric-instruction">
        Rate your own writing on each criterion.
      </p>

      <div className="rubric-criteria">
        {rubric.map(criterion => (
          <div key={criterion.id} className="rubric-criterion">
            <div className="rubric-criterion-header">
              <span>{criterion.nameEn}</span>
              <span className="font-arabic">{criterion.nameAr}</span>
            </div>
            <p className="rubric-criterion-desc">{criterion.description}</p>
            <div className="rubric-levels">
              {criterion.levels.map(level => (
                <label
                  key={level.score}
                  className={`rubric-level ${scores[criterion.id] === level.score ? 'selected' : ''}`}
                >
                  <input
                    type="radio"
                    name={criterion.id}
                    checked={scores[criterion.id] === level.score}
                    onChange={() => onRate(criterion.id, level.score)}
                  />
                  <span className="rubric-level-score">{level.score}</span>
                  <span className="rubric-level-label">{level.label}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="rubric-total">
        Score: <strong>{totalScore}/{maxScore}</strong>
      </div>

      <div className="compose-nav-actions">
        <button className="btn" onClick={onBackToEditor}>← Edit Draft</button>
        <button
          className="btn btn-success"
          disabled={!allRated}
          onClick={onComplete}
        >
          Save & Complete ✓
        </button>
      </div>
    </div>
  );
}
