import { get, set, del, keys } from 'idb-keyval';
import type { Page, Notebook } from '@/types';

const PAGE_PREFIX = 'khatt-page-';
const NOTEBOOK_PREFIX = 'khatt-notebook-';

// --- Page operations ---

export async function savePage(page: Page): Promise<void> {
  await set(PAGE_PREFIX + page.id, page);
}

export async function loadPage(pageId: string): Promise<Page | undefined> {
  return get<Page>(PAGE_PREFIX + pageId);
}

export async function deletePage(pageId: string): Promise<void> {
  await del(PAGE_PREFIX + pageId);
}

// --- Notebook operations ---

export async function saveNotebook(notebook: Notebook): Promise<void> {
  await set(NOTEBOOK_PREFIX + notebook.id, notebook);
}

export async function loadNotebook(notebookId: string): Promise<Notebook | undefined> {
  return get<Notebook>(NOTEBOOK_PREFIX + notebookId);
}

export async function deleteNotebook(notebookId: string): Promise<void> {
  await del(NOTEBOOK_PREFIX + notebookId);
}

export async function loadAllNotebooks(): Promise<Notebook[]> {
  const allKeys = await keys();
  const nbKeys = allKeys.filter(k => typeof k === 'string' && k.startsWith(NOTEBOOK_PREFIX));
  const notebooks: Notebook[] = [];
  for (const key of nbKeys) {
    const nb = await get<Notebook>(key);
    if (nb) notebooks.push(nb);
  }
  return notebooks.sort((a, b) => b.updatedAt - a.updatedAt);
}
