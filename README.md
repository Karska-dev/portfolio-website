# portfolio-website
Source for karska.dev: my personal site, with experience, projects and contact.

This branch holds two versions of the same site side by side:

- **The Astro version** in `src/`: each project is one JSON file and the pages are generated.
- **The hand-written version** (`index.html`, `projects/`, `css/`, `assets/`): kept for
  comparison until the Astro version replaces it.

## The Astro version

Needs Node.js 22.12 or newer.

```
npm install        # once: downloads Astro into node_modules/
npm run dev        # live preview at http://localhost:4321, reloads as you edit
npm run build      # writes the finished site to dist/
npm run preview    # serves dist/ exactly as a host would
npm run check      # type-checks the templates and the project data
```

```
src/
  content.config.ts        The schema: what every project file must contain
  content/projects/*.json  One file per project. This is what you edit
  lib/projects.ts          Reads the projects, sorts them, derives numbers and addresses
  lib/text.ts              Keeps hyphenated words such as "e-paper" on one line
  layouts/Base.astro       The shell shared by every page (<head>, fonts, styles)
  components/              Reusable pieces: the card, a list entry, the bottom strips
  components/art/          The small line drawings on the cards
  pages/index.astro        The homepage                    ->  /
  pages/projects/[slug].astro  One template for all project pages  ->  /projects/<name>/
  styles/global.css        All styles. Colours and fonts are variables at the top
  assets/                  Fonts and screenshots, processed by the build
public/                    Files copied to the site as they are (favicon)
```

### Add a project

1. Copy a file in `src/content/projects/` and rename it. The file name becomes the address.
2. Fill in the fields. `order` sets its position; the numbers such as (02) follow from it.
3. Run `npm run dev`. If a field is missing or mistyped, the error names the file and field.

Its card (when `featured` is true), list entry, page and "More projects" links are generated.

## The hand-written version

Plain HTML and CSS with no build step. Open `index.html` in a browser.
Each project appears in several places: its card and list entry in `index.html`, its own
page in `projects/`, and a link at the bottom of every other project page.

## Credits

Typefaces: Bricolage Grotesque and DM Mono, both under the SIL Open Font License
(see `src/assets/fonts/LICENSE.txt`).
