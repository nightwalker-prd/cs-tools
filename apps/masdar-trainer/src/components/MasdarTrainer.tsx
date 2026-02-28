import { useState, useCallback } from 'react';
import type { DrillConfig, DrillPhase, DrillQuestion, DrillAnswer } from '../types';
import { generateDrill } from '../utils/drillGenerator';
import { ConfigPanel } from './ConfigPanel';
import { DrillSession } from './DrillSession';
import { ResultsSummary } from './ResultsSummary';

const DEFAULT_CONFIG: DrillConfig = {
  derivativeTypes: ['masdar', 'ism-fail', 'ism-maful'],
  exerciseMode: 'produce',
  selectedForms: ['II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'],
  selectedRootTypes: ['Regular'],
  difficulty: 'beginner',
  drillSize: 10,
  showDiacritics: true,
};

export function MasdarTrainer() {
  const [phase, setPhase] = useState<DrillPhase>('config');
  const [config, setConfig] = useState<DrillConfig>(DEFAULT_CONFIG);
  const [questions, setQuestions] = useState<DrillQuestion[]>([]);
  const [answers, setAnswers] = useState<DrillAnswer[]>([]);
  const [elapsedTime, setElapsedTime] = useState(0);

  const handleStartDrill = useCallback(() => {
    const generated = generateDrill(config);
    if (generated.length === 0) return;
    setQuestions(generated);
    setAnswers([]);
    setElapsedTime(0);
    setPhase('drilling');
  }, [config]);

  const handleDrillComplete = useCallback((drillAnswers: DrillAnswer[], time: number) => {
    setAnswers(drillAnswers);
    setElapsedTime(time);
    setPhase('results');
  }, []);

  const handleQuit = useCallback(() => {
    setPhase('config');
  }, []);

  const handlePracticeAgain = useCallback(() => {
    handleStartDrill();
  }, [handleStartDrill]);

  const handleNewConfig = useCallback(() => {
    setPhase('config');
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8f6f3] via-white to-[#faf8f5] p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="backdrop-blur-md bg-white/80 border border-white/40 rounded-3xl p-8 shadow-xl">
            <h1 className="text-primary text-3xl mb-2">Masdar & Derivatives Trainer</h1>
            <p className="text-xl mb-4 font-arabic" dir="rtl">
              تدريب المصدر والمشتقات
            </p>
            <p className="text-muted-foreground max-w-3xl">
              Practice deriving verbal nouns (masdar), active participles (ism fa'il),
              and passive participles (ism maf'ul) from Arabic verb forms I-X.
            </p>
          </div>
        </div>

        {/* Phase-based content */}
        {phase === 'config' && (
          <ConfigPanel
            config={config}
            onConfigChange={setConfig}
            onStartDrill={handleStartDrill}
          />
        )}

        {phase === 'drilling' && (
          <DrillSession
            questions={questions}
            onComplete={handleDrillComplete}
            onQuit={handleQuit}
            showDiacritics={config.showDiacritics}
          />
        )}

        {phase === 'results' && (
          <ResultsSummary
            questions={questions}
            answers={answers}
            elapsedTime={elapsedTime}
            onPracticeAgain={handlePracticeAgain}
            onNewConfig={handleNewConfig}
          />
        )}
      </div>
    </div>
  );
}
