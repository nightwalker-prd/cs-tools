import type { GrammarData, WordBatchItem } from '@/types';
import AyahSection from './AyahSection';
import ExplanationSection from './ExplanationSection';
import GrammarFlowDiagram from './GrammarFlowDiagram';

interface DetailsTabProps {
  grammarData: GrammarData | null;
  wordData: WordBatchItem | null;
}

export default function DetailsTab({ grammarData, wordData }: DetailsTabProps) {
  // Get ayah data from grammar derivedForms or wordData bestExample
  let ayahArabic: string | undefined;
  let ayahTranslation: string | undefined;
  let targetWord: string | undefined;

  if (grammarData?.derivedForms?.[0]?.examples?.[0]) {
    const example = grammarData.derivedForms[0].examples[0];
    ayahArabic = example.ayahArabic;
    ayahTranslation = example.ayahTranslation;
    targetWord = grammarData.derivedForms[0].arabic;
  }

  // Use wordData bestExample as fallback for target word
  if (!targetWord && wordData?.bestExample) {
    targetWord = wordData.bestExample.arabic;
  }

  const info = wordData?.info || '';

  return (
    <div className="space-y-4">
      {/* Word display card */}
      {wordData && (
        <div className="bg-card rounded-xl p-6 text-center">
          <p className="font-arabic text-3xl text-text" dir="rtl">
            {wordData.lemma}
          </p>
          <p className="text-base text-text-secondary mt-2">{wordData.meaning}</p>
          {wordData.transliteration && (
            <p className="text-xs text-text-secondary/70 mt-1 italic">
              {wordData.transliteration}
            </p>
          )}
          <div className="flex items-center justify-center gap-3 mt-3">
            {wordData.root && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-grammar-root/10 text-grammar-root">
                Root: {wordData.root}
              </span>
            )}
            <span className="text-xs px-2 py-0.5 rounded-full bg-primary-light text-primary">
              {wordData.count}x in Quran
            </span>
          </div>
        </div>
      )}

      {/* Ayah context */}
      <AyahSection
        ayahArabic={ayahArabic}
        ayahTranslation={ayahTranslation}
        targetWord={targetWord}
      />

      {/* Explanation */}
      {info && <ExplanationSection info={info} />}

      {/* Grammar flow diagram */}
      {grammarData && grammarData.transformations.length > 0 && (
        <GrammarFlowDiagram grammarData={grammarData} />
      )}
    </div>
  );
}
