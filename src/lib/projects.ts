// One function that every page uses to read the projects.
//
// Pattern: derive, don't duplicate. A project file stores only facts. Anything
// that can be worked out from those facts (its number, its address, the rows
// of its spec table) is computed here, once, so it cannot fall out of step.

import { getCollection, type CollectionEntry } from 'astro:content';

export type Project = CollectionEntry<'projects'>;

export interface ListedProject {
  /** The validated contents of the project's JSON file. */
  data: Project['data'];
  /** The file name without .json, used in the address. */
  slug: string;
  /** Position in the list as two digits: "01", "02", ... */
  number: string;
  /** Address of the project page, including any base folder. */
  url: string;
  /** Short label beside the number: the year, or "Coming soon". */
  tag: string;
  /** Rows of the spec table. */
  spec: { label: string; value: string }[];
}

/** Joins a path to the folder the site is served from ("/" unless configured). */
export function withBase(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}${path}`;
}

/** All projects in display order, each with its derived values. */
export async function getProjects(): Promise<ListedProject[]> {
  const entries = await getCollection('projects');

  // Two projects with the same order would make the numbering depend on file
  // order, which is not guaranteed. Fail the build instead of guessing.
  const seen = new Map<number, string>();
  for (const entry of entries) {
    const clash = seen.get(entry.data.order);
    if (clash) {
      throw new Error(`Projects "${clash}" and "${entry.id}" both have order ${entry.data.order}.`);
    }
    seen.set(entry.data.order, entry.id);
  }

  return entries
    .sort((a, b) => a.data.order - b.data.order)
    .map((entry, index) => {
      const { data } = entry;
      return {
        data,
        slug: entry.id,
        number: String(index + 1).padStart(2, '0'),
        url: withBase(`/projects/${entry.id}/`),
        tag: data.comingSoon ? 'Coming soon' : String(data.year ?? ''),
        spec: [
          ...(data.year ? [{ label: 'Year', value: String(data.year) }] : []),
          { label: data.statusLabel, value: data.status },
          ...(data.stack.length ? [{ label: 'Stack', value: data.stack.join(', ') }] : []),
          ...data.spec,
        ],
      };
    });
}
