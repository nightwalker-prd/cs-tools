import type { Course } from '../data/types';
import { SUBJECTS } from '../data/subjects';
import { COURSES, getCoursesBySubject, formatTotalDuration } from '../data/catalog';
import { ProgressBar } from './ProgressBar';

interface HomePageProps {
  getWatchedCount: (courseId: string) => number;
  totalWatched: number;
  onNavigate: (courseId: string) => void;
}

export function HomePage({ getWatchedCount, totalWatched, onNavigate }: HomePageProps) {
  const totalVideos = COURSES.reduce((sum, c) => sum + c.totalVideos, 0);
  const allVideos = COURSES.flatMap((c) => c.videos);

  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <div className="hero">
        <h1 className="hero-title">Durus</h1>
        <h2 className="hero-subtitle font-arabic">دروس</h2>
        <p className="hero-description">
          Navigate Al Qalam Institute courses — structured video lessons
          in Arabic, Nahw, Sarf, and Balagah with progress tracking.
        </p>
      </div>

      {/* Stats Bar */}
      <div className="stats-bar">
        <div className="stat">
          <div className="stat-value">{COURSES.length}</div>
          <div className="stat-label">Courses</div>
        </div>
        <div className="stat">
          <div className="stat-value">{totalVideos}</div>
          <div className="stat-label">Videos</div>
        </div>
        <div className="stat">
          <div className="stat-value">{formatTotalDuration(allVideos)}</div>
          <div className="stat-label">Total</div>
        </div>
        <div className="stat">
          <div className="stat-value">{totalWatched}</div>
          <div className="stat-label">Watched</div>
        </div>
      </div>

      {/* Subject Sections */}
      {SUBJECTS.map((subject) => {
        const courses = getCoursesBySubject(subject.id);
        if (courses.length === 0) return null;
        return (
          <div key={subject.id} className="subject-section">
            <h2 className="subject-section-title">
              {subject.title}{' '}
              <span className="font-arabic" style={{ fontSize: '0.9em', color: 'var(--color-accent)' }}>
                {subject.titleAr}
              </span>
            </h2>
            <div className="course-cards">
              {courses.map((course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  watchedCount={getWatchedCount(course.id)}
                  onClick={() => onNavigate(course.id)}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

interface CourseCardProps {
  course: Course;
  watchedCount: number;
  onClick: () => void;
}

function CourseCard({ course, watchedCount, onClick }: CourseCardProps) {
  return (
    <button className="course-card" onClick={onClick}>
      <div className="course-card-header">
        <h3>{course.title}</h3>
        <span className={`level-badge ${course.level}`}>{course.level}</span>
      </div>
      <p className="course-card-desc">{course.description}</p>
      <div className="course-card-footer">
        <span className="course-card-meta">
          {course.totalVideos} videos &middot; {formatTotalDuration(course.videos)}
        </span>
      </div>
      {course.totalVideos > 0 && (
        <ProgressBar
          watched={watchedCount}
          total={course.totalVideos}
          showLabel={watchedCount > 0}
        />
      )}
    </button>
  );
}
