/**
 * Sarf Vocabulary Unit 9
 * Combined weak-letter verbs - comprehensive review
 * Each verb combines two or more irregular features simultaneously
 */

import type { ArabicWord } from '../arabicRoots';

export const sarfUnit9Words: ArabicWord[] = [
  // ناقص ومهموز الفاء (Defective + Initial-Hamzated)
  { root: 'أ ب ي', pastTense: 'أَبَى', presentTense: 'يَأْبَى', gerund: 'إِبَاءَ', type: "Naqis Mahmooz al-Fa'", verbForm: 'I', meaning: 'to reject', difficulty: 'advanced' },
  { root: 'أ ت ي', pastTense: 'أَتَى', presentTense: 'يَأْتِي', gerund: 'إِتْيَانًا', type: "Naqis Mahmooz al-Fa'", verbForm: 'I', meaning: 'to come', difficulty: 'advanced' },
  { root: 'أ ت ي', pastTense: 'آتَى', presentTense: 'يُؤْتِي', gerund: 'إِيتَاءً', type: "Naqis Mahmooz al-Fa'", verbForm: 'IV', meaning: 'to give', difficulty: 'advanced' },
  { root: 'أ د ي', pastTense: 'أَدَّى', presentTense: 'يُؤَدِّي', gerund: 'تَأْدِيَةً', type: "Naqis Mahmooz al-Fa'", verbForm: 'II', meaning: 'to fulfil', difficulty: 'advanced' },
  { root: 'أ س ي', pastTense: 'أَسِيَ', presentTense: 'يَأْسَى', gerund: 'أَسًى', type: "Naqis Mahmooz al-Fa'", verbForm: 'I', meaning: 'to be sad', difficulty: 'advanced' },
  { root: 'أ س ي', pastTense: 'أَسَّى', presentTense: 'يُؤَسِّي', gerund: 'تَأْسِيَةً', type: "Naqis Mahmooz al-Fa'", verbForm: 'II', meaning: 'to extort, enjoin', difficulty: 'advanced' },
  { root: 'أ ل و', pastTense: 'أَلَا', presentTense: 'يَأْلُو', gerund: 'أُلُوًّا', type: "Naqis Mahmooz al-Fa'", verbForm: 'I', meaning: 'to neglect, to fail to do', difficulty: 'advanced' },
  { root: 'أ ل ي', pastTense: 'آلَى', presentTense: 'يُؤْلِي', gerund: 'إِيلَاءً', type: "Naqis Mahmooz al-Fa'", verbForm: 'IV', meaning: 'to swear', difficulty: 'advanced' },
  { root: 'أ ل ي', pastTense: 'اِبْتَلَى', presentTense: 'يَأْتَلِي', gerund: 'اِبْتِلَاءً', type: "Naqis Mahmooz al-Fa'", verbForm: 'VIII', meaning: 'to take an oath', difficulty: 'advanced' },

  // مثال ومهموز اللام (Initial-Weak + Final-Hamzated)
  { root: 'و ك أ', pastTense: 'اِتَّكَأَ', presentTense: 'يَتَّكِئُ', gerund: 'اِتِّكَاءً', type: 'Mithal Mahmooz al-Lam', verbForm: 'VIII', meaning: 'to lean, recline', difficulty: 'advanced' },
  { root: 'و ط أ', pastTense: 'وَطِئَ', presentTense: 'يَطَأُ', gerund: 'وَطْأً', type: 'Mithal Mahmooz al-Lam', verbForm: 'I', meaning: 'to tread on', difficulty: 'advanced' },

  // مثال ومهموز العين (Initial-Weak + Middle-Hamzated)
  { root: 'و أ د', pastTense: 'وَأَدَ', presentTense: 'يَئِدُ', gerund: 'وَأْدًا', type: "Mithal Mahmooz al-'Ayn", verbForm: 'I', meaning: 'to bury alive', difficulty: 'advanced' },
  { root: 'و أ ر', pastTense: 'وَأَرَ', presentTense: 'يَئِرُ', gerund: 'وَأْرًا', type: "Mithal Mahmooz al-'Ayn", verbForm: 'I', meaning: 'to frighten', difficulty: 'advanced' },
  { root: 'ي أ س', pastTense: 'اِسْتَيْأَسَ', presentTense: 'يَسْتَيْئِسُ', gerund: 'اِسْتِيئَاسًا', type: "Mithal Mahmooz al-'Ayn", verbForm: 'X', meaning: 'to give up hope', difficulty: 'advanced' },

  // أجوف ومهموز الفاء (Hollow + Initial-Hamzated)
  { root: 'أ ي د', pastTense: 'آدَ', presentTense: 'يَئِيدُ', gerund: 'أَيْدًا', type: "Ajwaf Mahmooz al-Fa'", verbForm: 'I', meaning: 'to be strong', difficulty: 'advanced' },
  { root: 'أ ي ض', pastTense: 'آضَ', presentTense: 'يَئِيضُ', gerund: 'أَيْضًا', type: "Ajwaf Mahmooz al-Fa'", verbForm: 'I', meaning: 'to return', difficulty: 'advanced' },
  { root: 'أ و ل', pastTense: 'آلَ', presentTense: 'يَؤُولُ', gerund: 'أَوْلًا', type: "Ajwaf Mahmooz al-Fa'", verbForm: 'I', meaning: 'to return', difficulty: 'advanced' },
  { root: 'أ و ه', pastTense: 'آهَ', presentTense: 'يَؤُوهُ', gerund: 'أَوْهًا', type: "Ajwaf Mahmooz al-Fa'", verbForm: 'I', meaning: 'to moan', difficulty: 'advanced' },

  // أجوف ومهموز اللام (Hollow + Final-Hamzated)
  { root: 'ج ي أ', pastTense: 'أَجَاءَ', presentTense: 'يُجِيءُ', gerund: 'إِجَاءَةً', type: 'Ajwaf Mahmooz al-Lam', verbForm: 'IV', meaning: 'to force to a place', difficulty: 'advanced' },
  { root: 'ض و أ', pastTense: 'أَضَاءَ', presentTense: 'يُضِيءُ', gerund: 'إِضَاءَةً', type: 'Ajwaf Mahmooz al-Lam', verbForm: 'IV', meaning: 'to enlighten', difficulty: 'advanced' },
  { root: 'ب و أ', pastTense: 'بَاءَ', presentTense: 'يَبُوءُ', gerund: 'بَوْءًا', type: 'Ajwaf Mahmooz al-Lam', verbForm: 'I', meaning: 'to return', difficulty: 'advanced' },
  { root: 'ج ي أ', pastTense: 'جَاءَ', presentTense: 'يَجِيءُ', gerund: 'مَجِيئًا', type: 'Ajwaf Mahmooz al-Lam', verbForm: 'I', meaning: 'to come', difficulty: 'advanced' },
  { root: 'س و أ', pastTense: 'سَاءَ', presentTense: 'يَسُوءُ', gerund: 'سُوءًا', type: 'Ajwaf Mahmooz al-Lam', verbForm: 'I', meaning: 'to become bad', difficulty: 'advanced' },
  { root: 'ش ي أ', pastTense: 'شَاءَ', presentTense: 'يَشَاءُ', gerund: 'مَشِيئَةً', type: 'Ajwaf Mahmooz al-Lam', verbForm: 'I', meaning: 'to wish', difficulty: 'advanced' },

  // ناقص ومهموز العين (Defective + Middle-Hamzated)
  { root: 'ر أ ي', pastTense: 'أَرَى', presentTense: 'يُرِي', gerund: 'إِرَاءَةً', type: "Naqis Mahmooz al-'Ayn", verbForm: 'IV', meaning: 'to show', difficulty: 'advanced' },
  { root: 'ر أ ي', pastTense: 'تَرَاءَى', presentTense: 'يَتَرَاءَى', gerund: 'تَرَائِيًا', type: "Naqis Mahmooz al-'Ayn", verbForm: 'VI', meaning: 'to present oneself, to appear', difficulty: 'advanced' },
  { root: 'ر أ ي', pastTense: 'رَاءَى', presentTense: 'يُرَائِي', gerund: 'مُرَاءَاةً', type: "Naqis Mahmooz al-'Ayn", verbForm: 'III', meaning: 'to show off', difficulty: 'advanced' },
  { root: 'ر أ ي', pastTense: 'رَأَى', presentTense: 'يَرَى', gerund: 'رُؤْيَةً', type: "Naqis Mahmooz al-'Ayn", verbForm: 'I', meaning: 'to see', difficulty: 'advanced' },
  { root: 'ن أ ي', pastTense: 'نَأَى', presentTense: 'يَنْأَى', gerund: 'نَأْيًا', type: "Naqis Mahmooz al-'Ayn", verbForm: 'I', meaning: 'to be far', difficulty: 'advanced' },

  // مثال ومضاعف (Initial-Weak + Doubled)
  { root: 'و د د', pastTense: 'وَادَّ', presentTense: 'يُوَادُّ', gerund: 'مُوَادَّةً', type: "Mithal Mudaa'af", verbForm: 'III', meaning: 'to make friends', difficulty: 'advanced' },
  { root: 'و د د', pastTense: 'وَدَّ', presentTense: 'يَوَدُّ', gerund: 'وَدًّا', type: "Mithal Mudaa'af", verbForm: 'I', meaning: 'to love', difficulty: 'advanced' },

  // لفيف مقرون ومهموز الفاء (Joined-Double-Weak + Initial-Hamzated)
  { root: 'أ و ي', pastTense: 'أَوَى', presentTense: 'يَأْوِي', gerund: 'أَيًّا', type: "Lafif Maqroon Mahmooz al-Fa'", verbForm: 'I', meaning: 'to seek refuge', difficulty: 'advanced' },
  { root: 'أ و ي', pastTense: 'آوَى', presentTense: 'يُؤْوِي', gerund: 'إِيوَاءً', type: "Lafif Maqroon Mahmooz al-Fa'", verbForm: 'IV', meaning: 'to give shelter', difficulty: 'advanced' },

  // لفيف مفروق ومهموز العين (Separated-Double-Weak + Middle-Hamzated)
  { root: 'و أ ي', pastTense: 'وَأَى', presentTense: 'يَئِي', gerund: 'وَأْيًا', type: "Lafif Mafrooq Mahmooz al-'Ayn", verbForm: 'I', meaning: 'to make a promise', difficulty: 'advanced' },
];
