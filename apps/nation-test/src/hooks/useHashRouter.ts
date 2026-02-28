import { useState, useEffect, useCallback } from 'react';
import type { TestType } from '../types';

const allTestTypes: TestType[] = [
  'vst', 'vlt', 'yesno', 'productive', 'sentence', 'sentence_production',
  'collocation', 'root_pattern', 'translation', 'reading_comprehension',
  'verb_conjugation', 'cloze', 'diacritics', 'irab', 'word_derivation',
  'morphological_analysis', 'verb_form_id', 'idiomatic', 'word_family',
  'quranic', 'synonyms_antonyms', 'negation', 'preposition', 'question_words',
  'relative_clause', 'spelling', 'demonstrative', 'possessive',
  'quranic_vst', 'ayah_context', 'morph_chain', 'grammar_tag',
];

export function useHashRouter() {
  const parse = () => {
    const raw = window.location.hash.replace('#', '');
    if (raw.startsWith('test/')) {
      const type = raw.slice(5) as TestType;
      if (allTestTypes.includes(type)) return { slug: raw, testType: type };
    }
    return { slug: raw, testType: null };
  };

  const [state, setState] = useState(parse);

  useEffect(() => {
    const onHashChange = () => setState(parse());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const navigate = useCallback((type: TestType) => {
    window.location.hash = 'test/' + type;
  }, []);

  const goHome = useCallback(() => {
    history.pushState(null, '', window.location.pathname);
    setState({ slug: '', testType: null });
  }, []);

  return { slug: state.slug, testType: state.testType, navigate, goHome };
}
