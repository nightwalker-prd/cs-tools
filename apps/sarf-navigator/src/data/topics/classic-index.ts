import type { SarfTopic } from '../types';

// Introduction (Topics 1-4)
import { clWordTypes, clVerbCategories, clMorphologicalScale, clFoundationalPrinciples } from './classic-introduction';

// Verb Paradigms (Topics 5-9)
import { clSixTrilateralDoors, clAugmentedOne, clAugmentedTwo, clAugmentedThree, clQuadrilateralVerbs } from './classic-verb-paradigms';

// Derivatives (Topics 10-14)
import { clMasdar, clPastTense, clPresentTense, clImperativeProhibition, clDerivedNouns } from './classic-derivatives';

// Seven Categories (Topics 15-21)
import { clSoundVerb, clDoubledVerb, clAssimilatedVerb, clHollowVerb, clDefectiveVerb, clDoublyWeakVerb, clHamzatedVerb } from './classic-seven-categories';

// I'laal Reference (Topics 22-23)
import { clIlaalOverview } from './classic-ilaal-overview';
import { clIlaalAugmentedForms } from './classic-ilaal-augmented';

export const classicTopics: SarfTopic[] = [
  // Introduction
  clWordTypes,
  clVerbCategories,
  clMorphologicalScale,
  clFoundationalPrinciples,

  // Verb Paradigms
  clSixTrilateralDoors,
  clAugmentedOne,
  clAugmentedTwo,
  clAugmentedThree,
  clQuadrilateralVerbs,

  // Derivatives
  clMasdar,
  clPastTense,
  clPresentTense,
  clImperativeProhibition,
  clDerivedNouns,

  // Seven Categories
  clSoundVerb,
  clDoubledVerb,
  clAssimilatedVerb,
  clHollowVerb,
  clDefectiveVerb,
  clDoublyWeakVerb,
  clHamzatedVerb,

  // I'laal Reference
  clIlaalOverview,
  clIlaalAugmentedForms,
];

export const classicTopicMap: Record<string, SarfTopic> = Object.fromEntries(
  classicTopics.map(topic => [topic.id, topic])
);
