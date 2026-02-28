export type Subject = 'arabic' | 'nahw' | 'sarf' | 'balagah' | 'logic' | 'urdu';

export interface SubjectGroup {
  id: Subject;
  title: string;
  titleAr: string;
  icon: string;
}

export interface Video {
  index: number;
  videoId: string;
  title: string;
  url: string;
  duration: number;
  playlistId?: string;
}

export interface PlaylistData {
  playlistId: string;
  playlistTitle: string;
  playlistUrl: string;
  extractedAt: string;
  videoCount: number;
  videos: Video[];
}

export interface ExamPaper {
  title: string;
  url: string;
  type: 'written' | 'oral' | 'video';
  year: number;
  group: string;
}

export type Level = 'beginner' | 'intermediate' | 'advanced';

export interface PlaylistRef {
  id: string;
  label: string;
}

export interface Course {
  id: string;
  title: string;
  subject: Subject;
  level: Level;
  description: string;
  playlists: PlaylistRef[];
  videos: Video[];
  totalVideos: number;
  pdfUrl?: string;
  resourceUrl?: string;
  exams: ExamPaper[];
}
