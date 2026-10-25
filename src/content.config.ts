// Content collection: the single place that says what a "project" is.
//
// Pattern: schema validation at build time. Every JSON file in
// src/content/projects/ is checked against the schema below before any page
// is generated. A missing field or a wrong type stops the build with a
// message naming the file and the field, so a broken project can never ship.
// In C# terms: the schema is the class, each JSON file is an instance, and
// the build is the compiler.

import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/** Names of the small line drawings in src/components/art/. */
export const artNames = ['barcode', 'epaper', 'series', 'grid', 'browser'] as const;

const projects = defineCollection({
  // A loader tells Astro where entries come from. glob() makes one entry per
  // matching file and uses the file name as its id: loose-ends.json becomes
  // the id "loose-ends", which is also the page address /projects/loose-ends/.
  loader: glob({ pattern: '*.json', base: './src/content/projects' }),

  // image() is passed in by Astro. It turns a relative path in the JSON into
  // an imported image, so the build can check the file exists and resize it.
  schema: ({ image }) =>
    z.object({
      name: z.string(),

      // Position in every list. Numbers such as (02) are derived from this
      // order, never typed. Spaced by ten so a project can be inserted
      // between two others without touching them.
      order: z.number().int().positive(),

      year: z.number().int().optional(),

      // The word in the pill: "Live", "Playable", "v0.1.0", "Coming soon".
      status: z.string(),
      // What the status row is called on the project page.
      statusLabel: z.string().default('Status'),

      // Optional pill in the card's top right corner, shown instead of the year.
      badge: z.string().optional(),
      comingSoon: z.boolean().default(false),
      // Shown instead of buttons when a project has no links yet.
      statusNote: z.string().optional(),

      // Featured projects get a card in the homepage's top band.
      featured: z.boolean().default(false),

      /** One line under the title on the project page. */
      lede: z.string(),
      /** The paragraph in the homepage project list. */
      summary: z.string(),
      /** For search engines and link previews. */
      description: z.string(),

      stack: z.array(z.string()).default([]),

      links: z
        .array(
          z.object({
            label: z.string(),
            url: z.url(),
            // Set to false to keep a link off the homepage list.
            showInList: z.boolean().default(true),
          }),
        )
        .default([]),

      card: z.object({
        question: z.string(),
        art: z.enum(artNames),
        extra: z.object({ label: z.string(), value: z.string() }).optional(),
        /** Two short lines at the foot of the card. */
        notes: z.tuple([z.string(), z.string()]),
      }),

      steps: z.object({
        title: z.string(),
        items: z.array(z.object({ title: z.string(), text: z.string() })).length(3),
      }),

      /** Rows added to the spec table after Year, Status and Stack. */
      spec: z.array(z.object({ label: z.string(), value: z.string() })).default([]),

      screenshot: z
        .object({
          src: image(),
          alt: z.string(),
          // Near-square captures are shown narrower so they are not very tall.
          narrow: z.boolean().default(false),
        })
        .optional(),

      aside: z.string(),
    }),
});

export const collections = { projects };
