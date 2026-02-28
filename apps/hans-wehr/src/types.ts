/**
 * Hans Wehr Dictionary Types
 */

export interface HansWehrEntry {
  _id: { $oid: string };
  root: string;
  word_ID: string;
  response: {
    words: HansWehrWord[];
  };
  forms: HansWehrWord[];
  nouns?: HansWehrWord[];
}

export interface HansWehrWord {
  id: string;
  text: string;
  form: string;
  transliteration: string;
  plural?: {
    text: string;
    transliteration: string;
  };
  root: {
    id: string;
    text: string;
    word_count: number;
    form_count: number;
  };
  translation: {
    id: string;
    text: string;
    short: string;
    google: string;
    amazon: string;
  };
  has_word_match: boolean;
}

export interface HansWehrLetterData {
  version: string;
  generatedAt: string;
  letter: string;
  data: HansWehrEntry[];
}

export interface HansWehrTableRow {
  arabic: string;
  transliteration: string;
  form: string;
  root: string;
  translation: string;
}
