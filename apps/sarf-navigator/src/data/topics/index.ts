import type { SarfTopic } from '../types';

// Fundamentals
import { verbForms, pastTense, presentTense } from './fundamentals';
import { abwabOverview, baabFataha } from './abwab';
import { passiveVoice, negationCommands, participles, conjugationPatterns, irabMudari } from './verb-operations';

// Hamzah
import { hamzatulWasl, hamzahWriting, hamzahConjugation } from './hamzah';

// Weak Verbs
import { mithaalWaawi, mithaalYaai } from './mithaal';
import { ajwafWaawi, ajwafYaai } from './ajwaf';
import { naqisWaawi, naqisYaai } from './naqis';
import { lafifMaqrun, lafifMafruq } from './lafif';

// Doubled & Complex
import { mudaafOverview, mudaafIdgham } from './mudaaf';
import { murakkabOverview, murakkabMithaal, murakkabAjwaf, murakkabNaqis } from './murakkab';

// Derived Forms & Nouns
import { thulathiMujarrad, thulathiMazid, rubaaiVerbs, verbClassification } from './derived-forms';
import { sifahMushabbahah, ismTafdil, ismDharfAalah } from './derived-nouns';
import { mudariMansoob, mudariMajzoom, noonTawkeed } from './verb-inflection';

export const allTopics: SarfTopic[] = [
  // Fundamentals
  verbForms,
  pastTense,
  presentTense,
  abwabOverview,
  baabFataha,
  passiveVoice,
  negationCommands,
  participles,
  conjugationPatterns,
  irabMudari,

  // Hamzah
  hamzatulWasl,
  hamzahWriting,
  hamzahConjugation,

  // Weak Verbs
  mithaalWaawi,
  mithaalYaai,
  ajwafWaawi,
  ajwafYaai,
  naqisWaawi,
  naqisYaai,
  lafifMaqrun,
  lafifMafruq,

  // Doubled & Complex
  mudaafOverview,
  mudaafIdgham,
  murakkabOverview,
  murakkabMithaal,
  murakkabAjwaf,
  murakkabNaqis,

  // Derived Forms & Nouns
  thulathiMujarrad,
  thulathiMazid,
  rubaaiVerbs,
  verbClassification,
  sifahMushabbahah,
  ismTafdil,
  ismDharfAalah,
  mudariMansoob,
  mudariMajzoom,
  noonTawkeed,
];

export const topicMap: Record<string, SarfTopic> = Object.fromEntries(
  allTopics.map(topic => [topic.id, topic])
);

export function getTopicById(id: string): SarfTopic | undefined {
  return topicMap[id];
}

export function getTopicsByCategory(categoryId: string): SarfTopic[] {
  return allTopics.filter(topic => topic.categoryId === categoryId);
}
