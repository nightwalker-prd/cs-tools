import { useState, useCallback } from 'react';

export type Phase = 'dialogue' | 'questions' | 'recap';

export function useEpisodePlayer(totalLines: number) {
  const [phase, setPhase] = useState<Phase>('dialogue');
  const [currentLine, setCurrentLine] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});

  const advanceLine = useCallback(() => {
    if (currentLine < totalLines - 1) {
      setCurrentLine((prev) => prev + 1);
    }
  }, [currentLine, totalLines]);

  const goToLine = useCallback(
    (index: number) => {
      if (index >= 0 && index < totalLines) {
        setCurrentLine(index);
      }
    },
    [totalLines],
  );

  const goToQuestions = useCallback(() => {
    setPhase('questions');
  }, []);

  const goToRecap = useCallback(() => {
    setPhase('recap');
  }, []);

  const answerQuestion = useCallback(
    (questionIndex: number, choiceIndex: number) => {
      setAnswers((prev) => ({ ...prev, [questionIndex]: choiceIndex }));
    },
    [],
  );

  const reset = useCallback(() => {
    setPhase('dialogue');
    setCurrentLine(0);
    setAnswers({});
  }, []);

  return {
    phase,
    currentLine,
    answers,
    advanceLine,
    goToLine,
    goToQuestions,
    goToRecap,
    answerQuestion,
    reset,
  };
}
