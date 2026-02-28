export interface PhraseLabelInfo {
  en: string;
  ar: string;
  description: string;
}

export const phraseLabels: Record<string, PhraseLabelInfo> = {
  'jar-majrur': {
    en: 'Prepositional Phrase',
    ar: 'جار ومجرور',
    description: 'A preposition followed by its object, forming a complete prepositional phrase.',
  },
  'idafa': {
    en: 'Possessive',
    ar: 'إضافة',
    description: 'A genitive construction showing possession or relationship between two nouns.',
  },
  'sifa': {
    en: 'Adjective-Noun',
    ar: 'نعت ومنعوت',
    description: 'An adjective describing the noun that precedes it.',
  },
  'conjunction': {
    en: 'Conjunction',
    ar: 'عطف',
    description: 'A conjunction linking two words or phrases together.',
  },
};
