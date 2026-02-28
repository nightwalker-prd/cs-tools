import { useState, useEffect, useCallback } from 'react';
import { Loader2, Volume2 } from 'lucide-react';
import { shuffle, pickRandom } from '@arabtools/core';
import { expandRubToAyahs } from '@arabtools/data';
import type { HafizRub, SurahData } from '../../types';
import { useGameEngine } from '../../hooks/useGameEngine';
import { useQuranText } from '../../hooks/useQuranText';
import { useAudioPlayer } from '../../hooks/useAudioPlayer';
import { useAyahMastery } from '../../hooks/useAyahMastery';
import { GameShell } from './GameShell';

interface AudioRecallProps {
  rubs: HafizRub[];
  onBack: () => void;
}

interface Question {
  surah: number;
  ayah: number;
  correctText: string;
  choices: string[];
  correctIndex: number;
}

const TOTAL_QUESTIONS = 10;
const RECITER_ID = 'mishary';

export function AudioRecall({ rubs, onBack }: AudioRecallProps) {
  const engine = useGameEngine();
  const { loadSurah, loading: textLoading } = useQuranText();
  const audio = useAudioPlayer(RECITER_ID);
  const mastery = useAyahMastery();

  const [question, setQuestion] = useState<Question | null>(null);
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);
  const [surahCache, setSurahCache] = useState<Map<number, SurahData>>(new Map());
  const [dataReady, setDataReady] = useState(false);
  const [noData, setNoData] = useState(false);

  // Load surah data
  useEffect(() => {
    let cancelled = false;

    async function loadData() {
      const surahNums = new Set<number>();
      for (const rub of rubs) {
        const ayahs = expandRubToAyahs(rub.id);
        for (const a of ayahs) surahNums.add(a.surah);
      }

      const cache = new Map<number, SurahData>();
      for (const num of surahNums) {
        const data = await loadSurah(num);
        if (cancelled) return;
        if (data) cache.set(num, data);
      }

      if (cancelled) return;
      if (cache.size === 0) { setNoData(true); return; }
      setSurahCache(cache);
      setDataReady(true);
    }

    loadData();
    return () => { cancelled = true; };
  }, [rubs, loadSurah]);

  const generateQuestion = useCallback((): Question | null => {
    const ayahsWithText: Array<{ surah: number; ayah: number; text: string }> = [];
    for (const rub of rubs) {
      const rubAyahs = expandRubToAyahs(rub.id);
      for (const a of rubAyahs) {
        const surahData = surahCache.get(a.surah);
        if (surahData) {
          const ayahData = surahData.ayahs.find((x) => x.num === a.ayah);
          if (ayahData && ayahData.text.trim()) {
            ayahsWithText.push({ ...a, text: ayahData.text });
          }
        }
      }
    }

    if (ayahsWithText.length < 4) return null;

    const picked = pickRandom(ayahsWithText);
    if (!picked) return null;

    // Get 3 distractors
    const distractors: string[] = [];
    const used = new Set([picked.text]);

    for (const a of shuffle(ayahsWithText)) {
      if (!used.has(a.text) && distractors.length < 3) {
        distractors.push(a.text);
        used.add(a.text);
      }
    }

    if (distractors.length < 3) return null;

    const allChoices = [picked.text, ...distractors];
    const shuffled = shuffle(allChoices);
    const correctIndex = shuffled.indexOf(picked.text);

    return {
      surah: picked.surah,
      ayah: picked.ayah,
      correctText: picked.text,
      choices: shuffled,
      correctIndex,
    };
  }, [rubs, surahCache]);

  // Start game when data is ready
  useEffect(() => {
    if (dataReady && engine.gameState === 'idle') {
      const q = generateQuestion();
      if (q) {
        setQuestion(q);
        setSelectedChoice(null);
        engine.startGame(TOTAL_QUESTIONS);
        // Auto-play audio for first question
        audio.play(q.surah, q.ayah);
      } else {
        setNoData(true);
      }
    }
  }, [dataReady, engine.gameState, generateQuestion, engine, audio]);

  const handlePlayAudio = () => {
    if (question) {
      audio.play(question.surah, question.ayah);
    }
  };

  const handleChoiceSelect = (index: number) => {
    if (engine.gameState !== 'playing' || !question) return;

    setSelectedChoice(index);
    const correct = index === question.correctIndex;
    mastery.recordAttempt(question.surah, question.ayah, correct);
    engine.submitAnswer(correct);
  };

  const handleNext = () => {
    audio.stop();
    const q = generateQuestion();
    setQuestion(q);
    setSelectedChoice(null);
    engine.nextQuestion();

    // Auto-play audio for next question
    if (q) {
      setTimeout(() => audio.play(q.surah, q.ayah), 300);
    }
  };

  if (noData) {
    return (
      <div className="game-empty fade-in-up">
        <div className="game-empty-content">
          <h3>Quran text not available</h3>
          <p>Quran text data not yet loaded. Play audio games or load text first.</p>
          <button className="btn btn-primary" onClick={onBack}>Back to Games</button>
        </div>
      </div>
    );
  }

  if (textLoading || !dataReady) {
    return (
      <div className="game-loading fade-in-up">
        <Loader2 size={32} className="spin" />
        <p>Loading ayah text...</p>
      </div>
    );
  }

  return (
    <GameShell
      title="Audio Recall"
      score={engine.score}
      total={engine.totalQuestions}
      timeElapsed={engine.timeElapsed}
      gameState={engine.gameState}
      onBack={onBack}
    >
      {question && engine.gameState !== 'complete' && (
        <div className="audio-recall-game">
          <div className="audio-recall-player">
            <button
              className="btn btn-accent audio-play-btn"
              onClick={handlePlayAudio}
              disabled={audio.loading}
            >
              {audio.loading ? (
                <Loader2 size={20} className="spin" />
              ) : (
                <Volume2 size={20} />
              )}
              {audio.playing ? 'Playing...' : 'Play Ayah'}
            </button>
          </div>

          <p className="game-instruction">
            Listen to the audio and select the correct ayah text.
          </p>

          <div className="audio-recall-choices">
            {question.choices.map((choice, i) => {
              let choiceClass = 'audio-recall-choice';
              if (engine.gameState === 'feedback') {
                if (i === question.correctIndex) {
                  choiceClass += ' correct';
                } else if (i === selectedChoice && i !== question.correctIndex) {
                  choiceClass += ' incorrect';
                }
              } else if (i === selectedChoice) {
                choiceClass += ' selected';
              }

              return (
                <button
                  key={i}
                  className={choiceClass}
                  dir="rtl"
                  onClick={() => handleChoiceSelect(i)}
                  disabled={engine.gameState !== 'playing'}
                >
                  {choice}
                </button>
              );
            })}
          </div>

          {engine.gameState === 'feedback' && (
            <div className="game-actions">
              <button className="btn btn-primary" onClick={handleNext}>
                Next Question
              </button>
            </div>
          )}
        </div>
      )}
    </GameShell>
  );
}
