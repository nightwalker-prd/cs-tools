import type { GameType } from '../types';
import { SequenceMemory } from '../pages/SequenceMemory';
import { NumberMemory } from '../pages/NumberMemory';
import { ChimpMemory } from '../pages/ChimpMemory';
import { WorkingMemory } from '../pages/WorkingMemory';
import { OperationSpan } from '../pages/OperationSpan';
import { CorsiBlockTapping } from '../pages/CorsiBlockTapping';
import { DigitSpan } from '../pages/DigitSpan';
import { DualNBack } from '../pages/DualNBack';
import { FirstWordRecall } from '../pages/quran/FirstWordRecall';
import { CompleteTheAyah } from '../pages/quran/CompleteTheAyah';
import { WordOrder } from '../pages/quran/WordOrder';
import { ChainReaction } from '../pages/quran/ChainReaction';
import { SimilarAyahShowdown } from '../pages/quran/SimilarAyahShowdown';
import { AudioRecall } from '../pages/quran/AudioRecall';
import { BlindListen } from '../pages/quran/BlindListen';
import { ReverseLookup } from '../pages/quran/ReverseLookup';
import { LastWords } from '../pages/quran/LastWords';
import { SpeedRound } from '../pages/quran/SpeedRound';
import { AyahSprint } from '../pages/quran/AyahSprint';
import { MistakeMarathon } from '../pages/quran/MistakeMarathon';
import { QuranWordle } from '../pages/quran/QuranWordle';
import { QuranWordSearch } from '../pages/quran/QuranWordSearch';
import { FirstLetters } from '../pages/quran/FirstLetters';
import { SurahSleuth } from '../pages/quran/SurahSleuth';
import { BeforeAfter } from '../pages/quran/BeforeAfter';
import { ProgressiveBlanking } from '../pages/quran/ProgressiveBlanking';
import { MeaningLinks } from '../pages/quran/MeaningLinks';
import { PhraseChunks } from '../pages/quran/PhraseChunks';
import { MemoryPalace } from '../pages/quran/MemoryPalace';
import { StoryChain } from '../pages/quran/StoryChain';
import { AyahPegs } from '../pages/quran/AyahPegs';
import { ElaborativeRecall } from '../pages/quran/ElaborativeRecall';

interface GamePageProps {
  gameId: GameType;
  onBack: () => void;
}

export function GamePage({ gameId, onBack }: GamePageProps) {
  switch (gameId) {
    case 'sequence-memory':
      return <SequenceMemory onBack={onBack} />;
    case 'number-memory':
      return <NumberMemory onBack={onBack} />;
    case 'chimp-memory':
      return <ChimpMemory onBack={onBack} />;
    case 'working-memory':
      return <WorkingMemory onBack={onBack} />;
    case 'operation-span':
      return <OperationSpan onBack={onBack} />;
    case 'corsi-block-tapping':
      return <CorsiBlockTapping onBack={onBack} />;
    case 'digit-span-forward':
    case 'digit-span-backward':
      return <DigitSpan onBack={onBack} initialMode={gameId === 'digit-span-backward' ? 'backward' : 'forward'} />;
    case 'dual-n-back':
      return <DualNBack onBack={onBack} />;
    case 'first-word':
      return <FirstWordRecall onBack={onBack} />;
    case 'complete-ayah':
      return <CompleteTheAyah onBack={onBack} />;
    case 'word-order':
      return <WordOrder onBack={onBack} />;
    case 'chain-reaction':
      return <ChainReaction onBack={onBack} />;
    case 'similar-ayah':
      return <SimilarAyahShowdown onBack={onBack} />;
    case 'audio-recall':
      return <AudioRecall onBack={onBack} />;
    case 'blind-listen':
      return <BlindListen onBack={onBack} />;
    case 'reverse-lookup':
      return <ReverseLookup onBack={onBack} />;
    case 'last-words':
      return <LastWords onBack={onBack} />;
    case 'speed-round':
      return <SpeedRound onBack={onBack} />;
    case 'ayah-sprint':
      return <AyahSprint onBack={onBack} />;
    case 'mistake-marathon':
      return <MistakeMarathon onBack={onBack} />;
    case 'quran-wordle':
      return <QuranWordle onBack={onBack} />;
    case 'quran-word-search':
      return <QuranWordSearch onBack={onBack} />;
    case 'first-letters':
      return <FirstLetters onBack={onBack} />;
    case 'surah-sleuth':
      return <SurahSleuth onBack={onBack} />;
    case 'before-after':
      return <BeforeAfter onBack={onBack} />;
    case 'progressive-blanking':
      return <ProgressiveBlanking onBack={onBack} />;
    case 'meaning-links':
      return <MeaningLinks onBack={onBack} />;
    case 'phrase-chunks':
      return <PhraseChunks onBack={onBack} />;
    case 'memory-palace':
      return <MemoryPalace onBack={onBack} />;
    case 'story-chain':
      return <StoryChain onBack={onBack} />;
    case 'ayah-pegs':
      return <AyahPegs onBack={onBack} />;
    case 'elaborative-recall':
      return <ElaborativeRecall onBack={onBack} />;
    default:
      return <div className="glass-card p-6">Game not found</div>;
  }
}
