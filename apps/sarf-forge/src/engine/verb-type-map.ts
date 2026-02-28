/** Maps UI verb type names to @arabiyya/sarf internal type keys */
export const VERB_TYPE_MAP: Record<string, string> = {
  'Regular': 'sahih',
  'Mithal': 'mithaal',
  'Ajwaf': 'ajwaf',
  'Naqis': 'naaqis',
  "Mudaa'af": "mudaa'af",
  "Mahmooz al-Fa'": 'sahih',
  "Mahmooz al-'Ayn": 'sahih',
  'Mahmooz al-Lam': 'sahih',
  'Lafif Maqroon': 'naaqis',
  'Lafif Mafrooq': 'mithaal',
};

/** Form I bab detection keys */
export const FORM_ONE_BABS = ['nasara', 'daraba', 'fataha', "sami'a", 'hasiba', 'karuma'] as const;
