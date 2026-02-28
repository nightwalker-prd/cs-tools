import { useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { Components } from 'react-markdown';

interface ContentRendererProps {
  markdown: string;
}

// Detect if text is primarily Arabic
function isArabic(text: string): boolean {
  const arabicChars = text.match(/[\u0600-\u06FF\u0750-\u077F\uFB50-\uFDFF\uFE70-\uFEFF]/g);
  if (!arabicChars) return false;
  const letterChars = text.match(/\S/g);
  if (!letterChars) return false;
  return arabicChars.length / letterChars.length > 0.3;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

const components: Components = {
  h1: ({ children }) => {
    const id = slugify(String(children));
    return (
      <h1 id={id} className="content-h1 scroll-mt-20">
        {children}
      </h1>
    );
  },
  h2: ({ children }) => {
    const id = slugify(String(children));
    return (
      <h2 id={id} className="content-h2 scroll-mt-20">
        {children}
      </h2>
    );
  },
  h3: ({ children }) => {
    const id = slugify(String(children));
    return (
      <h3 id={id} className="content-h3 scroll-mt-20">
        {children}
      </h3>
    );
  },
  h4: ({ children }) => {
    const id = slugify(String(children));
    return (
      <h4 id={id} className="content-h4 scroll-mt-20">
        {children}
      </h4>
    );
  },
  p: ({ children }) => {
    const text = String(children);
    const arabic = isArabic(text);
    return (
      <p className={arabic ? 'font-arabic' : ''} dir={arabic ? 'rtl' : undefined}>
        {children}
      </p>
    );
  },
  table: ({ children }) => (
    <div className="table-wrapper">
      <table>{children}</table>
    </div>
  ),
  blockquote: ({ children }) => (
    <blockquote className="rule-box">{children}</blockquote>
  ),
  code: ({ children, className }) => {
    const isBlock = className?.includes('language-');
    const text = String(children);
    const arabic = isArabic(text);

    if (isBlock) {
      return (
        <code className={`${className ?? ''} ${arabic ? 'arabic-code' : ''}`}>
          {children}
        </code>
      );
    }

    return (
      <code className={`inline-code ${arabic ? 'arabic-code' : ''}`}>
        {children}
      </code>
    );
  },
  hr: () => (
    <div className="decorative-hr">
      <span className="hr-diamond" />
    </div>
  ),
  li: ({ children }) => {
    const text = String(children);
    const arabic = isArabic(text);
    return (
      <li className={arabic ? 'font-arabic' : ''} dir={arabic ? 'rtl' : undefined}>
        {children}
      </li>
    );
  },
};

export function ContentRenderer({ markdown }: ContentRendererProps) {
  const content = useMemo(() => {
    // Strip frontmatter if present
    const stripped = markdown.replace(/^---[\s\S]*?---\s*/, '');
    return stripped;
  }, [markdown]);

  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
      {content}
    </ReactMarkdown>
  );
}
