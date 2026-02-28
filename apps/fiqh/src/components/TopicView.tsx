import type { FiqhTopic, Masalah, Bookmark as BookmarkType } from '../types';
import { getCategoryById } from '../data/categories';
import { Breadcrumb } from './Breadcrumb';
import { MasalahCard } from './MasalahCard';

interface TopicViewProps {
  topic: FiqhTopic;
  masail: Masalah[];
  relatedTopics: FiqhTopic[];
  bookmarks: BookmarkType[];
  onToggleBookmark: (targetId: string, targetType: 'section' | 'masalah') => void;
  onGoHome: () => void;
  onNavigateTopic: (id: string) => void;
  onViewSource?: (kitabId: string, babId: string) => void;
}

export function TopicView({
  topic,
  masail,
  relatedTopics,
  bookmarks,
  onToggleBookmark,
  onGoHome,
  onNavigateTopic,
  onViewSource,
}: TopicViewProps) {
  const category = getCategoryById(topic.categoryId);
  const isBookmarked = (id: string) => bookmarks.some(b => b.targetId === id);

  const breadcrumbs = [
    { label: 'Home', onClick: onGoHome },
    ...(category ? [{ label: category.titleEn, onClick: onGoHome }] : []),
    { label: topic.titleEn },
  ];

  return (
    <div className="animate-fade-in">
      <Breadcrumb items={breadcrumbs} />

      <div className="topic-header">
        <h1 className="topic-title-ar" dir="rtl">{topic.titleAr}</h1>
        <h2 className="topic-title-en">{topic.titleEn}</h2>
        {topic.tags.length > 0 && (
          <div className="topic-tags">
            {topic.tags.map(tag => (
              <span key={tag} className="filter-tag">{tag}</span>
            ))}
          </div>
        )}
      </div>

      {topic.summaryEn && (
        <div className="topic-summary">
          <p>{topic.summaryEn}</p>
        </div>
      )}

      <h3 className="section-heading">Rulings ({masail.length})</h3>

      {masail.length > 0 ? (
        <div className="masail-list">
          {masail.map(m => (
            <MasalahCard
              key={m.id}
              masalah={m}
              isBookmarked={isBookmarked(m.id)}
              onToggleBookmark={() => onToggleBookmark(m.id, 'masalah')}
              onViewSource={onViewSource ? () => onViewSource(m.kitabId, m.sectionId) : undefined}
            />
          ))}
        </div>
      ) : (
        <p className="empty-note">No rulings extracted for this topic yet.</p>
      )}

      {relatedTopics.length > 0 && (
        <>
          <h3 className="section-heading">Related Topics</h3>
          <div className="related-topics">
            {relatedTopics.map(rt => (
              <button
                key={rt.id}
                className="related-topic-link"
                onClick={() => onNavigateTopic(rt.id)}
              >
                <span className="related-topic-ar">{rt.titleAr}</span>
                <span className="related-topic-en">{rt.titleEn}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
