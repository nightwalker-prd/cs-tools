import type { ExtendedVerbType, IlaalStep } from './types';
import { ajwafAnnotations, ajwafYaaiAnnotations } from './annotations/ajwaf';
import { naaqisWaawiAnnotations, naaqisYaaiAnnotations } from './annotations/naaqis';
import { mithaalWaawiAnnotations, mithaalYaaiAnnotations } from './annotations/mithaal';
import { mudaafAnnotations } from './annotations/mudaaf';
import { mahmoozFaaAnnotations, mahmoozAynAnnotations, mahmoozLamAnnotations } from './annotations/mahmooz';
import { lafifMaqroonAnnotations, lafifMafrooqAnnotations } from './annotations/lafif';

/** Map of extended verb types to their annotation sets */
const annotationMap: Partial<Record<ExtendedVerbType, Record<string, IlaalStep[]>>> = {
  'ajwaf-waawi': ajwafAnnotations,
  'ajwaf-yaai': ajwafYaaiAnnotations,
  'naaqis-waawi': naaqisWaawiAnnotations,
  'naaqis-yaai': naaqisYaaiAnnotations,
  'mithaal-waawi': mithaalWaawiAnnotations,
  'mithaal-yaai': mithaalYaaiAnnotations,
  "mudaa'af": mudaafAnnotations,
  'mahmooz-faa': mahmoozFaaAnnotations,
  'mahmooz-ayn': mahmoozAynAnnotations,
  'mahmooz-lam': mahmoozLamAnnotations,
  'lafif-maqroon': lafifMaqroonAnnotations,
  'lafif-mafrooq': lafifMafrooqAnnotations,
};

/**
 * Get step-by-step annotation for a specific verb type, form, section, and pronoun.
 *
 * Currently returns hand-authored annotations for Form I.
 * For other forms, returns an empty array (auto-heuristic could be added later).
 */
export function getAnnotation(
  extendedType: ExtendedVerbType,
  formNumber: string,
  sectionId: string,
  pronoun: string
): IlaalStep[] {
  // Hand-authored annotations are currently for Form I only
  if (formNumber !== '1') {
    return [];
  }

  const annotations = annotationMap[extendedType];
  if (!annotations) return [];

  const key = `${sectionId}:${pronoun}`;
  return annotations[key] || [];
}
