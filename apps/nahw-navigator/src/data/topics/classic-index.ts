import type { NahwTopic } from '../types';

// Introduction
import { wordTypes, nominalSentence, verbalSentence } from './introduction';

// Operator
import { transitiveIntransitive, kanaAndSisters, innaAndSisters } from './operator-verb';
import { prepositions, nasbParticles, jazmParticles } from './operator-particle';
import { nounAsOperator, semanticOperator } from './operator-noun';

// Governed
import { fail, mubtadaKhabar, mafulBih, hal, tamyiz } from './governed-noun';
import { naibAlFail } from './governed-nominative';
import { mafUlMutlaq, mafUlFihi, mafUlLahu, mafUlMaAhu, mustathna } from './governed-accusative';
import { mudafIlayhi } from './governed-genitive';
import { nat, tawkid, atf, badal } from './following';

// I'rab
import { irabSigns, fiveNouns, soundPluralsDual } from './irab';

export const classicTopics: NahwTopic[] = [
  // Introduction
  wordTypes,
  nominalSentence,
  verbalSentence,
  // Operator
  transitiveIntransitive,
  kanaAndSisters,
  innaAndSisters,
  prepositions,
  nasbParticles,
  jazmParticles,
  nounAsOperator,
  semanticOperator,
  // Governed
  fail,
  mubtadaKhabar,
  mafulBih,
  hal,
  tamyiz,
  naibAlFail,
  mafUlMutlaq,
  mafUlFihi,
  mafUlLahu,
  mafUlMaAhu,
  mustathna,
  mudafIlayhi,
  nat,
  tawkid,
  atf,
  badal,
  // I'rab
  irabSigns,
  fiveNouns,
  soundPluralsDual,
];

export const classicTopicMap: Record<string, NahwTopic> = {};
for (const topic of classicTopics) {
  classicTopicMap[topic.id] = topic;
}
