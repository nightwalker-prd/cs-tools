import type { Course, PlaylistData, Video } from './types';
import { FSTU_ARABIC_EXAMS, FSTU_SARF_EXAMS } from './exams';

// Import playlist JSONs — only needed playlists get bundled
import fstu from '@playlists/PLzn0qdi6JpdtYROmDjASD8rHQm7kowfLi.json';
import fstuAbridged from '@playlists/PLzn0qdi6JpdudmFXHBzeVvAl5PiPoODwX.json';
import sugra from '@playlists/PLzn0qdi6JpdsVT-ifoh8k7M1WOgrENMxL.json';
import wusta from '@playlists/PLzn0qdi6JpduY3pTvyB-flPijq70k34Qy.json';
import kubra from '@playlists/PLzn0qdi6JpdtQWS7sMqf1Dn_NHoEldir7.json';
import fsSarf from '@playlists/PLzn0qdi6JpdvWf0IDGNfaiM-okPqDuQoc.json';
import muntakhabaat from '@playlists/PLzn0qdi6JpduIiF6TQxO8Dys1VXpfqqyB.json';
import fsLogic from '@playlists/PLzn0qdi6JpduuPBIMbJT7HknhL1Yh5crI.json';
import fsUrdu from '@playlists/PLzn0qdi6JpdvknZizv0awYxDwJYylBFzK.json';
import conjUnit1 from '@playlists/PLzn0qdi6Jpduvm-L4pSx358msUC5tYU1a.json';
import conjUnit2 from '@playlists/PLzn0qdi6JpdsDHNI18bY36BNq2NQ7RSnw.json';
import conjUnit3 from '@playlists/PLzn0qdi6JpdsOAub3EMFVAiH2zbzYTtz2.json';
import conjUnit4s1 from '@playlists/PLzn0qdi6JpdsIccr9vzYZMVekKSccn9tb.json';
import conjUnit4s2 from '@playlists/PLzn0qdi6JpdsnJYBkeASmkNrdJCwuYgds.json';
import conjUnit5 from '@playlists/PLzn0qdi6JpdvlQ3gvMMLIFn7Koyad75Ni.json';
import conjUnit6 from '@playlists/PLzn0qdi6Jpdua1FXSfD-F7Uj-Wx5syACC.json';
import conjUnit7 from '@playlists/PLzn0qdi6JpdsuHztGWe_hlicPblNudKCz.json';
import conjUnit8 from '@playlists/PLzn0qdi6JpduNn2Z-oAS-RqbjxCiK4fi4.json';
import conjUnit9 from '@playlists/PLzn0qdi6Jpdve_Ctb2QaZR2tg0dY7-Pkj.json';

function getVideos(playlist: PlaylistData): Video[] {
  return playlist.videos;
}

function mergeVideos(...playlists: PlaylistData[]): Video[] {
  return playlists.flatMap((p) =>
    p.videos.map((v) => ({ ...v, playlistId: p.playlistId }))
  );
}

const conjugationPlaylists: PlaylistData[] = [
  conjUnit1, conjUnit2, conjUnit3, conjUnit4s1, conjUnit4s2,
  conjUnit5, conjUnit6, conjUnit7, conjUnit8, conjUnit9,
];

export const COURSES: Course[] = [
  // ─── Arabic ───
  {
    id: 'fstu-arabic',
    title: 'FSTU Arabic',
    subject: 'arabic',
    level: 'beginner',
    description: 'First Steps To Understanding Arabic — the flagship 6-unit course covering foundational Arabic grammar and vocabulary.',
    playlists: [{ id: fstu.playlistId, label: 'Full Course' }],
    videos: getVideos(fstu as PlaylistData),
    totalVideos: fstu.videoCount,
    pdfUrl: 'https://drive.google.com/file/d/1dzueIyuTw9jW4k0Jzt4sb3Sk6cAVQ0T2/preview',
    resourceUrl: 'https://www.alqalaminstitute.org/resources/nahw-resources/fstu-arabic-resources',
    exams: FSTU_ARABIC_EXAMS,
  },
  {
    id: 'fstu-arabic-abridged',
    title: 'FSTU Arabic Abridged',
    subject: 'arabic',
    level: 'beginner',
    description: 'A condensed version of FSTU Arabic — shorter lessons covering the same core material.',
    playlists: [{ id: fstuAbridged.playlistId, label: 'Abridged Course' }],
    videos: getVideos(fstuAbridged as PlaylistData),
    totalVideos: fstuAbridged.videoCount,
    exams: [],
  },

  // ─── Nahw ───
{
    id: 'as-sugra',
    title: 'As-Sugra fi an-Nahw',
    subject: 'nahw',
    level: 'beginner',
    description: 'The beginner-level Nahw textbook covering fundamental syntax concepts.',
    playlists: [{ id: sugra.playlistId, label: 'Full Course' }],
    videos: getVideos(sugra as PlaylistData),
    totalVideos: sugra.videoCount,
    pdfUrl: 'https://drive.google.com/file/d/14t0lqM8w8QpHOBQLVDuxpwiqwQwxDq1C/preview',
    resourceUrl: 'https://www.alqalaminstitute.org/resources/nahw-resources/as-sugra-fi-an-nahw-resources',
    exams: [],
  },
  {
    id: 'al-wusta',
    title: 'Al-Wusta fi an-Nahw',
    subject: 'nahw',
    level: 'intermediate',
    description: 'The intermediate Nahw textbook — deeper exploration of Arabic syntax and parsing.',
    playlists: [{ id: wusta.playlistId, label: 'Full Course' }],
    videos: getVideos(wusta as PlaylistData),
    totalVideos: wusta.videoCount,
    pdfUrl: 'https://drive.google.com/file/d/1juaVBJTUNrNkDx-vq2WANBfkqNghC0FM/preview',
    resourceUrl: 'https://www.alqalaminstitute.org/resources/nahw-resources/al-wusta-fi-an-nahw-resources',
    exams: [],
  },
  {
    id: 'al-kubra',
    title: 'Al-Kubra fi an-Nahw',
    subject: 'nahw',
    level: 'advanced',
    description: 'The advanced Nahw textbook — comprehensive study of Arabic syntax for advanced students.',
    playlists: [{ id: kubra.playlistId, label: 'Full Course' }],
    videos: getVideos(kubra as PlaylistData),
    totalVideos: kubra.videoCount,
    pdfUrl: 'https://drive.google.com/file/d/1II8dgGKfXvNtWlGcFtAEdxhPoBaQLwP0/preview',
    resourceUrl: 'https://www.alqalaminstitute.org/resources/nahw-resources/al-kubra-fi-an-nahw-resources',
    exams: [],
  },

  // ─── Sarf ───
  {
    id: 'first-steps-sarf',
    title: 'First Steps Sarf',
    subject: 'sarf',
    level: 'beginner',
    description: 'Introduction to Arabic morphology (Sarf) — verb patterns, forms, and word construction.',
    playlists: [{ id: fsSarf.playlistId, label: 'Full Course' }],
    videos: getVideos(fsSarf as PlaylistData),
    totalVideos: fsSarf.videoCount,
    exams: [],
  },
  {
    id: 'verb-conjugation',
    title: 'Verb Conjugation (Units 1-9)',
    subject: 'sarf',
    level: 'intermediate',
    description: 'Comprehensive Arabic verb conjugation across 9 units — Forms I through X with practice drills.',
    playlists: [
      { id: conjUnit1.playlistId, label: 'Unit 1' },
      { id: conjUnit2.playlistId, label: 'Unit 2' },
      { id: conjUnit3.playlistId, label: 'Unit 3' },
      { id: conjUnit4s1.playlistId, label: 'Unit 4 Section 1' },
      { id: conjUnit4s2.playlistId, label: 'Unit 4 Section 2' },
      { id: conjUnit5.playlistId, label: 'Unit 5' },
      { id: conjUnit6.playlistId, label: 'Unit 6' },
      { id: conjUnit7.playlistId, label: 'Unit 7' },
      { id: conjUnit8.playlistId, label: 'Unit 8' },
      { id: conjUnit9.playlistId, label: 'Unit 9' },
    ],
    videos: mergeVideos(...conjugationPlaylists as PlaylistData[]),
    totalVideos: conjugationPlaylists.reduce((sum, p) => sum + p.videoCount, 0),
    pdfUrl: 'https://drive.google.com/file/d/19kCNLtds9ggGQCXoVLkf0AbE444q3OYB/preview',
    resourceUrl: 'https://www.alqalaminstitute.org/resources/sarf-resources/fstu-sarf-resources',
    exams: FSTU_SARF_EXAMS,
  },

  // ─── Balagah ───
  {
    id: 'al-muntakhabaat',
    title: 'Al-Muntakhabaat',
    subject: 'balagah',
    level: 'intermediate',
    description: 'Selected readings from classical Arabic poetry and prose — building literary appreciation and advanced comprehension.',
    playlists: [{ id: muntakhabaat.playlistId, label: 'Full Course' }],
    videos: getVideos(muntakhabaat as PlaylistData),
    totalVideos: muntakhabaat.videoCount,
    pdfUrl: 'https://drive.google.com/file/d/1XxM5B3_RcAFq-cYqBaFvGxlOgvjFl2Ag/preview',
    resourceUrl: 'https://www.alqalaminstitute.org/resources/literature-resources/al-muntakhabaat-resources',
    exams: [],
  },

  // ─── Logic ───
  {
    id: 'first-steps-logic',
    title: 'First Steps Logic',
    subject: 'logic',
    level: 'beginner',
    description: 'Introduction to Islamic logic (Mantiq) — classical reasoning, syllogisms, and argumentation.',
    playlists: [{ id: fsLogic.playlistId, label: 'Full Course' }],
    videos: getVideos(fsLogic as PlaylistData),
    totalVideos: fsLogic.videoCount,
    resourceUrl: 'https://www.alqalaminstitute.org/resources/logic-mantiq-resources/fstu-logic-resources',
    exams: [],
  },

  // ─── Urdu ───
  {
    id: 'first-steps-urdu',
    title: 'First Steps Urdu',
    subject: 'urdu',
    level: 'beginner',
    description: 'Introduction to reading and understanding Urdu — script, vocabulary, and basic conversation.',
    playlists: [{ id: fsUrdu.playlistId, label: 'Full Course' }],
    videos: getVideos(fsUrdu as PlaylistData),
    totalVideos: fsUrdu.videoCount,
    resourceUrl: 'https://www.alqalaminstitute.org/resources/urdu-resources',
    exams: [],
  },
];

export const COURSE_MAP = Object.fromEntries(
  COURSES.map((c) => [c.id, c])
) as Record<string, Course>;

export function getCoursesBySubject(subject: string): Course[] {
  return COURSES.filter((c) => c.subject === subject);
}

export function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export function formatTotalDuration(videos: Video[]): string {
  const totalSeconds = videos.reduce((sum, v) => sum + v.duration, 0);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  if (hours > 0) return `${hours}h ${minutes}m`;
  return `${minutes}m`;
}
