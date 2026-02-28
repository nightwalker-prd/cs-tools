export interface ToolMapping {
  toolId: string;
  name: string;
  weight: number;
  localStorageKeys: string[];
}

export interface PillarConfig {
  pillarId: string;
  nameEn: string;
  nameAr: string;
  tools: ToolMapping[];
}

export const PILLAR_CONFIGS: PillarConfig[] = [
  {
    pillarId: 'grammar',
    nameEn: 'Grammar',
    nameAr: 'النحو',
    tools: [
      {
        toolId: 'tashkhis',
        name: 'Tashkhis',
        weight: 3,
        localStorageKeys: ['arabtools-tashkhis-history'],
      },
      {
        toolId: 'fstu-exercises',
        name: 'FSTU Exercises',
        weight: 2,
        localStorageKeys: ['arabtools-fstu-progress'],
      },
      {
        toolId: 'bina',
        name: 'Bina',
        weight: 2,
        localStorageKeys: ['arabtools-bina-progress'],
      },
      {
        toolId: 'tarkib-builder',
        name: 'Tarkib Builder',
        weight: 1,
        localStorageKeys: ['arabtools-tarkib-builder-progress'],
      },
    ],
  },
  {
    pillarId: 'morphology',
    nameEn: 'Morphology',
    nameAr: 'الصرف',
    tools: [
      {
        toolId: 'tashkhis',
        name: 'Tashkhis',
        weight: 2,
        localStorageKeys: ['arabtools-tashkhis-history'],
      },
      {
        toolId: 'sarf-exercises',
        name: 'Sarf Exercises',
        weight: 3,
        localStorageKeys: ['arabtools-sarf-ex-state'],
      },
    ],
  },
  {
    pillarId: 'vocabulary',
    nameEn: 'Vocabulary',
    nameAr: 'المفردات',
    tools: [
      {
        toolId: 'kalimat',
        name: 'Quranic Vocabulary',
        weight: 2,
        localStorageKeys: ['arabtools-kalimat-progress', 'arabtools-kalimat-stats'],
      },
      {
        toolId: 'mufradat',
        name: 'Mufradat',
        weight: 2,
        localStorageKeys: ['arabtools-srs-state'],
      },
      {
        toolId: 'kalimat',
        name: 'Kalaam',
        weight: 1.5,
        localStorageKeys: ['arabtools-srs-state'],
      },
    ],
  },
  {
    pillarId: 'quran',
    nameEn: 'Quran',
    nameAr: 'القرآن',
    tools: [
      {
        toolId: 'hafiz',
        name: 'Hafiz Tracker',
        weight: 3,
        localStorageKeys: ['arabtools-hafiz-state', 'arabtools-hafiz-srs'],
      },
      {
        toolId: 'dhakira',
        name: 'Dhakira',
        weight: 1,
        localStorageKeys: ['dhakira-stats'],
      },
    ],
  },
  {
    pillarId: 'reading-writing',
    nameEn: 'Reading & Writing',
    nameAr: 'القراءة والكتابة',
    tools: [
      {
        toolId: 'insha-guide',
        name: 'Insha Guide',
        weight: 3,
        localStorageKeys: ['arabtools-insha-progress'],
      },
      {
        toolId: 'reading',
        name: 'Reading Tool',
        weight: 2,
        localStorageKeys: ['arabtools-reading-visited'],
      },
      {
        toolId: 'durus',
        name: 'Durus',
        weight: 1,
        localStorageKeys: ['arabtools-durus-progress'],
      },
    ],
  },
];
