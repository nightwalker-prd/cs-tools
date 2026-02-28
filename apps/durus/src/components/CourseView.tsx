import { useState } from 'react';
import type { Course } from '../data/types';
import { formatTotalDuration } from '../data/catalog';
import { ProgressBar } from './ProgressBar';
import { VideoList } from './VideoList';
import { ExamList } from './ExamList';

interface CourseViewProps {
  course: Course;
  watchedSet: Set<string>;
  onToggleVideo: (videoId: string) => void;
  onMarkAllWatched: () => void;
  onClearProgress: () => void;
  onGoHome: () => void;
}

export function CourseView({
  course,
  watchedSet,
  onToggleVideo,
  onMarkAllWatched,
  onClearProgress,
  onGoHome,
}: CourseViewProps) {
  const [tab, setTab] = useState<'videos' | 'exams'>('videos');
  const watchedCount = watchedSet.size;

  return (
    <div className="course-view animate-fade-in">
      <button className="back-btn" onClick={onGoHome}>
        &#8592; All Courses
      </button>

      {/* Header */}
      <div className="course-header">
        <div className="course-card-header">
          <h1 className="course-header-title">{course.title}</h1>
          <span className={`level-badge ${course.level}`}>{course.level}</span>
        </div>
        <p className="course-header-desc">{course.description}</p>
        <p className="course-card-meta">
          {course.totalVideos} videos &middot; {formatTotalDuration(course.videos)}
        </p>

        <div className="course-header-actions">
          {course.pdfUrl && (
            <a
              href={course.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="resource-btn"
            >
              PDF Textbook
            </a>
          )}
          {course.resourceUrl && (
            <a
              href={course.resourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="resource-btn"
            >
              Resources
            </a>
          )}
        </div>
      </div>

      {/* Progress */}
      <ProgressBar watched={watchedCount} total={course.totalVideos} />

      {/* Tabs */}
      <div className="tabs" style={{ marginTop: '1.5rem' }}>
        <button
          className={`tab ${tab === 'videos' ? 'active' : ''}`}
          onClick={() => setTab('videos')}
        >
          Videos ({course.totalVideos})
        </button>
        {course.exams.length > 0 && (
          <button
            className={`tab ${tab === 'exams' ? 'active' : ''}`}
            onClick={() => setTab('exams')}
          >
            Exams ({course.exams.length})
          </button>
        )}
      </div>

      {/* Tab Content */}
      {tab === 'videos' ? (
        <VideoList
          course={course}
          watchedSet={watchedSet}
          onToggle={onToggleVideo}
        />
      ) : (
        <ExamList exams={course.exams} />
      )}

      {/* Actions */}
      <div className="course-actions">
        <button className="btn btn-primary" onClick={onMarkAllWatched}>
          Mark All Watched
        </button>
        {watchedCount > 0 && (
          <button className="btn btn-danger" onClick={onClearProgress}>
            Clear Progress
          </button>
        )}
      </div>
    </div>
  );
}
