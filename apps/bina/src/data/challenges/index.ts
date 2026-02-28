import type { Challenge, TopicCategory, Difficulty } from '../../types';
import { nominalSentenceChallenges } from './nominal-sentence';
import { idafaChallenges } from './idafa';
import { definitenessChallenges } from './definiteness';
import { verbAgreementChallenges } from './verb-agreement';
import { kanaInnaChallenges } from './kana-inna';
import { descriptivePhrasesChallenges } from './descriptive-phrases';
import { nestedSentencesChallenges } from './nested-sentences';
import { relativeClausesChallenges } from './relative-clauses';
import { conditionalsChallenges } from './conditionals';
import { demonstrativesChallenges } from './demonstratives';
import { passiveVoiceChallenges } from './passive-voice';
import { verbNegationChallenges } from './verb-negation';
import { halTamyizChallenges } from './hal-tamyiz';
import { prepositionsChallenges } from './prepositions';
import { moreParticlesChallenges } from './more-particles';
import { vocativeChallenges } from './vocative';
import { coordinationChallenges } from './coordination';
import { exceptionChallenges } from './exception';
import { advancedStructuresChallenges } from './advanced-structures';

export const allChallenges: Challenge[] = [
  ...nominalSentenceChallenges,
  ...idafaChallenges,
  ...definitenessChallenges,
  ...verbAgreementChallenges,
  ...kanaInnaChallenges,
  ...descriptivePhrasesChallenges,
  ...nestedSentencesChallenges,
  ...relativeClausesChallenges,
  ...conditionalsChallenges,
  ...demonstrativesChallenges,
  ...passiveVoiceChallenges,
  ...verbNegationChallenges,
  ...halTamyizChallenges,
  ...prepositionsChallenges,
  ...moreParticlesChallenges,
  ...vocativeChallenges,
  ...coordinationChallenges,
  ...exceptionChallenges,
  ...advancedStructuresChallenges,
];

export function getChallengeById(id: string): Challenge | undefined {
  return allChallenges.find(c => c.id === id);
}

export function getChallengesByCategory(category: TopicCategory): Challenge[] {
  return allChallenges.filter(c => c.category === category);
}

export function getChallengesByDifficulty(difficulty: Difficulty): Challenge[] {
  return allChallenges.filter(c => c.difficulty === difficulty);
}

export function getNextChallenge(currentId: string): Challenge | undefined {
  const idx = allChallenges.findIndex(c => c.id === currentId);
  if (idx === -1 || idx >= allChallenges.length - 1) return undefined;
  return allChallenges[idx + 1];
}

export function getPrevChallenge(currentId: string): Challenge | undefined {
  const idx = allChallenges.findIndex(c => c.id === currentId);
  if (idx <= 0) return undefined;
  return allChallenges[idx - 1];
}
