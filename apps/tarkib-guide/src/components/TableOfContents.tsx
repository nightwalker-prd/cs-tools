import { useMemo, useState, useEffect, useCallback } from 'react';

interface TocEntry {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  markdown: string;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

export function TableOfContents({ markdown }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState('');

  const headings = useMemo(() => {
    const entries: TocEntry[] = [];
    // Strip frontmatter
    const content = markdown.replace(/^---[\s\S]*?---\s*/, '');
    const regex = /^(#{2,3})\s+(.+)$/gm;
    let match;
    while ((match = regex.exec(content)) !== null) {
      entries.push({
        id: slugify(match[2]),
        text: match[2],
        level: match[1].length,
      });
    }
    return entries;
  }, [markdown]);

  // Intersection Observer for active heading tracking
  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: '-80px 0px -70% 0px' }
    );

    for (const heading of headings) {
      const el = document.getElementById(heading.id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [headings]);

  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  if (headings.length < 3) return null;

  return (
    <nav className="toc">
      <div className="toc-title">On this page</div>
      <ul className="toc-list">
        {headings.map(h => (
          <li
            key={h.id}
            className={`toc-item ${h.level === 3 ? 'toc-sub' : ''} ${activeId === h.id ? 'active' : ''}`}
          >
            <button onClick={() => scrollTo(h.id)}>
              {h.text}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
