import { useState, useCallback } from 'react';
import type { ComposeActivity, ComposeDraft } from '../../data/types';
import { ComposePromptView } from './ComposePromptView';
import { WritingEditor } from './WritingEditor';
import { GrammarChecklist } from './GrammarChecklist';
import { SelfAssessmentRubric } from './SelfAssessmentRubric';

type Step = 'prompt' | 'write' | 'checklist' | 'assessment';
const STEPS: Step[] = ['prompt', 'write', 'checklist', 'assessment'];

interface ComposeContentProps {
  compose: ComposeActivity;
  lessonId: string;
  draft: ComposeDraft | null;
  isCompleted: boolean;
  onSaveDraft: (composeId: string, draft: ComposeDraft) => void;
  onComplete: (composeId: string) => void;
}

export function ComposeContent({ compose, draft, isCompleted, onSaveDraft, onComplete }: ComposeContentProps) {
  const [step, setStep] = useState<Step>('prompt');
  const [text, setText] = useState(draft?.text ?? '');
  const [grammarChecked, setGrammarChecked] = useState<string[]>(draft?.grammarChecked ?? []);
  const [selfAssessment, setSelfAssessment] = useState<Record<string, number>>(draft?.selfAssessment ?? {});

  const saveDraft = useCallback((newText?: string, newChecked?: string[], newAssessment?: Record<string, number>) => {
    onSaveDraft(compose.id, {
      text: newText ?? text,
      grammarChecked: newChecked ?? grammarChecked,
      selfAssessment: newAssessment ?? selfAssessment,
      updatedAt: Date.now(),
    });
  }, [compose.id, text, grammarChecked, selfAssessment, onSaveDraft]);

  const handleStartFresh = () => {
    setText('');
    setGrammarChecked([]);
    setSelfAssessment({});
    setStep('write');
  };

  const handleResumeDraft = () => {
    setStep('write');
  };

  const handleTextChange = useCallback((newText: string) => {
    setText(newText);
    saveDraft(newText);
  }, [saveDraft]);

  const handleGrammarToggle = (id: string) => {
    const next = grammarChecked.includes(id)
      ? grammarChecked.filter(x => x !== id)
      : [...grammarChecked, id];
    setGrammarChecked(next);
    saveDraft(undefined, next);
  };

  const handleRate = (criterionId: string, score: number) => {
    const next = { ...selfAssessment, [criterionId]: score };
    setSelfAssessment(next);
    saveDraft(undefined, undefined, next);
  };

  const handleComplete = () => {
    saveDraft();
    onComplete(compose.id);
  };

  const stepIndex = STEPS.indexOf(step);

  return (
    <div className="compose-container">
      <div className="compose-header">
        <h3>{compose.titleEn}</h3>
        <span className="font-arabic">{compose.titleAr}</span>
        {isCompleted && <span className="tab-badge">Completed</span>}
      </div>

      <div className="compose-step-indicator">
        {STEPS.map((s, i) => (
          <div key={s} className={`step-dot ${i <= stepIndex ? 'active' : ''} ${i === stepIndex ? 'current' : ''}`} />
        ))}
      </div>

      {step === 'prompt' && (
        <ComposePromptView
          prompt={compose.prompt}
          hasDraft={!!draft && draft.text.length > 0}
          onStartFresh={handleStartFresh}
          onResumeDraft={handleResumeDraft}
        />
      )}

      {step === 'write' && (
        <WritingEditor
          initialText={text}
          wordBank={compose.wordBank}
          targetLength={compose.prompt.targetLength}
          onTextChange={handleTextChange}
          onNext={() => setStep('checklist')}
        />
      )}

      {step === 'checklist' && (
        <GrammarChecklist
          items={compose.grammarChecklist}
          checked={grammarChecked}
          onToggle={handleGrammarToggle}
          onNext={() => setStep('assessment')}
          onBack={() => setStep('write')}
        />
      )}

      {step === 'assessment' && (
        <SelfAssessmentRubric
          rubric={compose.rubric}
          scores={selfAssessment}
          onRate={handleRate}
          onComplete={handleComplete}
          onBackToEditor={() => setStep('write')}
        />
      )}
    </div>
  );
}
