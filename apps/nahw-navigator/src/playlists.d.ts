declare module '@playlists/*.json' {
  interface Video {
    index: number;
    videoId: string;
    title: string;
    url: string;
    duration: number;
  }

  interface PlaylistData {
    playlistId: string;
    playlistTitle: string;
    playlistUrl: string;
    extractedAt: string;
    videoCount: number;
    videos: Video[];
  }

  const data: PlaylistData;
  export default data;
}
