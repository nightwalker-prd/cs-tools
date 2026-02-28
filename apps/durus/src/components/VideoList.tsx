import { useState } from 'react';
import type { Course, Video } from '../data/types';
import { formatDuration } from '../data/catalog';

interface VideoListProps {
  course: Course;
  watchedSet: Set<string>;
  onToggle: (videoId: string) => void;
}

export function VideoList({ course, watchedSet, onToggle }: VideoListProps) {
  const hasMultiplePlaylists = course.playlists.length > 1;

  if (!hasMultiplePlaylists) {
    return (
      <div className="video-list">
        {course.videos.map((video) => (
          <VideoItem
            key={video.videoId}
            video={video}
            watched={watchedSet.has(video.videoId)}
            onToggle={onToggle}
          />
        ))}
      </div>
    );
  }

  // Group videos by playlistId for multi-playlist courses
  return (
    <div className="video-list">
      {course.playlists.map((playlist) => {
        const videos = course.videos.filter(
          (v) => v.playlistId === playlist.id
        );
        return (
          <PlaylistSection
            key={playlist.id}
            label={playlist.label}
            videos={videos}
            watchedSet={watchedSet}
            onToggle={onToggle}
          />
        );
      })}
    </div>
  );
}

interface PlaylistSectionProps {
  label: string;
  videos: Video[];
  watchedSet: Set<string>;
  onToggle: (videoId: string) => void;
}

function PlaylistSection({ label, videos, watchedSet, onToggle }: PlaylistSectionProps) {
  const [expanded, setExpanded] = useState(true);
  const watchedCount = videos.filter((v) => watchedSet.has(v.videoId)).length;

  return (
    <div className="playlist-section">
      <button
        className="playlist-section-header"
        onClick={() => setExpanded(!expanded)}
      >
        <span className={`chevron ${expanded ? 'expanded' : ''}`}>&#9656;</span>
        <span>{label}</span>
        <span className="course-nav-progress">
          {watchedCount}/{videos.length}
        </span>
      </button>
      {expanded &&
        videos.map((video) => (
          <VideoItem
            key={video.videoId}
            video={video}
            watched={watchedSet.has(video.videoId)}
            onToggle={onToggle}
          />
        ))}
    </div>
  );
}

interface VideoItemProps {
  video: Video;
  watched: boolean;
  onToggle: (videoId: string) => void;
}

function VideoItem({ video, watched, onToggle }: VideoItemProps) {
  return (
    <div className="video-item">
      <input
        type="checkbox"
        className="video-checkbox"
        checked={watched}
        onChange={() => onToggle(video.videoId)}
        aria-label={`Mark "${video.title}" as watched`}
      />
      <span className={`video-title ${watched ? 'watched' : ''}`}>
        {video.title}
      </span>
      {video.duration > 0 && (
        <span className="video-duration">{formatDuration(video.duration)}</span>
      )}
      <a
        href={video.url}
        target="_blank"
        rel="noopener noreferrer"
        className="video-link"
        title="Watch on YouTube"
      >
        &#9654;
      </a>
    </div>
  );
}
