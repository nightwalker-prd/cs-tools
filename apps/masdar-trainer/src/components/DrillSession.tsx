import { useState, useEffect, useCallback, useRef } from 'react';
import { X, Volume2, Check } from 'lucide-react';
import { useSpeechSynthesis } from '@arabtools/core';
import type { DrillQuestion, DrillAnswer, DerivativeType } from '../types';
import { checkAnswer, needsStrictComparison } from '../utils/validation';
import { getCorrectAnswer, getAnswerPattern } from '../utils/drillGenerator';
import { getRuleForForm } from '../data';
import { FormBadge } from './FormBadge';
import { DerivativeTypeBadge } from './DerivativeTypeBadge';

const DERIVATIVE_PROMPT: Record<DerivativeType, { ar: string; en: string }> = {
  masdar: { ar: 'المَصْدَر', en: 'masdar (verbal noun)' },
  'ism-fail': { ar: 'اسم الفَاعِل', en: 'active participle' },
  'ism-maful': { ar: 'اسم المَفْعُول', en: 'passive participle' },
};

interface DrillSessionProps {
  questions: DrillQuestion[];
  onComplete: (answers: DrillAnswer[], elapsedTime: number) => void;
  onQuit: () => void;
  showDiacritics: boolean;
}

export function DrillSession({ questions, onComplete, onQuit, showDiacritics }: DrillSessionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<DrillAnswer[]>([]);
  const [userInput, setUserInput] = useState('');
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [questionStartTime, setQuestionStartTime] = useState(Date.now());
  const inputRef = useRef<HTMLInputElement>(null);

  const { speak, isSupported } = useSpeechSynthesis({ lang: 'ar-SA', rate: 0.8 });

  const currentQuestion = questions[currentIndex];
  const total = questions.length;
  const correctCount = answers.filter(a => a.isCorrect).length;

  // Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedTime(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Auto-focus input on new question
  useEffect(() => {
    if (feedback === null) {
      inputRef.current?.focus();
    }
  }, [currentIndex, feedback]);

  const advanceToNext = useCallback(() => {
    if (currentIndex + 1 >= total) {
      onComplete(answers, elapsedTime);
    } else {
      setCurrentIndex(prev => prev + 1);
      setUserInput('');
      setFeedback(null);
      setQuestionStartTime(Date.now());
    }
  }, [currentIndex, total, answers, elapsedTime, onComplete]);

  const handleSubmit = () => {
    if (!userInput.trim() || feedback !== null) return;

    const correctAnswer = getCorrectAnswer(currentQuestion.verb, currentQuestion.questionType);
    const strict = needsStrictComparison(currentQuestion.questionType, currentQuestion.verb.verbForm);
    const isCorrect = checkAnswer(userInput, correctAnswer, strict);
    const timeSpent = Math.round((Date.now() - questionStartTime) / 1000);

    const answer: DrillAnswer = {
      questionId: currentQuestion.verb.id + '-' + currentQuestion.questionType,
      userInput: userInput.trim(),
      isCorrect,
      correctAnswer,
      timeSpent,
    };

    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);
    setFeedback(isCorrect ? 'correct' : 'incorrect');

    // Auto-advance on correct after 1.5s
    if (isCorrect) {
      setTimeout(() => {
        if (currentIndex + 1 >= total) {
          onComplete(newAnswers, elapsedTime);
        } else {
          setCurrentIndex(prev => prev + 1);
          setUserInput('');
          setFeedback(null);
          setQuestionStartTime(Date.now());
        }
      }, 1500);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (feedback === 'incorrect') {
        advanceToNext();
      } else {
        handleSubmit();
      }
    }
  };

  const formatTime = (seconds: number): string => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const correctAnswer = getCorrectAnswer(currentQuestion.verb, currentQuestion.questionType);
  const answerPattern = getAnswerPattern(currentQuestion.verb, currentQuestion.questionType);
  const rule = getRuleForForm(currentQuestion.verb.verbForm);
  const prompt = DERIVATIVE_PROMPT[currentQuestion.questionType];

  return (
    <div className="animate-fade-in-up">
      {/* Progress Header */}
      <div className="backdrop-blur-md bg-white/80 border border-white/40 rounded-3xl p-4 shadow-lg mb-6">
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center justify-between text-xs text-muted-foreground mb-1.5">
              <span>Question {currentIndex + 1} of {total}</span>
              <span>{correctCount} correct</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-accent rounded-full transition-all duration-500"
                style={{ width: `${((currentIndex + 1) / total) * 100}%` }}
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm font-mono text-primary">{formatTime(elapsedTime)}</span>
            <button
              onClick={onQuit}
              className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Quit drill"
            >
              <X className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>
        </div>
      </div>

      {/* Question + Answer Grid */}
      <div key={currentQuestion.verb.id + currentQuestion.questionType} className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in-up">
        {/* Question Card */}
        <div className="backdrop-blur-md bg-white/80 border border-white/40 rounded-3xl p-6 shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <FormBadge form={currentQuestion.verb.verbForm} />
              <DerivativeTypeBadge type={currentQuestion.questionType} />
            </div>
            <span className="text-xs text-muted-foreground">Q{currentIndex + 1} / {total}</span>
          </div>

          {/* Verb display */}
          <div className="text-center mb-6" dir="rtl">
            <div className="text-4xl font-arabic text-primary mb-2 leading-relaxed">
              {showDiacritics ? currentQuestion.verb.pastTense : currentQuestion.verb.pastTense} {' \u2013 '} {showDiacritics ? currentQuestion.verb.presentTense : currentQuestion.verb.presentTense}
            </div>
          </div>

          {/* Root and meaning */}
          <div className="text-center space-y-1">
            <p className="text-sm text-muted-foreground">
              Root: <span className="font-arabic" dir="rtl">{currentQuestion.verb.root}</span>
            </p>
            <p className="text-sm text-muted-foreground">{currentQuestion.verb.meaning}</p>
          </div>

          {/* Prompt */}
          <div className="mt-6 text-center">
            <p className="text-sm text-primary">
              What is the <span className="font-arabic font-bold" dir="rtl">{prompt.ar}</span> ({prompt.en}) of this verb?
            </p>
          </div>
        </div>

        {/* Answer Card */}
        <div className="backdrop-blur-md bg-white/80 border border-white/40 rounded-3xl p-6 shadow-xl">
          <label className="block text-sm text-primary mb-3">
            <span className="font-arabic" dir="rtl">اكتب {prompt.ar}</span>
            <span className="opacity-70 ml-2">(Type the {prompt.en})</span>
          </label>
          <div className="flex gap-2">
            <input
              ref={inputRef}
              type="text"
              dir="rtl"
              lang="ar"
              value={userInput}
              onChange={e => setUserInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={feedback !== null}
              autoComplete="off"
              autoCorrect="off"
              spellCheck={false}
              className="flex-1 px-4 py-3 rounded-xl border border-gray-300 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all text-2xl font-arabic disabled:opacity-50"
              placeholder="..."
            />
            <button
              onClick={handleSubmit}
              disabled={!userInput.trim() || feedback !== null}
              className="px-6 py-3 bg-accent text-white rounded-xl hover:bg-accent/90 disabled:opacity-50 transition-all font-medium"
            >
              Check
            </button>
          </div>

          <p className="text-xs text-muted-foreground mt-2">
            {needsStrictComparison(currentQuestion.questionType, currentQuestion.verb.verbForm)
              ? 'Diacritics matter here -- kasra vs fatha distinguishes the derivative type'
              : 'Diacritics optional -- answers accepted with or without tashkeel'}
          </p>

          {/* Feedback */}
          {feedback === 'correct' && (
            <div className="animate-fade-in-up mt-4 p-4 rounded-xl bg-green-100 border border-green-200">
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center">
                  <Check className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-semibold text-green-800">Correct!</p>
                  <p className="text-2xl font-arabic text-green-900 mt-1" dir="rtl">{correctAnswer}</p>
                  <p className="text-xs text-green-700 mt-1">
                    Pattern: <span className="font-arabic" dir="rtl">{answerPattern}</span>
                  </p>
                </div>
                {isSupported && (
                  <button
                    onClick={() => speak(correctAnswer)}
                    className="ml-auto p-2 rounded-full hover:bg-green-200 transition-colors"
                  >
                    <Volume2 className="w-5 h-5 text-green-700" />
                  </button>
                )}
              </div>
            </div>
          )}

          {feedback === 'incorrect' && (
            <div className="animate-fade-in-up mt-4 p-5 rounded-xl bg-red-50 border border-red-200">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center mt-0.5">
                  <X className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-red-800">Incorrect</p>
                  <div className="mt-2 flex items-center gap-3">
                    <span className="text-lg font-arabic text-red-600 line-through" dir="rtl">{userInput}</span>
                    <span className="text-muted-foreground">-&gt;</span>
                    <span className="text-2xl font-arabic text-green-700" dir="rtl">{correctAnswer}</span>
                  </div>
                  {rule && (
                    <div className="mt-3 p-3 rounded-lg bg-white/60 border border-red-100">
                      <p className="text-xs text-muted-foreground mb-1">Pattern Rule:</p>
                      <p className="text-sm">
                        Form {currentQuestion.verb.verbForm}{' '}
                        {currentQuestion.questionType === 'masdar' ? 'masdar' : currentQuestion.questionType === 'ism-fail' ? "ism fa'il" : "ism maf'ul"}{' '}
                        follows the pattern{' '}
                        <span className="font-arabic text-primary" dir="rtl">{answerPattern}</span>
                      </p>
                    </div>
                  )}
                </div>
                {isSupported && (
                  <button
                    onClick={() => speak(correctAnswer)}
                    className="flex-shrink-0 p-2 rounded-full hover:bg-red-100 transition-colors"
                  >
                    <Volume2 className="w-5 h-5 text-red-700" />
                  </button>
                )}
              </div>
              <button
                onClick={advanceToNext}
                className="mt-4 w-full px-4 py-2.5 bg-primary text-white rounded-xl font-medium hover:bg-primary/90 transition-all"
              >
                {currentIndex + 1 >= total ? 'View Results' : 'Next Question'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
