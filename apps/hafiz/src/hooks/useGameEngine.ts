import { useState, useCallback, useRef, useEffect } from 'react';
import type { GameState } from '../types';

interface GameEngine {
  gameState: GameState;
  score: number;
  totalQuestions: number;
  currentQuestion: number;
  timeElapsed: number;
  startGame: (totalQ: number) => void;
  submitAnswer: (correct: boolean) => void;
  nextQuestion: () => void;
  resetGame: () => void;
}

export function useGameEngine(): GameEngine {
  const [gameState, setGameState] = useState<GameState>('idle');
  const [score, setScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Timer: runs while state is 'playing'
  useEffect(() => {
    if (gameState === 'playing') {
      timerRef.current = setInterval(() => {
        setTimeElapsed((prev) => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [gameState]);

  const startGame = useCallback((totalQ: number) => {
    setScore(0);
    setTotalQuestions(totalQ);
    setCurrentQuestion(0);
    setTimeElapsed(0);
    setGameState('playing');
  }, []);

  const submitAnswer = useCallback((correct: boolean) => {
    if (correct) {
      setScore((prev) => prev + 1);
    }
    setGameState('feedback');
  }, []);

  const nextQuestion = useCallback(() => {
    setCurrentQuestion((prev) => {
      const next = prev + 1;
      if (next >= totalQuestions) {
        setGameState('complete');
        return prev;
      }
      setGameState('playing');
      return next;
    });
  }, [totalQuestions]);

  const resetGame = useCallback(() => {
    setGameState('idle');
    setScore(0);
    setTotalQuestions(0);
    setCurrentQuestion(0);
    setTimeElapsed(0);
  }, []);

  return {
    gameState,
    score,
    totalQuestions,
    currentQuestion,
    timeElapsed,
    startGame,
    submitAnswer,
    nextQuestion,
    resetGame,
  };
}
