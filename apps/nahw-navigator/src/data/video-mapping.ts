import type { Difficulty, VideoRef } from './types';
import sugra from '@playlists/PLzn0qdi6JpdsVT-ifoh8k7M1WOgrENMxL.json';
import wusta from '@playlists/PLzn0qdi6JpduY3pTvyB-flPijq70k34Qy.json';
import kubra from '@playlists/PLzn0qdi6JpdtQWS7sMqf1Dn_NHoEldir7.json';

// Maps topic IDs to 1-based video indices for each difficulty level.
// As-Sugra → beginner, Al-Wusta → intermediate, Al-Kubra → advanced.

type VideoIndices = Record<string, number[]>;

const sugraMap: VideoIndices = {
  'word-types': [1, 2],
  'transitive-intransitive': [3, 6],
  'kana-and-sisters': [4, 5],
  'prepositions': [7],
  'inna-and-sisters': [8, 9],
  'nasb-particles': [10],
  'jazm-particles': [10],
  'noun-as-operator': [11, 12],
  'semantic-operator': [13],
  'fail': [16],
  'mubtada-khabar': [16],
  'naib-al-fail': [16],
  'maf-ul-bih': [17],
  'hal': [17],
  'tamyiz': [17],
  'maf-ul-mutlaq': [17],
  'maf-ul-fihi': [17],
  'maf-ul-lahu': [17],
  'maf-ul-ma-ahu': [17],
  'mustathna': [17],
  'mudaf-ilayhi': [18],
  'na-t': [19],
  'tawkid': [19],
  'atf': [19],
  'badal': [19],
  'irab-signs': [21, 22, 23, 24, 25, 26, 27, 28],
  'five-nouns': [22],
  'sound-plurals-dual': [22],
};

const wustaMap: VideoIndices = {
  'word-types': [1, 2],
  'nominal-sentence': [3, 4, 5, 6],
  'verbal-sentence': [3],
  'transitive-intransitive': [9, 10],
  'kana-and-sisters': [11, 12, 13, 14, 15, 16],
  'prepositions': [17, 18, 19, 20, 21, 22, 23],
  'inna-and-sisters': [25, 26],
  'nasb-particles': [27],
  'jazm-particles': [28],
  'noun-as-operator': [42, 43, 44],
  'semantic-operator': [45],
  'fail': [48],
  'mubtada-khabar': [48, 49],
  'naib-al-fail': [48],
  'maf-ul-bih': [50],
  'hal': [50],
  'tamyiz': [50],
  'maf-ul-mutlaq': [50],
  'maf-ul-fihi': [50],
  'maf-ul-lahu': [50],
  'maf-ul-ma-ahu': [50],
  'mustathna': [50, 51],
  'mudaf-ilayhi': [52],
  'na-t': [53],
  'badal': [54],
  'atf': [55],
  'tawkid': [56],
  'irab-signs': [68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 83, 84, 85, 86, 87, 88, 89],
  'five-nouns': [71],
  'sound-plurals-dual': [71],
};

const kubraMap: VideoIndices = {
  'word-types': [1, 3, 4, 5, 6, 7, 8],
  'nominal-sentence': [9, 10, 11, 12],
  'verbal-sentence': [9, 10],
  'transitive-intransitive': [19, 20, 21, 22, 23, 24, 25, 26, 27],
  'kana-and-sisters': [28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39],
  'prepositions': [40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58],
  'inna-and-sisters': [60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72],
  'nasb-particles': [73, 74, 75, 76],
  'jazm-particles': [77, 78],
  'noun-as-operator': [104, 105, 106, 107, 108, 109, 110, 111, 113],
  'semantic-operator': [112],
  'fail': [124],
  'naib-al-fail': [125],
  'mubtada-khabar': [126, 127],
  'maf-ul-mutlaq': [128],
  'maf-ul-bih': [129],
  'maf-ul-fihi': [130],
  'maf-ul-lahu': [131],
  'maf-ul-ma-ahu': [132],
  'hal': [133],
  'tamyiz': [134],
  'mustathna': [135],
  'mudaf-ilayhi': [139],
  'na-t': [140],
  'irab-signs': [18],
  'five-nouns': [],
  'sound-plurals-dual': [],
};

const playlists = {
  beginner: { data: sugra, map: sugraMap },
  intermediate: { data: wusta, map: wustaMap },
  advanced: { data: kubra, map: kubraMap },
} as const;

/**
 * Look up video refs for a topic at a given difficulty.
 * Returns [] if no videos match (component renders nothing).
 */
export function getVideosForTopic(topicId: string, difficulty: Difficulty): VideoRef[] {
  const entry = playlists[difficulty];
  const indices = entry.map[topicId];
  if (!indices || indices.length === 0) return [];

  const seen = new Set<string>();
  const videos: VideoRef[] = [];

  for (const idx of indices) {
    const video = entry.data.videos.find(v => v.index === idx);
    if (!video || video.duration === 0) continue; // skip private/missing
    if (seen.has(video.videoId)) continue; // deduplicate
    seen.add(video.videoId);

    // Strip the textbook prefix from the title to get the Arabic portion
    const title = video.title
      .replace(/^Al-Kubra fi An-Nahw:\s*/i, '')
      .replace(/^Al-Kubra:\s*/i, '')
      .replace(/^Al-Wusta fi An-Nahw\s*\|\s*/i, '')
      .replace(/^As-Sugra fi [Aa]n-Nahw\s*(Lesson\s*\d+\s*)?/i, '')
      .replace(/^Lesson\s*\d+\s*,?\s*/i, '')
      .trim();

    videos.push({
      videoId: video.videoId,
      title: title || video.title,
      duration: video.duration,
    });
  }

  return videos;
}

/** Playlist name for badge display */
export function getPlaylistName(difficulty: Difficulty): string {
  const names: Record<Difficulty, string> = {
    beginner: 'As-Sugra',
    intermediate: 'Al-Wusta',
    advanced: 'Al-Kubra',
  };
  return names[difficulty];
}

export interface ResourceInfo {
  pdfUrl: string;
  durusUrl: string;
  resourceUrl: string;
  textbookName: string;
}

const resourceMap: Record<Difficulty, ResourceInfo> = {
  beginner: {
    pdfUrl: '/textbooks/as-sugra.pdf',
    durusUrl: 'https://arabtools-durus.pages.dev/#as-sugra',
    resourceUrl: 'https://www.alqalaminstitute.org/resources/nahw-resources/as-sugra-fi-an-nahw-resources',
    textbookName: 'As-Sugra',
  },
  intermediate: {
    pdfUrl: '/textbooks/al-wusta.pdf',
    durusUrl: 'https://arabtools-durus.pages.dev/#al-wusta',
    resourceUrl: 'https://www.alqalaminstitute.org/resources/nahw-resources/al-wusta-fi-an-nahw-resources',
    textbookName: 'Al-Wusta',
  },
  advanced: {
    pdfUrl: '/textbooks/al-kubra.pdf',
    durusUrl: 'https://arabtools-durus.pages.dev/#al-kubra',
    resourceUrl: 'https://www.alqalaminstitute.org/resources/nahw-resources/al-kubra-fi-an-nahw-resources',
    textbookName: 'Al-Kubra',
  },
};

export function getResourcesForDifficulty(difficulty: Difficulty): ResourceInfo {
  return resourceMap[difficulty];
}

export const fstuResources: ResourceInfo[] = [
  {
    pdfUrl: '/textbooks/fstu-arabic.pdf',
    durusUrl: 'https://arabtools-durus.pages.dev/',
    resourceUrl: 'https://www.alqalaminstitute.org/resources/nahw-resources/fstu-arabic-resources',
    textbookName: 'FSTU Arabic',
  },
  {
    pdfUrl: '/textbooks/fstu-nahw.pdf',
    durusUrl: 'https://arabtools-durus.pages.dev/',
    resourceUrl: 'https://www.alqalaminstitute.org/resources/nahw-resources/fstu-arabic-resources',
    textbookName: 'FSTU Nahw',
  },
];
