import { useState } from 'react';
import type { VideoRef } from '../data/types';

interface VideoLessonsProps {
  videos: VideoRef[];
  playlistName: string;
}

function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export function VideoLessons({ videos, playlistName }: VideoLessonsProps) {
  const [expanded, setExpanded] = useState(false);
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);

  if (videos.length === 0) return null;

  return (
    <div className="video-lessons">
      <button
        className="video-lessons-toggle"
        onClick={() => {
          setExpanded(!expanded);
          if (expanded) setActiveVideoId(null);
        }}
      >
        <span className="video-lessons-toggle-icon">{expanded ? '▾' : '▸'}</span>
        <span className="video-lessons-toggle-label">
          Video Lessons ({videos.length})
        </span>
        <span className="video-lessons-badge">{playlistName}</span>
      </button>

      {expanded && (
        <div className="video-lessons-content">
          {activeVideoId && (
            <div className="video-embed-wrapper">
              <iframe
                className="video-embed"
                src={`https://www.youtube.com/embed/${activeVideoId}`}
                title="Video lesson"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}

          <ul className="video-list">
            {videos.map((video) => (
              <li key={video.videoId}>
                <button
                  className={`video-list-item${activeVideoId === video.videoId ? ' active' : ''}`}
                  onClick={() =>
                    setActiveVideoId(
                      activeVideoId === video.videoId ? null : video.videoId
                    )
                  }
                >
                  <span className="video-play-icon">
                    {activeVideoId === video.videoId ? '⏸' : '▶'}
                  </span>
                  <span className="video-title" dir="auto">{video.title}</span>
                  <span className="video-duration">{formatDuration(video.duration)}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
