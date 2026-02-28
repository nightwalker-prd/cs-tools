import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { useRouter } from '@/hooks/useRouter';
import { useGrammarData } from '@/hooks/useGrammarData';
import { useLemmaIndex } from '@/hooks/useLemmaIndex';
import { useWordByLemmaId } from '@/hooks/useWordByLemmaId';
import WordHeader from '@/components/word/WordHeader';
import DetailsTab from '@/components/word/DetailsTab';
import UsagesTab from '@/components/word/UsagesTab';
import ErrorState from '@/components/ErrorState';

interface WordDetailPageProps {
  lemmaId: number;
}

export default function WordDetailPage({ lemmaId }: WordDetailPageProps) {
  const { data: grammarData, loading: grammarLoading, error: grammarError } = useGrammarData(lemmaId);
  const { data: lemmaIndex } = useLemmaIndex();
  const { data: wordData, loading: wordLoading } = useWordByLemmaId(lemmaId, lemmaIndex);
  const [activeTab, setActiveTab] = useState<'details' | 'usages'>('details');
  const { navigate } = useRouter();

  // Determine word location for the header
  const wordLoc = wordData?.bestExample?.wordLoc
    || (grammarData?.derivedForms?.[0]?.examples?.[0]?.wordLoc);

  const isLoading = grammarLoading || wordLoading;

  const handleBack = () => {
    // Navigate back - try history first, fall back to study page
    if (window.history.length > 1) {
      window.history.back();
    } else {
      navigate('#/');
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center pt-20 gap-3">
        <Loader2 size={32} className="text-primary animate-spin" />
        <p className="text-sm text-text-secondary">Loading word details...</p>
      </div>
    );
  }

  if (grammarError && !wordData) {
    return (
      <ErrorState
        message={grammarError || 'Failed to load word data'}
        onRetry={handleBack}
      />
    );
  }

  return (
    <div className="pb-8">
      <WordHeader
        wordLoc={wordLoc}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onBack={handleBack}
      />

      <div className="mt-4">
        {activeTab === 'details' ? (
          <DetailsTab grammarData={grammarData} wordData={wordData} />
        ) : grammarData ? (
          <UsagesTab grammarData={grammarData} />
        ) : (
          <div className="text-center py-8">
            <p className="text-sm text-text-secondary">
              {grammarError
                ? 'Grammar data not available for this word.'
                : 'No usage data available.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
