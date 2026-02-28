import type { NahwTopic } from '../types';

// Unit 1: Words
import { wordTypes, definiteIndefinite, gender, number, nounIrab, diptotes } from './words';
import { verbTense, verbIrab, verbNegation, verbGenderVoice } from './verbs';
import { particles, masdarDerived } from './particles-derived';

// Unit 2: Sentences
import { nominalSentence, kanaAndSisters, innaAndSisters } from './nominal-sentence';
import { verbalSentence, mafUlBih, naibAlFail } from './verbal-sentence';
import { mafUlFihi, mafUlMutlaq, mafUlLahu, hal, tamyiz, mustathna, mafUlMaAhu } from './adverbs-state';

// Unit 3: Phrases
import { nat, demonstrativePhrases } from './descriptive-demonstrative';
import { atf, badal } from './conjunctive-appositive';
import { mudafIlayhi, prepositions, shibhAlJumla } from './possessive-prepositional';
import { numberPhrases } from './number-phrases';

// Unit 4: Pronouns
import { damirMarfu, damirMansub, damirMajrur } from './pronouns-personal';
import { harfIstifham, ismIstifham } from './pronouns-interrogative';
import { tawkid } from './emphasis';

// Unit 5: Nested Sentences
import { jumlaSughra } from './nested-direct';
import { ismMawsul } from './nested-relative';
import { harfMawsul, verbalPhrases } from './nested-conjunction';

// Unit 6: Joining Sentences
import { nida, qasam } from './vocative-oath';
import { shart } from './conditional';
import { amrNahy, jumlaTaliliyya, jumlaIstidrakiyya } from './command-reason';

export const allTopics: NahwTopic[] = [
  // Unit 1: Words
  wordTypes,
  definiteIndefinite,
  gender,
  number,
  nounIrab,
  diptotes,
  verbTense,
  verbIrab,
  verbNegation,
  verbGenderVoice,
  particles,
  masdarDerived,
  // Unit 2: Sentences
  nominalSentence,
  kanaAndSisters,
  innaAndSisters,
  verbalSentence,
  mafUlBih,
  naibAlFail,
  mafUlFihi,
  mafUlMutlaq,
  mafUlLahu,
  hal,
  tamyiz,
  mustathna,
  mafUlMaAhu,
  // Unit 3: Phrases
  nat,
  demonstrativePhrases,
  atf,
  badal,
  mudafIlayhi,
  prepositions,
  shibhAlJumla,
  numberPhrases,
  // Unit 4: Pronouns
  damirMarfu,
  damirMansub,
  damirMajrur,
  harfIstifham,
  ismIstifham,
  tawkid,
  // Unit 5: Nested Sentences
  jumlaSughra,
  ismMawsul,
  harfMawsul,
  verbalPhrases,
  // Unit 6: Joining Sentences
  nida,
  qasam,
  shart,
  amrNahy,
  jumlaTaliliyya,
  jumlaIstidrakiyya,
];

export const topicMap: Record<string, NahwTopic> = {};
for (const topic of allTopics) {
  topicMap[topic.id] = topic;
}

// Backward-compatible aliases for old topic IDs
const aliases: Record<string, string> = {
  'fail': 'verbal-sentence',
  'mubtada-khabar': 'nominal-sentence',
  'transitive-intransitive': 'verbal-sentence',
  'noun-as-operator': 'mudaf-ilayhi',
  'semantic-operator': 'nominal-sentence',
  'nasb-particles': 'harf-mawsul',
  'jazm-particles': 'shart',
  'irab-signs': 'noun-irab',
  'five-nouns': 'noun-irab',
  'sound-plurals-dual': 'noun-irab',
};

for (const [oldId, newId] of Object.entries(aliases)) {
  if (topicMap[newId] && !topicMap[oldId]) {
    topicMap[oldId] = topicMap[newId];
  }
}

export function getTopicById(id: string): NahwTopic | undefined {
  return topicMap[id];
}

export function getTopicsByCategory(categoryId: string): NahwTopic[] {
  return allTopics.filter(t => t.categoryId === categoryId);
}
