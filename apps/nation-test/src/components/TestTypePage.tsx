import { useState, useCallback, useRef, useEffect } from 'react';
import { cn } from '@arabtools/ui';
import { ArrowRight, X } from 'lucide-react';
import type {
  TestConfig,
  TestSession,
  TestResults,
  TestResponse,
  TestType,
  YesNoItem,
  FrequencyLevel,
} from '../types';
import { calculateVocabularySize, calculateYesNoScore } from '../types';
import { generateTestItems } from '../data/testGenerator';
import { SubFilterPanel } from './test-config/SubFilterPanel';
import { ConfigSummary } from './test-config/ConfigSummary';
import { useTestConfig } from './test-config/useTestConfig';
import { testTypes } from './test-config/constants';
import { TestResultsComponent } from './TestResults';
import { TranslationQuestion } from './TranslationQuestion';
import { getQuestionComponent } from './question-registry';
import type { TranslationTestItem } from '../data/testGenerator';

type TestPhase = 'config' | 'loading' | 'testing' | 'results' | 'error';

const STORAGE_KEY = 'nation-test-session';

function getStoredSession(): { session: TestSession; questionStartTime: number } | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;
    const parsed = JSON.parse(stored);
    if (parsed?.session?.id && parsed?.session?.items?.length > 0) {
      return parsed;
    }
    return null;
  } catch {
    return null;
  }
}

function saveSession(session: TestSession, questionStartTime: number): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ session, questionStartTime }));
  } catch {
    // Storage full or unavailable
  }
}

function clearStoredSession(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Silently fail
  }
}

interface TestTypePageProps {
  testType: TestType;
  onGoHome: () => void;
}

export function TestTypePage({ testType, onGoHome }: TestTypePageProps) {
  const [phase, setPhase] = useState<TestPhase>('config');
  const [session, setSession] = useState<TestSession | null>(null);
  const [results, setResults] = useState<TestResults | null>(null);
  const [lastConfig, setLastConfig] = useState<TestConfig | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showResumePrompt, setShowResumePrompt] = useState(false);
  const [storedSessionData, setStoredSessionData] = useState<{ session: TestSession; questionStartTime: number } | null>(null);

  const [configState, configActions] = useTestConfig(testType);
  const typeInfo = testTypes.find(t => t.type === testType);
  const questionStartTime = useRef<number>(0);

  // On mount, check for saved session matching this test type
  useEffect(() => {
    const stored = getStoredSession();
    if (stored && stored.session.config.type === testType) {
      setStoredSessionData(stored);
      setShowResumePrompt(true);
    }
  }, [testType]);

  // Save session to localStorage during testing
  useEffect(() => {
    if (phase === 'testing' && session) {
      saveSession(session, questionStartTime.current);
    }
  }, [phase, session]);

  const handleResumeSession = useCallback(() => {
    if (storedSessionData) {
      setSession(storedSessionData.session);
      setLastConfig(storedSessionData.session.config);
      questionStartTime.current = storedSessionData.questionStartTime;
      setPhase('testing');
      setShowResumePrompt(false);
      setStoredSessionData(null);
    }
  }, [storedSessionData]);

  const handleDiscardSession = useCallback(() => {
    clearStoredSession();
    setShowResumePrompt(false);
    setStoredSessionData(null);
  }, []);

  const startTest = useCallback(async (config: TestConfig) => {
    setLastConfig(config);
    setErrorMessage(null);
    setPhase('loading');

    try {
      const items = await generateTestItems(config);

      if (items.length === 0) {
        setErrorMessage('No test items could be generated. The data may still be loading or no items match your selected filters.');
        setPhase('error');
        return;
      }

      const newSession: TestSession = {
        id: `session-${Date.now()}`,
        config,
        startTime: Date.now(),
        currentItemIndex: 0,
        responses: [],
        items,
      };

      setSession(newSession);
      setPhase('testing');
      questionStartTime.current = Date.now();
    } catch (err) {
      console.error('[nation-test] Failed to generate test items:', err);
      setErrorMessage('Failed to load test data. Please check your connection and try again.');
      setPhase('error');
    }
  }, []);

  const calculateAndShowResults = useCallback(
    (currentSession: TestSession, responses: TestResponse[]) => {
      const endTime = Date.now();
      const duration = (endTime - currentSession.startTime) / 1000;

      const levelScores: Record<
        FrequencyLevel,
        { correct: number; total: number; percentage: number }
      > = {} as Record<FrequencyLevel, { correct: number; total: number; percentage: number }>;

      for (const item of currentSession.items) {
        let level: FrequencyLevel | undefined;
        if ('level' in item) {
          level = item.level;
        }
        if (!level) continue;

        if (!levelScores[level]) {
          levelScores[level] = { correct: 0, total: 0, percentage: 0 };
        }
        levelScores[level].total++;

        const response = responses.find((r) => r.itemId === item.id);
        if (response?.isCorrect) {
          levelScores[level].correct++;
        }
      }

      for (const level of Object.keys(levelScores) as FrequencyLevel[]) {
        levelScores[level].percentage =
          levelScores[level].total > 0
            ? (levelScores[level].correct / levelScores[level].total) * 100
            : 0;
      }

      const correct = responses.filter((r) => r.isCorrect).length;
      const total = responses.length;

      let estimatedVocabularySize: number | undefined;
      if (currentSession.config.type === 'vst') {
        estimatedVocabularySize = calculateVocabularySize(
          levelScores,
          currentSession.config.itemsPerLevel
        );
      }

      let correctedScore: { rawPercentage: number; correctedPercentage: number } | undefined;
      if (currentSession.config.type === 'yesno') {
        const realItems = currentSession.items.filter(
          (item) => 'isReal' in item && item.isReal
        ) as YesNoItem[];
        const pseudoItems = currentSession.items.filter(
          (item) => 'isReal' in item && !item.isReal
        ) as YesNoItem[];

        const realHits = realItems.filter((item) => {
          const response = responses.find((r) => r.itemId === item.id);
          return response?.answer === true;
        }).length;

        const falseAlarms = pseudoItems.filter((item) => {
          const response = responses.find((r) => r.itemId === item.id);
          return response?.answer === true;
        }).length;

        correctedScore = calculateYesNoScore(
          realHits,
          realItems.length,
          falseAlarms,
          pseudoItems.length
        );
      }

      const incorrectItems = responses
        .filter((r) => !r.isCorrect)
        .map((r) => r.itemId);

      const avgResponseTime =
        responses.length > 0
          ? responses.reduce((sum, r) => sum + r.responseTime, 0) / responses.length
          : 0;

      const testResults: TestResults = {
        sessionId: currentSession.id,
        testType: currentSession.config.type,
        rawScore: {
          correct,
          total,
          percentage: total > 0 ? (correct / total) * 100 : 0,
        },
        levelScores,
        estimatedVocabularySize,
        correctedScore,
        averageResponseTime: avgResponseTime,
        duration,
        incorrectItems,
        completedAt: endTime,
      };

      clearStoredSession();
      setResults(testResults);
      setPhase('results');
    },
    []
  );

  const handleAnswer = useCallback(
    (answer: string | boolean, isCorrect: boolean) => {
      if (!session) return;

      const responseTime = Date.now() - questionStartTime.current;
      const currentItem = session.items[session.currentItemIndex];
      if (!currentItem) return;

      const response: TestResponse = {
        itemId: currentItem.id,
        answer,
        isCorrect,
        responseTime,
      };

      const updatedResponses = [...session.responses, response];
      const nextIndex = session.currentItemIndex + 1;
      const isLastQuestion = nextIndex >= session.items.length;

      if (session.config.showImmediateFeedback) {
        setSession({
          ...session,
          responses: updatedResponses,
        });
        return;
      }

      if (isLastQuestion) {
        calculateAndShowResults(session, updatedResponses);
      } else {
        setSession({
          ...session,
          currentItemIndex: nextIndex,
          responses: updatedResponses,
        });
        questionStartTime.current = Date.now();
      }
    },
    [session, calculateAndShowResults]
  );

  const handleNextQuestion = useCallback(() => {
    if (!session) return;

    const nextIndex = session.currentItemIndex + 1;

    if (nextIndex >= session.items.length) {
      calculateAndShowResults(session, session.responses);
      return;
    }

    setSession({
      ...session,
      currentItemIndex: nextIndex,
    });
    questionStartTime.current = Date.now();
  }, [session, calculateAndShowResults]);

  const handleRetake = useCallback(() => {
    if (lastConfig) {
      startTest(lastConfig);
    }
  }, [lastConfig, startTest]);

  const handleNewTest = useCallback(() => {
    clearStoredSession();
    onGoHome();
  }, [onGoHome]);

  const handleQuit = useCallback(() => {
    if (
      window.confirm(
        'Are you sure you want to quit? Your progress will be saved and can be resumed later.'
      )
    ) {
      setSession(null);
      setResults(null);
      setPhase('config');
    }
  }, []);

  // Resume prompt
  if (showResumePrompt && storedSessionData) {
    const savedProgress = Math.round(
      ((storedSessionData.session.currentItemIndex + 1) / storedSessionData.session.items.length) * 100
    );
    return (
      <div className="test-type-page">
        <div className="max-w-md mx-auto mt-20">
          <div className="glass-card p-6 sm:p-8 text-center space-y-6 animate-fade-in-up">
            <h2 className="text-2xl font-serif text-primary">Resume Test?</h2>
            <p className="text-muted-foreground">
              You have an unfinished test in progress.
            </p>
            <div className="p-4 bg-muted/50 rounded-xl">
              <p className="text-sm text-muted-foreground mb-2">
                {storedSessionData.session.config.type.toUpperCase()} Test
              </p>
              <p className="text-lg font-semibold">
                {savedProgress}% complete
              </p>
              <p className="text-sm text-muted-foreground">
                Question {storedSessionData.session.currentItemIndex + 1} of {storedSessionData.session.items.length}
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <button
                onClick={handleResumeSession}
                className={cn(
                  'w-full px-6 py-3 rounded-xl',
                  'bg-primary text-white font-semibold',
                  'hover:bg-primary/90 transition-colors'
                )}
              >
                Resume Test
              </button>
              <button
                onClick={handleDiscardSession}
                className={cn(
                  'w-full px-6 py-3 rounded-xl',
                  'border-2 border-muted text-muted-foreground font-semibold',
                  'hover:bg-muted/50 transition-colors'
                )}
              >
                Start Fresh
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Config phase
  if (phase === 'config') {
    return (
      <div className="test-type-page">
        <div className="max-w-3xl mx-auto space-y-8">
          {/* Test type header */}
          {typeInfo && (
            <div className="text-center">
              <div className="inline-flex items-center gap-2 text-primary mb-2">
                {typeInfo.icon}
                <h1 className="text-3xl font-serif text-primary">{typeInfo.name}</h1>
              </div>
              <p className="text-muted-foreground">{typeInfo.description}</p>
            </div>
          )}

          {/* Sub-filters, items per level, feedback */}
          <SubFilterPanel state={configState} actions={configActions} />

          {/* Summary + start */}
          <ConfigSummary state={configState} actions={configActions} onStartTest={startTest} />
        </div>
      </div>
    );
  }

  // Loading phase
  if (phase === 'loading') {
    return (
      <div className="test-type-page">
        <div className="max-w-md mx-auto mt-20">
          <div className="glass-card p-6 sm:p-8 text-center space-y-4 animate-fade-in-up">
            <div className="w-8 h-8 mx-auto border-3 border-primary border-t-transparent rounded-full animate-spin" />
            <p className="text-muted-foreground">Loading test data...</p>
          </div>
        </div>
      </div>
    );
  }

  // Error phase
  if (phase === 'error') {
    return (
      <div className="test-type-page">
        <div className="max-w-md mx-auto mt-20">
          <div className="glass-card p-6 sm:p-8 text-center space-y-4 animate-fade-in-up">
            <div className="w-12 h-12 mx-auto rounded-full bg-red-100 flex items-center justify-center">
              <X className="w-6 h-6 text-red-600" />
            </div>
            <h2 className="text-xl font-serif text-primary">Unable to Start Test</h2>
            <p className="text-muted-foreground text-sm">
              {errorMessage}
            </p>
            <button
              onClick={() => setPhase('config')}
              className={cn(
                'px-6 py-3 rounded-xl',
                'bg-primary text-white font-semibold',
                'hover:bg-primary/90 transition-colors'
              )}
            >
              Back to Configuration
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Results phase
  if (phase === 'results' && results) {
    return (
      <div className="test-type-page">
        <TestResultsComponent
          results={results}
          onRetake={handleRetake}
          onNewTest={handleNewTest}
        />
      </div>
    );
  }

  // Testing phase
  if (phase === 'testing' && session) {
    const currentItem = session.items[session.currentItemIndex];

    if (!currentItem) {
      // Safety guard: if currentItem is undefined, show results with what we have
      if (session.responses.length > 0) {
        calculateAndShowResults(session, session.responses);
      } else {
        setErrorMessage('No test items available.');
        setPhase('error');
      }
      return null;
    }

    const progress =
      ((session.currentItemIndex + 1) / session.items.length) * 100;

    const currentResponse = session.responses.find(
      (r) => r.itemId === currentItem.id
    );
    const hasAnswered = !!currentResponse;

    return (
      <div className="test-type-page">
        <div className="max-w-2xl mx-auto">
          {/* Header with progress */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex-1">
              <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                <span>
                  Question {session.currentItemIndex + 1} of{' '}
                  {session.items.length}
                </span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="progress-bar">
                <div
                  className="progress-bar-fill"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
            <button
              onClick={handleQuit}
              className="ml-4 p-2 rounded-lg hover:bg-muted transition-colors"
              aria-label="Quit test"
            >
              <X className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>

          {/* Question Card */}
          <div key={currentItem.id} className="glass-card p-5 sm:p-8 animate-fade-in-up">
            {session.config.type === 'translation' ? (
              <TranslationQuestion
                item={currentItem as TranslationTestItem}
                direction={(currentItem as TranslationTestItem).direction}
                distractors={(currentItem as TranslationTestItem).englishDistractors}
                onAnswer={handleAnswer}
                showFeedback={session.config.showImmediateFeedback}
              />
            ) : (() => {
              const QuestionComponent = getQuestionComponent(session.config.type);
              return QuestionComponent ? (
                <QuestionComponent
                  item={currentItem}
                  onAnswer={handleAnswer}
                  showFeedback={session.config.showImmediateFeedback}
                />
              ) : null;
            })()}

            {/* Next button (shown after answering with feedback) */}
            {session.config.showImmediateFeedback && hasAnswered && (
              <div className="flex justify-center mt-6">
                <button
                  onClick={handleNextQuestion}
                  className={cn(
                    'flex items-center gap-2 px-6 py-3 rounded-2xl shadow-lg',
                    'bg-primary text-white font-semibold',
                    'hover:bg-primary/90 hover:shadow-xl transition-all hover:-translate-y-0.5'
                  )}
                >
                  {session.currentItemIndex < session.items.length - 1 ? (
                    <>
                      Next Question
                      <ArrowRight className="w-5 h-5" />
                    </>
                  ) : (
                    'View Results'
                  )}
                </button>
              </div>
            )}
          </div>

          {/* Level indicator */}
          {'level' in currentItem && currentItem.level && (
            <div className="text-center mt-4">
              <span className="text-xs text-muted-foreground bg-muted px-3 py-1 rounded-full">
                {currentItem.level.toUpperCase()} Level
              </span>
            </div>
          )}
        </div>
      </div>
    );
  }

  return null;
}
