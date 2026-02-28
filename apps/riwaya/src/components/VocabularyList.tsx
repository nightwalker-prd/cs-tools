import { useSpeechSynthesis } from '@arabtools/core';
import { Volume2 } from 'lucide-react';
import type { StoryVocab } from '../types';

interface VocabularyListProps {
  vocabulary: StoryVocab[];
}

export function VocabularyList({ vocabulary }: VocabularyListProps) {
  const { speak, isSpeaking } = useSpeechSynthesis();

  return (
    <div className="bg-white rounded-xl border border-parchment-dark/10 overflow-hidden">
      <div className="px-4 py-2.5 bg-lapis/5 border-b border-parchment-dark/10">
        <h4 className="font-serif text-lapis text-sm font-medium">
          Vocabulary
        </h4>
      </div>
      <div className="divide-y divide-parchment-warm/50">
        {vocabulary.map((word, i) => (
          <div key={i} className="px-4 py-2.5 flex items-center gap-3">
            <button
              onClick={() => speak(word.arabic)}
              disabled={isSpeaking}
              className="text-lapis/50 hover:text-lapis transition-colors flex-shrink-0"
              aria-label={`Listen to ${word.transliteration}`}
            >
              <Volume2 className="w-4 h-4" />
            </button>
            <span className="font-arabic text-lg flex-shrink-0" dir="rtl">
              {word.arabic}
            </span>
            <span className="text-xs text-parchment-dark italic">
              {word.transliteration}
            </span>
            <span className="text-sm ml-auto">{word.english}</span>
            {word.root && (
              <span
                className="text-xs text-parchment-dark/60 font-arabic flex-shrink-0"
                dir="rtl"
              >
                {word.root}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
