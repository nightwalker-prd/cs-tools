const modules = import.meta.glob('./*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
});

// Map filename (without path/extension) to raw markdown string
export const contentFiles: Record<string, string> = {};

for (const [path, content] of Object.entries(modules)) {
  const slug = path.replace('./', '').replace('.md', '');
  contentFiles[slug] = content as string;
}
