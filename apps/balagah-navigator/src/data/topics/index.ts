import type { BalagahTopic } from '../types';

// Ma'ani — Introduction & Foundations
import { introduction } from './introduction';
import { partsOfSentence } from './parts-of-sentence';
import { sentenceTypesGrammar } from './sentence-types-grammar';

// Ma'ani — Sentence Types by Meaning
import {
  khabariyyah,
  inshaiyyahIntro,
  amr,
  nahy,
  istifham,
  tamanni,
  taraji,
  nidaInsha,
  khabarInshaInterchange,
} from './sentence-types-meaning';

// Ma'ani — Sentence Order
import { sentenceOrder } from './sentence-order';

// Ma'ani — Nakirah & Ma'rifah
import {
  damir,
  alAhdiyyah,
  alJinsiyyah,
  alIstighraqiyyah,
  alam,
  isharahMawsulMudaf,
  nakirah,
} from './nakirah-marifah';

// Ma'ani — Qasr, Wasl/Fasl, Speech Length, Misc
import { qasr } from './qasr';
import { waslFasl } from './wasl-fasl';
import { musawah, ijaz, itnab } from './length-of-speech';
import { miscellaneous } from './miscellaneous';

// Bayan
import { tashbih } from './tashbih';
import { majazIntro, istiarah, majazMursal, majazAqli } from './majaz';
import { kinayah } from './kinayah';

// Badi'
import { muhassinatManawiyyah } from './muhassinat-manawiyyah';
import { muhassinatLafdhiyyah } from './muhassinat-lafdhiyyah';

/** All topics in display order (matching units.ts part/topic ordering) */
export const allTopics: BalagahTopic[] = [
  // Unit 1: Ma'ani
  introduction,
  partsOfSentence,
  sentenceTypesGrammar,
  khabariyyah,
  inshaiyyahIntro,
  amr,
  nahy,
  istifham,
  tamanni,
  taraji,
  nidaInsha,
  khabarInshaInterchange,
  sentenceOrder,
  damir,
  alAhdiyyah,
  alJinsiyyah,
  alIstighraqiyyah,
  alam,
  isharahMawsulMudaf,
  nakirah,
  qasr,
  waslFasl,
  musawah,
  ijaz,
  itnab,
  miscellaneous,
  // Unit 2: Bayan
  tashbih,
  majazIntro,
  istiarah,
  majazMursal,
  majazAqli,
  kinayah,
  // Unit 3: Badi'
  muhassinatManawiyyah,
  muhassinatLafdhiyyah,
];

/** Lookup map: topic.id → BalagahTopic */
export const topicMap: Record<string, BalagahTopic> = Object.fromEntries(
  allTopics.map(t => [t.id, t]),
);

/** Helper to get a topic by its slug/id */
export function getTopicById(id: string): BalagahTopic | undefined {
  return topicMap[id];
}
