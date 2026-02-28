import type { VocabularyItem } from '../data/types';

const PROMPT_TEMPLATES_EN = [
  'Write about your daily routine using these words: {words}',
  'Describe your favorite place using: {words}',
  'Write a short story that includes: {words}',
  'Describe what you see around you using: {words}',
  'Write about your family using these words: {words}',
  'Describe your school or workplace using: {words}',
  'Write about what you did yesterday using: {words}',
  'Describe your best friend using: {words}',
  'Write about your plans for tomorrow using: {words}',
  'Describe the weather and seasons using: {words}',
];

const PROMPT_TEMPLATES_AR = [
  'اكتب عن يومك المعتاد مستخدمًا هذه الكلمات: {words}',
  'صِف مكانك المفضل مستخدمًا: {words}',
  'اكتب قصة قصيرة تتضمن: {words}',
  'صِف ما تراه حولك مستخدمًا: {words}',
  'اكتب عن عائلتك مستخدمًا هذه الكلمات: {words}',
  'صِف مدرستك أو مكان عملك مستخدمًا: {words}',
  'اكتب عمّا فعلته أمس مستخدمًا: {words}',
  'صِف صديقك المفضل مستخدمًا: {words}',
  'اكتب عن خططك للغد مستخدمًا: {words}',
  'صِف الطقس والفصول مستخدمًا: {words}',
];

function pickRandom<T>(arr: T[], count: number): T[] {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, count);
}

export function generatePrompt(
  vocab: VocabularyItem[],
  previousPrompts: string[] = []
): { promptEn: string; promptAr: string } {
  // Pick 3-5 random vocabulary words for the prompt
  const wordCount = Math.min(Math.max(3, Math.floor(vocab.length / 3)), 5);
  const selectedWords = pickRandom(vocab, wordCount);
  const arabicWords = selectedWords.map(w => w.arabic).join('، ');
  const englishWords = selectedWords.map(w => `${w.english} (${w.arabic})`).join(', ');

  // Pick a template that hasn't been used recently
  const available = PROMPT_TEMPLATES_EN.filter((_, i) =>
    !previousPrompts.includes(PROMPT_TEMPLATES_EN[i])
  );
  const templateIdx = available.length > 0
    ? PROMPT_TEMPLATES_EN.indexOf(available[Math.floor(Math.random() * available.length)])
    : Math.floor(Math.random() * PROMPT_TEMPLATES_EN.length);

  return {
    promptEn: PROMPT_TEMPLATES_EN[templateIdx].replace('{words}', englishWords),
    promptAr: PROMPT_TEMPLATES_AR[templateIdx].replace('{words}', arabicWords),
  };
}
